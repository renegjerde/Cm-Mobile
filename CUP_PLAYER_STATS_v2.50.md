# CM Mobile v2.50 – Cup Player Statistics

## Changes

AI-vs-AI fixtures simulated by `simulateCompetitionMatch` now call the existing `recordSimulatedPlayerStats` function once, after the regular match simulation and before any penalty shoot-out winner adjustment. This means the normal match goals and assists are attached to player season totals, while a shoot-out decider is not recorded as a regular goal.

The integration only persists stats when a participating club has a valid non-negative `clubIndex` and an existing `appState.worldSquads` entry. This avoids accidentally writing generated or temporary cup squads into an unrelated persistent roster. The same existing season totals are used as league matches; the implementation does not yet provide competition-specific split tables.

## Validation performed

- Checked that both inline JavaScript script blocks parse with Node.js.
- Confirmed the new helper is called exactly once in the AI-vs-AI cup simulation path.
- Confirmed the version tag and season header show v2.50.
- Checked the generated ZIP archive integrity.

## Limitations

- No full browser automation or full-season test was run for this version.
- The user-managed cup fixture is played through the live match path and retains its existing statistics pipeline; this change targets AI-vs-AI cup fixtures.
- Teams without a persistent `worldSquads` roster do not have cup stats persisted by this helper.
- Stats are season totals, not split by competition.
