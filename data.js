/* This file controls the chapter outline, search, glossary, and navigation. Edit it as you publish your own work. */
var SITE={user:"Qusai705",repo:"Cosmic-Atlas"};
var PARTS=["Part I — The Beginning","Part II — The Universe Takes Shape","Part III — The Cosmic Web","Part IV — Stars and Stellar Remnants","Part V — Worlds and Life","Part VI — The Universe's Future"];
var CH=[[0,1,"What Can We Know About the Beginning?"],[0,2,"The Big Bang"],[0,3,"The Planck Epoch and the Limits of Physics"],[0,4,"Cosmic Inflation"],[0,5,"Fundamental Particles and the Early Universe"],
[1,6,"Matter, Antimatter, and Baryogenesis"],[1,7,"Big Bang Nucleosynthesis"],[1,8,"The Formation of Atoms"],[1,9,"The Cosmic Microwave Background"],[1,10,"The Cosmic Dark Ages and First Stars"],
[2,11,"Dark Matter and Structure Formation"],[2,12,"The First Galaxies"],[2,13,"Galaxy Formation and Evolution"],[2,14,"Galaxy Clusters and Superclusters"],[2,15,"The Cosmic Web"],
[3,16,"How Stars Form"],[3,17,"Nuclear Fusion and Stellar Evolution"],[3,18,"Supernovae and the Formation of Elements"],[3,19,"White Dwarfs, Neutron Stars, and Pulsars"],[3,20,"Black Holes and Gravitational Waves"],
[4,21,"The Formation of the Solar System"],[4,22,"Exoplanets and Planetary Systems"],[4,23,"Planetary Atmospheres and Habitability"],[4,24,"Astrobiology and the Search for Life"],
[5,25,"General Relativity and Cosmic Expansion"],[5,26,"Dark Energy and Accelerated Expansion"],[5,27,"The Observable Universe and Its Limits"],[5,28,"Possible Futures of the Universe"],[5,29,"Unsolved Problems in Cosmology"]];
/* Leave empty until a chapter is ready to publish. Add a chapter here only when it is written and checked. */
// Example: var LIVE={1:{file:"chapter.html?number=1",sum:"How observations reveal the universe’s history—and where our knowledge reaches its limits."},2:{file:"chapter.html?number=2",sum:"The expanding universe, the evidence for the Big Bang, and the early cosmic timeline."},3:{file:"chapter.html?number=3",sum:"Why the earliest moments challenge our theories of gravity and quantum physics."}};
var LIVE={1:{file:"chapter.html?number=1",sum:"How observations reveal the universe’s history—and where our knowledge reaches its limits."},2:{file:"chapter.html?number=2",sum:"The expanding universe, the evidence for the Big Bang, and the early cosmic timeline."},3:{file:"chapter.html?number=3",sum:"Why the earliest moments challenge our theories of gravity and quantum physics."}};
/* Add your own glossary terms as [term, your definition, chapter number or 0]. */
var GLOSSARY=[
["Big Bang","The early hot, dense state from which the universe expanded and evolved. It was not an explosion into pre-existing empty space.",2],
["Big Bang nucleosynthesis","The first few minutes of cosmic history, when conditions allowed light atomic nuclei such as helium to form.",2],
["Cosmic microwave background (CMB)","Faint microwave radiation released when the early universe cooled enough for light to travel freely, about 380,000 years after the Big Bang.",2],
["Cosmic inflation","A proposed very brief period of extremely rapid expansion in the universe's earliest moments. Its detailed physics remains uncertain.",0],
["Cosmology","The scientific study of the universe as a whole, including its origin, evolution, large-scale structure, and possible future.",1],
["Dark energy","The name given to whatever is driving the observed accelerated expansion of the universe. Its physical nature is still unknown.",0],
["Dark matter","Matter inferred mainly from its gravitational effects that does not emit, absorb, or reflect light in the usual way.",0],
["Expansion of the universe","The increase in distances between sufficiently far-apart, unbound regions of space over cosmic time.",2],
["Galaxy","A large gravitationally bound system of stars, gas, dust, stellar remnants, and dark matter.",0],
["General relativity","Einstein's theory describing gravity as the curvature of spacetime associated with energy and matter.",0],
["Gravitational wave","A travelling disturbance in spacetime produced by accelerating masses; waves from certain compact-object mergers have been detected.",0],
["Light-year","The distance light travels in a vacuum in one year—about 9.46 trillion kilometres. It measures distance, not time.",1],
["Neutron star","An extremely dense stellar remnant formed when the core of a massive star collapses after a supernova or related event.",0],
["Observable universe","The region of the universe from which light or other signals have had time to reach us since the early universe.",1],
["Redshift","A shift of light toward longer wavelengths. Cosmological redshift helps astronomers measure how the universe has expanded.",2],
["Singularity","A feature of some mathematical solutions where quantities become undefined or diverge; it may signal that a theory is being pushed beyond its limits.",3],
["Spacetime","The combined four-dimensional framework of three dimensions of space and one of time used in modern physics.",0],
["Standard cosmological model","The widely used model of cosmic evolution that includes expansion, ordinary matter, dark matter, and dark energy; some details remain unresolved.",0],
["Stellar evolution","The changes a star undergoes over its lifetime as its internal fuel, structure, and energy balance change.",0],
["Supernova","A powerful stellar explosion or related explosive event that can eject material into space and create or disperse elements.",0],
["Universe","All of space and time and the matter and energy within them, as described by our best physical models.",1],
["White dwarf","The compact remnant left by many stars after they exhaust their nuclear fuel and shed their outer layers.",0],
["Quantum gravity","A sought-after framework that would describe gravity consistently with quantum physics, especially in extreme conditions.",3],
["Planck epoch","The earliest interval often discussed in cosmology, when quantum-gravity effects are expected to matter and current theories are insufficient.",3],
["Inflationary evidence","Observations such as the universe's large-scale uniformity and pattern of primordial fluctuations that are consistent with some inflation models but do not settle all questions.",0],
["Observable limit","A boundary set by the finite age of the universe and the speed of light: beyond it, signals have not had time to reach us.",1]
];
var CATS=[["Cosmology","cosmology","Big Bang, inflation, dark matter, dark energy, and the universe's evolution."],["Black Holes and Relativity","black-holes-and-relativity","Black holes, neutron stars, spacetime, gravitational waves, and relativity."],["Stars and Galaxies","stars-and-galaxies","Stellar evolution, supernovae, galaxy formation, and the cosmic web."],["Planetary Science","planetary-science","Planets, exoplanets, moons, atmospheres, and habitability."],["Theoretical Ideas","theoretical-ideas","Propose an idea, explain your reasoning, and invite constructive criticism."],["Questions and Learning","questions-and-learning","Beginners welcome. No question is too basic."],["Astronomy News and Discoveries","astronomy-news-and-discoveries","Recent discoveries, with links to reliable sources."],["Observations and Astrophotography","observations-and-astrophotography","Share your observations, photos, and equipment experiences."]];