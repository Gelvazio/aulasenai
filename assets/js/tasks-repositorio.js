// ── Repositório da página tasks.html ─────────────────────────────
// Acesso ao Supabase para o CRUD da tabela tasks (fila lida pelo agendador único, tarefa #24).
// Quem grava é decidido pelo banco: RLS da tasks (só o Professor Administrador) e o trigger
// tasks_validar_pagina (a página nunca põe nem tira uma task de "em_execucao"). Não há DELETE:
// excluir = excluido true. Plano: docs/fila-tasks-agendador-unico.md.
// Depende de js/supabase.js (obterClienteSupabase).

const TABELA_TASKS_REPOSITORIO = "tasks";
const RPC_ADMINISTRADOR_TASKS = "eh_professor_administrador";
const COLUNAS_TASKS_REPOSITORIO = "id, codigo, origem, arquivo_md, sincronizado_em, titulo, " +
  "instrucao, prioridade, executar, executar_apos, status, tentativas, max_tentativas, " +
  "trava_frente, expira_em, resultado, pr_url, commit_sha, excluido, criado_em, atualizado_em, " +
  "ordem, task_dependente";

/**
 * Lança o erro do Supabase, se houver, e devolve os dados.
 * @param {{data: any, error: Object|null}} resposta - Resposta do supabase-js.
 * @returns {any} Dados da resposta.
 * @throws {Error} Erro devolvido pelo banco.
 */
function dadosOuErroTasks(resposta) {
  if (resposta.error) throw resposta.error;
  return resposta.data;
}

/**
 * Cria o repositório da página, com o cliente do Supabase injetado.
 * @param {Object} cliente - Cliente do Supabase (supabase-js).
 * @returns {Object} Funções de acesso aos dados.
 */
function criarRepositorioTasks(cliente) {
  return {
    /** @returns {Promise<Object|null>} Usuário logado ou null. */
    async usuarioLogado() {
      const { data } = await cliente.auth.getSession();
      return data?.session?.user || null;
    },

    /** @returns {Promise<boolean>} Se o usuário logado é o Professor Administrador. */
    async ehAdministrador() {
      return dadosOuErroTasks(await cliente.rpc(RPC_ADMINISTRADOR_TASKS)) === true;
    },

    /** @returns {Promise<Object[]>} Tasks não excluídas, na ordem da fila (prioridade, ordem, criação). */
    async listarTasks() {
      return dadosOuErroTasks(await cliente.from(TABELA_TASKS_REPOSITORIO)
        .select(COLUNAS_TASKS_REPOSITORIO).eq("excluido", false)
        .order("prioridade").order("ordem", { nullsFirst: false }).order("criado_em"));
    },

    /**
     * Inclui uma task (o código TASK-NNNN e o arquivo em tasks/fila/ vêm do banco).
     * @param {Object} task - titulo, instrucao, prioridade, executar, executar_apos, max_tentativas.
     * @returns {Promise<void>}
     */
    async incluirTask(task) {
      dadosOuErroTasks(await cliente.from(TABELA_TASKS_REPOSITORIO)
        .insert({ ...task, origem: "pagina" }));
    },

    /**
     * Altera campos de uma task (editar, ON/OFF, cancelar, reabrir, excluir lógico).
     * @param {number} id - Id da task.
     * @param {Object} campos - Colunas a gravar.
     * @returns {Promise<void>}
     */
    async alterarTask(id, campos) {
      dadosOuErroTasks(await cliente.from(TABELA_TASKS_REPOSITORIO).update(campos).eq("id", id));
    },
  };
}
