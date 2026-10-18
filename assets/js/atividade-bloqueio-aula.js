// Bloqueio da página de atividade (objetiva e prática) quando a aula ou a atividade está
// bloqueada. Vale só nas matérias com o bloqueio da aula ligado
// (assets/js/indice-bloqueio-aula-config.js, carregado antes deste script).
// Quem decide é o RLS da tabela atividade: o aluno só lê a atividade liberada para ele (a aula
// bloqueada bloqueia todas as atividades dela pelo trigger do banco); o professor lê todas.
// Se a atividade desta página não vier do banco, o conteúdo fica escondido, os links dos slides
// (PDF) somem e aparece o aviso. Enquanto o banco é consultado, o conteúdo também fica escondido
// (sem isso, o aluno abria os slides antes da conferência). Falha na consulta libera a página.
// Depende de: js/supabase.js (sbGet). Carregado pelas páginas geradas por
// assets/gerador-atividades/gerar_atividades.py e
// assets/gerador-avaliacao-discursiva/template_avaliacao_discursiva.html.

const TABELA_ATIVIDADE_PAGINA_BLOQUEIO = 'atividade';
const SELETOR_CONTAINER_PAGINA_BLOQUEIO = '.container';
const SELETOR_LINKS_SLIDES_PAGINA_BLOQUEIO = 'a[href$=".pdf" i]';
const CLASSE_AVISO_PAGINA_BLOQUEIO = 'aula-card';
const TITULO_AVISO_PAGINA_BLOQUEIO = '🔒 Aula Bloqueada!';
const TEXTO_AVISO_PAGINA_BLOQUEIO = 'Esta aula ou atividade está bloqueada pelo professor. ' +
    'Volte ao índice e aguarde a liberação.';
// atividade.pagina é gravada a partir de /MATERIAIS/ e com .html; o endereço aberto pode vir em
// minúsculas, sem .html ou com uma pasta antes (servidor local), e a comparação exata falhava (#285).
const PASTA_RAIZ_PAGINA_BLOQUEIO = '/materiais/';
const EXTENSAO_PAGINA_BLOQUEIO = '.html';

/**
 * Diz se o bloqueio da aula vale nesta página (matéria listada na configuração).
 * @returns {boolean} true se ligado.
 */
function bloqueioAulaLigadoNaPagina() {
    return typeof bloqueioDeAulaLigado === 'function' && bloqueioDeAulaLigado();
}

/**
 * Partes da página que mostram a atividade (tudo no container, menos o cabeçalho).
 * @returns {HTMLElement[]} Elementos do conteúdo.
 */
function listarConteudoDaPagina() {
    const container = document.querySelector(SELETOR_CONTAINER_PAGINA_BLOQUEIO);
    if (!container) return [];

    return [...container.children].filter((elemento) => elemento.tagName !== 'HEADER');
}

/**
 * Esconde ou mostra o conteúdo da atividade.
 * @param {boolean} esconder - true para esconder.
 */
function esconderConteudoDaPagina(esconder) {
    // display em vez de hidden: o CSS da página (display: flex/grid) venceria o atributo hidden.
    const exibicao = esconder ? 'none' : '';
    listarConteudoDaPagina().forEach((elemento) => { elemento.style.display = exibicao; });
}

/**
 * Caminho desta página no formato de atividade.pagina: a partir de /MATERIAIS/ e com .html.
 * @returns {string} Caminho normalizado (maiúsculas e minúsculas ficam para o ilike).
 */
function obterCaminhoDaPaginaBloqueio() {
    const caminho = decodeURIComponent(location.pathname);
    const inicio = caminho.toLowerCase().indexOf(PASTA_RAIZ_PAGINA_BLOQUEIO);
    const relativo = inicio >= 0 ? caminho.slice(inicio) : caminho;
    const temExtensao = relativo.toLowerCase().endsWith(EXTENSAO_PAGINA_BLOQUEIO);
    if (temExtensao) return relativo;

    return relativo + EXTENSAO_PAGINA_BLOQUEIO;
}

/**
 * Diz se o usuário logado consegue ler a atividade desta página (RLS do banco).
 * @returns {Promise<boolean>} true se a atividade veio do banco.
 * @throws {Error} Se a consulta falhar.
 */
async function atividadeDaPaginaLiberada() {
    // ilike sem curinga = igual sem diferenciar maiúsculas; o "_" escapado não vira curinga.
    const pagina = obterCaminhoDaPaginaBloqueio().replace(/_/g, '\\_');
    const filtro = 'pagina=ilike.' + encodeURIComponent(pagina);
    const linhas = await sbGet(TABELA_ATIVIDADE_PAGINA_BLOQUEIO, 'select=id&' + filtro);
    return linhas.length > 0;
}

/**
 * Mostra o aviso de bloqueio no lugar do conteúdo e tira os links dos slides da página.
 */
function mostrarAvisoBloqueioPagina() {
    const linksDosSlides = document.querySelectorAll(SELETOR_LINKS_SLIDES_PAGINA_BLOQUEIO);
    linksDosSlides.forEach((link) => link.remove());
    const container = document.querySelector(SELETOR_CONTAINER_PAGINA_BLOQUEIO);
    if (!container) return;

    const aviso = document.createElement('section');
    aviso.className = CLASSE_AVISO_PAGINA_BLOQUEIO;
    const titulo = document.createElement('h2');
    titulo.textContent = TITULO_AVISO_PAGINA_BLOQUEIO;
    const texto = document.createElement('p');
    texto.textContent = TEXTO_AVISO_PAGINA_BLOQUEIO;
    aviso.append(titulo, texto);
    const cabecalho = container.querySelector('header');
    if (cabecalho) {
        cabecalho.after(aviso);
        return;
    }
    container.prepend(aviso);
}

/**
 * Confere o bloqueio da página: esconde o conteúdo, consulta o banco e libera ou bloqueia.
 */
async function iniciarBloqueioDaPagina() {
    if (!bloqueioAulaLigadoNaPagina()) return;

    esconderConteudoDaPagina(true);
    let liberada = true;
    try {
        liberada = await atividadeDaPaginaLiberada();
    } catch (erro) {
        console.warn('Bloqueio da aula não conferido:', erro.message);
    }
    if (liberada) {
        esconderConteudoDaPagina(false);
        return;
    }
    mostrarAvisoBloqueioPagina();
}

iniciarBloqueioDaPagina();
