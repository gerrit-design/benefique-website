// route-metadata.js — SEO metadata for all non-blog routes
// Used by prerender.js to generate per-route HTML files

const SITE = 'https://www.benefique.com';
const DEFAULT_OG_IMAGE = `${SITE}/images/logo-full.jpg`;

const routes = [
  // Core pages
  {
    path: '/',
    title: 'Benefique Tax & Accounting | Fractional CFO Services | Davie FL',
    description: 'Fractional CFO services and full-service accounting for healthcare practices in South Florida. Books closed by the 7th, review call by the 10th. Serving Davie, Fort Lauderdale, and Miami.',
  },
  {
    path: '/services',
    title: 'Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Full-service accounting, tax planning, and fractional CFO services for healthcare practices and service businesses in South Florida. Real-time reporting, monthly closes, 24-hour response.',
  },
  {
    path: '/about',
    title: 'Your Accounting Should Pay for Itself | Benefique Tax & Accounting | Davie, FL',
    description: 'Benefique turns accounting from a cost center into an ROI center. AI-powered cash flow analysis and proactive tax planning for healthcare practices and service businesses. Real-time accounting. Tax-ready any day.',
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
    title: 'Plantation Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Full-service accounting for Plantation businesses — from medical practices to professional services firms. Real-time reporting and fractional CFO services.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Plantation',
      description: 'Full-service accounting for Plantation businesses — medical practices to professional services.',
      url: `${SITE}/plantation-accounting`,
      areaServed: { '@type': 'City', name: 'Plantation' },
      address: { '@type': 'PostalAddress', addressLocality: 'Plantation', addressRegion: 'FL', addressCountry: 'US' },
    },
  },
  {
    path: '/weston-accounting',
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
    title: 'Hollywood FL Accounting & CFO Services | Benefique Tax & Accounting',
    description: 'Full-service accounting for Hollywood, FL businesses — from healthcare to marine and hospitality services. Fractional CFO, tax planning, real-time dashboards.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'Benefique Tax & Accounting - Hollywood',
      description: 'Full-service accounting for Hollywood, FL businesses.',
      url: `${SITE}/hollywood-accounting`,
      areaServed: { '@type': 'City', name: 'Hollywood' },
      address: { '@type': 'PostalAddress', addressLocality: 'Hollywood', addressRegion: 'FL', addressCountry: 'US' },
    },
  },

  // Industry pages
  {
    path: '/industries/radiology',
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
    title: 'Veterinary Practice Accounting | Benefique Tax & Accounting',
    description: 'Accounting and CFO services for veterinary practices. Pharmaceutical inventory management, multi-location accounting, equipment depreciation, and real-time financial dashboards.',
    faq: [
      { q: 'What accounting challenges do veterinary practices face?', a: 'Vet practices deal with pharmaceutical and supply inventory management, multi-location or mobile practice accounting, high equipment and facility costs, complex staff scheduling and payroll, and client payment plan tracking.' },
      { q: 'How do you handle veterinary inventory accounting?', a: 'We set up systems to track pharmaceutical and supply costs at the product level, monitor margins, flag reorder points, and ensure accurate COGS reporting -- giving you visibility into one of your biggest expense categories.' },
    ],
  },
  {
    path: '/industries/marine-services',
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
    description: 'Fractional CFO services for healthcare practices and service businesses. Cash flow forecasting, financial strategy, KPI dashboards, and tax planning -- without the full-time CFO cost.',
    faq: [
      { q: 'What does a fractional CFO do?', a: 'A fractional CFO provides executive-level financial strategy on a part-time basis. This includes cash flow forecasting, financial modeling, KPI development, tax strategy, and board-ready reporting -- without the $200K+ salary of a full-time CFO.' },
      { q: 'How is a fractional CFO different from a bookkeeper or CPA?', a: 'A bookkeeper records transactions. A CPA files taxes. A fractional CFO provides forward-looking financial strategy -- helping you make better decisions about hiring, expansion, pricing, and cash management before problems arise.' },
      { q: 'What size business needs a fractional CFO?', a: 'Businesses with $500K-$10M in revenue typically benefit most. You\'re big enough that financial decisions have significant impact, but not so large that you need a full-time CFO. Most of our clients are healthcare practices and service businesses in this range.' },
    ],
  },
  {
    path: '/services/radiology',
    title: 'Radiology CFO Intelligence | PET Tracer Economics, Collections & Multi-Center Operations | Benefique',
    description: 'Strategic financial intelligence for multi-center radiology groups. PET Tracer economics, per-payer DSO, payer mix risk, per-claim profitability, COO scorecards. Start with a Strategic Radiology Review.',
    faq: [
      { q: 'Who is the Strategic Radiology Review for?', a: 'Imaging center operators, CFOs, and medical directors running one or more centers with $2M+ revenue who suspect their accountant and billing company cannot answer per-payer, per-tracer, or per-claim profitability questions. Typical profile: growing but cash-constrained, unclear on PET Tracer Scan economics, preparing for a lender conversation, or renegotiating payer contracts.' },
      { q: 'What are PET Tracer Scans, and why do you separate them?', a: 'PET Tracer Scans refers to high-reimbursement specialty tracers with radiopharmaceutical input costs of $2,000-$3,000 per dose and payer reimbursement that varies as much as 9x depending on payer mix. Their economics are structurally different from general radiology. Blending them into one imaging line hides the single largest profit-and-loss driver in a modern center -- which is exactly what most accounting systems do.' },
      { q: 'What does the Strategic Radiology Review deliver?', a: 'A banker-grade Intelligence PDF covering Two Business Unit decomposition, PET Tracer economics with toxic-combination detection, per-claim profitability stack, DSO by payer, payer mix risk analysis, and a prioritized action plan with quantified dollar impact. Turnaround is two weeks from data access. A 90-minute executive readout is included.' },
      { q: 'What is the investment for ongoing CFO work?', a: 'It depends on center count, complexity, and scope. We propose specific scope and pricing on the Strategic Review readout -- after we have seen your data, not before. This avoids the common trap of buying generic CFO services priced by hour or headcount rather than by the problems actually worth solving.' },
    ],
  },
];

export { routes, SITE, DEFAULT_OG_IMAGE };
