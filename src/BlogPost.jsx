import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Blog post metadata and content mapping
const blogPosts = {
  'high-cost-procedure-economics-medical-practice': {
    file: '/content/blogs/high-cost-procedure-economics-medical-practice.md',
    title: '$2,940 Out the Door Before You Know If You\'ll Get Paid',
    date: '2026-03-29',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'We analyzed 418 high-cost procedures across five imaging centers. The drug costs $2,940 per dose. One payer reimbursed 239% of that. Another reimbursed 26%. Same drug, same scan, same staff. Twenty-one percent of paid encounters still lost money.',
    categories: ['Healthcare Finance', 'Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '9 min read',
    featuredImage: '/images/blog/high-cost-procedure-economics-medical-practice.jpg',
    faqs: [
      { q: 'Does this only apply to imaging centers?', a: 'No. Any practice or business that commits significant capital to inputs before knowing the reimbursement amount faces this exact dynamic. Infusion centers buying biologics, surgery centers purchasing implants, dental practices doing full-arch restorations, specialty pharmacies, even veterinary orthopedic practices — the math is identical.' },
      { q: 'Can we just stop accepting patients from low-paying payers?', a: 'Possibly, but it\'s rarely that simple. Contract obligations, network participation requirements, and referral relationships all factor in. The better approach is awareness: know your per-encounter margin by payer, manage your mix intentionally, and make scheduling decisions with full economic visibility.' },
      { q: 'What data do we need to run this analysis?', a: 'You likely already have it. You need procedure-level billing data with CPT codes, payer, and payment amounts; your input cost per procedure (drug cost, implant cost, supply cost); and your overhead allocation per encounter. Most practice management and billing systems contain the first two.' },
      { q: 'How often should we review per-encounter profitability?', a: 'Monthly at minimum, weekly if your specialty procedure volume exceeds 20 encounters per week. Payer contracts change. Drug costs shift. A payer that was profitable at last year\'s drug cost may not be profitable at this year\'s.' },
      { q: 'Is this something our current accountant should be doing?', a: 'Most accounting firms report revenue and expenses in aggregate. Per-encounter profitability analysis requires connecting billing data, supply costs, and overhead allocation at the procedure level — a different skill set than traditional bookkeeping or tax preparation.' }
    ]
  },
  'assembly-line-thinking-medical-practice-profitability': {
    file: '/content/blogs/assembly-line-thinking-medical-practice-profitability.md',
    title: 'The Factory That Didn\'t Know It Was Losing Money',
    date: '2026-03-29',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'We put a sign on the dashboard: Days Since Last Money-Losing Procedure. The number was 1. They had been warned 31 days earlier. Here is the framework we built to make it impossible to hide.',
    categories: ['Healthcare Finance', 'Cash Flow Advisory'],
    readTime: '7 min read',
    featuredImage: '/images/blog/assembly-line-thinking-medical-practice-profitability.jpg',
    faqs: [
      { q: 'What does assembly line thinking mean for a medical practice?', a: 'It means treating every procedure as a manufactured product with a known input cost, a known selling price (by payer), and a known margin. Just like a factory tracks cost of goods sold and margin per unit, your practice should track cost per encounter and net revenue per payer.' },
      { q: 'What is the difference between an operations scorecard and a collections scorecard?', a: 'Operations controls what goes on the assembly line — which procedures to perform, which payers to accept, which contracts to sign. Collections controls how fast the finished product comes off — claim submission speed, denial management, follow-up cadence. Both need separate grades.' },
      { q: 'What is a good DSO for a medical practice?', a: 'MGMA benchmarks suggest 30-40 days for most specialties. Best-in-class practices achieve 18-25 days. Every day of DSO improvement frees working capital equal to your daily procedure input cost.' },
      { q: 'How do you grade a medical practice A through F?', a: 'We score four dimensions for each team. Collections: DSO, clean claim rate, stale claim percentage, and collection yield. Operations: toxic payer rate, post-warning compliance, revenue per procedure, and volume. Each dimension is weighted and scored out of 100.' },
      { q: 'What is a Days Since Last Accident sign for healthcare?', a: 'Borrowed from manufacturing safety culture, it\'s a single visible number showing how many days since the practice last performed a procedure that lost money. When it resets to zero, everyone knows what happened. It creates accountability that reports buried in spreadsheets never achieve.' }
    ]
  },
  'toxic-payers-losing-money-medical-practice': {
    file: '/content/blogs/toxic-payers-losing-money-medical-practice.md',
    title: '7 Payers, 41 Procedures, $80,593 Lost',
    date: '2026-03-29',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'We graded every insurance payer A through F. Seven got F. They had been paid on 41 procedures and lost money on every single one. Your practice probably has the same problem — you just have not looked.',
    categories: ['Healthcare Finance', 'Cash Flow Advisory'],
    readTime: '6 min read',
    featuredImage: '/images/blog/toxic-payers-losing-money-medical-practice.jpg',
    faqs: [
      { q: 'How do I identify toxic payers in my practice?', a: 'Pull encounter-level data for the last 6-12 months. For each paid encounter, subtract your input cost from the amount collected. Any payer where the average net per encounter is below negative $500 is toxic — you\'re losing significant money every time you serve their patients.' },
      { q: 'Should I drop unprofitable insurance payers?', a: 'Not necessarily. First try renegotiating the contract with data showing the gap between your cost and their reimbursement. If renegotiation fails, consider limiting volume for expensive procedures rather than dropping the payer entirely. For commodity procedures where input costs are low, the same payer may still be profitable.' },
      { q: 'What is payer mix optimization?', a: 'It\'s the process of intentionally managing which insurance payers make up your patient volume. Rather than accepting all comers equally, you route scheduling and marketing toward payers that reimburse above your cost threshold and limit exposure to those that don\'t.' },
      { q: 'Can collections fix a bad payer contract?', a: 'No. If the contracted reimbursement rate is below your input cost, collecting 100% of the contracted amount still results in a loss. Collections can speed up payment and reduce denials, but it cannot change the underlying contract economics. That\'s an operations and contract negotiation problem.' },
      { q: 'How much does payer mix really affect profitability?', a: 'In our analysis, the spread between the best and worst payer was 9:1 on the same procedure. The best payer generated $4,082 in margin per encounter. The worst generated a $2,164 loss. That\'s a $6,246 swing on the same scan, same staff, same day.' }
    ]
  },
  'concierge-medicine-financial-model': {
    file: '/content/blogs/concierge-medicine-financial-model.md',
    title: 'Concierge Medicine Financial Model: P&L vs Cash Flow as You Grow',
    date: '2026-03-26',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A 200-member concierge practice shows $253K in net income. The bank account tells a different story. We built an interactive simulator that shows exactly where the money goes — and why you need 143 members to break even on cash, not 134.',
    categories: ['Concierge Medicine', 'Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '14 min read',
    featuredImage: '/images/blog/concierge-medicine-financial-model.jpg',
    faqs: [
      { q: 'How many patients do I need to break even in a concierge practice?', a: 'At a $350/month membership fee with South Florida operating costs ($19,750/month fixed), you need approximately 134 members to break even on the P&L and 143 members to break even on cash flow. These numbers change based on your fee, location, and physician salary.' },
      { q: 'What is the difference between P&L break-even and cash flow break-even?', a: 'P&L break-even is when revenue covers all operating expenses and physician salary. Cash flow break-even adds estimated taxes and debt service. A practice can be profitable on the income statement while the bank account is still shrinking.' },
      { q: 'How much does a concierge physician make in South Florida?', a: 'Total physician compensation in a South Florida concierge practice ranges from $430,000 to over $1,000,000 depending on fee structure and panel size. At the standard model (250 members, $350/month), total compensation is approximately $576,000 per year.' },
      { q: 'What are realistic operating costs for a concierge practice in 2026?', a: 'Our model uses $19,750/month in fixed operating costs for a South Florida concierge practice, including $4,500 for office lease, $8,200 for staff, $3,000 for outsourced accounting/tax/CFO services, and $2,100 for technology and marketing.' },
      { q: 'Should I choose DPC or traditional concierge?', a: 'DPC ($150-$200/month) requires a larger patient panel (288+ members) to break even because the contribution margin per member is lower. Traditional concierge ($350-$650/month) breaks even faster with fewer patients but targets a smaller market.' },
      { q: 'What is the contribution margin in concierge medicine?', a: 'At $350/month, the contribution margin is approximately $317 per member per month — meaning 90% of each additional membership dollar flows to the bottom line after variable costs.' }
    ]
  },
  'per-unit-pnl-multi-location-cost-analysis': {
    file: '/content/blogs/per-unit-pnl-multi-location-cost-analysis.md',
    title: 'Same Owner, Same Industry, 3x Cost Difference — What the P&L Can\'t Tell You',
    date: '2026-03-24',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Three imaging centers. Same owner. Same industry. One costs $109 per scan to operate. Another costs $309. Their P&L couldn\'t explain the difference. A per-unit analysis — dividing every cost category by every claim — exposed the gap in 20 minutes.',
    categories: ['Cash Flow Advisory', 'Healthcare Finance', 'Financial Intelligence'],
    readTime: '16 min read',
    featuredImage: '/images/blog/per-unit-pnl-multi-location-cost-analysis.jpg',
    faqs: [
      { q: 'What is a per-unit P&L analysis?', a: 'A per-unit P&L divides every cost category (payroll, marketing, maintenance, supplies, insurance) by every unit of output (patient visits, scans, claims, cases) at each location or service line. Instead of seeing total dollars, you see cost per claim — which normalizes for volume differences and reveals efficiency gaps between locations.' },
      { q: 'Why can\'t my standard P&L show per-unit costs?', a: 'Your P&L reports total dollars per entity. It doesn\'t connect to your operational data — how many patients you saw or claims you processed. That activity data lives in a separate system. Per-unit analysis requires connecting financial and operational databases, which is why most accounting firms don\'t perform it.' },
      { q: 'How is this different from breakeven analysis?', a: 'Breakeven analysis tells you the volume threshold where you cross from loss to profit. Per-unit analysis tells you what each unit of output actually costs to produce — broken down by cost category, compared across locations, and trended over time. They\'re complementary: breakeven tells you the target, per-unit tells you what\'s keeping you from hitting it.' },
      { q: 'What data do I need to run a per-unit analysis?', a: 'Two data sources: your financial data from QuickBooks (P&L by cost category, by location, by month) and your activity data from your practice management system (claims, visits, or cases per location per month). The analysis connects the two.' },
      { q: 'How often should I review per-unit costs?', a: 'Monthly. Per-unit costs shift as volume fluctuates, staff changes, and payer mix evolves. AI-powered monitoring can track these continuously and alert you when a cost category moves outside its normal range.' },
      { q: 'Can this work for a single-location practice?', a: 'Yes, but multiple locations amplify the power because you generate your own internal benchmark. Same owner, same systems, different results — the per-unit analysis pinpoints exactly where the gaps are.' }
    ]
  },
  'fixed-cost-breakeven-volume-problem': {
    file: '/content/blogs/fixed-cost-breakeven-volume-problem.md',
    title: 'Your Practice Doesn\'t Have a Profit Problem — It Has a Volume Problem',
    date: '2026-03-24',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Your accountant said you lost money. We said you need 70 more patients to never lose money again. Same QuickBooks data — different analysis. Here\'s how marrying financial and operational data reveals the exact volume threshold between loss and profit, and why cash flow breakeven is the number that actually matters.',
    categories: ['Cash Flow Advisory', 'Healthcare Finance', 'Financial Intelligence'],
    readTime: '14 min read',
    featuredImage: '/images/blog/breakeven-volume-analysis.jpg',
    faqs: [
      { q: 'What is fixed-cost breakeven analysis?', a: 'Fixed-cost breakeven analysis calculates the specific volume of patients, cases, or units your business needs to cover all fixed costs (rent, staff, equipment, insurance) for the month. Below this volume, you lose money regardless of how efficiently you operate. Above it, every additional unit contributes directly to profit at your full contribution margin.' },
      { q: 'What\'s the difference between P&L breakeven and cash flow breakeven?', a: 'P&L breakeven is the volume where revenue equals expenses on your income statement. Cash flow breakeven is the volume where cash inflows actually cover all cash outflows — including loan principal, owner draws, equipment payments, and the timing lag from accounts receivable. Cash flow breakeven is almost always higher.' },
      { q: 'Why is volume more effective than cost-cutting for profitability?', a: 'In a fixed-cost business, cutting $10,000 in costs reduces your breakeven by about 25 units. But adding 25 units generates $10,000 in additional contribution margin — the same financial impact — while preserving your capacity to grow further. Cost-cutting has a floor and often takes months. Volume growth can begin immediately.' },
      { q: 'How do I calculate breakeven for my medical practice?', a: 'Pull 6 months of P&L data from QuickBooks. Separate fixed costs from variable costs. Calculate your average revenue per patient visit and subtract the average variable cost to get your contribution margin. Divide total monthly fixed costs by the contribution margin. For cash flow breakeven, add loan principal payments and owner draws before dividing.' },
      { q: 'How often should I recalculate my breakeven point?', a: 'Monthly. Your breakeven number shifts as fixed costs change, variable costs shift, and revenue per unit moves. A breakeven number calculated in January can be 30-50 units off by July. AI-powered monitoring recalculates continuously against live data.' },
      { q: 'What utilization rate do I need to reach breakeven?', a: 'Most healthcare practices break even at 60-70% utilization of their existing capacity. If your staff and equipment can handle 1,000 patients per month and your breakeven is 661, you need 66% utilization — and you\'re already paying for 100% of the capacity.' }
    ]
  },
  'three-views-one-business': {
    file: '/content/blogs/three-views-one-business.md',
    title: 'Same Business, Three Verdicts: What Operators, Bankers, and Buyers See in Your Financials',
    date: '2026-03-22',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $3.8M imaging center was \'doing fine\' to the operator, \'fragile\' to a banker, and a \'distressed asset\' to a PE buyer. Same QuickBooks data, three verdicts. Here\'s what each lens reveals — and why most business owners only see one.',
    categories: ['Cash Flow Advisory', 'Fractional CFO', 'Financial Intelligence'],
    readTime: '15 min read',
    featuredImage: '/images/blog/three-views-one-business.jpg',
    faqs: [
      { q: 'What is the Rule of 40 and why do buyers use it?', a: 'The Rule of 40 combines your revenue growth rate and your EBITDA margin into a single score. A fast-growing company can afford thin margins, and a high-margin company can afford slower growth — but the sum should be at least 40. PE firms use it as a quick screening tool. A negative score is a red flag.' },
      { q: 'Can a business be profitable and still have negative equity?', a: 'Yes — negative equity means total liabilities exceed total assets on the balance sheet. In healthcare and equipment-heavy businesses, this is often driven by accelerated depreciation (Section 179, bonus depreciation) that reduces book value below actual market value. The business is operationally sound, but the balance sheet looks distressed.' },
      { q: 'What is the difference between DSCR and profitability?', a: 'Profitability (net income) includes non-cash charges like depreciation. DSCR uses EBITDA — which strips those out — because lenders care about cash, not accounting profits. A business can be unprofitable on the P&L while having excellent debt service coverage, as in our case study: ($13K) net loss but 3.32x DSCR.' },
      { q: 'Why does TTM vs run rate matter so much in valuations?', a: 'TTM reflects what actually happened over 12 months. Run rate annualizes recent performance. In a turnaround, TTM includes bad months and depresses valuation. Run rate reflects current trajectory. The difference can mean $1M+ in sale price — depending on which story the seller tells and the buyer believes.' },
      { q: 'Do I need all three financial views if I am not selling my business?', a: 'Yes. The banker\'s view tells you what to fix before you need financing. The buyer\'s view tells you what your business is worth right now, informing decisions about investment, growth, and succession. Knowing your Rule of 40 and DSCR goes beyond "am I profitable?" to "is my business structurally healthy?"' },
      { q: 'How often should operator banker and buyer views be updated?', a: 'We recommend quarterly for all three views. The operator dashboard should be monitored weekly or monthly. The banker\'s view matters most before financing events. The buyer\'s view is most valuable when tracked over 12-24 months, because buyers want to see trends, not snapshots.' }
    ]
  },
  'accountant-cost-center-roi-center': {
    file: '/content/blogs/accountant-cost-center-roi-center.md',
    title: 'Your Accountant Is a Cost Center. Here\'s What an ROI Center Looks Like.',
    date: '2026-03-22',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'We analyzed a multi-location healthcare group. Every location was extracting more cash than it could sustain. Two were \'profitable.\' All were bleeding cash. Here\'s what we found — and what we told them to do about it.',
    categories: ['Cash Flow Advisory', 'Fractional CFO', 'Financial Intelligence'],
    readTime: '16 min read',
    featuredImage: '/images/blog/accountant-cost-center-roi-center.jpg',
    faqs: [
      { q: 'What is the difference between a fractional CFO and a regular accountant?', a: 'A regular accountant handles compliance: tax returns, bookkeeping, financial statements. A fractional CFO adds a prescriptive layer: analyzing the same data to find actionable insights with dollar values. The accountant tells you what happened. The fractional CFO tells you what to do about it — and what it\'s worth.' },
      { q: 'How do I know if my business needs prescriptive financial intelligence?', a: 'If you\'ve ever been surprised by a cash shortfall, declined for a loan despite being profitable, or unsure what your business is worth — your current financial setup is descriptive, not prescriptive. Businesses above $500K in revenue with debt, multiple owners, or growth ambitions typically benefit.' },
      { q: 'Can my current accountant provide all three financial views?', a: 'Most accounting firms are structured for compliance work at scale. The three-view framework (operator, banker, buyer) requires deeper engagement: understanding your payer mix, vendor relationships, debt covenants, and growth trajectory. Ask the three questions in this article — their answers will tell you.' },
      { q: 'What is the distribution trap and how do I know if I am in it?', a: 'The distribution trap occurs when owner draws exceed sustainable operating cash flow. It doesn\'t show on the P&L because distributions are a balance sheet transaction. Compare your 12-month distributions to 12-month operating cash flow. If distributions exceed OCF, you\'re in the trap.' },
      { q: 'Is the purchaser view useful even if I never plan to sell?', a: 'Yes. The purchaser view measures whether you\'re building or destroying enterprise value. A declining Rule of 40 score means your business is worth less this year than last — regardless of whether you sell. Tracking this quarterly tells you if your decisions are creating wealth or consuming it.' },
      { q: 'How does AI factor into prescriptive financial analysis?', a: 'AI processes the data — pulling reports simultaneously, calculating metrics in seconds, flagging anomalies. What AI cannot do is interpret context: knowing that negative equity is driven by tax depreciation strategy, or that revenue decline is in one payer category while another grows. AI does the math. The accountant does the thinking.' }
    ]
  },
  'fixer-upper-or-walk-in-ready': {
    file: '/content/blogs/fixer-upper-or-walk-in-ready.md',
    title: 'Fixer Upper or Walk-In Ready? How to Prepare Your Business for Sale',
    date: '2026-03-22',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Every business owner thinks their company is walk-in ready. Then the buyer shows up with a home inspector. Here\'s what they find — and how a $5M asking price becomes a $1.5M offer.',
    categories: ['Cash Flow Advisory', 'Fractional CFO', 'Business Strategy'],
    readTime: '14 min read',
    featuredImage: '/images/blog/fixer-upper-or-walk-in-ready.jpg',
    faqs: [
      { q: 'How long does it take to prepare a business for sale?', a: 'Most financial defects take 6-12 months to fix and show up in trailing financials. DSCR improvements from debt restructuring appear in 90 days. Revenue trend improvements need 3+ consecutive quarters. Start at least 18 months before you want to go to market.' },
      { q: 'What EBITDA multiple should I expect for my business?', a: 'Healthcare services businesses typically sell at 3-6x EBITDA, depending on size, growth trajectory, payer mix, and owner dependency. Walk-in ready businesses with growing revenue and clean balance sheets command the top of the range. Fixer uppers get the bottom or earn-out structures.' },
      { q: 'What is the difference between an earn-out and cash at close?', a: 'Cash at close means the buyer pays full amount at closing. An earn-out means a portion is contingent on future performance, typically 12-24 months. Buyers use earn-outs when they see risk: declining revenue, owner dependency, or unproven trends.' },
      { q: 'Can I improve my business valuation without growing revenue?', a: 'Yes. Improving EBITDA margin, capping distributions to build reserves, cleaning up the balance sheet with an FMV asset schedule, and demonstrating trend stability all increase valuation independent of top-line growth.' },
      { q: 'What is the Rule of 40 and why do buyers use it?', a: 'The Rule of 40 combines revenue growth rate and EBITDA margin into a single score. Above 40 signals a healthy business. Below 20 is a yellow flag. Below zero is a red flag. PE firms use it as a screening tool — many won\'t look deeper at a business scoring below 20.' },
      { q: 'Should I hire a fractional CFO to prepare for exit?', a: 'If your current accountant can show you operator, banker, and buyer views with prescriptive action plans, you may not need one. If they can\'t answer what a banker would see in your balance sheet or name three changes worth specific dollars, the valuation gap is likely costing more than a CFO engagement.' }
    ]
  },
  'referring-doctor-relationship-myth-medical-imaging': {
    file: '/content/blogs/referring-doctor-relationship-myth-medical-imaging.md',
    title: 'The Relationship Myth: When Taking One For The Team Costs $142,000',
    date: '2026-04-05',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Every multi-location imaging center has a sacred cow: the high-volume referring doctor whose toxic-payer patients you absorb because you can\'t afford to lose the relationship. We tested that assumption with 433 encounters and $142,000 in data. Zero out of 21 doctors justified the losses.',
    categories: ['Healthcare Finance', 'Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '12 min read',
    featuredImage: '/images/blog/referring-doctor-relationship-myth-medical-imaging.jpg',
    faqs: [
      { q: 'How do I calculate referring doctor profitability?', a: 'For each referring doctor, sum the profit from their non-toxic-payer encounters and subtract the drug cost burned on their toxic-payer encounters. The result is the Net Relationship Value. If negative, the doctor\'s referral volume doesn\'t justify absorbing the toxic losses. The calculation requires three data points per encounter: the referring doctor\'s name, the payer, and the margin (reimbursement minus cost including consumables).' },
      { q: 'Will blocking a toxic payer cause us to lose referring doctors?', a: 'No. Blocking a payer is an insurance policy decision, not a relationship decision. The referring doctor can still send patients with any other insurance. The doctor doesn\'t choose the patient\'s insurance plan. In our analysis of 433 encounters, no referring doctor exclusively sent toxic-payer patients \u2014 the toxic patients were scattered across the referring base.' },
      { q: 'What is a toxic payer in medical imaging?', a: 'A toxic payer is any insurance company that reimburses below the cost of the procedure\'s primary consumable \u2014 in PET imaging, that\'s the radiotracer drug ($2,800-$6,500 per dose). When a toxic payer\'s reimbursement doesn\'t cover the drug cost alone, the practice loses money on every scan regardless of efficiency or volume.' },
      { q: 'How often should we run a referral profitability analysis?', a: 'Monthly, after encounter data is complete for the prior month. The analysis takes minutes once data collection is clean. The critical prerequisite is capturing the referring doctor\'s name at scheduling for every encounter \u2014 without this, the analysis has gaps.' },
      { q: 'Does this framework apply outside of radiology?', a: 'Yes. Any practice where a single procedure requires an expensive consumable \u2014 specialty drugs, implants, surgical supplies \u2014 faces the same economics. Surgery centers, oncology infusion centers, specialty pharmacies, and wound care centers all have toxic payer risk. The per-referrer P&L framework works identically.' }
    ]
  },
  'ebitda-positive-cash-flow-negative-debt-service': {
    file: '/content/blogs/ebitda-positive-cash-flow-negative-debt-service.md',
    title: 'EBITDA Positive, Cash Flow Negative \u2014 A $16M Case Study',
    date: '2026-04-03',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Five locations. $16.7M in revenue. $332K in EBITDA. Looks like a functional business \u2014 until you subtract the $365K in annual interest. The group literally cannot pay its lenders from operations.',
    categories: ['Cash Flow', 'Financial Intelligence'],
    readTime: '16 min read',
    featuredImage: '/images/blog/ebitda-positive-cash-flow-negative-debt-service.jpg',
    faqs: [
      { q: 'Can a business be EBITDA-positive and still not be able to pay its debt?', a: 'Yes. EBITDA adds back interest expense, so by definition it will always be higher than net income for any business with debt. If your EBITDA is lower than your annual interest expense, your debt service coverage ratio is below 1.0 \u2014 meaning operations do not generate enough to cover the cost of your debt.' },
      { q: 'What is a good debt service coverage ratio for a small business?', a: 'The SBA requires a minimum of 1.15x for 7(a) loan approval. Most commercial banks want 1.25x or higher. A DSCR of 2.0x or above is considered strong and gives the business room for unexpected expenses, revenue dips, or growth investment.' },
      { q: 'Where do I find my interest expense in QuickBooks?', a: 'Run a Profit & Loss report for the trailing twelve months. Interest expense typically appears under Other Expenses at the bottom of the P&L, below operating income. If you have multiple loans, QBO may break them into separate interest accounts. Add them all together.' },
      { q: 'What happens if my DSCR falls below a loan covenant?', a: 'The lender can declare a technical default. This does not always mean the loan is called immediately, but it gives the lender the right to restrict additional borrowing, require accelerated payments, demand additional collateral, or renegotiate terms.' },
      { q: 'Is EBITDA a reliable measure of business health?', a: 'For comparing operating performance across companies with different capital structures, EBITDA has a role. For determining whether your specific business can pay its bills, EBITDA is unreliable because it excludes the single largest cash obligation most businesses have \u2014 debt service.' },
      { q: 'Can I calculate DSCR on cash basis books?', a: 'You can run the formula, but the result may be dangerously misleading. Cash basis accounting does not show unpaid obligations \u2014 supplier invoices, accrued expenses, deferred revenue. Accrual basis with a current AP system is the minimum requirement for any DSCR calculation to reflect economic reality.' },
      { q: 'What is the difference between EBITDA-based DSCR and OCF-based DSCR?', a: 'EBITDA-based DSCR ignores working capital changes \u2014 it assumes you collect everything you bill and pay everything on schedule. OCF-based DSCR adjusts for real movements in receivables, payables, and other working capital. OCF-based DSCR is always more conservative and usually lower.' }
    ]
  },
  'concierge-medical-fees-tax-deductible': {
    file: '/content/blogs/concierge-medical-fees-tax-deductible.md',
    title: 'Are Concierge Medicine Fees Tax Deductible? IRS Rules for 2026',
    date: '2026-04-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Short answer: partially. The annual retainer is not deductible, but the medical services portion is \u2014 subject to the 7.5% AGI floor. We cover patients, self-employed, HSA eligibility, MDVIP/DPC plans, and the corporate concierge strategy that makes 100% deductible.',
    categories: ['Concierge Medicine', 'Tax Planning', 'Healthcare Finance'],
    readTime: '18 min read',
    featuredImage: '/images/blog/cost-starting-concierge-practice.svg',
    faqs: [
      { q: 'Are concierge doctor fees tax deductible?', a: 'Partially. The portion of a concierge retainer allocable to actual medical services (annual physical, screenings, specific visits) qualifies as a medical expense under IRC Section 213(d). Access and convenience fees (shorter wait times, 24/7 phone access) do not qualify. The deduction is subject to the 7.5% AGI floor and requires itemizing.' },
      { q: 'Are MDVIP fees tax deductible?', a: 'Partially. MDVIP fees run $2,400 to $4,800 per year and bundle both medical services and access fees. MDVIP does not issue a formal allocation letter, so you estimate \u2014 typically 60\u201370% for medical services, 30\u201340% for access and convenience. On a $3,600 membership, roughly $2,340 is potentially deductible under IRC Section 213(d), subject to the 7.5% AGI floor and itemization test.' },
      { q: 'Can I deduct my concierge doctor\'s fee on my tax return?', a: 'Yes, the medical services portion \u2014 but there are three conditions. Your physician must confirm in writing what portion goes to actual medical care. Your total medical expenses must exceed 7.5% of AGI. And your total itemized deductions must exceed the standard deduction. For many patients the answer is technically yes but practically zero. Run the math.' },
      { q: 'Are DPC fees tax deductible?', a: 'DPC monthly fees are subject to the same IRC Section 213(d) rules as concierge fees. They are not insurance premiums, so they cannot use the Section 162(l) above-the-line deduction. They land on Schedule A as itemized medical expenses, subject to the 7.5% AGI floor. The allocation argument is stronger for DPC since the fee is structured around care delivery. Proposed Treasury regulations (REG-109755-19) remain unfinalized as of April 2026.' },
      { q: 'Is concierge medicine an HSA-eligible expense?', a: 'The medical services portion is HSA-eligible. Membership and access fees are not. The bigger risk: if proposed Treasury regulations on concierge and DPC arrangements are finalized, enrollment could disqualify you from making HSA contributions entirely. Not current law \u2014 but worth monitoring if HSA contributions are part of your tax strategy.' },
      { q: 'Can my business pay for my concierge membership?', a: 'Yes \u2014 and this is the most tax-efficient approach. When structured through a MERP, HRA, or QSEHRA, your business deducts the full cost under Section 162 with no AGI floor. You receive the benefit tax-free under Sections 105 and 106. C-Corps get the cleanest treatment. S-Corp owners with 2%+ ownership have it run through W-2 wages. Small employers can use a QSEHRA (2026 limits: $6,350 individual / $12,800 family). Section 105(h) nondiscrimination rules apply.' },
      { q: 'Can I use my HSA to pay for concierge medicine?', a: 'Only for the portion covering actual medical services. The membership/access fee component is not HSA-eligible. Additionally, if IRS proposed regulations (REG-109755-19) are finalized, DPC/concierge arrangements may disqualify you from HSA contributions entirely.' },
      { q: 'Can an employer deduct concierge medicine as a business expense?', a: 'Yes. Employer payments for employee concierge medicine qualify as business expenses under Section 162. When structured through a Section 105 MERP or HRA, the benefit is tax-free to employees and fully deductible to the employer. Small employers can use a QSEHRA within annual limits.' },
      { q: 'Are concierge fees deductible for self-employed individuals?', a: 'Concierge retainer fees are NOT insurance premiums and do not qualify for the self-employed health insurance deduction under Section 162(l). They are only deductible as an itemized medical expense on Schedule A, subject to the 7.5% AGI floor.' }
    ]
  },
  'how-to-start-concierge-medical-practice': {
    file: '/content/blogs/how-to-start-concierge-medical-practice.md',
    title: 'How to Start a Concierge Medical Practice: The Financial Roadmap (2026)',
    date: '2026-03-17',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Entity formation, S-Corp election, 200-patient panel \u2014 every step from $0 to $500K+ net income. Includes the corporate B2B concierge play worth $50K\u2013$200K/year that most physician consultants skip entirely.',
    categories: ['Concierge Medicine', 'Practice Startup', 'Healthcare Finance'],
    readTime: '24 min read',
    featuredImage: '/images/blog/concierge-medicine-income-south-florida.svg',
    faqs: [
      { q: 'How do I start a concierge medical practice?', a: 'Start with these steps: choose your model (concierge vs DPC vs hybrid), form a Florida PLLC with S-Corp election, set up financial infrastructure (QBO, payroll, retirement plan), secure office space, choose your technology stack, staff your practice, and build your patient panel. Most solo practices launch for $100K-$175K in South Florida.' },
      { q: 'How much does it cost to start a concierge medical practice?', a: 'Total startup costs range from $75,000 to $200,000 depending on whether you are converting an existing practice or building from scratch. This includes entity formation, office buildout, equipment, EHR, marketing, and 3-6 months of operating reserves.' },
      { q: 'How long does it take to build a concierge patient panel?', a: 'Converting an existing practice: 6-12 months to breakeven, 12-24 months to target income. Starting from scratch: 12-18 months to breakeven. Joining an established network like MDVIP: 3-6 months. Corporate B2B contracts can accelerate panel fill significantly.' },
      { q: 'What is the best entity structure for a concierge medical practice?', a: 'A Florida PLLC with S-Corp tax election is optimal for most concierge physicians. At $500K+ in net income, the S-Corp saves $15K-$25K per year in self-employment taxes. File IRS Form 2553 within 75 days of formation or by March 15.' }
    ]
  },
  'why-banker-asks-personal-tax-return': {
    file: '/content/blogs/why-banker-asks-personal-tax-return.md',
    title: 'Why Your Banker Asked for Your Personal Tax Return (And What They\'re Really Looking For)',
    date: '2026-03-13',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'You applied for a business loan. The bank asked for your personal tax return, your personal financial statement, and two years of K-1s. Here\'s what they\'re actually evaluating \u2014 and the three personal risks that kill business loan applications.',
    categories: ['Cash Flow Advisory', 'Business Strategy', 'Financial Intelligence'],
    readTime: '11 min read',
    featuredImage: '/images/blog/why-banker-asks-personal-tax-return.jpg',
    faqs: [
      { q: 'Why does the bank need my personal tax return for a business loan?', a: 'The bank evaluates the owner as a credit risk to the business. Your personal tax return reveals your total income sources, estimated tax obligations that may consume business cash, whether your draws align with reported income, and your personal debt load.' },
      { q: 'What does a bank look for on a personal financial statement?', a: 'Banks evaluate four things: total personal debt load and monthly obligations, net worth (assets minus liabilities), income sources beyond the business, and the gap between documented income and actual expenses.' },
      { q: 'Can my personal debt affect my business loan application?', a: 'Yes. High personal debt creates extraction risk \u2014 the bank\'s concern that you\'ll pull excess cash from the business to service personal obligations rather than using loan proceeds for business growth. A personal debt-to-income ratio above 43% is a red flag.' },
      { q: 'Do I need a personal guarantee for an SBA loan?', a: 'Yes. The SBA requires personal guarantees from any individual owning 20% or more of the business. The guarantee means your personal assets serve as secondary collateral if the business defaults.' },
      { q: 'What are unrecorded liabilities in a loan application?', a: 'Unrecorded liabilities are obligations not on the business balance sheet but that will consume cash. The most common: estimated tax obligations from K-1 pass-through income, personal guarantees on other entities\' debts, pending legal settlements, and IRS installment agreements.' },
      { q: 'How do I prepare my personal finances before applying for a business loan?', a: 'Start 30-60 days before: pull your credit report and dispute errors, complete a personal financial statement (SBA Form 413), calculate and fund your estimated tax obligation, document all income sources, and align your draws to a consistent monthly pattern.' }
    ]
  },
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
  'cash-flow-breakeven-per-patient-activity-units': {
    file: '/content/blogs/cash-flow-breakeven-per-patient-activity-units.md',
    title: 'Your Practice Is Profitable — So Why Do You Need 922 Patients Just to Break Even on Cash?',
    date: '2026-03-24',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'An imaging center earned over $1M in EBITDA. P\'L break-even: 702 claims. Cash flow break-even: 922 claims. The 220-claim gap is where the money vanishes — consumed by debt service and distributions that never appear on the income statement. This analysis used to cost $15,000-$50,000. AI changed the math.',
    categories: ['Cash Flow Advisory', 'Healthcare Finance', 'Financial Intelligence'],
    readTime: '14 min read',
    featuredImage: '/images/blog/cash-flow-breakeven-per-patient.jpg',
    faqs: [
      { q: 'What is cash flow break-even vs. P&L break-even?', a: 'P&L break-even is the patient volume where revenue covers operating expenses — rent, payroll, supplies, insurance. Cash flow break-even adds debt payments, owner draws, estimated tax payments, and working capital needs. It\'s the volume where your bank account actually starts growing. For most practices with debt and distributions, cash flow break-even is 15-40% higher than P&L break-even.' },
      { q: 'How do I calculate my break-even in patients (not dollars)?', a: 'Divide your monthly fixed costs by your contribution per patient. Contribution per patient equals average revenue per patient minus variable cost per patient. For P&L break-even, the numerator is fixed operating expenses. For cash flow break-even, add debt service and average monthly distributions to the numerator.' },
      { q: 'Why is my practice profitable but my bank account isn\'t growing?', a: 'Because profit and cash are not the same thing. Debt service principal, owner distributions, estimated tax payments, and growing accounts receivable all consume cash without appearing on the income statement. If your volume is between your P&L break-even and your cash flow break-even, you\'re profitable AND losing cash simultaneously.' },
      { q: 'How much does a cash flow break-even analysis cost?', a: 'Traditional consulting engagements for this level of per-unit financial modeling run $15,000-$50,000 and take 4-8 weeks to deliver. AI-powered analysis using live QBO data produces the same analytical depth in minutes at a fraction of the cost.' },
      { q: 'What data do I need to calculate my break-even in activity units?', a: 'Two data sources: monthly revenue and expenses from your accounting system going back at least 12 months, and a count of your activity units — patients seen, claims billed, procedures performed — from your practice management or billing system.' }
    ]
  },
  'cash-flow-waterfall-why-profit-doesnt-equal-cash': {
    file: '/content/blogs/cash-flow-waterfall-why-profit-doesnt-equal-cash.md',
    title: '$454K Profit, $147K Cash Deficit: The Waterfall That Explains Everything',
    date: '2026-03-13',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $6M business earned $454K in profit but ended up $147K in the hole. Partner draws, debt service, and working capital consumed it all. The P&L never showed it. The cash flow waterfall did.',
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
    title: 'Not Tracking WIP? Your P&L Is Lying to You',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: '$45K in labor sitting unbilled and invisible \u2014 not on the P&L, not on the balance sheet. Here\'s why service businesses that skip WIP tracking make decisions on fictional numbers.',
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
    title: '5 Ways to Reduce DSO in 30 Days Without Losing Clients',
    date: '2026-03-03',
    author: 'Benefique Tax & Accounting',
    excerpt: 'The average small business has $84,000 in unpaid invoices. These 5 strategies cut collection time without damaging relationships \u2014 most see results within 30 days. Includes the email template that works.',
    categories: ['Cash Flow Advisory', 'Accounts Receivable'],
    readTime: '10 min read',
    featuredImage: '/images/blog/dso-unpaid-invoices.jpg'
  },
  'real-time-financial-dashboards-healthcare-practices': {
    file: '/content/blogs/real-time-financial-dashboards-healthcare-practices.md',
    title: '10 KPIs Every Healthcare Practice Should Track Daily (Not Monthly)',
    date: '2026-03-05',
    author: 'Benefique Tax & Accounting',
    excerpt: 'Collection rate, AR aging, overhead ratio, DSO, cash runway \u2014 these 10 KPIs should update daily, not monthly. With specific benchmarks for dental, radiology, and physician practices so you know exactly where your numbers should be.',
    categories: ['Cash Flow Advisory', 'Healthcare Finance', 'Financial Intelligence'],
    readTime: '11 min read',
    featuredImage: '/images/blog/proactive-cash-flow-monitoring.jpg'
  },
  'how-to-calculate-cash-conversion-cycle': {
    file: '/content/blogs/how-to-calculate-cash-conversion-cycle.md',
    title: 'Cash Conversion Cycle: How to Calculate CCC for Service Businesses',
    date: '2026-03-04',
    author: 'Benefique Tax & Accounting',
    excerpt: 'The Cash Conversion Cycle tells you how many days cash is trapped between paying expenses and collecting revenue. For service businesses: CCC = DSO - DPO. Calculate yours in 5 minutes from QuickBooks.',
    categories: ['Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '9 min read',
    featuredImage: '/images/blog/cash-conversion-cycle-calculation.jpg'
  },
  'ai-cash-flow-forecasting-small-business': {
    file: '/content/blogs/ai-cash-flow-forecasting-small-business.md',
    title: 'AI Cash Flow Forecasting for Small Business: How It Actually Works',
    date: '2026-03-14',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'We ran AI on real QuickBooks data and found $353K trapped in receivables and a $147K cash deficit hiding behind a profitable P&L. Here\'s how AI cash flow forecasting works for small businesses, what it catches that spreadsheets miss, and whether it\'s worth it.',
    categories: ['Cash Flow Advisory', 'AI Accounting', 'Financial Intelligence'],
    readTime: '18 min read',
    featuredImage: '/images/blog/ai-cash-flow-forecasting-dashboard.jpg',
    faqs: [
      { q: 'What is AI cash flow forecasting?', a: 'AI cash flow forecasting uses machine learning to analyze your historical financial data — transaction patterns, client payment behavior, seasonal trends, and recurring expenses — and project your future cash position 30, 60, or 90 days ahead. Unlike spreadsheet forecasts that rely on assumptions, AI models learn from actual patterns in your data and update continuously.' },
      { q: 'How accurate is AI cash flow forecasting compared to spreadsheets?', a: 'AI reduces cash flow forecasting errors by 20-50% compared to manual spreadsheet methods, according to DataRobot research. AI processes hundreds of variables simultaneously, updates continuously rather than monthly, and learns from actual payment behavior patterns rather than stated terms.' },
      { q: 'Do I need to buy AI software to get cash flow forecasting?', a: 'No. A growing number of accounting firms use AI-powered tools as part of their advisory service. Your accountant runs the analysis on your existing QuickBooks or Xero data and delivers insights through dashboards and proactive alerts. You don\'t need to purchase, learn, or maintain any software.' },
      { q: 'Can AI predict a cash shortfall before it happens?', a: 'Yes. AI cash flow forecasting can typically identify potential shortfalls 2-4 weeks before they hit, based on the gap between projected inflows and committed outflows. This early warning gives business owners time to accelerate collections, delay discretionary spending, or arrange a credit line.' },
      { q: 'How do accountants use AI for cash flow management?', a: 'Accountants use AI to monitor financial data continuously rather than reviewing it once a month. The AI handles data processing — pulling transactions, analyzing payment patterns, projecting cash positions, and flagging anomalies. The accountant interprets results, adds business context, and advises on specific actions.' },
      { q: 'Is AI cash flow forecasting worth it for a small business under $2 million in revenue?', a: 'Cash flow timing matters more for smaller businesses, not less. A $1.5M healthcare practice with a 60-day DSO has roughly $247,000 locked in receivables at any time. A single client paying 30 days late can create a payroll crisis. If you\'ve ever been surprised by a cash shortfall, AI forecasting addresses exactly that problem.' },
      { q: 'What QuickBooks reports does AI cash flow forecasting use?', a: 'AI pulls directly from QuickBooks Online via API — Profit & Loss, Balance Sheet, AR Aging, AP Aging, and General Ledger transaction detail. It processes all of this simultaneously to build a complete picture of your cash cycle. You don\'t need to export or prepare anything.' },
      { q: 'How is AI cash flow forecasting different from QuickBooks cash flow reports?', a: 'QuickBooks generates a Statement of Cash Flows showing what already happened. AI cash flow forecasting looks forward — using patterns in your historical data to project where your cash position is heading 30, 60, and 90 days from now, and flags specific risks before they become problems.' },
      { q: 'Can a South Florida small business get AI cash flow forecasting without enterprise software?', a: 'Yes. Enterprise AI tools from Oracle, SAP, and Kyriba are built for corporations with six-figure software budgets. Small businesses across Broward County can access the same analytical capability through an accounting firm that uses AI-powered tools as part of its advisory service. No software to buy, no dashboards to learn.' }
    ]
  },
  'why-monthly-reports-too-late': {
    file: '/content/blogs/why-monthly-reports-too-late.md',
    title: 'Why Monthly Financial Reports Are Already Too Late',
    date: '2026-03-03',
    author: 'Benefique Tax & Accounting',
    excerpt: 'By the time your accountant sends last month\'s P&L, the cash problem it reveals has been compounding for 30 days. One client discovered a $41K cash drain that a monthly report caught 3 weeks too late. Here\'s what real-time visibility looks like instead.',
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
    title: 'How Much Do Concierge Doctors Make in South Florida? (2026 Data)',
    date: '2026-03-07',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Concierge physicians in South Florida net $500K\u2013$1M+ with 200\u2013500 patients instead of 2,500. We break down revenue models, overhead, S-Corp tax savings of $17K\u2013$35K/year, and retirement strategies sheltering $200K\u2013$400K annually.',
    categories: ['Concierge Medicine', 'Physician Finance', 'Tax Strategy'],
    readTime: '16 min read',
    featuredImage: '/images/blog/concierge-medicine-income-south-florida.svg',
    faqs: [
      { q: 'How much does a concierge doctor make in Florida?', a: 'Concierge physicians in South Florida typically earn $500,000 to $1,000,000+ in net income, compared to $280,000\u2013$300,000 for insurance-based primary care (Medscape 2025). Income depends on membership fee ($2,000\u2013$15,000/year), panel size (200\u2013500 patients), and overhead structure.' },
      { q: 'What is the average membership fee for concierge medicine?', a: 'Concierge fees typically range from $2,000 to $15,000 per year. In Weston and Parkland, $5,000\u2013$10,000 is common. MDVIP practices charge $2,400\u2013$4,800/year. DPC practices use lower monthly fees of $75\u2013$200 but do not bill insurance.' },
      { q: 'Is concierge medicine profitable?', a: 'Yes. Concierge practices achieve 40%\u201355% overhead ratios compared to 60%\u201370% for insurance-based practices. A solo physician with 350 patients at $5,000/year generates $1.75M in revenue with approximately $980,000 in net income.' },
      { q: 'What are the tax advantages of a concierge practice?', a: 'S-Corp election saves $17,000\u2013$35,000/year in self-employment taxes. Retirement plan stacking with a Cash Balance Plan can shelter $200,000\u2013$400,000 annually. Combined with proper entity structuring, effective tax rates drop from 37% to under 25%.' },
      { q: 'How long does it take to build a concierge patient panel?', a: 'Converting an existing practice: 6\u201312 months to breakeven, 12\u201324 months to target income. Starting from scratch: 12\u201318 months to breakeven. Joining MDVIP or similar network: 3\u20136 months.' }
    ]
  },
  'cost-starting-concierge-medical-practice': {
    file: '/content/blogs/cost-starting-concierge-medical-practice.md',
    title: 'Cost to Start a Concierge Medical Practice: $75K\u2013$200K Breakdown (2026)',
    date: '2026-03-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Every dollar from $75K to $200K: entity setup, office buildout, EHR, staffing, marketing, and the $19,750/mo in fixed costs before your first patient walks in. Plus the S-Corp election timing most consultants forget.',
    categories: ['Concierge Medicine', 'Practice Startup', 'Tax Planning'],
    readTime: '22 min read',
    featuredImage: '/images/blog/cost-starting-concierge-practice.svg',
    faqs: [
      { q: 'How much does it cost to start a concierge medical practice?', a: 'Most solo concierge practices in Broward County launch for $100,000-$175,000 in total startup capital, including entity formation, office buildout, equipment, EHR, marketing, and 3-6 months of operating reserves. Physicians converting an existing practice spend significantly less.' },
      { q: 'What entity structure should a concierge physician use?', a: 'Most concierge physicians should form a Florida PLLC with S-Corp tax election. At $500,000+ in net income, the S-Corp election saves $15,000-$25,000 per year in self-employment taxes. The election must be filed within 75 days of entity formation or by March 15.' },
      { q: 'How long does it take for a concierge practice to break even?', a: 'Converting an existing practice takes 6-12 months to break even and 12-24 months to reach target income. Starting a new concierge practice with no patient base takes 12-18 months to break even. Joining an established network like MDVIP can reach breakeven in 3-6 months.' },
      { q: 'How much does concierge medical practice setup cost with consulting services?', a: 'Consulting services for concierge practice setup typically cost $5,000-$25,000 depending on scope. This includes business plan development, financial modeling, entity formation guidance, payer contract exit strategy, and marketing launch support. Many physicians skip this and make structural mistakes that cost far more over time.' },
      { q: 'What is the typical ROI for a concierge medicine practice in the first year?', a: 'First-year ROI depends on your starting point. Physicians converting an existing panel can reach profitability in 6-12 months with ROI of 50-100% on startup investment by year two. New practices without an existing patient base typically break even in 12-18 months, with positive ROI by month 18-24.' },
      { q: 'Are concierge medical fees tax deductible?', a: 'Partially. The portion of a concierge retainer that pays for actual medical services (annual physical, screenings, specific visits) qualifies as a medical expense under IRC Section 213. Access or convenience fees do not. The deduction is subject to the 7.5% AGI floor and requires itemizing. See our detailed guide on concierge medicine tax deductibility.' },
      { q: 'Can a company offer concierge medicine as an employee benefit?', a: 'Yes. Employers can deduct concierge medicine costs as a business expense under Section 162. When structured through a Section 105 Medical Expense Reimbursement Plan or HRA, the benefit is tax-free to employees and deductible to the employer. Companies like Amazon, Apple, and Microsoft already offer corporate concierge health programs.' }
    ]
  },
  'concierge-medicine-vs-insurance-practice-financial-comparison': {
    file: '/content/blogs/concierge-medicine-vs-insurance-practice-financial-comparison.md',
    title: 'Concierge vs Insurance Practice: $550K\u2013$1.2M vs $240K\u2013$400K (Full Comparison)',
    date: '2026-03-09',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Solo concierge: $550K\u2013$1.2M net, 6\u201312 patients/day. Insurance-based: $240K\u2013$400K, 20\u201330 patients/day. Side-by-side comparison of revenue, overhead, quality of life, transition costs, and tax implications for all four models.',
    categories: ['Concierge Medicine', 'Physician Finance', 'Practice Models'],
    readTime: '18 min read',
    featuredImage: '/images/blog/concierge-vs-insurance-comparison.svg',
    faqs: [
      { q: 'What is the income difference between concierge and insurance-based practice?', a: 'Insurance-based primary care nets $240,000\u2013$400,000 after 60\u201370% overhead. Concierge practices net $550,000\u2013$1.2M after 40\u201355% overhead. The difference comes from higher per-patient revenue, lower billing costs, and a smaller, more predictable patient panel.' },
      { q: 'How much does a concierge practice save on overhead?', a: '$232,000\u2013$452,000 per year. The biggest savings come from eliminating billing staff ($65K\u2013$160K), claims processing ($12K\u2013$27K), and denials/write-offs ($70K\u2013$200K). Traditional practices spend $180,000\u2013$400,000 annually on billing infrastructure that concierge practices eliminate.' },
      { q: 'What is the burnout rate for concierge vs traditional physicians?', a: 'Insurance-based physicians report burnout at 43\u201349% (AMA 2024; Medscape 2024). Concierge physicians report rates under 15%. Concierge doctors work 1,400\u20132,000 hours per year versus 2,200\u20132,600, see 6\u201312 patients daily versus 20\u201330, and take 4\u20136 weeks vacation versus 2\u20133.' },
      { q: 'How long does the transition from insurance to concierge take?', a: 'Converting an existing practice: 6\u201312 months to breakeven, 12\u201324 months to target income. Starting fresh: 12\u201318 months. Plan for $150,000\u2013$540,000 in reserves. Joining MDVIP or similar network accelerates to 3\u20136 months.' },
      { q: 'Is concierge medicine sustainable long-term?', a: 'The model has grown consistently for 20+ years. Demand is structural \u2014 aging population, dissatisfaction with insurance-based care, willingness to pay for access. Retention rates of 90\u201395% indicate patients who join tend to stay.' }
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
  'concierge-doctor-300-patient-panel-income': {
    file: '/content/blogs/concierge-doctor-300-patient-panel-income.md',
    title: 'How Concierge Doctors Clear $400K+ With a 300-Patient Panel',
    date: '2026-04-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: '300 patients. $350/month. $1.26M in annual revenue. After $19,750/month in overhead, S-Corp tax savings, and a Cash Balance Plan sheltering $200K \u2014 your take-home clears $430K. Here is every dollar, step by step.',
    categories: ['Concierge Medicine', 'Physician Finance', 'Tax Strategy'],
    readTime: '14 min read',
    featuredImage: '/images/blog/concierge-doctor-300-patient-panel-income.jpg',
    faqs: [
      { q: 'How many patients do I need to break even in a concierge practice?', a: 'There are three break-evens. P&L break-even is approximately 170 patients \u2014 revenue covers operating expenses but not your salary. Cash flow break-even is approximately 215 patients, covering overhead plus a $200,000 W-2 salary and taxes. Lifestyle break-even is approximately 250 patients, which adds retirement contributions and operating reserves.' },
      { q: 'What is the take-home income for a 300-patient concierge practice at $350/month?', a: 'At $350/month with 300 patients, gross revenue is $1.26M. After $356,000 in overhead (fixed and variable), EBITDA is $904,000. After W-2 salary, payroll taxes, Cash Balance Plan contributions, and estimated taxes, take-home is approximately $424,000 per year.' },
      { q: 'How long does it take to build a 300-patient concierge panel?', a: 'From zero, plan 18 to 30 months. Physicians converting an existing patient base can reach 300 patients in 6 to 12 months. Cold launches in a new market take longer. A realistic growth rate after launch is 10 to 15 new patients per month.' },
      { q: 'How much does an S-Corp save a concierge physician?', a: 'Compared to a sole proprietorship, an S-Corp election typically saves $17,000 to $25,000 per year in self-employment taxes on a $900,000+ EBITDA. The savings come from paying FICA taxes only on the W-2 salary, not on S-Corp distributions.' },
      { q: 'What is a Cash Balance Plan and how much can a physician contribute?', a: 'A Cash Balance Plan is a defined-benefit retirement plan under IRC Section 401(a) that allows contributions far exceeding standard 401(k) limits. At age 45, a physician can typically contribute $150,000\u2013$180,000 annually. At age 52, contributions approach $250,000. Every dollar is tax-deductible, reducing taxable income dollar-for-dollar.' }
    ]
  },
  'ai-cfo-analysis': {
    file: '/content/blogs/ai-cfo-analysis.md',
    title: 'What AI CFO Analysis Actually Looks Like (28 Pages, 14 Charts, 30 Seconds)',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Not ChatGPT. Here\'s what happens when AI turns 7 months of QuickBooks data into a 28-page CFO report with 14 charts — and finds $353K in trapped cash nobody knew about. The full process, step by step.',
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
    title: 'AI Found $353K Trapped in This Firm\'s QuickBooks — Here\'s How',
    date: '2026-03-12',
    author: 'Gerrit Disbergen, EA',
    excerpt: '$353K in slow-paying receivables, a bank balance overstating real cash by $900K, and partner draws exceeding a $1.58M windfall. All hiding in plain sight in QuickBooks. Nobody found it until AI did.',
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
  },
  'ai-cash-flow-waterfall-explained': {
    file: '/content/blogs/ai-cash-flow-waterfall-explained.md',
    title: 'How AI Found That $1M in Profit Left Zero Cash in the Bank',
    date: '2026-03-18',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $5M imaging center earned $1.07M in EBITDA but its bank account shrank by $41K. Here is exactly where that million dollars went — broken down by the AI that found it.',
    categories: ['Cash Flow', 'Healthcare Finance'],
    readTime: '12 min read',
    featuredImage: '/images/blog/ai-cash-flow-waterfall-explained.jpg',
    faqs: [
      { q: 'Why am I profitable but have no cash?', a: 'Because profit is an accounting measure on the P&L. Cash flow includes debt payments, owner distributions, and working capital changes that don\'t appear on the income statement. A business can show $1M in profit while its bank account declines.' },
      { q: 'What is a cash flow waterfall?', a: 'A visual chart that starts with operating earnings (EBITDA) and steps down through each category of cash outflow — distributions, debt service, intercompany financing, working capital — until reaching the actual net cash change.' },
      { q: 'What percentage of EBITDA should owner distributions be?', a: 'For pass-through entities (S-Corps, partnerships), 50-60% of EBITDA is generally sustainable. The owner needs enough for personal tax liability plus reasonable income. Above 60%, the business retains too little cash.' },
      { q: 'What is the difference between P&L break-even and cash flow break-even?', a: 'P&L break-even covers operating expenses on the income statement. Cash flow break-even adds debt payments, owner distributions, and tax obligations. The gap is the invisible cost the P&L never shows.' },
      { q: 'Can AI really analyze my QuickBooks data this way?', a: 'Yes. AI connects to QuickBooks Online via API, pulls 8 reports simultaneously, decomposes the Statement of Cash Flows line by line, and builds the waterfall automatically in about 30 seconds.' },
      { q: 'How often should I review my cash flow waterfall?', a: 'Monthly for businesses with tight cash positions (less than 30 days cash on hand). Quarterly for businesses with comfortable reserves. Always before major decisions like taking on debt or changing distribution levels.' }
    ]
  },
  'bonus-depreciation-hiding-net-worth': {
    file: '/content/blogs/bonus-depreciation-hiding-net-worth.md',
    title: 'How Bonus Depreciation Is Hiding Your Real Net Worth',
    date: '2026-03-18',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A business with $1.46M in equipment loans showed equity of just $150K and a debt-to-equity ratio of 9.8x. The real equity was $930K. Bonus depreciation was hiding it.',
    categories: ['Cash Flow', 'Tax Strategy'],
    readTime: '10 min read',
    featuredImage: '/images/blog/bonus-depreciation-hiding-net-worth.jpg',
    faqs: [
      { question: 'Does bonus depreciation actually reduce my net worth?', answer: 'No. Bonus depreciation reduces book value for accounting purposes. The equipment still has real market value. Your economic net worth is unchanged, but your balance sheet shows lower equity.' },
      { question: 'How does a low debt-to-equity ratio affect my ability to get a loan?', answer: 'Banks use D/E as a primary screening metric. Most require D/E below 2.0x. A D/E of 9.8x from bonus depreciation will flag your application for denial even if cash flow is strong. An equipment appraisal provides documentation for the adjusted D/E.' },
      { question: 'How much does an equipment appraisal cost?', answer: 'For most small to mid-size businesses, $3,000-$5,000. The appraiser inspects equipment, researches comparable sales, and issues a formal report stating fair market value.' },
      { question: 'Should I reverse bonus depreciation on my books?', answer: 'No. The depreciation is correct for tax purposes. The FMV adjustment is presented as a supplemental schedule or adjusted balance sheet — not a change to your books.' },
      { question: 'What types of businesses are most affected?', answer: 'Equipment-intensive businesses: medical/dental practices, construction companies, manufacturing, transportation, IT infrastructure, restaurants. Any business that made significant equipment purchases when 100% bonus depreciation was available.' }
    ]
  },
  'ai-cfo-three-actions': {
    file: '/content/blogs/ai-cfo-three-actions.md',
    title: 'If We Were the CEO: How AI Turns a CFO Report Into 3 Actions Worth $500K',
    date: '2026-03-18',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Your CFO report has 40 metrics and 13 sections. Here are the 3 actions that actually move the needle — each with a calculation table, a dollar impact, and a timeline. Combined: +$337K/year.',
    categories: ['Cash Flow', 'Healthcare Finance'],
    readTime: '14 min read',
    featuredImage: '/images/blog/ai-cfo-three-actions.jpg',
    faqs: [
      { question: 'What is a fractional CFO and how is this different?', answer: 'A fractional CFO provides part-time financial leadership. The If We Were the CEO approach goes further: instead of just monitoring metrics, we distill the analysis into 3 specific, quantified actions with calculation tables tracing every number to QuickBooks.' },
      { question: 'How do you pick only 3 actions when there might be 10 things to fix?', answer: 'The constraint forces prioritization. We rank by dollar impact, implementation speed, cost, and number of scorecard grades improved. Three actions backed by math get implemented. Ten recommendations get filed and forgotten.' },
      { question: 'What if I disagree with one of the 3 actions?', answer: 'Good — the calculation tables are transparent by design. Every number has a source, every assumption is stated. Change the assumption, recalculate the outcome. The framework invites challenge.' },
      { question: 'Can AI really do this from QuickBooks data alone?', answer: 'For most small businesses, yes. AI pulls P&L, Balance Sheet, Cash Flow, and AR/AP Aging from QBO, decomposes every line item, cross-references across timeframes, and identifies the highest-impact levers.' },
      { question: 'How often should this analysis be done?', answer: 'Monthly for the full CFO report. The top 3 actions should be revisited quarterly — once an action is implemented and numbers shift, the priorities change.' },
      { question: 'What does this cost?', answer: 'At Benefique, CFO analysis is part of the advisory engagement — not a separate fee. AI automation means we deliver this at a fraction of what traditional advisory firms charge.' }
    ]
  },
  'stealth-debt-balance-sheet-hidden': {
    file: '/content/blogs/stealth-debt-balance-sheet-hidden.md',
    title: 'The Debt That Doesn\'t Look Like Debt: How AI Found $961K Your Balance Sheet Hid',
    date: '2026-03-18',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A $4.7M imaging center showed $399K in debt on the balance sheet. Our AI pulled 12 months of snapshots and found $961K more \u2014 vendor credit and credit cards quietly replacing formal loans while nobody noticed.',
    categories: ['Cash Flow', 'Healthcare Finance'],
    readTime: '11 min read',
    featuredImage: '/images/blog/stealth-debt-balance-sheet-hidden.jpg',
    faqs: [
      { question: 'Is accounts payable considered debt?', answer: 'Technically, AP is classified as a current liability, not long-term debt. But from a cash flow perspective, it functions identically \u2014 it is money you owe that must be paid from future cash flow. When AP grows beyond normal trade terms, it becomes de facto financing.' },
      { question: 'How can AI detect hidden debt on a balance sheet?', answer: 'AI compares multiple balance sheet snapshots over time \u2014 typically quarterly for the past 12 months. It calculates growth rates for each liability category, identifies substitution patterns (formal debt declining while informal liabilities grow), and scores the sustainability of the financing structure.' },
      { question: 'What is a safe level of accounts payable for a small business?', answer: 'AP should generally stay within 30-45 days of cost of goods sold. Calculate: AP divided by monthly COGS equals months of AP outstanding. If this exceeds 2 months, you are stretching payments beyond normal trade terms.' },
      { question: 'Can stretching AP actually hurt my business?', answer: 'Yes. Vendor credit tightening can cascade: supply holds stop revenue, COD demands drain cash reserves, and negative payment data shared through credit bureaus causes other vendors to tighten simultaneously.' },
      { question: 'How is this different from cash flow waterfall analysis?', answer: 'The cash flow waterfall shows where your EBITDA went. This hidden debt analysis shows how the resulting cash gap is being filled. The waterfall says you consumed more cash than you generated. The liability analysis says here is where you quietly borrowed to cover the difference.' }
    ]
  },
  'expensive-2-minute-decision-medical-practice': {
    file: '/content/blogs/expensive-2-minute-decision-medical-practice.md',
    title: 'The Most Expensive 2-Minute Decision in Your Medical Practice',
    date: '2026-04-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'A radiology network identified its toxic payers. Warned the team. Then watched 24 more scans go through anyway \u2014 $55,832 in drug costs, $3,773 collected. The fix takes 10 minutes a day and costs nothing to implement.',
    categories: ['Healthcare Finance', 'Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '8 min read',
    featuredImage: '/images/blog/expensive-2-minute-decision-medical-practice.jpg',
    faqs: [
      { question: 'What is a pre-authorization gate for high-cost procedures?', answer: 'It is an internal checkpoint between scheduling a procedure and ordering the high-cost input (drug, implant, device). It is not insurance prior authorization \u2014 that is the payer\'s process. This is the practice\'s own financial gate that asks: based on this payer\'s history, will we get paid enough to cover the input cost?' },
      { question: 'How much does a toxic payer scan actually cost a practice?', answer: 'Drug acquisition alone ranges from $2,800 (VIZAMYL) to $6,500 (POSLUMA) per dose. Add staff time, equipment, and facility overhead and the total is higher. But the drug is the irreversible component \u2014 once injected, it cannot be recovered. In the network we analyzed, one managed-care payer generated 20 scans at $49,756 in drug costs and $0 collected.' },
      { question: 'What payers should trigger a Tier 2 review?', answer: 'Any payer with a documented history of underpaying or non-paying on high-cost procedures. Any payer not yet seen for a specific drug-procedure combination. Any combination where loss probability exceeds 50%. And any encounter where the drug cost exceeds $5,000.' },
      { question: 'How long does it take to implement a pre-authorization workflow?', answer: 'One to two weeks. You need payer-drug combinations graded by historical margin, a flag system at scheduling, and an operations reviewer empowered to approve or deny. No software to purchase. Ongoing cost: 10 minutes per day.' },
      { question: 'Does this replace insurance prior authorization?', answer: 'No. Insurance prior authorization is the payer\'s requirement. The internal authorization gate is in addition to the payer\'s process. The payer asks: is this procedure medically necessary? Your gate asks: if we perform this procedure for this payer, will we get paid enough to cover the drug cost?' }
    ]
  },
  'dso-lying-medical-practice-cash-flow': {
    file: '/content/blogs/dso-lying-medical-practice-cash-flow.md',
    title: 'Your DSO Is Lying to You \u2014 Why Averages Hide Your Real Cash Flow Problem',
    date: '2026-04-08',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'One radiology center reported a 49-day DSO. Looked like a slow-payment problem. It wasn\'t. The median was 35 days. Two distinct payment populations were hiding inside one average \u2014 and the centers with the worst DSO had the worst data entry.',
    categories: ['Healthcare Finance', 'Cash Flow Advisory', 'Financial Intelligence'],
    readTime: '9 min read',
    featuredImage: '/images/blog/dso-lying-medical-practice-cash-flow.jpg',
    faqs: [
      { question: 'What is a good DSO for a medical practice?', answer: 'MGMA benchmarks place best-practice DSO at 30-40 days, with anything under 45 days considered acceptable. But the single number matters less than the distribution. A 38-day DSO with a tight distribution is healthier than a 32-day DSO with a bimodal split and a tail of 90+ day claims.' },
      { question: 'Why is my practice\'s DSO higher than the benchmark?', answer: 'Common causes: bimodal payer distributions, data quality issues at intake producing rejections or delays, denial rates above the 12% industry average, and a mix of payers with structurally different payment timelines. Decomposing by payer tells you which cause is driving your number.' },
      { question: 'How does data completeness affect collections?', answer: 'Missing fields produce claims that are rejected, held for review, or denied on first pass. MGMA estimates the average cost to rework a claim at $25.20. But the bigger cost is the delay: every rework cycle adds 15-30 days to your payment timeline.' },
      { question: 'Should I track DSO by payer or as a single number?', answer: 'By payer \u2014 always. A blended DSO across all payers tells you almost nothing actionable. Medicare, commercial payers, Medicaid, and workers\' comp have fundamentally different payment timelines and denial rates.' },
      { question: 'How often should I review AR aging?', answer: 'Weekly for the dashboard view (age-adjusted). Monthly for the full decomposition (payer-level, distribution analysis). Quarterly for the strategic review (trend comparison, data completeness correlation, payer mix shifts).' }
    ]
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
