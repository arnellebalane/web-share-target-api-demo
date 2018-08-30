const cacheName = 'wsta-v1';

addEventListener('install', e => e.waitUntil(onInstall()));
addEventListener('activate', e => e.waitUntil(onActivate()));
addEventListener('fetch', e => e.respondWith(onFetch(e.request)));

async function onInstall() {
    const cache = await caches.open(cacheName);
    await cache.addAll([
        '/',
        '/index.css',
        '/index.js',
        '/manifest.webmanifest',
        '/share.png'
    ]);
    await skipWaiting();
}

async function onActivate() {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(
        cacheKey => cacheKey !== cacheName
            ? caches.delete(cacheKey)
            : undefined
    ));
    await clients.claim();
}

async function onFetch(request) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);
    return response || fetch(request);
}
