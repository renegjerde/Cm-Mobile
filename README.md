# CM Mobile v2.02

## v2.02 – overgangsliste beholder valgt tilstand
- «Din overgangsliste» husker om brukeren har den åpen eller lukket.
- Når en spiller legges ut for salg eller tas av markedet, beholdes den valgte tilstanden etter at overgangssiden tegnes på nytt.
- Dette gjør det mulig å legge flere spillere ut for salg etter hverandre uten å åpne seksjonen på nytt.
- Seksjonen er fortsatt lukket som standard ved en ny sidelasting/ny økt.

## Prioriterte endringer

### 1. Fire ukers pre-season
- Nye karrierer starter med fire pre-season-uker før første obligatoriske ligakamp.
- Hver uke avsluttes fra Oversikt eller Taktikk. Ligarunden står på uke 1 gjennom hele oppkjøringen.
- I perioden kan manageren hente og selge spillere. Spillerne restituerer seg, og laget bygger gradvis samspill og formasjonskunnskap.
- Seriekamper kan ikke startes mens pre-season pågår.
- Når en sesong er ferdig, starter neste sesong med fire nye pre-season-uker.
- Eldre lagringer med sesongen allerede i gang blir ikke sendt bakover i kalenderen. En urørt lagring på første ligarunde blir migrert til pre-season; ellers gjelder endringen fra neste sesong.

### 2. Tre formasjoner i trening
- Manageren velger tre ulike formasjoner under Taktikk.
- Formasjonene bygges gradvis inn gjennom pre-season og kampsesongen.
- Formasjonen som faktisk brukes i kamp, får en ekstra erfaringsøkning.
- Assistentens anbefaling velger bare blant de tre formasjonene manageren har satt opp. Manageren kan fortsatt overstyre og velge en annen formasjon til den enkelte kampen.

### 3. Spilletid, utvikling og aldring
- Unge spillere med potensial utvikler seg med større sannsynlighet når de får kampminutter. Benk og manglende spilletid gir betydelig lavere utviklingsmulighet.
- For eldre spillere reduserer høy spilletid fra forrige sesong sannsynligheten for ferdighetsfall. Naturlig aldersnedgang er fortsatt mulig.
- Utvikling og aldring beregnes gradvis; én kamp gir ikke automatisk en stor ferdighetsøkning.

### 4. Pensjonering og junioropprykk
- Spillere som legger opp fjernes fra troppen uten at det genereres automatiske «Academy Promotion/Prospect»-erstattere.
- En ledig plass i troppen blir stående åpen til manageren foretar en beslutning.
- Juniorstallen har en egen «Hent opp til førstelaget»-handling for spillere som er minst 16 år. Spilleren flyttes fra juniorstallen til førstelaget først etter bekreftelse.
- Manageren kan i stedet fylle plassen via overgangsmarkedet.

## Videreført fra v2.00
- Sammenleggbar «Din overgangsliste» på overgangssiden, lukket som standard.
- Spillermarkedsfilter og søk.
- Avgrenset, innebygd spillerregister og funksjonen «Roter troppen».

## Teststatus
- Kontrollert at HTML-markupen inkluderer en vedvarende tilstandsvariabel på accordionen, og at `listPlayerForTransfer()` kan kalle `render()` uten å tilbakestille åpen/lukket status.
- JavaScript-syntaks kontrollert med Node.js.
- JavaScript-syntaks kontrollert med Node.js.
- 13 isolerte logikk- og UI-markup-tester bestått: pre-season-progresjon, uendret ligarunde, formasjonsvalg/erfaring, junioropprykk, tomme plasser ved pensjonering og blokkering av obligatorisk kamp under pre-season.
- Full visuell nettlesertest av hele spillet er ikke bekreftet. Test gjerne en kopi av karrierelagringen før videre bruk.

## Pakkeinnhold
- `CM_Mobile_v2.01/index.html`
- `CM_Mobile_v2.01/README.md`
