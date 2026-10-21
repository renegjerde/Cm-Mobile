# CM Mobile v2.81 — stabil taktikkredigering på trykk

## Endringer
- Fjernet all spiller-dra-og-slipp-kode og tilhørende pointer handlers fra banevisningen.
- Trykk på en spiller åpner et fast posisjonert spillerpanel ved markøren. Panelet viser taktisk rolle, automatisk rollevalg og spillerliste sortert etter rollefit/ferdighet/form.
- Velger man en spiller som allerede starter, bytter spillerne posisjon; velges en reserve, går erstattede spiller til benken.
- Rettet `Number(null) === 0`-feilen som gjorde at ingen valgt spiller ble tolket som slot 0 (keeper). Valgt plass valideres eksplisitt.
- Rollevalg er koblet til den valgte posisjonen. Standardrollen vises som automatisk rolle for samme slot, ikke som keeper med mindre plassen faktisk er keeper.
- «Avspark – bruk valgt ellever» er flyttet opp i kampforberedelsens toppkort, slik at man slipper å bla til bunnen av den lange taktikklisten. Knappen er også bevart ved banevisningen og nederst som reserveinngang.
- Assistentens anbefalte ellever og formasjon velges fortsatt automatisk i starten av hver ny kampuke. Manuelle valg gjelder etter at anbefalingen er laget og tilbakestilles ikke ved vanlig rendering.
- Gamle, frie banekoordinater fra tidligere lagringer nullstilles en gang. Dette er nødvendig fordi dra-plassering ikke lenger er en støttet kontrollmåte; manuelle rollevalg ellers beholdes.

## Kontroller
- JavaScript syntaks sjekket med `node --check` for inline script.
- Testet i Chromium på mobilviewport: bane viser elleve markører, ingen dra-attributter/handlers, trykk på forsvarer åpner korrekt rollepanel, valg av reserve erstatter den valgte plassen, valg av en annen starter bytter spillerne, og keeperrollen vises automatisk bare for keeper-slot.
- Kontrollert at startknappen er i hero/toppkortet.
- ZIP-integritet kontrollert.

## Begrensninger
Det er utført en automatisert nettleser-smoketest i Chromium med simulert lagringsmiljø, ikke en full gjennomspilling av en hel karriere på fysisk iPhone. Den automatiserte assistentelleveren er beholdt som eksisterende funksjon, og det er testet at rendering av taktikk ikke tvangs-kjører en ny anbefaling i samme kampuke.
