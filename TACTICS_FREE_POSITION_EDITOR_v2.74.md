# Fri baneplassering og avsluttende taktikkredigering — v2.74

## Endring
Taktikkskjermen har nå en fri, responsiv baneeditor i stedet for bare radbasert oppstilling. Spillere kan dras med touch eller mus til et egendefinert område. Posisjonen lagres i `appState.tacticalPositions` sammen med karrieren.

## Spilleffekt
Etter flytting klassifiserer spillet spillerens område i en taktisk rolle (for eksempel ving, spiss, offensiv midtbane, sentral/defensiv midtbane eller forsvarsrolle). Den posisjonsavledede rollen brukes av `assignTacticalRoles`, og dermed av de eksisterende rollesensitive kampberegningene. Den frie koordinaten påvirker ikke kontinuerlig bevegelses-/spiller-AI i selve kampanimasjonen; den styrer pre-match-posisjon og rolle i taktikk-/kampmotorlaget.

## Bruk
- Dra spiller med finger eller mus; terskel på bevegelse unngår at vanlige trykk blir tolket som flytting.
- Vanlig trykk åpner spillerens eksisterende bytte-/rollepanel; to trykk kan bytte spillerne.
- Tilbakestill-knappen fjerner egendefinerte koordinater og rolleoverstyringer.
- Formasjonsbytte, lagrotasjon og ny assistentanbefaling tilbakestiller posisjonene for å unngå at de overføres til feil startellever.
- Lagbalanse gir varsel om svært tett markørplassering og roller utenfor grunnformasjonen.

## Begrensninger
Rollevalg etter posisjon er en praktisk sonemodell, ikke en full simulator for dynamiske lagformasjoner. Den frie plasseringen bestemmer startform/rolle; den endrer ikke direkte alle løp, defensive linjer eller breddeinnstillinger under kamp. Mobil drag-and-drop bør testes i brukerens faktiske Safari-versjon.
