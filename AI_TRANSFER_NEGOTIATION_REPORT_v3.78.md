# CM Mobile v3.78 – AI Transfer Negotiation Report

## Objective
Make the international AI transfer market more credible by introducing price negotiation, contract-sensitive valuation and wage affordability, while preserving the canonical player record and all existing transfer routes.

## Negotiation model
The pure helper `aiNegotiateTransferTerms` calculates the transfer terms without mutating the player or either club. It considers:

- Asking price and buyer transfer budget.
- Remaining contract years (shorter contracts reduce the seller's reservation price; long contracts increase it).
- Player age and rating relative to the selling club.
- A player's explicit `wantsToLeave` state.
- A bounded opening offer and up to two counter-offer increments.
- A maximum transfer commitment of 65% of the buyer's current transfer budget.

The negotiation seed is stable for a given player, buyer, seller, season, gameweek and attempt. This keeps outcomes reproducible for regression tests and avoids a different result on every render.

## Contract and wage terms
On agreement, the incoming player receives:
- A weekly wage demand based on the existing wage, current CA, buyer/seller strength gap and age.
- A two-year contract at age 33+, a four-year contract at age 23 or younger, and a three-year contract otherwise.
- A new contract end date at 30 June after the agreed term.

If the buyer has a club-finance wage budget, the available wage room is checked before the transfer. For European clubs without a separate wage-budget field, the fallback compares the wage demand with the current squad's wage level. Finance records are updated where available.

Negotiation attempts and outcomes are retained in `aiNegotiationHistory` (maximum 500 records) for diagnostics.

## Targeted results
Nine targeted checks passed:
1. Europe-to-Europe.
2. EFL database to Europe.
3. Europe to EFL database.
4. Europe to Premier League.
5. Canonical EFL world-squad to Europe.
6. Europe to canonical EFL world-squad.
7. Manager-club exclusion and domestic market coverage.
8. Negotiation edge cases: accepted bid, insufficient budget rejection, contract-length effect and player desire-to-leave effect.
9. Wage-budget protection: a buyer with insufficient weekly wage room is prevented from completing the signing, and the rejection is recorded.

All six completed transfer paths retain exactly one canonical copy of the player's career identity and preserve CA/PA. The receiving player has a negotiated wage and contract.

## Regression
Fourteen retained test suites passed, covering transfer/development, squad planning, academies, loan lifecycle, European youth pathways and the v3.77 international transfer market. Three inline JavaScript blocks passed `node --check`.

## Compatibility
The Supabase SQL file is byte-identical to v3.77. No database migration is required. No mass player rebalance or identity rewrite is performed.

## Limitations
The model uses deterministic, bounded negotiation steps rather than agents or multi-round bargaining. It does not model bonuses, sell-on clauses, release clauses, player agents/personality, country-specific transfer windows or UEFA registration restrictions. European wage-budget data is incomplete, so a squad-wage proxy is used where no explicit wage budget exists. No full browser UI test or Supabase round-trip test is claimed.
