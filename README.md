# CM Mobile v1.81

## Rettelser
- Rettet manglende navn på Champions League, Europa League og Conference League (årsaken var at `makeComp` ble kalt uten turneringsnøkkel).
- Økt europeisk databaseversjon slik at lagrede turneringer med manglende navn bygges på nytt.
- Europacupkort viser kommende oppgjør og planlagt ligarunde før første resultat er registrert.
- Beholder eksisterende engelske ligaer, cuper og lagringsstruktur.

## Teststatus
JavaScript-syntaks og strukturelle kontroller er kjørt. Dette er ikke en full mobilnettleser- eller sesongtest. Europacupkampene er fortsatt simulert automatisk; de er ikke gjort spillbare i live-kampmotoren i denne versjonen.

Publiser `index.html` i roten av `main`-grenen for GitHub Pages.
