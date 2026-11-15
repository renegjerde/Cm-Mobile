# CM Mobile v3.78 – AI Transfer Negotiations

## Added
- International AI transfers now use a bounded negotiation calculation rather than paying a fixed asking-price multiplier.
- Seller reservation price is influenced by remaining contract length, player age, player rating relative to the selling club, and whether the player wants to leave.
- Buyer offers start below the asking price and may use up to two deterministic counter-offer steps.
- Negotiations are rejected when the buyer's transfer-budget ceiling cannot meet the seller's reservation price.
- Incoming players receive a negotiated weekly wage and an age-sensitive contract term (2–4 years).
- Existing wage-budget data is checked before agreement; where a European club has no separate wage-budget field, affordability is approximated against the club's current squad wage level.
- Negotiation outcomes are recorded in `appState.aiNegotiationHistory`, capped at 500 entries.
- Buyer and seller wage-bill figures are updated where club-finance records exist.

## Preserved
- Existing European / Premier League / EFL transfer routes.
- Manager-controlled club remains excluded from autonomous international AI deals.
- Player career identity, CA, PA, attributes, career history and statistics are preserved.
- No player regeneration, mass rebalance, database schema change or SQL migration.

## Validation
- 9 targeted tests: six international transfer routes, manager-club exclusion/market coverage, negotiation edge cases, and wage-budget rejection.
- 14 retained regression suites passed.
- All three inline JavaScript blocks passed `node --check`.
- SQL script byte-identical to v3.77.
- Release ZIP CRC/integrity verified.

## Limitations
- This is a deterministic, bounded AI negotiation model, not a live multi-agent bargaining simulation.
- It does not yet model agents, signing bonuses, appearance bonuses, sell-on clauses, release clauses, player personality, country-specific transfer windows or UEFA registration limits.
- European club wage budgets are not consistently represented in the existing data; where absent, a squad-wage-level proxy is used.
- No full browser UI test or Supabase round-trip test is claimed.
