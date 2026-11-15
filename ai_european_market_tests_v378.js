const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
function extractFunction(src,name){
 const start=src.indexOf(`function ${name}(`);if(start<0)throw Error('missing '+name);
 const brace=src.indexOf('{',start);let d=0,q=null,e=false,line=false,block=false;
 for(let i=brace;i<src.length;i++){const c=src[i],n=src[i+1];if(line){if(c==='\n')line=false;continue;}if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}if(q){if(e)e=false;else if(c==='\\')e=true;else if(c===q)q=null;continue;}if(c==='/'&&n==='/'){line=true;i++;continue;}if(c==='/'&&n==='*'){block=true;i++;continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')d++;else if(c==='}'&&--d===0)return src.slice(start,i+1);}
 throw Error('unclosed '+name);
}
const fn=extractFunction(html,'processAIEuropeanTransfers');
const negotiationFn=extractFunction(html,'aiNegotiateTransferTerms');
const TARGETS={GK:3,DEF:8,MID:8,ATT:6};
function makePlayer(id,pos='GK',rating=60){return {id,careerId:id,name:id,pos,role:pos,rating,potential:rating+10,age:22,value:10,wage:20,apps:0,minutes:0,fitness:90,morale:70};}
function roster(gk=3,prefix='R'){const a=[];for(let i=0;i<gk;i++)a.push(makePlayer(prefix+'GK'+i));for(let i=0;i<8;i++)a.push(makePlayer(prefix+'D'+i,'DEF'));for(let i=0;i<8;i++)a.push(makePlayer(prefix+'M'+i,'MID'));for(let i=0;i<6;i++)a.push(makePlayer(prefix+'A'+i,'ATT'));return a;}
function runScenario(kind){
 const europeanTransferSquads={},europeanTransferClubData={};
 const appState={seasonYear:2026,week:1,preseasonActive:true,club:0,worldSquads:[],eflPlayerDatabase:{Championship:{}},lowerLeagues:{Championship:{rows:[]}},transferHistory:[],aiTransferActivity:[],log:[],clubFinances:{}};
 const CLUBS=[{name:'User FC',strength:60,budget:100},{name:'PL Buyer',strength:60,budget:100}];
 let domesticEntries=[];
 if(kind==='europe-to-europe'||kind==='wage-budget-block'){
  if(kind==='wage-budget-block')appState.clubFinances['Euro Buyer']={wageBudget:485,wageBill:480};
  europeanTransferSquads['Euro Seller']=roster(4,'ES');europeanTransferClubData['Euro Seller']={strength:60,budget:100};
  europeanTransferSquads['Euro Buyer']=roster(2,'EB');europeanTransferClubData['Euro Buyer']={strength:60,budget:100};
 } else if(kind==='efl-to-europe'){
  appState.eflPlayerDatabase.Championship['EFL Seller']=roster(4,'EFS');const club={name:'EFL Seller',strength:58,budget:100};appState.lowerLeagues.Championship.rows.push(club);appState.clubFinances['EFL Seller']={transferBudget:100};
  domesticEntries=[{type:'efl',index:-1,division:'Championship',name:'EFL Seller',strength:58,roster:appState.eflPlayerDatabase.Championship['EFL Seller'],club}];
  europeanTransferSquads['Euro Buyer']=roster(2,'EB');europeanTransferClubData['Euro Buyer']={strength:60,budget:100};
 } else if(kind==='europe-to-efl'){
  appState.eflPlayerDatabase.Championship['EFL Buyer']=roster(2,'EFB');const club={name:'EFL Buyer',strength:58,budget:100};appState.lowerLeagues.Championship.rows.push(club);appState.clubFinances['EFL Buyer']={transferBudget:100};
  domesticEntries=[{type:'efl',index:-1,division:'Championship',name:'EFL Buyer',strength:58,roster:appState.eflPlayerDatabase.Championship['EFL Buyer'],club}];
  europeanTransferSquads['Euro Seller']=roster(4,'ES');europeanTransferClubData['Euro Seller']={strength:60,budget:100};
 } else if(kind==='europe-to-pl'){
  appState.worldSquads[1]=roster(2,'PLB');appState.worldSquads[0]=roster(3,'USER');
  domesticEntries=[{type:'pl',index:1,division:'Premier League',name:'PL Buyer',strength:60,roster:appState.worldSquads[1],club:CLUBS[1]}];
  europeanTransferSquads['Euro Seller']=roster(4,'ES');europeanTransferClubData['Euro Seller']={strength:60,budget:100};
 } else if(kind==='efl-world-to-europe'){
  CLUBS.push({name:'EFL Seller',strength:58,budget:100,division:'Championship'});appState.worldSquads[2]=roster(4,'EFSW');appState.eflPlayerDatabase.Championship['EFL Seller']=roster(4,'EFSW');
  const club=CLUBS[2];appState.lowerLeagues.Championship.rows.push(club);appState.clubFinances['EFL Seller']={transferBudget:100};
  domesticEntries=[{type:'pl',index:2,division:'Championship',name:'EFL Seller',strength:58,roster:appState.worldSquads[2],club}];
  europeanTransferSquads['Euro Buyer']=roster(2,'EB');europeanTransferClubData['Euro Buyer']={strength:60,budget:100};
 } else if(kind==='europe-to-efl-world'){
  CLUBS.push({name:'EFL Buyer',strength:58,budget:100,division:'Championship'});appState.worldSquads[2]=roster(2,'EFBW');appState.eflPlayerDatabase.Championship['EFL Buyer']=roster(2,'EFBW');
  const club=CLUBS[2];appState.lowerLeagues.Championship.rows.push(club);appState.clubFinances['EFL Buyer']={transferBudget:100};
  domesticEntries=[{type:'pl',index:2,division:'Championship',name:'EFL Buyer',strength:58,roster:appState.worldSquads[2],club}];
  europeanTransferSquads['Euro Seller']=roster(4,'ES');europeanTransferClubData['Euro Seller']={strength:60,budget:100};
 }
 Object.assign(appState,{europeanTransferSquads,europeanTransferClubData});
 const context={appState,CLUBS,AI_SQUAD_TARGETS:TARGETS,
  transferWindowOpen:()=>true,ensureEuropeanTransferWorld:()=>{},aiLoanClubEntries:()=>domesticEntries,movedPlayerSetForCurrentWindow:()=>({ids:new Set(),names:new Set()}),
  ensurePlayerContract:p=>{if(!p.contractEndDate)p.contractEndDate='2028-06-30';return p;},aiNegotiateTransferTerms:null,
  playerMovedInCurrentWindow:()=>false,playerCareerIdentity:p=>String(p?.careerId||p?.id||p?.name||''),
  normalisePlayerName:s=>String(s||'').toLowerCase(),aiPosGroup:p=>p.pos,
  aiSquadCounts:r=>{const c={GK:0,DEF:0,MID:0,ATT:0};for(const p of r||[])c[p.pos]=(c[p.pos]||0)+1;return c;},
  aiSquadNeeds:r=>{const c={GK:0,DEF:0,MID:0,ATT:0};const n=context.aiSquadCounts(r);for(const k of Object.keys(c))c[k]=TARGETS[k]-n[k];return c;},
  placePlayerInRoster:(r,p)=>[...(r||[]).filter(x=>context.playerCareerIdentity(x)!==context.playerCareerIdentity(p)),p],
  seededRandom:()=>()=>0,stableSeed:()=>99,transferDateForGameweek:()=> '2026-07-01',seasonLabel:()=> '2026/27',
  currentClub:()=>({name:'User FC'}),syncEFLWorldRosterMirror:index=>{const c=CLUBS[index];if(c&&c.division&&c.division!=='Premier League'){appState.eflPlayerDatabase[c.division]=appState.eflPlayerDatabase[c.division]||{};appState.eflPlayerDatabase[c.division][c.name]=(appState.worldSquads[index]||[]).map(p=>({...p}));}},
  clubDivision:c=>c?.division||(c?.name==='PL Buyer'?'Premier League':'Championship')
 };
 vm.createContext(context);vm.runInContext(negotiationFn,context);vm.runInContext(fn,context);
 const moved=context.processAIEuropeanTransfers(1);
 if(kind==='wage-budget-block'){assert.strictEqual(moved.length,0,'wage budget must block unaffordable signing');assert(appState.aiNegotiationHistory.some(x=>x.reason==='wage-budget'),'wage rejection should be recorded');return {scenario:kind,transferBlocked:true,reason:'wage-budget',historyRecorded:true};}
 assert.strictEqual(moved.length,1,kind+' should create one negotiated transfer');
 const record=appState.transferHistory[0];assert(record&&record.playerCareerId,'transfer history should retain career identity');
 const id=record.playerCareerId;
 const all=[];for(const r of Object.values(europeanTransferSquads))all.push(...r);if(!kind.includes('efl-world'))for(const clubs of Object.values(appState.eflPlayerDatabase))for(const r of Object.values(clubs))all.push(...r);for(const r of appState.worldSquads)if(r)all.push(...r);
 assert.strictEqual(all.filter(p=>String(p.careerId||p.id)===id).length,1,kind+' should leave exactly one canonical player copy');
 const movedPlayer=all.find(p=>String(p.careerId||p.id)===id);assert.strictEqual(movedPlayer.rating,60,kind+' must preserve CA');assert.strictEqual(movedPlayer.potential,70,kind+' must preserve PA');assert(movedPlayer.contractEndDate&&movedPlayer.contractYearsAtSigning>=2,kind+' should assign negotiated contract');assert(movedPlayer.wage>=1,kind+' should assign negotiated wage');
 assert(record.from!==record.to,'source and destination must differ');
 if(kind==='efl-to-europe')assert(Math.abs(appState.clubFinances['EFL Seller'].transferBudget-(100+record.fee))<.011,'EFL seller finance budget must be credited');
 if(kind==='europe-to-efl')assert(Math.abs(appState.clubFinances['EFL Buyer'].transferBudget-(100-record.fee))<.011,'EFL buyer finance budget must be debited');
 if(kind==='efl-world-to-europe')assert(Math.abs(CLUBS[2].budget-(100+record.fee))<.011,'canonical EFL seller budget must be credited');
 if(kind==='europe-to-efl-world'){assert(Math.abs(CLUBS[2].budget-(100-record.fee))<.011,'canonical EFL buyer budget must be debited');assert(appState.eflPlayerDatabase.Championship['EFL Buyer'].some(p=>String(p.careerId)===id),'EFL mirror must receive the promoted player');}
 return {scenario:kind,transfer:record,sourceRemaining:all.length,uniqueCareerIdentityCopies:1,CAandPApreserved:true,eflFinanceSynchronized:kind==='efl-to-europe'?Math.abs(appState.clubFinances['EFL Seller'].transferBudget-(100+record.fee))<.011:kind==='europe-to-efl'?Math.abs(appState.clubFinances['EFL Buyer'].transferBudget-(100-record.fee))<.011:kind==='efl-world-to-europe'?Math.abs(CLUBS[2].budget-(100+record.fee))<.011:kind==='europe-to-efl-world'?Math.abs(CLUBS[2].budget-(100-record.fee))<.011:true};
}
const results=['europe-to-europe','wage-budget-block','efl-to-europe','europe-to-efl','europe-to-pl','efl-world-to-europe','europe-to-efl-world'].map(runScenario);
// Verify the actual domestic-entry helper excludes the manager's club from autonomous AI activity.
const helper=extractFunction(html,'aiLoanClubEntries');
const helperState={club:0,worldSquads:[roster(4,'USER'),roster(4,'PLAI'),roster(4,'EFLAI')],eflPlayerDatabase:{Championship:{'EFL AI':roster(4,'EFLDB')}},lowerLeagues:{Championship:{rows:[{name:'EFL AI',strength:55,budget:2}]} }};
const helperClubs=[{name:'User FC',strength:70,division:'Premier League'},{name:'PL AI',strength:60,division:'Premier League'},{name:'EFL AI',strength:55,division:'Championship'}];const helperCtx={appState:helperState,CLUBS:helperClubs,currentClub:()=>({name:'User FC'}),clubDivision:c=>c.division||'Premier League',domesticClubKey:s=>String(s||'').toLowerCase(),Number,Array,Object,Set};
vm.createContext(helperCtx);vm.runInContext(helper,helperCtx);const entries=helperCtx.aiLoanClubEntries();
assert(!entries.some(x=>x.name==='User FC'),'manager club must be excluded');assert(entries.some(x=>x.name==='PL AI')&&entries.some(x=>x.name==='EFL AI'),'PL and EFL AI clubs must be included');assert(entries.find(x=>x.name==='EFL AI').type==='pl'&&entries.find(x=>x.name==='EFL AI').division==='Championship','canonical EFL worldSquads route must be recognized');
results.push({scenario:'manager-exclusion-and-domestic-market-coverage',managerClubExcluded:true,premierLeagueAIIncluded:true,eflAIIncluded:true,canonicalEFLWorldSquadRecognized:true});
// Negotiation-specific edge cases.
const negContext={appState:{seasonYear:2026}};vm.createContext(negContext);vm.runInContext(negotiationFn,negContext);
const player={name:'Test Player',age:22,rating:70,wage:12,contractEndDate:'2027-06-30'};
const buyer={name:'Buyer',strength:65},seller={name:'Seller',strength:60};
const accepted=negContext.aiNegotiateTransferTerms(player,buyer,seller,20,100,99,2026);
assert(accepted.accepted&&accepted.fee<=65&&accepted.fee>0,'negotiation should accept a solvent buyer after bounded counters');
const noBudget=negContext.aiNegotiateTransferTerms(player,buyer,seller,20,5,0,2026);
assert(!noBudget.accepted&&noBudget.reason==='budget-below-reservation','insufficient budget must reject');
const shortContract=negContext.aiNegotiateTransferTerms({...player,contractEndDate:'2026-06-30'},buyer,seller,20,100,99,2026);
const longContract=negContext.aiNegotiateTransferTerms({...player,contractEndDate:'2030-06-30'},buyer,seller,20,100,99,2026);
assert(shortContract.sellerReservation<longContract.sellerReservation,'short contract should lower seller reservation');
const wantsOut=negContext.aiNegotiateTransferTerms({...player,wantsToLeave:true},buyer,seller,20,100,99,2026);
assert(wantsOut.sellerReservation<accepted.sellerReservation,'player desire to leave should lower reservation');
assert(accepted.wageDemand>=1&&accepted.contractYears===4,'young player should receive wage and four-year contract');
results.push({scenario:'negotiation-edge-cases',accepted,insufficientBudgetRejected:!noBudget.accepted,contractLengthInfluencesPrice:shortContract.sellerReservation<longContract.sellerReservation,wantsToLeaveInfluencesPrice:wantsOut.sellerReservation<accepted.sellerReservation});
console.log(JSON.stringify({version:'3.78',tests:results.length,passed:results.length,results},null,2));
