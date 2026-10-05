/**
 * Agendador simples com setTimeout: tarefas diárias (horário HH:MM no fuso) e por intervalo.
 * O horário/intervalo é lido por função a cada agendamento, então mudanças de configuração
 * valem após `reagendar(nome)`.
 */
import { proximaOcorrencia } from '../utilitarios/datas.js';

export class Agendador {
  /**
   * @param {{fusoHorario: string, logger: import('pino').Logger}} dependencias
   */
  constructor(dependencias) {
    this.fuso = dependencias.fusoHorario;
    this.logger = dependencias.logger.child({ modulo: 'agendador' });
    this.tarefas = new Map();
  }

  /**
   * Agenda uma tarefa diária.
   * @param {{nome: string, obterHorario: () => string, executar: () => Promise<unknown>}} tarefa
   * @returns {void}
   */
  agendarDiario(tarefa) {
    this.tarefas.set(tarefa.nome, { ...tarefa, calcularEspera: () => this.esperaDiaria(tarefa) });
    this.programar(tarefa.nome);
  }

  /**
   * Agenda uma tarefa repetida por intervalo.
   * @param {{nome: string, obterIntervaloMs: () => number,
   *   executar: () => Promise<unknown>}} tarefa
   * @returns {void}
   */
  agendarIntervalo(tarefa) {
    this.tarefas.set(tarefa.nome, { ...tarefa, calcularEspera: () => tarefa.obterIntervaloMs() });
    this.programar(tarefa.nome);
  }

  /**
   * Calcula quanto falta para o próximo horário da tarefa diária.
   * @param {{obterHorario: () => string}} tarefa - Tarefa diária.
   * @returns {number} Espera em ms.
   */
  esperaDiaria(tarefa) {
    return proximaOcorrencia(tarefa.obterHorario(), this.fuso).getTime() - Date.now();
  }

  /**
   * Programa a próxima execução de uma tarefa.
   * @param {string} nome - Nome da tarefa.
   * @returns {void}
   */
  programar(nome) {
    const tarefa = this.tarefas.get(nome);
    if (!tarefa) return;

    clearTimeout(tarefa.temporizador);
    const espera = Math.max(tarefa.calcularEspera(), 0);
    tarefa.temporizador = setTimeout(() => this.executar(nome), espera);
    tarefa.temporizador.unref();
    this.logger.debug({ nome, emMinutos: Math.round(espera / 60_000) }, 'Tarefa programada');
  }

  /**
   * Executa a tarefa (erros só são registrados) e programa a próxima.
   * @param {string} nome - Nome da tarefa.
   * @returns {Promise<void>}
   */
  async executar(nome) {
    const tarefa = this.tarefas.get(nome);
    if (!tarefa) return;

    try {
      await tarefa.executar();
    } catch (erro) {
      this.logger.error({ nome, erro: erro.message }, 'Falha na tarefa agendada');
    } finally {
      this.programar(nome);
    }
  }

  /**
   * Recalcula o próximo horário de uma tarefa (após mudança de configuração).
   * @param {string} nome - Nome da tarefa.
   * @returns {void}
   */
  reagendar(nome) {
    this.programar(nome);
  }

  /**
   * Cancela todas as tarefas.
   * @returns {void}
   */
  parar() {
    this.tarefas.forEach((tarefa) => clearTimeout(tarefa.temporizador));
    this.tarefas.clear();
  }
}
