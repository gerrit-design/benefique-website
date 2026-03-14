import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Blog post metadata and content mapping
const blogPosts = {
  'what-your-banker-sees-that-you-dont': {
    file: '/content/blogs/what-your-banker-sees-that-you-dont.md',
    title: 'What Your Banker Sees That You Don\'t \u2014 From the Accountant Who Builds the Package',
    date: '2026-03-13',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Banks don\'t just review your P&L. They review three financial pictures \u2014 your business, your personal balance sheet, and a normalized version they rebuild themselves. Most owners only prepare for one.',
    categories: ['Cash Flow Advisory', 'Business Strategy', 'Financial Intelligence'],
    readTime: '14 min read',
    featuredImage: '/images/blog/what-your-banker-sees.jpg',
    faqs: [
      { q: 'What financial statements do I need for an SBA 7(a) loan?', a: 'At minimum: three years of business tax returns, year-to-date profit and loss statement, balance sheet, accounts receivable and payable aging reports, debt schedule listing all existing loans, and a personal financial statement for each owner with 20%+ ownership.' },
      { q: 'How do I calculate DSCR for my small business?', a: 'DSCR = Net Operating Income / Total Annual Debt Service. Net Operating Income is typically EBITDA. Total Annual Debt Service includes principal and interest payments on all business loans, equipment leases, and the proposed new facility. A DSCR of 1.25x is the typical minimum.' },
      { q: 'What is a good debt service coverage ratio for a small business loan?', a: 'Most banks require a minimum DSCR of 1.25x for conventional business loans and SBA 7(a) loans. A DSCR of 1.50x or higher gives you comfortable margin and may qualify you for better rates. Below 1.0x means approval is extremely unlikely.' },
      { q: 'Why does the bank ask for my personal tax return for a business loan?', a: 'The bank evaluates the owner as a credit risk to the business. Personal tax returns reveal total income sources, estimated tax obligations that may consume business cash, personal debt load that creates pressure to extract cash from the business, and whether owner draws align with reported personal income.' },
      { q: 'What is a cash flow waterfall and why does my banker care?', a: 'A cash flow waterfall starts with your operating earnings (EBITDA) and subtracts each cash obligation in sequence: owner draws, debt service, taxes, and working capital needs. The final bar shows your net free cash. Bankers care because a profitable business can still be cash-negative if draws and debt service exceed operating earnings.' },
      { q: 'What bank loan covenants should I expect?', a: 'Common covenants include: minimum DSCR tested quarterly (typically 1.25x), maximum leverage ratio (debt-to-EBITDA under 3.0x), minimum cash balance requirements, distribution restrictions, borrowing base limitations for lines of credit, and annual reviewed financial statement delivery requirements.' },
      { q: 'Should I hire a fractional CFO to help me get a bank loan?', a: 'If your business generates over $1M in revenue and you\'re seeking $250K+ in financing, a fractional CFO calculates your actual DSCR, builds your cash flow waterfall, normalizes your earnings, identifies issues the bank will flag, and prepares the complete banking package.' }
    ]
  },
  'cash-flow-waterfall-why-profit-doesnt-equal-cash': {
    file: '/content/blogs/cash-flow-waterfall-why-profit-doesnt-equal-cash.md',
    title: 'The Cash Flow Waterfall: Why $454K in Profit Left a Business With a $147K Cash Deficit',
    date: '2026-03-13',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $6M business earned $454K in operating profit. After partner draws, debt service, and working capital, they were $147K in the hole. The P&L never showed it. The waterfall did.',
    categories: ['Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '10 min read',
    featuredImage: '/images/blog/cash-flow-waterfall.jpg',
    faqs: [
      { q: 'What is a cash flow waterfall?', a: 'A cash flow waterfall is a sequential chart that starts with operating profit (EBITDA) and subtracts each major cash obligation \u2014 owner draws, debt service, taxes, and working capital changes \u2014 to show the net free cash remaining.' },
      { q: 'Why does my P&L show profit but my bank account is empty?', a: 'Three common reasons: owner draws reduce cash but don\'t appear as expenses on the P&L, loan principal payments reduce cash but only interest shows on the P&L, and growth in accounts receivable and inventory consumes cash that the P&L already counted as revenue.' },
      { q: 'What percentage of EBITDA should owner draws be?', a: 'Draws below 50-60% of EBITDA leave adequate room for debt service, working capital needs, and reinvestment. Draws above 80% of EBITDA typically indicate the business is funding owner lifestyle rather than building capacity.' },
      { q: 'How do I improve my cash flow waterfall?', a: 'Four levers in order of speed: reduce DSO by tightening collections, reduce inventory to industry-normal levels, restructure owner draws to a sustainable percentage of EBITDA, and refinance or consolidate debt to reduce monthly payments.' },
      { q: 'What is the difference between EBITDA and free cash flow?', a: 'EBITDA measures operating earnings before financing adjustments. Free cash flow starts with EBITDA and subtracts everything that actually consumes cash: interest, taxes, capital expenditures, loan principal, working capital changes, and owner distributions.' }
    ]
  },
  's-corp-tax-trap-service-business': {
    file: '/content/blogs/s-corp-tax-trap-service-business.md',
    title: 'The S-Corp Tax Trap: Why Your Service Business Makes Money But You\'re Always Broke',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $4M service business showed $250K in profit. The owner had $49K in the bank and a $75K personal tax bill she didn\'t know about. The S-Corp flow-through that saves you SE taxes can also drain your cash if you don\'t provision for it monthly.',
    categories: ['Tax Strategy'],
    readTime: '12 min read',
    featuredImage: '/images/blog/s-corp-tax-trap-service-business.jpg',
    faqs: [
      { q: 'Do I owe taxes on S-Corp profits I didn\'t take out of the business?', a: 'Yes. Under IRC Section 1366, your share of S-Corp income is reported on your personal return regardless of distributions. If the company earns $250K in profit and you take $0 out, you still owe income tax on $250K.' },
      { q: 'How much should I set aside monthly for S-Corp taxes?', a: 'For federal taxes, 25-30% of your net profit is the safe range for most service business owners in the $100K-$400K income bracket. If you\'re in Florida, that covers it. If you\'re in a state with income tax, add your state marginal rate.' },
      { q: 'What happens if I don\'t pay estimated taxes?', a: 'The IRS assesses an underpayment penalty under IRC Section 6654 at approximately 8% annualized. Continued non-payment results in CP notices escalating to intent-to-levy warnings, federal tax liens, and bank account levies.' },
      { q: 'Can I deduct my IRS installment agreement interest?', a: 'No. Interest paid on personal federal income tax debt is classified as personal interest and is not deductible under IRC Section 163(h).' },
      { q: 'Should I revoke my S-Corp election to avoid this problem?', a: 'In most cases, no. The 15.3% SE tax savings on distributions typically outweigh the administrative burden. The issue isn\'t the structure — it\'s the lack of a monthly tax provision system.' }
    ]
  },
  'fleet-replacement-vs-repair-service-business': {
    file: '/content/blogs/fleet-replacement-vs-repair-service-business.md',
    title: 'When Fixing Your Fleet Costs More Than Replacing It',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A service business spent $122K on truck repairs in two months on a fully depreciated fleet \u2014 zero tax benefit, unpredictable costs, rising downtime. A new truck at $1,500/month with a full Section 179 deduction would have been cheaper. Here\'s how to do the math for your fleet.',
    categories: ['Business Strategy'],
    readTime: '12 min read',
    featuredImage: '/images/blog/fleet-replacement-vs-repair-service-business.jpg',
    faqs: [
      { q: 'Should I lease or buy fleet vehicles?', a: 'For most service businesses, buying is the stronger move. You own the asset, qualify for the full Section 179 deduction in Year 1, and face no mileage restrictions. Leasing makes sense only for 3-to-4-year rotation cycles.' },
      { q: 'Can I deduct the full price of a truck in one year?', a: 'Yes \u2014 if the vehicle has a GVWR over 6,000 pounds and is used more than 50% for business. Section 179 plus bonus depreciation allows a 100% first-year deduction under 2026 rules.' },
      { q: 'What is the best financing for fleet vehicles?', a: 'SBA 7(a) loans offer competitive rates. Equipment financing through dealers or banks typically runs 5-8% APR with 3-7 year terms. Have your accountant model the after-tax cost of each option.' },
      { q: 'How do I convince my partner or spouse to approve a new truck purchase?', a: 'Show them the per-vehicle tracking spreadsheet. When the data shows $8,000/month in repairs vs. $1,500/month in payments \u2014 plus a $75,000 tax deduction \u2014 the decision makes itself.' },
      { q: 'When is the best time of year to buy fleet vehicles?', a: 'The vehicle must be purchased and placed in service before December 31 to qualify for that year\'s deduction. Q4 tends to offer the best dealer pricing, but don\'t wait if your trucks are failing now.' }
    ]
  },
  'competing-on-value-not-price-service-business': {
    file: '/content/blogs/competing-on-value-not-price-service-business.md',
    title: 'They Undercut Your Price and Stole Your Client. Here\'s Why You Win Them Back.',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A 35-year service company lost a major institutional client to a fly-by-night operator quoting 30% below market. She held her pricing. Eighteen months later, the contracts came back. Here\'s the playbook for when lowball competitors steal your clients \u2014 and why the math is on your side.',
    categories: ['Business Strategy'],
    readTime: '12 min read',
    featuredImage: '/images/blog/competing-on-value-not-price-service-business.jpg',
    faqs: [
      { q: 'Should I ever lower my prices to keep a client?', a: 'Only if you can identify a specific cost reduction that justifies it \u2014 bundling services, reducing scope, or shifting schedules. Never lower price just to match a competitor pricing below profitability.' },
      { q: 'How long until lowball competitors go out of business?', a: 'Typically 6-18 months for undercapitalized operators. BLS data confirms that establishment survival rates drop sharply in the first two years for new entrants in trade services.' },
      { q: 'What if the client never comes back?', a: 'Some won\'t. Replace lost revenue with higher-quality clients on service contracts. A $10K/month client on a 3-year contract is worth more than a $15K/month client who price-shops every quarter.' },
      { q: 'How do I know if my pricing is right?', a: 'Compare your gross margin to industry benchmarks. If you\'re at or above the median (34-42% for most trades), your pricing is defensible. Below 30% means you may be undercharging.' },
      { q: 'What\'s the best way to compete with lowball contractors?', a: 'Compete on response time, insurance coverage, equipment quality, track record, and financial stability. When you make the value tangible, you take price out of the conversation.' }
    ]
  },
  'low-payroll-owner-working-free': {
    file: '/content/blogs/low-payroll-owner-working-free.md',
    title: 'Low Payroll Isn\'t a Win \u2014 It\'s You Working for Free',
    date: '2026-03-10',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A veterinary practice doing $1.6M showed payroll at 27% \u2014 well below the 40-45% benchmark. That 13-point gap isn\'t efficiency. It\'s the owner doing $25/hour work when her surgical time is worth $300-$500/hour.',
    categories: ['Healthcare Finance'],
    readTime: '12 min read',
    featuredImage: '/images/blog/low-payroll-owner-working-free.jpg',
    faqs: [
      { q: 'What is a healthy payroll percentage for a veterinary practice?', a: 'AAHA and VHMA benchmarks put total payroll (including owner compensation, all staff wages, payroll taxes, and benefits) at 40-45% of revenue for a general veterinary practice. If your number is significantly below that and you\'re a solo practitioner, the gap is almost always unpaid owner labor \u2014 not efficiency.' },
      { q: 'How much does a veterinary practice manager cost in South Florida?', a: 'In Broward, Miami-Dade, and Palm Beach counties, a full-time practice manager typically runs $45,000-$65,000 per year including benefits. Part-time office managers start at $25,000-$35,000. The role pays for itself if it frees even 8-10 hours per week of clinician time for billable procedures.' },
      { q: 'How do I know if I\'m doing too much non-clinical work?', a: 'Track your time for one week. Write down every task that isn\'t a patient exam, procedure, or surgery. If non-clinical tasks exceed 15 hours per week, you have a delegation problem \u2014 regardless of what your P&L says about payroll.' },
      { q: 'Will hiring a manager actually increase my revenue?', a: 'In every solo practice we\'ve analyzed where the owner freed 15+ hours per week of non-clinical time, procedure volume increased within 60 days. The increase ranges from 10-25% depending on current appointment utilization and local demand.' }
    ]
  },
  'december-financials-lying': {
    file: '/content/blogs/december-financials-lying.md',
    title: 'Why Your December Financials Are Lying to You',
    date: '2026-03-11',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A veterinary practice showed consistent monthly profits of $17K-$74K \u2014 until December hit negative $110,000. The loss was entirely a bookkeeping artifact: $190K in annual expenses dumped into one month.',
    categories: ['Healthcare Finance'],
    readTime: '10 min read',
    featuredImage: '/images/blog/december-financials-lying.jpg',
    faqs: [
      { q: 'Is it wrong to book expenses as annual lump sums?', a: 'It\'s not illegal and it doesn\'t affect your annual tax return. The annual totals are the same either way. But it makes your monthly financial statements unreliable for operational decision-making.' },
      { q: 'What\'s the difference between cash basis and accrual basis for monthly reporting?', a: 'Cash basis records income and expenses when cash changes hands. Accrual basis records them when they\'re earned or incurred, regardless of when cash moves. For monthly reporting, accrual basis with proper monthly entries gives a much more accurate picture.' },
      { q: 'How do I know if my accountant is booking catch-up entries?', a: 'Look at your December P&L. If any expense category is dramatically larger in December than in other months \u2014 especially rent, officer salary, depreciation, or insurance \u2014 it\'s likely a catch-up entry.' },
      { q: 'Will fixing this change my tax liability?', a: 'No. The annual totals remain identical. Switching from annual lump-sum entries to monthly recurring entries is purely an internal reporting change. Your taxable income for the year is the same.' }
    ]
  },
  'idle-cash-costing-practice': {
    file: '/content/blogs/idle-cash-costing-practice.md',
    title: 'The $29,000 Your Practice Loses Every Year to Idle Cash',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A veterinary practice had $737K in cash \u2014 10.5 months of operating expenses \u2014 sitting in a checking account earning $50/year. Inflation was silently eroding $29,000/year in purchasing power. One phone call and a high-yield money market fixes most of it.',
    categories: ['Cash Flow'],
    readTime: '10 min read',
    featuredImage: '/images/blog/idle-cash-costing-practice.jpg',
    faqs: [
      { q: 'How much cash should a healthcare practice keep in checking?', a: 'Two to three months of operating expenses is the standard guideline. For a practice spending $70,000/month in total operating costs, that\'s $140,000\u2013$210,000 in liquid checking. Everything above that should be earning a return.' },
      { q: 'Are high-yield money market accounts safe for business funds?', a: 'Yes. Money market accounts at major brokerages invest in government securities and are extremely low-risk. Bank money market accounts are FDIC-insured up to $250,000 per depositor.' },
      { q: 'What is a cash balance retirement plan?', a: 'A cash balance plan is a type of defined benefit retirement plan that allows high-earning business owners to contribute \u2014 and deduct \u2014 $100,000\u2013$300,000+ per year, depending on age and plan design.' },
      { q: 'Will moving cash out of checking affect my ability to cover expenses?', a: 'Not if you maintain an adequate operating buffer. Two months of operating expenses in checking provides a cushion for normal cash flow variability. The high-yield money market serves as a secondary buffer accessible within 1\u20132 business days.' },
      { q: 'How much interest can I realistically earn on idle practice cash?', a: 'At March 2026 rates, a high-yield money market or short-term Treasury pays 4.0\u20135.0% annually. On $500,000, that\'s $20,000\u2013$25,000/year.' }
    ]
  },
  '5-cash-leaks-service-business': {
    file: '/content/blogs/5-cash-leaks-service-business.md',
    title: 'The 5 Cash Leaks Hiding in Every Service Business',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'We analyzed a multi-entity service business doing $6.4M/year. Profitable by every measure. But $370K was trapped in five places the owners never thought to look. Here are the five leaks \u2014 and how to plug each one in 90 days.',
    categories: ['Cash Flow', 'CFO Services'],
    readTime: '12 min read',
    featuredImage: '/images/blog/5-cash-leaks-service-business.jpg',
    faqs: [
      { q: 'How do I know if my business has cash leaks?', a: 'If your P&L shows a profit but your bank balance feels tight, you have cash leaks. Compare your net income to actual cash from operations \u2014 if cash from operations is significantly lower, money is trapped in receivables, inventory, intercompany balances, or distributions that exceed cash generation.' },
      { q: 'Which cash leak should I fix first?', a: 'Start with past-due receivables \u2014 implementing automated reminders costs nothing, requires no partner negotiations, and can produce collections within weeks. Intercompany settlements are often the second-fastest win.' },
      { q: 'How long does it take to see results from plugging cash leaks?', a: 'Receivables and intercompany settlements can show results within 30 days. Inventory reduction takes 60-90 days. Most businesses see meaningful cash improvement within the first 60 days if they commit to the process.' },
      { q: 'Do these problems only affect large businesses?', a: 'No. A $50K cash leak in a $2M business is 2.5% of revenue \u2014 the difference between making payroll comfortably and sweating every Friday. Smaller businesses are more vulnerable because they have less margin for error.' }
    ]
  },
  '6-financial-blockers-killing-healthcare-practices': {
    file: '/content/blogs/6-financial-blockers-killing-healthcare-practices.md',
    title: 'The 6 Financial Blockers Killing Healthcare Practices',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A radiology group doing $7.36M in gross revenue generated zero real profit. A veterinary practice doing $1.75M had a 34% margin and zero debt. Same industry. Wildly different outcomes. The difference comes down to six financial blockers.',
    categories: ['Healthcare Finance', 'CFO Services'],
    readTime: '18 min read',
    featuredImage: '/images/blog/6-financial-blockers-healthcare.svg',
    faqs: [
      { q: 'Why is my healthcare practice profitable on paper but has no cash?', a: 'Profitability on your P&L and cash in your bank account are two different things. The most common causes are owner draws exceeding actual profit, debt service consuming operating income, accounts receivable taking 45-90 days to collect while expenses hit immediately, and lump-sum bookings that distort monthly visibility.' },
      { q: 'What is a healthy operating margin for a healthcare practice?', a: 'Operating margins vary by specialty: general medical 10-18%, dental 15-25%, veterinary 12-20%, radiology/imaging 8-15%. However, operating margin alone is misleading \u2014 always look at free cash flow after debt service, not just operating margin.' },
      { q: 'Can a practice doing millions in revenue really generate zero profit?', a: 'Yes. A $7M practice with a 3.8% operating margin and $370K in annual debt service is functionally unprofitable. Revenue alone means nothing \u2014 what matters is the spread between revenue and the combined cost of operations, debt service, and owner compensation.' }
    ]
  },
  'which-financial-phase-healthcare-business': {
    file: '/content/blogs/which-financial-phase-healthcare-business.md',
    title: 'Which Financial Phase Is Your Healthcare Business In?',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A startup with 23 days of cash. A radiology group doing $7M but losing money. A vet practice with $651K in reserves and zero debt. These are three different financial phases \u2014 and the advice each one needs is completely different.',
    categories: ['Healthcare Finance', 'CFO Services', 'Business Strategy'],
    readTime: '20 min read',
    featuredImage: '/images/blog/healthcare-practice-financial-phases.svg',
    faqs: [
      { q: 'How long does it take to move from one financial phase to the next?', a: 'A Phase 1 practice with clean revenue and messy books can reach Phase 2 in 60-90 days. A Phase 2 practice with compounding expense and debt issues may take 12-18 months to reach Phase 3. Practices with continuous financial visibility typically advance 2-3x faster.' },
      { q: 'How much cash reserves should a healthcare practice maintain?', a: 'The minimum target is 60-90 days of operating expenses. Phase 3 practices typically hold 3-6 months. The right answer depends on revenue volatility, payer mix, and debt obligations.' },
      { q: 'Why do multi-location practices often struggle financially despite high revenue?', a: 'Multi-location expansion multiplies fixed costs while revenue at new locations takes 6-18 months to mature. Without per-location P&L tracking, profitable locations subsidize unprofitable ones invisibly, masking problems for quarters until cash flow deteriorates.' }
    ]
  },
  'pl-says-profitable-bank-account-empty': {
    file: '/content/blogs/pl-says-profitable-bank-account-empty.md',
    title: 'Your P&L Says You\'re Profitable \u2014 So Why Is Your Bank Account Empty?',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $6.4M service business showed $454K in EBITDA. Healthy, right? But the owners were pulling $402K in distributions and paying $199K in debt service. That\'s $601K in obligations against $454K in earnings \u2014 a $147K annual cash deficit hidden behind a profitable P&L.',
    categories: ['Cash Flow', 'CFO Services'],
    readTime: '12 min read',
    featuredImage: '/images/blog/pl-profitable-bank-account-empty.jpg',
    faqs: [
      { q: 'Why is my business profitable but I have no cash?', a: 'Because profit is an accounting measurement and cash is a bank balance. They diverge because of four things the P&L doesn\'t capture: working capital changes, loan principal payments, owner draws/distributions, and capital expenditures.' },
      { q: 'What is the EBITDA-to-cash waterfall?', a: 'It\'s a bridge that starts with your EBITDA and subtracts every non-P&L cash outflow \u2014 working capital changes, debt service, distributions, taxes paid, and CapEx \u2014 to arrive at your actual ending cash position.' },
      { q: 'How much should business owners take in distributions?', a: 'The safe threshold is 60% of trailing twelve-month cash from operations. Not 60% of profit \u2014 60% of actual operating cash flow. This leaves a 40% buffer for debt service, CapEx, working capital fluctuations, and reserves.' },
      { q: 'What is a healthy Cash Conversion Cycle for service businesses?', a: 'For service businesses in the $2M-$15M range, a healthy CCC is 45 to 75 days. Distribution businesses should target 60 to 90 days. If your CCC exceeds 100 days, you\'re financing your customers\' cash flow at your own expense.' },
      { q: 'Should I look at net income or cash flow to evaluate my business?', a: 'Both, but never net income alone. Net income tells you whether your pricing and cost structure work. Cash flow tells you whether you can sustain operations, service debt, and compensate owners.' }
    ]
  },
  'hidden-cost-not-tracking-wip': {
    file: '/content/blogs/hidden-cost-not-tracking-wip.md',
    title: 'The Hidden Cost of Not Tracking Work-in-Progress',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A service business bills $80K/month. But $45K in labor and materials sits unbilled and invisible \u2014 not on the P&L, not on the balance sheet. Without WIP tracking, your financials are fiction.',
    categories: ['Accounting'],
    readTime: '10 min read',
    featuredImage: '/images/blog/wip-tracking-service-business.jpg',
    faqs: [
      { q: 'What types of businesses need WIP tracking?', a: 'Any business where work is performed before invoicing \u2014 engineering firms, architects, IT consultancies, marketing agencies, construction, healthcare staffing, legal practices, and accounting firms. If your billing cycle is longer than a week and project values exceed $10K, WIP tracking will meaningfully improve your financial accuracy.' },
      { q: 'Does WIP tracking require special software?', a: 'No. A well-structured spreadsheet updated weekly works for businesses under $5M in revenue with fewer than 20 active projects. Above that, job costing modules in QuickBooks Online, Xero, or dedicated tools like Knowify or BigTime make it more efficient.' },
      { q: 'How does WIP affect my taxes?', a: 'For long-term contracts, IRC Section 460 generally requires the percentage-of-completion method for tax reporting. Even for shorter contracts, the IRS expects consistent revenue recognition. Under ASC 606, GAAP requires revenue recognition when performance obligations are satisfied, not when invoices are sent.' },
      { q: 'How often should WIP be updated?', a: 'Weekly is ideal. Monthly is the minimum. At the weekly level, you can catch cost overruns on active projects before they compound. If your average project length is under 30 days, monthly updates may be adequate. Over 30 days, weekly is strongly recommended.' },
      { q: 'What is the difference between WIP and accounts receivable?', a: 'Accounts receivable is work that has been billed but not yet paid. WIP is work that has been performed but not yet billed. They are sequential: work moves from WIP (unbilled) to AR (billed, awaiting payment) to cash (collected).' }
    ]
  },
  'stop-doing-your-own-books': {
    file: '/content/blogs/stop-doing-your-own-books.md',
    title: 'Stop Doing Your Own Books: The Real Cost of DIY Bookkeeping',
    date: '2026-03-04',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'DIY bookkeeping looks free until you count your time, missed deductions, and IRS penalties. Here\'s the real math for SE Florida business owners \u2014 and when it makes sense to hand it off.',
    categories: ['Bookkeeping', 'Tax Planning', 'Small Business'],
    readTime: '7 min read',
    featuredImage: '/images/blog/business-owner-late-night-bookkeeping.jpg'
  },
  'davie-accounting-services': {
    file: '/content/blogs/davie-accounting-services.md',
    title: 'Davie Accounting Services for Healthcare Practices & Service-Based Businesses',
    date: '2026-02-12',
    author: 'Benefique Tax & Accounting',
    excerpt: 'Expert accounting services in Davie, FL for healthcare practices (radiology, surgery, dental, vet, pain clinics) and service businesses (law, marine, IT). Real-time reporting, monthly closes, 24-hour response. Tax planning + bookkeeping.',
    categories: ['Accounting Services', 'Local Business', 'Tax Planning'],
    readTime: '14 min read',
    featuredImage: '/images/blog/davie-accounting-hero.jpg'
  },
  's-corp-election': {
    file: '/content/blogs/s-corp-election-guide-V3.md',
    title: 'S-Corp Election: Is It Right for Your Florida Business?',
    date: '2026-01-30',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'S-Corp election can save Florida business owners $5K-$20K yearly in self-employment taxes—but only if your profit exceeds $100K.',
    categories: ['Tax Planning', 'Entity Structure', 'S-Corporation'],
    readTime: '15 min read',
    featuredImage: '/images/blog/s-corp-hero.svg'
  },
  'cash-flow-forecasting': {
    file: '/content/blogs/cash-flow-forecasting-101-REVISED.md',
    title: 'Cash Flow Forecasting 101: A Practical Guide for Business Owners',
    date: '2026-01-30',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Learn cash flow forecasting for your small business with this practical guide.',
    categories: ['Cash Flow', 'Financial Management', 'Planning'],
    readTime: '12 min read',
    featuredImage: '/images/blog/cash-flow-hero.svg'
  },
  'radiology-collections-dashboard-case-study': {
    file: '/content/blogs/radiology-collections-dashboard-case-study.md',
    title: 'Case Study: Real-Time Collections Intelligence System for Multi-Center Radiology Group',
    date: '2026-02-23',
    author: 'Benefique Tax & Accounting',
    excerpt: 'How we built interactive dashboards that identified a 30% revenue decline, eliminated the \'seasonality excuse,\' and quantified a multi-million dollar A/R crisis for a six-center diagnostic imaging group.',
    categories: ['Case Studies', 'CFO Services', 'Healthcare'],
    readTime: '14 min read',
    featuredImage: '/images/blog/radiology-dashboard-case-study.jpg'
  },
  'dashboards-that-get-used': {
    file: '/content/blogs/dashboards-that-get-used.md',
    title: 'Real-Time Dashboards That Actually Get Used',
    date: '2026-01-31',
    author: 'Benefique Tax & Accounting',
    excerpt: 'Most business owners ignore their financial reports because they\'re boring PDFs full of numbers. Here\'s how we designed dashboards that clients check daily—and why it matters.',
    categories: ['Best Practices', 'CFO Services', 'Financial Reporting'],
    readTime: '18 min read',
    featuredImage: '/images/blog/dashboard-design-best-practices.jpg'
  },
  'ai-powered-cash-flow-intelligence': {
    file: '/content/blogs/ai-powered-cash-flow-intelligence.md',
    title: 'AI-Powered Cash Flow Intelligence: How Real-Time Data Fixes Your Biggest Business Problem',
    date: '2026-03-01',
    author: 'Benefique Tax & Accounting',
    excerpt: 'Your biggest business problem isn\'t profit. It\'s cash flow. Discover how AI-powered data synthesis and real-time financial intelligence give SMB owners Fortune 500-level visibility into cash conversion cycles, working capital, and the metrics that actually control their cash position.',
    categories: ['Cash Flow Advisory', 'AI Accounting', 'Financial Intelligence'],
    readTime: '22 min read',
    featuredImage: '/images/blog/cash-flow-accounts-receivable.jpg'
  },
  'improve-dso-without-sacrificing-relationships': {
    file: '/content/blogs/improve-dso-without-sacrificing-relationships.md',
    title: '5 Ways to Improve Your DSO Without Sacrificing Relationships',
    date: '2026-03-03',
    author: 'Benefique Tax & Accounting',
    excerpt: 'The average small business has $84,000 in unpaid invoices. Here are 5 proven strategies to collect faster without damaging client relationships -- from clear terms to smart segmentation.',
    categories: ['Cash Flow Advisory', 'Accounts Receivable'],
    readTime: '10 min read',
    featuredImage: '/images/blog/dso-unpaid-invoices.jpg'
  },
  'real-time-financial-dashboards-healthcare-practices': {
    file: '/content/blogs/real-time-financial-dashboards-healthcare-practices.md',
    title: 'Real-Time Financial Dashboards for Healthcare Practices',
    date: '2026-03-05',
    author: 'Benefique Tax & Accounting',
    excerpt: 'A real-time financial dashboard gives healthcare practice owners instant visibility into collection rates, AR aging, overhead ratio, DSO, and cash runway. Here are the 10 KPIs every practice should track, with benchmarks by specialty.',
    categories: ['Cash Flow Advisory', 'Healthcare Finance', 'Financial Intelligence'],
    readTime: '11 min read',
    featuredImage: '/images/blog/proactive-cash-flow-monitoring.jpg'
  },
  'how-to-calculate-cash-conversion-cycle': {
    file: '/content/blogs/how-to-calculate-cash-conversion-cycle.md',
    title: 'How to Calculate Your Cash Conversion Cycle (Service Business & Healthcare Guide)',
    date: '2026-03-04',
    author: 'Benefique Tax & Accounting',
    excerpt: 'The Cash Conversion Cycle measures how many days it takes to turn money you spend into cash you collect. For service businesses with no inventory, it simplifies to CCC = DSO - DPO. Lower is better.',
    categories: ['Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '9 min read',
    featuredImage: '/images/blog/cash-conversion-cycle-calculation.jpg'
  },
  'ai-cash-flow-forecasting-small-business': {
    file: '/content/blogs/ai-cash-flow-forecasting-small-business.md',
    title: 'How AI Cash Flow Forecasting Helps Small Businesses Stay 30 Days Ahead',
    date: '2026-03-04',
    author: 'Benefique Tax & Accounting',
    excerpt: 'AI cash flow forecasting uses machine learning to analyze your transaction data, client payment patterns, and expenses to project your cash position 30-60 days forward. Here\'s how it works and why your accountant matters more than the software.',
    categories: ['Cash Flow Advisory', 'AI Accounting', 'Financial Intelligence'],
    readTime: '12 min read',
    featuredImage: '/images/blog/ai-cash-flow-forecasting-dashboard.jpg'
  },
  'why-monthly-reports-too-late': {
    file: '/content/blogs/why-monthly-reports-too-late.md',
    title: 'Why Monthly Reports Are Too Late for Cash Decisions',
    date: '2026-03-03',
    author: 'Benefique Tax & Accounting',
    excerpt: 'Your monthly P&L arrives 3-4 weeks after the month ends. By then, you\'ve already made the decisions it should have informed. Here\'s what real-time visibility looks like.',
    categories: ['Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '10 min read',
    featuredImage: '/images/blog/real-time-financial-dashboard.jpg'
  },
  'rd-tax-credits-healthcare': {
    file: '/content/blogs/rd-tax-credits-healthcare.md',
    title: 'R&D Tax Credits: Hidden Money for Healthcare Practices',
    date: '2026-02-05',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Many healthcare businesses miss out on significant R&D credits. Here\'s how to identify and claim them.',
    categories: ['Tax Credits', 'Healthcare', 'Tax Strategy'],
    readTime: '16 min read',
    featuredImage: '/images/blog/rd-tax-credits-hero.jpg'
  },
  'multi-location-financial-management': {
    file: '/content/blogs/multi-location-financial-management.md',
    title: 'Multi-Location Financial Management: Best Practices for Growing Businesses',
    date: '2026-02-05',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Get location-level visibility for your multi-location business. Learn entity structure, overhead allocation, P&L setup, and real-world examples.',
    categories: ['Financial Management', 'Multi-Location', 'Growth', 'CFO Services'],
    readTime: '20 min read',
    featuredImage: '/images/blog/multi-location-hero.svg'
  },
  'cash-flow-management-healthcare-service-businesses-broward-county': {
    file: '/content/blogs/cash-flow-management-healthcare-service-businesses-broward-county.md',
    title: 'Why Your Broward County Practice Is Profitable on Paper but Can\'t Make Payroll',
    date: '2026-02-26',
    author: 'Gerrit Disbergen, Benefique Tax & Accounting',
    excerpt: 'Medical practices wait 30-90 days for insurance reimbursement. Service firms chase invoices for months. Learn how Davie-based Benefique helps healthcare and professional services businesses across Broward County fix cash flow, collect faster, and stop running out of money.',
    categories: ['Cash Flow Advisory', 'Healthcare Finance', 'Professional Services'],
    readTime: '22 min read',
    featuredImage: '/images/blog/cash-flow-broward-county-healthcare.jpg'
  },
  '2026-tax-law-changes-broward-county-healthcare-service-businesses': {
    file: '/content/blogs/2026-tax-law-changes-broward-county-healthcare-service-businesses.md',
    title: '2026 Tax Law Changes: What Every Broward County Practice Owner Needs to Know',
    date: '2026-02-26',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'The One Big Beautiful Bill Act changed everything: 100% bonus depreciation is back, Section 179 jumped to $2.56M, QBI is permanent, and the dependent care FSA doubled to $7,500. Here\'s what Broward County practice owners and service business operators need to do before year-end.',
    categories: ['Tax Planning', 'Healthcare Finance'],
    readTime: '26 min read',
    featuredImage: '/images/blog/2026-tax-law-changes-healthcare.jpg'
  },
  '1099-vs-w2-worker-classification-healthcare-service-businesses-broward-county': {
    file: '/content/blogs/1099-vs-w2-worker-classification-healthcare-service-businesses-broward-county.md',
    title: '1099 vs. W-2 in Your Healthcare or Service Practice: The Classification Mistake That Could Cost You $50,000+',
    date: '2026-03-06',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'The IRS and DOL are cracking down on worker misclassification in healthcare and professional services. Dental hygienists, associate physicians, therapists, IT contractors—if you\'re paying them on a 1099, you might owe back taxes, penalties, and benefits.',
    categories: ['Tax Compliance', 'Healthcare Finance', 'Employment Tax'],
    readTime: '24 min read',
    featuredImage: '/images/blog/worker-classification-hero.jpg'
  },
  'missed-tax-deductions-healthcare-service-businesses-broward-county': {
    file: '/content/blogs/missed-tax-deductions-healthcare-service-businesses-broward-county.md',
    title: '7 Tax Deductions Your Broward County Practice Is Probably Missing (And the Dollar Amount of Each)',
    date: '2026-02-26',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'The average medical practice overpays $15,000-$50,000 annually in taxes from missed deductions. From accountable plans to the Augusta Rule to retirement plan stacking—here are 7 deductions most Broward County practice owners don\'t know about.',
    categories: ['Tax Planning', 'Healthcare Finance', 'Professional Services'],
    readTime: '22 min read',
    featuredImage: '/images/blog/tax-deductions-hero.jpg'
  },
  'concierge-medicine-income-south-florida': {
    file: '/content/blogs/concierge-medicine-income-south-florida.md',
    title: 'How Much Does a Concierge Medical Practice Make in South Florida?',
    date: '2026-03-07',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Concierge physicians in South Florida earn $500K-$1M+ while seeing fewer patients and working fewer hours. Here\'s the complete revenue model, income comparison, overhead analysis, and tax strategy breakdown for Broward County practices.',
    categories: ['Concierge Medicine', 'Physician Finance', 'Tax Strategy'],
    readTime: '18 min read',
    featuredImage: '/images/blog/concierge-medicine-income-south-florida.svg',
    faqs: [
      { q: 'How much does a concierge doctor make in Florida?', a: 'Concierge physicians in South Florida typically earn $500,000 to $1,000,000+ in net income, compared to $200,000-$400,000 for insurance-based primary care physicians. Income depends on membership fee ($2,000-$15,000/year), patient panel size (200-500), and overhead structure.' },
      { q: 'What is the average membership fee for concierge medicine?', a: 'Concierge medicine membership fees typically range from $2,000 to $15,000 per year. In affluent South Florida communities like Weston and Parkland, fees of $5,000-$10,000 are common. Direct Primary Care (DPC) uses lower monthly fees of $75-$200.' },
      { q: 'Is concierge medicine profitable?', a: 'Yes. Concierge practices typically achieve 40-55% overhead ratios compared to 60-70% for insurance-based practices. A solo concierge physician with 350 patients at $5,000/year generates $1.75M in revenue with approximately $980,000 in net income.' }
    ]
  },
  'cost-starting-concierge-medical-practice': {
    file: '/content/blogs/cost-starting-concierge-medical-practice.md',
    title: 'The Real Cost of Starting a Concierge Medical Practice',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A concierge practice can launch for $100K-$175K in Broward County. Here\'s every startup cost, monthly recurring expense, South Florida lease benchmark, entity structure decision, and pre-launch checklist you need.',
    categories: ['Concierge Medicine', 'Practice Startup', 'Tax Planning'],
    readTime: '20 min read',
    featuredImage: '/images/blog/cost-starting-concierge-practice.svg',
    faqs: [
      { q: 'How much does it cost to start a concierge medical practice?', a: 'Most solo concierge practices in Broward County launch for $100,000-$175,000 in total startup capital, including entity formation, office buildout, equipment, EHR, marketing, and 3-6 months of operating reserves. Physicians converting an existing practice spend significantly less.' },
      { q: 'What entity structure should a concierge physician use?', a: 'Most concierge physicians should form a Florida PLLC with S-Corp tax election. At $500,000+ in net income, the S-Corp election saves $15,000-$25,000 per year in self-employment taxes. The election must be filed within 75 days of entity formation or by March 15.' },
      { q: 'How long does it take for a concierge practice to break even?', a: 'Converting an existing practice takes 6-12 months to break even and 12-24 months to reach target income. Starting a new concierge practice with no patient base takes 12-18 months to break even. Joining an established network like MDVIP can reach breakeven in 3-6 months.' }
    ]
  },
  'concierge-medicine-vs-insurance-practice-financial-comparison': {
    file: '/content/blogs/concierge-medicine-vs-insurance-practice-financial-comparison.md',
    title: 'Concierge Medicine vs Insurance-Based Practice: A Financial Comparison',
    date: '2026-03-09',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Side-by-side financial comparison of traditional, concierge, DPC, and hybrid practice models. Revenue, overhead, take-home pay, quality of life metrics, and transition planning for South Florida physicians.',
    categories: ['Concierge Medicine', 'Physician Finance', 'Practice Models'],
    readTime: '22 min read',
    featuredImage: '/images/blog/concierge-vs-insurance-comparison.svg',
    faqs: [
      { q: 'What is the difference between concierge medicine and insurance-based practice?', a: 'Insurance-based practices see 2,000-2,500 patients, bill insurance carriers, and earn $240K-$400K after 60-70% overhead. Concierge practices charge $2,000-$15,000 annual membership fees, limit panels to 200-500 patients, achieve 40-55% overhead, and net $550K-$1.2M.' },
      { q: 'How much overhead does a concierge practice save compared to traditional?', a: 'Concierge practices save $232,000-$452,000 per year in overhead compared to insurance-based practices. The biggest savings come from eliminating billing staff ($65K-$160K), claims processing ($12K-$27K), and denials/write-offs ($70K-$200K).' },
      { q: 'What is the burnout rate for concierge physicians vs traditional?', a: 'Concierge physicians report burnout rates under 15%, compared to over 50% for insurance-based physicians. Concierge doctors work 1,400-2,000 hours per year versus 2,200-2,600, see 6-12 patients daily versus 20-30, and take 4-6 weeks vacation versus 2-3.' }
    ]
  },
  'tax-strategies-concierge-physicians': {
    file: '/content/blogs/tax-strategies-concierge-physicians.md',
    title: 'Tax Strategies for Concierge Physicians',
    date: '2026-03-10',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Eight tax strategies that save concierge physicians $50K-$150K per year: S-Corp optimization, retirement plan stacking, accountable plans, Augusta Rule, Section 179, family employment, entity structuring, and QBI planning.',
    categories: ['Tax Strategy', 'Concierge Medicine', 'Physician Finance'],
    readTime: '24 min read',
    featuredImage: '/images/blog/tax-strategies-concierge-physicians.svg',
    faqs: [
      { q: 'How can concierge physicians reduce their taxes?', a: 'Concierge physicians can save $50,000-$150,000 per year through 8 strategies: S-Corp election ($10K-$42K savings), retirement plan stacking with Cash Balance Plans ($80K-$155K shelter), accountable plans ($6K-$20K), Augusta Rule ($18K-$36K tax-free), Section 179 deductions, family employment, multi-entity structuring, and QBI deduction planning.' },
      { q: 'What is a Cash Balance Plan for physicians?', a: 'A Cash Balance Plan is a defined benefit retirement plan allowing contributions of $150,000-$400,000+ per year (depending on age), far exceeding 401(k) limits. A 50-year-old physician can shelter approximately $345,000 annually when combined with a 401(k), saving $127,650 in federal taxes at the 37% bracket.' },
      { q: 'Should a concierge physician form an S-Corp?', a: 'Yes, for most concierge physicians earning $400K+. An S-Corp with properly set reasonable compensation ($200K-$300K for physicians) saves $10,400-$42,300 per year in self-employment taxes compared to operating as an LLC. The S-Corp election is filed on IRS Form 2553.' }
    ]
  },
  'concierge-physicians-build-wealth-beyond-practice': {
    file: '/content/blogs/concierge-physicians-build-wealth-beyond-practice.md',
    title: 'How Concierge Physicians Can Build Wealth Beyond Their Practice',
    date: '2026-03-11',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A concierge physician earning $600K/year can accumulate $15-25M over 20 years with disciplined deployment across retirement plans, real estate, practice equity, and tax-efficient investments. Here\'s the complete wealth-building framework.',
    categories: ['Wealth Building', 'Concierge Medicine', 'Physician Finance'],
    readTime: '22 min read',
    featuredImage: '/images/blog/concierge-physicians-build-wealth.svg',
    faqs: [
      { q: 'How much wealth can a concierge physician accumulate?', a: 'A concierge physician earning $600,000/year who deploys capital across retirement plans, real estate, practice equity, and tax-efficient investments can realistically accumulate $15-25 million over a 20-year career, compared to $3-5 million without structured wealth-building strategies.' },
      { q: 'What is the best retirement plan for high-income physicians?', a: 'The optimal structure is a stacked retirement plan: 401(k) employee deferral ($23,500) + employer match (up to $46,000) + Cash Balance Plan ($150,000-$350,000+). This shelters $219,500-$419,500 annually, saving $81,000-$155,000 in federal taxes at the 37% bracket.' },
      { q: 'How do physicians build wealth through real estate?', a: 'Physicians build real estate wealth by owning their office space, investing in rental properties, or participating in commercial syndications. Cost segregation studies accelerate depreciation deductions ($74K-$130K in Year 1 tax savings on a $1.5M property). 1031 exchanges defer capital gains indefinitely when reinvesting proceeds.' }
    ]
  },
  'ai-cfo-analysis': {
    file: '/content/blogs/ai-cfo-analysis.md',
    title: 'What AI-Assisted CFO Analysis Actually Looks Like',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Most people think AI financial analysis means plugging data into ChatGPT. It doesn\'t. Here\'s what actually happens when an AI-assisted CFO engagement turns 7 months of QuickBooks data into a 28-page report with 14 charts — and finds $353K in trapped cash nobody knew about.',
    categories: ['Technology & Automation'],
    readTime: '12 min read',
    featuredImage: '/images/blog/ai-cfo-analysis.jpg',
    faqs: [
      { q: 'What is AI cash flow forecasting, exactly?', a: 'AI cash flow forecasting uses machine learning and pattern analysis to examine historical transaction data and project future cash positions. It takes the data already in QuickBooks and answers questions like "Will we have enough cash to cover payroll in 60 days?" The AI accelerates the analysis; a practitioner interprets it and makes it actionable.' },
      { q: 'How is this different from the reports QuickBooks generates?', a: 'QuickBooks generates reports. AI-assisted CFO analysis generates insight. A QBO cash flow statement shows what happened. It won\'t tell you that your $1.4M bank balance includes $903K in trust funds you can\'t touch, or calculate your draw coverage ratio, or flag a 6x labor anomaly.' },
      { q: 'Is my financial data safe if you\'re using AI?', a: 'Yes. The AI analysis layer receives aggregate financial data — revenue totals, expense categories, AR aging — not client names, case files, or privileged information. Anthropic\'s enterprise API is SOC 2 Type II certified and does not train on submitted data. The most sensitive processing steps run locally on our systems.' },
      { q: 'Do I need to change anything in QuickBooks to get this analysis?', a: 'In most cases, no. The extraction scripts connect directly to your existing QBO account via API. Part of what we do is identify data quality issues as a byproduct of the analysis itself. You may need a QBO account in good standing and a brief authorization step.' },
      { q: 'How long does an AI-assisted CFO engagement take?', a: 'For a typical small business with 12 months or less of QBO history, data extraction and AI analysis runs in hours. A first engagement typically runs 3-5 business days. Subsequent monthly reports deliver faster once the baseline is established.' },
      { q: 'What size business is this designed for?', a: 'Our CFO analysis clients typically run between $500K and $10M in annual revenue. The sweet spot is the established small business generating real revenue and making real financial decisions — but without a finance team to support those decisions with data.' }
    ]
  },
  'ai-found-353k-trapped-cash': {
    file: '/content/blogs/ai-found-353k-trapped-cash.md',
    title: 'How AI Found $353,000 in Trapped Cash — Using Data Already in QuickBooks',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A professional services firm had $353,000 trapped in slow-paying receivables, a bank balance that overstated actual cash by $900K, and partner draws that exceeded a $1.58M windfall. All of this was sitting in their QuickBooks data. Nobody had mined it until AI did.',
    categories: ['Cash Flow'],
    readTime: '11 min read',
    featuredImage: '/images/blog/ai-found-353k-trapped-cash.jpg',
    faqs: [
      { q: 'What is "trapped cash" and how do I know if my business has it?', a: 'Trapped cash is money your business has earned but cannot access or deploy. The most common forms are uncollected receivables, cash held in restricted accounts, inventory that isn\'t turning, and prepaid expenses. A DSO above your industry benchmark, a cash conversion ratio below 50%, or a gap between your bank balance and your actual operating account are all signs.' },
      { q: 'Can AI actually find things in QuickBooks that a CPA would miss?', a: 'Yes — not because AI is smarter than a CPA, but because it runs different calculations. A CPA prepares financial statements or tax returns. AI configured for cash flow analysis calculates DSO trends, draw coverage ratios, and cash conversion efficiency automatically, across all periods, every time.' },
      { q: 'How long does it take for AI to analyze a QuickBooks file?', a: 'With direct API access to QuickBooks Online, an AI-assisted analysis can pull and process months of transaction data in minutes. The output — ratios, trends, anomaly flags, ranked cash traps — is available almost immediately.' },
      { q: 'Is this the kind of analysis that only works for large businesses?', a: 'No. It\'s more valuable for smaller businesses because they have less margin for error. A business doing $2M in revenue with 1.3 months of cash runway is in a more dangerous position than a larger firm — and small business owners have far less visibility into their own data.' },
      { q: 'What does it cost to get this kind of analysis done?', a: 'A one-time engagement can range from a few hundred to a few thousand dollars depending on scope. An ongoing monthly CFO service typically runs $500 to $2,500 per month for a small to mid-market business. The more relevant question is what it costs not to have it.' },
      { q: 'What if my QuickBooks records are not perfectly clean?', a: 'They don\'t need to be perfect. They need to be reasonably accurate. AI analysis can flag inconsistencies, identify outliers, and note data quality issues as part of the output. Messy data doesn\'t make analysis impossible — it makes the anomaly detection more valuable.' }
    ]
  },
  'dso-350k-number-business-owners': {
    file: '/content/blogs/dso-350k-number-business-owners.md',
    title: 'DSO: The $350,000 Number Most Business Owners Have Never Heard Of',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Days Sales Outstanding measures how long clients take to pay after you invoice them. One firm\'s AI-assisted analysis showed that reducing DSO by just 15 days would free $353,000 in cash — without earning a single new dollar. Here\'s the formula, the benchmarks, and 5 ways to cut your DSO this quarter.',
    categories: ['Cash Flow'],
    readTime: '12 min read',
    featuredImage: '/images/blog/dso-350k-number-business-owners.jpg',
    faqs: [
      { q: 'What is a good DSO for a small business?', a: 'Your DSO should be no more than one-third higher than your stated payment terms. If your terms are Net 30, a DSO of 35-40 days is healthy. A DSO of 60+ days on Net 30 terms means a significant portion of your clients are paying late. Best-in-class professional services firms target 30-45 days.' },
      { q: 'How do I calculate my DSO?', a: 'Pull two numbers from QuickBooks: your current accounts receivable balance and your revenue for the most recent full month. Then: DSO = (Accounts Receivable / Monthly Revenue) x 28. Run it monthly to track whether you\'re improving or drifting.' },
      { q: 'What causes DSO to increase?', a: 'The most common causes are: clients taking longer to pay, looser payment terms offered without realizing it, invoices going out later in the billing cycle, disputes or errors that delay payment, and simply no system to follow up on aging invoices. DSO tends to creep up gradually until it\'s suddenly 20 days higher than a year ago.' },
      { q: 'How does DSO relate to cash flow?', a: 'DSO is the most direct driver of operating cash flow for service businesses. Every day in the gap between earning revenue and collecting cash is a day your business is funding operations without the cash to show for it. Reducing DSO doesn\'t increase revenue but dramatically improves available cash.' },
      { q: 'Can AI help reduce DSO?', a: 'AI spots the pattern before you do. In this case, AI-assisted QuickBooks analysis flagged the 61-day DSO, the 32% AR growth rate, and the $353K cash impact in a routine monthly review. The owner had the data the whole time — there was just no system routinely mining QBO for that signal.' }
    ]
  },
  'bank-balance-lying-trust-accounts': {
    file: '/content/blogs/bank-balance-lying-trust-accounts.md',
    title: 'Why Your Business Bank Balance Is Lying to You',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A professional services firm thought they had $1.4 million in the bank. AI-assisted analysis revealed that $903K was client trust funds — not their money. Actual available cash: $493K. Here\'s how to calculate your real cash position and why most business owners overstate theirs by 40-65%.',
    categories: ['Cash Flow'],
    readTime: '10 min read',
    featuredImage: '/images/blog/bank-balance-lying-trust-accounts.jpg',
    faqs: [
      { q: 'How much cash does my business actually have?', a: 'Start with your total bank balance across all accounts. Subtract any trust, escrow, or restricted account balances. Subtract uncleared checks and pending payments. The result is your available cash. For businesses with trust accounts or restricted funds, the difference is often 40 to 65 percent.' },
      { q: 'What is an IOTA trust account?', a: 'IOTA stands for Interest on Trust Accounts. It\'s a type of client trust account required by state bar rules for law firms. Client funds must be deposited into a separate, segregated IOTA account rather than the firm\'s operating account. The principal belongs to clients and cannot be used for firm operating expenses.' },
      { q: 'Should I include my trust account in cash flow analysis?', a: 'No. Trust account balances should be excluded from any operating cash flow analysis. Including trust account activity will distort every metric: your cash conversion cycle, your days cash on hand, your runway calculation.' },
      { q: 'How do I separate firm cash from client funds in QuickBooks?', a: 'Create a separate bank account for the trust and a corresponding Trust Liability account on the balance sheet. When client funds are received, debit the trust bank account and credit Trust Liability. Running a balance sheet should show these netting to zero.' },
      { q: 'What is a healthy cash position for a small business?', a: 'The standard benchmark is three to six months of operating expenses in readily accessible, unrestricted cash. For a business with $100,000/month in operating costs, that means $300,000 to $600,000 in available operating cash — not trust funds, not restricted reserves, not uncollected AR.' },
      { q: 'Why does my bank balance look fine but I still feel cash-strapped?', a: 'Your subconscious may be tracking available cash more accurately than your conscious mind. If you have trust accounts or restricted funds, the bank balance is the fiction. Do the available cash calculation — in almost every case, the subjective sense of tightness is real.' }
    ]
  },
  'monthly-cash-review-20-minutes': {
    file: '/content/blogs/monthly-cash-review-20-minutes.md',
    title: 'The 20-Minute Monthly Cash Review That Changes Everything',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Most business owners skip monthly financial reviews because they take too long and cover too much. This one takes 20 minutes, tracks 5 metrics, and catches cash flow problems before they become crises. Print the dashboard. Tape it to your monitor. Use it Monday.',
    categories: ['Cash Flow'],
    readTime: '9 min read',
    featuredImage: '/images/blog/monthly-cash-review-20-minutes.jpg',
    faqs: [
      { q: 'What financial metrics should I track monthly?', a: 'Track five metrics: available cash (total bank minus restricted funds), days sales outstanding (DSO), accounts receivable over 60 days, owner draw coverage ratio, and revenue compared to your trailing six-month average. Everything else belongs in quarterly or annual reviews.' },
      { q: 'How often should a business owner review cash flow?', a: 'Monthly at minimum using a structured format. Businesses with tight cash positions, high AR balances, or seasonal volatility should add a weekly 10-minute check. Daily cash monitoring is warranted during a cash crisis or when a line of credit is drawn above 50% capacity.' },
      { q: 'What is draw coverage ratio and why does it matter?', a: 'Draw coverage ratio is your cash from operations divided by total owner draws for the month. A ratio below 1.0x means your distributions exceed the cash your business is generating — you\'re paying yourself from reserves rather than operational cash flow. It\'s one of the most reliable early indicators of a coming cash shortfall.' },
      { q: 'How do I know if my business has a cash flow problem?', a: 'The early warning signs: DSO trending upward, AR over 60 days growing as a percentage of total receivables, available cash declining even when revenue is flat or growing, and draw coverage falling below 1.0x. Two or more occurring simultaneously is a cash flow problem.' },
      { q: 'Can I do this review myself without an accountant?', a: 'Yes. The five metrics can all be pulled from QuickBooks Online in under 15 minutes if your books are current. Where an accountant or CFO advisor adds value is in interpreting anomalies and connecting the monthly picture to tax implications and annual planning.' }
    ]
  },
  's-corp-reasonable-compensation-healthcare-service-businesses-broward-county': {
    file: '/content/blogs/s-corp-reasonable-compensation-healthcare-service-businesses-broward-county.md',
    title: 'S-Corp Reasonable Compensation: How Much Should You Pay Yourself (And Why Getting It Wrong Costs More Than You Think)',
    date: '2026-02-27',
    author: 'Gerrit Disbergen, EA',
    excerpt: '73% of S-Corp audits focus on reasonable compensation. Pay yourself too little and the IRS reclassifies your distributions as wages. Pay yourself too much and you\'re overpaying FICA by thousands. Here\'s the definitive guide to finding your optimal salary.',
    categories: ['Tax Planning', 'S-Corp Strategy'],
    readTime: '59 min read',
    featuredImage: '/images/blog/s-corp-reasonable-compensation-featured.jpg'
  }
};

// Custom components for enhanced markdown rendering
const MarkdownComponents = {
  // Enhanced H2 with anchor links
  h2: ({node, children, ...props}) => {
    const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return (
      <h2 
        id={id}
        className="text-3xl font-bold text-benefique-navy mb-6 mt-16 pt-8 border-t-2 border-gray-200 scroll-mt-20"
        {...props}
      >
        {children}
      </h2>
    );
  },

  // Enhanced H3
  h3: ({node, children, ...props}) => {
    const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return (
      <h3 
        id={id}
        className="text-2xl font-bold text-benefique-navy mb-4 mt-10 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    );
  },

  // Enhanced paragraphs
  p: ({node, children, ...props}) => {
    return (
      <p className="text-gray-800 text-lg leading-relaxed mb-6" {...props}>
        {children}
      </p>
    );
  },

  // Enhanced blockquotes (for callout boxes)
  blockquote: ({node, children, ...props}) => {
    // Check if it's a special callout
    const text = node?.children?.[0]?.children?.[0]?.value || '';
    
    // Info box (starts with ℹ️ or "Note:")
    if (text.includes('ℹ️') || text.startsWith('Note:')) {
      return (
        <div className="my-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div className="flex-1 text-gray-700">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // Warning box (starts with ⚠️ or "Warning:")
    if (text.includes('⚠️') || text.startsWith('Warning:')) {
      return (
        <div className="my-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1 text-gray-700">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // Success/tip box (starts with ✅ or "Tip:")
    if (text.includes('✅') || text.startsWith('Tip:')) {
      return (
        <div className="my-8 bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div className="flex-1 text-gray-700">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // Default: Pull quote
    return (
      <blockquote className="my-8 border-l-4 border-benefique-orange bg-orange-50 pl-6 py-4 italic text-xl text-gray-700 font-medium rounded-r-lg">
        {children}
      </blockquote>
    );
  },

  // Enhanced tables with proper spacing
  table: ({node, ...props}) => (
    <div className="my-8 overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),

  thead: ({node, ...props}) => (
    <thead className="bg-benefique-navy" {...props} />
  ),

  th: ({node, ...props}) => (
    <th 
      className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
      {...props}
    />
  ),

  tbody: ({node, ...props}) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),

  td: ({node, ...props}) => (
    <td className="px-6 py-4 text-gray-800 text-base" {...props} />
  ),

  // Enhanced lists
  ul: ({node, ...props}) => (
    <ul className="my-6 space-y-3 pl-6" {...props} />
  ),

  ol: ({node, ...props}) => (
    <ol className="my-6 space-y-3 pl-6" {...props} />
  ),

  li: ({node, ...props}) => (
    <li className="text-gray-800 text-lg leading-relaxed" {...props} />
  ),

  // Enhanced links
  a: ({node, href, children, ...props}) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        className="text-benefique-orange font-medium hover:underline transition-all"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && <span className="ml-1">↗</span>}
      </a>
    );
  },

  // Enhanced code blocks
  code: ({node, inline, className, children, ...props}) => {
    if (inline) {
      return (
        <code 
          className="bg-gray-100 text-benefique-orange px-2 py-1 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code 
        className="block bg-gray-900 text-gray-100 p-6 rounded-lg my-6 overflow-x-auto text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Horizontal rules
  hr: ({node, ...props}) => (
    <hr className="my-12 border-t-2 border-gray-300" {...props} />
  ),

  // Strong/bold text
  strong: ({node, ...props}) => (
    <strong className="font-bold text-benefique-navy" {...props} />
  ),
};

// Social share buttons
const SocialShare = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-4 py-6 border-y border-gray-200 my-8">
      <span className="text-gray-600 font-medium">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-benefique-orange transition"
        aria-label="Share on Twitter"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-benefique-orange transition"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="text-gray-600 hover:text-benefique-orange transition"
        aria-label="Share via Email"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
    </div>
  );
};

function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const post = blogPosts[slug];
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!post) {
      setError('Post not found');
      setLoading(false);
      return;
    }

    // Fetch the markdown file
    fetch(post.file)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load post');
        return response.text();
      })
      .then(text => {
        // Remove frontmatter (everything between --- and ---)
        const withoutFrontmatter = text.replace(/^---[\s\S]*?---\r?\n/, '');
        setContent(withoutFrontmatter);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setError('Failed to load post');
        setLoading(false);
      });
  }, [slug, post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h1>
          <p className="text-gray-600">{error}</p>
          <a href="/blog" className="text-benefique-orange hover:underline mt-4 inline-block">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Dynamic Meta Tags for SEO/GEO */}
      <Helmet>
        <title>{post.title} - Benefique Tax & Accounting</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://www.benefique.com/blog/${slug}`} />
        <meta property="og:image" content={`https://www.benefique.com${post.featuredImage}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://www.benefique.com${post.featuredImage}`} />
        
        {/* Schema (Article + FAQ) is handled by prerender.js to avoid duplicates */}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs for SEO */}
        <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-benefique-orange transition">Home</a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:text-benefique-orange transition">Blog</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-benefique-navy">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[21/9] bg-gradient-to-br from-benefique-navy to-blue-900 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-benefique-orange to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Featured image title overlay */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-benefique-orange/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                {post.categories[0]}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {post.title}
              </h1>
              <p className="text-xl text-blue-100 mb-6 drop-shadow">{post.excerpt}</p>
              <div className="flex items-center justify-center gap-4 text-blue-200 text-sm">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Article meta bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <a 
              href="/blog" 
              className="text-benefique-orange hover:underline font-medium transition"
            >
              ← Back to Blog
            </a>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{post.readTime}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="prose prose-lg max-w-none blog-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Social share */}
          <SocialShare title={post.title} url={currentUrl} />

          {/* Author bio */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-benefique-navy flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                GD
              </div>
              <div>
                <h3 className="text-xl font-bold text-benefique-navy mb-2">{post.author}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Gerrit is an Enrolled Agent and founder of Benefique Tax & Accounting, specializing in helping South Florida business owners with tax strategy, CFO services, and financial clarity.
                </p>
                <a 
                  href="/about" 
                  className="text-benefique-orange font-medium hover:underline transition"
                >
                  Learn more about Gerrit →
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-benefique-navy to-blue-900 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to talk about your situation?</h3>
            <p className="text-lg mb-6 text-blue-100">
              Let's discuss how these strategies apply to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 bg-benefique-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
              >
                Apply Now →
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition backdrop-blur-sm border border-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Related categories */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {post.categories.map(category => (
                <span 
                  key={category}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  );
}

export default BlogPost;
