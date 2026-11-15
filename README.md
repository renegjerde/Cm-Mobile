# CM Mobile v3.76 – European Youth Pathways & AI Loan Monitoring

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.76.md` – release changes.
- `AI_EUROPEAN_YOUTH_LOAN_MONITOR_REPORT_v3.76.md` – implementation, validation and limitations.
- `AI_YOUTH_LOAN_MONITOR_TEST_RESULTS_v3.76.json` – targeted European academy and loan-monitor tests.
- `EUROPEAN_ACADEMY_INTEGRATION_RESULTS_v3.76.json` – annual European academy integration test.
- `AI_LOAN_LONG_HORIZON_RESULTS_v3.76.json` – ten-season controlled loan lifecycle simulation.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.76.json` – JavaScript syntax checks.
- `ai_youth_loan_monitor_tests_v376.js` – targeted test harness.
- `european_academy_integration_v376.js` – European academy season integration harness.
- `ai_loan_tests_v376_regression.js` – retained PL/EFL loan regression harness.
- `ai_loan_long_horizon_v376.js` – ten-season loan lifecycle harness.
- Previous v3.75, v3.74, v3.73, v3.72 and v3.71 implementation reports and test assets.
- v3.69 player-generation model reference and v3.68 player-quality baseline.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – retained SQL script; no schema changes in v3.76.

## What changed

European clubs with persistent European transfer rosters now participate in the annual rival academy pathway. Their youth prospect ability is scaled to the club's strength, and eligible graduates can be promoted into the canonical European roster without losing career identity or player attributes.

AI-managed domestic loans are now monitored from gameweek 20. A loanee with fewer than two appearances and fewer than 180 minutes is recalled to the parent club. Loan spell statistics are archived and the recall is recorded. Players with meaningful minutes remain on loan until the scheduled end date.

## Publishing

1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.76 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety

- No mass player rebalance or regeneration.
- No CA/PA recalibration.
- No player career identity rewrite.
- Manager-controlled club remains excluded from autonomous AI academy promotion and AI loans.
- Existing manual loan workflow remains unchanged.
- European AI loans are not included yet; European individual match-minute data is not sufficiently consistent for reliable recall monitoring.

## Test limitations

The included Node harnesses execute extracted application functions with controlled state. They are not a full browser UI test, Supabase round-trip or a complete simulation of every league fixture. See `AI_EUROPEAN_YOUTH_LOAN_MONITOR_REPORT_v3.76.md`.
