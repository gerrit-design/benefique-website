// referral-line.js — single source of truth for the Patient Referral-to-Cash Line.
//
// Imported by src/components/ReferralLine.jsx (the /radiology/line page and the
// "where this article sits" strip on each radiology post), scripts/route-metadata.js
// and scripts/prerender.js (crawlable HTML), and scripts/validate-blog-posts.cjs
// (the build fails if a radiology post has no stop). Radiology posts only.

export const LINE_PATH = '/radiology/line';
export const LINE_NAME = 'Patient Referral-to-Cash Line';

// Each stop answers four questions: who owns it, what they are scored on, what
// that score misses, and what we measure instead. Reviewed by Gerrit 11 Oct 2026.

export const LINES = [
  {
    key: 'ops',
    name: 'Operations line',
    route: 'Referral to read report',
    stops: [
      { code: 'O1', name: 'Referrer', what: 'Who sends the patient, and whether they keep sending',
        owner: 'Marketers', scored: 'New referrers, visits',
        misses: 'Losing an existing VIP referrer costs more than winning a new one, and nobody sees the loss happening',
        measure: 'Referrer retention, VIPs at risk, value per referrer' },
      { code: 'O2', name: 'Schedule & slot', what: 'Which patient gets which magnet-hour',
        owner: 'Scheduling', scored: '% of slots booked',
        misses: 'A 9am slot isn\'t worth the same as 5pm Friday, and a full book can be full of the wrong patients',
        measure: 'Revenue per available magnet-hour' },
      { code: 'O3', name: 'Verify & authorize', what: 'Eligibility, authorization, take or decline',
        owner: 'Intake and authorization', scored: 'Speed, authorizations obtained',
        misses: 'Whether a scan should be taken at all at that payer\'s rate',
        measure: 'Denials traced back to intake; value of scans taken versus declined' },
      { code: 'O4', name: 'Patient shows', what: 'Booked is not scanned: no-shows and cancellations',
        owner: 'Front desk', scored: 'Check-ins, front-desk collections',
        misses: 'Booked isn\'t scanned: PI patients don\'t show up, insurance patients cancel in advance',
        measure: 'Scanned versus booked, by payer class and slot' },
      { code: 'O5', name: 'Scan', what: 'The procedure: time, staff, drug, equipment',
        owner: 'Techs and the center manager', scored: 'Scans per day, utilization',
        misses: 'A center that\'s already busy can\'t be incentivized on the same basis as one with spare capacity',
        measure: 'Contribution per scan, by modality and center' },
      { code: 'O6', name: 'Read & sign', what: 'Report signed, study released to billing',
        owner: 'Reading group', scored: 'Turnaround',
        misses: 'Unsigned studies hold up billing',
        measure: 'Days from scan to release to billing' },
    ],
  },
  {
    key: 'fin',
    name: 'Financial line',
    route: 'Charge to cash to value',
    stops: [
      { code: 'F1', name: 'Charge & claim', what: 'Coding, the billing company, the claim out the door',
        owner: 'Billing company', scored: 'Fee as % of collections',
        misses: 'They\'re paid on what they collect, not on what they leave behind',
        measure: 'Scan-to-claim lag, studies never billed' },
      { code: 'F2', name: 'Payer & denial', what: 'What each payer pays, and what it refuses',
        owner: 'Billing and contracting', scored: 'Denial rate',
        misses: 'What each payer actually nets per scan',
        measure: 'Net yield per scan, by payer' },
      { code: 'F3', name: 'Collections & A/R', what: 'Days to cash, collection rate, open balances',
        owner: 'Billing company', scored: 'Collection rate',
        misses: 'Days to cash by payer, and how PI recovery is factored',
        measure: 'DSO and net collection rate, by payer' },
      { code: 'F4', name: 'Cash in the bank', what: 'Profit versus cash, and where the difference went',
        owner: 'Owner and bookkeeper', scored: 'The P&L',
        misses: 'Profit isn\'t cash',
        measure: 'Cash conversion' },
      { code: 'F5', name: 'Profit per unit', what: 'Margin by modality, center and procedure',
        owner: 'Owner', scored: 'Total revenue',
        misses: 'Which center, modality or scan loses money',
        measure: 'Margin per unit' },
      { code: 'F6', name: 'Tax & owner pay', what: 'What the owner keeps',
        owner: 'CPA', scored: 'Return filed',
        misses: 'Planning only works off monthly books',
        measure: 'What the owner keeps' },
      { code: 'F7', name: 'Lender & capital', what: 'Debt service, credit lines, the bank\'s view',
        owner: 'Owner and the bank', scored: 'Covenants',
        misses: 'The bank misreads the A/R aging report',
        measure: 'DSCR, borrowing base' },
      { code: 'F8', name: 'Value & exit', what: 'What a buyer pays, and how to be ready',
        owner: 'Owner and the buyer', scored: 'The multiple',
        misses: 'Buyers reset the price at diligence',
        measure: 'EBITDA that holds up in diligence' },
    ],
  },
];

// Every radiology post, keyed by blog slug. `stop` is the one stop the article
// is about; `also` is an optional second stop it touches.
export const LINE_POSTS = {
  'marketing-spend-defending-not-growing-book': { stop: 'O1' },
  'referring-doctor-relationship-myth-medical-imaging': { stop: 'O1' },
  'revenue-per-available-magnet-hour': { stop: 'O2' },
  'expensive-2-minute-decision-medical-practice': { stop: 'O3', also: 'F2' },
  'assembly-line-thinking-medical-practice-profitability': { stop: 'O5', also: 'F5' },
  'imaging-rcm-glossary': { stop: 'F1' },
  'medical-billing-fees-vs-collections-dso': { stop: 'F1', also: 'F3' },
  'quarterly-kpi-scorecards-ai-performance-decline': { stop: 'F1' },
  'high-cost-procedure-economics-medical-practice': { stop: 'F2', also: 'O3' },
  'radiology-cash-flow-by-payer': { stop: 'F2' },
  'toxic-payers-losing-money-medical-practice': { stop: 'F2' },
  'dso-benchmarks-imaging-centers-2026-sefl': { stop: 'F3' },
  'lop-cash-cycle-personal-injury-practice-ar': { stop: 'F3' },
  'lop-economics-real-yield-vs-face-value': { stop: 'F3' },
  'net-collection-rate-imaging-centers': { stop: 'F3' },
  'radiology-accounts-receivable-line-of-credit': { stop: 'F3', also: 'F7' },
  'radiology-collections-dashboard-case-study': { stop: 'F3' },
  'texas-lop-imaging-accounts-receivable': { stop: 'F3' },
  'ai-cash-flow-waterfall-explained': { stop: 'F4' },
  'blended-margin-meaning-and-formula': { stop: 'F5' },
  'fixed-cost-breakeven-volume-problem': { stop: 'F5', also: 'O2' },
  'per-modality-profitability-imaging-center': { stop: 'F5' },
  'per-unit-pnl-multi-location-cost-analysis': { stop: 'F5' },
  'radiology-cost-per-scan-1d-2d-3d': { stop: 'F5', also: 'O5' },
  'bonus-depreciation-hiding-net-worth': { stop: 'F6' },
  'multi-center-imaging-owner-income-2026-sefl': { stop: 'F6' },
  'how-to-acquire-second-imaging-center': { stop: 'F8' },
  'selling-imaging-center-what-buyers-pay': { stop: 'F8' },
  'three-views-one-business': { stop: 'F8', also: 'F7' },
};

// Posts that mention imaging but are deliberately NOT on the line, because they
// are written for several industries. The build validator requires every post
// that looks like a radiology post to be in LINE_POSTS or here.
export const OFF_LINE = {
  'cash-flow-breakeven-per-patient-activity-units': 'Multi-industry',
  '6-financial-blockers-killing-healthcare-practices': 'Multi-industry',
  'which-financial-phase-healthcare-business': 'Multi-industry',
  'davie-accounting-services': 'Location page',
  'real-time-financial-dashboards-healthcare-practices': 'Multi-industry',
  'stealth-debt-balance-sheet-hidden': 'Multi-industry',
  'dso-lying-medical-practice-cash-flow': 'Multi-industry',
};

// Words that mark a post as a radiology post for the validator.
export const RADIOLOGY_TERMS = /radiolog|imaging|\bMRI\b|magnet|\bscans?\b|\bPET\b|modalit/i;

const STOP_INDEX = {};
LINES.forEach((line) => line.stops.forEach((s) => { STOP_INDEX[s.code] = { ...s, line }; }));

export function stopFor(code) {
  return STOP_INDEX[code] || null;
}

export function postsAtStop(code) {
  return Object.keys(LINE_POSTS).filter((slug) => LINE_POSTS[slug].stop === code);
}
