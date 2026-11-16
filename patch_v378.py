from pathlib import Path
p=Path('/mnt/data/cm378_work/index.html')
s=p.read_text()
marker='function processAIEuropeanTransfers(week=appState.week){'
assert s.count(marker)==1
helper=r'''// v3.78: bounded AI negotiation simulation. Pure calculation; no roster or budget mutation.
function aiNegotiateTransferTerms({player,buyer,seller,askingPrice,buyerBudget,seed=0,season=Number(appState.seasonYear)||2026}){
 const age=Math.max(16,Number(player?.age)||25),rating=Math.max(1,Number(player?.rating)||50);
 const asking=Math.max(.15,Number(askingPrice)||.15),budget=Math.max(0,Number(buyerBudget)||0);
 const endYear=Number(String(player?.contractEndDate||'').slice(0,4));
 const remaining=endYear?endYear-Number(season):2;
 const wantsOut=!!player?.wantsToLeave;
 const sellerStrength=Number(seller?.strength)||60,buyerStrength=Number(buyer?.strength)||60;
 let reservation=asking*(remaining<=0?.72:remaining===1?.86:remaining>=3?1.08:1);
 if(wantsOut)reservation*=.88;
 if(age>=32)reservation*=.91;
 if(rating<(sellerStrength-8))reservation*=.94;
 const budgetLimit=budget*.65;
 let offer=Math.min(budgetLimit,asking*(.84+(Math.abs(Number(seed)||0)%100)/1000));
 let rounds=0;
 while(offer+1e-9<reservation&&rounds<2&&offer<budgetLimit){
  rounds++;
  offer=Math.min(budgetLimit,offer*(rounds===1?1.075:1.065));
 }
 const accepted=budget>=.2&&offer>=reservation&&offer>=.15;
 const baseWage=Math.max(Number(player?.wage)||0,Math.round(Math.max(1,rating-32)*.68));
 const ambition=buyerStrength>=sellerStrength+8?1.08:buyerStrength<sellerStrength-8?.96:1;
 const ageFactor=age<=23?1.06:age>=32?.94:1;
 const wageDemand=Math.max(1,Math.round(baseWage*ambition*ageFactor));
 const contractYears=age>=33?2:age<=23?4:3;
 return {accepted,fee:accepted?+offer.toFixed(2):0,askingPrice:+asking.toFixed(2),sellerReservation:+reservation.toFixed(2),rounds,wageDemand,contractYears,remainingContractYears:remaining,reason:accepted?'accepted':budgetLimit<reservation?'budget-below-reservation':'seller-rejected'};
}
'''
s=s.replace(marker,helper+marker)
old="""  const value=Math.max(.15,Number(player.value)||Math.max(.2,((Number(player.rating||55)-45)**2)/100));
  const statusGap=buyerStrength-sellerStrength,multiplier=statusGap>8?1.12:statusGap< -8?1.28:1;
  const asking=value*multiplier*(Number(player.age||25)<22?1.12:1),budget=getBudget(buyer);
  const fee=+(Math.min(asking,budget*.65)).toFixed(2);
  if(budget<.2||fee<.15||fee>budget)continue;
"""
new="""  ensurePlayerContract(player,season);
  const value=Math.max(.15,Number(player.value)||Math.max(.2,((Number(player.rating||55)-45)**2)/100));
  const statusGap=buyerStrength-sellerStrength,multiplier=statusGap>8?1.12:statusGap< -8?1.28:1;
  const asking=value*multiplier*(Number(player.age||25)<22?1.12:1),budget=getBudget(buyer);
  const negotiation=aiNegotiateTransferTerms({player,buyer,seller,askingPrice:asking,buyerBudget:budget,seed:stableSeed(`${careerId}|${buyer.name}|${seller.name}|${season}|${week}|${n}`),season});
  if(!Array.isArray(appState.aiNegotiationHistory))appState.aiNegotiationHistory=[];
  const buyerWages=buyer.roster.reduce((sum,p)=>sum+(Number(p.wage)||0),0);
  const buyerFinance=appState.clubFinances?.[buyer.name];
  const wageBudget=Number(buyerFinance?.wageBudget)||Number(buyer.meta?.wageBudget)||0;
  const wageRoom=wageBudget>0?Math.max(0,wageBudget-buyerWages):Math.max(negotiation.wageDemand,Math.round((buyer.roster.map(p=>Number(p.wage)||0).filter(x=>x>0).sort((a,b)=>a-b)[Math.floor(buyer.roster.filter(p=>(Number(p.wage)||0)>0).length/2)]||negotiation.wageDemand)*1.45));
  if(!negotiation.accepted||negotiation.wageDemand>wageRoom*1.12){
   appState.aiNegotiationHistory.push({playerName:player.name,playerCareerId:careerId,from:seller.name,to:buyer.name,season,week,askingPrice:negotiation.askingPrice,offeredPrice:negotiation.fee||+(Math.min(budget*.65,asking).toFixed(2)),rounds:negotiation.rounds,wageDemand:negotiation.wageDemand,accepted:false,reason:negotiation.accepted?'wage-budget':'seller-rejected'});
   if(appState.aiNegotiationHistory.length>500)appState.aiNegotiationHistory=appState.aiNegotiationHistory.slice(-500);
   continue;
  }
  const fee=negotiation.fee;
  if(budget<.2||fee<.15||fee>budget)continue;
"""
assert s.count(old)==1, 'fee block not unique'
s=s.replace(old,new)
old2="""  const incoming={...outPlayer,careerId,id:`AIEU77-${season}-${week}-${n}-${stableSeed(careerId+'|'+buyer.name)}`,
   clubIndex:buyer.type==='pl'?buyer.index:-1,clubName:buyer.name,internationalClub:buyer.type==='european',
   fitness:Number(outPlayer.fitness??90),morale:Math.max(50,Number(outPlayer.morale??70)),freeAgent:false};
"""
new2="""  const incoming={...outPlayer,careerId,id:`AIEU78-${season}-${week}-${n}-${stableSeed(careerId+'|'+buyer.name)}`,
   clubIndex:buyer.type==='pl'?buyer.index:-1,clubName:buyer.name,internationalClub:buyer.type==='european',
   fitness:Number(outPlayer.fitness??90),morale:Math.max(50,Number(outPlayer.morale??70)),freeAgent:false,
   wage:negotiation.wageDemand,contractEndDate:`${season+negotiation.contractYears}-06-30`,contractYearsAtSigning:negotiation.contractYears,
   contractNegotiationStatus:'ai-transfer-agreed'};
"""
assert s.count(old2)==1
s=s.replace(old2,new2)
old3="""  appState.transferHistory.push({type:'ai-european-market',playerName:outPlayer.name,playerCareerId:careerId,from:seller.name,to:buyer.name,fee,week,seasonYear:season,
"""
new3="""  appState.aiNegotiationHistory.push({playerName:outPlayer.name,playerCareerId:careerId,from:seller.name,to:buyer.name,season,week,askingPrice:negotiation.askingPrice,fee,rounds:negotiation.rounds,wage:negotiation.wageDemand,contractYears:negotiation.contractYears,accepted:true,reason:'agreed'});
  if(appState.aiNegotiationHistory.length>500)appState.aiNegotiationHistory=appState.aiNegotiationHistory.slice(-500);
  appState.transferHistory.push({type:'ai-european-market',playerName:outPlayer.name,playerCareerId:careerId,from:seller.name,to:buyer.name,fee,week,seasonYear:season,
"""
assert s.count(old3)==1
s=s.replace(old3,new3)
s=s.replace('TOUCHLINE EDITION · v3.77 ·','TOUCHLINE EDITION · v3.78 ·')
s=s.replace('// v3.77: extend the AI international market across European, Premier League and EFL canonical rosters.','// v3.77: extend the AI international market across European, Premier League and EFL canonical rosters.\n// v3.78: add bounded price, wage and contract negotiations to international AI transfers.')
p.write_text(s)
print('patched',len(s),'chars')
