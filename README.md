# CM Mobile v3.29

## Endringer
- Fjernet den ekstra «Sett opp laget»-knappen fra managerprofilen. Den eneste primære kampforberedelsesknappen ligger nå i kortet for neste kamp, rett ved siden av den aktuelle kampen.
- Lagt til aktuell tabellplassering og de fem siste registrerte resultatene for begge lag i kortet «Neste ligakamp».
- Europacupens ligafase viser plassering fra riktig europeisk ligatabell og lagets form i den samme europeiske konkurransen.
- Cupkamper uten ligatabell viser ikke en misvisende tabellplassering. Der vises nylig form hvis det finnes registrerte resultater.
- Form og plassering hentes fra den aktuelle divisjonens data. Lavere divisjoner bruker egne tabell- og kamploggdata, og vises derfor ikke feilaktig uten form.
- Kampforberedelseskortet på taktikkbildet følger samme regel for når en tabellplassering faktisk finnes.

## Publisering
Pakk ut arkivet og erstatt `index.html` i rotmappen på GitHub Pages (`main`) med filen fra denne versjonsmappen.

## Tester
- Begge JavaScript-blokkene er validert med `node --check`.
- Isolerte tester dekker plassering og fem siste resultater fra hovedligaen, form fra en lavere divisjons kamplogg, europeisk ligatabell/form og at tabellplassering skjules i cup-/sluttspillfaser uten tabell.
- Statiske kontroller bekrefter at Oversikt bare har én «Forbered laget»-handling, plassert i neste-kamp-kortet.
- ZIP-arkivet er validert.
- Full interaktiv nettlesertest med karrierelagringen er ikke utført.
