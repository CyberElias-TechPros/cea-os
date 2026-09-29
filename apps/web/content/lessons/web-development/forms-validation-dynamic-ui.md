---
title: "Session 8: Forms, Validation & Dynamic UI"
description: "Forms are where a website earns its keep, and validation is where most of them fail — either by accepting nonsense or by shouting at people unhelpfully. This session covers validation done properly, modals, dynamic content, and a project that brings it together."
date: "2026-09-12"
class_slug: "web-development"
---

Forms are where a website earns its keep, and validation is where most of them fail — either by accepting nonsense or by shouting at people unhelpfully. This session covers validation done properly, modals, dynamic content, and a project that brings it together.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Use built-in HTML validation before writing any JavaScript

- Write JavaScript validation that helps rather than blocks

- Give feedback that names the field and the fix

- Build modals that are accessible and closable

- Render content dynamically from data

- Build a working interactive form or calculator

## The taught content

### Built-in validation first

Before writing a line of JavaScript, use what HTML gives you for free. The **`required`** attribute makes a field mandatory. **`type="email"`** checks for a plausible email address. **`minlength` and `maxlength`** bound the length, **`min` and `max`** bound numbers, and **`pattern`** accepts a regular expression for anything more specific. The browser then blocks submission and shows a message, in the user's own language, with no code from you.

This is not a shortcut — it is the correct first layer. Built-in validation works with assistive technology, works without JavaScript, and is consistent with what people already know from every other form on the web. Writing custom validation instead of using these attributes means rebuilding something that already exists and doing it worse.

Then know its limit: **client-side validation is for the user's convenience, not for security**. Anything a browser enforces can be bypassed by anyone who wants to bypass it, because it runs on their machine. Real validation must also happen on the server, wherever the data goes. Client-side validation makes the experience good; server-side validation makes the data safe. They are not alternatives.

### JavaScript validation that helps

Custom validation exists for cases HTML cannot express — 'the two passwords must match', 'this date must be after that one', 'at least one of these must be filled'. The structure is a function that takes a value and **returns either nothing or a message**, called at the right moment, with the message displayed next to the field.

**When to validate** matters more than the logic. Validating on every keystroke shouts at someone halfway through typing an email address — '@' is invalid until they finish. The pattern that works is to validate **on blur** (when they leave the field) and then **re-validate on input** once a field has been flagged, so the error clears the moment it is fixed. And **never validate on page load**, which greets people with a wall of red before they have typed anything.

Then the **submit path**: prevent the default, validate everything, and if anything fails, **focus the first invalid field** so a keyboard or screen reader user is taken to it rather than left to find it. Announce the error count in a way assistive technology will read, using a live region, so the message is not only visual.

### Feedback that helps

An error message has one job: **tell the person what to do**. 'Invalid input' fails completely. 'Enter an email address, like [[email protected]](https://www.cea.ng/cdn-cgi/l/email-protection)' succeeds. Name the field, say what is wrong, and give the shape of a correct answer where that is useful. This is a writing task as much as a technical one, and it is where most forms are genuinely poor.

**Show it in the right place** — next to the field, not at the top of the page or in an alert box that has to be dismissed. Connect it with **`aria-describedby`** so it is announced with the input, and mark the field **`aria-invalid`** so its state is available to assistive technology rather than only indicated by colour.

Then **do not rely on colour alone**. A red border means nothing to a colour-blind user and nothing to anyone who cannot see the screen. Pair it with text and an icon. And **clear the error the moment it is fixed** — a message that stays after the problem is solved teaches people to ignore your messages entirely.

### Modals

A modal is an overlay that demands attention, and it is easy to build badly. The requirements: it must be **closable** by a visible button, by the **Escape** key, and by clicking the backdrop — because a dialog nobody can escape is a trap. Then **focus management**: move focus into the modal when it opens, keep it inside while it is open, and **return focus to the element that opened it** when it closes. Skip that and a keyboard user is left somewhere unrelated.

The modern way to get most of this for free is the **`<dialog>` element**, which handles focus, Escape and the backdrop natively. Where you build one by hand, you need `role="dialog"`, `aria-modal="true"`, a labelled title, and focus trapping — real work, which is why the native element is the better starting point.

Then the judgement call: **use modals sparingly**. They interrupt, and an interrupting interface is a worse one. For most confirmations a message in the page is enough; for most forms a page is better. A modal is right when the task genuinely must be finished or abandoned before anything else continues, and wrong almost everywhere else.

### Dynamic content

Rendering a list from data — rather than writing each item by hand — is the step from a static page to an application. The pattern is always the same: **take the data, map it to markup, insert it once**. Building a string of HTML and assigning it in one operation is far faster than creating and appending a hundred elements individually.

The critical rule is that **data-driven content must still be safe**. Interpolating user data into an HTML string and assigning it with `innerHTML` is exactly the cross-site scripting hole from the last session, only larger, because now every item in the list is an injection point. Either escape the values before interpolating, or build elements with `createElement` and set their content with `textContent`.

Then **empty and error states**, which everyone forgets. What does the list show when there is no data? 'No items yet' is a design; a blank area is a bug the user cannot distinguish from a broken page. The same applies to loading — a brief 'Loading…' tells someone the page is working rather than stuck, which on a slow connection is most of the time.

## Instructor demonstration

The instructor builds a working registration form: built-in HTML validation first, then JavaScript for the cases HTML cannot express, error messages rewritten from 'invalid input' into something useful, an accessible modal using the dialog element, and a list rendered from data with escaping, an empty state and a loading state.

### Add built-in validation

Set required, type email, minlength and pattern, then submit an empty form. Explain that the browser handles this in the user's language with no code.02

### State the security limit

Bypass the client validation and explain that anything the browser enforces can be circumvented. Explain that real validation must also happen server-side.03

### Write a custom rule

Validate that two passwords match, returning a message or nothing. Explain that custom validation is for cases HTML cannot express.04

### Validate on blur, not on keystroke

Show validation firing mid-email-address and shouting at the user. Switch to blur, then re-validate on input once flagged.05

### Never validate on load

Show a page that opens with every field marked red. Explain that this greets people with failure before they have typed anything.06

### Handle the submit path

Prevent default, validate all, and focus the first invalid field. Explain that focusing matters for keyboard and screen reader users.07

### Rewrite an error message

Change 'Invalid input' to 'Enter an email address, like [[email protected]](https://www.cea.ng/cdn-cgi/l/email-protection)'. Explain that naming the field and giving the shape of a correct answer is the whole job.08

### Connect the message properly

Use aria-describedby and aria-invalid. Explain that otherwise the message is only visual and its state is unavailable to assistive technology.09

### Add a non-colour indicator

Pair the red border with text and an icon. Explain that colour alone is invisible to colour-blind users.10

### Clear the error when fixed

Re-validate on input once flagged. Explain that a message that persists after the problem is solved teaches people to ignore all your messages.11

### Build a modal with dialog

Use the native element and show Escape, the backdrop click and focus return working for free. Contrast with the hand-built version's requirements.12

### Render a list from data

Map the data to markup and insert it once. Explain that one insertion is far faster than a hundred appends.13

### Escape the interpolated data

Inject markup into a data value and show it executing. Explain that a data-driven list makes every item an injection point.14

### Add empty and loading states

Render 'No items yet' and a brief loading message. Explain that a blank area is indistinguishable from a broken page, particularly on a slow connection.

## Guided practice

### Project: interactive form or calculator

You build a working form or calculator that validates in layers — built-in HTML attributes first, then JavaScript only for what HTML cannot express — with error messages naming the field and the fix, connected by aria-describedby, cleared when fixed, and never shown on load; plus a list rendered from data with escaping, and empty and loading states.

1. 01Add built-in validation: required, correct input types, minlength, maxlength, pattern.

2. 02Confirm the browser blocks an invalid submission with no JavaScript involved.

3. 03Note which rules genuinely need JavaScript, such as matching two fields.

4. 04Write a validation function returning either nothing or a message.

5. 05Validate on blur, then re-validate on input once a field is flagged.

6. 06Confirm nothing is validated on page load.

7. 07On submit, prevent default, validate all, and focus the first invalid field.

8. 08Write each error message naming the field, the problem and the shape of a correct answer.

9. 09Place each message next to its field rather than at the top of the page.

10. 10Connect each message with aria-describedby and set aria-invalid.

11. 11Pair every colour indicator with text or an icon.

12. 12Clear each error the moment the field becomes valid.

13. 13Announce the error count through a live region so it is not only visual.

14. 14Render a list from data, building the markup once and inserting it in one operation.

15. 15Escape or use textContent for every interpolated value.

16. 16Add an empty state message and a loading state.

17. 17Test with the keyboard only, and with a screen reader if one is available.

The standard we hold you to

A working form validating in layers — built-in attributes confirmed to block an invalid submission without JavaScript, then JavaScript used only for rules HTML cannot express, on blur with re-validation on input once flagged and nothing validated on load, submit preventing default and focusing the first invalid field — with each error message naming the field, the problem and the shape of a correct answer, placed beside the field, connected via aria-describedby with aria-invalid set, paired with a non-colour indicator, and cleared the moment it is fixed; a list rendered from data built once and inserted in one operation with every interpolated value escaped or set via textContent; empty and loading states present; and the whole thing tested keyboard-only.

## Common mistakes and how to fix them

You wrote custom validation instead of using HTML attributes

Fix: Use required, type, minlength, maxlength and pattern first. They work without JavaScript, work with assistive technology, and match what people already expect from every other form.

You treat client-side validation as security

Fix: It is for convenience only. Anything the browser enforces runs on the user's machine and can be bypassed, so real validation must also happen on the server wherever the data goes.

You validate on every keystroke

Fix: Validate on blur, then re-validate on input once flagged. Validating mid-typing shouts at people for an email address that is not finished yet.

You validate on page load

Fix: Do not. It greets people with a wall of red before they have typed anything, which is discouraging and tells them nothing they did not know.

Your error messages say 'invalid input'

Fix: Name the field, say what is wrong, and give the shape of a correct answer. This is a writing task, and it is where most forms are genuinely poor.

You indicate errors by colour alone

Fix: Add text and an icon, and set aria-invalid. A red border is invisible to colour-blind users and to anyone who cannot see the screen.

Your modal cannot be escaped or loses focus

Fix: Use the native dialog element, which handles Escape, the backdrop and focus return. A hand-built modal needs focus trapping and focus restoration, and getting it wrong traps keyboard users.

You interpolate user data into innerHTML for a list

Fix: Escape the values or build elements with textContent. A data-driven list makes every item an injection point, which is a larger cross-site scripting hole than a single field.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Use built-in HTML validation before writing any JavaScript. It works without scripts, works with assistive technology, and matches what people expect — custom validation should only cover the cases HTML genuinely cannot express.

- Validate on blur and re-validate on input once a field is flagged, never on load and never on every keystroke. The timing of feedback matters as much as its content, and the wrong timing makes correct validation feel hostile.

- Write error messages as instructions: name the field, say what is wrong, and give the shape of a correct answer. This is a writing task, and 'invalid input' is the single most common failure in form design.

- Escape every interpolated value when rendering lists from data. A data-driven list makes every item an injection point, so an innerHTML template turns one bad field into a whole page of cross-site scripting.

## Key termsBuilt-in validationrequired, type, minlength, maxlength and pattern. Free, accessible, and the correct first layer.Client-side validationChecking in the browser for the user's convenience. Never a security measure, because it can be bypassed.BlurThe moment a field loses focus. The right time to validate, unlike every keystroke.aria-describedbyConnects a message to its input so assistive technology announces them together.aria-invalidMarks a field's state for assistive technology rather than indicating it by colour alone.Live regionAn area whose changes are announced by assistive technology. How an error count reaches a screen reader user.dialog elementA native modal handling focus, Escape and backdrop natively. Far safer than a hand-built one.Empty stateWhat a list shows when there is no data. Without it a blank area is indistinguishable from a broken page.

## Homework before the next session

Add built-in validation to one form

required, correct types, minlength, maxlength and pattern where useful. Then confirm it blocks an invalid submission with JavaScript disabled entirely.

Rewrite five error messages

Take any 'invalid input' style messages and rewrite each to name the field, the problem and the shape of a correct answer. Read them aloud as though you were the person stuck.

Fix your validation timing

Move validation to blur, add re-validation on input once flagged, and remove anything running on page load. Note how different the form feels.

Build one accessible modal

With the native dialog element, closable by button, Escape and backdrop, returning focus to whatever opened it. Then test it with the keyboard only.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Validation layers | Validates input. | Built-in attributes confirmed to work without JavaScript, then JavaScript used only for what HTML cannot express, with server-side validation understood as necessary. |
| Timing | Shows errors. | Validation on blur with re-validation on input once flagged, nothing on load, and submit preventing default while focusing the first invalid field. |
| Error messages | Indicates problems. | Each message naming the field, the problem and the shape of a correct answer, placed beside the field, connected via aria-describedby with a non-colour indicator, and cleared when fixed. |
| Modals | Has a popup. | Built on the native dialog element or with correct focus trapping and restoration, closable by button, Escape and backdrop, and used only where interruption is justified. |
| Dynamic content | Renders a list. | Markup built once and inserted in one operation, every interpolated value escaped or set via textContent, and empty and loading states designed rather than left blank. |

## Session questionsDo I need JavaScript validation if HTML attributes work?+

Only for cases HTML cannot express — matching two passwords, comparing two dates, requiring at least one of several fields. Use required, type, minlength, maxlength and pattern first: they work without JavaScript, work with assistive technology, and match what people already expect.Is client-side validation enough for security?+

No, never. It runs in the user's browser, so anyone who wants to can bypass it entirely. Client-side validation makes the experience good; validation on the server, wherever the data goes, is what makes the data safe. They are not alternatives.When should validation run?+

On blur — when the person leaves the field — and then on input once that field has been flagged, so the error clears the moment it is fixed. Never on page load, which greets people with failure, and not on every keystroke, which shouts at an unfinished email address.How do I build an accessible modal?+

Use the native dialog element, which handles focus, the Escape key and the backdrop for free. A hand-built modal needs role dialog, aria-modal, a labelled title, focus trapping while open, and focus returned to the opening element on close — which is why the native element is the better starting point.My dynamically rendered list shows unstyled or broken items. Why?+

Usually either unescaped data breaking the markup, or an empty state that was never designed. Escape every interpolated value or build elements with textContent, and add a 'no items yet' message so a blank list is not mistaken for a broken page.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session7: The DOM](https://www.cea.ng/classes/web-development/the-dom)[Next session 9: Planning & Structuring a Project](https://www.cea.ng/classes/web-development/planning-and-structure)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
