const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function extract(name){const start=html.indexOf(`function ${name}(`);if(start<0)throw Error('Missing '+name);const brace=html.indexOf('{',start);let d=0,q=null,e=false,line=false,block=false;for(let i=brace;i<html.length;i++){const c=html[i],n=html[i+1];if(line){if(c==='\n')line=false;continue;}if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}if(q){if(e)e=false;else if(c==='\\')e=true;else if(c===q)q=null;continue;}if(c==='/'&&n==='/'){line=true;i++;continue;}if(c==='/'&&n==='*'){block=true;i++;continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')d++;else if(c==='}'&&--d===0)return html.slice(start,i+1);}throw Error('Unclosed '+name);}
const prizes=html.slice(html.indexOf('const COMPETITION_PRIZES='),html.indexOf('function awardCompetitionPrize('));
const appState={seasonYear:2026,week:38,club:0,clubFinances:{'PL AI':{transferBudget:10},'Euro AI':{transferBudget:5},'EFL AI':{transferBudget:2},'User FC':{transferBudget:20}},europeanTransferClubData:{'Euro AI':{budget:5,strength:80}},lowerLeagues:{Championship:{rows:[{name:'EFL AI',budget:2}]}},europeanCompetitions:{'Champions League':{name:'Champions League',teams:[{name:'PL AI'},{name:'Euro AI'},{name:'EFL AI'},{name:'User FC'}],results:[
 {home:'PL AI',away:'Euro AI',score:'2–0',round:1,gameNo:0,isLeaguePhase:true},
 {home:'EFL AI',away:'User FC',score:'1–1',round:1,gameNo:1,isLeaguePhase:true},
 {home:'Euro AI',away:'PL AI',score:'1–0',isEuropeanKnockout:true,knockoutStageKey:'playoff',knockoutStageName:'Playoff',tieId:'p1',tieWinner:'Euro AI'},
 {home:'Euro AI',away:'PL AI',score:'2–1',isEuropeanKnockout:true,knockoutStageKey:'final',knockoutStageName:'Finale',tieId:'f1',tieWinner:'Euro AI'}
 ],champion:'Euro AI'}},log:[]};
const CLUBS=[{name:'User FC',budget:20},{name:'PL AI',budget:10}];
const ctx={appState,CLUBS,currentClub:()=>({name:'User FC'}),europeanResultScore:r=>{const m=String(r.score||'').match(/^(\d+)\s*[–-]\s*(\d+)/);return m?{home:+m[1],away:+m[2]}:null;},Number,Math,Object,Array,Set,Map};
vm.createContext(ctx);vm.runInContext(prizes+extract('awardAIClubCompetitionPrize')+extract('distributeEuropeanCompetitionPrizesAtSeasonEnd'),ctx);
const first=ctx.distributeEuropeanCompetitionPrizesAtSeasonEnd();
assert(first.length===9,`expected 9 entries, got ${first.length}`);
assert(Math.abs(CLUBS[1].budget-31.9)<1e-9,'PL budget should include participation + win + finalist');
assert(Math.abs(appState.europeanTransferClubData['Euro AI'].budget-51.1)<1e-9,'European budget should include participation + playoff + finalist + champion');
assert(Math.abs(appState.lowerLeagues.Championship.rows[0].budget-4.7)<1e-9,'EFL budget should include participation');
assert(appState.clubFinances['Euro AI'].transferBudget===51.1,'European finance mirror should sync');
assert(appState.clubFinances['User FC'].transferBudget===20,'user club must not be double-paid');
const snapshot=[CLUBS[1].budget,appState.europeanTransferClubData['Euro AI'].budget,appState.lowerLeagues.Championship.rows[0].budget];
const second=ctx.distributeEuropeanCompetitionPrizesAtSeasonEnd();
assert(second.length===0,'second distribution must be idempotent');
assert(JSON.stringify(snapshot)===JSON.stringify([CLUBS[1].budget,appState.europeanTransferClubData['Euro AI'].budget,appState.lowerLeagues.Championship.rows[0].budget]),'budgets changed on duplicate run');
console.log(JSON.stringify({passed:9,paid:first.length,duplicateRunEntries:second.length,plBudget:CLUBS[1].budget,europeBudget:appState.europeanTransferClubData['Euro AI'].budget,eflBudget:appState.lowerLeagues.Championship.rows[0].budget,userBudget:appState.clubFinances['User FC'].transferBudget},null,2));
