function debugBudget() {
  var keys = Object.keys(undersecBudget);
  var lines = ['=== undersecBudget nøkler ==='];
  keys.forEach(function(k){ lines.push(k + ' = ' + (undersecBudget[k].timer||'tom')); });
  lines.push('');
  lines.push('=== TOTAL beregning ===');
  var total = tasks.reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  lines.push('Task-timere: ' + total);
  keys.forEach(function(k){
    var bt=parseFloat(undersecBudget[k].timer)||0;
    if(bt<=0) return;
    var parts=k.split('||'),gSec=parts[0],gUsec=parts[1]||'',gSub=parts[2]||'';
    if(gSub!==''){
      var hasU=Object.keys(undersecBudget).some(function(k2){var p=k2.split('||');return p[0]===gSec&&(p[1]||'')===gUsec&&(p[2]||'')==='';});
      if(hasU){lines.push('HOPP (undersec finnes): '+k);return;}
    }
    var gt=tasks.filter(function(t){return t.section===gSec&&(t.undersec||'')===gUsec&&(t.sub||'')===gSub;});
    var hot=gt.some(function(t){return (parseFloat(t.timer)||0)>0;});
    if(!hot){total+=bt;lines.push('LEGG TIL '+bt+': '+k);}
    else lines.push('HOPP (egne timer): '+k);
  });
  lines.push('');
  lines.push('TOTAL: ' + total);
  alert(lines.join('\n'));
}
const STATUSES = ['Ikke startet','Pågår','Til review','Ferdig','Blokkert'];
const FREDAG_PCTS = (function(){ var a=['']; for(var i=0;i<=100;i+=5) a.push(i+'%'); return a; })();
const STATUS_COLORS = {
  'Ikke startet': {bg:'var(--gray-bg)',  color:'var(--gray)'},
  'Pågår':        {bg:'var(--amber-bg)', color:'var(--amber)'},
  'Til review':   {bg:'var(--blue-bg)',  color:'var(--blue)'},
  'Ferdig':       {bg:'var(--green-bg)', color:'var(--green)'},
  'Blokkert':     {bg:'var(--red-bg)',   color:'var(--red)'}
};
const STATUS_BAR = {
  'Ikke startet':'#B4B2A9','Pågår':'#EF9F27','Til review':'#378ADD','Ferdig':'#1D9E75','Blokkert':'#E24B4A'
};

const SECTIONS_DATA = {"0 Generell": {"": [{"id": "GEN-00-1", "name": "Pris for tilbudsfase"}, {"id": "GEN-00-2", "name": "Fremdriftsplan I tilbudsfase"}, {"id": "GEN-00-3", "name": "Gjennomgang av veilinje"}, {"id": "GEN-00-4", "name": "Fremdriftsplan"}, {"id": "GEN-00-5", "name": "Pris for prosjektering"}, {"id": "GEN-00-6", "name": "Søknader-liste"}, {"id": "GEN-00-7", "name": "CV for nøkkelpersonell"}, {"id": "GEN-00-8", "name": "Beslutnigsnotater"}]}, "1 Tunneler": {"Konsept og Optimalisering": [{"id": "FAG-02-11", "name": "1. Gjennomgang av tilgjengelig prosjekteringsgrunnlag, normalprofil, linjeføring, tunnelklasse, trafikkgrunnlag, tegninger, tidligere vurderinger og relevante prosjektforutsetninger."}, {"id": "FAG-02-12", "name": "2. Krav- og normkontroll\nKontroll av valgt løsning mot relevante krav i N100/N500, herunder frirom, tverrprofil, sikkerhetskrav, tekniske installasjoner, tunnelklasse og eventuelle behov for fravik."}, {"id": "FAG-02-13", "name": "3. Vurdering av T10,5-profil og alternativer\nVurdere om T10,5 er riktig valgt tverrprofil for prosjektet, samt identifisere eventuelle alternative prinsipper eller justeringer som kan gi optimalisering uten å redusere sikkerhet eller funksjonalitet. Kreves fravik?"}, {"id": "FAG-02-14", "name": "4. Sprengningsprofil, kontur og overberg\nVurdere muligheter for å redusere sprengningsvolum, overberg og unødvendig utsprengning gjennom optimalisering av kontur, toleranser, bor-/salveopplegg og oppfølging i produksjon."}, {"id": "FAG-02-21", "name": "5. Geologi og bergsikring\nGjennomgå geologiske forutsetninger og vurdere om bergsikring kan optimaliseres gjennom differensiert sikringsnivå, tilpasning til bergklasser, svakhetssoner og faktisk sikringsbehov."}, {"id": "FAG-02-22", "name": "6. Vann- og frostsikring\nVurdere omfang og prinsipp for vann- og frostsikring, herunder behovsstyrt sikring, plassbehov i profilet og muligheter for redusert omfang eller enklere løsninger."}, {"id": "FAG-02-23", "name": "7. Drenering, grøft, bankett og kabelkanaler\nGjennomgang av drensløsning, grøft, kummer, bankett, kabelkanaler og tekniske føringsveier med mål om å identifisere samordnings- og forenklingsmuligheter."}, {"id": "FAG-02-24", "name": "8. Tekniske installasjoner i profilet\nVurdere plassering og omfang av tekniske installasjoner, herunder belysning, skilt, vifter, nødutstyr, kabelbruer og øvrige føringsveier, for å unngå unødvendige profilutvidelser."}, {"id": "FAG-02-25", "name": "9. Nisjer og lokale utvidelser\nVurdere havarinisjer, snunisjer, tekniske nisjer og øvrige lokale utvidelser med hensyn til antall, plassering, størrelse, sambruk og byggbarhet."}, {"id": "FAG-02-31", "name": "10. Portal- og overgangssoner\nVurdere overgang mellom veg i dagen og tunnel, portaler, forskjæringer, rekkverk og lokale tilpasninger som kan påvirke kostnad og byggbarhet."}, {"id": "FAG-02-32", "name": "11. Mengde- og kostnadsvurdering\nUtarbeide grov vurdering av mengde- og kostnadseffekt for identifiserte optimaliseringstiltak, inkludert vurdering av gevinstpotensial og usikkerhet."}, {"id": "FAG-02-33", "name": "12. Tverrfaglig koordinering\nGjennomføre nødvendig koordinering med relevante fagområder, eksempelvis veg, tunnel, geologi, elektro, VA/drenering, anleggsgjennomføring og kost."}, {"id": "FAG-02-41", "name": "13. Sluttnotat med anbefalinger\nUtarbeide et kort optimaliseringsnotat med funn, vurderte tiltak, risiko, gevinstpotensial og anbefalt videre prosess."}, {"id": "FAG-02-42", "name": "14. Intern kvalitetssikring\nSidemannskontroll/seniorgjennomgang av vurderinger og leveranse før oversendelse."}, {"id": "FAG-02-43", "name": "15. IFC fill"}, {"id": "FAG-02-44", "name": "16. Skiltplan + mengder i tunnel"}]}, "2 Konstruksjoner/bruer": {"K400 Audnedalen bru": [{"id": "FAG-05-11", "name": "1. Grunnlagsgjennomgang og avklaringer"}, {"id": "FAG-05-21", "name": "2. Geoteknisk vurdering av fundamenteringsforhold i FFB-akser"}, {"id": "FAG-05-31", "name": "3. Vurdering av fundamenteringsprinsipp og konsekvens for kostnad/byggbarhet"}, {"id": "FAG-05-41", "name": "4. Optimalisering av akseinndeling, inkludert vurdering av fjerning av akse 2"}, {"id": "FAG-05-51", "name": "5. Vurdering av spennfordeling, eksempelvis 136 + 236 + 136 m"}, {"id": "FAG-05-61", "name": "6. Vurdering av flytting av landkar og konsekvens for fylling"}, {"id": "FAG-05-71", "name": "7. Vurdering av mer kostnadseffektiv søyleform"}, {"id": "FAG-05-81", "name": "8. Vurdering av behov for avstivning i byggefase"}, {"id": "FAG-05-111", "name": "9. Mengder spennarmering, antall og type av lager"}, {"id": "FAG-05-112", "name": "10. Beslutningsnotat"}, {"id": "FAG-05-113", "name": "11. Modell i IFC format"}], "K300 Grundelandsvatnet bru": [{"id": "FAG-06-11", "name": "1. Optimalisering av spennfordeling – ett spenn bru, med ståljekle med betongdekke i overbygning"}, {"id": "FAG-06-12", "name": "2. Vurdering av fundamentering og underbygning"}, {"id": "FAG-06-21", "name": "3. Antall og type av lager"}, {"id": "FAG-06-31", "name": "4. Beslutningsnotat"}, {"id": "FAG-06-41", "name": "5. Modell i IFC format"}], "K500 Faksevatnet bru": [{"id": "", "name": "1. Optimalisering av spennfordeling – ett spenn bru, med ståljekle med betongdekke i overbygning"}, {"id": "", "name": "2. Vurdering av fundamentering og underbygning"}, {"id": "", "name": "3. Antall og type av lager"}, {"id": "", "name": "4. Beslutningsnotat"}, {"id": "", "name": "5. Modell i IFC format"}], "K700 Optedal bru": [{"id": "", "name": "1. Optimalisering overbygning – stålbjelke med betongdekke skal vurderes"}, {"id": "", "name": "2. Vurdering av forkorting av midtspenn til ca. 40 m"}, {"id": "", "name": "3. Vurdering av fundamentering og underbygning"}, {"id": "", "name": "4. Antall og type av lager"}, {"id": "", "name": "5. Beslutningsnotat"}, {"id": "", "name": "6. Modell i IFC format"}], "K600 Lene bruer": [{"id": "", "name": "1. Vurdering av stålbjelkealternativ for begge bruene"}, {"id": "", "name": "2. Vurdering av løsning uten søyle i akse 2 i østgående bru"}, {"id": "", "name": "3. Vurdering av forlengelse av vestgående bru"}, {"id": "", "name": "4. Vurdering av reduksjon av murer"}, {"id": "", "name": "5. Antall og type av lager"}, {"id": "", "name": "6. Beslutningsnotat"}, {"id": "", "name": "7. Modell i IFC format"}], "Alle brukonstruksjoner": [{"id": "", "name": "Generell vurdering av peler – alle konstruksjoner"}]}, "3 YM": {"": []}}

let tasks = [];
let undersecOpen = {};
let undersecBudget = {}; // {key: {timer, revidert, revisjonsDato}}
let vacations = [];
let vacIdCounter = 1;

// Old section names → current names. Applied consistently to SECTIONS_DATA keys,
// task.section values, sectionOpen keys, undersecOpen keys, and undersecBudget keys
// whenever data is restored from localStorage or a shared/synced source, so older
// saved data keeps working with section-specific logic (e.g. "0 Generell" timer field).
const SECTION_MIGRATIONS = {'0 Tema': '0 Generell', '2 Tunneler': '1 Tunneler', '1 Konstruksjoner/bruer': '2 Konstruksjoner/bruer'};
function migrateSectionName(name) { return SECTION_MIGRATIONS[name] || name; }

function migrateSectionsData(obj) {
  if (!obj) return obj;
  var out = {};
  Object.keys(obj).forEach(function(k) {
    var newKey = migrateSectionName(k);
    // If migration would collide with an existing key, merge sub-objects shallowly
    out[newKey] = Object.assign({}, out[newKey] || {}, obj[k]);
  });
  return out;
}

function migrateUndersecBudgetKeys(obj) {
  if (!obj) return obj;
  var out = {};
  Object.keys(obj).forEach(function(k) {
    var parts = k.split('||');
    parts[0] = migrateSectionName(parts[0]);
    out[parts.join('||')] = obj[k];
  });
  return out;
}
let vacTimelineOffset = -7;
let vacTimelineDays = 70;
let idCounter = 0;
let sectionOpen = {};
let projectLinks = [
  { id: 1, label: 'Konkurransegrunnlag', url: '' },
  { id: 2, label: 'Tegningshefte', url: '' }
];
let linkIdCounter = 3;
let linkEditId = null;
let modelLinks = [
  { id: 1, label: 'Modell', url: '' }
];
let modelIdCounter = 2;
let linkEditGroup = 'doc';
let filters = {valgte:false, frist:false, pågår:false, skjulferdig:false};
let activeTab = 'liste';
let kanbanView = 'tidslinje';


function initTasksFromSaved() {
  // Used when reloading saved state — only the saved tasks are restored,
  // not auto-generated default underkapitler.
  Object.keys(SECTIONS_DATA).forEach(function(sec) {
    sectionOpen[sec] = true;
    undersecOpen[sec] = undersecOpen[sec] || {};
  });
  // tasks array stays empty here — loadSaved() will fill it
}

function initTasks() {
  Object.entries(SECTIONS_DATA).forEach(function(entry) {
    var sec = entry[0], subs = entry[1];
    sectionOpen[sec] = true;
    undersecOpen[sec] = undersecOpen[sec] || {};
    if (sec === '0 Generell') {
      // Generell: tasks lie directly under section, no underkapittel
      Object.entries(subs).forEach(function(e) {
        var sub = e[0], items = e[1];
        items.forEach(function(item) {
          tasks.push({
            id: idCounter++, excelId: item.id,
            section: sec, undersec: '', sub: sub, name: item.name,
            selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: ''
          });
        });
      });
    } else {
      // Other sections: auto-create the first underkapittel
      var m = sec.match(/^\d+/);
      var firstName = m ? (m[0] + '.1') : '1';
      Object.entries(subs).forEach(function(e) {
        var sub = e[0], items = e[1];
        items.forEach(function(item) {
          tasks.push({
            id: idCounter++, excelId: item.id,
            section: sec, undersec: firstName, sub: sub, name: item.name,
            selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: ''
          });
        });
      });
      undersecOpen[sec][firstName] = true;
    }
  });
}

function loadSaved() {
  try {
    var saved = localStorage.getItem('bestillingsliste_v4');
    if (!saved) return;
    var data = JSON.parse(saved);

    // Restore section structure (handles renames)
    if (data.SECTIONS_DATA) {
      Object.keys(SECTIONS_DATA).forEach(function(k){ delete SECTIONS_DATA[k]; });
      Object.assign(SECTIONS_DATA, migrateSectionsData(data.SECTIONS_DATA));
    }

    // Restore undersec open/closed state
    if (data.undersecOpen) {
      Object.keys(data.undersecOpen).forEach(function(k){
        var newKey = migrateSectionName(k);
        undersecOpen[newKey] = Object.assign({}, undersecOpen[newKey] || {}, data.undersecOpen[k]);
      });
    }
    if (data.undersecBudget) {
      Object.assign(undersecBudget, migrateUndersecBudgetKeys(data.undersecBudget));
    }
  } catch(e) {}
  try { var _bl=localStorage.getItem('bl_budget'); if(_bl) Object.assign(undersecBudget, JSON.parse(_bl)); } catch(e) {}
  // Deduplicate stale keys AFTER all sources merged
  (function(){
    var taskUndersecSet = {};
    tasks.forEach(function(t){ taskUndersecSet[(t.section||'')+'||'+(t.undersec||'')] = true; });
    Object.keys(undersecBudget).forEach(function(k){
      var parts=k.split('||'), gSec=parts[0], gUsec=parts[1]||'', gSub=parts[2]||'';
      if(gUsec==='' || gSub==='') return;
      if(!taskUndersecSet[gSec+'||'+gUsec]) delete undersecBudget[k];
    });
  })();
  try {

    // Restore section open/closed state (with migration of old names)
    if (data.sectionOpen) {
      Object.keys(data.sectionOpen).forEach(function(k) {
        var key = migrateSectionName(k);
        sectionOpen[key] = data.sectionOpen[k];
      });
    }

    // Restore vacations
    if (data.vacations) {
      vacations = data.vacations;
      vacIdCounter = data.vacIdCounter || (Math.max.apply(null, [0].concat(vacations.map(function(v){return v.id||0;}))) + 1);
    }

    // Restore document links
    if (data.projectLinks) {
      projectLinks = data.projectLinks;
      linkIdCounter = data.linkIdCounter || (Math.max.apply(null, [0].concat(projectLinks.map(function(l){return l.id||0;}))) + 1);
    }

    // Restore model links
    if (data.modelLinks) {
      modelLinks = data.modelLinks;
      modelIdCounter = data.modelIdCounter || (Math.max.apply(null, [0].concat(modelLinks.map(function(l){return l.id||0;}))) + 1);
    }

    // Restore tasks
    if (data.tasks) {
      if (tasks.length === 0) {
        // Reload from saved (initTasksFromSaved was used) — push all tasks fresh
        data.tasks.forEach(function(s) {
          tasks.push({
            id: s.id, excelId: s.excelId || '',
            section: migrateSectionName(s.section), undersec: s.undersec || '', sub: s.sub || '',
            name: s.name,
            selected: !!s.selected,
            frist: s.frist || '', timer: s.timer || '',
            status: s.status || 'Ikke startet',
            link: s.link || '', comment: s.comment || '',
            ansvar: s.ansvar || '', fredagstatus: s.fredagstatus || '',
            eier: s.eier || ''
          });
          if (s.id >= idCounter) idCounter = s.id + 1;
        });
      } else {
        // Initial load — merge user-editable fields into existing tasks
        data.tasks.forEach(function(s) {
          var t = tasks.find(function(t){ return t.id===s.id; });
          if (t) {
            if (s.frist    !== undefined) t.frist    = s.frist;
            if (s.timer    !== undefined) t.timer    = s.timer;
            if (s.status   !== undefined) t.status   = s.status;
            if (s.link     !== undefined) t.link     = s.link;
            if (s.comment  !== undefined) t.comment  = s.comment;
            if (s.ansvar       !== undefined) t.ansvar       = s.ansvar;
            if (s.eier         !== undefined) t.eier         = s.eier;
            if (s.fredagstatus !== undefined) t.fredagstatus = s.fredagstatus;
            if (s.selected !== undefined) t.selected = s.selected;
            if (s.name     !== undefined) t.name     = s.name;
            if (s.undersec !== undefined) t.undersec = s.undersec;
          }
        });
        // Restore custom-added tasks (excelId === '')
        data.tasks.forEach(function(s) {
          if (s.excelId === '' && !tasks.find(function(t){ return t.id===s.id; })) {
            s.section = migrateSectionName(s.section);
            tasks.push(s);
            if (s.id >= idCounter) idCounter = s.id + 1;
          }
        });
      }
    }
  } catch(e) {}
}

function saveData() {
  try { localStorage.setItem('bestillingsliste_v4', JSON.stringify({tasks, sectionOpen, undersecOpen, undersecBudget, SECTIONS_DATA, vacations, vacIdCounter, projectLinks, linkIdCounter, modelLinks, modelIdCounter, risikoEntries, muligheterEntries, bhQuestions, bhIdCounter})); showToast('Lagret'); }
  catch(e) { showToast('Kunne ikke lagre'); }
}

/* ── Lenke-strip ── */
function renderLinks() {
  var el = document.getElementById('link-strip');
  if (!el) return;
  var html = '<span class="link-strip-label">Dokumenter</span>';
  projectLinks.forEach(function(l) {
    var label = esc(l.label || 'Uten navn');
    if (l.url) {
      html += '<a class="link-chip" href="' + esc(l.url) + '" target="_blank" rel="noopener" title="' + esc(l.url) + '">'
            + '<span class="link-chip-icon">🔗</span>'
            + '<span class="link-chip-text">' + label + '</span>'
            + '<button class="link-chip-edit" title="Rediger" onclick="event.preventDefault();event.stopPropagation();linkOpenEditor(' + l.id + ',\'doc\')">✎</button>'
            + '</a>';
    } else {
      html += '<button class="link-chip empty" title="Lim inn lenke" onclick="linkOpenEditor(' + l.id + ',\'doc\')">'
            + '<span class="link-chip-icon">＋</span>'
            + '<span class="link-chip-text">' + label + '</span>'
            + '</button>';
    }
  });
  html += '<button class="link-add-btn" onclick="linkOpenEditor(null,\'doc\')"><span>＋</span> Legg til lenke</button>';
  el.innerHTML = html;
}

function renderModelLinks() {
  var el = document.getElementById('model-strip');
  if (!el) return;
  var html = '<span class="model-strip-label">Modell</span>';
  modelLinks.forEach(function(l) {
    var label = esc(l.label || 'Uten navn');
    if (l.url) {
      html += '<a class="model-chip" href="' + esc(l.url) + '" target="_blank" rel="noopener" title="' + esc(l.url) + '">'
            + '<span class="model-chip-icon">🧊</span>'
            + '<span class="model-chip-text">' + label + '</span>'
            + '<button class="model-chip-edit" title="Rediger" onclick="event.preventDefault();event.stopPropagation();linkOpenEditor(' + l.id + ',\'model\')">✎</button>'
            + '</a>';
    } else {
      html += '<button class="model-chip empty" title="Lim inn modell-lenke" onclick="linkOpenEditor(' + l.id + ',\'model\')">'
            + '<span class="model-chip-icon">🧊</span>'
            + '<span class="model-chip-text">' + label + '</span>'
            + '</button>';
    }
  });
  html += '<button class="model-add-btn" onclick="linkOpenEditor(null,\'model\')"><span>＋</span> Legg til modell</button>';
  el.innerHTML = html;
}

function linkGroupArr() { return linkEditGroup === 'model' ? modelLinks : projectLinks; }
function renderLinkGroup() { if (linkEditGroup === 'model') renderModelLinks(); else renderLinks(); }

function linkOpenEditor(id, group) {
  linkEditGroup = group || 'doc';
  linkEditId = id;
  var arr = linkGroupArr();
  var link = (id != null) ? arr.find(function(l){ return l.id === id; }) : null;
  var isModel = linkEditGroup === 'model';
  document.getElementById('link-edit-title').textContent = link
    ? (isModel ? 'Rediger modell-lenke' : 'Rediger lenke')
    : (isModel ? 'Ny modell-lenke' : 'Ny lenke');
  document.getElementById('link-edit-label').value = link ? (link.label || '') : (isModel ? 'Modell' : '');
  document.getElementById('link-edit-url').value = link ? (link.url || '') : '';
  document.getElementById('link-del-btn').style.display = link ? 'inline-block' : 'none';
  document.getElementById('link-overlay').classList.add('show');
  setTimeout(function(){ document.getElementById('link-edit-url').focus(); }, 30);
}

function linkCloseEditor() {
  document.getElementById('link-overlay').classList.remove('show');
  linkEditId = null;
}

function linkSaveEditor() {
  var label = document.getElementById('link-edit-label').value.trim();
  var url = document.getElementById('link-edit-url').value.trim();
  if (!label) { showToast('Skriv inn et navn'); return; }
  if (url && !/^https?:\/\//i.test(url)) { url = 'https://' + url; }
  var arr = linkGroupArr();
  if (linkEditId != null) {
    var link = arr.find(function(l){ return l.id === linkEditId; });
    if (link) { link.label = label; link.url = url; }
  } else if (linkEditGroup === 'model') {
    modelLinks.push({ id: modelIdCounter++, label: label, url: url });
  } else {
    projectLinks.push({ id: linkIdCounter++, label: label, url: url });
  }
  renderLinkGroup();
  linkCloseEditor();
  saveData();
  scheduleAutoSave();
}

function linkDeleteCurrent() {
  if (linkEditId == null) return;
  if (linkEditGroup === 'model') {
    modelLinks = modelLinks.filter(function(l){ return l.id !== linkEditId; });
  } else {
    projectLinks = projectLinks.filter(function(l){ return l.id !== linkEditId; });
  }
  renderLinkGroup();
  linkCloseEditor();
  saveData();
  scheduleAutoSave();
}

function clearAll() {
  if (!confirm('Nullstille alle valg, frister og statuser?')) return;
  tasks.forEach(function(t){ t.selected=false; t.frist=''; t.timer=''; t.status='Ikke startet'; t.link=''; t.comment=''; t.ansvar=''; t.fredagstatus=''; t.eier=''; });
  saveData(); render();
  if (activeTab==='kanban') { if(kanbanView==='tidslinje') renderTimeline(); else renderKanban(); }
  if (activeTab==='dashboard') renderDashboard();
  showToast('Nullstilt');
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function switchTab(t) {
  activeTab = t;
  ['liste','kanban','dashboard','ukeplan','ferie','risiko','sporsmal'].forEach(function(x) {
    var te = document.getElementById('tab-'+x);
    var pe = document.getElementById('panel-'+x);
    if(te) te.classList.toggle('active', t===x);
    if(pe) pe.style.display = t===x ? '' : 'none';
  });
  if (t==='kanban') { if(kanbanView==='tidslinje') renderTimeline(); else renderKanban(); }
  if (t==='dashboard') renderDashboard();
  if (t==='ukeplan') renderUkeplan();
  if (t==='ferie') vacRender();
  if (t==='risiko') renderRisiko();
  if (t==='sporsmal') renderBhq();
}

function toggleFilter(f) {
  filters[f] = !filters[f];
  document.getElementById('f-'+f).classList.toggle('on', filters[f]);
  render();
}

function toggleSection(s) { sectionOpen[s] = !sectionOpen[s]; render(); }

function change(id, field, val) {
  const t = tasks.find(t=>t.id===id);
  if (t) t[field] = val;
  scheduleAutoSave();
  updateStats();
  if (activeTab==='kanban') { if(kanbanView==='tidslinje') renderTimeline(); else renderKanban(); }
  if (activeTab==='dashboard') renderDashboard();
  if (activeTab==='ukeplan') renderUkeplan();
}

function toggleSelect(id) {
  const t = tasks.find(t=>t.id===id);
  if (t) t.selected = !t.selected;
  scheduleAutoSave();
  render();
}

function getToday() { return new Date().toISOString().split('T')[0]; }


function _jsAttr(s) { return '\'' + String(s).replace(/\\/g,'\\\\').replace(/'/g,'\\\'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') + '\''; }

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function makeName(name) {
  const parts = (name||'').split('\n').map(l=>l.trim()).filter(Boolean);
  if (parts.length <= 1) return '<span class="task-title">'+esc(name)+'</span>';
  return '<span class="task-title">'+esc(parts[0])+'</span><ul class="task-bullets">'
    + parts.slice(1).map(l=>'<li>'+esc(l.replace(/^[-\u2013\u2022]\s*/,''))+'</li>').join('')
    + '</ul>';
}

function render() {
  updateStats();
  var q=document.getElementById('search').value.toLowerCase().trim();
  var today=getToday();
  var html='';

  Object.keys(SECTIONS_DATA).forEach(function(secName) {
    var isGen = secName === '0 Generell';
    var SEC_HUE = [210,160,25,280,340,195,135,50,305,170,0,240,90,320,60,185,265];
    var hue = SEC_HUE[Object.keys(SECTIONS_DATA).indexOf(secName) % SEC_HUE.length];
    var secColor = 'hsl('+hue+',55%,42%)';
    var secKey = encodeURIComponent(secName);
    var open = sectionOpen[secName];
    var allSecSel = tasks.filter(function(t){return t.section===secName;}).length>0
      && tasks.filter(function(t){return t.section===secName;}).every(function(t){return t.selected;});
    var selCount = tasks.filter(function(t){return t.section===secName&&t.selected;}).length;
    var totalInSec = tasks.filter(function(t){return t.section===secName;}).length;

    html += '<div class="section-block">';
    if(isGen){
      var _gbkey = secName+'||||';
      var _gbkeyEsc = _gbkey.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      var _gbgt = undersecBudget[_gbkey] || {};
      var _genHasOwnTimer = tasks.some(function(t){return t.section===secName && (parseFloat(t.timer)||0)>0;});
      html += '<div class="section-header section-header-grid" style="--sec-color:'+secColor+'" onclick="toggleSection(decodeURIComponent(\''+secKey+'\'))">';
      html += '<span class="sub-grid-cell chevron '+(open?'open':'')+'">&#9654;</span>';
      html += '<input type="checkbox" class="sec-cb sub-grid-cell"'+(allSecSel?' checked':'')
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' onchange="handleSecCb(this)"'
        +' style="width:14px;height:14px;cursor:pointer;accent-color:var(--accent);flex-shrink:0;margin-right:2px"'
        +' onclick="event.stopPropagation()">';
      html += '<span class="sub-grid-cell" style="min-width:0;gap:6px;display:flex;align-items:center">';
      html += '<span class="section-name" style="color:'+secColor+'"'
        +' onclick="event.stopPropagation()"'
        +' ondblclick="event.stopPropagation();startEditSecName(this,decodeURIComponent(\''+secKey+'\'))"'
        +' title="Dobbeltklikk for \u00e5 redigere">'+esc(secName)+'</span>';
      html += '<span class="sec-edit-hint" onclick="event.stopPropagation();startEditSecName(this.previousElementSibling,decodeURIComponent(\''+secKey+'\'))" title="Rediger navn">&#9998;</span>';
      if(selCount>0) html += '<span class="sec-badge sec-sel">'+selCount+' valgt</span>';
      html += '<span class="sec-badge sec-count">'+totalInSec+'</span>';
      html += '</span>';
      html += '<span class="sub-grid-cell"></span>'; // ansvar col (empty)
      html += '<span class="sub-grid-cell"></span>'; // frist col (empty)
      html += '<span class="sub-grid-cell undersec-budget-group">';
      if(!_genHasOwnTimer){
        html += '<input class="undersec-budget-input budget-field" type="number" min="0" placeholder="Timer"'
          +   ' value="'+(_gbgt.timer!=null&&_gbgt.timer!==''?_gbgt.timer:'')+'"'
          +   ' data-bkey="'+_gbkeyEsc+'" data-bfield="timer"'
          +   ' onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" />';
      }
      html += '</span>';
      html += '<span class="sub-grid-cell sub-grid-tail" style="grid-column:7 / -1;display:flex;justify-content:flex-end">';
      html += '<button class="sec-del-btn" onclick="event.stopPropagation();deleteSection(decodeURIComponent(\''+secKey+'\'))" title="Slett kapittel">\u00d7</button>';
      html += '</span>';
      html += '</div>';
    } else {
    html += '<div class="section-header" style="--sec-color:'+secColor+'" onclick="toggleSection(decodeURIComponent(\''+secKey+'\'))">';
    html += '<span class="chevron '+(open?'open':'')+'">&#9654;</span>';
    html += '<input type="checkbox" class="sec-cb"'+(allSecSel?' checked':'')
      +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
      +' onchange="handleSecCb(this)"'
      +' style="width:14px;height:14px;cursor:pointer;accent-color:var(--accent);flex-shrink:0;margin-right:2px"'
      +' onclick="event.stopPropagation()">';
    html += '<span class="section-name" style="color:'+secColor+'"'
      +' onclick="event.stopPropagation()"'
      +' ondblclick="event.stopPropagation();startEditSecName(this,decodeURIComponent(\''+secKey+'\'))"'
      +' title="Dobbeltklikk for \u00e5 redigere">'+esc(secName)+'</span>';
    html += '<span class="sec-edit-hint" onclick="event.stopPropagation();startEditSecName(this.previousElementSibling,decodeURIComponent(\''+secKey+'\'))" title="Rediger navn">&#9998;</span>';
    if(selCount>0) html += '<span class="sec-badge sec-sel">'+selCount+' valgt</span>';
    html += '<span class="sec-badge sec-count">'+totalInSec+'</span>';
    html += '<button class="sec-del-btn" onclick="event.stopPropagation();deleteSection(decodeURIComponent(\''+secKey+'\'))" title="Slett kapittel">\u00d7</button>';
    html += '</div>';
    }

    if(open){
      html += '<div class="task-rows">';
      if(isGen){
        var genItems = _filterTasks(tasks.filter(function(t){return t.section===secName;}), q, today);
        html += _renderSubGroups(genItems, secName, hue, today, '');
        html += '<button class="sub-add-btn" style="margin:6px 12px;display:inline-block"'
          +' onclick="addTask(\'0 Generell\',\'\',\'\')">+ Legg til post</button>';
      } else {
        var undersecs = [];
        tasks.filter(function(t){return t.section===secName;}).forEach(function(t){
          if(undersecs.indexOf(t.undersec)<0) undersecs.push(t.undersec);
        });
        if(undersecs.length>0){
          undersecs.forEach(function(usec){
            var uAll = tasks.filter(function(t){return t.section===secName&&t.undersec===usec;});
            var uVis = _filterTasks(uAll, q, today);
            var uSel = uAll.filter(function(t){return t.selected;}).length;
            var uOpen = !undersecOpen[secName] || undersecOpen[secName][usec] !== false;
            var lc = 'hsl('+hue+',45%,55%)';
            html += '<div class="undersec-block" style="--undersec-color:'+lc+'">';
            html += '<div class="undersec-header undersec-header-grid">';
            html += '<span class="sub-grid-cell sub-grid-drag"></span>';
            html += '<span class="sub-grid-cell"></span>'; // checkbox col (none for undersec)
            html += '<span class="sub-grid-cell undersec-name-wrap">';
            html += '<span class="undersec-chevron '+(uOpen?'open':'')+'"'
              +' onclick="toggleUndersec('+_jsAttr(secName)+','+_jsAttr(usec)+')">&#9654;</span>';
            html += '<span class="undersec-name"'
              +' ondblclick="startEditUndersecName(this,'+_jsAttr(secName)+','+_jsAttr(usec)+')"'
              +' title="Dobbeltklikk for \u00e5 redigere navn">'+esc(usec)+'</span>';
            html += '<span class="undersec-edit-hint"'
              +' onclick="startEditUndersecName(this.previousElementSibling,'+_jsAttr(secName)+','+_jsAttr(usec)+')"'
              +' title="Rediger navn">&#9998;</span>';
            if(uSel>0) html += '<span class="undersec-badge">'+uSel+' valgt</span>';
            html += '<span class="undersec-badge">'+uVis.length+'/'+uAll.length+'</span>';
            html += '</span>';
            html += '<span class="sub-grid-cell"></span>'; // ansvar col (empty)
            html += '<span class="sub-grid-cell"></span>'; // frist col (empty)
            // Only show timer field here if this undersec has NO real sub-groups (e.g. 3 YM)
            var _hasRealSub = uAll.some(function(t){ return !!t.sub; });
            html += '<span class="sub-grid-cell undersec-budget-group">';
            if (!_hasRealSub) {
              var _ubkey = secName+'||'+usec+'||';
              var _ubkeyEsc = _ubkey.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
              var _ubgt = undersecBudget[_ubkey] || {};
              html += '<input class="undersec-budget-input budget-field" type="number" min="0" placeholder="Timer"'
                +   ' value="'+(_ubgt.timer!=null&&_ubgt.timer!==''?_ubgt.timer:'')+'"'
                +   ' data-bkey="'+_ubkeyEsc+'" data-bfield="timer"'
                +   ' onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" />';
            }
            html += '</span>';
            html += '<span class="sub-grid-cell sub-grid-tail" style="grid-column:7 / -1">';
            html += '<button class="undersec-del-btn"'
              +' onclick="deleteUndersec('+_jsAttr(secName)+','+_jsAttr(usec)+')"'
              +' title="Slett underkapittel">\u00d7</button>';
            html += '</span>';
            html += '</div>';
            if(uOpen){
              html += '<div>'+_renderSubGroups(uVis, secName, hue, today, usec)+'</div>';
              html += '<div class="undersec-add-row">';
              html += '<button class="sub-add-btn"'
                +' onclick="addTask('+_jsAttr(secName)+',\'\','+_jsAttr(usec)+')">+ Legg til post</button>';
              html += '<button class="sub-add-btn"'
                +' onclick="addSub('+_jsAttr(secName)+','+_jsAttr(usec)+')">+ Legg til delkapittel</button>';
              html += '</div>';
            }
            html += '</div>';
          });
        }
        html += '<button class="add-undersec-btn" onclick="addUndersec('+_jsAttr(secName)+')">'
          +'<span style="font-size:18px;line-height:1;margin-top:-1px">+</span>'
          +' Legg til nytt underkapittel</button>';
      }
      html += '</div>';
    }
    html += '</div>';
  });

  html += '<button class="add-section-btn" onclick="addSection()">'
    +'<span style="font-size:18px;line-height:1;margin-top:-1px">+</span>'
    +' Legg til nytt kapittel</button>';

  document.getElementById('list-area').innerHTML = html;

  setTimeout(function(){
    document.querySelectorAll('.sec-cb,.sub-cb').forEach(function(cb){
      var sec=cb.getAttribute('data-sec'), sub=cb.getAttribute('data-sub');
      var its = sub
        ? tasks.filter(function(t){return t.section===sec&&t.sub===sub;})
        : tasks.filter(function(t){return t.section===sec;});
      var cnt = its.filter(function(t){return t.selected;}).length;
      cb.indeterminate = cnt>0 && cnt<its.length;
    });
  }, 0);
}

function _filterTasks(list, q, today) {
  return list.filter(function(t){
    if(q && !t.name.toLowerCase().includes(q) && !(t.excelId||'').toLowerCase().includes(q)) return false;
    if(filters.valgte && !t.selected) return false;
    if(filters.frist && !(t.frist&&t.frist<today&&t.status!=='Ferdig')) return false;
    if(filters['pågår'] && t.status!=='Pågår') return false;
    if(filters['skjulferdig'] && t.status==='Ferdig') return false;
    return true;
  });
}

function _renderSubGroups(items, secName, hue, today, undersec) {
  if(items.length===0) return '<div class="empty-state">Ingen poster matcher filter</div>';
  var html='';
  var subs=[];
  items.forEach(function(t){if(subs.indexOf(t.sub)<0) subs.push(t.sub);});
  subs.forEach(function(sub){
    var si = items.filter(function(t){return t.sub===sub;});
    if(sub){
      var sc2='hsl('+hue+',45%,38%)';
      var allS=si.length>0&&si.every(function(t){return t.selected;});
      html += '<div class="sub-header sub-header-grid" style="--sub-accent:'+sc2+'">';
      html += '<span class="sub-grid-cell sub-grid-drag"></span>';
      html += '<input type="checkbox" class="sub-cb sub-grid-cell"'+(allS?' checked':'')
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' data-sub="'+sub.replace(/"/g,'&quot;')+'"'
        +' onchange="handleSubCb(this)" title="Velg alle">';
      html += '<span class="sub-grid-cell sub-name-wrap">';
      html += '<span class="sub-name"'
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' data-sub="'+sub.replace(/"/g,'&quot;')+'"'
        +' ondblclick="startEditSubName(this)">'+esc(sub)+'</span>';
      html += '<span class="sub-edit-hint" ondblclick="startEditSubName(this.previousElementSibling)">&#9998;</span>';
      html += '<span class="sub-count">'+si.length+'</span>';
      html += '</span>';
      html += '<span class="sub-grid-cell"></span>'; // ansvar col (empty)
      html += '<span class="sub-grid-cell"></span>'; // frist col (empty)
      var _bkey = secName+'||'+(undersec||'')+'||'+sub;
      var _bkeyEsc = _bkey.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
      var _bgt = undersecBudget[_bkey] || {};
      html += '<span class="sub-grid-cell undersec-budget-group">'
        + '<input class="undersec-budget-input budget-field" type="number" min="0" placeholder="Timer"'
        +   ' value="'+(_bgt.timer!=null&&_bgt.timer!==''?_bgt.timer:'')+'"'
        +   ' data-bkey="'+_bkeyEsc+'" data-bfield="timer"'
        +   ' onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" />'
        + '</span>';
      html += '<span class="sub-grid-cell sub-grid-tail" style="grid-column:7 / -1">';
      html += '<button class="sub-add-btn"'
        +' data-sec="'+secName.replace(/"/g,'&quot;')+'"'
        +' data-sub="'+sub.replace(/"/g,'&quot;')+'"'
        +' data-undersec="'+(undersec||'').replace(/"/g,'&quot;')+'"'
        +' onclick="handleSubAdd(this)">+ Legg til post</button>';
      html += '</span>';
      html += '</div>';
    }
    si.forEach(function(t){
      var ov=t.frist&&t.frist<today&&t.status!=='Ferdig';
      var sc=STATUS_COLORS[t.status]||{bg:'',color:''};
      html += '<div class="task-row'+(t.selected?' selected':'')+'" id="row-'+t.id+'" draggable="true" data-id="'+t.id+'">';
      html += '<span class="drag-handle" title="Dra for å sortere">&#8942;</span>';
      html += '<input type="checkbox" class="cb" '+(t.selected?'checked':'')+' onchange="toggleSelect('+t.id+')">';
      html += '<div class="task-name-cell">';
      html += '<div class="name-display-wrap" id="namedisplay-'+t.id+'">';
      html += '<div class="task-name-content">'+makeName(t.name)+'</div>';
      html += '<button class="pencil-btn" onclick="startEditName('+t.id+')" title="Rediger">&#9998;</button>';
      html += '<button class="delete-btn" onclick="deleteTask('+t.id+')" title="Slett">\u00d7</button>';
      html += '</div>';
      html += '<div class="name-edit-wrap" id="nameedit-'+t.id+'">';
      html += '<textarea class="name-edit-input" rows="3"'
        +' onblur="commitEditName('+t.id+',this.value)"'
        +' onkeydown="if(event.key===\'Escape\')cancelEditName('+t.id+')">'+esc(t.name)+'</textarea>';
      html += '</div>';
      html += '</div>';
      html += '<input type="text" class="comment-input ansvar-input" placeholder="Ansvar\u2026" value="'+esc(t.ansvar)+'"'
        +' onchange="change('+t.id+',\'ansvar\',this.value)">';
      html += '<div class="locked-field-wrap" onclick="requestLockedEdit('+t.id+',\'frist\',this)">';
      html += '<div class="locked-display" style="'+(ov?'border-color:var(--red);background:var(--red-bg)':'')+'">';
      html += t.frist ? '<span style="'+(ov?'color:var(--red)':'')+'">&#128197; '+t.frist+'</span>'
                      : '<span class="ld-placeholder">Sett frist\u2026</span>';
      html += '</div>';
      if(t.frist) html += '<span class="lock-icon">&#128274;</span>';
      html += '</div>';
      html += '<div class="locked-field-wrap" onclick="requestLockedEdit('+t.id+',\'timer\',this)">';
      html += '<div class="locked-display">';
      html += t.timer ? '<span>&#9201; '+t.timer+'t</span>' : '<span class="ld-placeholder">Timer\u2026</span>';
      html += '</div>';
      if(t.timer) html += '<span class="lock-icon">&#128274;</span>';
      html += '</div>';
      html += '<select class="status-sel" style="background:'+sc.bg+';color:'+sc.color+'"'
        +' onchange="this.style.background=STATUS_COLORS[this.value].bg;this.style.color=STATUS_COLORS[this.value].color;change('+t.id+',\'status\',this.value)">';
      STATUSES.forEach(function(s){ html += '<option'+(t.status===s?' selected':'')+'>'+s+'</option>'; });
      html += '</select>';
      html += '<select class="status-sel fredag-input" onchange="change('+t.id+',\'fredagstatus\',this.value)">';
      FREDAG_PCTS.forEach(function(p){ html += '<option value="'+p+'"'+(t.fredagstatus===p?' selected':'')+'>'+(p===''?'\u2013':p)+'</option>'; });
      html += '</select>';
      html += '<div class="link-cell">';
      html += '<input type="text" class="link-input" placeholder="https://\u2026" value="'+esc(t.link)+'"'
        +' onchange="change('+t.id+',\'link\',this.value)" onblur="updateLinkBtn('+t.id+')">';
      if(t.link) html += '<a class="link-btn" href="'+esc(t.link)+'" target="_blank" style="display:inline-block">\u2197</a>';
      html += '</div>';
      html += '<input type="text" class="comment-input" placeholder="Kommentar\u2026" value="'+esc(t.comment)+'"'
        +' onchange="change('+t.id+',\'comment\',this.value)">';
      html += '</div>';
    });
  });
  return html;
}

function updateLinkBtn(id) {
  var t=tasks.find(t=>t.id===id), row=document.getElementById('row-'+id);
  if(!row||!t) return;
  var cell=row.querySelector('.link-cell'), btn=cell.querySelector('.link-btn');
  if(t.link&&!btn){ var a=document.createElement('a'); a.className='link-btn'; a.href=t.link; a.target='_blank'; a.textContent='\u2197'; a.style.display='inline-block'; cell.appendChild(a); }
  else if(!t.link&&btn){ btn.remove(); }
  else if(btn){ btn.href=t.link; }
}

function calcBudgetTimer() {
  var total = tasks.reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  Object.keys(undersecBudget).forEach(function(k){
    var bt = parseFloat(undersecBudget[k].timer)||0;
    if(bt<=0) return;
    var parts=k.split('||'), gSec=parts[0], gUsec=parts[1]||'', gSub=parts[2]||'';
    // Sub-group budget: skip if an undersec-level budget exists for same section+undersec
    if(gSub!=='') {
      var hasUndersecBudget = Object.keys(undersecBudget).some(function(k2){
        var p2=k2.split('||');
        return p2[0]===gSec && (p2[1]||'')===gUsec && (p2[2]||'')==='';
      });
      if(hasUndersecBudget) return;
    }
    var groupTasks=tasks.filter(function(t){
      return t.section===gSec && (t.undersec||'')===gUsec && (t.sub||'')===gSub;
    });
    var hasOwnTimer=groupTasks.some(function(t){ return (parseFloat(t.timer)||0)>0; });
    if(!hasOwnTimer) total+=bt;
  });
  return total;
}

function calcFerdigTimer() {
  var total = tasks.filter(function(t){ return t.status==='Ferdig'; })
                   .reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  Object.keys(undersecBudget).forEach(function(k){
    var bt = parseFloat(undersecBudget[k].timer)||0;
    if(bt<=0) return;
    var parts=k.split('||'), gSec=parts[0], gUsec=parts[1]||'', gSub=parts[2]||'';
    if(gSub!=='') {
      var hasUndersecBudget = Object.keys(undersecBudget).some(function(k2){
        var p2=k2.split('||');
        return p2[0]===gSec && (p2[1]||'')===gUsec && (p2[2]||'')==='';
      });
      if(hasUndersecBudget) return;
    }
    var groupTasks=tasks.filter(function(t){
      return t.section===gSec && (t.undersec||'')===gUsec && (t.sub||'')===gSub;
    });
    var hasOwnTimer=groupTasks.some(function(t){ return (parseFloat(t.timer)||0)>0; });
    if(hasOwnTimer) return;
    var allFerdig=groupTasks.length>0 && groupTasks.every(function(t){ return t.status==='Ferdig'; });
    if(allFerdig) total+=bt;
  });
  return total;
}

function updateStats() {
  var sel=tasks.filter(t=>t.selected), total=tasks.length;
  var ferdig=tasks.filter(t=>t.status==='Ferdig').length;
  var totalTimer=calcBudgetTimer();
  var pct=total>0?Math.round(ferdig/total*100):0;
  var today=getToday();
  var overdue=tasks.filter(t=>t.selected&&t.frist&&t.frist<today&&t.status!=='Ferdig').length;
  document.getElementById('stats-bar').innerHTML =
    '<div class="stat"><div class="stat-label">Valgte poster</div><div class="stat-value">'+sel.length+'</div><div class="stat-sub">av '+total+' totalt</div></div>'
    +'<div class="stat"><div class="stat-label">Fremdrift</div><div class="stat-value">'+pct+'%</div><div class="progress-wrap"><div class="progress-fill" style="width:'+pct+'%"></div></div></div>'
    +'<div class="stat"><div class="stat-label">Utl\u00f8pt frist</div><div class="stat-value" style="'+(overdue>0?'color:var(--red)':'')+'">'+overdue+'</div><div class="stat-sub">poster</div></div>';
  var selTimer=sel.reduce(function(s,t){ return s+(parseFloat(t.timer)||0); },0);
  document.getElementById('summary-bar').innerHTML =
    '<span>Valgt: <strong>'+sel.length+'</strong> poster</span>'
    +(selTimer>0?'<span>Budsjett: <strong>'+selTimer+' timer</strong></span>':'')
    +'<span>Ferdigstilt: <strong>'+ferdig+'/'+total+'</strong></span>'
    +(overdue>0?'<span class="overdue-flag">\u26A0 '+overdue+' poster med utl\u00f8pt frist</span>':'')
    +'<span style="margin-left:auto;color:var(--text3);font-size:11px">Auto-lagret ved endring</span>';
}

function switchKanbanView(v) {
  kanbanView=v;
  document.getElementById('ksub-tidslinje').classList.toggle('active',v==='tidslinje');
  document.getElementById('ksub-brett').classList.toggle('active',v==='brett');
  document.getElementById('kview-tidslinje').style.display=v==='tidslinje'?'':'none';
  document.getElementById('kview-brett').style.display=v==='brett'?'':'none';
  if(v==='tidslinje') renderTimeline(); else renderKanban();
}

function renderKanban() {
  var today=getToday(), cols={};
  STATUSES.forEach(function(s){ cols[s]=[]; });
  tasks.filter(t=>t.selected).forEach(function(t){ if(!cols[t.status]) cols[t.status]=[]; cols[t.status].push(t); });
  var html='';
  STATUSES.forEach(function(status) {
    var items=cols[status]||[], sc=STATUS_COLORS[status];
    html+='<div class="k-col"><div class="k-col-header"><span class="k-col-title" style="color:'+sc.color+'">'+status+'</span><span class="k-cnt">'+items.length+'</span></div>';
    if(items.length===0) html+='<div class="k-empty">Ingen poster</div>';
    items.forEach(function(t){
      var overdue=t.frist&&t.frist<today&&status!=='Ferdig';
      html+='<div class="k-card" onclick="switchTab(\'liste\')"><div class="k-section">'+esc(t.section)+'</div><div class="k-name">'+esc(t.name.split('\n')[0])+'</div><div class="k-meta">'+(t.frist?'<span class="k-date '+(overdue?'overdue':'')+'">'+t.frist+'</span>':'')+(t.timer?'<span class="k-timer">'+t.timer+'t</span>':'')+'</div></div>';
    });
    html+='</div>';
  });
  document.getElementById('kanban-area').innerHTML=html;
}

function renderTimeline() {
  var selected=tasks.filter(t=>t.selected), withDate=selected.filter(t=>t.frist), noDate=selected.filter(t=>!t.frist);
  var infoEl=document.getElementById('tl-info'), areaEl=document.getElementById('tl-area');
  if(selected.length===0){ infoEl.textContent='Velg poster i bestillingslisten for \u00e5 vise dem i tidslinjen.'; infoEl.className='tl-info warn'; areaEl.innerHTML=''; return; }
  if(withDate.length===0){ infoEl.textContent=selected.length+' poster valgt \u2013 sett frist for \u00e5 vise i tidslinjen.'; infoEl.className='tl-info warn'; areaEl.innerHTML=''; return; }
  infoEl.textContent=withDate.length+' poster med frist vises.'+(noDate.length>0?' '+noDate.length+' mangler frist.':''); infoEl.className='tl-info';
  var today=getToday(), dates=withDate.map(t=>new Date(t.frist));
  var minDate=new Date(Math.min.apply(null,dates)), maxDate=new Date(Math.max.apply(null,dates));
  var d1=minDate.getDay(); minDate.setDate(minDate.getDate()-(d1===0?6:d1-1)-7);
  var d2=maxDate.getDay(); maxDate.setDate(maxDate.getDate()+(d2===0?0:7-d2)+7);
  var weeks=[],cur=new Date(minDate);
  while(cur<=maxDate){ weeks.push(new Date(cur)); cur.setDate(cur.getDate()+7); }
  function getWeek(d){ var dt=new Date(d); dt.setHours(0,0,0,0); dt.setDate(dt.getDate()+3-(dt.getDay()+6)%7); var w1=new Date(dt.getFullYear(),0,4); return 1+Math.round(((dt-w1)/86400000-3+(w1.getDay()+6)%7)/7); }
  function pct(date){ return Math.max(0,Math.min(100,(new Date(date)-minDate)/(maxDate-minDate)*100)); }
  var lastMonth=-1;
  var weekCells=weeks.map(function(w){ var wn=getWeek(w),mo=w.getMonth(),label='U'+wn; if(mo!==lastMonth){ label=w.toLocaleString('no',{month:'short'}).replace('.','')+'<br><span style="font-size:9px;opacity:.7">U'+wn+'</span>'; lastMonth=mo; } return '<div class="tl-month" style="min-width:52px;max-width:72px">'+label+'</div>'; }).join('');
  var gridCells=weeks.map(function(){ return '<div class="tl-cell" style="min-width:52px;max-width:72px"></div>'; }).join('');
  var todayPct=pct(today), todayLine=todayPct>0&&todayPct<100?'<div class="tl-today-line" style="left:'+todayPct+'%"></div>':'';
  var bySection={};
  Object.keys(SECTIONS_DATA).forEach(function(s){ bySection[s]=[]; });
  withDate.forEach(function(t){ if(!bySection[t.section]) bySection[t.section]=[]; bySection[t.section].push(t); });
  var bodyHtml='';
  Object.keys(SECTIONS_DATA).forEach(function(s){
    var items=bySection[s]; if(!items||items.length===0) return;
    bodyHtml+='<div class="tl-sec-header"><div class="tl-sec-name">'+esc(s)+'</div><div class="tl-sec-line"></div></div>';
    items.forEach(function(t){
      var p=pct(t.frist),overdue=t.frist<today&&t.status!=='Ferdig',barColor=STATUS_BAR[t.status]||'#B4B2A9';
      var marker='<div class="tl-dot" style="left:calc('+p+'% - 5px);background:'+barColor+'" title="'+esc(t.name.split('\n')[0])+'"></div>';
      var bar=''; if(t.status==='P\u00e5g\u00e5r'||t.status==='Til review'){ var sp=Math.max(0,todayPct-1),w=Math.max(0.5,p-sp); bar='<div class="tl-bar" style="left:'+sp+'%;width:'+w+'%;background:'+barColor+';opacity:.25"></div>'; }
      bodyHtml+='<div class="tl-row'+(overdue?' overdue':'')+'" onclick="switchTab(\'liste\')"><div class="tl-task-name"><span class="status-dot" style="background:'+barColor+'"></span><span>'+esc(t.name.split('\n')[0])+'</span></div><div class="tl-grid" style="position:relative">'+gridCells+todayLine+bar+marker+'</div></div>';
    });
  });
  var legendHtml='<div class="tl-legend">'+Object.entries(STATUS_BAR).map(function(e){ return '<div class="tl-leg-item"><div class="tl-leg-dot" style="background:'+e[1]+'"></div>'+e[0]+'</div>'; }).join('')+'<div class="tl-leg-item"><div style="width:10px;height:2px;background:var(--red);opacity:.5;margin-top:1px"></div>I dag</div></div>';
  areaEl.innerHTML=legendHtml+'<div class="tl-container"><div class="tl-header"><div class="tl-label-col">Post</div><div class="tl-months">'+weekCells+'</div></div><div class="tl-body">'+bodyHtml+'</div></div>';
}

function renderDashboard() {
  var today=getToday(),total=tasks.length,ferdig=tasks.filter(t=>t.status==='Ferdig').length;
  var pct=total>0?Math.round(ferdig/total*100):0;
  var overdue=tasks.filter(t=>t.frist&&t.frist<today&&t.status!=='Ferdig');
  var totalTimer=calcBudgetTimer();
  var ferdigTimer=calcFerdigTimer();
  var timerPct=totalTimer>0?Math.round(ferdigTimer/totalTimer*100):0;
  var statusData=[{label:'Ferdig',val:ferdig,color:'#1D9E75'},{label:'P\u00e5g\u00e5r',val:tasks.filter(t=>t.status==='P\u00e5g\u00e5r').length,color:'#EF9F27'},{label:'Til review',val:tasks.filter(t=>t.status==='Til review').length,color:'#378ADD'},{label:'Blokkert',val:tasks.filter(t=>t.status==='Blokkert').length,color:'#E24B4A'},{label:'Ikke startet',val:tasks.filter(t=>t.status==='Ikke startet').length,color:'#B4B2A9'}];
  var r=52,cx=64,cy=64,circ=2*Math.PI*r,off=0;
  var slices=statusData.map(function(d){ var dash=(total>0?d.val/total:0)*circ; var s='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+d.color+'" stroke-width="18" stroke-dasharray="'+dash+' '+(circ-dash)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 '+cx+' '+cy+')" opacity="'+(d.val===0?0.1:1)+'"/>'; off+=dash; return s; }).join('');
  var secBars=Object.keys(SECTIONS_DATA).map(function(sn){ var items=tasks.filter(t=>t.section===sn),done=items.filter(t=>t.status==='Ferdig').length,p=items.length>0?Math.round(done/items.length*100):0; return {name:sn.replace(/^\d+\s*/,''),done:done,total:items.length,pct:p}; });
  var in28=new Date(); in28.setDate(in28.getDate()+28);
  var upcoming=tasks.filter(t=>t.frist&&t.frist>=today&&new Date(t.frist)<=in28&&t.status!=='Ferdig').sort(function(a,b){ return a.frist.localeCompare(b.frist); }).slice(0,8);
  var active=tasks.filter(t=>t.status!=='Ikke startet').slice(0,10);
  var html='<div class="dash-card"><div class="dash-card-title">Fremdrift</div><div class="dash-ring-wrap"><svg width="128" height="128" viewBox="0 0 128 128"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--surface2)" stroke-width="18"/>'+slices+'<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="22" font-weight="300" fill="var(--text)">'+pct+'%</text><text x="'+cx+'" y="'+(cy+20)+'" text-anchor="middle" font-size="9" fill="var(--text3)">ferdigstilt</text></svg><div class="dash-ring-legend">'+statusData.map(function(d){ return '<div class="dash-leg-row"><div class="dash-leg-dot" style="background:'+d.color+'"></div><span>'+d.label+'</span><span class="dash-leg-val">'+d.val+'</span></div>'; }).join('')+'</div></div></div>';
  html+='<div class="dash-card"><div class="dash-card-title">Fremdrift per fagomr\u00e5de</div><div class="dash-bar-list">'+secBars.map(function(s){ return '<div><div class="dash-bar-label"><span>'+esc(s.name)+'</span><span>'+s.done+'/'+s.total+'</span></div><div class="dash-bar-track"><div class="dash-bar-fill" style="width:'+s.pct+'%;background:#1D9E75"></div></div></div>'; }).join('')+'</div></div>';
  html+='<div class="dash-card"><div class="dash-card-title">Utl\u00f8pt frist ('+overdue.length+')</div>'+(overdue.length===0?'<div class="dash-empty">Ingen poster med utl\u00f8pt frist</div>':'<div class="dash-overdue-list">'+overdue.map(function(t){ return '<div class="dash-overdue-item"><span class="dash-overdue-name">'+esc(t.name.split('\n')[0])+'</span><span class="dash-overdue-date">'+t.frist+'</span></div>'; }).join('')+'</div>')+'</div>';
  html+='<div class="dash-card"><div class="dash-card-title">Kommende frister</div>'+(upcoming.length===0?'<div class="dash-empty">Ingen frister de neste 4 ukene</div>':upcoming.map(function(t){ var d=Math.round((new Date(t.frist)-new Date(today))/86400000); return '<div class="dash-activity-row"><div class="dash-act-dot" style="background:'+(STATUS_BAR[t.status]||'#B4B2A9')+'"></div><span class="dash-act-name">'+esc(t.name.split('\n')[0])+'</span><span style="font-size:10px;color:var(--text3);white-space:nowrap">'+t.frist+' <span style="color:'+(d<=3?'var(--red)':'var(--text2)')+'">('+(d)+'d)</span></span></div>'; }).join(''))+'</div>';
  html+='<div class="dash-card"><div class="dash-card-title">Timebudsjett</div><div class="dash-big-num">'+(totalTimer>0?totalTimer:'\u2013')+'</div><div class="dash-sub">timer totalt</div>'+(totalTimer>0?'<div style="margin-top:16px"><div class="dash-bar-label"><span>Ferdigstilt</span><span>'+ferdigTimer+'t av '+totalTimer+'t ('+timerPct+'%)</span></div><div class="dash-bar-track" style="height:10px"><div class="dash-bar-fill" style="width:'+timerPct+'%;background:#1D9E75;height:100%"></div></div></div>':'')+'</div>';
  html+='<div class="dash-card"><div class="dash-card-title">Aktive poster</div>'+(active.length===0?'<div class="dash-empty">Ingen aktive poster</div>':active.map(function(t){ var sc=STATUS_COLORS[t.status]||{bg:'',color:''}; return '<div class="dash-activity-row"><div class="dash-act-dot" style="background:'+(STATUS_BAR[t.status]||'#B4B2A9')+'"></div><span class="dash-act-name">'+esc(t.name.split('\n')[0])+'</span><span class="dash-act-status" style="background:'+sc.bg+';color:'+sc.color+'">'+t.status+'</span></div>'; }).join(''))+'</div>';
  document.getElementById('dash-area').innerHTML=html;
}


// ── Ukeplan ──────────────────────────────────────────────────────────────
function renderUkeplan() {
  var today = getToday();
  var selected = tasks.filter(function(t){ return t.selected; });
  var withDate = selected.filter(function(t){ return t.frist; });
  var infoEl = document.getElementById('uk-info');
  var boardEl = document.getElementById('uk-board');
  var legendEl = document.getElementById('uk-legend');

  if (selected.length === 0) {
    infoEl.textContent = 'Velg poster i bestillingslisten for å vise dem i ukeplanen.';
    boardEl.innerHTML = ''; legendEl.innerHTML = ''; return;
  }
  if (withDate.length === 0) {
    infoEl.textContent = selected.length + ' poster valgt – sett frist på poster for å vise dem i ukeplanen.';
    boardEl.innerHTML = ''; legendEl.innerHTML = ''; return;
  }
  infoEl.textContent = withDate.length + ' poster med frist.' + (selected.length - withDate.length > 0 ? ' ' + (selected.length - withDate.length) + ' mangler frist.' : '');

  // Section colours for notes
  var SEC_COLORS = [
    {bg:'#FFF9C4',color:'#5C4A00',border:'#F5D000'},
    {bg:'#E8F5E9',color:'#1B4A1F',border:'#66BB6A'},
    {bg:'#E3F2FD',color:'#0D3A6B',border:'#42A5F5'},
    {bg:'#FCE4EC',color:'#6A0E2A',border:'#EC407A'},
    {bg:'#F3E5F5',color:'#3A0A5A',border:'#AB47BC'},
    {bg:'#FFF3E0',color:'#5A2800',border:'#FFA726'},
    {bg:'#E0F7FA',color:'#00363A',border:'#26C6DA'},
    {bg:'#F1F8E9',color:'#1B3A00',border:'#9CCC65'},
    {bg:'#FBE9E7',color:'#5A1000',border:'#FF7043'},
    {bg:'#E8EAF6',color:'#1A237E',border:'#5C6BC0'},
    {bg:'#EFEBE9',color:'#3E2723',border:'#A1887F'},
    {bg:'#E0F2F1',color:'#00251A',border:'#26A69A'},
    {bg:'#FAFAFA',color:'#212121',border:'#BDBDBD'},
    {bg:'#FFF8E1',color:'#4A3000',border:'#FFD54F'},
    {bg:'#E8F5E9',color:'#003300',border:'#43A047'},
    {bg:'#E3F2FD',color:'#001A3A',border:'#1E88E5'},
    {bg:'#FCE4EC',color:'#4A0020',border:'#E91E63'},
  ];
  var secNames = Object.keys(SECTIONS_DATA);
  var secColorMap = {};
  secNames.forEach(function(s,i){ secColorMap[s] = SEC_COLORS[i % SEC_COLORS.length]; });

  // Build legend
  legendEl.innerHTML = secNames.filter(function(s){
    return withDate.some(function(t){ return t.section===s; });
  }).map(function(s){
    var c = secColorMap[s];
    return '<div class="uk-leg"><div class="uk-leg-dot" style="background:'+c.border+'"></div>'
      + '<span>'+esc(s.replace(/^\d+\s+/,''))+'</span></div>';
  }).join('');

  // Build week buckets
  function getMonday(d) {
    var dt = new Date(d); var day = dt.getDay();
    dt.setDate(dt.getDate() - (day===0?6:day-1)); return dt.toISOString().split('T')[0];
  }
  function getWeekNum(d) {
    var dt = new Date(d); dt.setHours(0,0,0,0);
    dt.setDate(dt.getDate()+3-(dt.getDay()+6)%7);
    var w1 = new Date(dt.getFullYear(),0,4);
    return 1+Math.round(((dt-w1)/86400000-3+(w1.getDay()+6)%7)/7);
  }
  function addDays(dateStr, n) {
    var d = new Date(dateStr); d.setDate(d.getDate()+n); return d.toISOString().split('T')[0];
  }
  function fmtDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleString('no',{day:'numeric',month:'short'});
  }

  // Overdue bucket
  var overdueItems = withDate.filter(function(t){ return t.frist < today && t.status !== 'Ferdig'; });

  // Collect all mondays from tasks
  var mondays = [];
  withDate.forEach(function(t){
    var m = getMonday(t.frist);
    if(mondays.indexOf(m)<0) mondays.push(m);
  });
  mondays.sort();

  // Extend to show current week even if no tasks
  var thisMonday = getMonday(today);
  if(mondays.indexOf(thisMonday)<0 && mondays.length>0) {
    // Insert current week if it's between first and last
    if(thisMonday>=mondays[0] && thisMonday<=mondays[mondays.length-1]) {
      mondays.push(thisMonday); mondays.sort();
    }
  }

  var STATUS_NOTE_BG = {
    'Ikke startet':'rgba(0,0,0,0)','Pågår':'rgba(239,159,39,.15)',
    'Til review':'rgba(55,138,221,.15)','Ferdig':'rgba(29,158,117,.15)','Blokkert':'rgba(226,75,74,.15)'
  };

  var html = '';

  // Overdue column
  if (overdueItems.length > 0) {
    html += '<div class="uk-week-col uk-overdue-col">';
    html += '<div class="uk-overdue-header"><div class="uk-overdue-label">&#9888; Utl&#248;pt frist</div></div>';
    overdueItems.forEach(function(t){
      var c = secColorMap[t.section]||SEC_COLORS[0];
      html += makeNote(t, c, true, today);
    });
    html += '</div>';
  }

  // Week columns
  mondays.forEach(function(monday) {
    var sunday = addDays(monday, 6);
    var isCurrent = monday === thisMonday;
    var weekNum = getWeekNum(monday);
    var colItems = withDate.filter(function(t){
      return getMonday(t.frist)===monday && !(t.frist<today && t.status!=='Ferdig');
    });

    html += '<div class="uk-week-col'+(isCurrent?' is-current':'')+'">';
    html += '<div class="uk-week-header">';
    html += '<div class="uk-week-label">'+(isCurrent?'&#9679; ':'')+' Uke '+weekNum+'</div>';
    html += '<div class="uk-week-dates">'+fmtDate(monday)+' – '+fmtDate(sunday)+'</div>';
    if(colItems.length>0) html += '<div class="uk-week-count">'+colItems.length+' poster</div>';
    html += '</div>';

    if(colItems.length===0){
      html += '<div class="uk-empty">Ingen poster</div>';
    } else {
      // Sort: Blokkert first, then Pågår, then rest
      colItems.sort(function(a,b){
        var order={'Blokkert':0,'Pågår':1,'Til review':2,'Ikke startet':3,'Ferdig':4};
        return (order[a.status]||3)-(order[b.status]||3);
      });
      colItems.forEach(function(t){
        var c = secColorMap[t.section]||SEC_COLORS[0];
        html += makeNote(t, c, false, today);
      });
    }
    html += '</div>';
  });

  boardEl.innerHTML = html;
}

function makeNote(t, c, forceOverdue, today) {
  var overdue = forceOverdue || (t.frist && t.frist < today && t.status !== 'Ferdig');
  var sc = STATUS_COLORS[t.status]||{bg:'var(--gray-bg)',color:'var(--gray)'};
  var nameLine = t.name.split('\n')[0];
  var extraLines = t.name.split('\n').slice(1).filter(function(l){ return l.trim(); });

  var html = '<div class="uk-note'+(overdue?' overdue':'')+'"'
    + ' style="background:'+c.bg+';color:'+c.color+';border-top-color:'+c.border+(overdue?'':'')+'"'
    + ' onclick="switchTab(\'liste\')" title="'+esc(t.name)+'">';
  html += '<div class="uk-note-section">'+esc(t.section.replace(/^\d+\s+/,''))+'</div>';
  html += '<div class="uk-note-name">'+esc(nameLine);
  if(extraLines.length>0){
    html += '<ul style="margin:4px 0 0 12px;padding:0;font-size:11px;opacity:.75;list-style:disc">';
    extraLines.slice(0,3).forEach(function(l){
      html += '<li>'+esc(l.replace(/^[-–•]\s*/,''))+'</li>';
    });
    if(extraLines.length>3) html += '<li>…</li>';
    html += '</ul>';
  }
  html += '</div>';
  html += '<div class="uk-note-meta">';
  html += '<span class="uk-note-id">'+esc(t.excelId)+'</span>';
  if(t.timer) html += '<span class="uk-note-timer">'+t.timer+'t</span>';
  html += '<span class="uk-note-status" style="background:'+sc.bg+';color:'+sc.color+'">'+t.status+'</span>';
  html += '</div>';
  html += '</div>';
  return html;
}



function deleteTask(id) {
  tasks = tasks.filter(function(t){ return t.id !== id; });
  scheduleAutoSave();
  render();
}

function addTask(section, sub, undersec) {
  var name = 'Ny post';
  tasks.push({
    id: idCounter++, excelId: '',
    section: section, undersec: undersec||'', sub: sub, name: name,
    selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: ''
  });
  scheduleAutoSave();
  render();
  // Focus the new task's name for immediate editing
  var newId = tasks[tasks.length-1].id;
  setTimeout(function(){ startEditName(newId); }, 50);
}



/* ── Underkapittel ── */
function toggleUndersec(sec, usec) {
  if(!undersecOpen[sec]) undersecOpen[sec]={};
  undersecOpen[sec][usec] = (undersecOpen[sec][usec] === false) ? true : false;
  render();
}

function setUndersecBudget(key, field, value) {
  if (!undersecBudget[key]) undersecBudget[key] = {};
  undersecBudget[key][field] = value;
  try { localStorage.setItem('bl_budget', JSON.stringify(undersecBudget)); } catch(e) {}
  updateStats();
  scheduleAutoSave();
}

// Modal is reused for three actions: add chapter, add underkapittel, add delkapittel.
var _pendingUkSec = null;
var _pendingUkUsec = null;
var _ukMode = 'undersec'; // 'section' | 'undersec' | 'sub'

function _openUkModal(title, hint, defaultName) {
  var inp = document.getElementById('ukmodal-input');
  inp.value = defaultName || '';
  document.getElementById('ukmodal-title').textContent = title;
  var hintEl = document.getElementById('ukmodal-hint');
  if (hintEl) hintEl.textContent = hint;
  document.getElementById('ukmodal-overlay').style.display = 'flex';
  setTimeout(function(){ inp.focus(); inp.select(); }, 50);
  inp.onkeydown = function(e) {
    if (e.key === 'Enter') ukModalConfirm();
    if (e.key === 'Escape') ukModalCancel();
  };
}

/* Legg til nytt kapittel (seksjon) */
function addSection() {
  _ukMode = 'section';
  _pendingUkSec = null;
  _pendingUkUsec = null;
  // Suggest next leading number
  var maxNum = 0;
  Object.keys(SECTIONS_DATA).forEach(function(s){
    var m = s.match(/^\d+/);
    if (m && parseInt(m[0],10) > maxNum) maxNum = parseInt(m[0],10);
  });
  _openUkModal('Nytt kapittel',
    'Gi kapittelet et navn. Det opprettes tomt – du legger selv til underkapitler og poster.',
    (maxNum + 1) + ' Nytt kapittel');
}

function addUndersec(sec) {
  _ukMode = 'undersec';
  _pendingUkSec = sec;
  _pendingUkUsec = null;
  var existing = [];
  tasks.filter(function(t){return t.section===sec;}).forEach(function(t){
    if(existing.indexOf(t.undersec)<0) existing.push(t.undersec);
  });
  var m = sec.match(/^\d+/);
  var prefix = m ? m[0] : '';
  var n = existing.length + 1;
  var defaultName = prefix ? (prefix + '.' + n) : ('Underkapittel ' + n);
  _openUkModal('Nytt underkapittel i \"' + sec + '\"',
    'Gi underkapittelet et navn. Det opprettes tomt – du legger selv til poster etterpå.',
    defaultName);
}

/* Legg til nytt delkapittel (sub-gruppe) inne i et underkapittel */
function addSub(sec, usec) {
  _ukMode = 'sub';
  _pendingUkSec = sec;
  _pendingUkUsec = usec || '';
  _openUkModal('Nytt delkapittel',
    'Gi delkapittelet et navn. Det opprettes med én tom post som du kan redigere.',
    '');
}

function ukModalConfirm() {
  var name = (document.getElementById('ukmodal-input').value || '').trim();

  if (_ukMode === 'section') {
    if (!name) { ukModalCancel(); return; }
    if (SECTIONS_DATA[name]) { alert('Det finnes allerede et kapittel med dette navnet.'); return; }
    SECTIONS_DATA[name] = {};          // empty chapter – no default posts
    sectionOpen[name] = true;
    undersecOpen[name] = {};
    ukModalCancel();
    scheduleAutoSave();
    render();
    return;
  }

  var sec = _pendingUkSec;
  if (!name || !sec) { ukModalCancel(); return; }

  if (_ukMode === 'sub') {
    // Add a new delkapittel (sub-group) with a single blank post
    var us = _pendingUkUsec || '';
    tasks.push({
      id: idCounter++, excelId: '',
      section: sec, undersec: us, sub: name, name: 'Ny post',
      selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: ''
    });
    var newSubId = tasks[tasks.length-1].id;
    ukModalCancel();
    scheduleAutoSave();
    render();
    setTimeout(function(){ startEditName(newSubId); }, 50);
    return;
  }

  // _ukMode === 'undersec' — create an EMPTY underkapittel (no copied tasks).
  // Seed it with one blank post so it is visible and ready to edit.
  tasks.push({
    id: idCounter++, excelId: '',
    section: sec, undersec: name, sub: '', name: 'Ny post',
    selected: false, frist: '', timer: '', status: 'Ikke startet', link: '', comment: '', eier: '', ansvar: '', fredagstatus: ''
  });
  var newTaskId = tasks[tasks.length-1].id;
  if(!undersecOpen[sec]) undersecOpen[sec] = {};
  undersecOpen[sec][name] = true;
  ukModalCancel();
  scheduleAutoSave();
  render();
  setTimeout(function(){ startEditName(newTaskId); }, 50);
}

function ukModalCancel() {
  document.getElementById('ukmodal-overlay').style.display = 'none';
  _pendingUkSec = null;
  _pendingUkUsec = null;
  _ukMode = 'undersec';
}

function deleteSection(sec) {
  if (!sec || !SECTIONS_DATA[sec]) return;
  var count = tasks.filter(function(t){ return t.section === sec; }).length;
  var msg = count > 0
    ? 'Slette kapittelet "' + sec + '" og alle ' + count + ' poster under? Dette kan ikke angres.'
    : 'Slette det tomme kapittelet "' + sec + '"?';
  if (!confirm(msg)) return;

  // Remove all tasks in the section
  tasks = tasks.filter(function(t){ return t.section !== sec; });
  // Remove structure + UI state
  delete SECTIONS_DATA[sec];
  delete sectionOpen[sec];
  delete undersecOpen[sec];
  // Clean up any budget keys belonging to this section (keys look like "sec||usec||sub")
  Object.keys(undersecBudget).forEach(function(k){
    if (k.split('||')[0] === sec) delete undersecBudget[k];
  });
  try { localStorage.setItem('bl_budget', JSON.stringify(undersecBudget)); } catch(e) {}

  scheduleAutoSave();
  render();
}

function deleteUndersec(sec, usec) {
  // Don't allow deleting the last underkapittel
  var allInSec = [];
  tasks.filter(function(t){return t.section===sec;}).forEach(function(t){
    if(allInSec.indexOf(t.undersec)<0) allInSec.push(t.undersec);
  });
  if(allInSec.length<=1) {
    alert('Kan ikke slette siste underkapittel. Hvert kapittel m\u00e5 ha minst ett.');
    return;
  }
  if(!confirm('Slette "'+usec+'" og alle poster under?')) return;
  tasks = tasks.filter(function(t){ return !(t.section===sec && t.undersec===usec); });
  scheduleAutoSave(); render();
}

function startEditUndersecName(spanEl, sec, oldName) {
  var inp=document.createElement('input');
  inp.type='text'; inp.className='undersec-edit-input'; inp.value=oldName;
  spanEl.parentNode.insertBefore(inp, spanEl);
  spanEl.style.display='none';
  var done=false;
  function commit(){
    if(done) return; done=true;
    var n=inp.value.trim()||oldName; inp.remove(); spanEl.style.display='';
    if(n!==oldName){
      tasks.forEach(function(t){if(t.section===sec&&t.undersec===oldName) t.undersec=n;});
      if(undersecOpen[sec]&&undersecOpen[sec][oldName]!==undefined){
        undersecOpen[sec][n]=undersecOpen[sec][oldName]; delete undersecOpen[sec][oldName];
      }
      scheduleAutoSave(); render();
    }
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e){
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape'){done=true;inp.remove();spanEl.style.display='';}
  });
  inp.focus(); inp.select();
}

/* ── Edit section / sub names ── */
function startEditSecName(spanEl, currentName) {
  var inp=document.createElement('input');
  inp.type='text'; inp.className='sec-name-input';
  inp.value=currentName; inp.style.color=spanEl.style.color||'';
  spanEl.parentNode.insertBefore(inp, spanEl); spanEl.style.display='none';
  var done=false;
  function commit(){
    if(done)return; done=true;
    var n=inp.value.trim()||currentName; inp.remove(); spanEl.style.display='';
    if(n!==currentName) renameSectionKey(currentName, n);
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e){
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape'){done=true;inp.remove();spanEl.style.display='';}
  });
  inp.focus(); inp.select();
}

function renameSectionKey(o, n) {
  if(SECTIONS_DATA[o]){SECTIONS_DATA[n]=SECTIONS_DATA[o]; delete SECTIONS_DATA[o];}
  if(sectionOpen[o]!==undefined){sectionOpen[n]=sectionOpen[o]; delete sectionOpen[o];}
  if(undersecOpen[o]!==undefined){undersecOpen[n]=undersecOpen[o]; delete undersecOpen[o];}
  tasks.forEach(function(t){if(t.section===o) t.section=n;});
  scheduleAutoSave(); render();
}

function startEditSubName(spanEl) {
  var s=spanEl.getAttribute('data-sec'), sb=spanEl.getAttribute('data-sub');
  var inp=document.createElement('input');
  inp.type='text'; inp.className='sub-name-input'; inp.value=sb;
  spanEl.parentNode.insertBefore(inp, spanEl); spanEl.style.display='none';
  var done=false;
  function commit(){
    if(done)return; done=true;
    var n=inp.value.trim()||sb; inp.remove(); spanEl.style.display='';
    if(n!==sb) renameSubKey(s, sb, n);
  }
  inp.addEventListener('blur', commit);
  inp.addEventListener('keydown', function(e){
    if(e.key==='Enter') inp.blur();
    if(e.key==='Escape'){done=true;inp.remove();spanEl.style.display='';}
  });
  inp.focus(); inp.select();
}

function renameSubKey(sec, o, n) {
  if(SECTIONS_DATA[sec]&&SECTIONS_DATA[sec][o]){
    SECTIONS_DATA[sec][n]=SECTIONS_DATA[sec][o]; delete SECTIONS_DATA[sec][o];
  }
  tasks.forEach(function(t){if(t.section===sec&&t.sub===o) t.sub=n;});
  scheduleAutoSave(); render();
}

function handleSecCb(cb) {
  var sec = cb.getAttribute('data-sec');
  tasks.forEach(function(t) {
    if (t.section === sec) t.selected = cb.checked;
  });
  scheduleAutoSave();
  render();
}

function handleSubCb(cb) {
  var sec = cb.getAttribute('data-sec');
  var sub = cb.getAttribute('data-sub');
  tasks.forEach(function(t) {
    if (t.section === sec && t.sub === sub) t.selected = cb.checked;
  });
  scheduleAutoSave();
  render();
}

function handleSubAdd(btn) {
  var sec = btn.getAttribute('data-sec');
  var sub = btn.getAttribute('data-sub');
  var us  = btn.getAttribute('data-undersec') || '';
  addTask(sec, sub, us);
}

function toggleSubSelect(section, sub, checked) {
  tasks.forEach(function(t) {
    if (t.section === section && t.sub === sub) t.selected = checked;
  });
  scheduleAutoSave();
  render();
}

var PIN_KEY='bestillingsliste_pin_v1', pinBuffer='', pinCallback=null, pinMode='verify', pinSetFirst='';
function getPin(){ try{ return localStorage.getItem(PIN_KEY)||null; }catch(e){ return null; } }
function savePin(p){ try{ localStorage.setItem(PIN_KEY,p); }catch(e){} }

function requestLockedEdit(id,field,wrapEl){
  openInlineEditor(id,field,wrapEl);
}

function openInlineEditor(id,field,wrapEl){
  var t=tasks.find(t=>t.id===id), inp=document.createElement('input');
  inp.type=field==='frist'?'date':'number';
  if(field==='timer'){ inp.min='0'; inp.step='0.5'; inp.placeholder='timer'; }
  inp.value=field==='frist'?(t.frist||''):(t.timer||'');
  inp.style.cssText='width:100%;font-size:12px;padding:5px 7px;border:1.5px solid var(--accent);border-radius:5px;background:var(--surface);color:var(--text);outline:none;font-family:inherit;';
  var disp=wrapEl.querySelector('.locked-display'), lock=wrapEl.querySelector('.lock-icon');
  disp.style.display='none'; if(lock) lock.style.display='none';
  wrapEl.appendChild(inp);
  var committed=false;
  var commit=function(){
    if(committed) return; committed=true;
    var val=inp.value; inp.remove(); disp.style.display=''; if(lock) lock.style.display='';
    if(val!==(field==='frist'?t.frist:String(t.timer))){ change(id,field,val); render(); }
  };
  if(field==='frist'){
    inp.addEventListener('change',commit);
    inp.addEventListener('blur',function(){ setTimeout(function(){ if(!committed) commit(); },200); });
    inp.focus(); try{ inp.showPicker(); }catch(e){}
  } else {
    inp.addEventListener('blur',commit);
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') inp.blur(); });
    inp.focus();
  }
}

function openPinModal(mode,correct,id,field,wrapEl){
  pinBuffer=''; pinMode=mode; pinSetFirst='';
  pinCallback=(id!=null)?function(){ openInlineEditor(id,field,wrapEl); }:function(){};
  window._pinCorrect=correct; updatePinDots();
  document.getElementById('pin-error').textContent='';
  document.getElementById('pin-title').textContent=mode==='set-first'?'Sett ny PIN-kode':'PIN-kode kreves';
  document.getElementById('pin-sub').textContent=mode==='set-first'?'Velg en 4-sifret kode som bare du kjenner.':'Skriv inn PIN for \u00e5 endre frist eller timer.';
  document.getElementById('pin-overlay').classList.add('show');
}

function pinKey(k){
  if(k==='del'){ pinBuffer=pinBuffer.slice(0,-1); updatePinDots(); return; }
  if(pinBuffer.length>=4) return;
  pinBuffer+=k; updatePinDots();
  if(pinBuffer.length===4) setTimeout(processPinEntry,100);
}

function processPinEntry(){
  if(pinMode==='verify'){
    if(pinBuffer===window._pinCorrect){ closePinModal(); if(pinCallback) pinCallback(); }
    else{ showPinError('Feil PIN-kode.'); shakeReset(); }
  } else if(pinMode==='set-first'){
    pinSetFirst=pinBuffer; pinBuffer=''; pinMode='set-confirm'; updatePinDots();
    document.getElementById('pin-title').textContent='Bekreft PIN-kode';
    document.getElementById('pin-sub').textContent='Skriv inn samme kode en gang til.';
  } else if(pinMode==='set-confirm'){
    if(pinBuffer===pinSetFirst){ savePin(pinBuffer); closePinModal(); showToast('PIN satt'); if(pinCallback) pinCallback(); }
    else{ showPinError('Kodene stemmer ikke.'); pinSetFirst=''; pinMode='set-first'; shakeReset(); }
  } else if(pinMode==='change-verify'){
    if(pinBuffer===window._pinCorrect){ pinBuffer=''; pinMode='set-first'; pinSetFirst=''; updatePinDots(); document.getElementById('pin-title').textContent='Sett ny PIN-kode'; document.getElementById('pin-sub').textContent='Velg en ny 4-sifret kode.'; document.getElementById('pin-error').textContent=''; }
    else{ showPinError('Feil PIN-kode.'); shakeReset(); }
  }
}
function shakeReset(){ updatePinDots(true); setTimeout(function(){ pinBuffer=''; updatePinDots(false); document.getElementById('pin-error').textContent=''; },650); }
function updatePinDots(err){ for(var i=0;i<4;i++){ var d=document.getElementById('pd'+i); d.classList.toggle('filled',i<pinBuffer.length&&!err); d.classList.toggle('error',!!err); } }
function showPinError(m){ document.getElementById('pin-error').textContent=m; }
function closePinModal(){ document.getElementById('pin-overlay').classList.remove('show'); pinBuffer=''; }
function pinCancel(){ closePinModal(); pinCallback=null; }

function changePinFlow(){
  var stored=getPin();
  if(!stored){ openPinModal('set-first',null,null,null,null); }
  else{ pinBuffer=''; pinMode='change-verify'; pinSetFirst=''; window._pinCorrect=stored; pinCallback=null; updatePinDots(); document.getElementById('pin-error').textContent=''; document.getElementById('pin-title').textContent='Skriv inn n\u00e5v\u00e6rende PIN'; document.getElementById('pin-sub').textContent='Bekreft n\u00e5v\u00e6rende PIN for \u00e5 sette en ny.'; document.getElementById('pin-overlay').classList.add('show'); }
}

function startEditName(id){
  _doStartEditName(id);
}
function _doStartEditName(id){
  document.getElementById('namedisplay-'+id).style.display='none';
  var w=document.getElementById('nameedit-'+id); w.style.display='block';
  var i=w.querySelector('textarea'); i.focus(); i.select();
}
function commitEditName(id,val){ var v=val.trim(); if(v) change(id,'name',v); document.getElementById('nameedit-'+id).style.display='none'; var disp=document.getElementById('namedisplay-'+id); disp.style.display=''; var t=tasks.find(t=>t.id===id); var nc=disp.querySelector('.task-name-content'); if(nc) nc.innerHTML=makeName(v||t.name); scheduleAutoSave(); }
function cancelEditName(id){ document.getElementById('nameedit-'+id).style.display='none'; document.getElementById('namedisplay-'+id).style.display=''; }

function exportCSV(){ var sel=tasks.filter(t=>t.selected); if(sel.length===0){ showToast('Velg poster f\u00f8rst!'); return; } var csv='\uFEFF'; csv+='ID;Post;Eier;Ansvar/grensesnitt;Seksjon;Delkapittel;Frist;Timer;Status;Fredagstatus;Lenke;Kommentar\n'; sel.forEach(function(t){ csv+='"'+t.excelId+'";"'+t.name.replace(/\n/g,' ')+'";"'+(t.eier||'')+'";"'+(t.ansvar||'')+'";"'+t.section+'";"'+t.sub+'";"'+t.frist+'";"'+t.timer+'";"'+t.status+'";"'+(t.fredagstatus||'')+'";"'+t.link+'";"'+t.comment+'"\n'; }); var a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})); a.download='bestillingsliste_'+new Date().toISOString().split('T')[0]+'.csv'; a.click(); showToast('Eksporterte '+sel.length+' poster'); }


/* ════════ Feriekalender ════════ */
var VAC_COLORS = ['#3a8e6e','#5b6fde','#d97757','#9d6cc5','#c9484e','#c98b4e','#4ca3b8','#a64e8d','#5a7d3e','#6f4ec9'];
var VAC_MONTHS_NO = ['JAN','FEB','MAR','APR','MAI','JUN','JUL','AUG','SEP','OKT','NOV','DES'];
var VAC_MONTHS_LONG = ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'];

function vacColorFor(name) {
  if (!name) return VAC_COLORS[0];
  var h = 0;
  for (var i=0; i<name.length; i++) h = (h*31 + name.charCodeAt(i)) | 0;
  return VAC_COLORS[Math.abs(h) % VAC_COLORS.length];
}

function vacParseDate(s) {
  if (!s) return null;
  var p = s.split('-');
  if (p.length !== 3) return null;
  return new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10));
}
function vacIsoDate(d) {
  var y = d.getFullYear();
  var m = String(d.getMonth()+1).padStart(2,'0');
  var dd = String(d.getDate()).padStart(2,'0');
  return y + '-' + m + '-' + dd;
}
function vacDaysBetween(a, b) {
  var d1 = vacParseDate(a), d2 = vacParseDate(b);
  if (!d1 || !d2) return 0;
  return Math.floor((d2 - d1) / 86400000) + 1;
}
function vacFormatNo(s) {
  var d = vacParseDate(s);
  if (!d) return '';
  return d.getDate() + '. ' + VAC_MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear();
}

function vacAdd() {
  var name = document.getElementById('vac-name').value.trim();
  var from = document.getElementById('vac-from').value;
  var to = document.getElementById('vac-to').value;
  var note = document.getElementById('vac-note').value.trim();
  if (!name) { showToast('Skriv inn navn'); document.getElementById('vac-name').focus(); return; }
  if (!from || !to) { showToast('Velg fra- og til-dato'); return; }
  if (from > to) { showToast('Til-dato må være etter fra-dato'); return; }
  vacations.push({ id: vacIdCounter++, name: name, from: from, to: to, note: note });
  try { localStorage.setItem('vac_last_name', name); } catch(e) {}
  document.getElementById('vac-from').value = '';
  document.getElementById('vac-to').value = '';
  document.getElementById('vac-note').value = '';
  scheduleAutoSave();
  vacRender();
  showToast('Ferie lagt til');
}

function vacChange(id, field, value) {
  var v = vacations.find(function(x){return x.id === id;});
  if (!v) return;
  if ((field === 'from' || field === 'to') && value) {
    var f = field === 'from' ? value : v.from;
    var t = field === 'to' ? value : v.to;
    if (f && t && f > t) { showToast('Til-dato må være etter fra-dato'); vacRender(); return; }
  }
  v[field] = value;
  scheduleAutoSave();
  vacRender();
}

function vacDelete(id) {
  var v = vacations.find(function(x){return x.id === id;});
  if (!v) return;
  if (!confirm('Slette ' + (v.name || 'ferien') + ' (' + vacFormatNo(v.from) + ' – ' + vacFormatNo(v.to) + ')?')) return;
  vacations = vacations.filter(function(x){return x.id !== id;});
  scheduleAutoSave();
  vacRender();
}

function vacShiftStart(days) { vacTimelineOffset += days; vacRender(); }
function vacResetStart() { vacTimelineOffset = -7; vacRender(); }

function vacRenderStats() {
  var el = document.getElementById('vac-stats');
  if (!el) return;
  var today = new Date(); today.setHours(0,0,0,0);
  var todayStr = vacIsoDate(today);
  var active = vacations.filter(function(v){ return v.from && v.to && v.from <= todayStr && v.to >= todayStr; }).length;
  var upcoming = vacations.filter(function(v){ return v.from && v.from > todayStr; }).length;
  var people = {};
  vacations.forEach(function(v){ if(v.name) people[v.name]=1; });
  el.innerHTML = '<span><strong>' + Object.keys(people).length + '</strong> personer</span>'
    + '<span><strong>' + active + '</strong> på ferie nå</span>'
    + '<span><strong>' + upcoming + '</strong> kommende</span>';
}

function vacRenderTimeline() {
  var el = document.getElementById('vac-timeline');
  if (!el) return;
  var today = new Date(); today.setHours(0,0,0,0);
  var start = new Date(today);
  start.setDate(start.getDate() + vacTimelineOffset);
  var totalDays = vacTimelineDays;
  var dayPct = 100 / totalDays;
  var endD = new Date(start);
  endD.setDate(endD.getDate() + totalDays - 1);

  var rangeEl = document.getElementById('vac-tl-range');
  if (rangeEl) rangeEl.textContent = vacFormatNo(vacIsoDate(start)) + ' – ' + vacFormatNo(vacIsoDate(endD));

  // Group entries by person
  var names = [];
  var byName = {};
  vacations.forEach(function(v) {
    var n = v.name || '(uten navn)';
    if (!byName[n]) { byName[n] = []; names.push(n); }
    byName[n].push(v);
  });
  names.sort(function(a,b){ return a.localeCompare(b,'no'); });

  // Month headers
  var monthsHtml = '';
  var cursor = new Date(start);
  while (cursor <= endD) {
    var monthStart = (cursor.getDate() === 1) ? new Date(cursor) : new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    if (monthStart < start) monthStart = new Date(start);
    var monthEnd = new Date(cursor.getFullYear(), cursor.getMonth()+1, 0);
    if (monthEnd > endD) monthEnd = new Date(endD);
    var offsetD = Math.floor((monthStart - start) / 86400000);
    var lenD = Math.floor((monthEnd - monthStart) / 86400000) + 1;
    var label = VAC_MONTHS_NO[monthStart.getMonth()];
    if (monthStart.getMonth() === 0 || offsetD === 0) label += ' ' + monthStart.getFullYear();
    monthsHtml += '<div class="vac-tl-month" style="left:' + (offsetD * dayPct) + '%;width:' + (lenD * dayPct) + '%">' + label + '</div>';
    cursor = new Date(monthEnd);
    cursor.setDate(cursor.getDate() + 1);
  }

  // Weekend shading
  var weekendHtml = '';
  for (var i = 0; i < totalDays; i++) {
    var d = new Date(start);
    d.setDate(d.getDate() + i);
    var dow = d.getDay();
    if (dow === 0 || dow === 6) {
      weekendHtml += '<div class="vac-tl-weekend" style="left:' + (i * dayPct) + '%;width:' + dayPct + '%"></div>';
    }
  }

  // Today line
  var todayOffset = Math.floor((today - start) / 86400000);
  var todayHtml = '';
  if (todayOffset >= 0 && todayOffset < totalDays) {
    var pct = (todayOffset + 0.5) * dayPct;
    todayHtml = '<div class="vac-tl-today" style="left:' + pct + '%"></div>';
  }
  var todayLblHtml = (todayOffset >= 0 && todayOffset < totalDays)
    ? '<div class="vac-tl-today-lbl" style="left:' + ((todayOffset + 0.5) * dayPct) + '%">I dag</div>' : '';

  // Build HTML
  var html = '';
  html += '<div class="vac-tl-name vac-tl-header">Person</div>';
  html += '<div class="vac-tl-month-row">' + monthsHtml + todayLblHtml + '</div>';

  if (names.length === 0) {
    html += '<div class="vac-tl-name" style="color:var(--text3);font-weight:400">–</div>';
    html += '<div class="vac-tl-track">' + weekendHtml + todayHtml
      + '<div class="vac-tl-empty">Ingen ferier registrert ennå – bruk skjemaet over for å legge til</div></div>';
  } else {
    names.forEach(function(n) {
      var color = vacColorFor(n);
      var barsHtml = '';
      byName[n].forEach(function(v) {
        var vStart = vacParseDate(v.from);
        var vEnd = vacParseDate(v.to);
        if (!vStart || !vEnd) return;
        if (vEnd < start || vStart > endD) return;
        var s0 = vStart < start ? start : vStart;
        var e0 = vEnd > endD ? endD : vEnd;
        var leftD = Math.floor((s0 - start) / 86400000);
        var widthD = Math.floor((e0 - s0) / 86400000) + 1;
        var totalLen = vacDaysBetween(v.from, v.to);
        var lbl = v.note ? v.note : (totalLen + 'd');
        var title = n + ': ' + vacFormatNo(v.from) + ' – ' + vacFormatNo(v.to) + ' (' + totalLen + ' dager)' + (v.note ? ' · ' + v.note : '');
        barsHtml += '<div class="vac-tl-bar" style="left:' + (leftD * dayPct) + '%;width:' + (widthD * dayPct) + '%;background:' + color + '"'
          + ' title="' + esc(title) + '" onclick="vacFocusRow(' + v.id + ')">' + esc(lbl) + '</div>';
      });
      html += '<div class="vac-tl-name"><span class="vac-dot" style="background:' + color + '"></span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(n) + '</span></div>';
      html += '<div class="vac-tl-track">' + weekendHtml + todayHtml + barsHtml + '</div>';
    });
  }

  el.className = 'vac-timeline';
  el.innerHTML = html;
}

function vacFocusRow(id) {
  var row = document.getElementById('vac-row-' + id);
  if (!row) return;
  row.scrollIntoView({behavior:'smooth', block:'center'});
  row.style.transition = 'background .3s';
  row.style.background = 'var(--blue-bg)';
  setTimeout(function(){ row.style.background = ''; }, 1500);
}

function vacRenderList() {
  var tbody = document.getElementById('vac-tbody');
  if (!tbody) return;
  if (vacations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="vac-empty">Ingen ferier registrert ennå. Bruk skjemaet over for å legge til.</div></td></tr>';
    return;
  }
  var sorted = vacations.slice().sort(function(a,b){ return (a.from||'').localeCompare(b.from||''); });
  var todayStr = vacIsoDate(new Date());
  var html = '';
  sorted.forEach(function(v) {
    var color = vacColorFor(v.name);
    var days = vacDaysBetween(v.from, v.to);
    var isPast = v.to && v.to < todayStr;
    var rowStyle = isPast ? ' style="opacity:.55"' : '';
    html += '<tr id="vac-row-' + v.id + '"' + rowStyle + '>';
    html += '<td><div class="vac-name-cell"><span class="vac-dot" style="background:' + color + '"></span>'
      + '<input type="text" value="' + esc(v.name||'') + '" placeholder="Navn" onchange="vacChange(' + v.id + ',\'name\',this.value)"></div></td>';
    html += '<td><input type="date" value="' + (v.from||'') + '" onchange="vacChange(' + v.id + ',\'from\',this.value)"></td>';
    html += '<td><input type="date" value="' + (v.to||'') + '" onchange="vacChange(' + v.id + ',\'to\',this.value)"></td>';
    html += '<td class="vac-days">' + (days > 0 ? days + ' dager' : '–') + '</td>';
    html += '<td><input type="text" value="' + esc(v.note||'') + '" placeholder="–" onchange="vacChange(' + v.id + ',\'note\',this.value)"></td>';
    html += '<td><button class="vac-del-btn" onclick="vacDelete(' + v.id + ')" title="Slett">×</button></td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

function vacRender() {
  vacRenderStats();
  vacRenderTimeline();
  vacRenderList();
  // Prefill name field with last-used name on this device
  var nameField = document.getElementById('vac-name');
  if (nameField && !nameField.value) {
    try { var last = localStorage.getItem('vac_last_name'); if (last) nameField.value = last; } catch(e) {}
  }
}

var autoSaveTimer;
function scheduleAutoSave(){ clearTimeout(autoSaveTimer); autoSaveTimer=setTimeout(function(){ try{ localStorage.setItem('bestillingsliste_v4',JSON.stringify({tasks:tasks,sectionOpen:sectionOpen,undersecOpen:undersecOpen,undersecBudget:undersecBudget,SECTIONS_DATA:SECTIONS_DATA,vacations:vacations,vacIdCounter:vacIdCounter,projectLinks:projectLinks,linkIdCounter:linkIdCounter,modelLinks:modelLinks,modelIdCounter:modelIdCounter,risikoEntries:risikoEntries,muligheterEntries:muligheterEntries,bhQuestions:bhQuestions,bhIdCounter:bhIdCounter})); }catch(e){} },1200); }
var _change=change;
window.change=function(id,field,val){ _change(id,field,val); scheduleAutoSave(); };
var _toggleSelect=toggleSelect;
window.toggleSelect=function(id){ _toggleSelect(id); scheduleAutoSave(); };


/* ════════ JSONBin Sync ════════ */
var SP_CFG_KEY         = 'bl_jb_cfg_v1';
var SP_API_KEY_KEY     = 'bl_jb_api_v1';
var SP_API_KEY_TS_KEY  = 'bl_jb_api_ts_v1';
var SP_API_KEY_TTL_MS  = 16 * 60 * 60 * 1000;  // 16 hours
var spCfg              = null;
var spTimer            = null;
var spLastVer          = 0;
var spLastHash         = "";
// True when there are local changes not yet confirmed uploaded to shared storage.
// Persisted so a page refresh does not let the server overwrite unsynced local edits.
var _spDirty           = false;
try { _spDirty = localStorage.getItem('bl_sp_dirty') === '1'; } catch(e) {}
function _spSetDirty(v) {
  _spDirty = v;
  try { if (v) localStorage.setItem('bl_sp_dirty','1'); else localStorage.removeItem('bl_sp_dirty'); } catch(e) {}
}




function spLoadConfig() {
  try {
    spCfg = {
      binId: "",
      apiKey: "",
      interval: 20
    };

    try {
      spCfg.binId = "6a23213ada38895dfe8df485";  // hardcoded
      var saved = JSON.parse(localStorage.getItem(SP_CFG_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        if (saved.interval) spCfg.interval = saved.interval;
      }
      // Try to load API key from localStorage with TTL check
      var savedKey = localStorage.getItem(SP_API_KEY_KEY);
      var savedTs = localStorage.getItem(SP_API_KEY_TS_KEY);
      if (savedKey && savedTs) {
        var now = Date.now();
        var age = now - parseInt(savedTs);
        if (age < SP_API_KEY_TTL_MS) {
          // TTL still valid
          spCfg.apiKey = savedKey;
        } else {
          // TTL expired, clear stored key
          localStorage.removeItem(SP_API_KEY_KEY);
          localStorage.removeItem(SP_API_KEY_TS_KEY);
        }
      }
    } catch(e) {
      // ignore invalid config
    }

    var apiKeyEl = document.getElementById('sp-api-key');
    var intEl = document.getElementById('sp-interval');

    if (apiKeyEl) apiKeyEl.value = spCfg.apiKey;
    if (intEl) intEl.value = spCfg.interval;

    if (spCfg.apiKey) {
      spSetConnected(true);
      spSetStatus('Koblet til.', 'ok');
      spLastHash = '';
      spPull();
      spStartPolling();
    } else {
      spSetConnected(false);
      spSetStatus('Ikke konfigurert. Fyll inn Bin ID og API Key for å aktivere delt lagring.', '');
    }
  } catch(e) {
    console.error(e);
  }
}





function spConnect() {
  var binId    = "6a23213ada38895dfe8df485";
  var apiKey   = (document.getElementById('sp-api-key').value || '').trim();
  spLastHash = '';  // force first pull to merge
  var interval = parseInt(document.getElementById('sp-interval').value) || 20;
  if (!apiKey) { spSetStatus('Fyll inn API Key.', 'err'); return; }
  spCfg = { binId: binId, apiKey: apiKey, interval: interval };
  _spSetDirty(false); // explicit connect: use server as baseline
  try { localStorage.setItem(SP_CFG_KEY, JSON.stringify({interval: interval})); } catch(e) {}
  try { localStorage.setItem(SP_API_KEY_KEY, apiKey); localStorage.setItem(SP_API_KEY_TS_KEY, Date.now().toString()); } catch(e) {}
  spSetConnected(true);
  spSetStatus('Kobler til…', '');
  spPull();
  spStartPolling();
}

function spDisconnect() {
  spStopPolling();
  spCfg = null;
  try { localStorage.removeItem(SP_CFG_KEY); } catch(e) {}
  try { localStorage.removeItem(SP_API_KEY_KEY); localStorage.removeItem(SP_API_KEY_TS_KEY); } catch(e) {}
  spSetConnected(false);
  spSetDot('');
  spSetStatus('Frakoblet. Fyll inn ny konfigurasjon for å koble til igjen.', '');
}

function spSetConnected(on) {
  ['sp-push-btn','sp-pull-btn','sp-disc-btn'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.display = on ? '' : 'none';
  });
  var connectBtn = document.getElementById('sp-connect-btn');
  if (connectBtn) connectBtn.textContent = on ? 'Oppdater' : 'Koble til';
  document.getElementById('sp-label').textContent = on ? 'Delt ✓' : 'Delt lagring';
}


function spStartPolling() {
  spStopPolling();
  if (!spCfg) return;

  // Bruk interval-feltet hvis det finnes, ellers bruk spCfg.interval (default 20)
  var intEl = document.getElementById('sp-interval');
  var sec = parseInt(intEl ? intEl.value : (spCfg.interval || 20), 10);

  // Litt robusthet
  if (!sec || sec < 10) sec = 20;

  spTimer = setInterval(spPull, sec * 1000);
}

function spStopPolling() { if (spTimer) { clearInterval(spTimer); spTimer = null; } }

function spUrl()     { return 'https://api.jsonbin.io/v3/b/' + encodeURIComponent(spCfg.binId); }
function spHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-Master-Key': spCfg.apiKey || ''
  };
}

async function spPush() {
  if (!spCfg) return;
  spSetDot('busy');
  try {
    var ts = Date.now();
    var payload = {
      tasks: tasks, sectionOpen: sectionOpen, undersecOpen: undersecOpen,
      undersecBudget: undersecBudget,
      SECTIONS_DATA: SECTIONS_DATA, vacations: vacations, vacIdCounter: vacIdCounter,
      projectLinks: projectLinks, linkIdCounter: linkIdCounter,
      modelLinks: modelLinks, modelIdCounter: modelIdCounter,
      bhQuestions: bhQuestions, bhIdCounter: bhIdCounter,
      ts: ts
    };
    var r = await fetch(spUrl(), {
      method: 'PUT',
      headers: spHeaders(),
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      var errText = await r.text().catch(function(){return '';});
      throw new Error('HTTP ' + r.status + ' ' + errText.substring(0,100));
    }
    var data = await r.json();
    spLastVer = (data.metadata || {}).version || spLastVer + 1;
    // Update hash so next pull doesn't re-merge our own data
    spLastHash = ts + '_' + tasks.length + '_' + vacations.length;
    _spSetDirty(false);
    spSetDot('ok');
    spSetStatus('✓ Lastet opp ' + spTime(), 'ok');
  } catch(e) {
    spSetDot('err');
    spSetStatus('Feil ved opplasting: ' + e.message, 'err');
  }
}

async function spPull() {
  if (!spCfg) return;
  spSetDot('busy');
  try {
    // Add cache-buster to prevent stale responses
    var r = await fetch(spUrl() + '/latest?_=' + Date.now(), {
      headers: spHeaders(),
      cache: 'no-store'
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    var data = await r.json();
    if (!data.record) {
      spSetDot('err');
      spSetStatus('Tom respons fra server', 'err');
      return;
    }
    // If we have local changes that haven't been confirmed uploaded, push them up
    // now instead of letting the server overwrite them. This protects deletions,
    // edits and column data (e.g. Ansvar) from being reverted on refresh/poll.
    if (_spDirty) {
      await spPush();
      return;
    }
    // Compare by timestamp + content size (more reliable than version)
    var remoteTs = data.record.ts || 0;
    var remoteTaskCount = (data.record.tasks || []).length;
    var remoteVacCount  = (data.record.vacations || []).length;
    var remoteSig = remoteTs + '_' + remoteTaskCount + '_' + remoteVacCount;
    if (remoteSig !== spLastHash) {
      spLastHash = remoteSig;
      spMerge(data.record);
    }
    spSetDot('ok');
    spSetStatus('✓ Synkronisert ' + spTime(), 'ok');
  } catch(e) {
    spSetDot('err');
    spSetStatus('Feil: ' + e.message + '. Sjekk Bin ID og API-nøkkel.', 'err');
  }
}

function spMerge(remote) {
  if (!remote || !remote.tasks) return;

  // Restore section structure first
  if (remote.SECTIONS_DATA) {
    Object.keys(SECTIONS_DATA).forEach(function(k){ delete SECTIONS_DATA[k]; });
    Object.assign(SECTIONS_DATA, migrateSectionsData(remote.SECTIONS_DATA));
  }

  // Replace tasks entirely with remote version (preserves underkapitler exactly as sender has them)
  tasks = remote.tasks.map(function(s) {
    return {
      id: s.id,
      excelId: s.excelId || '',
      section: migrateSectionName(s.section),
      undersec: s.undersec || '',
      sub: s.sub || '',
      name: s.name || '',
      selected: !!s.selected,
      frist: s.frist || '',
      timer: s.timer || '',
      status: s.status || 'Ikke startet',
      link: s.link || '',
      comment: s.comment || '',
      ansvar: s.ansvar || '',
      eier: s.eier || '',
      fredagstatus: s.fredagstatus || ''
    };
  });

  // Update idCounter so new tasks don't collide
  tasks.forEach(function(t){ if (t.id >= idCounter) idCounter = t.id + 1; });

  // Restore other state
  if (remote.sectionOpen) {
    Object.keys(remote.sectionOpen).forEach(function(k){
      sectionOpen[migrateSectionName(k)] = remote.sectionOpen[k];
    });
  }
  if (remote.undersecOpen) {
    Object.keys(remote.undersecOpen).forEach(function(k){
      var newKey = migrateSectionName(k);
      undersecOpen[newKey] = Object.assign({}, undersecOpen[newKey] || {}, remote.undersecOpen[k]);
    });
  }
  if (remote.undersecBudget) {
    Object.keys(undersecBudget).forEach(function(k){ delete undersecBudget[k]; });
    Object.assign(undersecBudget, migrateUndersecBudgetKeys(remote.undersecBudget));
    try { localStorage.setItem('bl_budget', JSON.stringify(undersecBudget)); } catch(e) {}
  }
  if (remote.vacations) {
    vacations = remote.vacations;
    vacIdCounter = remote.vacIdCounter || (Math.max.apply(null, [0].concat(vacations.map(function(v){return v.id||0;}))) + 1);
  }

  // Restore document links
  if (remote.projectLinks) {
    projectLinks = remote.projectLinks;
    linkIdCounter = remote.linkIdCounter || (Math.max.apply(null, [0].concat(projectLinks.map(function(l){return l.id||0;}))) + 1);
  }

  // Restore model links
  if (remote.modelLinks) {
    modelLinks = remote.modelLinks;
    modelIdCounter = remote.modelIdCounter || (Math.max.apply(null, [0].concat(modelLinks.map(function(l){return l.id||0;}))) + 1);
  }

  // Restore questions to byggherre
  if (remote.bhQuestions) {
    bhQuestions = remote.bhQuestions;
    bhIdCounter = remote.bhIdCounter || (bhQuestions.reduce(function(m,q){ return Math.max(m, q.id||0); }, 0) + 1);
  }

  // Persist locally and re-render
  try {
    localStorage.setItem('bestillingsliste_v4', JSON.stringify({
      tasks: tasks, sectionOpen: sectionOpen, undersecOpen: undersecOpen,
      undersecBudget: undersecBudget,
      SECTIONS_DATA: SECTIONS_DATA, vacations: vacations, vacIdCounter: vacIdCounter,
      projectLinks: projectLinks, linkIdCounter: linkIdCounter,
      modelLinks: modelLinks, modelIdCounter: modelIdCounter,
      bhQuestions: bhQuestions, bhIdCounter: bhIdCounter
    }));
  } catch(e) {}
  render();
  renderLinks();
  renderModelLinks();
  if (activeTab === 'ferie') vacRender();
  if (activeTab === 'dashboard') renderDashboard();
  if (activeTab === 'ukeplan') renderUkeplan();
  if (activeTab === 'sporsmal') renderBhq();
}


function spSetDot(s) { var d=document.getElementById('sp-dot'); if(d) d.className='sp-dot'+(s==='ok'?' ok':s==='busy'?' busy':s==='err'?' err':''); }
function spSetStatus(msg, type) { var el=document.getElementById('sp-status'); if(!el) return; el.textContent=msg; el.className='sp-status'+(type==='ok'?' ok':type==='err'?' err':''); }
function spTime() { return new Date().toLocaleTimeString('no',{hour:'2-digit',minute:'2-digit',second:'2-digit'}); }
function spOpenModal() { document.getElementById('sp-overlay').classList.add('show'); }
function spCloseModal() { document.getElementById('sp-overlay').classList.remove('show'); spStartPolling(); }

// Override scheduleAutoSave to also push to SharePoint when configured
var _origScheduleAutoSave = scheduleAutoSave;
scheduleAutoSave = function() {
  _origScheduleAutoSave();
  if (spCfg) {
    _spSetDirty(true);
    clearTimeout(window._spDebounce);
    window._spDebounce = setTimeout(spPush, 2000);
  }
};
window.scheduleAutoSave = scheduleAutoSave;

// If saved data exists, load it first (skip auto-creating default underkapitler)
var _hasSaved = false;
try { _hasSaved = !!localStorage.getItem('bestillingsliste_v4'); } catch(e) {}


window.addEventListener('DOMContentLoaded', function () {
  if (_hasSaved) {
    initTasksFromSaved();
  } else {
    initTasks();
  }
  loadSaved();
  render();
  renderLinks();
  renderModelLinks();
  spLoadConfig();

  document.body.addEventListener('change', function(e) {
    var el = e.target;
    if (!el.classList.contains('budget-field')) return;
    var key = el.getAttribute('data-bkey');
    var field = el.getAttribute('data-bfield');
    if (key && field) setUndersecBudget(key, field, el.value);
  });
  document.body.addEventListener('input', function(e) {
    var el = e.target;
    if (!el.classList.contains('budget-field')) return;
    var key = el.getAttribute('data-bkey');
    var field = el.getAttribute('data-bfield');
    if (key && field) setUndersecBudget(key, field, el.value);
  });
});






// sørg for at lagring skjer etter endring

document.addEventListener("change", scheduleAutoSave);
document.addEventListener("input", scheduleAutoSave);
document.addEventListener("click", function(e){
    if(e.target.matches("select, input, textarea, button")){
        scheduleAutoSave();
    }
});





var _pn=localStorage.getItem('projectName');
if(_pn){
    var _pnel=document.getElementById('project-name');
    if(_pnel) _pnel.textContent=_pn;
}


// ─── RISIKO & MULIGHETER ──────────────────────────────────────────────────────

var risikoEntries = [
  {id:'K-R1', type:'risiko', nr:'K-R1', beskrivelse:'Feil fundamenteringsmetode – setninger/kollaps', sanns:'Middels', kons:'Stor', hvemTilforer:'Geoteknikk – mangelfulle grunnundersøkelser', hvemReduseres:'Supplerende geoteknisk rapport; avklare fundamentering før kontrahering', rest:'Middels', handling:'Kontraktuell sikring via GC', status:'Åpen'},
  {id:'K-R2', type:'risiko', nr:'K-R2', beskrivelse:'Betongsprekkdannelse i bru/kulvert pga. temperatur/krymping', sanns:'Liten', kons:'Middels', hvemTilforer:'Materialvalg – ingen krav til krympearmering i KG', hvemReduseres:'Stille krav til rissnominal armering og herdeplan i anbud', rest:'Liten', handling:'Spesifisere i kravdok.', status:'Åpen'},
  {id:'K-R3', type:'risiko', nr:'K-R3', beskrivelse:'Kapasitetsproblem – spennvidde overskrides ved lasttilfeller', sanns:'Liten', kons:'Stor', hvemTilforer:'Prosjekteringsgrunnlag – usikker nyttelastmodell', hvemReduseres:'Verifisere lastmodell mot N400; avklare med SVV', rest:'Liten', handling:'Kontroll av lastmodell', status:'Åpen'},
  {id:'K-R4', type:'risiko', nr:'K-R4', beskrivelse:'Grensesnittkonflikt bruer/tunnelportaler – kollisjonskontroll', sanns:'Middels', kons:'Middels', hvemTilforer:'Prosjektering – BIM-koordinering mangler', hvemReduseres:'Innføre BIM-koordineringsmøter ukentlig', rest:'Liten', handling:'BIM-rutine', status:'Åpen'},
  {id:'T-R1', type:'risiko', nr:'T-R1', beskrivelse:'Uventet dårlig bergkvalitet – økt sikringsbehov/kostnad', sanns:'Stor', kons:'Stor', hvemTilforer:'Geologi – grunnundersøkelsene dekker ikke hele traseen', hvemReduseres:'Supplerende boringer/seismikk; GC-kontrakt med risikodeling', rest:'Middels', handling:'GC-klausul / risikodeling', status:'Åpen'},
  {id:'T-R2', type:'risiko', nr:'T-R2', beskrivelse:'Vanninntrenging over grenseverdi – forsinkelse og kostnad', sanns:'Middels', kons:'Stor', hvemTilforer:'Hydrologi – ukjent sprekksystem', hvemReduseres:'Tett injeksjonsprogram og beredskapsplan for vannhåndtering', rest:'Middels', handling:'Injeksjonsplan', status:'Åpen'},
  {id:'T-R3', type:'risiko', nr:'T-R3', beskrivelse:'Gasslomme i tunnel – HMS-hendelse', sanns:'Liten', kons:'Stor', hvemTilforer:'Geologi – historikk fra nærliggende tunneler', hvemReduseres:'Gassmåling kontinuerlig; beredskapsplan; informere entreprenør', rest:'Liten', handling:'Beredskapsplan', status:'Åpen'},
  {id:'T-R4', type:'risiko', nr:'T-R4', beskrivelse:'Forsinket levering av tunnelteknisk utstyr (ventilasjon/SRO)', sanns:'Middels', kons:'Middels', hvemTilforer:'Marked – lang leveringstid el-utstyr', hvemReduseres:'Tidlig bestilling; avklare leverandør i anbudsfase', rest:'Liten', handling:'Tidlig innkjøp', status:'Åpen'}
];

var muligheterEntries = [
  {id:'K-M1', type:'mulighet', nr:'K-M1', beskrivelse:'Optimalisert brutype (stålbjelke vs. betong) gir kortere byggetid', sanns:'Middels', kons:'Stor', hvemTilforer:'Prosjektering – tidlig alternativvurdering', hvemReduseres:'Gjennomføre konseptoptimalisering i anbudsfase', rest:'Middels', handling:'Konseptstudie bru', status:'Åpen'},
  {id:'K-M2', type:'mulighet', nr:'K-M2', beskrivelse:'Prefabrikkerte elementer reduserer riggkostnader og tid', sanns:'Middels', kons:'Middels', hvemTilforer:'Marked – tilgjengelig prefab-kapasitet', hvemReduseres:'Avklare leverandørmarked; tilby i anbud', rest:'Middels', handling:'Markedsundersøkelse', status:'Åpen'},
  {id:'K-M3', type:'mulighet', nr:'K-M3', beskrivelse:'Gjenbruk av sprengstein til fundament/fylling – redusert massetransport', sanns:'Stor', kons:'Middels', hvemTilforer:'Massebalanse – tunnel og dagsone nær hverandre', hvemReduseres:'Lage massebalanseplan i prosjekteringsfase', rest:'Stor', handling:'Massebalanseplan', status:'Åpen'},
  {id:'T-M1', type:'mulighet', nr:'T-M1', beskrivelse:'Bedre bergkvalitet enn antatt – reduserte sikringskostnader', sanns:'Middels', kons:'Stor', hvemTilforer:'Geologi – optimistisk tolkning av Q-verdier', hvemReduseres:'Monitorere under driving; justere sikringsklasse løpende', rest:'Middels', handling:'Geologisk oppfølging', status:'Åpen'},
  {id:'T-M2', type:'mulighet', nr:'T-M2', beskrivelse:'Overskuddsmasser fra tunneldriving → pukk til veioppbygging', sanns:'Stor', kons:'Middels', hvemTilforer:'Logistikk – tunneldriving produserer store steinmengder', hvemReduseres:'Planlegge knuseverk og mellomlagring tidlig', rest:'Stor', handling:'Masseplan / knuseverk', status:'Åpen'},
  {id:'T-M3', type:'mulighet', nr:'T-M3', beskrivelse:'Tidlig ferdig tunneldriving frigjør rigg til dagsonetiltak', sanns:'Liten', kons:'Middels', hvemTilforer:'Fremdrift – tunneldriving starter tidlig', hvemReduseres:'Fremdriftsoptimalisering og fleksibel riggstyring', rest:'Liten', handling:'Fremdriftsplan', status:'Åpen'}
];

var risikoView = 'matrise';
var risikoIdCounter = 100;

// Load saved risiko data
function loadRisikoFromSaved(data) {
  if (data.risikoEntries) risikoEntries = data.risikoEntries;
  if (data.muligheterEntries) muligheterEntries = data.muligheterEntries;
  if (data.bhQuestions) bhQuestions = data.bhQuestions;
  if (data.bhIdCounter) bhIdCounter = data.bhIdCounter;
  else bhIdCounter = (bhQuestions.reduce(function(m,q){ return Math.max(m, q.id||0); }, 0) + 1);
}

function switchRisikoView(v) {
  risikoView = v;
  ['matrise','risikoer','muligheter'].forEach(function(x){
    var btn = document.getElementById('rsub-'+x);
    var el  = document.getElementById('rview-'+x);
    if(btn){
      btn.style.background = (v===x) ? '#1a1a2e' : '#fff';
      btn.style.color      = (v===x) ? '#fff'     : '#555';
    }
    if(el) el.style.display = v===x ? 'block' : 'none';
  });
  var addBtn = document.getElementById('risiko-add-btn');
  if(addBtn) addBtn.style.display = (v==='risikoer'||v==='muligheter') ? '' : 'none';
  renderRisiko();
}

// Sannsynlighet/Konsekvens value → number
function snkVal(s){ return s==='Stor'?3:s==='Middels'?2:1; }

// Score → color
function risikoColor(score){
  if(score>=6) return '#E24B4A';
  if(score>=4) return '#F5A623';
  if(score>=3) return '#F5D547';
  return '#6EC97A';
}

function renderRisiko() {
  if(risikoView==='matrise') renderRisikoMatrise();
  else if(risikoView==='risikoer') renderRisikoList('risiko');
  else if(risikoView==='muligheter') renderRisikoList('mulighet');
}

function renderRisikoMatrise() {
  var grid = document.getElementById('rm-grid');
  if(!grid) return;
  // ensure matrise view is visible
  var mv = document.getElementById('rview-matrise');
  if(mv) mv.style.display = 'block';

  // 3×3 matrix: s=3,2,1 (rows top→bottom) × k=1,2,3 (cols left→right)
  var cells = {};
  var all = risikoEntries.concat(muligheterEntries);
  all.forEach(function(e){
    var s = snkVal(e.sanns), k = snkVal(e.kons);
    var key = s+','+k;
    if(!cells[key]) cells[key]=[];
    cells[key].push(e);
  });

  var html = '';
  [3,2,1].forEach(function(s){
    [1,2,3].forEach(function(k){
      var score = s*k;
      var clr = risikoColor(score);
      var items = cells[s+','+k]||[];
      html += '<div style="background:'+clr+';border-radius:8px;padding:6px;display:flex;flex-direction:column;gap:4px;position:relative;overflow:hidden;">';
      html += '<span style="font-size:20px;font-weight:700;color:rgba(0,0,0,.2);position:absolute;bottom:4px;right:8px;line-height:1">'+score+'</span>';
      items.forEach(function(e){
        var icon = e.type==='risiko' ? '⚠' : '✦';
        var chipBg = e.type==='risiko' ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.6)';
        var chipColor = e.type==='risiko' ? '#fff' : '#333';
        html += '<div style="font-size:10px;font-weight:700;padding:2px 5px;border-radius:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:96px;background:'+chipBg+';color:'+chipColor+'" title="'+esc(e.beskrivelse)+'" onclick="switchRisikoView(\''+(e.type==='risiko'?'risikoer':'muligheter')+'\')">'+icon+' '+esc(e.nr)+'</div>';
      });
      html += '</div>';
    });
  });
  grid.innerHTML = html;
}

function renderRisikoList(type) {
  var entries = type==='risiko' ? risikoEntries : muligheterEntries;
  var listId  = type==='risiko' ? 'risiko-list' : 'mulighet-list';
  var el = document.getElementById(listId);
  if(!el) return;

  var snkOpts = ['Liten','Middels','Stor'];
  var statusOpts = ['Åpen','Pågår','Lukket'];
  var ROW_GRID = 'display:grid;grid-template-columns:64px 1fr 76px 76px 1fr 1fr 76px 1fr 84px 36px;gap:4px;padding:4px 12px;border-bottom:1px solid #eee;align-items:start;';
  var CELL = 'display:flex;align-items:flex-start;padding:2px 0;';
  var TA   = 'width:100%;min-height:50px;font-size:13px;font-family:inherit;background:transparent;border:1px solid transparent;border-radius:3px;padding:3px 5px;color:inherit;resize:vertical;line-height:1.45;box-sizing:border-box;';
  var SEL  = 'font-size:13px;font-family:inherit;background:#fff;border:1px solid #ddd;border-radius:4px;padding:3px 4px;cursor:pointer;width:100%;';

  var html = '';
  entries.forEach(function(e){
    var score = snkVal(e.sanns)*snkVal(e.kons);
    var clr = risikoColor(score);
    var bg = (entries.indexOf(e)%2===0) ? '#fff' : '#fafafa';
    html += '<div style="'+ROW_GRID+'background:'+bg+'">';
    // Nr
    html += '<div style="'+CELL+'justify-content:center;padding-top:4px"><span style="font-size:13px;font-weight:700;padding:2px 6px;border-radius:4px;color:#fff;background:'+clr+';white-space:nowrap">'+esc(e.nr)+'</span></div>';
    // Beskrivelse
    html += '<div style="'+CELL+'"><textarea style="'+TA+'" onchange="risikoChange(\''+type+'\',\''+e.id+'\',\'beskrivelse\',this.value)">'+esc(e.beskrivelse)+'</textarea></div>';
    // Sanns
    html += '<div style="'+CELL+'">'+snkSelect(type, e.id, 'sanns', e.sanns, snkOpts, SEL)+'</div>';
    // Kons
    html += '<div style="'+CELL+'">'+snkSelect(type, e.id, 'kons', e.kons, snkOpts, SEL)+'</div>';
    // Hvem tilfører
    html += '<div style="'+CELL+'"><textarea style="'+TA+'" onchange="risikoChange(\''+type+'\',\''+e.id+'\',\'hvemTilforer\',this.value)">'+esc(e.hvemTilforer)+'</textarea></div>';
    // Hvem reduseres
    html += '<div style="'+CELL+'"><textarea style="'+TA+'" onchange="risikoChange(\''+type+'\',\''+e.id+'\',\'hvemReduseres\',this.value)">'+esc(e.hvemReduseres)+'</textarea></div>';
    // Restrisiko
    html += '<div style="'+CELL+'">'+snkSelect(type, e.id, 'rest', e.rest, snkOpts, SEL)+'</div>';
    // Handling
    html += '<div style="'+CELL+'"><textarea style="'+TA+'" onchange="risikoChange(\''+type+'\',\''+e.id+'\',\'handling\',this.value)">'+esc(e.handling)+'</textarea></div>';
    // Status
    html += '<div style="'+CELL+'"><select style="'+SEL+'" onchange="risikoChange(\''+type+'\',\''+e.id+'\',\'status\',this.value)">';
    statusOpts.forEach(function(s){ html += '<option'+(e.status===s?' selected':'')+'>'+s+'</option>'; });
    html += '</select></div>';
    // Delete
    html += '<div style="'+CELL+'justify-content:center;"><button onclick="risikoDelete(\''+type+'\',\''+e.id+'\')" style="background:none;border:none;color:#aaa;cursor:pointer;font-size:14px;padding:2px 4px;border-radius:3px" onmouseover="this.style.color=\'#e24b4a\'" onmouseout="this.style.color=\'#aaa\'">✕</button></div>';
    html += '</div>';
  });
  el.innerHTML = html;
}

function snkSelect(type, id, field, val, opts, selStyle){
  var s = '<select style="'+(selStyle||'')+'" onchange="risikoChange(\''+type+'\',\''+id+'\',\''+field+'\',this.value)">';
  opts.forEach(function(o){ s += '<option'+(val===o?' selected':'')+'>'+o+'</option>'; });
  s += '</select>';
  return s;
}

function risikoChange(type, id, field, val){
  var arr = type==='risiko' ? risikoEntries : muligheterEntries;
  var e = arr.find(function(x){return x.id===id;});
  if(e){ e[field]=val; }
  scheduleAutoSave();
  if(risikoView==='matrise') renderRisikoMatrise();
  if(risikoView==='risikoer') renderRisikoList('risiko');
  if(risikoView==='muligheter') renderRisikoList('mulighet');
}

function risikoDelete(type, id){
  if(!confirm('Slett denne raden?')) return;
  if(type==='risiko') risikoEntries = risikoEntries.filter(function(e){return e.id!==id;});
  else muligheterEntries = muligheterEntries.filter(function(e){return e.id!==id;});
  scheduleAutoSave();
  renderRisiko();
}

function risikoAdd(type){
  risikoIdCounter++;
  var prefix = type==='risiko' ? 'R' : 'M';
  var newEntry = {
    id: prefix+'-'+risikoIdCounter, type:type,
    nr: prefix+'-'+risikoIdCounter,
    beskrivelse:'', sanns:'Middels', kons:'Middels',
    hvemTilforer:'', hvemReduseres:'',
    rest:'Middels', handling:'', status:'Åpen'
  };
  if(type==='risiko') risikoEntries.push(newEntry);
  else muligheterEntries.push(newEntry);
  scheduleAutoSave();
  renderRisikoList(type);
  // scroll to new row
  var el = document.getElementById(type==='risiko'?'risiko-list':'mulighet-list');
  if(el) el.lastElementChild && el.lastElementChild.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ── Spørsmål til byggherre ────────────────────────────────── */
var bhQuestions = [];       // [{id, tema, sentDate, svar}]
var bhIdCounter = 1;

function renderBhq() {
  var tbody = document.getElementById('bhq-tbody');
  if (!tbody) return;
  var info = document.getElementById('bhq-info');
  if (info) info.textContent = bhQuestions.length
    ? (bhQuestions.length + (bhQuestions.length===1 ? ' spørsmål registrert' : ' spørsmål registrert'))
    : 'Ingen spørsmål registrert ennå.';

  if (bhQuestions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="bhq-empty">Ingen spørsmål ennå. Klikk «+ Legg til spørsmål» for å starte.</td></tr>';
    return;
  }

  var html = '';
  bhQuestions.forEach(function(q, i) {
    html += '<tr>';
    html += '<td class="bhq-nr">' + (i+1) + '</td>';
    html += '<td><textarea class="bhq-ta" placeholder="Hva gjelder spørsmålet?" onchange="bhqChange('+q.id+',\'tema\',this.value)">' + esc(q.tema) + '</textarea></td>';
    html += '<td><input type="date" class="bhq-date" value="' + esc(q.sentDate) + '" onchange="bhqChange('+q.id+',\'sentDate\',this.value)"></td>';
    html += '<td><textarea class="bhq-ta" placeholder="Svar fra byggherre …" onchange="bhqChange('+q.id+',\'svar\',this.value)">' + esc(q.svar) + '</textarea></td>';
    html += '<td class="bhq-actions"><button class="bhq-del-btn" title="Slett spørsmål" onclick="bhqDelete('+q.id+')">\u2715</button></td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

function bhqAdd() {
  bhQuestions.push({ id: bhIdCounter++, tema:'', sentDate:'', svar:'' });
  scheduleAutoSave();
  renderBhq();
  // Focus the new row's tema field
  var tbody = document.getElementById('bhq-tbody');
  if (tbody && tbody.lastElementChild) {
    var ta = tbody.lastElementChild.querySelector('textarea');
    if (ta) { ta.focus(); tbody.lastElementChild.scrollIntoView({behavior:'smooth',block:'center'}); }
  }
}

function bhqChange(id, field, val) {
  var q = bhQuestions.find(function(x){ return x.id===id; });
  if (q) q[field] = val;
  scheduleAutoSave();
}

function bhqDelete(id) {
  if (!confirm('Slette dette spørsmålet?')) return;
  bhQuestions = bhQuestions.filter(function(q){ return q.id!==id; });
  scheduleAutoSave();
  renderBhq();
}

// Hook into loadSaved
var _origLoadSaved = loadSaved;
loadSaved = function(){
  _origLoadSaved();
  try {
    var saved = localStorage.getItem('bestillingsliste_v4');
    if(saved){ var data=JSON.parse(saved); loadRisikoFromSaved(data); }
  } catch(e){}
};

// ─── COLUMN RESIZE ────────────────────────────────────────────────────────────

var COL_STORAGE_KEY = 'bestillingsliste_cols_v1';

// Default widths in px (except post/fredag/kommentar which stay flexible)
var COL_DEFAULTS = {
  cb:       { val: 32,   flex: false },
  post:     { val: 280,  flex: false },
  ansvar:   { val: 120,  flex: false },
  frist:    { val: 115,  flex: false },
  timer:    { val: 85,   flex: false },
  status:   { val: 115,  flex: false },
  fredag:   { val: 160,  flex: false },
  lenke:    { val: 110,  flex: false },
  kommentar:{ val: 160,  flex: false }
};

var colWidths = {};

function loadColWidths() {
  try {
    var saved = localStorage.getItem(COL_STORAGE_KEY);
    colWidths = saved ? JSON.parse(saved) : {};
  } catch(e) { colWidths = {}; }
  // Fill defaults for any missing
  Object.keys(COL_DEFAULTS).forEach(function(k) {
    if (!colWidths[k]) colWidths[k] = COL_DEFAULTS[k].val;
  });
}

function saveColWidths() {
  try { localStorage.setItem(COL_STORAGE_KEY, JSON.stringify(colWidths)); } catch(e) {}
}

function applyColWidths() {
  var root = document.documentElement;
  var names = { cb:'cb', post:'post', ansvar:'ansvar', frist:'frist', timer:'timer', status:'status', fredag:'fredag', lenke:'lenke', kommentar:'kommentar' };
  Object.keys(names).forEach(function(k) {
    root.style.setProperty('--col-' + k, colWidths[k] + 'px');
  });
}

function initColResize() {
  loadColWidths();
  applyColWidths();

  document.querySelectorAll('.ch-resize').forEach(function(handle) {
    handle.addEventListener('mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var col = handle.getAttribute('data-col');
      var startX = e.clientX;
      var startW = colWidths[col] || COL_DEFAULTS[col].val;
      handle.classList.add('dragging');
      document.body.classList.add('col-resizing');

      function onMove(e) {
        var dx = e.clientX - startX;
        var newW = Math.max(40, startW + dx);
        colWidths[col] = Math.round(newW);
        applyColWidths();
      }

      function onUp() {
        handle.classList.remove('dragging');
        document.body.classList.remove('col-resizing');
        saveColWidths();
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  });
}

// Double-click handle to reset that column to default
document.addEventListener('dblclick', function(e) {
  if (e.target.classList.contains('ch-resize')) {
    var col = e.target.getAttribute('data-col');
    if (col && COL_DEFAULTS[col]) {
      colWidths[col] = COL_DEFAULTS[col].val;
      applyColWidths();
      saveColWidths();
    }
  }
});

// Init on DOM ready
window.addEventListener('DOMContentLoaded', function() {
  initColResize();
});

// ─── DRAG & DROP REORDER ──────────────────────────────────────────────────────

var dragSrcId = null;

function initDragAndDrop() {
  // Use event delegation on the list area
  var area = document.getElementById('list-area');
  if (!area) return;

  area.addEventListener('dragstart', function(e) {
    var row = e.target.closest('.task-row');
    if (!row) return;
    // Only allow drag from the handle
    if (!e.target.classList.contains('drag-handle')) {
      e.preventDefault();
      return;
    }
    dragSrcId = parseInt(row.getAttribute('data-id'));
    row.classList.add('dragging-row');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragSrcId);
  });

  area.addEventListener('dragend', function(e) {
    var row = e.target.closest('.task-row');
    if (row) row.classList.remove('dragging-row');
    // Clear all indicators
    area.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(function(el) {
      el.classList.remove('drag-over-top', 'drag-over-bottom');
    });
    dragSrcId = null;
  });

  area.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var row = e.target.closest('.task-row');
    // Clear all indicators first
    area.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(function(el) {
      el.classList.remove('drag-over-top', 'drag-over-bottom');
    });
    if (!row || row.getAttribute('data-id') == dragSrcId) return;
    var rect = row.getBoundingClientRect();
    var mid = rect.top + rect.height / 2;
    if (e.clientY < mid) {
      row.classList.add('drag-over-top');
    } else {
      row.classList.add('drag-over-bottom');
    }
  });

  area.addEventListener('dragleave', function(e) {
    var row = e.target.closest('.task-row');
    if (row) {
      row.classList.remove('drag-over-top', 'drag-over-bottom');
    }
  });

  area.addEventListener('drop', function(e) {
    e.preventDefault();
    var targetRow = e.target.closest('.task-row');
    if (!targetRow || dragSrcId === null) return;
    var targetId = parseInt(targetRow.getAttribute('data-id'));
    if (targetId === dragSrcId) return;

    var rect = targetRow.getBoundingClientRect();
    var insertBefore = e.clientY < rect.top + rect.height / 2;

    // Find indices in tasks array
    var srcIdx = tasks.findIndex(function(t) { return t.id === dragSrcId; });
    var tgtIdx = tasks.findIndex(function(t) { return t.id === targetId; });
    if (srcIdx === -1 || tgtIdx === -1) return;

    // Remove src from array
    var srcTask = tasks.splice(srcIdx, 1)[0];
    // Recalculate tgt index after removal
    tgtIdx = tasks.findIndex(function(t) { return t.id === targetId; });
    var insertIdx = insertBefore ? tgtIdx : tgtIdx + 1;
    tasks.splice(insertIdx, 0, srcTask);

    scheduleAutoSave();
    render();
  });
}

// Re-init drag after every render
var _origRender = render;
render = function() {
  _origRender();
  initDragAndDrop();
};

// ─── EXCEL EXPORT med formattering (ExcelJS) ─────────────────────────────────

function exportToExcel() {
  if (typeof ExcelJS === 'undefined') {
    showToast('exceljs.min.js ikke lastet – legg filen i samme mappe som index.html');
    return;
  }

  function hslToArgb(h, s, l) {
    s /= 100; l /= 100;
    var a = s * Math.min(l, 1 - l);
    var f = function(n) {
      var k = (n + h / 30) % 12;
      var v = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
      return Math.round(255 * v).toString(16).padStart(2, '0').toUpperCase();
    };
    return 'FF' + f(0) + f(8) + f(4);
  }

  var SEC_HUE = [210,160,25,280,340,195,135,50,305,170,0,240,90,320,60,185,265];
  var secNames = Object.keys(SECTIONS_DATA);

  var STATUS_FILL  = { 'Ikke startet':'FFD6D4CF', 'Pågår':'FFFDE9C2', 'Til review':'FFD0E5F7', 'Ferdig':'FFC2EBE0', 'Blokkert':'FFF8CECE' };
  var STATUS_FONT  = { 'Ikke startet':'FF555555', 'Pågår':'FF7A4A00', 'Til review':'FF0A3A6B', 'Ferdig':'FF0A4A36', 'Blokkert':'FF6B0A0A' };

  var headers = [
    'Seksjon','Underkapittel','Sub-gruppe','Post-ID',
    'Navn / Beskrivelse','Valgt','Eier','Ansvar / Grensesnitt',
    'Frist','Timer','Status','Fredagstatus (%)',
    'Lenke til leveranse','Kommentar'
  ];

  var wb = new ExcelJS.Workbook();
  wb.creator = 'Bestillingsliste';
  var ws = wb.addWorksheet('Bestillingsliste', { views: [{ state:'frozen', ySplit:1 }] });

  // Column widths
  ws.columns = [
    {width:22},{width:15},{width:28},{width:14},
    {width:55},{width:8},{width:18},{width:24},
    {width:12},{width:10},{width:16},{width:14},
    {width:30},{width:38}
  ];

  // Header row
  var headerRow = ws.addRow(headers);
  headerRow.height = 22;
  headerRow.eachCell(function(cell) {
    cell.fill   = { type:'pattern', pattern:'solid', fgColor:{argb:'FF1A2B3C'} };
    cell.font   = { name:'Calibri', size:10, bold:true, color:{argb:'FFFFFFFF'} };
    cell.alignment = { vertical:'middle', horizontal:'center', wrapText:false };
    cell.border = {
      bottom: { style:'medium', color:{argb:'FF4A90D9'} }
    };
  });

  // Data rows
  tasks.forEach(function(t, i) {
    var secIdx = secNames.indexOf(t.section);
    var hue    = SEC_HUE[secIdx % SEC_HUE.length];
    var secArgb = hslToArgb(hue, 45, 94);   // very light section tint
    var secDark = hslToArgb(hue, 50, 38);   // darker for section column text

    var st = t.status || 'Ikke startet';
    var isEven = i % 2 === 0;

    var rowData = [
      t.section      || '',
      t.undersec     || '',
      t.sub          || '',
      t.excelId      || '',
      t.name         || '',
      t.selected ? 'Ja' : 'Nei',
      t.eier         || '',
      t.ansvar       || '',
      t.frist        || '',
      t.timer        || '',
      st,
      t.fredagstatus || '',
      t.link         || '',
      t.comment      || ''
    ];

    var row = ws.addRow(rowData);
    row.height = 18;

    row.eachCell({ includeEmpty:true }, function(cell, colNum) {
      var col = colNum - 1; // 0-indexed

      // Default styling
      cell.font = { name:'Calibri', size:10 };
      cell.alignment = { vertical:'top', wrapText: col === 4 };
      cell.border = {
        top:    { style:'hair', color:{argb:'FFE0E0E0'} },
        bottom: { style:'hair', color:{argb:'FFE0E0E0'} },
        left:   { style:'hair', color:{argb:'FFE0E0E0'} },
        right:  { style:'hair', color:{argb:'FFE0E0E0'} }
      };

      if (col === 0) {
        // Seksjon-kolonne: farget bakgrunn + bold
        cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb: secArgb} };
        cell.font = { name:'Calibri', size:10, bold:true, color:{argb: secDark} };
        cell.alignment = { vertical:'top', wrapText:false };
        // Left border accent
        cell.border.left = { style:'medium', color:{argb: secDark} };
      } else if (col === 10) {
        // Status-kolonne: fargekodet
        cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb: STATUS_FILL[st] || 'FFFFFFFF'} };
        cell.font = { name:'Calibri', size:10, bold:true, color:{argb: STATUS_FONT[st] || 'FF000000'} };
        cell.alignment = { vertical:'middle', horizontal:'center' };
      } else if (col === 5) {
        // Valgt-kolonne: senter
        cell.alignment = { vertical:'top', horizontal:'center' };
        cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb: isEven ? 'FFFFFFFF' : 'FFF7F8FA'} };
        if (t.selected) {
          cell.font = { name:'Calibri', size:10, bold:true, color:{argb:'FF1D9E75'} };
        }
      } else {
        // Zebra
        cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb: isEven ? 'FFFFFFFF' : 'FFF7F8FA'} };
      }
    });
  });

  // Auto-filter on header row
  ws.autoFilter = { from:'A1', to: String.fromCharCode(64 + headers.length) + '1' };

  // Generate and download
  wb.xlsx.writeBuffer().then(function(buffer) {
    var blob = new Blob([buffer], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    var url  = URL.createObjectURL(blob);

    var today = new Date();
    var dateStr = today.getFullYear() + '-'
      + String(today.getMonth()+1).padStart(2,'0') + '-'
      + String(today.getDate()).padStart(2,'0');
    var projectName = (document.getElementById('project-name')||{}).textContent || 'Bestillingsliste';
    var safeName = projectName.replace(/[^\w\sæøåÆØÅ\-]/g,'').trim().slice(0,40);
    var fileName = safeName + ' ' + dateStr + '.xlsx';

    var a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    showToast('Eksportert: ' + fileName);
  }).catch(function(e) {
    showToast('Eksport feilet: ' + e.message);
    console.error(e);
  });
}
