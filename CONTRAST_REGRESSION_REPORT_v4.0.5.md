# CM Mobile 4.0.5 – Contrast Regression Report

## Source observations
The v4.0.4 stylesheet globally set `--muted:#526579` for pale Classic panels. Several nested navy surfaces continued to use `var(--muted)`, resulting in dark text on dark backgrounds. The affected areas include transfer-window report rows and domestic cup content. Some light badges also inherited pale text from their blue section-header context.

## Changes
A surface-specific contrast layer was added. Pale work surfaces use dark ink; navy inset cards explicitly use light text. Transfer report text and cup result text are forced to high-contrast colors. Disabled controls no longer use opacity as their sole state indicator.

## Scope
CSS-only presentation change. No JavaScript behavior, game data, competition formats, or save structures were modified.

## Verification
Automated checks confirm that the expected selectors and color declarations are present. JavaScript syntax is checked separately. This is not a substitute for a real iOS Safari visual test; the user should verify the deployed screen after upload.
