// intelligence.js — single source of truth for the /intelligence page.
//
// Imported by BOTH src/App.jsx and scripts/route-metadata.js so the crawlable
// HTML and the rendered page describe the methodology in identical words.

export const intelligenceIntro = {
  heading: 'What is Benefique Intelligence?',
  body:
    'Benefique Intelligence™ is the data-analysis methodology behind Benefique Tax & Accounting — a named set of financial frameworks that read the operational data already in your QuickBooks, per unit and per engine, to deliver fractional-CFO-grade answers on cash, tax, profitability, working capital, and exit value. It is the intelligence layer that sits above bookkeeping and tax filing, not a replacement for either.',
};

export const intelligenceMethods = [
  {
    icon: '◳',
    name: 'The Benefique Matrix™',
    answers: 'Which of four states is this business actually in?',
    desc: 'A one-page strategic classification that places any business into Compounder, Cash Cow, Growth Gamble, or Fix-or-Exit on two axes — cash-machine quality and value-build quality — from a normalized six-pillar scorecard. It is the front door of every report.',
    link: '/blog/cash-machine-vs-exit-machine',
    linkLabel: 'Cash Machine vs Exit Machine',
  },
  {
    icon: '👁',
    name: 'Three Views',
    answers: 'What does the same data say to an operator, a banker, and a buyer?',
    desc: 'Every set of books is read three ways — the Operator view (run it better this month), the Banker view (will they fund it), and the Buyer view (what is it worth at exit). One data set, three decisions.',
    link: '/services/fractional-cfo',
    linkLabel: 'Fractional CFO',
  },
  {
    icon: '⛓',
    name: 'Two Business Unit Framework',
    answers: 'Which structurally different engine is actually making the money?',
    desc: 'When one P&L line hides two economically different businesses — a high-input specialty unit and a general unit — we break them apart so the real profit (and the real leak) stops hiding in the blend.',
    link: '/radiology',
    linkLabel: 'Radiology CFO Intelligence',
  },
  {
    icon: '🏭',
    name: 'Activity-Based Decomposition',
    answers: 'Where does each unit of work make or lose money along the line?',
    desc: 'We decompose the business into assembly-line stages, then change any input and watch P&L and cash flow recompute — with a triple break-even (operating, P&L, and cash). Live in the Business Simulator.',
    link: '/tools/business-simulator',
    linkLabel: 'Try the Business Simulator',
  },
  {
    icon: '🔬',
    name: 'Per-Unit Economics',
    answers: 'What does one claim, patient, job, or location really earn?',
    desc: 'The $/unit → gross-profit/unit → NOI/unit stack, computed per location and per line. The same work can carry a 9:1 profitability gap depending on who pays — averages hide it; per-unit economics surface it.',
    link: '/blog/per-unit-pnl-multi-location-cost-analysis',
    linkLabel: 'Per-Unit P&L for Multi-Location Practices',
  },
  {
    icon: '💧',
    name: 'Cash Flow Waterfall',
    answers: 'You booked a profit — so where did the cash actually go?',
    desc: 'A severity-ranked waterfall from net income to ending cash, naming every dollar trapped in receivables, consumed by draws, or hidden behind a trust account. The answer to "profitable on paper, broke in the bank."',
    link: '/blog/ai-cash-flow-waterfall-explained',
    linkLabel: 'How AI Found $1M in Profit and Zero Cash',
  },
  {
    icon: '🔄',
    name: 'Cash Conversion Cycle at Target ARR',
    answers: 'How much working capital will growth actually require?',
    desc: 'DSO, DPO, and DIO modeled forward to your target revenue, so you know the working-capital hole growth digs before you fall into it — and whether a DSO fix beats a fee cut on a cash basis.',
    link: '/blog/dso-lying-medical-practice-cash-flow',
    linkLabel: 'Your DSO Is Lying to You',
  },
  {
    icon: '⚠️',
    name: 'Toxic-Combination Detection',
    answers: 'Which payer, product, or customer loses money every time?',
    desc: 'Payer and product grading A–F with toxic-combination flags — the specific payer × procedure × facility mixes that are guaranteed losses on identical work, quantified in dollars per year.',
    link: '/blog/toxic-payers-losing-money-medical-practice',
    linkLabel: '7 Payers, 41 Procedures, $80,593 Lost',
  },
];
