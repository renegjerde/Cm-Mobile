from pathlib import Path
p=Path('/mnt/data/cm378_work/index.html')
s=p.read_text()
# version label
s=s.replace('TOUCHLINE EDITION · v3.78 ·','TOUCHLINE EDITION · v3.79 ·')
# Insert European finance helpers before initClubFinances
anchor='function initClubFinances(force=false){'
assert s.count(anchor)==1
helpers=r'''function europeanWeeklyOperatingRevenueM(clubName,strength=60){
 // Conservative revenue tiers for the permanent UEFA roster universe; values are £m/week.
 const s=Number(strength)||60;
 const base=s>=84?.92:s>=78?.66:s>=72?.43:s>=66?.29:s>=60?.19:s>=54?.12:s>=48?.075:.045;
 const capacity=clubStadiumCapacity(clubName,'Europe');
 const stadium=Math.max(.68,Math.min(1.38,Math.pow(capacity/30000,.30)));
 const commercial=clubCommercialFactor(clubName,s);
 return +(base*stadium*commercial).toFixed(3);
}
function europeanClubWageBudgetBase(strength){
 const s=Number(strength)||55;
 return Math.max(8,Math.round(42*Math.pow(Math.max(38,s)/65,2.05)));
}
function ensureEuropeanClubFinanceRecords(){
 if(!appState.clubFinances||typeof appState.clubFinances!=='object')appState.clubFinances={};
 for(const [name,roster] of Object.entries(appState.europeanTransferSquads||{})){
  if(!Array.isArray(roster))continue;
  const meta=appState.europeanTransferClubData?.[name]||{};
  const strength=Number(meta.strength)||58;
  const f=appState.clubFinances[name]||(appState.clubFinances[name]={division:'Europe',transferBudget:Number(meta.budget)||.2,wageBudget:europeanClubWageBudgetBase(strength),wageBill:0,financialStatus:'stable'});
  f.division='Europe';
  if(!Number.isFinite(Number(f.transferBudget)))f.transferBudget=Number(meta.budget)||.2;
  if(!Number.isFinite(Number(meta.budget)))meta.budget=Number(f.transferBudget)||.2;
  const wageBill=roster.reduce((sum,p)=>sum+(Number(p?.wage)||0),0);
  f.wageBill=wageBill;
  if(!f.wageBudgetInitialized){f.wageBudget=Math.max(europeanClubWageBudgetBase(strength),Math.ceil(wageBill/.88));f.wageBudgetInitialized=true;}
  f.financialStatus=wageBill>Number(f.wageBudget||0)?'under-pressure':'stable';
  if(appState.europeanTransferClubData?.[name])appState.europeanTransferClubData[name].budget=Number(f.transferBudget)||0;
 }
}
function reviewEuropeanClubFinancesForNewSeason(){
 ensureEuropeanClubFinanceRecords();
 for(const [name,roster] of Object.entries(appState.europeanTransferSquads||{})){
  if(!Array.isArray(roster))continue;
  const meta=appState.europeanTransferClubData?.[name]||{};
  const strength=Number(meta.strength)||58;
  const f=appState.clubFinances[name];
  const oldBudget=Math.max(1,Number(f.wageBudget)||europeanClubWageBudgetBase(strength));
  const wageBill=roster.reduce((sum,p)=>sum+(Number(p?.wage)||0),0);
  const revenue=europeanWeeklyOperatingRevenueM(name,strength);
  const cash=Number(meta.budget??f.transferBudget)||0;
  const cashFactor=cash<0?.88:cash>35?1.06:cash>12?1.025:cash<2?.94:1;
  const incomeFactor=Math.max(.88,Math.min(1.12,.94+revenue/.9*.08));
  let target=europeanClubWageBudgetBase(strength)*cashFactor*incomeFactor;
  target=Math.max(oldBudget*.88,Math.min(oldBudget*1.12,target));
  target=Math.max(6,Math.round(target));
  f.division='Europe';f.wageBill=wageBill;f.wageBudget=target;f.wageBudgetInitialized=true;
  f.wageBudgetReviewedSeason=Number(appState.seasonYear)||2027;
  f.weeklyIncomeM=revenue;f.weeklyNetM=+(revenue-wageBill/1000).toFixed(3);
  f.transferBudget=cash;f.financialStatus=wageBill>target?'under-pressure':cash<0?'under-pressure':'stable';
  f.lastSeasonReview={season:(Number(appState.seasonYear)||2027)-1,division:'Europe',weeklyIncomeM:revenue,wageBill,wageBudget:target,transferBudget:cash,reputation:Number(meta.strength)||strength};
 }
}
'''
s=s.replace(anchor,helpers+anchor)
# Add call to ensure European finance records in init after EFL finance map construction / before own
needle=" const own=appState.clubFinances[currentClub().name];"
assert s.count(needle)==1
s=s.replace(needle," ensureEuropeanClubFinanceRecords();\n"+needle)
# Annual review call before version markers
needle=" appState.financeVersion=FINANCE_VERSION;appState.wagePolicyVersion=WAGE_POLICY_VERSION;\n}"
assert s.count(needle)==1
s=s.replace(needle," reviewEuropeanClubFinancesForNewSeason();\n"+needle)
# Add European weekly accounting before closing processWeeklyClubEconomy
needle="   club.budget=Math.max(.05,+(Number(club.budget||0)+netM).toFixed(2));finance.transferBudget=club.budget;finance.weeklyIncomeM=revenueM;finance.wageBill=weeklyK;finance.weeklyNetM=netM;finance.weeklyEconomyInitializedBefore=true;\n  }\n }\n}\nfunction payWeeklyWages()"
assert s.count(needle)==1
replacement="""   club.budget=Math.max(.05,+(Number(club.budget||0)+netM).toFixed(2));finance.transferBudget=club.budget;finance.weeklyIncomeM=revenueM;finance.wageBill=weeklyK;finance.weeklyNetM=netM;finance.weeklyEconomyInitializedBefore=true;
  }
 }
 // Permanent European squads also earn operating income and pay their weekly first-team wages.
 // This runs on the same preseason and league-week cadence as the English clubs.
 ensureEuropeanClubFinanceRecords();
 for(const [clubName,roster] of Object.entries(appState.europeanTransferSquads||{})){
  if(!Array.isArray(roster))continue;
  const meta=appState.europeanTransferClubData?.[clubName]||{};
  const finance=appState.clubFinances[clubName]||(appState.clubFinances[clubName]={division:'Europe',transferBudget:Number(meta.budget)||.2,wageBudget:europeanClubWageBudgetBase(meta.strength),wageBill:0});
  const weeklyK=roster.reduce((sum,p)=>sum+(Number(p?.wage)||0),0);
  const revenueM=europeanWeeklyOperatingRevenueM(clubName,meta.strength);
  const netM=+(revenueM-weeklyK/1000).toFixed(3);
  const cash=Number(meta.budget??finance.transferBudget)||0;
  const nextCash=+(cash+netM).toFixed(2);
  meta.budget=nextCash;finance.transferBudget=nextCash;finance.division='Europe';
  finance.weeklyIncomeM=revenueM;finance.wageBill=weeklyK;finance.weeklyNetM=netM;
  finance.financialStatus=weeklyK>Number(finance.wageBudget||0)||nextCash<0?'under-pressure':'stable';
  finance.weeklyEconomyInitializedBefore=true;
 }
}
function payWeeklyWages()"""
s=s.replace(needle,replacement)
p.write_text(s)
print('patched',len(s),'chars')
