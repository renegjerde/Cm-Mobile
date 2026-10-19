# CM Mobile v2.18 — Match incident balance

## Changes in v2.18

- Raised the live match yellow-card event rate to match the rate used for simulated AI-vs-AI fixtures (0.039 per minute).
- Aligned red-card and injury incident probabilities in the live match engine with the simulated-match engine (0.0012 and 0.0024 per minute respectively).
- This corrects the discrepancy where AI fixtures showed several bookings while the user-managed live match typically showed very few.
- No career reset is intended; this is a match-engine probability adjustment.

## Validation

- JavaScript syntax checked.
- ZIP archive integrity checked.
- Rates are aligned in code; a full browser-season simulation has not been performed.

## Install

Upload the contents of `CM_Mobile_v2.18/` to the intended location in your GitHub repository. The folder contains `index.html` and this `README.md`. If GitHub Pages publishes from the repository root, the live root `index.html` must still be updated separately.
