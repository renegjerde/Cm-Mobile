# CM Mobile v2.89 — Turnering og runde på kampskjermen

## Endring
- Live-kampskjermen viser nå turnering/divisjon i et tydelig eget banner, og runde/fase vises som et eget merke ved LIVE-klokken.
- Vanlige ligakamper viser divisjonen og riktig lig Runde basert på kampobjektet, med aktiv spilluke som fallback.
- FA Cup og EFL Cup viser korrekt rundetekst, inkludert EFL Cup-semifinalens første kamp og returoppgjør.
- Europeiske ligafasekamper viser turneringen og «Ligafase · runde N» basert på kampmotorens konkurranserunde, ikke den nasjonale spilluken.
- Europeisk sluttspill viser turneringen, sluttspillfase og første kamp/returoppgjør; finalen vises som Finale.
- Cupkampens faseetiketter og turneringsnavn lagres også eksplisitt på live-engine metadata, der det er tilgjengelig.
- Ingen endring i scoring, kampresultater, spillerroller eller kampfrekvens.

## Kontroll
- JavaScript-syntaks kontrollert etter endringen.
- Statisk validering av liga-, FA Cup-, EFL Cup-, europeisk ligafase- og europeisk sluttspillmerking utført.
- ZIP-integritet kontrollert.
- Full nettleser-/sesongtest gjenstår.
