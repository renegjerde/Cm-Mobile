# CM Mobile v2.60 – EFL loan-in lifecycle

## Endringer
- Overgangsmarkedet kan nå starte lån fra EFL-spillerpoolen i tillegg til Premier League-klubber.
- Låneavtalen lagrer `loanParentType` og `loanParentDivision` for EFL-opphav.
- Ved utløp flyttes spilleren tilbake til riktig divisjon og klubb i `eflPlayerDatabase`, med identitetsbasert deduplisering.
- Låneavgiften belastes brukerklubben. EFL-klubbens budsjett endres ikke, siden EFL-klubbøkonomi ikke er modellert på samme måte som PL-klubbøkonomi.

## Validering
- JavaScript-syntakskontroll for alle inline-scriptblokker.
- ZIP-integritetskontroll.
- Statisk kontroll av EFL-lån-inn og returgrenene.
- Dette er ikke en full nettleser-/end-to-end-test, og en hel sesong er ikke simulert.
