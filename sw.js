const CACHE_NAME = "hostelhub-cache-v1";

const APP_FILES = [
  "/hostelhub-app/",
  "/hostelhub-app/index.html",
  "/hostelhub-app/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response =>
        response ||
        (event.request.mode === "navigate"
          ? caches.match("/hostelhub-app/index.html")
          : undefined)
      )
    )
  );
});
