# Changelog – CM Mobile v3.70

## Player progression & CA/attribute synchronization

- Added a single rating-change helper for generated players using the v3.69 role-archetype attribute model.
- When a v3.69-generated player gains or loses CA/rating through pre-season training, match experience or the end-of-season ageing pass, the primary-role attribute profile is recalibrated to keep the role-skill index aligned with the new CA.
- Attribute alignment preserves the relative strengths and weaknesses of the existing generated profile; it does not replace the player with a new archetype.
- Legacy players with older or missing model provenance are deliberately excluded from this synchronization. Their valid saved attributes are not silently rebalanced.
- Corrected the legacy EFL fallback squad-construction path so final CA, age, attributes and PA are generated together with the v3.69 model instead of leaving attributes generated from an earlier CA and assigning an unrelated slot-based PA.
- Added a reproducible ten-season progression simulation and regression checks for all 16 tactical roles.

## Data preservation

- No mass migration or bulk rebalance of existing player ratings, PA or valid attributes.
- No Supabase schema change. `supabase_cm_mobile.sql` is unchanged from v3.69 and must not be rerun.
- Existing career saves continue to load; the synchronization applies only when a v3.69-generated player's CA changes during normal game progression.

## Validation

- Inline JavaScript syntax check passed.
- Existing v3.69 model tests passed: 8,000 profiles across 16 roles and 80,000 potential samples.
- Existing constructor tests passed: 2,000 academy prospects, 1,000 annual free agents and a 25-player generic roster.
- Ten-season production-progression test passed across 24 scenarios (six starting ages × four appearance loads; 250 simulated players per scenario).
- 6,400 role-synchronization checks passed across all 16 roles.
- Legacy-player preservation test passed; no legacy attribute values were changed by the new helper.
- EFL fallback regeneration patch and all three progression entry points verified in source.
- ZIP CRC integrity check passed.

## Test limitations

The ten-season run is a controlled player-progression simulation, not a full browser-based career simulation. It does not simulate transfers, injuries, tactical changes, match results, live Supabase saves or the whole world of AI fixtures. It does not prove that estimated player attributes match real-world ability.
