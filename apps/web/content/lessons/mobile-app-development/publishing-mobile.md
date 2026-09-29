---
title: "Session 8: Publishing & Final Project"
description: "The final project and the last mile. This session covers what publishing actually involves, how Android and iOS distribution genuinely differ, the store requirements most people discover too late, the options for getting an app into real hands without a store at all, and finishing the expense tracker as a documented, working prototype."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

The final project and the last mile. This session covers what publishing actually involves, how Android and iOS distribution genuinely differ, the store requirements most people discover too late, the options for getting an app into real hands without a store at all, and finishing the expense tracker as a documented, working prototype.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what building, signing and distributing an app involves

- Describe Android publishing and its requirements accurately

- State the iOS position honestly, including the macOS requirement

- Prepare the store listing materials in advance

- Choose a distribution route appropriate to the project

- Finish and document the final prototype

## The taught content

### What publishing actually is

Publishing is three separate things that people conflate. **Building** produces the app package from your code. **Signing** proves the package came from you and has not been altered, using a private key you must keep — lose it and you cannot update your own app, which is a genuinely irreversible mistake. **Distributing** gets the signed package to users, through a store or directly.

The signing point deserves emphasis because it is the one with no recovery. Your **keystore** is what identifies you as the publisher, and every future update must be signed with the same key. Back it up in more than one place, keep it out of your public repository, and treat losing it as losing the app.

Then the part most first-time publishers underestimate: **the store review is not instant and not guaranteed**. Both stores check the listing, the behaviour and the declared data handling, and they reject apps — commonly for missing privacy policies, broken functionality, misleading descriptions or undeclared data collection. Budget time for a rejection and a resubmission rather than assuming a launch date.

### Android distribution

Android is the route available to everyone in this course, and it has a real advantage: **you do not have to use the Play Store at all**. An Android app can be shared as a package file directly — by link, by messaging, by a website — and installed by the recipient. For a first project, a church media team, or a small business with a handful of users, this is often the right answer and costs nothing.

Publishing to the **Google Play Console** involves a one-time registration fee, creating the listing with screenshots and a description, completing a **content rating questionnaire** and a **data safety form** declaring what data the app collects and why, and providing a **privacy policy URL** — which is mandatory even for an app that collects nothing, and catches people late.

Then the practical route for testing: Play's **internal and closed testing tracks** let you distribute to a limited list of people before a public release, which is how you get an app onto real devices without a full launch. For most course projects this, or direct distribution, is more appropriate than a public listing nobody asked for.

### iOS: the honest position

This is worth stating without softening, because it affects people's plans and money. **Publishing to the Apple App Store requires macOS.** Apple's build and upload tools run on macOS, and there is no supported way around it. So a student on Windows or Linux can build, test and ship an Android app from this course, and cannot publish to the App Store from their own machine.

There are workarounds and they all cost something: a **cloud build service** that builds on Apple hardware for you, a **rented Mac**, or a **client or collaborator who has one**. These are legitimate and used professionally, but none of them is free, and any course promising App Store publishing from a Windows laptop without mentioning this is not telling you the whole story.

The reassurance is that **the skills are identical**. Everything in this course — scoping, design, screens, navigation, state, data, testing — applies unchanged to iOS, and the framework produces iOS builds from the same code. What differs is the last mile and its cost, plus Apple's annual developer fee, which is a recurring charge rather than the one-time Android fee.

### Store requirements people discover late

The listing materials are not optional and they take longer than expected. **Screenshots** at specific resolutions for each device type — not one screenshot resized, but genuine captures per size. A **short description** with a hard character limit and a **full description** that explains what the app does without marketing padding. An **app icon** at the required resolution, which needs designing rather than improvising.

Then the policy items. A **privacy policy** hosted at a public URL is mandatory on both stores, even for an app that collects nothing, and it must actually say what the app does with data. The **data safety** declaration on Play and the equivalent **privacy nutrition label** on iOS require you to state precisely what you collect, whether it is linked to a user, and whether it is shared — and declaring nothing while your analytics SDK collects plenty is how accounts get suspended.

The practical advice is to **prepare these while you build**, not after. Writing a privacy policy takes an afternoon; discovering you need one the day you want to launch takes a week, because it has to be hosted somewhere and be accurate about your actual data handling.

### The final project, and what to show

The deliverable for this course is **a working app prototype you designed and built, running on a phone or emulator, with the screens and flow documented**. That last phrase matters as much as the first: an app nobody can understand is worth less than a smaller one that is explained.

So the documentation is short and specific. **The scope** — your version one sentence, and what you deliberately left out. **The screen flow** — the diagram from week one, updated to match what you actually built, including where reality differed. **The data model** — the record shape and where it is stored. **The testing** — your checklist results, with what you found and fixed. And **the known gaps**, honestly stated.

Stating the gaps is what makes the work credible rather than defensive. **Offline writes queue but conflicts resolve last-write-wins; no user accounts; tested on three Android devices and not on iOS.** A reviewer reads that as competence, because it shows you knew the boundaries of what you built. An app presented as finished when it is not is judged more harshly than the same app presented with its limits named.

## Instructor demonstration

The instructor walks the finished expense tracker through the whole last mile — producing a signed Android build, sharing it directly to a phone without a store, showing what the Play Console requires including the privacy policy people forget, stating the iOS position plainly, and reviewing a student's final documentation for the honesty that makes it credible.

### Separate building, signing and distributing

Name each. Explain that they are conflated constantly and that only signing has no recovery if you get it wrong.02

### Generate a keystore and explain what it is

Explain that it identifies you as the publisher, every update needs the same key, and losing it means losing the app.03

### Show how to back it up and where not to put it

Multiple locations, never in a public repository. Explain that this is the one irreversible mistake available in publishing.04

### Produce a signed Android build

Explain that this is the package a store or a direct link distributes.05

### Install it directly on a phone without a store

Explain that Android permits direct distribution, which for a first project or a small user group is often the right and free answer.06

### Open the Play Console and walk the requirements

One-time fee, listing, screenshots per device type. Explain that these take longer than expected and should be prepared while building.07

### Show the content rating questionnaire

Explain that it is mandatory and straightforward, and that skipping it blocks publication.08

### Show the data safety form

Explain that declaring nothing while an analytics SDK collects data is how accounts get suspended.09

### Show the privacy policy requirement

A public URL, mandatory even if the app collects nothing. Explain that this is the item most people discover the day they want to launch.10

### Show the internal testing track

Explain that distributing to a limited list is usually the right route for a course project rather than a public listing nobody asked for.11

### State the iOS position plainly

App Store publishing requires macOS, with no supported workaround. Explain that cloud builds, rented Macs and collaborators all cost something.12

### Confirm the skills transfer

Explain that the same code produces iOS builds and everything taught applies unchanged; only the last mile and its cost differ.13

### Discuss review timelines and rejections

Explain that review is neither instant nor guaranteed, and that budgeting for a rejection and resubmission is normal rather than pessimistic.14

### Review a student's scope sentence

Explain that documentation starts with version one in one sentence and what was deliberately left out.15

### Compare the week-one flow diagram with the built app

Explain that documenting where reality differed from the plan is more useful than a diagram pretending otherwise.16

### Review the data model and storage documentation

Explain that the record shape and where it lives is what lets someone else continue the work.17

### Review the checklist results

Explain that recording what testing found and fixed is evidence the app was tested rather than assumed to work.18

### Review the known gaps section

Explain that naming limits reads as competence, while presenting unfinished work as finished is judged more harshly than the same work with its limits stated.

## Guided practice

### Final project: ship and document the prototype

You finish the expense tracker, produce a signed Android build, get it onto a real device by a route you choose deliberately, prepare the listing materials you would need, and write the documentation — scope, flow, data model, testing results and known gaps — that makes the work credible to someone who did not build it.

1. 01Confirm the app passes your full pre-release checklist from the last session.

2. 02Write your version one as a single sentence and list what you deliberately left out.

3. 03Update the week-one screen flow diagram to match what you actually built.

4. 04Note anywhere the built app differs from the plan and why.

5. 05Document the data model: the record shape and where it is stored.

6. 06Generate a keystore and back it up in more than one place.

7. 07Confirm the keystore is not in your public repository.

8. 08Produce a signed Android build.

9. 09Choose a distribution route and write one sentence on why you chose it.

10. 10Install the build on a real device by that route and confirm it runs.

11. 11Confirm persistence, offline behaviour and the error states on the installed build.

12. 12Prepare app icon and screenshots at the resolutions a store would require.

13. 13Write a short description within a store's character limit.

14. 14Write a full description that explains what the app does without padding.

15. 15Write a privacy policy accurate about your actual data handling and host it at a public URL.

16. 16Draft the data safety declaration, naming every SDK that collects anything.

17. 17Write what iOS publishing would require, including the macOS requirement and its cost.

18. 18Record your testing results with every failure found and its fix.

19. 19Write the known gaps honestly, including what was not tested.

20. 20Have someone who did not build it read the documentation and tell you what is unclear.

The standard we hold you to

A finished, documented prototype: the full pre-release checklist passed; version one written as a single sentence with deliberate omissions listed; the week-one flow diagram updated to match the built app with every difference from the plan noted; the data model documented with record shape and storage location; a keystore generated, backed up in more than one place and confirmed absent from the public repository; a signed Android build produced and installed on a real device by a deliberately chosen route with the reasoning written down, and persistence, offline behaviour and error states confirmed on the installed build; an app icon and screenshots prepared at store resolutions, a short description within a store's character limit, a full description without padding, a privacy policy accurate about actual data handling and hosted at a public URL, and a data safety declaration drafted naming every collecting SDK; the iOS publishing requirements written including the macOS requirement and its cost; testing results recorded with every failure and fix; known gaps written honestly including what was not tested; and the documentation read by someone who did not build it with their points of confusion addressed.

## Common mistakes and how to fix them

You lose your keystore

Fix: Back it up in multiple places now. It identifies you as the publisher and every update needs the same key, so losing it means losing the app — the one irreversible mistake in publishing.

You commit your keystore to a public repository

Fix: Keep it out of version control entirely. Anyone with your signing key can publish updates as you.

You discover you need a privacy policy on launch day

Fix: Write and host it while you build. It is mandatory on both stores even for an app that collects nothing, and it takes an afternoon early and a week late.

You declare that you collect no data while an SDK does

Fix: Audit every dependency and declare accurately. A data safety declaration that does not match reality is how developer accounts get suspended.

You resize one screenshot for every device type

Fix: Capture genuine screenshots per required resolution. Stores specify sizes, and resized captures look wrong and can be rejected.

You assume the store review will be quick and will pass

Fix: Budget for a rejection and a resubmission. Review is neither instant nor guaranteed, and common rejections are missing privacy policies, broken functionality and undeclared data collection.

You plan App Store publishing from a Windows laptop

Fix: Plan for the reality: macOS is required for final builds. Cloud builds, rented Macs and collaborators are legitimate but none is free.

You present the prototype as finished

Fix: State the known gaps. Naming limits reads as competence, while claiming completeness invites scrutiny that unfinished work will not survive.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Back up your keystore in more than one place before you publish anything. It identifies you as the publisher and every future update needs the same key, so losing it means losing the app — the only genuinely irreversible mistake in this whole process.

- Write and host the privacy policy while you build, not when you launch. It is mandatory on both stores even for an app that collects nothing, and discovering it on launch day costs a week rather than an afternoon.

- Declare your data handling accurately and audit every SDK. A data safety declaration that does not match what the app actually collects is how developer accounts get suspended, and it is entirely preventable.

- Document the known gaps as carefully as the features. Naming what was not built and not tested reads as competence and makes the work credible, while presenting an unfinished prototype as finished invites scrutiny it will not survive.

## Key termsBuildProducing the app package from source code. The first of three separate steps people conflate.KeystoreThe private key identifying you as the publisher. Every update needs the same one; losing it means losing the app.SigningProving the package came from you and is unaltered. Done with the keystore before distribution.Direct distributionSharing an Android package by link or message, with no store. Often the right and free answer for a small user group.Internal testing trackPlay's limited distribution list. Usually more appropriate for a course project than a public listing.Privacy policyA public URL describing what the app does with data. Mandatory on both stores, even when nothing is collected.Data safety declarationWhat you collect, whether it is linked to a user, whether it is shared. Declaring inaccurately risks account suspension.Known gapsWhat is not built and not tested, stated plainly. What makes a prototype credible rather than defensive.

## Homework before the next session

Produce and install a signed Android build

Generate a keystore, back it up, build, and install on a real device. Confirm persistence and offline behaviour on the installed build, not just in development.

Write a privacy policy for your app

Accurate about what it actually collects, including anything an SDK collects, and hosted at a public URL. This is the item most people discover too late.

Prepare a store listing

Icon, screenshots per required resolution, a short description within the character limit, and a full description without padding. Note how long it took.

Write your known gaps

What is not built, what is not tested, what would break under real use. Then have someone read it and tell you whether the work sounds credible.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| The build | App runs in development. | A signed Android build produced from a backed-up keystore confirmed absent from version control, installed on a real device by a deliberately chosen route, with persistence, offline behaviour and error states confirmed on the installed build. |
| Publishing knowledge | Knows the stores exist. | Building, signing and distributing distinguished, Play requirements described accurately including fees and testing tracks, and the macOS requirement for App Store builds stated without evasion along with its real cost. |
| Listing materials | Has an icon. | Icon and per-resolution screenshots prepared, short and full descriptions written, a privacy policy accurate about actual data handling and hosted at a public URL, and a data safety declaration naming every collecting SDK. |
| Documentation | Explains the app. | Version one in one sentence with deliberate omissions, the flow diagram updated to match reality with differences noted, the data model documented, and testing results recorded with every failure and fix. |
| Honesty | Describes the project accurately. | Known gaps stated plainly including what was not tested, the documentation reviewed by someone who did not build it, and their points of confusion addressed. |

## Session questionsCan I publish an app without a store?+

On Android, yes — an app can be shared as a package file by link, message or website and installed directly. For a first project, a church media team or a small business with a handful of users, this is often the right answer and costs nothing. iOS requires the App Store.What does it cost to publish?+

Google Play charges a one-time registration fee; Apple charges an annual developer fee, so iOS is a recurring cost rather than a one-off. Neither fee includes the macOS hardware Apple's build tools require, which is a separate real cost if you do not already own one.I do not have a Mac. Can I still publish to the App Store?+

Not from your own machine — Apple's build and upload tools require macOS and there is no supported workaround. The legitimate options are a cloud build service, a rented Mac, or a client or collaborator who has one, and all of them cost something.Do I need a privacy policy if my app collects nothing?+

Yes. Both stores require a privacy policy at a public URL regardless of what the app collects, and it must accurately describe your data handling — including anything a third-party SDK collects. It is the requirement most people discover on launch day.What should I include in the final documentation?+

Version one in one sentence with what you left out, the updated screen flow including where reality differed, the data model and where it is stored, your testing results with what you found and fixed, and the known gaps stated honestly. The gaps are what make the rest credible.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session7: Testing on Devices](https://www.cea.ng/classes/mobile-app-development/testing-on-devices)[Course complete Back to Mobile App Development](https://www.cea.ng/classes/mobile-app-development)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
