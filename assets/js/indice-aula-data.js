// Data da aula em cada card do ATIVIDADES/index.html: mostra "📅 Data da aula" (lida
// de aulas.data_planejada) e, para o professor logado, o botão "✏️ Editar aula", que abre um
// modal para gravar a data e trocar o rótulo ("AULA 01", aulas.rotulo_card) e o nome do card
// (aulas.nome_card); vazio = texto escrito no HTML.
// A aula do card vem da atividade cadastrada para o link principal
// do card; se ela não vier (ex.: atividade bloqueada para o aluno), a aula é procurada pelo
// número do card ("AULA 01") na mesma matéria. Alunos e visitantes também veem a data.
// O RLS da tabela aulas só deixa o professor alterar. O Professor Administrador também vê
// "🗑️ Excluir aula" no modal: exclusão lógica (aulas.excluido = 1, função excluir_aula) e os
// cards de aula excluída ficam escondidos para todos.
// Depende de: js/supabase.js, assets/js/atividades-crud-repositorio.js e
// assets/js/atividades-crud-modal.js (obterCaminhoHtml e estilos do modal).

const SELETOR_CARD_DATA_AULA = 'article.aula';
const SELETOR_LINK_DATA_AULA = 'a.btn.principal';
const TABELA_AULAS_DATA = 'aulas';
const CAMPOS_AULA_DATA = 'id,numero,titulo,nome_card,rotulo_card,data_planejada,' +
    'materia_id,excluido';
const CAMPOS_ATIVIDADE_DATA_AULA = 'pagina,aula_id,aulas(' + CAMPOS_AULA_DATA + ')';
const SELETOR_NUMERO_DATA_AULA = '.num';
const SELETOR_NOME_CARD_AULA = '.topo h2';
const TAMANHO_MAXIMO_NOME_CARD = 200;
const TAMANHO_MAXIMO_ROTULO_CARD = 60;
const TEXTO_BOTAO_EDITAR_AULA = '✏️ Editar aula';
const TEXTO_SEM_DATA_AULA = '📅 Data da aula: não informada';
const TEXTO_AULA_SEM_CADASTRO = '📅 Aula não cadastrada no banco (use CADASTRAR ATIVIDADES)';
const MSG_DATA_AULA_GRAVADA = '✅ Aula gravada (rótulo, nome do card e data).';
const MSG_DATA_AULA_ERRO = '❌ Não foi possível gravar. Confira o login de professor e o banco.';
const MSG_AULA_COMPARTILHADA = '⚠️ Esta aula também está ligada a outro(s) card(s) — cada card ' +
    'deve ter a sua aula (CADASTRAR ATIVIDADES); salvar muda todos: ';
const RPC_EXCLUIR_AULA = 'excluir_aula';
const RPC_ADMINISTRADOR_AULA = 'eh_professor_administrador';
const CLASSE_CARD_AULA_EXCLUIDA = 'aula--excluida';
const AULA_EXCLUIDA = 1;
const MSG_EXCLUIR_AULA_ERRO = 'Não foi possível excluir a aula. Só o Professor Administrador ' +
    'pode excluir; confira o login e o banco.';
const URL_POPUP_DATA_AULA = document.currentScript?.src.replace(/[^/]*$/, 'popup.js') || '';

const estadoDataAula = {
    cards: [], aulaEmEdicao: null, itemEmEdicao: null,
    ehProfessor: false, ehAdministrador: false,
};
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
 * Grava a data e o nome do card da aula (null apaga a data / volta ao título do HTML).
 * @param {number} idAula - Id da aula.
 * @param {{data_planejada: string|null, nome_card: string|null, rotulo_card: string|null}}
 *   valores - Campos a gravar.
 * @returns {Promise<boolean>} true se o banco devolveu a linha alterada.
 */
async function gravarDataAula(idAula, valores) {
    const linhas = await sbPatch(TABELA_AULAS_DATA, 'id', idAula, valores);
    return Array.isArray(linhas) && linhas.length > 0;
}

/**
 * Escreve no card o rótulo e o nome gravados no banco ou, sem eles, os textos originais do HTML.
 * @param {{card: HTMLElement, aula: Object|null, tituloOriginal: string,
 *   rotuloOriginal: string}} item - Card e aula.
 */
function renderizarNomeNoCard(item) {
    const titulo = item.card.querySelector(SELETOR_NOME_CARD_AULA);
    const rotulo = item.card.querySelector(SELETOR_NUMERO_DATA_AULA);
    if (titulo) titulo.textContent = item.aula?.nome_card || item.tituloOriginal;
    if (rotulo) rotulo.textContent = item.aula?.rotulo_card || item.rotuloOriginal;
}

/**
 * Lê um texto escrito no HTML do card (usado quando a aula não tem o texto gravado).
 * @param {HTMLElement} card - Card do índice.
 * @param {string} seletor - Seletor do elemento (nome ou rótulo).
 * @returns {string} Texto original do card.
 */
function lerTextoOriginalCard(card, seletor) {
    return card.querySelector(seletor)?.textContent.trim() || '';
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
 * @returns {{fundo: HTMLElement, titulo: HTMLElement, campoRotulo: HTMLInputElement,
 *   campoNome: HTMLInputElement, campoData: HTMLInputElement, formulario: HTMLFormElement,
 *   mensagem: HTMLElement}} Referências dos elementos.
 */
function montarModalDataAula() {
    const fundo = criarElementoDataAula('div', 'crud-fundo aula-data-fundo');
    const caixa = criarElementoDataAula('div', 'crud-caixa aula-data-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const titulo = criarElementoDataAula('h2', '', 'Editar aula');
    const formulario = criarElementoDataAula('form', 'crud-form');
    const campoRotulo = criarCampoTextoAula('rotulo_card', TAMANHO_MAXIMO_ROTULO_CARD);
    const campoNome = criarCampoTextoAula('nome_card', TAMANHO_MAXIMO_NOME_CARD);
    const campoData = criarElementoDataAula('input');
    campoData.type = 'date';
    campoData.name = 'data_planejada';
    const acoes = criarElementoDataAula('div', 'crud-form__acoes');
    acoes.append(criarBotaoDataAula('Salvar', 'crud-btn--principal', 'salvar'),
        criarBotaoDataAula('Limpar data', '', 'limpar'),
        criarBotaoDataAula('✕ Fechar', '', 'fechar'));
    const botaoExcluir = criarBotaoDataAula('🗑️ Excluir aula', 'aula-excluir-botao', 'excluir');
    botaoExcluir.hidden = !estadoDataAula.ehAdministrador;
    acoes.append(botaoExcluir);
    formulario.append(criarCampoModalAula('Rótulo do card (ex.: AULA 01)', campoRotulo),
        criarCampoModalAula('Nome do card', campoNome),
        criarCampoModalAula('Data da aula', campoData), acoes);
    const mensagem = criarElementoDataAula('p', 'crud-mensagem');
    caixa.append(titulo, formulario, mensagem);
    fundo.append(caixa);
    fundo.hidden = true;
    document.body.append(fundo);
    return { fundo, titulo, campoRotulo, campoNome, campoData, formulario, mensagem };
}

/**
 * Cria um campo de texto do modal.
 * @param {string} nome - Nome do campo (coluna da tabela aulas).
 * @param {number} tamanhoMaximo - Quantidade máxima de caracteres.
 * @returns {HTMLInputElement} Campo criado.
 */
function criarCampoTextoAula(nome, tamanhoMaximo) {
    const campo = criarElementoDataAula('input');
    campo.type = 'text';
    campo.name = nome;
    campo.maxLength = tamanhoMaximo;
    return campo;
}

/**
 * Envolve um campo do modal com o rótulo.
 * @param {string} rotulo - Texto do rótulo.
 * @param {HTMLInputElement} entrada - Campo de entrada.
 * @returns {HTMLLabelElement} Campo com rótulo.
 */
function criarCampoModalAula(rotulo, entrada) {
    const campo = criarElementoDataAula('label', 'crud-campo');
    campo.append(criarElementoDataAula('span', 'crud-campo__rotulo', rotulo), entrada);
    return campo;
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
 * @param {{aula: Object, tituloOriginal: string, rotuloOriginal: string}} item - Card com a
 *   aula (id, numero, titulo, nome_card, rotulo_card, data_planejada) e os textos do HTML.
 */
function abrirModalDataAula(item) {
    const aula = item.aula;
    if (!elementosDataAula) {
        elementosDataAula = montarModalDataAula();
        elementosDataAula.formulario.addEventListener('submit', aoSalvarDataAula);
        elementosDataAula.fundo.addEventListener('click', aoClicarModalDataAula);
    }
    estadoDataAula.aulaEmEdicao = aula;
    estadoDataAula.itemEmEdicao = item;
    const numero = String(aula.numero ?? '').padStart(2, '0');
    elementosDataAula.titulo.textContent = 'Editar aula ' + numero + ' — ' +
        (aula.nome_card || item.tituloOriginal || aula.titulo || '');
    elementosDataAula.campoRotulo.value = aula.rotulo_card || item.rotuloOriginal;
    elementosDataAula.campoNome.value = aula.nome_card || item.tituloOriginal;
    elementosDataAula.campoData.value = aula.data_planejada || '';
    mostrarMensagemDataAula(montarAvisoAulaCompartilhada(item), true);
    elementosDataAula.fundo.hidden = false;
    elementosDataAula.campoRotulo.focus();
}

/**
 * Monta o aviso para quando a aula do card também está ligada a outros cards da página
 * (regra: cada card ligado a apenas 1 aula; a edição mudaria todos eles).
 * @param {{aula: Object, card: HTMLElement}} item - Card em edição.
 * @returns {string} Aviso ou texto vazio.
 */
function montarAvisoAulaCompartilhada(item) {
    const outros = estadoDataAula.cards.filter((outro) =>
        outro !== item && outro.aula?.id === item.aula.id);
    if (!outros.length) return '';

    const nomes = outros.map((outro) => outro.rotuloOriginal + ' — ' + outro.tituloOriginal);
    return MSG_AULA_COMPARTILHADA + nomes.join('; ') + '.';
}

/**
 * Fecha o modal.
 */
function fecharModalDataAula() {
    elementosDataAula.fundo.hidden = true;
    estadoDataAula.aulaEmEdicao = null;
    estadoDataAula.itemEmEdicao = null;
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
    if (acao === 'excluir') aoExcluirAula();
}

/**
 * Lê um texto digitado: vazio ou igual ao texto do HTML grava null (volta ao texto original).
 * @param {HTMLInputElement} campo - Campo do modal.
 * @param {string} original - Texto escrito no HTML do card.
 * @returns {string|null} Texto a gravar.
 */
function lerTextoCardDigitado(campo, original) {
    const texto = campo.value.trim();
    const usaOriginal = !texto || texto === original;
    return usaOriginal ? null : texto;
}

/**
 * Grava a data e o nome do card e atualiza todos os cards da mesma aula.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function aoSalvarDataAula(evento) {
    evento.preventDefault();
    const aula = estadoDataAula.aulaEmEdicao;
    const item = estadoDataAula.itemEmEdicao;
    if (!aula || !item) return;

    const valores = {
        data_planejada: elementosDataAula.campoData.value || null,
        nome_card: lerTextoCardDigitado(elementosDataAula.campoNome, item.tituloOriginal),
        rotulo_card: lerTextoCardDigitado(elementosDataAula.campoRotulo, item.rotuloOriginal),
    };
    try {
        const gravou = await gravarDataAula(aula.id, valores);
        if (!gravou) throw new Error('Nenhuma linha alterada');
        estadoDataAula.cards.filter((card) => card.aula?.id === aula.id).forEach((card) => {
            Object.assign(card.aula, valores);
            renderizarDataNoCard(card);
            renderizarNomeNoCard(card);
        });
        mostrarMensagemDataAula(MSG_DATA_AULA_GRAVADA);
    } catch (erro) {
        mostrarMensagemDataAula(MSG_DATA_AULA_ERRO, true);
    }
}

/**
 * Diz se o usuário logado é o Professor Administrador (só ele exclui aulas).
 * @returns {Promise<boolean>} true se for o administrador.
 */
async function verificarAdministradorDataAula() {
    const cliente = obterClienteSupabase();
    if (!cliente) return false;

    const { data, error } = await cliente.rpc(RPC_ADMINISTRADOR_AULA);
    return !error && data === true;
}

/**
 * Carrega o popup reutilizável (assets/js/popup.js), se ainda não estiver na página.
 * @returns {Promise<void>} Resolve quando o popup está disponível (ou falhou ao carregar).
 */
function garantirPopupDataAula() {
    if (typeof window.confirmarPopup === 'function' || !URL_POPUP_DATA_AULA) {
        return Promise.resolve();
    }

    return new Promise((resolver) => {
        const script = document.createElement('script');
        script.src = URL_POPUP_DATA_AULA;
        script.addEventListener('load', resolver);
        script.addEventListener('error', resolver);
        document.head.appendChild(script);
    });
}

/**
 * Esconde do índice os cards das aulas excluídas.
 */
function esconderCardsExcluidos() {
    estadoDataAula.cards.forEach((item) => {
        const excluida = item.aula?.excluido === AULA_EXCLUIDA;
        item.card.classList.toggle(CLASSE_CARD_AULA_EXCLUIDA, excluida);
    });
}

/**
 * Pede confirmação ao administrador antes de excluir a aula.
 * @param {Object} aula - Aula em edição.
 * @returns {Promise<boolean>} true se confirmou.
 */
async function confirmarExclusaoAula(aula) {
    await garantirPopupDataAula();
    if (typeof window.confirmarPopup !== 'function') return false;

    const numero = String(aula.numero ?? '').padStart(2, '0');
    return window.confirmarPopup('A aula ' + numero + ' — ' + (aula.titulo || '') + ' será ' +
        'marcada como excluída e o card dela deixará de aparecer no índice. Continuar?',
    { tipo: 'pergunta', titulo: 'Excluir aula', textoConfirmar: '🗑️ Excluir' });
}

/**
 * Exclui (logicamente) a aula em edição pela função do banco e esconde os cards dela.
 */
async function aoExcluirAula() {
    const aula = estadoDataAula.aulaEmEdicao;
    if (!aula || !estadoDataAula.ehAdministrador) return;
    if (!(await confirmarExclusaoAula(aula))) return;

    const { data, error } = await obterClienteSupabase().rpc(RPC_EXCLUIR_AULA, { p_aula: aula.id });
    if (error || data !== true) {
        mostrarMensagemDataAula(MSG_EXCLUIR_AULA_ERRO, true);
        return;
    }
    estadoDataAula.cards.filter((item) => item.aula?.id === aula.id)
        .forEach((item) => { item.aula.excluido = AULA_EXCLUIDA; });
    esconderCardsExcluidos();
    fecharModalDataAula();
    await window.mostrarPopup?.('✅ Aula excluída.', { tipo: 'sucesso', titulo: 'Excluir aula' });
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
    botao.addEventListener('click', () => abrirModalDataAula(item));
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
    if (estadoDataAula.ehProfessor) {
        estadoDataAula.ehAdministrador = await verificarAdministradorDataAula().catch(() => false);
    }
    try {
        const aulas = await buscarAulasDasPaginas([...new Set(paginas.filter(Boolean))]);
        estadoDataAula.cards = cards.map((card, i) => ({
            card,
            aula: aulas.get(paginas[i]) || null,
            tituloOriginal: lerTextoOriginalCard(card, SELETOR_NOME_CARD_AULA),
            rotuloOriginal: lerTextoOriginalCard(card, SELETOR_NUMERO_DATA_AULA),
        }));
        await completarAulasPeloNumero(estadoDataAula.cards);
    } catch (erro) {
        if (!estadoDataAula.cards.length) return;
    }
    esconderCardsExcluidos();
    estadoDataAula.cards.forEach(renderizarDataNoCard);
    estadoDataAula.cards.forEach(renderizarNomeNoCard);
    if (estadoDataAula.ehProfessor) estadoDataAula.cards.forEach(adicionarBotaoEditarAula);
}

iniciarDataAulas();
