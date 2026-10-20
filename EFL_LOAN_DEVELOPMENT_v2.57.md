# CM Mobile v2.57 – EFL-utlån, tilbakekalling og spillerutvikling

## Endringer
- Utvidet utlånsmottakere til alle registrerte klubber i Championship, League One og League Two.
- EFL-utlånte spillere plasseres i mottakerklubbens `eflPlayerDatabase`-stall. Dermed kan `lowerLeagueTeamPower` og `lowerLeagueMatchXI` bruke spilleren i automatiske kamper.
- EFL-kampstatistikk oppdateres både i divisjonens statistikkledger og på selve spillerobjektet (`apps`, `minutes`, `goals`, `assists`, `competitionStats`). Det gjør at karriereprofil og sesongutvikling får faktisk spilletid.
- Låneavtaler til EFL-klubber returneres automatisk på avtalt dato.
- Ny funksjon `recallLoan(id)` lar manageren hente hjem egne utlånte spillere i et åpent overgangsvindu, fra både PL- og EFL-mottakere. Tilbakekallingen arkiverer låneperiodens spillerstatistikk og registrerer en dato i spillkalenderen.
- Utlånsmottakere fra EFL bruker eksisterende spillkalender, lønnsfordeling og budsjettdata. Ingen eksterne API-er er lagt til.

## Validering
- JavaScript-syntaks kontrollert for alle inline-script-blokker med Node.js.
- ZIP-arkiv kontrollert med `unzip -t`.
- Kodegjennomgang bekreftet at mottaker EFL-klubb finnes i `EFL_DIVISIONS`, og at spiller flyttes fra moderklubbens aktive tropp til mottakerens EFL-stall.
- Begrensning: full nettleser- og helsesongtest er ikke gjennomført i denne leveransen. Simuleringen av EFL-kamper gir spillerstatistikk gjennom den eksisterende forenklede automatiske ligamodellen; dette er ikke en full live-match-motor for EFL.
