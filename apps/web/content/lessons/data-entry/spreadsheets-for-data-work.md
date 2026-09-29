---
title: "Session 2: Spreadsheets for Data Work"
description: "The spreadsheet is where data entry lives. This session covers the parts of Excel and Google Sheets that data work actually depends on — structure, rows and columns, formatting for each data type, dates, names, phone numbers and addresses — then sorting, filtering and removing duplicates to clean what you have entered."
date: "2026-09-12"
class_slug: "data-entry"
---

The spreadsheet is where data entry lives. This session covers the parts of Excel and Google Sheets that data work actually depends on — structure, rows and columns, formatting for each data type, dates, names, phone numbers and addresses — then sorting, filtering and removing duplicates to clean what you have entered.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Work fluently in both Microsoft Excel and Google Sheets

- Structure a sheet so it stays usable as it grows to thousands of rows

- Apply the correct format to each data type before entering data

- Handle dates, names, phone numbers and addresses so they sort and search correctly

- Sort data by one or more columns without scrambling rows

- Filter a dataset to inspect or extract a subset

- Find and remove duplicate records safely

## The taught content

### Excel and Sheets: the same ideas, two interfaces

Microsoft Excel and Google Sheets are the two tools this work is done in, and they share almost every concept: rows, columns, cells, references, formats, sorting, filtering. The differences that matter in practice are that Excel is what Nigerian employers and government forms assume, is faster on very large files, and has the deeper feature set; while Google Sheets is free, lives in the browser, saves automatically, and allows several people to edit at once — which is why remote clients often prefer it.

Learn Excel first, because its concepts are a superset and Sheets will feel familiar within an afternoon. Two Sheets-specific habits are worth knowing early: it stores everything in Drive so there is no save step, and its menu equivalents live under Data rather than under the Home ribbon. If a client sends you a .xlsx and you open it in Sheets, be careful about formats on download — round-tripping through the two tools can alter date and number formatting, so check a sample after converting.

### Structure that survives growth

A data sheet has one job structurally: be a clean rectangle. **Headers in row 1**, one per column, named clearly and consistently — no merged header cells, no two-row titles, no decorative banner above the data. **Data from row 2 downward**, one record per row, with **no blank rows inside the data** — Excel and Sheets both detect the extent of a dataset by finding the first blank row, so one stray blank row silently truncates every sort, filter and formula range you apply. And **no merged cells anywhere in the data**: a merged cell stores its value in only the top-left position, so the others read as empty and sorting breaks.

Then make it a real table. In Excel, select the data and press **Ctrl+T** to convert it to a Table; in Sheets, use Data → Create a filter or Data → Named ranges. A table gives you filter buttons, banded rows that make scanning easier, a header that repeats when printing, and — most valuable — automatic expansion, so new rows inherit the column's format and formulas instead of arriving unformatted and silently outside your ranges.

### Formatting each data type correctly

**Dates** are the most common source of quiet failure. Excel and Sheets store dates as serial numbers, which is what makes date arithmetic possible — subtract one date from another and you get days. But that only works if the value was recognised as a date, and the giveaway is alignment: real dates and numbers right-align, text left-aligns. If your date sits on the left, it is text and no calculation will ever work on it. Enter dates in an unambiguous form and let the number format handle display, because 03/04/2026 means April the third to some people and the third of April to others.

**Names** need consistency more than correctness. Decide once whether you store Surname and First Name in separate columns (recommended, because it sorts and searches properly) or a single Full Name column, and whether you use Title Case throughout. Inconsistent capitalisation — 'adebayo', 'ADEBAYO', 'Adebayo' in the same column — breaks deduplication and looks unprofessional in any report. Use PROPER() to fix a whole column at once if you inherit a mess.

**Phone numbers** are text, always. Format the column as Text before typing, or prefix with an apostrophe, so the leading zero survives and the value never becomes scientific notation. Decide on one format — `0803 456 7890` is the most readable Nigerian convention — and apply it consistently, because mixed formats make deduplication impossible. **Addresses** should be split into at least Street, City and State; a single address blob cannot be filtered by city, which is one of the first things a client asks for.

### Sorting: asking a question of your data

Sorting reorders rows so patterns become visible. Excel: Data → Sort. Sheets: Data → Sort range. You can sort by one column or add levels — sort by City, then within each city by Surname — which is how you produce a grouped report. The rule that prevents disaster is to **always sort the whole table, never a single column**. Sorting one column alone shuffles it against the others and destroys the relationship between a name and its phone number, which is a data-integrity failure you may not notice for weeks. If the tool prompts 'Expand the selection', choose it; if you have used a real Table, the problem cannot arise.

Sorting is also your best error-finding tool. Sort a numeric column ascending and the outliers appear at both ends — an amount ten times larger than the rest, or a negative value that should not exist. Sort a text column and the inconsistencies group together, so 'LAGOS', 'Lagos' and 'lagos' sit adjacent and become obvious. Sort by date and the impossible entries — a 1900 date, a future date — surface immediately. Whenever a dataset feels wrong, sort it; it is faster than reading.

### Filtering and removing duplicates

**Filtering** hides rows that do not match a condition while leaving the data intact. Turn on filter buttons (Data → Filter), then use the dropdown on any column to tick specific values or apply conditions such as 'greater than' or 'contains'. This is how you answer a client question in three clicks — 'show me everyone in Port Harcourt who joined this year' — and how you inspect one field across the whole dataset without scrolling. To clear, use Data → Clear; nothing was ever deleted, only hidden. One important note: a SUM over a filtered range still counts the hidden rows, so use SUBTOTAL(109, range) when you want the visible total.

**Duplicates** are inevitable in real data — the same customer entered twice, the same invoice captured by two people. Find them with Conditional Formatting → Highlight Cells Rules → Duplicate Values to see them, then Data → Remove Duplicates to delete them. Read the Remove Duplicates dialog carefully before confirming: it deletes rows that match on the columns you have ticked, so if you tick only Surname you will delete every second person who shares a surname. Tick the columns that together define a unique record — usually the full set of identifying fields — and always work on a copy of the sheet first, because the deletion is immediate and not always undoable.

## Instructor demonstration

The instructor takes a deliberately messy 200-row register — mixed formats, duplicates, blank rows, merged cells — and cleans it live while explaining every decision, then repeats the key steps in Google Sheets.

### Show the mess

Open the raw register. Point out the merged header, the blank row in the middle, three capitalisation styles for names, phone numbers in four different formats, dates that are text, and an obvious duplicate.02

### Remove merged cells and the banner

Unmerge everything, delete the decorative top rows, and get headers into row 1. Explain why a clean rectangle is the precondition for everything else.03

### Split combined fields

Use Text to Columns to split a combined name-and-phone column on the separator. Show the result and explain that this single operation is a billable task in real work.04

### Fix phone numbers

Format the column as Text, then use Find and Replace to strip spaces and dashes so every number follows one format. Verify the leading zeros survived.05

### Fix dates

Identify the text dates by their left alignment, retype or convert a sample, apply a consistent date format, and prove date arithmetic now works by subtracting two dates.06

### Normalise capitalisation

Add a helper column using PROPER(), fill it down, copy it, paste as values over the original, then delete the helper. Show the before and after.07

### Convert to a Table

Press Ctrl+T and confirm the range. Show the filter buttons, banded rows and automatic expansion by adding a new row and watching the format carry down.08

### Sort and inspect

Sort by Amount ascending and point out the outliers at both ends. Sort by City and show the capitalisation inconsistencies now grouped together.09

### Filter to answer a question

Filter to one city and read the visible record count. Change the SUM to SUBTOTAL(109, range) and show the total updating to visible rows only.10

### Find and remove duplicates

Highlight duplicates with Conditional Formatting first so the class can see them. Then use Remove Duplicates with the correct columns ticked, on a copy, and report how many rows were removed.11

### Repeat in Google Sheets

Open the same file in Sheets and perform the sort, filter and duplicate removal using its menus, noting where the options live differently and what to check after converting formats.

## Guided practice

### Clean a messy register

You are given a 200-row register containing every common defect: merged headers, blank rows, mixed capitalisation, inconsistent phone formats, text dates, and at least five duplicates. Produce a clean, structured, correctly formatted table in both Excel and Google Sheets.

1. 01Work on a copy of the file and name it with the date-client-subject-version pattern.

2. 02Remove merged cells and any banner rows so headers sit in row 1.

3. 03Split any combined fields into separate columns.

4. 04Format the Phone column as Text and normalise every number to one format.

5. 05Convert text dates to real dates and apply one consistent date format.

6. 06Normalise name capitalisation using a PROPER() helper column, pasted back as values.

7. 07Remove any blank rows inside the data range.

8. 08Convert the range to a Table (Excel) and apply a filter (Sheets).

9. 09Sort by Amount ascending and list the three largest and three smallest values.

10. 10Filter to one city and report the record count and the visible-only total using SUBTOTAL.

11. 11Highlight duplicates, then remove them on the correct columns, reporting how many rows went.

12. 12Save the cleaned file and repeat steps 7 to 11 in Google Sheets.

The standard we hold you to

A clean rectangle with headers in row 1, no merged cells, no blank rows, no duplicates, every field in the correct data type with consistent formatting, working in both Excel and Google Sheets, with the record count before and after stated.

## Common mistakes and how to fix them

A blank row in the middle truncates your sort or formula

Fix: Delete blank rows inside the data range. Both tools find the end of a dataset at the first blank row, so everything below it is silently excluded. Convert to a Table so the range is explicit instead of guessed.

You sorted one column and now names do not match phone numbers

Fix: Always sort the whole table, and choose 'Expand the selection' when prompted. If the damage is done and you cannot undo, you must re-enter from source — which is why using a Table is worth the habit.

Remove Duplicates deleted records you needed

Fix: You ticked too few columns, so genuinely different people matched. Tick every column that together defines a unique record, preview with Conditional Formatting first, and always work on a copy.

Your dates will not calculate

Fix: They are stored as text — check the left alignment. Re-enter them in an unambiguous form or convert them, then apply a date format. Text dates cannot be subtracted, sorted chronologically or filtered by month.

Phone numbers lost their leading zeros

Fix: They were entered as numbers. Format the column as Text before typing, or prefix with an apostrophe. If the zeros are already gone you must retype or pad them back with a formula, because the information is genuinely lost.

Your filtered total still includes hidden rows

Fix: SUM ignores filters by design. Use SUBTOTAL(109, range) for a visible-only total. This is standard on any sheet a client will filter themselves.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Freeze the header row on every sheet you touch — View → Freeze Panes → Freeze Top Row. On a 2,000-row register, losing sight of which column is which causes more entry errors than any other single factor, and it takes two seconds to prevent.

- Use Data Validation (Data → Data validation) to restrict a column to a list of allowed values — city names, yes/no, a product code list. It stops typos at the point of entry rather than requiring you to find them later, and it is the difference between a sheet that stays clean and one that decays.

- Learn Ctrl+arrow keys immediately. Ctrl+Down jumps to the last populated cell in a column, and Ctrl+Shift+Down selects everything in between. On large sheets this is the difference between working quickly and scrolling for minutes, and it takes one afternoon to become automatic.

- Keep a helper-column habit. Adding a temporary column with a formula to fix a value, then pasting it back as values and deleting the helper, is cleaner and safer than editing cells by hand — and it is reproducible, so you can show a client exactly what you changed.

## Key termsHeader rowRow 1, holding one clear column name per field. Never merged, never split across two rows.Excel TableA structured range (Ctrl+T) with filters, banded rows, automatic expansion and a repeating print header.Text to ColumnsThe tool that splits one column into several on a separator — the standard fix for combined fields.Serial dateHow spreadsheets store dates internally, as a number of days. This is what makes date arithmetic possible.Data validationA rule restricting what can be entered in a column, preventing typos at the point of entry.FilterTemporarily hides rows not matching a condition. Data is never deleted, only hidden.SUBTOTALA function that aggregates only visible rows — use SUBTOTAL(109, range) for a filtered sum.Remove DuplicatesDeletes rows matching on the ticked columns. Irreversible in practice, so preview and work on a copy.

## Homework before the next session

Clean a real dataset

Find or request a genuinely messy list — a church register, a shop's customer list, a class result sheet — and clean it to the standard in this session. Report the record count before and after.

Set up data validation on one column

Restrict a City column to a fixed list of allowed values and try to enter something not on the list. Note what the tool does and why that prevents a whole class of errors.

Practise the same work in both tools

Do one cleaning task in Excel and the identical task in Google Sheets. Write down where the menus differ. Being fluent in both is a real advantage in remote work.

Learn five navigation shortcuts

Ctrl+Down, Ctrl+Shift+Down, Ctrl+T, Ctrl+F, Ctrl+H. Use only these for one working session and note how much scrolling you avoided.

## Assessment rubric

How this session is marked. The certificate for Data Entry is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Structure | Headers in row 1, no merged cells, no blank rows in the data. | Converted to a Table with a frozen header, and the structure would survive another 2,000 rows unchanged. |
| Data types and formatting | Most fields correctly typed and consistently formatted. | Identifiers as text with leading zeros intact, real dates, one phone format throughout, names normalised with a helper column. |
| Sorting and filtering | Sorts and filters correctly without scrambling rows. | Uses multi-level sorting, reads outliers from a sorted column, and uses SUBTOTAL for visible-only totals. |
| Deduplication | Finds and removes duplicates. | Previews with conditional formatting, selects the correct uniqueness columns, works on a copy, and reports rows removed. |
| Tool fluency | Completes the work in one tool. | Completes it in both Excel and Google Sheets and can explain where the two differ. |

## Session questionsExcel or Google Sheets — which should I learn?+

Excel first. It is what Nigerian employers specify, what government and bank forms assume, and it has the deeper feature set. Sheets is nearly identical in concept and you will pick it up in an afternoon, and being comfortable in both is genuinely valuable for remote work where clients often prefer Sheets.How do I handle a file with 50,000 rows?+

Never scroll it. Use Ctrl+Down to jump to the end, filters to inspect subsets, and formulas or pivot tables to summarise. Convert it to a Table so ranges are explicit. If it is genuinely enormous, the client should be using a database rather than a spreadsheet, and saying so is part of the job.I removed duplicates and now the count is wrong. What happened?+

Either you ticked too few columns and deleted distinct records, or you ticked too many and left real duplicates behind. Reopen the original, preview duplicates with conditional formatting, decide which columns together make a record unique, then redo it on a fresh copy.Why does my spreadsheet get slow as it grows?+

Usually volatile formulas recalculating over large ranges, excessive conditional formatting, or whole-column references like A:A. Restrict formulas to the actual data range, use a Table so ranges stay tight, and remove conditional formatting rules you no longer need.Should I learn pivot tables in this course?+

They are introduced at the end of session four as the natural next step, and covered properly in Data Analytics. For pure data entry work you need sorting, filtering and deduplication far more often than pivots — but knowing a pivot exists tells you when a client's request is a summary job rather than a cleaning job.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Data Discipline](https://www.cea.ng/classes/data-entry/data-discipline)[Next session 3: Transcription & Validation](https://www.cea.ng/classes/data-entry/transcription-and-validation)

Data Entry

2 weeks · 4 sessions · ₦20,000 · you leave with a cleaned and organised dataset[See the full course](https://www.cea.ng/classes/data-entry)[Enrol now](https://www.cea.ng/admissions)
