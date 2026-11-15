# CM Mobile v3.68 – Player Quality Diagnostics

## Formål
v3.68 er et skrivebeskyttet diagnostikksteg for den videre ferdighets-, CA- og PA-revisjonen. Den retter ikke spillerattributter, rating, potensial, posisjoner eller klubbtilhørighet automatisk.

## Publisering
1. Pakk ut ZIP-filen.
2. Erstatt `index.html` i rotmappen til GitHub-repositoriet.
3. Erstatt `VERSION.txt` med `v3.68`.
4. `supabase_cm_mobile.sql` er uendret; ikke kjør SQL på nytt hvis tabellen allerede finnes.
5. Publiser og åpne den aktive karrieren. v3.68 inneholder v3.67-identitetsmigreringen; dersom den ikke er kjørt tidligere, kjøres den ved åpning. Lagre karrieren før eksport.
6. Gå til Spillerstall → Spillinformasjon og diagnostikk → Eksporter ferdighets- og CA/PA-revisjon (JSON).
7. Last opp `CM_Mobile_Player_Skill_CA_PA_Audit_YYYY-MM-DD.json` for videre analyse.

## Nytt i v3.68
- Utvidet spillerrevisjonseksport til schemaVersion 2.
- Eksporten viser `gameVersion: v3.68` (rettet feil versjonsmerking fra tidligere eksport).
- Hver spillerregistrering får et eget `audit`-objekt med CA, PA, PA-headroom, modellkilde, rollebasert ferdighetsindeks, avvik fra rating, spredning i rolle-relevante ferdigheter, posisjons-/rollekompatibilitet og konkrete revisjonssignaler.
- Sammendraget omfatter modellversjoner, fordelinger etter posisjonsgruppe, alder og register, samt teller for revisjonsflagg.
- Manglende versjonsmetadata på eldre free-agent- og academy-profilmodeller blir synliggjort uten å endre spillere.
- Eksporten omfatter fortsatt alle sju materialiserte registre og beholder registeroverlapp.

## Tolkning
- `rating` er spillets nåværende rating/CA-felt. `potential` er PA-feltet.
- `roleSkillIndex` bruker samme rollebaserte vekting som kampmotorens rolleutvelgelse. Den er kun en screeningsindikator og skal ikke forveksles med CA.
- `paHeadroom` er PA minus rating. Høy/lav margin er et kontrollsignal, ikke automatisk bevis på feil.
- `broad-position-role-conflict` er en grov kompatibilitetssjekk. Fleksible spillere og kildekonvensjoner må vurderes manuelt.
- `unusually-flat-role-profile` betyr standardavvik under 3 i de generelle utespillerattributtene (keepersammenlignes med keeperfeltene). Dette er et granskningssignal, ikke en feilklassifisering.
- All statistikk er per spillerregistrering. Samme spiller kan forekomme i flere registre, og eksportens antall registreringer er ikke antall unike personer.

## Bevaring og avgrensning
- Ingen karrieremigrering eller automatisk ferdighetsjustering legges til i v3.68.
- Ingen spillerdata blir endret av analyseeksporten.
- Den faktiske tilstanden etter v3.67-migreringen må bekreftes med en ny eksport fra brukerens aktive karriere. Tidligere v3.66-eksport er bare baseline og dokumentasjon, ikke bevis på at en aktiv save er migrert.
- Ingen live Supabase-save eller full kampmotortest er endret/kjørt i leveransen.
