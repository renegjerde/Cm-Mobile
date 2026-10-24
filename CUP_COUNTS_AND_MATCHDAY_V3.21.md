# Cup counts and matchday flow — v3.21

## Why the figures were inconsistent

### FA Cup

The 2026/27 baseline is 124 entries: 20 Premier League clubs, 72 clubs from the Championship/League One/League Two, and 32 selected non-league entrants. The saved competition showed 121 clubs at stage 0/8, which meant the saved participant list no longer matched the untouched baseline. Since there were no played rounds or results, v3.21 safely rebuilds that list to 124.

### Carabao Cup

After the first three stages, the 2026/27 format expects:

- Preliminary stage: 2 matches.
- First round: 35 matches.
- Second round: 23 matches.
- Total: 60 matches played.
- Survivors: 32 clubs (23 winners from stage 3 plus nine Premier League clubs entering at stage 4).

The game displays “3 of 9 stages completed” while the current pending fixture is called the “Third Round”. This is correct: preliminary, first round and second round are the three completed stages; the third round is stage 4 in the internal stage numbering. The saved data had only 31 clubs at this point, so one surviving participant was missing.

The migration checks the stage, pending fixture, 60 distinct played matches, 23 stage-three winners, nine later-entry teams and that both pending teams belong to the reconstructed pool before applying the correction. It then regenerates only the unplayed stage-four draw. Already played results remain untouched.

## Matchday flow

- A pending domestic cup or European fixture occupies the same main “next match” panel as the league fixture.
- The same fixture no longer creates a second urgent alert under “Viktige meldinger”. Injuries, suspensions, offers and other actionable notices remain there.
- The match result button returns cup/European matches to Oversikt. Season-completion navigation for a final league fixture remains unchanged.
- Domestic cup match counts exclude BYE entries and duplicate rows; they count distinct real fixtures by stage, leg and home/away pairing.

## Validation notes

The file passes Node.js syntax checks. An isolated test with the exact v3.21 helper functions verified the two registration repairs and preservation of all 60 Carabao Cup match rows. The actual browser session and the user's stored career have not been interactively tested here.
