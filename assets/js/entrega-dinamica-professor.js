// Atividade Dinâmica no PC (tarefa #410): seção do PROFESSOR que lista as entregas da dinâmica 3D
// e mostra cada uma em modo leitura. O aluno nunca vê esta seção (o RLS também limita a leitura).
// Depende de nota-dinamica-repositorio.js, entrega-dinamica-repositorio.js e dinamica-3d-*.js.
// Regra: docs/regras/atividade-dinamica.md

const ID_ENTREGAS_DINAMICA = 'dinamica-entregas';
const CLASSE_LISTA_ENTREGAS = 'dinamica3d__entregas-lista';
const CLASSE_VISUALIZACAO_ENTREGA = 'dinamica3d-visualizacao';
const MSG_SEM_ATIVIDADE_ENTREGAS = 'Esta dinâmica ainda não está cadastrada no banco. ' +
    'Peça para aplicar o seed da atividade.';
const MSG_SEM_ENTREGAS = 'Nenhuma entrega até agora.';
const MSG_ERRO_ENTREGAS = 'Não foi possível carregar as entregas: ';
const MSG_ERRO_VISUALIZAR = 'Não foi possível abrir a entrega: ';
const TEXTO_RASCUNHO = 'Rascunho';
const SEM_NOME_ENTREGA = 'Aluno sem nome';
const FORMATO_DATA_ENTREGA = { dateStyle: 'short', timeStyle: 'short' };

const estadoEntregasProfessor = { visualizacao: null };

/**
 * Formata uma data do banco como dd/mm/aaaa hh:mm.
 * @param {string} valor - Data ISO.
 * @returns {string} Data formatada.
 */
function formatarDataEntrega(valor) {
    return new Date(valor).toLocaleString('pt-BR', FORMATO_DATA_ENTREGA).replace(',', '');
}

/**
 * Texto da situação de uma entrega.
 * @param {Object} entrega - Linha de entrega_dinamica.
 * @returns {string} "Entregue em ..." ou "Rascunho".
 */
function descreverSituacaoEntrega(entrega) {
    if (!entrega.entregue) return TEXTO_RASCUNHO;
    return 'Entregue em ' + formatarDataEntrega(entrega.entregue_em);
}

/**
 * Destrói a visualização aberta, se houver.
 */
function limparVisualizacaoEntrega() {
    estadoEntregasProfessor.visualizacao?.destruir();
    estadoEntregasProfessor.visualizacao = null;
}

/**
 * Desenha a entrega em modo leitura dentro da seção.
 * @param {HTMLElement} secao - Seção das entregas.
 * @param {Object} entrega - Linha de entrega_dinamica.
 */
function mostrarEntregaDinamica(secao, entrega) {
    const raiz = secao.querySelector('.' + CLASSE_VISUALIZACAO_ENTREGA);
    const aviso = secao.querySelector('.dinamica__texto');
    limparVisualizacaoEntrega();
    raiz.replaceChildren();
    aviso.textContent = '';
    try {
        estadoEntregasProfessor.visualizacao = iniciarDinamica3d({
            ...obterDinamica3d(document.body.dataset.aula),
            raiz, estadoInicial: entrega.estado, somenteLeitura: true, semGravacao: true,
        });
    } catch (erro) {
        aviso.textContent = MSG_ERRO_VISUALIZAR + erro.message;
    }
}

/**
 * Monta o item da lista de uma entrega.
 * @param {HTMLElement} secao - Seção das entregas.
 * @param {Object} entrega - Linha de entrega_dinamica.
 * @param {string} nome - Nome do aluno.
 * @returns {HTMLElement} Item da lista.
 */
function criarItemEntrega(secao, entrega, nome) {
    const item = criarNo3d('li', 'dinamica3d__entrega');
    const detalhe = descreverSituacaoEntrega(entrega) + ' · atualizado em '
        + formatarDataEntrega(entrega.atualizado_em);
    item.append(criarNo3d('strong', 'dinamica3d__entrega-nome', nome),
        criarNo3d('span', 'dinamica3d__entrega-situacao', detalhe),
        criarBotao3d('Ver entrega', () => mostrarEntregaDinamica(secao, entrega)));
    return item;
}

/**
 * Monta a lista de entregas (já em ordem de mais recente).
 * @param {HTMLElement} secao - Seção das entregas.
 * @param {Object[]} entregas - Linhas de entrega_dinamica.
 * @param {Map<string, string>} nomes - Mapa id do aluno para nome.
 * @returns {HTMLElement} Lista.
 */
function criarListaEntregas(secao, entregas, nomes) {
    const lista = criarNo3d('ul', CLASSE_LISTA_ENTREGAS);
    entregas.forEach((entrega) => lista.append(
        criarItemEntrega(secao, entrega, nomes.get(entrega.aluno_id) || SEM_NOME_ENTREGA)));
    return lista;
}

/**
 * Cria o aviso e o contêiner de visualização, se ainda não existirem.
 * @param {HTMLElement} secao - Seção das entregas.
 */
function prepararSecaoEntregas(secao) {
    secao.hidden = false;
    if (!secao.querySelector('.dinamica__texto')) {
        secao.append(criarNo3d('p', 'dinamica__texto'));
    }
    if (!secao.querySelector('.' + CLASSE_VISUALIZACAO_ENTREGA)) {
        secao.append(criarNo3d('div', CLASSE_VISUALIZACAO_ENTREGA));
    }
}

/**
 * Carrega as entregas e desenha a lista na seção.
 * @param {HTMLElement} secao - Seção das entregas.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<void>}
 */
async function carregarEntregasDinamica(secao, atividadeId) {
    const aviso = secao.querySelector('.dinamica__texto');
    const entregas = await lerEntregasDaAtividadeDinamica(atividadeId);
    if (entregas.length === 0) { aviso.textContent = MSG_SEM_ENTREGAS; return; }

    const nomes = await lerNomesDosAlunosDinamica(entregas.map((e) => e.aluno_id));
    secao.querySelector('.' + CLASSE_VISUALIZACAO_ENTREGA)
        .before(criarListaEntregas(secao, entregas, nomes));
}

/**
 * Inicia a seção do professor: mostra, busca a atividade e lista as entregas.
 * @returns {Promise<void>}
 */
async function iniciarEntregasDaDinamica() {
    if (!(await ehProfessorDinamica())) return;

    const secao = document.getElementById(ID_ENTREGAS_DINAMICA);
    if (!secao) return;

    prepararSecaoEntregas(secao);
    const aviso = secao.querySelector('.dinamica__texto');
    try {
        const atividade = await lerAtividadeDaDinamica();
        if (!atividade) { aviso.textContent = MSG_SEM_ATIVIDADE_ENTREGAS; return; }
        await carregarEntregasDinamica(secao, atividade.id);
    } catch (erro) {
        aviso.textContent = MSG_ERRO_ENTREGAS + erro.message;
    }
}

document.addEventListener('DOMContentLoaded', iniciarEntregasDaDinamica);
