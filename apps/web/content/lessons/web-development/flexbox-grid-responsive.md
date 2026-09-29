---
title: "Session 4: Flexbox, Grid & Responsive Layout"
description: "Layout is arranging boxes, and Flexbox and Grid are the two tools that finally made it reliable. This session covers both, positioning, media queries, and transitions — then a project that holds together from a phone to a desktop."
date: "2026-09-12"
class_slug: "web-development"
---

Layout is arranging boxes, and Flexbox and Grid are the two tools that finally made it reliable. This session covers both, positioning, media queries, and transitions — then a project that holds together from a phone to a desktop.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Choose between Flexbox and Grid for a given layout

- Control alignment and distribution on both axes

- Use positioning deliberately and understand stacking

- Build layouts that adapt with media queries

- Add transitions that help rather than distract

- Build a responsive website that works at every width

## The taught content

### Flexbox: one dimension

Flexbox arranges items along **one axis** — a row or a column — and it is the right tool when you are lining things up: a navigation bar, a row of cards, a centred element. Set `display: flex` on the parent and the children become flex items that can be aligned and distributed.

The two properties that do most of the work are `justify-content` and `align-items`. **`justify-content` distributes along the main axis** — `space-between` pushes items to the edges with gaps between, `center` groups them in the middle. **`align-items` aligns across the other axis** — `center` is what actually centres something vertically, which was genuinely difficult before Flexbox existed.

Then **`flex-wrap`**, which beginners omit and then wonder why their row overflows on a phone. By default flex items refuse to wrap and squeeze instead, producing unreadably narrow columns. Setting `flex-wrap: wrap` lets items drop to the next line when there is not room, and combined with a sensible `flex-basis` it produces a layout that reflows naturally without a single media query.

### Grid: two dimensions

CSS Grid arranges items along **both axes at once** — rows and columns together — and it is the right tool for page-level layout and anything resembling a table of content. Set `display: grid` on the parent, define the columns, and place items into cells.

The most useful modern feature is **`repeat(auto-fit, minmax(250px, 1fr))`**, which creates as many columns as will fit at a minimum of 250px each and lets them share the remaining space. That single line produces a card grid that goes from four columns on a desktop to one on a phone **with no media query at all**, which is one of the best value-for-effort lines in CSS.

Then **`gap`**, which sets the space between grid items and replaces the old hack of margins that always broke at the edges. And **named areas** — `grid-template-areas` — which let you describe a page layout in something close to a picture, making the code readable and the layout easy to rearrange at different widths.

### Choosing between them

The rule is short: **Flexbox for one dimension, Grid for two**. A row of navigation links is one dimension — Flexbox. A page with a header, sidebar, main area and footer is two — Grid. A card that has an image on top and text below with the button pushed to the bottom is one dimension — Flexbox, with `margin-top: auto` on the button.

They are not competitors and the best layouts use both: **Grid for the page structure and Flexbox for the components inside it**. A grid cell containing a flex row is completely normal and usually the cleanest way to build something.

Then the thing to avoid: **forcing the wrong tool**. Using Grid for a single row of buttons works but is more machinery than needed; using nested Flexbox to build a two-dimensional page layout produces markup that is hard to read and hard to change. When a layout feels like it is fighting you, the usual cause is using a one-dimensional tool for a two-dimensional problem.

### Positioning

**`static`** is the default — the element sits where the document flow puts it. **`relative`** keeps it in the flow but lets you nudge it, and, importantly, makes it a reference point for absolutely positioned children. **`absolute`** takes it out of the flow entirely and positions it against the nearest positioned ancestor, which is why a parent often needs `position: relative` for no other reason.

**`fixed`** pins an element to the viewport — a sticky header, a floating button — and **`sticky`** behaves as relative until it reaches a threshold and then sticks, which is what modern sticky headers use and is far simpler than the JavaScript that used to be required.

Then **stacking**. Elements later in the document paint on top of earlier ones, and `z-index` changes that — but **only on positioned elements**, which is the source of endless confusion when a z-index appears to be ignored. Set a position first. And keep z-index values low and deliberate; a stylesheet with values in the thousands means someone was fighting rather than designing.

### Responsive layout, media queries and transitions

Responsive design means **one page that works at every width**, and it starts before any media query. The **viewport meta tag** — `<meta name="viewport" content="width=device-width, initial-scale=1">` — is required, because without it a phone renders the page at desktop width and scales it down to illegibility. Then **fluid sizing**: percentages and `fr` units rather than fixed pixels, and `max-width` on containers so text does not stretch across a wide screen.

**Media queries** apply styles at particular widths, and the discipline is to **design mobile-first**: write the base styles for a narrow screen, then add rules inside `min-width` queries as space allows. This produces less CSS than starting at desktop and undoing it, and it means the simplest experience is the default rather than something you patch in later. Breakpoints should come from **where your content breaks**, not from the widths of particular devices.

Then **transitions**, which make changes feel intentional rather than abrupt. `transition: background-color 0.2s ease` on a button makes a hover feel responsive. Three rules keep them useful: keep them **short** — 150 to 300 milliseconds, because anything longer feels sluggish; animate only **cheap properties** like colour, opacity and transform, since animating width or height forces the browser to recalculate layout on every frame; and **respect `prefers-reduced-motion`**, because some people are made genuinely unwell by animation and a media query can switch it off for them.

## Instructor demonstration

The instructor builds one page from a phone width upward: a Flexbox navigation, a Grid card layout using auto-fit minmax so it reflows with no media query, a positioned sticky header with correct z-index, then mobile-first media queries added only where the content breaks, and a transition that respects reduced motion.

### Set the viewport meta tag

Add it and reload on a phone emulator with and without. Show the page rendered at desktop width and scaled to illegibility without it.02

### Start at phone width

Open the browser at 375px and design from there. Explain that mobile-first produces less CSS and makes the simple experience the default.03

### Build the nav with Flexbox

Use display flex with justify-content space-between and align-items center. Explain that align-items center is what vertically centres, which was hard before Flexbox.04

### Add flex-wrap

Narrow the window and show the items squeezing instead of wrapping. Add flex-wrap: wrap and show them drop to a new line.05

### Build the card grid

Use repeat(auto-fit, minmax(250px, 1fr)) and resize the window. Show the columns going from four to one with no media query at all.06

### Add gap

Set gap on the grid and contrast it with the old margin approach that broke at the edges.07

### Push a button to the bottom of a card

Use Flexbox column with margin-top auto. Explain that this is the standard solution and needs no absolute positioning.08

### Explain why z-index was ignored

Show a z-index doing nothing on a static element, then set position and show it work. Explain that z-index only applies to positioned elements.09

### Build a sticky header

Use position sticky with a threshold. Explain that this replaces the JavaScript that used to be required for the same effect.10

### Add a media query only where needed

Resize until something actually breaks, then add a min-width query for that. Explain that breakpoints come from the content, not from device widths.11

### Add a transition

Transition background-color over 0.2s on a button. Explain that 150 to 300 milliseconds is the range that feels responsive without feeling slow.12

### Animate the cheap properties only

Contrast transitioning transform with transitioning width. Explain that animating width forces layout recalculation on every frame.13

### Respect reduced motion

Add a prefers-reduced-motion query switching transitions off. Explain that some people are genuinely made unwell by animation.

## Guided practice

### Project: responsive website

You build a complete website that works from 320px to desktop: a viewport meta tag, a Flexbox navigation with flex-wrap, a Grid card layout using auto-fit minmax so it reflows without media queries, positioning used deliberately with correct z-index, mobile-first media queries added only where the content breaks, and transitions that are short, cheap and respect reduced motion.

1. 01Add the viewport meta tag to every page.

2. 02Open the browser at 320px and design from that width upward.

3. 03Use fluid units and max-width on containers rather than fixed pixel widths.

4. 04Build the navigation with Flexbox, justify-content and align-items.

5. 05Add flex-wrap so the navigation reflows instead of squeezing.

6. 06Build the card layout with Grid using repeat(auto-fit, minmax(250px, 1fr)).

7. 07Use gap for spacing between grid items rather than margins.

8. 08Use Flexbox inside a card, with margin-top auto to push the last element down.

9. 09Use Grid for the page structure and Flexbox for the components within it.

10. 10Set position on any element before relying on z-index.

11. 11Keep z-index values low and deliberate.

12. 12Use position sticky for any header that should stick.

13. 13Resize slowly and note exactly where the content breaks.

14. 14Add a min-width media query only at each genuine break point.

15. 15Add transitions of 150 to 300 milliseconds on interactive elements.

16. 16Animate only colour, opacity and transform.

17. 17Add a prefers-reduced-motion query that switches animation off.

18. 18Test at 320px, 375px, 768px, 1024px and 1440px and fix each failure.

The standard we hold you to

A site with the viewport meta tag on every page, designed from 320px upward using fluid units and container max-widths, a Flexbox navigation with flex-wrap, a Grid card layout using auto-fit minmax that reflows with no media query, gap used for grid spacing, Flexbox used inside cards with margin-top auto, Grid for page structure and Flexbox for components, position set before any z-index with low deliberate values, sticky positioning for any sticky header, min-width media queries added only at genuine content breaks, transitions of 150 to 300 milliseconds animating only colour, opacity and transform, a prefers-reduced-motion query, and all five test widths passing.

## Common mistakes and how to fix them

Your flex row squeezes instead of wrapping on a phone

Fix: Add flex-wrap: wrap. Flex items refuse to wrap by default and squeeze instead, producing unreadably narrow columns — this is the most commonly omitted Flexbox property.

You wrote a media query for a layout Grid already handles

Fix: Use repeat(auto-fit, minmax(250px, 1fr)). It produces a card grid that reflows from four columns to one with no media query at all.

You used nested Flexbox for a page layout

Fix: Use Grid for two dimensions. Forcing a one-dimensional tool into a two-dimensional problem produces markup that is hard to read and hard to change.

Your z-index is being ignored

Fix: Set position on the element first. z-index only applies to positioned elements, which is the source of endless confusion when it appears to do nothing.

Your page renders tiny on a phone

Fix: Add the viewport meta tag. Without it the phone renders at desktop width and scales down to illegibility, and no amount of CSS fixes it.

You designed at desktop width and patched it down

Fix: Design mobile-first and add min-width queries as space allows. It produces less CSS and makes the simple experience the default rather than an afterthought.

You picked breakpoints from device widths

Fix: Add a query where your content actually breaks. Device-specific breakpoints age badly and miss the widths in between.

Your transitions are long or animate layout properties

Fix: Keep them to 150 to 300 milliseconds and animate only colour, opacity and transform. Animating width or height forces layout recalculation on every frame, and respect prefers-reduced-motion.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Use repeat(auto-fit, minmax(250px, 1fr)) for card grids. It reflows from four columns to one with no media query at all, which is the best value-for-effort line in responsive CSS.

- Add flex-wrap: wrap whenever you use Flexbox for a row that might get crowded. Flex items squeeze rather than wrap by default, and this single omission is behind most broken mobile navigation bars.

- Design mobile-first and add min-width queries where the content actually breaks. It produces less CSS than starting at desktop and undoing it, and your breakpoints stay meaningful as devices change.

- Keep transitions between 150 and 300 milliseconds, animate only colour, opacity and transform, and respect prefers-reduced-motion. Longer feels sluggish, animating layout properties is expensive, and some people are genuinely made unwell by motion.

## Key termsFlexboxOne-dimensional layout along a row or column. The right tool for lining things up.GridTwo-dimensional layout in rows and columns. The right tool for page structure and card grids.auto-fit minmaxA Grid column definition creating as many columns as fit at a minimum width. Reflows with no media query.gapSpace between flex or grid items. Replaces the margin hack that broke at the edges.Positioned elementOne with position other than static. Required before z-index has any effect.Mobile-firstWriting base styles for narrow screens and adding min-width queries. Produces less CSS and a simpler default.BreakpointThe width where your content breaks. Derived from the content, not from device specifications.prefers-reduced-motionA media query for users who need less animation. Some people are genuinely made unwell by motion.

## Homework before the next session

Build one auto-fit card grid

With repeat(auto-fit, minmax(250px, 1fr)) and gap. Resize the window from 320px to 1440px and confirm it reflows with no media query.

Fix a Flexbox row that squeezes

Add flex-wrap: wrap and a sensible flex-basis, then narrow the window until items drop to a new line rather than becoming unreadably narrow.

Rebuild one layout mobile-first

Take something you built at desktop width and rewrite it starting at 320px, adding min-width queries only where the content breaks. Compare the amount of CSS.

Audit your transitions

Check every transition is 150 to 300 milliseconds and animates only colour, opacity or transform. Then add a prefers-reduced-motion query that switches them off.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Layout tool choice | Uses Flexbox or Grid. | Grid for page structure and two-dimensional layouts, Flexbox for components and single dimensions, with both used together where that is cleanest. |
| Alignment and flow | Things line up. | justify-content and align-items used deliberately, flex-wrap set so rows reflow rather than squeeze, and gap used for spacing instead of margins. |
| Positioning | Moves elements. | The four position values understood, position set before relying on z-index, low deliberate z-index values, and sticky used instead of JavaScript. |
| Responsive behaviour | Works on a phone. | Viewport meta tag present, designed mobile-first from 320px, auto-fit minmax used so grids reflow without queries, and media queries added only at genuine content breaks. |
| Motion | Has some animation. | Transitions of 150 to 300 milliseconds animating only colour, opacity and transform, with a prefers-reduced-motion query switching motion off. |

## Session questionsWhen should I use Flexbox and when Grid?+

Flexbox for one dimension — a row of links, a row of cards, centring something. Grid for two — page structure, anything like a table of content. The best layouts use both: Grid for the page and Flexbox for the components inside it.Why are my flex items squashed on mobile?+

Because flex items do not wrap by default — they squeeze instead. Add flex-wrap: wrap and a sensible flex-basis, and they will drop to a new line when there is not room rather than becoming unreadably narrow.Do I need media queries for a card grid?+

Usually not. repeat(auto-fit, minmax(250px, 1fr)) creates as many columns as fit at a minimum of 250px and lets them share the remaining space, so the grid goes from four columns to one with no media query at all.Why is my z-index not working?+

Because z-index only applies to positioned elements. Set position: relative, absolute, fixed or sticky on the element first, and keep the values low and deliberate — a stylesheet with values in the thousands means someone was fighting rather than designing.What breakpoints should I use?+

The widths where your content actually breaks, not the widths of particular devices. Resize slowly and add a min-width query at each genuine break. Device-specific breakpoints age badly and miss everything in between.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: CSS Box Model & Typography](https://www.cea.ng/classes/web-development/css-box-model-typography)[Next session 5: JavaScript Basics](https://www.cea.ng/classes/web-development/javascript-basics)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
