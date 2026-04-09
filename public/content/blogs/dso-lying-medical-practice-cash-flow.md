---
title: "Your DSO Is Lying to You — Why Averages Hide Your Real Cash Flow Problem"
description: "A 49-day DSO hid two payment populations and a data quality crisis. Decompose your AR by payer — the average is a fiction."
date: "2026-04-08"
author: "Gerrit Disbergen, EA"
excerpt: "One radiology center reported a 49-day DSO. Looked like a slow-payment problem. It wasn't. The median was 35 days. Two distinct payment populations were hiding inside one average — and the centers with the worst DSO had the worst data entry. That's not coincidence."
categories: ["Healthcare Finance", "Cash Flow Advisory", "Financial Intelligence"]
readTime: "9 min read"
featuredImage: "/images/blog/dso-lying-medical-practice-cash-flow.jpg"
slug: "dso-lying-medical-practice-cash-flow"
metaTitle: "Your DSO Is Lying to You — Averages Hide Real Cash Flow Problems | Benefique"
metaDescription: "A 49-day DSO hid two payment populations and a data quality crisis. Decompose AR by payer — the average is a fiction."
keywords: "DSO medical practice, days sales outstanding healthcare, accounts receivable radiology, payer mix DSO, bimodal payment distribution, revenue cycle metrics, AR aging analysis, data completeness collections, cash flow forecasting healthcare"
schema:
  type: "Article"
  faq: true
  about:
    - "Days Sales Outstanding Analysis"
    - "Revenue Cycle Management"
    - "Accounts Receivable Healthcare"
    - "Data Quality in Medical Billing"
  mentions:
    - type: "Organization"
      name: "CMS"
    - type: "Organization"
      name: "MGMA"
    - type: "Organization"
      name: "HFMA"
---

# Your DSO Is Lying to You — Why Averages Hide Your Real Cash Flow Problem

If you manage a medical practice and track Days Sales Outstanding as a single number, you are managing a fiction. The average hides two distinct payment populations with completely different causes and completely different fixes.

> **Key Takeaway:** A single DSO number is a blended average that masks the shape of your payment distribution. Decompose it by payer. Plot the distribution. If you find two clusters with a gap in the middle — and you will — you have two separate problems that require two separate interventions. Managing the average addresses neither one.

---

## The 49-Day Number That Meant Nothing

We analyzed Q1 2026 encounter-level payment data for a five-center radiology network in South Florida. One center — **182 PET scan encounters** — reported a **49-day DSO**.

By [MGMA](https://www.mgma.com/) benchmarks, best-practice DSO for medical groups is **30-40 days**, with anything under 45 considered acceptable. At 49 days, this center looked like it had a collections problem. The instinct is to call a meeting, pressure the billing team, demand faster follow-up on aging claims.

We did not do that. We looked at the distribution instead.

The **median was 35 days** — solidly inside the benchmark range. The average was being dragged up by a cluster of claims paying in the 61-90 day window. The center did not have a slow-payment problem. It had two payment populations hiding inside one number.

That distinction changes everything about what you do next.

---

## Two Populations Hiding Inside One Average

We pulled the FL Medicare payment distribution for the same center — 86 paid encounters — and grouped them by days to payment:

| Days to Payment | Encounters | Cumulative |
|----------------|-----------|------------|
| **15-30 days** | 22 | 22 |
| **31-45 days** | 25 | 47 |
| **46-60 days** | 2 | 49 |
| **61-90 days** | 36 | 85 |
| **91+ days** | 1 | 86 |

**Average: 51 days. Median: 36 days.**

Two populations. The fast batch — **47 scans paid in under 45 days** — was processing normally. These claims were submitted, adjudicated, and paid within standard [CMS timelines](https://www.cms.gov/regulations-and-guidance/guidance/manuals/downloads/clm104c34.pdf). Nothing wrong here.

The slow batch — **36 scans paid in 61-90 days** — was a different story. Something was holding these claims past the standard payment window.

The gap between 45 and 61 days is nearly empty. Two encounters. That is the tell. This is not a normal distribution with a long tail. This is a bimodal distribution — two distinct peaks separated by a valley. Claims either sail through in under 45 days, or they get held and pay in 61-90.

Managing "49-day DSO" as a single problem is like treating a patient with two different conditions using one medication. The fast batch does not need intervention. The slow batch needs investigation: What is different about those 36 claims? Are they specific CPT codes? Missing documentation? A coding pattern that triggers review? Authorization issues?

The answers to those questions lead to targeted fixes. The average leads to a vague directive to "speed up collections" — which helps no one.

---

## How to Decompose DSO by Payer Population

Here is the process we use with our [healthcare CFO engagements](/about). It takes a few hours the first time and reveals problems that aging buckets alone will never show.

**Step 1: Pull payment data at the encounter level.** Not aging buckets. Individual encounters with date of service, date paid, payer, procedure code, and amount. Your practice management system exports this.

**Step 2: Group by payer, then plot the distribution.** A pivot table and a bar chart in Excel will work. What you are looking for is the shape, not the average.

**Step 3: Look for gaps.** A normal distribution has one peak and tapers smoothly. A bimodal distribution has two peaks with a gap. Bimodal means two different things are happening, and they require two different responses.

**Step 4: Investigate the slow population separately.** Pull the slow-batch claims and look for common attributes — procedure codes, referring physicians, authorization status, diagnosis codes. The cause is usually operational, not financial.

Here is what single-number DSO tells you versus what decomposed DSO tells you:

| Single-Number DSO | Decomposed DSO |
|-------------------|----------------|
| "Collections are slow" | "47 claims process normally; 36 get held" |
| "We need to speed up AR" | "We need to investigate what flags the slow batch" |
| "Performance is below benchmark" | "Half our claims beat benchmark; half fail it" |
| "Call a billing meeting" | "Pull the slow-batch claims and compare attributes" |
| Suggests one problem | Reveals two problems with different root causes |
| Leads to pressure | Leads to precision |

The [HFMA MAP Keys](https://www.hfma.org/resources/map/) benchmark a **95%+ clean claim rate** and **95%+ first-pass resolution rate** for high-performing organizations. When you decompose your DSO and find a bimodal distribution, you have likely found the claims that are dragging your clean claim rate below that benchmark — and now you know exactly which ones to investigate.

---

## The Data Quality Correlation Nobody Talks About

We did not stop at one center. We analyzed all five centers in the network — same payer mix, same time period, same procedures. The results exposed a pattern that has nothing to do with billing speed and everything to do with data entry.

| Center | Encounters | DSO | Missing Referring Doctor | Collection Profile |
|--------|-----------|-----|-------------------------|-------------------|
| **Pines** | 27 | 21 days | 96% | Unreliable — 74 rows missing encounter IDs |
| **South Miami** | 80 | 25 days | 0% | Gold standard data quality |
| **Miami Beach** | 54 | 32 days | 0% | Healthy profile |
| **Aventura** | 102 | 38 days | 93% | United/UHC 80% unpaid |
| **Coconut Creek** | 182 | 49 days | 50% | Bimodal Medicare distribution |

The two centers with **100% data completeness** — South Miami and Miami Beach — had the fastest clean DSOs: **25 and 32 days**. Both within MGMA best-practice range.

The centers with the worst data gaps — **93% and 96% missing referring doctor data** — had the worst collection profiles. Pines looked fast at 21 days, but 96% of its records were missing basic fields and 74 rows had no encounter IDs. That number is not trustworthy. Aventura had 93% of referring doctor fields empty and 80% of its United/UHC claims unpaid.

This is not coincidence. Operational discipline at the front desk — accurately capturing referring physician, authorization numbers, demographic fields — is the same discipline that produces clean claims. When intake is sloppy, the data gaps cascade downstream. A missing referring doctor field means you cannot do accountability analysis or identify which physicians bring profitable versus unprofitable volume.

**Data completeness is a leading indicator. DSO is a lagging indicator.** By the time your DSO is elevated, the data quality problem has been compounding for weeks. Fix the leading indicator and the lagging indicator follows. The inverse does not work — pressuring billing to reduce DSO without fixing the data that feeds claims is like demanding faster output from a factory with broken inputs.

According to [MGMA research](https://www.mgma.com/), the average cost to rework a denied or rejected claim is **$25.20**. With initial denial rates climbing to approximately **12% in 2024**, practices with poor data completeness are paying a rework tax on top of their delayed collections. Every empty field at intake is a future rework cost that someone will pay — either in staff time, in delayed cash, or in write-offs.

---

## The March Mirage — When "Unpaid" Doesn't Mean "Late"

One more data trap we see routinely, and it almost caused the wrong reaction at this network.

March 2026 data for the Coconut Creek center: **77 encounters, 2 paid, 75 unpaid. That is 97% unpaid.** On a dashboard, that looks catastrophic. It looks like collections fell off a cliff.

It was nothing of the sort.

Those 77 encounters were **28 to 37 days old** at the time of analysis. CMS requires clean claims to be paid within **30 days** per the [CMS Claims Processing Manual, Chapter 34](https://www.cms.gov/regulations-and-guidance/guidance/manuals/downloads/clm104c34.pdf). Most of these claims had not yet hit the payment window. They were not late. They were not stuck. They were young.

A 97% unpaid rate on claims that are 28-37 days old is normal. A 97% unpaid rate on claims that are 90 days old is a crisis. The number is identical. The meaning is opposite.

The lesson: **always age-adjust your unpaid analysis.** Separate claims into cohorts by age before drawing conclusions. A report that blends 30-day-old claims with 120-day-old claims into a single "unpaid" bucket will trigger panic about new claims and hide complacency about old ones. We covered the broader cash flow distortion problem in our analysis of [why EBITDA-positive practices can still be cash-negative](/blog/ebitda-positive-cash-flow-negative-debt-service) — AR timing is one of the primary mechanisms.

---

## Three Actions for Any Medical Practice

You do not need a consulting engagement to start. You need encounter-level data and a few hours.

**Action 1: Decompose DSO by payer.** Stop managing the average. Pull your payment data, group by payer, and plot the distribution. If you find bimodal populations — and in our experience, most multi-payer practices do — you have two problems requiring two interventions. The fast batch needs protection. The slow batch needs diagnosis. This is the same [assembly line thinking](/blog/assembly-line-thinking-medical-practice-profitability) we apply to procedure profitability — separate the populations, then manage each one on its own terms.

**Action 2: Track data completeness as a KPI.** If referring doctor fields, authorization numbers, or demographic fields are empty, you have a front-desk problem that becomes a collections problem in 30-60 days. Set a target of **95%+ completeness** on critical fields — matching the [HFMA clean claim benchmark](https://www.hfma.org/resources/map/). The centers in our analysis with 100% completeness had 25-32 day DSOs. The centers with 50-96% gaps had 38-49 day DSOs or unreliable data.

**Action 3: Age-adjust your AR analysis.** Separate receivables into cohorts: under 30 days (in pipeline), 31-60 days (monitor), 61-90 days (investigate), 91+ days (escalate). Young claims need patience. Old claims need action. Mixing them guarantees you panic about the wrong ones and ignore the right ones. Your [cash flow waterfall](/blog/ai-cash-flow-waterfall-explained) should reflect this segmentation — money in the pipeline is not the same as money that is stuck.

---

At Benefique, we build these decompositions into every healthcare CFO engagement. Not because the math is complicated — it is not. Because nobody does it. Practices run on summary dashboards built for convenience, not diagnosis. The data to decompose DSO, track data completeness, and age-adjust AR already lives in your practice management system and your QBO file. It just needs someone to connect it, read the shape of the distribution instead of the average, and tell you what the numbers actually mean instead of what they appear to mean.

The companion analysis to this article — [what happens when pre-authorization decisions cost $2,940 in two minutes](/blog/expensive-2-minute-decision-medical-practice) — examines the upstream gate where these problems begin. DSO tells you how fast money comes in. Pre-auth tells you whether it should have been on the schedule at all.

**Monday Morning.** You pull last quarter's payment data — encounter-level, not aging buckets. You group by payer. You plot the histogram. And there it is: two peaks with a valley between them. Your "slow DSO" is actually a fast population performing exactly as it should, and a smaller population getting held for a reason nobody investigated because the average masked it. You pull the slow batch. You find the common attribute — a missing authorization, a coding pattern, a specific referral source. You fix the upstream cause. Next quarter, the valley fills in, the slow peak shifts left, and your DSO drops — not because you pressured billing, but because you found the actual problem and addressed it. The average did not tell you. The distribution did.

---

## FAQ — DSO and Cash Flow in Medical Practices

**What is a good DSO for a medical practice?**
MGMA benchmarks place best-practice DSO at **30-40 days**, with anything under 45 days considered acceptable for most specialties. But the single number matters less than the distribution. A 38-day DSO with a tight, normal distribution is healthier than a 32-day DSO with a bimodal split and a tail of 90+ day claims. Always look at the shape, not just the average.

**Why is my practice's DSO higher than the benchmark?**
Common causes: bimodal payer distributions, data quality issues at intake producing rejections or delays, denial rates above the ~12% industry average, and a mix of payers with structurally different payment timelines. Decomposing by payer tells you which cause is driving your number.

**How does data completeness affect collections?**
Directly. Missing fields — referring physician, authorization number, subscriber ID, demographic data — produce claims that are rejected, held for review, or denied on first pass. MGMA estimates the average cost to rework a claim at **$25.20**. But the bigger cost is the delay: every rework cycle adds 15-30 days to your payment timeline. In our five-center analysis, the centers with 100% data completeness had DSOs of 25-32 days. The centers with 50-96% missing data had DSOs of 38-49 days.

**Should I track DSO by payer or as a single number?**
By payer — always. A blended DSO across all payers tells you almost nothing actionable. Medicare, commercial payers, Medicaid, and workers' comp have fundamentally different payment timelines, denial rates, and follow-up requirements. A single number blends fast-paying commercials with slow-paying government programs and produces an average that describes neither one accurately.

**How often should I review AR aging?**
Weekly for the dashboard view (cohort-based, age-adjusted). Monthly for the full decomposition (payer-level, distribution analysis). Quarterly for the strategic review (trend comparison, data completeness correlation, payer mix shifts). The weekly check catches new problems before they age. The monthly analysis keeps your decomposition current. The quarterly review reveals whether your interventions are working.

---

**[See how Benefique builds these analytics for medical practices ->](/contact)**

---

*Gerrit Disbergen is an Enrolled Agent and the founder of [Benefique Tax & Accounting](/about) in Davie, Florida. Benefique provides AI-powered financial intelligence for medical practices and service businesses across South Florida. [Schedule a conversation about your revenue cycle analytics](/contact).*

---

*Disclaimer: This article is for informational purposes only and does not constitute financial, tax, or legal advice. All figures are derived from anonymized engagement data. Facility names, entity names, and specific dollar amounts tied to identifiable organizations have been removed. CMS payment timelines referenced are per the CMS Claims Processing Manual and may vary by claim type and jurisdiction. MGMA and HFMA benchmarks are cited as industry references; individual practice results will vary. Consult your financial advisor, revenue cycle consultant, and healthcare attorney before making operational changes.*
