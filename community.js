import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const url=window.COSMIC_SUPABASE_URL||"", key=window.COSMIC_SUPABASE_KEY||"";
const configured=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)&&key&&!key.includes("YOUR_");
const $=id=>document.getElementById(id), params=new URLSearchParams(location.search);
const groupSlug=params.get("group"), chapterNumber=Number(params.get("chapter"))||null;
let supabase,currentUser=null,activeGroup=null,isMember=false;
function node(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
function say(t,bad=false){$("community-status").textContent=t;$("community-status").style.color=bad?"#ffb4b4":"var(--green)"}
function accountLink(){const a=node("a","btn","Sign in / create account");a.href="account.html";return a}
function slugify(s){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40)}
if(!configured){say("Community database is not configured. The site owner must set up Supabase and run supabase-schema.sql.",true);$("community-form").hidden=true;$("discussion-form").hidden=true}
else{
 supabase=createClient(url,key);
 supabase.auth.onAuthStateChange((_e,session)=>{currentUser=session?.user||null;updateAuthUI();if(activeGroup)loadGroup(activeGroup.slug)});
 supabase.auth.getSession().then(({data})=>{currentUser=data.session?.user||null;updateAuthUI();loadDirectory();if(groupSlug)openGroup(groupSlug);else loadGeneralFeed()});
 $("community-form").addEventListener("submit",createCommunity);
 $("community-search-form").addEventListener("submit",e=>{e.preventDefault();loadDirectory($("community-search").value)});
 $("clear-community-search").addEventListener("click",()=>{$("community-search").value="";loadDirectory()});
 $("community-search").addEventListener("input",()=>{if(!$("community-search").value.trim())loadDirectory()});
 $("discussion-form").addEventListener("submit",createPost);
}
function updateAuthUI(){
 $("sign-in-note").replaceChildren();
 if(!currentUser){$("sign-in-note").append("Browse freely. Sign in to create groups, join them, and post. ",accountLink());$("create-community-card").querySelector("form").hidden=true;$("discussion-form").hidden=true}
 else{$("sign-in-note").textContent="Signed in. Create a group or join one to start posting.";$("create-community-card").querySelector("form").hidden=false}
}
async function loadDirectory(searchTerm=""){
 const box=$("community-list"),summary=$("community-search-summary");
 box.replaceChildren(node("p","","Searching communities…"));
 let query=supabase.from("communities").select("id,name,slug,description,created_at").order("created_at",{ascending:false});
 const term=searchTerm.trim().replace(/[,%()_*]/g," ").replace(/\\s+/g," ").slice(0,80);
 if(term)query=query.or("name.ilike.%"+term+"%,slug.ilike.%"+term+"%,description.ilike.%"+term+"%");
 const {data,error}=await query.limit(100);
 box.replaceChildren();
 if(error){summary.textContent="";box.append(node("p","","Could not search communities: "+error.message));return}
 summary.textContent=term?(data?.length?("Search results for “"+term+"” ("+data.length+" shown)"):("No communities found for “"+term+"”. Try another keyword.")):(data?.length?("Showing "+data.length+" communities"):"No communities yet. Create the first one!");
 if(!data?.length)return;
 for(const g of data){
  const card=node("article","card community-card"),h=node("h3"),a=node("a","",g.name);
  a.href="community.html?group="+encodeURIComponent(g.slug);h.append(a);card.append(h);
  card.append(node("p","",g.description||"A community for astronomy discussion."));
  card.append(node("p","meta","c/"+g.slug));
  const open=node("a","btn alt","View community");open.href=a.href;card.append(open);box.append(card);
 }
}
async function createCommunity(e){
 e.preventDefault();if(!currentUser)return say("Sign in first to create a community.",true);
 const name=$("community-name").value.trim(),description=$("community-description").value.trim(),slug=slugify(name);
 if(name.length<3||slug.length<3)return say("Use a name with at least 3 letters or numbers.",true);
 const {data,error}=await supabase.from("communities").insert({name,slug,description,created_by:currentUser.id}).select("id,name,slug,description").single();
 if(error)return say(error.code==="23505"?"That community name is already taken. Try another.":error.message,true);
 const joined=await supabase.from("community_members").insert({community_id:data.id,user_id:currentUser.id});
 if(joined.error)return say("Community created, but joining failed: "+joined.error.message,true);
 $("community-form").reset();say("Community created!");await loadDirectory();location.href="community.html?group="+encodeURIComponent(data.slug);
}
async function openGroup(slug){
 $("group-directory").hidden=true;$("general-discussions").hidden=true;$("group-view").hidden=false;
 $("community-app").replaceChildren(node("p","","Loading community…"));
 const {data,error}=await supabase.from("communities").select("id,name,slug,description,created_by,created_at").eq("slug",slug).maybeSingle();
 if(error||!data){$("group-header").textContent="Community not found.";return}
 await loadGroup(data.slug);
}
async function loadGroup(slug){
 if(!supabase)return;
 const {data:g,error}=await supabase.from("communities").select("id,name,slug,description,created_by,created_at").eq("slug",slug).maybeSingle();
 if(error||!g)return;
 activeGroup=g;const header=$("group-header");header.replaceChildren();
 header.append(node("h2","",g.name),node("p","",g.description||"A community for astronomy discussion."),node("p","meta","c/"+g.slug+" · Created "+new Date(g.created_at).toLocaleDateString()));
 isMember=false;
 if(currentUser){const {data:m}=await supabase.from("community_members").select("user_id").eq("community_id",g.id).eq("user_id",currentUser.id).maybeSingle();isMember=!!m}
 const action=node("button","btn",isMember?"Leave community":"Join community");action.type="button";action.addEventListener("click",()=>toggleMembership(g));header.append(action);
 const form=$("discussion-form");form.hidden=!isMember;
 if(!currentUser){const p=node("p","meta","Sign in to join and post. ");p.append(accountLink());header.append(p)}
 else if(!isMember)header.append(node("p","meta","Join this community to publish posts and take part."));
 await loadFeed(g.id);
}
async function toggleMembership(g){
 if(!currentUser)return say("Sign in to join communities.",true);
 if(isMember){const {error}=await supabase.from("community_members").delete().eq("community_id",g.id).eq("user_id",currentUser.id);if(error)return say(error.message,true);say("You left c/"+g.slug)}
 else{const {error}=await supabase.from("community_members").insert({community_id:g.id,user_id:currentUser.id});if(error&&error.code!=="23505")return say(error.message,true);say("You joined c/"+g.slug)}
 await loadGroup(g.slug);
}
async function createPost(e){
 e.preventDefault();if(!currentUser||!activeGroup||!isMember)return say("Join this community before posting.",true);
 const title=$("discussion-title").value.trim(),body=$("discussion-body").value.trim();
 if(title.length<5||!body)return say("Add a title and some text.",true);
 const {error}=await supabase.from("discussions").insert({user_id:currentUser.id,title,body,community_id:activeGroup.id,chapter_number:chapterNumber});
 if(error)return say(error.message,true);
 $("discussion-form").reset();say("Post published.");await loadFeed(activeGroup.id);
}
async function loadGeneralFeed(){
 $("group-view").hidden=true;$("group-directory").hidden=false;$("general-discussions").hidden=false;
 const target=$("general-feed");target.replaceChildren(node("p","","Loading discussions…"));
 let q=supabase.from("discussions").select("id,title,body,chapter_number,created_at,user_id").is("community_id",null).order("created_at",{ascending:false}).limit(30);
 if(chapterNumber)q=q.eq("chapter_number",chapterNumber);
 const {data,error}=await q;target.replaceChildren();
 if(error){target.append(node("p","",error.message));return}
 if(!data?.length){target.append(node("p","","No open discussions yet."));return}
 await renderPosts(data,target);
}
async function loadFeed(groupId){
 const target=$("community-app");target.replaceChildren(node("p","","Loading posts…"));
 const {data,error}=await supabase.from("discussions").select("id,title,body,chapter_number,created_at,user_id").eq("community_id",groupId).order("created_at",{ascending:false}).limit(50);
 target.replaceChildren();if(error){target.append(node("p","",error.message));return}
 if(!data?.length){target.append(node("p","","No posts yet. Be the first to start a discussion in this group."));return}
 await renderPosts(data,target);
}
async function renderPosts(posts,target){
 const ids=[...new Set(posts.map(p=>p.user_id))],{data:profiles}=ids.length?await supabase.from("profiles").select("id,username").in("id",ids):{data:[]};
 const names=new Map((profiles||[]).map(p=>[p.id,p.username]));
 for(const item of posts){
  const card=node("article","card"),h=node("h3","",item.title);card.append(h);
  card.append(node("p","meta","By "+(names.get(item.user_id)||"Cosmic Atlas member")+" · "+new Date(item.created_at).toLocaleString()));
  if(item.chapter_number){const a=node("a","","Chapter "+item.chapter_number);a.href="chapter.html?number="+encodeURIComponent(item.chapter_number);const p=node("p");p.append("Related to ",a);card.append(p)}
  const body=node("p","",item.body);body.style.whiteSpace="pre-wrap";card.append(body);
  const replies=node("div","comment-list"),replyForm=node("form","reply-form"),replyStatus=node("p","meta");
  if(currentUser){const label=node("label","","Add a comment"),input=node("textarea");input.rows=2;input.maxLength=2000;input.required=true;input.placeholder="Write a constructive reply…";label.append(input);const send=node("button","btn alt","Post comment");send.type="submit";replyForm.append(label,send);replyForm.addEventListener("submit",async e=>{e.preventDefault();const value=input.value.trim();if(!value)return;const {error}=await supabase.from("comments").insert({discussion_id:item.id,user_id:currentUser.id,body:value});if(error){replyStatus.textContent=error.message;return}input.value="";replyStatus.textContent="Comment posted.";await loadComments(item.id,replies)})}
  else{replyForm.append(node("p","meta","Sign in to comment. "),accountLink())}
  card.append(replies,replyForm,replyStatus);target.append(card);loadComments(item.id,replies);
 }
}
async function loadComments(id,target){
 const {data,error}=await supabase.from("comments").select("id,body,created_at,user_id").eq("discussion_id",id).order("created_at",{ascending:true}).limit(100);target.replaceChildren();
 if(error){target.append(node("p","meta","Comments could not load."));return}
 const ids=[...new Set((data||[]).map(c=>c.user_id))],{data:profiles}=ids.length?await supabase.from("profiles").select("id,username").in("id",ids):{data:[]};
 const names=new Map((profiles||[]).map(p=>[p.id,p.username]));
 (data||[]).forEach(c=>{const p=node("p","meta"),b=node("strong","",(names.get(c.user_id)||"Member")+": ");p.append(b,document.createTextNode(c.body));p.style.whiteSpace="pre-wrap";target.append(p)});
}
