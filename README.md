# CM Mobile v2.15 — Assistant-led tactics

## Changes in v2.15
- The match formation selector is restricted to the three formations chosen by the manager in season training.
- Changing the three-formations toolkit safely moves the active match formation back into the toolkit if necessary.
- The assistant prepares the formation, mentality and starting XI when the tactics screen is opened for a fixture, using only the manager's three selected formations.
- The assistant's match plan is shown prominently above the pitch instead of being buried below the lineup.
- Against a clearly weaker opponent, the recommended XI gives preference to players who did not start the previous match and to players with better fitness. The rotation threshold scales with the strength difference.
- Manual lineup edits remain available after the assistant's initial selection.

## Notes
- Rotation is a heuristic based on squad strength, previous starters, role suitability and fitness; it is not a guarantee that exactly a fixed number of players will be rotated.
- Existing career saves and squad data are retained.
- JavaScript syntax was checked. A full browser playthrough is still needed to validate the complete match flow on mobile.
