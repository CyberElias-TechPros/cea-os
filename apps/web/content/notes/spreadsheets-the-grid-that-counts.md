---
title: "Spreadsheets: the grid that counts"
description: "Rows, columns, and one cell where they meet. Type a number, not a picture of a number. Let the grid add, so the total is still right when the light returns."
date: "2026-02-02"
minutes: "5"
next_href: "/blog/printing-without-waste"
next_title: "Printing without waste"
---

![A laptop screen showing a simple spreadsheet with names, items and amounts.](https://www.cea.ng/images/blog/spreadsheet-grid.jpg)

Rows, columns, and one cell where they meet. Type a number, not a picture of a number. Let the grid add, so the total is still right when the light returns.

Rukayat kept her shop's money book for six years: names down the left, months across the top, naira in the middle, totals at the foot in her own handwriting. Then her son showed her the same book on the screen — and the one trick her paper never learned. A spreadsheet is a grid that can count. Lined paper can hold the same numbers, but when Friday's figure changes, the total at the bottom can change with it, if you asked the grid to add instead of typing the answer yourself. Microsoft Excel, Google Sheets, and LibreOffice Calc are three names for that grid. This lesson is not “become an analyst.” It is: open a grid, name the columns, type numbers as numbers, and let one cell do the sum.

You already know the picture if you have kept a shop book or a school fee list. The spreadsheet is that book, with a machine willing to add until the battery dies. Rows across, columns down, a cell where they meet — the idea is older than every program that borrows it.

![A laptop screen showing a simple spreadsheet with columns for Name, Item and Amount.](https://www.cea.ng/images/blog/spreadsheet-grid.jpg)

*Each box is a cell. A1 is the corner. Type in the cell, not in the margin. The letters across the top and the numbers down the side are how you name a place.*

## The map: rows, columns, cells

Columns wear letters: A, B, C. Rows wear numbers: 1, 2, 3. The box where column B meets row 3 is called B3. Click it — a line appears around it. That is the active cell, and whatever you type next lands there, the way the cursor works in a letter. The long field above the grid is the formula bar; it shows what is really inside the cell, which matters later, when a cell is showing a total but holding a sum.

Click A1 and type Name. Press Tab — B1 becomes active. Type Item. Tab. Type Amount. Press Enter, and you are on the next row. That first row is a header: a label for humans. Do not put a number in it. The numbers start underneath, one fact per cell — Rukayat in A2, exercise book in B2, 450 in C2. Not “Rukayat — book 450” all in one box. The grid can add a column. It cannot easily add a sentence.

## Numbers are not decoration

Type 450, not ₦450, if you want the grid to add. The naira sign comes from formatting later — a button that says currency, or a format menu. If you type the sign yourself, some programmes treat the cell as a word, and words do not add. The same trap waits with commas and spaces: “1 200” may be a word; 1200 is a number. Start simple — digits only — then make it pretty after the total is right. One question at the cell, since it is the whole philosophy in one keypress: the total is wrong and the cell says ₦4,500 as text. What single habit prevents this? ... Digits in, decoration after. The grid's honesty begins at the keyboard.

![A young woman at a small table with a laptop spreadsheet, a paper receipt and a calculator.](https://www.cea.ng/images/blog/spreadsheet-learner.jpg)

*The receipt is the source. The grid is the copy that can add. If they disagree, believe the paper until you find the mistyped cell.*

To add a column: click the cell under the last amount — if your amounts are C2 to C6, click C7. Type =SUM(C2:C6) and press Enter. The equals sign tells the grid this is a formula, not a label. SUM is add. C2:C6 means from C2 through C6 — the colon is a range, a stretch of cells. If the number that appears matches your calculator, you are done. And then the trick that justifies the whole program: change C3 later, and C7 changes by itself. That is the magic. If it does not, you typed the total by hand. Undo, and put the formula back.

- Open Excel, Google Sheets, or the spreadsheet that came with the computer. File, New.

- In row 1, type Name, Item, Amount.

- Enter three real lines from your week — a transport fare, a photocopy, a recharge.

- In the cell under the amounts, type =SUM( then drag from the first amount to the last, close the bracket, Enter. Change one amount. Watch the total. Save as week-practice.

## The mistakes that look like maths

A cell that shows ###### is not an error in your life. The column is too narrow for the number — put the pointer on the line between C and D at the top until it becomes a double arrow, then drag. #DIV/0! means you asked the grid to divide by empty. And a cell showing the formula you typed instead of an answer usually means you missed the equals sign, or the cell is formatted as text: delete, type again starting with =. None of these is the machine judging you. They are notices from a clerk.

One sheet, one job. A tab at the bottom is a page in the same book — fees on one tab, attendance on another, not both tangled in column Z. Name the file as you would a folder: fees-2026, not Book1. Save as you learned — Ctrl+S, often; Google Sheets saves itself when online, which is a kindness, not a reason to work without looking. And when a number matters — school fees, a shop tally — print a copy or keep the paper receipts. The grid is a good clerk. It is not the only witness.
