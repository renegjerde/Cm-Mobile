# CM Mobile v2.14 — Dynamic Club Economy

## Changes in v2.14
- Added an annual finance review for all clubs across the Premier League, Championship, League One and League Two.
- Club revenue is recalculated from division, strength, commercial profile and stadium capacity.
- Wage budgets are reviewed using income, squad wage bill, cash position, sporting rank, and promotion/relegation status.
- Transfer budgets are recalculated annually for AI clubs and tied to division, revenue, cash and sporting outcome.
- Club reputation and strength now evolve gradually with league performance and promotion/relegation.
- Fixed season rollover so club finance data is not blindly reset immediately before the annual review.
- Preserves the manager's existing cash balance; user club wage budget is reviewed separately.

## Notes
- Financial values are a game-balance model, not an audited simulation of real club accounts.
- Stadium capacities are explicit for the listed larger clubs; other clubs use division-based estimated capacities.
- The annual review uses league standings captured before tables reset.
- Existing career data is retained; financial policy data migrates when the new version is loaded.
