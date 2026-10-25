# Tabell og lavere divisjoner – v3.28

## Hvorfor divisjonsvelgeren ikke virket

`ensureFixtures()` satte `appState.leagueTableDivision` tilbake til `Premier League` ved hver rendering i 2026/27. Når du valgte en annen divisjon, førte `render()` derfor valget umiddelbart tilbake til Premier League. v3.28 skiller mellom divisjonen manageren spiller i (`activeDivision`) og tabellen brukeren vil se (`leagueTableDivision`), og bruker en egen `setLeagueTableDivision()`-funksjon for valget.

## Kamper i lavere divisjoner

Championship, League One, League Two og National League simuleres fremdeles automatisk etter at en ligakamp er ferdig. Kalenderen skalerer 46 runder i lavere divisjoner mot 38 Premier League-runder:

- Etter fullført Premier League-runde 20: `floor(20 × 46 / 38) = 24` runder i de lavere divisjonene.
- Etter fullført Premier League-runde 21: `floor(21 × 46 / 38) = 25` runder.

De lavere divisjonene spilles altså i bakgrunnen; manageren spiller kampmotoren for sin egen klubb.

## Ekstra feil som ble funnet

Skjermbildet viste at enkelte lag hadde 29 kamper spilt mens manageren var ved runde 21. Det kan skyldes at AI-kampene i en Premier League-runde ble simulerte mer enn én gang hvis brukerens kamp ble startet på nytt før den var fullført. v3.28 lagrer de ni AI-resultatene på serierunden og gjenbruker dem ved nytt forsøk.

For en eksisterende 2026/27-lagring forsøker versjonen å bygge Premier League-tabellen på nytt fra unike, lagrede kampresultater bare når tabellen er tydelig inkonsistent og hele de fullførte rundene kan verifiseres mot kampprogrammet. En delvis lagret AI-runde beholdes hvis alle ni AI-resultater finnes. Hvis loggen er ufullstendig, blir tabellen ikke automatisk skrevet om.

Korrigeringen tar også høyde for en eldre loggfeil: når managerens klubb spilte borte, kunne lagrede hjemmemål og bortemål byttes om. Fremtidige kampresultater lagres nå med riktig hjemme-/borteorientering.

## Validering

- Begge JavaScript-blokkene er sjekket med Node.js.
- Isolert test: 20 klubber × 4 fullførte runder ble gjenoppbygd fra 40 unike kamper; alle tabellverdier stemte med kamphistorikken, inklusive en test av den eldre bortescorefeilen.
- Divisjonsvalget er kontrollert statisk, og nedre divisjoners forventede rundeindeks ble testet.
- Full interaktiv nettlesertest med brukerens faktiske karrierelagring er ikke utført.
