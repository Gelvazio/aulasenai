// Loading em tela cheia do card "Notas e média": aparece ao clicar nos interruptores
// (Mostrar, Listar todos, Confirmar Media Aluno e Apenas atividade de média) e some quando a
// ação termina. O CSS (css/card-notas-carregando.css) é carregado sozinho, a partir daqui.

const CLASSE_CARREGANDO_NOTAS = 'card-notas-carregando';
const MSG_CARREGANDO_ACAO_NOTAS = 'Carregando...';
const TEMPO_MINIMO_CARREGANDO_NOTAS_MS = 400;
const RAIZ_CARREGANDO_NOTAS = document.currentScript ? document.currentScript.src : location.href;
const estadoCarregandoNotas = { pendentes: 0, camada: null };

/**
 * Garante que o CSS do loading esteja na página (uma única vez).
 */
function garantirEstiloCarregandoNotas() {
    if (document.querySelector('link[data-card-notas-carregando]')) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../css/card-notas-carregando.css', RAIZ_CARREGANDO_NOTAS).href;
    link.dataset.cardNotasCarregando = 'sim';
    document.head.appendChild(link);
}

/**
 * Cria a camada do loading (fundo escurecido, roda e texto).
 * @returns {HTMLDivElement} Camada pronta para entrar na página.
 */
function criarCamadaCarregandoNotas() {
    const camada = document.createElement('div');
    camada.className = CLASSE_CARREGANDO_NOTAS;
    camada.setAttribute('role', 'status');
    camada.setAttribute('aria-live', 'polite');
    const roda = document.createElement('span');
    roda.className = CLASSE_CARREGANDO_NOTAS + '__roda';
    const texto = document.createElement('span');
    texto.className = CLASSE_CARREGANDO_NOTAS + '__texto';
    texto.textContent = MSG_CARREGANDO_ACAO_NOTAS;
    camada.append(roda, texto);
    return camada;
}

/**
 * Abre o loading; chamadas aninhadas compartilham a mesma camada.
 */
function abrirCarregandoNotas() {
    estadoCarregandoNotas.pendentes += 1;
    if (estadoCarregandoNotas.camada) return;

    garantirEstiloCarregandoNotas();
    estadoCarregandoNotas.camada = criarCamadaCarregandoNotas();
    document.body.appendChild(estadoCarregandoNotas.camada);
}

/**
 * Fecha o loading quando não há mais ação pendente.
 */
function fecharCarregandoNotas() {
    estadoCarregandoNotas.pendentes = Math.max(0, estadoCarregandoNotas.pendentes - 1);
    if (estadoCarregandoNotas.pendentes > 0 || !estadoCarregandoNotas.camada) return;

    estadoCarregandoNotas.camada.remove();
    estadoCarregandoNotas.camada = null;
}

/**
 * Executa uma ação com o loading aberto, por no mínimo um instante, para o clique sempre dar
 * retorno visual mesmo quando a ação é instantânea.
 * @param {() => (Promise<void>|void)} acao - Ação disparada pelo clique.
 * @returns {Promise<void>}
 */
async function executarComCarregandoNotas(acao) {
    abrirCarregandoNotas();
    const espera = new Promise((resolver) =>
        setTimeout(resolver, TEMPO_MINIMO_CARREGANDO_NOTAS_MS));
    try {
        await acao();
    } finally {
        await espera;
        fecharCarregandoNotas();
    }
}
