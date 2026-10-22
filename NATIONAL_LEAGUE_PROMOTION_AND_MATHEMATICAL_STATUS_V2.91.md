# CM Mobile v2.91 — National League and movement rules

## Division model
- Four persistent 24-club EFL/National League tables are stored in `appState.lowerLeagues`: Championship, League One, League Two and National League. Each table uses 46 fixtures per club.
- The National League table is created for existing v2.90 saves without resetting the already-played Championship / League One / League Two data. New National League squads are generated offline with 25 player profiles per club when no verified roster is available. These generated profiles are playable game data; they are not a claim that every player's real identity has been verified.
- League Two bottom two are relegated into the National League. The National League champion and simulated playoff winner (positions 2–7) are promoted to League Two. Four entrants from the available regional non-league candidate pool replace the bottom four National League teams. The regional Step 2/3 tables themselves are not simulated yet.

## Playoffs and badges
- Championship playoff: positions 3–6; League One: 3–6; League Two: 4–7; National League: 2–7.
- `O` is shown when direct promotion is mathematically locked; when a table is complete it is also shown for the deterministic simulated playoff winner. `N` is shown when enough rivals have a points total above a club's maximum possible points to mathematically guarantee relegation. Completed tables use final rank.
- The same playoff winner helper is used by table badges, the season summary and season rollover to keep results consistent.

## Club database and cups
- EFL player database version is 16. A club's existing roster is matched by club name and preserved when it moves division. Clubs newly entering National League receive generated 25-player rosters and are registered in lower-division simulation/player statistics.
- National League clubs are excluded from the EFL Cup participant pool and remain eligible through the FA Cup non-league pool.

## Validation notes
- All four starting division lists were checked at 24 unique team names each. The inline JavaScript passed `node --check`.
- Chrome headless smoke test timed out in this environment before producing a DOM dump. Please visually verify the updated table, O/N markers and season transition in the browser.
