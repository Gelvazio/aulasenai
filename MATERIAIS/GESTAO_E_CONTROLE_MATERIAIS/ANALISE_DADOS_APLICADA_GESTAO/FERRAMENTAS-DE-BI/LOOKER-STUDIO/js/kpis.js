/**
 * kpis.js
 *
 * Funções de cálculo e renderização dos indicadores-resumo (KPIs / scorecards),
 * equivalentes aos gráficos de "Indicador" do Looker Studio.
 */

/**
 * Soma o valor total em estoque (quantidade × valor unitário) de todos os itens.
 *
 * @param {Array<Object>} dados
 * @returns {number} valor total em reais
 */
function calcularValorTotalEstoque(dados) {
  return dados.reduce((total, item) => total + valorTotalItem(item), 0);
}

/**
 * Soma a quantidade total de itens em estoque.
 *
 * @param {Array<Object>} dados
 * @returns {number} quantidade total
 */
function calcularQuantidadeTotal(dados) {
  return dados.reduce((total, item) => total + item.quantidade, 0);
}

/**
 * Calcula o valor médio unitário ponderado pela quantidade.
 *
 * @param {Array<Object>} dados
 * @returns {number} valor médio unitário
 */
function calcularValorMedioUnitario(dados) {
  const quantidadeTotal = calcularQuantidadeTotal(dados);
  if (quantidadeTotal === 0) return 0;
  return calcularValorTotalEstoque(dados) / quantidadeTotal;
}

/**
 * Conta quantos produtos distintos existem no dataset filtrado.
 *
 * @param {Array<Object>} dados
 * @returns {number} total de produtos distintos
 */
function contarProdutosDistintos(dados) {
  return new Set(dados.map((item) => item.produto)).size;
}

/**
 * Formata um número como moeda brasileira (R$).
 *
 * @param {number} valor
 * @returns {string} valor formatado, ex: "R$ 1.234,56"
 */
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Renderiza os 4 cartões de KPI no elemento indicado, recalculando
 * a partir do dataset (já filtrado) recebido.
 *
 * @param {string} containerId - id do elemento onde os cartões serão inseridos
 * @param {Array<Object>} dados - dataset filtrado
 */
function renderizarKPIs(containerId, dados) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cartoes = [
    { label: "Valor total em estoque", valor: formatarMoeda(calcularValorTotalEstoque(dados)) },
    { label: "Quantidade total de itens", valor: calcularQuantidadeTotal(dados).toLocaleString("pt-BR") },
    { label: "Valor médio unitário", valor: formatarMoeda(calcularValorMedioUnitario(dados)) },
    { label: "Produtos distintos", valor: contarProdutosDistintos(dados) }
  ];

  container.innerHTML = cartoes
    .map((c) => `
      <div class="kpi-card">
        <div class="kpi-valor">${c.valor}</div>
        <div class="kpi-label">${c.label}</div>
      </div>
    `)
    .join("");
}
