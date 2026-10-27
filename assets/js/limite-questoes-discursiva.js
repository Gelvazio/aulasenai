// Prática/avaliação discursiva: o aluno vê só as N primeiras questões, onde N é a quantidade mínima
// definida pelo professor para ele (minimo_questoes_aluno / questoes_nota_aluno / padrão da
// atividade, já resolvida pelo banco em dados.minimoQuestoes). As questões depois da N-ésima são
// tiradas da página; assim a contagem de questões, o progresso e a entrega passam a valer sobre as
// N que ele vê. O professor (sem minimoQuestoes) continua vendo todas. Tarefa #415.
// Carregado sob demanda por avaliacao-discursiva.js. Regra: docs/regras/atividades.md

const SELETOR_QUESTAO_LIMITADA = '.questao-discursiva[data-item]';

/**
 * Remove da página as questões depois da N-ésima.
 * @param {number|null} minimo - Quantidade de questões que o aluno deve ver.
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

window.limitarQuestoesAoMinimo = limitarQuestoesAoMinimo;
