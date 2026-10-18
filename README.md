# CM Mobile v1.89

## Endringer siden v1.88
- Oppdatert deltakergrunnlaget for Champions League, Europa League og Conference League til de 36 klubbene i hver ligafase for 2026/27, basert på UEFAs publiserte deltakerlister.
- Beholder 8 kampdager i Champions League og Europa League og 6 kampdager i Conference League.
- Bruker databasealiaser for å koble enkelte UEFA-navn til eksisterende klubbdata; klubber uten egen spillerstall får fortsatt genererte spillere.
- Senere sesonger bruker fortsatt spillets kvalifiserings-/simuleringsmodell.

## Teststatus
- JavaScript-syntakskontroll med Node.js.
- Kontroll av at hver 2026/27-turnering har nøyaktig 36 unike lag.
- Kontroll av at de tre listene ikke inneholder engelske klubber i mer enn én turnering.
- Kontroll av turneringsoppsettets kampdager og at hver runde har 18 kamper.
- Full visuell nettlesertest må fortsatt gjennomføres lokalt før publisering.

## Avgrensninger
- Dersom sammenlagtresultatet fortsatt er uavgjort etter ekstraomgangene, avgjøres europacupoppgjøret med straffespark.
- Trekning/kvalifisering og klubblister er fremdeles en forenklet spillmodell, ikke en full reproduksjon av alle offisielle UEFA-begrensninger.
