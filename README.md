# CM Mobile v3.74 – AI Academy Pathways & Senior Promotion

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – this file.
- `CHANGELOG_v3.74.md` – release changes.
- `AI_ACADEMY_PATHWAY_REPORT_v3.74.md` – implementation, findings and limitations.
- `AI_ACADEMY_PATHWAY_TEST_RESULTS_v3.74.json` – targeted and ten-season validation results.
- `academy_pathway_tests_v374.js` – targeted promotion and safety tests.
- `academy_season_integration_v374.js` – real annual academy-processing hook test.
- `academy_long_horizon_v374.js` – ten-season, 24-club academy pathway simulation.
- v3.73 strategic squad-planning reports and test harnesses.
- v3.72 transfer-market reports and test harnesses.
- v3.71/v3.70 progression reports and test results.
- v3.69 player-generation model reference and player-quality baseline.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – retained database script; no schema changes in v3.74.

## What changed

AI clubs can now promote suitable 17–19-year-old academy graduates into the senior squad at the annual season transition. Promotion depends on age, a completed academy season, player ability relative to club strength, positional need or quality improvement, available squad capacity and wage capacity. The highest-rated eligible prospects are considered first, with at most one promotion per AI club per season. EFL roster mirrors are synchronized after promotion.

Players who do not qualify continue through the existing academy release process. The manager-controlled club's academy process is unchanged.

## Publishing

1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.74 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety

- No mass player rebalance or regeneration.
- No CA/PA recalibration.
- Existing player career identities, attributes, potential and development metadata are preserved on promotion.
- The user's academy flow is unchanged; autonomous promotions skip the manager-controlled club.
- Promotion history is bounded to the latest 500 records.

## Test limitations

The included Node harnesses execute extracted application functions with controlled state. They are not a full browser UI test, Supabase round-trip, or complete match/loan simulation. See `AI_ACADEMY_PATHWAY_REPORT_v3.74.md`.
