// Focused v3.81 UI/data-source regression tests. Run: node club_roster_ui_tests_v381.js
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const source = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`Missing function ${name}`);
  const brace = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = brace; i < source.length; i++) {
    const c = source[i], next = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && next === '/') { lineComment = true; i++; continue; }
    if (c === '/' && next === '*') { blockComment = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`Could not parse function ${name}`);
}

const names = ['clubRosterForDisplay', 'clubRosterRoleLabel', 'openClubRoster', 'openMatchTeamRoster', 'closeClubRosterModal', 'clubRosterModal'];
const code = names.map(extractFunction).join('\n');
const players = Array.from({ length: 18 }, (_, i) => ({
  id: `p${i}`, name: `Player ${i}`, pos: i === 0 ? 'GK' : i < 6 ? 'DEF' : i < 12 ? 'MID' : 'ATT',
  rating: 80 - i, potential: 92 - i, age: 20 + i % 10, fitness: 90, attributes: {}
}));
const plRoster = players.map(p => ({ ...p }));
const currentEflRoster = players.slice(0, 14).map(p => ({ ...p }));
const otherEflRoster = players.slice(0, 16).map(p => ({ ...p }));
const euroRoster = players.slice(0, 18).map(p => ({ ...p }));
const CLUBS = [
  { name: 'Arsenal', division: 'Premier League' },
  { name: 'Leeds United', division: 'Championship' },
  { name: 'Hull City', division: 'Championship' }
];
const appState = {
  club: 0, squad: plRoster, worldSquads: [plRoster, currentEflRoster, otherEflRoster],
  eflPlayerDatabase: { Championship: { 'Leeds United': currentEflRoster, 'Hull City': otherEflRoster } },
  europeanTransferSquads: { 'Real Madrid': euroRoster }, cupOnlySquads: {}, pendingCupMatch: null,
  fixtures: [{ round: 1, games: [[0, 1]] }], week: 1, seasonYear: 2026
};
const context = {
  appState, CLUBS, clubRosterModalState: null,
  currentClub: () => CLUBS[appState.club],
  clubDivision: c => c.division || 'Premier League',
  domesticDivisionForClubName: n => ['Leeds United', 'Hull City'].includes(n) ? 'Championship' : n === 'Arsenal' ? 'Premier League' : null,
  domesticClubKey: n => String(n).toLowerCase().replace(/[^a-z]/g, ''),
  findRosterByCanonicalClubName: (obj, n) => obj?.[n] ? { name: n, roster: obj[n] } : null,
  ensureWorldSquadForClub: i => appState.worldSquads[i],
  render: () => { context.renderCalls = (context.renderCalls || 0) + 1; },
  esc: s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  TACTICAL_ROLE_LABELS: { GK: 'Keeper', CB: 'Midtstopper', CM: 'Sentral midtbane', ST: 'Spiss' },
  playerAgeText: p => `${p.age || 20} år`, clubBadgeMarkup: () => '<span>badge</span>',
  getOpponentFormation: () => '4-4-2',
  createMatchLineup: (ps, formation) => ps.slice(0, 11).map((p, i) => ({ ...p, assignedRole: i === 0 ? 'GK' : i < 5 ? 'CB' : i < 9 ? 'CM' : 'ST' })),
  assignTacticalRoles: xi => xi,
  competitionSquad: () => euroRoster.slice(0, 11).map(p => ({ ...p }))
};
vm.createContext(context);
vm.runInContext(code, context);
const checks = [];
function check(name, fn) { fn(); checks.push(name); }
function assert(condition, message) { if (!condition) throw new Error(message); }

check('current Premier League club resolves to manager squad', () => assert(context.clubRosterForDisplay('Arsenal', 'Premier League') === plRoster, 'current PL roster'));
appState.club = 1; appState.squad = currentEflRoster;
check('other Premier League club resolves to world squad', () => assert(context.clubRosterForDisplay('Arsenal', 'Premier League') === plRoster, 'AI PL roster'));
check('Premier League club in UEFA table still resolves domestic squad', () => assert(context.clubRosterForDisplay('Arsenal', 'Europe') === plRoster, 'UEFA PL roster resolution'));
check('manager EFL club resolves to live squad', () => assert(context.clubRosterForDisplay('Leeds United', 'Championship') === currentEflRoster, 'current EFL roster'));
check('other EFL club resolves to EFL database', () => assert(context.clubRosterForDisplay('Hull City', 'Championship') === otherEflRoster, 'other EFL roster'));
check('European club resolves to permanent European roster', () => assert(context.clubRosterForDisplay('Real Madrid', 'Europe') === euroRoster, 'European roster'));
check('club roster modal opens and shows squad details', () => {
  context.openClubRoster('Hull City', 'Championship');
  const html = context.clubRosterModal();
  assert(context.clubRosterModalState.mode === 'squad' && html.includes('Hull City') && html.includes('Player 0') && html.includes('16 spillere'), 'squad modal');
});
appState.club = 0; appState.squad = plRoster;
check('domestic opponent preview builds eleven players', () => {
  context.openMatchTeamRoster('away');
  assert(context.clubRosterModalState.mode === 'lineup' && context.clubRosterModalState.players.length === 11, 'domestic XI');
});
check('domestic opponent preview uses match formation', () => assert(context.clubRosterModalState.formation === '4-4-2' && context.clubRosterModal().includes('Formasjon 4-4-2'), 'formation display'));
check('clicking manager team opens full squad', () => {
  context.openMatchTeamRoster('home');
  assert(context.clubRosterModalState.mode === 'squad' && context.clubRosterModalState.players.length === plRoster.length, 'own squad');
});
appState.pendingCupMatch = { competition: 'Champions League', roundNo: 2, homeTeam: { name: 'Arsenal', clubIndex: 0 }, awayTeam: { name: 'Real Madrid', clubIndex: -1 } };
check('European cup opponent preview uses competition roster', () => {
  context.openMatchTeamRoster('away');
  assert(context.clubRosterModalState.mode === 'lineup' && context.clubRosterModalState.name === 'Real Madrid' && context.clubRosterModalState.players.length === 11, 'European XI');
});
check('null clubIndex does not misidentify opponent as manager club', () => {
  appState.pendingCupMatch.awayTeam = { name: 'Real Madrid', clubIndex: null };
  context.openMatchTeamRoster('away');
  assert(context.clubRosterModalState.name === 'Real Madrid' && context.clubRosterModalState.mode === 'lineup', 'null club index handling');
});
check('modal has accessible dialog and close action', () => {
  const html = context.clubRosterModal();
  assert(html.includes('role="dialog"') && html.includes('aria-modal="true"') && html.includes('closeClubRosterModal()'), 'accessible modal');
});

const wiring = {
  domesticStandings: source.includes('openClubRoster(this.dataset.club,this.dataset.division)'),
  uefaStandings: source.includes('data-division=\"Europe\" onclick=\"openClubRoster(this.dataset.club,this.dataset.division)\"'),
  lowerDivisionTables: source.includes('data-division=\"${esc(name)}\" onclick=\"openClubRoster(this.dataset.club,this.dataset.division)\"'),
  seasonSummaryTable: source.includes('data-division=\"${esc(division)}\" onclick=\"openClubRoster(this.dataset.club,this.dataset.division)\"'),
  matchHome: source.includes("openMatchTeamRoster('home')"),
  matchAway: source.includes("openMatchTeamRoster('away')"),
  modalInRender: source.includes(')+transferWindowReportModal()+clubRosterModal()')
};
for (const [name, ok] of Object.entries(wiring)) { assert(ok, `missing UI wiring: ${name}`); checks.push(`UI wiring: ${name}`); }
console.log(JSON.stringify({ version: '3.81', passed: checks.length, failed: 0, checks }, null, 2));
