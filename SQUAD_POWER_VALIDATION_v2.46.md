# CM Mobile v2.46 — Squad-based team power validation

## Change
Match calculations that call `teamPower` now use the available roster rather than the mean rating of every player. The model prioritizes a balanced XI (1 GK, 4 DEF, 4 MID, 2 ATT), then accounts for bench depth, role-specific attributes, fitness and unavailable players. A better keeper can contribute a small bounded bonus.

## Isolated helper tests
The production helper functions were extracted from `index.html` and run in Node with synthetic squads. Results are deterministic for these test squads.

| Test | Result | Status |
|---|---:|---|
| Weak squad (rating 55) | 54.62 | Pass |
| Balanced squad (rating 65) | 65.38 | Pass |
| Strong squad (rating 75) | 76.12 | Pass |
| Balanced squad with five unavailable players | 57.77 | Pass |
| Better keeper | 69.36 | Pass |
| Strong bench | 70.28 | Pass |

The model passed checks that stronger squads rate higher, several unavailable players reduce power, better keeper quality improves power, and a stronger bench can contribute. Both inline JavaScript blocks passed `node --check`.

## Limitations
- This is an isolated helper-level test, not full browser QA or a full season test of the managed club's live match engine.
- Automated EFL league simulation still uses `seededScore` and curated club strength estimates; this change affects code paths that call `teamPower` and does not yet convert all lower-division league fixtures to player-by-player simulation.
- The squad selection is a simplified 4-4-2 reference balance, not a tactical XI calculation for every formation.
