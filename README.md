# CM Mobile v3.54 — Player ability balance

## Update
This release adjusts the current ability of the embedded Premier League first-team U21/prospect supplements. Young players can retain high potential without being rated as finished senior players from the opening day.

## Changes
- Adds age-based current-ability ceilings for U21 prospects: age 16 and under 64; 17: 68; 18: 72; 19: 76; 20: 80; 21: 84.
- Keeps potential separate from the current-ability adjustment; potential and development headroom are not directly reduced by this cap.
- Retains explicit exceptions for a small set of highly established young players (including Kobbie Mainoo, Leny Yoro, Rico Lewis, Lamine Yamal, Warren Zaïre-Emery, Jude Bellingham, Jamal Musiala and others).
- Bumps player database version to 28 so the game can refresh the relevant embedded player database in a career.

## Notes
The age ceiling applies to players identified as first-team U21/prospect supplements. It does not apply indiscriminately to every player aged 21 or younger, and it does not alter ordinary senior roster players. Potential remains a separate field.

## Validation
- JavaScript syntax check: passed for both inline scripts with Node.js.
- ZIP integrity check: passed after packaging.
- A full interactive browser test and broad player-by-player realism review are not claimed in this package.

## Deploy to GitHub Pages
Replace the repository-root `index.html`, `VERSION.txt`, and `README.md` with the files in this package, then commit/push to the configured publishing branch. Wait for Pages to deploy and reload the app. This package does not publish to GitHub automatically.
