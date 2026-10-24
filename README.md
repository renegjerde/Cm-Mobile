# CM Mobile v3.17 — English/European player registration cleanup

## Contents
- `index.html` — complete game, ready for the GitHub Pages root.
- `PLAYER_REGISTRY_AUDIT_V3.17.md` — registration-deduplication rules and validation notes.

## Changes in v3.17
- Adds a persistent Transfermarkt profile ID to player records created from the embedded profile archive, so identity is stable across club changes and save migrations.
- Treats the official English PL/EFL squad registers for September 2026 as the source of truth for the 2026/27 starting state.
- On loading an existing career, removes matching players from European transfer squads when that same player is already registered with an English club. Matching uses stable career IDs and profile IDs first, then exact normalized names with trusted birth dates/official registration as a fallback.
- Removes duplicate identities inside a European squad and prevents the same identity from appearing twice in the transfer list.
- Keeps loaned-out ownership records intact; players on loan are not removed from their parent club just because they appear in a borrower roster.
- European match simulation now uses the persistent European transfer roster, so a player removed from a European club is not resurrected from the older July 2026 snapshot in a later European match.
- Records removals in the career log and a small audit history so the clean-up can be reviewed in-game.

## Publish to GitHub Pages
1. Unzip this archive.
2. Open the `CM_Mobile_v3.17` folder.
3. Replace `index.html` in the `main` branch root with this version's `index.html`.
4. Commit/push, reload the live site, and confirm the title/header shows `v3.17`.

The version folder inside this ZIP is a delivery folder; GitHub Pages continues to use the root `index.html` unless the repository's Pages configuration says otherwise.

## Test status
- All inline JavaScript blocks pass `node --check`.
- Isolated regression test passed: an English-registered duplicate is removed from the European squad; a European-only player stays; same-name players with conflicting trusted birth dates/identity references are not incorrectly deleted; running the cleanup twice is idempotent.
- ZIP integrity checked after packaging.
- A complete interactive browser test using the user's actual saved career has not been completed. The live migration count is written to the in-game log when the career is next loaded.
