# CM Mobile v3.75 – AI Loans & Young Player Development

## Release contents

- `index.html` – complete CM Mobile application.
- `VERSION.txt` – release version.
- `README.md` – publishing and compatibility notes.
- `CHANGELOG_v3.75.md` – release changes.
- `AI_LOAN_DEVELOPMENT_REPORT_v3.75.md` – implementation, validation and limitations.
- `AI_LOAN_TEST_RESULTS_v3.75.json` – targeted loan tests.
- `AI_LOAN_LONG_HORIZON_RESULTS_v3.75.json` – ten-season controlled loan lifecycle simulation.
- `INLINE_SCRIPT_SYNTAX_RESULTS_v3.75.json` – JavaScript syntax checks.
- `ai_loan_tests_v375.js` – targeted PL/EFL loan and return tests.
- `ai_loan_long_horizon_v375.js` – ten-season AI loan simulation.
- v3.74 academy tests and reports.
- v3.73 strategic squad-planning tests and reports.
- v3.72 transfer-market tests and reports.
- v3.71/v3.70 progression reports and results.
- v3.69 player-generation model reference and player-quality baseline.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` – retained player database snapshot.
- `supabase_cm_mobile.sql` – retained SQL script; no schema changes in v3.75.

## What changed

AI clubs can now loan suitable young fringe players to AI clubs at a lower competitive level that have a genuine positional shortage. The system considers age, ability, prior-season usage, parent-club positional surplus, recipient-club positional need, relative club strength and roster capacity. At most one AI player can leave a club and one can arrive at a club per season. Wages are shared 50/50 between parent and borrower in both PL and EFL finance calculations.

Loans use the existing AI match selection and player-development pathways. Players are eligible for selection at the recipient club, their appearances feed the existing match-experience development, and the player automatically returns to the canonical parent roster at the modeled season end. Loan spell statistics are added to career history and career totals.

## Publishing

1. Back up the current repository and career data.
2. Replace the app's current `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and database schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; v3.75 introduces no SQL changes.
5. Test an existing save and a new career in the browser before treating the release as production-ready.

## Compatibility and safety

- No mass player rebalance or regeneration.
- No CA/PA recalibration.
- No player career identity rewrite.
- User-controlled club is excluded from autonomous AI loans.
- AI loaned players are protected from AI transfer shortlists while the loan is active.
- Existing manual loan workflow is unchanged.

## Test limitations

The included Node harnesses execute extracted application functions with controlled state. They are not a full browser UI test, Supabase round-trip or a complete simulation of every league fixture. See `AI_LOAN_DEVELOPMENT_REPORT_v3.75.md`.
