# CM Mobile v1.24 — Real Player Database

## Innhold
- 20 Premier League-klubber for sesongen 2026/27.
- 25 spillere per klubb (500 spillerprofiler totalt).
- Ekte spillernavn og klubbtilknytning basert på Premier Leagues publiserte troppslister, med registrerte U21-/akademispillere brukt som troppsdyp der det trengs.
- Spillerrating, posisjon, alder, potensial, ferdigheter, estimert markedsverdi og lønn.
- Individuelle attributter genereres deterministisk fra spillerens navn og klubb, slik at de ikke endres ved ny lasting.
- Spillerdatabasen bygges første gang og lagres i `localStorage` sammen med karrieren. Ingen eksterne forespørsler foretas når spillet åpnes eller under kamper.
- Motstandernes lag bruker samme lagrede spillerdatabase, ikke tilfeldige generiske spillere.

## Viktig om datakvalitet
Spillernavn og troppsinndeling er basert på Premier Leagues 2026/27-troppslister. Individuelle attributter, potensial, lønn og markedsverdi er spillestimater – de er ikke offisielle Transfermarkt- eller Fantasy Premier League-felt. Kjente spillere har håndkalibrerte ratinger; øvrige ratings estimeres ut fra klubbnivå, posisjon og alder.

## Oppdatering
Erstatt `index.html` på GitHub Pages med denne filen. Databasen lastes inn én gang per lokal karriere og lagres lokalt. Ved oppgradering fra tidligere versjoner erstattes den gamle generiske troppen med den nye troppen for valgt klubb første gang v1.24 åpnes; resten av karrierens tabell, kampprogram og økonomi beholdes så langt det er mulig.

## Kontroll
- JavaScript-syntaks kontrollert med `node --check`.
- Databasetest: 20 klubber, 25 unike spillere per klubb, 500 spillerprofiler totalt.
- Ingen full ende-til-ende-test i mobilnettleser er utført.
