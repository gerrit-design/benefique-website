// positioning.js — who Benefique serves, in one place.
//
// This text was previously duplicated across ten surfaces and had already
// drifted three ways ("$500K–$10M+", "$500K to $40M", "$500K+"). It is imported
// by BOTH src/App.jsx and scripts/route-metadata.js so the page, the crawlable
// HTML and the FAQ schema always agree.
//
// Set 2026-09-05. The floor moved from $500K to $5M deliberately:
// a $500K practice bills ~$8K/yr against a ~$63K/yr floor engagement at $5M,
// while costing nearly the same delivery capacity (close, review call, return,
// 24-hour response are largely size-independent). Capacity — not demand — is
// the binding constraint, so the small end was consuming the thing the plan
// needs most.
//
// Two doors, deliberately: imaging is what we market; the established South
// Florida book is acknowledged but closed to new generalist engagements. That
// second sentence is load-bearing — it explains the legacy clients to a reader
// doing diligence instead of letting them read as drift.

export const REVENUE_BAND = '$5M–$50M';
export const REVENUE_FLOOR = '$5M';

/** The primary audience, as a noun phrase. Drop into a sentence. */
export const AUDIENCE_PHRASE =
  'independent, multi-center imaging and healthcare groups';

/** One-line descriptor for hero sub-heads, footers and meta descriptions. */
export const AUDIENCE_ONE_LINE = `${AUDIENCE_PHRASE} doing ${REVENUE_BAND} in revenue`;

/** The established book. Never phrased as something we are recruiting. */
export const LEGACY_BOOK_SENTENCE =
  'We also serve a small book of established South Florida businesses built up since 2002. It is closed to new generalist engagements — our capacity goes to imaging — and those clients keep the full service they have always had.';

export const whoWeServe = {
  heading: 'Who We Serve',
  body: `Independent, multi-center imaging and healthcare groups — typically ${REVENUE_BAND} in revenue, two or more locations, where profit and cash have to be read per center, per modality, per payer and per claim. Owners who are past backward-looking reports and need the numbers an accountant and a billing company cannot produce together.`,
  legacy: LEGACY_BOOK_SENTENCE,
  columns: [
    {
      title: 'What we look for',
      items: [
        'Two or more locations, or one site with real operational complexity',
        'Imaging, diagnostics or a healthcare operation with a revenue cycle worth measuring',
        'A payer mix that decides profitability before billing touches the claim',
        'Owners preparing for a lender conversation, a partner change, or a transaction',
      ],
    },
    {
      title: 'The established book',
      note: 'Closed to new generalist engagements.',
      items: [
        'Professional services & law firms',
        'Marine & industrial services',
        'IT & technology services',
        'Dental & veterinary practices',
      ],
    },
  ],
};

/**
 * Intake revenue bands.
 *
 * The old list led with "Under $500K" and "$500K – $1M" — inviting exactly the
 * engagements we no longer take — and collapsed everything above $10M into one
 * box, so a $35M group looked identical to a $10M one. These bands screen at
 * the floor and resolve the top, which is where the difference now matters.
 */
export const REVENUE_BANDS = [
  'Under $5M',
  '$5M - $10M',
  '$10M - $25M',
  '$25M - $50M',
  '$50M+',
];

/** Answer used on the fractional-CFO and Benefique Intelligence FAQs. */
export const AUDIENCE_FAQ_ANSWER = `${
  AUDIENCE_PHRASE.charAt(0).toUpperCase() + AUDIENCE_PHRASE.slice(1)
} doing ${REVENUE_BAND} in revenue, usually across two or more locations, who are profitable on paper but unclear on cash, unit economics or exit value — and whose accountant and billing company cannot answer per-payer, per-modality or per-claim profitability questions between them. Delivered as a flat-fee engagement, never billed by the hour.`;
