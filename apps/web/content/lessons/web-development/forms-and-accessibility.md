---
title: "Session 2: Forms & Accessibility"
description: "Forms are how a website does anything, and accessibility is whether anyone can use what you built. This session covers building forms that work and validate, the accessibility basics that make a page usable by everyone, and a project bringing it together."
date: "2026-09-12"
class_slug: "web-development"
---

Forms are how a website does anything, and accessibility is whether anyone can use what you built. This session covers building forms that work and validate, the accessibility basics that make a page usable by everyone, and a project bringing it together.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Build forms with the right input types and correct labelling

- Understand how a form submission actually works

- Make a page usable with a keyboard alone

- Apply the accessibility basics that matter most

- Test your page the way an assistive technology user would

- Build a complete multi-section website

## The taught content

### How forms work

A form is a collection of inputs inside a `<form>` element, with an **action** saying where the data goes and a **method** saying how. `POST` sends the data in the request body and is right for anything sensitive or that changes something; `GET` puts it in the URL, which is visible, bookmarkable and limited in length — fine for a search, wrong for a password.

Each input needs a **`name`**, because that is the key the data arrives under. An input without a name is invisible to the server however it looks on the page, which is a common and confusing bug: the form appears to work, the user types something, and nothing arrives.

Then the **input types**, which are not cosmetic. `type="email"` gives a phone an email keyboard and basic format checking. `type="tel"` gives a numeric pad. `type="date"` gives a date picker instead of a free-text box the user has to guess the format of. `type="password"` hides the characters. Using `type="text"` for everything works and is worse in every way, particularly on a phone, where the wrong keyboard is a real obstacle.

### Labels are not optional

Every input needs a **`<label>`**, connected to it by matching `for` and `id` attributes. This is not a formality: the label is what a screen reader announces, it is what makes the field findable, and it makes the **whole label clickable** to focus the input — which matters enormously on a phone, where tapping a small checkbox is fiddly and tapping its label is easy.

The common wrong way is **placeholder-as-label**: an input with no label whose purpose is written in grey text inside it. It fails in three ways at once. The text disappears the moment someone starts typing, so they cannot remember what the field was for. It is usually too low-contrast to read comfortably. And some assistive technology does not announce it at all. Placeholder text is for **examples** — 'for example, 0803 000 0000' — never for labels.

Then the related requirements. Group related controls with **`<fieldset>` and `<legend>`** — a set of radio buttons needs a legend saying what the choice is about, because the individual options ('Yes', 'No') mean nothing alone. Mark required fields with **`required`**, which gives free browser validation. And for anything else, use **`aria-describedby`** to point at helper text so it is announced with the field rather than sitting nearby unseen.

### Buttons and submission

Use a **`<button>`** for anything that does something. The two elements that look interchangeable are not: `<button type="submit">` inside a form submits it, `<button type="button">` does not submit and is for JavaScript actions, and `<a>` navigates somewhere. Styling a link to look like a button produces something a keyboard user activates differently and a screen reader announces wrongly.

Then **do not disable the submit button while submitting without a way back**. It is a well-meant pattern — prevent double submission — that traps people when the request fails, because the button stays disabled and there is no way to try again. Better: keep it enabled, show a loading state, and handle failure by telling the user what happened.

And **tell the user what happened**. A form that submits silently gives no confirmation, so people submit twice or assume it failed. Show a clear success message, and on error say **which field** is wrong and **what to do about it** — 'Email address is missing the @ symbol' rather than 'Invalid input'. Error messages that only mark a field red are useless to anyone who cannot see the colour.

### Keyboard access

A great many people cannot use a mouse — people with motor impairments, people using a screen reader, people whose mouse is broken. Everything must be reachable and operable with a **keyboard alone**, and the test takes thirty seconds: **put your mouse down and tab through the page**. If you cannot reach something, or reach it and cannot tell where you are, it is broken.

Three things make this work. **Focus must be visible** — the outline showing which element has focus must never be removed. `outline: none` is one of the most damaging lines of CSS there is, and it is usually added because someone thought the default outline was ugly. Restyle it; do not remove it. **Tab order must be logical**, following the visual order of the page; a tab order that jumps around is worse than none.

Then **do not build interactive elements out of divs**. A `<div onclick>` is invisible to a keyboard: it cannot be focused, cannot be activated with Enter or Space, and is not announced as a button. Use `<button>` and you get all of that for free. And **provide a skip link** at the top of the page so a keyboard user is not forced to tab through the entire navigation on every single page load — which for a site with twenty nav items is genuinely unusable.

### The accessibility basics that matter most

**Colour contrast** is the most common failure and the easiest to check. Text needs a contrast ratio of at least **4.5:1** against its background for normal text and 3:1 for large text. Light grey on white — the aesthetic choice behind a great many modern sites — frequently fails badly and makes text unreadable for people with low vision, and for anyone in bright sunlight, which is most of Nigeria.

**Never convey information by colour alone.** 'Required fields are in red' tells a colour-blind user nothing, and 'errors are highlighted red' is invisible to them. Add a text indicator — an asterisk with an explanation, an icon, the word 'error' — so the meaning survives without the colour.

Then **text that can be resized**, **meaningful link text**, **alt text on images**, **a page title that says what the page is**, and **a language declared** on the `<html>` element so assistive technology pronounces it correctly. None of these is difficult. Together they are the difference between a site that most people can use and one that a significant minority cannot, and they cost minutes rather than hours if you do them as you build rather than retrofitting.

## Instructor demonstration

The instructor builds a working contact form with correct types and labels, then runs the accessibility tests that matter: keyboard-only navigation with the mouse put down, a contrast check on the actual colours, a screen reader pass, and a form error message rewritten from 'invalid input' into something usable.

### Build the form skeleton

Write the form element with method and action, then a named input. Explain that an input without a name never reaches the server however it looks.02

### Choose input types deliberately

Use email, tel, date and password. Open the page on a phone and show the different keyboards. Explain that type text for everything is worse in every way.03

### Add proper labels

Connect each label with for and id, then click the label to focus the field. Explain that this matters most on a phone where tapping a checkbox is fiddly.04

### Show the placeholder-as-label mistake

Type into a placeholder-labelled field and watch the hint vanish. Explain the three ways it fails at once.05

### Group radio buttons

Wrap them in a fieldset with a legend. Explain that 'Yes' and 'No' alone mean nothing without the question.06

### Add helper text correctly

Use aria-describedby to attach it to the field. Explain that text sitting nearby is not announced with the input.07

### Use the right button

Compare button type submit, button type button and a styled link. Explain that a styled link is activated differently and announced wrongly.08

### Show the disabled-button trap

Simulate a failed request with the submit button disabled. Explain that the user is now stuck with no way to retry.09

### Rewrite the error message

Change 'Invalid input' to name the field and the fix. Explain that a red border alone is invisible to anyone who cannot see the colour.10

### Tab through with the mouse put down

Navigate the whole page by keyboard. Show an element that cannot be reached and a focus indicator that cannot be seen.11

### Restore the focus outline

Find the outline none rule and replace it with a visible restyled outline. Explain that this is one of the most damaging lines of CSS there is.12

### Check contrast on the real colours

Measure the actual ratio and find a failing pair. Explain that light grey on white frequently fails and is unreadable in bright sunlight.13

### Add a skip link

Insert one at the top of the page. Explain that without it a keyboard user tabs through the entire navigation on every page load.

## Guided practice

### Project: multi-section website

You build a complete multi-section website with a working form — correct input types, real labels, fieldset-grouped radios, and error messages naming the field and the fix — then make it accessible and prove it: keyboard-only navigation with the mouse put down, visible focus everywhere, contrast at 4.5:1 or better, no information by colour alone, and a skip link.

1. 01Plan the sections the site needs and sketch the page order.

2. 02Build the semantic structure: header, nav, main, sections, footer.

3. 03Write one h1 and a heading outline with no skipped levels.

4. 04Add the form with a method and an action.

5. 05Give every input a name.

6. 06Choose input types deliberately: email, tel, date, password where they apply.

7. 07Connect a real label to every input with for and id.

8. 08Use placeholder text only for examples, never as a label.

9. 09Group radio buttons in a fieldset with a legend.

10. 10Attach helper text with aria-describedby.

11. 11Use button type submit for submitting and button type button for JavaScript actions.

12. 12Write error messages naming the field and what to do about it.

13. 13Confirm the submit button cannot trap the user if a request fails.

14. 14Put the mouse down and tab through every page, fixing anything unreachable.

15. 15Restore or restyle every focus outline so focus is always visible.

16. 16Measure the contrast of every text and background pair and fix failures.

17. 17Add a text indicator anywhere information is currently conveyed by colour alone.

18. 18Add a skip link to bypass the navigation.

19. 19Declare the language on the html element and set a descriptive page title.

The standard we hold you to

A multi-section site built on semantic structure with a working form whose inputs all have names and deliberately chosen types, real labels connected by for and id, placeholder used only for examples, radios grouped in a fieldset with a legend, helper text attached via aria-describedby, correct button types, error messages naming the field and the fix, and no submit-button trap — proven accessible by keyboard-only navigation with the mouse put down reaching everything, visible focus on every element, measured contrast of at least 4.5:1 everywhere, no information conveyed by colour alone, a working skip link, and a declared language and descriptive title.

## Common mistakes and how to fix them

Your inputs have no name attribute

Fix: Add a name to every input. Without it the data never reaches the server however the form looks, which produces the confusing bug where the form appears to work and nothing arrives.

You used type text for everything

Fix: Use email, tel, date and password where they apply. The type changes the keyboard on a phone and enables built-in validation, so text for everything is worse in every way.

Your placeholder is doing the job of a label

Fix: Add a real label. Placeholder text vanishes when someone types, is usually too low-contrast to read, and is not reliably announced — it is for examples, never for labels.

Your radio buttons have no legend

Fix: Wrap them in a fieldset with a legend. The individual options mean nothing alone, and a screen reader user hears 'Yes' with no idea what the question was.

You styled a link to look like a button

Fix: Use a button element. A styled link is activated with a different key, announced as a link, and behaves inconsistently for keyboard and assistive technology users.

You removed the focus outline

Fix: Restyle it, never remove it. outline none makes the page unusable for keyboard users, who cannot tell where they are — and it is usually added for purely aesthetic reasons.

You convey information by colour alone

Fix: Add a text indicator. 'Required fields are in red' and 'errors are red' are invisible to colour-blind users, so the meaning must survive without the colour.

Your error messages say 'invalid input'

Fix: Name the field and the fix. An error that only marks a border red is useless to anyone who cannot see the colour, and unhelpful to everyone else.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Label every input with a real label element, connected by for and id. It is announced by assistive technology, makes the field findable, and makes the whole label clickable — which on a phone is the difference between a usable checkbox and an unusable one.

- Put the mouse down and tab through every page you build. Thirty seconds of keyboard-only testing finds problems no amount of looking will reveal, and an unreachable element is a feature that does not exist for a large group of users.

- Never write outline: none. A visible focus indicator is what tells a keyboard user where they are, and removing it for aesthetics makes the page unusable — restyle the outline instead.

- Check contrast on your actual colours rather than assuming. Light grey on white is an extremely common aesthetic choice that fails badly, and it is unreadable for people with low vision and for anyone using a phone in bright sunlight.

## Key termsForm methodHow data is sent. POST for sensitive or state-changing data, GET for visible bookmarkable queries.name attributeThe key the input's value arrives under. Without it the data never reaches the server.Label associationConnecting a label to an input with for and id. Announced by assistive technology and makes the label clickable.PlaceholderExample text inside an input that disappears on typing. Never a substitute for a label.Fieldset and legendA grouping with a caption. Required so grouped radio options have a question attached.Focus indicatorThe visible outline showing which element has keyboard focus. Removing it makes a page unusable by keyboard.Contrast ratioHow much text stands out from its background. At least 4.5:1 for normal text.Skip linkA link at the top letting keyboard users bypass navigation. Without it they tab through the whole menu on every page.

## Homework before the next session

Build one accessible form

Correct types, real labels on every input, fieldset and legend for any grouped options, helper text via aria-describedby, and error messages naming the field and the fix.

Tab through a page with the mouse put down

Reach everything, confirm focus is visible at every step, and fix anything you cannot reach or cannot locate. Note how long the navigation takes without a skip link.

Measure your contrast

Check every text and background pair against 4.5:1 and fix the failures. Light grey on white is the usual culprit.

Remove colour-only information

Find every place meaning is carried by colour alone — required markers, errors, status — and add a text indicator so the meaning survives without it.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Form structure | Has a form. | Method and action set, every input named, input types chosen deliberately, and correct button types rather than styled links. |
| Labelling | Fields are identifiable. | Real labels connected by for and id on every input, placeholder used only for examples, radios grouped in a fieldset with a legend, helper text attached via aria-describedby. |
| Error handling | Shows errors. | Messages naming the field and the fix rather than only colour, and a submit flow that cannot trap the user when a request fails. |
| Keyboard access | Mostly usable. | Proven by mouse-down tab traversal reaching everything, visible focus on every element with no outline removed, and a working skip link. |
| Accessibility fundamentals | Looks reasonable. | Measured contrast of at least 4.5:1 throughout, no information conveyed by colour alone, meaningful link text, alt text, a descriptive title and a declared language. |

## Session questionsDo I really need a label if I have a placeholder?+

Yes. Placeholder text disappears the moment someone starts typing, so they cannot remember what the field was for; it is usually too low-contrast to read comfortably; and some assistive technology does not announce it at all. Use placeholder for an example like '0803 000 0000' and a real label for the field.Why does my form submit but nothing arrives?+

Almost always a missing name attribute on the input. The name is the key the data arrives under, so an input without one is invisible to the server however correct it looks on the page.Is accessibility really necessary for a small project?+

The basics cost minutes if you do them while building: labels, alt text, visible focus, adequate contrast, semantic elements. Retrofitting them costs hours. And they help far more people than you would guess — including anyone using a phone in bright sunlight or with a broken mouse.What contrast ratio do I need?+

At least 4.5:1 for normal text and 3:1 for large text. Measure your actual colours rather than assuming — light grey on white is an extremely common design choice that fails badly, and it is unreadable for people with low vision.Should I disable the submit button while the form is sending?+

Not without a way back. It prevents double submission but traps the user if the request fails, leaving them unable to retry. Better to keep it enabled, show a loading state, and handle failure with a clear message telling them what went wrong.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Semantic HTML](https://www.cea.ng/classes/web-development/semantic-html)[Next session 3: CSS Box Model & Typography](https://www.cea.ng/classes/web-development/css-box-model-typography)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
