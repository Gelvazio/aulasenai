// Professor: modal "Justificativa de mudança da nota na Pergunta". Aparece quando o professor
// escolhe outra opção (Certa / Meia certa / Errada) numa alternativa que já tinha nota confirmada;
// o texto (a justificativa apresentada pelo aluno) é obrigatório e é gravado com a nova nota
// (coluna justificativa_mudanca; o trigger do banco a copia para o histórico). Nada é gravado aqui.
// Depende de assets/js/modal-nota-discursiva.js. Regra: docs/regras/atividades.md

const TITULO_MODAL_JUSTIFICATIVA = 'Justificativa de mudança da nota na Pergunta';
const MINIMO_CARACTERES_JUSTIFICATIVA = 5;
const MSG_JUSTIFICATIVA_CURTA = 'Escreva a justificativa (pelo menos ' +
    MINIMO_CARACTERES_JUSTIFICATIVA + ' letras).';

/**
 * Monta o conteúdo do modal: resumo da mudança, aviso e caixa de texto.
 * @param {HTMLElement} corpo - Área de conteúdo do modal.
 * @param {{de: string, para: string}} mudanca - Opção atual e opção nova.
 * @returns {HTMLTextAreaElement} Caixa onde o professor escreve a justificativa.
 */
function montarCorpoJustificativa(corpo, mudanca) {
    const resumo = window.criarElementoModalNota('p', 'modal-nota__resumo');
    resumo.append('Mudar de ', window.criarElementoModalNota('strong', '', mudanca.de),
        ' para ', window.criarElementoModalNota('strong', '', mudanca.para), '.');
    const aviso = window.criarElementoModalNota('p', 'modal-nota__aviso', 'Escreva o motivo da ' +
        'mudança (a justificativa apresentada pelo aluno). Ela fica gravada na pergunta e no ' +
        'histórico, visível ao aluno e ao professor.');
    const caixa = document.createElement('textarea');
    caixa.className = 'modal-nota__texto';
    caixa.rows = 5;
    caixa.placeholder = 'Justificativa de mudança da nota...';
    corpo.append(resumo, aviso, caixa);
    return caixa;
}

/**
 * Pede ao professor a justificativa da mudança de nota.
 * @param {{de: string, para: string}} mudanca - Opção atual e opção nova (rótulos para o texto).
 * @returns {Promise<string|null>} A justificativa digitada, ou null se o professor desistiu.
 */
function pedirJustificativaMudanca(mudanca) {
    return new Promise((resolver) => {
        let resposta = null;
        const modal = window.abrirModalNota({ titulo: TITULO_MODAL_JUSTIFICATIVA,
            aoFechar: () => resolver(resposta) });
        const caixa = montarCorpoJustificativa(modal.corpo, mudanca);
        const erro = window.criarElementoModalNota('span', 'modal-nota__erro');
        const cancelar = window.criarElementoModalNota('button', 'modal-nota__botao', 'Cancelar');
        const gravar = window.criarElementoModalNota('button',
            'modal-nota__botao modal-nota__botao--principal', 'Gravar mudança');
        cancelar.type = gravar.type = 'button';
        cancelar.addEventListener('click', modal.fechar);
        gravar.addEventListener('click', () => {
            const texto = caixa.value.trim();
            if (texto.length < MINIMO_CARACTERES_JUSTIFICATIVA) {
                erro.textContent = MSG_JUSTIFICATIVA_CURTA;
                return;
            }
            resposta = texto;
            modal.fechar();
        });
        modal.rodape.append(erro, cancelar, gravar);
        caixa.focus();
    });
}

window.pedirJustificativaMudanca = pedirJustificativaMudanca;
