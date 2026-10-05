/**
 * Cliente HTTP do backend — única porta de acesso à API.
 */
import { API, EVENTOS_APP, TEXTOS } from './constantes.js';

/** Erro de chamada à API, com status HTTP. */
export class ErroApi extends Error {
  /**
   * @param {string} mensagem - Mensagem do servidor.
   * @param {number} status - Status HTTP (0 = rede).
   */
  constructor(mensagem, status) {
    super(mensagem);
    this.name = 'ErroApi';
    this.status = status;
  }
}

/**
 * Monta a query string ignorando valores vazios.
 * @param {Record<string, unknown>} parametros - Parâmetros.
 * @returns {string} "?a=1&b=2" ou "".
 */
function montarConsulta(parametros = {}) {
  const busca = new URLSearchParams();
  Object.entries(parametros).forEach(([nome, valor]) => {
    if (valor !== undefined && valor !== null && valor !== '') busca.set(nome, String(valor));
  });
  const texto = busca.toString();
  return texto ? `?${texto}` : '';
}

/**
 * Executa uma requisição JSON.
 * @param {string} metodo - Método HTTP.
 * @param {string} caminho - Caminho após /api.
 * @param {object} [corpo] - Corpo JSON.
 * @returns {Promise<any>} Dados da resposta.
 * @throws {ErroApi} Em erro HTTP ou de rede.
 */
async function requisitar(metodo, caminho, corpo) {
  const opcoes = { method: metodo, headers: {}, credentials: 'same-origin' };
  if (corpo !== undefined) {
    opcoes.headers['Content-Type'] = 'application/json';
    opcoes.body = JSON.stringify(corpo);
  }

  let resposta;
  try {
    resposta = await fetch(`${API.BASE}${caminho}`, opcoes);
  } catch {
    throw new ErroApi(TEXTOS.ERRO_REDE, 0);
  }
  const dados = await resposta.json().catch(() => null);
  if (resposta.status === 401) window.dispatchEvent(new CustomEvent(EVENTOS_APP.NAO_AUTORIZADO));
  if (!resposta.ok) throw new ErroApi(dados?.erro || TEXTOS.ERRO_GENERICO, resposta.status);
  return dados;
}

const jid = (valor) => encodeURIComponent(valor);

export const api = Object.freeze({
  entrar: (token) => requisitar('POST', '/sessao', { token }),
  sair: () => requisitar('DELETE', '/sessao'),
  sistema: () => requisitar('GET', '/sistema'),
  visaoGeral: () => requisitar('GET', '/visao-geral'),
  conexao: () => requisitar('GET', '/conexao'),
  desconectar: () => requisitar('POST', '/conexao/desconectar'),
  grupos: () => requisitar('GET', '/grupos'),
  grupo: (grupoJid) => requisitar('GET', `/grupos/${jid(grupoJid)}`),
  alterarMonitoramento: (grupoJid, monitorado) =>
    requisitar('PATCH', `/grupos/${jid(grupoJid)}`, { monitorado }),
  mensagens: (grupoJid, antesDe) =>
    requisitar('GET', `/grupos/${jid(grupoJid)}/mensagens${montarConsulta({ antesDe })}`),
  estatisticas: (grupoJid, dias) =>
    requisitar('GET', `/grupos/${jid(grupoJid)}/estatisticas${montarConsulta({ dias })}`),
  buscar: (termo, grupo) => requisitar('GET', `/busca${montarConsulta({ termo, grupo })}`),
  resumos: (filtro) => requisitar('GET', `/resumos${montarConsulta(filtro)}`),
  gerarResumo: (pedido) => requisitar('POST', '/resumos', pedido),
  alertas: (filtro) => requisitar('GET', `/alertas${montarConsulta(filtro)}`),
  alterarAlerta: (id, situacao) => requisitar('PATCH', `/alertas/${id}`, { situacao }),
  marcarAlertasLidos: () => requisitar('POST', '/alertas/marcar-lidos'),
  regras: () => requisitar('GET', '/regras'),
  tiposRegra: () => requisitar('GET', '/regras/tipos'),
  criarRegra: (regra) => requisitar('POST', '/regras', regra),
  atualizarRegra: (id, regra) => requisitar('PUT', `/regras/${id}`, regra),
  removerRegra: (id) => requisitar('DELETE', `/regras/${id}`),
  configuracoes: () => requisitar('GET', '/configuracoes'),
  salvarConfiguracoes: (dados) => requisitar('PUT', '/configuracoes', dados),
  usoIa: (dias) => requisitar('GET', `/uso-ia${montarConsulta({ dias })}`),
});
