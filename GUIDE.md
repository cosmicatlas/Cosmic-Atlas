# Cosmic Atlas — Writing Guide (Android, free)

## This is your writing project
The site contains a chapter outline and a blank writing draft, not finished astronomy articles. You choose the topic, research it, write it in your own words, and publish only when you are ready. There is no weekly deadline.

## Files
- `index.html`: homepage and chapter roadmap.
- `big-bang.html`: your current Chapter 2 draft with prompts to replace.
- `template.html`: copy this to start a new chapter.
- `data.js`: chapter outline, published chapter list, and your glossary.
- `app.js`: navigation, search, and page behavior. Usually you do not need to edit this.
- `style.css`: visual design.

## Write from your phone
1. Open https://github.com/Qusai705/Cosmic-Atlas in your browser.
2. Open the file you want to edit.
3. Tap the pencil icon to edit. If needed, use the browser menu and select Desktop site.
4. Replace the prompts with your own writing, then commit the changes.
5. Check the site on your phone.

You can also copy `template.html` into a new file for a chapter. Change the title and `data-ch` number, then write your sections.

## Publish a chapter when it is ready
In `data.js`, add an entry to `LIVE` for a completed chapter. Example:
```js
var LIVE={
  2:{file:"big-bang.html",sum:"A short summary written by you."}
};
```
If you have not published any chapters yet, keep it as `var LIVE={};`. A chapter appears in the navigation/search as published only after you add it here.

## Build your own glossary
Add entries you have researched to `GLOSSARY`, like this:
```js
var GLOSSARY=[
  ["Your term","A definition in your own words.",2]
];
```
Use a chapter number when it is relevant, or 0 if it does not link to a chapter.

## Research checklist
- Write in your own words.
- Check scientific claims against reliable sources, ideally scientific institutions or peer-reviewed research.
- Keep a list of sources you actually read.
- Label observations, established explanations, hypotheses, and open questions accurately.
- If evidence is uncertain, say so. It is fine to leave questions unanswered.
- Revise and correct chapters over time; quality matters more than speed.

## Community
Community discussions use GitHub Discussions. Enable it in repository Settings → General → Features. Set up the categories listed on the Community page. Ask a trusted adult to help moderate if the community becomes active.

## Hosting and future plans
GitHub Pages can host the static site for free. If you later consider ads or sponsorships, check the current hosting rules and the terms of any advertising service first; don't assume revenue is guaranteed.
