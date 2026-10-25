# CM Mobile v3.26 — Transfer-market performance

## What changed
- Replaced all-pairs duplicate checks in transfer-market roster construction with identity-index buckets keyed by career ID, Transfermarkt ID and normalized name. Existing identity-equivalence checks remain the final authority.
- Memoized Transfermarkt profile lookups and pre-indexed official PL/EFL roster-name lookups.
- Cached the master transfer-market list within an unchanged UI/game state.
- Search and filter interactions now redraw only the transfer-market results area and do not serialize/compress the full saved career on every keystroke/filter selection. Search text and player-role sets are memoized for each market-row object.
- Full state-changing renders invalidate the market cache so purchases, loans, AI updates and roster changes are reflected correctly; a purchase/loan writes the save once through the render path instead of saving twice.
- European-roster duplicate cleanup and the shared roster dedup helper use the same identity index approach.

## Compatibility
Updated from v3.25. This does not reset or replace career data.

## Validation
Inline JavaScript syntax and ZIP structure checked. A seeded 4,000-record identity fixture produced exactly the same retained records with linear and indexed deduplication. No full browser performance profile against the user's saved career was performed.
