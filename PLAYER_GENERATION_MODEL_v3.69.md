# CM Mobile – Player Generation & Ability Calibration v3.69

Date: 15 November 2026  
Base: v3.68 Player Quality Diagnostics  
Release type: generation-model update; no existing-player rebalance migration

## 1. Attribute model

The old generated profile used a broad GK/DEF/MID/ATT template with random offsets. The v3.69 model uses the player's detailed tactical role and a deterministic per-player seed.

Roles covered:
- GK
- LB, RB, LWB, RWB
- LCB, RCB, CB
- DM
- CM, LM, RM
- AM
- LW, RW
- ST

Each role has a distinct baseline and a small set of style variations. The style is selected deterministically from the player seed; it is not exposed as a label in the player UI. Per-attribute variation means two players in the same role and with the same CA can still have different strengths and weaknesses.

The model also applies restrained age adjustments: pace and stamina reduce gradually at older ages, while passing, technique, creativity and positioning can reflect experience. Outfielders retain low handling/reflex values; goalkeepers receive separate keeper-specific values.

### CA calibration

The model uses the same weighted role-skill formula as the match engine's `roleSkillScore` for the player's primary role. It applies a bounded common adjustment to the role-relevant attributes so the resulting role-skill index closely tracks the existing `rating`/CA. The adjustment preserves the differences between the player's attributes rather than flattening them.

The role-skill index is not CA itself. The game continues to store CA in `player.rating`.

## 2. Potential model

`cm69GeneratePotential` assigns PA using an age curve and a deterministic distribution of development headroom. The distribution has five broad outcomes: rare elite headroom, high headroom, solid headroom, low headroom, and ordinary headroom.

Context affects the likelihood of higher tiers:
- Academy intake uses club strength and current ability as modest probability signals.
- Free-agent intake uses a more conservative distribution.
- Other senior/lower-division generated profiles use a rarer high-potential distribution.

Age is central: younger players can receive more headroom; players aged 28+ are capped at four points above CA, and players aged 32+ at two. PA is always at least CA and never exceeds 96.

Market value is not passed into the PA generator as a direct potential score. This avoids simply turning expensive players into high-potential players.

## 3. Creation paths updated

- `makeRealPlayer`: new player materialization for the domestic club worlds.
- `makeYouthProspect`: academy intake in all club academies.
- `ensureTransferPool`: initial free-agent pool for a new career.
- `makeAnnualFreeAgent`: new seasonal free-agent intake.
- `makeEuropeanProfilePlayer`: new player materialization from the embedded European profile archive.
- `buildGenericRosterForClub`: generic lower-division fallback.
- Generated EFL squad filler post-processing: recomputes attributes and PA after final CA/age assignment so no stale profile remains.
- `ensurePlayerAttributes`: deterministic, missing-fields-only backfill.

## 4. Data preservation

v3.69 deliberately does not retune saved players. It does not run a migration over `worldSquads`, `eflPlayerDatabase`, `europeanTransferSquads`, `cupOnlySquads`, `squad`, `freeAgents` or `youthAcademies` to rewrite existing CA, PA or valid attributes.

New model provenance is recorded on new players in `dataQuality.attributeModelVersion` and `dataQuality.potentialModelVersion`. Legacy players with old/missing model metadata remain identifiable as legacy in the audit export; v3.69 does not falsely relabel old values as newly generated.

## 5. Synthetic test results

- 8,000 profiles generated over all 16 roles.
- All profiles had exactly 11 integer attributes, all within 25–99.
- All outfield handling/reflex values stayed at 25–31.
- Repeated generation from the same seed produced identical attributes.
- Mean absolute difference between role-skill index and CA: 0.25 points; 95th percentile: 0.5 points.
- No keeper with CA 60+ had handling/reflex below 50 in the tested fixtures.
- 40,000 academy PA samples: 11.75% had 0–3 headroom; 13.17% had 16+; 0.74% had 25+.
- 40,000 free-agent PA samples (ages 17–31): 48.16% had 0–3 headroom; 0.72% had 16+; 0.04% had 25+.
- No tested PA was below CA or above 96; no 28+ player exceeded the age headroom cap.

These are synthetic generator tests, not observations from real-world player data or a multi-season match simulation.
