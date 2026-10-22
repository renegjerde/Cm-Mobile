# CM Mobile v2.92 — FA Cup semifinale- og finaleflyt

- Rettet cupkalenderen slik at forfalte cuptrinn behandles selv om spillet har hoppet over den eksakte planlagte spilluken.
- FA Cup fortsetter nå fra kvartfinalen til semifinaler og finale, og krones med vinner når siste trinn er avgjort.
- Forfalt cupflyt blir forsøkt hentet inn både når midtukekalenderen behandles, ved åpning av cupoversikten og i sesongoppsummeringen. Dette reparerer også lagringer som allerede står på 6/8 trinn med fire lag igjen.
- Hvis spillerens klubb er involvert i en manglende semifinale eller finale, opprettes kampen som ventende managerkamp i stedet for at den simuleres bort.
- Kampresultater og kampdatoer for AI-oppgjør føres til det planlagte cuptrinnet. Ny sesong kan ikke starte før en ventende FA Cup-/Carabao Cup-kamp er spilt.
- Endringen gjelder også catch-up i Carabao Cup, slik at forfalte semifinaleben og finale ikke blir hengende dersom en spilluke ble hoppet over.

Validering: JavaScript-syntaks, cupstrukturen og isolert catch-up-test for en FA Cup som står etter kvartfinalen (runde 6, fire lag igjen).
