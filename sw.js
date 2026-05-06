// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force the new version to activate
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // Take control of the page immediately
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.searchParams.has('exploit')) {
        event.respondWith(
            new Promise((resolve) => {
                // Hold the connection open for 10 seconds
                setTimeout(() => {
                    resolve(fetch(event.request));
                }, 10000);
            })
        );
    }
});
