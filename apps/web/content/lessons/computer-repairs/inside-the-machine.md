---
title: "Session 1: Inside the Machine"
description: "You cannot diagnose what you cannot picture. This session opens a real machine and names every component, explains what each one actually does and how they depend on each other, then teaches the mental model that turns a list of symptoms into a probable cause."
date: "2026-09-12"
class_slug: "computer-repairs"
---

You cannot diagnose what you cannot picture. This session opens a real machine and names every component, explains what each one actually does and how they depend on each other, then teaches the mental model that turns a list of symptoms into a probable cause.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Identify every major component inside a desktop and a laptop by sight

- Explain what each component does and what fails when it dies

- Describe how components depend on each other during startup

- Explain what RAM, storage and the CPU each contribute to speed

- Read a specification sheet and say what it means for real use

- Use the dependency model to narrow a fault before touching a screwdriver

## The taught content

### The machine as a system, not a box of parts

A computer is not a collection of independent components; it is a chain where each link depends on the one before it. The **power supply** converts mains electricity to the low voltages the board needs. The **motherboard** distributes power and carries the signals between everything. The **CPU** executes instructions. **RAM** holds what the CPU is working on right now, and loses it when power goes. **Storage** — an SSD or a hard drive — holds the operating system and your files permanently. The **GPU** draws what you see. And **BIOS/UEFI** is the small firmware that runs first, checks the hardware, and hands over to the operating system.

That chain is why diagnosis works at all. If the power supply is dead, nothing else matters — no lights, no fans. If the motherboard is dead, you may get fans spinning but no display. If RAM is faulty, the machine may power on and then beep or restart endlessly. If storage has failed, the machine starts fine, the fans run, the logo appears, and then it cannot find an operating system. Each failure has a signature, and the signature tells you where in the chain to look.

This is the single most valuable idea in this course: **symptoms point to positions in the chain**. Beginners open a machine and start swapping parts at random. Technicians look at the symptom, place it in the chain, and go to the most likely link first. That difference is what makes a diagnosis take ten minutes instead of three hours.

### The motherboard: the thing everything hangs off

The motherboard is a printed circuit board carrying the **CPU socket**, the **RAM slots**, the **storage connectors** (SATA for older drives, M.2 slots for modern NVMe SSDs), the **power connectors**, the **expansion slots**, and the **rear I/O** — the USB ports, network socket and audio jacks you plug things into. It also carries the **chipset**, which manages traffic between the CPU and everything slower.

Two features on it matter constantly in repair work. The **CMOS battery** — a small coin cell — keeps the BIOS settings and the system clock alive when the machine is unplugged. When it goes flat, a machine forgets its boot order and shows the wrong date and time, often with a 'CMOS checksum error' or 'date/time not set' message on startup. That is a five-minute fix with a battery that costs a few hundred naira, and it is one of the most commonly misdiagnosed faults by people who do not know it exists.

The other is the **front panel header** — the small pin block where the case's power button, reset button and indicator LEDs connect. It is fiddly, its pinout varies by manufacturer, and getting it wrong is why a machine sometimes will not power on after a rebuild even though every component is fine. Photograph it before you disconnect it, every time.

### CPU, RAM and storage: what actually makes a machine fast

The **CPU** executes instructions, and its speed matters — but for the work most Nigerian users complain about, it is rarely the bottleneck. A ten-year-old CPU still handles browsing, Office and video calls comfortably. **RAM** holds what is open right now; when it fills, the operating system starts using storage as overflow, which is dramatically slower, and the machine becomes unusable. Eight gigabytes is the practical minimum in 2026; four gigabytes is genuinely painful, and upgrading it is the cheapest large improvement available.

**Storage** is where the biggest single gain lives. A mechanical hard drive has a spinning platter and a moving head; an **SSD** has no moving parts and accesses data electronically. The difference is not incremental — it is the difference between a machine that boots in ninety seconds and one that boots in fifteen, and between launching a program in eight seconds and under one. Replacing a hard drive with a SATA SSD is the most cost-effective repair in this entire trade, and it is the recommendation you will make most often.

The combination that matters: a machine that feels slow usually needs **more RAM and an SSD**, not a new computer. Diagnosing that correctly — and saying so honestly when the machine is genuinely fine — is what builds a reputation. The opposite, telling every customer they need a new laptop, works once and destroys trust permanently.

### Laptops and desktops: what differs and why it matters

A laptop contains the same components as a desktop, arranged differently and constrained by heat and space. The CPU and GPU are usually soldered to the board rather than socketed, which means they cannot be replaced — a dead CPU on a laptop is a dead board. RAM may be on removable **SO-DIMM** sticks or soldered; storage is usually an M.2 SSD or, on older machines, a 2.5-inch drive in a caddy. The **battery**, the **screen assembly**, the **keyboard** and the **hinges** are all failure points that do not exist on a desktop, and together they account for most laptop repair work.

The consequence for repair work is significant. On a desktop, almost everything is replaceable individually and cheaply. On a laptop, you must check what is actually serviceable on that specific model **before you quote**, because a customer told 'we will replace your RAM' on a machine with soldered RAM has been given a promise that cannot be kept. Look up the model's service manual or a teardown video before committing.

Heat is the other laptop-specific reality. A laptop's cooling is a small fan and a heat pipe with a limited margin, and dust blocks it. A machine that is slow, loud and hot is very often simply clogged — the CPU reduces its own speed to avoid damage, a behaviour called **thermal throttling**, which presents as mysterious slowness. Cleaning the fan and replacing the dried thermal paste routinely restores a machine that a customer believed was dying.

### Reading a specification sheet

A specification tells you what a machine can do, and reading one is a real skill. **CPU** is described by family, generation and suffix: 'Intel Core i5-8250U' means an i5, eighth generation, and the 'U' suffix means a low-power chip designed for battery life rather than performance. An AMD 'Ryzen 5 5500U' follows the same logic. Generation matters more than the i3/i5/i7 label — an eighth-generation i5 will usually beat a fifth-generation i7, and customers routinely get this wrong when buying used.

**RAM** is stated as capacity, type and speed: '8GB DDR4-2400'. Capacity is what matters most; the type must match what the board accepts, because DDR3, DDR4 and DDR5 are physically incompatible and will not fit. **Storage** is stated as capacity and type: '256GB NVMe SSD' is fast; '1TB 5400RPM HDD' is slow and large. **Display** is stated as size, resolution and panel type: a 1920×1080 IPS panel is far more pleasant than a 1366×768 TN panel of the same size, and the difference is immediately visible.

Learn to translate these into real use, because that is what customers are actually asking. 'Will this run my work?' means: at least 8GB of RAM, an SSD rather than a hard drive, and a CPU from roughly the eighth generation onward. That description covers browsing with many tabs, Microsoft Office, video calls and light design work — which is what almost everyone means.

## Instructor demonstration

The instructor opens a desktop and a laptop side by side, names every component as it is exposed, swaps a CMOS battery, compares a hard drive with an SSD, and works through four symptoms placing each in the dependency chain.

### Open the desktop

Remove the side panel and orient the board. Name the CPU socket, RAM slots, storage connectors, power connectors, expansion slots and rear I/O in sequence.02

### Trace the power path

Follow the mains lead to the power supply, then the 24-pin board connector and the CPU power connector. Explain that if this chain fails, nothing else matters.03

### Identify the storage types

Show a SATA hard drive and cable beside an M.2 NVMe SSD. Explain the physical and speed difference, and why the SSD swap is the most common recommendation.04

### Remove and read the RAM

Release the clips, remove a stick, and read the label: capacity, type and speed. Explain that DDR3, DDR4 and DDR5 are physically incompatible.05

### Find and replace the CMOS battery

Locate the coin cell, remove it, fit a new one, and explain the symptoms of a flat one — wrong date and time, forgotten boot order, a checksum error on startup.06

### Photograph the front panel header

Show the pin block for the power button and LEDs, photograph it, and explain why getting it wrong leaves a machine that will not power on after a rebuild.07

### Open the laptop

Remove the base cover and compare the layout with the desktop. Point out the fan and heat pipe, the SO-DIMM slots and the M.2 slot.08

### Show what is soldered

Identify a soldered CPU and soldered RAM on a thin machine. Explain that this is why you must check the service manual before quoting a RAM upgrade.09

### Show the battery and screen assembly

Point out the battery, the display cable routing through the hinge, and the keyboard. Explain that these account for most laptop repair work.10

### Read three real specification sheets

Take three real laptops and translate each into plain terms: what generation the CPU is, whether the storage is an SSD, and what it can realistically do.11

### Compare a hard drive with an SSD

Boot the same machine from each and time it. Show the difference and explain why this is the cheapest large improvement in the trade.12

### Work through four symptoms

No power at all; fans spin but no display; powers on then restarts repeatedly; starts normally but cannot find an operating system. Place each in the dependency chain and name the first component to check.

## Guided practice

### Strip, identify, and diagnose from symptoms

You open a desktop and a laptop, label every component from memory, replace a CMOS battery and a RAM stick correctly, then place eight written symptoms into the dependency chain with the first component to check for each.

1. 01Photograph the desktop before opening it, then remove the side panel.

2. 02Label every major component on your photograph: CPU, RAM, storage, power supply, board, GPU, CMOS battery, front panel header.

3. 03Trace the power path from the mains lead to the board connectors and describe it in writing.

4. 04Remove a RAM stick, read its label, and record capacity, type and speed.

5. 05Refit the RAM correctly, noting how it only fits one way round.

6. 06Locate and replace the CMOS battery, recording the symptoms a flat one causes.

7. 07Photograph the front panel header before disconnecting anything.

8. 08Open the laptop and label its components, marking which are soldered and which are removable.

9. 09Identify the fan, heat pipe, battery, display cable and keyboard.

10. 10Read three real specification sheets and translate each into what the machine can realistically do.

11. 11Take eight written symptoms and place each in the dependency chain.

12. 12For each symptom, name the first component you would check and one sentence on why.

The standard we hold you to

Every component correctly labelled on both machines, RAM and CMOS battery handled correctly, soldered versus removable parts correctly identified on the laptop, three specifications translated into plain terms, and all eight symptoms correctly placed in the chain with a justified first component for each.

## Common mistakes and how to fix them

You start swapping parts before locating the fault in the chain

Fix: Place the symptom in the chain first. No power means the supply or board; fans with no display means board, RAM or GPU; booting but no operating system means storage. Random swapping takes hours and teaches nothing.

You quoted a RAM upgrade on a machine with soldered RAM

Fix: Check the service manual or a teardown video for that exact model before quoting. A promise that cannot be kept destroys trust faster than anything else in this trade.

You told a customer with a slow machine to buy a new one

Fix: Check RAM capacity and whether storage is a hard drive first. Most slow machines need 8GB or more and an SSD, not replacement. Recommending a purchase they do not need works once and ruins your reputation.

You did not photograph the front panel header

Fix: Photograph every connector before disconnecting it. Pinouts vary by manufacturer and getting it wrong leaves a machine that will not power on, with every component actually working.

You forced a RAM stick the wrong way round

Fix: The notch is offset so it only fits one way. If it needs force, it is the wrong way round or the wrong type — DDR3, DDR4 and DDR5 are physically incompatible.

You dismissed a wrong-date-and-time fault as software

Fix: Check the CMOS battery. A flat coin cell resets the clock and the boot order and produces a checksum error on startup. It is a few hundred naira and five minutes.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Learn the dependency chain so well that you recite it: power, board, CPU, RAM, storage, display. Almost every fault you will meet sits at one of those points, and knowing the order tells you where to start without touching a screwdriver.

- Photograph every connector and every screw position before you remove anything, on every job. It costs ten seconds and it is the difference between a confident rebuild and an hour of guessing at the end of a long day.

- Keep a spare CR2032 CMOS battery, a known-good RAM stick and a known-good SSD in your kit. Substituting a known-good part is the fastest diagnostic there is, and it settles an argument with a customer in seconds.

- Recommend the SSD-and-RAM upgrade honestly, including when the machine does not need it. Customers talk, and the technician who says 'your machine is fine, the problem is elsewhere' is the one who gets called back.

## Key termsMotherboardThe main circuit board carrying the CPU socket, RAM slots, storage connectors and power distribution.CMOS batteryA coin cell keeping BIOS settings and the clock alive when unplugged. A flat one causes wrong time and forgotten boot order.SO-DIMMThe smaller RAM module used in laptops, as opposed to the full-size DIMM in desktops.NVMe / M.2The modern fast SSD format plugging directly into the board, replacing SATA cables for most new machines.SATAThe older storage interface using a data cable and a power cable, still common on 2.5-inch drives.Thermal throttlingA CPU deliberately slowing itself to avoid overheating. Presents as mysterious slowness in a dusty laptop.Front panel headerThe pin block connecting the case power button, reset and LEDs. Photograph it before disconnecting.BIOS / UEFIThe firmware that runs first, checks hardware and hands over to the operating system.

## Homework before the next session

Label every component from memory

Photograph a machine's internals and label every component without looking anything up. Then check your labels and correct them. Repeat until you need no reference.

Translate five specification sheets

Take five real laptops — from a shop or a marketplace listing — and translate each into what it can realistically do, in plain language a customer would understand.

Time a hard drive against an SSD

Boot the same machine from each and record the times. This is the evidence you will use with every customer who asks whether an SSD is worth it.

Place ten symptoms in the chain

Write ten symptoms you have seen or read about, place each in the dependency chain, and name the first component to check. Bring them to the next session.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Component identification | Names the main components. | Labels every component on both a desktop and a laptop from memory, including the CMOS battery and front panel header. |
| System understanding | Knows what parts do. | Explains the dependency chain and can state what fails when each link breaks. |
| Hands-on handling | Can remove and refit parts. | RAM fitted the correct way round, CMOS battery replaced, connectors photographed before disconnection. |
| Specification literacy | Reads capacity figures. | Reads CPU generation and suffix, RAM type, storage type and panel type, and translates each into real-world capability. |
| Diagnostic reasoning | Can guess at a cause. | Places all eight symptoms correctly in the chain with a justified first component for each, before touching a screwdriver. |

## Session questionsDo I need expensive tools to start?+

No. A good precision screwdriver set, an anti-static wrist strap, a plastic spudger, isopropyl alcohol and a can of compressed air are enough for most laptop and desktop work. Add a multimeter when you reach power diagnosis in session five.Is computer repair still a viable business with phones everywhere?+

Yes, and demand is steady. Businesses, schools and individuals all run Windows machines, and the common failures — dust, flat batteries, failing hard drives, insufficient RAM — are constant. The SSD-and-RAM upgrade alone is a large and recurring market in Nigeria.How do I know if a laptop's RAM is upgradeable?+

Look up the exact model's service manual or a teardown video before quoting. Some machines have SO-DIMM slots, some have one slot plus soldered memory, and thin machines are often fully soldered. Never promise an upgrade you have not confirmed.What is the single most cost-effective repair?+

Replacing a mechanical hard drive with a SATA SSD. It typically takes a machine from a ninety-second boot to fifteen seconds and makes everything else feel faster too, for a modest parts cost. It is the recommendation you will make most often.Can a dead laptop CPU be replaced?+

Almost never. Laptop CPUs are soldered to the board on nearly all modern machines, so a failed CPU means a replacement board, which is often uneconomic. This is why diagnosis matters — you must know whether the fault is worth repairing before you quote.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Laptops, Safety & Identification](https://www.cea.ng/classes/computer-repairs/laptops-safety-identification)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
