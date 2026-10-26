# CM Mobile v3.45 — Version-label consistency fix

## Change
- Unified the browser title, in-game version badge, and live season header to display v3.45.
- No gameplay logic was intentionally changed from v3.44.

## Validation
- Both inline JavaScript blocks checked with Node syntax validation.
- Confirmed the three user-visible version strings report v3.45.
- ZIP archive integrity checked after packaging.

## Important limitation
This is a label-consistency patch. It does not replace a full interactive browser season test. If an older build remains open in the browser, close it and open the v3.45 HTML file from this package to verify the corrected label.
