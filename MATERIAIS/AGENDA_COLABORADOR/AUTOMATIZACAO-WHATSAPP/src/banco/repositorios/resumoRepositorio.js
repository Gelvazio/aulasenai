/**
 * Acesso à tabela `resumos`.
 */
import { agoraIso } from '../../utilitarios/datas.js';

/**
 * Converte a linha do banco, transformando `conteudo_json` em objeto `conteudo`.
 * @param {object|undefined} linha - Linha do banco.
 * @returns {object|undefined} Resumo com `conteudo`.
 */
function converterLinha(linha) {
  if (!linha) return undefined;

  const { conteudo_json: conteudoJson, ...resto } = linha;
  return { ...resto, conteudo: JSON.parse(conteudoJson) };
}

export class ResumoRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Salva um resumo gerado.
   * @param {{grupoJid: string, periodoInicio: string, periodoFim: string, tipo: string,
   *   totalMensagens: number, conteudo: object, modelo: string}} resumo
   * @returns {object} Resumo salvo (com id).
   */
  salvar(resumo) {
    const resultado = this.banco
      .prepare(
        `INSERT INTO resumos
          (grupo_jid, periodo_inicio, periodo_fim, tipo, total_mensagens, conteudo_json,
           modelo, criado_em)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        resumo.grupoJid,
        resumo.periodoInicio,
        resumo.periodoFim,
        resumo.tipo,
        resumo.totalMensagens,
        JSON.stringify(resumo.conteudo),
        resumo.modelo,
        agoraIso()
      );
    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  /**
   * Busca um resumo pelo id.
   * @param {number} id - Identificador.
   * @returns {object|undefined} Resumo.
   */
  buscarPorId(id) {
    const linha = this.banco
      .prepare(
        `SELECT r.*, g.nome AS grupo_nome FROM resumos r
         JOIN grupos g ON g.jid = r.grupo_jid WHERE r.id = ?`
      )
      .get(id);
    return converterLinha(linha);
  }

  /**
   * Lista resumos, mais recentes primeiro.
   * @param {{grupoJid?: string, tipo?: string, limite?: number}} filtro
   * @returns {object[]} Resumos.
   */
  listar(filtro) {
    return this.banco
      .prepare(
        `SELECT r.*, g.nome AS grupo_nome FROM resumos r
         JOIN grupos g ON g.jid = r.grupo_jid
         WHERE (:grupoJid IS NULL OR r.grupo_jid = :grupoJid)
           AND (:tipo IS NULL OR r.tipo = :tipo)
         ORDER BY r.criado_em DESC LIMIT :limite`
      )
      .all({
        grupoJid: filtro.grupoJid || null,
        tipo: filtro.tipo || null,
        limite: filtro.limite || 30,
      })
      .map(converterLinha);
  }

  /**
   * Verifica se já existe resumo de um tipo para o grupo começando no instante informado.
   * @param {{grupoJid: string, tipo: string, periodoInicio: string}} chave
   * @returns {boolean} true se existir.
   */
  existe(chave) {
    const linha = this.banco
      .prepare(
        `SELECT 1 AS existe FROM resumos
         WHERE grupo_jid = :grupoJid AND tipo = :tipo AND periodo_inicio = :periodoInicio`
      )
      .get(chave);
    return Boolean(linha);
  }

  /**
   * Conta resumos criados desde uma data.
   * @param {string} desde - Data ISO.
   * @returns {number} Quantidade.
   */
  contarDesde(desde) {
    return this.banco
      .prepare('SELECT COUNT(*) AS total FROM resumos WHERE criado_em >= ?')
      .get(desde).total;
  }
}
