# CM Mobile v1.29 — Natural Positions & Positional Fit

## Changes
- Added natural-position lists for players, including secondary positions for selected real players.
- Tactical roles are assigned according to the selected formation (4-2-3-1, 4-3-3, 4-4-2, 3-5-2).
- Players receive a position-fit penalty in effective match rating when used outside their natural role; related roles incur a smaller penalty than unfamiliar roles.
- Assistant/player selection scoring considers positional suitability.
- Squad player detail view displays natural positions.
- Opposition lineups use the same role-assignment and positional-fit mechanism for the user’s featured match.

## Notes
- Many secondary positions are football-model estimates and should be refined during database QA.
- JavaScript syntax was checked with Node.js. This is not a full browser/mobile integration test.
- This is a single-file HTML app; replace the existing `index.html` on GitHub Pages.
