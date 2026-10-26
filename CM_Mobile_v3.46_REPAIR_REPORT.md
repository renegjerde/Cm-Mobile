# CM Mobile v3.46 — reparasjonsrapport

- Versjonsmerke, sidetittel og statuslinje er oppdatert konsekvent til v3.46.
- Engelsk logo-URL-regel er begrenset til de 92 klubbene i den registrerte 2026/27-kilden (Premier League + Championship + League One + League Two i basisdata). National League forsøker ikke lenger å bruke en kilde som ikke dekker divisjonen.
- Lagt inn `clubLogoCoverageAudit()` og `window.CM_MOBILE_LOGO_AUDIT` for å holde oversikt over klubber med URL-kilde og klubber som bruker generert SVG-reserve.
- Audit finner 251 normaliserte navneoppføringer: 92 engelske PNG-kilder, 37 football-data.org-ID-kilder og 122 oppføringer uten logo-kilde registrert. Alias/navnevarianter kan telles som separate oppføringer.
- Generert SVG er fortsatt reservesymbol. v3.46 gir derfor ikke ennå offisiell logo til alle klubber.
- Tester: `node --check` for begge inline-skript og isolert test av logo-kilde-/reserve-logikk. Ingen full nettleser- eller nettverkstest av alle bilder er utført.
