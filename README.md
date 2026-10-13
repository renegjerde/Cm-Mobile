# CM Mobile v0.6 — Live Match Edition

## New in v0.6
- Match report is now presented as a live match: the clock ticks from 0 to 90.
- Score starts at 0–0 and updates as goals arrive at their simulated minute.
- Goals, cards and injuries appear in chronological order as the clock reaches them.
- Varied match commentary changes at kickoff, goals, halftime, 60', 75' and full time.
- Final score, final stats and other results remain available after full time.
- Home team is consistently displayed first.

## Prototype notes
- Match outcomes are still pre-simulated when the match begins; the UI reveals events over time rather than recalculating the match live each second.
- Clock runs at 160 ms per simulated minute (about 14.4 seconds for 90 minutes).
- Commentary is intentionally compact and randomized.
- Fictitious opponent squads and simplified match logic remain.
