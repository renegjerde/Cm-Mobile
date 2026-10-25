# CM Mobile v3.30 — Cup squad registry fix

This archive contains the complete version folder for CM Mobile v3.30.

## Changes
- FA Cup and other competition fixtures now resolve a club's canonical registered squad by its actual club identity, not solely the competition-specific division label.
- Boston United's cup entry, which is labelled `Non-league` for cup-draw purposes, now resolves to its National League squad database rather than a fallback roster with labels such as `Boston United Midfielder 10`.
- Boston United's current first-team register is synchronised from the 2026/27 squad list. Where the same player was already in the save, mutable career state (apps, goals, injuries, suspension, contract and loan data) is retained. The migration does not alter completed match scores.
- Cup player appearances, goals, assists and availability events update the canonical roster for Premier League, EFL/National League, European and cup-only teams. A duplicate legacy function that shadowed the all-squad statistics handler was removed.
- Name/alias matching is normalized, and a supplied club index is accepted only when it actually refers to the same club name.
- Genuine cup-only clubs with no roster in the embedded database receive a persistent 25-player game squad with unique human-style generated names, instead of positional placeholders. These identities are marked as fictional/unverified rather than presented as real players.

## Important limitation
This makes sure every simulated cup team has a playable game roster and that known clubs use their canonical in-game register. It does **not** mean every extra non-league FA Cup entrant has a fully verified real-world 2026/27 squad. Such clubs use a persistent generated squad until a reliable current squad register is added. Previously played matches and their saved commentary are intentionally not rewritten.

## Validation
- Both inline JavaScript blocks pass `node --check`.
- Isolated migration/resolution test: Boston United's placeholder roster was replaced by 28 registered first-team names; the resolver selected the National League roster despite a cup entry labelled `Non-league`; existing player appearances, goals and injury state were preserved.
- Unregistered cup-only fallback: 25 unique named players generated; no `Club Midfielder 10`-style placeholder names.
- Confirmed only one `recordSimulatedCupPlayerStats` definition remains.
- ZIP integrity checked separately.

A full interactive browser test with the user's saved career was not performed.
