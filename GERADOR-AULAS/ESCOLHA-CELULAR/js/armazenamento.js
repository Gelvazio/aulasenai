/**
 * Guarda as escolhas do usuário no navegador (conveniência; falha silenciosa).
 */

/**
 * Lê o estado salvo ou devolve o estado inicial.
 * @returns {object} Estado (config, selecionados, categorias, faixaAtiva, ordenacao).
 */
function lerEstadoSalvo() {
  const estadoInicial = {
    config: { ...CONFIG_PADRAO },
    selecionados: [],
    categorias: Object.keys(CATEGORIAS),
    faixaAtiva: null,
    ordenacao: null,
  };
  try {
    const texto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!texto) return estadoInicial;
    const salvo = JSON.parse(texto);
    return {
      config: { ...CONFIG_PADRAO, ...salvo.config },
      selecionados: Array.isArray(salvo.selecionados) ? salvo.selecionados : [],
      categorias: Array.isArray(salvo.categorias) ? salvo.categorias : estadoInicial.categorias,
      faixaAtiva: salvo.faixaAtiva || null,
      ordenacao: salvo.ordenacao || null,
    };
  } catch (erro) {
    return estadoInicial;
  }
}

/**
 * Salva o estado no navegador, ignorando falhas (modo privado, bloqueio).
 * @param {object} estado - Estado atual do dashboard.
 * @returns {void}
 */
function salvarEstado(estado) {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(estado));
  } catch (erro) {
    // Sem armazenamento o dashboard continua funcionando, só não lembra as escolhas.
  }
}
