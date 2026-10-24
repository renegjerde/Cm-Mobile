# CM Mobile v3.17 — Player registration audit

## Problem addressed
The European transfer squads were seeded from an embedded Transfermarkt-derived snapshot dated 6 July 2026. The English league database also contains current-season PL/EFL registered squad lists for September 2026. Without a cross-registry reconciliation, a player transferred/registered in England could still remain available in the former European club's market squad. That created duplicate entries in the transfer market and could also reintroduce that player when European match squads were rebuilt from the older snapshot.

## Source-of-truth rule
For the 2026/27 opening season, the official English PL/EFL September 2026 registered-squad lists are treated as authoritative over the older European snapshot. For later game seasons, the current saved in-game rosters are used instead of blindly reapplying the 2026 static list.

## Identity matching order
1. Stable career ID, when shared by the two saved copies.
2. Embedded Transfermarkt player ID, saved explicitly on English and European player records.
3. Exact normalized full name with trusted birth-date agreement. When one side has an official September 2026 English registration and the other side lacks a trusted DOB, exact normalized name is used as a fallback unless conflicting stable IDs identify different people.

Names are normalized for accents and punctuation. The algorithm does not remove a record merely because two unrelated records have similar names.

## Cleanup behavior
- European transfer rosters are reconciled when the career is loaded/rendered after migration to v3.17.
- A matching, non-loaned player is removed from the European club's current roster if already registered in England.
- Duplicate records inside an individual European squad are collapsed.
- The market list is deduplicated by stable identity as a final display safeguard.
- European match simulation reads the persistent European transfer roster, preventing departed players from reappearing through the July snapshot.
- Loaned-out players retain their ownership record; this cleanup is not intended to cancel loans or erase the parent club's ownership.
- The count of removals and the player/club pairs are recorded in the in-game log and `europeanTransferDedupHistory`.

## Validation
- JavaScript syntax checked with Node.js.
- Isolated migration regression test confirmed one matched English registration was removed, a European-only player remained, an unrelated same-name player with a conflicting trusted identity remained, and a second run made no further changes.
- The user's actual save data was not available to this test harness; the number removed in that save will be visible in the game log after publishing v3.17 and opening the existing career.
