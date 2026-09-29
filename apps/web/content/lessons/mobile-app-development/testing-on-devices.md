---
title: "Session 7: Testing on Devices"
description: "The emulator will tell you your app is fine. This session covers testing on real hardware, what an emulator systematically hides, debugging mobile with remote tools and reading the errors they produce, and the specific bugs that appear on phones and nowhere else — then a checklist that catches them before your users do."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

The emulator will tell you your app is fine. This session covers testing on real hardware, what an emulator systematically hides, debugging mobile with remote tools and reading the errors they produce, and the specific bugs that appear on phones and nowhere else — then a checklist that catches them before your users do.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what an emulator hides and why it matters

- Test touch, layout, keyboard and performance on real hardware

- Debug with remote tools and read a mobile stack trace

- Recognise and fix the bugs that only appear on devices

- Test across a range of screen sizes and Android versions

- Work through a repeatable pre-release checklist

## The taught content

### Why the emulator lies

A desktop emulator is a genuinely useful tool and a genuinely misleading one. It gives you a **fast processor**, so slow rendering looks fine. A **large screen**, so cramped layouts look spacious. A **precise mouse pointer**, so a 30-point button is easy to hit. A **wired connection**, so loading states barely appear. And **no physical context** — nobody holds a laptop in one hand on a bus.

Each of those hides a specific class of failure, and they are exactly the classes that decide whether an app feels good. An app tested only in an emulator ships with touch targets that are too small, layouts that break on a small phone, performance problems nobody saw, and loading states that were never exercised because data always arrived instantly.

So the rule for this course is simple: **the emulator is for iteration, the phone is for truth**. Use the simulator to work quickly through layout and logic, and use a physical device before you consider anything finished. If you can borrow a cheap older Android for testing, it is the most valuable piece of equipment you will own, because everything that will be slow is visibly slow on it.

### What to test, physically

Some things can only be tested by holding the device. **Touch targets by thumb**, one-handed, which is the test the emulator cannot perform at all — a button that is easy with a mouse and impossible with a thumb is a design failure, not a preference. **Reach**, with the phone in the hand you actually use. **Text size in daylight**, outdoors, which no calibrated monitor reproduces.

Then the behaviours that only exist on a device. **The keyboard covering inputs**, which you can partly simulate but should confirm in place. **The system back button** on Android, from every screen, including from a modal and from a detail screen. **Rotation**, if your app supports it — and if it does not, confirm it stays put rather than breaking. **Incoming calls and notifications** interrupting, because an app that loses the user's half-typed form when a call arrives is an app people complain about.

And **performance on the device that matters**. Scroll the longest list you can generate on the cheapest phone available, open every screen repeatedly, and watch for stutter, memory growth and heat. These are the things users describe as **the app is slow** without being able to be more specific, and they are invisible on a development machine.

### Debugging on mobile

Debugging is the same discipline as on the web, with different plumbing. **Console output** is available through remote debugging — the Expo dev menu opens developer tools in a browser, and from there you inspect, set breakpoints and read the console much as you would on a website. Learn to open this immediately; most mobile debugging problems are people guessing because they never connected the tools.

**The red error screen** is React Native telling you something threw, with a message and a stack trace. Read it the same way as any error: **the top line names the problem and the stack names the path**. **Cannot read property of undefined** means a value was not there — usually a param that did not arrive, an item removed from a list, or data still loading when the render ran. **is not a function** is usually a typo or a missing import.

Then the mobile-specific failure that produces no error at all: **the white or blank screen**. It usually means the root component threw during render, or nothing was ever rendered, and because there is no visible error you have to attach the debugger and look. The habit that saves hours is **narrowing by removal** — comment out half the screen and reload, then halve again — which is the same bisection that works everywhere.

### The bugs that only appear on phones

There is a reliable set of failures that appear on devices and not in the simulator, and knowing them in advance is most of the work. **The keyboard covering the field you are typing in** — fixed with a keyboard-aware view. **Content under the status bar or gesture bar** — fixed with safe area insets. **Text overflowing its container** on a small screen, because English words are long and a 320dp screen is narrow.

Then the data bugs. **List rows showing the wrong data after a delete**, which is the index-as-key problem from earlier. **Stale values on a detail screen**, which is the passed-object problem. **State not updating** because an array or object was mutated rather than replaced, so the comparison sees no change and the interface does not re-render — one of the more confusing bugs in this stack, because the data is correct and the screen is wrong.

And the platform splits. **Android back** doing something unexpected, **images failing to load** because of a path or a case-sensitivity difference between platforms, and **fonts and spacing rendering slightly differently** on each. None of these is hard to fix and all of them are easy to miss, which is why the checklist exists.

### A pre-release checklist

Testing on mobile is a **list, not a feeling**. The list is short enough to run every time and it catches almost everything: every screen at the smallest and largest sizes; every touch target by thumb; every form with the keyboard open; the back button from every screen; the app in airplane mode; the app killed and reopened; a slow connection; the oldest Android available; and every error state forced deliberately.

Two items on it are worth emphasising because they are skipped most often. **Kill the app completely and reopen it** — this is what exercises persistence, and it is where the local-storage bugs appear, including the corrupt-data crash at launch. And **force every error state** rather than hoping they work: switch off the network, make the server return a 500, and fill a form with nonsense. An error state nobody has triggered is an error state nobody has tested.

Then the last discipline: **have someone else use it**. Hand the phone to a person who has not seen the app and ask them to add an expense, while you say nothing. Where they hesitate, tap the wrong thing, or fail outright is where the design failed — and you cannot find those problems yourself, because you already know how it works.

## Instructor demonstration

The instructor runs the full pre-release checklist against the expense tracker live — on a physical phone and on the oldest Android available — finding a keyboard problem, a small-screen text overflow, a stale detail screen and an index-key bug, debugging each with remote tools, and finishing by handing the phone to someone who has never seen the app.

### Run the app in the emulator and declare it fine

Then run it on the phone. Explain that the emulator's fast processor, large screen, precise pointer and wired connection hide exactly the failures that matter.02

### Open the dev menu and connect remote debugging

Show the console in a browser. Explain that most mobile debugging problems are people guessing because they never connected the tools.03

### Trigger a red error screen deliberately

Read the top line, then the stack. Explain that the top names the problem and the stack names the path, exactly as on the web.04

### Cause a blank white screen

Explain that this usually means the root component threw during render, and there is no visible error, so you must attach the debugger.05

### Narrow it by commenting out half the screen

Reload and halve again. Explain that bisection works here exactly as it does everywhere.06

### Test every touch target by thumb, one-handed

Mis-tap the smallest one. Explain that this is the test the emulator cannot perform at all.07

### Test at the smallest screen size

Find text overflowing its container. Explain that a 320dp screen is narrow and long words do not fit.08

### Test at a tablet size

Show the full-width list. Explain that testing the extremes matters because the middle sizes always work.09

### Open every form with the keyboard up

Find the covered field. Explain that this is only fully confirmed in place, on the device.10

### Press back from every screen

Including from the modal and the detail screen. Explain that an unexpected back is one of the fastest ways to make an app feel broken.11

### Add an expense, then delete one from the middle

Show the wrong row affected. Explain the index-as-key bug and switch the key to the record id.12

### Edit an expense and open its detail

Show stale values. Explain the passed-object problem and switch to passing an id and looking it up.13

### Mutate the array in place and watch the list not update

Explain that the data is correct and the screen is wrong, because the comparison sees no change — one of the more confusing bugs in this stack.14

### Replace the array instead of mutating it

Confirm the interface updates. Explain that immutable updates are the convention for exactly this reason.15

### Put the device in airplane mode and use the app

Confirm it shows local data and queues a write. Explain that this is a checklist item, not an edge case.16

### Throttle to a slow connection

Confirm the skeleton holds and the error state offers Retry. Explain that forcing error states is the only way to know they work.17

### Kill the app completely and reopen it

Explain that this exercises persistence and is where storage bugs, including the corrupt-data crash at launch, appear.18

### Run it on the oldest Android available

Scroll the longest list. Explain that stutter, memory growth and heat are invisible on a development machine.19

### Receive a call mid-form and return

Check whether the half-typed form survived. Explain that losing it is a common and preventable complaint.20

### Hand the phone to someone who has never seen the app

Ask them to add an expense and say nothing. Explain that where they hesitate is where the design failed, and you cannot find those problems yourself.

## Guided practice

### Run the full pre-release checklist

You put the expense tracker through the complete checklist on real hardware — every size, every touch target by thumb, every form with the keyboard up, back from every screen, airplane mode, a slow connection, the oldest Android available, a kill-and-reopen, and every error state forced — fixing what you find and recording the results.

1. 01Connect remote debugging and confirm you can read the console from the device.

2. 02Deliberately trigger a red error screen and read the top line and the stack.

3. 03Deliberately cause a blank screen and narrow it by commenting out half the screen.

4. 04Test every touch target by thumb, one-handed, on a physical phone.

5. 05Test every screen at the smallest size and fix any text overflow.

6. 06Test every screen at a tablet size and fix any absurd full-width layout.

7. 07Open every form with the keyboard up and confirm no field is covered.

8. 08Press the Android back button from every screen, including modals and detail screens.

9. 09Add several expenses and delete one from the middle of the list.

10. 10Confirm the correct row was removed, and switch the key to the record id if not.

11. 11Edit an expense and confirm the detail screen shows current values.

12. 12Confirm list updates use replacement rather than in-place mutation.

13. 13Put the device in airplane mode and confirm the app still works and queues writes.

14. 14Throttle to a slow connection and confirm the loading state holds sensibly.

15. 15Force every error state: no network, a server 500, and invalid form input.

16. 16Confirm each error state names the failure and offers an action.

17. 17Kill the app completely and reopen it, confirming data persisted.

18. 18Run the whole app on the oldest, cheapest Android available.

19. 19Scroll the longest list you can generate and note any stutter or memory growth.

20. 20Receive a call or notification mid-form and confirm the input survived.

21. 21Hand the phone to someone who has never seen the app and record where they hesitate.

22. 22Write up the checklist results, with every failure found and its fix.

The standard we hold you to

A completed pre-release checklist on real hardware: remote debugging connected with the console readable from the device, a red error screen triggered and read by top line and stack, a blank screen caused and narrowed by commenting out half the screen; every touch target tested by thumb one-handed, every screen tested at the smallest size with text overflow fixed and at a tablet size with absurd layouts fixed; every form opened with the keyboard up and no field covered; the Android back button pressed from every screen including modals and detail screens; several expenses added with one deleted from the middle and the correct row confirmed removed, the key switched to a record id if not; an edited expense confirmed to show current values on its detail screen; list updates confirmed to replace rather than mutate; the device put in airplane mode with the app confirmed working and writes queued; a throttled connection with the loading state confirmed to hold; every error state forced by no network, a server 500 and invalid input, each confirmed to name the failure and offer an action; the app killed completely and reopened with persistence confirmed; the whole app run on the oldest, cheapest Android available with the longest list scrolled and stutter or memory growth noted; a call or notification received mid-form with input survival confirmed; the phone handed to someone who has never seen the app with their hesitations recorded; and the results written up with every failure found and its fix.

## Common mistakes and how to fix them

You test only in the emulator

Fix: Test on a physical phone. The emulator's fast processor, large screen, precise pointer and wired connection hide exactly the failures that decide whether an app feels good.

You debug by guessing without connecting tools

Fix: Open remote debugging from the dev menu. Most mobile debugging problems are people guessing because they never attached the console.

You see a blank white screen and have no idea why

Fix: Attach the debugger and narrow by removal. A blank screen usually means the root component threw during render, and there is no visible error to read.

You test with a mouse pointer

Fix: Test by thumb, one-handed. A button that is easy with a mouse and impossible with a thumb is a design failure, and it is the test an emulator cannot perform.

You only test the sizes you own

Fix: Test the smallest and largest. Middle sizes always work; a 320dp screen overflows and a tablet makes full-width layouts absurd.

You mutate arrays in place and the interface does not update

Fix: Replace rather than mutate. The data is correct and the screen is wrong because the comparison sees no change, which makes this one of the more confusing bugs in the stack.

You never kill the app and reopen it

Fix: Do it every time. This is what exercises persistence, and it is where storage bugs appear, including a crash at launch from corrupt data.

You never force an error state

Fix: Switch off the network, return a 500, submit nonsense. An error state nobody has triggered is an error state nobody has tested.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Use the emulator to iterate and the phone to decide. The simulator's fast processor, large screen, precise pointer and wired connection hide precisely the failures that determine whether an app feels good to a real user.

- Connect remote debugging before you guess at anything. Most mobile debugging time is lost to people who never opened the console, and the tools are one dev-menu tap away.

- Run the checklist every time rather than trusting a feeling. Kill-and-reopen and forced error states are the two items skipped most often, and they catch the storage and failure bugs that reach users.

- Hand the phone to someone who has never seen the app and say nothing. Where they hesitate or tap wrongly is where the design failed, and you cannot find those problems yourself because you already know how it works.

## Key termsEmulatorA simulated device on a desktop. Fast to iterate on, and it systematically hides touch, size, performance and network problems.Remote debuggingAttaching browser developer tools to the app on a phone. Open it before guessing.Red screenReact Native's error overlay. The top line names the problem, the stack names the path.Blank screenUsually the root component throwing during render, with no visible error. Narrow it by commenting out half.Immutable updateReplacing an array or object rather than mutating it. Required for the interface to notice the change.Kill and reopenFully closing the app and relaunching. What exercises persistence and catches storage bugs.Forced error stateDeliberately causing a failure. The only way to know an error state actually works.Pre-release checklistSizes, thumb targets, keyboard, back, airplane mode, slow connection, oldest device, kill-and-reopen, forced errors, and an outside user.

## Homework before the next session

Connect remote debugging to your phone

Open the dev menu, attach the tools, and read the console while the app runs. Then trigger an error deliberately and read the stack.

Test one screen by thumb, one-handed

Every control, in the hand you actually use. Note which are hard to reach and which you mis-tap, and fix the worst one.

Kill and reopen your app

Confirm the data persisted. Then corrupt the stored value on purpose and confirm the app survives launch rather than crashing.

Force one error state

Turn off the network or make the server fail. Confirm your error state names the failure and offers an action rather than showing a blank screen.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Real-device testing | Runs the app on a phone. | Emulator used for iteration and a physical phone for decisions, with the oldest, cheapest Android also tested and the longest list scrolled on it. |
| Debugging | Fixes errors. | Remote debugging connected, red screens read by top line and stack, and a blank screen narrowed by commenting out half the screen. |
| Device-specific bugs | Handles the obvious ones. | Keyboard, safe areas and text overflow fixed; index keys and passed objects corrected; list updates confirmed immutable; and back behaviour verified from every screen. |
| Checklist discipline | Tests the main flows. | The full checklist run including airplane mode, a throttled connection, a complete kill and reopen, and every error state forced rather than assumed. |
| Outside perspective | Tests it themselves. | The phone handed to someone who has never seen the app, their hesitations recorded without explanation offered, and the worst problem found actually fixed. |

## Session questionsWhy does my app work in the emulator but feel wrong on a phone?+

Because the emulator has a fast processor, a large screen, a precise mouse pointer and a wired connection. It hides small touch targets, slow rendering, awkward thumb reach and slow data — which are exactly the things that decide whether an app feels good.How do I see console output from my phone?+

Open the Expo dev menu on the device and launch remote debugging, which opens developer tools in a browser. You can then read the console, set breakpoints and inspect, just as on a website. Do this before guessing.My app shows a blank white screen with no error. What now?+

It usually means the root component threw during render, and because nothing rendered there is no visible error. Attach the debugger, then narrow it by commenting out half the screen and reloading, halving again until you find it.I changed my data but the screen did not update. Why?+

You probably mutated an array or object in place. The data is correct but the comparison sees no change, so nothing re-renders. Replace the array or object rather than modifying it, which is why immutable updates are the convention.What should I always test before releasing?+

Every size, every touch target by thumb, every form with the keyboard up, back from every screen, airplane mode, a slow connection, the oldest device you can find, a complete kill and reopen, and every error state forced deliberately. Then hand it to someone who has never seen it.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session6: Working with APIs](https://www.cea.ng/classes/mobile-app-development/working-with-apis)[Next session 8: Publishing & Final Project](https://www.cea.ng/classes/mobile-app-development/publishing-mobile)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
