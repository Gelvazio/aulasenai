/**
 * Erros de domínio com status HTTP associado.
 */

/** Erro esperado da aplicação, convertido em resposta HTTP pelo servidor. */
export class ErroAplicacao extends Error {
  /**
   * @param {string} mensagem - Mensagem para o usuário.
   * @param {number} [status=400] - Status HTTP correspondente.
   */
  constructor(mensagem, status = 400) {
    super(mensagem);
    this.name = 'ErroAplicacao';
    this.status = status;
  }
}

/**
 * Pausa a execução por um tempo.
 * @param {number} milissegundos - Tempo de espera.
 * @returns {Promise<void>} Promessa resolvida após a espera.
 */
export function esperar(milissegundos) {
  return new Promise((resolver) => setTimeout(resolver, milissegundos));
}
