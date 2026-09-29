---
title: "Session 5: JavaScript Basics"
description: "JavaScript is what makes a page do things. This session covers what it is and where it runs, variables and data types, operators, and conditions — the foundation everything after it depends on."
date: "2026-09-12"
class_slug: "web-development"
---

JavaScript is what makes a page do things. This session covers what it is and where it runs, variables and data types, operators, and conditions — the foundation everything after it depends on.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what JavaScript does and where it runs

- Declare variables correctly and understand scope

- Use the data types and know how they behave

- Apply operators without the common type traps

- Write conditions that do what you meant

- Read and write an error message

## The taught content

### What JavaScript does

HTML describes structure, CSS describes appearance, and **JavaScript describes behaviour** — what happens when someone clicks, types, or when data arrives. Without it a page is a document; with it a page is an application. It runs **in the browser**, on the visitor's own machine, which is why it can respond instantly without contacting a server for every interaction.

It runs in a specific order, and this causes the first real confusion. A script placed in the `<head>` executes **before the page content exists**, so any attempt to find an element finds nothing. The fix is to put the script at the end of the `<body>`, or better, add the **`defer`** attribute to the script tag, which tells the browser to run it after the document has been parsed. This one attribute prevents a large category of 'my code does not work' problems.

Then the tool you will use constantly: the **browser console**. Open developer tools, and `console.log()` prints anything you want to inspect. It is not a debugging technique of last resort — it is how you find out what your program actually believes, as opposed to what you intended it to do. Most JavaScript learning is writing a line, logging it, and discovering your assumption was wrong.

### Variables and scope

A variable is a **named value you can refer to later**. Declare it with `const` when the value will not be reassigned — which is most of the time — and `let` when it will. `const` does not mean the value cannot change if it is an object or array; it means the name cannot be pointed at something else. Defaulting to `const` and switching to `let` only when the compiler complains is a good habit.

**Avoid `var`.** It is the original keyword and it has two behaviours that cause real bugs: it is **function-scoped rather than block-scoped**, so a `var` inside an `if` block leaks out to the whole function, and it is **hoisted**, meaning it exists before the line that declares it, holding `undefined`. Both produce confusing errors that are hard to trace. Modern code uses `const` and `let`, and there is no reason to write `var` in new code.

Then **scope** — where a name is visible. A variable declared inside a block or function exists only there, which is what you want, because a variable that everything can change is a variable you cannot reason about. Name things for what they hold: `totalPrice` rather than `x`, `isLoggedIn` rather than `flag`. You will read your own code far more times than you write it, usually months later and without any memory of what you meant.

### Data types

The primitives are **string** (text, in quotes), **number** (integers and decimals alike — there is no separate integer type), **boolean** (`true` or `false`), plus `null` (deliberately empty), `undefined` (never given a value), and `symbol` and `bigint`, which you will rarely need. Then **objects** — collections of key-value pairs — and **arrays**, which are ordered lists.

The behaviour that catches everyone is that **JavaScript converts types rather than refusing**. `'5' + 3` is `'53'`, a string, because the plus operator saw a string and concatenated. `'5' - 3` is `2`, a number, because minus has no string meaning. This is not a quirk to memorise so much as a reason to be deliberate: when data comes from a form or a URL it arrives as a **string**, and arithmetic on strings produces nonsense rather than an error.

So **convert explicitly**. `Number('5')` gives the number 5, `String(5)` gives the string '5', and `parseInt` and `parseFloat` extract numbers from messier text. Then **check what you have** with `typeof`, and beware that `typeof null` returns `'object'`, a historical bug you simply have to know about. When a calculation produces `NaN` — not a number — it almost always means a string got into the arithmetic.

### Operators and equality

Arithmetic and comparison operators work as expected, with one enormous exception: **`==` versus `===`**. The double equals performs **type coercion** before comparing, so `0 == ''` is true, `0 == '0'` is true, and `null == undefined` is true — results that are almost never what you meant. The triple equals compares **value and type** without coercion, and gives the answer you expect.

The rule is absolute: **always use `===` and `!==`**. There is no situation in ordinary code where the coercing version is the right choice, and using it is how bugs appear that only happen with particular data. Linters flag `==` for exactly this reason.

Then **logical operators** and a useful feature of them. `&&` returns the first falsy value or the last value, and `||` returns the first truthy one, which makes `const name = input || 'Anonymous'` a concise way to supply a default. Falsy values are `false`, `0`, `''`, `null`, `undefined` and `NaN` — everything else is truthy, **including the empty array and the empty object**, which surprises people. And the **nullish coalescing operator** `??` only falls back on `null` or `undefined`, which is what you want when `0` and `''` are legitimate values.

### Conditions

A condition runs one block or another based on whether something is true. `if`, `else if`, `else` is the basic form, and the important discipline is **checking the cases in the right order** — a broad condition placed first swallows the specific ones below it, which is a common and confusing bug.

**Ternary expressions** — `condition ? a : b` — are a compact form for choosing between two values, and they are good for assignment: `const label = isLoggedIn ? 'Sign out' : 'Sign in'`. They become unreadable when nested, so use them for one decision and not for branching logic.

Then **truthiness**, which is how conditions actually evaluate. Anything in the condition position is converted to a boolean, so `if (name)` is true for any non-empty string and false for an empty one — usually what you want. But it is false for `0` too, which matters when zero is a legitimate value, and that is when you write `if (count !== undefined)` instead. **Be explicit when the falsy values are meaningful**, and the trap disappears.

## Instructor demonstration

The instructor writes JavaScript in the browser from nothing: a script that fails because it runs before the page exists, fixed with defer, then variables, a type-coercion trap demonstrated live, the == versus === difference, and a condition whose case order is deliberately wrong and then corrected.

### Write a script that fails

Put a script in the head that tries to find an element. Show the null error and explain that the script ran before the content existed.02

### Fix it with defer

Add the defer attribute and reload. Explain that this one attribute prevents a large category of failures.03

### Open the console

Log a value and inspect it. Explain that this is how you find out what the program actually believes rather than what you intended.04

### Declare with const and let

Use const by default and let where reassignment is needed. Explain that const means the name cannot be repointed, not that the contents are frozen.05

### Show the var problems

Demonstrate function scope leaking out of a block and hoisting. Explain why modern code does not use var.06

### Demonstrate type coercion

Log '5' + 3 and '5' - 3 and show the different results. Explain that JavaScript converts rather than refusing.07

### Show the form-data trap

Read a value from an input and add two of them, producing concatenation. Explain that form data always arrives as a string.08

### Convert explicitly

Wrap the values in Number() and show the arithmetic work. Explain that NaN almost always means a string reached the arithmetic.09

### Check types

Use typeof on several values including null. Explain the historical bug where typeof null returns object.10

### Show == versus ===

Log 0 == '' and 0 === ''. Explain that the coercing version gives results you almost never meant.11

### Use logical defaults

Write const name = input || 'Anonymous', then show the ?? version. Explain that ?? only falls back on null and undefined, which matters when zero is legitimate.12

### Write a condition in the wrong order

Put a broad check first so it swallows the specific ones. Show the wrong result.13

### Correct the order and explain truthiness

Reorder the checks, then show that if (count) is false for zero. Explain that being explicit removes the trap.

## Guided practice

### Build an interactive page with conditions

You write JavaScript that runs correctly after the document loads, declares variables properly, handles form data as the strings it actually is, uses strict equality throughout, and branches on conditions written in the right order — with every assumption checked in the console rather than assumed.

1. 01Add a script tag with the defer attribute so it runs after the document parses.

2. 02Open the developer tools console before writing any code.

3. 03Declare every variable with const, switching to let only where reassignment is genuinely needed.

4. 04Name each variable for what it holds, not for its type or position.

5. 05Read a value from a form input and log it with typeof to confirm it is a string.

6. 06Convert it explicitly with Number() before doing any arithmetic.

7. 07Log the result and confirm it is a number rather than a concatenated string.

8. 08Check for NaN and handle it rather than letting it reach the page.

9. 09Use === and !== everywhere, with no instance of == in the file.

10. 10Use || or ?? for defaults, choosing ?? where zero or an empty string is legitimate.

11. 11Write an if / else if / else chain for a real decision in the page.

12. 12Order the checks from most specific to least specific.

13. 13Test the chain with every case, including the edge cases of zero, empty string and null.

14. 14Use a ternary for a single two-way choice such as a label.

15. 15Log intermediate values at each step rather than assuming they are what you expect.

16. 16Write down one assumption you held that the console proved wrong.

The standard we hold you to

A page whose script carries the defer attribute, with every variable declared as const unless reassignment is genuinely needed and named for what it holds, form input confirmed as a string with typeof and converted explicitly before arithmetic, NaN checked and handled, no instance of == anywhere, || or ?? used for defaults with ?? chosen where zero or empty string is legitimate, an if chain ordered from most specific to least specific and tested against zero, empty string and null, a ternary used only for a single two-way choice, intermediate values logged at each step, and one disproved assumption written down.

## Common mistakes and how to fix them

Your script runs before the page content exists

Fix: Add the defer attribute to the script tag. A script in the head executes before the document is parsed, so any element lookup returns null — this is the first JavaScript bug almost everyone meets.

You use var

Fix: Use const by default and let where reassignment is needed. var is function-scoped and hoisted, both of which produce confusing bugs that are hard to trace, and there is no reason to write it in new code.

You do arithmetic on form values directly

Fix: Convert with Number() first. Form data always arrives as a string, so adding two of them concatenates rather than sums, and JavaScript does not warn you.

You get NaN and do not know why

Fix: A string reached the arithmetic. Log the values with typeof, convert explicitly, and check for NaN before the value reaches the page.

You use == instead of ===

Fix: Always use strict equality. The coercing version makes 0 == '' and null == undefined true, producing bugs that only appear with particular data.

Your if chain gives the wrong branch

Fix: Order checks from most specific to least specific. A broad condition placed first swallows every specific one below it, which is a common and confusing bug.

You rely on truthiness where zero is meaningful

Fix: Write an explicit comparison. if (count) is false for zero, so when zero is a legitimate value use if (count !== undefined) instead.

You guess at values instead of logging them

Fix: Log intermediate values at every step. Most JavaScript learning is discovering that an assumption was wrong, and the console is the only way to find out what the program actually believes.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Put defer on your script tag, always. A script in the head runs before the document exists, so every element lookup returns null — one attribute removes an entire category of confusing first bugs.

- Convert form values with Number() before doing arithmetic. Form data always arrives as a string, and JavaScript concatenates rather than adding, silently producing nonsense instead of an error.

- Use === and !== everywhere, without exception. The coercing == makes 0 == '' and null == undefined true, and the resulting bugs only appear with particular data, which makes them far harder to find.

- Log values rather than assuming them. Most time spent stuck on JavaScript is a wrong assumption about what a value actually is, and console.log answers it in a second.

## Key termsdeferA script attribute making it run after the document is parsed. Prevents the script-runs-too-early bug.constDeclares a name that cannot be reassigned. The default choice; object contents can still change.Hoistingvar existing before its declaring line, holding undefined. One reason modern code avoids var.Type coercionJavaScript converting types rather than refusing. Why '5' + 3 is '53' and '5' - 3 is 2.Strict equality=== compares value and type without coercion. The only equality operator to use.Falsyfalse, 0, '', null, undefined and NaN. Everything else is truthy, including empty arrays and objects.Nullish coalescing?? falls back only on null or undefined, unlike || which also falls back on 0 and ''.NaNNot a number. Almost always means a string reached an arithmetic operation.

## Homework before the next session

Set up a working script

A script tag with defer, the console open, and a console.log of something on the page. Confirm it runs after the document by logging an element you know exists.

Prove the coercion traps to yourself

Log '5' + 3, '5' - 3, 0 == '', 0 === '', typeof null, and Boolean([]). Do it once in the console and you will not have to memorise them.

Build one form calculation

Read two inputs, confirm with typeof that they are strings, convert with Number(), add them, and handle NaN. Display the result on the page.

Write an if chain and break it

Write a three-branch condition, then deliberately put the broadest check first and observe the wrong result. Reorder it and test every case including zero and empty string.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Script setup | Has JavaScript on the page. | The defer attribute used so the script runs after parsing, and the console used from the start to inspect rather than assume. |
| Variables | Declares variables. | const by default with let only where reassignment is needed, no var anywhere, and names describing what each holds. |
| Type handling | Does arithmetic. | Form input confirmed as a string with typeof, converted explicitly with Number(), and NaN checked and handled before reaching the page. |
| Equality and defaults | Compares values. | Strict equality used throughout with no == anywhere, and || or ?? used for defaults with ?? chosen where zero or an empty string is legitimate. |
| Conditions | Uses if statements. | Checks ordered from most specific to least specific, tested against zero, empty string and null, with ternaries used only for single two-way choices. |

## Session questionsWhy does my JavaScript not find my element?+

Almost certainly the script ran before the document was parsed. Add the defer attribute to the script tag, or move it to the end of the body. A script in the head executes before the content exists, so every lookup returns null.What is the difference between let and const?+

const means the name cannot be reassigned; let means it can. Use const by default and switch to let only when you genuinely need to reassign. Note that const does not freeze the contents of an object or array — only the name's target.Why does adding two form values give me 12 instead of 7?+

Because form values arrive as strings, and + concatenates strings. Convert with Number() before doing arithmetic. JavaScript will not warn you — it will happily produce '53' from '5' + 3.Should I ever use == instead of ===?+

No. The coercing version makes 0 == '', 0 == '0' and null == undefined all true, which is almost never what you meant, and the resulting bugs only surface with particular data. Always use === and !==.What does NaN mean and why do I keep getting it?+

Not a number — and it almost always means a string reached an arithmetic operation. Log the values with typeof, convert explicitly with Number(), and check for NaN before the result goes on the page.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Flexbox, Grid & Responsive Layout](https://www.cea.ng/classes/web-development/flexbox-grid-responsive)[Next session 6: Functions, Data & Loops](https://www.cea.ng/classes/web-development/functions-data-loops)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
