# CM Mobile v3.26 — Performance review

## Identified bottlenecks
1. Market page construction rebuilt the market list twice per render: once for filtered results and again for the total player count.
2. Duplicate detection scanned every already-seen player for each candidate, producing quadratic comparisons as the market grew.
3. Identity enrichment repeatedly looked up Transfermarkt profiles and scanned official squad-name lists.
4. Every search keystroke/filter selection invoked the full render pipeline and compressed/wrote the full local career save.

## Fixes
- Identity index buckets by career ID, Transfermarkt ID and normalized name; still calls `sameRegisteredPlayer` on candidate matches to preserve the existing identity policy.
- Memoized name/club profile lookup, normalized official-roster name index, and normalized reference-map fallback index.
- Cached the complete market list for an unchanged UI/game state; full application renders invalidate it. The total market count and filter list share the same cached result.
- Search/filter actions only replace `#marketPlayersResults`; they do not trigger global career maintenance or serialize/compress the full save.
- Player search text and positional-role sets are memoized for stable market-row objects.
- Purchase and loan actions still rebuild the list after roster changes, preserving correct eligibility and preventing previously hidden duplicates from resurfacing. Their path no longer performs a redundant explicit save immediately before render's save.

## Validation
- Node.js syntax check passed for both inline script blocks.
- Seeded fixture: 4,000 player descriptors; linear and indexed dedupe retained the exact same 2,270 rows. Candidate comparisons decreased from a worst-case 7,998,000 comparisons to 662,529 comparisons on that fixture.
- Static checks confirm filter handlers use results-only redraw and avoid full render/save when the market results section exists.
- ZIP archive test passed.

No browser performance profiler was run against the user's exact localStorage career, so no exact timing improvement is claimed.
