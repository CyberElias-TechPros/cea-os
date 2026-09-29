---
title: "Session 4: Wi-Fi"
description: "Wireless done properly for a real Lagos office: what the standards and bands actually mean, secure SSID configuration, coverage planning for concrete floors, and a guest network that does not become a liability."
date: "2026-09-12"
class_slug: "computer-networking"
---

Wireless done properly for a real Lagos office: what the standards and bands actually mean, secure SSID configuration, coverage planning for concrete floors, and a guest network that does not become a liability.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what Wi-Fi standards and frequency bands mean in practical terms

- Configure SSIDs and wireless security correctly, and know which settings to avoid

- Plan access point placement for a multi-floor concrete building rather than guessing

- Build a guest network that is genuinely isolated from the office

- Diagnose interference and coverage problems with evidence rather than opinion

## The taught content

### Wireless is a shared medium, and that one fact explains most wireless problems

Everything about Wi-Fi follows from a single property: **the air is shared**. On a wired switch, each port has its own path, so two conversations happen simultaneously without interfering. On wireless, every device on a channel is competing for the same medium, and only one transmits at a time. Add capacity by adding more access points on non-overlapping channels, not by adding more clients to one access point.

The second property is that **radio behaves badly in buildings**. Lagos offices are typically concrete and blockwork construction with steel reinforcement, and both absorb and reflect 2.4 GHz and especially 5 GHz signals. A floor slab is not a minor obstacle — it can remove most of a signal's strength. This is why a single access point in a corner produces dead zones upstairs, and why the fix is placement and a second unit rather than a stronger antenna.

Hold those two together and the design approach becomes obvious. **Plan coverage per floor, choose channels so neighbouring access points do not overlap, and put the access points where the people are.** Everything else in this session is detail on those three decisions.

### Standards and bands: what the labels mean when you are choosing equipment

The naming has changed twice, which causes confusion. The technical names are **802.11n**, **802.11ac** and **802.11ax**; the marketing names are **Wi-Fi 4**, **Wi-Fi 5** and **Wi-Fi 6**. For a new installation in 2026, **Wi-Fi 6 equipment is the sensible choice** — not because you need its peak speed, but because it handles many simultaneous clients far better, which is exactly the situation in an office with twenty-two staff each carrying a phone and a laptop.

The bands matter more than the standard. **2.4 GHz** travels further and penetrates walls better, but has only three non-overlapping channels and is heavily congested — in an office block with neighbouring businesses, you will find the band crowded before you install anything. **5 GHz** offers many more channels and much higher throughput, but shorter range and weaker penetration. Practical consequence: **5 GHz for the desks, 2.4 GHz as coverage filler**, and let clients roam to whichever is stronger.

Two settings follow from this. **Channel width** — wider channels give more speed but consume more spectrum and cause more overlap with neighbours, so in a congested building narrower is often faster in practice because it is cleaner. And **channel selection** — on 2.4 GHz use only channels 1, 6 and 11, because those are the only three that do not overlap; choosing 3 or 8 overlaps two others and degrades everyone. **Auto channel selection is acceptable on one access point and unreliable on several**, because neighbouring units can pick the same channel.

### SSID and security: the settings that are wrong far more often than right

The SSID is the network name. Give it something professional and identifiable — the practice's name rather than the router's default model number, which advertises your equipment to anyone scanning. **Do not hide the SSID** as a security measure; a hidden network still broadcasts in probe responses and is trivially discovered, so all hiding achieves is making legitimate connections less reliable and support calls more frequent.

Security is where the real decisions are. Use **WPA2-AES at minimum and WPA3 where equipment supports it**. What you must never configure is **WEP**, which is broken and can be cracked in minutes, or **WPA-TKIP**, which is the legacy mode that caps throughput and has known weaknesses. On a lot of consumer equipment there is a mixed mode offered for compatibility with ancient devices; unless you have a genuine ten-year-old device that must connect, **choose WPA2-AES only** — the compatibility mode weakens the network for a device that no longer exists.

Then three settings that are commonly misconfigured. **The administrator password on the access point itself** must be changed from default, exactly as with switches — an access point with factory credentials can be reconfigured by anyone who reaches it. **Remote management from the wireless side should be disabled**, so a guest cannot open the configuration page. And **WPS should be turned off**, because its PIN mechanism is vulnerable to brute force and it is a convenience nobody in an office actually needs.

### Placement and coverage: the part that determines whether the network is usable

Placement is where most small wireless installations fail, and it fails quietly — the network works when you test it standing next to the access point and drops out where people actually sit. The rules are physical, not technical. **Mount high, centrally, and away from obstructions.** A ceiling mount in the middle of the floor beats a desk unit in a corner every time, because radio spreads outward and downward better than it penetrates upward through a slab.

Then the things that destroy signal, which are worth listing because clients will ask why the network is worse in one room. **Metal** reflects — a steel door, a server rack, a filing cabinet. **Concrete and brick** absorb. **Water** absorbs strongly, which means aquariums and water dispensers are genuinely bad neighbours for an access point. **Microwaves and cordless phones** interfere on 2.4 GHz. And **mirrored or tinted glass** with a metallic coating reflects far more than plain glass does.

For our two-floor office the answer is **two access points, one per floor**, each ceiling-mounted toward the centre of its working area, on non-overlapping channels. That is not a compromise — it is the correct design, because a single unit cannot reliably cover a reinforced-concrete slab between floors. **The test is to walk the site with a device and measure**, not to assume. Coverage you have not measured is coverage you are guessing at.

### Guest networks: convenient, and a serious risk if configured carelessly

A guest network is not a courtesy feature; it is a **security boundary**. Visitors, contractors, a client's laptop, and staff personal phones all carry unknown software onto your network. Putting them on the staff VLAN means any one of those devices can attempt to reach the accounts server. Putting them on a separate SSID mapped to the guest VLAN means they cannot — which is why we built VLAN 30 in session three.

The configuration that makes it real has four parts. **A separate SSID** on its own VLAN, with its own DHCP scope and gateway. **Client isolation** enabled, so guests cannot see or reach each other — without it, one infected guest device can attack the others. **No access to internal networks**, enforced by the router's inter-VLAN policy, not merely by a different address range. And **a short DHCP lease**, so addresses recycle as people come and go rather than exhausting the pool by lunchtime.

Two further points that clients consistently get wrong. **Staff personal phones belong on the guest network, not the staff network** — they are the least controlled devices in the building and they carry the same software as the devices strangers carry. And the guest password should be **changed periodically**, because it is the one credential that gets shared casually and written on a whiteboard. None of this is complicated; it is simply a set of decisions that must be made deliberately rather than left at defaults.

## Instructor demonstration

We survey the wireless environment, deploy two access points across the two floors with a planned channel layout, configure office and guest SSIDs securely, and verify coverage by measurement.

### Survey before installing anything

Walk both floors with a wireless analyser and record which networks and channels are already in use. In an office block you will find the 2.4 GHz band crowded. This survey determines your channel plan, so doing it first is not optional.02

### Record signal strength in the places people actually work

Measure at desks, in the meeting room, and in the corners. Note the weak areas now, as a baseline. Coverage you have not measured is coverage you are guessing at, and the baseline is what proves improvement later.03

### Choose the access point locations on the plan

One unit per floor, ceiling-mounted toward the centre of the working area. Explicitly avoid the server cupboard, the steel door, the water dispenser and the filing cabinets — each of which will cost you coverage in a way that is invisible on paper.04

### Plan the channel layout before configuring

Ground floor 2.4 GHz on **channel 1**, first floor on **channel 6** — non-overlapping, so the two units do not interfere with each other through the floor slab. On 5 GHz, choose channels far apart and confirm neither collides with a neighbour from the survey.05

### Mount the first access point and run its cable

Ceiling-mounted, with the data cable run properly rather than draped. Confirm PoE or power availability before you commit to the position — discovering there is no power at the chosen spot means moving it, and moving it changes the coverage.06

### Assign it to the correct VLAN via a trunk port

The switch port feeding the access point must be a **trunk** carrying the staff and guest VLANs, tagged. An access port here means the guest SSID lands on the staff network, which defeats the entire purpose of having one.07

### Change the access point's administrator credentials first

Before any wireless settings. An access point with factory credentials can be reconfigured by anyone who reaches it, and the defaults for common models are published and widely known.08

### Create the office SSID with proper security

SSID named after the practice, mapped to VLAN 10, secured with **WPA2-AES** — or WPA3 if every client device supports it. Do not select the TKIP or mixed compatibility mode unless you have a genuine legacy device that must connect.09

### Create the guest SSID on its own VLAN

A distinct SSID mapped to VLAN 30 with its own passphrase. Confirm it is a separate SSID and not the same network with a shared password, because a shared password is not a boundary at all.10

### Enable client isolation on the guest network

This stops guests reaching each other, which matters because one infected visitor device would otherwise be able to attack the others. It is a single checkbox that is off by default on most equipment.11

### Leave the SSIDs visible and disable WPS

Hiding the SSID is not security — it is still discoverable and it makes legitimate connections less reliable. WPS, by contrast, is a real vulnerability via its PIN mechanism and serves no purpose in an office. Turn it off.12

### Disable remote management from the wireless interface

Management should be reachable only from the management network. Otherwise a guest sitting in your meeting room can open the access point's configuration page, which is not a hypothetical scenario.13

### Set the DHCP scope and lease for guests

Confirm the guest VLAN's scope has a short lease — a couple of hours — so addresses recycle as visitors leave. A day-long lease on a guest network exhausts the pool during a busy morning.14

### Verify the guest network cannot reach the office

Connect a laptop to the guest SSID, confirm it receives a 10.10.30.x address, then attempt to reach the server on 10.10.20.x. It must fail. **This test is the entire point of the guest network** — if it passes, you have built a convenience, not a boundary.15

### Confirm staff personal phones go on the guest SSID

Enrol a phone on guest, not office. Staff phones are the least controlled devices in the building and carry the same software as visitors' devices. Explain the reasoning to the client, because they will otherwise ask to move them back.16

### Measure coverage after installation

Repeat the walkthrough and compare against your baseline. Every working area should have usable signal; note any remaining dead zone and decide whether it needs a third unit or is simply a store room nobody works in.17

### Test roaming between the two access points

Walk from floor to floor on a video call and observe whether the handover is smooth. A call that drops at the stairs means the two units overlap too little, or one is transmitting so strongly that clients refuse to let go.18

### Test throughput where people work, not next to the unit

Run a speed test at a desk furthest from the access point. Testing next to the unit tells you what the unit can do; testing at the far desk tells you what the network delivers, and only the second number is honest.19

### Document the wireless design

Record SSIDs, VLAN mapping, security mode, channel plan, access point locations, management addresses and the guest passphrase rotation policy. Include the coverage measurements, because they justify the placement decisions to the next person.

## Guided practice

### Survey, deploy and verify a real wireless network

Plan and configure wireless for a real space — the office, a home, or a lab — and prove the guest network is genuinely isolated rather than nominally separate.

1. 01Survey the existing wireless environment and record which networks occupy which channels on both bands.

2. 02Measure baseline signal strength in the places people actually work, not next to where the access point will go.

3. 03Choose access point locations that are high, central and away from metal, concrete, water and interference sources.

4. 04Produce a written channel plan using only 1, 6 and 11 on 2.4 GHz, with neighbouring units on non-overlapping channels.

5. 05Mount and cable the access point properly, confirming power or PoE availability before committing to the position.

6. 06Configure the feeding switch port as a tagged trunk carrying the staff and guest VLANs.

7. 07Change the access point's administrator credentials before touching any wireless setting.

8. 08Create the office SSID on the staff VLAN with WPA2-AES or WPA3, avoiding TKIP and mixed compatibility modes.

9. 09Create a separate guest SSID on the guest VLAN with its own passphrase.

10. 10Enable client isolation on the guest network.

11. 11Leave the SSIDs visible and disable WPS.

12. 12Disable management access from the wireless interface.

13. 13Configure a short DHCP lease on the guest scope.

14. 14Prove isolation: connect to the guest SSID, confirm the address range, and confirm the internal server is unreachable.

15. 15Re-measure coverage and compare it against your baseline, noting any remaining dead zone.

16. 16Test roaming between access points on a live call, and test throughput at the furthest desk.

17. 17Document SSIDs, VLANs, security mode, channel plan, locations and measurements.

The standard we hold you to

A pre-installation survey with channels and baseline signal recorded; access point locations chosen with metal, concrete, water and interference explicitly avoided; a written channel plan using only non-overlapping 2.4 GHz channels; trunk-mode switch ports carrying both VLANs; credentials changed first; office SSID on WPA2-AES or WPA3 with no TKIP; a separate guest SSID on its own VLAN with client isolation, a short lease and no wireless-side management; **isolation proven by a failed reachability test**; post-installation measurements compared to baseline; roaming and far-desk throughput tested; and full documentation of the design.

## Common mistakes and how to fix them

Hiding the SSID as a security measure

Fix: A hidden network is still discoverable in probe responses. All hiding achieves is unreliable legitimate connections and more support calls. Security comes from WPA2-AES or WPA3, not from obscurity.

Configuring WEP, TKIP, or a mixed compatibility mode

Fix: WEP is broken and cracks in minutes; TKIP is legacy and caps throughput. Choose WPA2-AES only unless a genuine legacy device requires otherwise — and in 2026 almost none do.

Leaving WPS enabled

Fix: Its PIN mechanism is vulnerable to brute force and it provides no benefit in an office. Turn it off.

Choosing channels 3 or 8 on 2.4 GHz

Fix: Only channels 1, 6 and 11 do not overlap. Anything else overlaps two neighbours and degrades everyone including you. Set channels manually rather than trusting auto on a multi-unit deployment.

One access point trying to cover two concrete floors

Fix: A reinforced-concrete slab removes most of a signal. Use one unit per floor, ceiling-mounted and centred — that is correct design, not extra cost.

An access point fed by an access port instead of a trunk

Fix: Then the guest SSID lands on the staff network and the boundary does not exist. The switch port must carry both VLANs tagged.

A guest network with no client isolation

Fix: One infected visitor device can then attack every other guest. Enable isolation — it is one checkbox, off by default on most equipment.

Testing coverage standing next to the access point

Fix: Measure where people work, at the furthest desk, and compare against a pre-installation baseline. Otherwise you are reporting what the unit can do rather than what the network delivers.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Survey before you install. Five minutes with an analyser tells you which channels are occupied in a crowded Lagos office block, and that determines whether your deployment works or merely appears to. Installing first and surveying after is how you end up re-doing the job.

- The guest network isolation test is the single most important verification in this session. Configuring a separate SSID and not testing that it cannot reach the server leaves you with a convenience feature and a false sense of security. The test takes a minute and it is the entire point.

- Staff personal phones belong on the guest network. Clients resist this because it feels punitive, but those phones are the least controlled devices in the building — unmanaged, personally installed software, carried in and out daily. Explain the reasoning rather than just enforcing it.

- Coverage is a measurement, not an opinion. Record baseline signal before installation and re-measure after; the comparison is what justifies your placement decisions to a client and to the next engineer, and it is the difference between a professional assessment and a guess.

## Key terms802.11ax (Wi-Fi 6)The current mainstream wireless standard. Its main practical advantage over Wi-Fi 5 is handling many simultaneous clients well, which matters in an office.2.4 GHz bandLonger range and better wall penetration, but only three non-overlapping channels and heavy congestion. Useful as coverage filler.5 GHz bandMore channels and higher throughput, with shorter range and weaker penetration. The right band for desks close to an access point.Non-overlapping channelsOn 2.4 GHz, only channels 1, 6 and 11. Any other choice overlaps two neighbours and degrades performance for everyone on the band.WPA2-AESThe minimum acceptable wireless security. TKIP and WEP are legacy and insecure and should never be selected on a business network.Client isolationA setting preventing wireless clients from reaching each other. Essential on a guest network, and off by default on most equipment.WPSWi-Fi Protected Setup, a convenience pairing mechanism whose PIN is vulnerable to brute force. Should be disabled on any business network.Coverage measurementRecording signal strength at the locations people actually work, before and after installation. The only honest basis for placement decisions.

## Homework before the next session

Survey a real wireless environment

Record every network visible at a location, which channel and band each uses, and signal strength at three working positions. Identify which 2.4 GHz channels are free and justify a channel choice.

Configure a secure office and guest SSID pair

Two SSIDs on separate VLANs, office on WPA2-AES or WPA3, guest with client isolation and a short lease. Document every setting and the reasoning behind it.

Prove guest isolation

Connect to the guest SSID, record the address you receive, and demonstrate that an internal address is unreachable. Screenshot the failed test — evidence of a control working is worth more than the configuration screen.

Produce a wireless placement plan for a two-floor office

A floor sketch showing access point positions, channel assignments, and the obstructions you deliberately avoided. Include predicted coverage and where you would measure to verify it.

## Assessment rubric

How this session is marked. The certificate for Computer Networking is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Standards and band understanding | Can name current standards and the two bands. | Chooses band and channel width for a specific building, explains the range-against-throughput trade-off, and uses only non-overlapping 2.4 GHz channels. |
| Security configuration | A password-protected SSID exists. | WPA2-AES or WPA3 with no TKIP, WPS disabled, SSIDs visible, access point credentials changed, and management disabled from the wireless side. |
| Coverage planning | An access point was installed and works nearby. | Locations chosen with obstructions explicitly avoided, baseline measured before installation, re-measured after, and throughput tested at the furthest desk. |
| Guest isolation | A separate guest SSID exists. | Own VLAN, client isolation, short lease, trunk-mode switch port, and a **demonstrated failed attempt to reach an internal address**. |
| Documentation | Settings were noted. | SSIDs, VLAN mapping, security mode, channel plan, locations, management addresses and coverage measurements recorded well enough for someone else to maintain it. |

## Session questionsIs Wi-Fi 6 worth it for a small office?+

Usually yes, but not for the headline speed. Its real advantage is handling many simultaneous clients, and twenty-two staff each with a laptop and a phone is exactly that situation. The price premium over Wi-Fi 5 hardware is now small.How many access points does a two-floor office need?+

At least one per floor in concrete construction, because a reinforced slab removes most of a signal. Two is the correct starting point for our scenario, and coverage measurement tells you whether a third is needed.Should I hide my SSID?+

No. A hidden network is still discoverable, so you gain no security while making legitimate connections less reliable. Use WPA2-AES or WPA3 and a strong passphrase instead — that is what actually protects the network.Why can't staff put their personal phones on the office network?+

Because those phones are unmanaged, carry personally installed software, and travel in and out of the building daily. They are the least controlled devices you have, so they belong on the guest network alongside visitors' devices.My network is fast next to the router and slow at my desk. Why?+

Because you have measured the access point, not the network. Concrete, metal, water and distance all reduce signal, and the fix is placement or an additional unit — not a stronger antenna or a bigger package from the ISP.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session3: Routers & Switches](https://www.cea.ng/classes/computer-networking/routers-switches)[Next session 5: Troubleshooting Tools](https://www.cea.ng/classes/computer-networking/troubleshooting-tools)

Computer Networking

3 weeks · 6 sessions · ₦50,000 · you leave with a working configured network[See the full course](https://www.cea.ng/classes/computer-networking)[Enrol now](https://www.cea.ng/admissions)
