// Modal "✏️ Editar aula" dos cards do ATIVIDADES/index.html: CRUD completo da linha da tabela
// aulas (todos os campos editáveis) e a lista das atividades da aula, cada uma com "✏️ Editar"
// (abre o CADASTRAR ATIVIDADES com a atividade) e "🗑️ Excluir". "➕ Nova atividade nesta aula"
// abre o cadastro com a aula já escolhida. O Professor Administrador também vê "🗑️ Excluir aula"
// (exclusão lógica, aulas.excluido = 1). Só o professor abre o modal; o RLS garante no banco.
// "Data da aula" e "Aula bloqueada nesta turma" valem para a turma do combo "Turma:" do índice
// (aula_turma, tarefa #206) e ficam em assets/js/indice-aula-modal-turma.js. "🔗 Gerenciar
// atividades" abre o modal de vincular/desvincular (assets/js/indice-aula-modal-vinculo.js, #213).
// Depende de: assets/js/indice-aula-repositorio.js, indice-aula-modal-turma.js e
// assets/js/atividades-crud-modal.js (abrirEdicaoAtividadeCrud); estilos de
// atividades-crud-modal.css e indice-aula-data.css.

const URL_POPUP_AULA_MODAL = document.currentScript?.src.replace(/[^/]*$/, 'popup.js') || '';
const MSG_AULA_GRAVADA = '✅ Aula gravada.';
const ID_FORMULARIO_MODAL_AULA = 'formulario-modal-aula';
const MSG_AULA_ERRO = '❌ Não foi possível gravar. Confira o login de professor, o número da ' +
    'aula (não pode repetir na matéria) e o banco.';
const MSG_AULA_TITULO = 'Informe o número e o título da aula.';
const MSG_AULA_JSON = 'O campo Conteúdo precisa ser um JSON válido (ou ficar vazio).';
const MSG_EXCLUIR_AULA_ERRO_MODAL = 'Não foi possível excluir a aula. Só o Professor ' +
    'Administrador pode excluir; confira o login e o banco.';
const MSG_SEM_ATIVIDADES_AULA = 'Nenhuma atividade ligada a esta aula.';
const MSG_ATIVIDADES_ERRO = '❌ Não foi possível carregar as atividades desta aula.';
const MSG_EXCLUIR_ATIVIDADE = ' será EXCLUÍDA. O gabarito, as respostas e as entregas dos ' +
    'alunos dela também serão apagados. Continuar?';

// Campos editáveis da tabela aulas: para incluir um campo novo, basta acrescentar aqui.
const CAMPOS_MODAL_AULA = [
    { nome: 'numero', rotulo: 'Número da aula', tipo: 'number', obrigatorio: true },
    { nome: 'titulo', rotulo: 'Título da aula', tipo: 'text', obrigatorio: true },
    { nome: 'rotulo_card', rotulo: 'Rótulo do card (vazio = "AULA NN")', tipo: 'text', maximo: 60 },
    { nome: 'nome_card', rotulo: 'Nome do card (vazio = título)', tipo: 'text', maximo: 200 },
    { nome: 'duracao_minutos', rotulo: 'Duração (minutos)', tipo: 'number' },
    { nome: 'sequencia', rotulo: 'Sequência', tipo: 'number' },
    { nome: 'descricao', rotulo: 'Descrição', tipo: 'textarea' },
    { nome: 'conteudo', rotulo: 'Conteúdo (JSON)', tipo: 'json' },
    { nome: 'ativo', rotulo: 'Ativa', tipo: 'checkbox' },
    { nome: 'visivel_alunos', rotulo: 'Visível aos alunos', tipo: 'checkbox' },
];

// Como cada tipo de campo é lido do formulário e escrito nele.
const LEITORES_CAMPO_AULA = {
    text: (controle) => controle.value.trim() || null,
    textarea: (controle) => controle.value.trim() || null,
    number: (controle) => (controle.value === '' ? null : Number(controle.value)),
    date: (controle) => controle.value || null,
    checkbox: (controle) => controle.checked,
    json: (controle) => (controle.value.trim() ? JSON.parse(controle.value) : null),
};
const ESCRITORES_CAMPO_AULA = {
    checkbox: (controle, valor) => { controle.checked = Boolean(valor); },
    json: (controle, valor) => { controle.value = valor ? JSON.stringify(valor, null, 2) : ''; },
};

const estadoModalAula = { item: null, contexto: null, atividades: [] };
let elementosModalAula = null;

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoModalAula(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Cria um botão do modal.
 * @param {string} texto - Texto do botão.
 * @param {string} classe - Classe extra.
 * @param {string} acao - Ação (data-acao).
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoModalAula(texto, classe, acao) {
    const botao = criarElementoModalAula('button', ('crud-btn ' + classe).trim(), texto);
    botao.type = acao === 'salvar' ? 'submit' : 'button';
    botao.dataset.acao = acao;
    return botao;
}

/**
 * Cria o controle de um campo da aula, conforme o tipo.
 * @param {{nome: string, tipo: string, maximo?: number}} definicao - Definição do campo.
 * @returns {HTMLElement} Input ou textarea.
 */
function criarControleModalAula(definicao) {
    const ehTextoLongo = definicao.tipo === 'textarea' || definicao.tipo === 'json';
    const controle = criarElementoModalAula(ehTextoLongo ? 'textarea' : 'input');
    controle.name = definicao.nome;
    if (!ehTextoLongo) controle.type = definicao.tipo;
    if (definicao.maximo) controle.maxLength = definicao.maximo;
    if (ehTextoLongo) controle.rows = definicao.tipo === 'json' ? 6 : 3;
    return controle;
}

/**
 * Cria um campo (rótulo + controle) do formulário da aula.
 * @param {{nome: string, rotulo: string, tipo: string}} definicao - Definição do campo.
 * @returns {HTMLLabelElement} Campo com rótulo.
 */
function criarCampoModalAula(definicao) {
    const campo = criarElementoModalAula('label', 'crud-campo');
    campo.append(criarElementoModalAula('span', 'crud-campo__rotulo', definicao.rotulo),
        criarControleModalAula(definicao));
    return campo;
}

/**
 * Monta o formulário da aula: informações fixas e campos editáveis (os botões ficam na barra do
 * topo, montarBarraModalAula).
 * @returns {{formulario: HTMLFormElement, info: HTMLElement}}
 */
function montarFormularioModalAula() {
    const formulario = criarElementoModalAula('form', 'crud-form aula-modal-form');
    formulario.id = ID_FORMULARIO_MODAL_AULA;
    const info = criarElementoModalAula('p', 'aula-modal-info');
    const camposDaTurma = typeof criarCamposTurmaModalAula === 'function'
        ? criarCamposTurmaModalAula() : [];
    formulario.append(info, ...CAMPOS_MODAL_AULA.map(criarCampoModalAula), ...camposDaTurma);
    return { formulario, info };
}

/**
 * Monta a barra de botões do topo do modal (pedido de 2026-10-16, #214), nesta ordem: Salvar,
 * Fechar, Excluir aula (só administrador), Gerenciar atividades e Nova atividade nesta aula.
 * O Salvar fica fora do formulário e o envia pelo atributo form.
 * @returns {{barra: HTMLElement, botaoExcluir: HTMLElement}} Barra e o botão de excluir.
 */
function montarBarraModalAula() {
    const barra = criarElementoModalAula('div', 'crud-form__acoes aula-modal-barra');
    const salvar = criarBotaoModalAula('Salvar', 'crud-btn--principal', 'salvar');
    salvar.setAttribute('form', ID_FORMULARIO_MODAL_AULA);
    const botaoExcluir = criarBotaoModalAula('🗑️ Excluir aula', 'aula-excluir-botao',
        'excluir-aula');
    barra.append(salvar, criarBotaoModalAula('✕ Fechar', '', 'fechar'), botaoExcluir,
        criarBotaoModalAula('🔗 Gerenciar atividades', '', 'gerenciar-atividades'),
        criarBotaoModalAula('➕ Nova atividade nesta aula', '', 'nova-atividade'));
    return { barra, botaoExcluir };
}

/**
 * Monta o modal (formulário da aula + lista de atividades) e o anexa à página.
 * @returns {Object} Referências dos elementos do modal.
 */
function montarModalAula() {
    const fundo = criarElementoModalAula('div', 'crud-fundo aula-data-fundo');
    const caixa = criarElementoModalAula('div', 'crud-caixa aula-modal-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const titulo = criarElementoModalAula('h2', '', 'Editar aula');
    const { barra, botaoExcluir } = montarBarraModalAula();
    const { formulario, info } = montarFormularioModalAula();
    // A mensagem fica logo abaixo da barra, perto do Salvar.
    const mensagem = criarElementoModalAula('p', 'crud-mensagem');
    const lista = criarElementoModalAula('div', 'crud-lista');
    caixa.append(titulo, barra, mensagem, formulario,
        criarElementoModalAula('h3', '', 'Atividades desta aula'), lista);
    fundo.append(caixa);
    fundo.hidden = true;
    document.body.append(fundo);
    fundo.addEventListener('click', aoClicarModalAula);
    formulario.addEventListener('submit', aoSalvarModalAula);
    return { fundo, titulo, formulario, info, botaoExcluir, mensagem, lista };
}

/**
 * Mostra uma mensagem no modal.
 * @param {string} texto - Mensagem (vazia limpa).
 * @param {boolean} [ehErro] - true para estilo de erro.
 */
function mostrarMensagemModalAula(texto, ehErro) {
    elementosModalAula.mensagem.textContent = texto;
    elementosModalAula.mensagem.classList.toggle('crud-mensagem--erro', Boolean(ehErro));
}

/**
 * Preenche o formulário com os dados da aula.
 * @param {Object} aula - Linha da tabela aulas.
 */
function preencherFormularioModalAula(aula) {
    const campos = elementosModalAula.formulario.elements;
    CAMPOS_MODAL_AULA.forEach(({ nome, tipo }) => {
        const escrever = ESCRITORES_CAMPO_AULA[tipo];
        if (escrever) return escrever(campos[nome], aula[nome]);
        campos[nome].value = aula[nome] ?? '';
    });
    elementosModalAula.info.textContent = 'ID da aula: ' + aula.id + ' · Matéria: ' +
        (aula.materia?.descricao || aula.materia_id) + ' · Curso: ' +
        (aula.curso?.nome_completo || aula.curso_id);
    if (typeof preencherCamposTurmaModalAula === 'function') {
        preencherCamposTurmaModalAula(elementosModalAula.formulario, aula);
    }
}

/**
 * Lê o formulário da aula.
 * @returns {Object} Valores das colunas editáveis.
 * @throws {SyntaxError} Se o Conteúdo não for JSON válido.
 */
function lerFormularioModalAula() {
    const campos = elementosModalAula.formulario.elements;
    return Object.fromEntries(CAMPOS_MODAL_AULA.map(({ nome, tipo }) =>
        [nome, LEITORES_CAMPO_AULA[tipo](campos[nome])]));
}

/**
 * Diz se faltam campos obrigatórios.
 * @param {Object} valores - Valores lidos do formulário.
 * @returns {boolean} true se algum obrigatório está vazio.
 */
function faltamObrigatoriosAula(valores) {
    return CAMPOS_MODAL_AULA.some(({ nome, obrigatorio }) =>
        obrigatorio && (valores[nome] === null || valores[nome] === ''));
}

/**
 * Valida e grava a aula; depois redesenha os cards dela.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function aoSalvarModalAula(evento) {
    evento.preventDefault();
    const aula = estadoModalAula.item?.aula;
    if (!aula) return;

    let valores;
    try {
        valores = lerFormularioModalAula();
    } catch (erro) {
        return mostrarMensagemModalAula(MSG_AULA_JSON, true);
    }
    if (faltamObrigatoriosAula(valores)) return mostrarMensagemModalAula(MSG_AULA_TITULO, true);

    try {
        if (!await gravarAulaCard(aula.id, valores)) throw new Error('Nenhuma linha alterada');
        const gravada = { ...aula, ...valores };
        estadoModalAula.contexto.aoGravar(typeof gravarCamposTurmaModalAula === 'function'
            ? await gravarCamposTurmaModalAula(elementosModalAula.formulario, gravada) : gravada);
        fecharModalAula();
        await garantirPopupModalAula();
        window.mostrarPopup?.(MSG_AULA_GRAVADA, { tipo: 'sucesso', titulo: 'Editar aula' });
    } catch (erro) {
        mostrarMensagemModalAula(MSG_AULA_ERRO, true);
    }
}

/**
 * Escreve no topo do modal o rótulo e o nome atuais do card.
 */
function atualizarTituloModalAula() {
    const aula = estadoModalAula.item.aula;
    elementosModalAula.titulo.textContent = '✏️ ' + obterRotuloDaAula(aula) + ' — ' +
        obterNomeDaAula(aula);
}

/**
 * Cria a linha de uma atividade da aula, com os botões Editar e Excluir.
 * @param {Object} atividade - Atividade da aula.
 * @returns {HTMLElement} Linha da lista.
 */
function criarLinhaAtividadeAula(atividade) {
    const linha = criarElementoModalAula('div', 'crud-linha');
    linha.dataset.id = String(atividade.id);
    const situacao = atividade.ativo ? '' : ' · INATIVA';
    const detalhe = (atividade.data_atividade || 'sem data') + ' · ' +
        (atividade.total_itens ?? 0) + ' itens · ' +
        (atividade.pagina || '').split('/').pop() + situacao;
    const texto = criarElementoModalAula('div', 'crud-linha__texto');
    texto.append(criarElementoModalAula('strong', '', 'ID ' + atividade.id + ' · ' +
        (atividade.nome_atividade || atividade.descricao || '')),
    criarElementoModalAula('small', '', detalhe));
    linha.append(texto, criarBotaoModalAula('✏️ Editar', '', 'editar-atividade'),
        criarBotaoModalAula('🗑️ Excluir', 'crud-btn--perigo', 'excluir-atividade'));
    return linha;
}

/**
 * Carrega do banco e desenha as atividades da aula.
 */
async function carregarAtividadesModalAula() {
    const { lista } = elementosModalAula;
    try {
        estadoModalAula.atividades = await listarAtividadesDaAulaCard(estadoModalAula.item.aula.id);
    } catch (erro) {
        lista.replaceChildren(criarElementoModalAula('p', 'crud-vazio', MSG_ATIVIDADES_ERRO));
        return;
    }
    if (!estadoModalAula.atividades.length) {
        lista.replaceChildren(criarElementoModalAula('p', 'crud-vazio', MSG_SEM_ATIVIDADES_AULA));
        return;
    }
    lista.replaceChildren(...estadoModalAula.atividades.map(criarLinhaAtividadeAula));
}

/**
 * Carrega o popup reutilizável (assets/js/popup.js), se ainda não estiver na página.
 * @returns {Promise<void>} Resolve quando o popup está disponível (ou falhou ao carregar).
 */
function garantirPopupModalAula() {
    if (typeof window.confirmarPopup === 'function' || !URL_POPUP_AULA_MODAL) {
        return Promise.resolve();
    }

    return new Promise((resolver) => {
        const script = document.createElement('script');
        script.src = URL_POPUP_AULA_MODAL;
        script.addEventListener('load', resolver);
        script.addEventListener('error', resolver);
        document.head.appendChild(script);
    });
}

/**
 * Pede confirmação pelo popup.
 * @param {string} texto - Pergunta.
 * @param {string} titulo - Título do popup.
 * @returns {Promise<boolean>} true se confirmou.
 */
async function confirmarModalAula(texto, titulo) {
    await garantirPopupModalAula();
    if (typeof window.confirmarPopup !== 'function') return false;

    return window.confirmarPopup(texto, { tipo: 'pergunta', titulo, textoConfirmar: '🗑️ Excluir' });
}

/**
 * Exclui uma atividade da aula, depois de confirmar.
 * @param {number} idAtividade - Id da atividade.
 */
async function aoExcluirAtividadeAula(idAtividade) {
    const atividade = estadoModalAula.atividades.find((item) => item.id === idAtividade);
    if (!atividade) return;

    const nome = 'A atividade ID ' + atividade.id + ' — ' +
        (atividade.nome_atividade || atividade.descricao || '');
    if (!await confirmarModalAula(nome + MSG_EXCLUIR_ATIVIDADE, 'Excluir atividade')) return;

    try {
        await excluirAtividadeDaAulaCard(idAtividade);
        await carregarAtividadesModalAula();
        mostrarMensagemModalAula('✅ Atividade excluída.');
    } catch (erro) {
        mostrarMensagemModalAula(MSG_AULA_ERRO, true);
    }
}

/**
 * Exclui (logicamente) a aula, depois de confirmar (só Professor Administrador).
 */
async function aoExcluirAulaModal() {
    const aula = estadoModalAula.item?.aula;
    if (!aula || !estadoModalAula.contexto.ehAdministrador) return;

    const texto = 'A aula "' + obterNomeDaAula(aula) + '" será marcada como excluída e o card ' +
        'dela deixará de aparecer no índice. Continuar?';
    if (!await confirmarModalAula(texto, 'Excluir aula')) return;

    if (!await excluirAulaCard(aula.id)) return mostrarMensagemModalAula(
        MSG_EXCLUIR_AULA_ERRO_MODAL, true);
    estadoModalAula.contexto.aoGravar({ ...aula, excluido: AULA_EXCLUIDA });
    fecharModalAula();
    await window.mostrarPopup?.('✅ Aula excluída.', { tipo: 'sucesso', titulo: 'Excluir aula' });
}

/**
 * Fecha o modal da aula e abre o CADASTRAR ATIVIDADES (editar uma ou cadastrar nova na aula).
 * @param {number|null} idAtividade - Id da atividade a editar ou null para nova.
 */
function abrirCadastroAtividadeDaAula(idAtividade) {
    const { item } = estadoModalAula;
    fecharModalAula();
    abrirEdicaoAtividadeCrud({ idAtividade, idAula: item.aula.id, pagina: item.pagina });
}

/**
 * Abre por cima o "🔗 Gerenciar atividades" (indice-aula-modal-vinculo.js) da aula em edição;
 * ao fechar, se algo mudou, relê a lista de atividades da aula.
 */
function abrirGerenciarAtividadesDaAula() {
    const aula = estadoModalAula.item?.aula;
    if (!aula || typeof abrirModalVinculoAula !== 'function') return;

    abrirModalVinculoAula(aula, carregarAtividadesModalAula);
}

/**
 * Trata os cliques do modal (fundo, fechar, excluir aula e botões das atividades).
 * @param {MouseEvent} evento - Clique.
 */
function aoClicarModalAula(evento) {
    if (evento.target === elementosModalAula.fundo) return fecharModalAula();

    const botao = evento.target.closest('[data-acao]');
    if (!botao) return;

    const idAtividade = Number(botao.closest('.crud-linha')?.dataset.id);
    const acoes = {
        fechar: fecharModalAula,
        'excluir-aula': aoExcluirAulaModal,
        'editar-atividade': () => abrirCadastroAtividadeDaAula(idAtividade),
        'excluir-atividade': () => aoExcluirAtividadeAula(idAtividade),
        'nova-atividade': () => abrirCadastroAtividadeDaAula(null),
        'gerenciar-atividades': abrirGerenciarAtividadesDaAula,
    };
    acoes[botao.dataset.acao]?.();
}

/**
 * Fecha o modal da aula.
 */
function fecharModalAula() {
    elementosModalAula.fundo.hidden = true;
    estadoModalAula.item = null;
}

/**
 * Abre o modal CRUD da aula de um card.
 * @param {{aula: Object, pagina: string|null}} item - Card com a aula.
 * @param {{cards: Object[], ehAdministrador: boolean, aoGravar: Function}} contexto - Dados do
 *   índice e a função que redesenha os cards da aula depois de gravar.
 */
function abrirModalAulaCard(item, contexto) {
    if (!elementosModalAula) elementosModalAula = montarModalAula();

    estadoModalAula.item = item;
    estadoModalAula.contexto = contexto;
    elementosModalAula.botaoExcluir.hidden = !contexto.ehAdministrador;
    atualizarTituloModalAula();
    preencherFormularioModalAula(item.aula);
    mostrarMensagemModalAula('');
    elementosModalAula.fundo.hidden = false;
    elementosModalAula.formulario.elements.titulo.focus();
    carregarAtividadesModalAula();
}
