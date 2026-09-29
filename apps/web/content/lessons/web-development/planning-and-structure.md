---
title: "Session 9: Planning & Structuring a Project"
description: "Most projects fail before any code is written, through unclear scope and disorganised files. This session covers planning a project properly, structuring folders so you can find things, thinking in reusable components, and starting with Git and GitHub."
date: "2026-09-12"
class_slug: "web-development"
---

Most projects fail before any code is written, through unclear scope and disorganised files. This session covers planning a project properly, structuring folders so you can find things, thinking in reusable components, and starting with Git and GitHub.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Scope a project so it can actually be finished

- Break work into tasks small enough to complete

- Organise files so the project stays navigable

- Identify what should be reusable and how

- Initialise a Git repository and make meaningful commits

- Push to GitHub and understand what version control is for

## The taught content

### Scoping: the part that decides whether you finish

Every unfinished project was over-scoped at the start. 'A platform where anyone can do anything' is not a project; it is an aspiration, and it produces six weeks of half-built features and nothing published. The discipline is to write down **the one thing the finished project does**, in a sentence, and to cut everything that does not serve it.

Then **separate must-have from nice-to-have**, and build only the must-haves first. A useful way to think about it: if you had to publish in two weeks with what you have, what would you be ashamed was missing? That list is the must-haves. Everything else goes on a later list, which you may never reach — and that is fine, because a published small thing beats an unpublished large one every time.

The reason this matters so much is that **motivation is finite and unfinished work is demoralising**. A project you complete teaches you vastly more than one you abandon at seventy per cent, and the portfolio value of a live site is real while the value of a repository of half-built features is nil. Scope down until finishing is realistic, then finish.

### Breaking work into tasks

A task you can complete is **specific and small enough to finish in one sitting**. 'Build the website' is not a task. 'Create the header markup with the logo and navigation' is. The difference is not pedantry — a vague task cannot be started, because there is no obvious first action, and it cannot be finished, because there is no clear end.

So write tasks as **verbs with an object and a visible result**: 'style the card grid', 'wire the contact form validation', 'add the mobile navigation toggle'. Each one is startable, completable, and lets you see progress, which is what keeps a project moving through the unglamorous middle.

Then **order them by dependency and by risk**. Do the uncertain things early — the part you are not sure how to build — because discovering in week three that your central idea does not work is far worse than discovering it in week one. And do the shared foundations first, since everything else sits on them.

### Folder structure

A clear structure means you can find anything without searching, and anyone else can understand the project in a minute. The conventional layout for a small site is simple: **`index.html`** at the root, then **`css/`**, **`js/`**, **`images/`** (or `assets/` for all media), and any additional pages beside the index. That is genuinely enough for most projects, and elaborate structures for small sites create work rather than order.

Then the naming habits that save you later. **Lowercase filenames with hyphens** — `about-us.html`, `main.css` — because they are consistent across operating systems, never contain spaces that break in URLs, and are readable. **`Final_v2_REAL_final.css`** is what an unorganised project looks like in week four, and it happens to everyone who does not decide on a convention in week one.

And **one file per concern**. All your styles in one stylesheet, all your scripts in one or a few files grouped by purpose — not styles scattered across six files and inline in the HTML. A single place to look is what makes a project maintainable, and the moment you cannot remember which file something is in, the structure has failed.

### Reusable thinking

Reuse is what separates writing a page from building a system. The habit is to **notice repetition and extract it**: the same card appearing six times is a pattern, and the same button style appearing everywhere belongs in one class. Write it once, use it many times, and change it in one place.

In plain HTML and CSS this means **classes you apply repeatedly** — `.card`, `.btn`, `.btn-primary` — and consistent naming so the classes describe what something **is** rather than how it currently looks. `.btn-primary` survives a colour change; `.green-button` becomes a lie the first time you restyle.

The same thinking applies to JavaScript: **a function per repeated behaviour**, taking the parts that vary as parameters. And the discipline behind all of it is **not extracting too early** — waiting until something is genuinely repeated twice or three times before generalising, because guessing at the reusable shape too soon produces abstractions that fit nothing properly.

### Git and GitHub

**Git** records snapshots of your project so you can return to any of them, see what changed and when, and recover from mistakes. **GitHub** is a place to store those snapshots online, which gives you a backup, a shareable link, and the portfolio that employers actually look at. They are related but distinct: Git works entirely on your machine without GitHub.

The core workflow is four commands. **`git init`** starts a repository in your folder. **`git add .`** stages your changes. **`git commit -m "message"`** records them as a snapshot. **`git push`** sends them to GitHub. That loop, repeated, is most of everyday version control.

Then the habit that makes it valuable: **commit often, with messages that say why**. 'Fix header alignment on mobile' tells you something in three months; 'updates' tells you nothing. Commit after each working change rather than at the end of the day, because small commits are easy to understand and easy to undo, while one enormous commit is neither. And add a **`.gitignore`** for anything that should not be stored — build outputs, dependencies, and anything containing a password or API key, which once pushed is very hard to remove completely.

## Instructor demonstration

The instructor plans a real project from nothing: writing the one-sentence scope, cutting the nice-to-haves, breaking the work into small verb-first tasks ordered by risk, creating the folder structure with a naming convention, extracting a repeated card into one class, then initialising Git, committing meaningfully and pushing to GitHub.

### Write the one-sentence scope

State the single thing the finished project does. Explain that everything not serving that sentence is out of scope for now.02

### List the nice-to-haves and cut them

Move everything that is not essential to a later list. Explain that a published small thing beats an unpublished large one every time.03

### Apply the two-week test

Ask what would be shamefully missing if publishing in two weeks. Explain that the answer is the must-have list.04

### Write tasks as verbs

Rewrite 'build the website' as specific startable tasks. Explain that a vague task has no obvious first action and no clear end.05

### Order by risk and dependency

Put the uncertain part first. Explain that discovering in week three that the central idea fails is far worse than discovering it in week one.06

### Create the folder structure

Make css, js and images folders with index.html at the root. Explain that this is genuinely enough for most projects.07

### Set the naming convention

Use lowercase with hyphens. Show Final_v2_REAL_final.css and explain that it is what an undecided project becomes by week four.08

### Consolidate into one file per concern

Gather scattered styles into one stylesheet. Explain that a single place to look is what makes a project maintainable.09

### Find the repetition

Identify a card repeated six times. Explain that repetition is the signal to extract, and that extracting too early produces abstractions that fit nothing.10

### Extract a reusable class

Create .card and .btn-primary. Explain that naming by role rather than appearance survives a restyle, while .green-button becomes a lie.11

### Initialise the repository

Run git init and explain that Git works entirely locally, with GitHub as the remote store rather than a requirement.12

### Add a .gitignore

Exclude build outputs and anything containing a secret. Explain that a pushed key is very hard to remove completely.13

### Commit with a meaningful message

Stage and commit, contrasting 'fix header alignment on mobile' with 'updates'. Explain that small commits are easy to understand and easy to undo.14

### Push to GitHub

Create the repository and push. Explain that this is simultaneously a backup, a shareable link and the portfolio employers look at.

## Guided practice

### Plan a project and put it under version control

You plan a real project you will build — a one-sentence scope, a must-have list from the two-week test, tasks written as verbs and ordered by risk, a folder structure with a naming convention, one repeated element extracted into a reusable class — then initialise Git with a .gitignore, commit with meaningful messages and push to GitHub.

1. 01Write the one sentence stating what the finished project does.

2. 02List everything you originally wanted to include.

3. 03Apply the two-week test and mark the must-haves.

4. 04Move everything else to a clearly labelled later list.

5. 05Write each task as a verb with an object and a visible result.

6. 06Confirm every task is small enough to finish in one sitting.

7. 07Order the tasks by dependency, putting the riskiest part first.

8. 08Create the folder structure: css, js, images, with index.html at the root.

9. 09Adopt lowercase-hyphen filenames and apply them throughout.

10. 10Consolidate all styles into one stylesheet and scripts by purpose.

11. 11Identify one element repeated three or more times.

12. 12Extract it into a reusable class named for its role rather than its appearance.

13. 13Run git init in the project folder.

14. 14Create a .gitignore excluding build outputs, dependencies and any secret.

15. 15Stage and commit with a message explaining why, not 'updates'.

16. 16Create a GitHub repository and push.

17. 17Make three more small commits as you work, each with a meaningful message.

The standard we hold you to

A project plan containing a one-sentence scope, a must-have list derived from the two-week test with everything else on a labelled later list, tasks written as verbs each completable in one sitting and ordered by dependency with the riskiest first; a folder structure with css, js and images and index.html at the root, lowercase-hyphen filenames applied throughout, styles consolidated into one stylesheet; one repeated element extracted into a reusable class named for its role; and a Git repository initialised with a .gitignore covering build outputs, dependencies and secrets, committed with messages explaining why, pushed to GitHub, with three further meaningful commits made as work continues.

## Common mistakes and how to fix them

You scoped the project too large

Fix: Write the one sentence stating what it does and cut everything else. Every unfinished project was over-scoped at the start, and a published small thing beats an unpublished large one every time.

Your tasks are too vague to start

Fix: Write them as verbs with an object and a visible result. 'Build the website' has no obvious first action and no clear end; 'create the header markup with logo and navigation' has both.

You left the risky part until last

Fix: Do the uncertain thing first. Discovering in week three that your central idea does not work is far worse than discovering it in week one, when you can still change direction.

Your filenames are inconsistent

Fix: Adopt lowercase with hyphens from the start. Spaces break in URLs, capitalisation differs between systems, and Final_v2_REAL_final.css is what an undecided project becomes.

Your styles are scattered across many files

Fix: Consolidate into one stylesheet. The moment you cannot remember which file something is in, the structure has failed, and a single place to look is what makes a project maintainable.

You extracted an abstraction after one use

Fix: Wait until something is genuinely repeated two or three times. Guessing at the reusable shape too soon produces abstractions that fit nothing properly and have to be unwound.

You name classes by appearance

Fix: Name by role: .btn-primary, not .green-button. An appearance-based name becomes a lie the first time you restyle, and then nobody trusts the class names.

Your commit messages say 'updates'

Fix: Say why: 'fix header alignment on mobile'. A meaningless message tells you nothing in three months, and small meaningful commits are easy to understand and easy to undo.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Scope until finishing is realistic, then finish. A completed project teaches far more than one abandoned at seventy per cent, and a live site is a real portfolio piece while a repository of half-built features is worth nothing.

- Write tasks as verbs with a visible result. A vague task has no obvious first action so it never gets started, and no clear end so it never gets finished — specificity is what makes progress possible.

- Do the riskiest part first. Discovering in week one that your central idea does not work leaves you time to change direction; discovering it in week three usually means abandoning the project.

- Commit often with messages that explain why. Small commits are easy to understand and easy to undo, and 'fix header alignment on mobile' is still useful information in three months while 'updates' is not.

## Key termsScopeThe one thing the finished project does. Everything else is out of scope until it is published.Must-haveWhat would be shamefully missing if you published in two weeks. The only list you build from initially.TaskA verb with an object and a visible result, small enough to finish in one sitting.Folder structureWhere files live. css, js, images and index.html at the root is enough for most projects.Reusable classA class applied repeatedly, named for its role rather than its appearance. .btn-primary, not .green-button.RepositoryA project under Git version control. Works entirely locally; GitHub is a remote store, not a requirement.CommitA recorded snapshot with a message. Small and frequent beats large and rare..gitignoreA file listing what Git should not store. Build outputs, dependencies, and anything containing a secret.

## Homework before the next session

Scope one project in a sentence

Write the single thing it does, then list everything you wanted and move all but the must-haves to a later list. Apply the two-week test to decide what stays.

Break it into ten tasks

Each a verb with an object and a visible result, each completable in one sitting, ordered by dependency with the riskiest first.

Set up the project structure

css, js, images and index.html at the root, lowercase-hyphen filenames, all styles in one stylesheet. Decide the convention now rather than in week four.

Put it under version control

git init, a .gitignore covering build outputs and secrets, then commit with a message explaining why and push to GitHub. Make three more small commits as you work.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Scope | Has an idea. | A one-sentence scope with a must-have list from the two-week test, everything else on a labelled later list, and the project small enough to finish. |
| Task breakdown | Has a to-do list. | Every task a verb with a visible result, completable in one sitting, ordered by dependency with the riskiest part first. |
| Structure | Files are somewhere. | css, js and images with index.html at the root, lowercase-hyphen filenames throughout, styles consolidated into one stylesheet, and one file per concern. |
| Reuse | Copies markup. | Repetition noticed and extracted after two or three uses, classes named for role rather than appearance, and functions taking the varying parts as parameters. |
| Version control | Has Git installed. | A repository initialised with a .gitignore covering build outputs and secrets, small commits with messages explaining why, and the project pushed to GitHub. |

## Session questionsHow do I know if my project is too big?+

Apply the two-week test: if you had to publish in two weeks with what you have, what would be shamefully missing? If that list is longer than the essentials, it is too big. Every unfinished project was over-scoped at the start, and a published small thing beats an unpublished large one.What folder structure should I use?+

index.html at the root with css, js and images folders beside it. That is genuinely enough for most small sites — elaborate structures for small projects create work rather than order. Use lowercase filenames with hyphens and keep all styles in one stylesheet.When should I extract something into a reusable class?+

After it is genuinely repeated two or three times, not before. Guessing at the reusable shape too soon produces abstractions that fit nothing properly and have to be unwound. Name the class for its role — .btn-primary — not its appearance, which becomes a lie when you restyle.Do I need GitHub, or is Git enough?+

Git works entirely on your machine and gives you history and recovery on its own. GitHub adds a backup, a shareable link and a portfolio that employers actually look at, which is why it is worth setting up early — but the version control itself is local.How often should I commit?+

After each working change, with a message explaining why. 'Fix header alignment on mobile' is still useful in three months; 'updates' is not. Small commits are easy to understand and easy to undo, while one enormous commit is neither.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session8: Forms, Validation & Dynamic UI](https://www.cea.ng/classes/web-development/forms-validation-dynamic-ui)[Next session 10: Debugging & Quality](https://www.cea.ng/classes/web-development/debugging-and-quality)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
