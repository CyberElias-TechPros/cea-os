---
title: "Session 2: IP Addressing"
description: "The addressing scheme that makes a network work: IPv4 and IPv6, subnet masks and what they actually do, DHCP against static allocation, and the NAT that lets a whole office share one public address."
date: "2026-09-12"
class_slug: "computer-networking"
---

The addressing scheme that makes a network work: IPv4 and IPv6, subnet masks and what they actually do, DHCP against static allocation, and the NAT that lets a whole office share one public address.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Read and explain an IPv4 address and its subnet mask without guessing

- Size a subnet correctly for a given number of hosts

- Design a coherent addressing scheme for the office, with room to grow

- Configure DHCP sensibly and know which devices must be static

- Explain NAT accurately, including what it does and does not protect

## The taught content

### An IP address is a location, and a subnet mask says how much of it is the location

Every device on an IP network has an address, and the address has two parts that are not marked: the **network portion**, which identifies which network you are on, and the **host portion**, which identifies you within it. The **subnet mask** is what divides them. This is the single idea the rest of the session rests on, and it is worth getting solid before anything else.

With **255.255.255.0** — or **/24**, the same thing written differently — the first three octets are the network and the last is the host. So 192.168.1.0 through 192.168.1.255 is one network, and 192.168.2.0/24 is a different network entirely. Within a /24 there are 256 addresses, of which **254 are usable**: the first is the network address and the last is the broadcast address, and neither can be assigned to a device. Forgetting those two is the most common arithmetic error in this subject.

The practical consequence is immediate and it is the one that generates support calls. Two machines on 192.168.1.10/24 and 192.168.1.20/24 are on the same network and can talk directly. Two machines on 192.168.1.10/24 and 192.168.2.10/24 are on **different** networks and cannot talk without a router, no matter how physically close they sit. When a client says 'the printer worked yesterday', a changed subnet mask is a genuine candidate, and it is invisible unless you check it.

### Private and public addresses, and why your office uses the ones it uses

Not every address is reachable from the internet. Three ranges are reserved for private use and will never be routed publicly: **10.0.0.0/8**, **172.16.0.0/12**, and **192.168.0.0/16**. Your office uses addresses from these ranges, and every other home and small business on earth uses the same ones. That is not a collision, because private addresses only have meaning inside the network that uses them.

Everything outside those ranges is **public** — globally unique and routable on the internet. Your office has a small number of public addresses from the ISP, usually just one, and everything internal is private. The mechanism that connects the two is NAT, which we will come to, and understanding that boundary is essential to understanding why an internal server is not automatically reachable from outside.

For our accounting practice the sensible choice is **10.10.0.0/16** rather than 192.168.0.0/16. The reason is not fashion: 192.168.x is what every domestic router defaults to, so if a staff member connects over VPN from home, their home network collides with the office network and the VPN fails in confusing ways. Using a less common private range costs nothing and removes a whole category of remote-access problem. **This is the kind of decision that looks trivial and saves hours later.**

### Sizing subnets: the arithmetic, and why you should leave room

Subnet size is a power of two, which is the part people find awkward until they see the pattern. The number of host bits determines capacity: **/24** gives 256 addresses and 254 usable hosts, **/25** gives 128 and 126 usable, **/26** gives 64 and 62 usable, **/27** gives 32 and 30 usable. Each step down the prefix halves the space. The usable count is always the total minus two, for network and broadcast.

For twenty-two staff, a single /24 is the obvious answer and the right one. You might be tempted to use a /27 to be tidy, since thirty usable addresses covers twenty-two — but that leaves room for eight more devices, and an accounting practice will acquire printers, a server, access points, a network storage device, cameras and guests. **Size for what the network will be in three years, not what it is today**, because re-addressing a live network means touching every device and every documented reference to it.

The reason to subnet at all, rather than putting everything in one flat network, is separation. Staff, guests, servers and devices like printers and cameras have different trust levels and different needs. Splitting them means a guest cannot reach the accounts server, and a compromised camera cannot reach the file share. **Separation is a security control, not an organisational preference**, and it is far easier to build in at design time than to retrofit.

### DHCP against static: both are correct, for different devices

**DHCP** hands out addresses automatically. A device joins, broadcasts a request, and the DHCP server replies with an address, the subnet mask, the gateway and DNS servers. It removes an entire class of human error and it is why plugging in a laptop just works. For a network with staff coming and going, it is the only sane approach for client devices.

But DHCP is wrong for devices other machines need to find. A server, a network printer, a network storage device, or an access point that staff connect to by name must have a **predictable address**, because a DHCP address can change and every reference to the old one then breaks. The professional solution is not to abandon DHCP but to use a **DHCP reservation**: the server still gets its address from DHCP, so configuration stays centralised, but it always receives the same one.

Two related settings matter and are frequently misconfigured. The **lease time** determines how long an address is held before renewal — a day is reasonable for staff devices, while a guest network benefits from a short lease of a couple of hours so addresses are recycled as people come and go. And the **scope** must have room: if your DHCP pool holds thirty addresses and forty devices connect, the last ten get nothing and the symptom looks like a broken network rather than an exhausted pool. **Always size the pool above the realistic device count.**

### NAT: what it does, and the security claim you should not repeat

**Network Address Translation** is what lets twenty-two machines share one public address. When an internal machine contacts a website, the router rewrites the source address from the private one to the public one and records the mapping, so the reply can be translated back to the right machine. Thousands of these translations happen per second and the whole thing is invisible.

NAT is often described as a firewall, and you should be careful with that claim. It does provide a degree of protection as a side effect — because the router only forwards replies to connections it initiated, an unsolicited inbound connection has nowhere to go. But that is a consequence of stateful behaviour, not a security design. **A firewall is a policy about what is permitted; NAT is an addressing translation.** A network can have NAT and no meaningful filtering, and it can have a firewall with no NAT at all. Say it accurately, because clients repeat what you tell them.

The practical implications are worth knowing. Because internal machines are not directly reachable, **hosting a service inside the office requires port forwarding** — an explicit rule telling the router to send inbound traffic on a port to a specific internal address. Each such rule is a hole you deliberately opened and must maintain. And NAT is why a remote user needs a VPN rather than simply connecting to the file server: from outside, the server has no address. Finally, **IPv6 removes the need for NAT** entirely, because there are enough addresses for everything to be public — which changes how you think about firewalling, not whether you need it.

### IPv6: not optional forever, and worth understanding now

IPv4 addresses ran out. The global pool was exhausted years ago, and while address trading and NAT keep things running, the long-term direction is unambiguous. **IPv6** uses 128-bit addresses, written in hexadecimal groups separated by colons, giving enough addresses that the entire concept of a scarce public address disappears. Your ISP may already be providing it alongside IPv4.

What changes practically: there is no NAT, so devices can have globally routable addresses, which makes **the firewall more important rather than less** — you can no longer rely on private addressing as an incidental barrier. Subnetting works differently too; the convention is a /64 per network regardless of host count, because the address space is not scarce and a consistent size simplifies everything.

For this course, the honest position is that your office will run **IPv4 today and dual-stack soon**. You should be able to read an IPv6 address, understand that a /64 is the standard allocation, and know that enabling IPv6 without reviewing firewall rules is a genuine security regression. That is enough to be useful and enough to not be surprised, which is the standard this course holds throughout.

## Instructor demonstration

We design the addressing scheme for the Ikeja office from first principles, then configure DHCP with reservations and demonstrate NAT working on the router.

### List what needs an address, now and in three years

Twenty-two staff machines, two servers, three printers, network storage, two access points per floor, a network camera system, and guests. Write the count honestly and add a third for growth — the number you design for is the one that matters, not today's headcount.02

### Choose the private range deliberately

Select **10.10.0.0/16** rather than the 192.168.0.0/16 every home router uses. Explain why: staff connecting over VPN from home will not have their home network collide with the office network. Free decision, real benefit.03

### Decide how many networks you need and why

Four: **staff**, **servers**, **guests**, and **devices** for printers, cameras and access points. Justify each by trust level — a guest must not reach the accounts server, and a compromised camera must not reach the file share. Separation is a control, not tidiness.04

### Size each subnet and show the arithmetic

Staff **10.10.10.0/24** with 254 usable for twenty-two machines plus growth. Servers **10.10.20.0/28** — sixteen addresses, fourteen usable, which is tight but appropriate. Guests **10.10.30.0/24** because the population is unpredictable. Devices **10.10.40.0/24**. State the usable count for each, remembering to subtract two.05

### Write the scheme down before configuring anything

A table: network, address and prefix, usable range, gateway, purpose, and expected device count. This table is the deliverable's core, and every later configuration refers back to it. Configuring before designing is how networks end up undocumented.06

### Configure the router interfaces as gateways

Assign 10.10.10.1, 10.10.20.1, 10.10.30.1 and 10.10.40.1 to the respective interfaces or VLAN interfaces, each with its correct mask. The gateway is the first usable address by convention — not a rule of IP, but a convention that makes documentation obvious to the next person.07

### Verify the gateways before adding clients

From a laptop connected to each network, confirm you can reach its gateway. Doing this now, with one machine, is trivial; discovering it after forty devices are connected is a morning lost.08

### Configure the DHCP scope for staff

Pool 10.10.10.50 to 10.10.10.200, mask 255.255.255.0, gateway 10.10.10.1, DNS as chosen. The pool deliberately excludes the first forty-nine addresses so static and reserved devices have predictable space below it.09

### Size the pool against the real device count

Confirm the pool holds far more addresses than the staff network will ever have. A pool of thirty serving forty devices produces an exhausted-scope failure that looks exactly like a broken network, and it is entirely preventable.10

### Set a sensible lease time per network

One day for staff, who reconnect predictably. Two hours for guests, so addresses are recycled as people leave. A long lease on a guest network exhausts the pool; a very short lease on staff devices causes needless churn.11

### Create reservations for everything that must be findable

Reserve addresses for the two servers, three printers and the storage device by their MAC addresses. They still receive configuration from DHCP — so it stays centralised — but always get the same address. This is the professional alternative to manual static configuration.12

### Prove DHCP works end to end

Connect a fresh laptop, confirm it receives an address from the correct scope, the right mask, gateway and DNS. Then release and renew, and confirm it comes back. Finally connect a second machine and confirm it gets a different address.13

### Demonstrate the wrong-mask failure

Set a laptop to 10.10.10.10 with mask 255.255.0.0 and show that it now believes 10.10.20.x is local, so it tries to reach the server directly instead of via the gateway — and fails. This is the exact fault behind 'the printer worked yesterday'.14

### Watch NAT working on the router

Open the router's NAT or connection-tracking table and show the translations in progress: internal private address and port mapped to the public address and a different port. Then explain that the router only forwards replies to connections it initiated, which is why unsolicited inbound traffic has nowhere to go.15

### Show what happens without a forwarding rule

From an external connection, attempt to reach the internal server. It will fail, because from outside the server has no address. This is precisely why a remote user needs a VPN rather than a direct connection — and why hosting anything internally means opening a deliberate, maintained hole.16

### Check the IPv6 position

Look at whether the ISP is providing IPv6 and whether the router has it enabled. If it is on, confirm firewall rules were reviewed — enabling IPv6 while assuming private addressing is protecting you is a real and common regression.17

### Finalise the documentation

Update the addressing table with what was actually configured, including reservations by MAC address and lease times. Note any deviation from the plan and why. This document is what the client keeps and what the next engineer reads.

## Guided practice

### Design, configure and break an addressing scheme

Produce a real addressing design for a small office, configure it, and then deliberately cause the addressing faults you will be called out to fix.

1. 01Inventory every device that needs an address today and estimate the count in three years.

2. 02Choose a private range deliberately, avoiding 192.168.0.0/16, and write down why you chose it.

3. 03Design at least four networks separated by trust level — staff, servers, guests and devices — and justify each.

4. 04Size each subnet, writing the total addresses, the usable count after subtracting network and broadcast, and the growth headroom.

5. 05Produce the addressing table: network, prefix, usable range, gateway, purpose, expected devices.

6. 06Configure each gateway on the router and verify reachability from one machine on each network before adding more.

7. 07Configure a DHCP scope with the pool starting above the static range, the correct mask, gateway and DNS.

8. 08Confirm the pool is comfortably larger than the realistic device count, and show the arithmetic.

9. 09Set different lease times for staff and guest networks and explain the reasoning for each.

10. 10Create DHCP reservations for at least three devices that other machines must find, using their MAC addresses.

11. 11Connect a fresh machine and confirm it receives a correct address, then release and renew to prove it repeats.

12. 12Demonstrate the wrong-subnet-mask fault and explain precisely why the machine then fails to reach another network.

13. 13Inspect the router's NAT table and describe what each translation entry represents.

14. 14Attempt to reach an internal device from outside and explain why it fails without a forwarding rule.

15. 15Check whether IPv6 is active and whether firewall rules were reviewed alongside it.

16. 16Update your documentation to match what you actually built, noting any deviation from the design.

The standard we hold you to

A written addressing design with at least four trust-separated networks, each sized with total and usable counts shown and growth headroom justified; gateways configured and verified before clients were added; a DHCP scope correctly sized with a sensible pool range and per-network lease times; at least three MAC-based reservations; a demonstrated wrong-mask fault with a correct explanation; NAT observed in the router's translation table with an accurate account of what it does and does not protect; IPv6 status checked; and documentation matching the built network.

## Common mistakes and how to fix them

Forgetting to subtract the network and broadcast addresses

Fix: Usable hosts are always the total minus two. A /24 has 254 usable addresses, not 256. This arithmetic error propagates into every capacity decision that follows.

Using 192.168.0.0/16 because it is the default

Fix: It collides with every home router, which breaks staff VPN connections in confusing ways. Use a less common private range such as 10.10.0.0/16 — it costs nothing.

Sizing subnets for today's device count

Fix: Re-addressing a live network means touching every device and every documented reference. Size for three years ahead; address space is free and rewiring is not.

Putting everything in one flat network

Fix: Guests, staff, servers and cameras have different trust levels. Separate them, because a guest who can reach the accounts server is a breach waiting to happen.

A DHCP pool smaller than the device count

Fix: The last devices to connect get no address and the symptom reads as a broken network. Always size the pool well above the realistic population, especially for guests.

Configuring servers and printers with manual static addresses

Fix: Use DHCP reservations instead — the device still gets centralised configuration but always receives the same address. Manual statics drift and are never documented.

Describing NAT as a firewall

Fix: NAT translates addresses; a firewall applies policy. They often coexist but they are different things, and clients repeat whatever you tell them. Be precise.

Enabling IPv6 without reviewing firewall rules

Fix: With IPv6 there is no NAT, so devices can be globally routable. Enabling it while assuming private addressing protects you is a genuine security regression, and a common one.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Design the addressing on paper before touching a device. Thirty minutes of design prevents a live network that has to be re-addressed later, and the resulting table is the document that makes your work maintainable. It is also the artefact that shows a client you did real engineering.

- DHCP reservations are the mark of someone who has maintained networks. Manual static addresses work until somebody changes them, and then nothing is documented. Centralised allocation with per-device reservations gives you predictability and an audit trail in the same place.

- The wrong-subnet-mask fault is worth internalising because it is invisible and common. The machine appears connected, has an address, and can reach some things — but not others, because it believes they are local when they are not. Checking the mask before the configuration saves a great deal of time.

- Be accurate about NAT in front of clients. Saying it is a firewall is a small imprecision that becomes a large misunderstanding, because it leads people to believe they are protected when they have applied no policy at all. Precision here is a professional courtesy.

## Key termsSubnet maskThe value that divides an IP address into its network and host portions. It determines which addresses a machine considers local and which must go via a gateway.CIDR notationThe slash form of a subnet mask — /24 means 255.255.255.0. A shorter prefix means a larger network; each step down halves the space.Private address range10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 — reserved for internal use and never routed on the public internet.Broadcast addressThe last address in a subnet, used to reach every host on it. Not assignable to a device, which is why usable hosts are the total minus two.DHCP scopeThe range of addresses a DHCP server may allocate, together with the mask, gateway, DNS servers and lease time it hands out.DHCP reservationBinding a specific address to a specific MAC address so a device always receives the same one while still being configured centrally.NATNetwork Address Translation, rewriting private source addresses to a public one so many machines can share one address. An addressing mechanism, not a firewall.Dual stackRunning IPv4 and IPv6 simultaneously, which is the practical reality during the long transition between the two.

## Homework before the next session

Design an addressing scheme for a real organisation

Pick a business you know, inventory its likely devices, and produce a full addressing table with at least four trust-separated networks. Show the usable-host arithmetic for every subnet and justify the growth headroom.

Configure DHCP with reservations

On your own network or the lab router, configure a scope with the pool starting above the static range, sensible lease times, and at least three MAC-based reservations. Document it.

Cause and explain two addressing faults

Deliberately apply a wrong subnet mask and an exhausted DHCP pool, observe the symptoms each produces, and write down how you would recognise each one from the symptoms alone.

Explain NAT accurately to a non-technical reader

Two paragraphs covering what NAT does, why an internal server is not reachable from outside, and precisely why calling it a firewall is wrong. Assume the reader will repeat your explanation to someone else.

## Assessment rubric

How this session is marked. The certificate for Computer Networking is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Addressing accuracy | Can read an address and mask and identify the network. | Computes usable hosts correctly every time, converts between dotted and CIDR forms fluently, and explains why two hosts are or are not on the same network. |
| Network design | A scheme was produced. | Four or more networks separated by trust level, each sized with headroom justified, private range chosen deliberately, and the whole design written before anything was configured. |
| DHCP configuration | DHCP is enabled and clients get addresses. | Pool sized against real device counts, static range excluded, per-network lease times reasoned, and MAC-based reservations used for every device others must find. |
| NAT understanding | Can say NAT lets many machines share one address. | Can read the translation table, explain why inbound connections fail without forwarding, and state accurately why NAT is not a firewall. |
| Fault diagnosis | Caused and fixed a fault. | Reproduced the wrong-mask and exhausted-pool faults, described the exact symptoms each produces, and can recognise both from symptoms alone. |

## Session questionsWhy subtract two addresses from every subnet?+

The first address identifies the network itself and the last is the broadcast address for reaching every host on it. Neither can be assigned to a device, so a /24 gives 254 usable addresses rather than 256.Should I still learn IPv4 if IPv6 is the future?+

Absolutely. Almost every small business network you will work on runs IPv4 today, and most will be dual-stack for years. IPv4 is where the jobs are now; IPv6 knowledge keeps you from being surprised later.How many subnets does a small office really need?+

Four is a good baseline: staff, servers, guests, and devices such as printers, cameras and access points. More is defensible; fewer means guests and cameras share a network with your accounts data, which is a poor trade.Is NAT a firewall?+

No. NAT translates addresses; a firewall applies policy about what traffic is permitted. They usually appear together, and NAT does block unsolicited inbound traffic as a side effect, but they are different mechanisms.What lease time should I use?+

About a day for staff devices, which reconnect predictably, and a couple of hours for guests, so addresses recycle as people leave. A long guest lease exhausts the pool; a very short staff lease causes needless churn.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session1: Network Fundamentals](https://www.cea.ng/classes/computer-networking/network-fundamentals)[Next session 3: Routers & Switches](https://www.cea.ng/classes/computer-networking/routers-switches)

Computer Networking

3 weeks · 6 sessions · ₦50,000 · you leave with a working configured network[See the full course](https://www.cea.ng/classes/computer-networking)[Enrol now](https://www.cea.ng/admissions)
