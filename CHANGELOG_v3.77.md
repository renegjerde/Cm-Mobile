# CM Mobile v3.77 – European AI Transfer Market

## Added
- Expanded autonomous international transfers to include European-to-European moves.
- EFL clubs represented in the canonical lower-league player database can now buy from and sell to European AI clubs.
- Premier League, EFL and European AI clubs share a common positional-need and squad-surplus transfer selection path for international moves.
- Transfer selection checks roster capacity, positional need, player quality relative to buyer strength, surplus at the selling club, available transfer budget, active loan status and current-window movement.
- International transfers preserve career identity, CA, PA, attributes, career history and player statistics while assigning a destination-specific roster ID.
- EFL transfer budgets are synchronized to both the lower-league club row and the club-finance record.
- Transfer history now records source/destination market types for international AI moves.

## Preserved
- Manager-controlled club is excluded from autonomous domestic participant entries.
- Existing domestic AI transfer flow remains intact.
- Existing manual transfer workflow remains intact.
- No player generation, CA/PA recalibration, mass rebalance or identity rewrite.
- No database schema or SQL changes.

## Validation
- Seven targeted scenarios: Europe-to-Europe, EFL database-to-Europe, Europe-to-EFL database, Europe-to-Premier-League, canonical EFL world-squad-to-Europe, Europe-to-canonical-EFL-world-squad, and manager-club exclusion/domestic-market coverage.
- Each transfer scenario verifies exactly one canonical career-identity copy after the move and preserves CA/PA.
- Previous v3.72 transfer/development, v3.73 planning, v3.74 academy, v3.75 loan and v3.76 European academy/loan-monitor suites rerun.
- All three inline JavaScript blocks pass `node --check`.
- Release ZIP CRC/integrity verified.

## Limitations
- The AI market uses controlled, positional-need-driven transfer attempts rather than a full negotiation/agent/contract bidding simulation.
- International AI transfer activity is limited to the clubs represented in the game's persistent European transfer rosters and canonical PL/EFL rosters.
- No full browser UI test or Supabase round-trip test is claimed.
