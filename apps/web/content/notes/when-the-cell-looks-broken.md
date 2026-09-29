---
title: "When the cell says ##### or #DIV/0!"
description: "Hashes are a curtain: the column is too thin. #DIV/0! is divide by empty. #VALUE! is a word where a number should be. The amount is often still there. Widen, or fix the formula, before you panic."
date: "2026-08-13"
minutes: "4"
next_href: "/blog/a-simple-weekly-money-list"
next_title: "Lesson"
---

![A spreadsheet cell filled with hash marks because the column is narrow.](https://www.cea.ng/images/blog/cell-error.jpg)

Hashes are a curtain: the column is too thin. #DIV/0! is divide by empty. #VALUE! is a word where a number should be. The amount is often still there. Widen, or fix the formula, before you panic.

Kelechi had just learned the money costume from the last lesson and dressed his shop book beautifully — signs, commas, two decimals. Then he widened the window, and the entire Amount column turned to rows of hash marks. He sat back the way a man sits back when a generator makes a new noise. “The file has scattered,” he said.

It had not scattered. The most expensive-looking error on the grid is a curtain: ##### means the column is too thin for the number now wearing its money clothes. The amount is still in the cell. Drag the line between C and D at the top of the grid until the number appears — or double-click that line, and the column fits the widest fact by itself. Where would you look first before calling anybody? At the seam between the column letters. That seam is a handle.

The formula errors have ordinary translations too. #DIV/0! means you divided by zero or by an empty cell — a rate with no quantity, a per-person split with no people. #VALUE! means you asked maths to eat a word: =B2*C2 when C2 says “see receipt.” Put the number in C2 and the story in the Item column. #REF! means a cell the formula loved was deleted; if you just deleted a column, Undo is the cure. #NAME? is a typo in the function — =SUME, or a missing bracket. Look at the formula bar. The grid is literal, and literal is not broken.

![A cell showing ##### beside ordinary numbers.](https://www.cea.ng/images/blog/cell-error.jpg)

*Hashes are not a lost fortune. They are a curtain. Widen before you retype. Retyping is how 1500 becomes 150.*

## Green corners, and the number wearing text clothes

Not every trouble wears a hash. Some cells look perfectly ordinary and carry a small green mark in the corner — the machine’s quiet note that this number is not a number at all. It is text wearing a number’s clothes: typed with a space after it, pasted from a PDF, or born with an apostrophe in front. The symptom is a column that refuses to sum — the total politely ignores half the rows. Click the cell; a small yellow diamond offers to convert. Accept. If many cells are dressed this way, copy the column and run Paste Special’s values-and-formats pass to redress them in one act. Sheets is quieter about all this; the cousin rule still applies — read the offer before you accept it.

The habit that prevents the whole mess is one habit wide: type the figure plainly. Do not type ₦ in the cell — the format does that. Do not type a comma — the format does that too. One exception earns its apostrophe: a phone number or a JAMB registration number, where the leading zero matters and the cell should genuinely be text. Type the apostrophe first on purpose, or set the column as Text before typing.

And when a cell shows you the formula you typed — =SUM(C2:C6) sitting in plain sight — that is text formatting again, or a missed equals sign, or a space typed before the =. Delete; type again starting with =. A cell that shows 1/2/2026 when you meant 0.5 is a date costume on a fraction. Format as Number. The grid guessed. You can unguess.

![A learner widening a spreadsheet column.](https://www.cea.ng/images/blog/wide-column.jpg)

*The line between letters at the top is a handle. Drag. The hashes should become amounts. If they become dates, that is a format, not a width.*

- Make a number, narrow the column until ##### appears. Widen it. The number should return unchanged — and unchanged is the whole lesson.

- In an empty cell, type =1/0 and Enter. Meet #DIV/0!. Delete it; a real book does not need it.

- Type =A1*B1 where A1 is a word. Meet #VALUE!. Put a number in A1 and watch the error leave.

- Do not download an “error fixer” for Excel from a banner. The fixer is your eyes and Undo.

## When it is actually broken

A file that will not open — or opens saying “repaired,” with sheets missing — is the backup lesson arriving on time. Close it, copy the file, try again on the copy. Do not keep saving over the only copy while it limps. And a warning about circular reference deserves its name: a SUM that includes itself. If C7 says =SUM(C2:C7), the snake is eating its tail. Sum to C6 and put the total in C7.

Name the shout before you call a shop. Hashes: width. #DIV/0!: empty bottom. #VALUE!: a word in the maths. Kelechi widened his columns, watched ₦48,250.00 walk back out from behind the curtain, and closed the file without fear. The grid is a good clerk. Clerks sometimes write too large for the column. They rarely burn the book.

Previous

Lesson 84: A simple weekly money list

Lesson 86: Watching a video without getting lost
