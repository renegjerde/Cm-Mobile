# Europacupkalender – helsesongsimulering v2.64

## Testresultat

**Bestått: 4 av 4 simuleringer, uten avvik.** Testen bruker produksjonsfunksjonene for kalender, rundestart, utslagskamp, kampresultatføring, rundeavslutning og managerstyrt kampavslutning. Kampresultatene genereres deterministisk i testharnessen, slik at tidsplanen kan testes reproducerbart.

| Scenario | Manager i europacup | Sesonglengde | Finaluke | Resultat |
|---|---|---:|---:|---|
| Premier League | Nei (AI-kamper) | 38 uker | 38 | Bestått |
| EFL | Nei (AI-kamper) | 46 uker | 46 | Bestått |
| Premier League | Champions League | 38 uker | 38 | Bestått |
| EFL | Champions League-testflyt | 46 uker | 46 | Bestått |

## Kalender

| Trinn | Første kamp | Retur/finale | Kamper per turnering |
|---|---:|---:|---:|
| Playoff | 24 | 25 | 16 |
| Åttedelsfinaler | 27 | 28 | 16 |
| Kvartfinaler | 30 | 31 | 8 |
| Semifinaler | 33 | 34 | 4 |
| Finale – Premier League-karriere | – | 38 | 1 |
| Finale – EFL-karriere | – | 46 | 1 |

Hver turnering endte med 45 utslagskamper: 16 playoffkamper, 16 åttedelsfinalekamper, 8 kvartfinalekamper, 4 semifinalekamper og én finale. Alle tre turneringene ble fullført i alle fire scenarioene. Ingen doble stage/tie/leg-poster ble funnet. I testene der manageren deltok i Champions League, ble alle ni managerstyrte utslagskamper fullført, og kampene ble lagret under riktig planlagt spilluke selv om managerkampen ble avsluttet etter at uketelleren flyttet seg videre.

## Hvordan tidsplanen virker

- Ligafasens siste kampuke oppretter neste utslagsrunde, men spiller ikke en kamp.
- Første- og returoppgjør startes bare av den ukentlige kalenderkontrollen.
- Hvis en annen managerstyrt cupkamp står som ventende, kan opprettelsen av neste runde vente til neste ukekontroll; dette skjer fortsatt før den planlagte første kampuken.
- Finalen legges etter managerens siste hjemlige ligarunde: uke 38 for Premier League og uke 46 for EFL-karrierer.

## Testomfang og begrensninger

Dette er en Node-basert isolert integrasjonssimulering av de relevante produksjonsfunksjonene over 38- og 46-ukers sesonger. Resultatene er deterministiske testresultater; den faktiske kampmotorens scoremodell ble erstattet med en kontrollert resultatsubstitutt i testen. Testen bekrefter derfor tidsstyring, rundeprogresjon, resultatregistrering og managerens pending-kampflyt, men er ikke en full visuell nettlesertest eller en simulering av alle faktiske kampmotorberegninger på iPhone. Spilluker er en forenklet spillkalender, ikke eksakte ISO-datoer.
