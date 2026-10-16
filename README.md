# CM Mobile v1.43 — Opponent Management & Tactical AI

## Endringer
- Motstanderen gjennomfører automatiske bytter basert på kampkarakter, utholdenhet og tilgjengelige reserver.
- Begge lag følger grensen på fem innbyttere og tre byttevinduer for ordinære assistentbytter.
- Motstanderens taktikk og formasjon kan endres ut fra stilling, kampform og samlet utholdenhet.
- Ny innstilling for spillerens managerassistent:
  - **Manuell:** du styrer taktiske endringer.
  - **Hybrid:** assistenten viser taktikkforslag i hendelsesloggen.
  - **Assistent:** assistenten endrer formasjon og mentalitet automatisk.
- Automatisk taktisk vurdering ved 60., 70. og 80. minutt.
- Taktiske endringer og automatiske bytter vises i hendelsesloggen med lagtilhørighet.

## Publisering
Pakk ut ZIP-filen og last opp `cm_mobile_v1_43/index.html` som rotfilen `index.html` i `main`-grenen for GitHub Pages. README-en kan beholdes som dokumentasjon. `check.js` er ikke nødvendig i repoet.

## Kontroll
JavaScript-syntaks kontrollert med Node.js. Ingen full ende-til-ende-test i mobilnettleser er utført.
