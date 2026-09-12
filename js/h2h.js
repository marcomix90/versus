/**
 * Direkte Duelle (Head-to-Head).
 *
 * Fuer bekannte Klassiker sind echte, kuratierte Bilanzen hinterlegt.
 * Fuer alle anderen Paarungen erzeugt ein deterministischer Generator eine
 * plausible Bilanz aus den Staerkewerten - diese wird im UI klar als
 * "geschaetzt" markiert (Zeichen ~).
 */

const KEY = (a, b) => [a, b].sort().join('|');

/** siege: Siege des alphabetisch ERSTEN Teams im Key. */
const REAL = {
  // --- Nationalmannschaften ---
  'ger|ned': { siege:16, remis:17, gegen:13, letztes:{ jahr:2024, wettbewerb:'Freundschaftsspiel', tore:[1,2] } },
  'ger|ita': { siege:9,  remis:13, gegen:15, letztes:{ jahr:2022, wettbewerb:'Nations League',     tore:[5,2] } },
  'eng|ger': { siege:12, remis:6,  gegen:15, letztes:{ jahr:2022, wettbewerb:'Nations League',     tore:[3,3] } },
  'arg|ger': { siege:10, remis:6,  gegen:7,  letztes:{ jahr:2019, wettbewerb:'Freundschaftsspiel', tore:[2,2] } },
  'bra|ger': { siege:13, remis:5,  gegen:6,  letztes:{ jahr:2023, wettbewerb:'Freundschaftsspiel', tore:[2,1] } },
  'fra|ger': { siege:15, remis:8,  gegen:10, letztes:{ jahr:2024, wettbewerb:'Freundschaftsspiel', tore:[0,2] } },
  'esp|ger': { siege:9,  remis:8,  gegen:9,  letztes:{ jahr:2024, wettbewerb:'EM-Viertelfinale',   tore:[2,1] } },
  'aut|ger': { siege:9,  remis:6,  gegen:26, letztes:{ jahr:2023, wettbewerb:'Freundschaftsspiel', tore:[2,0] } },
  'arg|bra': { siege:42, remis:26, gegen:43, letztes:{ jahr:2025, wettbewerb:'WM-Qualifikation',   tore:[4,1] } },
  'bra|ita': { siege:10, remis:5,  gegen:10, letztes:{ jahr:2013, wettbewerb:'Confed Cup',         tore:[4,2] } },
  'bra|fra': { siege:5,  remis:5,  gegen:7,  letztes:{ jahr:2013, wettbewerb:'Freundschaftsspiel', tore:[3,0] } },
  'arg|eng': { siege:7,  remis:5,  gegen:6,  letztes:{ jahr:2005, wettbewerb:'Freundschaftsspiel', tore:[2,3] } },
  'eng|sco': { siege:48, remis:25, gegen:41, letztes:{ jahr:2023, wettbewerb:'Freundschaftsspiel', tore:[3,1] } },
  'esp|por': { siege:17, remis:16, gegen:6,  letztes:{ jahr:2024, wettbewerb:'Freundschaftsspiel', tore:[0,2] } },
  'fra|ita': { siege:11, remis:9,  gegen:19, letztes:{ jahr:2024, wettbewerb:'Nations League',     tore:[3,1] } },
  'esp|ita': { siege:12, remis:12, gegen:11, letztes:{ jahr:2023, wettbewerb:'Nations League',     tore:[2,1] } },
  'esp|fra': { siege:16, remis:7,  gegen:13, letztes:{ jahr:2024, wettbewerb:'EM-Halbfinale',      tore:[2,1] } },
  'eng|fra': { siege:17, remis:5,  gegen:9,  letztes:{ jahr:2022, wettbewerb:'WM-Viertelfinale',   tore:[1,2] } },
  'bel|ned': { siege:44, remis:31, gegen:56, letztes:{ jahr:2024, wettbewerb:'Nations League',     tore:[0,1] } },
  'cro|ger': { siege:3,  remis:2,  gegen:5,  letztes:{ jahr:2024, wettbewerb:'Nations League',     tore:[1,2] } },
  'fra|sen': { siege:0,  remis:0,  gegen:1,  letztes:{ jahr:2002, wettbewerb:'WM-Vorrunde',        tore:[0,1] } },
  'mar|sen': { siege:2,  remis:6,  gegen:5,  letztes:{ jahr:2023, wettbewerb:'Freundschaftsspiel', tore:[0,0] } },
  'egy|mar': { siege:4,  remis:5,  gegen:6,  letztes:{ jahr:2022, wettbewerb:'Afrika-Cup',         tore:[1,2] } },
  'jpn|kor': { siege:17, remis:23, gegen:42, letztes:{ jahr:2025, wettbewerb:'Ostasienmeisterschaft', tore:[1,0] } },
  'mex|usa': { siege:37, remis:19, gegen:24, letztes:{ jahr:2025, wettbewerb:'Gold Cup',           tore:[1,2] } },
  'chi|uru': { siege:19, remis:20, gegen:41, letztes:{ jahr:2024, wettbewerb:'Copa América',       tore:[0,1] } },
  // --- Vereine (Eintraege zu Clubs ausserhalb des aktuellen Teilnehmerfelds
  //     bleiben stehen und greifen wieder, sobald der Verein zurueckkehrt) ---
  'fcb|rma': { siege:103,remis:52, gegen:105,letztes:{ jahr:2025, wettbewerb:'La Liga',            tore:[4,3] } },
  'bay|bvb': { siege:70, remis:26, gegen:41, letztes:{ jahr:2025, wettbewerb:'Bundesliga',         tore:[2,1] } },
  'atm|rma': { siege:41, remis:57, gegen:120,letztes:{ jahr:2025, wettbewerb:'Champions League',   tore:[1,0] } },
  'int|mil': { siege:87, remis:74, gegen:81, letztes:{ jahr:2025, wettbewerb:'Serie A',            tore:[1,1] } },
  'int|juv': { siege:60, remis:57, gegen:96, letztes:{ jahr:2025, wettbewerb:'Serie A',            tore:[4,4] } },
  'juv|mil': { siege:87, remis:70, gegen:63, letztes:{ jahr:2025, wettbewerb:'Serie A',            tore:[0,0] } },
  'liv|mci': { siege:96, remis:53, gegen:56, letztes:{ jahr:2025, wettbewerb:'Premier League',     tore:[2,0] } },
  'ars|tot': { siege:87, remis:53, gegen:63, letztes:{ jahr:2025, wettbewerb:'Premier League',     tore:[1,0] } },
  'che|liv': { siege:69, remis:59, gegen:73, letztes:{ jahr:2025, wettbewerb:'Premier League',     tore:[1,3] } },
  'ars|che': { siege:82, remis:60, gegen:67, letztes:{ jahr:2025, wettbewerb:'Premier League',     tore:[1,1] } },
  'bay|rma': { siege:12, remis:3,  gegen:12, letztes:{ jahr:2024, wettbewerb:'Champions League',   tore:[2,2] } },
  'bay|fcb': { siege:8,  remis:2,  gegen:4,  letztes:{ jahr:2025, wettbewerb:'Champions League',   tore:[1,2] } },
  'liv|rma': { siege:4,  remis:0,  gegen:6,  letztes:{ jahr:2024, wettbewerb:'Champions League',   tore:[2,0] } },
  'aja|bay': { siege:5,  remis:5,  gegen:7,  letztes:{ jahr:2021, wettbewerb:'Champions League',   tore:[0,2] } },
  'ben|por': { siege:96, remis:65, gegen:92, letztes:{ jahr:2025, wettbewerb:'Primeira Liga',      tore:[1,1] } },
  'bru|psg': { siege:1,  remis:2,  gegen:4,  letztes:{ jahr:2025, wettbewerb:'Champions League',   tore:[1,3] } },
};

/** kleiner deterministischer PRNG (mulberry32) mit String-Seed */
function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Poisson-Ziehung mit vorgegebenem Zufallsgenerator (deterministisch). */
function poissonDet(lambda, r) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= r(); } while (p > L);
  return k - 1;
}

/** Bilanz aus Sicht von A gegen B. */
export function getH2H(a, b) {
  const key = KEY(a.id, b.id);
  const real = REAL[key];
  if (real) {
    const aIsFirst = [a.id, b.id].sort()[0] === a.id;
    const tore = real.letztes.tore;
    return {
      geschaetzt: false,
      siegeA: aIsFirst ? real.siege : real.gegen,
      remis: real.remis,
      siegeB: aIsFirst ? real.gegen : real.siege,
      letztes: {
        jahr: real.letztes.jahr,
        wettbewerb: real.letztes.wettbewerb,
        toreA: aIsFirst ? tore[0] : tore[1],
        toreB: aIsFirst ? tore[1] : tore[0],
      },
    };
  }
  // --- Fallback: deterministisch geschaetzte Bilanz ---
  const r = rng(hashSeed(key));
  const spiele = 3 + Math.floor(r() * 16);
  const diff = (a.staerke ?? 70) - (b.staerke ?? 70);
  const pA = 1 / (1 + Math.exp(-diff / 12));
  let siegeA = 0, remis = 0, siegeB = 0;
  for (let i = 0; i < spiele; i++) {
    const x = r();
    if (x < pA * 0.72) siegeA++;
    else if (x < pA * 0.72 + 0.26) remis++;
    else siegeB++;
  }
  const jahr = 2011 + Math.floor(r() * 15);
  const toreA = Math.min(5, poissonDet(0.75 + pA * 1.9, r));
  const toreB = Math.min(5, poissonDet(0.75 + (1 - pA) * 1.9, r));
  return {
    geschaetzt: true,
    siegeA, remis, siegeB,
    letztes: { jahr, wettbewerb: 'geschätztes Ergebnis', toreA, toreB },
  };
}
