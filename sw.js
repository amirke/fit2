const PREFIX='gym-app-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+'c5cfe1d773c4';
const FILES=['./upper-body-plan-grouped.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES);await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),base=new URL(self.registration.scope);
 if(event.request.method!=='GET'||url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
 const relative=url.pathname.slice(base.pathname.length);
 if(event.request.mode==='navigate'&&['','index.html','upper-body-plan-grouped.html'].includes(relative)){
  event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok)return response;}catch{}return (await caches.open(CACHE)).match('./upper-body-plan-grouped.html');})());
 }else if(FILES.some(f=>new URL(f,base).pathname===url.pathname))event.respondWith((async()=>{const cached=await (await caches.open(CACHE)).match(event.request,{ignoreSearch:true});return cached||fetch(event.request);})());
});
