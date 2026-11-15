# CM Mobile v3.73 – AI squad planning report

## Why this step was needed

The v3.72 market could move players between clubs and fill some vacancies from free agency, but it primarily used positional headcount. A club could therefore have a full group of defenders or midfielders while lacking enough players at a competitive level. AI contracts also expired through the existing end-of-season cleanup without a prior club-level renewal decision.

## Changes implemented

### 1. Strategic squad assessment

`aiSquadStrategicPlan(squad, club)` now evaluates each position group using:

- positional headcount against the established 3/8/8/6 squad targets;
- number of players rated within nine points of club strength;
- an ageing core of important players aged 32 or older.

Where headcount is adequate but credible senior depth is not, the plan can still report a quality need. The league transfer buyer selection and free-agent shortlist use this assessment. A selling club must still have positional surplus, which protects clubs from creating a vacancy merely to sell a player.

### 2. Contract renewal before expiry

`processAIContractRenewals(completedSeasonYear)` runs during the season transition immediately before `processExpiredContracts`.

The renewal plan considers:

- contract ending by the next season boundary;
- rating relative to club strength and position-group ranking;
- age and goalkeeper/outfield distinction;
- player exit requests and loan status;
- whether a credible academy player can succeed an ageing reserve;
- the club's existing wage budget and projected wage bill.

The AI does not renew every player. Fringe players, players with exit requests, players beyond the age policy and players whose renewal would exceed the wage tolerance can leave through the existing contract-expiry system.

### 3. EFL consistency

After renewals, the EFL world roster is mirrored back to the corresponding EFL market database. The renewal pass uses the canonical domestic `worldSquads` roster and skips the manager-controlled club, avoiding a second copy of the user's player records.

## Test evidence

- Targeted test: a squad with all nominal positional slots filled but insufficient credible players still receives strategic quality needs.
- Targeted test: an in-level core player renews; an over-age outfield veteran and a fringe player do not.
- Targeted test: a credible youth successor can prevent an ageing reserve from being automatically renewed.
- Targeted test: a club already over its wage budget does not renew an expensive player.
- Ten-season test: 24 AI clubs, 576 initial players, 1,472 contract renewals, 378 players allowed to expire, zero duplicate career identities, maximum roster size 24 and zero wage-budget-ceiling violations.
- Existing v3.72 transfer/expiry tests and v3.71 progression invariants pass against the v3.73 source.

## Interpretation and limits

The 24-club ten-season cohort is a deterministic test of contract planning, not a simulation of the complete game world. The renewal pass currently targets domestic clubs represented in `worldSquads`; separate European transfer-only rosters do not yet run their own autonomous renewal cycle. The test does not model actual match schedules, transfer fees, injuries, tactical fit, agent negotiations or full financial cash flows. It should be read as evidence that the new rules behave consistently under controlled conditions, not as proof that every club will form a perfect squad over 10–20 seasons.
