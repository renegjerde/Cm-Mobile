# CM Mobile v1.80

## Endringer
- La inn et første lag med navngitte spillere for åtte sentrale europeiske klubber i Champions League/Europa-turneringene.
- Navngitte spillere inngår i den eksisterende konkurransesimuleringen og påvirker kampmotorens lagstyrke gjennom spiller-ratingene.
- Klubber uten en kuratert navneliste beholder genererte spillere. Ufullstendige plasser i navngitte lag er også genererte plassholdere.
- Europacupdatabasen versjoneres på nytt slik at lagene bygges med den oppdaterte spillerstrukturen.

## Viktige begrensninger
- Dette er et delvis spillerdata-grunnlag, ikke 25 verifiserte spillere for alle 32 internasjonale klubber.
- Spillernavnene er kuratert fra tilgjengelige 2025/26-lag- og kampkilder, men klubbtilhørighet kan endre seg og bør kvalitetssikres før en karriere med streng realisme.
- Europacupkampene simuleres fortsatt automatisk. Neste steg er å koble managerens europacupkamper til live-kampmotoren.
- JavaScript-syntaks er kontrollert med `node --check`; full ende-til-ende-test i mobilnettleser er ikke utført.

## Publisering
Pakk ut ZIP og erstatt `index.html` i roten av `main`-grenen for GitHub Pages.
