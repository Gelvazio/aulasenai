// Robô e ações primitivas. Guardas de altura: REGRAS-JOGO.md seção 3 e 7.

import {
  COMANDO_ACENDER,
  COMANDO_ANDAR,
  COMANDO_DIREITA,
  COMANDO_ESQUERDA,
  COMANDO_PULAR,
  GIRO_ANTI_HORARIO,
  GIRO_HORARIO,
  ORIENTACOES,
  TOTAL_ORIENTACOES,
} from "../constantes.js";
import { alternarLuz, obterAltura } from "./mundo.js";

const ALTURA_DEGRAU_PULO = 1;

/**
 * Cria o robô na posição inicial do nível.
 * @param {{x: number, y: number, orientacao: number}} inicio - Posição e orientação.
 * @returns {{x: number, y: number, orientacao: number}} Robô novo.
 */
export function criarRobo(inicio) {
  return { x: inicio.x, y: inicio.y, orientacao: inicio.orientacao };
}

/**
 * Calcula a célula imediatamente à frente do robô.
 * @param {{x: number, y: number, orientacao: number}} robo - Robô.
 * @returns {{x: number, y: number}} Coordenada da frente.
 */
export function posicaoDaFrente(robo) {
  const { dx, dy } = ORIENTACOES[robo.orientacao];
  return { x: robo.x + dx, y: robo.y + dy };
}

/**
 * Lê as alturas da célula atual e da célula da frente.
 * @param {{x: number, y: number, orientacao: number}} robo - Robô.
 * @param {object} mundo - Mundo atual.
 * @returns {{atual: number, frente: number, destino: {x: number, y: number}}} Alturas.
 */
function medirAlturas(robo, mundo) {
  const destino = posicaoDaFrente(robo);
  return {
    atual: obterAltura(mundo, robo.x, robo.y),
    frente: obterAltura(mundo, destino.x, destino.y),
    destino,
  };
}

function moverPara(robo, destino) {
  robo.x = destino.x;
  robo.y = destino.y;
  return true;
}

function andar(robo, mundo) {
  const { atual, frente, destino } = medirAlturas(robo, mundo);
  const podeAndar = frente > 0 && frente === atual;
  return podeAndar ? moverPara(robo, destino) : false;
}

function pular(robo, mundo) {
  const { atual, frente, destino } = medirAlturas(robo, mundo);
  const subeUmDegrau = frente === atual + ALTURA_DEGRAU_PULO;
  const podePular = frente > 0 && (subeUmDegrau || frente < atual);
  return podePular ? moverPara(robo, destino) : false;
}

function girar(robo, giro) {
  robo.orientacao = (robo.orientacao + giro) % TOTAL_ORIENTACOES;
  return true;
}

function acender(robo, mundo) {
  return alternarLuz(mundo, robo.x, robo.y);
}

// Estratégias por comando: novo comando = nova entrada, sem alterar o resto.
const ACOES = Object.freeze({
  [COMANDO_ANDAR]: andar,
  [COMANDO_PULAR]: pular,
  [COMANDO_ESQUERDA]: (robo) => girar(robo, GIRO_ANTI_HORARIO),
  [COMANDO_DIREITA]: (robo) => girar(robo, GIRO_HORARIO),
  [COMANDO_ACENDER]: acender,
});

/**
 * Executa uma ação primitiva; ação inválida não muda o estado.
 * @param {object} robo - Robô (alterado no lugar).
 * @param {object} mundo - Mundo atual (as luzes podem mudar).
 * @param {string} comando - Token da ação (WALK, JUMP, LEFT, RIGHT ou LIGHT).
 * @returns {boolean} true se a ação teve efeito.
 * @throws {Error} Se o comando não for uma ação primitiva.
 */
export function executarAcao(robo, mundo, comando) {
  const acao = ACOES[comando];
  if (!acao) throw new Error(`Comando desconhecido: ${comando}`);
  return acao(robo, mundo);
}
