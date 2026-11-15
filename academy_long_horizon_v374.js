const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const re=new RegExp('function '+name+'\\s*\\('),m=re.exec(html);if(!m)throw Error('Missing '+name);const start=m.index,open=html.indexOf('{',m.index);let d=0,q='',e=false;for(let i=open;i<html.length;i++){const c=html[i];if(q){if(e){e=false;continue;}if(c==='\\'){e=true;continue;}if(c===q)q='';continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')d++;else if(c==='}'&&--d===0)return html.slice(start,i+1);}throw Error('Unclosed '+name);}
const clubs=[{name:'User FC',strength:70,division:'Premier League'}];
for(let i=1;i<=24;i++)clubs.push({name:`AI Club ${i}`,strength:48+(i%8)*5,division:i<=8?'Premier League':i<=16?'Championship':'League One'});
const appState={club:0,seasonYear:2027,worldSquads:clubs.map(()=>[]),eflPlayerDatabase:{},lowerLeagues:{},clubFinances:{},aiAcademyPromotionHistory:[],log:[]};
for(let i=1;i<clubs.length;i++){appState.clubFinances[clubs[i].name]={wageBudget:1500};for(let j=0;j<22;j++){const pos=j<3?'GK':j<9?'DEF':j<16?'MID':'ATT';appState.worldSquads[i].push({id:`S-${i}-${j}`,careerId:`S-${i}-${j}`,name:`Senior ${i}-${j}`,pos,rating:clubs[i].strength-8,wage:12,age:24+(j%9)});}}
const context={appState,CLUBS:clubs,AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},currentClub:()=>clubs[appState.club],clubDivision:c=>c?.division||'Premier League',domesticDivisionForClubName:()=>null,playerCareerIdentity:p=>String(p.careerId||p.id||p.name),stableSeed:s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;},aiPosGroup:p=>{const x=String(p?.pos||'').toUpperCase();if(x==='GK')return'GK';if(['DEF','CB','LB','RB'].includes(x))return'DEF';if(['MID','DM','CM','AM'].includes(x))return'MID';return'ATT';},syncEFLWorldRosterMirror:()=>{},Number,String,Array,Object,Set,Math,console};
vm.createContext(context);vm.runInContext(extract('aiAcademyRosterForClub'),context);vm.runInContext(extract('processAIAcademyPromotion'),context);
let promoted=0,duplicateIds=0,overCap=0,wageViolations=0;
for(let year=2027;year<2037;year++){
 appState.seasonYear=year;
 for(let ci=1;ci<clubs.length;ci++){
  const roster=appState.worldSquads[ci];
  // One normal senior departure creates a realistic vacancy each season.
  for(let k=roster.length-1;k>=0;k--)if(Number(roster[k].age)>=35)roster.splice(k,1);
  const club=clubs[ci],pos=['GK','DEF','MID','ATT'][year%4];
  const youth={id:`Y-${ci}-${year}`,careerId:`Y-${ci}-${year}`,name:`Academy ${ci}-${year}`,pos,age:18,rating:club.strength-3,potential:Math.min(95,club.strength+15),wage:3,academySeason:year-1};
  if(context.processAIAcademyPromotion(club,youth,year))promoted++;
  const ids=new Set();for(const p of roster){const id=context.playerCareerIdentity(p);if(ids.has(id))duplicateIds++;ids.add(id);}
  if(roster.length>24)overCap++;
  const bill=roster.reduce((sum,p)=>sum+(Number(p.wage)||0),0);if(bill>appState.clubFinances[club.name].wageBudget*1.12)wageViolations++;roster.forEach(p=>p.age=(Number(p.age)||24)+1);
 }
}
assert(promoted>=200,'expected substantial youth-to-senior pathway over 10 seasons');
assert(duplicateIds===0,'no duplicate career identities');assert(overCap===0,'rosters remain capped');assert(wageViolations===0,'wage budgets remain respected');
console.log(JSON.stringify({seasons:10,aiClubs:24,academyCandidates:240,promotions:promoted,duplicateCareerIds:duplicateIds,rosterCapViolations:overCap,wageBudgetViolations:wageViolations,passed:true},null,2));
