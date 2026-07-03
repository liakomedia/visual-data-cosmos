// Parse SNRs + PNe + GWTC + HETDEX → includes/js/deep2.js
const fs=require('fs');
const dir='/tmp/claude-0/-home-centos-docker/98cb5152-5781-4d92-adf6-9fc3a3a88036/scratchpad/';
const sex2deg=(s,isRA)=>{ const m=s.trim().split(/[\s:]+/).map(Number); if(m.some(isNaN)||!m.length) return null;
  let d=Math.abs(m[0])+(m[1]||0)/60+(m[2]||0)/3600; if(/^\s*-/.test(s)) d=-d; return isRA? d*15 : d; };

// --- Green supernova remnants (VII/278): SNR, RA "HH MM SS", Dec "±DD MM", MajDiam('), type
const snr=[];
for(const L of fs.readFileSync(dir+'snr.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=sex2deg(c[1],true), dec=sex2deg(c[2],false), sz=parseFloat(c[3]);
  if(ra==null||dec==null) continue;
  snr.push([+ra.toFixed(2),+dec.toFixed(2),isFinite(sz)?sz:null,('SNR '+c[0].trim()),(c[4]||'').trim()]);
}
// --- Strasbourg-ESO planetary nebulae (V/84): PNG, Name, RA°, Dec° (J2000 computed by VizieR)
const pne=[];
for(const L of fs.readFileSync(dir+'pne.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=parseFloat(c[2]), dec=parseFloat(c[3]);
  if(!isFinite(ra)||!isFinite(dec)) continue;
  pne.push([+ra.toFixed(2),+dec.toFixed(2),(c[1].trim()||('PN G'+c[0].trim()))]);
}
// --- GWTC gravitational-wave events (GWOSC): dedupe by commonName, keep m1,m2,DL(Mpc)
const j=JSON.parse(fs.readFileSync(dir+'gwtc.json'));
const seen={}, gw=[];
Object.values(j.events).forEach(e=>{
  const n=e.commonName; if(seen[n]) return; seen[n]=1;
  const dl=e.luminosity_distance, m1=e.mass_1_source, m2=e.mass_2_source;
  if(!isFinite(dl)||dl<=0) return;
  gw.push([Math.round(dl), m1!=null?+(+m1).toFixed(1):null, m2!=null?+(+m2).toFixed(1):null, n]);
});
// --- HETDEX public source catalog (Mentuch Cooper+ 2023): RA°, Dec°, z
const het=[];
for(const L of fs.readFileSync(dir+'hetdex.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<3) continue;
  const ra=parseFloat(c[0]), dec=parseFloat(c[1]), z=parseFloat(c[2]);
  if(!isFinite(ra)||!isFinite(dec)||!isFinite(z)||z<=0.01) continue;
  het.push([+ra.toFixed(2),+dec.toFixed(2),+z.toFixed(3)]);
}
console.log('SNRs:',snr.length,'| PNe:',pne.length,'| GW events:',gw.length,'| HETDEX:',het.length);
const js=`/* Deep catalogues 2:
   SNRCAT — Galactic supernova remnants: Green 2019, VizieR VII/278.        [RA°,Dec°,size',name,type]
   PNECAT — Galactic planetary nebulae: Strasbourg-ESO (Acker+ 1992), V/84. [RA°,Dec°,name]
   GWCAT  — gravitational-wave events: GWTC (LIGO/Virgo/KAGRA, GWOSC).      [DL Mpc,m1 M☉,m2 M☉,name]
   HETCAT — HETDEX Public Source Catalog 1: Mentuch Cooper+ 2023, J/ApJ/943/177. [RA°,Dec°,z] */
const SNRCAT=${JSON.stringify(snr)};
const PNECAT=${JSON.stringify(pne)};
const GWCAT=${JSON.stringify(gw)};
const HETCAT=${JSON.stringify(het)};
`;
fs.writeFileSync('/home/centos-docker/www_html/app/visual-data-universe/includes/js/deep2.js',js);
console.log('wrote deep2.js',(js.length/1024).toFixed(0)+'KB');
