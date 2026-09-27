/**
 * graficos.js
 *
 * Funções para agregar dados e desenhar os gráficos do dashboard
 * (barras, linha e pizza) usando Chart.js — equivalentes aos tipos
 * de gráfico "Barras", "Série temporal" e "Pizza" do Looker Studio.
 */

/** Guarda as instâncias ativas do Chart.js para poder destruí-las ao filtrar. */
const instanciasGraficos = {};

/**
 * Agrupa o valor total em estoque por categoria.
 *
 * @param {Array<Object>} dados
 * @returns {{labels:string[], valores:number[]}}
 */
function agruparValorPorCategoria(dados) {
  const totais = {};
  dados.forEach((item) => {
    totais[item.categoria] = (totais[item.categoria] || 0) + valorTotalItem(item);
  });
  return { labels: Object.keys(totais), valores: Object.values(totais) };
}

/**
 * Agrupa o valor total em estoque por mês, na ordem em que aparecem.
 *
 * @param {Array<Object>} dados
 * @returns {{labels:string[], valores:number[]}}
 */
function agruparValorPorMes(dados) {
  const totais = {};
  const ordem = [];
  dados.forEach((item) => {
    if (!(item.mes in totais)) ordem.push(item.mes);
    totais[item.mes] = (totais[item.mes] || 0) + valorTotalItem(item);
  });
  return { labels: ordem, valores: ordem.map((m) => totais[m]) };
}

/**
 * Destrói um gráfico Chart.js previamente criado no mesmo canvas,
 * evitando sobreposição ao re-renderizar após um filtro.
 *
 * @param {string} chaveGrafico - chave interna usada em `instanciasGraficos`
 */
function destruirGraficoAnterior(chaveGrafico) {
  if (instanciasGraficos[chaveGrafico]) {
    instanciasGraficos[chaveGrafico].destroy();
    delete instanciasGraficos[chaveGrafico];
  }
}

/**
 * Desenha o gráfico de barras: valor total em estoque por categoria.
 *
 * @param {string} canvasId - id do elemento <canvas>
 * @param {Array<Object>} dados - dataset filtrado
 */
function criarGraficoBarras(canvasId, dados) {
  destruirGraficoAnterior(canvasId);
  const { labels, valores } = agruparValorPorCategoria(dados);
  const ctx = document.getElementById(canvasId).getContext("2d");

  instanciasGraficos[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Valor em estoque (R$)", data: valores, backgroundColor: "#004384" }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

/**
 * Desenha o gráfico de linha: evolução do valor total em estoque por mês.
 *
 * @param {string} canvasId - id do elemento <canvas>
 * @param {Array<Object>} dados - dataset filtrado
 */
function criarGraficoLinha(canvasId, dados) {
  destruirGraficoAnterior(canvasId);
  const { labels, valores } = agruparValorPorMes(dados);
  const ctx = document.getElementById(canvasId).getContext("2d");

  instanciasGraficos[canvasId] = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Valor em estoque (R$)",
        data: valores,
        borderColor: "#f7941d",
        backgroundColor: "rgba(247,148,29,.15)",
        tension: 0.3,
        fill: true
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

/**
 * Desenha o gráfico de pizza: proporção do valor em estoque por categoria.
 *
 * @param {string} canvasId - id do elemento <canvas>
 * @param {Array<Object>} dados - dataset filtrado
 */
function criarGraficoPizza(canvasId, dados) {
  destruirGraficoAnterior(canvasId);
  const { labels, valores } = agruparValorPorCategoria(dados);
  const ctx = document.getElementById(canvasId).getContext("2d");
  const cores = ["#004384", "#f7941d", "#2e9e5b", "#a83279", "#0aa1a7", "#c0392b"];

  instanciasGraficos[canvasId] = new Chart(ctx, {
    type: "pie",
    data: { labels, datasets: [{ data: valores, backgroundColor: cores }] },
    options: { responsive: true }
  });
}
