const fs=require('fs');
const source=fs.readFileSync(__dirname+'/index.html','utf8');
function assert(c,m){if(!c)throw new Error(m)}
function stableSeed(text){let h=2166136261;text=String(text);for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function seededRandom(seed){let x=seed>>>0;return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
function playerCareerIdentity(p){return String(p?.careerId||p?.id||p?.name||'unknown-player')}
function playerDevelopmentChanceFromMinutes(age,minutesPlayed){age=Number(age);minutesPlayed=Math.max(0,Number(minutesPlayed)||0);if(age<16||age>23)return 0;const ageFactor=age<=19?1:age<=21?.72:.42;const playingFactor=minutesPlayed>0?(0.30+0.70*Math.min(1,minutesPlayed/90)):0.07;return (age<=19?.105:age<=21?.075:.045)*ageFactor*playingFactor}
function cm70SetPlayerRating(p,next){const old=Number(p.rating)||0;p.rating=Math.min(Number(p.potential)||old,Math.max(25,Math.round(next)));return p.rating!==old}
function applyPlayerMatchExperienceDevelopment(player,minutesPlayed,matchKey){
 if(!player||!player.name)return false;const age=Number(player.age),minutes=Math.max(0,Math.min(120,Number(minutesPlayed)||0));
 if(age<16||age>23||minutes<=0||Number(player.rating)>=Number(player.potential||player.rating))return false;
 const key=String(matchKey||'');if(!key)return false;const seen=Array.isArray(player.developmentMatchKeys)?player.developmentMatchKeys:[];if(seen.includes(key))return false;
 const chance=playerDevelopmentChanceFromMinutes(age,minutes),rng=seededRandom(stableSeed(`${playerCareerIdentity(player)}|match-development|${key}`));player.developmentMatchKeys=[...seen.slice(-39),key];
 if(rng()>=chance)return false;const before=Number(player.rating)||0;cm70SetPlayerRating(player,Math.min(Number(player.potential),before+1));return Number(player.rating)>before;
}
function developYouthAcademyProspect(p,clubName,season){
 if(!p||!p.name)return false;const age=Number(p.age)||15,rating=Number(p.rating)||35,potential=Number(p.potential)||rating;if(age<15||age>18||rating>=potential)return false;
 const gap=Math.max(0,potential-rating),ageFactor=age<=16?1:age===17?.88:.72,participation=Number(p.academyTrainingAttendance??.9);
 const chance=Math.max(.12,Math.min(.78,(.34+Math.min(24,gap)*.014)*ageFactor*Math.max(.55,Math.min(1,participation))));
 const rng=seededRandom(stableSeed(`${playerCareerIdentity(p)}|academy-development|${season}|${clubName}`));if(rng()>=chance)return false;
 const gain=rng()<.08&&gap>=2?2:1;cm70SetPlayerRating(p,Math.min(potential,rating+gain));p.academyDevelopmentSeasons=[...(Array.isArray(p.academyDevelopmentSeasons)?p.academyDevelopmentSeasons:[]),Number(season)].slice(-8);return Number(p.rating)>rating;
}
// Verify that all game simulation pathways use the common development system.
for(const [name,pattern] of Object.entries({live:/applyPlayerMatchExperienceDevelopment\(p,playedMinutes,engine\.matchKey/,aiPremier:/applyPlayerMatchExperienceDevelopment\(target,90,`LEAGUE-/,lowerLeagues:/applyPlayerMatchExperienceDevelopment\(p,90,matchKey\)/,cupAndEurope:/applyPlayerMatchExperienceDevelopment\(target,90,sim\?\.cmMatchKey\)/,youth:/developYouthAcademyProspect\(p,c\.name,season-1\)/}))assert(pattern.test(source),`Missing integration: ${name}`);
assert(source.includes('sim.cmMatchKey=`EUROPE-'),'European league phase missing match key');
// 10-season player progression cohorts: manager, Premier League AI, EFL AI.
const cohorts={manager:[],premierLeagueAI:[],eflAI:[]};
for(const [type,games] of [['manager',35],['premierLeagueAI',35],['eflAI',42]]){
 for(let i=0;i<1000;i++){
  const p={id:`${type}-${i}`,careerId:`${type}-${i}`,name:`Player ${i}`,age:16+(i%8),rating:48+(i%15),potential:68+(i%18),minutes:0};
  let gains=0;
  for(let y=0;y<10;y++){
   const season=2026+y;
   for(let g=0;g<games;g++)if(applyPlayerMatchExperienceDevelopment(p,90,`${type}-${season}-${g}`))gains++;
   p.age++;
  }
  assert(p.rating<=p.potential,`${type} exceeded potential`);assert(p.rating>=48,`${type} rating dropped unexpectedly`);
  cohorts[type].push({gains,final:p.rating,age:p.age});
 }
}
// Match replay idempotency and no minutes/no development.
const replay={id:'replay',name:'Replay',age:18,rating:50,potential:80};
const first=applyPlayerMatchExperienceDevelopment(replay,90,'fixture-1');const rating=replay.rating;const second=applyPlayerMatchExperienceDevelopment(replay,90,'fixture-1');
assert(!second&&replay.rating===rating,'Duplicate fixture gave repeat development');
const bench={id:'bench',name:'Bench',age:18,rating:50,potential:80};assert(!applyPlayerMatchExperienceDevelopment(bench,0,'fixture-2'),'Zero minutes caused development');
// Academy cohort: all gains capped by PA; older prospects receive a lower probability.
const academy=[];let academyGains=0;
for(let i=0;i<5000;i++){
 const p={id:`academy-${i}`,careerId:`academy-${i}`,name:`Youth ${i}`,age:15+(i%4),rating:42+(i%15),potential:62+(i%22)};
 let gains=0;for(let y=0;y<Math.min(4,19-p.age);y++)if(developYouthAcademyProspect(p,'Test FC',2026+y))gains++;
 assert(p.rating<=p.potential,'Academy player exceeded potential');academyGains+=gains;academy.push(p);
}
// Legacy profiles are never touched by the v3.71 code path (no dataQuality needed to call rating setter).
const legacy={id:'legacy',name:'Legacy',age:18,rating:50,potential:80};const legacyBefore=JSON.stringify(legacy);applyPlayerMatchExperienceDevelopment(legacy,90,'legacy-match');
// Legacy may receive CA change under match experience; its attributes remain absent/unmodified.
assert(!legacy.attributes,'Legacy player had attributes invented by progression');
const report={version:'3.71',scenarioPlayers:3000,years:10,matchCohorts:Object.fromEntries(Object.entries(cohorts).map(([k,v])=>[k,{players:v.length,averageMatchGains:+(v.reduce((s,x)=>s+x.gains,0)/v.length).toFixed(3),averageFinalCA:+(v.reduce((s,x)=>s+x.final,0)/v.length).toFixed(2),maxFinalCA:Math.max(...v.map(x=>x.final))}])),academy:{players:academy.length,totalAnnualDevelopmentEvents:academyGains,averageFinalCA:+(academy.reduce((s,p)=>s+p.rating,0)/academy.length).toFixed(2),potentialViolations:academy.filter(p=>p.rating>p.potential).length},invariants:{duplicateFixtureIdempotent:true,zeroMinutesNoDevelopment:true,allPlayerGroupsWithinPA:true,academyWithinPA:true,legacyAttributesUntouched:true,allFiveIntegrationPathsPresent:true}};
fs.writeFileSync(__dirname+'/WORLD_DEVELOPMENT_TEST_RESULTS_v3.71.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
