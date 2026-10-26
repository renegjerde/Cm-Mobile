# CM Mobile v3.48 — European logo registry update

## Implemented

- Added explicit European league-image mappings for clubs that were missing a registered source in v3.47.
- Mappings use concrete filenames from the repository’s season/league directories, including Denmark, Scotland, Greece, Belgium, Türkiye, Sweden, Norway, Serbia, Croatia, Switzerland, Poland, Austria, Czech Republic, Bulgaria, Netherlands, Romania, Spain and Ukraine.
- Updated the logo coverage audit to report `european-league-png` mappings.
- Improved the logo resolver to attempt all configured sources in priority order before showing a generated SVG fallback. A broken first URL no longer prevents later configured sources from being tried.
- Version marker, title, status line and runtime audit updated to v3.48.

## Validation limits

- JavaScript syntax is checked separately; ZIP integrity is checked separately.
- Source file mappings are based on public season/league directory listings for `luukhopman/football-logos`. That repository provides PNG logos for teams in the top 25 European leagues, but the retrieved README did not provide an explicit license statement. The app links to image URLs; this package does not download or embed those third-party logo files.
- Individual raw image URLs are not all HTTP-verified. Runtime fallback is retained.
- This package is a local deliverable and is not automatically published to the live GitHub app. Replace the repository root `index.html` and commit the change to publish.

## Coverage accounting

The attached gap CSV removes keys that now have explicit league-image mappings from the prior v3.47 unmapped list. This is source-registration coverage, not proof every image loads or that every crest has been visually matched.
