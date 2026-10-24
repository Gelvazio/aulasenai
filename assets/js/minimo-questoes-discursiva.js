// Professor: janela "Quantidade Mínima de Questões" do aluno, aberta pelo botão ao lado do nome no
// Progresso da turma. Grava o mínimo do aluno na tabela minimo_questoes_aluno (de 1 ao total de
// questões; vale para todas as tentativas) ou volta ao padrão da atividade (apaga a linha dele).
// A nota vale sobre o mínimo (cada questão = 10 ÷ mínimo) e é no máximo 10. O RLS só deixa o
// professor gravar alunos das turmas dele. Depende de js/supabase.js e assets/js/popup.js.
// #372: ao salvar, grava o mesmo número também em questoes_nota_aluno (quantidade que vale na
// nota); "Voltar ao padrão" apaga a linha do aluno nas duas tabelas. O modal abre com o valor
// que vale na nota (questoesNota; senão o mínimo).
// Plano: docs/quantidade-minima-questoes-discursiva.md · Regra: docs/regras/atividades.md

const CLASSE_MINIMO = 'minimo-questoes';
const TABELA_MINIMO_QUESTOES = 'minimo_questoes_aluno';
const CHAVE_MINIMO_QUESTOES = 'atividade_id,aluno_id';
const TABELA_QUESTOES_NOTA = 'questoes_nota_aluno';
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
    const cliente = obterClienteSupabase();
    const definidoEm = new Date().toISOString();
    const base = { atividade_id: dados.atividadeId, aluno_id: dados.alunoId };
    const opcoes = { onConflict: CHAVE_MINIMO_QUESTOES };
    const primeira = await cliente.from(TABELA_MINIMO_QUESTOES)
        .upsert([{ ...base, minimo, definido_em: definidoEm }], opcoes);
    if (primeira.error) throw new Error(primeira.error.message);
    const segunda = await cliente.from(TABELA_QUESTOES_NOTA)
        .upsert([{ ...base, quantidade: minimo, definido_em: definidoEm }], opcoes);
    if (segunda.error) throw new Error(segunda.error.message);
}

/**
 * Volta o aluno para o mínimo padrão da atividade (apaga o mínimo próprio dele).
 * @param {{atividadeId: number, alunoId: string}} dados - Atividade e aluno.
 * @throws {Error} Se o banco recusar.
 */
async function voltarMinimoPadrao(dados) {
    const cliente = obterClienteSupabase();
    for (const tabela of [TABELA_MINIMO_QUESTOES, TABELA_QUESTOES_NOTA]) {
        const { error } = await cliente.from(tabela).delete()
            .eq('atividade_id', dados.atividadeId).eq('aluno_id', dados.alunoId);
        if (error) throw new Error(error.message);
    }
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
    const atual = dados.questoesNota || dados.minimo;
    const campo = document.createElement('input');
    Object.assign(campo, { type: 'number', min: '1', max: String(dados.totalQuestoes), step: '1',
        value: String(atual), className: CLASSE_MINIMO + '__campo' });
    const rotulo = criarElementoMinimo('label', CLASSE_MINIMO + '__rotulo',
        'Questões que contam na nota e mínimo para entregar (1 a ' + dados.totalQuestoes + '): ');
    rotulo.appendChild(campo);
    const elementos = {
        fundo, campo,
        explicacao: criarElementoMinimo('p', CLASSE_MINIMO + '__explicacao',
            explicarValorDaQuestao(atual)),
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
        tela.gravacaoParcial = true;
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
 * Lê de uma tabela o valor próprio do aluno na atividade (null se não houver linha).
 * @param {{tabela: string, coluna: string}} origem - Tabela e coluna do número.
 * @param {{atividadeId: number, alunoId: string}} dados - Atividade e aluno.
 * @returns {Promise<number|null>} Valor gravado ou null.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerValorProprioDoBanco(origem, dados) {
    const { data, error } = await obterClienteSupabase().from(origem.tabela)
        .select(origem.coluna).eq('atividade_id', dados.atividadeId)
        .eq('aluno_id', dados.alunoId).maybeSingle();
    if (error) throw new Error(error.message);
    return data ? Number(data[origem.coluna]) : null;
}

/**
 * Atualiza os dados da janela com o que está gravado no banco (quantidade da nota, senão
 * mínimo, senão o valor do painel). Falha na leitura mantém o valor do painel e avisa.
 * @param {Object} dados - Dados vindos do painel.
 * @returns {Promise<Object>} Dados com minimo, questoesNota, temMinimoProprio e avisoLeitura.
 */
async function completarComValorDoBanco(dados) {
    try {
        const quantidade = await lerValorProprioDoBanco(
            { tabela: TABELA_QUESTOES_NOTA, coluna: 'quantidade' }, dados);
        const minimoProprio = await lerValorProprioDoBanco(
            { tabela: TABELA_MINIMO_QUESTOES, coluna: 'minimo' }, dados);
        const valor = quantidade || minimoProprio || dados.questoesNota || dados.minimo;
        return { ...dados, questoesNota: Math.min(dados.totalQuestoes, valor),
            temMinimoProprio: quantidade !== null || minimoProprio !== null };
    } catch (erro) {
        return { ...dados, avisoLeitura: 'ℹ️ Não foi possível ler o valor gravado; mostrando ' +
            'o valor do painel (' + erro.message + ').' };
    }
}

/**
 * Abre a janela do mínimo de questões do aluno, já com o valor gravado no banco.
 * @param {{atividadeId: number, alunoId: string, nome: string, minimo: number,
 *     questoesNota: number, totalQuestoes: number, temMinimoProprio: boolean}} dadosPainel -
 *     Atividade, aluno e valores do painel (usados se o banco não tiver linha ou falhar).
 * @returns {Promise<boolean>} true se algo foi gravado (também em gravação parcial) ou voltou
 *     ao padrão.
 */
async function abrirMinimoQuestoes(dadosPainel) {
    const dados = await completarComValorDoBanco(dadosPainel);
    return new Promise((resolver) => {
        const tela = montarJanelaMinimo(dados);
        if (dados.avisoLeitura) tela.aviso.textContent = dados.avisoLeitura;
        const fechar = (mudou) => {
            tela.fundo.remove();
            resolver(mudou || tela.gravacaoParcial === true);
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
