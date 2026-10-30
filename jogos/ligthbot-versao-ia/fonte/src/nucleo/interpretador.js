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

/**
 * Cria o interpretador de uma execução.
 * @param {object} dependencias - Dependências injetadas.
 * @param {object} dependencias.programa - Slots de MAIN, PROC1 e PROC2.
 * @param {object} dependencias.mundo - Mundo do nível.
 * @param {object} dependencias.robo - Robô.
 * @param {Function} dependencias.executarAcao - (robo, mundo, comando) => boolean.
 * @param {Function} dependencias.verificarVitoria - (mundo) => boolean.
 * @param {number} [dependencias.passosMaximos] - Limite de passos da execução.
 * @returns {{proximoPasso: Function, obterPassos: Function}} Interpretador.
 */
export function criarInterpretador(dependencias) {
  const { programa, mundo, robo, executarAcao, verificarVitoria } = dependencias;
  const passosMaximos = dependencias.passosMaximos ?? PASSOS_MAXIMOS_PADRAO;
  const estado = { area: AREA_MAIN, indice: PRIMEIRO_SLOT, pilha: [], passos: 0, chamadas: 0 };

  function parada(motivo) {
    return { parou: true, motivo, passos: estado.passos };
  }

  function chamar(comando) {
    estado.chamadas += 1;
    estado.pilha.push({ area: estado.area, indice: estado.indice });
    estado.area = AREA_DO_COMANDO[comando];
    estado.indice = PRIMEIRO_SLOT;
  }

  function retornar() {
    const { area, indice } = estado.pilha.pop();
    estado.area = area;
    estado.indice = indice;
  }

  function executar(comando, posicao) {
    estado.chamadas = 0;
    estado.passos += 1;
    const efetiva = executarAcao(robo, mundo, comando);
    const venceu = verificarVitoria(mundo);
    const motivo = venceu ? MOTIVO_VITORIA : undefined;
    return { parou: venceu, motivo, comando, efetiva, posicao, passos: estado.passos };
  }

  /**
   * Avança até a próxima ação primitiva ou até uma causa de parada.
   * @returns {{parou: boolean, motivo?: string, comando?: string, efetiva?: boolean,
   *   posicao?: {area: string, indice: number}, passos: number}} Resultado do passo.
   */
  function proximoPasso() {
    for (;;) {
      const sequencia = programa[estado.area];
      const acabouSequencia = estado.indice >= sequencia.length;
      if (acabouSequencia && estado.pilha.length === 0) return parada(MOTIVO_FIM_PROGRAMA);
      if (acabouSequencia) {
        retornar();
        continue;
      }

      const posicao = { area: estado.area, indice: estado.indice };
      const comando = sequencia[estado.indice];
      estado.indice += 1;
      if (estaVazio(comando)) continue;

      if (comando in AREA_DO_COMANDO) {
        if (estado.chamadas >= passosMaximos) return parada(MOTIVO_SEM_ACAO);
        chamar(comando);
        continue;
      }
      if (estado.passos >= passosMaximos) return parada(MOTIVO_LIMITE_PASSOS);
      return executar(comando, posicao);
    }
  }

  return { proximoPasso, obterPassos: () => estado.passos };
}
