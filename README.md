# CM Mobile v1.48 — Transfer Market Overhaul

## Hva er nytt
- Overgangsmarkedet bruker den lokale spillerbasen fra alle andre Premier League-klubber, i stedet for fem faste prototypenavn.
- 100 genererte klubbløse talenter gir markedet ekstra bredde. Disse er tydelig fiktive/genererte, ikke ekte spillerdata.
- Søk etter spiller eller klubb, filtrer på posisjon/tilgjengelighet, og sorter etter anbefaling, ferdighet, potensial, pris eller alder.
- Kjøp oppdaterer kjøperens tropp og selgerklubbens database; budsjettet trekkes fra. Nøkkelspillere kan avslå bud og kreve høyere pris.
- Markedet bygges lokalt og lagres i nettleserens spilltilstand; ingen eksterne data hentes når markedet åpnes.

## Viktige avgrensninger
- Spillerverdier og om en klubb godtar et bud er spillmodell-estimater, ikke faktiske Transfermarkt-priser.
- Dette er første steg i overgangsmarkedet. AI-styrte kjøp/salg gjennom sesongen, kontraktsforhandlinger og formelt overgangsvindu er fortsatt videre arbeid.
- Europeiske turneringer og EFL Championship/League One/League Two er planlagt som neste større trinn, ikke implementert i denne versjonen.

## Publisering
Last opp denne `index.html` til rotmappen på `main`-grenen for GitHub Pages. Spilldata lagres lokalt i nettleseren; ta vare på eksport/lagring dersom du vil beskytte en karriere.

## Test
JavaScript-syntaks kontrollert med `node --check`. Ikke fulltestet i mobilnettleser.
