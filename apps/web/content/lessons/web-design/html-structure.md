---
title: "Session 2: HTML Structure"
description: "HTML is the part that decides whether a page means anything. This session covers document structure, the elements that make up every business page, semantic markup and why it matters, forms that actually collect what you need, images done properly, and the mistakes that quietly break pages."
date: "2026-09-12"
class_slug: "web-design"
---

HTML is the part that decides whether a page means anything. This session covers document structure, the elements that make up every business page, semantic markup and why it matters, forms that actually collect what you need, images done properly, and the mistakes that quietly break pages.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Write correct HTML document structure and explain what each part does

- Use headings, paragraphs, lists, links and tables appropriately

- Apply semantic elements so structure carries meaning

- Build forms with labels, the right input types and validation

- Add images with alt text and sensible sizing

- Diagnose and fix the common structural mistakes

## The taught content

### Document structure, and why each part exists

Every HTML page has the same skeleton, and each piece has a job. `<!DOCTYPE html>` tells the browser to render in modern standards mode — omit it and the browser guesses, using an old compatibility mode that produces subtly wrong layouts. `<html lang="en">` is the root, and the `lang` attribute tells screen readers which language to pronounce and tells search engines which language the page is in; for Nigerian content that is usually `en`, and getting it right is a one-word accessibility win.

`<head>` holds what is not displayed: the `<title>`, which is the single most important piece of text on the page because it is what appears in a browser tab, in a search result and in a shared link; `<meta charset="utf-8">`, without which special characters such as the naira sign ₦ may render as garbage; the `<meta name="viewport">` tag, without which a phone renders the page as a shrunken desktop page and users must pinch-zoom; and links to stylesheets.

`<body>` holds everything visible. That division — head for metadata, body for content — is the whole structure. The mistakes to avoid are cosmetic ones people copy from templates: a missing doctype, a missing lang, a missing viewport meta, and a title left as 'Document' or 'Untitled'. That last one is surprisingly common on Nigerian business sites and it costs them search visibility on every page, because the title is the primary thing a search engine reads.

### The elements a business page actually uses

You need fewer elements than you might expect. **Headings** run from `<h1>` to `<h6>` and they are not sizes — they are ranks in an outline. A page has exactly one `<h1>`, which states what the page is about; `<h2>` marks its major sections; `<h3>` subdivides those. Choosing a heading level because of how big it looks is the most common structural error, and it produces a page whose outline is meaningless. Size is CSS's job; rank is HTML's.

**Paragraphs** are `<p>`. Do not create spacing with empty paragraphs or with line breaks — that is CSS's job too, and misusing it makes the page unreadable to assistive technology. **Lists** are `<ul>` for unordered items, `<ol>` where the order matters, and `<li>` for each item. Navigation menus are lists, semantically, even when styled to look horizontal.

**Links** are `<a href="...">` and they have rules worth knowing. A link to another page on your site uses a relative path — `about.html`, not `https://yoursite.com/about.html` — because relative paths keep working when you change domains. A link to an external site should usually open normally, not in a new tab, because hijacking the back button frustrates visitors. And every link needs descriptive text: 'See our prices' tells a screen-reader user what they are activating, while 'click here' tells them nothing until they have already clicked.

**Tables** are for tabular data — a price list, a schedule — and never for layout. A table used for layout produces a page that cannot be reordered on a phone and is unreadable to a screen reader. If you are reaching for a table to position things, you want CSS layout, which session four covers.

### Semantic HTML: structure that means something

Semantic elements describe what content **is** rather than how it looks: `<header>` for the top matter, `<nav>` for navigation, `<main>` for the primary content, `<section>` for a thematic grouping, `<article>` for something self-contained, `<aside>` for tangential material, and `<footer>` for the bottom matter. A page built from `<div>` tags for everything looks identical in a browser and is worthless to anything that cannot see it.

Three groups benefit directly. **Screen readers** used by blind and low-vision visitors navigate by these landmarks — 'jump to main content', 'list the navigation' — and a page of divs gives them nothing to jump to. **Search engines** use them to understand which part of the page is the actual content, which affects how a page is indexed. And **you**, six months later, because `<footer>` is self-documenting while `<div class="thing3">` is not.

The practical rule is simple and it costs nothing: reach for the semantic element first and use `<div>` only when nothing fits. The single highest-value habit is putting one `<main>` around the page's primary content, because it gives assistive technology a way to skip the repeated navigation — which on a long page is the difference between usable and exhausting.

### Forms that collect what you need

The contact form is where a business website earns its money, and most of them are built badly. A form is `<form>` containing inputs, each wrapped or paired with a `<label>`. The label is not decoration — the `for` attribute must match the input's `id`, which makes the label clickable to focus the field, and makes a screen reader announce what the field is for. An input without a label is effectively invisible to a blind visitor, and a form full of them fails regardless of how it looks.

Use the **right input type**, because on a phone it changes the keyboard. `type="email"` gives an @ key, `type="tel"` gives a numeric keypad — which matters enormously for a Nigerian audience entering a phone number — `type="number"` for quantities, `type="date"` for a date picker, and `<textarea>` for anything longer than a sentence. Using `type="text"` for everything forces users onto the wrong keyboard, which is a real usability failure, not a pedantic one.

Add `required` to the fields you genuinely need, and use `placeholder` for a formatting example rather than as a label, because placeholder text disappears when typing begins and low-contrast placeholder text is hard to read. And be honest about what happens on submit: a form needs somewhere to send data, and on a static site that is a service such as Formspree or a WhatsApp link. A form that appears to work and silently discards the message is worse than no form at all, because the business believes it is receiving enquiries it never gets.

### Images, and the mistakes that break pages

An image is `<img src="photo.jpg" alt="description">`. The `alt` attribute is required and is not optional politeness: a screen reader reads it aloud, a search engine indexes it, and it is what displays when the image fails to load. Write what the image actually shows — `alt="Two-tier wedding cake with white icing and fresh roses"` — not `alt="image1"`, which tells nobody anything. For a purely decorative image, use `alt=""`, which correctly tells assistive technology to skip it.

Always set `width` and `height` attributes, or set the size in CSS. Without them the browser does not know how much space the image needs until it arrives, so the page shifts as images load — which is genuinely disorienting and is one of the measurable quality signals search engines use. And compress images before uploading: a phone photograph is often several megabytes, and a page carrying five of them will not load on a Nigerian mobile connection. Resize to the largest size you will display and compress; the visual difference is nil and the load time difference is enormous.

The structural mistakes that break pages are few and they are all catchable. **Unclosed tags** — a `<div>` with no `</div>` — cause everything after to nest wrongly, and the visible symptom is usually layout chaos far from the actual error, which is why beginners cannot find it. **Nesting errors** — a block element inside an inline one, or a `<p>` inside a `<p>` — are silently corrected by the browser into something you did not intend. And **misused headings for size** destroy the outline. Turn on your editor's error highlighting and read it; the browser will not tell you, because it is designed to recover rather than complain.

## Instructor demonstration

The instructor builds the full HTML for a real Nigerian business — a bakery — from an empty file, narrating each element and its purpose, then deliberately introduces the classic mistakes and shows how each is diagnosed.

### Write the skeleton and explain each part

Doctype, html with lang, head with charset, viewport, title, and an empty body. Explain what breaks if each is omitted, particularly the naira sign without utf-8.02

### Write a title that works

Replace 'Document' with 'Adaeze Cakes — Custom Wedding & Birthday Cakes in Lagos'. Explain that the title is the primary thing a search engine reads and what appears in a shared link.03

### Build the header and nav

Use header and nav with a list of links, using relative paths. Explain why relative paths survive a domain change and why nav is a list semantically.04

### Add main and one h1

Wrap the primary content in main and write one h1 stating what the page is. Explain that assistive technology uses main to skip the repeated navigation.05

### Build the heading outline

Add h2 for each section and h3 within them, choosing by rank not by size. Show the outline the page now has and contrast it with a size-driven version.06

### Add content with lists and paragraphs

Use ul for services and p for copy. Show an empty-paragraph spacing hack and remove it, explaining that spacing belongs in CSS.07

### Build the price table correctly

Use table with th and td for a genuine price list. Explain that this is legitimate tabular data and that a table used for layout is not.08

### Add images with real alt text

Add product images with descriptive alt text, width and height. Show the page with images blocked so the alt text and the absence of layout shift are visible.09

### Build the contact form

Add labelled inputs with type tel and email, a textarea, required fields, and a WhatsApp fallback link. Explain the keyboard difference on a phone.10

### Add the footer

Use footer with address, phone and opening hours. Explain that consistent footer content across pages is what search engines and visitors both expect.11

### Introduce an unclosed div

Delete one closing tag and show how the layout collapses far from the error. Then find it using the editor's highlighting and dev tools' nesting view.12

### Validate and inspect the result

Run the page through a validator, fix what it reports, and inspect the finished structure in dev tools to confirm the landmarks are present.

## Guided practice

### Build a complete business page in HTML

You build the full semantic HTML for a real Nigerian business — header, nav, main with a correct heading outline, content, a price table, images with real alt text, a labelled contact form and a footer — with no styling, so the structure has to stand on its own.

1. 01Write the skeleton: doctype, html with lang, head with charset, viewport and a descriptive title.

2. 02Build header and nav using a list of relative-path links.

3. 03Wrap the primary content in a single main element.

4. 04Write exactly one h1 stating what the page is about.

5. 05Add h2 for each major section and h3 within them, choosing by rank not size.

6. 06Write the copy in paragraphs and the services as a list — no empty paragraphs for spacing.

7. 07Build a genuine price table using th and td.

8. 08Add at least three images with descriptive alt text, width and height attributes.

9. 09Add one decorative image with an empty alt attribute.

10. 10Build the contact form with labels matched to input ids.

11. 11Use type tel and type email so phones get the right keyboard, and mark genuinely needed fields required.

12. 12Add a footer with address, phone and opening hours.

13. 13Validate the page and fix everything reported.

14. 14Inspect it in dev tools and confirm the landmarks are present.

The standard we hold you to

A page with correct document structure, one h1 and a logical heading outline, semantic landmarks throughout, every form field labelled and typed appropriately, every meaningful image with descriptive alt text, and a validator report showing no errors — with no CSS anywhere in the file.

## Common mistakes and how to fix them

Your headings are chosen by size, so the outline is nonsense

Fix: Choose by rank: one h1 per page, h2 for major sections, h3 within them. Size is CSS's job. A size-driven outline is meaningless to search engines and to screen readers.

Your form fields have no labels

Fix: Every input needs a label whose for matches the input's id. Placeholder text is not a label — it vanishes when typing starts, and an unlabelled field is effectively invisible to a screen reader.

You used type="text" for the phone number

Fix: Use type="tel" so phones show a numeric keypad. Forcing a Nigerian user onto a full keyboard to type a phone number is a real usability failure, not a pedantic point.

Your page shifts as images load

Fix: Set width and height on every image so the browser can reserve the space. Uncontrolled shifting is disorienting and is one of the quality signals search engines measure.

You used a table to lay the page out

Fix: Tables are for tabular data only. A layout table cannot be reordered on a phone and is unreadable to a screen reader. Use CSS layout instead.

An unclosed div wrecked the layout somewhere else

Fix: The symptom appears far from the cause. Use your editor's error highlighting and the dev tools nesting view rather than scanning by eye — the browser recovers silently, so it will not tell you.

Your images are several megabytes each

Fix: Resize to the largest displayed size and compress before uploading. A phone photograph can be several megabytes and five of them will not load on a Nigerian mobile connection.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Write the HTML with no CSS at all, at least once per project. If the page reads sensibly as plain text, the structure is right; if it is confusing, no amount of styling will fix it. This is the fastest structural check there is.

- Give every page a real title before anything else. It is the primary text a search engine reads, it is what shows in a shared WhatsApp link, and 'Document' or 'Untitled' on a Nigerian business site is a free visibility loss that takes ten seconds to fix.

- Always specify where a form's data goes, and test it by actually submitting. A form that silently discards messages is worse than none, because the business believes it is receiving enquiries it never gets — and it usually takes months to notice.

- Compress images as a fixed step, not an afterthought. The visual difference after resizing and compressing is nil, and the load-time difference on a mobile connection is the difference between a visitor staying and leaving.

## Key termsDOCTYPEThe declaration telling the browser to use modern standards mode. Omit it and the browser guesses.Viewport metaThe tag telling a phone to use its real width. Without it, pages render as shrunken desktop pages needing pinch-zoom.Semantic elementAn element describing what content is — header, nav, main, section, footer — rather than a generic div.Heading outlineThe ranked structure formed by h1 to h6. Chosen by importance, never by rendered size.Alt textThe description of an image, read aloud by screen readers and indexed by search engines. Required on every img.LabelThe visible text describing a form field, linked by for to the input's id. Not the same as a placeholder.Relative pathA link written relative to the current file, such as about.html. Survives a domain change; absolute paths do not.Layout shiftContent moving as images load because their size was not declared. Disorienting, and a measured quality signal.

## Homework before the next session

Build one business page with no CSS

Pick a real business and build its full HTML. Read it as plain text — if it makes sense unstyled, the structure is right.

Write ten alt texts

For ten real photographs, write alt text describing what is actually shown. Then write one empty alt for a decorative image and note why the difference matters.

Build a form properly

Name, phone, email, service needed, message — all labelled, correctly typed, with required on the essentials. Submit it and confirm where the data actually goes.

Validate three pages you find online

Run three Nigerian business sites through a validator and count the errors. Note which are structural and which are cosmetic — this calibrates what actually matters.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Document structure | Page loads and displays content. | Doctype, lang, charset, viewport and a descriptive title all present, with head and body correctly divided. |
| Headings | Has headings. | Exactly one h1, then h2 and h3 chosen by rank, forming a meaningful outline with no levels skipped for size. |
| Semantics | Uses some semantic tags. | header, nav, main, section and footer used appropriately, with div reserved for cases where nothing fits. |
| Forms | Has a form. | Every field labelled with matching for and id, correct input types for phone and email, required used judiciously, and a real submission target tested. |
| Images and validity | Images appear. | Descriptive alt text on every meaningful image, empty alt on decorative ones, dimensions declared, files compressed, and a clean validator report. |

## Session questionsDoes semantic HTML really matter, or does it look the same anyway?+

It looks identical in a browser and it matters anyway. Screen readers navigate by landmarks, so a page of divs is exhausting for a blind visitor; search engines use the same elements to identify real content; and it makes your own code readable months later. It costs nothing to do correctly.Can I have more than one h1 on a page?+

You should not. One h1 per page stating what the page is about, then h2 for major sections. Multiple h1s produce an ambiguous outline, which weakens both search indexing and assistive navigation.My form does not send anywhere. What do I do?+

A static site has no server to receive it. Use a form-handling service such as Formspree, or replace the form with a WhatsApp link, which is often better in Nigeria because the customer already has the app. Either way, submit it yourself and confirm the message arrives.Do I need alt text on every single image?+

Every img needs the attribute. Meaningful images need a real description; purely decorative ones get alt="" which correctly tells assistive technology to skip them. Omitting the attribute entirely is the error, because the browser may then read the filename aloud.How big should my images be?+

Resize to the largest size you will actually display — usually no more than about 1600 pixels wide for a full-width hero — and compress. For most Nigerian business sites, keeping the whole page under a couple of megabytes is the target that makes it usable on mobile data.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: How the Web Works](https://www.cea.ng/classes/web-design/how-the-web-works)[Next session 3: CSS Fundamentals](https://www.cea.ng/classes/web-design/css-fundamentals)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
