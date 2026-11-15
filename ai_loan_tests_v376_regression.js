const fs=require('fs'),vm=require('vm');
const source=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const start=source.indexOf('function '+name+'(');if(start<0)throw new Error('missing '+name);const open=source.indexOf('{',start);let i=open+1,depth=1;for(;i<source.length&&depth;i++){if(source[i]==='{')depth++;else if(source[i]==='}')depth--;}return source.slice(start,i);}
const names=['aiPosGroup','aiSquadCounts','aiLoanClubEntries','aiLoanParentRoster','aiLoanBorrowerRoster','processAIAutonomousLoans','archiveAIAutonomousLoanSpell','processAIAutonomousLoanMonitoring','processAIAutonomousLoanReturns','lowerLeagueMatchXI','activeLoanRosters','loanWageShare','clubWeeklyWageBillK'];
const code=names.map(extract).join('\n');
function player(id,pos,age,rating,apps=0,minutes=0){return {id,careerId:id,name:id,pos,age,rating,potential:Math.min(95,rating+18),apps,minutes,goals:0,assists:0,attributes:{},competitionStats:{},wage:10};}
const parentName='North City',borrowerName='River Town';
const parentRoster=[];
for(let i=0;i<10;i++)parentRoster.push(player('D'+i,'DEF',25,70));
parentRoster[0]=player('YOUNG-1','DEF',20,65,2,120);
for(let i=0;i<5;i++)parentRoster.push(player('G'+i,'GK',27,70));
for(let i=0;i<5;i++)parentRoster.push(player('M'+i,'MID',25,70));
for(let i=0;i<4;i++)parentRoster.push(player('A'+i,'ATT',25,70));
const borrowerRoster=[];
for(let i=0;i<6;i++)borrowerRoster.push(player('BD'+i,'DEF',25,57));
for(let i=0;i<3;i++)borrowerRoster.push(player('BG'+i,'GK',25,57));
for(let i=0;i<6;i++)borrowerRoster.push(player('BM'+i,'MID',25,57));
for(let i=0;i<5;i++)borrowerRoster.push(player('BA'+i,'ATT',25,57));
const state={seasonYear:2027,club:0,worldSquads:[[],parentRoster,borrowerRoster],eflPlayerDatabase:{},lowerLeagues:{},transferHistory:[],log:[]};
const clubs=[{name:'Manager FC',strength:60},{name:parentName,strength:75},{name:borrowerName,strength:62}];
const ctx={appState:state,CLUBS:clubs,AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},CAREER_STAT_KEYS:['apps','minutes','goals','assists','yellowCards','redCards','chancesCreated'],
 currentClub:()=>({name:'Manager FC'}),clubDivision:()=> 'Premier League',domesticClubKey:x=>String(x).toLowerCase(),normalisePlayerName:x=>String(x||'').toLowerCase(),levelForDivision:()=>50,playerCareerIdentity:p=>String(p.careerId||p.id||p.name),
 aiSquadCounts:null,seededRandom:()=>()=>.5,stableSeed:()=>1,gameDateForWeek:(y,w)=>`${y}-08-01`,gameDateForPreseason:(y)=>`${y}-06-01`,seasonLabel:()=>`${state.seasonYear}/${String(state.seasonYear+1).slice(-2)}`,
 clubIndexByName:()=>2,rosterPlayerPower:p=>Number(p.rating)||50,matchRoleOf:p=>p.role||p.pos,placePlayerInRoster:(r,p)=>{const id=String(p.careerId||p.id);const a=r.filter(x=>String(x.careerId||x.id)!==id);a.push(p);r.splice(0,r.length,...a);return r;},syncEFLWorldRosterMirror:()=>{},Number,Math,String,Array,Object,JSON};
ctx.aiSquadCounts=eval('('+extract('aiSquadCounts').replace(/^function aiSquadCounts/, 'function')+')');
vm.createContext(ctx);vm.runInContext(code,ctx);
const moved=ctx.processAIAutonomousLoans();
const loaned=borrowerRoster.find(p=>p.aiManagedLoan===true);
if(moved.length!==1||!loaned)throw new Error('Expected one AI loan, got '+moved.length);
if(parentRoster.some(p=>p.careerId==='YOUNG-1'))throw new Error('Loaned player remained at parent');
if(loaned.loanParentClubName!==parentName||loaned.loanBorrowerClubName!==borrowerName)throw new Error('Loan metadata incorrect');
const plBorrowerBill=ctx.clubWeeklyWageBillK(2,borrowerRoster,borrowerName,'Premier League'),plParentBill=ctx.clubWeeklyWageBillK(1,parentRoster,parentName,'Premier League');if(plBorrowerBill!==205||plParentBill!==235)throw new Error(`PL wage share incorrect: borrower ${plBorrowerBill}, parent ${plParentBill}`);
const duplicateRun=ctx.processAIAutonomousLoans();if(duplicateRun.length!==0)throw new Error('Season guard failed');
loaned.apps=14;loaned.minutes=900;loaned.goals=3;loaned.careerId='YOUNG-1';
const returned=ctx.processAIAutonomousLoanReturns('2027-08-02');
if(returned!==1)throw new Error('Expected one loan return, got '+returned);
if(!parentRoster.some(p=>p.careerId==='YOUNG-1'))throw new Error('Player did not return to parent');
if(borrowerRoster.some(p=>p.careerId==='YOUNG-1'))throw new Error('Returned player remains at borrower');
const returnedPlayer=parentRoster.find(p=>p.careerId==='YOUNG-1');
if(returnedPlayer.loanStatus||returnedPlayer.aiManagedLoan)throw new Error('Loan metadata not cleared');
if((returnedPlayer.careerStats?.apps||0)!==14)throw new Error('Loan stats were not archived');
const secondReturn=ctx.processAIAutonomousLoanReturns('2027-08-02');if(secondReturn!==0)throw new Error('Return was not idempotent');
// EFL-to-EFL pathway: verify canonical lower-league registries work without PL mirrors.
const eflParent='Eastborough',eflBorrower='Westbridge';
const eflParentRoster=[];for(let i=0;i<10;i++)eflParentRoster.push(player('ED'+i,'DEF',25,68));eflParentRoster[0]=player('EFL-YOUNG','DEF',19,62,1,60);
for(let i=0;i<5;i++)eflParentRoster.push(player('EG'+i,'GK',26,68));for(let i=0;i<5;i++)eflParentRoster.push(player('EM'+i,'MID',26,68));for(let i=0;i<4;i++)eflParentRoster.push(player('EA'+i,'ATT',26,68));
const eflBorrowerRoster=[];for(let i=0;i<6;i++)eflBorrowerRoster.push(player('EBD'+i,'DEF',25,53));for(let i=0;i<3;i++)eflBorrowerRoster.push(player('EBG'+i,'GK',25,53));for(let i=0;i<6;i++)eflBorrowerRoster.push(player('EBM'+i,'MID',25,53));for(let i=0;i<5;i++)eflBorrowerRoster.push(player('EBA'+i,'ATT',25,53));
state.seasonYear=2028;state.aiLoansLastProcessedSeason=0;state.worldSquads=[[]];state.eflPlayerDatabase={'League One':{[eflParent]:eflParentRoster,[eflBorrower]:eflBorrowerRoster}};state.lowerLeagues={'League One':{rows:[{name:eflParent,strength:70},{name:eflBorrower,strength:58}]}};
const eflMoves=ctx.processAIAutonomousLoans();if(eflMoves.length!==1)throw new Error('Expected EFL loan, got '+eflMoves.length);
const eflLoan=eflBorrowerRoster.find(p=>p.aiManagedLoan);if(!eflLoan||eflLoan.loanParentType!=='efl'||eflLoan.loanStatus!=='in')throw new Error('EFL loan metadata incorrect');
const eflXI=ctx.lowerLeagueMatchXI({name:eflBorrower},'League One');if(!eflXI.some(p=>p.careerId==='EFL-YOUNG'))throw new Error('Loaned EFL player not eligible for AI match selection');
const borrowerBill=ctx.clubWeeklyWageBillK(-1,eflBorrowerRoster,eflBorrower,'League One'),parentBill=ctx.clubWeeklyWageBillK(-1,eflParentRoster,eflParent,'League One');if(borrowerBill!==205||parentBill!==235)throw new Error(`EFL wage share incorrect: borrower ${borrowerBill}, parent ${parentBill}`);
const eflReturn=ctx.processAIAutonomousLoanReturns('2028-08-02');if(eflReturn!==1||!eflParentRoster.some(p=>p.careerId==='EFL-YOUNG'))throw new Error('EFL player did not return to canonical parent roster');
// A borrower with a full positional group must not receive a loan.
state.seasonYear=2029;state.aiLoansLastProcessedSeason=0;state.eflPlayerDatabase={'League One':{[eflParent]:eflParentRoster,[eflBorrower]:eflBorrowerRoster}};
for(let i=0;i<2;i++)eflBorrowerRoster.push(player('EXTRA'+i,'DEF',25,55));
const noNeed=ctx.processAIAutonomousLoans();if(noNeed.length!==0)throw new Error('Loan made despite no positional need');
const domesticLoanSaleGuards=(source.match(/!x\.p\.loanStatus&&!playerMovedInCurrentWindow/g)||[]).length; const internationalLoanSaleGuard=source.includes('!p.loanStatus&&!p.aiManagedLoan&&!playerMovedInCurrentWindow(p,movedThisWindow)'); const loanSaleGuards=domesticLoanSaleGuards+(internationalLoanSaleGuard?1:0); if(loanSaleGuards<2||!internationalLoanSaleGuard)throw new Error('AI transfer shortlists do not protect domestic and AI-managed loanees');
const seasonHook=source.includes('ensureYouthAcademies(true);const aiLoans=processAIAutonomousLoans()');const weeklyReturnHook=source.includes('returnedCount+=processAIAutonomousLoanReturns(today)');if(!seasonHook||!weeklyReturnHook)throw new Error('Season/weekly loan integration hook missing');
const results={version:'3.75',testFixtures:2,checksPassed:17,plLoanCreated:moved.length,duplicateSeasonRun:duplicateRun.length,plLoanReturned:returned,plWageSplitCorrect:plBorrowerBill===205&&plParentBill===235,loanAppsArchived:returnedPlayer.careerStats.apps,identityPreserved:returnedPlayer.careerId==='YOUNG-1',metadataCleared:!returnedPlayer.loanStatus&&!returnedPlayer.aiManagedLoan,idempotentReturn:secondReturn===0,eflLoanCreated:eflMoves.length,eflLoanReturned:eflReturn,loanedPlayerSelectedForAILeagueXI:eflXI.some(p=>p.careerId==='EFL-YOUNG'),eflWageSplitCorrect:borrowerBill===205&&parentBill===235,loanedPlayersProtectedFromAIResale:loanSaleGuards>=2&&internationalLoanSaleGuard,seasonAndWeeklyReturnHooks:seasonHook&&weeklyReturnHook,blockedWithoutPositionalNeed:noNeed.length===0};
fs.writeFileSync(__dirname+'/AI_LOAN_TEST_RESULTS_v3.75.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
