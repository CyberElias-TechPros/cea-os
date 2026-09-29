---
title: "Session 7: Software & System Servicing"
description: "Half of what customers call a hardware problem is software. This session covers diagnosing and fixing a slow or unstable Windows machine, malware removal done properly, driver and update management, and a clean reinstall with the customer's data preserved."
date: "2026-09-12"
class_slug: "computer-repairs"
---

Half of what customers call a hardware problem is software. This session covers diagnosing and fixing a slow or unstable Windows machine, malware removal done properly, driver and update management, and a clean reinstall with the customer's data preserved.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Diagnose slowness by evidence rather than by assumption

- Distinguish a software cause from a hardware cause

- Remove malware properly and know when removal is not the right answer

- Manage drivers and Windows updates without breaking a working machine

- Perform a clean reinstall preserving the customer's files

- Apply the routine servicing that keeps a machine healthy

## The taught content

### Diagnosing slowness with evidence

'My computer is slow' is not a diagnosis, and the fastest way to waste an hour is to start uninstalling things. Open **Task Manager** and look at the actual numbers: which process is consuming CPU, how much of the RAM is in use and whether it is saturated, and — most revealingly — whether the **disk is at 100%**. A disk pegged at full utilisation on a mechanical drive is the single most common cause of an unusable Windows machine, and it points straight at the SSD upgrade from session four rather than at any software fix.

Then look at **startup programs**. A machine that takes three minutes to become usable usually has twenty applications launching at boot, each competing for the disk. Disabling the unnecessary ones in Task Manager's Startup tab is free, reversible and routinely transforms a machine. Note what you disable so you can undo it if the customer needs something back.

Check the basics that are routinely overlooked: **how full the system drive is** — Windows needs meaningful free space to operate and a drive above roughly 90% full degrades badly; **how much RAM** is installed against what is actually needed; and whether the machine is **thermal throttling**, which session three and five cover and which presents identically to a software problem. Evidence first, action second, and write down what you found.

### Software or hardware: telling them apart

The distinction determines everything about the job, and a few tests settle it. **Does the problem occur in the firmware or in a bootable environment?** If a machine is unstable in Windows but stable when booted from a USB Linux stick or a diagnostic tool, the hardware is probably fine and the fault is in Windows. If it crashes in both, suspect RAM, storage or heat.

**Blue screens** carry a stop code, and that code is a genuine clue — `MEMORY_MANAGEMENT` points at RAM, `CRITICAL_PROCESS_DIED` and `INACCESSIBLE_BOOT_DEVICE` at storage or drivers, `WHEA_UNCORRECTABLE_ERROR` at hardware. Photograph the code, or note that Windows stores minidumps you can read later. Guessing at a blue screen's cause without the code is how a technician replaces a perfectly good part.

**Does the problem follow the user or the machine?** If it happens only in one person's profile, the profile is corrupted and a new one fixes it. If it happens for every user, it is system-wide. That single test — create a second local user and log into it — takes two minutes and it splits an enormous category of problems in half.

### Malware removal, honestly assessed

Run a scan with a reputable tool — the built-in Windows Defender is genuinely adequate for most cases, supplemented by a second-opinion scanner for anything stubborn. But understand what scanning does and does not achieve. It removes detected threats; it does not undo everything a threat did, and it cannot guarantee the system is clean afterwards, because sophisticated malware is specifically designed to persist and to hide from scanners.

This leads to the honest professional position: **for a machine with a serious infection, and especially one used for banking or business, a clean reinstall is the correct answer, not a cleanup**. A cleaned machine is probably fine; a reinstalled machine is known to be fine. Where the customer handles money or sensitive data, 'probably' is not good enough, and saying so is the responsible advice even though it is more work and a harder conversation.

For lighter cases — adware, a browser hijacker, a toolbar — targeted removal is reasonable: reset the browser, remove unknown extensions, uninstall unknown programs by install date, and check the scheduled tasks and startup entries where persistence hides. Then change the passwords for anything important, from a different device, because credentials captured before removal are already compromised regardless of whether the malware is gone.

### Drivers and updates: the discipline of not breaking things

The rule that governs this whole area is: **if it works, do not update it out of curiosity**. Driver updates are not improvements by default — they are changes, and any change can break something that was fine. Update a driver when there is a specific fault it addresses, a specific feature you need, or a known security issue. Otherwise leave it.

Get drivers from the **machine or component manufacturer**, not from a generic driver-updater utility. Those utilities are a common source of damage and of malware, and they frequently install the wrong version. On a laptop, the manufacturer's support page for the exact model is the source; on a desktop, the motherboard and component manufacturers. Windows Update handles most drivers adequately for everyday hardware.

**Windows updates** should be kept current for security, but the discipline is to update deliberately rather than mid-job. A machine that restarts during a repair loses your place and occasionally corrupts the work in progress. Pause updates while you work, complete them before handing back, and confirm afterwards that the machine boots and its devices function — because an update that breaks a network driver or a touchpad is your problem the moment you hand the machine over, not the customer's.

### Clean reinstall and routine servicing

A clean reinstall is the most effective software repair there is and it is underused because technicians fear the data loss. The procedure removes that fear: **recover the data first**, to an external drive, and verify the copy before touching anything. Then back up **what people forget** — browser bookmarks and saved passwords, email archives, licence keys for paid software, and any application settings that took the customer years to configure. Losing a customer's licence key is a real and avoidable failure.

Then install from clean media, install drivers from the manufacturer, run Windows Update to completion, reinstall the customer's applications, restore the data, and verify. Verification matters: open a sample of the restored files and confirm they are intact, confirm the email and browser are working, and confirm the licences activated. A reinstall you have not verified is a job you will hear about again.

The **routine service** that keeps a machine healthy is short and worth offering as a package: clean the dust and replace the paste, check drive health through S.M.A.R.T., verify the backups are actually running, review startup programs, complete the updates, and confirm the antivirus is active. Most of these are checks rather than repairs, and a machine serviced twice a year rarely develops the dramatic failures that bring customers in panicking — which is a better outcome for them and a steadier income for you.

## Instructor demonstration

The instructor diagnoses a genuinely slow machine by evidence, isolates a software fault from a hardware one, handles a malware case with an honest recommendation, then performs a clean reinstall with the data recovered and verified first.

### Read Task Manager before touching anything

Show CPU, memory and disk utilisation, and point to a disk at 100%. Explain that this one number redirects the whole diagnosis toward storage rather than software.02

### Review startup programs

Open the Startup tab, count what launches, and disable the unnecessary entries while recording each one. Explain that this is free, reversible and often transformative.03

### Check free space and drive health

Show how full the system drive is and read its S.M.A.R.T. status. Explain that a drive above 90% full degrades badly and that health must be confirmed before blaming software.04

### Create a second user profile

Add a local user and log in. Explain that if the fault disappears, the original profile is corrupted — a two-minute test that splits a large category of problems.05

### Read a blue screen stop code

Trigger or show a recorded blue screen, photograph the code, and look up what it indicates. Show where Windows stores the minidumps for later analysis.06

### Boot from a USB diagnostic environment

Boot the unstable machine from USB and show it behaving normally. Explain that stability outside Windows points away from hardware.07

### Run a malware scan

Scan with Windows Defender and a second-opinion tool, and show what is found. Explain what a scan can and cannot guarantee afterwards.08

### Make the honest recommendation

For a machine used for banking, recommend a reinstall rather than a cleanup and explain why 'probably clean' is not acceptable for money. Practise saying it.09

### Recover the data first

Copy the customer's files to an external drive and verify the copy. Include bookmarks, saved passwords, email archives and licence keys.10

### Install from clean media

Boot the installation USB, install to a clean drive, and explain why you pause Windows Update until the machine is stable rather than letting it restart mid-job.11

### Restore and verify

Install manufacturer drivers, complete the updates, restore the data, and open a sample of files to confirm integrity. Confirm licences activated.12

### Present the service package

List the routine service items and explain how a twice-yearly check prevents the dramatic failures that bring customers in panicking.

## Guided practice

### Diagnose, service and reinstall with data preserved

You diagnose a slow or unstable machine from evidence, isolate whether the cause is software or hardware, handle a malware case with a justified recommendation, then perform a clean reinstall with the customer's data recovered and verified beforehand.

1. 01Record Task Manager readings for CPU, memory and disk utilisation before changing anything.

2. 02List and disable unnecessary startup programs, recording each one you disabled.

3. 03Check system drive free space and read the drive's S.M.A.R.T. status.

4. 04Check installed RAM against what the workload needs, and check for thermal throttling.

5. 05Create a second local user and log in to determine whether the fault follows the profile.

6. 06Photograph or record any blue screen stop code and look up what it indicates.

7. 07Boot from a USB diagnostic environment and note whether the fault persists outside Windows.

8. 08Run a malware scan with two tools and record what is found.

9. 09Write a recommendation for a banking machine and justify why reinstall beats cleanup.

10. 10Recover the data to an external drive, including bookmarks, passwords, email and licence keys.

11. 11Verify the recovered copy before touching the system.

12. 12Install Windows from clean media with updates paused during the work.

13. 13Install manufacturer drivers, complete updates, restore the data and verify a sample of files.

14. 14Write up the diagnosis, the evidence, the action taken and the routine service you would recommend.

The standard we hold you to

A diagnosis supported by recorded evidence rather than assumption, the software-versus-hardware question settled by a bootable-environment or second-profile test, a justified malware recommendation, and a completed clean reinstall where the data was recovered and verified first, with a sample of restored files confirmed intact.

## Common mistakes and how to fix them

You started uninstalling things before looking at Task Manager

Fix: Read the numbers first. CPU, memory, disk utilisation and the startup list usually name the cause in two minutes, and guessing wastes an hour and risks removing something the customer needs.

You ignored a disk running at 100%

Fix: That reading on a mechanical drive is the most common cause of an unusable Windows machine and it points at an SSD, not at software. No amount of cleanup fixes a saturated disk.

You guaranteed a machine was clean after a malware scan

Fix: Scans remove detected threats; they cannot guarantee the absence of everything. For a machine used for banking or business, recommend a reinstall — 'probably clean' is not acceptable where money is involved.

You used a generic driver-updater utility

Fix: Get drivers from the machine or component manufacturer for the exact model. Updater utilities frequently install the wrong version and are a known source of malware.

You updated drivers on a machine that was working fine

Fix: Updates are changes, not improvements by default. Update for a specific fault, feature or security issue; otherwise leave a working machine alone.

You let Windows Update restart the machine mid-repair

Fix: Pause updates while you work and complete them before handing back. An update that breaks a driver becomes your problem the moment the customer leaves with the machine.

You reinstalled without recovering licence keys

Fix: Back up licence keys, bookmarks, saved passwords and email archives along with the files. Losing a customer's paid software licence is a real and entirely avoidable failure.

You handed back a reinstall without verifying it

Fix: Open a sample of restored files, confirm email and browsers work, and confirm licences activated. An unverified reinstall is a job you will hear about again.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Look at Task Manager before you touch anything, on every slow-machine job. Two minutes of reading CPU, memory, disk and startup entries names the cause more often than any other single action in software work.

- Create a second local user and log into it early in any profile-related diagnosis. It takes two minutes and it splits an enormous category of problems in half, which is the highest value-per-minute test in this session.

- Recommend a reinstall over a cleanup for any machine handling money or sensitive data, and be able to explain why. It is more work and a harder conversation, and it is the advice that protects both the customer and your reputation.

- Offer routine servicing as a package rather than waiting for failures. Most of it is checking rather than repairing, it prevents the dramatic jobs, and it turns one-off customers into an annual relationship.

## Key termsTask ManagerThe Windows tool showing per-process CPU, memory and disk use, plus startup programs. The first place to look at any slow machine.100% disk usageA saturated disk, usually mechanical. The most common cause of an unusable Windows machine and a pointer to an SSD.Stop codeThe code on a blue screen identifying the fault class, such as MEMORY_MANAGEMENT. Photograph it rather than guessing.MinidumpThe crash file Windows stores for later analysis. Useful evidence after an intermittent blue screen.Second profile testLogging into a new local user to determine whether a fault follows the profile or the system.Second-opinion scannerAn additional malware scanner run alongside the primary one. Useful for stubborn or newly emerged threats.Clean reinstallInstalling Windows fresh. The correct answer for a serious infection on a machine handling money or sensitive data.Routine servicingDust cleaning, paste, drive health, backups, startup review, updates and antivirus checks. Prevents the dramatic failures.

## Homework before the next session

Diagnose a slow machine by evidence

Take any slow machine and record Task Manager readings, startup entries, free space and drive health before changing anything. Write the diagnosis from the evidence.

Run the second-profile test

Create a local user on a machine you are working on and log in. Note whether behaviour differs. Practise until this is a reflex rather than an afterthought.

Practise a clean reinstall

Do a full reinstall on a scrap machine including data recovery and verification. Time it, so you can quote the job accurately later.

Write your service package

List what a twice-yearly service includes, what it costs and what it prevents. This is a recurring income product, not a favour.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Evidence-based diagnosis | Identifies a cause. | Task Manager readings, startup list, free space and drive health all recorded before any change, and the conclusion drawn from them. |
| Software versus hardware | Makes a judgement. | Settled by a bootable-environment test or a second-profile test, with any blue screen stop code photographed and looked up. |
| Malware handling | Runs a scan. | Two tools used, the limits of a cleanup stated honestly, and a reinstall recommended with justification for any machine handling money. |
| Drivers and updates | Updates the machine. | Manufacturer drivers for the exact model, updates paused during work and completed before handover, and no working machine updated out of curiosity. |
| Reinstall discipline | Completes a reinstall. | Data, licence keys, bookmarks and email recovered and verified first, then a sample of restored files confirmed intact after the install. |

## Session questionsMy customer's machine is slow. Where do I start?+

Task Manager, before anything else. Check disk utilisation first — 100% on a mechanical drive is the most common cause and points at an SSD — then memory saturation, then the startup list. Those three account for most slow machines.Is Windows Defender enough, or should I install third-party antivirus?+

Windows Defender is genuinely adequate for most users and has the advantage of not slowing the machine. A second-opinion scanner is worth running for anything stubborn. What matters more than which product is that something is active and that the customer does not click through warnings.Should I always reinstall after a malware infection?+

For a machine used for banking, business or sensitive data, yes — a cleaned machine is probably fine while a reinstalled one is known to be fine. For light adware or a browser hijacker, targeted removal plus password changes from another device is reasonable.How do I find a customer's Windows licence key before reinstalling?+

On most modern machines the key is embedded in the firmware and Windows reactivates automatically. Where it is not, use a reputable key-finder tool before wiping, and record it. Never start a reinstall without knowing how the machine will reactivate.What should a routine service include?+

Dust cleaning and thermal paste, drive health through S.M.A.R.T., a check that backups are actually running, a startup program review, completing updates, and confirming antivirus is active. Most of it is checking rather than repairing, which is why it prevents dramatic failures.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session6: Storage, Memory & Boot Faults](https://www.cea.ng/classes/computer-repairs/storage-memory-boot-faults)[Next session 8: Service Workflow & Final Practical](https://www.cea.ng/classes/computer-repairs/service-workflow-and-final-practical)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
