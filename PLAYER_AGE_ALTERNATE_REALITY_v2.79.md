# CM Mobile v2.79 — konkret alder for alle spillere

## Endring
CM Mobile er en alternativ fotballvirkelighet, så en manglende offentlig fødselsdato skal ikke gjøre at en spiller mangler alder. v2.79 bruker kildebasert fødselsdato når den er tilgjengelig. Ellers opprettes en deterministisk, simulert fødselsdato som blir lagret på spilleren, følger med ved overgang og gir normal aldring gjennom karrieren.

## Reglene
- PL-/klubbprospekter i førsteelags U21-tillegget får en fast modellert sesongstartalder på 16–21 år når ingen kildebasert dato finnes.
- Andre navngitte spillere får en deterministisk alder på 18–34 år, med keeperkurve på 21–34 år, med mindre profilens aldersfelt gir et bedre grunnlag.
- Eksplisitt genererte identiteter bruker samme ordnede alternative virkelighet, men flagges som fiktive.
- Simulerte fødselsdatoer merkes internt med `ageModelledDOB`; de blir ikke feilaktig presentert som faktiske, kildeverifiserte DOB-er.
- `ageUnknown` settes til false etter normalisering, og UI-et har en defensiv backstop som alltid lager en konkret alder hvis en uventet ugyldig verdi dukker opp.

## Gammel karriere
Normaliseringsfunksjonen kjøres ved oppstart og oppdaterer eksisterende spillerobjekter. Dermed erstattes gamle fallback-aldre for navngitte spillere som mangler kilde-DOB med konsistente modellerte fødselsdatoer. Kjente fødselsdatoer som JJ Gabriel (2010-10-06) og Gabriele Biancheri (2006-09-18) prioriteres fortsatt fra den innebygde DOB-listen.

## Verifikasjon
- `node --check` på inline JavaScript: bestått.
- ZIP-test (`testzip`): bestått.
- Isolert funksjonstest: 1 992 spilleroppføringer fra PL-seniorlisten, PL U21-tillegget og EFL-listene ble kjørt gjennom alderslogikken med ekstern profiloppslag stubbet. Alle fikk en gyldig alder og fødselsdato; ingen viste ukjent alder. I tillegg bestod kontrollene for JJ Gabriel, alder ved neste sesong og uendret fødselsdato ved klubbytte.
- Dette er en spillmodell for alternativ virkelighet. Simulerte datoer er konkrete in-game fakta, men ikke påstander om virkelige spilleres faktiske fødselsdato.
- Full browser/mobile UI testing and season-length end-to-end testing have not been performed.
