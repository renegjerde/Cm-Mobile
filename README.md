# CM Mobile v1.99

## Hva er endret
- Redusert det innebygde Transfermarkt-profilregisteret fra 50 100 til 5224 profiler.
- Utvalget er avgrenset til klubbene i spillets engelske ligasystem, FA Cupens oppførte non-league-klubber, klubbene i spillets UEFA-pooler for 2026/27, og spillere som allerede finnes i de definerte realistiske troppene.
- Fødselsdatoer og profilfelt er fortsatt innebygd og tilgjengelige uten nettverk ved oppstart.
- Spillerdataregisterets versjon er økt til 8 for å utløse kontrollert migrering av spilleralderdata i eksisterende karrierer.
- Knappen «Roter troppen» fra v1.97 er beholdt.

## Datakilde og begrensninger
Transfermarkt-datasettet har skjæringsdato 6. juli 2026. Klubbtilhørighet i dette snapshotet brukes ikke som fasit for 2026/27. Utvalget er gjort ved å matche klubbnavn i spillet mot historiske klubbnavn i kilden, og ved å beholde alle navn fra spillets definerte realistiske tropper. Spillere med nyere overganger kan derfor være med via navnematching, men dette er ikke en fullstendig offisiell troppsliste.

## Pakkeinnhold
- `CM_Mobile_v1.99/index.html`
- `CM_Mobile_v1.99/README.md`

## Teststatus
JavaScript-syntaks og ZIP-struktur kontrolleres før levering. Dette er ikke det samme som full visuell nettlesertest eller verifisering av hver eneste spiller.
