---
title: "Session 2: Cleaning & Validation"
description: "Cleaning is where most analysis time actually goes, and it should be repeatable rather than manual. This session covers the text functions that fix spelling and spacing, removing duplicates safely, handling missing values deliberately, and validation rules that stop the mess coming back."
date: "2026-09-12"
class_slug: "data-analytics"
---

Cleaning is where most analysis time actually goes, and it should be repeatable rather than manual. This session covers the text functions that fix spelling and spacing, removing duplicates safely, handling missing values deliberately, and validation rules that stop the mess coming back.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Use TRIM, CLEAN, PROPER, UPPER and SUBSTITUTE to standardise text

- Convert text-numbers into real numbers without breaking them

- Normalise dates stored in mixed and ambiguous formats

- Remove duplicates deliberately and record what you removed

- Decide what to do with missing values rather than ignoring them

- Add validation rules so the same mess does not return

## The taught content

### Cleaning is repeatable work, not manual work

The first principle of cleaning is that **you should never fix the same problem twice by hand**. Our State column has about 1,200 entries across nine spellings of three states. Changing them one at a time would take an hour, introduce new errors, and have to be done again next month when the next export arrives.

So cleaning is done with **formulas in a helper column**, which is fast, consistent and reviewable, and then the result is pasted back as values. A helper column is simply a new column beside the data holding a formula — **CleanState** next to **State** — which you can check before you commit to it. **Never overwrite the original column in place until the helper column has been verified**, because a formula dragged 1,200 rows down will happily apply a wrong logic 1,200 times.

The second principle is that **cleaning must be documented**. Every change you make — what, why, how many rows it affected — goes in a notes tab. Not for bureaucracy: because in six weeks you or a colleague will ask why **LG** became **Lagos**, and because a manager is entitled to know that fourteen duplicated rows were removed before the revenue figure was calculated.

### The text functions that do most of the work

Five functions handle almost every text problem in business data. **`=TRIM(A2)`** removes leading and trailing spaces and collapses repeated internal spaces — which fixes **Adebayo Ogundimu** and **LAGOS** with a trailing space in one step. **`=CLEAN(A2)`** strips non-printing characters, which is what you need for data that came out of another system and carries invisible junk; a value that looks identical to another but will not match is usually carrying one.

**`=UPPER(A2)`**, **`=LOWER(A2)`** and **`=PROPER(A2)`** control capitalisation. For names and products, **PROPER** is usually right, giving **Adebayo Ogundimu** and **Bucket 20L**. Be careful: PROPER also capitalises the second letter of anything after a punctuation mark, so **McDonald** becomes **Mcdonald** and **20L** is fine but **iPhone** becomes **Iphone** — check the results rather than assuming.

**`=SUBSTITUTE(A2, "old", "new")`** replaces text, and it is the workhorse for standardisation. To collapse our nine State spellings into three you can chain them: **`=SUBSTITUTE(SUBSTITUTE(PROPER(TRIM(B2)), "Lagos State", "Lagos"), "Lg", "Lagos")`**. Note the order — **TRIM and PROPER first**, so that **lagos**, **LAGOS** and **LAGOS** all become **Lagos** before you try to match anything, otherwise you are matching against moving targets. SUBSTITUTE is also how you strip a naira sign and comma from a price: replace **₦** with nothing, then replace the comma with nothing.

### Fixing numbers and dates

Once UnitPrice is free of the naira sign and comma it may still be text. **`=VALUE(A2)`** converts a text-number into a real number; **`=NUMBERVALUE(A2)`** does the same and lets you specify the decimal and grouping separators, which matters when a file was produced with different regional settings. After converting, **re-test with `=ISNUMBER()`** — do not assume, because a stray space or an invisible character will make VALUE fail and return #VALUE!.

For our Quantity column, where some cells read **2 pcs**, extract the number rather than retyping: pull the digits with **`=VALUE(LEFT(A2, FIND(" ", A2) - 1))`**, or, more robustly, strip the unit with SUBSTITUTE first and then convert. The general habit is **extract, then convert, then verify** — three steps, because a conversion that fails silently is worse than one that fails loudly.

Dates are harder because of the ambiguity we found. **`=DATEVALUE(A2)`** converts a text date to a real one, but only if your spreadsheet can interpret the format — and for **12/03/2025** it will guess using your system's regional settings, which may not be what the exporting system meant. The reliable method is to **split the text and rebuild it explicitly**: extract the parts with MID and FIND, then assemble with **`=DATE(year, month, day)`**, deciding for yourself which part is the month. Then **verify against rows that are unambiguous** — a value like **25/03/2025** can only be 25 March, and if your logic gets that one wrong, the logic is wrong.

### Duplicates and missing values

Our fourteen duplicate rows came from double entry, and removing them is easy — **but removing the wrong things is easy too**. Highlight duplicates on OrderID first and **look at them**. Two rows with the same OrderID and identical values are a genuine duplicate. Two rows with the same OrderID but different products are a legitimate multi-line order, and deleting one loses a real sale. **The duplicate check must be on the whole row, or on a key you have verified is genuinely unique**, not on any column that happens to repeat.

Then remove them deliberately: copy the duplicates to a separate tab **before** deleting, so you have a record of what went and can put it back. Then delete. The count should match what you found — fourteen, not thirty-seven — and if it does not, stop and find out why.

**Missing values are a decision, not an absence.** Our PaymentMethod has blanks, **N/A**, a dash and **unknown** — all meaning the same thing, and Excel treats them as four categories. First **standardise**: replace all four with one value, say **Not recorded**, using SUBSTITUTE and a blank check. Then **decide what it means for your analysis**. If 9 per cent of payment methods are unrecorded, you can report cash versus transfer across the 91 per cent that is known — as long as you say so. What you must not do is treat the missing as a category called **Not recorded** and report it alongside Cash and Transfer as though it were a payment method.

### Validation: stopping the mess coming back

Cleaning a dataset once is half the job; the other half is making sure next month's export is not equally messy. **Data validation** constrains what can be entered in a column. In Excel: **Data → Data Validation**. Set State to a **List** containing exactly **Lagos**, **Ogun**, **Oyo**, and nobody can type **LAGOS** again. Set Quantity to a **Whole number** between 1 and 500, and a keying error of 5000 is rejected at entry rather than discovered in the quarterly report.

Validation is cheap and it is the highest-value thing in this session, because every rule you add removes a cleaning step forever. The columns to constrain first are exactly the ones that were dirty: any **category** column becomes a list, any **number** column gets a range, any **date** column gets a date range, and any **required** column is set to reject blanks.

For data coming from a system you do not control, you cannot validate at entry, so validate **on arrival**: a checks tab with formulas that count rows where State is not in the allowed list, where Quantity is out of range, where LineTotal does not equal Quantity times UnitPrice. **`=SUMPRODUCT(--(ISNA(MATCH(E2:E1201, {"Lagos","Ogun","Oyo"}, 0))))`** counts invalid states in one cell. Run those checks on every new export before you analyse it, and cleaning stops being a monthly scramble.

## Instructor demonstration

The instructor cleans the order export column by column using helper columns, verifying each result before committing — standardising State and Product, converting text prices to real numbers, rebuilding ambiguous dates explicitly, removing exactly the fourteen true duplicates, unifying four spellings of missing, and adding validation so the next export arrives clean.

### Add a CleanState helper column beside State

Never overwrite the original in place. Explain that a formula dragged 1,200 rows applies wrong logic 1,200 times, so the result must be checkable first.02

### Apply TRIM and PROPER first

=PROPER(TRIM(B2)). Explain that you normalise case and spacing before matching, otherwise you are matching against moving targets.03

### Chain SUBSTITUTE to collapse the variants

Map Lagos State and Lg to Lagos. Show nine spellings reduce to three. Explain that chaining handles each variant in turn.04

### Pivot CleanState to verify

Confirm exactly three values remain. Explain that verification is a pivot table, not a scroll, because scrolling 1,200 rows finds nothing.05

### Standardise Product the same way

TRIM, PROPER, then SUBSTITUTE 20ltr to 20L. Explain that product variants split revenue across rows and understate every figure.06

### Strip the naira sign and comma from UnitPrice

SUBSTITUTE twice into a helper column. Explain that symbols and thousands separators are what turned the numbers into text.07

### Convert with VALUE and re-test

=VALUE(helper) then =ISNUMBER() on the result. Explain that you verify the conversion rather than assuming it, because a stray space makes VALUE fail.08

### Extract the number from 2 pcs

Use FIND and LEFT, or SUBSTITUTE the unit away first. Explain the habit: extract, then convert, then verify.09

### Sum UnitPrice before and after

Show the near-zero total become a real figure. Explain that this single fix changes every revenue number in the course.10

### Split the ambiguous date text explicitly

Extract the parts with MID and FIND, rebuild with DATE(year, month, day). Explain that DATEVALUE guesses from your regional settings, which may not match the exporting system.11

### Verify the date logic against unambiguous rows

Check 25/03/2025 comes out as 25 March. Explain that if the logic fails on a row that can only mean one thing, the logic is wrong.12

### Highlight duplicates on OrderID and inspect them

Show that some share an ID but differ in product. Explain that those are legitimate multi-line orders and deleting one loses a real sale.13

### Copy the true duplicates to a separate tab

Keep a record before deleting. Explain that this is what lets you put them back and lets you tell a manager exactly what was removed.14

### Delete and check the count matches fourteen

Explain that if you removed thirty-seven instead of fourteen, you deleted real orders and must undo it.15

### Unify the four spellings of missing PaymentMethod

Replace blank, N/A, dash and unknown with Not recorded. Explain that Excel treats four spellings as four categories in every summary.16

### Recompute LineTotal and compare

Quantity times UnitPrice against the recorded value. Explain that mismatches reveal either keying errors or discounts that are not recorded anywhere.17

### Add list validation to State

Data, Data Validation, List with Lagos, Ogun, Oyo. Explain that nobody can type LAGOS again, which removes a cleaning step permanently.18

### Add range validation to Quantity

Whole number between 1 and 500. Explain that a keying error is better rejected at entry than discovered in a quarterly report.19

### Build a checks tab for future exports

Formulas counting invalid states, out-of-range quantities and LineTotal mismatches. Explain that this turns monthly cleaning from a scramble into a two-minute check.

## Guided practice

### Clean the export and prove it is clean

You clean the order export using helper columns, verify every change with a pivot table or formula rather than by looking, document each change with the number of rows it affected, and build a checks tab that would catch the same defects in next month's export.

1. 01Work on a copy and leave the original export untouched.

2. 02Create a CleanState helper column and standardise all nine spellings into three.

3. 03Verify with a pivot table that exactly three state values remain.

4. 04Create a CleanProduct helper column and standardise every variant.

5. 05Verify the distinct product count before and after and record both.

6. 06Strip the naira sign and comma from UnitPrice in a helper column.

7. 07Convert with VALUE and confirm every row with =ISNUMBER().

8. 08Extract the numeric part of any Quantity stored as text.

9. 09Record the UnitPrice sum before and after conversion.

10. 10Rebuild OrderDate explicitly with DATE(year, month, day).

11. 11Verify the date logic on rows that can only be read one way.

12. 12Identify duplicate rows and separate true duplicates from multi-line orders.

13. 13Copy the true duplicates to a record tab, then delete them.

14. 14Confirm the number deleted matches the number you identified.

15. 15Replace every spelling of missing PaymentMethod with one standard value.

16. 16Recompute LineTotal and list every row that does not match.

17. 17Write a cleaning log: what changed, why, and how many rows were affected.

18. 18Add list validation to State and range validation to Quantity.

19. 19Build a checks tab counting invalid states, out-of-range quantities and total mismatches.

The standard we hold you to

A cleaned copy of the export with the original untouched, in which State is standardised to exactly three values and Product to its true distinct count, both verified by pivot table; UnitPrice stripped of currency symbols, converted with VALUE and confirmed numeric on every row by ISNUMBER, with the sum recorded before and after; text quantities extracted to numbers; OrderDate rebuilt explicitly with DATE and verified against rows readable only one way; true duplicates separated from legitimate multi-line orders, copied to a record tab before deletion, with the deleted count matching the identified count; all four spellings of missing PaymentMethod unified into one value; LineTotal recomputed with every mismatch listed; a cleaning log recording each change, its reason and its row count; list validation on State and range validation on Quantity; and a checks tab counting invalid states, out-of-range quantities and LineTotal mismatches.

## Common mistakes and how to fix them

You fix values one at a time by hand

Fix: Use a formula in a helper column. Manual fixes take an hour, introduce new errors, and must be repeated next month when the next export arrives.

You overwrite the original column before checking the formula

Fix: Build in a helper column, verify with a pivot table, then paste as values. A formula dragged 1,200 rows down applies wrong logic 1,200 times.

You run SUBSTITUTE before TRIM and PROPER

Fix: Normalise spacing and case first. Otherwise lagos, LAGOS and LAGOS with a trailing space are three different targets and your replacement misses two of them.

You trust PROPER blindly

Fix: Check the output. PROPER capitalises after punctuation, so McDonald becomes Mcdonald and iPhone becomes Iphone — plausible-looking and wrong.

You convert with VALUE and do not verify

Fix: Re-test with ISNUMBER. A stray space or invisible character makes VALUE return #VALUE!, and an unverified column is still partly text.

You delete every row with a repeated OrderID

Fix: Inspect first. Rows sharing an ID with different products are a legitimate multi-line order, and deleting one removes a real sale from your revenue.

You leave four spellings of missing

Fix: Standardise to one value. Blank, N/A, a dash and unknown are four categories to Excel, and they will fragment every summary you build.

You report Not recorded as a payment method

Fix: State what is missing and analyse what is known. Reporting an absence alongside Cash and Transfer as though it were a method is how a chart misleads a manager.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Always clean in a helper column, verify, then paste as values. It costs one extra column and it means a wrong formula affects a column you can delete rather than the only copy of your data.

- Normalise case and spacing before you match anything. TRIM and PROPER first, SUBSTITUTE second — otherwise every variant you failed to normalise is a variant your replacement silently missed.

- Inspect duplicates before deleting them. Rows sharing an OrderID with different products are a legitimate multi-line order, and blind deletion quietly removes real sales from your figures.

- Add validation as you clean. Every list and range rule you set removes that cleaning step permanently, and for data you cannot control at entry, a checks tab turns a monthly scramble into a two-minute check.

## Key termsHelper columnA new column holding the cleaning formula, checked before being pasted back as values. Never clean in place.TRIMRemoves leading, trailing and repeated internal spaces. Fixes stray spacing in one step.CLEANStrips non-printing characters. Needed for data from other systems; invisible characters break matching.SUBSTITUTEReplaces specified text. Chained to collapse spelling variants into one standard value.VALUE / NUMBERVALUEConverts a text-number into a real number. Must be verified with ISNUMBER afterwards.DATEVALUEConverts text to a date using your regional settings — which may not match the exporting system. Rebuild explicitly instead when dates are ambiguous.Data validationRules constraining what can be entered: a list for categories, a range for numbers. Stops the mess returning.Cleaning logA record of each change, its reason and its row count. What lets you explain a figure to a manager six weeks later.

## Homework before the next session

Standardise one dirty text column

Take a column with spelling variants from a real file, clean it in a helper column with TRIM, PROPER and SUBSTITUTE, and prove with a pivot table that the distinct count dropped.

Convert a column of text-numbers

Strip any currency symbols and commas, convert with VALUE, verify every row with ISNUMBER, and record the sum before and after.

Resolve a set of ambiguous dates

Rebuild them explicitly with DATE(year, month, day) and verify against rows that can only be read one way. Document the evidence for your decision.

Add validation to a sheet you use regularly

One list rule on a category column and one range rule on a number column. Then try to break both and confirm they reject bad entry.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Text cleaning | Fixes inconsistent text. | TRIM, PROPER and SUBSTITUTE chained in the correct order in a helper column, with PROPER's punctuation behaviour checked and results verified by pivot table. |
| Type conversion | Makes numbers usable. | Symbols and separators stripped, VALUE applied, every row confirmed with ISNUMBER, text quantities extracted, and the sum recorded before and after. |
| Dates | Dates are consistent. | Ambiguous dates rebuilt explicitly with DATE rather than left to DATEVALUE, and the logic verified against rows readable only one way. |
| Duplicates and missing | Removes duplicates. | True duplicates distinguished from multi-line orders by inspection, copied to a record tab before deletion, count verified, and all spellings of missing unified with a stated decision about how they are treated. |
| Prevention | Cleans the file. | List and range validation added to the columns that were dirty, a checks tab built for future exports, and a cleaning log recording every change with its row count. |

## Session questionsWhy not just use Find and Replace?+

Because it is invisible and irreversible. A helper column formula lets you see the result, verify it with a pivot table and delete the column if the logic is wrong. Find and Replace applied to 1,200 rows gives you no chance to check before the original values are gone.PROPER turned McDonald into Mcdonald. What do I do?+

That is expected — PROPER capitalises the letter after any punctuation, including the apostrophe. Fix the specific cases with SUBSTITUTE afterwards, or leave those values out of the PROPER step. Always check the output rather than assuming a function did the right thing.How do I know I removed the right duplicates?+

Inspect them before deleting, and keep a copy. Rows sharing an OrderID with identical values are true duplicates; rows sharing an ID with different products are a legitimate multi-line order. The number you delete should match the number you identified — if it does not, stop.What should I do with the missing payment methods?+

Standardise the four spellings into one value, then report what is known and say what is not. If 9 per cent are unrecorded, analyse the 91 per cent and state the gap. Do not present Not recorded alongside Cash and Transfer as though it were a payment method.My data comes from a system I cannot change. Does validation help?+

Yes, but on arrival rather than at entry. Build a checks tab with formulas that count rows where State is not in the allowed list, Quantity is out of range, or LineTotal does not equal Quantity times UnitPrice. Run it on every new export before you analyse.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Data Structure & Types](https://www.cea.ng/classes/data-analytics/data-structure-types)[Next session 3: Formulas & Lookups](https://www.cea.ng/classes/data-analytics/formulas-lookups)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
