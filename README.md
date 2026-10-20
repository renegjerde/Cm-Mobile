# CM Mobile v2.46 — Touchline

## Hva er nytt
- Korrigert dupliserte spillernavn i innebygde 2026/27-lister: Joao Pedro ligger bare hos Chelsea, James Beadle bare hos Birmingham City i spillverdenen (Brighton har ham på lån), og Crawleys Jonny Russell er skilt fra Mansfield-spilleren Jon Russell (Jonathan Edward Russell).
- Spillerregisterets versjon er økt til 11, slik at en urørt preseason kan bruke oppdatert navneliste. Spilte/endrede karrierer skal beholde troppene sine.
- Lagt til en datakvalitetsrapport for alle 20 Premier League-klubbene og 72 EFL-klubbene, samt deterministiske tester av den automatiske lavere-divisjonsmotoren.
- Ingen eksterne runtime-API-er er lagt til. Spillet forblir offline-first.

## Datakvalitet og testbegrensninger
- De innebygde listene inneholder 459 PL-navn og 1 479 EFL-navn etter korrigeringene; eksakt duplisering på tvers av klubbene er fjernet.
- Det innebygde profilarkivet har historiske data. At en spillerprofil finnes, bekrefter ikke i seg selv aktuell klubbtilhørighet.
- Lavere divisjoner simuleres av `seededScore` ut fra klubbens styrketall, ikke av full spillertroppbasert kampmotor. Testene er deterministiske og dekker hele 46-kampers dobbel serie i hver 24-lagsdivisjon, men bruker de eksisterende genererte styrketallene. Korrelasjonen mellom styrketall og tabellplassering varierer derfor betydelig; rapporten dokumenterer dette som neste gameplay-forbedringsområde.
- Syntakskontroll, roster-integritetskontroll og deterministiske sesongtester er kjørt. Headless Chromium-oppstart ble forsøkt, men timed out under appinitialisering; den regnes derfor ikke som bestått.

## Innhold
- `index.html` — spillet
- `README.md`
- `ROSTER_AND_LOWER_LEAGUE_AUDIT_v2.44.md`
- `ROSTER_AND_LOWER_LEAGUE_VALIDATION_v2.44.json`
- Tidligere kalibreringsrapporter og roster-rapporter


## v2.45 – Klubbspesifikke styrkevurderinger
- Erstattet den smale hash-baserte styrkespredningen i de tre EFL-divisjonene med en eksplisitt, klubbspesifikk 2026/27-estimatliste.
- Ny karriere får styrkeverdier som varierer tydeligere mellom klubbene. Estimatene er spillbalansevurderinger, ikke offisielle eller verifiserte ratinger.
- Eksisterende aktive karrierer beholder styrkeverdiene sine; migrering skjer bare i urørt preseason.
- EFL-spillerregisterversjon er 11, slik at urørte preseason-karrierer bygger opp spillertroppene på nytt etter ratingoppdateringen.
- Ingen eksterne runtime-API-er.

- `LOWER_LEAGUE_STRENGTH_CALIBRATION_v2.45.md` — styrkevurderinger og sesongtest
- `LOWER_LEAGUE_STRENGTH_VALIDATION_v2.45.json` — maskinlesbare testresultater


## v2.46 – Spillertroppbasert lagstyrke
- Lagstyrken som brukes i kampberegninger beregnes nå fra tilgjengelige spillere, med en prioritert 4-4-2-balanse (keeper, forsvar, midtbane og angrep), kvaliteten på beste XI, benkedybde, keepernivå, relevante attributter og spillerens tilgjengelighet/formfaktor via fitness.
- For aktive karrierer brukes den faktiske managerstallen; for andre klubber prioriteres oppdatert world squad, deretter den innebygde EFL-spillerdatabasen og til slutt klubbens styrkeestimat.
- EFL-spillerregisteret er økt til versjon 12 for urørte preseason-karrierer. Eksisterende aktive sesonger skal ikke få troppene sine overskrevet.
- Dette påvirker beregninger som bruker `teamPower`; automatisk simulering av EFL-ligakampene bruker fortsatt den separate `seededScore`-modellen og er ikke fullstendig spillerbasert ennå.
- Ingen eksterne runtime-API-er er lagt til.

- `SQUAD_POWER_VALIDATION_v2.46.md` — validering av troppbasert lagstyrke.
- `SQUAD_POWER_VALIDATION_v2.46.json` — maskinlesbare testresultater.
