# CM Mobile v1.91

## Endringer siden v1.90 – økonomi
- Rettet årsaken til at overgangsbudsjettet falt uke etter uke: lønn ble trukket direkte fra overgangsbudsjettet, mens det ikke fantes noen ukentlige driftsinntekter.
- Lagt til forenklede ukentlige driftsinntekter fra TV-/medieavtaler, sponsorer, kampdag og kommersielle inntekter. Inntektene skaleres etter divisjon og klubbens styrke.
- Alle Premier League-klubber får nå ukentlige inntekter og betaler lønn for sin egen spillerstall; øvrige klubbers budsjetter oppdateres også løpende.
- AI-overganger flytter nå overgangssummen fra kjøper til selger, i stedet for at pengene forsvinner ut av økonomisystemet.
- Ved salg til en AI-klubb trekkes kjøpesummen fra kjøperens budsjett. Ved kjøp fra en Premier League-klubb går overgangssummen til selgerklubben.
- Økonomisiden viser driftsinntekter og netto drift per uke i tillegg til lønn og overgangsbudsjett.
- Eksisterende karrierer beholdes; økonomien migreres uten å nullstille managerens nåværende overgangsbudsjett.

## Modell og avgrensninger
- Dette er en forenklet spillmodell, ikke en full regnskapsmodell. Inntektene er gjennomsnitt per gameweek og representerer TV-/medieinntekter, sponsorinntekter, kampdag og kommersielle inntekter samlet.
- Inntektsnivået er satt høyere for større divisjoner, men ukentlig netto påvirkes fortsatt av den faktiske spillerlønnen.
- Klubbenes budsjetter kan fortsatt gå ned hvis lønnsutgiftene er høyere enn inntektene, eller etter dyre overganger.
- Ekstern visuell nettlesertest er ikke kjørt i dette miljøet.

## Teststatus
- JavaScript-syntakskontroll med Node.js.
- Kontroll av at v1.91 inneholder både index.html og README.md i egen versjonsmappe.
- Beholder turneringsoppsett, kampmotor og europeiske klubbmerker fra v1.90.
