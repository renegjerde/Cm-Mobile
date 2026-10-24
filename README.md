# CM Mobile v3.20 — Touchline

## Endring i denne versjonen
- Hindrer nye AI-bud på seniorspillere og juniorer på siste spilluke i sommer- og vintervinduet, når neste skjerm ellers ville vist dem etter at vinduet er stengt.
- Ubehandlede bud utløper når vinduet lukkes. Gamle lagringer med ventende bud ryddes automatisk når karrieren vises i en lukket periode.
- Bud kan ikke godtas, avslås eller motforhandles dersom budets vindu ikke lenger er aktivt.
- Nye tilbud lagrer sesong og overgangsvindu eksplisitt, slik at gamle bud ikke feilaktig lever videre til neste vindu eller sesong.
- AI-klubbenes umiddelbare handler mellom seg og eksisterende overgangshistorikk beholdes.

## Publisering
Bruk `index.html` fra denne mappen som `index.html` i rotmappen til GitHub Pages (`main`). ZIP-arkivet er et versjonsarkiv.

## Teststatus
JavaScript-syntaks og ZIP-arkiv kontrollert. Isolert logikktest dekker sommer-/vintervindu, utløp etter lukking, manglende behandling av bud etter stengetid og at bud fra gjeldende åpne vindu fortsatt er gyldige. Full interaktiv nettlesertest er ikke utført.
