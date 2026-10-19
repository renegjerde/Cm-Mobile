# CM Mobile v2.03 — Touchline Edition

## Nytt i v2.03

### Klubbløse spillere / overgangsmarked
- Eksisterende klubbløse spillere beholdes mellom sesongene i stedet for at listen slettes og bygges helt på nytt når den blir liten.
- Ved nytt sesongskifte oppdateres alderen i den eksisterende frie spillerpoolen, spillere over 37 år fjernes, og det opprettes 20 nye klubbløse spillere.
- Juniorer som går ut av akademiet fordi de er blitt eldre enn 18 år, frigjøres til det klubbløse markedet dersom de har vært minst én hel sesong i juniorstallen.

### Juniorakademi
- Managerens klubb har en struktur på 25 spillere fordelt på 3 keepere, 8 forsvarere, 8 midtbanespillere og 6 angripere.
- Akademiet får en blanding av sjeldne stortalenter, store talenter, lovende talenter og utviklingsspillere.
- Andre klubber har et mindre akademi/pipeline for å begrense størrelsen på spillverdenen og lagringsdataene.
- Ledige plasser fylles bare ved sesongskifte; de fylles ikke automatisk midt i sesongen.
- En junior kan ikke hentes opp av manageren før han har vært minst én hel sesong i akademiet. Opprykk krever en uttrykkelig handling og bekreftelse fra manageren.
- Når en junior blir eldre enn 18 år etter å ha oppfylt minimumstiden, frigis spilleren på fri transfer i stedet for å bli lagt automatisk i A-stallen.
- Kvalifiserte juniorer i andre klubbers akademier kan bli kjøpt, og AI-klubber kan gi bud på kvalifiserte spillere i managerens akademi.

### Lagring
- Karrieredata lagres komprimert (`CMZ1:`) for å redusere belastningen på nettleserens lokale lagring.
- Eldre, ukomprimerte JSON-lagringer kan fortsatt leses.
- Lagreknappen varsler dersom lagringen faktisk feiler.

### Videreført fra tidligere versjoner
- Fire ukers pre-season.
- Tre treningsformasjoner med gradvis innarbeiding.
- Spilletid påvirker utvikling og aldersrelatert nedgang.
- Ingen automatisk juniorforfremmelse ved pensjonering.
- Sammenleggbar egen overgangsliste som beholder brukerens åpne/lukkede valg.

## Testing

Kontrollert i Chromium med en mobil viewport:
- JavaScript-syntaks for begge scriptblokkene.
- Juniorfordeling 3–8–8–6 og totalt 25 i managerens akademi.
- Aldersgrense, minimumstid og frigjøring på fri transfer ved sesongskifte.
- Ingen automatisk påfyll av juniorstallen midt i sesongen.
- Kjøp og salg av kvalifiserte akademispillere.
- Komprimering/dekomprimering og lesing av eldre JSON-lagring.

Dette er isolerte nettleser- og logikktester, ikke en full ende-til-ende-test av alle karrieresituasjoner på publisert GitHub Pages.
