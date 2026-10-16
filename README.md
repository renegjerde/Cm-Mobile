# CM Mobile v1.49 — English League Pyramid & Domestic Cups

## Included
- Competition centre with Premier League, Championship, League One and League Two tables.
- Simulated lower-division league rounds progress alongside the Premier League season.
- FA Cup and EFL Cup knockout competitions with draws, results, winners and round progression.
- Cup dates are scheduled into selected midweek round slots.
- When the user's club plays a scheduled cup tie, the tie is recorded and the squad takes an additional fitness load; low-stamina players recover more slowly through the existing recovery system, and minor injury risk is applied.
- Competition data is stored locally with the career save; it does not fetch external statistics repeatedly.

## Important limitations
- Cup ties and lower-division matches are simulated automatically in parallel; the current live-match engine is still used for the user's Premier League match only.
- Exact real-world fixture dates, replays, two-legged semi-finals, EFL Cup bye rules, and the full non-league pyramid are simplified. The FA Cup includes a representative selection of non-league clubs.
- Lower-division tables are simulated, but automatic promotion/relegation into the Premier League and club-by-club squad management across all 92 league clubs are not yet fully wired into the next season.
- This is a local single-player prototype, not a verified real-world fixture database.

## Install
Upload `index.html` from this folder to the root of the `main` branch used by GitHub Pages. Keep `README.md` for documentation; it is not required for the app to run.
