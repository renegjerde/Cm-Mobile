# CM Mobile – Player Quality Audit / v3.68

Dato: 15. november 2026  
Kildegrunnlag for baseline: opplastet `CM_Mobile_Player_Audit_2026-11-15.json`, merket `gameVersion: v3.66`, sesong 2026/27 uke 1.

## Viktig avgrensning
Dette er en analyse av den gamle v3.66-eksporten og en beskrivelse av de nye kontrollene som er lagt til i v3.68. Den gamle eksporten dokumenterer ikke at brukerens aktive karriere er migrert i v3.67. Derfor gjør v3.68 ingen automatisk endring av rating, attributter, PA, posisjoner eller identitet.

## Baseline-funn fra v3.66-eksporten
- 10 725 spillerregistreringer fordelt på sju registre. Dette er ikke 10 725 unike personer.
- 10 370 registreringer har `attributeModelVersion=v2.41 age-and-position curve` og `potentialModelVersion=v2.41 age-and-market signal`.
- 355 registreringer mangler modellversjon på både attributter og potensial. De ligger i `freeAgents` (221) og `youthAcademies` (134). Free-agent-registeret inkluderer både 100 genererte free-agent-prospekter og 121 tidligere akademispillere som er frigitt; derfor klassifiseres også sistnevnte med akademiets tierbaserte PA-kilde.
- 10 370 registreringer er uttrykkelig merket `attributesEstimated=true`. Profiltreff eller Transfermarkt-ID er dermed ikke bevis på at attributtene er observerte/faktiske.
- Registreringsvektet gjennomsnitt for rating er 59,17, potensial 63,79 og differansen PA−rating 4,62. Dette er ikke unik-spillervektet statistikk.
- 2 087 registreringer er 20 år eller yngre; 196 av disse har PA-headroom på 3 eller mindre. Dette er kandidater for vurdering, ikke automatisk feil.
- 3 595 registreringer er 28 år eller eldre; 12 har PA-headroom på minst 10. Disse bør kontrolleres, men kan ha individuell begrunnelse.
- 211 registreringer har en bred posisjonsgruppe/rolle-kombinasjon som ikke passer den konservative kompatibilitetslisten. Dette er et grovt flagg; det omfatter fleksible spillere og mulige kildeavvik, ikke 211 bekreftede feil.
- 13 GK-registreringer har `pos=GK` men rolle ulik `GK`, og 15 ikke-keeperregistreringer har `role=GK`. Disse bør prioriteres i en separat posisjonskontroll.
- 231 keeperregistreringer har enten handling eller reflekser under 50; dette er et profilkontrollsignal.
- 292 registreringer har svært flat spredning i de generelle utespillerattributtene (standardavvik under 3; keepere vurderes med keeperfeltene). Dette er ikke alene en feil.
- 21 registreringer har rollebasert ferdighetsindeks med absolutt avvik på minst 15 fra rating. Indeksen er samme vekting som kampmotorens rolleutvelgelse, ikke CA.

## Fordelinger fra baseline

| Posisjonsgruppe | Registreringer | Snitt rating | Snitt PA |
|---|---:|---:|---:|
| GK | 1 307 | 57,8 | 62,2 |
| DEF | 3 537 | 58,7 | 63,2 |
| MID | 3 423 | 59,3 | 64,0 |
| ATT | 2 458 | 60,4 | 65,2 |

| Aldersgruppe | Registreringer | Snitt rating | Snitt PA | Snitt PA-headroom |
|---|---:|---:|---:|---:|
| ≤17 | 384 | 59,6 | 72,4 | 12,8* |
| 18–20 | 1 703 | 60,3 | 69,6 | 9,3* |
| 21–23 | 2 227 | 60,0 | 66,5 | 6,6* |
| 24–27 | 2 816 | 60,5 | 64,1 | 3,6* |
| 28–31 | 2 289 | 57,9 | 59,1 | 1,2* |
| 32+ | 1 306 | 55,7 | 56,6 | 0,8* |

*Snitt headroom beregnet fra den opplastede eksporten; avrundet til én desimal.

## Hva v3.68 legger til
- Ny schemaVersion 2 på eksporten.
- `audit`-objekt per spillerregistrering med CA/PA-headroom, modellversjonskilde, rollebasert ferdighetsindeks, avvik fra rating, attributtspredning, posisjons-/rollekompatibilitet og revisjonsflagg.
- Aggregerte fordelinger per register, posisjon og aldersgruppe.
- Eksplisitte modellproveniensflagg for eldre generated free-agent- og academy-profiler uten metadata.
- Riktig `gameVersion: v3.68` i ny eksport.

## Anbefalt neste analyse etter v3.68-eksport
1. Verifisere at v3.67-migreringen faktisk er kjørt i den aktive karrieren.
2. Kontrollere alle `identity-or-attribute-review-required`-spillere først.
3. Gå gjennom keeperprofilene og de brede posisjon/rolle-avvikene.
4. Kalibrere rolle-relevante ferdighetsprofiler mot tilgjengelige, verifiserte spillerkilder.
5. Revidere PA etter alder, nivå, dokumentert talentstatus og observerbar spilletid – ikke markedsverdi alene.
6. Først deretter vurdere forsiktige justeringer og teste konsekvensene i simulerte sesonger.

## Testing av v3.68-leveransen
JavaScript-innholdet skal syntakskontrolleres med Node, ZIP CRC valideres, og eksportfunksjonene testes på syntetiske fixtures. Dette er ikke en live-nettlesertest, kampmotortest eller test mot en live Supabase-save.
