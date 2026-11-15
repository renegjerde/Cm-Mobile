# CM Mobile v3.72 – AI Transfer Market & Squad Evolution

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – this file.
- `CHANGELOG_v3.72.md` – v3.72 changes.
- `WORLD_TRANSFER_MARKET_REPORT_v3.72.md` – design, findings and limitations.
- `AI_TRANSFER_TEST_RESULTS_v3.72.json` – targeted transfer and contract-expiry tests.
- `ai_transfer_tests_v372.js` – reproducible Node test harness.
- `WORLD_DEVELOPMENT_REGRESSION_RESULTS_v3.72.json` – previous progression invariants rerun against v3.72 source.
- `world_development_tests_v372_regression.js` – progression regression harness.
- `WORLD_DEVELOPMENT_BALANCE_REPORT_v3.71.md` – previous development report.
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

Do not rerun `supabase_cm_mobile.sql`; v3.72 introduces no database schema change.

## Data safety

- No bulk player rebalance or player identity replacement is performed.
- Existing player attributes and CA/PA values are not regenerated.
- AI free-agent recruitment is limited to a suitable player for a real squad/position shortage, at most one per AI club per season.
- Contract expiry now removes stale mirrored registrations from EFL and European transfer registries, while preserving active loans.
- EFL match-engine and market roster copies are synchronized after AI moves.
- Existing transfer history is retained; new AI free-agent moves are separately recorded.

## Testing

Run the targeted transfer tests with Node.js:

```bash
node ai_transfer_tests_v372.js
```

Run the retained progression regression tests with Node.js:

```bash
node world_development_tests_v372_regression.js
```

These tests use synthetic state and extracted application functions. They are not a substitute for a live browser career-save test or Supabase round-trip.
