# CM Mobile v2.58 — Loan economy and EFL development validation

## Changes
- EFL rosters are included in `activeLoanRosters()`, so parent clubs retain/pay the non-borrower share of wages for players loaned into EFL clubs.
- EFL borrower wage bills now charge only the configured borrower share for outgoing-loan players. Non-loaned EFL players remain charged at 100%.
- EFL player objects receive the same season-ageing/development pass as PL players, including PL players currently loaned to EFL clubs.
- EFL season performance counters are reset at the new-season boundary.

## Validation
- All inline JavaScript blocks pass `node --check`.
- ZIP integrity checked after packaging.
- A deterministic isolated wage-allocation test confirms that a £20k/week player with a 50% share yields £10k/week borrower expense and £10k/week retained parent expense.
- A season-reset test confirms apps/minutes/goals/assists and competition stats are reset on EFL roster player objects.
- No full browser, UI interaction, or complete-season run is claimed. EFL league matches still use the simplified automatic lower-league simulation.

## Remaining limitations
- This pass improves wage allocation and annual development but does not add an EFL loan-in market UI.
- Loan recall/return paths are retained from v2.57; this pass does not claim exhaustive browser end-to-end validation of every transfer route.
