# CM Mobile v1.60 — PL roster quality flags

This build adds explicit data-quality flags to each Premier League player record and bumps the relevant data schema versions so stale saved player records are rebuilt.

## Important status
This is an instrumentation/diagnostic build, **not a completed verified 2026/27 PL roster**. The existing roster seeds still contain unresolved cross-club duplicates and unverified player details. A missing DOB remains unknown; it is not replaced with a made-up date. Player attributes, market values and wages remain game estimates.

## Validation found in the existing seed
- 20 clubs / 500 roster entries
- 491 unique names
- 9 cross-club duplicate entries
- DOBs are present for only a subset; presence in code is not independent verification

## Next data-correction step
Replace the roster seed from official Premier League club lists and cross-check DOB/positions with Transfermarkt and club profiles, then rerun duplicate, club-membership, DOB and position validation.

Install: replace the repository root `index.html` on the `main` branch. This archive's version folder contains both `index.html` and `README.md`.
