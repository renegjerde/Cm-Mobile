# CM Mobile 4.0.4 – Domestic Cup Format Repair & Classic Contrast

## Executive finding

The 4.0.3 domestic cup builder used every entry in the global `CLUBS` registry as the Premier League participant source. That registry contains 116 clubs across five levels, including 24 National League clubs. The EFL Cup should contain only the 20 Premier League and 72 EFL clubs (Championship, League One and League Two): 92 teams total.

The erroneous Carabao Cup pool therefore contained 116 clubs. The FA Cup also inherited those 24 National League clubs as if they were all professional entries, while its non-league candidate filter then excluded National League candidates and only added 25 other non-league teams. The resulting FA Cup pool was 141 rather than 124.

This reproduces the counts seen in the supplied career screenshots:
- FA Cup after its third round: 35 teams instead of 32.
- Carabao Cup at its semi-final first-leg stage: 5 teams instead of the 4 semi-finalists.

## Correct formats

### EFL / Carabao Cup

- 20 Premier League clubs.
- 72 EFL clubs: 24 Championship, 24 League One and 24 League Two.
- Total: 92 unique entrants.
- 4 EFL clubs start in the preliminary stage; the other EFL clubs enter in stage 2.
- 11 non-European Premier League clubs enter stage 3; 9 European-qualified Premier League clubs enter stage 4.
- Semi-finals are two-legged. The four semi-finalists remain four teams after the first leg, then two finalists after the return leg.

Expected active-field count after each completed stage (future entrants included):
`[90, 55, 32, 16, 8, 4, 4, 2, 1]`.

### FA Cup

- 20 Premier League clubs.
- 72 clubs from the Championship, League One and League Two.
- 32 selected non-league entrants.
- Total: 124 unique entrants.

Expected active-field count after each completed stage (future entrants included):
`[84, 64, 32, 16, 8, 4, 2, 1]`.

## Save compatibility and migration

- Domestic cup format version is advanced to 3.
- Unstarted cups are rebuilt from the corrected entrant pools.
- A progressed FA Cup is repaired only when the number of surviving clubs that belong to the corrected canonical pool exactly matches the mathematically expected number for the saved stage. The historical results array is not rewritten.
- A progressed EFL Cup at the semi-final first-leg stage is reconstructed from the two saved semi-final tie records, which are the authoritative record of the four participants. The extra bye club is removed; the saved tie records and played results are preserved.
- For any save where the current field cannot be safely inferred without inventing or deleting a qualified club, the existing field and results are preserved and an integrity warning is stored. The migration does not guess.
- If a corrected active field has an unplayed pending ordinary cup tie that was drawn from the oversized field, that pending tie is discarded and redrawn from the corrected entrants. Completed result history remains untouched.

## UI contrast fixes

The cup screens now use explicit high-contrast text colors for dark competition headers, result rows, team names, scores, metadata, phase/status pills and accordion controls. Dark text on dark blue and pale text on pale buttons from the supplied screenshots are corrected.

## Tests performed

- Entrant count: 92 unique EFL Cup clubs.
- Entrant count: 124 unique FA Cup clubs.
- Complete expected active-field progression for both cups checked.
- The 4.0.3 incorrect 35-team FA Cup and 5-team Carabao Cup states reproduced from the old formula.
- Save migration test: FA Cup 35 to 32 where exactly 32 canonical survivors can be identified.
- Save migration test: Carabao semi-final 5 to 4 using the two saved ties.
- Historical cup results preserved in both migration cases.
- All 24 current retained legacy JavaScript regression harnesses passed (the v3.77 transfer test remains excluded as a historical test based on pre-v3.78 wage rules).
- Both new cup repair test harnesses passed.
- All three inline JavaScript blocks passed `node --check`.
- SQL script is unchanged from 4.0.3; no database migration is required.

## Validation limitations

No live browser/device acceptance test or Supabase round-trip was performed in this environment. The saved-career migration is covered by controlled harnesses, but the user's actual career should be backed up and opened for acceptance testing after deploying the new `index.html`.
