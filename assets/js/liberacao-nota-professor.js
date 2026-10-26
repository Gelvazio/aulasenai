// Professor, atividades DISCURSIVAS (todas as matérias): botão "📊 Liberar notas (turma X)" ao lado do
// "🔓 Liberar gabaritos". Libera para a turma escolhida SÓ a nota e o resultado por tópico
// (✅/🟡/❌ + explicação), SEM o padrão de resposta; o gabarito continua separado. Não encerra o
// preenchimento da turma. Funções do banco: liberar_nota_turma, coluna atividade.nota_liberada
// (database/2026-10-26-liberar-nota-turma.sql). A turma vem do evento "relatorio-professor:turma".
// Depende de popup.js e js/supabase.js (sbGet, sbH). Regra: docs/regras/atividades.md (#393).

const ROTA_LIBERAR_NOTA = '/rest/v1/rpc/liberar_nota_turma';
const CLASSE_LIBERAR_NOTA = 'liberar-gabarito';
const EVENTO_TURMA_LIBERAR_NOTA = 'relatorio-professor:turma';
const AVISO_NOTA_LIBERADA = 'Nota liberada: o aluno vê a nota e o resultado por tópico, sem o ' +
    'padrão de resposta.';
const AVISO_NOTA_RECOLHIDA = 'Nota não liberada para esta turma.';
const estadoLiberarNota = { botao: null, aviso: null, atividadeId: null, turma: '',
    liberada: false };

/**
 * Chama uma função (RPC) do banco com o JWT do professor.
 * @param {string} rota - Rota da função.
 * @param {Object} corpo - Parâmetros.
 * @returns {Promise<*>} Resposta da função.
 * @throws {Error} Se o banco recusar.
 */
async function chamarFuncaoNota(rota, corpo) {
    const resposta = await fetch(SUPABASE.URL + rota, {
        method: 'POST', headers: await sbH(), body: JSON.stringify(corpo),
    });
    const dados = await resposta.json().catch(() => null);
    if (!resposta.ok) throw new Error(dados?.message || 'erro ' + resposta.status);
    return dados;
}

/**
 * Atualiza o texto e o aviso do botão conforme a turma escolhida.
 */
async function atualizarBotaoLiberarNota() {
    const { botao, aviso, turma, atividadeId } = estadoLiberarNota;
    if (!botao) return;

    botao.hidden = !turma;
    if (!turma) return;
    try {
        const linhas = await sbGet('atividade', 'select=nota_liberada&id=eq.' + atividadeId);
        estadoLiberarNota.liberada = (linhas[0]?.nota_liberada || []).includes(turma);
        botao.textContent = (estadoLiberarNota.liberada ? '🔒 Recolher notas' : '📊 Liberar notas') +
            ' (turma ' + turma + ')';
        botao.disabled = false;
        aviso.textContent = estadoLiberarNota.liberada ? AVISO_NOTA_LIBERADA : AVISO_NOTA_RECOLHIDA;
    } catch (erro) {
        botao.disabled = true;
        aviso.textContent = 'Não foi possível conferir a nota: ' + erro.message;
    }
}

/**
 * Libera ou recolhe a nota da turma escolhida, com confirmação pelo popup.
 */
async function alternarLiberacaoNota() {
    const { atividadeId, turma, liberada } = estadoLiberarNota;
    const pergunta = liberada
        ? 'Recolher a nota da turma ' + turma + '? Os alunos deixam de ver a nota e o resultado.'
        : 'Liberar a nota para a turma ' + turma + '? Os alunos verão a nota e o resultado de ' +
            'cada tópico, mas NÃO o padrão de resposta.';
    if (!(await confirmarPopup(pergunta, { tipo: 'pergunta', titulo: 'Notas' }))) return;

    try {
        await chamarFuncaoNota(ROTA_LIBERAR_NOTA,
            { p_atividade: atividadeId, p_turma: turma, p_liberar: !liberada });
        await mostrarPopup(liberada ? 'Nota recolhida.' : 'Nota liberada para a turma ' + turma +
            '.', { tipo: 'sucesso' });
    } catch (erro) {
        await mostrarPopup('Não foi possível alterar a nota: ' + erro.message, { tipo: 'erro' });
    }
    await atualizarBotaoLiberarNota();
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoNota(tag, classe) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    return elemento;
}

/**
 * Coloca o botão "Liberar notas" e o aviso no bloco do professor.
 * @param {HTMLElement} bloco - Onde o botão entra (junto do "Liberar gabaritos").
 * @param {{atividadeId: number, turma: string}} contexto - Atividade e turma escolhida.
 */
function montarLiberarNotaProfessor(bloco, contexto) {
    const area = criarElementoNota('div', CLASSE_LIBERAR_NOTA);
    const botao = criarElementoNota('button', 'btn-export ' + CLASSE_LIBERAR_NOTA + '__botao');
    botao.type = 'button';
    botao.addEventListener('click', alternarLiberacaoNota);
    Object.assign(estadoLiberarNota, { botao, atividadeId: contexto.atividadeId,
        turma: contexto.turma || '', aviso: criarElementoNota('span',
            CLASSE_LIBERAR_NOTA + '__aviso') });
    area.append(botao, estadoLiberarNota.aviso);
    bloco.appendChild(area);
    atualizarBotaoLiberarNota();
}

document.addEventListener(EVENTO_TURMA_LIBERAR_NOTA, (evento) => {
    estadoLiberarNota.turma = evento.detail.turma || '';
    atualizarBotaoLiberarNota();
});

window.montarLiberarNotaProfessor = montarLiberarNotaProfessor;
