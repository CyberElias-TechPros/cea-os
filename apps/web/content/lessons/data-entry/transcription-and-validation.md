---
title: "Session 3: Transcription & Validation"
description: "Transcription is reading a source and reproducing it exactly; validation is proving that what you reproduced is right. This session covers the workflow of transcription, then the checks that catch errors before a client does — verification passes, cross-checks, totals reconciliation and data validation rules built into the sheet."
date: "2026-09-12"
class_slug: "data-entry"
---

Transcription is reading a source and reproducing it exactly; validation is proving that what you reproduced is right. This session covers the workflow of transcription, then the checks that catch errors before a client does — verification passes, cross-checks, totals reconciliation and data validation rules built into the sheet.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Set up a transcription workflow that minimises the chance of error

- Transcribe accurately from paper, images and handwriting

- Apply a verification pass that is genuinely independent of the entry pass

- Use totals reconciliation to prove a dataset matches its source

- Build data validation rules into a sheet so errors cannot be entered

- Flag ambiguity and missing data professionally instead of guessing

## The taught content

### Transcription as a disciplined workflow

Transcription is the reproduction of information from a source into a structured destination with no change of meaning. The failure mode is not speed — it is drift. When you type the same kind of record five hundred times, your attention narrows, you begin predicting what the next record contains, and you enter what you expected rather than what is written. Every experienced data-entry worker knows this feeling, and the professional response is a workflow that resists it rather than a promise to concentrate harder.

The workflow has four parts. **Position the source and the destination side by side** so your eyes travel the minimum distance — a second monitor, a split screen, or the source taped directly beside the screen. **Work in batches of twenty or fifty records** rather than continuously, because verification is only reliable while the source is still fresh in your mind. **Verify each batch immediately**, not at the end of the day. And **track your position** explicitly, with a ruler or a blank sheet sliding down a paper source, so you can never lose your place or double-enter a line.

### Transcribing the difficult sources

Handwriting is the hard case, and the rule is that **you never guess**. An unclear character becomes a flagged cell with a query note, not a plausible letter. Guessing is worse than leaving a gap because a confident-looking wrong value gets accepted and propagates into every downstream calculation, whereas a flagged gap is obviously a gap and gets answered. Build a queries column or a separate queries sheet, mark the record, and deliver the dataset with the queries listed — clients respect this far more than a complete sheet they cannot trust.

Images and scans have their own problems: skew that makes a column of figures misalign, low contrast that turns a 5 into a 6 or a 0 into an O, and compression that blurs digits. Zoom to 150% or more on any ambiguous digit rather than squinting at full size. When a document is a photograph of a table, check whether the row you are reading is actually the row you think it is — misreading across a skewed line is one of the most common and least detectable transcription errors, because every field looks plausible on its own.

Audio transcription — survey responses, interviews, meeting notes — is a related skill where you additionally decide what to record verbatim and what to summarise, and you must decide it once and apply it consistently. Inconsistent transcription conventions make a dataset unusable even when every word is accurate, because the same answer is sometimes captured in full and sometimes paraphrased.

### The independent verification pass

Verification only works if it is **independent** of entry. Reading your own work back the way you entered it reproduces the same expectations and finds almost nothing — you will read the value you meant to type, not the value that is there. Three techniques break that. First, **verify in a different direction**: you entered left to right across fields, so verify top to bottom down each column. Second, **verify a different attribute**: instead of re-reading every character, check the shape of the data — does every phone number have eleven digits, does every date fall in a plausible range, does every amount have the right number of decimal places. Third, and best, **have someone else verify a sample**; a second pair of eyes catches in ten minutes what the original entry person misses in an hour.

The attribute check is the one to automate. A helper column with LEN() on a phone field shows instantly which rows are not eleven characters. ISNUMBER() on an amount column shows which rows are text. A conditional format highlighting values outside the expected range shows the outliers without you looking for them. These checks take minutes to build and they scan every row at once, which is something human reading cannot do reliably at scale.

### Totals reconciliation: the proof that nothing is missing

Reconciliation is the check that catches errors no reading will find — a record you skipped entirely, an amount entered as 4,500 instead of 45,000. The method is simple: the source document usually states a total somewhere, or you can compute one from it. Enter your data, sum the same field, and compare. If they match, you have strong evidence that nothing was missed and no large error was made. If they differ, at least one entry is wrong, and the size of the difference tells you a great deal.

Learn to read the difference. A difference that is a multiple of 9 is the classic signature of a **transposition** — 4,500 entered as 5,400, or 1,234 as 1,243 — because swapping two adjacent digits always changes the value by a multiple of nine. A difference equal to one plausible record suggests a skipped or duplicated row. A difference that is exactly ten or one hundred times a value suggests a decimal-point error. These patterns let you find the specific error in minutes rather than re-reading the entire dataset, and knowing them is one of the clearest markers of an experienced hand.

Also reconcile **counts**, not just totals. If the source has 480 records and your sheet has 479, one is missing regardless of whether the amount totals match. A count check is one formula and it catches the most dangerous error type, because a missing record is invisible in every other check you can perform.

### Data validation: preventing errors at the point of entry

Verification finds errors after they happen. Validation prevents them. Excel and Sheets both offer Data Validation, which restricts what can be entered in a column and rejects anything else with a message you write. Set it up once at the start of a job and you remove entire categories of error for the whole duration.

The rules worth building on any data job: **list validation** for any field with a fixed set of values — city names, product codes, yes/no, payment method — so a typo becomes impossible; **whole-number or decimal validation** with a sensible min and max for amounts and quantities, so an extra zero is rejected at the point of entry; **date validation** restricting to a plausible range, so a 1900 or 2099 date cannot be entered; and **text-length validation** on phone numbers and ID numbers, so an incomplete entry is caught immediately. Add a helpful input message that tells the typist the expected format before they type, and a clear error message that says what went wrong. On a shared sheet that others will enter data into, this is the single highest-value thing you can build.

## Instructor demonstration

The instructor transcribes twenty handwritten records live, then runs the full verification sequence on the result — showing what each check catches and what it cannot — and builds validation rules that make the next batch error-proof.

### Set up the workspace

Place the handwritten source beside the screen and set a blank sheet over the rows already done, so the current line is the only one visible. Explain that this one habit prevents skipped and double-entered lines.02

### Build the sheet structure with a queries column

Create headers plus a final Query column. Explain that a flagged gap is professional and a confident guess is not.03

### Transcribe ten records

Work slowly and deliberately. On one illegible character, stop and flag it in the Query column rather than guessing. Narrate the decision out loud.04

### Verify in a different direction

Now read down each column rather than across each row. Show that the vertical pass surfaces an inconsistency the horizontal pass did not.05

### Run the attribute checks

Add helper columns with LEN() on Phone and ISNUMBER() on Amount. Filter the helpers to show the rows that fail, and fix them.06

### Reconcile the count

Count your rows against the source's stated record count. Show that the check is one formula and that it catches a missing record nothing else would find.07

### Reconcile the total and read the difference

Sum the Amount column against the source total. Introduce a deliberate transposition error and show that the resulting difference is a multiple of nine, identifying the error type.08

### Find the transposed entry

Use the size of the difference to narrow the search, locate the swapped digits, and correct them. Confirm the total now matches exactly.09

### Build list validation

Apply Data Validation with a list of allowed cities. Try to enter a city not on the list and show the rejection message.10

### Build range and length validation

Add a whole-number rule with a plausible max to the Amount column and a text-length rule of 11 to the Phone column. Demonstrate both rejections with the custom error messages.11

### Transcribe the next ten records with validation live

Show that the same batch is entered with visibly fewer opportunities for error, and compare the time taken — prevention is faster than correction.

## Guided practice

### Transcribe, verify, reconcile, prove

You transcribe forty records from a handwritten source containing one illegible character, one ambiguous amount and a stated record count and total. You then run every verification and reconciliation check and deliver the dataset with a short verification note.

1. 01Set up the sheet structure with a Query column and a frozen header row.

2. 02Position the source and cover completed rows so only the current line is visible.

3. 03Transcribe all forty records, flagging anything unclear rather than guessing.

4. 04Build list validation on City, a range rule on Amount, and a length rule on Phone.

5. 05Run the vertical verification pass down each column.

6. 06Add LEN() and ISNUMBER() helper columns and filter to the failures.

7. 07Count your rows and compare with the source's stated record count.

8. 08Sum the Amount column and compare with the source total.

9. 09If the totals differ, use the size of the difference to identify the error type before searching.

10. 10Correct every error found and re-run the checks until all pass.

11. 11Write a verification note: what you checked, what you found, what is still flagged for the client.

12. 12Deliver the sheet plus the note, with any queries listed clearly.

The standard we hold you to

All forty records transcribed with correct data types, every verification and reconciliation check run and passing, the illegible character and ambiguous amount flagged rather than guessed, and a verification note that states what was checked and what remains open.

## Common mistakes and how to fix them

You verify by re-reading your work the same way you entered it

Fix: That pass reproduces the same expectations and finds almost nothing. Verify in a different direction, check attributes rather than characters, or have someone else sample your work.

You guessed at an illegible character

Fix: Flag it instead. A confidently wrong value propagates into every downstream calculation and destroys trust in the whole sheet, while a flagged gap is obviously a gap and gets answered.

You skipped a record and never noticed

Fix: Reconcile the count, not just the totals. A missing record is invisible to every other check. Compare your row count with the source's stated record count on every job.

You read across a skewed or photographed table and misaligned a row

Fix: Zoom to 150% or more, and confirm the row by checking a second field on the same line. Every field looks plausible on its own, which is why this error survives reading.

You searched the whole dataset for a total mismatch

Fix: Read the difference first. A multiple of nine means transposed digits; a value equal to one plausible record means a skipped or duplicated row; a factor of ten means a decimal error. Diagnose before you search.

You did all the verification at the end of the day

Fix: Verify in batches of twenty or fifty, immediately. Verification only works while the source is fresh; by the end of a long session you are comparing your work against a memory that no longer exists.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Build the validation rules before you type the first record, not after the client complains. Rules cost ten minutes at the start and they eliminate entire error categories for the whole job — and on a sheet others will type into, they are the difference between a dataset that stays clean and one that decays within a week.

- Learn the multiple-of-nine rule cold. When a total is out by a figure divisible by nine, the error is almost certainly two digits swapped. It narrows a search across hundreds of rows to a handful of candidates in seconds, and it is the single most impressive thing you can do in front of a client.

- Keep a queries log as a standing habit on every job, even a tiny one. It protects you — it proves you flagged the ambiguity rather than inventing it — and it is what turns a one-off transcription into an ongoing client relationship, because the client sees a professional process rather than a finished file.

- Where possible, verify against a source that was produced independently. If the client has a system total, a printed summary or a second document covering the same records, reconcile against it. Agreement between two independent sources is real evidence; agreement with yourself is not.

## Key termsTranscriptionReproducing information from a source into a structured destination with no change of meaning.Verification passAn independent check of entered data, done in a different direction or on different attributes from the entry pass.Attribute checkTesting the shape of data — length, type, range — rather than reading every character.ReconciliationComparing your dataset's totals and counts against the source's, to prove nothing was missed or mis-entered.Transposition errorTwo adjacent digits swapped. Always changes a total by a multiple of nine.Data validationA rule that rejects invalid entries at the point of typing — lists, ranges, text length, date ranges.Queries logA record of every unclear or missing value flagged for the client rather than guessed.Helper columnA temporary column holding a check formula such as LEN() or ISNUMBER(), used to filter to failures.

## Homework before the next session

Transcribe a genuinely handwritten source

Find a handwritten list — a register, a receipt book, a notebook — and transcribe twenty records. Flag every unclear value. Report how many queries you raised.

Build a validation template

Create a reusable template sheet with list, range, length and date validation already configured, plus a queries column. You will use this on every future job, so make it good.

Practise reading a difference

Take a correct total, introduce three different kinds of error, and record the resulting difference for each. Confirm that the transposition gives a multiple of nine.

Have someone else verify your work

Ask a friend to check ten of your records against the source. Note what they find that you missed. This is the most valuable exercise in the session and it costs nothing.

## Assessment rubric

How this session is marked. The certificate for Data Entry is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Transcription fidelity | All clear records transcribed accurately. | Accurate throughout, with a workflow that prevents skipped and double-entered lines, and ambiguous values flagged rather than guessed. |
| Verification | Verifies work in at least one way. | Runs a directional pass, attribute checks and an independent sample, and can say what each method catches. |
| Reconciliation | Compares totals with the source. | Reconciles both counts and totals, and diagnoses the error type from the size of the difference before searching. |
| Validation | Applies at least one validation rule. | Builds list, range, length and date rules with helpful input and error messages before entry begins. |
| Professional delivery | Delivers the completed sheet. | Delivers the sheet with a verification note and a queries log, so the client can see exactly what was checked and what is open. |

## Session questionsIs handwriting transcription still paid work?+

Yes — hospitals, schools, courts, churches, research projects and government archives all hold large volumes of handwritten records that must be digitised. Handwriting recognition software is improving but still needs a human to resolve ambiguity, and the work that remains is precisely the careful, flagged-doubt work this session teaches.What do I do when the source contradicts itself?+

Flag both values and ask. Never silently choose one — the client needs to know the source disagrees, because that is a problem with their records, not with your typing, and finding it is genuinely valuable to them. Deliver the query rather than the guess.How do I verify 10,000 records? I cannot read them all back.+

You cannot, and nobody expects you to. You verify structurally: attribute checks on every row, reconciliation of counts and totals, a sampled read of a percentage, and validation rules preventing errors in the first place. Full re-reading of large datasets is what a second person sampling does, not what one person does line by line.Should I use OCR to speed this up?+

For clean printed documents, yes — it is faster and the client would expect it. But OCR output is not finished data; it needs verification, and its error pattern is character confusion (0/O, 1/l, 5/S). Use OCR for the first pass and human verification for the second, and tell the client which you did.How do I prove my accuracy to a client?+

Deliver with the checks attached: row count reconciled against source, total reconciled, attribute checks passing, and the queries log. Session four gives you a timed, scored practical that produces an accuracy figure you can quote. A number backed by a repeatable method is what wins the contract.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Spreadsheets for Data Work](https://www.cea.ng/classes/data-entry/spreadsheets-for-data-work)[Next session 4: Accuracy & Speed Practical](https://www.cea.ng/classes/data-entry/accuracy-and-speed-practical)

Data Entry

2 weeks · 4 sessions · ₦20,000 · you leave with a cleaned and organised dataset[See the full course](https://www.cea.ng/classes/data-entry)[Enrol now](https://www.cea.ng/admissions)
