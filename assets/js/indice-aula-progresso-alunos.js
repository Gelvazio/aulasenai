// Professor, modal "Progresso das atividades" do card da aula: lê os alunos da turma escolhida no
// combo "Turma:" do índice, SEM os desistentes e SEM os alunos que faltaram nos dias das
// atividades da aula (mesma tabela e mesma regra do "Faltou?" do Progresso da turma:
// falta_aluno.data = dia da atividade; ver falta-aluno-progresso.js). Só lê; o RLS limita o
// professor às turmas dele. Depende de js/supabase.js (sbGet). Tarefa #421.3.

const SELETOR_COMBO_TURMA_PROGRESSO_AULA = '.barra-turma-favorita__lista';
const TABELA_ALUNOS_DA_TURMA_PROGRESSO = 'turmaaluno';
const TABELA_NOMES_ALUNOS_PROGRESSO = 'aluno';
const TABELA_FALTAS_PROGRESSO = 'falta_aluno';
const MSG_SEM_TURMA_PROGRESSO = 'Escolha uma turma no combo "Turma:" para ver o progresso.';

/**
 * Lê o código da turma escolhida no combo do índice.
 * @returns {string} Código da turma (vazio se não houver turma escolhida).
 */
function lerTurmaEscolhidaProgresso() {
    return document.querySelector(SELETOR_COMBO_TURMA_PROGRESSO_AULA)?.value || '';
}

/**
 * Lê os ids dos alunos ativos (não desistentes) da turma.
 * @param {string} turma - Código da turma.
 * @returns {Promise<string[]>} Ids dos alunos.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerIdsDosAlunosDaTurmaProgresso(turma) {
    const linhas = await sbGet(TABELA_ALUNOS_DA_TURMA_PROGRESSO,
        'select=aluno_id,desistente&turma_codigo=eq.' + encodeURIComponent(turma));
    return linhas.filter((linha) => !linha.desistente).map((linha) => linha.aluno_id);
}

/**
 * Lê os nomes dos alunos (sem os que desistiram).
 * @param {string[]} ids - Ids dos alunos.
 * @returns {Promise<{id: string, nome: string}[]>} Alunos com nome.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerNomesDosAlunosProgresso(ids) {
    if (!ids.length) return [];

    const linhas = await sbGet(TABELA_NOMES_ALUNOS_PROGRESSO,
        'select=id,nome,desistente&id=in.(' + ids.join(',') + ')');
    return linhas.filter((linha) => !linha.desistente)
        .map((linha) => ({ id: linha.id, nome: linha.nome || 'Aluno sem nome' }));
}

/**
 * Lê os alunos que faltaram em algum dos dias (o RLS devolve só os das turmas do professor).
 * @param {string[]} dias - Datas AAAA-MM-DD das atividades da aula.
 * @returns {Promise<Set<string>>} Ids dos alunos que faltaram.
 * @throws {Error} Se o banco recusar a leitura.
 */
async function lerAlunosQueFaltaramProgresso(dias) {
    if (!dias.length) return new Set();

    const linhas = await sbGet(TABELA_FALTAS_PROGRESSO,
        'select=aluno_id&data=in.(' + dias.join(',') + ')');
    return new Set(linhas.map((linha) => linha.aluno_id));
}

/**
 * Lista os alunos presentes da turma escolhida, em ordem alfabética.
 * @param {{dias: string[]}} opcoes - Dias das atividades da aula (para tirar quem faltou).
 * @returns {Promise<{turma: string, alunos: {id: string, nome: string}[]}>} Turma e alunos.
 * @throws {Error} Sem turma escolhida ou se o banco recusar a leitura.
 */
async function lerAlunosPresentesDaTurma({ dias }) {
    const turma = lerTurmaEscolhidaProgresso();
    if (!turma) throw new Error(MSG_SEM_TURMA_PROGRESSO);

    const [ids, faltaram] = await Promise.all([lerIdsDosAlunosDaTurmaProgresso(turma),
        lerAlunosQueFaltaramProgresso(dias)]);
    const alunos = (await lerNomesDosAlunosProgresso(ids))
        .filter((aluno) => !faltaram.has(aluno.id))
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return { turma, alunos };
}

window.lerAlunosPresentesDaTurma = lerAlunosPresentesDaTurma;
