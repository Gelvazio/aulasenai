// Fontes de dados do Progresso da turma GLOBAL (assets/js/progresso-turma-global.js): cada tipo
// de atividade lê o banco do seu jeito e devolve os alunos no MESMO formato, para a tela, os
// gráficos, o Cálculo Nota e o mínimo de questões servirem às objetivas e às discursivas.
//   - objetiva: resposta_atividade (questões respondidas) + resumo_tentativas_atividade (acertos
//     e entrega; a conta é feita no banco e o gabarito não sai de lá);
//   - discursiva: resposta_discursiva (tópicos com texto) + correcao_discursiva (nota da IA).
// Formato do aluno: { alunoId, nome, porQuestao: Map(item → partes respondidas), entregue,
//   minimoDoAluno, correcao: {nota, possivel, corrigidos, certas, meias, erradas} | null }.
// A "nota" da correção está na escala da prova inteira (0 a 10); o painel a torna proporcional
// ao mínimo do aluno. Só leitura; o RLS limita aos alunos das turmas do professor.
// Depende de js/supabase.js (obterClienteSupabase, sbGet). Regra: docs/regras/atividades.md

const LINHAS_POR_PAGINA_PROGRESSO = 1000;
const NOTA_TOTAL_DA_PROVA = 10;
const SELETOR_QUESTAO_OBJETIVA_PROGRESSO = '.aula-card.questao';
const SELETOR_TOPICO_DISCURSIVA_PROGRESSO = '.topico-resposta';
const TIPO_PROGRESSO_OBJETIVA = 'objetiva';
const TIPO_PROGRESSO_DISCURSIVA = 'discursiva';
const COLUNAS_CHAVE_OBJETIVA = ['aluno_id', 'tentativa', 'item'];
const COLUNAS_CHAVE_DISCURSIVA = ['aluno_id', 'tentativa', 'item', 'topico'];

/**
 * Lê todas as linhas de uma tabela da atividade, de 1000 em 1000 (a API do Supabase devolve no
 * máximo 1000 linhas por consulta; sem paginar, turmas grandes ficariam cortadas sem aviso).
 * A ordem cobre a chave inteira da tabela, para nenhuma linha repetir ou sumir entre as páginas.
 * @param {{tabela: string, colunas: string, atividadeId: number, ordem: string[]}} consulta -
 *     Tabela, colunas, atividade e colunas da chave (ordem).
 * @returns {Promise<Object[]>} Todas as linhas.
 * @throws {Error} Se o banco recusar.
 */
async function lerTodasAsLinhasProgresso(consulta) {
    const linhas = [];
    for (let inicio = 0; ; inicio += LINHAS_POR_PAGINA_PROGRESSO) {
        let pedido = obterClienteSupabase().from(consulta.tabela)
            .select(consulta.colunas).eq('atividade_id', consulta.atividadeId);
        consulta.ordem.forEach((coluna) => { pedido = pedido.order(coluna); });
        const { data, error } = await pedido
            .range(inicio, inicio + LINHAS_POR_PAGINA_PROGRESSO - 1);
        if (error) throw new Error(error.message);
        linhas.push(...data);
        if (data.length < LINHAS_POR_PAGINA_PROGRESSO) return linhas;
    }
}

/**
 * Conta, por aluno, as partes respondidas em cada questão — só a tentativa mais recente (a
 * tentativa vale mesmo que só tenha linhas sem resposta, como tópicos apagados).
 * @param {Object[]} linhas - Linhas {aluno_id, tentativa, item}.
 * @param {Function} [temResposta] - Diz se a linha conta como parte respondida.
 * @returns {Map<string, {tentativa: number, porQuestao: Map<number, number>}>} Por aluno.
 */
function contarPartesPorAluno(linhas, temResposta = () => true) {
    const progresso = new Map();
    linhas.forEach((linha) => {
        const atual = progresso.get(linha.aluno_id);
        if (!atual || linha.tentativa > atual.tentativa) {
            progresso.set(linha.aluno_id, { tentativa: linha.tentativa, porQuestao: new Map() });
        }
        const registro = progresso.get(linha.aluno_id);
        const contaNestaTentativa = linha.tentativa === registro.tentativa && temResposta(linha);
        if (!contaNestaTentativa) return;
        registro.porQuestao.set(linha.item, (registro.porQuestao.get(linha.item) || 0) + 1);
    });
    return progresso;
}

/**
 * Lê o mínimo próprio de cada aluno (tabela minimo_questoes_aluno).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Map<string, number>>} Aluno → mínimo.
 */
async function lerMinimosDosAlunos(atividadeId) {
    const linhas = await sbGet('minimo_questoes_aluno',
        'select=aluno_id,minimo&atividade_id=eq.' + atividadeId);
    return new Map(linhas.map((linha) => [linha.aluno_id, linha.minimo]));
}

/**
 * Lê (uma vez) o mínimo padrão de questões da atividade (vazio = todas).
 * @param {number} atividadeId - Id da atividade.
 * @param {Object} memoria - Memória da fonte entre as leituras.
 * @returns {Promise<number|null>} Mínimo padrão ou null.
 */
async function lerMinimoPadraoDaAtividade(atividadeId, memoria) {
    if (memoria.minimoPadrao !== undefined) return memoria.minimoPadrao;

    const [atividade] = await sbGet('atividade',
        'select=minimo_questoes_entrega&id=eq.' + atividadeId);
    memoria.minimoPadrao = atividade?.minimo_questoes_entrega || null;
    return memoria.minimoPadrao;
}

/**
 * Busca no banco só os nomes de alunos ainda não conhecidos (o resto vem da memória da fonte).
 * @param {string[]} ids - Ids dos alunos.
 * @param {Map<string, string>} nomes - Memória dos nomes (preenchida aqui).
 */
async function carregarNomesDosAlunos(ids, nomes) {
    const novos = ids.filter((id) => !nomes.has(id));
    if (!novos.length) return;

    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + novos.join(',') + ')');
    alunos.forEach((aluno) => nomes.set(aluno.id, aluno.nome));
}

/**
 * Monta a lista final de alunos no formato comum, em ordem alfabética.
 * @param {Map<string, Object>} progresso - Saída de contarPartesPorAluno.
 * @param {Object} extras - nomes, minimos, entregues (Set "aluno|tentativa") e correcoes (Map).
 * @returns {Object[]} Alunos no formato comum.
 */
function montarAlunosDoProgresso(progresso, extras) {
    return [...progresso.keys()].map((id) => {
        const { tentativa, porQuestao } = progresso.get(id);
        const chave = id + '|' + tentativa;
        return {
            alunoId: id,
            nome: extras.nomes.get(id) || 'Aluno sem nome',
            porQuestao,
            entregue: extras.entregues.has(chave),
            minimoDoAluno: extras.minimos.get(id) || null,
            correcao: extras.correcoes.get(chave) || null,
        };
    }).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/**
 * Objetiva: estrutura da prova lida da página (cada questão tem 1 parte: a alternativa).
 * @returns {Map<number, number>} Questão → 1, em ordem.
 */
function lerEstruturaObjetiva() {
    const estrutura = new Map();
    document.querySelectorAll(SELETOR_QUESTAO_OBJETIVA_PROGRESSO).forEach((card) => {
        const numero = Number((card.querySelector('.aula-badge')?.textContent.match(/\d+/) ||
            [0])[0]);
        if (numero) estrutura.set(numero, 1);
    });
    return new Map([...estrutura.entries()].sort((a, b) => a[0] - b[0]));
}

/**
 * Objetiva: lê acertos e entrega de cada aluno e tentativa (função do banco, só professor).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Linhas de resumo_tentativas_atividade.
 * @throws {Error} Se o banco recusar.
 */
async function lerResumoObjetiva(atividadeId) {
    const { data, error } = await obterClienteSupabase().rpc('resumo_tentativas_atividade',
        { p_atividade: atividadeId });
    if (error) throw new Error(error.message);
    return data || [];
}

/**
 * Objetiva: converte acertos em correção no formato comum (nota na escala da prova inteira:
 * cada acerto vale 10 ÷ total; o painel a torna proporcional ao mínimo do aluno).
 * @param {Object} linha - Linha do resumo (respondidas, acertos, total).
 * @returns {Object} Correção {nota, possivel, corrigidos, certas, meias, erradas}.
 */
function converterAcertosEmCorrecao(linha) {
    const valorDaQuestao = NOTA_TOTAL_DA_PROVA / (linha.total || 1);
    return {
        nota: linha.acertos * valorDaQuestao,
        possivel: linha.respondidas * valorDaQuestao,
        corrigidos: linha.respondidas,
        certas: linha.acertos,
        meias: 0,
        erradas: linha.respondidas - linha.acertos,
    };
}

/**
 * Objetiva: lê o progresso de cada aluno.
 * @param {number} atividadeId - Id da atividade.
 * @param {Object} memoria - Memória da fonte entre as leituras.
 * @returns {Promise<Object[]>} Alunos no formato comum.
 */
async function lerAlunosObjetiva(atividadeId, memoria) {
    const [respostas, resumo, minimos] = await Promise.all([
        lerTodasAsLinhasProgresso({ tabela: 'resposta_atividade',
            colunas: 'aluno_id,tentativa,item', atividadeId, ordem: COLUNAS_CHAVE_OBJETIVA }),
        lerResumoObjetiva(atividadeId),
        lerMinimosDosAlunos(atividadeId),
        lerMinimoPadraoDaAtividade(atividadeId, memoria),
    ]);
    const correcoes = new Map();
    const entregues = new Set();
    resumo.forEach((linha) => {
        const chave = linha.aluno_id + '|' + linha.tentativa;
        correcoes.set(chave, converterAcertosEmCorrecao(linha));
        if (linha.entregue_em) entregues.add(chave);
        if (linha.nome) memoria.nomes.set(linha.aluno_id, linha.nome);
    });
    const progresso = contarPartesPorAluno(respostas);
    await carregarNomesDosAlunos([...progresso.keys()], memoria.nomes);
    return montarAlunosDoProgresso(progresso, { nomes: memoria.nomes, minimos, entregues,
        correcoes });
}

/**
 * Discursiva: estrutura da prova lida da página (tópicos de cada questão).
 * @returns {Map<number, number>} Questão → quantidade de tópicos, em ordem.
 */
function lerEstruturaDiscursiva() {
    const estrutura = new Map();
    document.querySelectorAll(SELETOR_TOPICO_DISCURSIVA_PROGRESSO).forEach((bloco) => {
        const item = Number(bloco.dataset.item);
        estrutura.set(item, (estrutura.get(item) || 0) + 1);
    });
    return new Map([...estrutura.entries()].sort((a, b) => a[0] - b[0]));
}

/**
 * Discursiva: lê (uma vez) os pontos de cada tópico, para o percentual de acerto.
 * @param {number} atividadeId - Id da atividade.
 * @param {Object} memoria - Memória da fonte entre as leituras.
 * @returns {Promise<Map<string, number>>} Chave "item|topico" → pontos.
 */
async function lerPontosDosTopicos(atividadeId, memoria) {
    if (memoria.pontosDosTopicos) return memoria.pontosDosTopicos;

    const topicos = await sbGet('topico_discursivo',
        'select=item,topico,pontos&atividade_id=eq.' + atividadeId);
    memoria.pontosDosTopicos = new Map(topicos.map((topico) =>
        [topico.item + '|' + topico.topico, Number(topico.pontos)]));
    return memoria.pontosDosTopicos;
}

/**
 * Discursiva: soma, por aluno e tentativa, a nota da IA, os pontos possíveis e as alternativas
 * já corrigidas (certas, meias certas e erradas).
 * @param {Object[]} linhas - Linhas {aluno_id, tentativa, item, topico, nota_ia}.
 * @param {Map<string, number>} pontos - Pontos de cada tópico ("item|topico").
 * @returns {Map<string, Object>} "aluno|tentativa" → correção no formato comum.
 */
function somarCorrecoesDaIa(linhas, pontos) {
    const correcoes = new Map();
    linhas.forEach((linha) => {
        if (linha.nota_ia === null || linha.nota_ia === undefined) return;
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const atual = correcoes.get(chave) ||
            { nota: 0, possivel: 0, corrigidos: 0, certas: 0, meias: 0, erradas: 0 };
        const valor = Number(linha.nota_ia);
        const pontosDoTopico = pontos.get(linha.item + '|' + linha.topico) || 0;
        const estaCerta = pontosDoTopico > 0 && valor >= pontosDoTopico;
        correcoes.set(chave, {
            nota: atual.nota + valor,
            possivel: atual.possivel + pontosDoTopico,
            corrigidos: atual.corrigidos + 1,
            certas: atual.certas + (estaCerta ? 1 : 0),
            meias: atual.meias + (!estaCerta && valor > 0 ? 1 : 0),
            erradas: atual.erradas + (valor === 0 ? 1 : 0),
        });
    });
    return correcoes;
}

/**
 * Discursiva: lê o progresso de cada aluno.
 * @param {number} atividadeId - Id da atividade.
 * @param {Object} memoria - Memória da fonte entre as leituras.
 * @returns {Promise<Object[]>} Alunos no formato comum.
 */
async function lerAlunosDiscursiva(atividadeId, memoria) {
    const [respostas, entregas, linhasIa, pontos, minimos] = await Promise.all([
        lerTodasAsLinhasProgresso({ tabela: 'resposta_discursiva',
            colunas: 'aluno_id,tentativa,item,texto', atividadeId,
            ordem: COLUNAS_CHAVE_DISCURSIVA }),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa&atividade_id=eq.' + atividadeId),
        lerTodasAsLinhasProgresso({ tabela: 'correcao_discursiva',
            colunas: 'aluno_id,tentativa,item,topico,nota_ia', atividadeId,
            ordem: COLUNAS_CHAVE_DISCURSIVA }),
        lerPontosDosTopicos(atividadeId, memoria),
        lerMinimosDosAlunos(atividadeId),
        lerMinimoPadraoDaAtividade(atividadeId, memoria),
    ]);
    const progresso = contarPartesPorAluno(respostas,
        (linha) => (linha.texto || '').trim() !== '');
    await carregarNomesDosAlunos([...progresso.keys()], memoria.nomes);
    return montarAlunosDoProgresso(progresso, {
        nomes: memoria.nomes, minimos, correcoes: somarCorrecoesDaIa(linhasIa, pontos),
        entregues: new Set(entregas.map((entrega) => entrega.aluno_id + '|' + entrega.tentativa)),
    });
}

// Textos de cada tipo: a coluna "parcial" vale também antes da entrega; a "final" só com a
// entrega feita (e, na discursiva, com tudo corrigido pela IA).
const FONTES_PROGRESSO_TURMA = {
    [TIPO_PROGRESSO_OBJETIVA]: {
        lerEstrutura: lerEstruturaObjetiva,
        lerAlunos: lerAlunosObjetiva,
        textos: {
            colunaParcial: 'Nota parcial (acertos)', colunaFinal: 'Nota final', icone: '✔',
            parte: 'resposta', partes: 'respostas', descricaoAcerto: 'questões respondidas',
            dicaParcial: 'Nota até agora pelos acertos nas questões respondidas (sobre o ' +
                'mínimo do aluno, máximo 10), calculada no banco.',
            dicaFinal: 'Nota da atividade entregue (acertos sobre o mínimo do aluno, máximo 10).',
            graficoCorrecao: '4. Acertos e erros (questões respondidas)',
            rotulosCorrecao: ['Certas', 'Meias certas', 'Erradas'],
            graficoNota: '5. Nota parcial por aluno (acertos)',
        },
    },
    [TIPO_PROGRESSO_DISCURSIVA]: {
        lerEstrutura: lerEstruturaDiscursiva,
        lerAlunos: lerAlunosDiscursiva,
        textos: {
            colunaParcial: 'Nota parcial IA', colunaFinal: 'Nota IA (a confirmar)', icone: '🤖',
            parte: 'tópico', partes: 'tópicos', descricaoAcerto: 'alternativas corrigidas',
            dicaParcial: 'Nota parcial sugerida pela IA (sobre o mínimo do aluno, máximo 10) — ' +
                'prévia; vale só depois da confirmação do professor.',
            dicaFinal: 'Nota sugerida pela IA com a prova entregue e as respostas corrigidas ' +
                '(sobre o mínimo do aluno, máximo 10) — vale só depois da confirmação do ' +
                'professor.',
            graficoCorrecao: '4. Correção da IA (alternativas)',
            rotulosCorrecao: ['Certas', 'Meias certas', 'Erradas'],
            graficoNota: '5. Nota parcial da IA por aluno (a confirmar)',
        },
    },
};

window.FONTES_PROGRESSO_TURMA = FONTES_PROGRESSO_TURMA;
window.TIPOS_PROGRESSO_TURMA = { objetiva: TIPO_PROGRESSO_OBJETIVA,
    discursiva: TIPO_PROGRESSO_DISCURSIVA };
