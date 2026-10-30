// Memória do programa: slots de tamanho fixo em MAIN, PROC1 e PROC2.

import { AREAS } from "../constantes.js";

const SLOT_VAZIO = null;

/**
 * Cria o programa vazio, com um slot por posição de cada área.
 * @param {{main: number, proc1: number, proc2: number}} limites - Slots por área.
 * @returns {{main: Array, proc1: Array, proc2: Array}} Programa vazio.
 */
export function criarPrograma(limites) {
  const programa = {};
  for (const area of AREAS) {
    programa[area] = new Array(limites[area] ?? 0).fill(SLOT_VAZIO);
  }
  return programa;
}

/**
 * Coloca o comando no primeiro slot vazio da área.
 * @param {object} programa - Programa (alterado no lugar).
 * @param {string} area - main, proc1 ou proc2.
 * @param {string} comando - Token do comando.
 * @returns {boolean} false se a área estiver cheia.
 */
export function inserirComando(programa, area, comando) {
  const indice = programa[area].indexOf(SLOT_VAZIO);
  if (indice < 0) return false;

  programa[area][indice] = comando;
  return true;
}

/**
 * Esvazia um slot.
 * @param {object} programa - Programa (alterado no lugar).
 * @param {string} area - main, proc1 ou proc2.
 * @param {number} indice - Posição do slot.
 */
export function removerComando(programa, area, indice) {
  if (indice < 0 || indice >= programa[area].length) return;

  programa[area][indice] = SLOT_VAZIO;
}

/**
 * Esvazia todas as áreas.
 * @param {object} programa - Programa (alterado no lugar).
 */
export function limparPrograma(programa) {
  for (const area of AREAS) programa[area].fill(SLOT_VAZIO);
}

/**
 * Conta os slots preenchidos nas três áreas (P1 e P2 também contam).
 * @param {object} programa - Programa.
 * @returns {number} Comandos usados.
 */
export function contarComandosUsados(programa) {
  return AREAS.reduce(
    (total, area) => total + programa[area].filter((slot) => slot !== SLOT_VAZIO).length,
    0,
  );
}

/**
 * Informa se o slot está vazio.
 * @param {*} slot - Conteúdo do slot.
 * @returns {boolean} true se vazio.
 */
export function estaVazio(slot) {
  return slot === SLOT_VAZIO;
}
