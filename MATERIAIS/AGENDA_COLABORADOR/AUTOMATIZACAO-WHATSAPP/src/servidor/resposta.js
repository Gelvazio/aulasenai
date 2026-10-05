/**
 * Utilitários de requisição/resposta HTTP (JSON).
 */
import { MENSAGENS_ERRO, SERVIDOR } from '../config/constantes.js';
import { ErroAplicacao } from '../utilitarios/erros.js';

/**
 * Envia uma resposta JSON.
 * @param {import('node:http').ServerResponse} resposta - Resposta HTTP.
 * @param {number} status - Status HTTP.
 * @param {unknown} dados - Corpo serializável.
 * @returns {void}
 */
export function enviarJson(resposta, status, dados) {
  const corpo = JSON.stringify(dados ?? null);
  resposta.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  resposta.end(corpo);
}

/**
 * Converte um erro em resposta JSON `{ erro }` (erros inesperados viram 500 genérico).
 * @param {import('node:http').ServerResponse} resposta - Resposta HTTP.
 * @param {Error} erro - Erro capturado.
 * @param {import('pino').Logger} logger - Logger para erros inesperados.
 * @returns {void}
 */
export function enviarErro(resposta, erro, logger) {
  if (resposta.headersSent) return;

  if (erro instanceof ErroAplicacao) {
    enviarJson(resposta, erro.status, { erro: erro.message });
    return;
  }
  logger.error({ erro: erro.message, pilha: erro.stack }, 'Erro inesperado na requisição');
  enviarJson(resposta, 500, { erro: MENSAGENS_ERRO.ERRO_INTERNO });
}

/**
 * Lê e interpreta o corpo JSON da requisição, com limite de tamanho.
 * @param {import('node:http').IncomingMessage} requisicao - Requisição HTTP.
 * @returns {Promise<object>} Objeto do corpo (vazio se não houver corpo).
 * @throws {ErroAplicacao} Se o corpo for grande demais ou não for JSON válido.
 */
export async function lerCorpoJson(requisicao) {
  const partes = [];
  let tamanho = 0;
  for await (const parte of requisicao) {
    tamanho += parte.length;
    if (tamanho > SERVIDOR.LIMITE_CORPO_BYTES)
      throw new ErroAplicacao(MENSAGENS_ERRO.CORPO_GRANDE, 413);
    partes.push(parte);
  }
  if (partes.length === 0) return {};

  try {
    const dados = JSON.parse(Buffer.concat(partes).toString('utf8'));
    const ehObjeto = dados !== null && typeof dados === 'object' && !Array.isArray(dados);
    if (!ehObjeto) throw new Error('não é objeto');
    return dados;
  } catch {
    throw new ErroAplicacao(MENSAGENS_ERRO.CORPO_INVALIDO, 400);
  }
}
