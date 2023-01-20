
// name for to save cache storage
var CACHE_NAME = 'pwa-offline-v1';
// web resource for cachinig
var filesToCache = [
    '/',   //index.html
    '/style.css',
    'offline.html'
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

// self.addEventListener('fetch', function(event){
//     console.log('[Service Worker] Fetch');
//     event.respondWith(
//       caches.match(event.request) //return cache that match network request
//         .then(function(response){
//           return response || fetch(event.request);
//         })
//         .catch(function(error){
//           return console.log(error);
//         })
//     );
//   });

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request)
          .then(() => {
              return fetch(event.request) 
                  .catch(() => caches.match('offline.html'))
          })
  )
});

  //when caches changed (need to update caches)
  self.addEventListener('activate', function(event) {
    var newCacheList = [];
    newCacheList.push(CACHE_NAME);
  //delete previous caches and push new cache
    event.waitUntil(
      caches.keys().then(function(cacheList) {  //caches.keys() : return all cache list from cache storage
        return Promise.all(
          cacheList.map(function(cacheName) {
            if (newCacheList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        )
      }).catch(function(error) {
        return console.log(error);
      })
    );
  });