// SPEED-TO-LEAD: step 2 of 2 — Twilio inbound webhook + conversational FSM.
//
// Twilio posts here (application/x-www-form-urlencoded) on every inbound SMS.
// Set this URL as the "A MESSAGE COMES IN" webhook on your Twilio number:
//   https://benefique.com/api/sms-reply   (POST)
//
// Flow: Q_REVENUE -> Q_PAIN -> SLOTS_OFFERED -> DONE
// Booking reuses the existing, tested /api/book-slot endpoint (no dup calendar code).
//
// DEPLOY: move to /api/sms-reply.js alongside lead-intake.js when Twilio is live.
// No npm deps.
//
// Env vars: same as lead-intake.js, plus:
//   SITE_URL  (defaults to https://benefique.com — used to call /api/book-slot
//              and to fetch /booking-slots.json)
//
// PREREQ: expose the slot list at a public URL. update-booking-slots.py currently
// writes src/booking-slots.json (bundled). Add a one-line copy to
// public/booking-slots.json so this webhook can fetch the next open times.

const SITE_URL = process.env.SITE_URL || 'https://benefique.com';
const LEAD_TTL_SECONDS = 60 * 60 * 24 * 7;
const MAX_MISSES = 2;

// ---- KV + Twilio reply helpers ----------------------------------------------

async function kvGet(key) {
  const r = await fetch(`${process.env.KV_REST_API_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
  if (!r.ok) return null;
  const { result } = await r.json();
  if (!result) return null;
  try { return JSON.parse(result); } catch { return null; }
}

async function kvSet(key, value) {
  await fetch(`${process.env.KV_REST_API_URL}/set/${encodeURIComponent(key)}?EX=${LEAD_TTL_SECONDS}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
}

// Reply to Twilio inline via TwiML — simplest, no second API round-trip.
function twiml(res, message) {
  const escaped = String(message).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`);
}
function twimlSilent(res) {
  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
}

async function notifyByEmail(payload) {
  try {
    await fetch(process.env.BOOKING_NOTIFY_FORMSPREE || 'https://formspree.io/f/xlgvzwyo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload).toString(),
    });
  } catch (e) { console.error('notify failed', e?.message); }
}

// ---- slot helpers -----------------------------------------------------------

async function nextTwoSlots() {
  try {
    const r = await fetch(`${SITE_URL}/booking-slots.json`, { cache: 'no-store' });
    if (!r.ok) return [];
    const data = await r.json();
    const slots = (data.slots || []).filter((s) => Date.parse(s.iso) > Date.now());
    slots.sort((a, b) => Date.parse(a.iso) - Date.parse(b.iso));
    return slots.slice(0, 2);
  } catch { return []; }
}

function fmtSlot(s) {
  // booking-slots.json entries carry a human label; fall back to ISO if not.
  return s.label || new Date(s.iso).toLocaleString('en-US', { timeZone: 'America/New_York' });
}

async function bookSlot(email, iso) {
  const r = await fetch(`${SITE_URL}/api/book-slot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, slot: iso, original_form: 'sms-speed-to-lead' }),
  });
  return r.ok;
}

// ---- handler ----------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const from = (req.body?.From || '').trim();
  const text = (req.body?.Body || '').trim();
  if (!from) return twimlSilent(res);

  const lead = await kvGet(`lead:${from}`);
  if (!lead) {
    // Unknown number texting us — alert Gerrit, stay silent (avoid spamming randoms).
    notifyByEmail({ _subject: '📩 SMS from unknown number', lead_phone: from, message_text: text, status: 'unknown_inbound' });
    return twimlSilent(res);
  }

  // Universal opt-out / human-handoff hatches.
  const lower = text.toLowerCase();
  if (/\b(stop|unsubscribe|cancel)\b/.test(lower)) {
    lead.state = 'OPTED_OUT';
    await kvSet(`lead:${from}`, lead);
    return twiml(res, "No problem — you won't hear from us again. If you change your mind, just reply START.");
  }
  if (/\b(human|call me|talk to|gerrit|person)\b/.test(lower)) {
    lead.state = 'HANDOFF';
    await kvSet(`lead:${from}`, lead);
    notifyByEmail({ _subject: '🙋 LEAD WANTS A HUMAN — call them', lead_name: lead.name, lead_phone: from, lead_email: lead.email, status: 'human_requested', message_text: text });
    return twiml(res, `Absolutely — Gerrit (EA) will reach out personally shortly. Talk soon, ${lead.firstName}.`);
  }

  switch (lead.state) {
    case 'Q_REVENUE': {
      lead.answers.revenue = text.slice(0, 60);
      lead.state = 'Q_PAIN';
      lead.misses = 0;
      await kvSet(`lead:${from}`, lead);
      return twiml(res,
        `Got it. And what's the #1 thing you wish your books did better right now — ` +
        `cash visibility, taxes, profitability, or something else?`);
    }

    case 'Q_PAIN': {
      lead.answers.pain = text.slice(0, 200);
      const slots = await nextTwoSlots();
      if (slots.length === 0) {
        lead.state = 'HANDOFF';
        await kvSet(`lead:${from}`, lead);
        notifyByEmail({ _subject: '⚠️ No slots available for SMS lead — book manually', lead_name: lead.name, lead_phone: from, lead_email: lead.email, answers: JSON.stringify(lead.answers) });
        return twiml(res, `Thanks ${lead.firstName} — Gerrit will text you a couple of times directly to lock in your diagnostic call.`);
      }
      lead.offeredSlots = slots;
      lead.state = 'SLOTS_OFFERED';
      lead.misses = 0;
      await kvSet(`lead:${from}`, lead);
      const opts = slots.map((s, i) => `${i + 1}) ${fmtSlot(s)}`).join('\n');
      return twiml(res,
        `Perfect. Here are the next two openings for your free 30-min diagnostic with Gerrit:\n${opts}\n\n` +
        `Reply 1 or 2 and I'll lock it in. (Or "neither" for more times.)`);
    }

    case 'SLOTS_OFFERED': {
      const pick = lower.includes('1') || lower.includes('one') ? 0
                 : lower.includes('2') || lower.includes('two') ? 1
                 : -1;
      if (pick === -1 || !lead.offeredSlots?.[pick]) {
        if (/neither|other|more|different/.test(lower)) {
          lead.state = 'HANDOFF';
          await kvSet(`lead:${from}`, lead);
          notifyByEmail({ _subject: '📅 SMS lead wants other times — send options', lead_name: lead.name, lead_phone: from, lead_email: lead.email });
          return twiml(res, `No problem — Gerrit will text you a few more options shortly.`);
        }
        lead.misses = (lead.misses || 0) + 1;
        if (lead.misses >= MAX_MISSES) {
          lead.state = 'HANDOFF';
          await kvSet(`lead:${from}`, lead);
          notifyByEmail({ _subject: '🤝 SMS bot stuck — take over', lead_name: lead.name, lead_phone: from, lead_email: lead.email });
          return twiml(res, `Let me have Gerrit reach out directly so we get you the right time, ${lead.firstName}.`);
        }
        await kvSet(`lead:${from}`, lead);
        return twiml(res, `Just reply 1 or 2 to pick a time 🙂`);
      }

      const chosen = lead.offeredSlots[pick];
      if (!lead.email) {
        lead.pendingSlotIso = chosen.iso;
        lead.state = 'NEED_EMAIL';
        await kvSet(`lead:${from}`, lead);
        return twiml(res, `Great choice. What's the best email for the calendar invite + Google Meet link?`);
      }
      const ok = await bookSlot(lead.email, chosen.iso);
      lead.state = ok ? 'DONE' : 'HANDOFF';
      await kvSet(`lead:${from}`, lead);
      if (ok) {
        notifyByEmail({ _subject: '✅ SMS LEAD BOOKED — diagnostic on calendar', lead_name: lead.name, lead_phone: from, lead_email: lead.email, slot: chosen.iso, answers: JSON.stringify(lead.answers), status: 'booked' });
        return twiml(res, `Booked! 🎉 Calendar invite + Meet link are on the way to ${lead.email}. See you ${fmtSlot(chosen)}. — Gerrit Disbergen, EA`);
      }
      notifyByEmail({ _subject: '⚠️ SMS booking failed — book manually', lead_name: lead.name, lead_phone: from, lead_email: lead.email, slot: chosen.iso });
      return twiml(res, `Almost — small hiccup on my end. Gerrit will confirm that time with you personally in a moment.`);
    }

    case 'NEED_EMAIL': {
      const email = (text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || [])[0];
      if (!email) {
        lead.misses = (lead.misses || 0) + 1;
        await kvSet(`lead:${from}`, lead);
        return twiml(res, `Hmm, that doesn't look like an email — could you send it again? (e.g. you@company.com)`);
      }
      lead.email = email;
      const ok = await bookSlot(email, lead.pendingSlotIso);
      lead.state = ok ? 'DONE' : 'HANDOFF';
      await kvSet(`lead:${from}`, lead);
      if (ok) {
        notifyByEmail({ _subject: '✅ SMS LEAD BOOKED — diagnostic on calendar', lead_name: lead.name, lead_phone: from, lead_email: email, slot: lead.pendingSlotIso, answers: JSON.stringify(lead.answers), status: 'booked' });
        return twiml(res, `Booked! 🎉 Invite + Meet link heading to ${email}. Talk soon. — Gerrit Disbergen, EA`);
      }
      notifyByEmail({ _subject: '⚠️ SMS booking failed — book manually', lead_name: lead.name, lead_phone: from, lead_email: email });
      return twiml(res, `Got your email — Gerrit will confirm the time with you personally shortly.`);
    }

    case 'DONE':
      return twiml(res, `You're all set, ${lead.firstName} — see you on the call! Reply "human" if anything changes.`);

    default:
      return twimlSilent(res);
  }
}
