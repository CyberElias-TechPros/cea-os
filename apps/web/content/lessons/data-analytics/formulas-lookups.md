---
title: "Session 3: Formulas & Lookups"
description: "Once data is clean, formulas turn rows into answers. This session covers conditional logic with IF and IFS, lookups with VLOOKUP and XLOOKUP for combining datasets, date and text handling for real questions, and the errors every lookup eventually produces."
date: "2026-09-12"
class_slug: "data-analytics"
---

Once data is clean, formulas turn rows into answers. This session covers conditional logic with IF and IFS, lookups with VLOOKUP and XLOOKUP for combining datasets, date and text handling for real questions, and the errors every lookup eventually produces.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Use IF, IFS and nested conditions to classify rows

- Combine two tables with a lookup and choose the right function

- Handle dates to answer monthly, weekly and period questions

- Read and fix #N/A, #VALUE! and #REF! errors

- Use COUNTIFS and SUMIFS for grouped totals

- Know when a formula is the wrong tool and a pivot table is right

## The taught content

### Conditional logic

**`=IF(condition, value_if_true, value_if_false)`** is the basis of classification, and most analysis involves classifying rows. On our cleaned export, flagging large orders is one test: **`=IF(J2>50000, "Large", "Standard")`**. Marking whether an order is inside Lagos: **`=IF(E2="Lagos", "In-state", "Out-of-state")`** — which is immediately useful, because in-state and out-of-state orders have different delivery costs and different margins.

For more than two categories, **`=IFS()`** is cleaner than nesting IFs. Classifying order size into three bands reads far better as **`=IFS(J2>100000, "Tier 1", J2>50000, "Tier 2", TRUE, "Tier 3")`** than as nested IFs, and the final **`TRUE`** catches everything else — omit it and rows matching no condition return #N/A, which is a common and confusing surprise.

Then **`=COUNTIFS()`** and **`=SUMIFS()`**, which answer grouped questions directly without a pivot table: **`=SUMIFS(J:J, E:E, "Lagos", K:K, "Transfer")`** gives total revenue from Lagos paid by transfer, and **`=COUNTIFS(E:E, "Lagos", J:J, ">50000")`** counts the large Lagos orders. These are the fastest way to check a pivot table's answer, and being able to cross-check a number two different ways is worth a great deal when a manager is acting on it.

### Lookups: combining two tables

Real analysis almost always needs data that lives in another table. Our export has a Product name but no cost price; cost price sits in a separate **product master** table of thirty rows. To calculate margin you must pull the cost across, and that is what a lookup does: **find this value in that table, return the matching cell**.

**`=VLOOKUP(lookup_value, table_array, col_index, FALSE)`** is the classic, and the fourth argument matters more than any other detail in this course. **FALSE means exact match.** Omit it and VLOOKUP defaults to TRUE, which is an **approximate** match requiring the table to be sorted — and on unsorted data it silently returns the wrong row rather than an error. This single omitted argument is responsible for a great many confidently wrong spreadsheets.

**`=XLOOKUP(lookup_value, lookup_array, return_array)`** is the modern replacement, available in Excel 365 and Google Sheets. It defaults to exact match, it can look left as well as right, and it takes an argument for what to return when nothing is found: **`=XLOOKUP(A2, Products!A:A, Products!C:C, "Not in master")`**. If you have it, use it. VLOOKUP still matters because most existing spreadsheets and most job interviews use it, and because you will inherit files written with it.

### Dates and periods

Business questions are almost always about periods, so date functions are not a side topic. From a real date you can extract **`=YEAR(A2)`**, **`=MONTH(A2)`** and **`=DAY(A2)`**, which is how you group by month. **`=TEXT(A2, "yyyy-mm")`** produces a label like **2025-03** that sorts correctly and pivots cleanly — much better than a month number, which sorts 1, 10, 11, 12, 2.

**`=DATEDIF(start, end, "d")`** gives the days between two dates, and **`=NETWORKDAYS(start, end)`** gives working days, which is what you need for delivery-time questions. **`=EOMONTH(A2, 0)`** returns the last day of that month, useful for period boundaries, and **`=TODAY()`** lets a report age itself rather than sitting at a fixed date nobody updates.

The trap worth naming: **all of this only works on real dates**. If OrderDate is still text, YEAR returns an error or a nonsense number and grouping by month is simply unavailable. That is why session 2 rebuilt the dates explicitly — every period question in this course depends on that work having been done properly.

### Reading errors instead of hiding them

Errors are information, and the first instinct to wrap everything in IFERROR is exactly wrong. **#N/A from a lookup means the value was not found in the other table** — in our case, a product in the orders that is not in the product master. That is a genuine finding, and hiding it with IFERROR conceals a real data problem behind a tidy zero.

The other three you will meet constantly: **#VALUE!** means the wrong type was used, usually arithmetic on text — which in our dataset means a price that is still text somewhere. **#REF!** means a formula points at a cell that no longer exists, usually because a column was deleted; it is a warning that your workbook is broken, not a value to suppress. **#DIV/0!** means division by zero, which happens the moment you calculate an average over an empty group.

The discipline is: **read the error, find the cause, fix the data or the formula**. Only then, if a legitimate absence should display as something readable, use **`=IFERROR(formula, "Not in master")`** — with a message that says what happened, not a blank or a zero. A zero that means **missing** will be averaged into your figures and drag them down, and nobody will be able to see why.

### When a formula is the wrong tool

Formulas are precise and they are also where spreadsheets become unmaintainable. A workbook with 4,000 interdependent formulas, three of which contain a typo nobody can find, is a liability however correct its output looked last quarter. **If a question is about grouping and totalling, a pivot table is the right tool** — it is faster, it cannot contain a typo in the same way, and it updates when the data changes.

Use formulas for what they are genuinely good at: **row-level classification** (this order is Tier 2), **lookups across tables** (pull the cost price), **derived columns** (margin, days to deliver) and **specific checks** (does LineTotal equal Quantity times UnitPrice). Use pivot tables for aggregation, and keep the number of distinct formulas in a workbook small enough that you could explain every one of them.

The related discipline is **one calculation in one place**. If margin is calculated in six cells with slightly different formulas, they will eventually disagree and you will not know which is right. Calculate it once, in a column, and reference that column everywhere else.

## Instructor demonstration

The instructor works on the cleaned export, building the columns the rest of the course needs — order tiers, in-state flagging, cost price looked up from a product master, margin, month labels and delivery days — then breaks a lookup deliberately to show what each error means and why suppressing it would hide a real problem.

### Confirm the export is clean before starting

Check the checks tab from the last session is clear. Explain that formulas on dirty data produce precise wrong answers, which are worse than obviously wrong ones.02

### Add a month label column

=TEXT(B2, "yyyy-mm"). Explain that a month number sorts 1, 10, 11, 12, 2 while a text label sorts correctly.03

### Classify orders into tiers with IFS

=IFS(J2>100000, "Tier 1", J2>50000, "Tier 2", TRUE, "Tier 3"). Explain that the final TRUE catches everything else and omitting it returns #N/A.04

### Flag in-state orders with IF

=IF(E2="Lagos", "In-state", "Out-of-state"). Explain that the two groups have different delivery costs, so this column drives a real margin question.05

### Open the product master table

Show thirty rows of product, category and cost price. Explain that cost price lives in another table, which is exactly the situation lookups exist for.06

### Look up cost price with VLOOKUP

=VLOOKUP(F2, Products!A:C, 3, FALSE). Explain each argument, and that the table must have the lookup value in its first column.07

### Delete the FALSE and show what happens

Demonstrate the approximate match returning a wrong cost silently. Explain that this one omitted argument causes more wrong spreadsheets than anything else in Excel.08

### Do the same lookup with XLOOKUP

=XLOOKUP(F2, Products!A:A, Products!C:C). Explain that it defaults to exact match, can look left, and takes a not-found argument.09

### Trigger a deliberate #N/A

Change one product name so it is not in the master. Explain that #N/A here is a real finding: a product being sold that is not in the product master.10

### Show what IFERROR would hide

Wrap it as IFERROR(..., 0) and show margin become nonsense. Explain that a zero meaning missing gets averaged into your figures invisibly.11

### Use a message instead of a zero

IFERROR(..., "Not in master"). Explain that the honest fix states what happened rather than inventing a number.12

### Calculate margin in one column

=(J2 - Quantity times Cost) / J2. Explain the rule of one calculation in one place, because six slightly different margin formulas will eventually disagree.13

### Compute delivery days with DATEDIF

Days between order and delivery date. Explain that NETWORKDAYS gives working days, which is what a delivery promise is actually measured in.14

### Cross-check a pivot total with SUMIFS

=SUMIFS(J:J, E:E, "Lagos", K:K, "Transfer") against the pivot figure. Explain that checking a number two ways is worth a great deal when someone will act on it.15

### Count large Lagos orders with COUNTIFS

=COUNTIFS(E:E, "Lagos", J:J, ">50000"). Explain that the criteria syntax needs the comparison inside quotes.16

### Trigger a #DIV/0! on an empty group

Average margin for a state with no orders. Explain that it means the group is empty, which is a fact about the data rather than a bug.17

### Review which calculations should be pivot tables

Identify the aggregations among the new columns. Explain that grouping and totalling belongs in a pivot table, which cannot contain a typo in the same way.

## Guided practice

### Build the derived columns the analysis needs

You extend the cleaned export with the derived columns the rest of the course depends on — month labels, order tiers, in-state flags, looked-up cost price, margin and delivery days — cross-checking your figures against pivot tables and resolving every error to its cause rather than suppressing it.

1. 01Confirm the checks tab is clear before adding any formula.

2. 02Add a month label column with TEXT in yyyy-mm format.

3. 03Add a tier column with IFS, including a final TRUE catch-all.

4. 04Add an in-state flag with IF comparing State to Lagos.

5. 05Look up cost price from the product master with VLOOKUP and FALSE.

6. 06Repeat the lookup with XLOOKUP and confirm both agree on every row.

7. 07Deliberately break one lookup and record what the error was.

8. 08Resolve that error by fixing the data, not by suppressing it.

9. 09Use IFERROR with an explanatory message only where a genuine absence should be readable.

10. 10Calculate margin once, in one column, and reference it everywhere else.

11. 11Calculate delivery days with DATEDIF, and working days with NETWORKDAYS.

12. 12Answer with SUMIFS: total revenue from Lagos paid by transfer.

13. 13Answer with COUNTIFS: how many Lagos orders exceed 50,000 naira.

14. 14Cross-check both answers against a pivot table and record any difference.

15. 15Investigate and explain any difference rather than accepting it.

16. 16List every distinct error in the workbook and the cause of each.

17. 17Identify which of your columns should have been pivot tables instead.

The standard we hold you to

The cleaned export extended with a yyyy-mm month label, an IFS tier column including a TRUE catch-all, an in-state flag, cost price looked up from the product master by both VLOOKUP with an explicit FALSE and XLOOKUP with both confirmed to agree on every row, margin calculated once in a single column and referenced elsewhere, and delivery days by DATEDIF with working days by NETWORKDAYS; one lookup deliberately broken with the resulting error recorded and resolved by fixing the data rather than suppressing it; IFERROR used only with an explanatory message; total Lagos transfer revenue by SUMIFS and the count of Lagos orders over 50,000 naira by COUNTIFS, both cross-checked against a pivot table with any difference investigated and explained; every distinct error in the workbook listed with its cause; and the columns that should have been pivot tables identified.

## Common mistakes and how to fix them

You omit the FALSE in VLOOKUP

Fix: Always pass FALSE for an exact match. The default is an approximate match that requires sorted data and silently returns the wrong row on unsorted data — no error, just a wrong answer.

You wrap every formula in IFERROR

Fix: Read the error first. #N/A from a lookup means the value is genuinely missing from the other table, which is a finding — hiding it behind a zero conceals a real data problem.

You let IFERROR return zero for a missing value

Fix: Return a message such as Not in master. A zero meaning missing is averaged into your figures and drags them down, and nobody can see that it happened.

You omit the TRUE catch-all in IFS

Fix: Add TRUE as the final condition. Without it, rows matching no condition return #N/A, which looks like a lookup failure and sends you debugging the wrong thing.

You group by month number

Fix: Use TEXT with yyyy-mm. Month numbers sort 1, 10, 11, 12, 2, which produces a chart in the wrong order that is easy to miss.

You apply date functions to text dates

Fix: Convert to real dates first. YEAR on a text date returns an error or nonsense, and grouping by month is simply unavailable until the conversion is done.

The same calculation exists in six places

Fix: Calculate once in a column and reference it. Multiple slightly different formulas will eventually disagree and you will have no way to tell which is right.

You use formulas for aggregation

Fix: Use a pivot table for grouping and totalling. It is faster, it updates with the data, and it cannot contain a buried typo the way 4,000 interdependent formulas can.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Always pass FALSE as the fourth VLOOKUP argument. The default approximate match silently returns wrong rows on unsorted data, and this single omission is responsible for more confidently wrong spreadsheets than anything else in Excel.

- Treat #N/A as a finding rather than a nuisance. A product in your orders that is not in your product master is a real problem someone needs to fix, and IFERROR with a zero hides it inside your averages.

- Cross-check important figures two ways — a pivot table and a SUMIFS. When someone is going to act on a number, being able to demonstrate it two independent ways is worth more than the number itself.

- Calculate each thing once, in one column, and reference it. Six slightly different margin formulas will eventually disagree, and at that point nobody can tell which one was ever right.

## Key termsIF / IFSConditional classification. IFS needs a final TRUE catch-all or unmatched rows return #N/A.VLOOKUPFinds a value in a table's first column and returns a cell from that row. The fourth argument must be FALSE for an exact match.XLOOKUPThe modern lookup: exact match by default, can look left, and accepts a not-found value. Prefer it where available.SUMIFS / COUNTIFSTotals and counts with multiple conditions. The fastest independent check on a pivot table figure.TEXTFormats a value as text. TEXT(date, yyyy-mm) makes month labels that sort correctly.DATEDIF / NETWORKDAYSDays between dates, and working days between them. What delivery-time questions are actually measured in.#N/ANot found. From a lookup, it means the value is genuinely absent from the other table — a finding, not noise.#REF!A formula points at a deleted cell. It means the workbook is broken and must be fixed, never suppressed.

## Homework before the next session

Combine two tables with a lookup

Take any two related tables — orders and products, staff and departments — and pull a field across. Do it with VLOOKUP and FALSE, then with XLOOKUP, and confirm they agree on every row.

Break a lookup on purpose

Cause #N/A, #VALUE! and #DIV/0! deliberately. Write what each one actually meant in your data, and what you would fix rather than hide.

Answer one business question two ways

Pick a total, compute it with SUMIFS and with a pivot table, and record whether they agree. If they do not, find out why before you trust either.

Build three derived columns

A classification with IFS, a lookup column, and a date-derived column. Each calculated once, in one place, and referenced everywhere else.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Conditional logic | Uses IF correctly. | IFS used for multi-band classification with a TRUE catch-all, conditions written against cleaned values, and results spot-checked against the underlying rows. |
| Lookups | Pulls data from another table. | VLOOKUP with an explicit FALSE and XLOOKUP both used and confirmed to agree on every row, with the approximate-match failure demonstrated and explained. |
| Dates | Extracts month and year. | yyyy-mm labels used so periods sort correctly, DATEDIF and NETWORKDAYS applied to a real delivery question, and all date work done on genuinely converted dates. |
| Error handling | Notices errors. | Each error traced to its cause and the data fixed, IFERROR used only with an explanatory message, and no missing value silently converted into a zero. |
| Judgement | Formulas produce answers. | Aggregations cross-checked with SUMIFS against a pivot table and any difference investigated, each calculation held in one place, and the columns that belonged in a pivot table identified. |

## Session questionsVLOOKUP or XLOOKUP — which should I learn?+

Both. XLOOKUP is better — exact match by default, can look left, handles not-found values — and you should use it in new work. But most existing spreadsheets and most job interviews use VLOOKUP, so you need to read it and explain the FALSE argument.Why does my VLOOKUP return the wrong row?+

You almost certainly omitted the fourth argument. Without FALSE it does an approximate match, which requires the table to be sorted and silently returns a neighbouring row on unsorted data. Add FALSE and it will either match exactly or return #N/A.Should I use IFERROR to clean up my sheet?+

Only after you have read the error and fixed its cause. #N/A means a value is genuinely missing from the other table, which is a finding worth reporting. Wrapping it in IFERROR with a zero hides it inside your averages where nobody will find it.My months are in the wrong order on the chart. Why?+

You are grouping by month number, which sorts 1, 10, 11, 12, 2. Use TEXT with a yyyy-mm format to make a label that sorts correctly, or sort the pivot table by the underlying date rather than the label.When should I use a pivot table instead of a formula?+

For any grouping and totalling. Pivot tables are faster, update with the data, and cannot contain a buried typo the way thousands of interdependent formulas can. Save formulas for row-level classification, lookups and derived columns.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Cleaning & Validation](https://www.cea.ng/classes/data-analytics/cleaning-validation)[Next session 4: Pivot Tables & Summaries](https://www.cea.ng/classes/data-analytics/pivot-tables-summaries)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
