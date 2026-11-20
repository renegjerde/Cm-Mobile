# CM Mobile 4.0.4 – Cup Format Repair

## Fixed
- Corrected the Carabao Cup entrant source to include exactly 20 Premier League clubs and 72 EFL clubs; National League clubs are no longer implicitly included as EFL entrants.
- Corrected the FA Cup pool to 92 professional entrants plus 32 non-league entrants (124 total).
- Corrected the EFL Cup early-round entry structure and European Premier League entry stages.
- Corrected the expected team count after every completed stage, including four Carabao Cup semi-finalists throughout the first leg.
- Added a versioned, guarded migration for saved cup competitions. The migration preserves played result history and does not guess which clubs qualified where the evidence is incomplete.
- Corrected unreadable text and status labels in the cup competition panels, including score rows, club names, phase labels, buttons and accordion controls.

## Preserved
- Player and club identities, squads, career statistics and history.
- Completed cup results and saved semi-final tie records.
- Existing local and cloud career save paths.
- Existing database schema and Supabase configuration.

## Validation
- 24 retained legacy regression test scripts passed.
- 2 new cup-format and saved-career migration tests passed.
- All 3 inline JavaScript blocks passed `node --check`.
- ZIP CRC and source/SQL integrity checks passed.
- The historical v3.77 transfer test is retained but not counted as an active regression because its wage-budget expectation predates the v3.78 negotiation rules.

## Important
No SQL or database migration is required. Do not rerun `supabase_cm_mobile.sql`.
Full manual browser testing on mobile/desktop and a Supabase round-trip remain outstanding.
