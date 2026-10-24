// Professor: Progresso da turma GLOBAL no topo de TODA atividade que grava no banco (objetiva e
// discursiva), aberto junto com a página: uma linha por aluno, com uma célula por questão
// (vazia, em andamento ou completa), barra do aluno, situação ("✅ Entregue"), mínimo de
// questões, nota parcial e nota final; no alto, o resumo e a barra geral da turma, e os botões
// "📈 Gráficos" e "🧮 Cálculo Nota". Atualizado a cada 5 segundos. Nada é gravado aqui (o mínimo
// é gravado pela janela própria). Os dados vêm de assets/js/progresso-turma-fontes.js (objetiva:
// acertos pelo banco; discursiva: nota parcial da IA). O RLS limita aos alunos das turmas do
// professor. Ligado por assets/js/respostas-atividade.js (objetivas) e
// assets/js/avaliacao-discursiva.js (discursivas). Substitui o antigo
// progresso-turma-discursiva.js (2026-10-09). Botão "✅ CONFIRMAR TODA CORREÇÃO DE IA" (só
// discursiva) acima da coluna "Aluno": roda o "Confirmar Todas" de cada aluno listado, com
// popup antes (confirmar-toda-correcao-ia-progresso.js). Depende de js/supabase.js e
// assets/js/popup.js.
// Com <body data-marcar-entregue="sim">: "Marcar como entregue" / "Desfazer entrega" na situação
// do aluno (marcar-entregue-professor.js) e a lista dos alunos sem nenhuma resposta
// (alunos-sem-inicio-entrega.js).
// Combobox "Questões respondidas" filtra a lista por faixa (filtro-respondidas-progresso.js);
// ON/OFF "Tarefa Entregue?" (desligado: só quem não entregou; ligado: só quem entregou;
// filtro-entregue-progresso.js). "Mostrando N de T alunos" conta a lista com todos os filtros.
// ON/OFF "RECUPERAÇÃO" pela nota final (ligado < 7 = recuperação, desligado >= 7;
// filtro-recuperacao-progresso.js). ON/OFF "Prova Corrigida" (desligado: não corrigidas;
// filtro-corrigida-progresso.js). ON/OFF "Nota IA Gerada" (desligado: só quem ainda não tem a
// nota final da IA; ligado: só quem já tem; filtro-nota-ia-progresso.js). ON/OFF "ABAIXO DA
// MEDIA" (ligado: só quem tirou menos que 7; desligado: todos; filtro-abaixo-media-progresso.js).
// ON/OFF "ABAIXO MEDIA(IA)" (igual, pela nota sugerida da IA; filtro-abaixo-media-ia-progresso.js).
// ON/OFF "MEDIA ATINGIDA(IA)" (só quem tem 70% ou mais na IA; filtro-media-atingida-ia-progresso).
// Combo "Aluno" ao lado do "Turma" deixa só a linha do aluno escolhido
// (filtro-aluno-progresso.js).
// As escolhas dos filtros e do "Mostrar quem faltou" ficam no localStorage; sem elas, o padrão.
// A lista tem TODOS os alunos da turma escolhida no combo "Turma" ao lado do título (abre na
// turma favorita), também quem não respondeu nada (alunos-da-turma-progresso.js).
// ON/OFF "Faltou?" por aluno e "Mostrar quem faltou" em cima (falta-aluno-progresso.js; a falta
// vale para o dia da atividade).
// ON/OFF "Mostrar quadro" ao lado do título (desligado: esconde o quadro; mostrar-quadro-
// progresso.js). Painel "Correção de IA" só nas discursivas (correcao-ia-progresso.js).
// Plano: docs/progresso-global-atividades.md · Regra: docs/regras/atividades.md

const CLASSE_PROGRESSO_GLOBAL = 'progresso-turma';
// Modificador do 'Mostrar quadro' desligado (mostrar-quadro-progresso.js).
const CLASSE_RECOLHIDO_PROGRESSO_GLOBAL = CLASSE_PROGRESSO_GLOBAL + '--recolhido';
const INTERVALO_PROGRESSO_GLOBAL_MS = 5000;
const CHAVE_ORDEM_ALFABETICA_GLOBAL = 'nome';
const ARQUIVO_FONTES_PROGRESSO_GLOBAL = 'progresso-turma-fontes.js';
const ARQUIVO_GRAFICOS_PROGRESSO_GLOBAL = 'graficos-progresso-turma.js';
const ARQUIVO_MINIMO_PROGRESSO_GLOBAL = 'minimo-questoes-discursiva.js';
const ARQUIVO_CALCULO_PROGRESSO_GLOBAL = 'calculo-nota-progresso.js';
const ARQUIVO_CSS_PROGRESSO_GLOBAL = '../css/progresso-turma-global.css';
const ARQUIVO_ENTREGA_PROGRESSO_GLOBAL = 'marcar-entregue-professor.js';
const ARQUIVO_SEM_INICIO_PROGRESSO_GLOBAL = 'alunos-sem-inicio-entrega.js';
const ARQUIVO_FILTRO_PROGRESSO_GLOBAL = 'filtro-respondidas-progresso.js';
const ARQUIVO_ALUNOS_TURMA_PROGRESSO_GLOBAL = 'alunos-da-turma-progresso.js';
const ARQUIVO_FALTAS_PROGRESSO_GLOBAL = 'falta-aluno-progresso.js';
const SELETOR_POPUP_ABERTO_GLOBAL = '.popup__fundo';
const ARQUIVO_FILTRO_ENTREGUE_PROGRESSO_GLOBAL = 'filtro-entregue-progresso.js';
const ARQUIVO_FILTRO_ALUNO_PROGRESSO_GLOBAL = 'filtro-aluno-progresso.js';
const ARQUIVO_FILTRO_RECUPERACAO_PROGRESSO_GLOBAL = 'filtro-recuperacao-progresso.js';
const ARQUIVO_FILTRO_CORRIGIDA_PROGRESSO_GLOBAL = 'filtro-corrigida-progresso.js';
const ARQUIVO_FILTRO_NOTA_IA_PROGRESSO_GLOBAL = 'filtro-nota-ia-progresso.js';
const ARQUIVO_FILTRO_ABAIXO_MEDIA_PROGRESSO_GLOBAL = 'filtro-abaixo-media-progresso.js';
const ARQUIVO_FILTRO_ABAIXO_MEDIA_IA_PROGRESSO_GLOBAL = 'filtro-abaixo-media-ia-progresso.js';
const ARQUIVO_FILTRO_MEDIA_ATINGIDA_IA_PROGRESSO_GLOBAL = 'filtro-media-atingida-ia-progresso.js';
const ARQUIVO_MOSTRAR_QUADRO_PROGRESSO_GLOBAL = 'mostrar-quadro-progresso.js';
const ARQUIVO_CORRECAO_IA_PROGRESSO_GLOBAL = 'correcao-ia-progresso.js';
// Prefixo das escolhas dos filtros guardadas no navegador (só preferência de tela, sem dado
// de aluno nem gabarito).
const PREFIXO_PREFERENCIA_PROGRESSO_GLOBAL = 'progresso-turma:';
// Colunas extras por tipo: módulo e função que cria a coluna ({titulo, classeArea, atualizar,
// montarCelula(aluno), aoMudar}); o painel preenche aoMudar (atualizar depois do botão).
const COLUNAS_EXTRAS_POR_TIPO_GLOBAL = {
    discursiva: [{ arquivo: 'suspeita-copia-discursiva.js', funcao: 'criarColunaSuspeitaCopia' }],
};
// Botões do nome do aluno (recebem {atividadeId, aluno, aoMudar}; devolvem botão ou null).
const ENTREGA_GLOBAL = { arquivo: 'confirmar-entrega-professor.js',
    funcao: 'criarBotaoConfirmarEntrega' };
const BOTOES_NOME_POR_TIPO_GLOBAL = {
    discursiva: [{ arquivo: 'confirmar-todas-professor.js', funcao: 'criarBotaoConfirmarTodas' }],
};
// "CONFIRMAR TODA CORREÇÃO DE IA" (só discursiva): usa o 'Confirmar Todas' de cada aluno, por
// isso o módulo dele carrega primeiro.
const ARQUIVOS_CONFIRMAR_TODA_CORRECAO_IA_GLOBAL = ['confirmar-todas-professor.js',
    'confirmar-toda-correcao-ia-progresso.js'];
const VALOR_LIGADO_ENTREGA_GLOBAL = 'sim';
const SELETOR_CABECALHO_PROGRESSO_GLOBAL = '.container > header';
const TIPO_PADRAO_PROGRESSO_GLOBAL = 'discursiva';
const CLASSE_INTERRUPTOR_PROGRESSO_GLOBAL = 'progresso-turma__interruptor';
const TEXTO_SELECIONAR_TODOS_GLOBAL = 'Selecionar todos';
const SEM_NOTA_PROGRESSO_GLOBAL = -1;
const NOTA_MAXIMA_PROGRESSO_GLOBAL = 10;
const BASE_SCRIPTS_PROGRESSO_GLOBAL = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const SETAS_ORDENACAO_GLOBAL = { semOrdem: '↕', crescente: '▲', decrescente: '▼' };
const SITUACOES_QUESTAO_GLOBAL = {
    vazia: { modificador: 'vazia', texto: 'sem resposta' },
    andamento: { modificador: 'andamento', texto: 'em andamento' },
    completa: { modificador: 'completa', texto: 'completa' },
};

const estadoProgressoGlobal = {
    temporizador: null, lendo: false, ultimosAlunos: [], atualizarAgora: null,
    ordenacao: { chave: CHAVE_ORDEM_ALFABETICA_GLOBAL, crescente: true },
    atividadeId: null, fonte: null, memoria: { nomes: new Map() }, colunasExtras: [],
    botoesNome: [], filtro: null, faltas: null, filtrosDaLista: [], alunosVisiveis: [],
    // Seleção do botão "Confirmar toda correção de IA" (null = sem o botão, só discursiva).
    selecaoConfirmar: null, caixaSelecionarTodos: null, botaoConfirmarToda: null,
};

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoProgressoGlobal(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Carrega um script de assets/js/ (ao lado deste).
 * @param {string} arquivo - Nome do script.
 * @returns {Promise<void>} Resolve quando carregou.
 */
function carregarScriptProgressoGlobal(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = BASE_SCRIPTS_PROGRESSO_GLOBAL + arquivo;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar ' + arquivo));
        document.head.appendChild(script);
    });
}

/**
 * Colunas do painel; "chave" = campo para ordenar ao clicar no título (vazio = sem ordenação).
 * Os títulos das notas vêm do tipo da atividade (objetiva ou discursiva).
 * @returns {{titulo: string, chave: string}[]} Colunas.
 */
function colunasDoProgressoGlobal() {
    const { textos } = estadoProgressoGlobal.fonte;
    return [
        { titulo: 'Aluno', chave: 'nome' },
        { titulo: 'Questões', chave: '' },
        { titulo: 'Progresso', chave: 'percentual' },
        { titulo: 'Situação', chave: 'valorSituacao' },
        { titulo: textos.colunaParcial, chave: 'valorNotaParcial' },
        { titulo: textos.colunaFinal, chave: 'valorNotaFinal' },
        ...estadoProgressoGlobal.colunasExtras.map((coluna) => ({ titulo: coluna.titulo,
            chave: '' })),
    ];
}

/**
 * Situação de uma questão para um aluno (vazia, em andamento ou completa).
 * @param {number} respondidas - Partes respondidas na questão.
 * @param {number} total - Partes da questão.
 * @returns {Object} Item de SITUACOES_QUESTAO_GLOBAL.
 */
function situacaoDaQuestaoGlobal(respondidas, total) {
    if (!respondidas) return SITUACOES_QUESTAO_GLOBAL.vazia;
    if (respondidas < total) return SITUACOES_QUESTAO_GLOBAL.andamento;
    return SITUACOES_QUESTAO_GLOBAL.completa;
}

/**
 * Monta as células das questões de um aluno (01, 02... com a cor da situação).
 * @param {Map<number, number>} porQuestao - Partes respondidas por questão.
 * @param {Map<number, number>} estrutura - Partes de cada questão.
 * @returns {HTMLElement} Grade de células.
 */
function montarCelulasDasQuestoesGlobal(porQuestao, estrutura) {
    const { partes } = estadoProgressoGlobal.fonte.textos;
    const grade = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__questoes');
    estrutura.forEach((total, item) => {
        const respondidas = porQuestao.get(item) || 0;
        const situacao = situacaoDaQuestaoGlobal(respondidas, total);
        const numero = String(item).padStart(2, '0');
        const celula = criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL +
            '__questao ' + CLASSE_PROGRESSO_GLOBAL + '__questao--' + situacao.modificador, numero);
        celula.title = 'Questão ' + numero + ': ' + respondidas + ' de ' + total + ' ' + partes +
            ' (' + situacao.texto + ')';
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
function montarBarraGlobal(percentual, modificador = '') {
    const bloco = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__bloco-barra');
    const barra = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__barra');
    if (modificador) barra.classList.add(CLASSE_PROGRESSO_GLOBAL + '__barra--' + modificador);
    const preenchida = criarElementoProgressoGlobal('div',
        CLASSE_PROGRESSO_GLOBAL + '__barra-preenchida');
    preenchida.style.width = percentual + '%';
    barra.appendChild(preenchida);
    bloco.append(criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL + '__percentual',
        percentual + '%'), barra);
    return bloco;
}

/**
 * Formata uma nota com duas casas decimais (ex.: 7,35).
 * @param {number} nota - Nota.
 * @returns {string} Nota formatada.
 */
function formatarNotaProgressoGlobal(nota) {
    return nota.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Monta a célula da nota parcial: nota sobre o mínimo, % de acerto no que já foi corrigido e
 * quantas partes já foram corrigidas (vale também antes da entrega).
 * @param {Object} aluno - Aluno com indicadores.
 * @param {number} totalPartes - Partes da prova.
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNotaParcialGlobal(aluno, totalPartes) {
    const classe = CLASSE_PROGRESSO_GLOBAL + '__nota-ia';
    const { textos } = estadoProgressoGlobal.fonte;
    const { correcao } = aluno;
    if (!correcao) return criarElementoProgressoGlobal('span', classe + ' ' + classe + '--vazia',
        '—');

    const acerto = correcao.possivel ? Math.round((correcao.nota / correcao.possivel) * 100) : 0;
    const celula = criarElementoProgressoGlobal('span', classe + ' ' + classe + '--parcial',
        textos.icone + ' ' + formatarNotaProgressoGlobal(aluno.notaParcial) + ' · ' + acerto +
        '% (' + correcao.corrigidos + '/' + totalPartes + ')');
    celula.title = textos.dicaParcial + ' Questões na nota: ' + aluno.questoesNota + '; ' +
        correcao.corrigidos + ' de ' + totalPartes + ' ' + textos.partes + ' com resultado, ' +
        acerto + '% de acerto nas ' + textos.descricaoAcerto + '.';
    return celula;
}

/**
 * Monta a célula da nota final: a nota confirmada pelo professor (🎓) quando a prova está
 * corrigida; senão a sugerida pela IA (🤖), só com a entrega feita e tudo corrigido pela IA.
 * @param {Object} aluno - Aluno com indicadores.
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNotaFinalGlobal(aluno) {
    const classe = CLASSE_PROGRESSO_GLOBAL + '__nota-ia';
    const { textos } = estadoProgressoGlobal.fonte;
    if (aluno.valorNotaFinal === SEM_NOTA_PROGRESSO_GLOBAL) {
        return criarElementoProgressoGlobal('span', classe + ' ' + classe + '--vazia', '—');
    }
    if (aluno.notaDoProfessor !== null && aluno.notaDoProfessor !== undefined) {
        const confirmada = criarElementoProgressoGlobal('span', classe + ' ' + classe +
            '--professor', textos.iconeProfessor + ' ' +
            formatarNotaProgressoGlobal(aluno.notaDoProfessor));
        confirmada.title = textos.dicaProfessor + ' Questões na nota: ' + aluno.questoesNota;
        return confirmada;
    }

    const celula = criarElementoProgressoGlobal('span', classe,
        textos.icone + ' ' + formatarNotaProgressoGlobal(aluno.valorNotaFinal));
    celula.title = textos.dicaFinal + ' Questões na nota: ' + aluno.questoesNota + '.';
    return celula;
}

/**
 * Nota proporcional ao mínimo do aluno (cada questão vale 10 ÷ mínimo), no máximo 10.
 * @param {number} nota - Nota na escala da prova inteira (0 a 10).
 * @param {{totalQuestoes: number, minimo: number}} escala - Total de questões e mínimo.
 * @returns {number} Nota proporcional, limitada a 10.
 */
function notaProporcionalGlobal(nota, escala) {
    return Math.min(NOTA_MAXIMA_PROGRESSO_GLOBAL, nota * escala.totalQuestoes / escala.minimo);
}

/**
 * Calcula os indicadores de um aluno usados na linha, na ordenação e nos módulos auxiliares.
 * @param {Object} aluno - Aluno no formato comum (progresso-turma-fontes.js).
 * @param {{estrutura: Map<number, number>, totalPartes: number}} medida - Estrutura da prova.
 * @returns {Object} Aluno com respondidos, percentual, completas, mínimo e as notas.
 */
function calcularIndicadoresDoAlunoGlobal(aluno, medida) {
    const respondidos = [...aluno.porQuestao.values()].reduce((soma, valor) => soma + valor, 0);
    const percentual = Math.min(100, Math.round((respondidos / medida.totalPartes) * 100));
    const completas = [...medida.estrutura].filter(([item, total]) =>
        (aluno.porQuestao.get(item) || 0) >= total).length;
    const totalQuestoes = medida.estrutura.size;
    const minimo = Math.min(totalQuestoes,
        aluno.minimoDoAluno || estadoProgressoGlobal.memoria.minimoPadrao || totalQuestoes);
    // "Quantidade Questão Considerar": quantas questões contam na nota (vazio = o mínimo).
    const questoesNota = Math.min(totalQuestoes, aluno.questoesNotaDoAluno || minimo);
    const escala = { totalQuestoes, minimo: questoesNota };
    const notaParcial = aluno.correcao
        ? notaProporcionalGlobal(aluno.correcao.nota, escala) : null;
    const temNotaFinal = aluno.entregue && respondidos > 0 &&
        aluno.correcao?.corrigidos >= respondidos;
    const notaDoProfessor = aluno.provaCorrigida && aluno.notaProfessor !== undefined
        ? notaProporcionalGlobal(aluno.notaProfessor, escala) : null;
    const valorNotaFinal = temNotaFinal ? notaParcial : SEM_NOTA_PROGRESSO_GLOBAL;
    return {
        ...aluno, respondidos, percentual, completas, totalQuestoes, minimo, questoesNota,
        notaParcial, notaDoProfessor,
        valorSituacao: aluno.entregue ? totalQuestoes + 1 : completas,
        valorNotaParcial: notaParcial === null ? SEM_NOTA_PROGRESSO_GLOBAL : notaParcial,
        valorNotaFinal: notaDoProfessor === null ? valorNotaFinal : notaDoProfessor,
    };
}

/**
 * Compara dois alunos pela coluna escolhida (texto em ordem alfabética, números pelo valor);
 * no empate, pelo nome.
 * @param {Object} a - Aluno com indicadores.
 * @param {Object} b - Aluno com indicadores.
 * @returns {number} Resultado da comparação.
 */
function compararAlunosGlobal(a, b) {
    const { chave, crescente } = estadoProgressoGlobal.ordenacao;
    const porNome = a.nome.localeCompare(b.nome, 'pt-BR');
    const diferenca = chave === CHAVE_ORDEM_ALFABETICA_GLOBAL ? porNome : a[chave] - b[chave];
    const sentido = crescente ? 1 : -1;
    return (diferenca || porNome) * sentido;
}

/**
 * Troca a ordenação: mesma coluna inverte o sentido; outra coluna começa crescente.
 * @param {string} chave - Campo da coluna clicada.
 */
function trocarOrdenacaoGlobal(chave) {
    const atual = estadoProgressoGlobal.ordenacao;
    const mesmaColuna = atual.chave === chave;
    estadoProgressoGlobal.ordenacao = { chave, crescente: mesmaColuna ? !atual.crescente : true };
}

/**
 * Seta do título: ↕ (sem ordem), ▲ (crescente) ou ▼ (decrescente).
 * @param {string} chave - Campo da coluna.
 * @returns {string} Seta.
 */
function setaDaColunaGlobal(chave) {
    const { chave: chaveAtual, crescente } = estadoProgressoGlobal.ordenacao;
    if (chave !== chaveAtual) return SETAS_ORDENACAO_GLOBAL.semOrdem;
    return crescente ? SETAS_ORDENACAO_GLOBAL.crescente : SETAS_ORDENACAO_GLOBAL.decrescente;
}

/**
 * Cria o botão de título de uma coluna ordenável.
 * @param {{titulo: string, chave: string}} coluna - Coluna.
 * @param {Function} aoOrdenar - Chamada depois de trocar a ordenação (redesenha a lista).
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoOrdenarGlobal(coluna, aoOrdenar) {
    const botao = criarElementoProgressoGlobal('button', CLASSE_PROGRESSO_GLOBAL + '__ordenar',
        coluna.titulo + ' ' + setaDaColunaGlobal(coluna.chave));
    botao.type = 'button';
    botao.title = 'Clique para ordenar por ' + coluna.titulo;
    botao.addEventListener('click', () => {
        trocarOrdenacaoGlobal(coluna.chave);
        aoOrdenar();
    });
    return botao;
}

/**
 * Monta a linha de títulos; colunas ordenáveis viram botões com seta.
 * @param {Function} aoOrdenar - Chamada depois de trocar a ordenação (redesenha a lista).
 * @returns {HTMLElement} Linha de títulos.
 */
function montarTitulosDasColunasGlobal(aoOrdenar) {
    const linha = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__linha ' +
        CLASSE_PROGRESSO_GLOBAL + '__linha--titulos');
    colunasDoProgressoGlobal().forEach((coluna) => linha.appendChild(coluna.chave
        ? criarBotaoOrdenarGlobal(coluna, aoOrdenar)
        : criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL + '__coluna',
            coluna.titulo)));
    return linha;
}

/**
 * Redesenha os títulos e as linhas dos alunos que passam em todos os filtros, na ordem
 * escolhida, e a contagem "Mostrando N de T alunos" (sem ler o banco de novo).
 * @param {{lista: HTMLElement}} tela - Elementos da área.
 * @param {Object} medida - estrutura (Map) e totalPartes.
 */
function desenharListaDeAlunosGlobal(tela, medida) {
    const { ultimosAlunos, filtrosDaLista } = estadoProgressoGlobal;
    const visiveis = filtrosDaLista.reduce((lista, filtro) => filtro.filtrar(lista),
        ultimosAlunos);
    const alunos = [...visiveis].sort(compararAlunosGlobal);
    estadoProgressoGlobal.alunosVisiveis = alunos;
    if (tela.contagem) {
        tela.contagem.textContent = 'Mostrando ' + alunos.length + ' de ' +
            ultimosAlunos.length + ' alunos (com os filtros acima)';
    }
    tela.lista.replaceChildren(
        montarTitulosDasColunasGlobal(() => desenharListaDeAlunosGlobal(tela, medida)),
        ...alunos.map((aluno) => montarLinhaDoAlunoGlobal(aluno, medida)));
    atualizarSelecaoConfirmarGlobal();
}

/**
 * Alunos marcados no checkbox E visíveis na lista (os escondidos pelos filtros ficam de fora).
 * @returns {Object[]} Alunos marcados e visíveis.
 */
function lerAlunosMarcadosGlobal() {
    const { selecaoConfirmar, alunosVisiveis } = estadoProgressoGlobal;
    if (!selecaoConfirmar) return [];
    return alunosVisiveis.filter((aluno) => selecaoConfirmar.has(aluno.alunoId));
}

/**
 * Atualiza o "Selecionar todos" (ligado só com todos os visíveis marcados) e a quantidade no botão.
 */
function atualizarSelecaoConfirmarGlobal() {
    const { caixaSelecionarTodos, botaoConfirmarToda, alunosVisiveis } = estadoProgressoGlobal;
    const marcados = lerAlunosMarcadosGlobal().length;
    if (caixaSelecionarTodos) {
        caixaSelecionarTodos.checked = marcados > 0 && marcados === alunosVisiveis.length;
    }
    botaoConfirmarToda?.definirQuantidade?.(marcados);
}

/**
 * Marca ou desmarca todos os alunos visíveis para o botão em massa.
 * @param {boolean} marcar - true marca todos; false desmarca todos os visíveis.
 */
function selecionarTodosVisiveisGlobal(marcar) {
    const { selecaoConfirmar, alunosVisiveis } = estadoProgressoGlobal;
    alunosVisiveis.forEach((aluno) => {
        if (marcar) selecaoConfirmar.add(aluno.alunoId);
        else selecaoConfirmar.delete(aluno.alunoId);
    });
    document.querySelectorAll('.' + CLASSE_PROGRESSO_GLOBAL + '__marcar-aluno')
        .forEach((caixa) => { caixa.checked = marcar; });
    atualizarSelecaoConfirmarGlobal();
}

/**
 * Cria a chave ON/OFF de um aluno (ligada a partir do Set, que sobrevive ao redesenho da lista).
 * @param {Object} aluno - Aluno com alunoId e nome.
 * @returns {HTMLLabelElement} Chave pronta (a caixa fica invisível; aparece a chave).
 */
function criarCaixaMarcarAlunoGlobal(aluno) {
    const chave = criarElementoProgressoGlobal('label', CLASSE_INTERRUPTOR_PROGRESSO_GLOBAL);
    chave.title = 'Marcar ' + aluno.nome + ' para "Confirmar toda correção de IA"';
    const caixa = criarElementoProgressoGlobal('input', CLASSE_PROGRESSO_GLOBAL +
        '__marcar-aluno');
    caixa.type = 'checkbox';
    caixa.checked = estadoProgressoGlobal.selecaoConfirmar.has(aluno.alunoId);
    caixa.addEventListener('change', () => {
        const selecao = estadoProgressoGlobal.selecaoConfirmar;
        if (caixa.checked) selecao.add(aluno.alunoId);
        else selecao.delete(aluno.alunoId);
        atualizarSelecaoConfirmarGlobal();
    });
    chave.append(caixa, criarElementoProgressoGlobal('span',
        CLASSE_INTERRUPTOR_PROGRESSO_GLOBAL + '-chave'));
    return chave;
}

/**
 * Monta a célula do nome com o botão "Quantidade Mínima de Questões" do aluno.
 * @param {Object} aluno - Aluno com indicadores (alunoId, nome, minimo, totalQuestoes).
 * @returns {HTMLElement} Célula pronta.
 */
function montarCelulaNomeDoAlunoGlobal(aluno) {
    const celula = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__celula-nome');
    const nome = criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL + '__nome',
        aluno.nome);
    nome.title = aluno.nome;
    const linhaNome = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL +
        '__linha-nome');
    if (estadoProgressoGlobal.selecaoConfirmar) {
        linhaNome.appendChild(criarCaixaMarcarAlunoGlobal(aluno));
    }
    linhaNome.appendChild(nome);
    const botao = criarElementoProgressoGlobal('button', CLASSE_PROGRESSO_GLOBAL + '__minimo',
        '🎯 Quantidade Mínima de Questões: ' + aluno.questoesNota + '/' + aluno.totalQuestoes);
    botao.title = 'Questões que entram na nota deste aluno (mínimo padrão: ' + aluno.minimo + ').';
    botao.type = 'button';
    if (aluno.minimoDoAluno || aluno.questoesNotaDoAluno) {
        botao.classList.add(CLASSE_PROGRESSO_GLOBAL + '__minimo--proprio');
    }
    botao.addEventListener('click', () => abrirMinimoDoAlunoGlobal(aluno));
    const extras = estadoProgressoGlobal.botoesNome.map((criarBotao) => criarBotao({
        atividadeId: estadoProgressoGlobal.atividadeId, aluno,
        aoMudar: estadoProgressoGlobal.atualizarAgora })).filter(Boolean);
    const faltou = estadoProgressoGlobal.faltas?.criarBotao(aluno);
    celula.append(linhaNome, botao, ...extras, ...(faltou ? [faltou] : []));
    return celula;
}

/**
 * Abre um módulo auxiliar (carregando o script na primeira vez) e atualiza o painel se o
 * módulo disser que algo mudou.
 * @param {{arquivo: string, funcao: string, titulo: string}} modulo - Script e função global.
 * @param {*} dados - Dados passados à função do módulo.
 */
async function abrirModuloDoProgressoGlobal(modulo, dados) {
    try {
        if (typeof window[modulo.funcao] !== 'function') {
            await carregarScriptProgressoGlobal(modulo.arquivo);
        }
        const mudou = await window[modulo.funcao](dados);
        const deveAtualizar = mudou && estadoProgressoGlobal.atualizarAgora;
        if (deveAtualizar) await estadoProgressoGlobal.atualizarAgora();
    } catch (erro) {
        await mostrarPopup('Não foi possível abrir ' + modulo.titulo + ': ' + erro.message,
            { tipo: 'erro', titulo: modulo.titulo });
    }
}

/**
 * Abre a janela para o professor informar o mínimo de questões do aluno.
 * @param {Object} aluno - Aluno com indicadores.
 */
function abrirMinimoDoAlunoGlobal(aluno) {
    return abrirModuloDoProgressoGlobal({ arquivo: ARQUIVO_MINIMO_PROGRESSO_GLOBAL,
        funcao: 'abrirMinimoQuestoes', titulo: 'a quantidade mínima' }, {
        atividadeId: estadoProgressoGlobal.atividadeId, alunoId: aluno.alunoId,
        nome: aluno.nome, minimo: aluno.minimo, totalQuestoes: aluno.totalQuestoes,
        questoesNota: aluno.questoesNota,
        temMinimoProprio: Boolean(aluno.minimoDoAluno || aluno.questoesNotaDoAluno),
    });
}

/**
 * Monta a situação do aluno ("✅ Entregue" ou questões feitas) com o "Marcar como entregue" /
 * "Desfazer entrega" do professor (marcar-entregue-professor.js), se a página o ligar.
 * @param {Object} aluno - Aluno com indicadores.
 * @returns {HTMLElement} Situação pronta.
 */
function montarSituacaoDoAlunoGlobal(aluno) {
    const controle = window.criarControleEntregaProfessor?.({ alunoId: aluno.alunoId,
        atividadeId: estadoProgressoGlobal.atividadeId, nome: aluno.nome,
        entregue: aluno.entregue, entreguePorProfessor: aluno.entreguePorProfessor,
        aoMudar: estadoProgressoGlobal.atualizarAgora });
    const texto = aluno.entregue
        ? '✅ Entregue'
        : aluno.completas + '/' + aluno.totalQuestoes + ' questões · mín. ' + aluno.minimo;
    const avisoNoControle = Boolean(controle) && aluno.entreguePorProfessor;
    const situacao = criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL + '__situacao',
        avisoNoControle ? '' : texto);
    if (controle) situacao.appendChild(controle);
    return situacao;
}

/**
 * Monta a linha de um aluno: nome, questões, barra, situação, nota parcial e nota final.
 * @param {Object} aluno - Aluno com indicadores.
 * @param {{estrutura: Map<number, number>, totalPartes: number}} medida - Estrutura da prova.
 * @returns {HTMLElement} Linha pronta.
 */
function montarLinhaDoAlunoGlobal(aluno, medida) {
    const linha = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__linha');
    linha.append(
        montarCelulaNomeDoAlunoGlobal(aluno),
        montarCelulasDasQuestoesGlobal(aluno.porQuestao, medida.estrutura),
        montarBarraGlobal(aluno.percentual, aluno.entregue ? 'entregue' : ''),
        montarSituacaoDoAlunoGlobal(aluno),
        montarCelulaNotaParcialGlobal(aluno, medida.totalPartes),
        montarCelulaNotaFinalGlobal(aluno),
        ...estadoProgressoGlobal.colunasExtras.map((coluna) => coluna.montarCelula(aluno)));
    return linha;
}

/**
 * Monta o resumo da turma e a barra geral (partes respondidas de todos os alunos).
 * @param {Object[]} alunos - Alunos com indicadores.
 * @param {number} totalPartes - Partes da prova.
 * @returns {HTMLElement[]} Texto do resumo e barra geral.
 */
function montarResumoDaTurmaGlobal(alunos, totalPartes) {
    const entregaram = alunos.filter((aluno) => aluno.entregue).length;
    const respondidos = alunos.reduce((soma, aluno) => soma + aluno.respondidos, 0);
    const percentual = Math.round((respondidos / (alunos.length * totalPartes)) * 100);
    const hora = new Date().toLocaleTimeString('pt-BR');
    const texto = alunos.length + ' aluno(s) começaram · ' + entregaram + ' entregaram · ' +
        'turma com ' + percentual + '% respondido · atualizado às ' + hora;
    return [criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL + '__resumo', texto),
        montarBarraGlobal(percentual, 'geral')];
}

/**
 * Redesenha a lista dos alunos sem nenhuma resposta (alunos-sem-inicio-entrega.js), se a
 * página ligar a entrega pelo professor.
 * @param {{semInicio: HTMLElement|undefined}} tela - Elementos da área.
 */
async function atualizarSemInicioGlobal(tela) {
    if (!tela.semInicio || typeof window.atualizarAlunosSemInicio !== 'function') return;

    await window.atualizarAlunosSemInicio(tela.semInicio, {
        atividadeId: estadoProgressoGlobal.atividadeId,
        idsQueComecaram: new Set(estadoProgressoGlobal.ultimosAlunos.map((aluno) => aluno.alunoId)),
        aoMudar: estadoProgressoGlobal.atualizarAgora,
    });
}

/**
 * Lê os dados das colunas extras; a falha de uma coluna não derruba o painel.
 */
async function atualizarColunasExtrasGlobal() {
    const { colunasExtras, atividadeId } = estadoProgressoGlobal;
    await Promise.all(colunasExtras.map(async (coluna) => {
        try {
            await coluna.atualizar(atividadeId);
        } catch (erro) {
            console.warn(coluna.titulo + ':', erro.message);
        }
    }));
}

/**
 * Carrega as colunas extras do tipo da atividade (ex.: "Suspeita de Cópia" nas discursivas) e
 * marca a área com a classe de cada uma (o CSS da coluna ajusta a grade).
 * @param {string} tipo - 'objetiva' ou 'discursiva'.
 * @param {HTMLElement} area - Área do painel.
 */
async function prepararColunasExtrasGlobal(tipo, area) {
    const modulos = COLUNAS_EXTRAS_POR_TIPO_GLOBAL[tipo] || [];
    for (const modulo of modulos) {
        try {
            if (typeof window[modulo.funcao] !== 'function') {
                await carregarScriptProgressoGlobal(modulo.arquivo);
            }
            const coluna = window[modulo.funcao]();
            estadoProgressoGlobal.colunasExtras.push(coluna);
            area.classList.add(coluna.classeArea);
        } catch (erro) {
            console.warn('Coluna extra do progresso:', erro.message);
        }
    }
}

/**
 * Carrega os botões extras do nome do aluno do tipo da atividade (falha não derruba o painel).
 * @param {string} tipo - 'objetiva' ou 'discursiva'.
 */
async function prepararBotoesNomeGlobal(tipo) {
    const modulos = [...(BOTOES_NOME_POR_TIPO_GLOBAL[tipo] || []), ENTREGA_GLOBAL];
    for (const modulo of modulos) {
        try {
            if (typeof window[modulo.funcao] !== 'function') {
                await carregarScriptProgressoGlobal(modulo.arquivo);
            }
            estadoProgressoGlobal.botoesNome.push(window[modulo.funcao]);
        } catch (erro) {
            console.warn('Botão do aluno no progresso:', erro.message);
        }
    }
}

/**
 * Diz se há um popup aberto: a atualização automática espera, para não refazer a lista no meio
 * de uma confirmação.
 * @returns {boolean} true se deve esperar.
 */
function estaComPopupAbertoGlobal() {
    return Boolean(document.querySelector(SELETOR_POPUP_ABERTO_GLOBAL));
}

/**
 * Acrescenta os alunos das turmas do curso que ainda não responderam nada (carrega o módulo na
 * primeira vez). Se a leitura falhar, segue só com quem respondeu (o painel não cai).
 * @param {Object[]} alunos - Alunos com resposta (formato comum).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Todos os alunos.
 */
async function completarAlunosDaTurmaGlobal(alunos, atividadeId) {
    try {
        if (typeof window.completarComAlunosDaTurma !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_ALUNOS_TURMA_PROGRESSO_GLOBAL);
        }
        return await window.completarComAlunosDaTurma(alunos, atividadeId);
    } catch (erro) {
        console.warn('Alunos da turma no progresso:', erro.message);
        return alunos;
    }
}

/**
 * Lê o banco e redesenha o resumo e as linhas dos alunos (sem leituras sobrepostas).
 * @param {{resumo: HTMLElement, lista: HTMLElement}} tela - Elementos da área.
 * @param {Object} medida - estrutura (Map) e totalPartes.
 */
async function atualizarProgressoGlobal(tela, medida) {
    if (estadoProgressoGlobal.lendo) return;

    estadoProgressoGlobal.lendo = true;
    try {
        const { fonte, memoria, atividadeId } = estadoProgressoGlobal;
        const alunos = await completarAlunosDaTurmaGlobal(
            await fonte.lerAlunos(atividadeId, memoria), atividadeId);
        estadoProgressoGlobal.ultimosAlunos = alunos.map((aluno) =>
            calcularIndicadoresDoAlunoGlobal(aluno, medida));
        await atualizarSemInicioGlobal(tela);
        await atualizarColunasExtrasGlobal();
        await atualizarFaltasGlobal();
        await estadoProgressoGlobal.correcaoIa?.atualizar();
        if (!alunos.length) {
            tela.resumo.replaceChildren('Nenhum aluno nas turmas do curso · ' +
                'atualizado às ' + new Date().toLocaleTimeString('pt-BR'));
            tela.lista.replaceChildren();
            estadoProgressoGlobal.alunosVisiveis = [];
            atualizarSelecaoConfirmarGlobal();
            return;
        }
        tela.resumo.replaceChildren(...montarResumoDaTurmaGlobal(
            estadoProgressoGlobal.ultimosAlunos, medida.totalPartes));
        desenharListaDeAlunosGlobal(tela, medida);
    } catch (erro) {
        tela.resumo.replaceChildren('❌ Não foi possível ler o progresso: ' + erro.message);
    } finally {
        estadoProgressoGlobal.lendo = false;
    }
}

/**
 * Monta a legenda das cores das questões.
 * @returns {HTMLElement} Legenda.
 */
function montarLegendaProgressoGlobal() {
    const legenda = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__legenda');
    Object.values(SITUACOES_QUESTAO_GLOBAL).forEach((situacao) => {
        legenda.appendChild(criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL +
            '__questao ' + CLASSE_PROGRESSO_GLOBAL + '__questao--' + situacao.modificador,
        situacao.texto));
    });
    return legenda;
}

/**
 * Cria um botão do cabeçalho do painel.
 * @param {{texto: string, dica: string, aoClicar: Function}} dados - Texto, dica e ação.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoCabecalhoGlobal(dados) {
    const botao = criarElementoProgressoGlobal('button', CLASSE_PROGRESSO_GLOBAL + '__graficos',
        dados.texto);
    botao.type = 'button';
    botao.title = dados.dica;
    botao.addEventListener('click', dados.aoClicar);
    return botao;
}

/**
 * Monta o cabeçalho do painel: título e botões "📈 Gráficos" e "🧮 Cálculo Nota".
 * @param {{estrutura: Map<number, number>}} medida - Estrutura da prova.
 * @returns {HTMLElement} Cabeçalho pronto.
 */
function montarCabecalhoProgressoGlobal(medida) {
    const cabecalho = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__cabecalho');
    const botoes = criarElementoProgressoGlobal('div',
        CLASSE_PROGRESSO_GLOBAL + '__botoes-cabecalho');
    botoes.append(
        criarBotaoCabecalhoGlobal({ texto: '📈 Gráficos',
            dica: 'Abrir 5 gráficos do progresso da turma',
            aoClicar: () => abrirModuloDoProgressoGlobal({
                arquivo: ARQUIVO_GRAFICOS_PROGRESSO_GLOBAL, funcao: 'abrirGraficosProgresso',
                titulo: 'os gráficos' }, { alunos: estadoProgressoGlobal.ultimosAlunos,
                topicos: medida.estrutura, textos: estadoProgressoGlobal.fonte.textos }) }),
        criarBotaoCabecalhoGlobal({ texto: '🧮 Cálculo Nota',
            dica: 'Mínimo de questões que 85% da turma já completou',
            aoClicar: () => abrirModuloDoProgressoGlobal({
                arquivo: ARQUIVO_CALCULO_PROGRESSO_GLOBAL, funcao: 'abrirCalculoNota',
                titulo: 'o Cálculo Nota' }, { alunos: estadoProgressoGlobal.ultimosAlunos,
                atividadeId: estadoProgressoGlobal.atividadeId }) }));
    cabecalho.append(criarElementoProgressoGlobal('h2', CLASSE_PROGRESSO_GLOBAL + '__titulo',
        '📊 Progresso da turma (só o professor vê · atualiza a cada 5 segundos)'), botoes);
    return cabecalho;
}

/**
 * Garante a fonte de dados do tipo pedido (carrega progresso-turma-fontes.js na primeira vez).
 * @param {string} tipo - 'objetiva' ou 'discursiva'.
 * @returns {Promise<Object>} Fonte de dados.
 * @throws {Error} Se o tipo não existir.
 */
async function obterFonteProgressoGlobal(tipo) {
    if (!window.FONTES_PROGRESSO_TURMA) {
        await carregarScriptProgressoGlobal(ARQUIVO_FONTES_PROGRESSO_GLOBAL);
    }
    const fonte = window.FONTES_PROGRESSO_TURMA[tipo];
    if (!fonte) throw new Error('Tipo de atividade sem progresso: ' + tipo);
    return fonte;
}

/**
 * Liga a entrega pelo professor no painel (só com <body data-marcar-entregue="sim">): carrega
 * os módulos e cria a área dos alunos sem nenhuma resposta. Uma falha aqui não derruba o painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Object} tela - Elementos da área (recebe semInicio).
 */
async function prepararEntregaProfessorGlobal(area, tela) {
    if (document.body.dataset.marcarEntregue !== VALOR_LIGADO_ENTREGA_GLOBAL) return;

    try {
        if (typeof window.acrescentarControleEntrega !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_ENTREGA_PROGRESSO_GLOBAL);
        }
        if (typeof window.atualizarAlunosSemInicio !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_SEM_INICIO_PROGRESSO_GLOBAL);
        }
        tela.semInicio = criarElementoProgressoGlobal('div', 'sem-inicio-entrega');
        area.appendChild(tela.semInicio);
    } catch (erro) {
        console.warn('Entrega pelo professor indisponível:', erro.message);
    }
}

/**
 * Preferências dos filtros do painel no localStorage do navegador. Sem armazenamento (bloqueado
 * ou modo privado), lê null e não grava: os filtros usam o padrão.
 */
const preferenciasProgressoGlobal = {
    /**
     * Lê uma escolha guardada.
     * @param {string} chave - Nome do filtro.
     * @returns {string|null} Valor guardado ou null.
     */
    ler(chave) {
        try {
            return window.localStorage.getItem(PREFIXO_PREFERENCIA_PROGRESSO_GLOBAL + chave);
        } catch (erro) {
            return null;
        }
    },
    /**
     * Guarda uma escolha.
     * @param {string} chave - Nome do filtro.
     * @param {string} valor - Valor escolhido.
     */
    gravar(chave, valor) {
        try {
            window.localStorage.setItem(PREFIXO_PREFERENCIA_PROGRESSO_GLOBAL + chave, valor);
        } catch (erro) {
            // Sem armazenamento, a escolha vale só enquanto a página estiver aberta.
        }
    },
};

/**
 * Cria o combobox "Questões respondidas" e o põe na área. Uma falha aqui não derruba o painel
 * (a lista sai sem filtro).
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando a faixa muda.
 */
async function prepararFiltroGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroRespondidas !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_PROGRESSO_GLOBAL);
        }
        estadoProgressoGlobal.filtro = window.criarFiltroRespondidas(aoMudar,
            preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(estadoProgressoGlobal.filtro);
        area.appendChild(estadoProgressoGlobal.filtro.elemento);
    } catch (erro) {
        console.warn('Filtro do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "Mostrar quem faltou" (e o "Faltou?" de cada aluno) e o põe na área. Uma falha
 * aqui não derruba o painel (a lista sai sem as faltas).
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando uma falta ou o ON/OFF muda.
 */
async function prepararFaltasGlobal(area, aoMudar) {
    try {
        if (typeof window.criarControleFaltas !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FALTAS_PROGRESSO_GLOBAL);
        }
        estadoProgressoGlobal.faltas = await window.criarControleFaltas({
            atividadeId: estadoProgressoGlobal.atividadeId, aoMudar,
            preferencias: preferenciasProgressoGlobal });
        estadoProgressoGlobal.filtrosDaLista.push(estadoProgressoGlobal.faltas);
        area.appendChild(estadoProgressoGlobal.faltas.elemento);
    } catch (erro) {
        console.warn('Faltas do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "Tarefa Entregue?" (desligado: só quem não entregou) e o põe na área. Uma falha
 * aqui não derruba o painel (a lista sai sem esse filtro).
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroEntregueGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroEntregue !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_ENTREGUE_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroEntregue(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "Tarefa Entregue?" do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "RECUPERAÇÃO" (pela nota final: ligado < 7, desligado >= 7) e o põe na área,
 * depois do "Mostrar quem faltou". Uma falha aqui não derruba o painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroRecuperacaoGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroRecuperacao !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_RECUPERACAO_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroRecuperacao(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "RECUPERAÇÃO" do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "Prova Corrigida" (desligado: não corrigidas; ligado: corrigidas) e o põe na
 * área, depois do "RECUPERAÇÃO". Uma falha aqui não derruba o painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroCorrigidaGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroCorrigida !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_CORRIGIDA_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroCorrigida(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "Prova Corrigida" do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "Nota IA Gerada" (desligado: só quem ainda não tem a nota final da IA; ligado:
 * só quem já tem) e o põe na área, depois do "Prova Corrigida". Uma falha aqui não derruba o
 * painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroNotaIaGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroNotaIa !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_NOTA_IA_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroNotaIa(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "Nota IA Gerada" do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "ABAIXO DA MEDIA" (ligado: só quem tirou menos que 7; desligado: todos) e o põe
 * na área, depois do "Nota IA Gerada". Uma falha aqui não derruba o painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroAbaixoMediaGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroAbaixoMedia !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_ABAIXO_MEDIA_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroAbaixoMedia(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "ABAIXO DA MEDIA" do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "ABAIXO MEDIA(IA)" (ligado: só quem tem nota sugerida da IA menor que 7;
 * desligado: todos) e o põe na área, depois do "ABAIXO DA MEDIA". Uma falha aqui não derruba o
 * painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroAbaixoMediaIaGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroAbaixoMediaIa !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_ABAIXO_MEDIA_IA_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroAbaixoMediaIa(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "ABAIXO MEDIA(IA)" do progresso:', erro.message);
    }
}

/**
 * Cria o ON/OFF "MEDIA ATINGIDA(IA)" (ligado: só quem tem 70% ou mais na nota sugerida da IA;
 * desligado: todos) e o põe na área, depois do "ABAIXO MEDIA(IA)". Uma falha aqui não derruba o
 * painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 */
async function prepararFiltroMediaAtingidaIaGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroMediaAtingidaIa !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_MEDIA_ATINGIDA_IA_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroMediaAtingidaIa(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        area.appendChild(filtro.elemento);
    } catch (erro) {
        console.warn('Filtro "MEDIA ATINGIDA(IA)" do progresso:', erro.message);
    }
}

/**
 * Põe o combo "Aluno" ao lado do título (filtro-aluno-progresso.js; a escolha fica no
 * navegador). Ele é o primeiro filtro da lista, para as opções terem todos os alunos da turma.
 * Uma falha aqui não derruba o painel.
 * @param {HTMLElement} area - Área do painel (com o título).
 * @param {Function} aoMudar - Redesenha a lista quando o aluno muda.
 */
async function prepararFiltroAlunoGlobal(area, aoMudar) {
    try {
        if (typeof window.criarFiltroAluno !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_FILTRO_ALUNO_PROGRESSO_GLOBAL);
        }
        const filtro = window.criarFiltroAluno(aoMudar, preferenciasProgressoGlobal);
        estadoProgressoGlobal.filtrosDaLista.unshift(filtro);
        area.querySelector('.' + CLASSE_PROGRESSO_GLOBAL + '__titulo')?.after(filtro.elemento);
    } catch (erro) {
        console.warn('Combo de aluno do progresso:', erro.message);
    }
}

/**
 * Põe o combo "Turma" ao lado do título (abre na turma favorita; alunos-da-turma-progresso.js).
 * Trocar a turma lê a lista de novo. Uma falha aqui não derruba o painel.
 * @param {HTMLElement} area - Área do painel (com o título).
 */
async function prepararComboTurmaGlobal(area) {
    try {
        if (typeof window.criarComboTurmaProgresso !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_ALUNOS_TURMA_PROGRESSO_GLOBAL);
        }
        const combo = await window.criarComboTurmaProgresso({
            atividadeId: estadoProgressoGlobal.atividadeId,
            aoMudar: () => estadoProgressoGlobal.atualizarAgora?.() });
        area.querySelector('.' + CLASSE_PROGRESSO_GLOBAL + '__titulo')?.after(combo);
    } catch (erro) {
        console.warn('Combo de turma do progresso:', erro.message);
    }
}

/**
 * Põe o ON/OFF "Mostrar quadro" ao lado do título (desligado por padrão: esconde o quadro).
 * Uma falha aqui não derruba o painel e o quadro fica visível.
 * @param {HTMLElement} area - Área do painel (com o título).
 */
async function prepararInterruptorQuadroGlobal(area) {
    try {
        if (typeof window.criarInterruptorQuadroProgresso !== 'function') {
            await carregarScriptProgressoGlobal(ARQUIVO_MOSTRAR_QUADRO_PROGRESSO_GLOBAL);
        }
        const interruptor = window.criarInterruptorQuadroProgresso({ area,
            atividadeId: estadoProgressoGlobal.atividadeId,
            preferencias: preferenciasProgressoGlobal });
        area.querySelector('.' + CLASSE_PROGRESSO_GLOBAL + '__titulo')
            ?.after(interruptor.elemento);
    } catch (erro) {
        console.warn('Mostrar quadro do progresso:', erro.message);
        area.classList.remove(CLASSE_RECOLHIDO_PROGRESSO_GLOBAL);
    }
}

/**
 * Lê as faltas do dia da atividade (uma falha mantém as últimas lidas).
 */
async function atualizarFaltasGlobal() {
    try {
        await estadoProgressoGlobal.faltas?.atualizar();
    } catch (erro) {
        console.warn('Faltas do progresso:', erro.message);
    }
}

/**
 * Põe o painel "Correção de IA" na área (só discursiva). Uma falha não derruba o painel.
 * @param {HTMLElement} area - Área do painel.
 * @param {string} tipo - 'objetiva' ou 'discursiva'.
 */
async function prepararCorrecaoIaGlobal(area, tipo) {
    if (tipo !== TIPO_PADRAO_PROGRESSO_GLOBAL) return;
    try {
        if (!window.criarPainelCorrecaoIa) {
            await carregarScriptProgressoGlobal(ARQUIVO_CORRECAO_IA_PROGRESSO_GLOBAL);
        }
        estadoProgressoGlobal.correcaoIa = await window.criarPainelCorrecaoIa({
            atividadeId: estadoProgressoGlobal.atividadeId,
            lerAlunos: () => estadoProgressoGlobal.ultimosAlunos });
        window.posicionarPainelCorrecaoIa(area, estadoProgressoGlobal.correcaoIa.elemento);
    } catch (erro) {
        console.warn('Correção de IA do progresso:', erro.message);
    }
}

/**
 * Cria a chave ON/OFF "Selecionar todos" ao lado do botão em massa (liga/desliga os alunos
 * visíveis).
 * @returns {HTMLLabelElement} Chave pronta.
 */
function criarRotuloSelecionarTodosGlobal() {
    const rotulo = criarElementoProgressoGlobal('label', CLASSE_INTERRUPTOR_PROGRESSO_GLOBAL +
        ' ' + CLASSE_PROGRESSO_GLOBAL + '__selecionar-todos');
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.addEventListener('change', () => selecionarTodosVisiveisGlobal(caixa.checked));
    estadoProgressoGlobal.caixaSelecionarTodos = caixa;
    rotulo.append(caixa, criarElementoProgressoGlobal('span',
        CLASSE_INTERRUPTOR_PROGRESSO_GLOBAL + '-chave'),
        criarElementoProgressoGlobal('span', '', TEXTO_SELECIONAR_TODOS_GLOBAL));
    return rotulo;
}

/**
 * Põe o botão "CONFIRMAR TODA CORREÇÃO DE IA" logo acima da lista, em cima da coluna "Aluno"
 * (só discursiva). Carrega 'confirmar-todas-professor.js' antes. Falha não derruba o painel.
 * @param {{lista: HTMLElement}} tela - Elementos da área.
 * @param {string} tipo - 'objetiva' ou 'discursiva'.
 */
async function prepararConfirmarTodaCorrecaoIaGlobal(tela, tipo) {
    if (tipo !== TIPO_PADRAO_PROGRESSO_GLOBAL) return;
    try {
        for (const arquivo of ARQUIVOS_CONFIRMAR_TODA_CORRECAO_IA_GLOBAL) {
            await carregarScriptProgressoGlobal(arquivo);
        }
        if (typeof window.criarBotaoConfirmarTodaCorrecaoIa !== 'function') return;
        estadoProgressoGlobal.selecaoConfirmar = new Set();
        const botao = window.criarBotaoConfirmarTodaCorrecaoIa({
            atividadeId: estadoProgressoGlobal.atividadeId,
            lerAlunos: lerAlunosMarcadosGlobal,
            aoMudar: async () => estadoProgressoGlobal.atualizarAgora?.() });
        if (!botao) {
            estadoProgressoGlobal.selecaoConfirmar = null;
            return;
        }
        estadoProgressoGlobal.botaoConfirmarToda = botao;
        const faixa = criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL +
            '__faixa-confirmar-correcao-ia');
        faixa.append(botao, criarRotuloSelecionarTodosGlobal());
        tela.lista.before(faixa);
        estadoProgressoGlobal.atualizarAgora?.();
    } catch (erro) {
        console.warn('Confirmar toda correção de IA do progresso:', erro.message);
    }
}

/**
 * Monta a área "Progresso da turma" logo abaixo do cabeçalho da atividade e a atualiza a cada
 * 5 segundos. Só deve ser chamada para o professor (quem chama confere o perfil).
 * @param {number} atividadeId - Id da atividade no banco.
 * @param {string} [tipo] - 'objetiva' ou 'discursiva' (padrão: discursiva).
 */
async function montarProgressoDaTurma(atividadeId, tipo = TIPO_PADRAO_PROGRESSO_GLOBAL) {
    const cabecalho = document.querySelector(SELETOR_CABECALHO_PROGRESSO_GLOBAL);
    const jaExiste = document.querySelector('.' + CLASSE_PROGRESSO_GLOBAL);
    if (!atividadeId || !cabecalho || jaExiste) return;

    estadoProgressoGlobal.fonte = await obterFonteProgressoGlobal(tipo);
    estadoProgressoGlobal.atividadeId = atividadeId;
    const estrutura = estadoProgressoGlobal.fonte.lerEstrutura();
    const medida = { estrutura,
        totalPartes: [...estrutura.values()].reduce((soma, valor) => soma + valor, 0) };
    if (!medida.totalPartes) return;

    const area = criarElementoProgressoGlobal('section', CLASSE_PROGRESSO_GLOBAL);
    const tela = {
        resumo: criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__geral',
            'Lendo...'),
        lista: criarElementoProgressoGlobal('div', CLASSE_PROGRESSO_GLOBAL + '__lista'),
    };
    area.append(montarCabecalhoProgressoGlobal(medida), montarLegendaProgressoGlobal());
    const redesenhar = () => {
        if (estadoProgressoGlobal.ultimosAlunos.length) desenharListaDeAlunosGlobal(tela, medida);
    };
    await prepararFiltroGlobal(area, redesenhar);
    await prepararFiltroEntregueGlobal(area, redesenhar);
    await prepararFaltasGlobal(area, redesenhar);
    await prepararFiltroRecuperacaoGlobal(area, redesenhar);
    await prepararFiltroCorrigidaGlobal(area, redesenhar);
    await prepararFiltroNotaIaGlobal(area, redesenhar);
    await prepararFiltroAbaixoMediaGlobal(area, redesenhar);
    await prepararFiltroAbaixoMediaIaGlobal(area, redesenhar);
    await prepararFiltroMediaAtingidaIaGlobal(area, redesenhar);
    tela.contagem = criarElementoProgressoGlobal('span', CLASSE_PROGRESSO_GLOBAL + '__contagem');
    area.appendChild(tela.contagem);
    await prepararFiltroAlunoGlobal(area, redesenhar);
    await prepararComboTurmaGlobal(area);
    await prepararInterruptorQuadroGlobal(area);
    await prepararCorrecaoIaGlobal(area, tipo);
    area.append(tela.resumo, tela.lista);
    await prepararConfirmarTodaCorrecaoIaGlobal(tela, tipo);
    cabecalho.after(area);
    await prepararColunasExtrasGlobal(tipo, area);
    await prepararBotoesNomeGlobal(tipo);
    await prepararEntregaProfessorGlobal(area, tela);

    estadoProgressoGlobal.atualizarAgora = () => atualizarProgressoGlobal(tela, medida);
    estadoProgressoGlobal.colunasExtras.forEach((coluna) => {
        coluna.aoMudar = estadoProgressoGlobal.atualizarAgora;
    });
    await atualizarProgressoGlobal(tela, medida);
    estadoProgressoGlobal.temporizador = setInterval(() => {
        if (estaComPopupAbertoGlobal()) return;
        atualizarProgressoGlobal(tela, medida);
    }, INTERVALO_PROGRESSO_GLOBAL_MS);
}

(function incluirEstiloProgressoGlobal() {
    if (!BASE_SCRIPTS_PROGRESSO_GLOBAL) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_PROGRESSO_GLOBAL + ARQUIVO_CSS_PROGRESSO_GLOBAL;
    document.head.appendChild(link);
})();

window.montarProgressoDaTurma = montarProgressoDaTurma;
