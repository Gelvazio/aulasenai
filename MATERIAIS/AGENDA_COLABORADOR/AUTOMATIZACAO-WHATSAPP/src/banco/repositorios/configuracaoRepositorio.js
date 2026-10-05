/**
 * Acesso à tabela `configuracoes` (chave → valor JSON).
 */
import { CONFIGURACOES_PADRAO } from '../../config/constantes.js';

export class ConfiguracaoRepositorio {
  /**
   * @param {import('node:sqlite').DatabaseSync} banco - Conexão injetada.
   */
  constructor(banco) {
    this.banco = banco;
  }

  /**
   * Obtém o valor de uma configuração (ou o padrão).
   * @param {string} chave - Chave da configuração.
   * @returns {unknown} Valor.
   */
  obter(chave) {
    const linha = this.banco
      .prepare('SELECT valor_json FROM configuracoes WHERE chave = ?')
      .get(chave);
    if (!linha) return CONFIGURACOES_PADRAO[chave];

    return JSON.parse(linha.valor_json);
  }

  /**
   * Define o valor de uma configuração.
   * @param {string} chave - Chave.
   * @param {unknown} valor - Valor serializável em JSON.
   * @returns {void}
   */
  definir(chave, valor) {
    this.banco
      .prepare(
        `INSERT INTO configuracoes (chave, valor_json) VALUES (?, ?)
         ON CONFLICT (chave) DO UPDATE SET valor_json = excluded.valor_json`
      )
      .run(chave, JSON.stringify(valor));
  }

  /**
   * Lista todas as configurações, completando com os padrões.
   * @returns {Record<string, unknown>} Mapa chave → valor.
   */
  listarTodas() {
    const linhas = this.banco.prepare('SELECT chave, valor_json FROM configuracoes').all();
    const salvas = Object.fromEntries(
      linhas.map((linha) => [linha.chave, JSON.parse(linha.valor_json)])
    );
    return { ...CONFIGURACOES_PADRAO, ...salvas };
  }
}
