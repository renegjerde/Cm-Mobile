# CM Mobile v2.55 — lån og kalenderdatoer

## Endringer
- Overgangsdatoer følger nå en fast kalender i spillverdenen.
- Innført kanonisk spillkalender: pre-season starter første mandag på eller etter 15. juni, og første ligauke starter første lørdag på eller etter 8. august i sesongens startår. Hver påfølgende runde er sju dager senere.
- Gamle poster med manglende dato eller et eldre datoflagg migreres til spillets faste kalenderdato ut fra sesong, fase og spilluke. Datoen er nå en dato i spillverdenen; den presenteres ikke som en usikker ekstern historisk opplysning.
- Lån inn fra en klubbtilknyttet spillerstall i et åpent overgangsvindu: 12 uker, 24 uker eller resten av sesongen.
- Låneavgift belaster managerens budsjett og krediteres moderklubbens overgangsbudsjett.
- Lån returneres automatisk når spillkalenderen når sluttdatoen. Overgangshistorikken får en «Lån avsluttet»-post.
- Karriere-ID beholdes, og statistikken fra låneoppholdet arkiveres som egen karriererad før sesongtallene nullstilles for videre spill hos moderklubben.

## Kontroller
- JavaScript-syntaks kontrolleres for alle innebygde skriptblokker.
- ZIP-integritet kontrolleres.
- Tekstkontroll bekrefter at overgangsprofilen viser datoer fra spillkalenderen.

## Avgrensning
Denne versjonen implementerer innlån til managerens klubb. Utlån fra managerens klubb til andre klubber, deling av lønn og forhandlinger om tilbakekall/forlengelse er ikke implementert ennå. Datoene er eksakte datoer i spillets egen kalender; de er ikke ment å rekonstruere historiske datoer i virkelige fotballsesonger.

- Isolert Node-test bestod for innlån, automatisk retur, overgangshistorikk og arkivering av låneperiodens statistikk.
