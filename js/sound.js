/** Kleine Sounds ueber die WebAudio-API - keine Audiodateien noetig. */
let ctx = null;
let an = true;

const ctxHolen = () => (ctx ??= new (window.AudioContext || window.webkitAudioContext)());

export function tonAn(wert) { an = wert; }
export function istAn() { return an; }

function ton(freq, dauer = 0.12, typ = 'sine', vol = 0.16, verzug = 0) {
  if (!an) return;
  try {
    const c = ctxHolen();
    if (c.state === 'suspended') c.resume();
    const o = c.createOscillator(), g = c.createGain();
    o.type = typ; o.frequency.value = freq;
    const t = c.currentTime + verzug;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dauer + 0.02);
  } catch {}
}

export const sounds = {
  tipp:    () => ton(520, 0.07, 'triangle', 0.12),
  wahl:    () => { ton(660, 0.08, 'triangle'); ton(880, 0.1, 'triangle', 0.14, 0.07); },
  punktA:  () => { ton(523, 0.1, 'square', 0.1); ton(784, 0.12, 'square', 0.1, 0.08); },
  punktB:  () => { ton(440, 0.1, 'square', 0.1); ton(659, 0.12, 'square', 0.1, 0.08); },
  gleich:  () => ton(330, 0.16, 'sine', 0.1),
  sieg:    () => [523, 659, 784, 1047].forEach((f, i) => ton(f, 0.18, 'triangle', 0.16, i * 0.1)),
  unentschieden: () => [494, 494].forEach((f, i) => ton(f, 0.2, 'sine', 0.13, i * 0.22)),
  mikroAn: () => { ton(880, 0.09, 'sine', 0.13); ton(1175, 0.09, 'sine', 0.13, 0.08); },
  mikroAus:() => ton(587, 0.12, 'sine', 0.1),
  fehler:  () => { ton(200, 0.18, 'sawtooth', 0.09); },
  pfiff:   () => { ton(1900, 0.09, 'square', 0.07); ton(2100, 0.12, 'square', 0.07, 0.1); },
};
