# CM Mobile v2.88 — Kampkontekst i laguttak

## Endring

Laguttakssiden har nå et eget kampkort før taktikkinnstillingene. Det viser:

- turnering eller liga/divisjon
- hjemmelag og bortelag med klubbmerker
- runde eller turneringsfase
- kampdato fra spillets kalender
- om managerens lag spiller hjemme eller borte
- motstanderens valgte formasjon

Kilden er den eksisterende kommende ligaoppgjørslisten eller `pendingCupMatch`, avhengig av kampmodus. For europeisk ligafase og europeisk sluttspill vises egne fase-/rundeetiketter. Klubbnavn og dynamiske felt HTML-escapes.

## Kontroll

- JavaScript-syntaks kontrollert for begge innebygde scriptblokker med Node.js.
- Statisk kontroll bekreftet at turnering, runde, dato, hjemme-/bortestatus og assistentens kampplan fortsatt finnes i renderingen.
- Full visuell nettleser-/mobiltest er ikke bekreftet.
