---
title: "Session 5: Power, Display & Heat Faults"
description: "The three hardware fault families that make up most physical repair work: a machine that will not power on, a screen that does not display correctly, and a machine that overheats or shuts down. This session covers systematic diagnosis of each, using a multimeter, and knowing when a repair stops being economic."
date: "2026-09-12"
class_slug: "computer-repairs"
---

The three hardware fault families that make up most physical repair work: a machine that will not power on, a screen that does not display correctly, and a machine that overheats or shuts down. This session covers systematic diagnosis of each, using a multimeter, and knowing when a repair stops being economic.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Diagnose a no-power fault systematically from the mains inward

- Test a power adapter and a charging circuit with a multimeter

- Identify display faults and distinguish panel, cable and GPU failures

- Diagnose overheating and random shutdown correctly

- Use a multimeter for continuity, voltage and battery testing

- Judge when a repair is uneconomic and say so honestly

## The taught content

### No power: working from the outside in

A machine that shows no sign of life has a fault somewhere in a short chain, and you work along it from the easiest point. **Is the wall socket live?** Test it with something else — this is embarrassing to overlook and it happens constantly. **Is the adapter working?** A laptop adapter should output its rated voltage, commonly 19 or 19.5 volts, measured with a multimeter on the DC setting; zero or a wildly wrong figure means a dead adapter, which is a cheap fix. **Is the cable damaged?** Check the whole length, especially at the strain reliefs near the plug and the connector, where internal breaks are common and invisible.

Then the machine itself. On a desktop, check the **power supply's own switch** at the back, which people routinely leave off, and the **24-pin and CPU power connectors** on the board, which come loose. A useful test is the **paperclip test** on a suspect supply — bridging the green wire to a black one makes it run without a board — though this is a diagnostic, not a repair. On a laptop, check the **charging port** for a loose or broken centre pin, and try booting with the battery removed and only the adapter connected, which isolates a battery that is preventing startup.

If power reaches the board and still nothing happens — no fan, no LED — the fault is usually the board itself or a short somewhere on it. That is the point at which you consider whether the repair is economic, and section five covers how to make that judgement honestly.

### Using the multimeter, which is easier than it looks

A multimeter does three things you need constantly. **DC voltage** measures what a power source is outputting — set the dial to a DC range above the expected voltage, black probe to the negative or ground, red to the positive, and read. A laptop adapter should read its rated voltage; a car battery reads about 12.6; a CMOS battery reads about 3. **Continuity** tests whether a path is unbroken — the meter beeps when the probes are connected through a continuous conductor. Use it to check a cable, a fuse, and whether a switch actually closes.

**Resistance** measures opposition to flow, and it is how you test a battery's health indirectly and check for shorts. A very low resistance between a power rail and ground suggests a short circuit, which is a serious board fault.

The habits that keep you safe: never measure resistance or continuity on a live circuit; never use a current setting when you mean voltage; and start on a higher range than you expect and work down. A multimeter is not dangerous on the low-voltage circuits inside a computer, but treating it carelessly is how people damage the meter or get a surprise from a power supply that is still connected to mains.

### Display faults: panel, cable or GPU

A bad display has three possible causes and the diagnosis distinguishes them. **Connect the laptop to an external monitor** first — this one test splits the problem in half. If the external display works correctly while the laptop's own screen is faulty, the fault is the **panel or its cable**, not the graphics hardware. If both are faulty, the problem is the GPU or the board, which is usually uneconomic to repair.

A **failed panel** shows as a cracked screen, lines, dead areas, or a completely black screen with a faint image visible under a torch — which indicates the backlight has failed rather than the panel. A **failing display cable** shows as flickering, distortion, or a display that changes when you move the lid, because the cable runs through the hinge and fatigues there. That last symptom is diagnostic: if the picture changes with lid position, it is almost certainly the cable, and it is a cheap, common repair.

A **backlight failure** produces a screen that looks dead but shows a very faint image under bright light. It is worth checking with a torch before condemning a panel, because the fix may be a backlight circuit rather than a whole screen. And note that after any screen replacement you must verify the **resolution and connector match** — a panel that fits physically but reports the wrong resolution is the wrong part.

### Heat and random shutdown

A machine that shuts down under load, or that becomes too hot to keep on a lap, is protecting itself. The CPU has a thermal limit, commonly around 95–100°C, and when it reaches it the machine cuts power immediately to prevent damage. That is what a random shutdown under load usually is, and it is a symptom rather than a mystery.

The causes, in order of likelihood: **dust-blocked cooling**, which session three covers and which is by far the most common; **dried thermal paste**; a **failed fan** that spins erratically or not at all; and, rarely, a genuine heatsink mounting problem. Diagnose by measuring: run a temperature tool, watch the figure under load, and listen to the fan. A machine that idles at 85°C has a cooling problem, not a software one.

Distinguish this from **battery-related shutdown**. A machine that dies suddenly at a reported 30% charge has a degraded battery whose reported capacity no longer matches reality — the operating system thinks there is charge left and the cell cannot deliver it. That is a battery replacement, not a thermal fault, and the two are confused often enough that it is worth checking the battery report Windows can generate before opening the machine.

### When a repair stops being worth doing

Part of being a technician is knowing when not to repair. A board-level fault on a laptop — a dead CPU, a failed GPU, a cracked board — usually costs more in parts and labour than the machine is worth, particularly on a mid-range machine that is several years old. Fitting a replacement board often approaches the price of a comparable used machine, and it carries no warranty on the rest of the hardware.

Make the judgement out loud and show your working: what the part costs, what the labour is, what the machine is worth, and what the alternatives are. Then let the customer decide with real information. This is where honesty earns its keep — a technician who says 'this is not worth repairing, and here is why, and here is what I would buy instead' is trusted for life, and that customer sends everyone they know. A technician who repairs a dead machine for a large fee gets paid once and talked about badly forever.

There is also a data-recovery dimension. A machine that is beyond repair may still hold files the customer desperately needs, and recovering them — by removing the drive and reading it in another machine or through a USB adapter — is often the real service, and it is worth more to the customer than the repair would have been. Always ask what is on the machine before you conclude anything.

## Instructor demonstration

The instructor works through four real faults — a dead adapter, a display that fails only when the lid moves, a machine shutting down under load, and a board-level failure — measuring with a multimeter and showing the economic judgement on the last one.

### Start with the simplest cause

Test the wall socket with another device and check the power supply's rear switch. Explain how often the fault is outside the machine entirely.02

### Measure an adapter with the multimeter

Set DC voltage, measure the output against the rating on the label, and show a dead adapter reading zero beside a working one at 19.5V.03

### Test cable continuity

Use the continuity setting along an adapter cable and find an internal break near the strain relief. Explain why these failures are invisible from outside.04

### Inspect a charging port

Show a loose and a broken centre pin, and explain why a wobbly connector produces intermittent charging that looks like a board fault.05

### Try booting without the battery

Remove the battery and run on adapter only. Explain how this isolates a battery that is preventing startup from a genuine power fault.06

### Diagnose a display with an external monitor

Connect an external display and show it working while the laptop panel fails. Explain that this single test splits panel faults from GPU faults.07

### Demonstrate the lid-movement test

Move the lid on a machine with a fatigued display cable and show the picture changing. Explain that this symptom is diagnostic of the cable.08

### Check for a backlight failure

Shine a torch at an angle on a screen that appears dead and reveal a faint image. Explain that this indicates backlight rather than panel failure.09

### Measure temperatures under load

Run a load and watch the CPU temperature climb toward the thermal limit, then show the shutdown. Explain that this is protection, not a mystery.10

### Generate the Windows battery report

Run the battery report command and compare design capacity with full charge capacity. Explain how this distinguishes a degraded battery from a thermal fault.11

### Assess a board-level failure

Show a machine with a dead board, price the replacement against the machine's value, and walk through the alternatives out loud.12

### Recover the data instead

Remove the drive from the dead machine, connect it through a USB adapter, and copy the customer's files. Explain that this is often the real service.

## Guided practice

### Diagnose four fault families systematically

You work through a no-power fault, a display fault, an overheating fault and a battery fault on real or simulated machines, using a multimeter and the diagnostic tests from this session, and write up each diagnosis with the evidence that supports it.

1. 01Verify the wall socket and the power supply's rear switch before opening anything.

2. 02Measure a laptop adapter's output with the multimeter on DC voltage and compare with its rating.

3. 03Test an adapter cable for continuity and locate any internal break.

4. 04Inspect a charging port for looseness or a damaged centre pin.

5. 05Attempt a boot with the battery removed on adapter only, and record what it isolates.

6. 06Connect an external monitor to a faulty-display machine and record what the result tells you.

7. 07Perform the lid-movement test and state whether the fault is panel, cable or GPU.

8. 08Check a dead-looking screen with a torch at an angle for a faint image.

9. 09Measure idle and load CPU temperature and record whether thermal shutdown occurs.

10. 10Generate and read the Windows battery report, comparing design with full-charge capacity.

11. 11For a board-level fault, price the repair against the machine's value and list the alternatives.

12. 12Remove the drive from an uneconomic machine and recover the data through a USB adapter.

13. 13Write up all four diagnoses with the evidence supporting each conclusion.

The standard we hold you to

Each of the four faults diagnosed by systematic test rather than by part swapping, multimeter measurements recorded for the power faults, the external-monitor and lid-movement tests used for the display fault, temperature and battery report evidence for the shutdown fault, and an honest written economic assessment with a data-recovery option for the board-level failure.

## Common mistakes and how to fix them

You opened the machine before checking the socket and the adapter

Fix: Work from the outside in. The fault is frequently the wall socket, the adapter, the cable or the rear power switch — all of which take a minute to check and none of which need a screwdriver.

You measured resistance on a live circuit

Fix: Never. Resistance and continuity are measured on dead circuits only, and voltage on live ones. Starting on a higher range than expected and working down protects the meter.

You condemned a screen without testing an external monitor

Fix: The external monitor test splits panel faults from GPU faults in one step. Skipping it means you may replace a panel on a machine whose GPU is actually dead.

You replaced a panel that only had a backlight fault

Fix: Check for a faint image under a torch first. A screen that looks completely dead may have a working panel and a failed backlight, which is a different and cheaper repair.

You treated a random shutdown as a software problem

Fix: Measure the temperature under load. A shutdown at the thermal limit is hardware protection, and it will keep happening however many times you reinstall the operating system.

You confused a degraded battery with overheating

Fix: Generate the Windows battery report and compare design with full-charge capacity. A machine dying at a reported 30% has a battery whose real capacity no longer matches what the system believes.

You repaired a machine that was not worth repairing

Fix: Price the part and labour against the machine's value and say it out loud. A large fee for a dead machine gets you paid once and talked about badly forever.

You scrapped a dead machine without asking about the data

Fix: Always ask what is on the machine. Recovering the files is often worth more to the customer than the repair would have been, and it is a service you can still provide.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Always start with the cheapest and simplest check, even when you are confident it is not the cause. The wall socket, the rear switch and the adapter take two minutes together, and finding the fault there saves an hour and looks like competence rather than luck.

- Carry a multimeter and use it on every power job. It converts 'I think the adapter is dead' into 'the adapter outputs zero volts', which settles the conversation with the customer in one sentence and justifies the part.

- Connect an external monitor before diagnosing any display fault. It is the single highest-value test in this session and it takes fifteen seconds.

- Always ask what data is on a machine before you declare it uneconomic. Recovering files from a dead machine through a USB adapter is frequently the service the customer actually needed, and it turns a lost job into a grateful referral.

## Key termsMultimeterThe instrument measuring voltage, resistance and continuity. The core diagnostic tool for power faults.Continuity testChecking whether a path is unbroken — the meter beeps on a continuous conductor. Used on cables, fuses and switches.Thermal shutdownThe machine cutting power at the CPU's thermal limit to prevent damage. A symptom of a cooling fault, not a mystery.Backlight failureA screen that appears dead but shows a faint image under a torch. Different from a failed panel.Display cable fatigueDamage to the cable running through the hinge, diagnosed by the picture changing with lid position.Battery reportThe Windows-generated comparison of design capacity with full-charge capacity, revealing battery degradation.Board-level faultA failure of the motherboard itself, usually uneconomic to repair on a mid-range laptop.Data recoveryRetrieving files from a dead machine by reading its drive elsewhere. Often the real service a customer needs.

## Homework before the next session

Practise the multimeter

Measure three adapters' outputs, test three cables for continuity, and check a CMOS battery's voltage. Repeat until setting the dial is automatic.

Run the external monitor test

Connect an external display to any laptop and observe how the output behaves. Practise until the test is reflex, because it splits most display diagnoses instantly.

Generate a battery report

Run the Windows battery report on a real machine and read the design versus full-charge capacity. Note the degradation percentage and what it means for runtime.

Write an uneconomic-repair conversation

Script what you would say to a customer whose machine is not worth repairing: the part cost, the labour, the machine's value, the alternatives, and the data-recovery offer.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Systematic method | Reaches a diagnosis. | Works from the simplest external cause inward, never swapping parts before a test points to them. |
| Multimeter use | Can measure voltage. | Correct settings chosen, adapter output compared with its rating, continuity used to locate a cable break, and no measurement taken on a live circuit in the wrong mode. |
| Display diagnosis | Identifies a screen problem. | External monitor test used first, lid-movement test applied, torch check for backlight failure, and panel versus cable versus GPU correctly distinguished. |
| Thermal diagnosis | Recognises overheating. | Temperatures measured at idle and under load, thermal shutdown explained as protection, and the battery report used to rule out a degraded cell. |
| Judgement | Completes the repair. | Prices the repair against the machine's value, presents alternatives, asks about the data, and offers recovery where the repair is uneconomic. |

## Session questionsDo I really need a multimeter?+

Yes, and it is inexpensive. It converts a guess into a measurement, which settles arguments with customers, prevents you replacing working parts, and is the difference between a technician and someone who swaps components until something works.How do I know if a laptop adapter is dead?+

Measure its output on DC voltage and compare with the rating printed on it — commonly 19 or 19.5 volts. Zero or a figure far off the rating means it is dead. Also test the cable for continuity, because internal breaks near the strain relief are common.My screen flickers when I move the lid. What is it?+

Almost certainly the display cable, which runs through the hinge and fatigues there. That symptom is genuinely diagnostic, and it is a cheap repair compared with a panel replacement.When should I tell a customer a repair is not worth it?+

When the part and labour approach or exceed the machine's value — typically a board-level fault on a mid-range laptop several years old. Show the arithmetic, present the alternatives, and offer to recover the data. That conversation builds more trust than any repair you complete.Can I recover data from a laptop that will not turn on?+

Usually yes, if the storage itself is healthy. Remove the drive and read it in another machine or through a USB adapter. This is often what the customer actually needs, and it is why you should always ask about the data before concluding a machine is finished.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Upgrades: RAM & Storage](https://www.cea.ng/classes/computer-repairs/upgrades-ram-storage)[Next session 6: Storage, Memory & Boot Faults](https://www.cea.ng/classes/computer-repairs/storage-memory-boot-faults)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
