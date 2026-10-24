# Cross-border loans — v3.12

### Included
- Loan-in selection uses the existing integrated player market, which includes clubs represented in the shared `CLUBS` / `worldSquads` world as well as EFL rosters.
- European parent clubs use the same loan fee, wage-share, contract dates and return-to-parent mechanism as other integrated world clubs.
- A duplicate career identity check blocks loaning in a player whose career already exists in the user's squad.
- The outgoing loan modal describes the destination list as the combined club market, including European clubs.

### Existing behavior preserved
- Transfer-window checks remain in place.
- Loan duration, fee, wage share, transfer history and return dates use the existing loan system.
- EFL parent clubs remain separately indexed and use the existing EFL return path.

### Limitations
- This version does not add autonomous AI-to-AI loan negotiations or automated loan offers from European clubs; loans are still initiated by the manager through the existing market.
- Full interactive browser testing has not been performed. JavaScript syntax and archive integrity are validated separately.
