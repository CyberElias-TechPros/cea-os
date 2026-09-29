---
title: "Session 6: Security, Backups & Launch"
description: "The session that protects everything you built: security basics, backups that are proven to restore, update discipline, performance fundamentals — and a launch and handover process that leaves the client genuinely able to run their own site."
date: "2026-09-12"
class_slug: "wordpress"
---

The session that protects everything you built: security basics, backups that are proven to restore, update discipline, performance fundamentals — and a launch and handover process that leaves the client genuinely able to run their own site.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Apply practical WordPress security that addresses how sites are actually compromised

- Build a backup routine and prove it restores, rather than assuming it works

- Run updates safely, including why a staging copy changes the risk completely

- Apply the performance fixes that matter most on a shared-hosting budget

- Execute a launch checklist and hand over documentation the client can actually use

## The taught content

### How WordPress sites actually get compromised — which is not how people imagine

The popular image is a skilled attacker crafting an exploit. The reality is far more mundane and therefore far more preventable. Most compromises come from a small set of causes: **a weak or guessed administrator password**, **an outdated plugin or theme with a known vulnerability**, **nulled software carrying a deliberate backdoor**, and **credentials reused from another site that was breached**. Automated bots attempt login on essentially every WordPress site on the internet, continuously, within hours of launch.

This is encouraging, because each cause has a cheap countermeasure. Use a **long unique administrator password** stored in a password manager, and never name the account `admin`. **Update plugins, themes and core promptly**, because most exploited vulnerabilities are ones that were patched publicly and then attacked in the window before sites updated. **Never install nulled software**, which we covered last session. And **enable two-factor authentication**, which defeats credential guessing almost entirely regardless of password strength.

Then two smaller measures that carry real weight. **Change the default database table prefix** during installation, which raises the bar for automated SQL injection attempts. And **limit login attempts**, which slows brute-force guessing to the point of impracticality. None of this requires expertise; it requires doing the boring things consistently, which is exactly what separates a site that survives from one that does not.

### A backup you have never restored is a hope, not a backup

This is the single most important sentence in the course, and it is worth being blunt about. A backup plugin showing a green tick tells you a file was written. It tells you nothing about whether that file can rebuild your site. **The only evidence that a backup works is a successful restore**, and most people never perform one until the day they desperately need it — which is precisely when they discover it does not work.

A proper routine has three properties. It is **automated**, because a backup you must remember to take will be missing on the day you need it. It is **off-server**, because a backup stored on the same server as the site is destroyed by the same disk failure, the same compromised account, or the same hosting suspension. And it is **periodically test-restored**, on a scratch installation, to prove it actually rebuilds the site.

The schedule should match how much work you would lose. For a business site changing weekly, a **daily database backup and weekly full-file backup** is a reasonable baseline, with an extra manual backup taken before any significant change — a theme switch, a major plugin update, a redesign. That last habit costs a minute and has saved more sites than any security plugin, because it means a mistake is a rewind rather than a rebuild.

### Updates are necessary and occasionally dangerous, and staging removes the danger

Not updating is the most common cause of compromise, so updates are not optional. But updating is also how working sites break: a plugin release changes behaviour, a theme update overwrites a customisation, or a PHP version bump deprecates a function a plugin still uses. The tension is real, and the resolution is not 'update less' — it is **update somewhere that is not the live site first**.

A **staging copy** is a duplicate of the site at a separate address, where you apply updates, click through the important pages, and only then apply the same updates to production. Many hosts provide one-click staging; if yours does not, a backup-and-restore to a subdomain achieves the same thing. The additional time is minutes. The alternative is discovering the breakage when a customer does, on a Friday evening, with the client calling.

The sequence that works is boring and repeatable. **Back up. Update on staging. Test the critical paths — home, a product page, the form, checkout. Then update production and test again.** Batch updates rather than doing them one at a time over weeks, and never update immediately before a deadline or a campaign, when a surprise costs the most.

### Performance on a shared-hosting budget: the few things that actually matter

Performance advice online is often written for sites with engineering teams. For a small business site on shared hosting, the highest-value interventions are unglamorous and mostly about **not sending enormous files to a phone on a metered connection in Lagos**. That framing matters, because your visitor's experience is shaped by their network as much as by your server.

Three things dominate. **Images** — compress before upload, serve appropriately sized files, and let a caching plugin generate smaller variants. This is usually most of the weight on a page. **Caching** — a page-caching plugin stores the generated HTML so the server does not rebuild every page for every visitor, which on shared hosting is often a several-fold improvement. And **plugin count** — every active plugin adds work to every request, which is why the discipline from last session pays off here.

Then two smaller wins with real effect: **enable compression** so text assets are transferred smaller, and **lazy-load images below the fold** so the initial page arrives faster. Measure before and after with a real tool rather than guessing — a number that improves from four seconds to one and a half is worth more than any amount of confident opinion, and it is the kind of evidence a client understands.

### Launching and handing over: the difference between a finished site and an abandoned one

Launch is not pressing a button; it is a sequence, and skipping steps is how a completed project turns into an emergency. The critical items are: **untick Discourage search engines** — the most expensive checkbox in WordPress; **submit the XML sitemap**; **test every form from an external address**; **test the WhatsApp button on a real phone**; **verify HTTPS works on every page**; **confirm backups are running**; and **check the site on a physical phone**, because that is how most visitors will see it.

Handover matters as much as launch, and it is where most freelancers under-deliver. The client needs three things. **Credentials, delivered securely** — never the admin password in a plain WhatsApp message; use a password manager's sharing feature or a one-time secret link. **A short written guide** covering how to publish a post, add a product, update a price, and check enquiries, written for someone who has never seen the dashboard. And **an explicit statement of what maintenance they are responsible for**, including updates and backups, so nobody assumes the other party is doing it.

Finally, agree the relationship in writing before you finish. Who applies updates? What happens if the site is hacked? What does a change cost? A three-line maintenance agreement prevents the most common freelance dispute — the client believing support was included, and you believing it was not. **Finish the project by defining what happens next**, and both of you will be happier in six months.

## Instructor demonstration

We secure the furniture site, prove its backups restore, apply the performance work that matters, then run a full launch checklist and produce the handover pack.

### Audit the administrator account first

Confirm the admin username is **not** `admin`, that the password is long and unique and stored in a password manager, and that no unexpected administrator accounts exist under **Users**. An extra admin account you did not create is an emergency, not a curiosity.02

### Enable two-factor authentication

Install a maintained 2FA plugin and enrol the administrator account using an authenticator app. This defeats credential guessing regardless of password strength and is the single highest-value security step available.03

### Limit login attempts

Configure the security plugin to throttle repeated failed logins. Automated bots try every site continuously; making guessing slow and noisy removes most of the practical risk at no cost.04

### Check file permissions and remove what is not needed

Confirm directories are 755 and files 644, delete the unused default themes, remove **Hello Dolly** and any sample content, and delete unused plugins rather than leaving them deactivated — deactivated code can still be exploited.05

### Set up automated off-server backups

Install a backup plugin and schedule a **daily database backup** and **weekly full backup**, stored somewhere other than the same server — an object storage bucket or a cloud drive. A backup on the same disk dies with the disk.06

### Prove the backup restores — the step everyone skips

Download the latest backup, restore it into a scratch WordPress installation on a subdomain or local environment, and confirm the site comes back with its content, theme and settings intact. **Until you have done this, you do not have a backup; you have a file.**07

### Take a manual backup before making changes

Run a full backup now, before the update and performance work. Make this a reflex: any significant change is preceded by a backup, which turns a mistake into a rewind instead of a rebuild.08

### Run updates on staging first

Open the host's staging copy, apply all pending core, theme and plugin updates there, and click through Home, a product page, the contact form and checkout. Only after staging is clean do you apply the same updates to production.09

### Apply updates to production and re-test

Update everything on the live site, then repeat the same click-through. Batch the updates rather than stretching them over weeks, and never schedule them immediately before a deadline.10

### Install a caching plugin and configure it

Enable page caching so generated HTML is served rather than rebuilt per visitor. On shared hosting this is usually the largest single performance gain available, and it costs nothing.11

### Enable compression and lazy loading

Turn on GZIP or Brotli compression for text assets, and lazy-load images below the fold so the visible part of the page arrives first. Both are single settings with measurable effect.12

### Measure before and after rather than guessing

Run the site through a performance tool before and after the changes and record the numbers. Going from four seconds to one and a half is a result you can show a client; an unmeasured claim is just an opinion.13

### Confirm HTTPS across the whole site

Load several pages and confirm the padlock, then check for mixed-content warnings in the browser console — an image loaded over HTTP on an HTTPS page breaks the secure indicator and worries customers at checkout.14

### Untick Discourage search engines — the launch moment

**Settings → Reading**, untick **Discourage search engines from indexing this site**, and save. This is the checkbox that has been hiding the site since session one. Missing it wastes every other SEO decision you made, and it is invisible when missed.15

### Submit the XML sitemap

Open the sitemap URL, confirm it lists your pages and posts, and submit it through Google Search Console. This is how new content gets discovered promptly instead of eventually.16

### Run the full functional launch test

Submit a contact enquiry from an external address and confirm delivery. Tap WhatsApp on a physical phone. Place and cancel a test order. Check every page title. Confirm analytics records one pageview per load. Test on a real phone over mobile data, not just Wi-Fi.17

### Deliver credentials securely

Share hosting, WordPress admin and any plugin licences through a password manager's sharing feature or a one-time secret link. **Never send the administrator password in a WhatsApp message or plain email** — it will be forwarded, screenshotted, or recovered from a compromised device.18

### Write the client guide

One or two pages, in plain language, covering how to publish a blog post, add a product, update a price, and check enquiries — with the exact menu paths. Write it for someone who has never opened a dashboard, because that is who will read it.19

### Agree maintenance in writing

State who applies updates, who monitors backups, what happens after a compromise, and what changes cost. Three lines prevents the most common freelance dispute: the client believing support was included and you believing it was not.

## Guided practice

### Secure, back up, optimise, launch and hand over

Take your own WordPress project from working to genuinely launched, with security, proven backups, performance work, and a handover pack.

1. 01Confirm the administrator username is not `admin`, the password is long and unique, and no unexpected admin accounts exist.

2. 02Enable two-factor authentication on the administrator account using an authenticator app.

3. 03Configure login-attempt limiting and confirm file permissions are 755 for directories and 644 for files.

4. 04Delete unused themes and plugins rather than leaving them deactivated — unused code is still exploitable.

5. 05Set up automated daily database and weekly full backups stored somewhere other than the same server.

6. 06Restore your latest backup into a scratch installation and confirm the site comes back complete. Record that you did this.

7. 07Take a manual full backup before making any further changes.

8. 08Apply all pending updates on a staging copy first, testing the critical pages before touching production.

9. 09Apply the same updates to production and repeat the click-through test.

10. 10Install and configure a page-caching plugin.

11. 11Enable compression and lazy loading for below-the-fold images.

12. 12Measure page performance before and after, and record both numbers.

13. 13Verify HTTPS on every page and check the console for mixed-content warnings.

14. 14Untick **Discourage search engines from indexing this site** and confirm the change saved.

15. 15Confirm the XML sitemap lists your content and submit it through Google Search Console.

16. 16Run the complete functional launch test: form from an external address, WhatsApp on a phone, test order, page titles, analytics single-count, and a real phone on mobile data.

17. 17Write the client guide covering publishing a post, adding a product, updating a price, and checking enquiries — with exact menu paths.

18. 18Write a three-line maintenance agreement covering updates, backups, incident response and the cost of changes.

The standard we hold you to

Two-factor authentication active on a non-default administrator account; login limiting and correct file permissions; automated off-server backups with a **recorded successful test restore**; updates applied via staging then production with critical paths tested both times; caching, compression and lazy loading configured with before-and-after measurements; HTTPS verified with no mixed content; the visibility checkbox unticked and sitemap submitted; every launch test passed including a real phone on mobile data; plus a written client guide and a three-line maintenance agreement.

## Common mistakes and how to fix them

Trusting a backup you have never restored

Fix: A green tick means a file was written, not that it can rebuild your site. Restore one into a scratch installation and confirm it works. Until then you have a file, not a backup.

Storing backups on the same server as the site

Fix: The same disk failure, compromised account or hosting suspension destroys both. Store backups off-server — object storage or a cloud drive.

Not updating because updates sometimes break things

Fix: Outdated software is the leading cause of compromise. Update on **staging** first, test, then update production. That removes the risk without accepting the greater risk of stale code.

Leaving unused plugins and themes installed

Fix: Deactivated code can still be exploited if it contains a vulnerability. Delete what you are not using — fewer files to patch is a smaller surface.

Leaving Discourage search engines ticked at launch

Fix: The site stays invisible and nothing warns you. Put it on the launch checklist, untick it, and confirm the setting saved.

Sending the admin password in a WhatsApp message

Fix: Use a password manager's sharing feature or a one-time secret link. A password in a chat gets forwarded, screenshotted, or recovered from a lost phone.

Guessing at performance instead of measuring

Fix: Run a real tool before and after. Recorded numbers convince clients and expose which change actually helped; unmeasured claims convince nobody, including you.

Handing over with no documentation or maintenance agreement

Fix: The client cannot run a site they were never shown, and undefined responsibility becomes a dispute. Two pages of guide and three lines of agreement prevent most of it.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Test-restore a backup once, on purpose, and it changes how you work. Almost everyone who has done it has found a broken backup before it mattered; almost everyone who has not done it has found out during an incident. It is the highest-value hour in this course.

- Two-factor authentication is the best return of any security measure available to a small site. Automated attacks succeed mostly through guessed or reused credentials, and 2FA defeats that class of attack completely regardless of how weak the password is.

- Staging converts updates from a gamble into a routine. The minutes it costs are trivial next to the cost of discovering a broken checkout because a customer found it first — and hosting that lacks one-click staging is worth changing for this reason alone.

- The handover pack is what separates a professional from someone who built a website. Credentials delivered securely, a guide written for a beginner, and maintenance agreed in writing mean the client can actually run the thing. It is also what earns you the maintenance retainer, which is where the recurring revenue in this work lives.

## Key termsTwo-factor authentication (2FA)Requiring a second factor — typically a time-based code from an authenticator app — in addition to the password. It defeats credential guessing regardless of password strength.Off-server backupA backup stored somewhere other than the server hosting the site, so a disk failure, compromised account or hosting suspension does not destroy both copies.Test restoreActually rebuilding a site from a backup into a scratch installation to prove the backup works. The only real evidence that a backup is usable.Staging siteA duplicate of the live site at a separate address where updates and changes are applied and tested before reaching production.Page cachingStoring generated HTML so the server serves it directly instead of rebuilding every page for every visitor — usually the largest performance gain on shared hosting.Mixed contentLoading HTTP resources on an HTTPS page. It breaks the secure indicator in the browser and undermines customer confidence at checkout.Lazy loadingDeferring the loading of images below the fold until the visitor approaches them, so the visible part of the page arrives sooner.Handover packThe credentials, written guide and maintenance agreement given to a client at launch so they can run and maintain the site themselves.

## Homework before the next session

Prove your backup restores

Restore your latest backup into a scratch installation and confirm the site returns with content, theme and settings intact. Record the date and what you verified. This is the single most valuable piece of evidence in the whole course.

Complete the security hardening

Non-default administrator username, long unique password, two-factor authentication, login-attempt limiting, 755/644 permissions, and all unused themes and plugins deleted rather than deactivated.

Measure and record performance

Run a performance test before and after enabling caching, compression and lazy loading. Record both numbers and note which change produced the largest improvement.

Produce the launch and handover pack

A completed launch checklist with every item ticked, a client guide covering the four everyday tasks with exact menu paths, credentials delivered securely, and a three-line maintenance agreement stating who does updates, backups and incident response.

## Assessment rubric

How this session is marked. The certificate for WordPress is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Security hardening | A strong password and a security plugin installed. | Non-default admin username, 2FA active, login limiting configured, correct permissions, unused code deleted, and a clear account of how WordPress sites are actually compromised. |
| Backup reliability | Automated backups configured. | Off-server storage, a schedule matching how much work would be lost, manual backups before changes, and a **recorded successful test restore**. |
| Update discipline | Everything is up to date. | Updates applied on staging first, critical paths tested there and on production, batched sensibly, and never scheduled immediately before a deadline. |
| Performance work | A caching plugin installed. | Caching, compression and lazy loading configured, with before-and-after measurements recorded and the largest contributing change identified. |
| Launch and handover | The site is live and the client has the password. | Full checklist completed including the visibility checkbox and sitemap, credentials shared securely, a beginner-readable guide delivered, and maintenance responsibility agreed in writing. |

## Session questionsHow often should I back up?+

Daily database and weekly full files is a sound baseline for a business site, stored off-server. Add a manual backup before any significant change — that single habit turns most mistakes into a rewind instead of a rebuild.Do I really need staging for a small site?+

If you update plugins, yes. The minutes it costs are trivial against the cost of a customer finding a broken checkout first. Many hosts provide one-click staging; if yours does not, that is a good reason to change host.Will a security plugin make the site safe?+

It helps with login throttling and scanning, but most compromises come from weak credentials, outdated software and nulled themes. Those are behaviours, not products — no plugin substitutes for updating promptly and never installing pirated software.What should the client handover include?+

Credentials delivered securely, a short guide covering publishing a post, adding a product, updating a price and checking enquiries with exact menu paths, and a written statement of who handles updates, backups and incidents.Should I offer ongoing maintenance?+

Yes — it is where the recurring income in this work lives, and the client genuinely needs it. A modest monthly fee covering updates, backups, monitoring and small changes is fair, and it keeps the relationship alive long after launch.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: Forms & Business Features](https://www.cea.ng/classes/wordpress/forms-business-features)[Course complete Back to WordPress](https://www.cea.ng/classes/wordpress)

WordPress

3 weeks · 6 sessions · ₦40,000 · you leave with a live business website[See the full course](https://www.cea.ng/classes/wordpress)[Enrol now](https://www.cea.ng/admissions)
