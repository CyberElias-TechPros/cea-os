---
title: "Session 5: Troubleshooting Tools"
description: "The diagnostic toolkit: ping and path testing, isolating DNS from connectivity, diagnosing DHCP failures, and reading a router's status pages so the equipment tells you what is wrong instead of you guessing."
date: "2026-09-12"
class_slug: "computer-networking"
---

The diagnostic toolkit: ping and path testing, isolating DNS from connectivity, diagnosing DHCP failures, and reading a router's status pages so the equipment tells you what is wrong instead of you guessing.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Use ping correctly and understand what its results do and do not prove

- Interpret traceroute output to find where a path actually fails

- Separate a DNS failure from a connectivity failure with two tests

- Diagnose DHCP failures and identify the 169.254 address for what it means

- Read a router's status pages to locate faults without guessing

## The taught content

### Diagnosis is a sequence, and the sequence is what makes it fast

When a client says 'the internet is down', the temptation is to start changing settings. The professional response is to run a fixed sequence that narrows the fault to a layer, because each test eliminates a category and the order is chosen so that cheap, definitive tests come first. Random changes are slower, and worse, they leave the network in a state nobody can describe afterwards.

The sequence we use follows the layered model from session one, working **outward from the machine**. First: does the machine have a valid address? Second: can it reach its own gateway? Third: can it reach something on the internet by address? Fourth: can it resolve a name? Four questions, and the answer to each points at a different device and a different fix.

That last distinction — **address against name** — is the single most useful split in network diagnosis. If you can reach an IP address but not a domain name, your connectivity is fine and your DNS is broken. Those are completely different problems, they live on different equipment, and clients describe them identically. **Testing both is what tells you which one you are actually dealing with.**

### Ping: what it proves, and the three results people misread

**Ping** sends an ICMP echo request and waits for a reply. It answers one question — can this machine reach that address right now — and it answers it quickly, which is why it is the first tool. Ping your own address to confirm the stack works, your gateway to confirm the local network works, and a public address such as 8.8.8.8 to confirm the internet path works.

Three results get misread constantly. **A successful ping to the gateway proves only that the local link works** — not that the internet works, and not that DNS works. **A failed ping does not always mean the host is down**, because many servers and firewalls are configured to ignore ICMP, so no reply can mean 'blocked' rather than 'absent'. And **a slow ping is often more informative than a failed one** — high or wildly variable latency points at congestion, a failing wireless link, or an overloaded device, which a simple pass or fail hides.

Read the summary line, not just whether replies appear. Packet loss percentage and the spread between minimum, maximum and average tell you whether a link is stable. **Twenty per cent loss on a wireless connection is a coverage or interference problem**, and it presents to the user as 'the internet keeps dropping' with nothing actually failing completely — which is precisely the kind of fault that is hard to diagnose without looking at the numbers.

### Traceroute: finding where the path breaks, and reading it honestly

**Traceroute** — `tracert` on Windows, `traceroute` on Linux and macOS — shows each hop a packet takes toward a destination. It works by sending packets with progressively increasing time-to-live values, so each router along the way reports itself. The output tells you where your traffic leaves your network, which ISP links it crosses, and where it stops.

Reading it requires one important piece of honesty: **a line of asterisks does not necessarily mean a failure.** Routers commonly deprioritise or block the ICMP responses traceroute relies on, so an unresponsive hop in the middle of a path is normal. What matters is whether the **final destination** is reached. If it is, the path works and the silent hops are irrelevant. If the trace stops and never completes, the last responding hop tells you roughly where the problem begins.

The practically useful observation is **whose network the failure is in**. If the trace dies at your router, the fault is yours. If it completes through your router and into your ISP's network and then stops, the fault is theirs — and that is the evidence you need when you call them. **Without a traceroute, an ISP support call is your word against theirs; with one, it is a conversation about a specific hop.**

### DNS: the fault that looks exactly like a connectivity failure

**DNS** translates names to addresses, and when it fails every symptom looks like the internet being down — because from a user's perspective, it is. The browser says the site cannot be reached. Nothing suggests a name-resolution problem, because nobody thinks in addresses.

The isolation takes two tests and about thirty seconds. **Ping a public IP address**, such as 8.8.8.8. If that succeeds, your network path to the internet is working. Then **ping a domain name**, such as google.com. If that fails while the address succeeded, your problem is DNS and nothing else. That single comparison is the most valuable diagnostic habit in this entire session.

Then diagnose the DNS side. **`nslookup` or `dig`** shows what a name resolves to and which server answered — if it returns nothing or times out, the configured DNS server is not responding. Check which servers the machine actually has, because a common cause is a stale or wrong setting left over from a previous configuration, or a DHCP scope handing out an address that no longer serves DNS. And note the failure mode where **one DNS server is down and the other works**, producing intermittent name resolution that appears random but is entirely explainable once you test each server separately.

### DHCP failures, and the address that tells you what happened

When a machine cannot obtain an address from DHCP, it does not simply have no address — it assigns itself one from **169.254.0.0/16**, known as an APIPA or link-local address. Seeing a 169.254 address is diagnostic gold, because it means precisely one thing: **the machine tried to get an address and failed.** It is not a configuration error by the user; it is a failed negotiation.

The causes follow a short list. **No DHCP server reachable** — the scope does not exist, or the VLAN the machine is on has no scope, which is common after a segmentation change. **An exhausted pool** — the scope has run out of addresses, typically on a guest network with a lease that is too long. **A blocked path** — DHCP uses broadcast, and broadcasts do not cross a router unless a relay is configured, so a scope on the wrong VLAN simply cannot be reached. And **a physical problem**, because a dead cable produces the same symptom as a missing scope.

The diagnostic order matters. Check the address first — a 169.254 address means DHCP failed; a valid address in the wrong range means the machine reached a different scope than intended, which points at VLAN assignment. Then check the scope has free addresses. Then check the VLAN and relay configuration. **Working through that list in order resolves almost every DHCP call**, and it is much faster than rebooting the router and hoping.

### Reading a router's status pages: the information is already there

Most network faults can be located from the router's own status pages, and most people never look at them. The pages worth knowing are the **WAN or internet status**, which shows whether the connection is up, what public address was assigned, and when it was established; the **DHCP client list**, which shows every device that has been given an address; the **connected devices or wireless clients** list; and the **system log**, which records disconnections, authentication failures and configuration changes.

The WAN status alone answers the question clients actually ask. If it shows the connection up with a valid public address, your problem is internal. If it shows disconnected, or an address that changed unexpectedly, the fault is at the ISP boundary or the line itself. **The uptime figure matters too** — a WAN connection that has been up for four minutes at 3pm means it dropped recently, which reframes the whole investigation.

Then the log, which is the most neglected resource on the device. It records when the connection dropped, when a device failed to authenticate, and — critically — **when somebody changed a setting**. A surprising share of network faults turn out to be a configuration change nobody documented, and the log is the only place that remembers. Make reading the log a habit before changing anything, because it frequently tells you the fault's start time, which is often enough to identify its cause.

## Instructor demonstration

We run the full diagnostic sequence on the office network, then create four controlled faults — DNS, DHCP, gateway and path — and diagnose each one from symptoms alone.

### Establish the baseline on a healthy network

Record a working machine's address, mask, gateway and DNS servers. Ping the gateway, a public address and a domain name, and save all three results. **A baseline taken while things work is what makes a fault legible later**, and almost nobody has one.02

### Run the four-question sequence in order

Valid address? Gateway reachable? Public address reachable? Name resolves? Narrate what each answer eliminates. The point is the sequence, not the individual commands — the order is what makes diagnosis fast.03

### Read the ping summary rather than just the replies

Ping the gateway fifty times and examine loss percentage and the min/max/average spread. A stable link shows near-zero loss and a tight spread. This is how you catch a marginal wireless connection that never fails completely.04

### Run a traceroute and read it honestly

Trace to a well-known public address. Identify your router, the first ISP hop, and the destination. Note which hops do not respond and explain that unresponsive intermediate hops are normal — what matters is whether the destination is reached.05

### Use traceroute to attribute a fault

Show that if the trace dies at the router the fault is internal, and if it completes past the router and dies in the ISP's network the fault is theirs. This is the evidence that turns an ISP support call into a specific conversation.06

### Demonstrate the DNS isolation test

Ping 8.8.8.8 — succeeds. Ping a domain name — succeeds. Both working means DNS is fine. Explain that this comparison, and only this comparison, separates a DNS fault from a connectivity fault.07

### Inspect which DNS servers the machine actually uses

Show the configured servers and query each one individually with nslookup. Demonstrate that if one server is dead and the other works, name resolution becomes intermittent — appearing random but entirely explainable.08

### Create fault one: break DNS deliberately

Point the machine at an invalid DNS server address. Observe that every website fails while connectivity is intact, then prove it by pinging a public IP successfully. This is the fault users describe as 'the internet is down'.09

### Diagnose fault one from symptoms alone

Without looking at the configuration, run the sequence and show it lands on DNS. Then fix it by restoring correct servers and confirm recovery. The skill is reaching the right conclusion from symptoms, not from knowing what you changed.10

### Create fault two: exhaust or remove the DHCP scope

Shrink the scope so a new device cannot get an address. Connect a fresh laptop and observe what happens, then check its assigned address.11

### Identify the 169.254 address and explain it

Show the self-assigned link-local address and state what it proves: the machine requested an address and no server answered. Then work the cause list — scope missing, pool exhausted, wrong VLAN, or dead cable — in that order.12

### Create fault three: wrong gateway

Configure a valid address with an incorrect gateway. The machine now reaches its own network but nothing beyond it. Observe that ping to the gateway fails while local devices still work, which is the signature of this fault.13

### Create fault four: a path failure

Block outbound traffic for one protocol or destination at the router. Show that general connectivity is fine while one service fails — the pattern users report as 'only one website does not work', which is almost always a filtering or routing rule rather than a broken internet.14

### Read the router's WAN status page

Show connection state, assigned public address, and uptime. Explain that a short uptime means a recent drop, and that a valid public address means any remaining fault is internal. This one page answers the question clients actually ask.15

### Read the DHCP client list and the system log

Show every device that has been allocated an address — which is how you find an unknown device — and read the log for disconnections, authentication failures and configuration changes. Note the timestamps, because a fault's start time often identifies its cause.16

### Restore everything and re-verify against the baseline

Undo all four faults, then re-run the four-question sequence and compare against the baseline you saved at the start. Confirm the network is genuinely back, rather than assuming it is because one page loaded.17

### Write the diagnostic runbook

Document the four-question sequence, what each result means, the 169.254 interpretation, and how to read the router's status pages. This runbook is what turns a diagnosis you performed once into one anyone on the team can repeat.

## Guided practice

### Build a baseline, then diagnose four faults from symptoms alone

Take a real network, record a healthy baseline, then create and diagnose four controlled faults using only the tools in this session.

1. 01Record a full baseline on a healthy network: address, mask, gateway, DNS servers, and successful ping results to gateway, public address and domain.

2. 02Run the four-question diagnostic sequence in order and write down what each answer eliminates.

3. 03Ping the gateway fifty times and record loss percentage and the min/max/average spread.

4. 04Run a traceroute to a public address and identify your router, the first ISP hop and the destination.

5. 05Explain in writing why unresponsive intermediate hops in a traceroute are normal and what result actually matters.

6. 06Perform the DNS isolation test — public IP against domain name — and record both outcomes.

7. 07Query each configured DNS server individually and note whether one is failing while the other works.

8. 08Break DNS deliberately, then diagnose it from symptoms without looking at the configuration, and restore it.

9. 09Cause a DHCP failure and identify the self-assigned 169.254 address, explaining precisely what it proves.

10. 10Work the DHCP cause list in order — scope missing, pool exhausted, wrong VLAN, dead cable — and record which applied.

11. 11Cause a wrong-gateway fault and observe that local devices work while nothing beyond the network does.

12. 12Cause a path or filtering fault and observe that general connectivity is fine while one service fails.

13. 13Read the router's WAN status page and record connection state, public address and uptime.

14. 14Read the DHCP client list to identify every allocated device, and the system log for drops, auth failures and configuration changes.

15. 15Restore all faults and re-verify against your saved baseline rather than assuming recovery.

16. 16Write a one-page diagnostic runbook someone else could follow without asking you a question.

The standard we hold you to

A recorded healthy baseline; the four-question sequence executed in order with each result's meaning explained; ping loss and latency spread measured; a traceroute interpreted honestly including why silent hops are normal; the DNS isolation test performed and both outcomes recorded; four faults created and each diagnosed **from symptoms rather than from knowledge of what was changed**; the 169.254 address correctly identified and explained; router WAN status, DHCP client list and system log all read; recovery verified against baseline; and a written runbook.

## Common mistakes and how to fix them

Assuming a failed ping means the host is down

Fix: Many servers and firewalls ignore ICMP, so no reply can mean blocked rather than absent. Treat ping as one input, and confirm with a real service test before concluding a host is dead.

Reading a successful gateway ping as 'the internet works'

Fix: It proves only that the local link works. Continue to a public address and then to a domain name — those are different tests answering different questions.

Treating asterisks in a traceroute as a failure

Fix: Routers commonly block the ICMP responses traceroute uses. What matters is whether the destination is reached, not whether every intermediate hop answered.

Diagnosing 'the internet is down' without separating DNS from connectivity

Fix: Ping a public IP, then a domain name. If the address works and the name does not, your fault is DNS. Two tests, thirty seconds, and it ends most misdiagnosis.

Seeing a 169.254 address and assuming the user misconfigured something

Fix: That address means the machine requested one and no DHCP server answered. It is a failed negotiation, and the cause is a missing scope, an exhausted pool, a wrong VLAN, or a dead cable.

Rebooting the router instead of reading its status pages

Fix: A reboot destroys the evidence. Read the WAN status, DHCP client list and system log first — the fault's start time and the connection's uptime frequently identify the cause immediately.

Changing several settings at once during diagnosis

Fix: You lose the ability to say what fixed it, and the network ends up in a state nobody can describe. Change one thing, test, and record the result before moving on.

Having no baseline taken while the network worked

Fix: Record addresses, DNS servers and ping results when everything is healthy. Without a baseline, a fault gives you nothing to compare against and every investigation starts from zero.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- The DNS isolation test is the highest-value habit in this session. Ping an address, ping a name — that comparison separates two faults that users describe identically and that live on entirely different equipment. Thirty seconds of work prevents an hour of misdirected effort.

- Read the ping summary line rather than just watching for replies. Loss percentage and the min-to-max spread reveal a marginal link that never fails completely, which is exactly the fault users report as 'the internet keeps dropping' and that nothing else exposes.

- A traceroute is what turns an ISP support call from an argument into a conversation. Without it, it is your word against theirs; with it, you can name the hop where the path dies and whose network it is in. Keep one before you call.

- The router's system log is the most neglected diagnostic resource available. It records when the connection dropped, when authentication failed, and when somebody changed a setting — and a surprising share of faults turn out to be an undocumented change. Read the log before you change anything.

## Key termsICMPThe protocol ping and traceroute use. Because it is often filtered, a missing reply can mean blocked rather than absent.TracerouteA tool showing each hop toward a destination, using progressively increasing TTL values. Used to locate where a path fails and whose network it is in.TTLTime to live — a hop counter in each packet. Traceroute manipulates it deliberately so each router along the path reports itself.DNS resolutionTranslating a domain name to an IP address. When it fails, every symptom resembles a total connectivity failure, which is why it must be tested separately.nslookup / digTools that query a DNS server directly and show what a name resolves to and which server answered. Essential for isolating a DNS fault.169.254.x.x (APIPA)The link-local range a machine assigns itself when DHCP fails. Seeing it proves the machine requested an address and no server answered.DHCP relayThe mechanism that forwards DHCP broadcasts across a router. Without it, a scope on a different VLAN cannot be reached, because broadcasts do not route.WAN status pageA router page showing connection state, assigned public address and uptime. It answers immediately whether a fault is internal or at the ISP boundary.

## Homework before the next session

Record a healthy baseline

For a network you support, document addresses, mask, gateway, DNS servers, and ping results to gateway, public address and domain, plus a traceroute. Store it where you can find it during an incident.

Diagnose four faults from symptoms

Create DNS, DHCP, gateway and path faults, and for each one write the symptoms a user would report, the tests that identify it, and the fix. Have someone else read only the symptoms and confirm your tests identify the right cause.

Measure a marginal link

Ping a gateway fifty times on both a wired and a wireless connection. Compare loss and latency spread, and explain what the difference tells you about each link's reliability.

Write the diagnostic runbook

One page: the four-question sequence, what each result means, the 169.254 interpretation, the DNS isolation test, and which router status pages to read. Written so a colleague can follow it without asking you anything.

## Assessment rubric

How this session is marked. The certificate for Computer Networking is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Tool competence | Can run ping, traceroute and nslookup. | Chooses the right tool for the question, reads output beyond pass/fail, and can explain what each result does and does not prove. |
| Diagnostic method | Eventually finds the fault. | Runs the four-question sequence in order, changes one thing at a time, and reaches the right conclusion from symptoms rather than from knowing what was changed. |
| DNS isolation | Knows DNS translates names. | Performs the address-against-name comparison instinctively, queries individual servers, and recognises the one-dead-server intermittent pattern. |
| DHCP diagnosis | Can renew an address. | Recognises 169.254 immediately, works the cause list in order, and understands why broadcasts need a relay to cross a router. |
| Evidence and documentation | Faults were fixed. | Baseline recorded before faults, router status pages and log read before changes were made, recovery verified against baseline, and a runbook written for someone else. |

## Session questionsA website will not load but ping works. What is wrong?+

Test a domain name against a raw IP address. If the IP works and the name does not, DNS is your fault. If both work, the problem is likely a filtering rule or the site itself rather than your network.Is a failed ping proof that a server is down?+

No. Many servers and firewalls ignore ICMP deliberately, so no reply can mean blocked rather than absent. Confirm with an actual service test before concluding anything is dead.What does a 169.254 address mean?+

The machine requested an address from DHCP and no server answered, so it assigned itself a link-local one. Check the scope exists for that VLAN, that the pool is not exhausted, and that the cable is live.Should I reboot the router first?+

Read its status pages first. A reboot destroys the evidence — the uptime, the log entries and the client list that would have told you what happened. Reboot after you have looked, not instead of looking.How do I prove a fault is the ISP's and not mine?+

A traceroute showing the path completing through your router and dying inside the ISP's network, plus a WAN status page showing a valid connection. Take both before you call, and the conversation becomes specific.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Wi-Fi](https://www.cea.ng/classes/computer-networking/wifi-setup)[Next session 6: Network Troubleshooting Practical](https://www.cea.ng/classes/computer-networking/network-troubleshooting-practical)

Computer Networking

3 weeks · 6 sessions · ₦50,000 · you leave with a working configured network[See the full course](https://www.cea.ng/classes/computer-networking)[Enrol now](https://www.cea.ng/admissions)
