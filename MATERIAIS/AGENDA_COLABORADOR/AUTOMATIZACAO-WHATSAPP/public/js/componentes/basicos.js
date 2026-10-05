/**
 * Componentes básicos: cartão, selo, botão, cabeçalho de página e estados (vazio/carregando/aviso).
 */
import { criarElemento } from '../dom.js';
import { TEXTOS } from '../constantes.js';

/**
 * Cria um cartão com título opcional.
 * @param {{titulo?: string, acoes?: Node[], filhos?: Node[], classe?: string}} opcoes
 * @returns {HTMLElement} Elemento <section class="cartao">.
 */
export function cartao(opcoes) {
  const cabecalho = opcoes.titulo
    ? criarElemento('div', {
        classe: 'cartao__cabecalho',
        filhos: [
          criarElemento('h2', { classe: 'cartao__titulo', texto: opcoes.titulo }),
          opcoes.acoes ? criarElemento('div', { classe: 'linha-acoes', filhos: opcoes.acoes }) : null,
        ],
      })
    : null;
  return criarElemento('section', {
    classe: `cartao ${opcoes.classe || ''}`.trim(),
    filhos: [cabecalho, ...(opcoes.filhos || [])],
  });
}

/**
 * Cria um selo (badge).
 * @param {string} texto - Texto.
 * @param {string} [variante] - info | atencao | urgente | sucesso | primario | neutro.
 * @returns {HTMLElement} Selo.
 */
export function selo(texto, variante = 'neutro') {
  return criarElemento('span', { classe: `selo selo--${variante}`, texto });
}

/**
 * Cria um botão.
 * @param {{texto: string, variante?: string, aoClicar?: Function, tipo?: string,
 *   rotulo?: string, pequeno?: boolean}} opcoes
 * @returns {HTMLButtonElement} Botão.
 */
export function botao(opcoes) {
  const classes = ['botao'];
  if (opcoes.variante) classes.push(`botao--${opcoes.variante}`);
  if (opcoes.pequeno) classes.push('botao--pequeno');
  return criarElemento('button', {
    classe: classes.join(' '),
    texto: opcoes.texto,
    atributos: { type: opcoes.tipo || 'button', 'aria-label': opcoes.rotulo },
    aoClicar: opcoes.aoClicar,
  });
}

/**
 * Executa uma ação assíncrona desabilitando o botão enquanto roda.
 * @param {HTMLButtonElement} elemento - Botão.
 * @param {() => Promise<unknown>} acao - Ação.
 * @returns {Promise<void>}
 */
export async function comBotaoOcupado(elemento, acao) {
  elemento.disabled = true;
  try {
    await acao();
  } finally {
    elemento.disabled = false;
  }
}

/**
 * Cria o cabeçalho de uma página.
 * @param {{titulo: string, subtitulo?: string, acoes?: Node[]}} opcoes
 * @returns {HTMLElement} Cabeçalho.
 */
export function cabecalhoPagina(opcoes) {
  return criarElemento('header', {
    classe: 'cabecalho-pagina',
    filhos: [
      criarElemento('div', {
        classe: 'cabecalho-pagina__titulos',
        filhos: [
          criarElemento('h1', { texto: opcoes.titulo }),
          opcoes.subtitulo ? criarElemento('p', { classe: 'texto-suave', texto: opcoes.subtitulo }) : null,
        ],
      }),
      opcoes.acoes ? criarElemento('div', { classe: 'linha-acoes', filhos: opcoes.acoes }) : null,
    ],
  });
}

/**
 * Bloco de "nada encontrado".
 * @param {string} [texto] - Mensagem.
 * @returns {HTMLElement} Elemento.
 */
export function vazio(texto = TEXTOS.SEM_DADOS) {
  return criarElemento('p', { classe: 'vazio', texto });
}

/**
 * Indicador de carregamento.
 * @returns {HTMLElement} Elemento.
 */
export function carregando() {
  return criarElemento('p', { classe: 'carregando', texto: TEXTOS.CARREGANDO, atributos: { role: 'status' } });
}

/**
 * Faixa de aviso.
 * @param {string} texto - Mensagem.
 * @param {string} [variante] - '' (info) ou 'atencao'.
 * @returns {HTMLElement} Elemento.
 */
export function aviso(texto, variante = '') {
  return criarElemento('p', { classe: `aviso ${variante ? `aviso--${variante}` : ''}`.trim(), texto });
}
