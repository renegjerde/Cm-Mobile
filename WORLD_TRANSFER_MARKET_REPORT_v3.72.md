# CM Mobile v3.72 – AI transfer market and squad evolution

## Objective

Make AI squad turnover more robust over long careers without flooding the world with generated players or destabilizing existing saves.

## Findings addressed

The existing simulation already had domestic and European AI transfer movement, transfer history, free-agent intake and player contract dates. Two gaps mattered for long-term squad health:

1. AI clubs could trade players between clubs, but they did not have a matching, controlled route to fill squad shortages from the free-agent pool.
2. Contract expiry removed players from the manager's squad and domestic `worldSquads`, but persistent EFL and European market registries could retain stale copies. EFL match-engine and market copies could also diverge after AI roster changes.

## Changes

### AI free-agent recruitment

During open transfer windows, AI clubs with a material squad vacancy may sign one suitable free agent in a season. The candidate must:

- match a position group the club needs;
- be aged 17–34;
- fall within a bounded rating band relative to club strength;
- have a wage demand within a conservative club-strength ceiling.

The AI uses a deterministic shortlist selection per club/window. It does not automatically select the highest-rated player in the pool. A per-season club guard prevents repeat signings, and each move is recorded in transfer history. Career identity is preserved while the club-specific registration ID changes.

### Contract expiry and registration cleanup

At season rollover, expired contracts are now processed in:

- the manager's active squad;
- AI domestic world squads;
- EFL market database rosters;
- European transfer-world rosters.

A career-identity guard ensures mirrored registrations create only one free-agent entry. Loaned players are not released by this expiry pass. EFL market rosters are synchronized after AI transfers and AI free-agent recruitment.

## Validation

The targeted test harness covers:

- expiry of the manager's player;
- expiry of a Premier League AI player;
- an EFL player represented in both world and market registries;
- an EFL-only player;
- a European transfer-world player;
- preservation of incoming/outgoing loan registrations;
- two AI clubs filling different positional shortages;
- removal of signed free agents from the pool;
- EFL market/world mirror consistency;
- prevention of repeated same-season free-agent signings.

The v3.71 development harness was also rerun unchanged against the v3.72 source. The 3,000 synthetic player careers and 5,000 academy prospects continue to satisfy the previous progression invariants.

## Limitations and next work

This is not a full redesign of AI transfers. AI contract renewals, wage negotiation, player willingness, agent influence, transfer-fee bidding wars and transfer strategy by tactical system are not implemented here. The existing inter-club AI market remains largely positional-surplus driven. The free-agent signing model is intentionally limited to one player per AI club per season when a squad shortage exists.

The next meaningful upgrade should be a season-by-season AI squad planning model: contract runway, age profile, quality gaps, financial sustainability, succession planning and tactical needs, followed by a long-horizon simulation to measure roster quality, squad sizes, free-agent pool pressure and club finances.
