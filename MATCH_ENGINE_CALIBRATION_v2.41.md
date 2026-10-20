# Match engine calibration — v2.41

## Why
The v2.40 test harness showed approximately 0.8 goals per match in evenly matched synthetic teams and a 95% home-win rate in a large mismatch. These are warning signals from the isolated harness, not validated in-game season statistics.

## Adjustments
- Increase chance-generation frequency modestly.
- Increase the baseline chance quality, while narrowing the random quality range and reducing the coefficient for team attack/defence gap.
- Make shots-on-target probability less steeply dependent on finishing.
- Reduce the keeper-save coefficient's strength while preserving its direction.
- Reduce the effect of attack/defence mismatch on which side receives a chance and narrow its bounds.
- Slightly lower the final conversion multiplier to keep the increased chance volume from causing runaway scoring.

## Validation target
Re-run the same fixed-seed batches. Look for more goals in evenly matched games and a less extreme win rate in mismatches, while ensuring the stronger side still wins more often.

## Limits
The harness stubs some UI and match state. Its numbers should guide iteration, not be presented as definitive real-world calibration.
