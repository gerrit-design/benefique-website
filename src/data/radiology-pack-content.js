// radiology-pack-content.js — prose and schema for /radiology/intelligence-pack
//
// Plain data, no JSX, so BOTH the React page and scripts/route-metadata.js can
// import it. The crawlable HTML and the rendered page therefore come from one
// source and cannot drift apart.
//
// Guardrails baked in here: no payer is named, no tracer brand is named, no
// client is identifiable, and no dollar price for advisory work appears.

import {
  PACK_GROUP_NAME,
  packTotals,
  packSpread,
  packFastRails,
  packRailRows,
  packMoney2,
} from './radiology-pack.js';

// Slowest rail, derived — never typed.
const slowestRail = packRailRows.reduce((a, b) => (b.dsoDays > a.dsoDays ? b : a));

const SITE = 'https://www.benefique.com';
const PACK_URL = `${SITE}/radiology/intelligence-pack`;

const money0 = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const num0 = (n) => n.toLocaleString('en-US');
const pct1 = (n) => `${(n * 100).toFixed(1)}%`;

/** Flatten a bold-aware segment array to plain text. */
export const packFlatten = (segments) => segments.map((seg) => seg.t).join('');

/**
 * Every sentence the pack page shows a reader.
 *
 * Both the React component and scripts/route-metadata.js render FROM HERE, so
 * the crawlable HTML and the visible page are the same words. Callouts are
 * segment arrays so the page can bold figures while the prerenderer flattens
 * the identical sentence to text.
 *
 * Wording discipline: this model knows scan counts, net collected per scan and
 * rail-level average days to cash. It knows nothing about cost, denial risk,
 * cost of capital or demand. No sentence below may claim more than that.
 */
export const packProse = {
  badge: 'Illustrative data — fictional group, synthetic figures',

  lede:
    'This is the reporting an independent imaging group gets from us, shown end to end on a fictional composite — so you can read the method before you ever share a file.',

  disclaimer: [
    { t: `Every number below is invented. ${PACK_GROUP_NAME} does not exist, no payer is named, and no patient data appears anywhere on this page. What is real is the ` },
    { t: 'method', b: true },
    { t: ' — the report library, the metric definitions, and the fact that every cut reconciles to the others. Your version runs on your own data and stays private to you.' },
  ],

  bookHeading: `${PACK_GROUP_NAME} — the illustrative book`,

  ex1Heading: 'Worked example 1 — the gap is mix, not billing performance',
  ex1Intro:
    'Every center below bills on identical rail economics: in this illustration nobody negotiated better terms and nobody is collecting harder, because the model gives every center the same rate on every rail. So the whole spread has to come from mix — which points the investigation at demand and scheduling rather than at the billing office.',
  ex1Callout: [
    { t: `${packSpread.bestName}` , b: true },
    { t: ` nets ${packMoney2(packSpread.bestNetPerScan)} a scan against ` },
    { t: `${packSpread.worstName}`, b: true },
    { t: ` at ${packMoney2(packSpread.worstNetPerScan)} — a ${packSpread.multiple.toFixed(2)}x spread. The government rail is ${pct1(packSpread.bestGovShare)} of the first center's volume and ${pct1(packSpread.worstGovShare)} of the second's. Put ${packSpread.worstName}'s own ${num0(packSpread.worstScans)} scans on ${packSpread.bestName}'s mix, at unchanged rates, and the difference is ` },
    { t: `${money0(packSpread.mixGapAnnual)} a year`, b: true },
    { t: '. No report that stops at the group average will ever show you that.' },
  ],

  ex2Heading: 'Worked example 2 — one blended DSO hides the answer',
  ex2Intro:
    'A rail is just a route money travels to reach you — commercial insurance, government, personal injury, workers compensation, the patient paying at the desk. Each behaves differently, and a single blended average tells you nothing you can act on. Split them apart and the working-capital question comes into focus: which route is returning cash quickly, and which one you are carrying.',
  ex2Callout: [
    { t: 'The blended figure is ' },
    { t: `${packTotals.blendedDso.toFixed(0)} days`, b: true },
    { t: ', and not one rail in the business behaves like that. The rails carrying ' },
    { t: `${pct1(packFastRails.share)} of the group's scans`, b: true },
    { t: ` average ${packFastRails.avgDays} days or less; a single long rail averaging ${slowestRail.dsoDays} days drags the blend. That rail also pays the most per scan, so whether it is worth carrying is a real question — one that needs its cost of capital, denial risk and settlement clock, which is what the lien-aging and A/R cohort reports are for. What the split settles is narrower and more useful: you can see which rail is holding your cash, and for how long.` },
  ],

  libraryHeading: 'The report library, in the order a scan travels',
  libraryIntro:
    'You are not expected to read twenty-one reports. You get a short monthly answer and the two or three numbers that changed; this library is the work behind that answer, and it is there when you or your lender want to open it up. It is laid out as the journey of one scan — a referral arrives, the magnet scans it, a radiologist reads it, the claim goes out, the money comes back — so each stage answers one question an owner actually asks.',

  faqHeading: 'Questions operators ask about this page',

  ctaHeading: 'See this built on your own centers',
  ctaBody:
    'A Strategic Radiology Review produces the real version of everything above from the systems you already run. Fixed fee, scoped on intake, two weeks from data access.',
};

// The engagement report library, arranged as the journey of a single scan —
// the same spine we use when laying out a client reporting portal.
export const packLibrary = [
  {
    stage: '1 · A referral arrives',
    question: 'Which referrers send you profitable work, and which just send you volume?',
    reports: [
      {
        name: 'Referrer Value Scorecard',
        desc: 'Every referring practice ranked on the cash it produces rather than the scans it sends — volume, rail mix, realised net per scan, and the year-over-year direction of each.',
      },
      {
        name: 'Scan-to-Cash by Referrer',
        desc: 'How long money takes to come back, split by who sent the patient. Two referrers with identical volume can sit months apart, because they send different payer mixes.',
      },
      {
        name: 'Scheduling Priority Bands',
        desc: 'Which requests should get the next open slot when demand exceeds capacity, banded by expected yield and time to cash.',
      },
    ],
  },
  {
    stage: '2 · The magnet scans it',
    question: 'What is an hour on your most expensive asset actually worth?',
    reports: [
      {
        name: 'Modality Utilisation',
        desc: 'Booked, completed, no-showed and cancelled against available hours — per room, per center, per hour of the day.',
      },
      {
        name: 'Revenue per Available Slot',
        desc: 'The airline metric applied to imaging: utilisation multiplied by yield per completed scan. Separates an empty-schedule problem from a low-price problem.',
      },
      {
        name: 'Slot Playbook',
        desc: 'What each center should do with its trough hours — release, hold, or re-point at a different rail — with the revenue consequence of each option.',
      },
      {
        name: 'Center Staffing',
        desc: 'Labour cost per completed scan by center and by role, measured against the volume actually delivered.',
      },
    ],
  },
  {
    stage: '3 · A radiologist reads it',
    question: 'Is your reading spend priced and routed correctly?',
    reports: [
      {
        name: 'Read Expense Analysis',
        desc: 'Read cost by vendor, modality and quarter — price consistency, turnaround, capacity headroom, and a forward spend forecast.',
      },
      {
        name: 'Read Routing Model',
        desc: 'What changes if a study type moves between reading vendors: cost, turnaround, and the volume each vendor can absorb.',
      },
    ],
  },
  {
    stage: '4 · The claim goes out',
    question: 'How much cash is lost between the scan and a clean claim?',
    reports: [
      {
        name: 'Billing Lag by Center',
        desc: 'Days from date of service to claim submission, by center and by month. Usually the cheapest days to recover in the whole cycle.',
      },
      {
        name: 'Denials and Zero-Pay',
        desc: 'Denial and zero-pay rates by reason, rail and procedure, with the recoverable share separated from the structurally unpayable.',
      },
      {
        name: 'Charge-to-Cash by Modality',
        desc: 'Charged, allowed, adjusted and collected for every modality, so a write-off becomes visible as a decision rather than an accident.',
      },
    ],
  },
  {
    stage: '5 · The money comes back',
    question: 'Which rail is funding the business, and which one are you funding?',
    reports: [
      {
        name: 'DSO by Payer Rail',
        desc: 'Days to cash per rail. A single blended DSO hides the only number you can act on — the worked example above shows how far off it can be.',
      },
      {
        name: 'Net Collection Rate by Rail and Procedure',
        desc: 'Collected against contractually allowed, cut finely enough to name the specific rail-and-procedure combinations that lose money on identical work.',
      },
      {
        name: 'A/R Aging Cohort',
        desc: 'Receivables followed by the month they were created rather than by aging bucket, so you see the collection curve instead of a snapshot.',
      },
      {
        name: 'Patient Responsibility',
        desc: 'The balance left with the patient after adjudication — how much, how old, and how much of it is realistically collectable.',
      },
      {
        name: 'Lien and Settlement Aging',
        desc: 'For personal-injury work: the settlement clock, the advance at risk, and what the face value of a file is actually worth today.',
      },
    ],
  },
  {
    stage: '6 · Running the centers',
    question: 'Can you hold each center accountable to a number it controls?',
    reports: [
      {
        name: 'Center Collections Scorecard',
        desc: 'Quarterly per-center performance on the handful of measures a center manager can actually move.',
      },
      {
        name: 'Center Comparison',
        desc: 'Every center side by side: rail mix, cost of service, operating expense, head-office load, and the bottom line per scan.',
      },
      {
        name: 'Payer Mix Trend',
        desc: 'How the mix has drifted over the periods you have data for — the slowest-moving and most expensive change in the business.',
      },
      {
        name: 'Group Flow Map',
        desc: 'One interactive picture of every dollar entering the group, by rail, by center and by quarter.',
      },
      {
        name: 'Board Pack and CFO Monthly',
        desc: 'The lender-facing and owner-facing summaries the whole library rolls up into, including the quality-of-earnings framing a diligence reader will look for.',
      },
    ],
  },
];

export const packFaqs = [
  {
    q: 'Are these real numbers?',
    a: 'No. Meridian Imaging Partners is a fictional composite and every figure on this page is synthetic. We do not publish client data. What is real is the method — the report library, the metric definitions, and the way each cut reconciles to the others. Your version is built on your own data and stays private to you.',
  },
  {
    q: 'Why is no payer named anywhere?',
    a: 'Two reasons. Contract terms with a named payer are confidential to the operator who negotiated them, so we never publish them. And the analysis does not need the name: what changes a decision is how a rail behaves — what it pays per scan, how fast it pays, and how often it denies. We group by rail behaviour on public pages and keep the names inside your own reporting.',
  },
  {
    q: 'Where does the data come from in a real engagement?',
    a: 'Your existing systems, unchanged. Typically the RIS or scheduling system for slots and completions, the billing system for charges, adjudication and payments, the general ledger for cost and overhead, and payroll for labour by center. Nothing is installed and nothing is migrated. Most of the work is joining those sources correctly, which is the step that is usually missing.',
  },
  {
    q: 'How is this different from the reports our billing company already sends?',
    a: 'A billing report measures billing activity: claims out, payments in, an aging bucket. It cannot see the cost of the scan, the cost of the read, the labour behind the room, or the slot that was never filled. Profitability lives in the join between billing activity and the general ledger, and almost nobody builds it.',
  },
  {
    q: 'Do you need patient-level data?',
    a: 'We work at the level of the study and the claim line. No report in this library needs patient names, addresses or clinical detail to be produced. Data handling and scope are agreed in writing before anything is transferred.',
  },
  {
    q: 'Am I going to be handed twenty-one reports to read every month?',
    a: 'No. You get a short monthly answer — what changed, what it is worth, and what to do about it. The library is the work behind that answer. Most owners open two or three of the reports a year, usually when a lender, a partner or a buyer asks a question that needs the detail.',
  },
  {
    q: 'Can I see what a real client got, not an invented one?',
    a: 'Not on a public page — client figures stay with the client. What we can do on a call is walk through a redacted engagement under NDA, and put you in touch with an operator we already work with. This page exists so you can judge the method before any of that.',
  },
  {
    q: 'Who does the work?',
    a: 'Benefique Tax & Accounting, led by Gerrit Disbergen, EA. Engagements run remotely off the systems you already have; our current imaging work spans Florida and Texas.',
  },
  {
    q: 'What does an engagement cost?',
    a: 'Fixed fee, scoped on intake. The right number depends on center count, modality mix and how many systems have to be joined, so we quote it after seeing the shape of your data rather than from a rate card.',
  },
];

export const packSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PACK_URL,
      url: PACK_URL,
      name: 'The Radiology Intelligence Pack — a worked, illustrative example',
      description:
        'A fully illustrative walkthrough of the reporting an independent multi-center imaging group receives from Benefique: net revenue per scan by center, days to cash by payer rail, and the complete report library. All figures are synthetic; no client, payer or patient data is used.',
      isPartOf: { '@type': 'WebSite', name: 'Benefique Tax & Accounting', url: SITE },
      about: ['Diagnostic imaging center', 'Radiology practice management', 'Revenue cycle management', 'Fractional CFO'],
      publisher: { '@type': 'Organization', name: 'Benefique Tax & Accounting', url: SITE },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Radiology', item: `${SITE}/radiology` },
        { '@type': 'ListItem', position: 3, name: 'Intelligence Pack', item: PACK_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: packFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};
