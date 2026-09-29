---
title: "Filling a formula down a column"
description: "One SUM or one price times quantity is enough. The fill handle copies the idea down. Each row should keep its own cells. Watch the first three answers before you fill a hundred."
date: "2026-08-08"
minutes: "4"
next_href: "/blog/freeze-the-top-row"
next_title: "Freeze the top row so the header stays"
---

![A spreadsheet formula being filled down a column.](https://www.cea.ng/images/blog/fill-handle.jpg)

One SUM or one price times quantity is enough. The fill handle copies the idea down. Each row should keep its own cells. Watch the first three answers before you fill a hundred.

Nnenna’s shop book needs quantity times price on every line, and she had typed it the long way: =B2*C2, then =B3*C3, then =B4*C4, then the will to live. The small square at the corner of a selected cell is the fill handle. Drag it down, or double-click it, and the grid copies the pattern: next row, next cells. This lesson is that handle, the number that should not walk, and why you look at row 3 before you fill to row 200.

Click the cell with the first formula. A tiny square waits at the bottom-right; the pointer becomes a thin cross. Drag down as far as the last row of facts, and release. Each new cell should show an answer. Click row 4’s answer and look at the formula bar: it should say =B4*C4 — not still B2*C2. If it still says B2, you copied values, not the formula. Undo, and fill again. So before the hundred rows: which three rows would you check first, and why those? The first, the middle, the last — the three corners where errors like to hide.

![The fill handle at the corner of a formula cell.](https://www.cea.ng/images/blog/fill-handle.jpg)

*A thin cross, not a thick arrow. The thick arrow is select. The cross is fill. If you drag with the wrong pointer you will move the cell instead of copying the idea.*

## When one number should not walk

Some references should walk — quantity times price wants each row its own cells. But a tax rate in F1 must stay F1 on every row. If you fill =D2*F1 down, the grid turns F1 into F2, F3, empty, empty. Put a dollar in: F$1 or $F$1 — the nail. The fill handle copies ideas; the nails decide which ideas stand still. For today, keep the rate in a labelled cell, nail it with $, fill, check three rows. If the dollar is still a fog, do not fill a tax column yet. Fill quantity times price, which should walk.

A second habit shares this section: fill to the last fact, not to row 1000 “in case.” A hundred empty formulas below the data are zeros that will sit in a SUM if you were sloppy with the range. Drag by hand when the list is short. And when the copy happens by keyboard — Ctrl+C on the formula, select a block, Ctrl+V — the same checks apply. If you overfill onto a total row, the total becomes a product, and the book will lie with confidence. Leave a blank row before the SUM, or look at the last formula.

![A learner checking a column of formula results against a calculator.](https://www.cea.ng/images/blog/formula-column.jpg)

*The calculator is the witness for three rows. If three match, the fill is probably honest. If row 1 matches and row 5 does not, look at the formula bar. Do not print yet.*

## The double-click at the corner

The fill handle has a faster greeting. Instead of dragging the tiny square down a hundred rows, double-click it: the formula walks down the column exactly as far as the data beside it runs and stops at the last name in the register. One hundred rows, one double-click. If it walks too far or not far enough, the neighbouring column has a gap or an extra — look at what the machine considered the end of the list. The double-click is the machine’s guess; the drag is your instruction. Both are worth knowing.

- In a practice sheet, quantity in B, price in C, =B2*C2 in D2.

- Fill down three more rows. Click each answer. Confirm the row numbers walked.

- Change one price. Confirm that row’s answer moves and the neighbours do not.

- Save as fill-practice. Do not fill a live fees book until three rows have been true.

One last look back at the handle: it will copy a mistake as cheerfully as a truth. The calculator is the witness for three rows — if three match, the fill is probably honest; if row 1 matches and row 5 does not, look at the formula bar before you print. Nnenna’s forty-eight lines took one drag and three checks. The will to live returned somewhere around row 12. You already know Undo. Use it the second the column looks too clever.
