# CM Mobile – World Development Balance Report v3.71

**Date:** 15 November 2026  
**Base:** v3.70 Player Progression Synchronization  
**Release:** v3.71 World Development Balance

## Findings in v3.70

The manager's live match completion path applied a per-player, age- and minutes-based development roll. The simulated Premier League fixture path recorded 90-minute appearances but did not apply that same in-season development roll. Lower-league background fixtures similarly recorded minutes and statistics without the match-experience development step. Youth academy cohorts aged and were promoted or released at the season boundary, but did not receive a corresponding annual academy-development opportunity.

## Changes in v3.71

### Match-experience parity

A shared `applyPlayerMatchExperienceDevelopment` helper now handles match-driven CA growth. It uses the existing `playerDevelopmentChanceFromMinutes` probability curve, respects ages 16–23 and PA, and synchronizes generated v3.69 role attributes through the v3.70 rating helper.

The helper is called from:

- Manager's completed live fixtures.
- Simulated Premier League fixtures.
- Simulated EFL / lower-league background fixtures.
- Domestic and European cup matches, including the European league phase.

Each call uses a stable fixture key. A player cannot receive a second development roll from the same fixture if that fixture is processed again. Only the most recent 40 fixture keys are retained on a player to bound save growth.

### Youth academy progression

A prospect who has completed an academy season now receives one deterministic annual development opportunity before the existing age-up and release rules. The chance depends on age, potential headroom and training-attendance factor; gains are limited by PA. The academy's existing age eligibility, squad caps, promotion and release rules remain unchanged.

## Ten-season match-development cohort test

The test ran 1,000 synthetic players in each match pathway, with age and CA distributions held constant across groups. The manager and Premier League AI groups each received 35 full-match appearances per season; the EFL AI group received 42.

| Cohort | Players | Assumed matches / season | Average match-driven CA gains | Average final CA |
|---|---:|---:|---:|---:|
| Manager | 1,000 | 35 | 7.770 | 62.74 |
| Premier League AI | 1,000 | 35 | 7.761 | 62.74 |
| EFL AI | 1,000 | 42 | 9.148 | 64.12 |

The near-identical manager and Premier League AI results are expected: both now use the same chance function and the same 35-match exposure. The EFL cohort's higher gain is explained by its deliberately higher assumed appearance count, not a division-specific bonus.

These figures isolate match-driven development. They are not full career projections and exclude the separate annual ageing/development pass.

## Academy cohort test

- 5,000 synthetic prospects.
- Ages 15–18 at test start.
- Up to four completed academy seasons.
- 6,724 annual development events across the cohort.
- Zero CA-above-PA violations.

## Invariants checked

- Duplicate fixture processing does not create a second growth roll.
- Zero match minutes do not create match-experience development.
- Manager, Premier League AI and EFL AI match pathways all call the shared helper.
- Domestic / European simulated cup pathway calls the shared helper.
- European league-phase simulation now records player match stats and progression.
- Academy annual progression is connected to the completed-season pathway.
- Player CA never exceeds PA in the synthetic cohorts.
- No attributes are invented for legacy profiles by the match-development helper.

## Preserved behaviour and limitations

- Existing annual ageing and retirement rules are retained.
- No mass player rebalance or player identity replacement is performed.
- No database schema changes are made.
- No browser-based save migration or live Supabase round-trip was executed.
- Match simulation exposure in the synthetic tests is fixed by design; real player minutes, injuries, transfers and selection decisions will produce different outcomes.
- European league-phase player stats/progression are connected at the simulation function, but a complete multi-season European career was not run end-to-end in a browser.
