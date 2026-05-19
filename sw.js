// ============================================
// SMART GRADE v4.0 - SERVICE WORKER AUTO-UPDATE
// Version gérée automatiquement
// ============================================

// La version est auto-générée à partir de la date
var VERSION_DATE = '20250519'; // Mettez à jour ce nombre à chaque mise à jour (format YYYYMMDD)
var CACHE_NAME = 'smartgrade-v4-' + VERSION_DATE;

// Détecter automatiquement le chemin de base
var BASE_PATH = self.location.pathname.replace(/\/sw\.js$/, '');

var ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/login.html',
  BASE_PATH + '/register.html',
  BASE_PATH + '/dashboard.html',
  BASE_PATH + '/welcome.html',
  BASE_PATH + '/add-grade.html',
  BASE_PATH + '/subjects.html',
  BASE_PATH + '/subject-detail.html',
  BASE_PATH + '/term1.html',
  BASE_PATH + '/term2.html',
  BASE_PATH + '/term3.html',
  BASE_PATH + '/yearly.html',
  BASE_PATH + '/statistics.html',
  BASE_PATH + '/achievements.html',
  BASE_PATH + '/settings.html',
  BASE_PATH + '/profile.html',
  BASE_PATH + '/notifications.html',
  BASE_PATH + '/history.html',
  BASE_PATH + '/export.html',
  BASE_PATH + '/shortcuts.html',
  BASE_PATH + '/flashcards.html',
  BASE_PATH + '/goals.html',
  BASE_PATH + '/timetable.html',
  BASE_PATH + '/guide.html',
  BASE_PATH + '/guide-user.html',
  BASE_PATH + '/about.html',
  BASE_PATH + '/about-user.html',
  BASE_PATH + '/transfer.html',
  BASE_PATH + '/404.html',
  BASE_PATH + '/css/base.css',
  BASE_PATH + '/css/layout.css',
  BASE_PATH + '/css/components.css',
  BASE_PATH + '/css/themes.css',
  BASE_PATH + '/css/night-mode.css',
  BASE_PATH + '/js/utils.js',
  BASE_PATH + '/js/database.js',
  BASE_PATH + '/js/auth.js',
  BASE_PATH + '/js/app.js',
  BASE_PATH + '/js/pwa.js',
  BASE_PATH + '/js/transfer.js',
  BASE_PATH + '/js/transfer-local.js',
  BASE_PATH + '/js/install-handler.js',
  BASE_PATH + '/js/storage.js',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/icon.svg'
];

// INSTALLATION
self.addEventListener('install', function(event) {
  console.log('[SW] Installation:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ACTIVATION - Nettoie l'ancien cache
self.addEventListener('activate', function(event) {
  console.log('[SW] Activation:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('smartgrade')) {
            console.log('[SW] Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// FETCH - Network first
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('analytics')) return;
  if (event.request.url.includes('firebase')) return;
  
  event.respondWith(
    fetch(event.request).then(function(networkResponse) {
      var responseToCache = networkResponse.clone();
      caches.open(CACHE_NAME).then(function(cache) {
        cache.put(event.request, responseToCache);
      });
      return networkResponse;
    }).catch(function() {
      return caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) return cachedResponse;
        if (event.request.mode === 'navigate') {
          return caches.match(BASE_PATH + '/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Vérifier les mises à jour périodiquement
setInterval(function() {
  self.registration.update();
}, 60 * 60 * 1000);