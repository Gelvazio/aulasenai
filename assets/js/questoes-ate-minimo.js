// Atividade objetiva com data-questoes-ate-minimo="sim" no <body>: depois que o professor define a
// "Quantidade Mínima de Questões" (🧮 Cálculo Nota), a tela e o "Exportar PDF (atividade
// completa)" ficam só com as questões 1 até o mínimo (o PDF pula as escondidas: atividade.js).
// Aluno: o mínimo dele (minimo_questoes_para_entregar, lido em respostas-atividade-banco.js).
// Professor: ao abrir, o mínimo mais usado em minimo_questoes_aluno da atividade (RLS: só as
// turmas dele); ao aplicar no Cálculo Nota, o evento "minimo-questoes-aplicado" muda a tela
// na hora.
// Carregado por assets/js/respostas-atividade.js. Depende de js/supabase.js (sbGet).
// Regra: docs/regras/atividades.md

const VALOR_ATIVO_QUESTOES_ATE_MINIMO = 'sim';
const CLASSE_FORA_DO_MINIMO = 'questao--fora-do-minimo';
const SELETOR_QUESTOES_ATE_MINIMO = '.aula-card.questao';
const SELETOR_AVISO_EXPORTACAO_MINIMO = '.export-bar small';
const EVENTO_MINIMO_APLICADO = 'minimo-questoes-aplicado';
const TABELA_MINIMO_ATE_MINIMO = 'minimo_questoes_aluno';

/**
 * Diz se a página pediu para mostrar só as questões até o mínimo.
 * @returns {boolean} true com data-questoes-ate-minimo="sim" no <body>.
 */
function estaAtivoQuestoesAteMinimo() {
    return document.body?.dataset.questoesAteMinimo === VALOR_ATIVO_QUESTOES_ATE_MINIMO;
}

/**
 * Troca o texto da barra de exportação conforme as questões que vão para o PDF.
 * @param {number} minimo - Questões visíveis.
 * @param {number} total - Total de questões da página.
 */
function atualizarAvisoExportacaoMinimo(minimo, total) {
    const aviso = document.querySelector(SELETOR_AVISO_EXPORTACAO_MINIMO);
    if (!aviso) return;

    aviso.dataset.textoOriginal ??= aviso.textContent;
    aviso.textContent = minimo < total
        ? 'Gera um único arquivo com as questões 1 a ' + minimo + ' (quantidade mínima).'
        : aviso.dataset.textoOriginal;
}

/**
 * Mostra só as questões 1 até o mínimo (as demais ficam escondidas na tela e fora do PDF).
 * Um mínimo inválido (fora de 1 ao total) não muda nada.
 * @param {number} minimo - Quantidade mínima de questões.
 */
function mostrarQuestoesAteMinimo(minimo) {
    if (!estaAtivoQuestoesAteMinimo()) return;

    const questoes = [...document.querySelectorAll(SELETOR_QUESTOES_ATE_MINIMO)];
    const estaValido = Number.isInteger(minimo) && minimo >= 1 && minimo <= questoes.length;
    if (!estaValido) return;

    questoes.forEach((card, indice) => card.classList.toggle(CLASSE_FORA_DO_MINIMO,
        indice >= minimo));
    atualizarAvisoExportacaoMinimo(minimo, questoes.length);
}

/**
 * Lê o mínimo mais usado pela turma nesta atividade (empate: o gravado por último).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number|null>} Mínimo ou null se não houver registro (ou falhar).
 */
async function lerMinimoMaisUsado(atividadeId) {
    try {
        const linhas = await sbGet(TABELA_MINIMO_ATE_MINIMO, 'select=minimo&atividade_id=eq.' +
            atividadeId + '&order=definido_em.desc');
        const contagem = new Map();
        linhas.forEach((linha) => {
            contagem.set(linha.minimo, (contagem.get(linha.minimo) || 0) + 1);
        });
        let maisUsado = null;
        contagem.forEach((quantidade, minimo) => {
            if (maisUsado === null || quantidade > contagem.get(maisUsado)) maisUsado = minimo;
        });
        return maisUsado;
    } catch (erro) {
        console.warn('Não foi possível ler o mínimo de questões:', erro.message);
        return null;
    }
}

/**
 * Liga a tela "questões até o mínimo": aplica o mínimo de quem está logado e, para o professor,
 * escuta o Cálculo Nota.
 * @param {{minimo: number, ehProfessor: boolean, atividadeId: number}} dados - Mínimo do aluno
 *     (ou da atividade), perfil e atividade.
 */
async function iniciarQuestoesAteMinimo(dados) {
    if (!estaAtivoQuestoesAteMinimo()) return;
    if (!dados.ehProfessor) {
        mostrarQuestoesAteMinimo(dados.minimo);
        return;
    }

    document.addEventListener(EVENTO_MINIMO_APLICADO, (evento) => {
        const daMesmaAtividade = evento.detail?.atividadeId === dados.atividadeId;
        if (daMesmaAtividade) mostrarQuestoesAteMinimo(evento.detail.minimo);
    });
    mostrarQuestoesAteMinimo((await lerMinimoMaisUsado(dados.atividadeId)) || dados.minimo);
}

window.iniciarQuestoesAteMinimo = iniciarQuestoesAteMinimo;
