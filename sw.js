/* Service Worker: App-Shell offline verfuegbar halten. */
const CACHE = 'versus-v5';
const DATEIEN = [
  './',
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/duel.js',
  'js/h2h.js',
  'js/speech.js',
  'js/sound.js',
  'data/nationalteams.js',
  'data/clubs.js',
  'data/animals.js',
  'data/logos.js',
  'data/tiericons.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(treffer => {
      if (treffer) {
        // im Hintergrund auffrischen
        fetch(e.request).then(r => {
          if (r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
        }).catch(() => {});
        return treffer;
      }
      return fetch(e.request)
        .then(r => {
          if (r.ok && new URL(e.request.url).origin === location.origin) {
            const kopie = r.clone();
            caches.open(CACHE).then(c => c.put(e.request, kopie));
          }
          return r;
        })
        .catch(() => caches.match('index.html'));
    })
  );
});
