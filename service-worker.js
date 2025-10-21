self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("spendly-cache").then((cache) => {
      return cache.addAll([
        "./home.html",
        "./home.css",
        "./home.js",
        "./manifest.json",
        "./favicon.ico",
        "./favicon-16x16.png",
        "./favicon-32x32.png",
        "./android-chrome-192x192.png",
        "./android-chrome-512x512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
