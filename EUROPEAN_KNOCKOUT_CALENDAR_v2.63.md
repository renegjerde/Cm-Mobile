# European knockout calendar v2.63

## Change
- European knockout stages no longer simulate immediately when the prior stage completes.
- Each two-legged round uses separate scheduled gameweeks.
- Final is scheduled in week 38, after the domestic round's result processing, so it is the last scheduled competitive event in the season.
- The calendar is a gameweek approximation of the UEFA 2026/27 calendar; the game does not yet use real ISO dates for each individual fixture.

## Gameweek mapping
| Stage | Weeks |
|---|---:|
| Knockout play-offs | 24, 25 |
| Round of 16 | 27, 28 |
| Quarter-finals | 30, 31 |
| Semi-finals | 33, 34 |
| Final | 38 |

## Validation performed
- Source-level assertions confirm calendar helper exists, instant leg-2 recursion is removed, and the final is mapped to week 38.
- JavaScript syntax and ZIP integrity checks are run before delivery.
- Not a full browser or full-season simulation. Existing saves that already have an active knockout stage will use the new schedule from their current stage/leg; old completed stages are not replayed.
