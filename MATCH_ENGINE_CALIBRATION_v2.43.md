# CM Mobile v2.43 — Season balance and scoring calibration

## What changed
- Updated the visible game version labels to **v2.43**.
- Increased the regular match engine's goal-conversion multiplier from **1.95 to 2.2**. The v2.42 season batches produced roughly 2.38–2.51 goals per match in the synthetic league harness; the updated setting moves the tested seasons closer to a more credible football scoring range.
- No external runtime services were added. The game remains offline-first.

## Three 20-team season tests
Each test ran a full double round-robin: **20 teams, 380 matches per season**. Tests use the production `simulateMatch` function with deterministic random seeds, but use simplified test-only lineups and synthetic player attributes.

| Seed | Goals/match | Home win | Draw | Away win | Strength/table rank correlation |
|---:|---:|---:|---:|---:|---:|
| 12345 | 2.879 | 41.8% | 18.4% | 39.7% | 0.962 |
| 54321 | 2.737 | 42.9% | 19.5% | 37.6% | 0.958 |
| 20261020 | 2.650 | 42.9% | 20.5% | 36.6% | 0.967 |

## Interpretation
- Scoring increased to **2.65–2.88 goals per match** across the three deterministic seasons.
- Home teams won **41.8–42.9%**, draws accounted for **18.4–20.5%**, and away teams won **36.6–39.7%**.
- Strength-to-final-table rank correlation was **0.958–0.967** in the updated tests, indicating that stronger teams generally finish higher without the table being perfectly predetermined.
- Point totals and goal differences vary substantially between seeds, as expected from a stochastic season; this is a calibration check, not proof of real-world accuracy.

## Limitations
The harness calls the production regular `simulateMatch` function but uses simplified lineup/role stubs and synthetic near-uniform players. It is **not** a full browser test, does not use the real embedded club squads, and does not test the live-match engine or lower-league `seededScore` simulation. See `MATCH_ENGINE_VALIDATION_v2.43.json` for machine-readable results.
