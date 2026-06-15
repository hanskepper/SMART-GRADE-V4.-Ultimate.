// ============================================
// SMART GRADE v4.0 - SERVICE WORKER
// OFFLINE SUPPORT WITH LOTTIE ANIMATION
// ============================================

const CACHE_NAME = 'smartgrade-v4-offline-v2';
const OFFLINE_URL = './offline.html';

// Files to cache for offline access
const STATIC_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './dashboard.html',
  './login.html',
  './register.html',
  './profile.html',
  './settings.html',
  './statistics.html',
  './achievements.html',
  './flashcards.html',
  './goals.html',
  './timetable.html',
  './history.html',
  './notifications.html',
  './transfer.html',
  './backup.html',
  './export.html',
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
  './manifest.json',
  './icons/icon-512.png',
  './icons/avatar-boy.png',
  './icons/avatar-girl.png'
];

// External resources (CDN) to cache
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js'
];

// Combine all assets
const ALL_ASSETS = [...STATIC_ASSETS, ...EXTERNAL_ASSETS];

// ============================================
// INSTALLATION - Cache all assets
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
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
// ACTIVATION - Clean up old caches
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
// FETCH - Network first, fallback to cache
// ============================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip GitHub API and analytics
  if (url.hostname.includes('api.github.com') ||
      url.hostname.includes('analytics') ||
      url.hostname.includes('firebase')) {
    return;
  }
  
  // HTML navigation requests - Special handling for offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fetched page
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If offline, return the offline page
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // For static assets: Cache first, then network
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request)
          .then((networkResponse) => {
            // Cache the fetched resource for future offline use
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            return networkResponse;
          })
          .catch(() => {
            // For images and fonts, return a fallback
            if (request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match('./icons/icon-512.png');
            }
            return new Response('Resource not available offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// ============================================
// BACKGROUND SYNC - For offline grade submissions
// ============================================
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'sync-grades') {
    event.waitUntil(syncGrades());
  }
});

async function syncGrades() {
  console.log('[SW] Syncing pending grades...');
  // This would send pending grades to server when back online
  // Currently placeholder for future implementation
}

// ============================================
// MESSAGE HANDLING - For client communication
// ============================================
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'getVersion') {
    event.ports[0].postMessage({ version: '4.0.3', cache: CACHE_NAME });
  }
});

// ============================================
// PUSH NOTIFICATIONS - For future use
// ============================================
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: './icons/icon-512.png',
    badge: './icons/icon-512.png',
    vibrate: [200, 100, 200],
    data: {
      url: './dashboard.html'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('SMART GRADE', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './dashboard.html')
  );
});

// ============================================
// PERIODIC BACKGROUND SYNC (if supported)
// ============================================
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync:', event.tag);
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  console.log('[SW] Updating cache...');
  const cache = await caches.open(CACHE_NAME);
  const requests = STATIC_ASSETS.map(asset => new Request(asset));
  await cache.addAll(requests);
}

// Log successful registration
console.log('[SW] Service Worker initialized');