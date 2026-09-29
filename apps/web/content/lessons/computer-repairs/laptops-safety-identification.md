---
title: "Session 2: Laptops, Safety & Identification"
description: "Before you open anything you need to work safely and know exactly what you are holding. This session covers electrical safety, static discharge and battery hazards, then how to identify a machine precisely from its model number, read a service manual, and source the right part."
date: "2026-09-12"
class_slug: "computer-repairs"
---

Before you open anything you need to work safely and know exactly what you are holding. This session covers electrical safety, static discharge and battery hazards, then how to identify a machine precisely from its model number, read a service manual, and source the right part.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Work safely around mains power, capacitors and lithium batteries

- Protect components from electrostatic discharge

- Set up a workspace and tool kit for repair work

- Identify a machine exactly from its model and serial numbers

- Find and read a service manual or teardown before starting

- Source the correct part and avoid the wrong one

## The taught content

### Electrical safety: what can actually hurt you

Most computer repair is low-voltage and safe, but three things are not. **Mains power** — never work on a machine that is plugged in, and do not rely on the power switch being off; unplug it. A desktop power supply contains **capacitors** that hold a charge after unplugging and can deliver a genuine shock, so never open a power supply unit unless you know what you are doing; the professional habit is to replace a suspect supply rather than repair it, because a new one costs less than an injury.

The third is the **lithium battery** in a laptop. These store a great deal of energy, and if punctured, bent or shorted they can heat rapidly, swell and in the worst case catch fire. The rules are firm: never use a metal tool to lever a battery out, never continue working on a battery that is swollen — a swollen pack is a hazard and must be removed carefully and disposed of properly, not put back in a drawer — and if a battery is heavily glued in place, use a recommended solvent and patience rather than force.

Beyond injury, there is the risk to the machine. Shorting a connector with a screwdriver while a battery is connected can kill a board instantly. The habit that prevents almost all of it: **unplug the mains, then disconnect the internal battery, before touching anything else**. On a laptop that means the battery connector comes out first, before any other work begins.

### Static discharge: the invisible damage

**Electrostatic discharge** is a small spark you usually cannot feel, and it can damage semiconductor components in a way that does not fail immediately. A board damaged by static may work for weeks and then fail intermittently — which is the worst possible outcome, because the failure appears unrelated to your work and the customer concludes you broke it.

The protection is simple and cheap. An **anti-static wrist strap** clipped to a grounded point keeps you at the same potential as the machine. If you do not have one, **touch an unpainted metal part of the case** before handling components, and keep doing so. Work on a hard surface rather than carpet, which generates charge; do not work in a nylon shirt on a dry day if you can avoid it. Keep components in their **anti-static bags** until the moment you fit them, and handle boards by their edges rather than touching contacts or chips.

Be honest about the risk level: modern components are more resistant than they were, and a great many repairs happen without a strap and nothing goes wrong. But the cost of the precaution is trivial and the cost of intermittent failure is your reputation, so the strap is worth wearing on every job — and it is also a visible signal of professionalism that customers notice.

### Workspace and tool kit

A repair workspace needs four things. **Good light** — a lamp directed into the machine, because a dropped screw or a missed connector is invisible in poor light. **Organisation** — a magnetic mat or a set of small containers, because laptop screws are of several different lengths and driving a long screw into a short hole can crack a board. **Space** to lay a machine open and keep parts in order. And a **clean surface**, because dust is the enemy you will be removing.

The tool kit that covers most work: a **precision screwdriver set** with Phillips PH00, PH0 and PH1 bits plus Torx T5 and T6, which covers nearly every laptop and desktop; a **plastic spudger** and a set of **plastic pry tools** for clips and adhesive, because a metal tool marks a case and can cut a cable; **tweezers** for small connectors; **isopropyl alcohol** at 90% or higher and **lint-free cloths** for cleaning; **compressed air** for dust; and a **multimeter** for power and continuity work from session five onward. Add **thermal paste**, a **CMOS battery** and a **known-good RAM stick and SSD** as diagnostic spares.

The organisation habit matters more than the tools. **Photograph before you disassemble**, and lay screws out in the order you removed them — a magnetic mat with a drawn outline of the machine is the cheapest way to guarantee that every screw goes back into its own hole. Most catastrophic repair outcomes are not diagnostic failures; they are a long screw forced into a short hole.

### Identifying the machine exactly

'It is an HP laptop' is not enough to order a part. You need the **exact model number**, and there are three ways to get it. On the machine itself: a label on the base, under the battery on older laptops, or in the battery compartment. In the firmware: press the manufacturer's key during startup — commonly F1, F2, F10, Del or Esc — to enter BIOS, where the model and serial are displayed. Or in Windows: **System Information** (`msinfo32`) shows the system model, and `wmic csproduct get name, version, identifyingnumber` in a terminal prints them directly.

Distinguish the **model number** from the **serial number** and from the marketing name. 'HP Pavilion 15' is a marketing name covering many different machines with different boards, screens and keyboards. 'HP 15-cs3021nr' is a model. The serial identifies that individual unit for warranty purposes. Parts are ordered against the model, and sometimes against a specific part number printed on the component itself — which is why, for screens, keyboards and batteries, the reliable method is to open the machine and read the number off the part.

This is the single most common source of wasted money in repair work: ordering a part against a marketing name and receiving something that does not fit. Take the time to get the model number, photograph the label, and where possible read the part number off the failed component before ordering.

### Service manuals and sourcing parts

Before opening an unfamiliar machine, find its **service manual** or a **teardown video**. Manufacturers such as Dell, HP and Lenovo publish service manuals listing the disassembly sequence, screw lengths, part numbers and what is removable. Where no manual exists, a teardown video for that exact model shows the sequence and the traps — which screws are hidden under rubber feet or under the keyboard, which clips are fragile, where the display cable runs.

This ten minutes of research prevents almost every bad outcome in disassembly. A technician who opens a machine cold will snap a clip, strip a screw or tear a cable; one who has watched a teardown will know that the keyboard must come off first, that three screws hide under the rubber strip, and that the battery connector is under a plastic cover. The difference in outcome is not skill — it is preparation.

For **sourcing parts**, the reliable order is: the manufacturer's spare parts store using the part number; then a reputable specialist supplier; then a general marketplace, where you must read reviews and check the part number matches exactly. In Nigeria, computer villages and established online vendors carry common parts, but always confirm the model and, for screens, the exact part number and connector type — a screen that fits physically but has a different connector or resolution is a common and expensive mistake.

## Instructor demonstration

The instructor sets up a proper workspace, demonstrates safe battery disconnection and static precautions, then identifies three real machines exactly from their labels and firmware, finds their service manuals and prices the correct parts.

### Set up the workspace

Arrange the light, the magnetic mat and the tool kit. Explain why organisation prevents the long-screw-in-a-short-hole failure that cracks boards.02

### Show the tool kit

Lay out the screwdriver bits, spudger, pry tools, tweezers, alcohol, cloths, air and multimeter. Explain what each is for and why a metal tool damages a case.03

### Demonstrate the safe shutdown sequence

Unplug the mains, then open and disconnect the internal battery first. Explain that this order is the habit that prevents almost all board damage.04

### Show a swollen battery

Explain how to recognise swelling, why it must not be forced or put back in a drawer, and how to dispose of it properly. Emphasise never levering with metal.05

### Demonstrate static precautions

Fit the wrist strap, show the alternative of touching unpainted case metal, and demonstrate handling a board by its edges from an anti-static bag.06

### Identify a machine from its label

Find the base label, read the model and serial, and explain the difference between the marketing name, the model number and the serial.07

### Identify a machine from firmware

Enter BIOS and read the model. Then boot to Windows and run msinfo32 and the wmic command, showing both outputs.08

### Show why the marketing name fails

Search for parts using 'HP Pavilion 15' and show the incompatible results. Repeat with the exact model number and show the correct parts.09

### Find the service manual

Locate the manufacturer's manual for one machine and open the disassembly section, pointing out screw lengths and the sequence.10

### Find a teardown video

Locate a teardown for a machine with no manual and note the traps: hidden screws under rubber feet, fragile clips, the display cable route.11

### Read a part number off a component

Remove a screen or battery and read its part number. Explain that this is the only reliable way to order a matching part.12

### Price the correct part

Compare the manufacturer's spare store, a specialist supplier and a marketplace listing for the same part number, and explain how to verify a listing.

## Guided practice

### Safe setup and exact identification of three machines

You set up a compliant workspace, perform the safe shutdown and static sequence on a laptop, disconnect its battery correctly, then identify three real machines exactly, find a service manual or teardown for each, and source one correct part with its part number verified.

1. 01Set up light, a magnetic mat or containers, and lay out your tool kit.

2. 02Unplug the mains from a desktop and explain the capacitor risk in a power supply.

3. 03Perform the safe sequence on a laptop: unplug, open, disconnect the battery first.

4. 04Fit an anti-static wrist strap, or demonstrate the case-touch alternative.

5. 05Handle a board by its edges from an anti-static bag and describe correct handling.

6. 06Identify machine one from its base label, recording model and serial.

7. 07Identify machine two from BIOS, recording what the firmware reports.

8. 08Identify machine three using msinfo32 and the wmic command in Windows.

9. 09Explain in writing why a marketing name is not sufficient to order a part.

10. 10Find a service manual for one machine and note the disassembly sequence and screw lengths.

11. 11Find a teardown video for a second machine and list three traps it reveals.

12. 12Remove one component and read its part number directly.

13. 13Source that part from two suppliers, verify the part number matches exactly, and record both prices.

The standard we hold you to

A workspace with light and screw organisation, the safe shutdown and static sequence performed correctly with the battery disconnected first, all three machines identified by exact model number through two different methods each, a manual or teardown found with traps noted, and one part sourced with its part number verified against the physical component.

## Common mistakes and how to fix them

You worked on a machine that was still plugged in

Fix: Unplug the mains before anything else, and do not trust the power switch. On a laptop, disconnect the internal battery before touching any other component.

You opened a power supply to repair it

Fix: Do not. Its capacitors hold a charge after unplugging. Replace a suspect supply instead — a new one costs less than an injury.

You levered a glued battery out with a metal tool

Fix: Use a plastic pry tool and a recommended solvent, with patience. Puncturing or bending a lithium cell can cause it to heat rapidly and catch fire.

You put a swollen battery back in a drawer

Fix: A swollen pack is a fire hazard. Remove it carefully and dispose of it properly at a collection point. Never store it and never refit it.

You ordered a part against the marketing name

Fix: Use the exact model number, and for screens, keyboards and batteries read the part number off the failed component. 'HP Pavilion 15' covers many incompatible machines.

You opened an unfamiliar machine without research

Fix: Find the service manual or a teardown video first. Ten minutes of preparation prevents the snapped clip, the stripped screw and the torn cable.

Your laptop screws went back into the wrong holes

Fix: Lay screws out in removal order on a magnetic mat and photograph first. A long screw driven into a short hole can crack the board, which is a repair failure no diagnosis would have predicted.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Disconnect the internal battery before touching anything else inside a laptop, on every single job, without exception. It is the one habit that prevents the largest category of catastrophic repair outcomes, and it costs ten seconds.

- Photograph the machine, the screw layout and every connector before disassembly. It is the cheapest insurance in this trade and it is what lets you rebuild confidently at the end of a long day when you cannot remember which screw went where.

- Read the part number off the failed component for screens, keyboards, batteries and cables. Ordering against a model number alone is usually fine; ordering against a marketing name is how you end up with a part that fits physically but has the wrong connector.

- Wear the wrist strap even when it feels unnecessary. Modern components are fairly resistant, but intermittent static failure appears weeks later and looks like an unrelated fault — which the customer will attribute to you.

## Key termsElectrostatic discharge (ESD)A small spark that can damage semiconductors, often causing failure weeks later. Prevented by a wrist strap or touching case metal.CapacitorA component that stores charge. Power supplies hold charge after unplugging, which is why they are replaced rather than repaired.Model numberThe exact identifier parts are ordered against, such as HP 15-cs3021nr. Distinct from the marketing name and the serial.Serial numberThe identifier of one individual unit, used for warranty. Not what parts are ordered against.Part numberThe number printed on a component itself. The most reliable basis for ordering a screen, keyboard or battery.Service manualThe manufacturer's document giving disassembly sequence, screw lengths and part numbers. Read it before opening.SpudgerA plastic tool for separating clips and adhesive without marking a case or cutting a cable.Swollen batteryA lithium pack that has expanded. A fire hazard — remove carefully, dispose of properly, never refit.

## Homework before the next session

Assemble your tool kit

Get the precision screwdriver set, spudger, tweezers, alcohol, cloths, air and a wrist strap. Add thermal paste and a CMOS battery as spares.

Identify three machines two ways each

For each machine, get the model number from a physical label and from firmware or Windows. Note where they disagree and why.

Find three service manuals

Locate manuals for three common laptop models and read the disassembly sections. Note how screw lengths are specified.

Price one part from three sources

Take a real part number and compare the manufacturer's store, a specialist supplier and a marketplace. Note how you verified each listing.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Safety | Works without obvious danger. | Mains disconnected first, internal battery disconnected before any other work, swollen batteries handled correctly, power supplies never opened. |
| Static discipline | Is aware of ESD. | Wrist strap worn or the case-touch alternative used, boards handled by edges from anti-static bags, work done off carpet. |
| Workspace | Has the basic tools. | Good light, magnetic mat or containers with screws in removal order, photographs taken before disassembly. |
| Identification | Can find a model number. | All three machines identified exactly through two methods each, with the model, serial and marketing-name distinction clearly explained. |
| Preparation and sourcing | Can order a part. | Service manual or teardown consulted with traps listed, part number read off the component, and a part sourced with the number verified. |

## Session questionsDo I really need an anti-static wrist strap?+

It costs very little and prevents damage that appears weeks later as an intermittent fault, which the customer will blame on you. Touching unpainted case metal before handling components is an acceptable alternative, but the strap is the professional standard and customers notice it.Can I repair a laptop power supply or a desktop PSU?+

Replace them, do not repair them. Both contain capacitors that hold a charge after unplugging, and a replacement costs far less than an injury or a board destroyed by a failing supply.How do I find a service manual for an obscure laptop?+

Search the exact model number plus 'service manual' or 'maintenance manual' on the manufacturer's site. Dell, HP and Lenovo publish most of theirs. If none exists, search the model plus 'disassembly' or 'teardown' for a video — that is usually enough.My battery is glued in and will not come out. What do I do?+

Use a recommended adhesive solvent and a plastic pry tool, working slowly around the edges. Never use a metal tool and never force it. If the pack is swollen, stop and treat it as a hazard rather than a repair problem.How do I avoid buying the wrong screen?+

Remove the old panel and read its part number, then match it exactly — not just size and resolution, but the connector type and pin count. A panel that fits the lid but has a different connector is a very common and expensive mistake.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Inside the Machine](https://www.cea.ng/classes/computer-repairs/inside-the-machine)[Next session 3: Disassembly & Cleaning](https://www.cea.ng/classes/computer-repairs/disassembly-and-cleaning)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
