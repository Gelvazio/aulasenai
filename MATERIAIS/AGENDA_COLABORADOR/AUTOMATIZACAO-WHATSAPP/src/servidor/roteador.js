/**
 * Roteador simples: tabela de rotas { método, padrão, handler }. Novas rotas são registradas,
 * sem alterar este arquivo (Open/Closed).
 */

/**
 * Converte um padrão "/grupos/:jid" em expressão regular com grupos nomeados.
 * @param {string} padrao - Padrão da rota.
 * @returns {RegExp} Expressão regular equivalente.
 */
function compilarPadrao(padrao) {
  const corpo = padrao
    .split('/')
    .map((parte) => (parte.startsWith(':') ? `(?<${parte.slice(1)}>[^/]+)` : parte))
    .join('/');
  return new RegExp(`^${corpo}$`);
}

/**
 * Decodifica os parâmetros capturados na URL.
 * @param {Record<string, string>|undefined} grupos - Grupos nomeados da regex.
 * @returns {Record<string, string>} Parâmetros decodificados.
 */
function decodificarParametros(grupos) {
  return Object.fromEntries(
    Object.entries(grupos || {}).map(([nome, valor]) => [nome, decodeURIComponent(valor)])
  );
}

export class Roteador {
  constructor() {
    this.rotas = [];
  }

  /**
   * Registra uma rota.
   * @param {string} metodo - Método HTTP (GET, POST, ...).
   * @param {string} padrao - Caminho com parâmetros ":nome" (sem o prefixo /api).
   * @param {(contexto: object) => Promise<unknown>|unknown} handler - Função que devolve o JSON.
   * @returns {Roteador} O próprio roteador (encadeável).
   */
  registrar(metodo, padrao, handler) {
    this.rotas.push({ metodo, expressao: compilarPadrao(padrao), handler });
    return this;
  }

  /**
   * Encontra a rota para o método e caminho.
   * @param {string} metodo - Método HTTP.
   * @param {string} caminho - Caminho sem o prefixo /api.
   * @returns {{handler: Function, parametros: Record<string, string>}|null} Rota ou null.
   */
  resolver(metodo, caminho) {
    for (const rota of this.rotas) {
      const resultado = rota.metodo === metodo ? rota.expressao.exec(caminho) : null;
      if (resultado)
        return { handler: rota.handler, parametros: decodificarParametros(resultado.groups) };
    }
    return null;
  }
}
