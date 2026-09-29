---
title: "Making numbers look like money"
description: "Type 1500. Then tell the grid it is naira. The sign is a costume. The number underneath still adds. Typing ₦ yourself is how totals become words."
date: "2026-08-03"
minutes: "4"
next_href: "/blog/printing-a-sheet-so-it-fits"
next_title: "Lesson"
---

![A spreadsheet amount column formatted as money.](https://www.cea.ng/images/blog/currency-format.jpg)

Type 1500. Then tell the grid it is naira. The sign is a costume. The number underneath still adds. Typing ₦ yourself is how totals become words.

Musa runs the price list for his apprenticeship shop — the fees, the materials, the transport — and he wanted it to look like money before his master read it. So he typed ₦1,500 into the cells, comma and all. Then he asked for a total at the bottom, and the total said ₦3,000. Three rows sat there wearing naira signs. The grid had counted two of them and politely ignored the rest. The sign he typed by hand had turned his numbers into words.

You already know the cure from the last lesson: type 450, not ₦450. But the page still looks naked, and offices like a sign and two decimals. So: formatting is a costume on a number that is still a number. This lesson is dressing the whole amount column at once — and never dressing the header.

![An amount column wearing a money format.](https://www.cea.ng/images/blog/currency-format.jpg)

*The sign sits in the cell. The formula bar, at the top, still shows the plain number when you click. That is the truth the SUM uses.*

## Dressing the column once

Click the header of the amount column, or select just the amount cells — not the word Amount, not the names. In Excel: Home, the Number box, Currency, or More number formats. If ₦ sits in the list, pick it. If not, pick a symbol you can stand, or type NGN in the header and keep the cells as numbers with two decimals. Sheets: Format, Number, Custom currency. Two decimals is ordinary. 1500 becomes 1,500.00 — the comma is the costume; the 1500 is still 1500.

The proof is the formula bar at the top. Click any dressed cell and look up: the formula bar still shows plain digits. That is the body, and that is what SUM works on. The costume must never change the body — and the one habit that keeps it so is this: the format does the dressing, never your keyboard. The hat goes on after the worker is in place.

![A learner with a spreadsheet of amounts, naira notes and a receipt on the desk.](https://www.cea.ng/images/blog/naira-column.jpg)

*The paper is still the source. The costume on the grid is for reading. If they disagree, the receipt wins until you find the mistyped cell.*

## When the costume fights the sum

If some cells were typed with ₦ and others formatted, SUM skips the typed ones and the total looks too small. Delete the signs from the cells, type the digits, format the column — one costume for the whole column. Accounting format adds a dash for zero and hangs the sign at the left edge like a bank statement; it is optional. What is not fine is mixing Accounting, Currency and plain digits in one column. And when a cell goes ###### after dressing, that is the curtain from the error lesson ahead: widen the column. It is not a lost amount.

Two more costumes share the drawer. Comma style adds the thousands without the sign — right for populations and quantities. Percentage style turns 0.15 into 15%, which is the only correct way to make percentages; typing the per cent sign by hand is the naira-sign mistake wearing another hat. In every case the test is the same: click the cell, look at the formula bar. Digits at the top means the sums are safe. ₦ or % at the top means the costume has got into the body.

- Type three amounts as plain digits. SUM them. Note the total.

- Select the amounts and the total. Apply currency or two decimals. Confirm the total did not change in meaning.

- Click a dressed cell. Look at the formula bar. You should see digits, not a picture.

- Do not format the Name column as money. If you did, Undo, or set it back to General.

## NGN, and what a form wants

A government portal that wants 1500.00 in a box may reject ₦. Paste digits. A letter to a human may want ₦1,500 — and that is Word, Insert Symbol, not a spreadsheet cell. Two rooms, two costumes. In the grid, the number is the worker and the sign is a hat. Put the hat on after the worker is in place, and then the total still moves when Friday’s figure changes — which was the whole point of the grid.

Musa’s list now shows ₦18,500.00 at the foot of the column, and the formula bar, when you click it, says 18500. The costume is perfect. The body is untouched. That gap between how a number looks and what a number is will serve you in every room after this one.

Previous

Lesson 80: Printing a spreadsheet so it fits

Lesson 82: Freeze the top row so the header stays
