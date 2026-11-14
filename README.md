# CM Mobile v3.63 – permanent UEFA List B snapshot

## Files
- `index.html` – complete game source.
- `VERSION.txt` – version marker.
- `PLAYER_AUDIT_REPORT.md` – source and migration notes.
- `UEFA_LIST_B_SNAPSHOT_2026-11-14.json` – readable copy of the permanent player-name/position snapshot.
- `README.md` – deployment instructions.

## What's new
UEFA List B players from the last completed round in each 2026/27 European competition are merged permanently into the normal club squads. This is a fixed offline snapshot dated 14 November 2026.

No later UEFA updates are fetched or applied. There is no List A/List B label in the game UI. Existing club records are retained; only missing names are appended.

## Publish
Replace the repository root `index.html` and `VERSION.txt` with the files in this package. Commit and publish through the repository's configured Pages workflow. Existing Supabase SQL is unchanged.
