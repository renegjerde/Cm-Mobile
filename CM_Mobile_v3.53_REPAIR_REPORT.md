# CM Mobile v3.53 — Junior academy age-limit repair

## Change
- Enforces the academy invariant that youth players are age 15–18.
- Any existing academy player older than 18 is removed from the academy and moved to the free-agent pool during academy reconciliation. This repairs malformed cohorts in new careers and saved careers before the academy UI is rendered.
- At season processing, ages are incremented and players crossing 18 are released; the manager graduation flow for the controlled club remains available through `resolveUserYouthGraduatesAtSeasonEnd()` at the season transition.
- Invalid/missing ages are normalized to 15; under-15 entries are normalized to 15.

## Verification performed
- Both inline JavaScript blocks passed `node --check`.
- Isolated harness: a 20-year-old was removed from the academy and placed in the free-agent list; 18- and 17-year-olds remained.
- ZIP integrity check performed after packaging.

## Limitations
- No full browser/UI session test was run. The supplied screenshot was used to identify the failure case.
- GitHub Pages deployment is not performed by this package; replace repository `index.html` and commit to publish.
