# CM Mobile v2.49 — EFL sesongkontroll

## Endring
Versjon 2.49 legger til en synlig integritetskontroll for de automatiske kampene i Championship, League One og League Two.

Kontrollen sammenligner:
- Antall kamper som ligatabellen sier er spilt, med `playedRounds × 12`.
- Samlede mål i tabellen med mål summert fra spillerstatistikken.
- Hver klubs kamptall med seire + uavgjort + tap.
- Hver klubs poeng med `3 × seire + uavgjort`.

Avvik vises i brukergrensesnittet. Data blir ikke automatisk overskrevet eller «reparert», slik at problemer ikke skjules.

## Kontroll utført i denne leveransen
- Begge JavaScript-skriptblokkene bestod `node --check`.
- Et isolert Node-testoppsett kjørte de faktiske funksjonene for kampoppsett, score, spillerhendelser og revisjon gjennom 46 runder i alle tre divisjonene, med syntetiske spillerstaller.
- Championship: 552 kamper, 1 385 tabellmål og 1 385 spillermål.
- League One: 552 kamper, 1 352 tabellmål og 1 352 spillermål.
- League Two: 552 kamper, 1 353 tabellmål og 1 353 spillermål.
- Totalt: 1 656 kamper, 4 090 tabellmål og 4 090 spillermål. Ingen avvik i poeng-/kampregnskapet eller måltilordningen.
- Matchloggen beholdt 160 siste oppgjør per divisjon, som forventet.
- Maskinlesbare resultater ligger i `EFL_SEASON_AUDIT_v2.49.json`.

## Begrensninger
Dette er en dataintegritetskontroll og isolert sesongtest, ikke dokumentasjon på at en full nettleserbasert 46-runders sesong er gjennomført i denne leveransen. Matchloggen viser maksimalt 160 siste oppgjør per divisjon; sesongstatistikken og tabellregnskapet beholdes separat. Historiske kamper fra før v2.48 får ikke automatisk rekonstruert spillerhendelser.
