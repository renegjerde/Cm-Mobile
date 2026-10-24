# CM Mobile v3.16 — Klubb- og divisjonskontroll

**Kontrollert utgangspunkt:** den engelske ligastrukturen for 2026/27.

## Resultat

| Divisjon | Klubbtall | Kontroll |
|---|---:|---|
| Premier League | 20 | OK |
| Championship | 24 | OK |
| League One | 24 | OK |
| League Two | 24 | OK |
| National League | 24 | OK |
| **Totalt** | **116** | **116 unike klubber; 0 overlapp** |

Den statiske 2026/27-listen inneholder 20 Premier League-klubber og 24 klubber i hver av de fire neste divisjonene. Ingen klubb forekommer mer enn én gang på tvers av disse fem divisjonene.

## Premier League (20)

- Arsenal
- Manchester City
- Liverpool
- Manchester United
- Chelsea
- Tottenham Hotspur
- Newcastle United
- Aston Villa
- Brighton & Hove Albion
- AFC Bournemouth
- Crystal Palace
- Everton
- Brentford
- Coventry City
- Fulham
- Hull City
- Ipswich Town
- Leeds United
- Nottingham Forest
- Sunderland

## Championship (24)

- Birmingham City
- Blackburn Rovers
- Bolton Wanderers
- Bristol City
- Burnley
- Cardiff City
- Charlton Athletic
- Derby County
- Lincoln City
- Middlesbrough
- Millwall
- Norwich City
- Portsmouth
- Preston North End
- Queens Park Rangers
- Sheffield United
- Southampton
- Stoke City
- Swansea City
- Watford
- West Bromwich Albion
- West Ham United
- Wolverhampton Wanderers
- Wrexham

## League One (24)

- AFC Wimbledon
- Barnsley
- Blackpool
- Bradford City
- Bromley
- Burton Albion
- Cambridge United
- Doncaster Rovers
- Huddersfield Town
- Leicester City
- Leyton Orient
- Luton Town
- Mansfield Town
- Milton Keynes Dons
- Notts County
- Oxford United
- Peterborough United
- Plymouth Argyle
- Reading
- Sheffield Wednesday
- Stockport County
- Stevenage
- Wigan Athletic
- Wycombe Wanderers

## League Two (24)

- Accrington Stanley
- Barnet
- Bristol Rovers
- Cheltenham Town
- Chesterfield
- Colchester United
- Crewe Alexandra
- Crawley Town
- Exeter City
- Fleetwood Town
- Gillingham
- Grimsby Town
- Newport County
- Northampton Town
- Oldham Athletic
- Port Vale
- Rochdale
- Rotherham United
- Salford City
- Shrewsbury Town
- Swindon Town
- Tranmere Rovers
- Walsall
- York City

## National League (24)

- AFC Fylde
- Altrincham
- Aldershot Town
- Barrow
- Boston United
- Boreham Wood
- Carlisle United
- Eastleigh
- FC Halifax Town
- Forest Green Rovers
- Gateshead
- Hartlepool United
- Harrogate Town
- Hornchurch
- Kidderminster Harriers
- Scunthorpe United
- Solihull Moors
- Southend United
- Sutton United
- Tamworth
- Wealdstone
- Worthing
- Woking
- Yeovil Town

## Funn i kodebasen

Klubbnavnelistene for 2026/27 stemmer med klubbtilhørigheten for sesongen. Feilrisikoen lå i hvordan spillet lagrer divisjonene: `EFL_DIVISIONS` endres ved overgang til senere sesonger, men globalt kunne denne endringen bli stående når brukeren startet eller lastet en annen 2026/27-karriere i samme nettleserøkt. Det kunne føre til at klubber som Coventry City, Hull City og Ipswich Town — som er Premier League-klubber i 2026/27 — dukket opp i en EFL-divisjon i lånevelgeren.

v3.16 innfører en uforanderlig grunnliste for 2026/27, gjenoppretter den når en slik karriere lastes eller opprettes, synkroniserer lagrede EFL-tabeller/spillerdatabase mot grunnlisten og kontrollerer kampprogrammets klubbreferanser før kamp. Et ødelagt kampprogram kan bygges på nytt når ingen ligakamper er spilt; allerede spilte kampresultater overskrives ikke automatisk.

## Kilder for sesonglistene

- Premier League — [klubber for 2026/27](https://www.premierleague.com/en/news/4365156/new-to-the-premier-league-heres-all-you-need-to-know).
- EFL-divisjoner — [klubboversikt for 2026/27](https://footbeen.com/blog/92-club-guide-visit-every-english-football-league-ground).
- National League — [2026/27 medlemsklubber](https://en.wikipedia.org/wiki/National_League_(division)).

**Avgrensning:** Denne kontrollen gjelder engelsk Premier League, Championship, League One, League Two og National League ved sesongstart 2026/27. Sesongskifter med opprykk/nedrykk behandles dynamisk og er ikke ment å bruke grunnlisten uendret etter første sesong.
