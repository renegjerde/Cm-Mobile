# CM Mobile v3.41 — reparasjons- og testrapport

Dato: 26. oktober 2026

## Status

v3.41 har bestått automatiserte ende-til-ende-tester i Chromium for en hel ligasesong i alle fem spillbare divisjoner, samt en separat test av sesongskifte fra National League. Dette er ikke en garanti for at alle deler av spillet er feilfrie; cuper, økonomi, transfermarked, spillerutvikling, skader/karantener og lange karrierer trenger fortsatt egen funksjonell testing.

## Resultat fra helsesongtestene

| Karriere startet i | Lag | Ligakamper | Tabellkontroll | Lagring/lasting | JavaScript-feil |
|---|---:|---:|---|---|---:|
| Premier League | 20 | 380 / 380 | Bestått | CMZ2-rundtur bestått | 0 |
| Championship | 24 | 552 / 552 | Bestått | CMZ2-rundtur bestått | 0 |
| League One | 24 | 552 / 552 | Bestått | CMZ2-rundtur bestått | 0 |
| League Two | 24 | 552 / 552 | Bestått | CMZ2-rundtur bestått | 0 |
| National League | 24 | 552 / 552 | Bestått | CMZ2-rundtur bestått | 0 |

For hver runde ble kontrollert at alle lag hadde samme antall spilte kamper, at kamptall stemte med seire/uavgjort/tap, at poeng stemte med 3 poeng per seier og 1 per uavgjort, og at summerte mål for og imot var like. Alle fem kjøringer fullførte sesongen uten JavaScript-feil eller konsollfeil.

Testene brukte seeded/repeterbar tilfeldig generator for å kunne reprodusere hendelser; managerkampene hadde varierte resultater. Automatiseringen akselererte kampklokken og håndterte pause-/målfeiringer raskere enn normalt. Dette er en integritetstest av gjennomspillingen, ikke en balanseringsanalyse av målfordeling eller realisme.

## Sesongskifte og ligasystem

Separat integrasjonstest bestod følgende:

- Premier League-bakgrunnstabellen spilte 380 av 380 kamper; tabellresultater, mål og spillerstatistikk var konsistente.
- Gjentatt simulering av samme PL-runde var idempotent: antall spilte runder og kamper ble ikke telt dobbelt.
- PL-nedrykkslagene kom fra den faktiske PL-tabellen.
- Etter sesongskiftet hadde Premier League 20 klubber og Championship, League One, League Two og National League 24 hver.
- Alle 116 innenlandske klubber hadde entydig divisjonstilhørighet, managerklubben forble i riktig divisjon, preseason ble startet og tabellene ble nullstilt.
- Den nye sesongens PL-bakgrunn startet fra sesongåret 2027 og runde 1.

## Lagringsformat

Lagring bruker chunket `CMZ2`-format, der JSON-teksten deles i mindre UTF-8-blokker før komprimering. Etter hver helsesong ble den serialiserte lagringen dekodet igjen og kontrollert mot divisjon, tabellstørrelse, terminliste og spillerdata. Alle fem rundturstester bestod. Det gamle `CMZ1`-formatet støttes fortsatt ved innlasting.

## Kjente begrensninger / gjenstående testing

- Hele karrierer ble ikke testet gjennom flere påfølgende sesonger i alle fem divisjoner; sesongskiftet er separat integrasjonstestet fra National League.
- Playoff-format, cupfinaler, europeiske knockout-runder og alle økonomiske/transfer-scenarier er ikke ende-til-ende-verifisert i denne runden.
- Spillerstatistikk ble kontrollert for den simulerte PL-bakgrunnsligaen; full statistisk realisme for alle spillerprestasjoner er ikke godkjent.
- Testresultater gjelder Chromium-kjøretiden som ble brukt; test i vanlig nettleser på brukerens enhet anbefales før bredere bruk.

## Konklusjon

De fem grunnleggende ligasesongene, tabellregnskapet, CMZ2-lagringsrundturene og den separate sesongskiftetesten bestod. v3.41 er et betydelig bedre testet bygg for videre bruk. Det bør likevel ikke betegnes som fullstendig feilfritt før de resterende delsystemene og flere sesongskifter er testet.
