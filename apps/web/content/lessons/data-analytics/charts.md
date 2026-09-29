---
title: "Session 5: Choosing & Building Charts"
description: "A chart is an argument, and most charts argue badly. This session covers choosing a chart from the question you are answering, building bar, line, pie and scatter charts properly, formatting so the finding is obvious, and recognising the specific ways charts mislead people."
date: "2026-09-12"
class_slug: "data-analytics"
---

A chart is an argument, and most charts argue badly. This session covers choosing a chart from the question you are answering, building bar, line, pie and scatter charts properly, formatting so the finding is obvious, and recognising the specific ways charts mislead people.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Choose a chart type from the question rather than the data

- Build bar, line, pie and scatter charts correctly

- Write titles that state the finding

- Remove everything that does not carry information

- Recognise truncated axes, 3D effects and misleading scales

- Know when a table is better than a chart

## The taught content

### Choose the chart from the question

Almost every chart problem starts with choosing the chart before deciding the question. Work backwards instead. **Comparison** — which state sells most? — is a **bar chart**. **Change over time** — is revenue growing? — is a **line chart**. **Part of a whole** — what share does each state hold? — is a percentage, and usually better as a bar than a pie. **Relationship** — does order size relate to margin? — is a **scatter plot**. **Distribution** — what is a typical order value? — is a **histogram**.

Notice what is missing: there is no question for which a 3D pie chart is the answer. Chart types are not decorative options, they are claims about the relationship in your data, and using the wrong one makes the reader do mental work that the chart was supposed to save.

And sometimes the answer is **no chart at all**. If you are comparing three precise figures that a reader needs to read exactly — this month's revenue for three states — a small table is better than a bar chart, because a chart makes you estimate a length while a table gives you the number. **Charts are for showing a pattern; tables are for reading a value.**

### Bar charts and line charts done properly

**Bar charts** compare quantities, and three rules make them work. **Sort them descending** — an unsorted bar chart forces the reader to hunt for the largest, which is the one thing they wanted to know. **Use horizontal bars when labels are long**, because product names rotated forty-five degrees are unreadable. And **start the axis at zero**, because a bar's length is its meaning; an axis starting at 30,000 makes a 5 per cent difference look like a doubling.

**Line charts** show change over time and are the right choice whenever the sequence matters — monthly revenue, cumulative orders. The x-axis must be **time or an ordered sequence**, never categories: a line connecting Lagos to Ogun to Oyo implies an order that does not exist and a trend that is meaningless. Keep to **two or three lines**, because more than that becomes a tangle nobody can follow.

The one line-chart habit worth drilling: **do not use a line for categories**. It is the single most common chart error in business reporting, and it manufactures a trend out of nothing. If the x-axis labels could be reordered without changing the meaning, you need bars.

### Pie charts, scatter plots and histograms

**Pie charts** are widely used and mostly misused, for a specific reason: **people compare angles and areas badly**. Given two slices at 28 and 32 per cent, almost nobody can tell which is larger, while the same two figures as bars are instantly comparable. If you must use a pie, keep it to **three slices at most**, order them largest first, and label them directly with percentages rather than relying on a legend.

In practice, **a sorted bar chart answers the same question better nearly every time**. The honest position is that a pie is acceptable for one simple share — **Lagos is 61 per cent of revenue** — and is the wrong tool for anything more complicated than that.

**Scatter plots** show whether two things move together, which is how you investigate relationships: order size against margin, delivery days against order value. Add a **trendline** and it shows the direction; the **R-squared** value tells you how much of the variation is explained, and a low R-squared means the apparent pattern is mostly noise. **Histograms** show distribution — how order values are spread — and this is the chart that reveals the skew we found, showing that most orders cluster low while a few are very large. No average can show that; a histogram shows it at a glance.

### Formatting: make the finding obvious

The title is the most wasted space on most charts. **Revenue by State** describes the chart; **Lagos drives 61 per cent of revenue** states the finding. A reader who only reads the title — and most will — should come away with the conclusion. If you cannot write a finding as the title, you do not yet know what the chart says.

Then remove what carries no information: the **legend** where direct labels would do, the **gridlines** where data labels are present, the **border** around the plot area, and any **3D effect** whatsoever. Each of these asks the reader to decode rather than see. **Label the bars directly** with their values, which removes the need to trace a bar to an axis and read a scale.

The test is simple: **can a reader get the point in five seconds without you explaining?** If they need you to talk them through it, the chart is not finished. That is not a low bar — it is the entire purpose of a chart, because the alternative to a chart that works is a reader who does not act.

### How charts mislead

Most misleading charts are not lies; they are carelessness that produces a false impression. The commonest is the **truncated axis** — starting a bar chart at something other than zero, which exaggerates small differences. On a line chart a truncated axis is often legitimate, because you are showing change rather than magnitude; on a bar chart it is almost always misleading, because the bar's length is the message.

Then **dual axes**, where two series with different scales share a chart. They can be legitimate, but they invite the reader to see a relationship between two lines that cross by coincidence, and **they crossed** is very often read as **one caused the other**. If you use two axes, label them clearly and say explicitly that the crossing is not a finding.

The rest are familiar: **3D effects**, which distort the apparent size of slices and bars for no informational gain; **inconsistent scales** between two charts shown side by side, which makes an unchanged value look like growth; **cherry-picked periods**, where a start date is chosen to make a trend look stronger than it is; and **pies with eight slices**, where no comparison is possible at all. None of these require dishonest intent, which is exactly why you need to check for them in your own work before someone else does.

## Instructor demonstration

The instructor takes the pivot tables from the last session and builds the chart for each question, showing the same data presented well and badly — unsorted versus sorted, truncated versus zero-based axis, pie versus bar, 3D versus flat, descriptive versus finding title — so the class can see exactly what each choice costs.

### State the question before choosing a chart

Write which state sells most on the board. Explain that the question determines the chart, and choosing the chart first is where most bad charts start.02

### Build a bar chart of revenue by state, unsorted

Show the reader hunting for the largest. Explain that an unsorted bar chart hides the one thing the reader wanted to know.03

### Sort it descending

Show how much faster it reads. Explain that sorting is the single cheapest improvement available on any bar chart.04

### Truncate the axis at 30,000

Show a small difference become dramatic. Explain that a bar's length is its meaning, so a bar axis must start at zero.05

### Reset the axis to zero and compare

Explain the exception: a truncated axis on a line chart can be legitimate because you are showing change, not magnitude.06

### Turn the same data into a line chart

Explain why this is wrong: the states have no order, so the line implies a trend that does not exist.07

### Build a proper line chart of monthly revenue

Time on the x-axis. Explain that a line is right when the sequence is real and the reader cares about direction.08

### Add a second and third line

Show it stay readable at three and tangle at six. Explain that more than three lines stops being a chart and becomes decoration.09

### Build a pie of state share with all three states

Ask the class to compare the two smaller slices. Explain that people compare angles badly, which is the whole problem with pies.10

### Show the same share as a sorted bar

Explain that a bar answers the same question better nearly every time, and that a pie is acceptable only for one simple share.11

### Add 3D to the pie

Show the apparent sizes change. Explain that 3D distorts for no informational gain and there is no case for it.12

### Build a scatter of order value against margin

Add a trendline and read the R-squared. Explain that a low R-squared means the apparent pattern is mostly noise.13

### Build a histogram of order values

Show the cluster of small orders and the tail of large ones. Explain that this reveals the skew no average could show.14

### Retitle a chart from description to finding

Change Revenue by State to Lagos drives 61 per cent of revenue. Explain that a reader who only reads the title should still get the conclusion.15

### Replace the legend with direct labels

Remove gridlines and the plot border. Explain that each removal takes the reader from decoding to seeing.16

### Show two charts with inconsistent scales

Explain that side-by-side charts on different scales make an unchanged value look like growth.17

### Show a cherry-picked start date

Move the start month and watch the trend steepen. Explain that the choice of period is an argument and should be defensible.18

### Decide where a table is better

Show three precise figures the reader must read exactly. Explain that charts show patterns while tables give values, and picking wrong wastes both.

## Guided practice

### Chart the findings, then break them on purpose

You build one chart per finding from your pivot tables, each chosen from its question and formatted so the point is obvious in five seconds — then you deliberately produce four misleading versions of your own charts and explain what each one distorts.

1. 01Write the five findings from the last session as one-sentence questions.

2. 02For each finding, name the question type: comparison, change, share, relationship or distribution.

3. 03Choose the chart type from the question and write down which you chose and why.

4. 04Build revenue by state as a bar chart, sorted descending.

5. 05Set the axis to start at zero and confirm the bar lengths are honest.

6. 06Label the bars directly and remove the legend, gridlines and plot border.

7. 07Build monthly revenue as a line chart with time on the x-axis.

8. 08Add a second series and confirm the chart is still readable.

9. 09Build state share as a sorted bar rather than a pie, and say why.

10. 10Build a scatter of order value against margin with a trendline and note the R-squared.

11. 11Build a histogram of order values and describe the skew it shows.

12. 12Give every chart a title that states the finding rather than describing the data.

13. 13Check each chart passes the five-second test with someone else.

14. 14Now break one chart by truncating the axis, and describe the distortion.

15. 15Break another by turning it into a line across categories, and describe what it falsely implies.

16. 16Break another by adding 3D, and describe what changes visually.

17. 17Break a fourth by changing the start period, and describe how the trend appears to change.

18. 18Identify one finding that is better shown as a small table, and build that instead.

The standard we hold you to

Five findings each expressed as a one-sentence question with its question type named and the chart type chosen from it and justified; revenue by state as a bar chart sorted descending on a zero-based axis with direct labels and no legend, gridlines or plot border; monthly revenue as a line chart with time on the x-axis and a readable second series; state share as a sorted bar with the reason it was preferred to a pie stated; a scatter of order value against margin with a trendline and the R-squared noted; a histogram of order values with the skew described; every title stating the finding rather than describing the data; each chart confirmed to pass a five-second test with another person; four deliberately misleading versions produced by truncating an axis, drawing a line across categories, adding 3D and shifting the start period, each with its distortion explained; and one finding presented as a small table with the reason a chart was not used.

## Common mistakes and how to fix them

You choose the chart before deciding the question

Fix: Name the question first: comparison, change, share, relationship or distribution. The question determines the chart, and picking a chart first is where most bad charts begin.

Your bar chart is not sorted

Fix: Sort descending. An unsorted chart makes the reader hunt for the largest bar, which is the single thing they wanted to know.

Your bar axis does not start at zero

Fix: Reset it. A bar's length is its meaning, so truncating the axis exaggerates small differences into apparent doublings.

You drew a line across categories

Fix: Use bars. A line implies order and trend, so connecting Lagos to Ogun to Oyo manufactures a pattern that does not exist.

You used a pie with many slices

Fix: Use a sorted bar. People compare angles and areas badly, so slices at 28 and 32 per cent are indistinguishable while bars are instant.

You added 3D to make it look better

Fix: Remove it. 3D distorts apparent size for no informational gain, and there is no chart where it improves the reading.

Your title describes the chart instead of the finding

Fix: State the conclusion: Lagos drives 61 per cent of revenue, not Revenue by State. Most readers read only the title, so it must carry the point.

You charted figures the reader needed to read exactly

Fix: Use a small table. A chart makes the reader estimate a length while a table gives the number — charts show patterns, tables give values.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Name the question before you touch the chart menu. Comparison, change, share, relationship or distribution — the answer determines the chart type, and almost every bad chart began with the reverse order.

- Sort every bar chart descending and start the axis at zero. These two changes cost ten seconds and remove the two most common ways a bar chart wastes a reader's attention or distorts the difference.

- Put the finding in the title. Most readers read nothing else, so Revenue by State reaches nobody while Lagos drives 61 per cent of revenue reaches everyone — and if you cannot write that title, you do not yet know what the chart says.

- Check your own charts for the misleading patterns before anyone else does. Truncated axes, lines across categories, 3D, inconsistent scales and cherry-picked periods are usually carelessness rather than dishonesty, which is exactly why they survive into reports.

## Key termsBar chartCompares quantities. Sort descending, use horizontal bars for long labels, start the axis at zero.Line chartShows change over an ordered sequence. Wrong for categories, because it implies a trend that does not exist.Pie chartShows a share of a whole. Acceptable for one simple share with three slices at most; a sorted bar is usually better.Scatter plotShows whether two variables move together. A trendline gives direction and R-squared says how much is explained.HistogramShows distribution. The chart that reveals skew, which no average can show.Truncated axisAn axis not starting at zero. Misleading on bar charts, sometimes legitimate on line charts showing change.ChartjunkAnything on a chart that carries no information: 3D, borders, redundant gridlines, legends where labels would do.Five-second testWhether a reader gets the point in five seconds without explanation. The actual purpose of a chart.

## Homework before the next session

Rebuild one existing chart from a question

Take a chart from a report you have seen, state the question it was answering, and rebuild it with the chart type that question calls for. Note what changed.

Sort, zero and label one bar chart

Descending order, axis from zero, direct labels, no legend or gridlines. Time the difference in how fast it reads.

Rewrite five chart titles as findings

Turn each description into a conclusion. If you cannot, the chart is not telling you anything yet and needs a different question.

Find a misleading chart in the wild

News, social media, a work report. Identify the specific device — truncated axis, 3D, dual axes, cherry-picked period — and redraw it honestly.

## Assessment rubric

How this session is marked. The certificate for Data Analytics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| Chart selection | Uses an appropriate chart. | Every chart chosen from a named question type with the reasoning stated, including at least one finding deliberately presented as a table because a chart was worse. |
| Construction | Charts render correctly. | Bars sorted descending on a zero-based axis, lines used only on genuine sequences with three series or fewer, and scatter and histogram used for relationship and distribution. |
| Formatting | Charts are labelled. | Titles stating findings, direct labels replacing the legend, chartjunk removed, and each chart confirmed to pass a five-second test with another person. |
| Awareness of distortion | Avoids obvious errors. | Four deliberately misleading versions produced by truncating an axis, drawing a line across categories, adding 3D and shifting the period, each with its distortion explained. |
| Honesty | Charts are accurate. | R-squared read and low values reported as noise, skew described from a histogram rather than an average, and period choices made defensibly rather than flatteringly. |

## Session questionsAre pie charts really that bad?+

They are fine for one simple share and poor for almost everything else, for a specific reason: people compare angles and areas badly, so slices at 28 and 32 per cent are indistinguishable. A sorted bar answers the same question instantly. Three slices maximum if you use one.When is it acceptable to not start the axis at zero?+

On a line chart showing change over time, where the reader cares about direction rather than magnitude. On a bar chart, essentially never — the length of the bar is the message, so truncating the axis turns a small difference into an apparent doubling.How do I write a good chart title?+

State the finding, not the contents. Lagos drives 61 per cent of revenue tells the reader the conclusion; Revenue by State tells them nothing they could not see. If you cannot write a finding as the title, the chart is not yet telling you anything.My scatter plot shows a pattern. Does that mean one thing causes the other?+

No. Check the R-squared first — a low value means the apparent pattern is mostly noise. And even a strong relationship only shows that two things move together, never that one causes the other. That distinction is the subject of the reading-numbers session.Should every finding be a chart?+

No. If a reader needs to read precise values — three states, three exact figures — a small table is better, because a chart makes them estimate a length. Charts show patterns; tables give values. Picking the wrong one wastes both.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session4: Pivot Tables & Summaries](https://www.cea.ng/classes/data-analytics/pivot-tables-summaries)[Next session 6: Dashboards](https://www.cea.ng/classes/data-analytics/dashboards)

Data Analytics

4 weeks · 8 sessions · ₦50,000 · you leave with a dashboard and an analysis note[See the full course](https://www.cea.ng/classes/data-analytics)[Enrol now](https://www.cea.ng/admissions)
