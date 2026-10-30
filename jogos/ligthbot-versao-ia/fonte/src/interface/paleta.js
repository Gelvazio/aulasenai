// Paleta de comandos e áreas do programa (somente DOM; dados e ações vêm por parâmetro).
import {
  AREAS,
  COMANDOS_CHAMADA,
  ROTULOS_AREAS,
  ROTULOS_COMANDOS,
  SIMBOLOS_COMANDOS,
} from "../constantes.js";

const CLASSE_COMANDO = "comando";
const CLASSE_COMANDO_CHAMADA = "comando--chamada";
const CLASSE_AREA = "area-comandos";
const CLASSE_AREA_ATIVA = "area-comandos--ativa";
const CLASSE_AREA_BLOQUEADA = "area-comandos--bloqueada";
const CLASSE_SLOT = "slot";
const CLASSE_SLOT_VAZIO = "slot--vazio";
const CLASSE_SLOT_PREENCHIDO = "slot--preenchido";
const CLASSE_SLOT_ATUAL = "slot--atual";
const PREFIXO_ID_AREA = "area-";

/**
 * Cria um elemento com classe e texto opcionais.
 * @param {string} etiqueta - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto (via textContent).
 * @returns {HTMLElement} Elemento criado.
 */
function criarElemento(etiqueta, classe, texto) {
  const novo = document.createElement(etiqueta);
  novo.className = classe;
  if (texto !== undefined) novo.textContent = texto;
  return novo;
}

/**
 * Cria o botão de um comando da paleta.
 * @param {string} token - Token do comando.
 * @param {(token: string) => void} aoEscolher - Callback do clique.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoComando(token, aoEscolher) {
  const botao = criarElemento("button", CLASSE_COMANDO);
  botao.type = "button";
  botao.dataset.comando = token;
  botao.setAttribute("aria-label", ROTULOS_COMANDOS[token]);
  if (COMANDOS_CHAMADA.includes(token)) botao.classList.add(CLASSE_COMANDO_CHAMADA);
  botao.append(
    criarElemento("span", "comando__simbolo", SIMBOLOS_COMANDOS[token]),
    criarElemento("span", "comando__rotulo", ROTULOS_COMANDOS[token]),
  );
  botao.addEventListener("click", () => aoEscolher(token));
  return botao;
}

/**
 * Reconstrói a paleta com um botão por comando liberado.
 * @param {HTMLElement} elemento - Container da paleta.
 * @param {{comandosLiberados: string[], aoEscolher: (token: string) => void}} opcoes
 * @returns {void}
 */
export function montarPaleta(elemento, { comandosLiberados, aoEscolher }) {
  const botoes = comandosLiberados.map((token) => criarBotaoComando(token, aoEscolher));
  elemento.replaceChildren(...botoes);
}

/**
 * Cria um slot da área, vazio ou com botão de remoção.
 * @param {{area: string, indice: number, token: string|null}} dados - Dados do slot.
 * @param {(area: string, indice: number) => void} aoRemover - Callback de remoção.
 * @returns {HTMLLIElement} Item do slot.
 */
function criarSlot({ area, indice, token }, aoRemover) {
  const item = criarElemento("li", CLASSE_SLOT);
  if (!token) {
    item.classList.add(CLASSE_SLOT_VAZIO);
    return item;
  }
  item.classList.add(CLASSE_SLOT_PREENCHIDO);
  const botao = criarElemento("button", "slot__botao", SIMBOLOS_COMANDOS[token]);
  botao.type = "button";
  botao.dataset.area = area;
  botao.dataset.indice = String(indice);
  botao.setAttribute("aria-label", `Remover ${ROTULOS_COMANDOS[token]} (${ROTULOS_AREAS[area]})`);
  botao.addEventListener("click", (evento) => {
    evento.stopPropagation();
    aoRemover(area, indice);
  });
  item.append(botao);
  return item;
}

/**
 * Cria a lista de slots de uma área.
 * @param {{area: string, itens: Array<string|null>, limite: number}} dados
 * @param {(area: string, indice: number) => void} aoRemover - Callback de remoção.
 * @returns {HTMLOListElement} Lista de slots.
 */
function criarListaSlots({ area, itens, limite }, aoRemover) {
  const lista = criarElemento("ol", "slots");
  for (let indice = 0; indice < limite; indice += 1) {
    const token = itens[indice] ?? null;
    lista.append(criarSlot({ area, indice, token }, aoRemover));
  }
  return lista;
}

/**
 * Cria o título da área com a contagem usados/limite.
 * @param {string} area - Id da área.
 * @param {number} usados - Slots preenchidos.
 * @param {number} limite - Limite da área.
 * @returns {HTMLHeadingElement} Título.
 */
function criarTitulo(area, usados, limite) {
  return criarElemento("h3", "area-comandos__titulo", `${ROTULOS_AREAS[area]} ${usados}/${limite}`);
}

/**
 * Cria uma seção de área do programa.
 * @param {string} area - Id da área.
 * @param {object} contexto - Programa, limites, área ativa e callbacks.
 * @returns {HTMLElement} Seção pronta.
 */
function criarArea(area, contexto) {
  const { programa, limites, areaAtiva, aoRemover, aoAtivarArea } = contexto;
  const itens = programa[area] ?? [];
  const limite = limites[area] ?? 0;
  const usados = itens.filter(Boolean).length;
  const secao = criarElemento("section", CLASSE_AREA);
  secao.id = `${PREFIXO_ID_AREA}${area}`;
  secao.dataset.area = area;
  secao.append(criarTitulo(area, usados, limite));
  if (limite === 0) {
    secao.classList.add(CLASSE_AREA_BLOQUEADA);
    return secao;
  }
  if (area === areaAtiva) secao.classList.add(CLASSE_AREA_ATIVA);
  secao.append(criarListaSlots({ area, itens, limite }, aoRemover));
  secao.addEventListener("click", () => aoAtivarArea(area));
  return secao;
}

/**
 * Reconstrói as três áreas do programa.
 * @param {HTMLElement} elemento - Container `#areas-programa`.
 * @param {{programa: object, limites: object, areaAtiva: string,
 *   aoRemover: (area: string, indice: number) => void,
 *   aoAtivarArea: (area: string) => void}} contexto
 * @returns {void}
 */
export function montarAreas(elemento, contexto) {
  elemento.replaceChildren(...AREAS.map((area) => criarArea(area, contexto)));
}

/**
 * Marca o slot em execução; índice negativo limpa a marcação.
 * @param {HTMLElement} elemento - Container das áreas.
 * @param {string} area - Id da área do slot.
 * @param {number} indice - Posição do slot (negativo limpa).
 * @returns {void}
 */
export function destacarSlot(elemento, area, indice) {
  elemento
    .querySelectorAll(`.${CLASSE_SLOT_ATUAL}`)
    .forEach((slot) => slot.classList.remove(CLASSE_SLOT_ATUAL));
  if (indice < 0) return;
  const secao = elemento.querySelector(`.${CLASSE_AREA}[data-area="${area}"]`);
  const slot = secao?.querySelectorAll(`.${CLASSE_SLOT}`)[indice];
  slot?.classList.add(CLASSE_SLOT_ATUAL);
}
