---
title: "Session 10: Debugging & Quality"
description: "Debugging is a method, not a talent, and quality is a set of checks you run rather than a feeling you have. This session covers developer tools, systematic debugging, responsive testing, performance basics, accessibility and basic SEO."
date: "2026-09-12"
class_slug: "web-development"
---

Debugging is a method, not a talent, and quality is a set of checks you run rather than a feeling you have. This session covers developer tools, systematic debugging, responsive testing, performance basics, accessibility and basic SEO.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Use the browser developer tools deliberately

- Debug systematically rather than by changing things at random

- Read an error message and act on what it says

- Test responsively across real widths

- Find and fix the performance problems that matter most

- Run accessibility and SEO checks before publishing

## The taught content

### Developer tools

The developer tools are the single most useful thing in a browser, and most people use a fraction of them. The **Elements panel** shows the live DOM and the styles applied to whatever you select — including which rule won and which were overridden, struck through. That last part answers 'why is my CSS not applying' faster than anything else.

The **Console** runs JavaScript and shows errors. An error there is a gift: it names the problem and, usually, the exact line. The **Network panel** shows every request the page made, how long each took, and what failed — which is how you find a missing image or a request that never returns. The **Lighthouse** tab runs an automated audit of performance, accessibility and SEO and tells you specifically what to fix.

The habit to build is **looking before changing**. Most time lost in debugging is spent editing code based on a guess about what is wrong. Ten seconds in the Elements panel usually tells you what is actually happening, and then the fix is obvious.

### Debugging systematically

The method is short and it works. **Reproduce it reliably** — a bug you cannot trigger on demand you cannot fix. **Read the error**, all of it; the first line usually names the cause and the rest is the trail. **Form one hypothesis** about the cause. **Test that hypothesis with the smallest possible change.** Then either it is fixed, or the hypothesis was wrong and you form the next one.

The failure mode is the opposite: changing several things at once and seeing whether it improves. When it does improve you do not know which change worked, so the bug remains partly there; when it does not, you have made the code worse and lost the state you were reasoning about. **One change at a time** is slower per attempt and dramatically faster overall.

Then the two techniques that find almost anything. **`console.log` the values** at each step, because a bug is nearly always a value that is not what you assumed — and logging beats staring at code, which shows you what you meant to write. And **bisect**: comment out half the code and see whether the bug persists, then halve the remaining half. A few rounds locate the cause in code you would otherwise search for an hour.

### Reading error messages

Error messages read like accusations and are actually instructions. **'Cannot read properties of null'** means you tried to use something that was not there — a selector that matched nothing, or a value that had not loaded yet. **'is not a function'** means you called something that is not callable, usually a typo in the name or a missing import. **'Unexpected token'** is almost always a missing bracket, quote or comma a few lines above the reported line.

The discipline is to **read the whole message and the line number**, then look at that line before theorising. Most people read the first three words and start guessing. The line number is nearly always right, and the code there nearly always tells you what happened.

Then a distinction worth internalising: a **syntax error** stops the script entirely and nothing runs, while a **runtime error** stops execution at that point and everything before it already happened. If your whole page is dead, look for a syntax error; if one thing does not work, look for a runtime error at the moment that thing runs. Knowing which you have halves the search.

### Responsive and performance testing

Responsive testing means **actually looking at the page at real widths**, not resizing once and assuming. Test at roughly **320px** (a small phone, where things break first), **375px**, **768px** (a tablet), **1024px** and **1440px**. The device toolbar in developer tools does this, and it also simulates touch — which catches buttons too small to tap, a problem you cannot see with a mouse.

Then check the things that only appear at small sizes: text overflowing its container, images wider than the screen causing horizontal scroll, tap targets smaller than about 44 pixels, and navigation that does not fit. **Horizontal scrolling on a phone is the clearest sign something is broken**, and it is almost always one element wider than the viewport.

For **performance**, three things dominate and they are all fixable. **Image size** — by far the most common problem, because a 4MB photo from a phone makes a page take seconds to load on a mobile connection; resize and compress before uploading. **Render-blocking resources** — large stylesheets and scripts in the head that delay first paint; use `defer` on scripts. And **too many requests** — dozens of small files each cost a round trip. The Network panel shows all three, and Lighthouse names them for you.

### Accessibility and SEO checks

Before publishing, run the accessibility checks from earlier in the course as a **list rather than a hope**: keyboard-only navigation reaching everything, visible focus everywhere, contrast at 4.5:1 or better, alt text on images, labels on inputs, one h1 with a logical outline, and no information conveyed by colour alone. Lighthouse audits most of this automatically and names what fails.

Then **basic SEO**, which is mostly about being describable rather than tricks. A **`<title>`** on every page that says what the page is — not 'Home' on all of them. A **`meta description`** summarising the page, which is what appears in search results. **One h1** stating the subject, with headings nested logically so the outline describes the content. **Alt text** on images, which is also how images appear in image search. And a **`lang`** attribute on the html element so the language is known.

The honest summary is that **good semantics is most of SEO**. A page built with the right elements, real headings, descriptive links and alt text is already well optimised, because those are exactly the signals search engines read. There is no separate technique to learn — the accessible page and the searchable page are the same page.

## Instructor demonstration

The instructor takes a deliberately broken page and fixes it live using only the tools: reading the console error and the line number, inspecting which CSS rule won, bisecting the JavaScript, finding the element causing horizontal scroll on a phone, identifying an oversized image in the Network panel, and running Lighthouse to name the accessibility and SEO failures.

### Reproduce the bug reliably

Trigger it on demand and note the exact steps. Explain that a bug you cannot reproduce on demand cannot be fixed, only stumbled into fixing.02

### Read the console error fully

Read the whole message and the line number before touching code. Explain that most people read three words and start guessing.03

### Classify the error

Decide whether it is syntax or runtime. Explain that a dead page means syntax while one broken feature means runtime, which halves the search.04

### Inspect which CSS rule won

Open the Styles pane and show the overridden rules struck through. Explain that this answers 'why is my CSS not applying' faster than anything else.05

### Log the values

Add console.log at each step and find the value that is not what was assumed. Explain that logging beats staring, because code shows what you meant to write.06

### Bisect the code

Comment out half and retest, then halve again. Explain that a few rounds locate the cause in code you would otherwise search for an hour.07

### Change one thing at a time

Contrast with changing three things at once. Explain that when several changes are made you cannot tell which worked and the bug remains partly there.08

### Test at 320px

Open the device toolbar at a small phone width. Explain that this is where things break first and where problems are invisible at desktop size.09

### Find the horizontal scroll

Locate the element wider than the viewport. Explain that horizontal scrolling on a phone is the clearest sign something is broken.10

### Check tap target sizes

Simulate touch and measure the buttons. Explain that anything under about 44 pixels is difficult to hit with a thumb.11

### Find the oversized image

Open the Network panel and sort by size. Show a multi-megabyte photo and explain that image size is the most common performance problem by far.12

### Find the render-blocking script

Show a script in the head delaying first paint and add defer. Explain that the Network panel shows exactly what blocks and for how long.13

### Run Lighthouse

Audit the page and read the accessibility and SEO failures it names. Explain that the accessible page and the searchable page are the same page.

## Guided practice

### Debug and audit a real project

You take a real project, debug its problems using the method rather than by changing things at random, then audit it: five real widths tested, performance issues found in the Network panel and fixed, and Lighthouse run for accessibility and SEO with every named failure addressed.

1. 01Reproduce each bug reliably and write the exact steps.

2. 02Read each console error fully, including the line number, before editing anything.

3. 03Classify each error as syntax or runtime.

4. 04Use the Styles pane to find which CSS rule won for every styling problem.

5. 05Log values at each step rather than guessing what they are.

6. 06Bisect any bug you cannot locate by inspection.

7. 07Change one thing at a time and confirm each fix before making the next.

8. 08Test the page at 320px, 375px, 768px, 1024px and 1440px.

9. 09Find and fix any element causing horizontal scroll on a phone.

10. 10Measure tap targets and enlarge anything under about 44 pixels.

11. 11Open the Network panel and sort by size to find the largest resources.

12. 12Resize and compress any oversized image before uploading it.

13. 13Add defer to any render-blocking script in the head.

14. 14Run the accessibility checklist: keyboard, focus, contrast, alt, labels, headings, colour.

15. 15Check every page has a descriptive title, a meta description, one h1 and a lang attribute.

16. 16Run Lighthouse and fix every failure it names.

17. 17Re-run Lighthouse and record the before and after scores.

The standard we hold you to

A project where every bug was reproduced reliably with the console error read in full and classified as syntax or runtime, the Styles pane used to identify the winning rule, values logged rather than assumed, bisection used where inspection failed, and one change made at a time; tested at 320, 375, 768, 1024 and 1440 pixels with horizontal scroll eliminated and tap targets at 44 pixels or more; the Network panel used to find and compress oversized images and defer render-blocking scripts; the full accessibility checklist run and every failure fixed; every page given a descriptive title, meta description, single h1 and lang attribute; and Lighthouse run before and after with every named failure addressed and both scores recorded.

## Common mistakes and how to fix them

You change code based on a guess

Fix: Look first. Ten seconds in the Elements panel usually shows what is actually happening, and most time lost in debugging is spent editing based on an assumption about the cause.

You change several things at once

Fix: One change at a time. With several changes you cannot tell which worked, so the bug stays partly there, and if it gets worse you have lost the state you were reasoning about.

You read three words of the error and start guessing

Fix: Read the whole message and the line number, then look at that line. The line number is nearly always right and the code there nearly always tells you what happened.

You stare at the code instead of logging

Fix: Log the values at each step. A bug is almost always a value that is not what you assumed, and code shows you what you meant to write rather than what it does.

You test at one width and assume the rest

Fix: Test at 320, 375, 768, 1024 and 1440 pixels. Small phones are where things break first, and a problem invisible at desktop size is obvious at 320.

Your page scrolls sideways on a phone

Fix: Find the element wider than the viewport and constrain it. Horizontal scrolling is the clearest sign something is broken and it is almost always one element.

You upload photos straight from a phone

Fix: Resize and compress before uploading. A multi-megabyte image is the most common performance problem by far, and it makes the page take seconds to load on a mobile connection.

You treat SEO as a separate technique

Fix: Good semantics is most of SEO. Descriptive titles, real headings, meaningful link text and alt text are exactly the signals search engines read, so the accessible page and the searchable page are the same page.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Look in the developer tools before changing any code. Most debugging time is lost editing based on a guess, and ten seconds in the Elements panel usually shows what is actually happening, after which the fix is obvious.

- Change one thing at a time and confirm each fix. Changing several things at once is slower overall, because you cannot tell which change worked and the bug stays partly there.

- Test at 320px as well as desktop. Small phones are where layouts break first, tap targets become too small, and horizontal scroll appears — all invisible at desktop width.

- Resize and compress every image before uploading. Image size dominates page weight far more than any other factor, and a multi-megabyte photo makes a page unusable on the mobile connections most people here have.

## Key termsElements panelThe live DOM and applied styles, with overridden rules struck through. Answers 'why is my CSS not applying'.ConsoleWhere errors appear and JavaScript runs. An error there names the problem and usually the line.Network panelEvery request, its size and its duration. How you find missing files and oversized images.LighthouseAn automated audit of performance, accessibility and SEO that names specific failures to fix.BisectionHalving the code repeatedly to locate a bug. Finds the cause in rounds rather than by searching.Syntax errorStops the whole script; nothing runs. Distinguished from a runtime error, which stops only from that point.Tap targetA control's clickable size. Under about 44 pixels it is difficult to hit with a thumb.Render-blocking resourceA stylesheet or script in the head delaying first paint. Scripts should carry defer.

## Homework before the next session

Debug one bug by the method

Reproduce it, read the whole error and line number, classify it as syntax or runtime, form one hypothesis, and test it with the smallest possible change. Note how much faster it was than guessing.

Test one page at five widths

320, 375, 768, 1024 and 1440 pixels. Fix any horizontal scroll, any overflowing text, and any tap target under 44 pixels.

Find your heaviest resource

Open the Network panel, sort by size, and compress or resize the largest item. Note the difference in load time, particularly on a throttled connection.

Run Lighthouse and fix the failures

Record the before scores, fix every accessibility and SEO failure it names, then re-run and record the after scores. Keep both — the improvement is portfolio evidence.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Tool use | Opens developer tools. | Elements, Console, Network and Lighthouse each used for the problem they answer, with the tools consulted before code is edited. |
| Debugging method | Fixes bugs eventually. | Bugs reproduced reliably, errors read in full and classified, one hypothesis tested with the smallest change, bisection used where inspection failed, and one change at a time. |
| Responsive testing | Works on a phone. | Tested at five real widths with horizontal scroll eliminated, overflow fixed, and tap targets at 44 pixels or more with touch simulated. |
| Performance | Loads reasonably. | The Network panel used to find the largest resources, images resized and compressed, render-blocking scripts deferred, and the improvement measured. |
| Accessibility and SEO | Looks fine. | The full checklist run with every failure fixed, every page carrying a descriptive title, meta description, single h1 and lang attribute, and Lighthouse run before and after with both scores recorded. |

## Session questionsWhere do I start when something is broken?+

Open the Console and read the error in full, including the line number, before editing anything. Then reproduce the bug reliably so you can tell whether a change fixed it. Most debugging time is lost by guessing before looking.Why is my CSS not applying?+

Open the Elements panel, select the element, and look at the Styles pane. Overridden rules are struck through, so you can see immediately which rule won and why — it is nearly always specificity or a later rule with equal specificity.My page is slow. What is causing it?+

Open the Network panel and sort by size. It is almost always images — a multi-megabyte photo from a phone makes a page take seconds to load on a mobile connection. Resize and compress before uploading, and add defer to any script in the head.How do I test responsively without five devices?+

Use the device toolbar in developer tools at 320, 375, 768, 1024 and 1440 pixels, and enable touch simulation. That catches the problems a mouse cannot: tap targets too small, hover-dependent interactions, and layouts that only break at small widths.Do I need to learn SEO techniques?+

Not really. A descriptive title on every page, a meta description, one h1 with a logical heading outline, meaningful link text and alt text on images is most of it — because those are exactly the signals search engines read. The accessible page and the searchable page are the same page.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session9: Planning & Structuring a Project](https://www.cea.ng/classes/web-development/planning-and-structure)[Next session 11: Deployment & Git Workflow](https://www.cea.ng/classes/web-development/deployment-and-git)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
