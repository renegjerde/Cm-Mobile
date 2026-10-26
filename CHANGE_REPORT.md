# CM Mobile v3.49 — change report

## Home-screen upcoming match card
- Reuses the tactics screen match-context style.
- Makes the competition/tournament name the prominent heading.
- Shows the round/stage and scheduled date as separate chips.
- Shows both club crests and names, recent form, and HJEMMELAG/BORTELAG labels.
- Shows whether the manager plays home or away.
- Preserves the existing action for match preparation and kickoff flow.
- Pre-season and season-completed states keep their existing dedicated layouts.

## Validation
- Both inline JavaScript blocks pass `node --check`.
- Version badge and status line are checked for v3.49.
- GitHub ZIP archive integrity checked.
- Full interactive browser test could not be completed in this run.

Publishing is not automatic. Replace the root `index.html` in the GitHub Pages repository and commit the update.
