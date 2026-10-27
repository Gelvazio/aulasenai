// Prática/avaliação discursiva: o aluno vê só as N primeiras questões, onde N é a quantidade mínima
// definida pelo professor para ele (minimo_questoes_aluno / questoes_nota_aluno / padrão da
// atividade, já resolvida pelo banco em dados.minimoQuestoes). O professor vê como o aluno (#419):
// o mínimo mais usado em minimo_questoes_aluno da atividade (o RLS limita às turmas dele), senão o
// padrão da atividade (minimo_questoes_entrega); sem nenhum dos dois, vê todas. As questões depois
// da N-ésima são tiradas da página; assim a contagem de questões, o progresso e a entrega passam
// a valer sobre as N visíveis. Tarefas #415 e #419.
// Carregado sob demanda por avaliacao-discursiva.js. Depende de js/supabase.js (sbGet).
// Regra: docs/regras/atividades.md

const SELETOR_QUESTAO_LIMITADA = '.questao-discursiva[data-item]';

/**
 * Remove da página as questões depois da N-ésima.
 * @param {number|null} minimo - Quantidade de questões que deve aparecer.
 * @returns {number} Quantidade de questões removidas (0 se não houve limite).
 */
function limitarQuestoesAoMinimo(minimo) {
    const limite = Number(minimo);
    const temLimite = Number.isInteger(limite) && limite > 0;
    if (!temLimite) return 0;

    const questoes = Array.from(document.querySelectorAll(SELETOR_QUESTAO_LIMITADA));
    const excedentes = questoes.filter((questao) => Number(questao.dataset.item) > limite);
    excedentes.forEach((questao) => questao.remove());
    return excedentes.length;
}

/**
 * Acha o mínimo mais usado entre as linhas de minimo_questoes_aluno.
 * @param {{minimo: number}[]} linhas - Mínimos dos alunos da atividade.
 * @returns {number|null} Mínimo mais usado, ou null sem linhas.
 */
function acharMinimoMaisUsado(linhas) {
    const contagem = new Map();
    linhas.forEach((linha) => contagem.set(linha.minimo, (contagem.get(linha.minimo) || 0) + 1));
    let maisUsado = null;
    contagem.forEach((quantidade, minimo) => {
        if (maisUsado === null || quantidade > contagem.get(maisUsado)) maisUsado = minimo;
    });
    return maisUsado;
}

/**
 * Lê no banco o mínimo que o professor vê: o mais usado entre os alunos, senão o padrão da
 * atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number|null>} Mínimo, ou null se não houver.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerMinimoDoProfessor(atividadeId) {
    const linhas = await sbGet('minimo_questoes_aluno',
        'select=minimo&atividade_id=eq.' + atividadeId);
    const maisUsado = acharMinimoMaisUsado(linhas);
    if (maisUsado) return maisUsado;

    const atividades = await sbGet('atividade',
        'select=minimo_questoes_entrega&id=eq.' + atividadeId);
    return atividades[0]?.minimo_questoes_entrega || null;
}

/**
 * Corta a página do professor no mínimo lido do banco.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number>} Quantidade de questões removidas.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function limitarQuestoesDoProfessor(atividadeId) {
    return limitarQuestoesAoMinimo(await lerMinimoDoProfessor(atividadeId));
}

window.limitarQuestoesAoMinimo = limitarQuestoesAoMinimo;
window.limitarQuestoesDoProfessor = limitarQuestoesDoProfessor;
