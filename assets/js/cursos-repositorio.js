// ── Repositório da página cursos.html ────────────────────────────
// Acesso ao Supabase para o CRUD da tabela curso e o vínculo turma × curso (turma.curso_id).
// Quem grava é decidido pelo banco: RLS da curso (perfil PROFESSOR) e a função
// definir_curso_turma (só o Professor Administrador). Curso nunca é apagado (DELETE apagaria as
// aulas em cascata): desativar = ativo 0. Depende de js/supabase.js (obterClienteSupabase).

const TABELA_CURSO_REPOSITORIO = "curso";
const TABELA_TURMA_CURSO_REPOSITORIO = "turma";
const RPC_ADMINISTRADOR_CURSO = "eh_professor_administrador";
const RPC_DEFINIR_CURSO_TURMA = "definir_curso_turma";
const COLUNAS_CURSO_REPOSITORIO = "id, nome_completo, descricao, unidade, ativo";
const COLUNAS_TURMA_CURSO_REPOSITORIO = "codigo, nome, turno, horario, local, curso_id";

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroCursos(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria o repositório da página, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioCursos(cliente) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /** @returns {Promise<boolean>} Se o usuário logado é o Professor Administrador. */
    async ehAdministrador() {
      return dadosOuErroCursos(await cliente.rpc(RPC_ADMINISTRADOR_CURSO)) === true;
    },

    /** @returns {Promise<Object[]>} Cursos pelo nome. */
    async listarCursos() {
      return dadosOuErroCursos(await cliente.from(TABELA_CURSO_REPOSITORIO)
        .select(COLUNAS_CURSO_REPOSITORIO).order("nome_completo"));
    },

    /** @returns {Promise<Object[]>} Turmas pelo código, com o curso de cada uma. */
    async listarTurmas() {
      return dadosOuErroCursos(await cliente.from(TABELA_TURMA_CURSO_REPOSITORIO)
        .select(COLUNAS_TURMA_CURSO_REPOSITORIO).order("codigo"));
    },

    /**
     * Inclui um curso.
     * @param {{nome_completo: string, descricao: string, unidade: string}} curso - Dados.
     * @returns {Promise<void>}
     */
    async incluirCurso(curso) {
      dadosOuErroCursos(await cliente.from(TABELA_CURSO_REPOSITORIO).insert(curso));
    },

    /**
     * Altera os dados de um curso (também usado para ativar/desativar).
     * @param {number} id - Id do curso.
     * @param {Object} campos - Colunas a gravar.
     * @returns {Promise<void>}
     */
    async alterarCurso(id, campos) {
      const gravar = { ...campos, updated_at: new Date().toISOString() };
      dadosOuErroCursos(await cliente.from(TABELA_CURSO_REPOSITORIO).update(gravar).eq("id", id));
    },

    /**
     * Liga a turma ao curso (cursoId null desvincula).
     * @param {string} turmaCodigo - Código da turma.
     * @param {number|null} cursoId - Id do curso ou null.
     * @returns {Promise<void>}
     */
    async definirCursoTurma(turmaCodigo, cursoId) {
      dadosOuErroCursos(await cliente.rpc(RPC_DEFINIR_CURSO_TURMA,
        { p_turma_codigo: turmaCodigo, p_curso_id: cursoId }));
    },
  };
}
