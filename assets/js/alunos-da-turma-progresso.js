// Professor: completa a lista do Progresso da turma GLOBAL (progresso-turma-global.js) com TODOS
// os alunos das turmas do curso da atividade, também os que ainda não responderam nada (linha
// com 0 questões). Vale para toda atividade com Progresso da turma (objetiva, prática e
// discursiva), as de hoje e as futuras. Os alunos das turmas são lidos uma vez por atividade.
// Só leitura; o RLS limita ao que o professor pode ver. Depende de js/supabase.js (sbGet).
// Pedido do usuário em 2026-10-14 (tarefa #137). Regra: docs/regras/atividades.md

const TENTATIVA_INICIAL_ALUNOS_DA_TURMA = 1;
const NOME_PADRAO_ALUNOS_DA_TURMA = 'Aluno sem nome';

const memoriaAlunosDaTurma = { atividadeId: null, alunos: [] };

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
 * Lê os alunos de todas as turmas do curso.
 * @param {number} cursoId - Id do curso.
 * @returns {Promise<{id: string, nome: string}[]>} Alunos.
 * @throws {Error} Se o banco recusar.
 */
async function lerAlunosDoCursoAlunosDaTurma(cursoId) {
    const turmas = await sbGet('turma', 'select=codigo&curso_id=eq.' + cursoId);
    if (!turmas.length) return [];

    const codigos = turmas.map((turma) => encodeURIComponent(turma.codigo)).join(',');
    return sbGet('aluno', 'select=id,nome&turma_codigo=in.(' + codigos + ')');
}

/**
 * Lê (uma vez por atividade) os alunos das turmas do curso da atividade.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{id: string, nome: string}[]>} Alunos (vazio se a atividade não tiver curso).
 */
async function obterAlunosDaTurma(atividadeId) {
    if (memoriaAlunosDaTurma.atividadeId === atividadeId) return memoriaAlunosDaTurma.alunos;

    const cursoId = await lerCursoDaAtividadeAlunosDaTurma(atividadeId);
    memoriaAlunosDaTurma.alunos = cursoId ? await lerAlunosDoCursoAlunosDaTurma(cursoId) : [];
    memoriaAlunosDaTurma.atividadeId = atividadeId;
    return memoriaAlunosDaTurma.alunos;
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
 * Acrescenta à lista do progresso os alunos das turmas que ainda não aparecem nela.
 * @param {Object[]} alunos - Alunos com resposta (formato comum).
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Object[]>} Todos os alunos, em ordem alfabética.
 */
async function completarComAlunosDaTurma(alunos, atividadeId) {
    const daTurma = await obterAlunosDaTurma(atividadeId);
    const presentes = new Set(alunos.map((aluno) => aluno.alunoId));
    const faltantes = daTurma.filter((aluno) => !presentes.has(aluno.id))
        .map(criarAlunoSemRespostaAlunosDaTurma);
    return [...alunos, ...faltantes].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

window.completarComAlunosDaTurma = completarComAlunosDaTurma;
