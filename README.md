# CM Mobile v3.79 – European Club Economy

## Release contents
- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.79.md` – release changes.
- `AI_GLOBAL_FOOTBALL_ECONOMY_REPORT_v3.79.md` – implementation, validation and limitations.
- `FINANCE_EUROPEAN_TEST_RESULTS_v3.79.json` – 14 targeted European finance assertions.
- `finance_v379_tests.js` – focused finance test harness.
- `REGRESSION_SUITE_SUMMARY_v3.79.json` – retained regression results.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.79.json` – inline JavaScript syntax checks.
- Previous version changelogs, reports, test harnesses and result files.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – unchanged SQL script.

## What changed
Permanent European squads now receive modeled weekly operating revenue and pay weekly first-team wages through the same finance cadence used by English clubs. European club budgets are synchronized with the existing transfer-market metadata, and wage budgets receive an annual review with bounded movement. Strength-tier cash ceilings and downside buffers limit runaway balances.

The European revenue model is a proxy based on club strength, stadium-size proxy and commercial factor. It is not a real-world audited financial dataset and does not yet model country-specific TV rights, taxes, debt, owner investment or formal insolvency.

## Publishing
1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.79 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety
- No mass player rebalance, regeneration or CA/PA recalibration.
- Existing Premier League and EFL weekly finance paths are preserved.
- European club finance entries are stored in the existing `appState.clubFinances` save object; `europeanTransferClubData[name].budget` remains the source of truth for transfer cash.
- No database schema, finance-version or SQL migration.
- Player identities, squads, attributes, contracts and career histories are preserved.

## Test limitations
Fourteen targeted finance assertions and five retained regression harnesses passed. All three inline JavaScript blocks passed syntax validation. These are controlled Node tests, not a full browser UI test, a complete all-club multi-decade economic simulation or a Supabase round-trip. See `AI_GLOBAL_FOOTBALL_ECONOMY_REPORT_v3.79.md`.
