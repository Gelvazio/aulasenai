// Professor: progresso da turma no topo da avaliação discursiva — uma linha por aluno, com uma
// célula por questão (vazia, em andamento ou completa), a barra geral e a entrega. Montado em
// tempo de execução e atualizado a cada 5 segundos. Só aparece para o professor e só quando o
// <body> tem data-progresso-professor="sim" (campo "- **Progresso para o professor:** sim" da
// fonte .md). Colunas da IA (correcao_discursiva): "Nota parcial IA" (soma do que a IA já corrigiu,
// também antes da entrega) e "Nota IA (a confirmar)" (só com a entrega toda corrigida).
// O RLS limita aos alunos das turmas do professor. Nada é gravado.
// Carregado por assets/js/avaliacao-discursiva.js. Depende de js/supabase.js (sbGet).
// Regra: docs/regras/atividades.md

const CLASSE_PROGRESSO_TURMA = 'progresso-turma';
const INTERVALO_ATUALIZACAO_PROGRESSO_MS = 5000;
const TABELA_RESPOSTAS_PROGRESSO = 'resposta_discursiva';
const TABELA_CORRECAO_PROGRESSO = 'correcao_discursiva';
const TITULOS_COLUNAS_PROGRESSO = ['Aluno', 'Questões', 'Progresso', 'Situação',
    'Nota parcial IA', 'Nota IA (a confirmar)'];
const SELETOR_TOPICO_PROGRESSO = '.topico-resposta';
const SELETOR_CABECALHO_ATIVIDADE = '.container > header';
const BASE_SCRIPTS_PROGRESSO = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const SITUACOES_QUESTAO = {
    vazia: { modificador: 'vazia', texto: 'sem resposta' },
    andamento: { modificador: 'andamento', texto: 'em andamento' },
    completa: { modificador: 'completa', texto: 'completa' },
};

const estadoProgressoTurma = {
    nomes: new Map(), pontosDosTopicos: null, temporizador: null, lendo: false,
};

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoProgresso(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Lê da página quantos tópicos tem cada questão (data-item dos blocos de tópico).
 * @returns {Map<number, number>} Questão → quantidade de tópicos, em ordem.
 */
function lerTopicosPorQuestao() {
    const topicos = new Map();
    document.querySelectorAll(SELETOR_TOPICO_PROGRESSO).forEach((bloco) => {
        const item = Number(bloco.dataset.item);
        topicos.set(item, (topicos.get(item) || 0) + 1);
    });
    return new Map([...topicos.entries()].sort((a, b) => a[0] - b[0]));
}

/**
 * Conta, por aluno, os tópicos com texto em cada questão (só a tentativa mais recente).
 * @param {Object[]} respostas - Linhas {aluno_id, tentativa, item, texto}.
 * @returns {Map<string, {tentativa: number, porQuestao: Map<number, number>}>} Por aluno.
 */
function contarRespostasPorAluno(respostas) {
    const progresso = new Map();
    respostas.forEach((linha) => {
        const atual = progresso.get(linha.aluno_id);
        if (!atual || linha.tentativa > atual.tentativa) {
            progresso.set(linha.aluno_id, { tentativa: linha.tentativa, porQuestao: new Map() });
        }
        const registro = progresso.get(linha.aluno_id);
        const contaNestaTentativa = linha.tentativa === registro.tentativa &&
            (linha.texto || '').trim() !== '';
        if (!contaNestaTentativa) return;
        registro.porQuestao.set(linha.item, (registro.porQuestao.get(linha.item) || 0) + 1);
    });
    return progresso;
}

/**
 * Busca no banco só os nomes de alunos ainda não conhecidos (o resto vem da memória da página).
 * @param {string[]} ids - Ids dos alunos com resposta.
 */
async function carregarNomesNovos(ids) {
    const novos = ids.filter((id) => !estadoProgressoTurma.nomes.has(id));
    if (!novos.length) return;

    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + novos.join(',') + ')');
    alunos.forEach((aluno) => estadoProgressoTurma.nomes.set(aluno.id, aluno.nome));
}

/**
 * Lê (uma vez) os pontos de cada tópico da atividade, para o percentual de acerto.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Map<string, number>>} Chave "item|topico" → pontos.
 */
async function carregarPontosDosTopicos(atividadeId) {
    if (estadoProgressoTurma.pontosDosTopicos) return estadoProgressoTurma.pontosDosTopicos;

    const topicos = await sbGet('topico_discursivo',
        'select=item,topico,pontos&atividade_id=eq.' + atividadeId);
    estadoProgressoTurma.pontosDosTopicos = new Map(topicos.map((topico) =>
        [topico.item + '|' + topico.topico, Number(topico.pontos)]));
    return estadoProgressoTurma.pontosDosTopicos;
}

/**
 * Soma, por aluno e tentativa, a nota da IA, os pontos possíveis e os tópicos já corrigidos.
 * @param {Object[]} correcoes - Linhas {aluno_id, tentativa, item, topico, nota_ia}.
 * @param {Map<string, number>} pontos - Pontos de cada tópico ("item|topico").
 * @returns {Map<string, {nota: number, possivel: number, corrigidos: number}>} "aluno|tentativa".
 */
function somarNotasDaIa(correcoes, pontos) {
    const notas = new Map();
    correcoes.forEach((linha) => {
        if (linha.nota_ia === null || linha.nota_ia === undefined) return;
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const atual = notas.get(chave) || { nota: 0, possivel: 0, corrigidos: 0 };
        notas.set(chave, {
            nota: atual.nota + Number(linha.nota_ia),
            possivel: atual.possivel + (pontos.get(linha.item + '|' + linha.topico) || 0),
            corrigidos: atual.corrigidos + 1,
        });
    });
    return notas;
}

/**
 * Lê do banco o progresso de cada aluno (tópicos por questão, entrega, nota da IA e nome).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Lista {nome, porQuestao, entregue, notaIa}, em ordem alfabética.
 */
async function lerProgressoDaTurma(atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [respostas, entregas, correcoes, pontos] = await Promise.all([
        sbGet(TABELA_RESPOSTAS_PROGRESSO, 'select=aluno_id,tentativa,item,texto&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa&' + filtro),
        sbGet(TABELA_CORRECAO_PROGRESSO, 'select=aluno_id,tentativa,item,topico,nota_ia&' + filtro),
        carregarPontosDosTopicos(atividadeId),
    ]);
    const notasDaIa = somarNotasDaIa(correcoes, pontos);
    const progresso = contarRespostasPorAluno(respostas);
    const ids = [...progresso.keys()];
    await carregarNomesNovos(ids);
    const entregues = new Set(entregas.map((entrega) =>
        entrega.aluno_id + '|' + entrega.tentativa));
    return ids.map((id) => ({
        nome: estadoProgressoTurma.nomes.get(id) || 'Aluno sem nome',
        porQuestao: progresso.get(id).porQuestao,
        entregue: entregues.has(id + '|' + progresso.get(id).tentativa),
        notaIa: notasDaIa.get(id + '|' + progresso.get(id).tentativa) || null,
    })).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/**
 * Situação de uma questão para um aluno (vazia, em andamento ou completa).
 * @param {number} respondidos - Tópicos com texto na questão.
 * @param {number} total - Tópicos da questão.
 * @returns {Object} Item de SITUACOES_QUESTAO.
 */
function situacaoDaQuestao(respondidos, total) {
    if (!respondidos) return SITUACOES_QUESTAO.vazia;
    if (respondidos < total) return SITUACOES_QUESTAO.andamento;
    return SITUACOES_QUESTAO.completa;
}

/**
 * Monta as células das questões de um aluno (Q01, Q02... com a cor da situação).
 * @param {Map<number, number>} porQuestao - Tópicos respondidos por questão.
 * @param {Map<number, number>} topicos - Tópicos de cada questão.
 * @returns {HTMLElement} Grade de células.
 */
function montarCelulasDasQuestoes(porQuestao, topicos) {
    const grade = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__questoes');
    topicos.forEach((total, item) => {
        const respondidos = porQuestao.get(item) || 0;
        const situacao = situacaoDaQuestao(respondidos, total);
        const numero = String(item).padStart(2, '0');
        const celula = criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__questao ' +
            CLASSE_PROGRESSO_TURMA + '__questao--' + situacao.modificador, numero);
        celula.title = 'Questão ' + numero + ': ' + respondidos + ' de ' + total + ' tópicos (' +
            situacao.texto + ')';
        grade.appendChild(celula);
    });
    return grade;
}

/**
 * Monta uma barra com o percentual preenchido.
 * @param {number} percentual - De 0 a 100.
 * @param {string} [modificador] - Modificador da barra (ex.: 'entregue').
 * @returns {HTMLElement} Barra pronta.
 */
function montarBarra(percentual, modificador = '') {
    const barra = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__barra');
    if (modificador) barra.classList.add(CLASSE_PROGRESSO_TURMA + '__barra--' + modificador);
    const preenchida = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__barra-preenchida');
    preenchida.style.width = percentual + '%';
    barra.appendChild(preenchida);
    return barra;
}

/**
 * Formata uma nota com duas casas decimais (ex.: 7,35).
 * @param {number} nota - Nota.
 * @returns {string} Nota formatada.
 */
function formatarNotaProgresso(nota) {
    return nota.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Monta a célula "Nota parcial IA": soma do que a IA já corrigiu, mesmo antes da entrega.
 * @param {{nota: number, corrigidos: number}|null} notaIa - Nota da IA do aluno.
 * @param {number} totalTopicos - Tópicos da prova.
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNotaParcial(notaIa, totalTopicos) {
    const classe = CLASSE_PROGRESSO_TURMA + '__nota-ia';
    if (!notaIa) return criarElementoProgresso('span', classe + ' ' + classe + '--vazia', '—');

    const acerto = notaIa.possivel ? Math.round((notaIa.nota / notaIa.possivel) * 100) : 0;
    const celula = criarElementoProgresso('span', classe + ' ' + classe + '--parcial',
        '🤖 ' + formatarNotaProgresso(notaIa.nota) + ' · ' + acerto + '% (' +
        notaIa.corrigidos + '/' + totalTopicos + ')');
    celula.title = 'Nota parcial sugerida pela IA: ' + notaIa.corrigidos + ' de ' + totalTopicos +
        ' tópicos corrigidos até agora, com ' + acerto + '% de acerto nas alternativas ' +
        'corrigidas (prévia; vale só depois da confirmação do professor).';
    return celula;
}

/**
 * Monta a célula "Nota IA (a confirmar)": só com a entrega feita e todos os tópicos corrigidos.
 * @param {Object} aluno - Registro de lerProgressoDaTurma (entregue e notaIa).
 * @param {number} totalTopicos - Tópicos da prova.
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNotaFinal(aluno, totalTopicos) {
    const classe = CLASSE_PROGRESSO_TURMA + '__nota-ia';
    const estaCompleta = aluno.entregue && aluno.notaIa?.corrigidos >= totalTopicos;
    const vazia = classe + ' ' + classe + '--vazia';
    if (!estaCompleta) return criarElementoProgresso('span', vazia, '—');

    const celula = criarElementoProgresso('span', classe,
        '🤖 ' + formatarNotaProgresso(aluno.notaIa.nota));
    celula.title = 'Nota sugerida pela IA com a prova entregue e toda corrigida — vale só ' +
        'depois da confirmação do professor em CORREÇÃO.';
    return celula;
}

/**
 * Monta a linha de títulos das colunas.
 * @returns {HTMLElement} Linha de títulos.
 */
function montarTitulosDasColunas() {
    const linha = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__linha ' +
        CLASSE_PROGRESSO_TURMA + '__linha--titulos');
    TITULOS_COLUNAS_PROGRESSO.forEach((titulo) => linha.appendChild(
        criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__coluna', titulo)));
    return linha;
}

/**
 * Monta a linha de um aluno: nome, questões, barra, situação, nota parcial e nota final da IA.
 * @param {Object} aluno - Registro de lerProgressoDaTurma.
 * @param {{topicos: Map<number, number>, totalTopicos: number}} medida - Estrutura da prova.
 * @returns {HTMLElement} Linha pronta.
 */
function montarLinhaDoAluno(aluno, medida) {
    const respondidos = [...aluno.porQuestao.values()].reduce((soma, valor) => soma + valor, 0);
    const percentual = Math.min(100, Math.round((respondidos / medida.totalTopicos) * 100));
    const completas = [...medida.topicos].filter(([item, total]) =>
        (aluno.porQuestao.get(item) || 0) >= total).length;
    const situacao = aluno.entregue
        ? '✅ Entregue'
        : completas + '/' + medida.topicos.size + ' questões · ' + percentual + '%';
    const linha = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__linha');
    linha.append(
        criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__nome', aluno.nome),
        montarCelulasDasQuestoes(aluno.porQuestao, medida.topicos),
        montarBarra(percentual, aluno.entregue ? 'entregue' : ''),
        criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__situacao', situacao),
        montarCelulaNotaParcial(aluno.notaIa, medida.totalTopicos),
        montarCelulaNotaFinal(aluno, medida.totalTopicos));
    return linha;
}

/**
 * Monta o resumo da turma e a barra geral (tópicos respondidos de todos os alunos).
 * @param {Object[]} alunos - Progresso dos alunos.
 * @param {number} totalTopicos - Tópicos da prova.
 * @returns {HTMLElement[]} Texto do resumo e barra geral.
 */
function montarResumoDaTurma(alunos, totalTopicos) {
    const entregaram = alunos.filter((aluno) => aluno.entregue).length;
    const respondidos = alunos.reduce((soma, aluno) => soma +
        [...aluno.porQuestao.values()].reduce((parcial, valor) => parcial + valor, 0), 0);
    const percentual = Math.round((respondidos / (alunos.length * totalTopicos)) * 100);
    const hora = new Date().toLocaleTimeString('pt-BR');
    const texto = alunos.length + ' aluno(s) começaram · ' + entregaram + ' entregaram · ' +
        'turma com ' + percentual + '% respondido · atualizado às ' + hora;
    return [criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__resumo', texto),
        montarBarra(percentual, 'geral')];
}

/**
 * Lê o banco e redesenha o resumo e as linhas dos alunos (sem leituras sobrepostas).
 * @param {{resumo: HTMLElement, lista: HTMLElement}} tela - Elementos da área.
 * @param {Object} opcoes - atividadeId, topicos (Map) e totalTopicos.
 */
async function atualizarProgressoDaTurma(tela, opcoes) {
    if (estadoProgressoTurma.lendo) return;

    estadoProgressoTurma.lendo = true;
    try {
        const alunos = await lerProgressoDaTurma(opcoes.atividadeId);
        if (!alunos.length) {
            tela.resumo.replaceChildren('Nenhum aluno das suas turmas começou ainda · ' +
                'atualizado às ' + new Date().toLocaleTimeString('pt-BR'));
            tela.lista.replaceChildren();
            return;
        }
        tela.resumo.replaceChildren(...montarResumoDaTurma(alunos, opcoes.totalTopicos));
        tela.lista.replaceChildren(montarTitulosDasColunas(),
            ...alunos.map((aluno) => montarLinhaDoAluno(aluno, opcoes)));
    } catch (erro) {
        tela.resumo.replaceChildren('❌ Não foi possível ler o progresso: ' + erro.message);
    } finally {
        estadoProgressoTurma.lendo = false;
    }
}

/**
 * Monta a legenda das cores das questões.
 * @returns {HTMLElement} Legenda.
 */
function montarLegendaProgresso() {
    const legenda = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__legenda');
    Object.values(SITUACOES_QUESTAO).forEach((situacao) => {
        legenda.appendChild(criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA +
            '__questao ' + CLASSE_PROGRESSO_TURMA + '__questao--' + situacao.modificador,
        situacao.texto));
    });
    return legenda;
}

/**
 * Monta a área "Progresso da turma" no topo da atividade e a atualiza a cada 5 segundos.
 * @param {number} atividadeId - Id da atividade no banco.
 */
async function montarProgressoDaTurma(atividadeId) {
    const cabecalho = document.querySelector(SELETOR_CABECALHO_ATIVIDADE);
    const jaExiste = document.querySelector('.' + CLASSE_PROGRESSO_TURMA);
    if (!cabecalho || jaExiste) return;

    const topicos = lerTopicosPorQuestao();
    const opcoes = { atividadeId, topicos,
        totalTopicos: [...topicos.values()].reduce((soma, valor) => soma + valor, 0) };
    const area = criarElementoProgresso('section', CLASSE_PROGRESSO_TURMA);
    const tela = {
        resumo: criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__geral', 'Lendo...'),
        lista: criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__lista'),
    };
    area.append(criarElementoProgresso('h2', CLASSE_PROGRESSO_TURMA + '__titulo',
        '📊 Progresso da turma (só o professor vê · atualiza a cada 5 segundos)'),
    montarLegendaProgresso(), tela.resumo, tela.lista);
    cabecalho.after(area);

    await atualizarProgressoDaTurma(tela, opcoes);
    estadoProgressoTurma.temporizador = setInterval(() => atualizarProgressoDaTurma(tela, opcoes),
        INTERVALO_ATUALIZACAO_PROGRESSO_MS);
}

(function incluirEstiloProgressoTurma() {
    if (!BASE_SCRIPTS_PROGRESSO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_PROGRESSO + '../css/progresso-turma-discursiva.css';
    document.head.appendChild(link);
})();

window.montarProgressoDaTurma = montarProgressoDaTurma;
