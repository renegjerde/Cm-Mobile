# CM Mobile v3.59 – Supabase skylagring

## Hva er nytt
- Kobler CM Mobile til samme Supabase-prosjekt og Auth-konto som Familiemat.
- Ny «Konto»-knapp for innlogging, konto-opprettelse, synkronisering og utlogging.
- Karrierer synkroniseres per bruker og karrierespor.
- Lokal lagring beholdes; spillet fungerer fortsatt uten innlogging eller nett.
- Ved innlogging importeres karrierer som bare finnes i skyen. For samme karriere vinner den nyeste lagringen.
- Familiemat-tabeller og -data endres ikke.

## Før publisering – viktig
1. Åpne Supabase-prosjektet som Familiemat bruker.
2. Gå til SQL Editor.
3. Kjør hele `supabase_cm_mobile.sql`.
4. Publiser `index.html` i GitHub-repositoriet som erstatter eksisterende `index.html`.
5. Åpne appen, trykk «Konto» og logg inn med samme e-post/passord som i Familiemat.

Hvis Supabase Auth krever e-postbekreftelse, må kontoen bekreftes før første innlogging.

## Sikkerhet
- Frontend bruker bare Supabase publishable key, aldri `service_role` eller secret key.
- `cm_careers` har Row Level Security.
- Policies begrenser lesing og skriving til `auth.uid() = user_id`.
- Karrieredata lagres i egen tabell; Familiemat-tabellene berøres ikke.

## Synkroniseringsmodell
- Hver lokal karriere identifiseres av `career_slot_id`.
- Automatisk synkronisering skjer etter lokal lagring når bruker er innlogget.
- Ved oppstart/innlogging sammenlignes lokale og eksterne tidsstempler.
- Nyeste versjon per karriere importeres eller lastes opp.
- Sletting av lokale karrierer sletter ikke automatisk skyversjonen.

## Begrensninger / teststatus
- JavaScript-syntaks og ZIP-integritet skal kontrolleres i leveranseprosessen.
- Live Supabase-innlogging og databaseoperasjoner kan ikke bekreftes før SQL er kjørt i brukerens Supabase-prosjekt.
- Første innlogging på en annen enhet laster ned karrierene fra skyen.
