# CM Mobile – spillerrevisjon, arbeidsrapport v3.61

Dato: 14. november 2026
Utgangspunkt: CM Mobile v3.60 Player Audit.

## Endringer i v3.61

### Juniorakademier
- Rivalakademienes mål er redusert fra 4 til 2 spillere per klubb.
- Eksisterende rivalakademier trimmes ved innlasting av eldre karrierer. De to spillerne med høyest potensial prioriteres, deretter ferdighet og lavere alder.
- Managerens eget akademi beholdes på 25 spillere med 3-8-8-6-posisjonsfordeling.
- Rivalakademier fylles opp ved sesongbehandling, ikke midt i sesongen.
- Akademispillere over 18 år frigis etter eksisterende aldersregel.
- Det er ikke lagt til synlige merker eller etiketter for genererte spillere.

### Fri transfer
- `freeAgentSinceSeason` lagres på hver spiller i fri transfer-systemet.
- Spillere med inngangssesong tidligere enn ny sesong fjernes ved sesongskiftet.
- Spillere uten historisk inngangssesong i eldre lagringer får nåværende sesong som migreringsdato, slik at de får en hel sesong før første opprydding.
- Kontraktsutløp ved sesongslutt registreres med kommende sesong som inngangssesong.
- Juniorer som frigis når sesongen avsluttes registreres tilsvarende med kommende sesong.
- Nye årlige frie agenter får sesongen de kommer inn som inngangssesong.
- Den eksisterende pensjoneringsgrensen på 37 år består.

## Tidligere v3.60-kontroller beholdt
- Premier League: 20 klubber, 459 seniornavn.
- Premier League U21-tillegg: 20 klubber, 54 navn.
- EFL: 72 klubber, 1 479 navn.
- Identitetsmatch krever stabil karriere-ID, Transfermarkt-ID eller normalisert fullt navn kombinert med samme fødselsdato.
- Likhet i navn alene utløser ikke automatisk sletting.
- Lånespillere beholdes i eierklubbens eierskapsdata.

## Testresultater for v3.61
- 9 målrettede assertions bestått.
- Testet at managerakademiet beholder 25 spillere.
- Testet at rivalakademier reduseres til to, og at beste prospekter bevares.
- Testet opprettelse av manglende rivalakademi med to prospekter.
- Testet at 19-åringer forlater akademiet ved sesongbehandling, og at frigivelsen får riktig inngangssesong.
- Testet at eldre frie agenter fjernes etter én full sesong.
- Testet at spillere som kommer inn ved sesonggrensen får en hel sesong før fjerning.
- Alle innebygde JavaScript-skript syntakskontrollert med Node.js.
- ZIP-arkivintegritet kontrollert.

## Ikke ferdigstilt i v3.61
Full import og kryssjekk av alle 108 UEFA-ligafaseklubbers List A og List B er **ikke** ferdigstilt i denne pakken. Den eldre europeiske arkiv-/kurateringskilden fra 6. juli 2026 er ikke tilstrekkelig bevis på aktuell klubbtilhørighet. Det kreves en egen datainnhentings- og identitetsrevisjon per UEFA-klubb, med kildedato og kryssjekk mot engelske registreringer og alle øvrige europeiske klubber.

UEFA-kildesider (sesong 2026/27):
- Champions League squad changes, 3. november 2026.
- Europa League squad changes, 5. november 2026.
- Conference League squad changes, 4. november 2026.

Disse sidene viser List A-endringer; List B kan oppdateres før hver kamp. Det må derfor lagres hvilken dato hver tropp ble kontrollert.
