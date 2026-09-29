---
title: "Session 5: Networks & Wi-Fi Security"
description: "The network is where a lot of security quietly fails — an open Wi-Fi, a default router password, a guest who never left. This session covers how home and small-office networks actually work, how they are attacked, and how to configure one properly."
date: "2026-09-12"
class_slug: "cybersecurity"
---

The network is where a lot of security quietly fails — an open Wi-Fi, a default router password, a guest who never left. This session covers how home and small-office networks actually work, how they are attacked, and how to configure one properly.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain how a home or small-office network is put together

- Identify the default settings that create the most common exposures

- Configure a router securely, including Wi-Fi encryption and guest access

- Understand what is and is not safe on public Wi-Fi

- Explain how a firewall works and what it does not do

- Assess and remediate a real small-business network

## The taught content

### How the network is actually built

A typical Nigerian home or small-office network has one device doing several jobs. The **router** connects your local network to the internet and decides where traffic goes. It usually contains a **switch**, giving wired ports, and a **Wi-Fi access point**, giving wireless. It also runs **DHCP**, which hands out local addresses automatically, and **NAT**, which lets all your devices share the single public address your provider gave you.

Understand the two address spaces, because the distinction matters. **Private addresses** — the 192.168.x.x range most routers use — exist only inside your network and are how your devices talk to each other. Your **public address** is what the internet sees. NAT is the boundary between them, and it is the reason a device on your network is not directly reachable from outside by default — which is a genuine, if unglamorous, security benefit.

This model explains most network security advice. A device on your local network can reach every other device on it, which is why an infected laptop is a risk to the printer and the phone. A guest on your Wi-Fi is inside that boundary, which is why guest access matters. And anything reachable from the internet is reachable by anyone who finds it, which is why port forwarding and remote administration deserve suspicion.

### Default settings: where most exposure lives

Routers ship configured for convenience, not security, and the defaults are the single largest source of home and small-business network exposure. The **admin password** is printed on a sticker and is the same on every unit of that model, so anyone who knows the model knows how to get in — and once inside, they can redirect traffic, change DNS, or open the network. Changing it is the first and most important action.

The **Wi-Fi password** is likewise on the sticker, visible to anyone who sees the router, and often shared freely with visitors who never leave. **WPS** — the push-button pairing feature — has known weaknesses and should be disabled. **Remote administration** lets the router be configured from the internet, which almost nobody needs and which should be off. **UPnP** lets devices open ports on the router automatically, which is convenient and which malware also uses.

Then the firmware, which is the operating system of the router and which almost nobody updates. Router firmware vulnerabilities are well documented and are actively exploited, and an unpatched router with a default password is one of the easiest targets on the internet. Checking for a firmware update is a five-minute task that belongs in every network assessment.

### Configuring it properly

The configuration that matters, in order. **Change the admin password** to something strong and unique. **Use WPA2-AES or WPA3** for Wi-Fi encryption — WEP and WPA-TKIP are broken and should never be selected; if a device will only connect with WEP, that device is the problem. **Set a strong Wi-Fi passphrase**, and change it when someone who had it should no longer have access, which is the part everyone forgets.

**Disable WPS, remote administration and UPnP** unless there is a specific reason for each. **Set up a guest network** for visitors, which isolates them from your own devices — this is genuinely valuable in a business where customers, delivery people and contractors all ask for the Wi-Fi. **Rename the network** to something that does not identify you or your router model, and **do not broadcast** anything unnecessarily.

For a business, two more things. **Separate the networks** you can: staff devices, guest access, and any payment or point-of-sale equipment should not share a network with a visitor's phone. And **write down the configuration** — the admin credentials in a password manager, the Wi-Fi passphrase, what was disabled and why — because the next person to work on it will otherwise guess.

### Public Wi-Fi: what is actually risky

The danger of public Wi-Fi is usually overstated and occasionally understated, so be precise. The real risk is that you are on a network other people control, alongside other people you do not know. **Encrypted traffic is largely safe** — and almost everything is encrypted now, because HTTPS is universal — so a site using HTTPS protects your data even on a hostile network.

The genuine risks are specific. **A fake access point** — someone broadcasting a network named after the café or airport, which your device may join automatically, putting a stranger between you and everything. **Unencrypted traffic**, which still exists in older apps and some protocols, is readable by anyone on the network. **Device sharing** — if your laptop has file sharing or network discovery enabled, others on the network may reach it. And **captive-portal pages** that appear before you connect can be imitated to harvest credentials.

The practical rules: **turn off automatic joining** of open networks; **turn on the firewall** and disable file and printer sharing before connecting; **use a VPN** on public Wi-Fi, which encrypts everything to a server you trust and neutralises most of the risk; and **never log into anything sensitive** — banking especially — on a network you do not control, because a convincing fake access point defeats the URL check you would otherwise rely on.

### Firewalls, and what they do not do

A **firewall** controls which connections are allowed, based on rules about direction, port and address. Your operating system has one built in, and your router is effectively one because NAT blocks unsolicited inbound connections by default. Both are worth having and neither is dramatic.

Understand what a firewall does not do, because the misconception is common and costly. It does **not** protect you from phishing — a firewall happily permits your own outbound connection to a fake banking site. It does **not** stop malware arriving through something you downloaded or an attachment you opened, because you initiated that connection. And it does **not** protect against a weak password, a reused credential, or someone you gave the Wi-Fi passphrase to.

This is why the honest summary is that a firewall is necessary and insufficient. The controls that actually prevent most losses are the ones from the earlier sessions: two-factor authentication, unique passwords, backups, and not opening what you did not expect. A client who buys a firewall and does none of those has spent money on the wrong risk, and part of your job is saying so.

## Instructor demonstration

The instructor assesses a real small-business network, finds its default-configuration exposures, reconfigures the router properly with a guest network, demonstrates the public Wi-Fi risks and the VPN defence, and shows what a firewall does and does not stop.

### Map the network

Identify the router, the switch ports, the access point, and the connected devices. Explain the two address spaces and what NAT is doing at the boundary.02

### Find the router's default credentials

Show the sticker with the model's standard admin password. Explain that anyone knowing the model can log in and reconfigure the whole network.03

### Change the admin password

Set a strong unique password and store it in a password manager. Explain that this is the single highest-value network action.04

### Check the Wi-Fi encryption

Show the security setting and confirm WPA2-AES or WPA3. Explain that WEP and WPA-TKIP are broken and that a device requiring them is the problem.05

### Set a strong Wi-Fi passphrase

Replace the sticker default. Explain that the passphrase must be changed when anyone who had it should no longer have access.06

### Disable WPS, remote admin and UPnP

Turn each off and explain the specific risk each creates. Note that UPnP is used by malware to open ports automatically.07

### Set up a guest network

Enable and configure an isolated guest SSID. Explain why this matters in a business where customers and contractors all request Wi-Fi.08

### Check for a firmware update

Look for an update and apply it. Explain that router firmware vulnerabilities are documented and actively exploited, and almost nobody patches.09

### Demonstrate automatic Wi-Fi joining

Show a device joining an open network automatically and explain how a fake access point exploits this. Then disable automatic joining.10

### Show file sharing exposure

Display what the machine exposes on a network, then disable file and printer sharing and confirm the firewall is on.11

### Demonstrate a VPN on public Wi-Fi

Connect a VPN and explain that it encrypts everything to a trusted server, neutralising most public-network risk.12

### Show what a firewall does not stop

Navigate to a fake banking page with the firewall enabled. Explain that it permits your own outbound connections, so it does nothing against phishing.

## Guided practice

### Assess and secure a real network

You assess a real home or small-business network, document every default-configuration exposure, reconfigure the router to a secure standard with a guest network, and write a plain-language configuration record plus a public Wi-Fi policy.

1. 01Map the network: router, switch, access point, and the devices connected to it.

2. 02Record the router model and check whether the admin password is still the sticker default.

3. 03Change the admin password to a strong unique one and store it in a password manager.

4. 04Confirm the Wi-Fi encryption is WPA2-AES or WPA3, and change it if not.

5. 05Set a strong Wi-Fi passphrase replacing any default.

6. 06Disable WPS, remote administration and UPnP, noting the reason for each.

7. 07Check for and apply any router firmware update.

8. 08Enable an isolated guest network for visitors.

9. 09Rename the network so it does not identify the owner or the router model.

10. 10On a laptop, disable file and printer sharing and confirm the firewall is enabled.

11. 11Disable automatic joining of open Wi-Fi networks on the devices you control.

12. 12Write a configuration record: credentials location, passphrase, what was disabled and why.

13. 13Write a short public Wi-Fi policy covering VPN, automatic joining and sensitive logins.

The standard we hold you to

A network with a non-default admin password, WPA2-AES or WPA3 encryption, a strong Wi-Fi passphrase, WPS and remote administration and UPnP disabled, firmware current, an isolated guest network enabled, device sharing disabled, and both a written configuration record and a public Wi-Fi policy in plain language.

## Common mistakes and how to fix them

The router admin password is still the sticker default

Fix: Change it first. Anyone who knows the model knows the password, and inside the router an attacker can redirect traffic, change DNS or open the network entirely.

You are using WEP or WPA-TKIP

Fix: Both are broken and can be cracked quickly. Use WPA2-AES or WPA3. If a device only connects with WEP, that device is the problem and should be replaced or isolated.

You left WPS and remote administration enabled

Fix: Disable both. WPS has known weaknesses and remote administration exposes the router's configuration to the internet for no benefit most people need.

You never update the router firmware

Fix: Check for updates as part of every assessment. Router firmware vulnerabilities are documented and actively exploited, and an unpatched router with default credentials is among the easiest targets online.

Visitors share your main Wi-Fi

Fix: Enable an isolated guest network. Anyone on your main network can reach every other device on it, which in a business means customers alongside your payment terminal.

You rely on a firewall to protect against phishing

Fix: A firewall permits your own outbound connections, including to a fake banking site. Two-factor, unique passwords, backups and scepticism are what actually prevent the common losses.

You log into banking on public Wi-Fi

Fix: Do not. A fake access point defeats the URL check you rely on. Use a VPN for general browsing, and avoid sensitive logins on networks you do not control.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Change the router admin password before anything else, on every network you touch. It is the highest-value single action in this session and it takes two minutes.

- Set up a guest network on every business network, even a one-person one. Isolating visitors from your own devices costs nothing and removes an entire category of exposure that most small businesses never considered.

- Write down the configuration in a password manager, including what you disabled and why. The next person to work on the network will otherwise re-enable things, and a documented baseline is what makes future troubleshooting fast.

- Tell clients plainly that a firewall does not stop phishing. The misconception that buying a security product makes them safe is expensive, and correcting it is part of the service rather than a sales obstacle.

## Key termsRouterThe device connecting a local network to the internet and directing traffic. Usually also a switch and access point.NATNetwork address translation, letting many devices share one public address. Also the default barrier to unsolicited inbound connections.DHCPThe service handing out local addresses automatically to devices joining the network.WPA2-AES / WPA3The Wi-Fi encryption standards to use. WEP and WPA-TKIP are broken and must never be selected.WPSPush-button Wi-Fi pairing with known weaknesses. Disable it.UPnPA protocol letting devices open router ports automatically. Convenient, and used by malware. Disable unless required.Guest networkAn isolated SSID for visitors, keeping them away from your own devices. Essential in any business.VPNAn encrypted tunnel to a trusted server. The main defence on public Wi-Fi, neutralising most of its risks.

## Homework before the next session

Secure your own router

Admin password changed, WPA2-AES or WPA3 confirmed, strong Wi-Fi passphrase, WPS and remote admin and UPnP disabled, firmware updated, guest network enabled.

Assess one business network

Document every default-configuration exposure you find and present the fixes in priority order. Most small businesses have never had this done.

Configure a device for public Wi-Fi

Disable automatic joining, disable file and printer sharing, confirm the firewall, and install a VPN. Note how long it takes — it is under ten minutes.

Write a one-page network record

Model, credentials location, Wi-Fi passphrase, encryption standard, what was disabled and why, firmware version. This is the document the next person needs.

## Assessment rubric

How this session is marked. The certificate for Cybersecurity is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Network understanding | Knows what a router does. | Explains the router, switch, access point, DHCP and NAT, the two address spaces, and why anything on the local network can reach everything else. |
| Default exposure | Changes the Wi-Fi password. | Identifies the admin default, the sticker passphrase, WPS, remote administration and UPnP, and unpatched firmware as the main exposures. |
| Configuration | Improves the settings. | Admin password changed, WPA2-AES or WPA3 set, dangerous features disabled, firmware current, and an isolated guest network enabled. |
| Public Wi-Fi judgement | Is cautious on public networks. | Distinguishes encrypted from unencrypted risk, explains fake access points, disables automatic joining, uses a VPN and avoids sensitive logins. |
| Honest scoping | Recommends a firewall. | Explains what a firewall does not stop, and directs the client to the controls that actually prevent the common losses. |

## Session questionsWhat is the most important thing to change on a router?+

The admin password. It is printed on the sticker and identical on every unit of that model, so anyone who knows the model can reconfigure your whole network. Changing it takes two minutes and is the highest-value network action there is.Is public Wi-Fi actually dangerous?+

Less than people fear, because HTTPS encrypts almost everything now. The real risks are fake access points, unencrypted legacy traffic, and device sharing being enabled. Use a VPN, disable automatic joining, and do not do banking on a network you do not control.Do I need a VPN at home?+

Usually not — your home network is already yours, and a VPN mainly hides your traffic from your provider. The clear case for a VPN is public Wi-Fi, where it encrypts everything to a server you trust and neutralises most of the risk.Should a business give customers its Wi-Fi password?+

Give them a guest network instead. Anyone on your main network can reach every other device on it, which in a business means customers alongside your payment equipment and staff machines. Guest isolation is free on almost every router.Does a firewall protect me from phishing?+

No. A firewall permits your own outbound connections, including to a convincing fake banking site. It does not stop phishing, malware you download yourself, or a weak password. Two-factor, unique passwords, backups and scepticism do the real work.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Phishing, Scams & Malware](https://www.cea.ng/classes/cybersecurity/phishing-scams-malware)[Next session 6: Encryption & Web Security](https://www.cea.ng/classes/cybersecurity/encryption-and-web-security)

Cybersecurity

4 weeks · 8 sessions · ₦50,000 · you leave with a security assessment report[See the full course](https://www.cea.ng/classes/cybersecurity)[Enrol now](https://www.cea.ng/admissions)
