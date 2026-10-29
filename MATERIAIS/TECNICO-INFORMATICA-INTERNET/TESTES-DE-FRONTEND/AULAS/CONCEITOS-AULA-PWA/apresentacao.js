// Modo apresentação da página CONCEITOS-AULA.html: um slide por vez (capa + cada card), com as
// teclas que a caneta de slide envia (PageDown/PageUp, setas, F5, B) e gestos de toque. Também
// registra o service worker (PWA). Não depende de nenhum outro arquivo.

const CLASSE_MODO_APRESENTACAO = 'modo-apresentacao';
const CLASSE_SLIDE_CAPA = 'slide-capa';
const CLASSE_SECAO_ATIVA = 'secao--ativa';
const CLASSE_CARTAO_ATIVO = 'cartao--ativo';
const PARAMETRO_APRESENTAR = 'apresentar';
const PREFIXO_HASH_SLIDE = '#slide-';
const ARQUIVO_SERVICE_WORKER = 'conceitos-aula-sw.js';
const DISTANCIA_MINIMA_DESLIZE = 50;
const FRACAO_BORDA_TOQUE = 0.3;
const SELETOR_ELEMENTO_INTERATIVO = 'button, pre, code';
const TECLAS_AVANCAR = ['PageDown', 'ArrowRight', 'ArrowDown', ' ', 'Enter'];
const TECLAS_VOLTAR = ['PageUp', 'ArrowLeft', 'ArrowUp', 'Backspace'];
const TECLAS_TELA_PRETA = ['b', 'B', '.'];
const TECLAS_TELA_CHEIA = ['f', 'F', 'F5'];

const estado = { slides: [], indice: 0, ativo: false, xInicial: null };

/**
 * Lê um elemento da página pelo id.
 * @param {string} id - Id do elemento.
 * @returns {HTMLElement|null} Elemento ou null.
 */
function obterPorId(id) {
    return document.getElementById(id);
}

/**
 * Monta a lista de slides: a capa e, depois dela, cada card com a sua seção.
 * @returns {{elemento: HTMLElement, secao: HTMLElement|null}[]} Slides na ordem da página.
 */
function montarSlides() {
    const capa = { elemento: document.querySelector('.topo'), secao: null };
    const cartoes = [...document.querySelectorAll('.secao .cartao')]
        .map((cartao) => ({ elemento: cartao, secao: cartao.closest('.secao') }));
    return [capa, ...cartoes];
}

/**
 * Mostra só o slide do índice atual e atualiza contador, barra e endereço.
 */
function mostrarSlideAtual() {
    const slide = estado.slides[estado.indice];
    const ehCapa = !slide.secao;
    document.body.classList.toggle(CLASSE_SLIDE_CAPA, ehCapa);
    document.querySelectorAll('.' + CLASSE_SECAO_ATIVA)
        .forEach((secao) => secao.classList.remove(CLASSE_SECAO_ATIVA));
    document.querySelectorAll('.' + CLASSE_CARTAO_ATIVO)
        .forEach((cartao) => cartao.classList.remove(CLASSE_CARTAO_ATIVO));
    if (!ehCapa) {
        slide.secao.classList.add(CLASSE_SECAO_ATIVA);
        slide.elemento.classList.add(CLASSE_CARTAO_ATIVO);
        slide.elemento.scrollTop = 0;
    }
    atualizarIndicadores();
}

/**
 * Atualiza o contador "N / total", a barra de progresso e o endereço (#slide-N).
 */
function atualizarIndicadores() {
    const total = estado.slides.length;
    const numero = estado.indice + 1;
    obterPorId('contador-slides').textContent = numero + ' / ' + total;
    obterPorId('progresso-slides').style.width = (numero / total) * 100 + '%';
    history.replaceState(null, '', PREFIXO_HASH_SLIDE + numero);
}

/**
 * Vai para o slide pedido, sem passar do começo nem do fim.
 * @param {number} destino - Índice do slide (0 é a capa).
 */
function irParaSlide(destino) {
    const ultimo = estado.slides.length - 1;
    estado.indice = Math.max(0, Math.min(destino, ultimo));
    esconderTelaPreta();
    mostrarSlideAtual();
}

/**
 * Mostra ou esconde a tela preta (botão "tela preta" das canetas de slide).
 */
function alternarTelaPreta() {
    const tela = obterPorId('tela-preta');
    tela.hidden = !tela.hidden;
}

/**
 * Esconde a tela preta, se estiver à mostra.
 */
function esconderTelaPreta() {
    obterPorId('tela-preta').hidden = true;
}

/**
 * Entra ou sai da tela cheia (só funciona a partir de uma tecla ou clique do usuário).
 */
function alternarTelaCheia() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
    }
    document.documentElement.requestFullscreen?.().catch(() => null);
}

/**
 * Liga o modo apresentação, começando pelo slide pedido.
 * @param {number} [inicial] - Índice do slide inicial.
 */
function iniciarApresentacao(inicial = 0) {
    estado.slides = montarSlides();
    estado.ativo = true;
    document.body.classList.add(CLASSE_MODO_APRESENTACAO);
    obterPorId('painel-apresentacao').hidden = false;
    irParaSlide(inicial);
}

/**
 * Desliga o modo apresentação e volta à lista de cards.
 */
function encerrarApresentacao() {
    estado.ativo = false;
    document.body.classList.remove(CLASSE_MODO_APRESENTACAO, CLASSE_SLIDE_CAPA);
    obterPorId('painel-apresentacao').hidden = true;
    esconderTelaPreta();
    if (document.fullscreenElement) document.exitFullscreen();
    history.replaceState(null, '', location.pathname);
}

/**
 * Trata a tecla pressionada quando o modo apresentação está ligado.
 * @param {KeyboardEvent} evento - Evento keydown.
 */
function tratarTeclaNaApresentacao(evento) {
    const acoes = [
        [TECLAS_AVANCAR, () => irParaSlide(estado.indice + 1)],
        [TECLAS_VOLTAR, () => irParaSlide(estado.indice - 1)],
        [['Home'], () => irParaSlide(0)],
        [['End'], () => irParaSlide(estado.slides.length - 1)],
        [TECLAS_TELA_PRETA, alternarTelaPreta],
        [TECLAS_TELA_CHEIA, alternarTelaCheia],
        [['Escape'], encerrarApresentacao],
    ];
    const encontrada = acoes.find(([teclas]) => teclas.includes(evento.key));
    if (!encontrada) return;
    evento.preventDefault();
    encontrada[1]();
}

/**
 * Trata o teclado: com a apresentação ligada navega; fora dela, F5 ou F começam.
 * @param {KeyboardEvent} evento - Evento keydown.
 */
function tratarTeclado(evento) {
    if (evento.ctrlKey || evento.altKey || evento.metaKey) return;
    if (estado.ativo) {
        tratarTeclaNaApresentacao(evento);
        return;
    }
    const querComecar = evento.key === 'F5' || evento.key === 'f' || evento.key === 'F';
    if (!querComecar) return;
    evento.preventDefault();
    iniciarApresentacao(0);
    alternarTelaCheia();
}

/**
 * Toque na tela: bordas avançam e voltam; botões e blocos de código não contam.
 * @param {MouseEvent} evento - Evento click.
 */
function tratarToqueNaTela(evento) {
    if (!estado.ativo || evento.target.closest(SELETOR_ELEMENTO_INTERATIVO)) return;

    const posicao = evento.clientX / window.innerWidth;
    if (posicao >= 1 - FRACAO_BORDA_TOQUE) irParaSlide(estado.indice + 1);
    else if (posicao <= FRACAO_BORDA_TOQUE) irParaSlide(estado.indice - 1);
}

/**
 * Deslizar horizontal no toque: para a esquerda avança, para a direita volta.
 * @param {TouchEvent} evento - Evento touchend.
 */
function tratarDeslize(evento) {
    if (!estado.ativo || estado.xInicial === null) return;

    const diferenca = evento.changedTouches[0].clientX - estado.xInicial;
    estado.xInicial = null;
    if (Math.abs(diferenca) < DISTANCIA_MINIMA_DESLIZE) return;
    irParaSlide(estado.indice + (diferenca < 0 ? 1 : -1));
}

/**
 * Registra o service worker para a página abrir sem internet (só em https ou localhost).
 */
async function registrarServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
        await navigator.serviceWorker.register(ARQUIVO_SERVICE_WORKER);
    } catch (erro) {
        console.warn('Modo offline indisponível:', erro.message);
    }
}

/**
 * Lê o slide inicial do endereço (#slide-N) ou do parâmetro ?apresentar=1.
 * @returns {number|null} Índice do slide inicial, ou null para ficar na lista de cards.
 */
function lerSlideInicial() {
    if (location.hash.startsWith(PREFIXO_HASH_SLIDE)) {
        const numero = Number(location.hash.slice(PREFIXO_HASH_SLIDE.length));
        return Number.isInteger(numero) && numero > 0 ? numero - 1 : 0;
    }
    const pedidoPeloApp = new URLSearchParams(location.search).has(PARAMETRO_APRESENTAR);
    return pedidoPeloApp ? 0 : null;
}

/**
 * Liga os botões, o teclado e o toque, registra o service worker e abre a apresentação se
 * o endereço pedir.
 */
function iniciarPaginaConceitos() {
    obterPorId('botao-apresentar').addEventListener('click', () => {
        iniciarApresentacao(0);
        alternarTelaCheia();
    });
    obterPorId('botao-sair').addEventListener('click', encerrarApresentacao);
    document.addEventListener('keydown', tratarTeclado);
    document.addEventListener('click', tratarToqueNaTela);
    document.addEventListener('touchstart', (evento) => {
        estado.xInicial = evento.touches[0].clientX;
    }, { passive: true });
    document.addEventListener('touchend', tratarDeslize);
    registrarServiceWorker();

    const inicial = lerSlideInicial();
    if (inicial !== null) iniciarApresentacao(inicial);
}

iniciarPaginaConceitos();
