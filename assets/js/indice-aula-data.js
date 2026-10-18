// Cards de aula do ATIVIDADES/index.html com 100% dos dados da tabela aulas: rótulo e nome
// (aulas.nome_card ou aulas.titulo). O rótulo do card é SEMPRE "AULA NN", de aulas.numero (pedido
// de 2026-10-17, #258).
// A data da aula não aparece no card (pedido de 2026-10-16, #204); ela fica só no modal
// "Editar aula". A lista de cards vem SÓ da tabela aulas (regra 15 do AGENTS.md, #272): um card
// por aula da matéria, na ordem de aulas.numero, montado pelo indice-aula-grade-banco.js; os
// artigos do HTML só dão os links de conteúdo da aula a que se ligam (atividade do link
// principal ou, sem ela, nome/rótulo escrito no artigo, #259) e nunca viram card. Banco com erro:
// mensagem, sem plano B pelos HTMLs. Aula excluída (aulas.excluido = 1) não tem card.
// O botão "📕 Slides" do card vem de aulas.conteudo.slides.
// Atividades ativas vinculadas à aula no banco (atividade.aula_id) ganham um botão no card da aula
// quando a página delas ainda não tem link no card (indice-aula-atividades-vinculadas.js, #249.1);
// são acrescentadas antes do bloqueio da aula e refeitas quando o vínculo muda.
// O professor vê "✏️ Editar aula", que abre o modal CRUD (assets/js/indice-aula-modal.js), e
// "🗑️ Excluir", que só exclui a aula sem atividade vinculada (indice-aula-excluir-card.js, #253).
// Só o Professor Administrador vê a etiqueta "Id Aula: N" (aulas.id) acima de "AULA NN" (#255,
// #257).
// Nas matérias com o bloqueio da aula ligado (assets/js/indice-bloqueio-aula-config.js), o botão
// "Aula liberada / Aula bloqueada" fica antes de "Editar aula"; para o aluno, o card bloqueado é
// ocultado da lista (assets/js/indice-aula-bloqueio.js). O bloqueio vale para a turma do combo
// "Turma:" (aula_turma, #206): trocar a turma no combo relê e redesenha os cards.
// Depende de: js/supabase.js, assets/js/indice-aula-repositorio.js, aula-turma-repositorio.js,
// assets/js/indice-aula-atividades-vinculadas.js, assets/js/indice-aula-grade-banco.js,
// assets/js/indice-aula-modal.js, assets/js/atividades-crud-repositorio.js e
// assets/js/atividades-crud-modal.js (obterCaminhoHtml).

const SELETOR_CARD_AULA = 'article.aula';
const SELETOR_LINK_PRINCIPAL_AULA = 'a.btn.principal';
const SELETOR_ROTULO_CARD_AULA = '.num';
const SELETOR_NOME_CARD_AULA = '.topo h2';
// Começo do texto do link que não é letra nem número (emoji e "🔒 "): fica antes do nome do banco.
const REGEX_PREFIXO_LINK_ATIVIDADE = /^[^\p{L}\p{N}]*/u;
const TEXTO_BOTAO_EDITAR_AULA = '✏️ Editar aula';
const CLASSE_ID_AULA_CARD = 'aula-id-card';
const TEXTO_ID_AULA_CARD = 'Id Aula: ';
const CLASSE_CARD_AULA_EXCLUIDA = 'aula--excluida';
const AULA_EXCLUIDA = 1;
const DIGITOS_NUMERO_AULA = 2;
const PREFIXO_ROTULO_AULA = 'AULA ';
const IDIOMA_NOME_CARD_AULA = 'pt-BR';
const PASTA_ATIVIDADES_AULA = 'ATIVIDADES';
const SELETOR_CURSO_DO_INDICE = '[data-curso-id]';
// Disparado pelo combo "Turma:" da barra do índice (indice-turma-favorita.js).
const EVENTO_TURMA_INDICE_CARDS_AULA = 'turma-indice-alterada';
// Mesmo evento do botão da aula: faz o indice-atividades-bloqueio.js remontar os ON/OFF.
const EVENTO_BLOQUEIO_ALTERADO_CARDS_AULA = 'aula-bloqueio-alterado';
// Disparado quando a grade do banco fica pronta (ou falha): o bloqueio do aluno e o "Fez
// Atividade?" refazem o trabalho nos cards novos.
const EVENTO_CARDS_AULA_MONTADOS = 'cards-aula-montados';

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
 * Rótulo do card sempre pela coluna aulas.numero: "AULA NN" (pedido de 2026-10-17, #258).
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {string} Rótulo "AULA NN".
 */
function obterRotuloDaAula(aula) {
    return PREFIXO_ROTULO_AULA + String(aula.numero ?? '').padStart(DIGITOS_NUMERO_AULA, '0');
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
 * Deixa o nome pronto para comparar: sem espaços nas pontas e em maiúsculas.
 * @param {string} [texto] - Nome da aula ou do card.
 * @returns {string} Nome normalizado.
 */
function normalizarNomeCardAula(texto) {
    return String(texto || '').trim().toLocaleUpperCase(IDIOMA_NOME_CARD_AULA);
}

/**
 * Procura, entre as aulas da matéria, a aula de um card pelo nome escrito no HTML.
 * @param {{nomeHtml: string}} item - Card com o nome do HTML.
 * @param {Object[]} aulas - Aulas da matéria.
 * @returns {Object|null} A aula, se exatamente uma tiver esse nome; senão null.
 */
function encontrarAulaPeloNome(item, aulas) {
    const nomeDoCard = normalizarNomeCardAula(item.nomeHtml);
    const mesmoNome = aulas.filter(
        (aula) => normalizarNomeCardAula(obterNomeDaAula(aula)) === nomeDoCard);
    return mesmoNome.length === 1 ? mesmoNome[0] : null;
}

/**
 * Procura, entre as aulas da matéria, a aula de um card pelo nome; se o nome não achar uma só
 * aula, pelo rótulo "AULA NN" (e, se o rótulo repetir, pelo nome).
 * @param {{rotuloHtml: string, nomeHtml: string}} item - Card com os textos do HTML.
 * @param {Object[]} aulas - Aulas da matéria.
 * @returns {Object|null} Aula encontrada ou null.
 */
function encontrarAulaPeloTextoDoCard(item, aulas) {
    const peloNome = encontrarAulaPeloNome(item, aulas);
    if (peloNome) return peloNome;

    const mesmoRotulo = aulas.filter((aula) => obterRotuloDaAula(aula) === item.rotuloHtml);
    if (mesmoRotulo.length === 1) return mesmoRotulo[0];

    const nomeDoCard = normalizarNomeCardAula(item.nomeHtml);
    return mesmoRotulo.find(
        (aula) => normalizarNomeCardAula(obterNomeDaAula(aula)) === nomeDoCard) || null;
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
 * Matéria que mais aparece nas aulas já encontradas dos artigos (uma atividade ligada a aula de
 * outra matéria não muda a matéria do índice).
 * @param {Object[]} itens - Artigos e aulas.
 * @returns {number|null} Id da matéria ou null se nenhuma aula foi encontrada.
 */
function materiaMaisFrequenteDosItens(itens) {
    const contagem = new Map();
    itens.forEach((item) => {
        const materia = item.aula?.materia_id;
        if (materia) contagem.set(materia, (contagem.get(materia) || 0) + 1);
    });
    const [maisFrequente] = [...contagem.entries()].sort((a, b) => b[1] - a[1]);
    return maisFrequente ? maisFrequente[0] : null;
}

/**
 * Id da matéria do índice: pelas aulas dos artigos já encontradas ou, se nenhuma veio (o aluno
 * não lê atividades bloqueadas), pelo nome da pasta e pelo curso da faixa de matérias.
 * @param {Object[]} itens - Artigos e aulas.
 * @returns {Promise<number|null>} Id da matéria ou null.
 */
async function descobrirMateriaDoIndice(itens) {
    const materia = materiaMaisFrequenteDosItens(itens);
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
 * Escreve no card o rótulo e o nome da tabela aulas.
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
    renderizarIdDaAulaNoCard(item);
    if (typeof desenharBotaoSlidesDoBanco === 'function') desenharBotaoSlidesDoBanco(item);
    if (bloqueioDaAulaNoIndice()) aplicarBloqueioAulaNoCard(item, estadoCardsAula.ehProfessor);
}

/**
 * Mostra, só para o Professor Administrador (#257), a etiqueta "Id Aula: N" (aulas.id)
 * acima do rótulo "AULA NN".
 * Cria a etiqueta uma única vez por card; ao redesenhar, só atualiza o texto.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula.
 */
function renderizarIdDaAulaNoCard(item) {
    if (!item.aula || !estadoCardsAula.ehAdministrador) return;
    const rotulo = item.card.querySelector(SELETOR_ROTULO_CARD_AULA);
    if (!rotulo) return;
    let etiqueta = item.card.querySelector(`.${CLASSE_ID_AULA_CARD}`);
    if (!etiqueta) {
        etiqueta = document.createElement('div');
        etiqueta.className = CLASSE_ID_AULA_CARD;
        rotulo.parentNode.insertBefore(etiqueta, rotulo);
    }
    etiqueta.textContent = `${TEXTO_ID_AULA_CARD}${item.aula.id}`;
}

/**
 * Diz se o bloqueio da aula vale nesta página e se o módulo dele foi carregado.
 * @returns {boolean} true se ligado.
 */
function bloqueioDaAulaNoIndice() {
    return typeof bloqueioAulaAtivoNaPagina === 'function' && bloqueioAulaAtivoNaPagina();
}

/**
 * Acrescenta os botões "Editar aula" e "Excluir" ao card (só professor e aula cadastrada).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e a aula dele.
 */
function adicionarBotaoEditarAula(item) {
    const acoes = item.card.querySelector('.acoes');
    if (!acoes || !item.aula) return;

    const contexto = { cards: estadoCardsAula.cards, aoGravar: atualizarCardsDaAula };
    const botao = criarElementoCardAula('button', 'btn aula-data-botao', TEXTO_BOTAO_EDITAR_AULA);
    botao.type = 'button';
    botao.addEventListener('click', () => abrirModalAulaCard(item, contexto));
    if (bloqueioDaAulaNoIndice()) acoes.append(criarBotaoBloqueioAula(item, atualizarCardsDaAula));
    acoes.append(botao);
    // "🗑️ Excluir" (#253): só exclui a aula sem atividade vinculada (indice-aula-excluir-card.js).
    if (typeof criarBotaoExcluirAulaCard === 'function') {
        acoes.append(criarBotaoExcluirAulaCard(item, contexto));
    }
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
 * Lê os artigos do HTML (só fonte de links; nunca viram card) com os textos usados para achar
 * a aula de cada um.
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
 * atividades-crud-modal.js enquanto o bloqueio da aula era conferido e avisa os outros módulos
 * que a grade do banco está pronta.
 */
async function iniciarCardsAula() {
    try {
        await desenharCardsDoIndice();
    } finally {
        if (typeof liberarLinksDosCardsIndice === 'function') liberarLinksDosCardsIndice();
        document.dispatchEvent(new CustomEvent(EVENTO_CARDS_AULA_MONTADOS));
    }
}

/**
 * Monta a grade só com as aulas do banco, desenha os cards e, para o professor, o botão de
 * edição. Os ON/OFF e os IDs das atividades são sempre remontados, porque os cards são novos.
 */
async function desenharCardsDoIndice() {
    const artigos = lerCardsDoIndice();
    estadoCardsAula.ehProfessor = await verificarProfessorCardAula();
    estadoCardsAula.ehAdministrador = estadoCardsAula.ehProfessor &&
        await verificarAdministradorCard();
    const itens = await montarGradeSoDoBanco(artigos, estadoCardsAula.ehProfessor);
    if (!itens.length) return;
    if (bloqueioDaAulaNoIndice()) await prepararBloqueioAulaTurma(estadoCardsAula.ehProfessor);
    estadoCardsAula.cards = itens;
    if (estadoCardsAula.ehProfessor) itens.forEach(adicionarBotaoEditarAula);
    // Antes do desenho: o bloqueio da aula então já alcança os botões vindos do banco.
    await acrescentarAtividadesVinculadasNosCards(itens);
    itens.forEach(desenharCardAula);
    await renderizarNomesDasAtividades(itens);
    avisarRemontagemDosInterruptores();
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
