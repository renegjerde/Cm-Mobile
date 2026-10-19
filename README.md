# CM Mobile v2.04 — Touchline Edition

## Nytt i v2.04 — ryddigere grensesnitt

### Spillerstall
- Fjernet teknisk spillerkildestatus fra den vanlige startsiden og fra toppen av spillerstallen.
- Spillerkort viser nå alder, markedsverdi og lønn uten gjentatte tekniske forklaringer om hvordan alderen ble beregnet.
- Utvidede spillerkort prioriterer ferdigheter, posisjoner, potensial, moral, kampform og statistikk. Rå fødselsdato og kildeetikett vises ikke lenger i det vanlige spillerkortet.
- Teknisk datakvalitet er fortsatt tilgjengelig nederst på spillerstallsiden under det lukkede panelet «Spillinformasjon og diagnostikk».
- Diagnostikkpanelet beholder samlet kilde-/dekningstatus og gir en egen utvidbar kontrolliste med fødselsdato og kilde for hver spiller.

### Videreført fra v2.03
- Klubbløst overgangsmarked som oppdateres ved sesongskifte.
- Juniorakademi med 25 spillere fordelt på 3 keepere, 8 forsvarere, 8 midtbanespillere og 6 angripere.
- Fire ukers pre-season og tre treningsformasjoner.
- Spilletid påvirker utvikling og aldersrelatert nedgang.
- Ingen automatisk juniorforfremmelse ved pensjonering.
- Sammenleggbar egen overgangsliste som beholder brukerens åpne/lukkede valg.
- Komprimert karrierelagring med støtte for eldre ukomprimerte JSON-lagringer.

## Testing
- Versjonsmerking kontrollert for v2.04.
- HTML-/JavaScript-syntaks testes før levering.
- UI-endringene flytter diagnostikk ut av normal visning uten å slette kilde- eller aldersdataene som brukes til kontroll.
- En full ende-til-ende-test av alle karrieresituasjoner på publisert GitHub Pages er ikke garantert.
