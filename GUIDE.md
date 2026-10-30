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

## Add photos and diagrams to a chapter (phone-friendly)

1. Open the chapter on your live site and scroll to **Add a photo to this chapter**.
2. Upload your image to the repository's `media` folder: open the repository in GitHub, tap **Add file → Upload files**, choose the photo, and commit it. If the folder is not listed, use a path such as `media/orion-nebula.jpg` when adding the file.
3. In the chapter's photo helper, enter the path (for example `media/orion-nebula.jpg`), a useful image description, and an optional caption/credit. Tap **Create image markup**, then **Copy markup**.
4. Open [Pages CMS](https://app.pagescms.org/) → **Astronomy Chapters** → choose the chapter. Paste the generated markup into **Chapter text** if the editor accepts it, then save/commit.
5. If Pages CMS strips or displays the markup as plain text, edit `content/chapters.json` directly in GitHub and place the generated markup in the chapter's `body` string. Keep the JSON valid; don't add unescaped line breaks inside the string.
6. Wait for GitHub Pages to redeploy and check the chapter on your phone.

Use images you created or have permission to reuse. Keep the source and license in the chapter references. The site displays chapter images responsively. Use relative paths like `media/orion-nebula.jpg` rather than paths beginning with `/media/`, because this is a project site under `/Cosmic-Atlas/`.

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


## Accounts, profiles, discussions, and chapter comments
The static website uses Supabase for hosted authentication and database features. GitHub Pages still serves the site files; Supabase stores accounts, public profiles, discussions, and comments.

### One-time setup (site owner)
1. Create a free project at https://supabase.com/ and open its project dashboard.
2. In **Project Settings → API** (or **Connect**), copy the project URL and the **publishable key** (or legacy anon key). Put those into `supabase-config.js`. Never use the `service_role` key in browser code.
3. Open **SQL Editor**, paste the contents of `supabase-schema.sql`, and run it.
4. In **Authentication → URL Configuration**, add the exact published website URL to the allowed site/redirect URLs. For a GitHub Pages project site, it may look like `https://qusai705.github.io/Cosmic-Atlas/`; use the actual URL shown in repository Pages settings.
5. In **Authentication → Sign In / Providers**, enable GitHub. Create a GitHub OAuth App under GitHub Settings → Developer settings → OAuth Apps. Use the Supabase GitHub callback URL shown on the provider page as the OAuth callback, then paste the OAuth Client ID and Client Secret into Supabase. Keep the Client Secret only in Supabase, never in this repository.
6. In Supabase email authentication settings, keep email confirmation enabled. The default email service may have strict sending limits; for public launch, review Supabase's current email delivery guidance.
7. Enable GitHub Pages in repository Settings → Pages if it is not already enabled, then wait for deployment and test signup, email confirmation, sign-in, GitHub sign-in, profile editing, posting, and comments.

### What the new files do
- `account.html` and `account.js`: email/password signup and sign-in, GitHub OAuth, editable username and bio.
- `community.html` and `community.js`: public discussion feed, authenticated posting and replies, and chapter-specific discussion links.
- `supabase-config.js`: public project URL and publishable key placeholders.
- `supabase-schema.sql`: tables and row-level security policies for profiles, discussions, and comments.

The code is committed but cannot work fully until the Supabase project is created and configured. Do not publish private keys or user data in GitHub. Add moderation/reporting procedures before inviting a large public audience.
