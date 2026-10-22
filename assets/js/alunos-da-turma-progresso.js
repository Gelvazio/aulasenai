// Professor: completa a lista do Progresso da turma GLOBAL (progresso-turma-global.js) com TODOS
// os alunos da turma escolhida, também os que ainda não responderam nada (linha com 0 questões).
// Combo "Turma" ao lado do título "Progresso da turma": as turmas do curso da atividade (curso da
// aula, senão o da matéria) e "Todas as turmas"; abre na turma favorita (turma.favorito) quando
// ela for do curso, senão em "Todas as turmas". Com uma turma escolhida, a lista (e o resumo,
// Gráficos e Cálculo Nota) fica só com os alunos dela — também tira quem respondeu sendo de outra
// turma. Vale para toda atividade com Progresso da turma (objetiva, prática e discursiva).
// Só leitura; o RLS limita ao que o professor pode ver. Depende de js/supabase.js (sbGet).
// Pedidos do usuário em 2026-10-14 (tarefas #137 e #139). Regra: docs/regras/atividades.md

const TENTATIVA_INICIAL_ALUNOS_DA_TURMA = 1;
const NOME_PADRAO_ALUNOS_DA_TURMA = 'Aluno sem nome';
const VALOR_TODAS_TURMAS_PROGRESSO = '';
const TEXTO_TODAS_TURMAS_PROGRESSO = 'Todas as turmas';
const ROTULO_COMBO_TURMA_PROGRESSO = 'Turma:';
const CLASSE_COMBO_TURMA_PROGRESSO = 'progresso-turma__turma';
const ID_COMBO_TURMA_PROGRESSO = 'progresso-turma-combo-turma';

const memoriaAlunosDaTurma = {
    atividadeId: null, turmas: [], turmaEscolhida: VALOR_TODAS_TURMAS_PROGRESSO,
    alunosPorTurma: new Map(),
};

/**
 * Lê o curso da atividade (curso da aula; sem ele, o curso da matéria).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<number|null>} Id do curso, ou null se não houver.
 * @throws {Error} Se o banco recusar.
 */
async function lerCursoDaAtividadeAlunosDaTurma(atividadeId) {
    const [atividade] = await sbGet('atividade',
        'select=aulas(curso_id,materia(curso_id))&id=eq.' + atividadeId);
    const aula = atividade?.aulas;
    return aula?.curso_id || aula?.materia?.curso_id || null;
}

/**
 * Lê (uma vez por atividade) as turmas do curso da atividade e deixa escolhida a favorita.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{codigo: string, nome: string, favorito: boolean}[]>} Turmas do curso.
 * @throws {Error} Se o banco recusar.
 */
async function obterTurmasDoCursoProgresso(atividadeId) {
    if (memoriaAlunosDaTurma.atividadeId === atividadeId) return memoriaAlunosDaTurma.turmas;

    const cursoId = await lerCursoDaAtividadeAlunosDaTurma(atividadeId);
    const turmas = cursoId
        ? await sbGet('turma', 'select=codigo,nome,favorito&curso_id=eq.' + cursoId +
            '&order=nome') : [];
    const favorita = turmas.find((turma) => turma.favorito === true);
    Object.assign(memoriaAlunosDaTurma, { atividadeId, turmas, alunosPorTurma: new Map(),
        turmaEscolhida: favorita ? favorita.codigo : VALOR_TODAS_TURMAS_PROGRESSO });
    return turmas;
}

/**
 * Lê (uma vez por escolha) os alunos da turma escolhida, ou de todas as turmas do curso.
 * @param {string} turmaEscolhida - Código da turma ou vazio (todas).
 * @returns {Promise<{id: string, nome: string}[]>} Alunos.
 * @throws {Error} Se o banco recusar.
 */
async function lerAlunosDaTurmaEscolhida(turmaEscolhida) {
    const { turmas, alunosPorTurma } = memoriaAlunosDaTurma;
    if (alunosPorTurma.has(turmaEscolhida)) return alunosPorTurma.get(turmaEscolhida);

    const codigos = turmaEscolhida ? [turmaEscolhida] : turmas.map((turma) => turma.codigo);
    // Desistente (#342) não entra na lista de alunos sem resposta.
    const alunos = codigos.length ? await sbGet('aluno', 'select=id,nome&desistente=eq.false' +
        '&turma_codigo=in.(' + codigos.map(encodeURIComponent).join(',') + ')') : [];
    alunosPorTurma.set(turmaEscolhida, alunos);
    return alunos;
}

/**
 * Cria a linha (formato comum de progresso-turma-fontes.js) de um aluno sem resposta.
 * @param {{id: string, nome: string}} aluno - Aluno da turma.
 * @returns {Object} Aluno sem nenhuma questão respondida.
 */
function criarAlunoSemRespostaAlunosDaTurma(aluno) {
    return {
        alunoId: aluno.id, tentativa: TENTATIVA_INICIAL_ALUNOS_DA_TURMA,
        nome: aluno.nome || NOME_PADRAO_ALUNOS_DA_TURMA, porQuestao: new Map(),
        entregue: false, entreguePorProfessor: false, minimoDoAluno: null, correcao: null,
    };
}

/**
 * Acrescenta à lista do progresso os alunos da turma escolhida que ainda não aparecem nela; com
 * uma turma escolhida, tira também quem respondeu sendo de outra turma.
 * @param {Object[]} alunos - Alunos com resposta (formato comum).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Alunos da lista, em ordem alfabética.
 */
async function completarComAlunosDaTurma(alunos, atividadeId) {
    await obterTurmasDoCursoProgresso(atividadeId);
    const { turmaEscolhida } = memoriaAlunosDaTurma;
    const daTurma = await lerAlunosDaTurmaEscolhida(turmaEscolhida);
    const idsDaTurma = new Set(daTurma.map((aluno) => aluno.id));
    const comResposta = turmaEscolhida
        ? alunos.filter((aluno) => idsDaTurma.has(aluno.alunoId)) : alunos;
    const presentes = new Set(comResposta.map((aluno) => aluno.alunoId));
    const faltantes = daTurma.filter((aluno) => !presentes.has(aluno.id))
        .map(criarAlunoSemRespostaAlunosDaTurma);
    return [...comResposta, ...faltantes].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/**
 * Cria o combo "Turma" do Progresso da turma (abre na turma favorita do curso, se houver).
 * @param {{atividadeId: number, aoMudar: Function}} dados - Atividade e releitura da lista.
 * @returns {Promise<HTMLElement>} Rótulo com o combo.
 * @throws {Error} Se o banco recusar.
 */
async function criarComboTurmaProgresso(dados) {
    const turmas = await obterTurmasDoCursoProgresso(dados.atividadeId);
    const rotulo = document.createElement('label');
    rotulo.className = CLASSE_COMBO_TURMA_PROGRESSO;
    rotulo.htmlFor = ID_COMBO_TURMA_PROGRESSO;
    rotulo.textContent = ROTULO_COMBO_TURMA_PROGRESSO + ' ';
    const combo = document.createElement('select');
    combo.id = ID_COMBO_TURMA_PROGRESSO;
    combo.className = CLASSE_COMBO_TURMA_PROGRESSO + '-opcoes';
    combo.add(new Option(TEXTO_TODAS_TURMAS_PROGRESSO, VALOR_TODAS_TURMAS_PROGRESSO));
    turmas.forEach((turma) => combo.add(new Option(
        (turma.favorito ? '⭐ ' : '') + (turma.nome || turma.codigo) + ' (' + turma.codigo + ')',
        turma.codigo)));
    combo.value = memoriaAlunosDaTurma.turmaEscolhida;
    combo.addEventListener('change', () => {
        memoriaAlunosDaTurma.turmaEscolhida = combo.value;
        dados.aoMudar();
    });
    rotulo.append(combo);
    return rotulo;
}

window.completarComAlunosDaTurma = completarComAlunosDaTurma;
window.criarComboTurmaProgresso = criarComboTurmaProgresso;
