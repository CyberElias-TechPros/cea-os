---
title: "Session 6: Functions, Data & Loops"
description: "Functions make code reusable, arrays and objects make it handle real data, and loops and events connect it to the user. This session covers all four — then a project that makes a page genuinely interactive."
date: "2026-09-12"
class_slug: "web-development"
---

Functions make code reusable, arrays and objects make it handle real data, and loops and events connect it to the user. This session covers all four — then a project that makes a page genuinely interactive.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Write functions that do one thing and can be reused

- Understand parameters, return values and scope

- Store and access data in arrays and objects

- Loop over data without the classic off-by-one error

- Respond to user events correctly

- Build an interactive webpage

## The taught content

### Functions

A function is **a named block of code you can run whenever you want**, with inputs and an output. They exist for two reasons: **reuse** — write the calculation once and call it from five places — and **clarity** — a function called `formatPrice` says what it does far better than three lines of arithmetic inline.

The structure is **parameters** in, **`return`** out. A function that does not return anything returns `undefined`, which is the source of the classic bug where a function correctly computes a value and the caller receives nothing because the `return` was forgotten. **Computing is not the same as returning**, and the distinction takes everyone by surprise once.

Then the discipline: **one function, one job**. A function called `processOrder` that validates, calculates, formats and displays is four functions wearing a coat, and it cannot be tested or reused in parts. Name it for what it does — `validateOrder`, `calculateTotal` — and let another function call them in sequence. Small named functions are also self-documenting: reading `calculateTotal(items)` tells you more than reading the arithmetic.

### Scope and arrow functions

A variable declared inside a function exists **only inside it**, which is what you want: a function that does not touch anything outside itself is predictable and testable. A function can read variables from outside — but if it depends on them, it becomes hard to reason about, because its behaviour now depends on state elsewhere. **Prefer passing values in as parameters and getting results back via `return`.**

Then **arrow functions**, the shorter syntax: `const double = (n) => n * 2;`. They are exactly equivalent for most purposes and are the modern idiom, particularly for short callbacks. The difference that occasionally matters is that arrow functions do not have their own `this`, which affects them inside object methods — worth knowing about, rarely worth worrying about at this stage.

The practical rule: **use whichever is clear**. Arrow syntax for short one-expression callbacks, function declarations for anything with a body and a name you will call from several places. Consistency within a file matters more than the choice itself.

### Arrays and objects

An **array** is an ordered list, written `[1, 2, 3]`, and its positions start at **zero** — the first item is at index 0, which is the single most important thing to internalise about arrays. Access with `items[0]`, get the length with `items.length`, add with `push`, and check whether something is in there with `includes`.

An **object** is a collection of named values: `{ name: 'Ada', price: 4500 }`. Access with `obj.name` or `obj['name']`. Objects are how you represent a **thing** — a product, a user, an order — and arrays of objects are how you represent a list of things, which is the shape of almost all real data: `[{ name: 'Ada', price: 4500 }, { name: 'Bisi', price: 3200 }]`.

Then the two things that bite. **Index out of range returns `undefined` rather than an error**, so `items[10]` on a five-item array silently gives you nothing and the error appears later somewhere else. And **accessing a property of `undefined` throws** — `user.address.city` fails entirely if `address` is missing, which is why the **optional chaining** operator `user?.address?.city` exists, returning `undefined` instead of crashing.

### Looping over data

The modern way to go through an array is a **`for...of` loop** — `for (const item of items) { … }` — which gives you each value in turn and cannot go out of range. It is the right default for anything where you simply need each item.

The **classic indexed loop** — `for (let i = 0; i < items.length; i++)` — is what you need when you require the position as well as the value, and it is where the **off-by-one error** lives. The condition must be `i < items.length`, not `i <= items.length`; the latter runs one extra time with `i` equal to the length, which is one past the last index, producing `undefined`. This is the most common loop bug there is and it is worth memorising the correct form.

Then the **array methods**, which replace most hand-written loops and read far better. **`map`** produces a new array by transforming each item — `items.map(i => i.price)`. **`filter`** produces a new array of the items passing a test — `items.filter(i => i.inStock)`. **`find`** returns the first match. **`reduce`** combines everything into one value, such as a total. Chaining `items.filter(inStock).map(getPrice).reduce(add)` expresses an entire data operation in one readable line, and it is the idiom you will see in every real codebase.

### Events

An **event** is something the user did — a click, a keystroke, a form submission — and JavaScript can respond to it. The pattern is `element.addEventListener('click', handler)`, where the handler is a function that runs when the event happens. Note that you pass the function **without calling it**: `handleClick`, not `handleClick()`, because the parentheses run it immediately rather than handing it over to be run later.

Then the two behaviours that need managing. **`event.preventDefault()`** stops the browser's default action, which is essential on a form: without it, submitting reloads the page and your JavaScript result vanishes. And **event delegation** — attaching one listener to a parent rather than one to each child — which is how you handle a list of items, including ones added later, without re-attaching listeners every time.

The handler receives an **event object** describing what happened, including `event.target`, the element that was actually clicked. That is what makes delegation work: one listener on the list, and `event.target` tells you which item was involved. This pattern is the foundation of nearly all interactive interfaces.

## Instructor demonstration

The instructor builds an interactive product list live: functions extracted from inline code, an array of objects as the data, map and filter and reduce replacing hand-written loops, a deliberate off-by-one error shown and fixed, and event delegation handling clicks on items added after the page loaded.

### Write inline code, then extract it

Start with arithmetic written directly in the page, then move it into a named function. Explain that the name says what it does better than the code does.02

### Forget the return statement

Show the caller receiving undefined from a function that computed correctly. Explain that computing is not the same as returning.03

### Split a function doing four jobs

Break processOrder into validate, calculate, format and display. Explain that one function one job is what makes code testable and reusable.04

### Show scope

Try to read an inner variable from outside. Explain that passing values in and returning results out is what makes a function predictable.05

### Rewrite as an arrow function

Convert a short callback and explain when each syntax is clearer. Note that consistency within a file matters more than the choice.06

### Build the data as an array of objects

Write a product list and access items[0].name. Explain that this is the shape of almost all real data.07

### Go out of range

Access an index past the end and show undefined rather than an error. Explain that the real error appears later somewhere else.08

### Use optional chaining

Access a missing nested property both ways. Show the crash and then the safe version with ?.09

### Loop with for...of

Print each item. Explain that it cannot go out of range and is the right default when you only need the values.10

### Write the off-by-one error

Use i <= items.length in an indexed loop and show the undefined on the last pass. Correct it to i < items.length.11

### Replace the loop with map and filter

Rewrite it as items.filter(inStock).map(getPrice). Explain that the chain expresses the whole operation in one readable line.12

### Total with reduce

Sum the prices. Explain that reduce combines everything into one value and is the standard way to compute a total.13

### Attach an event listener

Add a click handler, passing the function without parentheses. Explain that the parentheses would run it immediately instead.14

### Prevent the form reload

Submit a form without preventDefault and watch the page reload. Add it and show the result surviving.15

### Use event delegation

Attach one listener to the list, add a new item at runtime, and click it. Explain that the delegated listener handles items that did not exist when the page loaded.

## Guided practice

### Project: interactive webpage

You build an interactive page driven by an array of objects: functions that each do one job and return their result, data accessed safely with optional chaining, loops replaced with map, filter and reduce where appropriate, an indexed loop written without the off-by-one error, and events handled with preventDefault and delegation so items added later still work.

1. 01Define the data as an array of objects with at least four items.

2. 02Write one function per job, each named for what it does.

3. 03Confirm every function that produces a value actually returns it.

4. 04Pass values in as parameters rather than reading outer variables.

5. 05Access an item and a nested property, using optional chaining where a value may be missing.

6. 06Access an index past the end and handle the undefined rather than letting it reach the page.

7. 07Loop with for...of where you only need the values.

8. 08Write one indexed loop with the condition i < items.length.

9. 09Replace a hand-written loop with map where you are transforming each item.

10. 10Use filter where you are selecting a subset.

11. 11Use find where you need the first match.

12. 12Use reduce to compute a total.

13. 13Chain filter, map and reduce into one readable expression where it is clearer.

14. 14Attach event listeners passing the function without parentheses.

15. 15Call preventDefault on any form submission.

16. 16Use event delegation so items added at runtime still respond.

17. 17Log intermediate values at each stage and confirm they are what you expect.

The standard we hold you to

An interactive page whose data is an array of at least four objects, with one function per job each named for what it does and confirmed to return its value, values passed as parameters rather than read from outer scope, nested properties accessed with optional chaining and out-of-range access handled, for...of used where only values are needed, any indexed loop written as i < items.length, map, filter, find and reduce each used where appropriate with at least one readable chain, listeners attached without parentheses, preventDefault called on form submission, event delegation making runtime-added items respond, and intermediate values logged and confirmed at each stage.

## Common mistakes and how to fix them

Your function computes correctly but returns undefined

Fix: Add the return statement. Computing is not the same as returning, and a function with no return gives the caller undefined however correct its internal logic is.

One function does four jobs

Fix: Split it. A function that validates, calculates, formats and displays cannot be tested or reused in parts; four small named functions can, and the names document themselves.

You assume array positions start at one

Fix: They start at zero. The first item is items[0], and internalising this prevents a whole family of off-by-one mistakes.

You access an index past the end

Fix: Check the length or handle undefined. Out-of-range access returns undefined rather than throwing, so the error surfaces later somewhere unrelated and is much harder to trace.

Accessing a nested property crashes the page

Fix: Use optional chaining: user?.address?.city. Without it, a missing address throws and stops the whole script, which is why the operator exists.

Your loop runs one time too many

Fix: Use i < items.length, not i <=. The <= form runs with i equal to the length, which is one past the last index, giving undefined on the final pass.

You pass the handler with parentheses

Fix: Pass the function itself: addEventListener('click', handleClick). Writing handleClick() runs it immediately and passes its return value, so the listener never fires.

Your form reloads and the result disappears

Fix: Call event.preventDefault() in the submit handler. Without it the browser performs its default submission, reloading the page and discarding everything your JavaScript did.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Make every function do one job and return its result explicitly. Small named functions are testable, reusable and self-documenting, while a function doing four things can only ever be run as a whole.

- Use for...of unless you need the index. It cannot go out of range, which removes the most common loop bug entirely, and reach for map, filter and reduce when you are transforming or selecting rather than just iterating.

- Use optional chaining for any nested property that might be missing. Without it a single absent value throws and stops the entire script, and the crash rarely happens near the cause.

- Call preventDefault on form submissions and use event delegation for lists. The first stops the page reloading and discarding your work; the second handles items added after the page loaded without re-attaching listeners.

## Key termsFunctionA named block of code with inputs and an output. Exists for reuse and for clarity.Return valueWhat a function hands back. Without a return statement the caller receives undefined.Arrow functionA shorter function syntax. Equivalent for most purposes and the modern idiom for short callbacks.ArrayAn ordered list, indexed from zero. Out-of-range access returns undefined rather than throwing.ObjectA collection of named values. How you represent a thing; arrays of objects are the shape of most real data.Optional chainingThe ?. operator. Returns undefined instead of crashing when an intermediate value is missing.map / filter / reduceTransform each item, select a subset, combine into one value. Replace most hand-written loops and read better.Event delegationOne listener on a parent handling events from children, including ones added later.

## Homework before the next session

Refactor one long function

Take a function doing several jobs and split it into one function per job, each named for what it does and returning its result. Note how much clearer the calling code becomes.

Build an array of objects and query it

Four or more items, then use filter to select a subset, map to transform it, and reduce to total it. Chain them into one expression where that reads better.

Write both loop forms

The same task with for...of and with an indexed loop using i < items.length. Then deliberately write i <= and observe the undefined on the last pass.

Build a delegated list

One listener on a parent handling clicks on children, then add a new item at runtime and confirm it still responds. Include preventDefault on any form.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Functions | Uses functions. | One job per function, each named for what it does, every value-producing function confirmed to return it, and values passed as parameters rather than read from outer scope. |
| Data structures | Stores data. | An array of objects accessed with zero-based indexing, nested properties guarded with optional chaining, and out-of-range access handled rather than left to surface later. |
| Iteration | Loops over data. | for...of where only values are needed, any indexed loop written as i < items.length, and map, filter, find and reduce used where each is the clearer tool. |
| Events | Responds to clicks. | Listeners attached without parentheses, preventDefault on form submission, and delegation used so runtime-added items respond. |
| Verification | It appears to work. | Intermediate values logged and confirmed at each stage, with edge cases — missing values, empty arrays, out-of-range indexes — actually tested. |

## Session questionsWhy does my function return undefined when it calculates the right value?+

Because there is no return statement. Computing a value inside a function and handing it back to the caller are two different things, and a function without return gives the caller undefined however correct its logic is.When should I use map instead of a loop?+

Whenever you are producing a new array by transforming each item — map, filter and reduce express the intent far more clearly than a hand-written loop, and they cannot go out of range. Use for...of when you only need to act on each value without building a new array.Why does my loop run one extra time?+

Because the condition is i <= items.length. Array indexes run from 0 to length minus one, so the correct condition is i < items.length. The <= form runs once with i equal to the length, which is one past the last index.My form submits and the page reloads. Why?+

Because you did not call event.preventDefault() in the submit handler. Without it the browser performs its default action, reloading the page and discarding everything your JavaScript did.Why do clicks not work on items I add later?+

Because the listeners were attached only to the items that existed at the time. Use event delegation: attach one listener to the parent and use event.target to identify which child was clicked, which handles items added at runtime with no extra work.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: JavaScript Basics](https://www.cea.ng/classes/web-development/javascript-basics)[Next session 7: The DOM](https://www.cea.ng/classes/web-development/the-dom)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
