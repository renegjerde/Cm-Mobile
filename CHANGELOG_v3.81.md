# CM Mobile v3.81 – Clickable Club Squads & Opponent Starting XI

## New features
- Club names in all five domestic league standings are now interactive. Selecting a club opens its current player roster in a responsive dialog.
- Club names in EFL top-scorer tables, player-statistics tables, EFL division tables in the competitions centre, UEFA league-phase tables and end-of-season tables also open the relevant club roster.
- Both teams in the pre-match fixture card are clickable.
- Selecting the user's team opens the full squad; selecting the opponent opens the opponent's expected starting XI, with formation and player roles.
- Domestic opponent previews use the same opponent roster source, formation selection and role-based XI builder as the match engine.
- Cup and UEFA opponent previews use the same `competitionSquad` source and 4-3-3 setup as the cup match engine.
- The dialog displays position/role, age, current ability, potential and availability status where available.

## Compatibility
- No player data is regenerated or rebalanced.
- No database schema or SQL changes.
- No change to competition, transfer, finance, academy, loan or match result logic.
- The roster dialog is transient UI state and is not written into career saves.

## Validation
- All three inline JavaScript blocks pass `node --check`.
- 11 focused UI/data-source checks pass, covering Premier League, EFL and European roster lookup, own-club squad display, domestic opponent XI, cup opponent XI, formation display and modal content.
- Static checks confirm the standings, player tables and both pre-match team labels are wired to the new dialog.
- Full browser gameplay and Supabase round-trip testing remain outside this validation pass.
