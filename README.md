# CM Mobile v1.38 — Match Management

## Included
- Injury incidents on the user's team trigger an immediate substitution when a valid substitute and substitution allowance are available.
- The assistant's optional automatic substitutions consider live match rating, stamina, and positional suitability at the 60th, 70th, and 80th minute checkpoints.
- The match automatically pauses at half-time (45'). The manager can open the lineup/tactics panel and make changes before starting the second half.
- Half-time substitutions count toward the maximum of five players but do not consume one of the three substitution windows.
- Injury, manual, and assistant substitutions share the match's substitution counters.

## Install
Replace the repository-root `index.html` on the `main` branch with the `index.html` in this version folder. Keep the version folder and README for version history. GitHub Pages currently serves the root `index.html`.

## Validation
The embedded JavaScript passed `node --check`. Full interactive testing on mobile browsers is still recommended. The app stores career state locally in the browser.


## v1.38 – Kampstart og navigasjon
- Avspark-knapp også øverst på laguttakssiden, slik at du slipper å bla forbi hele troppen.
- Når en kamp starter, flyttes visningen automatisk til toppen av live-kampsiden, uavhengig av hvor langt ned du var på forrige side.
