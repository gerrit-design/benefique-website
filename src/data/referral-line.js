// referral-line.js — single source of truth for the Referral-to-Cash Line.
//
// Imported by src/components/ReferralLine.jsx (the /radiology/line page and the
// "where this article sits" strip on each radiology post), scripts/route-metadata.js
// and scripts/prerender.js (crawlable HTML), and scripts/validate-blog-posts.cjs
// (the build fails if a radiology post has no stop). Radiology posts only.

export const LINE_PATH = '/radiology/line';

export const LINES = [
  {
    key: 'ops',
    name: 'Operations line',
    route: 'Referral to read report',
    stops: [
      { code: 'O1', name: 'Referrer', what: 'Who sends the patient, and whether they keep sending' },
      { code: 'O2', name: 'Schedule & slot', what: 'Which patient gets which magnet-hour' },
      { code: 'O3', name: 'Verify & authorize', what: 'Eligibility, authorization, take or decline' },
      { code: 'O4', name: 'Patient shows', what: 'Booked is not scanned: no-shows and cancellations' },
      { code: 'O5', name: 'Scan', what: 'The procedure: time, staff, drug, equipment' },
      { code: 'O6', name: 'Read & sign', what: 'Report signed, study released to billing' },
    ],
  },
  {
    key: 'fin',
    name: 'Financial line',
    route: 'Charge to cash to value',
    stops: [
      { code: 'F1', name: 'Charge & claim', what: 'Coding, the billing company, the claim out the door' },
      { code: 'F2', name: 'Payer & denial', what: 'What each payer pays, and what it refuses' },
      { code: 'F3', name: 'Collections & A/R', what: 'Days to cash, collection rate, open balances' },
      { code: 'F4', name: 'Cash in the bank', what: 'Profit versus cash, and where the difference went' },
      { code: 'F5', name: 'Profit per unit', what: 'Margin by modality, center and procedure' },
      { code: 'F6', name: 'Tax & owner pay', what: 'What the owner keeps' },
      { code: 'F7', name: 'Lender & capital', what: 'Debt service, credit lines, the bank\'s view' },
      { code: 'F8', name: 'Value & exit', what: 'What a buyer pays, and how to be ready' },
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
