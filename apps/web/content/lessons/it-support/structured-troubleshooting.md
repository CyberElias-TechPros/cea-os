---
title: "Session 2: Structured Troubleshooting"
description: "The method that makes diagnosis repeatable: reproducing the problem, isolating the cause by elimination, testing the fix properly, and confirming with the user — applied to the faults you will actually meet."
date: "2026-09-12"
class_slug: "it-support"
---

The method that makes diagnosis repeatable: reproducing the problem, isolating the cause by elimination, testing the fix properly, and confirming with the user — applied to the faults you will actually meet.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Reproduce a problem reliably before attempting to fix it

- Isolate causes by systematic elimination rather than by trying likely fixes

- Distinguish a fix from a workaround, and know when each is appropriate

- Test a fix in a way that proves it rather than assumes it

- Confirm with the user and close the loop so faults do not return

## The taught content

### Why method beats experience, at least at first

Experienced support people often diagnose quickly by intuition, and it is tempting to imitate that. It is also a trap, because their intuition is compressed experience you do not have yet, and imitating the speed without the knowledge produces confident guessing. **Method is what you use until you have earned the intuition**, and it remains useful afterwards for anything unfamiliar.

The method has five stages and we will work through them all: **reproduce, isolate, fix, test, confirm.** Each exists because skipping it has a specific cost. Skipping reproduction means you fix something you cannot verify. Skipping isolation means you change several things and never learn which mattered. Skipping testing means you hand back a machine that appears fixed. Skipping confirmation means the fault returns next week and takes your credibility with it.

There is also a psychological benefit worth naming. Under pressure — a user watching, a manager asking how long — a method keeps you moving purposefully instead of flailing. **Narrating the stage you are in is both a diagnostic discipline and a communication tool**, because it tells the user something controlled is happening even when the answer is not yet known.

### Reproducing the problem: the stage everyone rushes and nobody should

You cannot fix what you cannot make happen, and a fault you cannot reproduce is a fault you cannot verify. Reproduction means making the problem occur **on demand, in front of you, with the same symptoms the user described**. It sounds trivial and it is where most misdiagnosis begins, because the user's description and the actual behaviour frequently differ.

The questions that produce reproduction are specific. **What exactly were you doing?** Not 'using the computer' — which file, which application, which button. **Does it happen every time or sometimes?** **Does it happen for other people?** **Has anything changed recently — an update, a new program, a move to a different desk?** That last question catches a remarkable share of faults, because 'it worked yesterday' almost always has a cause and the cause is usually a change.

Two situations need particular care. An **intermittent** fault cannot be reproduced on demand, so you shift to measurement and monitoring rather than repetition — check logs, watch resource usage, and gather evidence over time. And a fault that **only happens for the user** and not for you points at something user-specific: their profile, their permissions, their machine, or their technique. **When it works for you and fails for them, the difference between you is the diagnosis** — that single idea resolves a large fraction of support calls.

### Isolating the cause: elimination, not inspiration

Isolation is the heart of troubleshooting and it works by **removing possibilities**, not by guessing solutions. The most useful framing is the one from networking: **which layer is failing?** Hardware, operating system, application, user profile, network, or permissions. Naming the layer narrows everything that follows and stops you trying application fixes for a hardware fault.

The three tests that do most of the isolating are worth memorising. **Another user on the same machine** — if it works for them, the fault is user-specific: profile, permissions, or their data. **The same user on another machine** — if it works there, the fault is machine-specific: hardware, drivers, or local configuration. **The same action on another application** — if printing fails from one program but works from another, the fault is in that program, not the printer. Three tests, and between them they locate most faults.

Then the discipline that makes isolation real: **change one thing at a time.** Every change is a variable, and two simultaneous changes mean you cannot attribute the result. It feels slow and it is faster, because a fix you understand can be repeated, documented and taught, while a fix that happened to work after four changes cannot. When you must test several hypotheses, test them **sequentially and record each result** — including the failures, which is what turns a diagnosis into a playbook entry.

### Fixing: the difference between a fix and a workaround, and why it matters

A **fix** removes the cause. A **workaround** avoids the symptom while the cause remains. Both are legitimate, and knowing which you have applied is what makes you trustworthy. Restarting a machine that freezes every afternoon is a workaround; finding the failing disk or the memory leak is the fix. Neither is wrong, but recording a workaround as a fix guarantees the call comes back.

Sometimes a workaround is the **correct** professional choice, and you should be able to argue for it. If a user has a deadline in an hour and the root cause needs an hour to diagnose, restore their ability to work first, log the underlying fault as an open ticket, and return to it. **Business continuity can legitimately outrank root-cause analysis** — provided you say so explicitly and the underlying issue stays on the list rather than being quietly forgotten.

Two related habits. **Do not apply a fix you cannot explain** — if you are not sure why it worked, say so and keep the ticket open, because an unexplained fix will recur in a form you do not recognise. And **check whether the same fault exists elsewhere**: if one machine has a failing disk from a bad batch, or one user's profile is corrupt from a bad update, the pattern is usually not unique. That check is what turns reactive support into something closer to prevention.

### Testing and confirming: proving it, and closing the loop

Testing is not 'it seems fine now'. It is **performing the exact action that failed, under the same conditions, and observing the result**. If printing failed from a specific document, print that document. If the application crashed when opening a particular file, open that file. Testing something adjacent proves nothing, and this is where support people most often deceive themselves honestly.

Then confirm with the **user**, not with yourself. You have context they do not — you know what you changed and you may unconsciously avoid the path that fails. Have them perform the action, ideally while you watch, and ask the question that catches the residual problem: **is it doing anything else that is not right?** A surprising number of 'fixed' tickets come back because a second symptom was present all along and nobody asked.

Finally, close the loop properly. Record the cause, the fix, and whether it was a fix or a workaround. Tell the user what happened in one sentence they can understand — not because they need the technical detail, but because **an explained fix builds the trust that gets you better information next time**. And check whether the same fault needs recording in the playbook, because a fault you solved once and documented is a fault that takes five minutes next time instead of fifty.

## Instructor demonstration

We work four real faults through all five stages — reproduction, isolation, fix, test, confirm — including one intermittent fault and one that only affects a single user.

### Take the first fault: the customs software closes on opening

Log it before touching anything. Record the user's exact words — 'it just closes when I click Open' — because 'closes', 'freezes' and 'shows an error' point at different causes and paraphrasing destroys that evidence.02

### Stage one: reproduce it

Sit at the machine and do exactly what the user did. Confirm the same symptom occurs. If it does not reproduce, stop and go back to the questions — do not start changing things on a machine that currently works.03

### Ask what changed recently

An update, a new program, a moved cable, a changed password. 'It worked yesterday' almost always has a cause, and the cause is usually a change. This one question resolves a large share of faults before any testing.04

### Stage two: isolate by layer — name it out loud

Hardware, operating system, application, profile, network, or permissions? Say which you suspect and why. Naming the layer makes the next test purposeful instead of exploratory.05

### Run the three isolating tests

Another user on this machine. This user on another machine. The same action in another application. Between them these locate most faults, and they take minutes rather than hours.06

### Interpret the results rather than reacting to them

If it works for another user, the fault is user-specific — profile, permissions or their data. If it works on another machine, it is machine-specific. State the conclusion before changing anything, so the change is a test of a hypothesis.07

### Change one thing, and only one thing

Apply the single change your isolation points to. Resist bundling a second 'while I am here' change — it destroys your ability to attribute the result and it is the most common way diagnoses go wrong.08

### Stage three and four: apply the fix and test the exact failing action

Open the customs software the way the user does, with their file. Testing something adjacent proves nothing. If the fault was opening a specific document, open that document.09

### Stage five: confirm with the user

Have them perform the action while you watch. Then ask the question that catches residual problems: is it doing anything else that is not right? A second symptom present all along is why 'fixed' tickets come back.10

### Record it as fix or workaround, explicitly

If you rebuilt a profile rather than finding the corruption's cause, that is a workaround and the ticket says so. Recording a workaround as a fix guarantees the call returns, usually at the worst moment.11

### Take the second fault: printing fails from one application

Reproduce it, then apply the third isolating test — print from a different program. If it prints from Notepad but not from the customs software, the fault is in that program's print path, not the printer. This reframes the whole job.12

### Take the third fault: an intermittent freeze

This one cannot be reproduced on demand, so the method adapts rather than stops. Shift to measurement: check the system event log for the freeze times, and look for a pattern in what was running.13

### Gather evidence over time instead of guessing

Note the times, check resource usage, and look for a repeating trigger. Intermittent faults are almost always caused by something periodic — a scheduled task, a backup, a temperature threshold — so look for the cycle.14

### Take the fourth fault: only one user is affected

Works for you, fails for them. Apply the principle directly: the difference between you is the diagnosis. Compare profile, permissions, mapped drives and installed software between the two accounts.15

### Check whether the fault exists elsewhere

If one machine has a failing disk or one profile is corrupt from an update, ask whether others share the batch or the update. Reactive support becomes preventive when you check the pattern instead of only the instance.16

### Review all four tickets against the five stages

For each, confirm you can point to where you reproduced, isolated, fixed, tested and confirmed. Any stage you skipped is where the fault is most likely to return, and naming it honestly is part of the discipline.17

### Add all four to the playbook

Symptoms in the user's words, the isolating tests that identified the cause, the specific change made, how it was tested, and whether it was a fix or a workaround. That structure is what makes an entry reusable by someone else.

## Guided practice

### Work four faults through all five stages

Take four real faults — including one intermittent and one affecting a single user — and work each through reproduction, isolation, fix, testing and user confirmation, recording every stage.

1. 01Log each fault before investigating, preserving the user's exact description of the symptom.

2. 02Ask what changed recently, and record the answer even if it seems irrelevant.

3. 03Reproduce each fault on demand before changing anything; if it will not reproduce, say so and switch to measurement.

4. 04Name the suspected layer out loud for each fault before running any test.

5. 05Run the three isolating tests: another user on the same machine, same user on another machine, same action in another application.

6. 06State your conclusion from the isolation results before applying any change.

7. 07Change exactly one thing per attempt and record the result, including failures.

8. 08Distinguish clearly in your notes between a fix and a workaround, and justify any deliberate workaround.

9. 09Test the exact action that failed, under the same conditions, rather than something adjacent.

10. 10Have the user perform the failing action and record their confirmation.

11. 11Ask whether anything else is not quite right, and record the answer.

12. 12For the intermittent fault, gather evidence over time and look for a periodic trigger.

13. 13For the single-user fault, identify the specific difference between the working and failing accounts.

14. 14Check whether the same fault exists on other machines or accounts.

15. 15Add all four to your playbook with symptoms, isolating tests, specific change, test method, and fix-or-workaround status.

The standard we hold you to

Four faults each worked through all five stages with every stage recorded; the user's own words preserved; the suspected layer named before testing; the three isolating tests applied and interpreted before any change; exactly one change per attempt; fix and workaround distinguished explicitly; the exact failing action retested under original conditions; user confirmation captured along with an answer to 'anything else not right'; the intermittent fault handled by measurement with a periodic trigger sought; the single-user fault resolved by identifying the account difference; a check for the same fault elsewhere; and all four added to the playbook.

## Common mistakes and how to fix them

Changing things on a fault you have not reproduced

Fix: You cannot verify a fix for a problem you cannot make happen. Reproduce first; if it will not reproduce, gather evidence rather than experimenting on a working machine.

Paraphrasing the user's description of the symptom

Fix: Preserve their words. 'It closes', 'it freezes' and 'it shows an error' are different faults, and your interpretation destroys that evidence before you have used it.

Applying several changes at once

Fix: You lose the ability to say which mattered, and an unattributable fix cannot be documented or repeated. One change, one test, one record.

Recording a workaround as a fix

Fix: A restart that clears an afternoon freeze is a workaround. Label it as such and keep the underlying fault open, or the call returns at the worst possible moment.

Applying a fix you cannot explain

Fix: If you do not know why it worked, say so and keep the ticket open. An unexplained fix recurs in a form you will not recognise, and you will have no notes to work from.

Testing something adjacent to the failure

Fix: Perform the exact action that failed under the same conditions. Printing a different document proves nothing about the document that failed.

Confirming the fix yourself instead of with the user

Fix: You have context they do not and may unconsciously avoid the failing path. Have them do it while you watch, and ask whether anything else is wrong.

Fixing the instance without checking the pattern

Fix: If one disk is failing from a bad batch or one profile is corrupt from an update, others probably share it. Checking the pattern is what turns reactive support into prevention.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- When it works for you and fails for the user, the difference between you is the diagnosis. Compare profile, permissions, mapped drives and installed software. This single principle resolves a large fraction of support calls and it is the first thing experienced support people check.

- Ask what changed recently, every single time. 'It worked yesterday' almost always has a cause, and the cause is usually a change — an update, a new program, a moved cable, a changed password. One question, and it frequently ends the investigation before testing begins.

- A deliberate workaround can be the right professional decision. If a user has a deadline, restore their ability to work first and keep the root cause as an open ticket — provided you say so explicitly. Business continuity legitimately outranks root-cause analysis when you are honest about the trade.

- Write your tickets as though the next reader is you in six months with no memory of the job, because frequently it is. The faults that took you an hour today should take five minutes next time, and the only mechanism that makes that true is what you wrote down.

## Key termsReproductionMaking a fault occur on demand with the same symptoms the user described. Without it you cannot verify a fix, so it comes before any change.IsolationNarrowing a fault to a layer and a component by removing possibilities, rather than by trying likely fixes in order of preference.The three isolating testsAnother user on the same machine, the same user on another machine, and the same action in another application. Between them they locate most faults.Intermittent faultA fault that cannot be reproduced on demand. Handled by measurement and log review rather than repetition, looking for a periodic trigger.WorkaroundA change that avoids the symptom while the cause remains. Legitimate when business continuity requires it, provided it is labelled and the underlying fault stays open.Root causeThe underlying reason a fault occurs, as against the symptom it produces. Fixing symptoms without finding causes guarantees recurrence.User confirmationHaving the user perform the failing action and confirm the result, plus asking whether anything else is wrong. Catches the residual second symptom.Single change disciplineApplying one change per attempt and recording the result, so any improvement can be attributed to a known cause and therefore documented and repeated.

## Homework before the next session

Work four real faults through all five stages

Each with reproduction, isolation, fix, testing and user confirmation recorded separately. Include one intermittent fault handled by measurement and one single-user fault resolved by comparing accounts.

Practise the three isolating tests

On any fault, run all three tests even when you think you already know the answer, and write down what each one told you. The value is in learning what the results mean before you are under pressure.

Distinguish your fixes from your workarounds

Review your tickets and label each resolution as a fix or a workaround. For every workaround, open or confirm an underlying-fault ticket so nothing is quietly forgotten.

Add four entries to your playbook

Each with symptoms in the user's words, the isolating tests used, the specific change, the test method, fix-or-workaround status, and the point at which it should be escalated.

## Assessment rubric

How this session is marked. The certificate for IT Support is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Reproduction discipline | Confirmed the fault before fixing. | Reproduced on demand with the user's exact words preserved, asked what changed recently, and switched to measurement when a fault would not reproduce. |
| Isolation method | Found the cause eventually. | Named the layer before testing, ran the three isolating tests, interpreted the results, and applied the three-user/machine/application comparisons correctly. |
| Change discipline | The fault was fixed. | One change per attempt, every result recorded including failures, and fix clearly distinguished from workaround with any deliberate workaround justified. |
| Verification | It appeared to work afterwards. | The exact failing action retested under original conditions, and the user performed it while asked whether anything else was wrong. |
| Knowledge capture | Notes were written. | Tickets written for a reader with no memory of the job, ruled-out findings included, pattern checked elsewhere, and all four faults added to the playbook. |

## Session questionsWhat if I cannot reproduce the fault at all?+

Stop changing things and start measuring. Check the event log for the times it happened, look at resource usage, and hunt for a periodic trigger. A fault you cannot reproduce is diagnosed with evidence gathered over time, not by experiment.Is it acceptable to restart the machine first?+

As a diagnostic step, sometimes — it can tell you whether the fault is persistent. But it destroys the current state and the evidence in it, so look at logs first, and if the restart clears the symptom, label it a workaround and keep investigating.How do I handle a user who cannot describe the problem?+

Watch them do it rather than asking them to explain. Ask them to show you the exact clicks, and note where they hesitate. Most 'vague' reports become precise the moment you observe the actual behaviour.Why does it work when I do it and fail for the user?+

Because the difference between you is the diagnosis — profile, permissions, mapped drives, installed software, or technique. Compare the two accounts systematically; that comparison resolves a large share of support calls.When should I escalate instead of continuing?+

When you have isolated the layer and the fix is beyond your access or authority, when the fault affects a business-critical system and time is running out, or when you have made no progress after a defined period. Escalating with your findings recorded is professional; escalating with nothing written is not.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: How Support Works](https://www.cea.ng/classes/it-support/how-support-works)[Next session 3: User Support](https://www.cea.ng/classes/it-support/user-support)

IT Support

3 weeks · 6 sessions · ₦40,000 · you leave with a support playbook[See the full course](https://www.cea.ng/classes/it-support)[Enrol now](https://www.cea.ng/admissions)
