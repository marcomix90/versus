/** VERSUS – Steuerung von Navigation, Auswahl und Duell. */
import { TOPICS, topicList, compare, simulate, getH2H } from './duel.js';
import { Mikrofon, parseDuell, findItem, normalize } from './speech.js';
import { sounds, tonAn, istAn } from './sound.js';
import { LOGOS } from '../data/logos.js';
import { TIERICONS } from '../data/tiericons.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const state = {
  topic: null,
  a: null,
  b: null,
  ziel: 'a',        // welcher Slot wird als naechstes gefuellt
  filter: 'alle',
  suche: '',
  timer: [],
  ergebnis: null,
};

/* ============ Navigation ============ */
function zeigeScreen(id) {
  timerStoppen();
  $$('.screen').forEach(s => s.classList.toggle('aktiv', s.id === `screen-${id}`));
  window.scrollTo({ top: 0 });
}
function timerStoppen() { state.timer.forEach(clearTimeout); state.timer = []; }
const spaeter = (fn, ms) => state.timer.push(setTimeout(fn, ms));

/* ============ Startbildschirm ============ */
function rendereThemen() {
  const box = $('#themen');
  box.innerHTML = '';
  for (const t of topicList()) {
    const btn = document.createElement('button');
    btn.className = 'thema';
    btn.type = 'button';
    btn.innerHTML =
      `<span class="thema-emoji">${t.emoji}</span>
       <span class="thema-text"><strong>${t.title}</strong><small>${t.items.length} zur Auswahl · ${t.hint}</small></span>`;
    btn.addEventListener('click', () => { sounds.wahl(); oeffneThema(t.id); });
    box.appendChild(btn);
  }
}

/* ============ Auswahl ============ */
function oeffneThema(id) {
  state.topic = TOPICS[id];
  state.a = state.b = null;
  state.ziel = 'a';
  state.filter = 'alle';
  state.suche = '';
  $('#suchfeld').value = '';
  $('#select-titel').textContent = `${state.topic.emoji} ${state.topic.title}`;
  rendereFilter();
  rendereGrid();
  aktualisiereSlots();
  const beispiel = state.topic.beispiel;
  $('#mikro-btn').hidden = !mikro.verfuegbar;
  $('.mikro-text').textContent = `Sag: „${beispiel}“`;
  setzeSprachStatus(mikro.verfuegbar
    ? `Tipp: Mikro drücken und z. B. „${beispiel}“ sagen.`
    : 'Sprachauswahl kann dieser Browser nicht – bitte antippen. (Geht in Chrome/Edge.)');
  try { localStorage.setItem('versus:thema', id); } catch {}
  zeigeScreen('select');
}

function rendereFilter() {
  const box = $('#filter-chips');
  box.innerHTML = '';
  for (const f of state.topic.filters || []) {
    const chip = document.createElement('button');
    chip.className = 'chip' + (state.filter === f.key ? ' aktiv' : '');
    chip.type = 'button';
    chip.textContent = f.label;
    chip.addEventListener('click', () => { sounds.tipp(); state.filter = f.key; rendereFilter(); rendereGrid(); });
    box.appendChild(chip);
  }
}

function sichtbareItems() {
  const t = state.topic;
  let items = [...t.items].sort((x, y) => x.name.localeCompare(y.name, 'de'));
  const f = (t.filters || []).find(f => f.key === state.filter);
  if (f?.match) items = items.filter(f.match);
  if (state.suche) {
    const q = normalize(state.suche);
    items = items.filter(i => [i.name, ...(i.aliases || [])].some(n => normalize(n).includes(q)));
  }
  return items;
}

function bildFuer(item, gross = false) {
  const t = state.topic;
  if (t.tile === 'crest') {
    const [c1, c2] = item.farben;
    const g = gross ? ' gross' : '';
    // Farbkachel als Grundlage; ein vorhandenes Wappenbild legt sich darueber
    const farben = `<span class="wappen${g}" style="background:linear-gradient(135deg,${c1} 0 50%,${c2} 50% 100%)">${item.kurz}</span>`;
    if (!LOGOS.aktiv) return farben;
    // alt="" – der Vereinsname steht ohnehin unter der Kachel; onload blendet
    // die Farbkachel erst aus, wenn das Bild wirklich da ist (sonst bleibt sie)
    return `<span class="wappen-slot${g}">` + farben
      + `<img src="${LOGOS.ordner}${item.id}${LOGOS.endung}" alt=""`
      + ` onload="this.parentElement.classList.add('mit-bild')">`
      + `</span>`;
  }
  if (t.tile === 'emoji' && item.svg) {
    return `<span class="tier-svg${gross ? ' gross' : ''}">${TIERICONS[item.svg] ?? ''}</span>`;
  }
  return `<span class="kachel-bild"${gross ? ' style="font-size:54px"' : ''}>${t.tile === 'flag' ? item.flag : item.emoji}</span>`;
}

/** kleines Symbol fuer Banner und Fliesstext (Emoji oder Piktogramm). */
function symbolFuer(item) {
  const t = state.topic;
  if (t.tile === 'flag') return item.flag;
  if (t.tile === 'crest') return '🏆';
  return item.svg ? `<span class="tier-svg klein">${TIERICONS[item.svg] ?? ''}</span>` : item.emoji;
}

function rendereGrid() {
  const grid = $('#grid');
  grid.innerHTML = '';
  const items = sichtbareItems();
  if (!items.length) {
    grid.innerHTML = '<p class="leer-hinweis">Nichts gefunden – anders schreiben?</p>';
    return;
  }
  for (const item of items) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kachel'
      + (state.a?.id === item.id ? ' gewaehlt-a' : '')
      + (state.b?.id === item.id ? ' gewaehlt-b' : '');
    const marke = state.a?.id === item.id ? 'A' : state.b?.id === item.id ? 'B' : '';
    btn.innerHTML =
      (state.topic.tile === 'crest' ? `<span class="kachel-land">${item.land}</span>` : '')
      + (marke ? `<span class="kachel-marke">${marke}</span>` : '')
      + bildFuer(item)
      + `<span class="kachel-name">${item.name}</span>`;
    btn.addEventListener('click', () => waehle(item));
    grid.appendChild(btn);
  }
}

function waehle(item) {
  // schon gewaehlt -> wieder abwaehlen
  if (state.a?.id === item.id) { state.a = null; state.ziel = 'a'; sounds.tipp(); return nachAuswahl(); }
  if (state.b?.id === item.id) { state.b = null; state.ziel = 'b'; sounds.tipp(); return nachAuswahl(); }

  if (state.ziel === 'a') { state.a = item; state.ziel = state.b ? 'a' : 'b'; }
  else { state.b = item; state.ziel = state.a ? 'b' : 'a'; }
  if (!state.a) state.ziel = 'a'; else if (!state.b) state.ziel = 'b';
  sounds.wahl();
  nachAuswahl();
}

function nachAuswahl() {
  aktualisiereSlots();
  rendereGrid();
}

function aktualisiereSlots() {
  for (const seite of ['a', 'b']) {
    const slot = $(`#slot-${seite}`);
    const item = state[seite];
    slot.classList.toggle('gefuellt', !!item);
    slot.classList.toggle('aktiv-ziel', state.ziel === seite && !item);
    $('.slot-inhalt', slot).innerHTML = item ? bildFuer(item, true) : '<span class="slot-leer">?</span>';
    $('.slot-name', slot).textContent = item ? item.name : 'antippen oder sprechen';
  }
  const bereit = !!(state.a && state.b);
  const btn = $('#start-btn');
  btn.disabled = !bereit;
  btn.classList.toggle('bereit', bereit);
}

function zufallsAuswahl() {
  const items = sichtbareItems();
  if (items.length < 2) return;
  const i = Math.floor(Math.random() * items.length);
  let j = Math.floor(Math.random() * (items.length - 1));
  if (j >= i) j++;
  state.a = items[i]; state.b = items[j]; state.ziel = 'a';
  sounds.wahl();
  nachAuswahl();
}

/* ============ Spracheingabe ============ */
const mikro = new Mikrofon();

function setzeSprachStatus(text, art = '') {
  const el = $('#sprach-status');
  el.textContent = text;
  el.className = 'sprach-status' + (art ? ' ' + art : '');
}

function mikroToggle() {
  if (!mikro.verfuegbar) {
    setzeSprachStatus('Dieser Browser kann keine Spracheingabe. Tipp: Chrome oder Edge nutzen.', 'fehler');
    sounds.fehler();
    return;
  }
  const btn = $('#mikro-btn');
  if (mikro.laeuft) { mikro.stop(); return; }

  sounds.mikroAn();
  btn.classList.add('hoert');
  $('.mikro-text', btn).textContent = 'Ich höre zu…';
  setzeSprachStatus(`Sag zum Beispiel: „${state.topic.beispiel}“`);

  mikro.start({
    onZwischen: (t) => setzeSprachStatus(`„${t}“`),
    onFertig: (text, alternativen) => {
      let treffer = null;
      for (const kandidat of [text, ...alternativen]) {
        const p = parseDuell(kandidat, state.topic.items);
        if (p.a && p.b) { treffer = p; break; }
        if (p.a && !treffer) treffer = p;
      }
      verarbeiteSprache(text, treffer);
    },
    onFehler: (code) => {
      sounds.fehler();
      const texte = {
        'not-allowed': 'Das Mikrofon ist blockiert – bitte in den Browser-Einstellungen erlauben.',
        'service-not-allowed': 'Das Mikrofon ist blockiert – bitte in den Browser-Einstellungen erlauben.',
        'no-speech': 'Ich habe nichts gehört. Nochmal probieren!',
        'audio-capture': 'Kein Mikrofon gefunden.',
        'network': 'Keine Verbindung für die Spracherkennung.',
      };
      setzeSprachStatus(texte[code] || `Spracheingabe hat nicht geklappt (${code}).`, 'fehler');
    },
    onEnde: () => {
      btn.classList.remove('hoert');
      $('.mikro-text', btn).textContent = `Sag: „${state.topic.beispiel}“`;
      sounds.mikroAus();
    },
  });
}

function verarbeiteSprache(text, p) {
  if (!p || (!p.a && !p.b)) {
    sounds.fehler();
    setzeSprachStatus(`„${text}“ – das kenne ich nicht. Versuch es nochmal mit „X gegen Y“.`, 'fehler');
    return;
  }
  if (p.a && p.b) {
    state.a = p.a; state.b = p.b; state.ziel = 'a';
    sounds.wahl();
    setzeSprachStatus(`Verstanden: ${p.a.name} gegen ${p.b.name}`, 'gut');
    nachAuswahl();
    spaeter(() => starteDuell(), 700);
    return;
  }
  const nur = p.a || p.b;
  if (state.ziel === 'a' || !state.a) { state.a = nur; state.ziel = 'b'; }
  else { state.b = nur; state.ziel = 'a'; }
  sounds.wahl();
  setzeSprachStatus(`${nur.name} übernommen – wer ist der Gegner?`, 'gut');
  nachAuswahl();
}

/* ============ Duell ============ */
function starteDuell() {
  if (!state.a || !state.b) return;
  const t = state.topic;
  state.ergebnis = compare(t, state.a, state.b);
  $('#duel-titel').textContent = `${t.emoji} ${state.a.name} vs. ${state.b.name}`;
  rendereDuellKopf(0, 0);
  rendereKategorien();
  $('#ergebnis').innerHTML = '';
  $('#extras').innerHTML = '';
  $('#skip-btn').hidden = false;
  zeigeScreen('duel');
  sounds.pfiff();
  revealSequenz();
}

function rendereDuellKopf(pa, pb) {
  $('#duell-kopf').innerHTML =
    `<div class="duell-seite a">${bildFuer(state.a, true)}
       <span class="duell-name">${state.a.name}</span>
       <span class="duell-punkte" id="punkte-a">${pa}</span></div>
     <div class="duell-mitte">VS</div>
     <div class="duell-seite b">${bildFuer(state.b, true)}
       <span class="duell-name">${state.b.name}</span>
       <span class="duell-punkte" id="punkte-b">${pb}</span></div>`;
}

function rendereKategorien() {
  const box = $('#kategorien');
  box.innerHTML = '';
  state.ergebnis.rows.forEach((row, i) => {
    const div = document.createElement('div');
    div.className = 'kat';
    div.dataset.index = i;
    const kranz = (seite) =>
      row.winner === seite ? ` sieger-${seite}` : '';
    const wert = (seite) =>
      `<div class="kat-wert${kranz(seite)}">
         <strong>${row[seite].ca ? '<i class="ca" title="geschätzter Wert">ca.</i> ' : ''}${row[seite].text}</strong>
         ${row[seite].sub ? `<small>${row[seite].sub}</small>` : ''}
       </div>`;
    div.innerHTML =
      `<div class="kat-titel">${row.cat.icon} ${row.cat.label}</div>
       <div class="kat-werte">
         ${wert('a')}
         <div class="kat-mitte">${row.winner === 'a' ? '◀' : row.winner === 'b' ? '▶' : '='}</div>
         ${wert('b')}
       </div>`;
    box.appendChild(div);
  });
}

function revealSequenz() {
  const rows = state.ergebnis.rows;
  let pa = 0, pb = 0;
  rows.forEach((row, i) => {
    spaeter(() => {
      $(`.kat[data-index="${i}"]`)?.classList.add('sichtbar');
      if (row.winner === 'a') { pa++; sounds.punktA(); }
      else if (row.winner === 'b') { pb++; sounds.punktB(); }
      else sounds.gleich();
      $('#punkte-a').textContent = pa;
      $('#punkte-b').textContent = pb;
    }, 500 + i * 850);
  });
  spaeter(() => zeigeErgebnis(), 500 + rows.length * 850 + 350);
}

function alleZeigen() {
  timerStoppen();
  $$('.kat').forEach(k => k.classList.add('sichtbar'));
  $('#punkte-a').textContent = state.ergebnis.punkteA;
  $('#punkte-b').textContent = state.ergebnis.punkteB;
  zeigeErgebnis();
}

function zeigeErgebnis() {
  const { punkteA, punkteB, sieger } = state.ergebnis;
  $('#skip-btn').hidden = true;
  $('#punkte-a').textContent = punkteA;
  $('#punkte-b').textContent = punkteB;
  const gewinner = sieger === 'a' ? state.a : sieger === 'b' ? state.b : null;
  $('#ergebnis').innerHTML =
    `<div class="sieger-banner ${sieger}">
       ${gewinner
         ? `<span class="gross">${symbolFuer(gewinner)}</span>
            <span>${gewinner.name} gewinnt ${Math.max(punkteA, punkteB)} : ${Math.min(punkteA, punkteB)}</span>`
         : `<span class="gross">🤝</span><span>Unentschieden ${punkteA} : ${punkteB}</span>`}
     </div>`;
  if (gewinner) { sounds.sieg(); konfetti(sieger === 'a' ? ['#ff8c1a', '#ffd23f'] : ['#24c6c9', '#7ef0d3']); }
  else sounds.unentschieden();
  rendereExtras();
}

/* ============ Extras ============ */
function rendereExtras() {
  const box = $('#extras');
  box.innerHTML = '';
  if (state.topic.duell) {
    box.appendChild(bilanzBox());
    box.appendChild(simBox());
  } else {
    box.appendChild(faktenBox());
  }
}

function bilanzBox() {
  const h = getH2H(state.a, state.b);
  const div = document.createElement('div');
  div.className = 'box';
  const marke = h.geschaetzt ? '<span class="badge">≈ geschätzt</span>' : '';
  const l = h.letztes;
  div.innerHTML =
    `<h3>🤝 Direkte Duelle ${marke}</h3>
     <div class="bilanz">
       <div class="sa"><strong>${h.siegeA}</strong><small>Siege ${state.a.name}</small></div>
       <div><strong>${h.remis}</strong><small>Unentschieden</small></div>
       <div class="sb"><strong>${h.siegeB}</strong><small>Siege ${state.b.name}</small></div>
     </div>
     <div class="zeile" style="margin-top:12px">
       <span>Letztes Duell</span>
       <strong>${l.toreA} : ${l.toreB}</strong>
     </div>
     <div class="zeile"><small style="color:var(--text-2)">${l.wettbewerb} ${l.jahr}</small></div>`;
  return div;
}

function simBox() {
  const div = document.createElement('div');
  div.className = 'box';
  const zeichne = () => {
    const s = simulate(state.a, state.b);
    div.innerHTML =
      `<h3>🔮 Simuliertes Spiel <span class="badge">Form zählt am meisten</span></h3>
       <div class="ergebnis-gross">${s.toreA} : ${s.toreB}</div>
       <div class="zeile"><span>Form ${state.a.name}</span><strong>${formBalken(state.a.form)}</strong></div>
       <div class="zeile"><span>Form ${state.b.name}</span><strong>${formBalken(state.b.form)}</strong></div>
       <p class="sim-hinweis">Torerwartung ${s.erwartetA.toFixed(2)} : ${s.erwartetB.toFixed(2)} ·
         ${s.favorit === 'a' ? `Favorit: ${state.a.name}` : s.favorit === 'b' ? `Favorit: ${state.b.name}` : 'ausgeglichen'}</p>`;
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.type = 'button';
    btn.style.width = '100%';
    btn.textContent = '🎲 Nochmal simulieren';
    btn.addEventListener('click', () => { sounds.pfiff(); zeichne(); });
    div.appendChild(btn);
  };
  zeichne();
  return div;
}

const formBalken = (form = 70) => {
  const halbe = Math.round(form / 10);                 // 0-10 Halbsterne
  const voll = Math.floor(halbe / 2);
  return '★'.repeat(voll) + (halbe % 2 ? '½' : '') + '☆'.repeat(5 - voll - (halbe % 2));
};

function faktenBox() {
  const div = document.createElement('div');
  div.className = 'box';
  div.innerHTML =
    `<h3>💡 Wusstest du?</h3>
     <p class="tier-fact"><b>${symbolFuer(state.a)} ${state.a.name}:</b> ${state.a.fact}</p>
     <p class="tier-fact"><b>${symbolFuer(state.b)} ${state.b.name}:</b> ${state.b.fact}</p>`;
  return div;
}

/* ============ Konfetti ============ */
function konfetti(farben) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = $('#konfetti');
  for (let i = 0; i < 60; i++) {
    const f = document.createElement('span');
    f.className = 'flitter';
    f.style.left = Math.random() * 100 + 'vw';
    f.style.background = farben[i % farben.length];
    f.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
    f.style.animationDelay = (Math.random() * 0.5) + 's';
    f.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(f);
    setTimeout(() => f.remove(), 3600);
  }
}

/* ============ Events ============ */
function verdrahten() {
  $$('[data-nav]').forEach(b => b.addEventListener('click', () => { sounds.tipp(); zeigeScreen(b.dataset.nav); }));
  $('#mikro-btn').addEventListener('click', mikroToggle);
  $('#start-btn').addEventListener('click', () => starteDuell());
  $('#zufall-btn').addEventListener('click', zufallsAuswahl);
  $('#skip-btn').addEventListener('click', alleZeigen);
  $('#nochmal-btn').addEventListener('click', () => { sounds.tipp(); zeigeScreen('select'); });
  $('#tausch-btn').addEventListener('click', () => {
    [state.a, state.b] = [state.b, state.a];
    sounds.tipp();
    starteDuell();
  });
  $('#slot-a').addEventListener('click', () => { state.a = null; state.ziel = 'a'; sounds.tipp(); nachAuswahl(); });
  $('#slot-b').addEventListener('click', () => { state.b = null; state.ziel = 'b'; sounds.tipp(); nachAuswahl(); });
  $('#suchfeld').addEventListener('input', (e) => { state.suche = e.target.value; rendereGrid(); });

  const tonBtn = $('#ton-schalter');
  const setzeTon = (an) => {
    tonAn(an);
    tonBtn.textContent = an ? '🔊 Ton an' : '🔇 Ton aus';
    tonBtn.setAttribute('aria-pressed', String(an));
    try { localStorage.setItem('versus:ton', an ? '1' : '0'); } catch {}
  };
  let gespeichert = '1';
  try { gespeichert = localStorage.getItem('versus:ton') ?? '1'; } catch {}
  setzeTon(gespeichert === '1');
  tonBtn.addEventListener('click', () => setzeTon(!istAn()));
}

/* ============ PWA ============ */
let installEvent = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installEvent = e;
  const btn = $('#install-btn');
  btn.hidden = false;
  btn.onclick = async () => { installEvent.prompt(); await installEvent.userChoice; btn.hidden = true; };
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ============ Deep-Link: ?t=nations&a=bra&b=sen ============ */
function deepLink() {
  const p = new URLSearchParams(location.search);
  const t = TOPICS[p.get('t')];
  if (!t) return false;
  oeffneThema(t.id);
  const filter = p.get('f');
  if (filter && (t.filters || []).some(x => x.key === filter)) {
    state.filter = filter;
    rendereFilter();
  }
  const finde = (id) => t.items.find(i => i.id === id);
  state.a = finde(p.get('a')) || null;
  state.b = finde(p.get('b')) || null;
  state.ziel = state.a ? (state.b ? 'a' : 'b') : 'a';
  nachAuswahl();
  if (state.a && state.b && p.get('duell') !== '0') {
    starteDuell();
    if (p.get('show') === '1') alleZeigen();   // Ergebnis sofort komplett zeigen
  }
  return true;
}

/* ============ Start ============ */
rendereThemen();
verdrahten();
deepLink();
