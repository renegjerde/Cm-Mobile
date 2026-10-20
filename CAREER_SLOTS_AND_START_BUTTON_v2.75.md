# CM Mobile v2.75 — karrierearkiv og gjenopprettet ny-karriere-knapp

## Endringer
- Gjeninnført en synlig «Start ny karriere»-knapp på oversikten. Den åpner eksisterende klubbvelger.
- Lagt til «Karrierer» i toppfeltet: viser lagrede karrierer, aktiv status, sesong, divisjon, fremdrift og sist lagret tidspunkt.
- Innført inntil fire parallelle karrierespor i samme nettleserprofil. Hvert spor har sin egen komprimerte lagring.
- Opprettelse av ny karriere lagrer først den aktive karrieren og lager deretter en ny lagrings-ID; den gamle karrieren skal ikke nullstilles/overskrives.
- Lagt inn en engangsimport fra tidligere `cmMobileSave` slik at eksisterende karrierer migreres til det nye systemet første gang. Den gamle nøkkelen brukes direkte som lagringsplass for den importerte karrieren, slik at spillet ikke må oppbevare to kopier av en stor karrieresparing.
- Karrierer kan byttes via «Karrierer» uten å starte spillet på nytt.
- Inaktive lagringer kan slettes fra karriereoversikten for å frigjøre én av de fire plassene. Den aktive lagringen må først byttes bort fra før den kan slettes.

## Kontrollert
- JavaScript-syntaks for innebygde scripts.
- ZIP-arkivintegritet.
- Statiske kontroller for eksisterende single-save-nøkkel, ny karriere-ID, gjenopprettingsknapp og slot-bytteflyt.

## Begrensninger / kommende arbeid
- Maks fire karrierer i samme nettleserprofil for å redusere risiko for å fylle nettleserens lokale lagring. Faktisk kapasitet avhenger av hvor mye data hver karriere har. Hvis nettleseren avviser skriving, varsles dette i lagre/bytte-flyten.
- «Start ny karriere» velger fortsatt klubb fra de fire engelske divisjonene som er spillbare i denne versjonen. Europeiske klubber er ikke ennå spillbare karrierestartere.
- Klubbmerker: Premier League har logo-URL-er, et utvalg europeiske lag bruker Football-Data.org-merker, og resten får initialbasert reserve. Full dekning med lokale logoaktiva er ikke løst i denne versjonen.
- Europeiske klubbspillere: koden har en liten kuratert navneliste for åtte store klubber og bruker et innebygd profilarkiv der nok profiler finnes; andre lag kan fortsatt få genererte plassholdere. En komplett, oppdatert og kildeverifisert 2026/27-spillerstall for alle europeiske klubber er ikke levert i denne versjonen. Dette må behandles som eget dataintegreringssteg og merkes tydelig der identitet/tilhørighet ikke er verifisert.
- Full ende-til-ende-test i mobilnettleser er ikke utført i dette miljøet.
