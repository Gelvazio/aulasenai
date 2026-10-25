// Modal "CADASTRAR ATIVIDADES" do ATIVIDADES/index.html: a lista das atividades cadastradas no
// banco e o CRUD (cadastrar, editar, excluir). Abre pelo ✏️ de cada atividade e pelo
// "➕ Nova atividade nesta aula" do modal da aula; o botão em cada card saiu em 2026-10-18 (#280).
// Só o professor logado vê os botões. O link da atividade é escolhido entre as páginas HTML desta
// pasta (os links dos cards do índice).
// Ao lado de cada atividade cadastrada, o professor também vê o botão ✏️, que abre a edição
// dela (nome, data, aula, ativa...) direto no formulário.
// Logo depois do ✏️ fica o botão "−" (só em atividade com aula): após confirmar, apenas remove o
// vínculo com a aula (aula_id = null); a atividade não é apagada.
// O ID, o ✏️ e o "−" vêm sempre do banco: são refeitos a cada evento
// 'aula-bloqueio-alterado', quando os botões 📝 das atividades vinculadas à aula são criados
// depois do carregamento.
// Depende de: supabase-js, js/supabase.js e assets/js/atividades-crud-repositorio.js.

const SELETOR_CARD = 'article.aula';
// atividade.pagina é gravada a partir de /MATERIAIS/; o servidor local põe uma pasta antes.
const PASTA_RAIZ_CAMINHO_CRUD = '/materiais/';
// Quantos segmentos finais (pasta/arquivo) formam a chave de comparação de uma página (#290.4).
const SEGMENTOS_CHAVE_PAGINA_CRUD = 2;
const SELETOR_LINK_ATIVIDADE = 'a.btn.principal';
const ALVO_NOVA_ABA_CRUD = '_blank';
const REL_NOVA_ABA_CRUD = 'noopener';
const MSG_SEM_ATIVIDADES_CRUD = 'Nenhuma atividade cadastrada para as páginas desta pasta.';
const MSG_ERRO_CRUD = 'Não foi possível concluir. Confira o login de professor e o banco.';
const MSG_CAMPOS_CRUD = 'Informe descrição, data, total de itens, aula e link da atividade.';
const MSG_ATIVIDADE_SALVA_CRUD = '✅ Atividade salva.';
const MSG_LINK_EM_USO = 'Já existe uma atividade cadastrada para este link.';
const MSG_CONFIRMAR_EXCLUSAO = 'Excluir esta atividade? O gabarito, as respostas e as entregas ' +
    'dos alunos dela também serão apagados.';

const BASE_ASSETS_CRUD = document.currentScript?.src.replace(/js\/[^/]*$/, '') || '';
const TEXTO_ID_NOVA_ATIVIDADE = '(nova atividade — o banco gera o id)';
const CLASSE_ID_CARD = 'crud-id-atividade';
const CLASSE_EDITAR_CARD = 'crud-editar-atividade';
const TEXTO_EDITAR_CARD = '✏️';
const SELETOR_INTERRUPTOR_CARD = '.interruptor-atividade';
const CLASSE_DESVINCULAR_CARD = 'crud-desvincular-atividade';
const TEXTO_DESVINCULAR_CARD = '−';
const TITULO_DESVINCULAR_CARD = 'Remover o vínculo desta atividade com a aula';
const MSG_CONFIRMAR_DESVINCULO = 'Confirma remoção do vinculo da Atividade?';
const TITULO_POPUP_DESVINCULO = 'Remover vínculo';
const TEXTO_CONFIRMAR_DESVINCULO = '− Remover vínculo';
const MSG_ERRO_DESVINCULO = '❌ Não foi possível remover o vínculo. ' +
    'Confira o login de professor e o banco.';
const MSG_DESVINCULO_FEITO = '✅ Vínculo removido.';
const TITULO_EDITAR_CARD = 'Editar esta atividade no banco (nome, data, aula, ativa...)';
// IDs menores que 10 com zero à esquerda (7 → 07); de 10 em diante, normal.
const DIGITOS_ID_ATIVIDADE = 2;
// Botão "🧾 LOG" dos cards escondido em todos os índices (pedido do usuário, 2026-10-09); o banco
// continua gravando o log_resposta_atividade. Para mostrar de novo, trocar para true.
const LOG_ALTERNATIVAS_LIGADO = false;
// Links dos cards travados até o indice-aula-data.js conferir o bloqueio da aula (sem isso, o
// aluno abria os slides da aula bloqueada enquanto a página consultava o banco).
const CLASSE_INDICE_CONFERINDO_AULA = 'indice--conferindo-aula';
// Artigos do HTML nunca aparecem como card: a grade vem só da tabela aulas
// (indice-aula-grade-banco.js, #272; o CSS esconde article.aula sem data-aula-id).
const CLASSE_INDICE_GRADE_DO_BANCO = 'indice--grade-do-banco';
// Guarda, antes de qualquer módulo mexer, quais artigos o HTML já traz escondidos (hidden): o
// conteúdo deles não entra no card da aula (indice-aula-grade-banco.js).
const SELETOR_ARTIGO_OCULTO_NO_HTML = 'article.aula[hidden]';
const ATRIBUTO_OCULTO_NO_HTML = 'data-oculto-no-html';

const TITULO_MODAL_COMPLETO_CRUD = 'Atividades cadastradas';
const TITULO_MODAL_UNICA_CRUD = '✏️ Editar atividade ID ';
// Modal aberto pelo ✏️ de uma atividade: só o formulário dela, sem a lista das outras.
const CLASSE_MODAL_UNICA_CRUD = 'crud-caixa--unica';

const estadoCrud = { paginas: [], atividades: [], aulas: [], editandoId: null, idUnica: null };
let elementosCrud = null;
// Evento do indice-aula-data.js disparado quando os botões dos cards são (re)feitos.
const EVENTO_CARDS_REFEITOS_CRUD = 'aula-bloqueio-alterado';
// Só vira true depois de confirmar o professor; consulta mais recente vence nas etiquetas.
let crudProfessorAtivo = false;
let consultaIdsCardsCrud = 0;

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
 * Converte o href de um link em caminho decodificado, se for uma página HTML. O caminho começa
 * em /MATERIAIS/ (como atividade.pagina no banco), ignorando a pasta que o servidor local
 * põe antes (ex.: /aulasenai/MATERIAIS/... vira /MATERIAIS/...), igual à #285.
 * @param {string} href - Valor do atributo href.
 * @returns {string|null} Caminho da página ou null se não for HTML.
 */
function obterCaminhoHtml(href) {
    if (!href) return null;

    const caminho = decodeURIComponent(new URL(href, location.href).pathname);
    if (!caminho.toLowerCase().endsWith('.html')) return null;

    const posicaoRaiz = caminho.toLowerCase().indexOf(PASTA_RAIZ_CAMINHO_CRUD);
    return posicaoRaiz >= 0 ? caminho.slice(posicaoRaiz) : caminho;
}

/**
 * Chave para comparar a página de um link com atividade.pagina sem depender da pasta que o
 * servidor põe antes, da caixa das letras nem da codificação: os dois últimos segmentos
 * (pasta/arquivo), em minúsculas. Serve só para comparar (nunca para consultar o banco, que
 * exige o caminho de obterCaminhoHtml).
 * @param {string} endereco - Href do link ou atividade.pagina.
 * @returns {string|null} Chave da página ou null se não for página HTML.
 */
function obterChaveDaPagina(endereco) {
    const caminho = obterCaminhoHtml(endereco);
    if (!caminho) return null;

    const segmentos = caminho.toLowerCase().split('/').filter(Boolean);
    return segmentos.slice(-SEGMENTOS_CHAVE_PAGINA_CRUD).join('/');
}

/**
 * Coleta as páginas de atividade desta pasta a partir dos links dos cards do índice.
 * @returns {string[]} Caminhos sem repetição.
 */
function coletarPaginasDoIndice() {
    const links = document.querySelectorAll(SELETOR_CARD + ' ' + SELETOR_LINK_ATIVIDADE);
    const caminhos = [...links].map((link) => obterCaminhoHtml(lerHrefCrud(link)));
    return [...new Set(caminhos.filter(Boolean))];
}

/**
 * Lê o link de um botão do card, mesmo com o card bloqueado (href guardado em
 * data-href-bloqueado pelo indice-atividades-bloqueio.js).
 * @param {HTMLAnchorElement} link - Link do card.
 * @returns {string|null} Endereço do link.
 */
function lerHrefCrud(link) {
    return link.getAttribute('href') || link.getAttribute('data-href-bloqueado');
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
    // Id só para conferência: bloqueado, não é enviado ao banco (lerFormularioCrud não o lê).
    const idAtividade = criarControleCrud('input', 'id_atividade', 'text');
    idAtividade.readOnly = true;
    idAtividade.disabled = true;
    idAtividade.placeholder = TEXTO_ID_NOVA_ATIVIDADE;
    formulario.append(
        criarCampoCrud('ID da atividade', idAtividade),
        criarCampoCrud('Nome da atividade', criarControleCrud('input', 'nome_atividade', 'text')),
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
 * @returns {{fundo: HTMLElement, caixa: HTMLElement, titulo: HTMLElement, lista: HTMLElement,
 *   formulario: HTMLFormElement, mensagem: HTMLElement}} Referências dos elementos.
 */
function montarModalCrud() {
    const fundo = criarElementoCrud('div', 'crud-fundo');
    const caixa = criarElementoCrud('div', 'crud-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const cabecalho = criarElementoCrud('div', 'crud-cabecalho');
    const titulo = criarElementoCrud('h2', '', TITULO_MODAL_COMPLETO_CRUD);
    cabecalho.append(titulo, criarBotaoCrud('✕ Fechar', '', 'fechar'));
    const lista = criarElementoCrud('div', 'crud-lista');
    const mensagem = criarElementoCrud('p', 'crud-mensagem');
    const formulario = montarFormularioCrud();
    caixa.append(cabecalho, lista, criarElementoCrud('h3', 'crud-subtitulo', 'Cadastrar / editar'),
        formulario, mensagem);
    fundo.append(caixa);
    document.body.append(fundo);
    return { fundo, caixa, titulo, lista, formulario, mensagem };
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
    campos.id_atividade.value = atividade ? String(atividade.id) : '';
    campos.nome_atividade.value = atividade?.nome_atividade || '';
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
        nome_atividade: campos.nome_atividade.value.trim() || null,
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
    texto.append(criarElementoCrud('strong', '', 'ID ' + atividade.id + ' · ' +
        (atividade.nome_atividade || atividade.descricao)),
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
    document.querySelectorAll(SELETOR_CARD)
        .forEach((card) => mostrarIdNoCard(card, estadoCrud.atividades));
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
        fecharModalCrud();
        avisarAtividadeSalvaCrud();
    } catch (erro) {
        mostrarMensagemCrud(MSG_ERRO_CRUD, true);
    }
}

/**
 * Refaz os botões das atividades vinculadas nos cards (a aula ou o ativo da atividade mudou).
 * @returns {Promise<void>}
 */
async function atualizarVinculadasDoIndiceCrud() {
    if (typeof atualizarAtividadesVinculadasDoIndice !== 'function') return;

    await atualizarAtividadesVinculadasDoIndice();
    document.querySelectorAll(SELETOR_CARD)
        .forEach((card) => mostrarIdNoCard(card, estadoCrud.atividades));
}

/**
 * Depois de salvar (modal já fechado): atualiza o nome das atividades nos cards e avisa.
 */
async function avisarAtividadeSalvaCrud() {
    if (typeof atualizarNomesDasAtividadesDoIndice === 'function') {
        atualizarNomesDasAtividadesDoIndice();
    }
    await atualizarVinculadasDoIndiceCrud();
    await garantirPopupCrud();
    if (typeof window.mostrarPopup === 'function') {
        window.mostrarPopup(MSG_ATIVIDADE_SALVA_CRUD, { tipo: 'sucesso' });
    }
}

/**
 * Exclui uma atividade após confirmação.
 * @param {number} id - Id da atividade.
 */
async function aoExcluirCrud(id) {
    await garantirPopupCrud();
    const confirmou = await window.confirmarPopup?.(MSG_CONFIRMAR_EXCLUSAO,
        { tipo: 'pergunta', titulo: 'Excluir atividade', textoConfirmar: '🗑️ Excluir' });
    if (!confirmou) return;

    try {
        await excluirAtividadeCrud(id);
        await recarregarListaCrud();
        await atualizarVinculadasDoIndiceCrud();
        mostrarMensagemCrud('✅ Atividade excluída.');
    } catch (erro) {
        mostrarMensagemCrud(MSG_ERRO_CRUD, true);
    }
}

/**
 * Carrega o popup reutilizável (assets/js/popup.js), se ainda não estiver na página.
 * @returns {Promise<void>} Resolve quando o popup está disponível (ou falhou ao carregar).
 */
function garantirPopupCrud() {
    if (typeof window.confirmarPopup === 'function' || !BASE_ASSETS_CRUD) {
        return Promise.resolve();
    }

    return new Promise((resolver) => {
        const script = criarElementoCrud('script');
        script.src = BASE_ASSETS_CRUD + 'js/popup.js';
        script.addEventListener('load', resolver);
        script.addEventListener('error', resolver);
        document.head.append(script);
    });
}

/**
 * Garante que o select de link tenha a página da atividade (ela pode não estar no índice).
 * @param {string} pagina - Caminho da página.
 */
function garantirOpcaoPaginaCrud(pagina) {
    const select = elementosCrud.formulario.elements.pagina;
    const existe = [...select.options].some((opcao) => opcao.value === pagina);
    if (!pagina || existe) return;

    const opcao = criarElementoCrud('option', '', pagina.split('/').pop());
    opcao.value = pagina;
    select.append(opcao);
}

/**
 * Abre o CADASTRAR ATIVIDADES a partir do modal da aula: editar uma atividade (idAtividade) ou
 * cadastrar uma nova já na aula informada (idAtividade null).
 * @param {{idAtividade: number|null, idAula: number, pagina: string|null}} pedido - O que abrir.
 */
async function abrirEdicaoAtividadeCrud({ idAtividade, idAula, pagina }) {
    await abrirModalCrud(pagina, idAtividade);
    if (!idAtividade) {
        elementosCrud.formulario.elements.aula_id.value = String(idAula);
        return;
    }

    try {
        const atividade = estadoCrud.atividades.find((item) => item.id === idAtividade) ||
            await buscarAtividadePorIdCrud(idAtividade);
        if (!atividade) return mostrarMensagemCrud(MSG_ERRO_CRUD, true);
        garantirOpcaoPaginaCrud(atividade.pagina);
        preencherFormularioCrud(atividade);
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
 * Atividade do modal aberto pelo ✏️ (modo de uma atividade só), já recarregada do banco.
 * @returns {Object|null} Atividade em edição, ou null no modo completo.
 */
function obterAtividadeUnicaCrud() {
    if (!estadoCrud.idUnica) return null;
    return estadoCrud.atividades.find((item) => item.id === estadoCrud.idUnica) || null;
}

/**
 * Liga o modo do modal: completo (lista + cadastro) ou de uma atividade só (sem a lista).
 * @param {number|null} idUnica - Id da atividade do ✏️; null = modo completo.
 */
function definirModoModalCrud(idUnica) {
    estadoCrud.idUnica = idUnica || null;
    const { caixa, titulo } = elementosCrud;
    caixa.classList.toggle(CLASSE_MODAL_UNICA_CRUD, Boolean(estadoCrud.idUnica));
    titulo.textContent = estadoCrud.idUnica
        ? TITULO_MODAL_UNICA_CRUD + formatarIdAtividadeCrud(estadoCrud.idUnica)
        : TITULO_MODAL_COMPLETO_CRUD;
}

/**
 * Abre o modal, carrega aulas e atividades e prepara o formulário para uma nova atividade.
 * @param {string} paginaDoCard - Link da atividade do card clicado.
 * @param {number|null} [idUnica] - Id da atividade do ✏️ (mostra só ela, sem a lista).
 */
async function abrirModalCrud(paginaDoCard, idUnica = null) {
    if (!elementosCrud) {
        elementosCrud = montarModalCrud();
        elementosCrud.fundo.addEventListener('click', aoClicarModalCrud);
        elementosCrud.formulario.addEventListener('submit', aoSalvarCrud);
    }
    definirModoModalCrud(idUnica);
    mostrarMensagemCrud('');
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
 * Formata o ID da atividade com dois dígitos (7 → "07"; 99 e 100 ficam como estão).
 * @param {number} id - Id da atividade.
 * @returns {string} ID formatado.
 */
function formatarIdAtividadeCrud(id) {
    return String(id).padStart(DIGITOS_ID_ATIVIDADE, '0');
}

/**
 * Mostra o ID na frente de cada atividade cadastrada do card (etiqueta dentro do botão).
 * @param {HTMLElement} card - Card do índice.
 * @param {Object[]} atividades - Atividades cadastradas das páginas do índice.
 */
function mostrarIdNoCard(card, atividades) {
    const seletorAntigos = '.' + CLASSE_ID_CARD + ', .' + CLASSE_EDITAR_CARD + ', .' +
        CLASSE_DESVINCULAR_CARD;
    card.querySelectorAll(seletorAntigos).forEach((elemento) => elemento.remove());
    card.querySelectorAll('a.btn').forEach((link) => {
        const pagina = obterCaminhoHtml(lerHrefCrud(link));
        const atividade = atividades.find((linha) => linha.pagina === pagina);
        if (!atividade) return;

        const etiqueta = criarElementoCrud('span', CLASSE_ID_CARD,
            'ID ' + formatarIdAtividadeCrud(atividade.id));
        link.prepend(etiqueta);
        const botaoEditar = criarBotaoEditarAtividade(atividade);
        posicionarBotaoEditar(link, botaoEditar);
        if (atividade.aula_id) botaoEditar.after(criarBotaoDesvincularAtividade(atividade));
    });
}

/**
 * Põe o ✏️ na mesma linha do link, sempre depois do ON/OFF (quando ele já estiver lá). Se o
 * ON/OFF chegar depois, ele entra logo após o link: a ordem fica link → ON/OFF → ✏️.
 * @param {HTMLElement} link - Link da atividade.
 * @param {HTMLButtonElement} botao - Botão ✏️.
 */
function posicionarBotaoEditar(link, botao) {
    const vizinho = link.nextElementSibling;
    const temInterruptor = vizinho?.matches(SELETOR_INTERRUPTOR_CARD);
    if (temInterruptor) return vizinho.after(botao);
    link.after(botao);
}

/**
 * Cria o botão ✏️ que fica ao lado do link da atividade e abre a edição dela no banco.
 * @param {{id: number, aula_id: number, pagina: string}} atividade - Atividade cadastrada.
 * @returns {HTMLButtonElement} Botão de edição.
 */
function criarBotaoEditarAtividade(atividade) {
    const botao = criarElementoCrud('button', 'btn ' + CLASSE_EDITAR_CARD, TEXTO_EDITAR_CARD);
    botao.type = 'button';
    botao.title = TITULO_EDITAR_CARD;
    botao.setAttribute('aria-label', TITULO_EDITAR_CARD);
    botao.addEventListener('click', () => abrirEdicaoAtividadeCrud({ idAtividade: atividade.id,
        idAula: atividade.aula_id, pagina: atividade.pagina }));
    return botao;
}

/**
 * Cria o botão "−" que fica logo depois do ✏️ e remove só o vínculo da atividade com a aula.
 * @param {{id: number, aula_id: number}} atividade - Atividade cadastrada, com aula.
 * @returns {HTMLButtonElement} Botão de desvincular.
 */
function criarBotaoDesvincularAtividade(atividade) {
    const botao = criarElementoCrud('button', 'btn ' + CLASSE_DESVINCULAR_CARD,
        TEXTO_DESVINCULAR_CARD);
    botao.type = 'button';
    botao.title = TITULO_DESVINCULAR_CARD;
    botao.setAttribute('aria-label', TITULO_DESVINCULAR_CARD);
    botao.addEventListener('click', () => aoDesvincularAtividadeCrud(atividade));
    return botao;
}

/**
 * Pede confirmação e remove o vínculo da atividade com a aula (só zera aula_id; não apaga).
 * @param {{id: number}} atividade - Atividade cadastrada.
 */
async function aoDesvincularAtividadeCrud(atividade) {
    await garantirPopupCrud();
    const confirmou = await window.confirmarPopup?.(MSG_CONFIRMAR_DESVINCULO, {
        tipo: 'pergunta',
        titulo: TITULO_POPUP_DESVINCULO,
        textoConfirmar: TEXTO_CONFIRMAR_DESVINCULO,
    });
    if (!confirmou) return;

    const alterou = await gravarDesvinculoCrud(atividade.id);
    if (!alterou) return window.mostrarPopup?.(MSG_ERRO_DESVINCULO, { tipo: 'erro' });

    await refazerCardsAposDesvinculoCrud();
    window.mostrarPopup?.(MSG_DESVINCULO_FEITO, { tipo: 'sucesso' });
}

/**
 * Zera a aula da atividade no banco (função do indice-aula-repositorio.js).
 * @param {number} idAtividade - Id da atividade.
 * @returns {Promise<boolean>} true se o banco alterou a linha; falha ou função ausente = false.
 */
async function gravarDesvinculoCrud(idAtividade) {
    if (typeof definirAulaDaAtividadeCard !== 'function') return false;

    try {
        return await definirAulaDaAtividadeCard(idAtividade, null);
    } catch (erro) {
        return false;
    }
}

/**
 * Atualiza a lista do banco e redesenha os botões e as etiquetas dos cards.
 */
async function refazerCardsAposDesvinculoCrud() {
    try {
        estadoCrud.atividades = await listarAtividadesCrud(estadoCrud.paginas);
    } catch (erro) {
        console.warn('Lista de atividades indisponível:', erro.message);
    }
    await atualizarVinculadasDoIndiceCrud();
    document.querySelectorAll(SELETOR_CARD)
        .forEach((card) => mostrarIdNoCard(card, estadoCrud.atividades));
}

/**
 * Busca as atividades cadastradas e mostra o ID delas nos cards (falha não quebra o índice).
 */
async function mostrarIdsNosCards() {
    const numeroConsulta = ++consultaIdsCardsCrud;
    try {
        const atividades = await listarAtividadesCrud(estadoCrud.paginas);
        if (numeroConsulta !== consultaIdsCardsCrud) return;

        document.querySelectorAll(SELETOR_CARD).forEach((card) => mostrarIdNoCard(card, atividades));
    } catch (erro) {
        console.warn('IDs das atividades indisponíveis:', erro.message);
    }
}

/**
 * Refaz as páginas do índice e as etiquetas de ID quando os botões dos cards são refeitos
 * (atividades vinculadas à aula pelo banco). O ID vem sempre do banco, nunca do HTML.
 */
async function atualizarIdsAposCardsRefeitos() {
    if (!crudProfessorAtivo) return;

    estadoCrud.paginas = coletarPaginasDoIndice();
    await mostrarIdsNosCards();
}

/**
 * Inicia o CRUD: só mostra os botões e os IDs se houver professor logado.
 */
async function iniciarCrudAtividades() {
    if (!await usuarioEhProfessorCrud()) return;

    crudProfessorAtivo = true;
    estadoCrud.paginas = coletarPaginasDoIndice();
    document.addEventListener(EVENTO_CARDS_REFEITOS_CRUD, atualizarIdsAposCardsRefeitos);
    await mostrarIdsNosCards();
    carregarAlertaPendentes();
}

/**
 * Carrega a coluna "Fez Atividade?", o bloqueio de atividades e a turma favorita.
 */
function carregarMarcacaoFeitas() {
    if (!BASE_ASSETS_CRUD) return;

    document.querySelectorAll(SELETOR_ARTIGO_OCULTO_NO_HTML)
        .forEach((artigo) => artigo.setAttribute(ATRIBUTO_OCULTO_NO_HTML, ''));
    document.body.classList.add(CLASSE_INDICE_CONFERINDO_AULA, CLASSE_INDICE_GRADE_DO_BANCO);

    const estilo = criarElementoCrud('link');
    estilo.rel = 'stylesheet';
    estilo.href = BASE_ASSETS_CRUD + 'css/indice-atividades-feitas.css';
    const estiloBloquear = criarElementoCrud('link');
    estiloBloquear.rel = 'stylesheet';
    estiloBloquear.href = BASE_ASSETS_CRUD + 'css/indice-atividades-bloquear.css';
    // Cores de situação do card (#325): o aluno só usa a folha, sem o script do professor.
    const estiloSituacao = criarElementoCrud('link');
    estiloSituacao.rel = 'stylesheet';
    estiloSituacao.href = BASE_ASSETS_CRUD + 'css/indice-atividades-pendentes.css';
    const script = criarElementoCrud('script');
    script.src = BASE_ASSETS_CRUD + 'js/indice-atividades-feitas.js';
    // A lista de matérias com o bloqueio da aula roda antes dos scripts de bloqueio (em ordem).
    const scriptConfigBloqueio = criarElementoCrud('script');
    scriptConfigBloqueio.src = BASE_ASSETS_CRUD + 'js/indice-bloqueio-aula-config.js';
    scriptConfigBloqueio.async = false;
    const scriptBloqueio = criarElementoCrud('script');
    scriptBloqueio.src = BASE_ASSETS_CRUD + 'js/indice-atividades-bloqueio.js';
    scriptBloqueio.async = false;
    document.head.append(estilo, estiloBloquear, estiloSituacao, script, scriptConfigBloqueio,
        scriptBloqueio);
    carregarTurmaFavoritaIndice();
    carregarDataAulasIndice();
    carregarLogAlternativasIndice();
    carregarIdsDoAlunoIndice();
}

/**
 * Carrega a etiqueta "ID NN" das atividades para o aluno logado (#288, #290.4).
 */
function carregarIdsDoAlunoIndice() {
    const script = criarElementoCrud('script');
    script.src = BASE_ASSETS_CRUD + 'js/indice-atividades-id-aluno.js';
    document.head.append(script);
}

/**
 * Carrega o alerta de atividade pendente nos cards (#293): só para o professor.
 */
function carregarAlertaPendentes() {
    if (!BASE_ASSETS_CRUD) return;

    const estilo = criarElementoCrud('link');
    estilo.rel = 'stylesheet';
    estilo.href = BASE_ASSETS_CRUD + 'css/indice-atividades-pendentes.css';
    const script = criarElementoCrud('script');
    script.src = BASE_ASSETS_CRUD + 'js/indice-atividades-pendentes.js';
    document.head.append(estilo, script);
}

/**
 * Links das atividades dos cards (botões principais) abrem em nova aba, para todos os perfis.
 * O bloqueio só troca o href (data-href-bloqueado), então o target continua valendo.
 */
function abrirAtividadesEmNovaAba() {
    document.querySelectorAll(SELETOR_CARD + ' ' + SELETOR_LINK_ATIVIDADE).forEach((link) => {
        link.target = ALVO_NOVA_ABA_CRUD;
        link.rel = REL_NOVA_ABA_CRUD;
    });
}

/**
 * Carrega o link "🧾 LOG" dos cards (professor): log das alternativas marcadas pelos alunos.
 */
function carregarLogAlternativasIndice() {
    if (!LOG_ALTERNATIVAS_LIGADO) return;

    const estilo = criarElementoCrud('link');
    estilo.rel = 'stylesheet';
    estilo.href = BASE_ASSETS_CRUD + 'css/indice-log-alternativas.css';
    const script = criarElementoCrud('script');
    script.src = BASE_ASSETS_CRUD + 'js/indice-log-alternativas.js';
    document.head.append(estilo, script);
}

/**
 * Destrava os links dos cards (fim da conferência do bloqueio da aula).
 */
function liberarLinksDosCardsIndice() {
    document.body.classList.remove(CLASSE_INDICE_CONFERINDO_AULA);
}

/**
 * Carrega os dados da aula nos cards, os botões "Editar aula" e "Excluir" (#253, professor) e o
 * "📚 Gerenciar Aulas" (#250): os cards das aulas só do banco antes do indice-aula-data.js, que
 * os chama; o botão e os modais depois, porque usam as funções do indice-aula-modal.js.
 */
function carregarDataAulasIndice() {
    const folhas = ['css/indice-aula-data.css', 'css/indice-gerenciar-aulas.css'];
    const estilos = folhas.map((caminho) => {
        const estilo = criarElementoCrud('link');
        estilo.rel = 'stylesheet';
        estilo.href = BASE_ASSETS_CRUD + caminho;
        return estilo;
    });
    const caminhos = ['js/indice-aula-repositorio.js', 'js/aula-turma-repositorio.js',
        'js/indice-aula-modal-turma.js', 'js/indice-aula-modal-vinculo.js',
        'js/indice-aula-modal.js', 'js/indice-aula-excluir-card.js',
        'js/indice-aula-bloqueio.js', 'js/indice-aula-atividades-vinculadas.js',
        'js/indice-aula-grade-banco.js', 'js/indice-aula-data.js',
        'js/indice-gerenciar-aulas-repositorio.js', 'js/indice-gerenciar-aulas-formulario.js',
        'js/indice-gerenciar-aulas.js'];
    const scripts = caminhos.map((caminho) => {
        const script = criarElementoCrud('script');
        script.src = BASE_ASSETS_CRUD + caminho;
        script.async = false;
        // Script que não carrega não pode deixar os links travados para sempre.
        script.addEventListener('error', liberarLinksDosCardsIndice);
        return script;
    });
    document.head.append(...estilos, ...scripts);
}

/**
 * Carrega a barra da turma favorita (professor): turma-favorita.js antes do script da barra.
 */
function carregarTurmaFavoritaIndice() {
    const estilo = criarElementoCrud('link');
    estilo.rel = 'stylesheet';
    estilo.href = BASE_ASSETS_CRUD + 'css/indice-turma-favorita.css';
    const scripts = ['js/turma-favorita.js', 'js/unidade.js', 'js/indice-turma-favorita.js'].map((caminho) => {
        const script = criarElementoCrud('script');
        script.src = BASE_ASSETS_CRUD + caminho;
        script.async = false;
        return script;
    });
    document.head.append(estilo, ...scripts);
}

/**
 * Carrega o card "Notas e média" (CSS e scripts) em todo índice de atividades que usa este
 * módulo, para valer em todas as matérias sem mexer em cada página.
 */
function carregarCardNotasMediaIndice() {
    const estilo = criarElementoCrud('link');
    estilo.rel = 'stylesheet';
    estilo.href = BASE_ASSETS_CRUD + 'css/card-notas-media.css';
    document.head.append(estilo);
    const caminhos = ['js/card-notas-media-calculo.js', 'js/card-notas-media-repositorio.js',
        'js/card-notas-media.js'];
    const carregarProximoScript = () => {
        const caminho = caminhos.shift();
        if (!caminho) return;
        const script = criarElementoCrud('script');
        script.src = BASE_ASSETS_CRUD + caminho;
        script.onload = carregarProximoScript;
        script.onerror = carregarProximoScript;
        document.head.append(script);
    };
    carregarProximoScript();
}

abrirAtividadesEmNovaAba();
carregarMarcacaoFeitas();
iniciarCrudAtividades();
carregarCardNotasMediaIndice();
