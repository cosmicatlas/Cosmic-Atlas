(function(){
  var root=document.getElementById("cms-chapters");
  if(!root)return;
  fetch("content/chapters.json").then(function(r){if(!r.ok)throw Error("Could not load chapters");return r.json()}).then(function(items){
    if(!Array.isArray(items)||!items.length){root.innerHTML="<p>No chapters yet. Open the writing dashboard to create one.</p>";return;}
    root.innerHTML=items.slice().sort(function(a,b){return Number(a.number)-Number(b.number)}).map(function(c){
      var n=Number(c.number);
      if(!Number.isFinite(n)||n<1)return "";
      var title=String(c.title||"Untitled chapter").replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]});
      var summary=String(c.summary||"").replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]});
      return '<div class="card"><h3><a href="chapter.html?number='+n+'">Chapter '+n+': '+title+'</a></h3><p>'+summary+'</p></div>';
    }).join("");
  }).catch(function(){root.innerHTML='<p>Chapters could not load right now. Try refreshing the page.</p>';});
})();