# CM Mobile v2.77 — Premier League U21 squad inclusion

## Why this change was needed
The Premier League publishes a 25-player senior list separately from registered U21 players. Its official 2026/27 list explicitly says U21 players are eligible to play in the Premier League above the 25-player squad limit. This explains how a builder that reads only `PL_OFFICIAL_ROSTERS_2026_27` can omit first-team youngsters.

## Changes
- Added a first-team/prospect U21 supplement for all 20 in-game Premier League club entries (some clubs have no supplement names pending reliable club-specific verification).
- Merged the supplement with the senior list, deduplicating names and removing the hard 25-player truncation.
- Added explicit position groups for supplemental players where available.
- Added metadata (`u21Eligible`, `firstTeamU21Supplement`, membership source) to make the distinction visible in game data.
- Bumped `PLAYER_DB_VERSION` to 23 and source signature to v2.77 so an untouched preseason career rebuilds with the corrected squads. Progressed careers are intentionally preserved.

## Manchester United regression checks
The resulting squad must include: Kobbie Mainoo, Ayden Heaven, Leny Yoro, Shea Lacey, Harry Amass, Jack Fletcher, Tyler Fletcher and Tynan Thompson, in addition to the existing senior register. The first three plus Shea Lacey were explicitly reported missing by the user.

## Scope / limitations
This supplement is aimed at U21 players who are first-team or senior-prospect squad members, not every academy scholar or every player in the PL's extensive U21 contract list. Loaned players are not added merely because they appear on the full U21 register. The list needs a club-by-club audit against official first-team squad numbers before claiming every PL club's full academy register is complete. Existing senior data has known season/club mismatch risks elsewhere; this patch is narrowly scoped to the missing U21 generation.

## Source
Premier League, “See all the 2026/27 Premier League squad lists,” published 3 September 2026. The page states that clubs submit a separate U21 list and that eligible U21 players are available above the 25-player limit. Manchester United's official list includes Mainoo, Heaven, Yoro, Shea Lacey, Harry Amass, Jack Fletcher, Tyler Fletcher and Tynan Thompson in its U21 section.

## Tests
- JavaScript syntax check with Node.js.
- Static data check that every in-game PL club has a defined supplement entry.
- Static regression check that all reported missing Manchester United names are included and deduplicated after merge.
- ZIP integrity check.
- No full browser/season simulation was run.
