# CM Mobile v2.16 — Match balance

## Changes in v2.16
- Reduced generated chances and goal conversion slightly, and moderated the effect of large team-strength differences to reduce frequent heavy wins.
- Adjusted simulated results in the other divisions toward a more realistic goal distribution, with a moderate home advantage.
- Increased yellow-card probability toward a target average of roughly 3–4 per match; red cards remain uncommon.
- Increased injury events moderately. Actual injury frequency still depends on how events are handled by the match engine.

## Included from v2.15 — Assistant-led tactics
- The match formation selector is restricted to the three formations chosen by the manager in season training.
- Changing the three-formation toolkit safely moves the active match formation back into the toolkit if necessary.
- The assistant prepares the formation, mentality and starting XI when the tactics screen is opened for a fixture, using only the manager's three selected formations.
- The assistant's match plan is shown prominently above the pitch.
- Against a clearly weaker opponent, the recommended XI gives preference to players who did not start the previous match and to players with better fitness. The rotation threshold scales with the strength difference.
- Manual lineup edits remain available after the assistant's initial selection.

## Notes
- Rotation is a heuristic based on squad strength, previous starters, role suitability and fitness; it does not guarantee a fixed number of changes.
- Existing career saves and squad data are intended to be retained.
- JavaScript syntax and ZIP structure should be checked before release. A full browser playthrough is still needed to validate the complete match flow and statistical balance over a full season.
