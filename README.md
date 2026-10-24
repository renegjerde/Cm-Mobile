# CM Mobile v3.21 — Touchline Edition

## Endringer i v3.21

- Reparasjon av en ufullstendig 2026/27 FA Cup-deltakerliste når turneringen ennå ikke har noen spilte kamper. Baseline er 124 deltakere.
- Reparasjon av rapportert Carabao Cup-avvik før tredje runde: 60 ferdigspilte kamper og 31 lag i den lagrede listen. Basert på v3.21-formatet skal status etter tre trinn være 60 spilte kamper og 32 lag i feltet. Den manglende deltakeren gjenopprettes fra resultatvinnerne og de ni senere inntrådte PL-klubbene; den uspillede trekningen bygges på nytt. Tidligere resultater endres ikke.
- Cupens «kamper spilt»-tall teller unike faktiske kamper, og utelater BYE-rader og dupliserte resultatlinjer.
- Cup- og europacupkamper vises som neste kamp på oversikten. Kampforberedelsen fjernes fra den separate «Viktige meldinger»-listen for å unngå dobbeltføring.
- Kampens sluttknapp sender cup- og europacupkamper tilbake til Oversikt, på samme måte som en vanlig ligakamp, i stedet for å sende brukeren til konkurransesiden.
- Oversiktens primærknapp og statuslinje bruker nå samme kampdagsspråk for serie, cup og Europa.

## Publisering på GitHub Pages

Pakk ut ZIP-filen, og erstatt `index.html` i rotmappen på `main`-grenen med `index.html` fra `CM_Mobile_v3.21/`. ZIP-arkivet i seg selv publiserer ikke nettsiden.

## Validering

- JavaScript-syntaks kontrollert med Node.js.
- Isolert migreringstest: FA Cup 121 → 124 uten spilte resultater å overskrive.
- Isolert migreringstest: Carabao Cup 31 → 32, med 60 tidligere kamper bevart og uspilt runde trukket på nytt.
- ZIP-arkivet kontrollert.
- Full nettlesertest med den faktiske brukerkarrieren er ikke utført.
