/**
 * Servidor HTTP nativo: API JSON em /api, eventos SSE em /api/eventos e arquivos de public/.
 */
import http from 'node:http';
import { CABECALHOS_SEGURANCA, MENSAGENS_ERRO, SERVIDOR } from '../config/constantes.js';
import { enviarErro, enviarJson, lerCorpoJson } from './resposta.js';
import { servirArquivoEstatico } from './arquivosEstaticos.js';

const METODOS_COM_CORPO = new Set(['POST', 'PUT', 'PATCH']);
const ROTA_SESSAO = '/sessao';
const ROTA_EVENTOS = '/eventos';

/**
 * Trata login/logout do dashboard (troca o token por cookie).
 * @param {{requisicao: object, resposta: object, autenticador: object}} contexto
 * @returns {Promise<void>}
 */
async function tratarSessao(contexto) {
  const { requisicao, resposta, autenticador } = contexto;
  const ip = requisicao.socket.remoteAddress || '';
  if (requisicao.method === 'DELETE') {
    resposta.setHeader('Set-Cookie', autenticador.montarCookie(''));
    enviarJson(resposta, 200, { ok: true });
    return;
  }
  if (autenticador.estaBloqueado(ip)) {
    enviarJson(resposta, 429, { erro: MENSAGENS_ERRO.MUITAS_TENTATIVAS });
    return;
  }

  const { token } = await lerCorpoJson(requisicao);
  if (!autenticador.tokenValido(token)) {
    autenticador.registrarFalha(ip);
    enviarJson(resposta, 401, { erro: MENSAGENS_ERRO.NAO_AUTORIZADO });
    return;
  }
  resposta.setHeader('Set-Cookie', autenticador.montarCookie(token));
  enviarJson(resposta, 200, { ok: true });
}

/**
 * Trata uma requisição para /api (exceto sessão).
 * @param {{requisicao: object, resposta: object, url: URL, caminho: string,
 *   dependencias: object}} contexto
 * @returns {Promise<void>}
 */
async function tratarApi(contexto) {
  const { requisicao, resposta, url, caminho, dependencias } = contexto;
  if (!dependencias.autenticador.estaAutorizado(requisicao)) {
    enviarJson(resposta, 401, { erro: MENSAGENS_ERRO.NAO_AUTORIZADO });
    return;
  }
  if (caminho === ROTA_EVENTOS) {
    dependencias.canalSse.adicionar(requisicao, resposta);
    return;
  }

  const rota = dependencias.roteador.resolver(requisicao.method, caminho);
  if (!rota) {
    enviarJson(resposta, 404, { erro: MENSAGENS_ERRO.NAO_ENCONTRADO });
    return;
  }
  const corpo = METODOS_COM_CORPO.has(requisicao.method) ? await lerCorpoJson(requisicao) : {};
  const consulta = Object.fromEntries(url.searchParams);
  const dados = await rota.handler({ parametros: rota.parametros, consulta, corpo });
  enviarJson(resposta, 200, dados);
}

/**
 * Direciona a requisição: sessão, API ou arquivo estático.
 * @param {object} requisicao - Requisição HTTP.
 * @param {object} resposta - Resposta HTTP.
 * @param {object} dependencias - Roteador, autenticador, canalSse e logger.
 * @returns {Promise<void>}
 */
async function tratarRequisicao(requisicao, resposta, dependencias) {
  Object.entries(CABECALHOS_SEGURANCA).forEach(([nome, valor]) => resposta.setHeader(nome, valor));
  const url = new URL(requisicao.url, 'http://localhost');
  const ehApi = url.pathname.startsWith(`${SERVIDOR.PREFIXO_API}/`);
  if (!ehApi) {
    await servirArquivoEstatico(resposta, url.pathname);
    return;
  }

  const caminho = url.pathname.slice(SERVIDOR.PREFIXO_API.length);
  if (caminho === ROTA_SESSAO) {
    await tratarSessao({ requisicao, resposta, autenticador: dependencias.autenticador });
    return;
  }
  await tratarApi({ requisicao, resposta, url, caminho, dependencias });
}

/**
 * Cria o servidor HTTP.
 * @param {{roteador: import('./roteador.js').Roteador,
 *   autenticador: import('./autenticacao.js').Autenticador,
 *   canalSse: import('./eventosSse.js').CanalSse, logger: import('pino').Logger}} dependencias
 * @returns {http.Server} Servidor (ainda não escutando).
 */
export function criarServidorHttp(dependencias) {
  const logger = dependencias.logger.child({ modulo: 'servidor' });
  return http.createServer((requisicao, resposta) => {
    tratarRequisicao(requisicao, resposta, dependencias).catch((erro) => {
      enviarErro(resposta, erro, logger);
    });
  });
}
