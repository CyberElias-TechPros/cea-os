---
title: "Session 1: What AI Tools Actually Are"
description: "What a language model actually does, what it is genuinely good at, where it fails predictably, and how to choose a tool — so you can use these tools fast without producing nonsense or leaking anything you should not."
date: "2026-09-12"
class_slug: "ai-productivity"
---

What a language model actually does, what it is genuinely good at, where it fails predictably, and how to choose a tool — so you can use these tools fast without producing nonsense or leaking anything you should not.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain in plain terms what a language model is doing when it produces text

- Identify the categories of task these tools handle well and those they do not

- Predict where a tool will fail, rather than discovering it after the fact

- Choose a tool against a real task rather than against marketing claims

- Set realistic expectations for what changes in your own work

## The taught content

### What this course actually promises, and what it does not

The deliverable here is **a documented workflow for one of your real recurring tasks** — with the prompts you use, the verification steps, and the parts you deliberately keep manual. That last clause matters as much as the first. This course is not about handing work to a machine; it is about knowing precisely which parts of a task can be handed over, which cannot, and how to check what comes back.

The framing we will hold throughout is that these tools are **a very fast, very well-read assistant with no judgement and no memory of being wrong.** That description is not a metaphor; it is close to a literal account of what the software does, and it predicts both the value and the failure modes accurately. Everything useful in this course follows from holding that picture steady.

We will not cover hype in either direction. You will not be told these tools will replace your work, and you will not be told they are useless. You will be shown what they reliably do well, where they reliably fail, and how to build a process that gets the benefit without the risk — which is a less exciting promise and a considerably more useful one.

### What a language model is doing, in terms that predict its behaviour

A language model is trained on an enormous body of text to do one thing: **given some text, predict what text most plausibly comes next.** It does this word by word, and the result reads like understanding because plausible next-words, accumulated over paragraphs, usually do resemble coherent thought. But the mechanism is prediction, not retrieval or reasoning, and that distinction explains everything that follows.

Three consequences matter practically. First, **it has no database it is looking things up in.** It is not checking a fact; it is producing the wording that typically accompanies that fact. When the wording and the truth diverge, nothing in the process notices — which is exactly what a hallucination is. Second, **confidence is unrelated to accuracy.** The model produces a fluent, assured sentence whether or not the content is correct, because fluency is what it optimises for. You cannot read uncertainty off the tone.

Third, **it does not know when it was trained or what has happened since**, and its picture of anything recent is unreliable or absent. Ask it for a current price, a recent event, a specific statute's latest amendment, or a phone number, and you may receive something formatted exactly like an answer. **The absence of a 'I do not know' reflex is the single most dangerous property of these tools**, because it means the failure looks identical to success.

### What they are genuinely good at, and why those tasks share a shape

The tasks these tools handle well are not random; they share a shape. **They are good at language work where you can recognise a good answer quickly.** Rewriting a paragraph, drafting a polite email, summarising a document you have already read, turning rough notes into structured text, explaining a concept you partly understand, generating options when you are stuck, translating, reformatting, and writing boilerplate. In every case the output is checkable by you at a glance, which is what makes the speed safe.

They are also strong at **transformation** — taking content that exists and changing its form. Notes into a summary, a transcript into action items, a long document into headings, a formal letter into a friendlier one, a list into a table. Nothing new needs to be true; the material is already in front of you, and the model is doing structural work rather than factual work.

And they are useful as **a thinking partner rather than an answer machine.** Asking for objections to your plan, gaps in your argument, or ten angles on a problem produces value even when several suggestions are mediocre, because you are selecting rather than accepting. **The distinction between generating options and supplying answers is the difference between a useful tool and a liability**, and it is a distinction you control entirely through how you use it.

### Where they fail, predictably, and how to see it coming

The failures are not random either, and learning to predict them is the core skill of this session. **Specific facts**: names, dates, figures, citations, legal references, product versions. The model produces plausible-shaped facts, and a plausible-shaped citation with a real-sounding journal and a wrong title is more dangerous than an obvious error because it survives a casual check.

**Current information**: anything that has changed recently — prices, availability, staff, policies, law. **Arithmetic and careful counting**: it can do simple sums and will frequently get multi-step ones wrong while presenting the working confidently. **Precise constraints**: word limits, exact formatting, 'use only these three sources' — it approximates rather than obeys, and you must check.

Then two subtler ones. **It agrees with you**, because it is trained on text where people respond to assertions, and pushing back on a stated premise is rarer than going along with it — so if you ask a leading question you will get a leading answer. And **it does not know your situation**: your client, your contract, your local context. It will produce generic Nigerian business advice that sounds right and misses the specific constraint that matters. **Every one of these failures is predictable in advance**, which means none of them should ever be a surprise.

### Choosing a tool: the questions that actually matter

The market is crowded and the marketing is uniform, so choose against your task rather than against claims. The questions worth asking are short. **What am I actually doing?** If it is drafting and rewriting, most tools perform comparably and you should choose on interface and cost. If it is working with your own documents, choose one that handles files well. If it is searching for current information, you need a tool that retrieves from the live web and shows its sources.

Then the questions people skip. **What happens to what I type?** This is not a privacy abstraction — if you paste a client contract, a staff list, or a customer database into a tool, you have sent that data somewhere, and some services use submissions to improve their models. **Read the data policy for the tool you intend to use for work**, and never paste anything confidential into one you have not checked. We will return to this in the final session, but the choice of tool is where the exposure is created.

Finally, the practical test. **Pick one tool and use it properly for two weeks before comparing.** Most people's disappointment comes from using three tools shallowly and concluding the technology is inconsistent, when what varies is their own prompting. **Depth with one tool teaches you the technique; breadth across five teaches you nothing.** Start with one, learn its behaviour, then evaluate alternatives against a standard you actually understand.

## Instructor demonstration

We put a language model through a set of tests designed to show both what it does well and where it fails — so you have seen the failures yourself rather than taken them on trust.

### Pick one real recurring task you actually do

A weekly report, client replies, lesson notes, social captions, a proposal section. The whole course builds around this one task, so choose something you genuinely do repeatedly rather than something impressive-sounding.02

### Choose one tool and read its data policy before typing anything

Two minutes, before the first prompt. Find out whether submissions are used for training and what is retained. This is where privacy exposure is created, so it belongs at the start rather than after you have pasted a client document.03

### Do the task once without the tool and time it

This is your baseline. Without it you cannot say whether the tool saved time or merely felt faster, and 'felt faster' is a very common illusion in the first week of using these tools.04

### Test one: rewriting something you already wrote

Give it a paragraph of yours and ask for a clearer version. Note how quickly you can judge the result — this is the safe category, because you can verify the output at a glance.05

### Test two: summarising a document you have read

Paste a document you know well and ask for a summary. Because you know the source, you can immediately see what it captured and what it missed — which is exactly the condition that makes summarising useful.06

### Test three: summarising a document you have not read

Now try one you do not know. Notice that you cannot tell whether the summary is accurate. **This is the same operation with a completely different risk profile**, and the difference is entirely on your side, not the tool's.07

### Test four: ask for a specific fact you can check

Ask for something verifiable — a date, a figure, a definition from a named source. Then check it against a real source. Do this several times and count how often the confident answer is wrong.08

### Test five: ask for a citation and check whether it exists

Request a reference for a claim, then search for the paper. Finding a plausible-looking citation that does not exist is the single most instructive exercise in this course, and it is why nothing from these tools gets cited unchecked.09

### Test six: multi-step arithmetic

Give it a calculation requiring several steps. Watch it produce confident working with a wrong answer. Then note that a calculator takes the same time and is never wrong.10

### Test seven: ask something about the present day

Ask for a current price, a recent event, or the latest version of something. Observe that it answers in exactly the same tone as when it is correct — there is no verbal signal that it does not know.11

### Test eight: ask a leading question

State a premise and ask whether it is right. Then ask the same question neutrally. Compare the answers and see how readily it agrees with your framing rather than correcting it.12

### Test nine: ask about your specific situation

Describe a real constraint from your work and ask for advice. Note how generic the answer is, and how it misses the local detail that actually decides the question.13

### Record which tests passed and which failed

Write it down as two lists: tasks it handled well, tasks it did not. This is not an exercise conclusion — it is the evidence base for the workflow you will build in sessions two and three.14

### Map the results onto your real task

Break your recurring task into steps and mark each as safe to delegate, useful with checking, or keep manual. This mapping is the actual deliverable of the course, and today you have earned the right to draw it.15

### Identify what you will keep manual and say why

Usually the parts involving specific facts, judgement about your client, or anything you cannot check quickly. Naming these explicitly is what separates a workflow from an abdication.16

### Set your verification rule for the parts you delegate

For each delegated step, write how you will check the output. A delegated step with no verification rule is not a workflow; it is a hope that the output is right.17

### Write your first honest expectation

One paragraph on what this will change in your week and what it will not. Most people overestimate the first month and underestimate the second, and writing this down now is useful later.

## Guided practice

### Test a tool against your real work and map what is safe to delegate

Choose one tool and one recurring task, run the failure tests yourself, and produce the delegation map that the rest of this course builds on.

1. 01Choose one real recurring task you do at least weekly, not something impressive-sounding.

2. 02Choose one tool and read its data policy before typing anything into it.

3. 03Do the task once without the tool and record how long it took as your baseline.

4. 04Test rewriting a paragraph of your own and note how fast you can judge the result.

5. 05Test summarising a document you know well, and note what it missed.

6. 06Test summarising a document you do not know, and note that you cannot judge the result.

7. 07Ask for a verifiable fact and check it against a real source; repeat several times and count errors.

8. 08Ask for a citation and search for whether the source actually exists.

9. 09Give it a multi-step calculation and check the answer against a calculator.

10. 10Ask about something current and observe that the tone gives no signal of uncertainty.

11. 11Ask a leading question, then the same question neutrally, and compare.

12. 12Ask about a specific constraint from your own work and note how generic the answer is.

13. 13Write two lists: what it handled well and what it did not, with examples.

14. 14Break your recurring task into steps and mark each as delegate, check, or keep manual.

15. 15Name the steps you keep manual and state the reason for each.

16. 16Write a verification rule for every step you delegate.

17. 17Write one honest paragraph on what this will and will not change in your week.

The standard we hold you to

One real recurring task selected and timed without the tool as a baseline; one tool chosen with its data policy read before first use; all nine tests performed with results recorded, including at least one fabricated citation searched for and one multi-step calculation checked against a calculator; two written lists of strengths and failures with examples; the recurring task broken into steps and each marked delegate, check, or keep manual; every manual step justified and every delegated step given a verification rule; and an honest written expectation of what will and will not change.

## Common mistakes and how to fix them

Reading confidence as accuracy

Fix: Fluency is what the model optimises for, and it produces assured prose whether or not the content is correct. Verify specific claims against real sources; tone carries no information about truth.

Assuming there is a database being consulted

Fix: The model predicts plausible next words rather than looking anything up. When plausible wording and truth diverge, nothing in the process notices — that is precisely what a hallucination is.

Accepting a citation without searching for it

Fix: A plausible-looking reference with a real-sounding journal and a wrong title survives a casual check and fails a real one. Search for every source before you rely on or repeat it.

Asking about current prices, events or versions

Fix: Its knowledge stops at its training data and it will answer anyway, in the same tone as when it is correct. Use a live search for anything that may have changed recently.

Trusting it with multi-step arithmetic

Fix: It will produce confident working with a wrong answer. Use a calculator or a spreadsheet — they take the same time and are never wrong.

Asking leading questions and treating the agreement as confirmation

Fix: It is predisposed to go along with a stated premise. Ask neutrally, or ask for objections explicitly, if you want a useful answer rather than an agreeable one.

Pasting confidential material into a tool you have not checked

Fix: Read the data policy first. Some services use submissions to improve their models, and a client contract or staff list sent somewhere is not retrievable afterwards.

Trying five tools shallowly and concluding the technology is inconsistent

Fix: What usually varies is the prompting, not the tools. Use one properly for two weeks; depth teaches technique, breadth teaches nothing.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Hold the picture of a very fast, very well-read assistant with no judgement and no memory of being wrong. It is close to a literal account of the software and it predicts both the value and the failure modes accurately, which makes it more useful than any amount of technical detail.

- The safe category is language work you can verify quickly. Rewriting, restructuring, summarising material you already know, generating options — in each case you can judge the output at a glance, and that checkability is what makes the speed safe rather than reckless.

- Search for every citation before you rely on it. Finding one fabricated reference yourself, early, changes how you read everything these tools produce far more effectively than any warning you could be given.

- Choose one tool and use it properly for two weeks. Depth teaches technique and gives you a standard to judge alternatives against; sampling five tools teaches you nothing except that your own prompting was shallow.

## Key termsLanguage modelA system trained to predict what text plausibly follows from the text it is given. It predicts rather than retrieves or reasons, which explains its failure modes.HallucinationConfident output that is false — often a plausible-shaped fact or citation. It arises because nothing in the prediction process checks against truth.Training dataThe text a model learned from. It sets the boundary of what the model can know, and anything more recent is unreliable or absent.VerifiabilityHow quickly and easily you can check an output. It is the property that makes delegating a task safe, and it varies with the task rather than with the tool.Transformation taskChanging the form of content that already exists — notes into a summary, a transcript into action items. Safe because nothing new needs to be true.Options versus answersUsing output as candidates you select from rather than as conclusions you accept. The distinction is controlled entirely by how you use the tool.Data policyA service's stated handling of what you submit, including whether it is used for training. Read before pasting anything confidential.Delegation mapA step-by-step breakdown of a task marking each part as safe to delegate, useful with checking, or keep manual, each with a verification rule.

## Homework before the next session

Run all nine tests and record the results

Including at least one citation searched for and found not to exist, one multi-step calculation checked, and one leading question compared against a neutral version. Your two lists of strengths and failures are the evidence base for the rest of the course.

Choose your recurring task and time your baseline

Something you do at least weekly. Do it once without the tool and record the time, so that later you can say whether the workflow genuinely saved time rather than merely feeling faster.

Produce your delegation map

Break the task into steps, mark each delegate, check, or keep manual, justify every manual step, and write a verification rule for every delegated step. This is the deliverable the course is built around.

Read one tool's data policy and write four lines on it

Whether submissions are used for training, how long they are retained, what you will therefore never paste into it, and what you would need to see before using it with client material.

## Assessment rubric

How this session is marked. The certificate for AI Productivity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Conceptual understanding | Can describe what the tool does. | Explains prediction rather than retrieval, can state why confidence carries no information about accuracy, and uses that to predict failure modes in advance. |
| Empirical testing | Tried the tool on some tasks. | Ran all nine tests with results recorded, including a searched-for citation and a checked calculation, and can cite specific examples from their own testing. |
| Task judgement | Knows some tasks suit the tool better. | Distinguishes verifiable language work and transformation tasks from factual, current and arithmetic tasks, and explains why checkability is the deciding property. |
| Tool selection | Chose a tool. | Chose against a specific task, read the data policy before first use, and committed to depth with one tool rather than sampling several. |
| Delegation map | Identified some tasks to delegate. | A step-by-step map with every manual step justified and every delegated step carrying a verification rule, built on their own test results rather than on general claims. |

## Session questionsWill these tools take my job?+

They take tasks, not jobs. The realistic pattern is that parts of your work become much faster while the parts requiring judgement, local knowledge and accountability stay with you. People who learn to delegate well do more; people who delegate everything produce work nobody can trust.How do I know if the output is wrong?+

You usually cannot tell from reading it, which is the problem. Check specific claims against real sources, search for every citation, and use a calculator for arithmetic. The rule is to verify anything factual rather than to try to detect errors by tone.Why does it sound so sure when it is wrong?+

Because fluency is what it optimises for, and confidence is a feature of fluent prose rather than a signal about truth. There is no verbal tell, which is exactly why verification has to be a step in your process rather than an impression.Which tool should I use?+

Whichever suits the task you actually do, after reading its data policy. For drafting and rewriting most perform comparably, so choose on interface and cost — then use one properly for two weeks rather than sampling five.Is it cheating to use these at work?+

Using a tool to draft or restructure is no more cheating than using a spellchecker. Presenting output you have not verified as your own checked work, or claiming sources you have not read, is a different matter — and we cover that boundary properly in the final session.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Prompt Writing](https://www.cea.ng/classes/ai-productivity/prompt-writing)

AI Productivity

2 weeks · 4 sessions · ₦30,000 · you leave with an ai-assisted workflow you actually use[See the full course](https://www.cea.ng/classes/ai-productivity)[Enrol now](https://www.cea.ng/admissions)
