---
title: "Session 4: Navigation & Components"
description: "Four screens need to know how to reach each other, and the code needs to stop repeating itself. This session covers wiring tab, stack and modal navigation together, passing data between screens, extracting reusable components, centralising styling so the app looks consistent, and behaving sensibly across device sizes."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

Four screens need to know how to reach each other, and the code needs to stop repeating itself. This session covers wiring tab, stack and modal navigation together, passing data between screens, extracting reusable components, centralising styling so the app looks consistent, and behaving sensibly across device sizes.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Wire a tab bar, a stack and a modal into one app

- Pass data between screens and read it on arrival

- Extract repeated UI into reusable components with props

- Centralise colours and spacing so styling stays consistent

- Make layouts work from a small phone to a tablet

- Keep navigation behaving correctly with the system back button

## The taught content

### Wiring the navigation together

Session two chose the patterns; now they have to coexist. The expense tracker uses a **tab bar** for its three siblings — expenses, summary, settings — a **stack** so tapping an expense opens its detail, and a **modal** for adding one, because adding is a short interrupting task that should cover the screen and be dismissed on completion.

Nesting these is the part that confuses people, and the mental model is simple: **the tab bar is the outermost layer**, and each tab contains its own stack. So the Expenses tab holds a stack whose first screen is the list and whose second is the detail, and the Summary tab holds its own stack independently. Going back from a detail screen returns to that tab's list without disturbing the other tabs.

The modal sits outside this, presented over whatever is current and dismissed rather than popped. Getting this structure right matters because it is what makes the **system back button** behave sensibly on Android: back from a detail returns to the list, back from the list exits the app, and back from the modal closes it. An app where back does something surprising feels broken no matter how good the screens are.

### Passing data between screens

Navigation is not just movement, it is **carrying context**. Tapping an expense in the list must open that expense's detail, not a generic one, which means passing its identifier as a **navigation param** and reading it on the destination screen.

The discipline worth establishing early is to **pass an identifier, not the whole object**. Pass the expense's id and look it up from the single source of data on the detail screen. Passing the whole object works immediately and breaks later, because when the expense is edited the detail screen is holding a stale copy and shows the old values — a bug that is genuinely confusing to debug because the code looks correct.

Then handle the **missing case**. A screen that expects a param can be reached without one — through a deep link, a notification, or a bug — so read the param defensively and show something sensible rather than crashing. An app that crashes on a missing id is an app that crashes in front of a user, and the fix is one line.

### Reusable components

By now the same button, the same card and the same list row appear several times, written out each time. **Extracting them into components** is what separates an app you can maintain from one you cannot: one `Button` component used everywhere means a change to the button changes it everywhere, and one `ExpenseRow` means the list is defined in one place.

A good mobile component takes **props for what varies and owns what does not**. `ExpenseRow` takes the expense and an `onPress`; it owns its own layout, spacing and typography. `Button` takes a label, an `onPress` and a variant; it owns its padding, border radius and press feedback. The test is whether you could drop the component into another screen without editing it.

The trap to avoid is **abstracting too early**. Copy a pattern twice and it is fine; extract on the third. Extracting after one instance usually produces a component with the wrong props, which you then have to keep changing. And resist the urge to build one component that does everything with ten optional props — **several small clear components beat one flexible confusing one**, in mobile as everywhere.

### Centralising the styling

Mobile has no CSS, so consistency is a discipline you impose rather than something a stylesheet gives you. The method is a **theme file**: one module exporting your colours, your spacing scale and your type sizes, which every component imports. **`colors.primary`** rather than a hex code scattered across twenty files; **`spacing.md`** rather than a number someone typed.

The payoff is immediate and practical. A client asks for a different brand colour and you change one line. Spacing that was **roughly** consistent becomes actually consistent, because there are only four values to choose from. And a new screen looks like the others automatically, because it is built from the same primitives with the same tokens.

Then **`StyleSheet.create`** rather than inline style objects. It is not merely tidier: styles defined this way are created once rather than on every render, which matters on the low-end devices most of your users have, and it gives you a single place per file to see what a component looks like.

### Working across device sizes

Android devices range from small phones around 320 density-independent pixels wide to tablets at three times that, and an app that only works at one size is broken on the others. The starting rule is to **avoid fixed widths** — a `width: 340` that fits your phone will overflow a small one and look stranded on a tablet.

Use **flex and percentages** instead: `flex: 1` to fill available space, `flexDirection: row` with flex children to divide a row proportionally, and percentage widths where a proportion is what you mean. Fixed values are right for things that genuinely have a fixed size — touch targets, icons, spacing — and wrong for anything that should scale.

Then **test at the extremes**, because the middle sizes always work. Check the smallest phone you can, where text wraps and buttons crowd, and a tablet, where a full-width list looks absurd and content wants a maximum width. The browser simulator is genuinely useful here, since it can emulate many sizes quickly — this is the one thing it is better at than a single physical phone.

## Instructor demonstration

The instructor wires the expense tracker's four screens together on the live project — nesting stacks inside tabs, adding the add-expense modal, passing an id to the detail screen and showing the stale-object bug, extracting three reusable components, moving every colour and spacing value into a theme file, and testing the layout from a 320dp phone to a tablet.

### Lay out the navigation structure on the board

Tab bar outermost, a stack inside each tab, modal outside. Explain that this structure is what makes the back button behave sensibly.02

### Create the three-tab navigator

Expenses, summary, settings. Explain that siblings of equal importance get tabs and that five is the ceiling.03

### Put a stack inside the Expenses tab

List as the first screen, detail as the second. Explain that each tab holds its own stack independently.04

### Test the back button on Android

Back from detail to list, back from list exits. Explain that an app where back surprises the user feels broken however good the screens are.05

### Add the add-expense screen as a modal

Explain that a short interrupting task should cover the screen and be dismissed on completion rather than popped.06

### Make a list row tappable

Navigate on press. Explain that a Pressable gives the feedback a plain View does not.07

### Pass the whole expense object as a param

Show it working. Explain that this is the tempting approach and it breaks later.08

### Edit that expense and reopen the detail

Show the stale values. Explain that the detail screen is holding a copy, and this bug is confusing because the code looks correct.09

### Change to passing the id and looking it up

Explain that a single source of data means the detail always shows current values.10

### Open the detail with no param

Show the crash, then read the param defensively. Explain that deep links and notifications can reach a screen without params and the fix is one line.11

### Find the repeated button code

Show it in three places. Explain that three copies means three places to change and three chances to diverge.12

### Extract a Button component

Label, onPress and variant as props; padding, radius and press feedback owned inside. Explain the test: could you drop it into another screen without editing it?13

### Extract an ExpenseRow component

Expense and onPress in, layout owned inside. Explain that the list is now defined in one place.14

### Show a premature abstraction and remove it

Explain extracting on the third copy, because after one instance you usually design the wrong props.15

### Collect every colour into a theme file

Replace scattered hex codes with named tokens. Explain that a brand colour change is now one line instead of twenty edits.16

### Collect spacing and type sizes too

Explain that roughly consistent spacing becomes actually consistent when there are only four values to choose from.17

### Move inline styles into StyleSheet.create

Explain that these are created once rather than per render, which matters on low-end devices.18

### Set a fixed width and test on a small phone

Show the overflow at 320dp. Explain that a width fitting your phone will not fit the smallest one on sale.19

### Replace it with flex and test again

Explain that fixed values are right for touch targets, icons and spacing, and wrong for anything that should scale.20

### Test on a tablet size

Show a full-width list looking absurd. Explain that a maximum content width is usually the fix, and that the simulator is genuinely useful for testing many sizes.

## Guided practice

### Wire the app together and stop repeating yourself

You connect all four screens with correct navigation, pass identifiers rather than objects, extract your repeated UI into reusable components, centralise every colour and spacing value into a theme, and verify the layout from the smallest phone to a tablet.

1. 01Draw the navigation structure: tab bar outermost, a stack in each tab, modal outside.

2. 02Create the three-tab navigator for expenses, summary and settings.

3. 03Put a stack inside the Expenses tab with list and detail screens.

4. 04Add the add-expense screen as a modal that dismisses on completion.

5. 05Test the Android back button from every screen and confirm it behaves sensibly.

6. 06Make each list row tappable with visible press feedback.

7. 07Pass the expense id as a navigation param, not the whole object.

8. 08Look the expense up from the single data source on the detail screen.

9. 09Edit an expense and confirm the detail screen shows the updated values.

10. 10Read the param defensively and show something sensible when it is missing.

11. 11Identify every piece of UI repeated more than twice.

12. 12Extract a Button component taking label, onPress and variant.

13. 13Extract an ExpenseRow component taking the expense and onPress.

14. 14Confirm each component could be dropped into another screen without editing.

15. 15Create a theme file exporting colours, spacing and type sizes.

16. 16Replace every scattered hex code and magic number with a token.

17. 17Move inline styles into StyleSheet.create in each component.

18. 18Remove every fixed width that should scale and replace it with flex.

19. 19Test at the smallest phone size and fix any overflow or crowding.

20. 20Test at a tablet size and add a maximum content width where needed.

21. 21Run the app on a physical phone and confirm nothing regressed.

The standard we hold you to

All four screens wired with the navigation structure drawn first — tab bar outermost with a stack inside the Expenses tab and the add-expense screen presented as a modal dismissing on completion — with the Android back button tested from every screen and behaving sensibly; rows tappable with press feedback, the expense id passed as a param rather than the object, looked up from the single data source on the detail screen and confirmed to show updated values after an edit, with the param read defensively and a sensible fallback when missing; every UI element repeated more than twice extracted into components that take what varies as props and own what does not, each confirmed droppable into another screen unedited; a theme file exporting colours, spacing and type sizes with every scattered hex code and magic number replaced by a token; inline styles moved into StyleSheet.create; every fixed width that should scale replaced with flex; the layout tested at the smallest phone size with overflow and crowding fixed and at a tablet size with a maximum content width added where needed; and the app confirmed unregressed on a physical phone.

## Common mistakes and how to fix them

Your back button does something surprising

Fix: Nest stacks inside tabs with the modal outside. Back from detail should return to the list, back from the list should exit, and back from a modal should close it.

You pass the whole object between screens

Fix: Pass the id and look it up. A passed object becomes a stale copy the moment the record is edited, and the resulting bug is confusing because the code looks correct.

Your detail screen crashes when opened without a param

Fix: Read params defensively and render a fallback. Deep links, notifications and bugs all reach screens without params, and the fix is one line.

The same button is written out three times

Fix: Extract a component. Three copies means three places to change and three chances for them to diverge, and one component means a change lands everywhere.

You abstracted after the first instance

Fix: Extract on the third copy. Abstracting after one usually produces the wrong props, which you then have to keep changing.

Hex colours are scattered across twenty files

Fix: Move them into a theme file as named tokens. A brand colour change should be one line, and roughly consistent spacing becomes actually consistent when only four values exist.

You use inline style objects everywhere

Fix: Use StyleSheet.create. Styles are then created once rather than on every render, which matters on the low-end devices most users have.

You set fixed widths

Fix: Use flex and percentages for anything that should scale. A width that fits your phone overflows the smallest one and looks stranded on a tablet.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Nest stacks inside tabs with the modal outside. That structure is what makes the Android back button behave predictably, and an app where back surprises the user feels broken however good the individual screens are.

- Pass identifiers between screens, never whole objects. A passed object becomes a stale copy the moment the record is edited, producing a bug that is genuinely hard to trace because the code looks correct.

- Extract on the third repetition, not the first. Copying twice is fine, and abstracting after one instance usually produces a component with the wrong props that you then have to keep changing.

- Put colours, spacing and type sizes in one theme file. It turns a brand change into one line and makes roughly consistent spacing actually consistent, because there are only a few values left to choose from.

## Key termsTab navigatorThe outermost layer, switching between three to five equal areas. Each tab holds its own stack.Stack navigatorPush a screen on, pop it off. What the system back button expects to operate on.ModalPresented over the current screen for a short task and dismissed on completion rather than popped.Navigation paramData carried to a destination screen. Pass an identifier, not the object, to avoid stale copies.Reusable componentTakes what varies as props and owns what does not. The test is whether it drops into another screen unedited.Theme tokensNamed colours, spacing and type sizes in one module. What makes a brand change one line instead of twenty.StyleSheet.createDefines styles once rather than per render. Matters on low-end devices.Density-independent pixelThe unit mobile layout uses, so a size is physically similar across screen densities.

## Homework before the next session

Draw your navigation structure before wiring it

Tab bar, stacks, modal, and what back does from each screen. Then build it and test back on every screen.

Convert one param from object to id

Then edit the record and confirm the detail screen shows the new values. Note what the object version would have shown.

Extract one repeated component

Find UI repeated three or more times, extract it with props for what varies, and confirm you can drop it into another screen unedited.

Build a theme file

Move every colour, spacing value and type size into it, then change your primary colour and count how many files you had to touch.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Navigation structure | Screens are reachable. | Tab bar outermost with stacks nested inside and the modal outside, drawn before building, with the Android back button tested from every screen and behaving sensibly. |
| Data passing | Passes data between screens. | Identifiers passed rather than objects, looked up from a single source and confirmed current after an edit, with params read defensively and a fallback for the missing case. |
| Components | Has some components. | Everything repeated more than twice extracted, props for what varies and ownership of what does not, each droppable into another screen unedited, and no abstraction made after a single instance. |
| Styling | App looks consistent. | A theme file exporting colours, spacing and type sizes with no scattered hex codes or magic numbers, and styles in StyleSheet.create rather than inline objects. |
| Device range | Works on one device. | Fixed widths replaced with flex, tested at the smallest phone size with crowding fixed and at a tablet size with a maximum content width, and confirmed unregressed on a physical phone. |

## Session questionsHow do tabs and stacks fit together?+

The tab bar is the outermost layer and each tab contains its own stack. So the Expenses tab holds a stack whose first screen is the list and second is the detail, independently of the other tabs. That structure is what makes the system back button behave predictably.Should I pass the whole object or just the id?+

Just the id, then look it up from your single data source. A passed object becomes a stale copy the moment the record is edited, so the detail screen shows old values — and that bug is confusing to trace because the code looks correct.When should I extract a component?+

On the third repetition. Copying a pattern twice is fine, and extracting after one instance usually gives you the wrong props, which you then have to keep changing. Also resist one component with ten optional props — several small clear ones beat it.Is a theme file really necessary for a four-screen app?+

Yes, and it costs an hour. A brand colour change becomes one line instead of twenty edits, spacing becomes actually consistent rather than roughly consistent, and every new screen looks like the others because it uses the same tokens.How do I test different screen sizes without owning many phones?+

Use the browser simulator's device emulation — it is the one thing it does better than a single physical phone. Test the extremes, around 320dp and a tablet, because the middle sizes always work and the extremes are where fixed widths and crowding appear.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: Building Screens](https://www.cea.ng/classes/mobile-app-development/building-screens)[Next session 5: State & Data](https://www.cea.ng/classes/mobile-app-development/state-and-data)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
