// Bica+2008 Magellanic System + Strader+2011 M87 GCs → members2.js
const fs=require('fs');
const rows=f=>fs.readFileSync(f,'utf8').split('\n').filter(l=>/^[0-9]/.test(l)).map(l=>l.split('\t'));

// --- Magellanic System: split LMC / SMC by nearest centre (Bridge → nearer)
const LMC=[80.894,-69.756], SMC=[13.187,-72.829];
const ang=(ra,dec,c)=>{ const d2r=Math.PI/180;
  return Math.acos(Math.min(1,Math.sin(dec*d2r)*Math.sin(c[1]*d2r)+Math.cos(dec*d2r)*Math.cos(c[1]*d2r)*Math.cos((ra-c[0])*d2r))); };
const lmc=[], smc=[];
rows('bica-all.tsv').forEach(c=>{
  const ra=+c[0], dec=+c[1], name=(c[2]||'').trim().split(',')[0], type=(c[3]||'').trim();
  if(!isFinite(ra)||!isFinite(dec)) return;
  (ang(ra,dec,LMC)<=ang(ra,dec,SMC)?lmc:smc).push([+ra.toFixed(4),+dec.toFixed(4),type,name]);
});
console.log('LMC:',lmc.length,'| SMC:',smc.length);

// --- M87 globular clusters (all Strader+2011 tables; col: ra dec ID gmag — ID position varies, keep first text col)
const m87=[];
rows('m87.tsv').forEach(c=>{
  const ra=+c[0], dec=+c[1]; if(!isFinite(ra)||!isFinite(dec)) return;
  const id=(c[2]||'').trim();
  m87.push([+ra.toFixed(4),+dec.toFixed(4),id]);
});
console.log('M87 GCs:',m87.length);

fs.writeFileSync('/home/centos-docker/www_html/vdata/cosmos/includes/js/members2.js',
`/* Per-galaxy member catalogues (2):
   LMCCAT/SMCCAT — extended objects in the Magellanic System: Bica+ 2008, VizieR J/MNRAS/389/678.
                   [RA°,Dec°,type,name] — types: C cluster, A association, N emission nebula, HS HI shell, SNR (+combos)
   M87GC — M87 globular cluster system: Strader+ 2011, VizieR J/ApJS/197/33. [RA°,Dec°,id] */
const LMCCAT=${JSON.stringify(lmc)};
const SMCCAT=${JSON.stringify(smc)};
const M87GC=${JSON.stringify(m87)};
`);
console.log('wrote members2.js', (fs.statSync('/home/centos-docker/www_html/vdata/cosmos/includes/js/members2.js').size/1024).toFixed(0)+'KB');
