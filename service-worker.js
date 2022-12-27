// name for to save cache storage
var CACHE_NAME = 'pwa-offline-v1';
// web resource for cachinig
var filesToCache = [
    '/',   //index.html
    '/style.css'
];

//install service worker (web resource caching)
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME) // pwa 파일
        .then(function(cache){
            // put all resource(files) to cache
            return cache.addAll(filesToCache);
        })
        .catch(function(error) {
            return console.log(error)
        })
    );

});

self.addEventListener('fetch', function(event){
    console.log('[Service Worker] Fetch');
    event.respondWith(
      caches.match(event.request) //return cache that match network request
        .then(function(response){
          return response || fetch(event.request);
        })
        .catch(function(error){
          return console.log(error);
        })
    );
  });