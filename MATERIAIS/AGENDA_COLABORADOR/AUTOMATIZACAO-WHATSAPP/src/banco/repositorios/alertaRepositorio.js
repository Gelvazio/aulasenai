/**
 * Acesso à tabela `alertas`.
 */
import { SITUACOES_ALERTA } from '../../config/constantes.js';
import { agoraIso } from '../../utilitarios/datas.js';

export class AlertaRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Cria um alerta aberto.
   * @param {{regraId?: number|null, tipo: string, grupoJid: string, mensagemId?: string|null,
   *   titulo: string, detalhe?: string, severidade: string}} alerta
   * @returns {object} Alerta criado.
   */
  criar(alerta) {
    const agora = agoraIso();
    const resultado = this.banco
      .prepare(
        `INSERT INTO alertas
          (regra_id, tipo, grupo_jid, mensagem_id, titulo, detalhe, severidade, situacao,
           criado_em, atualizado_em)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        alerta.regraId ?? null,
        alerta.tipo,
        alerta.grupoJid,
        alerta.mensagemId ?? null,
        alerta.titulo,
        alerta.detalhe || '',
        alerta.severidade,
        SITUACOES_ALERTA.ABERTO,
        agora,
        agora
      );
    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  /**
   * Busca alerta aberto da mesma regra e grupo criado após uma data (anti-duplicação).
   * @param {{tipo: string, regraId: number|null, grupoJid: string, desde: string}} chave
   * @returns {object|undefined} Alerta existente.
   */
  buscarDuplicado(chave) {
    return this.banco
      .prepare(
        `SELECT * FROM alertas
         WHERE tipo = :tipo AND COALESCE(regra_id, 0) = COALESCE(:regraId, 0)
           AND grupo_jid = :grupoJid AND situacao = 'aberto' AND atualizado_em >= :desde
         ORDER BY atualizado_em DESC LIMIT 1`
      )
      .get({ ...chave, regraId: chave.regraId ?? null });
  }

  /**
   * Incrementa as ocorrências de um alerta agrupado e atualiza o detalhe.
   * @param {number} id - Identificador.
   * @param {string} detalhe - Novo detalhe.
   * @returns {object} Alerta atualizado.
   */
  registrarOcorrencia(id, detalhe) {
    this.banco
      .prepare(
        `UPDATE alertas SET ocorrencias = ocorrencias + 1, detalhe = ?, atualizado_em = ?
         WHERE id = ?`
      )
      .run(detalhe, agoraIso(), id);
    return this.buscarPorId(id);
  }

  /**
   * Busca um alerta pelo id.
   * @param {number} id - Identificador.
   * @returns {object|undefined} Alerta com nome do grupo.
   */
  buscarPorId(id) {
    return this.banco
      .prepare(
        `SELECT a.*, g.nome AS grupo_nome FROM alertas a
         JOIN grupos g ON g.jid = a.grupo_jid WHERE a.id = ?`
      )
      .get(id);
  }

  /**
   * Lista alertas com filtros opcionais.
   * @param {{situacao?: string, grupoJid?: string, severidade?: string, limite?: number}} filtro
   * @returns {object[]} Alertas.
   */
  listar(filtro) {
    return this.banco
      .prepare(
        `SELECT a.*, g.nome AS grupo_nome FROM alertas a
         JOIN grupos g ON g.jid = a.grupo_jid
         WHERE (:situacao IS NULL OR a.situacao = :situacao)
           AND (:grupoJid IS NULL OR a.grupo_jid = :grupoJid)
           AND (:severidade IS NULL OR a.severidade = :severidade)
         ORDER BY a.atualizado_em DESC LIMIT :limite`
      )
      .all({
        situacao: filtro.situacao || null,
        grupoJid: filtro.grupoJid || null,
        severidade: filtro.severidade || null,
        limite: filtro.limite || 100,
      });
  }

  /**
   * Altera a situação de um alerta.
   * @param {number} id - Identificador.
   * @param {string} situacao - aberto | lido | resolvido.
   * @returns {object|undefined} Alerta atualizado (undefined se não existir).
   */
  alterarSituacao(id, situacao) {
    this.banco
      .prepare('UPDATE alertas SET situacao = ?, atualizado_em = ? WHERE id = ?')
      .run(situacao, agoraIso(), id);
    return this.buscarPorId(id);
  }

  /**
   * Marca todos os alertas abertos como lidos.
   * @returns {number} Quantidade alterada.
   */
  marcarTodosLidos() {
    return this.banco
      .prepare("UPDATE alertas SET situacao = 'lido', atualizado_em = ? WHERE situacao = 'aberto'")
      .run(agoraIso()).changes;
  }

  /**
   * Conta alertas abertos por severidade.
   * @returns {Record<string, number>} Mapa severidade → quantidade.
   */
  contarAbertosPorSeveridade() {
    const linhas = this.banco
      .prepare(
        "SELECT severidade, COUNT(*) AS total FROM alertas WHERE situacao = 'aberto' GROUP BY severidade"
      )
      .all();
    return Object.fromEntries(linhas.map((linha) => [linha.severidade, linha.total]));
  }
}
