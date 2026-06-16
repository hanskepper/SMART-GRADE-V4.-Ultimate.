// ============================================
// SMART GRADE v4.0 - SERVICE WORKER
// 100% OFFLINE - VERSION GARANTIE
// ============================================

const CACHE_NAME = 'smartgrade-v4-v6';
const OFFLINE_URL = './offline.html';

// ⭐ TOUTES LES PAGES ESSENTIELLES ⭐
const ESSENTIAL_FILES = [
  './',
  './index.html',
  './splash.html',
  './offline.html',
  './welcome.html',
  './login.html',
  './register.html',
  './dashboard.html',
  './manifest.json',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/themes.css',
  './css/night-mode.css',
  './js/utils.js',
  './js/database.js',
  './js/auth.js',
  './js/app.js',
  './js/confirm-dialog.js',
  './icons/icon-512.png'
];

console.log('[SW] Initializing...');

// ============================================
// INSTALLATION
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching', ESSENTIAL_FILES.length, 'files...');
        return cache.addAll(ESSENTIAL_FILES);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// ============================================
// ACTIVATION
// ============================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// ============================================
// FETCH - INTERCEPTE TOUTES LES REQUÊTES
// ============================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignorer les requêtes externes
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('lottie.host') ||
      url.hostname.includes('analytics')) {
    return;
  }
  
  // ⭐ POUR TOUTES LES PAGES HTML ⭐
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          console.log('[SW] Offline - returning offline.html');
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // ⭐ POUR LES ASSETS (CSS, JS, IMAGES) ⭐
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request)
          .then((networkResponse) => {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            return networkResponse;
          })
          .catch(() => {
            if (request.url.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
              return caches.match('./icons/icon-512.png');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

// ============================================
// MESSAGE - POUR LES MISES À JOUR
// ============================================
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker ready');