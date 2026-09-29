---
title: "Session 1: Data Structure & Types"
description: "Analysis fails far more often because of how data is arranged than because of the formula used. This session covers data types, tidy data, the real sources of mess in business data, and planning a dataset before you touch it — using one messy order export that the rest of the course works on."
date: "2025-03-12"
class_slug: "data-analytics"
---

Analysis fails far more often because of how data is arranged than because of the formula used. This session covers data types, tidy data, the real sources of mess in business data, and planning a dataset before you touch it — using one messy order export that the rest of the course works on.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Identify what data type each column holds and why it matters

- Recognise tidy data and reshape a sheet into it

- Explain where mess in business data actually comes from

- Read an unfamiliar dataset before analysing it

- Plan a cleaning approach rather than improvising it

- Keep an untouched original and work on a copy

## The taught content

### The dataset this course runs on

Everything from here to the final project uses **one dataset**, because that is how analysis actually works — you do not get eight separate clean problems, you get one messy file and eight weeks of dealing with it. It is an order export from a mid-sized distributor of household goods to retailers across Lagos, Ogun and Oyo, produced by their invoicing tool. About 1,200 rows, one row per order line, and twelve columns: **OrderID, OrderDate, CustomerName, Phone, State, Product, Category, Quantity, UnitPrice, LineTotal, PaymentMethod and SalesRep**.

It is messy in the ordinary way real exports are messy, not in a contrived way. State appears as **Lagos**, **lagos**, **LAGOS**, **Lagos State** and **LG**. Dates arrive in three different formats, and one of them is ambiguous. Names carry stray double spaces and inconsistent capitalisation. Phone numbers appear with and without the country code, with dashes, and with spaces. Some Quantity and UnitPrice values are stored as **text** rather than numbers, several carrying a naira sign and a thousands comma. Fourteen rows are duplicated because the counter staff entered the same sale twice. And missing payment methods are recorded as blank, **N/A**, a dash, and the word **unknown**, interchangeably.

This matters because the mess is not decoration. **Every one of these defects will produce a wrong answer if you ignore it** — **LAGOS** and **Lagos** are two states to a pivot table, a text-stored price sums to zero, and a duplicated row doubles the revenue you report to a manager. We are going to spend the whole course finding out exactly how wrong, and then fixing it.

### Data types, and why they decide everything

Every value in a spreadsheet has a type, and the type determines what you can do with it. The four that matter here are **text**, **number**, **date** and **logical** (TRUE/FALSE). Getting the type wrong does not produce an error — it produces a plausible, confident, wrong answer, which is far worse.

The commonest failure in our dataset is a **number stored as text**. Our UnitPrice column contains values like **₦4,500** and **4,500.00**, which Excel reads as text because of the symbol and the comma. Sum a column of text-numbers and you get **zero**, or only the few genuine numbers, with no warning. The giveaway is that text-numbers are usually **left-aligned** while real numbers are right-aligned, and a small green triangle often appears in the cell corner.

**Dates are the subtlest trap.** A spreadsheet date is really a number — days since a fixed starting point — displayed as a date, which is what lets you subtract dates and group by month. A date stored as text cannot be grouped by month at all; the pivot table simply will not offer it. Our OrderDate column mixes **12/03/2025**, **2025-03-12** and **12-Mar-25**, and the first format is genuinely ambiguous: is it the 12th of March or the 3rd of December? **That is not a formatting question, it is a question you must answer before you can trust any monthly figure.**

### Tidy data: one rule that fixes most structure problems

**Tidy data** has a precise meaning, and it is worth memorising because it settles most structural arguments: **one variable per column, one observation per row, one value per cell.** Our order export is close to tidy, which is why it is analysable at all.

The violation to watch for is the **report layout** — the shape people produce when they make a spreadsheet look nice rather than work. A sheet with a title in row 1, a merged header spanning four columns, **Lagos** down the side and months across the top, with totals in a right-hand column and a grand total at the bottom, is unreadable to any analysis tool. Every one of those features — merged cells, embedded headings, total rows, blank spacer rows — is decoration that breaks a pivot table.

The other common violation is **multiple values in one cell**, and we have it: some Quantity cells read **2 pcs**, and some Product cells read **Bucket 20L (blue)**. A cell holding two facts cannot be counted, averaged or filtered reliably. The fix is to split it — Quantity as 2 and a separate Units column, Product as **Bucket 20L** with Colour separate — which is more work once and saves it every time afterwards.

### Where the mess actually comes from

Mess is not random, and understanding its source tells you where to look. **Free-text entry** is the biggest cause: any field a human types will contain variants, which is why State and Product are inconsistent while OrderID, generated by the system, is clean. If a column was typed by a person, assume it needs cleaning; if it was generated, check it anyway but expect less.

**System boundaries** are the second. Data that has crossed from one tool to another — exported from a POS, emailed as CSV, opened in Excel, re-saved — picks up changes at each hop. Opening a CSV in Excel and saving it can silently convert **08031234567** into a number and destroy the leading zero, or reinterpret a date. Our export has been through at least two tools, and the date formats show it.

**Multiple people, no rules** is the third, and it explains our fourteen duplicates and our four different spellings of **missing**. When three counter staff enter orders and nobody has said how to record an unknown payment method, you get blank, **N/A**, a dash and **unknown** — four values that all mean the same thing and that Excel treats as four different categories.

### Reading a dataset before you analyse it

The discipline that separates people who get answers from people who get wrong answers is **looking before calculating**. Concretely: how many rows, and does that match what you expected? How many columns, and does each hold one thing? For every column, what type is it, how many distinct values does it have, and how many are empty? Are there duplicates? What are the minimum and maximum of every number, and do they make sense — a UnitPrice of zero, or of 4,500,000 for a bucket?

Most of this takes five minutes and answers itself. **`=COUNTA(A:A)`** tells you how many rows have anything; a pivot table with a field in Rows tells you every distinct value in that column instantly, which is how you discover that State has nine spellings for three states. **`=MIN()`** and **`=MAX()`** on every numeric column catch the impossible values — the negative quantity, the price entered as 45000 instead of 4500.

And the rule that protects everything else: **never work on the original**. Copy the export to a working file, keep the original untouched, and do all cleaning on the copy. You will make a mistake at some point — everyone does — and the difference between a five-second recovery and a request to re-export three months of orders is whether you kept the original.

## Instructor demonstration

The instructor opens the raw 1,200-row order export and profiles it column by column before touching anything, finding every defect in the dataset with formulas and pivot tables rather than by scrolling — then demonstrates exactly how one of those defects produces a confidently wrong revenue figure.

### Make a working copy and leave the original alone

Save as a working file before anything else. Explain that you will make a mistake eventually, and keeping the original is the difference between a five-second recovery and a re-export request.02

### Count the rows

Use =COUNTA(A:A) and compare with the expected order count. Explain that a mismatch is the first sign of duplication or of a truncated export.03

### Check each column holds one thing

Scan the headers. Explain the tidy rule: one variable per column, one observation per row, one value per cell.04

### Pivot the State column to list its values

Drop State into Rows. Show Lagos, lagos, LAGOS, Lagos State and LG appearing as five separate states. Explain that a pivot table is the fastest way to see every distinct value in a column.05

### Do the same for Product

Show Bucket 20L, bucket 20l and BUCKET 20L as three products. Explain that the same product split across three rows will understate every figure you report.06

### Test whether UnitPrice is really a number

Type =ISNUMBER(I2) beside a cell showing ₦4,500. Show FALSE. Explain that the naira sign and comma made it text.07

### Sum the UnitPrice column as it stands

Show the total come out near zero. Explain that this is the most dangerous failure in spreadsheets, because it produces a number with no error message.08

### Check alignment as a quick type test

Point out that text sits left and numbers right. Explain that a column with mixed alignment is mixed-type and cannot be trusted until fixed.09

### Look for the green error triangles

Hover one and read the message. Explain that Excel often flags text-numbers for you, and the flag is worth acting on rather than dismissing.10

### Examine the three date formats

Show 12/03/2025, 2025-03-12 and 12-Mar-25 side by side. Explain that a date stored as text cannot be grouped by month at all.11

### Show the ambiguous date problem

Ask the class whether 12/03/2025 is 12 March or 3 December. Explain that this must be resolved before any monthly figure can be trusted.12

### Find the duplicates

Use Conditional Formatting, Highlight Duplicate Values on OrderID. Show fourteen highlighted. Explain that these came from double entry at the counter.13

### Count the missing PaymentMethod values

Filter the column and show blank, N/A, a dash and unknown all present. Explain that four spellings of missing will appear as four categories in every summary.14

### Run MIN and MAX on Quantity and UnitPrice

Show a negative quantity and an implausible price. Explain that impossible values are usually keying errors and must be resolved, not deleted silently.15

### Write the defect list down

Record every finding in a notes tab. Explain that cleaning without a list means you will miss some and repeat others, and the list becomes your documentation.

## Guided practice

### Profile the export before you touch it

You are given the raw order export and you profile it completely without cleaning anything — every column typed, every distinct value listed, every defect recorded — then you demonstrate one wrong answer that a defect would cause.

1. 01Save a working copy and confirm the original is untouched.

2. 02Count the rows with =COUNTA(A:A) and record the number.

3. 03List all twelve columns and state the intended type of each.

4. 04Use =ISNUMBER() on ten UnitPrice cells and record how many return FALSE.

5. 05Check the alignment of every numeric column and note any that are mixed.

6. 06Build a pivot table with State in Rows and record every distinct value.

7. 07Build a pivot table with Product in Rows and record every distinct value.

8. 08Sum the UnitPrice column as it stands and record the result.

9. 09List the three date formats present and identify which are ambiguous.

10. 10Highlight duplicate OrderIDs and record how many there are.

11. 11Filter PaymentMethod and list every value that means missing.

12. 12Run =MIN() and =MAX() on Quantity and UnitPrice and flag implausible values.

13. 13Count how many rows have a blank LineTotal.

14. 14Check whether LineTotal equals Quantity times UnitPrice on twenty rows and record the mismatches.

15. 15Write a defect list of every finding, grouped by column.

16. 16Produce one wrong revenue figure caused by a defect and explain the mechanism.

The standard we hold you to

A complete profile of the raw export with no cleaning applied: row count recorded, all twelve columns listed with intended types, ISNUMBER tested on ten UnitPrice cells with the FALSE count recorded, mixed alignment flagged, every distinct State and Product value listed via pivot table, the raw UnitPrice sum recorded as evidence of the text-number problem, all three date formats listed with the ambiguous one identified, duplicate OrderIDs highlighted and counted, every value meaning missing in PaymentMethod listed, MIN and MAX run on Quantity and UnitPrice with implausible values flagged, blank LineTotal rows counted, LineTotal checked against Quantity times UnitPrice on twenty rows with mismatches recorded, a defect list grouped by column, and one demonstrably wrong revenue figure with its mechanism explained.

## Common mistakes and how to fix them

You analyse a column that is secretly text

Fix: Test with =ISNUMBER() and check alignment. A number stored as text sums to zero or to only the genuine numbers, with no error message — the most dangerous failure in spreadsheets.

You treat LAGOS and Lagos as different states

Fix: Pivot the column to list every distinct value before analysing. Variants split one category across several rows and understate every figure you report.

You group dates that are stored as text

Fix: Convert to real dates first. A text date cannot be grouped by month at all, so the pivot table simply omits the option and you may not notice it is missing.

You assume 12/03/2025 means what you think it means

Fix: Resolve the ambiguity explicitly before any monthly figure. Is it 12 March or 3 December? Guessing silently corrupts every time-based conclusion you draw.

You clean the original export

Fix: Work on a copy and keep the original untouched. Everyone makes a cleaning mistake eventually, and the original is the only recovery that does not involve asking someone to re-export.

You delete impossible values without asking

Fix: Flag and investigate. A UnitPrice of 45000 is probably 4500 with a slipped digit, and silently deleting it removes a real sale from your revenue.

You build on a report layout with merged cells and totals

Fix: Reshape to tidy data first: one variable per column, one observation per row. Merged cells, embedded headings and total rows break pivot tables and are invisible until they do.

You leave two facts in one cell

Fix: Split them. A Quantity of 2 pcs or a Product of Bucket 20L (blue) cannot be counted, averaged or filtered reliably, and splitting once saves the work every time after.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Profile before you calculate. Five minutes of counting rows, pivoting each column and running MIN and MAX finds the defects that would otherwise surface as a wrong answer in front of a manager.

- Treat any human-typed column as dirty by default. State and Product are inconsistent because people typed them; OrderID is clean because a system generated it. Knowing the source tells you where to look first.

- Never work on the original export. Copy it, keep the original untouched, and clean on the copy — the difference between recovering in five seconds and requesting a three-month re-export.

- A number stored as text is the failure to fear most, because it produces a confident wrong total with no error. Check alignment, look for the green triangles, and test with ISNUMBER before summing anything.

## Key termsData typeWhether a value is text, number, date or logical. Wrong types produce plausible wrong answers rather than errors.Text-numberA number stored as text, often from a currency symbol or comma. Sums to zero silently; usually left-aligned.Tidy dataOne variable per column, one observation per row, one value per cell. The precondition for pivot tables to work.Report layoutA sheet shaped to look nice — merged cells, headings, total rows — that breaks analysis tools.ProfilingExamining a dataset before analysing it: row counts, distinct values, types, blanks, duplicates, ranges.Distinct valuesEvery unique entry in a column. A pivot table lists them instantly and reveals spelling variants.Ambiguous dateA date whose day and month cannot be told apart, like 12/03/2025. Must be resolved before monthly analysis.Free-text fieldAny column a human types. The main source of spelling variants and inconsistent missing values.

## Homework before the next session

Profile one real spreadsheet you already have

A bank statement, a sales log, a register. Count the rows, pivot two text columns to list their distinct values, test a numeric column with ISNUMBER, and write the defect list.

Find a text-number in the wild

Locate a column that looks numeric but is stored as text, prove it with ISNUMBER, and show what the sum returns before and after conversion.

Resolve the ambiguous dates in the export

Establish whether the DD/MM rows are day-first, using surrounding unambiguous rows as evidence. Document how you decided — this answer governs every monthly figure later.

Reshape one report layout into tidy data

Take a sheet with merged cells or a total row and rebuild it as one variable per column, one observation per row. Then build a pivot table on it to prove it works.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Type awareness | Can say what a column contains. | Types tested with ISNUMBER, alignment and error triangles used as evidence, and the silent-zero failure on text-numbers demonstrated rather than described. |
| Structure | Uses a spreadsheet competently. | Tidy data explained as one variable per column, one observation per row, one value per cell, and a report layout correctly identified and reshaped. |
| Profiling | Looks at the data first. | Rows counted, every distinct value listed by pivot table, MIN and MAX run on numerics with implausible values flagged, duplicates highlighted, and all findings recorded in a defect list. |
| Handling ambiguity | Notices odd values. | The ambiguous date format resolved with stated evidence, four spellings of missing identified as one category, and impossible values investigated rather than deleted. |
| Working safely | Edits carefully. | Original export preserved untouched with all work on a copy, and a wrong revenue figure produced deliberately to show what a defect costs. |

## Session questionsWhy does my total come out as zero when the column has numbers in it?+

They are almost certainly stored as text, usually because of a naira sign, a thousands comma, or a CSV import. Text-numbers are left-aligned where real numbers are right-aligned, and they sum to zero with no error. Test a cell with =ISNUMBER() to confirm.What is tidy data and why does everyone mention it?+

One variable per column, one observation per row, one value per cell. It matters because pivot tables and every analysis tool assume it — merged cells, embedded headings, total rows and blank spacer rows all silently break them.How do I find every spelling variant in a column quickly?+

Make a pivot table with that column in Rows. It lists every distinct value instantly, which is how you discover that State has nine spellings for three states. Scrolling will not find them; a pivot table will.Should I just delete the rows that look wrong?+

Flag them and investigate first. A UnitPrice of 45000 is probably 4500 with a slipped digit, and deleting it removes a real sale from your revenue. Deleting data is a last resort, and it should be documented when you do.Do I need Excel, or will Google Sheets do?+

Sheets does everything in this course. A few function names and the pivot table interface differ slightly, and both are noted as we go. Pick one and stay in it — the analysis is identical.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Cleaning & Validation](https://www.cea.ng/classes/data-analytics/cleaning-validation)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
