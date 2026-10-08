// Professor: depois de escolher um aluno em "Respostas dos alunos", mostra embaixo da prova o
// botão "✅ Finalizar Atividade". Ao clicar, confere se o aluno entregou e se todas as alternativas
// respondidas têm a nota do professor (botões Certa / Meia certa / Errada) e lança a nota:
// soma das notas confirmadas ÷ pontos da prova × 10 × (total de questões ÷ mínimo do aluno),
// no máximo 10 — a mesma conta da função notas_media_final, que leva a nota à média final.
// As notas confirmadas já são definitivas (trigger correcao_discursiva_validar).
// Carregado por assets/js/avaliacao-discursiva.js. Depende de js/supabase.js e assets/js/popup.js.
// Regra: docs/regras/atividades.md

const CLASSE_FINALIZAR = 'finalizar-atividade';
const SELETOR_DESTINO_FINALIZAR = '.content-section';
const SELETOR_ENTREGA_FINALIZAR = '.entrega-discursiva';
const ROTA_MINIMO_FINALIZAR = '/rest/v1/rpc/minimo_questoes_para_entregar';
const NOTA_MAXIMA_FINALIZAR = 10;
const TOLERANCIA_FINALIZAR = 0.001;
const BASE_SCRIPTS_FINALIZAR = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Remove o botão "Finalizar Atividade" mostrado antes.
 */
function limparFinalizarAtividade() {
    document.querySelectorAll('.' + CLASSE_FINALIZAR).forEach((bloco) => bloco.remove());
}

/**
 * Lê o mínimo de questões do aluno (função do banco).
 * @param {number} atividadeId - Id da atividade.
 * @param {string} alunoId - Id do aluno.
 * @returns {Promise<number>} Mínimo de questões.
 * @throws {Error} Se o banco recusar.
 */
async function lerMinimoParaFinalizar(atividadeId, alunoId) {
    const resposta = await fetch(SUPABASE.URL + ROTA_MINIMO_FINALIZAR, {
        method: 'POST', headers: await sbH(),
        body: JSON.stringify({ p_atividade: atividadeId, p_aluno: alunoId }),
    });
    if (!resposta.ok) throw new Error(await resposta.text());
    return Number(await resposta.json());
}

/**
 * Lê do banco tudo o que a nota do aluno precisa.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object>} topicos, respostas, correcoes, entregue e minimo.
 */
async function lerDadosParaFinalizar(aluno, atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const doAluno = filtro + '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa;
    const [topicos, respostas, correcoes, entregas, minimo] = await Promise.all([
        sbGet('topico_discursivo', 'select=item,topico,pontos&' + filtro),
        sbGet('resposta_discursiva', 'select=item,topico,texto&' + doAluno),
        sbGet('correcao_discursiva', 'select=item,topico,nota_professor&' + doAluno),
        sbGet('entrega_atividade', 'select=entregue_em&' + doAluno),
        lerMinimoParaFinalizar(atividadeId, aluno.alunoId),
    ]);
    return { topicos, respostas, correcoes, entregue: entregas.length > 0, minimo };
}

/**
 * Calcula a nota do aluno a partir das notas confirmadas pelo professor.
 * @param {Object} dados - Resultado de lerDadosParaFinalizar.
 * @returns {Object} nota, pendentes, certas, meias, erradas, emBranco, minimo, totalQuestoes.
 */
function calcularNotaDoAluno(dados) {
    const chave = (linha) => linha.item + '|' + linha.topico;
    const respondidas = new Set(dados.respostas.filter((linha) => (linha.texto || '').trim())
        .map(chave));
    const notas = new Map(dados.correcoes.map((linha) => [chave(linha), linha.nota_professor]));
    const pontos = new Map(dados.topicos.map((linha) => [chave(linha), Number(linha.pontos)]));
    const contagem = { certas: 0, meias: 0, erradas: 0, pendentes: 0, soma: 0 };
    respondidas.forEach((topico) => {
        const nota = notas.get(topico);
        if (nota === null || nota === undefined) {
            contagem.pendentes += 1;
            return;
        }
        contagem.soma += Number(nota);
        if (Number(nota) >= (pontos.get(topico) || 0) - TOLERANCIA_FINALIZAR) contagem.certas += 1;
        else if (Number(nota) > 0) contagem.meias += 1;
        else contagem.erradas += 1;
    });
    const totalPontos = [...pontos.values()].reduce((soma, valor) => soma + valor, 0);
    const totalQuestoes = new Set(dados.topicos.map((linha) => linha.item)).size;
    const nota = Math.min(NOTA_MAXIMA_FINALIZAR,
        contagem.soma / totalPontos * NOTA_MAXIMA_FINALIZAR * totalQuestoes / dados.minimo);
    return { ...contagem, nota, totalQuestoes, minimo: dados.minimo,
        emBranco: dados.topicos.length - respondidas.size, respondidas: respondidas.size };
}

/**
 * Formata a nota com duas casas.
 * @param {number} nota - Nota.
 * @returns {string} Nota formatada.
 */
function formatarNotaFinalizar(nota) {
    return nota.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Explica por que ainda não dá para finalizar (ou '' quando pode).
 * @param {Object} dados - Dados lidos do banco.
 * @param {Object} resultado - Resultado de calcularNotaDoAluno.
 * @returns {string} Motivo do bloqueio ou ''.
 */
function motivoParaNaoFinalizar(dados, resultado) {
    if (!dados.entregue) return 'O aluno ainda não entregou a avaliação.';
    if (!resultado.respondidas) return 'O aluno não respondeu nenhuma alternativa.';
    if (!resultado.pendentes) return '';
    return 'Ainda faltam ' + resultado.pendentes + ' alternativa(s) respondida(s) sem a sua ' +
        'confirmação (✅ Certa / 🟡 Meia certa / ❌ Errada).';
}

/**
 * Mostra o resultado da finalização (nota lançada e contagem).
 * @param {Object} resultado - Resultado de calcularNotaDoAluno.
 * @param {HTMLElement} situacao - Texto embaixo do botão.
 */
async function mostrarNotaLancada(resultado, situacao) {
    const texto = '🎓 Nota lançada: ' + formatarNotaFinalizar(resultado.nota) + ' (sobre o ' +
        'mínimo de ' + resultado.minimo + ' de ' + resultado.totalQuestoes + ' questões, ' +
        'máximo 10). Alternativas: ' + resultado.certas + ' certa(s), ' + resultado.meias +
        ' meia(s) certa(s), ' + resultado.erradas + ' errada(s); ' + resultado.emBranco +
        ' em branco (não contam).';
    situacao.textContent = texto;
    await mostrarPopup(texto + '\n\nA nota já vale na média final do aluno.',
        { tipo: 'sucesso', titulo: 'Atividade finalizada' });
}

/**
 * Trata o clique em "Finalizar Atividade".
 * @param {{aluno: Object, atividadeId: number, botao: HTMLElement, situacao: HTMLElement}} tela
 *     Aluno, atividade e elementos do bloco.
 */
async function finalizarAtividadeDoAluno(tela) {
    tela.botao.disabled = true;
    try {
        const dados = await lerDadosParaFinalizar(tela.aluno, tela.atividadeId);
        const resultado = calcularNotaDoAluno(dados);
        const motivo = motivoParaNaoFinalizar(dados, resultado);
        if (motivo) {
            tela.situacao.textContent = '⚠️ ' + motivo;
            await mostrarPopup(motivo, { tipo: 'aviso', titulo: 'Finalizar Atividade' });
            return;
        }
        await mostrarNotaLancada(resultado, tela.situacao);
    } catch (erro) {
        await mostrarPopup('Não foi possível finalizar: ' + erro.message,
            { tipo: 'erro', titulo: 'Finalizar Atividade' });
    } finally {
        tela.botao.disabled = false;
    }
}

/**
 * Mostra embaixo da prova o botão "Finalizar Atividade" do aluno escolhido (ou limpa).
 * @param {{alunoId: string, tentativa: number, nome: string}|null} aluno - Aluno; null limpa.
 * @param {number} atividadeId - Id da atividade.
 */
function mostrarFinalizarAtividade(aluno, atividadeId) {
    limparFinalizarAtividade();
    const destino = document.querySelector(SELETOR_DESTINO_FINALIZAR);
    if (!aluno || !atividadeId || !destino) return;

    const bloco = document.createElement('section');
    bloco.className = 'aula-card ' + CLASSE_FINALIZAR;
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = CLASSE_FINALIZAR + '__botao';
    botao.textContent = '✅ Finalizar Atividade';
    const situacao = document.createElement('p');
    situacao.className = CLASSE_FINALIZAR + '__situacao';
    situacao.textContent = 'Lança a nota de ' + (aluno.nome || 'aluno') + ' com base nas ' +
        'alternativas que você confirmou (certa, meia certa, errada).';
    botao.addEventListener('click', () =>
        finalizarAtividadeDoAluno({ aluno, atividadeId, botao, situacao }));
    bloco.append(botao, situacao);
    const entrega = destino.querySelector(SELETOR_ENTREGA_FINALIZAR);
    destino.insertBefore(bloco, entrega);
}

(function incluirEstiloFinalizar() {
    if (!BASE_SCRIPTS_FINALIZAR) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_FINALIZAR + '../css/finalizar-atividade-professor.css';
    document.head.appendChild(link);
})();

window.mostrarFinalizarAtividade = mostrarFinalizarAtividade;
