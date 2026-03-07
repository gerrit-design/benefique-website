---
title: "Case Study: Real-Time Collections Intelligence System for Multi-Center Radiology Group"
date: "2026-02-23"
author: "Benefique Tax & Accounting"
excerpt: "How we built interactive dashboards that identified a 30% revenue decline, eliminated the 'seasonality excuse,' and quantified a multi-million dollar A/R crisis for a six-center diagnostic imaging group."
categories: ["Case Studies", "CFO Services", "Healthcare"]
readTime: "14 min read"
featuredImage: "/images/blog/radiology-dashboard-case-study.jpg"
keywords: ["fractional cfo case study", "healthcare financial dashboard", "radiology practice cfo", "collections intelligence", "medical practice analytics", "diagnostic imaging financials"]
slug: "radiology-collections-dashboard-case-study"
---

# Case Study: Real-Time Collections Intelligence System for Multi-Center Radiology Group

**The Bottom Line:** A multi-center diagnostic imaging group saw flat collections despite adding two new centers. Traditional monthly P&L reports couldn't explain why. We built three interactive dashboards with a diagnostic framework that systematically eliminated excuses before delivering the diagnosis: a **30% decline in per-claim reimbursement** driven by PIP (Personal Injury Protection) insurance compression—not seasonality, not patient volume, not service mix.

**Key Result:** Eliminated the "seasonality excuse," quantified the A/R crisis at over 30 months of receivables, and separated two fundamentally different regional businesses requiring different strategic responses.

---

## Client Profile

**Industry:** Healthcare / Diagnostic Imaging  
**Structure:** Multi-center diagnostic imaging group operating six centers across two regions in the southeastern United States  
**Service:** Fractional CFO + Custom Business Intelligence  
**Timeline:** 12-month engagement  
**Revenue Model:** Complex payer mix with one region deriving 40-76% of scan volume from PIP (Personal Injury Protection) claims, the other operating primarily on commercial insurance plus research contracts

The business expanded aggressively, opening two new centers to capture growing demand for MRI, CT, and PET imaging services. Despite the expansion, **total collections remained flat year-over-year**—a red flag buried in spreadsheets and dismissed as "seasonality."

---

## The Problem: Flat Collections Despite Growth

The owner's internal team attributed declining collections to normal seasonal variation. "This month is always slow." But the numbers didn't support that explanation:

- **Two new centers opened** (adding capacity and fixed costs)
- **Patient volume remained stable** (scans were being performed)
- **Collections flat** (revenue wasn't keeping pace)

Traditional financial reports—monthly P&L statements arriving 2-3 weeks after close—showed *what happened* but not *why*. The critical questions remained unanswered:

1. **Volume problem?** Are fewer patients showing up?
2. **Modality problem?** Did we lose high-value scan types (MRI, PET)?
3. **Payer problem?** Did our insurance mix shift unfavorably?
4. **Collection problem?** Are we doing the work but not getting paid?
5. **Seasonal or structural?** Is this a calendar timing issue or a permanent shift?

Without answers, leadership couldn't distinguish between temporary dips and systemic decline.

---

## Our Approach: The 4-Panel Diagnostic Framework

We built a centralized data pipeline connecting three systems—**QuickBooks Online**, **Airtable** (operational claims database), and **Google Sheets** (financial sync)—and designed a systematic elimination framework to diagnose the problem.

### The Framework: Eliminate Before You Diagnose

Rather than presenting raw data, we created a **4-Panel Framework** that methodically rules out alternative explanations before arriving at a conclusion:

| Panel | Question | What Stability Means |
|-------|----------|---------------------|
| **A: Activity** | Are patients going away? | Volume isn't the problem |
| **B: Modality** | Did we lose high-value scan types? | Service mix isn't the problem |
| **C: Payer Mix** | Did the insurance composition change? | Who's paying isn't the problem |
| **D: $/Claim** | Are we collecting less per scan? | **This is the problem** |

**The logic:** If Panels A, B, and C show stability but Panel D shows decline, the problem is **collection execution**—billing errors, denial rates, follow-up failures, or payer reimbursement compression. Not the market. Not the patients. Not the scanners.

This framework is powerful because it **preempts the most common deflections**. When leadership sees collections declining, the instinct is to blame external factors (fewer patients, market competition, staffing issues). The 4-Panel Framework eliminates each excuse systematically before presenting the diagnosis.

### The Seasonality Killer: Year-over-Year Comparison

The second analytical weapon is the **Year-over-Year Seasonality Test**. If someone claims "this month is always slow," we pull the exact same month from the prior year—same center, same month, different year.

- **If the months look similar:** The dip is seasonal and recurring
- **If the months look radically different:** The problem is structural and new

This single comparison eliminated the seasonality argument entirely.

---

## The Data Architecture

We built Airtable as the analytical layer, with each center's monthly record containing **25+ fields**:

- Claims billed, total collections, charges billed, A/R balances
- Aging by type (insurance, LOP, patient)
- Modality volumes (MRI, CT, PET)
- Payer scan counts (commercial, PIP, LOP, research)
- Revenue broken down by payer category

Every month, the data updates automatically via API connections, feeding three interactive React dashboards—one per region plus a combined group view—deployed as public URLs accessible from any device with no login required.

### Technology Stack

- **React** functional components with hardcoded data at build time (no runtime API calls—fast, reliable, works offline)
- **Recharts** for interactive visualizations (bar, line, area, composed, and pie charts)
- **Tailwind CSS** for responsive styling
- **Vite** for sub-3-second builds
- **Vercel** for instant deployment with production URLs

**Why hardcoded data instead of live API calls?**

- **Reliability:** No API failures, no authentication tokens to expire, no rate limits
- **Speed:** Page loads instantly—no loading spinners, no waterfall requests
- **Offline capability:** Once loaded, the dashboard works without internet
- **Auditability:** The data in the dashboard is the data that was analyzed—it can't silently change
- **Archival:** Each month's source file is saved as a labeled copy, creating a permanent record

---

## Dashboard Structure: 10 Analytical Sections

Each regional dashboard follows the same analytical arc:

1. **Executive Summary** — Five stat cards: 6-month claims, collections, $/Claim, trend direction, and A/R with A/R Months ratio
2. **Seasonality Test** — Side-by-side same-month prior year vs. current year tables with bar chart comparisons
3. **6-Month Trend** — Stacked collection bars + $/Claim line chart per center
4. **A/R Deep Dive** — Stacked area chart of receivables, A/R Months line, aging breakdown table
5. **4-Panel Framework** — The diagnostic elimination: Activity, Modality, Payer Mix, $/Claim
6. **Payer-Specific Analysis** — PIP deep dive for the PIP-heavy region, Commercial Revenue analysis for the commercial region
7. **Secondary Payer Analysis** — LOP risk assessment for the PIP-heavy region, Modality analysis for the commercial region
8. **Center Deep Dives** — Per-center cards with three mini charts and a full 6-month data table
9. **Collection Efficiency** — Charges Billed vs. Cash Collected composed chart with Collection % trend line
10. **Editorial** — Full narrative with data-backed conclusions

### Methodology Transparency: "Show Your Work"

Every section includes a **"How this is calculated"** callout block explaining the exact formula, data source, and interpretation. Examples:

> **$/Claim** = Total Collections / Total Claims Billed for that month. This measures how much money the business actually collects per scan processed. A declining $/Claim with stable volume means the problem is in billing, denial management, or payer reimbursement—not in patient flow.

> **A/R Months** = Total A/R / That Month's Collections. It answers: "At the current monthly collection rate, how many months of revenue are sitting unpaid?" Higher = worse.

This approach serves two purposes: it builds credibility with the client ("show your work"), and it ensures anyone reading the dashboard—including people not in the meeting—can understand what they're looking at.

---

## Key Findings: Regional Diagnosis

### Region A (PIP-Dependent): RED Status

The 4-Panel Framework delivered a clear diagnosis:

- **Panel A (Activity):** Claims were stable across the 6-month window. **Patients were still coming.**
- **Panel B (Modality):** MRI-dominant mix unchanged. **No loss of high-value scan types.**
- **Panel C (Payer Mix):** Insurance share shifted slightly toward PIP/LOP. A contributing factor, but not the primary cause.
- **Panel D ($/Claim):** Combined $/Claim **fell over 30% in 6 months**.

**Root Cause: PIP Reimbursement Compression**

Every center in the region saw $/PIP claim decline by **40-55%**. PIP insurers were paying imaging providers dramatically less per claim. When the majority of your scans are PIP, and PIP pays half what it paid six months ago, no amount of volume growth compensates.

**The Seasonality Test Was Devastating**

The largest center's same-month year-over-year comparison showed a **39% decline** in collections. The second center showed a **63% decline**. Same month, same centers, radically different results. **Seasonality eliminated.**

**A/R Compounding Crisis**

Total regional A/R grew into the tens of millions while monthly collections declined—creating a widening gap between what was owed and what was collected. The **A/R Months ratio climbed to over 30**, meaning at the current collection rate, it would take **over two and a half years** to collect the outstanding receivables.

### Region B (Commercial Insurance): YELLOW Status

The same framework told a different story:

- **Panel A:** Volume stable, with the newest center growing rapidly
- **Panel B:** Diversified modality mix (MRI + CT + PET)—stable
- **Panel C:** Commercial insurance dominant at over 85%—insulated from PIP compression
- **Panel D:** A one-month dip from a strong prior month, but **no structural decline**

The largest center's commercial revenue dipped in the most recent month on flat volume—a one-month lag, not a trend. The newest center continued its growth trajectory, scaling from startup to fully operational within 12 months.

**Key Insight:** The commercial insurance base insulates this region from the PIP compression devastating the other region. **The two regions require completely separate analytical treatment.**

---

## The Impact: Before vs. After

### Before: What the Client Had

- Monthly P&L statements arriving 2-3 weeks after close
- No visibility into *why* collections changed
- "Seasonality" accepted as an explanation for declining performance
- No regional separation—blended group numbers masked a regional crisis
- No methodology transparency—conclusions without proof

### After: What the Client Has

- **Three interactive dashboards** updated monthly with 6-month trailing analysis
- **Diagnostic framework** that systematically eliminates excuses before presenting the diagnosis
- **Year-over-year proof** that the decline is structural, not seasonal
- **Regional separation** revealing one region is in crisis while the other is resilient
- **A/R Months ratio** showing the compounding nature of the collection problem
- **Payer-specific analysis** isolating the exact payer category driving the decline
- **Methodology at every step**—every chart, table, and conclusion shows its work
- **Public URLs** accessible from any device—no login, no software, instant access

### Strategic Outcomes

1. **Eliminated the seasonality excuse** — Management can no longer attribute declining collections to calendar timing when the same month last year produced radically different results
2. **Identified payer reimbursement compression as systemic** — Not a billing error or staffing issue, but a market-wide shift requiring strategic response
3. **Quantified the A/R risk** — Concrete receivable figures and aging breakdowns gave the owner hard numbers for banking conversations and M&A discussions
4. **Separated the two businesses** — The PIP-dependent region and the commercial region require different strategies, different targets, and different timelines
5. **Created a repeatable monthly process** — The same framework runs every month, making trends visible and accountability automatic

---

## The Monthly Process: 30 Minutes from Data to Live Dashboards

The entire pipeline now runs as a structured monthly process:

1. **Data Collection** (Day 7-8): Pull 6-month trailing data from Airtable for all centers, plus year-over-year comparison months
2. **Derived Calculations**: Compute $/Claim, payer-specific reimbursement rates, Collection %, A/R Months, period changes, YoY changes, trend classification (GREEN/YELLOW/RED)
3. **Dashboard Generation**: Build three React dashboards with hardcoded data, charts, methodology callouts, and editorial narrative
4. **Deploy**: Build with Vite (~3 seconds), deploy to Vercel (~10 seconds per dashboard)
5. **Deliver**: Share links with the client before the monthly meeting—they walk in already informed

**Total time from data pull to live dashboards: under 30 minutes.**

---

## Why This Approach Works

### 1. **Data Without Methodology Is Noise**

Medical imaging financials are counterintuitive. High A/R is normal (providers overbill and recover a fraction). Collection % below 30% isn't automatically alarming. $/Claim matters more than total revenue. Without methodology transparency, stakeholders either can't interpret the data or misinterpret it. **Every chart earns trust by showing its work.**

### 2. **Blended Numbers Mask Regional Realities**

The two regions have fundamentally different payer dynamics. A blended $/Claim would mask one region's payer crisis behind the other's commercial insurance stability. By keeping them separate, each region's trends are visible on their own terms. The combined dashboard adds a group-level layer on top—it doesn't replace the regional detail.

### 3. **Diagnostic Frameworks Eliminate Deflections**

The 4-Panel Framework didn't just find the problem. It made the problem impossible to ignore. By systematically ruling out volume, modality, and payer mix, the framework leaves only one conclusion: collection execution—whether from billing errors, denial management failures, or (in this case) payer reimbursement compression.

---

## Conclusion: From Guesswork to Clarity

This case demonstrates what happens when you combine financial expertise with modern data visualization and a disciplined analytical framework. The data was always there—in the accounting system, in the operational database, in monthly reports. What was missing was a system that could **transform raw numbers into a structured argument**, eliminate alternative explanations, and present conclusions that couldn't be dismissed.

The 4-Panel Framework didn't just find the problem. **It made the problem impossible to ignore.**

---

## Ready for Real-Time Financial Intelligence?

If your business is growing but your financial visibility isn't keeping pace, we can help. We build custom dashboards, diagnostic frameworks, and monthly intelligence systems that turn your data into decisions.

**Schedule a free consultation:** [Contact Benefique](https://app.benefique.com/contact)  
**See our CFO services:** [Fractional CFO for Growing Businesses](https://app.benefique.com/services/fractional-cfo)  
**Read more case studies:** [Blog](https://app.benefique.com/blog)

---

*Benefique Tax & Accounting — Outsourced Accounting, Fractional CFO, and Business Intelligence for growing businesses.*
