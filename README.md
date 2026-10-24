# CM Mobile v3.16

## Innhold
- `index.html` — komplett spillet, klar til publisering i GitHub Pages-roten.
- `DIVISION_AUDIT_V3.16.md` — gjennomgang av alle 116 klubbplasseringene i de fem engelske divisjonene ved sesongstart 2026/27.

## Endringer i v3.16
- Gjenoppretter en uforanderlig 2026/27-grunnliste for Premier League, Championship, League One, League Two og National League når en ny eller lagret 2026/27-karriere åpnes.
- Hindrer divisjonsendringer fra en senere karriere i å lekke til en annen karriere i samme nettleser.
- Oppgraderer klubbregisterkontrollen til versjon 3 og lagrer resultatet av revisjonen i karrieredataene.
- Kontrollerer hele seriekamprogrammet: riktige klubbreferanser, én kamp per klubb per runde og én hjemmekamp/bortekamp mot hver motstander. Et ugyldig program bygges på nytt før første seriekamp dersom ingen ligakamper allerede er spilt.
- Beskytter allerede spilte resultater mot automatisk overskriving.

## Publisering på GitHub Pages
1. Pakk ut ZIP-filen.
2. Åpne mappen `CM_Mobile_v3.16`.
3. Last opp/erstatt `index.html` i `main`-grenens rot (samme sted som den aktive nettsiden allerede henter `index.html` fra).
4. Commit og push. Arkivmappen i ZIP-en er bare leveringsstruktur; nettsiden bruker root-filen med mindre GitHub Pages er konfigurert annerledes.
5. Åpne siden på nytt og kontroller at toppteksten viser `v3.16`. På iPhone kan en gammel side være cachet; last siden på nytt etter at GitHub Pages er oppdatert.

## Teststatus
- JavaScript-syntaks kontrollert med Node.js.
- Klubbregister kontrollert: 20 + 24 + 24 + 24 + 24 = 116 unike klubber, ingen overlapp.
- Isolert kjøretidstest: delt divisjonsregister gjenopprettes, 38-runders Premier League-kamprogram dannes, et ødelagt program uten spilte kamper bygges på nytt, og allerede spilte kamper overskrives ikke automatisk.
- ZIP-arkiv kontrollert.
- Full interaktiv nettlesertest med brukerens faktiske karrierelagring er ikke gjennomført.
