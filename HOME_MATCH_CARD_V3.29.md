# Oversikt: kampknapp, tabellplassering og form – v3.29

## Dobbeltknapp fjernet
Tidligere hadde managerprofilen en grønn «Sett opp laget»-knapp samtidig som kortet for neste kamp hadde «Forbered laget». Begge åpnet samme taktikk-/laguttaksvisning. I v3.29 er den sekundære handlingen fjernet fra managerprofilen. Der står bare «Start ny karriere»; den grønne, kontekstuelle «Forbered laget»-knappen ligger i neste-kamp-kortet.

## Kampdata i oversikten
Begge lag får vist:
- plassering i den relevante tabellen når kampen tilhører en tabellfase;
- opptil de fem siste registrerte resultatene, med grønn V (seier), grå U (uavgjort) og rød T (tap).

For ordinære seriekamper hentes plasseringen fra samme divisjonstabell som klubben spiller i. Klubber i lavere divisjoner bruker divisjonens egne tabell- og kampdata. Champions League, Europa League og Conference League bruker sin respektive ligafasetabell og europeiske resultater.

For cupkamper og europeiske utslagsrunder vises ingen tabellplassering fordi disse kampfasene ikke har en tabell. Form vises hvis det finnes relevante, lagrede resultater. Pre-season og ferdigspilt sesong får ikke oppdiktede kampdata.

## Validering
Kildekoden er syntakskontrollert med Node.js. Isolerte tester bekrefter at plassering og form vises korrekt for hovedliga, lavere divisjon og europeisk ligafase, og at plassering skjules i utslagsfasene. Full nettlesertest mot lagret karriere er ikke utført.
