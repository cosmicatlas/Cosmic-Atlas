import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const url=window.COSMIC_SUPABASE_URL||"",key=window.COSMIC_SUPABASE_KEY||"";
const supabase=createClient(url,key);
const status=document.getElementById("editor-status"),login=document.getElementById("editor-login"),form=document.getElementById("editor-form");
let providerToken="";
function say(s,bad=false){status.textContent=s;status.style.color=bad?"#ffb4b4":"var(--green)";}
async function check(session){
  providerToken=session?.provider_token||"";
  if(!session?.user){login.hidden=false;form.hidden=true;say("Sign in with the owner GitHub account.");return;}
  const identity=session.user.identities?.find(x=>x.provider==="github");
  const username=identity?.identity_data?.user_name||identity?.identity_data?.preferred_username||"";
  if(!identity){login.hidden=false;form.hidden=true;say("This account has no linked GitHub identity.",true);return;}
  if(!providerToken){login.hidden=false;form.hidden=true;say("Your GitHub authorization token is unavailable. Sign out and sign in again with GitHub.",true);return;}
  // The Edge Function independently verifies the GitHub token and account ID before every save.
  login.hidden=true;form.hidden=false;say("Signed in. The server will verify cosmicatlas again when you save.");
  await loadChapter();
}
async function loadChapter(){
 const n=Number(document.getElementById("chapter-number").value)||2;
 const {data,error}=await supabase.from("chapters").select("number,title,summary,body,reference_notes").eq("number",n).maybeSingle();
 if(error){say("Could not load chapter: "+error.message,true);return;}
 if(data){fill(data);say("Loaded saved chapter "+n+".");return;}
 try{const r=await fetch("content/chapters.json");const items=await r.json();const c=items.find(x=>Number(x.number)===n);if(c){fill({...c,reference_notes:c.references||""});say("Loaded the repository draft for chapter "+n+".");}else say("No saved chapter found for number "+n+".");}
 catch{say("No saved chapter found. You can create it here.");}
}
function fill(c){document.getElementById("chapter-number").value=c.number;document.getElementById("chapter-title").value=c.title||"";document.getElementById("chapter-summary").value=c.summary||"";document.getElementById("chapter-body").value=c.body||"";document.getElementById("chapter-references").value=c.reference_notes||"";}
document.getElementById("editor-github").addEventListener("click",async()=>{
 const {error}=await supabase.auth.signInWithOAuth({provider:"github",options:{redirectTo:location.href,scopes:"read:user"}});
 if(error)say(error.message,true);
});
document.getElementById("load-chapter").addEventListener("click",loadChapter);
document.getElementById("save-chapter").addEventListener("click",async()=>{
 const sessionResult=await supabase.auth.getSession();const session=sessionResult.data.session;
 providerToken=session?.provider_token||providerToken;
 if(!session?.access_token||!providerToken){say("Please sign in again with GitHub before saving.",true);return;}
 const chapter={number:Number(document.getElementById("chapter-number").value),title:document.getElementById("chapter-title").value,summary:document.getElementById("chapter-summary").value,body:document.getElementById("chapter-body").value,references:document.getElementById("chapter-references").value};
 if(!Number.isInteger(chapter.number)||chapter.number<1||!chapter.title.trim()){say("Enter a valid chapter number and title.",true);return;}
 say("Verifying owner account and saving…");
 const response=await fetch(url+"/functions/v1/owner-chapter-save",{method:"POST",headers:{"Content-Type":"application/json","apikey":key,"Authorization":"Bearer "+session.access_token},body:JSON.stringify({providerToken,chapter})});
 const result=await response.json().catch(()=>({}));
 if(!response.ok){say(result.error||"Save failed. Please try again.",true);return;}
 say("Chapter "+result.number+" saved. The public chapter page will now show this version.");
});
document.getElementById("editor-signout").addEventListener("click",async()=>{await supabase.auth.signOut();providerToken="";form.hidden=true;login.hidden=false;say("Signed out.");});
supabase.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>check(session),0);});
supabase.auth.getSession().then(({data})=>check(data.session));
