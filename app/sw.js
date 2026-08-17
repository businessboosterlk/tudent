// Batch student app service worker. Network-first for app code so every
// deployment reaches everyone (DECISIONS §12: cache-first ships every future
// deployment to nobody); cache-first only for content-hashed assets. Data
// lives in IndexedDB, which this worker NEVER touches: a service-worker
// upgrade never discards a pending outbox (OFFLINE-BEHAVIOUR.md).
const SHELL_CACHE = 'batch-shell-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(['./', './index.html']))
  );
  self.skipWaiting();
});

// The page that installs this worker loads its assets BEFORE the worker
// controls it, so those requests never pass the fetch handler. Precache
// every asset the current index.html references, or the first offline boot
// gets a shell with no code (found live, 2026-08-13).
async function precacheCurrentAssets() {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const res = await fetch('./index.html');
    const html = await res.text();
    await cache.put('./index.html', new Response(html, { headers: { 'Content-Type': 'text/html' } }));
    const assets = [...html.matchAll(/["'](\.\/)?(assets\/[^"']+)["']/g)].map((m) => `./${m[2]}`);
    await cache.addAll([...new Set(assets)]);
  } catch {
    // Offline activation: keep whatever is already cached.
  }
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL_CACHE).map((k) => caches.delete(k)))
    ).then(() => precacheCurrentAssets()).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // API calls are the app's business

  // Content-hashed assets are immutable: cache-first.
  if (url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(req, { ignoreVary: true }).then(
        (hit) =>
          hit ??
          fetch(req).then((res) => {
            const copy = res.clone();
            void caches.open(SHELL_CACHE).then((c) => c.put(req, copy));
            return res;
          })
      )
    );
    return;
  }

  // Everything else (the shell, index.html): network-first, cache fallback,
  // so the app boots on the bus and still updates the moment there is signal.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        void caches.open(SHELL_CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreVary: true }).then((hit) => hit ?? caches.match('./index.html'))
      )
  );
});
