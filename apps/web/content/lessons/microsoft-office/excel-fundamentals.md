---
title: "Session 4: Excel Fundamentals"
description: "Excel is not a grid of boxes — it is a calculation engine that happens to look like a grid. This session builds the mental model: workbooks, worksheets, cells and references, then data entry, number formatting, and the five functions that do most real-world work."
date: "2026-09-12"
class_slug: "microsoft-office"
---

Excel is not a grid of boxes — it is a calculation engine that happens to look like a grid. This session builds the mental model: workbooks, worksheets, cells and references, then data entry, number formatting, and the five functions that do most real-world work.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain the difference between a workbook, a worksheet and a cell

- Read and write cell references such as B7 or D2:D40

- Enter and edit data correctly, including dates, currency and text

- Format cells, set number formats, and adjust column widths and row heights

- Write formulas using cell references rather than typed numbers

- Use SUM, AVERAGE, MIN, MAX and COUNT and choose the right one

## The taught content

### The mental model: everything has an address

A **workbook** is the file itself (the .xlsx). Inside it are **worksheets** — the tabs along the bottom, three by default. Each worksheet is a grid of **cells**, and every cell has an address made from its column letter and row number: the cell where column C meets row 12 is C12. A **range** is a rectangular block of cells written with a colon: C12:C20 means every cell from C12 down to C20. The **active cell** is the one with the dark border, and its address appears in the Name Box at top-left. The **formula bar** above the grid shows what is actually inside the active cell — which matters enormously, because a cell displaying '₦45,000' might contain the number 45000 formatted as currency, or the text string '₦45,000' which cannot be calculated. Look at the formula bar to know the truth.

Once you see Excel this way, everything else follows. You are never 'typing in boxes'; you are storing values at addresses and then referring to those addresses in formulas. That indirection is the whole reason spreadsheets are useful: change one input and every calculation that references it updates instantly.

### Data entry: the rules that prevent broken sheets

The most important rule in Excel is: **one fact per cell**. Never type 'Adebayo Okafor — 0803 456 7890' into one cell; put the name in one column and the phone number in another. Never type '₦45,000' as text; type 45000 and format it as currency. Never leave a blank row in the middle of a data list — Excel reads contiguous blocks, and a blank row silently truncates your range. And never merge cells in a data table; merging breaks sorting, filtering and formulas. Merge cells for display headings only.

Dates deserve particular care in Nigeria because of format confusion. Type dates in an unambiguous form and let formatting handle display. Excel stores dates as serial numbers, which is why it can calculate the difference between them — but only if it recognises what you typed as a date. If a date appears left-aligned, Excel read it as text and no date maths will work. Right-aligned numbers and dates are real values; left-aligned entries are text. That single visual cue will save you hours.

Editing: double-click a cell or press F2 to edit inside it. Press Enter to commit and move down, Tab to commit and move right, Escape to abandon the edit. Ctrl+; inserts today's date. Ctrl+' copies the value from the cell directly above, which is enormously useful when filling a column.

### Formatting: number formats, borders and dimensions

Number formatting changes how a value **displays** without changing what it **is**. The same number 45000 can show as 45000, 45,000, ₦45,000, 45000.00 or 4.5E+04 depending on format. Home → Number Format dropdown gives you General, Number, Currency, Accounting, Date, Percentage and Text. Use Accounting for financial columns because it aligns the currency symbol at the left of the cell and negatives in brackets, which is what Nigerian financial statements use. Use Percentage when the underlying value is a decimal (0.15 displays as 15%).

The trap: formatting does not change the stored value. If a cell holds 45000.678 and you format it to zero decimals, it displays 45001 but any formula using it still uses 45000.678. When displayed totals do not add up to the sum of displayed rows, this is almost always why. Use ROUND() in the formula when the rounded value is the real business value.

Then the visual layer: **borders** (Home → Borders) draw lines around cells — Excel's faint gridlines never print, so if you want lines on paper you must add borders. **Column width** is adjusted by double-clicking the boundary between column headers to auto-fit, or dragging it manually. **Row height** works the same way. **Wrap Text** makes long content flow onto multiple lines within its cell, and after enabling it you usually need to auto-fit the row height. Finally, **Freeze Panes** (View → Freeze Panes) locks your header row and first column in place so a long list stays readable as you scroll — set this on every table longer than a screen.

### Formulas: the point of the whole exercise

Every formula begins with `=`. What follows can be arithmetic (`=B2*C2`), a function (`=SUM(B2:B20)`), or a mix. The critical discipline is that you reference cells, not values. `=B2*0.15` is fragile; `=B2*$E$1` where E1 holds the VAT rate is maintainable — change E1 once and every row updates.

Operators in order of precedence: parentheses first, then exponent `^`, then multiplication and division `*` `/`, then addition and subtraction `+` `-`. Use parentheses liberally; `=(B2+C2)*0.15` and `=B2+C2*0.15` give completely different answers and only one of them is what you meant.

The five functions that carry most everyday work: **SUM** adds a range (`=SUM(D2:D40)`); **AVERAGE** computes the mean (`=AVERAGE(D2:D40)`); **MIN** and **MAX** return the smallest and largest values; **COUNT** counts cells containing numbers — note the difference from **COUNTA**, which counts any non-empty cell including text. Choosing COUNT when you meant COUNTA, or the reverse, is one of the most common beginner errors. All of these ignore empty cells and text within the range, which is usually what you want but occasionally is not.

## Instructor demonstration

The instructor builds a personal monthly expense sheet live, from a blank workbook to a formatted, formula-driven sheet with totals.

### Set up the table structure

Rename Sheet1 to 'September' by double-clicking the tab. In row 1 type headers: Date, Description, Category, Amount. Say out loud that row 1 is headers and data starts at row 2 — this is the convention every tool expects.02

### Enter twelve rows of real expenses

Use realistic entries: transport, data subscription, fuel, food, rent contribution. Type dates as 01/09/2026 style, amounts as plain numbers with no currency symbol and no comma. Watch how dates and numbers right-align — confirm they are real values, not text.03

### Demonstrate the one-fact-per-cell rule

Deliberately type 'Transport - 08034567890' into one cell, then split it into two columns and explain why the split version can be sorted, filtered and summed while the combined version cannot.04

### Format the amount column as currency

Select D2:D13, Home → Number Format → Accounting, choose the Naira symbol, 2 decimal places. Show that the underlying value did not change by clicking a cell and reading the formula bar.05

### Auto-fit columns and wrap the description

Double-click the boundary between column B and C headers to auto-fit. Select the Description column, click Wrap Text, then auto-fit the row heights by selecting all rows and double-clicking a row boundary.06

### Add borders and freeze the header

Select A1:D13, Home → Borders → All Borders. Then View → Freeze Panes → Freeze Top Row. Scroll down and show that the headers stay visible.07

### Write the SUM formula

In A15 type 'Total'. In D15 type `=SUM(D2:D13)` and press Enter. Then click D15 and drag the fill handle — the small square at the bottom-right corner — to show how formulas copy. Explain that D2:D13 becomes D3:D14 as it moves, which is relative referencing.08

### Add AVERAGE, MIN, MAX and COUNT

In D16 type `=AVERAGE(D2:D13)`, D17 `=MIN(D2:D13)`, D18 `=MAX(D2:D13)`, D19 `=COUNT(D2:D13)`. Label each in column A. Discuss what each number tells you about the month.09

### Break it on purpose, then fix it

Type '₦5,000' as text into D14 and show that SUM ignores it and COUNT does not count it. Delete it and explain the lesson: text in a number column is invisible to maths.10

### Save and print

Save as `Session-04_Expenses_YourName.xlsx`. Page Layout → set to fit one page wide, add borders, then Ctrl+P to preview. Export a PDF copy.

## Guided practice

### Personal or business expense sheet

Build a working expense sheet for a real month — yours, your family's, or a small business you know. Twelve entries minimum, properly formatted, with the five summary functions and a percentage breakdown of your three largest categories.

1. 01Create headers in row 1: Date, Description, Category, Amount.

2. 02Enter at least twelve real transactions with correct data types.

3. 03Format the Amount column as Naira accounting format.

4. 04Auto-fit columns, wrap descriptions, add all borders, freeze the header row.

5. 05Add a Total row using SUM.

6. 06Add AVERAGE, MIN, MAX and COUNT rows with labels.

7. 07Add a small summary block calculating each category's share as a percentage of the total.

8. 08Change one amount and confirm every figure updates automatically.

9. 09Save the .xlsx and export a one-page PDF.

The standard we hold you to

Every amount is a real number formatted as currency (not text), no merged cells in the data, the header row is frozen, all five functions return correct values, and editing one input updates every dependent figure.

## Common mistakes and how to fix them

A number is left-aligned and formulas ignore it

Fix: Excel read it as text, usually because of a leading apostrophe, a space, or a currency symbol typed by hand. Retype it as a plain number, or select the range and use Data → Text to Columns → Finish to force conversion.

SUM returns 0 or less than expected

Fix: There is text in the range, or the range does not cover the cells you think it does. Click the SUM cell and look at the coloured outline Excel draws around the referenced range — it shows you exactly what is included.

Your displayed total does not equal the sum of the displayed rows

Fix: Display rounding. The cells hold decimals but show whole numbers. Use =ROUND(value, 2) in the formula if the rounded figure is the true business value.

Sorting scrambles your data

Fix: You sorted one column instead of the whole table. Always select the entire data range (or click any cell and let Excel detect the region) before sorting, and confirm 'Expand the selection' when Excel asks.

Merged cells break your formulas

Fix: Unmerge. A merged cell occupies multiple addresses but stores its value in only the top-left one, so formulas referencing the others return empty. Use 'Centre Across Selection' in Format Cells → Alignment if you want the visual effect without the damage.

You typed a formula and the cell shows the text instead of the result

Fix: The cell is formatted as Text. Change the format to General, then double-click the cell and press Enter to re-evaluate it.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Learn Ctrl+arrow keys immediately. Ctrl+Down jumps to the last populated cell in a column, Ctrl+Right to the last in a row. Add Shift to select everything in between. This is how professionals navigate 5,000-row sheets, and it takes one afternoon to become automatic.

- Convert real data tables into Excel Tables (Ctrl+T). You get automatic banded rows, filter buttons, a header row that repeats, and — most valuable — formulas that expand automatically when you add rows. It also gives your ranges readable names like Table1[Amount].

- Name your important cells. Select the cell holding the VAT rate, type a name in the Name Box (say `VAT_Rate`), press Enter. Now `=B2*VAT_Rate` is self-documenting and cannot be broken by someone inserting a row. This is a five-second habit that makes sheets readable by other people.

- Press Ctrl+` (the backtick) to toggle formula view, which shows every formula in the sheet instead of results. It is the fastest way to audit a spreadsheet you did not build — and to check your own work before you send it.

## Key termsWorkbook / worksheetThe workbook is the file; worksheets are the tabs inside it. Every sheet has its own independent grid.Cell referenceA cell's address, written column letter then row number — C12, or a range like C12:C20.Formula barThe bar above the grid showing the true contents of the active cell, revealing whether a value is a number, a date or text.Number formatHow a value is displayed without changing the stored value — currency, percentage, date, decimals.Accounting formatA number format that left-aligns the currency symbol and shows negatives in brackets; the standard for financial statements.Freeze panesLocking header rows or columns in place so they remain visible while scrolling.Fill handleThe small square at a cell's bottom-right corner used to copy formulas or continue a series by dragging.COUNT vs COUNTACOUNT counts cells containing numbers; COUNTA counts any non-empty cell including text.

## Homework before the next session

Track real spending for one week

Record every expense for seven days in the sheet you built, then total it, average it and identify your largest category. Bring the numbers to the next session.

Practise cell references until they are automatic

On paper, write the addresses of ten cells the instructor calls out, and write the range notation for five blocks. Then do it in Excel against the clock.

Build a class attendance sheet

Create a sheet with student names down the rows and five session dates across the columns. Use COUNT to total attendance per student and per session.

Break your own sheet and diagnose it

Deliberately introduce a text value in a number column and a blank row inside a data range. Observe how SUM and COUNT respond, then fix both. Being able to diagnose is more valuable than never making the error.

## Assessment rubric

How this session is marked. The certificate for Microsoft Office is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Data structure | One fact per cell, headers in row 1, no blank rows inside the data. | Uses an Excel Table or named ranges, no merged cells in data, and consistent data types throughout. |
| Data types | Amounts are real numbers, dates are real dates. | Can demonstrate right-versus-left alignment as the text test and explain how date serial numbers work. |
| Formatting | Currency format applied, borders added, columns sized. | Accounting format, frozen header, wrapped text with fitted rows, and a print setup that fits one page. |
| Formulas | SUM, AVERAGE, MIN, MAX and COUNT return correct results. | Uses cell references rather than typed values, understands relative referencing when filling, and can explain why a formula result changed. |

## Session questionsShould I learn Excel or Google Sheets?+

Learn Excel first. It is what Nigerian employers specify, what government and bank forms assume, and it has the deeper feature set. Google Sheets is nearly identical in concept and you will pick it up in an afternoon once you know Excel — the formulas, references and formatting logic are the same.Why does Excel keep changing my phone numbers into scientific notation?+

It is treating the number as a numeric value and abbreviating a long one. Format the column as Text **before** typing, or prefix the entry with an apostrophe ('08034567890). Phone numbers, account numbers and ID numbers are identifiers, not quantities — they should always be text so leading zeros survive.What is the difference between =SUM(A1:A10) and =A1+A2+A3...?+

They give the same answer today and behave completely differently tomorrow. The range version automatically adapts if you insert a row inside it; the typed-out version does not, and silently omits the new row. Always use the range version.How do I stop Excel from auto-completing my entries?+

File → Options → Advanced → untick 'Enable AutoComplete for cell values'. AutoComplete copies patterns from the column above, which is helpful for categories and dangerous for names and amounts.My formula shows ###### instead of a number. What happened?+

Nothing is wrong with the formula — the column is too narrow to display the value. Double-click the column boundary to auto-fit. If a date shows #####, it means the date is negative, which means a subtraction produced an impossible date.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: Professional Documents](https://www.cea.ng/classes/microsoft-office/professional-documents)[Next session 5: Practical Excel](https://www.cea.ng/classes/microsoft-office/practical-excel)

Microsoft Office

3 weeks · 6 sessions · ₦30,000 · you leave with a formatted document, a working spreadsheet and a presentation[See the full course](https://www.cea.ng/classes/microsoft-office)[Enrol now](https://www.cea.ng/admissions)
