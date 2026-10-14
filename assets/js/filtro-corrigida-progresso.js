// Professor: ON/OFF "Prova Corrigida" no Progresso da turma GLOBAL (progresso-turma-global.js),
// em toda atividade. Desligado (padrão): lista só as provas AINDA NÃO corrigidas; ligado: só as
// corrigidas. Corrigida (campo provaCorrigida, de progresso-turma-fontes.js): objetiva = entregue
// (a correção é automática); discursiva = entregue e com a nota do professor em todas as
// questões respondidas. A escolha fica no localStorage do navegador (preferências injetadas pelo
// painel). Só filtra a lista na tela: nada é gravado no banco.
// Pedido do usuário em 2026-10-14 (tarefa #147). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_CORRIGIDA = 'Prova Corrigida';
const DICA_FILTRO_CORRIGIDA = 'Desligado: só as provas ainda não corrigidas. Ligado: só as ' +
    'corrigidas (objetiva: entregue; discursiva: nota do professor em todas as questões).';
const CLASSE_INTERRUPTOR_CORRIGIDA = 'progresso-turma__interruptor';
const CHAVE_PREFERENCIA_CORRIGIDA = 'prova-corrigida';
const VALOR_LIGADO_PREFERENCIA_CORRIGIDA = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_CORRIGIDA = 'nao';

/**
 * Cria o filtro "Prova Corrigida" do Progresso da turma (abre na escolha guardada no navegador;
 * sem ela, desligado = não corrigidas).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: corrigidas; desligado: não corrigidas).
 */
function criarFiltroCorrigida(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_CORRIGIDA;
    elemento.title = DICA_FILTRO_CORRIGIDA;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_CORRIGIDA) ===
        VALOR_LIGADO_PREFERENCIA_CORRIGIDA;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_CORRIGIDA, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_CORRIGIDA : VALOR_DESLIGADO_PREFERENCIA_CORRIGIDA);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_CORRIGIDA + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_CORRIGIDA;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => alunos.filter((aluno) =>
            Boolean(aluno.provaCorrigida) === caixa.checked),
    };
}

window.criarFiltroCorrigida = criarFiltroCorrigida;
