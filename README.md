# CM Mobile v1.13

## Match-statistics and substitution UI fixes
- Match statistics use the same home-away order as the score, including when the user's team plays away.
- Final statistics enforce the invariant: goals cannot exceed shots on target, and shots on target cannot exceed total shots.
- The inline substitution curtain lists all available substitutes in the outgoing player's exact position, sorted by rating.
- Tapping an on-pitch player opens/keeps the substitute curtain directly below that player.

JavaScript syntax check passed. The full match flow still needs testing in the mobile browser.
