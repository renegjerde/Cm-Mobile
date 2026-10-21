# Club badge coverage — v2.84

## What changed

- A single badge renderer now supports both a club object and a plain club name. This fixes calls from home/cup/history screens that previously passed only a string to a renderer that expected an object.
- Official image sources are used where available: current 2026/27 PNGs are tried first for all 92 English PL/EFL clubs, the earlier Premier League URLs remain as a second option, and registered European sides use football-data.org SVGs.
- Clubs without a known official URL/ID now receive a deterministic, locally generated shield SVG with a name-derived palette and club monogram. The SVG is embedded as a data URI, so this fallback does not depend on network access and is unique per club name.
- For English PL/EFL teams, the current 2026/27 PNG is tried first, the previous registry URL is the second choice, and the generated shield is the final fallback. Other official logo URLs also fall back to a generated shield.
- The manager home-header crest uses the shared renderer too, so it follows the same fallback behavior.
- Alias matching uses normalized club names, including accent/prefix normalization already used by the game.

## Scope

The shared renderer covers clubs wherever it is called, including the manager home screen, fixtures/match screens, domestic cup ties/results, and European fixtures. It applies to Premier League clubs, the 72 in-game EFL clubs, the FA Cup non-league candidates, and European opponents without requiring a separate asset for each club.

## Important distinction

This version guarantees a visible club badge for every club name presented to the renderer. It does **not** claim to provide an authentic licensed crest for every single team. Known official image sources are retained; unmatched clubs use distinctive generated club shields until their official crest is added to the registry. The English club image source is `https://github.com/gmorison-aiio/club_logos` (2026/27 PL & EFL set). Known external images still require their public host to be reachable; the generated SVG fallback is offline-safe. Logo artwork remains subject to the relevant clubs’ trademark/copyright rights.

## Validation

- JavaScript syntax checked with Node.js.
- Isolated coverage test across 231 unique names from the in-game league/cup/European registers: all generated valid image markup with a fallback. All 92 PL/EFL club names resolved to the 2026/27 logo source; 128 names in total have a registered external crest URL.
- ZIP integrity checked after packaging.
- Full in-browser, multi-season, and on-device testing remains outstanding.
