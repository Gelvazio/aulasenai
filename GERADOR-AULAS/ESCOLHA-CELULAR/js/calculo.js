/**
 * Regras de cálculo do dashboard (funções puras, sem DOM).
 */

/**
 * Converte um valor em dólar para real, já com a taxa de câmbio/cartão.
 * @param {number} valorDolar - Valor em dólar.
 * @param {object} config - Configuração com cotacaoDolar e taxaCambioPercentual.
 * @returns {number} Valor em reais.
 */
function converterDolarParaReal(valorDolar, config) {
  const fatorTaxa = 1 + config.taxaCambioPercentual / 100;
  return valorDolar * config.cotacaoDolar * fatorTaxa;
}

/**
 * Calcula quanto do dinheiro guardado pode ir para compras.
 * @param {object} config - Configuração do usuário.
 * @returns {{disponivel: number, margem: number, cotaDolar: number}} Orçamento.
 */
function calcularOrcamento(config) {
  const aposReserva = Math.max(config.dinheiroGuardado - config.reservaViagem, 0);
  const margem = aposReserva * (config.margemSegurancaPercentual / 100);
  const cotaDolar = COTA_ISENCAO_DOLAR_POR_PESSOA * Math.max(config.quantidadeViajantes, 1);
  return { disponivel: aposReserva - margem, margem, cotaDolar };
}

/**
 * Calcula a economia de um produto em relação ao preço no Brasil.
 * @param {object} produto - Item do catálogo.
 * @param {object} config - Configuração do usuário.
 * @returns {{precoReal: number, economia: number, percentual: number}} Economia.
 */
function calcularEconomia(produto, config) {
  const precoReal = converterDolarParaReal(produto.precoDolar, config);
  const economia = produto.precoBrasil - precoReal;
  return { precoReal, economia, percentual: (economia / produto.precoBrasil) * 100 };
}

/**
 * Soma a lista escolhida: totais em dólar/real, imposto do excedente e economia.
 * @param {object[]} produtos - Produtos selecionados.
 * @param {object} config - Configuração do usuário.
 * @returns {object} Resumo da lista.
 */
function calcularResumoLista(produtos, config) {
  const orcamento = calcularOrcamento(config);
  const totalDolar = produtos.reduce((soma, produto) => soma + produto.precoDolar, 0);
  const excedenteDolar = Math.max(totalDolar - orcamento.cotaDolar, 0);
  const imposto = converterDolarParaReal(excedenteDolar, config) * ALIQUOTA_EXCEDENTE_COTA;
  const totalReal = converterDolarParaReal(totalDolar, config) + imposto;
  const totalBrasil = produtos.reduce((soma, produto) => soma + produto.precoBrasil, 0);
  return {
    orcamento,
    totalDolar,
    totalReal,
    imposto,
    excedenteDolar,
    saldo: orcamento.disponivel - totalReal,
    economia: totalBrasil - totalReal,
    quantidade: produtos.length,
  };
}

/**
 * Indica se o produto ainda cabe no orçamento e na cota de isenção.
 * @param {object} produto - Produto avaliado.
 * @param {{gastoReal: number, gastoDolar: number}} acumulado - Já reservado.
 * @param {object} config - Configuração do usuário.
 * @returns {boolean} true se couber.
 */
function cabeNaCompra(produto, acumulado, config) {
  const orcamento = calcularOrcamento(config);
  const precoReal = converterDolarParaReal(produto.precoDolar, config);
  const cabeNoOrcamento = acumulado.gastoReal + precoReal <= orcamento.disponivel;
  const cabeNaCota = acumulado.gastoDolar + produto.precoDolar <= orcamento.cotaDolar;
  return cabeNoOrcamento && cabeNaCota;
}

/**
 * Sugere compras: prioriza a maior economia percentual, um item de cada,
 * sem passar do dinheiro disponível nem da cota de isenção.
 * @param {object[]} catalogo - Produtos disponíveis.
 * @param {object} config - Configuração do usuário.
 * @param {string[]} categorias - Categorias de interesse.
 * @returns {string[]} Ids sugeridos.
 */
function sugerirCompras(catalogo, config, categorias) {
  const candidatos = catalogo
    .filter((produto) => categorias.includes(produto.categoria))
    .filter((produto) => calcularEconomia(produto, config).economia > 0)
    .sort((a, b) => calcularEconomia(b, config).percentual - calcularEconomia(a, config).percentual);

  const acumulado = { gastoReal: 0, gastoDolar: 0 };
  const sugeridos = [];
  candidatos.forEach((produto) => {
    if (!cabeNaCompra(produto, acumulado, config)) return;
    acumulado.gastoReal += converterDolarParaReal(produto.precoDolar, config);
    acumulado.gastoDolar += produto.precoDolar;
    sugeridos.push(produto.id);
  });
  return sugeridos;
}

/**
 * Agrupa o total em reais da lista por categoria.
 * @param {object[]} produtos - Produtos selecionados.
 * @param {object} config - Configuração do usuário.
 * @returns {Object<string, number>} Total por categoria.
 */
function agruparPorCategoria(produtos, config) {
  return produtos.reduce((grupos, produto) => {
    const valor = converterDolarParaReal(produto.precoDolar, config);
    grupos[produto.categoria] = (grupos[produto.categoria] || 0) + valor;
    return grupos;
  }, {});
}

/**
 * Monta um kit para uma faixa de gasto: prioriza a maior economia em %, um item de cada,
 * até o limite em reais (já contando o imposto de 50% sobre o que passar da cota).
 * @param {object[]} catalogo - Produtos disponíveis.
 * @param {object} config - Configuração do usuário.
 * @param {{categorias: string[], limiteReal: number}} opcoes - Categorias e teto do kit.
 * @returns {string[]} Ids do kit.
 */
function montarKitPorFaixa(catalogo, config, opcoes) {
  const candidatos = catalogo
    .filter((produto) => opcoes.categorias.includes(produto.categoria))
    .filter((produto) => calcularEconomia(produto, config).economia > 0)
    .sort((a, b) => calcularEconomia(b, config).percentual - calcularEconomia(a, config).percentual);

  const kit = [];
  candidatos.forEach((produto) => {
    const totalComProduto = calcularResumoLista([...kit, produto], config).totalReal;
    if (totalComProduto > opcoes.limiteReal) return;
    kit.push(produto);
  });
  return kit.map((produto) => produto.id);
}
