# CM Mobile v1.78

## Nytt i v1.78: spill cupkampene selv

- FA Cup- og Carabao Cup-rundene simulerer ikke lenger managerens oppgjør på forhånd.
- Når managerens klubb trekkes til en cupkamp, blir den stående som en ventende kamp. De øvrige kampene i runden simuleres.
- Cupkampen åpnes via laguttaket og spilles i den eksisterende live-kampmotoren.
- Cupresultatet lagres i riktig turnering, og vinneren går videre. Ligatabellen, ligarunden og ligapoengene endres ikke av cupkampen.
- Ved uavgjort etter 90 minutter spilles ekstraomganger til 120 minutter. Står det fortsatt uavgjort, avgjøres kampen av en simulert straffesparkkonkurranse, og resultatet vises i cupoversikten.
- Ventende cupkamp lagres i spilltilstanden slik at den kan fortsettes etter at spillet åpnes igjen.
- Cupkamper påvirker spillerbelastning og kampstatistikk; ligaens ukeflyt går først videre etter at ligakampen er spilt.

## Tester utført

- JavaScript syntaks kontrollert med `node --check`.
- Isolert tilstandstest kontrollert at en cup-runde venter på managerens kamp, at cuprunden ikke avanserer før resultatet er registrert, og at ligarunden ikke endres når cupkampen fullføres.
- Isolert oppsettstest kontrollert at cupkampen oppretter live-kampmotor med korrekt hjemme-/bortelag, turneringsnavn og ventende tilstand.

## Begrensning

Full nettlesertest av hele kampflyten er ikke gjennomført. Testene ovenfor er syntaks- og isolerte logikktester, ikke en full kamp spilt gjennom i en nettleser. Test gjerne fra en ny karriere eller en lagring før neste cup-runde. Tidligere lagringer der laget allerede ble slått ut i en tidligere versjon blir ikke automatisk satt inn igjen i cupen.

## Publisering på GitHub Pages

Publiser `index.html` fra denne mappen som `index.html` i roten av `main`-grenen. GitHub Pages er fortsatt konfigurert til å publisere fra rotmappen; ZIP-mappen er arkiv for versjonen, ikke en mappe som Pages automatisk publiserer.
