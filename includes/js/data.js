/* visual-data-universe — DATA (objects + technical data). Loaded before app.js. */
/* S: an object's technical data.  fields: aka(pseudonyms) code mass mag(magnitude) dist spec(spectral) vis(visibility) ra dec note */
const S=(aka,code,mass,mag,dist,spec,vis,ra,dec,note)=>({aka,code,mass,mag,dist,spec,vis,ra,dec,note});
const C=(note)=>({note});

/* This is a map of real cosmic LOCATIONS — no abstract container.
   The galaxies are the top level; each holds what is IN it (its stars, nebulae, our
   Solar System); the other galaxies and deep-space structures are what is OUT of it.
   The root below is a virtual holder only — it is never drawn as a bubble. */
const DATA={name:"Cosmos",root:true,virtual:true,meta:C("A map of the cosmos by real position."),children:[

/* ============ THE MILKY WAY — our galaxy, and everything inside it ============ */
{name:"Milky Way",type:"galaxy",v:7,meta:S("The Galaxy, Via Lactea","—","~1.5×10¹² M☉","—","We are inside it","SBbc (barred spiral)","Arch across the night sky","17h 45m (centre)","−29° (centre)","Our home galaxy: ~100–400 billion stars in a barred spiral ~100,000 ly across. Everything below is inside it."),children:[
 {name:"Sagittarius A*",type:"blackhole",v:4,meta:S("Sgr A*","—","4.15×10⁶ M☉","—","~26,700 ly","Supermassive black hole","Radio/IR; galactic centre","17h 45m 40s","−29° 00′ 28″","The supermassive black hole at the heart of the Milky Way; imaged in 2022.")},

 {name:"The Solar System",type:"planet",v:5,meta:C("Our star and everything bound to it — one star system in the Milky Way's Orion Arm."),children:[
  {name:"The Sun",type:"star",v:6,meta:S("Sol, Helios","—","1.989×10³⁰ kg (1 M☉)","−26.74","1 AU (8.3 light-min)","G2V (yellow dwarf)","The daytime sky","—","—","Our star; a main-sequence G dwarf, ~4.6 Gyr old, surface 5,778 K.")},
  {name:"Mercury",type:"planet",v:2,meta:S("—","—","3.30×10²³ kg (0.055 M⊕)","−2.6 to 5.7","0.39 AU","—","Twilight, near the Sun","—","—","Smallest planet; scorched, cratered, no atmosphere.")},
  {name:"Venus",type:"planet",v:3,meta:S("Morning/Evening Star","—","4.87×10²⁴ kg (0.815 M⊕)","−4.9","0.72 AU","—","Brightest planet","—","—","Runaway greenhouse; surface ~465 °C under CO₂ clouds.")},
  {name:"Earth",type:"planet",v:4,meta:S("Terra, the Blue Planet","—","5.97×10²⁴ kg (1 M⊕)","—","1 AU (defines it)","—","Home","—","—","The only known life-bearing world."),children:[
   {name:"The Moon",type:"moon",v:2,meta:S("Luna","—","7.35×10²² kg","−12.7","1 AU (384,400 km from Earth)","—","Brightest night-sky object","—","—","Earth's companion; stabilises our axial tilt and drives the tides.")},
  ]},
  {name:"Mars",type:"planet",v:3,meta:S("The Red Planet, Ares","—","6.42×10²³ kg (0.107 M⊕)","−2.9 to 1.9","1.52 AU","—","Reddish 'star'","—","—","Cold desert world; polar caps, Olympus Mons, ancient riverbeds."),children:[
   {name:"Phobos",type:"moon",v:1,meta:S("Mars I","—","1.06×10¹⁶ kg","11.4","1.52 AU","—","Large telescope","—","—","Larger, closer Martian moon; spiralling inward, doomed to break apart.")},
   {name:"Deimos",type:"moon",v:1,meta:S("Mars II","—","1.5×10¹⁵ kg","12.4","1.52 AU","—","Large telescope","—","—","Tiny, distant outer moon of Mars.")},
  ]},
  {name:"Jupiter",type:"planet",v:5,meta:S("Jove","—","1.90×10²⁷ kg (318 M⊕)","−2.9","5.2 AU","—","Very bright","—","—","Largest planet; the Great Red Spot storm; 95+ moons."),children:[
   {name:"Io",type:"moon",v:2,meta:S("Jupiter I","—","8.93×10²² kg","5.0","5.2 AU","—","Telescope","—","—","The most volcanically active body in the Solar System.")},
   {name:"Europa",type:"moon",v:2,meta:S("Jupiter II","—","4.80×10²² kg","5.3","5.2 AU","—","Telescope","—","—","Icy shell over a subsurface ocean — a top target in the search for life.")},
   {name:"Ganymede",type:"moon",v:2,meta:S("Jupiter III","—","1.48×10²³ kg","4.6","5.2 AU","—","Telescope","—","—","Largest moon in the Solar System; has its own magnetic field.")},
   {name:"Callisto",type:"moon",v:1,meta:S("Jupiter IV","—","1.08×10²³ kg","5.7","5.2 AU","—","Telescope","—","—","The most heavily cratered body known.")},
  ]},
  {name:"Saturn",type:"planet",v:4,meta:S("—","—","5.68×10²⁶ kg (95 M⊕)","0.4","9.6 AU","—","Bright; rings in telescope","—","—","Spectacular ice rings; 140+ moons."),children:[
   {name:"Titan",type:"moon",v:2,meta:S("Saturn VI","—","1.35×10²³ kg","8.2","9.6 AU","—","Telescope","—","—","Thick atmosphere; lakes of liquid methane.")},
   {name:"Enceladus",type:"moon",v:1,meta:S("Saturn II","—","1.08×10²⁰ kg","11.7","9.6 AU","—","Telescope","—","—","Ice geysers venting from a subsurface ocean.")},
   {name:"Rhea",type:"moon",v:1,meta:S("Saturn V","—","2.31×10²¹ kg","9.7","9.6 AU","—","Telescope","—","—","Saturn's second-largest moon; icy and heavily cratered.")},
   {name:"Iapetus",type:"moon",v:1,meta:S("Saturn VIII","—","1.81×10²¹ kg","10.2","9.6 AU","—","Telescope","—","—","Two-toned moon — one hemisphere bright, one soot-dark.")},
   {name:"Dione",type:"moon",v:1,meta:S("Saturn IV","—","1.10×10²¹ kg","10.4","9.6 AU","—","Telescope","—","—","Icy moon streaked with wispy fracture cliffs.")},
   {name:"Mimas",type:"moon",v:1,meta:S("Saturn I","—","3.75×10¹⁹ kg","12.9","9.6 AU","—","Telescope","—","—","Bears the huge Herschel crater — the 'Death Star' moon.")},
  ]},
  {name:"Uranus",type:"planet",v:3,meta:S("—","—","8.68×10²⁵ kg (14.5 M⊕)","5.7","19.2 AU","—","Just naked-eye","—","—","Ice giant tilted 98° — it rolls on its side."),children:[
   {name:"Titania",type:"moon",v:1,meta:S("Uranus III","—","3.4×10²¹ kg","13.9","19.2 AU","—","Large telescope","—","—","Uranus's largest moon; canyons and fault scarps.")},
   {name:"Oberon",type:"moon",v:1,meta:S("Uranus IV","—","3.1×10²¹ kg","14.1","19.2 AU","—","Large telescope","—","—","Outermost major Uranian moon; heavily cratered.")},
   {name:"Ariel",type:"moon",v:1,meta:S("Uranus I","—","1.25×10²¹ kg","14.4","19.2 AU","—","Large telescope","—","—","Brightest, youngest-looking Uranian moon.")},
   {name:"Umbriel",type:"moon",v:1,meta:S("Uranus II","—","1.17×10²¹ kg","15.0","19.2 AU","—","Large telescope","—","—","Darkest of Uranus's major moons.")},
   {name:"Miranda",type:"moon",v:1,meta:S("Uranus V","—","6.6×10¹⁹ kg","15.8","19.2 AU","—","Large telescope","—","—","Bizarre patchwork surface with 20-km cliffs (Verona Rupes).")},
  ]},
  {name:"Neptune",type:"planet",v:3,meta:S("—","—","1.02×10²⁶ kg (17 M⊕)","7.8","30.1 AU","—","Telescope only","—","—","Windiest planet; deep blue methane atmosphere."),children:[
   {name:"Triton",type:"moon",v:1,meta:S("Neptune I","—","2.14×10²² kg","13.5","30.1 AU","—","Telescope","—","—","Retrograde orbit; nitrogen geysers; a captured Kuiper-belt object.")},
   {name:"Proteus",type:"moon",v:1,meta:S("Neptune VIII","—","4.4×10¹⁹ kg","19.7","30.1 AU","—","Large telescope","—","—","Dark, boxy moon orbiting just outside the rings.")},
   {name:"Nereid",type:"moon",v:1,meta:S("Neptune II","—","3.1×10¹⁹ kg","19.2","30.1 AU","—","Large telescope","—","—","Wildly eccentric orbit; one of Neptune's outermost moons.")},
  ]},
  {name:"Pluto",type:"dwarf",v:2,meta:S("134340 Pluto","—","1.31×10²² kg","13.65","39.5 AU","—","Large telescope","—","—","Kuiper-belt dwarf planet with a nitrogen-ice heart (Sputnik Planitia)."),children:[
   {name:"Charon",type:"moon",v:1,meta:S("Pluto I","—","1.59×10²¹ kg","16.8","39.5 AU","—","Telescope","—","—","Half Pluto's size — a near-binary system.")},
  ]},
  {name:"Ceres",type:"dwarf",v:2,meta:S("1 Ceres","—","9.4×10²⁰ kg","6.6","2.77 AU","—","Binoculars","—","—","Largest asteroid-belt object; a dwarf planet with briny deposits.")},
  {name:"Eris",type:"dwarf",v:1,meta:S("136199 Eris","—","1.66×10²² kg","18.7","96 AU","—","Large telescope","—","—","Scattered-disc dwarf planet; more massive than Pluto.")},
  {name:"Makemake",type:"dwarf",v:1,meta:S("136472 Makemake","—","~3×10²¹ kg","17.0","45.8 AU","—","Large telescope","—","—","Bright classical Kuiper-belt dwarf planet.")},
  {name:"Asteroid Belt",type:"smallbody",v:3,meta:S("Main belt","—","~3×10²¹ kg (total)","—","2.2–3.2 AU","—","—","—","—","Millions of rocky bodies between Mars and Jupiter.")},
  {name:"Kuiper Belt",type:"smallbody",v:3,meta:S("—","—","—","—","30–50 AU","—","—","—","—","Icy debris disc beyond Neptune; home of Pluto & many dwarfs.")},
  {name:"Oort Cloud",type:"smallbody",v:3,meta:S("—","—","—","—","2,000–100,000 AU","—","—","—","—","Hypothesised spherical shell of comets at the Solar System's edge.")},
  {name:"Halley's Comet",type:"smallbody",v:2,meta:S("1P/Halley","1P","2.2×10¹⁴ kg","—","Elliptical, returns ~76 yr","—","Naked-eye at perihelion","—","—","Most famous periodic comet; next return 2061.")},
  {name:"'Oumuamua",type:"smallbody",v:1,meta:S("1I/'Oumuamua","1I","—","—","Interstellar (passed 2017)","—","Was faint","—","—","First confirmed interstellar object to pass through the Solar System.")},
  {name:"Haumea",type:"dwarf",v:2,meta:S("136108 Haumea","—","4.0×10²¹ kg","17.3","~43 AU","—","Large telescope","—","—","An egg-shaped, fast-spinning Kuiper-belt dwarf planet with a ring and two moons."),children:[
   {name:"Hiʻiaka",type:"moon",v:1,meta:S("Haumea I","—","~1.8×10¹⁹ kg","—","~43 AU","—","Large telescope","—","—","Haumea's larger, outer moon.")},
   {name:"Namaka",type:"moon",v:1,meta:S("Haumea II","—","~1.8×10¹⁸ kg","—","~43 AU","—","Large telescope","—","—","Haumea's smaller, inner moon.")},
  ]},
  {name:"Quaoar",type:"dwarf",v:1,meta:S("50000 Quaoar","—","1.2×10²¹ kg","18.5","43.7 AU","—","Large telescope","—","—","A Kuiper-belt dwarf with a surprising ring far outside its Roche limit.")},
  {name:"Gonggong",type:"dwarf",v:1,meta:S("225088 Gonggong","—","~1.75×10²¹ kg","21.5","67 AU","—","Large telescope","—","—","One of the largest Kuiper-belt bodies; has a moon, Xiangliu.")},
  {name:"Orcus",type:"dwarf",v:1,meta:S("90482 Orcus","—","6.3×10²⁰ kg","19.1","39 AU","—","Large telescope","—","—","An 'anti-Pluto' with a large moon, Vanth.")},
  {name:"Sedna",type:"dwarf",v:2,meta:S("90377 Sedna","—","~10²¹ kg","20.5","~86 AU (out to 937 AU)","—","Large telescope","—","—","A distant red dwarf-planet candidate on an extreme 11,400-year orbit.")},
  {name:"Vesta",type:"smallbody",v:2,meta:S("4 Vesta","—","2.59×10²⁰ kg","5.1","2.36 AU","—","Barely naked-eye","—","—","The brightest asteroid — a protoplanet visited by the Dawn spacecraft.")},
  {name:"Bennu",type:"smallbody",v:1,meta:S("101955 Bennu","—","7.3×10¹⁰ kg","—","~1.1 AU","—","Telescope","—","—","A carbon-rich near-Earth asteroid sampled by OSIRIS-REx in 2020.")},
  {name:"Arrokoth",type:"smallbody",v:1,meta:S("486958 Arrokoth, Ultima Thule","—","~7×10¹⁴ kg","—","44.6 AU","—","Spacecraft only","—","—","A snowman-shaped contact binary — the most distant object ever visited (2019).")},
  {name:"Comet Hale-Bopp",type:"smallbody",v:2,meta:S("C/1995 O1","—","~10¹⁶ kg","−1 (at peak)","Returns in ~2,500 yr","—","Great comet of 1997","—","—","One of the brightest comets of the 20th century — visible to the naked eye for 18 months.")},
  {name:"2I/Borisov",type:"smallbody",v:1,meta:S("Comet Borisov","2I","—","—","Interstellar (passed 2019)","—","Telescope","—","—","The first clearly cometary interstellar visitor to the Solar System.")},
  {name:"3I/ATLAS",type:"smallbody",v:2,meta:S("C/2025 N1 (ATLAS)","3I","—","—","~9.5 au (outbound, Jul 2026)","Interstellar comet — hyperbolic","Telescope","—","—","The third interstellar object ever found (1 July 2025). Perihelion just inside Mars's orbit in Oct 2025 — now crossing Saturn's distance on its way out of the Solar System forever.")},
  {name:"Planet Nine",type:"planet",v:2,meta:S("Planet X (hypothetical)","—","~5–10 M⊕","—","~400–800 AU (proposed)","—","Undetected","—","—","A hypothesised distant giant planet invoked to explain the clustered orbits of far Kuiper-belt objects.")},
 ]},

 {name:"Rigel",type:"star",v:3,meta:S("Beta Orionis","HD 34085","~21 M☉","0.13","~860 ly","B8Ia (blue supergiant)","Bright in Orion","05h 14m 32s","−08° 12′ 06″","Blue supergiant; brightest star in Orion.")},
 {name:"Spica",type:"star",v:2,meta:S("Alpha Virginis","HD 116658","~11 M☉","0.97","~250 ly","B1III-IV","Bright in Virgo","13h 25m 12s","−11° 09′ 41″","Hot binary; a rotating ellipsoidal variable.")},
 {name:"Alnilam",type:"star",v:2,meta:S("Epsilon Orionis","HD 37128","~40 M☉","1.69","~2,000 ly","B0Ia","Orion's Belt (centre)","05h 36m 13s","−01° 12′ 07″","Blue supergiant at the centre of Orion's Belt.")},
 {name:"Sirius",type:"star",v:4,meta:S("Dog Star, Alpha Canis Majoris","HD 48915","2.06 M☉","−1.46","8.6 ly","A1V","Brightest star in the night sky","06h 45m 09s","−16° 42′ 58″","Nearest bright star; a binary with white dwarf Sirius B.")},
 {name:"Vega",type:"star",v:3,meta:S("Alpha Lyrae","HD 172167","2.14 M☉","0.03","25 ly","A0V","Bright; summer sky","18h 36m 56s","+38° 47′ 01″","Former pole star; the standard zero of the magnitude scale.")},
 {name:"Altair",type:"star",v:2,meta:S("Alpha Aquilae","HD 187642","1.79 M☉","0.76","16.7 ly","A7V","Bright; Summer Triangle","19h 50m 47s","+08° 52′ 06″","Rapidly rotating, flattened star.")},
 {name:"Canopus",type:"star",v:2,meta:S("Alpha Carinae","HD 45348","~8 M☉","−0.74","310 ly","A9II (bright giant)","2nd-brightest star","06h 23m 57s","−52° 41′ 44″","Southern beacon used for spacecraft navigation.")},
 {name:"Fomalhaut",type:"star",v:2,meta:S("Alpha Piscis Austrini","HD 216956","1.92 M☉","1.16","25 ly","A3V","Autumn sky","22h 57m 39s","−29° 37′ 20″","Young star with a striking dusty debris ring.")},
 {name:"Alpha Centauri A",type:"star",v:3,meta:S("Rigil Kentaurus","HD 128620","1.1 M☉","−0.01","4.37 ly","G2V","Bright; southern","14h 39m 36s","−60° 50′ 02″","Nearest Sun-like star; in a triple system with Proxima.")},
 {name:"Capella",type:"star",v:2,meta:S("Alpha Aurigae","HD 34029","~2.6 M☉","0.08","42.9 ly","G3III+G0III","Bright; winter sky","05h 16m 41s","+45° 59′ 53″","A pair of yellow giants.")},
 {name:"Arcturus",type:"star",v:3,meta:S("Alpha Boötis","HD 124897","~1.1 M☉","−0.05","36.7 ly","K1.5III (orange giant)","4th-brightest star","14h 15m 40s","+19° 10′ 57″","Nearby red giant racing through the galaxy.")},
 {name:"Aldebaran",type:"star",v:2,meta:S("Alpha Tauri","HD 29139","~1.2 M☉","0.86","65 ly","K5III (orange giant)","Eye of Taurus","04h 35m 55s","+16° 30′ 33″","Orange giant marking the bull's eye.")},
 {name:"Betelgeuse",type:"star",v:4,meta:S("Alpha Orionis","HD 39801","~16 M☉","0.42 (variable)","~640 ly","M1-2Ia-ab (red supergiant)","Bright red in Orion","05h 55m 10s","+07° 24′ 25″","Vast red supergiant; a near-future supernova.")},
 {name:"Antares",type:"star",v:3,meta:S("Alpha Scorpii","HD 148478","~12 M☉","1.06 (variable)","~550 ly","M1.5Iab (red supergiant)","Red heart of Scorpius","16h 29m 24s","−26° 25′ 55″","Red supergiant ~700× the Sun's radius.")},
 {name:"Proxima Centauri",type:"star",v:3,meta:S("Alpha Centauri C","HIP 70890","0.12 M☉","11.13","4.24 ly","M5.5Ve (red dwarf)","Telescope only","14h 29m 43s","−62° 40′ 46″","The closest star to the Sun; hosts Proxima b."),children:[
  {name:"Proxima b",type:"planet",v:2,meta:S("Proxima Centauri b","—","~1.07 M⊕","—","4.24 ly","Rocky (habitable zone)","—","—","—","The nearest known exoplanet to Earth — a rocky world in Proxima's habitable zone.")},
  {name:"Proxima d",type:"planet",v:1,meta:S("Proxima Centauri d","—","~0.26 M⊕","—","4.24 ly","Sub-Earth","—","—","—","A quarter-Earth-mass world skimming close to Proxima.")},
  {name:"Proxima c",type:"planet",v:1,meta:S("Proxima Centauri c","—","~7 M⊕","—","4.24 ly","Super-Earth (cold)","—","—","—","A candidate cold super-Earth far outside the habitable zone.")},
 ]},
 {name:"Alpha Centauri B",type:"star",v:2,meta:S("Toliman","HD 128621","0.91 M☉","1.33","4.37 ly","K1V (orange dwarf)","Bright; southern","14h 39m 35s","−60° 50′ 14″","The Sun-like companion to Alpha Centauri A — together the nearest star system.")},
 {name:"Barnard's Star",type:"star",v:2,meta:S("—","GJ 699","0.16 M☉","9.5","5.96 ly","M4.0V (red dwarf)","Telescope","17h 57m 48s","+04° 41′ 36″","Star with the largest known proper motion — and four confirmed sub-Earth planets (2024–25)."),children:[
  {name:"Barnard b",type:"planet",v:1,meta:S("Barnard's Star b","—","~0.30 M⊕","—","5.96 ly","Sub-Earth","—","—","—","A sub-Earth confirmed in 2024 around our second-closest stellar system.")},
  {name:"Barnard c",type:"planet",v:1,meta:S("Barnard's Star c","—","~0.34 M⊕","—","5.96 ly","Sub-Earth","—","—","—","One of the four tightly packed sub-Earths (confirmed 2025).")},
  {name:"Barnard d",type:"planet",v:1,meta:S("Barnard's Star d","—","~0.26 M⊕","—","5.96 ly","Sub-Earth","—","—","—","One of the four tightly packed sub-Earths (confirmed 2025).")},
  {name:"Barnard e",type:"planet",v:1,meta:S("Barnard's Star e","—","~0.19 M⊕","—","5.96 ly","Sub-Earth","—","—","—","The least massive of Barnard's four planets (confirmed 2025).")},
 ]},
 {name:"VY Canis Majoris",type:"star",v:3,meta:S("VY CMa","HD 58061","~17 M☉","6.5–9.6","~3,900 ly","M3-M5 (red hypergiant)","Telescope","07h 22m 58s","−25° 46′ 03″","One of the largest known stars, ~1,400 solar radii.")},
 {name:"UY Scuti",type:"star",v:3,meta:S("BD-12 5055","—","~7–10 M☉","~9.0","~5,100 ly","M4Ia (red hypergiant)","Telescope","18h 27m 36s","−12° 27′ 59″","A red hypergiant, a candidate for largest known star.")},
 {name:"Polaris",type:"star",v:3,meta:S("The North Star, Alpha Ursae Minoris","HD 8890","~5.4 M☉","1.98","~433 ly","F7Ib (Cepheid)","Marks true north","02h 31m 49s","+89° 15′ 51″","The current northern pole star; a pulsating Cepheid.")},

 {name:"Sirius B",type:"star",v:2,meta:S("The Pup","—","~1.02 M☉","8.44","8.6 ly","DA2 (white dwarf)","Telescope only","06h 45m 09s","−16° 43′","An Earth-sized white dwarf — the dense core of a dead star, orbiting Sirius.")},
 {name:"Crab Pulsar",type:"exotic",v:2,meta:S("PSR B0531+21","—","~1.4 M☉","16.5","~6,500 ly","Neutron star / pulsar","Radio & telescope","05h 34m 32s","+22° 00′ 52″","Spinning 30×/sec; the collapsed core from the supernova seen in 1054, inside the Crab Nebula.")},
 {name:"Cygnus X-1",type:"blackhole",v:2,meta:S("HDE 226868 (companion)","—","~21 M☉","—","~7,200 ly","Stellar black hole (X-ray binary)","X-ray; Cygnus","19h 58m 22s","+35° 12′ 06″","First widely accepted black hole; accretes from a blue supergiant.")},
 {name:"PSR B1919+21",type:"exotic",v:2,meta:S("'LGM-1'","PSR B1919+21","~1.4 M☉","—","~2,300 ly","Pulsar (neutron star)","Radio","19h 21m 45s","+21° 53′","The first pulsar discovered (1967).")},
 {name:"Magnetar SGR 1806−20",type:"exotic",v:2,meta:S("—","SGR 1806−20","~1.4 M☉","—","~50,000 ly","Magnetar","Gamma/X-ray","18h 08m 39s","−20° 24′","Ultra-magnetic neutron star; a 2004 flare briefly outshone the galaxy.")},

 {name:"Orion Nebula",type:"nebula",v:3,meta:S("M42, NGC 1976","M42","~2,000 M☉","4.0","1,344 ly","Emission (H II region)","Naked-eye in Orion's Sword","05h 35m 17s","−05° 23′ 28″","The nearest large star-forming region.")},
 {name:"Eagle Nebula",type:"nebula",v:3,meta:S("M16, Pillars of Creation","M16","—","6.0","~5,700 ly","Emission (H II region)","Telescope; Serpens","18h 18m 48s","−13° 49′","Home of the iconic 'Pillars of Creation'.")},
 {name:"Carina Nebula",type:"nebula",v:2,meta:S("NGC 3372","NGC 3372","—","1.0","~8,500 ly","Emission (H II region)","Southern naked-eye","10h 45m 09s","−59° 52′","Vast star-forming complex; contains Eta Carinae.")},
 {name:"Lagoon Nebula",type:"nebula",v:1,meta:S("M8, NGC 6523","M8","—","6.0","~4,100 ly","Emission (H II region)","Binoculars; Sagittarius","18h 03m 37s","−24° 23′","Bright emission nebula visible to the naked eye.")},
 {name:"Ring Nebula",type:"nebula",v:2,meta:S("M57, NGC 6720","M57","—","8.8","~2,300 ly","Planetary nebula","Telescope; Lyra","18h 53m 35s","+33° 01′ 45″","A dying Sun-like star's glowing ejected shell.")},
 {name:"Helix Nebula",type:"nebula",v:2,meta:S("NGC 7293, 'Eye of God'","NGC 7293","—","7.6","~655 ly","Planetary nebula","Telescope; Aquarius","22h 29m 38s","−20° 50′ 14″","One of the nearest planetary nebulae.")},
 {name:"Cat's Eye Nebula",type:"nebula",v:1,meta:S("NGC 6543","NGC 6543","—","8.1","~3,300 ly","Planetary nebula","Telescope; Draco","17h 58m 33s","+66° 37′ 59″","Intricate concentric shells around a dying star.")},
 {name:"Crab Nebula",type:"nebula",v:3,meta:S("M1, NGC 1952","M1","~4.6 M☉","8.4","~6,500 ly","Supernova remnant","Telescope; Taurus","05h 34m 32s","+22° 00′ 52″","Wreckage of SN 1054; contains the Crab Pulsar.")},
 {name:"Veil Nebula",type:"nebula",v:1,meta:S("Cygnus Loop","NGC 6960/6992","—","7.0","~2,400 ly","Supernova remnant","Telescope; Cygnus","20h 45m","+30° 43′","Filamentary shell from a ~10,000-yr-old supernova.")},
 {name:"Horsehead Nebula",type:"nebula",v:2,meta:S("Barnard 33","B33","—","—","~1,375 ly","Dark nebula","Telescope; Orion","05h 40m 59s","−02° 27′ 30″","A dark dust cloud silhouetted against glowing gas.")},
 {name:"Rosette Nebula",type:"nebula",v:2,meta:S("Caldwell 49, NGC 2237","NGC 2237","~10,000 M☉","4.8","~5,200 ly","Emission (H II region)","Binoculars; Monoceros","06h 33m 45s","+04° 59′ 54″","A huge flower-shaped emission nebula with a young cluster at its heart.")},
 {name:"Trifid Nebula",type:"nebula",v:2,meta:S("M20, NGC 6514","M20","—","6.3","~4,100 ly","Emission + reflection + dark","Telescope; Sagittarius","18h 02m 23s","−23° 01′ 48″","A rare three-in-one — emission, reflection and dark nebula together.")},
 {name:"North America Nebula",type:"nebula",v:2,meta:S("NGC 7000, Caldwell 20","NGC 7000","—","4.0","~2,590 ly","Emission (H II region)","Dark-sky; Cygnus","20h 59m 17s","+44° 31′ 44″","An emission nebula shaped like the continent of North America.")},
 {name:"Boomerang Nebula",type:"nebula",v:2,meta:S("Centaurus Bipolar Nebula","—","—","—","~5,000 ly","Protoplanetary nebula","Telescope; Centaurus","12h 44m 46s","−54° 31′ 13″","The coldest known place in the universe — just 1 K, colder than the CMB.")},
 {name:"Witch Head Nebula",type:"nebula",v:1,meta:S("IC 2118","IC 2118","—","—","~900 ly","Reflection nebula","Telescope; Eridanus","05h 02m 00s","−07° 54′ 00″","A reflection nebula glowing blue by the light of nearby Rigel.")},
 {name:"Coalsack Nebula",type:"nebula",v:2,meta:S("Caldwell 99","—","—","—","~600 ly","Dark nebula","Naked-eye dark patch; Crux","12h 50m 00s","−62° 30′ 00″","The most prominent dark nebula — an ink-black cloud beside the Southern Cross.")},

 /* ---- star clusters within the Milky Way ---- */
 {name:"Pleiades",type:"cluster",v:3,meta:S("M45, Seven Sisters, Subaru","M45","~800 M☉","1.6","444 ly","Open cluster","Naked-eye in Taurus","03h 47m 24s","+24° 07′ 00″","A young open cluster of hot blue stars wrapped in reflection nebulosity.")},
 {name:"Hyades",type:"cluster",v:2,meta:S("Melotte 25, Caldwell 41","—","~400 M☉","0.5","153 ly","Open cluster","Naked-eye; face of Taurus","04h 27m 00s","+15° 52′ 00″","The nearest open cluster to Earth; forms the head of Taurus the Bull.")},
 {name:"Omega Centauri",type:"cluster",v:3,meta:S("NGC 5139, Caldwell 80","NGC 5139","~4×10⁶ M☉","3.9","~17,000 ly","Globular cluster","Naked-eye; southern","13h 26m 47s","−47° 28′ 46″","The largest, brightest globular cluster of the Milky Way — ~10 million stars.")},
 {name:"Messier 13",type:"cluster",v:2,meta:S("Hercules Globular Cluster, NGC 6205","M13","~6×10⁵ M☉","5.8","~22,200 ly","Globular cluster","Faint naked-eye; Hercules","16h 41m 41s","+36° 27′ 37″","~300,000 stars; target of the 1974 Arecibo interstellar radio message.")},
 {name:"47 Tucanae",type:"cluster",v:2,meta:S("NGC 104, Caldwell 106","NGC 104","~7×10⁵ M☉","4.1","~13,000 ly","Globular cluster","Naked-eye; southern","00h 24m 05s","−72° 04′ 53″","The second-brightest globular; a dense core packed with millions of old stars.")},

 /* ---- brown dwarfs (the star / planet borderland) ---- */
 {name:"Luhman 16",type:"brown",v:2,meta:S("WISE 1049−5319","Luhman 16","~0.03 M☉ each","10.7 (IR)","6.5 ly","L7.5 + T0.5 binary","Infrared only","10h 49m 15s","−53° 19′ 06″","The nearest brown dwarfs — a binary, and the third-closest system to the Sun.")},
 {name:"WISE 0855−0714",type:"brown",v:2,meta:S("—","WISE 0855","~5 M♃","25 (IR)","7.4 ly","Y dwarf (~250 K)","Infrared only","08h 55m 10s","−07° 14′ 42″","The coldest known brown dwarf — colder than the freezing point of water.")},
 {name:"Teide 1",type:"brown",v:1,meta:S("—","Teide 1","~0.055 M☉","—","~400 ly","M8 brown dwarf","Telescope; Pleiades","03h 47m 18s","+24° 22′ 31″","The first confirmed brown dwarf (1995), found in the Pleiades.")},

 /* ---- more notable stars ---- */
 {name:"Deneb",type:"star",v:3,meta:S("Alpha Cygni","HD 197345","~19 M☉","1.25","~2,600 ly","A2Ia (blue-white supergiant)","Summer Triangle; Cygnus","20h 41m 26s","+45° 16′ 49″","One of the most luminous stars known — up to ~200,000× the Sun.")},
 {name:"Regulus",type:"star",v:2,meta:S("Alpha Leonis","HD 87901","~3.8 M☉","1.35","79 ly","B8IVn","Bright; heart of Leo","10h 08m 22s","+11° 58′ 02″","A fast-spinning blue star flattened into an ellipsoid.")},
 {name:"Pollux",type:"star",v:2,meta:S("Beta Geminorum","HD 62509","~1.9 M☉","1.14","33.8 ly","K0III (orange giant)","Bright; Gemini","07h 45m 19s","+28° 01′ 34″","The nearest giant star to the Sun; hosts a confirmed planet."),children:[
  {name:"Pollux b",type:"planet",v:1,meta:S("Thestias","—","~2.3 M♃","—","33.8 ly","Gas giant (exoplanet)","—","—","—","A gas giant orbiting the nearest giant star to the Sun.")},
 ]},
 {name:"Mira",type:"star",v:2,meta:S("Omicron Ceti","HD 14386","~1.2 M☉","2.0–10.1 (variable)","~300 ly","M7IIIe (red giant)","Naked-eye near maximum","02h 19m 21s","−02° 58′ 39″","The prototype long-period variable; a pulsating red giant with a comet-like tail.")},
 {name:"Algol",type:"star",v:2,meta:S("Beta Persei, the Demon Star","HD 19356","~3.7 M☉","2.1–3.4 (eclipsing)","90 ly","B8V + K0IV","Naked-eye; Perseus","03h 08m 10s","+40° 57′ 20″","The prototype eclipsing binary — it dims every 2.87 days as its companion crosses.")},
 {name:"Eta Carinae",type:"star",v:3,meta:S("Foramen","HD 93308","~100 + 30 M☉","4.5 (variable)","~7,500 ly","LBV (luminous blue variable)","Southern; in the Carina Nebula","10h 45m 04s","−59° 41′ 04″","A hypergiant binary that nearly exploded in 1843; a prime supernova candidate.")},
 {name:"Stephenson 2-18",type:"star",v:3,meta:S("St2-18, RSGC2-18","—","—","~15 (IR)","~19,000 ly","M6 (red supergiant)","Infrared; Scutum","18h 39m 02s","−06° 05′ 11″","A candidate for the largest known star — around 2,150 solar radii.")},
 {name:"Tabby's Star",type:"star",v:2,meta:S("Boyajian's Star, KIC 8462852","KIC 8462852","~1.4 M☉","11.7","~1,470 ly","F3V","Telescope; Cygnus","20h 06m 15s","+44° 27′ 25″","Famous for bizarre, irregular dimmings — dust clouds, most likely (not aliens).")},
 {name:"Methuselah Star",type:"star",v:2,meta:S("HD 140283","HD 140283","~0.8 M☉","7.2","~200 ly","subgiant (metal-poor)","Telescope; Libra","15h 43m 03s","−10° 56′ 01″","One of the oldest known stars — ~13–14 billion years, nearly as old as the cosmos.")},
 {name:"Wolf 359",type:"star",v:1,meta:S("CN Leonis","Wolf 359","0.09 M☉","13.5","7.86 ly","M6V (red dwarf)","Telescope only; Leo","10h 56m 29s","+07° 00′ 53″","One of the nearest and faintest stars — a flaring red dwarf.")},

 /* ---- exoplanet systems (other stars and their worlds) ---- */
 {name:"TRAPPIST-1",type:"star",v:3,meta:S("2MASS J23062928−0502285","TRAPPIST-1","0.09 M☉","18.8 (IR)","40.7 ly","M8V (ultracool red dwarf)","Infrared only; Aquarius","23h 06m 29s","−05° 02′ 29″","An ultracool dwarf with SEVEN Earth-sized planets — three in the habitable zone."),children:[
  {name:"TRAPPIST-1 b",type:"planet",v:1,meta:S("—","—","~1.37 M⊕","—","40.7 ly","Rocky (hot)","—","—","—","Innermost of the seven; scorching hot.")},
  {name:"TRAPPIST-1 c",type:"planet",v:1,meta:S("—","—","~1.31 M⊕","—","40.7 ly","Rocky","—","—","—","A hot Venus-like rocky world.")},
  {name:"TRAPPIST-1 d",type:"planet",v:1,meta:S("—","—","~0.39 M⊕","—","40.7 ly","Rocky","—","—","—","On the inner edge of the habitable zone.")},
  {name:"TRAPPIST-1 e",type:"planet",v:2,meta:S("—","—","~0.69 M⊕","—","40.7 ly","Rocky (habitable zone)","—","—","—","The most likely of the seven to hold liquid water.")},
  {name:"TRAPPIST-1 f",type:"planet",v:1,meta:S("—","—","~0.68 M⊕","—","40.7 ly","Rocky (habitable zone)","—","—","—","A temperate world in the habitable zone.")},
  {name:"TRAPPIST-1 g",type:"planet",v:1,meta:S("—","—","~1.34 M⊕","—","40.7 ly","Rocky (habitable zone)","—","—","—","Largest of the seven; in the habitable zone.")},
  {name:"TRAPPIST-1 h",type:"planet",v:1,meta:S("—","—","~0.33 M⊕","—","40.7 ly","Rocky (cold)","—","—","—","Outermost and coldest of the seven.")},
 ]},
 {name:"51 Pegasi",type:"star",v:2,meta:S("Helvetios","51 Peg","~1.1 M☉","5.49","50.6 ly","G2IV","Naked-eye; Pegasus","22h 57m 28s","+20° 46′ 08″","The first Sun-like star found to host an exoplanet (1995)."),children:[
  {name:"51 Pegasi b",type:"planet",v:2,meta:S("Dimidium","—","~0.47 M♃","—","50.6 ly","Hot Jupiter","—","—","—","The first exoplanet discovered around a Sun-like star — a roasting 'hot Jupiter'.")},
 ]},
 {name:"Kepler-452",type:"star",v:2,meta:S("—","Kepler-452","~1.04 M☉","13.4","~1,800 ly","G2V","Telescope; Cygnus","19h 44m 01s","+44° 16′ 39″","A Sun-like star hosting 'Earth's cousin'."),children:[
  {name:"Kepler-452b",type:"planet",v:2,meta:S("Earth's Cousin","—","~5 M⊕","—","~1,800 ly","Super-Earth (habitable zone)","—","—","—","A super-Earth in the habitable zone of a Sun-like star.")},
 ]},
 {name:"HD 209458",type:"star",v:2,meta:S("—","HD 209458","~1.1 M☉","7.65","159 ly","G0V","Telescope; Pegasus","22h 03m 11s","+18° 53′ 04″","Host of the first exoplanet seen transiting and the first with a detected atmosphere."),children:[
  {name:"HD 209458 b",type:"planet",v:2,meta:S("Osiris","—","~0.69 M♃","—","159 ly","Hot Jupiter (evaporating)","—","—","—","The first exoplanet caught transiting; its atmosphere is boiling away.")},
 ]},
 {name:"HR 8799",type:"star",v:2,meta:S("—","HR 8799","~1.5 M☉","5.96","135 ly","F0 (λ Boötis)","Telescope; Pegasus","23h 07m 29s","+21° 08′ 03″","The first planetary system ever directly imaged (2008)."),children:[
  {name:"HR 8799 e",type:"planet",v:1,meta:S("—","—","~7 M♃","—","135 ly","Directly imaged gas giant","—","—","—","Innermost of the four young giants photographed orbiting HR 8799.")},
  {name:"HR 8799 d",type:"planet",v:1,meta:S("—","—","~7 M♃","—","135 ly","Directly imaged gas giant","—","—","—","Second of the four directly imaged giants.")},
  {name:"HR 8799 c",type:"planet",v:1,meta:S("—","—","~7 M♃","—","135 ly","Directly imaged gas giant","—","—","—","Third of the four directly imaged giants — its atmosphere shows water and carbon monoxide.")},
  {name:"HR 8799 b",type:"planet",v:1,meta:S("—","—","~5 M♃","—","135 ly","Directly imaged gas giant","—","—","—","Outermost of the four — it orbits farther out than Pluto.")},
 ]},
 {name:"55 Cancri",type:"star",v:2,meta:S("Copernicus (55 Cnc A)","55 Cnc","~0.9 M☉","5.95","41 ly","K0IV-V","Naked-eye; Cancer","08h 52m 36s","+28° 19′ 51″","Hosts five planets, including a famous scorched super-Earth."),children:[
  {name:"55 Cancri e",type:"planet",v:1,meta:S("Janssen","—","~8 M⊕","—","41 ly","Lava super-Earth","—","—","—","A super-Earth so hot its surface may be molten lava.")},
  {name:"55 Cancri b",type:"planet",v:1,meta:S("Galileo","—","~0.8 M♃","—","41 ly","Hot Jupiter","—","—","—","The system's first-found planet (1996).")},
  {name:"55 Cancri c",type:"planet",v:1,meta:S("Brahe","—","~0.17 M♃","—","41 ly","Gas giant","—","—","—","A Saturn-mass world in a mildly eccentric orbit.")},
  {name:"55 Cancri f",type:"planet",v:1,meta:S("Harriot","—","~0.14 M♃","—","41 ly","Gas giant (habitable zone)","—","—","—","A gas giant crossing the habitable zone.")},
  {name:"55 Cancri d",type:"planet",v:1,meta:S("Lipperhey","—","~3.9 M♃","—","41 ly","Cold gas giant","—","—","—","The outer giant — a Jupiter analogue at 5.5 au.")},
 ]},
 {name:"PSR B1257+12",type:"exotic",v:2,meta:S("Lich","PSR B1257+12","~1.4 M☉","—","~2,300 ly","Millisecond pulsar","Radio; Virgo","13h 00m 03s","+12° 40′ 57″","Around this dead star the FIRST exoplanets were ever discovered (1992)."),children:[
  {name:"Poltergeist",type:"planet",v:1,meta:S("PSR B1257+12 c","—","~4.3 M⊕","—","~2,300 ly","Pulsar planet","—","—","—","One of the first exoplanets ever found — orbiting a pulsar's deadly radiation.")},
  {name:"Draugr",type:"planet",v:1,meta:S("PSR B1257+12 b","—","~0.02 M⊕","—","~2,300 ly","Pulsar planet","—","—","—","The least massive exoplanet known — twice the mass of the Moon.")},
  {name:"Phobetor",type:"planet",v:1,meta:S("PSR B1257+12 d","—","~3.9 M⊕","—","~2,300 ly","Pulsar planet","—","—","—","The outer of the three planets orbiting the Lich pulsar.")},
 ]},

 /* ---- more notable planetary systems (NASA Exoplanet Archive) ---- */
 {name:"Kepler-90",type:"star",v:2,meta:S("—","KOI-351","~1.1 M☉","14.0","~2,840 ly","G0V","Telescope; Draco","18h 57m 44s","+49° 18′ 19″","The only star known to host EIGHT planets — tied with the Sun."),children:[
  {name:"Kepler-90 b",type:"planet",v:1,meta:S("—","—","1.31 R⊕","—","~2,840 ly","Rocky (hot)","—","—","—","Innermost of the eight — a hot super-Earth.")},
  {name:"Kepler-90 c",type:"planet",v:1,meta:S("—","—","1.19 R⊕","—","~2,840 ly","Rocky (hot)","—","—","—","Second of the eight.")},
  {name:"Kepler-90 i",type:"planet",v:1,meta:S("—","—","1.32 R⊕","—","~2,840 ly","Rocky (hot)","—","—","—","The eighth planet — found by a Google neural network in Kepler data (2017).")},
  {name:"Kepler-90 d",type:"planet",v:1,meta:S("—","—","2.87 R⊕","—","~2,840 ly","Sub-Neptune","—","—","—","A sub-Neptune, third from the star.")},
  {name:"Kepler-90 e",type:"planet",v:1,meta:S("—","—","2.66 R⊕","—","~2,840 ly","Sub-Neptune","—","—","—","A sub-Neptune in the packed middle of the system.")},
  {name:"Kepler-90 f",type:"planet",v:1,meta:S("—","—","2.88 R⊕","—","~2,840 ly","Sub-Neptune","—","—","—","A sub-Neptune — the system is a compressed copy of ours.")},
  {name:"Kepler-90 g",type:"planet",v:1,meta:S("—","—","8.1 R⊕","—","~2,840 ly","Gas giant","—","—","—","The inner of the two outer giants.")},
  {name:"Kepler-90 h",type:"planet",v:1,meta:S("—","—","11.3 R⊕","—","~2,840 ly","Gas giant","—","—","—","A Jupiter-sized giant at an Earth-like distance.")},
 ]},
 {name:"Kepler-11",type:"star",v:2,meta:S("—","KIC 6541920","~0.96 M☉","14.2","~2,150 ly","G6V","Telescope; Cygnus","19h 48m 28s","+41° 54′ 33″","Six transiting planets — the most tightly packed system found by Kepler."),children:[
  {name:"Kepler-11 b",type:"planet",v:1,meta:S("—","—","1.8 R⊕","—","~2,150 ly","Super-Earth","—","—","—","Innermost of six planets all orbiting closer than Venus.")},
  {name:"Kepler-11 c",type:"planet",v:1,meta:S("—","—","2.9 R⊕","—","~2,150 ly","Sub-Neptune","—","—","—","Second of the six.")},
  {name:"Kepler-11 d",type:"planet",v:1,meta:S("—","—","3.1 R⊕","—","~2,150 ly","Sub-Neptune","—","—","—","Third of the six.")},
  {name:"Kepler-11 e",type:"planet",v:1,meta:S("—","—","4.2 R⊕","—","~2,150 ly","Sub-Neptune","—","—","—","Fourth and puffiest of the six.")},
  {name:"Kepler-11 f",type:"planet",v:1,meta:S("—","—","2.5 R⊕","—","~2,150 ly","Sub-Neptune","—","—","—","Fifth of the six.")},
  {name:"Kepler-11 g",type:"planet",v:1,meta:S("—","—","3.3 R⊕","—","~2,150 ly","Sub-Neptune","—","—","—","Outermost of the six — still inside Venus's orbit.")},
 ]},
 {name:"Kepler-16",type:"star",v:2,meta:S("—","KIC 12644769","0.69+0.20 M☉","12.0","245 ly","K5V + M dwarf binary","Telescope; Cygnus","19h 16m 18s","+51° 45′ 27″","An eclipsing binary — home of the first confirmed 'Tatooine' planet."),children:[
  {name:"Kepler-16b",type:"planet",v:2,meta:S("Tatooine","—","~0.33 M♃","—","245 ly","Circumbinary gas giant","—","—","—","The first confirmed planet orbiting TWO suns — its sky has a double sunset.")},
 ]},
 {name:"Kepler-186",type:"star",v:2,meta:S("—","KIC 8120608","~0.54 M☉","14.6","~580 ly","M1V (red dwarf)","Telescope; Cygnus","19h 54m 37s","+43° 57′ 18″","Host of the first Earth-SIZE planet found in a habitable zone."),children:[
  {name:"Kepler-186f",type:"planet",v:2,meta:S("—","—","1.17 R⊕","—","~580 ly","Earth-size (habitable zone)","—","—","—","The first Earth-size world found in another star's habitable zone (2014).")},
 ]},
 {name:"Kepler-444",type:"star",v:2,meta:S("—","HIP 94931","~0.76 M☉","8.9","117 ly","K0V","Telescope; Lyra","19h 19m 01s","+41° 38′ 05″","The oldest known planetary system — 11.2 billion years, from the Galaxy's dawn."),children:[
  {name:"Kepler-444 b",type:"planet",v:1,meta:S("—","—","0.40 R⊕","—","117 ly","Sub-Earth (ancient)","—","—","—","Mercury-sized; formed when the Universe was a fifth of its current age.")},
  {name:"Kepler-444 c",type:"planet",v:1,meta:S("—","—","0.50 R⊕","—","117 ly","Sub-Earth (ancient)","—","—","—","Second of the five ancient worlds.")},
  {name:"Kepler-444 d",type:"planet",v:1,meta:S("—","—","0.53 R⊕","—","117 ly","Sub-Earth (ancient)","—","—","—","Third of the five ancient worlds.")},
  {name:"Kepler-444 e",type:"planet",v:1,meta:S("—","—","0.55 R⊕","—","117 ly","Sub-Earth (ancient)","—","—","—","Fourth of the five ancient worlds.")},
  {name:"Kepler-444 f",type:"planet",v:1,meta:S("—","—","0.74 R⊕","—","117 ly","Sub-Earth (ancient)","—","—","—","Outermost of the five — all orbit closer than Mercury.")},
 ]},
 {name:"Kepler-1625",type:"star",v:2,meta:S("—","KIC 4760478","~1.0 M☉","15.8","~8,000 ly","G (subgiant)","Telescope; Cygnus","19h 41m 43s","+39° 53′ 11″","Home of the best exoMOON candidate yet found."),children:[
  {name:"Kepler-1625b",type:"planet",v:2,meta:S("—","—","~11.4 R⊕","—","~8,000 ly","Gas giant","—","—","—","A Jupiter-sized planet that may host a Neptune-sized moon."),children:[
   {name:"Kepler-1625b-i (candidate)",type:"moon",v:1,meta:S("candidate exomoon","—","~4 R⊕","—","~8,000 ly","Exomoon candidate","—","—","—","The best exomoon candidate known — a possible Neptune-sized moon (unconfirmed).")},
  ]},
 ]},
 {name:"TOI-700",type:"star",v:2,meta:S("—","TIC 150428135","~0.42 M☉","13.1","101.4 ly","M2V (red dwarf)","Telescope; Dorado","06h 28m 23s","−65° 34′ 43″","TESS's first Earth-size habitable-zone discoveries orbit this quiet red dwarf."),children:[
  {name:"TOI-700 d",type:"planet",v:2,meta:S("—","—","1.19 R⊕","—","101.4 ly","Earth-size (habitable zone)","—","—","—","TESS's first Earth-size habitable-zone planet (2020).")},
  {name:"TOI-700 e",type:"planet",v:1,meta:S("—","—","0.95 R⊕","—","101.4 ly","Earth-size (habitable zone)","—","—","—","A second Earth-size world in the same habitable zone (2023).")},
 ]},
 {name:"K2-18",type:"star",v:2,meta:S("—","EPIC 201912552","~0.44 M☉","13.5","124 ly","M2.5V (red dwarf)","Telescope; Leo","11h 30m 14s","+07° 35′ 18″","Its planet K2-18b is JWST's most debated possible ocean world."),children:[
  {name:"K2-18b",type:"planet",v:2,meta:S("—","—","2.61 R⊕","—","124 ly","Hycean candidate (habitable zone)","—","—","—","A possible ocean-covered 'hycean' world — JWST saw methane, CO₂ and a disputed biosignature hint.")},
 ]},
 {name:"PDS 70",type:"star",v:2,meta:S("—","V1032 Centauri","~0.76 M☉","12.0","370 ly","K7 (T Tauri, pre-main-sequence)","Telescope; Centaurus","14h 08m 10s","−41° 23′ 53″","The only place we have PHOTOGRAPHED planets still forming in their birth disc."),children:[
  {name:"PDS 70 b",type:"planet",v:2,meta:S("—","—","~3 M♃","—","370 ly","Protoplanet (forming)","—","—","—","The first newborn planet ever imaged (2018) — still accreting gas inside the disc gap.")},
  {name:"PDS 70 c",type:"planet",v:1,meta:S("—","—","~3 M♃","—","370 ly","Protoplanet (forming)","—","—","—","A second forming giant, feeding from its own moon-forming disc.")},
 ]},
 {name:"Beta Pictoris",type:"star",v:2,meta:S("—","HD 39060","~1.75 M☉","3.86","63.4 ly","A6V","Naked-eye; Pictor","05h 47m 17s","−51° 03′ 59″","A young star ringed by the archetypal debris disc, with two directly imaged giants."),children:[
  {name:"Beta Pictoris b",type:"planet",v:2,meta:S("—","—","~11.7 M♃","—","63.4 ly","Directly imaged gas giant","—","—","—","A young super-Jupiter photographed sweeping through the famous debris disc.")},
  {name:"Beta Pictoris c",type:"planet",v:1,meta:S("—","—","~8.9 M♃","—","63.4 ly","Gas giant","—","—","—","An inner giant found by the wobble of its star.")},
 ]},
 {name:"HD 189733",type:"star",v:2,meta:S("—","V452 Vulpeculae","~0.85 M☉","7.65","64.5 ly","K1.5V","Binoculars; Vulpecula","20h 00m 43s","+22° 42′ 39″","Host of the best-studied hot Jupiter."),children:[
  {name:"HD 189733 b",type:"planet",v:2,meta:S("—","—","~1.13 M♃","—","64.5 ly","Hot Jupiter","—","—","—","The deep-blue planet — its colour comes from silicate glass raining sideways in 8,700 km/h winds.")},
 ]},
 {name:"KELT-9",type:"star",v:2,meta:S("—","HD 195689","~2.5 M☉","7.56","~670 ly","A0/B9.5","Binoculars; Cygnus","20h 31m 26s","+39° 56′ 20″","Host of the hottest planet known."),children:[
  {name:"KELT-9b",type:"planet",v:2,meta:S("—","—","~2.9 M♃","—","~670 ly","Ultra-hot Jupiter","—","—","—","The hottest known planet — its 4,300 °C dayside is hotter than many stars; iron vaporises in its air.")},
 ]},
 {name:"WASP-76",type:"star",v:2,meta:S("—","BD+01 316","~1.5 M☉","9.5","~640 ly","F7V","Telescope; Pisces","01h 46m 32s","+02° 42′ 02″","Host of the planet where it rains molten iron."),children:[
  {name:"WASP-76b",type:"planet",v:2,meta:S("—","—","~0.92 M♃","—","~640 ly","Ultra-hot Jupiter","—","—","—","Iron vaporises on its dayside and condenses into molten-iron rain on the night side.")},
 ]},
 {name:"Teegarden's Star",type:"star",v:2,meta:S("—","SO J025300.5+165258","~0.09 M☉","15.1","12.5 ly","M7V (ultracool red dwarf)","Large telescope; Aries","02h 53m 01s","+16° 52′ 53″","A feeble nearby dwarf with two of the most Earth-like planets known."),children:[
  {name:"Teegarden b",type:"planet",v:2,meta:S("—","—","~1.05 M⊕","—","12.5 ly","Earth-mass (habitable zone)","—","—","—","One of the most Earth-like planets known — Earth's mass, in the habitable zone, 12.5 ly away.")},
  {name:"Teegarden c",type:"planet",v:1,meta:S("—","—","~1.1 M⊕","—","12.5 ly","Earth-mass (habitable zone)","—","—","—","A second temperate Earth-mass world of the same star.")},
 ]},
 {name:"GJ 1214",type:"star",v:2,meta:S("—","Gliese 1214","~0.18 M☉","14.7","47.8 ly","M4.5V (red dwarf)","Telescope; Ophiuchus","17h 15m 19s","+04° 57′ 50″","Host of the archetypal steam-world mini-Neptune."),children:[
  {name:"GJ 1214 b",type:"planet",v:2,meta:S("—","—","2.7 R⊕","—","47.8 ly","Mini-Neptune (steam world)","—","—","—","The archetypal water world — likely wrapped in a thick steamy atmosphere.")},
 ]},
 {name:"LHS 1140",type:"star",v:2,meta:S("—","GJ 3053","~0.18 M☉","14.2","48.8 ly","M4.5V (red dwarf)","Telescope; Cetus","00h 44m 59s","−15° 16′ 18″","Its habitable-zone super-Earth may be a global ocean world."),children:[
  {name:"LHS 1140 b",type:"planet",v:2,meta:S("—","—","1.73 R⊕","—","48.8 ly","Super-Earth (habitable zone)","—","—","—","JWST hints this habitable-zone world could be covered by a global ocean.")},
  {name:"LHS 1140 c",type:"planet",v:1,meta:S("—","—","1.27 R⊕","—","48.8 ly","Rocky (hot)","—","—","—","A hot inner rocky companion.")},
 ]},
 {name:"Gliese 667 C",type:"star",v:2,meta:S("—","GJ 667 C","~0.31 M☉","10.2","23.6 ly","M1.5V (red dwarf)","Telescope; Scorpius","17h 18m 57s","−34° 59′ 23″","The smallest member of a triple star, with a habitable-zone super-Earth."),children:[
  {name:"Gliese 667 Cc",type:"planet",v:2,meta:S("—","—","~3.8 M⊕","—","23.6 ly","Super-Earth (habitable zone)","—","—","—","A super-Earth in the habitable zone — its sky holds three suns.")},
 ]},
 {name:"Epsilon Eridani",type:"star",v:2,meta:S("Ran","HD 22049","~0.82 M☉","3.73","10.5 ly","K2V","Naked-eye; Eridanus","03h 32m 56s","−09° 27′ 30″","The nearest single star with a confirmed planet — a young Jupiter analogue."),children:[
  {name:"Epsilon Eridani b",type:"planet",v:2,meta:S("Ægir","—","~0.66 M♃","—","10.5 ly","Jupiter analogue","—","—","—","A young Jupiter orbiting at Jupiter-like distance — a snapshot of our own system's youth.")},
 ]},
 {name:"Tau Ceti",type:"star",v:2,meta:S("—","HD 10700","~0.78 M☉","3.50","11.9 ly","G8.5V","Naked-eye; Cetus","01h 44m 04s","−15° 56′ 15″","The nearest single Sun-like star — long a target in the search for life."),children:[
  {name:"Tau Ceti e (candidate)",type:"planet",v:1,meta:S("—","—","~3.9 M⊕","—","11.9 ly","Super-Earth candidate","—","—","—","A candidate super-Earth on the habitable zone's warm edge (unconfirmed).")},
  {name:"Tau Ceti f (candidate)",type:"planet",v:1,meta:S("—","—","~3.9 M⊕","—","11.9 ly","Super-Earth candidate","—","—","—","A candidate super-Earth on the habitable zone's cool edge (unconfirmed).")},
 ]},

 /* ---- more compact objects & landmark events in the Milky Way ---- */
 {name:"Hulse–Taylor Binary",type:"exotic",v:2,meta:S("PSR B1913+16","PSR B1913+16","2 × ~1.4 M☉","—","~21,000 ly","Binary pulsar","Radio; Aquila","19h 15m 28s","+16° 06′ 27″","Two neutron stars whose decaying orbit proved gravitational waves exist (Nobel 1993).")},
 {name:"Vela Pulsar",type:"exotic",v:2,meta:S("PSR B0833−45","—","~1.4 M☉","23.6 (optical)","~960 ly","Pulsar (neutron star)","Radio/gamma; Vela","08h 35m 21s","−45° 10′ 35″","A young pulsar in the Vela supernova remnant, spinning 11 times a second.")},
]},

/* ============ OTHER GALAXIES — what is out of the Milky Way ============ */
{name:"Andromeda Galaxy",type:"galaxy",v:5,meta:S("M31, NGC 224","M31","~1.5×10¹² M☉","3.44","2.54 Mly","SA(s)b (spiral)","Naked-eye smudge in Andromeda","00h 42m 44s","+41° 16′ 09″","Nearest major galaxy; will merge with the Milky Way in ~4.5 Gyr."),children:[
 {name:"Andromeda's Black Hole",type:"blackhole",v:2,meta:S("P2 / M31*","—","~1.4×10⁸ M☉","—","2.54 Mly","Supermassive black hole","IR; Andromeda's core","00h 42m 44s","+41° 16′ 09″","The supermassive black hole at Andromeda's heart, wrapped in a double stellar nucleus.")},
 {name:"PA-99-N2 b (candidate)",type:"planet",v:1,meta:S("—","PA-99-N2","~6.3 M♃ (if a planet)","—","2.5 Mly","Planet candidate · microlensing","One-off lensing event; M31 disc","00h 44m 21s","+41° 28′ 45″","A gravitational-microlensing anomaly toward Andromeda best explained by a ~6 Jupiter-mass companion (An+ 2004) — one of only a handful of extragalactic planet candidates, and unrepeatable by nature.")},
 {name:"Messier 32",type:"galaxy",v:2,meta:S("M32, NGC 221","M32","~3×10⁹ M☉","8.1","2.49 Mly","cE2 (compact elliptical)","Telescope; beside Andromeda","00h 42m 42s","+40° 51′ 55″","A compact elliptical satellite galaxy orbiting Andromeda.")},
 {name:"Messier 110",type:"galaxy",v:2,meta:S("M110, NGC 205","M110","~1.5×10¹⁰ M☉","8.9","2.69 Mly","E6p (dwarf elliptical)","Telescope; beside Andromeda","00h 40m 22s","+41° 41′ 07″","A dwarf elliptical satellite of Andromeda.")},
 {name:"Mayall II (G1)",type:"cluster",v:1,meta:S("G1, Mayall II","—","~10⁷ M☉","13.7","2.5 Mly","Globular cluster","Large telescope","00h 32m 47s","+39° 34′ 40″","The most luminous globular cluster in the Local Group, orbiting Andromeda.")},
]},
{name:"Triangulum Galaxy",type:"galaxy",v:3,meta:S("M33, NGC 598","M33","~5×10¹⁰ M☉","5.72","2.73 Mly","SA(s)cd (spiral)","Faint naked-eye in dark skies","01h 33m 51s","+30° 39′ 37″","Third-largest galaxy of our Local Group."),children:[
 {name:"NGC 604",type:"nebula",v:2,meta:S("—","NGC 604","~10⁵ M☉","—","2.73 Mly","Emission (H II region)","In Triangulum","01h 34m 33s","+30° 47′ 00″","One of the largest known star-forming regions — ~1,500 ly across, in Triangulum.")},
 {name:"M33 X-7",type:"blackhole",v:1,meta:S("—","M33 X-7","~15.6 M☉","—","2.73 Mly","Stellar black hole (eclipsing)","X-ray; Triangulum","01h 33m 34s","+30° 32′ 00″","A heavy stellar black hole in an eclipsing binary within Triangulum.")},
]},
{name:"Large Magellanic Cloud",type:"galaxy",v:3,meta:S("LMC","—","~1×10¹⁰ M☉","0.9","163,000 ly","SB(s)m (irregular)","Bright in the southern sky","05h 23m 34s","−69° 45′","A satellite galaxy of the Milky Way; hosted SN 1987A."),children:[
 {name:"Tarantula Nebula",type:"nebula",v:3,meta:S("30 Doradus, NGC 2070","NGC 2070","~10⁶ M☉","8.0","~160,000 ly","Emission (H II region)","Southern; in the LMC","05h 38m 38s","−69° 05′ 42″","The largest and most active star-forming region known — the powerhouse of the LMC.")},
 {name:"R136a1",type:"star",v:3,meta:S("RMC 136a1","R136a1","~196 M☉","12.8","~160,000 ly","WN5h (Wolf-Rayet)","In the Tarantula Nebula","05h 38m 42s","−69° 06′ 03″","The most massive star known — around 200× the Sun, blazing in the Tarantula Nebula.")},
 {name:"SN 1987A",type:"nebula",v:2,meta:S("Supernova 1987A","SN 1987A","—","3 (at peak)","~168,000 ly","Type II supernova remnant","Was naked-eye (1987)","05h 35m 28s","−69° 16′ 11″","The nearest observed supernova since 1604 — its expanding wreckage sits in the LMC.")},
]},
{name:"Small Magellanic Cloud",type:"galaxy",v:2,meta:S("SMC","NGC 292","~7×10⁹ M☉","2.7","200,000 ly","SB(s)m pec (irregular)","Southern sky","00h 52m 38s","−72° 48′","Dwarf irregular satellite galaxy of the Milky Way."),children:[
 {name:"NGC 346",type:"nebula",v:1,meta:S("—","NGC 346","—","10.3","~200,000 ly","Emission (H II region)","In the SMC","00h 59m 05s","−72° 10′ 00″","The brightest star-forming region in the Small Magellanic Cloud.")},
]},
{name:"Whirlpool Galaxy",type:"galaxy",v:3,meta:S("M51a, NGC 5194","M51","~1.6×10¹¹ M☉","8.4","31 Mly","SA(s)bc pec","Telescope; Canes Venatici","13h 29m 53s","+47° 11′ 43″","Classic grand-design spiral interacting with NGC 5195."),children:[
 {name:"NGC 5195",type:"galaxy",v:1,meta:S("—","NGC 5195","—","10.5","31 Mly","Dwarf companion galaxy","Telescope; Canes Venatici","13h 29m 59s","+47° 15′ 58″","The small companion galaxy tugging at the Whirlpool's spiral arms.")},
 {name:"Whirlpool's Black Hole",type:"blackhole",v:1,meta:S("—","—","~10⁶ M☉","—","31 Mly","Supermassive black hole","Radio; Whirlpool core","13h 29m 53s","+47° 11′ 43″","The active black hole at the centre of the Whirlpool, marked by an X-shaped dust structure.")},
 {name:"M51-ULS-1 b (candidate)",type:"planet",v:1,meta:S("—","M51-ULS-1b","unknown (Saturn-sized)","—","28 Mly","Planet candidate · X-ray transit","Chandra X-ray dip, 2012","13h 29m 43s","+47° 11′ 35″","The first planet candidate seen in another galaxy — a Saturn-sized body that eclipsed an X-ray binary in the Whirlpool (Di Stefano+ 2021). Unconfirmable soon: its next transit is due in ~70 years.")},
]},
{name:"Pinwheel Galaxy",type:"galaxy",v:2,meta:S("M101, NGC 5457","M101","~1×10¹² M☉","7.86","20.9 Mly","SAB(rs)cd","Telescope; Ursa Major","14h 03m 12s","+54° 20′ 57″","A large, near face-on spiral galaxy."),children:[
 {name:"NGC 5461",type:"nebula",v:1,meta:S("—","NGC 5461","—","—","20.9 Mly","Emission (H II region)","In a Pinwheel arm","14h 03m 41s","+54° 19′ 00″","A giant star-forming region strung along one of the Pinwheel's spiral arms.")},
]},
{name:"Sombrero Galaxy",type:"galaxy",v:2,meta:S("M104, NGC 4594","M104","~8×10¹¹ M☉","8.98","29.3 Mly","SA(s)a","Telescope; Virgo","12h 39m 59s","−11° 37′ 23″","Bright bulge & dark dust lane; hosts a billion-solar-mass black hole."),children:[
 {name:"Sombrero's Black Hole",type:"blackhole",v:2,meta:S("—","—","~1×10⁹ M☉","—","29.3 Mly","Supermassive black hole","Inferred; Sombrero core","12h 39m 59s","−11° 37′ 23″","One of the most massive black holes in the nearby universe, in the Sombrero's glowing nucleus.")},
]},
{name:"Cigar Galaxy",type:"galaxy",v:2,meta:S("M82, NGC 3034","M82","~10¹⁰ M☉","8.41","11.5 Mly","I0 (starburst)","Telescope; Ursa Major","09h 55m 52s","+69° 40′ 47″","The archetypal starburst galaxy."),children:[
 {name:"M82 X-1",type:"blackhole",v:1,meta:S("—","M82 X-1","~400 M☉","—","11.5 Mly","Intermediate-mass black hole","X-ray; M82","09h 55m 50s","+69° 40′ 47″","A rare intermediate-mass black hole candidate in the starburst galaxy M82.")},
]},
{name:"Centaurus A",type:"galaxy",v:2,meta:S("NGC 5128","NGC 5128","~10¹² M☉","6.84","12 Mly","S0 pec (peculiar)","Southern telescope","13h 25m 28s","−43° 01′ 09″","Nearest radio galaxy; jets from a supermassive black hole."),children:[
 {name:"Centaurus A — Black Hole & Jet",type:"blackhole",v:2,meta:S("—","—","~5.5×10⁷ M☉","—","12 Mly","Supermassive black hole + relativistic jet","Radio/X-ray","13h 25m 28s","−43° 01′ 09″","An active black hole firing a relativistic jet over a million light-years long.")},
]},
{name:"Messier 87",type:"galaxy",v:4,meta:S("M87, Virgo A, NGC 4486","M87","~2.4×10¹² M☉","8.6","53.5 Mly","E0 (elliptical)","Telescope; Virgo","12h 30m 49s","+12° 23′ 28″","Giant elliptical galaxy ruling the Virgo Cluster."),children:[
 {name:"M87*",type:"blackhole",v:3,meta:S("Pōwehi","—","6.5×10⁹ M☉","—","53.5 Mly","Supermassive black hole","Event Horizon Telescope","12h 30m 49s","+12° 23′ 28″","The supermassive black hole at M87's core — the first black hole ever imaged (2019).")},
]},
{name:"Bode's Galaxy",type:"galaxy",v:3,meta:S("M81, NGC 3031","M81","~10¹¹ M☉","6.94","11.8 Mly","SA(s)ab (spiral)","Binoculars; Ursa Major","09h 55m 33s","+69° 03′ 55″","A grand-design spiral that anchors the nearby M81 Group; a neighbour of the Cigar Galaxy."),children:[
 {name:"Bode's Black Hole",type:"blackhole",v:1,meta:S("—","—","~7×10⁷ M☉","—","11.8 Mly","Supermassive black hole","Inferred; M81 core","09h 55m 33s","+69° 03′ 55″","The supermassive black hole anchoring the bright nucleus of Bode's Galaxy.")},
]},
{name:"Black Eye Galaxy",type:"galaxy",v:2,meta:S("M64, NGC 4826, Evil Eye","M64","—","8.52","17 Mly","(R)SA(rs)ab","Telescope; Coma Berenices","12h 56m 44s","+21° 40′ 58″","A dark band of dust across its bright nucleus gives it a 'black eye'."),children:[
 {name:"Black Eye — Counter-rotating Disc",type:"nebula",v:1,meta:S("—","—","—","—","17 Mly","Dust & gas disc","In M64's nucleus","12h 56m 44s","+21° 40′ 58″","The famous dark dust band — an inner gas disc rotating opposite to the rest of the galaxy.")},
]},
{name:"Antennae Galaxies",type:"galaxy",v:2,meta:S("NGC 4038 / 4039","NGC 4038","—","10.3","~45 Mly","Colliding spirals","Telescope; Corvus","12h 01m 53s","−18° 52′ 10″","Two galaxies mid-collision, flinging out long tidal 'antennae' of stars and gas."),children:[
 {name:"NGC 4038",type:"galaxy",v:1,meta:S("—","NGC 4038","—","—","~45 Mly","Colliding spiral","In the Antennae","12h 01m 53s","−18° 52′ 10″","One of the two colliding galaxies forming the Antennae.")},
 {name:"NGC 4039",type:"galaxy",v:1,meta:S("—","NGC 4039","—","—","~45 Mly","Colliding spiral","In the Antennae","12h 01m 54s","−18° 53′ 06″","The second of the two colliding galaxies forming the Antennae.")},
]},
{name:"Hoag's Object",type:"galaxy",v:2,meta:S("PGC 54559","—","—","16.0","~600 Mly","Ring galaxy","Telescope; Serpens","15h 17m 14s","+21° 35′ 08″","A near-perfect ring of young blue stars around a golden core — a cosmic bullseye.")},
{name:"IC 1101",type:"galaxy",v:4,meta:S("—","IC 1101","~10¹⁵ M☉","14.7","~1.04 Gly","Supergiant elliptical (cD)","Telescope; Serpens","15h 10m 56s","+05° 44′ 41″","One of the largest known galaxies — up to ~50× the Milky Way's diameter."),children:[
 {name:"IC 1101 — Central Black Hole",type:"blackhole",v:2,meta:S("—","—","~4×10¹⁰ M☉","—","~1.04 Gly","Ultramassive black hole","Inferred; IC 1101 core","15h 10m 56s","+05° 44′ 41″","One of the most massive black holes known, ruling the heart of this giant galaxy.")},
]},
{name:"Sagittarius Dwarf",type:"galaxy",v:2,meta:S("Sgr dSph, SagDEG","—","~10⁸ M☉","—","~65,000 ly","Dwarf spheroidal","Behind the galactic centre","18h 55m 20s","−30° 28′ 43″","A dwarf galaxy currently being torn apart and swallowed by the Milky Way."),children:[
 {name:"Messier 54",type:"cluster",v:1,meta:S("M54, NGC 6715","M54","~10⁶ M☉","7.6","~87,000 ly","Globular cluster","Telescope; Sagittarius","18h 55m 03s","−30° 28′ 42″","A globular cluster that is actually the dense nucleus of the Sagittarius Dwarf galaxy.")},
]},
{name:"RX J1131−1231",type:"exotic",v:2,meta:S("—","RX J1131−1231","planet-mass bodies: ~Moon → Jupiter","—","~3.5 Gly (lens z≈0.30)","Quasar lens · rogue-planet population","Chandra microlensing signal","11h 31m 52s","−12° 31′ 57″","Microlensing flickers in this quadruply-lensed quasar imply ~2,000 unbound planet-mass objects per main-sequence star in the lensing galaxy — the only planet-mass detection beyond the Local Group (Dai & Guerras 2018).")},
{name:"GN-z11",type:"galaxy",v:3,meta:S("—","GN-z11","~10⁹ M☉","~26 (very faint)","~13.4 Gly (z≈11)","—","Hubble/JWST only","12h 36m 25s","+62° 14′","One of the most distant galaxies known; seen ~400 Myr after the Big Bang.")},
{name:"JADES-GS-z14-0",type:"galaxy",v:3,meta:S("—","JADES-GS-z14-0","—","~30 (JWST)","~13.5 Gly (z≈14.3)","—","JWST only","03h 32m 20s","−27° 47′","Held the cosmic distance record until MoM-z14 (2025) — seen ~290 million years after the Big Bang.")},
{name:"MoM-z14",type:"galaxy",v:3,meta:S("—","MoM-z14","—","~27 (JWST)","~13.53 Gly (z=14.44)","—","JWST only; COSMOS field","10h 00m 22.40s","+02° 16′ 23.2″","The most distant confirmed galaxy — seen just ~280 million years after the Big Bang, and only ~240 light-years across. Naidu et al. 2025/26.")},

/* ============ DEEP-SPACE STRUCTURES — the space between the galaxies ============ */
{name:"Great Attractor",type:"structure",v:4,meta:S("—","—","~10¹⁶ M☉","—","~250 Mly","Norma (hidden by Milky Way)","Inferred by galaxy flow","16h 15m","−60°","A gravitational anomaly pulling our whole neighbourhood at ~600 km/s.")},
{name:"Virgo Cluster",type:"structure",v:4,meta:S("—","—","~1.2×10¹⁵ M☉","—","~53.8 Mly","~1,300 galaxies","Virgo","12h 27m","+12° 43′","The nearest large galaxy cluster; heart of our Local Supercluster.")},
{name:"Coma Cluster",type:"structure",v:3,meta:S("Abell 1656","—","~7×10¹⁴ M☉","—","~321 Mly","~1,000 galaxies","Coma Berenices","12h 59m","+27° 59′","Rich cluster where dark matter was first inferred (Zwicky, 1933).")},
{name:"Sloan Great Wall",type:"structure",v:3,meta:S("—","—","—","—","~1 billion ly length","Wall of galaxies","—","—","—","One of the largest known structures — a filament of galaxies ~1.4 billion ly long.")},
{name:"Boötes Void",type:"structure",v:3,meta:S("The Great Nothing","—","—","—","~700 Mly","Near-empty region","Boötes","14h 50m","+46°","A ~330-Mly bubble of almost empty space, with very few galaxies.")},
{name:"3C 273",type:"exotic",v:3,meta:S("—","3C 273","~8.9×10⁸ M☉","12.9","~2.4 Gly","Quasar (AGN)","Telescope; Virgo","12h 29m 07s","+02° 03′ 09″","The first quasar identified — a brilliant, distant galactic nucleus.")},
{name:"TON 618",type:"blackhole",v:3,meta:S("—","TON 618","~6.6×10¹⁰ M☉","15.9 (quasar)","~10.4 Gly","Ultramassive black hole / quasar","Telescope only","12h 28m 24s","+31° 28′ 38″","One of the most massive black holes known — ~66 billion M☉.")},
{name:"EUCL J1729+6410",type:"blackhole",v:3,meta:S("EUCL J172902.75+641018.1","Euclid QSO z=7.77","—","—","~13.1 Gly","Quasar (AGN), z = 7.77","Euclid space telescope","17h 29m 02.75s","+64° 10′ 18.1″","The most ancient quasar known (July 2026) — shining when the Universe was just 670 million years old. Euclid discovery, Yang et al. 2026.")},
{name:"EUCL J1253+7054",type:"blackhole",v:3,meta:S("EUCL J125308.55+705432.3","Euclid QSO z=7.69","—","—","~13.1 Gly","Quasar (AGN), z = 7.69","Euclid space telescope","12h 53m 08.55s","+70° 54′ 32.3″","Second most ancient quasar known — one of 31 early quasars found by Euclid (12 at z ≥ 7). Yang et al. 2026.")},
{name:"GW150914",type:"exotic",v:2,meta:S("—","GW150914","36+29 → 62 M☉","—","~1.3 Gly","Black-hole merger (gravitational wave)","LIGO (2015)","—","—","The first direct detection of gravitational waves.")},
{name:"Cosmic Microwave Background",type:"cosmology",v:5,meta:S("CMB, relic radiation","—","—","—","~13.8 Gly (surface of last scattering)","—","All-sky (microwave)","—","—","The afterglow of the Big Bang, 2.725 K — the light horizon that surrounds everything.")},

/* ---- our place in the large-scale structure, and the record-holders ---- */
{name:"Local Group",type:"structure",v:4,meta:S("—","—","~2×10¹² M☉","—","~10 Mly across","~80 galaxies","—","—","—","Our own galaxy cluster — the Milky Way, Andromeda, Triangulum and dozens of dwarf galaxies.")},
{name:"Virgo Supercluster",type:"structure",v:4,meta:S("Local Supercluster","—","~10¹⁵ M☉","—","~110 Mly across","~100 galaxy groups","Virgo","12h 27m","+12° 43′","The supercluster that contains the Local Group — itself just a lobe of Laniakea.")},
{name:"Laniakea Supercluster",type:"structure",v:5,meta:S("'Immeasurable heaven'","—","~10¹⁷ M☉","—","Centre ~250 Mly","~100,000 galaxies","Southern sky","10h 32m","−46°","Our home supercluster, mapped by galaxy flow in 2014 — the Milky Way sits at its far edge.")},
{name:"Shapley Supercluster",type:"structure",v:4,meta:S("SCl 124","—","~10¹⁶ M☉","—","~650 Mly","~8,000 galaxies","Centaurus","13h 25m","−30° 00′","The largest concentration of galaxies in the nearby universe.")},
{name:"Bullet Cluster",type:"structure",v:3,meta:S("1E 0657-56","—","—","—","~3.7 Gly","Colliding galaxy clusters","X-ray; Carina","06h 58m 37s","−55° 57′ 00″","Two clusters caught colliding — the clearest direct evidence that dark matter is real.")},
{name:"KBC Void",type:"structure",v:3,meta:S("Local Hole, Keenan–Barger–Cowie Void","—","—","—","We sit near its centre","~2 billion ly across","—","—","—","A vast underdense bubble the Milky Way lies near the middle of — perhaps the largest known void.")},
{name:"Hercules–Corona Borealis Great Wall",type:"structure",v:4,meta:S("Her–CrB GW","—","—","—","~10 Gly","~10 billion ly long","Hercules / Corona Borealis","—","—","The largest known structure in the universe, spanning ~10% of the observable cosmos.")},

/* Dark matter, dark energy & antimatter are NOT bubbles — they have no single place.
   They are rendered as volumetric fields (a dark-matter web with halos, a dark-energy
   haze, sparse antimatter flecks) in app.js buildDarkFields(). */

]};

/* ===================== COLOUR PALETTE ===================== */
const TYPES={
 root:{c:"#ffffff",label:"The Cosmos"},
 structure:{c:"#e9c46a",label:"Cosmic structure"},
 galaxy:{c:"#c8b6ff",label:"Galaxy"},
 cluster:{c:"#a9e5ff",label:"Star cluster"},
 brown:{c:"#c77b52",label:"Brown dwarf"},
 star:{c:"#ffd27f",label:"Star"},
 planet:{c:"#5aa9e6",label:"Planet"},
 moon:{c:"#c8ccd4",label:"Moon"},
 dwarf:{c:"#b7a17e",label:"Dwarf planet"},
 smallbody:{c:"#7fe0d4",label:"Asteroid / comet"},
 nebula:{c:"#ff6ec7",label:"Nebula"},
 blackhole:{c:"#ff8c42",label:"Black hole"},
 exotic:{c:"#67e8f9",label:"Neutron star / quasar"},
 dark:{c:"#8b7bd8",label:"Dark / non-baryonic"},
 cosmology:{c:"#8ce99a",label:"Cosmology"}
};
/* star colour by spectral class (O B A F G K M) */
const SPEC={O:"#9bb0ff",B:"#aabfff",A:"#cad7ff",F:"#f4f6ff",G:"#ffe9a8",K:"#ffc078",M:"#ff8c6b"};

/* ===================== TRUE PHYSICAL DIAMETER (km) — drives bubble size (log-scaled in app.js) =====================
   For stars/BHs = physical/event-horizon diameter; for nebulae/clusters/galaxies/structures = spatial extent;
   for belts/clouds = extent of the region. Anything omitted falls back to a per-type default. */
const SIZES={
 /* --- Solar System: Sun, planets, moons --- */
 "The Sun":1.392e6,"The Solar System":1.5e13,
 "Mercury":4879,"Venus":12104,"Earth":12742,"Mars":6779,"Jupiter":139820,"Saturn":116460,"Uranus":50724,"Neptune":49244,
 "The Moon":3475,"Phobos":22,"Deimos":12,"Io":3643,"Europa":3122,"Ganymede":5268,"Callisto":4821,
 "Titan":5150,"Enceladus":504,"Rhea":1528,"Iapetus":1469,"Dione":1123,"Mimas":396,
 "Titania":1578,"Oberon":1523,"Ariel":1158,"Umbriel":1169,"Miranda":471,
 "Triton":2707,"Proteus":420,"Nereid":340,"Charon":1212,"Hiʻiaka":320,"Namaka":170,
 /* --- dwarf planets & small bodies (belts/clouds sized by extent) --- */
 "Pluto":2377,"Ceres":940,"Eris":2326,"Makemake":1430,"Haumea":1600,"Quaoar":1110,"Gonggong":1230,"Orcus":910,"Sedna":1000,
 "Vesta":525,"Bennu":0.49,"Arrokoth":36,"Halley's Comet":11,"'Oumuamua":0.2,"Comet Hale-Bopp":60,"2I/Borisov":1,"3I/ATLAS":5,
 "Asteroid Belt":1.5e8,"Kuiper Belt":3e9,"Oort Cloud":1.5e13,"Planet Nine":40000,
 /* --- exoplanets --- */
 "Proxima b":14000,"Pollux b":170000,"Poltergeist":15000,
 "TRAPPIST-1 b":14000,"TRAPPIST-1 c":13600,"TRAPPIST-1 d":9600,"TRAPPIST-1 e":11600,"TRAPPIST-1 f":12500,"TRAPPIST-1 g":13500,"TRAPPIST-1 h":9800,
 "51 Pegasi b":190000,"Kepler-452b":20000,"HD 209458 b":190000,"HR 8799 e":170000,"55 Cancri e":24000,
 /* completed & new planetary systems (NASA Exoplanet Archive) */
 "HR 8799 b":171000,"HR 8799 c":186000,"HR 8799 d":171000,
 "55 Cancri b":170000,"55 Cancri c":110000,"55 Cancri f":115000,"55 Cancri d":150000,
 "Draugr":7000,"Phobetor":16000,"Proxima c":25000,"Proxima d":8000,
 "Barnard b":9500,"Barnard c":10000,"Barnard d":9000,"Barnard e":8500,
 "Kepler-90":1.67e6,"Kepler-90 b":16700,"Kepler-90 c":15200,"Kepler-90 i":16800,"Kepler-90 d":36600,"Kepler-90 e":33900,"Kepler-90 f":36700,"Kepler-90 g":103000,"Kepler-90 h":144000,
 "Kepler-11":1.48e6,"Kepler-11 b":23000,"Kepler-11 c":37000,"Kepler-11 d":39600,"Kepler-11 e":53600,"Kepler-11 f":31900,"Kepler-11 g":42100,
 "Kepler-16":9.1e5,"Kepler-16b":105000,"Kepler-186":7.2e5,"Kepler-186f":14900,
 "Kepler-444":1.05e6,"Kepler-444 b":5100,"Kepler-444 c":6400,"Kepler-444 d":6800,"Kepler-444 e":7000,"Kepler-444 f":9400,
 "Kepler-1625":2.5e6,"Kepler-1625b":145000,"Kepler-1625b-i (candidate)":49000,
 "TOI-700":5.8e5,"TOI-700 d":15200,"TOI-700 e":12100,"K2-18":6.1e5,"K2-18b":33300,
 "PDS 70":1.75e6,"PDS 70 b":250000,"PDS 70 c":250000,
 "Beta Pictoris":2.5e6,"Beta Pictoris b":209000,"Beta Pictoris c":170000,
 "HD 189733":1.05e6,"HD 189733 b":161000,"KELT-9":3.3e6,"KELT-9b":270000,"WASP-76":2.4e6,"WASP-76b":262000,
 "Teegarden's Star":1.6e5,"Teegarden b":13000,"Teegarden c":13500,
 "GJ 1214":2.9e5,"GJ 1214 b":34400,"LHS 1140":2.9e5,"LHS 1140 b":22000,"LHS 1140 c":16200,
 "Gliese 667 C":5.8e5,"Gliese 667 Cc":19000,"Epsilon Eridani":1.03e6,"Epsilon Eridani b":140000,
 "Tau Ceti":1.1e6,"Tau Ceti e (candidate)":20000,"Tau Ceti f (candidate)":20000,
 /* --- stars (physical diameter) --- */
 "Rigel":1.09e8,"Spica":9.7e6,"Alnilam":4.2e7,"Sirius":2.4e6,"Vega":3.3e6,"Altair":2.5e6,"Canopus":9.9e7,"Fomalhaut":2.6e6,
 "Alpha Centauri A":1.7e6,"Alpha Centauri B":1.2e6,"Capella":1.7e7,"Tau Ceti":1.1e6,"Arcturus":3.5e7,"Aldebaran":6.1e7,
 "Betelgeuse":1.06e9,"Antares":9.5e8,"Proxima Centauri":2.1e5,"Barnard's Star":2.6e5,"VY Canis Majoris":1.98e9,"UY Scuti":2.38e9,
 "Polaris":6.4e7,"Sirius B":1.17e4,"Deneb":2.83e8,"Regulus":4.3e6,"Pollux":1.22e7,"Mira":4.6e8,"Algol":3.8e6,
 "Eta Carinae":3.3e8,"Stephenson 2-18":2.99e9,"Tabby's Star":2.2e6,"Methuselah Star":3.1e6,"Wolf 359":2.2e5,"R136a1":5.4e7,"The Sun ":1.392e6,
 "TRAPPIST-1":1.63e5,"51 Pegasi":1.77e6,"Kepler-452":1.55e6,"HD 209458":1.67e6,"HR 8799":2.0e6,"Gliese 581":4.2e5,"55 Cancri":1.31e6,"WASP-12":2.31e6,
 /* --- brown dwarfs --- */
 "Luhman 16":1.4e5,"WISE 0855−0714":1.0e5,"Teide 1":1.5e5,
 /* --- compact objects & black holes (event-horizon / neutron-star diameter) --- */
 "Sagittarius A*":2.4e7,"M87*":3.8e10,"TON 618":3.9e11,"Cygnus X-1":124,"GW150914":370,"3C 273":5.2e9,
 "EUCL J1729+6410":5e9,"EUCL J1253+7054":5e9,
 "Crab Pulsar":24,"PSR B1919+21":24,"Magnetar SGR 1806−20":24,"Hulse–Taylor Binary":24,"Vela Pulsar":24,"PSR B1257+12":24,
 /* --- nebulae (extent) --- */
 "Orion Nebula":2.3e14,"Eagle Nebula":6.6e14,"Carina Nebula":2.8e15,"Lagoon Nebula":5.2e14,"Ring Nebula":9.5e12,"Helix Nebula":2.7e13,
 "Cat's Eye Nebula":4.7e12,"Crab Nebula":1.0e14,"Veil Nebula":1.0e15,"Horsehead Nebula":3.3e13,"Rosette Nebula":1.2e15,"Trifid Nebula":4.0e14,
 "North America Nebula":9.5e14,"Boomerang Nebula":1.9e13,"Witch Head Nebula":4.7e14,"Coalsack Nebula":2.8e14,"Tarantula Nebula":5.7e15,"SN 1987A":9.5e12,
 /* --- star clusters (extent) --- */
 "Pleiades":1.4e14,"Hyades":1.4e14,"Omega Centauri":1.4e15,"Messier 13":1.4e15,"47 Tucanae":1.1e15,
 /* --- galaxies (extent) --- */
 "Milky Way":9.5e17,"Andromeda Galaxy":2.1e18,"Triangulum Galaxy":5.7e17,"Large Magellanic Cloud":1.3e17,"Small Magellanic Cloud":6.6e16,
 "Whirlpool Galaxy":7.2e17,"Pinwheel Galaxy":1.6e18,"Sombrero Galaxy":4.6e17,"Cigar Galaxy":3.5e17,"Centaurus A":5.7e17,"Messier 87":1.1e18,
 "Bode's Galaxy":8.5e17,"Black Eye Galaxy":5.1e17,"Antennae Galaxies":5e18,"Hoag's Object":1.1e18,"IC 1101":3.8e19,"Sagittarius Dwarf":9.5e16,
 "GN-z11":7.6e16,"JADES-GS-z14-0":1.5e16,"MoM-z14":2.3e15,"M51-ULS-1 b (candidate)":116000,"PA-99-N2 b (candidate)":160000,"RX J1131−1231":1e13,
 /* member/satellite galaxies added from catalogues */
 "NGC 5195":1.4e17,"Messier 32":6.2e16,"Messier 110":1.6e17,"Leo I":1.9e16,"Barnard's Galaxy":7e16,"IC 1613":7e16,
 "Messier 49":1.5e18,"Messier 60":1.1e18,"Messier 84":1e18,"Messier 86":1.4e18,
 "NGC 4889":2.9e18,"NGC 4874":1.9e18,"NGC 4839":5.7e17,"NGC 4038":4.7e17,"NGC 4039":4.7e17,
 /* notable galaxies (true optical diameter; Alcyoneus/Hercules A = radio-lobe extent) */
 "Sculptor Galaxy":8.5e17,"Southern Pinwheel":5.2e17,"IC 342":7.1e17,"Circinus Galaxy":3.5e17,
 "Messier 94":4.7e17,"Messier 106":1.3e18,"Fireworks Galaxy":3.8e17,"Whale Galaxy":1.3e18,
 "Sunflower Galaxy":9.3e17,"Phantom Galaxy":9e17,"Messier 65":8.5e17,"Messier 66":9e17,"NGC 3628":9.5e17,
 "Needle Galaxy":1.7e18,"Messier 77":8.5e17,"NGC 1365":1.9e18,"NGC 1300":1e18,
 "Messier 100":1e18,"Messier 99":6.6e17,"Messier 90":1.6e18,"Messier 85":1.2e18,"Messier 61":9.5e17,"Messier 58":9e17,
 "Wolf–Lundmark–Melotte":7.6e16,"NGC 4921":1.9e18,"Dragonfly 44":2.8e17,
 "Condor Galaxy":4.9e18,"Rubin's Galaxy":4.4e18,"Mice Galaxies":9.5e17,"Stephan's Quintet":2.8e18,
 "Tadpole Galaxy":3.7e18,"Cartwheel Galaxy":1.4e18,"Malin 1":6.1e18,"Hercules A":1.4e19,"Alcyoneus":1.5e20,
 /* --- large-scale structure (extent) --- */
 "Great Attractor":2.8e21,"Virgo Cluster":1.4e20,"Coma Cluster":1.9e20,"Sloan Great Wall":1.3e22,"Boötes Void":3.1e21,
 "Local Group":9.5e19,"Virgo Supercluster":1.0e21,"Laniakea Supercluster":4.9e21,"Shapley Supercluster":6.1e21,
 "Bullet Cluster":5.7e19,"KBC Void":1.9e22,"Hercules–Corona Borealis Great Wall":9.5e22,"Cosmic Microwave Background":8.8e23
};
/* fallback diameter (km) by type for anything not listed above */
const SIZE_DEFAULT={moon:2000,planet:12000,dwarf:1400,smallbody:40,star:1.4e6,brown:1.4e5,cluster:1e15,nebula:3e14,galaxy:8e17,blackhole:1e8,exotic:24,structure:1e21,cosmology:8e23};
