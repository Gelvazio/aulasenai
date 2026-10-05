/**
 * Acesso à tabela `regras_alerta`.
 */
import { agoraIso } from '../../utilitarios/datas.js';

/**
 * Converte a linha do banco (parametros_json → parametros, ativa → boolean).
 * @param {object|undefined} linha - Linha do banco.
 * @returns {object|undefined} Regra.
 */
function converterLinha(linha) {
  if (!linha) return undefined;

  const { parametros_json: parametrosJson, ...resto } = linha;
  return { ...resto, ativa: resto.ativa === 1, parametros: JSON.parse(parametrosJson) };
}

export class RegraAlertaRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Lista todas as regras.
   * @returns {object[]} Regras.
   */
  listar() {
    return this.banco
      .prepare(
        `SELECT r.*, g.nome AS grupo_nome FROM regras_alerta r
         LEFT JOIN grupos g ON g.jid = r.grupo_jid ORDER BY r.id`
      )
      .all()
      .map(converterLinha);
  }

  /**
   * Lista somente as regras ativas.
   * @returns {object[]} Regras ativas.
   */
  listarAtivas() {
    return this.listar().filter((regra) => regra.ativa);
  }

  /**
   * Busca uma regra pelo id.
   * @param {number} id - Identificador.
   * @returns {object|undefined} Regra.
   */
  buscarPorId(id) {
    return converterLinha(this.banco.prepare('SELECT * FROM regras_alerta WHERE id = ?').get(id));
  }

  /**
   * Cria uma regra.
   * @param {{nome: string, tipo: string, parametros: object, grupoJid?: string|null,
   *   severidade: string, ativa?: boolean}} regra
   * @returns {object} Regra criada.
   */
  criar(regra) {
    const resultado = this.banco
      .prepare(
        `INSERT INTO regras_alerta (nome, tipo, parametros_json, grupo_jid, severidade, ativa, criado_em)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        regra.nome,
        regra.tipo,
        JSON.stringify(regra.parametros || {}),
        regra.grupoJid || null,
        regra.severidade,
        regra.ativa === false ? 0 : 1,
        agoraIso()
      );
    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  /**
   * Atualiza uma regra existente.
   * @param {number} id - Identificador.
   * @param {{nome: string, parametros: object, grupoJid?: string|null, severidade: string,
   *   ativa: boolean}} dados - Novos dados (o tipo não muda).
   * @returns {object|undefined} Regra atualizada.
   */
  atualizar(id, dados) {
    this.banco
      .prepare(
        `UPDATE regras_alerta
         SET nome = ?, parametros_json = ?, grupo_jid = ?, severidade = ?, ativa = ?
         WHERE id = ?`
      )
      .run(
        dados.nome,
        JSON.stringify(dados.parametros || {}),
        dados.grupoJid || null,
        dados.severidade,
        dados.ativa ? 1 : 0,
        id
      );
    return this.buscarPorId(id);
  }

  /**
   * Remove uma regra.
   * @param {number} id - Identificador.
   * @returns {boolean} true se removeu.
   */
  remover(id) {
    return this.banco.prepare('DELETE FROM regras_alerta WHERE id = ?').run(id).changes > 0;
  }
}
