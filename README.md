# CM Mobile v1.76

## Balansering av styrkeforhold
- Strammere styrkespredning mellom klubbene innad i Championship, League One og League Two.
- EFL-spillerratinger følger divisjonens klubbnivå tettere og bruker et smalere tilfeldig spenn.
- EFL-resultatsimuleringen gir styrkeforskjeller noe tydeligere utslag.
- Eksisterende lagring beholder tabell/terminliste; EFL-klubbenes styrkeverdier oppdateres én gang ved lasting.

## Begrensninger og teststatus
JavaScript-syntaks er kontrollert med `node --check`. Dette er ikke en full nettleser-/sesongtest. Spillerdata i EFL inneholder fortsatt genererte navn og estimerte attributter. Kampresultater er probabilistiske og ikke en empirisk simulering av faktiske resultater.

Publiser `index.html` fra denne mappen som `index.html` i roten av GitHub Pages `main`-grenen.
