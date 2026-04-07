const CACHE_NAME = 'fisiohub-cache-v2'; // Updated version
const urlsToCache = [
  '/'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Purge old caches
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests or page navigations. Let POST (like Server Actions) bypass entirely.
  if (event.request.method !== 'GET') return;

  event.respondWith(
    // Network First strategy
    fetch(event.request)
      .then(response => {
         // Optionally cache the new response if it's successful
         const resClone = response.clone();
         caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
         return response;
      })
      .catch(() => {
         // If network fails, fallback to cache
         return caches.match(event.request);
      })
  );
});
