---
title: "Session 8: Publishing & Final Project"
description: "The final session takes a site from your laptop to the internet: domains and how DNS really works, hosting options for a Nigerian business, deploying, connecting a custom domain with HTTPS, and the final project — a live, published website you can show a client."
date: "2026-09-12"
class_slug: "web-design"
---

The final session takes a site from your laptop to the internet: domains and how DNS really works, hosting options for a Nigerian business, deploying, connecting a custom domain with HTTPS, and the final project — a live, published website you can show a client.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain domains, DNS records and what you are actually buying

- Choose a hosting option appropriate to a static business site

- Deploy a site and confirm it is live

- Connect a custom domain with HTTPS correctly

- Set up the practical extras: email, analytics, backups

- Deliver a published site and hand it over properly

## The taught content

### Domains and what you are actually buying

A **domain** is a rented name, not a purchase. You pay a registrar annually — a `.com.ng` or `.ng` domain through a Nigerian registrar such as Whogohost or QServers, a `.com` through any international registrar — and if you stop paying, you lose it and anyone can register it. This is the single most important thing a client needs to understand, because a business that lets its domain lapse loses its email, its search ranking and its links all at once. Set the renewal to auto-renew and make sure the client, not you, holds the account.

Behind the name are **DNS records**, and there are three you need. An **A record** points the domain at a server's IP address. A **CNAME** points a subdomain, such as `www`, at another name — which is what you use when a host gives you a URL like `yoursite.netlify.app`. An **MX record** says where email for that domain should be delivered, which is why changing hosts can break a client's email if the MX records are not carried over. That last one is the mistake that costs real money: a domain moved without the MX records takes the business's email down, and they discover it when a customer's enquiry bounces.

The practical advice is unglamorous and important: keep the domain and the hosting in accounts the client controls, with you added as a collaborator rather than as the owner. A client who cannot access their own domain is a client who cannot leave you, and that is not a foundation anyone should build a business on — professionally or reputationally.

### Hosting: choosing for a static site

A static business site — HTML, CSS, JavaScript, images — needs no server of your own, which makes hosting cheap or free. **Netlify**, **Vercel** and **GitHub Pages** all host static sites on a free tier, deploy in a minute, include HTTPS automatically, and are fast globally because they serve from many locations. For most Nigerian small-business sites this is the right answer, and the cost saving is real: it turns a recurring hosting bill into zero.

**Shared hosting** — the cPanel-style hosting sold widely in Nigeria — is what most local clients already have or expect, and it works fine: you upload the files over FTP or through a file manager. It is slower to deploy and less reliable than a modern static host, but it is familiar, it is cheap, and it lets the client keep email on the same account, which simplifies things. **WordPress hosting** is a different thing again and belongs to the WordPress course.

Choose based on the client, not on your preference. If they have no infrastructure, put them on a free static host and register the domain separately. If they already have hosting and email with a Nigerian provider, deploy there rather than adding a second bill and a second thing to manage. Explain the trade-off in one sentence and let them decide; a client who understands why their site is on a free host is a client who does not panic when they see the invoice is zero.

### Deploying and connecting the domain

On a static host the deploy is genuinely simple: drag the project folder onto the host's dashboard, or connect a Git repository so every push redeploys automatically. The site is live within a minute at a temporary URL such as `yoursite.netlify.app`. Test it there before connecting a domain, because it is much easier to debug on a URL you control than on a domain whose DNS is mid-change.

Connecting the custom domain is a DNS change made at the **registrar**, not at the host. You add an A record or a CNAME pointing at the host's stated address, and then you wait — DNS changes propagate over minutes to hours, occasionally longer, and during that window some visitors see the old site and some the new. Nothing is broken; it is genuinely gradual. Check progress with `nslookup yourdomain.com` and you will see the answer change when it takes effect.

Then confirm **HTTPS**. Every modern static host issues a certificate automatically once the domain resolves, and you should also set the redirect so `http://` and `www` both land on one canonical address — otherwise the same page exists at four URLs, which splits search ranking and confuses analytics. Test the padlock in the browser and confirm it does not warn. A site showing 'Not secure' loses Nigerian customers immediately, because they have been taught correctly to distrust it.

### The practical extras that get forgotten

**Email** is the one that causes trouble. If the domain moves, the MX records must move with it or the business's email stops. Where the client uses Google Workspace or Microsoft 365, those providers publish the exact MX records to set; copy them precisely. Then send a test message to the address and confirm it arrives, because a bounced customer enquiry is a silent loss that can continue for weeks.

**Analytics** should be added before launch, not after, because you cannot recover data you did not collect. A free tool such as Google Analytics or a lightweight privacy-respecting alternative gives the client real numbers, and session five of Social Media Management covered how to read them. Add it once, in the head, and confirm it records your own visit.

**Backups** are the discipline that saves a business. Keep the source files in a Git repository — which is a complete history and costs nothing — and keep a copy of anything the client edits themselves. If the site is on shared hosting, download a copy quarterly. A client who edits their own prices on a live server with no backup is one accidental deletion away from a rebuild.

Finally, **a Google Business Profile**. For a local Nigerian business this is often worth more than the website, because it is what appears in a map search with the phone number, hours and photographs. Set it up, verify it, and make sure the name, address and phone number match the website exactly — inconsistency between the two confuses search engines and costs local ranking.

### The final project and the handover

The deliverable is a live, published website for a real business: planned from a stated goal, built with semantic HTML and clean CSS, responsive from 360 pixels up, accessible and fast, with a WhatsApp-first contact route, published on a custom domain with HTTPS, analytics recording, and the client able to edit their own content.

Present it as a case study rather than a URL. Show the goal, the structure decision, the mobile and desktop views, the measured page weight and load time on mobile data, and the accessibility and SEO checks you ran. Those specifics are what distinguish you from the large number of people who can put a template online, and they are what justifies a professional fee rather than a template price.

The handover is the last and most undervalued part: the domain and hosting accounts in the client's name with you added as a collaborator, a plain-language note explaining how to change a price or a photograph and what not to touch, the analytics login, and a short maintenance agreement if you are offering one. A website is not a product you deliver once; it is something a business lives with for years, and the quality of the handover is what determines whether that relationship continues.

## Instructor demonstration

The instructor deploys the business site live on a static host, connects a custom domain, configures DNS and HTTPS, sets up email and analytics, then runs the final handover and reviews student sites live on the internet.

### Explain what a domain is

Show a registrar's renewal page and explain that a domain is rented annually, and that lapsing it takes email, ranking and links down together. Set auto-renew.02

### Read the DNS records

Run nslookup on a real domain and identify the A record. Show a CNAME and an MX record and explain what each governs, particularly why MX matters when moving hosts.03

### Choose a host for this client

Compare a free static host with shared cPanel hosting for this business, and justify the choice from what the client already has. Explain the trade-off in one sentence.04

### Deploy to the temporary URL

Drag the folder onto the host and open the generated URL. Test the whole site there before touching DNS, explaining why that order matters.05

### Connect the custom domain

Add the A record or CNAME at the registrar using the host's stated value. Show exactly which field to change and warn that propagation takes time.06

### Watch propagation

Run nslookup repeatedly and show the answer changing. Explain that mixed results during this window are normal rather than broken.07

### Confirm HTTPS

Check the certificate issued automatically and confirm no browser warning. Explain that a 'Not secure' label loses Nigerian customers immediately.08

### Set the canonical redirect

Configure http and www to redirect to one address. Explain that four URLs for one page splits search ranking and confuses analytics.09

### Carry over the email MX records

Copy the provider's MX records precisely, send a test message, and confirm arrival. Explain that a bounced enquiry is a silent loss lasting weeks.10

### Add analytics

Insert the tracking snippet in the head, confirm it records a visit, and hand the login to the client. Explain that data not collected cannot be recovered.11

### Set up backups and a Business Profile

Confirm the source is in a Git repository, set a quarterly download habit, and create the Google Business Profile with details matching the site exactly.12

### Run the final handover

Confirm the accounts are in the client's name with you as collaborator, hand over the plain-language editing note, and review two student sites live on the internet.

## Guided practice

### The final project: publish a real website

You take a real business site from planning to live on the internet: built to standard, deployed, connected to a custom domain with HTTPS, with email working, analytics recording, backups in place, and a complete client handover.

1. 01Write the business's goal in one line and let it determine the structure.

2. 02Build the site semantically with an external stylesheet and no inline styles.

3. 03Make it responsive mobile-first, working at 360 pixels with content-driven breakpoints.

4. 04Run the accessibility pass: visible focus, heading outline, alt text, contrast at 4.5:1, labelled fields.

5. 05Write titles and meta descriptions naming business, service and location.

6. 06Compress images and confirm page weight is under about two megabytes.

7. 07Confirm every tap target is at least 44 pixels and the WhatsApp link has a pre-filled message.

8. 08Deploy to a static host and test the full site at the temporary URL.

9. 09Register or use a custom domain, confirming it is in the client's name with auto-renew on.

10. 10Add the DNS records at the registrar and monitor propagation with nslookup.

11. 11Confirm HTTPS with no browser warning, and set the canonical redirect.

12. 12Carry over or set the MX records and send a test email to confirm delivery.

13. 13Add analytics and confirm it records a visit.

14. 14Put the source in a Git repository and set a backup habit.

15. 15Create the Google Business Profile with details matching the site exactly.

16. 16Write the handover note and confirm the client controls both accounts.

The standard we hold you to

A live site on a custom domain with valid HTTPS, built semantically and responsive from 360 pixels, passing the accessibility and performance checks, with a WhatsApp-first contact route, working email, analytics recording, the source under version control, a Business Profile matching the site, and both accounts held by the client with a plain-language handover note.

## Common mistakes and how to fix them

The client's domain is registered in your name

Fix: Register it in the client's name with you added as a collaborator. A client who cannot access their own domain cannot leave you, and that is not a foundation for a professional relationship or a reputation.

You moved the domain and the client's email stopped

Fix: MX records govern email delivery and they do not move automatically. Copy the provider's records precisely, send a test message, and confirm it arrives before considering the migration done.

You connected the domain before testing the site

Fix: Deploy and test at the temporary URL first. Debugging on a URL you control is far easier than on a domain whose DNS is mid-change and showing different things to different visitors.

You panicked during DNS propagation

Fix: It takes minutes to hours and mixed results are normal. Check with nslookup and wait. Nothing is broken, and changing records repeatedly makes it worse rather than faster.

Your site shows 'Not secure' in the browser

Fix: HTTPS is not configured or the certificate has not issued. Every modern static host issues one automatically once the domain resolves, and a 'Not secure' label loses Nigerian customers immediately.

The same page exists at four URLs

Fix: Set http and www to redirect to one canonical address. Otherwise search ranking is split across four versions and analytics under-reports, and both are invisible until you look.

You launched with no analytics

Fix: Add it before launch. You cannot recover data you did not collect, and a client asking 'is it working?' in month two deserves a real answer rather than an opinion.

The client edits the live site with no backup

Fix: Keep the source in Git and download a copy quarterly. A client editing prices on a live server with no backup is one accidental deletion away from a full rebuild.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Keep every domain and hosting account in the client's name with you as a collaborator, without exception. It is the professional standard, it protects the client, and it protects you from being the person who 'locked them out' when a relationship ends.

- Test at the temporary URL before touching DNS, every time. Debugging a live domain mid-propagation is genuinely difficult because different visitors see different things, and there is no reason to make your own life harder.

- Set auto-renew on every domain you touch and tell the client you have done it. A lapsed domain takes a business's email, links and search ranking down at once, and it is entirely preventable with one setting.

- Offer a maintenance agreement rather than disappearing at handover. Websites need updates, and a small monthly fee for backups, small edits and an annual check is both real income and the reason a client comes back for the next site.

## Key termsRegistrarWhere a domain is rented annually. Lapsing it loses email, links and ranking together.A recordThe DNS record pointing a domain at a server's IP address.CNAMEA DNS record pointing one name at another — used for www, or to point at a host's URL.MX recordThe DNS record saying where a domain's email is delivered. Must be carried over when hosts change.PropagationThe period, minutes to hours, during which a DNS change spreads. Mixed results are normal.HTTPSAn encrypted connection with a browser-verified certificate. Issued automatically by modern static hosts.Canonical redirectSending http and www to one address so a page does not exist at four URLs, splitting ranking.Google Business ProfileThe map listing with phone, hours and photos. For a local business it often outperforms the website itself.

## Homework before the next session

Publish one site live

Deploy anything you have built to a free static host and open it on your phone. The first time your own work is on the internet changes how you think about it.

Read the DNS for three domains

Run nslookup on three real Nigerian business domains and identify the A record, any CNAME and the MX records. This makes the invisible machinery concrete.

Compare two hosting options for one client

Write a one-paragraph recommendation comparing a free static host with shared cPanel hosting for a real business, and justify it from what they already have.

Write your handover template

A plain-language note covering how to change a price and a photograph, what not to touch, where the accounts are and who to call. Reuse it on every project.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Site quality | The site is built and works. | Semantic, responsive from 360 pixels, accessible and under about two megabytes, with a WhatsApp-first contact route and correct titles. |
| Deployment | The site is online. | Tested at the temporary URL first, then deployed with the canonical redirect set and HTTPS confirmed with no warning. |
| Domain and DNS | A domain is connected. | Records set correctly at the registrar, propagation understood and monitored, MX records carried over and email verified with a test message. |
| Operations | The site runs. | Analytics recording, source under version control, a backup habit set, and a Google Business Profile matching the site exactly. |
| Handover | The client has the site. | Both accounts in the client's name with auto-renew, you as collaborator, a plain-language editing note, and a maintenance option offered. |

## Session questionsHow much does it cost to put a Nigerian business online?+

A `.com.ng` domain is a few thousand naira a year, hosting a static site on Netlify, Vercel or GitHub Pages is free, and a Google Business Profile is free. So the running cost is essentially the domain. Shared cPanel hosting, if the client prefers it, adds a modest annual fee and often bundles email.Should the domain be in my name or the client's?+

The client's, always, with you added as a collaborator. A client who cannot access their own domain cannot leave you, and being the person who 'locked them out' is a reputation you cannot afford in a market where everyone knows everyone.How long does DNS take?+

Minutes to hours, occasionally longer. Mixed results during that window are normal — some visitors see the old site, some the new. Check with nslookup and wait; changing records repeatedly makes it slower rather than faster.Do I need to buy SSL?+

No. Every modern static host issues a certificate automatically once the domain resolves, and most shared hosts now offer free Let's Encrypt certificates. A site showing 'Not secure' loses Nigerian customers immediately, so confirm the padlock before handover.What do I charge for a business website?+

Price the outcome and the ongoing value, not the hours: a custom site that produces enquiries is worth far more than the time it took. Charge a build fee plus an optional monthly maintenance fee, and be clear about what maintenance covers. Business & Freelancing covers pricing strategy in depth.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session7: Quality: UX, Accessibility & SEO](https://www.cea.ng/classes/web-design/quality-ux-accessibility-seo)[Course complete Back to Web Design](https://www.cea.ng/classes/web-design)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
