# CM Mobile v3.64 – europeisk spillerbase

Dato: 14. november 2026  
Grunnlag: CM Mobile v3.63 med permanent UEFA List B-snapshot.

## Endringer
- Bygget List A-register for de klubbene som manglet et pålitelig innebygd spillerregister: Sabah og Slovan Bratislava (UCL), ni ikke-engelske UEL-klubber og elleve UECL-klubber.
- Eksisterende UCL List A er beholdt, med UEFA-korrigering for Barcelona: Jesse Bisiwu og Hamza Abdelkarim ligger i List A, mens Shane Kluivert ligger i List B.
- Rettet List B-oppføringer som manglet i KuPS, Kauno Žalgiris, Pafos og Riga. La til de manglende List B-angriperne i Inter og Porto.
- Fjernet Barcelona-spillerne Jesse Bisiwu og Hamza Abdelkarim fra List B.
- Alle klubbene bruker samme ordinære spillerregister i spillet; ingen synlige A/B- eller regen-markeringer.
- List B-migreringen er versjonert til v2. Eksisterende v3.63-karrierer får bare manglende spillere lagt til én gang.
- List A-migreringen er versjonert til v2. Den erstatter bare urørte, uverifiserte arkiv-/genererte europastaller; lag med kamphistorikk, overføringer, manuelle endringer eller verifiserte spillere beskyttes.
- Nye europeiske staller bygges fra UEFA List A der et kuratert register finnes; ellers brukes innebygd profilarkiv før systemet eventuelt genererer spillere.
- Ingen nettforespørsler, kampdagsoppdateringer eller fremtidig UEFA-synkronisering.

## Datadekning og kildebegrensning

Alle 108 klubboppføringene i de tre turneringene er representert i snapshotet. Tabellens List A-kilde skiller mellom manuelt transkriberte UEFA-troppslister og eldre innebygd profildata. For enkelte klubber uten manuelt transkribert List A brukes Transfermarkt-basert profilarkiv datert 6. juli 2026 som reserve; dette er **ikke** bevis på at samtlige spillere fortsatt var registrert i klubben 14. november. Det er derfor ikke riktig å omtale hver eneste List A-oppføring som offisielt november-verifisert.

| Turnering | Klubboppføringer | UEFA List A manuelt transkribert | Profilarkiv som reserve | List B-spillere |
|---|---:|---:|---:|---:|
| Champions League | 36 | 31 | 0 | 392 |
| Europa League | 36 | 9 | 24 | 364 |
| Conference League | 36 | 11 | 24 | 226 |

List A-kildeside for hver klubb og detaljerte navnelister finnes i `UEFA_PLAYER_DATABASE_SNAPSHOT_2026-11-14.json`. UEFA opplyser selv at squad-change-sidene er en praktisk informasjonskilde uten garanti for fullstendighet, og at klubbene selv har ansvar for å verifisere registreringene.

## Viktige migreringsvern
- Klubber med kamphistorikk, spillerhistorikk eller overføringer får ikke automatisk overskrevet eksisterende lagrede tropper.
- List B-spillere fra v3.63 blir beholdt under List A-migreringen.
- Doble navn slås bare sammen innen en klubb; like navn i ulike klubber fjernes ikke uten sterk identitetsmatch.
- Eksisterende spillerhistorikk og karriere-ID beholdes for allerede registrerte List B-spillere.

## Teststatus
- JavaScript-syntaks: kontrollert.
- UEFA-klubbregister: 36 + 36 + 36 klubboppføringer kontrollert.
- Snapshot: alle tre turneringsnøkler kontrollert mot `UEFA_2026_27`.
- List B: dublettkontroll innen hver klubb og versjonert idempotent migrering testet.
- ZIP-integritet: kontrollert etter pakking.
- Ingen live Supabase-test eller test av brukerens faktiske karrierelagring er utført.
