# Taktisk rolle-redigering og formasjonstilpasning — v2.73

## Endringer
- La til lagret, spillerbasert `tacticalRoleOverrides` i karrieredataene. Egendefinerte roller brukes hver gang spillets startellever lastes/renderes på nytt.
- I panelet etter at man trykker på en spiller finnes nå en nedtrekksliste for taktisk rolle, inkludert «Automatisk – [standardrolle]».
- Egendefinerte roller endrer spillerens `assignedRole`, rollefit-beregning og rollebaserte vurderinger i kampmotoren.
- Banevisningen legger spillere med egne rollevalg i den relevante linjen. Hvis for eksempel AM ikke finnes i grunnformasjonen, kan det settes inn en egen offensiv midtbanelinje.
- Lagbalansevarsler gir nå ekstra beskjed når rollevalg avviker fra formasjonens standardroller, og når mange/få angreps- eller midtbanespillere skaper en sannsynlig skjevhet.
- Ved ny formasjon, ny assistentanbefaling eller rotasjon nullstilles individuelle rolleoverstyringer med hensikt, slik at den nye standardelleveren ikke arver uforenlige rollevalg. Vanlig navigasjon/ny rendering i samme kamp beholder manuelle roller.
- Bytter direkte på banen fjerner rolleoverstyring for de involverte spillerne, slik at de arver rollene til plassene de bytter inn i.

## Bakoverkompatibilitet
- Eksisterende lagringsdata uten `tacticalRoleOverrides` migreres automatisk til et tomt objekt ved behov.
- Ingen endring i save-formatets overordnede versjon og ingen eksterne avhengigheter.

## Kontrollert
- JavaScript-syntaks kontrollert med Node.js for alle innebygde skript.
- Statisk kontroll av rollevalg-hendelse, lagring, formasjonstilbakestilling, rad-layout og lagbalansevarsler.
- ZIP-arkivets CRC/integritet validert.

## Ikke utført
- Full nettleserbasert ende-til-ende-test er ikke utført. Derfor er berøringsinteraksjon, dynamisk baneplassering og lagret karriere ikke hevdet som fullstendig visuelt verifisert.
- Rollefit og strukturvarsler er heuristikker, ikke en full taktisk simulering.
