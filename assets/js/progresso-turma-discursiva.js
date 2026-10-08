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
// Colunas do painel; "chave" = campo para ordenar ao clicar no título (vazio = sem ordenação).
const COLUNAS_PROGRESSO = [
    { titulo: 'Aluno', chave: 'nome' },
    { titulo: 'Questões', chave: '' },
    { titulo: 'Progresso', chave: 'percentual' },
    { titulo: 'Situação', chave: 'valorSituacao' },
    { titulo: 'Nota parcial IA', chave: 'valorNotaParcial' },
    { titulo: 'Nota IA (a confirmar)', chave: 'valorNotaFinal' },
];
const CHAVE_ORDEM_ALFABETICA = 'nome';
const ARQUIVO_GRAFICOS_PROGRESSO = 'graficos-progresso-turma.js';
const SETAS_ORDENACAO = { semOrdem: '↕', crescente: '▲', decrescente: '▼' };
const SEM_NOTA = -1;
const NOTA_MAXIMA = 10;
const TABELA_MINIMO_ALUNO = 'minimo_questoes_aluno';
const ARQUIVO_MINIMO_QUESTOES = 'minimo-questoes-discursiva.js';
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
    ordenacao: { chave: CHAVE_ORDEM_ALFABETICA, crescente: true }, ultimosAlunos: [],
    minimoPadrao: undefined, atualizarAgora: null,
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
        const atual = notas.get(chave) ||
            { nota: 0, possivel: 0, corrigidos: 0, certas: 0, meias: 0, erradas: 0 };
        const valor = Number(linha.nota_ia);
        const pontosDoTopico = pontos.get(linha.item + '|' + linha.topico) || 0;
        const estaCerta = pontosDoTopico > 0 && valor >= pontosDoTopico;
        notas.set(chave, {
            nota: atual.nota + valor,
            possivel: atual.possivel + pontosDoTopico,
            corrigidos: atual.corrigidos + 1,
            certas: atual.certas + (estaCerta ? 1 : 0),
            meias: atual.meias + (!estaCerta && valor > 0 ? 1 : 0),
            erradas: atual.erradas + (valor === 0 ? 1 : 0),
        });
    });
    return notas;
}

/**
 * Lê (uma vez) o mínimo padrão de questões da atividade (vazio = todas).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number|null>} Mínimo padrão ou null.
 */
async function carregarMinimoPadrao(atividadeId) {
    if (estadoProgressoTurma.minimoPadrao !== undefined) return estadoProgressoTurma.minimoPadrao;

    const [atividade] = await sbGet('atividade',
        'select=minimo_questoes_entrega&id=eq.' + atividadeId);
    estadoProgressoTurma.minimoPadrao = atividade?.minimo_questoes_entrega || null;
    return estadoProgressoTurma.minimoPadrao;
}

/**
 * Nota proporcional ao mínimo do aluno (cada questão vale 10 ÷ mínimo), no máximo 10.
 * @param {number} nota - Soma das notas na escala da prova (0 a 10).
 * @param {{totalQuestoes: number, minimo: number}} aluno - Total de questões e mínimo do aluno.
 * @returns {number} Nota proporcional, limitada a NOTA_MAXIMA.
 */
function notaProporcionalAoMinimo(nota, aluno) {
    return Math.min(NOTA_MAXIMA, nota * aluno.totalQuestoes / aluno.minimo);
}

/**
 * Lê do banco o progresso de cada aluno (tópicos por questão, entrega, nota da IA e nome).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Lista {nome, porQuestao, entregue, notaIa}, em ordem alfabética.
 */
async function lerProgressoDaTurma(atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [respostas, entregas, correcoes, pontos, minimos] = await Promise.all([
        sbGet(TABELA_RESPOSTAS_PROGRESSO, 'select=aluno_id,tentativa,item,texto&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa&' + filtro),
        sbGet(TABELA_CORRECAO_PROGRESSO, 'select=aluno_id,tentativa,item,topico,nota_ia&' + filtro),
        carregarPontosDosTopicos(atividadeId),
        sbGet(TABELA_MINIMO_ALUNO, 'select=aluno_id,minimo&' + filtro),
        carregarMinimoPadrao(atividadeId),
    ]);
    const minimoPorAluno = new Map(minimos.map((linha) => [linha.aluno_id, linha.minimo]));
    const notasDaIa = somarNotasDaIa(correcoes, pontos);
    const progresso = contarRespostasPorAluno(respostas);
    const ids = [...progresso.keys()];
    await carregarNomesNovos(ids);
    const entregues = new Set(entregas.map((entrega) =>
        entrega.aluno_id + '|' + entrega.tentativa));
    return ids.map((id) => ({
        alunoId: id,
        minimoDoAluno: minimoPorAluno.get(id) || null,
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
 * Monta uma barra com o percentual preenchido e o percentual escrito em cima dela.
 * @param {number} percentual - De 0 a 100.
 * @param {string} [modificador] - Modificador da barra (ex.: 'entregue').
 * @returns {HTMLElement} Bloco com o percentual e a barra.
 */
function montarBarra(percentual, modificador = '') {
    const bloco = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__bloco-barra');
    const barra = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__barra');
    if (modificador) barra.classList.add(CLASSE_PROGRESSO_TURMA + '__barra--' + modificador);
    const preenchida = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__barra-preenchida');
    preenchida.style.width = percentual + '%';
    barra.appendChild(preenchida);
    bloco.append(criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__percentual',
        percentual + '%'), barra);
    return bloco;
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
function montarCelulaNotaParcial(aluno, totalTopicos) {
    const classe = CLASSE_PROGRESSO_TURMA + '__nota-ia';
    const notaIa = aluno.notaIa;
    if (!notaIa) return criarElementoProgresso('span', classe + ' ' + classe + '--vazia', '—');

    const acerto = notaIa.possivel ? Math.round((notaIa.nota / notaIa.possivel) * 100) : 0;
    const celula = criarElementoProgresso('span', classe + ' ' + classe + '--parcial',
        '🤖 ' + formatarNotaProgresso(aluno.notaParcial) + ' · ' + acerto + '% (' +
        notaIa.corrigidos + '/' + totalTopicos + ')');
    celula.title = 'Nota parcial sugerida pela IA (sobre o mínimo de ' + aluno.minimo +
        ' questões, máximo 10): ' + notaIa.corrigidos + ' de ' + totalTopicos + ' tópicos ' +
        'corrigidos, com ' + acerto + '% de acerto nas alternativas corrigidas (prévia; vale só ' +
        'depois da confirmação do professor).';
    return celula;
}

/**
 * Monta a célula "Nota IA (a confirmar)": só com a entrega feita e todos os tópicos corrigidos.
 * @param {Object} aluno - Registro de lerProgressoDaTurma (entregue e notaIa).
 * @param {number} totalTopicos - Tópicos da prova.
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNotaFinal(aluno) {
    const classe = CLASSE_PROGRESSO_TURMA + '__nota-ia';
    const vazia = classe + ' ' + classe + '--vazia';
    if (aluno.valorNotaFinal === SEM_NOTA) return criarElementoProgresso('span', vazia, '—');

    const celula = criarElementoProgresso('span', classe,
        '🤖 ' + formatarNotaProgresso(aluno.valorNotaFinal));
    celula.title = 'Nota sugerida pela IA com a prova entregue e as respostas corrigidas ' +
        '(sobre o mínimo de ' + aluno.minimo + ' questões, máximo 10) — vale só depois da confirmação do ' +
        'professor.';
    return celula;
}

/**
 * Calcula os indicadores de um aluno usados na linha e na ordenação.
 * @param {Object} aluno - Registro de lerProgressoDaTurma.
 * @param {{topicos: Map<number, number>, totalTopicos: number}} medida - Estrutura da prova.
 * @returns {Object} Aluno com respondidos, percentual, completas e os valores de ordenação.
 */
function calcularIndicadoresDoAluno(aluno, medida) {
    const respondidos = [...aluno.porQuestao.values()].reduce((soma, valor) => soma + valor, 0);
    const percentual = Math.min(100, Math.round((respondidos / medida.totalTopicos) * 100));
    const completas = [...medida.topicos].filter(([item, total]) =>
        (aluno.porQuestao.get(item) || 0) >= total).length;
    const totalQuestoes = medida.topicos.size;
    const minimo = Math.min(totalQuestoes,
        aluno.minimoDoAluno || estadoProgressoTurma.minimoPadrao || totalQuestoes);
    const escala = { totalQuestoes, minimo };
    const notaParcial = aluno.notaIa ? notaProporcionalAoMinimo(aluno.notaIa.nota, escala) : null;
    // Nota final: entregue e todas as alternativas respondidas já corrigidas pela IA.
    const temNotaFinal = aluno.entregue && respondidos > 0 &&
        aluno.notaIa?.corrigidos >= respondidos;
    return {
        ...aluno, respondidos, percentual, completas, totalQuestoes, minimo, notaParcial,
        valorSituacao: aluno.entregue ? totalQuestoes + 1 : completas,
        valorNotaParcial: notaParcial === null ? SEM_NOTA : notaParcial,
        valorNotaFinal: temNotaFinal ? notaParcial : SEM_NOTA,
    };
}

/**
 * Compara dois alunos pela coluna escolhida (texto em ordem alfabética, números pelo valor);
 * no empate, pelo nome.
 * @param {Object} a - Aluno com indicadores.
 * @param {Object} b - Aluno com indicadores.
 * @returns {number} Resultado da comparação.
 */
function compararAlunos(a, b) {
    const { chave, crescente } = estadoProgressoTurma.ordenacao;
    const porNome = a.nome.localeCompare(b.nome, 'pt-BR');
    const diferenca = chave === CHAVE_ORDEM_ALFABETICA ? porNome : a[chave] - b[chave];
    const sentido = crescente ? 1 : -1;
    return (diferenca || porNome) * sentido;
}

/**
 * Troca a ordenação: mesma coluna inverte o sentido; outra coluna começa crescente.
 * @param {string} chave - Campo da coluna clicada.
 */
function trocarOrdenacao(chave) {
    const atual = estadoProgressoTurma.ordenacao;
    const mesmaColuna = atual.chave === chave;
    estadoProgressoTurma.ordenacao = { chave, crescente: mesmaColuna ? !atual.crescente : true };
}

/**
 * Seta do título: ↕ (sem ordem), ▲ (crescente) ou ▼ (decrescente).
 * @param {string} chave - Campo da coluna.
 * @returns {string} Seta.
 */
function setaDaColuna(chave) {
    const { chave: chaveAtual, crescente } = estadoProgressoTurma.ordenacao;
    if (chave !== chaveAtual) return SETAS_ORDENACAO.semOrdem;
    return crescente ? SETAS_ORDENACAO.crescente : SETAS_ORDENACAO.decrescente;
}

/**
 * Cria o botão de título de uma coluna ordenável.
 * @param {{titulo: string, chave: string}} coluna - Coluna.
 * @param {Function} aoOrdenar - Chamada depois de trocar a ordenação (redesenha a lista).
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoOrdenar(coluna, aoOrdenar) {
    const botao = criarElementoProgresso('button', CLASSE_PROGRESSO_TURMA + '__ordenar',
        coluna.titulo + ' ' + setaDaColuna(coluna.chave));
    botao.type = 'button';
    botao.title = 'Clique para ordenar por ' + coluna.titulo;
    botao.addEventListener('click', () => {
        trocarOrdenacao(coluna.chave);
        aoOrdenar();
    });
    return botao;
}

/**
 * Monta a linha de títulos; colunas ordenáveis viram botões com seta.
 * @param {Function} aoOrdenar - Chamada depois de trocar a ordenação (redesenha a lista).
 * @returns {HTMLElement} Linha de títulos.
 */
function montarTitulosDasColunas(aoOrdenar) {
    const linha = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__linha ' +
        CLASSE_PROGRESSO_TURMA + '__linha--titulos');
    COLUNAS_PROGRESSO.forEach((coluna) => linha.appendChild(coluna.chave
        ? criarBotaoOrdenar(coluna, aoOrdenar)
        : criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__coluna', coluna.titulo)));
    return linha;
}

/**
 * Redesenha os títulos e as linhas dos alunos na ordem escolhida (sem ler o banco de novo).
 * @param {{lista: HTMLElement}} tela - Elementos da área.
 * @param {Object} opcoes - topicos (Map) e totalTopicos.
 */
function desenharListaDeAlunos(tela, opcoes) {
    const alunos = [...estadoProgressoTurma.ultimosAlunos].sort(compararAlunos);
    tela.lista.replaceChildren(montarTitulosDasColunas(() => desenharListaDeAlunos(tela, opcoes)),
        ...alunos.map((aluno) => montarLinhaDoAluno(aluno, opcoes)));
}

/**
 * Monta a célula do nome com o botão "Quantidade Mínima de Questões" do aluno.
 * @param {Object} aluno - Aluno com indicadores (alunoId, nome, minimo, totalQuestoes).
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNomeDoAluno(aluno) {
    const celula = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__celula-nome');
    const nome = criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__nome', aluno.nome);
    nome.title = aluno.nome;
    const botao = criarElementoProgresso('button', CLASSE_PROGRESSO_TURMA + '__minimo',
        '🎯 Quantidade Mínima de Questões: ' + aluno.minimo + '/' + aluno.totalQuestoes);
    botao.type = 'button';
    if (aluno.minimoDoAluno) botao.classList.add(CLASSE_PROGRESSO_TURMA + '__minimo--proprio');
    botao.addEventListener('click', () => abrirMinimoDoAluno(aluno));
    celula.append(nome, botao);
    return celula;
}

/**
 * Abre a janela para o professor informar o mínimo de questões do aluno e atualiza o painel.
 * @param {Object} aluno - Aluno com indicadores.
 */
async function abrirMinimoDoAluno(aluno) {
    try {
        if (typeof window.abrirMinimoQuestoes !== 'function') {
            await carregarScriptProgresso(ARQUIVO_MINIMO_QUESTOES);
        }
        const mudou = await window.abrirMinimoQuestoes({
            atividadeId: estadoProgressoTurma.atividadeId, alunoId: aluno.alunoId,
            nome: aluno.nome, minimo: aluno.minimo, totalQuestoes: aluno.totalQuestoes,
            temMinimoProprio: Boolean(aluno.minimoDoAluno),
        });
        const deveAtualizar = mudou && estadoProgressoTurma.atualizarAgora;
        if (deveAtualizar) await estadoProgressoTurma.atualizarAgora();
    } catch (erro) {
        await mostrarPopup('Não foi possível abrir o mínimo de questões: ' + erro.message,
            { tipo: 'erro', titulo: 'Quantidade mínima' });
    }
}

/**
 * Monta a linha de um aluno: nome, questões, barra, situação, nota parcial e nota final da IA.
 * @param {Object} aluno - Aluno com indicadores (calcularIndicadoresDoAluno).
 * @param {{topicos: Map<number, number>, totalTopicos: number}} medida - Estrutura da prova.
 * @returns {HTMLElement} Linha pronta.
 */
function montarLinhaDoAluno(aluno, medida) {
    const situacao = aluno.entregue
        ? '✅ Entregue'
        : aluno.completas + '/' + aluno.totalQuestoes + ' questões · mín. ' + aluno.minimo;
    const linha = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__linha');
    linha.append(
        montarCelulaNomeDoAluno(aluno),
        montarCelulasDasQuestoes(aluno.porQuestao, medida.topicos),
        montarBarra(aluno.percentual, aluno.entregue ? 'entregue' : ''),
        criarElementoProgresso('span', CLASSE_PROGRESSO_TURMA + '__situacao', situacao),
        montarCelulaNotaParcial(aluno, medida.totalTopicos),
        montarCelulaNotaFinal(aluno));
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
        estadoProgressoTurma.ultimosAlunos = alunos.map((aluno) =>
            calcularIndicadoresDoAluno(aluno, opcoes));
        desenharListaDeAlunos(tela, opcoes);
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
 * Abre o modal de gráficos com os dados de agora (carrega o módulo na primeira vez).
 * @param {{topicos: Map<number, number>}} opcoes - Estrutura da prova.
 */
async function abrirGraficosDoProgresso(opcoes) {
    try {
        if (typeof window.abrirGraficosProgresso !== 'function') {
            await carregarScriptProgresso(ARQUIVO_GRAFICOS_PROGRESSO);
        }
        await window.abrirGraficosProgresso(estadoProgressoTurma.ultimosAlunos, opcoes);
    } catch (erro) {
        await mostrarPopup('Não foi possível abrir os gráficos: ' + erro.message,
            { tipo: 'erro', titulo: 'Gráficos' });
    }
}

/**
 * Carrega um script de assets/js/ (ao lado deste).
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarScriptProgresso(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_PROGRESSO + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Monta o cabeçalho do painel: título e botão "📈 Gráficos".
 * @param {{topicos: Map<number, number>}} opcoes - Estrutura da prova.
 * @returns {HTMLElement} Cabeçalho pronto.
 */
function montarCabecalhoProgresso(opcoes) {
    const cabecalho = criarElementoProgresso('div', CLASSE_PROGRESSO_TURMA + '__cabecalho');
    const botao = criarElementoProgresso('button', CLASSE_PROGRESSO_TURMA + '__graficos',
        '📈 Gráficos');
    botao.type = 'button';
    botao.title = 'Abrir 5 gráficos do progresso da turma';
    botao.addEventListener('click', () => abrirGraficosDoProgresso(opcoes));
    cabecalho.append(criarElementoProgresso('h2', CLASSE_PROGRESSO_TURMA + '__titulo',
        '📊 Progresso da turma (só o professor vê · atualiza a cada 5 segundos)'), botao);
    return cabecalho;
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
    area.append(montarCabecalhoProgresso(opcoes), montarLegendaProgresso(), tela.resumo,
        tela.lista);
    cabecalho.after(area);

    estadoProgressoTurma.atividadeId = atividadeId;
    estadoProgressoTurma.atualizarAgora = () => atualizarProgressoDaTurma(tela, opcoes);
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
