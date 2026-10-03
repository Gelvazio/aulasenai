// Página inicial de uma matéria (index.html da pasta da matéria): mostra o plano de aulas na tela e
// a ementa num modal, lendo os arquivos Markdown indicados no <body> por data-plano e data-ementa
// (caminhos relativos à página). Markdown → HTML com marked + DOMPurify (carregados no <head>).
// Sem nomes de matéria no código: tudo vem dos dados da página. CSS: assets/css/pagina-materia.css.

const CLASSE_MODAL_ABERTO = 'modal--aberto';
const HTML_CARREGANDO_MATERIA = '<div class="loading">Carregando...</div>';
const MSG_PLANO_AUSENTE = 'O plano de aulas desta matéria ainda está em preparação.';
const MSG_ERRO_ARQUIVO_MATERIA = 'Não foi possível carregar o arquivo: ';

/**
 * Busca um arquivo Markdown sem cache e devolve o HTML seguro.
 * @param {string} caminho - Caminho do arquivo, relativo à página.
 * @returns {Promise<string>} HTML sanitizado.
 * @throws {Error} Se o arquivo não existir ou as bibliotecas não carregarem.
 */
async function carregarMarkdownMateria(caminho) {
    const resposta = await fetch(caminho, { cache: 'no-store' });
    if (!resposta.ok) throw new Error(caminho + ' (' + resposta.status + ')');

    const temBibliotecas = Boolean(window.marked && window.DOMPurify);
    if (!temBibliotecas) throw new Error('bibliotecas de Markdown indisponíveis');
    return window.DOMPurify.sanitize(window.marked.parse(await resposta.text()));
}

/**
 * Cria a caixa de aviso (plano ausente ou erro) sem usar HTML vindo de fora.
 * @param {string} texto - Mensagem.
 * @returns {HTMLDivElement} Caixa pronta.
 */
function criarAvisoMateria(texto) {
    const caixa = document.createElement('div');
    caixa.className = 'error-message';
    caixa.textContent = texto;
    return caixa;
}

/**
 * Mostra o plano de aulas na área principal da página.
 * @param {{conteudo: HTMLElement, plano: string}} pagina - Área e caminho do plano.
 */
async function exibirPlanoMateria({ conteudo, plano }) {
    conteudo.innerHTML = HTML_CARREGANDO_MATERIA;
    try {
        conteudo.innerHTML = await carregarMarkdownMateria(plano);
    } catch (erro) {
        conteudo.replaceChildren(criarAvisoMateria(MSG_PLANO_AUSENTE));
    }
}

/**
 * Abre o modal e carrega a ementa.
 * @param {{modal: HTMLElement, corpoModal: HTMLElement, ementa: string}} pagina - Elementos.
 */
async function abrirEmentaMateria({ modal, corpoModal, ementa }) {
    corpoModal.innerHTML = HTML_CARREGANDO_MATERIA;
    modal.classList.add(CLASSE_MODAL_ABERTO);
    try {
        corpoModal.innerHTML = await carregarMarkdownMateria(ementa);
    } catch (erro) {
        corpoModal.replaceChildren(criarAvisoMateria(MSG_ERRO_ARQUIVO_MATERIA + erro.message));
    }
}

/**
 * Liga os botões e o fechamento do modal (botão × ou clique fora da caixa).
 * @param {object} pagina - Elementos e caminhos da página.
 */
function ligarEventosMateria(pagina) {
    const fechar = () => pagina.modal.classList.remove(CLASSE_MODAL_ABERTO);
    const ligar = (id, acao) => document.getElementById(id)?.addEventListener('click', acao);
    ligar('botaoPlano', () => exibirPlanoMateria(pagina));
    ligar('botaoEmenta', () => abrirEmentaMateria(pagina));
    ligar('botaoFecharEmenta', fechar);
    pagina.modal.addEventListener('click', (evento) => {
        if (evento.target === pagina.modal) fechar();
    });
}

/**
 * Inicia a página: lê os caminhos do <body>, liga os eventos e mostra o plano.
 */
function iniciarPaginaMateria() {
    const pagina = {
        conteudo: document.getElementById('content'),
        modal: document.getElementById('ementaModal'),
        corpoModal: document.getElementById('ementaConteudo'),
        plano: document.body.dataset.plano,
        ementa: document.body.dataset.ementa,
    };
    const temElementos = pagina.conteudo && pagina.modal && pagina.corpoModal;
    if (!temElementos || !pagina.plano || !pagina.ementa) return;

    ligarEventosMateria(pagina);
    exibirPlanoMateria(pagina);
}

document.addEventListener('DOMContentLoaded', iniciarPaginaMateria);
