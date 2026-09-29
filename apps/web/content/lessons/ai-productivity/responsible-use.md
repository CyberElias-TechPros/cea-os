---
title: "Session 4: Responsible Use"
description: "The final session: hallucinations and bias, data privacy, academic and workplace honesty, and a personal AI policy you will actually follow — so the workflow you built is one you can defend."
date: "2026-09-12"
class_slug: "ai-productivity"
---

The final session: hallucinations and bias, data privacy, academic and workplace honesty, and a personal AI policy you will actually follow — so the workflow you built is one you can defend.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Recognise hallucination and bias in output and explain why they occur

- Handle data privacy deliberately, including what never goes into a tool

- Navigate academic and workplace honesty with clear, defensible lines

- Disclose AI use appropriately in different contexts

- Write a personal AI policy that is short enough to follow

## The taught content

### Why this session comes last, and why it is not a lecture on ethics

You now have a workflow. This session is about making it one you can defend — to a client, an employer, a supervisor, or yourself at two in the morning when something has gone wrong. That is a practical standard, not a moralising one, and it is worth being blunt about why it matters: **the failures here are public and lasting in a way that technical mistakes are not.** A wrong figure gets corrected. A fabricated source in a submitted paper, or a client's confidential data pasted into a tool, is harder to walk back.

So we will treat responsibility as a design constraint on the workflow you built. **Which steps are safe, which need checking, and what never enters the tool at all** — those are engineering decisions with the same status as the prompts and the verification steps. A workflow with no privacy boundary and no disclosure position is incomplete, not merely unethical.

The framing throughout is that **you remain the author and the accountable person.** The tool has no responsibility, cannot be held to account, and does not know when it is wrong. Every consequence of using it lands on you, which is exactly why the policy you write at the end of this session is yours to write rather than somebody else's to impose.

### Hallucination and bias: two different failures with different defences

**Hallucination** is confident falsehood — a fact, figure or citation that does not correspond to anything real. You already know the mechanism: the model predicts plausible text rather than retrieving truth, so nothing in the process notices when plausible and true diverge. The defence is the verification routine from last session, and it is procedural rather than attentive, **because you cannot detect hallucination by reading carefully.** It reads exactly like everything else.

**Bias** is a different problem and needs a different defence. The model reproduces the patterns in its training text, which means it reproduces the assumptions embedded there — about who holds which roles, what a professional sounds like, which contexts are treated as normal. This is not malice; it is statistics. The result is output that is **systematically tilted rather than randomly wrong**, which makes it harder to notice because it does not look like an error.

The practical consequences are worth naming because they show up in ordinary work. Job descriptions and role examples skew toward a default that may not match your organisation. Names and examples cluster around the contexts most represented in the training data, so **a request for a Nigerian business example may return something generic and unrecognisably local.** Advice about professional conduct reflects a particular cultural norm. **The defence is to read output asking what it assumes**, and to supply your own context explicitly rather than accepting the default — which is the same prompt discipline from session two, applied to a different risk.

### Data privacy: the decision that cannot be undone

Everything else in this course is recoverable. A bad draft gets rewritten, a wrong figure gets corrected. **Data you have submitted somewhere is not recoverable** — once it is sent, you cannot retrieve it, and you may not know what was done with it. That asymmetry is why privacy deserves more caution than any other topic here.

The rule is simple and it is worth memorising: **never paste into a tool what you would not be comfortable appearing elsewhere.** In practice that means client contracts and correspondence, staff lists and salary information, customer databases with names and phone numbers, financial records, medical information, and anything belonging to a third party who did not consent. Note that last category especially — **it is not your data to submit**, and in Nigeria the **NDPA 2023** places real obligations on anyone processing personal data.

Two supporting practices. **Check the data policy of any tool you use for work**, specifically whether submissions are used to improve the model and how long they are retained — you did this in session one, and it is worth revisiting now that you know what you would be exposing. And **anonymise where you can**: if you need help drafting a letter about a dispute, describe the situation without names, amounts and identifying detail. You can almost always get the language help you need without handing over the specifics, and that trade costs you very little.

### Academic and workplace honesty: where the lines actually are

The question people ask is 'is it cheating?', and the honest answer is that the tool is not the issue — **what you claim about the work is.** Using software to draft, restructure or check grammar is unremarkable and has been for decades. Presenting output you did not verify as your own checked work, or citing sources you have not read, or claiming analysis you did not perform, is misrepresentation regardless of which tool produced it.

In academic settings the decisive fact is that **you are being assessed on the thinking, not the prose.** If a tool produced the argument, the analysis and the conclusions, then the thing being assessed did not happen, and no amount of disclosure fixes that — disclosure makes it honest, not complete. Use the tool for expression, structure and checking, and do the reasoning yourself. That is both the honest position and the one that leaves you actually knowing the material.

In workplaces the test is different and more permissive, but not unlimited. **Drafting a client email with help is normal.** Sending a client a factual claim you did not verify is a professional failure. Using a tool to summarise a document you then act on is fine; acting on a summary of something you have not read is how bad decisions get made. **The line is verification and accountability, not tool use** — and it is the same line whether or not anybody finds out.

### Disclosure, and writing a policy you will actually follow

Disclosure is context-dependent and there is no single rule. **Where an institution or client has a policy, follow it** — that ends the question. Where they do not, the useful test is whether disclosure would change the reader's assessment of the work: if the piece presents analysis, research or expertise that they are relying on, saying how it was produced is honest and costs nothing. **If in doubt, disclose**; the downside of disclosing is small and the downside of being discovered not to have is not.

Then the policy, which is the deliverable of this session and should be short enough to remember. Five lines is enough. **What I use these tools for** — drafting, restructuring, summarising material I have, generating options. **What I never put into them** — client data, personal information, anything confidential. **What I always verify** — every fact, every source, every figure. **What I keep manual** — establishing truth, judging my own situation, original analysis. **When I disclose** — and the default answer.

The reason to write it rather than hold it as a general intention is that **intentions fail under time pressure and policies do not.** At 5pm on a deadline, with a client waiting, the person who has written 'I never paste client data' does not paste client data. The person who intends to be careful pastes it. That is the entire argument for the exercise, and it is the last thing this course asks you to produce.

## Instructor demonstration

We stress-test the workflow you built: demonstrate hallucination and bias concretely, work through real privacy decisions, settle the honesty and disclosure questions, and write the five-line policy.

### Recall the fabricated citation you found in session one

If you did not find one, run the test again now — ask for five references on a topic you know and search each. Everything in this session rests on having seen that failure yourself rather than been told about it.02

### Demonstrate that hallucination is undetectable by reading

Put a correct claim and a fabricated one side by side and try to tell them apart by tone and fluency. You will not be able to, which is the whole reason verification must be procedural rather than attentive.03

### Test for bias in role and professional examples

Ask for examples of a professional role, a business, or a scenario without specifying context. Note whose names, which settings and which assumptions appear by default, and ask what that would do to a piece of work you sent to a Nigerian client.04

### Counteract bias by supplying your own context

Re-ask with explicit local detail — the city, the industry, the actual constraint. Note how much the output changes. This is the session-two prompt discipline applied to a different risk, and it works.05

### List what you would never paste into a tool

Client contracts and correspondence, staff and salary information, customer databases, financial records, medical information, and anything belonging to a third party. Write it down; a list in your head is a list you will bend under pressure.06

### Re-read the tool's data policy with that list in hand

Specifically whether submissions are used for training and how long they are retained. You read this in session one; now you know precisely what would be exposed, which changes what the policy means to you.07

### Practise anonymising a real request

Take a task involving a real client or person and rewrite the prompt with names, amounts and identifying detail removed. Confirm you still get the language help you needed — which you almost always do, at very little cost.08

### Consider the third-party case explicitly

Customer names and phone numbers are not yours to submit, and NDPA 2023 places obligations on processing personal data. This is the category people overlook, because the data feels like working material rather than somebody's personal information.09

### Work through the academic honesty question on a real assignment

Ask what is being assessed. If it is the thinking, then tool-produced argument and analysis means the assessed thing did not happen — disclosure makes it honest but not complete.10

### Work through the workplace honesty question on a real client task

Drafting with help is normal. Sending an unverified factual claim is a professional failure. The line is verification and accountability, not tool use — and it holds whether or not anybody finds out.11

### Decide your disclosure default

Where a policy exists, follow it. Where none does, ask whether disclosure would change the reader's assessment. When in doubt, disclose — the downside of disclosing is small and the other downside is not.12

### Write line one: what I use these tools for

Drafting, restructuring, summarising material you already have, generating options to select from. Be specific, because a general statement is not a guide to action.13

### Write line two: what I never put into them

The list you made, compressed. Client data, personal information, anything confidential, anything belonging to a third party. This is the line that protects you irreversibly, so it gets no exceptions.14

### Write line three: what I always verify

Every specific fact, every source searched before citation, every figure traced to its primary source, every quotation verbatim. Stated as steps, because an intention to check is not a routine.15

### Write line four: what I keep manual

Establishing what is true, judging your own situation, original analysis you are assessed or paid for, and legal, medical, financial or regulatory specifics.16

### Write line five: when I disclose

Your default position and the test you apply. Short enough to remember, because a policy you cannot recall under pressure is not a policy.17

### Attach the policy to the workflow document

One document containing the task, the prompts, the verification steps, the manual parts and the policy. That is the course deliverable, complete.18

### Re-time the task and compare with your session-one baseline

The honest number, including the time verification takes. It is usually smaller than the first week suggested and larger by month two — and knowing the real figure is what makes the workflow trustworthy to you.19

### Present the workflow as though to a sceptical manager

What it does, what it saves, what you verify, what never enters the tool, and where you disclose. Being able to answer those five questions confidently is what separates a professional workflow from a habit.

## Guided practice

### Stress-test your workflow and write the policy

Demonstrate the failure modes concretely, settle the privacy, honesty and disclosure questions for your own context, and produce the five-line policy that completes the course deliverable.

1. 01Confirm you have personally found a fabricated citation, running the five-reference test again if not.

2. 02Place a correct claim and a fabricated one side by side and confirm you cannot distinguish them by reading.

3. 03Test for bias by asking for professional or business examples without specifying context, and note the defaults.

4. 04Re-ask with explicit local detail and observe how much the output changes.

5. 05Write the list of what you would never paste into a tool, including third-party personal data.

6. 06Re-read the tool's data policy now that you know what would be exposed.

7. 07Anonymise a real client-related prompt, removing names, amounts and identifying detail, and confirm it still works.

8. 08Consider explicitly the case of data belonging to a third party, with reference to NDPA 2023.

9. 09Work through the academic question on a real assignment by asking what is actually being assessed.

10. 10Work through the workplace question on a real client task, locating the line at verification and accountability.

11. 11Decide your disclosure default and the test you apply where no policy exists.

12. 12Write line one: what you use these tools for, specifically.

13. 13Write line two: what you never put into them.

14. 14Write line three: what you always verify, stated as steps.

15. 15Write line four: what you keep manual.

16. 16Write line five: when you disclose.

17. 17Attach the policy to your workflow document so the deliverable is complete.

18. 18Re-time the task including verification, and compare against your session-one baseline.

19. 19Present the workflow answering: what it does, what it saves, what you verify, what never enters the tool, where you disclose.

The standard we hold you to

A fabricated citation personally found and the undetectability of hallucination demonstrated by side-by-side comparison; bias tested on unspecified-context examples and counteracted by supplying explicit local detail; a written never-paste list including third-party personal data with the tool's data policy re-read in that light; a real client prompt successfully anonymised; the academic and workplace honesty questions each worked through on a real task with the line located at verification and accountability; a disclosure default decided with a stated test; **a five-line policy covering use, never-paste, always-verify, keep-manual and disclose — attached to the workflow document**; the task re-timed including verification against the session-one baseline; and the workflow presented so that all five manager questions are answered confidently.

## Common mistakes and how to fix them

Believing careful reading will catch hallucinations

Fix: It will not — a fabricated claim reads exactly like a correct one, because fluency is what the model optimises for. Verification has to be a procedural step, not an attitude.

Treating bias as random error

Fix: Bias is systematic rather than random, so it does not look like a mistake. Read output asking what it assumes, and supply your own context explicitly rather than accepting the default.

Pasting client or third-party data because it feels like working material

Fix: Customer names and phone numbers are not yours to submit, and NDPA 2023 applies. Anonymise instead — you can almost always get the language help you need without the identifying detail.

Assuming submitted data can be taken back

Fix: It cannot. Unlike a bad draft or a wrong figure, data sent somewhere is not recoverable and you may never learn what was done with it. That asymmetry is why this topic gets more caution than any other.

Treating disclosure as the thing that makes AI use acceptable

Fix: Disclosure makes it honest, not complete. If a tool produced the argument and analysis in assessed work, the thing being assessed did not happen regardless of whether you said so.

Drawing the honesty line at tool use rather than at verification

Fix: Drafting with help is normal; sending an unverified factual claim is a professional failure. The line is verification and accountability, and it holds whether or not anyone finds out.

Holding your standards as general intentions

Fix: Intentions fail under time pressure and policies do not. Write the five lines down, because at 5pm on a deadline the written rule is what you follow.

Excluding verification time from your estimate of the saving

Fix: Count it. The honest number is what makes the workflow trustworthy, and a saving computed without checking is a saving you will pay for later in corrections.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- You cannot detect hallucination by reading carefully, so verification must be procedural. Putting a correct claim and a fabricated one side by side and failing to tell them apart is the exercise that makes this concrete, and it is worth doing before you rely on any output.

- Bias is systematic, not random, which is why it survives careful reading. Read output asking what it assumes, and supply explicit local context — the same prompt discipline from session two, applied to a risk that does not look like an error.

- Data privacy is the one irreversible decision in this whole course. A bad draft is rewritten and a wrong figure is corrected, but data submitted somewhere cannot be retrieved. Never paste what you would not be comfortable appearing elsewhere, and anonymise whenever you can.

- Write the policy as five lines rather than holding it as an intention. At 5pm on a deadline with a client waiting, the person who has written 'I never paste client data' does not paste client data. That is the entire argument for the exercise.

## Key termsHallucinationConfident output that is false. Undetectable by reading, because fluency is what the model optimises for — so verification must be procedural.BiasSystematic tilting of output reflecting assumptions in the training data. Harder to notice than error because it does not look like a mistake.Data policyA service's stated handling of submissions, including whether they are used for training and how long they are retained. Read before submitting anything sensitive.AnonymisationRemoving names, amounts and identifying detail before submitting a task. Usually costs nothing in the quality of language help received.NDPA 2023Nigeria's Data Protection Act, imposing obligations on processing personal data — directly relevant to submitting anything containing third-party information.DisclosureStating how work was produced. Context-dependent; where no policy exists the test is whether disclosure would change the reader's assessment.AccountabilityRemaining the author and the person answerable for the output. The tool has no responsibility and cannot be held to account, so every consequence lands on you.Personal AI policyA short written statement of what you use these tools for, what never enters them, what you always verify, what stays manual, and when you disclose.

## Homework before the next session

Run the five-reference test and record it

Ask for five references on a topic you know well, search for each, and record how many exist as described. Attach the result to your workflow document — it is the evidence behind your verification rule.

Test for bias and counteract it

Ask for professional or business examples without specifying context, note the defaults, then re-ask with explicit local detail. Write three lines on what changed and what that implies for work you send to clients.

Write your five-line personal AI policy

What you use these tools for, what never enters them, what you always verify, what you keep manual, and when you disclose. Short enough to remember under pressure, which is the point.

Complete and present the workflow deliverable

One document: the task, the prompts, the verification steps, the manual parts and the policy — plus the honest re-timed figure including verification. Present it answering what it does, what it saves, what you verify, what never enters the tool, and where you disclose.

## Assessment rubric

How this session is marked. The certificate for AI Productivity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Understanding of failure modes | Knows hallucination and bias exist. | Has personally found a fabricated citation, demonstrated that hallucination is undetectable by reading, and explains bias as systematic rather than random. |
| Privacy discipline | Is cautious with sensitive data. | A written never-paste list including third-party data, the tool's data policy re-read in that light, a real prompt successfully anonymised, and NDPA 2023 referenced accurately. |
| Honesty judgement | Knows some AI use is inappropriate. | Locates the line at verification and accountability rather than tool use, and can explain why disclosure makes work honest but not complete when the assessed thinking was not done. |
| Disclosure position | Would disclose if asked. | A decided default with a stated test for contexts where no policy exists, recognising that the downside of disclosing is small and the other downside is not. |
| Policy and deliverable | Stated some personal rules. | A five-line policy short enough to follow under pressure, attached to a complete workflow document with prompts, verification steps, manual parts and an honest re-timed figure including verification. |

## Session questionsCan I tell when the output is a hallucination?+

No, and that is the central point. A fabricated claim reads exactly like a correct one because fluency is what the model optimises for. Verification has to be a step in your process — checking specific claims against sources — rather than something you expect to notice.Is using AI on an assignment dishonest?+

Check your institution's rules first. As a principle: if the tool produced the argument, analysis and conclusions, the thing being assessed did not happen, and disclosure makes it honest rather than complete. Use it for expression and structure and do the reasoning yourself.What is genuinely safe to paste into a tool?+

Your own drafts, documents that are already public, and descriptions of situations with names, amounts and identifying detail removed. You can almost always get the language help you need without submitting the specifics, and that trade costs very little.Should I tell my clients I use AI?+

Follow any policy they have. Where there is none, ask whether disclosure would change their assessment of the work — if it presents analysis or expertise they are relying on, saying how it was produced is honest and costs nothing. When in doubt, disclose.Is a written policy really necessary, or is that overkill?+

It is necessary because intentions fail under time pressure and written rules do not. At 5pm on a deadline with a client waiting, the person who has written 'I never paste client data' does not paste it. Five lines is enough, and it is the cheapest protection in this course.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: AI-Assisted Research & Work](https://www.cea.ng/classes/ai-productivity/ai-assisted-research-work)[Course complete Back to AI Productivity](https://www.cea.ng/classes/ai-productivity)

AI Productivity

2 weeks · 4 sessions · ₦30,000 · you leave with an ai-assisted workflow you actually use[See the full course](https://www.cea.ng/classes/ai-productivity)[Enrol now](https://www.cea.ng/admissions)
