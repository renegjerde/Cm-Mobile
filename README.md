# CM Mobile v3.18 — focused goal flash and clock pause

## Changes in v3.18
- Goal celebration now flashes only the scorer headline line, alternating the scoring club's primary and secondary colours.
- The effect runs for three seconds; the entire match card and commentary panel no longer flash.
- The live clock timer is stopped for the full celebration and resumed afterward if the match is not otherwise paused.
- If a goal is scored at the end of regulation time or extra time, final match processing is deferred until the goal flash finishes, so the goal is shown before the final whistle.
- Halftime state remains paused, and manual pause/lineup/speed controls cannot accidentally restart the timer during the goal celebration.
- Added a club-colour palette for major English and European teams with deterministic fallback colours for other clubs.

## Publish to GitHub Pages
Replace `index.html` in the `main` branch root with this version's `index.html`. The archive folder is for delivery; Pages continues using the configured publish root.

## Test status
JavaScript syntax and archive integrity are checked. No full browser-driven test of the user's live career is claimed.
