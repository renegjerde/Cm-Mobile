const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const start=source.indexOf('function '+name+'(');if(start<0)throw new Error('missing '+name);const open=source.indexOf('{',start);let i=open+1,depth=1;for(;i<source.length&&depth;i++){if(source[i]==='{')depth++;else if(source[i]==='}')depth--;}return source.slice(start,i);}
const clubList=[{name:'Manager FC',strength:70,division:'Premier League'}];
const state={club:0,seasonYear:2028,week:25,worldSquads:[[]],eflPlayerDatabase:{},lowerLeagues:{},europeanTransferSquads:{'Continental FC':Array.from({length:18},(_,i)=>({id:'eu'+i,careerId:'eu'+i,name:'EU'+i,pos:i<2?'GK':i<8?'DEF':i<14?'MID':'ATT',rating:60,wage:10}))},europeanTransferClubData:{'Continental FC':{strength:62,budget:20}},youthAcademies:{},aiAcademyPromotionHistory:[],transferHistory:[],log:[],clubFinances:{'Continental FC':{wageBudget:1000}}};
const ctx={appState:state,CLUBS:clubList,AI_SQUAD_TARGETS:{GK:3,DEF:8,MID:8,ATT:6},CAREER_STAT_KEYS:['apps','minutes','goals','assists','yellowCards','redCards','chancesCreated'],currentClub:()=>clubList[0],clubDivision:c=>c?.division||'Premier League',domesticDivisionForClubName:()=>null,domesticClubKey:x=>String(x).toLowerCase(),playerCareerIdentity:p=>String(p.careerId||p.id||p.name),aiPosGroup:p=>{const x=String(p?.pos||'').toUpperCase();return x==='GK'?'GK':['DEF','CB','LB','RB','LWB','RWB'].includes(x)?'DEF':['MID','DM','CM','AM','LM','RM','CAM','CDM'].includes(x)?'MID':'ATT';},stableSeed:s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0;},syncEFLWorldRosterMirror:()=>{},placePlayerInRoster:(r,p)=>{const id=String(p.careerId||p.id);const i=r.findIndex(x=>String(x.careerId||x.id)===id);if(i>=0)r[i]=p;else r.push(p);return r;},archiveAIAutonomousLoanSpell:p=>{p.careerStats=p.careerStats||{};p.careerStats.apps=(p.careerStats.apps||0)+(p.apps||0);},gameDateForCurrentState:()=>`2028-02-01`,seasonLabel:()=>`2027/28`,Number,Math,String,Array,Object,Set,JSON};
vm.createContext(ctx);
for(const n of ['aiAcademyRosterForClub','processAIAcademyPromotion','aiLoanClubEntries','aiLoanParentRoster','aiLoanBorrowerRoster','processAIAutonomousLoanMonitoring','processAIAutonomousLoanReturns'])vm.runInContext(extract(n),ctx);
// European academy player promotion writes into the persistent European squad roster.
const prospect={id:'academy-eu-1',careerId:'academy-eu-1',name:'European Prospect',pos:'MID',age:18,rating:65,potential:84,wage:2,attributes:{},academySeason:2027};
const promoted=ctx.processAIAcademyPromotion({name:'Continental FC',division:'Europe',strength:62},prospect,2028);
assert(promoted,'eligible European academy player should be promoted');
const europe=state.europeanTransferSquads['Continental FC'];
assert(europe.some(p=>p.careerId==='academy-eu-1'&&p.academyPromoted&&p.internationalClub),'promotion must preserve European canonical roster and flag');
assert(state.aiAcademyPromotionHistory.length===1,'European promotion history should be recorded');
// An already registered player cannot be promoted into a second club.
assert(!ctx.processAIAcademyPromotion({name:'Continental FC',division:'Europe',strength:62},{...prospect,id:'dup',careerId:'academy-eu-1'},2029),'duplicate identity must be rejected');
// Mid-season loan monitoring recalls an AI loanee who has received virtually no football.
const parent=[{id:'parent-existing',careerId:'parent-existing',name:'Parent Player',pos:'DEF',rating:65,wage:10}];
const borrower=[];
const loan={id:'loan-1',careerId:'loan-1',name:'Unused Loanee',pos:'MID',rating:60,apps:0,minutes:0,goals:0,assists:0,competitionStats:{},loanStatus:'in',aiManagedLoan:true,loanParentType:'pl',loanParentClubIndex:1,loanParentClubName:'Parent FC',loanBorrowerType:'pl',loanBorrowerClubIndex:2,loanBorrowerClubName:'Borrower FC',loanEndDate:'2028-06-30'};
parent.push();borrower.push(loan);
clubList.push({name:'Parent FC',strength:70,division:'Premier League'},{name:'Borrower FC',strength:58,division:'Premier League'});
state.worldSquads=[[],parent,borrower];
const monitored=ctx.processAIAutonomousLoanMonitoring('2028-02-01');
assert(monitored===1,'one underused loanee should be recalled after week 20');
assert(parent.some(p=>p.careerId==='loan-1'&&!p.loanStatus&&!p.aiManagedLoan),'recalled player must return to parent');
assert(!borrower.some(p=>p.careerId==='loan-1'),'recalled player must leave borrower');
assert(state.aiLoanRecallHistory?.length===1,'recall history must be stored');
assert(ctx.processAIAutonomousLoanMonitoring('2028-02-02')===0,'recall must be idempotent');
// A player with meaningful usage must not be recalled.
const used={...loan,id:'used',careerId:'used',name:'Regular Loanee',apps:8,minutes:620};borrower.push(used);
assert(ctx.processAIAutonomousLoanMonitoring('2028-02-03')===0,'regularly used loanee must remain at borrower');
const results={version:'3.76',europeanAcademyPromotion:promoted,europeanRosterPreserved:europe.some(p=>p.careerId==='academy-eu-1'),duplicateIdentityBlocked:true,underusedLoanRecall:monitored,recallHistory:state.aiLoanRecallHistory.length,regularLoaneeProtected:true,passed:true};
fs.writeFileSync(__dirname+'/AI_YOUTH_LOAN_MONITOR_TEST_RESULTS_v3.76.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
