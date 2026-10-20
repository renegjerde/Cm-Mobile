# CM Mobile v2.78 — spilleralder og identitetskontroll

## Problem funnet
I v2.77 fikk navn fra U21-tillegget uten kjent fødselsdato en stabil, men fiktiv alder fra intervallet 18–34. Den ble i tillegg lagret som et tilsynelatende fødselsår. Det ga blant annet JJ Gabriel 30 og Gabriele Biancheri 31. Dette var en systemfeil, ikke bare to feilregistreringer.

## Rettet oppførsel
- Databasen har nå en utvidet innebygd DOB-tabell for de navngitte unge førstelagsspillerne. Alderen regnes på nytt per sesongstart (22. august); DOB-er og klubbtilhørighet må fortsatt vurderes som separate datakvalitetsfelt.
- Når en navngitt spiller mangler en verifisert dato, står det `Alder ikke verifisert` i grensesnittet. En separat foreløpig modellalder brukes internt slik at utvikling/verdi-/simuleringslogikk ikke får NaN, men den omtales ikke som virkelig alder og det skapes ikke et falskt fødselsår.
- Fiktive, genererte identiteter kan fortsatt bruke modellert alder; disse flagges separat.
- Lagrede aldre som stammer fra den gamle fiktive fallbacken blir ikke lenger gjenbrukt for ekte navngitte spillere uten DOB.
- Ayyoub Bouaddi er fjernet fra Man City, Ibrahim Mbaye fra Aston Villa og Jobe Bellingham fra Sunderland som klart utdaterte klubbtildelinger. Tom Watson er flyttet fra Sunderland-tillegget til Brighton. Gabriele Biancheri beholdes i Man Utds U21-liste i denne sesongstartdatabasen fordi Premier Leagues offisielle 2026/27-liste fortsatt fører ham der; det finnes også nyere rapporter om overgang til FC Wacker Innsbruck, så klubbstatus må ses i lys av sesongstartdatoen 22. august. Klubbtilhørighet for hele listen må fortsatt gjennomgås videre.

## Kontrollerte eksempler (sesongstart 22.08.2026)
- JJ Gabriel — født 6. oktober 2010 → 15 år. Manchester United bekrefter fødselsdatoen på spillerprofilen.
- Gabriele Biancheri — født 18. september 2006 → 19 år ved sesongstart. UEFA/Premier League-profilene oppgir fødselsdatoen. Han beholdes i sesongstartens U21-supplement basert på Premier Leagues offisielle 2026/27-liste, selv om senere rapporter omtaler en overgang til Wacker Innsbruck.
- Shea Lacey — født 14. april 2007 → 19 år.
- Ayden Heaven — født 22. september 2006 → 19 år.
- Harry Amass — født 16. mars 2007 → 19 år.
- Jack og Tyler Fletcher — født 19. mars 2007 → 19 år.
- Leny Yoro — født 13. november 2005 → 20 år.
- Kobbie Mainoo — født 19. april 2005 → 21 år.

## Viktig avgrensning
Dette er ikke en erklæring om at alle Premier League-spilleres alder eller klubbtilhørighet nå er ferdig verifisert. CSV-filen viser datoene som nå brukes av spillet, sesongstartalder og tilgjengelig kilde/merknad. Der en spiller fortsatt mangler en støttet DOB utenfor dette supplementet, vises `Alder ikke verifisert`. Flere klubber må fremdeles gjennom en full troppsrevisjon.

## Kilder
- Manchester United — JJ Gabriel, fødselsdato: https://www.manutd.com/en/teams/under-18s-team/joseph-gabriel
- Manchester United — Shea Lacey: https://www.manutd.com/en/teams/mens-team/shea-lacey
- Premier League — Gabriele Biancheri, fødselsdato: https://www.premierleague.com/en/players/605862/gabriele-biancheri/career
- UEFA — Gabriele Biancheri: https://www.uefa.com/under21/teams/players/250172510--gabriele-biancheri/
- Manchester City — Nico O'Reilly: https://www.mancity.com/players/nico-oreilly/news
- Arsenal — Myles Lewis-Skelly: https://www.arsenal.com/fixtures/men/players/myles-lewis-skelly-aIsu57v3pDqR
- Chelsea — Geovany Quenda: https://www.chelseafc.com/en/teams/profile/geovany-quenda
- Chelsea — Josh Acheampong: https://www.chelseafc.com/en/teams/profile/josh-acheampong
- Liverpool — Rio Ngumoha background and age: https://www.liverpoolfc.com/news/rio-ngumoha-becomes-liverpools-second-youngest-debutant
- Manchester United — announcement of Biancheri move to Wacker Innsbruck is listed in club news: https://www.manutd.com/en/news

## Teststatus
- Isolert test av den faktiske `refreshPlayerAgeData`- og `playerAgeText`-logikken bestod fem tilfeller: gammel falsk alder for JJ Gabriel (30 → 15), Gabriele Biancheri (31 → 19), Shea Lacey (eldre falsk alder → 19), navngitt spiller uten DOB (viser `Alder ikke verifisert`), og generert fiktiv identitet (beholder modellalder).
- Inline JavaScript: Node syntax check passed.
- ZIP archive integrity: passed.
- Static checks: known DOB-to-season-age values and presence/absence of selected supplement names checked.
- No full UI/mobile browser test or complete 38-match season simulation was performed.
