# CM Mobile v2.83 — forsvarsmål, innlegg og dødballer

## Problem
Kampmotoren valgte målscorere fra ATT/MID selv når avslutningssituasjonen skulle kunne ende med et forsvarsmål. Assists kunne bare tildeles MID/ATT, så backer og vingbacker var helt utelukket.

## Endringer
- La til en felles modell for målopprinnelse: åpent spill, innlegg, corner og frispark/dødball.
- Ved corner og offensive frispark får midtstoppere en tydelig, men ikke garantert, fordel i målscorervalget basert på rolle, styrke, posisjonering og defensive ferdigheter.
- Backer/vingbacker kan få assists; ved innlegg prioriteres en bred forsvarer på banen som servitør.
- Vanlige assists kan også tildeles forsvarere, men langt sjeldnere enn til midtbane-/angrepsspillere.
- Samme prinsipp er lagt inn i livekamper, automatiserte kampresultater og lavere divisjoners individuelle statistikker.
- Live-kommentar og hendelseslisten skiller nå mellom innlegg, corner og frispark/dødball.

## Avgrensning
Målopprinnelsen avgjøres når en scoring allerede har skjedd, så denne endringen justerer fordelingen av målscorere og assists uten å øke kampenes antall mål eller skudd. Den er en spillmodell, ikke en full simulering av hvert innlegg eller hver corner.

## Tester
- `node --check` på JavaScript hentet fra HTML: bestått.
- 10 000 isolerte kampsimuleringer med fast 4-3-3-testtropp: 2,44 mål per kamp, 11,5 % forsvarsmål, 10,1 % midtstoppermål og 17,3 % mål med back/vingback-assist. En separat 100 000-måls attributtest ga tilsvarende tall. Skader var deaktivert i denne balanseprøven; den er ikke en full sesongtest eller ligakalibrering.
- Headless Chromium-innlasting forsøkt, men tidsavbrøt før DOM-resultat; nettleserbasert ende-til-ende-test er ikke bekreftet.
- Full sesongsimulering og fysisk mobiltest: ikke utført.
