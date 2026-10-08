// Unidade de cada turma (arquivo global, pedido do usuário em 2026-10-08): código da turma no
// banco (turma.codigo) → nome da unidade onde ela está, com o turno (ex.: "CEPLAS MANHÃ").
// Usado em todas as listas de seleção de turma: "133933 — AI AIAC 2026/2 V1 · AIAC SALETE TARDE".
// Turma nova: acrescentar uma linha em UNIDADES_POR_TURMA. Turma que não está aqui usa o local +
// turno da tabela turma (o turno não se repete se o local já o traz).

const UNIDADES_POR_TURMA = {
    '122552': 'TAIÓ TARDE',
    '124403': 'ROBERTO MACHADO TARDE',
    '133933': 'AIAC SALETE TARDE',
    '135080': 'CEPLAS MANHÃ',
    '135081': 'CEPLAS TARDE',
    'QA LBTSN 2026/1 M2': 'CEPLAS MANHÃ',
};

/**
 * Normaliza um texto para comparar sem acentos e sem diferenciar maiúsculas.
 * @param {string} texto - Texto original.
 * @returns {string} Texto em maiúsculas e sem acentos.
 */
function normalizarTextoUnidade(texto) {
    return String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
}

/**
 * Monta a unidade pelo local + turno da tabela turma (turma fora de UNIDADES_POR_TURMA).
 * @param {{local?: string, turno?: string}} turma - Turma do banco ou da lista.
 * @returns {string} Unidade (vazio se a turma não tem local nem turno).
 */
function montarUnidadePeloLocal(turma) {
    const local = String(turma?.local || '').trim().toUpperCase();
    const turno = String(turma?.turno || '').trim().toUpperCase();
    const localJaTemTurno = turno && normalizarTextoUnidade(local).includes(
        normalizarTextoUnidade(turno));
    if (!turno || localJaTemTurno) return local;
    return [local, turno].filter(Boolean).join(' ');
}

/**
 * Nome da unidade da turma: primeiro UNIDADES_POR_TURMA, depois local + turno do banco.
 * @param {{codigo?: string, local?: string, turno?: string}} turma - Turma.
 * @returns {string} Unidade (vazio se não houver dado).
 */
function montarUnidadeTurma(turma) {
    const unidadeCadastrada = UNIDADES_POR_TURMA[String(turma?.codigo || '')];
    if (unidadeCadastrada) return unidadeCadastrada;
    return montarUnidadePeloLocal(turma);
}

/**
 * Acrescenta a unidade ao texto de uma opção de turma ("texto · UNIDADE").
 * @param {string} texto - Texto já montado da turma.
 * @param {Object} turma - Turma (com codigo, local e turno).
 * @returns {string} Texto com a unidade, ou o próprio texto se não houver unidade.
 */
function acrescentarUnidadeTurma(texto, turma) {
    const unidade = montarUnidadeTurma(turma);
    return unidade ? texto + ' · ' + unidade : texto;
}
