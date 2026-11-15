# CM Mobile v3.66 – spillerrevisjonseksport og offisielt UEFA-register

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


## v3.66 – diagnostikkeksport

Spillinformasjon og diagnostikk på troppssiden har fått en skrivebeskyttet eksportfunksjon for den aktive karrieren. Eksporten samler spillerregistreringer fra `worldSquads`, `eflPlayerDatabase`, `europeanTransferSquads`, `cupOnlySquads`, `squad`, `freeAgents` og `youthAcademies`. Hver rad beholder register, klubb og divisjon samt hele spillerobjektet.

Eksportens sammendrag teller registreringer per register og flagger blant annet verifiserte/modellerte/manglende fødselsdatoer, manglende posisjon/rolle/attributter, manglende rating/potensial, PA under CA og attributtverdier utenfor 1–100. Den inkluderer også den eksisterende registreringsduplikatkontrollen. Registeroverlapp bevares med hensikt; rapportens registreringstall er derfor ikke et antall unike personer. Eksporten omfatter bare karrieren som er åpen, er skrivebeskyttet og endrer ikke lagrede spillerdata.

Denne funksjonen er et datainnsamlingssteg, ikke en full kvalitetsdom: automatiske flagg må vurderes mot kildene før spillere korrigeres.

---

# v3.67 – Identity & Registration Integrity (15. november 2026)

## Endringer

1. **Stoppet falsk ekstern identitet på genererte spillere.** `transfermarktIdentityOf` avviser genererte/fiktive identiteter før direkte lagrede ID-felt leses. `makeRealPlayer` avgjør nå syntetisk identitet før det forsøker å slå opp Transfermarkt-profil. Genererte navn får heller ikke arve kuraterte spillerverdier, FPL-statistikk eller navnebaserte posisjonsroller fra en ekte navnebror.
2. **Ryddet eksisterende kontaminerte registreringer.** Engangsmigreringen fjerner uverifiserte Transfermarkt-ID-er og eksterne profilfelter fra genererte identiteter. Eksisterende rating, attributter og potensial endres ikke; berørte profiler merkes `attributesReviewRequired`.
3. **Utvidet navnekollisjonskontroll.** Offisielle UEFA List A- og List B-navn inngår nå i klubbscopet profiloppslag. Profil fra en annen klubb kan ikke automatisk kobles til en spiller med samme navn når offisielle registre viser flere klubber.
4. **Korrigert to klubbspesifikke UEFA-oppføringer.** Benfica-spilleren Leonardo Lopes får fødselsdato 2008-04-06 og keeperposisjon. Benfica-spilleren Francisco Silva får fødselsdato 2007-09-14 og angrepsposisjon. Sporting CP-utgaven av Francisco Silva og Gent-utgaven av Leonardo Lopes beholdes adskilt.
5. **Registrert to offisielle utlån.** Claudio Echeverri er markert Manchester City → Benfica med sluttdato 30. juni 2027. Georgie Gent er markert Barnsley → Boston United med sluttvindu desember 2026. Startdatoer er ikke lagt inn uten bekreftet dato, og Georgies eksakte sluttdato er ikke kjent i kildematerialet som ble brukt.
6. **Utvidet revisjonen til alle sju registre.** `scanned` teller nå alle materialiserte spillerregistreringer, også genererte rader som ikke kan brukes som sikker ekstern identitet. Gyldige registrerte utlån får egen type `active-loan-overlap`.

## Bevaringsregler

- Ingen automatisk masseendring av spillerferdigheter, rating eller potensial.
- Ingen spiller fjernes på grunnlag av navnelikhet alene.
- Genererte spillere beholder lokale spillidentiteter og karriere-ID-er; det er bare uverifiserte eksterne profilkoblinger som fjernes.
- Offisielle utlån beholdes som to klubbrelevante registreringer, men identifiseres som samme låneforhold. Ukjent lånegebyr og lønnsfordeling forblir eksplisitt ukjent. For å unngå dobbel kostnadsføring legges lønnskostnaden midlertidig hos moderklubben (100 % i budsjettmodellen, 0 % hos låneklubben). Dette er en teknisk reserveberegning, ikke en dokumentert kontraktsfordeling.
- Engangsmigreringen styres av `playerIdentityIntegrityVersion=1` og loggfører antall endringer i karrieren.

## Forventet migreringssammendrag

Ved oppstart av en karriere fra den undersøkte v3.66-eksporten forventes migreringen å håndtere 112 genererte spillerregistreringer med uverifiserte Transfermarkt-ID-er (56 ulike karriereidentiteter), to klubbspesifikke UEFA-spillerkorreksjoner og seks registreringsrader for de to utlånsforholdene. Det faktiske antallet på en annen lagret karriere kan avvike dersom spillere eller registre er endret siden eksporten.

## Avgrensning

v3.67 er en identitets- og registreringsreparasjon. Den er ikke den senere ferdighets-/CA/PA-revisjonen. Profilattributter som tidligere kan ha blitt påvirket av feil ekstern identitet er flagget til neste gjennomgang, ikke automatisk omskrevet.


## v3.67 – regresjonstest mot spillerrevisjonen fra 15. november

De aktuelle migrerings- og identitetsfunksjonene ble kjørt isolert mot de 10 725 spillerregistreringene i den opplastede v3.66-eksporten. Resultatet var: 112 kontaminerte genererte registreringsrader fra 56 karriereidentiteter ryddet; 2 klubbspesifikke Benfica-korreksjoner; 6 registreringsrader merket som to offisielle utlån; 0 gjenværende genererte identiteter med eksterne profil-ID-er; og alle 112 kontrollerte rating-/attributt-/potensialsett uendret. Etter migreringen viste revisjonen 0 kryssklubb-ID-konflikter, 2 eksplisitte utlånsoverlapp og 1 navnekollisjon som fortsatt krever manuell vurdering. En ny migreringskjøring gjorde 0 endringer.

Hele JavaScript-innholdet i HTML-filen er kontrollert med `node --check`. Dette er syntaks- og isolert migreringsregresjonstest, ikke en full nettleser-/kampmotortest eller en direkte test mot en live Supabase-karriere. Den faktiske lagrede karrieren blir først migrert når den åpnes og lagres i v3.67.
