/**
 * Gráfico de barras em SVG (sem bibliotecas). Cores vêm do CSS (.grafico__barra).
 */
import { criarSvg } from '../dom.js';

const DIMENSOES = Object.freeze({
  LARGURA: 600,
  ALTURA: 200,
  MARGEM_TOPO: 16,
  MARGEM_BASE: 22,
  ESPACO_ENTRE: 0.25,
  RAIO: 3,
});

/**
 * Cria uma barra com rótulo, valor e dica (title).
 * @param {{item: {rotulo: string, valor: number}, indice: number, escala: object}} dados
 * @returns {SVGGElement} Grupo da barra.
 */
function criarBarra(dados) {
  const { item, indice, escala } = dados;
  const x = indice * escala.passo + (escala.passo * DIMENSOES.ESPACO_ENTRE) / 2;
  const altura = item.valor > 0 ? Math.max((item.valor / escala.maximo) * escala.alturaUtil, 2) : 0;
  const y = DIMENSOES.ALTURA - DIMENSOES.MARGEM_BASE - altura;
  const centro = x + escala.largura / 2;
  const mostrarRotulo = indice % escala.intervaloRotulo === 0;
  return criarSvg('g', {}, [
    criarSvg('rect', {
      class: 'grafico__barra',
      x,
      y,
      width: escala.largura,
      height: altura,
      rx: DIMENSOES.RAIO,
    }, [criarSvg('title', {}, [document.createTextNode(`${item.rotulo}: ${item.valor}`)])]),
    item.valor > 0 && escala.mostrarValores
      ? criarSvg('text', { class: 'grafico__valor', x: centro, y: y - 4, 'text-anchor': 'middle' }, [
          document.createTextNode(String(item.valor)),
        ])
      : null,
    mostrarRotulo
      ? criarSvg('text', { class: 'grafico__rotulo', x: centro, y: DIMENSOES.ALTURA - 6, 'text-anchor': 'middle' }, [
          document.createTextNode(item.rotulo),
        ])
      : null,
  ]);
}

/**
 * Cria o gráfico de barras.
 * @param {{dados: {rotulo: string, valor: number}[], descricao: string,
 *   maxRotulos?: number}} opcoes - `descricao` é lida por leitores de tela.
 * @returns {SVGSVGElement} Gráfico.
 */
export function graficoBarras(opcoes) {
  const quantidade = Math.max(opcoes.dados.length, 1);
  const passo = DIMENSOES.LARGURA / quantidade;
  const escala = {
    passo,
    largura: passo * (1 - DIMENSOES.ESPACO_ENTRE),
    maximo: Math.max(...opcoes.dados.map((item) => item.valor), 1),
    alturaUtil: DIMENSOES.ALTURA - DIMENSOES.MARGEM_TOPO - DIMENSOES.MARGEM_BASE,
    intervaloRotulo: Math.ceil(quantidade / (opcoes.maxRotulos || 12)),
    mostrarValores: quantidade <= 14,
  };
  const base = DIMENSOES.ALTURA - DIMENSOES.MARGEM_BASE;
  return criarSvg(
    'svg',
    {
      class: 'grafico',
      viewBox: `0 0 ${DIMENSOES.LARGURA} ${DIMENSOES.ALTURA}`,
      role: 'img',
      'aria-label': opcoes.descricao,
    },
    [
      criarSvg('line', { class: 'grafico__eixo', x1: 0, x2: DIMENSOES.LARGURA, y1: base, y2: base }),
      ...opcoes.dados.map((item, indice) => criarBarra({ item, indice, escala })),
    ]
  );
}
