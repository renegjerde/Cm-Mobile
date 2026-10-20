# CM Mobile v2.53 — Karriereprofilvalidering

## Implementasjon
- Spillerens utvidede troppsrad har en knapp for å åpne karriereprofilen.
- Profilen presenterer arkiverte sesonger, klubb, kamper, minutter, mål, assists og kort.
- Konkurransestatistikk summeres fra arkiverte sesonger og den pågående sesongen.
- Samlet karrierestatistikk viser arkiverte karrieretall pluss gjeldende sesong.
- Registrerte overgangshendelser vises som en separat historikktabell.

## Validering
- HTML/JavaScript-kildens inline script-blokker kontrolleres med Node.js syntax checker.
- ZIP-arkivet kontrolleres for integritet.
- Det er ikke utført full nettlesertest eller full karrieresimulering i denne leveransen.

## Kjente begrensninger
- Historikk fra sesonger før arkivering ble implementert kan ikke gjenskapes automatisk.
- Overgangshendelser er basert på lagret `transferHistory` og spillernavn, og kan derfor mangle eldre eller navneendringsrelaterte overganger.
- Karrieresiden er først og fremst tilgjengelig fra spillerens utvidede rad i managerens egen tropp; en generell global spillerprofilsøker er ikke del av denne versjonen.
