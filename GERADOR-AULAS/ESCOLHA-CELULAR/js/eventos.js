/**
 * Liga os eventos da página e inicia o dashboard.
 */

/**
 * Inclui ou retira um item de uma lista de ids.
 * @param {string[]} lista - Lista a alterar.
 * @param {string} valor - Id do item.
 * @param {boolean} incluir - true para incluir, false para retirar.
 * @returns {string[]} Nova lista.
 */
function alternarNaLista(lista, valor, incluir) {
  const semValor = lista.filter((item) => item !== valor);
  return incluir ? [...semValor, valor] : semValor;
}

/**
 * Trata a marcação de um produto no catálogo.
 * @param {Event} evento - Evento de mudança.
 * @returns {void}
 */
function aoMarcarProduto(evento) {
  const alvo = evento.target;
  if (!alvo.matches('.seletor')) return;
  estado.selecionados = alternarNaLista(estado.selecionados, alvo.dataset.id, alvo.checked);
  estado.faixaAtiva = null;
  atualizarTudo();
}

/**
 * Trata a marcação de uma categoria de interesse.
 * @param {Event} evento - Evento de mudança.
 * @returns {void}
 */
function aoMarcarCategoria(evento) {
  const alvo = evento.target;
  if (!alvo.matches('[data-categoria]')) return;
  estado.categorias = alternarNaLista(estado.categorias, alvo.dataset.categoria, alvo.checked);
  atualizarTudo();
}

/**
 * Ordena o catálogo pela coluna clicada no cabeçalho.
 * @param {Event} evento - Evento de clique.
 * @returns {void}
 */
function aoOrdenarColuna(evento) {
  const botao = evento.target.closest('[data-ordenar]');
  if (!botao) return;
  estado.ordenacao = alternarOrdenacao(estado.ordenacao, botao.dataset.ordenar);
  atualizarTudo();
}

/**
 * Aplica o kit da faixa de gasto clicada.
 * @param {Event} evento - Evento de clique.
 * @returns {void}
 */
function aoEscolherFaixa(evento) {
  const card = evento.target.closest('[data-faixa]');
  if (!card) return;
  const faixa = FAIXAS_GASTO.find((item) => item.id === card.dataset.faixa);
  if (!faixa) return;
  estado.faixaAtiva = faixa.id;
  estado.selecionados = montarKitPorFaixa(CATALOGO_PRODUTOS, estado.config, {
    categorias: estado.categorias,
    limiteReal: faixa.maximo,
  });
  atualizarTudo();
}

/**
 * Preenche a lista com a sugestão automática.
 * @returns {void}
 */
function aoSugerir() {
  estado.faixaAtiva = null;
  estado.selecionados = sugerirCompras(CATALOGO_PRODUTOS, estado.config, estado.categorias);
  atualizarTudo();
}

/**
 * Esvazia a lista de compras.
 * @returns {void}
 */
function aoLimpar() {
  estado.selecionados = [];
  estado.faixaAtiva = null;
  atualizarTudo();
}

/**
 * Liga todos os eventos e desenha o estado inicial.
 * @returns {void}
 */
function iniciarDashboard() {
  preencherCampos();
  desenharFiltros();
  document.querySelectorAll('[data-campo]').forEach((campo) => {
    campo.addEventListener('input', () => {
      lerCampo(campo);
      atualizarTudo();
    });
  });
  elemento('corpo-catalogo').addEventListener('change', aoMarcarProduto);
  elemento('filtros-categoria').addEventListener('change', aoMarcarCategoria);
  elemento('cabecalho-catalogo').addEventListener('click', aoOrdenarColuna);
  elemento('faixas').addEventListener('click', aoEscolherFaixa);
  elemento('botao-sugerir').addEventListener('click', aoSugerir);
  elemento('botao-limpar').addEventListener('click', aoLimpar);
  atualizarTudo();
}

document.addEventListener('DOMContentLoaded', iniciarDashboard);
