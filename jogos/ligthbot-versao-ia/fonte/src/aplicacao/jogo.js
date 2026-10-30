// Controlador do jogo: liga o núcleo (regras) à interface, sem conhecer o DOM em detalhe.
// Todas as dependências são injetadas: nucleo (regras), vista (desenho) e elementos (DOM).

import {
  AREA_MAIN,
  AREAS,
  MENSAGENS,
  MOTIVO_FIM_PROGRAMA,
  MOTIVO_LIMITE_PASSOS,
  MOTIVO_PARADA_MANUAL,
  MOTIVO_SEM_ACAO,
  MOTIVO_VITORIA,
  NIVEL_INICIAL,
  PASSOS_MAXIMOS_PADRAO,
  VELOCIDADE_PADRAO,
  VELOCIDADES,
} from "../constantes.js";

const MENSAGEM_POR_MOTIVO = Object.freeze({
  [MOTIVO_FIM_PROGRAMA]: MENSAGENS.fimSemVitoria,
  [MOTIVO_LIMITE_PASSOS]: MENSAGENS.limitePassos,
  [MOTIVO_SEM_ACAO]: MENSAGENS.semAcao,
  [MOTIVO_PARADA_MANUAL]: MENSAGENS.parado,
  [MOTIVO_VITORIA]: MENSAGENS.vitoria,
});
const NENHUM_SLOT = -1;

/**
 * Espera um intervalo.
 * @param {number} milissegundos - Tempo de espera.
 * @returns {Promise<void>} Resolve ao fim do intervalo.
 */
function esperar(milissegundos) {
  return new Promise((resolver) => setTimeout(resolver, milissegundos));
}

/**
 * Soma os slots das três áreas.
 * @param {{main: number, proc1: number, proc2: number}} limites - Slots por área.
 * @returns {number} Total de slots.
 */
function somarLimites(limites) {
  return AREAS.reduce((total, area) => total + limites[area], 0);
}

export class Jogo {
  /**
   * @param {object} dependencias - Dependências injetadas.
   * @param {object[]} dependencias.niveis - Dados dos níveis, em ordem.
   * @param {object} dependencias.nucleo - Funções de regra (mundo, robô, programa).
   * @param {object} dependencias.vista - Funções de desenho e de interface.
   * @param {object} dependencias.elementos - Elementos do DOM usados pelo jogo.
   */
  constructor({ niveis, nucleo, vista, elementos }) {
    this.niveis = niveis;
    this.nucleo = nucleo;
    this.vista = vista;
    this.elementos = elementos;
    this.concluidos = new Set();
    this.intervaloMs = VELOCIDADES.find((item) => item.id === VELOCIDADE_PADRAO).intervaloMs;
    this.numeroDoNivel = NIVEL_INICIAL;
    this.areaAtiva = AREA_MAIN;
    this.executando = false;
    this.identificadorExecucao = 0;
    this.interpretador = null;
  }

  /** Carrega o progresso salvo, monta os controles e abre o primeiro nível pendente. */
  iniciar() {
    this.concluidos = this.vista.carregarProgresso();
    this.vista.montarControles(this.elementos.controles, {
      aoExecutar: () => this.executar(),
      aoPasso: () => this.darPasso(),
      aoParar: () => this.parar(),
      aoReiniciar: () => this.reiniciar(),
      aoLimpar: () => this.limpar(),
      aoMudarVelocidade: (id) => this.mudarVelocidade(id),
    });
    this.abrirNivel(this.primeiroNivelPendente());
  }

  primeiroNivelPendente() {
    const numeros = this.niveis.map((_, indice) => indice + 1);
    return numeros.find((numero) => !this.concluidos.has(numero)) ?? NIVEL_INICIAL;
  }

  get nivel() {
    return this.niveis[this.numeroDoNivel - 1];
  }

  /**
   * Abre um nível, com programa vazio e mundo novo.
   * @param {number} numero - Número do nível (1 a N).
   */
  abrirNivel(numero) {
    this.interromper();
    this.numeroDoNivel = numero;
    this.programa = this.nucleo.criarPrograma(this.nivel.limites);
    this.areaAtiva = AREA_MAIN;
    this.prepararExecucao();
    this.vista.montarPaleta(this.elementos.paleta, {
      comandosLiberados: this.nivel.comandosLiberados,
      aoEscolher: (token) => this.escolherComando(token),
    });
    this.montarSeletor();
    this.mostrarMensagem(MENSAGENS.inicio);
  }

  montarSeletor() {
    this.vista.montarSeletor(this.elementos.seletor, {
      total: this.niveis.length,
      atual: this.numeroDoNivel,
      concluidos: this.concluidos,
      aoEscolher: (escolhido) => this.abrirNivel(escolhido),
    });
  }

  /** Recria mundo e robô do nível atual e redesenha o mapa (o programa é mantido). */
  prepararExecucao() {
    this.mundo = this.nucleo.criarMundo(this.nivel);
    this.robo = this.nucleo.criarRobo(this.nivel.inicio);
    this.interpretador = null;
    this.vista.desenharMapa(this.elementos.mapa, this.mundo);
    this.vista.desenharRobo(this.elementos.mapa, this.robo, this.mundo);
    this.redesenharPrograma();
  }

  redesenharPrograma() {
    this.vista.montarAreas(this.elementos.areas, {
      programa: this.programa,
      limites: this.nivel.limites,
      areaAtiva: this.areaAtiva,
      aoRemover: (area, indice) => this.removerComando(area, indice),
      aoAtivarArea: (area) => this.ativarArea(area),
    });
    this.atualizarTelemetria();
  }

  atualizarTelemetria() {
    this.vista.atualizarTelemetria(this.elementos.telemetria, {
      passos: this.interpretador ? this.interpretador.obterPassos() : 0,
      passosMaximos: this.nivel.passosMaximos ?? PASSOS_MAXIMOS_PADRAO,
      usados: this.nucleo.contarComandosUsados(this.programa),
      limiteTotal: somarLimites(this.nivel.limites),
    });
  }

  mostrarMensagem(texto) {
    this.elementos.mensagem.textContent = texto;
  }

  escolherComando(token) {
    if (this.executando) return;

    const inseriu = this.nucleo.inserirComando(this.programa, this.areaAtiva, token);
    this.redesenharPrograma();
    if (!inseriu) this.mostrarMensagem(MENSAGENS.slotsCheios);
  }

  removerComando(area, indice) {
    if (this.executando) return;

    this.nucleo.removerComando(this.programa, area, indice);
    this.redesenharPrograma();
  }

  ativarArea(area) {
    this.areaAtiva = area;
    this.redesenharPrograma();
  }

  limpar() {
    if (this.executando) return;

    this.nucleo.limparPrograma(this.programa);
    this.redesenharPrograma();
  }

  reiniciar() {
    this.interromper();
    this.prepararExecucao();
    this.mostrarMensagem(MENSAGENS.inicio);
  }

  mudarVelocidade(id) {
    const velocidade = VELOCIDADES.find((item) => item.id === id);
    if (velocidade) this.intervaloMs = velocidade.intervaloMs;
  }

  /** Interrompe qualquer execução em andamento (o laço assíncrono percebe e sai). */
  interromper() {
    this.executando = false;
    this.identificadorExecucao += 1;
    this.vista.definirEstadoControles(this.elementos.controles, { executando: false });
    this.vista.destacarSlot(this.elementos.areas, AREA_MAIN, NENHUM_SLOT);
  }

  parar() {
    if (!this.executando) return;

    this.interromper();
    this.mostrarMensagem(MENSAGEM_POR_MOTIVO[MOTIVO_PARADA_MANUAL]);
  }

  criarInterpretador() {
    this.interpretador = this.nucleo.criarInterpretador({
      programa: this.programa,
      mundo: this.mundo,
      robo: this.robo,
      executarAcao: this.nucleo.executarAcao,
      verificarVitoria: this.nucleo.verificarVitoria,
      passosMaximos: this.nivel.passosMaximos,
    });
  }

  /** Executa o programa inteiro, a partir do início, na velocidade escolhida. */
  async executar() {
    if (this.executando) return;

    this.prepararExecucao();
    this.criarInterpretador();
    this.mostrarMensagem(MENSAGENS.executando);
    await this.rodar();
  }

  /** Executa um único passo (cria o interpretador se for o primeiro). */
  async darPasso() {
    if (this.executando) return;

    if (!this.interpretador) {
      this.prepararExecucao();
      this.criarInterpretador();
    }
    const resultado = this.interpretador.proximoPasso();
    await this.aplicarResultado(resultado);
    if (resultado.parou) this.finalizar(resultado.motivo);
  }

  async rodar() {
    const identificador = this.identificadorExecucao;
    this.executando = true;
    this.vista.definirEstadoControles(this.elementos.controles, { executando: true });
    while (this.executando && identificador === this.identificadorExecucao) {
      const resultado = this.interpretador.proximoPasso();
      await this.aplicarResultado(resultado);
      if (resultado.parou) {
        this.finalizar(resultado.motivo);
        return;
      }
      await esperar(this.intervaloMs);
    }
  }

  /**
   * Reflete na tela o resultado de um passo (robô, luzes, slot atual e telemetria).
   * @param {object} resultado - Resultado de Interpretador.proximoPasso().
   */
  async aplicarResultado(resultado) {
    if (resultado.comando) {
      const { area, indice } = resultado.posicao;
      this.vista.destacarSlot(this.elementos.areas, area, indice);
      this.vista.desenharRobo(this.elementos.mapa, this.robo, this.mundo);
      this.vista.atualizarLuzes(this.elementos.mapa, this.mundo);
      await this.vista.animarAcao(this.elementos.mapa, resultado.comando, resultado.efetiva);
    }
    this.atualizarTelemetria();
  }

  /**
   * Encerra a execução: mensagem do motivo e, na vitória, progresso e tela de vitória.
   * @param {string} motivo - Causa da parada.
   */
  finalizar(motivo) {
    this.executando = false;
    this.vista.definirEstadoControles(this.elementos.controles, { executando: false });
    this.mostrarMensagem(MENSAGEM_POR_MOTIVO[motivo] ?? MENSAGENS.parado);
    if (motivo === MOTIVO_VITORIA) this.registrarVitoria();
  }

  registrarVitoria() {
    this.concluidos.add(this.numeroDoNivel);
    const salvou = this.vista.salvarProgresso(this.concluidos);
    if (!salvou) this.mostrarMensagem(MENSAGENS.progressoIndisponivel);
    this.montarSeletor();
    const proximo = this.numeroDoNivel + 1;
    this.vista.mostrarVitoria(this.elementos.dialogo, {
      comandosUsados: this.nucleo.contarComandosUsados(this.programa),
      limiteTotal: somarLimites(this.nivel.limites),
      temProximo: proximo <= this.niveis.length,
      aoProximo: () => this.abrirNivel(proximo),
      aoRepetir: () => this.reiniciar(),
    });
  }
}
