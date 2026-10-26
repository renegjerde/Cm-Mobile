# CM Mobile v3.44 — Playoff and season-transition safeguards

## Changes
- Playoff match simulation now supplies actual current player rosters rather than empty lineups. The manager's active squad is used for their club; other EFL playoff teams use the season's EFL player database, with an explicit roster fallback when needed.
- Playoff match simulation is seeded by season, division, stage, leg, and teams. Extra-time and penalty shootouts use a stable tie-specific random stream as well.
- Corrected National League semifinal pairing: 2nd place faces the 5th-v-6th eliminator winner; 3rd place faces the 4th-v-7th eliminator winner.
- Added a source-table audit before playoff simulation and before promotion/relegation is calculated. All five current-season tables must match expected club counts and memberships, without duplicates.
- Reordered season transition so club movement is validated before league prize payment and player career-stat archiving. A failed transition can be retried without the reward/archive side effects being committed first.
- Updated the in-game version label to v3.44.

## Validation performed
- Both embedded JavaScript blocks pass `node --check`.
- Isolated playoff harness ran Championship, League One, League Two, and National League brackets with roster data. It checked winners, match counts, seeded National League pairings, roster inputs, deterministic re-runs, and cache reuse.
- Isolated promotion/relegation harness tested a valid full transition: Premier League 20 clubs; each of the four EFL divisions 24 clubs; unique membership; stable canonical club indexes; and preserved squad career IDs.
- The same harness removed one team from a source League One table and confirmed the transition aborted before playoff simulation or membership mutation.
- Static order check confirmed movement validation precedes league prize payment and player career-stat archiving.
- Both JavaScript blocks passed syntax checks after the final edits; ZIP integrity checked after packaging.

## Limits
- These are isolated code-level tests with synthetic league tables and a stubbed match simulator for the transition harness. A full interactive browser season has not been completed, so the build should still be treated as not yet browser-end-to-end validated.
