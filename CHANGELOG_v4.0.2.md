# CM Mobile 4.0.2 – Notification Cleanup

## User-facing news and notifications
- Filtered internal migration, UEFA roster-audit, database/registry repair and other maintenance messages out of the manager-facing “Viktige meldinger” inbox.
- Removed stale technical notices from existing saved notification queues the next time the overview is rendered.
- Prevented those internal log entries from being reclassified as transfer news because of technical words such as “utlånsregistreringer”.
- Filtered technical entries from the “Siste nytt” home feed while retaining real match, transfer, cup and club events.

## Data preservation
- Diagnostic messages remain in the saved `appState.log`; only their presentation is filtered.
- No player, squad, match, finance, transfer-history, career-save or database records are deleted or migrated.
- No SQL/schema changes. Do not rerun the SQL script.

## Validation
- 13 targeted notification/feed tests pass, including legacy notice cleanup, retention of real football news and preservation of the underlying diagnostic log.
- Inline JavaScript syntax checked.
- ZIP archive integrity checked.
- Full browser/device and Supabase round-trip tests remain manual release checks.
