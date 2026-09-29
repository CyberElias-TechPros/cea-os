---
title: "Session 4: Hardware & Software Support"
description: "The faults that make up most of a support queue: printers, software installation, updates and patches — and the recurring patterns that let you recognise a familiar problem in an unfamiliar description."
date: "2026-09-12"
class_slug: "it-support"
---

The faults that make up most of a support queue: printers, software installation, updates and patches — and the recurring patterns that let you recognise a familiar problem in an unfamiliar description.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Diagnose and repair printer faults systematically, from queue to network to hardware

- Install software properly, including licensing, prerequisites and clean removal

- Manage updates and patches without breaking the machines you support

- Recognise the common fault patterns that account for most support volume

- Know the difference between a fault you fix and a fault you replace

## The taught content

### Printers: the highest-volume, lowest-prestige fault in support

Printer problems are a large share of any support queue, and they are the fault users are most frustrated by, partly because printing feels like it should be trivial. The useful reframe is that **a print job crosses every layer you have studied**: the application, the operating system's print subsystem, the driver, the network, and a physical device with moving parts and consumables. A fault at any of those produces the same visible symptom — nothing comes out.

So diagnosis follows the path rather than guessing. **Does the job reach the queue?** If it does not, the fault is in the application or the print subsystem. **Does it sit in the queue?** Then the printer is not accepting, which points at the connection or the device. **Does it leave the queue and nothing prints?** Then the fault is at the device — paused, offline, out of paper, jammed, or out of toner. **Does it print but wrongly?** Then it is a driver or settings fault. Those four questions divide the entire problem space, and they take a minute.

Two Nigerian-office specifics matter. **Network printers on DHCP addresses change**, so a printer configured by address stops working after a lease renewal — which is why printers must have reserved addresses, a point we covered in the networking course and you will meet again here as a support call. And **shared printers through a host machine fail whenever that machine is off**, which produces the mysterious 'it only works sometimes' report. Neither is a printer fault, and neither is fixed by touching the printer.

### Software installation: the difference between installing and installing properly

Installing software is easy; installing it **properly on a machine you support** is a different activity with extra steps. Check **licence status** first — installing unlicensed software on a business machine creates a legal and financial exposure for the company, and in a Nigerian business that may face audits or licensing enquiries, it is a real risk rather than a theoretical one. Check **prerequisites**: many applications need a specific runtime, framework or operating system version, and installing without them produces a broken install that is harder to remove than to avoid.

Then the discipline around the install itself. **Install as an administrator, not with elevated shortcuts scattered around** — a shortcut that prompts for credentials every time is a support call every time. **Note the version you installed and where**, because 'which version is on this machine' is a question you will be asked later and the answer will not be obvious. And when something must be removed, **use the proper uninstaller rather than deleting the folder**, because a half-removed application leaves registry entries, services and drivers that block a clean reinstall — one of the most common causes of 'it will not install again'.

The most valuable habit is **standardising what gets installed**. A company where every machine has a different set of versions and a different arrangement of software is a company where every fault is unique. A defined baseline — these applications, these versions, this configuration — means a fault on one machine can be compared against a known-good one, which is the fastest diagnostic there is. **Standardisation is a support strategy, not an administrative preference.**

### Updates and patches: necessary, and the cause of a surprising share of faults

Updates are non-negotiable: **unpatched software is the leading route into an organisation**, and most exploited vulnerabilities were patched publicly some time before they were attacked. But updates are also a genuine cause of support calls, because they change behaviour, occasionally break drivers, and sometimes break applications outright. Pretending otherwise — either 'always update immediately' or 'never update, they break things' — is unprofessional in both directions.

The resolution is **testing before wide deployment**, in miniature. With forty-five machines you cannot run a full staging environment, but you can hold a **pilot group**: three or four machines, ideally including one of each model in use, that receive updates first. If nothing breaks for a few days, the rest follow. That single practice eliminates most update-caused outages at almost no cost, and it is the difference between an organisation that updates safely and one that updates and apologises.

Two supporting habits. **Record what version each machine is on**, so when something breaks after an update you can identify which machines got it and which did not — otherwise you are guessing at correlation. And **never let updates run unattended on a business-critical machine** — the customs software at this company is the kind of application that a framework update can break, and discovering that on the day a shipment must clear is the worst possible timing. **Schedule deliberately, and know what is on the machine before you update it.**

### Common fault patterns: recognition is most of the speed

After a few months in support you stop diagnosing from scratch, because most calls match a pattern you have seen. Building that catalogue deliberately — rather than waiting for it to accumulate — is what makes you effective early. The patterns worth knowing cold are few and they cover most volume.

**Slow machine**: nearly always storage full, too many startup programs, insufficient memory for the workload, or a failing disk. Check free space and startup items first; they account for most cases and take minutes. **Cannot connect to the network**: cable, wireless signal, address, or the switch port — work the layers in order. **Application crashes on open**: corrupt user profile, missing runtime, or a bad update; test with a second user account to separate them. **Machine will not start**: power, then disk, then operating system, in that order — and listen to the machine, because fan behaviour and beep patterns are diagnostic.

Two patterns deserve particular attention because they are commonly mishandled. **Intermittent faults** — usually physical, thermal, or a failing component rather than configuration, because configuration fails consistently. A machine that freezes at the same time each afternoon has a scheduled cause; one that freezes when it has been running an hour has a thermal or memory cause. And **faults that follow a user rather than a machine** — profile, permissions, or technique. **When the same problem follows one person between desks, stop looking at the desks.**

### Fix or replace: the judgement call, and how to make it defensibly

Not every fault is worth fixing, and knowing when to stop is a professional skill rather than a failure. A five-year-old machine with a failing disk, exhausted memory and an unsupported operating system can be kept alive for a week or a month, but the honest answer is that it should be replaced — and saying so clearly, with reasons, is more valuable than a heroic repair that buys three days.

The judgement has three inputs. **Cost against value**: an hour of your time plus a part, against a machine's remaining useful life. **Reliability risk**: a machine that has failed once will fail again, and for a user whose work is business-critical, an unreliable machine costs more than a new one. And **support burden**: a unique old machine that nobody else has is a machine only you can fix, which makes you a bottleneck and makes the company fragile. All three point the same way more often than people admit.

Then how to say it. Not 'this machine is old' — that sounds like giving up. Rather: **the disk is failing, replacement costs a defined amount, the machine is five years old and no longer receives security updates, and the risk to your work is that it fails during a customs clearance.** Give the client the facts, the cost, and the risk, and let them decide. **Recommending replacement with reasons is professional; repeatedly repairing something that should be replaced is not** — and clients respect the first far more than they appreciate the second.

## Instructor demonstration

We work the office's real queue: a printer fault traced through every layer, a proper software installation, a pilot-group update process, and a machine assessed for replacement rather than repair.

### Take the printer fault and start with the four dividing questions

Does the job reach the queue? Does it sit there? Does it leave and nothing prints? Does it print wrongly? One minute of questioning divides the whole problem space, and skipping it is how an hour is lost on the wrong layer.02

### Check the print queue on the machine

Open the queue and look at the job's state. A job stuck 'printing' with no output points at the device or connection; no job at all points at the application or print subsystem. The queue tells you which half of the path failed.03

### Check the printer's own state before touching the PC

Paused, offline, paper out, toner low, jammed, or an error on its panel. Users routinely report a printer fault that is a message on the printer's own screen, so look at the device before you look at the computer.04

### Test the network path to the printer

Ping the printer's address from the affected machine. If it does not respond, the fault is network-side — address, cable, or switch port — and no amount of driver work will help.05

### Find the DHCP-address fault

The classic: the printer was configured by IP address and its lease renewed, so it now has a different address. Confirm by checking the printer's current address against what the PC is configured for.06

### Fix it properly with a reservation, not by re-pointing

Re-pointing the PC works today and breaks again at the next renewal. Create a DHCP reservation so the printer always receives the same address — the durable fix rather than the one that closes the ticket fastest.07

### Check the shared-printer failure mode

Identify any printers shared through a host machine. If the host is off, the printer disappears for everyone, which produces the 'it only works sometimes' report that otherwise looks random.08

### Clear a stuck print queue correctly

Cancel the jobs, and if they will not clear, stop the print spooler service, clear the spool folder, and restart it. Doing this in the right order matters — deleting files while the service holds them does not work.09

### Take the software installation request

A user needs a new application. Before installing anything, check the licence status and whether the company is entitled to it. Installing unlicensed software exposes the business legally and financially, and that is not your call to make quietly.10

### Check prerequisites before installing

Runtime, framework, operating system version. Installing without them produces a broken install that is harder to remove than to avoid, and the resulting error messages rarely name the missing piece.11

### Install properly and record what you did

Install as administrator, note the exact version installed and where, and confirm the application launches. 'Which version is on this machine' will be asked later and the answer will not otherwise be recoverable.12

### Remove a failed installation correctly

Use the proper uninstaller rather than deleting the folder. A half-removed application leaves services, drivers and registry entries that block a clean reinstall — one of the most common causes of 'it will not install again'.13

### Compare against the standard baseline

Check what the company's standard build has and whether this machine deviates. A machine that differs from the baseline is a machine where every fault is unique, and identifying deviations is preventive work.14

### Set up a pilot group for updates

Choose three or four machines including one of each model in use. These receive updates first. This is the small-scale version of staged deployment and it eliminates most update-caused outages at almost no cost.15

### Apply updates to the pilot group and observe

Install the pending updates, then use those machines normally for a few days. Watch specifically for the customs software, which is the application most likely to be broken by a framework update.16

### Record versions so correlation is possible

Note which machines received which update. When something breaks, the first question is 'which machines got the update' — and without a record you are guessing at correlation rather than establishing it.17

### Roll out to the rest once the pilot is clean

Deploy to the remaining machines, and deliberately exclude any business-critical machine from unattended updating. Discovering a broken customs application on the day a shipment must clear is the worst possible timing.18

### Take the slow-machine call and work the pattern

Check free disk space and startup programs first — between them they account for most slow-machine calls and take minutes. Then memory against workload, then disk health.19

### Assess a machine for replacement rather than repair

Five years old, failing disk, unsupported operating system. State the cost of repair, the reliability risk to that user's work, and the fact that it no longer receives security updates. Give the facts and let the business decide.20

### Add the recurring faults to the playbook

Printer by path, slow machine, application crash on open, machine will not start, intermittent fault, and user-following fault — each with symptoms, diagnostic order, fix, and the point at which it should be escalated or a replacement recommended.

## Guided practice

### Work a real hardware and software queue

Handle real printer, installation, update and performance faults using the methods in this session, and make at least one defensible replacement recommendation.

1. 01Take a printer fault and answer the four dividing questions before touching anything.

2. 02Check the print queue state to determine which half of the path failed.

3. 03Check the printer's own panel and consumables before investigating the computer.

4. 04Test the network path to the printer with a ping from the affected machine.

5. 05Check whether the printer's address changed because of a DHCP lease renewal.

6. 06Fix any address fault with a reservation rather than by re-pointing the client.

7. 07Identify any printers shared through a host machine and note the failure mode.

8. 08Clear a stuck queue in the correct order, stopping the spooler service first.

9. 09Check licence status and prerequisites before installing any software.

10. 10Install as administrator and record the exact version and location.

11. 11Remove a failed installation using the proper uninstaller, not by deleting the folder.

12. 12Compare the machine against the company's standard baseline and note deviations.

13. 13Set up a pilot group of three or four machines including one of each model.

14. 14Apply updates to the pilot group and observe for a few days before wider rollout.

15. 15Record which machines received which update so correlation is possible later.

16. 16Exclude business-critical machines from unattended updating and say why.

17. 17Work a slow-machine call starting with free space and startup programs.

18. 18Assess one machine for replacement, stating repair cost, reliability risk and support status.

19. 19Add six recurring fault patterns to your playbook with diagnostic order and escalation points.

The standard we hold you to

A printer fault diagnosed by the four dividing questions with the queue and device checked before the client, the network path tested, and any address fault fixed with a DHCP reservation rather than re-pointing; a software installation preceded by licence and prerequisite checks, recorded with exact version, and any failed install removed with the proper uninstaller; a pilot group established with versions recorded and business-critical machines excluded from unattended updates; a slow-machine fault worked from free space and startup items; at least one replacement recommendation made with cost, reliability risk and support status stated; and six recurring fault patterns added to the playbook.

## Common mistakes and how to fix them

Working on the printer driver before checking the printer

Fix: Look at the device's own panel first. A large share of reported printer faults are a message on the printer's screen — paused, offline, paper, toner, jam — that nobody looked at.

Re-pointing a client at a printer's new DHCP address

Fix: That works today and breaks at the next renewal. Create a reservation so the printer keeps the same address. The durable fix and the fast fix are different things.

Deleting spool files while the print spooler service is running

Fix: The service holds them, so the deletion does nothing. Stop the service, clear the folder, restart the service — in that order.

Installing software without checking the licence

Fix: Unlicensed software on a business machine creates legal and financial exposure for the company. Verify entitlement first; it is not your decision to make quietly.

Deleting a program folder instead of uninstalling

Fix: It leaves services, drivers and registry entries that block a clean reinstall. Use the proper uninstaller, and use a dedicated removal tool when the uninstaller itself fails.

Pushing updates to all machines at once

Fix: Use a pilot group of three or four machines including one of each model, observe for a few days, then roll out. It costs almost nothing and prevents most update-caused outages.

Allowing unattended updates on a business-critical machine

Fix: A framework update can break the application a shipment depends on. Schedule deliberately and know what is installed before updating.

Heroically repairing a machine that should be replaced

Fix: State the repair cost, the reliability risk to the user's work, and whether it still receives security updates. Recommending replacement with reasons is professional; repeated repair is not.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Diagnose printers along the path, not by preference: application, print subsystem, driver, network, device. The four dividing questions — does it reach the queue, sit there, leave without printing, or print wrongly — cover the entire problem space in about a minute.

- Standardising the software baseline is a support strategy rather than an administrative preference. When every machine is the same, a fault can be compared against a known-good machine, which is the fastest diagnostic available. When every machine is unique, every fault is a research project.

- The pilot group is the highest-value, lowest-cost practice in this session. Three or four machines receiving updates first, including one of each model, eliminates most update-caused outages and turns 'updates broke everything' into 'updates broke one machine we noticed'.

- Learn to recommend replacement with reasons rather than apologising for it. Clients respect a clear statement of cost, risk and support status far more than they appreciate a repair that buys three days on a machine that should have been retired.

## Key termsPrint queueThe operating system's list of pending print jobs. Whether a job reaches it, sits in it, or leaves it determines which part of the print path has failed.Print spoolerThe service managing print jobs. A stuck queue is cleared by stopping the service, clearing the spool folder, and restarting it — in that order.DHCP reservationBinding a fixed address to a device's MAC address. Essential for printers, because a printer configured by address breaks whenever its lease renews.PrerequisiteA runtime, framework or operating system version an application requires. Installing without them produces a broken install that is harder to remove than to avoid.Clean uninstallRemoving an application through its proper uninstaller so no services, drivers or registry entries remain to block a future reinstall.Pilot groupA small set of machines, ideally one of each model, that receive updates before everyone else. The practical version of staged deployment at small scale.Standard baselineThe defined set of applications, versions and configuration every machine should have. It makes faults comparable against a known-good machine.Replacement recommendationA reasoned statement that a device should be retired rather than repaired, covering repair cost, reliability risk and whether it still receives security updates.

## Homework before the next session

Diagnose three real printer faults by path

For each, record the answer to all four dividing questions, what you checked at each layer, and the fix. Note whether any was an address or host-sharing problem rather than a printer problem.

Write your software installation procedure

The licence check, prerequisite check, installation steps, version recording, and removal procedure. One page, written so someone else can follow it without asking you anything.

Establish a pilot group and an update policy

Which machines are in the pilot, how long you observe before rollout, how versions are recorded, and which machines are excluded from unattended updating with the reason stated.

Write one replacement recommendation

For a real machine: repair cost, reliability risk to the specific user's work, support and security-update status, and your recommendation. Written for a manager who has to approve spending.

## Assessment rubric

How this session is marked. The certificate for IT Support is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Printer diagnosis | Got the printer working. | Four dividing questions answered first, queue and device checked before the client, network path tested, and address faults fixed with a reservation rather than re-pointing. |
| Software installation | The application was installed. | Licence and prerequisites checked first, version and location recorded, proper uninstaller used for removal, and the machine compared against the standard baseline. |
| Update management | Updates were applied. | Pilot group established with one of each model, versions recorded so correlation is possible, business-critical machines excluded from unattended updates, and rollout staged. |
| Pattern recognition | Faults were fixed individually. | Recognises the recurring patterns, works each in the correct diagnostic order, and distinguishes intermittent and user-following faults from configuration faults. |
| Replacement judgement | Recommended a repair or replacement. | Weighed repair cost against reliability risk and support status, presented the facts and the risk clearly, and let the business decide rather than deciding silently. |

## Session questionsWhy does the printer work some days and not others?+

Two common causes: its DHCP lease renewed and it now has a different address than the computers are configured for, or it is shared through a host machine that was switched off. Neither is a printer fault, and neither is fixed at the printer.A program will not reinstall after I deleted its folder. Why?+

Deleting the folder leaves services, drivers and registry entries behind, and the installer sees them and refuses. Use the proper uninstaller, or a dedicated removal tool, then reinstall cleanly.An update broke an application. What now?+

Identify which machines received the update — which is only possible if you recorded versions — and roll back or uninstall that update on the affected machines. Then add the application to your pilot group's watch list before the next rollout.How do I justify replacing a machine that still turns on?+

Repair cost against remaining useful life, the reliability risk to that specific user's work, and whether it still receives security updates. Present the facts and the risk and let the business decide — that is a professional recommendation, not a shrug.Is a slow machine always a hardware problem?+

Usually not. Check free disk space and startup programs first — between them they account for most slow-machine calls. Then compare installed memory against the workload, and only then suspect a failing disk.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: User Support](https://www.cea.ng/classes/it-support/user-support)[Next session 5: Documentation](https://www.cea.ng/classes/it-support/documentation-support)

IT Support

3 weeks · 6 sessions · ₦40,000 · you leave with a support playbook[See the full course](https://www.cea.ng/classes/it-support)[Enrol now](https://www.cea.ng/admissions)
