---
title: "Session 6: Working with APIs"
description: "Real apps talk to servers, and phones have worse connections than laptops. This session covers fetching data properly, implementing the loading and error states designed in week one, behaving sensibly offline, syncing queued writes when the connection returns, and keeping the app usable on the low-end devices and metered data most people actually have."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

Real apps talk to servers, and phones have worse connections than laptops. This session covers fetching data properly, implementing the loading and error states designed in week one, behaving sensibly offline, syncing queued writes when the connection returns, and keeping the app usable on the low-end devices and metered data most people actually have.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Fetch data with async and await and handle the result properly

- Implement loading, error and retry states for real

- Detect connectivity and behave sensibly without it

- Queue writes offline and sync them when the connection returns

- Avoid blocking the interface with heavy work

- Respect the user's data budget

## The taught content

### Fetching, and the three outcomes

Fetching on mobile is the same `fetch` you know, wrapped in `async` and `await`. What differs is that **the network is unreliable**, so the code has to handle three outcomes every time rather than one: success, a request that fails, and a request that succeeds but returns an error status. Handling only the first is why so many apps show a permanently blank screen when something goes wrong.

The specific detail that catches people is that **`fetch` does not reject on a 404 or a 500** — it resolves, because the request completed. You must check the response's **`ok`** property yourself, or your code will try to parse an error page as data and fail in a confusing way several lines later.

Then the mobile reality: on a congested network a request can take ten seconds, and the user will have navigated away before it returns. **Check that the screen is still mounted before updating state**, because setting state on an unmounted component is a warning at best and a crash at worst, and it is a common source of strange behaviour when moving quickly between screens.

### Loading and error states, for real

Session two designed these states; now they have to exist in code. **Loading** should be a **skeleton** — placeholder shapes matching the real layout — rather than a spinner where possible, because a skeleton shows the shape of what is coming and feels faster even when it is not. On a slow connection this state is what the user sees most of the time, so it is not a detail.

**Error** must say what happened and offer a way out. **Could not load your expenses** with a **Retry** button is useful; a blank screen is not, and a raw error message dumped on the user is worse. Distinguish between **no connection**, **server error** and **not found**, because the user's next action differs: wait, retry, or go back.

Then the discipline that separates finished work from a demo: **never leave the user stuck**. Every failure path must end in something they can do — retry, go back, use the cached data. An app that fails into a dead end on a bad network is an app that gets uninstalled, and on mobile networks a bad network is not an edge case but a normal Tuesday.

### Offline behaviour

This is where a mobile app earns its existence over a website, and it is the feature most often skipped. The starting point is that **your app must work with no connection at all**, because the alternative is an app that shows an error every time the user enters a lift, a basement or an area with poor coverage.

The pattern is straightforward once decided: **read from local storage first and show it immediately**, then refresh from the server in the background when a connection exists. The user sees their data instantly rather than a spinner, and the app is usable regardless of coverage. This is why the previous session's local storage work was not a stepping stone — it is half of the offline strategy.

Then **writes**, which are harder. An expense added offline cannot be sent, so it must be **queued**: saved locally with a flag marking it unsynced, then sent when connectivity returns. The queue needs to handle **conflicts** — what if the same record changed on the server? — and for a first app the honest answer is last-write-wins with a timestamp, documented, rather than a sophisticated merge you will not finish.

### Performance on low-end devices

The average phone in use is not the phone you develop on. Low-end Android devices have slow processors, little memory and slow storage, and they are the majority of the market, so **an app that is only smooth on a good phone is an app most people experience as slow**.

The main causes are predictable. **Re-rendering too much** — state placed too high, so unrelated screens re-render on every keystroke. **Heavy work on the JavaScript thread**, which blocks the interface entirely; anything expensive belongs off the main path or split into chunks. **Large images** loaded at full resolution, which consume memory and data at once; load the size you display. And **long lists rendered naively**, which the previous session's FlatList already addressed.

The habit that catches all of it is **testing on the worst device you can find**, not the best. An older, cheaper Android phone is the most useful piece of testing equipment you can own, because everything that is going to be slow is slow on it, and visibly so.

### Respecting the data budget

Mobile data costs money, and for many users it is metered and carefully watched. An app that downloads more than it needs is not merely inefficient — it spends the user's money without asking, which is a real cost and a real reason to uninstall.

The practical rules: **request only what you display**, using query parameters to limit and paginate rather than fetching an entire collection. **Compress and size images** before serving them, since images dominate data use in almost every app. **Cache responses** so repeat views do not re-download, and **do not poll in a tight loop** for updates, which quietly burns data in the background.

Then make the trade-offs visible where they matter. A setting to **sync only on Wi-Fi**, or to load lower-resolution images on mobile data, costs little to build and is genuinely appreciated by users watching their balance. This is the kind of consideration that separates an app built for a real market from one built for a demo.

## Instructor demonstration

The instructor connects the expense tracker to a small API and then attacks it — throttling the network, switching to airplane mode mid-request, returning a 500, and running the app on a low-end device — implementing skeletons, real error states with retry, an offline queue that syncs on reconnection, and the data-saving choices that follow.

### Fetch the expense list from the API

Async and await. Explain that the code must handle three outcomes: success, a failed request, and a request that returns an error status.02

### Return a 404 from the server and watch it parse

Show the confusing failure. Explain that fetch does not reject on 404 or 500, so you must check the ok property yourself.03

### Add the ok check

Explain that checking it turns a confusing failure several lines later into a clear one at the right place.04

### Navigate away while a request is in flight

Show the warning. Explain that setting state on an unmounted screen is a common source of strange behaviour when moving quickly.05

### Replace the spinner with a skeleton

Explain that a skeleton shows the shape of what is coming and feels faster, and on a slow connection it is what the user sees most of the time.06

### Throttle the network and watch the loading state

Explain that on a congested network a request can take ten seconds, so this state is not a detail.07

### Return a 500 and show the error state

Message plus Retry. Explain that a blank screen is not an error state and a raw error dump is worse than either.08

### Distinguish no connection from server error

Explain that the user's next action differs — wait, retry, or go back — so the message must differ too.09

### Put the app in airplane mode

Show the dead end. Explain that an app failing into a dead end on a bad network gets uninstalled.10

### Read from local storage first and show it immediately

Explain that this is why the last session's storage work was not a stepping stone — it is half the offline strategy.11

### Refresh in the background when a connection exists

Explain that the user sees data instantly rather than a spinner, and the app is usable regardless of coverage.12

### Add an expense in airplane mode

Explain that a write that cannot be sent must be queued rather than lost or blocked.13

### Save it locally with an unsynced flag

Explain that the flag is what tells the app what still needs sending.14

### Restore the connection and sync the queue

Explain that the queue drains automatically and the flag clears, and that this is the feature that justifies an app over a website.15

### Discuss the conflict case

Explain that last-write-wins with a timestamp, documented, is the honest first answer rather than a merge you will not finish.16

### Run the app on a low-end device

Compare with the development phone. Explain that an app only smooth on a good phone is experienced as slow by most of the market.17

### Find a heavy operation blocking the interface

Show the frozen tap. Explain that the JavaScript thread blocks the interface entirely, so expensive work must be split or moved.18

### Load a full-resolution image and measure the data

Explain that images dominate data use, so load the size you display and compress before serving.19

### Add pagination to the list request

Explain that requesting only what you display respects a metered data budget, which is real money to the user.20

### Add a sync-only-on-Wi-Fi setting

Explain that it costs little to build and is genuinely appreciated by users watching their balance.

## Guided practice

### Make the app work on a bad network and a cheap phone

You connect the expense tracker to an API and implement the three outcomes properly, build real loading and error states with retry, make the app usable in airplane mode with a queue that syncs on reconnection, and verify performance and data use on the worst device available.

1. 01Fetch the expense list with async and await.

2. 02Check the response's ok property and handle a failed request separately.

3. 03Return a 404 and a 500 from the API and confirm each is handled.

4. 04Navigate away during a request and confirm no state is set on an unmounted screen.

5. 05Replace the spinner with a skeleton matching the real layout.

6. 06Throttle the network and confirm the loading state holds sensibly for ten seconds.

7. 07Write an error state naming the failure and offering Retry.

8. 08Distinguish no connection from server error in the message.

9. 09Confirm every failure path ends in an action the user can take.

10. 10Put the device in airplane mode and confirm the app still shows data.

11. 11Read from local storage first, then refresh in the background when online.

12. 12Add an expense in airplane mode and confirm it is queued, not lost.

13. 13Flag queued records as unsynced.

14. 14Restore the connection and confirm the queue syncs and the flags clear.

15. 15Document your conflict strategy, even if it is last-write-wins.

16. 16Run the app on the oldest, cheapest Android phone available.

17. 17Find any operation that blocks the interface and split or defer it.

18. 18Measure the data used by a full list load and reduce it with pagination.

19. 19Serve images at display size rather than full resolution.

20. 20Add a sync-only-on-Wi-Fi option and confirm it works.

21. 21Write one paragraph on how the app behaves with no connection at all.

The standard we hold you to

An app that works on a bad network and a cheap phone: the expense list fetched with async and await, the response ok property checked, a failed request handled separately, and 404 and 500 responses each confirmed handled; no state set on an unmounted screen when navigating away mid-request; a skeleton matching the real layout replacing the spinner and confirmed to hold sensibly over a ten-second throttled load; an error state naming the failure and offering Retry, with no connection distinguished from server error, and every failure path confirmed to end in an action the user can take; the device put in airplane mode with the app still showing data read from local storage first and refreshed in the background when online; an expense added offline confirmed queued rather than lost, flagged unsynced, and the queue confirmed to sync with flags cleared on reconnection; the conflict strategy documented even if last-write-wins; the app run on the oldest, cheapest Android phone available with any interface-blocking operation found and split or deferred; data use for a full list load measured and reduced with pagination; images served at display size; a sync-only-on-Wi-Fi option added and confirmed working; and one paragraph written on how the app behaves with no connection at all.

## Common mistakes and how to fix them

You only handle the success case

Fix: Handle success, failure and error status every time. Handling only success is why so many apps show a permanently blank screen when something goes wrong.

You assume fetch rejects on a 404

Fix: Check the response ok property. Fetch resolves because the request completed, so an error page gets parsed as data and fails confusingly several lines later.

You set state after the user navigated away

Fix: Check the screen is still mounted. Setting state on an unmounted component is a common source of strange behaviour when moving quickly between screens.

Your error state is a blank screen

Fix: Say what happened and offer Retry, distinguishing no connection from a server error. Every failure path must end in something the user can do.

Your app is unusable offline

Fix: Read from local storage first and refresh in the background. An app that errors in a lift or a basement gets uninstalled, and poor coverage is normal rather than exceptional.

Writes made offline are lost

Fix: Queue them locally with an unsynced flag and send them when connectivity returns. Document the conflict strategy rather than pretending the case does not arise.

You test only on a good phone

Fix: Test on the cheapest, oldest Android you can find. Low-end devices are the majority of the market, so an app only smooth on a good phone is slow for most users.

You ignore the user's data budget

Fix: Paginate, compress images, cache responses and offer sync-only-on-Wi-Fi. Mobile data is metered and watched, and an app that overspends it gets uninstalled.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Handle three outcomes on every request: success, failure, and a completed request with an error status. Fetch does not reject on 404 or 500, so checking the ok property is what turns a confusing failure several lines later into a clear one.

- Read from local storage first and refresh in the background. It makes the app instant and usable in a lift or a basement, and it is the feature that most clearly justifies building an app rather than a website.

- Queue offline writes with an unsynced flag and drain the queue on reconnection. Document the conflict strategy honestly — last-write-wins with a timestamp is a legitimate first answer, while an unfinished merge is not.

- Test on the cheapest, oldest phone you can find and watch the data use. Low-end devices are the majority of the market and mobile data is metered, so both are real product constraints rather than niceties.

## Key termsResponse okThe property telling you whether a completed request succeeded. Fetch resolves on 404 and 500, so you must check it.Skeleton screenPlaceholder shapes matching the real layout. Feels faster than a spinner and is what users see most on slow networks.RetryThe action an error state must offer. Every failure path should end in something the user can do.Offline-firstRead local data immediately, refresh in the background. What makes an app usable in a lift or a basement.Write queueChanges made offline, stored locally with an unsynced flag and sent when connectivity returns.Conflict resolutionWhat happens when a queued change disagrees with the server. Last-write-wins with a timestamp is a legitimate first answer.JS thread blockingHeavy work freezing the interface. Split or defer expensive operations, because the thread drives the UI.PaginationRequesting only what you display. Respects a metered data budget, which is real money to the user.

## Homework before the next session

Handle all three outcomes of one request

Force a success, a network failure and a 500. Confirm each produces a distinct, useful interface rather than a blank screen.

Use your app in airplane mode

Confirm it still shows data from local storage and that a new record is queued rather than lost. Then reconnect and confirm it syncs.

Throttle a request and watch the loading state

Hold it at ten seconds. Note whether a spinner or a skeleton feels better, and why.

Measure one screen's data use

Load a full list and check the bytes. Then paginate it and measure again, and note what the difference would cost a user on metered data.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Fetching | Loads data from an API. | Async and await used, the ok property checked, failure and error status handled separately, and no state set on an unmounted screen after navigating away. |
| Loading and errors | Shows a spinner. | A skeleton matching the real layout, an error state naming the failure with Retry, no connection distinguished from server error, and every failure path ending in a user action. |
| Offline behaviour | Handles no connection. | Local storage read first with background refresh, offline writes queued with an unsynced flag and confirmed to sync on reconnection, and the conflict strategy documented. |
| Performance | App runs acceptably. | Tested on the cheapest, oldest Android available, interface-blocking operations found and split or deferred, and FlatList used for the long list. |
| Data economy | Loads data. | Pagination added with data use measured before and after, images served at display size, responses cached, and a sync-only-on-Wi-Fi option provided. |

## Session questionsWhy does my app break on a 404 when I have a try block?+

Because fetch does not reject on HTTP error statuses — it resolves, since the request completed. You must check the response's ok property yourself, or your code parses an error page as data and fails confusingly several lines later.Is offline support really necessary for a first app?+

For a mobile app, yes. Poor coverage is normal rather than exceptional — lifts, basements, congested networks — and an app that errors in those moments gets uninstalled. Reading local data first is also what makes it feel instant, which is the main advantage over a website.How do I handle offline writes?+

Save them locally with a flag marking them unsynced, then send the queue when connectivity returns. For conflicts, last-write-wins with a timestamp is a legitimate first answer if you document it — an unfinished merge is worse than a simple rule.My app is smooth on my phone but slow for users. Why?+

You are developing on a good device. Low-end Android phones with slow processors and little memory are the majority of the market, so test on the cheapest, oldest phone you can find — everything that will be slow is visibly slow on it.Does data use really matter?+

Yes, because it is the user's money. Request only what you display with pagination, serve images at display size, cache responses, and offer a sync-only-on-Wi-Fi setting. An app that quietly overspends a metered balance gets uninstalled.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: State & Data](https://www.cea.ng/classes/mobile-app-development/state-and-data)[Next session 7: Testing on Devices](https://www.cea.ng/classes/mobile-app-development/testing-on-devices)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
