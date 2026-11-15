# CM Mobile v3.71 – World Development Balance

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – this file.
- `CHANGELOG_v3.71.md` – v3.71 changes.
- `WORLD_DEVELOPMENT_BALANCE_REPORT_v3.71.md` – findings, design and limitations.
- `WORLD_DEVELOPMENT_TEST_RESULTS_v3.71.json` – synthetic cohort results and invariants.
- `world_development_tests_v371.js` – reproducible Node test harness.
- `PLAYER_PROGRESSION_LIFECYCLE_REPORT_v3.70.md` – previous lifecycle report.
- `LIFECYCLE_TEST_RESULTS_v3.70.json` – previous lifecycle scenarios.
- `PROGRESSION_REGRESSION_TESTS_v3.70.json` – previous progression regression checks.
- `PLAYER_GENERATION_MODEL_v3.69.md` – retained player-generation model reference.
- `PLAYER_QUALITY_BASELINE_v3.68.md` – prior quality baseline.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – embedded UEFA reference snapshot.
- `supabase_cm_mobile.sql` – unchanged database script.

## Publish

1. Extract this ZIP.
2. Replace the application files in the existing GitHub repository with the included release files.
3. Publish the commit.
4. Open the existing career and confirm that it loads and saves.

Do not rerun `supabase_cm_mobile.sql`; v3.71 introduces no database schema change.

## Data safety

- No bulk player rebalance or player identity replacement is performed.
- Existing player attributes are not regenerated.
- The v3.70 generated-player CA/attribute synchronization remains limited to profiles with v3.69 model provenance.
- Match development is shared by manager and simulated AI pathways and is capped by PA.
- Youth academy prospects receive one controlled annual development opportunity after a completed academy season.
- Recent fixture keys are retained per player to prevent duplicate development without unbounded save growth.

## Testing

Run the v3.71 progression tests with Node.js:

```bash
node world_development_tests_v371.js
```

The tests cover synthetic match-development cohorts, academy cohorts, idempotency, PA limits and source integration checks. They are not a substitute for a live browser career-save test or Supabase round-trip.
