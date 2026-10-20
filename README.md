# CM Mobile v2.74 — Touchline Edition

## Taktikk: fri baneplassering
- Startelleverens 11 spillere vises på en vertikal, mobiltilpasset fotballbane.
- Dra markører med touch eller mus. Posisjon lagres automatisk med karrieren.
- Når en spiller flyttes, avledes en taktisk rolle fra området på banen. Rollen brukes av den eksisterende kampmotoren.
- Trykk på markører for å åpne bytte-/rollepanelet; trykk på to spillere for å bytte startspillere.
- «Tilbakestill banen» fjerner den frie plasseringen og egendefinerte rolleoverstyringer.
- Enkelte lagbalansevarsler sjekker om markører står for tett eller om spillere er flyttet ut av grunnformasjonen.
- Formasjonsbytte, rotasjon og ny assistentanbefaling nullstiller fri plassering for å unngå at koordinater overføres til feil system.

## Publisering
Pakken har en versjonsmappe med `index.html`, `README.md` og endringsrapporter. GitHub Pages publiserer fra `main`-branchens rot dersom det er slik repoet ditt er satt opp; pakkens `CM_Mobile_v2.74/index.html` og live rotfil er to ulike steder.

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
