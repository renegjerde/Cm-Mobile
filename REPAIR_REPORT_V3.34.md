# CM Mobile v3.34 — ligasystem og EFL-tropper

Dato: 25. oktober 2026

## Målrettede kodeendringer

1. `ensureWorldSquadForClub()` oppretter reelle klubbtropper når `worldSquads` mangler data eller har en ugyldig/for liten EFL-tropp. EFL-databasen brukes først; `buildRealSquad()` brukes som reserve.
2. Ny karriere initialiserer EFL-konkurranser og spillerbase før managerens tropp bygges.
3. Fjernet den ekstra fulle byggingen av EFL-spillerbasen i karriereopprettelsen.
4. Managerens endelige tropp skrives til samme `worldSquads`-plass som resten av spillet bruker.

## Verifisert i nettleser (Chromium)

Automatiserte separate kjøringer ble utført for alle fem aktive divisjoner. I hver kjøring ble ny karriere opprettet, første ligakamp spilt gjennom 90 minutter, og ligatabell/resultatføring kontrollert etterpå.

| Aktiv divisjon | Lag i liga | Serierunder | Manager-tropp | Kamper registrert i runde | Resultater kontrollert | Tabellregnskap | JS-feil |
|---|---:|---:|---:|---:|---:|---|---|
| Premier League | 20 | 38 | 33 | 10 | 10 | Bestått | Ingen |
| Championship | 24 | 46 | 25 | 12 | 12 | Bestått | Ingen |
| League One | 24 | 46 | 25 | 12 | 12 | Bestått | Ingen |
| League Two | 24 | 46 | 20 | 12 | 12 | Bestått | Ingen |
| National League | 24 | 46 | 25 | 12 | 12 | Bestått | Ingen |

Kontrollpunkter i hver divisjon: korrekt antall ligalag og runder; gyldig serieplan; managerens stall har minst 18 spillere; samtlige aktive ligaklubber har minst 11 spillere tilgjengelig i `worldSquads`; første runde gir én registrert kamp per ligalag; `P = V + U + T`; poeng `= 3 × V + U`; kampflagget er satt; lavere divisjons tabell speiles til `lowerLeagues` uten å telle aktive ligaen dobbelt; ingen JavaScript-feil.

For å gjøre denne regresjonstesten deterministisk ble tilfeldigverdien låst under kampen; poengsummen i testkampen ble 0–0. Testen bekrefter kampflyt, resultatsynkronisering og tabellregnskap, ikke realismen i målfordelingen.

## Fortsatt ikke godkjent

Dette er en første-runde-regresjonstest, ikke en full karrieretest. Følgende må fortsatt testes før ligasystemet kan erklæres ferdig:

- Gjennomspilling av hele sesongen i alle fem divisjoner.
- Opprykk, nedrykk og playoff ved faktiske sesongsluttdata.
- Oppstart av den påfølgende sesongen og korrekt divisjonsstørrelse etter flytting av klubber.
- Målfordeling, kort, skader, suspensjoner, spillerstatistikk og overgangs-/økonomisystem gjennom en sesong.
- UI-kontroll i en vanlig brukerøkt og innlasting av en ny karriere etter full nettleseroppdatering.

## Konklusjon

v3.34 består de isolerte og nettleserbaserte testene for opprettelse av karriere og første serierunde i alle fem divisjoner. Det er ikke bevis for at hele ligasystemet er ferdig; full sesong og sesongskifte gjenstår.
