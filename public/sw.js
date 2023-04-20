const cacheName = 'PICKPIN_CACHE';
const urls = [];

const cachesRegexes = {
    jsRegex: /.js$/,
    cssRegex: /.css$/,
    apiRegex: /^(.*)\/api\/(.*)/,
    imgRegex: /^(.*)\/img\/(.*)$/,
};

this.addEventListener('install', (event) => {
    console.log('Installing [Service Worker]', event);
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

this.addEventListener('activate', () => {
    return this.clients.claim();
});

this.addEventListener('fetch', (event) => {
    const needChache =
        Object.values(cachesRegexes).filter((regex) => {
            return regex.test(event.request.url);
        }).length > 0;

    if (event.request.method !== 'GET' || !needChache) {
        return;
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(cacheName);
            const cached = await cache.match(event.request);

            if (!navigator.onLine && cached) {
                return cached;
            }

            const response = await fetch(event.request);
            if (response?.ok) {
                await cache.put(event.request, response.clone());
            }

            return response;
        })(),
    );
});
