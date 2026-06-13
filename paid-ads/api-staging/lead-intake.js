// SPEED-TO-LEAD: step 1 of 2 — intake + instant text-back.
//
// Called by the paid-traffic landing form (replaces / augments Formspree for
// paid leads). Persists the lead, fires the FIRST SMS in <2 min, and notifies
// Gerrit by email so nothing is ever silently lost.
//
// DEPLOY: move this file to /api/lead-intake.js when Twilio is live.
// No npm deps — Twilio + Upstash KV are called over plain fetch.
//
// Required Vercel env vars:
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_FROM_NUMBER        (your A2P-registered Benefique number, E.164 e.g. +19545551234)
//   KV_REST_API_URL           (Vercel KV / Upstash — free tier is fine)
//   KV_REST_API_TOKEN
//   BOOKING_NOTIFY_FORMSPREE  (optional; defaults to xlgvzwyo → gerrit@)
//
// State machine lives in sms-reply.js; this file only seeds state = "Q_REVENUE".

const NOTIFY_FORMSPREE = process.env.BOOKING_NOTIFY_FORMSPREE || 'https://formspree.io/f/xlgvzwyo';
const LEAD_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days of conversation memory

// ---- helpers (shared shape with sms-reply.js) -------------------------------

function toE164(raw) {
  const d = (raw || '').replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return d;
  if (d.length === 10) return `+1${d}`;       // US 10-digit
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return null;
}

async function kvSet(key, value) {
  await fetch(`${process.env.KV_REST_API_URL}/set/${encodeURIComponent(key)}?EX=${LEAD_TTL_SECONDS}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
}

async function sendSms(to, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const auth = Buffer.from(`${sid}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ To: to, From: process.env.TWILIO_FROM_NUMBER, Body: body }).toString(),
  });
  if (!res.ok) throw new Error(`Twilio send failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function notifyByEmail(payload) {
  try {
    await fetch(NOTIFY_FORMSPREE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload).toString(),
    });
  } catch (e) {
    console.error('Formspree notify failed:', e?.message);
  }
}

// ---- handler ----------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const b = req.body || {};
  const name = (b.name || '').toString().trim().slice(0, 80);
  const email = (b.email || '').toString().trim().slice(0, 120);
  const phone = toE164(b.phone);
  const source = (b.utm_campaign || b.original_form || 'paid-ad').toString().slice(0, 80);

  if (!phone) return res.status(400).json({ error: 'invalid_phone' });

  const firstName = name.split(/\s+/)[0] || 'there';
  const lead = {
    name, firstName, email, phone, source,
    state: 'Q_REVENUE',
    answers: {},
    misses: 0,
    createdAt: null, // stamped by KV write order; avoid Date.now() noise here
  };

  try {
    await kvSet(`lead:${phone}`, lead);

    // The <2-minute text-back. Calm, human, one question.
    const greeting =
      `Hi ${firstName}, this is the Benefique team — thanks for reaching out about your books. ` +
      `I'll grab you a free diagnostic call with Gerrit (EA) in a sec. Quick q first: ` +
      `roughly what's your annual revenue? (e.g. "2M", "$5M")`;
    await sendSms(phone, greeting);

    notifyByEmail({
      _subject: '🟢 NEW PAID LEAD — speed-to-lead started',
      lead_name: name,
      lead_email: email,
      lead_phone: phone,
      source,
      status: 'sms_sent_q1',
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err?.message || 'unknown_error';
    console.error('lead-intake error:', message);
    // Never lose the lead — page Gerrit to text them manually.
    notifyByEmail({
      _subject: '⚠️ PAID LEAD — bot failed, TEXT THEM MANUALLY',
      lead_name: name, lead_email: email, lead_phone: phone || 'invalid',
      source, status: 'intake_failed', error_message: message,
    });
    return res.status(500).json({ error: 'intake_failed' });
  }
}
