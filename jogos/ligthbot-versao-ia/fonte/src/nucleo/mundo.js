// Modelo do mundo: matriz de alturas, lâmpadas-objetivo e lâmpadas acesas.

const SEPARADOR_CHAVE = ",";
const ALTURA_ABISMO = 0;
const ERRO_ALTURAS = "Nível inválido: a matriz de alturas está vazia ou mal formada.";
const ERRO_OBJETIVOS = "Nível inválido: é preciso ao menos uma lâmpada-objetivo sobre um bloco.";
const ERRO_INICIO = "Nível inválido: o robô precisa começar sobre um bloco.";

/**
 * Gera a chave textual de uma célula.
 * @param {number} x - Coluna.
 * @param {number} y - Linha.
 * @returns {string} Chave "x,y".
 */
export function chaveDaCelula(x, y) {
  return `${x}${SEPARADOR_CHAVE}${y}`;
}

/**
 * Lê a altura de uma célula; fora do mapa vale abismo (0).
 * @param {{alturas: number[][]}} mundo - Mundo atual.
 * @param {number} x - Coluna.
 * @param {number} y - Linha.
 * @returns {number} Altura da célula.
 */
export function obterAltura(mundo, x, y) {
  const linha = mundo.alturas[y];
  if (!linha) return ALTURA_ABISMO;
  return linha[x] ?? ALTURA_ABISMO;
}

/**
 * Confere se o nível respeita o formato de REGRAS-JOGO.md (seção 11).
 * @param {object} nivel - Dados do nível.
 * @throws {Error} Se o nível for inválido.
 */
function validarNivel(nivel) {
  const { alturas, objetivos, inicio } = nivel;
  const temAlturas = Array.isArray(alturas) && alturas.length > 0 && Array.isArray(alturas[0]);
  if (!temAlturas) throw new Error(ERRO_ALTURAS);

  const celulaValida = ([x, y]) => (alturas[y]?.[x] ?? ALTURA_ABISMO) > ALTURA_ABISMO;
  const temObjetivos = Array.isArray(objetivos) && objetivos.length > 0;
  if (!temObjetivos || !objetivos.every(celulaValida)) throw new Error(ERRO_OBJETIVOS);
  if (!celulaValida([inicio?.x, inicio?.y])) throw new Error(ERRO_INICIO);
}

/**
 * Cria o mundo de um nível com todas as lâmpadas apagadas.
 * @param {object} nivel - Dados do nível (JSON).
 * @returns {{alturas: number[][], linhas: number, colunas: number,
 *   objetivos: Set<string>, luzes: Set<string>}} Mundo pronto para jogar.
 * @throws {Error} Se o nível for inválido.
 */
export function criarMundo(nivel) {
  validarNivel(nivel);
  const alturas = nivel.alturas.map((linha) => [...linha]);
  return {
    alturas,
    linhas: alturas.length,
    colunas: alturas[0].length,
    objetivos: new Set(nivel.objetivos.map(([x, y]) => chaveDaCelula(x, y))),
    luzes: new Set(),
  };
}

/**
 * Informa se a célula tem lâmpada-objetivo.
 * @param {{objetivos: Set<string>}} mundo - Mundo atual.
 * @param {number} x - Coluna.
 * @param {number} y - Linha.
 * @returns {boolean} true se há lâmpada na célula.
 */
export function temObjetivo(mundo, x, y) {
  return mundo.objetivos.has(chaveDaCelula(x, y));
}

/**
 * Informa se a lâmpada da célula está acesa.
 * @param {{luzes: Set<string>}} mundo - Mundo atual.
 * @param {number} x - Coluna.
 * @param {number} y - Linha.
 * @returns {boolean} true se a lâmpada está acesa.
 */
export function luzAcesa(mundo, x, y) {
  return mundo.luzes.has(chaveDaCelula(x, y));
}

/**
 * Alterna a lâmpada da célula; sem lâmpada-objetivo não faz nada.
 * @param {object} mundo - Mundo atual (alterado no lugar).
 * @param {number} x - Coluna.
 * @param {number} y - Linha.
 * @returns {boolean} true se a ação teve efeito.
 */
export function alternarLuz(mundo, x, y) {
  if (!temObjetivo(mundo, x, y)) return false;

  const chave = chaveDaCelula(x, y);
  if (mundo.luzes.has(chave)) mundo.luzes.delete(chave);
  else mundo.luzes.add(chave);
  return true;
}

/**
 * Apaga todas as lâmpadas (reinício da execução).
 * @param {{luzes: Set<string>}} mundo - Mundo atual (alterado no lugar).
 */
export function apagarLuzes(mundo) {
  mundo.luzes.clear();
}
