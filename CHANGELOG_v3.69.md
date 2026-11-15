# Changelog – v3.69

## Player Generation & Ability Calibration

- Replaced new-player role-agnostic random attribute generation with deterministic tactical-role profiles and style variation.
- Aligned primary-role skill index closely to the existing CA/rating field without replacing the game's CA calculation.
- Added dedicated goalkeeper attribute profiles and restrained age-related changes to physical/technical attributes.
- Added age/talent-tier PA generation with rare elite outcomes, a low-headroom outcome, and strict age-based headroom limits.
- Applied the new models to new domestic/world players, new academy intake, initial and annual free agents, European profile materialization, and generic lower-division fillers.
- Added model provenance to new generated player records.
- Changed missing-attribute backfill to deterministic, missing-fields-only behavior.
- Existing valid player data is not recalibrated or overwritten.

## Validation

- Inline JavaScript syntax check passed.
- Synthetic tests passed for 8,000 profiles across 16 tactical roles.
- Constructor fixtures passed for 2,000 academy prospects, 1,000 annual free agents and a 25-player generic roster.
- Synthetic PA tests passed for 40,000 academy and 40,000 free-agent samples.
- `supabase_cm_mobile.sql` is byte-identical to v3.68 and does not need to be rerun.
