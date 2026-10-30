// Robô do mapa: figura SVG simples posicionada sobre o topo do bloco da célula.
import {
  COMANDO_ACENDER,
  COMANDO_ANDAR,
  COMANDO_DIREITA,
  COMANDO_ESQUERDA,
  COMANDO_PULAR,
} from "../constantes.js";
import { obterAltura } from "../nucleo/mundo.js";
import { projetarCelula } from "./mapa.js";

const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
const SELETOR_CAMADA = "g.mapa__camada-robo";
const SELETOR_ROBO = "g.robo";
const CLASSE_ROBO = "robo";
const CLASSE_FALHA = "robo--falha";
const DURACAO_ANIMACAO_MS = 300;
const CONSULTA_MOVIMENTO_REDUZIDO = "(prefers-reduced-motion: reduce)";

const CLASSE_POR_COMANDO = Object.freeze({
  [COMANDO_ANDAR]: "robo--andando",
  [COMANDO_PULAR]: "robo--pulando",
  [COMANDO_ESQUERDA]: "robo--girando",
  [COMANDO_DIREITA]: "robo--girando",
  [COMANDO_ACENDER]: "robo--acendendo",
});

const CLASSES_ESTADO = Object.freeze([...new Set(Object.values(CLASSE_POR_COMANDO))]);

// Partes do robô, desenhadas a partir da base (0,0) para cima: pés, pernas, braços, corpo e cabeça.
const PARTES = Object.freeze([
  {
    tag: "rect",
    classe: "robo__perna robo__perna--esquerda",
    atributos: { x: -7, y: -10, width: 4, height: 10, rx: 1 },
  },
  {
    tag: "rect",
    classe: "robo__perna robo__perna--direita",
    atributos: { x: 3, y: -10, width: 4, height: 10, rx: 1 },
  },
  {
    tag: "rect",
    classe: "robo__pe robo__pe--esquerdo",
    atributos: { x: -9, y: -3, width: 7, height: 3, rx: 1.5 },
  },
  {
    tag: "rect",
    classe: "robo__pe robo__pe--direito",
    atributos: { x: 2, y: -3, width: 7, height: 3, rx: 1.5 },
  },
  {
    tag: "rect",
    classe: "robo__braco robo__braco--esquerdo",
    atributos: { x: -14, y: -24, width: 4, height: 12, rx: 2 },
  },
  {
    tag: "rect",
    classe: "robo__braco robo__braco--direito",
    atributos: { x: 10, y: -24, width: 4, height: 12, rx: 2 },
  },
  {
    tag: "rect",
    classe: "robo__corpo",
    atributos: { x: -9, y: -25, width: 18, height: 16, rx: 3 },
  },
  { tag: "line", classe: "robo__antena", atributos: { x1: 0, y1: -35, x2: 0, y2: -42 } },
  { tag: "circle", classe: "robo__antena", atributos: { cx: 0, cy: -44, r: 2 } },
  {
    tag: "rect",
    classe: "robo__cabeca",
    atributos: { x: -8, y: -36, width: 16, height: 11, rx: 3 },
  },
  { tag: "circle", classe: "robo__olho", atributos: { cx: -3.5, cy: -30.5, r: 1.8 } },
  { tag: "circle", classe: "robo__olho", atributos: { cx: 3.5, cy: -30.5, r: 1.8 } },
]);

/**
 * Cria um elemento SVG com classe e atributos.
 * @param {{tag: string, classe: string, atributos: object}} parte - Descrição da parte.
 * @returns {SVGElement} Elemento criado.
 */
function criarParte({ tag, classe, atributos }) {
  const elemento = document.createElementNS(NAMESPACE_SVG, tag);
  elemento.setAttribute("class", classe);
  Object.entries(atributos).forEach(([nome, valor]) => elemento.setAttribute(nome, valor));
  return elemento;
}

/**
 * Cria o grupo do robô com todas as partes.
 * @returns {SVGGElement} Grupo `g.robo` novo.
 */
function criarGrupoRobo() {
  const grupo = document.createElementNS(NAMESPACE_SVG, "g");
  grupo.setAttribute("class", CLASSE_ROBO);
  PARTES.forEach((parte) => grupo.appendChild(criarParte(parte)));
  return grupo;
}

/**
 * Move o grupo para a nova posição; se já estava em outra, desliza entre as duas.
 * A animação usa a Web Animations API (sem `style` inline); o atributo guarda o destino.
 * @param {SVGGElement} grupo - Grupo `g.robo`.
 * @param {{x: number, y: number}} destino - Nova posição no SVG.
 * @returns {void}
 */
function deslizarAte(grupo, destino) {
  const anterior = grupo.dataset.posicao;
  const atual = `${destino.x},${destino.y}`;
  grupo.dataset.posicao = atual;
  grupo.setAttribute("transform", `translate(${destino.x} ${destino.y})`);
  if (!anterior || anterior === atual || prefereMovimentoReduzido()) return;

  const [antesX, antesY] = anterior.split(",");
  grupo.animate(
    [
      { transform: `translate(${antesX}px, ${antesY}px)` },
      { transform: `translate(${destino.x}px, ${destino.y}px)` },
    ],
    { duration: DURACAO_ANIMACAO_MS, easing: "ease-in-out" },
  );
}

/**
 * Cria ou atualiza o robô na camada do mapa, na célula e orientação atuais.
 * @param {Element} elemento - Contêiner do mapa (com `g.mapa__camada-robo`).
 * @param {{x: number, y: number, orientacao: number}} robo - Estado do robô.
 * @param {{alturas: number[][]}} mundo - Mundo atual.
 * @returns {void}
 */
export function desenharRobo(elemento, robo, mundo) {
  const camada = elemento.querySelector(SELETOR_CAMADA);
  if (!camada) return;

  let grupo = camada.querySelector(SELETOR_ROBO);
  if (!grupo) {
    grupo = criarGrupoRobo();
    camada.appendChild(grupo);
  }

  const altura = obterAltura(mundo, robo.x, robo.y);
  const posicao = projetarCelula(robo.x, robo.y, altura);
  deslizarAte(grupo, posicao);
  grupo.setAttribute("data-orientacao", String(robo.orientacao));
}

/**
 * Informa se o usuário pediu menos movimento.
 * @returns {boolean} true se deve pular as animações.
 */
function prefereMovimentoReduzido() {
  const consulta = window.matchMedia?.(CONSULTA_MOVIMENTO_REDUZIDO);
  return Boolean(consulta?.matches);
}

/**
 * Aguarda um intervalo em milissegundos.
 * @param {number} duracao - Tempo de espera.
 * @returns {Promise<void>} Resolve ao fim do intervalo.
 */
function esperar(duracao) {
  return new Promise((resolver) => setTimeout(resolver, duracao));
}

/**
 * Anima a ação do robô aplicando uma classe de estado por um instante.
 * @param {Element} elemento - Contêiner do mapa.
 * @param {string} comando - Token do comando executado.
 * @param {boolean} efetiva - false se a ação não teve efeito (falha).
 * @returns {Promise<void>} Resolve quando a animação termina.
 */
export async function animarAcao(elemento, comando, efetiva) {
  const grupo = elemento.querySelector(SELETOR_ROBO);
  if (!grupo || prefereMovimentoReduzido()) return;

  const classes = [CLASSE_POR_COMANDO[comando]];
  if (efetiva === false) classes.push(CLASSE_FALHA);
  const aplicaveis = classes.filter(Boolean);
  if (aplicaveis.length === 0) return;

  grupo.classList.remove(...CLASSES_ESTADO, CLASSE_FALHA);
  grupo.classList.add(...aplicaveis);
  await esperar(DURACAO_ANIMACAO_MS);
  grupo.classList.remove(...aplicaveis);
}
