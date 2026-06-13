# Benefique Paid Advertising — Build Plan & Runbook

**Decision (2026-06-02):** Use the AI-ads playbook for **Benefique's OWN lead gen** (not a client service). Target **SE FL SMB owners**, book-replacement positioning. Creative: **static/carousel + AI video in parallel**. SMS: **Twilio**.

This folder is **staging** — nothing here auto-deploys. The `api-staging/` functions move to `/api/` only when Twilio is live and you've explicitly approved go-live (the repo auto-deploys on push to `main`).

---

## The system (adapted from the @ArchiveExplorer playbook)

| Playbook step | Roofer version | **Benefique version** |
|---|---|---|
| Find proven winners | FB Ad Library, 6mo+ roofing ads | FB Ad Library, 6mo+ **fractional-CFO / tax / B2B-services** ads — see `ad-library-research-sop.md` |
| Recreate with AI | Higgsfield + client logo | Higgsfield/Runway, **navy/orange brand**, in-house-contrast angle |
| Claude writes copy | roofer script | **`ad-copy-variants.md`** — 6 static + 6 video, on brand rails |
| Batch produce | 10–15 ads / afternoon | 12 variants ready; refill 5/mo |
| Launch on Meta | leads → form | leads → **paid landing page → lead-intake** |
| AI bot texts leads <2min | books a job | **`lead-intake.js` + `sms-reply.js`** book a free **diagnostic call** on Gerrit's calendar |
| Client wakes to booked appts | — | Gerrit wakes to booked diagnostics; email digest on every step |

**The moat:** B2B accounting firms do not text leads back in 2 minutes and book a call conversationally. You already own the calendar/booking half (`api/book-slot.js`). The bot closes the gap.

---

## Architecture (speed-to-lead)

```
Meta ad ──> paid landing page (form: name, email, phone, revenue)
              │  POST /api/lead-intake
              ▼
        lead-intake.js ──> KV: lead state = Q_REVENUE
              │            └─> Twilio SMS #1 (<2 min)  ──────────┐
              │            └─> Formspree digest → gerrit@         │
              ▼                                                   ▼
        prospect replies by SMS ──> Twilio webhook ──> /api/sms-reply
                                                          │ FSM:
                                                          │  Q_REVENUE → Q_PAIN → SLOTS_OFFERED → (NEED_EMAIL) → DONE
                                                          │ on slot pick: POST /api/book-slot (existing, tested)
                                                          ▼
                                                   Google Calendar event + Meet link + invite
                                                   Formspree digest → gerrit@ (BOOKED)
```

Escape hatches built in: `stop`/`unsubscribe` → opt-out; `human`/`call me` → handoff + alert; 2 misparsed replies → handoff. A lead is **never silently lost** — every failure path emails Gerrit to text manually.

---

## Phased rollout

### Phase 0 — Accounts & keys (your hands; ~1 hr + 1–2 day A2P wait)
- [ ] **Twilio**: create account, buy a local FL number, register **A2P 10DLC** (US business SMS — ~1–2 day approval; required or carriers block your texts). Get `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`.
- [ ] **Vercel KV** (Upstash): add the KV integration to the `benefique-website-382f` project → it auto-injects `KV_REST_API_URL` + `KV_REST_API_TOKEN`. Free tier is plenty.
- [ ] **Meta**: Business Suite + Ads account + payment method. Create the **Pixel** (a.k.a. dataset). Set starting budget.
- [ ] **Higgsfield/Runway**: account for AI video (only needed for the video cells; static can launch first).

> Env-var hygiene (from hard-won memory): use `vercel env add` CLI, not the dashboard UI (it silently drops saves). Never click an existing var row to edit — it overwrites. Verify with `vercel env ls`.

### Phase 1 — Speed-to-lead bot (code DONE, in `api-staging/`)
- [ ] Add a public copy of slots: have `scripts/update-booking-slots.py` also write `public/booking-slots.json` (so `sms-reply.js` can fetch open times over HTTP). One-line change.
- [ ] Move `api-staging/lead-intake.js` + `sms-reply.js` → `/api/`.
- [ ] Set Twilio number's inbound webhook → `https://benefique.com/api/sms-reply` (POST).
- [ ] `npm run build` locally (mandatory per CLAUDE.md), then push.
- [ ] **Test end-to-end with your own phone before a single ad dollar.**

### Phase 2 — Creative (copy DONE)
- [ ] Run `ad-library-research-sop.md` Round 1 (10 winners) — Claude can extract from URLs/screenshots you paste.
- [ ] Produce 4 static + 4 carousel in brand (navy `#1a3e6f` / orange `#e67e22`, Inter).
- [ ] Produce 3–4 AI videos (9:16 + 1:1, captions baked in) from `ad-copy-variants.md` V1–V4.

### Phase 3 — Conversion page
- [ ] Build a dedicated paid landing route (variant of `/thank-you`) — diagnostic offer above the fold, form posts to `/api/lead-intake`. (I can build this React route next.)
- [ ] Add Meta Pixel + CAPI (below).

### Phase 4 — Launch & measure
- [ ] Campaign structure (below). Start **$50–75/day × 14 days**.
- [ ] Daily read; kill creatives under target CPL after ~1k impressions; scale winners.

---

## Meta Pixel + CAPI (spec)

**Browser Pixel** (add to `index.html` `<head>` or a React effect on route change):
- `PageView` (all pages)
- `Lead` — fire on successful `/api/lead-intake` 200 response (form submit)
- `Schedule` — fire when `sms-reply` reaches `DONE` (booked). Since that happens server-side, send it via **CAPI** from `sms-reply.js` (Conversions API event, deduped against any client event by `event_id`).

**Why CAPI matters here:** the actual conversion (booked call) happens over SMS, off-site. Without CAPI, Meta only ever sees the form fill, not the booking — so it optimizes for cheap form-fills, not booked diagnostics. Sending the `Schedule` event server-side from `sms-reply.js` lets Meta optimize for the event that actually matters.

> I can add: (a) the Pixel snippet + `Lead` fire, and (b) a CAPI `Schedule` call inside `sms-reply.js` — say the word and I'll wire both. Needs `META_PIXEL_ID` + `META_CAPI_TOKEN`.

---

## Recommended campaign structure (launch)
- **Objective:** Leads (optimize for `Lead`, then switch to `Schedule`/CAPI once ~15+ bookings give Meta signal).
- **1 campaign → 2–3 ad sets:**
  - Ad set A: SE FL broad SMB (geo: Broward/Miami-Dade/Palm Beach; age 30–60; Advantage+ detailed targeting on)
  - Ad set B: Interest (QuickBooks, Xero, small-business-owner, entrepreneurship)
  - Ad set C (after ~50 leads): Lookalike, seed = booked-call list / client list
- **4–5 creatives per ad set** mixing static / carousel / video angles from the testing matrix in `ad-copy-variants.md`.
- **Landing-page vs. native lead form:** test both. Native Meta lead forms = cheaper, faster speed-to-lead trigger; landing page = higher intent + your full booking funnel. Both can POST into `/api/lead-intake` (native via Meta's lead webhook → small adapter; landing via the form directly).

---

## Cost envelope (rough, monthly)
| Item | Cost |
|---|---|
| Meta ad spend (test) | $1,500–2,250/mo ($50–75/day) |
| Twilio number + SMS | ~$1 + ~$0.01/msg (a few $/mo at test volume) |
| Vercel KV | $0 (free tier) |
| Higgsfield/Runway | ~$30–95/mo (video tier) |
| **Total to validate** | **~$1,600–2,400/mo** |

Success metric: **cost per booked diagnostic**, not cost per lead. Benchmark against your flat-fee LTV — even at a high CPL, one closed SE FL engagement (multi-thousand $/mo, multi-year) pays for months of testing. Track CAC payback explicitly.

---

## Status
- [x] Ad copy bank (`ad-copy-variants.md`) — 12 variants
- [x] Ad Library research SOP (`ad-library-research-sop.md`)
- [x] Speed-to-lead bot code (`api-staging/lead-intake.js`, `api-staging/sms-reply.js`)
- [ ] Paid landing page route — *buildable next, no spend*
- [ ] Meta Pixel + CAPI wiring — *buildable next, needs Pixel ID + CAPI token*
- [ ] Phase 0 accounts (Twilio / KV / Meta / Higgsfield) — *your hands*
- [ ] Go-live
