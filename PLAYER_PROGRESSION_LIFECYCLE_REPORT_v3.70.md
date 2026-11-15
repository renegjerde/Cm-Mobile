# CM Mobile – Player Progression & Lifecycle Test v3.70

**Date:** 15 November 2026  
**Base:** v3.69 Player Generation & Ability Calibration  
**Release:** v3.70 Player Progression Synchronization

## Executive summary

The first controlled ten-season test exposed a mismatch in the progression system: when `player.rating` changed during match experience, pre-season training or the annual ageing pass, the player's individual attributes did not change with it. This meant the role-skill index could drift away from the CA value used elsewhere in the game.

v3.70 adds a synchronization step for players whose attribute provenance is exactly the v3.69 role-archetype model. Their existing role profile is aligned to the new CA after a rating change. The relative differences between relevant attributes are preserved as far as the bounded, integer-valued model permits.

Legacy players are explicitly excluded. The fix does not silently rebalance their existing valid attributes.

## Ten-season scenario results

Each row represents 250 synthetic players run through ten seasons. The scenarios use the current progression probabilities from `playerDevelopmentChanceFromMinutes` and `processCareerAgeing`. The match count is each player's appearances per season, not the club's fixture count.

| Starting age | CA → PA | Apps / season | Mean CA change | Reached PA within 10 years |
|---:|---:|---:|---:|---:|
| 16 | 50 → 65 | 0 | +0.92 | 0.0% |
| 16 | 50 → 65 | 10 | +7.19 | 0.8% |
| 16 | 50 → 65 | 20 | +12.74 | 40.0% |
| 16 | 50 → 65 | 35 | +14.94 | 96.0% |
| 18 | 50 → 65 | 0 | +0.66 | 0.0% |
| 18 | 50 → 65 | 35 | +13.09 | 42.4% |
| 20 | 56 → 68 | 35 | +5.54 | 1.2% |
| 22 | 62 → 70 | 35 | +0.58 | 0.0% |
| 24 | 68 → 73 | 35 | −1.46 | 0.0% |
| 28 | 74 → 76 | 35 | −3.13 | 0.0% |

Interpretation:

- A very young player receiving regular first-team minutes can reach PA over several seasons. This is an intended possibility, not a guarantee for every prospect.
- Starting age and playing time materially affect development. At age 20 and older, the current model sharply reduces the chance of reaching a large PA gap.
- Older players decline gradually on average. Goalkeepers use a later peak and retirement-age rule in the current code.
- These are synthetic distributions under isolated assumptions, not a forecast for an individual real player.

## CA / role-skill synchronization

| Regression check | Result |
|---|---:|
| Tactical roles covered | 16 / 16 |
| Role-skill alignment checks | 6,400 |
| Checks outside ±0.55 points | 0 |
| Maximum observed difference | 0.55 |
| High-CA keepers with handling/reflex below 50 | 0 |
| Legacy player attribute preservation | Passed |

The role-skill index is a diagnostic proxy and is not itself the game's CA. The game continues to store CA in `player.rating`.

## Corrected code paths

- Pre-season player development.
- In-season match-experience development.
- End-of-season ageing, development and decline.
- Legacy EFL fallback roster construction, where CA/PA were previously assigned after `makeRealPlayer` had already generated the attributes.

## Findings to carry into the next test round

1. The active manager's squad receives an in-season development check after completed appearances. AI-controlled squads do not pass through that same per-player loop. A later world-balance test should compare user-club development with AI-club development over multiple seasons.
2. Youth-academy cohorts are aged and released through the academy-season routine, rather than the main `processCareerAgeing` pass. Their actual CA progression should be tested separately before changing academy development rates.
3. The 10-season simulation does not include player transfers, injuries, tactical changes, match performance, retirements caused by unusual game-state interactions, or Supabase persistence.

## Files

- `LIFECYCLE_TEST_RESULTS_v3.70.json` – detailed 24-scenario output.
- `PROGRESSION_REGRESSION_TESTS_v3.70.json` – role, legacy-preservation and source-patch assertions.
- `lifecycle_tests.js` – reproducible Node-based test harness.
- `PLAYER_GENERATION_MODEL_v3.69.md` – underlying creation model retained from v3.69.
