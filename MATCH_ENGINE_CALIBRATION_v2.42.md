# Match engine calibration — v2.42

## Objective
Reduce the extreme dominance seen in v2.41 when the test teams differed substantially in strength, while preserving a useful goal rate in even matches.

## Changes
- Chance allocation now uses the difference between the teams’ attack-v-opponent-defence edges, clamped to `[-18, 18]`. The chance probability for side A is clamped to `0.36–0.64`.
- Chance quality still responds to the attacking team’s rating, finishing and technique, but the attack-v-defence contribution is clamped to `[-12, 12]` and multiplied by `0.0035`. Quality is bounded to `0.045–0.72`.
- Player database version increased from 19 to 20.

## Validation results
The isolated deterministic harness produced these results:

| Scenario | Matches | Goals/match | Home win | Draw | Away win | Home goals/match | Away goals/match |
|---|---:|---:|---:|---:|---:|---:|---:|
| even_seed_12345 (65 vs 65) | 300 | 1.707 | 39.7% | 34.7% | 25.7% | 0.977 | 0.730 |
| even_seed_54321 (65 vs 65) | 300 | 1.773 | 39.3% | 29.3% | 31.3% | 0.947 | 0.827 |
| moderate_home_favorite (72 vs 64) | 400 | 2.277 | 65.8% | 22.3% | 12.0% | 1.698 | 0.580 |
| large_home_favorite (78 vs 58) | 400 | 3.058 | 88.0% | 10.0% | 2.0% | 2.737 | 0.320 |
| strong_away_favorite (58 vs 78) | 400 | 3.010 | 3.0% | 12.0% | 85.0% | 0.375 | 2.635 |


## Interpretation and limitations
- Even-team scoring rose modestly from v2.41’s 1.42–1.48 goals/match to 1.71–1.77 in these two seeded batches.
- A moderate home favorite (72 vs 64) won 65.8% of the 400 test matches, while the underdog still averaged 0.58 goals and won 12.0%.
- A large home favorite (78 vs 58) won 88.0%, but the underdog scored 0.32 goals/match and won 2.0%; the prior v2.41 calibration had produced 97.0% home wins and only 0.085 away goals/match.
- With the stronger team away (58 vs 78), the away side won 85.0%, so home advantage does not override a large strength gap.

The test calls the production `simulateMatch` function, but the Node harness supplies simplified lineup and UI-related stubs and synthetic teams with near-uniform attributes. This is not a full browser test, full season simulation, real-world league calibration, or validation of the live-match engine.
