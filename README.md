# CM Mobile v3.67 – Identity & Registration Integrity

## Publisering
1. Pakk ut ZIP-filen.
2. Erstatt `index.html` i rotmappen til GitHub-repositoriet.
3. Erstatt `VERSION.txt` med `v3.67`.
4. `supabase_cm_mobile.sql` er uendret fra tidligere versjoner og skal ikke kjøres på nytt dersom CM Mobile-tabellen allerede er opprettet.
5. Publiser og åpne spillet. Eksisterende karrierer kjører en engangsmigrering for identitets- og registreringsintegritet.

## Hva v3.67 retter
- Genererte/fiktive spilleridentiteter kan ikke lenger arve eller bruke Transfermarkt-ID-er, profiler eller profilbaserte posisjons-/markedsverdifelt.
- Profilmatch for genererte spillere blokkeres før eksternt profiloppslag. Genererte navn kan heller ikke hente inn kuraterte rating-/PA-verdier, FPL-statistikk eller navnebaserte posisjonsroller fra en ekte spiller med samme navn.
- Eksisterende genererte spillerregistreringer med uverifiserte eksterne identitetsfelt får fjernet disse referansene. Numerisk rating, potensial og attributtverdier overskrives ikke; registreringene flagges for senere ferdighetsrevisjon.
- Genererte spillere får en posisjonsrolle som samsvarer med sin lagrede posisjonsgruppe i stedet for en rolle som kan ha kommet fra en navnekollisjon i profilarkivet.
- UEFA-navneindeksen omfatter nå List A og List B, i tillegg til PL/EFL. Det hindrer at en spillerprofil fra en annen UEFA-klubb automatisk kobles til en navnebror.
- Benfica-oppføringene for Leonardo Lopes og Francisco Silva korrigeres klubbspesifikt med UEFA/Benfica-profilenes fødselsdato og posisjonsgruppe. Samtidige Sporting CP-/Gent-identiteter beholdes som egne spillere.
- Offisielle utlån for Claudio Echeverri (Manchester City → Benfica) og Georgie Gent (Barnsley → Boston United) merkes eksplisitt som utlån. De telles som gyldige utlånsoverlapp i identitetsrevisjonen, ikke som vanlige dubletter.
- Offisielle utlån kan ikke forlenges/tilbakekalles fra den generiske lånemenyen, og utlånte spillere kan ikke legges på overgangslisten eller brukes av moderklubben. Eksakte startdatoer legges ikke inn uten bekreftet kilde; Georgie Gents slutt er bare angitt som vinduet desember 2026.
- Registreringsrevisjonen teller nå alle sju materialiserte registre: `worldSquads`, `eflPlayerDatabase`, `europeanTransferSquads`, `cupOnlySquads`, `squad`, `freeAgents` og `youthAcademies`.

## Migrering og bevaring
- Engangsmigrering styres av `playerIdentityIntegrityVersion`.
- Migreringen rydder kun identitets- og profilreferanser for genererte spillere; den massejusterer ikke ferdigheter, rating eller potensial.
- De to navngitte UEFA-korreksjonene er avgrenset til den oppgitte klubben. Samme navn i andre klubber blir ikke slått sammen.
- Utlån lagres med eget `registeredLoanId`. Ukjent lånegebyr og lønnsfordeling forblir eksplisitt ukjent. I budsjettmodellen legges lønnskostnaden midlertidig hos moderklubben og ikke låneklubben for å unngå dobbel kostnadsføring; dette er ikke en påstand om den faktiske avtalen.
- `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json` er uendret. UEFA-listene oppdateres ikke automatisk.
- `supabase_cm_mobile.sql` er uendret.

## Hva som gjenstår etter v3.67
- De 112 genererte spillerregistreringene som tidligere bar uverifiserte Transfermarkt-ID-er, beholder sine eksisterende ratinger, attributter og potensial. Disse er flagget for neste ferdighets- og CA/PA-revisjon.
- Posisjoner og rolleprofiler for øvrige spillere må fortsatt vurderes mot individuelle kilder.
- Ferdigheter og potensial er fortsatt modellberegnet for store deler av databasen. v3.67 gjør ikke krav på å ha løst dette.

## Datakilder og avgrensning
- UEFA/Benfica-spilleroppføringer for Leonardo Lopes og Francisco Silva er korrigert etter de klubbspesifikke UEFA-/Benfica-oppføringene i november 2026.
- Manchester City → Benfica-utlånet for Claudio Echeverri og Barnsley → Boston United-utlånet for Georgie Gent er lagt inn som separate registreringsforhold.
- Eksisterende karrierer må åpnes i v3.67 før engangsmigreringen blir kjørt. Migreringen er kodebasert og lagres i den aktive karrieren ved normal lagring.
- Ingen live Supabase-karriere ble endret eller direkte testet i leveranseprosessen.
