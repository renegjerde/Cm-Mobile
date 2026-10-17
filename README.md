# CM Mobile v1.74

## Endring i denne versjonen
- Assistentens taktiske vurdering skjer også ved 65, 75, 85 og 90 minutter.
- I «Kun ved behov»-modus reagerer assistenten nå på ethvert underskudd fra 75. minutt, også når laget bare ligger under 0–1.
- Ved uavgjort fra 85. minutt kan assistenten gå mer offensivt for å jakte vinnermål.
- Ved komfortabel ledelse sent i kampen forsøker assistenten fortsatt å beskytte resultatet.

## Begrensning / testing
JavaScript-syntaksen er kontrollert med `node --check`. Dette er ikke det samme som en full nettlesertest av kampbalansen.

## Publisering
Pakk ut ZIP-filen og last opp `cm_mobile_v1_74/index.html` som rotfilen `index.html` i `main`-grenen dersom GitHub Pages publiserer fra rot.
