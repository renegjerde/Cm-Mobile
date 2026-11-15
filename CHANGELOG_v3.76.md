# CM Mobile v3.76 – European Youth Pathways & AI Loan Monitoring

## Added
- European clubs represented in `appState.europeanTransferSquads` now receive compact rival youth academies and participate in the same annual academy development/promotion cycle as domestic AI clubs.
- European academy prospect ability baselines scale with the club's stored strength (or roster average when no explicit strength is available), rather than inheriting a lower-league fallback.
- Eligible European academy graduates can be promoted directly into their canonical `europeanTransferSquads` roster.
- European promotions preserve career identity, attributes and potential, carry the international-club flag, and are protected by cross-roster duplicate identity checks.
- AI loan monitoring now reviews domestic AI loanees from gameweek 20 onward. Players with fewer than two appearances and fewer than 180 minutes are recalled to their canonical parent roster.
- Early recalls archive the loan spell, clear active loan metadata, record the recall in transfer history and `aiLoanRecallHistory`, and are idempotent.
- Players with meaningful loan usage are not recalled by the low-usage rule.

## Preserved
- Manager-controlled club remains excluded from autonomous academy promotions and AI loans.
- Existing Premier League/EFL academy and loan pathways remain in place.
- No database schema or SQL changes.
- No mass player rebalance, regeneration or career identity rewrite.
- Existing manual loan workflow remains unchanged.

## Validation
- European academy season integration: promotion into canonical European roster, academy vacancy refill and ability scaling.
- AI loan monitoring: early recall of an underused loanee, history/archive checks, idempotence and protection of regularly used loanees.
- Previous PL/EFL loan and return tests rerun.
- Previous academy pathway tests rerun.
- Ten-season AI loan lifecycle simulation rerun: 23 AI clubs, 55 loans, 55 completed returns, zero duplicate career identities.
- All three inline JavaScript blocks pass `node --check`.
- Release ZIP CRC/integrity verified.
