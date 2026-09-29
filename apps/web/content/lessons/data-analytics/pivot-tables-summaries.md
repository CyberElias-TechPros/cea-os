---
title: "Session 4: Pivot Tables & Summaries"
description: "A pivot table answers a grouping question in seconds and rebuilds itself when the question changes. This session covers building them properly, grouping dates and values, calculated fields, the value options that turn a total into an insight, and the summary statistics that stop a single large order from misleading you."
date: "2026-09-12"
class_slug: "data-analytics"
---

A pivot table answers a grouping question in seconds and rebuilds itself when the question changes. This session covers building them properly, grouping dates and values, calculated fields, the value options that turn a total into an insight, and the summary statistics that stop a single large order from misleading you.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Build a pivot table on data that is actually ready for one

- Use the Rows, Columns, Values and Filters areas deliberately

- Group dates by month and numbers into bands

- Add calculated fields and know where they mislead

- Use % of total and running totals to answer better questions

- Report median alongside mean when the data is skewed

## The taught content

### What a pivot table actually is

A pivot table is a **grouped total that you can rebuild without touching the data**. Ask it for revenue by state and it groups 1,200 rows into three; drag Product into Rows instead and it groups them into thirty. The source sheet is never modified, which is why a pivot table is safe in a way that a hundred manual SUMIF formulas are not.

That rebuilding is the whole value. Analysis is a conversation — a manager hears **Lagos is 61 per cent of revenue** and immediately asks **and which products?** A pivot table answers in two seconds by dragging one field. If your analysis is a fixed grid of formulas, every follow-up question is new work, which is why people stop asking.

The requirement is that **the data must be ready**, and this is where the last three sessions pay off. A pivot table needs tidy data: one header row, no blank rows or columns inside the data, no merged cells, no total rows, and real dates rather than text. Pivot on our raw export and **LAGOS**, **Lagos** and **Lagos State** appear as three states, and you will report three figures for one state with complete confidence.

### The four areas, used deliberately

Every pivot table has four areas and each has a specific job. **Rows** holds what you are grouping by — State, Product, SalesRep. **Values** holds what you are measuring — the sum of LineTotal, the count of orders. **Columns** splits each row into sub-columns — State in Rows with Month in Columns gives you a grid of state by month. **Filters** restricts the whole table — one sales rep, one quarter.

The mistake to avoid is dragging fields around until something looks right. Decide the **question** first, then place the fields: the thing you are grouping by goes in Rows, the thing you are measuring goes in Values. **Which products sell most in Ogun?** puts Product in Rows, LineTotal in Values, and Ogun in Filters.

Then a detail that catches everyone: **drag a text field into Values and you get a Count, not a Sum**. Excel chooses for you based on type. If you drag Product into Values expecting quantities, you will get the number of order lines containing that product — which is a different and usually useless number. Always check **Value Field Settings** to confirm you are summing what you think you are.

### Refreshing, grouping and calculated fields

The first thing to know is that **pivot tables do not update automatically**. They read from a cached copy of the data, so when you add rows or change a value you must **right-click and Refresh** — or use Data, Refresh All. A report that quietly shows last month's numbers because nobody refreshed is a very common failure, and it is invisible unless you check the row count.

**Grouping** is what turns raw fields into useful ones. Select any date in the pivot and choose **Group**, and you can group by month, quarter or year — which is why the dates had to be real dates, since text dates cannot be grouped at all. You can also group **numbers into bands**: select the UnitPrice values and group into ranges of 5,000, and a list of thirty products becomes five price bands you can actually reason about.

**Calculated fields** add a new measure built from existing ones — Profit as LineTotal minus cost, or margin as a ratio. They are useful, with one trap worth memorising: **a calculated field operates on the summed values, not row by row**. So a **margin percentage** calculated field computes total profit divided by total revenue, which is a weighted average and usually what you want — but it will not give you the average of the individual row margins, and if you expected that, your number is wrong. Compute percentages in a column on the source data when you need the row-level version.

### Value options that turn totals into insight

Value Field Settings offers far more than Sum, and the extras answer better questions. **% of Grand Total** turns **Lagos is 4.2 million** into **Lagos is 61 per cent of revenue**, which is what a manager can act on. **% of Column Total** shows the product mix within each state, revealing that Ogun buys mostly buckets while Lagos buys across the range.

**Running Total In** turns monthly figures into a cumulative line, which is how you see whether the year is tracking ahead or behind. **Difference From** compares each month with the previous one, which is what **are we growing?** actually means. **Rank** shows which products are first, second and third without sorting anything.

The habit to build is asking **which denominator makes this number meaningful**. A raw total answers **how much**; a percentage answers **how important**; a change answers **which way**. Most analysis that fails to persuade anyone is analysis that reported a total when the reader needed a comparison.

### Summary statistics, and when the mean lies

Three numbers describe a set of values and they answer different questions. The **mean** is the total divided by the count and is what most people mean by average. The **median** is the middle value when sorted. The **mode** is the most common. For symmetrical data they are close; for business data they usually are not.

Our order values are **skewed**, because a few large wholesale orders dwarf the many small retail ones. If the mean order value is 38,000 naira but the median is 9,500, then reporting the mean tells a manager that a typical order is 38,000 — and almost every order is far below that. **The mean is being pulled up by a handful of large orders.** The median describes the typical order; the mean describes the total. Both are true and they answer different questions.

So report the median whenever you say **typical**, and be suspicious of any mean on money data until you have looked at the distribution. A quick way to see the problem is the **spread**: compare minimum, maximum, median and mean. If the maximum is fifty times the median, the mean is not describing a typical anything, and a single chart of the distribution will show a manager more than any average could.

## Instructor demonstration

The instructor builds a series of pivot tables on the cleaned export to answer the questions a manager would actually ask about this business, showing the refresh trap, date grouping, the text-in-Values problem, calculated fields, % of total, and why the mean order value is actively misleading here.

### Select the cleaned table and insert a pivot table

Use the table reference rather than a fixed range. Explain that a fixed range silently excludes rows added later.02

### Put State in Rows and LineTotal in Values

Show three states. Explain that this works only because State was standardised; on the raw export it would show nine.03

### Check Value Field Settings

Confirm it says Sum. Explain that Excel chooses based on type and that assuming is how wrong totals get published.04

### Drag Product into Values by mistake

Show it returns Count. Explain that a text field in Values counts occurrences, which is a different and usually useless number.05

### Add OrderDate to Columns

Show daily columns, which is unreadable. Explain that this is why grouping exists.06

### Group the dates by month

Right-click, Group, Months. Explain that this is only possible because the dates are real dates, not text.07

### Add quarter grouping as a second level

Show months nested in quarters. Explain that grouping is reversible and never changes the source data.08

### Add a row to the source data and look at the pivot

Show it unchanged. Explain the refresh trap: pivot tables cache their data and a report can quietly show last month's numbers.09

### Refresh and confirm the row count

Right-click, Refresh, and check the count matches the source. Explain that checking the count is the habit that catches a stale report.10

### Add a Profit calculated field

LineTotal minus quantity times cost. Explain that calculated fields work on summed values, which is usually what you want.11

### Show the margin percentage trap

Compare a calculated-field margin against the average of the row margins. Explain they differ, and that knowing which you computed matters.12

### Switch LineTotal to % of Grand Total

Show Lagos become 61 per cent. Explain that a percentage answers how important, which a raw total does not.13

### Use % of Column Total for product mix by state

Show that Ogun buys mostly one category. Explain that this reveals a difference no total could show.14

### Set a running total across months

Explain that cumulative figures show whether the year is tracking ahead, which is the question behind are we growing.15

### Add average order value beside the sum

Show the mean at roughly 38,000 naira. Explain that this is the number that will mislead a manager.16

### Add the median order value

Show roughly 9,500 naira. Explain that the mean is pulled up by a few wholesale orders and the median describes a typical order.17

### Compare MIN, MAX, median and mean

Show the maximum at fifty times the median. Explain that when the spread is that wide the mean describes no typical anything.

## Guided practice

### Answer the questions a manager would ask

You build a set of pivot tables on the cleaned export that answer real questions about this business, using grouping, calculated fields and percentage views, and you report order value using the statistic that actually describes a typical order.

1. 01Convert the cleaned data to a table and build the pivot from the table reference.

2. 02Show revenue by state and confirm exactly three states appear.

3. 03Verify Value Field Settings says Sum rather than Count on every value field.

4. 04Add months and nest them in quarters using date grouping.

5. 05Show revenue by product and identify the top five.

6. 06Build a state-by-month grid with State in Rows and Month in Columns.

7. 07Add a Profit calculated field and state what it is computed from.

8. 08Compute margin both as a calculated field and as the average of row margins, and explain the difference.

9. 09Switch revenue to % of Grand Total and record each state's share.

10. 10Use % of Column Total to describe the product mix within each state.

11. 11Add a running total across months and state whether the year is tracking ahead.

12. 12Add average order value and record the mean.

13. 13Add median order value and record the median.

14. 14Record MIN, MAX, mean and median for order value together.

15. 15State in one sentence which statistic describes a typical order and why.

16. 16Add a row to the source data, refresh, and confirm the pivot row count matches.

17. 17Write the five findings these tables produced, each in one sentence.

The standard we hold you to

A set of pivot tables built from a table reference answering real business questions: revenue by state confirming exactly three states, Value Field Settings verified as Sum on every value field, months nested in quarters by date grouping, revenue by product with the top five identified, a state-by-month grid, a Profit calculated field with its inputs stated, margin computed both as a calculated field and as the average of row margins with the difference explained, revenue shown as % of Grand Total with each state's share recorded, % of Column Total used to describe product mix within each state, a running total across months with a stated view on whether the year is tracking ahead, and mean, median, MIN and MAX for order value recorded together with one sentence identifying which statistic describes a typical order and why; a source row added and the pivot refreshed with the row count confirmed to match; and five findings written as one sentence each.

## Common mistakes and how to fix them

You pivot data that was never cleaned

Fix: Clean first. LAGOS, Lagos and Lagos State appear as three states, and you will report three figures for one state with complete confidence in all of them.

Your pivot shows last month's numbers

Fix: Refresh and check the row count. Pivot tables cache their data and never update automatically, so a stale report looks identical to a current one.

You dragged a text field into Values

Fix: Check Value Field Settings. Excel gives you a Count for text and a Sum for numbers, and a count of order lines is a different number from the revenue you meant.

You cannot group dates by month

Fix: Convert the dates to real dates. Text dates cannot be grouped at all, so the option is simply unavailable and the pivot stays unreadably granular.

You built on a fixed range

Fix: Use a table reference. A fixed range like A1:L1200 silently excludes every row added afterwards, and the totals stay plausible while being wrong.

Your margin calculated field disagrees with your column

Fix: Know which you computed. A calculated field works on summed values, giving a weighted average, while the average of row margins weights every order equally. Neither is wrong; they are different questions.

You report the mean order value as typical

Fix: Report the median. A few large wholesale orders pull the mean far above what almost every order actually is, and a manager acting on the mean will misjudge the business.

You report totals when the reader needs comparisons

Fix: Ask which denominator makes the number meaningful. A total says how much, a percentage says how important, and a change says which way — most unpersuasive analysis reported the wrong one.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Build pivots from a table reference, never a fixed range. A fixed range silently excludes rows added later, and the resulting totals stay plausible while being wrong — the hardest kind of error to catch.

- Refresh and check the row count every time. Pivot tables cache their data, so a report that was never refreshed looks exactly like a current one, and this is one of the commonest ways a wrong number reaches a manager.

- Report the median for anything you call typical. Order values are skewed by a few large wholesale orders, so the mean describes the total while the median describes the usual order — and only one of them is what the word typical means.

- Choose the denominator deliberately: % of Grand Total for importance, % of Column Total for mix, Difference From for direction. A raw total answers how much and almost nobody acts on that alone.

## Key termsPivot tableA grouped total rebuilt on demand without altering the source. Answers follow-up questions in seconds.Pivot cacheThe stored copy a pivot reads from. Why refreshing is required and why a stale report looks current.Value Field SettingsWhere Sum, Count, Average and the percentage options live. Confirms you are measuring what you think.GroupingCombining dates into months or quarters, or numbers into bands. Requires real dates, not text.Calculated fieldA new measure built from existing ones. Operates on summed values, giving a weighted rather than row-level result.% of Grand TotalEach value as a share of the whole. Turns how much into how important.Running totalA cumulative figure across a period. Shows whether the year is tracking ahead or behind.Skewed dataA few extreme values pulling the mean away from the median. The reason typical should mean median.

## Homework before the next session

Build five pivot tables on the cleaned export

Revenue by state, revenue by product, state by month, product mix within each state, and order count by sales rep. Each should answer a question you can state in one sentence.

Prove the refresh trap to yourself

Build a pivot, add a large order to the source, and look at the pivot before and after refreshing. Note how identical a stale report looks to a correct one.

Compare mean and median on a real column

Record MIN, MAX, mean and median together. Write one sentence on what the gap between mean and median tells you about that data.

Turn one total into a percentage and a change

Take any total, show it as % of Grand Total and as Difference From the previous month, and write which of the three a manager would act on.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Construction | Builds a working pivot table. | Built from a table reference on cleaned tidy data, Value Field Settings verified on every field, and exactly the expected categories appearing. |
| Grouping | Groups by a field. | Dates grouped to months nested in quarters and numbers grouped into bands, working because the underlying values are real dates and numbers. |
| Calculated measures | Adds a calculated field. | Profit and margin added with inputs stated, and the difference between a calculated-field margin and the average of row margins explained rather than discovered by accident. |
| Choosing the view | Shows totals. | % of Grand Total, % of Column Total and running totals used where each answers the question better, with the denominator chosen deliberately. |
| Statistical honesty | Reports an average. | Mean, median, MIN and MAX reported together, the skew identified, and a stated judgement about which statistic describes a typical order. |

## Session questionsMy pivot table did not change after I edited the data. Why?+

Pivot tables read from a cached copy and never update automatically. Right-click and choose Refresh, or Data then Refresh All. Then check the row count matches your source — a stale report looks identical to a current one.Why does my Values area show a count instead of a total?+

You dragged a text field into Values. Excel picks Sum for numbers and Count for text. Open Value Field Settings and change it — but check first, because counting order lines is a genuinely different number from summing revenue.The Group option is greyed out on my dates.+

The dates are stored as text. Grouping needs real dates, which are numbers underneath. Convert them explicitly as we did in the cleaning session, then grouping by month and quarter becomes available.Should I report the average or the median order value?+

Report both, and use the median whenever you say typical. Our mean is pulled far above the median by a few large wholesale orders, so the mean describes the total while the median describes the usual order. A manager acting on the mean will misjudge the business.My pivot totals do not match my SUMIFS formula. Which is right?+

Neither, until you know why. Usually it is a fixed pivot range that excluded new rows, a filter left applied, or a stale cache. Refresh, check the row count and clear the filters — and if they still disagree, that difference is worth understanding before you report either.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: Formulas & Lookups](https://www.cea.ng/classes/data-analytics/formulas-lookups)[Next session 5: Choosing & Building Charts](https://www.cea.ng/classes/data-analytics/charts)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
