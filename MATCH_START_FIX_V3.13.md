# CM Mobile v3.13 — Kampstart

## Hva som er endret
`playMatch()` kontrollerer nå at klubben, divisjonen, kampprogrammet, aktuell serierunde og motstander er gyldige før simuleringen begynner. Et ugyldig åpningsprogram kan regenereres automatisk bare når karrieren er urørt (uke 1 og 0 spilte kamper). Ved andre avvik beholdes eksisterende resultater, og brukeren får en forklarende melding i stedet for en stille omdirigering til sesongoversikten.

Kampstart har også et enkelt dobbeltklikkvern og en feilhåndtering som logger feilen og prøver å gjenopprette taktikkvisningen hvis kampmotoren kaster et unntak.

## Bevisste avgrensninger
- Kampoppsettet regenereres ikke når det finnes spilte kamper, for å unngå å slette resultater.
- Dette er ikke en full gjennomgang av hele kampmotoren.

## Tester utført
- JavaScript-syntaks med `node --check`.
- Kontroll av pakkens integritet med `unzip -t`.
- Ingen full interaktiv nettlesertest gjennomført.
