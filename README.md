# CM Mobile v2.21 — One-match squad rotation

## Changes in v2.21

- Squad rotation is treated as a one-match decision, not a new default lineup.
- When the manager uses **Roter troppen** and that rotated XI plays, the assistant recognises that the previous match was rotated.
- For the following match, the assistant prioritises the best available XI rather than applying another rotation penalty against the rotated starters. Rotation can still be considered later when the opponent is substantially weaker.
- Existing career and squad data are retained; two small state flags track rotation intent and whether the last played XI was rotated.

## Validation

- JavaScript syntax checked.
- ZIP archive integrity checked.
- Logic inspected to confirm the rotation marker is recorded with the XI that actually plays and consumed by the next assistant recommendation.
- Full browser testing across multiple matches is still recommended.

## Install

Upload the contents of `CM_Mobile_v2.21/` to the intended location in your GitHub repository. The folder contains `index.html` and this `README.md`. If GitHub Pages publishes from the repository root, the live root `index.html` must still be updated separately.
