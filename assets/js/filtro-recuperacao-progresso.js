// Professor: ON/OFF "RECUPERAÇÃO" no Progresso da turma GLOBAL (progresso-turma-global.js), logo
// depois do "Mostrar quem faltou", em toda atividade. Vale só a NOTA FINAL (coluna "Nota final"):
// LIGADO mostra quem pegou recuperação (nota final MENOR que 7); desligado (padrão), quem tem
// nota final 7 ou mais (invertido a pedido do usuário em 2026-10-14, tarefa #146). Aluno sem
// nota final (não entregou ou a IA ainda corrige) não é escondido por este filtro.
// A escolha fica no localStorage do navegador (preferências injetadas pelo painel). Só filtra a
// lista na tela: nada é gravado no banco.
// Pedido do usuário em 2026-10-14 (tarefa #145). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_RECUPERACAO = 'RECUPERAÇÃO';
const DICA_FILTRO_RECUPERACAO = 'Pela nota final. Ligado: quem pegou recuperação (nota menor ' +
    'que 7). Desligado: não filtra. Quem ainda não tem nota final continua na lista.';
const CLASSE_INTERRUPTOR_RECUPERACAO = 'progresso-turma__interruptor';
const NOTA_MINIMA_RECUPERACAO = 7;
const CHAVE_PREFERENCIA_RECUPERACAO = 'recuperacao';
const VALOR_LIGADO_PREFERENCIA_RECUPERACAO = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_RECUPERACAO = 'nao';

/**
 * Diz se o aluno fica na lista conforme o ON/OFF.
 * @param {{valorNotaFinal: number}} aluno - Aluno com indicadores (sem nota final = negativo).
 * @param {boolean} ligado - Estado do ON/OFF.
 * @returns {boolean} true se o aluno aparece.
 */
function alunoPassaNaRecuperacao(aluno, ligado) {
    if (!ligado) return true;

    const temNotaFinal = aluno.valorNotaFinal >= 0;
    if (!temNotaFinal) return true;

    return aluno.valorNotaFinal < NOTA_MINIMA_RECUPERACAO;
}

/**
 * Cria o filtro "RECUPERAÇÃO" do Progresso da turma (abre na escolha guardada no navegador; sem
 * ela, desligado).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis.
 */
function criarFiltroRecuperacao(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_RECUPERACAO;
    elemento.title = DICA_FILTRO_RECUPERACAO;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_RECUPERACAO) ===
        VALOR_LIGADO_PREFERENCIA_RECUPERACAO;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_RECUPERACAO, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_RECUPERACAO : VALOR_DESLIGADO_PREFERENCIA_RECUPERACAO);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_RECUPERACAO + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_RECUPERACAO;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => alunos.filter((aluno) =>
            alunoPassaNaRecuperacao(aluno, caixa.checked)),
    };
}

window.criarFiltroRecuperacao = criarFiltroRecuperacao;
