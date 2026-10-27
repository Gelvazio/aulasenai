// Parte do modal "✏️ Editar aula" (indice-aula-modal.js) que vale para a TURMA escolhida no combo
// "Turma:" do índice (tarefa #206): "Data da aula" (aula_turma.data_aula) e, nas matérias com o
// bloqueio da aula ligado (indice-bloqueio-aula-config.js), "Aula bloqueada nesta turma"
// (aula_turma.bloqueio, gravado por gravarBloqueioAula do indice-aula-bloqueio.js). Sem turma no
// combo, os dois campos ficam desabilitados. As colunas da tabela aulas continuam no modal.
// Depende de: assets/js/aula-turma-repositorio.js; usa indice-aula-bloqueio.js se carregado.

const CAMPO_DATA_TURMA_MODAL_AULA = 'data_aula_turma';
const CAMPO_BLOQUEIO_TURMA_MODAL_AULA = 'bloqueio_aula_turma';
const SELETOR_COMBO_TURMA_MODAL_AULA = '.barra-turma-favorita__lista';
const ROTULO_DATA_TURMA_MODAL_AULA = 'Data da aula';
const CAMPO_DATA_ASSUNTO_TURMA_MODAL_AULA = 'data_assunto_turma';
const ROTULO_DATA_ASSUNTO_TURMA_MODAL_AULA = 'Data do assunto';
const ROTULO_BLOQUEIO_TURMA_MODAL_AULA = 'Aula bloqueada nesta turma';
const TEXTO_SEM_TURMA_MODAL_AULA = ' (escolha uma turma no combo do índice)';
const EVENTO_AULA_BLOQUEIO_MODAL_TURMA = 'aula-bloqueio-alterado';

// turma e linha (aula_turma) lidas ao abrir o modal; bloqueada = valor inicial do bloqueio.
const estadoModalAulaTurma = { turma: '', linha: null, bloqueada: false };

/**
 * Cria um campo (rótulo + controle) da parte da turma.
 * @param {{nome: string, rotulo: string, tipo: string}} definicao - Definição do campo.
 * @returns {HTMLLabelElement} Campo com rótulo.
 */
function criarCampoTurmaModalAula({ nome, rotulo, tipo }) {
    const campo = document.createElement('label');
    campo.className = 'crud-campo';
    const texto = document.createElement('span');
    texto.className = 'crud-campo__rotulo';
    texto.textContent = rotulo;
    const controle = document.createElement('input');
    controle.name = nome;
    controle.type = tipo;
    campo.append(texto, controle);
    return campo;
}

/**
 * Cria os campos "Data da aula" e "Aula bloqueada nesta turma".
 * @returns {HTMLLabelElement[]} Campos para o formulário do modal.
 */
function criarCamposTurmaModalAula() {
    return [
        { nome: CAMPO_DATA_TURMA_MODAL_AULA, rotulo: ROTULO_DATA_TURMA_MODAL_AULA, tipo: 'date' },
        { nome: CAMPO_DATA_ASSUNTO_TURMA_MODAL_AULA, rotulo: ROTULO_DATA_ASSUNTO_TURMA_MODAL_AULA,
            tipo: 'date' },
        { nome: CAMPO_BLOQUEIO_TURMA_MODAL_AULA, rotulo: ROTULO_BLOQUEIO_TURMA_MODAL_AULA,
            tipo: 'checkbox' },
    ].map(criarCampoTurmaModalAula);
}

/**
 * Diz se o bloqueio da aula vale nesta página e se o módulo dele já leu a mesma turma do modal
 * (gravarBloqueioAula grava na turma que ele leu).
 * @param {string} turma - Turma do combo lida pelo modal.
 * @returns {boolean} true se o modal pode gravar o bloqueio nessa turma.
 */
function bloqueioAulaNoModalTurma(turma) {
    const moduloCarregado = typeof bloqueioAulaAtivoNaPagina === 'function' &&
        typeof gravarBloqueioAula === 'function' && typeof turmaDoBloqueioAula === 'function';
    return moduloCarregado && bloqueioAulaAtivoNaPagina() && Boolean(turma) &&
        turmaDoBloqueioAula() === turma;
}

/**
 * Escreve o rótulo de um campo da turma (com o código da turma ou o aviso de escolher uma).
 * @param {HTMLInputElement} controle - Campo do formulário.
 * @param {string} rotulo - Rótulo base.
 * @param {string} turma - Turma do combo (vazio = nenhuma).
 */
function rotularCampoTurmaModalAula(controle, rotulo, turma) {
    const texto = controle.closest('label').querySelector('.crud-campo__rotulo');
    const complemento = turma ? ' (turma ' + turma + ')' : TEXTO_SEM_TURMA_MODAL_AULA;
    texto.textContent = rotulo + complemento;
    controle.disabled = !turma;
}

/**
 * Preenche a data e o bloqueio da aula na turma do combo (lidos agora do banco).
 * @param {HTMLFormElement} formulario - Formulário do modal.
 * @param {Object} aula - Linha da tabela aulas.
 */
async function preencherCamposTurmaModalAula(formulario, aula) {
    const data = formulario.elements[CAMPO_DATA_TURMA_MODAL_AULA];
    const dataAssunto = formulario.elements[CAMPO_DATA_ASSUNTO_TURMA_MODAL_AULA];
    const bloqueio = formulario.elements[CAMPO_BLOQUEIO_TURMA_MODAL_AULA];
    const turma = document.querySelector(SELETOR_COMBO_TURMA_MODAL_AULA)?.value || '';
    Object.assign(estadoModalAulaTurma, { turma, linha: null, bloqueada: false });
    rotularCampoTurmaModalAula(data, ROTULO_DATA_TURMA_MODAL_AULA, turma);
    rotularCampoTurmaModalAula(dataAssunto, ROTULO_DATA_ASSUNTO_TURMA_MODAL_AULA, turma);
    rotularCampoTurmaModalAula(bloqueio, ROTULO_BLOQUEIO_TURMA_MODAL_AULA, turma);
    bloqueio.closest('label').hidden = !bloqueioAulaNoModalTurma(turma);
    data.value = '';
    dataAssunto.value = '';
    bloqueio.checked = false;
    if (!turma) return;

    try {
        const linha = (await lerLinhasAulaTurma(turma)).get(aula.id) || null;
        Object.assign(estadoModalAulaTurma, { linha, bloqueada: linha?.bloqueio === true });
        data.value = linha?.data_aula || '';
        dataAssunto.value = linha?.data_assunto || '';
        bloqueio.checked = estadoModalAulaTurma.bloqueada;
    } catch (erro) {
        console.warn('Data da aula na turma indisponível:', erro.message);
    }
}

/**
 * Diz se alguma das datas da turma mudou em relação à linha lida ao abrir o modal.
 * @param {{data_aula: ?string, data_assunto: ?string}} datas - Datas do formulário.
 * @returns {boolean} true se há o que gravar.
 */
function datasTurmaModalMudaram(datas) {
    const linha = estadoModalAulaTurma.linha;
    return (linha?.data_aula || null) !== datas.data_aula
        || (linha?.data_assunto || null) !== datas.data_assunto;
}

/**
 * Grava a data da aula e a data do assunto na turma, se mudaram.
 * @param {number} aulaId - Id da aula.
 * @param {{data_aula: ?string, data_assunto: ?string}} datas - Datas AAAA-MM-DD, ou null.
 * @throws {Error} Se o banco recusar.
 */
async function gravarDatasTurmaModalAula(aulaId, datas) {
    const { turma, linha } = estadoModalAulaTurma;
    if (!datasTurmaModalMudaram(datas)) return;

    // Sem linha lida (modal salvo antes da leitura terminar), confere de novo para não duplicar.
    const existente = linha || (await lerLinhasAulaTurma(turma)).get(aulaId) || null;
    const gravada = await gravarLinhaAulaTurma({ aulaId, turmaCodigo: turma, existente },
        { data_aula: datas.data_aula, data_assunto: datas.data_assunto });
    estadoModalAulaTurma.linha = gravada;
    if (typeof registrarLinhaAulaTurma === 'function') registrarLinhaAulaTurma(gravada);
}

/**
 * Grava a data e o bloqueio da aula na turma do combo (só o que mudou).
 * @param {HTMLFormElement} formulario - Formulário do modal.
 * @param {Object} aula - Aula com os valores já gravados na tabela aulas.
 * @returns {Promise<Object>} Aula atualizada (liberar pode mudar aulas.ativo).
 * @throws {Error} Se o banco recusar.
 */
async function gravarCamposTurmaModalAula(formulario, aula) {
    if (!estadoModalAulaTurma.turma) return aula;

    const campos = formulario.elements;
    await gravarDatasTurmaModalAula(aula.id, {
        data_aula: campos[CAMPO_DATA_TURMA_MODAL_AULA].value || null,
        data_assunto: campos[CAMPO_DATA_ASSUNTO_TURMA_MODAL_AULA].value || null,
    });
    const vaiBloquear = campos[CAMPO_BLOQUEIO_TURMA_MODAL_AULA].checked;
    const mudouBloqueio = vaiBloquear !== estadoModalAulaTurma.bloqueada;
    if (!bloqueioAulaNoModalTurma(estadoModalAulaTurma.turma) || !mudouBloqueio) return aula;

    const atualizada = await gravarBloqueioAula(aula, !vaiBloquear);
    estadoModalAulaTurma.bloqueada = vaiBloquear;
    document.dispatchEvent(new CustomEvent(EVENTO_AULA_BLOQUEIO_MODAL_TURMA));
    return atualizada;
}
