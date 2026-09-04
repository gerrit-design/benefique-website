// industries.js — single source of truth for the /industries/* pages.
//
// Imported by BOTH src/App.jsx (what a browser renders) and
// scripts/route-metadata.js (what a crawler and an AI agent read), so the
// prerendered HTML cannot drift from the live page.

export const industries = {
  radiology: {
    industry: 'Radiology & Imaging Centers',
    icon: '🏥',
    challenges: [
      'Multi-location financial consolidation',
      'Complex insurance reimbursement tracking',
      'Equipment depreciation and financing',
      'Radiologist compensation structures',
      'HIPAA-compliant financial reporting',
      'Cash flow variability from insurance delays',
    ],
    testimonial: {
      quote: 'Benefique gives us visibility across all our locations. We finally know which centers are performing and which need attention.',
      name: 'Mark',
      business: 'Multi-Location Radiology',
    },
    tool: {
      link: '/tools/radiology-profit-simulator',
      title: 'The Radiology Profit Simulator',
      desc: 'Slide volume and price and watch fixed cost per scan, contribution margin, and operating profit recompute in real time — and see why cutting "below-cost" scans can halve your profit.',
      cta: 'Try the Simulator',
    },
  },
  dental: {
    industry: 'Dental Practices',
    icon: '🦷',
    challenges: [
      'Insurance vs. cash pay revenue tracking',
      'Multi-provider compensation models',
      'Equipment purchases and financing',
      'Associate and hygienist productivity',
      'Practice acquisition accounting',
      'DSO financial reporting requirements',
    ],
    testimonial: {
      quote: 'Complex multi-entity structure, and they keep it all organized. Tax planning alone has saved us significantly.',
      name: 'Eddie',
      business: 'Dental Brokerage',
    },
  },
  veterinary: {
    industry: 'Veterinary Practices',
    icon: '🐾',
    challenges: [
      'Inventory management for pharmaceuticals',
      'Multi-location or mobile practice accounting',
      'Equipment and facility costs',
      'Staff scheduling and payroll complexity',
      'Client payment plans and collections',
      'Emergency vs. routine service profitability',
    ],
    testimonial: {
      quote: 'They handle everything—books, taxes, payroll. I can focus on my patients instead of spreadsheets.',
      name: 'Brandon',
      business: 'Veterinary Practice',
    },
  },
  'marine-services': {
    industry: 'Marine Services',
    icon: '⚓',
    challenges: [
      'Project-based revenue recognition',
      'Seasonal cash flow fluctuations',
      'Large equipment and dock costs',
      'Subcontractor management',
      'Parts inventory tracking',
      'Multi-vessel or multi-location operations',
    ],
    testimonial: {
      quote: 'We went from chaos to clarity. Now I know exactly where we stand financially at any moment.',
      name: 'Kobus',
      business: 'Marine Services',
    },
  },
};
