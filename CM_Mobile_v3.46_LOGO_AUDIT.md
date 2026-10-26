# CM Mobile v3.46 — klubblogo-revisjon

## Resultat

Audit av logo-kildene som er koblet inn i v3.45-koden fant **251 normaliserte klubbnavn** på tvers av liga-, europacup- og klubbpoolene. Dette er antall normaliserte oppføringer, ikke garantert antall distinkte virkelige klubber; aliaser og navnevarianter kan telles separat.

| Kildestatus i koden | Antall | Hva dette betyr |
|---|---:|---|
| Engelsk PL/EFL-PNG-kilde | 92 | Har URL-regel mot `gmorison-aiio/club_logos` for 2026/27-klubbene |
| football-data.org crest-ID | 37 | Har en ID-basert URL i den eksisterende logo-registreringen, uten prioritet fra den engelske kildepakken |
| Bare generert SVG-reserve | 122 | Ingen logo-kilde er registrert for disse navnene i dagens kode |
| **Totalt** | **251** | Kildestatus slik den var ved revisjonen |

Dette er en **statisk kilderevisjon**. Vi kunne ikke teste nettverkstilgangen til hver bildadresse i denne kjøringen, så «kilde registrert» er ikke det samme som bekreftet HTTP 200 eller bekreftet korrekt logo-bilde.

## Konkret feil rettet i v3.46

I v3.45 ble URL-er fra den engelske 92-klubbers kildepakken forsøkt generert for alle klubber i `EFL_DIVISIONS`, inkludert National League. National League ligger utenfor denne 92-klubbers kildepakke, slik at disse oppslagene var unødvendige feilforespørsler. v3.46 begrenser nå denne kilden til Premier League samt de tre EFL-divisjonene Championship, League One og League Two i den låste 2026/27-baselinen. Det er nøyaktig 92 unike kildenøkler i denne listen.

## Diagnostikk

v3.46 eksponerer `window.CM_MOBILE_LOGO_AUDIT` med kildestatus og listen over navn uten registrert logo-kilde. Funksjonen `clubLogoCoverageAudit()` kan kjøres på nytt fra utviklerkonsollen for å bygge en ny statusrapport etter endringer i klubbdatabasen.

## Viktig gjenstående arbeid

**Vi har ikke ennå skaffet og verifisert ekte logoer for de 122 oppføringene som nå bruker generert SVG-reserve.** Dette gjelder 24 National League-navn og 98 navneoppføringer i europeiske pooler/UEFA-listene (aliaser kan forekomme). Alle klubber får fortsatt et synlig merke, men reservesymbolet er ikke klubbens offisielle logo.

Neste delarbeid er å registrere godkjente kilder for disse klubbene, kontrollere at hvert oppslag peker til riktig logo, og helst pakke bildene lokalt slik at appen ikke avhenger av nettverk ved spilling offline.

## Tester utført

- Begge innebygde JavaScript-blokker består `node --check`.
- Isolert test av den faktiske kildelogikken bekrefter 92 engelske kilde-nøkler.
- Testen bekrefter at ingen av de 24 National League-klubbene forsøker å bruke PNG-kilden for PL/EFL.
- Testen bekrefter eksempelbanen for AFC Wimbledon: `AFCWimbledon_ClubLogo.png`.
- ZIP-arkivets integritet kontrolleres separat før levering.

Ingen full nettleser-/offline-bildetest er gjennomført.
