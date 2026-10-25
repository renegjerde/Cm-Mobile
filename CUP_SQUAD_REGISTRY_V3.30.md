# CM Mobile v3.30 — Cup squad registry audit

## Root cause
The domestic cup draw marks non-league entrants with `division: 'Non-league'` to describe their role in the competition format. The previous match squad resolver relied too heavily on that competition label and failed to look up a participating club's actual domestic league membership first. Boston United is in the National League; the squad database therefore already had a club roster, but the cup fixture path could fall through to a synthetic position-based name such as `Boston United Midfielder 10`.

A second issue in the previous patch was a duplicate declaration of `recordSimulatedCupPlayerStats`. The older declaration appeared later in the file and shadowed the new handler, preventing the broader cup-squad statistics update from running.

## Fixes
1. Verify that a `clubIndex` points to the same club as the fixture team before using the Premier League `worldSquads` array.
2. Resolve EFL/National League clubs from `domesticDivisionForClubName()` even when the cup entry is explicitly labelled `Non-league`.
3. Find club roster entries by normalized canonical club name to tolerate punctuation/diacritic differences.
4. Add a 2026/27 Boston United first-team register with 28 named players based on the [official club squad page](https://www.bostonunited.co.uk/teams/24809/the-team) and cross-checked against the [FootballSquads 2026/27 roster](https://www.footballsquads.co.uk/eng/2026-2027/national/boston.htm).
5. Migrate the existing Boston squad once per save. Existing player career state is preserved for name matches, and players recorded as transferred out this season are not blindly re-added.
6. Use the same canonical squad for player stats, goals, assists, injuries and card processing after cup matches.
7. Keep a persistent, unique-name 25-player squad for true cup-only clubs that do not have an embedded current squad list. These are explicitly marked fictional/unverified, not represented as real players.
8. Remove the duplicate legacy stats function so the canonical multi-squad handler is the only active definition.

## Boston United roster
The roster data includes the first-team groups currently shown by the club: goalkeepers, defenders, midfielders and attackers. It contains 28 named records as of the current 2026/27 squad-page check.

## Saved career behaviour
- Completed match scores are not changed.
- Existing player stats/contract/injury/loan state are retained when an existing player matches by normalized name.
- Old completed match commentary that already mentions a placeholder name is not rewritten, because assigning the historical event to a different real player would invent an identity. Future cup matches use the corrected roster path.

## Validation results
- `node --check`: both inline JavaScript blocks passed.
- Isolated save-migration test: 28 Boston players; placeholder names removed from the canonical squad; existing Luke Faxon appearance, goal and injury state preserved.
- Cup resolver test: a Boston fixture with `division: 'Non-league'` picks the National League squad.
- Cup-only fallback test: creates 25 unique names and no position-number labels.
- Static check: exactly one cup player-stat handler remains.
- ZIP archive integrity is checked at packaging time.

## Limitation
The supplied game has a canonical roster database for its major registered leagues and named European clubs, but not a fully verified live squad list for every extra non-league club in the FA Cup pool. Those extra clubs remain playable with generated, persistent fictional identities until their real-world squads are curated.
