# CM Mobile 4.0.5 – Global Contrast Correction

## Fixed
- Corrected the global muted-text inheritance that made text unreadable on dark cards embedded in light Classic Edition panels.
- Increased contrast for transfer-window reports, including player names, transfer routes, section labels and counts.
- Enforced high-contrast text for domestic cup result rows, scores, teams and progress details.
- Corrected pale badges on blue section headers so they use dark text.
- Removed opacity-based dimming from disabled controls; disabled state remains visible through fill and border.
- Kept light Classic panels on dark ink and navy panels on light ink.

## Preserved
- No match engine, competition, transfer, player, finance or career-save logic changed.
- No database schema or SQL changes.
- Existing career saves remain compatible.

## Validation
- JavaScript syntax check: see release test report.
- CSS selector regression checks cover the reported transfer and cup surfaces.
- ZIP CRC integrity verified.
- Full iPhone/browser visual test still requires testing in the user's deployed browser.
