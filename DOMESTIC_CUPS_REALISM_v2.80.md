# CM Mobile v2.80 — Domestic Cup Realism Audit

## Summary

This update fixes a structural participant bug and provides competition-specific knockout flow and result presentation for the FA Cup and Carabao Cup. It does **not** claim to simulate every stage of the full real-world FA Cup pyramid or every exact match date.

## What was wrong before

- Domestic cup entrants were built from the 20 Premier League club objects. That omitted all 72 in-game EFL clubs (24 each in Championship, League One and League Two) from both competitions.
- The FA Cup path did not keep the correct League One/League Two, Championship and Premier League entry stages separate.
- The Carabao Cup had no preliminary round and did not model the two-legged semi-finals.
- A drawn knockout match could be given a changed match score to force a winner rather than preserve the score and report extra time / penalties separately.
- The competition screen showed generic round labels and simple results rather than a visible journey through the cup.

## Current in-game format

### FA Cup — compressed but staged version

The game includes 124 entrants: 20 Premier League clubs, 72 EFL clubs, and 32 non-league clubs selected from the in-game list. For the gameplay route:

- Round One Proper: 48 League One / League Two teams plus 32 non-league teams (80 entrants / 40 ties).
- Round Two Proper: the 40 winners (20 ties).
- Round Three Proper: 20 Round Two winners plus all 24 Championship and all 20 Premier League clubs (64 entrants / 32 ties).
- Fourth Round: 16 ties.
- Fifth Round: 8 ties.
- Quarter-finals: 4 ties.
- Semi-finals: 2 ties.
- Final: 1 tie.

This mirrors the well-known First Round Proper / Third Round Proper entrance logic, but compresses the earlier qualifying pyramid: it does not simulate every eligible non-league club and every qualifying round.

### Carabao Cup — 2026/27 entry pattern

The game includes all 72 EFL clubs and all 20 Premier League clubs (92 total). The entry pattern is:

- Preliminary Round: Tranmere Rovers–Rochdale and York City–Crawley Town (4 teams / 2 ties).
- Round One: the two preliminary winners plus the other 68 EFL clubs (70 teams / 35 ties).
- Round Two: the 35 winners plus 11 Premier League clubs not playing in Europe (46 teams / 23 ties).
- Round Three: the 23 winners plus the nine Premier League clubs playing in Europe (32 teams / 16 ties).
- Round Four: 8 ties.
- Quarter-finals: 4 ties.
- Semi-final first legs: 2 ties.
- Semi-final second legs: the same two ties, with aggregate scores.
- Final: 1 tie.

The North/South draw grouping is an approximation based on an in-game club map. It is not a verified reproduction of the exact official regional split for every draw.

## 2026/27 calendar references

The official round dates provide a basis for the gameweek order. The game does **not** currently reproduce exact calendar-day fixtures, replays where applicable, TV changes or postponements:

- FA, official FA Cup round dates: https://www.thefa.com/competitions/thefacup/round-dates
- The FA's 2026 round-date announcement: https://www.thefa.com/news/2026/jun/05/round-dates
- EFL, Carabao Cup Preliminary Round draw and format: https://www.efl.com/news/2026/june/03/carabao-cup-2026-27-preliminary-round-draw/
- EFL, Carabao Cup 2026/27 key information and round dates: https://www.efl.com/news/2026/august/06/carabao-cup-2026-27---key-information-/
- EFL key dates: https://www.efl.com/competitions/key-dates/

## Simulation and scoring

- AI ties are resolved while retaining the match score. Extra-time goals are explicitly reflected and penalties are shown as a separate shoot-out score.
- Carabao Cup semi-finals are stored as two legs. A level aggregate after 90 minutes in the second leg triggers extra time; a level aggregate after extra time triggers penalties.
- The manager's own cup fixture is held as a pending match rather than being overwritten by AI simulation.
- Cup histories from an existing save are not silently replaced. If a competition already has results or an active pending tie, the migration retains it under its old format and displays a notice. A new season / unplayed competition is the intended way to verify the complete new structure.

## Validation performed

- JavaScript syntax check (`node --check`) passed on extracted inline script.
- Isolated actual-builder / stage-flow harness produced entrant totals of 92 for Carabao Cup and 124 for FA Cup, with no duplicates in the EFL cup entrant list. The completed simulated progression produced the expected number of ties at each stage and a single champion for each cup.
- Isolated semi-final aggregate scenarios tested the first-leg draw/return leg, level aggregate after 90, and extra-time/penalty resolution.
- Chromium smoke render showed the cup competition page labels, entrant totals, stage-progress elements and results section. The harness ran from an isolated `about:blank` page; browser storage access was denied in that setup, so persistent saves / full start-career behavior were not verified by that smoke test.
- ZIP structure and syntax were validated.

## Limitations / next validation target

- Full FA Cup qualifying rounds and their much larger non-league field are represented by a compressed 32-team non-league intake.
- Carabao North/South mapping is an approximation.
- Calendar placement uses gameweeks, not exact official dates.
- No full-season end-to-end simulation or test on the user's device was performed.
- If an existing cup already progressed in a career, its history is preserved rather than forcibly rewritten. The new format should be verified in a newly started career or in the next unplayed season.
