/**
 * filtros.js
 *
 * Controle de filtro por categoria, equivalente ao "Controle de lista
 * suspensa" do Looker Studio: popula as opções e filtra o dataset,
 * disparando um callback para redesenhar KPIs/gráficos.
 */

/**
 * Preenche um elemento <select> com as categorias únicas do dataset,
 * incluindo a opção "Todas".
 *
 * @param {Array<Object>} dados - dataset completo (não filtrado)
 * @param {string} selectId - id do elemento <select>
 */
function popularFiltroCategoria(dados, selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const categorias = listarCategoriasUnicas(dados);
  const opcoes = ['<option value="todas">Todas as categorias</option>']
    .concat(categorias.map((c) => `<option value="${c}">${c}</option>`));

  select.innerHTML = opcoes.join("");
}

/**
 * Filtra o dataset completo pela categoria selecionada.
 * Retorna o dataset inteiro quando a opção é "todas".
 *
 * @param {Array<Object>} dados - dataset completo
 * @param {string} categoriaSelecionada
 * @returns {Array<Object>} dataset filtrado
 */
function filtrarPorCategoria(dados, categoriaSelecionada) {
  if (categoriaSelecionada === "todas") return dados;
  return dados.filter((item) => item.categoria === categoriaSelecionada);
}

/**
 * Liga o evento "change" do filtro de categoria a uma função de
 * atualização (callback), repassando o dataset já filtrado.
 *
 * @param {string} selectId - id do elemento <select>
 * @param {Array<Object>} dadosCompletos - dataset completo, fixo
 * @param {(dadosFiltrados: Array<Object>) => void} aoFiltrar - callback de atualização
 */
function inicializarFiltroCategoria(selectId, dadosCompletos, aoFiltrar) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.addEventListener("change", () => {
    const filtrados = filtrarPorCategoria(dadosCompletos, select.value);
    aoFiltrar(filtrados);
  });
}
