# CM Mobile 4.0 – Classic Edition

## Version 4.0.5 – Global Contrast Correction

This maintenance release corrects low-contrast text across nested dark and light surfaces. It preserves the 4.0.4 cup-format repair and all career data.

### Contrast corrections
- Transfer report text, routes, section labels and fees are readable on dark report cards.
- Cup result team names, scores, round labels and progress text use high-contrast colors.
- Light status badges on blue section headers use dark text.
- Disabled controls remain legible without opacity dimming.
- Text colors are explicitly selected by surface rather than relying on one global muted color.

No game logic, cup formats, save schema or Supabase schema is changed.

## Previous version details: 4.0.4 – Cup Format Repair

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


## CM Mobile 4.0.5 – Global Contrast Correction

This release separates muted text colors by surface. Dark transfer-report and cup-result panels now use explicit light text; light Classic panels retain dark text. Light pills on blue section headers use dark text. Disabled controls no longer rely on opacity to communicate state.

No game logic, player data, cup format, save schema, or SQL migration is changed in this release. Replace the app files with this release; do not rerun SQL.
