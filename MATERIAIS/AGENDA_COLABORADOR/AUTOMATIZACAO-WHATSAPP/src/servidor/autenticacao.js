/**
 * Autenticação do dashboard: token do .env trocado por cookie HttpOnly (sessão local).
 */
import { createHash, timingSafeEqual } from 'node:crypto';
import { SERVIDOR } from '../config/constantes.js';

/**
 * Gera o hash SHA-256 de um texto (comparações em tempo constante com tamanho fixo).
 * @param {string} texto - Texto de entrada.
 * @returns {Buffer} Hash.
 */
function gerarHash(texto) {
  return createHash('sha256').update(String(texto)).digest();
}

/**
 * Lê o valor de um cookie do cabeçalho.
 * @param {string|undefined} cabecalho - Cabeçalho Cookie.
 * @param {string} nome - Nome do cookie.
 * @returns {string} Valor (vazio se ausente).
 */
function lerCookie(cabecalho, nome) {
  const par = (cabecalho || '')
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${nome}=`));
  return par ? decodeURIComponent(par.slice(nome.length + 1)) : '';
}

export class Autenticador {
  /**
   * @param {{token: string}} configuracao - Token esperado (DASHBOARD_TOKEN).
   */
  constructor(configuracao) {
    this.hashToken = gerarHash(configuracao.token);
    this.tentativas = new Map();
  }

  /**
   * Compara um token informado com o esperado em tempo constante.
   * @param {string} tokenInformado - Token recebido.
   * @returns {boolean} true se for igual.
   */
  tokenValido(tokenInformado) {
    if (!tokenInformado) return false;

    return timingSafeEqual(gerarHash(tokenInformado), this.hashToken);
  }

  /**
   * Verifica se a requisição está autenticada (cookie ou cabeçalho Bearer).
   * @param {import('node:http').IncomingMessage} requisicao - Requisição.
   * @returns {boolean} true se autorizada.
   */
  estaAutorizado(requisicao) {
    const cabecalho = requisicao.headers.authorization || '';
    const tokenBearer = cabecalho.startsWith('Bearer ') ? cabecalho.slice(7) : '';
    const tokenCookie = lerCookie(requisicao.headers.cookie, SERVIDOR.COOKIE_TOKEN);
    return this.tokenValido(tokenBearer) || this.tokenValido(tokenCookie);
  }

  /**
   * Indica se o IP excedeu o limite de tentativas falhas na janela de tempo.
   * @param {string} ip - Endereço do cliente.
   * @returns {boolean} true se bloqueado.
   */
  estaBloqueado(ip) {
    const registro = this.tentativas.get(ip);
    if (!registro) return false;

    const janelaExpirou = Date.now() - registro.inicio > SERVIDOR.JANELA_TENTATIVAS_MS;
    if (janelaExpirou) {
      this.tentativas.delete(ip);
      return false;
    }
    return registro.falhas >= SERVIDOR.MAX_TENTATIVAS_TOKEN;
  }

  /**
   * Registra uma tentativa falha de login para o IP.
   * @param {string} ip - Endereço do cliente.
   * @returns {void}
   */
  registrarFalha(ip) {
    const registro = this.tentativas.get(ip) || { inicio: Date.now(), falhas: 0 };
    registro.falhas += 1;
    this.tentativas.set(ip, registro);
  }

  /**
   * Monta o cabeçalho Set-Cookie da sessão (ou de remoção).
   * @param {string} token - Token a gravar (vazio para remover).
   * @returns {string} Valor do Set-Cookie.
   */
  montarCookie(token) {
    const idade = token ? 60 * 60 * 24 * 30 : 0;
    return (
      `${SERVIDOR.COOKIE_TOKEN}=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; ` +
      `Path=/; Max-Age=${idade}`
    );
  }
}
