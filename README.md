# CM Mobile v3.81 – Clickable Club Squads & Opponent Starting XI

## Release contents
- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.81.md` – current release changes.
- `CLUB_ROSTER_UI_REPORT_v3.81.md` – roster lookup, opponent XI behaviour and validation.
- `club_roster_ui_tests_v381.js` and `ROSTER_UI_TEST_RESULTS_v3.81.json` – focused UI/data-source regression harness and results.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.81.json` – JavaScript syntax checks.
- `README_v381_addendum.md` – publishing notes for the current UI release.
- `CHANGELOG_v3.80.md` and `AI_COMPETITION_REVENUE_REPORT_v3.80.md` – previous release documentation retained.
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

## What changed in v3.81
Club names in all domestic league standings, EFL division tables in the competitions centre, UEFA league-phase tables, end-of-season tables, EFL top-scorer tables and player-statistics tables are clickable and open the corresponding current squad. Both teams in the pre-match fixture card are clickable: the manager's club opens its full squad, while the opponent opens the expected starting XI and formation. Domestic and cup/UEFA previews use the same squad and XI selection paths as the match engine.

The v3.80 UEFA prize-money implementation and its reports/tests are retained unchanged in this package.

## Publishing
1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.81 introduces no SQL changes.
5. Test an existing save and a new career in the browser. In particular, open clubs from multiple league tables and inspect the opponent XI on the pre-match screen.

## Compatibility and safety
- No mass player rebalance, regeneration or CA/PA recalibration.
- Existing player identities, squads, contracts and career histories are preserved.
- Existing manager-club prize rewards are not paid a second time by the AI distribution path.
- No database schema, finance-version or SQL migration.

## Test limitations
The focused roster UI/data-source harness (20 checks) and all three inline JavaScript syntax checks passed. These are controlled Node tests, not a full interactive browser gameplay test or a Supabase round-trip. The v3.80 competition-economics report and earlier regression assets remain included for reference.
