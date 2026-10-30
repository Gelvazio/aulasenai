// Ponto de entrada: importa os estilos, injeta as dependências e inicia o jogo.

import "./estilos/base.css";
import "./estilos/componentes.css";
import "./estilos/mapa.css";
import "./estilos/fundo.css";
import "./estilos/acessibilidade.css";

import { Jogo } from "./aplicacao/jogo.js";
import { listarNiveis } from "./aplicacao/niveis.js";
import {
  atualizarTelemetria,
  definirEstadoControles,
  montarControles,
} from "./interface/controles.js";
import { montarFundo } from "./interface/fundo.js";
import { atualizarLuzes, desenharMapa } from "./interface/mapa.js";
import { destacarSlot, montarAreas, montarPaleta } from "./interface/paleta.js";
import { animarAcao, desenharRobo } from "./interface/robo-visual.js";
import { carregarProgresso, montarSeletor, salvarProgresso } from "./interface/seletor-niveis.js";
import { mostrarVitoria } from "./interface/vitoria-tela.js";
import { criarInterpretador } from "./nucleo/interpretador.js";
import { criarMundo } from "./nucleo/mundo.js";
import {
  contarComandosUsados,
  criarPrograma,
  inserirComando,
  limparPrograma,
  removerComando,
} from "./nucleo/programa.js";
import { criarRobo, executarAcao } from "./nucleo/robo.js";
import { todasLuzesAcesas } from "./nucleo/vitoria.js";

const nucleo = {
  criarMundo,
  criarRobo,
  criarPrograma,
  inserirComando,
  removerComando,
  limparPrograma,
  contarComandosUsados,
  executarAcao,
  criarInterpretador,
  verificarVitoria: todasLuzesAcesas,
};

const vista = {
  desenharMapa,
  atualizarLuzes,
  desenharRobo,
  animarAcao,
  montarPaleta,
  montarAreas,
  destacarSlot,
  montarControles,
  definirEstadoControles,
  atualizarTelemetria,
  montarSeletor,
  carregarProgresso,
  salvarProgresso,
  mostrarVitoria,
};

/**
 * Reúne os elementos do DOM usados pelo jogo.
 * @returns {object} Elementos por nome.
 */
function buscarElementos() {
  const buscar = (id) => document.getElementById(id);
  return {
    mapa: buscar("mapa"),
    mensagem: buscar("mensagem"),
    paleta: buscar("paleta"),
    areas: buscar("areas-programa"),
    controles: buscar("controles"),
    telemetria: buscar("telemetria"),
    seletor: buscar("seletor-niveis"),
    dialogo: buscar("tela-vitoria"),
  };
}

montarFundo(document.getElementById("fundo"));
new Jogo({ niveis: listarNiveis(), nucleo, vista, elementos: buscarElementos() }).iniciar();
