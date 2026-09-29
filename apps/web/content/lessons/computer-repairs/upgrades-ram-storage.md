---
title: "Session 4: Upgrades: RAM & Storage"
description: "The upgrade work that makes up most paid jobs: more RAM, a hard drive replaced with an SSD, and migrating a customer's Windows installation without reinstalling it. This session covers compatibility, the physical work, cloning, and how to verify an upgrade actually delivered what you promised."
date: "2026-09-12"
class_slug: "computer-repairs"
---

The upgrade work that makes up most paid jobs: more RAM, a hard drive replaced with an SSD, and migrating a customer's Windows installation without reinstalling it. This session covers compatibility, the physical work, cloning, and how to verify an upgrade actually delivered what you promised.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Determine exactly what RAM and storage a specific machine can take

- Fit SO-DIMM and M.2 components correctly and safely

- Explain the real performance gain from each upgrade honestly

- Clone a Windows installation to a new SSD without reinstalling

- Handle the data-safety and licensing questions a clone raises

- Verify an upgrade worked and report it to the customer

## The taught content

### Compatibility: the check that comes before the quote

An upgrade fails most often at the compatibility stage, not during fitting. For **RAM** you need four facts: the **type** — DDR3, DDR4 or DDR5, which are physically incompatible and will not fit the wrong slot; the **form factor** — SO-DIMM for a laptop, DIMM for a desktop; the **maximum capacity** the board supports, which is a firmware and chipset limit rather than a physical one; and the **speed**, which must be supported, though a faster stick will usually run at a slower supported speed rather than fail.

Get these from the manufacturer's specification for the exact model, or read them off the installed stick, or use a system information tool that reports the board's capabilities. A machine with one slot plus soldered memory is a common arrangement on mid-range laptops, and it caps what you can do — which is why you check before quoting rather than after ordering.

For **storage** the questions are: does the machine have an **M.2 slot**, and if so does it support **NVMe** or only SATA over M.2 — these are different and an NVMe drive will not work in a SATA-only slot; is there a **2.5-inch bay** for a SATA SSD; and is there room for both. Many laptops from roughly 2016 onward have an M.2 slot plus a 2.5-inch bay, which allows an SSD for the system and a hard drive for bulk storage — a genuinely good outcome for a customer with a lot of files.

### Fitting RAM and storage

RAM fits one way only, because the notch in the module is offset. Insert it at roughly a thirty-degree angle, push it in fully until the contacts are almost entirely hidden, then press it down until the two side clips click into place. If it needs force, it is the wrong way round or the wrong type. With two sticks, fill the matching slots — often marked or colour-coded — so the board can run them in **dual channel**, which gives a real performance improvement over two sticks in the wrong slots.

An **M.2 SSD** inserts into its slot at a shallow angle, then is pressed down and secured with a single small screw. Many machines ship without that screw, or with a plastic stand-off, and losing it is a common annoyance; keep spares. A **2.5-inch SATA SSD** goes in the drive caddy or bracket, connected with a short SATA data cable and a SATA power connector, and must be secured so it cannot move — a loose drive in a laptop will eventually damage its own connector.

Throughout, the discipline from session two applies: mains unplugged, laptop battery disconnected first, wrist strap on, board handled by its edges. A RAM stick is cheap; a board damaged by static or by a screwdriver slipping is not, and the machine is the customer's livelihood.

### Cloning versus reinstalling

Replacing a hard drive with an SSD raises the question of what happens to Windows and the customer's files. There are two answers. A **clean install** gives the best result — a fresh Windows, no accumulated cruft, genuinely the fastest outcome — but it requires reinstalling every program, and for a customer with many applications and a complicated setup that is a day of disruption they did not ask for.

**Cloning** copies the entire drive, including Windows, programs, settings and files, onto the new SSD, so the machine boots into exactly the same state, only faster. This is usually what a customer actually wants, and it is the professional default when the existing installation is healthy. The tools are free or cheap — manufacturers such as Samsung and Crucial ship cloning software with their drives, and there are reputable third-party utilities.

The catch is that the **target must be at least as large as the data on the source**, not necessarily as large as the source drive. A 1TB hard drive holding 200GB of data can be cloned to a 256GB SSD, and most cloning tools handle shrinking the partitions automatically. But a 1TB drive holding 400GB cannot go onto a 256GB SSD, and you must tell the customer that before they buy the drive — which is why you check used space, not drive capacity, when advising.

### The cloning procedure, and the data-safety question

The procedure: connect the new SSD to the machine — in the second slot if there is one, otherwise through a **USB-to-SATA or USB-to-NVMe adapter**. Run the cloning tool, select source and target carefully, and start the copy. This takes from twenty minutes to a couple of hours depending on the amount of data. Then **swap the drives physically**, boot, and confirm Windows starts from the new SSD and reports the correct capacity.

The critical safety rule: **the original drive is the backup until the clone is verified**. Do not wipe, format or dispose of the original until the machine has booted successfully from the clone and the customer has confirmed their files are there. If the clone fails, the original is untouched and you have lost nothing but time. A technician who wipes the source first has converted a routine job into a data-loss incident.

Be honest with the customer about what cloning does and does not do. It copies everything — including whatever problems the installation already had. If the machine was slow because of malware or a corrupted profile, cloning carries that across, and the SSD will make it faster but not fix it. In that case a clean install is the right answer and you should say so rather than clone a broken system and be called back.

### Verifying and reporting the upgrade

An upgrade you cannot demonstrate is a claim the customer has to trust. Verify concretely: check that the machine reports the **new RAM capacity** in system information, and that both sticks are detected; confirm the **SSD is recognised at its full capacity** and is the boot device; and measure the difference — boot time, and the time to launch a heavy program. Going from a ninety-second boot to fifteen seconds is dramatic and it is worth recording with a phone camera, because it is the evidence that justifies your fee and earns the referral.

Then run a short stability check. Boot a few times, open several applications, and confirm nothing crashes — a badly seated RAM stick often works initially and then produces random restarts, so a five-minute test catches it in your workshop rather than in the customer's office. On Windows, the built-in **Memory Diagnostic** is worth running after a RAM upgrade; it takes a few minutes and settles the question.

Finally, report honestly, including where the upgrade did not help. A machine whose slowness was caused by malware or a failing board will not be transformed by an SSD, and saying so plainly — 'the SSD is in and it boots faster, but the freezing you described is a separate fault and here is what it is' — is what separates a technician from someone who sells parts.

## Instructor demonstration

The instructor determines a real machine's upgrade limits, fits RAM and an M.2 SSD, clones Windows to the new drive through a USB adapter, swaps the drives, and verifies the result with measured before-and-after figures.

### Determine the RAM limits

Check the manufacturer specification for the exact model, read the installed stick's label, and confirm type, form factor, maximum capacity and supported speed.02

### Check for soldered memory

Open the base and confirm whether there are SO-DIMM slots, one slot plus soldered memory, or fully soldered. Explain that this must be known before quoting.03

### Determine the storage options

Identify the M.2 slot and whether it supports NVMe or only SATA, and check for a 2.5-inch bay. Explain the difference and why an NVMe drive will not work in a SATA-only slot.04

### Check used space before advising on capacity

Look at how much data is actually on the drive, not its capacity, and explain that this is what determines whether a smaller SSD can be cloned to.05

### Fit the RAM

Insert at thirty degrees, push in fully, press down until both clips click. Show the wrong-way-round attempt and explain the offset notch.06

### Fill the correct slots for dual channel

Fit two sticks into the matching slots and explain the performance difference. Show how to confirm dual-channel operation in a system tool.07

### Fit the M.2 SSD

Insert at a shallow angle, press down, secure with the small screw. Note that machines often ship without the screw and that spares are worth keeping.08

### Connect the SSD by USB for cloning

Use a USB-to-NVMe adapter and confirm the drive is detected in Windows before starting. Explain that this avoids opening the machine twice.09

### Run the clone

Select source and target carefully, confirm the direction, and start. Explain that the original must remain untouched until the clone is verified.10

### Swap the drives physically

Remove the original, fit the clone in its place, and keep the original safe. Explain that it is the backup until the customer confirms their files.11

### Boot and verify

Confirm Windows starts from the new SSD, reports full capacity, shows the new RAM total, and boots in the measured time. Record the figures.12

### Run a stability check

Reboot several times, open applications, and run the Windows Memory Diagnostic. Explain that a badly seated stick often works first and fails later.

## Guided practice

### Upgrade and clone, with verified results

You determine a real machine's upgrade limits, fit RAM and an SSD correctly, clone the Windows installation to the new drive, swap it in, and verify the result with measured before-and-after figures and a stability check.

1. 01Record the machine's exact model and check the manufacturer specification for RAM type, form factor and maximum capacity.

2. 02Open the machine and confirm whether memory is socketed, partly soldered or fully soldered.

3. 03Identify the storage interfaces available and whether the M.2 slot supports NVMe.

4. 04Check the used space on the existing drive and state the smallest SSD the data will fit on.

5. 05Fit the RAM at thirty degrees until both clips click, using the correct slots for dual channel.

6. 06Fit the SSD, securing it properly so it cannot move.

7. 07Connect the new drive by USB adapter and confirm Windows detects it.

8. 08Clone source to target, confirming the direction before starting.

9. 09Keep the original drive untouched and stored safely.

10. 10Swap the drives physically and boot from the clone.

11. 11Confirm the new RAM total and the SSD's full capacity are reported, and that the SSD is the boot device.

12. 12Measure boot time and program launch before and after, and record both.

13. 13Reboot several times, run the Windows Memory Diagnostic, and confirm stability.

The standard we hold you to

Compatibility confirmed from the specification before any part was ordered, components fitted correctly with dual channel where applicable, the clone verified working before the original was set aside, new capacity confirmed in system information, and measured before-and-after boot figures plus a passed stability check.

## Common mistakes and how to fix them

You ordered RAM before checking the type

Fix: Confirm DDR generation, form factor, maximum capacity and supported speed for the exact model first. DDR3, DDR4 and DDR5 are physically incompatible and will not fit the wrong slot.

You quoted a RAM upgrade on soldered memory

Fix: Open the machine or check the service manual before quoting. Some laptops have one slot plus soldered memory and some are fully soldered; a promise you cannot keep is worse than no upgrade.

You bought an NVMe drive for a SATA-only M.2 slot

Fix: Confirm what the slot supports. Many machines have an M.2 slot that only handles SATA, and an NVMe drive will not be detected in it.

You bought an SSD too small for the customer's data

Fix: Check used space, not drive capacity. A 1TB drive holding 200GB clones fine to 256GB, but one holding 400GB does not. Advise on data size, not disk size.

You wiped the original drive before verifying the clone

Fix: The original is your backup until the clone has booted and the customer has confirmed their files. Wiping first turns a routine job into a data-loss incident.

You cloned a broken Windows installation

Fix: Cloning copies everything, including malware and corrupted profiles. If the system was unhealthy, do a clean install and say so — cloning a broken system gets you called back.

You handed the machine back without a stability check

Fix: Reboot several times, open applications, and run the memory diagnostic. A badly seated stick often works initially and then causes random restarts at the customer's desk.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Check compatibility from the manufacturer's specification for the exact model before you order anything, every time. It takes five minutes and it is the difference between a smooth job and a returned part you paid for.

- Keep USB-to-SATA and USB-to-NVMe adapters in your kit. They let you clone without opening the machine twice, they let you recover data from a dead machine quickly, and they are among the most-used tools in this trade.

- Never release the original drive until the clone is verified and the customer has confirmed their files. It costs nothing to hold it for a week and it is the only thing standing between a routine job and a data-loss disaster.

- Record the boot time before and after with your phone. A ninety-second-to-fifteen-second clip is the most persuasive evidence you can show a customer, and it is what makes them tell their friends.

## Key termsSO-DIMMThe smaller laptop RAM module. Distinct from the full-size desktop DIMM and not interchangeable.Dual channelRunning two matched RAM sticks in the correct slots together, giving a real performance gain over single channel.NVMeThe fast SSD protocol over M.2. Distinct from SATA over M.2, which is slower and not interchangeable.2.5-inch bayThe drive space taking a SATA SSD or hard drive, common alongside an M.2 slot.CloningCopying an entire drive, including the operating system, to a new one so the machine boots into the same state.USB-to-NVMe adapterAn enclosure letting an SSD connect by USB for cloning or data recovery without opening the machine twice.Clean installInstalling Windows fresh. Gives the best result but requires reinstalling every program.Memory DiagnosticThe Windows tool testing RAM for faults. Worth running after any RAM upgrade.

## Homework before the next session

Specify three upgrades

Take three real machines and determine, for each, the RAM type and maximum, the storage interfaces, and the smallest SSD their data would fit on. Write it as you would quote it.

Fit RAM on a scrap machine

Practise the thirty-degree insertion and clip engagement until it is automatic, including the wrong-way-round attempt so you recognise the feel.

Clone a drive end to end

Clone a real Windows installation to a smaller SSD through a USB adapter. Verify it boots, then repeat until the procedure is comfortable.

Measure an upgrade

Record boot time and program launch before and after an SSD swap. Keep the figures — they are your evidence for every future customer conversation.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Compatibility checking | Checks the RAM type. | Confirms type, form factor, maximum capacity, speed and M.2 protocol from the specification, and checks used space before advising on SSD size. |
| Fitting | Components are installed. | RAM seated at thirty degrees until both clips click in the dual-channel slots, SSD secured properly, and safe handling throughout. |
| Cloning | Produces a working clone. | Source and target confirmed before starting, the original preserved until verification, and a healthy versus broken installation correctly distinguished. |
| Verification | The machine boots. | New capacity confirmed in system information, boot and launch times measured before and after, and a stability check including the memory diagnostic. |
| Honest reporting | Reports the work done. | States plainly what the upgrade fixed and what it did not, with a separate diagnosis offered where a different fault remains. |

## Session questionsIs cloning or a clean install better?+

Cloning if the existing Windows is healthy, because the customer keeps everything and the disruption is minimal. A clean install if the system was slow because of malware, corruption or accumulated cruft — the SSD will make a broken system faster but not fix it, and you will be called back.Can I clone a 1TB drive to a 256GB SSD?+

Yes, if the data on the 1TB drive is under about 256GB. Cloning tools shrink the partitions to fit. Check used space rather than drive capacity, and leave some headroom on the target.How much RAM does a typical user need in 2026?+

Eight gigabytes is the practical minimum for browsing with several tabs, Office and video calls. Sixteen is comfortable and future-proof. Four gigabytes is genuinely painful and is the most common reason a machine feels unusable.My machine will not boot after fitting RAM. What now?+

Remove and reseat the stick, checking it is fully down and both clips are engaged. Try one stick at a time in each slot to isolate a faulty module or slot. If it beeps, count the beeps — the pattern identifies the fault in the manual.Should I recommend an SSD to every customer?+

Only where it will actually help — a machine booting from a mechanical hard drive. If the machine already has an SSD and is slow, the cause is elsewhere and saying so honestly is what builds your reputation.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: Disassembly & Cleaning](https://www.cea.ng/classes/computer-repairs/disassembly-and-cleaning)[Next session 5: Power, Display & Heat Faults](https://www.cea.ng/classes/computer-repairs/power-display-heat-faults)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
