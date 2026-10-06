// ── Repositório da página pendencias.html (MATERIAIS/AGENDA_COLABORADOR) ──
// Acesso ao Supabase para o CRUD da tabela pendencias. Quem lê e grava é decidido pelo banco:
// RLS com eh_professor_administrador(). Não existe DELETE: excluir = excluido = 1.
// Depende de js/supabase.js (obterClienteSupabase). SQL: database/2026-10-06-pendencias.sql.

const TABELA_PENDENCIAS = "pendencias";
const RPC_ADMINISTRADOR_PENDENCIAS = "eh_professor_administrador";
const COLUNAS_PENDENCIAS = "id, nome, responsavel, datainicio, status, excluido";
const EXCLUIDO_SIM = 1;
const EXCLUIDO_NAO = 0;

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroPendencias(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria o repositório da página, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioPendencias(cliente) {
  const tabela = () => cliente.from(TABELA_PENDENCIAS);
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /** @returns {Promise<boolean>} Se o usuário logado é o Professor Administrador. */
    async ehAdministrador() {
      return dadosOuErroPendencias(await cliente.rpc(RPC_ADMINISTRADOR_PENDENCIAS)) === true;
    },

    /** @returns {Promise<Object[]>} Todas as pendências (inclusive excluídas), recentes antes. */
    async listar() {
      return dadosOuErroPendencias(await tabela().select(COLUNAS_PENDENCIAS)
        .order("datainicio", { ascending: false }).order("id", { ascending: false }));
    },

    /**
     * Cria uma pendência.
     * @param {{nome: string, responsavel: string, datainicio: string, status: string}} dados -
     *   Campos da pendência.
     * @returns {Promise<void>}
     */
    async criar(dados) {
      dadosOuErroPendencias(await tabela().insert(dados));
    },

    /**
     * Altera campos de uma pendência.
     * @param {number} id - Id da pendência.
     * @param {Object} dados - Campos a alterar.
     * @returns {Promise<void>}
     */
    async alterar(id, dados) {
      dadosOuErroPendencias(await tabela().update(dados).eq("id", id));
    },

    /**
     * Exclusão lógica: marca excluido = 1 (a linha continua no banco).
     * @param {number} id - Id da pendência.
     * @returns {Promise<void>}
     */
    async excluir(id) {
      dadosOuErroPendencias(await tabela().update({ excluido: EXCLUIDO_SIM }).eq("id", id));
    },

    /**
     * Restaura uma pendência excluída (excluido = 0).
     * @param {number} id - Id da pendência.
     * @returns {Promise<void>}
     */
    async restaurar(id) {
      dadosOuErroPendencias(await tabela().update({ excluido: EXCLUIDO_NAO }).eq("id", id));
    },
  };
}
