# CM Mobile v1.46 — Named substitution events

- Replaces generic automatic-substitution summary messages with one event per actual player change.
- Each event names the incoming and outgoing player, minute, reason, match rating/fatigue context, and substitution count.
- Records automatic substitutions in the same persistent match substitution history used by the lineup markers.
- Shows substitution markers on player rows in the live lineup and on the bench/history where applicable.

Upload this version's `index.html` to the repository root used by GitHub Pages. The ZIP's version folder is an archive and is not the live root page.

Validation: JavaScript syntax checked with Node.js. Full end-to-end mobile browser testing has not been performed.
