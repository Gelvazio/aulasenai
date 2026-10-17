// Cards de aula do ATIVIDADES/index.html com 100% dos dados da tabela aulas: rótulo
// (aulas.rotulo_card ou "AULA NN") e nome (aulas.nome_card ou aulas.titulo). A data da aula não
// aparece no card (pedido de 2026-10-16, #204); ela fica só no modal "Editar aula". Regra: cada card ligado a apenas 1 aula. A aula do card vem da
// atividade do link principal; se ela não vier (ex.: atividade bloqueada para o aluno), a aula é
// procurada na mesma matéria pelo rótulo escrito no card. Sem aula no banco, o card fica como
// está no HTML. Aula excluída (aulas.excluido = 1) esconde o card para todos.
// Aulas que só existem no banco (cadastradas no "📚 Gerenciar Aulas", #250) ganham card na hora,
// pelo indice-gerenciar-aulas-cards.js, e entram no mesmo fluxo; o botão "📕 Slides" do card vem
// de aulas.conteudo.slides.
// Atividades ativas vinculadas à aula no banco (atividade.aula_id) ganham um botão no card da aula
// quando a página delas ainda não tem link no card (indice-aula-atividades-vinculadas.js, #249.1);
// são acrescentadas antes do bloqueio da aula e refeitas quando o vínculo muda.
// O professor vê "✏️ Editar aula", que abre o modal CRUD (assets/js/indice-aula-modal.js).
// Nas matérias com o bloqueio da aula ligado (assets/js/indice-bloqueio-aula-config.js), o botão
// "Aula liberada / Aula bloqueada" fica antes de "Editar aula" e a aula bloqueada bloqueia o card
// inteiro para os alunos (assets/js/indice-aula-bloqueio.js). O bloqueio vale para a turma do
// combo "Turma:" (aula_turma, #206): trocar a turma no combo relê e redesenha os cards.
// Depende de: js/supabase.js, assets/js/indice-aula-repositorio.js, aula-turma-repositorio.js,
// assets/js/indice-aula-atividades-vinculadas.js,
// assets/js/indice-aula-modal.js, assets/js/atividades-crud-repositorio.js e
// assets/js/atividades-crud-modal.js (obterCaminhoHtml).

const SELETOR_CARD_AULA = 'article.aula';
const SELETOR_LINK_PRINCIPAL_AULA = 'a.btn.principal';
const SELETOR_ROTULO_CARD_AULA = '.num';
const SELETOR_NOME_CARD_AULA = '.topo h2';
// Começo do texto do link que não é letra nem número (emoji e "🔒 "): fica antes do nome do banco.
const REGEX_PREFIXO_LINK_ATIVIDADE = /^[^\p{L}\p{N}]*/u;
const TEXTO_BOTAO_EDITAR_AULA = '✏️ Editar aula';
const CLASSE_CARD_AULA_EXCLUIDA = 'aula--excluida';
const AULA_EXCLUIDA = 1;
const DIGITOS_NUMERO_AULA = 2;
const PASTA_ATIVIDADES_AULA = 'ATIVIDADES';
const SELETOR_CURSO_DO_INDICE = '[data-curso-id]';
// Disparado pelo combo "Turma:" da barra do índice (indice-turma-favorita.js).
const EVENTO_TURMA_INDICE_CARDS_AULA = 'turma-indice-alterada';
// Mesmo evento do botão da aula: faz o indice-atividades-bloqueio.js remontar os ON/OFF.
const EVENTO_BLOQUEIO_ALTERADO_CARDS_AULA = 'aula-bloqueio-alterado';

const estadoCardsAula = { cards: [], ehProfessor: false };

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
 * Nome da pasta da matéria pelo endereço (.../<MATERIA>/ATIVIDADES/index.html), com espaços no
 * lugar dos hífens, como na coluna materia.descricao.
 * @returns {string} Nome da matéria ou texto vazio.
 */
function lerNomeMateriaDaPasta() {
    const partes = decodeURIComponent(location.pathname).split('/').filter(Boolean);
    const posicao = partes.map((parte) => parte.toUpperCase()).lastIndexOf(PASTA_ATIVIDADES_AULA);
    if (posicao < 1) return '';

    return partes[posicao - 1].replace(/-/g, ' ');
}

/**
 * Id da matéria do índice: pela aula de um card já encontrada ou, se nenhuma veio (o aluno não
 * lê atividades bloqueadas), pelo nome da pasta e pelo curso da faixa de matérias.
 * @param {Object[]} itens - Cards e aulas.
 * @returns {Promise<number|null>} Id da matéria ou null.
 */
async function descobrirMateriaDoIndice(itens) {
    const materia = itens.find((item) => item.aula?.materia_id)?.aula.materia_id;
    if (materia) return materia;

    const nome = lerNomeMateriaDaPasta();
    if (!nome) return null;

    const curso = document.querySelector(SELETOR_CURSO_DO_INDICE)?.dataset.cursoId || '';
    return buscarMateriaPeloNomeCard(nome, curso);
}

/**
 * Aula do card: a da primeira página do card que o usuário consegue ler no banco (o aluno não
 * lê as atividades bloqueadas, então a primeira página pode não vir).
 * @param {{paginas: string[]}} item - Card com as páginas dos links principais.
 * @param {Map<string, Object>} aulas - Aula de cada página lida.
 * @returns {Object|null} Aula do card ou null.
 */
function encontrarAulaPelasPaginas(item, aulas) {
    const pagina = item.paginas.find((caminho) => aulas.has(caminho));
    return pagina ? aulas.get(pagina) : null;
}

/**
 * Completa os cards sem aula (atividade não lida) buscando a aula na mesma matéria.
 * @param {Object[]} itens - Cards e aulas.
 */
async function completarAulasPeloRotulo(itens) {
    const faltando = itens.filter((item) => !item.aula);
    if (!faltando.length) return;

    const materia = await descobrirMateriaDoIndice(itens);
    if (!materia) return;

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
 * Desenha o card inteiro (textos e visibilidade) a partir da aula.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function desenharCardAula(item) {
    esconderCardExcluido(item);
    renderizarTextosNoCard(item);
    if (typeof desenharBotaoSlidesDoBanco === 'function') desenharBotaoSlidesDoBanco(item);
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
 * Troca o texto do link da atividade pelo nome do banco, mantendo o emoji do começo e os
 * elementos de dentro do link (ex.: etiqueta "ID NN" do professor).
 * @param {HTMLAnchorElement} link - Link principal da atividade.
 * @param {string} nome - atividade.nome_atividade.
 */
function escreverNomeNoLink(link, nome) {
    const textos = [...link.childNodes].filter((no) => no.nodeType === Node.TEXT_NODE);
    if (!textos.length) return;

    const prefixo = textos.map((no) => no.textContent).join('').trimStart()
        .match(REGEX_PREFIXO_LINK_ATIVIDADE)[0];
    textos[0].textContent = ' ' + prefixo + nome;
    textos.slice(1).forEach((no) => no.remove());
}

/**
 * Escreve nos links principais de todos os cards o nome da atividade cadastrado no banco
 * (sem nome no banco, ou atividade que o usuário não lê, o link fica como no HTML).
 * @param {Object[]} itens - Cards do índice.
 */
async function renderizarNomesDasAtividades(itens) {
    try {
        const paginas = [...new Set(itens.flatMap((item) => item.paginas))];
        const nomes = await buscarNomesDasAtividadesCard(paginas);
        document.querySelectorAll(SELETOR_CARD_AULA + ' ' + SELETOR_LINK_PRINCIPAL_AULA)
            .forEach((link) => {
                const nome = nomes.get(obterCaminhoHtml(lerHrefCrud(link)));
                if (nome) escreverNomeNoLink(link, nome);
            });
    } catch (erro) {
        console.warn('Nomes das atividades indisponíveis:', erro.message);
    }
}

/**
 * Reescreve o nome das atividades nos cards já desenhados (chamado depois de salvar no modal).
 */
function atualizarNomesDasAtividadesDoIndice() {
    renderizarNomesDasAtividades(estadoCardsAula.cards);
}

/**
 * Caminhos das páginas dos links principais do card (lerHrefCrud também lê o link guardado do
 * card bloqueado, em data-href-bloqueado).
 * @param {HTMLElement} card - Card do índice.
 * @returns {string[]} Caminhos das páginas, na ordem do card.
 */
function lerPaginasPrincipaisDoCard(card) {
    const links = [...card.querySelectorAll(SELETOR_LINK_PRINCIPAL_AULA)];
    return links.map((link) => obterCaminhoHtml(lerHrefCrud(link))).filter(Boolean);
}

/**
 * Monta a lista de cards com os textos do HTML (usados só para achar a aula).
 * @returns {Object[]} Itens { card, paginas, pagina, rotuloHtml, nomeHtml, aula }.
 */
function lerCardsDoIndice() {
    return [...document.querySelectorAll(SELETOR_CARD_AULA)].map((card) => {
        const paginas = lerPaginasPrincipaisDoCard(card);
        return { card, paginas, pagina: paginas[0] || null,
            rotuloHtml: lerTextoDoCard(card, SELETOR_ROTULO_CARD_AULA),
            nomeHtml: lerTextoDoCard(card, SELETOR_NOME_CARD_AULA), aula: null };
    });
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
    estadoCardsAula.ehProfessor = await verificarProfessorCardAula();
    try {
        const paginas = [...new Set(itens.flatMap((item) => item.paginas))];
        const aulas = paginas.length ? await buscarAulasDasPaginasCard(paginas) : new Map();
        itens.forEach((item) => { item.aula = encontrarAulaPelasPaginas(item, aulas); });
        await completarAulasPeloRotulo(itens);
    } catch (erro) {
        console.warn('Aulas dos cards indisponíveis:', erro.message);
    }
    // Aulas só do banco (#250): o índice sem nenhum card do HTML também as mostra.
    if (typeof acrescentarCardsDasAulasDoBanco === 'function') {
        await acrescentarCardsDasAulasDoBanco(itens, estadoCardsAula.ehProfessor);
    }
    if (!itens.length) return;
    if (bloqueioDaAulaNoIndice()) await prepararBloqueioAulaTurma(estadoCardsAula.ehProfessor);
    estadoCardsAula.cards = itens;
    if (estadoCardsAula.ehProfessor) itens.forEach(adicionarBotaoEditarAula);
    // Antes do desenho: o bloqueio da aula então já alcança os botões vindos do banco.
    const total = await acrescentarAtividadesVinculadasNosCards(itens);
    itens.forEach(desenharCardAula);
    await renderizarNomesDasAtividades(itens);
    if (total) avisarRemontagemDosInterruptores();
}

/**
 * Acrescenta nos cards os botões das atividades vinculadas à aula no banco (falha não quebra
 * o índice).
 * @param {Object[]} itens - Cards do índice.
 * @returns {Promise<number>} Quantidade de botões acrescentados (0 se a consulta falhar).
 */
async function acrescentarAtividadesVinculadasNosCards(itens) {
    try {
        return await renderizarAtividadesVinculadas(itens);
    } catch (erro) {
        console.warn('Atividades vinculadas das aulas indisponíveis:', erro.message);
        return 0;
    }
}

/**
 * Pede ao indice-atividades-bloqueio.js (professor) que remonte os ON/OFF das atividades, para
 * que os botões vindos do banco também ganhem o deles (e os dos botões removidos saiam).
 */
function avisarRemontagemDosInterruptores() {
    document.dispatchEvent(new CustomEvent(EVENTO_BLOQUEIO_ALTERADO_CARDS_AULA));
}

/**
 * Refaz os botões das atividades vinculadas depois que o banco mudou (Gerenciar atividades,
 * Editar aula ou Cadastrar atividades): remove os acrescentados, lê de novo e reaplica o bloqueio
 * da aula. Não faz nada antes do primeiro desenho dos cards. Falha não é propagada.
 * @returns {Promise<void>}
 */
async function atualizarAtividadesVinculadasDoIndice() {
    if (!estadoCardsAula.cards.length) return;

    try {
        await acrescentarAtividadesVinculadasNosCards(estadoCardsAula.cards);
        estadoCardsAula.cards.forEach(desenharCardAula);
        avisarRemontagemDosInterruptores();
    } catch (erro) {
        console.warn('Cards das atividades vinculadas não foram refeitos:', erro.message);
    }
}

/**
 * Troca a turma do índice: relê o bloqueio das aulas nela e redesenha os cards.
 * @param {string} turmaCodigo - Código da turma escolhida no combo.
 */
async function trocarTurmaDosCardsAula(turmaCodigo) {
    if (!bloqueioDaAulaNoIndice()) return;

    await carregarBloqueioAulaTurma({ turma: turmaCodigo || '' });
    estadoCardsAula.cards.forEach(desenharCardAula);
}

document.addEventListener(EVENTO_TURMA_INDICE_CARDS_AULA,
    (evento) => trocarTurmaDosCardsAula(evento.detail));

iniciarCardsAula();
