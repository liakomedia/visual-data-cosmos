// Parse exoplanets + quasars + pulsars → includes/js/deep.js
const fs=require('fs');
const dir='/tmp/claude-0/-home-centos-docker/98cb5152-5781-4d92-adf6-9fc3a3a88036/scratchpad/';
const sex2deg=(s,isRA)=>{ const m=s.trim().split(/[\s:]+/).map(Number); if(m.some(isNaN)||!m.length) return null;
  let d=Math.abs(m[0])+(m[1]||0)/60+(m[2]||0)/3600; if(/^\s*-/.test(s)) d=-d; return isRA? d*15 : d; };

// --- Exoplanets (NASA Exoplanet Archive, pscomppars): pl_name,ra,dec,sy_dist(pc),disc_year,method
// naive CSV with quoted names
const exo=[];
const lines=fs.readFileSync(dir+'exo.csv','utf8').split('\n');
for(let i=1;i<lines.length;i++){
  const L=lines[i]; if(!L) continue;
  const m=L.match(/^"([^"]*)",([-\d.]+),([-\d.]+),([-\d.]*),(\d*),"([^"]*)"/);
  if(!m) continue;
  const ra=+m[2], dec=+m[3], d=parseFloat(m[4]);
  if(!isFinite(ra)||!isFinite(d)||d<=0) continue;
  exo.push([+ra.toFixed(2),+dec.toFixed(2),+d.toFixed(1),m[1],+m[5]||null,m[6]]);
}
// --- SDSS quasars: ra,dec,z
const qso=fs.readFileSync(dir+'qso.csv','utf8').split('\n')
  .filter(l=>l&&!l.startsWith('#')&&!l.startsWith('ra,'))
  .map(l=>{const [ra,dec,z]=l.split(',');return [+(+ra).toFixed(2),+(+dec).toFixed(2),+(+z).toFixed(3)];})
  .filter(a=>isFinite(a[0])&&isFinite(a[2]));
// --- ATNF pulsars: PSRJ, RA, Dec, Dist(kpc)
const psr=[];
for(const L of fs.readFileSync(dir+'psr.tsv','utf8').split('\n')){
  if(L.startsWith('#')||!L.includes('\t')) continue;
  const c=L.split('\t'); if(c.length<4) continue;
  const ra=sex2deg(c[1],true), dec=sex2deg(c[2],false), d=parseFloat(c[3]);
  if(ra==null||dec==null||!isFinite(d)||d<=0) continue;
  psr.push([+ra.toFixed(2),+dec.toFixed(2),+d.toFixed(2),c[0].trim()]);
}
console.log('exoplanets:',exo.length,'| quasars:',qso.length,'| pulsars:',psr.length);
const js=`/* Deep catalogues:
   EXO — confirmed exoplanets: NASA Exoplanet Archive (pscomppars). [RA°,Dec°,dist pc,name,year,method]
   QSO — quasars: SDSS DR17 spectroscopy, z 0.1–5.               [RA°,Dec°,z]
   PSR — pulsars: ATNF Pulsar Catalogue (Manchester+ 2005), VizieR B/psr. [RA°,Dec°,dist kpc,name] */
const EXO=${JSON.stringify(exo)};
const QSO=${JSON.stringify(qso)};
const PSR=${JSON.stringify(psr)};
`;
fs.writeFileSync('/home/centos-docker/www_html/app/visual-data-universe/includes/js/deep.js',js);
console.log('wrote deep.js',(js.length/1024).toFixed(0)+'KB');
