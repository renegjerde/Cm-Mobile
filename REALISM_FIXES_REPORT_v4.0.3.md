# CM Mobile 4.0.3 – Realism Fixes Report

## Scope
This release addresses the highest-priority lifecycle and consistency issues from the 4.0.2 total audit. It is a corrective release, not a claim that every audit item is closed.

## Fixed

### P1 – European player lifecycle
`processCareerAgeing()` now includes `europeanTransferSquads`. A career-identity guard ensures that a player represented in more than one registry is aged only once. Secondary copies receive the updated age, CA, PA, value and relevant profile metadata. Retired identities are removed from duplicate roster copies as well.

`archivePlayerSeasonStats()` now indexes permanent European squads and EFL secondary registries. It archives each career identity once and synchronizes `careerHistory`/`careerStats` to mirror copies.

The season rollover now resets European player season totals and competition statistics alongside domestic player records.

`processAIContractRenewals()` now applies the shared renewal planner to European AI clubs. Domestic EFL world-roster renewals are mirrored back to the EFL registration database.

### P1 – Background match incidents and minutes
`simulateMatch()` now keeps a mutable active XI during the simulation. Direct red cards and second-yellow dismissals remove the player. Injuries remove the player and use up to three same-position replacements from the available squad where possible. The attacking/defensive values used for subsequent chances are recalculated from the active XI, so dismissals and injuries have an in-match effect.

The simulator returns per-player minutes. `recordSimulatedPlayerStats()` records actual minutes and gives match-experience development based on those minutes. Substitutes are included in appearance/minute recording.

### P1 – Duplicate EFL finance processing
`reviewAllClubFinancesForNewSeason()` now de-duplicates clubs by normalized club name, preferring the canonical `CLUBS` representation when present. `processWeeklyClubEconomy()` skips lower-league mirror rows already represented in `CLUBS`.

## Targeted validation
- European player aged exactly once across distinct registry copies.
- European season row archived once, including goals and career totals.
- EFL mirror receives archived career history.
- European AI contract renewal executes through the common renewal planner.
- Background simulation produces second-yellow dismissals and injury substitutions.
- Players removed during a background match receive reduced minutes; substitutes receive minutes.
- EFL annual finance review and weekly economy each process a duplicated club once.

## Regression validation
- 22 active legacy regression scripts pass.
- `ai_european_market_tests_v377.js` is retained as a historical test but excluded from the active suite; its wage-budget expectation is superseded by the v3.78 negotiation model and the current v3.78 test passes.
- Inline JavaScript syntax checks pass.
- ZIP CRC check passes.

## Not yet resolved
1. Live and background goal distributions have not yet been calibrated against one shared large-sample target. This release makes background incidents affect the match but does not claim statistical equivalence of both engines.
2. Weekly economic processing still follows the user's competition cadence; a global calendar tick is a separate task.
3. Non-English national league simulation and fully performance-based qualification remain limited.
4. Full browser/mobile and Supabase end-to-end tests remain outstanding.
