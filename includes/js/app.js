/* visual-data-universe — GRAPH LOGIC (depends on globals from data.js) */
window.addEventListener('error',function(e){ if(e.filename && e.filename.indexOf('3d-force-graph')>-1){ e.preventDefault(); return true; } },true);

/* ---- colour of a node (stars coloured by spectral class) ---- */
function nodeColor(n){
  if(n.type==='star' && n.meta && n.meta.spec && n.meta.spec!=='—'){ const k=n.meta.spec.trim()[0]; if(SPEC[k]) return SPEC[k]; }
  return (TYPES[n.type]||TYPES.root).c;
}

/* ===================== FLATTEN TREE ===================== */
let NODES=[], LINKS=[], byId={}; let uid=0;
function walk(n,parent,type,depth){
  const t = n.root?"root":(n.type||type);
  const id="n"+(uid++);
  const isObj = !!(n.meta && n.meta.code);   // objects carry a catalogue 'code'; grouping nodes don't
  const node={ id, name:n.name, depth,
    kind: n.root?"root":(n.children? (isObj?"object":(depth===1?"cat":"subcat")) : "leaf"),
    type:t, meta:n.meta||null,
    v: n.v || (n.root?34 : depth===1?15 : depth===2?9 : 5),
    parent: parent?parent.id:null, childIds:[], collapsed:true };
  byId[id]=node; NODES.push(node);
  if(parent){ LINKS.push({source:parent.id,target:id}); parent.childIds.push(id); }
  (n.children||[]).forEach(c=>walk(c,node,t,depth+1));
  return node;
}
/* ===================== ASSEMBLE THE REAL COSMIC-WEB CONTAINMENT HIERARCHY =====================
   Reorganise the flat object list into: Laniakea → Virgo Supercluster → {Virgo Cluster, Local Group,
   nearby galaxies} → galaxies → …; add real member galaxies so clusters are worth entering. */
(function nest(){
  const by={}; DATA.children.forEach(n=>by[n.name]=n); const g=n=>by[n];
  const setKids=(name,arr)=>{ const c=g(name); if(c) c.children=arr.map(x=>typeof x==="string"?g(x):x).filter(Boolean); };
  const GX=(name,aka,code,mass,mag,dist,spec,ra,dec,note)=>({name,type:"galaxy",meta:S(aka,code,mass,mag,dist,spec,"Telescope",ra,dec,note)});
  setKids("Virgo Cluster",["Messier 87",
    GX("Messier 49","M49, NGC 4472","M49","~2×10¹² M☉","8.4","56 Mly","E2 elliptical","12h 29m 47s","+08° 00′ 02″","The brightest galaxy of the Virgo Cluster."),
    GX("Messier 60","M60, NGC 4649","M60","~10¹² M☉","8.8","55 Mly","E2 elliptical","12h 43m 40s","+11° 33′ 09″","A giant elliptical paired with a spiral neighbour."),
    GX("Messier 84","M84, NGC 4374","M84","—","9.1","60 Mly","E1 / S0","12h 25m 04s","+12° 53′ 13″","An elliptical anchoring Markarian's Chain in Virgo."),
    GX("Messier 86","M86, NGC 4406","M86","—","8.9","52 Mly","lenticular S0","12h 26m 12s","+12° 56′ 46″","Blueshifted — it is falling through the cluster toward us."),
    GX("Messier 100","M100, NGC 4321","M100","—","10.1","55 Mly","SAB(s)bc spiral","12h 22m 55s","+15° 49′ 21″","A grand-design spiral in Virgo — one of the first galaxies whose Cepheids Hubble Space Telescope resolved."),
    GX("Messier 99","Coma Pinwheel","M99","—","10.4","50 Mly","SA(s)c spiral","12h 18m 50s","+14° 24′ 59″","A face-on spiral with one arm unwound by a past encounter."),
    GX("Messier 90","M90, NGC 4569","M90","—","10.3","59 Mly","SAB(rs)ab spiral","12h 36m 50s","+13° 09′ 46″","Blueshifted like M86 — it is swinging through the cluster toward us."),
    GX("Messier 85","M85, NGC 4382","M85","—","10.0","60 Mly","S0 lenticular","12h 25m 24s","+18° 11′ 28″","The northernmost bright member of the Virgo Cluster."),
    GX("Messier 61","M61, NGC 4303","M61","—","10.2","52.5 Mly","SAB(rs)bc spiral","12h 21m 55s","+04° 28′ 25″","A starburst spiral with eight observed supernovae."),
    GX("Messier 58","M58, NGC 4579","M58","—","10.5","62 Mly","SAB(rs)b spiral","12h 37m 44s","+11° 49′ 05″","Once the most distant object Messier had catalogued.")]);
  setKids("Local Group",["Milky Way","Andromeda Galaxy","Triangulum Galaxy","Large Magellanic Cloud","Small Magellanic Cloud","Sagittarius Dwarf",
    GX("Leo I","Regulus Dwarf","—","~2×10⁷ M☉","11.2","~820,000 ly","dwarf spheroidal","10h 08m 27s","+12° 18′ 27″","A dwarf galaxy beside the star Regulus — a distant Milky Way satellite."),
    GX("Barnard's Galaxy","NGC 6822","NGC 6822","~10⁹ M☉","9.3","~1.6 Mly","irregular IB(s)m","19h 44m 56s","−14° 47′ 21″","A nearby dwarf irregular galaxy of the Local Group."),
    GX("IC 1613","—","IC 1613","~10⁸ M☉","9.2","~2.4 Mly","dwarf irregular","01h 04m 48s","+02° 07′ 04″","A faint, gas-rich dwarf irregular in the Local Group."),
    GX("Wolf–Lundmark–Melotte","WLM","DDO 221","~4×10⁸ M☉","11.0","3.04 Mly","dwarf irregular","00h 01m 58s","−15° 27′ 39″","An isolated dwarf on the far edge of the Local Group — it has evolved alone for billions of years.")]);
  setKids("Virgo Supercluster",["Virgo Cluster","Local Group","Whirlpool Galaxy","Pinwheel Galaxy","Sombrero Galaxy","Cigar Galaxy","Centaurus A","Bode's Galaxy","Black Eye Galaxy","Antennae Galaxies",
    GX("Sculptor Galaxy","Silver Coin","NGC 253","~4×10¹⁰ M☉","8.0","11.4 Mly","SAB(s)c starburst","00h 47m 33s","−25° 17′ 18″","A dusty starburst spiral — the brightest member of the Sculptor Group."),
    GX("Southern Pinwheel","M83","NGC 5236","—","7.5","15 Mly","SAB(s)c spiral","13h 37m 01s","−29° 51′ 57″","A face-on barred spiral with six recorded supernovae — a record shared with NGC 6946."),
    GX("IC 342","The Hidden Galaxy","IC 342","—","9.1","10.7 Mly","SAB(rs)cd spiral","03h 46m 48s","+68° 05′ 46″","A sprawling face-on spiral hidden behind the Milky Way's dust."),
    GX("Circinus Galaxy","—","ESO 97-G13","—","12.1","13 Mly","SA(s)b Seyfert 2","14h 13m 10s","−65° 20′ 21″","An active galaxy only 4° from the galactic plane — unnoticed until 1977."),
    GX("Messier 94","Croc's Eye","M94, NGC 4736","—","9.0","16 Mly","SA(r)ab spiral","12h 50m 53s","+41° 07′ 14″","A spiral with a brilliant inner starburst ring."),
    GX("Messier 106","M106","NGC 4258","~10¹² M☉","9.1","23.5 Mly","SAB(s)bc spiral","12h 18m 58s","+47° 18′ 14″","Its water megamaser gives one of the most precise galaxy distances — an anchor of the cosmic distance ladder."),
    GX("Fireworks Galaxy","—","NGC 6946","—","9.6","25.2 Mly","SAB(rs)cd spiral","20h 34m 52s","+60° 09′ 14″","Ten supernovae in a century — the most prolific supernova factory known."),
    GX("Whale Galaxy","—","NGC 4631","—","9.8","25 Mly","SB(s)d edge-on","12h 42m 08s","+32° 32′ 29″","An edge-on spiral warped into the shape of a whale by its companions."),
    GX("Sunflower Galaxy","M63","NGC 5055","—","8.6","27 Mly","SAbc flocculent spiral","13h 15m 49s","+42° 01′ 45″","A flocculent spiral — hundreds of short arm segments instead of grand arms."),
    GX("Phantom Galaxy","M74","NGC 628","—","9.4","32 Mly","SA(s)c spiral","01h 36m 42s","+15° 47′ 01″","The archetypal face-on grand-design spiral — and one of the faintest Messier objects."),
    GX("Messier 65","Leo Triplet","M65, NGC 3623","—","10.3","35 Mly","SAB(rs)a spiral","11h 18m 56s","+13° 05′ 32″","One third of the Leo Triplet of interacting spirals."),
    GX("Messier 66","Leo Triplet","M66, NGC 3627","—","8.9","36 Mly","SAB(s)b spiral","11h 20m 15s","+12° 59′ 30″","The largest of the Leo Triplet, its arms distorted by its neighbours."),
    GX("NGC 3628","Hamburger Galaxy","NGC 3628","—","10.2","35 Mly","SAb edge-on","11h 20m 17s","+13° 35′ 23″","The Leo Triplet's edge-on member, trailing a 300,000-ly tidal tail."),
    GX("Needle Galaxy","—","NGC 4565","—","10.4","40 Mly","SA(s)b edge-on","12h 36m 21s","+25° 59′ 16″","The finest edge-on spiral in the sky — what the Milky Way would look like from the side."),
    GX("Messier 77","Cetus A","M77, NGC 1068","~10¹² M☉","8.9","47 Mly","SAb Seyfert 2","02h 42m 41s","−00° 00′ 48″","The archetypal Seyfert galaxy — the nearest bright active galactic nucleus."),
    GX("NGC 1365","Great Barred Spiral","NGC 1365","—","10.3","56 Mly","SB(s)b barred spiral","03h 33m 36s","−36° 08′ 25″","The Great Barred Spiral of the Fornax Cluster."),
    GX("NGC 1300","—","NGC 1300","—","11.4","61 Mly","SB(rs)bc barred spiral","03h 19m 41s","−19° 24′ 41″","The textbook barred spiral — a nucleus-piercing bar feeding two grand arms.")]);
  setKids("Laniakea Supercluster",["Great Attractor","Virgo Supercluster"]);
  setKids("Coma Cluster",[
    GX("NGC 4889","Coma B","NGC 4889","~10¹³ M☉","12.6","~308 Mly","E4 elliptical","13h 00m 08s","+27° 58′ 37″","A giant elliptical with one of the largest known black holes; rules the Coma Cluster."),
    GX("NGC 4874","Coma A","NGC 4874","—","12.6","~360 Mly","cD supergiant elliptical","12h 59m 36s","+27° 57′ 33″","A supergiant elliptical co-ruling the heart of the Coma Cluster."),
    GX("NGC 4839","—","NGC 4839","—","13.4","~320 Mly","S0 group","12h 57m 24s","+27° 29′ 52″","A galaxy group falling into the Coma Cluster."),
    GX("NGC 4921","—","NGC 4921","—","13.0","~320 Mly","SB(rs)ab anaemic spiral","13h 01m 26s","+27° 53′ 09″","The brightest spiral in Coma — 'anaemic', its star formation stripped by the cluster."),
    GX("Dragonfly 44","—","DF44","~10¹² M☉","~19","~330 Mly","ultra-diffuse","13h 00m 58s","+26° 58′ 35″","As massive as the Milky Way but nearly invisible — ~99.99% dark matter.")]);
  DATA.children=["Laniakea Supercluster","Coma Cluster","Shapley Supercluster","Bullet Cluster","Sloan Great Wall","Hercules–Corona Borealis Great Wall","Boötes Void","KBC Void","IC 1101","Hoag's Object","RX J1131−1231","GN-z11","JADES-GS-z14-0","MoM-z14","3C 273","TON 618","EUCL J1729+6410","EUCL J1253+7054","GW150914","Cosmic Microwave Background"].map(g).filter(Boolean)
  .concat([   // notable galaxies beyond Laniakea — placed at their true sky positions
    GX("Condor Galaxy","—","NGC 6872","—","12.7","212 Mly","SB(s)b barred spiral","20h 16m 57s","−70° 46′ 05″","The largest known spiral — 522,000 ly across, stretched by its encounter with IC 4970."),
    GX("Rubin's Galaxy","—","UGC 2885","—","13.5","232 Mly","SA(rs)c spiral","03h 53m 02s","+35° 35′ 22″","A gentle giant 2.5× the Milky Way's width — Vera Rubin traced its rotation to reveal dark matter."),
    GX("Mice Galaxies","—","NGC 4676","—","14.1","290 Mly","interacting pair","12h 46m 10s","+30° 43′ 55″","Two spirals caught mid-collision, trailing long tidal tails — they will merge into one."),
    GX("Stephan's Quintet","HCG 92","Arp 319","—","13.9","~290 Mly","compact group","22h 35m 58s","+33° 57′ 36″","The first compact galaxy group ever found (1877) — four of its five members locked in collision; JWST's first-light target."),
    GX("Tadpole Galaxy","—","UGC 10214","—","14.4","420 Mly","disrupted barred spiral","16h 06m 04s","+55° 25′ 32″","A spiral trailing a 280,000-ly tail of stars torn out by a compact intruder."),
    GX("Cartwheel Galaxy","—","ESO 350-40","~3×10⁹ M☉","15.2","500 Mly","ring galaxy","00h 37m 41s","−33° 42′ 59″","A bullseye — a smaller galaxy punched through its centre, sending out a ring of star formation."),
    GX("Malin 1","—","LEDA 42102","—","16.2","1.19 Gly","giant low-surface-brightness","12h 36m 59s","+14° 19′ 49″","A ghostly disc ~650,000 ly across — the largest known spiral structure, almost too faint to see."),
    GX("Hercules A","3C 348","Hercules A","~10¹³ M☉","18.5","2.1 Gly","elliptical radio galaxy","16h 51m 08s","+04° 59′ 33″","An elliptical firing 1.5-million-ly plasma jets — one of the brightest radio sources in the sky."),
    GX("Alcyoneus","—","SDSS J081421.68+522410.0","—","—","~3 Gly","giant radio galaxy","08h 34m 02s","+52° 42′ 24″","The largest known galaxy-made structure — radio lobes spanning 16 million light-years.")
  ]);
})();

const ROOT=walk(DATA,null,null,0);
ROOT._virtual=true;      // the root is a holder only — never drawn as a bubble
ROOT.collapsed=false;    // its children (the galaxies & deep-space locations) are the top level

/* ===================== REALISTIC 3D POSITIONS =====================
   Place every object at its true sky direction (RA, Dec) and a log-compressed
   distance, so the map is the actual cosmos in depth — not an abstract layout. */
function raToRad(ra){ if(!ra||ra==='—')return null; const m=ra.match(/(\d+)h\s*(\d+)m(?:\s*([\d.]+)s)?/); if(!m)return null; return (+m[1]+(+m[2])/60+(m[3]?+m[3]:0)/3600)*15*Math.PI/180; }
function decToRad(dec){ if(!dec||dec==='—')return null; const m=dec.match(/([−+\-]?)\s*(\d+)°(?:\s*(\d+)[′'])?(?:\s*([\d.]+))?/); if(!m)return null; let d=+m[2]+(m[3]?+m[3]:0)/60+(m[4]?+m[4]:0)/3600; if(m[1]==='−'||m[1]==='-')d=-d; return d*Math.PI/180; }
function distLy(dist){ if(!dist)return null; const m=dist.match(/([\d.,]+)\s*(AU|kly|Mly|Gly|Mpc|ly)/i); if(!m)return null; const v=parseFloat(m[1].replace(/,/g,'')); const k={au:1.58e-5,ly:1,kly:1e3,mly:1e6,gly:1e9,mpc:3.26e6}[m[2].toLowerCase()]; return v*k; }
function radiusOf(ly){ return 24 + Math.max(0, Math.log10(ly)+5) * 34; }   // AU→centre, Gly→edge
function realPos(m){ const ra=raToRad(m.ra), dec=decToRad(m.dec), ly=distLy(m.dist); if(ra==null||dec==null||ly==null)return null;
  const R=radiusOf(ly); return {x:R*Math.cos(dec)*Math.cos(ra), y:R*Math.sin(dec), z:R*Math.cos(dec)*Math.sin(ra)}; }
function hash(s){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0; return h; }
function avg(a,k){ return a.reduce((s,p)=>s+p[k],0)/a.length; }

/* ===================== NESTED-BUBBLE LAYOUT (a Powers-of-Ten cosmos) =====================
   Every object's contents live INSIDE its transparent bubble; a container's radius encloses its
   children, so supercluster ⊃ cluster ⊃ galaxy ⊃ star ⊃ planet ⊃ moon, sized by real proportion. */
/* Leaf sizes: log law ACROSS kinds (neutron star → galaxy spans 20 orders of magnitude), but WITHIN a
   star system bodies scale by their TRUE diameter ratio to the star (^0.45, gently expanded so small
   worlds stay visible) — a log law there made Earth nearly Sun-sized, which reads plain wrong. */
function anchorStar(n){ const par=byId[n.parent]; if(!par) return null;
  if(par.type==='star'||par.type==='brown') return par;
  return par.childIds.map(id=>byId[id]).find(c=>c.type==='star'||c.type==='brown')||null; }
function leafR(n){
  const d=Math.max(1,diamKm(n));
  if(n.type==='star'||n.type==='brown'){          // stars: TRUE diameter ratio vs the Sun (^0.28 compressed,
    const sunLeaf=0.35+(Math.log10(1392700)-1)*0.55;   // capped 4× — supergiants read giant without filling the sky)
    return Math.min(sunLeaf*4, Math.max(0.35, sunLeaf*Math.pow(d/1392700, 0.28)));
  }
  if(n.type==='planet'||n.type==='dwarf'||n.type==='smallbody'){
    const s=anchorStar(n);
    if(s){ const sd=Math.max(1,diamKm(s));
      if(sd>d) return Math.max(0.05, leafR(s)*Math.pow(d/sd,0.45)); }
    // ONLY when there is no host star at all (extragalactic candidates): capped Jupiter-anchored marker.
    // Anchored-but-larger-than-star bodies (Oort Cloud, belts) MUST fall through to the log law —
    // the uncapped fallback once ballooned the Oort Cloud ~2,300 units and crushed the whole home chain.
    else return Math.min(1.0, Math.max(0.3, 0.5*Math.pow(d/139820,0.45)));
  }
  if(n.type==='moon'){
    const par=byId[n.parent];
    if(par&&(par.type==='planet'||par.type==='dwarf')){ const pd=Math.max(1,diamKm(par));
      // TRUE diameter ratio (^1.0, matches the solar app) — the Moon is 27% of Earth,
      // Ganymede 1/26 of Jupiter, exactly as in the data; 0.009 floor ≈ 3% of a planet,
      // the same relative speck size the solar app's floor gives (0.02 read 2× bigger)
      if(pd>d) return Math.max(0.009, leafR(par)*(d/pd)); }
  }
  return Math.max(0.35, 0.35 + (Math.log10(d)-1)*0.55);
}
// a REGION (transparent, contents live inside it): structures, galaxies, clusters, the Solar System.
// everything else is a SOLID object — a star/planet/moon — whose satellites orbit just OUTSIDE it.
function isRegion(n){ return n.type==='structure'||n.type==='galaxy'||n.type==='cluster'||n.name==='The Solar System'; }
/* Real semi-major axes (km) — moons sit on a log ruler of TRUE orbital distance around their world
   (Phobos hugs Mars, Iapetus & the Moon ride far out), not on generic packing shells. */
const MOON_A={'The Moon':384400,'Phobos':9376,'Deimos':23463,
 'Io':421700,'Europa':671034,'Ganymede':1070412,'Callisto':1882709,
 'Mimas':185539,'Enceladus':237948,'Dione':377396,'Rhea':527108,'Titan':1221870,'Iapetus':3560820,
 'Miranda':129390,'Ariel':190900,'Umbriel':266000,'Titania':435910,'Oberon':583520,
 'Proteus':117646,'Triton':354759,'Nereid':5513818,'Charon':19591,'Namaka':25657,'Hiʻiaka':49880};
function moonDist(par,c){ const a=MOON_A[c.name]; if(!a) return null;
  const aR=2*a/diamKm(par);                        // true semi-major axis in planet RADII
  const r=aR<=3? aR : 3+0.75*Math.log10(aR/3);     // EXACT up close (Phobos really sits at 2.8 Mars radii),
  return par._R*r + c._R; }                        // firmly log-compressed beyond 3 — now that moons render
                                                   // to TRUE scale, wide gaps read as "lost"
function foot(n){   // returns the node's footprint radius (space it needs in its parent); sets _R (render radius)
  const kids=n.childIds.map(id=>byId[id]), phys=leafR(n);
  if(!kids.length){ n._R=phys; n._foot=phys; return phys; }
  const rfs=kids.map(foot);
  if(isRegion(n)){ const sum3=rfs.reduce((s,r)=>s+r*r*r,0), m=(n.name==='The Solar System')?1.35:1.75;
    n._R=Math.max(phys, Math.cbrt(sum3)*m+2); n._foot=n._R; }
  else { n._R=phys; n._foot=phys + Math.max(...rfs)*2 + rfs.reduce((s,r)=>s+r,0)*0.4;    // solid + room for satellites
    kids.forEach((c,i)=>{ const d=moonDist(n,c); if(d!=null) n._foot=Math.max(n._foot, d+rfs[i]*2); }); }
  return n._foot;
}
function packPos(n){ const kids=n.childIds.map(id=>byId[id]), N=kids.length; if(!N) return;
  const region=isRegion(n); let orbit=n._R*1.35;   // paddings RELATIVE to node size — absolute constants
  const dists=[];                                  // blew up the deep (Solar System) levels after scaling
  kids.forEach((c,i)=>{ const y=1-(i+0.5)/N*2, rr=Math.sqrt(Math.max(0,1-y*y)), th=i*2.39996323;
    let dist;
    if(region){
      if(N===1) dist=0;
      else{
        const avail=Math.max(0, n._R*0.86 - c._foot);      // stay inside the bubble
        const want =n._R*0.6 - c._foot;                     // big children sit deeper
        const floor=c._foot*0.8 + n._R*0.08;                // NEVER pile several children at the centre
        dist=Math.min(avail, Math.max(want, floor)*(0.85+0.3*((hash(c.name)%60)/60)));
      }
    }
    else { const md=moonDist(n,c);
      if(md!=null) dist=md;                                                              // TRUE orbital ruler
      else { dist = orbit + c._R; orbit = dist + c._R + Math.max(n._R*0.12, c._R*0.3); } // satellite shells
    }
    dists.push(dist);
    c._p={x:n._p.x+Math.cos(th)*rr*dist, y:n._p.y+y*dist*0.9, z:n._p.z+Math.sin(th)*rr*dist}; });
  if(!region && orbit>n._foot*0.98){               // compress satellite shells to fit the allotted footprint
    const s=(n._foot*0.98)/orbit;
    kids.forEach((c,i)=>{ const d0=dists[i]; if(d0<1e-9) return;
      const d=Math.max(n._R*1.12+c._R, d0*s), f=d/d0;
      c._p.x=n._p.x+(c._p.x-n._p.x)*f; c._p.y=n._p.y+(c._p.y-n._p.y)*f; c._p.z=n._p.z+(c._p.z-n._p.z)*f; });
  }
  if(region && N>1){                               // relax: push overlapping siblings apart, inside the bubble
    for(let it=0; it<30; it++){ let moved=false;
      for(let a=0;a<N;a++) for(let b=a+1;b<N;b++){
        const A=kids[a], B=kids[b];
        let dx=B._p.x-A._p.x, dy=B._p.y-A._p.y, dz=B._p.z-A._p.z, L=Math.hypot(dx,dy,dz);
        const min=(A._foot+B._foot)*0.95;
        if(L<min){ moved=true;
          if(L<1e-6){ const h=hash(A.name+B.name); dx=Math.cos(h%7); dy=Math.sin(h%11)||0.5; dz=Math.cos(h%13); L=Math.hypot(dx,dy,dz); }
          const push=(min-L)/2/L;
          A._p.x-=dx*push; A._p.y-=dy*push; A._p.z-=dz*push;
          B._p.x+=dx*push; B._p.y+=dy*push; B._p.z+=dz*push; }
      }
      kids.forEach(c=>{ const ox=c._p.x-n._p.x, oy=c._p.y-n._p.y, oz=c._p.z-n._p.z;
        const L=Math.hypot(ox,oy,oz), max=Math.max(0, n._R*0.9 - c._foot);
        if(L>max){ const s=L>1e-9?max/L:0; c._p.x=n._p.x+ox*s; c._p.y=n._p.y+oy*s; c._p.z=n._p.z+oz*s; } });
      if(!moved) break;
    }
  }
  kids.forEach(packPos);   // recurse AFTER relaxation so descendants pack around final positions
}
/* Galaxy bubbles must respect REAL relative diameters (Andromeda > Milky Way > Triangulum > LMC > SMC…),
   not how many catalogue entries each happens to hold. Anchored at the Milky Way, compressed by a power
   law (ratio^0.45, clamped ×4) so giants stay on screen; containers then re-grow to hold their contents. */
function harmonizeGalaxySizes(){
  const mw=NODES.find(n=>n.name==='Milky Way'); if(!mw) return;
  const P=0.45, dMW=diamKm(mw);
  NODES.forEach(n=>{ if(n.type!=='galaxy') return;
    const ratio=Math.min(4, Math.max(0.02, diamKm(n)/dMW));
    const r=mw._R*Math.pow(ratio,P);
    if(r>n._R){ n._R=r; n._foot=Math.max(n._foot||0, r); } });
  // re-grow ancestor containers so enlarged galaxies still fit
  (function agg(n){
    const kids=n.childIds.map(id=>byId[id]); if(!kids.length) return;
    kids.forEach(agg); if(n===ROOT) return;
    if(isRegion(n)){ const s3=kids.reduce((s,c)=>s+Math.pow(c._foot||c._R||1,3),0);
      const need=Math.cbrt(s3)*1.75+2;
      if(need>n._R) n._R=need; n._foot=Math.max(n._foot||0, n._R); }
    else { const rfs=kids.map(c=>c._foot||c._R||1);
      n._foot=Math.max(n._foot||0, (n._R||1)+Math.max(...rfs)*2+rfs.reduce((a,b)=>a+b,0)*0.4); }
  })(ROOT);
}
function layout(){
  ROOT._p={x:0,y:0,z:0};
  const tops=ROOT.childIds.map(id=>byId[id]);
  tops.forEach(foot);
  // The Powers-of-Ten nesting makes the Solar System bubble ENORMOUS next to the galaxy (27% of its
  // radius vs 1/30,000 in reality) — so every star looked "next door". Inflating the Milky Way's
  // interior claws back proportion: star systems get real air between them. (harmonize re-grows
  // ancestors; k2 renormalises — net effect is the SS shrinking relative to the Galaxy.)
  const mwB=NODES.find(n=>n.name==='Milky Way');
  if(mwB){ mwB._R*=2.4; mwB._foot=Math.max(mwB._foot||0, mwB._R); }
  // scale so our home supercluster (the deepest subtree) fits a comfortable radius
  const home=tops.find(n=>n.name==='Laniakea Supercluster'), k=home?300/home._R:1;
  NODES.forEach(n=>{ if(n._R) n._R*=k; if(n._foot) n._foot*=k; });
  harmonizeGalaxySizes();
  // harmonizing enlarges the home chain — re-normalise so Laniakea stays at 300 (ratios preserved,
  // and the deep survey shells at r≈700+ stay outside our supercluster)
  if(home && home._R>0){ const k2=300/home._R; NODES.forEach(n=>{ if(n._R) n._R*=k2; if(n._foot) n._foot*=k2; }); }
  const homeR=home?home._R:300;
  // top-level: home at the centre (we're inside it); the rest sit OUTSIDE it, in their real sky direction
  tops.forEach(n=>{ if(n===home){ n._p={x:0,y:0,z:0}; return; }
    const rp=realPos(n.meta||{}); let d;
    if(rp){ const L=Math.hypot(rp.x,rp.y,rp.z)||1; d={x:rp.x/L,y:rp.y/L,z:rp.z/L}; }
    else { const h=hash(n.name), th=(h%360)*Math.PI/180, ph=(((h>>>4)%160)-80)*Math.PI/180; d={x:Math.cos(ph)*Math.cos(th),y:Math.sin(ph),z:Math.cos(ph)*Math.sin(th)}; }
    const D=homeR+90+(hash(n.name)%200)+n._R;
    n._p={x:d.x*D,y:d.y*D,z:d.z*D};
  });
  // extragalactic planet CANDIDATES have no host-star node to scale against — give them a small
  // marker size relative to their POST-scale parent (a fixed pre-scale size gets crushed by k·k2)
  NODES.forEach(n=>{ if(n.type==='planet'&&!anchorStar(n)){ const par=byId[n.parent];
    // par._R*0.6 cap: pulsar planets orbit a ~0.07-unit neutron star — the 0.25 floor
    // (meant for galaxy-sized candidate parents) made them 3.5× their own pulsar
    if(par&&par._R){ n._R=Math.min(Math.max(0.25, par._R*0.035), par._R*0.6); n._foot=n._R; } } });
  tops.forEach(packPos);
  /* ============ PURE COORDINATES — the governing rule of this map ============
     Inside EVERY container, children with RA/Dec + distance sit in their TRUE sky direction from the
     Solar System (the observer — all astronomy is measured from Earth), radially ordered by their REAL
     distances (log-mapped across the parent's bubble). Applies at every level: stars & nebulae inside
     the Milky Way, the LMC/SMC/Andromeda inside the Local Group, M81/Cen A/Virgo inside the
     Supercluster, the Great Attractor & Shapley inside Laniakea. Design never overrides coordinates. */
  (function truePositions(){
    const ssN=NODES.find(n=>n.name==='The Solar System'); if(!ssN) return;
    const obs=ssN._p;
    const homeChain=new Set(); { let n=ssN; while(n){ homeChain.add(n.id); n=byId[n.parent]; } }
    const depth=n=>{ let d=0,p=n; while(p.parent){ d++; p=byId[p.parent]; } return d; };
    const containers=NODES.filter(n=>n.childIds&&n.childIds.length&&isRegion(n)).sort((a,b)=>depth(a)-depth(b));
    containers.forEach(par=>{
      const kids=par.childIds.map(id=>byId[id]);
      const info=kids.map(c=>{ const m=c.meta||{};
          return {c, ra:raToRad(m.ra), dec:decToRad(m.dec), ly:distLy(m.dist)}; })
        .filter(k=>k.ra!=null&&k.dec!=null&&k.ly&&!homeChain.has(k.c.id));
      if(info.length<2) return;
      const lys=info.map(k=>k.ly), lmin=Math.min(...lys), lmax=Math.max(...lys);
      if(lmax/lmin<1.6) return;                    // satellite swarms all at one distance: keep packed
      const homeKid=kids.find(c=>homeChain.has(c.id));   // the child WE are inside (SS in MW, MW in LG…)
      const inner=homeKid
        ? Math.hypot(homeKid._p.x-obs.x,homeKid._p.y-obs.y,homeKid._p.z-obs.z)+homeKid._R*1.08
        : par._R*0.12;
      const outer=Math.max(inner*1.15, par._R*0.93);
      const l0=Math.log10(lmin/1.4), l1=Math.log10(lmax*1.15);
      info.forEach(k=>{ const t=Math.min(1,Math.max(0,(Math.log10(k.ly)-l0)/(l1-l0)));
        const r=Math.min(outer-(k.c._foot||1)*0.5, inner+(k.c._foot||1)*0.3+t*(outer-inner));
        k.c._p={x:obs.x+Math.cos(k.dec)*Math.cos(k.ra)*r, y:obs.y+Math.sin(k.dec)*r, z:obs.z+Math.cos(k.dec)*Math.sin(k.ra)*r}; });
      // separate overlapping neighbours (α Cen A & B share a sky position); the home child is pinned
      const arr=(homeKid?[homeKid]:[]).concat(kids.filter(c=>c!==homeKid));
      for(let it=0; it<24; it++){ let moved=false;
        for(let a=0;a<arr.length;a++) for(let b=a+1;b<arr.length;b++){
          const A=arr[a], B=arr[b];
          let dx=B._p.x-A._p.x, dy=B._p.y-A._p.y, dz=B._p.z-A._p.z, L=Math.hypot(dx,dy,dz);
          const min=((A._foot||1)+(B._foot||1))*0.9;
          if(L<min){ moved=true;
            if(L<1e-6){ const h=hash(A.name+B.name); dx=Math.cos(h%7); dy=Math.sin(h%11)||0.5; dz=Math.cos(h%13); L=Math.hypot(dx,dy,dz); }
            const pinA=(A===homeKid)?0:0.5, pinB=(A===homeKid)?1:0.5, f=(min-L)/L;
            A._p.x-=dx*f*pinA; A._p.y-=dy*f*pinA; A._p.z-=dz*f*pinA;
            B._p.x+=dx*f*pinB; B._p.y+=dy*f*pinB; B._p.z+=dz*f*pinB; }
        }
        kids.forEach(c=>{ if(c===homeKid) return;
          const ox=c._p.x-par._p.x, oy=c._p.y-par._p.y, oz=c._p.z-par._p.z;
          const L=Math.hypot(ox,oy,oz), max=Math.max(0, par._R*0.93-(c._foot||1));
          if(L>max){ const s=L>1e-9?max/L:0; c._p={x:par._p.x+ox*s, y:par._p.y+oy*s, z:par._p.z+oz*s}; } });
        if(!moved) break;
      }
      kids.forEach(c=>{ if(!homeChain.has(c.id)) packPos(c); });   // re-pack each subtree in place
    });
  })();
  /* ============ PRECISE Solar System (bubbles only NAME things — coordinates rule) ============
     The Sun sits AT the centre; planets, dwarfs and comets ring it at their TRUE orbital distances
     (log-au, same ruler as the 18k-asteroid cloud); the Asteroid & Kuiper belts and the Oort Cloud
     are CONCENTRIC shells around the Sun — never sibling bubbles floating beside it. */
  (function heliocentric(){
    const ss=NODES.find(n=>n.name==='The Solar System'), sun=NODES.find(n=>n.name==='The Sun');
    if(!ss||!sun) return;
    sun._p={x:ss._p.x, y:ss._p.y, z:ss._p.z};
    const R=ss._R, l15=Math.log10(1.5), l60=Math.log10(60);
    const seg15=R*0.96*0.22;                                 // where 1.5 au sits (asteroid-cloud ruler)
    // the Sun's star-law size can exceed Mercury's orbit on this ruler — cap it WELL below
    // the innermost orbit. The old 0.42 cap put Mercury at 1.3 solar radii (real: 83!) — the
    // whole inner system grazed the Sun's surface.
    const sunLaw=sun._R;
    if(sun._R>seg15*0.18){ sun._R=seg15*0.18; sun._foot=sun._R; }
    // keep the star→planet size law (^0.45 of true diameter ratio) TRUE against the DISPLAYED
    // Sun: shrink every planetary subtree by the same cap factor (sizes AND moons ride along;
    // all intra-system ratios are preserved exactly)
    const capF=sun._R/sunLaw;
    if(capF<1){ const shrink=n=>{ n._R*=capF; if(n._foot!=null) n._foot*=capF;
        (n.childIds||[]).forEach(id=>shrink(byId[id])); };
      ss.childIds.map(id=>byId[id]).forEach(c=>{ if(c!==sun) shrink(c); }); }
    const sunEdge=Math.min(sun._R*3.0, seg15*0.62);          // Mercury's zone starts ~3 solar radii out
    const aMap=au=>{ au=Math.max(0.35,Math.min(1e5,au));
      if(au<=1.5){ const t=(Math.log10(au)-Math.log10(0.35))/(l15-Math.log10(0.35));
        return sunEdge + t*(seg15-sunEdge); }
      if(au<=60) return R*0.96*(0.22 + 0.74*(Math.log10(au)-l15)/(l60-l15));
      return R*(0.922 + 0.028*(Math.log10(au)-l60)/(5-l60)); };
    const BELT_AU={'Asteroid Belt':2.8, 'Kuiper Belt':40};
    ss.childIds.map(id=>byId[id]).forEach(c=>{
      if(c===sun) return;
      if(c.name==='Oort Cloud'){ c._p={...sun._p}; c._R=R*0.95; c._foot=c._R; return; }
      if(BELT_AU[c.name]!=null){ c._p={...sun._p}; c._R=aMap(BELT_AU[c.name]); c._foot=c._R; return; }
      const ly=distLy((c.meta||{}).dist), au=ly? ly/1.58e-5 : null;
      const r=au? aMap(au) : R*0.88;
      const h=hash(c.name), th=(h%3600)/3600*Math.PI*2, tilt=(((h>>>4)%100)/100-0.5)*0.3;
      c._p={x:sun._p.x+Math.cos(th)*Math.cos(tilt)*r, y:sun._p.y+Math.sin(tilt)*r, z:sun._p.z+Math.sin(th)*Math.cos(tilt)*r};
      packPos(c);   // moons follow their planet
    });
    // TRUE moon distances, capped at 4.8 planet radii per system (proportional squash of only
    // the sprawling outer moons — Phobos keeps its EXACT 2.77 Mars radii). Coordinates beat
    // collision-avoidance here: a distant Nereid passing near speck-sized Pluto is acceptable;
    // moons re-glued to their planet (the bug this fixes) is not.
    const ring=ss.childIds.map(id=>byId[id]).filter(c=>c!==sun);
    ring.forEach(c=>{
      const moons=(c.childIds||[]).map(id=>byId[id]).filter(k=>k&&k.type==='moon'); if(!moons.length) return;
      const lim=c._R*4.8, mx=Math.max(...moons.map(k=>Math.hypot(k._p.x-c._p.x,k._p.y-c._p.y,k._p.z-c._p.z)));
      if(mx<=lim) return;
      const s=(lim-c._R)/(mx-c._R);
      moons.forEach(k=>{ const dx=k._p.x-c._p.x, dy=k._p.y-c._p.y, dz=k._p.z-c._p.z, L=Math.hypot(dx,dy,dz)||1;
        const f=(c._R+(L-c._R)*s)/L;
        k._p={x:c._p.x+dx*f, y:c._p.y+dy*f, z:c._p.z+dz*f}; });
    });
  })();
  NODES.forEach(n=>{ const p=n._p||{x:0,y:0,z:0}; n.fx=p.x; n.fy=p.y; n.fz=p.z; n.x=p.x; n.y=p.y; n.z=p.z; });
}
layout();

/* ---- physical diameter lookup (drives leaf bubble sizes in the nested layout) ---- */
function diamKm(n){ return SIZES[n.name] || SIZE_DEFAULT[n.type] || 1e5; }

/* Everything is ALWAYS visible — nested inside its transparent parent; you explore by zooming, not clicking. */
function currentData(){ return {nodes:NODES.filter(n=>n!==ROOT), links:[]}; }

/* ===================== BUILD GRAPH ===================== */
const elGraph=document.getElementById('graph');
let Graph, _dl=null, _deg={}, hoverNode=null;
const hiddenTypes=new Set(), _legendChips=[];   // interactive-legend state (declared early — boot() uses them)
/* Own camera easing — bypasses 3d-force-graph's tween (which mis-fires when moves overlap).
   Drives camera + orbit target directly; a new move cancels the previous one. */
let _camAnim=null;
function easeCam(toPos, toTarget, ms){
  const run=(now)=>{
    const cam=Graph.camera&&Graph.camera(), ctr=Graph.controls&&Graph.controls();
    if(!cam||!ctr) return;
    if(!run._s){ run._s=now; run._p0=cam.position.clone(); run._t0=ctr.target.clone(); }
    const k=Math.min(1,(now-run._s)/ms), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    cam.position.set(run._p0.x+(toPos.x-run._p0.x)*e, run._p0.y+(toPos.y-run._p0.y)*e, run._p0.z+(toPos.z-run._p0.z)*e);
    ctr.target.set(run._t0.x+(toTarget.x-run._t0.x)*e, run._t0.y+(toTarget.y-run._t0.y)*e, run._t0.z+(toTarget.z-run._t0.z)*e);
    ctr.update();
    if(k<1) _camAnim=requestAnimationFrame(run);
  };
  cancelAnimationFrame(_camAnim); _camAnim=requestAnimationFrame(run);
}
function fitTop(){ setTimeout(()=>{   // frame the whole cosmos
  const rs=NODES.filter(n=>n!==ROOT).map(n=>Math.hypot(n.x||0,n.y||0,n.z||0)+ (n._R||0)).sort((a,b)=>a-b);
  const r=Math.max(120, rs[rs.length-1]||300);
  const c3=Graph.camera&&Graph.camera();   // restore normal near plane (deep zooms shrink it)
  if(c3&&c3.near<0.1){ c3.near=0.1; c3.updateProjectionMatrix(); }
  easeCam({x:0,y:0,z:Math.min(1600, r*1.35)}, {x:0,y:0,z:0}, 700);
}, 260); }
/* home view: parked just OUTSIDE the Milky Way, looking at it — the whole cosmos is one
   Overview click away, but you start at home. Diagonal approach shows the disc tilt. */
function homeView(){ setTimeout(()=>{
  const mw=NODES.find(n=>n.name==='Milky Way');
  if(!mw||mw.x==null||!mw._R){ fitTop(); return; }
  const c3=Graph.camera&&Graph.camera();
  if(c3&&c3.near<0.1){ c3.near=0.1; c3.updateProjectionMatrix(); }
  const u={x:0.35,y:0.45,z:0.82}, L=Math.hypot(u.x,u.y,u.z), d=mw._R*2.6;
  easeCam({x:mw.x+u.x/L*d, y:mw.y+u.y/L*d, z:mw.z+u.z/L*d}, {x:mw.x,y:mw.y,z:mw.z}, 900);
}, 260); }
/* fly the camera to look closely at a node (no "enter" — contents are already visible inside it) */
function flyTo(n){ if(!Graph||n.x==null) return;
  const R=n._R||5, leaf=!(n.childIds&&n.childIds.length);
  let d=R*(leaf?5.2:3.2)+Math.min(18, R*0.9);     // terminal objects (planets, moons…): stop comfortably IN FRONT;
  // a world with moons: pull back enough to frame the WHOLE system, not just the planet
  const _moons=(n.childIds||[]).map(id=>byId[id]).filter(k=>k&&k.type==='moon'&&k.x!=null);
  if(_moons.length) d=Math.max(d, Math.max(..._moons.map(k=>Math.hypot(k.x-n.x,k.y-n.y,k.z-n.z)))*1.6);
                                                  // containers: dive close so you look inside. Approach RELATIVE to size — the old “+18” parked the
  const cam=Graph.cameraPosition(), dx=cam.x-n.x, dy=cam.y-n.y, dz=cam.z-n.z, L=Math.hypot(dx,dy,dz);   // camera miles away from deep tiny nodes (the Sun)
  const ux=L>1e-6?dx/L:0, uy=L>1e-6?dy/L:0, uz=L>1e-6?dz/L:1;
  const c3=Graph.camera&&Graph.camera();          // deep zoom needs a finer near plane or it clips to a white blur
  if(c3){ const nr=Math.min(0.1, Math.max(1e-4, d/400)); if(c3.near>nr){ c3.near=nr; c3.updateProjectionMatrix(); } }
  easeCam({x:n.x+ux*d,y:n.y+uy*d,z:n.z+uz*d},{x:n.x,y:n.y,z:n.z},800);
}
function boot(){
  if(typeof ForceGraph3D==='undefined'||typeof THREE==='undefined'){ setTimeout(boot,120); return; }
  document.getElementById('loading').classList.add('done');
  Graph = ForceGraph3D({controlType:'orbit'})(elGraph)
   .enableNodeDrag(false)
   .backgroundColor('#05070e')
   .nodeRelSize(1)                 // v = radius³, so drawn sphere radius == true-size-derived radius
   .nodeThreeObject(nodeMesh)     // custom spheres — containers (galaxies…) are translucent so you can see & fly inside
   .nodeLabel(()=>null)
   .linkVisibility(false)          // no connecting lines — objects float free (force still clusters them)
   .onBackgroundClick(()=>{})      // hover & click picking is CUSTOM (pickNodeAt) — the built-in raycast
                                   // always returns the enclosing bubble's shell, not what you point at
   .graphData(currentData());
  // Positions are REAL (pinned via fx/fy/fz in layout()) — switch the force sim off so nothing drifts.
  Graph.d3Force('charge', null);
  Graph.d3Force('link', null);
  Graph.d3Force('center', null);
  Graph.cooldownTicks(0);
  buildLegend(); updateCrumbs(ROOT); updateHud(); syncLabels();
  buildDarkFields();   // dark matter / dark energy / antimatter rendered as fields, not bubbles
  buildStarCloud();    // all ~9,100 naked-eye stars (Yale BSC) inside the Milky Way
  buildGalaxySurvey(); // 20,000 real SDSS galaxies — the measured cosmic web
  buildMemberClouds(); // real members: MW globulars, Local Group dwarfs, Virgo & Coma galaxies
  buildLegendLayers(); // per-field & per-catalogue show/hide toggles
  homeView();   // open just outside the Milky Way (Overview still frames everything)
}
/* a node's rendered sphere — CONTAINERS (things with contents) are translucent glass you can fly into;
   leaf objects are near-solid. Radius comes from n._R (unit sphere scaled) so it tracks context sizing. */
/* real surface imagery for Solar System bodies (Solar System Scope CC BY 4.0 + NASA/USGS mission
   mosaics via Stellarium) — works now that global THREE matches the bundled revision */
const TEXMAP={'The Sun':'2k_sun.jpg','Mercury':'2k_mercury.jpg','Venus':'2k_venus_atmosphere.jpg','Earth':'2k_earth_daymap.jpg',
 'Mars':'2k_mars.jpg','Jupiter':'2k_jupiter.jpg','Saturn':'2k_saturn.jpg','Uranus':'2k_uranus.jpg','Neptune':'2k_neptune.jpg','The Moon':'2k_moon.jpg',
 'Io':'io.png','Europa':'europa.png','Ganymede':'ganymede.png','Callisto':'callisto.png',
 'Titan':'titan.png','Enceladus':'enceladus.png','Rhea':'rhea.png','Iapetus':'iapetus.png','Dione':'dione.png','Mimas':'mimas.png',
 'Miranda':'miranda.png','Ariel':'ariel.png','Titania':'titania.png','Oberon':'oberon.png','Umbriel':'umbriel.png',
 'Triton':'triton.png','Pluto':'pluto.png','Charon':'charon.png','Ceres':'ceres.png'};
let _texLoader=null; const _texCache={};
function tex(f){ if(!_texLoader) _texLoader=new THREE.TextureLoader();
  if(!_texCache[f]){ const t=_texLoader.load('includes/images/tex/'+f); if('colorSpace' in t) t.colorSpace='srgb'; _texCache[f]=t; }
  return _texCache[f]; }
/* worlds nobody has photographed (exoplanets, far dwarfs, small moons) get a PROCEDURAL surface —
   hash-seeded banding for gas giants, mottled terrain for rocky bodies — so they read as planets */
/* granulated photosphere texture per spectral colour — giants read as boiling star surfaces, not flat discs */
const _stexCache={};
function starTex(colHex){
  if(_stexCache[colHex]) return _stexCache[colHex];
  const c=new THREE.Color(colHex), hsl={}; c.getHSL(hsl);
  const H=Math.round(hsl.h*360), S=Math.round(hsl.s*100), L=Math.min(72,Math.round(hsl.l*100)+8);
  const cv=document.createElement('canvas'); cv.width=128; cv.height=64;
  const g=cv.getContext('2d');
  g.fillStyle=`hsl(${H},${S}%,${L}%)`; g.fillRect(0,0,128,64);
  for(let i=0;i<150;i++){ const hh=hash(colHex+'g'+i);
    const dl=(((hh>>>10)%100)/100-0.5)*0.6;
    g.beginPath(); g.fillStyle=`hsla(${H+(dl>0?6:-6)},${S}%,${Math.max(10,Math.min(88,L+dl*30))}%,0.45)`;
    g.arc(hh%128,(hh>>>5)%64, 1+((hh>>>8)%42)/10, 0, 7); g.fill(); }
  const gr=g.createLinearGradient(0,0,0,64);
  gr.addColorStop(0,'rgba(0,0,10,.35)'); gr.addColorStop(.3,'rgba(0,0,0,0)');
  gr.addColorStop(.7,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,10,.35)');
  g.fillStyle=gr; g.fillRect(0,0,128,64);
  const t=new THREE.CanvasTexture(cv); if('colorSpace' in t) t.colorSpace='srgb';
  return _stexCache[colHex]=t;
}
const _ptexCache={};
function procTex(n){
  if(_ptexCache[n.name]) return _ptexCache[n.name];
  const h=hash(n.name), cv=document.createElement('canvas'); cv.width=128; cv.height=64;
  const g=cv.getContext('2d');
  const hue=h%360, sat=22+((h>>>4)%34), lit=36+((h>>>6)%22);
  g.fillStyle=`hsl(${hue},${sat}%,${lit}%)`; g.fillRect(0,0,128,64);
  if(diamKm(n)>30000){                            // gas giant: latitude bands
    const bands=6+((h>>>8)%7);
    for(let b=0;b<bands;b++){ const hb=hash(n.name+'b'+b), y=(b/bands)*64;
      const dl=((hb%100)/100-0.5)*0.5;
      g.fillStyle=`hsla(${hue+dl*36},${sat}%,${Math.max(8,lit+dl*26)}%,0.85)`;
      g.fillRect(0, y, 128, (64/bands)*(0.6+((hb>>>7)%50)/100)); }
  } else {                                        // rocky: mottled craters / terrain
    for(let i=0;i<90;i++){ const hh=hash(n.name+'c'+i);
      const dl=(((hh>>>10)%100)/100-0.5)*0.5;
      g.beginPath(); g.fillStyle=`hsla(${hue},${sat*0.8}%,${Math.max(6,lit+dl*34)}%,0.5)`;
      g.arc(hh%128, (hh>>>5)%64, 1+((hh>>>8)%38)/10, 0, 7); g.fill(); }
  }
  const gr=g.createLinearGradient(0,0,0,64);      // polar shading
  gr.addColorStop(0,'rgba(0,0,12,.45)'); gr.addColorStop(.28,'rgba(0,0,0,0)');
  gr.addColorStop(.72,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(0,0,12,.45)');
  g.fillStyle=gr; g.fillRect(0,0,128,64);
  const t=new THREE.CanvasTexture(cv); if('colorSpace' in t) t.colorSpace='srgb';
  return _ptexCache[n.name]=t;
}
/* north galactic pole (J2000: RA 192.859°, Dec +27.128°) — orients the Milky Way's disc & star sprinkle */
const NGP=(function(){ const ra=192.859*Math.PI/180, dec=27.128*Math.PI/180;
  return {x:Math.cos(dec)*Math.cos(ra), y:Math.sin(dec), z:Math.cos(dec)*Math.sin(ra),
    clone(){ return new THREE.Vector3(this.x,this.y,this.z); }}; })();
const _bhSpin=[], _spinners=[];
function nodeMesh(n){
  // EVERY galaxy / star-cluster / structure / nebula / belt is a see-through veil you can look and fly
  // straight through — only compact bodies (stars, planets, moons, BHs…) are solid.
  const col=nodeColor(n);
  const region=isRegion(n);
  if(n.type==='blackhole'){   // a real black hole: dark event horizon + photon ring + glowing accretion disc
    const g=new THREE.Group();
    const core=new THREE.Mesh(new THREE.SphereGeometry(0.62,28,20),
      new THREE.MeshBasicMaterial({color:0x000000}));            // occludes the starfield behind it
    g.add(core);
    const pr=new THREE.Mesh(new THREE.TorusGeometry(0.68,0.035,10,64),
      new THREE.MeshBasicMaterial({color:0xfff1d6, transparent:true, opacity:0.95,
        blending:THREE.AdditiveBlending, depthWrite:false}));    // thin brilliant photon ring
    g.add(pr);
    const rg=new THREE.RingGeometry(0.78,1.7,72,4);              // accretion disc: white-hot inner edge → fades out
    const pa=rg.attributes.position, cols=new Float32Array(pa.count*3);
    for(let i=0;i<pa.count;i++){ const r=Math.hypot(pa.getX(i),pa.getY(i));
      const t=Math.min(1,Math.max(0,(r-0.78)/(1.7-0.78)));
      cols[i*3]=Math.pow(1-t,0.8); cols[i*3+1]=Math.pow(1-t,1.7)*0.72; cols[i*3+2]=Math.pow(1-t,3.0)*0.42; }
    rg.setAttribute('color', new THREE.BufferAttribute(cols,3));
    const disk=new THREE.Mesh(rg, new THREE.MeshBasicMaterial({vertexColors:true, transparent:true, opacity:0.95,
      side:THREE.DoubleSide, blending:THREE.AdditiveBlending, depthWrite:false}));
    disk.rotation.x=Math.PI/2-0.45; g.add(disk); _bhSpin.push(disk);
    pr.rotation.x=disk.rotation.x;                               // photon ring follows the disc plane
    const h=hash(n.name); g.rotation.z=((h%100)/100-0.5)*0.9; g.rotation.x=((h>>>3)%100)/100*0.5-0.25;
    g.scale.setScalar(Math.max(0.3,n._R||1)); return g;
  }
  const texFile=TEXMAP[n.name];
  if(texFile){                                   // real imagery: unlit full-brightness sphere (+ Saturn's rings)
    const g=new THREE.Group();
    const sph=new THREE.Mesh(new THREE.SphereGeometry(1,40,28), new THREE.MeshBasicMaterial({map:tex(texFile)}));
    g.add(sph); _spinners.push(sph);
    if(n.name==='Saturn'){
      const rg=new THREE.RingGeometry(1.35,2.35,72); const uv=rg.attributes.uv, ps=rg.attributes.position;
      for(let i=0;i<uv.count;i++){ const r=Math.hypot(ps.getX(i),ps.getY(i)); uv.setXY(i,(r-1.35)/1.0,0.5); }
      const ring=new THREE.Mesh(rg,new THREE.MeshBasicMaterial({map:tex('2k_saturn_ring_alpha.png'),color:0xd8c9a3,
        side:THREE.DoubleSide,transparent:true,opacity:0.9,depthWrite:false}));
      ring.rotation.x=Math.PI/2-0.47; g.add(ring);
    }
    g.scale.setScalar(Math.max(1e-4,n._R||1)); return g;
  }
  if(n.type==='star'||n.type==='brown'){          // stars GLOW: hot core + spectral-coloured halo sprites
    const g=new THREE.Group(), R=Math.max(0.3,n._R||1);
    // supergiants render as near-full granulated spheres with TIGHT halos — a 2.2× halo on a
    // Betelgeuse-sized star washes out half the galaxy
    const coreS=Math.min(0.88, 0.5+0.06*R);
    const core=new THREE.Mesh(new THREE.SphereGeometry(coreS,28,20), new THREE.MeshBasicMaterial({map:starTex(col)}));
    g.add(core); _spinners.push(core);
    // invisible full-size sphere keeps the star easy to click (halo sprites don't raycast)
    const hit=new THREE.Mesh(new THREE.SphereGeometry(1,8,6), new THREE.MeshBasicMaterial({visible:false}));
    g.add(hit);
    const halo=(scale,c2,op2)=>{ const s=new THREE.Sprite(new THREE.SpriteMaterial({map:dotTexture(), color:c2,
      transparent:true, opacity:op2, blending:THREE.AdditiveBlending, depthWrite:false}));
      s.scale.setScalar(scale); s.raycast=()=>{}; g.add(s); };
    halo(Math.min(1.25, 1.0+0.2/R), 0xffffff, 0.6);   // white-hot inner bloom
    halo(Math.min(2.2, 1.12+0.85/R), col, 0.4);       // spectral-colour halo, tight on giants
    g.scale.setScalar(Math.max(1e-4,n._R||1)); return g;
  }
  if(n.type==='nebula'){                          // nebulae: volumetric puff of additive glow sprites
    const g=new THREE.Group(), base=new THREE.Color(col);
    for(let i=0;i<26;i++){ const hh=hash(n.name+'~'+i);
      const r=Math.pow((hh%1000)/1000,0.55)*0.8;
      const th=((hh>>>3)%628)/100, ph=Math.acos(2*(((hh>>>7)%1000)/1000)-1);
      const c2=base.clone().offsetHSL(((((hh>>>5)%100)/100)-0.5)*0.14, 0, ((((hh>>>9)%100)/100)-0.5)*0.26);
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:dotTexture(), color:c2, transparent:true,
        opacity:0.14+(((hh>>>11)%100)/100)*0.15, blending:THREE.AdditiveBlending, depthWrite:false}));
      s.position.set(r*Math.sin(ph)*Math.cos(th), r*Math.cos(ph)*0.8, r*Math.sin(ph)*Math.sin(th));
      s.scale.setScalar(0.45+(((hh>>>13)%100)/100)*0.85);
      s.raycast=()=>{}; g.add(s); }
    const hit=new THREE.Mesh(new THREE.SphereGeometry(1,10,8), new THREE.MeshBasicMaterial({visible:false}));
    g.add(hit);
    g.scale.setScalar(Math.max(1e-4,n._R||1)); return g;
  }
  if(region && n.type==='galaxy'){   // galaxies are DISCS / spheroids, not bubbles — shape follows morphology.
    // The Milky Way's disc is oriented to the TRUE galactic plane (north galactic pole RA 192.859° Dec +27.128°),
    // so it lines up with the open-cluster / pulsar / planetary-nebula clouds that trace the real disc.
    const g=new THREE.Group();
    const sp=(n.meta&&n.meta.spectral)||'';
    const f=/S0/.test(sp)?0.42 : /^E|elliptical|cD/i.test(sp)?0.62 : /dSph|spheroidal/i.test(sp)?0.6
          : /irr/i.test(sp)?0.5 : /spiral|S[AB(]/.test(sp)||n.name==='Milky Way'?0.24 : 0.45;
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,30,22),
      new THREE.MeshLambertMaterial({color:col, transparent:true, opacity:n.childIds.length?0.09:0.16,
        depthWrite:false, emissive:col, emissiveIntensity:0.3}));
    mesh.scale.set(1,f,1);
    const up=new THREE.Vector3(0,1,0);
    if(n.name==='Milky Way') mesh.quaternion.setFromUnitVectors(up, NGP.clone());
    else{ const h=hash(n.name);
      mesh.quaternion.setFromUnitVectors(up, new THREE.Vector3(Math.cos((h%628)/100),
        (((h>>>3)%100)/100)*1.6-0.8, Math.sin(((h>>>6)%628)/100)).normalize()); }
    g.add(mesh);
    g.scale.setScalar(Math.max(1e-4,n._R||1)); return g;
  }
  if(!region && (n.type==='planet'||n.type==='moon'||n.type==='dwarf')){   // unphotographed worlds: procedural
    // surface (!region matters: "The Solar System" node is type planet but is a see-through container)
    const g=new THREE.Group();
    const sph=new THREE.Mesh(new THREE.SphereGeometry(1,32,22), new THREE.MeshBasicMaterial({map:procTex(n)}));
    g.add(sph); _spinners.push(sph);
    g.scale.setScalar(Math.max(1e-4,n._R||1)); return g;
  }
  const isBelt=['Asteroid Belt','Kuiper Belt','Oort Cloud'].includes(n.name);
  const diffuse = region || n.type==='nebula' || isBelt;
  const op = region ? (n.childIds.length?0.09:0.16) : (isBelt?0.07:(diffuse?0.26:0.96));   // belts are now concentric shells — keep them whisper-faint
  const geo=new THREE.SphereGeometry(1, diffuse?26:16, diffuse?18:12);
  const mat=new THREE.MeshLambertMaterial({color:col, transparent:true, opacity:op,
    depthWrite:!diffuse, emissive:col, emissiveIntensity:diffuse?0.3:0.08});
  const m=new THREE.Mesh(geo,mat); m.scale.setScalar(Math.max(1e-4,n._R||1)); return m;
}
function sizeNodes(){ NODES.forEach(n=>{ const o=n.__threeObj; if(o&&o.scale) o.scale.setScalar(Math.max(1e-4,n._R||1)); }); }
function refresh(){ Graph.graphData(currentData()); updateHud(); syncLabels(); }


/* ===================== DARK MATTER / DARK ENERGY / ANTIMATTER — mapped as FIELDS =====================
   These have no single location, so they aren't bubbles. Dark matter = a cosmic-web point cloud with
   dense halos around each galaxy; dark energy = a faint, pervasive haze filling all of space;
   antimatter = a scatter of sparse fleeting flecks. Rendered as THREE.Points in the graph's scene. */
let _darkFields=[], _dotTex=null;
/* data for the fields — shown in the panel when their points are clicked (they're mapped, not bubbles) */
const FIELD_META={
 darkmatter:{name:"Dark Matter",label:"Dark matter · field",color:"#8b7bd8",rows:[["Nature","Non-luminous, non-baryonic (WIMPs? axions?)"],["Share","~27% of the universe"],["Where","Halos around & between galaxies — the cosmic web"],["Detection","Inferred by gravity only; never seen directly"]],note:"Invisible mass that binds galaxies and scaffolds the cosmic web — five times more abundant than ordinary matter, yet its particle nature is still unknown."},
 darkenergy:{name:"Dark Energy",label:"Dark energy · field",color:"#67e8f9",rows:[["Nature","Repulsive energy of empty space (Λ)"],["Share","~68% of the universe's energy"],["Where","Everywhere, uniformly"],["Detection","Inferred from the accelerating expansion"]],note:"A repulsive energy of the vacuum that is driving the expansion of the universe to accelerate — the dominant component of the cosmos, and its biggest mystery."},
 antimatter:{name:"Antimatter",label:"Antimatter · field",color:"#ff7ac6",rows:[["Nature","Mirror particles (positrons, antiprotons…)"],["Share","Nearly absent today"],["Where","Cosmic rays, accelerators, brief flashes"],["Puzzle","Why matter beat antimatter after the Big Bang"]],note:"Mirror matter that annihilates on contact with ordinary matter. Its near-total absence today — the matter/antimatter asymmetry — is one of physics' deepest open questions."},
 igm:{name:"Intergalactic Medium",label:"Intergalactic gas · field",color:"#9fd0ff",rows:[["Nature","Thin ionised hydrogen & helium"],["Share","About half of all ordinary matter"],["Where","Filaments bridging galaxies (the cosmic web)"],["Temperature","~10⁵–10⁷ K (warm-hot)"]],note:"The tenuous gas strung between galaxies along the cosmic web — most of the universe's ordinary matter lives here, not in stars."},
};
function dotTexture(){ if(_dotTex) return _dotTex; const c=document.createElement('canvas'); c.width=c.height=64;
  const g=c.getContext('2d'), grd=g.createRadialGradient(32,32,0,32,32,32);
  grd.addColorStop(0,'rgba(255,255,255,1)'); grd.addColorStop(.6,'rgba(255,255,255,.9)'); grd.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=grd; g.beginPath(); g.arc(32,32,32,0,7); g.fill(); _dotTex=new THREE.Texture(c); _dotTex.needsUpdate=true; return _dotTex; }
function addField(scene, arr, color, size, opacity, key){
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(arr,3));
  const mat=new THREE.PointsMaterial({color, size:size*2.1, map:dotTexture(), transparent:true, opacity, sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
  const pts=new THREE.Points(geo,mat);
  pts.frustumCulled=false;   // cross-version THREE mis-computes the frustum check and culls the whole cloud → force-render
  pts.renderOrder=-1; pts.userData={field:key}; scene.add(pts); _darkFields.push(pts); return pts;
}
function sphere(cx,cy,cz,r){ const t=Math.random()*2*Math.PI, p=Math.acos(2*Math.random()-1), s=Math.sin(p);
  return [cx+r*s*Math.cos(t), cy+r*s*Math.sin(t), cz+r*Math.cos(p)]; }
function buildDarkFields(){
  if(typeof THREE==='undefined' || !Graph.scene) return;
  const scene=Graph.scene(), RMAX=720;
  // A standalone COSMIC WEB filling the whole volume (independent of where galaxies sit, which now cluster near
  // the centre) — random web nodes, dark-matter clumps at them, filaments between neighbours, plus diffuse fill + voids.
  const webNodes=[]; for(let i=0;i<44;i++) webNodes.push(sphere(0,0,0, 90+Math.cbrt(Math.random())*(RMAX-90)));
  const near=lim=>{ const arr=[]; for(let i=0;i<webNodes.length;i++)for(let j=i+1;j<webNodes.length;j++){ const a=webNodes[i],c=webNodes[j],
    d=Math.hypot(a[0]-c[0],a[1]-c[1],a[2]-c[2]); if(d<lim)arr.push([a,c,d]); } return arr; };
  // ---- Dark matter: clumps at web nodes + filaments + faint diffuse ----
  const dm=[];
  webNodes.forEach(n=>{ for(let i=0;i<55;i++){ const p=sphere(n[0],n[1],n[2], 14+Math.cbrt(Math.random())*44); dm.push(p[0],p[1],p[2]); }});
  near(230).forEach(([a,c,d])=>{ const m=Math.floor(d/9); for(let k=0;k<m;k++){ const t=k/m, w=11;
    dm.push(a[0]+(c[0]-a[0])*t+(Math.random()-.5)*w, a[1]+(c[1]-a[1])*t+(Math.random()-.5)*w, a[2]+(c[2]-a[2])*t+(Math.random()-.5)*w); }});
  for(let i=0;i<1500;i++){ if(Math.random()<0.4) continue; const p=sphere(0,0,0, 80+Math.cbrt(Math.random())*(RMAX-80)); dm.push(p[0],p[1],p[2]); }
  addField(scene, dm, 0x9a86ee, 3.0, 0.3, 'darkmatter');
  // ---- Dark energy: uniform, pervasive haze filling the whole volume ----
  const de=[]; for(let i=0;i<1700;i++){ const p=sphere(0,0,0, Math.cbrt(Math.random())*RMAX); de.push(p[0],p[1],p[2]); }
  addField(scene, de, 0x67e8f9, 3.2, 0.24, 'darkenergy');
  // ---- Antimatter: a few sparse, fleeting flecks ----
  const am=[]; for(let i=0;i<45;i++){ const p=sphere(0,0,0, 60+Math.random()*(RMAX-60)); am.push(p[0],p[1],p[2]); }
  addField(scene, am, 0xff8fce, 7.0, 0.65, 'antimatter');
  // ---- Intergalactic medium: warm-hot gas tracing the web filaments (the cosmic web's baryons) ----
  const igm=[];
  near(230).forEach(([a,c,d])=>{ const m=Math.floor(d/13); for(let k=0;k<m;k++){ const t=k/m, w=6;
    igm.push(a[0]+(c[0]-a[0])*t+(Math.random()-.5)*w, a[1]+(c[1]-a[1])*t+(Math.random()-.5)*w, a[2]+(c[2]-a[2])*t+(Math.random()-.5)*w); }});
  for(let i=0;i<700;i++){ const p=sphere(0,0,0, 90+Math.cbrt(Math.random())*(RMAX-90)); igm.push(p[0],p[1],p[2]); }
  addField(scene, igm, 0x9fd0ff, 3.0, 0.28, 'igm');
}
function setDarkFieldsVisible(v){ _darkFields.forEach(p=>p.visible=v); }

/* ===================== THE REAL STAR FIELD — Yale Bright Star Catalogue =====================
   All ~9,100 naked-eye stars (BSC5, Hoffleit & Warren 1991) rendered INSIDE the Milky Way bubble,
   each at its true sky direction (RA/Dec) as seen from the Solar System, coloured by spectral class,
   brighter stars nearer & larger. Clicking a star shows its catalogue data. */
let _starCloud=null, _starData=null;
const SPEC_BY_IDX=[SPEC.O,SPEC.B,SPEC.A,SPEC.F,SPEC.G,SPEC.K,SPEC.M,'#e8ecff'];
function buildStarCloud(){
  if(typeof BSC==='undefined'||typeof THREE==='undefined'||!Graph.scene) return;
  const mw=NODES.find(n=>n.name==='Milky Way'), ss=NODES.find(n=>n.name==='The Solar System'); if(!mw||!ss) return;
  const cx=ss.x, cy=ss.y, cz=ss.z;   // the celestial sphere is centred on us
  const maxR=Math.max(16, (mw._R - Math.hypot(cx-mw.x,cy-mw.y,cz-mw.z)) * 0.94);
  const minR=(ss._R||8)*1.15;
  const pos=new Float32Array(BSC.length*3), col=new Float32Array(BSC.length*3), c=new THREE.Color();
  _starData=new Array(BSC.length);
  BSC.forEach((s,i)=>{
    const ra=s[0]*Math.PI/180, dec=s[1]*Math.PI/180, m=s[2];
    // brighter → (statistically) nearer: map mag −1.5…8 → radius minR…maxR
    const r=minR + Math.pow(Math.min(1,Math.max(0,(m+1.5)/9.5)),0.8)*(maxR-minR);
    pos[i*3]  =cx + r*Math.cos(dec)*Math.cos(ra);
    pos[i*3+1]=cy + r*Math.sin(dec);
    pos[i*3+2]=cz + r*Math.cos(dec)*Math.sin(ra);
    c.set(SPEC_BY_IDX[s[3]]); const b=Math.max(0.45, 1.15-m*0.09);   // brighter mag → brighter point
    col[i*3]=c.r*b; col[i*3+1]=c.g*b; col[i*3+2]=c.b*b;
    _starData[i]=s;
  });
  // squash the sprinkle into the REAL galactic disc (≈28% thickness about the Galaxy's plane) —
  // the Milky Way is a disc, not a ball; the Sun genuinely sits in that plane
  for(let i=0;i<BSC.length;i++){
    const px=pos[i*3]-mw.x, py=pos[i*3+1]-mw.y, pz=pos[i*3+2]-mw.z;
    const comp=px*NGP.x+py*NGP.y+pz*NGP.z;
    pos[i*3]-=NGP.x*comp*0.72; pos[i*3+1]-=NGP.y*comp*0.72; pos[i*3+2]-=NGP.z*comp*0.72;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const mat=new THREE.PointsMaterial({size:2.6, map:dotTexture(), vertexColors:true, transparent:true, opacity:0.95,
    sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});   // px size: attenuated points become giant squares at deep zoom
  _starCloud=new THREE.Points(geo,mat);
  _starCloud.frustumCulled=false;   // (bounding-sphere culling mis-fires across THREE versions)
  Graph.scene().add(_starCloud);
}
/* ===================== THE REAL LARGE-SCALE STRUCTURE — SDSS galaxy survey =====================
   18,000 spectroscopic galaxies from the Sloan Digital Sky Survey (DR17), each at its true sky
   direction (RA/Dec) with distance from its measured redshift — the actual cosmic web, measured. */
let _sdssCloud=null;
function buildGalaxySurvey(){
  if(typeof SDSS==='undefined'||typeof THREE==='undefined'||!Graph.scene) return;
  const home=NODES.find(n=>n.name==='Laniakea Supercluster'); const r0=(home?home._R:300)+40, r1=700;
  const pos=new Float32Array(SDSS.length*3), col=new Float32Array(SDSS.length*3), c=new THREE.Color();
  SDSS.forEach((g,i)=>{
    const ra=g[0]*Math.PI/180, dec=g[1]*Math.PI/180, z=g[2];
    const r=r0 + Math.min(1, z/0.35)*(r1-r0);            // redshift → depth (comoving-ish, linearly compressed)
    pos[i*3]  =r*Math.cos(dec)*Math.cos(ra);
    pos[i*3+1]=r*Math.sin(dec);
    pos[i*3+2]=r*Math.cos(dec)*Math.sin(ra);
    c.setHSL(0.72 - Math.min(1,z/0.35)*0.72, 0.55, 0.66); // nearby=violet → distant=warm (redshift!)
    col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
  });
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const mat=new THREE.PointsMaterial({size:2.4, map:dotTexture(), vertexColors:true, transparent:true, opacity:0.75,
    sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
  _sdssCloud=new THREE.Points(geo,mat);
  _sdssCloud.frustumCulled=false;
  Graph.scene().add(_sdssCloud);
}
function pickSdss(e){
  if(!_sdssCloud||!_sdssCloud.visible||!ensureRay()||!Graph.camera) return null;
  const rect=elGraph.getBoundingClientRect();
  _fieldRay.setFromCamera({x:((e.clientX-rect.left)/rect.width)*2-1, y:-((e.clientY-rect.top)/rect.height)*2+1}, Graph.camera());
  _fieldRay.params.Points.threshold=Math.max(2, Math.hypot(Graph.cameraPosition().x,Graph.cameraPosition().y,Graph.cameraPosition().z)/220);
  const h=_fieldRay.intersectObject(_sdssCloud,false);
  return h.length? h[0].index : null;
}
function showSdssPanel(i){
  const g=SDSS[i]; if(!g) return; pph.style.display='none';
  const zc=+g[2], dGly=(zc*4.28).toFixed(2);   // rough comoving distance ≈ z·c/H0 for small z
  let h=`<span class="tag" style="background:#c8b6ff;color:#04121a;border-color:#c8b6ff">Galaxy · SDSS survey</span>`;
  h+=`<h2>SDSS galaxy</h2><div class="years">Sloan Digital Sky Survey · DR17 spectroscopic catalogue</div><div class="rows">`;
  h+=row('Redshift z',zc)+row('Distance','~'+dGly+' Gly')+row('Right ascension',g[0].toFixed(2)+'°')+row('Declination',g[1].toFixed(2)+'°')+`</div>`;
  h+=`<div class="note" style="font-style:normal;color:#dbe4ff">One of 18,000 real galaxies measured by the Sloan Digital Sky Survey — together they trace the actual cosmic web: walls, filaments and voids of the large-scale universe.</div>`;
  pbd.innerHTML=h; panel.classList.add('open');
}
/* ===================== REAL MEMBER CATALOGUES inside the bubbles =====================
   Milky Way ⊃ 145 globular clusters (Harris 1996) at true 3-D positions from the Sun;
   Local Group ⊃ 101 galaxies (McConnachie 2012) at true 3-D positions;
   Virgo & Coma clusters ⊃ their real SDSS member galaxies. All clickable. */
let _memberClouds=[];
function addMemberCloud(pos, colorHex, size, data, kindLabel, panelFn){
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
  const px=Math.min(2.6, 0.9+size*1.3);   // constant PIXEL size — attenuated points turn into giant squares once the camera can fly deep
  const mat=new THREE.PointsMaterial({color:colorHex, size:px*1.6, map:dotTexture(), transparent:true, opacity:0.9,
    sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
  const pts=new THREE.Points(geo,mat); pts.frustumCulled=false;
  Graph.scene().add(pts); _memberClouds.push({pts,data,kindLabel,panelFn}); return pts;
}
function dirOf(raDeg,decDeg){ const ra=raDeg*Math.PI/180, dec=decDeg*Math.PI/180;
  return [Math.cos(dec)*Math.cos(ra), Math.sin(dec), Math.cos(dec)*Math.sin(ra)]; }
function buildMemberClouds(){
  if(typeof THREE==='undefined'||!Graph.scene) return;
  const N=nm=>NODES.find(n=>n.name===nm);
  const mw=N('Milky Way'), ss=N('The Solar System'), lgN=N('Local Group'), vir=N('Virgo Cluster'), com=N('Coma Cluster');
  // Milky Way globulars — real 3-D: direction RA/Dec from the Sun, radius = Rsun (kpc), scaled to fit the bubble
  let kpcScale=1;
  if(typeof MWGC!=='undefined' && mw && ss){
    const maxK=Math.max(...MWGC.map(g=>g[2])), fit=(mw._R - Math.hypot(ss.x-mw.x,ss.y-mw.y,ss.z-mw.z))*0.92;
    kpcScale=fit/maxK;
    const pos=[]; MWGC.forEach(g=>{ const d=dirOf(g[0],g[1]), r=g[2]*kpcScale;
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0xa9e5ff, 0.9, MWGC, 'Globular cluster · Milky Way',
      s=>[['Distance from Sun',s[2]+' kpc ('+(s[2]*3.26).toFixed(0)+' kly)'],['Right ascension',s[0].toFixed(2)+'°'],['Declination',s[1].toFixed(2)+'°']]);
  }
  // Milky Way OPEN clusters (Gaia) — same real scale as the globulars, so the flat disc vs round halo shows
  if(typeof MWOC!=='undefined' && mw && ss){
    const pos=[]; MWOC.forEach(g=>{ const d=dirOf(g[0],g[1]), r=(g[2]/1000)*kpcScale;
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0xffe9a8, 0.55, MWOC, 'Open cluster · Milky Way',
      s=>[['Distance from Sun',s[2].toLocaleString()+' pc ('+(s[2]*3.26/1000).toFixed(1)+' kly)'],['Right ascension',s[0].toFixed(2)+'°'],['Declination',s[1].toFixed(2)+'°']]);
  }
  // Local Group galaxies — real 3-D from the Milky Way, scaled into the Local Group bubble
  if(typeof LGDW!=='undefined' && lgN && mw){
    const raw=LGDW.map(g=>{ const d=dirOf(g[0],g[1]); return [mw.x+d[0]*g[2], mw.y+d[1]*g[2], mw.z+d[2]*g[2]]; });
    const maxD=Math.max(...raw.map(p=>Math.hypot(p[0]-lgN.x,p[1]-lgN.y,p[2]-lgN.z)));
    const k=(lgN._R*0.92)/maxD, pos=[];
    raw.forEach(p=>pos.push(lgN.x+(p[0]-lgN.x)*k, lgN.y+(p[1]-lgN.y)*k, lgN.z+(p[2]-lgN.z)*k));
    addMemberCloud(pos, 0xc8b6ff, 1.6, LGDW, 'Dwarf galaxy · Local Group',
      s=>[['Distance',s[2]+' kpc ('+(s[2]*3.26/1000).toFixed(2)+' Mly)'],['Right ascension',s[0].toFixed(2)+'°'],['Declination',s[1].toFixed(2)+'°']]);
  }
  // Virgo & Coma cluster members — sky offsets from cluster centre spread across the bubble, depth from redshift
  const clusterCloud=(node,DATA0,c0,d0,zmid,zspan,color)=>{
    if(!node||typeof DATA0==='undefined') return;
    const R=node._R*0.9, pos=[];
    DATA0.forEach(g=>{ const dx=(g[0]-c0)*Math.cos(d0*Math.PI/180), dy=g[1]-d0;
      const s=R/6.5;   // ~6.5° cluster field mapped across the bubble
      pos.push(node.x+dx*s, node.y+dy*s, node.z+Math.max(-R,Math.min(R,(g[2]-zmid)/zspan*R))); });
    addMemberCloud(pos, color, 1.1, DATA0, 'Member galaxy · '+node.name,
      s=>[['Redshift z',s[2]],['Right ascension',s[0].toFixed(3)+'°'],['Declination',s[1].toFixed(3)+'°']]);
  };
  clusterCloud(vir, typeof VIRGO!=='undefined'?VIRGO:undefined, 187.7, 12.39, 0.0048, 0.006, 0xd9c8ff);
  clusterCloud(com, typeof COMA!=='undefined'?COMA:undefined, 194.95, 27.98, 0.0231, 0.011, 0xd9c8ff);
  // Andromeda's confirmed globular clusters (RBC v5) — sky offsets from M31's centre across its bubble,
  // depth jittered (no line-of-sight distances exist for most)
  const m31=N('Andromeda Galaxy');
  if(typeof M31GC!=='undefined' && m31){
    const R=m31._R*0.92, s=R/2.6, pos=[];   // the GC system spans ~±2.6° on the sky
    M31GC.forEach(g=>{ const dx=(g[0]-10.6847)*Math.cos(41.269*Math.PI/180), dy=g[1]-41.2691;
      const h=hash(g[3]||String(g[0]));
      pos.push(m31.x+Math.max(-R,Math.min(R,dx*s)), m31.y+Math.max(-R,Math.min(R,dy*s)), m31.z+((h%100)/100-0.5)*R*0.8); });
    addMemberCloud(pos, 0xa9e5ff, 0.8, M31GC, 'Globular cluster · Andromeda',
      s2=>[['V magnitude',s2[2]==null?'—':s2[2]],['Right ascension',s2[0].toFixed(3)+'°'],['Declination',s2[1].toFixed(3)+'°']]);
  }
  // Triangulum's star clusters (San Roman+ 2010) — sky offsets from M33's centre across its bubble
  const m33=N('Triangulum Galaxy');
  if(typeof M33CL!=='undefined' && m33){
    const R=m33._R*0.92, s=R/0.65, pos=[];   // the surveyed field spans ~±0.65°
    M33CL.forEach(g=>{ const dx=(g[0]-23.4621)*Math.cos(30.66*Math.PI/180), dy=g[1]-30.6602;
      const h=hash(g[3]||String(g[0]));
      pos.push(m33.x+Math.max(-R,Math.min(R,dx*s)), m33.y+Math.max(-R,Math.min(R,dy*s)), m33.z+((h%100)/100-0.5)*R*0.7); });
    addMemberCloud(pos, 0xa9e5ff, 0.55, M33CL, 'Star cluster · Triangulum',
      s2=>[['g magnitude',s2[2]==null?'—':s2[2]],['Right ascension',s2[0].toFixed(3)+'°'],['Declination',s2[1].toFixed(3)+'°']]);
  }
  // The Magellanic Clouds — every catalogued cluster, association, emission nebula & HI shell (Bica+ 2008),
  // sky offsets from each Cloud's centre mapped across its bubble
  const MAGT={C:'Star cluster',A:'Stellar association',N:'Emission nebula',H:'H I shell / supershell',S:'Supernova remnant',D:'Nebular complex'};
  const magCloud=(nodeName,DATA0,c0,d0,span,kindLabel)=>{
    const node=N(nodeName); if(!node||typeof DATA0==='undefined') return;
    const R=node._R*0.92, s=R/span, pos=[];
    DATA0.forEach(g=>{ const dx=(g[0]-c0)*Math.cos(d0*Math.PI/180), dy=g[1]-d0;
      const h=hash(g[3]||String(g[0]));
      pos.push(node.x+Math.max(-R,Math.min(R,dx*s)), node.y+Math.max(-R,Math.min(R,dy*s)), node.z+((h%100)/100-0.5)*R*0.7); });
    addMemberCloud(pos, 0xa9e5ff, 0.55, DATA0, kindLabel,
      s2=>[['Type',(MAGT[(s2[2]||'?')[0]]||s2[2])+' ('+s2[2]+')'],['Name',s2[3]||'—'],
           ['Right ascension',s2[0].toFixed(3)+'°'],['Declination',s2[1].toFixed(3)+'°']]);
  };
  magCloud('Large Magellanic Cloud', typeof LMCCAT!=='undefined'?LMCCAT:undefined, 80.894,-69.756, 5.5, 'Cluster / nebula · LMC');
  magCloud('Small Magellanic Cloud', typeof SMCCAT!=='undefined'?SMCCAT:undefined, 13.187,-72.829, 3.2, 'Cluster / nebula · SMC');
  // M87's globular cluster system (Strader+ 2011) — the richest known, ~12,000 estimated; 1,664 catalogued here
  const m87=N('Messier 87');
  if(typeof M87GC!=='undefined' && m87){
    const R=m87._R*0.92, s=R/0.45, pos=[];
    M87GC.forEach(g=>{ const dx=(g[0]-187.7059)*Math.cos(12.391*Math.PI/180), dy=g[1]-12.3911;
      const h=hash(g[2]||String(g[0]));
      pos.push(m87.x+Math.max(-R,Math.min(R,dx*s)), m87.y+Math.max(-R,Math.min(R,dy*s)), m87.z+((h%100)/100-0.5)*R*0.8); });
    addMemberCloud(pos, 0xa9e5ff, 0.8, M87GC, 'Globular cluster · Messier 87',
      s2=>[['Identifier',s2[2]||'—'],['Right ascension',s2[0].toFixed(4)+'°'],['Declination',s2[1].toFixed(4)+'°']]);
  }
  // Per-galaxy member catalogues (globulars / star clusters) — generic: sky offsets from the host's centre,
  // survey field span auto-computed (97th percentile) so each catalogue fills its galaxy's bubble
  const gxCloud=(nodeName,DATA0,c0,d0,kindLabel,idLabel,px,color)=>{
    const node=N(nodeName); if(!node||typeof DATA0==='undefined'||!DATA0.length) return;
    const cosd=Math.cos(d0*Math.PI/180);
    const offs=DATA0.map(g=>Math.max(Math.abs((g[0]-c0)*cosd), Math.abs(g[1]-d0))).sort((a,b)=>a-b);
    const span=Math.max(1e-4, offs[Math.floor(offs.length*0.97)]);
    const R=node._R*0.92, s=R/span, pos=[];
    DATA0.forEach(g=>{ const dx=(g[0]-c0)*cosd, dy=g[1]-d0, h=hash(String(g[2]==null?g[0]:g[2])+String(g[0]));
      pos.push(node.x+Math.max(-R,Math.min(R,dx*s)), node.y+Math.max(-R,Math.min(R,dy*s)), node.z+((h%100)/100-0.5)*R*0.75); });
    addMemberCloud(pos, color||0xa9e5ff, px||0.7, DATA0, kindLabel,
      s2=>[[idLabel,s2[2]==null?'—':s2[2]],['Right ascension',s2[0].toFixed(4)+'°'],['Declination',s2[1].toFixed(4)+'°']]);
  };
  gxCloud("Bode's Galaxy",    typeof M81FLD!=='undefined'?M81FLD:undefined, 148.888, 69.065, 'Cluster candidate / source · M81','Identifier',0.6);
  gxCloud('Whirlpool Galaxy', typeof M51CL !=='undefined'?M51CL :undefined, 202.470, 47.195, 'Star cluster · M51 (Whirlpool)','Catalogue no.',0.55);
  gxCloud('Pinwheel Galaxy',  typeof M101CL!=='undefined'?M101CL:undefined, 210.802, 54.349, 'Star cluster · M101 (Pinwheel)','Identifier',0.8);
  gxCloud('Pinwheel Galaxy',  typeof M101HII!=='undefined'?M101HII:undefined, 210.802, 54.349, 'H II region · M101','Identifier',0.75, 0xff9ad5);
  gxCloud('Cigar Galaxy',     typeof M82CL !=='undefined'?M82CL :undefined, 148.968, 69.680, 'Star cluster · M82 (Cigar)','Catalogue no.',0.7);
  gxCloud('Centaurus A',      typeof CENGC !=='undefined'?CENGC :undefined, 201.365,-43.019, 'Globular cluster · Centaurus A','Identifier',0.8);
  gxCloud('Sombrero Galaxy',  typeof M104GC!=='undefined'?M104GC:undefined, 189.998,-11.623, 'Globular cluster · M104 (Sombrero)','Catalogue no.',0.8);
  gxCloud('Antennae Galaxies',typeof ANTSRC!=='undefined'?ANTSRC:undefined, 180.472,-18.877, 'Star cluster / source · Antennae','Catalogue no.',0.55);
  // The Messier star clusters themselves — REAL member/field stars from Gaia, so the cluster bubbles
  // hold actual stars (open clusters: Gaia Collaboration 2018 members; globulars: brightest Gaia DR3 stars)
  const STARCOL=0xffe9c9;
  if(typeof OCSTARS!=='undefined'){
    gxCloud('Pleiades', OCSTARS.Pleiades, 56.750, 24.117, 'Member star · Pleiades (Gaia)','G magnitude',0.5,STARCOL);
    gxCloud('Hyades',   OCSTARS.Hyades,   66.750, 15.867, 'Member star · Hyades (Gaia)','G magnitude',0.5,STARCOL);
  }
  if(typeof GCSTARS!=='undefined'){
    gxCloud('47 Tucanae',    GCSTARS['47 Tucanae'],     6.0224,-72.0814, 'Star · 47 Tucanae (Gaia DR3)','G magnitude',0.45,STARCOL);
    gxCloud('Omega Centauri',GCSTARS['Omega Centauri'],201.6970,-47.4795,'Star · Omega Centauri (Gaia DR3)','G magnitude',0.45,STARCOL);
    gxCloud('Messier 13',    GCSTARS['Messier 13'],    250.4218, 36.4599,'Star · Messier 13 (Gaia DR3)','G magnitude',0.45,STARCOL);
    gxCloud('Messier 54',    GCSTARS['Messier 54'],    283.7638,-30.4798,'Star · Messier 54 (Gaia DR3)','G magnitude',0.45,STARCOL);
  }
  // Local Volume galaxies (Karachentsev+ 2013) — every known galaxy within ~11 Mpc, true 3-D from the Milky Way,
  // scaled into the Virgo Supercluster bubble (our local neighbourhood of the supercluster)
  const vsc=N('Virgo Supercluster');
  if(typeof LVGAL!=='undefined' && vsc && mw){
    const raw=LVGAL.map(g=>{ const d=dirOf(g[0],g[1]); return [mw.x+d[0]*g[2], mw.y+d[1]*g[2], mw.z+d[2]*g[2]]; });
    const maxD=Math.max(...raw.map(p=>Math.hypot(p[0]-vsc.x,p[1]-vsc.y,p[2]-vsc.z)));
    const k=(vsc._R*0.94)/maxD, pos=[];
    raw.forEach(p=>pos.push(vsc.x+(p[0]-vsc.x)*k, vsc.y+(p[1]-vsc.y)*k, vsc.z+(p[2]-vsc.z)*k));
    addMemberCloud(pos, 0xc8b6ff, 1.2, LVGAL, 'Galaxy · Local Volume',
      s2=>[['Distance',s2[2]+' Mpc ('+(s2[2]*3.26).toFixed(1)+' Mly)'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°']]);
  }
  // Every confirmed EXOPLANET (NASA Exoplanet Archive) — true 3-D from the Sun (host-system distances).
  // The Kepler cone and the solar neighbourhood shell are real survey geometry.
  if(typeof EXO!=='undefined' && mw && ss){
    const pos=[]; EXO.forEach(g=>{ const d=dirOf(g[0],g[1]), r=Math.min((g[2]/1000)*kpcScale, mw._R*0.95);
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0x7fe0a0, 0.5, EXO, 'Exoplanet · NASA Archive',
      s2=>[['Distance',s2[2].toLocaleString()+' pc ('+(s2[2]*3.26).toFixed(0)+' ly)'],['Discovered',s2[4]||'—'],['Method',s2[5]||'—'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°']]);
  }
  // CITIZEN SCIENCE — Community TESS Objects of Interest: planet candidates found & submitted by
  // volunteers and independent hunters (ExoFOP-TESS). True 3-D from the Sun via host-star distances.
  if(typeof CTOICAT!=='undefined' && mw && ss){
    const pos=[]; CTOICAT.forEach(g=>{ const d=dirOf(g[0],g[1]), pc=g[2]||120;
      const r=Math.min((pc/1000)*kpcScale, mw._R*0.95);
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0xffd166, 0.55, CTOICAT, 'Community planet candidate · ExoFOP',
      s2=>[['CTOI',s2[3]||'—'],['Found / submitted by',s2[4]||'—'],
           ['Distance',s2[2]!=null?s2[2].toLocaleString()+' pc ('+(s2[2]*3.26).toFixed(0)+' ly)':'—'],
           ['Orbital period',s2[5]!=null?s2[5]+' d':'—'],
           ['Promoted to TOI',s2[6]||'not yet'],
           ['Right ascension',s2[0].toFixed(3)+'°'],['Declination',s2[1].toFixed(3)+'°']]);
  }
  // CITIZEN SCIENCE — the 20-pc brown-dwarf census (Kirkpatrick+ 2021), consolidating the
  // Backyard Worlds: Planet 9 volunteer discoveries. Our coldest, nearest neighbours.
  if(typeof BYWCAT!=='undefined' && mw && ss){
    const pos=[]; BYWCAT.forEach(g=>{ const d=dirOf(g[0],g[1]), r=Math.min((g[2]/1000)*kpcScale, mw._R*0.95);
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0xd98a5c, 0.6, BYWCAT, 'Brown dwarf · 20 pc census',
      s2=>[['Name',s2[3]||'—'],['Distance',s2[2]+' pc ('+(s2[2]*3.26).toFixed(1)+' ly)'],
           ['Right ascension',s2[0].toFixed(3)+'°'],['Declination',s2[1].toFixed(3)+'°']]);
  }
  // Every catalogued PULSAR (ATNF) — true 3-D from the Sun; they trace the galactic disc & its dead stars
  if(typeof PSR!=='undefined' && mw && ss){
    const pos=[]; PSR.forEach(g=>{ const d=dirOf(g[0],g[1]), r=Math.min(g[2]*kpcScale, mw._R*0.97);
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0x67e8f9, 0.55, PSR, 'Pulsar · ATNF catalogue',
      s2=>[['Distance',s2[2]+' kpc ('+(s2[2]*3.26).toFixed(1)+' kly)'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°']]);
  }
  // QUASARS (SDSS, z 0.1–5) — the deep universe: a shell from beyond the galaxy survey out toward the CMB
  if(typeof QSO!=='undefined'){
    const r0=705, r1=1060, pos=[], col=[], c=new THREE.Color();
    const geo=new THREE.BufferGeometry();
    QSO.forEach(g=>{ const d=dirOf(g[0],g[1]), r=r0+Math.min(1,(g[2]-0.1)/4.9)*(r1-r0);
      pos.push(d[0]*r, d[1]*r, d[2]*r);
      c.setHSL(0.085-Math.min(1,(g[2]-0.1)/4.9)*0.085, 0.85, 0.6);   // orange → deep red with z
      col.push(c.r,c.g,c.b); });
    geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    const mat=new THREE.PointsMaterial({size:2.3, map:dotTexture(), vertexColors:true, transparent:true, opacity:0.8,
      sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; Graph.scene().add(pts);
    _memberClouds.push({pts, data:QSO, kindLabel:'Quasar · SDSS',
      panelFn:s2=>[['Redshift z',s2[2]],['Distance','~'+(s2[2]*4.28/(1+s2[2]*0.28)).toFixed(1)+' Gly (light-travel)'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°']]});
  }
  // SUPERNOVA REMNANTS (Green 2019) — true sky direction in the Milky Way disc; catalogue has no distances,
  // so depth is a disc-like spread (noted in the panel)
  if(typeof SNRCAT!=='undefined' && mw && ss){
    const pos=[]; SNRCAT.forEach(g=>{ const d=dirOf(g[0],g[1]), h=hash(g[3]), r=(1.5+(h%50)/10)*kpcScale;
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0xff8fb0, 0.8, SNRCAT, 'Supernova remnant · Green cat.',
      s2=>[['Angular size',s2[2]?s2[2]+'′':'—'],['Type',s2[4]||'—'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°'],['Depth','sky direction real; distance not in catalogue']]);
  }
  // PLANETARY NEBULAE (Strasbourg-ESO) — same: real directions, disc-spread depth
  if(typeof PNECAT!=='undefined' && mw && ss){
    const pos=[]; PNECAT.forEach(g=>{ const d=dirOf(g[0],g[1]), h=hash(g[2]), r=(0.8+(h%40)/10)*kpcScale;
      pos.push(ss.x+d[0]*r, ss.y+d[1]*r, ss.z+d[2]*r); });
    addMemberCloud(pos, 0xff6ec7, 0.6, PNECAT, 'Planetary nebula · Strasbourg-ESO',
      s2=>[['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°'],['Depth','sky direction real; distance not in catalogue']]);
  }
  // GRAVITATIONAL-WAVE EVENTS (GWTC) — merger shell by real luminosity distance; sky locations are broad
  if(typeof GWCAT!=='undefined'){
    const maxDL=Math.max(...GWCAT.map(g=>g[0])), pos=[];
    GWCAT.forEach(g=>{ const h=hash(g[3]), th=(h%360)*Math.PI/180, ph=(((h>>>4)%160)-80)*Math.PI/180;
      const r=340+Math.pow(g[0]/maxDL,0.45)*560;
      pos.push(r*Math.cos(ph)*Math.cos(th), r*Math.sin(ph), r*Math.cos(ph)*Math.sin(th)); });
    addMemberCloud(pos, 0x9ff2ff, 2.2, GWCAT, 'GW merger · LIGO/Virgo/KAGRA',
      s2=>[['Luminosity distance',s2[0].toLocaleString()+' Mpc'],['Mass 1',s2[1]!=null?s2[1]+' M☉':'—'],['Mass 2',s2[2]!=null?s2[2]+' M☉':'—'],['Sky position','approximate (GW localisations are broad)']]);
  }
  // HETDEX — the survey this map cites: 16,000 real sources (LAEs & galaxies) at true RA/Dec, depth by z
  if(typeof HETCAT!=='undefined'){
    const r0=690, r1=1080, pos=[], col=[], c=new THREE.Color();
    HETCAT.forEach(g=>{ const d=dirOf(g[0],g[1]), r=r0+Math.min(1,g[2]/4.2)*(r1-r0);
      pos.push(d[0]*r, d[1]*r, d[2]*r);
      c.setHSL(0.5-Math.min(1,g[2]/4.2)*0.15, 0.7, 0.62);   // cyan → teal-green with z (Lyman-α survey)
      col.push(c.r,c.g,c.b); });
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    const mat=new THREE.PointsMaterial({size:1.9, map:dotTexture(), vertexColors:true, transparent:true, opacity:0.65,
      sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; Graph.scene().add(pts);
    _memberClouds.push({pts, data:HETCAT, kindLabel:'Source · HETDEX',
      panelFn:s2=>[['Redshift z',s2[2]],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°']]});
  }
  // 2MRS — the ALL-SKY local universe (Huchra+ 2012): ~22k galaxies covering the whole sky (SDSS is one
  // wedge); fills the volume between our supercluster and the deep shells at real RA/Dec + redshift depth
  if(typeof MRS2!=='undefined'){
    const r0=330, r1=690, pos=[], col=[], c=new THREE.Color();
    MRS2.forEach(g=>{ const d=dirOf(g[0],g[1]), r=r0+Math.pow(Math.min(1,g[2]/0.05),0.85)*(r1-r0);
      pos.push(d[0]*r, d[1]*r, d[2]*r);
      c.setHSL(0.13, 0.35, 0.5+0.25*(1-Math.min(1,g[2]/0.05)));   // warm sand, nearer = brighter
      col.push(c.r,c.g,c.b); });
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    const mat=new THREE.PointsMaterial({size:1.9, map:dotTexture(), vertexColors:true, transparent:true, opacity:0.6,
      sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; Graph.scene().add(pts);
    _memberClouds.push({pts, data:MRS2, kindLabel:'Galaxy · 2MRS all-sky',
      panelFn:s2=>[['Redshift z',s2[2]],['Distance','~'+(s2[2]*4280).toFixed(0)+' Mly'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°']]});
  }
  // FAST RADIO BURSTS (CHIME/FRB cat 1) — real sky positions; depth scaled from dispersion measure
  if(typeof FRBCAT!=='undefined'){
    const pos=[]; FRBCAT.forEach(g=>{ const d=dirOf(g[0],g[1]), r=380+Math.min(1,g[2]/2000)*560;
      pos.push(d[0]*r, d[1]*r, d[2]*r); });
    addMemberCloud(pos, 0xff9df5, 2.4, FRBCAT, 'Fast radio burst · CHIME',
      s2=>[['Dispersion measure',s2[2]+' pc cm⁻³'],['Right ascension',s2[0].toFixed(2)+'°'],['Declination',s2[1].toFixed(2)+'°'],['Depth','scaled from DM (rough distance proxy)']]);
  }
  // ASTEROIDS (NASA/JPL SBDB) — 18,000 real orbits inside the Solar System bubble: the main belt,
  // Jupiter's trojan clouds and the trans-Neptunian belt, placed by semi-major axis & inclination
  if(typeof ASTCAT!=='undefined' && ss){
    const R=ss._R*0.96, la0=Math.log10(1.5), la1=Math.log10(60), pos=[], col=[], c=new THREE.Color();
    const CCOL=[0xd9c58f,0x7fe0d4,0x9fc9ff];
    ASTCAT.forEach((g,idx)=>{ const a=Math.max(1.6,Math.min(60,g[0]));
      const rr=R*(0.22+0.74*(Math.log10(a)-la0)/(la1-la0));
      const th=((hash('a'+idx)%3600)/3600)*Math.PI*2, tilt=(g[2]*Math.PI/180)*(((hash('b'+idx)%200)/100)-1);
      pos.push(ss.x+rr*Math.cos(th)*Math.cos(tilt*0.5), ss.y+rr*Math.sin(tilt*0.5), ss.z+rr*Math.sin(th)*Math.cos(tilt*0.5));
      c.set(CCOL[g[3]]); col.push(c.r,c.g,c.b); });
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    const mat=new THREE.PointsMaterial({size:1.4, map:dotTexture(), vertexColors:true, transparent:true, opacity:0.85,
      sizeAttenuation:false, depthWrite:false, blending:THREE.AdditiveBlending});
    const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; Graph.scene().add(pts);
    const CLS=['Main-belt asteroid','Jupiter trojan','Trans-Neptunian object'];
    _memberClouds.push({pts, data:ASTCAT, kindLabel:'Asteroid · JPL SBDB',
      panelFn:s2=>[['Class',CLS[s2[3]]],['Semi-major axis',s2[0]+' au'],['Eccentricity',s2[1]],['Inclination',s2[2]+'°'],['Position','statistical (real a, e, i; anomaly randomised)']]});
  }
}
function pickMember(e){
  if(!_memberClouds.length||!ensureRay()||!Graph.camera) return null;
  const rect=elGraph.getBoundingClientRect();
  _fieldRay.setFromCamera({x:((e.clientX-rect.left)/rect.width)*2-1, y:-((e.clientY-rect.top)/rect.height)*2+1}, Graph.camera());
  _fieldRay.params.Points.threshold=Math.max(0.8, Math.hypot(Graph.cameraPosition().x,Graph.cameraPosition().y,Graph.cameraPosition().z)/350);
  for(const mc of _memberClouds){ if(!mc.pts.visible) continue; const h=_fieldRay.intersectObject(mc.pts,false); if(h.length) return {mc, i:h[0].index}; }
  return null;
}
function showMemberPanel(hit){
  const {mc,i}=hit, s=mc.data[i]; if(!s) return; pph.style.display='none';
  const name=(typeof s[3]==='string'&&s[3])?s[3]:(mc.kindLabel.split(' · ')[0]+' #'+(i+1));
  let h=`<span class="tag" style="background:#a9e5ff;color:#04121a;border-color:#a9e5ff">${mc.kindLabel}</span>`;
  h+=`<h2>${name}</h2><div class="rows">`+mc.panelFn(s).map(r=>row(r[0],r[1])).join('')+`</div>`;
  h+=`<div class="note" style="font-style:normal;color:#dbe4ff">From a real astronomical catalogue — see the data credits, bottom right.</div>`;
  pbd.innerHTML=h; panel.classList.add('open');
}
function pickStar(e){
  if(!_starCloud||!_starCloud.visible||!ensureRay()||!Graph.camera) return null;
  const rect=elGraph.getBoundingClientRect();
  _fieldRay.setFromCamera({x:((e.clientX-rect.left)/rect.width)*2-1, y:-((e.clientY-rect.top)/rect.height)*2+1}, Graph.camera());
  const cam=Graph.cameraPosition();
  _fieldRay.params.Points.threshold=Math.max(0.5, Math.hypot(cam.x,cam.y,cam.z)/400);
  const h=_fieldRay.intersectObject(_starCloud,false);
  return h.length? h[0].index : null;
}
function showStarPanel(i){
  const s=_starData[i]; if(!s) return; pph.style.display='none';
  const ccol=SPEC_BY_IDX[s[3]], cls='OBAFGKM?'[s[3]];
  let h=`<span class="tag" style="background:${ccol};color:#04121a;border-color:${ccol}">Star · Yale BSC</span>`;
  h+=`<h2>${s[5]||('HR '+s[4])}</h2><div class="years">HR ${s[4]} · Bright Star Catalogue</div><div class="rows">`;
  h+=row('Magnitude',s[2])+row('Spectral class',cls==='?'?'—':cls)+row('Right ascension',s[0].toFixed(2)+'°')+row('Declination',s[1].toFixed(2)+'°')+`</div>`;
  h+=`<div class="note" style="font-style:normal;color:#dbe4ff">One of the ~9,100 naked-eye stars of the Yale Bright Star Catalogue — the real night sky, mapped inside the Milky Way.</div>`;
  pbd.innerHTML=h; panel.classList.add('open');
}

/* ===================== ON-BUBBLE LABELS ===================== */
const labelLayer=document.createElement('div');
labelLayer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:5;overflow:hidden';
document.body.appendChild(labelLayer);
const labelEls={};
function syncLabels(){
  const ok=new Set(currentData().nodes.map(n=>n.id));
  Object.keys(labelEls).forEach(id=>{ if(!ok.has(id)){ labelEls[id].remove(); delete labelEls[id]; }});
  ok.forEach(id=>{ if(labelEls[id]) return;
    const n=byId[id], col=nodeColor(n);
    const fs = n.kind==='root'?15:n.kind==='cat'?13:n.kind==='subcat'?11:10;
    const el=document.createElement('div'); el.textContent=n.name;
    el.style.cssText=`position:absolute;left:0;top:0;opacity:0;transform:translate(-9999px,-9999px);`+
      `font:600 ${fs}px 'Space Grotesk',system-ui,sans-serif;letter-spacing:.01em;color:#eaf0ff;white-space:nowrap;padding:2px 7px;`+
      `border-radius:6px;background:rgba(6,9,18,.62);border:1px solid ${col}66;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 4px 12px rgba(0,0,0,.35);`+
      `backdrop-filter:blur(3px);text-shadow:0 1px 3px #000;will-change:transform`;
    labelLayer.appendChild(el); labelEls[id]=el;
  });
}
let _crumbCamNode=null, _crumbCamLast=0;
function tickLabels(){
  requestAnimationFrame(tickLabels);
  if(!Graph||!Graph.graph2ScreenCoords) return;
  sizeNodes();                                   // keep sphere sizes in sync with context sizing
  _bhSpin.forEach(d=>d.rotation.z+=0.0035);      // slow accretion-disc rotation
  _spinners.forEach(sp=>sp.rotation.y+=0.0016);  // gentle planet rotation
  const W2=elGraph.clientWidth, H2=elGraph.clientHeight, SMALL=window.innerWidth<640, MAX=SMALL?14:56;
  let cam; try{ cam=Graph.cameraPosition(); }catch(e){ cam=null; }
  const cand=[];
  for(const id in labelEls){ const n=byId[id], el=labelEls[id];
    if(n.x==null || hiddenTypes.has(n.type)){ el.style.opacity=0; continue; }
    const cd = cam?Math.hypot(n.x-cam.x,n.y-cam.y,n.z-cam.z):1;
    // you're INSIDE this bubble (or it engulfs the whole view) → hide its name; the breadcrumb carries it
    if(cd < (n._R||0)*1.25){ el.style.opacity=0; continue; }
    // concentric belt shells: anchor the label at the shell's crown, not on the Sun at their centre
    const crown=(n.type==='smallbody'&&(n.name==='Asteroid Belt'||n.name==='Kuiper Belt'||n.name==='Oort Cloud'))?(n._R||0)*0.74:0;
    let c; try{ c=Graph.graph2ScreenCoords(n.x,n.y+crown,n.z); }catch(e){ el.style.opacity=0; continue; }
    if(!c||isNaN(c.x)||c.x<-60||c.y<-30||c.x>W2+60||c.y>H2+30){ el.style.opacity=0; continue; }
    // TRUE angular size — the old Math.max(25,cd) floor was galaxy-scale and silently
    // killed every label at Solar-System zoom (cd≈0.3 there)
    cand.push({n,el,c,cd,ang:(n._R||1)/Math.max(0.05,cd)});
  }
  // big solid discs occlude the labels of things BEHIND them — a background galaxy's name
  // plastered across Mars reads as clutter (glass regions/nebulae stay see-through)
  const SOLID={star:1,planet:1,moon:1,dwarf:1,brown:1,blackhole:1};
  const f2=H2/(2*Math.tan(22.5*Math.PI/180)), occ=[];
  let vd=null; try{ vd=Graph.camera().getWorldDirection(new THREE.Vector3()); }catch(e){}
  if(cam&&vd) NODES.forEach(m=>{ if(!SOLID[m.type]||m.x==null||!m._R) return;
    // bodies BEHIND the camera project to ghost screen coords — they can't occlude anything
    if((m.x-cam.x)*vd.x+(m.y-cam.y)*vd.y+(m.z-cam.z)*vd.z<=0) return;
    const cdm=Math.hypot(m.x-cam.x,m.y-cam.y,m.z-cam.z), px=m._R/Math.max(0.001,cdm)*f2;
    if(px<26) return;
    let s; try{ s=Graph.graph2ScreenCoords(m.x,m.y,m.z); }catch(e){ return; }
    if(!s||isNaN(s.x)) return; occ.push({n:m,x:s.x,y:s.y,r:px,cd:cdm}); });
  // only label things big enough on screen, biggest first, and skip overlaps → declutters + reveals detail as you zoom
  cand.sort((a,b)=>b.ang-a.ang);
  const placed=[]; let shown=0;
  cand.forEach(o=>{
    if(occ.some(q=>q.n!==o.n && q.cd<o.cd && Math.hypot(q.x-o.c.x,q.y-o.c.y)<q.r*0.9)){ o.el.style.opacity=0; return; }
    if(shown>=MAX || o.ang<0.02 || placed.some(q=>Math.abs(q.x-o.c.x)<74 && Math.abs(q.y-o.c.y)<17)){ o.el.style.opacity=0; return; }
    placed.push(o.c); shown++;
    o.el.style.opacity=0.96; o.el.style.transform=`translate(-50%,-150%) translate(${o.c.x}px,${o.c.y}px)`;
  });
  // breadcrumb follows the camera: show the path of the deepest bubble the camera is inside (throttled)
  const now=performance.now();
  if(cam && now-_crumbCamLast>350){ _crumbCamLast=now;
    // descend the hierarchy: at each level, enter the child bubble that contains the camera (best d/R)
    let inside=null, kids=ROOT.childIds;
    for(;;){ let best=null, br=Infinity;
      kids.forEach(id=>{ const n=byId[id]; if(!n._R||!n.childIds.length) return;
        const rel=Math.hypot(n.x-cam.x,n.y-cam.y,n.z-cam.z)/n._R; if(rel<1.05 && rel<br){ best=n; br=rel; } });
      if(!best) break; inside=best; kids=best.childIds;
    }
    if(inside!==_crumbCamNode){ _crumbCamNode=inside; updateCrumbs(inside||ROOT); }
  }
}
requestAnimationFrame(tickLabels);
boot();

/* ===================== CUSTOM PICKING =====================
   The built-in raycast returns the NEAREST surface — i.e. the big translucent bubble you're pointing
   through, not the thing you're pointing AT. pickNodeAt() instead gathers every bubble the ray passes
   through and returns the MOST SPECIFIC (smallest) one — the object under the mouse. */
function pickNodeAt(e){
  if(!ensureRay()||!Graph||!Graph.camera) return null;
  const rect=elGraph.getBoundingClientRect();
  _fieldRay.setFromCamera({x:((e.clientX-rect.left)/rect.width)*2-1, y:-((e.clientY-rect.top)/rect.height)*2+1}, Graph.camera());
  const meshes=[], m2n=new Map();
  NODES.forEach(n=>{ const o=n.__threeObj; if(o&&o.visible){ meshes.push(o); m2n.set(o,n); } });
  const hits=_fieldRay.intersectObjects(meshes,true);   // recursive: black holes are Groups (core + ring + disc)
  const cam=Graph.cameraPosition(), H=elGraph.clientHeight||800, f=H/(2*Math.tan(22.5*Math.PI/180));
  let best=null, anyBest=null;
  hits.forEach(h=>{ let o=h.object; while(o&&!m2n.has(o)) o=o.parent; const n=o&&m2n.get(o); if(!n) return;
    if(!anyBest || (n._R||1)<(anyBest._R||1)) anyBest=n;
    const d=Math.hypot(n.x-cam.x,n.y-cam.y,n.z-cam.z), px=(n._R||1)/Math.max(1,d)*f;
    if(px<4) return;                                   // sub-pixel — the user can't be aiming at it
    if(!best || (n._R||1)<(best._R||1)) best=n; });    // smallest VISIBLE bubble the ray crosses
  return best||anyBest;
}
const _isDiffuse=n=>isRegion(n)||n.type==='nebula'||['Asteroid Belt','Kuiper Belt','Oort Cloud'].includes(n.name);
/* desktop hover: cursor + panel preview follow the custom pick (throttled) */
let _pickedNode=null, _pickLast=0;
elGraph.addEventListener('pointermove',e=>{
  if(_touchMode) return;
  const now=performance.now(); if(now-_pickLast<80) return; _pickLast=now;
  _pickedNode=pickNodeAt(e);
  elGraph.style.cursor=_pickedNode?'pointer':'grab';
  if(_pickedNode) showPanel(_pickedNode);
});

/* open the panel ONLY on a genuine single-finger tap / left-click — never on hover, pan, or pinch-zoom */
let _downXY=null, _activePointers=0, _multi=false, _touchMode=false, _downT=0;
elGraph.addEventListener('pointerdown',e=>{ _activePointers++; if(e.pointerType==='touch') _touchMode=true;
  if(_activePointers>1){ _multi=true; _downXY=null; return; }   // a second finger → pinch/pan gesture, not a tap
  _multi=false; _downXY=[e.clientX,e.clientY]; _downT=performance.now();
},true);
const _endPtr=()=>{ _activePointers=Math.max(0,_activePointers-1); if(_activePointers===0){ _multi=false; } };
elGraph.addEventListener('pointercancel',e=>{ _downXY=null; _endPtr(); },true);
elGraph.addEventListener('pointerup',e=>{ const wasMulti=_multi, dxy=_downXY; _endPtr();
  if(wasMulti || !dxy) return;                                   // was a multi-touch gesture, ignore
  const moved=Math.hypot(e.clientX-dxy[0],e.clientY-dxy[1]); _downXY=null;
  if(moved>=8 || performance.now()-_downT>600) return;          // a drag/hold, not a tap
  const node=pickNodeAt(e);
  if(node && !_isDiffuse(node)){ onClick(node); return; }        // a solid body under the cursor wins
  const si=pickStar(e); if(si!=null){ showStarPanel(si); return; }   // a catalogue star?
  const mi=pickMember(e); if(mi){ showMemberPanel(mi); return; }     // a catalogue member (globular/dwarf/cluster galaxy)?
  const gi=pickSdss(e); if(gi!=null){ showSdssPanel(gi); return; }   // an SDSS survey galaxy?
  if(node){ onClick(node); return; }                             // otherwise the smallest bubble under the cursor
  const fk=pickField(e); if(fk) showFieldPanel(fk);              // no bubble at all → maybe a dark/energy field
},true);

/* Click a bubble → fly the camera to look closely at it (its contents are already visible inside). */
function onClick(n){ showPanel(n); updateCrumbs(n); flyTo(n); }

/* ===================== DETAIL PANEL ===================== */
const panel=document.getElementById('panel'), pph=document.getElementById('pph'), pbd=document.getElementById('pbd');
document.getElementById('pclose').onclick=()=>panel.classList.remove('open');
function row(l,v){return `<div class="row"><div class="lab">${l}</div><div class="val">${v}</div></div>`;}
function showPanel(n){
  const col=nodeColor(n); pph.style.display='none'; const m=n.meta||{};
  const kindLabel = n.kind==='root'?'The whole cosmos': n.kind==='cat'?'Category': n.kind==='subcat'?'Sub-category':'Object';
  let h=`<span class="tag" style="background:${col};color:#04121a;border-color:${col}">${(TYPES[n.type]||TYPES.root).label} · ${kindLabel}</span>`;
  h+=`<h2>${n.name}</h2>`;
  if(m.aka && m.aka!=='—') h+=`<div class="years">${m.aka}</div>`;
  const order=[['code','Designation'],['mass','Mass'],['mag','Magnitude'],['dist','Distance'],['spec','Spectral type'],['vis','Visibility'],['ra','Right ascension'],['dec','Declination']];
  let rows=''; order.forEach(([k,l])=>{ const val=m[k]; if(val && val!=='—') rows+=row(l,val); });
  if(rows) h+=`<div class="rows">${rows}</div>`;
  if(m.note) h+=`<div class="note" style="font-style:normal;color:#dbe4ff">${m.note}</div>`;
  // deep-sky objects link to their scholarly literature (NASA ADS resolves names via SIMBAD;
  // Solar System bodies aren't SIMBAD objects, so they don't get the link)
  const ADS_TYPES={galaxy:1,star:1,cluster:1,nebula:1,blackhole:1,exotic:1,brown:1,structure:1,cosmology:1};
  if(ADS_TYPES[n.type] && n.kind!=='root'){
    const q=(m.code && m.code!=='—')? m.code : n.name;
    h+=`<div class="note" style="font-style:normal;margin-top:8px"><a href="https://ui.adsabs.harvard.edu/search/q=${encodeURIComponent('object:"'+q+'"')}&sort=citation_count desc" target="_blank" rel="noopener" style="color:#9fd0ff">In the literature — NASA ADS ↗</a></div>`;
  }
  pbd.innerHTML=h; panel.classList.add('open');
}
/* clicking a field's points opens its data (dark matter / dark energy / antimatter / intergalactic gas) */
let _fieldRay=null;                                  // lazy: THREE now arrives via a deferred ES module
function ensureRay(){ if(!_fieldRay&&typeof THREE!=='undefined') _fieldRay=new THREE.Raycaster(); return _fieldRay; }
function pickField(e){
  if(!ensureRay() || !_darkFields.length || !Graph.camera) return null;
  const rect=elGraph.getBoundingClientRect();
  const nx=((e.clientX-rect.left)/rect.width)*2-1, ny=-((e.clientY-rect.top)/rect.height)*2+1;
  const cam=Graph.camera(); _fieldRay.setFromCamera({x:nx,y:ny}, cam);
  _fieldRay.params.Points.threshold = Math.max(3, Math.hypot(cam.position.x,cam.position.y,cam.position.z)/90);
  const hits=_fieldRay.intersectObjects(_darkFields.filter(f=>f.visible), false);
  return hits.length ? hits[0].object.userData.field : null;
}
function showFieldPanel(key){ const f=FIELD_META[key]; if(!f) return; pph.style.display='none';
  let h=`<span class="tag" style="background:${f.color};color:#04121a;border-color:${f.color}">${f.label}</span>`;
  h+=`<h2>${f.name}</h2><div class="rows">`+f.rows.map(r=>row(r[0],r[1])).join('')+`</div>`;
  h+=`<div class="note" style="font-style:normal;color:#dbe4ff">${f.note}</div>`;
  pbd.innerHTML=h; panel.classList.add('open');
}

/* ===================== BREADCRUMBS ===================== */
function goTo(p){
  if(p===ROOT || p._virtual){ updateCrumbs(ROOT); panel.classList.remove('open'); fitTop(); return; }
  updateCrumbs(p); showPanel(p); flyTo(p);
}
function updateCrumbs(n){
  const path=[]; let c=n; while(c){path.unshift(c);c=c.parent?byId[c.parent]:null;}
  const el=document.getElementById('crumbs'); el.innerHTML='';
  path.forEach((p,i)=>{ const s=document.createElement('span'); s.className='crumb'+(i===path.length-1?' active':'');
    s.textContent = p._virtual?'✦ Cosmos map':p.name; s.onclick=()=>goTo(p); el.appendChild(s); });
  if(n!==ROOT && n.childIds && n.childIds.length){
    const sep=document.createElement('span'); sep.className='crumb-sep'; sep.textContent='▸'; el.appendChild(sep);
    n.childIds.forEach(id=>{ const cn=byId[id]; const s=document.createElement('span'); s.className='crumb child';
      s.style.borderColor=nodeColor(cn); s.textContent=cn.name; s.onclick=()=>goTo(cn); el.appendChild(s); });
  }
}

/* ===================== LEGEND / HUD ===================== */
/* ===================== INTERACTIVE LEGEND — every row is a show/hide toggle ===================== */
function applyTypeVisibility(){
  NODES.forEach(n=>{ const o=n.__threeObj; if(o) o.visible=!hiddenTypes.has(n.type); });
}
function refreshLegendChips(){ _legendChips.forEach(c=>c.el.classList.toggle('off', !c.isOn())); }
function mkToggle(el, html, isOn, onToggle){
  const s=document.createElement('span'); s.className='lg tgl'+(isOn()?'':' off'); s.innerHTML=html;
  s.title='Click to show / hide';
  s.onclick=()=>{ onToggle(); s.classList.toggle('off', !isOn()); _syncLegendMaster(); };
  el.appendChild(s); _legendChips.push({el:s,isOn,toggle:onToggle}); return s;
}

/* master tick box: one click selects / unselects every legend layer; shows a dash when mixed */
function _syncLegendMaster(){ const cb=document.getElementById('legend-all'); if(!cb) return;
  const on=_legendChips.filter(c=>c.isOn()).length;
  cb.checked = on===_legendChips.length; cb.indeterminate = on>0 && on<_legendChips.length; }
function _wireLegendMaster(el){
  el.insertAdjacentHTML('afterbegin',
    '<label class="lg" style="width:100%;cursor:pointer;user-select:none;margin-bottom:2px;color:#eaf0ff">'+
    '<input type="checkbox" id="legend-all" checked style="accent-color:#67e8f9;margin:0 7px 0 0;cursor:pointer;vertical-align:-2px">select / unselect all</label>');
  document.getElementById('legend-all').onchange=e=>{ const on=e.target.checked;
    _legendChips.forEach(c=>{ if(c.toggle && c.isOn()!==on) c.toggle(); });
    refreshLegendChips(); _syncLegendMaster();
    if(typeof bFields!=='undefined' && bFields){ fieldsOn=on; bFields.classList.toggle('active',on); } };
}
function buildLegend(){
  const el=document.getElementById('legend'); el.innerHTML='<b>OBJECT TYPES · click to hide / show</b>'; _wireLegendMaster(el);
  ['structure','galaxy','cluster','brown','star','planet','moon','dwarf','smallbody','nebula','blackhole','exotic','cosmology'].forEach(k=>{
    mkToggle(el, `<span class="sw" style="background:${TYPES[k].c}"></span>${TYPES[k].label}`,
      ()=>!hiddenTypes.has(k),
      ()=>{ hiddenTypes.has(k)?hiddenTypes.delete(k):hiddenTypes.add(k); applyTypeVisibility(); });
  });
  el.insertAdjacentHTML('beforeend',`<span class="lg" style="width:100%;margin-top:4px;color:#cbd6ff">★ star colour = spectral class &nbsp; <span style="color:${SPEC.O}">O</span> <span style="color:${SPEC.B}">B</span> <span style="color:${SPEC.A}">A</span> <span style="color:${SPEC.F}">F</span> <span style="color:${SPEC.G}">G</span> <span style="color:${SPEC.K}">K</span> <span style="color:${SPEC.M}">M</span></span>`);
}
/* fields + catalogue layers get their toggles once the clouds exist (called at the end of boot) */
function buildLegendLayers(){
  const el=document.getElementById('legend');
  el.insertAdjacentHTML('beforeend','<b style="margin-top:6px">FIELDS &amp; CATALOGUES · click to hide / show</b>');
  const FIELD_LABELS={darkmatter:'dark matter',darkenergy:'dark energy',igm:'intergalactic gas',antimatter:'antimatter'};
  _darkFields.forEach(pts=>{ const key=pts.userData.field, fm=FIELD_META[key]||{};
    mkToggle(el, `<span class="sw" style="background:${fm.color||'#8b7bd8'};border-radius:50%"></span>${FIELD_LABELS[key]||key}`,
      ()=>pts.visible, ()=>{ pts.visible=!pts.visible; }); });
  if(_starCloud) mkToggle(el, `<span class="sw" style="background:#ffe9a8;border-radius:50%"></span>BSC stars`,
      ()=>_starCloud.visible, ()=>{ _starCloud.visible=!_starCloud.visible; });
  if(_sdssCloud) mkToggle(el, `<span class="sw" style="background:#b9a6ff;border-radius:50%"></span>SDSS galaxies`,
      ()=>_sdssCloud.visible, ()=>{ _sdssCloud.visible=!_sdssCloud.visible; });
  const SHORT={'Globular cluster · Milky Way':'MW globulars','Open cluster · Milky Way':'open clusters',
    'Dwarf galaxy · Local Group':'Local Group','Member galaxy · Virgo Cluster':'Virgo members',
    'Member galaxy · Coma Cluster':'Coma members','Globular cluster · Andromeda':'M31 globulars',
    'Star cluster · Triangulum':'M33 clusters','Cluster / nebula · LMC':'LMC objects',
    'Cluster / nebula · SMC':'SMC objects','Globular cluster · Messier 87':'M87 globulars',
    'Cluster candidate / source · M81':'M81 objects','Star cluster · M51 (Whirlpool)':'M51 clusters',
    'Star cluster · M101 (Pinwheel)':'M101 clusters','H II region · M101':'M101 HII',
    'Star cluster · M82 (Cigar)':'M82 clusters',
    'Member star · Pleiades (Gaia)':'Pleiades stars','Member star · Hyades (Gaia)':'Hyades stars',
    'Star · 47 Tucanae (Gaia DR3)':'47 Tuc stars','Star · Omega Centauri (Gaia DR3)':'ω Cen stars',
    'Star · Messier 13 (Gaia DR3)':'M13 stars','Star · Messier 54 (Gaia DR3)':'M54 stars',
    'Globular cluster · Centaurus A':'Cen A globulars','Globular cluster · M104 (Sombrero)':'M104 globulars',
    'Star cluster / source · Antennae':'Antennae sources',
    'Galaxy · Local Volume':'Local Volume',
    'Exoplanet · NASA Archive':'exoplanets','Community planet candidate · ExoFOP':'citizen candidates',
    'Brown dwarf · 20 pc census':'brown dwarfs 20pc',
    'Pulsar · ATNF catalogue':'pulsars','Quasar · SDSS':'quasars',
    'Supernova remnant · Green cat.':'SNRs','Planetary nebula · Strasbourg-ESO':'planetary nebulae',
    'GW merger · LIGO/Virgo/KAGRA':'GW events','Source · HETDEX':'HETDEX',
    'Galaxy · 2MRS all-sky':'2MRS all-sky','Fast radio burst · CHIME':'FRBs','Asteroid · JPL SBDB':'asteroids'};
  _memberClouds.forEach(mc=>{ const col='#'+mc.pts.material.color.getHexString();
    mkToggle(el, `<span class="sw" style="background:${col};border-radius:50%"></span>${SHORT[mc.kindLabel]||mc.kindLabel}`,
      ()=>mc.pts.visible, ()=>{ mc.pts.visible=!mc.pts.visible; }); });
}
function countLeaves(){return NODES.filter(n=>!n.childIds.length).length;}
function updateHud(){ const stars=(typeof BSC!=='undefined')?BSC.length:0, gal=(typeof SDSS!=='undefined')?SDSS.length:0;
  document.getElementById('hud').innerHTML=`${NODES.length-1} objects · ${stars.toLocaleString()} BSC stars · ${gal.toLocaleString()} SDSS galaxies<br/>drag to orbit · scroll to zoom`;
}

/* ===================== SEARCH ===================== */
const q=document.getElementById('q');
q.addEventListener('keydown',e=>{ if(e.key!=='Enter') return; const term=q.value.trim().toLowerCase(); if(!term) return;
  const hit=NODES.find(n=>n.name.toLowerCase().includes(term) || (n.meta&&n.meta.aka&&n.meta.aka.toLowerCase().includes(term)));
  if(!hit) return;
  showPanel(hit); updateCrumbs(hit); flyTo(hit);
});

/* ===================== VIEW CONTROLS ===================== */
const bAll=document.getElementById('bAll'); if(bAll){ bAll.textContent='Overview'; bAll.title='Zoom back out to the whole cosmos'; bAll.onclick=()=>{ updateCrumbs(ROOT); panel.classList.remove('open'); fitTop(); }; }
/* Fit view: frame the bubble the camera is currently INSIDE (Overview frames the whole cosmos) */
document.getElementById('bFit').onclick=()=>{
  const cam=Graph.cameraPosition(); let kids=ROOT.childIds, inside=null;
  for(;;){ let best=null, br=Infinity;
    kids.forEach(id=>{ const n=byId[id]; if(!n._R) return;
      const d=Math.hypot(cam.x-n.x,cam.y-n.y,cam.z-n.z)/n._R; if(d<1.02&&d<br){ br=d; best=n; } });
    if(!best) break; inside=best; kids=best.childIds||[]; if(!kids.length) break; }
  if(!inside){ fitTop(); return; }
  const R=inside._R, dx=cam.x-inside.x, dy=cam.y-inside.y, dz=cam.z-inside.z, L=Math.hypot(dx,dy,dz)||1;
  const d=R*2.6+Math.min(18,R*0.5);
  easeCam({x:inside.x+dx/L*d, y:inside.y+dy/L*d, z:inside.z+dz/L*d},{x:inside.x,y:inside.y,z:inside.z},700);
};
const bFields=document.getElementById('bFields'); let fieldsOn=true;
// master toggle: hides/shows the four energy fields AND every catalogue point-cloud layer at once
if(bFields){ bFields.classList.add('active'); bFields.title='Show / hide all fields & catalogue layers (individual toggles in the legend)';
  bFields.onclick=()=>{ fieldsOn=!fieldsOn; bFields.classList.toggle('active',fieldsOn);
    setDarkFieldsVisible(fieldsOn);
    if(_starCloud) _starCloud.visible=fieldsOn;
    if(_sdssCloud) _sdssCloud.visible=fieldsOn;
    _memberClouds.forEach(mc=>mc.pts.visible=fieldsOn);
    refreshLegendChips(); }; }
document.getElementById('bReset').onclick=()=>{ updateCrumbs(ROOT); panel.classList.remove('open');
  // full reset: every Object-Type back on, all Fields & Catalogue layers back on
  hiddenTypes.clear(); applyTypeVisibility();
  fieldsOn=true; if(bFields) bFields.classList.add('active');
  setDarkFieldsVisible(true);
  if(_starCloud) _starCloud.visible=true;
  if(_sdssCloud) _sdssCloud.visible=true;
  _memberClouds.forEach(mc=>mc.pts.visible=true);
  refreshLegendChips();
  homeView(); };   // Reset = back to the start view (just outside the Milky Way)
/* Legend: minimized by default — the ◈ Legend chip toggles the full types/layers panel */
const legendBtn=document.getElementById('legend-btn'), legendEl=document.getElementById('legend');
if(legendBtn&&legendEl) legendBtn.onclick=()=>{ legendEl.classList.toggle('open'); legendBtn.classList.toggle('open', legendEl.classList.contains('open')); };
/* References: collapsed by default — the button toggles the full credits panel (desktop & mobile) */
const citeBtn=document.getElementById('cite-btn'), citeBody=document.getElementById('cite-body');
if(citeBtn&&citeBody) citeBtn.onclick=()=>{ citeBody.hidden=!citeBody.hidden; citeBtn.classList.toggle('open', !citeBody.hidden); };
window.addEventListener('resize',()=>{ if(Graph){Graph.width(elGraph.clientWidth).height(elGraph.clientHeight);} });
