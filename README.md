# CM Mobile v2.07 — Touchline Edition

## Nytt i v2.07 — ryddigere taktikkbilde og utvidet formasjonssystem
- Flyttet formasjon, mentalitet, rotering av troppen og startelleverens banebilde til toppen av taktikkvisningen.
- Samlet assistentanbefalinger, sesongtrening, skader/suspensjoner og formasjonsforståelse i sammenleggbare seksjoner. Åpen/lukket tilstand beholdes når treningsformasjon endres og siden rendres på nytt.
- Utvidet formasjonssystemet fra 4 til 23 formasjoner, inkludert 4-1-4-1, 4-1-2-1-2, 4-3-1-2, 4-2-2-2, 4-5-1, 4-3-2-1, 4-2-4, 4-4-1-1, 4-1-3-2, 4-2-1-3, 3-4-3, 3-4-2-1, 3-4-1-2, 3-1-4-2, 3-5-1-1, 5-3-2, 5-4-1, 5-2-3 og 5-2-1-2.
- Brukt samme formasjonstabell til rollefordeling, banebilde og spillerplassering, slik at nye formasjoner ikke bare er synlige valg i nedtrekksmenyene.
- Assistentens anbefalinger og in-match automatisk formasjonsjustering for managerlaget holder seg til de tre formasjonene valgt i sesongtreningen.
- Oppdatert generell angreps-/forsvarsvekting og motstanderformasjoner slik at de nye systemene tas hensyn til i kampmodellen.

## Videreført fra v2.06
- Egen Økonomi-side og økonomisammendrag på Oversikt.
- Avansert overgangssøk med alder, eksakt posisjon, maks overgangssum og minimumspotensial.
- Skjult teknisk spillerdatainformasjon i diagnostikkpanelet.
- Fire ukers pre-season, spillerutvikling, klubbløst marked og juniorakademi.

## Testing
- JavaScript-syntaks kontrollert med Node.js.
- Startet HTML-filen i Chromium i mobilvisning og kontrollert at pre-season- og kampforberedelsessidene vises uten JavaScript-feil.
- Kontrollert at de 23 formasjonene finnes i både treningsvelgeren og kampformasjonvelgeren.
- For representative formasjoner (4-1-4-1, 4-1-2-1-2, 4-3-2-1, 3-4-3, 3-4-2-1, 5-3-2 og 5-2-1-2) ble 10 utespillerroller vist i banebildet, i tillegg til keeper.
- Kontrollert at treningspanelet forblir åpent når en formasjon endres.
- Full kampbalanse og publisert GitHub Pages-versjon er ikke fulltestet i denne runden.
