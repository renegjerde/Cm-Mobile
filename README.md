# CM Mobile v2.05 — Touchline Edition

## Nytt i v2.05 — mer presist overgangssøk

- La til sammenleggbart «Avansert søk» i overgangsmarkedet, slik at grunnvisningen fortsatt er ryddig på mobil.
- Aldersfilter med nedre og øvre grense. Spillere uten registrert alder utelates når et aldersfilter er aktivt.
- Eksakt posisjon/rolle, blant annet RB (høyreback), LB, LCB, CB, RCB, vingback, DM, CM, AM, LW, RW og ST. Filteret sjekker primærrolle og registrerte naturlige posisjoner.
- Maksimal overgangssum og minimumspotensial.
- Filtrene kombineres med fritekstsøk, bred posisjonsgruppe, spillertilgjengelighet og sortering.
- «Nullstill avanserte filtre» fjerner bare de avanserte kriteriene.

## Videreført fra v2.04
- Teknisk spillerdata skjult i sammenleggbart diagnostikkpanel.
- Klubbløst overgangsmarked, juniorakademi, pre-season, treningsformasjoner, utviklingsregler og karrierelagring.
- Egen overgangsliste beholdes sammenleggbar, med åpen/lukket status når spillere legges ut for salg.

## Testing
- JavaScript-syntaks kontrollert med Node.js.
- Avanserte filtre testet sammen med markedets eksisterende søk og sortering i Chromium.
- Filtrene er kontrollert for aldersgrenser, rollefiltrering, prisgrense, potensial og nullstilling.
- Full testing av alle karrieresituasjoner på publisert GitHub Pages er ikke garantert.
