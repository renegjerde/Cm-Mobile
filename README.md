# CM Mobile v2.32

## Hva er nytt

- EFL-divisjonene er oppdatert til det faktiske 2026/27-oppsettet: 24 klubber i hver av Championship, League One og League Two. Dette inkluderer blant annet Wolves, West Ham og Lincoln i Championship, Sheffield Wednesday/Oxford/Leicester i League One og Exeter/Northampton/Port Vale/Rotherham/Shrewsbury i League Two.
- Spillerlisten er utvidet fra 29 til **61 fullstendig importerte offisielle EFL-seniorlister**, pluss **9 delvise navneuttrekk** fra samme offisielle EFL-publikasjon. Barnet mangler fortsatt en importert seniorliste; Barnsley beholder foreløpig bare et eldre seed-navnegrunnlag. Tre klubber som ikke lenger er i EFL for 2026/27 (Barrow, Harrogate Town og Forest Green Rovers) er tatt ut av EFL-divisjonene.
- De bekreftede spillerne i de importerte listene blir beholdt. Manglende plasser er tydelig merket som fiktive spillere; ingen spiller presenteres med «ca. 24 år» eller annen omtrentlig alder.
- Når en offisiell seniorliste finnes, brukes bare navn fra den eksplisitte listen som bevis på medlemskap i 2026/27-troppen. Historiske `currentClubName`-felt i Transfermarkt-profilarkivet brukes ikke som fasit for klubbtilhørighet.
- For klubber som fortsatt mangler full offisiell liste, brukes ikke historisk klubbtilknytning til å fylle troppen. Bare eldre, eksplisitte seed-navn beholdes (tydelig merket som ubekreftet); resten er fiktive spillere. Profilarkivet beriker navnetreff, men bestemmer ikke hvem som tilhører klubben denne sesongen.
- Spillerenes profilopplysninger matches lokalt mot det innebygde, offline profilarkivet når navnematchen er trygg. Ingen ekstern nettforespørsel trengs under spilling.
- `PLAYER_DB_VERSION` er økt til 12 og `EFL_DB_VERSION` til 9 for å utløse riktige oppdateringer i urørte preseason-karrierer. Karriere som allerede er spilt blir ikke automatisk overskrevet.

## Dekning per nå

- Engelske klubber i spillet: 92 totalt (20 Premier League + 72 EFL).
- EFL-seniorlister: 61 fullstendige, 9 delvise, 2 som fortsatt mangler full import (Barnet og Barnsley).
- Full offisiell kontroll av de 20 Premier League-troppene gjenstår fortsatt.
- Delvise uttrekk er merket som delvise. Dette er en mellomversjon – den skal ikke omtales som komplett spillerdata for alle 92 klubber.

## Kilder

- EFL, *EFL Squad List 2026/27 & U21 Registered Contract Players*, publisert september 2026: https://images.gc.eflservices.co.uk/c0eadad0-aba0-11f1-ab8f-c3717d4e1e2b.pdf
- EFL offisielle 2026/27-fixtureoversikt: https://www.efl.com/news/2026/june/25/the-2026-27-efl-fixtures-are-here/
- Transfermarkt datasett (CC0) brukt bare som historisk profilreferanse: https://github.com/dcaribou/transfermarkt-datasets

## Tester

- JavaScript-syntaks for begge script-blokkene.
- ZIP-integritet.
- Node-basert test av alle 72 EFL-klubber: 25 spillere pr. klubb, ingen duplikater i en tropp og alle eksplisitt importerte offisielle navn beholdt.
- Testresultat: 1 800 spillerplasser; 1 298 navn fra offisielle EFL-lister beholdt, 498 tydelig fiktive spillere og 4 legacy seed-navn med klubbtilhørighet uttrykkelig ubekreftet.
- Full interaktiv browser-test og full offisiell kontroll av alle 92 klubber er fortsatt utestående.

## Innhold

- `index.html` – hele spillet, inkludert det innebygde spillerprofilarkivet.
- `README.md` – versjonsnotater.
- `ROSTER_2026_27_EFL_OFFICIAL.json` – EFL-navnelister og status per klubb.
- `ROSTER_COVERAGE_v2.32.csv` – dekningsrapport for 92 engelske klubber.
