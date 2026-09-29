---
title: "Session 3: Passwords & Account Security"
description: "Passwords remain the foundation of almost everything, and most of what people believe about them is wrong. This session covers how they actually fail, why a password manager changes the entire problem, and how to secure the accounts that matter — including the practical account hygiene most people never do."
date: "2026-09-12"
class_slug: "cybersecurity"
---

Passwords remain the foundation of almost everything, and most of what people believe about them is wrong. This session covers how they actually fail, why a password manager changes the entire problem, and how to secure the accounts that matter — including the practical account hygiene most people never do.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain how passwords are actually attacked, and what that means for your choices

- Use a password manager properly, including on a phone

- Construct memorable strong secrets and explain why length beats complexity

- Audit and fix reused and weak passwords across real accounts

- Secure high-value accounts: email, banking, social and business accounts

- Recognise breach notifications and respond correctly

## The taught content

### How passwords actually fail

Understanding the attack tells you what to defend against, and the reality is different from the common belief. **Guessing and dictionary attacks** work against weak passwords — 'password', '123456', names, dates — and against predictable patterns like capitalising the first letter and appending a year. Automated tools test billions of candidates, so a short or patterned password falls quickly.

But the most common real-world failure is not cracking at all: it is **reuse**. Attackers buy lists of email-and-password pairs leaked from breached services and simply try them everywhere — a technique called **credential stuffing**. If you use the same password on a forum that was breached in 2019 and on your bank, the forum breach becomes a bank breach. This is why uniqueness matters more than complexity, and it is the single most important idea in this session.

The third vector is **phishing**, where you hand the password over believing the site is genuine, and the fourth is **malware** on an infected machine capturing what you type. Note that neither is defeated by a stronger password, which is why the earlier session's two-factor and URL checking matter alongside this one.

### Length beats complexity, and why

The traditional advice — mix capitals, symbols and numbers, change it often — was based on a model of attacks that is largely obsolete, and it produces passwords that are hard to remember and easy to write down. What actually resists cracking is **length**, because each additional character multiplies the search space rather than adding to it. A twenty-character passphrase of ordinary words is vastly harder to crack than an eight-character string of symbols, and it is far easier to remember.

So the guidance is: **let the password manager generate long random passwords** for every account, and never construct them yourself. Where you must memorise a secret — the manager's master password, or a device login — use a **passphrase** of several unrelated words, which is both long and memorable. 'correct horse battery staple' is the classic illustration, and the principle holds: unrelated words, several of them, no personal information.

And **stop changing passwords on a schedule**. Forced rotation produces predictable variations — the same root with an incremented number — which is weaker than one strong password kept indefinitely. Change a password when there is a reason: a breach, a suspicion, or a shared secret that should no longer be shared. Otherwise leave it.

### The password manager, which changes the whole problem

A password manager stores an encrypted vault of credentials, unlocked by one master passphrase, and fills them into sites automatically. It solves three problems at once: you can have a unique strong password everywhere because you never need to remember any of them; it autofills only on the correct domain, which is a genuine phishing defence because a fake site will not trigger it; and it can generate, audit and warn you about reuse.

The **master passphrase** is now the single most important secret you hold, because it protects everything. Make it a long passphrase of unrelated words, memorise it, and never use it anywhere else. Enable two-factor on the vault itself. And make sure you have a recovery path — most managers provide an emergency kit or recovery key, and losing the master with no recovery is unrecoverable by design.

Choose a reputable manager and enable its **sync** so your phone and computer share the vault, because a manager you do not have with you will not be used. The common objection — 'putting all my passwords in one place is risky' — inverts the real situation: your passwords are already all in one place, in your head, protected by the weakest of them. A manager makes them all strong and encrypts them at rest.

### Auditing and fixing real accounts

An audit is concrete work, not a worry. Start with the manager's built-in audit, which flags reused and weak passwords, or work through your accounts by importance. The order is: **primary email** first, because it resets everything else; then **banking and payment**; then **social accounts**, which are targets for impersonation fraud against your contacts; then **business accounts** if you have them; then everything else over time.

For each account, generate a new unique password in the manager, and enable two-factor where available. Where an account does not support a manager, use its own generator. Expect this to take an hour or two spread over a few sittings — that is normal, and it is a one-time cost that removes the entire category of credential-stuffing risk permanently.

Then check whether your email appears in known breaches. Services such as Have I Been Pwned will tell you, and a hit is not a disaster but it is information: change that password everywhere it was used, and assume anything protected by it should be treated as compromised. Being told you were breached is far better than discovering it through a drained account.

### Business accounts and shared access

Small businesses have additional exposures that individuals do not. **Shared passwords** — one login written on a note and used by everyone — mean you cannot tell who did what, you cannot revoke access for one person without changing it for everyone, and a departing employee keeps working access indefinitely. That last point is a genuine and common problem: staff leave with the social media login, the email password, or the bank app still installed on their phone.

The fixes are practical. Give **each person their own account** wherever the service supports it, so access can be revoked individually. Where a single account is unavoidable, store it in a **shared vault** in a password manager rather than on a note, and change it when someone leaves. Use **two-factor on every business account**, and make sure the recovery details belong to the business owner rather than to a member of staff who might leave.

Then apply the same discipline to **devices**: a machine leaving the business should have its accounts signed out and its data wiped, and staff should not be logging into business accounts on personal machines they control. None of this is sophisticated; it is the ordinary hygiene that most small businesses have never done, and doing it puts you ahead of nearly all of them.

## Instructor demonstration

The instructor sets up a password manager from scratch, generates and stores credentials, runs the reuse audit, fixes a set of real accounts in priority order, and configures a small business's shared vault with per-person access.

### Explain credential stuffing first

Show how a breached password list is tried across many services. Explain that this, not cracking, is the most common real failure and why uniqueness beats complexity.02

### Demonstrate length versus complexity

Compare an eight-character complex password with a twenty-character passphrase and explain why length multiplies the search space while complexity only adds to it.03

### Install and set up a password manager

Create the vault with a long unrelated-word master passphrase, enable two-factor on the vault, and save the recovery kit. Explain that this passphrase is now the most important secret you hold.04

### Enable sync across devices

Connect the phone and the computer. Explain that a manager you do not carry will not be used, which defeats the purpose.05

### Generate and store a password

Let the manager generate a long random password for a real account and store it. Explain that you should never construct passwords yourself again.06

### Show the autofill phishing defence

Demonstrate that autofill triggers only on the correct domain. Explain that a convincing fake site will not trigger it, which is a real defence.07

### Run the reuse audit

Open the manager's audit and show the reused and weak passwords it finds. Explain that this list is the actual work to be done.08

### Fix the primary email first

Generate a new unique password, enable two-factor, and audit the recovery details. Explain that this account resets everything else so it goes first.09

### Work through banking and social accounts

Fix each in priority order, enabling two-factor where available. Note that social accounts are targets for impersonation fraud against your contacts.10

### Check for known breaches

Look up an email address in a breach-checking service and explain what a hit means: change that password everywhere and treat what it protected as compromised.11

### Set up a business shared vault

Create a shared vault for a small business with per-person access, so access can be revoked individually. Explain why a shared note is a liability.12

### Handle a departing employee

Demonstrate revoking one person's vault access and rotating the accounts they knew. Explain that staff leaving with live access is a common and preventable exposure.

## Guided practice

### Set up a manager and fix your real accounts

You set up a password manager with a strong master passphrase and recovery, then audit and fix your real accounts in priority order — primary email, banking, social, business — generating unique passwords and enabling two-factor, and design a shared-vault arrangement for a small business.

1. 01Write down what credential stuffing is and why uniqueness matters more than complexity.

2. 02Choose a reputable password manager and create the vault.

3. 03Set a master passphrase of several unrelated words, with no personal information.

4. 04Enable two-factor on the vault itself and save the recovery kit somewhere safe.

5. 05Enable sync between your phone and your computer.

6. 06Run the manager's reuse and weakness audit and record what it finds.

7. 07Fix your primary email: unique generated password, two-factor, recovery details audited.

8. 08Fix your banking and payment accounts next, with two-factor on each.

9. 09Fix your social accounts, noting why they matter for impersonation fraud.

10. 10Fix any business accounts you hold.

11. 11Check your email address against a breach-checking service and act on any hit.

12. 12Continue through the remaining accounts until no reuse remains.

13. 13Design a shared-vault arrangement for a small business with per-person access.

14. 14Write the procedure for revoking access and rotating credentials when someone leaves.

The standard we hold you to

A working manager with a strong master passphrase, vault two-factor and a saved recovery kit, synced across devices; the primary email, banking, social and business accounts fixed with unique generated passwords and two-factor; a breach check completed and acted on; and a written shared-vault and leaver procedure for a small business.

## Common mistakes and how to fix them

You reuse one password across several services

Fix: This is the most common real failure. Attackers buy breached credential lists and try them everywhere, so one weak site compromises all of them. A password manager removes the entire problem.

You built a complex eight-character password and wrote it down

Fix: Length beats complexity, and a manager means you never need to remember it. A twenty-character generated password you cannot recall is stronger than a clever short one on a sticky note.

You change passwords on a schedule

Fix: Stop. Forced rotation produces predictable variations of the same root, which is weaker than one strong password kept indefinitely. Change for a reason — breach, suspicion, or a shared secret — not by calendar.

Your master passphrase is weak or reused

Fix: It protects everything now. Use several unrelated words, memorise it, and never use it anywhere else. Enable two-factor on the vault and save the recovery kit.

You enabled a manager but never sync it to your phone

Fix: A manager you do not carry will not be used, and you will fall back on a memorised password. Enable sync so the vault is with you wherever you log in.

Your business shares one login written on a note

Fix: Give each person their own account, or use a shared vault. A note means you cannot tell who did what, cannot revoke one person's access, and a departing employee keeps working access.

You ignored a breach notification

Fix: A hit means that password is in criminal hands. Change it everywhere it was used and treat what it protected as compromised. Being told is far better than discovering it through a drained account.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Set up a password manager before doing anything else in this session, because every other password recommendation depends on it. Without one, unique strong passwords are simply not practical for a person with fifty accounts.

- Fix your primary email first, then banking, then social. That order reflects what an attacker does with each: email unlocks everything else, banking takes money, and social accounts are used to defraud your contacts in your name.

- Never construct a password yourself again. Let the manager generate long random ones, and reserve memorisable passphrases for the two or three secrets you genuinely must remember.

- Rotate credentials and revoke access when anyone leaves a business, without exception. Staff departing with live access to a social account or a bank app is a common and entirely preventable exposure, and it is usually discovered too late.

## Key termsCredential stuffingTrying breached email-and-password pairs across many services. The most common real-world password failure.Password managerAn encrypted vault holding unique strong passwords, unlocked by one master passphrase. Also a phishing defence through domain-bound autofill.Master passphraseThe single secret protecting the whole vault. Long, unrelated words, never reused anywhere.PassphraseA secret of several unrelated words. Long, memorable and far stronger than a short complex password.Recovery kitThe manager's emergency access mechanism. Losing the master with no recovery is unrecoverable by design.Shared vaultA manager vault a business shares with per-person access, so individuals can be revoked without changing everything.Breach notificationNotice that a service you used was compromised, meaning that password is in criminal hands.Leaver procedureRevoking access and rotating credentials when someone leaves. The control most small businesses lack.

## Homework before the next session

Set up your password manager

Vault created, strong master passphrase, two-factor on the vault, recovery kit saved, and sync enabled on your phone. Do this before anything else.

Fix your top five accounts

Primary email, banking, payment, and two social accounts: unique generated passwords, two-factor enabled, recovery details audited.

Run the reuse audit and clear it

Work through what the manager reports until no reuse remains. Spread it over a few sittings if needed — this is a one-time cost.

Write a leaver procedure for one business

List every account a departing employee could access and the steps to revoke and rotate each. Most small businesses have never written this.

## Assessment rubric

How this session is marked. The certificate for Cybersecurity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Attack understanding | Knows weak passwords are risky. | Explains credential stuffing as the dominant real failure, and why uniqueness matters more than complexity and why length beats it. |
| Manager setup | Has installed a manager. | Strong master passphrase, vault two-factor enabled, recovery kit saved, and sync working across phone and computer. |
| Audit and remediation | Has changed some passwords. | Ran the reuse audit, fixed accounts in priority order starting with primary email, and enabled two-factor throughout. |
| Breach response | Is aware breaches happen. | Checked against a breach service, acted on any hit by changing that password everywhere, and understands what a hit implies. |
| Business hygiene | Understands shared passwords are bad. | Designed a shared vault with per-person access and written a leaver procedure covering revocation and rotation. |

## Session questionsIs it safe to put all my passwords in one app?+

Your passwords are already all in one place — your head — protected by the weakest of them. A manager encrypts them at rest with a key only you hold, makes every one of them strong, and adds domain-bound autofill that resists phishing. It is strictly safer than the alternative.What if I forget my master passphrase?+

Use the recovery kit or emergency access you set up. Without it, the vault is unrecoverable by design — that is the point of end-to-end encryption. This is why saving the recovery kit is part of setup rather than an optional extra.Should I still change my passwords regularly?+

No. Scheduled rotation produces predictable variations of the same root, which is weaker than one strong password kept indefinitely. Change a password when there is a reason — a breach, a suspicion, or a shared secret that should no longer be shared.How do I create a good master passphrase?+

Several unrelated words, none of them personal, no common phrase from a song or a proverb. It should be long enough to be strong and memorable enough that you will not write it down. Do not use it anywhere else, ever.My business has one login everyone uses. Is that acceptable?+

It is common and it is a genuine liability: you cannot tell who did what, you cannot revoke one person without changing it for everyone, and someone who leaves keeps working access. Move to per-person accounts where possible, otherwise a shared vault plus rotation on every departure.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Authentication & Awareness](https://www.cea.ng/classes/cybersecurity/authentication-and-awareness)[Next session 4: Phishing, Scams & Malware](https://www.cea.ng/classes/cybersecurity/phishing-scams-malware)

Cybersecurity

4 weeks · 8 sessions · ₦50,000 · you leave with a security assessment report[See the full course](https://www.cea.ng/classes/cybersecurity)[Enrol now](https://www.cea.ng/admissions)
