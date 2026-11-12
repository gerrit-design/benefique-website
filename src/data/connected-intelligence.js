// connected-intelligence.js — the "connected intelligence" positioning (Nov 2026).
//
// Single source of truth for the homepage, the /radiology opening, the
// /intelligence page and the /about addition. Imported by BOTH src/App.jsx
// (what a visitor sees) and scripts/route-metadata.js (what a crawler and an
// AI assistant read), so the two can never drift.
//
// Guardrails baked into this copy (do not loosen without the principal):
// - No Palantir, no claim of affiliation, no "first / only / leading".
// - No claim that every system is connected automatically or in real time.
// - No guaranteed savings or ROI; modeled opportunities are labelled as such.
// - No HIPAA / BAA / certification claims. Principal is an EA, not a CPA.
// - "AI" only where it accurately describes how analysis is assisted, always
//   paired with professional review.

import { REVENUE_BAND } from './positioning.js';

export const homeHero = {
  eyebrow: 'Financial & Operational Intelligence for Independent Healthcare',
  h1Lines: ['Your Business Has the Data.', 'We Connect the Intelligence.'],
  subhead:
    'See how every referral, examination, claim and operating decision affects profitability, cash flow and enterprise value.',
  paras: [
    'Benefique connects the operational and financial information behind independent radiology and healthcare businesses.',
    'We bring together scheduling, imaging, billing, collections, accounting and tax information to reveal where money is earned, where it is lost, and what management should do next.',
    'Unlike a conventional analytics provider, we also run the accounting, tax and fractional CFO functions — so our insights are grounded in reconciled financial information.',
  ],
  audience: `Built for independent, multi-center imaging and healthcare groups with ${REVENUE_BAND} in annual revenue.`,
  primaryCta: { label: 'Explore Radiology Intelligence', href: '/radiology' },
  secondaryCta: { label: 'See How Benefique Works', href: '/intelligence' },
};
export const homeH1 = homeHero.h1Lines.join(' ');

export const layerSection = {
  headingLines: ['One Business. Multiple Systems.', 'One Connected Intelligence Layer.'],
  intro: [
    'Most healthcare businesses have plenty of data but very little connected intelligence.',
    'Scheduling knows how many patients were booked. Imaging systems know which examinations were performed. Billing knows what was submitted and collected. Accounting knows what was recorded.',
    'But none of those systems, viewed independently, explains the complete economics of the business.',
    'Benefique connects those perspectives.',
  ],
  sourcesLabel: 'Operational and financial information',
  sources: [
    'Referrals & Scheduling',
    'Imaging & Clinical Workflow',
    'Authorization & Billing',
    'Payers, Claims & Collections',
    'Accounting, Banking & Payroll',
    'Tax, Debt & Capital',
  ],
  coreName: 'Benefique Intelligence',
  coreSub: 'Where operational and financial data become business decisions.',
  capabilities: [
    'Connect and reconcile information',
    'Understand unit-level economics',
    'Detect exceptions and financial leakage',
    'Quantify opportunities and risks',
    'Generate recommendations and track results',
  ],
  outcomesLabel: 'Management outcomes',
  outcomes: [
    'More profitable operating decisions',
    'Improved collections and cash conversion',
    'Better capacity and resource utilization',
    'Stronger financial and tax decisions',
    'Increased lender and transaction readiness',
  ],
  closing: [
    'The value is not in connecting systems for its own sake.',
    'It is in understanding how activity in one part of the business creates a financial consequence elsewhere — and identifying which management actions can improve that outcome.',
  ],
};

export const differenceSection = {
  heading: 'Beyond Accounting. Beyond Dashboards.',
  intro: [
    'Traditional reports tell you what happened.',
    'Connected intelligence explains why it happened, where the underlying problem originated, what it costs, and what should change.',
  ],
  cards: [
    {
      title: 'Traditional Accounting',
      question: 'What happened financially?',
      body: 'Produces financial statements, reconciliations and tax returns.',
    },
    {
      title: 'Revenue Cycle Reporting',
      question: 'What was billed and collected?',
      body: 'Reports claims, denials, aging and collections performance.',
    },
    {
      title: 'Business Intelligence Dashboards',
      question: 'What patterns are visible?',
      body: 'Displays operational and financial metrics through charts and dashboards.',
    },
    {
      title: 'Benefique Intelligence',
      question: 'What should the business do next — and why?',
      body: 'Connects operational activity to financial outcomes, identifies opportunities, quantifies their impact and supports management action.',
      highlight: true,
    },
  ],
  line: "We don't simply report the numbers. We connect the activities that create them.",
};

export const journeySection = {
  heading: 'Follow One MRI Examination From Referral to Cash.',
  intro: [
    'A radiology examination passes through multiple systems, departments and financial events before the business receives payment.',
    'Each department may meet its own performance targets while the overall business loses money.',
    'Benefique analyzes the complete journey.',
  ],
  steps: [
    'Referral', 'Scheduling', 'Authorization', 'Patient Arrival', 'Examination',
    'Radiologist Read', 'Claim', 'Payer Decision', 'Collection', 'Cash', 'Profitability',
  ],
  questionsLabel: 'Questions the intelligence layer can answer',
  questions: [
    { stage: 'Referral', q: 'Which referring physicians create sustainable, profitable volume?' },
    { stage: 'Scheduling', q: 'Are available scanner hours being allocated to economically attractive examinations?' },
    { stage: 'Authorization', q: 'Which examinations create avoidable reimbursement or denial risk?' },
    { stage: 'Imaging', q: 'What is the contribution margin per modality, examination and center?' },
    { stage: 'Billing', q: 'Which completed examinations are delayed, rejected or never submitted?' },
    { stage: 'Collections', q: 'How long does each payer take to convert an examination into cash?' },
    { stage: 'Finance', q: 'How much of reported profitability becomes actual cash after operating costs, debt service and owner distributions?' },
  ],
  closing: 'One examination. Multiple operational systems. One connected financial outcome.',
  cta: { label: 'Explore the 14-Stage Patient Referral-to-Cash Line', href: '/radiology#referral-to-cash' },
};

export const decisionSection = {
  heading: 'Intelligence Is Valuable Only When It Changes Decisions.',
  steps: [
    { title: 'Connect', body: 'Bring together the operational and financial information needed to understand the business.' },
    { title: 'Reconcile', body: 'Validate and reconcile financial information against the general ledger, billing records and banking activity.' },
    { title: 'Analyze', body: 'Identify economic patterns, operational inefficiencies, financial risks and potential opportunities.' },
    { title: 'Recommend', body: 'Translate the findings into prioritized management actions, supported by calculations and clearly stated assumptions.' },
    { title: 'Measure', body: 'Assign responsibility, define the expected outcome and review whether the action produced the intended result.' },
  ],
  closing: 'From fragmented data to accountable decisions.',
  example:
    'Our "If We Were the CEO" report is this process in practice: three prioritized actions each quarter, each with the calculation behind it, an owner at the business, and a re-check against the next data pull.',
  honesty:
    'Analysis is technology-assisted, including AI-assisted analysis, and every finding is reviewed by our team before it reaches you. Data refresh depends on each system: some feeds run daily, others are periodic exports. Decisions, and their implementation, stay with your management team.',
};

export const caseSection = {
  heading: 'What Connected Intelligence Reveals.',
  intro: [
    'The most important financial problems often exist between departments, systems and reporting processes.',
    'Our published research and anonymized case studies illustrate how connecting financial and operational information can reveal issues that individual reports may miss.',
  ],
  structureLabel: 'How we tell each case',
  structure: [
    { t: 'The business problem', d: 'What management saw or believed.' },
    { t: 'The disconnected information', d: 'Which operational or financial data had to be brought together.' },
    { t: 'The intelligence', d: 'What the combined analysis revealed.' },
    { t: 'The decision', d: 'What corrective action was recommended or implemented.' },
    { t: 'The financial outcome', d: 'What was actually measured, estimated or projected.' },
  ],
  legend: [
    { key: 'measured', label: 'Measured', d: 'Found in the business’s own reconciled records.' },
    { key: 'modeled', label: 'Modeled', d: 'A projected effect of recommended actions, with stated assumptions. Not a realized result.' },
  ],
  footnote: 'Client details are anonymized. A modeled opportunity is not a realized financial result.',
};

export const foundationSection = {
  heading: 'The Financial Foundation Behind the Intelligence.',
  intro:
    'Reliable intelligence requires reliable financial information. Benefique manages the underlying accounting, reconciliations, tax planning and financial reporting as part of an integrated engagement. This gives our team the financial foundation needed to connect operating performance to actual profitability, cash flow and owner outcomes.',
  capabilities: [
    { title: 'Outsourced Accounting', body: 'A professionally managed accounting function, with timely monthly financial close and reconciled records.' },
    { title: 'Proactive Tax Strategy', body: 'Year-round tax planning integrated with business operations, cash flow and owner decisions.' },
    { title: 'Fractional CFO', body: 'Cash management, profitability analysis, capital planning, lender reporting and strategic financial guidance.' },
    { title: 'Operational Intelligence', body: 'Analysis across scheduling, imaging, billing, collections and financial information to identify economic opportunities and management priorities.' },
  ],
  closing: 'Accounting establishes the truth. Intelligence turns it into action.',
};

export const homeFaqs = [
  {
    q: 'What is Benefique Intelligence?',
    a: 'Benefique Intelligence is our integrated approach to connecting operational and financial information so independent healthcare owners can understand business economics, identify opportunities and make measurable improvements. It combines accounting, financial analysis and operational data within an ongoing advisory engagement.',
  },
  {
    q: 'How is Benefique different from traditional accounting firms?',
    a: 'Traditional accounting primarily reports completed financial activity. Benefique also analyzes the operational events behind those financial results — including scheduling, examination volume, billing, collections and payer economics — and connects findings to management decisions.',
  },
  {
    q: 'Is Benefique a software company?',
    a: 'No. Benefique is an accounting, tax and fractional CFO business with an integrated operational and financial intelligence capability. We use technology and analytical methods, including AI-assisted analysis reviewed by our team, to deliver insights as part of our professional services, rather than selling a standalone software platform.',
  },
  {
    q: 'What makes Benefique different from a radiology analytics dashboard?',
    a: 'A dashboard displays information. Benefique combines operational analysis with reconciled accounting, cash flow interpretation, tax strategy and management recommendations. We focus on what the information means financially and what action should follow.',
  },
  {
    q: 'Which healthcare businesses does Benefique serve?',
    a: `Our primary focus is independent, multi-center radiology and diagnostic imaging groups, typically generating ${REVENUE_BAND} in annual revenue. We selectively work with other independent healthcare businesses with similar operational and financial complexity.`,
  },
  {
    q: 'Does Benefique replace our billing company?',
    a: 'Not ordinarily. Billing companies continue to process claims and collections. Benefique analyzes billing and collections performance alongside operational and financial information to provide greater visibility and support management oversight.',
  },
  {
    q: 'Can Benefique analyze our existing RIS, PACS and billing systems?',
    a: 'We evaluate the available system exports, data structure and integration options during onboarding. The specific analysis depends on the systems involved, data quality and accessible information. We do not promise a direct integration with every vendor.',
  },
  {
    q: 'How is Benefique priced?',
    a: 'One ongoing engagement for a flat monthly fee, scoped to the size and complexity of the group. Accounting, tax and fractional CFO work are included. We never bill by the hour, and we do not sell standalone reviews or analytics packages.',
  },
];

export const radiologyOpening = {
  h1: 'Financial & Operational Intelligence for Independent Radiology Groups.',
  subtitle: 'Understand the economics of every center, modality, payer and examination — from referral to cash.',
  paras: [
    'Your RIS, PACS, scheduling, billing and accounting systems each contain part of the truth.',
    'Benefique connects the operational and financial information across these systems to reveal how your imaging business actually generates — or loses — profit and cash.',
    'We analyze the full examination life cycle, from referring physician and scheduling through authorization, scanning, interpretation, billing and collection.',
    'Because we also manage the financial close, tax strategy and fractional CFO function, the intelligence connects operational performance to the underlying financial results.',
  ],
  differentiation: 'We connect what your operations team, billing company and accountant see separately.',
  cta: { label: 'Explore the Referral-to-Cash Intelligence Model', href: '#referral-to-cash' },
  bridgeHeading: 'Why the Full Journey Matters',
  bridge: [
    'Each stage of the imaging process has a different owner, a different operational objective and a different financial consequence.',
    'The challenge is not simply measuring the performance of individual departments. It is understanding how decisions at one stage affect reimbursement, collections, cash flow and profitability later in the process.',
    'Our Patient Referral-to-Cash Line brings those relationships into one analytical framework.',
  ],
};

export const intelligencePageCopy = {
  title: 'Benefique Intelligence | Connected Healthcare Financial Intelligence',
  h1: 'Benefique Intelligence: Turning Operational Data Into Financial Decisions',
  description:
    'Benefique Intelligence connects scheduling, imaging, billing, collections and accounting information for independent radiology and healthcare groups — delivered inside an accounting, tax and fractional CFO engagement, not sold as software.',
  lede:
    'Benefique Intelligence is a capability delivered within an integrated accounting, tax and fractional CFO engagement. It is not a separately licensed software product.',
  problem: {
    heading: 'The problem with fragmented business data',
    paras: [
      'An imaging group runs on several systems at once: a scheduling or RIS platform, an imaging and reading workflow, a billing company, a bank, payroll and a general ledger. Each one is accurate about its own slice of the business.',
      'None of them, on its own, tells an owner which center, modality, payer or referrer actually produces profit and cash, or why reported profit and the bank balance disagree. The answers sit in the gaps between the systems.',
    ],
  },
  howHeading: 'How the Benefique Intelligence layer works',
  systems: {
    heading: 'Operational and financial systems we analyze',
    intro: 'The specific sources depend on each client’s systems, data quality and access. Typical sources include:',
    items: [
      'Referral, scheduling and RIS records',
      'Imaging, reading and clinical workflow data',
      'Authorization, charge and claim data from the billing system or billing company',
      'Payer remittances, denials and collections',
      'General ledger, bank and payroll records',
      'Tax, debt, lease and capital records',
    ],
  },
  toIntelHeading: 'How data becomes actionable management intelligence',
  methodsIntro:
    'Inside every engagement we read the connected data through a set of named methods, published so you can see the thinking before you engage us.',
  radiology: {
    heading: 'Radiology as our principal specialization',
    paras: [
      'Most of our work is with independent, multi-center imaging groups. We organize it around the Patient Referral-to-Cash Line: fourteen stops from the referring provider to cash, margin, owner pay and enterprise value. At each stop we name who owns it, what they are scored on, what that score misses, and what we measure instead.',
    ],
    links: [
      { href: '/radiology', text: 'Radiology financial intelligence' },
      { href: '/radiology/line', text: 'The Patient Referral-to-Cash Line' },
      { href: '/radiology/intelligence-pack', text: 'A worked example on synthetic data' },
    ],
  },
  questionsHeading: 'Examples of business questions we answer',
  questions: [
    'Why is our imaging volume increasing while cash is declining?',
    'Which centers and modalities generate the best contribution margins?',
    'Which payers produce attractive reimbursement but poor cash conversion?',
    'Which completed examinations have not been billed?',
    'Where are we losing money between scheduling and collection?',
    'Are our radiologist and vendor charges consistent with examination activity?',
    'How much working capital is trapped in receivables?',
    'Which operational improvements offer the highest financial return?',
    'How does our operating performance affect lender and buyer assessments?',
  ],
  foundation: {
    heading: 'Why the accounting foundation matters',
    paras: [
      'A dashboard built on someone else’s ledger can only be as right as that ledger. We keep the books, close them monthly and reconcile them to bank, payroll and billing records, so operational findings tie back to the numbers a lender, a buyer or the tax return will use.',
      'We do not prepare tax returns unless we keep the books. One ledger produces the monthly close, the CFO analysis and the tax work.',
    ],
  },
  action: {
    heading: 'From insights to management action',
    paras: [
      'Every recommendation is written as an action with an owner at the business, a measure that shows whether it happened, and a date when we check again. The next report shows what we asked and what actually changed.',
    ],
  },
  engagement: {
    heading: 'How engagements work',
    paras: [
      'One ongoing engagement for a flat monthly fee, scoped to the group’s size and complexity. Accounting, tax and fractional CFO work are included. We do not sell standalone reviews, one-off diagnostics or analytics packages.',
      'Onboarding starts with your books and the system exports you already have. We tell you plainly what the data can and cannot support before we promise any analysis.',
    ],
  },
  ctaHeading: 'Apply to work with Benefique',
  ctaBody: `For independent, multi-center imaging and healthcare groups with ${REVENUE_BAND} in annual revenue.`,
};

export const aboutIntelligenceSection = {
  heading: 'Why We Became an Intelligence Business.',
  paras: [
    'Our evolution began with a simple observation: accurate financial statements do not automatically lead to better business decisions.',
    'The more deeply we worked with healthcare and imaging businesses, the more we saw that important financial outcomes were determined long before transactions reached the general ledger.',
    'Referral patterns influenced examination volume. Scheduling decisions affected capacity utilization. Payer contracts influenced economic value. Authorization and billing processes determined whether revenue became cash.',
    'Each system held part of the story.',
    'We began connecting those parts.',
    'Today, Benefique combines the financial discipline of an outsourced accounting and tax practice with operational analysis and strategic CFO decision-making.',
    'Our objective is to give independent healthcare owners the connected financial intelligence that larger organizations build dedicated teams to obtain — without requiring them to assemble and manage those capabilities themselves.',
  ],
};
