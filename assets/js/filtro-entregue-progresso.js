// Professor: ON/OFF "Tarefa Entregue?" em cima da lista do Progresso da turma GLOBAL
// (progresso-turma-global.js), em toda atividade. OFF (padrão): a lista mostra só quem NÃO
// entregou; ON: mostra também quem entregou. Só filtra a lista na tela (nada é lido nem gravado
// no banco); o resumo, os Gráficos e o Cálculo Nota seguem com a turma escolhida inteira.
// Pedido do usuário em 2026-10-14 (tarefa #140). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_ENTREGUE = 'Tarefa Entregue?';
const DICA_FILTRO_ENTREGUE = 'Desligado: só quem ainda não entregou. Ligado: também quem ' +
    'entregou.';
const CLASSE_INTERRUPTOR_ENTREGUE = 'progresso-turma__interruptor';

/**
 * Cria o filtro "Tarefa Entregue?" do Progresso da turma.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (sem os que entregaram, quando desligado).
 */
function criarFiltroEntregue(aoMudar) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_ENTREGUE;
    elemento.title = DICA_FILTRO_ENTREGUE;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.addEventListener('change', aoMudar);
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_ENTREGUE + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_ENTREGUE;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => (caixa.checked ? alunos : alunos.filter((aluno) => !aluno.entregue)),
    };
}

window.criarFiltroEntregue = criarFiltroEntregue;
