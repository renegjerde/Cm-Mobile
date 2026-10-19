# CM Mobile v2.19 — Second-yellow dismissals

## Changes in v2.19

- A player who receives a second yellow card in the same match is automatically shown a red card and sent off.
- The match event feed records the second yellow followed by a red card in the same minute.
- The dismissed player is removed from the active XI, their appearance ends, and the team continues with one fewer player.
- The manager substitution logic cannot bring a dismissed player back on.
- Straight red cards also remove the player from the active XI immediately.
- Existing season yellow-card accumulation and suspension tracking continue to apply.

## Validation

- JavaScript syntax checked.
- ZIP archive integrity checked.
- Sending-off logic reviewed in the live match engine; full browser match testing is still recommended.

## Install

Upload the contents of `CM_Mobile_v2.19/` to the intended location in your GitHub repository. The folder contains `index.html` and this `README.md`. If GitHub Pages publishes from the repository root, the live root `index.html` must still be updated separately.
