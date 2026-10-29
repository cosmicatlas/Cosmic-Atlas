# Cosmic Atlas: Setup Guide (Android only, ₹0)

## 1. How the site is organized
- `index.html` homepage. `big-bang.html` Chapter 2. `glossary.html`, `community.html`.
- `data.js` is the ONE file you edit weekly: chapter list, glossary, search, menu, and previous/next links all come from it.
- `template.html` is a blank chapter. Copy it for each new chapter.
- `style.css` design. `app.js` menu, search, table of contents, reading time (all automatic).
- Everything is plain HTML/CSS/JS: no database, no paid service, and it works even offline.

Chapter numbers follow your 29-chapter outline, so the first chapter (as you titled it) is listed as Chapter 2. Chapter 1 is a good next one to write.

## 2. Free tools
- **Hosting:** GitHub Pages (free). **Editor:** the github.com web editor in Chrome (menu → "Desktop site"). Optional: the Acode app for editing locally.
- **You do not need to learn Git.** You only use buttons: Add file → Upload files / Create new file, pencil icon to edit, Commit changes.
- **Limits:** GitHub Pages has storage/build limits and isn't allowed as free hosting for a site primarily meant for commercial transactions or an online business. See "Money" below.

## 3. Publish from your phone
1. Open this repository: https://github.com/Qusai705/Cosmic-Atlas
2. Settings → Pages → Source: "Deploy from a branch", Branch: `main`, folder `/(root)`. Save.
3. After a minute or two, check https://Qusai705.github.io/Cosmic-Atlas/
4. Open the site and test the homepage, chapter, glossary, and community links.

## 4. Preview before publishing
Open `index.html` from your phone's files in Chrome. Everything works offline. Check on your phone, then upload.

## 5. Add a chapter each week
1. Copy `template.html` → rename it (e.g. `inflation.html`) → set `data-ch="4"` and the title → write.
2. In `data.js`, add one line inside `LIVE`:
   `4:{file:"inflation.html",sum:"One-sentence summary for search."},`
   (Put a comma after the previous entry.) Add new glossary terms in `GLOSSARY` if needed.
3. Create/upload the new file and commit both. Menu, search, contents, and previous/next update automatically.

## 6. Community (GitHub Discussions)
1. Repo → Settings → General → Features → enable **Discussions**.
2. Open Discussions → pencil by Categories → create these 8 categories: Cosmology; Black Holes and Relativity; Stars and Galaxies; Planetary Science; Theoretical Ideas; Questions and Learning; Astronomy News and Discoveries; Observations and Astrophotography. Set Q&A format for Questions and Learning.
3. Pin a "Community guidelines" post (copy from the Community page).
4. Since the owner is under 18, ask a trusted adult (parent, teacher, or astronomy-club mentor) to help moderate. Agree on a rule: threats, personal-information sharing, or anything dangerous goes to the adult, not you.
5. Phase 2: only if the community grows, add reputation/extra tools. If GitHub is down, the encyclopedia still works.

## 7. Money (later; promise nothing)
- Advertising and payment services usually have age and eligibility rules. An adult guardian may need to own those accounts. Read each service's current terms.
- GitHub Pages disallows sites mainly for commercial transactions. If you add ads or sponsors, check the terms first, or move the same files to another suitable static host.
- Keep ads and sponsors clearly labeled and never let them change the science. Nothing guarantees income.

## 8. Weekly checklist (30–60 min)
- [ ] Pick one topic
- [ ] Draft one section from the template
- [ ] Label each claim: Observed / Established theory / Hypothesis / Open question
- [ ] Check every number and reference against the source; open every link
- [ ] Add the chapter line in `data.js`
- [ ] Preview on phone; test menu, search, table of contents
- [ ] Upload and commit; check the live site
- [ ] Check community reports with your adult moderator

## 9. Six-month roadmap
- **Month 1:** Chapters 1, 3, 4 (inflation, labeled as hypothesis), 5. Add 15 glossary terms.
- **Month 2:** Part II: Chapters 6–10. Launch Community.
- **Month 3:** Part III: Chapters 11–13 and a "How we check facts" page.
- **Month 4:** Chapters 14–15 and 16–17. Add one simple diagram per chapter.
- **Month 5:** Chapters 18–20.
- **Month 6:** Review and correct old chapters, add a corrections page, then consider Part V and ads/sponsor policy.
Skipping a week is fine. Quality and accuracy matter more than speed.
