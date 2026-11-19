# CM Mobile 4.0.2 – Totalgjennomgang

**Kontrollversjon:** CM Mobile 4.0.2 – Classic Notification Cleanup  
**Omfang:** Kildekodegjennomgang av `index.html`, innebygde testharnesser og relevante rapporter i ZIP-pakken.  
**Resultat:** Flere vesentlige realisme- og konsistensproblemer er identifisert. Ingen kildekode er endret i denne gjennomgangen.

## Sammendrag

Spillet har fått mange funksjoner, men flere av delsystemene er ikke fullt samordnet. De viktigste problemene ligger i kontinental spillerutvikling, bakgrunnskampene, økonomien til EFL-klubbene og europeisk kvalifisering. Dette er ikke bare kosmetiske forhold; de kan påvirke spillerkarrierer, statistikk, klubbøkonomi og konkurranseutfall over flere sesonger.

## Funn – prioritert

### P1 – Europeiske spillere eldes ikke og får ikke normal karrieresyklus

`processCareerAgeing()` behandler managerens tropp, `worldSquads` og `eflPlayerDatabase`, men itererer ikke over `appState.europeanTransferSquads`. Samtidig er kontinentale spillere registrert i dette separate registeret. Det finnes ingen tilsvarende årlig alders-/pensjoneringspass for dette registeret.

**Konsekvens:** Spillere i europeiske klubber kan beholde samme alder og ferdighetsnivå fra sesong til sesong. De kan dermed unngå normal aldring, ferdighetsfall og pensjonering, og det europeiske spilleruniverset får en annen karrieresyklus enn England.

**Kildepunkter:** `processCareerAgeing()` rundt linje 7847; europeisk register opprettes/vedlikeholdes i `ensureEuropeanTransferWorld()` rundt linje 4184.

### P1 – Europeiske spilleres sesongstatistikk arkiveres og nullstilles ikke

`archivePlayerSeasonStats()` bygger spillerindeksen fra `worldSquads` og `appState.squad`, men inkluderer ikke `europeanTransferSquads`. Ved sesongskiftet nullstilles statistikk for `worldSquads`, EFL-registeret og managerens tropp, men ikke for `europeanTransferSquads`.

**Konsekvens:** Europeiske spillere kan få sesongtall som fortsetter å hope seg opp over flere sesonger. De mangler også korrekt sesongrad i karrierehistorikken. Profilene kan derfor vise misvisende totalsummer og sesongstatistikk.

**Kildepunkter:** `archivePlayerSeasonStats()` rundt linje 7915; `startNewSeason()` og statistikkreset rundt linje 7963–8025; europeisk kampstatistikk registreres blant annet i `recordCupRosterStats()`.

### P1 – Europeiske AI-klubber fornyer ikke kontrakter gjennom samme system

`processAIContractRenewals()` går gjennom `appState.worldSquads`, men ikke `appState.europeanTransferSquads`. På sesongslutt håndterer `processExpiredContracts()` derimot både de engelske/EFL-registrene og de europeiske troppene.

**Konsekvens:** Europeiske AI-klubber mangler den samme planlagte kontraktsfornyelsen som engelske klubber. Spillere med utløpende kontrakter kan forsvinne til free-agent-markedet uten at moderklubben får en tilsvarende mulighet til å beholde nøkkelspilleren. Dette forsterker problemet med manglende europeisk aldring og troppskontinuitet.

**Kildepunkter:** `processAIContractRenewals()` rundt linje 4542; `processExpiredContracts()` rundt linje 1696.

### P1 – Bakgrunnskamper og managerens livekamper bruker ulike kampregler

Spillet har to ulike motorer: `simulateMatch()` for bakgrunnsresultater, cup- og europakamper, og `advanceLiveEngine()` for managerens kamp.

I bakgrunnskamper:
- Utvisninger og skader registreres som hendelser, men spillerne fjernes ikke fra elleveren mens kampen simuleres.
- Det gjennomføres ikke AI-bytter i selve bakgrunnssimuleringen.
- `recordSimulatedPlayerStats()` gir alle startende spillere 90 minutter, også ved skade eller utvisning tidligere i kampen.
- Simuleringen har ikke samme andregule-kort-mekanikk som livekampen.

I livekampen fjernes utviste spillere fra elleveren, og skader kan utløse bytter eller føre til at laget spiller med én færre.

**Konsekvens:** AI-lagenes kampresultater, spillerbelastning, minutter og suspensjoner følger ikke samme regler som kampene brukeren spiller. Det gir en ujevn konkurranseverden og statistikk som kan være feil.

**Kildepunkter:** `simulateMatch()` rundt linje 8267; `advanceLiveEngine()` rundt linje 8920; `handleLiveInjury()` rundt linje 8856; `sendOffLivePlayer()` rundt linje 8902; `recordSimulatedPlayerStats()` rundt linje 9015.

### P1 – Kampmotorenes målsjanser er ikke kalibrert mot hverandre

De to kampmotorene bruker ulike grunnverdier for sjansefrekvens, sjansekvalitet, redningsfaktor og målkonvertering. For en nøytral, likestilt testprofil gir konstantene grovt anslått om lag **1,2 mål per kamp i live-motoren** og **2,0 mål per kamp i bakgrunnsmotoren**. Dette er en beregning fra de nøytrale sannsynlighetskonstantene, ikke et observert gjennomsnitt fra en full sesongsimulering.

**Konsekvens:** En kamp brukeren spiller kan få et annet scoringsnivå enn de øvrige kampene i samme liga. Det kan påvirke tabell, målforskjell, målstatistikk og opplevelsen av rettferdighet.

**Anbefaling:** Kjør store, balanserte Monte Carlo-simuleringer for begge motorer med identiske lagstyrker, og kalibrer dem mot samme målprofil før videre finjustering.

**Kildepunkter:** `simulateMatch()` rundt linje 8267; `advanceLiveEngine()` rundt linje 8920.

### P1 – EFL-klubber behandles flere ganger i årlig økonomigjennomgang

Etter klubbregistersynkronisering inneholder `CLUBS` både de 20 Premier League-klubbene og EFL-klubbene. `reviewAllClubFinancesForNewSeason()` legger først alle `CLUBS` inn i gjennomgangen, og legger deretter alle klubbene fra `appState.lowerLeagues` inn én gang til.

**Konsekvens:** De samme EFL-klubbene kan få sin økonomiske årsrevisjon behandlet to ganger. Lønnsramme, omdømme, styrke og overgangsbudsjett beregnes da gjennom to separate klubbobjekter med samme klubbnavn og delt økonomipost. Det kan gi ekstra eller inkonsistente endringer ved sesongskiftet.

**Kildepunkter:** `reviewAllClubFinancesForNewSeason()` linje 2141–2194; klubbregisteret dokumenteres som 20 PL + 24 klubber i hver EFL-divisjon i `resetBaseDomesticRegistry2026_27()` rundt linje 5019.

### P2 – EFL-økonomien har parallelle budsjett- og troppsregistre

`processWeeklyClubEconomy()` itererer først hele `CLUBS`-registeret og deretter `lowerLeagues`. EFL-klubbene finnes i begge representasjonene. I tillegg brukes `worldSquads`/`CLUBS` i noen overgangsfunksjoner og `eflPlayerDatabase`/`lowerLeagues` i andre.

**Konsekvens:** EFL-klubbens budsjett, lønnsoversikt og spillergrunnlag kan bli oppdatert fra forskjellige kopier. Dette er særlig sårbart etter AI-overganger eller når managerens egen EFL-tropp endres. Kilden til sannhet for EFL-klubbens penger og spillerstall bør samles eller speiles sentralt.

**Kildepunkter:** `processWeeklyClubEconomy()` linje 2377–2430; `processAILeagueTransfers()` rundt linje 4590; `syncDomesticEFLWorldSquads()` rundt linje 5607.

### P2 – Antall økonomiuker for hele verden avhenger av hvilken divisjon brukeren spiller i

`payWeeklyWages()` kalles ved hver pre-season-uke og etter brukerens fullførte ligakamp. Sesongkalenderen har 38 ligakampuker i Premier League, men 46 i EFL-divisjonene.

**Konsekvens:** Fordi samme funksjon oppdaterer økonomien for alle klubbene, får hele fotballverdenen flere ukentlige inntekts- og lønnsposter dersom manageren spiller i en 46-runders divisjon enn dersom manageren spiller i Premier League. Det mangler en uavhengig global kalender eller fast antall økonomiuker per sesong.

**Kildepunkter:** `payWeeklyWages()` linje 2431; `advancePreseasonWeek()` linje 2688–2706; ukentlig oppgjør ved fullført ligakamp rundt linje 10908; `activeLeagueRoundCount()` rundt linje 1760.

### P2 – Europeisk kvalifisering er bare delvis prestasjonsbasert

For senere sesonger bruker `ensureEuropeanCompetitions()` Premier League-tabellen for engelske plasser, men fyller de øvrige plassene fra faste utenlandske lagpooler. Det finnes ikke tilsvarende simulerte nasjonale tabeller for de øvrige europeiske landene.

**Konsekvens:** Ikke-engelske klubber kvalifiserer ikke konsekvent på bakgrunn av egne nasjonale resultater. Over tid kan europacupdeltakelsen derfor bli mindre troverdig.

**Kildepunkter:** `seasonReviewEuropeanPlaces()` rundt linje 7791; `ensureEuropeanCompetitions()` rundt linje 7010 og lagutvalget rundt linje 7050.

### P2 – Europeisk spillergrunnlag har blandet kilde- og verifikasjonsnivå

Kildeoppsummeringen i selve spillet sier at UEFA-snapshotet er fra 14.11.2026 for 108 klubboppføringer, men at klubber uten manuelt kuratert offisiell List A kan bruke historiske spillerprofiler fra Transfermarkt-snapshotet 06.07.2026 som reserve. Koden sier også eksplisitt at dette ikke dokumenterer november-registrering, og at ferdigheter/potensial er modellestimater.

**Konsekvens:** En del europeiske spillerstaller kan være plausible, men ikke fullt dokumentert som korrekt registrert på den aktuelle datoen. Dette er en datakvalitetsbegrensning, ikke nødvendigvis en kodefeil.

**Kildepunkt:** `playerSourceSummary()` linje 1156.

### P2 – AI-taktikk er for deterministisk og bakgrunnskamper er standardisert

`getOpponentFormation()` velger formasjon matematisk fra klubbindeks og runde. Samtidig kalles bakgrunnsfunksjonen `simulateMatch()` med `4-3-3` og `Balanced` for begge lag i ligasimuleringene.

**Konsekvens:** Motstanderens formasjon kan skifte etter en fast indeks-/rundeplan heller enn en klubbidentitet, tilgjengelige spillere, motstander eller resultater. Bakgrunnskamper bruker samtidig en enda enklere standard enn den formasjonen som kan vises i managerens egen kampforberedelse.

**Kildepunkter:** `getOpponentFormation()` rundt linje 3605; bakgrunnskall til `simulateMatch()` i `playMatch()` rundt linje 9170.

### P3 – Én eldre testharness er foreldet

16 innebygde testskript ble kjørt: 15 bestod, mens `ai_european_market_tests_v377.js` feilet i testen `wage-budget-block`. Den nyere `ai_european_market_tests_v378.js`, som dekker den senere forhandlingsmodellen, bestod.

**Konsekvens:** Testpakken inneholder minst én eldre test som ikke lenger representerer gjeldende forhandlingsforutsetninger. Den bør merkes som historisk eller tas ut av den aktive akseptansesuiten, slik at gamle tester ikke gir misvisende røde feil.

## Verifikasjon utført

- Begge innebygde JavaScript-blokkene i `index.html` passerte `node --check`.
- 16 innebygde testskript ble kjørt: 15 bestod, 1 eldre v3.77-harness feilet; nyere v3.78-harness bestod.
- Relevante testserier for spillerprofil, klubb-/ellevervisning, akademi, utlån, overgangsmarked, økonomi, UEFA-premier, notifikasjoner og Classic UI ble gjennomgått.
- Kildekode og rapporter i den faktiske 4.0.2-pakken ble kontrollert.
- Full integrert nettleser-/mobiltest og Supabase roundtrip ble ikke gjennomført. Et headless Chromium-forsøk fullførte ikke en pålitelig render i testmiljøet.

## Anbefalt rekkefølge for utbedring

1. Samle europeiske spilleres aldring, kontraktsfornyelse, pensjonering og sesongarkivering i én konsistent karrieresyklus.
2. Gjør bakgrunnskampmotoren konsekvent med livekampen: røde kort, skader, bytter og faktisk spilletid.
3. Kalibrer scoringsmodellen slik at live- og bakgrunnskamper får samme statistiske profil.
4. Fjern dobbel EFL-årsgjennomgang og gjør økonomi-/troppsregisteret entydig.
5. Skill global økonomikalender fra brukerens divisjonskalender.
6. Gjør AI-formasjoner og taktiske valg mer stabile og motstander-/troppsbaserte.
7. Først etter dette: bygg ut ikke-engelske nasjonale ligaer eller en tydeligere modell for europeisk kvalifisering.

## Konklusjon

CM Mobile 4.0.2 har et omfattende funksjonsgrunnlag, men bør ikke erklæres ferdig før de fire P1-områdene er rettet og testet i en faktisk nettleserkarriere. Den viktigste svakheten er ikke utseendet, men at deler av fotballverdenen ikke følger samme regler som andre deler. Det er dette som kan gjøre en 10–20 sesongs karriere mindre troverdig.
