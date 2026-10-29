/* ===== EDIT THIS FILE WEEKLY: it controls menu, search, glossary, and previous/next links ===== */
var SITE={user:"Qusai705",repo:"Cosmic-Atlas"};
var PARTS=["Part I — The Beginning","Part II — The Universe Takes Shape","Part III — The Cosmic Web","Part IV — Stars and Stellar Remnants","Part V — Worlds and Life","Part VI — The Universe's Future"];
var CH=[[0,1,"What Can We Know About the Beginning?"],[0,2,"The Big Bang: The Beginning of Cosmic History"],[0,3,"The Planck Epoch and the Limits of Physics"],[0,4,"Cosmic Inflation"],[0,5,"Fundamental Particles and the Early Universe"],
[1,6,"Matter, Antimatter, and Baryogenesis"],[1,7,"Big Bang Nucleosynthesis"],[1,8,"The Formation of Atoms"],[1,9,"The Cosmic Microwave Background"],[1,10,"The Cosmic Dark Ages and First Stars"],
[2,11,"Dark Matter and Structure Formation"],[2,12,"The First Galaxies"],[2,13,"Galaxy Formation and Evolution"],[2,14,"Galaxy Clusters and Superclusters"],[2,15,"The Cosmic Web"],
[3,16,"How Stars Form"],[3,17,"Nuclear Fusion and Stellar Evolution"],[3,18,"Supernovae and the Formation of Elements"],[3,19,"White Dwarfs, Neutron Stars, and Pulsars"],[3,20,"Black Holes and Gravitational Waves"],
[4,21,"The Formation of the Solar System"],[4,22,"Exoplanets and Planetary Systems"],[4,23,"Planetary Atmospheres and Habitability"],[4,24,"Astrobiology and the Search for Life"],
[5,25,"General Relativity and Cosmic Expansion"],[5,26,"Dark Energy and Accelerated Expansion"],[5,27,"The Observable Universe and Its Limits"],[5,28,"Possible Futures of the Universe"],[5,29,"Unsolved Problems in Cosmology"]];
/* A chapter appears as a link once it is listed here. Key = chapter number. */
var LIVE={
2:{file:"big-bang.html",sum:"Expansion, the cosmic microwave background, and light-element abundances support the hot Big Bang model. What it does and does not claim."}
};
/* [term, definition, chapter number or 0] */
var GLOSSARY=[
["Big Bang model","The description of the universe as expanding and cooling from an extremely hot, dense early state about 13.8 billion years ago. It does not explain what, if anything, came before.",2],
["Big Bang nucleosynthesis","The fusion of protons and neutrons into light nuclei (mostly hydrogen and helium) during the first few minutes of the universe.",2],
["Cosmic microwave background (CMB)","Faint microwave radiation from all directions, released when the universe first became transparent about 380,000 years after the hot, dense early state. Its temperature today is about 2.7 K.",2],
["Dark energy","The name given to whatever is causing the expansion of the universe to accelerate. Its nature is unknown.",0],
["Dark matter","Matter that does not emit or absorb light but affects gravity. Evidence is from its gravitational effects; what it is remains unknown.",0],
["Hubble–Lemaître law","The observed trend that, on average, more distant galaxies show larger redshifts, consistent with an expanding universe.",2],
["Inflation (cosmic)","A hypothesized, extremely rapid expansion in the earliest universe. It is a leading idea, but its exact mechanism is uncertain.",0],
["Observable universe","The part of the universe from which light has had time to reach us. It is not necessarily the whole universe.",0],
["Recombination","The time when electrons and nuclei combined into neutral atoms, letting light travel freely. The name is historical: they had never combined before.",2],
["Redshift","A stretching of light to longer wavelengths. In cosmology, mainly caused by the expansion of space while light travels.",2],
["Singularity","A place where a theory's equations give infinite values. In cosmology it signals that the theory stops working, not that infinity was observed.",2]
];
var CATS=[["Cosmology","cosmology","Big Bang, inflation, dark matter, dark energy, and the universe's evolution."],["Black Holes and Relativity","black-holes-and-relativity","Black holes, neutron stars, spacetime, gravitational waves, and relativity."],["Stars and Galaxies","stars-and-galaxies","Stellar evolution, supernovae, galaxy formation, and the cosmic web."],["Planetary Science","planetary-science","Planets, exoplanets, moons, atmospheres, and habitability."],["Theoretical Ideas","theoretical-ideas","Propose an idea, explain your reasoning, and invite constructive criticism."],["Questions and Learning","questions-and-learning","Beginners welcome. No question is too basic."],["Astronomy News and Discoveries","astronomy-news-and-discoveries","Recent discoveries, with links to reliable sources."],["Observations and Astrophotography","observations-and-astrophotography","Share your observations, photos, and equipment experiences."]];