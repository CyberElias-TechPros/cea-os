---
title: "Session 5: State & Data"
description: "An app that forgets everything when it closes is a demo. This session covers where state should live, handling user input properly, rendering lists with FlatList rather than a map, and persisting data to the device so the expense tracker still has your expenses tomorrow morning."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

An app that forgets everything when it closes is a demo. This session covers where state should live, handling user input properly, rendering lists with FlatList rather than a map, and persisting data to the device so the expense tracker still has your expenses tomorrow morning.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Decide where state belongs and lift it correctly

- Handle text input as controlled state

- Render long lists with FlatList and explain why it matters

- Give every list item a stable key

- Persist data with local storage so it survives closing the app

- Model your data as a clear shape before storing it

## The taught content

### Where state should live

**State** is data the app holds and changes over time, and the first question is always **where does it live**. The rule is that state belongs in **the lowest common ancestor of everything that needs it** — high enough that all consumers can reach it, and no higher, because state placed at the root of an app causes every screen to re-render when anything changes.

In the expense tracker, the list of expenses is needed by the list screen and by the summary screen, so it lives above both — typically in the app's root or a shared context — while a form's in-progress text belongs in the add-expense screen alone. **Moving state up is called lifting**, and it is the correct response when two components need the same thing and currently each hold their own copy, which is how two values get out of sync.

The failure to watch for is **duplicated state**: the same fact stored in two places. If the list screen holds the expenses and the summary screen holds its own total, the total goes stale the moment an expense is added. Store the fact once and **derive** everything else — the total is computed from the list, not stored beside it.

### User input done properly

A `TextInput` is a **controlled component**: its value comes from state and every change updates that state through `onChangeText`. This feels like extra work compared with reading a value on submit, and it is worth it, because the app always knows what the user has typed — which is what makes validation, character counts and disabled-until-valid buttons possible.

Then the mobile-specific input details that decide whether a form is pleasant. Set the **keyboard type** — numeric for an amount, email for an email — because the wrong keyboard on a phone is a real obstacle, and a numeric field showing a full alphabet keyboard costs the user several taps. Set **`autoCapitalize`** and **`autoCorrect`** off for anything that is not prose, since autocorrect on a name or a code is actively harmful.

And **validate on the phone's terms**. A user on a small screen with a keyboard covering half the display cannot easily see an error message at the top of the form, so put feedback next to the field, keep it short, and disable the submit button until the input is valid rather than letting them submit and fail. Every extra tap on a phone costs more than it does on a desktop.

### Lists: why FlatList and not a map

The web habit is to map over an array and render everything. On mobile that is a genuine performance problem, because rendering five hundred rows builds five hundred sets of components whether the user can see them or not. **`FlatList` renders only what is near the screen** and recycles the rest, so a list of five items and a list of five thousand cost roughly the same.

This is not a premature optimisation — it is the standard way to render a list on mobile, and the difference on a low-end Android device is between an app that scrolls smoothly and one that stutters and eventually runs out of memory. **Use FlatList for any list whose length you do not control**, which in practice means almost every list.

Then the detail that causes subtle bugs: **keys**. Each item needs a **stable, unique key** derived from the data — the expense's id — not its position in the array. Using the array index works until you delete or reorder an item, at which point every subsequent item's key shifts and the list can display the wrong data in the wrong row, or keep the state of a row that has moved. It is one of the more confusing bugs in mobile development and it is entirely preventable.

### Modelling the data before storing it

Before persisting anything, decide the **shape**. For the expense tracker each record needs a unique **id**, the **amount** as a number, a **category**, an **ISO date string**, and an optional note. Note two decisions in there: the amount is a **number, not a string**, because you will total it; and the date is an **ISO string**, because dates serialise predictably while date objects do not survive storage unchanged.

The id matters more than it looks. It is what navigation params reference, what list keys use, and what you will later send to a server. Generate something genuinely unique rather than using a counter, because a counter restarts and produces collisions when records are added from more than one place.

Then think about **money carefully**, because it is where financial apps go wrong. Floating-point numbers cannot represent all decimals exactly, so adding 0.1 and 0.2 does not give exactly 0.3. The standard fix is to **store money in kobo as integers** — ₦4,500.00 becomes 450000 — and divide by 100 only when displaying. It feels fussy until the first time a total is one kobo out on a client's report.

### Persisting with local storage

Without persistence the app forgets everything on close, which makes it a demo rather than a product. **`AsyncStorage`** is the simple key-value store on the device: you write a string under a key and read it back later. Since it holds strings, you **serialise with `JSON.stringify`** on the way in and **parse on the way out**.

The **async** part is not decoration — reading from storage takes time, so the API is promise-based and you must **await** it. The practical consequence is that **the app starts before the data has loaded**, so there is a moment when the list is empty and you do not yet know whether it is genuinely empty or still loading. Handle that state explicitly, because flashing an empty state and then filling it looks like a bug.

Then the cautions. **Local storage is not a database**: it holds small amounts of data well and becomes slow with large collections, so it suits the expense tracker and not a catalogue of thousands of items. **Wrap parsing in a try block**, because corrupt or partial data will throw and crash the app at launch — the worst possible moment. And remember it is **per device and not synced**, which is exactly the gap the next session's API work fills.

## Instructor demonstration

The instructor makes the expense tracker remember things — placing state at the right level, wiring the form as controlled input with the right keyboard, replacing a mapped list with FlatList and showing what the index-as-key bug looks like, modelling the record with money in kobo, then persisting to AsyncStorage and handling the loading moment.

### Add an expense and watch it disappear on reload

Explain that state held only in memory is lost when the app closes, which makes this a demo rather than a product.02

### Find where the expense list state should live

List screen and summary screen both need it. Explain the rule: the lowest common ancestor, high enough to reach and no higher.03

### Show duplicated state causing a stale total

Store a total beside the list and add an expense. Explain that the fix is to store the fact once and derive everything else.04

### Derive the total from the list instead

Explain that a computed value cannot go stale, while a stored copy always eventually does.05

### Wire the amount field as controlled input

Value from state, onChangeText updating it. Explain that the app always knowing the value is what enables validation and a disabled-until-valid button.06

### Set the keyboard type to numeric

Show the alphabet keyboard it replaces. Explain that the wrong keyboard on a phone costs several taps and is a real obstacle.07

### Turn autoCorrect off on the note field

Show it mangling a name. Explain that autocorrect is actively harmful on anything that is not prose.08

### Put validation feedback beside the field

Explain that with a keyboard covering half the screen, an error at the top of the form is invisible to the user.09

### Render the list by mapping over the array

Add five hundred items. Explain that this builds five hundred component sets whether they are visible or not.10

### Replace it with FlatList

Compare scrolling on a low-end device. Explain that FlatList renders only what is near the screen and recycles the rest.11

### Use the array index as the key

Explain that it works until you delete or reorder, and that this is one of the more confusing mobile bugs.12

### Delete an item and show the wrong row affected

Explain that every subsequent key shifts, so rows can display the wrong data or keep the state of a row that moved.13

### Switch the key to the record id

Delete again and confirm the correct row goes. Explain that a stable unique key is entirely preventable effort.14

### Model the record shape

Id, amount as a number, category, ISO date, optional note. Explain that dates serialise predictably while date objects do not survive storage.15

### Show the floating-point money problem

Add 0.1 and 0.2. Explain that storing money in kobo as integers and dividing only on display is the standard fix.16

### Write the list to AsyncStorage

JSON.stringify on the way in. Explain that storage holds strings, so serialisation is not optional.17

### Read it back on app start

Await the read and parse. Explain that the async nature means the app starts before the data has loaded.18

### Show the empty-state flash

Explain that you cannot yet tell genuinely empty from still loading, so that state must be handled explicitly or it looks like a bug.19

### Corrupt the stored value and relaunch

Show the crash at launch. Explain that parsing must be wrapped in a try block, because crashing at startup is the worst possible moment.20

### Close and reopen the app

Confirm the expenses are still there. Explain that this is the moment the app stops being a demo.

## Guided practice

### Make the app remember

You place state correctly so nothing is duplicated, wire the form as controlled input with the right keyboard and inline validation, render the list with FlatList and stable keys, model the record with money stored as integers, and persist everything to local storage with the loading and corrupt-data cases handled.

1. 01Add an expense and confirm what happens on reload before you change anything.

2. 02List every screen that needs the expense data.

3. 03Place that state at the lowest common ancestor and no higher.

4. 04Remove any duplicated state, deriving totals instead of storing them.

5. 05Wire every form field as controlled input with value and onChangeText.

6. 06Set the keyboard type correctly for each field, numeric for the amount.

7. 07Turn autoCorrect and autoCapitalize off where the field is not prose.

8. 08Place validation feedback beside each field rather than at the top of the form.

9. 09Disable the submit button until the input is valid.

10. 10Generate a large number of items to test list performance.

11. 11Replace any mapped list with FlatList and compare scrolling.

12. 12Use the record id as the key, not the array index.

13. 13Delete an item and confirm the correct row is removed.

14. 14Define the record shape: id, amount as a number, category, ISO date, note.

15. 15Store the amount as an integer in kobo and divide only when displaying.

16. 16Write the list to AsyncStorage with JSON.stringify.

17. 17Read it back on app start, awaiting the read and parsing the result.

18. 18Handle the loading state distinctly from the empty state.

19. 19Wrap parsing in a try block and confirm the app survives corrupt data.

20. 20Close and reopen the app and confirm the data persists.

21. 21Test on a physical phone and note any difference in list performance.

The standard we hold you to

An app that persists its data: state placed at the lowest common ancestor of the screens needing it and no higher, duplicated state removed with totals derived rather than stored; every form field wired as controlled input with the correct keyboard type per field, autoCorrect and autoCapitalize off where the field is not prose, validation feedback beside each field, and submit disabled until valid; a large item set generated and any mapped list replaced with FlatList with the scroll difference compared, record ids used as keys rather than array indexes, and deletion confirmed to remove the correct row; the record shape defined with id, amount as a number, category, ISO date string and optional note, the amount stored as an integer in kobo and divided only on display; the list written to AsyncStorage with JSON.stringify and read back on start with the read awaited and parsed; loading handled distinctly from empty; parsing wrapped in a try block with the app confirmed to survive corrupt data; persistence confirmed by closing and reopening; and list performance noted on a physical phone.

## Common mistakes and how to fix them

Your app forgets everything on close

Fix: Persist to local storage. State in memory is lost when the app closes, which is the difference between a demo and a product.

You store a total beside the list

Fix: Derive it. Duplicated state always goes stale eventually, while a computed value cannot.

State lives at the root of the app

Fix: Put it at the lowest common ancestor of what needs it. Root-level state makes every screen re-render whenever anything changes.

You render a long list by mapping over the array

Fix: Use FlatList. Mapping builds every row whether it is visible or not, and on a low-end device that means stutter and eventually running out of memory.

You use the array index as the list key

Fix: Use the record id. Index keys shift on delete or reorder, so rows can show the wrong data or keep the state of a row that moved.

You store money as a float

Fix: Store kobo as integers and divide on display. Floating point cannot represent all decimals exactly, and a total one kobo out on a client's report is a real problem.

Your app flashes an empty list on launch

Fix: Handle loading distinctly from empty. Reading storage is async, so there is a real moment when you do not yet know which one you are in.

You parse stored data without a try block

Fix: Wrap it. Corrupt or partial data throws, and crashing at launch is the worst possible moment for your app to fail.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Store each fact once and derive everything else. A total stored beside a list goes stale the moment an expense is added, while a computed total cannot — and duplicated state is the commonest source of inexplicable wrong numbers.

- Use FlatList for any list whose length you do not control. Mapping over an array builds every row whether it is visible or not, and on the low-end Android devices most users have that means stutter and eventually memory failure.

- Key list items by record id, never by array index. Index keys shift when you delete or reorder, producing one of the more confusing bugs in mobile development, and the fix costs nothing.

- Store money as integers in kobo and divide only on display. Floating point cannot represent all decimals exactly, and it feels fussy right up until a client's total is one kobo out.

## Key termsStateData the app holds and changes over time. Belongs at the lowest common ancestor of what needs it.Lifting stateMoving state up so two components share it. The correct fix when two copies get out of sync.Derived valueComputed from stored data rather than stored beside it. Cannot go stale, unlike a copy.Controlled inputA TextInput whose value comes from state and updates it on every change. What enables validation.FlatListRenders only rows near the screen and recycles the rest. The standard way to render a list on mobile.KeyA stable unique identifier per list item. Must come from the data, not the array position.AsyncStorageA key-value store on the device holding strings. Serialise in, parse out, and it is not a database.Integer koboMoney stored as whole kobo rather than decimal naira. Avoids floating-point errors in totals.

## Homework before the next session

Persist one list to AsyncStorage

Serialise on write, await and parse on read, and wrap the parse in a try block. Close and reopen the app to confirm it survived.

Convert a mapped list to FlatList

Generate a few hundred items first so the difference is visible. Compare scrolling on a physical phone, not only in the simulator.

Prove the index-key bug to yourself

Use the array index as the key, delete an item from the middle, and watch what happens. Then switch to an id and confirm it is fixed.

Store one amount in kobo

Convert on input, store as an integer, divide only on display. Then add several awkward amounts and confirm the total is exact.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| State placement | State works. | Placed at the lowest common ancestor and no higher, duplicated state removed, and totals derived from the list rather than stored beside it. |
| Input handling | Form accepts input. | Every field controlled with the correct keyboard type, autocorrect off where the field is not prose, feedback beside each field, and submit disabled until valid. |
| Lists | Displays a list. | FlatList used for the item list, performance compared with a mapped list on a physical phone, and record ids used as keys with deletion confirmed to affect the correct row. |
| Data modelling | Stores records. | A defined shape with id, numeric amount, category, ISO date and optional note, and money stored as integer kobo with division only on display. |
| Persistence | Data survives a reload. | AsyncStorage used with serialisation, an awaited read, loading handled distinctly from empty, parsing wrapped in a try block, and survival of corrupt data confirmed. |

## Session questionsWhere should my state live?+

At the lowest common ancestor of everything that needs it — high enough that all consumers can reach it, no higher. State at the app root makes every screen re-render when anything changes, and state duplicated in two components will always eventually disagree.Why not just map over the array to render a list?+

Because it builds every row whether it is visible or not. Five hundred rows means five hundred sets of components, which on a low-end Android device means stutter and eventually running out of memory. FlatList renders only what is near the screen.Does the list key really matter?+

Yes, and it must be stable. Using the array index works until you delete or reorder, at which point every subsequent key shifts and rows can display the wrong data or keep the state of a row that moved. Use the record's id.Should I store money as a decimal?+

No — store kobo as integers and divide by 100 only when displaying. Floating-point numbers cannot represent all decimals exactly, so adding 0.1 and 0.2 does not give exactly 0.3, and a total one kobo out on a client's report is a real problem.Is AsyncStorage enough, or do I need a database?+

For an expense tracker it is enough. AsyncStorage is a key-value store holding strings, good for small collections and slow for large ones, and it is per device rather than synced. If you outgrow it or need sync, that is what the API work in the next session is for.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Navigation & Components](https://www.cea.ng/classes/mobile-app-development/navigation-components)[Next session 6: Working with APIs](https://www.cea.ng/classes/mobile-app-development/working-with-apis)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
