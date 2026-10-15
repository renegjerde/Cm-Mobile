# CM Mobile v1.35

## Rettelse
- Rettet feil i taktikkvisningen som gjorde at «Sett opp laget» ikke åpnet laguttaket.
- Årsak: `posLabels` ble brukt til å gruppere reserver, men var ikke definert. Dette utløste en JavaScript-feil ved rendering av taktikk-siden.
- Definert posisjonsgruppene for keepere, forsvar, midtbane og angrep.

## Test
- JavaScript-syntaks kontrollert med `node --check`.
- Testet i Chromium med mobil viewport: «Sett opp laget» åpner nå «Laguttak og taktikk» og viser 11/11 valgt og 14 reserver.

## Publisering
Pakk ut ZIP-en og bruk `CM_Mobile_v1.35/index.html` til å erstatte rotfilen `index.html` i GitHub-repoet som publiseres fra `main`-branchens rot.
