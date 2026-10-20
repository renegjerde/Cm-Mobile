# Troppsrevisjon v2.67

## Formål
Rette en systematisk kildeprioriteringsfeil i PL- og Championship-troppene: når offisielle 2026/27-lister inneholdt færre enn 25 registrerte seniorspillere, fylte spillet resten med genererte, fiktive navn. I tillegg kunne gamle `REAL_ROSTERS`-grupper overstyre bedre posisjonsinformasjon.

## Endringer
- Premier League: offisiell registrert seniorliste brukes direkte; den blir ikke lenger fylt opp med genererte spillere.
- Championship og øvrige EFL-divisjoner med offisiell liste: listen brukes direkte, uten fiktiv utfylling.
- Posisjonsgruppe for PL-spillere prioriterer den eksplisitte rolle-mappingen og offline spillerprofil før historiske `REAL_ROSTERS`-grupper.
- Databaserevisjon bumpet til PLAYER_DB_VERSION 22 og EFL_DB_VERSION 14. Urørte preseason-karrierer bygges på nytt; karrierer som allerede har gått videre bevarer spillerstallene sine, i tråd med migreringslogikken.

## Kildegrunnlag
- Premier League, 2026/27 senior squad lists publisert 3. september 2026. Disse listene er offisielle registrerte seniorspillere, ikke nødvendigvis alle U21-spillere som er spilleberettiget.
- EFL, 2026/27 registered senior squad lists publisert september 2026.
- Innebygd offline Transfermarkt-profilarkiv og eksplisitte rolle-mappinger brukes kun til profil-/posisjonsberikelse, ikke til å fastslå ny klubbtildeling.

## Avgrensninger
- Offisielle seniorlister kan inneholde færre enn 25 navn. Det er nå med vilje synlig i spillet i stedet for å skjule manglende registrerte data med fiktive spillere. U21-spillere bør legges til fra offisielle U21-register separat i en senere oppdatering.
- Posisjonsgruppe er forbedret med tilgjengelige rolle- og profilkilder, men ikke alle spilleres detaljerte rolle/sideposisjon er verifisert manuelt.
- Pågående karrierer migreres ikke automatisk til ny navneliste hvis de allerede har spilt kamper eller gjort overganger, for å unngå å ødelegge karrierehistorikk. Start en ny karriere for å se alle roster-kildeendringer.
