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
