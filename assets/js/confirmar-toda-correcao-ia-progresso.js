// Professor: botão "✅ CONFIRMAR TODA CORREÇÃO DE IA" no painel do Progresso da turma das
// discursivas (progresso-turma-global.js). Faz, em CADA aluno MARCADO (chave ON/OFF ao lado do nome) e
// visível na lista (já com os filtros; "Selecionar todos" ao lado do botão marca todos),
// o mesmo que o "Confirmar Todas" do aluno: grava a nota da IA como nota do professor
// (correcao_discursiva.nota_professor, travada depois de gravada), reaproveitando as funções de
// confirmar-todas-professor.js (que precisa ser carregado antes deste arquivo).
// - Só entram alunos que já entregaram; quem tem questão sem nota da IA NÃO é gravado.
// - Aluno sem nada a confirmar é pulado; suspeitas de cópia pendentes (90% ou mais) ficam de fora.
// - Um único popup resume tudo antes de gravar; a gravação é aluno a aluno, e a falha de um não
//   derruba os outros.
// Pedido do usuário em 2026-10-24 (tarefa #365). Depende de js/supabase.js, assets/js/popup.js e
// assets/js/confirmar-todas-professor.js. Regra: docs/regras/atividades.md

const CLASSE_BOTAO_CONFIRMAR_TODA_IA = 'progresso-turma__confirmar-toda-correcao-ia';
const TEXTO_BOTAO_CONFIRMAR_TODA_IA = '✅ CONFIRMAR TODA CORREÇÃO DE IA';
const TEXTO_VERIFICANDO_CONFIRMAR_TODA_IA = '⏳ Verificando os alunos...';
const TITULO_CONFIRMAR_TODA_IA = 'Confirmar toda correção de IA';
const TEXTO_CONFIRMAR_POPUP_TODA_IA = 'Confirmar tudo';
const MSG_SEM_ALUNOS_TODA_IA = 'Marque ao menos um aluno.';
const MSG_NADA_TODA_IA = 'Nenhum aluno tem questão para confirmar agora.';
const MSG_TRAVA_TODA_IA = 'Depois de confirmada, a nota não pode mais ser alterada.';
const SITUACAO_GRAVAR_TODA_IA = 'gravar';
const SITUACAO_SEM_ENTREGA_TODA_IA = 'semEntrega';
const SITUACAO_SEM_NOTA_TODA_IA = 'semNota';
const SITUACAO_NADA_TODA_IA = 'nada';
const SITUACAO_FALHA_TODA_IA = 'falha';

/**
 * Avalia um aluno: se pode ser gravado ou por que fica de fora.
 * @param {number} atividadeId - Id da atividade.
 * @param {Object} aluno - Aluno do painel.
 * @returns {Promise<Object>} { situacao, aluno, separacao?, correcoes?, erro? }.
 */
async function avaliarAlunoConfirmarTodaIa(atividadeId, aluno) {
    if (!aluno.entregue) return { situacao: SITUACAO_SEM_ENTREGA_TODA_IA, aluno };
    try {
        const dados = await lerDadosConfirmarTodas(atividadeId, aluno);
        const separacao = separarQuestoesConfirmarTodas(dados);
        if (separacao.semNota.length) return { situacao: SITUACAO_SEM_NOTA_TODA_IA, aluno };
        if (!separacao.aConfirmar.length) return { situacao: SITUACAO_NADA_TODA_IA, aluno };
        return { situacao: SITUACAO_GRAVAR_TODA_IA, aluno, separacao, correcoes: dados.correcoes };
    } catch (erro) {
        return { situacao: SITUACAO_FALHA_TODA_IA, aluno, erro };
    }
}

/**
 * Avalia todos os alunos da lista, um a um (poupa o banco).
 * @param {number} atividadeId - Id da atividade.
 * @param {Object[]} alunos - Alunos exibidos no painel.
 * @returns {Promise<Object[]>} Avaliações, na ordem da lista.
 */
async function avaliarAlunosConfirmarTodaIa(atividadeId, alunos) {
    const avaliacoes = [];
    for (const aluno of alunos) {
        avaliacoes.push(await avaliarAlunoConfirmarTodaIa(atividadeId, aluno));
    }
    return avaliacoes;
}

/**
 * Conta as avaliações de uma situação.
 * @param {Object[]} avaliacoes - Avaliações dos alunos.
 * @param {string} situacao - Situação procurada.
 * @returns {number} Quantidade.
 */
function contarSituacaoConfirmarTodaIa(avaliacoes, situacao) {
    return avaliacoes.filter((avaliacao) => avaliacao.situacao === situacao).length;
}

/**
 * Monta o texto do popup de confirmação com o resumo do que será gravado e do que fica de fora.
 * @param {Object[]} aGravar - Avaliações com situação "gravar".
 * @param {Object[]} avaliacoes - Todas as avaliações (uma por aluno marcado).
 * @returns {string} Texto do popup.
 */
function montarResumoConfirmarTodaIa(aGravar, avaliacoes) {
    const marcados = avaliacoes.length;
    const questoes = aGravar.reduce((soma, item) => soma + item.separacao.aConfirmar.length, 0);
    const puladas = aGravar.reduce((soma, item) => soma + item.separacao.puladas, 0);
    const linhas = ['Confirmar a nota da IA como nota do professor em ' + questoes +
        ' questão(ões) de ' + aGravar.length + ' aluno(s) (' + marcados + ' marcado(s))?'];
    const fora = [
        [SITUACAO_SEM_ENTREGA_TODA_IA, 'aluno(s) não entregaram'],
        [SITUACAO_SEM_NOTA_TODA_IA, 'aluno(s) com questão sem nota da IA'],
        [SITUACAO_NADA_TODA_IA, 'aluno(s) sem nada a confirmar'],
        [SITUACAO_FALHA_TODA_IA, 'aluno(s) que não puderam ser lidos'],
    ];
    fora.forEach(([situacao, texto]) => {
        const quantidade = contarSituacaoConfirmarTodaIa(avaliacoes, situacao);
        if (quantidade) linhas.push('Ficam de fora: ' + quantidade + ' ' + texto + '.');
    });
    if (puladas) {
        linhas.push(puladas + ' questão(ões) com suspeita de cópia pendente ficam de fora.');
    }
    linhas.push(MSG_TRAVA_TODA_IA);
    return linhas.join('\n');
}

/**
 * Grava a confirmação de cada aluno em sequência; a falha de um não derruba os outros.
 * @param {number} atividadeId - Id da atividade.
 * @param {Object[]} aGravar - Avaliações com situação "gravar".
 * @returns {Promise<{confirmados: number, falhas: string[]}>} Resultado da gravação.
 */
async function gravarAlunosConfirmarTodaIa(atividadeId, aGravar) {
    const resultado = { confirmados: 0, falhas: [] };
    for (const item of aGravar) {
        try {
            await gravarConfirmarTodas({ atividadeId, aluno: item.aluno,
                aConfirmar: item.separacao.aConfirmar, correcoes: item.correcoes });
            resultado.confirmados += 1;
        } catch (erro) {
            resultado.falhas.push(item.aluno.nome + ': ' + erro.message);
        }
    }
    return resultado;
}

/**
 * Mostra o resultado final da gravação.
 * @param {{confirmados: number, falhas: string[]}} resultado - Resultado da gravação.
 * @returns {Promise<void>} Conclui quando o popup fechar.
 */
function mostrarResultadoConfirmarTodaIa(resultado) {
    const temFalha = resultado.falhas.length > 0;
    const texto = resultado.confirmados + ' aluno(s) confirmado(s).' + (temFalha
        ? '\n\n' + resultado.falhas.length + ' falha(s):\n' + resultado.falhas.join('\n') : '');
    return mostrarPopup(texto, { tipo: temFalha ? 'erro' : 'sucesso',
        titulo: TITULO_CONFIRMAR_TODA_IA });
}

/**
 * Avalia a lista, pergunta uma vez e grava; devolve true se gravou algo (para atualizar o painel).
 * @param {{atividadeId: number, lerAlunos: Function}} contexto - Dados do painel.
 * @returns {Promise<boolean>} true se houve gravação.
 */
async function processarConfirmarTodaIa(contexto) {
    const alunos = contexto.lerAlunos?.() || [];
    if (!alunos.length) {
        await mostrarPopup(MSG_SEM_ALUNOS_TODA_IA,
            { tipo: 'info', titulo: TITULO_CONFIRMAR_TODA_IA });
        return false;
    }
    const avaliacoes = await avaliarAlunosConfirmarTodaIa(contexto.atividadeId, alunos);
    const aGravar = avaliacoes.filter((item) => item.situacao === SITUACAO_GRAVAR_TODA_IA);
    if (!aGravar.length) {
        await mostrarPopup(MSG_NADA_TODA_IA + '\n\n' + montarResumoForaConfirmarTodaIa(avaliacoes),
            { tipo: 'info', titulo: TITULO_CONFIRMAR_TODA_IA });
        return false;
    }
    const confirmou = await confirmarPopup(montarResumoConfirmarTodaIa(aGravar, avaliacoes),
        { tipo: 'aviso', titulo: TITULO_CONFIRMAR_TODA_IA,
            textoConfirmar: TEXTO_CONFIRMAR_POPUP_TODA_IA });
    if (!confirmou) return false;

    const resultado = await gravarAlunosConfirmarTodaIa(contexto.atividadeId, aGravar);
    await mostrarResultadoConfirmarTodaIa(resultado);
    return resultado.confirmados > 0;
}

/**
 * Resume só o que ficou de fora (usado quando não há nenhum aluno a gravar).
 * @param {Object[]} avaliacoes - Todas as avaliações.
 * @returns {string} Texto com as contagens.
 */
function montarResumoForaConfirmarTodaIa(avaliacoes) {
    return [
        contarSituacaoConfirmarTodaIa(avaliacoes, SITUACAO_SEM_ENTREGA_TODA_IA) +
            ' aluno(s) não entregaram.',
        contarSituacaoConfirmarTodaIa(avaliacoes, SITUACAO_SEM_NOTA_TODA_IA) +
            ' aluno(s) com questão sem nota da IA.',
        contarSituacaoConfirmarTodaIa(avaliacoes, SITUACAO_NADA_TODA_IA) +
            ' aluno(s) sem nada a confirmar.',
    ].join('\n');
}

/**
 * Executa o fluxo completo com o botão desligado e trata erro inesperado.
 * @param {Object} contexto - Dados do painel.
 * @param {HTMLButtonElement} botao - Botão clicado.
 */
async function executarConfirmarTodaIa(contexto, botao) {
    botao.disabled = true;
    botao.textContent = TEXTO_VERIFICANDO_CONFIRMAR_TODA_IA;
    try {
        const gravou = await processarConfirmarTodaIa(contexto);
        if (gravou) await contexto.aoMudar?.();
    } catch (erro) {
        await mostrarPopup('Não foi possível confirmar: ' + erro.message,
            { tipo: 'erro', titulo: TITULO_CONFIRMAR_TODA_IA });
    } finally {
        botao.disabled = false;
        botao.definirQuantidade(Number(botao.dataset.quantidade || 0));
    }
}

/**
 * Cria o botão "✅ CONFIRMAR TODA CORREÇÃO DE IA" do painel.
 * @param {{atividadeId: number, lerAlunos: Function, aoMudar: Function}} contexto - Dados do
 *     painel (lerAlunos devolve a lista exibida, já com os filtros).
 * @returns {HTMLButtonElement|null} Botão, ou null se o "Confirmar Todas" do aluno não carregou.
 */
function criarBotaoConfirmarTodaCorrecaoIa(contexto) {
    if (typeof window.criarBotaoConfirmarTodas !== 'function') return null;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = CLASSE_BOTAO_CONFIRMAR_TODA_IA;
    botao.definirQuantidade = (quantidade) => {
        botao.dataset.quantidade = quantidade;
        if (botao.disabled) return;
        botao.textContent = TEXTO_BOTAO_CONFIRMAR_TODA_IA +
            (quantidade ? ' (' + quantidade + ')' : '');
    };
    botao.definirQuantidade(0);
    botao.addEventListener('click', () => executarConfirmarTodaIa(contexto, botao));
    return botao;
}

window.criarBotaoConfirmarTodaCorrecaoIa = criarBotaoConfirmarTodaCorrecaoIa;
