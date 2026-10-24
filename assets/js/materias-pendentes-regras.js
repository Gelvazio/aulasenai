// ── Regras da página materias-pendentes.html ─────────────────────
// Funções puras (sem DOM, sem banco) que decidem o que é "pendente" (#357): quais matérias
// aparecem no filtro Curso / Ano / Semestre e o que falta em cada uma, agrupado em CONTEÚDO,
// AULAS, ATIVIDADE OBJETIVA, ATIVIDADE PRÁTICA, BANCO, APOSTILA, MÉDIA FINAL e OUTROS.
// Os dados vêm de materias-pendentes.json (repositório); cada peça tem ok = true/false.
// Para um tipo novo de peça, acrescentar uma linha em CATEGORIAS_PENDENCIA (sem mexer nas funções).

const SITUACAO_CONCLUIDA_PENDENTES = "✅ CONCLUÍDA";
const VALOR_TODOS_PENDENTES = "";
const VALOR_SEM_CURSO_PENDENTES = "sem";
const ROTULO_SEM_CURSO_PENDENTES = "Sem curso no banco";
const ROTULO_OUTROS_PENDENTES = "OUTROS";
const PREFIXO_AULA_PENDENTES = "Aula ";
// A 1ª linha cujo padrão casar com o nome da peça vale; a ordem é a ordem de exibição.
const CATEGORIAS_PENDENCIA = [
  { rotulo: "CONTEÚDO", padrao: /CONTEUDO|Ementa|Dados da matéria/i },
  { rotulo: "AULAS", padrao: /Aula pronta|Status das aulas/i },
  { rotulo: "ATIVIDADE OBJETIVA", padrao: /Objetiva/i },
  { rotulo: "ATIVIDADE PRÁTICA", padrao: /Pr[aá]tica/i },
  { rotulo: "BANCO (SEEDS)", padrao: /Banco/i },
  { rotulo: "APOSTILA", padrao: /Apostila/i },
  { rotulo: "MÉDIA FINAL", padrao: /M[eé]dia final/i },
];

/**
 * Descobre a categoria de uma peça pelo nome.
 * @param {string} nomePeca - Nome da peça (ex.: "Objetiva (página)").
 * @returns {string} Rótulo da categoria; OUTROS quando nenhuma casar.
 */
function categoriaDaPeca(nomePeca) {
  const categoria = CATEGORIAS_PENDENCIA.find((item) => item.padrao.test(nomePeca));
  return categoria ? categoria.rotulo : ROTULO_OUTROS_PENDENTES;
}

/**
 * Indica se a matéria ainda tem pendência (situação diferente de CONCLUÍDA).
 * @param {{situacao: string}} materia - Matéria do JSON.
 * @returns {boolean} true quando falta alguma peça.
 */
function ehMateriaPendente(materia) {
  return materia.situacao !== SITUACAO_CONCLUIDA_PENDENTES;
}

/**
 * Soma as peças que faltam das aulas por categoria e por aula.
 * @param {{aulas: Object[]}} materia - Matéria do JSON.
 * @returns {Map<string, Map<string, string[]>>} categoria → aula → nomes das peças que faltam.
 */
function faltasPorAula(materia) {
  const faltas = new Map();
  materia.aulas.forEach((aula) => {
    Object.entries(aula.pecas).filter(([, ok]) => !ok).forEach(([nome]) => {
      const categoria = categoriaDaPeca(nome);
      const chave = PREFIXO_AULA_PENDENTES + aula.aula;
      const porAula = faltas.get(categoria) ?? new Map();
      porAula.set(chave, [...(porAula.get(chave) ?? []), nome]);
      faltas.set(categoria, porAula);
    });
  });
  return faltas;
}

/**
 * Junta as peças da matéria que faltam (sem aula) às faltas por categoria.
 * @param {{pecas: Object[]}} materia - Matéria do JSON.
 * @param {Map<string, Map<string, string[]>>} faltas - Resultado de faltasPorAula (alterado).
 */
function acrescentarFaltasDePecas(materia, faltas) {
  materia.pecas.filter((peca) => !peca.ok).forEach((peca) => {
    const categoria = categoriaDaPeca(peca.peca);
    const porAula = faltas.get(categoria) ?? new Map();
    porAula.set(peca.peca, []);
    faltas.set(categoria, porAula);
  });
}

/**
 * Lista o que está pendente na matéria, agrupado por categoria, na ordem de exibição.
 * @param {Object} materia - Matéria do JSON (pecas e aulas).
 * @returns {{categoria: string, itens: string[]}[]} Categorias com pendência e seus itens.
 */
function pendenciasDaMateria(materia) {
  const faltas = faltasPorAula(materia);
  acrescentarFaltasDePecas(materia, faltas);
  const ordem = [...CATEGORIAS_PENDENCIA.map((c) => c.rotulo), ROTULO_OUTROS_PENDENTES];
  return ordem.filter((categoria) => faltas.has(categoria)).map((categoria) => ({
    categoria,
    itens: [...faltas.get(categoria)].map(([nome, pecas]) =>
      pecas.length ? `${nome} — ${pecas.join(", ")}` : nome),
  }));
}

/**
 * Confere se a matéria passa nos filtros de ano e semestre (curso já decidido pelo id).
 * @param {Object|undefined} curso - Curso do banco (ano e semestre) ou undefined.
 * @param {{ano: string, semestre: string}} filtro - Valores escolhidos ("" = todos).
 * @returns {boolean} true quando passa.
 */
function passaAnoESemestre(curso, filtro) {
  const exigeAno = filtro.ano !== VALOR_TODOS_PENDENTES;
  const exigeSemestre = filtro.semestre !== VALOR_TODOS_PENDENTES;
  if (!curso) return !exigeAno && !exigeSemestre;
  const anoCasa = !exigeAno || String(curso.ano) === filtro.ano;
  const semestreCasa = !exigeSemestre || String(curso.semestre) === filtro.semestre;
  return anoCasa && semestreCasa;
}

/**
 * Confere se a matéria pertence ao curso escolhido no filtro.
 * @param {{curso_id: number|null}} materia - Matéria do JSON.
 * @param {string} cursoEscolhido - "" (todos), "sem" (sem curso no banco) ou o id do curso.
 * @returns {boolean} true quando pertence.
 */
function passaCurso(materia, cursoEscolhido) {
  if (cursoEscolhido === VALOR_TODOS_PENDENTES) return true;
  if (cursoEscolhido === VALOR_SEM_CURSO_PENDENTES) return materia.curso_id == null;
  return String(materia.curso_id) === cursoEscolhido;
}

/**
 * Filtra as matérias pendentes por curso, ano e semestre.
 * @param {Object[]} materias - Matérias do JSON.
 * @param {Map<number, Object>} cursosPorId - Cursos do banco, por id.
 * @param {{curso: string, ano: string, semestre: string}} filtro - Valores escolhidos.
 * @returns {Object[]} Matérias pendentes que passam nos filtros, na ordem do JSON.
 */
function filtrarMateriasPendentes(materias, cursosPorId, filtro) {
  return materias.filter((materia) =>
    ehMateriaPendente(materia)
    && passaCurso(materia, filtro.curso)
    && passaAnoESemestre(cursosPorId.get(materia.curso_id), filtro));
}

/**
 * Lista os valores distintos de uma coluna do curso (ano ou semestre), em ordem crescente.
 * @param {Object[]} cursos - Cursos do banco.
 * @param {string} coluna - "ano" ou "semestre".
 * @returns {number[]} Valores preenchidos, sem repetir.
 */
function valoresDistintosDoCurso(cursos, coluna) {
  const valores = cursos.map((curso) => curso[coluna]).filter((valor) => valor != null);
  return [...new Set(valores)].sort((a, b) => a - b);
}

/**
 * Agrupa as matérias pelo nome do curso (ordem do JSON).
 * @param {Object[]} materias - Matérias já filtradas.
 * @param {Map<number, Object>} cursosPorId - Cursos do banco, por id.
 * @returns {{curso: string, materias: Object[]}[]} Grupos de matérias por curso.
 */
function agruparMateriasPorCurso(materias, cursosPorId) {
  const grupos = new Map();
  materias.forEach((materia) => {
    const curso = cursosPorId.get(materia.curso_id);
    const nome = curso ? curso.nome_completo : ROTULO_SEM_CURSO_PENDENTES;
    grupos.set(nome, [...(grupos.get(nome) ?? []), materia]);
  });
  return [...grupos].map(([curso, lista]) => ({ curso, materias: lista }));
}
