// Parse member catalogs → includes/js/members.js
const fs=require('fs');
const dir='/tmp/claude-0/-home-centos-docker/98cb5152-5781-4d92-adf6-9fc3a3a88036/scratchpad/';
const sex2deg=(s,isRA)=>{ const m=s.trim().split(/[\s:]+/).map(Number); if(m.some(isNaN)||!m.length) return null;
  let d=Math.abs(m[0])+(m[1]||0)/60+(m[2]||0)/3600; if(/^\s*-/.test(s)) d=-d; return isRA? d*15 : d; };

// --- Harris Milky Way globular clusters (VII/202): ID, Name, RA, Dec, Rsun(kpc)
const gc=[];
for(const L of fs.readFileSync(dir+'harris.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<5) continue;
  const ra=sex2deg(c[2],true), dec=sex2deg(c[3],false), r=parseFloat(c[4]);
  if(ra==null||dec==null||!isFinite(r)) continue;
  const name=(c[1].trim()||c[0].trim()).replace(/\s+/g,' ');
  gc.push([+ra.toFixed(2),+dec.toFixed(2),+r.toFixed(1),name]);
}

// --- McConnachie Local Group dwarfs (J/AJ/144/4): Name, RA, Dec, D(kpc)
const lg=[];
for(const L of fs.readFileSync(dir+'lg.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=sex2deg(c[1],true), dec=sex2deg(c[2],false), d=parseFloat(c[3]);
  if(ra==null||dec==null||!isFinite(d)||d<=0) continue;
  lg.push([+ra.toFixed(2),+dec.toFixed(2),Math.round(d),c[0].trim().replace(/\s+/g,' ')]);
}

// --- Virgo & Coma members (SDSS): ra,dec,z
const csv=f=>fs.readFileSync(dir+f,'utf8').split('\n')
  .filter(l=>l&&!l.startsWith('#')&&!l.startsWith('ra,'))
  .map(l=>{const [ra,dec,z]=l.split(',');return [+(+ra).toFixed(3),+(+dec).toFixed(3),+(+z).toFixed(4)];})
  .filter(a=>isFinite(a[0])&&isFinite(a[2]));
const virgo=csv('virgo.csv'), coma=csv('coma.csv');

// --- M31 (Andromeda) confirmed globular clusters (RBC v5, V/143): Name, f, RA°, Dec°, Vmag
const m31=[];
for(const L of fs.readFileSync(dir+'rbc.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<5) continue;
  const ra=parseFloat(c[2]), dec=parseFloat(c[3]), vm=parseFloat(c[4]);
  if(!isFinite(ra)||!isFinite(dec)) continue;
  m31.push([+ra.toFixed(4),+dec.toFixed(4),isFinite(vm)?+vm.toFixed(1):null,c[0].trim()]);
}
// --- Local Volume galaxies (Karachentsev+ 2013, J/AJ/145/101): Name, RA, Dec, Dist(Mpc)
const lv=[];
for(const L of fs.readFileSync(dir+'lv.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=sex2deg(c[1],true), dec=sex2deg(c[2],false), d=parseFloat(c[3]);
  if(ra==null||dec==null||!isFinite(d)||d<=0) continue;
  lv.push([+ra.toFixed(2),+dec.toFixed(2),+d.toFixed(2),c[0].trim()]);
}
// --- Milky Way open clusters (Cantat-Gaudin+ 2020, J/A+A/640/A1): Cluster, RA°, Dec°, DistPc
const oc=[];
for(const L of fs.readFileSync(dir+'oc.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=parseFloat(c[1]), dec=parseFloat(c[2]), d=parseFloat(c[3]);
  if(!isFinite(ra)||!isFinite(dec)||!isFinite(d)||d<=0) continue;
  oc.push([+ra.toFixed(2),+dec.toFixed(2),Math.round(d),c[0].trim().replace(/_/g,' ')]);
}
// --- M33 (Triangulum) star clusters & candidates (San Roman+ 2010, J/ApJ/720/1674): Seq, RA, Dec, gmag
const m33c=[];
for(const L of fs.readFileSync(dir+'m33.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<3) continue;
  const ra=sex2deg(c[1],true), dec=sex2deg(c[2],false), gm=parseFloat(c[3]);
  if(ra==null||dec==null) continue;
  m33c.push([+ra.toFixed(4),+dec.toFixed(4),isFinite(gm)?+gm.toFixed(1):null,'SM '+c[0].trim()]);
}
console.log('globulars:',gc.length,'| LG dwarfs:',lg.length,'| Virgo:',virgo.length,'| Coma:',coma.length,'| M31 GCs:',m31.length,'| LV:',lv.length,'| open clusters:',oc.length,'| M33:',m33c.length);
const js=`/* Real member catalogues:
   MWGC   — Milky Way globular clusters: Harris 1996 (2010 ed.), VizieR VII/202. [RA°,Dec°,Rsun kpc,name]
   LGDW   — Local Group galaxies: McConnachie 2012, VizieR J/AJ/144/4.          [RA°,Dec°,D kpc,name]
   VIRGO  — Virgo Cluster member galaxies, SDSS DR17 spectroscopy.              [RA°,Dec°,z]
   COMA   — Coma Cluster member galaxies, SDSS DR17 spectroscopy.               [RA°,Dec°,z]
   M31GC  — Andromeda confirmed globular clusters: Revised Bologna Cat. v5, VizieR V/143. [RA°,Dec°,Vmag,name]
   LVGAL  — Local Volume galaxies (<11 Mpc): Karachentsev+ 2013, VizieR J/AJ/145/101. [RA°,Dec°,D Mpc,name]
   MWOC   — Milky Way open clusters (Gaia): Cantat-Gaudin+ 2020, VizieR J/A+A/640/A1. [RA°,Dec°,d pc,name]
   M33CL  — Triangulum star clusters: San Roman+ 2010, VizieR J/ApJ/720/1674.       [RA°,Dec°,gmag,name] */
const MWGC=${JSON.stringify(gc)};
const LGDW=${JSON.stringify(lg)};
const VIRGO=${JSON.stringify(virgo)};
const COMA=${JSON.stringify(coma)};
const M31GC=${JSON.stringify(m31)};
const LVGAL=${JSON.stringify(lv)};
const MWOC=${JSON.stringify(oc)};
const M33CL=${JSON.stringify(m33c)};
`;
fs.writeFileSync('/home/centos-docker/www_html/app/visual-data-universe/includes/js/members.js',js);
console.log('wrote members.js',(js.length/1024).toFixed(0)+'KB');
