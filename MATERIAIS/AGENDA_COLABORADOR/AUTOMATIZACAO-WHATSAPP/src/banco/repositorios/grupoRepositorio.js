/**
 * Acesso à tabela `grupos`.
 */
import { agoraIso } from '../../utilitarios/datas.js';

export class GrupoRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Insere ou atualiza os metadados de um grupo, preservando o campo `monitorado`.
   * @param {{jid: string, nome: string, descricao?: string, totalParticipantes?: number}} grupo
   * @returns {void}
   */
  salvarOuAtualizar(grupo) {
    const agora = agoraIso();
    this.banco
      .prepare(
        `INSERT INTO grupos (jid, nome, descricao, total_participantes, criado_em, atualizado_em)
         VALUES (:jid, :nome, :descricao, :total, :agora, :agora)
         ON CONFLICT (jid) DO UPDATE SET
           nome = excluded.nome,
           descricao = excluded.descricao,
           total_participantes = excluded.total_participantes,
           atualizado_em = excluded.atualizado_em`
      )
      .run({
        jid: grupo.jid,
        nome: grupo.nome || '',
        descricao: grupo.descricao || '',
        total: grupo.totalParticipantes || 0,
        agora,
      });
  }

  /**
   * Garante que o grupo exista (cria registro mínimo se ainda não sincronizado).
   * @param {string} jid - JID do grupo.
   * @returns {void}
   */
  garantirExistencia(jid) {
    const agora = agoraIso();
    this.banco
      .prepare(
        `INSERT OR IGNORE INTO grupos (jid, nome, criado_em, atualizado_em)
         VALUES (?, '', ?, ?)`
      )
      .run(jid, agora, agora);
  }

  /**
   * Lista os grupos com totais de mensagens e data do último resumo.
   * @param {{inicioHoje: string, inicioSemana: string}} periodos - Limites ISO.
   * @returns {object[]} Grupos com `mensagens_hoje`, `mensagens_semana`, `ultimo_resumo`.
   */
  listarComTotais(periodos) {
    return this.banco
      .prepare(
        `SELECT g.*,
           (SELECT COUNT(*) FROM mensagens m
              WHERE m.grupo_jid = g.jid AND m.enviada_em >= :inicioHoje) AS mensagens_hoje,
           (SELECT COUNT(*) FROM mensagens m
              WHERE m.grupo_jid = g.jid AND m.enviada_em >= :inicioSemana) AS mensagens_semana,
           (SELECT MAX(r.criado_em) FROM resumos r WHERE r.grupo_jid = g.jid) AS ultimo_resumo,
           (SELECT COUNT(*) FROM alertas a
              WHERE a.grupo_jid = g.jid AND a.situacao = 'aberto') AS alertas_abertos
         FROM grupos g
         ORDER BY g.monitorado DESC, mensagens_semana DESC, g.nome COLLATE NOCASE`
      )
      .all(periodos);
  }

  /**
   * Lista somente os grupos monitorados.
   * @returns {object[]} Grupos monitorados.
   */
  listarMonitorados() {
    return this.banco
      .prepare('SELECT * FROM grupos WHERE monitorado = 1 ORDER BY nome COLLATE NOCASE')
      .all();
  }

  /**
   * Busca um grupo pelo JID.
   * @param {string} jid - JID do grupo.
   * @returns {object|undefined} Grupo ou undefined.
   */
  buscarPorJid(jid) {
    return this.banco.prepare('SELECT * FROM grupos WHERE jid = ?').get(jid);
  }

  /**
   * Liga ou desliga o monitoramento de um grupo.
   * @param {string} jid - JID do grupo.
   * @param {boolean} monitorado - Novo estado.
   * @returns {boolean} true se o grupo existia.
   */
  alterarMonitoramento(jid, monitorado) {
    const resultado = this.banco
      .prepare('UPDATE grupos SET monitorado = ?, atualizado_em = ? WHERE jid = ?')
      .run(monitorado ? 1 : 0, agoraIso(), jid);
    return resultado.changes > 0;
  }

  /**
   * Conta grupos totais e monitorados.
   * @returns {{total: number, monitorados: number}} Contagens.
   */
  contar() {
    return this.banco
      .prepare('SELECT COUNT(*) AS total, COALESCE(SUM(monitorado), 0) AS monitorados FROM grupos')
      .get();
  }
}
