# CM Mobile v3.31 — Canonical domestic league registry

This archive contains the complete CM Mobile v3.31 version folder.

## Main repair in v3.31
- Adds a canonical domestic club registry containing the 20 Premier League clubs plus Championship, League One, League Two and National League clubs.
- New-career club selection now has access to all registered domestic divisions instead of looking only inside the original Premier League-only list.
- Assigns explicit division metadata to every canonical club and keeps that metadata during the 2026/27 baseline reset. The previous reset erased division metadata, which caused the main league model to misclassify clubs.
- Makes division lookup and registry audits count clubs by their actual division rather than assuming every item in `CLUBS` belongs to the Premier League.
- Prevents the standalone lower-league simulator from simulating the manager's active division a second time. The active division's live table is synchronized back to the lower-league season data so promotion/relegation logic can use it.
- Keeps existing Premier League club indices at the start of the registry; the canonical lower-division clubs are appended.

## Validation performed
- Both inline JavaScript blocks pass `node --check`.
- Source-level checks confirm the canonical registry initializer, explicit division reset, active-division simulation guard, and lower-table synchronization are present.
- ZIP archive integrity checked after packaging.

## Important limitation
This is a structural repair, not a claim that every gameplay path is now fully verified. A complete interactive browser test covering a full season in all five divisions, cup qualification, transfer flows, and promotion/relegation has not yet been run. In particular, full season rollover and cup/European eligibility should be tested next before adding new gameplay features.
