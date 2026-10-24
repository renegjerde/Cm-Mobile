# CM Mobile v3.14 — Touchline Edition

## Kampstart: reparasjon av tabellrader

- Synkroniserer ligatabellen med klubbene i aktiv divisjon før kampstart.
- Beholder registrerte tall for klubber som fortsatt finnes med samme navn.
- Oppretter manglende tabellrader uten at kampmotoren stopper med `Cannot read properties of undefined (reading 'p')`.
- Gjør resultatføringen defensiv slik at en manglende tabellrad kan opprettes i stedet for å krasje kampstarten.
- Avbryter tydelig dersom samme klubb feilaktig blir brukt på begge sider av samme resultat.
- Beholder tidligere kampstartkontroller fra v3.13 og øvrige funksjoner.

## Innhold
- `index.html` — komplett spill.
- `README.md` — denne filen.
- `MATCH_TABLE_FIX_V3.14.md` — teknisk endringsnotat og teststatus.

## Teststatus
- JavaScript-syntaks kontrollert med Node.js.
- ZIP-arkiv kontrollert med `unzip -t`.
- Full interaktiv test mot brukerens lagrede GitHub Pages-karriere er ikke mulig fra denne arbeidskopien.
