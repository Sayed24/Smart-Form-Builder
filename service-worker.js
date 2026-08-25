const CACHE="smartform-v5";
const ASSETS=["./","./login.html","./index.html","./builder.html","./form.html","./analytics.html","./css/style.css","./js/core.js","./js/auth.js","./js/app.js","./js/builder.js","./js/form.js","./js/analytics.js","./manifest.json","./assets/icons/icon-192.png","./assets/icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>cached)))})
