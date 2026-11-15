const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const re=new RegExp('function '+name+'\\s*\\('),m=re.exec(html);if(!m)throw Error('Missing '+name);const start=m.index,open=html.indexOf('{',m.index);let d=0,q='',e=false;for(let i=open;i<html.length;i++){const c=html[i];if(q){if(e){e=false;continue;}if(c==='\\'){e=true;continue;}if(c===q)q='';continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')d++;else if(c==='}'&&--d===0)return html.slice(start,i+1);}throw Error('Unclosed '+name);}
const clubs=[{name:'User FC',strength:70,division:'Premier League'},{name:'AI Premier',strength:70,division:'Premier League'},{name:'AI EFL',strength:52,division:'Championship'}];
const appState={club:0,seasonYear:2027,worldSquads:[[],[],[]],eflPlayerDatabase:{'National League':{'AI Lower':[]}},lowerLeagues:{'National League':{rows:[{name:'AI Lower',strength:45,division:'National League'}]}},clubFinances:{'AI Premier':{wageBudget:1000},'AI EFL':{wageBudget:300},'AI Lower':{wageBudget:200}},youthAcademies:{},aiAcademyPromotionHistory:[],log:[]};
const context={appState,CLUBS:clubs,AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},currentClub:()=>clubs[appState.club],clubDivision:c=>c?.division||'Premier League',domesticDivisionForClubName:n=>n==='AI Lower'?'National League':null,playerCareerIdentity:p=>String(p.careerId||p.id||p.name),stableSeed:s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;},aiPosGroup:p=>{const x=String(p?.pos||'').toUpperCase();if(x==='GK')return'GK';if(['DEF','CB','LB','RB','LWB','RWB'].includes(x))return'DEF';if(['MID','DM','CM','AM','LM','RM','CAM','CDM'].includes(x))return'MID';return'ATT';},syncEFLWorldRosterMirror:i=>{context.mirrorCalls=(context.mirrorCalls||0)+1;},mirrorCalls:0,Number,String,Array,Object,Set,Math,console};
vm.createContext(context);for(const n of ['aiAcademyRosterForClub','processAIAcademyPromotion'])vm.runInContext(extract(n),context);
function youth(id,age,rating,potential,pos='MID'){return {id,careerId:id,name:id,pos,age,rating,potential,wage:2,academySeason:2026};}
// Premier League promotion for a strong, eligible player into a positional shortage.
appState.worldSquads[1]=Array.from({length:17},(_,i)=>({id:'p'+i,careerId:'p'+i,name:'P'+i,pos:i<2?'GK':i<8?'DEF':i<14?'MID':'ATT',rating:65,wage:10}));
let p=youth('academy-pl',18,66,82,'MID');
assert(context.processAIAcademyPromotion({name:'AI Premier',division:'Premier League',strength:70},p,2027),'strong PL prospect should be promoted');
assert(appState.worldSquads[1].some(x=>x.careerId==='academy-pl'),'promoted PL player is in canonical world squad');
assert(appState.aiAcademyPromotionHistory.length===1,'promotion history stored');
assert(!context.processAIAcademyPromotion({name:'AI Premier',division:'Premier League',strength:70},youth('second',18,66,82),2027),'only one promotion per club per season');
// User club must never be processed by autonomous AI pathway.
assert(!context.processAIAcademyPromotion({name:'User FC',division:'Premier League',strength:70},youth('user-y',18,70,85),2027),'user club excluded');
// Too weak for the club and too young are rejected.
assert(!context.processAIAcademyPromotion({name:'AI EFL',division:'Championship',strength:52},youth('weak',18,35,50),2027),'weak player rejected');
assert(!context.processAIAcademyPromotion({name:'AI EFL',division:'Championship',strength:52},youth('young',16,65,80),2027),'underage player rejected');
// EFL academy pathway uses the EFL database and preserves its canonical roster.
appState.eflPlayerDatabase['National League']['AI Lower']=Array.from({length:18},(_,i)=>({id:'e'+i,careerId:'e'+i,name:'E'+i,pos:i<3?'GK':i<9?'DEF':i<15?'MID':'ATT',rating:48,wage:4}));
p=youth('academy-efl',18,54,72,'ATT');
assert(context.processAIAcademyPromotion({name:'AI Lower',division:'National League',strength:45},p,2027),'eligible EFL prospect promoted');
assert(appState.eflPlayerDatabase['National League']['AI Lower'].some(x=>x.careerId==='academy-efl'),'EFL prospect inserted in EFL canonical DB');
// Wage ceiling blocks promotion if the club is already under pressure.
appState.clubFinances['AI Lower'].wageBudget=10;
assert(!context.processAIAcademyPromotion({name:'AI Lower',division:'National League',strength:45},youth('wageblocked',18,60,75,'DEF'),2028),'wage ceiling enforced');
// Existing career identity cannot be promoted twice from another roster.
appState.clubFinances['AI Lower'].wageBudget=200;
appState.worldSquads[2].push({id:'dup',careerId:'duplicate-id',name:'Existing'});
assert(!context.processAIAcademyPromotion({name:'AI Lower',division:'National League',strength:45},youth('duplicate-id',18,60,75,'DEF'),2028),'duplicate identity rejected');
// Hook is installed after age-up and before free-agent release, only for rival clubs.
assert(html.includes('c.name!==currentClub().name&&hadFullSeason&&processAIAcademyPromotion(c,p,season)'),'season transition must attempt rival promotion');
console.log(JSON.stringify({premierLeaguePromotion:true,userClubExcluded:true,onePromotionPerClubSeason:true,ageAndQualityGates:true,eflCanonicalRosterPromotion:true,wageCeilingEnforced:true,duplicateIdentityBlocked:true,seasonTransitionHook:true,passed:true},null,2));
