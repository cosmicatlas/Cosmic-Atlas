(function(){
 var root=document.getElementById("cms-chapters");if(!root)return;
 function render(items){
  if(!Array.isArray(items)||!items.length){root.innerHTML="<p>No chapters yet. Open the owner editor to create one.</p>";return;}
  root.innerHTML=items.slice().sort(function(a,b){return Number(a.number)-Number(b.number)}).map(function(c){
   var n=Number(c.number);if(!Number.isFinite(n)||n<1)return "";
   function esc(v){return String(v||"").replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]})}
   return '<div class="card"><h3><a href="chapter.html?number='+n+'">Chapter '+n+': '+esc(c.title||"Untitled chapter")+'</a></h3><p>'+esc(c.summary||"")+'</p></div>';
  }).join("");
 }
 var cfg=window.COSMIC_SUPABASE_URL&&window.COSMIC_SUPABASE_KEY;
 var source=cfg?fetch(window.COSMIC_SUPABASE_URL+"/rest/v1/chapters?select=number,title,summary&order=number.asc",{headers:{apikey:window.COSMIC_SUPABASE_KEY}}).then(function(r){if(!r.ok)throw Error("database");return r.json()}).then(function(rows){if(rows&&rows.length)return rows;throw Error("empty");}):Promise.reject(Error("not configured"));
 source.catch(function(){return fetch("content/chapters.json").then(function(r){if(!r.ok)throw Error("Could not load chapters");return r.json()});}).then(render).catch(function(){root.innerHTML='<p>Chapters could not load right now. Try refreshing the page.</p>';});
})();