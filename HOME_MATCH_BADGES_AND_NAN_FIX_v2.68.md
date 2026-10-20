# Home match badges and NaN fix — v2.68

## Changes
1. Added compact badge/logo slots to both teams in the home dashboard's upcoming match card.
2. Reuses existing club logo URLs for Premier League clubs. Where a club has no logo URL in the current data, the UI displays initials as a fallback. Cup fixtures use the same helper.
3. Fixed the league-match metric's malformed expression. Previously `'Av '+activeLeagueClubs().length*2-2+' mulige'` was evaluated left-to-right, so it attempted arithmetic on a string and produced `NaN`. It now calculates the numeric total first and displays e.g. `Av 38 mulige` for a 20-team league.
4. Guards the played-match count against missing/non-numeric values.

## Validation
- All inline JavaScript blocks passed `node --check`.
- ZIP integrity passed `ZipFile.testzip()`.
- Full browser visual test and full season test were not performed.
