/**
 * Avisos flutuantes (toasts).
 */
import { criarElemento } from '../dom.js';
import { TEMPOS } from '../constantes.js';

/**
 * Mostra um aviso temporário no canto da tela.
 * @param {string} mensagem - Texto.
 * @param {string} [tipo] - sucesso | erro | info | atencao | urgente.
 * @returns {void}
 */
export function mostrarAviso(mensagem, tipo = 'sucesso') {
  const container = document.getElementById('avisos');
  if (!container) return;

  const elemento = criarElemento('div', {
    classe: `aviso-flutuante aviso-flutuante--${tipo}`,
    texto: mensagem,
    atributos: { role: tipo === 'erro' ? 'alert' : 'status' },
  });
  container.append(elemento);
  setTimeout(() => elemento.remove(), TEMPOS.AVISO_MS);
}

/**
 * Mostra o erro de uma operação como aviso.
 * @param {Error} erro - Erro capturado.
 * @returns {void}
 */
export function mostrarErro(erro) {
  mostrarAviso(erro?.message || String(erro), 'erro');
}
