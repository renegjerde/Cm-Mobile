# CM Mobile v1.70 — 92-klubbkarriere

## Endringer
- Klubbregisteret inneholder 92 unike klubber: 20 i Premier League og 24 i hver av Championship, League One og League Two.
- Ny karriere lar deg velge klubb fra alle fire divisjonene.
- Den aktive klubben starter med en tropp på 25 spillere.
- Ligatabell og terminliste bygges for valgt divisjon: 38 runder i Premier League og 46 runder i hver EFL-divisjon.
- Kampoppsettet bruker globale klubb-ID-er, slik at motstandere og spillerstaller kan knyttes til riktig klubb.
- Sesongovergangen oppdaterer divisjonstilhørighet ved opprykk og nedrykk og bygger nye ligalister.
- Eksisterende spillfunksjoner fra v1.69 er beholdt i samme HTML-fil.

## Viktige begrensninger
- Mange spillere i EFL-troppene er genererte modellspillere, ikke verifiserte, autentiske spillerstaller. Klubbene kan spilles, men spillerdataene er ikke ferdig kvalitetssikret.
- Når manageren ikke spiller i Premier League, er PL-resultatene i denne versjonen rangert etter styrke i sesongovergangen; en fullstendig separat, kamp-for-kamp simulering av alle tre andre ligaer er fortsatt et senere forbedringspunkt.
- Kontroll utført: JavaScript-syntaks (`node --check`) og logikktest av 92 unike klubber, divisjonsantall, 25 spillere per valgt klubb samt terminlister på 38/46 runder. Full nettleser-/mobiltest er ikke utført.

## Installering
Pakk ut ZIP-filen. Bruk `cm_mobile_v1_70/index.html` som testfil. For GitHub Pages som publiserer fra `main`-rot, må den testede filen kopieres til rotens `index.html` for å erstatte den aktive versjonen.
