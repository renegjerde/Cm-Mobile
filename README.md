# CM Mobile v1.51 — Season Progression & Europe

## Included
- European competition panels for Champions League, Europa League and Conference League.
- European knockout-stage results are simulated with the shared competition match model on selected midweek rounds.
- Season report stores domestic cup winners and European winners where available.
- Promotion/relegation is applied at season transition: three teams exchange places between each adjacent division using the current standings.
- Lower-league tables and fixtures reset after club movement; the manager remains attached to the same club name.
- Updated version label to v1.51.

## Notes / limitations
- This is a simulation layer, not a licensed or fully exact reproduction of UEFA competition formats. European entries use simplified qualification slots and knockout rounds.
- EFL promotion play-offs are simplified to three direct promotions per division; actual play-off finals and detailed rules remain future work.
- Newly promoted/relegated club squads are generated placeholders; existing Premier League squads are preserved when their clubs remain in the Premier League, but a full persistent player/roster identity transfer model across every division is still in development.
- Cup and European fixtures are simulated in the background and do not yet open the interactive minute-by-minute live match UI.
- JavaScript syntax validation is not a substitute for full mobile/browser playtesting.

## Install
Upload this `index.html` to the root of the GitHub Pages `main` branch. Keep this version folder and README as the archive copy.
