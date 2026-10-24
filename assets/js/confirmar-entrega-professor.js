// Professor: botão "📨 Confirmar Entrega" ao lado do nome do aluno no Progresso da turma
// (progresso-turma-global.js), em todas as atividades (objetivas, práticas e discursivas).
// Entrega a atividade do aluno COMO ESTÁ, mesmo incompleta: questões em branco ficam em branco e
// o mínimo de questões e o horário não são exigidos. Usa a função do banco que já existe
// (professor_marcar_entregue, database/2026-10-14-professor-marca-entregue.sql): ela confere
// professor, turma vinculada e tentativa ainda não entregue. O professor nunca escreve respostas
// pelo aluno. Só aparece para quem ainda não entregou; nas páginas com <body data-marcar-entregue=
// "sim" o "Marcar como entregue" de marcar-entregue-professor.js já faz isso e este não aparece.
// Pedido do usuário em 2026-10-24 (tarefa CONFIRMAR-ENTREGA-BOTAO). Depende de js/supabase.js e
// assets/js/popup.js. Regra: docs/regras/atividades.md

const FUNCAO_CONFIRMAR_ENTREGA = 'professor_marcar_entregue';
const TEXTO_BOTAO_CONFIRMAR_ENTREGA = '📨 Confirmar Entrega';
const TITULO_CONFIRMAR_ENTREGA = 'Confirmar Entrega';
const CLASSE_BOTAO_CONFIRMAR_ENTREGA = 'progresso-turma__confirmar-entrega';
const VALOR_LIGADO_ENTREGA_CONFIRMAR = 'sim';

/**
 * Diz se a página já tem o "Marcar como entregue" (data-marcar-entregue="sim"), que faz o mesmo.
 * @returns {boolean} true se o botão novo deve ficar de fora.
 */
function paginaJaTemMarcarEntregue() {
    return document.body.dataset.marcarEntregue === VALOR_LIGADO_ENTREGA_CONFIRMAR;
}

/**
 * Entrega a atividade do aluno no banco (JWT do professor logado).
 * @param {number} atividadeId - Id da atividade.
 * @param {string} alunoId - Id do aluno.
 * @throws {Error} Se o banco recusar (a mensagem do banco explica o motivo).
 */
async function entregarAtividadeDoAluno(atividadeId, alunoId) {
    const { error } = await obterClienteSupabase().rpc(FUNCAO_CONFIRMAR_ENTREGA,
        { p_aluno: alunoId, p_atividade: atividadeId });
    if (error) throw new Error(error.message);
}

/**
 * Pergunta ao professor, entrega a atividade do aluno e atualiza o painel.
 * @param {{atividadeId: number, aluno: Object, aoMudar: Function}} contexto - Dados do painel.
 * @param {HTMLButtonElement} botao - Botão clicado (fica desligado durante a gravação).
 */
async function confirmarEntregaDoAluno(contexto, botao) {
    const { atividadeId, aluno } = contexto;
    const confirmou = await confirmarPopup('Entregar a atividade de ' + aluno.nome + ' como ' +
        'está?\n\nO que não foi respondido fica em branco e o aluno não poderá mais responder ' +
        'esta tentativa.',
        { tipo: 'aviso', titulo: TITULO_CONFIRMAR_ENTREGA, textoConfirmar: 'Confirmar Entrega' });
    if (!confirmou) return;

    botao.disabled = true;
    try {
        await entregarAtividadeDoAluno(atividadeId, aluno.alunoId);
        await mostrarPopup('Atividade de ' + aluno.nome + ' entregue.',
            { tipo: 'sucesso', titulo: TITULO_CONFIRMAR_ENTREGA });
        await contexto.aoMudar?.();
    } catch (erro) {
        await mostrarPopup('Não foi possível entregar: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_CONFIRMAR_ENTREGA });
    } finally {
        botao.disabled = false;
    }
}

/**
 * Cria o botão "📨 Confirmar Entrega" do aluno.
 * @param {{atividadeId: number, aluno: Object, aoMudar: Function}} contexto - Dados do painel.
 * @returns {HTMLButtonElement|null} Botão, ou null se o aluno já entregou ou a página já tem o
 *     "Marcar como entregue".
 */
function criarBotaoConfirmarEntrega(contexto) {
    const semBotao = contexto.aluno.entregue || paginaJaTemMarcarEntregue();
    if (semBotao) return null;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = CLASSE_BOTAO_CONFIRMAR_ENTREGA;
    botao.textContent = TEXTO_BOTAO_CONFIRMAR_ENTREGA;
    botao.addEventListener('click', () => confirmarEntregaDoAluno(contexto, botao));
    return botao;
}

window.criarBotaoConfirmarEntrega = criarBotaoConfirmarEntrega;
