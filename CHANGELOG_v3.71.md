# Changelog – CM Mobile v3.71

## World development balance

- Added one shared, deterministic match-experience progression function for the manager's squad and simulated AI players.
- AI Premier League fixtures now award the same age- and minutes-based development opportunity as the manager's completed fixtures.
- Background EFL / lower-league fixtures now award match-experience development to their actual roster players.
- Simulated domestic cups, European league-phase matches and European / domestic knockout fixtures now use the same match-experience pathway for participating players.
- Match progression is idempotent per fixture: a repeated processing of the same match key cannot grant a second development roll. The player's recent match keys are capped to keep save data bounded.
- Youth academy prospects now receive a controlled annual development opportunity after a completed academy season, before their existing age-up / graduation / release rules are applied.
- Academy growth is age-sensitive, limited by potential, and deterministic per player, club and season.
- The existing annual ageing pass remains in place for the manager's squad, Premier League squads and EFL squads.

## Data and save compatibility

- No SQL or Supabase schema changes.
- No bulk CA/PA rebalance and no replacement of existing player identities.
- Existing player attributes are not regenerated. The v3.70 synchronization still applies only to players carrying the v3.69 generated-model provenance.
- Legacy players may progress in CA under the existing progression rules, but this release does not invent or rewrite their attributes.
- No migration script needs to be run; do not rerun `supabase_cm_mobile.sql`.

## Validation

- All three inline JavaScript blocks passed `node --check`.
- 3,000 synthetic player careers were run for ten seasons across manager, Premier League AI and EFL AI match-experience paths.
- Average match-driven CA gains were 7.770 (manager), 7.761 (Premier League AI) and 9.148 (EFL AI, with a higher 42-match season assumption). These are isolated match-development simulations, not complete career forecasts.
- 5,000 synthetic academy prospects were tested across up to four academy seasons; no player exceeded PA.
- Duplicate fixture, zero-minute, PA-cap, legacy-attribute-preservation and five integration-path checks passed.
- The release ZIP passed CRC integrity validation.

## Test limitations

The Node test harness validates the progression functions and source integration points; it is not a full browser/career-save test. The synthetic cohorts isolate match-driven progression and do not include the separate annual ageing/development pass, transfers, injuries, actual training schedules, player selection changes, or live Supabase persistence. European league-phase participation now records match stats and progression, but this test does not replay a complete European season.
