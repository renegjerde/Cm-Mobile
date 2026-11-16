# CM Mobile 4.0 – Classic Edition

Final visual edition based on the v3.82 application.

## Design
The interface has been restyled as a compact, information-dense football management game with a restrained late-1990s blue/grey palette, square panels, clear table hierarchy and compact navigation. The presentation is inspired by the usability and visual language of Championship Manager 97/98; it does not reproduce proprietary artwork or screen assets.

## Included
- `index.html` – complete game application.
- `VERSION.txt` – internal release version.
- `CHANGELOG_v4.0.md` – design and cleanup notes.
- Previous player-profile, squad UI, progression, transfer, economy and competition reports/tests retained for reference.
- `supabase_cm_mobile.sql` – unchanged database script.

## Publishing
1. Back up the current GitHub repository and existing career data.
2. Replace the repository's `index.html` with this release's `index.html`.
3. Keep the existing Supabase project and schema.
4. Do **not** rerun `supabase_cm_mobile.sql`; this release makes no database changes.
5. Test an existing saved career on desktop and mobile before making it the public default.

## Compatibility and safety
- No save-schema or database migration.
- No changes to player identities, player attributes, squads, contracts, transfer history, match simulation or competition logic.
- Existing v3.82 player profiles, clickable club squads and opponent starting XI are retained.
- The game UI no longer displays build/version information. Version 4.0 remains in the release files for maintenance and support.

## Validation limitations
Automated syntax and feature regression checks do not replace full manual browser testing on real mobile and desktop devices or a Supabase round-trip. Complete that acceptance test before describing the release as production-certified.
