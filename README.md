# CM Mobile v2.53 — Touchline

## Hva er nytt
- Korrigert dupliserte spillernavn i innebygde 2026/27-lister: Joao Pedro ligger bare hos Chelsea, James Beadle bare hos Birmingham City i spillverdenen (Brighton har ham på lån), og Crawleys Jonny Russell er skilt fra Mansfield-spilleren Jon Russell (Jonathan Edward Russell).
- Spillerregisterets versjon er økt til 11, slik at en urørt preseason kan bruke oppdatert navneliste. Spilte/endrede karrierer skal beholde troppene sine.
- Lagt til en datakvalitetsrapport for alle 20 Premier League-klubbene og 72 EFL-klubbene, samt deterministiske tester av den automatiske lavere-divisjonsmotoren.
- Ingen eksterne runtime-API-er er lagt til. Spillet forblir offline-first.

## Datakvalitet og testbegrensninger
- De innebygde listene inneholder 459 PL-navn og 1 479 EFL-navn etter korrigeringene; eksakt duplisering på tvers av klubbene er fjernet.
- Det innebygde profilarkivet har historiske data. At en spillerprofil finnes, bekrefter ikke i seg selv aktuell klubbtilhørighet.
- Lavere divisjoner simuleres av `seededScore` ut fra klubbens styrketall, ikke av full spillertroppbasert kampmotor. Testene er deterministiske og dekker hele 46-kampers dobbel serie i hver 24-lagsdivisjon, men bruker de eksisterende genererte styrketallene. Korrelasjonen mellom styrketall og tabellplassering varierer derfor betydelig; rapporten dokumenterer dette som neste gameplay-forbedringsområde.
- Syntakskontroll, roster-integritetskontroll og deterministiske sesongtester er kjørt. Headless Chromium-oppstart ble forsøkt, men timed out under appinitialisering; den regnes derfor ikke som bestått.

## Innhold
- `index.html` — spillet
- `README.md`
- `ROSTER_AND_LOWER_LEAGUE_AUDIT_v2.44.md`
- `ROSTER_AND_LOWER_LEAGUE_VALIDATION_v2.44.json`
- Tidligere kalibreringsrapporter og roster-rapporter


## v2.45 – Klubbspesifikke styrkevurderinger
- Erstattet den smale hash-baserte styrkespredningen i de tre EFL-divisjonene med en eksplisitt, klubbspesifikk 2026/27-estimatliste.
- Ny karriere får styrkeverdier som varierer tydeligere mellom klubbene. Estimatene er spillbalansevurderinger, ikke offisielle eller verifiserte ratinger.
- Eksisterende aktive karrierer beholder styrkeverdiene sine; migrering skjer bare i urørt preseason.
- EFL-spillerregisterversjon er 11, slik at urørte preseason-karrierer bygger opp spillertroppene på nytt etter ratingoppdateringen.
- Ingen eksterne runtime-API-er.

- `LOWER_LEAGUE_STRENGTH_CALIBRATION_v2.45.md` — styrkevurderinger og sesongtest
- `LOWER_LEAGUE_STRENGTH_VALIDATION_v2.45.json` — maskinlesbare testresultater


## v2.46 – Spillertroppbasert lagstyrke
- Lagstyrken som brukes i kampberegninger beregnes nå fra tilgjengelige spillere, med en prioritert 4-4-2-balanse (keeper, forsvar, midtbane og angrep), kvaliteten på beste XI, benkedybde, keepernivå, relevante attributter og spillerens tilgjengelighet/formfaktor via fitness.
- For aktive karrierer brukes den faktiske managerstallen; for andre klubber prioriteres oppdatert world squad, deretter den innebygde EFL-spillerdatabasen og til slutt klubbens styrkeestimat.
- EFL-spillerregisteret er økt til versjon 12 for urørte preseason-karrierer. Eksisterende aktive sesonger skal ikke få troppene sine overskrevet.
- Dette påvirker beregninger som bruker `teamPower`; automatisk simulering av EFL-ligakampene bruker fortsatt den separate `seededScore`-modellen og er ikke fullstendig spillerbasert ennå.
- Ingen eksterne runtime-API-er er lagt til.

- `SQUAD_POWER_VALIDATION_v2.46.md` — validering av troppbasert lagstyrke.
- `SQUAD_POWER_VALIDATION_v2.46.json` — maskinlesbare testresultater.


## v2.47 – Spillerbasert automatisk EFL-simulering
- Automatisk simulering i Championship, League One og League Two bruker nå `calculateRosterPower()` på den innebygde spillerstallen for hvert lag før resultatet trekkes.
- Kampresultatets tilfeldige modell er beholdt, men forskjellen mellom lagene kommer fra beste tilgjengelige XI, posisjonsbalanse, keeper og benkedybde i stedet for direkte fra klubbens statiske styrketall når en spillerstall finnes.
- Hvis en klubb mangler en tilgjengelig innebygd spillerstall, brukes klubbens styrketall som kontrollert fallback.
- Ingen eksterne runtime-API-er er lagt til. Spillet forblir offline-first.
- Begrensning: Den automatiske EFL-simuleringen bruker spillerbasert lagstyrke som input, men simulerer ikke individuelle hendelser eller spillerattributter på samme detaljnivå som live-kampmotoren. Dette er en overgang mot full integrasjon, ikke en full simulering av 92 klubbers individuelle kampmotor.
- `LOWER_LEAGUE_PLAYER_POWER_v2.47.md` og `.json` dokumenterer implementasjon og statiske valideringer.


## v2.48 – Automatisk EFL-kampstatistikk
- Automatiske kamper i Championship, League One og League Two registrerer nå spilleropptredener, mål, assists og kampreferat med målhendelser.
- Spillerutvalg for statistikk følger en tilgjengelig XI med keeper, forsvar, midtbane og angrep; målvekting favoriserer angripere og offensive midtbanespillere uten å gjøre andre posisjoner umulige som målscorere.
- EFL-tabellen viser toppscorere for valgt divisjon, og spillerstatistikk inkluderer spillere med registrerte kamper fra automatisk simulerte EFL-oppgjør.
- Kampreferat lagres med en grense på 160 oppgjør per divisjon for å holde lagringsdataene håndterbare. Scorerstatistikk beholdes gjennom sesongen.
- EFL-spillerregisterversjonen er økt til 13 for urørt preseason; eksisterende karrierer beholder spillerstallene sine.
- Begrensning: Automatisk EFL-kampmotor bruker fortsatt en forenklet resultatmodell. Spillerhendelser registreres etter resultatet og er ikke fullstendig simulert som i live-kampmotoren.
- `EFL_PLAYER_STATS_VALIDATION_v2.48.md` dokumenterer tester og begrensninger.


## v2.49 – Sesongkontroll for EFL-spillerstatistikk
- Lagt til `lowerLeagueStatsAudit()` som sammenligner antall spilte kamper i ligatabellen med forventet antall per gjennomførte runder, og summerer mål fra spillerstatistikken mot målene i tabellen.
- Kontrollerer også tabellregnskapet: spilte kamper = seire + uavgjort + tap, og poeng = 3 × seire + uavgjort.
- Sesongkontroll vises på divisjonssiden for Championship, League One og League Two. Avvik varsles i stedet for å skjules eller repareres automatisk.
- Revisjonen kjøres etter hver simulerte runde og ved visning av divisjonssiden. Matchloggen beholder maks 160 kamper per divisjon; totalsesongens spillerstatistikk lagres separat.
- Ingen eksterne runtime-API-er, ingen endring i spillertroppene eller sesongmigrering.
- Full isolert 46-runders sesongtest med syntetiske staller: 1 656 kamper, 4 090 tabellmål og 4 090 spillermål; ingen avvik i tabellregnskapet. Dette er ikke en full nettlesertest eller en test med samtlige faktiske innebygde spillertropper.
- `EFL_SEASON_AUDIT_v2.49.md` og `.json` dokumenterer kontrollene, resultatene og testbegrensningene.


## v2.50 – Cupstatistikk og versjonsmerking

- AI-vs-AI-kamper i FA Cup og EFL Cup registrerer nå spilleropptredener, minutter, mål, assists, sjanseskaping og kort gjennom den eksisterende sesongstatistikkfunksjonen.
- Cupstatistikken oppdateres fra ordinær kampmotor før eventuell straffesparkkonkurranse avgjør vinneren. Straffekonkens avgjørende spark blir dermed ikke feilaktig ført som ordinært mål.
- Spillerstatistikk oppdateres bare for lag med en gyldig vedvarende `worldSquads`-oppføring. Lag uten vedvarende tropp lagrer ikke oppdiktet statistikk i en annen klubbs stall.
- Synlig versjonsmerking i toppfelt og appens sesonglinje er oppdatert til v2.50.
- Kontroll: JavaScript-syntaks og ZIP-integritet. Ingen full nettleser-/sesongtest er hevdet i denne leveransen.


## v2.51 – Statistikk per konkurranse
- Innført `competitionStats` per spiller med kamper, minutter, mål, assists, sjanseskaping og kort.
- Automatisk simulerte ligakamper, EFL-kamper og cup-/europakamper legger tall i den relevante konkurranseposten samtidig som samlede sesongtall beholdes.
- Spillerstatistikksiden har nå et konkurransefilter: Alle konkurranser, Premier League, Championship, League One, League Two, FA Cup, EFL Cup og de tre europacupene.
- Den aktive managerens live-kamper registrerer opptredener/minutter og mål/assists/kort under konkurransen som faktisk spilles.
- Sesongskifte nullstiller både samlede sesongtall og konkurransevise tall. Eksisterende lagringer migreres gradvis; eldre historiske kamper blir ikke rekonstruert.
- Ingen eksterne runtime-API-er er lagt til.


## v2.52 – Karrierearkiv og statistikkontroll
- Sesongstatistikk arkiveres før sesongtall nullstilles, med egen historikklinje per spiller og konkurransefordelte tall.
- Karriereidentitet (`careerId`) beholdes ved overgang selv om intern spiller-ID endres.
- Ny kontrollfunksjon oppdager dupliserte sesonglinjer og avvik mellom arkiverte karrieremål og sesonghistorikken.
- Sesongoppsummeringen viser arkiverte sesonger og karrieremål for klubbens toppscorer.
- Ingen eksterne runtime-API-er er lagt til.


## v2.53 – Spillerens karriereside
- Lagt til karriereprofil som åpnes fra den utvidede spillerraden i managerens førstelag.
- Profilen viser sesong for sesong klubb, kamper, minutter, mål, assists og kort; arkiverte konkurransetall; samlet karrierestatistikk; og registrerte overgangshendelser.
- Karriere-ID brukes for å finne spillerprofilen på tvers av aktive stallister og verdensdatabasen.
- Karrieretall vises som arkiverte totalsummer pluss pågående sesong. Eldre sesonger som aldri ble arkivert kan ikke rekonstrueres. Overgangshistorikk er avhengig av lagrede transferHistory-hendelser og navnematch.
- Ingen eksterne runtime-API-er er lagt til.
- Kontrollert med JavaScript-syntakskontroll og ZIP-integritet. Ingen full nettleser-/sesongtest hevdes.
- `CAREER_PROFILE_VALIDATION_v2.53.md` dokumenterer endringen og testbegrensningene.
