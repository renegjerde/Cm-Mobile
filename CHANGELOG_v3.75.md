# CM Mobile v3.75 – AI Loans & Young Player Development

## Added
- AI clubs can autonomously loan out suitable 18–23-year-old fringe players at the annual season transition.
- Loan candidates must come from a positional surplus, have limited prior-season usage, be free of an active loan/injury, and fit the recipient club's ability level.
- Recipient clubs must have a genuine positional shortage, be 3–18 strength points below the parent club, and have room below the 24-player squad ceiling.
- At most one AI-managed loan leaves a club and one arrives at a club per season.
- AI loans work across the canonical Premier League/world-squad and EFL roster stores.
- Loans run through the recipient club's modeled season (week 38), then return automatically to the parent club.
- Loan spell statistics are archived into career history and career totals; player career identity and attributes are preserved.
- AI loaned players use the incoming-loan state in the borrower roster so they remain eligible for AI match selection and match-experience development.
- Players who have just returned are not immediately loaned out again in the next season.
- AI transfer shortlists now exclude players currently on loan, preventing an AI sale from breaking an active loan.

## Preserved
- No database schema or SQL changes.
- No mass player rebalance, regeneration or identity rewrite.
- User-managed loan workflow remains unchanged.
- Existing contract, academy, progression and transfer rules remain in place.

## Validation
- Targeted Premier League-to-Premier League loan/return tests.
- Targeted EFL-to-EFL loan/return tests, including selection into an AI league XI.
- 10-season controlled simulation: 23 AI clubs, 55 loans, 55 completed returns, zero duplicate career identities.
- Previous v3.72 transfer, v3.73 squad planning and v3.74 academy regression suites rerun.
- All three inline JavaScript blocks pass `node --check`.
- ZIP CRC integrity verified.
