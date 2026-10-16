// Cards de aula do ATIVIDADES/index.html com 100% dos dados da tabela aulas: rótulo
// (aulas.rotulo_card ou "AULA NN"), nome (aulas.nome_card ou aulas.titulo) e "📅 Data da aula"
// (aulas.data_planejada). Com turma escolhida no combo (ou a turma do aluno), a data vem de
// aula_turma e recarrega ao trocar a turma (tarefa #188).
// Regra: cada card ligado a apenas 1 aula. A aula do card vem da atividade do link principal;
// se ela não vier (ex.: atividade bloqueada para o aluno), a aula é procurada na mesma matéria
// pelo rótulo escrito no card. Sem aula no banco, o card fica como está no HTML.
// Aula excluída (aulas.excluido = 1) esconde o card para todos.
// O professor vê "✏️ Editar aula", que abre o modal CRUD (assets/js/indice-aula-modal.js).
// Nas matérias com o bloqueio da aula ligado (assets/js/indice-bloqueio-aula-config.js), o botão
// "Aula liberada / Aula bloqueada" (aulas.ativo) fica antes de "Editar aula" e a aula bloqueada
// bloqueia o card inteiro para os alunos (assets/js/indice-aula-bloqueio.js).
// Depende de: js/supabase.js, assets/js/indice-aula-repositorio.js, aula-turma-repositorio.js,
// assets/js/indice-aula-modal.js, assets/js/atividades-crud-repositorio.js e
// assets/js/atividades-crud-modal.js (obterCaminhoHtml).

const SELETOR_CARD_AULA = 'article.aula';
const SELETOR_LINK_PRINCIPAL_AULA = 'a.btn.principal';
const SELETOR_ROTULO_CARD_AULA = '.num';
const SELETOR_NOME_CARD_AULA = '.topo h2';
// Começo do texto do link que não é letra nem número (emoji e "🔒 "): fica antes do nome do banco.
const REGEX_PREFIXO_LINK_ATIVIDADE = /^[^\p{L}\p{N}]*/u;
const TEXTO_BOTAO_EDITAR_AULA = '✏️ Editar aula';
const TEXTO_SEM_DATA_AULA = '📅 Data da aula: não informada';
const TEXTO_AULA_SEM_CADASTRO = '📅 Aula não cadastrada no banco (use CADASTRAR ATIVIDADES)';
const CLASSE_CARD_AULA_EXCLUIDA = 'aula--excluida';
const AULA_EXCLUIDA = 1;
const DIGITOS_NUMERO_AULA = 2;
const PASTA_ATIVIDADES_AULA = 'ATIVIDADES';
const SELETOR_CURSO_DO_INDICE = '[data-curso-id]';

const EVENTO_TURMA_ESCOLHIDA_INDICE = 'turma-indice-alterada';

// turma/linhasTurma: turma escolhida no combo do índice (aluno: a dele) e as linhas dela em
// aula_turma; sem turma, a data vem de aulas.data_planejada.
const estadoCardsAula = { cards: [], ehProfessor: false, ehAdministrador: false,
    turma: null, linhasTurma: null };

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
 * Data da aula do card: a da turma escolhida (aula_turma); sem turma, a data planejada da aula.
 * @param {{aula: Object|null}} item - Card e a aula dele.
 * @returns {string|null|undefined} Data AAAA-MM-DD, ou vazio se a turma não tem data.
 */
function obterDataDoCardAula(item) {
    const { turma, linhasTurma } = estadoCardsAula;
    if (!turma || !linhasTurma) return item.aula?.data_planejada;

    return linhasTurma.get(item.aula?.id)?.data_aula || null;
}

/**
 * Lê as linhas de aula_turma da turma e guarda no estado (uma falha volta à data planejada).
 * @param {string|null} turmaCodigo - Código da turma, ou null para nenhuma.
 */
async function carregarLinhasDaTurmaNoIndice(turmaCodigo) {
    estadoCardsAula.turma = turmaCodigo || null;
    estadoCardsAula.linhasTurma = null;
    if (!turmaCodigo || typeof lerLinhasAulaTurma !== 'function') return;

    try {
        estadoCardsAula.linhasTurma = await lerLinhasAulaTurma(turmaCodigo);
    } catch (erro) {
        console.warn('Datas da turma indisponíveis:', erro.message);
    }
}

/**
 * Troca a turma do índice: recarrega as datas dela e redesenha a data de todos os cards.
 * @param {string} turmaCodigo - Código da turma escolhida no combo.
 */
async function trocarTurmaDoIndice(turmaCodigo) {
    await carregarLinhasDaTurmaNoIndice(turmaCodigo);
    estadoCardsAula.cards.forEach(renderizarDataNoCard);
}

/**
 * Grava a data da aula na turma escolhida (aula_turma), sem mexer no bloqueio.
 * @param {number} aulaId - Id da aula.
 * @param {string|null} dataAula - Data AAAA-MM-DD, ou null para limpar.
 * @throws {Error} Se o banco recusar.
 */
async function gravarDataDaAulaNaTurma(aulaId, dataAula) {
    const { turma, linhasTurma } = estadoCardsAula;
    const existente = linhasTurma.get(aulaId);
    const gravada = await gravarLinhaAulaTurma({ aulaId, turmaCodigo: turma, existente },
        { data_aula: dataAula, bloqueio: existente?.bloqueio === true });
    if (gravada) linhasTurma.set(aulaId, gravada); else linhasTurma.delete(aulaId);
}

/**
 * Dados da turma para o modal "Editar aula" (vazio quando não há turma com datas lidas).
 * @returns {{turma: string, ler: Function, gravar: Function}|null} Turma e funções do modal.
 */
function montarContextoTurmaDoModal() {
    const { turma, linhasTurma } = estadoCardsAula;
    if (!turma || !linhasTurma) return null;

    return { turma, ler: (aulaId) => linhasTurma.get(aulaId)?.data_aula || '',
        gravar: gravarDataDaAulaNaTurma };
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
    const data = formatarDataAula(obterDataDoCardAula(item));
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
        dataDaTurma: montarContextoTurmaDoModal(),
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
 * Define a turma das datas: a do combo (professor, se a barra já existe) ou a do aluno.
 */
async function definirTurmaInicialDoIndice() {
    if (estadoCardsAula.turma) return;

    const combo = document.querySelector('.barra-turma-favorita__lista');
    try {
        const turma = estadoCardsAula.ehProfessor ? combo?.value : await lerTurmaDoAlunoAulaTurma();
        await carregarLinhasDaTurmaNoIndice(turma);
    } catch (erro) {
        console.warn('Turma do índice indisponível:', erro.message);
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
        const paginas = [...new Set(itens.flatMap((item) => item.paginas))];
        const aulas = await buscarAulasDasPaginasCard(paginas);
        itens.forEach((item) => { item.aula = encontrarAulaPelasPaginas(item, aulas); });
        await completarAulasPeloRotulo(itens);
    } catch (erro) {
        console.warn('Aulas dos cards indisponíveis:', erro.message);
    }
    estadoCardsAula.cards = itens;
    await definirTurmaInicialDoIndice();
    if (estadoCardsAula.ehProfessor) itens.forEach(adicionarBotaoEditarAula);
    itens.forEach(desenharCardAula);
    await renderizarNomesDasAtividades(itens);
}

document.addEventListener(EVENTO_TURMA_ESCOLHIDA_INDICE,
    (evento) => trocarTurmaDoIndice(evento.detail));

iniciarCardsAula();
