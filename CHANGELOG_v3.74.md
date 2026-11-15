# CM Mobile v3.74 – AI Academy Pathways & Senior Promotion

## Changes

- AI-controlled clubs can now promote suitable academy graduates into their senior squad at the annual season transition.
- Promotion is limited to players aged 17–19 who have completed at least one full academy season.
- The prospect must meet a club-strength threshold and either fill a positional shortage or provide a clear quality upgrade.
- The best-rated eligible prospects are evaluated first; at most one academy promotion is allowed per AI club per season.
- Squad size is capped at 24 for this pathway, and the proposed wage is checked against the club's existing wage budget.
- Premier League/EFL clubs use their canonical `worldSquads` roster, with the existing EFL mirror synchronized. Lower-league clubs use their canonical EFL player database roster.
- Career identity, potential, attributes and development history are preserved when the prospect moves into the senior squad.
- If a prospect ages beyond the academy limit without meeting promotion criteria, the existing free-agent release path remains in place.
- The manager-controlled club's academy process is unchanged.

## Compatibility

- No database schema or SQL changes.
- No mass player rebalance or regeneration.
- Existing saves are handled by the current academy season-transition path; the new promotion history is created only when a promotion occurs.
- Do not rerun `supabase_cm_mobile.sql`.

## Validation

See `AI_ACADEMY_PATHWAY_TEST_RESULTS_v3.74.json`, `academy_pathway_tests_v374.js` and `academy_long_horizon_v374.js`.
