# CM Mobile v3.74 – AI academy pathway report

## Objective

The academy system already generated and aged prospects, but AI clubs did not have a corresponding autonomous graduation decision. A prospect could therefore be developed for several seasons and then be released when older than 18, even when the senior squad had a positional shortage.

## Implementation

### Senior-roster resolution

`aiAcademyRosterForClub` resolves the correct senior roster:

- Clubs represented in `CLUBS` use their canonical `worldSquads` entry.
- Lower-league clubs outside that registry use their canonical `eflPlayerDatabase` roster.
- The manager-controlled club is excluded from the autonomous AI pathway.

### Promotion decision

`processAIAcademyPromotion` considers a prospect only after a full academy season and after the annual age increment. Players aged 17–19 can be considered. The prospect must be within ten CA points of club strength and must either address a positional shortage or clearly improve the weakest player in that position group.

The best-rated prospects are evaluated first. Each AI club can promote at most one academy player per season. The senior squad must have fewer than 24 players, and the proposed wage must fit within the existing wage ceiling (with the same 12% tolerance used elsewhere in the club finance model).

The promotion keeps the player's career identity, potential, attributes and development metadata. The displayed roster ID is made unique for the senior registration. EFL mirrors are synchronized after promotion.

### Non-promoted graduates

The existing academy release logic remains active. A player who reaches the age limit without meeting the senior-promotion conditions is released to the free-agent pool. The user's academy graduation and manual promotion flow are unchanged.

## Test evidence

- Targeted cases cover Premier League promotion, lower-league/EFL database promotion, user-club exclusion, one-promotion-per-club-per-season, age and ability gates, wage-budget enforcement and duplicate career-identity protection.
- The actual `ensureYouthAcademies(true)` season-transition function was executed with controlled state; age increment, promotion, academy removal, attribute preservation and season guard all passed.
- A ten-season controlled cohort of 24 AI clubs and 240 academy candidates produced 216 senior promotions, with zero duplicate career identities, roster-cap violations or wage-budget violations.
- v3.72 transfer/expiry tests pass.
- v3.73 strategic squad and contract-planning tests pass.
- v3.73 ten-season renewal regression passes.
- All inline JavaScript blocks pass syntax validation.
- ZIP CRC/integrity check passes.

## Limitations

This is a controlled function-level simulation, not a full browser career simulation. The test does not run every real fixture or prove that promoted players receive a particular number of minutes. AI loans for blocked academy graduates, agent negotiations, training facilities, youth scouting networks and a fully modeled academy intake budget remain future work. The current AI academy intake remains compact (two prospects per rival academy), so this release establishes a promotion pathway rather than a full youth recruitment overhaul.
