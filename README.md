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
