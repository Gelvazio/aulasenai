/**
 * Escuta as mensagens recebidas e grava as dos grupos monitorados.
 */
import { EVENTOS, WHATSAPP } from '../config/constantes.js';
import { normalizarMensagem } from './normalizadorMensagem.js';

const TIPOS_UPSERT_ACEITOS = new Set([
  WHATSAPP.TIPO_UPSERT_NOTIFICACAO,
  WHATSAPP.TIPO_UPSERT_HISTORICO,
]);

export class ColetorMensagens {
  /**
   * @param {{cliente: import('./clienteWhatsapp.js').ClienteWhatsapp,
   *   repositorios: ReturnType<import('../banco/repositorios/index.js').criarRepositorios>,
   *   barramento: import('node:events').EventEmitter, logger: import('pino').Logger,
   *   meuNumero: string}} dependencias
   */
  constructor(dependencias) {
    this.cliente = dependencias.cliente;
    this.repositorios = dependencias.repositorios;
    this.barramento = dependencias.barramento;
    this.meuNumero = dependencias.meuNumero;
    this.logger = dependencias.logger.child({ modulo: 'coletor' });
  }

  /**
   * Registra o ouvinte em cada socket criado pelo cliente.
   * @returns {void}
   */
  iniciar() {
    this.cliente.on('socket', (socket) => {
      socket.ev.on('messages.upsert', (evento) => this.processarLote(evento));
    });
  }

  /**
   * Processa um lote do evento `messages.upsert`.
   * @param {{messages: import('@whiskeysockets/baileys').WAMessage[], type: string}} evento
   * @returns {void}
   */
  processarLote(evento) {
    if (!TIPOS_UPSERT_ACEITOS.has(evento.type)) return;

    const identidade = { meusJids: this.cliente.obterMeusJids(), meuNumero: this.meuNumero };
    evento.messages.forEach((mensagemBaileys) => {
      try {
        this.processarMensagem(mensagemBaileys, identidade);
      } catch (erro) {
        this.logger.error({ erro: erro.message, id: mensagemBaileys.key?.id }, 'Falha ao gravar');
      }
    });
  }

  /**
   * Normaliza, filtra pelo monitoramento, grava e publica uma mensagem.
   * @param {import('@whiskeysockets/baileys').WAMessage} mensagemBaileys - Mensagem recebida.
   * @param {{meusJids: string[], meuNumero: string}} identidade - Identificação do usuário.
   * @returns {void}
   */
  processarMensagem(mensagemBaileys, identidade) {
    const mensagem = normalizarMensagem(mensagemBaileys, identidade);
    if (!mensagem) return;

    const grupo = this.repositorios.grupos.buscarPorJid(mensagem.grupoJid);
    if (!grupo) {
      this.repositorios.grupos.garantirExistencia(mensagem.grupoJid);
      return;
    }
    if (grupo.monitorado !== 1) return;

    const inserida = this.repositorios.mensagens.inserirSeNaoExistir(mensagem);
    if (!inserida) return;

    this.barramento.emit(EVENTOS.MENSAGEM_NOVA, { ...mensagem, grupoNome: grupo.nome });
  }
}
