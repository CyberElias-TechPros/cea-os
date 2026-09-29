---
title: "Session 5: Practical Excel"
description: "The Excel skills that turn a list into a report. Sorting and filtering to interrogate data, tables for structure, percentages and calculations for insight, relative references for scale, and charts for communicating the result — finished with printing that actually fits the page."
date: "2026-09-12"
class_slug: "microsoft-office"
---

The Excel skills that turn a list into a report. Sorting and filtering to interrogate data, tables for structure, percentages and calculations for insight, relative references for scale, and charts for communicating the result — finished with printing that actually fits the page.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Sort data by one or several columns without scrambling rows

- Filter a list to answer a specific question

- Convert a range into an Excel Table and use its features

- Calculate percentages, VAT, discounts and growth correctly

- Use relative and absolute references deliberately

- Choose and build the right chart — bar, pie or line

- Set up a spreadsheet to print cleanly

## The taught content

### Sorting and filtering: asking questions of your data

**Sorting** reorders rows. Data → Sort lets you sort by one column, or add levels — sort by Category, then within each category by Amount descending. The rule that prevents disaster: always sort the whole table, never a single column. If Excel prompts 'Expand the selection', choose it. Sorting one column alone shuffles that column against the others and destroys the relationship between a name and its amount, which is a data-integrity failure you may not notice for weeks.

**Filtering** hides rows that do not match a condition, leaving the data intact. Select the table, Data → Filter, and dropdown arrows appear on the headers. Tick boxes for exact values, or use Text Filters / Number Filters for conditions like 'greater than 50000' or 'contains church'. The status bar then shows the count and sum of visible cells only — which is how you answer 'what did we spend on transport this month' in three clicks. To clear, use Data → Clear; the data was never deleted, only hidden.

### Tables, percentages and calculations

Select any data range and press **Ctrl+T** to convert it to an Excel Table. You gain filter buttons, banded rows, automatic expansion, a repeating header on every printed page, and structured references. It also means new rows inherit the column's format and formulas automatically. For any list you will keep adding to, this is the first thing to do.

**Percentages** are where most spreadsheet errors live. A percentage is a ratio, and Excel stores ratios as decimals: 15% is 0.15. To find what share one item is of a total, divide: `=D2/$D$15`, then format the result as Percentage. To add VAT of 7.5% to an amount, multiply by 1.075 (`=D2*1.075`) — not by 0.075, which gives you only the VAT. To remove VAT from a VAT-inclusive figure, divide by 1.075. Learn these three patterns cold; they cover most Nigerian financial spreadsheet work, and 7.5% VAT appears in almost all of it.

Then the everyday calculations: discount `=Price*(1-DiscountRate)`; margin `=(Selling-Cost)/Selling`; growth between two periods `=(New-Old)/Old`; running total `=SUM($D$2:D2)` filled down, where the mixed reference locks the start and lets the end move.

### Relative, absolute and mixed references

This is the concept that separates people who use Excel from people who fight it. When you copy a formula, Excel adjusts its references **relative** to how far the formula moved. `=B2*C2` filled down one row becomes `=B3*C3` — usually exactly what you want. But if that formula refers to a fixed cell, like a VAT rate in E1, filling it down turns E1 into E2, E3, E4 and your calculation quietly breaks.

The dollar sign locks a reference. `$E$1` never changes no matter where the formula is copied — that is an **absolute** reference. `$E1` locks the column but lets the row move; `E$1` locks the row but lets the column move — these are **mixed** references and they are what make cross-tabulation tables work. Press **F4** while the cursor is inside a reference to cycle through the four forms. Learn to reach for F4 without thinking: it is the single keystroke that prevents the most expensive category of spreadsheet error, the one where the numbers look plausible and are wrong.

### Charts: choosing the right picture

Charts exist to answer a question faster than reading numbers can. Choose by the question, not by what looks attractive. **Bar and column charts** compare quantities across categories — spending by category, sales by branch. Use columns for few categories with short labels and horizontal bars when labels are long. **Pie charts** show parts of a whole and are only honest with five slices or fewer, clearly different values, and a total that genuinely sums to 100% — otherwise use a bar chart. **Line charts** show change over time and are the correct choice for anything with dates on the horizontal axis; a pie chart of monthly figures is meaningless because months are not parts of a whole.

Build them from properly structured data: categories in one column, values in the adjacent column, headers in row 1. Select both, Insert → the chart type. Then do the three things beginners skip: give the chart a title that states the finding rather than the topic ('Transport was 34% of September spending', not 'Spending Chart'), add axis titles with units, and add data labels only where they help. Delete the legend if the categories are already labelled on the axis. Resize by dragging corners, never edges, or you distort the proportions.

### Printing spreadsheets that fit

Spreadsheets print badly by default because they are wide. Fix it deliberately: Page Layout → Orientation → Landscape for wide tables; Scale → 'Fit All Columns on One Page' so nothing spills onto a second sheet; Margins → Narrow if needed; and Page Layout → Print Area → Set Print Area to print only the table rather than the empty grid. Print Titles (Page Layout → Print Titles → Rows to repeat at top) makes your header row appear on every printed page, which is essential for multi-page reports.

Before printing anything, Ctrl+P and read the preview page by page. Check that no column is split across pages, that totals appear on the last page, and that gridlines and headers are on if you want them (Page Layout → Sheet Options → Print → tick Gridlines and Row & Column Headings). Then export a PDF and send that, because a PDF preserves the layout you just fought for.

## Instructor demonstration

Starting from last session's expense sheet, the instructor produces a one-page monthly report with a summary table and two charts.

### Convert to a table

Click any cell in the data, Ctrl+T, confirm the range includes headers. Note the filter arrows and banded rows. Add three more rows and show that formatting and formulas carried down automatically.02

### Sort and filter to answer a question

Sort by Amount descending to find the biggest expenses. Then filter Category to 'Transport' and read the count and sum from the status bar. Clear the filter and confirm no data was lost.03

### Build a category summary with percentages

Create a small summary block listing each category. Use SUMIF to total each category's amount, then divide by the grand total using an absolute reference to the total cell, and format as Percentage. Show what happens without the dollar signs — this is the F4 lesson made visible.04

### Add a VAT calculation

Add a column showing 7.5% VAT on each amount using `=D2*0.075`, and another showing the VAT-inclusive total using `=D2*1.075`. Explain the difference between adding VAT and extracting it.05

### Build a column chart

Select the summary block's categories and amounts, Insert → Column Chart. Retitle it to state the finding. Add data labels. Delete the legend since the axis already names the categories.06

### Build a pie chart correctly

Same data, Insert → Pie Chart. Show what it looks like with eight categories and discuss why it fails, then group the smallest three into 'Other' and show the improvement.07

### Build a line chart from dated data

Summarise spending by date, select date and amount, Insert → Line Chart. Contrast this with the pie chart of the same data and explain why the line is the only honest choice.08

### Set up printing

Landscape, Fit All Columns on One Page, Print Titles set to row 1, print area set to the report block. Preview every page.09

### Audit before sending

Ctrl+` to show all formulas. Read every one aloud and confirm each references what it should. Then export the PDF.

## Guided practice

### Sales or expense report

Produce a one-page monthly report from a raw dataset: a category summary with percentages, at least two correctly chosen charts, and a three-sentence written summary of what the data shows.

1. 01Convert the raw data into an Excel Table.

2. 02Sort and filter to identify the three largest items.

3. 03Build a category summary with amounts and percentage shares.

4. 04Add VAT or discount calculations where relevant to the data.

5. 05Create one bar or column chart and one line or pie chart, chosen for the question each answers.

6. 06Title each chart with its finding, not its topic.

7. 07Write three sentences interpreting the results in plain language.

8. 08Set up the page and export a one-page PDF.

The standard we hold you to

The report fits one page, every chart type is justified by the question it answers, percentages sum to 100%, references use absolute locking where required, and the written summary states findings rather than describing the chart.

## Common mistakes and how to fix them

Sorting one column destroys the row relationships

Fix: Always sort the whole table. When Excel asks, choose 'Expand the selection'. If you use an Excel Table, this cannot happen.

Percentages do not add up to 100%

Fix: Either the denominator differs between rows (you forgot the absolute reference) or categories overlap. Check every percentage divides by the same total cell, written as $D$15.

You added VAT by multiplying by 0.075 and got a tiny number

Fix: 0.075 gives you the VAT alone. Multiply by 1.075 to get the VAT-inclusive total. To reverse a VAT-inclusive figure, divide by 1.075 — never multiply by 0.925.

A pie chart with twelve slices is unreadable

Fix: Group the small categories into 'Other' or switch to a bar chart sorted descending. If you cannot read the slices, the reader cannot either.

A line chart of monthly data was drawn as a bar chart

Fix: Time belongs on a line chart. Bar and column charts compare separate categories; a line shows a trend, which is the actual point of monthly data.

The report prints across four pages and columns are split

Fix: Page Layout → Scale → Fit All Columns on One Page, set the print area, and set Print Titles to repeat the header row. Preview before printing.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Learn SUMIF and COUNTIF this session even though they are not on the topic list — `=SUMIF(CategoryRange,"Transport",AmountRange)` replaces an entire manual filter-and-add workflow. They are the most-used functions in real Nigerian business spreadsheets after SUM itself.

- Use Paste Special → Values when you have finished with a calculation and want to freeze the results. Copy, then right-click → Paste Special → Values. The formulas become static numbers, which prevents someone editing an input and silently changing your delivered report.

- Duplicate a worksheet (right-click the tab → Move or Copy → Create a copy) before making experimental changes. It costs nothing and it means you can always compare against the original — the spreadsheet equivalent of keeping a backup.

- Name your charts' source ranges and keep chart data adjacent to the chart. When a chart is built from a range on another sheet, nobody can audit it six months later. Keep the summary block visible next to the chart it feeds.

## Key termsFilterTemporarily hides rows that do not match a condition. Data is never deleted, only hidden.Excel TableA structured range (Ctrl+T) with automatic formatting, filters, expansion and structured references.Absolute referenceA cell reference with dollar signs — $E$1 — that does not change when the formula is copied.Mixed referenceA reference locking either the row or the column only, such as $E1 or E$1.SUMIF / COUNTIFFunctions that total or count only the rows matching a condition.Data labelsValues printed directly on chart elements so the reader does not have to estimate from the axis.Print areaThe specific range Excel will print, excluding everything else on the sheet.Print titlesRows or columns repeated at the top or left of every printed page.

## Homework before the next session

Analyse a real dataset

Take your own month of spending, or ask a small business you know for an anonymised sales list, and produce the full report: summary, percentages, two charts, three findings.

Master F4

Build a small table where one formula must reference a fixed rate cell. Fill it down with and without absolute references and compare. Write down what F4 does in one sentence.

Deliberately choose the wrong chart and defend it

Make a pie chart of twelve categories and a line chart of a single comparison. Explain in writing why each is wrong and what the correct choice would be. Recognising a bad chart is a professional skill.

Print a real report

Configure page setup so your report prints on exactly one A4 page, then actually print it or export the PDF. Verify no column is split and the header repeats.

## Assessment rubric

How this session is marked. The certificate for Microsoft Office is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Data interrogation | Sorts and filters correctly without scrambling rows. | Uses multi-level sorting, Excel Tables and SUMIF to answer questions without manual work. |
| Calculation accuracy | Percentages and VAT calculations are correct. | Uses absolute and mixed references deliberately and can explain the difference between adding and extracting VAT. |
| Chart selection | Charts are built and readable. | Each chart type is justified by the question, titled with its finding, and honestly represents the data. |
| Reporting | Report fits one page with a header and totals. | Print area, titles and scale configured, plus a written interpretation stating findings rather than describing charts. |

## Session questionsWhen should I use a pie chart at all?+

Rarely. A pie chart is honest only when you have five or fewer categories, the slices are visibly different sizes, and the parts genuinely sum to a whole. For almost everything else a horizontal bar chart sorted from largest to smallest communicates the same information faster and more accurately.How do I calculate a running total?+

Use a mixed reference: `=SUM($D$2:D2)` in the first row, then fill down. The start is locked with dollar signs while the end moves, so each row sums everything from the top to itself. This is the clearest practical demonstration of why mixed references exist.My filter hides rows but the total at the bottom still counts them+

Correct — SUM ignores filters. Use SUBTOTAL(109, range) instead of SUM; the 109 tells it to sum only visible rows and to ignore other SUBTOTAL results. This is standard practice on any sheet people will filter.What is the difference between a chart and a PivotChart?+

A regular chart plots a range you prepared. A PivotChart is driven by a PivotTable, which summarises raw data interactively — drag a field and the totals recalculate. PivotTables are the next step beyond this session and are the single most valuable Excel skill for reporting work.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Excel Fundamentals](https://www.cea.ng/classes/microsoft-office/excel-fundamentals)[Next session 6: PowerPoint](https://www.cea.ng/classes/microsoft-office/powerpoint)

Microsoft Office

3 weeks · 6 sessions · ₦30,000 · you leave with a formatted document, a working spreadsheet and a presentation[See the full course](https://www.cea.ng/classes/microsoft-office)[Enrol now](https://www.cea.ng/admissions)
