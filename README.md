# CM Mobile v3.11

## Changes
- European clubs participating in the built-in UEFA competitions can now submit transfer bids for players at the user's club.
- European bids use club strength, player rating/value, age, transfer-list status, contract expiry and whether the player wants to leave to shape bid likelihood and price.
- Accepting a European bid transfers the player into that club's existing European transfer squad and updates both clubs' budgets, the user's transfer history, and pending offers for the same player.
- Existing English-club transfer logic remains in place.

## Validation
- JavaScript syntax checked with Node.js (`node --check`).
- ZIP archive integrity checked.
- Full interactive browser/gameplay testing has not been performed.

## Notes
Cross-border loan agreements are not yet included in this release; they are the next part of the European transfer integration.
