// Professor: ON/OFF "MEDIA ATINGIDA(IA)" no Progresso da turma GLOBAL (progresso-turma-global.js),
// em toda atividade. Vale o PERCENTUAL DE ACERTO que a IA mostra na coluna "Nota parcial IA"
// (ex.: 85%): LIGADO lista só quem tem 70% ou mais (média 7 atingida); desligado (padrão) não
// filtra. Aluno sem correção da IA não tem percentual e some com o filtro ligado.
// Vale já durante a correção. A escolha fica no localStorage do navegador
// (preferências injetadas pelo painel). Só filtra a lista na tela: nada é gravado no banco.
// Pedido do usuário em 2026-10-24 (tarefa #367). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_MEDIA_ATINGIDA_IA = 'MEDIA ATINGIDA(IA)';
const DICA_FILTRO_MEDIA_ATINGIDA_IA = 'Pelo percentual de acerto da IA (Nota parcial IA). ' +
    'Ligado: só os alunos com 70% ou mais (média 7 atingida). Desligado: todos os alunos.';
const CLASSE_INTERRUPTOR_MEDIA_ATINGIDA_IA = 'progresso-turma__interruptor';
const PERCENTUAL_MEDIA_MEDIA_ATINGIDA_IA = 70;
const CHAVE_PREFERENCIA_MEDIA_ATINGIDA_IA = 'media-atingida-ia';
const VALOR_LIGADO_PREFERENCIA_MEDIA_ATINGIDA_IA = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_MEDIA_ATINGIDA_IA = 'nao';

/**
 * Diz se o percentual de acerto da IA atingiu a média (70% ou mais, ou seja, nota 7).
 * @param {{correcao: ?{nota: number, possivel: number}}} aluno - Aluno com a correção da IA.
 * @returns {boolean} true quando o aluno tem correção da IA e o percentual é 70% ou mais.
 */
function atingiuMediaIa(aluno) {
    const correcao = aluno.correcao;
    const temPercentual = Boolean(correcao) && correcao.possivel > 0;
    if (!temPercentual) return false;

    const percentual = (correcao.nota / correcao.possivel) * 100;
    return percentual >= PERCENTUAL_MEDIA_MEDIA_ATINGIDA_IA;
}

/**
 * Cria o filtro "MEDIA ATINGIDA(IA)" do Progresso da turma (abre na escolha guardada no
 * navegador; sem ela, desligado = todos os alunos).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: só com nota da IA na média ou acima; desligado: todos).
 */
function criarFiltroMediaAtingidaIa(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_MEDIA_ATINGIDA_IA;
    elemento.title = DICA_FILTRO_MEDIA_ATINGIDA_IA;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_MEDIA_ATINGIDA_IA) ===
        VALOR_LIGADO_PREFERENCIA_MEDIA_ATINGIDA_IA;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_MEDIA_ATINGIDA_IA, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_MEDIA_ATINGIDA_IA
            : VALOR_DESLIGADO_PREFERENCIA_MEDIA_ATINGIDA_IA);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_MEDIA_ATINGIDA_IA + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_MEDIA_ATINGIDA_IA;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => (caixa.checked ? alunos.filter(atingiuMediaIa) : alunos),
    };
}

window.criarFiltroMediaAtingidaIa = criarFiltroMediaAtingidaIa;
