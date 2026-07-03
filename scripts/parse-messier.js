// Per-galaxy member catalogues → members3.js (M81, M51, M101, M82, Cen A, Sombrero, Antennae)
const fs=require('fs');
const rows=f=>fs.readFileSync(f,'utf8').split('\n').filter(l=>/^[0-9]/.test(l)).map(l=>l.split('\t'));
const D2R=Math.PI/180;
const sep=(ra,dec,c)=>Math.acos(Math.min(1,Math.sin(dec*D2R)*Math.sin(c[1]*D2R)+Math.cos(dec*D2R)*Math.cos(c[1]*D2R)*Math.cos((ra-c[0])*D2R)))/D2R;
const take=(file,centre,maxDeg,idCol,every=1)=>{
  const out=[]; let i=0;
  rows(file).forEach(c=>{
    const ra=+c[0], dec=+c[1]; if(!isFinite(ra)||!isFinite(dec)) return;
    if(sep(ra,dec,centre)>maxDeg) return;           // drop stray rows from other tables in the file
    if((i++)%every) return;
    out.push([+ra.toFixed(4),+dec.toFixed(4),(c[idCol]||'').trim()]);
  });
  return out;
};
const M81GC =take('probe-m81.tsv',      [148.888, 69.065], 1.0, 2);
const M51CL =take('probe-m51.tsv',      [202.470, 47.195], 0.5, 2);
const M101CL=take('probe-m101.tsv',     [210.802, 54.349], 1.0, 2);
const M82CL =take('probe-m82b.tsv',     [148.968, 69.680], 0.5, 2);
const CENGC =take('probe-cena2.tsv',    [201.365,-43.019], 1.5, 2);
const M104GC=take('probe-m104d.tsv',    [189.998,-11.623], 1.0, 3);
const ANTSRC=take('probe-antennae.tsv', [180.472,-18.877], 0.5, 2, 12);   // 61k point sources → every 12th
console.log({M81:M81GC.length,M51:M51CL.length,M101:M101CL.length,M82:M82CL.length,CenA:CENGC.length,M104:M104GC.length,Antennae:ANTSRC.length});
fs.writeFileSync('/home/centos-docker/www_html/vdata/cosmos/includes/js/members3.js',
`/* Per-galaxy member catalogues (3) — [RA°,Dec°,id]:
   M81GC  — M81 globular clusters: Nantais+ 2011, VizieR J/AJ/142/183
   M51CL  — M51 compact star clusters: Chandar+ 2016, VizieR J/ApJ/824/71
   M101CL — M101 old star clusters: Simanton+ 2015, VizieR J/ApJ/805/160
   M82CL  — M82 star clusters: Lim+ 2013, VizieR J/ApJ/766/20
   CENGC  — Centaurus A (NGC 5128) globular clusters: Woodley+ 2007, VizieR J/AJ/134/494
   M104GC — Sombrero (NGC 4594) globular clusters: Spitler+ 2006, VizieR J/AJ/132/1593
   ANTSRC — Antennae point-source catalogue (sampled 1/12): Whitmore+ 2010, VizieR J/AJ/140/75 */
const M81GC=${JSON.stringify(M81GC)};
const M51CL=${JSON.stringify(M51CL)};
const M101CL=${JSON.stringify(M101CL)};
const M82CL=${JSON.stringify(M82CL)};
const CENGC=${JSON.stringify(CENGC)};
const M104GC=${JSON.stringify(M104GC)};
const ANTSRC=${JSON.stringify(ANTSRC)};
`);
console.log('wrote members3.js',(fs.statSync('/home/centos-docker/www_html/vdata/cosmos/includes/js/members3.js').size/1024).toFixed(0)+'KB');
