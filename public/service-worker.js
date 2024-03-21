const CACHE_NAME = 'pwa-lightappgen-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/main.js',
    // Fügen Sie andere Ressourcen hinzu, die Sie zwischenspeichern möchten
];

// Installationsereignis
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Geöffneter Cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Anfrageereignis
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                    // Cache gefunden - Antwort zurückgeben
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});