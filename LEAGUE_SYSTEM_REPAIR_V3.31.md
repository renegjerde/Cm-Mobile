# CM Mobile v3.31 — league-system repair log

## Completed in this step
A canonical domestic registry helper was added to provide stable IDs for all clubs currently listed in `CLUBS` and `EFL_DIVISIONS`. The original Premier League array ordering is untouched so existing saves do not silently reinterpret club indexes. An audit helper reports duplicates and per-division counts.

## Confirmed remaining blocker
The existing game has two different manager/competition assumptions:
- Manager-facing state (`appState.club`, `worldSquads`, `currentClub()`, `makeSquad()`) is indexed into `CLUBS`.
- Championship, League One, League Two and National League simulation is maintained separately in `appState.lowerLeagues` and `eflPlayerDatabase`.

Simply adding EFL clubs into `CLUBS` is unsafe because it can cause duplicate simulation and break saved indexes. The new registry is therefore groundwork only. The career picker is not yet considered repaired, and this build must not be represented as enabling lower-division manager careers.

## Static checks
- Both inline JavaScript blocks pass `node --check`.
- No browser-based career test or full season simulation was run in this step.

## Next implementation target
Refactor manager identity and the new-career flow to accept stable club IDs, while retaining a legacy PL index for old saves. Then connect the selected manager club to the correct squad, finance, fixtures, standings, transfers and match simulation. Add regression tests for all divisions before changing the picker to claim support.
