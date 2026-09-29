---
title: "Session 2: Prompt Writing"
description: "The craft of getting useful output: giving context and constraints, showing examples and formats, iterating rather than accepting the first result, and building a reusable prompt library so the skill compounds."
date: "2026-09-12"
class_slug: "ai-productivity"
---

The craft of getting useful output: giving context and constraints, showing examples and formats, iterating rather than accepting the first result, and building a reusable prompt library so the skill compounds.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Write prompts that supply the context a model cannot guess

- Use constraints and examples to shape output instead of hoping for it

- Iterate on a result deliberately rather than re-rolling and hoping

- Diagnose why an output is wrong and fix the prompt rather than the text

- Build a reusable prompt library that makes you faster over time

## The taught content

### Why prompts matter: the model is guessing what you meant

A prompt is the entire input the model has. It does not know who you are, who the reader is, what the document is for, how long it should be, or what tone you want — unless you say. **Every one of those gaps is filled by a guess**, drawn from whatever is statistically typical, which means generic. A vague prompt does not produce a bad answer; it produces an average answer, and average is rarely what you needed.

This reframes prompt writing away from incantations and tricks. There is no magic phrasing. **There is only the difference between telling somebody what you need and hoping they infer it.** The people who get good output are not using secret techniques; they are describing the task more completely, in the way you would describe it to a capable assistant on their first day.

The practical test of a prompt is simple: **if you handed it to a competent human who knew nothing about you, could they produce what you want?** If not, the model cannot either. That test catches nearly every weak prompt, and it has the advantage of requiring no technical knowledge to apply.

### Context and constraints: the two things beginners leave out

**Context** is who, what and why. Who you are, who will read the output, what it is for, what has already happened. 'Write an email about the delay' gives the model nothing; 'I run a small furniture workshop in Lagos. A client's dining table will be two weeks late because the timber supplier failed. She has been patient and I want to keep her. Write a short email' gives it everything it needs to produce something you would actually send.

**Constraints** are the boundaries: length, format, tone, what to include, what to leave out. These matter more than people expect, because a model's default is to be thorough — which usually means too long. Say **'under 150 words'**, say **'no bullet points'**, say **'do not mention price'**, and the output changes shape entirely. Constraints are also where you prevent the padding and hedging that makes generic AI text recognisable.

One constraint deserves special mention because it is so useful: **tell it what not to do.** 'Do not start with I hope this email finds you well. Do not use the word delve. Do not add a summary at the end.' Models reproduce the conventions of the text they were trained on, and the conventions of formal writing are exactly the ones readers have grown tired of. Naming the clichés you want avoided is more effective than asking for something 'natural'.

### Examples and formats: showing beats describing

If you want output in a particular shape, **show it one.** Give an example of the style you want, or of a previous piece you wrote, or of the exact structure — and it will match far more reliably than any adjective you could use. 'Professional but warm' means different things to different readers; a sample paragraph means one thing.

This extends to structure. If you want a report with specific headings, **list the headings.** If you want a table, **give the column names.** If you want three options with pros and cons, **show the shape of one option.** Specifying structure in the prompt removes the most common source of unusable output, which is content that is fine but arranged wrong.

The deeper principle is that **the model is an imitation engine, so imitation is the most reliable instruction.** An example is worth more than a paragraph of adjectives. If you find yourself writing a long description of the tone you want, stop and paste an example instead — it will be shorter and it will work better.

### Iterating: the skill most people never learn

Most people treat the first output as the answer. If it is not right, they rephrase slightly and try again, or they give up and write it themselves. The productive approach is different: **treat the first output as a draft to be directed**, and iterate deliberately rather than re-rolling.

Deliberate iteration means naming the specific defect. Not 'make it better' — that produces a different generic answer. Rather: **'shorten the second paragraph by half', 'the opening is too formal, start with the actual news', 'you have included the price; remove it', 'this reads like a template; make the second sentence specific to a dining table.'** Each instruction narrows the output, and three rounds of specific direction typically produces something better than twenty random retries.

Then the diagnostic habit that makes you faster over time. **When output is wrong, ask what the prompt failed to say.** Usually the answer is identifiable — you did not specify the reader, or the length, or the thing to avoid. **Fix the prompt, not just the output**, because the corrected prompt goes into your library and the next time costs nothing. Iterating on output makes this task easier; iterating on prompts makes every future task easier.

### A reusable prompt library: the difference between a trick and a skill

A prompt library is a document of the prompts that work for your recurring tasks, refined through use. It sounds trivial and it is what separates someone who is occasionally impressed by these tools from someone who is reliably faster because of them. **Without a library you restart from a blank prompt every time**, and you repeat the same mistakes and the same iterations.

The format that works is simple. For each recurring task: **the prompt itself**, with the parts you change marked clearly; **a note on what it does well and where it needs checking**; and **the verification step** you always run. That last element is what makes the library safe rather than merely convenient — a prompt without a stated check is an invitation to skip checking.

Then the maintenance habit. **Update a prompt when you find a better phrasing**, which happens constantly in the first month. **Retire prompts that produce output you always rewrite anyway**, because those are not saving you time however clever they look. And keep the library where you will actually find it — a document in your cloud storage, next to the templates from the Digital Productivity course, so the two systems work together rather than separately.

## Instructor demonstration

We take the recurring task from session one and build the prompts for it properly — from a vague first attempt through context, constraints, examples and iteration, into a library entry with a verification step.

### Start with the vague prompt and observe the result

Ask for the thing with no context at all, the way most people first do. Note specifically what is generic about the output — this is the baseline that makes every later improvement visible.02

### Apply the human test to your prompt

Ask whether a competent person who knew nothing about you could produce what you want from what you wrote. Whatever they would have to guess, the model guessed too — and guessed generically.03

### Add context: who you are, who reads it, what it is for

Rewrite the prompt with all three. Note how much the output changes from the same basic request. This single addition usually accounts for most of the quality difference beginners notice in other people's results.04

### Add what has already happened

The prior conversation, the history with the client, what has already been said. Models cannot know this and will otherwise produce text that ignores it, which reads as careless even when the writing is good.05

### Add length and format constraints

Under a stated word count, in prose or in bullets as you actually want it. Without a length constraint the default is thorough, which almost always means too long for the real purpose.06

### Add tone constraints and name what to avoid

Say what not to do: no 'I hope this finds you well', no summary at the end, no hedging. Naming the clichés you want avoided works better than asking for something natural, because it removes specific patterns rather than requesting an abstraction.07

### Give an example of the style you want

Paste a paragraph of your own writing, or a sample of the tone you are after. The model imitates, so an example is worth more than any paragraph of adjectives you could write instead.08

### Specify the structure explicitly if the task has one

List the headings, give the table columns, or show the shape of one item. Specifying structure removes the most common source of unusable output: content that is fine but arranged wrong.09

### Compare the constrained output with the vague first attempt

Put them side by side. This comparison is the actual lesson of the session, and seeing your own before-and-after is more convincing than any explanation.10

### Iterate with specific defects, not general complaints

'Shorten paragraph two by half. The opening is too formal — start with the news.' Not 'make it better'. Specific direction narrows the output; general requests produce a different generic answer.11

### Run three rounds and stop when it is right

Note that three rounds of specific direction typically beats twenty random retries. Knowing when to stop is part of the skill — perfect is not the target, good-enough-to-send is.12

### Diagnose what the prompt failed to say

For each defect you had to correct, identify the missing instruction. Usually it is the reader, the length, or something to avoid. This diagnosis is what turns a one-off fix into a permanent improvement.13

### Write the corrected prompt into your library

With the parts you change marked clearly, so next time you fill in the blanks rather than reconstructing the whole thing from memory.14

### Add the note on where it needs checking

What this prompt reliably gets wrong, based on what you just observed. A prompt whose failure modes are undocumented will be trusted too much by future you.15

### Add the verification step to the library entry

What you always check in this output. A prompt without a stated check is an invitation to skip checking, and skipping is how fabricated details reach a client.16

### Build two more library entries for related tasks

The point of a library is repetition. Three entries for tasks you do weekly will save more time in a month than one brilliant prompt for something you do annually.17

### Store the library where you will find it

In your cloud storage next to your email templates. A library you cannot locate is not a library, and the two systems work better together than apart.18

### Time the task again and compare with your baseline

Against the time you recorded in session one. This is the honest measure, and it is usually smaller than expected in week one and larger by month two as the library grows.19

### Retire anything that did not earn its place

If a prompt produces output you always rewrite anyway, delete it. A library of prompts that genuinely save time is worth more than a longer library of clever ones you do not use.

## Guided practice

### Build the prompts for your real task and start a library

Take the recurring task from session one, build its prompt properly through context, constraints, examples and iteration, and record it as a library entry with a verification step.

1. 01Start with a vague prompt and record what is generic about the output as your baseline.

2. 02Apply the human test: could someone who knew nothing about you produce what you want?

3. 03Add context — who you are, who reads the output, what it is for.

4. 04Add what has already happened, so the output does not ignore the history.

5. 05Add a length constraint and a format constraint.

6. 06Add tone constraints and explicitly name the clichés to avoid.

7. 07Give an example of the style you want rather than describing it in adjectives.

8. 08Specify structure explicitly if the task has headings, columns or repeated items.

9. 09Compare the constrained output with the vague first attempt side by side.

10. 10Iterate with specific defects named, not general requests to improve.

11. 11Run three rounds of direction and stop when the output is good enough to use.

12. 12For each defect, identify the instruction the prompt was missing.

13. 13Write the corrected prompt into a library document with changeable parts marked.

14. 14Note what this prompt reliably gets wrong, from what you observed.

15. 15Add the verification step you will always run on this output.

16. 16Build two more entries for related recurring tasks.

17. 17Store the library in cloud storage next to your templates.

18. 18Time the task again and compare against your session-one baseline.

19. 19Delete any prompt whose output you always end up rewriting.

The standard we hold you to

A vague baseline recorded and compared side by side with the final constrained output; the human test applied; context, history, length, format and tone constraints all added with clichés explicitly named; an example supplied rather than adjectives; structure specified where the task has any; at least three rounds of iteration using specific named defects; each defect traced to a missing instruction in the prompt; **three library entries, each with changeable parts marked, a note on known failure modes, and a stated verification step**; the library stored where it will be found; the task re-timed against baseline; and any prompt that did not earn its place retired.

## Common mistakes and how to fix them

Writing a vague prompt and treating generic output as the tool's limit

Fix: Apply the human test. Every gap you leave is filled by a statistically typical guess, and typical is rarely what you needed. Describe the task as you would to a capable assistant on their first day.

Omitting who will read the output

Fix: The reader determines tone, detail and length more than anything else. A model that does not know the audience writes for everyone, which means for no one.

No length constraint, then complaining the output is too long

Fix: The default is thorough, which means long. State a word count. It is the single most effective constraint and the one most often omitted.

Describing a tone in adjectives instead of showing an example

Fix: The model imitates, so a sample paragraph is worth more than a paragraph of description. If you are writing at length about the tone you want, paste an example instead.

Saying 'make it better' when iterating

Fix: That produces a different generic answer. Name the specific defect — shorten this paragraph, the opening is too formal, remove the price — and the output narrows instead of wandering.

Re-rolling instead of directing

Fix: Three rounds of specific direction usually beats twenty random retries. Re-rolling discards what worked along with what did not.

Fixing the output without fixing the prompt

Fix: Identify the instruction that was missing and add it. Correcting the output helps this task once; correcting the prompt helps every future one.

Keeping prompts that produce output you always rewrite

Fix: Retire them. A short library of prompts that genuinely save time is worth more than a long one of clever prompts you do not actually use.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Apply the human test to every prompt: could a competent person who knew nothing about you produce what you want from what you wrote? It requires no technical knowledge and it catches nearly every weak prompt, because whatever they would have to guess, the model guessed generically.

- Name the clichés you want avoided rather than asking for something natural. Models reproduce the conventions of formal writing that readers have grown tired of, and removing specific patterns works far better than requesting an abstraction.

- Diagnose the prompt, not just the output. Every defect you correct tells you an instruction was missing, and adding it means the next attempt starts further along. This is what converts prompt writing from a trick into a compounding skill.

- Keep the library next to your email templates in cloud storage. The two systems do the same job — capturing what you write repeatedly — and keeping them together means both actually get used.

## Key termsPromptThe entire input a model receives. Every gap in it is filled by a statistically typical guess, which is why completeness matters more than phrasing.The human testAsking whether a competent person who knew nothing about you could produce what you want. It catches nearly every weak prompt without requiring technical knowledge.ContextWho you are, who reads the output, what it is for, and what has already happened. The element beginners most often omit and the one that changes output most.ConstraintA stated boundary — length, format, tone, what to include or exclude. Without a length constraint the default output is thorough, which usually means too long.Negative constraintAn instruction about what not to do, such as avoiding a specific cliché. Often more effective than requesting an abstract quality like naturalness.Few-shot exampleShowing the model one or more samples of the desired style or structure. Because it imitates, an example outweighs a paragraph of description.Deliberate iterationImproving output by naming specific defects rather than requesting general improvement or re-rolling. Three directed rounds typically beat twenty random retries.Prompt libraryA maintained document of working prompts for recurring tasks, each with changeable parts marked, known failure modes noted, and a verification step stated.

## Homework before the next session

Rewrite your weakest prompt using everything from this session

Add context, history, length, format, tone and negative constraints, plus an example. Show the before-and-after side by side and write three lines on which addition improved the output most.

Practise deliberate iteration

Take one output and improve it over three rounds using only specific named defects. Record each instruction and what changed, and note how it differs from simply asking again.

Build three library entries

For tasks you do weekly. Each with changeable parts marked, a note on what it reliably gets wrong, and the verification step you will always run.

Diagnose five failed outputs

For each, identify the instruction the prompt was missing rather than only fixing the text. Then update the prompt so the same failure does not recur.

## Assessment rubric

How this session is marked. The certificate for AI Productivity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Prompt completeness | Prompts produce usable output. | Context, reader, purpose, history, length, format and tone all specified, with negative constraints naming specific clichés to avoid, and the human test satisfied. |
| Use of examples | Described the desired output. | Supplied samples or explicit structure rather than relying on adjectives, and can explain why imitation is the most reliable form of instruction. |
| Iteration skill | Retried until the output improved. | Named specific defects across at least three rounds, stopped at good-enough rather than perfect, and can distinguish directing from re-rolling. |
| Diagnostic habit | Fixed outputs that were wrong. | Traced each defect to a missing instruction and updated the prompt, so the improvement applies to future tasks rather than only to this one. |
| Library quality | Saved some prompts. | Three entries with changeable parts marked, documented failure modes and a stated verification step, stored where they will be found, with unused prompts retired. |

## Session questionsAre there magic words that make prompts work better?+

No. There is only the difference between describing what you need and hoping it is inferred. The people who get good output are describing the task more completely, not using secret phrasing.How long should a prompt be?+

As long as the task requires and no longer. A simple rewrite needs one line; a client email with history and constraints needs a short paragraph. Length is not the goal — completeness is.Why does the output always sound like AI?+

Because it reproduces the conventions of the formal writing it was trained on. Add negative constraints naming the specific phrases and habits you want avoided, and supply an example of your own voice.How many iterations is too many?+

If three rounds of specific direction have not got it usable, the prompt is missing something structural — usually the reader or an example. Fix the prompt rather than continuing to iterate on the output.Is keeping a prompt library really worth it?+

It is what makes the skill compound. Without one you restart from blank every time and repeat the same iterations; with one, three entries for weekly tasks will save more in a month than any single clever prompt.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: What AI Tools Actually Are](https://www.cea.ng/classes/ai-productivity/what-ai-tools-are)[Next session 3: AI-Assisted Research & Work](https://www.cea.ng/classes/ai-productivity/ai-assisted-research-work)

AI Productivity

2 weeks · 4 sessions · ₦30,000 · you leave with an ai-assisted workflow you actually use[See the full course](https://www.cea.ng/classes/ai-productivity)[Enrol now](https://www.cea.ng/admissions)
