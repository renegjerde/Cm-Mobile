# CM Mobile v2.94 — Justert O/N-merke i ligatabeller

## v2.94 — Renere plassering av opprykks-/nedrykksstatus
- O- og N-merker vises nå visuelt til venstre for plasseringstallet i divisjonstabeller, hovedtabellen og sesongens endelige ligatabell.
- Statusmerket legges i en fast posisjon i første celle, slik at tallet ikke flytter seg sidelengs når en klubb blir matematisk klar for opprykk eller nedrykk.
- Ingen endringer i beregningen av tabellplassering, opprykk, playoff eller nedrykk.

# CM Mobile v2.94 — Justert O/N-merke i ligatabeller

## v2.93 — Klikkbare sorteringskolonner
- Spillerstatistikken på sesongoppsummeringen kan sorteres ved å klikke på alle kolonneoverskriftene: spiller, kamper, minutter, mål, assists, sjanser skapt, gule kort og røde kort.
- Første klikk på en ny kolonne sorterer i naturlig retning for den typen data (spillernavn A–Å, tall høyest først). Nytt klikk snur rekkefølgen.
- Aktiv sortering markeres visuelt og oppgir retning for skjermlesere. Sorteringen endrer kun visningen, ikke spillerdataene.
- Ingen endringer i kampmotor, turneringsregler eller spillerstatistikkberegning.


## v2.92 — Gjenoppretting av forfalte cuptrinn
- Rettet at FA Cup kunne bli stående etter kvartfinalen hvis en cupuke ikke ble behandlet akkurat på planlagt uke.
- Semifinale og finale hentes nå inn automatisk ved cupoversikt, sesongoppsummering og kampukebehandling.
- Hvis brukeren er involvert i en ventende kamp, bevares kampen som managerkamp; neste sesong kan ikke overskrive en uavklart FA Cup-/Carabao Cup-kamp.
- Samme gjenopprettingslogikk beskytter Carabao Cupens semifinaleben og finale.
- Se `FA_CUP_SEMIFINAL_AND_FINAL_CATCHUP_V2.92.md` for detaljer.

# CM Mobile v2.91 — National League, opprykksstatus og nedrykksstatus

## v2.91 — National League og matematisk opprykk/nedrykk

- La til National League som en egen 24-klubbs divisjon med 46 kamprunder, tabell, simulert kampstatistikk og genererte 25-spillers tropper der det ikke finnes en verifisert offisiell navneliste.
- League Two sender de to nederste klubbene til National League; National League-mesteren og playoffvinneren går til League Two. Fire klubber fra den regionale non-league-poolen fyller de ledige plassene.
- De regionale seriene simuleres ikke som egne tabeller i denne versjonen; fire feederklubber velges deterministisk fra tilgjengelige non-league-kandidater.
- Championship-playoff er korrigert til plass 3–6 (ikke 3–8); League One 3–6, League Two 4–7, National League 2–7.
- Ligatabeller viser O ved matematisk sikret opprykk og N ved matematisk sikret nedrykk. Etter fullførte runder vises direkte opprykkslag, simulert playoffvinner og nedrykkslag.
- Player DB oppgradert til versjon 16; troppene bevares på klubbnivå når en klubb flytter divisjon, og nyopprykkede non-league-klubber får en egen 25-spillers offline tropp.
- EFL Cup inkluderer fortsatt PL og EFL-klubbene, ikke National League; National League-klubber ligger i FA Cups non-league-pool.
- JavaScript-syntaks og divisjons-/troppslister er kontrollert. Full Chrome nettlesertest tidsavbrøt i miljøet, så visuell end-to-end-kontroll gjenstår.

Se `NATIONAL_LEAGUE_PROMOTION_AND_MATHEMATICAL_STATUS_V2.91.md` for detaljer og begrensninger.


## v2.89 — Tydelig kampkontekst under livekampen
- Kampskjermen viser turneringsnavn/divisjon i et eget, tydelig banner og runde/fase ved LIVE-klokken.
- Ligakamper viser riktig runde fra kampdataene; FA Cup og EFL Cup viser den faktiske runden, og EFL Cup-semifinalen skiller mellom første kamp og returoppgjør.
- Europeiske ligafasekamper viser «Ligafase · runde N», mens europeisk sluttspill viser korrekt fase og kampnummer.
- Rettet at live-kampskjermen tidligere viste den nasjonale spilluken som «RUNDE N» selv for europeiske cupkamper.
- Ingen endringer i kampmotor, scoremodell, spillerroller eller formasjoner.
- Se `TACTICS_LIVE_MATCH_COMPETITION_CONTEXT_V2.89.md` for detaljer.



## v2.88 — Tydeligere kampinformasjon
- La til et eget, fremtredende kampkort på laguttakssiden. Motstander og eget lag vises side om side med klubbmerker.
- Turnering/divisjon vises som overskrift, og kampens runde/fase, dato og hjemme-/bortestatus vises som tydelige detaljer.
- Kortet støtter ligakamper, FA Cup, EFL Cup og europeiske ligafaser/sluttspill basert på kampdata som allerede ligger i spillet.
- Assistentens kampplan viser taktisk informasjon separat, slik at motstander og turnering ikke lenger er gjemt i en liten metatekst.
- Ingen endring i kampmotor, turneringsoppsett, spillerroller eller laguttakslogikk.
- JavaScript-syntaks kontrollert; full visuell nettlesertest er ikke bekreftet.


## v2.87 — Lesbarhet på taktikkbanen
- Gjort spillerkortene større i alle formasjoner: større kortbredde, initialsirkel, spillernavn, vurdering, rolle og rollepassform.
- Formasjoner med mange linjer beholder en egen kompaktvariant, men denne er nå betydelig mindre nedskalert enn i v2.86.
- Små skjermer får egne grenser for kortbredde, slik at de fortsatt er lesbare uten at spillerne overlapper unødvendig.
- Ingen endringer i formasjonene, spillerroller, manuelle overstyringer eller kampmotoren.
- Se `TACTICS_FORMATION_CARD_READABILITY_V2.87.md` for detaljer og validering.

# CM Mobile v2.86 — formationene på banen

## v2.86 — Mer realistisk formasjonvisning i hele spillet
- Justert banekoordinatene for alle 23 tilgjengelige formasjoner, ikke bare de tre som var vist i skjermbildene.
- Backer, vingbacker og vinger plasseres bredt; midtstoppere får naturlig spredning i treer-, firer- og femmerrekker.
- Sentrale midtbanespillere får bedre avstander, og balanserende midtbanespillere ligger litt dypere der formasjonen tilsier det.
- Formasjoner med fire eller fem linjer bruker litt mindre spillerkort for å redusere overlapping.
- Eksisterende rollevalg, manuelle rolleoverstyringer og kampmotoren er beholdt.
- Se `TACTICS_FORMATION_LAYOUT_V2.86.md` for detaljer og teststatus.

# CM Mobile v2.85 — Touchline

## v2.85 — Formasjonvelgeren lar deg overstyre assistenten
- Rettet en feil der manuelle formasjonsskifter umiddelbart ble overskrevet når taktikkvisningen ble tegnet på nytt.
- Det manuelle valget står nå til neste kampuke, eller til du trykker «Be assistenten vurdere på nytt».
- Assistentens kampkort skiller tydeligere mellom opprinnelig anbefaling og valgt formasjon.
- Se `TACTICS_FORMATION_OVERRIDE_V2.85.md` for detaljer og teststatus.
- Kontroll: syntaks for begge innebygde skript og ZIP-integritet bestod. Chromium-røyktesten stoppet på tidsavbrudd, så full interaktiv nettlesertest er ikke bekreftet.

# CM Mobile v2.84

## Klubblogomer for alle lag

- Samlet klubbmerkevisning støtter nå både klubbobjekter og rene klubbnavn. Dette retter kall fra blant annet hjemskjerm, cupresultater og kampskjerm.
- Kjente offisielle klubbmerker brukes fortsatt når URL eller crest-ID finnes. For de 92 PL/EFL-klubbene finnes det nå en direkte bildekobling til et offentlig 2026/27-register med transparente PNG-merker.
- Alle andre klubber får et eget, deterministisk skjoldmerke som SVG, med farger og monogram utledet fra klubbnavnet. Merket ligger innebygd i HTML-filen og virker derfor også uten nett.
- For PL/EFL prøves 2026/27-PNG-en først, deretter tidligere registrert URL og til slutt det genererte klubbmerket. Andre eksterne logoer faller også tilbake til et generert merke dersom bildekilden feiler.
- Hjemmeskjermens managermerke bruker samme visning som kampene og cupene.

**Merk:** v2.84 garanterer at alle klubbnavn som sendes til visningen får et synlig klubbmerke. Det er ikke det samme som å ha autentiske/offisielle klubbvåpen for samtlige lag: offisielle merker brukes der registrerte kilder finnes, mens de øvrige får særpregede, genererte merker inntil ekte logoer legges til. Se `CLUB_BADGE_COVERAGE_v2.84.md`. Kilde for PL/EFL-bildene: https://github.com/gmorison-aiio/club_logos (filene lastes fra nettet, ikke bundlet lokalt).

## Kontrollert v2.84

- JavaScript-syntaks kontrollert med Node.js.
- Isolert dekningstest av 231 unike klubbnavn fra liga-, cup- og europacupregisteret: alle gir bildekode med fallback. Alle 92 PL/EFL-klubber peker til bildekilder for 2026/27; 128 klubbnavn har en registrert ekstern logokilde totalt.
- ZIP-integritet kontrollert. Full nettleser-, mobil- og sesongtest gjenstår.

---

## v2.83 — Forsvarsmål, innlegg og dødballer

- Forsvarsspillere kan nå score i kampsimuleringen. Midtstoppere prioriteres ved corner og offensive frispark, med styrke, posisjonering, forsvarsegenskaper og ferdighet som utslagsgivende faktorer.
- Mål får en beregnet opprinnelse: åpent spill, innlegg, corner eller frispark/dødball. Dette påvirker målscorer og assistvalg, ikke sluttresultatet som er simulert separat.
- Backer og vingbacker er nå med i assistutvalget. Ved mål etter innlegg favoriseres en back/vingback som servitør; de kan også få assists fra oppbyggingsspill, men med lavere vekt enn midtbane og angrep.
- Endringene gjelder både livekampmotoren, automatiserte kampsimuleringer (inkludert europeiske og innenlandske cuper) og spillerstatistikkene i de simulerte lavere divisjonene.
- Kampkommentarer og hendelseslisten beskriver nå innlegg, corner og frispark/dødball, slik at det blir tydeligere hvordan et mål oppsto.

## Kontrollert

- JavaScript-syntaks kontrollert med Node.js.
- Headless Chromium-innlasting forsøkt, men tidsavbrøt før DOM-resultat; nettleserbasert ende-til-ende-test er derfor ikke bekreftet.
- 10 000 isolerte kampsimuleringer med fast 4-3-3-testtropp ga 2,44 mål per kamp, 11,5 % forsvarsmål (10,1 % midtstoppermål) og 17,3 % mål med back/vingback-assist. Dette er en balanseprøve, ikke en full sesongsimulering eller kalibrering mot en bestemt liga; fysisk mobiltest gjenstår.

---

# CM Mobile v2.82

## Realistisk skade- og karantenemodell

- Skader har egne typer og varighet i dager, og gir et realistisk antall kommende kamper ute. Datamodellen er kalibrert mot Premier League 2025/26-data: 553 tidstapsskader, 18 261 fraværsdager, ca. 33,0 dager per skade og 3,97 kamper ute i gjennomsnitt.
- En meningsfull langtidsandel er inkludert: hamstring, kne, leddbånd, brudd og korsbånd kan holde en spiller ute i uker eller måneder. Korsbåndsskade kan i praksis avslutte sesongen.
- Trening kan også utløse skader, med høyere risiko ved lav kondisjon og utholdenhet. Ukentlige treningsepisoder skjer bare én gang per runde.
- Direkte rødt kort har forseelsesavhengig karantene: alvorlig takling/voldelig oppførsel 3 kamper, åpenbar målsjanse 1, grovt språk 2 og spytting 6; andre gule kort gir 1 kamp. Gjentatte utvisninger i samme sesong gir én ekstra kamp per tidligere utvisning, og karantener utløst i samme kamp legges sammen.
- Gule kort har separate cut-off-punkter: PL 5 innen kamp 19, 10 innen 32, 15 ved sesongslutt; EFL 5 innen 19, 10 innen 37, 15 før play-offs. Cupgule kort legges ikke inn i ligagrensene. Cupenes egne gule-kortkarantener er ikke fullt simulert; direkte røde karantener gjelder relevante innenlandske cup-/ligakamper.
- Skade- og karantenetellere går ned etter fullført konkurransekamp – ikke når man bare åpner taktikkskjermen. AI-klubbenes spillerstaller bevarer også fravær og velger ikke skadde/suspenderte spillere.
- Eksisterende karrierer beholder pågående fravær. Tidligere tilgjengelighet lagres videre i kamptellere; spillerstall og historikk nullstilles ikke.

## Kontrollert

- 50 000 skadetrekninger: 33,16 dager i gjennomsnitt; 50,4 % over 21 dager; 9,0 % minst 70 dager.
- 5 000 simulerte kamper: 0,899 skader, 0,112 røde kort og 3,784 gule kort per kamp på tvers av begge lag.
- Testet PL- og EFL-gulkortgrenser, gjentatte røde kort, andre gule kort, summering av karantener fra samme kamp og at fravær ikke telles ned når skjermen åpnes.
- JavaScript-syntaks kontrollert; mobilvisning testes i Chromium. Fysisk iPhone og full sesongtest gjenstår.

## Kilder til kalibrering

- Premier Injuries, 2025/26 Premier League season review: https://www.premierinjuries.com/article/2025-26-epl-season-review-analysis
- My Football Facts, Premier League red/yellow cards by season (2025/26): https://www.myfootballfacts.com/premier-league/all-time-premier-league/discipline/all-time-premier-league-clubs-discipline-tables/
- FA Handbook 2026/27, Section 9, standard sanctions: https://www.thefa.com/-/media/files/thefaportal/governance-docs/rules-of-the-association/2026-27/section-9---disciplinary-regulations.ashx
- Premier League, suspensions and card rules: https://www.premierleague.com/en/news/4425344

---

# CM Mobile v2.80 — FA Cup and Carabao Cup realism

## Taktikk: fri baneplassering
- Startelleverens 11 spillere vises på en vertikal, mobiltilpasset fotballbane.
- Dra markører med touch eller mus. Posisjon lagres automatisk med karrieren.
- Når en spiller flyttes, avledes en taktisk rolle fra området på banen. Rollen brukes av den eksisterende kampmotoren.
- Trykk på markører for å åpne bytte-/rollepanelet; trykk på to spillere for å bytte startspillere.
- «Tilbakestill banen» fjerner den frie plasseringen og egendefinerte rolleoverstyringer.
- Enkelte lagbalansevarsler sjekker om markører står for tett eller om spillere er flyttet ut av grunnformasjonen.
- Formasjonsbytte, rotasjon og ny assistentanbefaling nullstiller fri plassering for å unngå at koordinater overføres til feil system.

## Publisering
Pakken har en versjonsmappe med `index.html`, `README.md` og endringsrapporter. GitHub Pages publiserer fra `main`-branchens rot dersom det er slik repoet ditt er satt opp; pakkens `CM_Mobile_v2.80/index.html` og live rotfil er to ulike steder.

## Teststatus
- JavaScript-syntaks kontrollert med Node.js.
- ZIP-integritet kontrollert.
- Utfører en Chromium-røyketest av start/karriere og taktikkvisningen der tilgjengelig; full sesong-/matchsimulering er ikke en komplett ende-til-ende-test.


## v2.75 — parallelle karrierer
- Gjeninnført knappen «Start ny karriere» på oversikten.
- Ny knapp «Karrierer» i toppfeltet lar deg åpne tidligere lagringer og bytte mellom dem.
- Opptil fire karrierer lagres separat i samme nettleserprofil. Inaktive karrierer kan slettes for å frigjøre plass. Eldre `cmMobileSave` importeres automatisk første gang og brukes videre som lagringsplass for den første karrieren, så oppgraderingen ikke dobler lagringsforbruket.
- Se `CAREER_SLOTS_AND_START_BUTTON_v2.75.md` for begrensninger og kontrollpunkter.


## v2.76 – europeiske spillerprofiler og klubbmerker
- Europeiske klubber med en eksplisitt kobling til den innebygde Transfermarkt-avledede profilbasen kan nå bruke faktiske spillerprofiler i europeiske kamper, i stedet for genererte plassholdere.
- Spillerutvalget begrenses til profiler som i datakilden var knyttet til klubbens navngitte kildeklubb; det velges inntil 18 spillere med dekning for keeper, forsvar, midtbane og angrep.
- Kildeøyeblikksbildet er datert 6. juli 2026. Klubbtilhørighet etter denne datoen er ikke kontrollert. Spillere er derfor merket som ekte profilnavn, men ikke som verifisert 2026/27-tropp.
- Utvidet klubbmerkeregisteret med flere stabile aliaser og kjente crest-ID-er. Klubber uten en kjent crest-ID bruker fortsatt den fargede initial-reserven; merkene hentes fra football-data.org på nett og er ikke alle pakket som lokale bildefiler.
- Eksisterende lagrede karrierer blir ikke overskrevet; endringen påvirker lag som bygges til europeiske kamper.


## v2.77 – PL first-team U21 roster fix
- Added first-team U21/prospect supplements alongside the Premier League senior register, including Kobbie Mainoo, Ayden Heaven, Leny Yoro and Shea Lacey at Manchester United.
- PL squads are no longer truncated at 25 after merging eligible U21 first-team players.
- The 3-8-8-6 target is treated as a preferred senior-squad shape, never as a reason to omit registered first-team youth.
- Database version bumped so untouched preseason careers rebuild. Progressed careers retain their established squad/history.


## v2.78 — player age integrity
- Fixed the root cause behind absurd ages such as JJ Gabriel at 30 and Gabriele Biancheri at 31: missing DOBs were previously converted into deterministic fictional ages and then persisted as if meaningful.
- Added verified DOB entries for a broad set of the PL first-team U21/prospect supplement; season ages are calculated as of 22 August 2026.
- Real named players without a verified date now show `Alder ikke verifisert`. A separate provisional model age is retained only for internal simulation calculations; it is not presented as a real age.
- Generated fictional identities can still use a consistent fictional age, but are flagged separately.
- Removed Biancheri from the Man Utd first-team U21 supplement because Manchester United announced his permanent move to FC Wacker Innsbruck; also removed several clearly outdated club assignments from the supplement and moved Tom Watson to Brighton.
- `PLAYER_DB_VERSION` bumped to 24. New careers rebuild the untouched preseason database; non-progressed migrations repair old fake-age values. Careers already in progress retain their squads but their displayed DOB-backed ages are repaired on load.
- Verification: JavaScript syntax, DOB-season-age checks, supplement audit, and ZIP integrity checked. Full-browser visual/season simulation testing remains incomplete.

### Ekstra kontroll v2.78

Isolert aldersmigreringstest bestod fem scenarioer, inkludert reparasjon av JJ Gabriel og Gabriele Biancheri, korrekt alder for Shea Lacey, ukjent alder for navngitte spillere uten verifisert DOB og fortsatt modellert alder for genererte identiteter. Se `PLAYER_AGE_INTEGRITY_v2.78.md` og `U21_AGE_AUDIT_v2.78.csv`. Full nettleser-/mobiltest og full sesongtest er ikke utført.


## v2.79 — Aldersmodell for alternativ virkelighet

- Ingen spiller i brukergrensesnittet vises med «Alder ikke verifisert».
- Når en kildebasert fødselsdato finnes, brukes den.
- Når DOB mangler, tildeles spilleren en fast, deterministisk simulert fødselsdato og konkret alder. U21-/førstelagstalenter får en aldersmodell i 16–21-intervallet; seniorer får en plausibel modellalder, med en noe eldre kurve for keepere.
- Simulerte fødselsdatoer følger spilleren ved overgang og gir normal aldring mellom sesonger. De merkes internt som modellerte, ikke kildeverifiserte.
- Eksisterende lagringer normaliseres ved oppstart; databasens versjoner er oppdatert slik at nye karrierer også får samme regel.
- Verktøy for spillerdiagnostikk viser nå kildebaserte kontra simulerte fødselsdatoer i stedet for å behandle manglende kildedata som manglende spillverden.

Kontrollert: JavaScript-syntaks og ZIP-integritet. En isolert test kjørte 1 992 spilleroppføringer fra PL-senior, PL U21 og EFL gjennom alderslogikken, og kontrollerte også kjent DOB, stabil dato ved overgang og aldring til neste sesong. Profiloppslag var stubbet i testen, så den verifiserer fallback-logikken – ikke alle virkelige profil- eller fødselsdata. Full visuell mobiltest/hel sesongsimulering gjenstår.

## v2.80 — FA Cup / Carabao Cup format and presentation

- Cup entrants are rebuilt from all 20 Premier League teams, all 72 in-game EFL teams, and 32 distinct non-league teams for the FA Cup. Previous cup initialization only used 20 PL teams for the Carabao Cup and added non-league teams to the FA Cup; the 72 EFL teams were missing.
- FA Cup entry is phased: League One/League Two plus 32 non-league teams enter Round One Proper; Championship and Premier League teams enter Round Three Proper. Simulated counts: 80 teams in Round One, 40 in Round Two, and 64 in Round Three.
- Carabao Cup entry is phased for 2026/27: four clubs play a preliminary round; the other 68 EFL clubs enter Round One; 11 PL clubs not in Europe join in Round Two; nine PL clubs in Europe join in Round Three.
- The preliminary ties are Tranmere Rovers–Rochdale and York City–Crawley Town. Early Carabao rounds are regionalized using an approximate in-game north/south club map.
- Carabao Cup semi-finals use two legs and aggregate scores. Extra time is only used after 90 minutes in the second leg when the aggregate is level; penalties decide a tie still level after extra time.
- Cup scores retain the match score and show extra-time / penalty outcomes separately rather than fabricating a one-goal score to force a winner.
- Reworked cup cards display competition-specific round names, progress, teams remaining, recent results, manager's pending fixture and club badges/initial fallbacks.
- The official calendar is not reproduced day-for-day: cup rounds are mapped to gameweeks. The full FA Cup qualifying pyramid, exact FA Vase/qualifying entries, postponements and TV rescheduling are not simulated.
- Migration is conservative: untouched cups with no results are rebuilt. A cup with existing results or a pending manager tie keeps its legacy data to protect career history; the new format applies to that competition from a clean start / next season as applicable.

See `DOMESTIC_CUPS_REALISM_v2.80.md` for format assumptions, official 2026/27 references and test coverage.

### Validation v2.80

- Node.js syntax check passed for inline JavaScript.
- Chromium smoke render of the competitions screen showed both cup cards, stage labels, entrant counts and recent-results section without additional application JavaScript errors. `about:blank` blocked localStorage in this isolated smoke-test setup, so it does not verify persistent browser storage or a full career start.
- An isolated tournament progression simulation using the actual cup builder / round helpers produced a FA Cup champion through the 8-stage flow and a Carabao Cup champion through the 9-stage flow. Expected counts observed: FA Cup 40, 20, 32, 16, 8, 4, 2, 1 ties; Carabao Cup 2, 35, 23, 16, 8, 4, 2 first legs, 2 second legs, 1 final.
- Semi-final aggregate scenarios, including extra time and penalties when level, checked in isolated helpers.
- ZIP integrity and visible version strings checked. Full end-to-end season simulation and user-device visual test remain outstanding.


## v2.81 – Taktikkskjerm med trykkvalg
- Dra-og-slipp er fjernet fra banevisningen. Trykk på en spiller for å åpne en spillerliste ved markøren.
- Rollevelgeren følger valgt posisjon; ingen falsk keeperseleksjon når ingen spiller er valgt.
- Spillerbytte velges fra liste; eksisterende startspillere bytter slot, reserver erstatter valgt starter.
- Avspark-knappen er flyttet opp i toppkortet. Assistenten fortsetter å velge anbefalt ellever automatisk per ny kampuke.


## v2.90 – Full sesongoppsummering

- Sesongoppsummeringen viser prestasjoner i liga, FA Cup, Carabao Cup og europacupene spilleren faktisk deltok i.
- Spillerstatistikk viser kamper, minutter, mål, assists, sjanser skapt, gule kort og røde kort for hele troppen.
- Europa-kvalifiseringen tar hensyn til FA Cup- og Carabao Cup-vinnere, uten å tildele samme klubb flere engelske plasser.
- Opprykksoversikten viser direkte opprykk og de faktiske playoffplassene fra Championship, League One og League Two før sesongbyttet.
- Sluttskjermen bruker klubbens aktive divisjon i stedet for hardkodet Premier League.
