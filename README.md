# CM Mobile v2.79 — Player Age Integrity

## Taktikk: fri baneplassering
- Startelleverens 11 spillere vises på en vertikal, mobiltilpasset fotballbane.
- Dra markører med touch eller mus. Posisjon lagres automatisk med karrieren.
- Når en spiller flyttes, avledes en taktisk rolle fra området på banen. Rollen brukes av den eksisterende kampmotoren.
- Trykk på markører for å åpne bytte-/rollepanelet; trykk på to spillere for å bytte startspillere.
- «Tilbakestill banen» fjerner den frie plasseringen og egendefinerte rolleoverstyringer.
- Enkelte lagbalansevarsler sjekker om markører står for tett eller om spillere er flyttet ut av grunnformasjonen.
- Formasjonsbytte, rotasjon og ny assistentanbefaling nullstiller fri plassering for å unngå at koordinater overføres til feil system.

## Publisering
Pakken har en versjonsmappe med `index.html`, `README.md` og endringsrapporter. GitHub Pages publiserer fra `main`-branchens rot dersom det er slik repoet ditt er satt opp; pakkens `CM_Mobile_v2.74/index.html` og live rotfil er to ulike steder.

## Teststatus
- JavaScript-syntaks kontrollert med Node.js.
- ZIP-integritet kontrollert.
- Utfører en Chromium-røyketest av start/karriere og taktikkvisningen der tilgjengelig; full sesong-/matchsimulering er ikke en komplett ende-til-ende-test.


## v2.75 — parallelle karrierer
- Gjeninnført knappen «Start ny karriere» på oversikten.
- Ny knapp «Karrierer» i toppfeltet lar deg åpne tidligere lagringer og bytte mellom dem.
- Opptil fire karrierer lagres separat i samme nettleserprofil. Inaktive karrierer kan slettes for å frigjøre plass. Eldre `cmMobileSave` importeres automatisk første gang og brukes videre som lagringsplass for den første karrieren, så oppgraderingen ikke dobler lagringsforbruket.
- Se `CAREER_SLOTS_AND_START_BUTTON_v2.75.md` for begrensninger og kontrollpunkter.


## v2.76 – europeiske spillerprofiler og klubbmerker
- Europeiske klubber med en eksplisitt kobling til den innebygde Transfermarkt-avledede profilbasen kan nå bruke faktiske spillerprofiler i europeiske kamper, i stedet for genererte plassholdere.
- Spillerutvalget begrenses til profiler som i datakilden var knyttet til klubbens navngitte kildeklubb; det velges inntil 18 spillere med dekning for keeper, forsvar, midtbane og angrep.
- Kildeøyeblikksbildet er datert 6. juli 2026. Klubbtilhørighet etter denne datoen er ikke kontrollert. Spillere er derfor merket som ekte profilnavn, men ikke som verifisert 2026/27-tropp.
- Utvidet klubbmerkeregisteret med flere stabile aliaser og kjente crest-ID-er. Klubber uten en kjent crest-ID bruker fortsatt den fargede initial-reserven; merkene hentes fra football-data.org på nett og er ikke alle pakket som lokale bildefiler.
- Eksisterende lagrede karrierer blir ikke overskrevet; endringen påvirker lag som bygges til europeiske kamper.


## v2.77 – PL first-team U21 roster fix
- Added first-team U21/prospect supplements alongside the Premier League senior register, including Kobbie Mainoo, Ayden Heaven, Leny Yoro and Shea Lacey at Manchester United.
- PL squads are no longer truncated at 25 after merging eligible U21 first-team players.
- The 3-8-8-6 target is treated as a preferred senior-squad shape, never as a reason to omit registered first-team youth.
- Database version bumped so untouched preseason careers rebuild. Progressed careers retain their established squad/history.


## v2.78 — player age integrity
- Fixed the root cause behind absurd ages such as JJ Gabriel at 30 and Gabriele Biancheri at 31: missing DOBs were previously converted into deterministic fictional ages and then persisted as if meaningful.
- Added verified DOB entries for a broad set of the PL first-team U21/prospect supplement; season ages are calculated as of 22 August 2026.
- Real named players without a verified date now show `Alder ikke verifisert`. A separate provisional model age is retained only for internal simulation calculations; it is not presented as a real age.
- Generated fictional identities can still use a consistent fictional age, but are flagged separately.
- Removed Biancheri from the Man Utd first-team U21 supplement because Manchester United announced his permanent move to FC Wacker Innsbruck; also removed several clearly outdated club assignments from the supplement and moved Tom Watson to Brighton.
- `PLAYER_DB_VERSION` bumped to 24. New careers rebuild the untouched preseason database; non-progressed migrations repair old fake-age values. Careers already in progress retain their squads but their displayed DOB-backed ages are repaired on load.
- Verification: JavaScript syntax, DOB-season-age checks, supplement audit, and ZIP integrity checked. Full-browser visual/season simulation testing remains incomplete.

### Ekstra kontroll v2.78

Isolert aldersmigreringstest bestod fem scenarioer, inkludert reparasjon av JJ Gabriel og Gabriele Biancheri, korrekt alder for Shea Lacey, ukjent alder for navngitte spillere uten verifisert DOB og fortsatt modellert alder for genererte identiteter. Se `PLAYER_AGE_INTEGRITY_v2.78.md` og `U21_AGE_AUDIT_v2.78.csv`. Full nettleser-/mobiltest og full sesongtest er ikke utført.


## v2.79 — Aldersmodell for alternativ virkelighet

- Ingen spiller i brukergrensesnittet vises med «Alder ikke verifisert».
- Når en kildebasert fødselsdato finnes, brukes den.
- Når DOB mangler, tildeles spilleren en fast, deterministisk simulert fødselsdato og konkret alder. U21-/førstelagstalenter får en aldersmodell i 16–21-intervallet; seniorer får en plausibel modellalder, med en noe eldre kurve for keepere.
- Simulerte fødselsdatoer følger spilleren ved overgang og gir normal aldring mellom sesonger. De merkes internt som modellerte, ikke kildeverifiserte.
- Eksisterende lagringer normaliseres ved oppstart; databasens versjoner er oppdatert slik at nye karrierer også får samme regel.
- Verktøy for spillerdiagnostikk viser nå kildebaserte kontra simulerte fødselsdatoer i stedet for å behandle manglende kildedata som manglende spillverden.

Kontrollert: JavaScript-syntaks og ZIP-integritet. En isolert test kjørte 1 992 spilleroppføringer fra PL-senior, PL U21 og EFL gjennom alderslogikken, og kontrollerte også kjent DOB, stabil dato ved overgang og aldring til neste sesong. Profiloppslag var stubbet i testen, så den verifiserer fallback-logikken – ikke alle virkelige profil- eller fødselsdata. Full visuell mobiltest/hel sesongsimulering gjenstår.
