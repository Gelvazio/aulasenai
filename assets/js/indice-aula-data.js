// Data da aula em cada card do ATIVIDADES/index.html: mostra "📅 Data da aula" (lida
// de aulas.data_planejada) e, para o professor logado, o botão "✏️ Editar aula", que abre um
// modal para gravar a data. A aula do card vem da atividade cadastrada para o link principal
// do card; se ela não vier (ex.: atividade bloqueada para o aluno), a aula é procurada pelo
// número do card ("AULA 01") na mesma matéria. Alunos e visitantes também veem a data.
// O RLS da tabela aulas só deixa o professor alterar.
// Depende de: js/supabase.js, assets/js/atividades-crud-repositorio.js e
// assets/js/atividades-crud-modal.js (obterCaminhoHtml e estilos do modal).

const SELETOR_CARD_DATA_AULA = 'article.aula';
const SELETOR_LINK_DATA_AULA = 'a.btn.principal';
const TABELA_AULAS_DATA = 'aulas';
const CAMPOS_AULA_DATA = 'id,numero,titulo,data_planejada,materia_id';
const CAMPOS_ATIVIDADE_DATA_AULA = 'pagina,aula_id,aulas(' + CAMPOS_AULA_DATA + ')';
const SELETOR_NUMERO_DATA_AULA = '.num';
const TEXTO_BOTAO_EDITAR_AULA = '✏️ Editar aula';
const TEXTO_SEM_DATA_AULA = '📅 Data da aula: não informada';
const TEXTO_AULA_SEM_CADASTRO = '📅 Aula não cadastrada no banco (use CADASTRAR ATIVIDADES)';
const MSG_DATA_AULA_GRAVADA = '✅ Data da aula gravada.';
const MSG_DATA_AULA_ERRO = '❌ Não foi possível gravar. Confira o login de professor e o banco.';

const estadoDataAula = { cards: [], aulaEmEdicao: null, ehProfessor: false };
let elementosDataAula = null;

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoDataAula(tag, classe, texto) {
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
 * Lê as atividades cadastradas para as páginas dos cards, com a aula de cada uma.
 * @param {string[]} paginas - Caminhos (pathname) das páginas de atividade.
 * @returns {Promise<Map<string, Object>>} Aula de cada página.
 */
async function buscarAulasDasPaginas(paginas) {
    const mapa = new Map();
    if (!paginas.length) return mapa;

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const filtro = 'pagina=in.(' + encodeURIComponent(valores) + ')';
    const linhas = await sbGet('atividade', 'select=' + CAMPOS_ATIVIDADE_DATA_AULA + '&' + filtro);
    linhas.filter((linha) => linha.aulas).forEach((linha) => mapa.set(linha.pagina, linha.aulas));
    return mapa;
}

/**
 * Lê o número da aula escrito no card ("AULA 01" → 1).
 * @param {HTMLElement} card - Card do índice.
 * @returns {number|null} Número da aula ou null.
 */
function lerNumeroAulaDoCard(card) {
    const texto = card.querySelector(SELETOR_NUMERO_DATA_AULA)?.textContent || '';
    const encontrado = texto.match(/\d+/);
    return encontrado ? Number(encontrado[0]) : null;
}

/**
 * Completa os cards sem aula (atividade não lida) buscando a aula pelo número do card,
 * na matéria das aulas já encontradas.
 * @param {{card: HTMLElement, aula: Object|null}[]} itens - Cards e aulas.
 */
async function completarAulasPeloNumero(itens) {
    const faltando = itens.filter((item) => !item.aula && lerNumeroAulaDoCard(item.card));
    const materia = itens.find((item) => item.aula?.materia_id)?.aula.materia_id;
    if (!faltando.length || !materia) return;

    const aulas = await sbGet(TABELA_AULAS_DATA,
        'select=' + CAMPOS_AULA_DATA + '&materia_id=eq.' + encodeURIComponent(materia));
    faltando.forEach((item) => {
        const numero = lerNumeroAulaDoCard(item.card);
        item.aula = aulas.find((aula) => aula.numero === numero) || null;
    });
}

/**
 * Diz se o usuário logado é professor, sem deixar uma falha esconder as datas.
 * @returns {Promise<boolean>} true se for professor.
 */
async function verificarProfessorDataAula() {
    try {
        return await usuarioEhProfessorCrud();
    } catch (erro) {
        return false;
    }
}

/**
 * Grava a data da aula (null apaga a data).
 * @param {number} idAula - Id da aula.
 * @param {string|null} data - Data AAAA-MM-DD ou null.
 * @returns {Promise<boolean>} true se o banco devolveu a linha alterada.
 */
async function gravarDataAula(idAula, data) {
    const linhas = await sbPatch(TABELA_AULAS_DATA, 'id', idAula, { data_planejada: data });
    return Array.isArray(linhas) && linhas.length > 0;
}

/**
 * Escreve a linha da data no card (cria a linha na primeira vez).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e a aula dele.
 */
function renderizarDataNoCard(item) {
    let linha = item.card.querySelector('.aula-data');
    if (!linha) {
        linha = criarElementoDataAula('p', 'aula-data');
        const referencia = item.card.querySelector('.meta') || item.card.querySelector('.topo');
        referencia?.after(linha);
    }
    const data = formatarDataAula(item.aula?.data_planejada);
    const semData = !data;
    linha.classList.toggle('aula-data--vazia', semData);
    if (data) linha.textContent = '📅 Data da aula: ' + data;
    if (semData && item.aula) linha.textContent = TEXTO_SEM_DATA_AULA;
    if (!item.aula) linha.textContent = TEXTO_AULA_SEM_CADASTRO;

    const esconder = semData && !estadoDataAula.ehProfessor;
    linha.hidden = esconder;
}

/**
 * Monta o modal de edição da aula e o anexa à página (estilos do modal de atividades).
 * @returns {{fundo: HTMLElement, titulo: HTMLElement, campoData: HTMLInputElement,
 *   formulario: HTMLFormElement, mensagem: HTMLElement}} Referências dos elementos.
 */
function montarModalDataAula() {
    const fundo = criarElementoDataAula('div', 'crud-fundo aula-data-fundo');
    const caixa = criarElementoDataAula('div', 'crud-caixa aula-data-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const titulo = criarElementoDataAula('h2', '', 'Editar aula');
    const formulario = criarElementoDataAula('form', 'crud-form');
    const campo = criarElementoDataAula('label', 'crud-campo');
    const campoData = criarElementoDataAula('input');
    campoData.type = 'date';
    campoData.name = 'data_planejada';
    campo.append(criarElementoDataAula('span', 'crud-campo__rotulo', 'Data da aula'), campoData);
    const acoes = criarElementoDataAula('div', 'crud-form__acoes');
    acoes.append(criarBotaoDataAula('Salvar', 'crud-btn--principal', 'salvar'),
        criarBotaoDataAula('Limpar data', '', 'limpar'),
        criarBotaoDataAula('✕ Fechar', '', 'fechar'));
    formulario.append(campo, acoes);
    const mensagem = criarElementoDataAula('p', 'crud-mensagem');
    caixa.append(titulo, formulario, mensagem);
    fundo.append(caixa);
    fundo.hidden = true;
    document.body.append(fundo);
    return { fundo, titulo, campoData, formulario, mensagem };
}

/**
 * Cria um botão do modal.
 * @param {string} texto - Texto do botão.
 * @param {string} classe - Classe extra.
 * @param {string} acao - Ação (data-acao).
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoDataAula(texto, classe, acao) {
    const botao = criarElementoDataAula('button', ('crud-btn ' + classe).trim(), texto);
    botao.type = acao === 'salvar' ? 'submit' : 'button';
    botao.dataset.acao = acao;
    return botao;
}

/**
 * Mostra uma mensagem no modal.
 * @param {string} texto - Mensagem (vazia limpa).
 * @param {boolean} [ehErro] - true para estilo de erro.
 */
function mostrarMensagemDataAula(texto, ehErro) {
    elementosDataAula.mensagem.textContent = texto;
    elementosDataAula.mensagem.classList.toggle('crud-mensagem--erro', Boolean(ehErro));
}

/**
 * Abre o modal para editar a aula de um card.
 * @param {Object} aula - Aula (id, numero, titulo, data_planejada).
 */
function abrirModalDataAula(aula) {
    if (!elementosDataAula) {
        elementosDataAula = montarModalDataAula();
        elementosDataAula.formulario.addEventListener('submit', aoSalvarDataAula);
        elementosDataAula.fundo.addEventListener('click', aoClicarModalDataAula);
    }
    estadoDataAula.aulaEmEdicao = aula;
    const numero = String(aula.numero ?? '').padStart(2, '0');
    elementosDataAula.titulo.textContent = 'Editar aula ' + numero + ' — ' + (aula.titulo || '');
    elementosDataAula.campoData.value = aula.data_planejada || '';
    mostrarMensagemDataAula('');
    elementosDataAula.fundo.hidden = false;
    elementosDataAula.campoData.focus();
}

/**
 * Fecha o modal.
 */
function fecharModalDataAula() {
    elementosDataAula.fundo.hidden = true;
    estadoDataAula.aulaEmEdicao = null;
}

/**
 * Trata cliques no modal: fundo e "Fechar" fecham; "Limpar data" esvazia o campo.
 * @param {MouseEvent} evento - Clique.
 */
function aoClicarModalDataAula(evento) {
    const clicouNoFundo = evento.target === elementosDataAula.fundo;
    const acao = evento.target.closest('[data-acao]')?.dataset.acao;
    if (clicouNoFundo || acao === 'fechar') {
        fecharModalDataAula();
        return;
    }
    if (acao === 'limpar') elementosDataAula.campoData.value = '';
}

/**
 * Grava a data e atualiza todos os cards da mesma aula.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function aoSalvarDataAula(evento) {
    evento.preventDefault();
    const aula = estadoDataAula.aulaEmEdicao;
    if (!aula) return;

    const data = elementosDataAula.campoData.value || null;
    try {
        const gravou = await gravarDataAula(aula.id, data);
        if (!gravou) throw new Error('Nenhuma linha alterada');
        estadoDataAula.cards.filter((item) => item.aula?.id === aula.id).forEach((item) => {
            item.aula.data_planejada = data;
            renderizarDataNoCard(item);
        });
        mostrarMensagemDataAula(MSG_DATA_AULA_GRAVADA);
    } catch (erro) {
        mostrarMensagemDataAula(MSG_DATA_AULA_ERRO, true);
    }
}

/**
 * Acrescenta o botão "Editar aula" ao card (só professor e aula cadastrada).
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e a aula dele.
 */
function adicionarBotaoEditarAula(item) {
    const acoes = item.card.querySelector('.acoes');
    if (!acoes || !item.aula) return;

    const botao = criarElementoDataAula('button', 'btn aula-data-botao', TEXTO_BOTAO_EDITAR_AULA);
    botao.type = 'button';
    botao.addEventListener('click', () => abrirModalDataAula(item.aula));
    acoes.append(botao);
}

/**
 * Lê a aula de cada card, mostra a data e, para o professor, o botão de edição.
 */
async function iniciarDataAulas() {
    const cards = [...document.querySelectorAll(SELETOR_CARD_DATA_AULA)];
    if (!cards.length) return;

    const paginas = cards.map((card) =>
        obterCaminhoHtml(card.querySelector(SELETOR_LINK_DATA_AULA)?.getAttribute('href')));
    estadoDataAula.ehProfessor = await verificarProfessorDataAula();
    try {
        const aulas = await buscarAulasDasPaginas([...new Set(paginas.filter(Boolean))]);
        estadoDataAula.cards = cards.map((card, i) =>
            ({ card, aula: aulas.get(paginas[i]) || null }));
        await completarAulasPeloNumero(estadoDataAula.cards);
    } catch (erro) {
        if (!estadoDataAula.cards.length) return;
    }
    estadoDataAula.cards.forEach(renderizarDataNoCard);
    if (estadoDataAula.ehProfessor) estadoDataAula.cards.forEach(adicionarBotaoEditarAula);
}

iniciarDataAulas();
