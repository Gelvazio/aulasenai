/**
 * Tabela genérica a partir de definições de coluna.
 */
import { criarElemento } from '../dom.js';
import { vazio } from './basicos.js';

/**
 * Converte o retorno de `renderizar` em nó.
 * @param {unknown} conteudo - Node, texto ou número.
 * @returns {Node|string} Conteúdo seguro.
 */
function paraNo(conteudo) {
  if (conteudo instanceof Node) return conteudo;

  return conteudo === null || conteudo === undefined ? '' : String(conteudo);
}

/**
 * Cria a tabela.
 * @param {{colunas: {titulo: string, renderizar: (linha: object) => unknown,
 *   numerica?: boolean}[], linhas: object[], textoVazio?: string}} opcoes
 * @returns {HTMLElement} Tabela (com rolagem horizontal) ou estado vazio.
 */
export function tabela(opcoes) {
  if (opcoes.linhas.length === 0) return vazio(opcoes.textoVazio);

  const classeColuna = (coluna) => (coluna.numerica ? 'tabela__numero' : undefined);
  const cabecalho = criarElemento('thead', {
    filhos: [
      criarElemento('tr', {
        filhos: opcoes.colunas.map((coluna) =>
          criarElemento('th', { classe: classeColuna(coluna), texto: coluna.titulo, atributos: { scope: 'col' } })
        ),
      }),
    ],
  });
  const corpo = criarElemento('tbody', {
    filhos: opcoes.linhas.map((linha) =>
      criarElemento('tr', {
        filhos: opcoes.colunas.map((coluna) =>
          criarElemento('td', { classe: classeColuna(coluna), filhos: [paraNo(coluna.renderizar(linha))] })
        ),
      })
    ),
  });
  return criarElemento('div', {
    classe: 'tabela-rolagem',
    filhos: [criarElemento('table', { classe: 'tabela', filhos: [cabecalho, corpo] })],
  });
}
