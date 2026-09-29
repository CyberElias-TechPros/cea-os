---
title: "Session 2: Themes & Customisation"
description: "The theme decides how the site looks and how much of it you can safely change. This session covers what a theme actually controls, choosing one on the criteria that predict problems, the two customisation systems WordPress now has, why child themes exist, and the specific things that break a site when a theme changes."
date: "2026-09-12"
class_slug: "wordpress"
---

The theme decides how the site looks and how much of it you can safely change. This session covers what a theme actually controls, choosing one on the criteria that predict problems, the two customisation systems WordPress now has, why child themes exist, and the specific things that break a site when a theme changes.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what a theme controls and what it does not

- Evaluate a theme on update history, installs, speed and support

- Recognise the danger of pirated themes

- Use the Customiser and block-theme editing appropriately

- Create and use a child theme so updates do not erase work

- Know what breaks when you switch themes

## The taught content

### What a theme is, and what it is not

A theme controls **presentation**: layout, colours, typography, spacing, and the templates that decide how a page, a post and an archive look. It does **not** control your content — that lives in the database, which is why you can change theme without losing a single page.

That separation is the most important idea in WordPress and it is genuinely reassuring. It means a redesign is possible without rebuilding, and that a bad theme choice is recoverable. It also means the reverse: **anything you built that depends on a specific theme's features will not survive leaving it**, which is what the last block in this session is about.

The practical consequence for client work is to **choose the theme early and change it rarely**. Every switch costs re-configuration, and a client who has been shown a site for two months does not enjoy being told it looks different now.

### Choosing a theme

The criteria that predict problems are boring and reliable. **When was it last updated?** A theme untouched for two years will break against a current WordPress version, and the author has effectively told you they are not maintaining it. **How many active installs**, and what do the **recent reviews** say — not the average rating, but whether the last few reviews describe the same problem.

Then **speed and weight**, which most beginners skip and every client feels. A theme packed with features, bundled page builders and demo content is heavy, and on the mobile connections most Nigerian visitors have, a slow site is a site that loses customers. **A simple theme that loads fast beats a feature-rich one that does not**, and you can add specific features with specific plugins far more cheaply than you can remove bloat from a theme.

Then the one that is a security issue rather than a preference: **never use a pirated or nulled theme**. These are premium themes distributed free through unofficial sites, and they are a common malware delivery mechanism — the price was removed and something else was added. A compromised client site is your reputation and potentially your liability, and legitimate themes are cheap enough that this risk has no upside at all.

### The two customisation systems

WordPress currently has two systems running side by side, and knowing which one you are in prevents a great deal of confusion. The older one is the **Customiser** — under Appearance — a live-preview panel where you set colours, typography, logo and header, and it applies to classic themes. It is predictable and it is what most older themes use.

The newer one is **block themes and site editing**, where the entire site — header, footer, templates — is built from blocks and edited in a block-based editor. It is more capable and more flexible, and it is where WordPress is heading. A theme is one or the other, and the menus you see under Appearance differ accordingly, which is why two people following the same tutorial can see different screens.

For client work the honest advice is to **check which system a theme uses before you commit**, because your skills and your time estimate differ between them. If you are comfortable in the Customiser and the theme is a block theme, budget for learning rather than assuming the process transfers.

### Child themes, and why they exist

A **child theme** is a small theme that inherits everything from a parent and overrides only what you change. The reason it exists is **updates**: if you edit a theme's files directly, the next theme update replaces them and your work is gone — silently, and usually at the moment you least expect it.

With a child theme your changes live in separate files, so the parent can be updated safely while your customisation survives. This matters enormously on client sites, because **not updating a theme to preserve your edits is trading a small risk for a large one** — outdated themes are a primary way WordPress sites get compromised.

The modern alternative is that **much customisation now happens outside theme files** — in the Customiser, in block settings, or in a plugin — and none of that is affected by theme updates. So use a child theme when you are genuinely editing templates or functions, and use the Customiser or a custom plugin when you are not. Either way, the rule is the same: **never edit a parent theme's files directly**.

### What breaks when you switch themes

Your content survives a theme change; plenty of other things do not. **Menu assignments are lost** — the new theme has different menu locations, so your navigation has to be re-attached. **Widget areas differ**, so anything in a sidebar or footer has to be placed again. **Customiser settings belong to the old theme**, so colours and typography reset to the new theme's defaults.

The bigger problem is **theme-specific functionality**. Some themes ship their own page builder, shortcodes, custom post types or portfolio features, and content built with them displays as raw shortcode text or disappears entirely under a different theme. This is why **a theme with everything built in** is a trap: it is convenient for a month and it locks you in for years.

So the discipline is to **switch themes on a staging copy first, never on the live site**. WordPress hosts usually offer a staging environment, and if yours does not, clone the site. Checking what broke in private costs an afternoon; discovering it in front of a client costs the relationship.

## Instructor demonstration

The instructor chooses a theme for the furniture business by evaluating three candidates against the criteria that predict problems, rejects a feature-heavy one for speed, shows both customisation systems, creates a child theme, and then switches themes on a staging copy to show exactly what breaks and what survives.

### Explain that content lives in the database

Show that a theme change loses no pages. Explain that this separation is the most reassuring idea in WordPress and makes a bad theme choice recoverable.02

### Open three candidate themes in the repository

Explain that the criteria predicting problems are boring: update date, install count and recent reviews.03

### Check the last update date on each

Explain that a theme untouched for two years will break against a current WordPress version and the author has told you so.04

### Read the recent reviews, not the average

Explain that the last few reviews matter more than a four-star average, especially when they describe the same problem.05

### Test a feature-heavy theme's loading time

Compare with a simple one. Explain that on mobile connections a slow site loses customers, and a simple fast theme beats a feature-rich slow one.06

### Show a nulled theme and refuse it

Explain that these are a common malware delivery mechanism, that a compromised client site is your reputation, and that legitimate themes are cheap enough that this risk has no upside.07

### Choose and install the theme

Explain choosing early and changing rarely, because every switch costs re-configuration.08

### Open the Customiser

Set colours, typography and logo in live preview. Explain that this is the classic-theme system and it is predictable.09

### Open a block theme's site editor

Edit a header template from blocks. Explain that this is the newer system and where WordPress is heading.10

### Compare the Appearance menus of both

Explain that two people following one tutorial see different screens because the theme determines the system, so check before committing.11

### Set up the furniture site's colour and type

Explain that these settings belong to the theme, which is why a switch resets them.12

### Create a child theme

Show the minimal files. Explain that it inherits everything and overrides only what you change.13

### Show what a direct parent edit costs

Update the parent theme and watch the edit vanish. Explain that this happens silently, usually at the worst moment.14

### Update the parent with the child active

Confirm the customisation survives. Explain that this is why not updating to preserve edits trades a small risk for a large one.15

### Show customisation that needs no child theme

Explain that Customiser and block settings live outside theme files, so use a child theme only when editing templates or functions.16

### Clone the site to a staging copy

Explain that switching themes on the live site is how client relationships end, and staging is standard practice.17

### Switch the theme on staging

Show the menus unassigned and widgets displaced. Explain that content survives but menu locations and widget areas are theme-specific.18

### Show the Customiser settings reset

Explain that colours and typography belong to the old theme, so they revert to the new theme's defaults.19

### Show a theme-specific shortcode broken

Explain that content built with a theme's own features displays as raw text under another theme, which is why built-in everything is a trap.20

### Decide whether the switch is worth it

Explain that this decision is only possible because it was made in private, on staging, with time to count the cost.

## Guided practice

### Choose, customise and safely change a theme

You evaluate three themes against the criteria that predict problems, install and customise one for the furniture business, create a child theme, prove that a parent update preserves your changes, and switch themes on a staging copy to record exactly what breaks.

1. 01Identify three candidate themes for the furniture business.

2. 02Record each one's last update date and reject any unmaintained for over a year.

3. 03Read the recent reviews of each and note any repeated complaint.

4. 04Compare the loading time of the heaviest against the lightest.

5. 05Choose one and write two sentences on why, including speed.

6. 06Confirm the theme is from an official source and not a nulled copy.

7. 07Identify whether it uses the Customiser or block-theme site editing.

8. 08Set the site colours, typography and logo in the appropriate system.

9. 09Configure the header and footer.

10. 10Create a child theme and activate it.

11. 11Make one small customisation inside the child theme.

12. 12Update the parent theme and confirm your customisation survived.

13. 13Confirm which of your settings would be lost without the child theme.

14. 14Set up a staging copy of the site.

15. 15Switch to a different theme on staging only.

16. 16Record which menus lost their assignments.

17. 17Record which widgets were displaced.

18. 18Record which Customiser settings reset.

19. 19Test any content built with theme-specific features and record what broke.

20. 20Write one paragraph on whether the switch would be worth it on the live site.

21. 21Restore the original theme on staging.

The standard we hold you to

A theme chosen, customised and safely changed: three candidates identified with last update dates recorded and any unmaintained for over a year rejected, recent reviews read with repeated complaints noted, loading times of the heaviest and lightest compared, and a choice justified in two sentences including speed; the theme confirmed from an official source and not nulled; its customisation system identified as Customiser or block-theme editing with colours, typography, logo, header and footer set in the appropriate one; a child theme created and activated with one customisation made inside it, the parent theme updated and the customisation confirmed to have survived, and the settings that would have been lost without it identified; a staging copy created and a different theme switched on it only, with unassigned menus, displaced widgets, reset Customiser settings and broken theme-specific content each recorded; one paragraph written on whether the switch would be worth it on the live site; and the original theme restored on staging.

## Common mistakes and how to fix them

You chose a theme packed with features

Fix: Choose a simple, fast, maintained theme and add specific features with specific plugins. Bloat is far harder to remove than a feature is to add, and on mobile connections a slow site loses customers.

You installed a nulled theme to save money

Fix: Remove it and scan the site. Nulled themes are a common malware delivery mechanism, a compromised client site is your reputation, and legitimate themes cost less than the cleanup.

You picked an unmaintained theme

Fix: Check the last update date. A theme untouched for two years will break against a current WordPress version, and the author has effectively told you they have stopped maintaining it.

You edited the parent theme's files directly

Fix: Use a child theme or the Customiser. The next theme update replaces parent files silently, and your work is gone at the moment you least expect it.

You stopped updating the theme to protect your edits

Fix: Use a child theme and update normally. Outdated themes are a primary way WordPress sites get compromised, so you are trading a small risk for a large one.

You did not check which customisation system the theme uses

Fix: Check before committing. The Customiser and block-theme editing are different systems with different menus, and your time estimate differs between them.

You switched themes on the live site

Fix: Use staging. Menus unassign, widgets displace, Customiser settings reset and theme-specific content breaks — checking in private costs an afternoon, while discovering it in front of a client costs the relationship.

You used a theme's built-in page builder

Fix: Prefer standard blocks or a widely used independent builder. Theme-specific features lock you in, and their content displays as raw text under any other theme.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Choose a simple, fast, actively maintained theme and add features with plugins. Bloat is far harder to remove than a feature is to add, and on the mobile connections most visitors have, a slow site is a site that loses the client's customers.

- Never install a nulled theme. These are a common malware delivery mechanism, and a compromised client site is your reputation and potentially your liability — legitimate themes cost less than the cleanup.

- Use a child theme or the Customiser, and never edit a parent theme's files. Updates replace parent files silently, so direct edits vanish at the worst possible moment, and refusing to update to protect them trades a small risk for a large one.

- Switch themes on staging, never live. Menu assignments, widget areas, Customiser settings and theme-specific content all break differently, and counting that cost in private is what makes the decision rational.

## Key termsThemePresentation only — layout, colours, type and templates. Content lives in the database and survives a theme change.CustomiserThe live-preview settings panel used by classic themes. Predictable, and what most older themes use.Block themeA theme whose header, footer and templates are built from blocks. The newer system, and where WordPress is heading.Child themeInherits from a parent and overrides only what you change, so parent updates cannot erase your work.Nulled themeA pirated premium theme from an unofficial source. A common malware delivery mechanism; never use one.Staging siteA private copy of the live site. Where theme switches and risky changes are tested first.Theme-specific featureA builder, shortcode or post type shipped with a theme. Its content breaks under any other theme, which is the lock-in trap.Active installsHow many sites run a theme. A rough reliability signal, read alongside the last update date and recent reviews.

## Homework before the next session

Evaluate three themes properly

Last update date, active installs, recent reviews and loading time. Write which you would choose for a client and which you would refuse, with a reason for each.

Create a child theme and prove it works

Make one customisation inside it, update the parent, and confirm your change survived. Then note what would have happened without it.

Identify which system your theme uses

Customiser or block-theme editing. List the menus available under Appearance in each case and note how they differ.

Switch themes on a staging copy

Record what breaks: menus, widgets, Customiser settings and any theme-specific content. Then decide whether the switch would be worth it live.

## Assessment rubric

How this session is marked. The certificate for WordPress is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Theme choice | Has a theme installed. | Three evaluated on last update date, active installs, recent reviews and loading time, with a simple fast theme chosen over a feature-heavy one and the reasoning written down. |
| Safety | Installed from the repository. | Official source confirmed, nulled themes refused with the malware risk explained, and an unmaintained theme rejected on its update history. |
| Customisation | Changed colours and fonts. | The theme's system identified as Customiser or block editing, colours, typography, logo, header and footer set in the appropriate one, and the difference between the two systems explained. |
| Child themes | Knows what a child theme is. | One created and activated, a customisation made inside it, the parent updated and the change confirmed to survive, with the settings that would otherwise be lost identified. |
| Safe changes | Can switch a theme. | A staging copy used, with unassigned menus, displaced widgets, reset settings and broken theme-specific content each recorded, and a reasoned decision on whether to switch live. |

## Session questionsShould I use a free or premium theme?+

Either can be right. Judge on last update date, active installs, recent reviews and speed rather than price. A well-maintained free theme beats an abandoned premium one, and what you must never use is a nulled theme from an unofficial site, because those are a common malware delivery mechanism.Will changing my theme delete my content?+

No — content lives in the database, so your pages and posts survive. What breaks is presentation and theme-specific things: menu assignments, widget areas, Customiser settings, and anything built with the old theme's own builder or shortcodes.Do I really need a child theme?+

Only if you are editing theme templates or functions. Most customisation now happens in the Customiser or in block settings, which theme updates do not touch. But never edit a parent theme's files directly, because the next update replaces them silently.What is the difference between the Customiser and site editing?+

The Customiser is the older live-preview panel used by classic themes; block themes are edited through a block-based site editor instead. WordPress has both running side by side, so which menus you see depends on your theme — check before you commit to one.How do I change a theme safely?+

On a staging copy, never on the live site. Switch it there and record what breaks — menus, widgets, Customiser settings and theme-specific content. Checking in private costs an afternoon; discovering it in front of a client costs the relationship.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Setup & Dashboard](https://www.cea.ng/classes/wordpress/setup-dashboard)[Next session 3: Pages & the Block Editor](https://www.cea.ng/classes/wordpress/pages-block-editor)

WordPress

3 weeks · 6 sessions · ₦40,000 · you leave with a live business website[See the full course](https://www.cea.ng/classes/wordpress)[Enrol now](https://www.cea.ng/admissions)
