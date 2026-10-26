CM Mobile deployment update

Files in this package are intended to replace the corresponding files at the ROOT of the GitHub repository used to publish CM Mobile.

1. Upload index.html and replace the existing index.html in the repository root.
2. Replace VERSION.txt with the included VERSION.txt (v3.45).
3. Commit the changes to the branch configured for publishing (commonly main).
4. Wait for the repository's Pages/deployment workflow to finish, then reload the published app.

The HTML source identifies itself as v3.45 in the page title, header badge, and live status line. This package does not make a GitHub commit or publish the site by itself.
