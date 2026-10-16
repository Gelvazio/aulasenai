// ── Repositório da página turmas.html ────────────────────────────
// Acesso ao Supabase para o CRUD da turma e da turmaprofessor (vínculo professor × turma).
// Quem pode gravar é decidido pelo banco: RLS da turma e da turmaprofessor +
// eh_professor_administrador(); a turma só é excluída se estiver vazia (turma_esta_vazia, #201)
// (só gelvazio.camargo@senai.local). O trigger turmaprofessor_exige_professor recusa quem não é
// PROFESSOR. Depende de js/supabase.js (obterClienteSupabase).

const TABELA_TURMAPROFESSOR = "turmaprofessor";
const TABELA_TURMA_REPOSITORIO = "turma";
const TABELA_USUARIO_REPOSITORIO = "usuario";
const RPC_ADMINISTRADOR_REPOSITORIO = "eh_professor_administrador";
const PERFIL_PROFESSOR_REPOSITORIO = "PROFESSOR";
const TABELA_UNIDADE_REPOSITORIO = "unidade";
const TABELA_CURSO_REPOSITORIO = "curso";
const COLUNAS_TURMA_REPOSITORIO = "codigo, nome, turno, horario, uc, hora_inicio, hora_fim, " +
  "unidade_id, curso_id, bloquear_horario, unidade:unidade_id(nome), curso:curso_id(nome_completo)";
const COLUNAS_UNIDADE_REPOSITORIO = "id, nome";
const COLUNAS_CURSO_REPOSITORIO = "id, nome_completo";
const COLUNAS_PROFESSOR_REPOSITORIO = "id, nome_completo, email";
const COLUNAS_VINCULO_REPOSITORIO = "id, turma_codigo, professor_id, criado_em";

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroTurmas(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria o repositório da página, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioTurmasProfessor(cliente) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /** @returns {Promise<boolean>} Se o usuário logado é o Professor Administrador. */
    async ehAdministrador() {
      return dadosOuErroTurmas(await cliente.rpc(RPC_ADMINISTRADOR_REPOSITORIO)) === true;
    },

    /** @returns {Promise<Object[]>} Turmas ordenadas pelo código. */
    async listarTurmas() {
      return dadosOuErroTurmas(await cliente.from(TABELA_TURMA_REPOSITORIO)
        .select(COLUNAS_TURMA_REPOSITORIO).order("codigo"));
    },

    /** @returns {Promise<Object[]>} Unidades pelo nome. */
    async listarUnidades() {
      return dadosOuErroTurmas(await cliente.from(TABELA_UNIDADE_REPOSITORIO)
        .select(COLUNAS_UNIDADE_REPOSITORIO).order("nome"));
    },

    /** @returns {Promise<Object[]>} Cursos pelo nome. */
    async listarCursos() {
      return dadosOuErroTurmas(await cliente.from(TABELA_CURSO_REPOSITORIO)
        .select(COLUNAS_CURSO_REPOSITORIO).order("nome_completo"));
    },

    /**
     * Cria uma turma.
     * @param {Object} turma - Colunas da turma (com o código).
     * @returns {Promise<void>}
     */
    async criarTurma(turma) {
      dadosOuErroTurmas(await cliente.from(TABELA_TURMA_REPOSITORIO).insert(turma));
    },

    /**
     * Altera os dados de uma turma (o código não muda).
     * @param {string} codigo - Código da turma.
     * @param {Object} dados - Colunas a gravar.
     * @returns {Promise<void>}
     */
    async alterarTurma(codigo, dados) {
      dadosOuErroTurmas(await cliente.from(TABELA_TURMA_REPOSITORIO).update(dados)
        .eq("codigo", codigo));
    },

    /**
     * Exclui uma turma; o RLS só deixa excluir turma vazia.
     * @param {string} codigo - Código da turma.
     * @returns {Promise<boolean>} Verdadeiro se o banco excluiu a linha.
     */
    async excluirTurma(codigo) {
      const linhas = dadosOuErroTurmas(await cliente.from(TABELA_TURMA_REPOSITORIO).delete()
        .eq("codigo", codigo).select("codigo"));
      return Boolean(linhas?.length);
    },

    /** @returns {Promise<Object[]>} Usuários com perfil PROFESSOR, pelo nome. */
    async listarProfessores() {
      return dadosOuErroTurmas(await cliente.from(TABELA_USUARIO_REPOSITORIO)
        .select(COLUNAS_PROFESSOR_REPOSITORIO).eq("perfil", PERFIL_PROFESSOR_REPOSITORIO)
        .order("nome_completo"));
    },

    /** @returns {Promise<Object[]>} Vínculos professor × turma, do mais recente ao mais antigo. */
    async listarVinculos() {
      return dadosOuErroTurmas(await cliente.from(TABELA_TURMAPROFESSOR)
        .select(COLUNAS_VINCULO_REPOSITORIO).order("criado_em", { ascending: false }));
    },

    /**
     * Cria um vínculo.
     * @param {{turma_codigo: string, professor_id: string}} vinculo - Turma e professor.
     * @returns {Promise<void>}
     */
    async criarVinculo(vinculo) {
      dadosOuErroTurmas(await cliente.from(TABELA_TURMAPROFESSOR).insert(vinculo));
    },

    /**
     * Exclui um vínculo.
     * @param {number} id - Id do vínculo.
     * @returns {Promise<void>}
     */
    async excluirVinculo(id) {
      dadosOuErroTurmas(await cliente.from(TABELA_TURMAPROFESSOR).delete().eq("id", id));
    },
  };
}
