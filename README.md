# CM Mobile v1.88

## Endringer siden v1.87
- Returoppgjør i europacupenes utslagsrunder går nå til ekstraomganger hvis sammenlagtresultatet er uavgjort etter 90 minutter.
- Motstanderlagene bruker også en separat ekstraomgangssimulering ved uavgjort sammenlagt; resultater merkes med «e.e.o.» i sluttspilloversikten.
- Førsteoppgjør går ikke til ekstraomganger bare fordi selve kampen står uavgjort.
- Europacupfinalen går til ekstraomganger ved uavgjort etter 90 minutter.
- Kampmotoren får med seg turneringsfase, tie-ID og kampnummer slik at korrekt regel brukes i livekampen.
- Engelske cupers eksisterende ekstraomgangsregel er beholdt.

## Teststatus
- Automatisk JavaScript-syntakskontroll.
- Automatisk test av europacupenes ligafase, poengtabell, live-kampflyt og sluttspill.
- Automatiske tester av når ekstraomganger skal/ikke skal starte, og lagring av kampdata underveis i sluttspillet.
- Nettleserens fullstendige visuelle gjennomspilling er ikke bekreftet i dette miljøet; test lokalt før publisering.

## Avgrensninger
- Dersom sammenlagtresultatet fortsatt er uavgjort etter ekstraomgangene, avgjøres europacupoppgjøret med straffespark.
- Trekning/kvalifisering og klubblister er fremdeles en forenklet spillmodell, ikke en full reproduksjon av alle offisielle UEFA-begrensninger.
