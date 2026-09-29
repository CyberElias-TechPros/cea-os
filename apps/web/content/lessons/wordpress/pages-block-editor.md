---
title: "Session 3: Pages & the Block Editor"
description: "The block editor is where the site actually gets built. This session covers pages and their hierarchy, how blocks and patterns work, reusable blocks as the biggest time saving available, menus and navigation that survive a phone screen, and a media library that does not destroy the site's performance."
date: "2026-09-12"
class_slug: "wordpress"
---

The block editor is where the site actually gets built. This session covers pages and their hierarchy, how blocks and patterns work, reusable blocks as the biggest time saving available, menus and navigation that survive a phone screen, and a media library that does not destroy the site's performance.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Structure pages hierarchically and set the front page correctly

- Work confidently with blocks, patterns and block settings

- Build reusable blocks so repeated sections are edited once

- Create navigation that works on a phone

- Upload, compress and describe media properly

- Keep images from ruining page speed

## The taught content

### Pages, hierarchy and the front page

For the furniture business the page structure is straightforward: **Home, About, What We Make, Projects, Blog and Contact**. Pages can be **hierarchical** — a child page sits under a parent, which is how you get **What We Make** with a page per product range beneath it, and the hierarchy shows in the URL and can drive the navigation.

Two settings decide how the site presents itself, and both live under Settings, Reading. You choose whether the **front page** shows your latest posts or **a static page**, and for a business site it is always a static page — a visitor arriving at a furniture company's homepage wants to know what they make, not read a blog entry from Tuesday.

You also designate **which page is the blog**, which is where your posts then appear. This trips people up because the blog page itself should contain no content — it is a container that WordPress fills. Writing an introduction on it produces a page with a paragraph stranded above the post list, and it looks like a mistake because it is one.

### Blocks and patterns

The block editor builds pages from **blocks** — a paragraph is a block, so is an image, a heading, a button, a column layout. Everything is a block, and each has its own settings in the right-hand panel. It feels slow for the first day and fast after that, because once you think in blocks, layout stops being a fight.

The three blocks that do most layout work are **Group**, **Columns** and **Cover**. A Group wraps blocks so you can style and space them together; Columns puts things side by side; Cover is a background image with content on top, which is how most hero sections are built. Between those three and the basic text and image blocks you can build almost any business page.

Then **patterns** — pre-built arrangements of blocks you insert in one action, such as a three-column feature row or a call to action. They are the fastest way to a professional-looking page and they are editable afterwards, because they are just blocks underneath. The discipline is to **edit them to match your site rather than accepting them as they are**, since default patterns are how a site ends up looking like every other site using the same theme.

### Reusable blocks: the biggest time saving here

A **reusable block** — now often called a synced pattern — is a block or group of blocks saved once and inserted on many pages. Change the saved block and **every page using it updates**. On a client site this is worth more than any other feature in this session.

The obvious uses are the ones that repeat: a call to action with the business's phone number and WhatsApp link, an opening-hours block, a service-area list, a footer message. Build each once, insert everywhere, and when the client changes their phone number you update one place instead of hunting through nine pages.

The caution is the mirror image: because changes propagate everywhere, **editing a reusable block on one page changes it on all of them**, and beginners discover this by accidentally rewriting a section site-wide. If you need a variation, **convert it to a regular block** on that page first, which detaches it. Knowing which of the two you are doing is the whole skill.

### Menus and navigation

Menus live under Appearance and are assigned to **locations** the theme provides — usually a primary header menu, sometimes a footer. You build a menu from pages, categories or custom links, drag them into order, and nest items by dragging them slightly right to make them children.

The rules that matter are about restraint. **Keep the top level to five or six items**, because more than that does not fit on a phone and turns into a scrollable mess. **Use plain words** — **What We Make** rather than **Our Craftsmanship Portfolio**, because a visitor scanning a menu is not reading prose. And **order by importance**, not alphabetically, since people read menus left to right and stop.

Then the part most beginners skip: **test the menu on a phone**. The mobile menu is a separate experience — usually a hamburger that opens an overlay — and nested items can become unreachable or invisible. A menu that works beautifully on a laptop and cannot be opened properly on a phone is broken for most of your visitors, and it takes thirty seconds to check.

### Media, and the performance problem

The media library holds every uploaded file, and the single most common way a beginner WordPress site becomes slow is **uploading images straight from a camera or a phone**. A modern phone photograph is several megabytes; a web page should carry images of a few hundred kilobytes. Ten unoptimised photographs can make a page take longer to load than everything else on it combined.

So **resize and compress before uploading**. Resize to roughly the width it will display at — usually no more than 1,600 pixels for a full-width image — and compress it, which typically reduces file size by most of its weight with no visible quality loss. WordPress generates its own smaller sizes, but it does not shrink the original you uploaded, and the full-size file still exists and still gets served when someone views it directly.

Then the two habits that cost nothing. **Name files descriptively** before uploading — **teak-dining-table-lagos.jpg** rather than **IMG_4821.jpg** — because the filename is one of the few signals a search engine has about an image. And **fill in the alt text**, describing what the image shows, because it is read aloud by screen readers for blind visitors and used when an image fails to load. Skipping it is an accessibility failure, not a shortcut.

## Instructor demonstration

The instructor builds the furniture business's pages live in the block editor — setting the front page and blog page, constructing a hero with Cover and Columns, inserting and then customising a pattern, creating a reusable call-to-action block and showing what happens when it is edited, building the menu and testing it on a phone, and uploading a compressed image against an unoptimised one.

### Create the six pages

Home, About, What We Make, Projects, Blog, Contact. Explain that pages are timeless and hierarchical, which is what a business site needs.02

### Add a child page under What We Make

Explain that hierarchy shows in the URL and can drive navigation, and it is how a catalogue is organised.03

### Set a static front page under Settings, Reading

Explain that a business homepage should not be a blog feed, and that a visitor wants to know what the company makes.04

### Designate the blog page

Show that it holds no content. Explain that it is a container WordPress fills, and writing an introduction on it leaves a stranded paragraph.05

### Build a hero with a Cover block

Background image with the headline on top. Explain that Cover, Group and Columns between them build almost any business page.06

### Lay out three features with Columns

Explain that Columns is how side-by-side layout works, and that each column holds its own blocks.07

### Wrap a section in a Group

Apply padding and a background. Explain that Group exists so several blocks can be styled and spaced as one unit.08

### Insert a pattern

Explain that patterns are pre-built block arrangements, they are the fastest route to a professional page, and they are fully editable afterwards.09

### Edit the pattern to match the site

Change the wording, colours and images. Explain that accepting defaults is how a site ends up looking like every other site on the same theme.10

### Build a call to action with the phone and WhatsApp link

Explain that this will appear on several pages, which is what makes it worth saving.11

### Save it as a reusable block

Explain that changing the saved block updates every page using it, which is the biggest time saving in this session.12

### Insert it on three pages

Then change the phone number in one place and show all three update. Explain that this replaces hunting through nine pages.13

### Show the danger of editing it in place

Explain that beginners rewrite a section site-wide this way, and that converting to a regular block first detaches it when you need a variation.14

### Build the primary menu

Six items, ordered by importance. Explain that more than six does not fit a phone and that visitors scan rather than read.15

### Rename an item to plainer words

What We Make instead of Our Craftsmanship Portfolio. Explain that a menu is scanned, not read.16

### Assign the menu to the primary location

Explain that locations are provided by the theme, which is why a theme switch unassigns menus.17

### Open the site on a phone and use the mobile menu

Explain that the mobile menu is a separate experience and nested items can become unreachable, so this check takes thirty seconds and is not optional.18

### Upload an unoptimised phone photograph

Show the file size. Explain that ten of these make a page slower than everything else on it combined.19

### Resize and compress the same image and compare

Explain that WordPress generates smaller sizes but never shrinks your original, so the full file still exists and still gets served.20

### Rename the file descriptively and add alt text

Explain that the filename is one of the few image signals a search engine has, and alt text is read aloud by screen readers and shown when an image fails.

## Guided practice

### Build the site's pages, navigation and media properly

You build all six pages of the furniture site in the block editor using Group, Columns and Cover, customise rather than accept patterns, create and reuse a call-to-action block, build navigation that works on a phone, and upload every image resized, compressed, well named and described.

1. 01Create the six pages: Home, About, What We Make, Projects, Blog, Contact.

2. 02Add at least two child pages under What We Make.

3. 03Set a static front page under Settings, Reading.

4. 04Designate the blog page and confirm it contains no written content.

5. 05Build the homepage hero with a Cover block.

6. 06Lay out three features using Columns.

7. 07Wrap at least one section in a Group and set its spacing.

8. 08Insert at least one pattern and edit it to match the site.

9. 09Build a call to action with the business phone number and WhatsApp link.

10. 10Save it as a reusable block.

11. 11Insert it on at least three pages.

12. 12Change the phone number once and confirm every instance updated.

13. 13Convert the block to a regular block on one page and confirm it is detached.

14. 14Build the primary menu with six items or fewer, ordered by importance.

15. 15Rewrite every menu label in plain language.

16. 16Assign the menu to the primary location.

17. 17Open the site on a phone and test the mobile menu, including nested items.

18. 18Resize every image to its display width before uploading.

19. 19Compress every image and record the file size before and after.

20. 20Rename every file descriptively before uploading.

21. 21Add alt text describing the image on every one.

22. 22Load the homepage and confirm it is not slowed by oversized images.

The standard we hold you to

The furniture site's pages, navigation and media built properly: six pages created with at least two child pages under What We Make, a static front page set under Settings Reading, and a blog page designated and confirmed to hold no written content; a homepage hero built with Cover, three features laid out in Columns, at least one section wrapped in a Group with spacing set, and at least one pattern inserted and edited to match the site rather than accepted as delivered; a call to action with the business phone number and WhatsApp link saved as a reusable block, inserted on at least three pages, the number changed once with every instance confirmed updated, and the block converted to a regular block on one page and confirmed detached; a primary menu of six items or fewer ordered by importance with every label in plain language, assigned to the primary location and tested on a phone including nested items; and every image resized to its display width, compressed with the size before and after recorded, named descriptively before uploading, and given alt text describing it, with the homepage confirmed not slowed by oversized images.

## Common mistakes and how to fix them

Your homepage shows blog posts

Fix: Set a static front page under Settings, Reading. A visitor arriving at a furniture company's homepage wants to know what they make, not read an entry from Tuesday.

You wrote content on the blog page

Fix: Leave it empty. It is a container WordPress fills, and an introduction produces a paragraph stranded above the post list that looks like a mistake because it is one.

You accepted a pattern unchanged

Fix: Edit the wording, colours and images. Default patterns are how a site ends up looking like every other site built on the same theme.

You edited a reusable block and changed it everywhere

Fix: Convert it to a regular block on that page first if you need a variation. Editing in place propagates site-wide, which is the feature and the trap at once.

Your menu has nine top-level items

Fix: Cut to six or fewer. More than that does not fit a phone, and visitors scan menus rather than reading them.

You never tested the menu on a phone

Fix: Test it. The mobile menu is a separate experience and nested items can become unreachable, which breaks navigation for most of your visitors.

You uploaded photographs straight from a phone

Fix: Resize and compress first. WordPress generates smaller sizes but never shrinks your original, and ten unoptimised photographs outweigh everything else on the page.

Your images have no alt text and files named IMG_4821

Fix: Describe the image and name the file before uploading. Alt text is read aloud by screen readers and shown when an image fails, and the filename is one of the few signals a search engine has.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Use reusable blocks for anything that repeats. A call to action, opening hours or service-area list built once and inserted everywhere means a client's new phone number is one edit instead of a hunt through nine pages.

- Convert a reusable block to a regular one before varying it. Editing in place changes every page using it, which is the feature and the trap at the same time, and knowing which you are doing is the whole skill.

- Resize and compress every image before uploading. WordPress generates smaller sizes but never shrinks your original file, so an unoptimised upload stays on the server and still gets served at full weight.

- Test the mobile menu on a real phone every time. It is a separate experience from the desktop menu, nested items can become unreachable, and the check takes thirty seconds while the failure breaks navigation for most visitors.

## Key termsBlockThe unit the editor builds from — paragraph, image, heading, button, layout. Each has its own settings.Group, Columns, CoverThe three blocks that do most layout work: wrapping, side-by-side, and background image with content on top.PatternA pre-built arrangement of blocks inserted in one action and fully editable afterwards, because it is just blocks underneath.Reusable blockA block saved once and inserted on many pages, updating everywhere when changed. Now often called a synced pattern.Convert to regular blockDetaching a reusable block on one page so it can vary. Do this before editing, or the change is site-wide.Menu locationWhere the theme displays a menu, such as the primary header. Provided by the theme, which is why a switch unassigns them.Alt textA description of an image, read aloud by screen readers and shown when it fails to load. An accessibility requirement, not an extra.Static front pageA chosen page as the homepage instead of a blog feed. What every business site uses.

## Homework before the next session

Build one page from Group, Columns and Cover

No page builder, no theme features. Note how far those three blocks plus text and image take you on a business page.

Create one reusable block and use it three times

Then change it in one place and confirm all three updated. Convert it to a regular block on one page and confirm it stopped following.

Audit one menu

Count the top-level items, rewrite the labels in plain language, and test it on a phone including any nested items.

Optimise ten images

Resize to display width, compress, name descriptively, add alt text, and record the total size before and after.

## Assessment rubric

How this session is marked. The certificate for WordPress is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Page structure | Pages exist. | All six created with a working hierarchy under What We Make, a static front page set, and the blog page designated and left empty of written content. |
| Block editor | Can add content. | Hero built with Cover, features with Columns, a section wrapped in a Group with spacing set, and a pattern inserted then edited to match the site rather than accepted as delivered. |
| Reuse | Knows what a reusable block is. | A call to action saved and inserted on three or more pages, one edit confirmed to update every instance, and a detached variation created by converting to a regular block. |
| Navigation | Has a menu. | Six items or fewer ordered by importance, every label in plain language, assigned to the primary location, and tested on a phone including nested items. |
| Media | Images appear. | Every image resized to display width, compressed with before and after sizes recorded, named descriptively before uploading, given alt text, and the homepage confirmed not slowed by oversized files. |

## Session questionsIs the block editor hard to learn?+

It is slow for about a day and fast after that. The shift is learning to think in blocks rather than in a page — once layout is Group, Columns and Cover, most business pages become straightforward to assemble.What is a reusable block for?+

Anything that repeats: a call to action with a phone number and WhatsApp link, opening hours, a service-area list. Build it once, insert it everywhere, and a client's changed phone number becomes one edit instead of a hunt through nine pages. Just convert it to a regular block first if you need a variation.Why is my new site so slow?+

Almost always images uploaded straight from a camera or phone. A modern phone photograph is several megabytes where a web image should be a few hundred kilobyres, and WordPress never shrinks the original you uploaded. Resize and compress before uploading.Should my homepage show my latest posts?+

For a business site, no. Set a static front page under Settings, Reading and designate a separate page for the blog. A visitor arriving at a furniture company's homepage wants to know what they make, not read a blog entry from Tuesday.Does alt text matter?+

Yes, and it is an accessibility requirement rather than an optional extra. Screen readers read alt text aloud to blind visitors, browsers display it when an image fails to load, and it is one of the few signals a search engine has about an image. It costs a few seconds per image.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Themes & Customisation](https://www.cea.ng/classes/wordpress/themes-customisation)[Next session 4: Blog & Plugins](https://www.cea.ng/classes/wordpress/blog-plugins)

WordPress

3 weeks · 6 sessions · ₦40,000 · you leave with a live business website[See the full course](https://www.cea.ng/classes/wordpress)[Enrol now](https://www.cea.ng/admissions)
