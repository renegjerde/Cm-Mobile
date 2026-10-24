# CM Mobile v3.20 — Stengte overgangsvinduer

## Feilscenario
Ved fullføring av GW2 ble AI-bud generert før spillet økte gameweek til GW3. Budene ble deretter vist som aktive selv om sommervinduet var stengt. Tilsvarende kunne skje ved GW23/GW24 i vintervinduet.

## Endring
- AI-bud som ellers først ville blitt presentert etter vindusstenging, genereres ikke i avslutningsrunden (GW2 og GW23). Dette gjelder vanlige spillere, europeiske kjøpere og juniorbud.
- Allerede ventende bud markeres som utløpt når spillet går ut av vinduet.
- Karrierer fra eldre versjoner ryddes automatisk ved visning, også hvis de inneholder gamle ventende bud.
- `respondTransferOffer` kontrollerer vindustatus på nytt før behandling, slik at et gammelt UI eller en direkte funksjonskall ikke kan gjennomføre et salg utenfor vinduet.
- Nye tilbud lagrer `seasonYear`, `calendarPhase`, `preseasonWeek` og `transferWindowKey` for entydig vindustilhørighet.

## Valgt spilleregel
Bud som ikke er behandlet før vinduet lukkes utløper. Det hindrer at manageren kan gjennomføre en overgang etter stengetid og gjør tilbudsinboxen samsvarende med statusen øverst i overgangsmarkedet.
