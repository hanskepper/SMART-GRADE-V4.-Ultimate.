// ============================================
// SMART GRADE v4.0 - SERVICE WORKER ULTIME
// 100% OFFLINE - VERSION FINALE
// ============================================

const CACHE_NAME = 'smartgrade-v4-ultime-v1';
const OFFLINE_URL = './offline.html';

// ============================================
// TOUTES LES PAGES HTML
// ============================================
const ALL_PAGES = [
  './',
  './index.html',
  './splash.html',
  './offline.html',
  './maintenance.html',
  './maintenance-config.js',
  './welcome.html',
  './login.html',
  './register.html',
  './dashboard.html',
  './dashboard-stats.html',
  './add-grade.html',
  './subjects.html',
  './subject-detail.html',
  './term1.html',
  './term2.html',
  './term3.html',
  './yearly.html',
  './statistics.html',
  './achievements.html',
  './flashcards.html',
  './goals.html',
  './timetable.html',
  './history.html',
  './notifications.html',
  './profile.html',
  './settings.html',
  './shortcuts.html',
  './transfer.html',
  './backup.html',
  './export.html',
  './homeworks.html',
  './support.html',
  './guide-user.html',
  './about-user.html',
  './terms.html',
  './privacy.html',
  './cookies.html',
  './license.html',
  './eula.html',
  './doc.html',
  './ai-assistant.html',
  './image-to-svg.html',
  './admin-homework.html',
  './guide.html',
  './about.html',
  './premium-shop.html'
];

// ============================================
// TOUS LES FICHIERS CSS
// ============================================
const ALL_CSS = [
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/themes.css',
  './css/night-mode.css'
];

// ============================================
// TOUS LES FICHIERS JS
// ============================================
const ALL_JS = [
  './js/utils.js',
  './js/database.js',
  './js/auth.js',
  './js/app.js',
  './js/confirm-dialog.js',
  './js/transfer.js',
  './js/install-handler.js',
  './js/cloud-sync.js',
  './js/storage.js',
  './js/pwa.js',
  './js/auto-save.js',
  './js/auto-update.js',
  './js/auto-updater.js'
];

// ============================================
// ICÔNES ET ASSETS
// ============================================
const ALL_ICONS = [
  './manifest.json',
  './icon.svg',
  './icons/icon-512.png',
  './icons/avatar-boy.png',
  './icons/avatar-girl.png',
  './icons/avatar-boy.json',
  './icons/avatar-girl.json',
  './icons/android/launchericon-512x512.png',
  './icons/ios/1024.png',
  './icons/pwa/icon-512x512.png'
];

// ============================================
// PAGES D'ERREUR
// ============================================
const ERROR_PAGES = [
  './400.html',
  './401.html',
  './403.html',
  './404.html',
  './500.html',
  './502.html',
  './503.html'
];

// ============================================
// TOUS LES ASSETS COMBINÉS
// ============================================
const ALL_ASSETS = [
  ...ALL_PAGES,
  ...ALL_CSS,
  ...ALL_JS,
  ...ALL_ICONS,
  ...ERROR_PAGES
];

console.log('[SW] Total files to cache:', ALL_ASSETS.length);

// ============================================
// INSTALLATION
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching', ALL_ASSETS.length, 'files...');
        return cache.addAll(ALL_ASSETS);
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
            if (cacheName !== CACHE_NAME && cacheName.startsWith('smartgrade')) {
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
// FETCH - 100% OFFLINE
// ============================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignorer les requêtes externes
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('lottie.host') ||
      url.hostname.includes('analytics') ||
      url.hostname.includes('api.github.com') ||
      url.hostname.includes('firebase')) {
    return;
  }
  
  // POUR TOUTES LES PAGES ET ASSETS : CACHE FIRST
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
            // Si hors ligne ET pas en cache, retourner la page offline
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            // Pour les images, retourner une image par défaut
            if (request.url.match(/\.(jpg|jpeg|png|gif|svg|ico)$/)) {
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

console.log('[SW] Service Worker ready - 100% offline');