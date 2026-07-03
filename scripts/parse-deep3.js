// Parse 2MRS + CHIME FRBs + JPL SBDB asteroids → includes/js/deep3.js
const fs=require('fs');
const dir='/tmp/claude-0/-home-centos-docker/98cb5152-5781-4d92-adf6-9fc3a3a88036/scratchpad/';
const sex2deg=(s,isRA)=>{ const m=s.trim().split(/[\s:]+/).map(Number); if(m.some(isNaN)||!m.length) return null;
  let d=Math.abs(m[0])+(m[1]||0)/60+(m[2]||0)/3600; if(/^\s*-/.test(s)) d=-d; return isRA? d*15 : d; };

// --- 2MRS all-sky galaxies (Huchra+ 2012): RA°, Dec°, cz (km/s) → z ; thin ×2 to bound file size
const mrs=[]; let i2=0;
for(const L of fs.readFileSync(dir+'2mrs.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<3) continue;
  const ra=parseFloat(c[0]), dec=parseFloat(c[1]), cz=parseFloat(c[2]);
  if(!isFinite(ra)||!isFinite(dec)||!isFinite(cz)||cz<=0) continue;
  if((i2++%2)) continue;   // every 2nd → ~22k
  mrs.push([+ra.toFixed(2),+dec.toFixed(2),+(cz/299792.458).toFixed(4)]);
}
// --- CHIME FRBs: Name, RA, Dec, DM (pc/cm³)
const frb=[];
for(const L of fs.readFileSync(dir+'frb.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=parseFloat(c[1]), dec=parseFloat(c[2]), dm=parseFloat(c[3]);
  if(!isFinite(ra)||!isFinite(dec)||!isFinite(dm)) continue;
  frb.push([+ra.toFixed(2),+dec.toFixed(2),Math.round(dm),c[0].trim()]);
}
// --- Asteroids (JPL SBDB): [a au, e, i°, class 0=main belt 1=Jupiter trojan 2=TNO]
const ast=[];
[['ast-mba',0],['ast-tjn',1],['ast-tno',2]].forEach(([f,cls])=>{
  const j=JSON.parse(fs.readFileSync(dir+f+'.json'));
  j.data.forEach(d=>{ const a=+d[0], e=+d[1], inc=+d[2];
    if(!isFinite(a)||a<=0) return;
    ast.push([+a.toFixed(2),isFinite(e)?+e.toFixed(2):0,isFinite(inc)?+inc.toFixed(1):0,cls]); });
});
console.log('2MRS:',mrs.length,'| FRBs:',frb.length,'| asteroids:',ast.length);
const js=`/* Deep catalogues 3:
   MRS2   — all-sky galaxy redshift survey: 2MRS, Huchra+ 2012, VizieR J/ApJS/199/26. [RA°,Dec°,z]
   FRBCAT — fast radio bursts: CHIME/FRB Catalog 1 (2021), VizieR J/ApJS/257/59.     [RA°,Dec°,DM,name]
   ASTCAT — asteroids: NASA/JPL Small-Body Database. [a au,e,i°,class 0=main belt 1=Jupiter trojan 2=TNO] */
const MRS2=${JSON.stringify(mrs)};
const FRBCAT=${JSON.stringify(frb)};
const ASTCAT=${JSON.stringify(ast)};
`;
fs.writeFileSync('/home/centos-docker/www_html/app/visual-data-universe/includes/js/deep3.js',js);
console.log('wrote deep3.js',(js.length/1024).toFixed(0)+'KB');
