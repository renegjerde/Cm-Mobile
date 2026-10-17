# CM Mobile v1.57 — Championship Count Fix

## Fix
The lower-league builder previously removed EFL clubs whenever their names appeared in the global `CLUBS` array. This could reduce the Championship from 24 clubs to 23. The filter now removes only reserve/U21 names, not first-team clubs, and the domestic data version is bumped so saved league tables are rebuilt.

## Scope and limitations
This fixes the league row-count bug. It does **not** mean all 92 squads are already fully verified. Many player profiles and attributes still require source-by-source verification. The official EFL 2026/27 squad list is the starting source for player names, and ages must be calculated from verified dates of birth as of 22 August 2026.

## Install
Replace the root `index.html` in the `main` branch of the `Cm-Mobile` repository.
