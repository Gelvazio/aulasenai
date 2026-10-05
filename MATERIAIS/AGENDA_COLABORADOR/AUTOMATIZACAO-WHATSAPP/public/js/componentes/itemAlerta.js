/**
 * Item de alerta com ações de situação (lido / resolvido / reabrir).
 */
import { criarElemento } from '../dom.js';
import { SEVERIDADES } from '../constantes.js';
import { formatarDataHora, formatarRelativo } from '../formatadores.js';
import { botao, selo } from './basicos.js';

/** Situação atual → ações disponíveis. */
const ACOES_POR_SITUACAO = Object.freeze({
  aberto: [
    { texto: 'Marcar lido', situacao: 'lido' },
    { texto: 'Resolver', situacao: 'resolvido' },
  ],
  lido: [
    { texto: 'Resolver', situacao: 'resolvido' },
    { texto: 'Reabrir', situacao: 'aberto' },
  ],
  resolvido: [{ texto: 'Reabrir', situacao: 'aberto' }],
});

/**
 * Cria a linha de metadados do alerta.
 * @param {object} alerta - Alerta.
 * @returns {HTMLElement} Metadados.
 */
function criarMeta(alerta) {
  return criarElemento('p', {
    classe: 'texto-suave texto-pequeno linha-acoes',
    filhos: [
      criarElemento('a', {
        texto: alerta.grupo_nome || 'Grupo',
        atributos: { href: `#/grupos/${encodeURIComponent(alerta.grupo_jid)}` },
      }),
      criarElemento('time', {
        texto: formatarRelativo(alerta.atualizado_em),
        atributos: { datetime: alerta.atualizado_em, title: formatarDataHora(alerta.atualizado_em) },
      }),
      alerta.ocorrencias > 1 ? selo(`${alerta.ocorrencias}×`) : null,
      alerta.tipo === 'ia' ? selo('IA', 'primario') : null,
    ],
  });
}

/**
 * Cria o item do alerta.
 * @param {object} alerta - Alerta da API.
 * @param {{aoAlterar?: (alerta: object, situacao: string) => void}} [opcoes] - Ações.
 * @returns {HTMLLIElement} Item.
 */
export function itemAlerta(alerta, opcoes = {}) {
  const severidade = SEVERIDADES[alerta.severidade] || SEVERIDADES.info;
  const acoes = opcoes.aoAlterar
    ? (ACOES_POR_SITUACAO[alerta.situacao] || []).map((acao) =>
        botao({ texto: acao.texto, pequeno: true, aoClicar: () => opcoes.aoAlterar(alerta, acao.situacao) })
      )
    : [];
  return criarElemento('li', {
    classe: `lista__item alerta alerta--${alerta.situacao}`,
    filhos: [
      criarElemento('div', {
        classe: 'lista__corpo',
        filhos: [
          criarElemento('div', {
            classe: 'linha-acoes',
            filhos: [selo(severidade.rotulo, severidade.variante), criarElemento('strong', { texto: alerta.titulo })],
          }),
          alerta.detalhe ? criarElemento('p', { classe: 'alerta__detalhe', texto: alerta.detalhe }) : null,
          criarMeta(alerta),
        ],
      }),
      acoes.length ? criarElemento('div', { classe: 'linha-acoes alerta__acoes', filhos: acoes }) : null,
    ],
  });
}
