/**
 * Campos de formulário acessíveis (rótulo ligado à entrada).
 */
import { criarElemento } from '../dom.js';

let contadorIds = 0;

/**
 * Gera um id único para ligar rótulo e entrada.
 * @param {string} nome - Nome do campo.
 * @returns {string} Id.
 */
function gerarId(nome) {
  contadorIds += 1;
  return `campo-${nome}-${contadorIds}`;
}

/**
 * Envolve uma entrada com rótulo e ajuda.
 * @param {{rotulo: string, ajuda?: string, largo?: boolean}} opcoes - Textos.
 * @param {HTMLElement} entrada - Entrada (com id).
 * @returns {HTMLElement} Campo completo.
 */
function envolver(opcoes, entrada) {
  return criarElemento('div', {
    classe: `campo ${opcoes.largo ? 'formulario__largo' : ''}`.trim(),
    filhos: [
      criarElemento('label', { classe: 'campo__rotulo', texto: opcoes.rotulo, atributos: { for: entrada.id } }),
      entrada,
      opcoes.ajuda ? criarElemento('span', { classe: 'campo__ajuda', texto: opcoes.ajuda }) : null,
    ],
  });
}

/**
 * Campo de texto/número/data.
 * @param {{rotulo: string, nome: string, tipo?: string, valor?: unknown, ajuda?: string,
 *   atributos?: object, largo?: boolean}} opcoes
 * @returns {HTMLElement} Campo.
 */
export function campoTexto(opcoes) {
  const entrada = criarElemento('input', {
    classe: 'campo__entrada',
    atributos: { id: gerarId(opcoes.nome), name: opcoes.nome, type: opcoes.tipo || 'text', ...opcoes.atributos },
  });
  if (opcoes.valor !== undefined && opcoes.valor !== null) entrada.value = String(opcoes.valor);
  return envolver(opcoes, entrada);
}

/**
 * Campo de texto longo.
 * @param {{rotulo: string, nome: string, valor?: string, ajuda?: string, atributos?: object,
 *   largo?: boolean}} opcoes
 * @returns {HTMLElement} Campo.
 */
export function campoAreaTexto(opcoes) {
  const entrada = criarElemento('textarea', {
    classe: 'campo__entrada',
    atributos: { id: gerarId(opcoes.nome), name: opcoes.nome, ...opcoes.atributos },
  });
  entrada.value = opcoes.valor || '';
  return envolver(opcoes, entrada);
}

/**
 * Campo de seleção.
 * @param {{rotulo: string, nome: string, opcoes: {valor: string, rotulo: string}[],
 *   valor?: string, ajuda?: string, largo?: boolean}} opcoes
 * @returns {HTMLElement} Campo.
 */
export function campoSelecao(opcoes) {
  const entrada = criarElemento('select', {
    classe: 'campo__entrada',
    atributos: { id: gerarId(opcoes.nome), name: opcoes.nome },
    filhos: opcoes.opcoes.map((item) =>
      criarElemento('option', { texto: item.rotulo, atributos: { value: item.valor } })
    ),
  });
  if (opcoes.valor !== undefined) entrada.value = opcoes.valor;
  return envolver(opcoes, entrada);
}

/**
 * Interruptor liga/desliga (checkbox com papel de switch).
 * @param {{rotulo: string, marcado: boolean, nome?: string,
 *   aoAlterar?: (marcado: boolean, entrada: HTMLInputElement) => void}} opcoes
 * @returns {HTMLLabelElement} Interruptor.
 */
export function interruptor(opcoes) {
  const entrada = criarElemento('input', {
    classe: 'interruptor__entrada',
    atributos: { type: 'checkbox', role: 'switch', name: opcoes.nome },
  });
  entrada.checked = Boolean(opcoes.marcado);
  if (opcoes.aoAlterar) entrada.addEventListener('change', () => opcoes.aoAlterar(entrada.checked, entrada));
  return criarElemento('label', {
    classe: 'interruptor',
    filhos: [entrada, criarElemento('span', { texto: opcoes.rotulo })],
  });
}
