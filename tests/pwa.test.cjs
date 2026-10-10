const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function worker(fetcher = async () => new Response('online', {headers: {'content-type': 'text/html'}})) {
  const handlers = {};
  const stores = new Map();
  const key = request => typeof request === 'string' ? request : request.url;
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async addAll(urls) { for (const url of urls) store.set(url, new Response('offline')); },
        async put(request, response) { store.set(key(request), response); },
        async match(request) { return store.get(key(request))?.clone(); },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); },
    async match(request) { for (const store of stores.values()) if (store.has(key(request))) return store.get(key(request)).clone(); },
  };
  let skipped = false;
  vm.runInNewContext(fs.readFileSync('public/sw.js', 'utf8'), { URL, caches, fetch: fetcher, self: {
    location: {origin: 'https://app.test'}, clients: {claim: async () => {}},
    skipWaiting() { skipped = true; }, addEventListener(type, handler) { handlers[type] = handler; },
  }});
  return { handlers, stores, caches, skipped: () => skipped };
}

function request(url, mode = 'navigate', headers = {}) {
  return { url, mode, method: 'GET', headers: new Headers(headers) };
}
async function fetchEvent(w, req) {
  let response;
  w.handlers.fetch({ request: req, respondWith(result) { response = result; } });
  return response;
}

test('offline navigation returns cached document or offline fallback', async () => {
  let online = true;
  const w = worker(async () => { if (!online) throw Error('offline'); return new Response('lesson', {headers: {'content-type': 'text/html'}}); });
  let install;
  w.handlers.install({waitUntil(p) { install = p; }});
  await install;
  assert.equal(await (await fetchEvent(w, request('https://app.test/bai-hoc/chao-hoi'))).text(), 'lesson');
  online = false;
  assert.equal(await (await fetchEvent(w, request('https://app.test/bai-hoc/chao-hoi'))).text(), 'lesson');
  assert.equal(await (await fetchEvent(w, request('https://app.test/new'))).text(), 'offline');
});
test('RSC, API, POST and external requests bypass document cache', async () => {
  const w = worker();
  for (const req of [request('https://app.test/?_rsc=1'), request('https://app.test/', 'cors', {rsc:'1'}), request('https://app.test/api/data'), request('https://other.test/'), {...request('https://app.test/'), method:'POST'}]) assert.equal(await fetchEvent(w, req), undefined);
});
test('static assets are reused and activation preserves unrelated caches', async () => {
  let fetches = 0;
  const w = worker(async () => { fetches++; return new Response('asset'); });
  const req = request('https://app.test/_next/static/file.js', 'cors');
  await fetchEvent(w, req); await fetchEvent(w, req);
  assert.equal(fetches, 1);
  await w.caches.open('tam-pwa-old-static'); await w.caches.open('another-app');
  let activation;
  w.handlers.activate({waitUntil(p) { activation=p; }}); await activation;
  assert.ok(w.stores.has('another-app'));
  assert.equal(w.stores.has('tam-pwa-old-static'), false);
  assert.equal(w.skipped(), false);
  w.handlers.message({data:{type:'SKIP_WAITING'}});
  assert.equal(w.skipped(), true);
});
test('theme bootstrap respects saved choice, system setting and blocked storage', () => {
  const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
  const script = layout.match(/const themeScript = `([\s\S]*?)`;/)[1];
  for (const [stored, systemDark, blocked, expected] of [['light',true,false,'light'], ['dark',false,false,'dark'], [null,true,false,'dark'], ['invalid',false,false,'light'], [null,true,true,'dark']]) {
    const root = {dataset:{}};
    vm.runInNewContext(script, {document:{documentElement:root,querySelector:()=>null}, localStorage:{getItem(){if(blocked) throw Error(); return stored;}}, matchMedia:()=>({matches:systemDark,addEventListener(){}}),window:{dispatchEvent(){}},Event});
    assert.equal(root.dataset.theme, expected);
  }
});
