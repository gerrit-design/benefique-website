// Books a 30-minute discovery call on Gerrit's Google Calendar.
// Called by the slot picker on /thank-you. Creates the event with
// the prospect as attendee, auto-generates a Google Meet link, and
// fires Calendar's native email invite to both sides.
//
// Required Vercel env vars (Production + Preview):
//   GOOGLE_CLIENT_ID
//   GOOGLE_CLIENT_SECRET
//   GOOGLE_REFRESH_TOKEN     (one-time generated via scripts/get-production-token.py)
//   GOOGLE_CALENDAR_OWNER    (optional, defaults to 'primary' — the calendar to book on)
//   BOOKING_NOTIFY_FORMSPREE (optional, Formspree endpoint to also notify by email; default xlgvzwyo)

import { google } from 'googleapis';

const TZ = 'America/New_York';
const SLOT_MINUTES = 30;
const NOTIFY_FORMSPREE = process.env.BOOKING_NOTIFY_FORMSPREE || 'https://formspree.io/f/xlgvzwyo';

function getOAuthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error('Server not configured: missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN');
  }
  const client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return client;
}

function isValidEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidIso(s) {
  if (typeof s !== 'string') return false;
  const t = Date.parse(s);
  return Number.isFinite(t);
}

async function notifyByEmail(payload) {
  try {
    await fetch(NOTIFY_FORMSPREE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        _subject: payload.subject,
        email: payload.email,
        slot: payload.slot,
        original_form: payload.original_form || 'unknown',
        booking_status: payload.status,
        ...(payload.event_link ? { event_link: payload.event_link } : {}),
        ...(payload.error ? { error_message: payload.error } : {}),
      }).toString(),
    });
  } catch (e) {
    // best-effort notification; do not block on this failing
    console.error('Formspree notify failed:', e?.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const body = req.body || {};
  const email = (body.email || '').trim();
  const slot = (body.slot || '').trim();
  const original_form = (body.original_form || 'unknown').toString().slice(0, 80);

  if (!isValidEmail(email)) return res.status(400).json({ error: 'invalid_email' });
  if (!isValidIso(slot)) return res.status(400).json({ error: 'invalid_slot' });

  const start = new Date(slot);
  const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);

  // Sanity bounds: not in the past, not more than 90 days out
  const now = Date.now();
  if (start.getTime() < now - 60_000) return res.status(400).json({ error: 'slot_in_past' });
  if (start.getTime() > now + 90 * 86_400_000) return res.status(400).json({ error: 'slot_too_far_out' });

  try {
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_OWNER || 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: `Benefique discovery call — ${email}`,
        description: [
          'Booked from benefique.com/thank-you',
          `Original form: ${original_form}`,
          `Prospect email: ${email}`,
        ].join('\n'),
        start: { dateTime: start.toISOString(), timeZone: TZ },
        end: { dateTime: end.toISOString(), timeZone: TZ },
        attendees: [{ email }],
        conferenceData: {
          createRequest: {
            requestId: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      },
    });

    const eventLink = event.data.htmlLink || '';
    const meetLink =
      event.data.hangoutLink ||
      event.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri ||
      '';

    // Fire-and-forget notification to Gerrit so it lands in the new Booking inbox too.
    notifyByEmail({
      subject: '📅 Auto-booked: discovery call confirmed',
      email,
      slot,
      original_form,
      status: 'auto_booked',
      event_link: eventLink,
    });

    return res.status(200).json({
      ok: true,
      eventId: event.data.id,
      eventLink,
      meetLink,
    });
  } catch (err) {
    const message = err?.message || 'unknown_error';
    console.error('book-slot error:', message);

    // Notify Gerrit so the booking isn't silently lost.
    notifyByEmail({
      subject: '⚠️ BOOKING FAILED — manual action needed',
      email,
      slot,
      original_form,
      status: 'auto_book_failed',
      error: message,
    });

    return res.status(500).json({ error: 'booking_failed', detail: message });
  }
}
