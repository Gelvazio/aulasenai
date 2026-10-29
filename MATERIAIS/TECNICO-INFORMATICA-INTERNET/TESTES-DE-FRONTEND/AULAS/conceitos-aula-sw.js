// Service worker da página CONCEITOS-AULA.html (PWA): guarda a página, o manifest, o ícone e o
// script de apresentação para abrir sem internet. Fica na pasta da página para ter escopo
// sobre ela.

const NOME_CACHE_CONCEITOS = 'conceitos-aula-v1';
const ARQUIVOS_CONCEITOS = [
    './CONCEITOS-AULA.html',
    './CONCEITOS-AULA-PWA/manifest.webmanifest',
    './CONCEITOS-AULA-PWA/icone.svg',
    './CONCEITOS-AULA-PWA/apresentacao.js',
];
const ORIGENS_FONTES_CONCEITOS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

/**
 * Guarda no cache os arquivos da página ao instalar o service worker.
 * @param {ExtendableEvent} evento - Evento install.
 */
function aoInstalarConceitos(evento) {
    evento.waitUntil(
        caches.open(NOME_CACHE_CONCEITOS)
            .then((cache) => cache.addAll(ARQUIVOS_CONCEITOS))
            .then(() => self.skipWaiting()));
}

/**
 * Apaga caches de versões antigas ao ativar o service worker.
 * @param {ExtendableEvent} evento - Evento activate.
 */
function aoAtivarConceitos(evento) {
    const apagarAntigos = caches.keys().then((nomes) => Promise.all(
        nomes.filter((nome) => nome !== NOME_CACHE_CONCEITOS).map((nome) => caches.delete(nome))));
    evento.waitUntil(apagarAntigos.then(() => self.clients.claim()));
}

/**
 * Responde pelo cache e atualiza a cópia em segundo plano (fontes e arquivos da página).
 * @param {Request} pedido - Pedido interceptado.
 * @returns {Promise<Response>} Resposta do cache ou da rede.
 */
async function responderPeloCacheConceitos(pedido) {
    const cache = await caches.open(NOME_CACHE_CONCEITOS);
    const guardada = await cache.match(pedido, { ignoreSearch: true });
    const buscarNaRede = fetch(pedido).then((resposta) => {
        if (resposta.ok || resposta.type === 'opaque') cache.put(pedido, resposta.clone());
        return resposta;
    });
    if (guardada) {
        buscarNaRede.catch(() => null);
        return guardada;
    }
    return buscarNaRede;
}

/**
 * Decide se o pedido é da página ou das fontes e o responde pelo cache.
 * @param {FetchEvent} evento - Evento fetch.
 */
function aoBuscarConceitos(evento) {
    const pedido = evento.request;
    if (pedido.method !== 'GET') return;

    const url = new URL(pedido.url);
    const ehDaPagina = ARQUIVOS_CONCEITOS.some(
        (arquivo) => new URL(arquivo, self.registration.scope).href === url.origin + url.pathname);
    const ehFonte = ORIGENS_FONTES_CONCEITOS.includes(url.hostname);
    if (!ehDaPagina && !ehFonte) return;

    evento.respondWith(responderPeloCacheConceitos(pedido));
}

self.addEventListener('install', aoInstalarConceitos);
self.addEventListener('activate', aoAtivarConceitos);
self.addEventListener('fetch', aoBuscarConceitos);
