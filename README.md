# CM Mobile v3.62 – UEFA Champions League List A

## Hva er nytt i v3.62

### Europeiske spillerstaller
- Innebygd offisiell UEFA Champions League 2026/27 List A-snapshot for **31 ikke-engelske klubber**.
- **730 registrerte List A-navn** fordelt på de 31 klubbene. Hver klubb har 21–25 registreringer i snapshotet.
- De fem engelske Champions League-klubbene bruker de eksisterende offisielle engelske 2026/27-registrene.
- UEFA List B er ikke importert. Den er dynamisk og kan oppdateres fram mot hver kamp; klubbakademiene håndterer juniorsystemet i spillet.
- UEFA-stallene bygges offline og trenger ikke nettforbindelse ved spillstart.

### Redusert bruk av genererte seniorstaller
- Den offisielle List A-listen forsøkes før spillet lager en fiktiv cup-only-stall.
- Eksisterende karrierer migreres bare når en europeisk stall tydelig består utelukkende av urørte, opprinnelig genererte cup-only-spillere.
- Staller med kampstatistikk eller registrerte overganger erstattes ikke automatisk. Dette beskytter spillhistorikk og lagrede karrierer.
- UEFA List A-stallen deles mellom kampoppsett og overgangsregister, slik at spillere ikke får to konkurrerende klubbstaller.
- Ingen synlige markeringer av genererte spillere er lagt til.

### Beholdt fra v3.61
- Rivalakademier har mål på to juniorer per klubb; egen klubb beholder 25 plasser.
- Juniorer fylles ved sesongbehandling, ikke fortløpende midt i sesongen.
- Spillere som blir liggende usignert i fri transfer, fjernes etter én hel sesong.
- Spillere som frigis ved sesongslutt, får hele den kommende sesongen.
- Eksisterende identitetskontroller og Supabase-synkronisering er beholdt.

## Datakilde og avgrensning
- UEFA Champions League 2026/27 offisielle squad-/List A-sider, kontrollert 14. november 2026.
- UEFA sine squad-changes-sider fører endringer i List A; List B kan registreres og endres før hver kamp.
- UEFA opplyser selv at sidene er en praktisk informasjonskilde uten bindende virkning eller garanti for fullstendighet; klubben har selv ansvar for å bekrefte registreringen. Snapshotet er derfor datostemplet og bør ikke behandles som et permanent, juridisk register.
- 31 ikke-engelske klubber er dekket her. Fem engelske UCL-klubber dekkes via de eksisterende offisielle engelske registrene.
- Europa League og Conference League er **ikke** importert i denne versjonen. De gjenstår som neste datainnhentingsfase.
- Den innebygde spillerprofilbasen er fortsatt et historisk referansearkiv fra 6. juli 2026 for ferdigheter, potensial og modellert spillerdata. Den brukes ikke alene som bevis på aktuell klubbtilhørighet.

## Publisering
1. Ta sikkerhetskopi av gjeldende `index.html` og karrieredata.
2. Erstatt `index.html` i rotmappen i GitHub-repositoriet med filen fra denne pakken.
3. Behold eksisterende Supabase-oppsett; `supabase_cm_mobile.sql` er uendret og følger kun som referanse.
4. Vent til GitHub Pages/deploy er ferdig, og last appen på nytt.
5. Kontroller at versjonsmerket viser **v3.62**.

## Teststatus
- 31/31 ikke-engelske Champions League-klubber har en List A-liste i snapshotet.
- 730/730 List A-navn lastes; 21–25 spillere per klubb.
- Ingen navnekollisjoner på tvers av de 31 UEFA-listene.
- Ingen eksakte normaliserte navneoverlapp mot de innebygde PL-, PL U21- og EFL-listene; sterke ID-/fødselsdatakontroller gjelder fortsatt ved faktisk identitetsmatch.
- Runtime-test av listebygger, metadata, aliaser, unike ID-er og sesongavgrensning bestått.
- Alle innebygde JavaScript-skript syntakskontrollert med Node.js.
- ZIP-integritet kontrollert etter pakking.
- Live-test av Supabase Auth og skylagring krever brukerens Supabase-prosjekt.
