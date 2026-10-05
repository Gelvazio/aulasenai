/**
 * Serve os arquivos do dashboard (pasta public/) com proteção contra "path traversal".
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { CAMINHOS, SERVIDOR, TIPOS_MIME } from '../config/constantes.js';

/**
 * Resolve o caminho pedido dentro de public/, ou null se tentar sair da pasta.
 * @param {string} caminhoUrl - Caminho da URL (ex.: /css/base.css).
 * @returns {string|null} Caminho absoluto seguro.
 */
function resolverCaminhoSeguro(caminhoUrl) {
  const relativo = caminhoUrl === '/' ? SERVIDOR.ARQUIVO_INICIAL : decodeURIComponent(caminhoUrl);
  const absoluto = path.resolve(CAMINHOS.PUBLICO, `.${path.sep}${relativo}`);
  const dentroDePublico = absoluto.startsWith(CAMINHOS.PUBLICO + path.sep);
  return dentroDePublico ? absoluto : null;
}

/**
 * Envia um arquivo estático (404 se não existir ou estiver fora de public/).
 * @param {import('node:http').ServerResponse} resposta - Resposta HTTP.
 * @param {string} caminhoUrl - Caminho pedido.
 * @returns {Promise<void>}
 */
export async function servirArquivoEstatico(resposta, caminhoUrl) {
  const caminho = resolverCaminhoSeguro(caminhoUrl);
  const tipo = caminho ? TIPOS_MIME[path.extname(caminho).toLowerCase()] : undefined;
  if (!caminho || !tipo) {
    resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
    return;
  }

  try {
    const conteudo = await readFile(caminho);
    resposta.writeHead(200, { 'Content-Type': tipo, 'Cache-Control': 'no-cache' }).end(conteudo);
  } catch {
    resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
  }
}
