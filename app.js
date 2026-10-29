(function(){
var live=Object.keys(LIVE).map(Number).sort(function(a,b){return a-b}),BY={};CH.forEach(function(c){BY[c[1]]=c});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
var art=document.querySelector("article[data-ch]"),cur=art?+art.dataset.ch:0,curPart=cur?BY[cur][0]:-1;
var p="";PARTS.forEach(function(name,i){p+="<details"+(i===curPart?" open":"")+"><summary>"+esc(name)+"</summary><ul>";
CH.forEach(function(c){if(c[0]===i){var L=LIVE[c[1]];p+="<li>"+(L?'<a href="'+L.file+'">'+c[1]+". "+esc(c[2])+"</a>":'<span class="soon">'+c[1]+". "+esc(c[2])+" (planned)</span>")+"</li>"}});p+="</ul></details>"});
var top=document.getElementById("top");
top.innerHTML='<a class="brand" href="index.html">Cosmic Atlas</a><nav class="links" aria-label="Main"><a href="glossary.html">Glossary</a><a href="community.html">Community</a><a href="account.html">Account</a></nav><button id="mb" type="button" aria-expanded="false" aria-controls="menu">Search &amp; chapters</button><div id="menu" hidden><label class="sr" for="q">Search chapters and terms</label><input id="q" type="search" placeholder="Search chapters and terms" autocomplete="off"><ul id="res" aria-live="polite"></ul><div id="parts">'+p+"</div></div>";
var mb=document.getElementById("mb"),menu=document.getElementById("menu"),q=document.getElementById("q"),res=document.getElementById("res");
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
})();