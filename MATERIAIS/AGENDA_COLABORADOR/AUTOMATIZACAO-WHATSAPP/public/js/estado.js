/**
 * Estado global simples e barramento de eventos (publicar/assinar).
 */

const valores = new Map();
const ouvintes = new Map();

/**
 * Registra um ouvinte para um nome (estado ou evento).
 * @param {string} nome - Chave do estado ou nome do evento.
 * @param {(valor: unknown) => void} funcao - Ouvinte.
 * @returns {() => void} Função que cancela a assinatura.
 */
export function ouvir(nome, funcao) {
  const lista = ouvintes.get(nome) || new Set();
  lista.add(funcao);
  ouvintes.set(nome, lista);
  return () => lista.delete(funcao);
}

/**
 * Publica um valor para os ouvintes de um nome.
 * @param {string} nome - Nome do evento.
 * @param {unknown} dados - Dados.
 * @returns {void}
 */
export function emitir(nome, dados) {
  (ouvintes.get(nome) || []).forEach((funcao) => {
    try {
      funcao(dados);
    } catch (erro) {
      console.error(`Erro no ouvinte de "${nome}"`, erro);
    }
  });
}

/**
 * Lê um valor do estado global.
 * @param {string} chave - Chave.
 * @returns {unknown} Valor.
 */
export function obterEstado(chave) {
  return valores.get(chave);
}

/**
 * Altera um valor do estado global e avisa quem o assina.
 * @param {string} chave - Chave.
 * @param {unknown} valor - Novo valor.
 * @returns {void}
 */
export function definirEstado(chave, valor) {
  valores.set(chave, valor);
  emitir(chave, valor);
}
