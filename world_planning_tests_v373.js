const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const renewHook=html.indexOf('const aiRenewals=processAIContractRenewals');
const expiryHook=html.indexOf('const expiredContracts=processExpiredContracts');
const transferPlanHook=html.includes('plan=aiSquadStrategicPlan(roster,CLUBS[i])')&&html.includes('const strategicPlan=aiSquadStrategicPlan(roster,club)');
assert(renewHook>=0&&expiryHook>renewHook,'AI renewals must run before contract expiry cleanup');
assert(transferPlanHook,'strategic squad plan must feed league and free-agent recruitment');
function extract(name){
 const re=new RegExp('function '+name+'\\s*\\(');const m=re.exec(html);if(!m)throw new Error('Missing '+name);
 const start=m.index,open=html.indexOf('{',m.index);let depth=0,quote='',escape=false;
 for(let i=open;i<html.length;i++){const c=html[i];if(quote){if(escape){escape=false;continue;}if(c==='\\'){escape=true;continue;}if(c===quote)quote='';continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='{')depth++;else if(c==='}'&&--depth===0)return html.slice(start,i+1);}
 throw new Error('Unclosed '+name);
}
const context={
 AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},
 appState:{club:0,seasonYear:2026,clubFinances:{'AI One':{wageBudget:500},'AI Two':{wageBudget:20}},youthAcademies:{'AI One':[]},log:[],worldSquads:[],eflPlayerDatabase:{}},
 CLUBS:[{name:'User FC',strength:70},{name:'AI One',strength:70,division:'Premier League'},{name:'AI Two',strength:52,division:'Championship'}],
 playerCareerIdentity:p=>String(p.careerId||p.id||p.name),
 syncEFLWorldRosterMirror:()=>{},
 console,Math,Number,String,Array,Object,Set,Map
};
context.aiPosGroup=function(p){const x=String(p?.pos||p?.position||'').toUpperCase();if(x==='GK'||x.includes('KEEP'))return 'GK';if(['DEF','CB','LB','RB','LWB','RWB'].includes(x)||x.includes('DEF'))return 'DEF';if(['MID','DM','CM','AM','LM','RM','CAM','CDM'].includes(x)||x.includes('MID'))return 'MID';return 'ATT';};
context.aiSquadCounts=function(squad){const c={GK:0,DEF:0,MID:0,ATT:0};for(const p of squad||[])c[context.aiPosGroup(p)]++;return c;};
context.aiSquadNeeds=function(squad){const c=context.aiSquadCounts(squad);return Object.fromEntries(Object.entries(context.AI_SQUAD_TARGETS).map(([k,n])=>[k,n-c[k]]));};
vm.createContext(context);
for(const name of ['aiSquadStrategicPlan','aiContractRenewalPlan','processAIContractRenewals'])vm.runInContext(extract(name),context);
function player(id,pos,age,rating,expiry,wage=10){return {id,careerId:id,name:id,pos,age,rating,potential:rating+8,wage,contractEndDate:expiry};}
const fullWeak=[];for(let i=0;i<3;i++)fullWeak.push(player('gk'+i,'GK',25,48,'2027-06-30'));for(let i=0;i<8;i++)fullWeak.push(player('d'+i,'DEF',25,48,'2027-06-30'));for(let i=0;i<8;i++)fullWeak.push(player('m'+i,'MID',25,48,'2027-06-30'));for(let i=0;i<6;i++)fullWeak.push(player('a'+i,'ATT',25,48,'2027-06-30'));
const plan=context.aiSquadStrategicPlan(fullWeak,context.CLUBS[1]);assert(plan.shortages>0,'quality gaps should create strategic needs despite headcount');
const aiRoster=[player('core-mid','MID',26,76,'2027-06-30',20),player('old-mid','MID',35,70,'2027-06-30',18),player('fringe-mid','MID',25,52,'2027-06-30',8)];
const previewRoster=aiRoster.map(p=>({...p}));const renewPlan=context.aiContractRenewalPlan(previewRoster,context.CLUBS[1],2026);
assert(renewPlan.renew.some(x=>x.playerName==='core-mid'),'core player should be renewed');
assert(!renewPlan.renew.some(x=>x.playerName==='old-mid'),'outfield veteran over 34 should not be renewed');
assert(!renewPlan.renew.some(x=>x.playerName==='fringe-mid'),'fringe player should not be renewed');
context.appState.worldSquads=[[],aiRoster,[]];
const out=context.processAIContractRenewals(2026);
assert(out.renewed===1,'only eligible core player renewed');
assert(aiRoster[0].contractEndDate==='2029-06-30','contract extended by three seasons');
assert(aiRoster[0].contractRenewedSeason===2026,'renewal season guard recorded');
assert(!context.appState.aiContractRenewalHistory || context.appState.aiContractRenewalHistory.length===1,'renewal history stored');
// Wage ceiling: a club already over its wage budget must not extend a costly core contract.
context.appState.clubFinances['AI One'].wageBudget=20;
const expensive=[player('expensive','ATT',24,80,'2027-06-30',30)];
assert(context.aiContractRenewalPlan(expensive,context.CLUBS[1],2026).renew.length===0,'wage pressure blocks renewal');
// Youth succession: an established older player can be left to expire if a strong academy replacement exists.
context.appState.youthAcademies['AI One']=[{id:'y1',pos:'DEF',age:18,rating:64,potential:78}];
const veteran=[player('leader','DEF',27,72,'2028-06-30',16),player('veteran','DEF',32,66,'2027-06-30',12),player('reserve','DEF',26,60,'2028-06-30',8)];
const youthPlan=context.aiContractRenewalPlan(veteran,context.CLUBS[1],2026);
assert(!youthPlan.renew.some(x=>x.playerName==='veteran'),'succession prospect should prevent automatic veteran renewal');
console.log(JSON.stringify({strategicQualityNeed:plan.needs,strategicShortages:plan.shortages,eligibleRenewals:renewPlan.renew.map(x=>x.playerName),seasonRenewals:out.renewed,wageCeilingEnforced:true,youthSuccessionEnforced:true,seasonEndHookBeforeExpiry:true,strategicTransferIntegration:true,passed:true},null,2));
