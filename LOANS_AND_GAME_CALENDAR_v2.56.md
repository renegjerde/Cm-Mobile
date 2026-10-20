# CM Mobile v2.56 — utlån, lønnsfordeling og låneforlengelse

## Endringer
- Egne spillere kan lånes ut til en valgt klubb i den aktive klubbverdenen.
- Låneavtalen har en eksakt dato fra spillets kalender, varighet, låneavgift og andel av ukelønn betalt av mottakerklubben.
- Aktive inn- og utlån vises under Overgangsmarked, og kan forlenges med 4 uker, 12 uker eller til sesongslutt.
- Automatiske returer håndterer både innlån og utlån.
- Lånespillere ekskluderes fra vanlig kjøpsmarked.
- Ukentlige lønnskostnader fordeles mellom mottakerklubb og moderklubb etter avtalt prosent.

## Kontroller
- JavaScript-syntaks kontrollert for begge inline script-blokker.
- ZIP-integritet kontrollert.
- Isolert Node-test av utlån, automatisk retur, historikkføring og 50/50 lønnsdeling; spilleren ble fjernet fra troppen ved utlån og returnerte til moderklubben på sluttdatoen.
- Statisk kontroll av forlengelsesflyt og markedsfiltrering.
- Full nettleser- og sesongtest er ikke gjennomført.

## Begrensninger
- Låneavgift og lønnsfordeling er modellert økonomi, ikke en juridisk kontraktsmotor.
- Forlengelse registreres i historikken, men ingen egen forlengelsesavgift beregnes.
- Retur og klubbvalg gjelder klubber i den innebygde klubbverdenen.
