# CM Mobile v1.92

## Spillerdatabase: Premier League – førstegangs kvalitetsløft

Denne versjonen viderefører CM Mobile v1.91 og økonomisystemet derfra. Den oppgraderer spillerdatabasens innlasting, datakvalitetsmerking, rolleprofiler og bruk av referansedata.

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

## Teststatus for v1.92

- JavaScript pakket ut fra HTML og kontrollert med `node --check` – bestått.
- Chromium-sjekk med eksterne forespørsler blokkert: oppstart, oversikt og troppsside rendrer fra reservebasen – bestått, ingen JavaScript-sidefeil etter feilretting av logo-fallback.
- Chromium-sjekk med simulerte FPL- og Transfermarkt-svar: referansedata lastes, status viser runde og kilde, spillerstall bygges for 20 klubbkoder – bestått.
- Full live-henting fra FPL/GitHub ble ikke verifisert i nettlesertesten i dette miljøet, fordi nettverkstilgangen for den lokale testen er blokkert. Derfor skal ekte live-dekning kontrolleres i nettleseren etter utpakking før publisering.

## Pakkestruktur

```text
CM_Mobile_v1.92/
├── index.html
└── README.md
```
