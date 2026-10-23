# CM Mobile v2.99 — Pause/resume button contrast

- Fixed the CSS specificity conflict where `.live-paused` forced the live match pause/resume button label to amber despite its green background.
- The halftime resume button now uses a dark, high-contrast label, explicit `-webkit-text-fill-color`, a dark outline and a stronger focus/edge treatment.
- Applied the same high-contrast treatment to the separate halftime-panel button.
- Kept button behavior and match logic unchanged.
