---
title: "Session 7: Reading the Numbers"
description: "Getting the right number is only half the work; the other half is not drawing the wrong conclusion from it. This session covers asking a question rather than fishing, telling trend from seasonality, why correlation is not causation, and the sample-size honesty that separates analysis people act on from analysis they laugh at."
date: "2026-09-12"
class_slug: "data-analytics"
---

Getting the right number is only half the work; the other half is not drawing the wrong conclusion from it. This session covers asking a question rather than fishing, telling trend from seasonality, why correlation is not causation, and the sample-size honesty that separates analysis people act on from analysis they laugh at.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Start from a question rather than from the data

- Separate a real trend from seasonality and noise

- Choose a baseline that makes a comparison meaningful

- Explain why correlation does not establish causation

- Recognise when a sample is too small to support a claim

- State the limits of what your data can show

## The taught content

### Ask a question before you look

There are two ways to approach a dataset, and they produce very different results. The first is to **ask a question and then look**: **is out-of-state revenue growing faster than in-state?** The second is to open the file, pivot everything, and see what turns up. The second feels productive and it is how most false findings are made.

The reason is that a dataset of 1,200 rows contains enough combinations that **something will always look significant**. Thirty products across three states across twelve months across several sales reps is thousands of possible comparisons, and in any large set of comparisons some will look dramatic purely by chance. Fishing through them until something appears exciting, then reporting that thing, is how a business ends up acting on noise.

So the discipline is to **write the question down before you look**, and to say what you would expect to see if the answer were yes. **If out-of-state is growing faster, then its monthly totals should rise while in-state stays flat.** Now the analysis has a test it can fail, which is the difference between an investigation and a hunt for something to say.

### Trend, seasonality and noise

A rising line is not automatically growth. Our distributor sells household goods, and demand for buckets, basins and containers moves with the **season** — building activity, the rains, the December rush. A December spike is not a new trend; it is December, and it happens every year.

The fix is to **compare like with like**. Compare this December with last December rather than with November, which is called a year-on-year comparison and is the standard way to remove seasonality. Alternatively compare a **three-month moving average**, which smooths the monthly noise so an underlying direction becomes visible. Comparing a peak month with the month before it and calling the difference growth is one of the commonest errors in business reporting.

Then separate **signal from noise** by asking whether the change is bigger than the usual wobble. If monthly revenue normally varies by plus or minus 8 per cent and this month is up 5 per cent, that is not a change — it is a normal month. Establishing the normal range first is what lets you say something is genuinely different, and it takes one pivot table.

### Correlation is not causation

Two things moving together does not mean one causes the other, and in business data the reason is usually a **third variable driving both**. Our data offers a clean example: larger orders appear to have lower margin percentages. The tempting conclusion is that big orders are less profitable, so we should discourage them.

But look at what else differs. Large orders are mostly **wholesale customers**, who receive volume discounts and buy in a different mix. The low margin is caused by the discount policy and the customer type, not by the order being large. **Customer type is the confounder**, and once you split the data by customer type the relationship largely disappears. Acting on the raw correlation would mean discouraging your best customers.

The other thing correlation cannot tell you is **direction**. If sales rep activity correlates with revenue, did activity drive revenue, or were the busiest territories assigned the most active reps? And sometimes both are caused by something unmeasured — a growing market lifts both. The discipline is to **name the alternative explanations before you present the finding**, because a manager will think of them, and it is far better that you raised them first.

### Sample size and the honesty it requires

Small samples produce wild numbers, and the numbers do not announce that they came from a small sample. If Oyo recorded three orders in a month and five the next, that is a 67 per cent increase — and it means nothing at all. **A percentage built on a handful of cases is noise wearing a costume.**

So **always report the count alongside the percentage**. **Conversion improved 50 per cent** is meaningless; **conversion improved from 2 of 40 to 3 of 40** is honest and obviously not worth a decision. Any figure resting on fewer than about thirty cases should be labelled as such, and any decision resting on it should wait for more data.

Related is **regression to the mean**: an unusually good or bad month is usually followed by a more ordinary one, simply because extremes are partly luck. Celebrating your best-ever month as a new baseline, or panicking about your worst, both mistake luck for change. And **selection effects** cut the other way — if you analyse only customers who still buy from you, you will conclude your customers are satisfied, because the dissatisfied ones stopped ordering and left your dataset. What is absent from the data is often the most important thing about it.

### What your data cannot tell you

Every analysis has limits, and stating them is a sign of competence rather than weakness. Our export records **orders placed**, not customers who looked and did not buy, so it cannot tell us why anyone declined. It has no competitor prices, so it cannot say whether our margins are good. It covers three states, so nothing in it supports a claim about the country. And it stops at the export date, so it knows nothing about this month.

Writing these down protects you and the decision. A manager who knows the analysis rests on twelve months of one distributor's orders in three states can weigh it appropriately; a manager who is not told will over-weight it, and when the recommendation fails the analysis gets blamed for something it never claimed.

The habit to build is a short **limitations** section on every piece of analysis: what the data covers, what it excludes, how many cases the conclusions rest on, and what would need to be true for the conclusion to be wrong. Four sentences. It makes your work more credible, not less, because the reader can see you understood what you were holding.

## Instructor demonstration

The instructor takes four plausible findings from the distributor's data and dismantles each one — a December spike mistaken for growth, a correlation that turns out to be a confounder, a dramatic percentage built on three orders, and a satisfaction conclusion drawn only from customers who kept buying — showing what the honest version of each finding looks like.

### Write the question before opening the data

Is out-of-state revenue growing faster than in-state? Explain that writing it down gives the analysis a test it can fail.02

### State what you would expect if the answer were yes

Out-of-state monthly totals rising while in-state stays flat. Explain that this is the difference between investigating and hunting for something to say.03

### Show a December spike and call it growth

Present the month-on-month jump. Explain that a household-goods distributor has seasonal demand and December spikes every year.04

### Compare December with December instead

Show the year-on-year figure. Explain that comparing like with like is how seasonality is removed.05

### Build a three-month moving average

Show the underlying direction become visible. Explain that smoothing separates trend from monthly wobble.06

### Establish the normal monthly range

Show the usual plus or minus 8 per cent. Explain that a 5 per cent move inside that range is a normal month, not a change.07

### Present the margin correlation

Show larger orders with lower margin percentages. Explain the tempting conclusion: big orders are less profitable, so discourage them.08

### Split by customer type

Show the relationship largely disappear. Explain that wholesale customers get volume discounts, so customer type was the confounder all along.09

### Say what acting on the raw correlation would have cost

Explain that discouraging large orders means discouraging your best customers, on the strength of a variable you had not separated out.10

### Show the direction problem

Sales rep activity against revenue. Explain that correlation cannot tell you which caused which, or whether both were driven by a growing market.11

### Present a 67 per cent increase

Oyo from three orders to five. Explain that the number does not announce it came from three cases.12

### Rewrite it with the count attached

From 3 to 5 orders. Explain that the honest version is obviously not worth a decision, and the count is what makes that visible.13

### Show regression to the mean

Take the best month and show the ordinary one after it. Explain that extremes are partly luck and are usually followed by something normal.14

### Analyse only active customers

Show a satisfaction conclusion. Explain the selection effect: dissatisfied customers stopped ordering and left the dataset.15

### List what the data cannot tell us

No lost customers, no competitor prices, three states, one distributor. Explain that stating limits makes the work more credible, not less.16

### Write the four-sentence limitations note

Coverage, exclusions, case counts, and what would have to be true for the conclusion to be wrong. Explain that this is what stops a manager over-weighting the finding.

## Guided practice

### Test four findings until only the true ones survive

You take four plausible findings from the distributor's data and subject each to the tests in this session — seasonality, confounders, sample size and selection — then rewrite the survivors with counts, baselines and limitations attached.

1. 01Write your question down before opening the data.

2. 02State what you would expect to see if the answer were yes.

3. 03Identify your strongest apparent trend in the monthly figures.

4. 04Test it year-on-year rather than month-on-month.

5. 05Build a three-month moving average and see whether the trend survives.

6. 06Establish the normal monthly range and state whether your change exceeds it.

7. 07Identify one correlation in the data that looks actionable.

8. 08Name at least two alternative explanations for it.

9. 09Split the data by the most likely confounding variable.

10. 10State whether the relationship survives the split.

11. 11Find one dramatic percentage and report the counts behind it.

12. 12Decide whether the case count is large enough to support a decision.

13. 13Identify one group missing from the data and say what its absence hides.

14. 14Check whether your best month is followed by an ordinary one, and explain why.

15. 15Rewrite each surviving finding with its baseline, count and direction stated.

16. 16Write a four-sentence limitations note: coverage, exclusions, case counts, and what would falsify the conclusion.

17. 17State plainly which of your four original findings did not survive, and why.

The standard we hold you to

Four findings each tested rather than reported: a question written before the data was opened with the expected pattern stated, the strongest trend tested year-on-year and against a three-month moving average with the normal monthly range established and the change judged against it, one correlation examined with at least two alternative explanations named and the data split by the most likely confounder with a stated verdict on whether it survived, one dramatic percentage reported with its underlying counts and a judgement on whether the case count supports a decision, one group missing from the data identified with what its absence hides, and the best month checked against the one after it with regression to the mean explained; each surviving finding rewritten with baseline, count and direction, a four-sentence limitations note covering coverage, exclusions, case counts and falsification, and a plain statement of which original findings did not survive and why.

## Common mistakes and how to fix them

You explore until something looks significant

Fix: Write the question and the expected pattern first. With thousands of possible comparisons in this data, something will always look dramatic by chance, and reporting it is reporting noise.

You call a December spike growth

Fix: Compare with December last year, or use a three-month moving average. Seasonal demand rises every year and month-on-month comparison turns that into a false trend.

You treat a small monthly change as a shift

Fix: Establish the normal range first. If monthly revenue usually moves plus or minus 8 per cent, a 5 per cent change is a normal month and not a finding.

You act on a correlation

Fix: Name the alternatives and split by the likely confounder. Larger orders looked less profitable until customer type was separated out, and acting on the raw finding would have meant discouraging your best customers.

You report a percentage without its count

Fix: Always attach the count. A 67 per cent increase from three orders to five is noise, and the count is what makes that obvious to the reader.

You base a decision on a handful of cases

Fix: Label small samples and wait for more data. Anything under roughly thirty cases should be flagged, and a decision resting on it should be deferred.

You read the best month as the new baseline

Fix: Expect regression to the mean. Extremes are partly luck and are usually followed by something ordinary, so neither the best nor the worst month is a trend.

You analyse only the customers still buying

Fix: Name what is missing. The dissatisfied customers stopped ordering and left the dataset, so analysing who remains will always look like satisfaction.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Write the question and the expected pattern before you open the file. A dataset this size contains thousands of possible comparisons, so something will always look dramatic by chance — and the only defence is having decided in advance what you were testing.

- Compare like with like. December against December, or a three-month moving average, because seasonal demand rises every year and a month-on-month comparison turns that into a trend that does not exist.

- Name the confounder before your audience does. Larger orders looked less profitable until customer type was separated out; presenting the split yourself makes the finding stronger, while being caught without it makes every other finding suspect.

- Report the count with every percentage and state your limitations in four sentences. Coverage, exclusions, case counts, and what would falsify the conclusion — it makes the work more credible, not less, because the reader can see you knew what you were holding.

## Key termsFishingExploring until something looks significant. With many possible comparisons, chance always produces something dramatic.SeasonalityA repeating annual pattern. Removed by year-on-year comparison or a moving average.Moving averageThe mean of the last few periods, recalculated each period. Smooths noise so an underlying trend shows.CorrelationTwo things moving together. Says nothing about cause, and nothing about which direction it runs.ConfounderA third variable driving both things in a correlation. Splitting by it is the test.Regression to the meanAn extreme value being followed by a more ordinary one because extremes are partly luck.Selection effectWhen the data only contains a non-random group — such as customers who kept buying — making conclusions about everyone else invalid.Limitations noteCoverage, exclusions, case counts and what would falsify the conclusion. Four sentences that make analysis credible.

## Homework before the next session

Test one trend year-on-year

Take a month that looks like growth, compare it with the same month last year, and build a three-month moving average. State whether the trend survives.

Break one of your own correlations

Find a relationship in the data, name two alternative explanations, split by the likely confounder, and report honestly whether it held.

Attach counts to five percentages

Find five percentages in any report and write the underlying counts beside them. Note how many stop looking important.

Write a limitations note for the dashboard

Four sentences: what the data covers, what it excludes, how many cases the conclusions rest on, and what would have to be true for them to be wrong.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Questioning | Analyses the data. | Question written before the data was opened with the expected pattern stated, giving the analysis something it could fail. |
| Trend handling | Identifies a trend. | Tested year-on-year and against a moving average, the normal monthly range established, and the change judged against it rather than against the previous month. |
| Causal reasoning | Notes a relationship. | At least two alternative explanations named, the data split by the likely confounder, and a stated verdict on whether the relationship survived. |
| Statistical honesty | Reports figures accurately. | Counts attached to every percentage, small samples labelled, regression to the mean recognised, and no decision recommended on a handful of cases. |
| Stating limits | Mentions caveats. | A four-sentence limitations note covering coverage, exclusions, case counts and falsification, plus a plain statement of which findings did not survive. |

## Session questionsHow do I tell a real trend from a seasonal spike?+

Compare with the same period last year rather than the previous month, and build a three-month moving average to smooth the wobble. A household-goods distributor spikes every December, so a month-on-month comparison turns a repeating pattern into a trend that does not exist.My data shows two things moving together. Can I say one causes the other?+

No. Name at least two alternative explanations, then split the data by the most likely confounding variable and see whether the relationship survives. In our data, larger orders looked less profitable until customer type was separated out — the discount policy was the real cause.How small is too small for a percentage?+

Under about thirty cases, treat it as noise and say so. Three orders becoming five is a 67 per cent increase that means nothing. Always report the count beside the percentage — it is what lets the reader see whether a decision is warranted.Why does stating limitations make my analysis better?+

Because it lets the reader weigh the finding correctly. A manager who knows the analysis rests on twelve months of one distributor's orders in three states can judge it; one who is not told will over-weight it, and blame the analysis when the recommendation fails.What is the most commonly missed problem in business data?+

Selection. If you analyse only the customers who still buy from you, you will conclude your customers are satisfied, because the dissatisfied ones stopped ordering and left your dataset. What is absent from the data is often the most important thing about it.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session6: Dashboards](https://www.cea.ng/classes/data-analytics/dashboards)[Next session 8: Storytelling & Final Project](https://www.cea.ng/classes/data-analytics/storytelling-final-project)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
