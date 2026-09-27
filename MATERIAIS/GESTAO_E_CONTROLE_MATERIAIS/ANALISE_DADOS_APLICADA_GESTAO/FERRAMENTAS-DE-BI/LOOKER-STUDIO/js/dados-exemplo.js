/**
 * dados-exemplo.js
 *
 * Gera o conjunto de dados fictício usado no dashboard de exemplo.
 * Simula um relatório de estoque de materiais (contexto da UC
 * "Análise de Dados Aplicada à Gestão"), no mesmo formato que um
 * aluno conectaria via Google Sheets no Looker Studio.
 */

/**
 * Retorna a lista de registros de estoque fictícios.
 * Cada item representa uma linha de planilha: categoria, produto,
 * quantidade em estoque e valor unitário (R$).
 *
 * @returns {Array<{categoria:string, produto:string, quantidade:number, valorUnitario:number, mes:string}>}
 */
function gerarDadosExemplo() {
  return [
    { categoria: "Matéria-Prima", produto: "Aço em barra", quantidade: 320, valorUnitario: 45.9, mes: "Jan" },
    { categoria: "Matéria-Prima", produto: "Alumínio em chapa", quantidade: 180, valorUnitario: 62.3, mes: "Jan" },
    { categoria: "Embalagem", produto: "Caixa papelão P", quantidade: 900, valorUnitario: 2.1, mes: "Jan" },
    { categoria: "Embalagem", produto: "Fita adesiva", quantidade: 500, valorUnitario: 3.4, mes: "Jan" },
    { categoria: "Ferramentas", produto: "Chave de fenda", quantidade: 60, valorUnitario: 18.5, mes: "Jan" },
    { categoria: "Ferramentas", produto: "Furadeira elétrica", quantidade: 25, valorUnitario: 210.0, mes: "Jan" },

    { categoria: "Matéria-Prima", produto: "Aço em barra", quantidade: 280, valorUnitario: 46.5, mes: "Fev" },
    { categoria: "Matéria-Prima", produto: "Alumínio em chapa", quantidade: 210, valorUnitario: 61.8, mes: "Fev" },
    { categoria: "Embalagem", produto: "Caixa papelão P", quantidade: 820, valorUnitario: 2.15, mes: "Fev" },
    { categoria: "Embalagem", produto: "Fita adesiva", quantidade: 470, valorUnitario: 3.4, mes: "Fev" },
    { categoria: "Ferramentas", produto: "Chave de fenda", quantidade: 55, valorUnitario: 18.5, mes: "Fev" },
    { categoria: "Ferramentas", produto: "Furadeira elétrica", quantidade: 30, valorUnitario: 208.0, mes: "Fev" },

    { categoria: "Matéria-Prima", produto: "Aço em barra", quantidade: 350, valorUnitario: 47.2, mes: "Mar" },
    { categoria: "Matéria-Prima", produto: "Alumínio em chapa", quantidade: 195, valorUnitario: 63.0, mes: "Mar" },
    { categoria: "Embalagem", produto: "Caixa papelão P", quantidade: 950, valorUnitario: 2.2, mes: "Mar" },
    { categoria: "Embalagem", produto: "Fita adesiva", quantidade: 520, valorUnitario: 3.5, mes: "Mar" },
    { categoria: "Ferramentas", produto: "Chave de fenda", quantidade: 70, valorUnitario: 19.0, mes: "Mar" },
    { categoria: "Ferramentas", produto: "Furadeira elétrica", quantidade: 28, valorUnitario: 212.0, mes: "Mar" }
  ];
}

/**
 * Calcula o valor total em estoque (quantidade × valor unitário) de uma linha.
 *
 * @param {{quantidade:number, valorUnitario:number}} item
 * @returns {number} valor total do item
 */
function valorTotalItem(item) {
  return item.quantidade * item.valorUnitario;
}

/**
 * Extrai a lista de categorias únicas presentes no dataset,
 * usada para popular o filtro de categoria.
 *
 * @param {Array<Object>} dados
 * @returns {string[]} categorias únicas, em ordem de primeira ocorrência
 */
function listarCategoriasUnicas(dados) {
  const vistas = new Set();
  const categorias = [];
  dados.forEach((item) => {
    if (!vistas.has(item.categoria)) {
      vistas.add(item.categoria);
      categorias.push(item.categoria);
    }
  });
  return categorias;
}
