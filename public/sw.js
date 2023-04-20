const cacheName = 'PICKPIN_CACHE';
const urls = [];
const jsRegex = /.js$/;
const cssRegex = /.css$/;
const apiRegex = /^(.*)\/api\/(.*)/;
const imgRegex = /^(.*)\/img\/(.*)$/;
const fontsRegex = /(.ttf|.woff2)$/;

//const regexes = [jsRegex, cssRegex];

this.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(cachedUrl)));
});

this.addEventListener('activate', (event) => {
    const cacheKeeplist = [cacheName];

    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }),
            );
        }),
    );
});

this.addEventListener('fetch', (event) => {
    // Кешируем только GET запросы, удовлетворяющие условию
    // иначе выполняем исходный запрос
    if (event.request.method !== 'GET' || !needCache(event.request.url)) {
        return;
    }
    event.respondWith(
        (async () => {
            const cache = await caches.open(cacheName);
            const cached = await cache.match(event.request);

            // const isAPIRequest = apiRegex.test(event.request.url);
            if (!navigator.onLine && cached) {
                // обновляем кэш в фоне

                console.log(1234);
                return cached;
            }

            // Ничего не закэшировалось - делаем исходный запрос
            const response = await fetch(event.request);

            // Если запрос успешно прошел и он same origin - кэшируем его
            if (response?.ok && response?.status !== 206) {
                await cache.put(event.request, response.clone());
            }

            return response;
        })(),
    );
});
