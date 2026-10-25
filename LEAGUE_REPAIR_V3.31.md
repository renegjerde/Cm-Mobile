# League system repair — v3.31

## Root cause addressed
The career picker and primary league engine used `CLUBS`, while EFL divisions were maintained separately in `EFL_DIVISIONS` and `appState.lowerLeagues`. The base reset also deleted division metadata, making a shared registry impossible.

## Changes
1. Added `ensureCanonicalDomesticClubRegistry()` to register every domestic club in `CLUBS` with a stable canonical name and explicit division.
2. Fixed baseline reset and division lookup to retain explicit divisions.
3. Corrected registry audits to distinguish PL clubs from EFL clubs in the unified registry.
4. The manager's active division is simulated by the main match engine only; the secondary EFL simulator now synchronizes the live table into its season data instead of simulating those fixtures again.

## Remaining verification
Run browser-level checks for starting a career in each division, generating 46-match EFL schedules and 38-match Premier League schedules, playing and simulating rounds, cup registration, finances, transfers, and end-of-season promotion/relegation.
