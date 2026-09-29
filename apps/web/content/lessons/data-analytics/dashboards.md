---
title: "Session 6: Dashboards"
description: "A dashboard answers the questions a business asks every week, on one screen, without anyone rebuilding anything. This session covers layout, slicers and filters connected across several pivot tables, conditional formatting that informs rather than decorates, and keeping a workbook fast enough that people actually open it."
date: "2026-09-12"
class_slug: "data-analytics"
---

A dashboard answers the questions a business asks every week, on one screen, without anyone rebuilding anything. This session covers layout, slicers and filters connected across several pivot tables, conditional formatting that informs rather than decorates, and keeping a workbook fast enough that people actually open it.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Design a one-screen layout that guides the eye to the answer

- Connect slicers and timelines to multiple pivot tables

- Use conditional formatting to show status at a glance

- Keep a dashboard reading from one source of truth

- Make a workbook fast enough that people use it

- Build a dashboard someone else can operate without you

## The taught content

### What a dashboard is for

A dashboard is not a collection of charts; it is **the answer to the questions this business asks repeatedly**, arranged so they can be read in one screen. For our distributor those questions are fixed and known: how much did we sell this month, how does that compare with last month, which states and products are carrying it, and is anything out of line. If a chart does not answer one of those questions, it does not belong.

The defining constraint is **one screen, no scrolling**. This is not an aesthetic preference. A dashboard that requires scrolling is a report, and reports get read once while dashboards get consulted weekly — the difference in value is enormous, and it comes entirely from whether the reader can take it in at a glance.

The second requirement is that **someone else can operate it**. A dashboard only you can use is a personal worksheet. That means slicers rather than hidden filters, labels rather than memory, and no step that requires knowing which cell to click. Test it by handing it to someone who has never seen it and watching whether they can answer a question unaided.

### Layout: where the eye goes

Readers scan a page in an **F pattern** — across the top, then down the left, then across again. So the most important number goes **top-left**, and importance decreases as you move right and down. For our distributor that means the headline figures across the top: revenue this month, change against last month, order count, average order value.

The standard structure is three bands. **Top: the headline numbers**, large and unambiguous, each with its comparison. **Middle: the two or three charts that explain them** — revenue by state, revenue by month, top products. **Bottom: the detail**, a small table of the figures behind the charts for anyone who needs to read an exact value.

Two details matter more than they seem. **Group related things together** and leave clear space between groups, because proximity is how a reader understands what belongs with what. And **align everything to a grid** — misaligned charts read as careless, and a reader who distrusts the layout quietly distrusts the numbers, which is exactly the reaction you cannot afford in a document meant to drive decisions.

### Slicers, timelines and connecting them

**Slicers** are visible filter buttons, and they are what make a dashboard operable by someone who is not you. Insert one for State and one for Product, and a manager can answer **how does Ogun look on its own?** by clicking, without knowing that a pivot table exists. **Timelines** are the date equivalent — a slider over months and quarters — and they are far easier to use than a date filter.

The important technical step is **connecting one slicer to several pivot tables**. By default a slicer controls only the pivot it was created from, so clicking Lagos filters one chart and leaves the others showing all states — which produces a dashboard that contradicts itself, the worst failure mode there is. Right-click the slicer, choose **Report Connections**, and tick every pivot table it should control.

Then keep the filters **visible and reset**. A slicer left set to one state by the last reader will silently show the next reader a partial picture that looks complete, so put a clear **reset** instruction on the sheet and check the slicer state before you trust any figure. This is a small discipline and it prevents a genuinely common wrong decision.

### Conditional formatting that informs

Conditional formatting shows status without a chart. **Data bars** inside a column turn a list of product revenues into an instant ranking. **Colour scales** show a gradient across a table, which is how you spot an outlier in a grid of numbers. **Icon sets** flag status — green, amber, red against a target — which is what a manager scans for.

The discipline is that **colour must never be the only signal**. Roughly one man in twelve has some colour vision deficiency, and a red-versus-green scheme is invisible to them. So pair colour with a **number, an arrow or a text label**: show **-12 per cent** alongside the red, not just the red. This is the same principle as accessible web design, and it costs nothing.

The other rule is **restraint**. Colour everywhere means colour nowhere: if every cell is shaded, nothing stands out, and the reader gets no signal at all. Use conditional formatting to answer one question per table — **which of these is behind target?** — and leave everything else plain. A dashboard covered in rainbow gradients looks busy and communicates nothing.

### One source of truth, and keeping it fast

Every figure on a dashboard must come from **one place**. If revenue appears in a chart, in a KPI cell and in a summary table, all three must read the same cleaned table — not three copies that were pasted at different times. The failure this prevents is a dashboard where the headline says 4.2 million and the chart underneath says 4.1, and the reader stops believing either.

Speed matters because **a slow dashboard does not get opened**, and an unopened dashboard has no value however good it is. The main causes are predictable: **whole-column references** like A:A that scan a million rows, **volatile functions** such as OFFSET, INDIRECT, TODAY and RAND that recalculate on every change, and **many pivot tables each holding their own cache** of the same data.

The fixes are straightforward. Reference the **table** rather than whole columns. Use **INDEX and MATCH instead of OFFSET** where you need a dynamic range. Keep pivot tables reading from **one shared source**. And turn calculation to manual while you are building, recalculating when you need to. A dashboard that opens in two seconds gets used weekly; one that takes thirty seconds gets closed and forgotten.

## Instructor demonstration

The instructor assembles the pivot tables and charts from the previous sessions into a single-screen dashboard for the distributor, connecting slicers across every pivot, adding conditional formatting with a non-colour signal, proving the one-source-of-truth rule by breaking it, and measuring what makes the file slow.

### Write the questions the business asks weekly

List them before building anything. Explain that a chart answering none of these does not belong on the dashboard.02

### Set up a dedicated dashboard sheet

Separate from the data and the pivots. Explain that mixing them is why most dashboards become unmaintainable.03

### Place the headline numbers top-left

Revenue, change, order count, order value. Explain the F pattern and that importance decreases right and down.04

### Add each headline's comparison

Show this month against last. Explain that a number without a comparison is not information.05

### Add the two or three explaining charts in the middle band

Revenue by state, revenue by month, top products. Explain that the middle band explains the headline rather than repeating it.06

### Add a detail table at the bottom

The exact figures behind the charts. Explain that charts show patterns while tables give values, and a dashboard needs both.07

### Insert a State slicer

Click Lagos and watch one chart change. Explain that by default a slicer controls only its own pivot table.08

### Connect the slicer to every pivot

Right-click, Report Connections, tick them all. Explain that a dashboard contradicting itself is the worst failure mode there is.09

### Add a timeline for months

Show it filtering every chart at once. Explain that a timeline is far easier to use than a date filter dropdown.10

### Leave a slicer set and reload the file

Show the partial picture it presents. Explain that the next reader sees a filtered dashboard that looks complete, so reset instructions are necessary.11

### Add data bars to the product table

Explain that data bars turn a list of numbers into an instant ranking without a chart.12

### Add icon sets against a target

Explain that managers scan for status, and green-amber-red is what they scan for.13

### Show the colour-only failure

Simulate colour vision deficiency. Explain that one man in twelve is affected and red-green is invisible to them.14

### Add numbers and arrows beside the colours

Show minus 12 per cent alongside the red. Explain that colour must never be the only signal.15

### Break the one-source rule on purpose

Paste a revenue figure as a static value, change the data, and show the dashboard disagree with itself. Explain that a reader who spots one inconsistency stops believing all of it.16

### Restore the link and confirm agreement

Explain that every figure on a dashboard must read from the same cleaned table.17

### Time the file opening and recalculating

Record the seconds. Explain that a slow dashboard does not get opened, and an unopened dashboard has no value.18

### Replace whole-column references with table references

Show the recalculation speed improve. Explain that A:A scans a million rows to use a thousand.19

### Hand it to someone who has never seen it

Ask them to answer a question unaided. Explain that this is the only real test of whether a dashboard works.

## Guided practice

### Build the dashboard someone else can use

You assemble your pivots and charts into a single-screen dashboard for the distributor, with slicers connected across every pivot, conditional formatting carrying a non-colour signal, every figure reading from one source, and a recorded opening time — then you test it on someone who has never seen it.

1. 01Write the four or five questions this business asks every week.

2. 02Create a dedicated dashboard sheet separate from the data and the pivots.

3. 03Place the headline numbers top-left in an F-pattern layout.

4. 04Give every headline number a comparison against the previous period.

5. 05Add the two or three charts that explain the headline numbers.

6. 06Add a detail table at the bottom with the exact figures behind the charts.

7. 07Insert slicers for State and Product and a timeline for months.

8. 08Connect each slicer to every pivot table via Report Connections.

9. 09Confirm one click filters every chart consistently, with no contradictions.

10. 10Write reset instructions on the sheet and check slicer state before trusting figures.

11. 11Add data bars to the product ranking table.

12. 12Add icon sets showing status against a target.

13. 13Add a number or arrow beside every colour so colour is never the only signal.

14. 14Remove conditional formatting from any table where it does not answer a question.

15. 15Confirm every figure on the dashboard reads from the same cleaned table.

16. 16Change one value in the source and verify every dependent figure updates.

17. 17Replace whole-column references with table references.

18. 18Record the opening and recalculation time, then improve it.

19. 19Give the dashboard to someone who has never seen it and watch them answer a question.

20. 20Fix whatever they struggled with.

The standard we hold you to

A single-screen dashboard with no scrolling, on its own sheet, whose four or five weekly questions were written before building; headline numbers top-left in an F-pattern layout, each with a comparison against the previous period; two or three explaining charts in the middle band and a detail table of exact figures below; State and Product slicers plus a month timeline, each connected to every pivot table via Report Connections and confirmed to filter all charts consistently with reset instructions written on the sheet; data bars on the product ranking, icon sets against a target, and a number or arrow beside every colour so colour is never the only signal, with formatting removed wherever it answers no question; every figure confirmed to read from the same cleaned table and verified by changing a source value and watching every dependent figure update; whole-column references replaced with table references and the opening and recalculation time recorded and improved; and the dashboard tested on someone who has never seen it, with whatever they struggled with fixed.

## Common mistakes and how to fix them

Your dashboard needs scrolling

Fix: Cut it to one screen. A dashboard requiring scrolling is a report, and reports are read once while dashboards are consulted weekly — that difference is the entire value.

One slicer filters one chart

Fix: Use Report Connections to link it to every pivot. A dashboard where the headline says Lagos and the chart shows all states contradicts itself, which is the worst failure mode there is.

A slicer left set misleads the next reader

Fix: Write reset instructions on the sheet and check slicer state before trusting a figure. A filtered dashboard looks complete, so the error is invisible to the person making the decision.

You signal status with colour alone

Fix: Add a number, arrow or label. About one man in twelve has colour vision deficiency and red-versus-green is invisible to them, so colour must never be the only signal.

Every cell is colour-formatted

Fix: Use it to answer one question per table. Colour everywhere means colour nowhere, and a reader gets no signal from a rainbow dashboard.

The headline and the chart disagree

Fix: Make everything read one source. Pasted static values drift from the data, and a reader who catches one inconsistency stops believing every number on the sheet.

The file takes thirty seconds to open

Fix: Replace whole-column references with table references, drop volatile functions, and share one pivot cache. A slow dashboard does not get opened, and an unopened dashboard has no value.

Only you can operate it

Fix: Test it on someone who has never seen it. Hidden filters and steps that depend on memory make a dashboard a personal worksheet rather than a business tool.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Write the weekly questions before you build anything. A dashboard is the answer to the questions a business asks repeatedly, and every chart that answers none of them is noise that costs the reader attention.

- Connect every slicer to every pivot through Report Connections. The default is one slicer per pivot, and a dashboard whose headline and chart disagree is worse than no dashboard, because someone will act on one of the two numbers.

- Never let colour be the only signal. Pair every red-amber-green indicator with a number, arrow or label — about one man in twelve has colour vision deficiency, and the fix costs nothing.

- Make it fast, then make it usable by someone else. A slow dashboard does not get opened and a dashboard only you can operate is a personal worksheet; both fail for the same reason, that nobody but you gets value from them.

## Key termsDashboardOne screen answering the questions a business asks repeatedly. No scrolling, and operable by someone else.SlicerA visible filter button. What makes a dashboard operable by someone who does not know pivot tables exist.TimelineA date slicer over months and quarters. Far easier to use than a date filter dropdown.Report ConnectionsWhere you link one slicer to many pivot tables. Skipping it produces a dashboard that contradicts itself.Conditional formattingData bars, colour scales and icon sets showing status at a glance. Must never rely on colour alone.One source of truthEvery figure reading the same cleaned table. Prevents the headline and the chart disagreeing.Volatile functionOFFSET, INDIRECT, TODAY, RAND — recalculates on every change and slows a workbook down.F patternHow readers scan: across the top, down the left, across again. Why the key number goes top-left.

## Homework before the next session

Write the weekly questions for a real business

Four or five questions someone actually asks every week. If you cannot name them, you do not yet know what the dashboard is for.

Connect one slicer to several pivot tables

Use Report Connections, then click it and confirm every chart changes together. Note what the dashboard looked like before, when the charts contradicted each other.

Add one conditional format with a non-colour signal

An icon set or data bar paired with a number or arrow. Then describe how it would read to someone who cannot distinguish red from green.

Time and improve one workbook

Record the opening and recalculation time, replace whole-column references with table references, and record the difference.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Purpose | Builds a dashboard with charts. | Weekly questions written first, every element answering one of them, and anything answering none removed. |
| Layout | Fits on a screen. | One screen with no scrolling, headline numbers top-left with comparisons, explaining charts in the middle, a detail table below, and everything aligned to a grid. |
| Interactivity | Adds slicers. | Slicers and a timeline connected to every pivot via Report Connections, confirmed to filter consistently, with reset instructions on the sheet. |
| Formatting and access | Uses conditional formatting. | Data bars and icon sets answering one question each, every colour paired with a number or arrow, and formatting removed wherever it communicates nothing. |
| Reliability and usability | The dashboard works. | Every figure reading one source and verified by changing a value, whole-column references replaced, opening time recorded and improved, and the dashboard tested on someone who has never seen it with their difficulties fixed. |

## Session questionsHow many charts should a dashboard have?+

As few as will answer the weekly questions — usually three or four plus the headline numbers. Every extra chart costs the reader attention, and a dashboard that needs scrolling has become a report, which gets read once instead of consulted weekly.My slicer only filters one chart. Why?+

That is the default: a slicer controls the pivot table it was created from. Right-click it, choose Report Connections, and tick every pivot table it should control. Until you do, the dashboard will contradict itself.Is conditional formatting with red and green acceptable?+

Only if colour is not the only signal. About one man in twelve has colour vision deficiency and red-versus-green is invisible to them, so pair the colour with a number, arrow or text label. The fix costs nothing.My dashboard is slow. What is causing it?+

Usually whole-column references like A:A, which scan a million rows to use a thousand, plus volatile functions such as OFFSET and INDIRECT that recalculate on every change, and multiple pivot tables each holding their own cache. Reference the table, use INDEX and MATCH, and share one source.How do I know my dashboard actually works?+

Give it to someone who has never seen it and ask them to answer one of the weekly questions unaided. Watch where they hesitate. That test finds the hidden filters, the unlabelled slicers and the layout problems that you cannot see any more because you built it.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: Choosing & Building Charts](https://www.cea.ng/classes/data-analytics/charts)[Next session 7: Reading the Numbers](https://www.cea.ng/classes/data-analytics/reading-numbers)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
