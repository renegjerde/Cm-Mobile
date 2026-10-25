# CM Mobile v3.24 — Restore missing U21 players

## Change
- Adds a one-time migration for saved careers to restore missing players from the curated 2026/27 Premier League first-team U21 supplement.
- Applies to all Premier League world squads and the user's squad when the user manages a Premier League club.
- Existing player records are preserved; the migration only appends names that are absent.
- Players with a transfer-history entry showing that they left that club are not re-added.
- Restored players are marked as U21/first-team supplement members and receive a contract through the existing contract helper.
- The migration is version-guarded so it runs once per saved career.

## Validation
- JavaScript syntax validation and ZIP integrity check performed.
- No full interactive browser test against the user's saved career was available; inspect the squad after publishing to confirm expected prospects are present.
