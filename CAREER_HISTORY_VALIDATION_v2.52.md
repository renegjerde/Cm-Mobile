# CM Mobile v2.52 – Karrierehistorikk og validering

## Endringer
- Ved sesongskifte arkiveres spillerens sesongtall før nullstilling. Arkivet inkluderer kamper, minutter, mål, assists, kort, sjanser skapt og konkurransefordelte sesongtall.
- `careerId` brukes som stabil identitet gjennom overganger der intern `id` kan endres.
- Gjentatt arkivering av samme sesong hoppes over, slik at samme sesong ikke legges til to ganger.
- `careerStatsAudit()` teller historikkrader, dupliserte sesonger og eventuelle avvik mellom karrieremål og summerte arkiverte sesonger.
- Sesongoppsummeringen viser antall arkiverte sesonger og karrieremål for klubbens toppscorer.

## Kontroller kjørt
- JavaScript-syntakskontroll for inline script-blokker.
- ZIP-integritet.
- Statisk kontroll av sesongarkivering før sesongnullstilling, stabil karriere-ID i overgangsfunksjonen og idempotent beskyttelse mot dupliserte sesongarkiver.

## Begrensninger
- Full nettleser-/karrieretest er ikke utført i denne pakken.
- Karrierestatistikk begynner å bygges opp fra sesongskiftet etter oppgraderingen; historiske sesonger kan ikke rekonstrueres dersom de ikke tidligere ble lagret.
- Spillerhistorikk er knyttet til `careerId`/spiller-ID. Eldre lagringer der samme spiller allerede fikk en ny ID før v2.52, kan ikke automatisk kobles sammen med full sikkerhet.
