# CM Mobile v3.66 – Player Audit Export

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


## Full player audit export (v3.66)
- Open an active career and go to the squad page.
- Expand **Spillinformasjon og diagnostikk**.
- Select **Eksporter hele spillerbasen (JSON)**.
- The JSON contains materialized player registrations from worldSquads, the EFL database, European transfer squads, cup-only squads, the active manager squad, free agents and youth academies.
- Each record includes the full player object, including attributes, position/role, rating, potential, date-of-birth provenance, source and data-quality flags.
- Registry overlaps are intentionally preserved and labelled so they can be audited; the registration count is not a unique-person count.
- The export covers the currently open career only. It does not read other saved career slots.
- Export is read-only and does not modify career data or player attributes.
