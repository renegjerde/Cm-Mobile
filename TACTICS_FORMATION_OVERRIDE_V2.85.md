# Taktisk formasjonsoverstyring — v2.85

## Feilretting

- Rettet feilen som gjorde at formasjonvelgeren tilsynelatende ikke lot brukeren velge en annen formasjon. Endringsbehandleren satte tidligere `recommendationRound` til `null`; neste rendering kjørte assistentanbefalingen på nytt og overskrev brukerens valg umiddelbart.
- Manuelle formasjonsskifter nullstiller ikke lenger markøren for gjeldende kampuke. Derfor blir valgt formasjon og den rollebaserte elleveren stående når grensesnittet tegnes på nytt.
- Assistentens forslag kan fremdeles kjøres eksplisitt via «Be assistenten vurdere på nytt». Når neste kampuke klargjøres, kan en ny anbefaling gis som før.
- Kampplanen viser nå assistentens opprinnelige forslag og forklarer at formasjonen er manuelt overstyrbar.

## Teststatus

- Endret selector-handler bekreftet å bevare anbefalingsmarkøren i stedet for å trigge automatisk tilbakestilling.
- JavaScript-syntaks (`node --check` på begge innebygde skript) bestod. ZIP-integritet og forventet mappestruktur bestod.
- En automatisk Chromium-røyketest stoppet på tidsavbrudd før DOM-utdata; derfor er interaksjonen ikke fullstendig ende-til-ende-bekreftet i nettleser. Den konkrete overskrivingsårsaken er bekreftet i hendelseslogikken og rettet.
