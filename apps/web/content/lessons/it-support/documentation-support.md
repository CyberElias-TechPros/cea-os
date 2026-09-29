---
title: "Session 5: Documentation"
description: "The work that makes support survive your absence: knowledge base articles that people actually use, ticket notes that help the next person, and asset records that answer questions before they are asked."
date: "2026-09-12"
class_slug: "it-support"
---

The work that makes support survive your absence: knowledge base articles that people actually use, ticket notes that help the next person, and asset records that answer questions before they are asked.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Write knowledge base articles that a non-technical user can follow unaided

- Write ticket notes that transfer knowledge rather than just closing a job

- Build and maintain asset records that make diagnosis faster

- Understand why documentation is a commercial asset, not an administrative chore

- Keep documentation alive rather than letting it rot after launch

## The taught content

### Documentation is the difference between a support person and a support function

Everything you have learned so far lives in your head, and that is precisely the problem. A support operation that depends on one person's memory is fragile: it stops when you are on leave, it degrades when you are busy, and it vanishes when you leave. **Documentation is what converts your knowledge into the organisation's knowledge**, and it is the single clearest marker of a professional support person.

There is also a selfish argument worth making, because it is true. **Every fault you document is a fault that takes five minutes next time instead of fifty** — including when the next time is you, six months from now, with no memory of the job. Support people who do not document work just as hard in year three as in year one. Support people who document get faster, and the speed is visible to everyone around them.

And commercially: a documented support function can be handed over, staffed, and sold. An undocumented one cannot be scaled beyond you. When you pitch a support contract to a small business, **the playbook you produce in this course is the artefact that demonstrates you understand the job** — far more convincingly than any claim about your technical ability.

### Knowledge base articles: written for the reader, not for you

A knowledge base article has one job: **let somebody solve the problem without you.** That standard sounds simple and it governs every decision about how you write. The most common failure is an article written from the author's knowledge rather than the reader's ignorance — it skips the step the author considers obvious, which is exactly the step the reader cannot perform.

The structure that works is consistent. **A title phrased as the user's problem**, not as the technical cause: 'Printer says offline' rather than 'Print spooler reset procedure', because that is what somebody will search for. **A one-line statement of the symptom** so readers confirm they are in the right place. **What you will need** — including anything non-obvious, like administrator access. **Numbered steps, one action per step**, each short enough to perform while reading. **What to do if it does not work**, which is the section most articles omit and the one that prevents a failed self-service attempt becoming an angry call.

Then the two disciplines that separate useful articles from decoration. **Test the article on somebody who does not know the answer**, and watch where they hesitate — every hesitation is a missing step. And **write in the user's language**, which for a knowledge base means no jargon at all, since the reader may have no support person available to translate. An article a user cannot follow is not a partial success; it is a document that will not be used and a call you will still receive.

### Ticket notes: written for the next person, who is often you

Ticket notes are the most neglected documentation in support, because they are written at the moment you are busiest and for an audience you cannot see. But they are the record that lets a colleague pick up your open tickets when you are absent, that lets you resume a problem after a week, and that reveals a recurring fault across dozens of separate incidents.

The habit that matters most was introduced earlier and bears repeating because it is what separates professionals: **record what you ruled out, not only what you did.** 'Checked disk space, 40 GB free. Checked licence, valid. Tried second user account, works.' Those three lines save the next person thirty minutes, because they will not repeat your dead ends. Notes that say only 'reinstalled, fixed' transfer nothing at all.

Three further habits. **Write while it is fresh** — accuracy decays within hours, and a note written at day end is a reconstruction rather than a record. **Note the environment**, because 'Windows 10, version 22H2, machine GF-014' turns an anecdote into a pattern when the same fault appears on five other machines with the same version. And **state whether it was a fix or a workaround**, because a workaround recorded as a fix guarantees the call returns and the next person starts from a false premise.

### Asset records: the documentation that prevents questions being asked

An **asset record** is a register of what the organisation owns: each machine, its user, its specification, its operating system version, its purchase date, its warranty status, and its role. It sounds administrative, and it is one of the most useful things you can build in your first month, because it answers questions that otherwise interrupt your day dozens of times.

Its diagnostic value is immediate and underappreciated. When three machines fail the same way, an asset record tells you they are the same model, bought in the same batch, running the same operating system version — which converts three mysteries into one pattern with one cause. **Without a register you cannot see correlation**, and correlation is what turns reactive support into something closer to prevention.

It also carries financial and security weight. Warranty status tells you whether a repair is free or chargeable, which changes the replacement conversation entirely. Purchase date tells you when a machine is approaching end of life. And knowing exactly what software is licensed against what hardware is what protects the business in a licensing enquiry. **Keep it current** — an asset record that is six months stale is worse than none, because people trust it and act on wrong information.

### Keeping documentation alive: the part everyone skips

Documentation fails in a predictable way. It is written carefully at the start, then the environment changes — a new printer, a new software version, an office move — and the documents quietly stop being true. Six months later nobody trusts them, and the organisation reverts to asking whoever knows. **Rot, not absence, is the normal failure mode of documentation.**

The defence is procedural rather than heroic. **Update the article when you close the ticket that invalidates it** — the moment you discover a step is wrong is the moment you are best placed to correct it, and it takes a minute then versus an investigation later. **Review the top ten articles quarterly**, since a small number of articles account for most usage and those are the ones worth keeping accurate. And **record what people actually search for and cannot find**, because a gap in the knowledge base is a support call you will keep receiving.

Finally, make it findable. The best-written article in an unsearchable folder does not exist. **One obvious location, searchable, with titles phrased as users' problems.** If users cannot find it in ten seconds they will message you instead, and you will have written it for nobody. **Findability is a design requirement, not a nice-to-have.**

## Instructor demonstration

We build the documentation layer for the freight company: a knowledge base with tested articles, ticket notes that transfer knowledge, and an asset register that turns three separate faults into one pattern.

### Find out what people already do when they have a problem

Ask five users how they would look something up. If the answer is 'message you', that is the gap you are filling, and knowing it shapes how you write and where you put things.02

### Choose one searchable location and commit to it

A shared drive folder, a simple wiki, or a shared document — the tool matters far less than there being exactly one obvious place. Documentation in two locations is documentation in no location.03

### Identify the ten most common faults from your tickets

Count them from the queue you have been keeping. You are writing the ten articles users actually need, not the ten you find interesting — and the count is evidence for the prioritisation.04

### Write the first article with a user-phrased title

'Printer says offline' rather than 'Print spooler reset procedure'. Title it as the problem the reader experiences, because that is what they will type into a search box.05

### Open with a one-line symptom confirmation

One sentence describing exactly what the reader sees, so they know within three seconds whether this is their problem. Wrong-article dead ends are why people abandon knowledge bases.06

### List what the reader will need, including the non-obvious

Administrator access, the printer name, a cable. Omitting 'you will need admin rights' wastes the reader's whole attempt and turns a self-service success into a support call.07

### Write numbered steps, one action per step

Each step short enough to perform while reading, with no step combining two actions. 'Click Start, type Services, press Enter' is three steps, not one, and combining them loses readers.08

### Add the section everyone omits: if this does not work

State what to try next and when to contact support. Without it, a failed self-service attempt becomes an angry call rather than an informed one — and an informed caller is much faster to help.09

### Remove every piece of jargon

No spooler, driver, cache, permission. Describe what the thing does instead. The reader has no support person beside them to translate, which is the entire premise of the article.10

### Test the article on someone who does not know the answer

Watch them follow it and note every hesitation. **Each hesitation is a missing or ambiguous step.** This single test improves articles more than any amount of re-reading your own writing.11

### Fix the article based on where they hesitated

Add the missing step, split the ambiguous one, and re-test if the change was substantial. Then publish. An article tested on one real user is worth more than ten reviewed only by their author.12

### Rewrite three old tickets to the knowledge-transferring standard

Take tickets that say 'fixed' and rebuild them: symptom in the user's words, what was checked and ruled out, what was changed, environment, and fix or workaround status. The contrast makes the standard obvious.13

### Note the environment in every new ticket from now on

Machine identifier, operating system and version, application version. This is what turns three separate incidents into one pattern when they turn out to share a build.14

### Build the asset register

One row per machine: identifier, user, model, specification, operating system and version, purchase date, warranty status, role. Start with the machines you can see; complete it over the following weeks rather than delaying it.15

### Use the register to find a real pattern

Look for machines sharing a model, batch or operating system version. When you find three faults on the same build, you have converted three mysteries into one cause — which is the register paying for itself.16

### Record warranty and end-of-life status

This changes the replacement conversation completely: a repair under warranty is free, and a machine past end of life no longer receives security updates. Both facts belong in the recommendation, not in your head.17

### Set the maintenance routine before you finish

Update an article when you close a ticket that invalidates it; review the top ten quarterly; record searches that found nothing. Written down as a routine, because documentation rots by default.18

### Confirm the documentation is actually findable

Ask a user to find an article for a problem they have not had. If it takes more than ten seconds, the location or the titles are wrong and the articles will go unused however good they are.19

### Assemble the playbook as the deliverable

The ten faults with symptoms, diagnostic steps, fixes and escalation rules; the ticket standard; the asset register; and the maintenance routine. This is the document a real helpdesk runs on, and the thing you show an employer.

## Guided practice

### Build the documentation layer and prove it is usable

Create a knowledge base with tested articles, adopt a knowledge-transferring ticket standard, build an asset register, and demonstrate that a user can actually find and follow your documentation.

1. 01Ask five users how they currently look up a problem and record the gap you are filling.

2. 02Choose exactly one searchable location and put everything there.

3. 03Count the ten most common faults from your ticket history and prioritise those.

4. 04Write each article with a title phrased as the user's problem, not the technical cause.

5. 05Open each with a one-line symptom so readers confirm they are in the right place.

6. 06List what the reader needs, including non-obvious items like administrator access.

7. 07Write numbered steps with exactly one action per step.

8. 08Include an 'if this does not work' section with next steps and when to call support.

9. 09Strip all jargon, describing what things do rather than naming them.

10. 10Test each article on someone who does not know the answer and note every hesitation.

11. 11Fix the article where they hesitated, and re-test substantial changes.

12. 12Rewrite three existing tickets to include ruled-out findings, environment, and fix-or-workaround status.

13. 13Record environment details in every new ticket from now on.

14. 14Build the asset register with identifier, user, model, specification, operating system, purchase date, warranty and role.

15. 15Use the register to identify at least one real correlation across machines.

16. 16Record warranty and end-of-life status so replacement recommendations can cite them.

17. 17Write the maintenance routine: update on close, quarterly review of the top ten, log searches that find nothing.

18. 18Have a user find an article for an unfamiliar problem in under ten seconds.

19. 19Assemble the complete playbook deliverable from all of the above.

The standard we hold you to

One searchable location holding at least ten knowledge base articles covering the most common faults, each titled as the user's problem, opening with a symptom confirmation, listing prerequisites including administrator access, using one action per numbered step, including an 'if this does not work' section, and free of jargon; **every article tested on a real user with hesitations fixed**; three tickets rewritten to the knowledge-transferring standard and environment details recorded in all new tickets; an asset register with warranty and end-of-life status used to identify at least one real cross-machine correlation; a written maintenance routine; a findability test passed in under ten seconds; and the complete playbook assembled.

## Common mistakes and how to fix them

Titles phrased as the technical cause

Fix: Users search for their symptom, not your diagnosis. 'Printer says offline' will be found; 'Print spooler reset procedure' will not, however accurate it is.

Skipping the step you consider obvious

Fix: That is precisely the step the reader cannot perform. Test every article on someone who does not know the answer and treat each hesitation as a missing step.

Omitting the 'if this does not work' section

Fix: Without it a failed self-service attempt becomes an angry call rather than an informed one. State what to try next and when to contact support.

Writing tickets that record only what you did

Fix: Record what you ruled out. 'Checked disk space, fine' saves the next person from repeating your dead end; 'fixed' transfers nothing at all.

Writing tickets at the end of the day

Fix: Accuracy decays within hours and a late note is a reconstruction rather than a record. Write while the interaction is fresh.

Omitting environment details from tickets

Fix: Machine, operating system version and application version are what turn three separate incidents into one recognisable pattern. Without them you cannot see correlation.

An asset register that goes stale

Fix: A six-month-old register is worse than none, because people trust it and act on wrong information. Update it when you touch a machine, and review it quarterly.

Documentation in a location nobody can find

Fix: One searchable place, with user-phrased titles. If a user cannot find it in ten seconds they will message you instead, and you will have written it for nobody.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Test every article on someone who does not know the answer and watch where they hesitate. Each hesitation is a missing or ambiguous step, and this single practice improves documentation more than any amount of re-reading your own work.

- Record what you ruled out, in every ticket, forever. It is the habit that most reliably separates experienced support people from beginners, because it prevents the next person repeating your dead ends and it makes recurring faults visible across tickets.

- The asset register pays for itself the first time three separate faults turn out to share a machine model, batch or operating system version. That correlation is invisible without a register, and it is what turns reactive support into prevention.

- Documentation rots rather than disappearing, so the defence is procedural: update the article when you close the ticket that invalidates it, review the top ten quarterly, and log searches that find nothing. Written as a routine, because relying on goodwill does not survive a busy month.

## Key termsKnowledge baseA searchable collection of articles letting users solve common problems without contacting support. Its measure of success is calls not received.User-phrased titleAn article title written as the reader's symptom rather than the technical cause, because that is what they will search for.One action per stepThe rule for writing procedure steps. Combining actions loses readers, who cannot tell which part they failed at.Hesitation testingWatching a real user follow an article and treating every pause as a missing or ambiguous step. The most effective documentation review method.Ruled-out findingsTicket notes recording what was checked and eliminated. They save the next person from repeating dead ends and reveal patterns across incidents.Asset registerA record of every device: identifier, user, model, specification, operating system, purchase date, warranty status and role.CorrelationRecognising that several separate faults share a model, batch or software version. Only visible with an asset register and environment details in tickets.Documentation rotThe normal failure mode where documents stay present but stop being accurate as the environment changes, causing users to stop trusting them.

## Homework before the next session

Write and test five knowledge base articles

Each titled as the user's problem, with symptom confirmation, prerequisites, one action per step, and an 'if this does not work' section. Test each on a real user and record where they hesitated and what you changed.

Adopt the knowledge-transferring ticket standard

Rewrite three existing tickets to include ruled-out findings, environment details and fix-or-workaround status. Then use the standard for every new ticket and note the difference it makes.

Build the asset register

One row per machine with identifier, user, model, specification, operating system version, purchase date, warranty status and role. Use it to identify at least one correlation across machines.

Assemble the support playbook deliverable

Ten faults with symptoms, diagnostic steps, fixes and escalation rules; the ticket standard; the asset register; and the documentation maintenance routine. This is the artefact you show an employer.

## Assessment rubric

How this session is marked. The certificate for IT Support is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Article usability | Articles were written. | User-phrased titles, symptom confirmation, prerequisites including admin access, one action per step, an 'if this does not work' section, and no jargon throughout. |
| Testing discipline | Articles were reviewed. | Every article tested on a real user who did not know the answer, with each hesitation treated as a missing step and the article revised accordingly. |
| Ticket quality | Tickets were closed with notes. | Ruled-out findings recorded, environment details captured, fix distinguished from workaround, and notes written while fresh rather than reconstructed later. |
| Asset management | A list of machines exists. | Complete register including warranty and end-of-life status, used to identify a real cross-machine correlation, and kept current as machines are touched. |
| Sustainability | Documentation was produced. | A written maintenance routine covering update-on-close, quarterly review of the top articles and logging failed searches, plus a findability test passed in under ten seconds. |

## Session questionsI do not have time to write documentation while handling tickets.+

Write it as you close the ticket rather than as a separate task — the knowledge is in front of you at that moment and it takes a few minutes. Every fault documented is a fault that takes five minutes next time instead of fifty, including for you.What tool should I use for the knowledge base?+

Whichever one location your users will actually search. A shared folder, a simple wiki or a shared document all work. The tool matters far less than there being exactly one obvious, searchable place.How many articles should I write first?+

Ten, chosen by counting your ticket history rather than by preference. A small number of accurate, tested, findable articles beats fifty untested ones, because users abandon a knowledge base after two failed attempts.Is an asset register really worth the effort?+

It answers questions that otherwise interrupt your day constantly, it reveals when separate faults share a cause, and it tells you whether a repair is under warranty. It is among the highest-value things you can build in your first month.How do I stop documentation going out of date?+

Procedurally: update the article when you close a ticket that invalidates it, review the top ten quarterly, and record searches that find nothing. Documentation rots by default, so the routine has to be written down rather than relied on as goodwill.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Hardware & Software Support](https://www.cea.ng/classes/it-support/hardware-software-support)[Next session 6: Support Simulation](https://www.cea.ng/classes/it-support/support-simulation)

IT Support

3 weeks · 6 sessions · ₦40,000 · you leave with a support playbook[See the full course](https://www.cea.ng/classes/it-support)[Enrol now](https://www.cea.ng/admissions)
