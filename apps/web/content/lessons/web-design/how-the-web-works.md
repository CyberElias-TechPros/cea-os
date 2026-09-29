---
title: "Session 1: How the Web Works"
description: "Before writing a line of code you need to know what a browser is actually doing. This session covers how the web works — clients, servers, DNS, HTTP and what happens between typing a URL and seeing a page — then the three languages and the tools, and ends with your first page running in a browser."
date: "2026-09-12"
class_slug: "web-design"
---

Before writing a line of code you need to know what a browser is actually doing. This session covers how the web works — clients, servers, DNS, HTTP and what happens between typing a URL and seeing a page — then the three languages and the tools, and ends with your first page running in a browser.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what happens between typing a URL and seeing a page

- Distinguish client from server, and front end from back end

- Explain what HTML, CSS and JavaScript are each responsible for

- Set up a working development environment

- Use browser developer tools to inspect and change a live page

- Write, run and correct your first HTML page

## The taught content

### What actually happens when you open a website

You type `ceaproducts.ng` and press enter, and about a second later a page appears. In that second several distinct things happened, and understanding them is what separates someone who can build a site from someone who can only edit one. Your computer is the **client**; it asks. Somewhere else, a **server** — an ordinary computer, kept on permanently, connected to the internet — holds the files and answers.

First your computer had to find the server. It cannot route to a name, only to a number, so it asked a **DNS** server — the internet's phone book — which translated `ceaproducts.ng` into an **IP address** such as `104.21.44.9`. Then it opened a connection to that address and sent an **HTTP request**: essentially 'please send me the page at this path'. The server responded with an **HTTP status code** — 200 meaning 'here it is', 404 meaning 'there is nothing at that path', 500 meaning 'the server itself broke' — followed by the file, which is usually HTML.

Your **browser** then read that HTML, and every time it found a reference to something else — a stylesheet, an image, a script — it sent another request for that too. A single page commonly involves thirty or more requests. This is why a slow website is usually slow for a boring reason: too many requests, or files that are too large. It is also why the status codes matter to you personally — a 404 means your file is in the wrong place or named wrongly, and knowing that saves hours of confusion later.

### Client, server, front end, back end

The **client** is whatever requests: your laptop's browser, your phone. The **server** is whatever responds. That split is the whole architecture of the web, and almost every confusing problem resolves once you ask which side it is on. A layout that looks wrong is a client problem. A page that will not load at all is usually a server or DNS problem. Mixing them up is the most common beginner error in debugging.

**Front end** is everything the browser runs — HTML, CSS and JavaScript sent to the client. **Back end** is everything running on the server: the database, the accounts, the payment processing, the logic that decides what to show whom. A static site like a business brochure has almost no back end; the server just hands over files. An application like a bank has a great deal.

This course is front end only, and that is a deliberate and honest scope. Everything you need to build a professional business website is front end plus a hosting service. When a client needs accounts, payments or a database, that is a different discipline — Web Development covers it, and knowing where your competence ends is a professional strength, not a weakness.

### The three languages and what each does

**HTML** is structure and meaning. It says: this is a heading, this is a paragraph, this is a picture of the product, this is a link to the contact page. It is not styling and it is not behaviour. Written well, an HTML page makes sense with all the styling removed — which matters for search engines, for screen readers used by blind visitors, and for anyone on a slow connection where the styling arrives late.

**CSS** is presentation: colour, size, spacing, position, and how all of those change on a phone versus a desktop. Separating it from HTML is not pedantry — it means one stylesheet can restyle a whole site, and changing a brand colour becomes a one-line edit rather than a hundred.

**JavaScript** is behaviour: what happens in response to something. A menu that opens, a form that validates before sending, a gallery that advances. In a business website you will use very little of it, mostly through things other people wrote, and that is fine. The important thing is knowing which language is responsible when something is wrong, because looking for a layout problem in JavaScript is how an afternoon disappears.

A useful analogy that holds up: HTML is the skeleton and the organs, CSS is the appearance, JavaScript is the movement. Remove the CSS and the body still functions, looking plain. Remove the HTML and there is nothing at all.

### Setting up an environment that does not fight you

You need two things and no more. A **text editor** — VS Code is free, is the professional standard, and is what this course assumes. And a **browser** with developer tools, which every modern browser has built in. That is the whole setup. You do not need a server running on your laptop to build a static site; you can open an HTML file directly in a browser.

Configure VS Code once and it pays for itself. Install the **Live Server** extension, which serves your folder locally and reloads the page automatically every time you save — this removes the tedious save-and-refresh cycle that makes beginners think their edits did nothing. Enable **word wrap** and **format on save** in settings so long lines do not run off the screen and your indentation stays consistent without effort. Turn on **Emmet**, which is built in: typing `div.card>p` and pressing Tab expands into properly nested HTML, which is the fastest way to write structure there is.

Then learn three keyboard habits immediately. **Ctrl+S** to save — Live Server only reloads on save, so forgetting it is the most common cause of 'my changes are not working'. **Ctrl+Shift+P** to open the command palette. And **F12** to open developer tools. That last one is the most valuable tool in this entire course and the next section explains why.

### Developer tools: the professional's advantage

Developer tools let you inspect and change any live webpage, including ones you did not build, and see the result instantly. Press **F12** on any site. The **Elements** panel shows the HTML as the browser sees it; clicking any element highlights it on the page and shows the CSS currently applied to it, with a box diagram showing its size, padding, border and margin. You can edit any of it right there and watch the page change. Nothing you do in dev tools is permanent — refreshing restores the original — which makes it a completely safe place to experiment.

The **Console** panel shows errors, and reading them is a real skill. A red message naming a file and a line number is the browser telling you exactly what is wrong; beginners ignore it and stare at the code instead. The **Network** panel shows every request the page made, how long each took, and which failed — this is where you diagnose a slow site or a missing image. The **device toolbar** — the phone icon — lets you view the page at any screen size, which is essential once you build for phones.

Practise on sites you did not build. Open a Nigerian business website, inspect its heading, change its colour, look at what fonts and colours it uses, check how many requests it makes. Twenty minutes of this teaches more about how real sites are built than any tutorial, and it is exactly how working designers reverse-engineer a look they admire.

## Instructor demonstration

The instructor traces a real URL through DNS and HTTP in the terminal, inspects a live Nigerian business site in developer tools, then sets up a project folder and gets a first page running with Live Server.

### Resolve a domain

Run `nslookup` on a real domain and show the IP address it resolves to. Explain that a name is only a convenience and the network routes to the number.02

### Make a raw HTTP request

Use `curl -I` on a real site and read the response: the 200 status, the content type, the server header. Explain that this is the entire conversation, visible.03

### Trigger a 404 deliberately

Request a path that does not exist and show the 404. Explain that this is what a misnamed or misplaced file produces, and that it is a normal, informative answer.04

### Inspect a live business site

Open a Nigerian business site, press F12, click its heading and show the HTML and the CSS applied to it. Change the colour in the panel and watch the page respond.05

### Read the box model live

Show the computed box diagram for an element — content, padding, border, margin — and explain that this diagram governs every layout decision you will make.06

### Read the Network panel

Reload with the Network panel open and count the requests. Sort by size and identify the largest file. Explain that this is how a slow site is diagnosed.07

### Use the device toolbar

Switch to a phone viewport and show how the same page responds or fails to. Explain that most Nigerian visitors arrive on a phone.08

### Create the project folder

Make a folder, open it in VS Code, and explain that one folder per project is the discipline that keeps work findable months later.09

### Install Live Server

Install the extension, enable format on save and word wrap. Explain that automatic reload on save removes the confusion of edits appearing not to work.10

### Write the first page

Type the minimal document: doctype, html, head with a title, body with an h1 and a paragraph. Explain what each part is for rather than treating it as a spell.11

### Break it and read the console

Deliberately write a broken tag, save, and show that the browser recovers rather than crashing — and how dev tools reveals what happened.12

### Inspect your own page

Open dev tools on the new page, edit the heading in the panel, and confirm the file on disk is unchanged. Explain that dev tools edits are temporary and safe.

## Guided practice

### Trace the web, then build a page

You trace a real website from DNS through HTTP using terminal commands, reverse-engineer one live site in developer tools, then set up a project folder and get your first HTML page running with Live Server.

1. 01Resolve the domain of a real Nigerian business with nslookup and record the IP address.

2. 02Make a raw HTTP request to it with curl -I and record the status code and content type.

3. 03Deliberately request a path that does not exist and record the 404.

4. 04Open a live business site and press F12.

5. 05Inspect its main heading and write down the font family, size and colour you find.

6. 06Change two styles live in the Elements panel and confirm the page responds.

7. 07Open the Network panel, reload, and record the total request count and the largest file.

8. 08Switch to a phone viewport and note one thing that breaks or survives.

9. 09Create a project folder and open it in VS Code.

10. 10Install Live Server and enable format on save and word wrap.

11. 11Write a page with a doctype, head, title, an h1 and two paragraphs about a real business.

12. 12Open it with Live Server, inspect it with F12, and change one thing in the panel.

The standard we hold you to

A recorded trace showing DNS resolution, a real HTTP status code and a 404; a written reverse-engineering of one live site naming font, size, colour, request count and largest file; and a working project folder whose page loads via Live Server and can be inspected in developer tools.

## Common mistakes and how to fix them

You edit the file but the browser does not change

Fix: Save it — Live Server reloads on save, and an unsaved file is the most common cause of 'my changes are not working'. Then hard-refresh with Ctrl+Shift+R to bypass the browser cache, which is the second most common cause.

You are looking for a layout problem in JavaScript

Fix: Layout is CSS. Ask which language owns the problem: structure is HTML, appearance is CSS, behaviour is JavaScript. Looking in the wrong one is how an afternoon disappears.

You ignore the console error

Fix: Read it. A red message naming a file and line is the browser telling you exactly what is wrong. Beginners stare at the code while the answer is printed one panel away.

You got a 404 and assumed the site was broken

Fix: A 404 means nothing exists at that path — usually a misnamed or misplaced file. It is an informative answer, not a catastrophe. Check the filename, its case, and its folder.

You thought your dev tools edits would save

Fix: They never do. Dev tools changes are temporary and refreshing restores the original, which is what makes it a safe place to experiment. Copy anything you like into your actual file.

You installed a stack of tools before writing anything

Fix: You need a text editor and a browser. Nothing else. Excess setup is procrastination, and a static business site needs no server running on your machine.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Learn F12 as a reflex rather than a technique. Every debugging problem in front-end work is answered faster by inspecting the live page than by reading the source, and professionals reach for it before they reach for the code.

- Read the Network panel on every site you admire. Request count and largest file tell you how the page was built and where its compromises are, and it trains you to build pages that load fast on a Nigerian mobile connection rather than on a fibre line.

- Keep one folder per project and name it with the client and the date. It sounds trivial and it is the difference between finding a site you built eight months ago in ten seconds and spending an hour searching, which is exactly what happens when a client returns for a change.

- Practise by reverse-engineering rather than by copying tutorials. Inspecting a real site and rebuilding one section from what you find teaches decision-making; following a tutorial teaches typing.

## Key termsClientWhatever requests — your browser. The side that runs HTML, CSS and JavaScript.ServerA permanently connected computer holding files and answering requests.DNSThe system translating a domain name into an IP address, because networks route to numbers, not names.IP addressThe numeric address of a machine on the network, such as 104.21.44.9.HTTP requestThe client's message asking for a resource at a path. Every image and stylesheet is another one.Status codeThe server's answer in a number: 200 found, 404 not found, 500 server error.Browser cacheStored copies of files so a page loads faster. Hard-refresh with Ctrl+Shift+R to bypass it.Developer toolsThe built-in F12 panel for inspecting and temporarily editing any live page.

## Homework before the next session

Trace three websites

For each, record the resolved IP, the status code, the content type, the request count and the largest file. This makes the invisible machinery concrete.

Reverse-engineer one site you admire

Inspect it and write down its heading font and size, its two main colours, its body font, and how many requests it makes. Bring the notes to the next session.

Learn five dev tools habits

F12, click-to-inspect, edit a style live, open the Console, open the Network panel. Use only these for twenty minutes on any site.

Build the smallest useful page

One folder, one HTML file, a title, an h1 and two paragraphs about a real business. Get it running with Live Server. Everything after this builds on it.

## Assessment rubric

How this session is marked. The certificate for Web Design is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Architecture understanding | Can describe client and server. | Explains the full sequence from DNS to rendered page, and can say which side a given problem lives on. |
| Language roles | Knows the three languages exist. | States what each owns and can identify which one to look in for a given symptom. |
| Environment | Has an editor and a browser. | VS Code with Live Server, format on save and word wrap configured, and a page loading automatically on save. |
| Developer tools | Can open dev tools. | Inspects elements, edits styles live, reads console errors and the Network panel, and uses the device toolbar. |
| First page | Produces a page that loads. | Correct document structure with a meaningful title, loads via Live Server, and can be inspected and temporarily edited in dev tools. |

## Session questionsDo I need to install anything on my computer to run a website?+

Not to build a static one. A text editor and a browser are enough, and you can open the HTML file directly. A local server becomes necessary when you add a back end, which is what Web Development covers.Is HTML still worth learning with website builders around?+

Yes, and it is what makes you useful. Builders produce pages you cannot fix when they misbehave, and clients who outgrow a builder come to someone who understands the underlying structure. Knowing HTML also makes every builder easier to use.How much JavaScript do I need for this course?+

Very little. Business websites mostly use JavaScript other people wrote — a slider, a form handler, an analytics snippet. Sessions seven and eight show how to add those safely. Deep JavaScript is Web Development territory.What is the difference between this course and Web Development?+

Web Design is the front end: structure, presentation, layout, responsiveness, accessibility and publishing a site. Web Development adds the back end — databases, accounts, server logic and application behaviour. Most Nigerian small-business websites need only the front end.My page works on my laptop but not on my phone. Why?+

Almost always because it was never made responsive, or because you are testing by shrinking a desktop window rather than using the device toolbar. Session six covers responsive design properly; until then, test on a real phone, not on a narrowed browser.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: HTML Structure](https://www.cea.ng/classes/web-design/html-structure)

Web Design

4 weeks · 8 sessions · ₦50,000 · you leave with a published 3–5 page website[See the full course](https://www.cea.ng/classes/web-design)[Enrol now](https://www.cea.ng/admissions)
