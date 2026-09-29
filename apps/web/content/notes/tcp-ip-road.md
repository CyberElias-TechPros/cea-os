---
title: "TCP/IP: how the road carries the mail"
description: "TCP/IP is the shared grammar of the internet — a long letter torn into numbered parcels, each finding its own road, reassembled at the door. One lesson to never fear the word again."
date: "2026-04-22"
minutes: "4"
next_href: "/blog/vulnerability-assessment-fence"
next_title: "The vulnerability assessment: checking the fence"
---

![Small numbered parcels travelling along a road toward a house in warm evening light.](https://www.cea.ng/images/blog/tcp-parcels-road.jpg)

TCP/IP is the shared grammar of the internet — a long letter torn into numbered parcels, each finding its own road, reassembled at the door. One lesson to never fear the word again.

Sade saw the phrase in a job advert — “knowledge of TCP/IP required” — and almost closed the tab. Then she read it again and decided to find out what four letters were hiding. When two computers anywhere on earth speak — the phone and the bank, the laptop and this page — they speak TCP/IP. The name is a hyphenated pair: IP, Internet Protocol, and TCP, Transmission Control Protocol. The first says where; the second says how. Strip the syllables and hold one picture: a post office that never loses a letter if the roads survive, run on two rules — every house has an address, and every letter travels as numbered parcels that may take different roads and arrive in any order, to be reassembled at the door.

IP is the addressing half. Every machine on the network carries an IP address — four numbers, like 172.16.4.1 in the older scheme — its house number on the world's roads. Your phone has one on your network at home; the bank's computer has one on the world's. Every parcel of every letter is stamped from and to, and the routers — the junctions of this postal system — pass each parcel road by road, choosing the open street at each junction the way an okada rider weaves a flood.

TCP is the manners half. Before any letter moves, the two houses have a small conversation: are you there? I am. Then I will send. That is the handshake — three knocks, and the line is agreed. Then the long letter is torn into parcels, each numbered — 3 of 40, 4 of 40 — so the receiving door can stack them back into the letter, ask for the missing 7 again, and know exactly what arrived intact. One question while the parcels are in the air: a page arrives with a picture missing and a line of text out of place. Whose job is that to fix — yours, or the protocol's? ... The protocol's. TCP already requested the missing parcels. If the page is still broken, the fault is upstream of this grammar.

![Small numbered parcels travelling along a road toward a house in warm evening light.](https://www.cea.ng/images/blog/tcp-parcels-road.jpg)

*The letter did not travel as a letter. It travelled as numbered parcels on several roads, and the door reassembled it. That is TCP/IP, whole.*

## Doors on the house: ports

One computer is one house, but a house does many businesses at once — web, mail, banking app, all arriving together. So each house numbers its doors: these are ports. Port 80 and its locked cousin 443 are where web pages are received — the padlock in your address bar is a padlock on port 443's road. Mail knocks on its own numbered doors; a video call on another. The address finds the house; the port finds the room inside the house. When the advert for the analyst jobs says knowledge of TCP/IP, this is the entire requirement's spine: addresses, parcels, handshake, reassembly, ports.

And why does a learner who is not chasing those jobs care? Because half of every machine trouble in your life has been a road question wearing mystery's clothes. The internet is down: which floor broke — the app, the Wi-Fi, the router, the street, or the far house itself? The page will not load but WhatsApp lives: that is not contradiction, that is different roads to different far houses. The bank app times out halfway: the parcels are dying between junctions, and no amount of closing and reopening the app repairs a road. Diagnosing by floor — app, house, router, street, far house — is the ordinary superpower this grammar buys, and you now own the map it stands on.

![A router on a shelf with two cables running into it, its small lights blinking.](https://www.cea.ng/images/blog/network-cables-router.jpg)

*The house's own postal junction. The lights are the parcels passing — and the first thing the road diagnosis looks at.*

- Say the pair until it separates: IP is the address, TCP is the manners. Where, then how.

- Name the five floors of any internet trouble out loud, once: app, house, router, street, far house.

- Look at your own browser's padlock with new eyes: that is port 443, the locked road, working.

- When a job advert says TCP/IP, you may now nod instead of flinching. That is the whole point of this lesson.

## The grammar under everything

Every lesson on this shelf rode these roads without naming them: the email lesson, the cloud, the ride map, the bank in your hand. Named now, they lose their last fog. The internet is houses with addresses, roads with junctions, letters as parcels, doors numbered by business. Everything the analysts watch travels these roads; everything the builders build travels them. The padlock, the update, the second lock — all of it is traffic on TCP/IP. One grammar, learned once, used for the rest of the connected life. The next lesson stays with the mail, and asks what it means when a letter must carry proof of who sealed it.
