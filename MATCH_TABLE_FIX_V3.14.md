# CM Mobile v3.14 — Feilretting av kampstart

## Feilen
Feilmeldingen `Cannot read properties of undefined (reading 'p')` passer med resultatføring der koden ikke finner en tabellrad for et av lagene og deretter forsøker å øke `row.p`. Dette kan skje når en lagret karriere har en ufullstendig eller foreldet tabell sammenlignet med klubbene i den aktive divisjonen.

## Endring
`ensureActiveLeagueTableRows()` synkroniserer `appState.table` med klubbene i aktiv divisjon før noen kampresultater beregnes. Eksisterende statistikk bevares for klubber som fremdeles finnes med samme navn; manglende klubber får nye tomme rader. `applyTableResult()` validerer og normaliserer også radene som en siste sikkerhetskontroll.

## Teststatus
- JavaScript-syntaks kontrollert med `node --check`.
- Endringspunktene kontrollert i koden.
- ZIP-integritet kontrollert.
- Ingen full nettlesertest med brukerens eksisterende karriere/lagring er utført.
