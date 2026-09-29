---
title: "Session 1: Network Fundamentals"
description: "How data actually moves between two machines and across the world — the layered model in terms you can use at a client site, and the physical cables and media that everything else depends on."
date: "2026-09-12"
minutes: "6"
class_slug: "computer-networking"
---

How data actually moves between two machines and across the world — the layered model in terms you can use at a client site, and the physical cables and media that everything else depends on.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain what a network is and what problem each layer of the model solves

- Distinguish LAN, WAN and the internet accurately rather than interchangeably

- Use the layered model as a diagnostic tool, not just as theory to recite

- Identify cable types by their category, and terminate and test one correctly

- Recognise the failure modes of physical media before blaming configuration

## The taught content

### The project you are building across these three weeks

This course runs around one job, because networking is not learned by describing it. The scenario is real and deliberately ordinary: **a two-floor office in Ikeja for an accounting practice with twenty-two staff**, twelve on the ground floor and ten upstairs, a server cupboard under the stairs, a fibre connection from an ISP, and a manager who wants the network to simply work and to be documented so that the next person can maintain it.

By the end of the course you will have planned the addressing scheme, configured the router and switches, set up the wireless with a separate guest network, deliberately broken the network in controlled ways and repaired it, and produced the documentation a real client pays for. That documentation is the deliverable, and it is what separates someone who fiddled with a router from someone who can be trusted with a client's infrastructure.

The level is **intermediate**, which means we assume you can use a computer confidently but not that you have configured a switch before. What we will not do is skip the fundamentals to get to the interesting parts, because in networking the fundamentals are where the failures live. Almost every 'mysterious' network problem turns out to be a cable, an address, or a setting somebody changed and did not record.

### What a network is, and the three terms people use interchangeably

A network is a set of devices that can exchange data, plus the rules they agree on to do so. The rules matter as much as the devices, because two machines connected by a cable that do not share a protocol cannot communicate — which is why standards bodies exist and why 'it is just a cable' is rarely the whole story.

Then the three terms that get blurred. A **LAN**, a local area network, is a network you control within a bounded space — the office we are building. A **WAN**, a wide area network, connects geographically separated networks, and the classic example is a branch office in Abuja linked to head office in Lagos. The **internet** is a specific, very large internetwork made of networks that agree to route to each other using a common set of protocols. It is not a synonym for 'the network' and it is not a synonym for 'the cloud'.

This distinction is practically useful, not pedantic. When a client says 'the network is down', your first question is which network. If the LAN is fine and the WAN link is down, the printer still works and the file server is still reachable — only external access has failed. Diagnosing the wrong one wastes the morning. **Establish the boundary of the failure before you touch anything.**

### The layered model in plain terms — because it is a diagnostic tool, not an exam topic

The layered model exists for one reason: it lets different people build different parts of a network without coordinating on every detail. Your browser does not need to know whether the office is wired or wireless; the cable does not need to know what a web page is. Each layer does one job and hands the result to the next. The version you will hear most is the **TCP/IP model** — network access, internet, transport, application — which maps onto the more academic seven-layer OSI model you will meet in certification material.

Learn it by what each layer is responsible for rather than by reciting names. At the **bottom**, bits travel over a physical medium — copper, fibre, or radio. Above that, **IP** handles addressing and routing: getting a packet from a source address to a destination address across however many networks lie between. Above that, **TCP and UDP** handle the conversation — TCP guarantees delivery and order and retransmits what is lost, which is why web pages and file transfers use it; UDP just sends, which is why voice and video use it, since a late packet is worse than a missing one.

At the **top** sit the applications — HTTP, DNS, SMTP, SSH. The reason to internalise this is diagnostic: **when something breaks, ask which layer is failing.** A page that will not load could be DNS failing at the application layer, an address problem at the internet layer, or a dead cable at the bottom. Those are three completely different fixes, and the layered model tells you which test to run. That is the whole point of learning it, and we will use it that way in session five.

### Cables and media: the layer everyone blames last and that fails most often

The physical layer is unglamorous and it is where a large share of real faults live. **Twisted-pair copper** is the standard for office wiring. The categories matter: **Cat5e** supports a gigabit to 100 metres, **Cat6** does the same with better performance and headroom, and **Cat6a** supports 10 gigabit over the full distance. For a new office fit-out, Cat6 is the sensible minimum — the cable outlasts the equipment by a decade, so specifying Cat5e in 2026 to save a small amount now is a poor trade.

Two physical details cause more faults than anything else. **Termination quality** — a plug crimped badly, a pair nicked while stripping, or conductors in the wrong order produces a link that works intermittently or negotiates down to 100 megabits, and intermittent is far harder to diagnose than dead. And **cable length and route** — beyond 100 metres copper degrades, and a cable run tightly parallel to power cabling or wrapped around a fluorescent ballast picks up interference that shows up as errors under load rather than at idle.

Then the alternatives, each with a real use case. **Fibre** carries light rather than electricity, so it is immune to electrical interference, suffers no meaningful signal loss over distance, and is what your ISP link and any run between buildings should use. **Wi-Fi** trades reliability and speed for mobility, and in a Lagos office with concrete floors it needs deliberate planning rather than a single access point and hope. Knowing which medium suits which job is a large part of designing a network that does not need revisiting.

### Reading the physical layer: what a link light is actually telling you

Every switch port and network card has indicators, and most people ignore them. A steady link light means the two ends have negotiated a connection. A **flashing** light means traffic is passing. The colour or label often indicates speed — a green gigabit link versus an amber 100-megabit link. When a client reports that a machine is slow, and you find it has negotiated 100 megabits on a gigabit port, the cause is almost always one bad pair in the cable: gigabit uses all four pairs, and 100 megabit only needs two, so a cable with one damaged pair will happily run at the lower speed and appear to work.

That single observation — **a working link at the wrong speed means damaged pairs** — saves hours. It is invisible from the operating system unless you know to look, and it produces exactly the symptom clients describe as 'the internet is slow today' with no error anywhere.

So the physical inspection routine is short and worth memorising: check the link light and its speed, check the cable is fully seated at both ends, check the run for damage or sharp bends, check it is not bundled with power cabling, and if anything is questionable **swap the cable**. A known-good cable is the cheapest diagnostic tool in networking, and swapping one takes ten seconds. Professionals swap the cable first and theorise second.

## Instructor demonstration

We survey the Ikeja office, produce its network diagram, inspect and test the existing cabling, and terminate a cable to a standard we would sign off on.

### Walk the site and write down what is actually there

Count the machines per floor, find the server cupboard, identify where the ISP fibre enters the building, note the existing switch and its port count, and record where power and data cabling run together. Do not trust the previous installer's diagram — verify it, because it is usually wrong.02

### Draw the network as it exists, not as it should be

Sketch the ISP termination, the router, the switch, the access points and the endpoints, with cable types marked. This is the 'as-found' diagram. It feels like wasted time and it is the single most useful document in the project, because every later decision refers back to it.03

### Identify the media in use and whether it is adequate

Read the printing on the cable jackets — it states the category. If you find Cat5e in a new fit-out, flag it. If you find cable runs near power conduit or fluorescent fittings, note them as interference risks before anything goes wrong.04

### Inspect link lights on the switch

Check every port: is there a link, is it active, and what speed has it negotiated? Record any port showing a link at 100 megabits on a gigabit switch — each one is a candidate damaged cable and a client complaint waiting to happen.05

### Check the operating system's view of the same link

On a Windows machine, open the network adapter status and confirm the negotiated speed matches the switch. A mismatch between what the switch reports and what the OS reports points at the cable or the adapter rather than at configuration.06

### Test an existing drop with a cable tester

Use a tester that checks all eight conductors and reports which pairs pass. A pass on all pairs with the correct wire map means the cable is sound; a failure on one pair explains a 100-megabit negotiation exactly.07

### Strip and prepare a cable for termination

Strip roughly 25 mm of outer jacket without nicking the inner conductors — a nicked conductor is a future intermittent fault. Untwist each pair only as far as necessary, because excessive untwisting degrades performance in a way no tester will show you.08

### Arrange conductors to the T568B standard

Order them white-orange, orange, white-green, blue, white-blue, green, white-brown, brown. Use the same standard at both ends — mixing T568A and T568B produces a crossover, which is not what an office patch run needs. Consistency matters more than which standard you choose.09

### Trim, insert and crimp

Trim the conductors square so all eight reach the end of the plug, confirm the outer jacket enters the plug body so the crimp grips the cable rather than only the wires, then crimp firmly. A plug that grips only conductors will fail when it is pulled.10

### Test the cable you just made

Run the tester and confirm all eight conductors pass in the correct order. If one fails, cut the plug off and redo it — do not 'make it work'. A marginal termination is worse than a bad one, because it fails later and somewhere inconvenient.11

### Prove it in service, not just on a tester

Connect a laptop through the new cable and confirm a gigabit link is negotiated. Then transfer a large file and watch the throughput. A tester passing and a real transfer at full speed are different claims, and you want both.12

### Demonstrate the classic 100-megabit fault

Deliberately use a cable with one damaged pair and show the port negotiating 100 megabits while still passing traffic. This is the fault that produces 'the network is slow' with no error message, and recognising it by the link light alone is the skill.13

### Label everything you touch

Label both ends of every cable and every patch panel port. Label now, while you know what goes where, because the alternative is somebody tracing cables under a floor in six months with no information.14

### Update the diagram to match reality

Mark what you changed, the cable categories in use, and the ports you tested. The 'as-found' diagram becomes the 'as-built' diagram, and that is the document the client keeps.

## Guided practice

### Survey a real network, test its cabling, and terminate to standard

Take an actual network — the office, a cyber café, a home — and produce professional documentation of it, then demonstrate competent physical work.

1. 01Walk the site and count the devices, identifying where the internet enters the building and where the switching happens.

2. 02Draw an as-found diagram showing ISP, router, switches, access points and endpoints, with cable types marked on each run.

3. 03Read the cable jackets and record the category in use; flag any run that is under-specified for a new installation.

4. 04Note any data cabling bundled with power cabling or passing near fluorescent fittings as interference risks.

5. 05Inspect every switch port and record link state and negotiated speed; list any gigabit port linked at 100 megabits.

6. 06Compare the operating system's reported link speed with the switch's view on at least one machine and note any mismatch.

7. 07Test at least three existing drops with a cable tester and record which pairs pass.

8. 08Terminate two cables to T568B, stripping without nicking conductors and keeping untwisting to a minimum.

9. 09Test both terminated cables and confirm all eight conductors pass in the correct order.

10. 10Connect a laptop through one and confirm a gigabit link, then transfer a large file to verify real throughput.

11. 11Reproduce the damaged-pair fault and observe the link negotiating 100 megabits while still passing traffic.

12. 12Label both ends of every cable you made and every port you tested.

13. 13Explain out loud, in your own words, which layer of the model each of today's faults lived at.

14. 14Update your diagram into an as-built version and write ten lines on what you found and what you would change.

The standard we hold you to

An accurate as-found diagram of a real network with media identified; a record of link states and negotiated speeds with slow ports flagged; three drops tested with results recorded; two cables terminated to T568B passing all eight conductors and delivering a verified gigabit link under real file transfer; the 100-megabit damaged-pair fault reproduced and explained; every cable labelled; and a written summary that places each observed fault at the correct layer of the model.

## Common mistakes and how to fix them

Treating LAN, WAN and internet as the same thing

Fix: Ask which network has failed before diagnosing. If the LAN is healthy and only the WAN link is down, internal services still work — and the fix is with the ISP, not with your switch.

Learning the layered model as names to recite

Fix: Learn it as a diagnostic map. When something breaks, ask which layer is failing, because a DNS failure, an addressing failure and a dead cable are three unrelated fixes.

Specifying Cat5e on a new installation to save money

Fix: Cabling outlasts equipment by a decade. Cat6 minimum for a new fit-out — the saving is small now and the cost of rewiring later is enormous.

Nicking conductors while stripping the jacket

Fix: A nicked conductor passes a tester and fails under load, months later, intermittently. Strip carefully and cut the plug off and restart if you damage one.

Mixing T568A and T568B between the two ends

Fix: That produces a crossover cable. Use the same standard at both ends and keep it consistent across the whole installation.

Ignoring the link light's speed indication

Fix: A gigabit port linked at 100 megabits means damaged pairs, because gigabit needs all four pairs and 100 megabit only two. It presents as unexplained slowness with no error anywhere.

Running data cable parallel to power or around fluorescent ballasts

Fix: Induced interference causes errors under load that do not appear at idle. Separate data and power runs, and cross them at right angles where they must meet.

Leaving cables and ports unlabelled

Fix: Label both ends while you know what goes where. The alternative is somebody tracing cables under a floor with no information, at the client's expense.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Swap the cable before you theorise. A known-good cable is the cheapest diagnostic in networking and takes ten seconds; most 'mysterious' faults end there. The discipline of testing the physical layer first, before touching configuration, is what makes an experienced engineer fast.

- The 100-megabit-on-a-gigabit-port fault is worth memorising because it is common and invisible. It presents exactly as clients describe: 'the internet is slow today', with no error, no warning, and nothing wrong in the configuration. The link light tells you immediately.

- Documentation is the deliverable, not an administrative afterthought. A network that only one person understands is a liability the client is carrying, and the as-built diagram is what makes your work maintainable by anyone. It is also what justifies your fee.

- Fibre between buildings and for the ISP link is not a luxury. Copper between two structures invites ground-potential and lightning damage, and a single storm can destroy equipment at both ends. In Lagos, where thunderstorms are seasonal and severe, this is a practical rather than theoretical consideration.

## Key termsLANA local area network — devices communicating within a bounded space you control, such as a single office or building.WANA wide area network connecting geographically separated networks, such as a branch office linked to head office.TCP/IP modelThe practical layered description of network communication: network access, internet, transport and application. Its value is as a diagnostic map.PacketA unit of data with source and destination addressing plus payload, routed independently across a network.TCP versus UDPTCP guarantees delivery and order by retransmitting losses, suiting web and file transfer. UDP simply sends, suiting voice and video where a late packet is worse than a lost one.Cat6A category of twisted-pair copper cabling supporting gigabit to 100 metres with headroom; the sensible minimum for a new office installation.T568BThe standard conductor ordering for terminating an RJ45 plug. Must match at both ends of a run, or you create a crossover.Negotiated speedThe link speed two connected devices agree on. A gigabit port linking at 100 megabits indicates damaged pairs in the cable.

## Homework before the next session

Document a real network

Produce an as-found diagram of a network you have access to, with device roles, media types and port speeds recorded. Include three faults or risks you observed and what you would change.

Terminate and prove two cables

Terminate two cables to T568B, test all eight conductors, then verify a gigabit link and real file throughput through one of them. Photograph the tester result.

Explain the layers in your own words

Write one paragraph per layer of the TCP/IP model saying what it does and naming one fault that lives there. No definitions copied from anywhere — this is the test of whether the model is useful to you yet.

Find a slow link in the wild

Check the negotiated speed on three machines you use regularly. Any that are not at the expected speed, investigate the cable and report what you found. This fault is everywhere once you start looking.

## Assessment rubric

How this session is marked. The certificate for Computer Networking is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Conceptual accuracy | Can define LAN, WAN and internet and name the layers. | Uses the layered model to reason about faults, placing each observed problem at the correct layer and choosing the right test because of it. |
| Site documentation | A diagram of the network exists. | An accurate as-found diagram with media types, port speeds and identified risks, updated into an as-built version after work is done. |
| Physical workmanship | A cable was terminated and it works. | Termination to T568B with clean stripping and minimal untwisting, all eight conductors passing, and a verified gigabit link under real file transfer. |
| Physical-layer diagnosis | Used a cable tester. | Identified a 100-megabit negotiation as damaged pairs from the link light alone, and reproduced the fault deliberately to confirm the reasoning. |
| Professional habits | The work is functional. | Everything labelled, cable category choices justified, interference risks noted, and the swap-the-cable-first discipline applied before theorising. |

## Session questionsDo I need to memorise the OSI seven layers?+

For certification exams, yes. For doing the work, the four-layer TCP/IP model is what you will actually use to reason about faults. Learn what each layer is responsible for — that is what makes it useful at a client site.Is Cat6 worth the extra cost over Cat5e?+

On a new installation, yes. Cabling lasts a decade or more and outlives several generations of equipment. The price difference now is small against the cost of rewiring a finished office later.Why does my link show 100 megabits on a gigabit switch?+

Almost always damaged pairs. Gigabit needs all four pairs; 100 megabit needs only two, so a cable with one bad pair runs at the lower speed while appearing to work fine. Test the cable and re-terminate or replace it.Should I use fibre or copper between two buildings?+

Fibre. It is immune to electrical interference, has no practical distance limit at office scales, and — importantly in Lagos — carries no electrical path between structures, which protects equipment during thunderstorms.How long can a copper run be?+

100 metres for standard Ethernet over twisted pair, including patch leads. Beyond that you need a switch to regenerate the signal or a fibre run, and the limit is firm rather than approximate.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Next session 2: IP Addressing](https://www.cea.ng/classes/computer-networking/ip-addressing)

Computer Networking

3 weeks · 6 sessions · ₦50,000 · you leave with a working configured network[See the full course](https://www.cea.ng/classes/computer-networking)[Enrol now](https://www.cea.ng/admissions)
