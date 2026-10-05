/**
 * Canal de Server-Sent Events: envia eventos em tempo real ao dashboard.
 */
import { SERVIDOR } from '../config/constantes.js';

export class CanalSse {
  constructor() {
    this.clientes = new Set();
    this.temporizador = setInterval(() => this.enviarHeartbeat(), SERVIDOR.INTERVALO_HEARTBEAT_MS);
    this.temporizador.unref();
  }

  /**
   * Abre o fluxo SSE para uma requisição.
   * @param {import('node:http').IncomingMessage} requisicao - Requisição.
   * @param {import('node:http').ServerResponse} resposta - Resposta (mantida aberta).
   * @returns {void}
   */
  adicionar(requisicao, resposta) {
    resposta.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
    });
    resposta.write('retry: 3000\n\n');
    this.clientes.add(resposta);
    requisicao.on('close', () => this.clientes.delete(resposta));
  }

  /**
   * Envia um evento a todos os clientes conectados.
   * @param {string} evento - Nome do evento.
   * @param {unknown} dados - Dados serializáveis.
   * @returns {void}
   */
  transmitir(evento, dados) {
    const mensagem = `event: ${evento}\ndata: ${JSON.stringify(dados ?? null)}\n\n`;
    this.clientes.forEach((resposta) => resposta.write(mensagem));
  }

  /**
   * Mantém as conexões vivas (comentário SSE).
   * @returns {void}
   */
  enviarHeartbeat() {
    this.clientes.forEach((resposta) => resposta.write(': ping\n\n'));
  }

  /**
   * Encerra todas as conexões.
   * @returns {void}
   */
  fechar() {
    clearInterval(this.temporizador);
    this.clientes.forEach((resposta) => resposta.end());
    this.clientes.clear();
  }
}
