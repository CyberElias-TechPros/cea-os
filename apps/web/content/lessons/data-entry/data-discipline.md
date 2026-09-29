---
title: "Session 1: Data Discipline"
description: "Data entry is not typing. It is the discipline of moving information between systems without changing its meaning — and the habits that catch errors before a client does. This session builds that discipline: data types, fields, accuracy, speed, and the attention patterns that separate a professional from a liability."
date: "2026-09-13"
class_slug: "data-entry"
---

Data entry is not typing. It is the discipline of moving information between systems without changing its meaning — and the habits that catch errors before a client does. This session builds that discipline: data types, fields, accuracy, speed, and the attention patterns that separate a professional from a liability.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what data entry actually is as paid work, and what clients pay for

- Distinguish data types and explain why entering the wrong type breaks a spreadsheet

- Identify the components of a form, a table and a spreadsheet

- Define accuracy and speed correctly, and state realistic professional thresholds

- Describe and apply an error-catching routine rather than hoping not to make mistakes

- Set up a workspace and a file-naming system for data work

## The taught content

### What data entry actually is

Data entry is the transfer of information from one place to another — paper to spreadsheet, email to a CRM, one system to a better one, an image to text — where the value lies in the transfer being correct. It is paid work in Nigeria in real volume: hospitals digitising patient records, schools entering results, logistics firms capturing waybills, e-commerce sellers loading products, accounting firms keying invoices, research projects transcribing survey responses, and remote virtual-assistant work for foreign clients who pay in dollars.

What clients pay for is not keystrokes. It is the absence of errors. A retail inventory sheet with 200 wrong prices costs a business real money; a payroll sheet with one misplaced digit is a crisis; a research dataset with inconsistent entries is unusable and must be redone from source. This is why the professional standard is measured in accuracy percentage rather than speed, and why a slower, careful worker keeps clients while a fast, careless one loses them after the first audit. Understand that trade and you understand the whole job.

### Data types: the root of most errors

Every piece of data has a **type**, and the type determines what can be done with it. **Text** is anything read as characters — names, addresses, product descriptions. **Numbers** can be calculated on. **Dates** can be compared and subtracted. **Currency** is a number with a money format. **Boolean** is a yes/no or true/false flag. **Identifiers** — phone numbers, account numbers, ID numbers, invoice references — look numeric but are text, because you never add two phone numbers together and a leading zero is meaningful.

Getting the type wrong is the single most common data entry failure and it fails silently. Type a phone number as a number and Excel drops the leading zero and may show it in scientific notation; type a date as text and no date calculation will ever work on it; type an amount with a naira symbol by hand and it becomes text that SUM ignores. The visible symptom is a total that does not add up or a sort that produces nonsense, and by then the error is scattered across hundreds of rows. Learn to enter each type correctly at the point of entry and you eliminate the entire category.

### Fields, records, forms and tables

The vocabulary matters because it is how you describe problems precisely. A **field** is one category of information — surname, phone number, amount. A **record** (or row) is one complete entry across all fields — one customer, one transaction. A **table** is a set of records sharing the same fields. A **form** is the interface for entering one record at a time, and it is safer than a raw table because it shows one record, labels each field, and can validate as you type.

The rule that follows is **one fact per field**. Never enter 'Adebayo Okafor — 0803 456 7890 — Lagos' into a single cell. Split it into Name, Phone and City. Combined fields cannot be sorted, filtered, searched, deduplicated or reported on, and every client request that requires any of those becomes a manual re-typing job. If you receive data already combined, splitting it is often the first task you are being paid for.

### Accuracy, speed and the real thresholds

**Accuracy** is the proportion of fields entered correctly. **Speed** is throughput, usually records per hour or keystrokes per hour. They trade against each other, and the professional order is accuracy first, speed second — because speed is easy to gain with practice and accuracy is a discipline you either have or do not.

Realistic thresholds in Nigerian and remote work: general business data should be at 98% field accuracy minimum, with 99.5% or better being what makes a client keep you. Financial fields — amounts, account numbers, invoice references — should be at 100%, because a single error moves money. Speed expectations for general entry sit around 35–45 words per minute equivalent, or roughly 150–250 simple records per hour depending on field count. Note what those numbers imply: at 98% accuracy across 1,000 fields you have made twenty errors, which is why verification is not optional and is the subject of session three.

### The error-catching mindset

Errors are not avoided by concentration. Concentration is a finite resource and it fails on the four-hundredth row of a long session regardless of how careful you were. Errors are avoided by **process**: entering in a fixed order so you never skip a field, verifying in batches rather than at the end when the source is far away, checking totals against the source document, and reviewing at natural breakpoints rather than after hours of continuous entry.

Three habits do most of the work. First, **batch and verify**: enter twenty or fifty records, then check them against the source before continuing — errors found immediately are cheap, errors found after five hundred rows require re-reading everything. Second, **spot-check by column**: after a batch, scan one field down the whole column; inconsistencies in format, spelling or type jump out vertically in a way they never do horizontally. Third, **stop when you are tired**. Error rates climb steeply with fatigue, and the last hour of a long session produces most of the mistakes. Take a real break every forty-five minutes.

## Instructor demonstration

The instructor enters a set of records live — deliberately making the classic mistakes — then shows the class how each mistake is caught, and what it would have cost in a real client deliverable.

### Show the source document

Display a paper-style customer list with names, phone numbers, cities and amounts. Point out that the source is messy — inconsistent capitalisation, one missing phone number, one amount written in words.02

### Set up the spreadsheet correctly

Create headers in row 1: Surname, First Name, Phone, City, Amount, Date Joined. Explain that the structure is decided before any typing starts, and that changing it later means redoing the work.03

### Make the combined-field mistake

Deliberately enter 'Adebayo Okafor — 08034567890' into one cell, then try to sort by surname. Show that it cannot be done. Split the field and sort again.04

### Make the phone number mistake

Enter 08034567890 into a General-format cell and show Excel dropping the leading zero and switching to scientific notation. Format the column as Text, retype it, and confirm the zero survives.05

### Make the date mistake

Enter a date in an ambiguous form and show it landing left-aligned as text. Retype it correctly, confirm it right-aligns, then subtract two dates to prove the difference only works on real dates.06

### Make the currency mistake

Type '₦45,000' by hand into a cell, then run SUM over the column and show it ignoring the entry. Retype as 45000, apply Accounting format, and show the total change.07

### Demonstrate batch verification

Enter ten records, then verify all ten against the source before continuing. Narrate the difference in cost between catching an error now and catching it after row 500.08

### Demonstrate the column scan

After entering twenty records, scan the City column top to bottom and point out three inconsistent spellings of the same city. Show that the inconsistency is invisible horizontally and obvious vertically.09

### Check the total against the source

Sum the Amount column and compare with the source document's stated total. Show what a mismatch tells you — that at least one amount is wrong — even though it does not tell you which.10

### Set up the file-naming system

Save the file as 2026-09-13_ClientName_CustomerRegister_v1.xlsx into a dated project folder. Explain the naming pattern and why versions matter when a client asks what changed.

## Guided practice

### Enter, mistype, and catch it

You enter a thirty-record dataset from a messy source, deliberately introducing three typed errors in your first pass, then find all three using the verification methods from this session. The point is learning to catch errors, not to avoid them.

1. 01Create a spreadsheet with the headers: Surname, First Name, Phone, City, Amount, Date Joined.

2. 02Format the Phone column as Text and the Amount column as Accounting before typing anything.

3. 03Enter thirty records from the source sheet, one fact per field.

4. 04Deliberately introduce three errors: one wrong digit in a phone number, one wrong amount, one misspelt city.

5. 05Verify the first ten records against the source and find any error in that batch.

6. 06Scan each column top to bottom, looking for inconsistencies.

7. 07Sum the Amount column and compare with the source total.

8. 08Locate all three planted errors and correct them.

9. 09Write a two-line note describing how you found each one.

10. 10Save with the date-client-subject-version naming pattern.

The standard we hold you to

All fields correctly typed with the correct data types, no combined fields, all three planted errors found and corrected, and a written note that names the verification method that caught each one rather than saying 'I looked again'.

## Common mistakes and how to fix them

You enter phone numbers or ID numbers as numeric values

Fix: Format the column as Text before typing, or prefix with an apostrophe. Identifiers are not quantities — leading zeros are meaningful and they are never added together.

You type currency symbols into the cells

Fix: Type plain numbers and apply a currency number format. A hand-typed symbol turns the value into text, which SUM silently ignores.

You combine several facts into one field

Fix: One fact per field. If the source combines them, splitting them is the job. Combined fields cannot be sorted, filtered, deduplicated or reported.

You verify only at the very end

Fix: Verify in batches of twenty or fifty, immediately. An error caught on row 30 costs ten seconds; the same error caught on row 500 means re-reading everything.

You work for hours without a break and your error rate climbs

Fix: Break every forty-five minutes. Fatigue raises error rates faster than any other factor, and the mistakes made in the final hour are the ones that reach the client.

You fill gaps with guesses

Fix: Leave a cell empty and flag it. An honest blank with a query note is professional; a plausible guess that turns out wrong destroys trust in every other field you entered.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Decide the structure before you type a single character. Every minute spent deciding field names, order and data types saves ten minutes of restructuring later, and restructuring a half-finished sheet is where most data jobs go badly wrong.

- Format columns before entering data, not after. Excel converts as you type, so a column formatted as Text keeps your leading zeros while a General column destroys them silently. Setting formats first is a five-second habit that prevents an hour of cleanup.

- Keep the source document visible beside your work at all times, ideally on a second screen or split view. Every time you look away and back you introduce a chance of skipping a row, and skipped rows are the hardest errors to detect after the fact.

- Count your rows against the source when you finish. If the source has 480 records and your sheet has 479, you missed one — and that single check catches the most dangerous error type, because a missing record is invisible in every other check.

## Key termsFieldOne category of information — a column. Examples: surname, phone, amount.RecordOne complete entry across all fields — a row. One customer, one transaction.Data typeThe kind of value a field holds: text, number, date, currency, boolean. Wrong types fail silently.IdentifierA number-like value that is really text — phone, account, ID, invoice reference. Never formatted as a number.Field accuracyThe proportion of individual fields entered correctly. The metric clients actually care about.Batch verificationChecking a small group of records against the source immediately after entering them.Column scanReading one field down the whole column to spot inconsistencies that are invisible horizontally.Source documentThe original material you are transcribing from. Keep it visible throughout.

## Homework before the next session

Design a register for something real

Choose something you actually track — church attendance, shop sales, class results — and design the field structure: name each field, state its data type, and say why. Bring the design to the next session.

Enter fifty records from a messy source

Take any real list you can find and enter it with correct types, one fact per field, verifying every twenty records. Report your accuracy and how long it took.

Practise the column scan

After entering your fifty records, scan each column vertically and list every inconsistency you find — spelling, capitalisation, format. This exercise trains the eye that gets you kept.

Write your error-catching routine

In five lines, write the routine you will follow on every data job: order of entry, batch size, verification method, break schedule. Having it written means you follow it when tired.

## Assessment rubric

How this session is marked. The certificate for Data Entry is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Structure | Uses separate fields with headers in row 1. | Decides and documents the structure before entry, with a stated data type for every field. |
| Data types | Most values entered with the correct type. | Identifiers stored as text, amounts as real numbers, dates as real dates, with formats applied before entry. |
| Verification | Verifies work at some point. | Verifies in batches immediately, scans by column, reconciles totals and counts rows against the source. |
| Error detection | Finds at least two of the three planted errors. | Finds all three and can name the specific method that caught each one. |
| Professional habits | Files named sensibly and work saved correctly. | Uses the date-client-subject-version pattern, flags gaps rather than guessing, and keeps the source visible throughout. |

## Session questionsIs data entry still a real job with AI around?+

Yes, but the shape has changed. Clean retyping of legible documents is being automated. What still pays is the messy middle: reconciling two systems that disagree, cleaning historical records, verifying entries against source documents, and owning a register a business depends on. This course teaches the verification and cleaning half, which is the half that survives automation.What accuracy do I need to be paid?+

98% field accuracy is the working minimum for general business data and 99.5% or better is what keeps a client. Financial fields should be 100%. Session four tests you at those thresholds and shows you how to structure work so errors get caught before delivery.Can I do this work remotely for foreign clients?+

Yes, and it is where the better rates are. Remote data entry and virtual-assistant roles are commonly advertised on Upwork, OnlineJobs.ph-style boards and through referrals, and they pay in dollars. What gets you the work is a demonstrated accuracy figure and a sample of clean work — which is exactly what the session-four practical gives you.My typing is slow. Can I still take this course?+

Yes. Slow and accurate beats fast and wrong every time in this work, and speed improves with the drills. If your typing is very slow, Typing & Computer Basics first will make the timed practical in session four far more comfortable.What software do I need?+

Microsoft Excel or Google Sheets — either is fine and the skills transfer directly, because concepts matter more than buttons. Some clients specify one or the other, and being comfortable in both is a genuine advantage in remote work.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Spreadsheets for Data Work](https://www.cea.ng/classes/data-entry/spreadsheets-for-data-work)

Data Entry

2 weeks · 4 sessions · ₦20,000 · you leave with a cleaned and organised dataset[See the full course](https://www.cea.ng/classes/data-entry)[Enrol now](https://www.cea.ng/admissions)
