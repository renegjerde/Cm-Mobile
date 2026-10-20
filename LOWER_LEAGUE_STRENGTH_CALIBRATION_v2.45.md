# CM Mobile v2.45 — EFL strength calibration and season validation

## What changed
- Replaced the previous narrow hash-derived EFL strength baseline with an explicit club-by-club 2026/27 in-game strength estimate for all 72 clubs across the Championship, League One and League Two.
- New/untouched careers use the new estimates. Existing active careers are not re-rated mid-season; migration is limited to an untouched preseason.
- Bumped the EFL player database version to 11 so an untouched preseason can rebuild the player database using the revised club strengths.

## Important limitation
These ratings are curated game-balance estimates, not official ratings and not a verified calculation from complete player-by-player squad ratings. The embedded player model itself still uses club strength as one input, so this version improves club-to-club variation but does not yet constitute a fully independent squad-strength model.

## Full-season tests
Used the production EFL club list, club-strength helper, fixture generator, score simulator and table updater. Each test is a complete 24-team double round-robin: 46 rounds and 552 matches. Three deterministic seeds were run for each division (9 seasons / 4,968 matches total). Tests exclude the browser UI and the managed club’s full match engine.

| Division | Seed | Goals/match | Home win | Draw | Away win | Strength/table rank correlation |
|---|---:|---:|---:|---:|---:|---:|
| Championship | 12345 | 2.431 | 43.1% | 24.1% | 32.8% | 0.450 |
| Championship | 54321 | 2.562 | 45.5% | 25.7% | 28.8% | 0.636 |
| Championship | 20261020 | 2.437 | 39.5% | 26.4% | 34.1% | 0.329 |
| League One | 12345 | 2.553 | 39.9% | 26.3% | 33.9% | 0.523 |
| League One | 54321 | 2.585 | 41.1% | 23.0% | 35.9% | 0.436 |
| League One | 20261020 | 2.527 | 46.6% | 25.9% | 27.5% | 0.529 |
| League Two | 12345 | 2.582 | 40.6% | 27.0% | 32.4% | 0.538 |
| League Two | 54321 | 2.475 | 44.6% | 26.3% | 29.2% | 0.585 |
| League Two | 20261020 | 2.516 | 43.8% | 24.5% | 31.7% | 0.430 |

## Interpretation
- All 72 clubs have explicit ratings and all nine seasons completed 552 matches each.
- Average scoring remained in a relatively narrow range (2.431–2.585 goals per match).
- Strength/table rank correlation improved from the very inconsistent narrow hash baseline documented in v2.44, and was positive in every test (0.329–0.636). It is not perfect, as expected in a single season with stochastic results.
- Home win percentages range from 39.5% to 46.6%; away wins range from 27.5% to 35.9%.

## Next development target
Replace the curated club-level estimates with an independent squad-strength calculation that uses a verified starting XI / squad depth, position balance, goalkeeper quality and current registered player ratings. Then validate multiple seasons and promotion/relegation transitions.

## Validation limits
- JavaScript syntax checks passed for both inline script blocks.
- Full browser startup is not claimed as passed.
- Season tests run production simulation functions in an isolated Node harness and do not exercise UI, save migration in a browser, or live-match simulation.
