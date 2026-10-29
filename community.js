import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const url = window.COSMIC_SUPABASE_URL || "";
const key = window.COSMIC_SUPABASE_KEY || "";
const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && key && !key.includes("YOUR_");
const root = document.getElementById("community-app");
const status = document.getElementById("community-status");
const form = document.getElementById("discussion-form");
const chapterNumber = Number(new URLSearchParams(location.search).get("chapter")) || null;
let supabase, currentUser = null;
function say(text, bad = false) { status.textContent = text; status.style.color = bad ? "#ffb4b4" : "var(--green)"; }
function node(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
function linkToAccount() { const a = node("a", "btn", "Sign in / create account"); a.href = "account.html"; return a; }
if (!configured) {
  say("Community database setup is not finished. The site owner must configure Supabase and run supabase-schema.sql.", true);
  form.hidden = true;
} else {
  supabase = createClient(url, key);
  supabase.auth.onAuthStateChange((_event, session) => { currentUser = session?.user || null; updateForm(); });
  supabase.auth.getSession().then(({ data }) => { currentUser = data.session?.user || null; updateForm(); loadDiscussions(); });
  form.addEventListener("submit", createDiscussion);
}
function updateForm() {
  form.hidden = !currentUser;
  const note = document.getElementById("sign-in-note");
  note.replaceChildren();
  if (!currentUser) { note.append("You can read posts without signing in. To post or comment, sign in first. "); note.append(linkToAccount()); }
  else note.textContent = "Signed in. Please keep discussions respectful and evidence-minded.";
}
async function createDiscussion(event) {
  event.preventDefault();
  if (!currentUser) return say("Sign in before posting.", true);
  const title = document.getElementById("discussion-title").value.trim();
  const body = document.getElementById("discussion-body").value.trim();
  if (title.length < 5 || body.length < 1) return say("Add a title (at least 5 characters) and some text.", true);
  const { error } = await supabase.from("discussions").insert({ user_id: currentUser.id, title, body, chapter_number: chapterNumber });
  if (error) return say(error.message, true);
  form.reset(); say("Discussion posted."); await loadDiscussions();
}
async function loadDiscussions() {
  if (!configured) return;
  root.replaceChildren(node("p", "", "Loading discussions…"));
  let query = supabase.from("discussions").select("id,title,body,chapter_number,created_at,user_id").order("created_at", { ascending: false }).limit(50);
  if (chapterNumber) query = query.eq("chapter_number", chapterNumber);
  const { data, error } = await query;
  root.replaceChildren();
  if (error) { root.append(node("p", "", "Could not load discussions: " + error.message)); return; }
  if (!data?.length) { root.append(node("p", "", chapterNumber ? "No comments for this chapter yet. Start the conversation below." : "No discussions yet. Be the first to start one!")); return; }
  const ids = [...new Set(data.map(item => item.user_id))];
  const { data: profiles } = await supabase.from("profiles").select("id,username").in("id", ids);
  const names = new Map((profiles || []).map(profile => [profile.id, profile.username]));
  data.forEach(item => { item.author_name = names.get(item.user_id) || "Cosmic Atlas member"; root.append(renderDiscussion(item)); });
}
function renderDiscussion(item) {
  const card = node("article", "card");
  card.append(node("h3", "", item.title));
  const by = item.author_name || "Cosmic Atlas member";
  card.append(node("p", "meta", "By " + by + " · " + new Date(item.created_at).toLocaleString()));
  if (item.chapter_number) {
    const a = node("a", "", "Chapter " + item.chapter_number); a.href = "chapter.html?number=" + encodeURIComponent(item.chapter_number);
    const p = node("p"); p.append("Related to ", a); card.append(p);
  }
  const body = node("p", "", item.body); body.style.whiteSpace = "pre-wrap"; card.append(body);
  const replies = node("div", "comment-list");
  const replyForm = node("form", "reply-form");
  const label = node("label", "", "Add a comment"); const input = node("textarea"); input.rows = 2; input.maxLength = 2000; input.required = true; input.placeholder = "Write a constructive reply…";
  label.append(input);
  const send = node("button", "btn alt", "Post comment"); send.type = "submit";
  const replyStatus = node("p", "meta");
  if (currentUser) {
    replyForm.append(label, send);
    replyForm.addEventListener("submit", async event => {
      event.preventDefault();
      const body = input.value.trim(); if (!body) return;
      const { error } = await supabase.from("comments").insert({ discussion_id: item.id, user_id: currentUser.id, body });
      if (error) { replyStatus.textContent = error.message; return; }
      input.value = ""; replyStatus.textContent = "Comment posted."; await loadComments(item.id, replies);
    });
  } else {
    replyForm.append(node("p", "meta", "Sign in to comment. "));
    replyForm.append(linkToAccount());
  }
  card.append(replies, replyForm, replyStatus);
  loadComments(item.id, replies);
  return card;
}
async function loadComments(id, target) {
  const { data, error } = await supabase.from("comments").select("id,body,created_at,user_id").eq("discussion_id", id).order("created_at", { ascending: true }).limit(100);
  target.replaceChildren();
  if (error) { target.append(node("p", "meta", "Comments could not load.")); return; }
  const ids = [...new Set((data || []).map(comment => comment.user_id))];
  const { data: profiles } = ids.length ? await supabase.from("profiles").select("id,username").in("id", ids) : { data: [] };
  const names = new Map((profiles || []).map(profile => [profile.id, profile.username]));
  (data || []).forEach(c => {
    const p = node("p", "meta"); const strong = node("strong", "", (names.get(c.user_id) || "Member") + ": ");
    p.append(strong, document.createTextNode(c.body)); p.style.whiteSpace = "pre-wrap"; target.append(p);
  });
}
