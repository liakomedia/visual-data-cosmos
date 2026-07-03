// Parse Yale Bright Star Catalogue (BSC5 fixed-width) → compact JS array for the app
const fs=require('fs');
const lines=fs.readFileSync('/tmp/claude-0/-home-centos-docker/98cb5152-5781-4d92-adf6-9fc3a3a88036/scratchpad/ybsc5','utf8').split('\n');
const SPECIDX={O:0,B:1,A:2,F:3,G:4,K:5,M:6};
const out=[];
let skipped=0;
for(const L of lines){
  if(L.length<107) {skipped++; continue;}
  const rah=L.substring(75,77), ram=L.substring(77,79), ras=L.substring(79,83);
  const dsg=L.substring(83,84), dd=L.substring(84,86), dm=L.substring(86,88), ds=L.substring(88,90);
  const vm=L.substring(102,107).trim();
  if(!rah.trim()||!vm){skipped++;continue;}   // novae/non-stars with blank positions
  const ra=(+rah + (+ram)/60 + (+ras)/3600)*15;                       // degrees
  let dec=(+dd)+(+dm)/60+(+ds)/3600; if(dsg==='-')dec=-dec;
  const mag=+vm;
  const sp=L.substring(127,147).trim();
  // spectral class letter — first OBAFGKM found in the type string
  let si=7; for(const ch of sp){ if(ch in SPECIDX){ si=SPECIDX[ch]; break; } }
  let name=L.substring(4,14).trim().replace(/\s+/g,' ');
  const hr=L.substring(0,4).trim();
  out.push([+(ra.toFixed(2)), +(dec.toFixed(2)), +(mag.toFixed(1)), si, hr, name]);
}
console.log('parsed',out.length,'stars, skipped',skipped);
console.log('mag range', Math.min(...out.map(s=>s[2])), Math.max(...out.map(s=>s[2])));
const js='/* Yale Bright Star Catalogue (BSC5) — Hoffleit & Warren 1991, Harvard/SAO. ~all naked-eye stars.\n'+
 '   Each entry: [RA°, Dec°, Vmag, spectralClassIdx(OBAFGKM=0-6,other=7), HR number, name] */\n'+
 'const BSC=['+out.map(s=>JSON.stringify(s)).join(',\n')+'];\n';
fs.writeFileSync('/home/centos-docker/www_html/app/visual-data-universe/includes/js/stars-bsc.js',js);
console.log('wrote stars-bsc.js', (js.length/1024).toFixed(0)+'KB');
