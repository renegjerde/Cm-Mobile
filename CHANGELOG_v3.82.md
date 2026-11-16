# CM Mobile v3.82 – Detailed Player Profiles

## New features
- Expanded the existing player career page into a complete player profile.
- Profile overview displays current club, age, role, CA, PA, market value, wage, contract expiry, availability, morale, fitness, form and natural positions where those fields exist.
- Added visual bars for all eleven stored player attributes: pace, stamina, strength, technique, creativity, finishing, defending, passing, handling, reflexes and positioning.
- Retained career totals, season-by-season statistics, competition statistics and transfer history.
- Player names in the club-roster and expected-opponent-XI dialog now open the detailed profile.
- The expanded manager-squad player panel now labels its existing profile action as “Åpne spillerprofil”.
- Returning from a profile restores the originating page and, when opened from a club-roster or opponent-XI dialog, restores that dialog too.
- Profile lookup now searches manager squad, world squads, EFL databases, permanent European squads, cup-only squads, youth academies, free agents and available AI-loan roster mirrors. Opponent-XI clones retain a source-player ID for reliable profile lookup.

## Compatibility and safety
- No database schema or SQL changes.
- No mass player regeneration, rebalancing or CA/PA recalibration.
- No changes to match simulation, transfers, contracts, finances, competition rules or player progression.
- Profile navigation state is transient UI state and is not written to the career save.
- Existing player career statistics and history are displayed using their existing stored fields; missing historical records are not fabricated.

## Validation
- All three inline JavaScript blocks pass `node --check`.
- 9 focused player-profile tests pass, including European and youth roster lookup, opponent-XI source identity, all attribute display, CA/PA display, career and competition statistics, transfer history, contract details and return navigation.
- 21 club-roster and opponent-XI regression checks pass, including the profile links in both roster and lineup dialogs.
- Full interactive browser testing and Supabase round-trip testing remain outstanding.
