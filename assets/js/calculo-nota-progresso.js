// Professor: botão "🧮 Cálculo Nota" do Progresso da turma (ao lado de "📈 Gráficos"). Calcula a
// quantidade de questões completas que 85% da turma já atingiu e sugere esse número como mínimo
// para todos. No modal, o botão "Quantidade Mínima de Questões" grava o mínimo informado só para
// os alunos que ainda estão com o total de questões (quem já tem mínimo próprio menor não muda).
// A nota segue o mínimo de cada aluno (10 ÷ mínimo por questão, máximo 10).
// Grava em minimo_questoes_aluno (RLS: professor só alunos das turmas dele).
// Depende de js/supabase.js e assets/js/popup.js. Regra: docs/regras/atividades.md

const CLASSE_CALCULO = 'calculo-nota';
const PERCENTUAL_TURMA_CALCULO = 0.85;
const TABELA_MINIMO_CALCULO = 'minimo_questoes_aluno';
const CHAVE_MINIMO_CALCULO = 'atividade_id,aluno_id';
const NOTA_MAXIMA_CALCULO = 10;
const BASE_SCRIPTS_CALCULO = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoCalculo(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Quantidade de questões completas que pelo menos 85% da turma já atingiu (mínimo 1).
 * @param {Object[]} alunos - Alunos com indicadores (completas).
 * @returns {number} Mínimo sugerido.
 */
function calcularMinimoDaTurma(alunos) {
    const completas = alunos.map((aluno) => aluno.completas).sort((a, b) => b - a);
    const posicao = Math.max(0, Math.ceil(completas.length * PERCENTUAL_TURMA_CALCULO) - 1);
    return Math.max(1, completas[posicao] || 0);
}

/**
 * Resume a turma para o modal.
 * @param {Object[]} alunos - Alunos com indicadores.
 * @param {number} minimo - Mínimo sugerido ou informado.
 * @returns {Object} Totais: alunos, atingem, comTotal (alvo) e comMinimoProprio.
 */
function resumirTurmaParaCalculo(alunos, minimo) {
    const alvo = alunos.filter((aluno) => aluno.minimo >= aluno.totalQuestoes);
    return {
        alunos: alunos.length,
        atingem: alunos.filter((aluno) => aluno.completas >= minimo).length,
        alvo,
        comMinimoProprio: alunos.length - alvo.length,
    };
}

/**
 * Monta as linhas de texto do resumo do cálculo.
 * @param {Object[]} alunos - Alunos com indicadores.
 * @param {number} minimo - Mínimo informado.
 * @returns {string[]} Linhas do resumo.
 */
function linhasDoResumo(alunos, minimo) {
    const total = alunos[0]?.totalQuestoes || 0;
    const resumo = resumirTurmaParaCalculo(alunos, minimo);
    const valor = (NOTA_MAXIMA_CALCULO / minimo).toLocaleString('pt-BR',
        { maximumFractionDigits: 2 });
    return [
        '👥 Alunos que começaram a prova: ' + resumo.alunos,
        '📐 Cálculo: 85% da turma já completou pelo menos ' + calcularMinimoDaTurma(alunos) +
            ' de ' + total + ' questões (mínimo sugerido).',
        '✅ Com o mínimo ' + minimo + ': ' + resumo.atingem + ' aluno(s) já atingem; cada questão ' +
            'vale ' + valor + ' ponto(s); nota máxima 10.',
        '🎯 Vai mudar o mínimo de ' + resumo.alvo.length + ' aluno(s) que ainda estão com o ' +
            'total (' + total + ' questões).',
        '🔒 Não muda: ' + resumo.comMinimoProprio + ' aluno(s) que já têm mínimo próprio.',
    ];
}

/**
 * Monta a tabela dos alunos (nome, questões completas e mínimo atual).
 * @param {Object[]} alunos - Alunos com indicadores.
 * @returns {HTMLElement} Tabela pronta.
 */
function montarTabelaCalculo(alunos) {
    const tabela = criarElementoCalculo('table', CLASSE_CALCULO + '__tabela');
    const cabecalho = tabela.createTHead().insertRow();
    ['Aluno', 'Questões completas', 'Mínimo atual'].forEach((titulo) => {
        cabecalho.appendChild(criarElementoCalculo('th', '', titulo));
    });
    const corpo = tabela.createTBody();
    [...alunos].sort((a, b) => b.completas - a.completas).forEach((aluno) => {
        const linha = corpo.insertRow();
        [aluno.nome, aluno.completas + '/' + aluno.totalQuestoes,
            aluno.minimo + '/' + aluno.totalQuestoes].forEach((valor) => {
            linha.insertCell().textContent = valor;
        });
    });
    return tabela;
}

/**
 * Grava o mínimo para os alunos que ainda estão com o total de questões.
 * @param {Object[]} alvo - Alunos a alterar (alunoId).
 * @param {{atividadeId: number, minimo: number}} dados - Atividade e mínimo.
 * @throws {Error} Se o banco recusar.
 */
async function gravarMinimoDaTurma(alvo, dados) {
    if (!alvo.length) return;
    const linhas = alvo.map((aluno) => ({ atividade_id: dados.atividadeId,
        aluno_id: aluno.alunoId, minimo: dados.minimo, definido_em: new Date().toISOString() }));
    const { error } = await obterClienteSupabase().from(TABELA_MINIMO_CALCULO)
        .upsert(linhas, { onConflict: CHAVE_MINIMO_CALCULO });
    if (error) throw new Error(error.message);
}

/**
 * Monta a estrutura do modal (resumo, campo, botões e tabela).
 * @param {Object[]} alunos - Alunos com indicadores.
 * @param {number} sugerido - Mínimo sugerido pelo cálculo.
 * @returns {Object} Elementos: fundo, resumo, campo, aplicar, fechar, aviso.
 */
function montarModalCalculo(alunos, sugerido) {
    const fundo = criarElementoCalculo('div', CLASSE_CALCULO);
    const janela = criarElementoCalculo('div', CLASSE_CALCULO + '__janela');
    janela.setAttribute('role', 'dialog');
    janela.setAttribute('aria-modal', 'true');
    const campo = document.createElement('input');
    Object.assign(campo, { type: 'number', min: '1', step: '1', value: String(sugerido),
        max: String(alunos[0].totalQuestoes), className: CLASSE_CALCULO + '__campo' });
    const rotulo = criarElementoCalculo('label', CLASSE_CALCULO + '__rotulo',
        'Mínimo de questões para a turma: ');
    rotulo.appendChild(campo);
    const tela = {
        fundo, campo,
        resumo: criarElementoCalculo('ul', CLASSE_CALCULO + '__resumo'),
        aviso: criarElementoCalculo('p', CLASSE_CALCULO + '__aviso'),
        aplicar: criarElementoCalculo('button', CLASSE_CALCULO + '__aplicar',
            '🎯 Quantidade Mínima de Questões'),
        fechar: criarElementoCalculo('button', CLASSE_CALCULO + '__fechar', '✕ Fechar'),
    };
    tela.aplicar.type = 'button';
    tela.fechar.type = 'button';
    const botoes = criarElementoCalculo('div', CLASSE_CALCULO + '__botoes');
    botoes.append(tela.fechar, tela.aplicar);
    janela.append(criarElementoCalculo('h2', CLASSE_CALCULO + '__titulo', '🧮 Cálculo Nota'),
        tela.resumo, rotulo, tela.aviso, botoes, montarTabelaCalculo(alunos));
    fundo.appendChild(janela);
    return tela;
}

/**
 * Atualiza o resumo do modal conforme o mínimo digitado.
 * @param {Object} tela - Elementos do modal.
 * @param {Object[]} alunos - Alunos com indicadores.
 * @returns {number|null} Mínimo válido ou null.
 */
function atualizarResumoCalculo(tela, alunos) {
    const total = alunos[0].totalQuestoes;
    const minimo = Number(tela.campo.value);
    const estaValido = Number.isInteger(minimo) && minimo >= 1 && minimo <= total;
    tela.aviso.textContent = estaValido ? '' : '⚠️ Informe um número inteiro de 1 a ' + total + '.';
    if (!estaValido) return null;
    tela.resumo.replaceChildren(...linhasDoResumo(alunos, minimo).map((linha) =>
        criarElementoCalculo('li', '', linha)));
    return minimo;
}

/**
 * Aplica o mínimo aos alunos que ainda estão com o total (com confirmação).
 * @param {Object} tela - Elementos do modal.
 * @param {{alunos: Object[], atividadeId: number}} dados - Alunos e atividade.
 * @param {Function} fechar - Fecha o modal com o resultado.
 */
async function aplicarMinimoDaTurma(tela, dados, fechar) {
    const minimo = atualizarResumoCalculo(tela, dados.alunos);
    if (!minimo) return;
    const { alvo } = resumirTurmaParaCalculo(dados.alunos, minimo);
    const confirmou = await confirmarPopup('Definir o mínimo de ' + minimo + ' questões para ' +
        alvo.length + ' aluno(s) que ainda estão com o total? A nota deles passa a valer sobre ' +
        minimo + ' questões (máximo 10).', { titulo: 'Quantidade Mínima de Questões',
        textoConfirmar: 'Aplicar' });
    if (!confirmou) return;
    tela.aplicar.disabled = true;
    try {
        await gravarMinimoDaTurma(alvo, { atividadeId: dados.atividadeId, minimo });
        fechar(true);
    } catch (erro) {
        tela.aviso.textContent = '❌ Não foi possível gravar: ' + erro.message;
    } finally {
        tela.aplicar.disabled = false;
    }
}

/**
 * Abre o modal "Cálculo Nota".
 * @param {{alunos: Object[], atividadeId: number}} dados - Alunos com indicadores e atividade.
 * @returns {Promise<boolean>} true se algum mínimo foi gravado.
 */
async function abrirCalculoNota(dados) {
    if (!dados.alunos.length) {
        await mostrarPopup('Ainda não há alunos com respostas para calcular.',
            { tipo: 'info', titulo: 'Cálculo Nota' });
        return false;
    }
    return new Promise((resolver) => {
        const tela = montarModalCalculo(dados.alunos, calcularMinimoDaTurma(dados.alunos));
        const fechar = (mudou) => {
            tela.fundo.remove();
            resolver(mudou);
        };
        tela.campo.addEventListener('input', () => atualizarResumoCalculo(tela, dados.alunos));
        tela.aplicar.addEventListener('click', () => aplicarMinimoDaTurma(tela, dados, fechar));
        tela.fechar.addEventListener('click', () => fechar(false));
        tela.fundo.addEventListener('click', (evento) => {
            if (evento.target === tela.fundo) fechar(false);
        });
        tela.fundo.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape') fechar(false);
        });
        document.body.appendChild(tela.fundo);
        atualizarResumoCalculo(tela, dados.alunos);
        tela.campo.focus();
    });
}

(function incluirEstiloCalculo() {
    if (!BASE_SCRIPTS_CALCULO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_CALCULO + '../css/calculo-nota-progresso.css';
    document.head.appendChild(link);
})();

window.abrirCalculoNota = abrirCalculoNota;
