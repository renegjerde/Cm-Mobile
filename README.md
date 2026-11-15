# CM Mobile v3.77 – European AI Transfer Market

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.77.md` – release changes.
- `AI_EUROPEAN_TRANSFER_MARKET_REPORT_v3.77.md` – implementation, validation and limitations.
- `AI_EUROPEAN_MARKET_TEST_RESULTS_v3.77.json` – targeted transfer-path test results.
- `ai_european_market_tests_v377.js` – targeted test harness.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.77.json` – inline JavaScript syntax checks.
- Previous v3.76, v3.75, v3.74, v3.73, v3.72 and v3.71 reports, changelogs and test assets.
- v3.69 player-generation model reference and v3.68 player-quality baseline.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – retained SQL script; no schema changes in v3.77.

## What changed

The autonomous international transfer path now includes European-to-European deals and EFL-to-Europe / Europe-to-EFL deals, in addition to the existing European-Premier League connection. Buyers need a positional vacancy and sufficient budget; sellers need positional surplus. Players on loan, players already moved in the current window, and identities already present at the buyer are excluded.

Career identity, CA, PA, attributes, career history and player statistics are preserved. The roster ID is refreshed for the destination. EFL club budgets are synchronized between the lower-league club row and the club-finance record.

## Publishing

1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.77 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety

- No mass player rebalance, regeneration or CA/PA recalibration.
- No player career identity rewrite.
- Manager-controlled club remains excluded from autonomous domestic AI participant entries.
- Existing domestic AI transfers and manager-controlled manual transfers remain in place.
- No database schema changes.

## Test limitations

Five targeted international market scenarios and the retained regression suites are included. These are controlled Node tests against extracted application functions, not a full browser UI test, a full 20-season all-club simulation or a Supabase round-trip. The international market does not yet model agent negotiations, player wage demands, release clauses or country-specific UEFA registration rules. See `AI_EUROPEAN_TRANSFER_MARKET_REPORT_v3.77.md`.
