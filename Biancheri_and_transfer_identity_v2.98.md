# CM Mobile v2.98 — posisjon og overgangsidentitet

## Gabriele Biancheri
- Lagt inn eksplisitt posisjonsmapping til angrep (ATT), primærrolle spiss (ST) og naturlige roller ST/LW/RW.
- Nye spillerstall bruker korreksjonen ved generering.
- Eksisterende karrierer migreres automatisk under normal oppdatering av karrieresystemene, også for spillere i world squads, juniorstaller, EFL-databasen og frie spillere.

## Hindre videresalg i samme overgangsvindu
- AI-overganger bevarer en stabil `careerId` når teknisk `id` endres ved overgang.
- AI-klubber kan ikke flytte en spiller igjen dersom spillerens karriere-ID eller navn allerede finnes i overgangshistorikken for samme sesong og samme vindu.
- Begrensningen gjelder både sommer- og vintervindu og oppdateres direkte når en handel gjennomføres i samme simuleringskall.
- Spillere som allerede har flyttet i dette vinduet, skjules fra det åpne markedet resten av vinduet.
- Når et bud på managerens spiller godtas, ugyldiggjøres andre ubehandlede bud på samme spiller, og spillerens stabile karriere-ID følger med til kjøperklubbens stall.
- Ved salg fjernes spilleren fra selgerklubbens stall basert på karriereidentitet, ikke bare på en teknisk spiller-ID.

## Lagringer
Endringene er kompatible med eksisterende karrierer. Den kjente Biancheri-posisjonen korrigeres ved lasting/normal oppdatering; overføringsvernet leser eksisterende overgangshistorikk og hindrer videre flytting av spillere som allerede er flyttet i samme vindu.
