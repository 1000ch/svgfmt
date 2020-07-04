const CACHE_KEY = 'v1';

self.addEventListener('install', async event => {
  const cache = await caches.open(CACHE_KEY);
  await cache.addAll([
    'index.html',
    'bundle.js'
  ]);

  event.waitUntil(cache);
});

self.addEventListener('activate', event => {
  const cacheNames = caches.keys();
  const promises = cacheNames
    .filter(cacheName => cacheName !== CACHE_KEY)
    .map(cacheName => caches.delete(cacheName));

  event.waitUntil(Promise.all(promises));
});

self.addEventListener('fetch', async event => {
  const cache = await caches.open(CACHE_KEY);
  const cachedResponse = await cache.match(event.request);

  if (cachedResponse) {
    return event.respondWith(cachedResponse);
  }

  const response = await fetch(event.request.clone());
  await cache.put(event.request, response.clone());

  event.respondWith(response);
});
