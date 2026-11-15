const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){
 const marker='function '+name+'(';let start=html.indexOf(marker);if(start<0)throw Error('Missing '+name);
 let brace=html.indexOf('{',start),depth=0,q=null,esc=false,line=false,block=false;
 for(let i=brace;i<html.length;i++){
  const c=html[i],n=html[i+1];
  if(line){if(c==='\n')line=false;continue;}
  if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}
  if(q){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q=null;continue;}
  if(c==='/'&&n==='/'){line=true;i++;continue;}if(c==='/'&&n==='*'){block=true;i++;continue;}
  if(c==='"'||c==="'"||c==='`'){q=c;continue;}
  if(c==='{')depth++;else if(c==='}'&&--depth===0)return html.slice(start,i+1);
 }
 throw Error('Unclosed '+name);
}
const names=['europeanWeeklyOperatingRevenueM','europeanClubWageBudgetBase','ensureEuropeanClubFinanceRecords','reviewEuropeanClubFinancesForNewSeason','processWeeklyClubEconomy'];
const context={
 appState:{club:0,seasonYear:2027,budget:10,squad:[],worldSquads:[],lowerLeagues:{},eflPlayerDatabase:{},clubFinances:{},europeanTransferSquads:{
  'FC Test Elite':Array.from({length:25},(_,i)=>({name:'Elite '+i,wage:22,age:25,rating:80})),
  'FC Test Small':Array.from({length:22},(_,i)=>({name:'Small '+i,wage:9,age:24,rating:55}))
 },europeanTransferClubData:{'FC Test Elite':{name:'FC Test Elite',strength:84,budget:40},'FC Test Small':{name:'FC Test Small',strength:55,budget:2}}},
 CLUBS:[],STADIUMS:{},
 currentClub:()=>({name:'User Club'}),clubDivision:()=> 'Premier League',clubWeeklyWageBillK:()=>0,
 initClubFinances:()=>{},baselineFinance:()=>({}),weeklyOperatingRevenueM:()=>0,
 clubStadiumCapacity:()=>30000,clubCommercialFactor:()=>1,
 Number,Math,Object,Array,Set,Map,console
};
vm.createContext(context);vm.runInContext(names.map(extract).join('\n'),context);
const {appState}=context;
context.ensureEuropeanClubFinanceRecords();
assert(appState.clubFinances['FC Test Elite'],'elite finance record created');
assert(appState.clubFinances['FC Test Small'],'small finance record created');
assert.equal(appState.clubFinances['FC Test Elite'].transferBudget,40,'European meta budget is authoritative');
appState.europeanTransferClubData['FC Test Elite'].budget=43;context.ensureEuropeanClubFinanceRecords();assert.equal(appState.clubFinances['FC Test Elite'].transferBudget,43,'latest transfer-market cash is not overwritten by stale finance record');
const oldElite=appState.europeanTransferClubData['FC Test Elite'].budget;
const oldSmall=appState.europeanTransferClubData['FC Test Small'].budget;
context.processWeeklyClubEconomy();
const elite=appState.clubFinances['FC Test Elite'],small=appState.clubFinances['FC Test Small'];
assert.notEqual(appState.europeanTransferClubData['FC Test Elite'].budget,oldElite,'elite cash changes weekly');
assert.notEqual(appState.europeanTransferClubData['FC Test Small'].budget,oldSmall,'small cash changes weekly');
assert.equal(elite.transferBudget,appState.europeanTransferClubData['FC Test Elite'].budget,'elite budget stays synchronized');
assert.equal(small.transferBudget,appState.europeanTransferClubData['FC Test Small'].budget,'small budget stays synchronized');
assert(elite.weeklyIncomeM>0&&small.weeklyIncomeM>0,'both tiers receive operating income');
assert(elite.wageBill>0&&small.wageBill>0,'both tiers pay weekly wages');
for(let i=0;i<100;i++)context.processWeeklyClubEconomy();
assert(appState.europeanTransferClubData['FC Test Small'].budget<=22,'small-club cash ceiling enforced');
appState.europeanTransferClubData['FC Test Elite'].budget=-100;context.processWeeklyClubEconomy();
assert(appState.europeanTransferClubData['FC Test Elite'].budget>=-52.5,'elite-club downside buffer enforced');
const before=elite.wageBudget;context.reviewEuropeanClubFinancesForNewSeason();
assert(elite.wageBudget>=Math.round(before*.88)-1&&elite.wageBudget<=Math.round(before*1.12)+1,'annual wage-budget movement is bounded');
assert(elite.lastSeasonReview&&small.lastSeasonReview,'annual review records created');
console.log(JSON.stringify({passed:14,clubs:2,weeklyCashFlow:true,wageBills:true,annualReview:true,elite:{incomeM:elite.weeklyIncomeM,wageBillK:elite.wageBill,weeklyNetM:elite.weeklyNetM,budget:elite.transferBudget},small:{incomeM:small.weeklyIncomeM,wageBillK:small.wageBill,weeklyNetM:small.weeklyNetM,budget:small.transferBudget}},null,2));
