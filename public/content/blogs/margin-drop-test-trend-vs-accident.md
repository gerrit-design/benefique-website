---
title: "When 'It's Just Seasonal' Isn't"
description: "A 60-minute test that tells you whether a bad margin month is a structural trend or a one-time accident — before you waste a quarter chasing the wrong fix."
date: "2026-04-15"
author: "Gerrit Disbergen, EA"
excerpt: "One month last quarter, a multi-entity distributor posted a negative gross profit month — $200K in revenue, $201K in COGS, the first time in three years. Before the owners restructured anything, we ran a 60-minute test that told us the cause was isolated to three external customer invoices. The test works for any business, and you can run it yourself."
categories: "Cash Flow"
readTime: "8 min read"
featuredImage: "/images/blog/margin-drop-test-trend-vs-accident.jpg"
slug: "margin-drop-test-trend-vs-accident"
metaTitle: "When 'It's Just Seasonal' Isn't | Benefique"
metaDescription: "A 60-minute test for business owners: is your margin drop a trend or a one-time accident? The two-factor decomposition that separates structural problems from accounting events."
keywords: "gross margin drop, margin compression analysis, one-time accounting event, seasonal margin variance, mix effect vs channel margin, COGS variance"
---

Every business owner has seen it: a month comes in with a gross profit number that looks catastrophically wrong, and the first instinct is to start cutting costs or raising prices. Both instincts are usually wrong. Most "bad months" aren't structural problems. They're accounting events — a COGS cutoff mismatch, an inventory adjustment, a single mispriced shipment. You can tell the difference in about an hour.

> **Key Takeaway:** When gross profit drops in a multi-entity or multi-channel business, the drop has two possible causes: a mix shift (more sales came from your lower-margin channel) or a channel margin collapse (one of your channels got suddenly less profitable). Decomposing the two factors takes sixty minutes, and the 81/19 split we see in practice means most "bad months" are isolated accounting events concentrated in a single channel — fixable without any strategic change.

## The Two Kinds of Bad Months

Every gross margin drop belongs to one of two categories:

**Type 1: Structural.** The underlying business economics have actually changed. Input costs rose. Pricing slipped. Product mix shifted. Competition intensified. These problems don't fix themselves; they require real operational responses — renegotiation, repricing, cost reduction.

**Type 2: Accidental.** The underlying business is fine. Something happened in the books: a COGS cutoff where February's costs hit before March's revenue did, an inventory writedown absorbed into a single month, a large customer billed at the wrong price, a one-time rebate the vendor posted late. These problems resolve themselves — but only if you correctly identify them as accidents instead of trends.

The owner's instinct in the first 48 hours after a bad month is always to assume Type 1. This is expensive. A quarter spent renegotiating supplier contracts to "fix" a COGS problem that was actually a cutoff error is a quarter lost. Worse, it often damages vendor relationships that didn't need damaging.

The 60-minute test tells you which category you're in before you commit to a response.

## The 60-Minute Test — Decomposition, Step by Step

The test works on any business with two or more distinguishable revenue channels — external customers vs. internal customers, residential vs. commercial, wholesale vs. retail, one service line vs. another. If you have just one undifferentiated revenue stream, the test doesn't apply; the drop is whatever it is. But most businesses with more than a few years of operation have channels, even if they've never formally labeled them.

You need three numbers from the bad month and three from a healthy reference month (ideally the same month a year prior, to eliminate seasonal noise):

1. **Blended gross margin %** — straight off the P&L
2. **Revenue by channel** — for each channel, the dollar revenue and the resulting mix percentage
3. **Your known channel margin anchor** — for at least one channel, the gross margin that should be roughly fixed by policy (intercompany markup, a contracted customer rate, a known commodity pass-through)

If your business has [an intercompany markup anchoring one channel](/blog/blended-pl-lying-multi-entity-business), you already have everything you need. If not, use whichever channel has the most stable pricing — the one where you know the target margin within a few points.

Then run three calculations. First, the baseline residual: what was the other channel's gross margin in the healthy reference month? Second, the current residual: what is the other channel's gross margin in the bad month? Third, the "mix-only" scenario: what would the blended margin be in the bad month if the other channel's margin had held steady at the baseline?

The gap between the current blended margin and the mix-only scenario is the **channel margin effect**. The gap between the mix-only scenario and the baseline blended margin is the **mix effect**. They sum to the total drop.

## A Real Example: The Month Gross Profit Went Negative

Here's the clean case that made us codify this test.

A multi-entity marine distribution business had two revenue channels: external customers (arm's-length buyers at market prices) and internal customers (other related entities at a fixed cost + 10% intercompany markup, which works out to 9.09% gross profit on every internal dollar). The external channel historically ran around 59% gross margin. The internal channel was contractually fixed.

Then one month, gross profit went negative. Not slightly negative — **revenue $200K, cost of goods sold $201K, gross profit negative $804**. The first time it had happened in 36 months of data.

The owner was preparing to restructure. Renegotiate supplier contracts. Cut inventory. Raise prices.

We ran the test in an hour:

| Calculation | Value |
|---|---|
| Bad month blended GP | −0.40% |
| Internal mix % | 54.1% |
| External mix % | 45.9% |
| Internal channel GP (fixed anchor) | 9.09% |
| External channel GP (residual) | **−11.6%** |

Internal was fine. Rock steady at 9.09%, exactly where policy put it. External had gone from +50% the month before to **−11.6%** this month to +25% the month after. Three months of external data, a massive swing in the middle, internal undisturbed throughout.

This is impossible as a business-wide phenomenon. A company does not lose 36 points of margin on 484 customers in a single month and then recover 37 points the next. What it can do is post a large inventory writedown against external COGS in a single month, or receive a shipment in January that got booked to February COGS while the related revenue hit March, or price a single large shipment below landed cost because of a clerical error.

Within two hours we had the list of external invoices for the bad month sorted by gross profit. Three transactions were responsible for virtually the entire loss. One was a contract shipment priced off the wrong cost sheet. Two were a cutoff mismatch where the COGS had been booked ahead of the matched sales. Total adjustment to correct the accounting: one journal entry. Strategic changes required: zero.

The owner spent the next quarter on his actual business instead of renegotiating vendor contracts that didn't need renegotiating.

## The 81/19 Rule (Why Most Margin Drops Are Accidents)

When we run this decomposition across client engagements, a pattern shows up: roughly **81% of meaningful margin drops are isolated channel events, and roughly 19% are structural mix shifts.** The numbers vary — we've seen 70/30 and 90/10 — but the dominant cause is almost always a single-channel anomaly concentrated in a small number of transactions.

This matters because the two causes demand completely different responses. A mix shift is strategic: the business is quietly becoming more dependent on a lower-margin channel, and the response is a deliberate policy conversation about which channel you want to grow and which you want to cap. A channel event is mechanical: one or two transactions went wrong, and the response is a corrective journal entry and a tighter cutoff process.

Most business owners — and, frankly, most accountants — respond to every margin drop as if it were structural. That's what produces the expensive quarter-long misadventures. The 60-minute test stops the bleeding before it starts.

## What to Do With the Answer

Once the decomposition tells you which cause dominates, the response is almost automatic.

**If the channel margin effect dominates (structural channel problem):** Pull the invoice-level detail for the offending channel in the bad month. Sort by gross profit contribution. The answer will usually be in the top three to five transactions. Look for mispricing, cost allocation errors, or cutoff mismatches before assuming the underlying economics have changed.

**If the channel margin effect dominates but the detail shows no single driver:** Now you may have a real structural issue. This is where repricing, cost renegotiation, or mix management makes sense — and you'll have confidence going in that you're not chasing an accounting ghost.

**If the mix effect dominates (more revenue came from your lower-margin channel):** The channels themselves are fine; you're just selling more of the less profitable one. The response is a strategic conversation about [whether the intercompany markup or channel pricing should be adjusted](/blog/intercompany-markup-dial-multi-entity) to rebalance. This isn't an urgent operational fix — it's a partner-level policy decision that can unfold over weeks.

**If both effects are meaningful:** Handle the channel event first (it's usually isolatable to specific transactions and correctable within days), then schedule the mix conversation separately so it gets the strategic attention it deserves instead of being tangled up with an accounting cleanup.

## The Monday Morning After

The owner of that marine distributor walked into his office on a Monday knowing three things he hadn't known on Friday: which channel the problem was in, which specific transactions had caused it, and that his supplier relationships were fine. He cancelled the cost-reduction offsite he had scheduled for the following week. He called his controller and asked her to tighten the cutoff process. Then he went back to running the business he actually wanted to run — growing the external customer count, managing the intercompany relationship consciously, and presenting his banker with numbers he believed in.

The test itself took ninety minutes, including the invoice-level follow-up. The clarity lasted a quarter. That tradeoff — an hour of analysis for a quarter of confident decisions — is the one most small businesses never realize is available to them. This is the kind of clarity that does not come from a monthly financial statement. [Read how accounting becomes an ROI center](/about).

## Frequently Asked Questions

**What if my business doesn't have a fixed internal markup to anchor on?**
Use whichever channel has the most stable pricing. For a contractor, it might be government contracts priced off a published schedule. For a dental practice, it might be a capitated insurance panel. For a distributor, it might be a single large dealer on a locked-in contract. The anchor doesn't have to be internal — it just has to be a channel where you genuinely know the gross margin within a few points.

**How do I know if a month-over-month margin drop is big enough to investigate?**
A useful rule of thumb: any drop greater than 5 percentage points in blended gross margin, or any month where blended gross margin falls below two-thirds of the trailing six-month average. Smaller drops usually fall within normal business noise. Larger drops almost always repay the hour of investigation, even if the result is "we confirmed it's normal volatility" — because confirming it's normal is itself valuable information.

**What counts as "seasonal" and how do I rule it out?**
True seasonality shows up the same way every year — Q1 is weak because your customers are on vacation, December is heavy because of year-end buying. The cleanest seasonality test is a same-month year-over-year comparison: if December 2026 is 15 points below November 2026 but the same 15 points below November 2025, that's seasonal. If December 2026 is also 15 points below December 2025, that's structural or channel.

**How often should I run this test?**
Not monthly — it's a diagnostic tool, not a routine report. Run it whenever a blended gross margin drop triggers your attention (either a rule-of-thumb threshold or an instinct that something looks wrong). For most multi-channel businesses, that's one or two times per year. The value is in having the test ready when you need it, not in running it for its own sake.

---

*Disclaimer: This article is for informational purposes only and does not constitute tax, legal, or financial advice. Tax situations vary — consult a qualified tax professional for advice specific to your circumstances. Practice examples are anonymized composites based on real client data; identifying details have been changed.*
