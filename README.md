# CM Mobile v1.96

## Formål

v1.95 utvider alders- og spillerprofilrettingen fra Premier League til Championship, League One, League Two og klubbene i Champions League, Europa League og Conference League.

## Hva er endret

- **Nyhet i v1.96:** Hele spillerprofilregisteret (50 100 profiler med gyldig fødselsdato) er bygget inn i `index.html`. Spillerprofiler kan dermed slås opp uten å hente Transfermarkt-CSV ved oppstart.
- Ved oppstart brukes det innebygde registeret som standard. Nettverksfeil mot Transfermarkt påvirker ikke lenger tilgjengeligheten av grunnregisteret.
- Profilregisteret brukes til navne-/fødselsdatamatching, men klubbtilhørighet i snapshotet brukes ikke som fasit for 2026/27-tropper.
- Spillerregisterversjonen er økt for å utløse migrering av eksisterende karrierer. Ta sikkerhetskopi før første oppstart; lagret tropp og statistikk skal beholdes.

## Hva er endret

- Ett felles Transfermarkt-basert spillerregister brukes som referanse for fødselsdato, detaljposisjon, foretrukket fot, høyde og markedsverdi.
- Registeret filtrerer inn spillere fra engelske konkurranser GB1–GB4, samt profiler for klubbene som deltar i UEFA-turneringenes league phase for 2026/27.
- Fødselsdatoer i ISO-format og engelske månedsformater parses. Alder beregnes fra fødselsdato per 22. august i sesongen.
- Kildens klubbnavn normaliseres med navnevarianter og aksenter, slik at navn som Sporting CP/Sporting Clube de Portugal, Celta/Celta de Vigo og FC København/FC Copenhagen kan kobles.
- Spillere som har flyttet klubb etter referansedato kan fremdeles få DOB dersom eksakte navnematcher entydig peker på samme fødselsdato. Ved tvetydige navnematcher avvises koblingen, og alderen forblir ukjent.
- EFL-tropper og europacupmotstandere kan bygges fra profiler i kilderegisteret når det finnes nok spillere i den aktuelle klubben. Dersom dekningen ikke er tilstrekkelig, beholdes reserve-/kuraterte oppføringer, men en ubekreftet alder blir ikke presentert som fakta.
- Troppsiden viser om det eksterne registeret er lastet, snapshotdato, antall klubber med minst 12 profiler og hvor mange spillere i den aktive troppen som har DOB.
- Profilregisteret for fødselsdatoer er innebygd i spillet. FPL-prestasjonsdata kan fortsatt hentes eksternt, men manglende FPL-tilgang blokkerer ikke det innebygde profilregisteret.
- Ved migrering av en eksisterende karriere oppdateres alder og referansefelt der spilleren kan matches. Lagets tropp, spiller-ID-er, overganger, statistikk og utvikling skal beholdes. Ubekreftede reserve-/placeholder-spillere får «ukjent alder» i stedet for en tilfeldig alder.

## Kilder og begrensninger

### Transfermarkt-datasett

- Prosjekt: https://github.com/dcaribou/transfermarkt-datasets
- CSV-kilde: https://pub-e682421888d945d684bcae8890b0ec20.r2.dev/data/players.csv.gz
- Kildens oppgitte snapshot går til 6. juli 2026, og prosjektet varsler at 2026/27-troppene ikke er fullstendig dekket.
- Derfor brukes snapshotet primært som profil-/fødselsdatakilde. Det garanterer ikke korrekt klubbtilhørighet etter 6. juli 2026 eller at alle 2026/27-overganger er med.
- Hvis kilden mangler en DOB, viser spillet ukjent alder; det fyller ikke ut en antatt alder som om den var bekreftet.

### Fantasy Premier League

- API: https://fantasy.premierleague.com/api/bootstrap-static/
- FPL brukes fortsatt som prestasjonsdatakilde der det er tilgjengelig, men gjelder primært Premier League og er ikke en komplett kilde til spillere i de lavere divisjonene eller europacupene.
- FPL-poeng og Transfermarkt-markedsverdi brukes som signaler i spillmodellen, ikke som offisielle attributtverdier. Ferdigheter/potensial er fortsatt modell-estimater.

## Teststatus

- Innebygd register: 50 100 spillerprofiler med gyldig ISO-fødselsdato fra det leverte datasettet. Dette er antall kildeprofiler, ikke et løfte om at alle spillere i spillet kan matches entydig.
- CSV-profilene er fra snapshotet datert 6. juli 2026; dette er ikke en komplett 2026/27-troppdatabase.
- Kontroll av alle spillernavn i hver divisjon og full visuell nettlesertest gjenstår; spillere som ikke kan matches sikkert skal fortsatt vises med ukjent alder.

- `node --check` for det innebygde JavaScriptet: bestått.
- Isolerte tester av CSV-parseren: bestått, inkludert navn med komma, aksenter, GB2/GB3/GB4 og europeiske klubbprofiler.
- Dato-/aldersberegning: 7 tester bestått, inkludert `Mar 7, 2001`, `7 Aug 1998`, ISO-dato, datoformat med tidsdel, og alder ved sesongstart.
- Klubbnavn-aliaser og normalisering: testet for Celta, Sporting CP, FC København, Aston Villa og Accrington Stanley.
- UEFA league-phase-lister i koden: 36 unike lag i hver av de tre konkurransene.
- **Ikke bekreftet:** full live-nedlasting fra den eksterne CSV-kilden og full visuell nettlesertest kunne ikke gjennomføres i byggemiljøet. Verifiser statuskortet i spillet når det åpnes i en nettleser med internettilgang.

## Installasjon / oppdatering

1. Pakk ut ZIP-arkivet.
2. Bruk `CM_Mobile_v1.95/index.html` sammen med `CM_Mobile_v1.95/README.md`.
3. Test en kopi av eksisterende karriere først. Behold separat sikkerhetskopi av tidligere versjon og lagring.
4. På troppsiden kontrolleres spillerdata-status, kildeprofildekning og antall spillere med bekreftet fødselsdato.

Versjon: **1.96**
