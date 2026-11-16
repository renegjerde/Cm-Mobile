# CM Mobile 4.0 – Classic Edition

## Visuell retning
- Rebuilt the presentation around a compact, information-dense late-1990s football management interface, inspired by the clarity and restrained palette of Championship Manager 97/98.
- Replaced the modern dark-gradient/card aesthetic with a classic blue, grey and off-white interface, square borders, compact tables and clear selected states.
- Increased desktop content width and introduced a horizontal desktop command strip while retaining mobile bottom navigation.
- Simplified the header to the game name and current season/competition/round.

## UI cleanup
- Removed visible version/build tags and the "Touchline Edition" header line.
- Removed the manual/help overlay and its header control.
- Removed repeated instructional helper copy from tactics, bench and match-result panels.
- Removed technical player-database diagnostics from the ordinary squad screen.
- Kept essential game information, data labels, warnings, navigation, accessibility labels and all gameplay controls.

## Compatibility
- Based on v3.82 Detailed Player Profiles.
- No database schema, SQL, save format, match engine, transfer logic, player data, career identity or progression changes.
- No mass player regeneration or rebalance.
- Existing local and cloud career save paths remain unchanged.

## Validation
- Inline JavaScript syntax checks.
- v3.81 club roster/opponent XI regression suite.
- v3.82 player profile regression suite.
- UI-specific checks for removal of visible build branding and instructional helper copy, preservation of core navigation and profile/roster entry points.
- Desktop and mobile screenshot smoke checks where browser runtime is available.
