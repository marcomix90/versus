/** Spracheingabe (Web Speech API) + Parsing von "A gegen B". */

export function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(fc|sc|ac|as|ssc|rb|sv|vfb|club|verein|die|der|das)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

function score(query, candidate) {
  if (!query || !candidate) return 0;
  if (query === candidate) return 1;
  if (candidate.startsWith(query) && query.length >= 4) return 0.95;
  if (candidate.includes(query) && query.length >= 4) return 0.9;
  if (query.includes(candidate) && candidate.length >= 4) return 0.88;
  const d = levenshtein(query, candidate);
  return 1 - d / Math.max(query.length, candidate.length);
}

/** Bester Treffer inkl. Guete fuer einen gesprochenen Namen. */
export function bestMatch(query, items) {
  const q = normalize(query);
  if (!q) return { item: null, score: 0 };
  let best = null, bestScore = 0;
  for (const item of items) {
    const kandidaten = [item.name, ...(item.aliases || []), item.kurz].filter(Boolean).map(normalize);
    for (const k of kandidaten) {
      const s = score(q, k);
      if (s > bestScore) { bestScore = s; best = item; }
    }
  }
  return { item: best, score: bestScore };
}

/** Bester Treffer aus items fuer einen gesprochenen Namen. */
export function findItem(query, items, schwelle = 0.62) {
  const { item, score: s } = bestMatch(query, items);
  return s >= schwelle ? item : null;
}

const TRENNER = /\s(?:gegen|gegn|versus|vs|vers|kontra|contra|against|und|and|oder|zu)\s/;

/**
 * Parst einen Satz wie "Frankreich gegen Senegal".
 * Liefert { a, b, rest } - a/b koennen null sein.
 */
export function parseDuell(text, items) {
  const roh = (text || '').toLowerCase()
    .replace(/^(spiele?|starte?|zeige?|mach|los|wir spielen|ich will)\s+/i, '')
    .trim();
  const norm = ' ' + normalize(roh) + ' ';
  const m = norm.match(TRENNER);
  if (m) {
    const i = norm.indexOf(m[0]);
    const a = findItem(norm.slice(0, i), items);
    const b = findItem(norm.slice(i + m[0].length), items);
    if (a || b) return { a, b, text: roh };
  }
  // kein Trennwort erkannt -> die zwei ueberzeugendsten Namen im Satz suchen
  const woerter = normalize(roh).split(' ').filter(Boolean);
  const kandidaten = [];
  for (let len = 1; len <= 3; len++) {
    for (let i = 0; i + len <= woerter.length; i++) {
      const { item, score: s } = bestMatch(woerter.slice(i, i + len).join(' '), items);
      if (item && s >= 0.78) kandidaten.push({ item, score: s, start: i, ende: i + len });
    }
  }
  // stets den besten Treffer zuerst belegen, dann nicht ueberlappende Reste
  kandidaten.sort((x, y) => y.score - x.score || (y.ende - y.start) - (x.ende - x.start));
  const treffer = [];
  for (const k of kandidaten) {
    if (treffer.some(t => k.start < t.ende && k.ende > t.start || t.item.id === k.item.id)) continue;
    treffer.push(k);
    if (treffer.length === 2) break;
  }
  treffer.sort((x, y) => x.start - y.start);
  return { a: treffer[0]?.item || null, b: treffer[1]?.item || null, text: roh };
}

/** Duenne Huelle um SpeechRecognition. */
export class Mikrofon {
  constructor() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.verfuegbar = !!SR;
    if (!SR) return;
    this.erkennung = new SR();
    this.erkennung.lang = 'de-DE';
    this.erkennung.interimResults = true;
    this.erkennung.maxAlternatives = 3;
    this.erkennung.continuous = false;
    this.laeuft = false;
  }

  /** onZwischen(text), onFertig(text, alternativen[]), onFehler(code) */
  start({ onZwischen, onFertig, onFehler, onEnde }) {
    if (!this.verfuegbar || this.laeuft) return;
    const alternativen = [];
    let final = '';
    this.erkennung.onresult = (e) => {
      let zwischen = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          final += r[0].transcript;
          for (let j = 0; j < r.length; j++) alternativen.push(r[j].transcript);
        } else zwischen += r[0].transcript;
      }
      if (zwischen) onZwischen?.(zwischen);
    };
    this.erkennung.onerror = (e) => onFehler?.(e.error);
    this.erkennung.onend = () => {
      this.laeuft = false;
      if (final.trim()) onFertig?.(final.trim(), alternativen);
      onEnde?.();
    };
    try { this.erkennung.start(); this.laeuft = true; }
    catch { this.laeuft = false; onFehler?.('start-fehlgeschlagen'); }
  }

  stop() { if (this.laeuft) { try { this.erkennung.stop(); } catch {} } }
}
