/**
 * main.js
 *
 * Ponto de entrada do dashboard de exemplo. Orquestra os demais módulos
 * (dados-exemplo.js, kpis.js, graficos.js, filtros.js): carrega o
 * dataset, faz a primeira renderização e liga o filtro de categoria
 * para atualizar tudo junto quando o usuário interage.
 */

/**
 * Redesenha todos os elementos visuais (KPIs + 3 gráficos) a partir
 * de um dataset já filtrado.
 *
 * @param {Array<Object>} dadosFiltrados
 */
function atualizarDashboard(dadosFiltrados) {
  renderizarKPIs("kpis-container", dadosFiltrados);
  criarGraficoBarras("grafico-barras", dadosFiltrados);
  criarGraficoLinha("grafico-linha", dadosFiltrados);
  criarGraficoPizza("grafico-pizza", dadosFiltrados);
}

/**
 * Inicializa o dashboard: carrega os dados de exemplo, popula o
 * filtro, faz a primeira renderização e liga os eventos de filtro.
 */
function inicializarDashboard() {
  const dados = gerarDadosExemplo();

  popularFiltroCategoria(dados, "filtro-categoria");
  atualizarDashboard(dados);

  inicializarFiltroCategoria("filtro-categoria", dados, atualizarDashboard);
}

document.addEventListener("DOMContentLoaded", inicializarDashboard);
