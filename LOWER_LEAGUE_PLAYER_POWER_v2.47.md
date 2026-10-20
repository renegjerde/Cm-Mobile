# CM Mobile v2.47 – spillerbasert EFL-simulering

## Endring
Automatiske ligakamper i Championship, League One og League Two henter nå hver klubs innebygde EFL-spillerstall (`appState.eflPlayerDatabase[divisjon][klubb]`) og beregner lagstyrken med den samme `calculateRosterPower()`-funksjonen som brukes av øvrige lagstyrkeberegninger. Resultatgeneratoren er fremdeles `seededScore`, slik at kamper fortsatt kan gjenskapes deterministisk.

## Hva betyr det?
- Den statiske klubbratingen brukes ikke lenger direkte for lag som har en spillerstall.
- Beste XI, posisjonsbalanse, keepernivå, attributter, fitness og tilgjengelighet som inngår i `calculateRosterPower()` påvirker nå styrken inn i automatiske EFL-resultater.
- Klubbratingen brukes kun som fallback hvis spillerstall mangler.
- Ingen eksterne kall eller nettavhengighet er lagt til.

## Validering
- Bekreftet at den automatiske EFL-runden beregner `powerA` og `powerB` via `lowerLeagueTeamPower()` før `seededScore()`.
- Bekreftet at helperen først slår opp innebygd roster på divisjon og klubbnavn, og har en styrke-fallback for manglende roster.
- Bekreftet at `simulateLowerLeaguesThroughRound()` fortsatt oppdaterer tabellen via `addGenericResult()` og beholder deterministisk seed per sesong, divisjon, runde og kamp.
- JavaScript-syntaks kontrollert med Node for inline-scriptblokkene.
- ZIP-integritet kontrollert.

## Begrensninger
Dette er en statisk kode- og integrasjonskontroll, ikke en full nettleserbasert sesongtest. EFL-resultatene er fremdeles generert av en forenklet målmodell; individuell kampkommentar, skudd, målscorere og hendelser blir ikke simulert for hver automatisk kamp. Roster-dataenes nøyaktighet varierer, og den innebygde databasen har en blanding av navnebaserte virkelige spillere og genererte profiler.
