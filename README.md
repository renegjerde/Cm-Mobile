# CM Mobile v3.61 – spillerdatabase og spillerflyt

## Endringer i v3.61

### Juniorakademier
- Rivalenes akademier har nå et mål på **2 spillere per klubb**, ned fra 4.
- Ved migrering av eksisterende karrierer beholdes de to mest lovende spillerne i hver rivalakademi (potensial, ferdighet og alder brukes som sortering).
- Managerens egen akademi beholder den eksisterende strukturen på 25 plasser (3 keepere, 8 forsvarere, 8 midtbanespillere og 6 angrepsspillere).
- Rivalakademiene fylles ved sesongoppdatering, ikke fortløpende midt i sesongen.
- Aldersregelen er beholdt: juniorer skal ikke bli værende etter fylte 18 år. Ved 19 år må de opp i seniorlaget eller frigis.
- Det er ikke lagt til noen synlig merking av genererte spillere.

### Fri transfer
- Spillere får et internt felt for sesongen de kom inn i fri transfer-systemet.
- En spiller som ikke blir signert i løpet av én hel sesong, fjernes ved neste sesongskifte.
- Spillere som frigis i løpet av en sesong, får den sesongen som inngangssesong.
- Spillere som frigis ved sesongslutt på grunn av kontraktsutløp eller overgang ut av juniorakademiet, får den nye sesongen som inngangssesong. Dermed blir de ikke slettet med én gang.
- Eksisterende karrierer fra eldre versjoner migreres skånsomt: spillere uten historisk inngangsdato får resten av inneværende sesong som frist.
- Signerte spillere fjernes fra fri transfer-listen som før.
- Den eksisterende aldersgrensen for pensjonering ved 37 år er beholdt.

### Øvrig
- Spilleridentitetsreglene og den engelske registreringskontrollen fra v3.60 er beholdt.
- Supabase-oppsettet fra v3.59 er uendret. `supabase_cm_mobile.sql` følger med for referanse; det er ikke nødvendig å kjøre SQL på nytt dersom oppsettet allerede er installert.

## Publisering
1. Ta sikkerhetskopi av gjeldende `index.html` og karrieredata.
2. Erstatt `index.html` i rotmappen i GitHub-repositoriet med filen fra denne pakken.
3. Behold eksisterende Supabase-oppsett. SQL-filen er uendret fra v3.59.
4. Vent til GitHub Pages/deploy er ferdig, og last appen på nytt.
5. Kontroller at versjonsmerket viser **v3.61**.

## Teststatus
- JavaScript-syntakskontroll: bestått for alle innebygde skript.
- Målrettede tester: 9 assertions bestått for akademi-migrering, akademitak, sesongopprykk/frigivelse og én-sesongs levetid i fri transfer.
- ZIP-integritet: kontrollert etter pakking.
- Live-test av Supabase Auth og skylagring krever brukerens Supabase-prosjekt.

## Avgrensning – europeiske UEFA-staller
Denne versjonen fullfører **ikke** importen av alle UEFA List A- og List B-troppene for Champions League, Europa League og Conference League. v3.60-rapportens forbehold om at den europeiske spillerbasen fortsatt bruker et eldre arkiv-/kurateringsgrunnlag, gjelder fortsatt. Det er bevisst ikke lagt inn en ufullstendig eller udokumentert UEFA-import.

Offisielle UEFA-sider som må brukes som datagrunnlag i neste rostrevisjon:
- Champions League 2026/27 squad changes (oppdatert 3. november 2026): https://www.uefa.com/uefachampionsleague/news/02a9-219e9aa80aca-6e098354bac0-1000--uefa-champions-league-2026-27-squad-changes/
- Europa League 2026/27 squad changes (oppdatert 5. november 2026): https://www.uefa.com/uefaeuropaleague/news/02a9-219ea169f22c-077a5eefec4c-1000--uefa-europa-league-2026-27-squad-changes/
- Conference League 2026/27 squad changes (oppdatert 4. november 2026): https://www.uefa.com/uefaconferenceleague/news/02a9-219ea726e84b-90ae2e85f779-1000--uefa-conference-league-2026-27-squad-changes/

UEFA opplyser at disse sidene fører List A-endringer og oppdateres på kampdager. List B kan registreres fram til dagen før den aktuelle kampen; derfor må en rosterimport datostemples og ikke behandles som et statisk, endelig register.
