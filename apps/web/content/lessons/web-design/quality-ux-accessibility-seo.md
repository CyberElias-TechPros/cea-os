---
title: "Session 7: Quality: UX, Accessibility & SEO"
description: "The difference between a site that exists and a site that works. This session covers usability and accessibility — what makes a page usable by everyone, including people who cannot see it — then on-page SEO, performance, and the pre-launch checklist that catches what a designer stops noticing."
date: "2026-09-12"
class_slug: "web-design"
---

The difference between a site that exists and a site that works. This session covers usability and accessibility — what makes a page usable by everyone, including people who cannot see it — then on-page SEO, performance, and the pre-launch checklist that catches what a designer stops noticing.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Apply usability principles that reduce friction for real visitors

- Make a page usable with a keyboard and with a screen reader

- Meet contrast, focus and semantic requirements as requirements, not extras

- Write titles, descriptions and headings that work for search

- Diagnose and fix the performance problems that lose visitors

- Run a full pre-launch checklist before handing over

## The taught content

### Usability: removing friction

Usability is not aesthetic taste; it is whether a person can accomplish what they came for without thinking about the interface. The failures on Nigerian business sites are consistent. A phone number that must be copied rather than tapped. A form with no labels so the visitor guesses what each box wants. Text too small to read on a phone in daylight. A hero whose headline is unreadable over a photograph. Navigation that does not say where it leads. A page that takes fifteen seconds to load on mobile data, by which time the visitor has left.

The principles that fix most of it are few. **Make the primary action obvious and reachable** — the WhatsApp or call button should be visible without hunting, ideally in the header as well as the contact section, because a visitor who decides to call should never have to scroll to find the number. **Say what things are**: 'Get a quote' beats 'Submit', 'See our prices' beats 'Learn more', because a vague label forces the visitor to guess the consequence of clicking. **Keep forms short** — every field you add loses some completions, so ask only for what you genuinely need to respond.

Then there is the principle that ties them together: **test it as a stranger would**. Open the page on a phone, in daylight, over mobile data, having never seen it before, and try to make contact. Every hesitation you feel is a real cost, and the designer who built the page is the least qualified person to find them because they already know where everything is. This is why the pre-launch checklist at the end of this session exists.

### Accessibility: what it is and why it is not optional

Roughly one in six people worldwide has a significant disability, and that includes people who are blind, have low vision, cannot use a mouse, are deaf, or are colour blind. **Accessibility** is whether they can use your page. It is a legal requirement in many jurisdictions, it is a moral one everywhere, and in practical terms it also improves the page for everyone — captions help in a noisy room, good contrast helps in sunlight, semantic structure helps a search engine.

The three things that matter most, and they are all things you have already learned. **Semantic HTML** — a screen reader navigates by landmarks and headings, so a page of divs with styled text is effectively unnavigable, while `main`, `nav`, `h1` to `h3` give a blind user a way to jump to what they need. **Alt text** — a screen reader reads it aloud, so an image without one is a hole in the content. **Contrast** — body text needs at least 4.5:1 against its background, and low-contrast grey-on-white excludes a large share of low-vision users while looking fine to the person who designed it in a dim room.

Two more that cost nothing. **Visible focus** — when you tab through a page, the focused element must be visibly marked; `outline: none` with no replacement is a common and genuinely harmful thing to find in a stylesheet, because it makes keyboard navigation impossible to follow. And **labels on form fields** — an unlabelled input is announced as 'edit text' with no indication of what to enter. Fix those five things and a page moves from unusable to usable for most assistive-technology users, and every one of them is something a beginner can do from the first project.

### On-page SEO: what actually moves the needle

Search engine optimisation at this level is not mysterious and it is mostly good HTML. The elements that matter, in rough order of impact. **The title tag** — the single most important piece of text, because it is what appears in the search result and what the engine reads first. It should name the business, what it does and where: 'Adaeze Cakes — Custom Wedding & Birthday Cakes in Lagos'. A title left as 'Document' or 'Home' is a free visibility loss on every page.

**The meta description** does not directly rank you, but it is the sentence shown under your title in results, so writing one that answers the searcher's question measurably improves click-through. **Headings** — one `h1` per page stating the topic, then `h2` and `h3` for sections — because they form the outline the engine uses to understand structure. **Real content** that answers the questions a customer would ask, in the words they would use; a services page with three sentences cannot rank for anything.

Then the technical basics: **alt text** on images, which is both accessibility and image search; **fast loading**, which is a ranking signal and which on a Nigerian mobile connection is mostly about image size; **mobile friendliness**, without which a page is penalised; and **clean URLs** — `/wedding-cakes` rather than `/page?id=47`. What does not help: keyword stuffing, which reads badly to humans and is penalised; buying links; and any scheme promising a shortcut. The honest summary is that SEO at this level is the by-product of building a clear, fast, well-structured page with real content, and there is no separate trick.

### Performance: the ranking signal visitors feel

A slow page loses visitors before they see anything, and on mobile data — the normal condition in Nigeria — the losses are severe. Studies of abandonment and everyday experience agree: past about three seconds a large share of mobile visitors leave. Diagnose in the dev tools **Network** panel, sorted by size, and you will almost always find the same three causes.

**Images** are the first and largest. A phone photograph is routinely several megabytes; five of them on a page is twenty megabytes, which on a mobile connection is not a website but a download. Resize to the largest displayed size and compress — the visual difference is nil and the size difference is often tenfold. **Fonts** are second: each weight is a separate file, and loading a family in six weights when you use two wastes four downloads. Load only what you use, and prefer `font-display: swap` so text renders immediately in a fallback rather than waiting invisibly. **Too many requests** is third — every script, icon library and tracking snippet is another round trip, and a page making ninety requests will be slow regardless of file sizes.

The target for a small business site is a total page weight under about two megabytes and a load under three seconds on mobile data. That is achievable on almost any business site with compressed images, two font weights and no unnecessary scripts — and it is worth stating to a client explicitly, because they will judge the site by how it feels on their phone before they judge anything else.

### The pre-launch checklist

A designer stops seeing their own page after a few days, which is why a checklist matters more than attention. Run it before every handover. **Content**: no placeholder text, no 'Lorem ipsum', no broken sentences, every price and phone number correct — read the whole page aloud once, which catches what skimming never does. **Links**: click every single one, including the footer and the fragment links in the navigation, and confirm the WhatsApp deep link opens with the right number and message.

**Forms**: submit one and confirm the message actually arrives somewhere, because a form that silently discards enquiries is worse than no form and it can take a client months to notice. **Images**: confirm every one has alt text and none is several megabytes. **Contact**: tap the phone number on a real phone and confirm it dials. **Responsiveness**: check at 360, 768 and 1280, and load it on a real phone over mobile data. **Titles**: confirm no page says 'Document' or 'Untitled'. **Console**: open dev tools and confirm there are no red errors, because a JavaScript error can silently break something you are not looking at.

Then the handover itself: give the client the files or the hosting login, explain in plain language how to change a price or a photograph, and tell them what they should not touch. A client who breaks the site in week one and blames you is a common and entirely preventable outcome, and ten minutes of explanation prevents it.

## Instructor demonstration

The instructor runs the business site through a full quality pass — accessibility audit, SEO review, performance measurement — fixing each finding live, then executes the pre-launch checklist and the client handover.

### Tab through the page

Press Tab repeatedly and watch the focus. Find an element with outline removed and no replacement, and restore a visible focus style. Explain why this breaks keyboard navigation entirely.02

### Check the heading outline

List the headings in order in dev tools and show where levels were skipped for size. Fix them by rank, explaining that the outline is how a screen reader user navigates.03

### Audit alt text

List every image and its alt attribute. Write real descriptions for the meaningful ones and empty alt for the decorative, and explain the difference between the two.04

### Measure contrast

Run every text-and-background pair through a checker, list the failures against 4.5:1, and darken until each passes. Explain why judging by eye in a dim room fails.05

### Check the form labels

Confirm every input has a label with matching for and id, and the right input type. Show what a screen reader announces for an unlabelled field.06

### Review the titles

List every page title and rewrite any that says 'Document', 'Home' or 'Untitled' into business, service and location. Explain that this is the highest-impact SEO change available.07

### Write meta descriptions

Write one per page answering the searcher's question rather than describing the business. Explain that it does not rank you but it does change click-through.08

### Measure the page weight

Open the Network panel, sort by size, and read the total. Identify the largest files. Explain that this single panel answers 'why is it slow'.09

### Compress the images

Resize and compress the offenders, then re-measure. Show the total weight before and after, and note that the visual difference is nil.10

### Reduce font weights and scripts

Cut the Google Fonts request to the weights actually used, add font-display: swap, and remove an unused script. Re-measure the request count.11

### Run the pre-launch checklist

Read the page aloud, click every link, submit the form, tap the phone number on a real phone, check three widths, and confirm the console has no errors.12

### Do the client handover

Explain in plain language how to change a price and a photograph, what not to touch, and where the files live. Explain that this ten minutes prevents most post-launch blame.

## Guided practice

### Full quality pass and handover

You run a complete quality pass on the business site — accessibility, SEO, performance — documenting every finding and fix, then execute the pre-launch checklist and write a plain-language handover note for the client.

1. 01Tab through the whole page and restore a visible focus style wherever it is missing.

2. 02List the heading order and fix any levels skipped for size.

3. 03Audit every image's alt text; write real descriptions or empty alt as appropriate.

4. 04Measure every text-and-background pair and darken until all pass 4.5:1.

5. 05Confirm every form field has a matching label and the correct input type.

6. 06Rewrite every page title to include business, service and location.

7. 07Write a meta description per page answering the searcher's question.

8. 08Measure total page weight and request count in the Network panel.

9. 09Compress and resize the largest images and re-measure.

10. 10Reduce font weights to those used, add font-display: swap, and remove unused scripts.

11. 11Read the whole page aloud and fix any placeholder or broken text.

12. 12Click every link, submit the form and confirm delivery, and tap the phone number on a real phone.

13. 13Check at 360, 768 and 1280, then load on a real phone over mobile data and record the time.

14. 14Confirm the console shows no errors, then write the plain-language handover note.

The standard we hold you to

A documented pass where focus is visible, headings form a correct outline, every image has appropriate alt text, all text passes 4.5:1, every title names business, service and location, page weight is under about two megabytes, every link and the form have been tested end to end, and a handover note explains how to edit content.

## Common mistakes and how to fix them

You removed the focus outline with no replacement

Fix: Restore a visible focus style. outline: none without a replacement makes keyboard navigation impossible to follow, which excludes keyboard-only users entirely — and it is one of the most common accessibility failures found in a stylesheet.

Your headings skip levels because of how they look

Fix: Choose by rank, not size. A screen reader user navigates by the heading outline, and skipped levels make that navigation incoherent. Size belongs in CSS.

Your page titles say 'Document' or 'Home'

Fix: Write business, service and location in every title. It is the primary text a search engine reads and what appears in a shared link, and fixing it is the highest-impact SEO change available.

Your page is several megabytes and slow on mobile data

Fix: Sort the Network panel by size — it is almost always images. Compress and resize, cut font weights to those used, and remove unused scripts. Target under two megabytes.

You loaded six font weights and use two

Fix: Request only the weights you use and add font-display: swap. Each weight is a separate download and invisible text while it loads is a real usability cost.

You tested the form by looking at it

Fix: Submit it and confirm the message arrives. A form that silently discards enquiries is worse than none, and clients typically take months to notice.

You handed over with no explanation

Fix: Spend ten minutes showing the client how to change a price and a photograph, and what not to touch. A client who breaks the site and blames you is a common and entirely preventable outcome.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Tab through every page you build before delivery. It takes thirty seconds and it finds focus problems, broken tab order and unreachable controls — and it is the single fastest accessibility check there is.

- Measure contrast rather than judging it. Your eye adapts within seconds and a dim room makes low contrast look acceptable, which is exactly why so many Nigerian business sites fail this and their owners cannot see it.

- Read the whole page aloud once before launch. It catches placeholder text, broken sentences and wrong prices that skimming never will, and it is the cheapest quality check available.

- Sort the Network panel by size on every project, even when the client has not complained. It tells you in one look where the page is heavy, and keeping a site under two megabytes is what makes it feel fast on the connection most Nigerian visitors actually have.

## Key termsAccessibilityWhether people with disabilities can use the page. A requirement, not an enhancement.Screen readerSoftware reading a page aloud and navigating by landmarks and headings. Depends entirely on semantic HTML.Focus styleThe visible mark on the keyboard-focused element. Removing it without a replacement breaks keyboard navigation.Contrast ratioA numeric measure of text legibility against its background. Body text needs at least 4.5:1.Title tagThe most important text on a page for search: business, service and location.Meta descriptionThe sentence shown under a title in results. Does not rank, but changes click-through.Page weightTotal bytes downloaded. Target under about two megabytes for a business site on mobile data.font-display: swapRenders text immediately in a fallback font rather than hiding it while the web font loads.

## Homework before the next session

Tab through three sites

Press Tab repeatedly on three real sites and note where focus is invisible or the order is illogical. This trains the check you will run on every page you build.

Audit your own site's contrast

Measure every text-and-background pair against a checker and list the failures. Fix each by darkening the text, and re-measure.

Rewrite five page titles

Take five pages from sites you find and rewrite their titles to include business, service and location. Note how much more useful each becomes in a search result.

Measure and halve a page weight

Find a heavy page, sort the Network panel by size, and work out what you would compress or remove to halve it. Then do it to one of your own pages.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Accessibility | The page is mostly usable. | Visible focus throughout, a correct heading outline, appropriate alt text on every image, all text passing 4.5:1, and every form field labelled. |
| SEO | Pages have titles. | Every title naming business, service and location, a meta description per page, a logical heading structure and clean URLs. |
| Performance | The page loads. | Under about two megabytes, images compressed, only used font weights loaded with font-display: swap, and unused scripts removed. |
| Pre-launch discipline | Checks the obvious. | The full checklist run — page read aloud, every link clicked, form tested end to end, phone number tapped on a real phone, console clean. |
| Handover | Delivers the files. | A plain-language note explaining how to change content, what not to touch and where the files live. |

## Session questionsIs accessibility really required for a small business site?+

It is a legal requirement in many jurisdictions and a moral one everywhere. Practically, the core of it — semantic HTML, alt text, contrast, labels, visible focus — costs nothing because it is simply good HTML, and it improves the page for every visitor including search engines.How much SEO do I need to know?+

Enough to write a good title, a meta description, a logical heading structure and real content, and to keep the page fast. That covers almost all of what matters for a local business. Technical SEO beyond that is a specialism, and most local ranking comes down to a clear page and a Google Business Profile.What page weight should I aim for?+

Under about two megabytes total and a load under three seconds on mobile data. That is achievable on any business site with compressed images, two font weights and no unnecessary scripts, and it is what most Nigerian visitors will judge the site by.How do I test with a screen reader?+

NVDA on Windows and VoiceOver on macOS and iOS are free. But before that, tab through the page and check the heading order and alt text — those three checks catch the large majority of problems, and they take under a minute.My client says the site is slow. Where do I start?+

Open the Network panel, sort by size, and look at the largest files. It is nearly always images. Compress and resize them, then check font weights and script count. Those three account for most slow business sites.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session6: Responsive Design](https://www.cea.ng/classes/web-design/responsive-design)[Next session 8: Publishing & Final Project](https://www.cea.ng/classes/web-design/publishing)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
