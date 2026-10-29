import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const url = window.COSMIC_SUPABASE_URL || "";
const key = window.COSMIC_SUPABASE_KEY || "";
const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && key && !key.includes("YOUR_");
const warning = document.getElementById("config-warning");
const authPanel = document.getElementById("auth-panel");
const profilePanel = document.getElementById("profile-panel");
const authMessage = document.getElementById("auth-message");
const profileMessage = document.getElementById("profile-message");
let supabase;

function message(el, text, isError = false) {
  el.textContent = text;
  el.style.color = isError ? "#ffb4b4" : "var(--green)";
}
function safeUsername(value) {
  return String(value || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 24);
}
if (!configured) {
  warning.hidden = false;
  ["signup","login","github-login","save-profile","signout"].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.disabled = true;
  });
} else {
  supabase = createClient(url, key);
  document.getElementById("signup").addEventListener("click", signUp);
  document.getElementById("login").addEventListener("click", signIn);
  document.getElementById("github-login").addEventListener("click", signInGithub);
  document.getElementById("save-profile").addEventListener("click", saveProfile);
  document.getElementById("signout").addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    message(profileMessage, error ? error.message : "Signed out.");
    if (!error) showSession(null);
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) setTimeout(() => loadProfile(session.user), 0);
    else showSession(null);
  });
  supabase.auth.getSession().then(({ data }) => {
    if (data.session?.user) loadProfile(data.session.user);
  });
}

async function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const username = safeUsername(document.getElementById("username").value);
  if (!email || password.length < 8 || username.length < 3) {
    message(authMessage, "Enter an email, a password of at least 8 characters, and a username of 3–24 letters/numbers/_/-.", true);
    return;
  }
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { username }, emailRedirectTo: location.origin + location.pathname }
  });
  if (error) return message(authMessage, error.message, true);
  if (data.session && data.user) await upsertProfile(data.user, username, "");
  message(authMessage, "Account request sent. Check your email if confirmation is enabled.");
}
async function signIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  if (!email || !password) return message(authMessage, "Enter your email and password.", true);
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  message(authMessage, error ? error.message : "Signed in.", !!error);
}
async function signInGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: location.origin + location.pathname }
  });
  if (error) message(authMessage, error.message, true);
}
async function upsertProfile(user, username, bio) {
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    username: username || safeUsername(user.user_metadata?.user_name || user.user_metadata?.preferred_username || "Explorer"),
    bio: bio || ""
  }, { onConflict: "id" });
  if (error) message(profileMessage, "Signed in, but profile setup failed: " + error.message, true);
}
async function loadProfile(user) {
  showSession(user);
  let { data, error } = await supabase.from("profiles").select("username,bio").eq("id", user.id).maybeSingle();
  if (!data && !error) {
    const suggested = safeUsername(user.user_metadata?.username || user.user_metadata?.user_name || user.user_metadata?.preferred_username || document.getElementById("username").value || "Explorer");
    await upsertProfile(user, suggested, "");
    ({ data, error } = await supabase.from("profiles").select("username,bio").eq("id", user.id).maybeSingle());
  }
  if (error) return message(profileMessage, error.message, true);
  document.getElementById("profile-username").value = data?.username || "";
  document.getElementById("bio").value = data?.bio || "";
}
function showSession(user) {
  authPanel.hidden = !!user;
  profilePanel.hidden = !user;
  if (user) document.getElementById("signed-in-as").textContent = "Signed in as " + (user.email || user.user_metadata?.user_name || "Cosmic Atlas member");
}
async function saveProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return message(profileMessage, "Please sign in again.", true);
  const username = safeUsername(document.getElementById("profile-username").value);
  const bio = document.getElementById("bio").value.trim().slice(0, 240);
  if (username.length < 3) return message(profileMessage, "Username must be at least 3 characters.", true);
  const { error } = await supabase.from("profiles").upsert({ id: user.id, username, bio }, { onConflict: "id" });
  message(profileMessage, error ? error.message : "Profile saved.", !!error);
}