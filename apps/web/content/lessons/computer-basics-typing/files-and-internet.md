---
title: "Session 3: Files & Internet"
description: "Losing work because you cannot find it is the most common and most avoidable failure in computing. This session builds a file system you can navigate in the dark, then covers the browser, searching properly, and downloading without breaking anything."
date: "2026-09-13"
class_slug: "computer-basics-typing"
---

Losing work because you cannot find it is the most common and most avoidable failure in computing. This session builds a file system you can navigate in the dark, then covers the browser, searching properly, and downloading without breaking anything.


## Learning objectives

By the end of this session you will be able to do each of these without prompting.

- Explain the difference between a file and a folder, and how paths describe location

- Create, rename, move, copy and delete files and folders deliberately

- Recover a deleted file from the Recycle Bin and understand what deleting really does

- Use a USB drive correctly, including ejecting it safely

- Navigate a browser: address bar, tabs, back, refresh, bookmarks and history

- Search the internet effectively instead of typing whole questions

- Download a file safely and recognise an unsafe download

- Upload a file to a website and know what uploading means

## The taught content

### Files, folders and paths

A **file** is a single stored item: a document, a photo, a song, a program. A **folder** (also called a directory) is a container that holds files and other folders, which is what lets you organise rather than pile. Every file has a **name** and an **extension** — the part after the last dot — and the extension tells Windows what kind of file it is: .docx is a Word document, .xlsx a spreadsheet, .pdf a fixed-layout document, .jpg and .png images, .mp4 video, .mp3 audio, .zip a compressed archive. Windows often hides extensions by default, which is why two files can look identical and behave differently. Turn them on: File Explorer → View → Show → File name extensions.

A **path** is a file's full address, shown in the address bar at the top of File Explorer: `C:\Users\YourName\Documents\CEA\notes.docx`. Read it left to right as a set of nested folders ending in the file. The important drives are **C:** where Windows and your programs live, and whatever letter Windows assigns to an inserted USB drive — usually D: or E:. Understanding paths is what stops the panic of 'I saved it but I cannot find it', because you can always look at the address bar and know exactly where you are.

### The five file operations

**Create** a folder with Ctrl+Shift+N inside File Explorer, or right-click → New → Folder. Name it immediately — 'New folder' is how work gets lost. **Rename** with F2 on a selected item, or right-click → Rename; never rename by deleting and retyping the whole name, because F2 lets you edit just the part you want. **Move** by cutting (Ctrl+X) and pasting (Ctrl+V) into the destination, or by dragging. **Copy** with Ctrl+C then Ctrl+V leaves the original in place and puts a duplicate at the destination — and be careful, because copying instead of moving is how you end up with two versions and edit the wrong one.

**Delete** sends an item to the **Recycle Bin**, where it stays until you empty the bin. This is your safety net: right-click the Recycle Bin → Open, find the item, right-click → Restore, and it returns to its original folder. Note the important exception — files deleted from a USB drive, or deleted with Shift+Delete, bypass the Recycle Bin entirely and are gone immediately. And understand what deleting really does: it removes the pointer to the file, not necessarily the data, which is why 'deleted' files can sometimes be recovered and why you should never assume a sensitive file is truly erased just because you deleted it.

### Naming: the habit that saves hours

Name files so a stranger could understand them in six months and so they sort correctly. The pattern that works: **date, then subject, then version** — `2026-09-13_CEA-Notes_Session-03.docx`. Dates first in YYYY-MM-DD format sort chronologically in every file manager; putting the day first sorts September after January incorrectly. Avoid spaces if you can, because some websites and systems mangle them in uploads. Never use the characters `\ / : * ? " < > |` — Windows forbids them and other systems handle them badly.

Then avoid the version-naming trap. `final.docx`, `final2.docx`, `final-FINAL.docx` and `final-real.docx` tell nobody anything. Either use dates, or use v1/v2/v3 consistently, and keep only one current version in the working folder with older ones moved to an `Archive` sub-folder. Build the structure once — a top folder for the year or course, with sub-folders by subject — and use it every single time. A file saved in the right place the first time is a file you never have to search for.

### USB drives and downloads

Plug a USB drive in and Windows assigns it a letter and usually announces it. Open File Explorer, find the drive, and copy files to or from it like any other folder. The critical step is **ejecting before removal**: click the USB icon in the taskbar notification area and choose Eject, wait for the confirmation, then pull it out. Windows caches writes in memory, so a copy that appears finished may not have reached the drive yet — pulling early is how files arrive corrupted or missing. If Windows says the drive is in use, close whatever program is touching it rather than forcing removal.

**Downloading** is copying a file from the internet to your machine; the browser puts it in your Downloads folder by default and shows progress at the top or bottom of the window. Download safely by checking three things before you click: is the site the one you intended (look at the address, not the page design), does the link say what you expect, and does the file extension match what you asked for. A file you wanted as .pdf arriving as .exe or .zip is a warning — executables run code on your machine, and that is how malware arrives. Never download from a pop-up you did not ask for, and treat any file that arrives as an attachment from someone you do not know as hostile until proven otherwise.

**Uploading** is the reverse: sending a file from your machine to a website. Every upload control works the same way — click Choose File or Browse, navigate to the file, select it, then confirm. Know your file sizes, because Nigerian mobile data is expensive and many services reject files above a limit. If a form rejects your upload, the cause is almost always size or format, and the fix is to compress the file or export it in an accepted format.

### The browser and searching properly

A **browser** is the program that displays websites — Chrome, Edge, Firefox, Safari, Opera. Know its parts. The **address bar** at the top shows where you are and is where you type a web address; it is also the search box in modern browsers. **Tabs** let you hold several pages at once — Ctrl+T opens one, Ctrl+W closes it, Ctrl+Tab switches, and Ctrl+Shift+T reopens one you closed by accident. **Back** and **Forward** move through your history, **Refresh** (F5) reloads the current page, and the **bookmark** or star icon saves a page so you can return without searching again. Your **history** (Ctrl+H) lists everywhere you have been, which is how you find a page you read yesterday and did not save.

Then the skill most people never learn: searching. A search engine is a keyword matcher, not a person, so typing 'please how can I find out what time the CEA class starts on Saturday' works worse than `CEA Port Harcourt class timetable`. Use specific nouns, drop the polite filler, add a location or a year when it matters, and put an exact phrase in quotation marks. Add `-` before a word to exclude it. If the first page of results is unhelpful, change your words rather than scrolling — the tenth result for a bad query is worse than the first result for a better one. And when you need something from an official source, search for the organisation's name and go to its own site rather than trusting a third-party page that may be outdated.

## Instructor demonstration

The instructor builds a folder structure live, deliberately loses a file and recovers it, then demonstrates a safe download and a search that gets refined three times.

### Turn on file extensions

File Explorer → View → Show → tick File name extensions. Show a .docx and a .pdf with the same base name and explain why hiding extensions causes confusion.02

### Build a folder structure

In Documents, create CEA-2026, then inside it Week-01 and Week-02. Narrate the naming pattern — date, subject, version — as each folder is created.03

### Create, rename and move files

Create three text files in Week-01. Use F2 to rename one, changing only part of the name. Cut and paste one into Week-02. Copy another so a duplicate exists, and point out the danger of having two versions.04

### Delete and recover

Delete a file, open the Recycle Bin, restore it, and show that it returned to its original folder. Then explain that Shift+Delete and USB deletions skip the bin entirely.05

### Read a path aloud

Click into a nested file and read the address bar left to right, naming each level. Then click each part of the address bar to jump up a level.06

### Use a USB drive correctly

Insert the drive, note the letter Windows assigns, copy a file onto it, then eject from the notification area and wait for the confirmation before removal. Show what Windows says if you try to eject while a file is open.07

### Browser basics

Open three tabs with Ctrl+T, switch with Ctrl+Tab, close one with Ctrl+W and reopen it with Ctrl+Shift+T. Bookmark a page, then find it again through Ctrl+H history.08

### Refine a search three times

Search a vague question and show the poor results. Strip it to keywords, then add a year, then add an exact phrase in quotes. Compare the first results at each stage and discuss what changed.09

### Download safely

Download a real PDF from an official site, checking the address first. Then show what a suspicious download looks like — a .exe offered where a document was promised — and explain why that is refused.10

### Upload a file

Use a form's Choose File control to select and upload the downloaded PDF. Show where the file size is displayed and explain the common rejection reasons.

## Guided practice

### Find it, fix it, fetch it

A timed practical: build a folder structure, deliberately lose and recover a file, transfer files via USB with correct ejection, then find and download three specific pieces of information from the internet using refined searches.

1. 01In Documents, create CEA-2026 with Week-01 and Week-02 sub-folders.

2. 02Create five text files in Week-01 named with the date-subject-version pattern.

3. 03Move two to Week-02 and copy one back, then delete the copy.

4. 04Delete one file permanently to the Recycle Bin, then restore it.

5. 05Copy two files to a USB drive and eject it safely before removal.

6. 06Open three browser tabs and find: the current exchange rate from an official source, the opening hours of a named Port Harcourt business, and one news item from today.

7. 07Write down the search terms you actually used for each, including any you abandoned.

8. 08Download one PDF from an official site, checking the address before clicking.

9. 09Upload that PDF back to any form that accepts a file, and confirm it succeeded.

10. 10Save your search notes into your Week-02 folder.

The standard we hold you to

Every file correctly named and located, the deleted file recovered without help, the USB ejected safely, all three pieces of information found from credible sources within the time limit, and the search notes show at least one query that was refined rather than repeated.

## Common mistakes and how to fix them

You saved a file and now cannot find it

Fix: Look at the address bar of the folder you are in, or use File Explorer's search box. In future, check the location shown in the Save dialog before clicking Save — most 'lost' files are sitting in Downloads or on the Desktop.

You have two versions of a file and do not know which is current

Fix: This is the copy-instead-of-move problem. Sort by Date modified, keep the newest, move older versions into an Archive folder, and use dates in filenames so the ordering is visible without opening anything.

You pulled a USB drive out and the files are missing or corrupted

Fix: You removed it before the cached writes reached the drive. Always eject from the notification area and wait for the confirmation. If the drive now asks to be formatted, do not format it — try it in another machine first.

Your searches return nothing useful

Fix: You are typing a sentence. Strip it to specific keywords, add a year or a location, and put exact phrases in quotes. If results are still poor, change your vocabulary — different people call the same thing different names.

You downloaded something and your machine started behaving oddly

Fix: You ran an executable you did not intend to. Do not click anything else in the window. Disconnect from the internet, then run a scan with Windows Defender (Start → search 'Virus & threat protection'). Session four covers this in full.

An upload keeps failing

Fix: Almost always size or format. Check the file size against the site's stated limit, and check the accepted extensions. A photo straight from a phone is often 5–10MB when the limit is 2MB — compress or resize it rather than retrying.

## Expert notes

The habits that separate someone who can do this from someone who does it well.

- Adopt one folder structure and never deviate from it. The structure matters less than the consistency: if you always know where a file belongs, you never have to decide, and you never have to search. Most people's file chaos is not a system failure, it is a habit failure.

- Search with the vocabulary of the person who wrote the answer, not your own. If you are looking for a Nigerian government process, use the official term rather than how you would describe it to a friend — and add the year, because procedures change and old pages stay online forever.

- Bookmarked is better than remembered, and written down is better than bookmarked. Keep a single text file of the addresses you use weekly; bookmarks get lost when you switch browsers or machines, and a text file can be copied anywhere.

- Check the address bar before you trust a page, not the page's appearance. A convincing design proves nothing. The address is the only thing on a webpage that is hard to fake, and reading it takes two seconds.

## Key termsFile extensionThe letters after the last dot in a filename, identifying the file type. Turn them on in File Explorer's View menu.PathA file's full address showing every folder from the drive down to the file, displayed in the address bar.Recycle BinWhere deleted files wait until the bin is emptied. Files deleted from USB drives or with Shift+Delete skip it entirely.EjectTelling Windows to finish writing and release a removable drive so it can be removed without corrupting files.DownloadCopying a file from the internet to your machine, normally into the Downloads folder.UploadSending a file from your machine to a website through a Choose File or Browse control.TabAn additional page held open in the same browser window. Ctrl+T opens, Ctrl+W closes, Ctrl+Shift+T reopens.Search queryThe words you give a search engine. Specific keywords outperform full sentences every time.

## Homework before the next session

Build your permanent folder structure

Create the folder tree you will actually use for the next year — by year or course, then by subject — and move your existing loose files into it. Report how many files you had sitting on the Desktop.

Rename twenty files properly

Take twenty badly named files and rename them with the date-subject-version pattern using F2. Note how much faster finding things becomes.

Practise three refined searches

Pick three questions you genuinely need answers to. For each, write your first search, the result quality, and the refined search that worked. Bring the comparisons to class.

Download and upload a real file

Download a document from an official source, verify its size and extension, then upload it somewhere that accepts files. Confirm both directions worked before you finish.

## Assessment rubric

How this session is marked. The certificate for Typing & Computer Basics is awarded on the deliverable, not on attendance.

| Criterion | Passing | Excellent |
| --- | --- | --- |
| File management | Creates, renames, moves, copies and deletes correctly. | Uses a consistent naming pattern, understands paths, and recovers a deleted file from the Recycle Bin unaided. |
| Removable media | Transfers files to and from a USB drive. | Ejects safely every time and can explain why premature removal corrupts files. |
| Browser control | Opens, switches and closes tabs; uses back, refresh and bookmarks. | Uses keyboard tab control, history and bookmarks as a working system rather than by accident. |
| Searching | Finds the requested information. | Demonstrably refines queries, uses quotes and exclusions, and judges source credibility rather than taking the first result. |
| Safe downloading | Downloads a file and locates it afterwards. | Checks the address and the file extension before downloading and can identify a suspicious download. |

## Session questionsI deleted something important and emptied the Recycle Bin. Is it gone?+

Not necessarily. Deleting removes the pointer, not always the data, so recovery software can sometimes retrieve it — but only if you stop writing to that disk immediately, because new data overwrites the space. Stop using the machine and ask for help rather than installing several recovery tools and making it worse.Why does Windows hide file extensions?+

To make filenames look cleaner, on the assumption that the icon already tells you the type. It is a convenience that costs you information, and it is genuinely dangerous because it lets a file called invoice.pdf.exe appear as invoice.pdf. Turn extensions on and leave them on.Which browser should I use?+

Whichever one you will keep updated. Chrome, Edge and Firefox are all fine and all free. What matters more is that you update it, do not install random extensions, and know how to use tabs, bookmarks and history — those skills are identical in every browser.How do I know a website is genuine?+

Read the address, not the design. Check that the domain is the organisation's real one and not a near-miss spelling, that it begins with https, and that there is no strange text before or after the real name. A padlock icon means the connection is encrypted; it does not mean the site is trustworthy. Session four goes through this properly.My Downloads folder is full of things I do not recognise+

Normal — every browser download lands there and nobody cleans it. Sort by date, delete what you do not need, and move what you do into your proper folder structure. Make it a monthly habit; an unmanaged Downloads folder is where people lose files and where unwanted programs hide.Last reviewed: 2026-09-12By Cyber Elias Academy faculty[Previous session2: Keyboard & Mouse](https://www.cea.ng/classes/computer-basics-typing/keyboard-and-mouse)[Next session 4: Digital Independence](https://www.cea.ng/classes/computer-basics-typing/digital-independence)

Typing & Computer Basics

2 weeks · 4 sessions · ₦20,000 · you leave with demonstrated independence[See the full course](https://www.cea.ng/classes/computer-basics-typing)[Enrol now](https://www.cea.ng/admissions)
