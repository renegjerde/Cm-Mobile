const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const st=source.indexOf(`function ${name}(`);if(st<0)throw Error('missing '+name);const b=source.indexOf('{',st);let d=0,q=null,e=false,line=false,block=false;for(let i=b;i<source.length;i++){const c=source[i],n=source[i+1];if(line){if(c==='\n')line=false;continue;}if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}if(q){if(e)e=false;else if(c==='\\')e=true;else if(c===q)q=null;continue;}if(c==='/'&&n==='/'){line=true;i++;continue;}if(c==='/'&&n==='*'){block=true;i++;continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')d++;if(c==='}'&&--d===0)return source.slice(st,i+1);}throw Error('unclosed '+name);}
const ctx={console,Math,Number,String,Object,Array,Set,Map,Date,JSON,appState:{},CLUBS:[],seededRandom:()=>()=>.99,stableSeed:s=>String(s).length,cm70SyncGeneratedAttributesWithCA:()=>{},playerCareerIdentity:p=>String(p.careerId||p.id||p.name),currentClub:()=>({name:'User FC'}),seasonLabel:()=> '2026/27',CAREER_STAT_KEYS:['apps','minutes','goals','assists','yellowCards','redCards','chancesCreated'],aiContractRenewalPlan:(roster,club,season)=>{let n=0;for(const p of roster){if(!p.contractRenewedSeason&&String(p.contractEndDate||'').startsWith(String(season+1))&&p.rating>=70){p.contractEndDate=`${season+3}-06-30`;p.contractRenewedSeason=season;n++;}}return {renew:roster.filter(p=>p.contractRenewedSeason===season).map(p=>({playerName:p.name,clubName:club.name})),wageBill:0};},
 clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),assignTacticalRoles:x=>x,createMatchLineup:(players)=>players.slice(0,11),weightedPick:(arr)=>arr[0]||null,shotFinishingScore:p=>p.rating,matchAttribute:()=>65,keeperShotStoppingScore:()=>65,assistForGoal:()=>null,sampleGoalMethod:()=> 'open-play',goalScorerFor:(xi,m,f)=>f,playerInjuryWeight:()=>100,matchInjuryProbability:()=>.008,directRedOffence:()=>({label:'Direct red',code:'direct-red',matches:1}),applyPlayerMatchExperienceDevelopment:()=>{},addCompetitionStat:(p,c,k,v=1)=>{p.competitionStats=p.competitionStats||{};p.competitionStats[c]=p.competitionStats[c]||{};p.competitionStats[c][k]=(p.competitionStats[c][k]||0)+v;},domesticClubKey:s=>String(s).toLowerCase()};
vm.createContext(ctx);
for(const name of ['processCareerAgeing','archivePlayerSeasonStats','processAIContractRenewals','simulateMatch','recordSimulatedPlayerStats'])vm.runInContext(extract(name),ctx);
ctx.CLUBS=[{name:'User FC'},{name:'EFL FC'}];
const user={id:'u',careerId:'u',name:'User',age:24,pos:'MID',rating:70,potential:80,minutes:2000};
const eflWorld={id:'e1',careerId:'efl1',name:'EFL Player',age:26,pos:'DEF',rating:70,potential:75,minutes:2000};
const eflMirror={...eflWorld,attributes:{}};
const euro={id:'eu1',careerId:'eu1',name:'Euro Player',age:30,pos:'MID',rating:78,potential:80,minutes:2500,goals:12,apps:30,minutes:2500};
ctx.appState={seasonYear:2026,club:0,squad:[user],worldSquads:[[user],[eflWorld]],eflPlayerDatabase:{Championship:{'EFL FC':[eflMirror]}},europeanTransferSquads:{'Euro FC':[euro]},log:[]};
let age=ctx.processCareerAgeing();
assert.equal(user.age,25);assert.equal(eflWorld.age,27);assert.equal(eflMirror.age,27,'EFL mirror should sync but not double-age');assert.equal(euro.age,31,'European squad ages');assert.equal(age.aged,3,'unique identities aged once');
const archive=ctx.archivePlayerSeasonStats();assert.equal(euro.careerHistory.length,1);assert.equal(euro.careerHistory[0].goals,12);assert.equal(euro.careerStats.goals,12);assert.equal(archive.playersSeen,3);
const expiring={id:'eu2',careerId:'eu2',name:'Euro Renewal',age:25,pos:'MID',rating:80,potential:85,wage:20,contractEndDate:'2027-06-30'};
ctx.appState.clubFinances={'Euro Club':{wageBudget:100}};ctx.appState.europeanTransferSquads['Euro Club']=[expiring];
const renew=ctx.processAIContractRenewals(2026);assert(renew.renewed>=1);assert.equal(expiring.contractRenewedSeason,2026);
// Match test: force an injury probability, verify player removed and minutes reduced.
function player(id,pos){return {id,name:id,pos,rating:65,attributes:{defending:65},wage:1};}
const a=[player('a1','GK'),...Array.from({length:4},(_,i)=>player('ad'+i,'DEF')),...Array.from({length:3},(_,i)=>player('am'+i,'MID')),...Array.from({length:3},(_,i)=>player('aa'+i,'ATT'))];
const b=[player('b1','GK'),...Array.from({length:4},(_,i)=>player('bd'+i,'DEF')),...Array.from({length:3},(_,i)=>player('bm'+i,'MID')),...Array.from({length:3},(_,i)=>player('ba'+i,'ATT'))];
for(let i=0;i<2;i++){a.push(player('benchA'+i,'DEF'));b.push(player('benchB'+i,'DEF'));}
let sim=ctx.simulateMatch(65,65,true,a,b);assert(sim.initialXiA.length===11);assert(sim.events.some(e=>e.type==='injury'||e.type==='red'),'incidents should be represented');
const reduced=Object.values(sim.playerMinutesA).concat(Object.values(sim.playerMinutesB)).some(m=>m<90);assert(reduced,'incident should reduce minutes');
ctx.appState.worldSquads=[a.map(x=>({...x})),b.map(x=>({...x}))];ctx.recordSimulatedPlayerStats(0,1,a,b,sim,'Test League');
const played=ctx.appState.worldSquads.flat().filter(p=>p.apps===1);assert(played.length<=26);assert(played.every(p=>p.minutes<=90));assert(played.some(p=>p.minutes<90));
assert.equal(eflMirror.careerHistory.length,1,'EFL mirror should receive archived career history');
let secondYellowSeen=false,subSeen=false;for(let i=0;i<80;i++){const m=ctx.simulateMatch(65,65,true,a,b);if(m.events.some(e=>e.secondYellow))secondYellowSeen=true;if(m.substitutionEvents.length)subSeen=true;}assert(secondYellowSeen,'second-yellow dismissal should be possible');assert(subSeen,'injured starter should be replaced when suitable bench player exists');
console.log(JSON.stringify({passed:true,age,archive,renewed:renew.renewed,simulatedEvents:sim.events.length,playersWithReducedMinutes:played.filter(p=>p.minutes<90).length,played:played.length,secondYellowSeen,subSeen},null,2));
