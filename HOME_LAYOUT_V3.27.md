# CM Mobile v3.27 — Dashboard layout change

## Request
Move the next-match section up so that it is visible on the first home-dashboard screen without scrolling past the manager alerts.

## Implementation
The home page order is now:
1. Manager profile / primary action
2. Next match card (including cup / European match state where applicable)
3. Important messages
4. Shortcuts
5. Financial / squad metrics
6. Recent news

Only the order of the rendered home-page sections and the version label were changed. Match data, navigation functions, notification generation and save behaviour are unchanged.

## Validation
- JavaScript syntax checked with Node.js.
- ZIP integrity checked.
- The source template order was programmatically verified.
- Not tested in a live browser with the user's career save.
