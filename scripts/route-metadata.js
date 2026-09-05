// route-metadata.js — SEO metadata for all non-blog routes
// Used by prerender.js to generate per-route HTML files

import {
  radiologyHero,
  radiologyIntroText,
  radiologyServices,
  radiologyClusters,
  radiologyFaqs,
  radiologyPackPromo,
  radiologyProof,
} from '../src/data/radiology.js';
import {
  packCenterRows,
  packRailRowsWithShare,
  packTotals,
  packHeadline,
  packMoney2,
} from '../src/data/radiology-pack.js';
import { industries } from '../src/data/industries.js';
import { intelligenceMethods, intelligenceIntro } from '../src/data/intelligence.js';
import { locations } from '../src/data/locations.js';
import {
  AUDIENCE_ONE_LINE,
  AUDIENCE_FAQ_ANSWER,
  whoWeServe,
} from '../src/data/positioning.js';
import {
  packLibrary,
  packFaqs,
  packSchema,
  packProse,
  packFlatten,
} from '../src/data/radiology-pack-content.js';

// The crawlable body for /radiology, assembled from the SAME arrays the React
// page imports. Editing src/data/radiology.js updates the page and this at once.
const radiologyBody = [
  { p: radiologyHero.lede },
  { p: radiologyIntroText },
  { h2: 'Proof' },
  { ul: radiologyProof.stats.map((stat) => `${stat.value} — ${stat.label}`) },
  { p: radiologyProof.caption },
  {
    h2: radiologyPackPromo.heading,
    p: radiologyPackPromo.body,
    links: [{ href: radiologyPackPromo.href, text: radiologyPackPromo.linkText }],
  },
  { h2: 'What We Do for Radiology Groups' },
  { p: 'Six named capabilities delivered inside every engagement. Each one solves a problem generic accounting and billing reports cannot.' },
  ...radiologyServices.map((s) => ({ h3: s.title, p: s.desc })),
  { h2: 'Intelligence Library' },
  ...radiologyClusters.map((c) => ({
    h3: c.title,
    p: c.blurb,
    links: c.posts
      .filter((post) => post.slug)
      .map((post) => ({ href: `/blog/${post.slug}`, text: post.title })),
  })),
  { h2: 'Frequently Asked Questions' },
  { qa: radiologyFaqs.map((f) => ({ q: f.q, a: f.a })) },
];

const SITE = 'https://www.benefique.com';
const DEFAULT_OG_IMAGE = `${SITE}/images/logo-full.jpg`;

// Crawlable body for /radiology/intelligence-pack. Same computed model the
// React page renders, so the numbers a crawler reads are the numbers a visitor
// sees — including the tables, which are the whole proof.
const money0 = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const num0 = (n) => n.toLocaleString('en-US');
const pct1 = (n) => `${(n * 100).toFixed(1)}%`;

const packBody = [
  { p: packProse.badge },
  { p: packProse.lede },
  { p: packFlatten(packProse.disclaimer) },
  { h2: packProse.bookHeading },
  {
    ul: [
      `${packTotals.centers} centers`,
      `${num0(packTotals.scans)} completed scans a year`,
      `${money0(packTotals.net)} net collected`,
      `${packMoney2(packTotals.netPerScan)} net per completed scan`,
    ],
  },
  { h2: packProse.ex1Heading },
  { p: packProse.ex1Intro },
  {
    table: {
      headers: ['Center', 'Completed scans', 'Net collected', 'Net per scan', 'Government rail share'],
      rows: [
        ...packCenterRows.map((c) => [
          c.name,
          num0(c.scans),
          money0(c.net),
          packMoney2(c.netPerScan),
          pct1(c.govShare),
        ]),
        ['Group', num0(packTotals.scans), money0(packTotals.net), packMoney2(packTotals.netPerScan), '—'],
      ],
    },
  },
  { p: packFlatten(packProse.ex1Callout) },
  { h2: packProse.ex2Heading },
  { p: packProse.ex2Intro },
  {
    table: {
      headers: ['Payer rail', 'Share of scans', 'Net per scan', 'Days to cash'],
      rows: [
        ...packRailRowsWithShare.map((r) => [
          r.label,
          pct1(r.share),
          money0(r.netPerScan),
          num0(r.dsoDays),
        ]),
        ['Blended', '100.0%', packMoney2(packTotals.netPerScan), packTotals.blendedDso.toFixed(1)],
      ],
    },
  },
  { p: packFlatten(packProse.ex2Callout) },
  { h2: packProse.libraryHeading },
  { p: packProse.libraryIntro },
  ...packLibrary.flatMap((stage) => [
    { h3: `${stage.stage} — ${stage.question}` },
    { ul: stage.reports.map((r) => `${r.name}: ${r.desc}`) },
  ]),
  { h2: packProse.faqHeading },
  { qa: packFaqs.map((f) => ({ q: f.q, a: f.a })) },
  { h2: packProse.ctaHeading },
  { p: packProse.ctaBody },
  {
    links: [
      { href: '/services/radiology/intake?ref=pack', text: 'Book a Strategic Radiology Review' },
      { href: '/radiology', text: 'Back to Radiology CFO Intelligence' },
    ],
  },
];

// Crawlable body for each /industries/* page, generated from the same object
// the React IndustryPage renders. Mirrors the page: the direct-answer block,
// the challenges list, the featured tool, and the testimonial.
function industryBody(key) {
  const ind = industries[key];
  if (!ind) return undefined;
  const blocks = [
    {
      p: `Benefique Tax & Accounting specializes in accounting and fractional CFO services for ${ind.industry} businesses in South Florida. We provide real-time financial reporting, monthly closes by the 7th, and industry-specific KPI dashboards to help you grow.`,
    },
  ];
  if (Array.isArray(ind.challenges) && ind.challenges.length) {
    blocks.push({ h2: `What we solve for ${ind.industry}` }, { ul: ind.challenges });
  }
  if (ind.tool) {
    blocks.push({ h2: ind.tool.title }, { p: ind.tool.desc }, { links: [{ href: ind.tool.link, text: ind.tool.cta }] });
  }
  if (ind.testimonial) {
    blocks.push({
      h2: 'What clients say',
      p: `"${ind.testimonial.quote}" — ${ind.testimonial.name}, ${ind.testimonial.business}`,
    });
  }
  return blocks;
}

// Crawlable body for /intelligence, generated from the same `methods` array the
// React page renders as cards.
const intelligenceBody = [
  { h2: intelligenceIntro.heading },
  { p: intelligenceIntro.body },
  { h2: 'The frameworks' },
  ...intelligenceMethods.map((m) => ({ h3: m.name, p: m.desc })),
];

// The React IndustryPage and LocationPage headline is
// "<name> Accounting & Fractional CFO Services", but prerender.js derives its
// H1 from route.title when no `h1` is set — which produced a DIFFERENT headline
// for crawlers than for visitors on all twelve of these pages. Derive both from
// the same data instead.
const industryH1 = (key) => `${industries[key].industry} Accounting & Fractional CFO Services`;
const locationH1 = (key) => `${locations[key].city} Accounting & Fractional CFO Services`;

const routes = [
  // Core pages
  {
    path: '/',
    title: 'Benefique Tax & Accounting | Fractional CFO Services | Davie FL',
    description: `You stop watching your bank balance shrink while your P&L says you are profitable. We tell you exactly which dollar is leaking and how to plug it. Fractional CFO, accounting and tax for ${AUDIENCE_ONE_LINE}.`,
  },
  {
    path: '/services',
    title: 'Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Stop touching QuickBooks. Stop guessing about cash. Stop being surprised in April. The accounting team that closes your books before you ask, and tells you what to do next — for healthcare practices and service businesses in South Florida.',
  },
  {
    path: '/about',
    title: 'Your Accounting Should Pay for Itself | Benefique Tax & Accounting | Davie, FL',
    description: 'Most accounting firms hand you a tax return and a year-old P&L. We give you the cash answer, the tax answer, and the operational answer in real time — before you have to ask.',
    // /about carries the Who We Serve block. It was 40 crawlable words, so the
    // firm's own definition of its client was invisible to search and to agents.
    body: [
      { p: 'Most accounting firms hand you a tax return and a year-old P&L. We give you the cash answer, the tax answer, and the operational answer in real time — before you have to ask.' },
      { h2: whoWeServe.heading },
      { p: whoWeServe.body },
      ...whoWeServe.columns.map((col) => ({
        h3: col.note ? `${col.title} — ${col.note}` : col.title,
        ul: col.items,
      })),
      { p: whoWeServe.legacy },
    ],
  },
  {
    path: '/blog',
    title: 'Blog | Tax Tips & Financial Insights | Benefique',
    description: 'Expert tax tips, cash flow strategies, and financial insights for healthcare practices and service businesses. Practical advice from Benefique Tax & Accounting in Davie, FL.',
  },
  {
    path: '/contact',
    title: 'Contact Benefique Tax & Accounting | Davie FL',
    description: 'Get in touch with Benefique Tax & Accounting. Fractional CFO services, tax planning, and real-time accounting for healthcare practices and service businesses in South Florida.',
  },
  {
    path: '/careers',
    title: 'Careers — Financial Analyst (AI-Enabled), Remote South Africa | Benefique',
    description: 'We do not hire people to balance books. We hire people who can read them. A remote Financial Analyst role for a South Africa-based accountant who thinks like a CFO and works with AI. Solve the case-study challenge to apply.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: 'Financial Analyst (AI-Enabled)',
      description: 'A remote Financial Analyst role for a South Africa-based accountant who reads financials like a CFO, uses AI to go deeper and faster, and connects operational activity to financial results for US-based business owners. Strong QuickBooks Online and an accounting qualification required. Apply by solving a short case-study challenge from the Benefique blog.',
      datePosted: '2026-06-08',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Benefique Tax & Accounting',
        sameAs: 'https://www.benefique.com',
        logo: `${SITE}/images/logo-full.jpg`,
      },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'South Africa' },
      directApply: true,
    },
  },
  {
    path: '/demo',
    title: 'Sample Reports & Dashboards | Benefique Tax & Accounting',
    description: 'See sample financial reports and real-time dashboards from Benefique. Interactive cash flow dashboards, P&L reports, and KPI tracking for healthcare and service businesses.',
  },
  {
    path: '/testimonials',
    title: 'Client Testimonials | Benefique Tax & Accounting',
    description: 'Hear from healthcare practices and service businesses across South Florida about their experience with Benefique Tax & Accounting. Real results, real clients.',
  },

  // Location pages
  {
    path: '/davie-accounting',
    h1: locationH1('davie'),
    title: 'Davie Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Benefique is headquartered in Davie, FL — providing accounting and fractional CFO services to local healthcare practices and service businesses. Books closed by the 7th.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Davie',
      description: 'Accounting and fractional CFO services in Davie, FL for healthcare practices and service businesses.',
      url: `${SITE}/davie-accounting`,
      areaServed: { '@type': 'City', name: 'Davie' },
      address: { '@type': 'PostalAddress', addressLocality: 'Davie', addressRegion: 'FL', addressCountry: 'US' },
    },
  },
  {
    path: '/plantation-accounting',
    h1: locationH1('plantation'),
    title: 'Accounting Firm in Plantation, FL — CFO & Tax Planning | Benefique',
    description: 'Accounting firm serving Plantation, FL law firms, medical practices, and professional services companies. Books closed by the 7th, proactive tax planning, fractional CFO — 10 minutes away in Davie.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Plantation',
      description: 'Accounting, tax planning, and fractional CFO services for Plantation law firms, medical practices, and professional services companies.',
      url: `${SITE}/plantation-accounting`,
      areaServed: { '@type': 'City', name: 'Plantation' },
      address: { '@type': 'PostalAddress', addressLocality: 'Plantation', addressRegion: 'FL', addressCountry: 'US' },
    },
    faq: [
      { q: 'What accounting services does Benefique offer in Plantation?', a: 'Benefique provides full-service accounting, fractional CFO services, bookkeeping, payroll processing, tax planning, and real-time financial reporting for businesses in Plantation and throughout South Florida.' },
      { q: 'How quickly can Benefique close my books each month?', a: 'We close books by the 7th business day of each month, with a review call by the 10th.' },
      { q: 'Does Benefique work with healthcare practices in Plantation?', a: 'Yes — we specialize in healthcare practices including radiology centers, dental practices, veterinary clinics, and medical offices throughout Plantation and Broward County.' },
      { q: 'Does Benefique work with law firms and professional services firms in Plantation?', a: 'Yes — we serve law firms and professional services companies in Plantation, including trust accounting support, partner compensation, and cash flow reporting built for firms that bill by the matter or the hour.' },
      { q: 'How is Benefique different from other accountants in Plantation?', a: 'We provide real-time accounting with 24-hour response times, decision-ready dashboards, and proactive tax planning — a complete accounting department, not just a bookkeeper.' },
    ],
  },
  {
    path: '/weston-accounting',
    h1: locationH1('weston'),
    title: 'Weston Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Accounting and fractional CFO services for Weston\'s growing healthcare and service business community. Tax planning, real-time reporting, monthly closes.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Weston',
      description: 'Accounting and fractional CFO services for Weston healthcare and service businesses.',
      url: `${SITE}/weston-accounting`,
      areaServed: { '@type': 'City', name: 'Weston' },
      address: { '@type': 'PostalAddress', addressLocality: 'Weston', addressRegion: 'FL', addressCountry: 'US' },
    },
  },
  {
    path: '/weston-bookkeeping',
    title: 'Bookkeeping Services in Weston, FL | Benefique Tax & Accounting',
    description: 'Professional bookkeeping services for Weston, FL businesses. Real-time books in QuickBooks Online, monthly closes by the 7th, payroll, tax planning. Based 10 minutes away in Davie.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Weston Bookkeeping',
      description: 'Professional bookkeeping services for Weston, FL businesses. Real-time QuickBooks Online bookkeeping, payroll, and tax planning.',
      url: `${SITE}/weston-bookkeeping`,
      areaServed: { '@type': 'City', name: 'Weston' },
      address: { '@type': 'PostalAddress', addressLocality: 'Davie', addressRegion: 'FL', postalCode: '33324', addressCountry: 'US' },
    },
  },
  {
    path: '/miramar-accounting',
    h1: locationH1('miramar'),
    title: 'Miramar Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Real-time accounting and tax planning for Miramar businesses — healthcare, marine services, and more. Fractional CFO services with monthly closes by the 7th.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Miramar',
      description: 'Real-time accounting and tax planning for Miramar businesses.',
      url: `${SITE}/miramar-accounting`,
      areaServed: { '@type': 'City', name: 'Miramar' },
      address: { '@type': 'PostalAddress', addressLocality: 'Miramar', addressRegion: 'FL', addressCountry: 'US' },
    },
  },
  {
    path: '/fort-lauderdale-accounting',
    h1: locationH1('fort-lauderdale'),
    title: 'Fort Lauderdale Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Fort Lauderdale\'s trusted accounting firm for healthcare practices, marine services, and professional services. Fractional CFO, tax planning, real-time dashboards.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Fort Lauderdale',
      description: 'Fort Lauderdale accounting for healthcare practices, marine services, and professional services.',
      url: `${SITE}/fort-lauderdale-accounting`,
      areaServed: { '@type': 'City', name: 'Fort Lauderdale' },
      address: { '@type': 'PostalAddress', addressLocality: 'Fort Lauderdale', addressRegion: 'FL', addressCountry: 'US' },
    },
  },
  {
    path: '/aventura-accounting',
    h1: locationH1('aventura'),
    title: 'Aventura Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Accounting and CFO services for Aventura businesses — medical practices, professional services, and hospitality. Real-time reporting and tax strategy.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Aventura',
      description: 'Accounting and CFO services for Aventura businesses.',
      url: `${SITE}/aventura-accounting`,
      areaServed: { '@type': 'City', name: 'Aventura' },
      address: { '@type': 'PostalAddress', addressLocality: 'Aventura', addressRegion: 'FL', addressCountry: 'US' },
    },
  },
  {
    path: '/hollywood-accounting',
    h1: locationH1('hollywood'),
    title: 'Dental & Healthcare Accounting in Hollywood, FL | Benefique',
    description: 'Accounting for Hollywood, FL dental and healthcare practices and service businesses. Books closed by the 7th, payer-mix and collections expertise, fractional CFO. Serving the Memorial healthcare corridor.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Hollywood',
      description: 'Accounting, tax planning, and fractional CFO services for Hollywood, FL dental practices, healthcare practices, and service businesses.',
      url: `${SITE}/hollywood-accounting`,
      areaServed: { '@type': 'City', name: 'Hollywood' },
      address: { '@type': 'PostalAddress', addressLocality: 'Hollywood', addressRegion: 'FL', addressCountry: 'US' },
    },
    faq: [
      { q: 'What accounting services does Benefique offer in Hollywood, FL?', a: 'Benefique provides full-service accounting, fractional CFO services, bookkeeping, payroll processing, tax planning, and real-time financial reporting for businesses in Hollywood and throughout South Florida.' },
      { q: 'How quickly can Benefique close my books each month?', a: 'We close books by the 7th business day of each month, with a review call by the 10th.' },
      { q: 'Does Benefique work with dental practices in Hollywood, FL?', a: 'Yes — dental practices are one of our core healthcare niches. We handle bookkeeping, payroll, associate compensation, and tax planning for dental offices in Hollywood and across Broward County, including multi-location dental groups.' },
      { q: 'Does Benefique work with healthcare practices in Hollywood?', a: 'Yes — we specialize in healthcare practices including radiology centers, dental practices, veterinary clinics, and medical offices throughout Hollywood and Broward County.' },
      { q: 'How is Benefique different from other accountants in Hollywood?', a: 'We provide real-time accounting with 24-hour response times, decision-ready dashboards, and proactive tax planning — a complete accounting department, not just a bookkeeper.' },
    ],
  },

  // Industry pages
  {
    path: '/industries/radiology',
    h1: industryH1('radiology'),
    body: industryBody('radiology'),
    title: 'Radiology & Imaging Center Accounting | Benefique Tax & Accounting',
    description: 'Specialized accounting for radiology and imaging centers. Multi-location consolidation, insurance reimbursement tracking, equipment depreciation, and HIPAA-compliant financial reporting.',
    faq: [
      { q: 'What accounting challenges are unique to radiology practices?', a: 'Radiology practices face complex insurance reimbursement tracking across multiple payers, multi-location financial consolidation, expensive equipment depreciation schedules, and HIPAA-compliant reporting requirements that general accountants often miss.' },
      { q: 'How does Benefique handle multi-location radiology accounting?', a: 'We consolidate financials across all locations while maintaining location-level P&L visibility. You see which centers are profitable, which need attention, and how the group performs overall -- updated in real time, not months later.' },
      { q: 'Do you handle radiologist compensation structures?', a: 'Yes. We set up and manage complex compensation models including RVU-based pay, production bonuses, and partnership distributions, ensuring accurate tracking and tax-efficient structures.' },
    ],
  },
  {
    path: '/industries/dental',
    h1: industryH1('dental'),
    body: industryBody('dental'),
    title: 'Dental Practice Accounting | Benefique Tax & Accounting',
    description: 'Accounting services built for dental practices. Insurance vs. cash pay tracking, multi-provider compensation, practice acquisition accounting, and DSO financial reporting.',
    faq: [
      { q: 'What makes dental practice accounting different from general business accounting?', a: 'Dental practices deal with split insurance/patient-pay revenue, multi-provider compensation models, high-cost equipment financing, practice acquisitions, and DSO reporting requirements that require specialized accounting expertise.' },
      { q: 'Can you handle accounting for dental practice acquisitions?', a: 'Yes. We manage the full financial side of practice acquisitions including valuation support, entity structuring, purchase price allocation, and post-acquisition financial integration.' },
      { q: 'Do you work with dental service organizations (DSOs)?', a: 'Yes. We provide financial reporting that meets DSO requirements including standardized P&L formats, KPI dashboards, and consolidated multi-location reporting.' },
    ],
  },
  {
    path: '/industries/veterinary',
    h1: industryH1('veterinary'),
    body: industryBody('veterinary'),
    title: 'Veterinary Practice Accounting | Benefique Tax & Accounting',
    description: 'Accounting and CFO services for veterinary practices. Pharmaceutical inventory management, multi-location accounting, equipment depreciation, and real-time financial dashboards.',
    faq: [
      { q: 'What accounting challenges do veterinary practices face?', a: 'Vet practices deal with pharmaceutical and supply inventory management, multi-location or mobile practice accounting, high equipment and facility costs, complex staff scheduling and payroll, and client payment plan tracking.' },
      { q: 'How do you handle veterinary inventory accounting?', a: 'We set up systems to track pharmaceutical and supply costs at the product level, monitor margins, flag reorder points, and ensure accurate COGS reporting -- giving you visibility into one of your biggest expense categories.' },
    ],
  },
  {
    path: '/industries/marine-services',
    h1: industryH1('marine-services'),
    body: industryBody('marine-services'),
    title: 'Marine Services Accounting | Benefique Tax & Accounting',
    description: 'Accounting for marine service businesses. Project-based revenue recognition, seasonal cash flow management, equipment and dock costs, subcontractor management, and parts inventory.',
    faq: [
      { q: 'How do you handle project-based accounting for marine services?', a: 'We set up job costing systems that track revenue and expenses per project, giving you profitability visibility at the job level. You know which projects make money and which don\'t before they\'re finished.' },
      { q: 'How do you manage seasonal cash flow for marine businesses?', a: 'We build cash flow forecasts that account for seasonal patterns, helping you plan for slow periods during peak season. This includes line of credit management, expense timing, and reserve targets.' },
    ],
  },

  // Tool pages
  {
    path: '/tools/concierge-simulator',
    title: 'Concierge Medicine Financial Simulator | Benefique Tax & Accounting',
    description: 'Interactive financial model for concierge medical practices. See how your P&L and cash flow change as you grow your patient panel. Adjust membership fees, costs, and physician salary.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Concierge Medicine Financial Simulator',
      description: 'Interactive P&L and cash flow model for concierge medical practices',
      url: `${SITE}/tools/concierge-simulator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Benefique Tax & Accounting', url: SITE },
    },
  },

  {
    path: '/tools/radiology-profit-simulator',
    title: 'Radiology Profit Simulator | Benefique Tax & Accounting',
    description: 'Interactive contribution-margin simulator for outpatient imaging centers. Slide volume and price to see why cutting "below-cost" scans can halve your profit — and what the real keep-or-cut floor is.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Radiology Profit Simulator',
      description: 'Interactive contribution-margin and cost-per-scan simulator for outpatient imaging centers',
      url: `${SITE}/tools/radiology-profit-simulator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Benefique Tax & Accounting', url: SITE },
    },
  },

  {
    path: '/tools/business-simulator',
    title: 'Business Simulator | Benefique Intelligence(TM)',
    description: 'Interactive activity-based business simulator. Decompose your business into assembly line stages, change any input, and watch P&L and cash flow recompute. See break-even in activity units, payer profitability, and scenario comparisons.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Benefique Intelligence Business Simulator',
      description: 'Activity-based business simulator: decompose any business into stages, change inputs, see P&L and cash flow cascade in real time',
      url: `${SITE}/tools/business-simulator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'Benefique Tax & Accounting', url: SITE },
    },
  },

  // Service pages
  {
    path: '/services/real-time-accounting',
    title: 'Real-Time Accounting Services | Benefique Tax & Accounting',
    description: 'Stop waiting for monthly reports. Benefique delivers real-time financial dashboards, books closed by the 7th, and 24-hour response times for healthcare practices and service businesses.',
    faq: [
      { q: 'What does real-time accounting mean?', a: 'Real-time accounting means your books are updated continuously, not monthly. You have access to live dashboards showing cash position, receivables, payables, and profitability -- updated daily, not 30 days after the fact.' },
      { q: 'How quickly are books closed each month?', a: 'We close books by the 7th of each month and schedule a review call by the 10th. You get actionable financial data while it\'s still relevant to current decisions.' },
      { q: 'Do I need special software for real-time accounting?', a: 'No. We work with QuickBooks Online and build custom dashboards on top of your existing data. No new software to learn, no migration required.' },
    ],
  },
  {
    path: '/services/fractional-cfo',
    title: 'Fractional CFO Services | Benefique Tax & Accounting',
    description: `Fractional CFO services for ${AUDIENCE_ONE_LINE}. Cash flow forecasting, financial strategy, KPI dashboards, and tax planning -- without the full-time CFO cost.`,
    faq: [
      { q: 'What does a fractional CFO do?', a: 'A fractional CFO provides executive-level financial strategy on a part-time basis. This includes cash flow forecasting, financial modeling, KPI development, tax strategy, and board-ready reporting -- without the $200K+ salary of a full-time CFO.' },
      { q: 'How is a fractional CFO different from a bookkeeper or CPA?', a: 'A bookkeeper records transactions. A CPA files taxes. A fractional CFO provides forward-looking financial strategy -- helping you make better decisions about hiring, expansion, pricing, and cash management before problems arise.' },
      { q: 'What size business needs a fractional CFO?', a: `We take new engagements from $5M in revenue, and most of our work is with ${AUDIENCE_ONE_LINE} across two or more locations. Below that, a good bookkeeper and an annual tax planner usually serve an owner better than a fractional CFO does.` },
    ],
  },
  {
    path: '/radiology',
    title: 'Radiology CFO Intelligence | PET Tracer Economics, Collections & Multi-Center Operations | Benefique',
    body: radiologyBody,
    h1: 'Your Volume Is Up. Your Cash Isn\'t.',
    description: 'Strategic financial intelligence for multi-center radiology groups. PET Tracer economics, per-payer DSO, payer mix risk, per-claim profitability, COO scorecards. Start with a Strategic Radiology Review.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE}/radiology`,
          url: `${SITE}/radiology`,
          name: 'Radiology CFO Intelligence — Case Studies & Frameworks',
          description: 'Financial intelligence case studies for multi-center radiology and imaging groups: PET tracer economics, revenue cycle and DSO, payer mix, per-claim profitability, multi-site scaling, and M&A / exit readiness.',
          about: ['Radiology', 'Diagnostic imaging center', 'Fractional CFO', 'Medical revenue cycle', 'PET imaging'],
          isPartOf: { '@type': 'WebSite', name: 'Benefique Tax & Accounting', url: SITE },
          publisher: { '@type': 'Organization', name: 'Benefique Tax & Accounting', url: SITE },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Healthcare', item: `${SITE}/knowledge` },
            { '@type': 'ListItem', position: 3, name: 'Radiology', item: `${SITE}/radiology` },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'Radiology case-study library',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Net Collection Rate for Imaging Centers: Formula & 2026 Benchmarks', url: `${SITE}/blog/net-collection-rate-imaging-centers` },
            { '@type': 'ListItem', position: 2, name: 'Multi-Center Imaging Owner Income: 2026 SE Florida Benchmarks', url: `${SITE}/blog/multi-center-imaging-owner-income-2026-sefl` },
            { '@type': 'ListItem', position: 3, name: 'Per-Modality Profitability: MRI vs CT vs Ultrasound vs PET', url: `${SITE}/blog/per-modality-profitability-imaging-center` },
            { '@type': 'ListItem', position: 4, name: 'DSO Benchmarks for Imaging Centers: 2026 SE Florida Data', url: `${SITE}/blog/dso-benchmarks-imaging-centers-2026-sefl` },
            { '@type': 'ListItem', position: 5, name: 'LOP Economics in Texas: Why Imaging A/R Works Differently Than Florida', url: `${SITE}/blog/texas-lop-imaging-accounts-receivable` },
            { '@type': 'ListItem', position: 6, name: 'The Imaging RCM Glossary: 16 Terms That Decide Whether Your Center Gets Paid', url: `${SITE}/blog/imaging-rcm-glossary` },
            { '@type': 'ListItem', position: 7, name: '7 Payers, 41 Procedures, $80,593 Lost', url: `${SITE}/blog/toxic-payers-losing-money-medical-practice` },
            { '@type': 'ListItem', position: 8, name: 'How to Acquire a Second Imaging Center: The Financial Roadmap', url: `${SITE}/blog/how-to-acquire-second-imaging-center` },
          ],
        },
      ],
    },
    faq: [
      { q: 'Who is the Strategic Radiology Review for?', a: 'Imaging center operators, CFOs, and medical directors running one or more centers with $2M+ revenue who suspect their accountant and billing company cannot answer per-payer, per-tracer, or per-claim profitability questions. Typical profile: growing but cash-constrained, unclear on PET Tracer Scan economics, preparing for a lender conversation, or renegotiating payer contracts.' },
      { q: 'What are PET Tracer Scans, and why do you separate them?', a: 'PET Tracer Scans refers to high-reimbursement specialty tracers with radiopharmaceutical input costs of $2,000-$3,000 per dose and payer reimbursement that varies as much as 9x depending on payer mix. Their economics are structurally different from general radiology. Blending them into one imaging line hides the single largest profit-and-loss driver in a modern center -- which is exactly what most accounting systems do.' },
      { q: 'What does the Strategic Radiology Review deliver?', a: 'A banker-grade Intelligence PDF covering Two Business Unit decomposition, PET Tracer economics with toxic-combination detection, per-claim profitability stack, DSO by payer, payer mix risk analysis, and a prioritized action plan with quantified dollar impact. Turnaround is two weeks from data access. A 90-minute executive readout is included.' },
      { q: 'What is the investment for ongoing CFO work?', a: 'It depends on center count, complexity, and scope. We propose specific scope and pricing on the Strategic Review readout -- after we have seen your data, not before. This avoids the common trap of buying generic CFO services priced by hour or headcount rather than by the problems actually worth solving.' },
    ],
  },
  {
    path: '/radiology/intelligence-pack',
    title: 'The Radiology Intelligence Pack | What a Benefique Imaging Engagement Delivers | Benefique',
    h1: packHeadline,
    description:
      'A worked, fully illustrative example of the reporting an independent multi-center imaging group receives from Benefique: net revenue per scan by center, days to cash by payer rail, and the complete report library. Synthetic data, real method.',
    body: packBody,
    // packSchema already contains the FAQPage node for these questions.
    // Setting `faq` here as well would emit a second, duplicate FAQPage.
    schema: packSchema,
  },
  {
    path: '/intelligence',
    body: intelligenceBody,
    title: 'Benefique Intelligence | The Financial Methodology Behind Benefique',
    h1: 'The Intelligence Layer Above Your Accounting.',
    description: 'Benefique Intelligence is the named data-analysis methodology behind Benefique: the Benefique Matrix, Three Views, Two Business Unit Framework, Activity-Based Decomposition, Per-Unit Economics, Cash Flow Waterfall, and more. The intelligence layer above your accounting.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE}/intelligence`,
          url: `${SITE}/intelligence`,
          name: 'Benefique Intelligence — The Methodology',
          description: 'Benefique Intelligence is the named data-analysis methodology behind Benefique Tax & Accounting: the Benefique Matrix, Three Views, the Two Business Unit Framework, Activity-Based Decomposition, Per-Unit Economics, the Cash Flow Waterfall, the Cash Conversion Cycle at target ARR, and Toxic-Combination Detection.',
          isPartOf: { '@type': 'WebSite', name: 'Benefique Tax & Accounting', url: SITE },
          about: { '@type': 'Thing', name: 'Benefique Intelligence' },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Benefique Intelligence', item: `${SITE}/intelligence` },
          ],
        },
        {
          '@type': 'Service',
          '@id': `${SITE}/intelligence#service`,
          name: 'Benefique Intelligence',
          serviceType: 'Financial intelligence and fractional CFO analytics',
          description: 'A proprietary financial-analysis methodology that turns the operational data already in a business\'s books into cash, tax, and operational answers, delivered as a flat-fee engagement.',
          provider: { '@type': 'Organization', name: 'Benefique Tax & Accounting', url: SITE },
          areaServed: { '@type': 'State', name: 'Florida' },
          audience: { '@type': 'BusinessAudience', name: 'Healthcare practices and service businesses' },
        },
        {
          '@type': 'DefinedTermSet',
          '@id': `${SITE}/intelligence#methodology`,
          name: 'Benefique Intelligence Methodology',
          description: 'The named financial frameworks that make up Benefique Intelligence.',
          hasDefinedTerm: [
            { '@type': 'DefinedTerm', name: 'The Benefique Matrix', description: 'A one-page strategic classification placing a business into Compounder, Cash Cow, Growth Gamble, or Fix-or-Exit on cash-machine quality and value-build quality, from a six-pillar scorecard.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Three Views', description: 'Reading the same financial data three ways — the Operator view, the Banker view, and the Buyer view.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Two Business Unit Framework', description: 'Separating one P&L line into the structurally different profit engines hidden inside it.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Activity-Based Decomposition', description: 'Decomposing a business into assembly-line stages with a triple break-even — operating, P&L, and cash.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Per-Unit Economics', description: 'The dollars-per-unit to gross-profit-per-unit to NOI-per-unit stack, computed per location and per line.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Cash Flow Waterfall', description: 'A severity-ranked waterfall from net income to ending cash that names every trapped dollar.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Cash Conversion Cycle at Target ARR', description: 'DSO, DPO, and DIO modeled forward to a target revenue to size the working-capital need of growth.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
            { '@type': 'DefinedTerm', name: 'Toxic-Combination Detection', description: 'Payer and product grading A–F that flags the specific mixes guaranteed to lose money on identical work.', inDefinedTermSet: `${SITE}/intelligence#methodology` },
          ],
        },
      ],
    },
    faq: [
      { q: 'What is Benefique Intelligence?', a: 'Benefique Intelligence is the data-analysis methodology behind Benefique Tax & Accounting. It is a named set of financial frameworks — the Benefique Matrix, Three Views, the Two Business Unit Framework, Activity-Based Decomposition, Per-Unit Economics, the Cash Flow Waterfall, and the Cash Conversion Cycle at target ARR — that turn the operational data already in your books into the cash, tax, and operational answers a fractional CFO would give you.' },
      { q: 'How is this different from regular accounting or bookkeeping?', a: 'A bookkeeper records what happened and a CPA files the return. Benefique Intelligence sits above both: it reads the same data forward, per unit and per engine, to tell you which dollar is leaking, which payer or product loses money, how much working capital growth will need, and what the business is worth at exit.' },
      { q: 'Do you replace our accountant or our software?', a: 'No. We sit above your existing accountant, biller, and QuickBooks. They keep recording and filing; we build the intelligence layer on top. Most engagements run alongside the relationships and software you already have — nothing to install or migrate.' },
      { q: 'Which frameworks make up Benefique Intelligence?', a: 'Eight named methods: the Benefique Matrix, Three Views, the Two Business Unit Framework, Activity-Based Decomposition, Per-Unit Economics, the Cash Flow Waterfall, the Cash Conversion Cycle at target ARR, and Toxic-Combination Detection.' },
      { q: 'Who is Benefique Intelligence for?', a: AUDIENCE_FAQ_ANSWER },
    ],
  },
  {
    path: '/knowledge',
    title: 'Knowledge Map | Healthcare & Services Financial Intelligence | Benefique',
    h1: 'The Benefique Knowledge Map',
    description: 'Find Benefique financial case studies by your situation. Two branches: Healthcare (radiology, veterinary, concierge, dental) and Services (fractional CFO, tax, bookkeeping, M&A, R&D, and the industries we serve).',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE}/knowledge`,
          url: `${SITE}/knowledge`,
          name: 'Benefique Knowledge Map',
          description: 'A two-branch map of Benefique financial intelligence: Healthcare (radiology, veterinary, concierge, dental) and Services (fractional CFO, tax, bookkeeping, M&A, R&D, and the industries we serve).',
          isPartOf: { '@type': 'WebSite', name: 'Benefique Tax & Accounting', url: SITE },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Knowledge Map', item: `${SITE}/knowledge` },
          ],
        },
      ],
    },
    faq: [
      { q: 'How do I find a case study for my type of business?', a: 'Start on the Knowledge Map. The left branch is by industry (Healthcare -- with a dedicated Radiology silo, plus veterinary, concierge, and dental). The right branch is by service (fractional CFO, real-time accounting, tax and entity strategy, M&A and exit readiness, R&D credits) and the other industries we serve, including legal and marine. Every node links to a real case study or framework.' },
      { q: 'Where are the radiology case studies?', a: 'The Radiology silo at /radiology organizes every imaging case study into five areas: multi-site and scaling, PET tracer economics, revenue cycle (A/R and DSO), payer mix (commercial / PI / self-pay), and M&A and exit / quality-of-earnings readiness.' },
    ],
  },
];

export { routes, SITE, DEFAULT_OG_IMAGE };
