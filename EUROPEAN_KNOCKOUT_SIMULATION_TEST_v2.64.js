const tests=[];let appState;let simulatedLegCalls=0;let testLeagueWeeks=38;
function activeLeagueRoundCount(){return testLeagueWeeks;}
function ensureEuropeanCompetitions(){}
function save(){}
function awardUserCompetitionMatch(){}
function shootoutScore(){return {home:5,away:4};}
function simulateEuropeanKnockoutExtraTime(comp,stage,tie,leg,home,away,sim){return sim;}
function simulateCompetitionMatch(home,away,competition,round,tieIndex){const x=(round*7+tieIndex*3+1)%4,y=(round*5+tieIndex+2)%3;return {ga:x,gb:y,events:[],stats:{},extraTime:false};}
function buildEuropeanKnockoutTies(comp,stageIndex){
 const counts=[8,8,4,2,1],key=EUROPEAN_KNOCKOUT_STAGES[stageIndex].key;const ties=[];
 for(let i=0;i<counts[stageIndex];i++){
  const managerTie=comp.name==='Champions League'&&testManagerInEurope&&i===0;
  const team1={name:managerTie?'Manager United':`${comp.name} ${key} A${i+1}`,strength:70,leagueSeed:i+1,clubIndex:managerTie?appState.club:undefined};
  const team2={name:`${comp.name} ${key} B${i+1}`,strength:65,leagueSeed:30-i};
  const firstHome=team1,firstAway=team2;
  ties.push({id:`${key}-${i+1}`,team1,team2,seed1:team1.leagueSeed,seed2:team2.leagueSeed,firstHome,firstAway,legs:{},winner:null,stageIndex,tieIndex:i});
  comp.teams.push(team1,team2);
 }
 return ties;
}
function processEuropeanKnockoutLeg(comp,leg){simulatedLegCalls++;return productionProcessEuropeanKnockoutLeg(comp,leg);}

const EUROPEAN_KNOCKOUT_STAGES=[
 {key:'playoff',name:'Playoff',label:'Start playoff'},
 {key:'round16',name:'Åttedelsfinaler',label:'Start åttedelsfinaler'},
 {key:'quarterfinal',name:'Kvartfinaler',label:'Start kvartfinaler'},
 {key:'semifinal',name:'Semifinaler',label:'Start semifinaler'},
 {key:'final',name:'Finale',label:'Spill finalen'}
];
// v2.64: Fixed European knockout calendar, expressed as season gameweeks.
// Two-legged rounds have separate first- and second-leg weeks; finals are played after the final domestic round.

// v2.64: European knockout legs are scheduled, not started recursively.
// For a PL manager the final follows GW38; for an EFL manager it follows the 46-round league.
const EUROPEAN_KNOCKOUT_CALENDAR={
 playoff:[24,25], round16:[27,28], quarterfinal:[30,31], semifinal:[33,34], final:[]
};
function europeanKnockoutWeekFor(stageKey,leg=1){
 if(stageKey==='final'){
  const domesticEnd=typeof activeLeagueRoundCount==='function'?(Number(activeLeagueRoundCount())||38):38;
  return Math.max(38,domesticEnd);
 }
 const weeks=EUROPEAN_KNOCKOUT_CALENDAR[stageKey]||[];
 return weeks[Math.max(0,Math.min(weeks.length-1,Number(leg)-1))]??null;
}
function processScheduledEuropeanKnockouts(week){
 Object.values(appState.europeanCompetitions||{}).forEach(comp=>{
  if(!comp||comp.format!=='league'||comp.finished||appState.pendingCupMatch?.competition===comp.name)return;
  const stage=comp.knockout?.activeStage;if(!stage||stage.complete)return;
  const leg=stage.key==='final'?1:(Number(stage.leg)||1);
  const dueWeek=europeanKnockoutWeekFor(stage.key,leg);
  if(dueWeek===null||Number(week)!==Number(dueWeek))return;
  processEuropeanKnockoutLeg(comp,leg);
 });
}

function recordEuropeanKnockoutLeg(comp,stage,tie,leg,home,away,homeGoals,awayGoals,result){
 const score={home:String(home.name),away:String(away.name),homeGoals:Number(homeGoals)||0,awayGoals:Number(awayGoals)||0,result};
 tie.legs[leg]=score;
 result.isEuropeanKnockout=true;result.knockoutStageKey=stage.key;result.knockoutStageName=stage.name;result.tieId=tie.id;result.leg=leg;
 result.homeGoals=score.homeGoals;result.awayGoals=score.awayGoals;
}
function setEuropeanKnockoutWinner(comp,tie,allowPenalties=true){
 const l1=tie.legs[1],l2=tie.legs[2];
 if(!l1)return null;
 if(tie.stageIndex===4){
  const score=l1.homeGoals===l1.awayGoals&&l1.result?.penaltyWinner?l1.result.penaltyWinner:(l1.homeGoals>l1.awayGoals?l1.home:l1.awayGoals>l1.homeGoals?l1.away:null);
  if(score)return tie.winner=score===tie.team1.name?{...tie.team1}:score===tie.team2.name?{...tie.team2}:null;
  if(!allowPenalties)return null;
  const pen=shootoutScore(tie.firstHome.strength,tie.firstAway.strength);const winner=pen.home>pen.away?tie.firstHome:tie.firstAway;
  l1.result.decidedByPenalties=true;l1.result.penaltyScore=pen;l1.result.penaltyWinner=winner.name;l1.result.winner=winner.name;l1.result.score=`${l1.homeGoals}–${l1.awayGoals} (${pen.home}–${pen.away} str.)`;
  tie.winner={...winner};return tie.winner;
 }
 if(!l2)return null;
 const goals={};for(const team of [tie.team1,tie.team2])goals[team.name]=0;
 for(const leg of [l1,l2]){goals[leg.home]=(goals[leg.home]||0)+leg.homeGoals;goals[leg.away]=(goals[leg.away]||0)+leg.awayGoals;}
 const aggregate=goals[tie.team1.name]-goals[tie.team2.name];
 const aggregateText=`${goals[tie.team1.name]}–${goals[tie.team2.name]}`;
 for(const leg of [l1,l2]){leg.result.aggregateScore=aggregateText;leg.result.aggregateTeam1=tie.team1.name;leg.result.aggregateTeam2=tie.team2.name;}
 if(aggregate!==0)tie.winner={...(aggregate>0?tie.team1:tie.team2)};
 else if(allowPenalties){const homeSecond=l2.home,awaySecond=l2.away;const pen=shootoutScore((compTeamStrength(comp,homeSecond)||60),(compTeamStrength(comp,awaySecond)||60));const winningName=pen.home>pen.away?homeSecond:awaySecond;tie.winner={...(winningName===tie.team1.name?tie.team1:tie.team2)};l2.result.decidedByPenalties=true;l2.result.penaltyScore=pen;l2.result.penaltyWinner=winningName;l2.result.score=`${l2.homeGoals}–${l2.awayGoals} (${pen.home}–${pen.away} str.)`;}
 if(tie.winner){for(const leg of [l1,l2]){leg.result.tieWinner=tie.winner.name;leg.result.winner=tie.winner.name;}}
 return tie.winner;
}
function compTeamStrength(comp,name){const team=comp.teams.find(t=>t.name===name);return Number(team?.strength)||60;}
function buildEuropeanKnockoutResult(comp,stage,tie,leg,home,away,goalsHome,goalsAway,engine=null){
 const matchWinner=goalsHome===goalsAway?'Uavgjort':goalsHome>goalsAway?home.name:away.name;
 const result={round:stage.stageIndex+1,roundLabel:stage.name,leg,home:home.name,away:away.name,score:`${goalsHome}–${goalsAway}`,winner:matchWinner,competition:comp.name,events:engine?.events||[],stats:engine?.stats||{},week:appState.week,isEuropeanKnockout:true,knockoutStageKey:stage.key,knockoutStageName:stage.name,tieId:tie.id,homeGoals:goalsHome,awayGoals:goalsAway,extraTime:!!(engine?.extraTimeStarted||engine?.extraTime)};
 return result;
}
function productionProcessEuropeanKnockoutLeg(comp,leg){
 const state=comp.knockout,stage=state?.activeStage;if(!stage||stage.complete)return;
 stage.leg=leg;const completed=[];let userFixture=null;
 for(const tie of stage.ties){
  const home=leg===1?tie.firstHome:tie.firstAway,away=leg===1?tie.firstAway:tie.firstHome;
  if((home.clubIndex===appState.club)||(away.clubIndex===appState.club)){
   userFixture={tie,home:{...home},away:{...away}};continue;
  }
  let sim=simulateCompetitionMatch(home,away,`${comp.name} · ${stage.name}`,stage.stageIndex+1,tie.tieIndex);
  sim=simulateEuropeanKnockoutExtraTime(comp,stage,tie,leg,home,away,sim);
  const result=buildEuropeanKnockoutResult(comp,stage,tie,leg,home,away,sim.ga,sim.gb,{events:sim.events,stats:sim.stats,extraTime:sim.extraTime});
  if(stage.key==='final'&&sim.ga===sim.gb){const pen=shootoutScore(home.strength,away.strength);const penWinner=pen.home>pen.away?home:away;result.score=`${sim.ga}–${sim.gb} (${pen.home}–${pen.away} str.)`;result.decidedByPenalties=true;result.penaltyScore=pen;result.penaltyWinner=penWinner.name;result.winner=penWinner.name;}
  recordEuropeanKnockoutLeg(comp,stage,tie,leg,home,away,sim.ga,sim.gb,result);completed.push(result);
 }
 stage.legResults=stage.legResults||{};stage.legResults[leg]=completed;comp.results.push(...completed);
 if(userFixture){
  const t=userFixture.tie;
  appState.pendingCupMatch={competition:comp.name,isEuropean:true,isEuropeanKnockout:true,knockoutStageKey:stage.key,knockoutStageName:stage.name,knockoutLeg:leg,knockoutTieId:t.id,roundNo:stage.stageIndex+1,roundLabel:stage.name,scheduledWeek:appState.week,homeTeam:userFixture.home,awayTeam:userFixture.away,createdSeason:appState.seasonYear};
  appState.log.push(`${comp.name} · ${stage.name}: ${userFixture.home.name} mot ${userFixture.away.name} (${leg===1?'første':'andre'} kamp).`);return;
 }
 if(stage.key==='final'){
  const tie=stage.ties[0];if(tie&&!tie.winner){setEuropeanKnockoutWinner(comp,tie,true);}finishEuropeanKnockoutStage(comp);return;
 }
 if(leg===1){stage.leg=2;return;}
 stage.ties.forEach(t=>setEuropeanKnockoutWinner(comp,t,true));finishEuropeanKnockoutStage(comp);
}
function finishEuropeanKnockoutStage(comp){
 const state=comp.knockout,stage=state?.activeStage;if(!stage||stage.complete)return;
 if(stage.key==='final'){
  const winner=stage.ties[0]?.winner;comp.champion=winner?.name||'Ukjent';comp.finished=true;comp.phase='finished';
 }else{
  const expected=stage.key==='playoff'?8:stage.key==='round16'?8:stage.key==='quarterfinal'?4:2;
  if(stage.ties.length!==expected||stage.ties.some(t=>!t.winner)){throw new Error(`Cannot complete ${stage.name}: one or more ties have no winner`);}
 }
 stage.complete=true;state.history=state.history||[];state.history.push({key:stage.key,name:stage.name,stageIndex:stage.stageIndex,ties:stage.ties.map(t=>({...t,legs:{...t.legs}}))});
 if(stage.key==='playoff')state.playoffWinners=stage.ties.map(t=>({...t.winner}));
 if(stage.key!=='final'){state.stageIndex=stage.stageIndex+1;state.activeStage=null;comp.phase='knockout';}
 else{state.stageIndex=5;state.activeStage=null;}
 appState.log.push(comp.finished?`${comp.name}: ${comp.champion} vant turneringen.`:`${comp.name}: ${stage.name} ferdigspilt. ${stage.ties.length} oppgjør avgjort.`);
 if(!comp.finished&&!appState.pendingCupMatch){startEuropeanKnockout(comp.name);}
}
function startEuropeanKnockout(name){
 ensureEuropeanCompetitions();const comp=appState.europeanCompetitions?.[name];if(!comp||comp.format!=='league')return;
 if(Number(comp.leagueRound)<Number(comp.matchdays)){appState.log.push(`${name}: ligafasen er ikke ferdig ennå.`);return;}
 comp.leaguePhaseComplete=true;comp.phase='knockout';
 if(comp.finished)return;
 if(!comp.knockout)comp.knockout={stageIndex:0,activeStage:null,history:[],playoffWinners:[]};
 if(comp.knockout.activeStage&&!comp.knockout.activeStage.complete)return;
 const stageIndex=Number(comp.knockout.stageIndex)||0;if(stageIndex>=EUROPEAN_KNOCKOUT_STAGES.length)return;
 const definition=EUROPEAN_KNOCKOUT_STAGES[stageIndex];
 const ties=buildEuropeanKnockoutTies(comp,stageIndex);
 comp.knockout.activeStage={key:definition.key,name:definition.name,stageIndex,ties,leg:1,legResults:{1:[],2:[]},complete:false};
 const scheduledWeek=europeanKnockoutWeekFor(definition.key,1);
 appState.log.push(`${name}: ${definition.name} er satt opp med ${ties.length} oppgjør. Første kamp spilles i spilluke ${scheduledWeek}.`);
 // Do not play here. The weekly scheduler is the sole authority for when legs happen.
 return comp.knockout.activeStage;
}

function finishEuropeanKnockoutUserMatch(engine,ga,gb,pending){
 const comp=appState.europeanCompetitions?.[pending.competition];const stage=comp?.knockout?.activeStage;const tie=stage?.ties?.find(t=>t.id===pending.knockoutTieId);
 if(!comp||!stage||!tie)return null;
 const leg=Number(pending.knockoutLeg)||1,home=pending.homeTeam,away=pending.awayTeam;
 const result=buildEuropeanKnockoutResult(comp,stage,tie,leg,home,away,ga,gb,engine);result.week=Number(pending.scheduledWeek)||Number(result.week)||Number(appState.week);
 if(stage.key==='final'&&ga===gb){const pen=shootoutScore(home.strength,away.strength);const penWinner=pen.home>pen.away?home:away;result.score=`${ga}–${gb} (${pen.home}–${pen.away} str.)`;result.decidedByPenalties=true;result.penaltyScore=pen;result.penaltyWinner=penWinner.name;result.winner=penWinner.name;}
 awardUserCompetitionMatch(pending.competition,stage.index+1||1,home.name,away.name,ga,gb,result.winner,false,true);
 recordEuropeanKnockoutLeg(comp,stage,tie,leg,home,away,ga,gb,result);stage.legResults=stage.legResults||{};stage.legResults[leg]=stage.legResults[leg]||[];stage.legResults[leg].push(result);comp.results.push(result);
 appState.domesticCalendar=appState.domesticCalendar||[];appState.domesticCalendar.push({week:pending.scheduledWeek||appState.week,competition:pending.competition,...result});
 appState.log.push(`${comp.name} · ${stage.name} ${leg===1?'første':'andre'} kamp: ${home.name} ${result.score} ${away.name}.`);
 appState.pendingCupMatch=null;
 if(stage.key==='final'){
  setEuropeanKnockoutWinner(comp,tie,true);finishEuropeanKnockoutStage(comp);
 }else if(leg===1){stage.leg=2;appState.log.push(`${comp.name} · ${stage.name}: returoppgjøret er satt til uke ${europeanKnockoutWeekFor(stage.key,2)}.`);}
 else{stage.ties.forEach(t=>setEuropeanKnockoutWinner(comp,t,true));finishEuropeanKnockoutStage(comp);}
 save();return {winner:tie.winner?.name||result.winner,score:result.score,resultText:appState.log[appState.log.length-1],competition:comp.name,isEuropeanKnockout:true};
}


function runScenario(testLeague,managerEurope=false){
 testLeagueWeeks=testLeague;testManagerInEurope=managerEurope;const finalWeek=Math.max(38,testLeague);
 const names=['Champions League','Europa League','Conference League'];
 appState={week:1,seasonYear:2026,club:777,log:[],pendingCupMatch:null,domesticCalendar:[],europeanCompetitions:{}};
 for(const name of names){const matchdays=name==='Conference League'?6:8;appState.europeanCompetitions[name]={name,format:'league',finished:false,champion:null,phase:'league',leagueRound:0,matchdays,teams:[],results:[],knockout:{stageIndex:0,activeStage:null,history:[],playoffWinners:[]}};}
 simulatedLegCalls=0;const result={seasonType:`${testLeague===38?'Premier League':'EFL'}${managerEurope?'-manager-i-CL':'-AI-alle-kamper'}`,leagueWeeks:testLeague,finalWeek,competitions:[],errors:[],stageCreationChecks:[],userControlledMatches:0};
 const leagueFinishWeek={'Champions League':22,'Europa League':22,'Conference League':15};
 for(let week=1;week<=finalWeek;week++){
  appState.week=week;
  for(const comp of Object.values(appState.europeanCompetitions)){
   if(week===leagueFinishWeek[comp.name])comp.leagueRound=comp.matchdays;
   // Mirrors the production processEuropeanCompetitions catch-up gate: if another live cup match is pending, stage creation waits until the next weekly pass.
   if(comp.leagueRound>=comp.matchdays&&!comp.finished&&(!comp.knockout?.activeStage||comp.knockout.activeStage.complete)&&!appState.pendingCupMatch){
    const before=comp.results.length;const oldStage=comp.knockout?.stageIndex??0;startEuropeanKnockout(comp.name);
    if(comp.results.length!==before)result.errors.push(`${comp.name}: start function immediately recorded a result in week ${week}`);
    if(comp.knockout?.activeStage&&oldStage===comp.knockout.stageIndex)result.stageCreationChecks.push({competition:comp.name,week,matchesBefore:before,matchesAfter:comp.results.length,stage:comp.knockout.activeStage.key,firstLegScheduled:europeanKnockoutWeekFor(comp.knockout.activeStage.key,1)});
   }
  }
  processScheduledEuropeanKnockouts(week);
  if(appState.pendingCupMatch){
   const pending={...appState.pendingCupMatch};appState.week=week+1; // live user fixture is completed after the domestic round advances the season counter
   finishEuropeanKnockoutUserMatch({events:[],stats:{}},2,1,pending);result.userControlledMatches++;
  }
  for(const comp of Object.values(appState.europeanCompetitions)){
   const expectedFor=r=>({playoff:r.leg===1?24:25,round16:r.leg===1?27:28,quarterfinal:r.leg===1?30:31,semifinal:r.leg===1?33:34,final:finalWeek}[r.knockoutStageKey]);
   for(const r of comp.results.filter(x=>x.isEuropeanKnockout))if(Number(r.week)!==Number(expectedFor(r)))result.errors.push(`${comp.name} ${r.knockoutStageKey} leg ${r.leg}: result week ${r.week}, expected ${expectedFor(r)}`);
  }
 }
 for(const comp of Object.values(appState.europeanCompetitions)){
  const rows=comp.results.filter(r=>r.isEuropeanKnockout),stageRows=key=>rows.filter(r=>r.knockoutStageKey===key),expected={playoff:16,round16:16,quarterfinal:8,semifinal:4,final:1},stages={};
  for(const [key,count] of Object.entries(expected)){
   const found=stageRows(key);stages[key]={count:found.length,weeks:[...new Set(found.map(r=>r.week))].sort((a,b)=>a-b)};
   if(found.length!==count)result.errors.push(`${comp.name} ${key}: expected ${count} matches, got ${found.length}`);
  }
  const identities=rows.map(r=>`${r.knockoutStageKey}|${r.tieId}|${r.leg}`);
  if(new Set(identities).size!==identities.length)result.errors.push(`${comp.name}: duplicate tie legs`);
  if(!comp.finished||!comp.champion)result.errors.push(`${comp.name}: not complete`);
  if(rows.some(r=>r.week>finalWeek))result.errors.push(`${comp.name}: event after final week`);
  result.competitions.push({name:comp.name,finished:comp.finished,champion:comp.champion,knockoutMatches:rows.length,stages,duplicates:rows.length-new Set(identities).size});
 }
 result.productionSchedulerCalls=simulatedLegCalls;result.passed=result.errors.length===0;return result;
}
let testManagerInEurope=false;const test1=runScenario(38,false);const test2=runScenario(46,false);const test3=runScenario(38,true);const test4=runScenario(46,true);
const all={passed:[test1,test2,test3,test4].every(t=>t.passed),tests:[test1,test2,test3,test4]};console.log(JSON.stringify(all,null,2));if(!all.passed)process.exit(1);
