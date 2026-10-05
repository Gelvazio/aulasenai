/**
 * Cliente SSE: recebe eventos em tempo real e repassa ao barramento do frontend.
 */
import { API, EVENTOS_APP, EVENTOS_SSE } from './constantes.js';
import { emitir } from './estado.js';

/**
 * Abre a conexão SSE (o navegador reconecta sozinho em caso de queda).
 * @returns {EventSource} Fonte de eventos.
 */
export function iniciarEventos() {
  const fonte = new EventSource(API.EVENTOS);
  Object.values(EVENTOS_SSE).forEach((nome) => {
    fonte.addEventListener(nome, (evento) => {
      try {
        emitir(nome, JSON.parse(evento.data));
      } catch (erro) {
        console.error('Evento SSE inválido', erro);
      }
    });
  });
  fonte.addEventListener('open', () => emitir(EVENTOS_APP.SSE_CONECTADO));
  fonte.addEventListener('error', () => emitir(EVENTOS_APP.SSE_DESCONECTADO));
  return fonte;
}
