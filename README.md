# CM Mobile v3.32

Åpne `index.html` i en moderne nettleser. Dette er en selvstendig HTML-app.

## Viktig endring i v3.32
Denne versjonen prioriterer korrekt ligatabell og korrekt sesongregnskap. Ved mistanke om korrupte kamptall forsøker den å rekonstruere tabellen fra kampresultater merket med gjeldende sesong. Hvis historikken ikke er tilstrekkelig, starter den inneværende sesongen på nytt, inkludert ligaregister, cupturneringer og sesongstatistikk fremfor å vise feil kamptall. Eldre karrierer kan derfor måtte starte ligasesongen på nytt.

Resultatføring har en unik kampnøkkel, og ligatabellen valideres mot aktiv sesong ved hver visning.

Se `LEAGUE_SYSTEM_REPAIR_V3.32.md` for endringslogg og testavgrensninger.
