# CM Mobile v2.68

## Nytt i denne versjonen
- Viser klubblogo/klubbmerke ved begge lag i kortet «Neste ligakamp».
- Samme kampkort viser klubbmerker for cupkamper og i pre-season viser det valgt klubb.
- Rettet operatorrekkefølgen som gjorde at antall mulige ligakamper ble vist som `NaN`.
- Viser en trygg reserveverdi dersom antall spilte ligakamper mangler eller ikke er et tall.

## Publisering
Pakk ut ZIP-filen og erstatt `index.html` i roten av GitHub Pages `main`-grenen. Behold eksisterende lagring.

## Teststatus
Kontrollert JavaScript-syntaks, ZIP-integritet og statisk tilstedeværelse av endringene. Ingen full nettleser-/mobiltest eller full sesongtest er utført. Klubblogoer for Premier League-lag bruker spillets eksisterende bildeadresser; klubber uten en definert logo viser et kort klubbmerke basert på initialer.


## v2.70 – kampskjerm
- Gjorde stillingsfeltet mer kamporientert med klubbmerker, hjem/borte-merking og tydeligere score-hierarki.
- La til «Siste situasjon»-etikett med løpende kampminutt ved kommentaren.
- Strammet opp kommentarfeltet for bedre lesbarhet på mobil.
- Endret kun presentasjon på kampskjermen; kampmotor, lagringsformat og karrieredata er ikke tilsiktet endret.
- Kontrollert JavaScript-syntaks og ZIP-integritet. Ikke full visuell test i mobilnettleser.


## v2.70 – Interaktiv banevisning
- Spillerne i banevisningen kan trykkes på for å velge en plass i startelleveren.
- Et byttepanel åpnes rett under banen og viser tilgjengelige spillere sortert etter rollepassform.
- Velges en spiller som allerede starter, bytter spillerne plass med hverandre.
- Keeperen er også klikkbar, og keeperbytter begrenses til keepere.
- Den vanlige spillerlisten og eksisterende laguttakslogikk er beholdt som alternativ.
