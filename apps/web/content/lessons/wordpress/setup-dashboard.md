---
title: "Session 1: Setup & Dashboard"
description: "Everything else depends on getting this right: the difference between the two things called WordPress, choosing hosting that will not embarrass you in front of a client, installing cleanly, and the handful of settings that quietly decide whether the site works properly later."
date: "2026-09-12"
class_slug: "wordpress"
---

Everything else depends on getting this right: the difference between the two things called WordPress, choosing hosting that will not embarrass you in front of a client, installing cleanly, and the handful of settings that quietly decide whether the site works properly later.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Distinguish WordPress.org from WordPress.com and choose deliberately

- Evaluate a hosting plan on the things that actually matter

- Install WordPress and complete the initial configuration

- Navigate the dashboard and know where everything lives

- Set the five settings that cause problems if left alone

- Understand what you are responsible for on a client site

## The taught content

### The two things called WordPress

This confusion costs beginners real money, so it comes first. **WordPress.org** is the free, self-hosted software: you download it, put it on hosting you pay for, and you own everything — the files, the database, the ability to install any theme or plugin. **WordPress.com** is a hosted service run by a company, where you rent space and accept their limits.

For the work this course prepares you for — building business sites for clients — **you want WordPress.org on your own hosting**. It is the version clients mean when they say **I want a WordPress site**, the version agencies use, and the only one where you can install the e-commerce, form and SEO plugins a business actually needs. WordPress.com's paid tiers can do some of this, but you are renting rather than owning, and moving away later is awkward.

The distinction also determines **who is responsible**. On your own hosting, you are responsible for updates, backups and security — which is exactly what the final session of this course teaches, and exactly what clients pay for. On a hosted service, they handle it and limit you. Neither is wrong; they are different products, and knowing which one you are on prevents every downstream confusion.

### Choosing hosting that will not embarrass you

Hosting is where a beginner site goes to die, and not from anything visible. What matters, in rough order: **reliability** — a site that is down when a client's customer visits is a lost contract, so uptime history and honest reviews matter more than advertised features; **PHP version** — WordPress needs a current supported version, and cheap hosts sometimes leave you on an old one; **SSL included**, because HTTPS is not optional and paying extra for it is a warning sign; and **real backups**, not a checkbox nobody has tested.

Then the things specific to building for Nigerian businesses. **Support responsiveness** matters more than support availability — a host who answers in twenty minutes at 9pm is worth more than one with a 48-hour ticket queue. **Server location** affects speed for your visitors: a European server is usually a reasonable compromise for Lagos traffic, while a US server adds latency to every request. And **payment** — many international hosts charge in dollars, so know the exchange exposure before you quote a client an annual figure.

The practical advice is to **start cheap and small**. A shared plan is entirely adequate for a small business site, and the differences between mid-priced hosts are much smaller than the differences between a good host and a bad one. What you should not do is choose purely on price, because the cost of migrating a live client site after discovering the host is unreliable is far greater than the annual saving.

### Installation

Almost every host offers a **one-click installer**, and you should use it — it creates the database, writes the configuration file and runs the setup in a minute. Knowing it exists is the point; there is no professional virtue in doing it manually on a client project.

It is still worth understanding what the installer did, because you will meet it again when something breaks. WordPress needs three things: **the files** on the server, a **database** to store content and settings, and a **configuration file** that tells the files where the database is. Every catastrophic WordPress failure is a problem with one of those three, and knowing which makes debugging possible rather than guesswork.

Then the setup itself, where two decisions matter. **Use a strong administrator password, and do not name the administrator account admin**, because admin is the first username every automated attack tries — this is not paranoia, it is the single most common way WordPress sites are compromised. And **note your database credentials somewhere safe**, because recovering them later is annoying at best.

### The dashboard, and where things live

The dashboard is the left-hand menu, and learning it is mostly learning where things are. **Posts** is blog content — dated, categorised, shown in reverse chronological order. **Media** is every file you have uploaded. **Pages** is your permanent content — Home, About, Contact. **Comments** is moderation. **Appearance** holds themes, customisation and menus. **Plugins** is installed functionality. **Users** is who can log in. **Settings** is configuration.

The distinction that confuses every beginner is **Posts versus Pages**, and it is worth fixing now because it decides how the whole site is organised. **Pages** are timeless and hierarchical — **About** does not expire, and **Contact** can have a child page. **Posts** are dated and grouped into categories — an article about a project you finished last month is a post. Getting this wrong means a client's news section that cannot be ordered, or a menu of blog entries that should have been pages.

Then the thing nobody tells you: **the dashboard you see depends on your role**. An administrator sees everything; an editor sees content but not plugins or settings; an author sees less still. On a client site you will create a lower-privilege user for them, and they will not see the things you can break — which is deliberate and is part of a responsible handover.

### The five settings that matter

Most settings can be left alone, and five cannot. **Permalinks** — under Settings, change the structure to **Post name**, because the default includes the date and produces long, ugly, unshareable URLs; changing this later breaks every existing link, so do it before you have content. **Timezone** — set it to Lagos, or scheduled posts and dated content will be wrong by hours.

**Site title and tagline** appear in browser tabs and search results and are trivially forgotten. **Discussion settings** decide whether comments are open, and on a business site you almost certainly want them off or moderated, because unmoderated comments on a small business site become spam within days. And the fifth is the one that ruins launches: **Search engine visibility**.

That checkbox — **Discourage search engines from indexing this site** — is meant to be ticked while you build and **unticked before you go live**. People tick it during development, launch, and then wonder for months why nobody can find the site. It is a single checkbox, it is easy to forget, and it is the most expensive oversight in this entire course. Check it at launch, every time, and put it on your launch checklist.

## Instructor demonstration

The instructor sets up the furniture business's site from nothing on real hosting — comparing two hosting plans on the criteria that matter, running the one-click installer, explaining what it created, walking the whole dashboard, and setting the five settings that cause problems later, including the search visibility checkbox that ruins launches.

### Explain WordPress.org against WordPress.com

Show both. Explain that self-hosted is what clients mean, what agencies use, and the only version where any plugin can be installed.02

### Compare two hosting plans side by side

Check PHP version, SSL, backups and uptime history rather than advertised features. Explain that reliability beats features on a client site.03

### Check the server location

Explain that a European server is usually a reasonable compromise for Lagos traffic, while a US server adds latency to every request.04

### Discuss the payment currency

Explain that many hosts charge in dollars, so the exchange exposure must be known before you quote a client an annual figure.05

### Register the domain and point it at hosting

Explain that propagation can take up to a day, so a domain that does not work immediately is usually working.06

### Run the one-click installer

Explain that there is no professional virtue in installing manually on a client project.07

### Show what the installer created

Files, database and configuration file. Explain that every catastrophic WordPress failure is a problem with one of those three.08

### Set the admin username to something other than admin

Explain that admin is the first username every automated attack tries, so this is the most common compromise route.09

### Set a strong password and record the database credentials

Explain that recovering credentials later is annoying at best and impossible at worst.10

### Log in and walk the dashboard

Posts, Media, Pages, Comments, Appearance, Plugins, Users, Settings. Explain that learning the dashboard is mostly learning where things live.11

### Create a post and a page and compare them

Explain that posts are dated and categorised while pages are timeless and hierarchical, and that getting this wrong disorganises the whole site.12

### Create an editor user

Show what they cannot see. Explain that a lower-privilege client user is part of a responsible handover, not a restriction.13

### Set permalinks to Post name

Explain that changing this after content exists breaks every existing link, so it must happen before the first page.14

### Set the timezone to Lagos

Explain that scheduled posts and dated content are wrong by hours otherwise.15

### Set the site title and tagline

Explain that these appear in browser tabs and search results and are trivially forgotten.16

### Configure discussion settings

Explain that unmoderated comments on a business site become spam within days, so they should be off or moderated.17

### Tick Search engine visibility while building

Explain that this hides the unfinished site from search engines during development.18

### Show what happens if it is left ticked at launch

Explain that people launch and then wonder for months why nobody can find the site. This is the most expensive oversight in the course.19

### Put it on the launch checklist

Explain that a single checkbox is worth a line on a checklist, every time, without exception.

## Guided practice

### Get a clean WordPress site running on real hosting

You choose a host on the criteria that matter, install WordPress, walk the dashboard, create the site structure for the furniture business, and set every configuration that cannot safely be changed later — then document the credentials and settings so someone else could take over.

1. 01Compare three hosting plans on PHP version, SSL, backups, uptime and support responsiveness.

2. 02Choose one and write two sentences on why, including the payment currency and server location.

3. 03Register a domain and point it at your hosting, confirming propagation.

4. 04Run the one-click installer.

5. 05Confirm you can identify the files, the database and the configuration file in your hosting panel.

6. 06Set an administrator username that is not admin, with a strong password.

7. 07Record the database and admin credentials somewhere safe.

8. 08Log in and identify what every top-level dashboard menu is for.

9. 09Create one post and one page and write the difference between them.

10. 10Create an editor-level user and list what they cannot access.

11. 11Set permalinks to Post name before creating any content.

12. 12Set the timezone to Lagos.

13. 13Set the site title and tagline.

14. 14Configure discussion settings for a business site.

15. 15Tick Search engine visibility while the site is being built.

16. 16Write the untick step onto your launch checklist.

17. 17Create the six pages the furniture business needs as empty pages.

18. 18Confirm the site loads over HTTPS.

19. 19Write a short handover note covering host, domain, credentials location and settings changed.

The standard we hold you to

A clean WordPress install on real hosting: three plans compared on PHP version, SSL, backups, uptime and support responsiveness with a chosen host justified in two sentences including payment currency and server location; a domain registered, pointed and propagation confirmed; the one-click installer run with the files, database and configuration file each identified in the hosting panel; an administrator username that is not admin with a strong password and all credentials recorded safely; every top-level dashboard menu identified; one post and one page created with the difference between them written down; an editor-level user created with their inaccessible areas listed; permalinks set to Post name before any content, timezone set to Lagos, site title and tagline set, discussion settings configured for a business site, and Search engine visibility ticked during the build with the untick step written onto a launch checklist; the six furniture-business pages created; HTTPS confirmed; and a handover note covering host, domain, credential location and every setting changed.

## Common mistakes and how to fix them

You build on WordPress.com and cannot install a plugin

Fix: Use WordPress.org on your own hosting. That is what clients mean, what agencies use, and the only version where e-commerce, form and SEO plugins are freely available.

You chose hosting on price alone

Fix: Compare reliability, PHP version, SSL, backups and support responsiveness. The cost of migrating a live client site is far greater than the annual saving.

Your admin username is admin

Fix: Change it. It is the first username every automated attack tries, which makes it the most common way WordPress sites are compromised.

You cannot remember the database credentials

Fix: Record them during setup. Recovering them later is annoying at best, and the configuration file depends on them being correct.

You put permanent content in Posts

Fix: Pages are timeless and hierarchical; posts are dated and categorised. Getting this wrong means a news section that cannot be ordered or a menu of blog entries that should have been pages.

You left permalinks on the default

Fix: Set Post name before creating content. Changing it later breaks every existing link, including any a client has already shared.

Your timezone is wrong

Fix: Set it to Lagos. Scheduled posts publish at the wrong hour and dated content is out by several hours otherwise.

The site is live but nobody can find it

Fix: Untick Discourage search engines from indexing this site. It is a single checkbox, it is easy to forget, and it is the most expensive oversight in this course.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Use WordPress.org on your own hosting for client work. It is what clients mean by a WordPress site, and the hosted alternative limits exactly the plugins — e-commerce, forms, SEO — that a business needs.

- Choose hosting on reliability, PHP version, SSL, backups and support responsiveness, not on price or advertised features. A site that is down when a client's customer visits costs a contract, and migrating a live site later costs more than the annual saving.

- Never use admin as the administrator username. It is the first thing every automated attack tries, and changing it costs a minute while recovering a compromised site costs days.

- Put the search visibility checkbox on your launch checklist permanently. It is one checkbox that hides the whole site from search engines, and forgetting it means a launched site nobody can find for months.

## Key termsWordPress.orgThe free self-hosted software. You own the files and database and can install any plugin.WordPress.comA hosted service you rent, with limits on themes and plugins. A different product, not a version.Shared hostingA server shared with other sites. Adequate for a small business site and the right place to start.One-click installerCreates the database, writes the configuration and runs setup. Use it; there is no virtue in installing manually.wp-config.phpThe file telling WordPress where its database is. One of the three things every failure involves.PermalinksThe URL structure. Set to Post name before content exists, because changing it later breaks every link.Post versus pagePosts are dated and categorised; pages are timeless and hierarchical. The distinction organises the whole site.Search engine visibilityThe checkbox discouraging indexing. Tick while building, untick at launch, and never forget it.

## Homework before the next session

Compare three hosting plans

On PHP version, SSL, backups, uptime and support responsiveness rather than price. Write which you would choose for a client and why.

Install WordPress on real hosting

Use the one-click installer, then find the files, the database and the configuration file in your hosting panel so you know where each lives.

Walk every dashboard menu

Write one line on what each is for. Then create a post and a page and write down the difference between them in your own words.

Set the five settings

Permalinks, timezone, title and tagline, discussion, and search visibility. Write the untick step onto a launch checklist you will keep.

## Assessment rubric

How this session is marked. The certificate for WordPress is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Platform understanding | Knows what WordPress is. | WordPress.org and WordPress.com distinguished with the ownership and responsibility consequences explained, and self-hosting justified for client work. |
| Hosting choice | Has hosting. | Three plans compared on PHP version, SSL, backups, uptime and support, with the choice justified including payment currency, server location and latency for Lagos visitors. |
| Installation | WordPress is installed. | Installed via the one-click installer with the files, database and configuration file each identified, a non-admin username used, a strong password set, and all credentials recorded. |
| Dashboard and structure | Can find things. | Every top-level menu identified, the post-versus-page distinction explained and applied correctly, and an editor-level user created with their inaccessible areas listed. |
| Configuration | Settings are set. | Permalinks set before content, timezone set to Lagos, discussion configured for a business site, HTTPS confirmed, and the search visibility untick written onto a launch checklist. |

## Session questionsWhat is the difference between WordPress.org and WordPress.com?+

WordPress.org is free self-hosted software you install on hosting you pay for, so you own the files and can install any plugin. WordPress.com is a hosted service you rent, with limits on themes and plugins. For client business sites you want WordPress.org, because it is the only version where e-commerce, form and SEO plugins are freely available.How much should hosting cost?+

A shared plan is entirely adequate for a small business site, and the differences between mid-priced hosts are much smaller than between a good host and a bad one. Do not choose on price alone — migrating a live client site after discovering the host is unreliable costs far more than the annual saving.Should I install WordPress manually or use the one-click installer?+

Use the installer. It creates the database, writes the configuration and runs setup in a minute, and there is no professional virtue in doing it by hand on a client project. It is still worth knowing what it created, because every catastrophic failure involves the files, the database or that configuration file.What is the difference between a post and a page?+

Posts are dated, categorised and shown newest first — articles and updates. Pages are timeless and can have child pages — Home, About, Contact. Getting it wrong means a news section that cannot be ordered, or a menu full of blog entries that should have been pages.My site is live but does not appear on Google. Why?+

Almost certainly the Discourage search engines from indexing this site checkbox under Settings, Reading. It is meant to be ticked while you build and unticked before launch. People tick it during development, launch, and wonder for months why nobody can find them — so put the untick on your launch checklist.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Themes & Customisation](https://www.cea.ng/classes/wordpress/themes-customisation)

WordPress

3 weeks · 6 sessions · ₦40,000 · you leave with a live business website[See the full course](https://www.cea.ng/classes/wordpress)[Enrol now](https://www.cea.ng/admissions)
