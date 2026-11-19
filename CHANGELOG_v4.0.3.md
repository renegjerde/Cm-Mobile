# CM Mobile 4.0.3 – Realism Stabilization

## Player lifecycle
- Added European transfer squads to the annual player lifecycle.
- European players now age, develop or decline, have retirement risk applied, and have their season statistics archived and reset.
- Career totals and history are mirrored to secondary EFL/world roster copies to keep player profiles and market views consistent.
- European AI clubs now participate in the shared AI contract renewal process.

## Match simulation
- Background-match dismissals remove players from the active XI.
- Second yellow cards now create a dismissal and suspension event.
- Injured players leave the active XI; up to three same-position substitutes are used where available.
- Background-match player minutes now reflect the minute of dismissal/injury and substitute entry rather than assigning 90 minutes to every starter.
- Active attack/defence strength is recalculated as the on-pitch XI changes.

## EFL finance consistency
- Annual club finance review now de-duplicates EFL clubs already present in the canonical club registry.
- Weekly club economy no longer processes the same EFL club again through its lower-league mirror.

## Compatibility
- No database schema changes.
- No SQL migration required.
- Existing player IDs, career IDs, saves, squads, transfer history and competition records are preserved.

## Remaining audit work
- Statistical calibration of live and background goal distributions still needs a large integrated match sample.
- A global calendar independent of the user's division is still needed for weekly world-economy ticks.
- Non-English national league tables and fully performance-based European qualification remain outside this release.
- Full browser/mobile acceptance and Supabase round-trip are not certified by the current test environment.
