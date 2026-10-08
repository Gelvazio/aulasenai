// Professor: janela "Quantidade Mínima de Questões" do aluno, aberta pelo botão ao lado do nome no
// Progresso da turma. Grava o mínimo do aluno na tabela minimo_questoes_aluno (de 1 ao total de
// questões; vale para todas as tentativas) ou volta ao padrão da atividade (apaga a linha dele).
// A nota vale sobre o mínimo (cada questão = 10 ÷ mínimo) e é no máximo 10. O RLS só deixa o
// professor gravar alunos das turmas dele. Depende de js/supabase.js e assets/js/popup.js.
// Plano: docs/quantidade-minima-questoes-discursiva.md · Regra: docs/regras/atividades.md

const CLASSE_MINIMO = 'minimo-questoes';
const TABELA_MINIMO_QUESTOES = 'minimo_questoes_aluno';
const CHAVE_MINIMO_QUESTOES = 'atividade_id,aluno_id';
const BASE_SCRIPTS_MINIMO = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const NOTA_MAXIMA_MINIMO = 10;

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoMinimo(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Explica quanto vale cada questão com o mínimo informado.
 * @param {number} minimo - Mínimo de questões.
 * @returns {string} Texto da explicação.
 */
function explicarValorDaQuestao(minimo) {
    const valor = (NOTA_MAXIMA_MINIMO / minimo).toLocaleString('pt-BR',
        { maximumFractionDigits: 2 });
    return 'Com mínimo ' + minimo + ', cada questão vale ' + valor + ' ponto(s); a nota máxima ' +
        'é sempre 10.';
}

/**
 * Grava o mínimo do aluno (insere ou atualiza).
 * @param {{atividadeId: number, alunoId: string}} dados - Atividade e aluno.
 * @param {number} minimo - Mínimo de questões.
 * @throws {Error} Se o banco recusar.
 */
async function gravarMinimoDoAluno(dados, minimo) {
    const { error } = await obterClienteSupabase().from(TABELA_MINIMO_QUESTOES).upsert([{
        atividade_id: dados.atividadeId, aluno_id: dados.alunoId, minimo,
        definido_em: new Date().toISOString(),
    }], { onConflict: CHAVE_MINIMO_QUESTOES });
    if (error) throw new Error(error.message);
}

/**
 * Volta o aluno para o mínimo padrão da atividade (apaga o mínimo próprio dele).
 * @param {{atividadeId: number, alunoId: string}} dados - Atividade e aluno.
 * @throws {Error} Se o banco recusar.
 */
async function voltarMinimoPadrao(dados) {
    const { error } = await obterClienteSupabase().from(TABELA_MINIMO_QUESTOES).delete()
        .eq('atividade_id', dados.atividadeId).eq('aluno_id', dados.alunoId);
    if (error) throw new Error(error.message);
}

/**
 * Lê e valida o número digitado (inteiro de 1 ao total de questões).
 * @param {HTMLInputElement} campo - Campo do mínimo.
 * @param {number} totalQuestoes - Total de questões.
 * @returns {number|null} Mínimo válido ou null.
 */
function lerMinimoDigitado(campo, totalQuestoes) {
    const minimo = Number(campo.value);
    const estaValido = Number.isInteger(minimo) && minimo >= 1 && minimo <= totalQuestoes;
    return estaValido ? minimo : null;
}

/**
 * Monta a janela (modal) com o campo do mínimo e os botões.
 * @param {Object} dados - Aluno, mínimo atual, total e se tem mínimo próprio.
 * @returns {Object} Elementos: fundo, campo, explicacao, aviso, salvar, padrao, cancelar.
 */
function montarJanelaMinimo(dados) {
    const fundo = criarElementoMinimo('div', CLASSE_MINIMO);
    const janela = criarElementoMinimo('div', CLASSE_MINIMO + '__janela');
    janela.setAttribute('role', 'dialog');
    janela.setAttribute('aria-modal', 'true');
    const campo = document.createElement('input');
    Object.assign(campo, { type: 'number', min: '1', max: String(dados.totalQuestoes), step: '1',
        value: String(dados.minimo), className: CLASSE_MINIMO + '__campo' });
    const rotulo = criarElementoMinimo('label', CLASSE_MINIMO + '__rotulo',
        'Mínimo de questões completas para entregar (1 a ' + dados.totalQuestoes + '): ');
    rotulo.appendChild(campo);
    const elementos = {
        fundo, campo,
        explicacao: criarElementoMinimo('p', CLASSE_MINIMO + '__explicacao',
            explicarValorDaQuestao(dados.minimo)),
        aviso: criarElementoMinimo('p', CLASSE_MINIMO + '__aviso'),
        salvar: criarElementoMinimo('button', CLASSE_MINIMO + '__salvar', '💾 Salvar'),
        padrao: criarElementoMinimo('button', CLASSE_MINIMO + '__padrao', '↩ Voltar ao padrão'),
        cancelar: criarElementoMinimo('button', CLASSE_MINIMO + '__cancelar', 'Cancelar'),
    };
    [elementos.salvar, elementos.padrao, elementos.cancelar].forEach((botao) => {
        botao.type = 'button';
    });
    elementos.padrao.hidden = !dados.temMinimoProprio;
    const botoes = criarElementoMinimo('div', CLASSE_MINIMO + '__botoes');
    botoes.append(elementos.padrao, elementos.cancelar, elementos.salvar);
    janela.append(criarElementoMinimo('h2', CLASSE_MINIMO + '__titulo',
        '🎯 Quantidade Mínima de Questões'),
    criarElementoMinimo('p', CLASSE_MINIMO + '__aluno', 'Aluno: ' + dados.nome),
    rotulo, elementos.explicacao, elementos.aviso, botoes);
    fundo.appendChild(janela);
    return elementos;
}

/**
 * Executa uma gravação mostrando o erro na janela; fecha a janela se der certo.
 * @param {Object} tela - Elementos da janela.
 * @param {Function} acao - Gravação a executar.
 * @param {Function} fechar - Fecha a janela com o resultado.
 */
async function executarNaJanela(tela, acao, fechar) {
    tela.salvar.disabled = true;
    tela.padrao.disabled = true;
    try {
        await acao();
        fechar(true);
    } catch (erro) {
        tela.aviso.textContent = '❌ Não foi possível gravar: ' + erro.message;
    } finally {
        tela.salvar.disabled = false;
        tela.padrao.disabled = false;
    }
}

/**
 * Liga os eventos da janela (salvar, voltar ao padrão, cancelar, Esc, clique fora).
 * @param {Object} tela - Elementos da janela.
 * @param {Object} dados - Atividade, aluno e total de questões.
 * @param {Function} fechar - Fecha a janela com o resultado (true = mudou).
 */
function ligarEventosMinimo(tela, dados, fechar) {
    tela.campo.addEventListener('input', () => {
        const minimo = lerMinimoDigitado(tela.campo, dados.totalQuestoes);
        tela.explicacao.textContent = minimo ? explicarValorDaQuestao(minimo) : '';
    });
    tela.salvar.addEventListener('click', () => {
        const minimo = lerMinimoDigitado(tela.campo, dados.totalQuestoes);
        if (!minimo) {
            tela.aviso.textContent = '⚠️ Informe um número inteiro de 1 a ' +
                dados.totalQuestoes + '.';
            return;
        }
        executarNaJanela(tela, () => gravarMinimoDoAluno(dados, minimo), fechar);
    });
    tela.padrao.addEventListener('click', () =>
        executarNaJanela(tela, () => voltarMinimoPadrao(dados), fechar));
    tela.cancelar.addEventListener('click', () => fechar(false));
    tela.fundo.addEventListener('click', (evento) => {
        if (evento.target === tela.fundo) fechar(false);
    });
    tela.fundo.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') fechar(false);
    });
}

/**
 * Abre a janela do mínimo de questões do aluno.
 * @param {{atividadeId: number, alunoId: string, nome: string, minimo: number,
 *     totalQuestoes: number, temMinimoProprio: boolean}} dados - Atividade, aluno e mínimo atual.
 * @returns {Promise<boolean>} true se o mínimo foi gravado ou voltou ao padrão.
 */
function abrirMinimoQuestoes(dados) {
    return new Promise((resolver) => {
        const tela = montarJanelaMinimo(dados);
        const fechar = (mudou) => {
            tela.fundo.remove();
            resolver(mudou);
        };
        ligarEventosMinimo(tela, dados, fechar);
        document.body.appendChild(tela.fundo);
        tela.campo.focus();
        tela.campo.select();
    });
}

(function incluirEstiloMinimo() {
    if (!BASE_SCRIPTS_MINIMO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_MINIMO + '../css/minimo-questoes-discursiva.css';
    document.head.appendChild(link);
})();

window.abrirMinimoQuestoes = abrirMinimoQuestoes;
