# CM Mobile v2.27 — European qualification

## Changes in v2.27
- Fixed the English club allocation across European league phases so the same Premier League club cannot be assigned to more than one UEFA competition.
- Uses a simplified English allocation of 5 Champions League places, 3 Europa League places and 1 Conference League place.
- Gives FA Cup and EFL Cup winners priority for Europa League and Conference League places respectively; if a winner already qualifies for a higher competition, the next eligible league club fills the vacancy.
- Prioritizes the latest available Premier League table for qualification; saved season qualifier lists are fallback data only.
- Bumped the European competition database version so saved v2.26 league-phase data is rebuilt with the corrected allocation.
- Updated the season summary's baseline league-position ranges to 5 Champions League, 3 Europa League and 1 Conference League place.

## Scope and limitations
- This is a game-friendly approximation of English qualification, not a complete UEFA access-list implementation. It does not yet model European Performance Spots, titleholder bonus places, qualifying rounds, or every association-specific rule.
- League-phase participants remain based on the game's club pools and season data; this change corrects English club allocation and duplicate assignments rather than fully licensing every European club list.
- Promotion/relegation changes from v2.26 are retained.

## Files
- `index.html` — playable game.
- `README.md` — version notes.

## Validation
- Inline JavaScript syntax checked with Node.js.
- ZIP integrity checked after packaging.
- A full browser playthrough is still needed to validate competition initialization and a complete season rollover in the live app.
