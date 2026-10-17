// Botão "🗑️ Excluir" dos cards de aula do ATIVIDADES/index.html (#253). Antes de excluir, lê as
// atividades vinculadas à aula (atividade.aula_id): se houver alguma, a aula não é excluída e o
// professor é levado ao "✏️ Editar aula", onde desvincula (🔗 Gerenciar atividades) ou exclui
// cada atividade. Sem atividade vinculada, pede confirmação e exclui pela função excluir_aula do
// banco (exclusão lógica, aulas.excluido = 1, só Professor Administrador — a mesma do "📚
// Gerenciar Aulas", #250); o card some para todos.
// Depende de: assets/js/indice-aula-repositorio.js (listarAtividadesDaAulaCard),
// assets/js/indice-aula-modal.js (abrirModalAulaCard, confirmarModalAula,
// garantirPopupModalAula) e assets/js/indice-gerenciar-aulas-repositorio.js
// (excluirAulaGerenciar, usuarioEhAdministradorGerenciar), carregado depois deste arquivo mas
// usado só no clique.

const TEXTO_BOTAO_EXCLUIR_CARD = '🗑️ Excluir';
const TITULO_EXCLUIR_CARD = 'Excluir aula';
const TEXTO_ABRIR_EDITAR_CARD = '✏️ Abrir Editar aula';
const TEXTO_FECHAR_AVISO_CARD = 'Fechar';
const MSG_SO_ADMINISTRADOR_CARD = 'Só o Professor Administrador pode excluir aulas.';
const MSG_ATIVIDADES_ERRO_CARD = '❌ Não foi possível conferir as atividades vinculadas a ' +
    'esta aula. Nada foi excluído.';
const MSG_TEM_ATIVIDADES_CARD = ' não pode ser excluída: ainda tem atividade vinculada.\n\n' +
    'Remova (🔗 Gerenciar atividades) ou exclua (🗑️ Excluir) cada atividade abaixo no ' +
    '"✏️ Editar aula" e depois exclua a aula:\n\n';
const MSG_CONFIRMAR_EXCLUIR_CARD = ' será EXCLUÍDA no banco e o card some do índice para todos. ' +
    'Continuar?';
const MSG_EXCLUIR_ERRO_CARD = '❌ Não foi possível excluir a aula. Confira o login de Professor ' +
    'Administrador e o banco.';
const MSG_EXCLUIDA_CARD = '✅ Aula excluída.';

/**
 * Nome da aula para as mensagens ("A aula AULA 03 — Título").
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {string} Nome da aula.
 */
function descreverAulaExcluirCard(aula) {
    return 'A aula ' + obterRotuloDaAula(aula) + ' — ' + obterNomeDaAula(aula);
}

/**
 * Lista as atividades em linhas de texto ("• ID 12 — Nome").
 * @param {Object[]} atividades - Atividades vinculadas à aula.
 * @returns {string} Uma linha por atividade.
 */
function listarAtividadesExcluirCard(atividades) {
    return atividades.map((atividade) => '• ID ' + atividade.id + ' — ' +
        (atividade.nome_atividade || atividade.descricao || atividade.pagina || '')).join('\n');
}

/**
 * Mostra um aviso pelo popup do projeto.
 * @param {string} texto - Mensagem.
 * @param {string} tipo - 'erro', 'aviso' ou 'sucesso'.
 */
async function avisarExcluirCard(texto, tipo) {
    await garantirPopupModalAula();
    await window.mostrarPopup?.(texto, { tipo, titulo: TITULO_EXCLUIR_CARD });
}

/**
 * Recusa a exclusão porque a aula tem atividades vinculadas e, se o professor quiser, abre o
 * "Editar aula" para ele desvincular ou excluir as atividades.
 * @param {{aula: Object}} item - Card com a aula.
 * @param {Object[]} atividades - Atividades vinculadas.
 * @param {Object} contexto - Contexto do "Editar aula" (cards e aoGravar).
 */
async function recusarExclusaoComAtividades(item, atividades, contexto) {
    await garantirPopupModalAula();
    if (typeof window.confirmarPopup !== 'function') return;

    const texto = descreverAulaExcluirCard(item.aula) + MSG_TEM_ATIVIDADES_CARD +
        listarAtividadesExcluirCard(atividades);
    const abrir = await window.confirmarPopup(texto, { tipo: 'aviso', titulo: TITULO_EXCLUIR_CARD,
        textoConfirmar: TEXTO_ABRIR_EDITAR_CARD, textoCancelar: TEXTO_FECHAR_AVISO_CARD });
    if (abrir) abrirModalAulaCard(item, contexto);
}

/**
 * Lê as atividades vinculadas à aula; falha na leitura = null (não exclui sem conferir).
 * @param {number} idAula - Id da aula.
 * @returns {Promise<Object[]|null>} Atividades, ou null se a consulta falhou.
 */
async function lerAtividadesExcluirCard(idAula) {
    try {
        return await listarAtividadesDaAulaCard(idAula);
    } catch (erro) {
        return null;
    }
}

/**
 * Confirma e exclui a aula sem atividades; o card some pelo aoGravar.
 * @param {Object} aula - Linha da tabela aulas.
 * @param {Function} aoGravar - Redesenha os cards da aula.
 */
async function excluirAulaSemAtividadesCard(aula, aoGravar) {
    const texto = descreverAulaExcluirCard(aula) + MSG_CONFIRMAR_EXCLUIR_CARD;
    if (!await confirmarModalAula(texto, TITULO_EXCLUIR_CARD)) return;

    try {
        await excluirAulaGerenciar(aula.id);
    } catch (erro) {
        return avisarExcluirCard(MSG_EXCLUIR_ERRO_CARD, 'erro');
    }
    aoGravar({ ...aula, excluido: AULA_EXCLUIDA });
    await avisarExcluirCard(MSG_EXCLUIDA_CARD, 'sucesso');
}

/**
 * Clique no "Excluir": confere o administrador e as atividades vinculadas e só então exclui.
 * @param {{aula: Object}} item - Card com a aula.
 * @param {{cards: Object[], aoGravar: Function}} contexto - Dados do índice para o "Editar aula".
 */
async function aoExcluirAulaDoCard(item, contexto) {
    const aula = item.aula;
    if (!aula) return;

    if (!await usuarioEhAdministradorGerenciar()) {
        return avisarExcluirCard(MSG_SO_ADMINISTRADOR_CARD, 'aviso');
    }
    const atividades = await lerAtividadesExcluirCard(aula.id);
    if (!atividades) return avisarExcluirCard(MSG_ATIVIDADES_ERRO_CARD, 'erro');
    if (atividades.length) return recusarExclusaoComAtividades(item, atividades, contexto);

    await excluirAulaSemAtividadesCard(aula, contexto.aoGravar);
}

/**
 * Cria o botão "🗑️ Excluir" de um card de aula.
 * @param {{aula: Object}} item - Card com a aula.
 * @param {{cards: Object[], aoGravar: Function}} contexto - Dados do índice.
 * @returns {HTMLButtonElement} Botão.
 */
function criarBotaoExcluirAulaCard(item, contexto) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn aula-excluir-card-botao';
    botao.textContent = TEXTO_BOTAO_EXCLUIR_CARD;
    botao.addEventListener('click', () => aoExcluirAulaDoCard(item, contexto));
    return botao;
}
