# CM Mobile v1.40 — Match fatigue and smarter substitutions

## Changes
- Match stamina now starts from pre-match fitness and the player's stamina attribute, rather than using almost the same baseline for everyone.
- High pressing and attacking tactics cost more energy; attacking wide roles have additional workload. Player stamina attributes reduce or increase fatigue rate.
- Fatigue has a more meaningful effect on effective match rating.
- The assistant now considers a poor match rating OR notable fatigue at the 60th, 70th and 80th minute checkpoints. It can make up to two substitutions in one stoppage, subject to the existing five-player/three-window limits.
- The assistant prefers a suitable role-fit substitute, with a small preference for same-position replacements.
- The automatic-substitution checkpoint handles a clock step that crosses the target minute.

## Notes
- Automatic substitutions must be enabled in the in-match lineup panel.
- Injury substitutions still use the shared substitution counters and are limited by the available windows, except for half-time substitutions.
- The match clock and fatigue values are a game simulation, not physiological measurements.
- JavaScript syntax checked with Node.js. Full end-to-end mobile browser testing has not been completed.
