# CM Mobile v2.30

## Endringer i v2.30

- Gjeninnført hele det innebygde, offline spillerprofilarkivet fra den tidligere v1.96-byggen: **50,100 profiler** (snapshotdato 6. juli 2026). Profilene inneholder fødselsdato og øvrige referansefelt der kilden har dem.
- Spillerarkivet brukes til å matche navn med fødselsdato, posisjon, foretrukket fot, høyde og markedsverdi. Ingen nettforespørsel er nødvendig.
- Viktig datakvalitetsretting: profilarkivets historiske `currentClubName` brukes **ikke** lenger som fasit for å sette spillere inn i en 2026/27-tropp. En tropp må bygges fra en eksplisitt navneliste; et navnetreff i profilarkivet brukes kun til å berike spilleropplysninger.
- EFL-klubber som allerede har kuraterte seed-navn får nå disse i en ny, urørt preseason-karriere før den fiktive resten av troppen fylles. Eksisterende sesonger blir ikke byttet ut hvis ligaen allerede er spilt.
- Spillerdatabaseversjonen er økt til 11, og EFL-databasens versjon til 7 for å kjøre riktige migreringer.
- Lagt ved `ROSTER_COVERAGE_v2.30.csv`, en ærlig oversikt over hvor mange navngitte spillere som er kuratert per engelsk klubb, hvor mange kan matches mot profilarkivet, og hvor mange plasser fortsatt er fiktive.

## Hva dette ikke løser ennå

Dette er et viktig databasefundament, men det er **ikke** en ferdig, sesongverifisert database med ekte spillertropper for alle 92 engelske klubber. Profilarkivet på 50 100 rader er historisk og inkluderer også tidligere spiller-/klubbtilknytninger; det må ikke forveksles med dagens spillerstall. Premier League-listene og de eksisterende EFL-seedene er fortsatt ujevnt dekket, og den vedlagte CSV-en viser hullene eksplisitt.

Neste datasteg er å legge inn en egen `2026/27`-troppstabell med eksplisitte klubber og spiller-ID-er, bygget fra en kilde som tillater gjenbruk. Den bør valideres for 92 unike klubber, spillerduplikater, klubbtilhørighet, fødselsdato, posisjon og troppsstørrelse før den tas i bruk. Etter at en karriere starter, er alle disse dataene innebygd og spillet kjører offline.

## Kilde og begrensninger

- `dcaribou/transfermarkt-datasets`: https://github.com/dcaribou/transfermarkt-datasets
- Kildens README oppgir CC0 for datasettressursene, men varsler at innsamling/oppdateringer er satt på pause og at 2026/27-troppene ikke er dekket; snapshotet stopper 6. juli 2026.
- Arkivet brukes derfor som historisk profilreferanse, ikke som fasit for gjeldende tropp.
- Spillerens ferdigheter og potensial er fortsatt estimater i spillets modell med mindre de er spesifikt satt i spilldatabasen.

## Teststatus

- Embedded archive: 50,100 unike profil-ID-er; hver rad har en fødselsdato.
- EFL clubs in roster audit: 72.
- English clubs in roster audit: 92 (Premier League + de tre EFL-divisjonene).
- JavaScript-syntaks og ZIP-integritet må kontrolleres før publisering; full sesongverifisering av 92 faktiske tropper gjenstår.

## Filer

- `index.html` – hele spillet med innebygd spillerprofilarkiv
- `README.md` – versjonsnotater
- `ROSTER_COVERAGE_v2.30.csv` – dekningsrevisjon for de 92 engelske klubbene
