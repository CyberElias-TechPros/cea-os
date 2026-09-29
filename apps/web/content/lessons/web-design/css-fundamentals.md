---
title: "Session 3: CSS Fundamentals"
description: "CSS is what makes a page look deliberate. This session covers how CSS is attached and how conflicts resolve, the box model that governs every layout, colour and typography, and the spacing system that separates designed pages from accidental ones."
date: "2026-09-12"
class_slug: "web-design"
---

CSS is what makes a page look deliberate. This session covers how CSS is attached and how conflicts resolve, the box model that governs every layout, colour and typography, and the spacing system that separates designed pages from accidental ones.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Attach CSS three ways and explain when each is appropriate

- Write selectors and predict which rule wins in a conflict

- Apply the box model correctly, including box-sizing

- Use colour deliberately with a palette and accessible contrast

- Set type with a scale, line height and readable line length

- Build a consistent spacing system rather than guessing margins

## The taught content

### Three ways to attach CSS, and the one to use

CSS reaches HTML three ways. **Inline**, in a `style` attribute on an element — useful for nothing except a quick experiment, because it cannot be reused and it is nearly impossible to override later. **Internal**, in a `<style>` block in the head — fine for a single-page experiment. **External**, in a separate `.css` file linked with `<link rel="stylesheet" href="styles.css">` — which is what you will use for everything real.

The external file is not a preference, it is the architecture. One stylesheet can restyle an entire site, so changing the brand colour becomes a one-line edit instead of a hundred; the browser caches it, so every page after the first loads faster; and the separation keeps HTML readable, which matters when you return to a client's site eight months later to change one thing. The convention is one folder with `index.html`, `styles.css` and an `images` folder — simple, obvious, and what every other developer expects.

### Selectors and the cascade

A **selector** picks which elements a rule applies to. The ones you need constantly: an **element** selector (`p`, `h2`) targets all of that type; a **class** selector (`.card`) targets anything carrying `class="card"` and is reusable, which makes it the workhorse; an **id** selector (`#hero`) targets one unique element and should be rare, because it cannot be reused and it is difficult to override; a **descendant** selector (`.card p`) targets paragraphs inside cards; and a **pseudo-class** like `a:hover` targets a state.

When two rules conflict, the **cascade** decides, in this order. **Specificity** first: an id beats a class, a class beats an element, so `#hero { color: red }` defeats `.title { color: blue }` even if the class rule comes later. Where specificity ties, **source order** wins — the later rule beats the earlier one, which is why the order of your stylesheet matters and why a reset or base stylesheet always goes first. Inline styles beat all of those, and `!important` beats everything, which is exactly why you should almost never use it: it does not solve a specificity problem, it buries it, and the next person to edit the file inherits a puzzle.

The practical discipline is to write most rules against classes and keep specificity flat. When you find yourself chaining selectors to win a fight — `.page .section .card p` — that is a signal the stylesheet is disorganised, not that you need a longer selector.

### The box model: the thing everything rests on

Every element on a page is a rectangle, and that rectangle has four layers working outward: the **content**, then **padding** (space inside the element, between content and its edge), then the **border**, then the **margin** (space outside, pushing other elements away). Every layout problem you will ever meet is one of these four being a value you did not expect, which is why the box diagram in dev tools is the first place to look when something is misplaced.

The trap is how width is calculated. By default, `width: 300px` means the content is 300 pixels and padding and border are added on top, so the element actually occupies more than 300 — which is why a 300px box with 20px padding and a 1px border is 342 pixels wide and does not fit where you expected. The fix is one line at the top of every stylesheet: `*, *::before, *::after { box-sizing: border-box; }`. With border-box, the width you declare is the width the element occupies, padding and border included, which makes layout arithmetic behave the way your head expects it to. Write it once and forget it; omit it and lose hours.

Then learn the difference between **block** and **inline** elements, because it governs what you can do to them. A block element — `div`, `p`, `h1` — takes the full available width and starts on a new line, and accepts width, height, margin and padding fully. An inline element — `span`, `a`, `strong` — sits within a line, and width and height are ignored on it. When a width or a margin mysteriously does nothing, the usual reason is that the element is inline.

### Colour, deliberately

Declare colour as **custom properties** at the top of your stylesheet — `:root { --brand: #C2410C; --ink: #1A1A1A; --surface: #FAF7F2; }` — and then use `var(--brand)` everywhere. This is not ceremony. It means the entire site's palette lives in one place, so a rebrand is four lines rather than a search-and-replace across a file, and it makes the palette visible to anyone reading the code. It is also the mechanism behind dark mode and theme switching, should a client ever ask.

Use the palette discipline from Graphic Design: a dominant, a secondary neutral, a text colour and one accent, in roughly 60-30-10 proportions. And check **contrast**, because it is a requirement rather than a preference: body text needs at least 4.5:1 against its background. Low-contrast grey text on white is the most common accessibility failure on Nigerian business sites, and it is invisible to the person who designed it on a calibrated screen in a dim room — which is why you measure it rather than judge it.

Prefer a near-black like `#1A1A1A` over pure `#000000` for text, and an off-white over pure white for large backgrounds. Pure black on pure white creates harsh edges and reads as unrefined; the softened pair looks more considered for exactly the same effort.

### Typography and the spacing system

Type carries more of a page's quality than anything else. Declare a **font stack** rather than a single family — `font-family: 'Inter', system-ui, sans-serif` — so that if the web font fails to load, the system font takes over rather than the browser's default serif. Load web fonts from Google Fonts with a `<link>`, but load **only the weights you use**, because each weight is another file to download and font loading is one of the most common causes of a slow page.

Set a **base size** on `body` — 16px to 18px is right for reading — then size headings from a **scale** using `rem` units, which are relative to that base. A 1.25 ratio from an 18px base gives roughly 22.5, 28 and 35px. Using `rem` rather than `px` means the whole page respects a user who has increased their browser's default text size, which is a real accessibility behaviour and one that `px` silently defeats. Set **line height** around 1.5 for body text and 1.15 for headings, and constrain body copy to roughly 60–75 characters per line with `max-width`, because a line running the full width of a desktop is genuinely hard to read.

Finally, spacing. Do not invent margins element by element — define a scale as custom properties (`--space-1: 0.5rem; --space-2: 1rem; --space-3: 2rem; --space-4: 4rem`) and use only those values. A page whose spacing comes from a scale looks ordered even when nobody can say why; a page whose margins were chosen individually looks arbitrary even when every individual choice was reasonable. This one habit is the largest single visual improvement available to a beginner's work, and it costs nothing.

## Instructor demonstration

The instructor styles the bakery page built in session two from unstyled HTML to a finished design, narrating every decision, then deliberately creates the classic failures and diagnoses each in dev tools.

### Link an external stylesheet

Create styles.css and link it in the head. Show inline and internal alternatives and explain why the external file is the architecture rather than a preference.02

### Set box-sizing first

Write the universal border-box rule and demonstrate the difference by measuring a 300px box with 20px padding before and after. Explain the hours this one line saves.03

### Define the palette as custom properties

Declare brand, ink, surface and accent in :root and apply them with var(). Then change one value and watch the whole page change.04

### Check contrast

Run the text-on-background pair through a contrast checker, compare with 4.5:1, and adjust until it passes. Explain why measuring beats judging on a dim screen.05

### Load fonts properly

Add a Google Fonts link requesting only two weights, declare a font stack with a system fallback, and show what happens when the web font is blocked.06

### Set the type scale in rem

Set an 18px body base and derive heading sizes from a 1.25 ratio. Then increase the browser's default text size and show the page responding.07

### Constrain line length

Add max-width to body copy and show the before and after in readability. Explain that a full-width desktop line is genuinely hard to read.08

### Define the spacing scale

Declare four spacing custom properties and replace every ad-hoc margin with one of them. Show the page becoming visibly ordered with no other change.09

### Style the header and nav

Apply padding, a background and a hover state to links. Explain that a hover state is feedback and its absence makes a page feel broken.10

### Create a specificity conflict

Write two conflicting rules, one by class and one by id, and show which wins and why. Then resolve it by flattening specificity rather than by adding !important.11

### Diagnose a box model surprise

Remove border-box and watch a layout overflow. Use the dev tools box diagram to identify that padding was added outside the declared width.12

### Review the finished page

Compare with the unstyled version, confirm contrast passes, and list what changed. Note that every improvement came from a system rather than a tweak.

## Guided practice

### Style the business page properly

You take the semantic HTML from session two and style it into a finished page using an external stylesheet, custom properties for palette and spacing, a rem-based type scale, verified contrast, and no !important anywhere.

1. 01Create styles.css and link it externally; remove any inline styles from the HTML.

2. 02Write the universal border-box rule at the top of the file.

3. 03Declare the palette in :root as custom properties and apply them with var().

4. 04Check every text-and-background pair against a contrast checker; all must pass 4.5:1.

5. 05Load two font weights from Google Fonts and declare a stack with a system fallback.

6. 06Set an 18px body base and derive all heading sizes in rem from one ratio.

7. 07Set line height to about 1.5 for body and 1.15 for headings.

8. 08Constrain body copy with max-width so lines run 60–75 characters.

9. 09Declare a four-value spacing scale and use only those values for every margin and padding.

10. 10Style the header, nav and footer with padding, background and hover states on links.

11. 11Resolve any conflicting rule by flattening specificity rather than using !important.

12. 12Increase your browser's default text size and confirm the page still works.

The standard we hold you to

An external stylesheet with box-sizing set, palette and spacing held in custom properties, a rem-based type scale with readable line length and line height, all text passing 4.5:1 contrast, no !important anywhere, and the page still legible when the browser's default text size is increased.

## Common mistakes and how to fix them

Your declared width does not match the space the element takes

Fix: Padding and border are added outside the declared width by default. Put `*, *::before, *::after { box-sizing: border-box }` at the top of every stylesheet and the arithmetic behaves as expected.

Your rule is being ignored and you do not know why

Fix: Something more specific is winning — an id beats a class, a class beats an element. Check the Styles panel in dev tools, which shows every matching rule and which one won. Do not reach for !important; flatten the specificity instead.

Your width or margin has no effect

Fix: The element is probably inline. Width and height are ignored on inline elements such as span and a. Change the display or use a block-level element.

You used !important to win a fight

Fix: It buries the problem rather than solving it, and the next person inherits a puzzle. Find the conflicting rule and restructure so specificity is flat.

Your grey text on white is hard to read

Fix: Measure it — body text needs 4.5:1. Darken the text to a near-black and check on a phone in bright light, because a dim room makes low contrast look acceptable.

Your sizes are in px so the page ignores the user's text setting

Fix: Use rem for font sizes, based on a body base size. A user who has increased their browser's default text size is silently defeated by px, which is a real accessibility failure.

Your margins were chosen one at a time and the page looks arbitrary

Fix: Define a spacing scale of four values and use only those. A page whose spacing comes from a scale reads as ordered even when nobody can say why.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Write the border-box rule and the palette custom properties before anything else, in every project. Those two habits remove the most common layout confusion and make every later decision faster, and they cost about six lines.

- Diagnose in the dev tools Styles panel rather than by reading your stylesheet. It lists every rule matching the selected element, in the order the cascade resolved them, with overridden declarations struck through — which answers 'why is this not applying' instantly.

- Load only the font weights you actually use. Each weight is a separate download and font loading is a leading cause of slow pages, particularly on mobile data where a Nigerian visitor will abandon before the fourth file arrives.

- Test the page with your browser's text size increased. It takes five seconds and it verifies that your rem-based scale, line heights and max-widths all still work — which is both an accessibility check and a robustness check on your own layout.

## Key termsExternal stylesheetA separate .css file linked from the head. The architecture that lets one file restyle a whole site.SelectorThe part of a rule choosing which elements it applies to. Classes are the workhorse because they are reusable.SpecificityThe ranking that decides which conflicting rule wins: id beats class, class beats element.CascadeThe resolution order for conflicts — specificity first, then source order. Why stylesheet order matters.Box modelContent, padding, border and margin, outward. Every layout problem is one of these four.box-sizing: border-boxMakes the declared width include padding and border, so layout arithmetic matches expectation.Custom propertyA CSS variable declared in :root and used with var(). Holds the palette and spacing scale in one place.remA unit relative to the browser's base font size. Respects the user's text-size setting, unlike px.

## Homework before the next session

Style one real page

Take the HTML from session two and finish the styling. Check contrast, use only scale values for spacing, and confirm there is no !important in the file.

Read the Styles panel on five elements

On any live site, select five elements and read which rules matched and which won. This is the fastest way to internalise the cascade.

Build a palette and spacing scale

Declare four colours and four spacing values as custom properties for a real brand, and rebuild one page using only those. Note how much faster the decisions become.

Test with increased text size

Increase your browser's default text size two steps and check a page you built. Note anything that overflows or overlaps, and fix it with rem rather than px.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Architecture | Styles appear on the page. | An external stylesheet, box-sizing set universally, and no inline styles left in the HTML. |
| Cascade command | Rules apply as expected. | Can explain which rule wins and why, resolves conflicts by flattening specificity, and uses no !important. |
| Box model | Layout mostly works. | Border-box set, spacing chosen from padding versus margin deliberately, and any overflow diagnosed with the dev tools box diagram. |
| Colour and type | The page is readable. | Palette in custom properties, all text passing 4.5:1, a rem-based scale, line height and max-width set for readability. |
| System | Spacing looks reasonable. | A four-value spacing scale used everywhere, font weights limited to those used, and the page still works with increased browser text size. |

## Session questionsWhy is my CSS not applying at all?+

In order of likelihood: the file is not saved, the link path is wrong, the filename case does not match, or a more specific rule is overriding it. Check the Network panel to confirm the stylesheet actually loaded with a 200 status, then check the Styles panel for what is overriding it.Should I use a framework like Tailwind or Bootstrap?+

Not before you understand plain CSS. A framework hides the box model and the cascade, so when it misbehaves you have nothing to fall back on. Learn the fundamentals here, then pick up a framework quickly — most developers who know the basics learn one in a weekend.What is the difference between padding and margin?+

Padding is space inside an element, between its content and its border — it grows the clickable or coloured area. Margin is space outside, pushing other elements away. If you want a button to feel larger, use padding; if you want space between two sections, use margin.Why does nothing happen when I set a width on a link?+

Links are inline by default and inline elements ignore width and height. Add display: inline-block or display: block, or the width will have no effect. This surprises everyone once.What units should I use?+

rem for font sizes so the page respects the user's text setting, rem or percentages for spacing and widths so layout is flexible, and px only for fine details such as borders and shadows. Avoid px for font sizes — it silently defeats accessibility settings.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: HTML Structure](https://www.cea.ng/classes/web-design/html-structure)[Next session 4: CSS Layout](https://www.cea.ng/classes/web-design/css-layout)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
