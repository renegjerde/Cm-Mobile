const fs=require('fs'),vm=require('vm');const source=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const start=source.indexOf('function '+name+'(');if(start<0)throw Error('missing '+name);const open=source.indexOf('{',start);let i=open+1,d=1;for(;i<source.length&&d;i++){if(source[i]==='{')d++;else if(source[i]==='}')d--;}return source.slice(start,i);}
const names=['aiPosGroup','aiSquadCounts','aiLoanClubEntries','aiLoanParentRoster','aiLoanBorrowerRoster','processAIAutonomousLoans','archiveAIAutonomousLoanSpell','processAIAutonomousLoanReturns'];
function player(id,pos,age,rating){return {id,careerId:id,name:id,pos,age,rating,potential:Math.min(95,rating+18),apps:0,minutes:0,goals:0,assists:0,attributes:{},competitionStats:{},wage:10};}
const clubs=[{name:'Manager FC',strength:60}];for(let i=1;i<=11;i++)clubs.push({name:'Parent '+i,strength:70});for(let i=1;i<=12;i++)clubs.push({name:'Borrower '+i,strength:60});clubs.push({name:'User Club',strength:60});
const worldSquads=clubs.map(()=>[]);
for(let ci=1;ci<=11;ci++){const r=worldSquads[ci];for(let a=0;a<6;a++)r.push(player(`P${ci}-Y${a}`,'DEF',18+a,60+a));for(let a=0;a<4;a++)r.push(player(`P${ci}-D${a}`,'DEF',27,70));for(let a=0;a<5;a++)r.push(player(`P${ci}-G${a}`,'GK',27,70));for(let a=0;a<5;a++)r.push(player(`P${ci}-M${a}`,'MID',27,70));for(let a=0;a<4;a++)r.push(player(`P${ci}-A${a}`,'ATT',27,70));}
for(let ci=12;ci<=23;ci++){const r=worldSquads[ci];for(let a=0;a<6;a++)r.push(player(`B${ci}-D${a}`,'DEF',26,55));for(let a=0;a<3;a++)r.push(player(`B${ci}-G${a}`,'GK',26,55));for(let a=0;a<6;a++)r.push(player(`B${ci}-M${a}`,'MID',26,55));for(let a=0;a<5;a++)r.push(player(`B${ci}-A${a}`,'ATT',26,55));}
const state={seasonYear:2027,club:24,worldSquads,eflPlayerDatabase:{},lowerLeagues:{},transferHistory:[],log:[],aiLoansLastProcessedSeason:0};
const ctx={appState:state,CLUBS:clubs,AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},CAREER_STAT_KEYS:['apps','minutes','goals','assists','yellowCards','redCards','chancesCreated'],currentClub:()=>({name:'User Club'}),clubDivision:()=> 'Premier League',domesticClubKey:x=>String(x).toLowerCase(),levelForDivision:()=>50,playerCareerIdentity:p=>String(p.careerId||p.id||p.name),gameDateForWeek:(y,w)=>`${y}-08-01`,gameDateForPreseason:y=>`${y}-06-01`,seasonLabel:()=>`${state.seasonYear}/${String(state.seasonYear+1).slice(-2)}`,placePlayerInRoster:(r,p)=>{const id=String(p.careerId||p.id);const clean=r.filter(x=>String(x.careerId||x.id)!==id);clean.push(p);r.splice(0,r.length,...clean);return r;},syncEFLWorldRosterMirror:()=>{},Number,Math,String,Array,Object,JSON};
vm.createContext(ctx);vm.runInContext(names.map(extract).join('\n'),ctx);
let totalLoans=0,totalReturns=0,repeatSeasonLoans=0,duplicateIdentities=0,peakLoanRoster=0;
for(let y=2027;y<2037;y++){
 state.seasonYear=y;const loans=ctx.processAIAutonomousLoans();totalLoans+=loans.length;
 const active=[];worldSquads.forEach(r=>(r||[]).forEach(p=>{if(p.aiManagedLoan)active.push(p)}));
 if(active.length!==loans.length)throw Error(`Active loan mismatch in ${y}`);
 for(const p of active){p.apps=14;p.minutes=1000;p.goals=2;}
 peakLoanRoster=Math.max(peakLoanRoster,active.length);
 const returned=ctx.processAIAutonomousLoanReturns(`${y}-08-02`);totalReturns+=returned;
 if(returned!==loans.length)throw Error(`Return mismatch in ${y}: ${returned}/${loans.length}`);
 for(const r of worldSquads)for(const p of r)p.age=(Number(p.age)||25)+1;
 state.seasonYear=y+1;
}
const all=[];worldSquads.forEach(r=>(r||[]).forEach(p=>all.push(p)));const ids=all.map(p=>p.careerId||p.id);duplicateIdentities=ids.length-new Set(ids).size;
if(totalLoans!==totalReturns||duplicateIdentities!==0)throw Error('Long horizon invariant failed');
const result={years:10,aiClubs:23,loanedPlayers:totalLoans,completedReturns:totalReturns,peakConcurrentLoans:peakLoanRoster,duplicateCareerIdentities:duplicateIdentities,allLoansReturned:totalLoans===totalReturns};
fs.writeFileSync(__dirname+'/AI_LOAN_LONG_HORIZON_RESULTS_v3.75.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
