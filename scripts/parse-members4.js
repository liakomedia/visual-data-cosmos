// M81 field objects + M101 HII + Gaia cluster stars → members4.js
const fs=require('fs');
const rows=f=>fs.readFileSync(f,'utf8').split('\n').filter(l=>/^[0-9]/.test(l)).map(l=>l.split('\t'));
const D2R=Math.PI/180;
const sep=(ra,dec,c)=>Math.acos(Math.min(1,Math.sin(dec*D2R)*Math.sin(c[1]*D2R)+Math.cos(dec*D2R)*Math.cos(c[1]*D2R)*Math.cos((ra-c[0])*D2R)))/D2R;

const M81FLD=rows('m81full.tsv').map(c=>{const ra=+c[0],dec=+c[1];
  if(!isFinite(ra)||!isFinite(dec)||sep(ra,dec,[148.888,69.065])>1) return null;
  return [+ra.toFixed(4),+dec.toFixed(4),(c[2]||'').trim()];}).filter(Boolean);

const M101HII=rows('m101hii.tsv').map(c=>{const ra=+c[0],dec=+c[1];
  if(!isFinite(ra)||!isFinite(dec)||sep(ra,dec,[210.802,54.349])>1) return null;
  return [+ra.toFixed(4),+dec.toFixed(4),'HII '+(c[2]||'').trim()];}).filter(Boolean);

const OC={};
rows('a10.tsv').forEach(c=>{const ra=+c[0],dec=+c[1],cl=(c[2]||'').trim(),g=+c[3];
  if(!isFinite(ra)||!isFinite(dec)) return;
  if(cl==='Pleiades'||cl==='Hyades'){ (OC[cl]=OC[cl]||[]).push([+ra.toFixed(4),+dec.toFixed(4),isFinite(g)?+g.toFixed(1):null]); }});

const GC={};
[['gaia-47tuc.tsv','47 Tucanae'],['gaia-omecen.tsv','Omega Centauri'],['gaia-m13.tsv','Messier 13'],['gaia-m54.tsv','Messier 54']]
.forEach(([f,name])=>{ GC[name]=rows(f).map(c=>{const ra=+c[0],dec=+c[1],g=+c[2];
  if(!isFinite(ra)||!isFinite(dec)) return null;
  return [+ra.toFixed(5),+dec.toFixed(5),isFinite(g)?+g.toFixed(1):null];}).filter(Boolean); });

console.log('M81FLD',M81FLD.length,'| M101HII',M101HII.length,'| Pleiades',OC.Pleiades.length,'| Hyades',OC.Hyades.length,
  '| GC:',Object.entries(GC).map(([k,v])=>k+' '+v.length).join(', '));
fs.writeFileSync('/home/centos-docker/www_html/vdata/cosmos/includes/js/members4.js',
`/* Per-object member catalogues (4) — [RA°,Dec°,id|Gmag]:
   M81FLD  — objects in the M81 field: Perelmuter & Racine 1995, VizieR J/AJ/109/1055
   M101HII — H II regions in M101: Hodge+ 1990, VizieR J/ApJS/73/661
   OCSTARS — Gaia DR2 member stars, Pleiades & Hyades: Gaia Collaboration 2018, VizieR J/A+A/616/A10
   GCSTARS — brightest Gaia DR3 stars in the fields of 47 Tuc / ω Cen / M13 / M54: ESA Gaia DR3, VizieR I/355 */
const M81FLD=${JSON.stringify(M81FLD)};
const M101HII=${JSON.stringify(M101HII)};
const OCSTARS=${JSON.stringify(OC)};
const GCSTARS=${JSON.stringify(GC)};
`);
console.log('wrote members4.js',(fs.statSync('/home/centos-docker/www_html/vdata/cosmos/includes/js/members4.js').size/1024).toFixed(0)+'KB');
