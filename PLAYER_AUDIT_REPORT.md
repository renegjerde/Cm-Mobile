# CM Mobile – spillerrevisjon, arbeidsrapport v3.62

Dato: 14. november 2026
Utgangspunkt: CM Mobile v3.61 Player Database-pakken.

## Endringer

### UEFA Champions League 2026/27
- Innebygd List A for 31 ikke-engelske klubber.
- Importert antall: 730 spillerregistreringer.
- Antall klubber: 31.
- Per klubb: 21–25 navn.
- Fem engelske UCL-klubber fortsetter å bruke offisielle engelske 2026/27-registreringer.
- List B er bevisst utelatt fordi den er dynamisk og overlapper klubbens utviklings-/akademiløp.

### Bygging og migrering
- `buildUEFAListASquad()` bygger offline-spillerobjekter fra offisiell List A.
- Hver importert spiller får stabil klubbbundet ID, klubbreferanse og intern registreringsmetadata. Metadata er ikke synlig merking i spillet.
- `competitionSquad()` prøver den offisielle List A-stallen før den oppretter en fiktiv cup-only-stall.
- Ved migrering av eksisterende karrierer erstattes bare tydelig urørte, rent genererte cup-only-staller. Har klubben kampstatistikk eller registrerte overganger, beholdes den eksisterende stallen.
- Kampstall og europeisk overgangsregister synkroniseres mot samme offisielle List A-liste.

## Kontroller
- 31/31 ikke-engelske UCL-klubber dekket.
- 730 spillere totalt.
- Ingen duplikate normaliserte spilleridentiteter mellom de 31 UEFA-klubbene.
- Ingen eksakte normaliserte navneoverlapp mot PL, PL U21-supplement eller EFL-stallene. Dette er en konservativ kontroll; navnelikhet alene brukes fortsatt ikke som automatisk slettekriterium.
- Runtime-test: 31 klubb-staller bygget, 730 spillere lastet, 8 klubbnavn-aliaser testet og sesongfilter testet. I tillegg bestod fire migreringssperretester: urørt generert stall kan migreres, mens kamphistorikk, annen kilde eller overgangshistorikk beskytter stallen mot automatisk utskifting.
- Alle innebygde JS-skript syntakskontrollert.
- ZIP-integritet testet.

## Bevisste begrensninger
- Dette er **ikke** full europeisk dekning: Europa League og Conference League står igjen.
- UCL List B er ikke med. Den kan oppdateres fram mot hver kamp, så dette snapshotet skal ikke omtales som fullstendig UEFA-lagliste.
- UEFA opplyser at squad-sidene er til praktisk informasjon, ikke bindende, og at UEFA ikke garanterer nøyaktighet eller fullstendighet; klubbene må selv bekrefte registreringene.
- Profilarkivet (Transfermarkt-snapshot 06.07.2026) kan fortsatt levere historiske profilopplysninger, men bekrefter ikke alene nåværende klubbtilhørighet.
- Spillere i aktive karrierer med statistikk/overgangshistorikk overskrives ikke automatisk. Det beskytter lagrede karrierer, men betyr at en manuell/ny karriere kan være nødvendig for å se alle nye UEFA-listene dersom den gamle stallen allerede er endret.
- Det er ikke gjennomført live-test mot brukerens Supabase-instans.

## Kilder
- UEFA Champions League 2026/27 squad changes, siste kontrollerte List A-endringer 3. november 2026; siden oppdateres på kampdager.
- Offisielle UEFA squad-sider for de 31 klubbene, kontrollert 14. november 2026.
