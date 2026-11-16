# CM Mobile 4.0.1 – Contrast Refinement

## Visual changes
- Improved contrast of the live match score labels (HOME/AWAY and score descriptor) on the dark score panel.
- Brightened clock, tempo and tactical metadata on navy match surfaces.
- Reworked normal, selected and disabled match-speed controls so disabled buttons remain readable without looking active.
- Improved commentary and match-context secondary text contrast.
- Added clear keyboard focus outlines.
- Kept the Classic Edition navy/grey/green palette and compact late-1990s layout.

## Compatibility
- No gameplay, match-engine, player, transfer, finance, career-save or database logic changed.
- No SQL/schema changes. Existing SQL must not be rerun.

## Validation
- Contrast ratios for the main affected states are recorded in `CONTRAST_AUDIT_v4.0.1.json`.
- Inline JavaScript syntax is checked separately; this patch only appends CSS.
- Full browser/device and Supabase round-trip tests remain manual release checks.
