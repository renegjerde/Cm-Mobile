# CM Mobile v3.73 – AI Squad Planning & Generational Turnover

## AI squad planning

- Added `aiSquadStrategicPlan`, which evaluates positional headcount and the number of credible senior options relative to club strength.
- AI league transfer buyers can now be selected for a quality shortage as well as a raw positional vacancy. This prevents a nominally full squad from being treated as complete when several players in a position group are below the club's competitive level.
- Free-agent recruitment uses the same strategic need assessment, while retaining the existing squad-size, wage, age, rating-band and one-signing-per-season safeguards.
- Seller shortlists still require positional surplus, but now prefer fringe/ageing players over established high-value core players.

## AI contract renewals

- Added a season-end AI contract-renewal pass before expired contracts are processed.
- Renewal decisions consider club strength, positional importance, player age, contract expiry, wage capacity, player exit requests and available academy succession options.
- Established players receive bounded extensions; older outfield players are not renewed indefinitely, and a credible academy successor can reduce the need to renew an ageing reserve.
- Wage commitments are checked against the club's wage budget with a 12% tolerance. The model does not raise the budget to force a renewal.
- Renewal history is retained with bounded storage, and EFL world-roster changes are mirrored to the EFL market registry.

## Save and data compatibility

- No SQL schema changes.
- No player identity replacement, mass player rebalance or generated-player labels.
- Existing career IDs, attributes, CA/PA, player histories and transfer histories are preserved.
- The AI renewal pass runs before the existing contract-expiry cleanup so eligible players can renew rather than being released prematurely.
- Do not rerun `supabase_cm_mobile.sql`.

## Validation

- All three inline JavaScript blocks pass `node --check`.
- Targeted v3.73 tests cover quality gaps in otherwise full squads, renewal eligibility, veteran succession, wage limits, same-season renewal guards and the season-end integration.
- A ten-season simulation covers 24 AI clubs and 576 initial players, with contract renewals, contract expiry, roster-size checks, career-ID uniqueness and wage-budget ceilings.
- v3.72 AI transfer/contract-expiry tests and v3.71 progression regression tests were rerun against the v3.73 source.
- ZIP CRC integrity was checked before release.

## Limitations

- This is a controlled simulation of the planning/renewal functions, not a full browser career run or a 20-season simulation of every domestic and European club.
- Renewal acceptance is modeled by deterministic squad/financial rules rather than full agent negotiations, player personality, promises or signing bonuses.
- The existing AI market still uses a simplified transfer-fee and buyer/seller model. Tactical-system fit, agent bidding wars, cross-league wage negotiations and a fully autonomous youth-promotion decision remain future work.
