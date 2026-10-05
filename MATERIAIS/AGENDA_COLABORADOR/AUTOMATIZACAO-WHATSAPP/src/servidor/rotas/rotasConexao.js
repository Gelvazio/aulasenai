/**
 * Rotas da conexão com o WhatsApp.
 */
import QRCode from 'qrcode';

/**
 * Registra as rotas de conexão.
 * @param {import('../roteador.js').Roteador} roteador - Roteador.
 * @param {{cliente: import('../../whatsapp/clienteWhatsapp.js').ClienteWhatsapp}} dependencias
 * @returns {void}
 */
export function registrarRotasConexao(roteador, dependencias) {
  const { cliente } = dependencias;

  roteador.registrar('GET', '/conexao', async () => {
    const situacao = cliente.obterSituacao();
    const qrImagem = situacao.qr
      ? await QRCode.toDataURL(situacao.qr, { margin: 1, width: 280 })
      : null;
    return { ...situacao, qr: undefined, qrImagem };
  });

  roteador.registrar('POST', '/conexao/desconectar', async () => {
    await cliente.desconectarEApagarSessao();
    return { ok: true };
  });
}
