---
title: "Session 6: Responsive Design"
description: "Most Nigerian visitors arrive on a phone over mobile data, so responsive design is not a refinement — it is the design. This session covers media queries, fluid units, responsive images, and the mobile-first method that produces sites working on every screen."
date: "2026-09-12"
class_slug: "web-design"
---

Most Nigerian visitors arrive on a phone over mobile data, so responsive design is not a refinement — it is the design. This session covers media queries, fluid units, responsive images, and the mobile-first method that produces sites working on every screen.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain the viewport meta tag and what breaks without it

- Write media queries and choose breakpoints from content, not devices

- Use fluid units so layouts adapt without breaking

- Serve appropriately sized images to different screens

- Apply a mobile-first workflow

- Test properly across real devices and fix what breaks

## The taught content

### The viewport, and why phones lie by default

Without `<meta name="viewport" content="width=device-width, initial-scale=1">` a phone does not use its real width. It assumes the page was built for a desktop, renders it at around 980 pixels wide, and shrinks the whole thing to fit — which is why an old website appears tiny on a phone and requires pinch-zooming to read. That tag tells the browser to use the device's actual width, and it is the precondition for every other responsive technique. Missing it means your media queries never fire, because the browser believes it is 980 pixels wide.

Understand also that a phone's **CSS pixel width** is not its physical pixel count. A phone with a 1080-pixel-wide screen typically reports about 360 to 412 CSS pixels, because of its pixel density. This is why you design against widths like 360, 390 and 412 rather than 1080, and why testing in the dev tools device toolbar — which reports CSS pixels — is meaningful. The common working widths to test are roughly 360 (small Android), 390 (iPhone), 412 (large Android), 768 (tablet) and 1280 and up (desktop).

The Nigerian context sharpens this: the overwhelming majority of visitors arrive on a phone, often on mobile data, often on a mid-range Android at the narrower end of that range. A site designed for a desktop first and adapted afterwards will fail precisely where the customers are. This is why mobile-first is the correct method here rather than a preference.

### Media queries and where to put the breakpoints

A **media query** applies CSS only when a condition holds. `@media (min-width: 768px) { ... }` means 'when the viewport is at least 768 CSS pixels wide'. Inside it you override the base styles, and because it comes later in the file it wins ties by source order — which is exactly how the mobile-first method works.

The question beginners get wrong is where to put the breakpoints. The answer is **not** at the widths of popular devices, because devices change every year. It is at the widths where **your content breaks**. Widen the browser slowly and watch: at some point a line of text becomes too long to read comfortably, or a row of cards becomes too cramped, or a column becomes too wide. Those are your breakpoints. In practice that produces three or four — around 600, 768 and 1024 — and they hold across device generations because they come from the content rather than from a product list.

Keep the number small. Every breakpoint is a set of rules you must maintain and test, and a stylesheet with twelve breakpoints is a stylesheet nobody can reason about. Three or four, chosen from content, covers essentially every business site you will build.

### Fluid units: designing without breakpoints where you can

The best responsive technique is the one that needs no media query. **Percentages** and the **`fr` unit** make things share available space automatically. `max-width: 100%` on an image stops it overflowing its container, which is the single most important line for preventing horizontal scroll on a phone. The Grid pattern `repeat(auto-fit, minmax(260px, 1fr))` reflows a card grid with no query at all. And `clamp()` — `font-size: clamp(1.75rem, 4vw, 3rem)` — gives a heading that scales fluidly between a minimum and a maximum, which produces genuinely smooth type scaling rather than three abrupt jumps.

`vw` is a viewport width unit — 1vw is one percent of the viewport width — and it is powerful but must always be bounded. A font sized purely in `vw` becomes unreadably small on a phone and absurdly large on a wide monitor, which is why `clamp()` with a `rem` floor and ceiling is the right pattern rather than `vw` alone.

Reach for fluid units before reaching for a media query, every time. A layout built from flexible tracks and clamped type often needs only one or two queries for genuinely structural changes, which makes it smaller, faster and far easier to maintain.

### Responsive images

A four-megabyte hero photograph served to a phone on mobile data is a lost visitor, and it is one of the most common performance failures on Nigerian business sites. Three techniques, in order of importance. First, **always** set `img { max-width: 100%; height: auto }` so no image can overflow its container — without it, one large image creates a horizontally scrolling page, which is an immediate usability failure.

Second, **compress and resize before uploading**. Resize to the largest size you will display — usually no more than about 1600 pixels wide for a full-width hero — and compress; the visual difference is nil and the file size difference is often tenfold. This one habit matters more than any markup cleverness.

Third, where a genuinely large image must be served responsively, use **`srcset`**, which offers the browser several sizes and lets it choose based on the screen: `srcset="hero-600.jpg 600w, hero-1200.jpg 1200w"` with a `sizes` attribute describing the displayed width. The browser picks the smallest sufficient file. This is worth doing for a hero image on a content-heavy site, but it is not a substitute for compressing in the first place.

### Mobile first, and testing properly

**Mobile first** means writing the base CSS for the narrowest screen, then adding media queries with `min-width` to enhance for larger ones. The opposite — desktop first with `max-width` queries removing things — produces a stylesheet full of overrides and cancellations, and it means the phone version is an afterthought built by subtraction. Mobile first also has a performance benefit: the phone, which has the least capable connection and processor, downloads only the base CSS rather than a desktop stylesheet it then partially undoes.

The practical workflow is: build and test at 360 pixels wide first, get everything working and readable there, then widen and add enhancements at the content-driven breakpoints. If a layout works at 360 it almost always works wider; the reverse is not true.

Then test properly, and this means **a real phone**, not only the dev tools device toolbar. The toolbar is excellent for fast iteration but it does not tell you how the page performs on mobile data, how a touch target feels under a thumb, or whether text is legible in daylight. Test the real thing: load the page on a phone over mobile data, time it, try every link and the form, and read the body text without squinting. **Touch targets** should be at least about 44×44 CSS pixels — a link that is fine with a mouse is impossible to tap accurately — and they need space between them, because a fat-fingered tap on the wrong link is a real and common frustration.

## Instructor demonstration

The instructor takes the business site from session five and makes it fully responsive mobile-first, breaking and fixing real problems at each width, then tests it on a physical phone over mobile data.

### Confirm the viewport tag

Remove it and show the page rendering as a shrunken desktop page needing pinch-zoom. Restore it and explain that without it no media query ever fires.02

### Set the image safety rule

Add img max-width 100% and height auto. Show a large image overflowing and creating horizontal scroll before the rule, and the fix after.03

### Open at 360 pixels

Set the device toolbar to 360 and work through the page top to bottom, listing everything that breaks. Explain that this is the starting point, not an afterthought.04

### Stack the layout

Make the base CSS single-column with no media query. Show that the mobile layout then needs no overrides at all.05

### Find a breakpoint from the content

Widen the window slowly and stop where body lines become too long to read comfortably. Note that width and use it, explaining why content-driven breakpoints outlast device lists.06

### Add the first min-width query

Add the two-column layout inside @media (min-width: 768px) and show the base styles still governing below it.07

### Use clamp for fluid type

Replace three fixed heading sizes with clamp() between a rem floor and ceiling, and resize to show smooth scaling rather than jumps.08

### Reflow the cards with auto-fit

Replace a media-query-driven card layout with repeat(auto-fit, minmax(260px, 1fr)) and delete the query. Explain that this is the pattern to prefer.09

### Compress the hero image

Show the original file size, resize and compress, and compare. Note the visual difference is nil and the load difference is decisive on mobile data.10

### Add srcset for the hero

Offer 600w and 1200w versions with a sizes attribute, and check in the Network panel which one the browser chose at a narrow width.11

### Fix touch targets

Measure the nav links and buttons, increase them to at least 44 pixels with spacing between. Explain that a mouse-sized link is untappable.12

### Test on a real phone over mobile data

Load the page, time it, tap every link, submit the form, and read the body text in daylight. List what the dev tools toolbar did not reveal.

## Guided practice

### Make the business site fully responsive

You take the one-page site from session five and rebuild it mobile-first: base CSS for 360 pixels, content-driven breakpoints, fluid units and clamp() replacing avoidable queries, compressed and responsive images, adequate touch targets — then test it on a real phone over mobile data.

1. 01Confirm the viewport meta tag is present and correct.

2. 02Add img max-width 100% and height auto as a global rule.

3. 03Open the page at 360 CSS pixels and list everything that breaks.

4. 04Rewrite the base CSS to be single-column with no media queries.

5. 05Widen slowly and record the widths where content actually breaks.

6. 06Add min-width media queries only at those content-driven widths.

7. 07Replace at least two fixed heading sizes with clamp() between rem bounds.

8. 08Replace any media-query-driven card layout with repeat(auto-fit, minmax(260px, 1fr)).

9. 09Compress and resize every image to the largest displayed size.

10. 10Add srcset and sizes to the hero image and confirm in the Network panel which file loads at a narrow width.

11. 11Make every tap target at least 44×44 CSS pixels with space between targets.

12. 12Test at 360, 390, 412, 768 and 1280 in the device toolbar.

13. 13Test on a real phone over mobile data: time the load, tap every link, submit the form, and read body text in daylight.

The standard we hold you to

A site whose base CSS works at 360 pixels with no overrides, using three or four content-driven breakpoints, fluid units and clamp() in place of avoidable queries, all images compressed with the hero using srcset, all tap targets at least 44 pixels, and verified working on a real phone over mobile data with the load time recorded.

## Common mistakes and how to fix them

Your media queries never fire on a phone

Fix: The viewport meta tag is missing or wrong, so the browser renders at about 980 pixels and believes it is a desktop. Add width=device-width, initial-scale=1 — it is the precondition for everything else.

The page scrolls horizontally on a phone

Fix: An image or element is wider than its container. Add img max-width 100%; height auto globally, then look for fixed widths that exceed narrow screens. Horizontal scroll is an immediate usability failure.

You put breakpoints at popular device widths

Fix: Put them where your content breaks. Devices change every year; the width at which a line of text becomes unreadable does not. Three or four content-driven breakpoints outlast any device list.

You built desktop first and stripped it down for phones

Fix: Rebuild mobile first: base CSS for 360 pixels, then min-width queries adding enhancements. Desktop-first produces a stylesheet of overrides and makes the phone version an afterthought.

Your hero image is several megabytes

Fix: Resize to the largest displayed size and compress before uploading. Then add srcset so the browser can pick a smaller file on a narrow screen. This is the most common cause of an abandoned page on mobile data.

Your links are untappable

Fix: Make every tap target at least 44×44 CSS pixels with space between them. A link sized for a mouse cursor is impossible to hit accurately with a thumb, and misfires cost real enquiries.

You tested only in the dev tools device toolbar

Fix: Test on a real phone over mobile data. The toolbar cannot show you load performance, touch feel, or daylight legibility — and those are the conditions your actual visitors arrive in.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Build at 360 pixels wide first, always. If a layout works there it almost always works wider, and the reverse is not true. It also forces the decisions — what is essential, what can be cut — that make the desktop version better rather than just larger.

- Reach for a fluid unit before reaching for a media query. Percentages, fr, max-width: 100% and clamp() remove queries entirely, and every query you do not write is one you never have to maintain or debug.

- Compress images as a fixed step in every project, not an optimisation you consider later. On a Nigerian mobile connection the difference between a compressed and an uncompressed hero is the difference between a visitor staying and leaving, and no amount of good design recovers from that.

- Test on a real phone over mobile data before every delivery and record the load time. It is the single check that most reliably predicts whether a client's customers will actually see the site you built.

## Key termsViewport meta tagThe tag telling a phone to use its real width. Without it, media queries never fire.CSS pixelThe width a device reports to CSS, typically 360–412 on a phone regardless of its physical pixel count.Media queryCSS that applies only when a condition such as a minimum width holds. The mechanism behind responsiveness.Content-driven breakpointA width chosen because the content breaks there, rather than because a device has that width.Mobile firstWriting base CSS for the narrowest screen and enhancing upward with min-width queries.clamp()A fluid value with a minimum and maximum, such as clamp(1.75rem, 4vw, 3rem). Smooth scaling without queries.srcsetAn attribute offering the browser several image sizes so it can choose the smallest sufficient one.Touch targetA tappable element, which should be at least about 44×44 CSS pixels with space around it.

## Homework before the next session

Rebuild one page at 360 pixels first

Take a page you built desktop-first and rebuild it mobile-first. Note how much simpler the stylesheet becomes when the phone version is the base.

Find your own breakpoints

Widen a page slowly and record every width where the content breaks. Compare your list with the standard 600/768/1024 and note where they agree.

Convert three sizes to clamp()

Replace three fixed font sizes with clamp() between rem bounds, then resize from 320 to 1600 and confirm the scaling is smooth.

Run a real-phone test

Load a page you built on a phone over mobile data. Time it, tap every link, submit the form, and read body text in daylight. Write down what the dev tools toolbar did not show you.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Foundation | The page works on a phone. | Correct viewport tag, global img max-width rule, and no horizontal scrolling at 360 pixels. |
| Breakpoints | Uses media queries. | Three or four content-driven breakpoints chosen by watching the content break, with min-width queries enhancing a mobile base. |
| Fluid technique | The layout adapts. | Percentages, fr, auto-fit Grid and clamp() used in place of avoidable queries, with vw always bounded by a rem floor. |
| Images | Images display correctly. | Every image compressed and resized to its displayed size, the hero using srcset, and the Network panel confirming the smaller file loads on a narrow screen. |
| Real-device testing | Checked in the device toolbar. | Tested on a real phone over mobile data with load time recorded, every link tapped, the form submitted, and all tap targets at least 44 pixels. |

## Session questionsWhat screen sizes should I actually test?+

360 for a small Android, 390 for an iPhone, 412 for a large Android, 768 for a tablet, and 1280 and above for desktop. Those five cover essentially every visitor, and 360 is the one that matters most because it is the hardest and the most common in Nigeria.Mobile first or desktop first?+

Mobile first, without hesitation. It produces a simpler stylesheet because the phone version needs no overrides, it sends less CSS to the least capable device, and it forces you to decide what is essential. In Nigeria it is also simply where the customers are.How many breakpoints do I need?+

Three or four, chosen where your content breaks — typically around 600, 768 and 1024. Every breakpoint is a set of rules to maintain and test, and a stylesheet with twelve of them is one nobody can reason about.Do I need srcset on every image?+

No. Compressing and resizing every image matters far more and applies to all of them. srcset is worth adding for a genuinely large hero image on a content-heavy page, where serving a smaller file to a phone makes a measurable difference.My client's site is slow on their phone. What do I check first?+

Open the Network panel sorted by size and look at the largest files — it is almost always images. Compress and resize them, then check how many requests the page makes and whether fonts are loading more weights than are used. Those three account for most slow Nigerian business sites.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: Business Website Sections](https://www.cea.ng/classes/web-design/business-website-sections)[Next session 7: Quality: UX, Accessibility & SEO](https://www.cea.ng/classes/web-design/quality-ux-accessibility-seo)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
