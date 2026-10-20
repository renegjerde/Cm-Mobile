# CM Mobile v2.57 — Touchline

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


## v2.57 – Overgangshistorikk med dato og type
- Nye og eldre overganger normaliseres med overgangstype og dato i spillerens karriereprofil.
- Nye overganger lagrer spillerens karriere-ID slik at profilens historikk kan knyttes til spilleren selv når intern spiller-ID endres ved overgang.
- Overgangsloggen viser dato, type, fra-klubb, til-klubb og sum.
- Overgangshistorikken bruker nå spillets faste kalender. Eldre oppføringer migreres etter lagret sesong og gameweek.
- Begrensning: kobling av gamle handler uten karriere-ID baserer seg fortsatt på spillernavn og kan derfor være usikker ved navnelikheter.
- Ingen eksterne runtime-API-er lagt til.


## v2.57 – Lån og kalenderdatoer

- Spillet bruker en fast intern kalender for pre-season og ligauker. Overgangshistorikken viser datoer fra spillkalenderen. Eldre poster uten dato migreres til datoen som følger spillets kalender og registrerte spilluke.
- Spillere fra klubbtilknyttede spillerstaller kan lånes inn i åpne overgangsvinduer for 12 uker, 24 uker eller resten av sesongen. Låneavgiften trekkes fra budsjettet og krediteres moderklubben.
- Lån returneres automatisk på sluttdatoen. Låneperiodens statistikk arkiveres separat før spilleren returnerer, og karriere-ID bevares.
- Begrensning: utlån fra managerens egen klubb til andre klubber er ikke implementert i denne versjonen.


## v2.57 — utlån, lønnsfordeling og låneforlengelse

- Egne spillere kan lånes ut til en valgt klubb i den aktive klubbverdenen.
- Låneavtalen har dato fra spillkalenderen, varighet, låneavgift og andel av ukelønn betalt av mottakerklubben.
- Aktive inn- og utlån vises under Overgangsmarked, og kan forlenges med 4 uker, 12 uker eller til sesongslutt.
- Automatiske returer håndterer både innlån og utlån.
- Lånespillere blir ikke vist som vanlige kjøpbare spillere på overgangsmarkedet.
- Ukentlige lønnskostnader fordeles mellom mottakerklubb og moderklubb etter avtalt prosent.

Validering: JavaScript-syntaks og ZIP-integritet kontrollert. Ingen full nettleser-/sesongtest er utført i denne leveransen.


## v2.57 – EFL-utlån og spillerutvikling
- Utlån fra managerens klubb kan nå gå til klubber i Championship, League One og League Two, i tillegg til Premier League.
- Utlånte spillere legges inn i mottakerklubbens faktiske EFL-spillerstall og inngår dermed i den automatiske lagstyrkeberegningen og laguttaket.
- EFL-kampmotoren oppdaterer nå også den faktiske spillerens kamper, minutter, mål, assists og konkurransestatistikk; spilletid gir dermed grunnlag for utvikling ved sesongskifte.
- Utlån til EFL-klubber returneres automatisk på avtalt dato, og manageren kan hente egne utlånte spillere hjem i et åpent overgangsvindu.
- Ingen «anslått»-datoer er lagt til; overgangene bruker spillkalenderen.


## v2.58 – Konsistente utlånslønn og EFL-utvikling
- EFL-tropper inngår nå i beregningen av utlånslønn. Mottakerklubben belastes med avtalt andel, mens moderklubben belastes for resten — også når spilleren er utlånt til en EFL-klubb.
- EFL-spillere får den årlige utviklings-/aldersbehandlingen. Det omfatter også PL-spillere som er utlånt til EFL, siden de ligger i mottakerens EFL-tropp mens lånet varer.
- Sesongstatistikk for EFL-spillere nullstilles ved sesongskiftet, slik at spilletid fra forrige sesong ikke blåses opp i neste sesong.
- Ingen eksterne runtime-API-er lagt til.
- Validering: JavaScript-syntaks og ZIP-integritet kontrollert. Isolerte logikktester for lønnsdeling og sesongreset kjørt; full nettleser-/hel-sesongtest er ikke utført.

- `LOAN_ECONOMY_AND_EFL_DEVELOPMENT_v2.58.md` — endringer, avgrensninger og testresultater


## v2.61 — Utlån og troppsintegritet

- Retur og tilbakekalling bruker spillerens stabile karriere-ID for å unngå dupliserte spillere.
- Tilbakekalling fra Premier League-klubb fjerner spilleren fra riktig kildetropp.
- Lønnsfordelingen mellom moderklubb og mottaker videreføres.
- Se `LOAN_LIFECYCLE_AND_ROSTER_INTEGRITY_v2.61.md` for endringer og testavgrensninger.


## v2.61 – Lån inn fra EFL

- Spillere fra EFL-klubber kan lånes inn via overgangsmarkedet.
- Låneavtalen lagrer EFL-divisjon og moderklubb, og spilleren returnerer til riktig EFL-tropp når avtalen utløper.
- Låneavgift trekkes fra brukerklubbens budsjett; EFL-klubbens budsjetter endres ikke fordi det ikke finnes en tilsvarende full EFL-finansmodell.
- Sesongslutt bruker EFLs 46 runder ved lån inn fra EFL.


## v2.61 – Oppstartsreparasjon

Denne versjonen gjeninnfører de manglende hjelpefunksjonene `clubDivision`, `activeLeagueClubIndices` og `activeLeagueClubs`. De ble fjernet i v2.32, men brukes fortsatt under oppstart, i ligatabeller og i flere hovedvisninger. Mangelen førte til `ReferenceError` før hovedinnholdet ble rendret.

`activeLeagueRoundCount` er også gjeninnført for å holde hjelpeblokken samlet. Ingen spillagrede data slettes som del av denne rettelsen.


## Oppstartsreparasjon i v2.61

Reparasjonen gjeninnfører manglende liga-hjelpere og kalenderkonstanter som hindret appen i å starte. Se `STARTUP_HOTFIX_v2.61.md`.
