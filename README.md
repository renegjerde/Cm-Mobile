# CM Mobile v1.75

## Endring i denne versjonen
- Ligatabellen fargekoder nå konsekvensen av plasseringen: grønt for direkte opprykk, blått for playoff og rødt for nedrykk.
- Premier League viser røde nedrykksplasser; de andre divisjonene viser opprykk, playoff og nedrykk etter divisjonens plassfordeling.
- Brukerens klubb beholder en tydelig markering samtidig som sonefargen vises.
- En forklaring under tabellen viser hva fargene betyr.

## Kontroll
JavaScript trekkes ut og kontrolleres med `node --check`. Dette er en syntakskontroll, ikke en full nettlesertest.

## Publisering
Pakk ut ZIP-filen og last opp `cm_mobile_v1_75/index.html` som rotfilen `index.html` i `main`-grenen dersom GitHub Pages publiserer fra rot.
