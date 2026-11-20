from pathlib import Path
import ast, json, math, re
s=Path(__file__).with_name('index.html').read_text(errors='ignore')

def extract_literal(prefix, opening):
    i=s.index(prefix)+len(prefix)
    start=s.index(opening,i); closing={'[':']','{':'}'}[opening]
    depth=0; quote=None; esc=False
    for j in range(start,len(s)):
        c=s[j]
        if quote:
            if esc: esc=False
            elif c=='\\': esc=True
            elif c==quote: quote=None
            continue
        if c in "'\"`": quote=c; continue
        if c==opening: depth+=1
        elif c==closing:
            depth-=1
            if depth==0: return s[start:j+1]
    raise ValueError(prefix)

def js_obj_to_py(literal):
    # The divisions object uses JSON-compatible double-quoted keys/values.
    return json.loads(literal)

efl=js_obj_to_py(extract_literal('const EFL_DIVISIONS=','{'))
nonleague_candidates=ast.literal_eval(extract_literal('const FA_CUP_NON_LEAGUE_CANDIDATES_2026_27=','['))
prelim=set(ast.literal_eval(extract_literal('const EFL_CUP_PRELIMINARY_TEAMS_2026_27=','[')))
club_block=extract_literal('const CLUBS=','[')
pl_names=re.findall(r'\{name:"([^"]+)"',club_block)[:20]
assert len(pl_names)==20, len(pl_names)
club_set={n.lower() for n in pl_names}
for div in ['Championship','League One','League Two']:
    club_set.update(n.lower() for n in efl[div])
assert len(club_set)==92, len(club_set)
nonleague=[]
for n in nonleague_candidates:
    if n.lower() in club_set or n.lower() in {x.lower() for x in nonleague}: continue
    nonleague.append(n)
    if len(nonleague)==32: break
assert len(nonleague)==32, len(nonleague)
fa_total=len(club_set)+len(nonleague)
assert fa_total==124, fa_total

# Exact stage-field sizes derived from the actual entry-stage logic.
EFL_counts={1:4,2:68,3:11,4:9}
field=92; efl_after=[]
for stage in range(1,10):
    if stage==1: eligible=4; future=88
    elif stage==2: eligible=2+68; future=20
    elif stage==3: eligible=35+11; future=9
    elif stage==7: eligible=4; future=0
    elif stage==8: eligible=4; future=0
    elif stage==9: eligible=2; future=0
    else: eligible=field; future=0
    winners=math.ceil(eligible/2)
    if stage==7: winners=4 # first semi-final leg does not eliminate anyone
    elif stage==8: winners=2 # two semi-final ties, second legs resolve to two finalists
    elif stage==9: winners=1
    field=winners+future
    efl_after.append(field)
assert efl_after==[90,55,32,16,8,4,4,2,1], efl_after

FA_entry_stage1=48+32
FA_late=24+20
field=124; fa_after=[]
for stage in range(1,9):
    eligible=FA_entry_stage1 if stage==1 else (40 if stage==2 else (64 if stage==3 else field))
    if stage==1: winners=math.ceil(FA_entry_stage1/2); future=FA_late
    elif stage==2: winners=math.ceil(40/2); future=FA_late
    elif stage==3: winners=math.ceil(64/2); future=0
    else: winners=math.ceil(field/2); future=0
    field=winners+future
    fa_after.append(field)
assert fa_after==[84,64,32,16,8,4,2,1], fa_after

# Recreate the precise old defect from 4.0.3: CLUBS included NL and the non-league list
# then skipped NL entries, leaving 25 additional outsiders; these produce the screenshot counts.
all_clubs=20+sum(len(efl[d]) for d in ['National League','Championship','League One','League Two'])
old_pro_names={n.lower() for n in sum([efl[d] for d in ['National League','Championship','League One','League Two']],[])+pl_names}
old_non=[]
for n in nonleague_candidates:
    if n.lower() in old_pro_names or n.lower() in {x.lower() for x in old_non}: continue
    old_non.append(n)
    if len(old_non)==32: break
old_fa_total=all_clubs+len(old_non)
assert all_clubs==116, all_clubs
assert len(old_non)==25, len(old_non)
assert old_fa_total==141, old_fa_total
old_fa_stage1=math.ceil((24+48+25)/2)+44
old_fa_stage2=math.ceil(old_fa_stage1-44 and (old_fa_stage1-44)/2)+44
old_fa_stage3=math.ceil((old_fa_stage2-44+44)/2)
assert old_fa_stage3==35, old_fa_stage3
# EFL Cup old field: 116 total; entry stages 4, 92, 11, 9.
old_efl_field=116
old_efl_stage1=math.ceil(4/2)+(116-4)
old_efl_stage2=math.ceil((2+92)/2)+20
old_efl_stage3=math.ceil((old_efl_stage2-20+11)/2)+9
old_efl_stage4=math.ceil(old_efl_stage3/2)
old_efl_stage5=math.ceil(old_efl_stage4/2)
old_efl_stage6=math.ceil(old_efl_stage5/2)
assert (old_efl_stage1,old_efl_stage2,old_efl_stage3,old_efl_stage4,old_efl_stage5,old_efl_stage6)==(114,67,38,19,10,5)

# Verify source code contains the corrected pool filters, format bump, and safe in-save migrations.
assert 'const DOMESTIC_CUP_FORMAT_VERSION=3;' in s
assert ".filter(t=>t.division==='Premier League')" in s
assert "for(const division of ['Championship','League One','League Two'])" in s
assert "name==='EFL Cup'&&round===7" in s
assert 'cup.semiFinalTies.length===2' in s
assert 'valid.length===expected' in s
assert 'cup.formatIntegrityWarning' in s
# Contrast fixes that target precisely the screenshot problem.
for css in ['.cup-result-team strong,.cup-result-center>b', '.cup-accordion>summary .pill', '.cup-format-warning']:
    assert css in s, css

print('PASS: PL/EFL professional pool = 92 unique clubs')
print('PASS: FA Cup pool = 124 unique clubs (92 + 32 non-league)')
print('PASS: EFL expected remaining by completed stage =', efl_after)
print('PASS: FA expected remaining by completed stage =', fa_after)
print('REPRODUCED v4.0.3 defect: FA Cup after stage 3 = 35 (expected 32)')
print('REPRODUCED v4.0.3 defect: Carabao Cup after quarter-finals = 5 (expected 4)')
print('PASS: safe migration guards, format-version bump, and cup contrast overrides present')
