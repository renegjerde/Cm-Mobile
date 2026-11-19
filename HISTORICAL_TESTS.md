# Historical test harnesses

`ai_european_market_tests_v377.js` is retained for provenance but is excluded from the active acceptance suite. Its `wage-budget-block` assertion was written for the pre-v3.78 transfer flow and is not compatible with the later negotiation model. The current `ai_european_market_tests_v378.js` is the active test for that path and passes.

All other JavaScript test harnesses in this package, including the two v4.0.3 targeted suites, were run against the v4.0.3 `index.html` and passed.
