# CM Mobile v3.80 – UEFA Prize Money & Competition Economics

## Added
- UEFA competition participation payments are distributed to all eligible participating AI clubs at season end for the Champions League, Europa League and Conference League.
- AI clubs receive modeled UEFA league-phase win/draw rewards based on recorded match results.
- Knockout progression rewards are paid once per club and tie/stage; finalists and champions receive the corresponding final/champion rewards.
- Prize money is credited to the correct financial source: Premier League club budget, EFL club budget, or permanent European club transfer budget.
- A separate persisted `clubCompetitionPrizeLedger` uses season + club + competition component keys to prevent duplicate payments.
- Prize distributions are summarized in `lastEuropeanPrizeDistribution` and the season summary.
- Starting a new season is blocked while a user-controlled European fixture is still pending, ensuring the final result and prize calculation are not skipped.

## Preserved
- The manager's club is excluded from the new AI payout path to avoid double-paying rewards already handled by the existing user competition prize system.
- The existing manager-club knockout reward mapping is aligned with the same stage schedule: playoff, round of 16, quarter-final, semi-final, finalist and champion. This also corrects the prior overpayment of champion rewards for semi-final wins and ensures losing finalists receive finalist payments.
- Existing competition prize values and UEFA competition formats are unchanged.
- Existing player identities, squads, contracts, CA/PA, attributes and career histories are unchanged.
- No SQL, database schema, or finance-version migration.

## Validation
- 9 focused AI UEFA prize-distribution assertions passed, including Premier League, EFL and European budget destinations, finalist/champion rewards, manager-club exclusion and idempotent repeat execution.
- 4 manager-club UEFA prize parity assertions passed, including losing finalist, champion and semi-final reward amounts.
- 14 existing European finance assertions passed.
- 9 international transfer/negotiation tests passed.
- Retained loan, youth-loan monitoring, European academy, academy pathway, 10-season squad planning and 10-season player development regression suites passed.
- All three inline JavaScript blocks passed `node --check`.
- `supabase_cm_mobile.sql` remains byte-identical to v3.79.
- Release ZIP CRC/integrity verified.

## Limitations
- Prize values are the existing modeled values in the game, expressed in £m; they are not a claim to reproduce the exact UEFA distribution formula or real-world current payments.
- Domestic league and domestic cup AI prize distributions are not expanded in this release.
- Tax, solidarity payments, coefficient shares, market-pool distributions, country-specific broadcasting contracts and full club insolvency remain outside scope.
- No full browser UI test or Supabase round-trip test is claimed.
