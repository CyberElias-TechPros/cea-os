---
title: "What a digital signature really signs"
description: "A digital signature is not a picture of your name. It is arithmetic that proves who sealed a document and that nobody has touched it since. The padlock's cousin, explained."
date: "2026-04-27"
minutes: "4"
next_href: "/blog/tcp-ip-road"
next_title: "Lesson"
---

![A hand signing a document with a pen beside a laptop showing a digital signing screen.](https://www.cea.ng/images/blog/signing-document-seal.jpg)

A digital signature is not a picture of your name. It is arithmetic that proves who sealed a document and that nobody has touched it since. The padlock's cousin, explained.

Ngozi runs a small logistics company, and her contracts used to cross Nigeria as scanned photographs of signed pages — until a disputed delivery proved that anyone could paste her signature onto any page. What is a digital signature? First, what it is not: not a photograph of a wet-ink name dropped onto a page — that is an electronic signature at its weakest, a picture, and a picture copies. A digital signature is arithmetic: a seal computed from the document itself with a key only you hold, such that changing a single comma breaks the seal's mathematics and tells every later reader the page has been touched.

It answers three questions at once, and answers them with proofs rather than manners: who sealed this; has it been altered since; and can the sealer later deny it? That third answer is why contracts, banks, and governments moved — the seal cannot be unworn.

The machinery is two keys born as a pair. Your private key — long numbers stored on your machine or a bank-grade token — you never show anybody; it seals. Its public key you publish freely; it verifies. Seal with the private, verify with the public: the mathematics runs one way down that street and no other. And notice what gets sealed — not the whole document but its fingerprint: a hash, one fixed-length number that any document produces, from which the document cannot be rebuilt, but which changes entirely if a comma changes. So the signature says: the holder of the private key sealed this fingerprint. A new fingerprint at the receiving door means the page is not the page that was sealed — and the seal itself says so, loudly. One question with both keys in your hands: the public key verifies, so could a stranger seal with it too? ... No. The door only swings one way — verifying proves the seal; it cannot make one.

![A hand signing a document with a pen beside a laptop showing a digital signing screen.](https://www.cea.ng/images/blog/signing-document-seal.jpg)

*The two signatures of one life. The ink commits the person; the arithmetic commits the page — and the arithmetic cannot be photocopied.*

## Who vouches for the key?

One hole remains, and the old city solved it with guilds: anyone can claim a key is theirs — so somebody trusted must vouch. A certificate authority is that vouching office for keys: it checks that the person or company asking is who they say, and issues a certificate binding the public key to the name — the passport office of the key world. The whole arrangement — keys, certificates, the offices that vouch — carries one industry name: public key infrastructure, or PKI. If the letters ever felt cold in an advert, they only ever meant this warm idea: the guild that makes a stranger's key believable.

Your browser carries the list of guilds it trusts, which is why the padlock in the address bar means more than a locked road: the site's key was vouched for, the road is sealed, and the seal is checked at your door on every visit. The padlock is a digital signature, shown to you a thousand times a day, finally introduced.

![A close view of a browser address bar, the small padlock glowing, screen slightly soft.](https://www.cea.ng/images/blog/certificate-padlock-detail.jpg)

*The seal you have met a thousand times. The padlock says: vouched key, sealed road, checked at your door. Now you can read it.*

- Say the three promises: who sealed it, untouched since, cannot be denied. That is the definition, whole.

- Private key seals, public key verifies, the authority vouches for the pairing. Three sentences for life.

- Treat your private keys like the notebook's crown jewels: backed up like the papers, shared like the PIN — never.

- A scanned signature photo is a picture. A digital signature is a proof. Ask which one a form truly requires.

## You will meet the seal in ordinary places

Now that it has a name, it appears everywhere. The updates lesson: good software arrives signed, and the machine refuses what no trusted key vouches for — that refusal is the update box doing its quiet work. The papers lesson: signing platforms let a contract cross the world with its proof attached. And in the analyst's world of this chapter, signatures decide which program may speak and which document may be believed. Three promises in one seal — who, untouched, irrevocable — and each promise is arithmetic rather than good manners.

The whole shelf has been one long lesson in verification: check the name before the confirm, the channel before the code, the plate before the door. The digital signature is where that instinct became mathematics — proof that does not tire, does not flatter, and does not forget what it sealed. From here, whenever somebody says “signed,” you will know to ask: sealed by whose key, vouched by whose office, verified at which door. The next lesson crosses the compound wall entirely, to the people who build the things all this security watches over.

Previous

Lesson 126: TCP/IP: how the road carries the mail

Lesson 128: The frontend developer, explained
