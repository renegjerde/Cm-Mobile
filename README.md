# CM Mobile v3.80 – UEFA Prize Money & Competition Economics

## Release contents
- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.80.md` – release changes.
- `AI_COMPETITION_REVENUE_REPORT_v3.80.md` – implementation, validation and limitations.
- `uefa_prize_distribution_tests_v380.js` – focused AI prize-distribution test harness.
- `user_uefa_prize_parity_v380.js` – manager-club UEFA prize parity test harness.
- `UEFA_PRIZE_DISTRIBUTION_TEST_RESULTS_v3.80.json` – focused AI test output.
- `UEFA_USER_PRIZE_PARITY_RESULTS_v3.80.json` – manager-club prize parity output.
- `REGRESSION_SUITE_SUMMARY_v3.80.json` – retained regression results.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.80.json` – inline JavaScript syntax checks.
- Previous version changelogs, reports, test harnesses and result files.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – unchanged SQL script.

## What changed
AI clubs now receive UEFA competition participation, league-phase result, knockout progression, finalist and champion payments at season end. Rewards are routed to the existing PL, EFL or European transfer-budget field. A separate idempotency ledger prevents duplicate payments. The manager's club remains excluded from the AI payout path. Its existing reward path now correctly pays finalist rewards and maps each knockout stage to the matching amount.

A pending European user fixture must now be completed before the next season can begin, ensuring a final is not skipped before prize distribution.

## Publishing
1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.80 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety
- No mass player rebalance, regeneration or CA/PA recalibration.
- Existing player identities, squads, contracts and career histories are preserved.
- Existing manager-club prize rewards are not paid a second time by the AI distribution path.
- No database schema, finance-version or SQL migration.

## Test limitations
The focused prize harness, retained finance/transfer/loan/academy/development regressions, and inline script syntax checks passed. These are controlled Node tests, not a full browser UI test, a complete multi-decade all-club simulation or a Supabase round-trip. See `AI_COMPETITION_REVENUE_REPORT_v3.80.md`.
