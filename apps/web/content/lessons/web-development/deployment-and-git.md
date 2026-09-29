---
title: "Session 11: Deployment & Git Workflow"
description: "A project on your machine is unfinished work. This session covers testing and cleaning up before release, a real Git workflow with branches, deployment concepts, hosting options, and getting a domain — then putting a project live."
date: "2026-09-12"
class_slug: "web-development"
---

A project on your machine is unfinished work. This session covers testing and cleaning up before release, a real Git workflow with branches, deployment concepts, hosting options, and getting a domain — then putting a project live.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Test and fix a project before anyone else sees it

- Clean up code so it is readable by someone else

- Use branches and pull requests rather than committing to main

- Explain what deployment actually does

- Choose a host and publish a site

- Understand what a domain is and how it connects

## The taught content

### Testing before release

Test the things that only break in someone else's hands. **Every link** — a link that goes nowhere is the most common defect on a small site and takes two minutes to find. **Every form**, submitted with real data and with nonsense. **Every page at every width** you tested before. **Images** all loading, with no missing files showing broken icons.

Then the checks people forget. **Console errors** — open the developer tools on every page and confirm it is clean, because an error you have learned to ignore is still breaking something for a visitor. **Loading on a slow connection** — throttle the network in developer tools, because a page that loads instantly on your machine may take ten seconds on mobile data. **Another browser and another device** if you can, since a layout that works in one engine does not always work in another.

And the honest one: **have someone else use it**. Watch them, without explaining anything. Where they hesitate or click the wrong thing is where the design failed, and you cannot find those problems yourself because you already know how it works.

### Cleaning up the code

Code cleanup is not vanity — it is whether anyone, including you in three months, can work on the project again. Remove **dead code**: commented-out blocks you kept 'just in case', functions nothing calls, styles applied to elements that no longer exist. A reader cannot tell which commented code is a note and which is abandoned, so both become noise.

Then **consistency**: the same naming style throughout, the same indentation, the same way of doing the same thing. Inconsistent code forces a reader to re-learn your conventions in every file. A formatter removes this work entirely — configure one once and it enforces the style on save, so consistency costs nothing.

And **remove anything secret before you publish**. API keys, passwords, test credentials and personal data must not be in a public repository, and this is urgent rather than tidy: once pushed, a secret is in the history forever and must be treated as compromised and rotated. Keep secrets out of the repository from the start rather than removing them later.

### Git workflow

The core loop is **`add`, `commit`, `push`**, and the discipline is small commits with messages explaining **why**. 'Add contact form validation' tells you something in six months; 'fixed stuff' does not. Commit after each working change rather than at the end of a session, because small commits are easy to understand, easy to review and easy to undo.

Then **branches**, which let you work on something without disturbing the working version. `git branch feature-name` creates one, `git checkout feature-name` moves you onto it, and commits there do not touch `main` until you merge. This matters even on a solo project: it means you can experiment without fear, and `main` always holds a version that works.

A **pull request** is a request to merge a branch, and it is where changes get reviewed before they land. On a team it is the normal way code moves forward; on a solo project it is still useful, because the diff view shows you exactly what you changed and the description forces you to say why. Then `git pull` brings others' changes down, and when two people edited the same lines you get a **merge conflict** — Git shows you both versions and you choose. Conflicts are normal, not a failure, and the fix is to read both sides and decide deliberately.

### What deployment is

**Deployment** means putting your files somewhere a browser can reach them over the internet. For a static site — HTML, CSS and JavaScript, with no server code — that is genuinely all it is: your files, on a machine that is always on, served at an address. There is no compilation step and no server configuration to learn.

The modern way is a **hosting platform connected to your GitHub repository**. You authorise it, choose the repository, and it publishes the site and gives you a URL. Then every `git push` **redeploys automatically**, which means publishing is not a separate nervous step — you push, and a minute later the live site is updated. This removes the entire class of 'I forgot to upload the new file' problems.

The alternative is uploading files by FTP to a traditional host, which still exists and still works, but it is manual, error-prone and easy to get out of sync with what is in your repository. For a new project there is no reason to prefer it, and the automatic route means your live site always matches your repository.

### Hosting and domains

For a static site, **free tiers are genuinely adequate** — platforms like GitHub Pages, Netlify and Vercel host static sites at no cost with HTTPS included, which was not true a few years ago and is worth knowing. Their free URLs are subdomains of theirs, which is fine for a portfolio project and worth replacing when the site represents a business.

A **domain** is the human-readable address — `yourname.com` — and it is bought from a registrar, usually for a modest annual fee in naira or dollars. Owning it means you can move hosts without changing your address, which matters: a site on a platform's subdomain is tied to that platform, and a business built on someone else's address is fragile.

Connecting them is a matter of **DNS records** — you tell the registrar where the site actually lives, usually by pointing the domain at the host or adding the records the host gives you. It takes minutes to configure and up to a day to propagate, which is why a newly connected domain sometimes appears not to work immediately. It is working; it has not spread yet.

## Instructor demonstration

The instructor takes a finished project through release: testing every link and form, cleaning the code and removing a committed secret, creating a branch and opening a pull request, merging it, connecting the repository to a host so a push redeploys automatically, then pointing a real domain at it.

### Click every link

Go through the whole site and confirm each destination. Explain that a dead link is the most common defect on a small site and takes minutes to find.02

### Submit every form twice

Once with real data and once with nonsense. Explain that the nonsense submission is the one that reveals missing validation.03

### Check the console on every page

Confirm it is clean. Explain that an error you have learned to ignore is still breaking something for a visitor.04

### Throttle the network

Reload on a simulated slow connection. Explain that a page instant on your machine may take ten seconds on mobile data.05

### Watch someone else use it

Observe without explaining anything. Explain that where they hesitate is where the design failed, and you cannot find those problems yourself.06

### Remove dead code

Delete commented-out blocks, unused functions and styles for elements that no longer exist. Explain that a reader cannot distinguish a note from abandoned code.07

### Set up a formatter

Configure one and format the project. Explain that consistency then costs nothing because it is enforced on save.08

### Find and remove a secret

Locate a key in the history and explain that it must be rotated. Explain that once pushed, a secret is in the history forever.09

### Create a branch

Branch, commit there, and show that main is untouched. Explain that this means you can experiment without fear.10

### Open a pull request

Push the branch and open the request with a description. Explain that the diff shows exactly what changed and the description forces you to say why.11

### Merge and resolve a conflict

Merge the branch, then create and resolve a conflict deliberately. Explain that conflicts are normal and the fix is to read both sides and decide.12

### Connect the host

Authorise the platform against the repository and publish. Explain that every push then redeploys automatically, so the live site always matches the repository.13

### Push and watch it deploy

Make a change, push, and reload the live URL. Explain that this removes the whole class of 'I forgot to upload the file' problems.14

### Point a domain at it

Add the DNS records the host provides. Explain that propagation can take up to a day, so a domain that does not work immediately is usually working.

## Guided practice

### Take a project live

You take a finished project through the whole release: every link and form tested, the console clean on every page, the code cleaned and secrets removed, a branch created and merged through a pull request, the repository connected to a host that redeploys on push, and a domain pointed at it — with a written record of what each step involved.

1. 01Click every link on every page and fix any dead destination.

2. 02Submit every form with valid data and confirm it works.

3. 03Submit every form with nonsense and confirm validation catches it.

4. 04Open the console on every page and fix any error.

5. 05Throttle the network and confirm the page is usable on a slow connection.

6. 06Have one person use the site while you watch without explaining.

7. 07Note where they hesitated and fix the most serious problem found.

8. 08Delete commented-out code, unused functions and orphaned styles.

9. 09Run a formatter so the style is consistent throughout.

10. 10Search the repository and its history for any secret and rotate anything found.

11. 11Create a branch for your remaining changes.

12. 12Commit with messages explaining why, then push the branch.

13. 13Open a pull request with a description of what changed and why.

14. 14Merge the branch into main.

15. 15Connect the repository to a static host and publish.

16. 16Make a small change, push, and confirm the live site updates automatically.

17. 17Register a domain and add the DNS records your host provides.

18. 18Confirm the site loads over HTTPS on your own domain.

19. 19Write down what each step involved and what surprised you.

The standard we hold you to

A live project where every link was clicked and every form submitted with both valid and invalid data, the console confirmed clean on every page, usability checked on a throttled connection and by watching an uninstructed person with the most serious problem found actually fixed; dead code removed, a formatter applied, the repository and history searched for secrets with anything found rotated; a branch created and merged through a pull request with a descriptive message and explanation; the repository connected to a static host that redeploys on push and verified by pushing a change; and a registered domain with DNS records added, loading over HTTPS — with a written record of each step.

## Common mistakes and how to fix them

You publish without clicking every link

Fix: Test every link on every page. A dead link is the most common defect on a small site, it is immediately visible to a visitor, and it takes two minutes to find.

You ignore console errors you have got used to

Fix: Fix them before publishing. An error you have learned to tolerate is still breaking something for a visitor, and a clean console is a basic mark of finished work.

You only test on your own fast connection

Fix: Throttle the network in developer tools. A page that loads instantly on your machine may take ten seconds on mobile data, which is how most people will reach it.

You keep commented-out code 'just in case'

Fix: Delete it — Git has the history if you need it back. A reader cannot tell which commented code is a note and which is abandoned, so both become noise.

You pushed a secret to a public repository

Fix: Treat it as compromised and rotate it immediately. Removing it from the current file does not remove it from the history, so it must be considered exposed.

You commit everything to main

Fix: Use a branch and merge through a pull request. Even solo, it means main always holds a working version and the diff shows you exactly what changed.

You deploy by uploading files manually

Fix: Connect the repository to a host that redeploys on push. Manual uploading drifts out of sync with the repository, and automatic deployment removes the whole class of forgotten-file problems.

You panic when a new domain does not work immediately

Fix: DNS propagation can take up to a day. The records are usually correct and simply have not spread yet, so wait before changing anything.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Have someone else use your site while you watch and say nothing. Where they hesitate or click wrongly is where the design failed, and you cannot find those problems yourself because you already know how it works.

- Connect your repository to a host that redeploys on push. It makes the live site always match the repository and removes the entire class of forgotten-upload problems, which is the most common way a small site goes stale.

- Never commit a secret, and rotate immediately if you do. Removing a key from the current file does not remove it from Git history, so once pushed it must be treated as compromised.

- Own your domain rather than building on a platform subdomain. It costs little annually and it means you can change hosts without changing your address — a business built on someone else's address is fragile.

## Key termsDeploymentPutting your files where a browser can reach them. For a static site, that is genuinely all it is.BranchA line of work that does not disturb main. Lets you experiment without risk.Pull requestA request to merge a branch, with a diff and a description. Where changes are reviewed before landing.Merge conflictTwo edits to the same lines. Normal, not a failure; resolved by reading both sides and deciding.Static hostingServing HTML, CSS and JavaScript with no server code. Free tiers with HTTPS are adequate for most portfolios.Continuous deploymentRedeploying automatically on every push. Makes the live site always match the repository.DomainA human-readable address you own. Lets you change hosts without changing your address.DNS propagationThe spread of new DNS records. Can take up to a day, so a new domain may appear not to work immediately.

## Homework before the next session

Run a pre-release test pass

Every link, every form twice, the console on every page, and the page on a throttled connection. Write down what you found — it is usually more than you expected.

Clean up one project

Delete commented-out code, unused functions and orphaned styles, then run a formatter. Search the history for any secret and rotate anything you find.

Use a branch and a pull request

Branch, commit with messages explaining why, push, open a pull request with a description, and merge. Do it once on a solo project and it becomes the default.

Publish one site

Connect the repository to a free static host, confirm a push redeploys automatically, then register a domain and add the DNS records.

## Assessment rubric

How this session is marked. The certificate for Web Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Testing | Checks it works. | Every link clicked, every form submitted with valid and invalid data, the console clean on every page, and usability checked on a throttled connection and by an uninstructed person. |
| Code quality | Code runs. | Dead code removed, a formatter enforcing consistent style, and the repository and its history searched for secrets with anything found rotated. |
| Git workflow | Commits and pushes. | Small commits with messages explaining why, work done on branches, changes merged through a pull request with a description, and conflicts resolved by reading both sides. |
| Deployment | Has a live site. | Connected to a host that redeploys on push, verified by pushing a change and watching it appear, so the live site always matches the repository. |
| Domain and HTTPS | Uses a platform URL. | A registered domain with DNS records added and propagation understood, loading over HTTPS, with the reasoning about owning an address explained. |

## Session questionsWhat is the difference between Git and GitHub?+

Git is version control running on your own machine — history, snapshots and recovery, with no internet required. GitHub is a place to store those snapshots online, which adds a backup, collaboration through pull requests, and a portfolio link. Git works fully without GitHub.Do I need branches if I work alone?+

It is still worth it. A branch means main always holds a version that works, so you can experiment without fear, and a pull request gives you a diff showing exactly what changed plus a description forcing you to say why. It costs seconds and pays off the first time something goes wrong.How much does it cost to put a site online?+

For a static site, nothing for hosting — GitHub Pages, Netlify and Vercel all have free tiers with HTTPS included. A domain costs a modest annual fee and is worth having so you can change hosts without changing your address.My domain is not working after I set it up. What is wrong?+

Probably nothing yet. DNS propagation can take up to a day, so the records are usually correct and simply have not spread. Check them once, then wait before changing anything — fiddling during propagation makes it harder to tell what worked.I committed a password to GitHub. Is it a problem?+

Yes, and you should treat it as exposed now. Removing it from the current file does not remove it from the history, so anyone can still find it. Rotate the credential immediately, and keep secrets out of repositories from the start rather than removing them later.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session10: Debugging & Quality](https://www.cea.ng/classes/web-development/debugging-and-quality)[Next session 12: Portfolio & Final Presentation](https://www.cea.ng/classes/web-development/portfolio-and-presentation)

Web Development

6 weeks · 12 sessions · ₦60,000 · you leave with a working, published web project[See the full course](https://www.cea.ng/classes/web-development)[Enrol now](https://www.cea.ng/admissions)
