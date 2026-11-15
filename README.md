# CM Mobile v3.70 – Player Progression Synchronization

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – this file.
- `CHANGELOG_v3.70.md` – v3.70 changes.
- `PLAYER_PROGRESSION_LIFECYCLE_REPORT_v3.70.md` – ten-season test findings.
- `LIFECYCLE_TEST_RESULTS_v3.70.json` – detailed synthetic scenario results.
- `PROGRESSION_REGRESSION_TESTS_v3.70.json` – regression assertions.
- `lifecycle_tests.js` – reproducible Node test harness.
- `PLAYER_GENERATION_MODEL_v3.69.md` – the v3.69 generation model retained for reference.
- `PLAYER_QUALITY_BASELINE_v3.68.md` – prior audit baseline.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – embedded UEFA reference snapshot.
- `supabase_cm_mobile.sql` – unchanged database script from v3.69.

## Publish

1. Extract this ZIP.
2. Replace the application files in the existing GitHub repository with the included release files.
3. Publish the commit.
4. Open the existing career and confirm it loads and saves.

Do not rerun `supabase_cm_mobile.sql`; v3.70 introduces no database schema change.

## Data safety

- No bulk player rebalance is run.
- A player is attribute-synchronized only when their model metadata identifies the v3.69 generated role-archetype model and their CA changes through normal development or ageing.
- Legacy player attributes are left untouched by the new synchronizer.
- The corrected EFL fallback generator affects newly generated players when that fallback path is used.

## Testing

The release passed inline JavaScript syntax checking, v3.69 model tests, constructor tests, 24 ten-season scenarios, and 6,400 role-synchronization regression checks. This does not replace a live browser, campaign-save or full match-engine test.

Run the lifecycle regression harness with Node.js from this folder:

```bash
node lifecycle_tests.js
```
