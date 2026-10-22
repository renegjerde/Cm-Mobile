# CM Mobile v2.98

Denne versjonen retter Gabriele Biancheris posisjon og tetter en feil i overgangssystemet som kunne gjøre det mulig for en spiller å bli solgt videre til en tredje klubb i samme overgangsvindu.

## Endringer
- Gabriele Biancheri er eksplisitt registrert som angrepsspiller (ATT), med spiss (ST) som primærrolle og ST/LW/RW som naturlige roller.
- Eksisterende lagringer korrigeres automatisk uten å kreve ny karriere.
- AI-overganger bevarer stabil karriereidentitet selv når den tekniske spiller-ID-en endres.
- En spiller kan kun flytte én gang per overgangsvindu. Dette gjelder både AI-handler og managerens kjøp/salg.
- Spillere som allerede har flyttet i vinduet, blir skjult fra markedet til neste vindu.
- Ved salg blir andre ventende bud på samme spiller utløpt, og spilleren fjernes fra selgerklubb etter stabil karriere-ID.

## Start
Pakk ut ZIP-filen og åpne `CM_Mobile_v2.98/index.html`. Lagrede karrierer fortsetter som før; du trenger ikke starte på nytt.

Se `Biancheri_and_transfer_identity_v2.98.md` for mer teknisk detalj.

## Kontroll
- Inline JavaScript-syntaks kontrollert med Node.js.
- Isolert test bekreftet at Biancheri-korrigeringen oppdaterer både posisjon/rolle og en gammel keeperbasert attributtprofil.
- Overgangsfunksjonen ble kjørt med testtropp: ingen spilleridentitet flyttet to ganger i samme vindu, og hver flyttet identitet ble stående i én klubb.
- Aksepttest for bud bekreftet at et godkjent bud utløper andre ventende bud på samme spiller, fjerner spilleren fra selgerens tropp og bevarer karriere-ID ved kjøper.
- Full visuell nettlesertest ble ikke fullført i dette miljøet.
