---
title: "Session 3: Routers & Switches"
description: "The two devices that make a network a network — what a switch does that a hub never could, what a router does that a switch cannot, and how to configure ports, VLANs and the basics safely on real equipment."
date: "2026-09-12"
class_slug: "computer-networking"
---

The two devices that make a network a network — what a switch does that a hub never could, what a router does that a switch cannot, and how to configure ports, VLANs and the basics safely on real equipment.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain precisely what a switch does and why it replaced hubs

- Explain what a router does and where the boundary between the two devices sits

- Configure a managed switch: naming, port settings and access control

- Apply VLAN concepts to the trust-separated design from last session

- Configure a router's basics including the WAN side and remote management

## The taught content

### A switch learns where devices are, and that single behaviour is why networks work

A switch operates at layer two and makes decisions based on **MAC addresses** — the hardware addresses burned into every network interface. Its behaviour is simple and worth understanding exactly. It maintains a **MAC address table** mapping each learned address to the port it was seen on. When a frame arrives for a known address, it goes **only** to that port. When the destination is unknown, it floods to every port except the source, learns from the reply, and next time sends it directly.

This is the entire reason switches replaced hubs. A **hub** repeats every frame to every port, so every device sees everyone else's traffic and the whole network is one collision domain — ten machines on a hub share one conversation space. A switch gives each port its own collision domain and, crucially, **stops traffic going where it is not needed**. That is a performance improvement and a security improvement at the same time, which is why unmanaged hubs vanished.

The practical consequences are what you will use at a client site. **The MAC table tells you where a device is physically connected**, which is how you trace an unknown machine or find which port a printer is on. And because a switch floods unknown destinations, **ARP traffic and broadcasts reach everywhere on the same VLAN** — which is precisely why large flat networks become slow, and why we split them.

### A router connects networks; a switch connects devices — and the distinction decides your diagnosis

A router operates at layer three and makes decisions based on **IP addresses**. Its job is to move packets between different networks, using a **routing table** that says which network is reachable via which interface or next hop. It also typically provides DHCP, NAT, and the firewall between your private network and the internet.

The clean way to hold it: **a switch connects devices within one network; a router connects networks to each other.** Two machines on 10.10.10.0/24 talk through the switch. A machine on 10.10.10.0/24 reaching a server on 10.10.20.0/28 goes through the router, even if both are plugged into the same physical switch.

That last sentence is the key to modern small-network configuration, and it is where **VLANs** come in — a single physical switch can carry several logically separate networks, with the router handling traffic between them. Understanding that a switch port belongs to a network, and that the router is the gatekeeper between networks, is what makes the next session's design implementable on real hardware rather than only on paper.

### Managed against unmanaged: the difference is not ports, it is control

An **unmanaged switch** is plug and play. It learns MAC addresses and forwards frames, and there is nothing to configure — no interface, no VLANs, no visibility. For three machines at home, it is entirely adequate. For an office, it is a dead end, because you cannot segment anything, cannot see what is happening, and cannot apply any policy.

A **managed switch** gives you an interface, and with it the ability to create VLANs, name ports so you know what is connected where, monitor traffic, and control access. For our accounting practice this is not optional — the trust-separated design from last session is simply not implementable on unmanaged hardware.

Between them sits the **smart switch**, offering VLANs and basic management at lower cost, which is often the right answer for a genuinely small office. And note the related device class: an access point that only bridges wireless to wired is layer two, while one that routes is doing something different. **Know which layer a device operates at before you try to configure it**, because the settings available follow directly from that.

### VLANs: one cable, several networks, and the security that comes with it

A **VLAN**, a virtual LAN, is a logical grouping of switch ports that behaves like a separate network regardless of where the cables physically go. Ports assigned to VLAN 10 cannot communicate with ports on VLAN 20 at layer two, even though they share the same switch and often the same physical cabling. Broadcasts stay inside their VLAN, which is what makes segmentation real rather than nominal.

For our design this maps directly: **VLAN 10** for staff on 10.10.10.0/24, **VLAN 20** for servers on 10.10.20.0/28, **VLAN 30** for guests on 10.10.30.0/24, and **VLAN 40** for printers, cameras and access points on 10.10.40.0/24. A guest in the meeting room is on the guest VLAN whichever socket they use, and cannot reach the accounts server — not because of a firewall rule, but because the two are simply not on the same network.

Two mechanics are worth understanding. An **access port** belongs to exactly one VLAN and carries that VLAN's traffic untagged, which is what you use for endpoints. A **trunk port** carries several VLANs at once with each frame tagged so the far end knows which network it belongs to, which is what you use between switches and to access points. Getting this wrong is the single most common VLAN misconfiguration: **a port set as access where a trunk is needed, or the reverse, produces a link that appears up and carries almost nothing.**

### Configuration discipline: the habits that keep you out of trouble

Configuring network equipment has one unusual hazard: **you are doing it over the network you are changing.** A mistake can disconnect you mid-change, and on a device in a cupboard under the stairs that means a walk with a laptop and a cable. The standard protections are worth making habitual.

First, **change the default credentials immediately**. A switch or router still using its factory password is an open door on the internal network, and default credentials for common models are published and widely known. Second, **name the device and name every port** — a switch called 'switch1' with ports labelled 1 through 24 tells the next engineer nothing; 'GF-SW01' with port 7 labelled 'Printer-Main' tells them everything. Third, **disable what you do not use**: unused ports should be shut down and assigned to an unused VLAN, so plugging a rogue device into a wall socket gets it nowhere.

Then the two that save the most time. **Save the configuration** after every working change — on many devices the running configuration is lost on reboot unless explicitly saved, which turns a finished job into a mystery the following morning. And **keep an out-of-band way in**, meaning a console cable or a known physical port, so a bad change does not become a device you cannot reach. Finally, restrict **remote management** to the management VLAN only; a switch manageable from the guest network is a switch a customer can attack.

## Instructor demonstration

We configure the office's managed switch and router from factory state, implementing the four-VLAN design from last session and locking down what a client would otherwise leave open.

### Connect to the switch's management interface

Use the default address and credentials from the label, over a direct cable. Confirm firmware version and note it — you will update, but not in the middle of a configuration change.02

### Change the default credentials first, before anything else

Set a long unique administrator password. Default credentials for common switch models are published and widely known, and a switch with a factory password is an open door to anyone who reaches a wall socket.03

### Name the device meaningfully

Set the hostname to **GF-SW01** rather than leaving the default. When you are managing three switches across two floors at 6pm, the name is the only thing telling you which one you are about to reconfigure.04

### Set the management address into the correct VLAN

Give the switch a static management IP in the devices network — 10.10.40.2 with gateway 10.10.40.1 — so it is reachable by you but not by guests. A switch with no management address is a device you cannot find later.05

### Create the four VLANs to match the design

Create **VLAN 10 Staff**, **VLAN 20 Servers**, **VLAN 30 Guests**, **VLAN 40 Devices**, naming each. Names matter as much as numbers — VLAN 30 means nothing to the person maintaining this in two years.06

### Assign access ports to their VLANs

Set ports 1 to 12 as access ports on VLAN 10 for ground-floor staff. Confirm each port mode reads **access**, not trunk — an endpoint on a trunk port behaves unpredictably and is a classic misconfiguration.07

### Assign the remaining ports deliberately

Ports 13 and 14 to VLAN 20 for servers, ports 15 to 17 to VLAN 40 for printers and storage, and ports 18 to 20 to VLAN 30 for the meeting-room guest sockets. Every port accounted for, because an unassigned port is an uncontrolled one.08

### Configure the uplink as a trunk

Set the port connecting to the router as a **trunk** carrying all four VLANs, tagged. This is the port that lets one cable carry four networks, and getting its mode wrong breaks everything while the link light still shows green.09

### Shut down and isolate unused ports

Disable every spare port and assign it to an unused VLAN. Without this, plugging a laptop into any spare wall socket puts it on your staff network. With it, the socket goes nowhere — a real control, not a nicety.10

### Restrict remote management to the management network

Configure management access to be permitted only from 10.10.40.0/24. A switch manageable from the guest VLAN is a switch a customer with a laptop can attack, which is not a hypothetical.11

### Save the configuration and verify it survives

Write the running configuration to startup, then reload the switch and confirm the VLANs and port assignments are still there. On many devices an unsaved configuration is lost on reboot, turning a finished job into a mystery the next morning.12

### Prove the segmentation actually works

Connect a laptop to a staff port and confirm it gets a 10.10.10.x address. Move it to a guest port and confirm it gets 10.10.30.x. Then from the guest address attempt to reach the server on 10.10.20.x and confirm it fails. The failure is the control working.13

### Read the MAC address table

Display the switch's MAC table and match entries to ports. This is how you find where an unknown device is physically connected, and how you confirm a printer is on the port you think it is.14

### Move to the router and configure the WAN side

Enter the ISP credentials, confirm the connection type, and note whether the public address is static or dynamically assigned. Record what you find — the ISP's actual configuration is frequently different from what their documentation claims.15

### Create the router interfaces for each VLAN

Configure 10.10.10.1, 10.10.20.1, 10.10.30.1 and 10.10.40.1 as the gateways, matching the switch trunk exactly. A mismatch between switch and router is the most common reason a VLAN design works on paper and not in practice.16

### Add DHCP scopes per VLAN with reservations

One scope per network with the correct gateway for that VLAN — a client that receives the wrong gateway will fail to reach anything beyond its own network, and the fault is not obvious from the client side.17

### Review the firewall rules between VLANs

Decide and document what may cross: staff may reach servers and the internet; guests may reach only the internet; the devices VLAN may reach the internet for updates but not the staff network. **VLANs separate; the router's rules decide what is allowed across.** Both are needed.18

### Disable remote administration from the WAN

Confirm the router's management interface is not reachable from the internet. An internet-facing admin page is found automatically within hours, and default or weak credentials against it are how offices get compromised.19

### Save, document, and record the console fallback

Save both configurations, update the documentation with VLAN-to-network mapping, port assignments and management addresses, and note where the console cable is. That last item is what saves you when a bad change leaves you unable to reach the device at all.

## Guided practice

### Build the segmented office network on real equipment

Configure a managed switch and router from factory state to implement a four-VLAN design, then prove the segmentation is real rather than nominal.

1. 01Connect to the switch and record its firmware version before changing anything.

2. 02Change the default administrator credentials as your very first action.

3. 03Name the device with a convention that identifies its location and role.

4. 04Assign a static management address in the devices VLAN so it is reachable by you but not by guests.

5. 05Create four named VLANs matching the addressing design from last session.

6. 06Assign access ports to their VLANs, confirming each port mode reads access rather than trunk.

7. 07Account for every port — there should be none left unassigned and unconsidered.

8. 08Configure the router uplink as a tagged trunk carrying all four VLANs.

9. 09Shut down unused ports and assign them to an unused VLAN.

10. 10Restrict management access to the management network only.

11. 11Save the configuration, reload the switch, and confirm everything persisted.

12. 12Prove segmentation: a laptop on a staff port gets a staff address, on a guest port gets a guest address, and from the guest address cannot reach the server.

13. 13Read the MAC address table and identify which port a specific device is connected to.

14. 14Configure the router's WAN connection and record whether the public address is static or dynamic.

15. 15Create the four VLAN interfaces on the router with matching gateways.

16. 16Configure a DHCP scope per VLAN, each handing out its own correct gateway.

17. 17Document the firewall policy between VLANs — what may cross and why.

18. 18Confirm the router's management interface is not reachable from the internet.

19. 19Save both configurations and write up the VLAN map, port assignments and console-access location.

The standard we hold you to

Default credentials changed first; device and every port meaningfully named; four named VLANs implemented with correct access and trunk modes; unused ports shut and isolated; management restricted to the management network; configuration saved and verified to survive a reload; segmentation proven by moving a laptop between ports and confirming a guest cannot reach the server; MAC table read to locate a device; router VLAN interfaces matching the switch trunk exactly with correct per-VLAN gateways; inter-VLAN policy documented; WAN management confirmed disabled; and full documentation including the console fallback location.

## Common mistakes and how to fix them

Leaving factory default credentials on a switch or router

Fix: Change them first, before anything else. Default credentials for common models are published, and any device reachable from a wall socket with a factory password is an open door.

An endpoint connected to a port in trunk mode

Fix: Access ports belong to one VLAN and carry it untagged; trunks carry many, tagged. The wrong mode produces a link that shows up but passes almost nothing — check port mode before anything else.

Switch trunk and router interface not matching

Fix: If the router expects VLAN 30 tagged and the switch sends it untagged, the VLAN exists on paper only. Configure both ends from the same table and verify by testing, not by looking.

A DHCP scope handing out the wrong gateway for its VLAN

Fix: A client with the wrong gateway cannot leave its own network, and nothing on the client looks wrong. One scope per VLAN, each with that VLAN's gateway.

Leaving spare ports enabled on the default VLAN

Fix: Shut them and assign them to an unused VLAN. Otherwise any wall socket in the building puts a plugged-in laptop on your staff network.

Not saving the configuration before a reboot

Fix: On many devices the running configuration is lost on reload unless written to startup. Save after every working change and verify it survived a reload.

Creating VLANs but no rules between them

Fix: VLANs separate networks; the router's firewall rules decide what may cross. Both are required — segmentation without policy still lets guests reach servers if routing is open.

No out-of-band access to the device

Fix: Keep a console cable and know the physical port. A bad change made over the network can leave you unable to reach the device at all, and a cupboard under the stairs is a poor place to discover that.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- The MAC address table is the most underused diagnostic in small-network work. It tells you which physical port a device is on, which turns 'there is an unknown machine on the network' from an investigation into a walk to a specific socket. Learn to read it before you need it.

- Segmentation is only real if you test it. Configuring four VLANs and confirming that a guest genuinely cannot reach the server is the difference between a network that is secure and one that is documented as secure. The test takes two minutes and is the whole point of the exercise.

- Naming conventions are professionalism made visible. Hostnames like GF-SW01 and port labels like Printer-Main are what let someone else — or you, in eighteen months — make a change at speed without tracing cables. Clients notice this even when they cannot articulate why.

- You are always configuring over the network you are changing, so plan for losing access. Save constantly, keep a console cable, and know which physical port will still reach you. Every engineer who has worked on remote equipment has learned this the expensive way once.

## Key termsMAC addressThe hardware address burned into a network interface. Switches forward frames based on MAC addresses, which is layer-two operation.MAC address tableA switch's map of learned MAC addresses to the ports they were seen on. It is how a switch forwards selectively and how you find where a device is connected.Collision domainA set of devices sharing one transmission space. A hub creates one large collision domain; a switch gives each port its own, which is why switches replaced hubs.Routing tableA router's map of which networks are reachable via which interface or next hop. It is what allows traffic to move between different networks.VLANA logical grouping of switch ports that behaves as a separate network regardless of physical cabling. Broadcasts stay within a VLAN, making segmentation real.Access portA switch port belonging to exactly one VLAN, carrying that VLAN untagged. Used for endpoints such as computers and printers.Trunk portA switch port carrying multiple VLANs simultaneously with frames tagged by VLAN. Used between switches and to access points.Managed switchA switch with a configuration interface, enabling VLANs, port naming, monitoring and access control — as against an unmanaged switch which only forwards.

## Homework before the next session

Configure the four-VLAN network end to end

On the lab equipment or your own, implement the full design: named VLANs, correct access and trunk modes, unused ports isolated, management restricted. Save and verify it survives a reload.

Prove your segmentation is real

Move a laptop between ports and record the address it receives on each. Then demonstrate that a guest address cannot reach a server address, and explain in writing whether that is because of VLAN separation, a firewall rule, or both.

Trace a device using the MAC table

Find the physical port a specific device is connected to using only the switch's MAC address table. Write down the steps you took — this is a task you will be asked to do under pressure.

Write the configuration standard for a client

One page covering naming conventions, credential policy, unused-port handling, management access restrictions, and save-and-backup discipline. This is the document that makes your work repeatable across sites.

## Assessment rubric

How this session is marked. The certificate for Computer Networking is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Conceptual clarity | Can describe what a switch and a router do. | Explains layer-two against layer-three operation precisely, and uses the distinction to decide where a fault lives and which device to inspect. |
| Switch configuration | VLANs created and ports assigned. | Correct access and trunk modes throughout, every port accounted for, unused ports shut and isolated, configuration saved and verified across a reload. |
| Router configuration | The router routes between networks. | VLAN interfaces matching the switch trunk exactly, correct per-VLAN DHCP gateways, documented inter-VLAN policy, and WAN management confirmed disabled. |
| Verification | The network works. | Segmentation proven by moving a device between ports and testing reachability, and able to say whether a block comes from VLAN separation or a firewall rule. |
| Professional discipline | The configuration is functional. | Credentials changed first, meaningful naming throughout, management access restricted, out-of-band access planned for, and documentation a stranger could follow. |

## Session questionsDo I need a managed switch for a small office?+

If you want segmentation, yes — unmanaged hardware cannot do VLANs, so guests and cameras would share a network with your servers. A smart switch is often the right cost-effective middle ground for a genuinely small site.What happens if I set an access port where a trunk is needed?+

The link comes up and passes almost nothing useful, because the far end expects tagged frames for several VLANs and receives untagged frames for one. The link light gives no warning, so check port mode before anything else.Are VLANs a security control?+

They are a segmentation control, which is a strong foundation — but they need firewall rules between them to be a real control on their own. VLANs decide what is on the same network; the router's rules decide what may cross.Why name ports when I have a diagram?+

Because diagrams go stale and port labels do not. At 6pm, standing in front of a switch, the label is the fastest source of truth available, and it costs nothing to apply during installation.Can I manage a switch if I lose network access to it?+

Only through the console port, which is why you keep the cable and know where it goes. Planning for losing access is not pessimism — you are configuring over the very network you are changing.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: IP Addressing](https://www.cea.ng/classes/computer-networking/ip-addressing)[Next session 4: Wi-Fi](https://www.cea.ng/classes/computer-networking/wifi-setup)

Computer Networking

3 weeks · 6 sessions · ₦50,000 · you leave with a working configured network[See the full course](https://www.cea.ng/classes/computer-networking)[Enrol now](https://www.cea.ng/admissions)
