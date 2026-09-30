// Botão "CADASTRAR ATIVIDADES" em cada card do ATIVIDADES/index.html: abre um modal com a lista
// das atividades cadastradas no banco e o CRUD (cadastrar, editar, excluir).
// Só o professor logado vê o botão. O link da atividade é escolhido entre as páginas HTML desta
// pasta (os links dos cards do índice).
// Depende de: supabase-js, js/supabase.js e assets/js/atividades-crud-repositorio.js.

const TEXTO_BOTAO_CRUD = '🗂️ CADASTRAR ATIVIDADES';
const SELETOR_CARD = 'article.aula';
const SELETOR_LINK_ATIVIDADE = 'a.btn.principal';
const SELETOR_ACOES = '.acoes';
const MSG_SEM_ATIVIDADES_CRUD = 'Nenhuma atividade cadastrada para as páginas desta pasta.';
const MSG_ERRO_CRUD = 'Não foi possível concluir. Confira o login de professor e o banco.';
const MSG_CAMPOS_CRUD = 'Informe descrição, data, total de itens, aula e link da atividade.';
const MSG_LINK_EM_USO = 'Já existe uma atividade cadastrada para este link.';
const MSG_CONFIRMAR_EXCLUSAO = 'Excluir esta atividade? O gabarito, as respostas e as entregas ' +
    'dos alunos dela também serão apagados.';

const BASE_ASSETS_CRUD = document.currentScript?.src.replace(/js\/[^/]*$/, '') || '';

const estadoCrud = { paginas: [], atividades: [], aulas: [], editandoId: null };
let elementosCrud = null;

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoCrud(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Converte o href de um link em caminho (pathname) decodificado, se for uma página HTML.
 * @param {string} href - Valor do atributo href.
 * @returns {string|null} Caminho da página ou null se não for HTML.
 */
function obterCaminhoHtml(href) {
    if (!href) return null;

    const caminho = decodeURIComponent(new URL(href, location.href).pathname);
    return caminho.toLowerCase().endsWith('.html') ? caminho : null;
}

/**
 * Coleta as páginas de atividade desta pasta a partir dos links dos cards do índice.
 * @returns {string[]} Caminhos sem repetição.
 */
function coletarPaginasDoIndice() {
    const links = document.querySelectorAll(SELETOR_CARD + ' ' + SELETOR_LINK_ATIVIDADE);
    const caminhos = [...links].map((link) => obterCaminhoHtml(link.getAttribute('href')));
    return [...new Set(caminhos.filter(Boolean))];
}

/**
 * Cria um campo de formulário com rótulo.
 * @param {string} rotulo - Texto do rótulo.
 * @param {HTMLElement} controle - Input ou select.
 * @returns {HTMLElement} Bloco do campo.
 */
function criarCampoCrud(rotulo, controle) {
    const campo = criarElementoCrud('label', 'crud-campo');
    campo.append(criarElementoCrud('span', 'crud-campo__rotulo', rotulo), controle);
    return campo;
}

/**
 * Cria um controle de formulário com nome.
 * @param {string} tag - input ou select.
 * @param {string} nome - Nome do campo.
 * @param {string} [tipo] - Tipo do input.
 * @returns {HTMLElement} Controle criado.
 */
function criarControleCrud(tag, nome, tipo) {
    const controle = criarElementoCrud(tag);
    controle.name = nome;
    if (tipo) controle.type = tipo;
    if (tipo === 'number') controle.min = '1';
    return controle;
}

/**
 * Cria um botão do modal.
 * @param {string} texto - Texto do botão.
 * @param {string} classe - Classe CSS extra.
 * @param {string} [acao] - Valor de data-acao.
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoCrud(texto, classe, acao) {
    const botao = criarElementoCrud('button', 'crud-btn ' + classe, texto);
    botao.type = 'button';
    if (acao) botao.dataset.acao = acao;
    return botao;
}

/**
 * Monta o formulário de cadastro/edição.
 * @returns {HTMLFormElement} Formulário com os campos e botões.
 */
function montarFormularioCrud() {
    const formulario = criarElementoCrud('form', 'crud-form');
    const ativa = criarControleCrud('input', 'ativo', 'checkbox');
    ativa.checked = true;
    formulario.append(
        criarCampoCrud('Descrição', criarControleCrud('input', 'descricao', 'text')),
        criarCampoCrud('Data', criarControleCrud('input', 'data_atividade', 'date')),
        criarCampoCrud('Total de itens', criarControleCrud('input', 'total_itens', 'number')),
        criarCampoCrud('Aula', criarControleCrud('select', 'aula_id')),
        criarCampoCrud('Link da atividade (desta pasta)', criarControleCrud('select', 'pagina')),
        criarCampoCrud('Ativa (visível aos alunos)', ativa),
    );
    const salvar = criarBotaoCrud('Salvar', 'crud-btn--principal');
    salvar.type = 'submit';
    const acoes = criarElementoCrud('div', 'crud-form__acoes');
    acoes.append(salvar, criarBotaoCrud('Nova / limpar', '', 'limpar'));
    formulario.append(acoes);
    return formulario;
}

/**
 * Monta o modal (fundo, caixa, lista, formulário e mensagem) e o anexa à página.
 * @returns {{fundo: HTMLElement, lista: HTMLElement, formulario: HTMLFormElement,
 *   mensagem: HTMLElement}} Referências dos elementos.
 */
function montarModalCrud() {
    const fundo = criarElementoCrud('div', 'crud-fundo');
    const caixa = criarElementoCrud('div', 'crud-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const cabecalho = criarElementoCrud('div', 'crud-cabecalho');
    cabecalho.append(criarElementoCrud('h2', '', 'Atividades cadastradas'),
        criarBotaoCrud('✕ Fechar', '', 'fechar'));
    const lista = criarElementoCrud('div', 'crud-lista');
    const mensagem = criarElementoCrud('p', 'crud-mensagem');
    const formulario = montarFormularioCrud();
    caixa.append(cabecalho, lista, criarElementoCrud('h3', '', 'Cadastrar / editar'),
        formulario, mensagem);
    fundo.append(caixa);
    document.body.append(fundo);
    return { fundo, lista, formulario, mensagem };
}

/**
 * Mostra uma mensagem no modal.
 * @param {string} texto - Mensagem (vazia limpa).
 * @param {boolean} [ehErro] - true para estilo de erro.
 */
function mostrarMensagemCrud(texto, ehErro) {
    elementosCrud.mensagem.textContent = texto;
    elementosCrud.mensagem.classList.toggle('crud-mensagem--erro', Boolean(ehErro));
}

/**
 * Preenche um select com opções.
 * @param {HTMLSelectElement} select - Select a preencher.
 * @param {Array<{valor: string, texto: string}>} opcoes - Opções.
 */
function preencherSelectCrud(select, opcoes) {
    select.replaceChildren(...opcoes.map(({ valor, texto }) => {
        const opcao = criarElementoCrud('option', '', texto);
        opcao.value = valor;
        return opcao;
    }));
}

/**
 * Texto de exibição de uma aula.
 * @param {Object} aula - Linha de aulas com matéria.
 * @returns {string} Ex.: "Matéria — Aula 2: Título".
 */
function rotularAulaCrud(aula) {
    const materia = aula.materia?.descricao || 'Matéria';
    return materia + ' — Aula ' + aula.numero + ': ' + aula.titulo;
}

/**
 * Preenche os selects de aula e de link com os dados carregados.
 */
function preencherSelectsCrud() {
    const campos = elementosCrud.formulario.elements;
    preencherSelectCrud(campos.aula_id, estadoCrud.aulas.map(
        (aula) => ({ valor: String(aula.id), texto: rotularAulaCrud(aula) })));
    preencherSelectCrud(campos.pagina, estadoCrud.paginas.map(
        (pagina) => ({ valor: pagina, texto: pagina.split('/').pop() })));
}

/**
 * Coloca o formulário em modo "novo" ou "editar".
 * @param {Object|null} atividade - Atividade a editar ou null para nova.
 * @param {string} [paginaPadrao] - Link sugerido para uma atividade nova.
 */
function preencherFormularioCrud(atividade, paginaPadrao) {
    const campos = elementosCrud.formulario.elements;
    estadoCrud.editandoId = atividade ? atividade.id : null;
    campos.descricao.value = atividade?.descricao || '';
    campos.data_atividade.value = atividade?.data_atividade || '';
    campos.total_itens.value = atividade?.total_itens || '';
    campos.ativo.checked = atividade ? atividade.ativo : true;
    if (atividade?.aula_id) campos.aula_id.value = String(atividade.aula_id);
    campos.pagina.value = atividade?.pagina || paginaPadrao || '';
    mostrarMensagemCrud('');
}

/**
 * Lê e valida o formulário.
 * @returns {Object|null} Dados da atividade ou null se faltar campo.
 */
function lerFormularioCrud() {
    const campos = elementosCrud.formulario.elements;
    const dados = {
        descricao: campos.descricao.value.trim(),
        data_atividade: campos.data_atividade.value,
        total_itens: Number(campos.total_itens.value),
        aula_id: Number(campos.aula_id.value),
        pagina: campos.pagina.value,
        ativo: campos.ativo.checked,
    };
    const estaCompleto = dados.descricao && dados.data_atividade && dados.total_itens > 0 &&
        dados.aula_id && dados.pagina;
    if (!estaCompleto) return null;

    if (estadoCrud.editandoId) dados.id = estadoCrud.editandoId;
    return dados;
}

/**
 * Cria uma linha da lista de atividades cadastradas.
 * @param {Object} atividade - Atividade cadastrada.
 * @returns {HTMLElement} Linha com dados e botões Editar/Excluir.
 */
function criarLinhaAtividadeCrud(atividade) {
    const linha = criarElementoCrud('div', 'crud-linha');
    const situacao = atividade.ativo ? '' : ' · INATIVA';
    const detalhe = atividade.data_atividade + ' · ' + atividade.total_itens + ' itens · ' +
        atividade.pagina.split('/').pop() + situacao;
    const texto = criarElementoCrud('div', 'crud-linha__texto');
    texto.append(criarElementoCrud('strong', '', atividade.descricao),
        criarElementoCrud('small', '', detalhe));
    linha.dataset.id = String(atividade.id);
    linha.append(texto, criarBotaoCrud('✏️ Editar', '', 'editar'),
        criarBotaoCrud('🗑️ Excluir', 'crud-btn--perigo', 'excluir'));
    return linha;
}

/**
 * Desenha a lista de atividades cadastradas.
 */
function renderizarListaCrud() {
    const { lista } = elementosCrud;
    if (!estadoCrud.atividades.length) {
        lista.replaceChildren(criarElementoCrud('p', 'crud-vazio', MSG_SEM_ATIVIDADES_CRUD));
        return;
    }
    lista.replaceChildren(...estadoCrud.atividades.map(criarLinhaAtividadeCrud));
}

/**
 * Recarrega a lista do banco e a redesenha.
 */
async function recarregarListaCrud() {
    estadoCrud.atividades = await listarAtividadesCrud(estadoCrud.paginas);
    renderizarListaCrud();
}

/**
 * Salva (cria ou atualiza) a atividade do formulário.
 * @param {Event} evento - Envio do formulário.
 */
async function aoSalvarCrud(evento) {
    evento.preventDefault();
    const dados = lerFormularioCrud();
    if (!dados) return mostrarMensagemCrud(MSG_CAMPOS_CRUD, true);

    const emUso = estadoCrud.atividades.some(
        (item) => item.pagina === dados.pagina && item.id !== dados.id);
    if (emUso) return mostrarMensagemCrud(MSG_LINK_EM_USO, true);

    try {
        await gravarAtividadeCrud(dados);
        await recarregarListaCrud();
        preencherFormularioCrud(null);
        mostrarMensagemCrud('✅ Atividade salva.');
    } catch (erro) {
        mostrarMensagemCrud(MSG_ERRO_CRUD, true);
    }
}

/**
 * Exclui uma atividade após confirmação.
 * @param {number} id - Id da atividade.
 */
async function aoExcluirCrud(id) {
    if (!window.confirm(MSG_CONFIRMAR_EXCLUSAO)) return;

    try {
        await excluirAtividadeCrud(id);
        await recarregarListaCrud();
        mostrarMensagemCrud('✅ Atividade excluída.');
    } catch (erro) {
        mostrarMensagemCrud(MSG_ERRO_CRUD, true);
    }
}

/**
 * Fecha o modal.
 */
function fecharModalCrud() {
    elementosCrud.fundo.hidden = true;
}

/**
 * Trata os cliques do modal (fechar, limpar, editar, excluir).
 * @param {MouseEvent} evento - Clique dentro do modal.
 */
function aoClicarModalCrud(evento) {
    if (evento.target === elementosCrud.fundo) return fecharModalCrud();

    const botao = evento.target.closest('[data-acao]');
    if (!botao) return;

    const id = Number(botao.closest('.crud-linha')?.dataset.id);
    const acoes = {
        fechar: fecharModalCrud,
        limpar: () => preencherFormularioCrud(null),
        editar: () => preencherFormularioCrud(estadoCrud.atividades.find((a) => a.id === id)),
        excluir: () => aoExcluirCrud(id),
    };
    acoes[botao.dataset.acao]?.();
}

/**
 * Abre o modal, carrega aulas e atividades e prepara o formulário para uma nova atividade.
 * @param {string} paginaDoCard - Link da atividade do card clicado.
 */
async function abrirModalCrud(paginaDoCard) {
    if (!elementosCrud) {
        elementosCrud = montarModalCrud();
        elementosCrud.fundo.addEventListener('click', aoClicarModalCrud);
        elementosCrud.formulario.addEventListener('submit', aoSalvarCrud);
    }
    elementosCrud.fundo.hidden = false;
    try {
        estadoCrud.aulas = await listarAulasCrud();
        preencherSelectsCrud();
        await recarregarListaCrud();
        preencherFormularioCrud(null, paginaDoCard);
    } catch (erro) {
        mostrarMensagemCrud(MSG_ERRO_CRUD, true);
    }
}

/**
 * Acrescenta o botão CADASTRAR ATIVIDADES a um card.
 * @param {HTMLElement} card - Card do índice.
 */
function adicionarBotaoCrudAoCard(card) {
    const link = card.querySelector(SELETOR_LINK_ATIVIDADE);
    const acoes = card.querySelector(SELETOR_ACOES);
    if (!link || !acoes) return;

    const botao = criarElementoCrud('button', 'btn crud-botao-card', TEXTO_BOTAO_CRUD);
    botao.type = 'button';
    const pagina = obterCaminhoHtml(link.getAttribute('href'));
    botao.addEventListener('click', () => abrirModalCrud(pagina));
    acoes.append(botao);
}

/**
 * Inicia o CRUD: só mostra os botões se houver professor logado.
 */
async function iniciarCrudAtividades() {
    if (!await usuarioEhProfessorCrud()) return;

    estadoCrud.paginas = coletarPaginasDoIndice();
    document.querySelectorAll(SELETOR_CARD).forEach(adicionarBotaoCrudAoCard);
}

/**
 * Carrega a coluna "Fez Atividade?" e o bloqueio de atividades (CSS e JS próprios).
 */
function carregarMarcacaoFeitas() {
    if (!BASE_ASSETS_CRUD) return;

    const estilo = criarElementoCrud('link');
    estilo.rel = 'stylesheet';
    estilo.href = BASE_ASSETS_CRUD + 'css/indice-atividades-feitas.css';
    const script = criarElementoCrud('script');
    script.src = BASE_ASSETS_CRUD + 'js/indice-atividades-feitas.js';
    const scriptBloqueio = criarElementoCrud('script');
    scriptBloqueio.src = BASE_ASSETS_CRUD + 'js/indice-atividades-bloqueio.js';
    document.head.append(estilo, script, scriptBloqueio);
}

carregarMarcacaoFeitas();
iniciarCrudAtividades();
