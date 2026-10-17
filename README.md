# CM Mobile v1.59 — EFL Division Count Fix

- Rebuilt the three EFL division lists to contain 24 distinct club names each.
- Removed cross-division duplicates and Premier League clubs from the EFL lists.
- Bumped domestic data schema to version 5 so existing saved league tables are rebuilt.
- Structural fix for 23-team tables caused by duplicate clubs being filtered out.

Important: this repairs the structure, but exact 2026/27 division membership still needs comparison with official final league membership. Player rosters and dates of birth remain a separate verification task.

Install: replace root index.html on the main branch of the Cm-Mobile GitHub repository.
