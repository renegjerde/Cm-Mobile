# CM Mobile 4.0 – Classic Edition

## Version 4.0.4 – Cup Format Repair

This maintenance release corrects the domestic cup participant pools and progression counts, and fixes low-contrast text in cup screens.

## Correct cup formats
- EFL / Carabao Cup: 20 Premier League clubs + 72 clubs from the Championship, League One and League Two = 92 unique entrants. National League clubs are not automatically added to the EFL Cup.
- FA Cup: the same 92 professional entrants plus 32 selected non-league entrants = 124 unique entrants.
- The Carabao Cup has exactly four semi-finalists across the two-legged semi-final; the FA Cup has 32 clubs after the third round.

## Saved-career compatibility
- Existing player identities, attributes, contracts, statistics and career history are retained.
- Played cup results and saved semi-final tie records are preserved.
- Unstarted cups are rebuilt with the corrected entrant list.
- Progressed cups are repaired only where the saved results/ties provide enough evidence to identify the correct field. Otherwise the previous field is preserved and a data-integrity warning is recorded rather than guessing.
- No save schema or Supabase schema change.

## Publishing
1. Back up the GitHub repository and the current career save.
2. Replace the repository `index.html` with the file in this package.
3. Keep the existing Supabase project and database schema.
4. Do not rerun `supabase_cm_mobile.sql`; it is unchanged.
5. Open a copy of an existing career and verify FA Cup, Carabao Cup, the saved match history and mobile cup screens.

## Validation
- 24 retained legacy JavaScript regression harnesses passed.
- 2 new cup-format / save-migration harnesses passed.
- All 3 inline JavaScript blocks passed `node --check`.
- Package ZIP integrity checked.
- Full live browser/device acceptance test and Supabase round-trip have not been performed here.

See `CUP_COMPETITION_REPAIR_REPORT_v4.0.4.md` and `CHANGELOG_v4.0.4.md` for detail.
