# CM Mobile v2.61 – oppstartsreparasjon

## Feil funnet

Versjonene v2.32–v2.60 manglet funksjonsdefinisjonene `clubDivision`, `activeLeagueClubIndices` og `activeLeagueClubs`, samtidig som resten av programmet fortsatt kalte dem. Den første bruken skjedde i `buildRealSquad()` under opprettelse av spillverdenen. I en nettleser betyr dette `ReferenceError: clubDivision is not defined`; JavaScript stopper før `render()` har satt hovedinnholdet inn i `#app`. Det forklarer den tomme midtdelen og at navigasjonsknappene ikke reagerer.

## Rettelse

- Gjeninnført de manglende funksjonene fra eldre versjon (v2.31).
- Gjeninnført `activeLeagueRoundCount` som del av samme hjelpeblokk.
- Oppdatert spillets aktive synlige versjonsmerking til v2.61.
- Ingen sletteoperasjoner eller endringer i nøkkelen `cmMobileSave` er lagt til.

## Validering

- Begge inline-script bestod `node --check`.
- Node-basert smoke-test med lette DOM-stubber fullførte `init()` og `render()` og bekreftet at `#app` fikk innhold. Dette er ikke en full nettlesertest og emulerer ikke iOS Safari.
- ZIP-integritet: kontrollert med `ZipFile.testzip()` etter pakking.
