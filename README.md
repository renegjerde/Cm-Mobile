# CM Mobile v1.87

## Endringer
- Bevarer ligafasekampene fra v1.86 ved oppgradering av lagrede karrierer.
- Legger til knockout-system etter ligafasen: playoff (plass 9–24), åttedelsfinaler, kvartfinaler, semifinaler og finale.
- Playoff og alle rundene fram til semifinalen er tobeinte. Finalen spilles over én kamp.
- Brukerens knockoutkamper bruker den eksisterende live-kampmotoren. Motstanderoppgjør simuleres, og den aktive tie-en venter på brukerens resultat før returkampen eller neste runde behandles.
- Oppgjør avgjøres på samlet resultat; ved likt sammenlagtresultat avgjøres tie-en med straffesparkkonkurranse i denne modellversjonen.
- Sluttspillvisningen viser kampresultater, leg/retur, sammenlagtresultat og hvem som går videre.

## Viktige avgrensninger
- Ligafasetrekning/deltakerlister er fortsatt en spillmodell og ikke offisiell UEFA-kvalifisering.
- Ved uavgjort sammenlagt avgjøres tie-en med straffespark etter de to kampene; ekstraomganger etter returoppgjøret er ikke modellert separat. Finalen kan bruke eksisterende ekstraomgangsflyt.
- Hele spillet må fortsatt gjennomgås i nettleser med en kopi av brukerens karriere før publisering.

## Publisering
ZIP-en inneholder `cm_mobile_v1_87/index.html` og `cm_mobile_v1_87/README.md`. Hvis GitHub Pages publiserer fra `main`-rot, må rotens `index.html` oppdateres separat; versjonsmappen i ZIP-en publiseres ikke automatisk.
