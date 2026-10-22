# CM Mobile v2.86 — formation-aware pitch layout

## Changes
- Updated the match-preparation pitch geometry for all 23 built-in formations, rather than only 3-5-2, 4-3-3 and 4-2-3-1.
- Wide roles (full-backs, wing-backs, wide midfielders and wingers) now use touchline-aware lanes; centre-backs, central midfielders and strikers use role-aware horizontal positions.
- Holding midfielders sit slightly deeper than central midfielders where the formation uses a pivot-and-two-midfielders structure.
- Back-three, back-four and back-five shapes use distinct horizontal spacing.
- Four- and five-line formations get compact player cards to help prevent the cards from overlapping.
- The existing tactical role assignments, custom role overrides, click-to-select interaction, team selection and match-engine behaviour are unchanged.

## Scope and validation
- Geometry is derived from each entry in `FORMATION_TEMPLATES`, so it applies to every formation selectable in the game (currently 23).
- JavaScript syntax and ZIP integrity were checked after the patch.
- An isolated Node.js layout sweep checks all 23 templates for 11 role slots, ten outfield role placements, one goalkeeper and valid, unique finite coordinates. A headless Chromium screenshot attempt timed out, so visual validation on a browser/device remains outstanding.
