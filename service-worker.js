const CACHE_KEY = 'v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_KEY).then(cache => {
      return cache.addAll([
        'index.html',
        'bundle.js'
      ]);
    }).catch(error => console.log(error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_KEY)
          .map(cacheName => caches.delete(cacheName))
      );
    }).catch(error => console.error(error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_KEY).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request.clone()).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
