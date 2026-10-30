// Interpretador: executa o programa um passo por vez, com pilha de chamadas P1 e P2.
// Modelo de execução: REGRAS-JOGO.md seções 8 e 9.

import {
  AREA_DO_COMANDO,
  AREA_MAIN,
  MOTIVO_FIM_PROGRAMA,
  MOTIVO_LIMITE_PASSOS,
  MOTIVO_SEM_ACAO,
  MOTIVO_VITORIA,
  PASSOS_MAXIMOS_PADRAO,
} from "../constantes.js";
import { estaVazio } from "./programa.js";

const PRIMEIRO_SLOT = 0;

export class Interpretador {
  /**
   * Cria o interpretador de uma execução.
   * @param {object} dependencias - Dependências injetadas.
   * @param {object} dependencias.programa - Slots de MAIN, PROC1 e PROC2.
   * @param {object} dependencias.mundo - Mundo do nível.
   * @param {object} dependencias.robo - Robô.
   * @param {Function} dependencias.executarAcao - (robo, mundo, comando) => boolean.
   * @param {Function} dependencias.verificarVitoria - (mundo) => boolean.
   * @param {number} [dependencias.passosMaximos] - Limite de passos da execução.
   */
  constructor(dependencias) {
    this.programa = dependencias.programa;
    this.mundo = dependencias.mundo;
    this.robo = dependencias.robo;
    this.executarAcao = dependencias.executarAcao;
    this.verificarVitoria = dependencias.verificarVitoria;
    this.passosMaximos = dependencias.passosMaximos ?? PASSOS_MAXIMOS_PADRAO;
    this.area = AREA_MAIN;
    this.indice = PRIMEIRO_SLOT;
    this.pilha = [];
    this.passos = 0;
    this.chamadas = 0;
  }

  /**
   * Informa quantos passos (ações primitivas) já foram executados.
   * @returns {number} Total de passos.
   */
  obterPassos() {
    return this.passos;
  }

  parar(motivo) {
    return { parou: true, motivo, passos: this.passos };
  }

  chamar(comando) {
    this.chamadas += 1;
    this.pilha.push({ area: this.area, indice: this.indice });
    this.area = AREA_DO_COMANDO[comando];
    this.indice = PRIMEIRO_SLOT;
  }

  retornar() {
    const { area, indice } = this.pilha.pop();
    this.area = area;
    this.indice = indice;
  }

  executar(comando, posicao) {
    this.chamadas = 0;
    this.passos += 1;
    const efetiva = this.executarAcao(this.robo, this.mundo, comando);
    const venceu = this.verificarVitoria(this.mundo);
    const motivo = venceu ? MOTIVO_VITORIA : undefined;
    return { parou: venceu, motivo, comando, efetiva, posicao, passos: this.passos };
  }

  /**
   * Avança até a próxima ação primitiva ou até uma causa de parada.
   * @returns {{parou: boolean, motivo?: string, comando?: string, efetiva?: boolean,
   *   posicao?: {area: string, indice: number}, passos: number}} Resultado do passo.
   */
  proximoPasso() {
    for (;;) {
      const sequencia = this.programa[this.area];
      const acabouSequencia = this.indice >= sequencia.length;
      if (acabouSequencia && this.pilha.length === 0) return this.parar(MOTIVO_FIM_PROGRAMA);
      if (acabouSequencia) {
        this.retornar();
        continue;
      }

      const posicao = { area: this.area, indice: this.indice };
      const comando = sequencia[this.indice];
      this.indice += 1;
      if (estaVazio(comando)) continue;

      const resultado = this.tratarComando(comando, posicao);
      if (resultado) return resultado;
    }
  }

  /**
   * Trata um comando lido: chamada empilha; ação primitiva é executada.
   * @param {string} comando - Token lido do slot.
   * @param {{area: string, indice: number}} posicao - Slot de origem.
   * @returns {object|undefined} Resultado do passo, ou undefined para seguir lendo.
   */
  tratarComando(comando, posicao) {
    if (comando in AREA_DO_COMANDO) {
      if (this.chamadas >= this.passosMaximos) return this.parar(MOTIVO_SEM_ACAO);
      this.chamar(comando);
      return undefined;
    }
    if (this.passos >= this.passosMaximos) return this.parar(MOTIVO_LIMITE_PASSOS);
    return this.executar(comando, posicao);
  }
}

/**
 * Cria o interpretador de uma execução.
 * @param {object} dependencias - Ver o construtor de Interpretador.
 * @returns {Interpretador} Interpretador novo.
 */
export function criarInterpretador(dependencias) {
  return new Interpretador(dependencias);
}
