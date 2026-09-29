---
title: "Session 1: App Concepts & Scoping"
description: "Most app projects fail before any code is written, because the idea was too big and nobody cut it down. This session covers what actually makes an app different from a website, how to choose a first project you will finish, scoping a version one that is genuinely small, and the platform conventions that decide whether an app feels right."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

Most app projects fail before any code is written, because the idea was too big and nobody cut it down. This session covers what actually makes an app different from a website, how to choose a first project you will finish, scoping a version one that is genuinely small, and the platform conventions that decide whether an app feels right.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what an app offers that a website does not

- Choose a first project that is small enough to finish

- Cut an idea down to a realistic version one

- Distinguish must-have features from nice-to-have ones

- Describe the main conventions that differ between iOS and Android

- State honestly what is and is not possible without a Mac

## The taught content

### Why an app, and why not

You already build for the web, so the first useful question is not **how do I build an app** but **does this need to be one**. An app differs from a website in four specific ways: it is **installed**, so it opens instantly and sits on a home screen; it can **work offline**, holding its own data; it has **direct access to the device** — camera, location, notifications, contacts; and it can run in the **background**, doing things while the user is elsewhere.

If your idea needs none of those, a website is the better answer. It is cheaper to build, needs no app store approval, updates instantly for everyone, and works on any device with a browser. **A great many app ideas are website ideas wearing a costume**, and recognising that early saves months.

Where an app genuinely wins is **frequency and presence**. Something used several times a day — an expense tracker, a habit log, a delivery app — benefits from being installed, opening fast and working on a bad connection. That is the category our course project sits in, and it is the category worth learning to build for.

### Choosing a first project you will finish

The commonest reason a first app is never finished is that it was the wrong project. Three tests decide it. **Would you use it yourself?** A project you would actually open is a project you will keep fixing, and you become your own tester with real opinions. **Is the data real?** An app with invented sample data teaches you nothing about edge cases; an app tracking your own spending immediately shows you what happens with a zero, a huge number, a missing category.

The third test is the important one: **can it be finished in four weeks by one person?** Almost every first idea fails this, and the fix is not more time but a smaller app. Our course project is deliberately modest — record an expense, list the expenses, show a monthly total by category. Four screens. It is small enough to complete and complete properly, and it still touches every concept in the course.

The trap to avoid is the **idea that impresses**. A marketplace, a ride app, a social network — these are enormous systems with two-sided problems, payments, moderation and trust, and they are the wrong first project however exciting. Build something small, finish it, ship it, and you will have learned more than a year of planning something large.

### Scoping version one

**Scoping** means deciding what version one is, and the discipline is that version one is **the smallest thing that still works as a product**. Not the smallest thing you can build — the smallest thing a user could open and get value from. For the expense tracker that means adding and listing expenses; it does not mean charts, budgets, receipts or multiple currencies, however obvious those feel.

The method is to write **every feature you can think of**, then split each into **must-have** — without it the app does not work — and **nice-to-have** — with it the app is better. Version one is the must-haves only. The nice-to-haves go in a list for later, which matters psychologically: you are not abandoning them, you are ordering them.

Then the test that catches most over-scoping: **can you describe version one in one sentence?** **Record expenses and see a monthly total by category.** If your version one needs three sentences, it is three versions. And the corollary worth internalising — **a finished small app is worth more than an unfinished ambitious one**, in your portfolio, in your learning, and in your confidence.

### Platform conventions

An app that works but feels wrong is usually ignoring **platform conventions** — the expectations users have absorbed from every other app on their phone. The largest differences sit between iOS and Android. **Android has a system back button** (hardware or gesture) that must behave sensibly; iOS does not, so back is always an on-screen control. **Navigation placement differs**: Android apps often put navigation in a drawer or at the top, iOS apps in a bottom tab bar.

Smaller conventions add up: **swipe to go back** is standard on iOS, **long-press menus** behave differently, **date and number formats** vary by region, and **status bar** colour and content are handled differently. None of these break an app, and all of them make one feel slightly foreign.

The practical approach for a first app is to **follow the framework's defaults**, which are already platform-aware, rather than inventing your own navigation. A standard tab bar with three or four items feels correct on both platforms; a custom gesture-based navigation you designed feels like yours, and not in a good way. Custom interaction is earned after the basics work.

### What is possible without a Mac

This is worth being precise about, because vague promises here waste people's money. **You do not need a Mac to learn mobile development or to build a working app.** The toolchain we use runs on Windows and Linux, you can develop and test on an **Android device** or in a **browser-based simulator**, and you can even distribute an Android app without ever touching macOS.

**Apple's App Store is the exception, and it is a hard one: final iOS builds require macOS.** There is no legitimate way around it, and any course or tool claiming otherwise is describing a workaround that will fail at the point you need it. So if your goal is publishing to the App Store, you will eventually need a Mac — or a client who has one, or a cloud build service, which is a real option but not a free one.

The honest framing is that **the skills are the same and the last mile differs**. Everything in this course — screens, navigation, state, data, testing — applies to both platforms, and an app built here can be shipped to iOS later by someone with the right machine. We say this plainly rather than letting you discover it in week six.

## Instructor demonstration

The instructor takes three real app ideas from the class — including one that is far too big — and scopes each one live on the board: separating must-have from nice-to-have, cutting to version one, testing whether it needs to be an app at all, and stating what each would require to ship.

### Write three app ideas from the class on the board

Include one ambitious marketplace idea. Explain that the ambitious one is the most common first project and the least likely to be finished.02

### Ask of each whether it needs to be an app

Test for installation, offline use, device access and background work. Explain that a great many app ideas are website ideas wearing a costume.03

### Reject one idea as a website

Explain that a website is cheaper, needs no store approval, updates instantly and works on any device, so it is the better answer when an app's advantages are not needed.04

### List every feature of the marketplace idea

Write them all down. Explain that scoping starts from a complete list, because you cannot cut what you have not written.05

### Split into must-have and nice-to-have

Ask whether the app works without each one. Explain that must-have means the product does not function without it.06

### Show the marketplace's must-have list is still enormous

Two-sided matching, payments, moderation, trust. Explain that this is why it is the wrong first project however exciting it is.07

### Introduce the expense tracker as the course project

Record an expense, list them, show a monthly total by category. Explain that four screens is small enough to finish properly and still touches every concept.08

### Test it against the three project tests

Would you use it, is the data real, can one person finish it in four weeks. Explain that passing all three is what makes a first project survivable.09

### Write version one in one sentence

Explain the test: if version one needs three sentences, it is three versions.10

### List the deferred features explicitly

Charts, budgets, receipts, multiple currencies. Explain that writing them down matters psychologically, because you are ordering them rather than abandoning them.11

### Draw the screen flow on the board

Four screens and the arrows between them. Explain that a flow you can draw in thirty seconds is a scope you can build in four weeks.12

### Walk through Android navigation conventions

Show the system back button and where navigation typically sits. Explain that a first app should follow framework defaults rather than invent interaction.13

### Walk through the iOS differences

No system back, bottom tab bar, swipe to go back. Explain that none of these break an app and all of them make one feel foreign if ignored.14

### State the Mac position plainly

Android and browser simulators need no Mac; final App Store builds require macOS. Explain that the skills are identical and only the last mile differs.15

### Write each student's version one sentence

One sentence each. Explain that leaving with a scoped sentence is the actual deliverable of this session.

## Guided practice

### Scope an app you will actually finish

You choose a first project against three tests, write down every feature you want, cut it to a version one you can describe in one sentence, draw the screen flow, and state honestly what it would take to ship on each platform.

1. 01Write down three app ideas you have.

2. 02Test each against installation, offline use, device access and background work.

3. 03Decide which genuinely needs to be an app rather than a website, and say why.

4. 04Test your chosen idea against the three project tests: would you use it, is the data real, can one person finish it in four weeks.

5. 05Write down every feature you can imagine for it.

6. 06Mark each feature must-have or nice-to-have by asking whether the app works without it.

7. 07Check that your must-have list is small enough to build in four weeks.

8. 08Write version one as a single sentence.

9. 09If it needs more than one sentence, cut it again and rewrite.

10. 10List every deferred feature explicitly so nothing feels abandoned.

11. 11Draw the screen flow on paper: every screen and every arrow between them.

12. 12Count your screens and confirm it is four or fewer for version one.

13. 13Name the platform conventions your app must respect, including back behaviour.

14. 14State what you would need to ship it on Android.

15. 15State what you would need to ship it on iOS, including the macOS requirement.

16. 16Write one paragraph on what you would build in version two.

The standard we hold you to

A scoped first project with three ideas written down and each tested against installation, offline use, device access and background work; a chosen idea justified as needing to be an app rather than a website; the chosen idea confirmed against all three project tests; every imagined feature listed and marked must-have or nice-to-have by whether the app works without it; a must-have list small enough for four weeks; version one written as a single sentence and re-cut if it needed more; every deferred feature listed explicitly; the screen flow drawn on paper with every screen and arrow and confirmed at four screens or fewer; the platform conventions the app must respect named including back behaviour; the requirements to ship on Android and on iOS stated separately with the macOS requirement for App Store builds made explicit; and one paragraph describing version two.

## Common mistakes and how to fix them

You build an app that should be a website

Fix: Test for installation, offline use, device access and background work. If it needs none of them, a website is cheaper, needs no store approval, updates instantly and works on any device.

Your first project is a marketplace or social network

Fix: Pick something one person can finish. Two-sided systems with payments, moderation and trust are the wrong first project however exciting, and they are why most first apps are never finished.

Your version one needs three sentences to describe

Fix: Cut it until one sentence suffices. Version one is the smallest thing that still works as a product, not the smallest thing you can build.

You treat nice-to-have features as essential

Fix: Ask whether the app works without each one. If it does, the feature belongs in version two, and writing that down stops it feeling like an abandonment.

You use invented sample data

Fix: Use real data. Invented data teaches you nothing about edge cases, while your own spending immediately produces zeros, huge numbers and missing categories.

You design your own navigation from scratch

Fix: Follow the framework defaults, which are already platform-aware. A standard tab bar feels correct on both platforms; custom interaction is earned after the basics work.

You ignore the Android back button

Fix: Respect it. Android users expect it to behave sensibly, and an app that traps them or exits unexpectedly feels broken however well it is built.

You assume you can ship to iOS without a Mac

Fix: Plan for the reality. Final App Store builds require macOS, so if iOS publishing is the goal you will need a Mac, a client who has one, or a paid cloud build service.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Test whether your idea needs to be an app before you build one. Installation, offline use, device access and background work are the four real advantages, and a great many app ideas need none of them and would be better, cheaper websites.

- Choose a first project you would use yourself, with real data. You become your own tester with real opinions, and real data immediately produces the edge cases invented samples never will.

- Cut version one until it fits in one sentence. If it needs three sentences it is three versions, and a finished small app is worth more in your portfolio and your learning than an unfinished ambitious one.

- Be honest about the macOS requirement early. Android and browser-based simulators need no Mac and teach every skill in this course, but final App Store builds require macOS and no workaround changes that.

## Key termsNative advantageWhat an app offers a website: installation, offline use, device access, background work. If you need none, build a website.ScopingDeciding what version one is — the smallest thing that still works as a product, not the smallest thing you can build.Version oneMust-haves only. Describable in one sentence; if it needs three, it is three versions.Must-haveA feature without which the app does not function. Everything else is version two.Screen flowEvery screen and every arrow between them. A flow drawable in thirty seconds is a scope buildable in four weeks.Platform conventionUser expectations absorbed from every other app: back behaviour, navigation placement, gestures.System back buttonAndroid's hardware or gesture back. Must behave sensibly; iOS has no equivalent.macOS requirementApple requires macOS for final App Store builds. No legitimate workaround exists.

## Homework before the next session

Write your version one in one sentence

Then cut it again and see whether the sentence gets shorter without the app ceasing to work. Keep the shorter one.

Split one feature list into must and nice

Take any app idea and mark every feature. Count how many are genuinely must-have — it is usually fewer than a third of the list.

Draw the screen flow of an app you use daily

Every screen and arrow. Count them. This calibrates what a realistic app scope actually looks like.

Check one idea against the app tests

Installation, offline, device access, background. If it needs none, write down what you would build as a website instead and why that is better.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Choosing the platform | Has an app idea. | The idea tested against installation, offline use, device access and background work, with a clear justification for building an app rather than a website. |
| Project choice | Picks a project. | Confirmed against all three tests — personally useful, real data, finishable by one person in four weeks — and explicitly not a two-sided marketplace or social system. |
| Scoping | Lists features. | Every feature listed and marked must-have or nice-to-have, version one written in one sentence and re-cut until it fit, and deferred features recorded rather than dropped. |
| Flow and size | Knows the screens. | A drawn screen flow with every arrow, four screens or fewer for version one, and the flow drawable from memory in about thirty seconds. |
| Platform realism | Knows iOS and Android differ. | Conventions named including back behaviour, Android and iOS shipping requirements stated separately, and the macOS requirement for App Store builds stated without evasion. |

## Session questionsDo I need coding experience for this course?+

Yes — it assumes you can already write HTML, CSS and JavaScript, which means Web Development or equivalent. Mobile frameworks are much easier to learn as a second step than as a first one, and everything you know about components, state and layout carries across.Do I need a Mac to build iOS apps?+

For publishing to the Apple App Store, yes — Apple requires macOS for final builds. During the course you develop and test on Android and in browser-based simulators without a Mac, and every skill transfers. We are explicit about this rather than pretending it away.Should my first app be my business idea?+

Usually not. Marketplaces, ride apps and social networks involve two-sided matching, payments, moderation and trust, and they are why most first apps are never finished. Build something small with real data, finish it, then apply what you learned to the business idea.How small should version one be?+

Small enough to describe in one sentence and finish in four weeks alone. Ours records expenses and shows a monthly total by category — four screens. If your version one needs three sentences, it is three versions and you should cut it again.Is an app always better than a website?+

No. An app wins on installation, offline use, device access and background work. If your idea needs none of those, a website is cheaper to build, needs no store approval, updates instantly for everyone and works on any device with a browser.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Mobile UI Design](https://www.cea.ng/classes/mobile-app-development/mobile-ui-design)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
