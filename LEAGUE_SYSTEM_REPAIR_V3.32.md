# CM Mobile v3.32 — reparasjon av ligatabell og kampregnskap

Dato: 25. oktober 2026

## Endringer
- Fjernet den engangsbaserte sperren i tabellreparasjonen. Tabellen kontrolleres nå på nytt mot aktiv sesong ved hver render.
- Streng kontroll av kamper, seire/uavgjort/tap og poeng (K = V + U + T; P = 3V + U).
- Resultatposter er merket med sesongår. Eldre resultatposter uten sesongmerking brukes ikke som sannhetskilde ved rekonstruksjon.
- Resultatføring har en nøkkel per sesong/runde/hjemmelag/bortelag, slik at samme ligakamp ikke kan telle flere ganger ved gjentatte kall.
- Ved avvik bygges tabellen fra unike, planlagte resultater i inneværende sesong. Pågående rundes lagrede AI-resultater tas med, men brukerens kampresultat blir ikke funnet på.
- Hvis pålitelig rekonstruksjon ikke er mulig, startes inneværende sesong på nytt (liga, cupturneringer og sesongstatistikk) i stedet for å vise en tabell som hevder at lag har spilt 38 kamper når karrieren står på runde 30. Skjermen viser en forklaring med mulighet for å skjule meldingen.
- Neste sesong nullstiller nå resultatloggen for ligaen slik at gamle sesonger ikke forurenser nye tabellkontroller.
- Fjernet den meningsløse bevegelsesmarkøren «→ 0» fra hver rad.
- Fjernet en hardkodet antakelse i kampprogramkontrollen som tvang aktiv divisjon til Premier League.

## Teststatus
JavaScript-syntaks, arkivstruktur og målrettede integritetstester kontrolleres etter pakking. Dette er ikke det samme som full nettlesertest av en 38-runders karriere.
