// Botão "📚 Gerenciar Aulas" do ATIVIDADES/index.html (tarefa #250), só para o professor: fica no
// começo da barra "Turma:" (indice-turma-favorita.js) e abre o modal 1 com as aulas da matéria
// da página (número, título, ativa, visível), cada uma com ✏️ Editar e 🗑️ Excluir, e o
// "➕ Nova aula". As ações abrem o modal 2 (indice-gerenciar-aulas-formulario.js). O 🗑️ só fica
// ligado para o Professor Administrador (apaga de verdade, #254). Ao fechar o modal 1 depois de uma
// mudança, a página recarrega e os cards mostram as aulas como estão no banco (a aula nova já
// aparece como card, indice-gerenciar-aulas-cards.js).
// Depende de: atividades-crud-modal.js (usuarioEhProfessorCrud), indice-aula-modal.js,
// indice-aula-data.js (lerNomeMateriaDaPasta, obterRotuloDaAula, obterNomeDaAula),
// indice-gerenciar-aulas-repositorio.js e indice-gerenciar-aulas-formulario.js.

const TEXTO_BOTAO_GERENCIAR_AULAS = '📚 Gerenciar Aulas';
const CLASSE_BOTAO_GERENCIAR_AULAS = 'gerenciar-aulas-botao';
const CLASSE_BARRA_PROPRIA_GERENCIAR = 'barra-gerenciar-aulas';
const SELETOR_BARRA_TURMA_GERENCIAR = '.barra-turma-favorita';
const SELETORES_ANTES_BARRA_GERENCIAR = ['.container .resumo', '.container header'];
const SELETOR_CURSO_GERENCIAR = '[data-curso-id]';
// Disparado pelo indice-turma-favorita.js logo depois de pôr a barra da turma na página.
const EVENTO_BARRA_TURMA_GERENCIAR = 'turma-indice-alterada';
const MSG_SEM_MATERIA_GERENCIAR = '❌ Não foi possível identificar a matéria desta página no banco.';
const MSG_SEM_AULAS_GERENCIAR = 'Nenhuma aula cadastrada nesta matéria. Use ➕ Nova aula.';
const MSG_LISTA_ERRO_GERENCIAR = '❌ Não foi possível carregar as aulas. Confira o login e o banco.';
const TITULO_EXCLUIR_SO_ADMIN = 'Só o Professor Administrador exclui aulas.';

const estadoGerenciarAulas = { materia: null, nomeMateria: '', aulas: [], ehAdministrador: false,
    alterou: false };
let elementosGerenciarAulas = null;

/**
 * Monta o modal 1 (lista das aulas) e o anexa à página.
 * @returns {Object} Referências dos elementos do modal.
 */
function montarModalListaGerenciar() {
    const fundo = criarElementoModalAula('div', 'crud-fundo gerenciar-aulas-fundo');
    const caixa = criarElementoModalAula('div', 'crud-caixa aula-modal-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const titulo = criarElementoModalAula('h2', '', TEXTO_BOTAO_GERENCIAR_AULAS);
    const barra = criarElementoModalAula('div', 'crud-form__acoes aula-modal-barra');
    barra.append(criarBotaoModalAula('➕ Nova aula', 'crud-btn--principal', 'nova-aula'),
        criarBotaoModalAula('✕ Fechar', 'aula-modal-fechar', 'fechar'));
    const mensagem = criarElementoModalAula('p', 'crud-mensagem');
    const lista = criarElementoModalAula('div', 'crud-lista');
    caixa.append(titulo, barra, mensagem, lista);
    fundo.append(caixa);
    fundo.hidden = true;
    document.body.append(fundo);
    fundo.addEventListener('click', aoClicarListaGerenciar);
    return { fundo, titulo, mensagem, lista };
}

/**
 * Mostra uma mensagem no modal 1.
 * @param {string} texto - Mensagem (vazia limpa).
 * @param {boolean} [ehErro] - true para estilo de erro.
 */
function mostrarMensagemListaGerenciar(texto, ehErro) {
    elementosGerenciarAulas.mensagem.textContent = texto;
    elementosGerenciarAulas.mensagem.classList.toggle('crud-mensagem--erro', Boolean(ehErro));
}

/**
 * Cria a linha de uma aula com os botões Editar e Excluir.
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {HTMLElement} Linha da lista.
 */
function criarLinhaAulaGerenciar(aula) {
    const linha = criarElementoModalAula('div', 'crud-linha');
    linha.dataset.id = String(aula.id);
    const situacao = [aula.ativo === false ? 'inativa' : 'ativa',
        aula.visivel_alunos === false ? 'oculta aos alunos' : 'visível aos alunos',
        'ID ' + aula.id].join(' · ');
    const texto = criarElementoModalAula('div', 'crud-linha__texto');
    texto.append(criarElementoModalAula('strong', '',
        obterRotuloDaAula(aula) + ' — ' + obterNomeDaAula(aula)),
    criarElementoModalAula('small', '', situacao));
    const excluir = criarBotaoModalAula('🗑️ Excluir', 'crud-btn--perigo', 'excluir-aula');
    excluir.disabled = !estadoGerenciarAulas.ehAdministrador;
    if (excluir.disabled) excluir.title = TITULO_EXCLUIR_SO_ADMIN;
    linha.append(texto, criarBotaoModalAula('✏️ Editar', '', 'editar-aula'), excluir);
    return linha;
}

/**
 * Lê as aulas da matéria no banco e desenha a lista do modal 1.
 * @returns {Promise<void>}
 */
async function carregarListaGerenciar() {
    const { lista } = elementosGerenciarAulas;
    try {
        estadoGerenciarAulas.aulas = await listarAulasGerenciar(estadoGerenciarAulas.materia.id);
    } catch (erro) {
        lista.replaceChildren(criarElementoModalAula('p', 'crud-vazio', MSG_LISTA_ERRO_GERENCIAR));
        return;
    }
    const linhas = estadoGerenciarAulas.aulas.map(criarLinhaAulaGerenciar);
    lista.replaceChildren(...(linhas.length ? linhas
        : [criarElementoModalAula('p', 'crud-vazio', MSG_SEM_AULAS_GERENCIAR)]));
}

/**
 * Chamada pelo modal 2 depois de gravar ou excluir: relê a lista e mostra o aviso.
 * @param {string} texto - Aviso de sucesso.
 * @returns {Promise<void>}
 */
async function aoMudarAulasGerenciar(texto) {
    estadoGerenciarAulas.alterou = true;
    await carregarListaGerenciar();
    mostrarMensagemListaGerenciar(texto);
}

/**
 * Abre o modal 2 no modo pedido.
 * @param {string} modo - 'inserir', 'editar' ou 'excluir'.
 * @param {number} [idAula] - Id da aula (Editar e Excluir).
 */
function abrirFormDaListaGerenciar(modo, idAula) {
    const aula = estadoGerenciarAulas.aulas.find((item) => item.id === idAula) || null;
    if (modo !== 'inserir' && !aula) return;

    abrirFormGerenciarAula(modo, aula, { materia: estadoGerenciarAulas.materia,
        nomeMateria: estadoGerenciarAulas.nomeMateria, aoMudar: aoMudarAulasGerenciar });
}

/**
 * Fecha o modal 1; se alguma aula mudou, recarrega a página para os cards seguirem o banco.
 */
function fecharListaGerenciar() {
    elementosGerenciarAulas.fundo.hidden = true;
    if (estadoGerenciarAulas.alterou) location.reload();
}

/**
 * Trata os cliques do modal 1 (fundo, fechar, nova aula, editar e excluir).
 * @param {MouseEvent} evento - Clique.
 */
function aoClicarListaGerenciar(evento) {
    if (evento.target === elementosGerenciarAulas.fundo) return fecharListaGerenciar();

    const botao = evento.target.closest('[data-acao]');
    if (!botao || botao.disabled) return;

    const idAula = Number(botao.closest('.crud-linha')?.dataset.id);
    const acoes = {
        fechar: fecharListaGerenciar,
        'nova-aula': () => abrirFormDaListaGerenciar('inserir'),
        'editar-aula': () => abrirFormDaListaGerenciar('editar', idAula),
        'excluir-aula': () => abrirFormDaListaGerenciar('excluir', idAula),
    };
    acoes[botao.dataset.acao]?.();
}

/**
 * Descobre a matéria da página (nome da pasta + curso da faixa de matérias), uma vez só.
 * @returns {Promise<boolean>} true se achou a matéria.
 */
async function prepararMateriaGerenciar() {
    if (estadoGerenciarAulas.materia) return true;

    const nome = lerNomeMateriaDaPasta();
    const curso = document.querySelector(SELETOR_CURSO_GERENCIAR)?.dataset.cursoId || '';
    estadoGerenciarAulas.nomeMateria = nome;
    estadoGerenciarAulas.materia = nome ? await buscarMateriaGerenciarAulas(nome, curso) : null;
    return Boolean(estadoGerenciarAulas.materia);
}

/**
 * Abre o modal 1 com a lista das aulas da matéria.
 * @returns {Promise<void>}
 */
async function abrirListaGerenciar() {
    if (!elementosGerenciarAulas) elementosGerenciarAulas = montarModalListaGerenciar();
    elementosGerenciarAulas.fundo.hidden = false;
    mostrarMensagemListaGerenciar('');
    try {
        if (!await prepararMateriaGerenciar()) {
            return mostrarMensagemListaGerenciar(MSG_SEM_MATERIA_GERENCIAR, true);
        }
    } catch (erro) {
        return mostrarMensagemListaGerenciar(MSG_SEM_MATERIA_GERENCIAR, true);
    }
    elementosGerenciarAulas.titulo.textContent = TEXTO_BOTAO_GERENCIAR_AULAS + ' — ' +
        estadoGerenciarAulas.nomeMateria;
    await carregarListaGerenciar();
}

/**
 * Põe o botão no começo da barra "Turma:"; sem a barra (professor sem turma), numa barra
 * própria logo abaixo do resumo do índice.
 * @param {HTMLButtonElement} botao - Botão "📚 Gerenciar Aulas".
 */
function posicionarBotaoGerenciar(botao) {
    const barraTurma = document.querySelector(SELETOR_BARRA_TURMA_GERENCIAR);
    const barraPropria = document.querySelector('.' + CLASSE_BARRA_PROPRIA_GERENCIAR);
    if (barraTurma) {
        barraTurma.prepend(botao);
        barraPropria?.remove();
        return;
    }
    if (botao.isConnected) return;

    const referencia = SELETORES_ANTES_BARRA_GERENCIAR
        .map((seletor) => document.querySelector(seletor)).find(Boolean);
    if (!referencia) return;
    const barra = criarElementoModalAula('div', CLASSE_BARRA_PROPRIA_GERENCIAR);
    barra.append(botao);
    referencia.after(barra);
}

/**
 * Cria o botão para o professor e o mantém no começo da barra da turma.
 * @returns {Promise<void>}
 */
async function iniciarGerenciarAulas() {
    try {
        if (!await usuarioEhProfessorCrud()) return;
        estadoGerenciarAulas.ehAdministrador = await usuarioEhAdministradorGerenciar();
    } catch (erro) {
        return;
    }
    const botao = criarElementoModalAula('button', 'btn ' + CLASSE_BOTAO_GERENCIAR_AULAS,
        TEXTO_BOTAO_GERENCIAR_AULAS);
    botao.type = 'button';
    botao.addEventListener('click', abrirListaGerenciar);
    posicionarBotaoGerenciar(botao);
    document.addEventListener(EVENTO_BARRA_TURMA_GERENCIAR, () => posicionarBotaoGerenciar(botao));
}

iniciarGerenciarAulas();
