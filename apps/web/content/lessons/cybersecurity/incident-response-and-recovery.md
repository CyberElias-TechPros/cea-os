---
title: "Session 7: Incident Response & Recovery"
description: "The backup that nobody tested is not a backup, and the plan nobody rehearsed is not a plan. This session covers designing and testing real backups, the incident-response sequence when something has already gone wrong, and how to recover a business rather than just a machine."
date: "2026-09-12"
class_slug: "cybersecurity"
---

The backup that nobody tested is not a backup, and the plan nobody rehearsed is not a plan. This session covers designing and testing real backups, the incident-response sequence when something has already gone wrong, and how to recover a business rather than just a machine.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Design a backup scheme that survives ransomware and theft

- Test a restore and understand why an untested backup is not a backup

- Follow a structured incident-response sequence under pressure

- Contain an active compromise without destroying the evidence

- Recover systems and data in the right order

- Run a post-incident review that actually prevents recurrence

## The taught content

### Backups: the only control that beats the worst case

Most controls reduce the likelihood of something going wrong. Backups reduce the **impact** of the worst outcome, which is why they come first in every prioritisation in this course. Ransomware, a failed drive, a stolen laptop, an accidental deletion, a corrupted update — every one of those stops being a catastrophe and becomes an inconvenience if a working backup exists, and stays a catastrophe if it does not.

The standard scheme is **3-2-1**: three copies of your data, on two different kinds of media, with one copy off-site. In practice for a small business that means the working files on the machine, a second copy on an external drive or a network location, and a third in cloud storage. The off-site copy is the part people skip, and it is the part that matters when the premises burn, flood or are burgled — which happens.

Then the part that defeats naive backups: **ransomware encrypts whatever it can reach**, including a mapped network drive and a permanently connected external disk. So the off-site or offline copy must be genuinely separated — a drive that is disconnected when not backing up, or cloud storage with **versioning**, which keeps previous versions so an encrypted or deleted file can be rolled back. A backup that is connected at the moment of infection is just another copy for the ransomware to encrypt.

### Testing: the step that makes it real

An untested backup is a hope, not a control. Drives fail silently, sync jobs stop running after an error nobody read, and the folder that was being backed up is not the folder that mattered. The only way to know is to **restore something and open it**.

Test on a schedule — monthly for a small business is reasonable — and test properly: pick a real file, restore it to a different location, and open it to confirm it is intact and current. Once a quarter, do a larger test: restore a whole folder, or better, boot from the recovery media to confirm the machine itself can be rebuilt. Record the date and result each time, because a log of successful restores is genuinely useful evidence and it catches the month the job quietly stopped.

Also test **what you would do without the machine**. If the laptop is stolen on a Monday, how does the business operate on Tuesday? Knowing the answer in advance — which files are essential, where the credentials live, who to call — is worth more than any single backup, because it turns a crisis into a procedure.

### The incident-response sequence

When something has gone wrong, order matters more than speed, and the sequence is fixed. **Detect and confirm** — establish what is actually happening rather than assuming. A slow machine is not necessarily compromised; a bank alert you did not expect probably is. **Contain** — stop the damage spreading: disconnect the affected machine from the network, disable the compromised account, change the credentials from a clean device, revoke active sessions.

Then **assess** — what was affected, what data was involved, what is the exposure. Then **eradicate** — remove the cause: the malware, the attacker's access, the vulnerability they used. Then **recover** — restore systems and data in the right order, which section five covers. Then **review**, which most people skip and which is the only part that prevents the next one.

Two rules govern the whole sequence. **Do not power off a machine you suspect is actively compromised** if you may need evidence — a shutdown can destroy volatile data, and for a business facing a fraud claim or a police report, that evidence matters. Suspend or disconnect it from the network instead. And **do not rush to rebuild**, because rebuilding before you understand the entry point means rebuilding the same vulnerability, and you will be back here in a month.

### Containing without destroying evidence

Containment is about stopping the spread while preserving what you may need. **Disconnect from the network** — pull the cable or disable Wi-Fi — which stops lateral movement and stops data leaving, without destroying anything on the disk. **Do not shut down** unless you must; volatile memory holds running processes and network connections that are gone forever at power-off.

**Change credentials from a clean device**, not from the compromised one, because a keylogger there will simply capture the new password. **Revoke active sessions** across email and social accounts, because an attacker holding a session token keeps access after a password change. **Disable the account** if a staff member's credentials are involved, rather than only changing the password.

Then **preserve what you have**: photograph any error message or ransom note, note the times of what happened, and if the incident involves money or a customer's data, keep the machine aside rather than wiping it. In Nigeria, financial fraud should be reported to the platform and to the police, and the **EFCC** handles financial crime; a preserved machine and a documented timeline are what make a report useful rather than anecdotal.

### Recovery and the review that prevents the next one

Recovery has an order, and getting it wrong wastes days. **Restore the essentials first** — whatever the business needs to trade: the customer list, the order records, the communication channels. Not everything at once. **Verify each restore** by opening the files before you rely on them, because a restore that silently failed is worse than none, since you believe you are safe. **Rebuild rather than clean** where the machine was compromised: recover the data, verify it, then install fresh, because a cleaned machine is probably fine and a rebuilt one is known to be fine.

Then change every credential that was on the affected machine, revoke sessions, and only reconnect it once it is clean and updated. **Confirm the vulnerability is closed** — the pirated software removed, the router password changed, the two-factor enabled — before considering the incident over. Recovering without closing the entry point is how the same incident happens again.

Finally, **review**. Write down what happened, how it got in, what worked, what did not, and what you will change. Then make those changes: the backup that was missing, the two-factor that was never enabled, the staff member who needs ten minutes of explanation. Most incidents are not sophisticated; they are an unpatched system, a reused password or a clicked link. The review is where a bad week becomes a permanently better setup, and skipping it is the most expensive omission in this entire course.

## Instructor demonstration

The instructor sets up a 3-2-1 backup with an offline copy, tests a restore, then runs a full simulated incident — detection, containment without shutdown, credential and session revocation, assessment, rebuild, and a written review.

### Explain why backups come first

Show that most controls reduce likelihood while backups reduce the impact of the worst case. Explain that this is why they top every prioritisation in the course.02

### Set up the 3-2-1 scheme

Configure working files, a second local copy, and a cloud copy. Explain that the off-site copy is the one people skip and the one that matters when premises are lost.03

### Show why a connected backup fails

Demonstrate that a mapped drive or permanently attached disk is reachable by ransomware. Explain that the third copy must be disconnected or versioned.04

### Enable versioning

Configure cloud versioning and show rolling a file back to a previous version. Explain that this is what defeats encryption and accidental deletion.05

### Test a restore properly

Restore a real file to a different location and open it. Explain that a backup nobody has restored is a hope rather than a control.06

### Test a larger recovery

Restore a whole folder and boot from recovery media. Explain that confirming the machine can be rebuilt is a different test from confirming a file exists.07

### Detect and confirm

Take a reported symptom and establish what is actually happening before acting. Explain that assuming wastes time in both directions.08

### Contain without shutting down

Disconnect the network and leave the machine powered. Explain that shutdown destroys volatile evidence that a fraud report may need.09

### Change credentials from a clean device

Demonstrate changing the password from a different machine and explain that changing it on a compromised one simply feeds a keylogger.10

### Revoke sessions and disable the account

Sign out all active sessions and disable a staff account rather than only changing its password. Explain why a session token survives a password change.11

### Preserve the evidence

Photograph the ransom note, record the timeline, and set the machine aside. Explain what makes a police or EFCC report useful rather than anecdotal.12

### Recover in order and verify

Restore the essentials first, open files to confirm integrity, then rebuild the machine rather than cleaning it. Confirm the entry point is closed before reconnecting.13

### Write the review

Document what happened, how it entered, what worked and what will change. Explain that skipping this is the most expensive omission in the course.

## Guided practice

### Build and test backups, then run a full incident

You design and implement a 3-2-1 backup for a real business with a genuinely offline or versioned third copy, test restores at two scales, then run a complete simulated incident from detection through containment, assessment, recovery and a written review.

1. 01List the data the business would genuinely lose money without.

2. 02Implement the 3-2-1 scheme: working files, a second local copy, and a cloud copy.

3. 03Ensure the third copy is disconnected when not backing up, or has versioning enabled.

4. 04Confirm the backup covers the folders that actually matter, not a convenient subset.

5. 05Restore a single real file to a different location and open it to confirm integrity.

6. 06Restore a whole folder and record the time it took.

7. 07Boot from recovery media and confirm the machine can be rebuilt.

8. 08Record the date and result of each test in a log.

9. 09Write what the business would do on day one without the machine.

10. 10Run the simulated incident: confirm what is actually happening before acting.

11. 11Contain by disconnecting the network without powering off, and explain why.

12. 12Change credentials from a clean device and revoke all active sessions.

13. 13Preserve evidence: photograph messages, record the timeline, set the machine aside.

14. 14Recover the essentials first, verifying each restore by opening files.

15. 15Rebuild the machine rather than cleaning it, and close the entry point before reconnecting.

16. 16Write the review: cause, what worked, what did not, and the specific changes to make.

The standard we hold you to

A working 3-2-1 backup with a genuinely offline or versioned third copy, restores tested at file and folder scale with results logged, recovery media confirmed bootable, and a full incident run in the correct order — containment without shutdown, credentials changed from a clean device, sessions revoked, evidence preserved, essentials restored first and verified, machine rebuilt, entry point closed, and a written review naming specific changes.

## Common mistakes and how to fix them

Your only backup is on a drive that stays connected

Fix: Ransomware encrypts whatever it can reach, including mapped drives and attached disks. The third copy must be disconnected when not backing up, or held in cloud storage with versioning.

You have never restored anything

Fix: Test monthly: restore a real file elsewhere and open it. Drives fail silently and sync jobs stop after an unread error, so an untested backup is a hope rather than a control.

You backed up a convenient folder rather than the important one

Fix: Verify the backup covers what actually matters. A backup of the wrong directory is indistinguishable from no backup until the moment you need it.

You shut down a compromised machine immediately

Fix: Disconnect the network and leave it powered. Shutdown destroys volatile evidence that a fraud report or a police investigation may need, and it can also complicate understanding what happened.

You changed the password on the compromised machine

Fix: Change credentials from a clean device. A keylogger on the affected machine will simply capture the new password, and you will believe you have secured the account when you have not.

You changed the password but left sessions active

Fix: Revoke all active sessions. An attacker holding a session token keeps access regardless of the new password, and this is the step most people omit.

You rebuilt the machine without closing the entry point

Fix: Remove the pirated software, change the router password, enable two-factor — whatever let the attacker in — before reconnecting. Otherwise you have rebuilt the same vulnerability and will be back in a month.

You never wrote the review

Fix: Document the cause, what worked, what did not and what changes. Most incidents are an unpatched system, a reused password or a clicked link, and the review is where a bad week becomes a permanently better setup.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Test a restore every month and log the result. It is the only way to know the backup works, and the log is what catches the month the job quietly stopped — which is far more common than people assume.

- Keep the third backup copy disconnected or versioned, without exception. A backup that is online at the moment of infection is simply another copy for the ransomware to encrypt, and this is the mistake that turns a survivable incident into a business-ending one.

- Disconnect rather than shut down when containing a suspected compromise. Preserving volatile evidence costs nothing and may be the difference between a usable fraud report and an anecdote.

- Always write the review, even for a small incident. Most compromises are mundane — an unpatched system, a reused password, a clicked link — and the review is the only part of the process that stops the next one.

## Key terms3-2-1 backupThree copies, on two media types, with one off-site. The standard scheme for surviving the worst case.VersioningCloud storage keeping previous file versions, allowing rollback after encryption or deletion.Offline copyA backup disconnected when not in use, so ransomware cannot reach it.Restore testRestoring a real file and opening it. The only proof a backup works.ContainmentStopping an incident spreading — disconnect, disable, revoke — without destroying evidence.Volatile evidenceData in memory that is lost at power-off. Why you disconnect rather than shut down.EradicationRemoving the cause — malware, attacker access, the exploited vulnerability.Post-incident reviewThe written analysis of cause and response, producing specific changes. The only part that prevents recurrence.

## Homework before the next session

Implement 3-2-1 for your own data

Working files, a second local copy, and a cloud copy with versioning. Confirm the third copy is genuinely unreachable by malware on your machine.

Test a restore today

Restore a real file to a different location and open it. Then restore a whole folder and time it. Record both results and the date.

Write your day-one-without-the-machine plan

What the business does if the laptop is stolen on a Monday: which files are essential, where credentials live, who to call. Most people have never written this.

Write an incident-response card

Confirm, contain without shutdown, change credentials from a clean device, revoke sessions, preserve evidence, assess, recover essentials first, close the entry point, review. Keep it reachable.

## Assessment rubric

How this session is marked. The certificate for Cybersecurity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Backup design | Has some backup. | A 3-2-1 scheme covering the data that matters, with the third copy disconnected or versioned so ransomware cannot reach it. |
| Testing | Believes the backup works. | Restores tested at file and folder scale, recovery media confirmed bootable, and every test dated and logged. |
| Incident sequence | Would react sensibly. | Follows detect, contain, assess, eradicate, recover, review in order, and does not rush to rebuild before understanding the entry point. |
| Containment discipline | Would change a password. | Disconnects without shutting down, changes credentials from a clean device, revokes sessions, disables accounts, and preserves evidence. |
| Recovery and review | Restores the data. | Restores essentials first, verifies each by opening files, rebuilds rather than cleans, closes the entry point, and produces a written review naming specific changes. |

## Session questionsIs cloud backup enough on its own?+

It is a good third copy but not sufficient alone. You need a local copy for fast recovery of large amounts of data, and the cloud copy must have versioning so an encrypted or deleted file can be rolled back. 3-2-1 exists because no single copy is enough.How often should I test my backups?+

Restore a real file monthly and do a larger folder or full-machine test quarterly. Log each result. The log is what reveals the month the backup job quietly stopped, which is far more common than a dramatic failure.Should I turn off a machine I think is compromised?+

Disconnect it from the network and leave it powered. Shutting down destroys the volatile evidence — running processes, active connections — that a fraud report or police investigation may need. Power off only if you have no alternative.My business was hit by ransomware. Do I pay?+

Generally no. Payment does not guarantee recovery, it funds the operation, and it marks you as someone who pays. Restore from your backup. If you have no backup, take specialist advice before deciding — and let that be the last time you have no backup.What should I report, and to whom?+

Report financial fraud to the platform involved and to the police, and consider the EFCC for financial crime in Nigeria. Reporting rarely recovers money on its own, but it creates a record that matters for any bank claim, and preserve the machine and timeline so the report is useful.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session6: Encryption & Web Security](https://www.cea.ng/classes/cybersecurity/encryption-and-web-security)[Next session 8: Policies, Risk & Final Project](https://www.cea.ng/classes/cybersecurity/policies-risk-and-final-project)

Cybersecurity

4 weeks · 8 sessions · ₦50,000 · you leave with a security assessment report[See the full course](https://www.cea.ng/classes/cybersecurity)[Enrol now](https://www.cea.ng/admissions)
