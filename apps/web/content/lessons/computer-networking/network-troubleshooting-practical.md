---
title: "Session 6: Network Troubleshooting Practical"
description: "The final practical: a deliberately broken network, a timed diagnosis under realistic conditions, and the documentation that turns one engineer's knowledge into something the client can rely on."
date: "2026-09-12"
class_slug: "computer-networking"
---

The final practical: a deliberately broken network, a timed diagnosis under realistic conditions, and the documentation that turns one engineer's knowledge into something the client can rely on.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Apply the layered diagnostic method to unknown faults under time pressure

- Work through controlled fault scenarios systematically, changing one thing at a time

- Attribute each fault to the correct layer and the correct device

- Communicate findings clearly to a non-technical client

- Produce documentation that makes the network maintainable by someone else

## The taught content

### Why this session is a practical and not another lecture

Everything so far has been taught on faults you knew about, because we created them together. That is a safe way to learn the tools and it is not how the job works. In the job, somebody tells you the network is slow, or a printer vanished, or the accounts department cannot reach the server, and nobody knows what changed. **The skill is not knowing commands; it is reaching the right conclusion from incomplete information.**

So this session runs as a timed assessment. The network has faults you have not seen, deliberately introduced across the layers — physical, addressing, DHCP, DNS, VLAN, wireless and filtering. You diagnose and repair them, narrating your reasoning, and you are assessed on **method** as much as on outcome. Guessing your way to a fix is not a pass even when it works, because it will not work next time.

This is also the session where the course deliverable is completed: **a small office network you planned, addressed, configured and troubleshot, with the addressing scheme and configuration documented.** You have been building it since session one. Today you prove you can repair it without a map, and you hand over the documentation that makes it somebody else's to maintain.

### The method under pressure: what changes when the client is watching

The four-question sequence from last session still applies, but under pressure two additional disciplines matter. **Narrate what you are doing and why**, even when nobody asks — it keeps your own reasoning honest, it prevents the flailing that time pressure produces, and it gives the client confidence that the work is controlled rather than hopeful. And **record what you change**, because a fault fixed by three simultaneous changes is a fault you cannot explain, repeat, or prevent.

The second discipline is resisting the urge to restart things. A reboot makes many symptoms disappear temporarily, which feels like progress and destroys the evidence. When you restart a device, you lose its uptime, its logs and its current state — precisely the information that would have identified the cause. **Look before you restart.** If a restart is genuinely the fix, the diagnosis should say so and explain why.

Third, and hardest: **stop when you are stuck and say so.** A client would far rather hear 'I have eliminated the physical layer, addressing and DNS, and I am now looking at the routing between VLANs' than watch an hour of random changes. Stating what you have eliminated is genuinely useful information — it narrows the problem for whoever picks it up, and it is an honest account of real progress.

### Reading symptoms: the translation layer between users and faults

Users describe symptoms; engineers need causes. The translation is a skill, and most of it is knowing which questions to ask. **'The internet is slow'** could be a marginal wireless link, a congested channel, a 100-megabit negotiation on a gigabit port, or one machine saturating the connection — four different faults with the same description. **'It works for some people'** is the most useful phrase a user can say, because it points immediately at something user-specific or location-specific rather than a total failure.

The questions that separate causes are consistent. **Who is affected** — everyone, one person, one floor? **What exactly fails** — everything, one site, one application? **When did it start**, and did anything change? **Is it constant or intermittent?** Those four answers eliminate most possibilities before you touch a keyboard, and asking them takes two minutes.

Two patterns are worth memorising. **Intermittent faults are usually physical or wireless** — a marginal cable, a weak signal, interference — because configuration faults tend to fail consistently. And **faults that follow a person are configuration; faults that follow a location are infrastructure.** A user who has problems at every desk has a machine problem; a user who has problems at one desk has a port, cable or coverage problem.

### The fault catalogue you will meet, and where each one lives

Across three weeks we have built a catalogue, and it is worth consolidating because these are the faults that account for most real calls. At the **physical layer**: a damaged pair negotiating 100 megabits, an unseated cable, a data run bundled with power. At **addressing**: a wrong subnet mask making remote networks appear local, a static address colliding with a DHCP allocation, a wrong gateway that leaves local traffic working while everything beyond fails.

At **DHCP**: an exhausted pool, a scope on the wrong VLAN, a self-assigned 169.254 address. At **DNS**: a dead server producing intermittent resolution, a stale setting from a previous configuration. At **switching**: an endpoint on a trunk port, an untagged VLAN mismatch between switch and router, a rogue device on an unsecured spare port.

At **wireless**: a guest SSID landing on the staff VLAN because the switch port is access rather than trunk, channel overlap with a neighbour, coverage that was never measured. And at **filtering**: a rule blocking one protocol, which presents as 'only one website does not work' and is almost never an internet failure. **Knowing which layer a symptom belongs to is most of the diagnosis**, and the rest is confirmation.

### Documentation and handover: the deliverable, and why it is the deliverable

The documentation is not paperwork attached to the project — it is the product the client keeps after you leave. A network that only one person understands is a liability the client is carrying, and the moment you are unavailable it becomes an emergency. What you hand over should let a competent stranger maintain the network without calling you, which is a higher standard than most freelancers meet and a real competitive advantage when you do.

The pack has five parts. **The as-built network diagram**, showing devices, connections, media and VLANs. **The addressing table**, with every network, its range, gateway, purpose and reserved addresses. **The device configuration record** — hostnames, management addresses, port assignments, SSIDs, channels, and where credentials are stored securely. **The diagnostic runbook** from last session. And **the change log**, recording what was done and when, which is what makes the next change safe.

Then the conversation that finishes the project. **Who applies updates, who monitors the network, what happens during an incident, and what a change costs.** Networks need ongoing attention; a client who believes a configured network needs nothing will be surprised, and the surprise will be your reputation. Defining the ongoing relationship in writing protects both of you — and it is where the recurring revenue in this work lives.

## Instructor demonstration

The assessment itself. The instructor breaks the network in ways the student has not seen; the student diagnoses and repairs under time pressure, narrating method, then completes the handover documentation.

### Brief the scenario and the constraints

The accounting practice reports three problems: the accounts department cannot reach the server, visitors cannot connect to Wi-Fi, and one workstation is intermittently slow. Time limit sixty minutes. No hints about what was changed. The client — played by the instructor — will describe symptoms in user language only.02

### Take the report properly before touching anything

Ask the four separating questions: who is affected, what exactly fails, when it started, and whether it is constant or intermittent. Two minutes of questioning here routinely eliminates half the possibilities, and skipping it is the most common way to waste the hour.03

### Establish scope before depth

Determine quickly whether this is everyone or some people, one location or several. Faults that follow a person are configuration; faults that follow a location are infrastructure. This one decision determines which direction the whole investigation goes.04

### Start with the server access fault and run the four-question sequence

From an affected machine: valid address? Gateway reachable? Server address reachable? Name resolves? Narrate each result and what it eliminates. Do not skip steps because you have a suspicion — confirm or eliminate it.05

### Isolate the fault to a layer and state it out loud

Say explicitly: this is an addressing fault, or a routing fault, or a VLAN fault. Naming the layer commits you to a hypothesis and makes the next test purposeful rather than exploratory.06

### Diagnose the VLAN fault

The classic: the switch port feeding the accounts department was moved from access to trunk, or the trunk on the router no longer carries the server VLAN. Verify by checking port mode and the VLAN membership on both ends against your documentation.07

### Repair it and prove the repair

Fix the port mode or VLAN tagging, then confirm from the affected machine that the server is reachable. Prove it, do not assume it — and confirm from a second machine so you know the fix is not specific to one device.08

### Move to the guest Wi-Fi fault

Visitors cannot connect. Test it yourself on a device rather than relying on the description — 'cannot connect' covers wrong passphrase, no DHCP address, and association failure, which are three different faults.09

### Distinguish association failure from DHCP failure

Does the device associate and then fail to get an address, or fail to associate at all? The first is a DHCP or VLAN problem; the second is security settings, signal, or the access point itself. This distinction halves the search space immediately.10

### Find the guest VLAN fault

Commonly the access point's switch port was set to access mode, so the guest SSID has no path to its VLAN and cannot obtain an address. Confirm against the documentation, correct the port mode, and verify a guest receives a 10.10.30.x address.11

### Verify the guest is still isolated after the repair

A repair that reconnects guests to the staff network is worse than the outage. Confirm the guest address cannot reach the server. **Never finish a wireless repair without re-testing the security boundary.**12

### Address the intermittent slowness last, deliberately

Intermittent faults take longest, so handle them after the definite outages. Ask where the machine sits and whether the problem follows the machine or the location — that single answer tells you whether to look at the device or the infrastructure.13

### Measure rather than guess

Ping the gateway fifty times and read loss and latency spread. Check the negotiated link speed. Both take under a minute and between them identify the great majority of intermittent faults.14

### Find the physical fault

The classic: a gigabit port negotiating 100 megabits because of a damaged pair, so the user experiences slowness with no error anywhere. Confirm from the switch port and the operating system, then replace the cable.15

### Verify the fix under real load, not just with a ping

Transfer a large file and observe throughput. A ping that looks fine tells you almost nothing about a throughput problem — test the thing the user actually complained about.16

### Confirm nothing else broke during the repair

Re-run the four-question sequence on a machine from each VLAN, confirm staff, guest and server networks all behave, and re-check the inter-VLAN policy. Repairs cause second faults more often than anyone expects.17

### Report to the client in their language

Three faults, three causes, three fixes, in plain terms — no jargon, no blame. State what was wrong, what you changed, what you verified, and what to watch for. This conversation is assessed alongside the technical work, because it is half the job.18

### Complete the handover pack

As-built diagram, addressing table, device configuration record, diagnostic runbook and change log. Confirm a competent stranger could maintain this network from the pack alone — that is the standard, and it is what the client is paying for.19

### Agree the ongoing arrangement in writing

Who applies changes, who monitors, what happens during an incident, and what a change costs. Networks need continuing attention; a client who expects otherwise will be surprised, and the surprise lands on your reputation.

## Guided practice

### The final practical: diagnose an unknown broken network and hand it over

Work a network with faults you have not seen, under time pressure, using only the method from this course — then produce the complete handover documentation.

1. 01Take the fault report using the four separating questions before touching any equipment.

2. 02Establish whether each fault follows a person or a location, and record what that implies.

3. 03Work the definite outages before the intermittent faults, and say why you are ordering them that way.

4. 04Run the four-question sequence on each fault and narrate what every result eliminates.

5. 05Name the layer you believe is at fault before testing, so your next test is purposeful.

6. 06Change one thing at a time and record every change as you make it.

7. 07Prove each repair from at least two machines rather than assuming the first success generalises.

8. 08After any wireless repair, re-test that guests still cannot reach internal addresses.

9. 09For intermittent faults, measure loss, latency spread and negotiated speed rather than guessing.

10. 10Verify throughput with a real file transfer, not with a ping, when the complaint was about speed.

11. 11Re-test every VLAN after repairs to confirm you have not introduced a second fault.

12. 12Resist restarting devices until you have read their status pages and logs.

13. 13If you get stuck, state clearly what you have eliminated and what you are examining next.

14. 14Report to the client in plain language: what was wrong, what you changed, what you verified.

15. 15Complete the handover pack: as-built diagram, addressing table, device record, runbook, change log.

16. 16Write the ongoing maintenance arrangement in three lines and agree it explicitly.

The standard we hold you to

All introduced faults correctly diagnosed and repaired within the time limit; **method assessed alongside outcome** — the four-question sequence used in order, one change at a time, every change recorded, and the layer named before testing; security boundaries re-verified after wireless repairs; intermittent faults diagnosed by measurement rather than guesswork; all VLANs re-tested after repairs; a plain-language client report delivered; and a complete handover pack that would let a competent stranger maintain the network, plus a written ongoing maintenance arrangement.

## Common mistakes and how to fix them

Touching equipment before taking the fault report

Fix: Two minutes of questioning — who, what, when, constant or intermittent — routinely eliminates half the possibilities. Skipping it is the most common way to waste an hour.

Guessing your way to a fix and calling it a pass

Fix: A fix reached by accident does not generalise. Method is assessed alongside outcome, because the next fault will be different and only the method carries over.

Restarting devices before reading their logs

Fix: A reboot destroys uptime, logs and current state — the exact evidence that identifies the cause. Look first; if a restart really is the fix, your diagnosis should explain why.

Changing several settings at once

Fix: You lose the ability to say what fixed it, and the network ends up in a state nobody can describe. One change, one test, one record — every time.

Finishing a wireless repair without re-testing isolation

Fix: A guest network reconnected to the staff VLAN is worse than the outage it fixed. Re-test that guests cannot reach internal addresses after every wireless change.

Verifying a throughput fix with a ping

Fix: Ping measures reachability and latency, not throughput. If the complaint was speed, transfer a real file and observe the result.

Reporting to the client in technical language

Fix: Say what was wrong, what you changed and what you verified, without jargon and without blame. The client's confidence comes from understanding, and this conversation is half the job.

Handing over with no documentation

Fix: A network only you understand is a liability the client carries. The handover pack is the deliverable — a competent stranger should be able to maintain the network from it alone.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Method is the transferable skill; specific fixes are not. Every fault you meet professionally will be new in its details, and the only thing that carries over is the disciplined sequence: establish scope, run the four questions, name the layer, change one thing, test, record. That is what this assessment is really testing.

- Narrate while you work. It keeps your reasoning honest, it stops the flailing that time pressure produces, and it gives the client visible evidence that the work is controlled. Engineers who work silently look uncertain even when they are not.

- Intermittent faults are almost always physical or wireless, because configuration faults fail consistently. When a client says 'it drops sometimes', reach for a fifty-count ping and a link-speed check before anything else — those two measurements identify most of them.

- The handover pack is what separates a professional from someone who fixed a network. It is also commercial: a documented, maintainable network justifies a maintenance agreement, and the maintenance agreement is where the recurring income in this work actually lives.

## Key termsFault isolationNarrowing a problem to a specific layer and device before attempting a repair. The discipline that makes diagnosis fast rather than exploratory.Symptom translationConverting a user's description into a technical hypothesis by asking who is affected, what fails, when it started, and whether it is constant or intermittent.Controlled fault scenarioA deliberately introduced fault used for training and assessment, so diagnosis can be practised safely and evaluated fairly.Change logA record of what was changed on the network and when. It is what makes the next change safe and what identifies undocumented modifications.As-built diagramThe network diagram updated to reflect what was actually installed, as against the design or the state found at the start of the project.Diagnostic runbookA written procedure for working through common faults, so diagnosis does not depend on one person's memory or presence.Intermittent faultA fault that appears and disappears. Usually physical or wireless in origin, because configuration faults tend to fail consistently.Maintenance arrangementA written agreement covering who applies changes, who monitors, incident response and the cost of changes. It defines the ongoing relationship after handover.

## Homework before the next session

Complete the timed practical

Diagnose and repair all introduced faults within sixty minutes, narrating method throughout and recording every change. Assessed on sequence and reasoning as much as on the outcome.

Deliver the client report

A plain-language account of each fault: what was wrong, what you changed, what you verified, and what to watch for. No jargon, no blame — written for a manager who has never seen a switch.

Submit the complete handover pack

As-built diagram, addressing table, device configuration record with credential storage location, diagnostic runbook, and change log. The test is whether a competent stranger could maintain the network from it alone.

Write your own fault catalogue

Every fault you met in this course, organised by layer, with its symptoms, the test that identifies it, and the fix. This becomes your professional reference and it is worth more than any certification sheet.

## Assessment rubric

How this session is marked. The certificate for Computer Networking is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Diagnostic method | Faults were eventually fixed. | Four-question sequence used in order, layer named before testing, one change at a time, every change recorded, and reasoning narrated throughout. |
| Technical accuracy | Most faults correctly identified. | Every fault attributed to the correct layer and device, repairs verified from multiple machines, and all VLANs re-tested afterwards. |
| Measurement over guesswork | Tools were used. | Intermittent faults diagnosed by loss, latency spread and negotiated speed; throughput verified with a real transfer rather than a ping. |
| Client communication | The client was told it was fixed. | A plain-language report covering cause, change and verification for each fault, with no jargon and no blame, delivered confidently under questioning. |
| Handover documentation | Some notes were provided. | A complete pack — diagram, addressing table, device record, runbook, change log — that would let a competent stranger maintain the network, plus a written maintenance arrangement. |

## Session questionsWhat if I cannot finish within the time limit?+

State clearly what you have eliminated and what you are examining next. A partial diagnosis that has genuinely narrowed the problem is more useful — and better assessed — than a rushed guess that happens to work.Is guessing acceptable if the network ends up working?+

No. Method is assessed alongside outcome, because a fix reached by accident does not generalise to the next fault. The sequence is the skill; the individual fix is not.Should I restart the router during the assessment?+

Only after you have read its status pages and log. A restart destroys the uptime, logs and current state that would identify the cause, and it will mask the fault rather than explain it.How detailed does the handover documentation need to be?+

Detailed enough that a competent stranger could maintain the network without calling you. That is the standard, and meeting it is a genuine competitive advantage because most freelancers do not.What happens after the course ends?+

You have a documented network, a diagnostic runbook and a fault catalogue — the three things that make you employable in IT support and useful to small businesses. The natural next step is the IT Support course, which builds directly on this method.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: Troubleshooting Tools](https://www.cea.ng/classes/computer-networking/troubleshooting-tools)[Course complete Back to Computer Networking](https://www.cea.ng/classes/computer-networking)

Computer Networking

3 weeks · 6 sessions · ₦50,000 · you leave with a working configured network[See the full course](https://www.cea.ng/classes/computer-networking)[Enrol now](https://www.cea.ng/admissions)
