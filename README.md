# CM Mobile v3.12

## Cross-border loan integration
- Loan-in market flow now explicitly supports players from the integrated club world, including European clubs represented in `worldSquads`, alongside separately indexed EFL clubs.
- Added a duplicate-career-identity guard before taking a player on loan, preventing the same career from being added twice to the manager's squad.
- The outgoing-loan dialog now identifies itself as drawing from the combined club market, including European destinations.
- Existing wage-share, loan-fee, duration, loan-return and transfer-history systems are retained.

## Files
- `index.html` — game
- `README.md` — version notes
- `CROSS_BORDER_LOANS_V3.12.md` — focused change log and known limitations

## Validation
JavaScript syntax and ZIP integrity are checked with Node.js and `unzip -t`. No full interactive browser playthrough has been performed.
