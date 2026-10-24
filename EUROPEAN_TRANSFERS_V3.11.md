# European transfers — v3.11

This version adds the return leg of the European transfer market: European clubs can make offers for players at the manager's club, not only act as destinations in the manual player market.

## Rules
- Offers are probabilistic; no European club is guaranteed to bid.
- Interest is influenced by player value/rating, age, club strength, whether the player is transfer-listed, contract running down, and a recorded wish to leave.
- Offers appear in the same transfer-offer workflow as domestic bids.
- Accepting an offer checks that the European buyer still has enough budget, removes the player from the user's squad, adds the player to the buyer's European roster, credits the sale proceeds, debits the buyer's budget, updates transfer history, and expires competing pending offers for that player.

## Not included yet
- European cross-border loans and loan-return handling.
- Full national transfer-window and registration-rule simulation.
- Interactive end-to-end browser testing.
