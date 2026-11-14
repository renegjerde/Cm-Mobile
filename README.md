# CM Mobile v3.64 – Complete European Player Database

- Erstatt `index.html` i GitHub-repositoriets rot med filen fra denne pakken.
- Sett `VERSION.txt` til `v3.64`.
- `supabase_cm_mobile.sql` er beholdt fra v3.63 og trenger ikke kjøres på nytt hvis v3.59-tabellen allerede er opprettet.
- Åpne spillet etter publisering. Lagrede karrierer kjører en engangsmigrering: List A v2 og List B v2.
- Lag med kamphistorikk, overføringer, manuelle endringer eller verifiserte spillerregistreringer beskyttes mot automatisk utskifting.
- Alle List B-spillere blir vanlige klubbspillere i spillopplevelsen; ingen UI-markering.
- Spillet er fortsatt offline-first og foretar ingen UEFA-nettoppdateringer.

Se `PLAYER_AUDIT_REPORT.md` og `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` for dekning og kildebegrensninger.
