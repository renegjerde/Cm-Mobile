# CM Mobile v2.82 — skader og suspensjoner

## Hvorfor endringen var nødvendig

Den forrige skadeprofilen fordelte 72 % på én runde, 22 % på to og bare 6 % på tre–fire runder. Skader over tre uker var dermed nesten fraværende. I tillegg ble fravær redusert når taktikkskjermen ble åpnet, og direkte rødt kort ga alltid bare én kamps karantene. Cupkamper behandlet heller ikke røde kort som gjeldende karantene.

## Statistisk kalibrering

Premier Injuries sin nyeste komplette sesongoversikt for Premier League 2025/26 registrerer **553 tidstapsskader**, **18 261 fraværsdager**, **2 194 kamper ute**, ca. **27,7 skader per klubb**, gjennomsnittlig **33,0 dager per skade** og **3,97 kamper ute per skade**. Dette brukes som aggregert kalibreringspunkt, ikke som sannsynlighetstabell for hver skadeårsak. En tidstapsskade er her definert som en skade som gjør at spilleren mister minst én konkurransekamp. Tallene er sesongtotaler fra én liga, ikke en medisinsk fasit for en enkelt spiller.

Modellfordelingen under gir en vektet gjennomsnittlig varighet på **33,2 dager**, nær sesongtallet på 33 dager. Diagnosetypene og de enkelte intervallene er spillmodellering, ikke statistisk dokumenterte sannsynligheter for hver diagnose. Poenget er å bevare en troverdig blanding av korte fravær, flere ukers skadeavbrekk og sjeldne, sesongdefinerende skader.

## Skadefordeling i spillmodellen

| Type | Modellvekt | Varighet |
|---|---:|---:|
| Smell / støt | 20 % | 2–8 dager |
| Muskeloverbelastning | 15 % | 6–19 dager |
| Ankelovertråkk | 12 % | 10–30 dager |
| Hamstringskade | 15 % | 21–52 dager |
| Lyskeskade | 9 % | 14–35 dager |
| Kneskade | 8 % | 28–84 dager |
| Leggskade | 10 % | 14–35 dager |
| Brudd / leddbåndsskade | 5 % | 70–210 dager |
| Korsbåndsskade | 2 % | 180–300 dager |
| Fotskade | 4 % | 21–56 dager |

Antall kamper ute beregnes omtrent som én kamp per åtte kalenderdager og avrundes til nærmeste heltall, minimum én kamp. Det er en spilltilpasset konvertering fordi CM Mobile først og fremst simulerer runder/kamper, ikke den presise datoen for hver kamp.

## Frekvens og belastning

- Kampmotoren ga **0,899 skadehendelser per kamp** i en 5 000-kampstest på tvers av begge lag, før treningsepisoder. Individuell sannsynlighet justeres etter kondisjon, utholdenhet og taktisk belastning.
- I tillegg har hver klubb en **27 % grunnsjanse for én treningsskade per runde**, justert opp ved lav gjennomsnittskondisjon. Treningsskader kjøres maksimalt én gang per klubb/runde.
- Samlet er frekvensen kalibrert til omtrent **27–28 tidstapsskader per lag over 38 ligakamper** i en lang, balansert sesongmodell. Enkeltlag vil naturlig variere.
- Lav kondisjon, lav utholdenhet og stor kampbelastning øker vekten for hvem som skades. Keepere har lavere risiko i kamp.

Dette er en spillmodell basert på observerte sesongtotaler. Den forsøker ikke å gjenskape hver ekte spillers medisinske historikk.

## Karanteneregler

FA Handbook 2026/27 Section 9 oppgir blant annet følgende standardsanksjoner for relevante førstelagskamper:

- Fratakelse av en åpenbar målsjanse: 1 kamp.
- Alvorlig forseelse / serious foul play, eksempelvis en farlig takling: 3 kamper.
- Voldelig oppførsel: 3 kamper.
- Grovt / fornærmende språk: 2 kamper.
- Andre gule kort i samme kamp: 1 kamp.
- Spytting: 6 kamper.

Modellen gir direkte røde kort en forseelseskategori, i stedet for én generisk straff. Kampkarantenen starter etter at utvisningskampen er ferdig. En spiller får én ekstra kamp for hver tidligere utvisning i samme sesong. Flere karantener utløst i samme kamp legges etter hverandre i riktig rekkefølge.

Gule-kortgrensene er konkurransespesifikke: Premier League bruker 5 kort innen kamp 19, 10 innen kamp 32 og 15 ved sesongslutt. EFL-ligaene bruker 5 innen kamp 19, 10 innen kamp 37 og 15 før play-off-perioden. Cupgule kort legges ikke til ligagrensene; egen oppsamling for FA Cup-/EFL Cup-gule kort er ikke fullt simulert ennå. Røde kort kan gi karantene som gjelder i relevante innenlandske ligakamper og cuper.

## Håndtering av tilgjengelighet

- Skade- og karantenetellere går ned etter fullført konkurransekamp for spillerens lag – ikke når taktikkskjermen bare åpnes eller rendres.
- En skade eller karantene som oppstår i en kamp trekkes ikke ned av samme kamp.
- AI-klubbenes fravær lagres i de faktiske troppene deres og påvirker framtidige laguttak; motstandertroppene nullstiller ikke lenger skader/suspensjoner.
- Eksisterende lagringer beholder pågående fravær. Eldre lagringer migreres til den nye kampbaserte modellen.

## Teststatus

- 50 000 simulerte skader: gjennomsnitt **33,16 dager**, **50,4 %** varte lenger enn 21 dager, og **9,0 %** varte minst 70 dager. Disse prosentene er den implementerte spillprofilen, ikke rapporterte diagnosefrekvenser fra den virkelige ligaen.
- 5 000 simulerte kamper: **0,899 skader**, **0,112 røde kort** og **3,784 gule kort per kamp** på tvers av begge lag. For sammenligning registreres 44 røde og 1 423 gule kort i Premier League 2025/26 (omtrent 0,116 røde og 3,745 gule per kamp).
- Testet direkte rødt: alvorlig takling 3 kamper, voldelig oppførsel 3, åpenbar målsjanse 1, språkbruk 2, spytting 6 og andre gule 1. Gjentatt utvisning gir et ekstra kampfravær per tidligere utvisning i sesongen.
- Testet gule-kortgrenser i PL (kamp 32 vs. 33) og EFL (kamp 37 vs. 38), og at karantener fra samme kamp legges sammen.
- Verifisert at åpning/rendring av taktikkskjermen ikke reduserer fraværstellere, og at skade/kort fra simulerte kamper føres på riktig spiller-ID. Direkte rødt i live-håndteringen beholder karantenen på tre kamper, og kortstatistikken telles én gang.
- Fysisk iPhone-test og full sesongtest gjenstår. Cupspesifikke gule-kortkarantener er en kjent begrensning.

## Kilder

1. Premier Injuries, *2025–26 EPL Season Review: Analysis*: https://www.premierinjuries.com/article/2025-26-epl-season-review-analysis
2. The FA, *Handbook 2026/27 — Section 9 Disciplinary Regulations*, yellow-card cut-offs and standard sanctions tables: https://www.thefa.com/-/media/files/thefaportal/governance-docs/rules-of-the-association/2026-27/section-9---disciplinary-regulations.ashx
3. Premier League, *Which players are suspended or close to a ban?*: https://www.premierleague.com/en/news/4425344
4. My Football Facts, *Premier League Red and Yellow Cards by Season* (2025/26): https://www.myfootballfacts.com/premier-league/all-time-premier-league/discipline/all-time-premier-league-clubs-discipline-tables/
