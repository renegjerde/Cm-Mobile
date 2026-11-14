# CM Mobile v3.65 – Official European Squad Snapshot

## Publisering
1. Pakk ut ZIP-filen.
2. Erstatt `index.html` i rotmappen til GitHub-repositoriet.
3. Erstatt `VERSION.txt` med `v3.65`.
4. `supabase_cm_mobile.sql` er uendret fra tidligere versjon og skal ikke kjøres på nytt dersom CM Mobile-tabellen allerede er opprettet.
5. Publiser og åpne spillet. Eksisterende karrierer kjører en engangsmigrering for de 48 oppdaterte Europa-/Conference League-stallene.

## Spillerdatabase
- De 48 klubbene som tidligere brukte juli-arkivet som List A-reserve, bruker nå offisielle UEFA-troppssider fra november-snapshotet.
- List A og List B legges sammen i ordinære klubbtrupper.
- Ingen synlig markering av List B- eller regenererte spillere.
- Ingen automatiske UEFA-oppdateringer i sesongen.
- Urørte reserve-/arkivstaller kan erstattes; karrierer med kamphistorikk, manuelle endringer eller overganger beskyttes.

Se `PLAYER_AUDIT_REPORT.md` og `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json`.
