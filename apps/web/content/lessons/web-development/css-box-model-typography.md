---
title: "Session 3: CSS Box Model & Typography"
description: "CSS is how a page looks, and almost every layout confusion comes from not understanding the box model. This session covers selectors, classes and IDs, how boxes actually size, typography that is readable, and colour used with intent."
date: "2026-09-12"
class_slug: "web-development"
---

CSS is how a page looks, and almost every layout confusion comes from not understanding the box model. This session covers selectors, classes and IDs, how boxes actually size, typography that is readable, and colour used with intent.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Select elements precisely with selectors, classes and IDs

- Explain the box model and control it deliberately

- Understand why box-sizing matters and set it once

- Choose and pair type that is readable on a phone

- Use colour with contrast and purpose

- Build a styled page that holds together at any width

## The taught content

### Selectors, classes and IDs

A CSS rule has two parts: a **selector** saying what to style, and **declarations** saying how. `h2 { color: navy; }` selects every `<h2>` and sets its colour. The element selector is the bluntest tool available — it styles every instance — which is why **classes** exist: `<p class="intro">` and `.intro { … }` style only the paragraphs you marked.

The rule for choosing is straightforward. **Use a class for anything you style more than once or might want to style differently later**, which is most things. **Use an ID for something genuinely unique** — and be aware that an ID carries more weight than a class, so it is harder to override later, which is why IDs are better used for JavaScript hooks and page anchors than for styling. **Use an element selector for defaults** that should apply everywhere, like body font or heading colour.

Then **specificity**, which decides what wins when two rules conflict. Roughly, an ID beats a class, a class beats an element, and among equals the later rule wins. Most 'why is my CSS not working' problems are specificity problems, and the wrong fix is adding `!important` — which wins today and creates a rule you cannot override tomorrow. The right fix is a simpler, more specific selector.

### The box model

Every element on a page is a **rectangular box**, and the box has four layers: the **content**, then **padding** (space inside the box, between the content and its edge), then the **border**, then **margin** (space outside the box, between it and its neighbours). Understanding those four is most of CSS layout, because everything else is arranging boxes.

The part that confuses everyone is **what `width` means**. By default, `width: 200px` sets the width of the **content only** — add padding and a border and the element becomes visibly wider than 200px. So a 200px box with 20px of padding and a 1px border is 242px across, which breaks layouts in ways that seem arbitrary until you know this.

The fix is one line, and it should be at the top of every stylesheet: `*, *::before, *::after { box-sizing: border-box; }`. This makes `width` mean the **whole box**, padding and border included, which is what everyone expects and what makes layouts predictable. Setting it once removes an entire category of confusion, and virtually every modern project does it.

### Display, flow and spacing

Elements are either **block** — they take a full line and stack vertically, like `<p>` and `<div>` — or **inline** — they sit within a line and only take the width of their content, like `<a>` and `<strong>`. This is why margin-top does nothing useful on an inline element, and why setting a width on one appears to be ignored. Knowing which is which explains a great deal of otherwise mysterious behaviour.

Then **margin collapsing**, the behaviour that surprises everyone first. When two vertical margins meet — the bottom of one block and the top of the next — they do not add up; the **larger one wins**. So a paragraph with 20px below followed by one with 30px above has 30px between them, not 50px. It is not a bug, and knowing it prevents a great deal of confused spacing adjustment.

Spacing itself is a design decision more than a technical one. **Consistency reads as deliberate**: pick a small scale — 4, 8, 16, 24, 32, 48 pixels — and use only those values. Random spacing looks untidy even when nobody can say why. And **space things by relationship**: elements that belong together sit closer than elements that do not, which is how a reader understands grouping without being told.

### Typography

Typography is most of what makes a page feel professional, and it comes down to four decisions. **Size**: body text at 16px or larger — anything smaller is hard to read on a phone, which is where most people will read it. **Line height**: about 1.5 times the font size for body text, because cramped lines are tiring and loose lines lose the thread. **Line length**: roughly 45 to 75 characters, which is why a full-width paragraph on a wide screen is unpleasant to read.

Then **font choice**. Use a system font stack or one well-made web font, and load no more than two families, because each one is a file someone has to download on a slow connection — a real cost here. A stack like `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` renders instantly with no download and looks good everywhere, which is usually the right answer for a small project.

And **hierarchy through contrast, not variety**. A page needs a clear order of importance — heading sizes, weights and spacing doing the work — rather than five different fonts at similar sizes. Set headings in relative units (`em` or `rem`) so they scale with the base size, and never set text below about 14px for anything anyone needs to read.

### Colour

Colour needs three things: a **limited palette**, **sufficient contrast**, and **a job**. A palette of two or three colours plus neutrals looks deliberate; a page with eight accent colours looks accidental. Define them once as **CSS custom properties** — `--brand: #0b6b3a;` — so changing the palette later is one edit rather than a search through the whole stylesheet.

**Contrast is a requirement, not a preference.** Body text needs at least 4.5:1 against its background. Light grey on white fails badly and is the single most common reason a site that looks elegant is genuinely hard to read — for people with low vision, and for anyone on a phone in daylight, which describes most of Nigeria.

Then **never rely on colour alone to carry meaning**, and use colour consistently: one colour for primary actions, one for errors, one for success, applied the same way everywhere. A user learns your colour language in a few seconds, and inconsistent use breaks it. Also remember that roughly one in twelve men has some colour vision deficiency, so red-versus-green distinctions — the classic error-and-success pairing — need a text or icon indicator alongside them.

## Instructor demonstration

The instructor styles a plain semantic page from unstyled to finished, demonstrating specificity conflicts and their correct fix, proving the box model with and without border-box, showing margin collapsing live, and building a type scale and palette that hold up at phone width.

### Start from unstyled markup

Open the semantic page with no CSS. Explain that structure comes first and styling is applied to meaning that already exists.02

### Set base styles with an element selector

Style body and headings. Explain that element selectors are for defaults that should apply everywhere.03

### Add a class for one paragraph

Style only the marked paragraphs. Explain that classes exist because element selectors are too blunt for anything selective.04

### Create a specificity conflict

Write two conflicting rules and show which wins. Explain the rough order — ID, class, element, then source order.05

### Fix it properly

Replace the tempting !important with a simpler, more specific selector. Explain that !important wins today and creates a rule you cannot override tomorrow.06

### Prove the box model

Set width 200px with 20px padding and a border, then measure the rendered box. Show it is 242px and explain why layouts break.07

### Apply border-box globally

Add the universal box-sizing rule and re-measure. Explain that this makes width mean the whole box, which is what everyone expects.08

### Show block versus inline

Try margin-top and width on an inline element. Explain that both appear to be ignored, and why knowing the display type explains it.09

### Demonstrate margin collapsing

Set 20px below one paragraph and 30px above the next, then measure the gap. Show it is 30px, not 50px, and explain that the larger margin wins.10

### Build a spacing scale

Define 4, 8, 16, 24, 32, 48 and use only those. Explain that consistent spacing reads as deliberate while random spacing looks untidy.11

### Set the type scale

Set body at 16px with 1.5 line height and constrain the line length. Explain that full-width paragraphs on a wide screen are genuinely unpleasant to read.12

### Choose the font stack

Use a system stack with no download. Explain that each web font is a file someone loads on a slow connection, which matters here.13

### Define the palette as variables

Set custom properties and apply them. Explain that changing the palette later becomes one edit rather than a search through the stylesheet.14

### Check contrast and colour-only meaning

Measure the actual ratios and add a text indicator where colour alone carries meaning. Explain that roughly one in twelve men has colour vision deficiency.

## Guided practice

### Style a page with a deliberate system

You take a semantic page and style it with a system rather than ad-hoc rules: border-box set globally, a spacing scale used consistently, a type scale readable at phone width, a palette defined as custom properties with measured contrast, and no specificity conflicts resolved with !important.

1. 01Start from semantic markup with no styling applied.

2. 02Add the universal box-sizing: border-box rule at the top.

3. 03Set base element styles for body and headings as defaults.

4. 04Use classes for anything styled more than once.

5. 05Reserve IDs for JavaScript hooks and anchors rather than styling.

6. 06Resolve any conflicting rule with a better selector, never !important.

7. 07Define a spacing scale of 4, 8, 16, 24, 32, 48 and use only those values.

8. 08Space elements by relationship: related things closer together.

9. 09Set body text at 16px or larger.

10. 10Set line height to about 1.5 for body text.

11. 11Constrain the line length to roughly 45 to 75 characters.

12. 12Use a system font stack or at most two web font families.

13. 13Set headings in em or rem so they scale with the base size.

14. 14Define two or three palette colours as CSS custom properties.

15. 15Measure the contrast of every text and background pair against 4.5:1.

16. 16Add a text or icon indicator anywhere colour alone carries meaning.

17. 17Check the page at phone width and confirm the type is still readable.

The standard we hold you to

A styled semantic page with box-sizing: border-box set globally, element selectors used for defaults and classes for anything repeated, IDs reserved for hooks rather than styling, every specificity conflict resolved with a better selector and no !important anywhere, a spacing scale of 4/8/16/24/32/48 used exclusively with related elements closer together, body text at 16px or larger with 1.5 line height and a constrained line length, a system stack or at most two font families with headings in relative units, a two or three colour palette defined as custom properties, every text pair measured at 4.5:1 or better, text or icon indicators wherever colour alone carries meaning, and readability confirmed at phone width.

## Common mistakes and how to fix them

Your layouts break when you add padding

Fix: Set *, *::before, *::after { box-sizing: border-box; } at the top of the stylesheet. Without it, width means content only, so padding and borders make elements wider than you asked for.

You reach for !important when a rule will not apply

Fix: Find the specificity conflict and write a better selector. !important wins today and creates a rule you cannot override tomorrow, which is how stylesheets become unmaintainable.

You use IDs for styling

Fix: Use classes. An ID outweighs a class and is harder to override later, so IDs are better reserved for JavaScript hooks and page anchors.

You cannot work out why two margins do not add up

Fix: Vertical margins collapse — the larger one wins. A 20px bottom margin against a 30px top margin gives a 30px gap, not 50px, and this is intended behaviour rather than a bug.

Your width and margin do nothing on an element

Fix: Check its display type. Inline elements ignore width and vertical margin, so set display to block or inline-block if you need box behaviour.

Your body text is smaller than 16px

Fix: Set it to 16px or larger with about 1.5 line height. Smaller text is hard to read on a phone, which is where most people will read your page.

You load several web fonts

Fix: Use a system font stack or at most two families. Each font is a file someone downloads on a slow connection, which is a real cost for most users here.

Your colour choices fail contrast

Fix: Measure every text and background pair against 4.5:1. Light grey on white looks elegant and is genuinely hard to read, particularly on a phone in daylight.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Put box-sizing: border-box at the top of every stylesheet. It makes width mean the whole box including padding and border, which is what everyone expects, and it removes an entire category of layout confusion for one line of CSS.

- Resolve specificity conflicts with a better selector, never with !important. !important wins today and creates a rule you cannot override tomorrow, which is the most common way a stylesheet becomes unmaintainable.

- Pick a spacing scale and use only those values. Consistent spacing reads as deliberate design while random values look untidy, and nobody can articulate why — but everybody can see it.

- Measure contrast on your actual colours rather than assuming. Light grey on white is an extremely common aesthetic choice that fails the 4.5:1 requirement badly, and it is unreadable for people with low vision and for anyone on a phone in bright sunlight.

## Key termsSelectorThe part of a rule choosing what to style. Element, class or ID, in increasing specificity.SpecificityWhat decides which rule wins a conflict. ID beats class, class beats element, then source order.Box modelContent, padding, border and margin. Every element is a box made of those four layers.box-sizing: border-boxMakes width include padding and border. One line that makes layouts predictable.Margin collapsingAdjacent vertical margins where the larger wins rather than adding up. Intended behaviour.Display typeBlock stacks and takes a full line; inline flows within a line and ignores width and vertical margin.Custom propertyA CSS variable such as --brand. Changing the palette becomes one edit instead of a search.Type scaleThe set of font sizes used, in relative units. Hierarchy comes from contrast, not variety.

## Homework before the next session

Set up your base stylesheet

box-sizing: border-box universally, base element defaults, a spacing scale of 4/8/16/24/32/48, and a palette of two or three colours as custom properties.

Prove the box model to yourself

Set width 200px with 20px padding and a 1px border, measure the rendered element with and without border-box, and note the difference. Do it once and you will not forget it.

Set a readable type scale

Body at 16px or larger, line height about 1.5, line length constrained to 45–75 characters, headings in em or rem, and a system font stack with no download.

Audit one stylesheet for !important

Find every instance, work out the specificity conflict behind it, and replace it with a better selector. Note how many were avoiding a problem rather than solving one.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Selectors | Styles elements. | Element selectors for defaults, classes for anything repeated, IDs reserved for hooks, and every conflict resolved with a better selector with no !important anywhere. |
| Box model | Sets widths and padding. | border-box set globally, the four layers understood, display types accounted for, and margin collapsing explained rather than fought. |
| Spacing | Spaces things out. | A fixed scale of 4/8/16/24/32/48 used exclusively, with related elements placed closer together so grouping reads without being stated. |
| Typography | Chooses a font. | Body at 16px or larger with 1.5 line height, line length constrained, a system stack or at most two families, and headings in relative units. |
| Colour | Picks colours that look good. | A two or three colour palette as custom properties, every pair measured at 4.5:1 or better, consistent meaning per colour, and text or icon indicators where colour alone is not enough. |

## Session questionsWhy is my element wider than the width I set?+

Because width defaults to the content only, so padding and border are added on top. Set *, *::before, *::after { box-sizing: border-box; } at the top of your stylesheet and width will mean the whole box, which is what you expected.My CSS rule is being ignored. Why?+

Almost always specificity. An ID beats a class, a class beats an element, and among equals the later rule wins. Find the conflicting rule in the browser's developer tools and write a better selector — do not reach for !important, which creates a rule you cannot override later.Why do two margins not add up?+

Adjacent vertical margins collapse and the larger one wins. A 20px bottom margin against a 30px top margin gives a 30px gap, not 50px. It is intended behaviour, and knowing it saves a lot of confused spacing adjustment.What font size should body text be?+

16px or larger, with a line height of about 1.5 and a line length of roughly 45 to 75 characters. Smaller than that is hard to read on a phone, which is where most people will read your page.Should I use web fonts or system fonts?+

For a small project, a system font stack is usually right — it renders instantly with nothing to download, which matters on the slow connections most users here have. If you want a distinctive font, load at most two families and only the weights you actually use.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Forms & Accessibility](https://www.cea.ng/classes/web-development/forms-and-accessibility)[Next session 4: Flexbox, Grid & Responsive Layout](https://www.cea.ng/classes/web-development/flexbox-grid-responsive)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
