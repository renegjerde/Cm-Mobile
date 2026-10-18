# CM Mobile v1.86

## Endringer i denne versjonen
- Erstattet den tidligere europacupens rene utslagsmodell med en ligafase for Champions League, Europa League og Conference League.
- Hver turnering har 36 unike deltakere. Champions League og Europa League har 8 kampdager; Conference League har 6.
- Kampplanen gir hvert lag én kamp per kampdag, ingen dupliserte motstandere i ligafasen, og balansert hjemme-/bortefordeling (4/4 eller 3/3).
- Ligatabell regner kamper, seire, uavgjort, tap, mål, målforskjell og poeng fra faktiske registrerte resultater.
- Brukerens europakamp opprettes som ventende kamp og spilles gjennom den eksisterende live-motoren. Resultatet fullfører kampdagen og oppdaterer tabellen.
- Europacupvisningen viser tabell, avanseringssoner og siste resultater.

## Begrensninger som gjenstår
- Plasseringen i ligafasen er ennå ikke koblet til komplette playoff-/utslagsbraketter.
- Deltakerlistene er en spillmodell, ikke offisiell UEFA-kvalifisering eller klubbkoeffisientbasert trekning.
- Hele spillet er ikke gjennomspilt manuelt i en nettleser. Denne versjonen må fortsatt prøves i en kopi av karrieren før publisering.

## Publisering
ZIP-en inneholder `cm_mobile_v1_86/index.html` og denne `README.md`. GitHub Pages som publiserer fra `main`-rot bruker fortsatt rotens `index.html`; å pakke ut denne mappen alene publiserer ikke versjonen.
