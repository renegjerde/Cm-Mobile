# CM Mobile v3.78 – AI Transfer Negotiations

## Release contents
- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.78.md` – release changes.
- `AI_TRANSFER_NEGOTIATION_REPORT_v3.78.md` – implementation, validation and limitations.
- `AI_NEGOTIATION_TEST_RESULTS_v3.78.json` – eight targeted tests.
- `REGRESSION_SUITE_SUMMARY_v3.78.json` – retained regression results.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.78.json` – inline JavaScript syntax checks.
- `ai_european_market_tests_v378.js` – transfer and negotiation test harness.
- Previous version changelogs, reports, test harnesses and result files.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – unchanged SQL script.

## What changed
The international AI market now negotiates transfer fees using a seller reservation price influenced by contract length, age, player quality and willingness to leave. Buyers may make a bounded opening offer and up to two counters. An agreement assigns a weekly wage and age-sensitive contract term. Wage affordability uses club-finance data where available and a squad-wage proxy for European clubs without explicit wage-budget fields.

Negotiation history is retained in `appState.aiNegotiationHistory` with a 500-entry cap.

## Publishing
1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.78 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety
- No mass player rebalance, regeneration or CA/PA recalibration.
- Career identity, attributes, career history and statistics remain intact during transfers.
- Existing domestic and manual transfer workflows remain in place.
- Manager-controlled club remains excluded from autonomous international AI transfers.
- No database schema changes.

## Test limitations
Nine targeted transfer/negotiation checks and fourteen retained regression suites passed. All three inline JavaScript blocks passed syntax validation. These are controlled Node tests, not a full browser UI test, a full 20-season all-club simulation or a Supabase round-trip. See `AI_TRANSFER_NEGOTIATION_REPORT_v3.78.md`.
