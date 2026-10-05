/**
 * Acesso à tabela `uso_ia` (consumo e custo da Claude API).
 */
import { agoraIso } from '../../utilitarios/datas.js';

export class UsoIaRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Registra uma chamada à IA.
   * @param {{modelo: string, finalidade: string, tokensEntrada: number, tokensSaida: number,
   *   custoEstimado: number}} uso
   * @returns {void}
   */
  registrar(uso) {
    this.banco
      .prepare(
        `INSERT INTO uso_ia (modelo, finalidade, tokens_entrada, tokens_saida, custo_estimado, criado_em)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        uso.modelo,
        uso.finalidade,
        uso.tokensEntrada,
        uso.tokensSaida,
        uso.custoEstimado,
        agoraIso()
      );
  }

  /**
   * Resume o consumo desde uma data, por modelo e por finalidade.
   * @param {string} desde - Data ISO inicial.
   * @returns {{total: object, porModelo: object[], porFinalidade: object[]}} Consumo.
   */
  resumirDesde(desde) {
    const colunas = `COUNT(*) AS chamadas, COALESCE(SUM(tokens_entrada), 0) AS tokens_entrada,
      COALESCE(SUM(tokens_saida), 0) AS tokens_saida, COALESCE(SUM(custo_estimado), 0) AS custo`;
    const total = this.banco
      .prepare(`SELECT ${colunas} FROM uso_ia WHERE criado_em >= ?`)
      .get(desde);
    const porModelo = this.banco
      .prepare(`SELECT modelo, ${colunas} FROM uso_ia WHERE criado_em >= ? GROUP BY modelo`)
      .all(desde);
    const porFinalidade = this.banco
      .prepare(`SELECT finalidade, ${colunas} FROM uso_ia WHERE criado_em >= ? GROUP BY finalidade`)
      .all(desde);
    return { total, porModelo, porFinalidade };
  }
}
