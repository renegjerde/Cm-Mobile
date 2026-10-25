# CM Mobile v3.31 — canonical domestic registry groundwork

## Changes
- Added a canonical, read-only domestic club registry view with stable name-derived IDs across the Premier League and EFL/National League registries.
- Added a registry audit helper that reports duplicate IDs and club counts by division.
- Kept the original `CLUBS` ordering unchanged to protect legacy saved-career indexes and `worldSquads` references.
- No existing career data, completed scores, fixtures, or player statistics are rewritten by this change.

## Validation
- Both inline JavaScript blocks pass `node --check`.
- Source inspection confirms the canonical registry is built from `CLUBS` plus `EFL_DIVISIONS`, with legacy Premier League indexes retained and lower-league entries explicitly marked as not having a PL index.

## Important limitation
This is the safe registry foundation, not the complete league-system repair. New careers from Championship, League One and League Two are still not fully supported by the current manager-facing state model: the game assumes `appState.club` is an index into `CLUBS`, while lower-league competition simulation lives separately in `appState.lowerLeagues`. The picker and career-start flow must be refactored next so lower-division managers have a canonical club identity, squad, finance, league fixtures/table and transfer state without double-simulating the AI league. Do not describe the lower-division career bug as fixed yet.

## Next required stage
1. Introduce a manager-club identity abstraction that supports both legacy PL index and stable club ID.
2. Route manager fixtures, standings, squad, finances, transfers and match simulation through that abstraction.
3. Add migration and tests for existing PL saves plus new careers at all four EFL levels.
4. Run full season simulations and verify team counts, fixtures, points, promotion/relegation and playoffs.
