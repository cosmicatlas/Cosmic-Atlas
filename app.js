(function(){
// Play the cinematic intro only on the homepage, once per browser.
var path = window.location.pathname;
var isHome = /(?:^|\/)index\.html$/.test(path) || /\/Cosmic-Atlas\/$/.test(path) || path === "/";
var introSeen = false;
try { introSeen = localStorage.getItem("cosmic-atlas-intro-seen-v2") === "1"; } catch(e) {}
if (isHome) {
 // Compact Cosmic Atlas launch sequence; show on each homepage load so stale browser storage cannot suppress it.
 var intro=document.createElement("div");
  intro.className="atlas-intro atlas-cinematic";
  intro.setAttribute("role","status");
  intro.setAttribute("aria-label","Cosmic Atlas is launching");
  intro.innerHTML='<div class="mini-opening-orbit"><span></span></div><div class="mini-opening-title">COSMIC <b>ATLAS</b></div><div class="mini-opening-sub">Explore the universe</div>';
  document.body.appendChild(intro);
  var finishIntro=function(){if(!intro.isConnected)return;intro.classList.add("intro-hide");window.setTimeout(function(){if(intro.isConnected)intro.remove()},320)};
  window.setTimeout(finishIntro,2000);
 
}
var live=Object.keys(LIVE).map(Number).sort(function(a,b){return a-b}),BY={};CH.forEach(function(c){BY[c[1]]=c});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
var art=document.querySelector("article[data-ch]"),cur=art?+art.dataset.ch:0,curPart=cur?BY[cur][0]:-1;
var p="";PARTS.forEach(function(name,i){p+="<details"+(i===curPart?" open":"")+"><summary>"+esc(name)+"</summary><ul>";
CH.forEach(function(c){if(c[0]===i){var L=LIVE[c[1]];p+="<li>"+(L?'<a href="'+L.file+'">'+c[1]+". "+esc(c[2])+"</a>":'<span class="soon">'+c[1]+". "+esc(c[2])+" (planned)</span>")+"</li>"}});p+="</ul></details>"});
var top=document.getElementById("top");
top.innerHTML='<a class="brand" href="index.html">Cosmic Atlas</a><nav class="links" aria-label="Main"><a href="glossary.html">Glossary</a><a href="community.html">Community</a><a href="account.html">Account</a></nav><button id="theme-toggle" type="button" aria-label="Switch to light mode" aria-pressed="false">☀️ Light</button><button id="mb" type="button" aria-expanded="false" aria-controls="menu">☰ Menu</button><div id="menu" hidden><nav class="site-menu-links" aria-label="Explore Cosmic Atlas"><a href="index.html">Home</a><a href="index.html#universe-timeline">Cosmic timeline</a><a href="index.html#solar-system">Solar system</a><a href="index.html#nasa-explorer">NASA images</a><a href="glossary.html">Glossary</a><a href="community.html">Community</a><a href="account.html">Account</a></nav><h2 class="menu-heading">Search chapters</h2><label class="sr" for="q">Search chapters and terms</label><input id="q" type="search" placeholder="Search chapters and terms" autocomplete="off"><ul id="res" aria-live="polite"></ul><div id="parts">'+p+"</div></div>";
var mb=document.getElementById("mb"),menu=document.getElementById("menu"),q=document.getElementById("q"),res=document.getElementById("res");
var themeButton=document.getElementById("theme-toggle");
var savedTheme="dark";try{savedTheme=localStorage.getItem("cosmic-atlas-theme")||"dark"}catch(e){}
function setTheme(theme){document.documentElement.setAttribute("data-theme",theme);var light=theme==="light";themeButton.textContent=light?"🌙 Dark":"☀️ Light";themeButton.setAttribute("aria-label",light?"Switch to dark mode":"Switch to light mode");themeButton.setAttribute("aria-pressed",String(light));try{localStorage.setItem("cosmic-atlas-theme",theme)}catch(e){}}
setTheme(savedTheme==="light"?"light":"dark");
themeButton.addEventListener("click",function(){setTheme(document.documentElement.getAttribute("data-theme")==="light"?"dark":"light")});
function tog(open){menu.hidden=!open;mb.setAttribute("aria-expanded",open);if(open)q.focus()}
mb.onclick=function(){tog(menu.hidden)};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!menu.hidden){tog(false);mb.focus()}});
q.addEventListener("input",function(){var t=q.value.trim().toLowerCase(),out="",n=0;
if(t.length>1){live.forEach(function(k){var c=BY[k];if(n<8&&(c[2]+" "+LIVE[k].sum).toLowerCase().indexOf(t)>-1){n++;out+='<li><a href="'+LIVE[k].file+'">'+c[1]+". "+esc(c[2])+"</a><br><small>Chapter</small></li>"}});
GLOSSARY.forEach(function(g){if(n<8&&(g[0]+" "+g[1]).toLowerCase().indexOf(t)>-1){n++;out+='<li><a href="glossary.html#'+slug(g[0])+'">'+esc(g[0])+"</a><br><small>Glossary: "+esc(g[1].slice(0,80))+"…</small></li>"}});
if(!n)out="<li>No matching published chapters or glossary terms yet.</li>"}res.innerHTML=out});
document.getElementById("foot").innerHTML='<p>Cosmic Atlas is an independent, student-run writing project. Chapters are added when the author is ready.</p><p><a href="glossary.html">Glossary</a> &nbsp; <a href="community.html#rules">Community guidelines</a> &nbsp; <a href="account.html">Account</a></p>';
if(art){var w=art.innerText.split(/\s+/).length,m=Math.max(1,Math.round(w/200));
document.getElementById("crumb").textContent=PARTS[BY[cur][0]];
document.getElementById("meta").textContent="Chapter "+cur+" of "+CH.length+" · Draft";
var hs=art.querySelectorAll("h2:not(.notoc)"),li="";hs.forEach(function(h,i){if(!h.id)h.id="s"+i;li+='<li><a href="#'+h.id+'">'+esc(h.textContent)+"</a></li>"});
document.getElementById("toc").innerHTML='<details><summary>On this page</summary><ol>'+li+"</ol></details>";
var i=live.indexOf(cur),pn=document.getElementById("pn"),h="";
if(i>0){var a=live[i-1];h+='<a href="'+LIVE[a].file+'"><small>Previous</small>'+esc(BY[a][2])+"</a>"}
if(i>-1&&i<live.length-1){var b=live[i+1];h+='<a class="nx" href="'+LIVE[b].file+'"><small>Next</small>'+esc(BY[b][2])+"</a>"}
pn.innerHTML=h||"<span>Keep writing. Add this chapter to LIVE in data.js only when you are ready to publish it.</span>"}
var plan=document.getElementById("plan");if(plan){var s="";PARTS.forEach(function(name,i){var all=CH.filter(function(c){return c[0]===i}),lv=all.filter(function(c){return LIVE[c[1]]});
s+='<div class="card"><h3>'+esc(name)+"</h3><p>"+lv.length+" of "+all.length+" chapters published</p></div>"});plan.innerHTML=s}
var gl=document.getElementById("gl");if(gl){var rows=GLOSSARY.slice().sort(function(a,b){return a[0].localeCompare(b[0])}),g="";
if(!rows.length){gl.innerHTML='<p class="soon">No glossary entries yet. Add terms and definitions you have researched to GLOSSARY in data.js.</p>'}
else{rows.forEach(function(r){g+='<dt id="'+slug(r[0])+'">'+esc(r[0])+"</dt><dd>"+esc(r[1])+(r[2]&&LIVE[r[2]]?' <a href="'+LIVE[r[2]].file+'">Read more</a>':"")+"</dd>"});gl.innerHTML=g}
document.getElementById("gf").addEventListener("input",function(e){var t=e.target.value.toLowerCase();gl.querySelectorAll("dt").forEach(function(d){var dd=d.nextElementSibling,ok=(d.textContent+dd.textContent).toLowerCase().indexOf(t)>-1;d.hidden=dd.hidden=!ok})})}
var cs=document.getElementById("cats");if(cs){var ok=SITE.user!=="YOUR-GITHUB-USERNAME",base="https://github.com/"+SITE.user+"/"+SITE.repo;
if(!ok)document.getElementById("setup").style.display="block";
document.querySelectorAll("[data-gh]").forEach(function(a){a.href=ok?base+a.dataset.gh:"#setup"});
var c="";CATS.forEach(function(x){c+='<div class="card"><h3><a href="'+(ok?base+"/discussions/categories/"+x[1]:"#setup")+'">'+esc(x[0])+"</a></h3><p>"+esc(x[2])+"</p></div>"});cs.innerHTML=c}
/* Interactive cosmic-history timeline */
var cosmicSlider=document.getElementById("cosmic-time-slider");
if(cosmicSlider){
 var cosmicStages=[
  {at:0,title:"The Big Bang",age:"13.8 billion years ago",desc:"The universe began in an extremely hot, dense state and has been expanding ever since."},
  {at:25,title:"The first atoms",age:"about 380,000 years after the beginning",desc:"As the universe cooled, electrons joined nuclei to form mostly hydrogen and helium atoms. The cosmic microwave background was released."},
  {at:50,title:"The first stars",age:"within the first few hundred million years",desc:"Gravity gathered gas into the first stars. Their light began transforming the dark early universe."},
  {at:75,title:"Galaxies take shape",age:"over billions of years",desc:"Stars gathered into galaxies, which grew and changed as gravity shaped the large-scale cosmic web."},
  {at:100,title:"The universe today",age:"13.8 billion years after the beginning",desc:"The universe continues to expand. Stars and planets form, and observers on Earth study the cosmos while many questions remain open."}
 ];
 function updateCosmicTimeline(){
  var value=Number(cosmicSlider.value),stage=cosmicStages[0];
  for(var j=0;j<cosmicStages.length;j++){if(value>=cosmicStages[j].at)stage=cosmicStages[j]}
  var title=document.getElementById("cosmic-era-title"),age=document.getElementById("cosmic-era-age"),desc=document.getElementById("cosmic-era-description"),fill=document.getElementById("cosmic-track-fill");
  if(title)title.textContent=stage.title;if(age)age.textContent=stage.age;if(desc)desc.textContent=stage.desc;if(fill)fill.style.width=value+"%";
  cosmicSlider.setAttribute("aria-valuetext",stage.title+", "+stage.age);
 }
 cosmicSlider.addEventListener("input",updateCosmicTimeline);updateCosmicTimeline();
}
/* Interactive solar-system planet cards */
var planetData={
 Mercury:{type:"Terrestrial planet",year:"88 Earth days",fact:"The smallest planet and the closest to the Sun. Its heavily cratered surface records a long history of impacts."},
 Venus:{type:"Terrestrial planet",year:"225 Earth days",fact:"A thick carbon-dioxide atmosphere traps heat, making Venus the hottest planet in our solar system."},
 Earth:{type:"Terrestrial planet",year:"365.25 Earth days",fact:"Our home world has liquid water on its surface and, so far, is the only world known to host life."},
 Mars:{type:"Terrestrial planet",year:"687 Earth days",fact:"A cold desert world with ancient river-like features, giant volcanoes, and evidence that liquid water once flowed on its surface."},
 Jupiter:{type:"Gas giant",year:"11.86 Earth years",fact:"The largest planet. Jupiter's atmosphere hosts powerful storms, including the long-lived Great Red Spot."},
 Saturn:{type:"Gas giant",year:"29.4 Earth years",fact:"Saturn's spectacular rings are made mostly of countless pieces of water ice and rocky debris."},
 Uranus:{type:"Ice giant",year:"84 Earth years",fact:"An ice giant that rotates almost on its side, giving it extreme seasonal patterns."},
 Neptune:{type:"Ice giant",year:"164.8 Earth years",fact:"A distant, cold ice giant with supersonic winds and a deep blue atmosphere."}
};
document.querySelectorAll("[data-planet]").forEach(function(button){
 button.addEventListener("click",function(){
  var p=planetData[button.getAttribute("data-planet")];if(!p)return;
  document.getElementById("solar-name").textContent=button.getAttribute("data-planet");
  document.getElementById("solar-fact").textContent=p.fact;
  document.getElementById("solar-type").textContent=p.type;
  document.getElementById("solar-year").textContent=p.year;
  document.querySelectorAll("[data-planet]").forEach(function(b){b.setAttribute("aria-pressed",String(b===button))});
  var stage=document.querySelector(".solar-stage");if(stage){stage.setAttribute("data-selected",button.getAttribute("data-planet").toLowerCase())}
 });
});
/* NASA public image-library search. Uses NASA's public Images and Video Library API. */
var nasaForm=document.getElementById("nasa-search-form");
if(nasaForm){
 var nasaInput=document.getElementById("nasa-query"),nasaStatus=document.getElementById("nasa-status"),nasaResults=document.getElementById("nasa-results"),nasaBusy=false,nasaRequest=0;
 function nasaEscape(value){return String(value||"").replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]})}
 function nasaImageFor(item){
  var links=item&&item.links||[];
  var preview=links.find(function(l){return l.href&&(l.render==="image"||l.rel==="preview")&&/^https?:/i.test(l.href)});
  if(preview)return Promise.resolve(preview.href);
  if(!item||!item.href)return Promise.resolve("");
  return fetch(item.href).then(function(r){if(!r.ok)throw new Error("Asset list unavailable");return r.json()})
   .then(function(files){if(!Array.isArray(files))return "";return files.find(function(u){return typeof u==="string"&&/\.(jpe?g|png|webp)(\?|$)/i.test(u)&&!/_thumb\./i.test(u)})||files.find(function(u){return typeof u==="string"&&/\.(jpe?g|png|webp)(\?|$)/i.test(u)})||""})
   .catch(function(){return ""});
 }
 function searchNasa(query){
  if(!query)return;
  var requestId=++nasaRequest;nasaBusy=true;nasaStatus.textContent="Searching NASA's image library…";nasaResults.innerHTML="";
  fetch("https://images-api.nasa.gov/search?q="+encodeURIComponent(query)+"&media_type=image")
   .then(function(response){if(!response.ok)throw new Error("NASA library request failed");return response.json()})
   .then(function(data){
    var items=data&&data.collection&&data.collection.items||[];
    if(!items.length){nasaStatus.textContent="No images found for “"+query+"”. Try another search term.";return []}
    return Promise.all(items.slice(0,18).map(function(item){return nasaImageFor(item).then(function(image){return {item:item,image:image}})}));
   })
   .then(function(results){
    if(requestId!==nasaRequest)return;
    if(!results)return;
    var html="",count=0;
    results.forEach(function(result){
     if(count>=9||!result.image)return;
     var item=result.item,d=item.data&&item.data[0]||{};
     var title=nasaEscape(d.title||"NASA image"),desc=nasaEscape((d.description||"No description supplied.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").slice(0,220)),date=nasaEscape(d.date_created?d.date_created.slice(0,10):"Date unavailable"),href=nasaEscape(result.image),nasaId=nasaEscape(d.nasa_id||"");
     var details=nasaId?"https://images.nasa.gov/details/"+encodeURIComponent(d.nasa_id):"https://images.nasa.gov/";
     html+='<article class="nasa-card"><a class="nasa-image-link" href="'+href+'" target="_blank" rel="noopener noreferrer" aria-label="Open image: '+title+'"><img loading="lazy" src="'+href+'" alt="'+title+'"></a><div class="nasa-card-copy"><h3>'+title+'</h3><p>'+desc+'</p><small>'+date+(nasaId?" · "+nasaId:"")+'</small><a class="text-link" href="'+details+'" target="_blank" rel="noopener noreferrer">View NASA details ↗</a></div></article>';count++;
    });
    nasaResults.innerHTML=html;
    nasaStatus.textContent=count?("Showing "+count+" NASA image results for “"+query+"”. Select an image or open its NASA details."):"NASA returned results, but no preview images were available. Try another search.";
   })
   .catch(function(){if(requestId===nasaRequest)nasaStatus.textContent="NASA's image service could not be reached. Check your internet connection and try again."})
   .finally(function(){if(requestId===nasaRequest)nasaBusy=false});
 }
 nasaForm.addEventListener("submit",function(event){event.preventDefault();searchNasa(nasaInput.value.trim())});
 document.querySelectorAll("[data-nasa-query]").forEach(function(button){button.addEventListener("click",function(){nasaInput.value=button.getAttribute("data-nasa-query");searchNasa(nasaInput.value)})});
 searchNasa(nasaInput.value.trim()||"Orion Nebula");
}
/* Brief feedback when people interact with controls */
document.addEventListener("click", function(event) {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var target = event.target && event.target.closest
    ? event.target.closest("button, .btn, #theme-toggle, #mb, .community-card, .pn a, #parts summary, details.qa summary, .tag-option")
    : null;
  if (!target) return;
  target.classList.remove("atlas-action-pop");
  void target.offsetWidth;
  target.classList.add("atlas-action-pop");
  window.setTimeout(function() { target.classList.remove("atlas-action-pop"); }, 380);
}, true);

})();