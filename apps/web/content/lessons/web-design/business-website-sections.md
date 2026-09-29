---
title: "Session 5: Business Website Sections"
description: "The applied session: what a Nigerian small-business website actually needs, section by section. Header, hero, services, about, prices, testimonials, gallery, contact and footer — what each is for, what goes in it, and the mistakes that make a business site fail to produce enquiries."
date: "2026-09-12"
class_slug: "web-design"
---

The applied session: what a Nigerian small-business website actually needs, section by section. Header, hero, services, about, prices, testimonials, gallery, contact and footer — what each is for, what goes in it, and the mistakes that make a business site fail to produce enquiries.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Plan a site structure from what the business actually needs to achieve

- Build a hero that states the offer and the next step within seconds

- Write and structure services, about and pricing sections that convert

- Use testimonials and a gallery to build trust

- Build a contact section that reliably produces enquiries

- Avoid the failures that make Nigerian business sites lose customers

## The taught content

### Structure: what a business site is for

A small-business website has one job: turn a stranger who found you into a person who contacts you. Every section either serves that or it is decoration. That gives you a fixed order that works almost every time: **header** with navigation, **hero** stating what you do and what to do next, **services** showing what you offer, **proof** — testimonials or a portfolio — establishing that you can be trusted, **about** briefly, **prices** where possible, **contact** with the easiest possible route, and **footer**.

For most Nigerian small businesses, one page is enough and is better than several. A single scrolling page loads faster, works on a phone without navigation friction, and keeps the visitor moving toward contact rather than giving them five places to get lost. Multi-page becomes worth it when there is genuinely distinct content — a long portfolio, a full menu, separate service lines — and not before. Building five thin pages is worse than one strong one.

Decide the structure from the business's actual goal rather than from a template. A bakery needs a gallery and prices above all, because the customer decides on appearance and budget. A consultant needs proof and a clear explanation of the service. A repairs business needs a phone number visible everywhere and a list of what it fixes. The sections are the same vocabulary; the emphasis is what makes the site work.

### The hero: three seconds to say it

The hero is the top of the page and it has three seconds. It needs three things and nothing else: **what you do**, in plain words a stranger understands; **who it is for or why it is good**, in one supporting line; and **what to do next**, as a visible button. 'Custom wedding and birthday cakes in Lagos, delivered on the day' with a button reading 'Get a quote on WhatsApp' does the whole job. What fails is a hero containing a slogan nobody can act on — 'Excellence in every bite' — which tells a visitor nothing about whether you can serve them.

The button matters more than people think, and its text is the lever. 'Contact us' is weak because it promises effort. 'Get a quote' or 'See our prices' promises a specific, low-risk next step and gets clicked far more. Make it a real link — to WhatsApp with a pre-filled message where possible, because in Nigeria that removes an entire step and the customer already has the app.

Technically: use `min-height` rather than a fixed height so nothing clips when text wraps on a phone, constrain the text block's width so lines stay readable, and make sure any text over a background image has enough contrast — usually by placing a dark overlay behind it. A hero whose headline is unreadable over a photograph is a common and completely avoidable failure.

### Services, about and prices

**Services** should be a set of cards, each with a clear name, one line on what it includes, and ideally a starting price. The mistake is vagueness: 'We offer quality catering services' tells a customer nothing, while 'Corporate lunch packs — from ₦2,500 per head, minimum 20, delivered across Lagos' answers the three questions they actually have. If the business genuinely cannot price publicly, give a range and say what moves it — hiding prices entirely costs more enquiries than it protects.

**About** should be short and should be about the customer's confidence rather than the owner's biography. Two or three sentences: how long you have done this, what you are known for, and one human detail that makes the business real — a real photograph of the owner or the team works better than a paragraph. Nobody reads a long about page on a phone; they scan it for reassurance.

**Prices** are the section most Nigerian business sites omit, and it is the section that loses the most customers. A visitor who cannot find a price will often message a competitor who publishes one rather than send an enquiry and wait. Where prices genuinely vary, publish a table of starting prices by category — customers accept 'from ₦X' readily, and it filters out enquiries that were never going to convert while converting the ones that were.

### Proof: testimonials and gallery

Trust is the real product of these sections. **Testimonials** work when they are specific and attributable: a real name, ideally a photograph, and a quote that mentions an outcome rather than a generality. 'The cake was beautiful and arrived two hours early when our caterer cancelled — she saved the wedding' is worth ten times 'Great service, highly recommended', because it describes a risk that was removed. Three or four specific testimonials beat a wall of vague ones.

Get them properly: ask the customer, quote their actual words rather than polishing them into something they would not say, and never invent one. A fabricated testimonial is a genuine ethical and legal problem, and in a small market where customers talk, it is also a commercial one.

The **gallery** is the bakery's, salon's, photographer's and event planner's most persuasive asset, because the customer is buying an appearance. Show real work, not stock photographs — a Nigerian customer responds strongly to work that looks like their own environment, and stock imagery of a European office actively undermines trust. Caption each with what it is, keep images compressed so the page loads on mobile data, and make sure every image has real alt text so the section is not invisible to a screen-reader user.

### Contact: the section that earns the money

Most Nigerian business enquiries happen on WhatsApp or by phone, not through a form, so the contact section should lead with those. A **click-to-WhatsApp link** — `https://wa.me/2348034567890?text=Hello,%20I%20would%20like%20a%20quote` — with a pre-filled message is the single highest-converting element you can put on a small-business site, because it removes typing and opens the app the customer already uses. A **click-to-call link** (`tel:+2348034567890`) matters equally, because a large share of visitors are on a phone and expect to tap rather than to copy a number.

Include a form as well, for people who prefer it, built to the standards from session two: every field labelled, `type="tel"` so phones show the numeric keypad, `required` only on what you genuinely need, and — critically — a real submission target that you have tested. A form that appears to work and silently discards messages is worse than no form, because the business believes it is receiving enquiries it never gets, and it can take months to notice.

Then add the practical details customers actually look for: **opening hours**, the **physical address** where relevant, and the **service area**. And repeat the primary contact route in the header and the footer, not only in the contact section — a visitor who decides to call should never have to hunt for the number.

## Instructor demonstration

The instructor builds a complete one-page site for a real Lagos business, section by section, writing the copy as well as the code and explaining each conversion decision, then reviews three real Nigerian business sites against the same standard.

### Plan from the goal

Ask what the business needs a visitor to do, and let that decide the section emphasis. Explain that a bakery and a consultant need the same vocabulary in different proportions.02

### Decide one page or several

Choose one scrolling page and justify it: faster load, no navigation friction on a phone, and one path to contact. Explain when multi-page becomes worth it.03

### Build the header

Logo, navigation links to each section using fragment links, and the phone number visible. Explain why the number belongs in the header rather than only at the bottom.04

### Write the hero copy

Write what you do, who it is for, and the next step. Reject two vague slogans out loud and explain why a visitor cannot act on them.05

### Build the hero button

Link it to WhatsApp with a pre-filled message. Compare 'Contact us' with 'Get a quote on WhatsApp' and explain why the second gets clicked.06

### Build the services cards

Use the Grid auto-fit pattern, each card with a name, one line of what is included and a starting price. Rewrite a vague service description into a specific one.07

### Align the card buttons

Apply the Flexbox column with flex: 1 trick so buttons line up along the bottom regardless of text length.08

### Build the price table

Use a real table for genuine tabular data with 'from' prices by category. Explain what publishing prices gains and what hiding them costs.09

### Build the testimonials

Write three specific, attributable quotes describing outcomes. Explain why a fabricated one is both an ethical and a commercial failure.10

### Build the gallery

Use real work with compressed images and real alt text. Explain why stock imagery of a foreign environment undermines trust with a Nigerian customer.11

### Build the contact section

WhatsApp link, click-to-call, a properly built form with a tested submission target, opening hours and service area.12

### Review three real sites against the standard

Open three Nigerian business sites and score each on hero clarity, prices, contact route and load. Name the specific fix for each.

## Guided practice

### Build a complete one-page business site

You build a full one-page website for a real Nigerian business — header, hero, services, prices, testimonials, gallery, about, contact and footer — with copy written for conversion, a WhatsApp-first contact route and a tested form.

1. 01Write the business's goal in one line and let it decide your section emphasis.

2. 02Decide one page versus several and write one line of justification.

3. 03Build the header with fragment-link navigation and a visible phone number.

4. 04Write hero copy stating what you do, who it is for, and the next step — rejecting at least two vague slogans first.

5. 05Build the hero with min-height, a constrained text width and sufficient contrast over any image.

6. 06Link the hero button to WhatsApp with a pre-filled message.

7. 07Build service cards with the Grid auto-fit pattern, each with a name, one line of inclusions and a starting price.

8. 08Align the card buttons along the bottom with the flex: 1 trick.

9. 09Build a genuine price table with 'from' prices by category.

10. 10Write three specific, attributable testimonials describing outcomes rather than generalities.

11. 11Build a gallery of real work, compressed, with real alt text on every image.

12. 12Write a short about section aimed at the customer's confidence, with a real photograph.

13. 13Build the contact section: WhatsApp link, click-to-call, a labelled and typed form with a tested target, opening hours and service area.

14. 14Build the footer repeating the primary contact route.

The standard we hold you to

A complete one-page site where the hero states the offer and next step in plain words, the primary contact route is WhatsApp or phone and appears in header, contact and footer, prices are published as 'from' figures, testimonials are specific and attributable, every image is compressed with real alt text, and the form submission has been tested end to end.

## Common mistakes and how to fix them

Your hero is a slogan nobody can act on

Fix: State what you do, who it is for, and what to do next. 'Excellence in every bite' tells a visitor nothing about whether you can serve them; 'Custom cakes in Lagos, delivered on the day' does the job in one line.

Your button says 'Contact us'

Fix: Name the specific low-risk next step — 'Get a quote' or 'See our prices' — and link it to WhatsApp with a pre-filled message. 'Contact us' promises effort and gets clicked far less.

You hid the prices

Fix: Publish a table of 'from' prices by category. A visitor who cannot find a price often messages a competitor who publishes one, and hiding prices loses more enquiries than it protects.

Your testimonials are vague

Fix: Use real names and quotes describing an outcome or a risk removed. 'Great service, highly recommended' persuades nobody; a specific story about a problem solved persuades strongly.

You used stock photographs of a foreign environment

Fix: Use the business's real work. Nigerian customers respond to work that looks like their own environment, and stock imagery of a European office actively undermines trust.

Your form silently discards messages

Fix: Point it at a real form service or replace it with a WhatsApp link, then submit it yourself and confirm the message arrives. A broken form is worse than none because the business never notices.

Your phone number is only at the bottom of the page

Fix: Repeat the primary contact route in the header and the footer. A visitor who decides to call should never have to hunt for the number.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Lead every small-business contact section with WhatsApp, and pre-fill the message. It removes typing, opens the app the customer already uses, and consistently outperforms a form in Nigeria. It is the single highest-converting element on the page.

- Write the copy before the layout, every time. Sections get rebuilt when the words change, and agreeing the copy first is the largest single time saving available in website work.

- Publish prices, even as 'from' figures. It is the most common omission on Nigerian business sites and the one that costs the most enquiries, and clients are usually persuadable once you explain that a range filters rather than exposes.

- Test the whole page on a real phone over mobile data before delivery. That is the condition almost every Nigerian visitor arrives in, and a page that loads in three seconds on fibre can take thirty on a phone — which is long enough for them to leave.

## Key termsHeroThe top section stating what you do, who it is for and what to do next. Three seconds to do its job.Fragment linkA link to a section on the same page using #section-name. How one-page site navigation works.Click-to-callA tel: link that dials on tap. Essential because most visitors are on a phone.WhatsApp deep linkA wa.me link with a pre-filled message. The highest-converting contact route for a Nigerian business.Social proofTestimonials and portfolio work establishing trust. Specific and attributable beats vague and plentiful.'From' pricingPublishing starting prices by category. Filters enquiries and converts more than hiding prices entirely.One-page siteA single scrolling page. Usually the right answer for a small business: faster, simpler, one path to contact.Service areaWhere the business operates. Customers look for it, and stating it saves unqualified enquiries.

## Homework before the next session

Write the copy for one business first

Hero line, three service descriptions with prices, three testimonials and an about paragraph — all before touching layout. Note how much faster the build becomes.

Audit three Nigerian business sites

Score each on hero clarity, prices published, contact route and load time on mobile data. Write the single highest-impact fix for each.

Build a WhatsApp deep link

Create one with a pre-filled message and test it on your phone. Then put it in the hero, the header and the contact section of a page you built.

Collect three real testimonials

Ask three real customers for a specific sentence about an outcome. Use their actual words and their permission — never a fabricated quote.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Structure | Has the main sections. | Section emphasis derived from the business's stated goal, with a justified one-page or multi-page decision. |
| Hero | Has a hero. | States what, for whom and the next step in plain words, uses min-height, and links a specific-action button to WhatsApp. |
| Conversion content | Services and about are present. | Specific service descriptions with starting prices, a published price table, and a short about aimed at customer confidence. |
| Trust | Has testimonials or a gallery. | Specific attributable testimonials describing outcomes, real work rather than stock imagery, compressed images with real alt text. |
| Contact | Has contact details. | WhatsApp and click-to-call repeated in header, contact and footer, a properly built form with a tested submission target, plus hours and service area. |

## Session questionsDoes a small business really need a website with WhatsApp and Instagram around?+

Yes, for one reason: it is the only channel the business owns. A social account can be suspended or lose reach, and it presents your content in someone else's layout. A website is where a serious customer checks you are real before spending money, and it is what appears in a Google search.One page or several?+

One scrolling page for most small businesses — it loads faster, has no navigation friction on a phone, and keeps one path to contact. Go multi-page when there is genuinely distinct content: a long portfolio, a full menu, or separate service lines that each need their own detail.My client refuses to publish prices. What do I do?+

Explain the cost: a visitor who cannot find a price often messages a competitor who publishes one. If they still refuse, publish 'from' figures by category or a clear statement of what affects price. That is usually enough to keep the enquiry while protecting their flexibility.What should the hero button say?+

The specific low-risk next step: 'Get a quote', 'See our prices', 'Book a consultation'. Avoid 'Contact us', which promises effort. Link it to WhatsApp with a pre-filled message wherever the business handles enquiries there.How long should the page be?+

Long enough to answer the questions a customer has before spending money, and no longer. For most small businesses that is hero, services, prices, proof, brief about, contact. If a section does not move someone toward contacting you, cut it.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: CSS Layout](https://www.cea.ng/classes/web-design/css-layout)[Next session 6: Responsive Design](https://www.cea.ng/classes/web-design/responsive-design)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
