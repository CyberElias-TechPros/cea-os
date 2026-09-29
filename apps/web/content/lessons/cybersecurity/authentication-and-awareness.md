---
title: "Session 2: Authentication & Awareness"
description: "How systems decide who you are, why most of that machinery fails in practice, and how people — including you — are targeted. This session covers the authentication methods and their real weaknesses, then social engineering as the attack that bypasses all of it."
date: "2026-09-12"
class_slug: "cybersecurity"
---

How systems decide who you are, why most of that machinery fails in practice, and how people — including you — are targeted. This session covers the authentication methods and their real weaknesses, then social engineering as the attack that bypasses all of it.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain the three authentication factors and why two of them matter

- Compare passwords, codes, apps, keys and biometrics on real trade-offs

- Set up two-factor authentication correctly, including recovery

- Explain how session and cookie theft bypasses strong authentication

- Recognise social engineering techniques and why they work

- Build personal awareness habits that survive a busy day

## The taught content

### The three factors, and why one is not enough

Authentication proves who you are, and there are only three kinds of proof. **Something you know** — a password or PIN. **Something you have** — a phone receiving a code, a hardware key, a card. **Something you are** — a fingerprint, a face. A system using one of these is **single-factor**; one requiring two different kinds is **two-factor** or **multi-factor**.

The distinction between the **kinds** matters more than the count. Two passwords are not two factors, because both are 'something you know' and an attacker who obtains one likely obtained both. A password plus a code from your phone is genuinely two factors, because compromising them requires two different kinds of attack. This is why the phrase 'two-step verification' sometimes means something weaker than real two-factor, and why you should check what you have actually enabled.

The reason two-factor works is straightforward: password theft is common and cheap, because passwords are reused, guessed, phished and bought in bulk after breaches. Getting physical access to your phone at the same moment is neither. That mismatch is the whole security gain, and it is why two-factor is the highest-value control available to an ordinary person.

### Comparing the methods honestly

**SMS codes** are the most common and the weakest of the real second factors, because they can be intercepted through SIM-swap fraud — where an attacker convinces your network to move your number to their SIM, which is a genuine and documented problem in Nigeria. They are still vastly better than nothing, and for most accounts they are worth enabling, but they are not the best option where a choice exists.

**Authenticator apps** — Google Authenticator, Microsoft Authenticator, Authy — generate codes on the device with no network involved, so there is nothing to intercept. They are strictly better than SMS and cost nothing. **Passkeys and hardware keys** are stronger again: a passkey uses public-key cryptography so there is no shared secret to phish, and a hardware key requires physical possession. These are the right choice for your most important accounts where supported.

**Biometrics** — fingerprint and face — are convenient and adequate for unlocking your own device, but understand what they are: a local unlock mechanism, not usually a real second factor for a remote service, and they cannot be changed if compromised. Your fingerprint is not a secret in the way a password is; you leave copies of it everywhere you touch.

### Setting up two-factor properly, including recovery

Enabling two-factor is easy; the part people skip is recovery, and it is the part that causes the disasters. When you enable it, the service gives you **backup or recovery codes** — a list of one-time codes for use if you lose your phone. Save them somewhere that is not the phone: printed and kept safely, or stored in your password manager. Losing a phone with two-factor enabled and no recovery codes is a genuinely difficult problem, and it locks people out of email accounts they depend on.

Protect the **recovery email and phone number** on every important account with the same care as the account itself, because an attacker who can change them can reset everything. Check what those are set to on your main email account today — an old number you no longer control is a serious and common exposure.

And understand the ordering: your **email account is the master key**, because almost every other service can be reset through it. If you secure one account to a high standard, make it your primary email. Two-factor on it, a unique strong password, correct recovery details, and ideally a passkey. Everything else inherits that protection.

### Session theft: bypassing authentication entirely

Here is the part most awareness training omits, and it matters. When you log into a website, the server gives your browser a **session cookie** — a token proving you are authenticated, so you do not have to type your password on every page. That cookie is what actually grants access, and stealing it grants access too, **without ever needing your password or your second factor**.

This is why a phishing page can succeed even against a two-factor account: the attacker proxies your login in real time, you enter both factors believing you are on the real site, and the attacker receives a valid session token. It is also why malware on a machine can steal active sessions from a browser, and why logging in on an untrusted or shared computer is genuinely risky in a way that 'being careful' does not fix.

The practical defences are concrete. Check the **URL before entering credentials**, every time, because a proxied phishing site has a different address however real it looks. **Log out on shared machines** rather than closing the tab. **Do not log into important accounts on computers you do not control** — a business centre machine, a friend's laptop. And treat a sudden request to re-authenticate as a reason to type the address yourself rather than follow the link.

### Social engineering: the attack that works

Social engineering is manipulation rather than technology, and it works because it exploits traits that are useful in every other context: helpfulness, urgency, deference to authority, and reluctance to seem difficult. The common patterns are consistent. **Urgency** — 'your account will be closed within an hour' — which suppresses the checking you would otherwise do. **Authority** — a message apparently from a bank, a network operator, or your boss. **Familiarity** — a WhatsApp message from a number using a relative's name and photograph, asking for a small favour.

The specific asks are almost always one of three things: a **one-time code**, which is never legitimately requested by any real organisation and is the clearest signal of an attack; a **payment**, usually urgent and to an unfamiliar account; or **credentials**, via a link to a convincing fake login page. Learn those three and you will recognise the overwhelming majority of attempts, because the technique varies but the goal does not.

The defence is a small set of habits rather than vigilance, because vigilance fails when you are tired. **Never share a one-time code with anyone, for any reason** — no bank, network or delivery company will ever ask. **Verify through a second channel**: if a message claims to be from your bank, call the number on your card rather than the one in the message. **Slow down deliberately** when anything is urgent, because urgency is itself the strongest indicator that something is wrong. And **check the sender and the link** before acting, not after.

## Instructor demonstration

The instructor demonstrates each authentication method, enables two-factor correctly with recovery codes, shows a live session-cookie theft to explain why strong passwords are not enough, and walks through four real social-engineering attempts.

### Show single-factor login

Log into an account with only a password and explain that password theft is cheap and common because passwords are reused and bought in bulk after breaches.02

### Distinguish two-step from two-factor

Show two passwords versus a password plus a device code. Explain that only different kinds of factor count, and why the marketing phrase can mislead.03

### Demonstrate an SMS code and explain SIM-swap

Enable SMS verification and explain how an attacker can move your number to their SIM. Conclude that it is worth enabling but not the best option.04

### Set up an authenticator app

Scan the QR code and generate codes. Explain that nothing crosses a network, so there is nothing to intercept, which makes it strictly better than SMS.05

### Show a passkey

Register a passkey and explain that it uses public-key cryptography, so there is no shared secret to phish. Note where support is still limited.06

### Save the recovery codes

Display the backup codes and store them properly. Explain the lockout disaster that follows losing a phone with two-factor and no recovery codes.07

### Audit recovery details

Check the recovery email and phone number on the main email account. Explain that an old number you no longer control is a serious exposure.08

### Explain why email is the master key

Show that almost every other service resets through email. Conclude that this is the one account to secure to the highest standard.09

### Demonstrate a session cookie

Show the session cookie in the browser after login and explain that this token, not the password, is what grants access on each page.10

### Explain proxied phishing

Describe how a real-time proxy captures a valid session even with two-factor enabled. Emphasise checking the URL as the defence.11

### Examine four social-engineering messages

Show a bank impersonation, a network-operator message, a WhatsApp relative scam and a fake payment alert. Identify the ask in each — code, payment or credentials.12

### Practise the second-channel verification

Take one message and demonstrate calling the number on the card rather than the one in the message. Explain why this habit defeats most impersonation.

## Guided practice

### Harden your own authentication and analyse four attacks

You secure your own most important accounts properly — two-factor with recovery codes saved, recovery details audited, unique passwords — then analyse four real social-engineering attempts, identifying the technique, the ask and the specific habit that defeats each.

1. 01List your five most important accounts and identify which is your primary email.

2. 02Check which of the three factors each account currently uses.

3. 03Enable two-factor on your primary email first, preferring an authenticator app over SMS.

4. 04Save the recovery codes somewhere that is not your phone, and confirm you can find them.

5. 05Audit the recovery email and phone number on your primary email and correct anything stale.

6. 06Enable two-factor on your remaining four important accounts.

7. 07Confirm no password is reused across any of them, using a password manager.

8. 08Record which method each account uses and note where a passkey is available.

9. 09Collect four real social-engineering messages you or someone you know has received.

10. 10For each, identify the technique used — urgency, authority or familiarity.

11. 11For each, identify the ask: a code, a payment, or credentials.

12. 12For each, state the specific habit that defeats it.

13. 13Write the four habits as a list you could give to a non-technical relative.

The standard we hold you to

Two-factor enabled on all five accounts with the primary email secured first, recovery codes saved off-device and verified findable, recovery details audited and corrected, no password reused, and all four attacks analysed by technique, ask and defeating habit with the habits written in plain language.

## Common mistakes and how to fix them

You counted two passwords as two factors

Fix: Only different kinds of factor count — something you know, have or are. Two passwords are both 'something you know' and an attacker with one likely has both.

You enabled two-factor but did not save the recovery codes

Fix: Save them printed or in your password manager, not on the phone. Losing a phone with two-factor and no recovery codes locks you out of accounts you depend on.

Your recovery phone number is one you no longer control

Fix: Audit the recovery email and number on every important account, starting with your primary email. An attacker who can change them can reset everything else.

You assumed a strong password protects a two-factor account

Fix: Session tokens grant access without a password or a second factor. Check the URL before entering credentials, log out on shared machines, and never log into important accounts on computers you do not control.

You shared a one-time code to be helpful

Fix: Never share a code with anyone for any reason. No bank, network or delivery company will ever ask for one, and a request for a code is the clearest signal of an attack.

You relied on vigilance rather than habits

Fix: Vigilance fails when you are tired or busy. Build fixed habits — never share codes, verify through a second channel, slow down when anything is urgent — because those hold when attention does not.

You used SMS where an authenticator app was available

Fix: Prefer an app. SMS can be defeated by SIM-swap fraud, which is a documented problem in Nigeria. Enable SMS if that is all that is offered, but choose the app when you can.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Secure your primary email account above everything else, because almost every other service can be reset through it. Two-factor, a unique password, correct recovery details and ideally a passkey — that one account protects everything downstream.

- Save recovery codes the moment you enable two-factor, and verify you can actually find them. The lockout that follows a lost phone with no recovery codes is one of the most common and most preventable security disasters.

- Treat any request for a one-time code as an attack, without exception. No legitimate organisation ever asks for one, so this single absolute rule defeats a very large share of real attempts with no judgement required.

- Check the URL before entering credentials, every time. It is the only reliable defence against proxied phishing, which defeats two-factor entirely, and it takes two seconds.

## Key termsAuthentication factorA kind of proof: something you know, something you have, or something you are. Two different kinds make real two-factor.SIM-swapFraud moving your phone number to an attacker's SIM, defeating SMS codes. Documented in Nigeria.Authenticator appSoftware generating codes locally with no network involvement, so nothing can be intercepted. Prefer it to SMS.PasskeyA public-key credential with no shared secret, so there is nothing to phish. The strongest practical option where supported.Recovery codeA one-time backup code for use when your second factor is unavailable. Save it off-device.Session cookieThe token proving you are authenticated. Stealing it grants access without a password or second factor.Proxied phishingA real-time fake site relaying your login to the real one, capturing a valid session despite two-factor.Social engineeringManipulation exploiting helpfulness, urgency and authority rather than technical weakness.

## Homework before the next session

Secure your primary email to the highest standard

Two-factor via an app, a unique strong password, recovery codes saved off-device, recovery email and number audited, and a passkey if supported.

Audit five accounts

For each, record what factors it uses, whether the password is unique, and what its recovery details are. Fix anything stale.

Collect four real scam messages

From your own phone or family members'. Identify the technique, the ask and the defeating habit for each.

Teach the four habits to one person

Never share codes, verify through a second channel, slow down when it is urgent, check the link. If they cannot repeat them, simplify until they can.

## Assessment rubric

How this session is marked. The certificate for Cybersecurity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Factor understanding | Knows there are three factors. | Distinguishes two-step from genuine two-factor and can explain why password theft is cheap while simultaneous device theft is not. |
| Method selection | Has enabled two-factor somewhere. | Chooses an authenticator app over SMS with reasoning, knows what a passkey offers, and understands the limits of biometrics. |
| Recovery | Enabled two-factor. | Recovery codes saved off-device and verified findable, recovery email and number audited, and the primary email secured first as the master key. |
| Session awareness | Knows passwords matter. | Explains how session theft and proxied phishing bypass strong authentication, and checks URLs and logs out on shared machines. |
| Social engineering defence | Is generally cautious. | Identifies urgency, authority and familiarity, recognises the three asks, and holds fixed habits rather than relying on vigilance. |

## Session questionsIs SMS two-factor worth enabling if it can be SIM-swapped?+

Yes — enable it, because it stops the far more common attacks. But prefer an authenticator app wherever the account offers one, and protect your mobile account with a PIN or port-out protection, which most Nigerian networks now provide.What is a passkey and should I use one?+

A passkey replaces a password with public-key cryptography, so there is no secret to steal or phish. Use one on your most important accounts where supported. It is the strongest practical option available today and it is also more convenient than typing a password.I lost my phone with two-factor enabled. What do I do?+

Use the recovery codes you saved. If you did not save them, contact the service's support with identity evidence — which is slow and sometimes unsuccessful. This is exactly why saving recovery codes off-device is part of enabling two-factor, not an optional extra.Can a phishing attack really beat two-factor?+

Yes, through a real-time proxy that relays your login to the genuine site and captures the resulting session token. The defence is checking the URL before entering credentials, because the fake site's address differs however convincing the page looks.Someone asked me for the code sent to my phone. Is that ever legitimate?+

Never. No bank, network operator, delivery company or government agency will ever ask for a one-time code. A request for a code is the single clearest signal of an attack, and treating it as an absolute rule requires no judgement in the moment.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Threats, Risk & the CIA Triad](https://www.cea.ng/classes/cybersecurity/threats-risk-cia)[Next session 3: Passwords & Account Security](https://www.cea.ng/classes/cybersecurity/passwords-and-account-security)

Cybersecurity

4 weeks · 8 sessions · ₦50,000 · you leave with a security assessment report[See the full course](https://www.cea.ng/classes/cybersecurity)[Enrol now](https://www.cea.ng/admissions)
