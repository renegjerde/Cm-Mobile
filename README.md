# CM Mobile v3.69 – Player Generation & Ability Calibration

## Formål
v3.69 improves the generation of new player profiles and future academy/free-agent intake. It introduces deterministic role-specific attributes, CA-aligned role skills, a dedicated goalkeeper profile and an age/talent-based PA distribution.

## Publisering
1. Unzip this release.
2. Replace `index.html` in the root of the GitHub repository.
3. Replace `VERSION.txt` with the included `v3.69` file.
4. Keep `supabase_cm_mobile.sql` unchanged. Do not rerun SQL if the existing table is already installed.
5. Publish the site and open the game as usual.

## What changes for new players
- Newly built first-team/world rosters use role-specific deterministic attributes calibrated to the player's existing CA/rating.
- Newly created European profile players use detailed role profiles rather than the old broad position template.
- New academy prospects use the age/talent-tier potential distribution.
- New initial and annual free agents use the new role and PA models.
- Generated EFL fillers and generic lower-division rosters use the same model.
- New player records store `attributeModelVersion` and `potentialModelVersion` in `dataQuality`.

## Existing careers and preservation
- No career-wide recalibration migration is run.
- Existing valid attributes, rating/CA, potential/PA, age, position and club registration are not overwritten.
- Existing academy/free-agent players keep their saved values. New prospects and new annual free-agent intake use v3.69.
- `ensurePlayerAttributes` fills only genuinely missing attribute keys, using a deterministic profile. Existing valid values are preserved.
- The known verified Gabriele Biancheri position correction, if needed, regenerates the affected outfield profile with the new role model.
- No player-facing generated-player labels or special markers are added.

## Model boundaries
- `rating` remains the game's current ability/CA field. The v3.69 model does not rewrite existing CA values.
- For newly materialized player profiles, role-relevant attributes are calibrated so the match-engine role skill index is close to the existing CA/rating. That index remains a role suitability signal, not a replacement CA formula.
- PA is generated from age, player context, club strength and a deterministic talent-tier draw. Market value is not a direct PA input.
- PA is never below CA and is capped at 96. Players aged 28+ receive at most four points of additional headroom; players aged 32+ at most two.
- Attribute and PA values for real named players are still model estimates unless a separately curated value exists. A name/profile match is not presented as an observed skill dataset.

## Testing and limitations
- Full inline JavaScript passed `node --check`.
- Synthetic tests covered 8,000 generated profiles across all 16 tactical roles and 80,000 potential samples across academy and free-agent contexts.
- Model tests verified deterministic repeatability, all 11 attributes, the 25–99 range, outfield keeper-attribute caps, role-skill alignment and PA bounds.
- This is not a live browser test, a full match-engine simulation, or a test against a live Supabase save. No live career was modified.

See `PLAYER_GENERATION_MODEL_v3.69.md` and `MODEL_TEST_RESULTS_v3.69.json` for implementation and test details.
