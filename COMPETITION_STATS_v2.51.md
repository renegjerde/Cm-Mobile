# CM Mobile v2.51 — validering av konkurransestatistikk

## Endring
Spillerprofiler beholder eksisterende samlede sesongfelt og får i tillegg `competitionStats[competition]` med `apps`, `minutes`, `goals`, `assists`, `yellowCards`, `redCards` og `chancesCreated`.

## Tilkoblingspunkter
- Automatisk hovedliga: konkurransen fra klubbens divisjon.
- Automatisk cup-/europakamp: konkurransen som sendes til `simulateCompetitionMatch`.
- Automatiske EFL-ligakamper: divisjonsnøkkel på statistikkraden.
- Managerens live-kamper: `engine.competition` for cup/europa, ellers klubbens divisjon.
- Spillerstatistikkvisning: konkurransefilter og statistikkmåling.
- Sesongskifte: nullstiller `competitionStats` sammen med samlede sesongfelt.

## Begrensninger
- Tall fra kamper som ble spilt før denne versjonen, kan ikke rekonstrueres per konkurranse.
- Historiske lagringer kan inneholde samlede statistikker uten konkurranseoppsplitting. Filteret viser derfor bare statistikk som er registrert etter migreringen.
- Ingen full nettleser-/karrieretest hevdes i denne rapporten.
