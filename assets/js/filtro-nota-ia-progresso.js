// Professor: ON/OFF "Nota IA Gerada" no Progresso da turma GLOBAL (progresso-turma-global.js),
// em toda atividade. Desligado (padrão): não filtra; ligado: só
// os que já têm a nota final gerada pela IA. Nota final da IA = a mesma condição do 🤖 no
// painel: entregue, com pelo menos uma parte respondida e com a correção da IA em todas as
// partes respondidas (aluno sem correção conta como sem nota). A escolha fica no localStorage
// do navegador (preferências injetadas pelo painel). Só filtra a lista na tela: nada é gravado
// no banco.
// Pedido do usuário em 2026-10-24 (tarefa #360). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_NOTA_IA = 'Nota IA Gerada';
const DICA_FILTRO_NOTA_IA = 'Desligado: não filtra. Ligado: só os ' +
    'alunos com a nota final gerada pela IA (entregue e com tudo corrigido pela IA).';
const CLASSE_INTERRUPTOR_NOTA_IA = 'progresso-turma__interruptor';
const CHAVE_PREFERENCIA_NOTA_IA = 'nota-ia-gerada';
const VALOR_LIGADO_PREFERENCIA_NOTA_IA = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_NOTA_IA = 'nao';

/**
 * Diz se o aluno já tem a nota final gerada pela IA (mesma condição do 🤖 do painel).
 * @param {Object} aluno - Aluno com indicadores (entregue, respondidos, correcao).
 * @returns {boolean} true quando a IA já gerou a nota final do aluno.
 */
function temNotaIaGerada(aluno) {
    if (!aluno?.entregue || !aluno.respondidos) return false;
    if (!aluno.correcao) return false;
    return aluno.correcao.corrigidos >= aluno.respondidos;
}

/**
 * Cria o filtro "Nota IA Gerada" do Progresso da turma (abre na escolha guardada no navegador;
 * sem ela, desligado = sem a nota da IA).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: com nota da IA; desligado: sem nota da IA).
 */
function criarFiltroNotaIa(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_NOTA_IA;
    elemento.title = DICA_FILTRO_NOTA_IA;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_NOTA_IA) ===
        VALOR_LIGADO_PREFERENCIA_NOTA_IA;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_NOTA_IA, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_NOTA_IA : VALOR_DESLIGADO_PREFERENCIA_NOTA_IA);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_NOTA_IA + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_NOTA_IA;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => (caixa.checked ? alunos.filter(temNotaIaGerada) : alunos),
    };
}

window.criarFiltroNotaIa = criarFiltroNotaIa;
