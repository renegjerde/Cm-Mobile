# CM Mobile v3.73 – AI Squad Planning & Generational Turnover

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – this file.
- `CHANGELOG_v3.73.md` – v3.73 changes.
- `AI_SQUAD_PLANNING_REPORT_v3.73.md` – design, findings and limitations.
- `AI_SQUAD_PLANNING_TEST_RESULTS_v3.73.json` – targeted and ten-season validation results.
- `world_planning_tests_v373.js` – targeted squad-planning and contract-renewal tests.
- `long_horizon_planning_tests_v373.js` – ten-season, 24-club renewal simulation.
- `ai_transfer_tests_v372.js` – retained transfer and contract-expiry regression harness.
- `AI_TRANSFER_TEST_RESULTS_v3.72.json` – previous transfer-market test results.
- `world_development_tests_v372_regression.js` – retained player-progression regression harness.
- `WORLD_DEVELOPMENT_REGRESSION_RESULTS_v3.72.json` – previous progression test results.
- Prior v3.70/v3.71 reports, model references and the UEFA player database snapshot.
- `supabase_cm_mobile.sql` – retained database script; no schema changes in v3.73.

## What changed

AI clubs now assess positional quality as well as headcount when choosing transfer needs. Season-end contract renewals consider club strength, squad role, age, academy succession and wage capacity. Renewals run before the existing contract-expiry cleanup. EFL market rosters are synchronized after renewals.

## Publishing

1. Back up the current repository and any career data before replacing files.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.73 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety

- No mass player rebalance or player identity regeneration.
- No CA/PA recalibration.
- No replacement of existing career IDs, player attributes or player histories.
- AI renewal history is bounded to the latest 20 season records; each record stores at most 100 player summaries.
- The manager-controlled club is excluded from AI renewals.

## Test limitations

The included Node harnesses exercise actual extracted application functions with controlled state. They are not a full browser UI test, Supabase round-trip, or complete simulation of all leagues over 20 seasons. See `AI_SQUAD_PLANNING_REPORT_v3.73.md` for details.
