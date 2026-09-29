---
title: "Session 3: Building Screens"
description: "The toolchain, and the first screens that actually run on a phone. This session covers setting up Expo, why it removes the native build problem, running on a real device through Expo Go, the core components and how they differ from HTML, and laying out for small screens including safe areas and the keyboard."
date: "2026-09-12"
class_slug: "mobile-app-development"
---

The toolchain, and the first screens that actually run on a phone. This session covers setting up Expo, why it removes the native build problem, running on a real device through Expo Go, the core components and how they differ from HTML, and laying out for small screens including safe areas and the keyboard.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Install and run the toolchain end to end

- Explain why Expo avoids native build configuration

- Run and reload an app on a real phone

- Use the core mobile components correctly

- Lay out screens with Flexbox in a mobile context

- Handle safe areas, notches and the on-screen keyboard

## The taught content

### The toolchain, and why Expo

Building a mobile app the traditional way means installing Android Studio or Xcode, configuring SDKs, signing keys and build graders, and spending your first week on configuration rather than code. **Expo** is a framework on top of React Native that removes almost all of this: you write JavaScript, and Expo handles the native side, so a working app on a phone takes minutes rather than days.

For this course that is decisive for three reasons. It runs on **Windows and Linux as well as macOS**, so no Mac is needed to learn. It needs **no Android Studio installation** to get started, which matters on a laptop with 8GB of RAM where a full Android emulator is slow to the point of unusable. And it can run in a **browser-based simulator** as well as on a physical phone.

The setup is what you already have from Web Development: **Node.js**, then create an Expo project, then start it. There is one dependency and one command, and the project structure is ordinary JavaScript — which is the point. Everything you learned about components, state and imports applies directly.

### Running on a real phone

The fastest and most honest development loop on mobile is a **physical phone**, and with Expo it is easy. Install **Expo Go** from the Play Store, start the project on your laptop, and scan the QR code — the app runs on your phone, connected to your laptop over the same network. Save a file and the phone updates.

This matters more than it sounds, because **the emulator lies**. A desktop emulator has a fast processor, a large screen, a precise mouse pointer and a wired connection, so it hides exactly the problems that matter: small touch targets, slow rendering, awkward thumb reach and slow data. Testing only on an emulator is how apps ship feeling wrong.

Two practical notes. The phone and laptop must be on the **same network**, which on some campus or church Wi-Fi is blocked — a phone hotspot works reliably. And keep the phone **in your hand while developing**, not on the desk, because holding it tells you about reach and size in a way looking at it does not.

### Components, and how they differ from HTML

Mobile has no HTML elements; it has **components**, and the core set is small. **`View`** is the container — the equivalent of a div — and everything is built from them. **`Text`** displays text, and here is the rule that catches every web developer: **text must be inside a `Text` component**. Writing text directly inside a `View` does not work, which feels arbitrary until you accept that mobile text has no inherited browser styling and must be explicit.

**`TextInput`** is the input field, **`ScrollView`** makes content scrollable, **`Image`** displays images, and **`Pressable`** or **`TouchableOpacity`** makes something tappable with visual feedback. Notice what is missing: there is no anchor tag, no paragraph, no heading. Mobile gives you primitives and you compose them, which is more work initially and far more predictable later.

The other difference is that **nothing is styled by default**. There is no browser stylesheet, so nothing has margins, sizes or fonts until you set them. Text has no default size, a `View` has no default padding, and a `Pressable` looks like nothing until you style it. This is initially frustrating and eventually freeing, because every pixel on screen is there because you put it there.

### Layout with Flexbox, but different defaults

You know Flexbox, and mobile uses it — but the defaults are reversed in the way that confuses everyone. In a mobile `View`, **`flexDirection` defaults to column**, not row. So children stack vertically unless you say otherwise, which is the opposite of the web and takes about a day to stop fighting.

The rest is familiar: **`justifyContent`** distributes along the main axis, **`alignItems`** along the cross axis, **`flex: 1`** makes a child fill available space, and **`gap`** spaces children evenly. Percentages work against the parent. If you can centre a box on the web you can centre one on mobile; you only need to remember which way is down.

The mobile-specific part is that **the screen is small and the content often overflows**, so scrolling is not automatic. Content taller than the screen is simply cut off unless it is inside a `ScrollView` — and a `ScrollView` needs a defined height to scroll within, which in practice means **`flex: 1`** on it inside a full-height container. Forgetting this produces a screen where the bottom half is unreachable, which is a very common first bug.

### Safe areas, notches and the keyboard

Modern phones have **notches, punch-holes and rounded corners**, and content placed at the very top of the screen can sit underneath them or under the status bar. **Safe area insets** are the measurements that tell you how much space to leave, and Expo provides them so your content starts below the status bar rather than behind it. Ignoring this produces an app whose title is half-hidden by the clock.

The bottom has the equivalent problem: **gesture bars and navigation bars** overlay the bottom of the screen, so a button placed flush to the bottom edge can be untappable or partly hidden. The fix is the same — respect the bottom inset — and it is why well-designed apps have visibly more space at the bottom than you would put there by eye.

Then the problem that surprises everyone: **the on-screen keyboard covers the bottom half of the screen**. A form field near the bottom disappears behind the keyboard when tapped, so the user cannot see what they are typing. The standard fix is a **keyboard-aware view** that shifts or scrolls the content when the keyboard appears. This is not a polish item — an app where you cannot see the field you are typing into is unusable, and it is one of the first things a real user will find.

## Instructor demonstration

The instructor sets up the toolchain from nothing on a laptop and has the expense tracker's first two screens running on a real phone within the session — installing, creating the project, connecting via Expo Go, building the screens from core components, and fixing the three bugs every beginner hits: text outside a Text component, content cut off without a ScrollView, and the keyboard covering the input.

### Check Node is installed

Run the version command. Explain that this is the only prerequisite beyond what Web Development already required.02

### Create the Expo project

One command. Explain that Expo removes Android Studio, SDK configuration and signing, which is the part that consumes a traditional first week.03

### Start the project and show the QR code

Explain that this is what the phone connects to, over the same network.04

### Install Expo Go on a real phone

From the Play Store. Explain that a physical device is the honest test because an emulator hides small targets, slow rendering and awkward reach.05

### Scan the QR code and run the app

Explain that if campus or church Wi-Fi blocks device discovery, a phone hotspot works reliably.06

### Edit a file and watch the phone reload

Explain that this save-and-see loop is what makes mobile development feel like web development again.07

### Write text directly inside a View

Show that nothing renders. Explain the rule: text must be inside a Text component, because mobile has no inherited browser text styling.08

### Wrap it in Text and style it

Explain that nothing has a default size or font, so every pixel is there because you set it.09

### Build the expense list screen from Views

Compose containers. Explain that mobile gives primitives rather than semantic elements, which is more work initially and more predictable later.10

### Add children and watch them stack vertically

Explain that flexDirection defaults to column on mobile, which is the reverse of the web and takes a day to stop fighting.11

### Centre a box with justifyContent and alignItems

Explain that Flexbox knowledge transfers directly once you remember which way is down.12

### Add enough content to overflow the screen

Show the bottom cut off and unreachable. Explain that scrolling is not automatic on mobile and this is a very common first bug.13

### Wrap it in a ScrollView with flex 1

Explain that a ScrollView needs a defined height to scroll within, which in practice means flex 1 inside a full-height container.14

### Build the add-expense form with TextInput

Explain that a Pressable or TouchableOpacity provides the tap feedback a plain View does not.15

### Tap a field near the bottom

Show the keyboard covering it. Explain that the user cannot see what they are typing, which makes the app unusable rather than merely awkward.16

### Add a keyboard-aware view

Show the content shift. Explain that this is not polish and is one of the first things a real user finds.17

### Show content under the status bar

Explain that notches and the status bar overlay the top, so a title can be half-hidden by the clock.18

### Apply safe area insets

Explain that the bottom needs it too, because gesture and navigation bars overlay it and a flush-to-edge button can be untappable.19

### Put the phone in hand and use the app

Explain that holding it reveals reach and size problems that looking at it on a desk does not.

## Guided practice

### Get two screens running on a real phone

You set up the toolchain from nothing, connect a physical phone through Expo Go, and build the expense list and add-expense screens from core components — correctly scrolled, keyboard-aware and clear of the safe areas — then use the app in your hand and note what the emulator hid.

1. 01Confirm Node.js is installed and record the version.

2. 02Create an Expo project and confirm it starts.

3. 03Install Expo Go on a physical Android phone.

4. 04Connect the phone to the same network as the laptop, or use a hotspot if discovery fails.

5. 05Scan the QR code and confirm the app runs on the phone.

6. 06Edit a file and confirm the phone reloads.

7. 07Build the expense list screen from View and Text components.

8. 08Confirm every piece of text is inside a Text component.

9. 09Style the screen explicitly, setting sizes and spacing yourself.

10. 10Add enough list content to overflow the screen and observe what is cut off.

11. 11Wrap the content in a ScrollView with flex 1 and confirm it reaches the bottom.

12. 12Build the add-expense form with TextInput fields.

13. 13Use a Pressable or TouchableOpacity for the submit control so it gives feedback.

14. 14Tap a field near the bottom and observe the keyboard covering it.

15. 15Add a keyboard-aware view and confirm the field stays visible.

16. 16Check whether any content sits under the status bar.

17. 17Apply safe area insets at the top and the bottom.

18. 18Use the app holding the phone in one hand and note anything hard to reach.

19. 19Compare the same app in the browser simulator and list what the emulator hid.

20. 20Commit the working project to your GitHub repository.

The standard we hold you to

Two screens running on a physical Android phone: Node confirmed and an Expo project created and started, Expo Go installed and connected over the same network or a hotspot, the QR code scanned and a file edit confirmed to reload on the device; the expense list built from View and Text with every piece of text inside a Text component and all sizes and spacing set explicitly; enough content added to overflow the screen with the cut-off observed and then fixed by a ScrollView using flex 1 and confirmed to reach the bottom; the add-expense form built with TextInput fields and a Pressable or TouchableOpacity submit control giving tap feedback; the keyboard observed covering a low field and a keyboard-aware view added so the field stays visible; content checked against the status bar and safe area insets applied top and bottom; the app used one-handed with reach problems noted; the same app compared in the browser simulator with what the emulator hid listed; and the working project committed to GitHub.

## Common mistakes and how to fix them

You write text directly inside a View

Fix: Wrap it in a Text component. Mobile text has no inherited browser styling, so it must be explicit — and this is the first rule that catches every web developer.

Your children lay out sideways when you expected down

Fix: Remember flexDirection defaults to column on mobile, which is the reverse of the web. Set it to row when you actually want a row.

The bottom of your screen is unreachable

Fix: Wrap the content in a ScrollView. Scrolling is not automatic on mobile, and a ScrollView needs a defined height — in practice flex 1 inside a full-height container.

The keyboard covers the field you are typing in

Fix: Use a keyboard-aware view that shifts or scrolls the content. This is not polish; an app where you cannot see the field is unusable.

Your title sits under the status bar

Fix: Apply safe area insets. Notches, punch-holes and the status bar overlay the top of the screen, and the bottom needs it too because of gesture bars.

You test only in the emulator

Fix: Use a physical phone. An emulator has a fast processor, a big screen, a precise pointer and a wired connection, so it hides exactly the problems that matter.

Your phone cannot see the laptop

Fix: Confirm both are on the same network, or use a phone hotspot. Campus and church Wi-Fi frequently blocks the device discovery Expo relies on.

You try to install Android Studio first

Fix: Start with Expo. It needs no native SDK setup, which matters on an 8GB laptop where a full Android emulator is slow to the point of unusable.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Develop on a physical phone, not only in the emulator. An emulator's fast processor, large screen, precise pointer and wired connection hide the small targets, slow rendering and awkward reach that decide whether an app feels right.

- Remember that flexDirection defaults to column on mobile. It is the reverse of the web, and unlearning the web default is the single most common source of confusion in the first week.

- Wrap overflowing content in a ScrollView with flex 1. Scrolling is not automatic on mobile, so content taller than the screen is simply cut off and unreachable until you do.

- Handle the keyboard and the safe areas early, not as polish. A keyboard covering the field you are typing into makes an app unusable, and content under the status bar or gesture bar looks broken to every user.

## Key termsExpoA framework on React Native that removes native build configuration. Runs on Windows, Linux and macOS, with no Android Studio needed.Expo GoThe app that runs your project on a physical phone over the local network. The fastest and most honest development loop.ViewThe container component, equivalent to a div. Everything is composed from them.TextThe only component that can contain text. Text placed directly in a View does not render.ScrollViewMakes content scrollable. Needs a defined height, in practice flex 1, or it will not scroll.Pressable / TouchableOpacityMakes a component tappable with visual feedback, which a plain View does not provide.Safe area insetsMeasurements for the status bar, notch and gesture bar. What keeps content from sitting underneath them.Keyboard-aware viewA container that shifts or scrolls content when the on-screen keyboard appears. Without it, low fields are hidden.

## Homework before the next session

Get Expo running on your own phone

Create a project, install Expo Go, scan the code, and edit a file to confirm it reloads. If discovery fails, use a phone hotspot.

Build one screen from View and Text

Set every size and spacing yourself, since nothing has a default. Then add enough content to need a ScrollView and make it scroll.

Break the keyboard on purpose and fix it

Put a TextInput near the bottom, tap it, and watch it disappear. Add a keyboard-aware view and confirm the field stays visible.

Compare emulator and real phone

Use your app in the browser simulator and then in your hand. Write down three things the simulator hid — they are usually reach, size and speed.

## Assessment rubric

How this session is marked. The certificate for Mobile App Development is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Toolchain | Gets the project running. | Expo project created and started with no Android Studio, connected to a physical phone through Expo Go over the local network or a hotspot, with save-and-reload confirmed. |
| Components | Renders something on screen. | Screens composed from View and Text with every piece of text inside a Text component, TextInput for entry, and Pressable or TouchableOpacity giving tap feedback. |
| Layout | Positions elements. | Flexbox used with the column default understood, and overflowing content wrapped in a ScrollView with flex 1 and confirmed to reach the bottom. |
| Device realities | App displays correctly. | Safe area insets applied top and bottom, a keyboard-aware view keeping fields visible, and the app used one-handed with reach problems noted. |
| Testing honesty | Checks in the simulator. | The same app compared on a physical phone with what the emulator hid listed, and the working project committed to GitHub. |

## Session questionsWhy Expo rather than plain React Native?+

It removes the native build configuration — Android Studio, SDKs, signing keys — which otherwise consumes a traditional first week. It runs on Windows, Linux and macOS, needs no emulator to start, and works fine on an 8GB laptop, which matters for this course.Do I need an Android phone?+

A physical phone is strongly recommended, because the browser simulator hides exactly the problems that matter: small touch targets, slow rendering, awkward thumb reach and slow data. You can start in the simulator, but you should not finish there.My phone cannot connect to the project. What is wrong?+

Usually the network. The phone and laptop must be on the same network, and campus or church Wi-Fi often blocks the device discovery Expo relies on. A phone hotspot works reliably, because then both are definitely on the same network.Why does my text not appear?+

It is probably directly inside a View. Text must be inside a Text component on mobile, because there is no browser stylesheet and no inherited text styling — everything about text has to be explicit.The bottom of my screen is cut off and I cannot scroll. Why?+

Scrolling is not automatic on mobile. Wrap the content in a ScrollView, and give it a defined height — in practice flex 1 inside a full-height container — or it will not scroll. This is one of the most common first bugs.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Mobile UI Design](https://www.cea.ng/classes/mobile-app-development/mobile-ui-design)[Next session 4: Navigation & Components](https://www.cea.ng/classes/mobile-app-development/navigation-components)

Mobile App Development

4 weeks · 8 sessions · ₦60,000 · you leave with a working app prototype[See the full course](https://www.cea.ng/classes/mobile-app-development)[Enrol now](https://www.cea.ng/admissions)
