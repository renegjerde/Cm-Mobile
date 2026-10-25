# CM Mobile v3.25 — draktfarger for målblinkingen

## Hva som var feil

Den forrige paletten ga Manchester United rødt og gult fordi sekundærfargen ble hentet fra gamle klubbfarge-/emblemdata, ikke fra drakten. I v3.25 er Uniteds blinkepalett **rød bakgrunn / hvit tekst**, deretter **hvit bakgrunn / rød tekst**. Dette samsvarer med klubbens 2026/27 hjemmedrakt: rød skjorte, hvite shorts og svarte sokker.

## Omfang og metode

- Katalogen inneholder egne hjemmedraktfarger for alle klubbnavn som finnes i spillets 2026/27 grunnlister: de 20 Premier League-klubbene, 96 klubbene i EFL-/National League-registeret og de europeiske pool-/UEFA-lagene.
- Europeiske navn og aliaser fra klubbmerke-registeret dekkes også. Alias som «Bayern Munich» og «Bayern München» peker til samme normalized klubbnøkkel.
- Fargekartet bruker primært hjemmedraktens dominerende skjortefarge. Sekundærfargen bruker shorts/trim der den fungerer visuelt. Hvis de to draktfargene har for lav kontrast, velges hvit eller mørk nøytral for den andre blinkefasen, så teksten forblir leselig.
- Ukjente eldre navn får en fast marineblå/hvit reservepalett, ikke tilfeldige fargetoner fra hash eller klubbemblem. Dekningskontrollen for de aktive liga-/europacup-listene er bygget inn i spillet som `CLUB_KIT_PALETTE_AUDIT`.

## Researchgrunnlag

- Premier Leagues egen oversikt over 2026/27-draktene brukes som hovedreferanse for PL-klubbene: [Premier League — 2026/27 club kits](https://www.premierleague.com/en/news/4658330/premier-league-club-kits-for-202627-season).
- Manchester Uniteds offisielle lansering bekrefter den røde hjemmetrøyen, hvite shorts og svarte sokker for 2026/27: [Manchester United — new home kit](https://www.manutd.com.es/en/news/united-and-adidas-launch-new-home-kit-for-202627-season).
- 2026/27 EFL-oversikter for League One, League Two og National League brukes til å kryssjekke de lavere engelske divisjonene: [League One](https://www.footballkitarchive.com/league-one-kits-2026-27-l156/), [League Two](https://www.footballkitarchive.com/league-two-kits-2026-27-l157/), [National League](https://www.footballkitarchive.com/national-league-kits-2026-27-l192/).
- For europeiske lag brukes offisielle UEFA-informasjonskit som referanse til deltaker-/klubbidentitet, sammen med offentlig tilgjengelige 2026/27 hjemmedraktoversikter: [UEFA information kits](https://www.uefa.com/news-media/mediaservices/informationkits/competitions/) og [Football Kit Archive — Premier League 2026/27](https://www.footballkitarchive.com/premier-league-kits-2026-27-l224/).

Ikke alle klubber har publisert komplett, offentlig 2026/27 kit-fotografi for alle plagg. For disse er katalogen basert på klubbens etablerte hjemmedraktpalett, og den er eksplisitt en visuell forenkling for spillets blinkeeffekt — ikke en påstand om at hver eneste kamp brukes med de samme shortsene/sokkene.

## Klubbpaletter for de aktive grunnlistene

Tabellen viser de faktiske fargene som veksles i animasjonen etter kontrastsikringen. Fargene er heksadesimale, slik at de kan kontrolleres og redigeres enkelt.

| Klubb | Første fase (bakgrunn) | Andre fase (bakgrunn) |
|---|---:|---:|
| Arsenal | `#D71920` | `#FFFFFF` |
| Manchester City | `#6CABDD` | `#101827` |
| Liverpool | `#C8102E` | `#FFFFFF` |
| Manchester United | `#DA291C` | `#FFFFFF` |
| Chelsea | `#0057B8` | `#FFFFFF` |
| Tottenham Hotspur | `#FFFFFF` | `#182D55` |
| Newcastle United | `#111827` | `#FFFFFF` |
| Aston Villa | `#6C1D45` | `#FFFFFF` |
| Brighton & Hove Albion | `#0057B8` | `#FFFFFF` |
| AFC Bournemouth | `#D71920` | `#FFFFFF` |
| Crystal Palace | `#0057B8` | `#FFFFFF` |
| Everton | `#0057B8` | `#FFFFFF` |
| Brentford | `#E30613` | `#FFFFFF` |
| Coventry City | `#6CABDD` | `#101827` |
| Fulham | `#FFFFFF` | `#111827` |
| Hull City | `#F39200` | `#111827` |
| Ipswich Town | `#0057B8` | `#FFFFFF` |
| Leeds United | `#FFFFFF` | `#0057B8` |
| Nottingham Forest | `#D71920` | `#FFFFFF` |
| Sunderland | `#D71920` | `#FFFFFF` |
| AFC Fylde | `#0057B8` | `#FFFFFF` |
| Altrincham | `#D71920` | `#FFFFFF` |
| Aldershot Town | `#D71920` | `#FFFFFF` |
| Barrow | `#0057B8` | `#FFFFFF` |
| Boston United | `#F7D116` | `#111827` |
| Boreham Wood | `#D71920` | `#FFFFFF` |
| Carlisle United | `#D71920` | `#FFFFFF` |
| Eastleigh | `#0057B8` | `#FFFFFF` |
| FC Halifax Town | `#0057B8` | `#FFFFFF` |
| Forest Green Rovers | `#00843D` | `#FFFFFF` |
| Gateshead | `#111827` | `#FFFFFF` |
| Hartlepool United | `#0057B8` | `#FFFFFF` |
| Harrogate Town | `#F7D116` | `#111827` |
| Hornchurch | `#0057B8` | `#FFFFFF` |
| Kidderminster Harriers | `#D71920` | `#FFFFFF` |
| Scunthorpe United | `#6C1D45` | `#FFFFFF` |
| Solihull Moors | `#0057B8` | `#F7D116` |
| Southend United | `#0057B8` | `#FFFFFF` |
| Sutton United | `#F39200` | `#111827` |
| Tamworth | `#D71920` | `#FFFFFF` |
| Wealdstone | `#0057B8` | `#FFFFFF` |
| Worthing | `#D71920` | `#FFFFFF` |
| Woking | `#D71920` | `#FFFFFF` |
| Yeovil Town | `#00843D` | `#FFFFFF` |
| Birmingham City | `#0057B8` | `#FFFFFF` |
| Blackburn Rovers | `#0057B8` | `#FFFFFF` |
| Bolton Wanderers | `#FFFFFF` | `#182D55` |
| Bristol City | `#D71920` | `#FFFFFF` |
| Burnley | `#6C1D45` | `#FFFFFF` |
| Cardiff City | `#0057B8` | `#FFFFFF` |
| Charlton Athletic | `#D71920` | `#FFFFFF` |
| Derby County | `#FFFFFF` | `#111827` |
| Lincoln City | `#D71920` | `#FFFFFF` |
| Middlesbrough | `#D71920` | `#FFFFFF` |
| Millwall | `#182D55` | `#FFFFFF` |
| Norwich City | `#F7D116` | `#101827` |
| Portsmouth | `#0057B8` | `#FFFFFF` |
| Preston North End | `#FFFFFF` | `#182D55` |
| Queens Park Rangers | `#0057B8` | `#FFFFFF` |
| Sheffield United | `#D71920` | `#FFFFFF` |
| Southampton | `#D71920` | `#FFFFFF` |
| Stoke City | `#D71920` | `#FFFFFF` |
| Swansea City | `#FFFFFF` | `#111827` |
| Watford | `#F7D116` | `#111827` |
| West Bromwich Albion | `#182D55` | `#FFFFFF` |
| West Ham United | `#6C1D45` | `#FFFFFF` |
| Wolverhampton Wanderers | `#F7D116` | `#111827` |
| Wrexham | `#D71920` | `#FFFFFF` |
| AFC Wimbledon | `#182D55` | `#6CABDD` |
| Barnsley | `#D71920` | `#FFFFFF` |
| Blackpool | `#F39200` | `#101827` |
| Bradford City | `#6C1D45` | `#F7D116` |
| Bromley | `#D71920` | `#FFFFFF` |
| Burton Albion | `#F7D116` | `#111827` |
| Cambridge United | `#111827` | `#F7D116` |
| Doncaster Rovers | `#D71920` | `#FFFFFF` |
| Huddersfield Town | `#0057B8` | `#FFFFFF` |
| Leicester City | `#0057B8` | `#FFFFFF` |
| Leyton Orient | `#D71920` | `#FFFFFF` |
| Luton Town | `#F39200` | `#182D55` |
| Mansfield Town | `#F7D116` | `#0057B8` |
| Milton Keynes Dons | `#FFFFFF` | `#D71920` |
| Notts County | `#111827` | `#FFFFFF` |
| Oxford United | `#F7D116` | `#182D55` |
| Peterborough United | `#0057B8` | `#FFFFFF` |
| Plymouth Argyle | `#00843D` | `#FFFFFF` |
| Reading | `#0057B8` | `#FFFFFF` |
| Sheffield Wednesday | `#0057B8` | `#FFFFFF` |
| Stockport County | `#0057B8` | `#FFFFFF` |
| Stevenage | `#D71920` | `#FFFFFF` |
| Wigan Athletic | `#0057B8` | `#FFFFFF` |
| Wycombe Wanderers | `#182D55` | `#6CABDD` |
| Accrington Stanley | `#D71920` | `#FFFFFF` |
| Barnet | `#D71920` | `#FFFFFF` |
| Bristol Rovers | `#0057B8` | `#FFFFFF` |
| Cheltenham Town | `#D71920` | `#FFFFFF` |
| Chesterfield | `#0057B8` | `#FFFFFF` |
| Colchester United | `#0057B8` | `#FFFFFF` |
| Crewe Alexandra | `#D71920` | `#FFFFFF` |
| Crawley Town | `#D71920` | `#FFFFFF` |
| Exeter City | `#D71920` | `#FFFFFF` |
| Fleetwood Town | `#D71920` | `#FFFFFF` |
| Gillingham | `#0057B8` | `#FFFFFF` |
| Grimsby Town | `#111827` | `#FFFFFF` |
| Newport County | `#F7D116` | `#111827` |
| Northampton Town | `#6C1D45` | `#FFFFFF` |
| Oldham Athletic | `#0057B8` | `#FFFFFF` |
| Port Vale | `#111827` | `#FFFFFF` |
| Rochdale | `#0057B8` | `#FFFFFF` |
| Rotherham United | `#D71920` | `#FFFFFF` |
| Salford City | `#D71920` | `#FFFFFF` |
| Shrewsbury Town | `#0057B8` | `#F7D116` |
| Swindon Town | `#D71920` | `#FFFFFF` |
| Tranmere Rovers | `#FFFFFF` | `#0057B8` |
| Walsall | `#D71920` | `#FFFFFF` |
| York City | `#D71920` | `#FFFFFF` |
| Real Madrid | `#FFFFFF` | `#182D55` |
| Barcelona | `#A50044` | `#FFFFFF` |
| Atlético Madrid | `#D71920` | `#FFFFFF` |
| Athletic Club | `#D71920` | `#FFFFFF` |
| Bayern München | `#D71920` | `#FFFFFF` |
| Borussia Dortmund | `#F7D116` | `#111827` |
| Bayer Leverkusen | `#D71920` | `#FFFFFF` |
| RB Leipzig | `#FFFFFF` | `#D71920` |
| Paris Saint-Germain | `#182D55` | `#FFFFFF` |
| Marseille | `#FFFFFF` | `#101827` |
| Monaco | `#FFFFFF` | `#D71920` |
| Lille | `#D71920` | `#FFFFFF` |
| Inter | `#0057B8` | `#FFFFFF` |
| AC Milan | `#D71920` | `#FFFFFF` |
| Juventus | `#111827` | `#FFFFFF` |
| Atalanta | `#0057B8` | `#FFFFFF` |
| Napoli | `#6CABDD` | `#101827` |
| Roma | `#7A263A` | `#E7B72D` |
| Ajax | `#FFFFFF` | `#D71920` |
| PSV Eindhoven | `#D71920` | `#FFFFFF` |
| Feyenoord | `#D71920` | `#FFFFFF` |
| Benfica | `#D71920` | `#FFFFFF` |
| Sporting CP | `#00843D` | `#FFFFFF` |
| FC Porto | `#0057B8` | `#FFFFFF` |
| Celtic | `#00843D` | `#FFFFFF` |
| Rangers | `#0057B8` | `#FFFFFF` |
| Club Brugge | `#0057B8` | `#FFFFFF` |
| Anderlecht | `#5E2A84` | `#FFFFFF` |
| Galatasaray | `#D71920` | `#FFFFFF` |
| Fenerbahçe | `#182D55` | `#E7B72D` |
| Shakhtar Donetsk | `#F39200` | `#111827` |
| Olympiacos | `#D71920` | `#FFFFFF` |
| AZ Alkmaar | `#D71920` | `#FFFFFF` |
| FC Twente | `#D71920` | `#FFFFFF` |
| Union Saint-Gilloise | `#E7B72D` | `#101827` |
| KRC Genk | `#0057B8` | `#FFFFFF` |
| FC Midtjylland | `#111827` | `#FFFFFF` |
| FC København | `#FFFFFF` | `#0057B8` |
| Brøndby IF | `#E7B72D` | `#101827` |
| Bodø/Glimt | `#F7D116` | `#111827` |
| Molde FK | `#0057B8` | `#FFFFFF` |
| Malmö FF | `#6CABDD` | `#101827` |
| Djurgårdens IF | `#182D55` | `#6CABDD` |
| BSC Young Boys | `#E7B72D` | `#111827` |
| FC Basel | `#D71920` | `#FFFFFF` |
| FC Lugano | `#111827` | `#FFFFFF` |
| Red Bull Salzburg | `#FFFFFF` | `#D71920` |
| SK Sturm Graz | `#111827` | `#FFFFFF` |
| Beşiktaş | `#111827` | `#FFFFFF` |
| Trabzonspor | `#6C1D45` | `#FFFFFF` |
| PAOK | `#111827` | `#FFFFFF` |
| Panathinaikos | `#00843D` | `#FFFFFF` |
| AEK Athen | `#E7B72D` | `#111827` |
| PFC Ludogorets | `#00843D` | `#FFFFFF` |
| FCSB | `#D71920` | `#FFFFFF` |
| Rapid Wien | `#00843D` | `#FFFFFF` |
| Viktoria Plzeň | `#D71920` | `#FFFFFF` |
| Slavia Praha | `#D71920` | `#FFFFFF` |
| Sparta Praha | `#6C1D45` | `#FFFFFF` |
| Dinamo Zagreb | `#0057B8` | `#FFFFFF` |
| Hajduk Split | `#FFFFFF` | `#0057B8` |
| Crvena zvezda | `#D71920` | `#FFFFFF` |
| Ferencváros | `#00843D` | `#FFFFFF` |
| Legia Warszawa | `#FFFFFF` | `#00843D` |
| Lech Poznań | `#0057B8` | `#FFFFFF` |
| Jagiellonia Białystok | `#F7D116` | `#101827` |
| Raków Częstochowa | `#D71920` | `#FFFFFF` |
| Slovan Bratislava | `#6CABDD` | `#101827` |
| HJK Helsinki | `#0057B8` | `#FFFFFF` |
| KuPS | `#111827` | `#F7D116` |
| Shamrock Rovers | `#00843D` | `#FFFFFF` |
| Shelbourne | `#D71920` | `#FFFFFF` |
| Linfield | `#0057B8` | `#FFFFFF` |
| Hearts | `#7A263A` | `#FFFFFF` |
| Aberdeen | `#D71920` | `#FFFFFF` |
| Silkeborg IF | `#D71920` | `#FFFFFF` |
| FC Nordsjælland | `#D71920` | `#FFFFFF` |
| Viking FK | `#111827` | `#FFFFFF` |
| SK Brann | `#D71920` | `#FFFFFF` |
| BK Häcken | `#F7D116` | `#111827` |
| Servette FC | `#6C1D45` | `#FFFFFF` |
| FC Zürich | `#FFFFFF` | `#0057B8` |
| Lausanne-Sport | `#0057B8` | `#FFFFFF` |
| Omonia Nicosia | `#00843D` | `#FFFFFF` |
| APOEL | `#F7D116` | `#0057B8` |
| Aris Limassol | `#F7D116` | `#111827` |
| CFR Cluj | `#6C1D45` | `#FFFFFF` |
| CSKA Sofia | `#D71920` | `#FFFFFF` |
| Pafos FC | `#0057B8` | `#FFFFFF` |
| Celje | `#00843D` | `#FFFFFF` |
| HNK Rijeka | `#FFFFFF` | `#0057B8` |
| Partizan | `#111827` | `#FFFFFF` |
| FC Pyunik | `#D71920` | `#FFFFFF` |
| The New Saints | `#00843D` | `#FFFFFF` |
| Víkingur Reykjavík | `#D71920` | `#FFFFFF` |
| FC Astana | `#F7D116` | `#0057B8` |
| LASK | `#111827` | `#FFFFFF` |
| Sabah | `#111827` | `#FFFFFF` |
| Lens | `#D71920` | `#FFFFFF` |
| Stuttgart | `#FFFFFF` | `#D71920` |
| AEK Athens | `#E7B72D` | `#111827` |
| Como | `#0057B8` | `#FFFFFF` |
| Real Betis | `#00843D` | `#FFFFFF` |
| Villarreal | `#F7D116` | `#182D55` |
| Ararat-Armenia | `#D71920` | `#FFFFFF` |
| Celta | `#6CABDD` | `#101827` |
| GNK Dinamo | `#0057B8` | `#FFFFFF` |
| Hapoel Beer-Sheva | `#D71920` | `#FFFFFF` |
| Hoffenheim | `#0057B8` | `#FFFFFF` |
| Levski Sofia | `#0057B8` | `#FFFFFF` |
| Lillestrøm | `#F7D116` | `#111827` |
| Lyon | `#FFFFFF` | `#D71920` |
| NEC Nijmegen | `#00843D` | `#FFFFFF` |
| OFI Crete | `#111827` | `#FFFFFF` |
| Real Sociedad | `#0057B8` | `#FFFFFF` |
| Rennes | `#D71920` | `#FFFFFF` |
| Torreense | `#0057B8` | `#FFFFFF` |
| Aarhus | `#FFFFFF` | `#0057B8` |
| Borac | `#0057B8` | `#FFFFFF` |
| Braga | `#D71920` | `#FFFFFF` |
| Egnatia | `#00843D` | `#FFFFFF` |
| Freiburg | `#D71920` | `#FFFFFF` |
| Gent | `#0057B8` | `#FFFFFF` |
| Getafe | `#0057B8` | `#FFFFFF` |
| Iberia Tbilisi | `#111827` | `#F7D116` |
| Inter Escaldes | `#0057B8` | `#FFFFFF` |
| Jablonec | `#00843D` | `#FFFFFF` |
| Kairat Almaty | `#F7D116` | `#111827` |
| Kauno Žalgiris | `#00843D` | `#FFFFFF` |
| Lincoln Red Imps | `#D71920` | `#FFFFFF` |
| Lugano | `#111827` | `#FFFFFF` |
| Mjällby | `#F7D116` | `#111827` |
| Riga FC | `#0057B8` | `#FFFFFF` |
| Sint-Truiden | `#F7D116` | `#0057B8` |
| Thun | `#D71920` | `#FFFFFF` |
| Universitatea Craiova | `#0057B8` | `#FFFFFF` |

## Kontroll

- JavaScript-syntaks validert med Node.js.
- Alle 252 unike navn i aktive klubblister er kontrollert mot katalogen.
- Europeiske badge-aliaser er også kontrollert for fargedekning.
- Bekreftet spesielt at `Manchester United` løses til `#DA291C` / `#FFFFFF`, ikke gul.
- Fargeparet sjekkes for kontrast (minimum 4.5:1) før animasjonen vises.
- Denne pakken er ikke testet interaktivt i brukerens faktiske nettleser/karriere.
