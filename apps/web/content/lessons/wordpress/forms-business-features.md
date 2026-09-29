---
title: "Session 5: Forms & Business Features"
description: "The features that make a website do business — a contact form that actually reaches someone, a WhatsApp button, basic e-commerce, SEO settings and analytics — installed in a way that keeps the site fast and honest."
date: "2026-09-12"
class_slug: "wordpress"
---

The features that make a website do business — a contact form that actually reaches someone, a WhatsApp button, basic e-commerce, SEO settings and analytics — installed in a way that keeps the site fast and honest.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Build a contact form that delivers reliably and does not attract spam

- Add WhatsApp contact in the way Nigerian customers actually use it

- Set up basic WooCommerce for a small catalogue with enquiry-style checkout

- Configure SEO titles, descriptions and an XML sitemap correctly

- Install analytics that tells the client something true about their traffic

## The taught content

### A contact form's job is to deliver, and most of them quietly do not

The contact form is the highest-stakes small feature on a business site, because it is the moment a prospect hands you their details. The most common failure is not a broken layout — it is a form that **submits successfully, shows a thank-you message, and never arrives**. The site owner believes enquiries are simply not coming. Weeks of lost business, no error anywhere, because the server accepted the form and then failed to send the email.

The usual cause is email delivery. WordPress sends mail through PHP's mail function by default, and on shared hosting that mail is frequently rejected, filtered, or silently dropped — especially when the From address does not match the sending domain. The fix is to send through **SMTP with proper authentication**, using the client's real mailbox credentials, so the mail leaves through a server that is authorised to send for that domain.

The second failure is spam. An unprotected public form will be found and abused within days, filling the client's inbox with junk and potentially getting their domain blacklisted for sending it. **Anti-spam is not optional**; it is part of the form working. We will use a honeypot field plus a challenge where appropriate, and we will test that real submissions still get through — a form so aggressive it blocks genuine customers is a worse failure than one that lets some spam through.

### WhatsApp is not a nice-to-have in Nigeria — it is the contact channel

This is one of the clearest places where copying an American or European tutorial produces the wrong product. In the markets this course serves, a large share of customer conversations happen on **WhatsApp**, not by email. A Nigerian small business owner may check email weekly but answers WhatsApp within minutes. A site that offers only a contact form is asking customers to use the channel the owner responds to most slowly.

So the right implementation is a **persistent WhatsApp button** with a pre-filled message, wired to the business's actual number. The customer taps it, lands in WhatsApp with a message already written — something like 'Hello, I would like to ask about your dining tables' — and sends it. The friction is close to zero, and the business owner receives it on the phone they already carry.

Two details matter. The number must be in **international format** without spaces or the leading zero, or the link will not resolve. And the pre-filled message should be useful rather than empty, because it prompts the customer to say what they want instead of sending a bare 'hi' that starts the conversation from nothing. We will also keep the contact form, because some customers — and most corporate ones — genuinely prefer email, and because a form gives you a record.

### Basic e-commerce, sized honestly to the business

WooCommerce turns WordPress into a shop, and it is powerful enough to run a serious retail operation. For a small furniture maker, the honest scope is much narrower, and getting that scope right is the skill. What this business needs is: **a catalogue of products with real prices, an order mechanism, and a record of who ordered what.** What it does not need on day one is inventory sync, multi-currency, subscription billing, or a warehouse integration.

Payment deserves a candid conversation. Card payments through Nigerian processors work, but they add fees, require business verification, and introduce a failure mode where a customer's payment does not complete and the order state becomes confusing. For a business selling items at ₦400,000, a **bank-transfer or pay-on-delivery** flow is frequently the right first version: the customer places an order, the site records it, and the business calls to confirm and arrange payment. That is not a compromise — it matches how the business already sells.

Whatever you choose, **configure tax and shipping deliberately**. WooCommerce defaults are generic, and a shop showing free shipping to every state when delivery to Maiduguri costs real money creates exactly the kind of dispute you want to avoid. Set shipping by zone, be explicit about Lagos versus elsewhere, and make the price the customer sees the price they pay.

### SEO settings are mostly about titles, descriptions and not being broken

An SEO plugin does not make a site rank. What it does is give you reliable control over the things search engines read directly: the **title tag**, the **meta description**, the **canonical URL**, the **XML sitemap**, and structured data. Getting those right is worth doing; believing a plugin is a substitute for useful content is how budgets get wasted.

The practical work is per page. Every page needs a **title under about 60 characters** that describes it accurately, and a **meta description of roughly 150 characters** that reads like an honest advertisement for the page — because that is what appears in results, and a truncated or auto-generated one looks careless. Set these for Home, About, each product child page, and each blog post.

Then the two things that actually cause damage if missed. First, the **Search engine visibility** checkbox from session one must be **unticked at launch**, or the entire site is excluded from indexing and every other SEO effort is wasted. Second, the **XML sitemap** must be submitted so new content is discovered promptly. Both are thirty-second tasks with disproportionate consequences, and both belong on your launch checklist rather than in your memory.

### Analytics exists to change a decision, not to produce a dashboard

Most clients will never open an analytics report, and installing one because a checklist says so is a poor use of the build. The honest framing is that analytics answers a small number of specific questions: **where do visitors come from, which pages do they read, what do they do next, and where do they leave?** If you cannot name a decision the answer would change, you do not need the report.

For this business, three numbers matter. **Which pages get traffic** tells you whether the blog is working. **Where enquiries originate** tells you whether the WhatsApp button or the form is doing the work. **Which pages people leave from** tells you where the site fails to convince. That is a useful weekly glance, and it is enough.

Two obligations come with it. **Consent and privacy** — Nigeria's **NDPA 2023** governs personal data processing, and if you are collecting identifiable information you should be able to say what you collect and why, which is what a privacy page is for. And **accuracy** — a tracking snippet installed twice double-counts everything, which is worse than no data because it is confidently wrong. Verify the count matches reality before you show anyone a number.

## Instructor demonstration

We make the furniture site capable of doing business: a reliable contact form, a WhatsApp button, a small WooCommerce catalogue, correct SEO settings, and analytics that reports something true.

### Install a form plugin after evaluating it

**Plugins → Add New**, search for a maintained form plugin, check active installs, last update, compatibility and recent critical reviews — then install and activate. Narrate the evaluation; this is the habit from last session applied again.02

### Build the contact form

Create a form with **Name**, **Email**, **Phone**, **What are you looking for?** as a dropdown of the furniture categories, and **Message**. Mark name, email and message required; phone optional, because requiring it loses enquiries.03

### Set the recipient and a useful subject line

Point submissions at the client's real mailbox, and set the subject to include the enquiry type so the inbox is sortable — for example **Website enquiry: Dining tables**. Set the From address to an address on the site's own domain, which is what makes delivery work.04

### Configure SMTP so mail actually sends

Install an SMTP plugin and enter the client's real mail server, port and credentials. Send a test message and confirm it arrives. This is the step that separates a working form from one that silently loses enquiries.05

### Add spam protection that does not block real customers

Enable a **honeypot** field, which is invisible to humans and traps bots. Add a challenge only if spam persists. Then submit a genuine test enquiry and confirm it arrives — protection that blocks real customers is a worse failure than some spam.06

### Place the form and write the message above it

Insert the form block on the Contact page, and write two lines telling people what happens next: **Tell us what you need and we will reply within one working day.** Setting that expectation reduces duplicate enquiries and abandoned ones.07

### Add the WhatsApp button with a correctly formatted number

Use a WhatsApp plugin or a simple link of the form **https://wa.me/2348012345678?text=...** — note **234** for Nigeria and **no leading zero, no spaces, no plus sign**. A wrongly formatted number produces a link that goes nowhere, which is worse than no button.08

### Pre-fill a useful message

Set the pre-filled text to something like **Hello, I would like to ask about your furniture.** An empty message invites a bare 'hi' that starts the conversation with nothing; a useful prompt gets you to the actual question faster.09

### Test WhatsApp on a real phone

Tap the button on a physical handset, not in the desktop preview. Confirm WhatsApp opens with the right number and the message pre-filled. Then keep the button visible but unobtrusive — it should not cover the content on mobile.10

### Install WooCommerce for a small catalogue

Install and run the setup wizard, choosing **Nigeria** as the country and **Naira (₦)** as the currency. Decline the extras it offers — marketing services, additional payment gateways you have not evaluated — and keep the install lean.11

### Add four products with real prices

Six-seater teak dining table, four-seater dining set, coffee table, and a bookshelf. Each with a clear photo, a genuine description covering dimensions and wood, and a real naira price. Products are the pages most likely to be shared, so they must be accurate.12

### Choose a checkout that matches how the business actually sells

Enable **bank transfer** and **pay on delivery** rather than forcing card payment. For high-value furniture this matches the real sales process: the customer orders, the business calls, payment is arranged. Explain this trade-off to the client explicitly rather than deciding silently.13

### Set shipping zones deliberately

Create a **Lagos** zone with a realistic flat rate and an **Other states** zone priced honestly, or marked as 'we will confirm delivery cost'. Do not leave the default free shipping — it creates disputes the moment somebody orders from far away.14

### Place an end-to-end test order

Add an item to the cart, check out with bank transfer, and confirm the order appears in **WooCommerce → Orders** and that the notification email arrives. Then mark it cancelled so it does not pollute real data.15

### Configure SEO titles and descriptions page by page

Using the SEO plugin's panel on each page, write a title under 60 characters and a meta description around 150 that reads like an honest summary. Do Home, About, each product, and each blog post. Watch the preview snippet as you write.16

### Verify the sitemap and the visibility checkbox

Open the generated sitemap URL and confirm it lists your pages and posts. Then go to **Settings → Reading** and confirm **Discourage search engines** is now **unticked**. These two checks are the difference between a site that gets indexed and one that does not.17

### Install analytics once, and verify it counts correctly

Add the tracking snippet a single time — installing it twice double-counts everything. Load a page, confirm one pageview is recorded rather than two, and check that your own test visits are not inflating the numbers.18

### Add a privacy page and link it

Write a plain-language page stating what you collect through the form and analytics, why, and how to request removal — consistent with Nigeria's **NDPA 2023**. Link it in the footer. It is short, and it is the kind of thing clients are grateful for later.19

### Full functional pass before moving on

Submit a form enquiry and confirm delivery. Tap WhatsApp on a phone. Place and cancel a test order. Check every page's title in the browser tab. Confirm analytics recorded the activity without doubling. Anything that fails gets fixed now, not after launch.

## Guided practice

### Make your project site capable of doing business

Add a reliable contact form, WhatsApp contact, a small product catalogue, correct SEO settings, and analytics to your own WordPress project.

1. 01Install a form plugin after checking its install count, last update, compatibility and recent critical reviews.

2. 02Build a contact form with name, email, optional phone, an enquiry-type dropdown, and a message field.

3. 03Set the recipient to a real mailbox, an informative subject line, and a From address on the site's own domain.

4. 04Configure SMTP with real credentials and send a test message that you confirm actually arrives.

5. 05Enable honeypot spam protection, then submit a genuine enquiry to prove real submissions still get through.

6. 06Add a WhatsApp link using **234** followed by the number with no leading zero, spaces, or plus sign, and pre-fill a useful message.

7. 07Test the WhatsApp button on a physical phone, not just the desktop preview.

8. 08Install WooCommerce, set the country to Nigeria and currency to Naira, and decline the extras.

9. 09Add four products with genuine descriptions, dimensions and naira prices.

10. 10Choose a checkout method that matches how the business really sells — bank transfer or pay on delivery is often correct for high-value goods.

11. 11Configure shipping zones for Lagos and other states with honest rates rather than leaving free shipping as the default.

12. 12Place a test order end to end, confirm it appears in Orders and the email arrives, then cancel it.

13. 13Write an SEO title under 60 characters and a meta description around 150 for every page and post.

14. 14Confirm the XML sitemap lists your content and that **Discourage search engines** is unticked.

15. 15Install analytics exactly once and verify a single page load records one pageview, not two.

16. 16Publish a short plain-language privacy page and link it in the footer.

The standard we hold you to

A contact form whose test submission provably arrives via SMTP with spam protection that still lets genuine enquiries through; a WhatsApp button tested on a physical phone with a correctly formatted number and useful pre-filled message; a small WooCommerce catalogue with real naira prices, a checkout matched to the real sales process, and honest shipping zones; SEO titles and descriptions on every page; a confirmed sitemap and unticked visibility box; analytics installed once and verified not to double-count; and a linked privacy page.

## Common mistakes and how to fix them

A form that shows 'thank you' but never delivers

Fix: The default PHP mail path is unreliable on shared hosting. Send through authenticated **SMTP** with a From address on the site's own domain, and always send a test you confirm arrives.

Offering only email contact in a WhatsApp-first market

Fix: Add a persistent WhatsApp button with a pre-filled message. The business owner answers WhatsApp in minutes and email in days — meet customers on the channel they actually use.

A WhatsApp number formatted with a leading zero or spaces

Fix: Use international format: **234** then the number, no plus, no spaces, no leading zero. A malformed link silently goes nowhere, which is worse than having no button.

Forcing card payment on high-value goods

Fix: For furniture, bank transfer or pay on delivery usually matches how the business sells. Card payment adds fees, verification and confusing failed-payment states. Discuss it with the client rather than deciding silently.

Leaving WooCommerce's default free shipping

Fix: Set shipping zones with honest rates for Lagos and other states, or state that delivery cost will be confirmed. Free shipping to every state creates a dispute the first time somebody orders from far away.

Believing an SEO plugin improves rankings

Fix: It controls titles, descriptions, canonicals and the sitemap — nothing more. Rankings come from useful content and a site that works. Configure it properly and do not oversell it to the client.

Installing the analytics snippet twice

Fix: Double installation double-counts every visit, which is worse than no data because it is confidently wrong. Verify one page load records exactly one pageview before showing anyone a number.

Collecting personal data with no privacy statement

Fix: Nigeria's **NDPA 2023** governs personal data processing. Publish a short plain-language page saying what you collect, why, and how to request removal, and link it in the footer.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Test the contact form from an outside email address, not from the site's own domain. Mail from your own domain to your own domain often succeeds while external delivery fails — which is precisely the case that matters, because your customers are external.

- WhatsApp integration is the clearest example in this course of why local knowledge beats copying tutorials. A site built to an American template offers email and a phone number; a site built for a Nigerian SME offers WhatsApp, and the difference shows up directly in enquiry volume.

- Scope e-commerce to what the business does today. A catalogue with an enquiry-style checkout can be live this week; a full card-payment operation needs business verification, fee agreements and reconciliation processes that are not part of a three-week build. Say so early rather than over-promising.

- The launch checklist earns its keep on two items: the **Search engine visibility** checkbox and the **XML sitemap** submission. Both take seconds, both are invisible when missed, and both silently undo every other SEO decision you made.

## Key termsSMTPAuthenticated mail sending through a real mail server. The reliable way for a WordPress form to deliver, where the default PHP mail function frequently fails silently.Honeypot fieldA form field hidden from humans but visible to bots. Any submission that fills it is spam, giving protection without presenting a challenge to real visitors.wa.me linkThe WhatsApp click-to-chat URL format, using international number format and an optional pre-filled message parameter.WooCommerceThe standard e-commerce plugin for WordPress, turning it into a shop with products, cart, checkout and order management.Shipping zoneA geographic region with its own delivery rules and pricing. Configuring zones honestly prevents disputes over delivery cost.Meta descriptionA roughly 150-character summary shown under a page's title in search results. It does not affect ranking directly but strongly affects whether people click.XML sitemapA machine-readable list of a site's pages that helps search engines discover content promptly. It should be submitted after launch.NDPA 2023Nigeria's Data Protection Act, governing the processing of personal data — the legal basis for publishing a privacy statement when you collect enquiries.

## Homework before the next session

Prove your contact form works from outside

Submit an enquiry from an email address that is not on the site's domain and confirm it arrives in the client mailbox. Screenshot both ends. This single test catches the most common silent failure on a business site.

Add WhatsApp and test it on a phone

Implement a persistent WhatsApp button with a correctly formatted number and useful pre-filled message, then verify on a physical handset that it opens the right conversation.

Build the small shop

Four products with real naira prices, a checkout matched to how the business sells, honest shipping zones, and one completed-then-cancelled test order proving the flow works end to end.

Write the client's launch checklist

Every check from this session as a list the client or you can run on launch day — visibility checkbox, sitemap submission, form test, WhatsApp test, test order, analytics verified single-count, privacy page linked.

## Assessment rubric

How this session is marked. The certificate for WordPress is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Contact form reliability | A form exists and submissions reach an inbox. | SMTP configured and verified from an external address, honeypot protection active, real submissions proven to pass, and an expectation-setting message above the form. |
| Local contact channels | A WhatsApp button is present. | Number correctly formatted in international form, useful pre-filled message, tested on a physical phone, positioned so it does not obstruct content on mobile. |
| E-commerce scope | WooCommerce installed with some products. | Catalogue sized honestly to the business, checkout matched to the real sales process, shipping zones priced deliberately, and a test order completed then cancelled. |
| SEO configuration | An SEO plugin is installed. | Per-page titles under 60 characters and descriptions around 150, sitemap confirmed, **Search engine visibility** unticked, and no over-claiming about rankings. |
| Analytics and privacy | Analytics installed. | Installed exactly once and verified not to double-count, with a plain-language privacy page linked in the footer consistent with NDPA 2023. |

## Session questionsWhy did my contact form work in testing but not for customers?+

Usually because you tested from the same domain, where delivery often succeeds while external delivery fails. Always test from an outside email address — your customers are external, and that is the path that must work.Do I really need WhatsApp if there is already a form?+

In the Nigerian market, yes. Business owners typically answer WhatsApp within minutes and email within days. Keep both — some customers and most corporate ones prefer email — but do not rely on the form alone.Should a small business take card payments from day one?+

Often not. For high-value goods, bank transfer or pay on delivery matches the real sales process and avoids fees, verification delays and confusing failed payments. Add cards later once the process is documented.Will the SEO plugin get my client to page one?+

No. It controls titles, descriptions, canonicals and the sitemap. Rankings come from genuinely useful content and a site that works properly. Anyone promising page one from a plugin setting is selling something.Is a privacy page legally required?+

Nigeria's NDPA 2023 governs personal data processing, and if you collect identifiable information through a form or analytics you should be able to explain what and why. A short plain-language page linked in the footer is the practical answer.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Blog & Plugins](https://www.cea.ng/classes/wordpress/blog-plugins)[Next session 6: Security, Backups & Launch](https://www.cea.ng/classes/wordpress/security-backups-launch)

WordPress

3 weeks · 6 sessions · ₦40,000 · you leave with a live business website[See the full course](https://www.cea.ng/classes/wordpress)[Enrol now](https://www.cea.ng/admissions)
