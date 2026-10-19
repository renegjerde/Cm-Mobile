# CM Mobile v2.06 — Touchline Edition

## Nytt i v2.06 — egen økonomiside
- Flyttet klubbens økonomioversikt ut av Juniorstall og inn i en egen Økonomi-side i hovedmenyen.
- Lagt til en kort økonomioppsummering på Oversikt, med netto drift og lønnsramme samt snarvei til detaljene.
- Økonomisiden viser overgangsbudsjett, driftsinntekter, lønnsutgifter, netto drift, lønnsramme og tilgjengelig lønnsrom.
- Juniorstall er nå fokusert på akademiets 3–8–8–6-struktur, talenter og kvalifisering for opprykk.
- Beholdt økonomimodellen og eksisterende lagringsformat; endringen flytter visningene, ikke karrieredataene.

## Videreført fra v2.05
- Avansert overgangssøk med alder, eksakt posisjon, maksimal overgangssum og minimumspotensial.
- Sammenleggbar egen overgangsliste, med stabil åpen/lukket tilstand.
- Skjult teknisk spillerdatainformasjon i diagnostikkpanelet.
- Pre-season, treningsformasjoner, spillerutvikling, klubbløst marked og juniorakademi.

## Testing
- JavaScript-syntaks kontrollert med Node.js.
- Oppstart og navigasjon mellom Oversikt, Økonomi og Juniorstall testet i Chromium med den innebygde HTML-filen. Ingen JavaScript-feil under disse visningstestene.
- Kontrollert at økonomioversikten ikke lenger vises på Juniorstall, og at Økonomi-siden viser de relevante budsjett- og driftsfeltene.
- Publisering på GitHub Pages og full testing av alle karrieresituasjoner er ikke testet i denne runden.
