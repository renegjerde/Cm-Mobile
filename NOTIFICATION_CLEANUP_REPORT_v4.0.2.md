# Notification cleanup report – v4.0.2

## Root cause
Technical migration and audit routines appended messages to `appState.log`, which is also used as the user-facing “Siste nytt” feed. `syncManagerNotifications()` classified new log entries with broad substring rules; the term “utlånsregistreringer” in an identity-audit message contains “lån” and could therefore be categorized as “Overgangsnytt”. Previously persisted `managerNotifications` could also keep showing the technical message after the original classifier was corrected.

## Fix
- Added `isInternalSystemLog()` to identify internal registry migrations, UEFA snapshots/audits, integrity checks, repairs and diagnostics.
- `classifyManagerLog()` now rejects such messages before applying football-news classification.
- `syncManagerNotifications()` removes stale technical entries from the derived manager-notification queue.
- `homeNewsMarkup()` displays the latest three non-technical news entries rather than blindly rendering the latest three raw log entries.
- The underlying `appState.log` is unchanged and retains diagnostic history.

## Targeted tests
13/13 pass. Tests verify the three message types visible in the supplied screenshot, ordinary transfer news, UEFA match news, preservation of the diagnostic log, stale notice removal and preservation of a valid football notification.

## Scope and limitations
The patch changes only rendering/classification of manager-facing alerts and home news. It does not rewrite old diagnostic log entries or modify gameplay, player data, transfers, fixtures, finances or database schema. No full browser session on a physical iPhone/desktop, and no Supabase round-trip, was performed.
