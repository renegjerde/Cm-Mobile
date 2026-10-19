# CM Mobile v2.24 — Transfer window report scoping

## Changes in v2.24
- Transfer-window summaries now include only deals recorded in the season and exact gameweek range for the window that just closed.
- AI transfer history now records the season year explicitly, so AI deals from earlier seasons cannot leak into later window reports.
- Legacy transfer records without a season-year marker are excluded from new reports to prevent old saves from accumulating historical deals in the current-window summary.
- The transfer history archive remains available separately under “Tidligere vindusrapporter”.

## Files
- `index.html` — playable game.
- `README.md` — version notes.

## Validation
- Inline JavaScript syntax checked with Node.js.
- ZIP integrity checked after packaging.
- Full browser testing remains necessary to verify the report in a live career.
