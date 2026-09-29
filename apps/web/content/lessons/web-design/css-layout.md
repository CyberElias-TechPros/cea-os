---
title: "Session 4: CSS Layout"
description: "Layout is where CSS either makes sense or fights you. This session covers Flexbox and Grid — what each is for, the properties that actually matter — plus the practical patterns behind every business website: a navigation bar, a card row, a two-column section, a footer, and a hero."
date: "2026-09-12"
class_slug: "web-design"
---

Layout is where CSS either makes sense or fights you. This session covers Flexbox and Grid — what each is for, the properties that actually matter — plus the practical patterns behind every business website: a navigation bar, a card row, a two-column section, a footer, and a hero.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain when to use Flexbox and when to use Grid

- Control direction, alignment, spacing and wrapping with Flexbox

- Build two-dimensional layouts with Grid tracks and areas

- Choose the right tool for a given layout in one decision

- Build the five layout patterns every business site needs

- Debug layout with dev tools rather than by guessing

## The taught content

### The one decision: Flexbox or Grid

The distinction is simple and it resolves almost every layout question. **Flexbox** arranges things in **one dimension** — a row, or a column. It is the right tool when you have a set of items that should sit next to each other, share space, and possibly wrap onto another line: a navigation bar, a row of cards, a group of buttons, a form field with its label. **Grid** arranges things in **two dimensions** — rows and columns at once. It is the right tool when you are placing items into a defined structure: a page layout, a gallery, a dashboard, anything where the position of an item matters relative to both axes.

A useful way to hold it: with Flexbox the **content decides** the layout — items size themselves and share the available space. With Grid the **layout decides** — you define the tracks first and place content into them. That is why a navigation bar is Flexbox, because its items should adapt to their own widths, while a page skeleton is Grid, because the header, sidebar and footer positions are fixed by the design.

They are not competitors and a real page uses both. The overall page structure is Grid; the navigation inside the header is Flexbox; a row of service cards is Grid; the contents of each card are Flexbox. Recognising the nesting is what makes layout stop feeling arbitrary.

### Flexbox: the properties that matter

Set `display: flex` on the container and its direct children become flex items. From there four properties do nearly all the work. **`flex-direction`** sets the axis — `row` is the default, `column` stacks them. **`justify-content`** distributes space along the main axis: `flex-start`, `center`, `flex-end`, `space-between` (first item at the start, last at the end, gaps between) and `space-around`. **`align-items`** aligns across the other axis: `stretch` is the default, `center` vertically centres, which is what you want nine times out of ten. **`gap`** sets space between items, and it has replaced the old habit of adding margins to items — use `gap` and delete the margins.

The property that confuses everyone is the one on the **item**, not the container: `flex`. Shorthand `flex: 1` means 'grow to fill the available space', which is how you make three cards share a row equally. `flex: 2` makes one item take twice the space of its siblings. Without any `flex` value, items size to their content, which is often what you want for a navigation bar and never what you want for a card row.

Add **`flex-wrap: wrap`** when items should drop to a new line rather than squash, which matters for anything containing variable-width content on a narrow screen. And note that the classic trick for perfect vertical and horizontal centreing is now three lines — `display: flex; justify-content: center; align-items: center` — where it used to require a paragraph of hacks. This is the single most useful thing Flexbox gave us.

### Grid: tracks, placement and the patterns

Set `display: grid` on the container, then define the structure. **`grid-template-columns`** lists the column tracks, and the `fr` unit means 'a fraction of the available space' — `grid-template-columns: 1fr 2fr` gives two columns with the second twice as wide. `repeat(3, 1fr)` gives three equal columns, which is the most common thing you will write. **`grid-template-rows`** does the same vertically. `gap` works exactly as it does in Flexbox.

The most valuable modern Grid feature is **`minmax()` combined with `auto-fit`**: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` creates as many columns of at least 260px as will fit, each stretching to share the space, and it reflows automatically as the screen narrows. That single line produces a responsive card grid with **no media queries at all**, and it is the pattern behind most modern card layouts. Learn it and you will use it constantly.

For a whole-page skeleton, **named grid areas** are the clearest approach: define `grid-template-areas` with a little ASCII picture — `"header header" "sidebar main" "footer footer"` — then assign each element a `grid-area`. The layout becomes readable at a glance, which is exactly what a client-facing codebase needs. And for placing a single item, `grid-column: span 2` makes it cross two columns, which is how you build an asymmetric feature section.

### The five patterns every business site needs

**The navigation bar** is Flexbox with `justify-content: space-between` — logo on the left, links on the right — and the links themselves are a Flexbox list with a `gap`. On a phone it collapses, which session six handles. **The hero** is usually a section with a background image, a constrained-width text block, and Flexbox for vertical alignment; the essential detail is `min-height` rather than a fixed height, so it adapts to content instead of clipping it.

**The card row** is Grid with the `auto-fit`/`minmax` pattern, and each card is internally Flexbox in `column` direction with `flex: 1` on the description so the buttons line up along the bottom regardless of how much text each card has — a small trick that makes a set of cards look properly designed rather than accidentally aligned. **The two-column section** is Grid with `grid-template-columns: 1fr 1fr`, or `2fr 1fr` when one side should dominate; it collapses to one column on a phone.

**The footer** is Grid with three or four columns of links, collapsing to one column on a phone. And **the container** — a wrapper class with `max-width` and `margin-inline: auto` plus horizontal padding — is the pattern that keeps content from running edge to edge on a wide desktop while staying readable. Every business site you build will use that container class dozens of times, so define it once, early.

### Debugging layout without guessing

Layout debugging is a skill with a method, and the method is: **look before you change**. Select the misbehaving element in dev tools and the box diagram shows its content, padding, border and margin sizes; if it has a Flex or Grid parent, dev tools draws the container's structure and shows how space was distributed. Reading that for ten seconds usually identifies the problem, whereas editing values at random can take an hour and still leave you not knowing why it works.

The common causes are a short list. **An overflow** is usually a child wider than its parent, or a missing `box-sizing: border-box`, or an image at its natural size rather than `max-width: 100%`. **Vertical alignment not working** is usually `align-items` on the wrong axis, or the parent has no height to align within. **Items squashed rather than wrapping** means `flex-wrap: wrap` is missing. **A Grid item in the wrong place** means the track definition and the placement disagree. And **a margin that appears to do nothing** is usually margin collapsing between adjacent block elements.

The professional habit is the temporary outline: add `* { outline: 1px solid red }` while diagnosing. It shows every box's boundary instantly and makes the invisible structure visible. It looks crude and it is faster than any amount of squinting. Remove it before delivery — and this is the reason to keep it out of the committed file, because a red-outlined page in front of a client is not a good look.

## Instructor demonstration

The instructor builds all five business layout patterns live on the bakery page, choosing the tool out loud for each, then breaks each one and diagnoses it with dev tools rather than by guessing.

### Define the container class first

Write a container with max-width, auto inline margins and horizontal padding. Explain that this one class keeps content readable on a wide desktop and is used dozens of times per site.02

### Build the nav with Flexbox

Use display flex with justify-content: space-between for logo and links, and gap on the link list. Explain why Flexbox rather than Grid — the items should size to their content.03

### Build the hero

Use a section with a background image, min-height rather than height, and Flexbox for vertical centring. Show what a fixed height does when the text wraps on a narrow screen.04

### Build the card row with Grid

Write repeat(auto-fit, minmax(260px, 1fr)) and resize the window to show it reflowing with no media queries. Explain that this one line is most modern card grids.05

### Align the card contents

Make each card Flexbox column with flex: 1 on the description so buttons line up along the bottom. Show the before, where differing text lengths leave ragged buttons.06

### Build a two-column section

Use grid-template-columns: 1fr 1fr for equal halves, then change to 2fr 1fr to show one side dominating. Explain that this collapses to one column on a phone.07

### Build the page skeleton with named areas

Define grid-template-areas as an ASCII picture and assign each element a grid-area. Show how readable the layout becomes at a glance.08

### Build the footer grid

Use three columns of links with gap, and note that it will collapse to one column on a phone.09

### Break the layout and read the box diagram

Remove border-box and show the overflow. Diagnose it in the dev tools box diagram rather than by editing values.10

### Diagnose a squashed row

Narrow the window until the nav squashes, identify the missing flex-wrap: wrap, and add it.11

### Use the temporary outline

Add a universal red outline to reveal every box boundary, find the misplaced Grid item, and remove the outline afterwards.12

### Review the five patterns

List the tool used for each and why. Emphasise that a real page nests both: Grid for structure, Flexbox for contents.

## Guided practice

### Build the five patterns, then break and fix them

You build a navigation bar, a hero, a card row, a two-column section and a footer using the correct tool for each, then deliberately break each one and diagnose it with dev tools rather than by editing at random.

1. 01Define a reusable container class with max-width, centred margins and horizontal padding.

2. 02Build the nav with Flexbox, space-between, and gap on the link list.

3. 03Build the hero with min-height and Flexbox vertical centring.

4. 04Build the card row with Grid using repeat(auto-fit, minmax(260px, 1fr)).

5. 05Make each card a Flexbox column with flex: 1 on the description so buttons align along the bottom.

6. 06Build a two-column section at 1fr 1fr, then change it to 2fr 1fr and note the difference.

7. 07Build a page skeleton using named grid areas.

8. 08Build a three-column footer with gap.

9. 09Remove box-sizing and diagnose the resulting overflow with the dev tools box diagram.

10. 10Narrow the window until the nav squashes, identify the missing flex-wrap, and add it.

11. 11Use a temporary universal outline to find a misplaced Grid item, then remove the outline.

12. 12Write one line for each pattern stating which tool you chose and why.

The standard we hold you to

All five patterns built with the correct tool and a written justification for each choice, cards with aligned bottoms, the auto-fit card grid reflowing without media queries, and every deliberately broken layout diagnosed by reading dev tools rather than by trial and error.

## Common mistakes and how to fix them

You used Grid for a navigation bar

Fix: Use Flexbox. Nav items should size to their own content and share space, which is content-driven layout. Grid is for placing items into a defined structure.

You added margins to items instead of using gap

Fix: Use gap on the container. Margins on items create uneven outer spacing that you then have to correct, and gap handles the between-space correctly in both Flexbox and Grid.

Your items squash instead of wrapping on a narrow screen

Fix: Add flex-wrap: wrap. Without it, flex items shrink to fit rather than dropping to a new line, which produces unreadably narrow items.

Your card buttons do not line up

Fix: Make each card Flexbox column and put flex: 1 on the description. That pushes the button to the bottom of the tallest card's height, which is what makes a card set look designed.

You are editing values at random until it looks right

Fix: Read the dev tools box diagram and the Flex or Grid container visualisation first. Ten seconds of looking beats an hour of guessing, and you will actually know why the fix works.

You left the red debug outline in the delivered file

Fix: Remove it before delivery. The universal outline is a diagnostic aid, and a red-outlined page in front of a client is not the impression you want to leave.

Your hero clips its text on a phone

Fix: You used a fixed height. Use min-height so the section grows with its content instead of clipping it.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Learn `repeat(auto-fit, minmax(260px, 1fr))` as a single memorised phrase. It produces a responsive card grid with no media queries, and once it is reflex you will reach for it in almost every project.

- Nest deliberately: Grid for the page structure, Flexbox for the contents of each region. Most layout confusion comes from trying to do both jobs with one tool, and recognising the nesting makes complex pages straightforward.

- Keep a snippets file of the five patterns. Copying a known-good nav or card row is faster and more reliable than rewriting it, and consistency across client sites is itself a professional signal.

- Diagnose with the temporary universal outline whenever a layout is genuinely puzzling. Seeing every box boundary at once resolves in seconds what squinting at a rendered page cannot, and it is the fastest habit in this session to acquire.

## Key termsFlexboxOne-dimensional layout — a row or a column — where content decides how space is shared.GridTwo-dimensional layout — rows and columns together — where the defined structure decides placement.fr unitA fraction of available space in Grid. 1fr 2fr gives two columns with the second twice as wide.auto-fit with minmaxThe pattern repeat(auto-fit, minmax(260px, 1fr)) creating as many columns as fit, reflowing with no media queries.justify-contentDistribution along the main axis in Flexbox. space-between is the workhorse for nav bars.align-itemsAlignment across the other axis. center gives the vertical centring that used to require hacks.gapSpace between items, set on the container. Replaces the habit of adding margins to items.Grid areasNamed regions defined as an ASCII picture in grid-template-areas, making a page skeleton readable at a glance.

## Homework before the next session

Build the five patterns from scratch

Nav, hero, card row, two-column section, footer — each with the correct tool and one line saying why. Save them as a snippets file you will reuse.

Master one Flexbox property a day

justify-content, align-items, flex-wrap, gap, flex. Build a small example for each and note what it changes.

Rebuild one layout you admire

Inspect a real site's layout in dev tools, identify whether it is Flexbox or Grid, and rebuild one section from what you find.

Diagnose three broken layouts

Deliberately break three of your layouts, then fix each by reading dev tools first and writing down the cause before changing anything.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Tool choice | Uses Flexbox or Grid. | Chooses correctly for each of the five patterns and can state in one line why, including where both are nested. |
| Flexbox command | Can lay items in a row. | Controls direction, justify-content, align-items, gap and wrap fluently, and uses flex on items to distribute space. |
| Grid command | Can make columns. | Uses fr tracks, repeat with auto-fit and minmax for a reflowing card grid, and named areas for a page skeleton. |
| Patterns | Produces most of the five. | All five built to a professional standard, including cards with aligned bottoms and a hero using min-height. |
| Debugging | Fixes layout problems eventually. | Diagnoses by reading the box diagram and container visualisation first, states the cause before changing anything, and uses the outline technique. |

## Session questionsFlexbox or Grid — which should I learn first?+

Flexbox, because it is simpler and it covers the most common cases: navigation bars, card rows, centring. Grid becomes necessary once you need two-dimensional placement or a page skeleton. In practice a finished page uses both, nested.Do I still need floats?+

No. Floats were a layout workaround from before Flexbox and Grid existed, and they cause clearing problems that cost beginners hours. Use them only for their original purpose — text wrapping around an image.How do I centre something both ways?+

display: flex with justify-content: center and align-items: center on the parent. That is the whole answer now. Older methods involving margins and transforms still work but are unnecessary.What is minmax actually doing?+

It sets a minimum and a maximum track size. In minmax(260px, 1fr), a column is never narrower than 260px but will grow to share available space. Combined with auto-fit, the browser fits as many as it can and they reflow as the screen narrows.My Grid items are in the wrong cells. Why?+

The track definition and the placement disagree. Check grid-template-columns against what you are asking items to span, and use the dev tools Grid overlay to see the actual tracks drawn on the page.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: CSS Fundamentals](https://www.cea.ng/classes/web-design/css-fundamentals)[Next session 5: Business Website Sections](https://www.cea.ng/classes/web-design/business-website-sections)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
