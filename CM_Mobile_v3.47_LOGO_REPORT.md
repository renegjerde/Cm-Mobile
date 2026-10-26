# CM Mobile v3.47 — logo registry update

## Implemented

- Added explicit SVG source mapping for the 24 English National League club names used in the game.
- Normalized game aliases resolve to the same asset (e.g. Gateshead/Gateshead FC, Woking/Woking FC, Barrow/Barrow AFC).
- Resolver priority is PL/EFL PNG source → mapped National League SVG → any existing club-provided logo → football-data.org crest ID → generated SVG fallback.
- `clubLogoCoverageAudit()` now counts `english-national-league-svg` as a mapped source; its result is exposed at `window.CM_MOBILE_LOGO_AUDIT`.
- Version display and runtime audit version set to v3.47.

## National League mappings

| In-game normalized key | Asset filename |
|---|---|
| `fylde` | `AFC Fylde.svg` |
| `aldershottown` | `Aldershot Town.svg` |
| `altrincham` | `Altrincham FC.svg` |
| `barrow` | `Barrow AFC.svg` |
| `borehamwood` | `Boreham Wood.svg` |
| `bostonunited` | `Boston United.svg` |
| `carlisleunited` | `Carlisle United.svg` |
| `eastleigh` | `Eastleigh.svg` |
| `halifaxtown` | `FC Halifax Town.svg` |
| `forestgreenrovers` | `Forest Green Rovers.svg` |
| `gateshead` | `Gateshead FC.svg` |
| `harrogatetown` | `Harrogate Town.svg` |
| `hartlepoolunited` | `Hartlepool United.svg` |
| `hornchurch` | `Hornchurch.svg` |
| `kidderminsterharriers` | `Kidderminster Harriers.svg` |
| `scunthorpeunited` | `Scunthorpe United.svg` |
| `solihullmoors` | `Solihull Moors.svg` |
| `southendunited` | `Southend United.svg` |
| `suttonunited` | `Sutton United.svg` |
| `tamworth` | `Tamworth.svg` |
| `wealdstone` | `Wealdstone.svg` |
| `woking` | `Woking FC.svg` |
| `worthing` | `Worthing.svg` |
| `yeoviltown` | `Yeovil Town.svg` |

## Source and validation limits

The repository README describes assets under `logos/england/{club}.svg` and states they are free for personal and commercial use: https://github.com/JoseArroyave/football-logos/blob/main/README.md. URLs use its documented `raw.githubusercontent.com` pattern. The individual raw asset URLs were not HTTP-tested in this environment. The app retains existing logo sources and generated SVG fallbacks if a URL fails.

This patch is a local deliverable and is **not automatically published to the live GitHub app**.
