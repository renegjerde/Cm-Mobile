# CM Mobile v3.63 – permanent UEFA List B snapshot

Date: 14 November 2026
Base: CM Mobile v3.62

## Change
- Added a fixed offline snapshot of UEFA List B players from the latest completed matchweek as of 14 November 2026.
- List B entries are merged into the existing club rosters as ordinary players. The UI does not label them as List B or generated players.
- A one-time career migration (`uefaListBPermanentMigrationVersion = 1`) prevents later matchday or in-season updates.
- Existing List A / domestic players are preserved. Exact normalized-name duplicates within the destination club are not added again.
- Players are inserted into the canonical Premier League, EFL, or European roster so transfers and match simulation use the same stored player.
- List B players receive an age-model input constrained to the 16–21 range, consistent with the List B eligibility group. Their skill profile remains the game’s deterministic player model unless separate curated ratings exist.

## Snapshot source and timing
- Champions League: after matchday 4 (3–4 November 2026).
- Europa League: after matchday 4 (4–5 November 2026).
- Conference League: after matchday 3 (5 November 2026).
- The game does not query UEFA after this import.

## Captured List B entries
| Competition | Clubs with data entries | Players |
|---|---:|---:|
| Champions League | 36 | 388 |
| Europa League | 36 | 364 |
| Conference League | 36 | 221 |

**Total captured:** 973 player-name entries across 108 club/competition entries.

## Validation notes
- Within-club normalized-name collisions in the snapshot data: 0.
- List B is merged only once per saved career. A later transfer, retirement or release is not reversed by another UEFA import.
- If a List B player is already present in the same club roster, the existing record is retained, so any existing stats/history remain attached.
- This is a manually curated transcription of starred List B entries from UEFA squad pages. It should not be treated as a complete player-attribute database: names and position groups are the imported registration facts; ratings and some biographical fields remain game-modeled.

## Build tests
- JavaScript syntax check: passed (`node --check` on the main inline script).
- Migration harness: passed; 108 competition team records traversed, 973 List B names in the snapshot, 972 additions with one intentionally pre-existing duplicate, and a second migration added 0 players.
- Within-squad normalized-name duplicates in the supplied snapshot: 0.
- ZIP integrity: checked after packaging.
