---
title: "Session 7: The DOM"
description: "The DOM is the live structure of your page that JavaScript can read and change. This session covers selecting elements, changing content and styles, and wiring up event listeners — the bridge between a static page and an application."
date: "2026-09-12"
class_slug: "web-development"
---

The DOM is the live structure of your page that JavaScript can read and change. This session covers selecting elements, changing content and styles, and wiring up event listeners — the bridge between a static page and an application.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what the DOM is and how it relates to your HTML

- Select elements reliably with modern selectors

- Change content safely, understanding the HTML injection risk

- Change styles and classes without fighting the stylesheet

- Add and remove event listeners correctly

- Build an interface that updates itself from data

## The taught content

### What the DOM is

Your HTML file is text. When the browser reads it, it builds a **live tree of objects in memory** representing that structure — the Document Object Model — and it is this tree, not the file, that JavaScript works with. Change the tree and the page changes; the file on disk is untouched.

That distinction explains a great deal. Viewing the page source shows the **original file**, while the Elements panel in developer tools shows the **current DOM** — and after your JavaScript has run, they are different. When something appears on the page but is not in the source, this is why, and knowing where to look saves a lot of confusion.

Then the practical consequence: **the DOM must exist before you can select from it**. A script that runs before the elements are parsed finds nothing, which is why `defer` matters. And the DOM is **live** — you can add, remove and rearrange elements at any time, which is what makes a page an application rather than a document.

### Selecting elements

Two methods cover almost everything. **`querySelector`** takes any CSS selector and returns the **first** match — `document.querySelector('.card')`, `document.querySelector('#submit')`, `document.querySelector('nav a')`. **`querySelectorAll`** returns **every** match as a list. Because they take CSS selectors, everything you already know about CSS applies, and there is one less syntax to learn.

The older methods still exist — `getElementById`, `getElementsByClassName` — and you will see them in older code. They work, but `querySelector` is more flexible and consistent, so there is no reason to prefer them in new code. The one difference worth knowing is that `querySelectorAll` returns a **static** list: it does not update when the page changes, which occasionally surprises people.

Then the habit that prevents a whole class of bugs: **check what you got**. `querySelector` returns `null` when nothing matches, and the next line — `element.textContent = …` — then throws 'cannot set property of null'. That error means one thing: the selector did not match. Log the selector, look at the actual markup, and you will find a typo, a missing class, or a script running too early.

### Changing content

**`textContent`** sets the text inside an element, treating everything as plain text. **`innerHTML`** parses what you give it **as HTML**, which is more powerful and considerably more dangerous. The difference matters enormously: `innerHTML` with data from a user will execute markup, and that is how **cross-site scripting** happens — the single most common serious web vulnerability.

So the rule is simple and absolute: **use `textContent` for anything that came from a person**, and reserve `innerHTML` for markup you wrote yourself in the source file. A comment, a name, a search term — all of it goes in with `textContent`. If a user can type `<img src=x onerror=…>` into a field and it lands in `innerHTML`, it runs.

Then the other properties you will need. **`value`** reads and writes what is in a form input — note that an input's value is not in `textContent`. **`setAttribute`** and the `dataset` API handle attributes and `data-*` values. And **`classList`** — `add`, `remove`, `toggle` — is how you change classes, which is almost always better than setting styles directly.

### Changing styles

There are two ways to change appearance from JavaScript, and one of them is usually wrong. **`element.style.color = 'red'`** writes an **inline style**, which has very high specificity — it overrides your stylesheet and becomes difficult to undo later. Sprinkling inline styles through JavaScript produces a page whose appearance is scattered across two places and impossible to reason about.

The better way is **`classList`**: define a class in your CSS — `.is-hidden { display: none; }` — and toggle it from JavaScript. `el.classList.toggle('is-hidden')` keeps the styling in the stylesheet where it belongs, keeps the JavaScript to a single concern, and makes the state inspectable in the DOM. This is the standard pattern and it scales; inline styles do not.

Then **measure before you change**. Reading a property like `offsetHeight` or `getBoundingClientRect()` gives you the real rendered size, which is how you respond to layout rather than guessing. And remember that changing the DOM has a cost: making a hundred separate changes in a loop is far slower than building the markup once and inserting it, which matters when a page has a long list.

### Event listeners

An event listener attaches a function to an element and an event type: `el.addEventListener('click', handler)`. The critical detail is that you pass the **function itself**, not the result of calling it — `handleClick`, never `handleClick()`. The parentheses run it immediately and pass its return value, so the listener never fires. Everyone makes this mistake once.

The handler receives an **event object** with useful information: `event.target` is the element actually acted on, `event.preventDefault()` stops the browser's default behaviour (essential on forms and links), and `event.currentTarget` is the element the listener is attached to. Knowing the difference between target and currentTarget is what makes delegation work.

Then **removal and delegation**. `removeEventListener` needs the **same function reference** you added, which means an anonymous function cannot be removed — so name your handlers if you will ever detach them. And **delegation** — one listener on a parent handling events from children via `event.target` — is how you deal with lists whose items are added and removed, because it does not care whether the item existed when the listener was attached.

## Instructor demonstration

The instructor turns a static list into a live interface: selecting with querySelector, hitting the null error and diagnosing it, demonstrating the innerHTML injection risk and the textContent fix, toggling a class instead of writing inline styles, and wiring delegated listeners to items added at runtime.

### Show source versus DOM

Open both the page source and the Elements panel after a script has run. Explain that the file is untouched and the DOM is what JavaScript changed.02

### Select with querySelector

Use a class, an ID and a descendant selector. Explain that it takes any CSS selector, so existing CSS knowledge applies directly.03

### Select all matches

Use querySelectorAll and iterate the result. Note that the list is static and does not update when the page changes.04

### Produce the null error

Misspell a selector and set textContent on the result. Explain that 'cannot set property of null' always means the selector did not match.05

### Diagnose the selector

Log the result, inspect the real markup, and find the mismatch. Explain the three usual causes: a typo, a missing class, or a script running too early.06

### Set content with textContent

Write user-provided text into an element. Explain that everything is treated as plain text, which is exactly what you want.07

### Demonstrate the innerHTML risk

Put the same input into innerHTML and show the markup executing. Explain that this is cross-site scripting, the most common serious web vulnerability.08

### State the rule

textContent for anything from a person, innerHTML only for markup you wrote in the source file. Explain that this rule is absolute rather than a guideline.09

### Read a form value

Use value on an input and show that textContent is empty there. Explain that input values live in a different property.10

### Write an inline style, then undo it

Set style.display directly and try to override it from the stylesheet. Explain that inline styles have very high specificity and scatter appearance across two places.11

### Toggle a class instead

Define .is-hidden in CSS and toggle it. Explain that this keeps styling in the stylesheet and makes the state inspectable in the DOM.12

### Attach a listener correctly

Pass the function without parentheses, then show what the parenthesised version does. Explain that everyone makes this mistake once.13

### Use the event object

Log event.target and event.currentTarget and contrast them. Explain that the difference is what makes delegation work.14

### Delegate to runtime items

Attach one listener to the list, add new items, and click them. Explain that delegation does not care whether the item existed when the listener was attached.

## Guided practice

### Build an interface that updates itself

You turn a static page into a live one: elements selected with querySelector and the null case handled, all user-supplied content written with textContent, appearance changed by toggling classes defined in CSS rather than inline styles, and listeners wired with delegation so items added at runtime respond — with the innerHTML injection risk demonstrated and avoided.

1. 01Open the page source and the Elements panel side by side and note the difference.

2. 02Select each element you need with querySelector using a CSS selector.

3. 03Use querySelectorAll where you need every match, and iterate the result.

4. 04Log each selection and confirm it is not null before using it.

5. 05Handle the null case rather than letting it throw.

6. 06Write every piece of user-supplied text with textContent.

7. 07Demonstrate the same value through innerHTML and observe the markup executing.

8. 08Read form values with the value property rather than textContent.

9. 09Define state classes in CSS, such as .is-hidden and .is-active.

10. 10Toggle those classes from JavaScript instead of writing inline styles.

11. 11Confirm no element.style assignment appears in your code.

12. 12Attach listeners passing the function itself, without parentheses.

13. 13Use event.target to identify which child was acted on.

14. 14Attach one delegated listener to the list parent rather than one per item.

15. 15Add an item at runtime and confirm it responds to clicks.

16. 16Name any handler you may need to remove later.

The standard we hold you to

A page where every selection uses querySelector or querySelectorAll with the null case logged and handled rather than allowed to throw, all user-supplied text written with textContent and the innerHTML injection demonstrated and avoided, form values read with the value property, state expressed as classes defined in CSS and toggled with classList with no element.style assignment anywhere, listeners attached without parentheses, event.target used to identify the acted-on child, one delegated listener on the list parent proven to handle items added at runtime, and any removable handler given a name.

## Common mistakes and how to fix them

You get 'cannot set property of null'

Fix: The selector did not match. Log it, inspect the actual markup, and check for a typo, a missing class, or a script running before the element exists. This error always means the same thing.

You put user input into innerHTML

Fix: Use textContent. innerHTML parses its input as markup, so anything a person typed can execute — that is cross-site scripting, the most common serious web vulnerability.

You look for a form value in textContent

Fix: Use the value property. Input values do not live in textContent, which will be empty however much the user typed.

You set styles directly from JavaScript

Fix: Toggle a class defined in your CSS. Inline styles have very high specificity, override your stylesheet, and scatter the page's appearance across two places.

Your listener never fires

Fix: You passed handleClick() instead of handleClick. The parentheses run the function immediately and pass its return value, so nothing is registered as a listener.

You cannot remove a listener

Fix: removeEventListener needs the same function reference you added, so an anonymous function cannot be removed. Name your handlers if you will ever detach them.

Clicks do not work on items added later

Fix: Use delegation: one listener on the parent, with event.target identifying the child. Per-item listeners only cover elements that existed when they were attached.

You update the DOM in a long loop

Fix: Build the markup once and insert it in a single operation. A hundred separate DOM changes are far slower than one, which is noticeable on a long list.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Use textContent for anything a person typed, without exception. innerHTML parses its input as markup, so user-supplied data placed there can execute — that is cross-site scripting, and it is the most common serious vulnerability on the web.

- Toggle classes defined in your CSS rather than writing inline styles from JavaScript. Inline styles have very high specificity, override your stylesheet, and scatter the page's appearance across two places that are hard to reason about together.

- Pass the handler without parentheses to addEventListener. Writing handleClick() runs it immediately and registers nothing, and this single mistake accounts for a large share of 'my listener does not work' problems.

- Use event delegation for any list whose items change. One listener on the parent with event.target identifying the child handles items added after the page loaded, with no re-attaching and no leak.

## Key termsDOMThe live tree of objects the browser builds from your HTML. JavaScript changes this, not the file.querySelectorReturns the first element matching a CSS selector, or null. The standard way to select.textContentSets text as plain text. The safe choice for anything user-supplied.innerHTMLParses its input as HTML. Powerful and dangerous with untrusted data.Cross-site scriptingInjecting markup that executes. Caused by putting user input into innerHTML.classListadd, remove and toggle for classes. Keeps styling in the stylesheet rather than in JavaScript.Inline styleA style written on the element. Very high specificity and hard to override later.event.targetThe element actually acted on, as opposed to the element the listener is attached to. What makes delegation work.

## Homework before the next session

Diagnose a null selection

Deliberately misspell a selector, trigger the error, then log the result and inspect the markup to find the mismatch. Do it once deliberately and the error will never puzzle you again.

Prove the innerHTML risk to yourself

Type a piece of markup into a field and write it to the page with innerHTML, then with textContent. Observe the difference, and never use innerHTML with user data again.

Replace your inline styles with classes

Find every element.style assignment in your code and replace it with a class toggled from CSS. Note how much easier the page becomes to reason about.

Build a delegated list

One listener on the parent using event.target, then add and remove items at runtime and confirm clicks still work throughout.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Selection | Finds elements. | querySelector and querySelectorAll used throughout, every result logged and the null case handled rather than allowed to throw. |
| Content safety | Displays text. | textContent used for all user-supplied data, the innerHTML injection demonstrated and understood, and form values read with the value property. |
| Styling approach | Changes appearance. | State expressed as classes defined in CSS and toggled with classList, with no element.style assignment anywhere in the code. |
| Events | Responds to clicks. | Handlers passed without parentheses, event.target and event.currentTarget distinguished, and removable handlers given names. |
| Dynamic content | Updates the page. | One delegated listener proven to handle runtime-added items, and bulk DOM changes built once and inserted in a single operation. |

## Session questionsWhat does 'cannot set property of null' mean?+

Your selector matched nothing, so querySelector returned null and the next line tried to use it. Log the selector, inspect the actual markup, and look for a typo, a missing class, or a script running before the element exists. It always means one of those three.When is innerHTML acceptable?+

Only for markup you wrote yourself in your source file. Never for anything that came from a user — a name, a comment, a search term — because innerHTML parses its input as HTML and will execute injected markup. That is cross-site scripting.Why is my JavaScript style not applying, or not undoing?+

Because element.style writes an inline style, which has very high specificity and overrides your stylesheet. Define a class in CSS and toggle it with classList instead — the styling stays in one place and the state is visible in the DOM.Why does my click listener never fire?+

You almost certainly wrote addEventListener('click', handleClick()) with parentheses, which runs the function immediately and registers its return value. Pass the function itself: addEventListener('click', handleClick).How do I handle clicks on a list that changes?+

Use event delegation. Attach one listener to the parent and use event.target to identify which child was clicked. It handles items added after the page loaded without re-attaching anything, and it does not leak listeners as items are removed.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session6: Functions, Data & Loops](https://www.cea.ng/classes/web-development/functions-data-loops)[Next session 8: Forms, Validation & Dynamic UI](https://www.cea.ng/classes/web-development/forms-validation-dynamic-ui)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
