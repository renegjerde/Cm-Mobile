# CM Mobile v3.76 – European youth pathways and AI loan monitoring report

## Scope

v3.76 extends the autonomous talent pipeline beyond the English domestic system and adds a measured intervention when a domestic AI loanee is not receiving senior football.

## European academy pathway

The annual academy season processor now adds clubs with persistent rosters in `appState.europeanTransferSquads` to the rival academy set, excluding names already represented in the Premier League or EFL club lists. These clubs use the same compact two-player rival academy cohort and annual prospect development logic as other AI clubs.

European prospect quality uses the club's stored strength from `europeanTransferClubData` when available, otherwise the average rating of its persistent senior roster. This avoids assigning European academies a generic low English-division baseline.

When an eligible prospect meets the existing age, ability, positional-need, roster-capacity and wage checks, promotion inserts the player into the club's canonical `europeanTransferSquads` roster. The player retains career identity, attributes and potential. Promotion metadata marks the player as an academy graduate and international club player. Duplicate identity checks now include European persistent rosters.

## AI loan monitoring

The weekly loan-return flow now also evaluates AI-managed domestic loans from gameweek 20 onward. A loanee is recalled only when both conditions hold:
- fewer than two appearances;
- fewer than 180 minutes played.

A recall returns the player to the canonical Premier League or EFL parent roster, archives the loan spell, clears active loan metadata, resets the active season counters and records the event in transfer history and `aiLoanRecallHistory`. A season marker prevents repeated recall processing. Players with meaningful usage are left at the borrower until the normal loan end date.

This is a deliberately conservative threshold. It does not guarantee playing time or make a judgment about performance; it reacts only to clear lack of use by the midpoint of the season.

## Test evidence

### European academy integration
- A 17-year-old European academy player completed a season and was promoted into the persistent European senior roster.
- The promoted player was removed from the academy cohort.
- Academy vacancies were refilled with European-club metadata.
- A generated European academy prospect used the European club strength baseline.
- Duplicate career identity promotion was blocked.

### Loan monitoring
- An underused AI loanee at week 25 (0 appearances, 0 minutes) was recalled to the parent club.
- Recall history was stored and active loan metadata cleared.
- A second monitoring pass did not recall the player twice.
- A loanee with 8 appearances and 620 minutes was not recalled.

### Regression
- Existing PL and EFL AI loan creation, wage share, match eligibility, scheduled return and archive tests passed.
- Existing AI academy promotion tests passed.
- Ten-season controlled loan lifecycle: 23 AI clubs, 55 loans, 55 completed returns, zero duplicate career identities.
- All three inline JavaScript blocks passed `node --check`.

## Limitations

- European academies currently cover clubs that have a persistent roster in `europeanTransferSquads`. This does not mean every European club in every competition automatically has a fully modeled youth academy.
- European academy graduates are promoted into the European persistent roster. European AI youth loans are not introduced in this release because the current European match simulation does not provide sufficiently consistent individual player-minute accounting for a safe low-usage recall rule.
- Loan monitoring is currently for AI-managed domestic PL/EFL loans. The user's manual loan workflow is unchanged.
- Tests execute extracted functions with controlled state. They are not a complete browser career simulation, full European season simulation, or Supabase round-trip.
