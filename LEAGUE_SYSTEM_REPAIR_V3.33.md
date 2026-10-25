# CM Mobile v3.33 — rapport om ligasystemet

Dato: 25. oktober 2026

## Formål

Rette strukturelle feil i klubbregisteret og divisjonstilhørighetene som kan gi feil klubbtelling, gale divisjonsplasseringer og blandede tabeller. Gamle karrierer prioriteres ikke foran en korrekt ny ligatilstand.

## Endringer i denne utgivelsen

1. **Kanonisk nasjonalt klubbregister for grunnsesongen 2026/27**
   - Registeret gjenopprettes med 20 Premier League-klubber og 24 klubber i hver av Championship, League One, League Two og National League.
   - Klubbenes plassering i den opprinnelige PL-indeksdelen bevares i grunnregisteret, mens klubbobjekter for nedre divisjoner legges til etterpå.
   - Duplikater og utdaterte klubber fjernes fra den nasjonale divisjonsmodellen; klubber som ikke lenger hører hjemme i divisjonene blir ikke automatisk merket Premier League.

2. **Sesongtilhørighet per karriere**
   - Gjeldende PL-medlemskap og EFL-medlemskap lagres som øyeblikksbilder i karrieredataene.
   - Ved ny innlasting kan medlemskapet gjenopprettes fra karrierens snapshots i stedet for å bli overskrevet av gamle tabellrader.
   - Klubbenes divisjonsfelt synkroniseres mot medlemslistene, inkludert nylig opprykkede klubber fra regionalt nivå.

3. **Migrering av eldre eller korrupte ligatilstander**
   - En eldre lagring uten nytt skjemaversjonsfelt blir gjenkjent.
   - Ligamodellen tilbakestilles til en ren 2026/27-start, med managerklubben beholdt når den finnes i grunnregisteret og korrekt divisjon bestemt fra klubbnavnet.
   - Kamptelling, tabell, terminliste og konkurransedata fra den gamle sesongen nullstilles i denne migreringsbanen. Det er tilsiktet: korrupt ligadata blir ikke videreført som om det var pålitelig.

4. **Sesongskifte**
   - Etter opp-/nedrykksberegningen synkroniseres medlemslistene med klubbobjektene igjen.
   - Klubbtellingene valideres gjennom at de fem nasjonale divisjonene skal inneholde henholdsvis 20, 24, 24, 24 og 24 klubber.

## Automatiske tester kjørt

### Syntaks

Begge JavaScript-blokkene i `index.html` består `node --check`.

### Klubbregister

- 116 nasjonale klubboppføringer i grunnregisteret.
- 116 unike klubbnavn i divisjonsregisteret; ingen duplikater i testens kanoniske klubbnøkler.
- Ingen feil i divisjonstall eller medlemskap i grunnregisterauditten.

### Terminlister

| Divisjon | Klubber | Runder | Kamper | Resultat |
|---|---:|---:|---:|---|
| Premier League | 20 | 38 | 380 | Bestått |
| Championship | 24 | 46 | 552 | Bestått |
| League One | 24 | 46 | 552 | Bestått |
| League Two | 24 | 46 | 552 | Bestått |
| National League | 24 | 46 | 552 | Bestått |

Testen verifiserer at hvert lag forekommer én gang per runde og at hvert hjemme-/borteoppgjør forekommer nøyaktig én gang. Det samme ble kontrollert etter en simulert opp-/nedrykksendring.

### Sesongskifte og migrering

- Simulert opp-/nedrykk holder divisjonsstørrelsene på 20/24/24/24/24.
- Fire testklubber fra regionalt nivå legges inn i National League uten å gjøre dem til Premier League-klubber.
- Medlemskapssnapshot overlever den isolerte reload-testen.
- En simulert korrupt Birmingham City-lagring med feil PL-merking og 29 spilte kamper migreres til Championship, uke 1, null spilte kamper og 24 tomme tabellrader.

## Begrensninger — må ikke forveksles med full godkjenning

- En full ende-til-ende nettlesertest kunne ikke fullføres i dette miljøet; den headless nettleserprosessen hang før det kom en DOM-utskrift. Derfor er dette **ikke** en dokumentert full karrieregjennomspilling.
- Isolerte register- og terminlistetester beviser ikke at alle grensesnitt, kampsimuleringer, klubbøkonomi, spillerstaller, cupturneringer og europeiske turneringer fungerer sammen i en faktisk nettleserkarriere.
- Den neste godkjenningen må være en faktisk ny karriere, start i alle fem divisjoner, spillede serierunder, tabellsammenligning etter kamp, full sesong, opprykk/nedrykk og ny sesong. Feil som oppstår der må rettes før ligasystemet erklæres ferdig.
