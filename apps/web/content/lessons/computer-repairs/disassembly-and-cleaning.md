---
title: "Session 3: Disassembly & Cleaning"
description: "The most common paid job in this trade: open a laptop, clean out the dust that is making it slow and hot, replace the thermal paste, and put it back together working. This session covers the full disassembly and reassembly sequence, cleaning method, and thermal paste application done properly."
date: "2026-09-12"
class_slug: "computer-repairs"
---

The most common paid job in this trade: open a laptop, clean out the dust that is making it slow and hot, replace the thermal paste, and put it back together working. This session covers the full disassembly and reassembly sequence, cleaning method, and thermal paste application done properly.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Disassemble a laptop in the correct order without breaking clips or cables

- Remove and clean a fan and heatsink properly

- Clean old thermal paste and apply new paste correctly

- Clean a keyboard, screen and exterior without damaging them

- Reassemble correctly with every screw in its own hole

- Verify the repair worked by measuring temperature and behaviour

## The taught content

### Why cleaning is a real repair, not a favour

A laptop that has been used for two or three years in a dusty environment is almost certainly running hot, and heat is the reason it feels slow. When a CPU approaches its thermal limit it reduces its own clock speed to avoid damage — **thermal throttling** — and the machine becomes dramatically slower under any load. The customer experiences this as 'my laptop is dying' or 'it is just old', and they are often told to buy a new one. In a large share of cases the actual cause is a fan clogged with dust and thermal paste that has dried to a crust.

The fix costs almost nothing in parts and takes under an hour: remove the dust from the fan and heatsink fins, clean the old paste, apply new paste, reassemble. The result is routinely a machine that runs fifteen to twenty-five degrees cooler and stops throttling, which the customer experiences as a machine that has come back to life. This is the most reliably satisfying job in the trade and the one that generates the most referrals.

It is also honest work, which matters. There is no upsell required and no ambiguity about the outcome — you can measure the temperature before and after and show the customer the difference. That evidence is what turns a one-off repair into a reputation.

### The disassembly sequence

The general sequence holds across most laptops, though the details vary — which is why the service manual or teardown from session two comes first. **Power down fully**, unplug the mains, and remove any external devices. **Remove the battery** if it is external, or open the base and disconnect the internal battery connector before anything else. **Remove the base cover**, which is usually held by a ring of Phillips screws — note that some are hidden under rubber feet or under a rubber strip, and that laptop screws are commonly of two or three different lengths.

Then work inward: disconnect the battery if you have not already, remove the **storage** and **RAM** if access is needed, then reach the **cooling assembly**. The fan is usually held by two or three small screws and a delicate power connector that lifts rather than pulls. The **heatsink** is a copper pipe assembly bolted to the CPU and often the GPU with **spring-loaded screws that must be loosened in a diagonal sequence** — numbered on the heatsink itself on many machines — to avoid cracking the die by releasing pressure unevenly.

Throughout, the two rules are: **photograph before each step**, and **lay screws out in removal order**. The most expensive mistake in laptop repair is not a diagnostic error; it is a long screw driven into a short hole, which can crack the board and turn a fifty-minute cleaning into a written-off machine.

### Cleaning the fan and heatsink

The fan comes out first, and it is fragile: its blades are thin plastic and its connector is small. Blow dust out with compressed air, but **hold the fan blades still while you do it** — spinning a fan with compressed air can generate a voltage in its motor and damage it, and it can also overspeed the bearing. A soft brush loosens the compacted dust that air alone will not move, which after two years is most of it.

The **heatsink fins** are where the real blockage lives. Dust forms a felt-like mat across the fins, and until it is removed, air cannot pass. Blow from the inside outward, and where the mat is compacted, lift it off gently with tweezers rather than trying to blast it through — pushing it further in only packs it tighter. Check the **exhaust vent** in the case as well; a mat of dust sitting just inside the vent is extremely common and is often the whole problem.

Then clean the rest of the interior gently: the board surface, the keyboard underside if exposed, and any other fan. Do not use a vacuum cleaner directly on a board, because it generates static; compressed air and a brush are correct. Wipe the interior surfaces with a lint-free cloth slightly dampened with isopropyl alcohol, which evaporates without leaving residue.

### Thermal paste: the part people get wrong

**Thermal paste** fills the microscopic gaps between the CPU's heat spreader and the heatsink, because even machined-flat metal surfaces touch at only a fraction of their area. Old paste dries into a crust and stops conducting, which is why a five-year-old machine runs hot regardless of how clean the fan is. Cleaning and replacing it is a genuine part of the service, not an optional extra.

Clean both surfaces with **isopropyl alcohol at 90% or higher** on a lint-free cloth or a coffee filter, which does not shed fibres the way cotton wool does. Wipe until the surface is shiny and no grey residue remains. Let it dry fully — alcohol evaporates in seconds — before applying anything.

Application is where most people go wrong, usually by using too much. The correct amount is **a small dot roughly the size of a grain of rice** in the centre of the die, or a thin line across a rectangular die. The pressure of the heatsink spreads it. Too little leaves gaps; too much squeezes out over the surrounding components, and while most modern paste is non-conductive, excess is still messy and can foul nearby parts. Do not spread it by hand or with a card — the mounting pressure does a better job than you can.

Then refit the heatsink and tighten the spring screws **in the numbered diagonal sequence**, a little at a time on each, so pressure builds evenly. Uneven tightening on a spring-loaded heatsink is a genuine risk of cracking the die, and it is a mistake that is invisible until the machine fails.

### Reassembly and verifying the result

Reassembly is disassembly in reverse, with the screws going back into their own holes from the layout you made. Reconnect the fan, the battery last, then refit the base cover — clips first, then screws, and do not force a cover that will not seat, because something underneath is usually misaligned. Before closing up entirely, it is worth powering on with the cover off once to confirm the fan spins and the machine boots.

Then **measure the result**, because a repair you cannot demonstrate is a repair the customer has to take on trust. Record the idle and load temperatures before you start — free tools such as HWMonitor show CPU temperature — and again afterwards. A drop of fifteen to twenty-five degrees under load is normal and is compelling evidence. Also confirm the fan is quieter, that the machine no longer throttles under sustained load, and that the exhaust actually blows warm air rather than nothing.

Finally, tell the customer what caused it and how to delay the recurrence: a laptop used on a bed or a lap draws dust in through the base and blocks its intake, and a hard flat surface makes a real difference. That advice costs you nothing, it is genuinely useful, and it is the kind of thing that makes a customer recommend you rather than just pay you.

## Instructor demonstration

The instructor cleans a genuinely dusty laptop end to end — measuring temperatures before and after — demonstrating the heatsink screw sequence, the correct paste amount, and the fan-holding technique, then reassembles and shows the evidence.

### Record the starting temperatures

Run a temperature tool, note idle and load figures, and let the machine run a load so throttling is visible. Explain that this is the evidence you will show the customer.02

### Power down and disconnect

Shut down fully, unplug the mains, and open the base to disconnect the internal battery first. Explain why this is always the first internal step.03

### Photograph and lay out the screws

Photograph the interior and the screw positions, then lay screws out in removal order on the magnetic mat. Point out any hidden screws under rubber feet.04

### Remove the fan

Take out its screws and lift the delicate power connector rather than pulling the wires. Explain how easily the connector is damaged.05

### Clean the fan with the blades held

Hold the blades still while blowing air through, and brush the compacted dust. Explain why spinning a fan with compressed air can damage it.06

### Clear the heatsink fins

Blow from the inside out and lift the compacted mat off with tweezers. Check the case exhaust vent for a dust mat sitting just inside.07

### Remove the heatsink in diagonal sequence

Loosen the numbered spring screws a little at a time in diagonal order. Explain that uneven release on a spring-loaded heatsink risks cracking the die.08

### Show the old paste

Display the dried crust on both surfaces and explain that this alone would keep the machine hot however clean the fan is.09

### Clean both surfaces

Use 90%+ isopropyl alcohol on a lint-free cloth until shiny, and let it evaporate fully. Explain why cotton wool is the wrong choice.10

### Apply the correct amount of paste

Place a rice-grain dot in the centre. Show a deliberately excessive amount beside it and explain why too much is worse than too little.11

### Refit and tighten evenly

Replace the heatsink and tighten in the numbered diagonal sequence, a little on each screw at a time. Explain that mounting pressure spreads the paste better than a card can.12

### Reassemble and re-measure

Refit the fan, connect the battery last, close the cover clips-first, boot, and record idle and load temperatures. Compare with the starting figures.

## Guided practice

### Full clean, repaste and verified result

You perform a complete clean and thermal-paste replacement on a real laptop: temperatures recorded before and after, fan and heatsink cleaned, paste replaced correctly, heatsink refitted in diagonal sequence, machine reassembled with every screw in its own hole, and the improvement measured.

1. 01Record idle and load temperatures before starting, and note whether the machine throttles under load.

2. 02Power down fully, unplug the mains, and disconnect the internal battery before any other work.

3. 03Photograph the interior and lay all screws out in removal order.

4. 04Remove the fan, lifting its connector rather than pulling the wires.

5. 05Clean the fan with the blades held still, using air and a soft brush.

6. 06Clear the heatsink fins from the inside out and check the case exhaust vent for a dust mat.

7. 07Loosen the heatsink spring screws in the numbered diagonal sequence.

8. 08Clean both mating surfaces with 90%+ isopropyl alcohol on a lint-free cloth until shiny.

9. 09Apply a rice-grain-sized dot of paste to the centre of the die.

10. 10Refit the heatsink and tighten in diagonal sequence, a little at a time on each screw.

11. 11Reassemble in reverse order, clips before screws, battery connected last.

12. 12Boot the machine and confirm the fan spins, the exhaust blows warm air and the machine no longer throttles.

13. 13Record idle and load temperatures afterwards and write up the before-and-after difference.

The standard we hold you to

A fully reassembled laptop with every screw in its own hole, fan and heatsink visibly clean, paste replaced in the correct quantity, heatsink tightened in diagonal sequence, battery connected last, and a measured temperature drop of at least ten degrees under load documented as before-and-after evidence.

## Common mistakes and how to fix them

You drove a long screw into a short hole

Fix: Lay screws out in removal order and photograph first. A long screw in a short hole can crack the board, turning a fifty-minute cleaning into a written-off machine.

You spun the fan with compressed air

Fix: Hold the blades still while blowing. Free-spinning a fan with air can generate voltage in its motor and damage it, and it can overspeed the bearing.

You packed the dust further into the heatsink

Fix: Blow from the inside outward and lift compacted mats off with tweezers. Pushing a dust mat deeper only packs it tighter and blocks airflow completely.

You used far too much thermal paste

Fix: A rice-grain dot in the centre is enough — mounting pressure spreads it. Excess squeezes out over surrounding components and is messy even when the paste is non-conductive.

You spread the paste with a card or a finger

Fix: Do not. The heatsink's mounting pressure spreads a centred dot more evenly than you can by hand, and a finger transfers oil to the surface.

You tightened the heatsink screws one at a time

Fix: Tighten in the numbered diagonal sequence, a little on each at a time. Uneven pressure on a spring-loaded heatsink can crack the CPU die.

You forced a base cover that would not seat

Fix: Stop and look underneath — something is misaligned, usually a cable routed wrongly or a clip not engaged. Forcing it cracks the plastic.

You could not demonstrate the improvement

Fix: Record temperatures before and after. A repair you cannot evidence is a repair the customer takes on trust, and the evidence is what earns the referral.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Record temperatures before you touch anything, every time. The before-and-after figures are the only objective evidence that the cleaning helped, and showing a customer a twenty-degree drop does more for your reputation than any explanation.

- Loosen and tighten heatsink screws in the numbered diagonal sequence as an unbreakable habit. It feels slow the first few times and it is the difference between a repaired machine and a cracked die.

- Keep a syringe of decent thermal paste and a bottle of 90%+ isopropyl alcohol in your kit at all times. They are cheap, they are used on almost every cleaning job, and running out mid-job is unprofessional.

- Tell every customer to keep the laptop on a hard flat surface. Using it on a bed or a lap blocks the intake and is the main reason machines reclog quickly. Free advice, genuinely useful, and it is remembered.

## Key termsThermal throttlingA CPU reducing its clock speed to avoid overheating. The real cause of most 'slow old laptop' complaints.Thermal pasteThe compound filling microscopic gaps between the CPU and heatsink. Dries out over a few years and must be replaced.HeatsinkThe copper pipe and fin assembly carrying heat away from the CPU. Its fins are where dust mats form.Spring-loaded screwA heatsink screw on a spring, requiring diagonal tightening so pressure builds evenly across the die.Isopropyl alcoholA fast-evaporating solvent for cleaning paste and boards. Use 90% or higher and a lint-free cloth.Lint-free clothA cloth that sheds no fibres, such as a microfibre cloth or coffee filter. Cotton wool leaves fibres behind.Dust matCompacted felt-like dust blocking heatsink fins or an exhaust vent. Often the entire cause of overheating.Idle and load temperatureThe CPU temperature at rest and under work. The before-and-after evidence that a cleaning worked.

## Homework before the next session

Clean one real laptop end to end

Record temperatures first, clean and repaste, reassemble, and record again. Write up the before-and-after figures as if reporting to a customer.

Practise the diagonal screw sequence

Remove and refit a heatsink three times on a scrap machine until the diagonal sequence is automatic. This is a habit, not a step you look up.

Practise paste application

Apply paste on a scrap heatsink several times, checking how it spreads under pressure. Learn what a rice-grain dot becomes when compressed.

Advise a customer in writing

Write four lines explaining what caused the overheating, what you did, the temperature improvement, and how to delay recurrence. Reuse the format.

## Assessment rubric

How this session is marked. The certificate for Computer Repairs is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Disassembly | Opens the machine without breaking anything. | Battery disconnected first, photographs taken, screws in removal order, connectors lifted rather than pulled, and the manual consulted beforehand. |
| Cleaning | Removes visible dust. | Fan cleaned with blades held, fins cleared from inside out, exhaust vent checked, and no dust pushed deeper into the assembly. |
| Thermal paste | Applies new paste. | Both surfaces cleaned to shiny with 90%+ alcohol, a rice-grain dot applied, and the heatsink tightened in numbered diagonal sequence. |
| Reassembly | The machine goes back together. | Every screw in its own hole, clips engaged before screws, battery connected last, and the cover seated without force. |
| Evidence | The machine works afterwards. | Idle and load temperatures recorded before and after, throttling confirmed gone, and the improvement written up for the customer. |

## Session questionsHow often should a laptop be cleaned?+

Every eighteen months to two years in a dusty environment, sooner if it is used on a bed or a lap. The signs are a hot base, a loud fan, and slowness that appears under load and improves when the machine rests.What thermal paste should I buy?+

Any reputable brand paste is fine for this work — the difference between mid-range and premium pastes is a couple of degrees, far less than the difference between old crust and new paste. Buy a syringe rather than a single-use sachet so you are not caught out mid-job.Is too much thermal paste actually harmful?+

Most modern pastes are non-conductive, so excess is mainly messy rather than dangerous, but it can foul nearby components and makes the next service harder. A rice-grain dot is correct; the mounting pressure spreads it.Can I clean a laptop without opening it?+

Blowing air into the vents removes a little loose dust but cannot clear a compacted mat on the fins or replace dried paste, which is where most of the benefit is. It is a temporary measure at best and can pack dust tighter.What if the fan does not spin after reassembly?+

Check its connector first — it is small and easy to leave partially seated. Then check in the firmware or with a tool whether the fan is being detected. If the connector is firm and the fan still does not spin, the fan itself has failed and needs replacing.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Laptops, Safety & Identification](https://www.cea.ng/classes/computer-repairs/laptops-safety-identification)[Next session 4: Upgrades: RAM & Storage](https://www.cea.ng/classes/computer-repairs/upgrades-ram-storage)

Computer Repairs

4 weeks · 8 sessions · ₦50,000 · you leave with a diagnosed and serviced machine[See the full course](https://www.cea.ng/classes/computer-repairs)[Enrol now](https://www.cea.ng/admissions)
