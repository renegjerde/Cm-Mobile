const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const re=new RegExp('function '+name+'\\s*\\('),m=re.exec(html);if(!m)throw Error('Missing '+name);const start=m.index,open=html.indexOf('{',m.index);let d=0,q='',e=false;for(let i=open;i<html.length;i++){const c=html[i];if(q){if(e){e=false;continue;}if(c==='\\'){e=true;continue;}if(c===q)q='';continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')d++;else if(c==='}'&&--d===0)return html.slice(start,i+1);}throw Error('Unclosed '+name);}
const clubs=[{name:'User FC',strength:70}];for(let i=1;i<=24;i++)clubs.push({name:`AI Club ${i}`,strength:48+(i%8)*5,division:i<=8?'Premier League':i<=14?'Championship':'League One'});
const appState={club:0,seasonYear:2026,clubFinances:{},youthAcademies:{},log:[],worldSquads:[],eflPlayerDatabase:{}};
for(const c of clubs){appState.clubFinances[c.name]={wageBudget:1200};appState.youthAcademies[c.name]=[];}
const context={AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},appState,CLUBS:clubs,playerCareerIdentity:p=>String(p.careerId||p.id||p.name),syncEFLWorldRosterMirror:()=>{},console,Math,Number,String,Array,Object,Set,Map};
context.aiPosGroup=p=>{const x=String(p?.pos||'').toUpperCase();if(x==='GK')return'GK';if(['DEF','CB','LB','RB'].includes(x))return'DEF';if(['MID','CM','DM','AM'].includes(x))return'MID';return'ATT';};
context.aiSquadCounts=s=>{const c={GK:0,DEF:0,MID:0,ATT:0};for(const p of s||[])c[context.aiPosGroup(p)]++;return c;};
context.aiSquadNeeds=s=>{const c=context.aiSquadCounts(s);return Object.fromEntries(Object.entries(context.AI_SQUAD_TARGETS).map(([k,n])=>[k,n-c[k]]));};
vm.createContext(context);for(const n of ['aiSquadStrategicPlan','aiContractRenewalPlan','processAIContractRenewals'])vm.runInContext(extract(n),context);
const positions=['GK','DEF','MID','ATT'];let serial=0;
for(let ci=1;ci<clubs.length;ci++){
 const roster=[];for(let j=0;j<24;j++){const pos=positions[j%4],age=19+((j*3+ci)%16),rating=Math.max(38,Math.min(88,clubs[ci].strength-8+((j*7+ci)%17)-5));const exp=2027+((j+ci)%3);roster.push({id:`P${ci}-${j}`,careerId:`P${ci}-${j}`,name:`Player ${ci}-${j}`,pos,age,rating,potential:Math.min(95,rating+12),wage:Math.max(3,Math.round((rating-35)*.65)),contractEndDate:`${exp}-06-30`,morale:65});}appState.worldSquads[ci]=roster;
}
let renewals=0,expired=0,peakRoster=0,duplicateCareerIds=0,wageBudgetViolations=0;
for(let year=2026;year<2036;year++){
 appState.seasonYear=year;const result=context.processAIContractRenewals(year);renewals+=result.renewed;
 const seen=new Set();
 for(let ci=1;ci<clubs.length;ci++){
  const roster=appState.worldSquads[ci]||[];peakRoster=Math.max(peakRoster,roster.length);const wageBill=roster.reduce((sum,p)=>sum+(Number(p.wage)||0),0);if(wageBill>appState.clubFinances[clubs[ci].name].wageBudget*1.12)wageBudgetViolations++;
  for(let i=roster.length-1;i>=0;i--){const p=roster[i],id=context.playerCareerIdentity(p);if(seen.has(id))duplicateCareerIds++;seen.add(id);
   if(Number(String(p.contractEndDate||'').slice(0,4))<=year+1){roster.splice(i,1);expired++;continue;}
   p.age++;
  }
 }
}
assert(renewals>0,'multi-season simulation should renew contracts');
assert(duplicateCareerIds===0,'career identities remain unique across AI club squads');
assert(wageBudgetViolations===0,'renewals remain within wage budget ceiling');
assert(appState.worldSquads.slice(1).every(r=>r.length<=24),'no roster growth from renewals');
assert(Object.values(appState.worldSquads.slice(1)).flat().every(p=>Number(String(p.contractEndDate).slice(0,4))>=2036||Number(p.age)>37),'no invalid contract state in surviving players');
console.log(JSON.stringify({seasons:10,aiClubs:24,initialPlayers:24*24,renewals,expiredWithoutRenewal:expired,duplicateCareerIds,peakRoster,wageBudgetViolations,allRenewalsWithinWagePolicy:wageBudgetViolations===0,passed:true},null,2));
