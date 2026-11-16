# CM Mobile 4.0 – Classic Edition UI Report

## Design direction
The v3.82 interface used a modern dark, gradient-heavy card layout. This release replaces that presentation with a compact, information-dense interface inspired by the late-1990s football management genre and the clear hierarchy associated with Championship Manager 97/98: navy command bars, grey/off-white work surfaces, compact tables, restrained green selection states, square edges and desktop-first information density. It uses original CSS and no copied CM97/98 artwork.

## Visible cleanup
- Removed the build/version badge from the upper-left brand area.
- Removed the `TOUCHLINE EDITION` and visible build-version line. The header now shows only season, active division and current round/season phase.
- Removed the in-game manual/help overlay and its header control.
- Removed instructional helper paragraphs from tactics, bench and match-result panels.
- Removed technical player-database diagnostics from the ordinary squad screen.
- Removed lengthy explanatory promotion/relegation prose and several page-level helper paragraphs; essential table markers and status data remain.
- Kept essential labels, status notices, accessible control names, navigation and game data.

## Preserved functionality
- Existing v3.82 detailed player profiles and profile return navigation.
- Clickable club squads in domestic and UEFA tables.
- Opponent starting XI and formation previews.
- Existing squad, tactics, transfers, finances, academy, competitions, match simulation and season logic.
- Local career saves, Supabase cloud sync and existing database schema.

## Validation
- Inline JavaScript blocks: 2 executable blocks pass `node --check` (the third script tag is non-executable data/library markup).
- Club roster/opponent XI regression suite: 21/21 pass.
- Player profile regression suite: 9/9 pass.
- Classic UI cleanup suite: 14/14 pass.
- ZIP integrity: all CRC checks pass.
- A headless Chromium screenshot attempt did not complete in this environment; no full interactive browser test is claimed.
- Supabase round-trip and manual testing on physical mobile/desktop devices remain outstanding.

## Compatibility
No SQL/schema, save format, player data, player generation, progression, transfer, competition or match-engine changes. SQL file is byte-identical to v3.82. Do not rerun the SQL file.
