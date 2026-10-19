# CM Mobile v2.26 — Promotion and relegation

## Changes in v2.26
- Fixed the season rollover so promotion and relegation update each club's authoritative division.
- Championship promotion is now the top two plus a simulated playoff winner from places 3–8.
- League One promotion is now the top two plus a simulated playoff winner from places 3–6.
- League Two promotion is now the top three plus a simulated playoff winner from places 4–7.
- Relegation is balanced across divisions: three clubs from the Premier League, three from the Championship, and four from League One.
- The season summary records the clubs actually promoted, including playoff winners.
- Updated the league pyramid explanation to describe the promotion/playoff places.

## Important implementation note
Playoffs are resolved automatically at season rollover using a simulated ranking based on club strength, league performance where available, finishing position, and a small season-specific variation. This version does not yet provide individually playable playoff fixtures or a bracket UI.

## Files
- `index.html` — playable game.
- `README.md` — version notes.

## Validation
- Inline JavaScript syntax checked with Node.js.
- ZIP integrity checked after packaging.
- A full multi-season browser playthrough is still needed to verify the complete season rollover in the live app.
