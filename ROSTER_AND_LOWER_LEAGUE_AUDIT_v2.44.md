# CM Mobile v2.44 — roster integrity and lower-league audit

## Roster integrity
- Premier League: **20 clubs**, **459 listed names**.
- EFL: **72 clubs**, **1479 listed names**.
- Total: **92 clubs** and **1938 listed names**.
- Repeated exact display names after correction: **2**.
- Exact-name matches in embedded historical profile archive: **822 / 1938**. This is profile coverage only, not proof of current club membership.

### Corrected identities and remaining same-name players
- **Joao Pedro** was listed for Brighton and Chelsea. Kept at Chelsea, consistent with Chelsea’s official 2026 contract update.
- **James Beadle** was listed by Brighton despite being loaned to Birmingham City for 2026/27; removed from Brighton’s active in-game roster. [Brighton’s official loan announcement](https://www.brightonandhovealbion.com/media-article/mft-mu21-transfer-news-james-beadle-birmingham-city-loan-july-2026).
- **Jonathan Edward Russell** was listed for both Mansfield Town and Crawley Town. Kept Jonathan Edward Russell at Mansfield and renamed Crawley’s separate player to **Jonny Russell**, matching the distinct Crawley defender.
- The remaining repeated display names, **Reece James** and **Ben Davies**, refer to different players in the 2026/27 lists: Sheffield Wednesday’s Reece James (born 1993) differs from Chelsea’s Reece James; Bolton’s Ben Davies (born 1995) differs from Tottenham’s Ben Davies (born 1993).

Sources: [Chelsea official announcement (Joao Pedro, 22 Aug 2026)](https://www.chelseafc.com/en/news/article/joao-pedro-signs-new-chelsea-contract); [Brighton official announcement (James Beadle loan, 17 Jul 2026)](https://www.brightonandhovealbion.com/media-article/mft-mu21-transfer-news-james-beadle-birmingham-city-loan-july-2026); [Mansfield Town signing report for Jon Russell](https://www.bbc.co.uk/sport/football/articles/c202zqj62xno); [Ben Davies (Bolton) profile](https://theanalyst.com/players/1942/ben-davies); [Ben Davies (Tottenham) profile](https://www.transfermarkt.co.uk/ben-davies/profil/spieler/192765).

## Lower-league season tests
The tests ran the production `seededScore` and `makeLowerFixtures` functions through a full double round-robin for each 24-team division (46 rounds, 552 matches per season), across three deterministic seeds per division. Team strengths are still the app’s existing hash-derived baseline ±4; these are not ratings derived from player squads.

| Division | Seed | Goals/match | Home win | Draw | Away win | Strength/table rank correlation |
|---|---:|---:|---:|---:|---:|---:|
| Championship | 12345 | 2.476 | 41.7% | 26.3% | 32.1% | 0.025 |
| Championship | 54321 | 2.536 | 45.7% | 25.9% | 28.4% | 0.358 |
| Championship | 20261020 | 2.466 | 39.9% | 27.7% | 32.4% | 0.390 |
| League One | 12345 | 2.583 | 41.8% | 28.3% | 29.9% | 0.473 |
| League One | 54321 | 2.567 | 39.1% | 25.7% | 35.1% | 0.581 |
| League One | 20261020 | 2.536 | 44.9% | 27.4% | 27.7% | 0.378 |
| League Two | 12345 | 2.551 | 40.8% | 27.4% | 31.9% | 0.204 |
| League Two | 54321 | 2.516 | 44.6% | 26.4% | 29.0% | 0.071 |
| League Two | 20261020 | 2.534 | 44.9% | 24.3% | 30.8% | 0.437 |

## Conclusion
The roster audit corrected two cross-club identity collisions and removed a loaned player from the parent club’s active roster. Two remaining repeated display names (Reece James and Ben Davies) are different footballers according to their 2026/27 profiles. The lower-league simulation is stable and reproducible, but strength-to-table correlation is inconsistent because clubs currently receive narrow hash-derived ratings rather than a grounded club/player-strength model. The next development priority should be evidence-based EFL club-strength calibration and validation against real 2026/27 squads—not increasing randomness to conceal weak ratings.

## Test scope and limits
- The full app HTML passes JavaScript syntax checks.
- Roster counts and exact-name uniqueness are checked against the embedded constants.
- Lower-league tests execute the production fixture generator and scoring function, but not the full browser UI or player-by-player match engine.
- Headless Chromium startup was attempted but timed out during app initialization; it is not counted as passed.
