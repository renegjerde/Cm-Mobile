CM Mobile v3.43 — League movement safeguards

Changes
- Added a fail-closed validation pass before mutating next-season league membership.
- Checks Premier League size (20), EFL division sizes (24 each), duplicates within divisions, and duplicate membership across the five divisions.
- If validation fails, the movement routine logs the errors and returns without mutating the canonical club registry.
- startNewSeason now stops rather than advancing if the membership audit fails.
- Clears stored playoff results after a successful season transition so old season results are not carried forward.

Validation performed
- Both embedded JavaScript blocks passed `node --check`.
- ZIP archive integrity checked after packaging.
- Not yet verified by a full interactive browser season simulation.
