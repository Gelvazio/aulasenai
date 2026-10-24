// Mostra o id da atividade (tabela atividade) no título do cabeçalho das páginas de atividade.
// Carregado por js/header-usuario.js (em toda página dentro de /MATERIAIS/ que tem o cabeçalho
// ".container > header h1"), então não precisa de <script> em cada página gerada.
// A atividade é achada por atividade.pagina (mesmo critério de atividade-bloqueio-aula.js); o RLS
// decide o que cada usuário lê. Falha na consulta deixa o título como está.
// Depende de: js/supabase.js (sbGet).

const TABELA_ATIVIDADE_ID_TITULO = 'atividade';
const SELETOR_TITULO_ID_TITULO = '.container > header h1';
const CLASSE_ID_TITULO = 'atividade-id-titulo';
const PASTA_RAIZ_ID_TITULO = '/materiais/';
const EXTENSAO_ID_TITULO = '.html';
const ROTULO_ID_UNICO_TITULO = 'ID ';
const ROTULO_IDS_TITULO = 'IDs ';

/**
 * Caminho desta página no formato de atividade.pagina: a partir de /MATERIAIS/ e com .html.
 * @returns {string} Caminho normalizado.
 */
function obterCaminhoPaginaIdTitulo() {
    const caminho = decodeURIComponent(location.pathname);
    const inicio = caminho.toLowerCase().indexOf(PASTA_RAIZ_ID_TITULO);
    const relativo = inicio >= 0 ? caminho.slice(inicio) : caminho;
    const temExtensao = relativo.toLowerCase().endsWith(EXTENSAO_ID_TITULO);
    return temExtensao ? relativo : relativo + EXTENSAO_ID_TITULO;
}

/**
 * Busca os ids das atividades cadastradas para esta página.
 * @returns {Promise<number[]>} Ids em ordem crescente (vazio se a página não está no banco).
 * @throws {Error} Se a consulta falhar.
 */
async function buscarIdsAtividadeDaPagina() {
    // ilike sem curinga = igual sem diferenciar maiúsculas; o "_" escapado não vira curinga.
    const pagina = obterCaminhoPaginaIdTitulo().replace(/_/g, '\\_');
    const filtro = 'pagina=ilike.' + encodeURIComponent(pagina);
    const linhas = await sbGet(TABELA_ATIVIDADE_ID_TITULO, 'select=id&order=id&' + filtro);
    return linhas.map((linha) => linha.id);
}

/**
 * Acrescenta o selo com o id ao título do cabeçalho (uma única vez).
 * @param {HTMLElement} titulo - Elemento h1 do cabeçalho.
 * @param {number[]} ids - Ids da atividade desta página.
 * @returns {void}
 */
function acrescentarSeloIdAoTitulo(titulo, ids) {
    if (titulo.querySelector('.' + CLASSE_ID_TITULO)) return;

    const rotulo = ids.length === 1 ? ROTULO_ID_UNICO_TITULO : ROTULO_IDS_TITULO;
    const selo = document.createElement('span');
    selo.className = CLASSE_ID_TITULO;
    selo.textContent = rotulo + ids.join(', ');
    selo.dataset.ids = ids.join(',');
    titulo.append(' ', selo);
}

/**
 * Ids da atividade desta página, como o selo do título os mostra (outros módulos reaproveitam).
 * @returns {number[]} Ids (vazio se o selo ainda não foi mostrado).
 */
function obterIdsAtividadeDaPagina() {
    const selo = document.querySelector('.' + CLASSE_ID_TITULO);
    return selo?.dataset.ids ? selo.dataset.ids.split(',').map(Number) : [];
}

window.obterIdsAtividadeDaPagina = obterIdsAtividadeDaPagina;

/**
 * Mostra o id da atividade no título, se esta página tiver atividade no banco.
 * @returns {Promise<void>}
 */
async function mostrarIdDaAtividadeNoTitulo() {
    const titulo = document.querySelector(SELETOR_TITULO_ID_TITULO);
    if (!titulo || typeof sbGet !== 'function') return;

    try {
        const ids = await buscarIdsAtividadeDaPagina();
        if (ids.length) acrescentarSeloIdAoTitulo(titulo, ids);
    } catch (erro) {
        console.warn('Id da atividade não mostrado:', erro.message);
    }
}

mostrarIdDaAtividadeNoTitulo();
