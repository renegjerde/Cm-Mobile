# CM Mobile v3.75 – AI loan development report

## Purpose

The academy pathway introduced in v3.74 could move young players into senior squads, but some prospects would still struggle to find a route to regular senior football when the parent club had stronger established options. v3.75 adds a controlled AI-to-AI loan pathway.

## Loan selection

At the annual season transition, `processAIAutonomousLoans` considers AI-controlled clubs represented in the canonical `worldSquads` and EFL player database. The manager-controlled club is excluded as both parent and recipient.

A parent-club candidate must:
- be 18–23 years old;
- not already be loaned, injured, a free agent or an academy player;
- come from a positional group with at least one player above the normal positional target;
- have limited prior-season usage (no more than seven appearances and no more than 750 minutes);
- be within the configured ability band relative to the parent club;
- not have been loaned in the immediately preceding season.

A recipient must:
- be a different AI club, 3–18 strength points below the parent;
- have a real shortage in the player's positional group;
- be within eight CA points of the player's ability;
- have fewer than 24 senior players;
- not already have an AI loan arrival that season.

The system allows at most one outgoing loan per parent club and one incoming loan per recipient club per season. It uses a modeled 50/50 wage share: the borrower pays half and the parent retains half. The EFL finance calculation now uses the same shared-wage function as the PL calculation. No loan fee is charged in this first iteration.

## Match eligibility and development

An AI-managed loanee is stored in the recipient roster with `loanStatus: 'in'`. This is intentional: the game's competition and AI match-selection paths exclude `loanStatus: 'out'` players, while incoming players remain eligible. The existing match experience development function therefore continues to apply when the loanee is selected for an AI match. The loan selection itself improves the chance of selection by requiring a positional vacancy and a plausible ability fit; it does not guarantee a fixed number of minutes.

AI transfer candidate shortlists exclude players with active loan status, preventing a sale from moving the player away before the loan ends.

## Return and career history

Loans end at the modeled week-38 date. The weekly loan-return flow calls `processAIAutonomousLoanReturns`, which returns the player to the original canonical PL or EFL roster. It preserves career identity, potential, attributes and the loan-season statistics. The loan spell is archived in career history and career totals, then the active season counters are reset. Return processing is idempotent: a returned player cannot be returned twice.

## Test evidence

### Targeted tests
- Premier League parent-to-recipient loan: created and returned successfully.
- EFL parent-to-recipient loan: created and returned to the canonical EFL parent roster.
- EFL loanee was selected into the recipient's AI league XI.
- A second run in the same season did not create duplicate loans.
- A recipient with no positional shortage did not receive a loan.
- Career identity, stats archive, loan metadata cleanup and idempotent return passed.
- AI transfer shortlist guards exclude loaned players.
- PL and EFL wage tests confirm a 50/50 split, including the parent's retained share.

### Long-horizon simulation
- 10 simulated seasons.
- 23 AI clubs (11 lending clubs and 12 recipient clubs).
- 55 AI loans created and 55 returned.
- Peak concurrent loans: 11.
- Duplicate career identities after the simulation: 0.

### Regression and syntax
- v3.72 AI transfer/contract-expiry regression passed.
- v3.73 strategic squad-planning targeted and ten-season tests passed.
- v3.74 academy promotion and season-transition tests passed.
- All three inline JavaScript blocks passed `node --check`.
- Release ZIP passed CRC/integrity verification.

## Limitations

This is a controlled function-level and ten-season loan lifecycle simulation, not a full browser career simulation. It does not prove a particular number of starts or minutes for each loanee in a complete game world. Recipient selection uses positional need and relative ability, and the existing AI match-selection/development systems provide the actual appearances and match experience. Agent negotiations, loan recall clauses, performance-based minimum-minute clauses, loan fees, European-only AI loan networks and a full financial cash-flow model remain future work. The manager's own loan workflow has not been changed.
