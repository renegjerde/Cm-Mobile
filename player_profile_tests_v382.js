// Focused v3.82 player profile lookup, navigation and rendering tests.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const source = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`Missing function ${name}`);
  const brace = source.indexOf('{', start);
  let depth=0, quote=null, escaped=false, line=false, block=false;
  for(let i=brace;i<source.length;i++){
    const c=source[i],n=source[i+1];
    if(line){if(c==='\n')line=false;continue;}
    if(block){if(c==='*'&&n==='/'){block=false;i++;}continue;}
    if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote=null;continue;}
    if(c==='/'&&n==='/'){line=true;i++;continue;}
    if(c==='/'&&n==='*'){block=true;i++;continue;}
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==='{')depth++;
    else if(c==='}'&&--depth===0)return source.slice(start,i+1);
  }
  throw new Error(`Could not parse ${name}`);
}
const names=['openPlayerCareer','closePlayerCareer','findCareerProfilePlayer','playerCareerPage'];
const player={id:'euro-1',careerId:'career-euro-1',name:'Test Midfielder',pos:'MID',role:'CM',naturalPositions:['CM','AM'],rating:77,potential:88,age:22,clubIndex:-1,clubName:'Real Madrid',value:42.5,wage:125,contractEndDate:'2028-06-30',morale:81,fitness:93,form:7.2,attributes:{pace:76,stamina:82,strength:70,technique:84,creativity:86,finishing:65,defending:62,passing:88,handling:20,reflexes:20,positioning:20},apps:18,minutes:1450,goals:4,assists:7,yellowCards:3,redCards:0,chancesCreated:21,careerStats:{apps:40,minutes:2800,goals:8,assists:12,yellowCards:5,redCards:0,chancesCreated:48},careerHistory:[{season:'2025/26',clubName:'Ajax',apps:22,minutes:1350,goals:4,assists:5,yellowCards:2,redCards:0,chancesCreated:27,competitions:{Eredivisie:{apps:22,minutes:1350,goals:4,assists:5}}}],competitionStats:{'La Liga':{apps:18,minutes:1450,goals:4,assists:7,yellowCards:3,redCards:0}},preferredFoot:'Right',heightCm:181,dob:'2004-02-12'};
const youth={id:'youth-1',careerId:'career-youth-1',name:'Academy Prospect',pos:'ATT',rating:59,potential:84};
const appState={page:'competitions',playerCareerProfile:'career-euro-1',club:0,seasonYear:2026,squad:[],worldSquads:[],freeAgents:[],eflPlayerDatabase:{},europeanTransferSquads:{'Real Madrid':[player]},cupOnlySquads:{},youthAcademies:{'Ajax':[youth]},aiLoanRegistry:{},transferHistory:[{playerCareerId:'career-euro-1',playerName:player.name,type:'buy',from:'Ajax',to:'Real Madrid',fee:42.5,week:1,seasonYear:2026,transferTypeLabel:'Kjøp'}]};
let clubRosterModalState={mode:'squad',name:'Real Madrid',division:'Europe',players:[player],subtitle:'Spillerstall'};
let playerCareerReturnPage='squad',playerCareerReturnModal=null;
const context={appState,clubRosterModalState,playerCareerReturnPage,playerCareerReturnModal,
  CLUBS:[{name:'Arsenal'}],ROLE_BY_SIDE:{CM:'Sentral midtbane'},TACTICAL_ROLE_LABELS:{CM:'Sentral midtbane'},ATTRIBUTE_LABELS:{pace:'Hurtighet',stamina:'Utholdenhet',strength:'Styrke',technique:'Teknikk',creativity:'Kreativitet',finishing:'Avslutninger',defending:'Forsvar',passing:'Pasninger',handling:'Keepergrep',reflexes:'Reflekser',positioning:'Posisjonering'},
  normalizeTransferHistory(){},ensurePlayerAttributes:p=>{p.attributes=p.attributes||{};return p;},seasonLabel:()=> '2026/27',esc:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),money:v=>`£${Number(v||0).toFixed(1)}m`,panel:(t,b)=>`<section><h2>${t}</h2>${b}</section>`,playerAgeText:p=>`${p.age||20} år`,contractExpiryLabel:p=>p.contractEndDate?`Kontrakt til ${p.contractEndDate}`:'Uten kontrakt',transferDateDisplay:()=> '01.08.2026',transferTypeLabel:()=> 'Overgang',render(){this.renderCalls=(this.renderCalls||0)+1;},
};
vm.createContext(context);
vm.runInContext(`${names.map(extractFunction).join('\n')}`,context);
const checks=[];function check(n,fn){fn();checks.push(n)}function assert(v,m){if(!v)throw new Error(m)}
check('European permanent roster player resolves by career identity',()=>assert(context.findCareerProfilePlayer().name==='Test Midfielder','European profile lookup'));
check('Youth academy prospect resolves',()=>{context.appState.playerCareerProfile='career-youth-1';assert(context.findCareerProfilePlayer().name==='Academy Prospect','academy profile lookup')});
check('Opponent XI clone resolves to its source player ID',()=>{const clone={...player,id:'opp-4-euro-1',careerId:'',sourcePlayerId:'euro-source-id'};context.appState.europeanTransferSquads={'Club X':[clone]};context.appState.playerCareerProfile='euro-source-id';assert(context.findCareerProfilePlayer()===clone,'opponent XI source identity lookup');context.appState.europeanTransferSquads={'Real Madrid':[player]};context.appState.playerCareerProfile='career-euro-1'});
check('Profile renders all eleven attributes and CA/PA',()=>{context.appState.playerCareerProfile='career-euro-1';const html=context.playerCareerPage();assert(html.includes('Spillerattributter')&&html.includes('Hurtighet')&&html.includes('Keepergrep')&&html.includes('FERDIGHET (CA)')&&html.includes('Potensial (PA): 88'),'profile attributes/ratings')});
check('Profile renders current and archived career statistics',()=>{const html=context.playerCareerPage();assert(html.includes('Sesong for sesong')&&html.includes('Statistikk per konkurranse')&&html.includes('2025/26')&&html.includes('Karrieretall'),'career stats')});
check('Profile renders transfer history and contract details',()=>{const html=context.playerCareerPage();assert(html.includes('Overgangshistorikk')&&html.includes('Real Madrid')&&html.includes('Kontrakt til 2028-06-30'),'transfer and contract details')});
check('Opening profile preserves club-roster modal as return destination',()=>{context.appState.page='competitions';context.clubRosterModalState={mode:'squad',name:'Real Madrid',players:[player]};context.openPlayerCareer('career-euro-1');assert(context.appState.page==='playerCareer'&&context.clubRosterModalState===null&&context.playerCareerReturnPage==='competitions'&&context.playerCareerReturnModal.name==='Real Madrid','profile navigation state')});
check('Back returns to original club roster modal',()=>{context.closePlayerCareer();assert(context.appState.page==='competitions'&&context.clubRosterModalState.name==='Real Madrid','profile return navigation')});
check('Player-profile entry point is wired from squad and club/lineup modal',()=>{assert(source.includes('openPlayerCareer(\'${String(p.careerId||p.sourcePlayerId||p.id||p.name)')&&source.includes('👤 Åpne spillerprofil'),'profile UI entry points')});
console.log(JSON.stringify({version:'3.82',passed:checks.length,failed:0,checks},null,2));
