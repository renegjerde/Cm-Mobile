# CM Mobile v1.90

## Endringer siden v1.89
- Lagt til en europeisk klubbemblem-mapping for en rekke klubber i Champions League, Europa League og Conference League.
- Livekampens klubbmerker bruker nå logo-URL når den finnes i mappingen.
- Europeiske deltakerobjekter får med seg logo og kortnavn, slik at andre visninger kan bruke samme data.
- Klubblag uten en verifisert logo beholder et automatisk generert emblem med initialer; manglende logo gir ikke ødelagt bilde.
- Beholder turneringsoppsettet og kampmotoren fra v1.89.

## Teststatus
- JavaScript-syntakskontroll med Node.js.
- Kontroll av at de tre turneringslistene fortsatt inneholder 36 unike lag hver.
- Kontroll av at europeiske emblem-URL-er faller tilbake til initialer ved bildeinnlastingsfeil.
- Full visuell nettlesertest og kontroll av alle eksterne bildeadresser må fortsatt gjennomføres lokalt før publisering.

## Avgrensninger
- Logoer lastes fra football-data.orgs crest-CDN og krever internettilgang.
- Logo-dekningen er ikke komplett for alle 108 europeiske deltakere ennå. Klubber som mangler en kontrollert ID vises med initialbasert reserveemblem.
- 2026/27-deltakerlistene er beholdt fra v1.89; kvalifiseringsmodellen for senere sesonger er fortsatt forenklet.
