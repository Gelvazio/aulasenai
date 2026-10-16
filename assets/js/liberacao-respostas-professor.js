// Botão "🔓 Liberar gabaritos (turma X)" no quadro "Respostas dos alunos nesta atividade" (só
// PROFESSOR, só nas páginas com o botão "Exportar Gabarito"). Libera o gabarito real para a turma
// da aba escolhida, mesmo com alunos sem entrega (avisados no aviso e na confirmação); depois de
// liberado, o botão vira "🔒 Recolher gabarito (turma X)". Depois da liberação o banco encerra o
// preenchimento da turma: recusa resposta, nova tentativa e recuperação (recolher reabre).
// Funções do banco: liberar_gabarito_turma e alunos_sem_entrega_turma
// (database/2026-10-06-liberacao-respostas-turma.sql e
// database/2026-10-15-liberar-gabarito-encerra-preenchimento.sql).
// Também usado nas discursivas (liberacao-respostas-discursiva.js), com a turma escolhida numa lista.
// Plano: docs/liberacao-respostas-por-turma.md. Depende de popup.js e js/supabase.js (sbGet, sbH).

const ROTA_LIBERAR_GABARITO = '/rest/v1/rpc/liberar_gabarito_turma';
const ROTA_SEM_ENTREGA_GABARITO = '/rest/v1/rpc/alunos_sem_entrega_turma';
const CLASSE_LIBERAR_GABARITO = 'liberar-gabarito';
const EVENTO_TURMA_LIBERAR_GABARITO = 'relatorio-professor:turma';
const estadoLiberarGabarito = { botao: null, aviso: null, atividadeId: null, turma: '',
    liberado: false, faltam: 0 };

/**
 * Chama uma função (RPC) do banco com o JWT do professor.
 * @param {string} rota - Rota da função.
 * @param {Object} corpo - Parâmetros da função.
 * @returns {Promise<*>} Resposta da função.
 * @throws {Error} Se o banco recusar.
 */
async function chamarFuncaoGabarito(rota, corpo) {
    const resposta = await fetch(SUPABASE.URL + rota, {
        method: 'POST',
        headers: await sbH(),
        body: JSON.stringify(corpo),
    });
    const dados = await resposta.json().catch(() => null);
    if (!resposta.ok) throw new Error(dados?.message || 'erro ' + resposta.status);
    return dados;
}

/**
 * Lê no banco as turmas com o gabarito liberado e quantos alunos da turma faltam entregar.
 * @returns {Promise<{liberado: boolean, faltam: number}>} Situação da turma escolhida.
 */
async function lerSituacaoGabaritoTurma() {
    const { atividadeId, turma } = estadoLiberarGabarito;
    const [linhas, faltam] = await Promise.all([
        sbGet('atividade', 'select=gabarito_liberado&id=eq.' + atividadeId),
        chamarFuncaoGabarito(ROTA_SEM_ENTREGA_GABARITO, { p_atividade: atividadeId, p_turma: turma }),
    ]);
    const liberadas = linhas[0]?.gabarito_liberado || [];
    return { liberado: liberadas.includes(turma), faltam: Number(faltam) || 0 };
}

/**
 * Atualiza o texto, o estado e o aviso do botão conforme a turma escolhida.
 */
async function atualizarBotaoLiberarGabarito() {
    const { botao, aviso, turma } = estadoLiberarGabarito;
    if (!botao) return;

    botao.hidden = !turma;
    if (!turma) return;
    try {
        const { liberado, faltam } = await lerSituacaoGabaritoTurma();
        estadoLiberarGabarito.liberado = liberado;
        estadoLiberarGabarito.faltam = faltam;
        botao.textContent = (liberado ? '🔒 Recolher gabarito' : '🔓 Liberar gabaritos') +
            ' (turma ' + turma + ')';
        botao.disabled = false;
        aviso.textContent = descreverSituacaoGabarito(liberado, faltam);
    } catch (erro) {
        botao.disabled = true;
        aviso.textContent = 'Não foi possível conferir o gabarito: ' + erro.message;
    }
}

/**
 * Texto do aviso ao lado do botão.
 * @param {boolean} liberado - true se o gabarito já foi liberado para a turma.
 * @param {number} faltam - Alunos da turma sem entrega.
 * @returns {string} Aviso.
 */
function descreverSituacaoGabarito(liberado, faltam) {
    if (liberado) return 'Gabarito liberado: preenchimento encerrado nesta turma.';
    if (faltam > 0) {
        return 'Faltam ' + faltam + ' aluno(s) entregar: ao liberar o gabarito, eles não poderão ' +
            'mais responder.';
    }
    return 'Todos os alunos entregaram: o gabarito pode ser liberado.';
}

/**
 * Pergunta de confirmação para liberar ou recolher o gabarito da turma.
 * @param {{turma: string, liberado: boolean, faltam: number}} situacao - Turma e situação atual.
 * @returns {string} Pergunta do popup.
 */
function montarPerguntaGabarito({ turma, liberado, faltam }) {
    if (liberado) {
        return 'Recolher o gabarito da turma ' + turma + '? Os alunos deixam de vê-lo e o ' +
            'preenchimento é reaberto.';
    }
    const avisoFaltam = faltam > 0
        ? ' Faltam ' + faltam + ' aluno(s) entregar: eles não poderão mais responder.'
        : '';
    return 'Liberar o gabarito para a turma ' + turma + '? Os alunos verão as respostas certas ' +
        'e o preenchimento desta atividade será encerrado (sem nova tentativa nem recuperação).' +
        avisoFaltam;
}

/**
 * Libera ou recolhe o gabarito da turma escolhida, com confirmação pelo popup.
 */
async function alternarLiberacaoGabarito() {
    const { atividadeId, turma, liberado } = estadoLiberarGabarito;
    const pergunta = montarPerguntaGabarito(estadoLiberarGabarito);
    if (!(await confirmarPopup(pergunta, { tipo: 'pergunta', titulo: 'Gabarito' }))) return;

    try {
        await chamarFuncaoGabarito(ROTA_LIBERAR_GABARITO,
            { p_atividade: atividadeId, p_turma: turma, p_liberar: !liberado });
        await mostrarPopup(liberado ? 'Gabarito recolhido.' : 'Gabarito liberado para a turma ' +
            turma + '.', { tipo: 'sucesso' });
    } catch (erro) {
        await mostrarPopup('Não foi possível alterar o gabarito: ' + erro.message,
            { tipo: 'erro' });
    }
    await atualizarBotaoLiberarGabarito();
}

/**
 * Cria um elemento com classe e texto (sem depender de outros scripts da página).
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoLiberacao(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Coloca o botão e o aviso no relatório do professor.
 * @param {HTMLElement} bloco - Onde o botão entra (relatório do professor ou painel).
 * @param {{atividadeId: number, turma: string}} contexto - Atividade e turma escolhida.
 */
function montarLiberarGabaritoProfessor(bloco, contexto) {
    const area = criarElementoLiberacao('div', CLASSE_LIBERAR_GABARITO);
    const botao = criarElementoLiberacao('button', 'btn-export ' + CLASSE_LIBERAR_GABARITO +
        '__botao');
    botao.type = 'button';
    botao.addEventListener('click', alternarLiberacaoGabarito);
    estadoLiberarGabarito.botao = botao;
    estadoLiberarGabarito.aviso = criarElementoLiberacao('span',
        CLASSE_LIBERAR_GABARITO + '__aviso');
    estadoLiberarGabarito.atividadeId = contexto.atividadeId;
    estadoLiberarGabarito.turma = contexto.turma || '';
    area.append(estadoLiberarGabarito.botao, estadoLiberarGabarito.aviso);
    bloco.appendChild(area);
    atualizarBotaoLiberarGabarito();
}

document.addEventListener(EVENTO_TURMA_LIBERAR_GABARITO, (evento) => {
    estadoLiberarGabarito.turma = evento.detail.turma || '';
    atualizarBotaoLiberarGabarito();
});

(function incluirEstiloLiberarGabarito() {
    const script = document.currentScript;
    if (!script) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('../css/liberacao-respostas-professor.css', script.src).href;
    document.head.appendChild(link);
})();
