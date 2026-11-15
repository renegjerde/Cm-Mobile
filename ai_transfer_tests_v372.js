
const assert=require('assert');
const AI_SQUAD_TARGETS={GK:3,DEF:8,MID:8,ATT:6};
const CLUBS=[{name:'User FC',strength:65,budget:10},{name:'AI Premier',strength:65,budget:10},{name:'AI Championship',strength:58,budget:10}];
const appState={club:0,seasonYear:2027,week:1,preseasonActive:true,freeAgents:[],worldSquads:[[],[],[]],eflPlayerDatabase:{Championship:{'AI Championship':[]}},europeanTransferSquads:{'European FC':[]},transferHistory:[],aiFreeAgentSignings:[],log:[]};
function currentClub(){return CLUBS[0]}
function clubDivision(c){return c.name==='AI Championship'?'Championship':'Premier League'}
function playerCareerIdentity(p){return String(p.careerId||p.id||p.name)}
function ensurePlayerContract(p,year){if(!p.contractEndDate)p.contractEndDate=`${year+2}-06-30`;return p}
function transferWindowOpen(){return true}
function stableSeed(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return h>>>0}
function seededRandom(seed){let x=seed>>>0;return ()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296}}
function normalisePlayerName(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'')}
function transferDateForGameweek(y,w){return `${y}-07-${String(Math.min(28,Math.max(1,w))).padStart(2,'0')}`}

function processExpiredContracts(completedSeasonYear){
 const cutoff=`${Number(completedSeasonYear)+1}-06-30`;let expired=[];const userIndex=Number(appState.club);const freeAgents=Array.isArray(appState.freeAgents)?appState.freeAgents:[];const expiredIds=new Set();
 const addFreeAgent=p=>{const cid=playerCareerIdentity(p);if(!freeAgents.some(x=>playerCareerIdentity(x)===cid))freeAgents.push({...p,freeAgent:true,freeAgentSinceSeason:Number(completedSeasonYear)+1,clubIndex:-1,clubName:'Klubbløs',division:null,contractEndDate:null,contractYearsAtSigning:0,loanStatus:null,source:'Contract expired'});};
 const expireRoster=(roster,clubName)=>{if(!Array.isArray(roster))return;for(let i=roster.length-1;i>=0;i--){const p=roster[i];if(!p)continue;const cid=playerCareerIdentity(p);if(p.loanStatus==='in'||p.loanStatus==='out')continue;ensurePlayerContract(p,completedSeasonYear);const isExpired=String(p.contractEndDate)<=cutoff||expiredIds.has(cid);if(!isExpired)continue;if(!expiredIds.has(cid)){expiredIds.add(cid);expired.push(p.name);addFreeAgent(p);}roster.splice(i,1);}};
 // Process the manager's canonical squad first. Its mirrored worldSquads entry is
 // rebuilt from this squad at season rollover, so it is intentionally skipped here.
 expireRoster(appState.squad,currentClub()?.name||'Managerens klubb');
 (appState.worldSquads||[]).forEach((roster,ci)=>{if(ci!==userIndex)expireRoster(roster,CLUBS[ci]?.name||'AI-klubb');});
 // EFL database rosters are also used by the transfer market; remove expired
 // registrations there as well as from the match-engine worldSquads mirror.
 for(const [division,clubs] of Object.entries(appState.eflPlayerDatabase||{}))for(const [clubName,roster] of Object.entries(clubs||{}))expireRoster(roster,clubName);
 // European transfer squads are persistent market registrations and must not
 // retain players whose contracts have already expired.
 for(const [clubName,roster] of Object.entries(appState.europeanTransferSquads||{}))expireRoster(roster,clubName);
 appState.freeAgents=freeAgents;if(expired.length){appState.log=appState.log||[];appState.log.push(`Kontrakter utløpt: ${expired.length} spillere ble klubbløse ved sesongslutt (${expired.slice(0,8).join(', ')}${expired.length>8?' …':''}).`);}return expired;
}

function aiPosGroup(p){const x=String(p?.pos||p?.position||'').toUpperCase();if(x==='GK'||x.includes('KEEP'))return 'GK';if(['DEF','CB','LB','RB','LWB','RWB'].includes(x)||x.includes('DEF'))return 'DEF';if(['MID','DM','CM','AM','LM','RM','CAM','CDM'].includes(x)||x.includes('MID'))return 'MID';return 'ATT';}

function aiSquadCounts(squad){const c={GK:0,DEF:0,MID:0,ATT:0};for(const p of squad||[])c[aiPosGroup(p)]++;return c;}

function aiSquadNeeds(squad){const c=aiSquadCounts(squad);return Object.fromEntries(Object.entries(AI_SQUAD_TARGETS).map(([k,n])=>[k,n-c[k]]));}

function syncEFLWorldRosterMirror(clubIndex){
 const club=CLUBS[clubIndex],division=club&&clubDivision(club);if(!club||!division||division==='Premier League'||!appState.eflPlayerDatabase?.[division])return;
 const roster=appState.worldSquads?.[clubIndex];if(!Array.isArray(roster))return;
 appState.eflPlayerDatabase[division][club.name]=roster.map(p=>({...p,attributes:{...(p.attributes||{})}}));
}

function processAIFreeAgentRecruitment(week=appState.week){
 if(!transferWindowOpen(week)||!Array.isArray(appState.freeAgents)||!Array.isArray(appState.worldSquads))return [];
 if(!Array.isArray(appState.aiFreeAgentSignings))appState.aiFreeAgentSignings=[];
 const season=Number(appState.seasonYear)||2026,moved=[];
 for(let ci=0;ci<Math.min(CLUBS.length,appState.worldSquads.length);ci++){
  if(ci===Number(appState.club))continue;
  const club=CLUBS[ci],roster=appState.worldSquads[ci];if(!club||!Array.isArray(roster)||roster.length<18||roster.length>=25)continue;
  if(appState.aiFreeAgentSignings.some(x=>Number(x.clubIndex)===ci&&Number(x.season)===season))continue;
  const needs=aiSquadNeeds(roster),positions=Object.entries(needs).filter(([pos,n])=>n>0).map(([pos])=>pos);if(!positions.length)continue;
  const rng=seededRandom(stableSeed(`ai-free-agent-${season}-${week}-${ci}`));
  const pos=positions.sort((a,b)=>(needs[b]-needs[a])||a.localeCompare(b))[0];
  const strength=Number(club.strength)||58;
  const candidates=appState.freeAgents.map((p,index)=>({p,index})).filter(x=>{
   const p=x.p,rating=Number(p.rating)||0,age=Number(p.age)||25,wage=Number(p.wage)||0;
   return p&&p.name&&aiPosGroup(p)===pos&&age>=17&&age<=34&&rating>=strength-13&&rating<=strength+7&&wage<=Math.max(8,Math.round(strength*.72));
  }).sort((a,b)=>{
   const score=x=>Math.abs((Number(x.p.rating)||0)-(strength-2))*.8+Math.abs((Number(x.p.age)||25)-25)*.22-(Number(x.p.potential)||0)*.025;
   return score(a)-score(b);
  });
  if(!candidates.length)continue;
  const shortlist=candidates.slice(0,Math.min(5,candidates.length)),chosen=shortlist[Math.floor(rng()*shortlist.length)],original=appState.freeAgents[chosen.index];if(!original)continue;
  const careerId=String(original.careerId||original.id||normalisePlayerName(original.name));
  const signed={...original,id:`AI-FA-${season}-${ci}-${String(original.id||careerId)}`,careerId,clubIndex:ci,clubName:club.name,division:clubDivision(club),freeAgent:false,contractEndDate:null,source:'AI free-agent signing',fitness:Number(original.fitness??90),morale:Math.max(55,Number(original.morale??70)),apps:0,minutes:0,goals:0,assists:0};
  ensurePlayerContract(signed,season);roster.push(signed);appState.freeAgents.splice(chosen.index,1);
  appState.aiFreeAgentSignings.push({season,week,clubIndex:ci,clubName:club.name,playerName:signed.name,playerCareerId:careerId,position:pos});
  appState.transferHistory=appState.transferHistory||[];appState.transferHistory.push({type:'ai-free-agent',playerName:signed.name,playerCareerId:careerId,from:'Klubbløs',to:club.name,fee:0,week,seasonYear:season,transferDate:transferDateForGameweek(season,week),calendarPhase:appState.preseasonActive?'preseason':'league',preseasonWeek:appState.preseasonActive?(Number(appState.preseasonWeek)||1):null,transferTypeLabel:'AI-signering på fri overgang',position:pos});
  syncEFLWorldRosterMirror(ci);moved.push({playerName:signed.name,to:club.name,position:pos});
 }
 if(moved.length){appState.log=appState.log||[];appState.log.push(`${moved.length} AI-klubber hentet spillere på fri overgang for å dekke troppshull.`);}
 return moved;
}

// Expiry audit: manager, PL, EFL and European registrations expire exactly once;
// duplicated registry mirrors are removed; loans remain registered.
const expiredPlayer=(id,name)=>({id,careerId:id,name,pos:'MID',rating:60,contractEndDate:'2027-06-30'});
appState.squad=[expiredPlayer('u1','User Expired'),{...expiredPlayer('loan1','Loaned'),loanStatus:'out'}, {id:'u2',careerId:'u2',name:'User Retained',pos:'MID',rating:60,contractEndDate:'2029-06-30'}];
appState.worldSquads[0]=appState.squad.map(p=>({...p}));
appState.worldSquads[1]=[expiredPlayer('pl1','PL Expired'),{...expiredPlayer('plLoan','PL Loan'),loanStatus:'in'}];
appState.worldSquads[2]=[expiredPlayer('efl1','EFL Expired')];
appState.eflPlayerDatabase.Championship['AI Championship']=[expiredPlayer('efl1','EFL Expired'),expiredPlayer('efl2','EFL Only')];
appState.europeanTransferSquads['European FC']=[expiredPlayer('eu1','EU Expired')];
const expired=processExpiredContracts(2026);
assert.deepStrictEqual(new Set(expired),new Set(['User Expired','PL Expired','EFL Expired','EFL Only','EU Expired']));
assert(!appState.squad.some(p=>p.careerId==='u1'));
assert(appState.squad.some(p=>p.careerId==='loan1'));
assert(!appState.worldSquads[1].some(p=>p.careerId==='pl1'));
assert(appState.worldSquads[1].some(p=>p.careerId==='plLoan'));
assert(!appState.eflPlayerDatabase.Championship['AI Championship'].some(p=>['efl1','efl2'].includes(p.careerId)));
assert(appState.freeAgents.length===5,'expired player should enter free-agent pool once');const expiredFreeAgentCount=appState.freeAgents.length;
assert(!appState.europeanTransferSquads['European FC'].length);
// Recruitment test: a PL AI club and an EFL AI club fill different position gaps.
function rosterFor(needsPos){const positions=['GK','GK','DEF','DEF','DEF','DEF','DEF','DEF','DEF','MID','MID','MID','MID','MID','MID','MID','ATT','ATT','ATT','ATT','ATT','ATT'];if(needsPos==='DEF')positions[2]='MID';if(needsPos==='GK')positions[0]='DEF';return positions.map((pos,i)=>({id:`r-${needsPos}-${i}`,careerId:`r-${needsPos}-${i}`,name:`Roster ${needsPos} ${i}`,pos,rating:60,age:25,contractEndDate:'2029-06-30'}));}
appState.worldSquads[1]=rosterFor('GK');
appState.worldSquads[2]=rosterFor('DEF');
appState.freeAgents=[{id:'fa-gk',careerId:'fa-gk',name:'Free Keeper',pos:'GK',rating:61,potential:70,age:24,wage:15,value:1},{id:'fa-def',careerId:'fa-def',name:'Free Defender',pos:'DEF',rating:55,potential:65,age:23,wage:10,value:1}];
const moves=processAIFreeAgentRecruitment(1);
assert.strictEqual(moves.length,2,'one appropriate free-agent signing per AI club');
assert.strictEqual(appState.freeAgents.length,0);
assert(appState.worldSquads[1].some(p=>p.careerId==='fa-gk'));
assert(appState.worldSquads[2].some(p=>p.careerId==='fa-def'));
assert.strictEqual(appState.eflPlayerDatabase.Championship['AI Championship'].length,appState.worldSquads[2].length,'EFL market mirror synchronized');
assert.strictEqual(processAIFreeAgentRecruitment(1).length,0,'same club cannot repeatedly sign in one season');
const source=require('fs').readFileSync(__dirname+'/index.html','utf8');assert(source.includes('const freeAgentMoves=processAIFreeAgentRecruitment(week)'), 'AI transfer pipeline does not call free-agent recruitment');assert(source.includes('syncEFLWorldRosterMirror(seller.i);syncEFLWorldRosterMirror(buyer.i)'), 'domestic AI transfers do not synchronize EFL market mirrors');
console.log(JSON.stringify({expiry:{uniqueExpired:expired.length,freeAgentsCreated:expiredFreeAgentCount,loansPreserved:true,europeanAndEFLClean:true},recruitment:{signings:moves.length,eflMirrorSynced:true,repeatGuard:true},integration:{aiWindowHook:true,eflTransferMirrorHook:true}},null,2));
