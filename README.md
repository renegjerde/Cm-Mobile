# CM Mobile v1.93

## Spillerdatabase: Premier League – førstegangs kvalitetsløft

Denne versjonen viderefører CM Mobile v1.92 med økonomisystem og spillerdata, og justerer sesongkalenderen og overgangsvinduene. Den oppgraderer spillerdatabasens innlasting, datakvalitetsmerking, rolleprofiler og bruk av referansedata.

### Hva som er endret

- Spillerbasen kan ved oppstart hente nåværende Premier League-spillere og sesongstatistikk fra Fantasy Premier League sitt offentlige `bootstrap-static`-endepunkt.
- Den forsøker å hente Transfermarkt-avledede spillerprofiler fra et offentlig tredjepartsdatasett: fødselsdato, registrert alder, detaljert posisjon, foretrukket fot, høyde, nasjonalitet og markedsverdi.
- De 20 Premier League-klubbene bygges fra gjeldende FPL-klubbtilhørighet når kildene er tilgjengelige. Spillutvalget begrenses til maksimalt 25 spillere per klubb og balanseres etter posisjonsgrupper. Utvalget rangeres med spilletid, starter, FPL-poeng og andre tilgjengelige indikatorer; det er derfor en spillstallmodell, ikke en fullstendig gjengivelse av hver klubbregistrering.
- Alder beregnes fra fødselsdato per 22. august 2026. Et eksisterende kuratert fødselsdatooppslag brukes først. Transfermarkt-datoer godtas når format-/alderskontrollen passer; en dato byttes ikke til dag/måned-rekkefølge med mindre alderskontrollen støtter byttet.
- Detaljert spillerrolle og naturlige posisjoner brukes for å forme attributter, inkludert ulike profiler for midtstopper, back, defensiv midtbane, sentral midtbane, offensiv midtbane, ving og spiss.
- Rating og attributter kombinerer eksisterende håndkuraterte ratinger, klubb-/posisjonsprofil, Transfermarkt-markedsverdi og FPL-statistikk der et minimum av spilletid finnes. Dette er CM Mobiles spillmodell, ikke offisielle ferdighetsvurderinger fra FPL eller Transfermarkt.
- Transfermarkt-markedsverdi brukes som grunnlag for spillerens startverdi der den finnes. Euroverdier omregnes med en fast modellfaktor på 0,844 til spillets pundbaserte økonomi. Dette er en omtrentlig, fast omregning, ikke en live valutakurs.
- Troppssiden viser om databasen er synkronisert fra FPL eller om spillet bruker den innebygde reservebasen, pluss dekning for fødselsdatoer, Transfermarkt-profilfelter og FPL-statistikk.
- Hvis referansekildene ikke kan lastes, starter spillet med den innebygde reservebasen. Hvis en eksisterende karriere tidligere ble bygget fra reservebasen og en FPL-synkronisering senere blir tilgjengelig, oppdateres spillerbasen én gang til den synkroniserte kilden. Spillerkarrierestatistikk for navn som fortsatt matcher forsøkes bevart.
- Feil ved lasting av klubbmerker i oversiktskortet gir nå en trygg tekstfallback.

## Kilder og aktualitet

- Fantasy Premier League API: <https://fantasy.premierleague.com/api/bootstrap-static/>. Dette er kilden til den løpende FPL-spillerlisten og aktuelle sesongtall når spillet har internettilgang.
- Transfermarkt-avledet tredjepartsdatasett: <https://github.com/Samoilov2004/premier_league_dataset>. Datasettet dokumenterer felter for spiller, posisjon, fødselsdato, alder, nasjonalitet, høyde, foretrukket fot og markedsverdi. Sesong-2026-snapshoten som denne versjonen peker på, har eksempler på oppdateringstidspunkt 24. juli 2026. Det er ikke en offisiell live-API fra Transfermarkt, og noen sommeroverganger kan derfor mangle i profildataene.
- Premier Leagues offisielle tropps-/draktnummeroversikt for 2026/27: <https://www.premierleague.com/en/news/4725682/all-20-premier-league-clubs-squad-numbers-for-202627-season>. Denne kan brukes til manuell kontroll av troppslisten.
- ECBs euroreferansekurser: <https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-gbp.pl.html>. Den faste modellfaktoren 0,844 ligger nær EUR/GBP-referansen 0,84385 publisert 16. oktober 2026, men oppdateres ikke automatisk.

## Kjente begrensninger – må ikke overses

- Dette er første kvalitetstrinn for Premier League-databasen, ikke en fullstendig verifisering av samtlige spillere i alle engelske og europeiske divisjoner.
- Kildedataene er eksterne og krever internettilgang ved synkronisering. Dersom nettleseren eller en kilde blokkerer forespørselen, brukes reservebasen; varselet i troppssiden skal vise det.
- Noen Transfermarkt-profiler kan ikke kobles sikkert til en FPL-post på grunn av navn, aksenter, alias eller overganger. Spillere uten verifiserbar fødselsdato kan fortsatt få en kuratert eller modellert alder, noe statusfeltet synliggjør.
- En tredjepartsprofil kan ha feil eller tvetydig fødselsdato. Automatisk korreksjon er derfor konservativ: hvis aldersdata ikke kan avgjøre hvilken dato som er riktig, markeres datoen ikke som verifisert av denne regelen.
- FPL-tallene er sesongprestasjoner. Tidlig i sesongen kan få spilte minutter gi et svakt statistisk grunnlag. Spillmotoren reduserer derfor utslaget ved lavt spilleutvalg.
- Markedsverdi er ikke det samme som ferdighetsrating, faktisk overgangssum eller lønn. Lønn og potensial er fortsatt modellestimater.
- Overgangen fra en tidligere versjon bygger om spillerstallene i en eksisterende karriere. Kampstatistikk på spillere med eksakt navnetreff forsøkes bevart; eventuelle endringer i skrivemåte kan gjøre at statistikken ikke kan knyttes sikkert til en ny oppføring.

## Teststatus for v1.93

- JavaScript pakket ut fra HTML og kontrollert med `node --check` – bestått.
- Chromium-headless-smoketest for denne kalenderoppdateringen forsøkt, men prosessen timet ut i miljøet. Derfor er full visuell/browser-verifisering av v1.93 ikke bekreftet.
- Kontroll av kampuker med statisk validering: 8/8/6 UEFA-ligafaseuker i stigende rekkefølge, sju Carabao Cup-steg, åtte FA Cup-steg; Carabao Cup-slots kolliderer ikke med UEFA-ligafaseslottene.
- Full live-henting fra FPL/GitHub ble ikke verifisert i dette miljøet. Kontroller ekte live-dekning og den visuelle kalenderen i nettleseren etter utpakking før publisering.

## Pakkestruktur

```text
CM_Mobile_v1.93/
├── index.html
└── README.md
```

## Sesongkalender og overgangsvinduer (v1.93)

- Oppdaterte gameweek-slottene for Champions League, Europa League og Conference League slik at ligafasene ligger nærmere de offisielle datoene for 2026/27, fra september/oktober til siste kampdag i januar.
- FA Cup-rundene er flyttet nærmere offisielle rundehelger: november, desember, januar, februar, mars, april og finalen i mai.
- Carabao Cup-rundene er flyttet nærmere den offisielle tidslinjen. Modellen bruker fortsatt én kamp per runde, slik at semifinalens to offisielle oppgjør ikke er fullstendig modellert.
- Europeiske PL-klubber merkes som europeisk kvalifiserte i Carabao Cup. Det betyr at de ikke blir lagt inn i de tidlige rundene, i tråd med cupens 2026/27 inngangsregler.
- Tidlige hjemlige cuprunder kan nå simuleres automatisk når brukerklubben ennå ikke har kommet inn i den turneringen, uten å overskrive en ventende europacupkamp.
- Overgangsvinduer er endret fra GW 1–4 og GW 20–24 til GW 1–2 og GW 19–23. Dette følger bedre at sommerfristen er 1. september 2026 og vintervinduet åpner 1. januar og stenger 1. februar 2027. Markedet viser de faktiske vindusdatoene, men selve tillatelsen styres fortsatt av gameweek-slotter, ikke klokkeslett og kalenderdato.
- Eksisterende karrierer får nye planlagte kampuker uten å nullstille allerede spilte europacupresultater eller tabeller. Eventuelle kampdager som allerede er passert, flyttes til neste ledige gameweek for at sesongen ikke skal låse seg.

## Viktig begrensning i kalendermodellen

Spillet har fremdeles gameweek-baserte ankere, ikke en full dato-for-dato-fixtureengine. Europa-knockoutfasen startes fra turneringsvisningen, og returkampene i tobeinte oppgjør spilles fortsatt umiddelbart etter første kamp i stedet for på hver sin offisielle dato. Carabao Cup-semifinalen er også forenklet til én simuleringsrunde. Liga- og cupkampene spilles fortsatt som sekvensielle hendelser etter en gameweek, og erstatter ikke automatisk en ligakamp på den offisielle cuphelgen. Derfor er dette et tydelig kalenderløft, men ikke en full garanti for at hver knockoutkamp har korrekt faktisk dato. Dette er neste nødvendige kalenderjobb før vi kan si at hele sesongen er tidsmessig realistisk.

## Verifisering av v1.93

- JavaScript-syntakskontroll med `node --check`.
- Kontroll av at hver UEFA-ligafase har riktig antall planlagte kampuker (8/8/6), og at Carabao Cup-slottene ligger utenfor UEFA-ligafaseslottene. FA Cup Round Two faller på samme modellslot som UEFA Matchday 6, men Premier League-klubber er ennå ikke med i FA Cupen på det tidspunktet; tidlige cup-runder kan derfor simuleres uten å overskrive brukerens ventende europacupkamp.
- Kontrollen av datoer bygger på offisielle Premier League-, EFL-, FA- og UEFA-kunngjøringer. Eksakte TV-flyttinger og individuelle klubbkamper er ikke simulert.
