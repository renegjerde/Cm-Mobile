# CM Mobile v1.27 — Player Database Overhaul

## Changes
- Player ages now use birth dates and are calculated for the 2026/27 season start (22 August 2026) wherever a DOB is included. For players without a DOB, age falls back to existing curated age or a stable estimate; those are marked `ageSource: estimated` in the data.
- Added role labels that distinguish left/right full-backs, left/right centre-backs and wide/central/defensive/attacking midfield roles while preserving broad engine positions (GK/DEF/MID/ATT).
- Senne Lammens is rated above Karl Darlow and Tom Heaton in Manchester United's goalkeeper group.
- Added Premier League badge image URLs for the 20 clubs. Images use lazy loading and the browser cache; network access is needed to display these images, with text/emoji fallback if an image fails.
- Database version bumped to 3 so new career/database initialization picks up the updated data.

## Important data quality note
The current project roster list itself contains some unverified names and the DOB table does not yet cover every one of the 500 players. Do not treat missing-DOB ages or estimated attribute ratings as verified facts. The roster and remaining DOBs still need a complete source-by-source audit before this can honestly be called a fully verified 500-player database.

## Validation
JavaScript syntax is checked with Node.js. Full mobile-browser interaction and remote logo loading are not end-to-end tested.
