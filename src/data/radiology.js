// radiology.js — single source of truth for the /radiology hub.
//
// Imported by BOTH src/App.jsx (what a browser renders) and
// scripts/route-metadata.js (what a crawler and an AI agent read).
// Editing the copy here updates both surfaces at once, so the prerendered
// HTML can never drift from the live page.

export const radiologyHero = {
  lede: 'Radiology CFO Intelligence — profit and cash by center, by modality, by payer and by claim, for independent multi-center imaging groups.',
  // Segments so the page can bold the named frameworks and the prerenderer can
  // flatten the same sentence to plain text. One source, two renderings.
  intro: [
    { t: 'Independent imaging centers are winning demand faster than their back offices can convert it into cash. We compress the ' },
    { t: 'referral → auth → scan → claim → paid', b: true },
    { t: ' cycle, separate your ' },
    { t: 'PET Tracer Unit', b: true },
    { t: ' from your ' },
    { t: 'Radiology Unit', b: true },
    { t: ', and turn billing-company activity into economic outcomes your lender will fund — profit and cash read by center, by modality, by payer, by tracer and by claim. Engagements run remotely off the systems you already have; our current imaging work spans Florida and Texas. This is the intelligence your accountant and your billing company will not build for you.' },
  ],
};

export const radiologyIntroText = radiologyHero.intro.map((seg) => seg.t).join('');

export const radiologyServices = [
  {
    icon: '🧪',
    title: 'PET Tracer Economics',
    desc: 'Two Business Unit decomposition separating high-reimbursement PET Tracer Scans from general radiology. Per-payer, per-tracer, per-facility toxic-combination detection and referrer strategy.',
    link: '/blog/referring-doctor-relationship-myth-medical-imaging',
    linkLabel: 'The Relationship Myth',
  },
  {
    icon: '💵',
    title: 'Collections & Cash Release',
    desc: 'Per-payer DSO, aging decomposition, Letter-of-Protection trap analysis, and the billing-fee-versus-DSO trade-off your biller will not run for you.',
    link: '/blog/radiology-accounts-receivable-line-of-credit',
    linkLabel: 'How Banks Misread Your A/R',
  },
  {
    icon: '📊',
    title: 'Payer Mix Analysis',
    desc: 'PIP compression modeling, payer grading A–F, and the front-desk selection economics that lock in profitability weeks before billing touches the claim.',
    link: '/blog/toxic-payers-losing-money-medical-practice',
    linkLabel: '7 Payers, 41 Procedures, $80,593 Lost',
  },
  {
    icon: '🔍',
    title: 'Per-Claim Profitability',
    desc: '$/Claim → GP$/Claim → NOI/Claim stack. High-cost procedure economics. Which procedures lose money on which payers — a 9:1 profitability gap on identical work.',
    link: '/blog/high-cost-procedure-economics-medical-practice',
    linkLabel: '$2,940 Out the Door',
  },
  {
    icon: '🏢',
    title: 'Multi-Center COO Scorecard',
    desc: 'Quarterly performance framework with gated bonus design, independent assessment, and cross-center benchmarking that holds operators accountable to numbers.',
    link: '/blog/real-time-financial-dashboards-healthcare-practices',
    linkLabel: '10 KPIs Every Practice Should Track',
  },
  {
    icon: '🧾',
    title: 'Radiology Tax & R&D',
    desc: 'Section 41 R&D credits for imaging groups ($40K–$120K/year typical). S-corp reasonable compensation. Entity structure. 2026 tax law changes.',
    link: '/blog/rd-tax-credits-healthcare',
    linkLabel: 'R&D Tax Credits for Healthcare',
  },
];

export const radiologyClusters = [
  {
    title: 'Multi-Site & Scaling Operations',
    anchor: 'multi-site',
    blurb: 'Running more than one center? Portfolio and per-center P&L, COO accountability, and the math of adding the next location.',
    posts: [
      { slug: 'multi-center-imaging-owner-income-2026-sefl', title: 'Multi-Center Imaging Owner Income: 2026 SE Florida Benchmarks' },
      { slug: 'per-unit-pnl-multi-location-cost-analysis', title: 'Per-Unit P&L for Multi-Location Practices' },
      { slug: '6-financial-blockers-killing-healthcare-practices', title: 'The 6 Financial Blockers Killing Healthcare Practices' },
      { slug: 'real-time-financial-dashboards-healthcare-practices', title: '10 KPIs Every Healthcare Practice Should Track in Real Time' },
      { slug: 'assembly-line-thinking-medical-practice-profitability', title: 'The Factory That Didn\'t Know It Was Losing Money' },
    ],
  },
  {
    title: 'PET Tracer Economics',
    anchor: 'pet-tracer',
    blurb: 'The single largest P&L driver in a modern center — and the one most accounting systems blend into invisibility.',
    posts: [
      { slug: 'referring-doctor-relationship-myth-medical-imaging', title: 'The Relationship Myth: When Taking One For The Team Costs $142,000' },
      { slug: 'high-cost-procedure-economics-medical-practice', title: '$2,940 Out the Door Before You Know If You\'ll Get Paid' },
      { slug: 'per-modality-profitability-imaging-center', title: 'Per-Modality Profitability: MRI vs CT vs Ultrasound vs PET' },
      { slug: 'expensive-2-minute-decision-medical-practice', title: 'The Most Expensive 2-Minute Decision in Your Medical Practice' },
    ],
  },
  {
    title: 'Revenue Cycle: A/R, DSO & Billing',
    anchor: 'revenue-cycle',
    blurb: 'Per-payer DSO, aging decomposition, the billing-fee-versus-collections trade-off, and A/R your lender will actually fund.',
    posts: [
      { slug: 'net-collection-rate-imaging-centers', title: 'Net Collection Rate for Imaging Centers: Formula & 2026 Benchmarks' },
      { slug: 'dso-benchmarks-imaging-centers-2026-sefl', title: 'DSO Benchmarks for Imaging Centers: 2026 SE Florida Data' },
      { slug: 'imaging-rcm-glossary', title: 'The Imaging RCM Glossary: 16 Terms That Decide Whether Your Center Gets Paid' },
      { slug: 'radiology-accounts-receivable-line-of-credit', title: 'Radiology Accounts Receivable: How Banks Misread Your Aging Report' },
      { slug: 'dso-lying-medical-practice-cash-flow', title: 'Your DSO Is Lying to You — Why Averages Hide Your Real Cash Flow Problem' },
      { slug: 'medical-billing-fees-vs-collections-dso', title: 'Your Billing Company Costs 6%. Slow Collections Cost 10x That.' },
      { slug: 'ai-cash-flow-waterfall-explained', title: 'How AI Found That $1M in Profit Left Zero Cash in the Bank' },
    ],
  },
  {
    title: 'Payer Mix (Commercial / PI / Self-Pay)',
    anchor: 'payer-mix',
    blurb: 'PIP and Letter-of-Protection compression, payer grading A–F, and the front-desk selection economics that lock in profit before billing touches the claim.',
    posts: [
      { slug: 'radiology-cash-flow-by-payer', title: 'Radiology Cash Flow by Payer: Why the P&L Lies' },
      { slug: 'texas-lop-imaging-accounts-receivable', title: 'LOP Economics in Texas: Why Imaging A/R Works Differently Than Florida' },
      { slug: 'toxic-payers-losing-money-medical-practice', title: '7 Payers, 41 Procedures, $80,593 Lost' },
      { slug: 'lop-cash-cycle-personal-injury-practice-ar', title: 'Why PI-Heavy Practices Carry 20+ Months of A/R: The LOP Cash Cycle' },
      { slug: 'lop-economics-real-yield-vs-face-value', title: 'LOP Economics: Real Yield vs Face Value (Imaging Center 2026)' },
      { slug: 'radiology-collections-dashboard-case-study', title: 'Real-Time Collections Intelligence for Multi-Center Radiology' },
    ],
  },
  {
    title: 'Per-Claim Profitability',
    anchor: 'per-claim',
    blurb: 'The $/Claim → GP$/Claim → NOI/Claim stack. Which procedures lose money on which payers — a 9:1 profitability gap on identical work.',
    posts: [
      { slug: 'per-modality-profitability-imaging-center', title: 'Per-Modality Profitability: MRI vs CT vs Ultrasound vs PET' },
      { slug: 'high-cost-procedure-economics-medical-practice', title: '$2,940 Out the Door Before You Know If You\'ll Get Paid' },
      { slug: 'cash-flow-breakeven-per-patient-activity-units', title: 'Your Practice Is Profitable — So Why Do You Need 922 Patients?' },
      { slug: 'fixed-cost-breakeven-volume-problem', title: 'Your Practice Doesn\'t Have a Profit Problem — It Has a Volume Problem' },
    ],
  },
  {
    title: 'M&A & Exit / QofE Readiness',
    anchor: 'ma-exit',
    blurb: 'Buying the next center, or getting ready to sell. Valuation logic, deal structure, owner economics, and quality-of-earnings readiness.',
    posts: [
      { slug: 'selling-imaging-center-what-buyers-pay', title: 'Selling Your Imaging Center: What Buyers Actually Pay (SDE, EBITDA, Multiples)' },
      { slug: 'how-to-acquire-second-imaging-center', title: 'How to Acquire a Second Imaging Center: The Financial Roadmap' },
      { slug: 'cash-machine-vs-exit-machine', title: 'Cash Machine vs Exit Machine: Which Are You Building?' },
      { slug: 'multi-center-imaging-owner-income-2026-sefl', title: 'Multi-Center Imaging Owner Income: 2026 SE Florida Benchmarks' },
      { title: 'Building Wealth as an Imaging Center Owner: Beyond the Practice', comingSoon: true },
    ],
  },
  {
    title: 'Radiology Tax & R&D',
    anchor: 'tax-rd',
    blurb: 'Section 41 R&D credits for imaging groups, S-corp reasonable compensation, entity structure, and 2026 tax-law changes.',
    posts: [
      { slug: 'rd-tax-credits-healthcare', title: 'R&D Tax Credits: Hidden Money for Healthcare Practices' },
      { slug: 's-corp-reasonable-compensation-healthcare-service-businesses-broward-county', title: 'S-Corp Reasonable Compensation for Healthcare Service Businesses' },
      { slug: '2026-tax-law-changes-broward-county-healthcare-service-businesses', title: '2026 Tax Law Changes for Healthcare Practice Owners' },
      { slug: 'missed-tax-deductions-healthcare-service-businesses-broward-county', title: '7 Tax Deductions Your Practice Is Probably Missing' },
    ],
  },
];

export const radiologyFaqs = [
  {
    q: 'Who is the Strategic Radiology Review for?',
    a: 'Imaging center operators, CFOs, and medical directors running one or more centers with $2M+ revenue who suspect their accountant and billing company cannot answer per-payer, per-tracer, or per-claim profitability questions. Typical profile: growing but cash-constrained, unclear on PET Tracer Scan economics, preparing for a lender conversation, or renegotiating payer contracts.',
  },
  {
    q: 'What are PET Tracer Scans, and why do you separate them?',
    a: 'PET Tracer Scans refers to high-reimbursement specialty tracers with radiopharmaceutical input costs of $2,000–$3,000 per dose and payer reimbursement that varies as much as 9x depending on payer mix. Their economics are structurally different from general radiology (MRI, CT, ultrasound, X-ray, standard PET). Blending them into one "imaging" line hides the single largest profit-and-loss driver in a modern center — which is exactly what most accounting systems do. Our Two Business Unit Framework breaks them apart.',
  },
  {
    q: 'Do you replace our accountant or biller?',
    a: 'No. We sit above both. Your accountant keeps the books. Your biller processes claims. We build the intelligence layer that makes sense of both data sources together — per-payer, per-tracer, per-facility, per-claim. Most engagements run alongside existing accounting and billing relationships.',
  },
  {
    q: 'What does the Strategic Radiology Review deliver?',
    a: 'A banker-grade Intelligence PDF covering Two Business Unit decomposition, PET Tracer economics with toxic-combination detection, per-claim profitability stack, DSO by payer, payer mix risk analysis, and a prioritized action plan with quantified dollar impact. Turnaround is two weeks from data access. A 90-minute executive readout is included.',
  },
  {
    q: 'What is the investment for ongoing CFO work?',
    a: 'It depends on center count, complexity, and scope. We propose specific scope and pricing on the Strategic Review readout — after we have seen your data, not before. This avoids the common trap of buying generic "CFO services" priced by hour or headcount rather than by the problems actually worth solving.',
  },
  {
    q: 'Can you help us prepare for a lender or line-of-credit conversation?',
    a: 'Yes. We have built triple-reconciliation methodologies that align operational billing data, the accounting system, and bank-grade aged receivables — typically within 0.5% variance. This is the difference between a lender funding a seven-figure facility and a lender asking for another quarter of data.',
  },
];

// The Intelligence Pack promo. Rendered as a card on /radiology and as a
// heading + paragraph + link in the prerendered HTML — same words on both.
export const radiologyPackPromo = {
  heading: 'See the reporting before you share a file',
  body:
    'A complete worked example of an imaging engagement, built on a fictional composite group with synthetic figures: net revenue per scan by center, days to cash by payer rail, and the full report library.',
  linkText: 'Open the Radiology Intelligence Pack',
  href: '/radiology/intelligence-pack',
};

// The proof strip. Rendered as three stat tiles on /radiology and as a list in
// the prerendered HTML — same figures, same caption, one source.
export const radiologyProof = {
  stats: [
    { value: '+$290K', label: 'Q1 NOI swing at a 4-center SE Florida imaging group' },
    { value: '$597K', label: 'Collection momentum unlocked in 90 days at a regional operator' },
    { value: '$154K/yr', label: 'Preventable PET Tracer Scan losses quantified at a single center' },
  ],
  caption:
    'Anonymized from active Benefique engagements. Specific client context available under NDA on the Review readout.',
};
