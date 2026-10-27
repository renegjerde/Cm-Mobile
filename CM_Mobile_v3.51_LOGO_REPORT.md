# CM Mobile v3.51 — supplement to the club logo registry

## Implemented
- Registered supplementary image sources for the 31 normalized club-name keys left unmapped by the v3.48 audit.
- Added mappings for clubs across Cyprus, Armenia, Bosnia and Herzegovina, Slovenia, Romania, Albania, Kazakhstan, Hungary, Israel, Finland, Georgia, Andorra, Lithuania, Norway, Gibraltar, Northern Ireland, Latvia, Azerbaijan, Republic of Ireland, Slovakia, Wales, Portugal, Belgium and Iceland.
- Added the supplementary source to the image resolver before the final generated SVG fallback. Existing sources still take priority, and image `onerror` proceeds to the next configured image.
- Updated the in-game manual with attribution linking to football-logos.cc.
- Updated version labels and the runtime logo audit version to v3.51.

## Validation
- The supplementary source registry contains 31 unique normalized keys.
- Each key from the previous 31-row gap list has an explicit mapping; the updated source-registration gap CSV is empty except for its header.
- JavaScript syntax is checked with Node.js for each inline script.
- ZIP integrity is checked with `unzip -t`.

## Limitations
- The verified page slugs for Slovan Bratislava and Víkingur R. are used explicitly (`s-bratislava` and `vikingur-r`) rather than guessed full-name slugs. Their direct PNG endpoints still need a live browser/network check.
- The image URLs use the documented/public legacy path convention `https://football-logos.cc/logos/{country}/256x256/{slug}.png`. Each target is paired with a club page or country page found in web search, but not every direct PNG URL has been HTTP-verified because network access is unavailable in the build container. If a configured URL fails, the browser falls through to the next image source and ultimately the generated SVG badge.
- `0` unregistered source keys is not the same as `0` broken image links. This remains a source-registration audit, not a live network test or a visual club-by-club accuracy check.
- The source site asks users to credit/link to football-logos.cc for certain logos; an attribution/link and link to its usage policy have been added to the in-game manual. The source site states that its logos are for informational, editorial and fan-based use and restricts commercial use. Logos remain the property of their respective rights holders; commercial distribution requires properly licensed assets.
- This package has not been published automatically to GitHub. Replace the repository-root `index.html` and commit the change to deploy it.
