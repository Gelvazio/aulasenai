/**
 * Ordenação do catálogo por qualquer coluna (funções puras, sem DOM).
 */

const DIRECAO_CRESCENTE = 'crescente';
const DIRECAO_DECRESCENTE = 'decrescente';
const MARCACAO_SEM_ORDENACAO = Object.freeze({ aria: 'none', seta: '↕' });
const MARCACAO_ORDENACAO = Object.freeze({
  true: { aria: 'ascending', seta: '▲' },
  false: { aria: 'descending', seta: '▼' },
});

/**
 * Valor de cada coluna usado para ordenar. Coluna nova = nova entrada neste mapa.
 * @type {Object<string, function(object, {config: object, selecionados: string[]}): (number|string)>}
 */
const VALORES_COLUNA = Object.freeze({
  selecionado: (produto, contexto) => (contexto.selecionados.includes(produto.id) ? 1 : 0),
  produto: (produto) => produto.nome,
  dolar: (produto) => produto.precoDolar,
  realParaguai: (produto, contexto) => calcularEconomia(produto, contexto.config).precoReal,
  realBrasil: (produto) => produto.precoBrasil,
  economia: (produto, contexto) => calcularEconomia(produto, contexto.config).percentual,
});

/**
 * Compara dois valores (texto em ordem alfabética pt-BR, número em ordem numérica).
 * @param {number|string} valorA - Primeiro valor.
 * @param {number|string} valorB - Segundo valor.
 * @returns {number} Negativo, zero ou positivo.
 */
function compararValores(valorA, valorB) {
  const saoTextos = typeof valorA === 'string' && typeof valorB === 'string';
  if (saoTextos) return valorA.localeCompare(valorB, 'pt-BR', { numeric: true });
  return valorA - valorB;
}

/**
 * Devolve uma cópia dos produtos ordenada pela coluna e direção pedidas.
 * @param {object[]} produtos - Produtos a ordenar.
 * @param {{coluna: string, direcao: string}|null} ordenacao - Coluna e direção.
 * @param {{config: object, selecionados: string[]}} contexto - Dados para calcular valores.
 * @returns {object[]} Produtos ordenados (sem ordenação, mantém a ordem original).
 */
function ordenarProdutos(produtos, ordenacao, contexto) {
  const obterValor = ordenacao ? VALORES_COLUNA[ordenacao.coluna] : null;
  if (!obterValor) return [...produtos];

  const sinal = ordenacao.direcao === DIRECAO_DECRESCENTE ? -1 : 1;
  return [...produtos].sort((a, b) => {
    const resultado = compararValores(obterValor(a, contexto), obterValor(b, contexto));
    return resultado * sinal;
  });
}

/**
 * Calcula a próxima ordenação ao clicar numa coluna:
 * coluna nova começa crescente; mesma coluna alterna a direção.
 * @param {{coluna: string, direcao: string}|null} atual - Ordenação atual.
 * @param {string} coluna - Coluna clicada.
 * @returns {{coluna: string, direcao: string}} Nova ordenação.
 */
function alternarOrdenacao(atual, coluna) {
  const ehMesmaColunaCrescente = atual?.coluna === coluna && atual.direcao === DIRECAO_CRESCENTE;
  const direcao = ehMesmaColunaCrescente ? DIRECAO_DECRESCENTE : DIRECAO_CRESCENTE;
  return { coluna, direcao };
}
