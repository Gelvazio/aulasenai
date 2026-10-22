// ── Repositório da página alunos.html ────────────────────────────
// Acesso ao Supabase para o CRUD de turmaaluno (vínculo aluno × turma).
// Quem pode gravar é decidido pelo banco: RLS da turmaaluno + eh_professor(). O trigger
// turmaaluno_exige_aluno recusa quem não é ALUNO. Depende de js/supabase.js (obterClienteSupabase).

const TABELA_TURMAALUNO = "turmaaluno";
const TABELA_TURMA_ALUNOS = "turma";
const TABELA_USUARIO_ALUNOS = "usuario";
const PERFIL_ALUNO_REPOSITORIO = "ALUNO";
const PERFIL_PROFESSOR_ALUNOS = "PROFESSOR";
const COLUNAS_TURMA_ALUNOS = "codigo, nome, turno, horario, unidade:unidade_id(nome), uc";
const COLUNAS_ALUNO_REPOSITORIO = "id, nome_completo, email, lider";
const COLUNAS_VINCULO_ALUNO = "id, turma_codigo, aluno_id, criado_em, desistente, desistente_em";
const FUNCAO_DESISTENTE_ALUNOS = "definir_desistente";
const FUNCAO_SUGESTOES_ALUNOS = "sugestoes_turmaaluno";

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroAlunos(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria o repositório da página, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioTurmasAluno(cliente) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /**
     * Se o usuário é professor (o banco confirma de novo em cada gravação, pelo RLS).
     * @param {Object} usuario - Usuário logado.
     * @returns {boolean} Verdadeiro para o perfil PROFESSOR do app_metadata.
     */
    ehProfessor(usuario) {
      return usuario?.app_metadata?.perfil === PERFIL_PROFESSOR_ALUNOS;
    },

    /** @returns {Promise<Object[]>} Turmas ordenadas pelo código. */
    async listarTurmas() {
      return dadosOuErroAlunos(await cliente.from(TABELA_TURMA_ALUNOS)
        .select(COLUNAS_TURMA_ALUNOS).order("codigo"));
    },

    /** @returns {Promise<Object[]>} Usuários com perfil ALUNO, pelo nome. */
    async listarAlunos() {
      return dadosOuErroAlunos(await cliente.from(TABELA_USUARIO_ALUNOS)
        .select(COLUNAS_ALUNO_REPOSITORIO).eq("perfil", PERFIL_ALUNO_REPOSITORIO)
        .order("nome_completo"));
    },

    /** @returns {Promise<Object[]>} Vínculos aluno × turma. */
    async listarVinculos() {
      return dadosOuErroAlunos(await cliente.from(TABELA_TURMAALUNO)
        .select(COLUNAS_VINCULO_ALUNO).order("turma_codigo"));
    },

    /**
     * Alunos ainda sem vínculo, com a turma sugerida (função sugestoes_turmaaluno do banco).
     * @returns {Promise<Object[]>} Linhas {aluno_id, nome_completo, email, turma_sugerida,
     *   turma_nome}.
     */
    async listarSugestoes() {
      return dadosOuErroAlunos(await cliente.rpc(FUNCAO_SUGESTOES_ALUNOS));
    },

    /**
     * Cria um vínculo.
     * @param {{turma_codigo: string, aluno_id: string}} vinculo - Turma e aluno.
     * @returns {Promise<void>}
     */
    async criarVinculo(vinculo) {
      dadosOuErroAlunos(await cliente.from(TABELA_TURMAALUNO).insert(vinculo));
    },

    /**
     * Altera a turma e/ou o aluno de um vínculo.
     * @param {number} id - Id do vínculo.
     * @param {{turma_codigo: string, aluno_id: string}} vinculo - Novos valores.
     * @returns {Promise<void>}
     */
    async alterarVinculo(id, vinculo) {
      dadosOuErroAlunos(await cliente.from(TABELA_TURMAALUNO).update(vinculo).eq("id", id));
    },

    /**
     * Exclui um vínculo.
     * @param {number} id - Id do vínculo.
     * @returns {Promise<void>}
     */
    async excluirVinculo(id) {
      dadosOuErroAlunos(await cliente.from(TABELA_TURMAALUNO).delete().eq("id", id));
    },

    /**
     * Marca (1) ou desmarca (0) o aluno líder das equipes (função definir_lider_usuario).
     * @param {string} usuarioId - Id do aluno (usuario.id).
     * @param {number} lider - 1 = líder, 0 = não.
     * @returns {Promise<void>}
     */
    async definirLider(usuarioId, lider) {
      dadosOuErroAlunos(await cliente.rpc("definir_lider_usuario",
        { p_usuario: usuarioId, p_lider: lider }));
    },

    /**
     * Marca ou desmarca o aluno como desistente da turma (função definir_desistente).
     * @param {number} id - Id do vínculo (turmaaluno.id).
     * @param {boolean} desistente - true = desistente, false = reativa o aluno.
     * @returns {Promise<void>}
     * @throws {Error} Erro do banco (ex.: não é professor da turma).
     */
    async definirDesistente(id, desistente) {
      dadosOuErroAlunos(await cliente.rpc(FUNCAO_DESISTENTE_ALUNOS,
        { p_vinculo: id, p_desistente: desistente }));
    },
  };
}
