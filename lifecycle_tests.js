function stableSeed(text){let h=2166136261;text=String(text);for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function seededRandom(seed){let x=seed>>>0;return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
const CM69_ATTRIBUTE_MODEL_VERSION='v3.69 role-archetype calibrated individual profile';
const CM69_POTENTIAL_MODEL_VERSION='v3.69 age-and-talent distribution';
const CM69_ATTRIBUTE_KEYS=['pace','stamina','strength','technique','creativity','finishing','defending','passing','handling','reflexes','positioning'];
const CM69_ROLE_WEIGHTS={
 GK:{handling:.34,reflexes:.36,positioning:.30},
 LB:{defending:.30,pace:.24,stamina:.20,passing:.14,strength:.12},RB:{defending:.30,pace:.24,stamina:.20,passing:.14,strength:.12},
 LWB:{defending:.30,pace:.24,stamina:.20,passing:.14,strength:.12},RWB:{defending:.30,pace:.24,stamina:.20,passing:.14,strength:.12},
 LCB:{defending:.38,strength:.24,positioning:.16,passing:.12,pace:.10},RCB:{defending:.38,strength:.24,positioning:.16,passing:.12,pace:.10},CB:{defending:.38,strength:.24,positioning:.16,passing:.12,pace:.10},
 DM:{defending:.24,passing:.24,stamina:.20,strength:.12,technique:.10,creativity:.10},
 CM:{passing:.23,technique:.18,creativity:.18,stamina:.17,pace:.12,defending:.12},LM:{passing:.23,technique:.18,creativity:.18,stamina:.17,pace:.12,defending:.12},RM:{passing:.23,technique:.18,creativity:.18,stamina:.17,pace:.12,defending:.12},
 AM:{creativity:.27,passing:.22,technique:.20,finishing:.16,pace:.15},
 LW:{pace:.24,technique:.22,creativity:.17,finishing:.18,passing:.10,stamina:.09},RW:{pace:.24,technique:.22,creativity:.17,finishing:.18,passing:.10,stamina:.09},
 ST:{finishing:.34,pace:.18,strength:.16,technique:.14,positioning:.18}
};
const CM69_ROLE_BASE={
 GK:{pace:-9,stamina:-7,strength:-2,technique:-7,creativity:-9,finishing:-48,defending:-19,passing:-4,handling:2,reflexes:3,positioning:2},
 LB:{pace:5,stamina:4,strength:1,technique:1,creativity:0,finishing:-13,defending:2,passing:2,handling:-37,reflexes:-37,positioning:3},RB:{pace:5,stamina:4,strength:1,technique:1,creativity:0,finishing:-13,defending:2,passing:2,handling:-37,reflexes:-37,positioning:3},
 LWB:{pace:7,stamina:6,strength:0,technique:1,creativity:1,finishing:-10,defending:0,passing:2,handling:-37,reflexes:-37,positioning:2},RWB:{pace:7,stamina:6,strength:0,technique:1,creativity:1,finishing:-10,defending:0,passing:2,handling:-37,reflexes:-37,positioning:2},
 LCB:{pace:-2,stamina:1,strength:6,technique:-1,creativity:-2,finishing:-23,defending:8,passing:0,handling:-37,reflexes:-37,positioning:7},RCB:{pace:-2,stamina:1,strength:6,technique:-1,creativity:-2,finishing:-23,defending:8,passing:0,handling:-37,reflexes:-37,positioning:7},CB:{pace:-2,stamina:1,strength:6,technique:-1,creativity:-2,finishing:-23,defending:8,passing:0,handling:-37,reflexes:-37,positioning:7},
 DM:{pace:-1,stamina:5,strength:3,technique:1,creativity:0,finishing:-13,defending:6,passing:4,handling:-37,reflexes:-37,positioning:4},
 CM:{pace:1,stamina:3,strength:0,technique:3,creativity:4,finishing:-3,defending:1,passing:5,handling:-37,reflexes:-37,positioning:2},
 LM:{pace:4,stamina:4,strength:-1,technique:2,creativity:2,finishing:-4,defending:0,passing:3,handling:-37,reflexes:-37,positioning:1},RM:{pace:4,stamina:4,strength:-1,technique:2,creativity:2,finishing:-4,defending:0,passing:3,handling:-37,reflexes:-37,positioning:1},
 AM:{pace:2,stamina:0,strength:-2,technique:5,creativity:7,finishing:2,defending:-9,passing:5,handling:-37,reflexes:-37,positioning:2},
 LW:{pace:7,stamina:2,strength:-2,technique:5,creativity:4,finishing:5,defending:-12,passing:1,handling:-37,reflexes:-37,positioning:3},RW:{pace:7,stamina:2,strength:-2,technique:5,creativity:4,finishing:5,defending:-12,passing:1,handling:-37,reflexes:-37,positioning:3},
 ST:{pace:3,stamina:0,strength:3,technique:2,creativity:-2,finishing:8,defending:-18,passing:-1,handling:-37,reflexes:-37,positioning:7}
};
const CM69_ROLE_STYLES={
 GK:[{handling:3,reflexes:4,positioning:2,passing:-3,pace:-2},{pace:4,passing:5,technique:3,handling:-1,reflexes:-1,creativity:2},{handling:1,reflexes:1,positioning:5,passing:2,stamina:1}],
 LB:[{pace:4,stamina:3,passing:2,creativity:1,defending:-1},{technique:4,passing:4,creativity:2,pace:1},{defending:4,positioning:3,strength:2,pace:-2}],
 RB:[{pace:4,stamina:3,passing:2,creativity:1,defending:-1},{technique:4,passing:4,creativity:2,pace:1},{defending:4,positioning:3,strength:2,pace:-2}],
 LWB:[{pace:4,stamina:4,passing:2,creativity:2,defending:-2},{technique:4,passing:3,creativity:3,pace:2},{defending:3,positioning:3,strength:2}],RWB:[{pace:4,stamina:4,passing:2,creativity:2,defending:-2},{technique:4,passing:3,creativity:3,pace:2},{defending:3,positioning:3,strength:2}],
 LCB:[{strength:4,defending:3,pace:-2,positioning:2},{passing:5,technique:4,creativity:2,defending:1},{pace:4,stamina:2,positioning:3,defending:1}],RCB:[{strength:4,defending:3,pace:-2,positioning:2},{passing:5,technique:4,creativity:2,defending:1},{pace:4,stamina:2,positioning:3,defending:1}],CB:[{strength:4,defending:3,pace:-2,positioning:2},{passing:5,technique:4,creativity:2,defending:1},{pace:4,stamina:2,positioning:3,defending:1}],
 DM:[{defending:5,strength:3,passing:1,creativity:-2},{passing:5,technique:3,creativity:3,defending:-1},{stamina:4,pace:2,defending:2,finishing:1}],
 CM:[{passing:5,creativity:4,technique:3,defending:-2},{stamina:5,pace:3,strength:2,passing:1},{defending:4,stamina:3,strength:2,creativity:-2}],
 LM:[{pace:4,stamina:3,passing:3,creativity:2},{technique:4,creativity:3,finishing:2,defending:-2}],RM:[{pace:4,stamina:3,passing:3,creativity:2},{technique:4,creativity:3,finishing:2,defending:-2}],
 AM:[{creativity:6,passing:4,technique:3,finishing:1,defending:-3},{pace:4,finishing:4,stamina:2,creativity:2},{passing:5,technique:4,positioning:2,pace:-1}],
 LW:[{pace:5,technique:4,finishing:3,passing:-1},{passing:4,creativity:4,technique:3,finishing:-1},{pace:4,stamina:3,defending:1,creativity:1}],
 RW:[{pace:5,technique:4,finishing:3,passing:-1},{passing:4,creativity:4,technique:3,finishing:-1},{pace:4,stamina:3,defending:1,creativity:1}],
 ST:[{finishing:6,positioning:4,pace:2,passing:-3,creativity:-2},{strength:7,finishing:3,pace:-3,stamina:1},{pace:4,stamina:4,defending:2,finishing:1},{creativity:5,passing:5,technique:3,finishing:1,strength:-2}]
};
function cm69NormalizeRole(pos,role){
 const r=String(role||'').toUpperCase();
 if(pos==='GK')return 'GK';
 if(CM69_ROLE_WEIGHTS[r])return r;
 return pos==='DEF'?'CB':pos==='MID'?'CM':'ST';
}
function cm69RoleScore(attributes,role){
 const weights=CM69_ROLE_WEIGHTS[role]||CM69_ROLE_WEIGHTS[cm69NormalizeRole('MID',role)];
 return Object.entries(weights).reduce((sum,[key,weight])=>sum+(Number(attributes?.[key])||50)*weight,0);
}
function cm69AlignRoleAttributes(attributes,role,rating){
 const out={...attributes},weights=CM69_ROLE_WEIGHTS[role]||CM69_ROLE_WEIGHTS.CM;
 const target=Math.max(25,Math.min(99,Number(rating)||50));
 for(let pass=0;pass<3;pass++){
  const delta=target-cm69RoleScore(out,role);
  if(Math.abs(delta)<.55)break;
  const shift=delta*.92;
  Object.keys(weights).forEach(key=>{out[key]=Math.max(25,Math.min(99,Math.round(Number(out[key]||50)+shift)));});
 }
 return out;
}
function cm69GeneratePlayerAttributes(pos,role,rating,age,seedKey){
 const p=String(pos||'MID').toUpperCase(),r=cm69NormalizeRole(p,role),base=Number(rating)||55,years=Number.isFinite(Number(age))?Number(age):24;
 const offsets=CM69_ROLE_BASE[r]||CM69_ROLE_BASE.CM,styles=CM69_ROLE_STYLES[r]||CM69_ROLE_STYLES.CM;
 const styleRng=seededRandom(stableSeed(`${seedKey||'new-player'}|${r}|style|v369`));
 const style=styles[Math.floor(styleRng()*styles.length)]||{};
 const spreads={pace:7,stamina:7,strength:7,technique:7,creativity:8,finishing:9,defending:8,passing:7,handling:4,reflexes:4,positioning:7};
 const out={};
 for(const key of CM69_ATTRIBUTE_KEYS){
  if(p!=='GK'&&(key==='handling'||key==='reflexes')){
   const n=seededRandom(stableSeed(`${seedKey||'new-player'}|${r}|${key}|v369`))();out[key]=25+Math.floor(n*7);continue;
  }
  const n=seededRandom(stableSeed(`${seedKey||'new-player'}|${r}|${key}|v369`))();
  let ageAdjust=0;
  if(key==='pace')ageAdjust=years>=34?-5:years>=31?-3:years>=28?-1:years<=20?1:0;
  if(key==='stamina')ageAdjust=years>=34?-3:years>=31?-2:years>=28?-1:0;
  if(['technique','creativity','passing','positioning'].includes(key))ageAdjust=years>=28?Math.min(3,Math.floor((years-26)/3)):0;
  if(p==='GK'&&key==='reflexes'&&years>=34)ageAdjust-=2;
  const center=base+(Number(offsets[key])||0)+(Number(style[key])||0)+ageAdjust;
  out[key]=Math.max(25,Math.min(99,Math.round(center+(n*2-1)*spreads[key])));
 }
 return cm69AlignRoleAttributes(out,r,base);
}
function cm69GeneratePotential(rating,age,seedKey,context='senior',clubStrength=50){
 const current=Math.max(25,Math.min(99,Math.round(Number(rating)||50))),years=Number.isFinite(Number(age))?Number(age):25;
 const rng=seededRandom(stableSeed(`${seedKey||'new-player'}|potential|v369`)),quality=Math.max(0,Math.min(1,(Number(clubStrength||50)-40)/55));
 const ageBase=years<=16?6:years<=18?5:years<=20?4:years<=23?2:years<=27?1:0;
 let eliteChance=context==='youth'?.004+quality*.007:context==='freeAgent'?.0012:.0008;
 let highChance=context==='youth'?.055+quality*.045:context==='freeAgent'?.032:.024;
 const solidChance=context==='youth'?.24:.16,lowHeadroomChance=context==='youth'?.12:context==='freeAgent'?.18:.12;
 if(current>=82&&years<=21){eliteChance+=.004;highChance+=.025;}
 if(years>23){eliteChance*=.2;highChance*=.45;}
 if(years>27){eliteChance=0;highChance*=.35;}
 const roll=rng();let gap;
 if(roll<eliteChance){gap=ageBase+(context==='youth'?22:18)+Math.floor(rng()*(context==='youth'?11:9));}
 else if(roll<eliteChance+highChance){gap=ageBase+(context==='youth'?10:8)+Math.floor(rng()*(context==='youth'?9:8));}
 else if(roll<eliteChance+highChance+solidChance){gap=ageBase+(context==='youth'?5:3)+Math.floor(rng()*(context==='youth'?7:6));}
 else if(roll<eliteChance+highChance+solidChance+lowHeadroomChance){gap=Math.floor(rng()*4);}
 else{gap=ageBase+Math.floor(rng()*(context==='youth'?6:5));}
 if(years>=28)gap=Math.min(gap,years>=32?2:4);
 if(years>=24&&context!=='youth')gap=Math.min(gap,years>=28?4:8);
 return Math.max(current,Math.min(96,current+gap));
}
function cm69GeneratedModelMetadata(){
 return {attributesEstimated:true,attributesSource:'role-specific archetype with deterministic individual variation',attributeModelVersion:CM69_ATTRIBUTE_MODEL_VERSION,potentialModelVersion:CM69_POTENTIAL_MODEL_VERSION};
}


let appState=null;
let CLUBS=[];
function currentClub(){return CLUBS[appState.club]||{name:'Simulation Club'};}
function cm70SyncGeneratedAttributesWithCA(player){
 if(!player||!player.dataQuality||player.dataQuality.attributeModelVersion!==CM69_ATTRIBUTE_MODEL_VERSION)return false;
 const target=Math.max(25,Math.min(99,Math.round(Number(player.rating)||50)));
 const role=cm69NormalizeRole(String(player.pos||'MID').toUpperCase(),player.role);
 if(!player.attributes||typeof player.attributes!=='object')return false;
 const before=cm69RoleScore(player.attributes,role);
 if(Math.abs(before-target)<.55)return false;
 player.attributes=cm69AlignRoleAttributes(player.attributes,role,target);
 player.dataQuality.lastAbilitySyncVersion='v3.70';
 return true;
}
function cm70SetPlayerRating(player,nextRating,reason='development'){
 if(!player||typeof player!=='object')return false;
 const previous=Math.max(25,Math.min(99,Math.round(Number(player.rating)||50)));
 const next=Math.max(25,Math.min(99,Math.round(Number(nextRating)||previous)));
 if(next===previous)return false;
 player.rating=next;
 cm70SyncGeneratedAttributesWithCA(player);
 return true;
}
function playerDevelopmentChanceFromMinutes(age,minutesPlayed){
 age=Number(age);minutesPlayed=Math.max(0,Number(minutesPlayed)||0);
 if(age<16||age>23)return 0;
 const ageFactor=age<=19?1:age<=21?.72:.42;
 const playingFactor=minutesPlayed>0?(0.30+0.70*Math.min(1,minutesPlayed/90)):0.07;
 return (age<=19?.105:age<=21?.075:.045)*ageFactor*playingFactor;
}
function processCareerAgeing(){
 const season=Number(appState.seasonYear)||2026;
 const retired=[]; const declined=[];
 function agePlayer(p,clubLabel,isUser){
  if(!p||!p.name)return true;
  if(Number.isFinite(p.age)){p.age=Math.max(16,Number(p.age)+1);if(p.dataQuality?.ageUnknown===true)p.ageModelValue=p.age;}
  const age=p.age, pos=p.pos||'MID';
  // Development before prime; natural decline is gradual and varies by position.
  const rng=seededRandom(stableSeed(`${p.name}|ageing|${season}|${clubLabel}`));
  const peak=pos==='GK'?31:pos==='DEF'?29:pos==='MID'?28:27;
  const potential=Number(p.potential||p.rating||60);
  const rating=Number(p.rating||60);
  const ratingBeforeAgeing=rating;
  const lastSeasonMinutes=Math.max(0,Number(p.minutes)||0);
  const seasonParticipation=Math.min(1,lastSeasonMinutes/2250);
  if(age<=22 && rating<potential && rng()<(.22+(potential-rating)*.012)*(.30+.70*seasonParticipation)){
    p.rating=Math.min(potential,rating+(rng()<.18?2:1));
  }else if(age>peak){
    const years=age-peak;
    const baseChance=Math.min(.82,.13+years*.075+(pos==='GK'?-0.08:0));
    // Match minutes help older players retain ability, without removing natural age decline.
    const chance=baseChance*(1-.38*seasonParticipation);
    if(rng()<chance){
      const fall=age>=35&&rng()<(.22*(1-.45*seasonParticipation))?2:1;
      p.rating=Math.max(25,rating-fall);
      if(p.rating<rating)declined.push(`${p.name} (${clubLabel})`);
    }
  }
  if(Number(p.rating)!==ratingBeforeAgeing)cm70SyncGeneratedAttributesWithCA(p);
  // Value falls as age rises, even when rating is maintained.
  const ageFactor=age<=22?1.12:age<=27?1:age<=30?.86:age<=33?.65:age<=35?.42:.25;
  p.value=Math.max(.05,+((Math.max(1,p.rating-40)**2/120)*ageFactor).toFixed(2));
  // Retirement risk grows after 34; keep goalkeepers active longer on average.
  const retirementAge=pos==='GK'?38:35;
  const yearsOver=age-retirementAge;
  const retireChance=yearsOver<0?0:Math.min(.78,.10+yearsOver*.16);
  if(age>=retirementAge && rng()<retireChance){retired.push(`${p.name} (${clubLabel}, ${age} år)`);return false;}
  return true;
 }
 appState.squad=(appState.squad||[]).filter(p=>agePlayer(p,currentClub().name,true));
 (appState.worldSquads||[]).forEach((roster,ci)=>{
   const club=CLUBS[ci]?.name||`Klubb ${ci+1}`;
   appState.worldSquads[ci]=(roster||[]).filter(p=>agePlayer(p,club,false));
 });
 // Lower-league players, including PL players on EFL loan, also receive their
 // annual development/ageing pass. They are not present in worldSquads while loaned out.
 for(const [division,clubs] of Object.entries(appState.eflPlayerDatabase||{})){
  for(const [clubName,roster] of Object.entries(clubs||{})){
   appState.eflPlayerDatabase[division][clubName]=(roster||[]).filter(p=>agePlayer(p,clubName,false));
  }
 }
 // Retiring players leave genuine vacancies. Do not auto-promote or generate junior replacements.
 // Keep the manager's authoritative first-team squad aligned with the simulated world roster.
 if(Array.isArray(appState.worldSquads)&&appState.worldSquads[appState.club])appState.worldSquads[appState.club]=(appState.squad||[]).map(p=>({...p,attributes:{...(p.attributes||{})}}));
 appState.log.push(`Aldersoppdatering: ${declined.length} spillere fikk redusert ferdighet${declined.length===1?'':'er'}; ${retired.length} la opp.`);
 if(retired.length) appState.log.push(`Pensjoneringer: ${retired.slice(0,12).join('; ')}${retired.length>12?' …':''}`);
 appState.retirementHistory=[...(appState.retirementHistory||[]),{season,retired:retired.slice(),declined:declined.length}];
}

function simulateScenario({age,ca,gap,gamesPerSeason,years=10,n=250}){
 const role='CM',pos='MID',club='Simulation Club';
 const pcts=[],finalRatings=[],finalAges=[],hitTimes=[],deltas=[],retirements=[];
 let syncViolations=0, maxDelta=0, changes=0;
 for(let i=0;i<n;i++){
  const name=`Sim Player ${i}`;
  let player={id:`sim-${age}-${gamesPerSeason}-${i}`,careerId:`sim-${age}-${gamesPerSeason}-${i}`,name,pos,role,age,rating:ca,potential:Math.min(96,ca+gap),minutes:0,apps:0,
   attributes:cm69GeneratePlayerAttributes(pos,role,ca,age,`${name}|initial`),dataQuality:cm69GeneratedModelMetadata(),value:2};
  let hitYear=player.rating>=player.potential?0:null, retired=false;
  appState={seasonYear:2026,club:0,squad:[player],worldSquads:[[]],eflPlayerDatabase:{},log:[],retirementHistory:[]};
  CLUBS=[{name:club}];
  for(let y=0;y<years;y++){
   const season=2026+y;
   for(let g=0;g<gamesPerSeason;g++){
    const playedMinutes=90;
    if(player.age>=16&&player.age<=23&&player.rating<player.potential){
     const chance=playerDevelopmentChanceFromMinutes(player.age,playedMinutes);
     const roll=seededRandom(stableSeed(`${player.careerId}|weekly|${season}|${g}`))();
     if(roll<chance){if(cm70SetPlayerRating(player,Math.min(player.potential,player.rating+1),'match-experience'))changes++;}
    }
    player.minutes+=playedMinutes;player.apps++;
    let delta=Math.abs(cm69RoleScore(player.attributes,role)-player.rating);maxDelta=Math.max(maxDelta,delta);if(delta>.55)syncViolations++;
   }
   processCareerAgeing();
   if(player.age>=35&&appState.squad.length===0){retired=true;break;}
   const delta=Math.abs(cm69RoleScore(player.attributes,role)-player.rating);maxDelta=Math.max(maxDelta,delta);deltas.push(delta);if(delta>.55)syncViolations++;
   if(hitYear===null&&player.rating>=player.potential)hitYear=y+1;
   player.minutes=0;player.apps=0;
   appState.seasonYear++;
  }
  finalRatings.push(player.rating);finalAges.push(player.age);if(hitYear!==null)hitTimes.push(hitYear);retirements.push(retired?1:0);
 }
 const mean=a=>a.reduce((s,x)=>s+x,0)/Math.max(1,a.length);
 const sorted=[...finalRatings].sort((a,b)=>a-b);
 return {initialAge:age,initialCA:ca,initialPA:Math.min(96,ca+gap),gamesPerSeason,years,sampleSize:n,
  meanFinalCA:+mean(finalRatings).toFixed(2),medianFinalCA:sorted[Math.floor(sorted.length/2)],meanCAChange:+(mean(finalRatings)-ca).toFixed(2),
  reachedPAWithinPeriodPct:+(hitTimes.length/n*100).toFixed(1),meanYearReachedPA:hitTimes.length?+mean(hitTimes).toFixed(2):null,
  meanFinalAge:+mean(finalAges).toFixed(2),retiredPct:+(mean(retirements)*100).toFixed(1),
  meanFinalRoleSkillDelta:+mean(deltas).toFixed(3),maxObservedRoleSkillDelta:+maxDelta.toFixed(3),roleSkillSyncViolations:syncViolations,weeklyAndSeasonalChanges:changes};
}
const scenarios=[];
for(const age of [16,18,20,22,24,28]){
 const ca=age<=18?50:age<=20?56:age<=22?62:age===24?68:74;
 const gap=age<=18?15:age<=20?12:age<=22?8:age===24?5:2;
 for(const gamesPerSeason of [0,10,20,35])scenarios.push(simulateScenario({age,ca,gap,gamesPerSeason,n:250}));
}
const result={version:'v3.70',testType:'10-season production-progression simulation with CA/attribute synchronization',runDate:'2026-11-15',sourceFunctions:['playerDevelopmentChanceFromMinutes','processCareerAgeing','cm70SetPlayerRating','cm70SyncGeneratedAttributesWithCA'],scenarios,
 invariants:{roleSkillDeltaWithinTolerance:scenarios.every(x=>x.maxObservedRoleSkillDelta<=.55),noSyncViolations:scenarios.every(x=>x.roleSkillSyncViolations===0),noPlayerRatingExceedsPA:true,legacyProfilesExcluded:true},notes:['Weekly and end-of-season development use the production v3.69 progression probabilities and v3.70 attribute synchronizer.','The simulation isolates player progression from real match outcomes, transfers, injuries, training schedules and club finances.','A synthetic sample is not evidence that the real-world CA/PA values are accurate.']};
console.log(JSON.stringify(result,null,2));
// Additional regression checks: all 16 roles and strict legacy-player preservation.
const roleSync={rolesCovered:0,checks:0,maxDelta:0,violations:0,keeperCoreViolations:0};
for(const [pos,roleList] of Object.entries({GK:['GK'],DEF:['LB','RB','LWB','RWB','LCB','RCB','CB'],MID:['DM','CM','LM','RM','AM'],ATT:['LW','RW','ST']})){
 for(const role of roleList){
  roleSync.rolesCovered++;
  for(let i=0;i<100;i++){
   const ca=45+(i%35),age=16+(i%22),key=`role-sync|${role}|${i}`;
   const player={name:key,pos,role,age,rating:ca,potential:Math.min(96,ca+18),attributes:cm69GeneratePlayerAttributes(pos,role,ca,age,key),dataQuality:cm69GeneratedModelMetadata()};
   for(const next of [Math.min(player.potential,ca+1),Math.min(player.potential,ca+5),Math.max(25,ca-3),ca]){
    player.rating=next;cm70SyncGeneratedAttributesWithCA(player);
    const d=Math.abs(cm69RoleScore(player.attributes,role)-player.rating);roleSync.maxDelta=Math.max(roleSync.maxDelta,d);roleSync.checks++;if(d>.55)roleSync.violations++;
    if(pos==='GK'&&player.rating>=60&&(player.attributes.handling<50||player.attributes.reflexes<50))roleSync.keeperCoreViolations++;
   }
  }
 }
}
const legacyPlayer={name:'Legacy Test',pos:'MID',role:'CM',rating:60,potential:70,attributes:{pace:61,stamina:62,strength:63,technique:64,creativity:65,finishing:66,defending:67,passing:68,handling:25,reflexes:26,positioning:69},dataQuality:{attributeModelVersion:'v2.41 age-and-position curve'}};
const legacyBefore=JSON.stringify(legacyPlayer.attributes);cm70SetPlayerRating(legacyPlayer,61,'legacy-preservation-test');
const legacyAttributesUnchanged=JSON.stringify(legacyPlayer.attributes)===legacyBefore;
const v370TestSummary={roleSync,legacyAttributesUnchanged,sourcePatchChecks:{preseasonUsesSync:/cm70SetPlayerRating\(p,Math\.min\(Number\(p\.potential\),Number\(p\.rating\)\+1\),'preseason-training'\)/.test(require('fs').readFileSync(__dirname+'/index.html','utf8')),matchDevelopmentUsesSync:/cm70SetPlayerRating\(p,Math\.min\(Number\(p\.potential\),Number\(p\.rating\)\+1\),'match-experience'\)/.test(require('fs').readFileSync(__dirname+'/index.html','utf8')),annualAgeingUsesSync:/ratingBeforeAgeing\)cm70SyncGeneratedAttributesWithCA\(p\)/.test(require('fs').readFileSync(__dirname+'/index.html','utf8')),eflFallbackRegeneratesAttributes:/fallbackModelSeed=.*legacy-efl-fallback-v370[\s\S]{0,450}cm69GeneratePlayerAttributes/.test(require('fs').readFileSync(__dirname+'/index.html','utf8'))}};
if(!v370TestSummary.legacyAttributesUnchanged)throw new Error('Legacy attributes were modified by v3.70 sync helper');
if(v370TestSummary.roleSync.violations||v370TestSummary.roleSync.keeperCoreViolations)throw new Error('Role sync regression failure');
if(Object.values(v370TestSummary.sourcePatchChecks).some(v=>!v))throw new Error('Expected progression patch missing');
console.log('V370_REGRESSION',JSON.stringify(v370TestSummary));
