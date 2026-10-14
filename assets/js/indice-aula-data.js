// Cards de aula do ATIVIDADES/index.html com 100% dos dados da tabela aulas: rótulo
// (aulas.rotulo_card ou "AULA NN"), nome (aulas.nome_card ou aulas.titulo) e "📅 Data da aula"
// (aulas.data_planejada). Regra: cada card ligado a apenas 1 aula. A aula do card vem da
// atividade do link principal; se ela não vier (ex.: atividade bloqueada para o aluno), a aula é
// procurada na mesma matéria pelo rótulo escrito no card. Sem aula no banco, o card fica como
// está no HTML. Aula excluída (aulas.excluido = 1) esconde o card para todos.
// O professor vê "✏️ Editar aula", que abre o modal CRUD (assets/js/indice-aula-modal.js).
// Nas matérias com o bloqueio da aula ligado (assets/js/indice-bloqueio-aula-config.js), o botão
// "Aula liberada / Aula bloqueada" (aulas.ativo) fica antes de "Editar aula" e a aula bloqueada
// bloqueia o card inteiro para os alunos (assets/js/indice-aula-bloqueio.js).
// Depende de: js/supabase.js, assets/js/indice-aula-repositorio.js, assets/js/indice-aula-modal.js,
// assets/js/atividades-crud-repositorio.js e assets/js/atividades-crud-modal.js (obterCaminhoHtml).

const SELETOR_CARD_AULA = 'article.aula';
const SELETOR_LINK_PRINCIPAL_AULA = 'a.btn.principal';
const SELETOR_ROTULO_CARD_AULA = '.num';
const SELETOR_NOME_CARD_AULA = '.topo h2';
const TEXTO_BOTAO_EDITAR_AULA = '✏️ Editar aula';
const TEXTO_SEM_DATA_AULA = '📅 Data da aula: não informada';
const TEXTO_AULA_SEM_CADASTRO = '📅 Aula não cadastrada no banco (use CADASTRAR ATIVIDADES)';
const CLASSE_CARD_AULA_EXCLUIDA = 'aula--excluida';
const AULA_EXCLUIDA = 1;
const DIGITOS_NUMERO_AULA = 2;

const estadoCardsAula = { cards: [], ehProfessor: false, ehAdministrador: false };

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoCardAula(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
}

/**
 * Converte a data do banco (AAAA-MM-DD) para DD/MM/AAAA, sem passar por fuso horário.
 * @param {string|null} dataIso - Data do banco.
 * @returns {string} Data formatada ou texto vazio.
 */
function formatarDataAula(dataIso) {
    if (!dataIso) return '';

    const [ano, mes, dia] = dataIso.split('-');
    return dia + '/' + mes + '/' + ano;
}

/**
 * Rótulo do card pela tabela aulas: rotulo_card ou "AULA NN".
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {string} Rótulo do card.
 */
function obterRotuloDaAula(aula) {
    if (aula.rotulo_card) return aula.rotulo_card;

    return 'AULA ' + String(aula.numero ?? '').padStart(DIGITOS_NUMERO_AULA, '0');
}

/**
 * Nome do card pela tabela aulas: nome_card ou titulo.
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {string} Nome do card.
 */
function obterNomeDaAula(aula) {
    return aula.nome_card || aula.titulo || '';
}

/**
 * Lê um texto escrito no HTML do card.
 * @param {HTMLElement} card - Card do índice.
 * @param {string} seletor - Seletor do elemento.
 * @returns {string} Texto do card.
 */
function lerTextoDoCard(card, seletor) {
    return card.querySelector(seletor)?.textContent.trim() || '';
}

/**
 * Procura, entre as aulas da matéria, a aula de um card pelo rótulo (e, se repetir, pelo nome).
 * @param {{rotuloHtml: string, nomeHtml: string}} item - Card com os textos do HTML.
 * @param {Object[]} aulas - Aulas da matéria.
 * @returns {Object|null} Aula encontrada ou null.
 */
function encontrarAulaPeloRotulo(item, aulas) {
    const mesmoRotulo = aulas.filter((aula) => obterRotuloDaAula(aula) === item.rotuloHtml);
    if (mesmoRotulo.length === 1) return mesmoRotulo[0];

    return mesmoRotulo.find((aula) => obterNomeDaAula(aula) === item.nomeHtml) || null;
}

/**
 * Completa os cards sem aula (atividade não lida) buscando a aula na mesma matéria.
 * @param {Object[]} itens - Cards e aulas.
 */
async function completarAulasPeloRotulo(itens) {
    const faltando = itens.filter((item) => !item.aula);
    const materia = itens.find((item) => item.aula?.materia_id)?.aula.materia_id;
    if (!faltando.length || !materia) return;

    const aulas = await listarAulasDaMateriaCard(materia);
    faltando.forEach((item) => { item.aula = encontrarAulaPeloRotulo(item, aulas); });
}

/**
 * Escreve no card o rótulo e o nome da tabela aulas (sem aula, mantém o HTML).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function renderizarTextosNoCard(item) {
    if (!item.aula) return;

    const rotulo = item.card.querySelector(SELETOR_ROTULO_CARD_AULA);
    const nome = item.card.querySelector(SELETOR_NOME_CARD_AULA);
    if (rotulo) rotulo.textContent = obterRotuloDaAula(item.aula);
    if (nome) nome.textContent = obterNomeDaAula(item.aula);
}

/**
 * Escreve a linha da data no card (cria a linha na primeira vez).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e a aula dele.
 */
function renderizarDataNoCard(item) {
    let linha = item.card.querySelector('.aula-data');
    if (!linha) {
        linha = criarElementoCardAula('p', 'aula-data');
        const referencia = item.card.querySelector('.meta') || item.card.querySelector('.topo');
        referencia?.after(linha);
    }
    const data = formatarDataAula(item.aula?.data_planejada);
    const semData = !data;
    linha.classList.toggle('aula-data--vazia', semData);
    if (data) linha.textContent = '📅 Data da aula: ' + data;
    if (semData && item.aula) linha.textContent = TEXTO_SEM_DATA_AULA;
    if (!item.aula) linha.textContent = TEXTO_AULA_SEM_CADASTRO;

    linha.hidden = semData && !estadoCardsAula.ehProfessor;
}

/**
 * Esconde do índice o card de aula excluída.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function esconderCardExcluido(item) {
    const excluida = item.aula?.excluido === AULA_EXCLUIDA;
    item.card.classList.toggle(CLASSE_CARD_AULA_EXCLUIDA, excluida);
}

/**
 * Redesenha os cards de uma aula depois de editada no modal.
 * @param {Object} aula - Aula com os valores gravados.
 */
function atualizarCardsDaAula(aula) {
    estadoCardsAula.cards.filter((item) => item.aula?.id === aula.id).forEach((item) => {
        Object.assign(item.aula, aula);
        desenharCardAula(item);
    });
}

/**
 * Desenha o card inteiro (textos, data e visibilidade) a partir da aula.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function desenharCardAula(item) {
    esconderCardExcluido(item);
    renderizarTextosNoCard(item);
    renderizarDataNoCard(item);
    if (bloqueioDaAulaNoIndice()) aplicarBloqueioAulaNoCard(item, estadoCardsAula.ehProfessor);
}

/**
 * Diz se o bloqueio da aula vale nesta página e se o módulo dele foi carregado.
 * @returns {boolean} true se ligado.
 */
function bloqueioDaAulaNoIndice() {
    return typeof bloqueioAulaAtivoNaPagina === 'function' && bloqueioAulaAtivoNaPagina();
}

/**
 * Acrescenta o botão "Editar aula" ao card (só professor e aula cadastrada).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e a aula dele.
 */
function adicionarBotaoEditarAula(item) {
    const acoes = item.card.querySelector('.acoes');
    if (!acoes || !item.aula) return;

    const botao = criarElementoCardAula('button', 'btn aula-data-botao', TEXTO_BOTAO_EDITAR_AULA);
    botao.type = 'button';
    botao.addEventListener('click', () => abrirModalAulaCard(item, {
        cards: estadoCardsAula.cards,
        ehAdministrador: estadoCardsAula.ehAdministrador,
        aoGravar: atualizarCardsDaAula,
    }));
    if (bloqueioDaAulaNoIndice()) acoes.append(criarBotaoBloqueioAula(item, atualizarCardsDaAula));
    acoes.append(botao);
}

/**
 * Diz se o usuário logado é professor, sem deixar uma falha esconder os dados dos cards.
 * @returns {Promise<boolean>} true se for professor.
 */
async function verificarProfessorCardAula() {
    try {
        return await usuarioEhProfessorCrud();
    } catch (erro) {
        return false;
    }
}

/**
 * Caminho da página do link principal do card (lerHrefCrud também lê o link guardado do card
 * bloqueado, em data-href-bloqueado).
 * @param {HTMLElement} card - Card do índice.
 * @returns {string|null} Caminho da página ou null.
 */
function lerPaginaPrincipalDoCard(card) {
    const link = card.querySelector(SELETOR_LINK_PRINCIPAL_AULA);
    if (!link) return null;

    return obterCaminhoHtml(lerHrefCrud(link));
}

/**
 * Monta a lista de cards com os textos do HTML (usados só para achar a aula).
 * @returns {Object[]} Itens { card, pagina, rotuloHtml, nomeHtml, aula }.
 */
function lerCardsDoIndice() {
    return [...document.querySelectorAll(SELETOR_CARD_AULA)].map((card) => ({
        card,
        pagina: lerPaginaPrincipalDoCard(card),
        rotuloHtml: lerTextoDoCard(card, SELETOR_ROTULO_CARD_AULA),
        nomeHtml: lerTextoDoCard(card, SELETOR_NOME_CARD_AULA),
        aula: null,
    }));
}

/**
 * Inicia os cards e, no fim (mesmo com erro), destrava os links travados pelo
 * atividades-crud-modal.js enquanto o bloqueio da aula era conferido.
 */
async function iniciarCardsAula() {
    try {
        await desenharCardsDoIndice();
    } finally {
        if (typeof liberarLinksDosCardsIndice === 'function') liberarLinksDosCardsIndice();
    }
}

/**
 * Lê a aula de cada card, desenha os cards e, para o professor, o botão de edição.
 */
async function desenharCardsDoIndice() {
    const itens = lerCardsDoIndice();
    if (!itens.length) return;

    estadoCardsAula.ehProfessor = await verificarProfessorCardAula();
    if (estadoCardsAula.ehProfessor) {
        estadoCardsAula.ehAdministrador = await verificarAdministradorCard().catch(() => false);
    }
    try {
        const paginas = [...new Set(itens.map((item) => item.pagina).filter(Boolean))];
        const aulas = await buscarAulasDasPaginasCard(paginas);
        itens.forEach((item) => { item.aula = aulas.get(item.pagina) || null; });
        await completarAulasPeloRotulo(itens);
    } catch (erro) {
        console.warn('Aulas dos cards indisponíveis:', erro.message);
    }
    estadoCardsAula.cards = itens;
    if (estadoCardsAula.ehProfessor) itens.forEach(adicionarBotaoEditarAula);
    itens.forEach(desenharCardAula);
}

iniciarCardsAula();
