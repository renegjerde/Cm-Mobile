const fs = require('fs');
const vm = require('vm');
const source = fs.readFileSync(__dirname + '/index.html', 'utf8');

function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`Missing function ${name}`);
  const open = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`Unclosed function ${name}`);
}

const selected = [
  'isInternalSystemLog', 'homeNewsMarkup', 'classifyManagerLog',
  'queueManagerNotification', 'syncManagerNotifications'
].map(extractFunction).join('\n');
const context = {
  appState: {},
  esc: value => String(value),
  money: value => String(value),
  Date,
  console
};
vm.createContext(context);
vm.runInContext(selected, context);

const checks = [];
function check(name, fn) {
  const passed = Boolean(fn());
  checks.push({ name, passed });
  if (!passed) throw new Error(`FAIL: ${name}`);
}

const identityAudit = 'v3.67 identitetskontroll fullført: 0 genererte spillerregistreringer fikk fjernet uverifiserte eksterne identiteter, 2 UEFA-spilleroppføringer korrigert og 7 offisielle utlånsregistreringer merket. Ferdigheter, rating og potensial ble ikke overskrevet.';
const uefaAudit = 'UEFA v3.65: 48 Europa-/Conference League-staller kontrollert mot permanent november-snapshot. 0 urørte arkivstaller erstattet, 48 karrierebeskyttede staller bevart, 0 offisielle spillere lagt til.';
const listBAudit = 'UEFA List B (fast snapshot per 2026-11-14) er lagt permanent inn i klubbregistrene: 1023 nye spillere fordelt på 108 klubboppføringer. Ingen videre UEFA-oppdateringer vil bli kjørt.';

check('Identity audit is classified as internal', () => context.isInternalSystemLog(identityAudit));
check('UEFA roster audit is classified as internal', () => context.isInternalSystemLog(uefaAudit));
check('List B snapshot log is classified as internal', () => context.isInternalSystemLog(listBAudit));
check('Normal transfer news remains visible', () => !context.isInternalSystemLog('Manchester United signerte Alex Example fra Chelsea for £12m.'));
check('Normal UEFA match news remains visible', () => !context.isInternalSystemLog('UEFA Champions League: Arsenal 2–1 Bayern München.'));
check('Technical audit is not classified into manager notifications', () => context.classifyManagerLog(identityAudit) === null);
check('Player transfer is still classified as transfer news', () => context.classifyManagerLog('Manchester United signerte Alex Example fra Chelsea.')?.title === 'Overgangsnytt');

context.appState = { log: [identityAudit, 'Arsenal 2–1 Chelsea.', uefaAudit, 'Manchester United signerte Alex Example fra Chelsea.'] };
const renderedNews = context.homeNewsMarkup();
check('Home news excludes all technical audit rows', () => !renderedNews.includes('identitetskontroll') && !renderedNews.includes('UEFA v3.65'));
check('Home news keeps real football news', () => renderedNews.includes('Arsenal 2–1 Chelsea.') && renderedNews.includes('Manchester United signerte'));

context.appState = {
  log: [identityAudit],
  managerNotifications: [{ id: 'old-internal', title: 'Overgangsnytt', message: identityAudit, read: false }],
  managerNotificationLogCursor: 0,
  transferOffers: []
};
context.syncManagerNotifications();
check('Legacy internal notification is removed from manager inbox', () => context.appState.managerNotifications.length === 0);
check('Diagnostic app log is retained unchanged', () => context.appState.log.length === 1 && context.appState.log[0] === identityAudit);
check('Internal log advances cursor without creating a new notice', () => context.appState.managerNotificationLogCursor === 1 && context.appState.managerNotifications.length === 0);

context.appState = { log: [], managerNotifications: [{ id: 'valid', title: 'Overgangsnytt', message: 'Manchester United signerte Alex Example.', read: false }], managerNotificationLogCursor: 0, transferOffers: [] };
context.syncManagerNotifications();
check('Valid football notification remains in manager inbox', () => context.appState.managerNotifications.length === 1 && context.appState.managerNotifications[0].id === 'valid');

console.log(JSON.stringify({ total: checks.length, passed: checks.filter(x => x.passed).length, failed: checks.filter(x => !x.passed).length, checks }, null, 2));
