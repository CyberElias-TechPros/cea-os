---
title: "Session 1: Threats, Risk & the CIA Triad"
description: "The vocabulary and judgement that everything else rests on: what security actually protects, how threats become risks, and how to think about a system's weaknesses rather than memorise a list of scare stories. This session builds the mental model the rest of the course applies."
date: "2026-09-12"
class_slug: "cybersecurity"
---

The vocabulary and judgement that everything else rests on: what security actually protects, how threats become risks, and how to think about a system's weaknesses rather than memorise a list of scare stories. This session builds the mental model the rest of the course applies.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain the CIA triad and apply it to a real system

- Distinguish a threat, a vulnerability, a risk and a control

- Assess the risk in a real Nigerian small-business setup

- Explain why people, not technology, are usually the weakest link

- Describe the threat landscape a Nigerian individual or business actually faces

- Prioritise controls by cost against the risk they reduce

## The taught content

### What security actually protects: the CIA triad

Security is not one thing; it is three, and every control you will ever apply serves at least one of them. **Confidentiality** means the wrong people cannot read it — your bank details, your customers' data, your business's pricing. **Integrity** means nobody can change it without you knowing — a transferred amount, a contract, a database record. **Availability** means it is there when you need it — your files, your systems, your ability to trade.

The triad is genuinely useful because it turns vague worry into specific questions. 'We need security' means nothing. 'An attacker could read our customer list' is confidentiality. 'Someone could alter an invoice before it is paid' is integrity. 'Ransomware could stop us trading for a week' is availability. Once you can name which of the three is at stake, you can reason about what to do, and you can explain it to a client or an employer in one sentence.

Notice also that the three trade against each other and against convenience. Strong confidentiality usually means more authentication steps, which reduces availability and annoys users. Perfect availability — everything public, no passwords — destroys confidentiality. Security work is choosing the balance for the actual risk, not maximising all three, which is impossible.

### Threats, vulnerabilities, risks and controls

Four words that people use interchangeably and should not. A **threat** is anything that could cause harm — a thief, a ransomware campaign, a fire, a careless employee. A **vulnerability** is a weakness in your specific setup that a threat could exploit — an unpatched system, a reused password, an unattended unlocked laptop, a business with no backup. A **risk** is the combination: the likelihood that a threat exploits a vulnerability, multiplied by the impact if it does. And a **control** is what you put in place to reduce either the likelihood or the impact.

This distinction is the whole discipline. A threat you cannot do anything about — criminals exist — is not actionable. A vulnerability you own is. So the work is finding your vulnerabilities, estimating the risk each creates, and applying controls where the risk justifies the cost. That is why a security professional asks 'what could go wrong here, how likely, and how bad?' rather than reciting a list of famous attacks.

It also produces honest prioritisation. A small Nigerian business whose only computer holds customer records faces a real availability risk from ransomware with no backup, and a real confidentiality risk from a shared password written on a note. It does not face a meaningful risk from a nation-state actor. Spending money on the wrong risk is a failure even when the money buys genuine security, because the actual exposure is elsewhere.

### The threat landscape you will actually meet

For an individual or a small business in Nigeria, the realistic threats are mundane and financially motivated. **Account takeover** — someone obtaining your password and draining a bank account, an email inbox or a social account — is the most common serious loss. **Phishing and impersonation**, particularly on WhatsApp, where a message from a number posing as a relative, a bank or a delivery company asks for a code or a payment. **Fraudulent payment requests** and fake alerts, aimed at businesses that accept transfers.

**Ransomware and destructive malware**, which arrives through a pirated software download, a cracked activation tool, or an attachment, and encrypts everything — devastating for a business with no backup. **Device theft or loss**, which is a data breach if the device holds customer information and is not encrypted. And **insider risk**, which is not usually malice: a staff member who shares a password, leaves an account logged in on a shared machine, or falls for a scam while acting for the business.

What is notably **not** a realistic threat for most people here: a targeted attack by a sophisticated actor. Those exist and they matter to banks and governments, but designing a small business's security around them wastes money that would do far more good on backups, passwords and staff awareness. Saying this plainly to a client is part of the job.

### People are the weakest link, and why that is not a criticism

The majority of successful attacks on ordinary people and small businesses succeed because a person did something reasonable — clicked a plausible message, reused a password, shared a code to be helpful. Technical controls fail far less often than human ones, which is why awareness matters more than any product you could buy.

But framing this as 'users are stupid' is both unkind and useless, because it produces no improvement. The accurate framing is that **attackers design for normal human behaviour**. A message that arrives at the right moment, from an apparently known sender, asking for something small and urgent, exploits helpfulness and time pressure — traits that are virtues in every other context. People are not the weak link; the systems that let one mistake be catastrophic are.

The practical conclusion is to design so that a single mistake is survivable. Two-factor authentication means a stolen password alone is not enough. A backup means ransomware is an inconvenience rather than a disaster. Encrypted storage means a lost phone is a replacement cost rather than a breach. Every one of those converts a human error into a non-event, which is a far better outcome than training people never to make one.

### Choosing controls: cost against risk reduced

Security spending is a series of trade-offs, and the discipline is to buy the control that reduces the most risk per naira. For an individual or small business, the ranking is remarkably consistent. **Backups** first, because they turn the worst realistic outcome — total data loss — into an inconvenience, and they cost almost nothing. **Two-factor authentication** on email, banking and social accounts, because it neutralises the most common serious attack. **A password manager with unique passwords**, because reuse is how one breach becomes every breach.

Then **updates**, which close the vulnerabilities that malware actually exploits; **device encryption**, which makes theft survivable; **antivirus**, which catches the common malware that reaches ordinary machines; and **staff awareness**, which is free and compounds. Only well down the list come the things that sound impressive — firewalls with complex rules, penetration tests, security appliances — which matter for larger organisations and are largely wasted on a two-person business.

The honest test of any control is: what specific risk does it reduce, and by how much, and what does it cost in money and friction? If you cannot answer those three questions, you are buying reassurance rather than security. Being able to say that to a client — and to say 'you do not need this' — is what makes you trustworthy rather than merely alarming.

## Instructor demonstration

The instructor takes a real Nigerian small business setup, maps its assets and threats, walks a live phishing example, and produces a prioritised control list with the cost and risk reduction for each item.

### Describe the business

Use a real example: a Lagos fashion retailer with two staff, a laptop, a phone, a bank account, an Instagram shop and a WhatsApp Business line. Explain that this is the setup you must be able to secure.02

### List the assets

Identify what actually matters: the customer list, the bank account, the social accounts, the supplier relationships, the order records. Explain that you cannot protect what you have not named.03

### Apply the CIA triad to each asset

For each, state which of confidentiality, integrity and availability matters and why. Show that the bank account is integrity and availability while the customer list is confidentiality.04

### Identify the realistic threats

List account takeover, WhatsApp impersonation, fake payment alerts, ransomware from cracked software, and device theft. Explicitly rule out the sophisticated-actor scenario and explain why.05

### Find the vulnerabilities

Walk the setup and find them: one shared password, no backup, an unencrypted laptop, software installed from a pirated source, no two-factor. Explain that these, not the threats, are what you can act on.06

### Score the risks

For each vulnerability, estimate likelihood and impact. Show that ransomware-with-no-backup and account-takeover-with-no-2FA sit at the top.07

### Show a live phishing message

Examine a real WhatsApp impersonation message and identify the tells: urgency, a request for a code, a subtly wrong sender. Explain why it works on helpful people.08

### Show a fake payment alert

Examine a forged transfer notification and demonstrate verifying it in the bank app rather than trusting the screenshot. Explain how common this is against Nigerian businesses.09

### Demonstrate the single point of failure

Show how one reused password compromises email, banking and social together. Explain that reuse, not weak passwords, is the real failure.10

### Build the prioritised control list

Order the controls by risk reduced per naira: backup, 2FA, password manager, updates, encryption, antivirus, awareness. State the cost of each.11

### Show what converts an error into a non-event

Walk through a stolen password with 2FA on, and a ransomware hit with a backup. Explain that survivable mistakes beat perfect behaviour.12

### Name what to skip

List the impressive-sounding controls this business does not need and explain why. Explain that saying 'you do not need this' is what builds trust.

## Guided practice

### Risk-assess a real small business

You take a real Nigerian small business, list its assets, apply the CIA triad, identify its realistic threats and actual vulnerabilities, score the risks, and produce a prioritised control list with a cost and a stated risk reduction for each item — including what you would deliberately not spend on.

1. 01Describe the business: what it does, how many staff, what devices and accounts it uses.

2. 02List the assets that would genuinely hurt to lose or expose.

3. 03For each asset, state which of confidentiality, integrity and availability is at stake and why.

4. 04List the realistic threats, explicitly ruling out any that do not apply at this scale.

5. 05Inspect the setup and list the actual vulnerabilities you find.

6. 06Score each vulnerability on likelihood and impact.

7. 07Rank the resulting risks from most to least serious.

8. 08Write a prioritised control list ordered by risk reduced per naira.

9. 09State the cost of each control in money and in friction for the staff.

10. 10Identify one common control you would deliberately not buy, and justify it.

11. 11Describe one scenario where a mistake occurs and explain which control makes it survivable.

12. 12Present the assessment in one page, in language a business owner would understand.

The standard we hold you to

A one-page assessment naming the assets with their CIA exposure, listing realistic threats with irrelevant ones explicitly ruled out, identifying real vulnerabilities, scoring and ranking the risks, and giving a prioritised control list where every item states its cost and its risk reduction — including at least one justified omission.

## Common mistakes and how to fix them

You cannot say what you are protecting

Fix: Name the assets first. 'We need security' is not a requirement; 'an attacker could read our customer list' is. You cannot protect what you have not identified.

You confused a threat with a vulnerability

Fix: Criminals exist — that is a threat and you cannot change it. Your reused password is a vulnerability and you can. Act on the vulnerabilities, because those are the ones you own.

You designed the security around a sophisticated attacker

Fix: For an individual or small business the realistic threats are account takeover, impersonation, ransomware and theft. Spending on nation-state defences while there is no backup is a failure however impressive it looks.

You blamed users for falling for a scam

Fix: Attackers design for normal human behaviour — helpfulness and time pressure. Design so a single mistake is survivable instead of training people never to make one.

You bought controls you could not justify

Fix: For every control, state the specific risk it reduces, by how much, and what it costs. If you cannot answer all three, you are buying reassurance rather than security.

You recommended expensive tooling before the basics

Fix: Backup, two-factor, unique passwords and updates come first, always. They are cheap, they address the most common losses, and nothing else matters much until they are in place.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Learn to name which part of the CIA triad is at stake in any incident. It turns a panic into a specific problem with a specific answer, and it is the vocabulary that makes you sound competent in a room with a bank's security team or a worried business owner.

- Always ask what the realistic threat is before recommending anything. The honest answer for most Nigerian small businesses is impersonation, account takeover and ransomware, and saying so — while ruling out the dramatic scenarios — is what separates an adviser from a salesperson.

- Design for survivable mistakes rather than perfect behaviour. Two-factor, backups and encryption each convert a human error into a non-event, and that is worth more than any amount of training.

- Be willing to tell a client they do not need something. Recommending against an expensive control you could easily have sold is the fastest way to be trusted with everything else.

## Key termsCIA triadConfidentiality, integrity and availability — the three things every security control serves.ThreatAnything that could cause harm. You usually cannot change it.VulnerabilityA weakness in your specific setup. This is what you can act on.RiskLikelihood that a threat exploits a vulnerability, multiplied by the impact. The thing you prioritise.ControlA measure reducing either the likelihood or the impact of a risk.Account takeoverAn attacker obtaining credentials and using a real account. The most common serious loss for individuals and small businesses.RansomwareMalware encrypting your files for payment. Devastating without a backup; an inconvenience with one.Survivable mistakeA design where a single human error does not become a catastrophe. The realistic goal of security work.

## Homework before the next session

List your own assets and exposures

Write down what would genuinely hurt you to lose or expose, and which part of the CIA triad each involves. Do the same for one business you know.

Find three vulnerabilities in your own setup

Check for reused passwords, missing two-factor, absent backups and unencrypted devices. Write what you find rather than what you assume.

Write a control priority list for one business

Order the controls by risk reduced per naira, with a cost against each. Include one thing you would deliberately not buy, with a justification.

Explain the triad to a non-technical person

Describe confidentiality, integrity and availability to someone with no technical background, using their own business as the example. If they cannot repeat it back, simplify it.

## Assessment rubric

How this session is marked. The certificate for Cybersecurity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Triad application | Can define the three terms. | Applies each to specific assets in a real business and can state which is at stake in a given incident. |
| Vocabulary precision | Uses the terms roughly correctly. | Distinguishes threat, vulnerability, risk and control cleanly, and acts on vulnerabilities rather than threats. |
| Threat realism | Lists common threats. | Names the realistic Nigerian small-business threats and explicitly rules out the dramatic ones with reasoning. |
| Risk assessment | Identifies some risks. | Scores likelihood and impact for each vulnerability and produces a defensible ranking. |
| Control judgement | Suggests sensible controls. | Prioritises by risk reduced per naira, states each cost in money and friction, and justifies at least one deliberate omission. |

## Session questionsIs cybersecurity a real career path in Nigeria?+

Yes, and demand exceeds supply. Banks, fintechs, telcos, government agencies and larger businesses all employ security staff, and the entry route is exactly what this course teaches: understanding risk, then applying practical controls. Certifications help later, but the judgement comes first.Do I need to be a programmer to work in security?+

No, not for most roles. Security awareness, risk assessment, policy, incident handling and compliance are largely non-programming work and they are where most jobs are. Technical specialisms such as penetration testing need deeper skills, which you can add later.What is the single most important thing a small business can do?+

Back up its data, properly and tested. It converts the worst realistic outcome — ransomware or total loss — into an inconvenience, and it costs almost nothing. No other control has that ratio of benefit to cost.Why does everyone say two-factor authentication matters so much?+

Because account takeover is the most common serious attack, and it usually starts with a stolen or reused password. Two-factor means the password alone is not enough, which neutralises the attack entirely for a few minutes of setup per account.Is antivirus worth paying for?+

The built-in Windows Defender is adequate for most users and has the advantage of not slowing the machine. What matters more is that something is active, that the system is updated, and that software is not installed from pirated sources — which is where most Nigerian ransomware actually comes from.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: Authentication & Awareness](https://www.cea.ng/classes/cybersecurity/authentication-and-awareness)

Cybersecurity

4 weeks · 8 sessions · ₦50,000 · you leave with a security assessment report[See the full course](https://www.cea.ng/classes/cybersecurity)[Enrol now](https://www.cea.ng/admissions)
