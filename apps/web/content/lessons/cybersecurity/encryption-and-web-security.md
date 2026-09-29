---
title: "Session 6: Encryption & Web Security"
description: "The last technical layer: how encryption actually protects data at rest and in transit, what HTTPS does and does not guarantee, and how to browse and transact safely. This session covers the practical cryptography a working professional needs, without the mathematics."
date: "2026-09-12"
class_slug: "cybersecurity"
---

The last technical layer: how encryption actually protects data at rest and in transit, what HTTPS does and does not guarantee, and how to browse and transact safely. This session covers the practical cryptography a working professional needs, without the mathematics.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain encryption at rest and in transit in practical terms

- Enable and verify device encryption and understand recovery keys

- Explain what HTTPS guarantees and the three things it does not

- Recognise certificate warnings and respond correctly

- Transact safely online and recognise a secure payment page

- Explain end-to-end encryption and where it applies

## The taught content

### Encryption at rest and in transit

Encryption converts data into a form that is unreadable without a key, and it applies in two distinct places. **In transit** means while data travels — between your browser and a website, your phone and a server. **At rest** means while data sits — on your laptop's disk, your phone's storage, a backup drive in a drawer. Both matter, and people usually think about only the first.

**At rest** is the one most people neglect, and it is what makes device theft survivable. An unencrypted laptop that is stolen hands over every file on it immediately. An encrypted one hands over a brick, because the data is unreadable without the key. Both Windows (**BitLocker**) and macOS (**FileVault**) provide this, and Android and iOS encrypt by default when a passcode is set — so for most phones the action is simply to have a real passcode rather than none.

**In transit** is what HTTPS provides, and it is now the default on almost the entire web. The important idea is that encryption protects the **content** of the connection from anyone watching the network, which on public Wi-Fi or any network you do not control is the difference between your banking details being readable and being noise.

### Device encryption and the recovery key

Enable encryption on every machine you or a client uses. On Windows, check whether **BitLocker** or **device encryption** is available and enabled; on macOS, confirm **FileVault** is on. On phones, a passcode or biometric lock is what activates the built-in encryption, so a phone with no lock is an unencrypted phone.

The critical and routinely skipped step is the **recovery key**. Full-disk encryption means that if something goes wrong — a hardware change, a failed update, a forgotten PIN — the data is genuinely inaccessible without the recovery key. That is the entire point of encryption, and it applies equally to you. Save the key somewhere that is not the device: printed and kept safely, or stored in a password manager or a Microsoft or Apple account.

Losing the recovery key is unrecoverable by design, and it is a real outcome: people enable encryption, something breaks a year later, and years of files are gone. So the honest guidance is that enabling encryption is essential and saving the recovery key is part of enabling it, not an optional extra. Write it into any procedure you give a client.

### What HTTPS does, and the three things it does not

HTTPS encrypts the connection between your browser and the website, and it does three useful things. It **protects the content** from anyone watching the network. It **proves the site's identity** through a certificate issued to that domain, so you are talking to the real bank rather than an impostor on the network. And it **protects integrity**, so nobody in between can alter what is sent or received.

Now the three things it does not do, which matter more. It **does not make a site trustworthy** — criminals obtain valid certificates routinely, and a padlock on a fraudulent site is entirely normal. It **does not protect against phishing**, because a proxied fake site can present a valid certificate for its own domain while you believe you are on the real one. And it **does not protect the site's own security** — an HTTPS site can still be breached, and your data stored there can still be stolen afterwards.

The practical conclusion: HTTPS is necessary and it is table stakes, but it is not a trust signal. The trust question is answered by the **domain name**, which is why checking the URL remains the single most important habit in web safety. A padlock tells you the connection is encrypted; only the address tells you who you are talking to.

### Certificate warnings: when to stop

A certificate warning means the browser could not verify the site's identity, and it should be treated as a hard stop rather than a nuisance to click through. The common causes: an **expired certificate**, which is sloppy but not necessarily malicious; a **name mismatch**, where the certificate belongs to a different domain, which is a serious signal; and an **untrusted issuer**, which can indicate someone intercepting your connection.

The discipline is simple: **on a site where you enter credentials or make a payment, a certificate warning means stop**. Close the tab and type the address yourself. On a site where you are reading an article and entering nothing, the risk is lower but still worth noting. Never click through a warning to reach a banking or email page, because that is precisely the situation an interception attack creates.

One legitimate exception is worth knowing: a warning on a site you are reaching through a **captive portal** — the login page on hotel or airport Wi-Fi — is normal, because the network is intercepting to present its login. That is expected. What is not expected is a warning on your bank, and distinguishing the two is a matter of noticing where you are rather than any technical test.

### Transacting safely and end-to-end encryption

Safe online payment is mostly about the site, not the padlock. Check the **domain carefully** — a fraudulent store will use a name close to a real one. Prefer **established payment methods** that offer protection, and be sceptical of a seller who insists on a direct bank transfer for goods from an unknown source, because that route has no recourse. For Nigerian online shopping, recognised marketplaces and payment processors exist precisely because direct transfers to strangers are how most e-commerce fraud works.

**End-to-end encryption** is a distinct and stronger idea: the message is encrypted so that only the sender and recipient can read it, and nobody in between — not even the service provider — can. WhatsApp messages use it, which is why the content is protected in transit. But understand the limits: end-to-end encryption protects the **content**, not the **metadata** (who you contacted, when, how often), and it does nothing at all about what happens at either end — a compromised phone reads everything, and a screenshot defeats any encryption.

So the honest summary is that encryption is genuinely powerful and genuinely limited. It makes stolen devices useless and network eavesdropping useless, and it does nothing about phishing, weak passwords, malware on your own machine, or a person you trusted. Knowing both halves is what lets you advise a client correctly rather than either overselling encryption or dismissing it.

## Instructor demonstration

The instructor enables device encryption and saves the recovery key, inspects certificates on real sites including a fraudulent one, demonstrates what a warning means, and walks through safe payment practice and the real limits of end-to-end encryption.

### Check the encryption status

Show whether BitLocker or device encryption is active on a Windows machine and FileVault on a Mac. Explain the difference between at rest and in transit.02

### Enable encryption

Turn it on and explain that this is what makes a stolen laptop a brick rather than a handover of every file on it.03

### Save the recovery key

Display the recovery key and store it in a password manager and printed. Explain that losing it is unrecoverable by design and that this is part of enabling encryption.04

### Check phone encryption

Show that a passcode activates the built-in encryption on Android and iOS, and that a phone with no lock is unencrypted.05

### Inspect a valid certificate

Open the padlock on a real bank site and read the certificate: the domain it was issued to, the issuer, the expiry. Explain what each field proves.06

### Show a fraudulent site with a valid certificate

Demonstrate that criminals hold valid certificates too. Explain that the padlock is not a trust signal and that only the domain answers who you are talking to.07

### Trigger a certificate warning

Show a name mismatch or expired certificate and explain the discipline: on any site taking credentials or payment, a warning means stop and retype the address.08

### Explain the captive-portal exception

Show a hotel Wi-Fi login page and explain why a warning there is normal, and how that differs from a warning on your bank.09

### Walk a safe purchase

Check the domain carefully, confirm a recognised payment method, and show why a direct transfer to an unknown seller has no recourse.10

### Show an e-commerce fraud pattern

Examine a fake store using a name close to a real one. Explain that domain checking, not the padlock, is the defence.11

### Explain end-to-end encryption

Show that WhatsApp content is encrypted end to end, then explain that metadata is not protected and that a compromised phone reads everything.12

### State the honest limits

List what encryption defeats — stolen devices, network eavesdropping — and what it does not: phishing, weak passwords, malware, and trusted insiders.

## Guided practice

### Encrypt your devices and audit your web habits

You enable encryption on your own devices with recovery keys saved properly, inspect certificates on real sites, analyse a fraudulent site that holds a valid certificate, and write a safe-transacting checklist plus a plain-language explanation of what encryption does and does not protect.

1. 01Check whether encryption is enabled on your laptop and record the result.

2. 02Enable it if it is not, and note how long the process takes.

3. 03Save the recovery key in a password manager and in printed form.

4. 04Confirm your phone has a passcode, which is what activates its encryption.

5. 05Inspect the certificate on your bank's site: domain, issuer and expiry date.

6. 06Inspect the certificate on two other sites you use and note the issuers.

7. 07Find or examine a fraudulent site holding a valid certificate and identify it by its domain.

8. 08Write the rule for responding to a certificate warning, including the captive-portal exception.

9. 09Write a safe-transacting checklist covering domain checking, payment method and transfer risk.

10. 10Describe one Nigerian e-commerce fraud pattern and the specific check that defeats it.

11. 11Explain end-to-end encryption, including what metadata is and why it is not protected.

12. 12List what encryption defeats and what it does not, in plain language.

13. 13Explain that list to one non-technical person and confirm they can repeat it.

The standard we hold you to

Encryption enabled on the laptop with the recovery key saved in two places, phone passcode confirmed, certificates inspected on three real sites, a fraudulent valid-certificate site identified by domain, and both a safe-transacting checklist and a plain-language account of what encryption does and does not protect that a non-technical person can repeat.

## Common mistakes and how to fix them

Your laptop is unencrypted

Fix: Enable BitLocker or device encryption. A stolen unencrypted laptop hands over every file immediately; an encrypted one is a brick. It is the control that makes device theft survivable.

You enabled encryption without saving the recovery key

Fix: Save it printed and in a password manager. Losing it is unrecoverable by design, and a failed update or hardware change a year later will then cost you every file on the machine.

You treated the padlock as a trust signal

Fix: Criminals hold valid certificates routinely. The padlock means the connection is encrypted; only the domain name tells you who you are talking to. Check the URL, always.

You clicked through a certificate warning to reach a bank

Fix: Stop. On any site taking credentials or payment, a warning means close the tab and type the address yourself. That is precisely the situation an interception attack creates.

You paid an unknown seller by direct transfer

Fix: Use recognised marketplaces and payment processors that offer protection. A direct transfer to a stranger has no recourse, and it is how most Nigerian e-commerce fraud works.

You assumed end-to-end encryption makes a message safe

Fix: It protects the content in transit only. Metadata is not protected, a compromised phone reads everything, and a screenshot defeats any encryption. Know both halves before advising anyone.

You have no phone passcode

Fix: Set one. The passcode is what activates the built-in encryption on Android and iOS, so a phone with no lock is an unencrypted phone holding your messages and banking apps.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Enable device encryption and save the recovery key in the same sitting, every time. Encryption without a saved recovery key is a time-delayed data loss, and treating the key as part of the process rather than an afterthought is the whole discipline.

- Check the domain, not the padlock, on every sensitive site. Valid certificates on fraudulent sites are routine, so the URL is the only reliable answer to who you are actually talking to.

- Treat a certificate warning as a hard stop on anything taking credentials or payment. It costs a retyped address, and the alternative is entering your banking details into an interception.

- Be honest with clients about what encryption does not do. Overselling it produces false confidence, which is worse than none, because they then neglect the passwords, backups and scepticism that actually prevent losses.

## Key termsEncryption at restData protected while stored on a device. What makes theft survivable.Encryption in transitData protected while travelling between two points. What HTTPS provides.BitLocker / FileVaultFull-disk encryption on Windows and macOS respectively.Recovery keyThe credential restoring access if encryption cannot unlock normally. Losing it is unrecoverable by design.HTTPSAn encrypted, authenticated connection. Protects content and proves the domain, but is not a trust signal.CertificateA document issued to a domain proving its identity. Criminals obtain valid ones routinely.Certificate warningThe browser failing to verify a site's identity. A hard stop on any site taking credentials or payment.End-to-end encryptionEncryption only the endpoints can undo. Protects content, not metadata, and nothing at either end.

## Homework before the next session

Enable encryption and save the key

On your laptop, and confirm your phone has a passcode. Store the recovery key printed and in a password manager. Do both in one sitting.

Inspect five certificates

Your bank and four sites you use. Record the domain each was issued to, the issuer and the expiry, and note anything unexpected.

Write your safe-transacting checklist

Domain check, recognised payment method, no direct transfer to strangers, certificate warning means stop. Keep it short enough to actually use.

Explain the limits of encryption

In plain language, to one non-technical person: what it defeats and what it does not. If they cannot repeat it, simplify until they can.

## Assessment rubric

How this session is marked. The certificate for Cybersecurity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Encryption understanding | Knows encryption exists. | Distinguishes at rest from in transit, explains what each protects, and can state why at-rest encryption makes theft survivable. |
| Device encryption | Has a phone passcode. | Full-disk encryption enabled on the laptop with the recovery key saved in two places, and phone passcode confirmed as the encryption trigger. |
| HTTPS judgement | Looks for the padlock. | Explains the three things HTTPS guarantees and the three it does not, and checks the domain rather than trusting the padlock. |
| Warning response | Notices warnings. | Treats a warning as a hard stop on credential and payment sites, understands the causes, and knows the captive-portal exception. |
| Honest communication | Recommends encryption. | States plainly what encryption defeats and what it does not, so the client does not develop false confidence and neglect the real controls. |

## Session questionsIs a site safe because it has a padlock?+

No. The padlock means the connection is encrypted; criminals obtain valid certificates routinely, so a fraudulent site can display one. The domain name is what tells you who you are talking to, which is why checking the URL is the single most important web habit.What do I do if I lose my BitLocker recovery key?+

If it is stored in your Microsoft account, you may be able to retrieve it there — check before anything else. If it is genuinely lost, the data is unrecoverable by design. This is exactly why saving the key is part of enabling encryption rather than an optional extra.Should I click through a certificate warning?+

Not on any site where you enter credentials or make a payment — close the tab and type the address yourself. On a captive-portal login page for hotel or airport Wi-Fi a warning is normal, which is the one exception worth knowing.Does WhatsApp's encryption make my messages safe?+

It protects the content from anyone in between, including the provider. It does not protect the metadata about who you contacted and when, and it does nothing at either end — a compromised phone reads everything, and a screenshot defeats any encryption.How do I know an online seller is genuine?+

Check the domain character by character against the real one, use recognised marketplaces and payment processors that offer protection, and never send a direct bank transfer to an unknown seller — that route has no recourse and is how most e-commerce fraud in Nigeria works.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session5: Networks & Wi-Fi Security](https://www.cea.ng/classes/cybersecurity/networks-and-wifi-security)[Next session 7: Incident Response & Recovery](https://www.cea.ng/classes/cybersecurity/incident-response-and-recovery)

Cybersecurity

4 weeks · 8 sessions · ₦50,000 · you leave with a security assessment report[See the full course](https://www.cea.ng/classes/cybersecurity)[Enrol now](https://www.cea.ng/admissions)
