/**
 * Utilitários de DOM seguros: textos sempre via textContent (nunca innerHTML com dados).
 */

const ESPACO_SVG = 'http://www.w3.org/2000/svg';

/**
 * Aplica atributos ignorando valores vazios (true vira atributo booleano).
 * @param {Element} elemento - Elemento alvo.
 * @param {Record<string, unknown>} atributos - Atributos.
 * @returns {void}
 */
function aplicarAtributos(elemento, atributos) {
  Object.entries(atributos || {}).forEach(([nome, valor]) => {
    const ausente = valor === undefined || valor === null || valor === false;
    if (ausente) return;

    elemento.setAttribute(nome, valor === true ? '' : String(valor));
  });
}

/**
 * Cria um elemento HTML.
 * @param {string} tag - Nome da tag.
 * @param {{classe?: string, texto?: string|number, atributos?: object,
 *   filhos?: (Node|string|null|false)[], aoClicar?: Function}} [opcoes]
 * @returns {HTMLElement} Elemento criado.
 */
export function criarElemento(tag, opcoes = {}) {
  const elemento = document.createElement(tag);
  if (opcoes.classe) elemento.className = opcoes.classe;
  if (opcoes.texto !== undefined && opcoes.texto !== null) elemento.textContent = String(opcoes.texto);
  aplicarAtributos(elemento, opcoes.atributos);
  (opcoes.filhos || []).filter((filho) => filho || filho === 0).forEach((filho) => elemento.append(filho));
  if (opcoes.aoClicar) elemento.addEventListener('click', opcoes.aoClicar);
  return elemento;
}

/**
 * Cria um elemento SVG.
 * @param {string} tag - Nome da tag SVG.
 * @param {Record<string, unknown>} [atributos] - Atributos.
 * @param {(Node|null)[]} [filhos] - Filhos.
 * @returns {SVGElement} Elemento SVG.
 */
export function criarSvg(tag, atributos = {}, filhos = []) {
  const elemento = document.createElementNS(ESPACO_SVG, tag);
  aplicarAtributos(elemento, atributos);
  filhos.filter(Boolean).forEach((filho) => elemento.append(filho));
  return elemento;
}

/**
 * Remove todos os filhos de um elemento.
 * @param {Element} elemento - Elemento.
 * @returns {void}
 */
export function limpar(elemento) {
  elemento.replaceChildren();
}

/**
 * Cria um texto com trechos destacados marcados como [[assim]] (usado na busca).
 * @param {string} texto - Texto com marcadores.
 * @returns {DocumentFragment} Fragmento com <mark> nos trechos.
 */
export function criarTextoDestacado(texto) {
  const fragmento = document.createDocumentFragment();
  (texto || '').split(/(\[\[.*?\]\])/g).forEach((parte) => {
    const ehDestaque = parte.startsWith('[[') && parte.endsWith(']]');
    fragmento.append(ehDestaque ? criarElemento('mark', { texto: parte.slice(2, -2) }) : parte);
  });
  return fragmento;
}

/**
 * Cria um atraso (debounce) para uma função.
 * @param {Function} funcao - Função original.
 * @param {number} espera - Espera em ms.
 * @returns {Function} Função com atraso.
 */
export function comAtraso(funcao, espera) {
  let temporizador = null;
  return (...argumentos) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcao(...argumentos), espera);
  };
}
