# CM Mobile v3.77 – AI European Transfer Market Report

## Objective
Make the European AI transfer market more connected to the English football world, while retaining one authoritative player record as players move between canonical club rosters.

## Implementation
The international AI market now builds its domestic participant list from the same canonical Premier League/EFL roster sources used by the AI loan pathways, then adds European clubs from `europeanTransferClubData` and `europeanTransferSquads`.

A buyer must have a positional need, available budget and squad capacity. A seller must have surplus depth in the selected position. Candidate players must meet a minimum quality relative to the buyer's strength, must not be on loan, must not already have moved during the current transfer window, and must not already exist in the buyer's roster under the same career identity.

Transfers can now flow through these routes:
- European club to another European club.
- EFL club to European club.
- European club to EFL club.
- European club to Premier League club.
- Premier League club to European club (same shared route).

The player is removed from the source roster and inserted into the destination's canonical roster. Career identity is retained; roster ID is refreshed for the destination. CA, PA, attributes, history and career totals are copied without recalibration. Transfer budgets are debited/credited; EFL club rows and finance records are kept synchronized.

## Targeted results
Seven targeted checks passed:
1. Europe-to-Europe transfer.
2. EFL database roster to Europe.
3. Europe to EFL database roster.
4. Europe to Premier League.
5. Canonical EFL world-squad roster to Europe.
6. Europe to canonical EFL world-squad roster, including EFL mirror and finance synchronization.
7. Manager-controlled club exclusion, with PL and EFL AI entries present.

Each of the six transfer scenarios verifies one canonical copy of the player's career identity after the transfer, and confirms CA/PA preservation.

## Regression coverage
The following retained suites pass against the v3.77 source:
- v3.72 AI transfer and world-development regression.
- v3.73 AI squad planning targeted and long-horizon tests.
- v3.74 academy promotion, annual integration and long-horizon tests.
- v3.75 AI loans, monitoring, returns and long-horizon tests.
- v3.76 European academy integration, loan monitoring, and ten-season loan lifecycle.
- Three inline JavaScript syntax checks.

## Limitations
This is not a complete transfer-negotiation simulation. It does not model agents, player wage demands, contract negotiations, release clauses, registration windows by country, or detailed UEFA registration constraints. It uses bounded, deterministic transfer attempts based on current roster strength/needs and available budget. It does not run a full browser career or Supabase round-trip test.
