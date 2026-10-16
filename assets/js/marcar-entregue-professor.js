// Professor: botões "📨 Marcar como entregue" e "↩️ Desfazer entrega" da atividade de um
// aluno (objetivas e práticas). Só liga nas páginas com <body data-marcar-entregue="sim">.
// Marcar grava a entrega da tentativa atual do aluno sem exigir o mínimo de questões (em branco
// conta como errada; quem nunca abriu fica com 0). Desfazer vale só para a entrega feita pelo
// professor, sem tentativa nova liberada e sem nota lançada. As regras ficam no banco
// (professor_marcar_entregue / professor_desmarcar_entregue, database/2026-10-14-professor-
// marca-entregue.sql). Usado por respostas-atividade-professor.js ("Respostas dos alunos") e
// progresso-turma-global.js ("Progresso da turma"). Depende de js/supabase.js e assets/js/popup.js.
// Regra: docs/regras/atividades.md

const CLASSE_ENTREGA_PROFESSOR = 'entrega-professor';
const FUNCAO_MARCAR_ENTREGUE = 'professor_marcar_entregue';
const FUNCAO_DESMARCAR_ENTREGUE = 'professor_desmarcar_entregue';
const VALOR_LIGADO_ENTREGA = 'sim';
const TEXTO_MARCAR_ENTREGUE = '📨 Marcar como entregue';
const TEXTO_DESFAZER_ENTREGA = '↩️ Desfazer entrega';
const TEXTO_ENTREGUE_PELO_PROFESSOR = '📨 Entregue pelo professor';
const TITULO_POPUP_ENTREGA = 'Entrega pelo professor';
const ARQUIVO_CSS_ENTREGA = '../css/marcar-entregue-professor.css';
const BASE_SCRIPTS_ENTREGA = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Diz se a página liga os botões de entrega do professor.
 * @returns {boolean} true se o <body> tiver data-marcar-entregue="sim".
 */
function entregaProfessorLigada() {
    return document.body.dataset.marcarEntregue === VALOR_LIGADO_ENTREGA;
}

/**
 * Chama uma função do banco com o aluno e a atividade (JWT do professor logado).
 * @param {string} funcao - Nome da função do banco.
 * @param {{alunoId: string, atividadeId: number}} alvo - Aluno e atividade.
 * @returns {Promise<*>} Resposta da função.
 * @throws {Error} Se o banco recusar (a mensagem do banco explica o motivo).
 */
async function chamarFuncaoEntrega(funcao, alvo) {
    const { data, error } = await obterClienteSupabase().rpc(funcao,
        { p_aluno: alvo.alunoId, p_atividade: alvo.atividadeId });
    if (error) throw new Error(error.message);
    return data;
}

/**
 * Pergunta, grava no banco e avisa o resultado de uma ação de entrega.
 * @param {Object} acao - {pergunta, confirmar, funcao, sucesso} da ação.
 * @param {Object} dados - {alunoId, atividadeId, nome, aoMudar}.
 * @param {HTMLButtonElement} botao - Botão clicado (fica desligado durante a gravação).
 */
async function executarAcaoEntrega(acao, dados, botao) {
    const confirmou = await confirmarPopup(acao.pergunta,
        { tipo: 'aviso', titulo: TITULO_POPUP_ENTREGA, textoConfirmar: acao.confirmar });
    if (!confirmou) return;

    botao.disabled = true;
    try {
        await chamarFuncaoEntrega(acao.funcao, dados);
        await mostrarPopup(acao.sucesso, { tipo: 'sucesso', titulo: TITULO_POPUP_ENTREGA });
        if (dados.aoMudar) await dados.aoMudar();
    } catch (erro) {
        await mostrarPopup('Não foi possível concluir: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_POPUP_ENTREGA });
    } finally {
        botao.disabled = false;
    }
}

/**
 * Monta as ações de marcar e de desfazer para o aluno.
 * @param {string} nome - Nome do aluno.
 * @returns {{marcar: Object, desfazer: Object}} Textos e função do banco de cada ação.
 */
function montarAcoesEntrega(nome) {
    const aluno = nome || 'este aluno';
    return {
        marcar: {
            funcao: FUNCAO_MARCAR_ENTREGUE, confirmar: 'Marcar como entregue',
            pergunta: 'Marcar como entregue a atividade de ' + aluno + '?\n\nAs questões em ' +
                'branco contam como erradas (sem nenhuma resposta, a nota é 0) e o aluno não ' +
                'poderá mais responder esta tentativa.',
            sucesso: 'Atividade de ' + aluno + ' marcada como entregue.',
        },
        desfazer: {
            funcao: FUNCAO_DESMARCAR_ENTREGUE, confirmar: 'Desfazer entrega',
            pergunta: 'Desfazer a entrega da atividade de ' + aluno + '?\n\nO aluno volta a ' +
                'poder responder e entregar esta tentativa.',
            sucesso: 'Entrega de ' + aluno + ' desfeita.',
        },
    };
}

/**
 * Cria um botão de ação de entrega.
 * @param {string} texto - Texto do botão.
 * @param {Object} acao - Ação (montarAcoesEntrega).
 * @param {Object} dados - {alunoId, atividadeId, nome, aoMudar}.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoEntrega(texto, acao, dados) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-export ' + CLASSE_ENTREGA_PROFESSOR + '__botao';
    botao.textContent = texto;
    botao.addEventListener('click', () => executarAcaoEntrega(acao, dados, botao));
    return botao;
}

/**
 * Cria o controle de entrega do aluno: "Marcar como entregue" (não entregue), "Entregue pelo
 * professor" + "Desfazer entrega" (entregue pelo professor) ou nada (entregue pelo aluno).
 * @param {{alunoId: string, atividadeId: number, nome: string, entregue: boolean,
 *     entreguePorProfessor: boolean, aoMudar: Function}} dados - Aluno, situação e o que fazer
 *     depois de mudar.
 * @returns {HTMLElement|null} Controle, ou null se a página não ligar o recurso.
 */
function criarControleEntregaProfessor(dados) {
    const semControle = !entregaProfessorLigada() || !dados.alunoId || !dados.atividadeId;
    if (semControle) return null;
    if (dados.entregue && !dados.entreguePorProfessor) return null;

    const acoes = montarAcoesEntrega(dados.nome);
    const controle = document.createElement('span');
    controle.className = CLASSE_ENTREGA_PROFESSOR;
    if (!dados.entregue) {
        controle.appendChild(criarBotaoEntrega(TEXTO_MARCAR_ENTREGUE, acoes.marcar, dados));
        return controle;
    }
    const aviso = document.createElement('span');
    aviso.className = CLASSE_ENTREGA_PROFESSOR + '__aviso';
    aviso.textContent = TEXTO_ENTREGUE_PELO_PROFESSOR;
    controle.append(aviso, criarBotaoEntrega(TEXTO_DESFAZER_ENTREGA, acoes.desfazer, dados));
    return controle;
}

/**
 * Acrescenta a uma célula o controle de entrega do aluno de uma linha do resumo
 * (resumo_tentativas_atividade: aluno_id, nome, entregue_em, entregue_por).
 * @param {HTMLElement} celula - Onde o controle entra.
 * @param {{linha: Object, atividadeId: number, aoMudar: Function}} dados - Linha do aluno,
 *     atividade e o que fazer depois de mudar.
 */
function acrescentarControleEntrega(celula, dados) {
    const { linha } = dados;
    const controle = criarControleEntregaProfessor({ alunoId: linha.aluno_id,
        atividadeId: dados.atividadeId, nome: linha.nome, entregue: Boolean(linha.entregue_em),
        entreguePorProfessor: Boolean(linha.entregue_por), aoMudar: dados.aoMudar });
    if (controle) celula.appendChild(controle);
}

(function incluirEstiloEntregaProfessor() {
    if (!BASE_SCRIPTS_ENTREGA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_ENTREGA + ARQUIVO_CSS_ENTREGA;
    document.head.appendChild(link);
})();

window.entregaProfessorLigada = entregaProfessorLigada;
window.criarControleEntregaProfessor = criarControleEntregaProfessor;
window.acrescentarControleEntrega = acrescentarControleEntrega;
window.TEXTO_ENTREGUE_PELO_PROFESSOR = TEXTO_ENTREGUE_PELO_PROFESSOR;
