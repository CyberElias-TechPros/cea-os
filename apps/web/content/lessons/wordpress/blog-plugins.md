---
title: "Session 4: Blog & Plugins"
description: "The blog that makes a site worth finding, and the plugin system that makes WordPress capable of almost anything — together with the discipline that keeps plugins from quietly destroying the site."
date: "2026-09-12"
class_slug: "wordpress"
---

The blog that makes a site worth finding, and the plugin system that makes WordPress capable of almost anything — together with the discipline that keeps plugins from quietly destroying the site.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Write and publish a post, and understand why posts and pages are different things

- Design a category structure and use tags without creating a mess

- Understand what a plugin actually does and where it runs

- Evaluate a plugin properly before installing it, including what a nulled plugin really costs

- Diagnose a plugin conflict systematically instead of randomly deactivating things

## The taught content

### The blog is the part of the site that keeps working after launch

Every page you built in the last two sessions is finished. Home is written, What We Make is populated, the gallery is uploaded. None of it will change much for a year. That is fine for those pages, but it has a consequence you should understand before launch: **a site made only of finished pages is a site that gives search engines no reason to come back.** A business site with no blog is a brochure — accurate, useful, and invisible to anyone who was not already looking for that exact business by name.

The blog solves this, and not in the vague way people usually mean. When somebody in Lagos searches for **how to choose a dining table for a small apartment**, your Home page will never rank for it, because your Home page is about your business. A well-written post answering that question can rank for it, and the person who lands there is a genuine potential customer who has just been helped by you. This is the whole mechanism: **the blog earns attention from people who do not know you exist yet.**

This also reframes what the client is buying. A static site delivers leads from people already searching for them. A site with a blog builds an audience over time. In class we will be direct that this is a **six-to-twelve-month** effect, not something that pays off next week — over-promising on SEO is one of the most common ways freelancers damage their reputation, and we would rather you set an honest expectation and be pleasantly surprised.

### Posts and pages are different objects, and mixing them up is a structural error

The distinction is not cosmetic. **Pages are timeless and hierarchical** — Home, About, What We Make. They live outside the blog flow, they can have parents and children, and they are what your menu points at. **Posts are dated and chronological** — they appear newest-first in the blog archive, they get categories and tags, and they appear in your RSS feed.

The practical failure looks like this: somebody adds ten product write-ups as posts because posts were easier to find in the dashboard, then wonders why the What We Make page is empty and the blog looks like a catalogue. Or they publish a genuine article as a page, so it never appears in the blog archive and never gets categorised. **Decide before you create.** If the content is evergreen and belongs in the site structure, it is a page. If it is something published on a date that people might browse through, it is a post.

For this business the split is clean. Pages: Home, About, What We Make and its children, Projects, Contact. Posts: articles like **Choosing solid wood over veneer**, **How to care for teak in a humid climate**, **Five mistakes when furnishing a small Lagos flat**. Every one of those is a real question a real customer has, which is the test to apply before writing anything.

### Categories are a filing cabinet; tags are a cross-reference, and most sites overuse tags

**Categories** are broad, stable, mutually exclusive buckets — they answer 'what section of the site is this in'. For this business, three or four is right: **Buying Guides**, **Care and Maintenance**, **Projects**. Every post gets exactly one, or occasionally two. Categories appear in URLs and often in navigation, so they should read like sections of a shop.

**Tags** are narrow and can be applied liberally — they answer 'what specific things does this mention'. A post about teak care might be tagged **teak**, **humidity**, **polish**. The failure mode is the opposite of intuition: people use tags as extra categories, ending up with forty tags used once each, which produces forty near-empty archive pages. **A tag used on one post is useless** — it creates a page with no internal links and no value. Either a tag will accumulate several posts, or do not create it.

The setting that governs how this presents lives under **Settings → Permalinks**, and it is worth revisiting now. **Post name** gives you `/choosing-solid-wood-over-veneer/`. Adding the category gives `/buying-guides/choosing-solid-wood-over-veneer/`. The shorter form is usually better: it is cleaner, it survives a category restructure, and it puts the keywords closest to the domain. Whichever you choose, **choose it before you publish**, because changing it later redirects every post URL you have.

### What a plugin actually is, and why the number you install matters

A plugin is PHP code that hooks into WordPress. WordPress exposes thousands of **hooks** — named points in its execution where a plugin can insert or alter behaviour — and a plugin is essentially a collection of functions attached to those hooks. That is why plugins can do almost anything, and it is also why they are the most common source of problems: **a plugin runs inside your site with the same privileges WordPress itself has**, and it runs on every page load if it hooks into something common.

This produces two consequences worth internalising. First, **every active plugin adds load to every page**. Ten well-written plugins cost less than one badly written one, so counting plugins is a weak proxy for performance — what matters is what they do and how they do it. Second, **every plugin is a maintenance liability and a potential security surface**, because it is third-party code that must be kept current. A plugin abandoned by its author three years ago is a risk even if it still works today.

For this build the honest plugin list is short. **An SEO plugin**, **a form plugin**, **a backup plugin**, **a security plugin**, and **WooCommerce** if e-commerce is in scope. That is five. A brochure site does not need a page builder, a slider revolution, a live chat widget, a social share bar with eight networks, and a popup builder — that is how a fast site becomes a slow one, usually before launch.

### Evaluating a plugin before installing it is a skill with a checklist

The plugin directory shows you everything you need. Check, in order: **active installations** — how widely it is used; **last updated** — is it maintained; **WordPress compatibility** — does it state support for your version; **rating and review count together** — a 4.8 from nine reviews is weaker evidence than a 4.5 from four thousand; and **recent reviews specifically**, because a plugin can have degraded while its historic average still looks good. Then read a handful of the **one-star and two-star reviews**, which is where the real problems are described, and look for a pattern rather than an anecdote.

Then ask the question nobody asks: **do I actually need this?** The most secure plugin is the one you never installed. A share-button row can be three lines of HTML. A Google Analytics tag is one paste into the header. A 'coming soon' page is a plugin you will remove in a month and may forget about. Each of these is a candidate for not installing anything.

And one absolute rule, which we will state plainly because it is where freelancers get burned. **Never install a nulled plugin or theme** — a paid product redistributed for free from a third-party site. These are near-universally backdoored, because the person who cracked it wants something from you and the site is the payment. A nulled WooCommerce extension costs fifty dollars; the same extension pirated onto a client site costs you the client, your reputation, and possibly a cleanup you cannot bill for. **There is no version of this trade that is worth making.**

### Plugin conflicts are diagnosable if you are systematic, and chaotic if you are not

The symptom is generic: the site goes blank, a button stops working, the editor breaks, or a specific page returns an error. The instinct is to deactivate plugins one at a time at random until something improves. That sometimes works and teaches you nothing, and if the conflict is between two plugins you may never find it.

The disciplined version is a **binary search**. Deactivate half the plugins. If the problem persists, the cause is in the other half; if it clears, the cause is in the half you just deactivated. Repeat on the guilty half. Six plugins resolve in three steps instead of six guesses, and twenty plugins in five. **Each step halves the search space**, which is the entire point.

Before you start, read the error properly. Enable **WP_DEBUG** in `wp-config.php` and WordPress will name the plugin and the file in the error message — often ending the investigation in one step. Also check the **site health** screen under Tools, which reports PHP version issues, missing extensions, and plugin compatibility problems. And keep a note of what you changed: if you deactivated eight things, remember the order, or you will spend longer restoring the site than you did diagnosing it.

## Instructor demonstration

We publish the first three blog posts for the furniture site with a proper category structure, then install one plugin properly and deliberately break the site to practise the diagnosis.

### Set up categories first, before writing any posts

Go to **Posts → Categories**. Add **Buying Guides**, **Care and Maintenance**, and **Our Projects**, each with a short description and a clean slug. Delete the default **Uncategorized** only after every post has a real category — deleting it while posts still use it reassigns them to whatever WordPress picks.02

### Check the permalink structure while you are thinking about URLs

**Settings → Permalinks** should already be **Post name** from session one. Confirm it, and note that post URLs will be `/buying-a-solid-wood-dining-table/` rather than including the category. This is deliberate and we are not changing it later.03

### Write the first post as a post, not a page

**Posts → Add New**. Title: **Buying a Solid Wood Dining Table in Lagos: What to Check Before You Pay**. Note that the editor is the same block editor you already know, but the sidebar now shows **Categories** and **Tags** instead of **Page Attributes**.04

### Write to answer one specific question

The article covers how to tell solid wood from veneer, what to check in the joinery, why teak suits the climate, and what a fair price range looks like. Roughly 900 words, with subheadings, and written for someone about to spend real money — not for search engines. If the reader would not thank you for it, it is not worth publishing.05

### Add a featured image with the same discipline as before

A 1600px-wide photo of a finished table, compressed to under 250 KB, alt text **Solid teak dining table with six chairs in a Lagos home**. The featured image is what appears in the blog archive grid and in social previews, so a missing one leaves an ugly gap.06

### Assign exactly one category and two useful tags

Category: **Buying Guides**. Tags: **dining tables**, **solid wood**. Both tags will be used by the other posts, which is the test — we are not creating single-use tags that produce empty archive pages.07

### Set the excerpt explicitly

In the sidebar, open **Excerpt** and write two sentences. Without this, WordPress truncates your opening paragraph mid-sentence in archive listings, which looks careless.08

### Preview, then publish

Preview and check the post renders correctly and that the category link works. Then **Publish**. Visit `/blog/` and confirm the post appears in the archive with its featured image and excerpt.09

### Publish two more posts to make the structure visible

**How to Care for Teak Furniture in a Humid Climate** under **Care and Maintenance**, and **Furnishing a Small Lagos Flat Without Making It Feel Small** under **Buying Guides**. Three posts across three categories makes the blog look like a real section rather than a single orphan article.10

### Confirm the blog page is wired to the posts

Remember from session one that the **Blog** page was set as the posts page under **Settings → Reading**. Confirm its content area is empty and that the three posts appear on it automatically. If you see your own typed text instead of the posts, the posts-page setting is wrong.11

### Now install a plugin properly, starting with the evaluation

Go to **Plugins → Add New** and search for an SEO plugin. Before installing, read the page: active installations, last updated, WordPress compatibility, and the last few critical reviews. Narrate the decision out loud — this is the habit that keeps client sites safe.12

### Install, activate, and check what it added

**Install Now**, then **Activate**. Note what changed: a new menu item, possibly a setup wizard, and new fields in the post editor. Run the wizard only for the basics and decline anything that asks to connect an external account you do not need.13

### Deliberately create a conflict to practise diagnosis

Install a second plugin known to be heavy or lightly maintained — in class we use a deliberately chosen example. Load the site and observe the slowdown or breakage. The point is to create a controlled failure you can practise on rather than meet for the first time on a client's live site.14

### Enable debugging so the site tells you what is wrong

Edit `wp-config.php` and set **WP_DEBUG** to true, and **WP_DEBUG_LOG** to true. Reload the broken page and read `wp-content/debug.log`. It will usually name the plugin and file. **Turn both off again afterwards** — a public debug log leaks paths and configuration.15

### Diagnose by binary search, not by guessing

Deactivate half the active plugins. Reload. If it is fixed, the culprit is in the half you deactivated; if not, it is in the other half. Reactivate and halve again. Narrate each step so the method is explicit rather than lucky.16

### Check Site Health for anything structural

**Tools → Site Health** reports PHP version, missing extensions, and compatibility warnings. Fix anything it flags as critical before moving on — a plugin conflict is often a symptom of an unsupported PHP version underneath.17

### Resolve and document

Delete the offending plugin, confirm the site is healthy, and record what happened and how you found it in the project notes. The write-up matters as much as the fix, because the same class of problem will recur.18

### Confirm nothing else changed

Click through Home, What We Make, Projects, Contact and the three blog posts. Verify forms still submit and the gallery still loads. After a plugin change, assume something unrelated broke until you have checked it.

## Guided practice

### Publish three posts and survive a controlled plugin failure

On your own WordPress site, build a real blog structure and then practise diagnosing a plugin problem in a controlled setting.

1. 01Create three or four categories that read like sections of a site, not like topics you thought of while writing. Delete **Uncategorized** once nothing uses it.

2. 02Confirm **Settings → Permalinks** is **Post name** and decide now whether you want the category in the URL. Do not revisit this after publishing.

3. 03Publish three posts, each answering one specific question a real reader would search for. Roughly 700 to 1,000 words each, with subheadings.

4. 04Give each post exactly one category and no more than three tags. Only use a tag if at least two posts will share it.

5. 05Write an explicit excerpt for each post rather than letting WordPress truncate your first paragraph.

6. 06Add a compressed featured image with real alt text to each post.

7. 07Verify the blog archive lists all three with images and excerpts, and that the category pages work.

8. 08Install one plugin you actually need, having read its install count, last update date, compatibility statement, and recent critical reviews first.

9. 09Install a second plugin you did not really need, specifically to create load. Observe what it does to page speed and behaviour.

10. 10Enable **WP_DEBUG** and **WP_DEBUG_LOG**, reproduce the problem, and read the log file to see whether it names the cause.

11. 11Resolve the problem by binary search — deactivate half, test, halve again — narrating each step rather than trying plugins at random.

12. 12Delete the plugin you did not need, then turn debugging off and confirm `debug.log` is not publicly reachable.

13. 13Run **Tools → Site Health** and fix anything flagged as critical.

14. 14Write five lines recording what broke, how you identified it, and what you changed. That note is the deliverable's most valuable part.

The standard we hold you to

Three published posts, each with one category, at most three genuinely shared tags, a written excerpt, and a compressed featured image; a category structure that reads like site sections; one plugin installed only after a documented evaluation; and a diagnosed-and-resolved plugin conflict found by binary search with debugging enabled, with debugging switched off afterwards and a written account of the fix.

## Common mistakes and how to fix them

Publishing product information as posts because posts were easier to find

Fix: Evergreen content that belongs in the site structure is a **page**. Dated content people might browse is a **post**. Mixing them up leaves your catalogue empty and your blog looking like a shop.

Forty tags used once each

Fix: A tag on a single post creates an archive page with no internal links and no value. Only tag something if several posts will share it — otherwise use a category.

Changing permalinks after publishing

Fix: It changes every post URL and breaks any link already shared. Decide the structure in session one, before there is content to redirect.

Installing a nulled premium plugin or theme

Fix: These are reliably backdoored — the cracker is paid in access to your site. It is the single fastest way to lose a client and your reputation. Pay for the extension or find a maintained free alternative.

Judging plugins by count rather than by what they do

Fix: Ten lean plugins beat one bloated one. Ask whether you need each plugin at all — share buttons and an analytics tag can be a few lines of markup.

Reading only the average star rating

Fix: A 4.6 from three thousand reviews can hide a plugin that broke last month. Read the **recent** reviews, especially the critical ones, and check the last-updated date.

Deactivating plugins at random to find a conflict

Fix: Binary search instead: halve, test, halve again. It is faster, it finds conflicts between two plugins, and it teaches you the method.

Leaving WP_DEBUG on after diagnosing

Fix: A public debug log exposes file paths, database details and configuration. Turn it off and confirm `wp-content/debug.log` is not publicly downloadable.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- The blog is the only part of a business site that compounds. Everything else is finished on launch day; posts keep bringing new visitors for years. Price it accordingly when you quote maintenance, and never let a client believe a site maintains itself.

- The single most useful habit in plugin management is asking whether you need the plugin at all. Most sites run well on five. Every additional plugin is permanent maintenance and permanent attack surface, and clients never thank you for the features they did not ask for.

- Reading recent critical reviews is a better signal than the aggregate score, because it captures the plugin's current state rather than its history. A plugin that was excellent two years ago and abandoned last year is a live risk today.

- Binary search is worth teaching explicitly because it generalises. The same method finds a broken CSS rule, a conflicting script, or a bad commit — halve the space, test, repeat. It is the most transferable debugging skill in this course.

## Key termsPostA dated, chronological entry that appears in the blog archive, supports categories and tags, and is included in the RSS feed.CategoryA broad, stable, usually mutually exclusive grouping of posts that behaves like a section of the site and often appears in navigation and URLs.TagA narrow label for specific subjects mentioned in a post. Only useful when shared by several posts; single-use tags create empty archive pages.ExcerptA short summary of a post used in archive listings and previews. Write it explicitly rather than letting WordPress truncate the first paragraph.HookA named point in WordPress execution where a plugin can insert or modify behaviour. The mechanism that makes plugins powerful and also risky.Nulled pluginA paid plugin or theme redistributed free from a third-party site, almost always containing a backdoor. Never install one on a client site.Binary search diagnosisRepeatedly deactivating half the plugins and testing, halving the search space each time instead of testing plugins one at a time at random.WP_DEBUGA constant in wp-config.php that makes WordPress display or log errors. Essential for diagnosis; must be switched off on a live site.

## Homework before the next session

Publish three real posts on your project site

Each answering one specific question a real reader would ask, 700 to 1,000 words, with one category, at most three shared tags, a written excerpt, and a compressed featured image with alt text.

Document your plugin evaluation

For the one plugin you installed, record its active install count, last-updated date, stated WordPress compatibility, and the substance of its recent critical reviews — plus the alternative you considered and why you chose as you did.

Break and fix something deliberately

Install an unnecessary plugin, diagnose the resulting problem with WP_DEBUG enabled and by binary search, resolve it, switch debugging off, and write five lines on what happened and how you found it.

Produce a blog content plan for the client

Twelve post titles for the next six months, each mapped to a category and each answering a question a real customer has. This is what turns 'we should blog more' into something a client can actually act on.

## Assessment rubric

How this session is marked. The certificate for WordPress is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Blog structure | Three posts published, each with one category and a few tags. | Categories read like sections of the site; every tag is shared by at least two posts; excerpts written explicitly; permalinks confirmed before publishing. |
| Content quality | Posts are on topic and reasonably written. | Each post answers one specific question a real customer would search for, with subheadings, accurate detail, and no padding written for search engines. |
| Plugin evaluation | A plugin was installed and it works. | Install count, last update, compatibility and recent critical reviews were checked and recorded, and 'do I need this at all' was answered honestly. |
| Conflict diagnosis | The problem was resolved eventually. | WP_DEBUG used to read the actual error, binary search used to isolate the cause, debugging switched off afterwards, and the whole thing written up. |
| Safety judgement | No nulled software installed. | Can explain precisely why nulled themes and plugins are backdoored and what the realistic cost is on a client engagement. |

## Session questionsHow often does a client need to publish?+

Two posts a month is sustainable and enough to compound. One a month still works over a year. Twenty in the first week followed by silence is worse than a steady two, because it signals an abandoned site to both readers and search engines.Should I write the posts for the client?+

Write the first three as part of the build so the structure is demonstrated, then hand over a content plan. Ongoing writing is a separate paid service — do not fold an indefinite content commitment into a website price.Do tags help SEO?+

Not directly, and poorly used they hurt by creating thin, near-empty archive pages. Categories do real work by grouping related content. Use tags only where several posts genuinely share a specific subject.How many plugins is too many?+

There is no number — ten lean plugins can be lighter than three bloated ones. The honest test is whether each one is needed, whether it is maintained, and whether it hooks into something that runs on every page load.What if a plugin I need is abandoned?+

Look for a maintained alternative first. If there is none, weigh whether the feature is worth carrying the risk, and tell the client in writing that it is unmaintained so the decision is theirs rather than something they discover later.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: Pages & the Block Editor](https://www.cea.ng/classes/wordpress/pages-block-editor)[Next session 5: Forms & Business Features](https://www.cea.ng/classes/wordpress/forms-business-features)

WordPress

3 weeks · 6 sessions · ₦40,000 · you leave with a live business website[See the full course](https://www.cea.ng/classes/wordpress)[Enrol now](https://www.cea.ng/admissions)
