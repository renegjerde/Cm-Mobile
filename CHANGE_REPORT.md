# CM Mobile v3.50 — ligatabellens plasseringskolonne

## Endring
- Plasseringsnummer, opprykk/nedrykk-status og formpiler vises nå i tre faste kolonner i første tabellcelle.
- Selve plasseringstallet er høyrejustert i en fast bredde, slik at tallene står rett under hverandre.
- Opp/ned vises som kun en grønn/rød pil, uten synlig flyttetall som tidligere gjorde cellen ujevn. Tooltip og tilgjengelighetslabel beholder informasjon om antall plasser flyttet.
- En tom pilplass reserveres når klubben ikke har flyttet seg, slik at kolonnebredden ikke hopper mellom rader.
- Endringen er brukt i aktiv ligatabell, divisjonstabeller under konkurranser og sesongoppsummering.
- Versjonsmerking er oppdatert til 3.50.

## Validering
- Begge innebygde JavaScript-blokker bestod `node --check`.
- Statisk test bekreftet at alle tre tabellrenderere bruker samme rank-cell-helper.
- Statisk test bekreftet at synlig versjonsmerking er konsekvent v3.50.
- ZIP-arkivene består `unzip -t`.
- Interaktiv nettlesertest på en eksisterende karriere er ikke utført i denne leveransen.
