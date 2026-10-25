# CM Mobile v3.28

## Endringer
- Rettet divisjonsvelgeren i Tabell: `ensureFixtures()` overskrev tidligere valget med Premier League ved hver rendering. Valgt divisjon lagres nå separat fra divisjonen manageren spiller i.
- Lagt til en sikker engangskontroll som kan reparere Premier League-tabellen hvis antall spilte kamper er åpenbart høyere enn serierunden og hele den unike kamphistorikken kan kobles til kampprogrammet.
- Reparerer også en eldre feil i kamphistorikken der hjemmemål og bortemål kunne bli byttet når managerens klubb spilte borte.
- AI-kampene i samme serierunde gjenbrukes dersom kampen startes på nytt før brukerens kamp er ferdig. Det hindrer dobbeltelling i tabell og spillerstatistikk.
- Lavere divisjoner fortsetter å bli simulert automatisk når ligakampen er fullført.

## Publisering
Pakk ut arkivet og erstatt `index.html` i rotmappen på GitHub Pages (`main`).

## Tester
JavaScript-syntaks og ZIP-arkiv er kontrollert. Isolerte tester dekker divisjonsvalg, rundeframdrift, gjenoppbygging fra unike kamphistorikkdata og retting av eldre hjemme-/bortescore. Full interaktiv nettlesertest med karrierelagringen din er ikke utført.
