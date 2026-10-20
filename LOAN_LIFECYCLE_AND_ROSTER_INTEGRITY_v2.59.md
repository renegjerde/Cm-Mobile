# CM Mobile v2.59 — Loan lifecycle and roster integrity

## Changes
- Added stable career-identity roster helpers so loan return and recall paths replace an existing copy instead of appending a duplicate.
- Recall now removes the loaned player from the actual Premier League source roster index captured during lookup, rather than re-deriving the index from a club display name.
- Applied identity-safe placement to incoming loan returns, outgoing Premier League returns, outgoing EFL returns, recall, and outgoing-loan destination placement.
- Kept the existing wage-share model: borrower pays `loanWageShare`; parent pays the remainder. EFL borrower wage expense is calculated in its weekly economy loop, and the parent-retained share is included through active loan rosters.

## Validation
- JavaScript syntax checks: both inline script blocks.
- Unit-style isolated roster tests: identity deduplication and replacement behavior.
- ZIP integrity check.
- Not performed: full browser/end-to-end test, full-season simulation, or real-time balance test.

## Known limitation
The EFL league simulation remains a simplified automatic simulation rather than the same interactive match engine used for the user's Premier League matches.
