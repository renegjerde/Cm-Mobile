# CM Mobile v3.79 – European Club Economy

## Added
- Permanent European transfer squads now participate in weekly operating cash flow on the same preseason and league-week cadence as Premier League and EFL clubs.
- European clubs receive modeled weekly operating revenue based on club strength, stadium-size proxy and commercial factor.
- European first-team wage bills are deducted from weekly operating revenue.
- European transfer budgets are synchronized with the existing `europeanTransferClubData[name].budget` field, which remains the authoritative cash/budget value used by the transfer market.
- European club wage budgets are initialized from club level and actual roster wages, then reviewed annually with a bounded year-on-year adjustment.
- European club budgets have strength-tier ceilings and a limited downside buffer to prevent unlimited accumulation or unbounded negative balances.
- European financial records are included in the existing `appState.clubFinances` save object; no new database table or schema field is required.

## Preserved
- Premier League and EFL weekly finance paths remain unchanged.
- Existing English club budgets and wage policy are not reset by this release.
- Existing European transfer budgets are read from the existing club metadata before the finance mirror is synchronized.
- Player identities, squads, CA, PA, attributes, contracts and career histories are not recalibrated or regenerated.
- No database schema change, SQL migration, or finance-version migration.

## Validation
- 14 targeted European finance assertions passed across two controlled club profiles.
- Five retained regression harnesses passed: international transfer/negotiation, youth-loan monitoring, academy pathways, ten-season squad planning, and player development.
- All three inline script blocks passed `node --check`.
- `supabase_cm_mobile.sql` is byte-identical to v3.78.
- Release ZIP integrity/CRC verified.

## Limitations
- European revenue is a simulation proxy, not audited club accounts. It uses strength tiers, a stadium-size proxy and commercial factors; it does not model country-specific broadcasting contracts, attendance by fixture, tax, debt interest, owner investment, UEFA prize distributions or administration.
- The financial engine is not a full insolvency model. Budget ceilings and downside buffers limit runaway values, but there are no formal points deductions, receivership or club liquidation events.
- No full browser UI test or Supabase round-trip test is claimed.
