---
title: "Session 6: Storage, Memory & Boot Faults"
description: "The faults that stop a machine reaching Windows: a failing drive, faulty RAM, a corrupted boot sequence, and the error messages each produces. This session covers reading those messages correctly, testing storage and memory properly, and recovering data before you attempt any repair."
date: "2026-09-12"
class_slug: "computer-repairs"
---

The faults that stop a machine reaching Windows: a failing drive, faulty RAM, a corrupted boot sequence, and the error messages each produces. This session covers reading those messages correctly, testing storage and memory properly, and recovering data before you attempt any repair.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Interpret the common startup error messages and what each actually indicates

- Test a hard drive and an SSD for health before trusting either

- Test RAM properly rather than by reseating and hoping

- Repair or rebuild a boot sequence without destroying data

- Recover data from a failing drive safely

- Decide the correct sequence: data first, then repair

## The taught content

### Startup errors are a language, not a mystery

The messages a machine shows before Windows loads are the firmware telling you what it could not do, and learning to read them is most of this session. **'No bootable device'** or **'Boot device not found'** means the firmware found no drive with a working boot sequence — which can be a disconnected drive, a changed boot order in the firmware, a corrupted boot record, or a failed drive. These have very different fixes, so you check the simplest first: is the drive detected in the firmware at all?

**Beep codes** are the firmware's alternative to a display. A pattern of beeps on a machine with no picture identifies the fault — commonly one long and two or three short for a memory fault, or a repeating pattern for a display fault. The meaning is specific to the firmware manufacturer, so you look up the pattern for that board rather than guessing. **A spinning fan and no display** usually points to RAM, the board, or the GPU. **Endless restart loops** often indicate faulty RAM or a corrupted operating system.

The discipline is to write the message down exactly, or photograph it. Customers describe errors loosely — 'it says something about a disk' — and the exact wording distinguishes a boot-order problem from a dead drive. Photograph the screen before doing anything else; it costs nothing and it is frequently the whole diagnosis.

### Testing storage properly

A drive can be working and still failing, which is why you test rather than assume. Every modern drive reports its own health through **S.M.A.R.T.** — Self-Monitoring, Analysis and Reporting Technology — which tracks reallocated sectors, pending sectors, power-on hours and temperature. A drive with reallocated or pending sectors is degrading and will fail; how quickly is unpredictable, which is exactly why you do not wait.

Read S.M.A.R.T. with a free tool, or on Windows with `wmic diskdrive get status`, which returns OK or Pred Fail. For a mechanical drive, also **listen** — a clicking or grinding noise is a head or bearing failure and the drive must be treated as a data-recovery case immediately, not a repair case. Continuing to power a clicking drive can destroy the data permanently, and this is the single most important rule in this session.

An SSD reports differently: it has no moving parts to listen to, but it has a finite write endurance and reports its remaining life. The practical rule for both: **if a drive shows any sign of degradation, back up the data first and replace the drive**. There is no repair for a failing drive, only replacement — and the value you provide is getting the data off before it is gone.

### Testing memory properly

Faulty RAM produces the most confusing symptoms in computing: random blue screens, restarts under load, files that corrupt for no reason, an operating system that fails to install. Because the symptoms are random, the only reliable approach is to test rather than to guess.

Two methods. **Windows Memory Diagnostic** runs from a restart and checks the installed memory, reporting errors afterwards — it is built in and adequate for a first pass. For a thorough test, **MemTest86** boots from a USB stick and runs a long series of patterns, which is the professional standard; let it complete at least one full pass, ideally several, because some faults only appear after the memory has warmed or after many passes.

The physical approach complements it: with multiple sticks, **test one at a time in one slot**, which isolates both a bad module and a bad slot. And reseat first — a poorly seated stick causes exactly these symptoms and costs thirty seconds to rule out. The sequence is: reseat, then test each stick individually, then test each slot. That finds the fault without buying anything.

### Boot repair without losing data

A corrupted boot sequence is common after a failed update, an improper shutdown or a malware infection, and it is usually repairable without touching the user's files. The sequence: boot from a **Windows installation USB**, choose **Repair your computer** rather than Install, and use the **Startup Repair** tool first, which fixes many cases automatically. If that fails, the **command prompt** in the recovery environment lets you rebuild the boot records with the `bootrec` commands — rebuilding the boot configuration data and rewriting the master boot record.

The critical rule is that you **do not reinstall Windows as a first response**. A reinstall overwrites the operating system and, depending on the choices made, can destroy the user's files. It is the last resort after boot repair has failed and after the data has been recovered. A technician who reaches for a reinstall first is a technician who destroys data, and customers remember that permanently.

Related and often confused: a **changed boot order** in the firmware produces the same 'no bootable device' message as a dead drive, and it is fixed in seconds by putting the correct drive first. Check it before assuming anything is broken — particularly after a battery replacement or a CMOS reset, which can reset the boot order as a side effect.

### Data recovery: the sequence that matters

When a drive is failing, the order of operations determines whether the data survives. **Stop using the machine immediately.** Every write to a failing drive reduces the chance of recovery, and continuing to boot it, or attempting a repair, or running a disk check on a mechanically failing drive can finish it. This is the rule that separates a recovered family photograph archive from a lost one.

The safe sequence: power down, remove the drive, connect it to a healthy machine through a **USB adapter** as a secondary drive rather than booting from it, and copy the most important files first — documents, photographs, anything irreplaceable — before attempting a full copy. Copy, never move; the original stays untouched until you are certain. If the drive is mechanically clicking, stop and refer it to a professional data-recovery service; no software will help and continuing makes it worse.

Then be honest about what you can and cannot do. Software recovery from a logically damaged but physically healthy drive is well within your scope and is a genuinely valuable service. Physical recovery — opening a drive in a clean room, swapping heads — is a specialist discipline requiring equipment you do not have, and referring it out is the correct professional answer. Customers respect a referral; they do not respect a technician who takes money and destroys the drive.

## Instructor demonstration

The instructor works through four machines: one with a boot-order problem, one with a corrupted boot record, one with faulty RAM and one with a clicking drive — showing the tests, the repair, and the point at which the work becomes a data-recovery referral.

### Photograph the error first

Show that the exact wording matters, and photograph the screen before touching anything. Explain how 'no bootable device' has four different causes.02

### Check whether the drive is detected

Enter the firmware and look for the drive in the storage list. Explain that a drive absent here is a connection or drive fault, while a drive present here is a boot or software problem.03

### Fix a boot order problem

Reorder the boot sequence and boot successfully. Explain that a CMOS reset or battery replacement can change this, producing a scary message with a five-second fix.04

### Read S.M.A.R.T. health

Run a S.M.A.R.T. tool and the wmic status command on a healthy and a degrading drive. Point out reallocated and pending sectors and explain what they predict.05

### Listen to a failing mechanical drive

Play or demonstrate a clicking drive and explain why it must be powered down immediately. Emphasise that continuing can destroy the data permanently.06

### Reseat and test RAM

Reseat the sticks, then test one at a time in one slot. Explain how this isolates both a bad module and a bad slot without buying anything.07

### Run the memory diagnostics

Run Windows Memory Diagnostic and show a MemTest86 boot. Explain why several passes are needed rather than one.08

### Repair a boot record

Boot from installation media, choose Repair, run Startup Repair, and where needed use the bootrec commands from the recovery command prompt.09

### Show what a reinstall would have cost

Explain that reinstalling first would have overwritten the operating system and risked the files, and that it is the last resort after recovery.10

### Recover data through a USB adapter

Remove a drive, connect it as a secondary drive on a healthy machine, and copy the most important files first. Explain copy-not-move and why the original stays untouched.11

### Identify the referral point

Show a mechanically failed drive and explain that clean-room recovery is a specialist discipline. Demonstrate how to refer it out and what to tell the customer.12

### Replace and restore

Fit a new drive, install or clone as appropriate, and confirm the customer's files are present before handing back.

## Guided practice

### Diagnose and recover: four boot and storage faults

You diagnose four machines — a boot-order fault, a corrupted boot record, faulty RAM and a degrading drive — using the tests from this session, repair what is repairable, recover the data where the drive is failing, and document the sequence you followed and why.

1. 01Photograph each machine's error message exactly before doing anything.

2. 02Check the firmware's storage list on each to confirm whether the drive is detected.

3. 03Fix the boot-order machine by reordering the sequence, and note what could have caused it.

4. 04Run a S.M.A.R.T. tool and the wmic status command on each drive and record the results.

5. 05Identify which drive shows reallocated or pending sectors and treat it as failing.

6. 06Reseat the RAM, then test sticks one at a time in one slot.

7. 07Run Windows Memory Diagnostic and record the result; run MemTest86 for a full pass where available.

8. 08Repair the corrupted boot record from installation media, trying Startup Repair before the bootrec commands.

9. 09Confirm no reinstall was performed and the user's files are intact.

10. 10Power down the failing-drive machine immediately and remove its drive.

11. 11Connect it through a USB adapter as a secondary drive and copy the most important files first.

12. 12Copy rather than move, keeping the original untouched until the copy is verified.

13. 13State clearly where a mechanical failure would require a professional referral, and why.

14. 14Document the whole sequence for each machine and the reasoning behind the order.

The standard we hold you to

Each fault correctly identified from its exact error message and confirmed by test rather than by part swapping, RAM isolated stick by stick, the boot repaired without a reinstall, the failing drive powered down immediately with data copied through an adapter, and a written sequence explaining why data recovery came before repair in every case.

## Common mistakes and how to fix them

You reinstalled Windows as your first response

Fix: Try boot repair first and recover the data before anything destructive. A reinstall can overwrite the operating system and destroy the customer's files, and it is the last resort, not the first instinct.

You kept using a drive that was clicking

Fix: Power it down immediately. Every write to a mechanically failing drive reduces the chance of recovery, and continuing can destroy the data permanently. This is the most important rule in the session.

You ran a disk check on a failing drive

Fix: Do not. A surface check stresses a failing drive and can finish it. Copy the data off first, then replace the drive — there is no repair for a failing drive.

You moved files instead of copying them

Fix: Always copy. Moving deletes from the source, so an interruption mid-transfer loses data from both places. The original stays untouched until the copy is verified.

You reseated RAM and assumed the fault was fixed

Fix: Reseating rules out a poor connection; it does not test the memory. Run a diagnostic, testing sticks one at a time, and let MemTest86 complete several passes.

You guessed at a beep code

Fix: Look up the pattern for that specific board or firmware manufacturer. Meanings differ between manufacturers, and a guessed interpretation sends you to the wrong component.

You took money for a clean-room recovery you cannot do

Fix: Refer mechanical failures to a specialist. Physical recovery needs clean-room equipment you do not have, and continuing can destroy the drive. A referral is respected; a destroyed drive is not.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Photograph every error screen before you touch anything. Customers describe errors loosely and the exact wording frequently distinguishes a five-second boot-order fix from a dead drive.

- Power down a failing drive the moment you suspect it, and copy the data through a USB adapter before attempting any repair. This one habit is the difference between being the technician who saved the family photographs and the one who lost them.

- Copy, never move, during recovery, and take the most irreplaceable files first. Documents and photographs before anything reproducible, because a transfer can be interrupted and you want the important data across first.

- Know your referral point and use it. Referring a clean-room recovery to a specialist costs you one job and earns lasting trust; attempting it and destroying the drive costs you a reputation.

## Key termsS.M.A.R.T.A drive's self-reported health data — reallocated sectors, pending sectors, power-on hours. Any reallocated sector means the drive is degrading.Boot orderThe sequence the firmware tries devices in. A changed order mimics a dead drive and is fixed in seconds.Beep codeA firmware error signalled by beeps when there is no display. The pattern's meaning is manufacturer-specific.MemTest86The professional memory test, booted from USB. Needs several full passes to catch intermittent faults.bootrecThe Windows recovery commands rebuilding the boot configuration data and master boot record.Startup RepairThe automated Windows recovery tool. Try it before the manual commands.Reallocated sectorA bad sector the drive has moved data away from. A clear sign of degradation and a reason to replace the drive.Clean-room recoverySpecialist physical data recovery requiring controlled conditions. A referral, not a service you should attempt.

## Homework before the next session

Read S.M.A.R.T. on three drives

Run a S.M.A.R.T. tool and the wmic status command on three real drives and record the results. Learn what reallocated and pending sectors look like in the output.

Build a Windows recovery USB

Create installation media and practise reaching the recovery environment, Startup Repair and the command prompt. You will need this on real jobs and should not learn it under pressure.

Run a full MemTest86 pass

Boot MemTest86 from USB on a scrap machine and let it complete. Learn how long a pass takes so you can plan a job around it.

Practise data recovery through an adapter

Remove a drive from a scrap machine, connect it by USB to another, and copy files from it. Practise until the sequence is automatic.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Error interpretation | Recognises common messages. | Photographs the exact message, checks whether the drive is detected in firmware, and distinguishes boot-order, boot-record and drive-failure causes. |
| Storage testing | Checks whether a drive works. | Reads S.M.A.R.T. and the wmic status, identifies reallocated and pending sectors, and listens for mechanical failure. |
| Memory testing | Reseats the RAM. | Tests sticks one at a time in one slot, runs Windows Memory Diagnostic and MemTest86 for multiple passes. |
| Boot repair | Gets the machine booting. | Tries Startup Repair before the bootrec commands, never reinstalls first, and confirms the user's files are intact afterwards. |
| Data safety | Does not lose data. | Failing drive powered down immediately, data copied through an adapter with the most irreplaceable files first, original untouched, and the clean-room referral point stated clearly. |

## Session questionsWhat does 'No bootable device' actually mean?+

The firmware found no drive with a working boot sequence. It has four common causes: a changed boot order, a loose connection, a corrupted boot record, or a failed drive. Check the boot order and whether the drive is detected in firmware before assuming anything is broken.How do I know a drive is failing before it dies?+

Read its S.M.A.R.T. data. Reallocated or pending sectors mean it is degrading and will fail at an unpredictable time. On a mechanical drive, clicking or grinding is already late. Back up and replace at the first sign — there is no repair for a failing drive.Should I run chkdsk on a failing drive?+

No. A surface check stresses a failing drive and can finish it. Copy the data off through a USB adapter first, then replace the drive. Repair tools are for logically damaged but physically healthy drives.How many passes of MemTest86 do I need?+

At least one full pass, ideally several. Some faults only appear after the memory warms or after many pattern cycles. It is slow, which is why you run it while doing other work rather than watching it.When should I refer a data recovery out?+

Whenever the drive is mechanically failing — clicking, grinding, or not spinning. That needs clean-room equipment and specialist skill. Software recovery from a logically damaged but physically healthy drive is within your scope; opening a drive is not.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: Power, Display & Heat Faults](https://www.cea.ng/classes/computer-repairs/power-display-heat-faults)[Next session 7: Software & System Servicing](https://www.cea.ng/classes/computer-repairs/software-and-system-servicing)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
