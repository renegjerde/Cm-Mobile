# CM Mobile v2.87 — lesbare spillerkort på banen

## Endringer
- Økt spillerkortenes maksbredde fra 64 til 68 px og standardbredde fra 15 % til 16 % av banens bredde.
- Økt initialsirkel fra 25 til 27 px i normal visning.
- Økt tekststørrelsen for navn, rating, rolle og rollepassform i normal visning.
- Den kompakte visningen for formasjoner med minst fire spillerlinjer er mindre aggressiv: kortmaksimum 68 px (tidligere 58 px), initialsirkel 25 px (tidligere 21 px), og større etiketter.
- Små skjermer har separat justering for kompakte kort slik at økt lesbarhet ikke gir urimelig overlapping i smale baner.

## Virkeområde
Endringen gjelder taktikkbanens spillerkort på tvers av alle 23 innebygde formasjoner, fordi den bruker felles CSS-regler. Posisjonskoordinater, rollefordeling, spillerbyttevalg og kampmotor er ikke endret.

## Validering
- JavaScript-koden i den innebygde HTML-filen syntakssjekkes.
- ZIP-arkivet kontrolleres for integritet og nødvendig mappe-/filstruktur.
- Full visuell nettlesertest er ikke bekreftet; bruk skjermbildet i spillet for siste kontroll av kortavstandene på små skjermer.
