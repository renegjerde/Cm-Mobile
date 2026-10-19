# CM Mobile v2.20 — Balanced match discipline

## Changes in v2.20

- Live-match yellow-card incidents now select the booked team independently of goal/chance dominance. The stronger team is no longer more likely to receive cards simply because its chance probability is higher.
- The live match and simulated matches retain the same baseline yellow-card event probability. Player selection within the booked team remains weighted toward players more likely to commit fouls.
- Second-yellow dismissals remain in place: the second yellow is followed by a red card in the same minute, and the player is removed from the active XI.

## Validation

- JavaScript syntax checked.
- ZIP archive integrity checked.
- Confirmed live yellow-card team selection uses a 50/50 side selection rather than the attack/chance probability. Full browser match testing is still recommended.

## Install

Upload the contents of `CM_Mobile_v2.20/` to the intended location in your GitHub repository. The folder contains `index.html` and this `README.md`. If GitHub Pages publishes from the repository root, the live root `index.html` must still be updated separately.
