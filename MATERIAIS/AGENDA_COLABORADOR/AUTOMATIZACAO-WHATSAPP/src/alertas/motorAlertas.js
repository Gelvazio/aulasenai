/**
 * Motor de alertas: aplica as regras ativas a cada mensagem nova e periodicamente,
 * agrupa repetições (anti-duplicação) e publica `alerta:novo`.
 */
import { ALERTAS, EVENTOS } from '../config/constantes.js';

export class MotorAlertas {
  /**
   * @param {{repositorios: object, servicoConfiguracoes: object,
   *   barramento: import('node:events').EventEmitter, logger: import('pino').Logger,
   *   regras: Record<string, object>}} dependencias - `regras` = REGRAS_ALERTA (injetado).
   */
  constructor(dependencias) {
    this.repositorios = dependencias.repositorios;
    this.servicoConfiguracoes = dependencias.servicoConfiguracoes;
    this.barramento = dependencias.barramento;
    this.regras = dependencias.regras;
    this.logger = dependencias.logger.child({ modulo: 'alertas' });
  }

  /**
   * Passa a ouvir as mensagens novas.
   * @returns {void}
   */
  iniciar() {
    this.barramento.on(EVENTOS.MENSAGEM_NOVA, (mensagem) => {
      try {
        this.avaliarMensagem(mensagem);
      } catch (erro) {
        this.logger.error({ erro: erro.message }, 'Falha ao avaliar alertas');
      }
    });
  }

  /**
   * Lista as regras ativas que se aplicam a um grupo, junto com sua estratégia.
   * @param {string|null} grupoJid - Grupo (null = qualquer).
   * @returns {{regra: object, estrategia: object}[]} Pares regra/estratégia.
   */
  regrasAplicaveis(grupoJid) {
    return this.repositorios.regras
      .listarAtivas()
      .filter((regra) => this.regras[regra.tipo])
      .filter((regra) => !regra.grupo_jid || !grupoJid || regra.grupo_jid === grupoJid)
      .map((regra) => ({ regra, estrategia: this.regras[regra.tipo] }));
  }

  /**
   * Aplica as regras a uma mensagem nova (mensagens do próprio usuário são ignoradas).
   * @param {object} mensagem - Mensagem normalizada (evento mensagem:nova).
   * @returns {object[]} Alertas criados ou atualizados.
   */
  avaliarMensagem(mensagem) {
    if (mensagem.deMim) return [];

    const contexto = {
      configuracoes: this.servicoConfiguracoes.listar(),
      repositorios: this.repositorios,
    };
    return this.regrasAplicaveis(mensagem.grupoJid)
      .map(({ regra, estrategia }) => {
        const resultado = estrategia.avaliar(mensagem, { ...contexto, regra });
        if (!resultado) return null;

        return this.registrarAlerta({
          ...resultado,
          regra,
          grupoJid: mensagem.grupoJid,
          mensagemId: mensagem.id,
        });
      })
      .filter(Boolean);
  }

  /**
   * Executa as regras periódicas (ex.: perguntas sem resposta).
   * @returns {object[]} Alertas criados ou atualizados.
   */
  verificarPeriodicas() {
    const contexto = {
      configuracoes: this.servicoConfiguracoes.listar(),
      repositorios: this.repositorios,
    };
    return this.regrasAplicaveis(null)
      .filter(({ estrategia }) => typeof estrategia.avaliarPeriodico === 'function')
      .flatMap(({ regra, estrategia }) =>
        estrategia
          .avaliarPeriodico({ ...contexto, regra })
          .filter((resultado) => !regra.grupo_jid || resultado.grupoJid === regra.grupo_jid)
          .map((resultado) => this.registrarAlerta({ ...resultado, regra }))
      );
  }

  /**
   * Cria o alerta ou soma ocorrência ao alerta aberto equivalente recente.
   * @param {{regra?: object|null, tipo?: string, grupoJid: string, mensagemId?: string,
   *   titulo: string, detalhe: string, severidade?: string}} dados
   * @returns {object} Alerta salvo.
   */
  registrarAlerta(dados) {
    const tipo = dados.regra?.tipo || dados.tipo;
    const regraId = dados.regra?.id ?? null;
    const desde = new Date(Date.now() - ALERTAS.JANELA_DUPLICACAO_MS).toISOString();
    const existente = this.repositorios.alertas.buscarDuplicado({
      tipo,
      regraId,
      grupoJid: dados.grupoJid,
      desde,
    });
    const alerta = existente
      ? this.repositorios.alertas.registrarOcorrencia(existente.id, dados.detalhe)
      : this.repositorios.alertas.criar({
          regraId,
          tipo,
          grupoJid: dados.grupoJid,
          mensagemId: dados.mensagemId,
          titulo: dados.titulo,
          detalhe: dados.detalhe,
          severidade: dados.regra?.severidade || dados.severidade,
        });
    this.barramento.emit(EVENTOS.ALERTA_NOVO, alerta);
    return alerta;
  }
}
