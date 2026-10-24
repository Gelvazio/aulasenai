// Professor: ON/OFF "ABAIXO MEDIA(IA)" no Progresso da turma GLOBAL (progresso-turma-global.js),
// em toda atividade. Vale o PERCENTUAL DE ACERTO que a IA mostra na coluna "Nota parcial IA"
// (ex.: 85%): LIGADO lista só quem tem menos de 70% (média 7); desligado (padrão) não filtra.
// Aluno sem correção da IA não tem percentual e some da lista quando o filtro está ligado.
// Vale já durante a correção. A escolha fica no localStorage do navegador
// (preferências injetadas pelo painel). Só filtra a lista na tela: nada é gravado no banco.
// Pedido do usuário em 2026-10-24 (tarefa #362). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_ABAIXO_MEDIA_IA = 'ABAIXO MEDIA(IA)';
const DICA_FILTRO_ABAIXO_MEDIA_IA = 'Pelo percentual de acerto da IA (Nota parcial IA). ' +
    'Ligado: só os alunos abaixo de 70%. Desligado: todos os alunos.';
const CLASSE_INTERRUPTOR_ABAIXO_MEDIA_IA = 'progresso-turma__interruptor';
const PERCENTUAL_MEDIA_ABAIXO_MEDIA_IA = 70;
const CHAVE_PREFERENCIA_ABAIXO_MEDIA_IA = 'abaixo-da-media-ia';
const VALOR_LIGADO_PREFERENCIA_ABAIXO_MEDIA_IA = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_ABAIXO_MEDIA_IA = 'nao';

/**
 * Diz se o percentual de acerto da IA está abaixo da média (menor que 70%, ou seja, nota 7).
 * @param {{correcao: ?{nota: number, possivel: number}}} aluno - Aluno com a correção da IA.
 * @returns {boolean} true quando o aluno tem correção da IA e o percentual é menor que 70%.
 */
function estaAbaixoDaMediaIa(aluno) {
    const correcao = aluno.correcao;
    const temPercentual = Boolean(correcao) && correcao.possivel > 0;
    if (!temPercentual) return false;

    const percentual = (correcao.nota / correcao.possivel) * 100;
    return percentual < PERCENTUAL_MEDIA_ABAIXO_MEDIA_IA;
}

/**
 * Cria o filtro "ABAIXO MEDIA(IA)" do Progresso da turma (abre na escolha guardada no navegador;
 * sem ela, desligado = todos os alunos).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: só com nota da IA abaixo da média; desligado: todos).
 */
function criarFiltroAbaixoMediaIa(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_ABAIXO_MEDIA_IA;
    elemento.title = DICA_FILTRO_ABAIXO_MEDIA_IA;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_ABAIXO_MEDIA_IA) ===
        VALOR_LIGADO_PREFERENCIA_ABAIXO_MEDIA_IA;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_ABAIXO_MEDIA_IA, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_ABAIXO_MEDIA_IA
            : VALOR_DESLIGADO_PREFERENCIA_ABAIXO_MEDIA_IA);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_ABAIXO_MEDIA_IA + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_ABAIXO_MEDIA_IA;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => (caixa.checked ? alunos.filter(estaAbaixoDaMediaIa) : alunos),
    };
}

window.criarFiltroAbaixoMediaIa = criarFiltroAbaixoMediaIa;
