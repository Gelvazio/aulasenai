// Professor: ON/OFF "Tarefa Entregue?" em cima da lista do Progresso da turma GLOBAL
// (progresso-turma-global.js), em toda atividade. OFF (padrão): a lista mostra só quem NÃO
// entregou; ON: só quem entregou (revisão de 2026-10-14, tarefa #146). Só filtra a lista na
// tela (nada é lido nem gravado no banco); o resumo, os Gráficos e o Cálculo Nota seguem com
// a turma escolhida inteira.
// Pedido do usuário em 2026-10-14 (tarefa #140). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_ENTREGUE = 'Tarefa Entregue?';
const DICA_FILTRO_ENTREGUE = 'Desligado: só quem ainda não entregou. Ligado: só quem ' +
    'entregou.';
const CLASSE_INTERRUPTOR_ENTREGUE = 'progresso-turma__interruptor';
const CHAVE_PREFERENCIA_ENTREGUE = 'tarefa-entregue';
const VALOR_LIGADO_PREFERENCIA_ENTREGUE = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_ENTREGUE = 'nao';

/**
 * Cria o filtro "Tarefa Entregue?" do Progresso da turma (abre na escolha guardada no
 * navegador; sem ela, desligado).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: só quem entregou; desligado: só quem não entregou).
 */
function criarFiltroEntregue(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_ENTREGUE;
    elemento.title = DICA_FILTRO_ENTREGUE;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_ENTREGUE) ===
        VALOR_LIGADO_PREFERENCIA_ENTREGUE;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_ENTREGUE, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_ENTREGUE : VALOR_DESLIGADO_PREFERENCIA_ENTREGUE);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_ENTREGUE + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_ENTREGUE;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => alunos.filter((aluno) => aluno.entregue === caixa.checked),
    };
}

window.criarFiltroEntregue = criarFiltroEntregue;
