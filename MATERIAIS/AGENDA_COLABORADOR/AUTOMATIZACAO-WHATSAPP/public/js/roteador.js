/**
 * Roteamento por hash (#/rota). Cada página é um módulo { titulo, montar(container, parametros) }
 * e `montar` pode devolver uma função de limpeza (remove ouvintes ao sair da página).
 */
import { limpar } from './dom.js';
import { NOME_APLICACAO } from './constantes.js';

/**
 * Converte um padrão "/grupos/:jid" em expressão regular.
 * @param {string} padrao - Padrão da rota.
 * @returns {RegExp} Expressão regular.
 */
function compilar(padrao) {
  const corpo = padrao.replace(/:(\w+)/g, '(?<$1>[^/]+)');
  return new RegExp(`^${corpo}$`);
}

export class Roteador {
  /**
   * @param {{container: HTMLElement, rotas: {padrao: string, pagina: object}[],
   *   paginaPadrao: object}} configuracao
   */
  constructor(configuracao) {
    this.container = configuracao.container;
    this.rotas = configuracao.rotas.map((rota) => ({ ...rota, expressao: compilar(rota.padrao) }));
    this.paginaPadrao = configuracao.paginaPadrao;
    this.limpeza = null;
  }

  /**
   * Começa a ouvir mudanças de hash e renderiza a rota atual.
   * @returns {void}
   */
  iniciar() {
    window.addEventListener('hashchange', () => this.navegar());
    this.navegar();
  }

  /**
   * Retorna o caminho atual (sem o #).
   * @returns {string} Caminho.
   */
  caminhoAtual() {
    return window.location.hash.replace(/^#/, '') || '/';
  }

  /**
   * Encontra a página da rota e seus parâmetros.
   * @param {string} caminho - Caminho atual.
   * @returns {{pagina: object, parametros: Record<string, string>}} Página encontrada.
   */
  resolver(caminho) {
    for (const rota of this.rotas) {
      const resultado = rota.expressao.exec(caminho);
      if (!resultado) continue;

      const parametros = Object.fromEntries(
        Object.entries(resultado.groups || {}).map(([nome, valor]) => [nome, decodeURIComponent(valor)])
      );
      return { pagina: rota.pagina, parametros, padrao: rota.padrao };
    }
    return { pagina: this.paginaPadrao, parametros: {}, padrao: '/' };
  }

  /**
   * Desmonta a página atual e monta a nova.
   * @returns {void}
   */
  navegar() {
    if (typeof this.limpeza === 'function') this.limpeza();
    limpar(this.container);
    const { pagina, parametros, padrao } = this.resolver(this.caminhoAtual());
    this.marcarMenu(padrao);
    document.title = `${pagina.titulo} · ${NOME_APLICACAO}`;
    this.limpeza = pagina.montar(this.container, parametros);
    this.container.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  /**
   * Destaca o item do menu correspondente à rota.
   * @param {string} padrao - Padrão da rota ativa.
   * @returns {void}
   */
  marcarMenu(padrao) {
    const raiz = `/${padrao.split('/')[1] || ''}`;
    document.querySelectorAll('[data-rota]').forEach((link) => {
      const ativo = link.dataset.rota === raiz;
      if (ativo) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
}
