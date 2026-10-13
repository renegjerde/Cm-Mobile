# CM Mobile v0.2 — Touchline Edition

Mobile-first football management prototype.

## v0.2 improvements
- Formation layouts now show exactly 11 players (where the squad has the required positions).
- A 12-club double round-robin fixture schedule (22 rounds).
- Each round simulates all league fixtures and updates the full table.
- Match summaries include the other results from the round.
- Match scores are influenced by relative team strength, home advantage, and the manager's mentality.
- Match statistics are calculated from the relative strength and match score rather than being entirely independent random numbers.

## Prototype limitations
- Real club names, but fictional generated player names/attributes.
- Club strength values and the match engine are illustrative, not an official database or realistic calibrated football model.
- Squad selection remains automatic; no injuries, contracts, AI transfers, cups, promotion/relegation, or cloud sync yet.
- Saves are local to the browser/device. Existing v0.1 saves may not contain the new fixture schedule; the game creates it when missing.

## Run
Open `index.html` in a browser, or publish it on GitHub Pages.
