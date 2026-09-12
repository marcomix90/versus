/** Themengebiete, Vergleichskategorien, Punktewertung und Spiel-Simulation. */
import { NATIONALTEAMS } from '../data/nationalteams.js';
import { CLUBS } from '../data/clubs.js';
import { ANIMALS } from '../data/animals.js';
import { getH2H } from './h2h.js';

const num = (n, dec = 0) => n.toLocaleString('de-DE', { maximumFractionDigits: dec });

const laenge = (cm) => cm >= 100 ? `${num(cm / 100, cm % 100 === 0 ? 0 : 2)} m` : `${num(cm, cm < 10 ? 1 : 0)} cm`;
const masse  = (kg) => kg >= 1000 ? `${num(kg / 1000, 1)} t`
                     : kg >= 1    ? `${num(kg, kg < 10 ? 1 : 0)} kg`
                     : kg >= 0.001 ? `${num(kg * 1000, 0)} g`
                                   : `${num(kg * 1000, 2)} g`;
const jahre  = (a) => a === 1 ? '1 Jahr' : a >= 1 ? `${num(a)} Jahre` : `${num(a * 365, 0)} Tage`;
const tempo  = (v) => `${num(v, v < 10 ? 2 : 0)} km/h`;

export const TOPICS = {
  nations: {
    id: 'nations',
    title: 'Fussball-Nationalmannschaften',
    kurz: 'Nationen',
    emoji: '🌍',
    hint: 'Wähle zwei Länder',
    beispiel: 'Frankreich gegen Senegal',
    tile: 'flag',
    duell: true,
    items: NATIONALTEAMS,
    filters: [
      { key:'alle',     label:'Alle' },
      { key:'wm',       label:'🏆 WM-Teams',   match:t=>t.wmTeilnahmen > 0 },
      { key:'UEFA',     label:'Europa',        match:t=>t.konf === 'UEFA' },
      { key:'CONMEBOL', label:'Südamerika',    match:t=>t.konf === 'CONMEBOL' },
      { key:'CONCACAF', label:'Nordamerika',   match:t=>t.konf === 'CONCACAF' },
      { key:'CAF',      label:'Afrika',        match:t=>t.konf === 'CAF' },
      { key:'AFC',      label:'Asien',         match:t=>t.konf === 'AFC' },
      { key:'OFC',      label:'Ozeanien',      match:t=>t.konf === 'OFC' },
    ],
    categories: [
      { key:'wmTeilnahmen', label:'WM-Teilnahmen',      icon:'🏆', better:'higher', value:t=>t.wmTeilnahmen,
        text:t=>t.wmTeilnahmen ? `${num(t.wmTeilnahmen)}×` : 'noch nie' },
      { key:'wmSpiele',     label:'WM-Spiele gesamt',   icon:'⚽', better:'higher', value:t=>t.wmSpiele,
        text:t=>`${num(t.wmSpiele)}` },
      // ohne WM-Teilnahme gibt es keinen Tabellenplatz -> als schlechtester Wert gewertet
      { key:'wmTabelle',    label:'Ewige WM-Tabelle',   icon:'📊', better:'lower',  value:t=>t.wmTabelle ?? 9999,
        text:t=>t.wmTabelle ? `Platz ${num(t.wmTabelle)}` : 'nie dabei' },
      { key:'erstesSpiel',  label:'Erstes Länderspiel', icon:'📜', better:'lower',  value:t=>t.erstesSpiel,
        text:t=>`${t.erstesSpiel}`, ca:t=>!!t.ca?.includes('erstes') },
      { key:'rekord',       label:'Rekordspieler',      icon:'👑', better:'higher', value:t=>t.rekordspieler.spiele,
        text:t=>`${num(t.rekordspieler.spiele)} Spiele`, sub:t=>t.rekordspieler.name ?? 'Name nicht belegt',
        ca:t=>!!t.ca?.includes('rekord') },
    ],
  },
  clubs: {
    id: 'clubs',
    title: 'Champions League 26/27',
    kurz: 'Champions League',
    emoji: '🏟️',
    hint: 'Wähle zwei Vereine',
    beispiel: 'Bayern München gegen Real Madrid',
    tile: 'crest',
    duell: true,
    items: CLUBS,
    filters: [
      { key:'alle', label:'Alle' },
      { key:'t1',   label:'Topf 1', match:c=>c.topf === 1 },
      { key:'t2',   label:'Topf 2', match:c=>c.topf === 2 },
      { key:'t3',   label:'Topf 3', match:c=>c.topf === 3 },
      { key:'t4',   label:'Topf 4', match:c=>c.topf === 4 },
    ],
    categories: [
      { key:'clTeilnahmen', label:'CL-Teilnahmen',    icon:'⭐', better:'higher', value:c=>c.clTeilnahmen, text:c=>`${num(c.clTeilnahmen)}×` },
      { key:'clSpiele',     label:'CL-Spiele gesamt', icon:'⚽', better:'higher', value:c=>c.clSpiele,     text:c=>`${num(c.clSpiele)}` },
      { key:'titel',        label:'Titel gesamt',     icon:'🏆', better:'higher', value:c=>c.titel.liga + c.titel.international,
        text:c=>`${num(c.titel.liga + c.titel.international)}`, sub:c=>`${c.titel.liga} Liga · ${c.titel.international} international` },
      { key:'gruendung',    label:'Gründungsjahr',    icon:'📜', better:'lower',  value:c=>c.gruendung,    text:c=>`${c.gruendung}` },
      { key:'rekord',       label:'Rekordspieler',    icon:'👑', better:'higher', value:c=>c.rekordspieler.spiele,
        text:c=>`${num(c.rekordspieler.spiele)} Spiele`, sub:c=>c.rekordspieler.name,
        ca:c=>!!c.ca?.includes('rekord') },
    ],
  },
  animals: {
    id: 'animals',
    title: 'Tiere',
    kurz: 'Tiere',
    emoji: '🦁',
    hint: 'Wähle zwei Tiere',
    beispiel: 'Löwe gegen Elefant',
    tile: 'emoji',
    duell: false,
    items: ANIMALS,
    filters: [
      { key:'alle',     label:'Alle' },
      { key:'wild',     label:'Wildtiere',  match:a=>a.art === 'wild' },
      { key:'nutztier', label:'Nutztiere',  match:a=>a.art === 'nutztier' },
    ],
    categories: [
      { key:'groesse', label:'Größe',           icon:'📏', better:'higher', value:a=>a.groesse, text:a=>laenge(a.groesse) },
      { key:'gewicht', label:'Gewicht',         icon:'⚖️', better:'higher', value:a=>a.gewicht, text:a=>masse(a.gewicht) },
      { key:'leben',   label:'Lebenserwartung', icon:'🎂', better:'higher', value:a=>a.leben,   text:a=>jahre(a.leben) },
      { key:'tempo',   label:'Höchsttempo',     icon:'💨', better:'higher', value:a=>a.tempo,   text:a=>tempo(a.tempo) },
      { key:'kraft',   label:'Kraft',           icon:'💪', better:'higher', value:a=>a.kraft,   text:a=>`${num(a.kraft)} Punkte` },
    ],
  },
};

export const topicList = () => Object.values(TOPICS);

/** Vergleicht A und B in allen Kategorien des Themas. */
export function compare(topic, a, b) {
  const rows = topic.categories.map(cat => {
    const va = cat.value(a), vb = cat.value(b);
    let winner = 'tie';
    if (va !== vb) winner = (cat.better === 'higher' ? va > vb : va < vb) ? 'a' : 'b';
    return {
      cat, winner,
      a: { value: va, text: cat.text(a), sub: cat.sub?.(a), ca: !!cat.ca?.(a) },
      b: { value: vb, text: cat.text(b), sub: cat.sub?.(b), ca: !!cat.ca?.(b) },
    };
  });
  const punkteA = rows.filter(r => r.winner === 'a').length;
  const punkteB = rows.filter(r => r.winner === 'b').length;
  return {
    rows, punkteA, punkteB,
    sieger: punkteA > punkteB ? 'a' : punkteB > punkteA ? 'b' : 'tie',
  };
}

/* ---------- Simulation ---------- */

function poisson(lambda) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

/**
 * Simuliert ein Spiel A gegen B.
 * Die aktuelle Form wiegt deutlich schwerer (65 %) als die historische
 * Staerke (35 %); A bekommt einen kleinen Heimvorteil.
 */
export function simulate(a, b) {
  const rating = (t) => 0.35 * (t.staerke ?? 70) + 0.65 * (t.form ?? 70);
  const diff = rating(a) - rating(b) + 2.5; // Heimvorteil fuer A
  const lamA = Math.min(4.0, Math.max(0.25, 1.35 * Math.exp(diff / 28)));
  const lamB = Math.min(4.0, Math.max(0.25, 1.35 * Math.exp(-diff / 28)));
  const toreA = Math.min(7, poisson(lamA));
  const toreB = Math.min(7, poisson(lamB));
  return {
    toreA, toreB,
    erwartetA: Math.round(lamA * 100) / 100,
    erwartetB: Math.round(lamB * 100) / 100,
    favorit: lamA - lamB > 0.35 ? 'a' : lamB - lamA > 0.35 ? 'b' : 'tie',
  };
}

export { getH2H };
