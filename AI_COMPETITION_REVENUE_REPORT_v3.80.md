# CM Mobile v3.80 – UEFA Competition Revenue Report

## Why this change was needed
The prior finance model (v3.79) provided weekly operating cash flow to permanent European squads. However, the UEFA prize table and `awardUserCompetitionMatch` path paid match and progression rewards through the manager-club budget only. AI clubs therefore did not receive equivalent UEFA competition rewards.

## Implementation
`distributeEuropeanCompetitionPrizesAtSeasonEnd()` runs during the validated season transition, before the previous season's European competition state is cleared. It distributes the existing competition prize values to AI participants in all three UEFA competitions:

- Participation payments for teams in each competition.
- League-phase win and draw payments from recorded `isLeaguePhase` results.
- Playoff, round-of-16, quarter-final and semi-final advancement payments to recorded tie winners.
- Finalist payments to both clubs in the recorded final.
- Champion payment to the recorded competition winner.

`awardAIClubCompetitionPrize()` routes payments to the relevant existing budget field:

- Premier League: `CLUBS[index].budget`.
- EFL: the corresponding `appState.lowerLeagues[division].rows` club budget.
- Permanent European club: `appState.europeanTransferClubData[name].budget`.

Where a finance mirror exists, `appState.clubFinances[name].transferBudget` is synchronized. The separate `appState.clubCompetitionPrizeLedger` records unique season/club/component keys so a repeated season-transition attempt cannot pay the same component twice.

The manager's own club is deliberately excluded from the new AI path because its existing match reward path handles user-team participation and results. That existing user path has also been corrected to match the same stage schedule: playoff, round of 16, quarter-final, semi-final, finalist and champion. Previously, the generic knockout mapping could award the champion amount for a semi-final win and did not pay the losing finalist. In addition, `startNewSeason()` now refuses to advance while a user-controlled European match is pending; otherwise a final could be skipped and the prize calculation would be incomplete.

## Test fixture
The AI-focused harness tests a simulated Champions League season containing a Premier League AI club, a permanent European club, an EFL AI club and the manager's club. It checks:

- Participation and result rewards.
- Knockout progression, finalist and champion rewards.
- Correct routing to PL, EFL and European budget sources.
- Finance mirror synchronization.
- No payout to the manager's club through the AI path.
- Idempotency when distribution is invoked a second time.

Expected fixture outcomes: PL AI budget £31.9m; European AI budget £51.1m; EFL AI budget £4.7m; manager budget unchanged at £20m. These are test fixture values, not real club forecasts.

## Validation scope
See `REGRESSION_SUITE_SUMMARY_v3.80.json` and `INLINE_SCRIPT_SYNTAX_RESULTS_v3.80.json`. The suite includes the focused UEFA distribution test, the v3.79 finance tests, v3.78 negotiation tests, prior loan and academy tests, 10-season squad planning, and 10-season player development.

A separate manager-prize parity harness checks finalist, champion and semi-final payments. This validates the relevant functions in controlled Node test contexts. It does not replace a full in-browser career test or Supabase round-trip.
