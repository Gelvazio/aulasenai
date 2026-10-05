/**
 * Cartão de indicador (KPI).
 */
import { criarElemento } from '../dom.js';

/**
 * Cria um cartão de KPI.
 * @param {{rotulo: string, valor: string|number, detalhe?: string, variante?: string,
 *   link?: string}} opcoes - `variante`: urgente | sucesso.
 * @returns {HTMLElement} Cartão.
 */
export function cartaoKpi(opcoes) {
  const classes = ['cartao', 'kpi'];
  if (opcoes.variante) classes.push(`kpi--${opcoes.variante}`);
  const filhos = [
    criarElemento('span', { classe: 'kpi__rotulo', texto: opcoes.rotulo }),
    criarElemento('strong', { classe: 'kpi__valor', texto: opcoes.valor }),
    opcoes.detalhe ? criarElemento('span', { classe: 'kpi__detalhe', texto: opcoes.detalhe }) : null,
  ];
  if (!opcoes.link) return criarElemento('div', { classe: classes.join(' '), filhos });

  return criarElemento('a', {
    classe: `${classes.join(' ')} kpi--link`,
    atributos: { href: opcoes.link },
    filhos,
  });
}
