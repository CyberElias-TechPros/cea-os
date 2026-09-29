---
title: "Session 2: Mobile UI Design"
description: "A phone is not a small desktop: it is used one-handed, outdoors, in fragments of time, by a thumb. This session covers designing for the thumb, touch targets that are actually hittable, screens with one job each, the three navigation patterns and when to use each, and prototyping cheaply before writing any code."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

A phone is not a small desktop: it is used one-handed, outdoors, in fragments of time, by a thumb. This session covers designing for the thumb, touch targets that are actually hittable, screens with one job each, the three navigation patterns and when to use each, and prototyping cheaply before writing any code.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Design for one-handed thumb use rather than a mouse

- Size and place touch targets so they can be hit reliably

- Give every screen exactly one job

- Choose between tab, stack and modal navigation correctly

- Handle the states a mobile screen must have

- Prototype on paper and in a design tool before building

## The taught content

### Designing for a thumb, not a mouse

Everything about mobile interface design follows from how a phone is physically held. Most use is **one-handed**, with a **thumb** doing the work, while the other hand holds a bag or a rail. That thumb has a limited reach, and it reaches the **bottom of the screen easily and the top corners badly** — the opposite of a desktop, where the top is where everything important lives.

The consequence is the **thumb zone**: primary actions belong in the lower half, within easy reach, and the top of the screen is for content and titles rather than controls. This is why almost every well-designed app puts its main button at the bottom and its navigation in a bottom bar, and why copying a desktop layout onto a phone produces something technically correct and physically awkward.

Then the context of use. A phone is used **outdoors in bright sun**, in **fragments of thirty seconds**, often **while moving**, and frequently on a **poor connection**. So text must be larger than feels right in a design tool, contrast must survive daylight, every screen must make sense in a few seconds, and the interface must cope with slow data rather than assuming it arrives instantly.

### Touch targets, and why hover does not exist

A finger is far less precise than a mouse pointer, so **touch targets must be at least about 44 by 44 points on iOS and 48 by 48 density-independent pixels on Android**. Smaller than that and users mis-tap, hit the wrong control, and blame the app. This is the single most common measurable usability failure in amateur mobile design, and it is invisible on a desktop monitor.

Spacing matters as much as size. **Adjacent targets need clear gaps** between them, because a finger that lands between two buttons produces whichever the system guesses. Destructive actions — delete, cancel — need more space still, and ideally a confirmation, because there is no undo on a phone and no cursor to see where it is about to land.

Then the thing web designers must unlearn: **there is no hover**. Nothing can reveal on mouseover, so anything a user needs must be visible or reachable by a tap. Underline-on-hover affordances, tooltips and reveal-on-hover menus all have to be redesigned as always-visible labels, visible icons, or a tap that opens something. Anything that depends on hover is simply unavailable.

### One screen, one job

A phone screen holds very little, which forces a discipline desktop design does not: **each screen does exactly one thing**. Our expense tracker has four screens and each has a single job — add an expense, see the list, see the monthly summary, adjust settings. Trying to do two of those on one screen produces a cramped interface where neither task is easy.

The test is whether you can **name the screen's job in a few words**. **Add expense. Expense list. Monthly summary.** If naming it requires the word **and**, it is two screens. This is not a stylistic preference; it is what makes a small screen usable, and it is why mobile apps have more screens than the equivalent website.

Then **prioritisation within a screen**. With limited room, decide what the user most needs first and put it highest, and accept that some things will not appear at all. The instinct to include everything because there is data for it is exactly wrong on mobile — **what you leave out is a design decision**, and the most useful mobile interfaces are the ones that removed the most.

### The three navigation patterns

Mobile navigation reduces to three patterns, and choosing correctly is most of the structure. A **tab bar** switches between three to five top-level areas of equal importance, is always visible, and is the right choice for our tracker — expenses, summary, settings. More than five tabs is too many and the labels stop fitting.

A **stack** drills down and comes back: list, then detail, then back. It is how you go from a month to a single expense, and on iOS the swipe-back gesture and on Android the system back button both expect it to behave predictably. A **modal** covers everything for one temporary task — adding an expense — and is dismissed on completion rather than navigated away from.

The commonest structural error is using the wrong one: a stack where tabs belong forces the user back through screens to change area, while tabs where a stack belongs produces a bar of screens that are all really the same thing. **Ask whether the destinations are siblings or a hierarchy.** Siblings get tabs; a hierarchy gets a stack; a short interrupting task gets a modal.

### States, and prototyping before building

Every screen that shows data has **four states**, and designing only the happy one is why so many apps feel broken. **Loading** — what appears while data arrives, which on a poor connection is most of the time. **Empty** — what a brand-new user sees, which should explain what to do rather than showing a blank area. **Error** — what happens when the request fails, which on mobile networks is often. And **populated**, the one everyone designs.

The empty state deserves particular attention because it is **the first thing every new user sees**, and a blank list with no explanation is where people abandon an app. A good empty state says what the screen will contain and offers the action that fills it — **No expenses yet. Add your first.** That single sentence converts a dead end into an invitation.

Then **prototype before you build**, because changes are cheap on paper and expensive in code. Start with **paper sketches** — four boxes, thirty seconds each, and you will find flow problems immediately. Move to a **design tool** for anything a client will see. Then build. The rule is that **every hour spent on paper saves several in code**, and the most common regret in mobile projects is building a flow nobody had drawn.

## Instructor demonstration

The instructor designs the four screens of the expense tracker live — sketching on paper first, then in a design tool — testing thumb reach on a real phone, measuring touch targets, choosing a tab bar over a stack and justifying it, designing all four data states, and finding a flow problem on paper that would have cost hours in code.

### Ask what the user does most often

Add an expense, several times a day. Explain that frequency decides what belongs closest to the thumb.02

### Sketch the thumb zone on a phone outline

Mark easy, strained and hard-to-reach areas. Explain that the bottom is easy and the top corners are hard, which is the reverse of a desktop.03

### Place the primary action in the thumb zone

Add-expense button at the bottom. Explain that this follows from one-handed use and cannot be derived from a desktop layout.04

### Sketch four screens on paper

One box each, thirty seconds. Explain that paper is where flow problems are cheap to find.05

### Draw the arrows between them

Find a screen that requires going back twice to reach. Explain that this is the kind of problem that costs hours once built.06

### Fix the flow on paper

Rearrange. Explain that an hour on paper saves several in code, and the commonest regret is building a flow nobody drew.07

### Name each screen's job in a few words

Add expense, expense list, monthly summary, settings. Explain that needing the word and means it is two screens.08

### Choose the navigation pattern

Tab bar for three siblings. Explain the test: siblings get tabs, a hierarchy gets a stack, a short interrupting task gets a modal.09

### Show the wrong choice

Use a stack instead and navigate it. Explain that it forces the user back through screens just to change area.10

### Make the add-expense screen a modal

Explain that a short interrupting task should cover the screen and be dismissed on completion rather than navigated away from.11

### Measure a touch target

Show one at 32 points and one at 48. Explain the minimum of about 44 on iOS and 48 on Android, and that this failure is invisible on a desktop monitor.12

### Test both by thumb on a real phone

Mis-tap the small one. Explain that users blame the app, and that spacing between adjacent targets matters as much as size.13

### Add spacing around a destructive action

Move delete away from other controls and add a confirmation. Explain there is no undo on a phone and no cursor to show where a tap will land.14

### Remove a hover-revealed control

Explain that hover does not exist on a phone, so anything needed must be visible or reachable by a tap.15

### Design the loading state

Skeleton rather than a spinner. Explain that on a poor connection this state is visible most of the time.16

### Design the empty state

No expenses yet, add your first. Explain that this is the first thing every new user sees and a blank list is where people abandon.17

### Design the error state

Say what failed and offer a retry. Explain that on mobile networks failure is a normal condition rather than an exception.18

### Check text size and contrast in daylight

Take the phone outside. Explain that text must be larger than feels right in a design tool and contrast must survive bright sun.

## Guided practice

### Design the four screens before writing any code

You design your app's version one screens on paper and then in a design tool — thumb-zone placement, correctly sized touch targets verified on a real phone, a justified navigation pattern, every screen with one job, and all four data states designed — before any code is written.

1. 01Write down what the user does most often and how frequently.

2. 02Sketch a phone outline and mark the thumb zone: easy, strained, hard to reach.

3. 03Place the primary action inside the easy-reach zone.

4. 04Sketch every version one screen on paper, one box each.

5. 05Draw every arrow between the screens.

6. 06Find at least one flow problem and fix it on paper.

7. 07Name each screen's job in a few words and split any that need the word and.

8. 08Decide for each navigation whether the destinations are siblings or a hierarchy.

9. 09Choose tab, stack or modal for each and write why.

10. 10Design every touch target at 44 points or larger.

11. 11Verify the sizes by thumb on a real phone and note any mis-taps.

12. 12Add clear spacing between adjacent targets and extra around destructive actions.

13. 13Add a confirmation to every destructive action.

14. 14Remove anything that depended on hover and make it visible or tappable.

15. 15Design the loading state for every screen that fetches data.

16. 16Design the empty state with a sentence explaining what the screen will contain.

17. 17Design the error state saying what failed and offering a retry.

18. 18Check text size and contrast outdoors in daylight.

19. 19Assemble the screens in a design tool with consistent spacing and typography.

20. 20Have someone else tap through the prototype and note where they hesitate.

The standard we hold you to

A designed version one completed before any code: the most frequent user action identified, a phone outline with the thumb zone marked and the primary action placed in easy reach; every screen sketched on paper with every arrow drawn, at least one flow problem found and fixed on paper, each screen named in a few words with any needing the word and split in two; tab, stack or modal chosen for each navigation with the sibling-versus-hierarchy reasoning written down; every touch target at 44 points or larger and verified by thumb on a real phone with mis-taps noted; clear spacing between adjacent targets, extra around destructive actions and a confirmation on each; anything hover-dependent made visible or tappable; loading, empty and error states designed for every data screen, with the empty state explaining what the screen will contain and the error state naming the failure and offering a retry; text size and contrast checked outdoors in daylight; the screens assembled in a design tool with consistent spacing and typography; and another person tapping through the prototype with their hesitations noted.

## Common mistakes and how to fix them

You copy a desktop layout onto a phone

Fix: Design from the thumb zone. The bottom is easy to reach and the top corners are hard, which is the reverse of a desktop, so primary actions belong low.

Your buttons are too small to hit

Fix: Size touch targets to at least 44 points on iOS and 48 on Android, with clear gaps between adjacent ones. This is the commonest measurable usability failure in amateur mobile design.

You rely on hover to reveal something

Fix: Make it visible or tappable. Hover does not exist on a phone, so anything a user needs must be on screen or one tap away.

One screen does two jobs

Fix: Split it. If naming the screen requires the word and, it is two screens — small screens only work when each does one thing.

You use a stack where tabs belong

Fix: Ask whether destinations are siblings or a hierarchy. Siblings get a tab bar; a stack forces users back through screens just to change area.

You have more than five tabs

Fix: Cut to three to five. Beyond that the labels stop fitting and users cannot remember what is where.

You only designed the populated state

Fix: Design loading, empty and error too. On a poor connection loading is most of the experience, and failure is a normal condition rather than an exception.

Your empty state is a blank area

Fix: Say what the screen will contain and offer the action that fills it. The empty state is the first thing every new user sees and a blank list is where people abandon.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Design from the thumb outward. Most phone use is one-handed, the bottom of the screen is easy and the top corners are hard, so primary actions belong low — which is the reverse of every desktop instinct you have.

- Size every touch target to at least 44 points and leave gaps between them. A finger is far less precise than a mouse pointer, and mis-taps are the most common measurable usability failure in amateur mobile design.

- Design all four states, not just the populated one. On a poor connection the loading state is most of the experience, and a blank empty state is precisely where new users abandon an app.

- Prototype on paper before writing code. Thirty seconds per screen finds flow problems that cost hours to discover once built, and the commonest regret in mobile projects is building a flow nobody had drawn.

## Key termsThumb zoneThe part of the screen reachable one-handed. The bottom is easy, the top corners hard — the reverse of desktop.Touch targetThe tappable area of a control. At least about 44 points on iOS and 48 on Android, with gaps between neighbours.Tab barAlways-visible navigation between three to five equal top-level areas. For siblings, not hierarchies.StackDrill down and come back. For hierarchies; both platforms' back controls expect it to behave predictably.ModalA screen covering everything for one temporary task, dismissed on completion rather than navigated away from.Empty stateWhat a new user sees with no data. Should explain the screen and offer the action that fills it.Skeleton screenPlaceholder shapes shown while data loads. Usually better than a spinner because it shows the shape of what is coming.PrototypeA clickable version built before code. Changes here are cheap; the same changes in code are expensive.

## Homework before the next session

Sketch your thumb zone

Draw a phone outline and mark easy, strained and hard-to-reach areas for your own hand. Then check where your app's primary action sits.

Measure the touch targets in an app you use

Find the smallest control you can and estimate its size. Note whether it is above or below 44 points, and whether you ever mis-tap it.

Design three empty states

For three screens in your app, write the sentence that explains what the screen will contain and the action that fills it. Compare with a blank list.

Paper-prototype one flow and test it

Sketch the screens, hand them to someone, and ask them to complete a task. Note every hesitation — those are your design problems, found for nothing.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Physical design | Layout fits a phone. | Thumb zone mapped for the intended hand, primary action placed in easy reach, and the layout justified by one-handed use rather than copied from a desktop. |
| Touch targets | Buttons are tappable. | Every target at 44 points or larger with clear gaps between neighbours, verified by thumb on a real phone, extra space around destructive actions and a confirmation on each. |
| Screen structure | Screens are organised. | Every screen named in a few words with one job each, anything requiring the word and split, and content prioritised with deliberate omissions. |
| Navigation | Navigation works. | Tab, stack or modal chosen per destination with sibling-versus-hierarchy reasoning written down, tabs kept to five or fewer, and the wrong pattern demonstrated and rejected. |
| States and prototyping | Designs the main screen. | Loading, empty and error states designed for every data screen, hover dependencies removed, contrast checked outdoors, and a paper prototype tested with another person's hesitations recorded. |

## Session questionsHow big should my buttons be?+

At least about 44 by 44 points on iOS and 48 by 48 density-independent pixels on Android, with clear gaps between adjacent controls. A finger is far less precise than a mouse pointer, and mis-taps are the most common usability failure in amateur mobile design.Should my navigation be tabs or a stack?+

Ask whether the destinations are siblings or a hierarchy. Three to five equal areas get a tab bar; drilling into a detail and coming back gets a stack; a short interrupting task like adding a record gets a modal. Using the wrong one is the commonest structural error.Why does my app feel cramped?+

Probably because a screen is doing two jobs. Each screen should do exactly one thing — if naming it requires the word and, split it. Mobile apps have more screens than the equivalent website for exactly this reason.Do I need to design empty and error states?+

Yes, and they matter more than the populated state. On a poor connection the loading state is most of the experience, failure on mobile networks is normal rather than exceptional, and a blank empty state is precisely where new users abandon an app.Is prototyping worth the time?+

It is the cheapest time you will spend. Four boxes on paper take thirty seconds each and find flow problems immediately, while the same problem discovered after building costs hours. The commonest regret in mobile projects is building a flow nobody had drawn.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: App Concepts & Scoping](https://www.cea.ng/classes/mobile-app-development/app-concepts-scoping)[Next session 3: Building Screens](https://www.cea.ng/classes/mobile-app-development/building-screens)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
