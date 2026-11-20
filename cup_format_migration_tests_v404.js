const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync(__dirname + '/index.html', 'utf8');
function extractFunction(signature) {
  const start = source.indexOf(signature);
  if (start < 0) throw new Error(`Missing ${signature}`);
  const brace = source.indexOf('{', start);
  let depth = 0, quote = null, esc = false, line = false, block = false;
  for (let i = brace; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (quote) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === quote) quote = null; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`Unclosed ${signature}`);
}
function literalAfter(prefix, opener) {
  const offset = source.indexOf(prefix);
  if (offset < 0) throw new Error(`Missing literal ${prefix}`);
  const start = source.indexOf(opener, offset + prefix.length);
  const closer = opener === '[' ? ']' : '}';
  let depth = 0, quote = null, esc = false;
  for (let i = start; i < source.length; i++) {
    const c = source[i];
    if (quote) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === opener) depth++;
    else if (c === closer && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`Unclosed literal ${prefix}`);
}
const EFL_DIVISIONS = JSON.parse(literalAfter('const EFL_DIVISIONS=', '{'));
const FA_CUP_NON_LEAGUE_CANDIDATES_2026_27 = vm.runInNewContext(literalAfter('const FA_CUP_NON_LEAGUE_CANDIDATES_2026_27=', '['));
const EFL_CUP_PRELIMINARY_TEAMS_2026_27 = vm.runInNewContext(literalAfter('const EFL_CUP_PRELIMINARY_TEAMS_2026_27=', '['));
const clubNames = [...source.matchAll(/\{name:"([^"]+)"/g)].slice(0, 20).map(x => x[1]);
if (clubNames.length !== 20) throw new Error(`PL baseline expected 20, got ${clubNames.length}`);
const CLUBS = clubNames.map(name => ({name, strength: 70}));
for (const division of ['Championship','League One','League Two','National League']) {
  for (const name of EFL_DIVISIONS[division]) CLUBS.push({name, division, strength: division === 'Championship' ? 62 : 50});
}
const appState = {seasonYear: 2026, lowerLeagues: {}, cupCompetitions: null, pendingCupMatch: null};
const context = {
  CLUBS, EFL_DIVISIONS, DOMESTIC_CUP_FORMAT_VERSION: 3,
  CUP_CALENDAR: {'EFL Cup':[1,2,4,6,10,16,21,24,30], 'FA Cup':[11,14,20,25,28,32,35,38]},
  EFL_CUP_PRELIMINARY_TEAMS_2026_27, FA_CUP_NON_LEAGUE_CANDIDATES_2026_27,
  appState,
  clubDivision: c => c?.division || 'Premier League',
  isEuropeanQualifiedClub: name => ['Arsenal','Liverpool','Manchester City','Chelsea','Manchester United','Newcastle United','Tottenham Hotspur','Aston Villa','Brighton & Hove Albion'].includes(name),
  cupRegionForTeam: team => /Manchester|Liverpool|Newcastle|Leeds|Blackburn|Bolton|Burnley|Middlesbrough|Preston|Sheffield|Stoke|Wrexham|Cardiff|Barnsley|Blackpool|Bradford|Doncaster|Huddersfield|Stockport|Wigan|Rochdale|York|Tranmere|Grimsby|Chesterfield|Port Vale|Salford|Fleetwood|Crewe|Shrewsbury|Accrington|Barrow|Carlisle|Morecambe|Newport|Northampton|Notts|Mansfield|Derby|Lincoln|Burton|Peterborough|Cambridge|Walsall|Gateshead|Hartlepool|Tamworth|Boston|Macclesfield|Scarborough|Darlington|FC United/.test(String(team?.name || team)) ? 'North' : 'South',
  eflClubStrengthEstimate: () => 50,
  stableSeed: str => [...String(str)].reduce((a,c) => (a*31+c.charCodeAt(0))|0, 7) >>> 0,
  normalizedClubKey: name => String(name || '').trim().toLowerCase(),
  simulateCupRound: (name, stage) => { context.redrawCalls.push({name,stage}); },
  redrawCalls: []
};
const buildFn = extractFunction('function buildDomesticCupData()');
const expectedFn = extractFunction('function domesticCupExpectedRemainingCount(');
const repairFn = extractFunction('function repairSavedDomesticCupRegistrations()');
vm.runInNewContext(`${buildFn}\n${expectedFn}\n${repairFn}\nthis.buildDomesticCupData=buildDomesticCupData;this.repairSavedDomesticCupRegistrations=repairSavedDomesticCupRegistrations;`, context);
const fresh = context.buildDomesticCupData();
if (fresh['EFL Cup'].teams.length !== 92) throw new Error(`EFL entrants expected 92, got ${fresh['EFL Cup'].teams.length}`);
if (fresh['FA Cup'].teams.length !== 124) throw new Error(`FA entrants expected 124, got ${fresh['FA Cup'].teams.length}`);
if (new Set(fresh['EFL Cup'].teams.map(t=>t.name.toLowerCase())).size !== 92) throw new Error('EFL entrant duplicates');
if (new Set(fresh['FA Cup'].teams.map(t=>t.name.toLowerCase())).size !== 124) throw new Error('FA entrant duplicates');

// Mock the active saved career shown in the screenshots: FA Cup has 35 survivors after stage 3,
// three are from the old, invalid National League over-registration. Canonical winners remain 32.
const validFA = fresh['FA Cup'].teams.slice(0,32).map(t=>({...t}));
const invalidFA = [
  {name:'Legacy extra non-league A',division:'Non-league',entryStage:1},
  {name:'Legacy extra non-league B',division:'Non-league',entryStage:1},
  {name:'Legacy extra non-league C',division:'Non-league',entryStage:1}
];
// These must be unknown to the canonical set, and their presence should not change the preserved history.
const faResults = [{round:1,home:'Example A',away:'Example B',score:'1–0',winner:'Example A'}];
const faCup = {formatVersion:2,round:3,teams:[...validFA,...invalidFA],results:faResults.slice(),champion:null};

// Mock Carabao Cup semi-final state with two first-leg ties and one erroneous fifth bye team.
const eflTeams = fresh['EFL Cup'].teams.slice(0,4).map(t=>({...t}));
const semiFinalTies = [
  {team1:{...eflTeams[0]},team2:{...eflTeams[1]},firstLeg:{home:eflTeams[0].name,away:eflTeams[1].name,homeGoals:1,awayGoals:0}},
  {team1:{...eflTeams[2]},team2:{...eflTeams[3]},firstLeg:{home:eflTeams[2].name,away:eflTeams[3].name,homeGoals:2,awayGoals:1}}
];
const eflCup = {formatVersion:2,round:7,teams:[...eflTeams,{name:'Altrincham',division:'National League'}],results:[{round:7,leg:1,home:eflTeams[0].name,away:eflTeams[1].name,score:'1–0',winner:'Uavgjort før returoppgjøret'}],semiFinalTies};
appState.cupCompetitions = {'FA Cup':faCup,'EFL Cup':eflCup};
const priorFaResults = faCup.results.length;
const priorEflResults = eflCup.results.length;
const report = context.repairSavedDomesticCupRegistrations();
if (faCup.teams.length !== 32) throw new Error(`FA migration expected 32, got ${faCup.teams.length}`);
if (eflCup.teams.length !== 4) throw new Error(`EFL semi migration expected 4, got ${eflCup.teams.length}`);
if (faCup.results.length !== priorFaResults || eflCup.results.length !== priorEflResults) throw new Error('Migration changed played result history');
if (faCup.formatVersion !== 3 || eflCup.formatVersion !== 3) throw new Error('Cup format version not upgraded');
if (!report.repaired || report.repaired.length !== 2) throw new Error('Expected two successful save migrations');
console.log('PASS: actual buildDomesticCupData creates 92 EFL Cup and 124 FA Cup entrants');
console.log('PASS: active FA Cup legacy field 35 -> 32 when three excess non-canonical entrants are present');
console.log('PASS: active Carabao semi-final field 5 -> 4 using the two recorded tie participants');
console.log('PASS: historical cup result arrays remain unchanged');
console.log('PASS: both migrated cup states switch to format version 3');
