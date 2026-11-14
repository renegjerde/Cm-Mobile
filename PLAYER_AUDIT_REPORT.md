# CM Mobile v3.65 – offisielt UEFA-register for Europa League og Conference League

Dato for fast datasnapshot: **14. november 2026**  
Utgangspunkt: CM Mobile v3.64, med historisk profilarkiv som reserve for 48 klubber.  
Oppdateringsregel: **statisk snapshot – ingen UEFA-oppdateringer underveis**.

## Hva er endret

- De 24 Europa League-klubbene og 24 Conference League-klubbene som tidligere brukte Transfermarkt-basert spillerarkiv fra 6. juli 2026, er erstattet med spillerregistreringene på UEFAs offisielle klubbtroppssider.
- List A og List B er samlet i samme ordinære klubbtrupp. List B er identifisert fra UEFAs stjernemerking på sidene, men denne forskjellen vises ikke i spillets brukergrensesnitt.
- Riktig posisjonsgruppe (keeper, forsvar, midtbane, angrep) er bevart fra UEFA-troppssidene.
- De tidligere arkivlistene for de 48 klubbene er ikke lenger brukt som reserve for disse klubbene.
- Det er lagt til en versjonert engangsmigrering for eksisterende karrierer.
- Urørte, uverifiserte arkivstaller erstattes av det offisielle november-snapshotet.
- Staller med kamphistorikk, spillerhistorikk, manuelle endringer eller klubbtilknyttede overføringer blir ikke overskrevet. Manglende offisielle spillere legges til uten å slette karrieredata.
- Den eksisterende konservative identitetskontrollen mot PL/EFL beholdes. Navnelikhet alene brukes ikke til å slette spillere; ID eller samsvarende fødselsdato kreves.
- Ingen løpende nettforespørsler, kampdagsoppdateringer eller automatisk UEFA-synkronisering er lagt til.

## Kontrollert datadekning for de 48 erstattede klubbene

| Turnering | Klubber | List A | List B | Totalt spillere |
|---|---:|---:|---:|---:|
| Europa League | 24 | 566 | 260 | 826 |
| Conference League | 24 | 566 | 203 | 769 |
| **Totalt** | **48** | **1132** | **463** | **1595** |

## Kvalitetskontroller

- 48 av 48 tidligere arkiv-fallback-klubber samsvarer med klubbene i UEFA-snapshotet.
- 48/48 klubber har minst 11 registrerte navn.
- Ingen identiske normaliserte spilleroppføringer ble funnet innen samme klubb på tvers av posisjon eller List A/B.
- Samme navn på tvers av klubber blir ikke automatisk slått sammen; fotball har reelle navnekollisjoner.
- 2 navn forekommer i mer enn én av de 48 klubbene og er derfor beholdt som separate identiteter/manuelle kontrollpunkter.
- Spillerne som kommer fra UEFA-sidene får klubbscopede, stabile ID-er.
- JavaScript-syntaks og ZIP CRC-kontroller kjøres i leveranseprosessen.

## Migrering av eksisterende karrierer

Migreringsflagget `uefaOfficialNovemberRosterMigrationVersion` hindrer gjentatt import. Den kjøres bare for 2026/27-karrierer. Urørte arkivstaller erstattes komplett. Lagre karrierer som har kamphistorikk, overføringer, manuelle endringer eller verifiserte spillere blir bevart; offisielle spillere som mangler i disse stallene legges til. Gjennomførte overganger og spillerhistorikk slettes ikke.

Migreringen er testet med isolerte testdata, men er ikke live-testet mot brukerens faktiske Supabase-karriere.

## Kilder og avgrensning

Spillergrunnlaget er transkribert fra de offisielle UEFA-klubbtroppssidene for de 48 klubbene. UEFA skiller List B fra List A med stjerne på troppssidene. Skjæringstidspunktet er etter siste ferdigspilte europeiske runde i november 2026. UEFA-sidene kan endres senere; denne pakken fryser den aktuelle troppen og vil ikke oppdatere den automatisk.

Kildesider for oversikt over endringer:
- UEFA Europa League 2026/27 squad changes (oppdatert 5. november 2026).
- UEFA Conference League 2026/27 squad changes (oppdatert 4. november 2026).

`UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` inneholder klubblister, kildestatus, List A- og List B-navn for revisjon.
