# CM Mobile v1.2 — Live Match Engine, Step 1

## What's new
- Match presentation has a controllable live clock and progressive event reveal.
- Pause/resume control for the match clock.
- Three match speeds: 1×, 2×, and 4×.
- Goal moments flash in the scoring side's team color and animate the score.
- Commentary, event list, and match stats appear progressively during the match.
- App header now identifies the version as v1.2.

## Current prototype scope
This is the first live-match presentation iteration. The current prototype still calculates the match result and event timeline at kickoff, then reveals events and statistics over match time. The next engine pass should move chance/event generation itself into the live minute loop so tactical changes can affect events as they occur.
