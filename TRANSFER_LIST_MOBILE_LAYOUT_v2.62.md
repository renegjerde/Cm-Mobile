# Transfer list mobile layout — v2.62

## Changes
- Replaced the oversized two-row inline buttons with a compact action column.
- Responsive widths at 430px and below; text may wrap rather than push the layout horizontally.
- Kept existing sale/list and outgoing-loan callbacks and disabled-state logic intact.
- Did not change save keys or career data structures.

## Validation
- JavaScript syntax checks are run on every inline script in `index.html`.
- ZIP integrity is checked after packaging.
- No real iPhone/Safari end-to-end test was available in this build environment; visual confirmation is still needed after publishing.
