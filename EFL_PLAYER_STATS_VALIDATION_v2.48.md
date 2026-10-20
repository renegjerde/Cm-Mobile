# CM Mobile v2.48 — EFL-spillerstatistikk og hendelseslogg

## Endring
Automatiske kamper i Championship, League One og League Two registrerer nå opptredener for valgt XI, mål, assists og målhendelser. Resultatgeneratoren er beholdt fra v2.47; scorere/assists trekkes deterministisk fra lagets XI med en posisjons- og ratingvektet fordeling.

## Kontrollert
- `recordLowerLeagueMatch` oppdaterer statistikk per spiller og kampens målhendelser.
- EFL-tabellen viser topp 10 målscorere i valgt divisjon når mål er registrert.
- Den samlede spillerstatistikken inkluderer EFL-spillere med minst én opptreden.
- Matchloggen begrenses til 160 kamper per divisjon; sesongens spillerstatistikk beholdes.
- EFL DB-versjon økt fra 12 til 13 for å oppdatere urørt preseason, mens eksisterende karrierer ikke tvinges til å overskrive troppene.

## Begrensninger
- Resultatet beregnes først med `seededScore`; målscorer og assist genereres etterpå. Det er ikke en full simulering av individuelle avslutninger, keeperredninger, kort, skader eller taktiske hendelser for hver EFL-kamp.
- Scorerstatistikk for tidligere runder som allerede var spilt før v2.48 kan ikke rekonstrueres automatisk.
- Full nettlesertest er ikke bekreftet her.
