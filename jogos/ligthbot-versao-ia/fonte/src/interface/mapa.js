// Mapa isométrico em SVG: blocos, abismos, lâmpadas-objetivo e camada do robô.
import { ALTURA_DEGRAU, ALTURA_LOSANGO, LARGURA_BLOCO, MARGEM_MAPA } from "../constantes.js";
import { luzAcesa, obterAltura, temObjetivo } from "../nucleo/mundo.js";

const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
const ALTURA_ABISMO = 0;
const META_LARGURA = LARGURA_BLOCO / 2;
const META_ALTURA = ALTURA_LOSANGO / 2;
const RAIO_BASE_LAMPADA = 10;
const RAIO_ACHATAMENTO_LAMPADA = 5;
const RAIO_BULBO_LAMPADA = 7;
const ELEVACAO_BULBO_LAMPADA = 12;
const ROTULO_MAPA = "Mapa do jogo";
const CLASSE_LAMPADA_ACESA = "mapa__lampada--acesa";

/**
 * Cria um elemento SVG com atributos.
 * @param {string} nome - Nome da tag SVG.
 * @param {Object<string, string|number>} [atributos] - Atributos a aplicar.
 * @returns {SVGElement} Elemento criado.
 */
function criarElementoSvg(nome, atributos = {}) {
  const elemento = document.createElementNS(NAMESPACE_SVG, nome);
  for (const [chave, valor] of Object.entries(atributos)) {
    elemento.setAttribute(chave, String(valor));
  }
  return elemento;
}

/**
 * Projeta uma célula para o centro do topo do bloco em coordenadas do SVG.
 * A origem (0,0) fica no centro do topo de uma célula de altura 0 em (0,0).
 * @param {number} x - Coluna.
 * @param {number} y - Linha.
 * @param {number} altura - Altura do bloco.
 * @returns {{x: number, y: number}} Ponto no SVG.
 */
export function projetarCelula(x, y, altura) {
  return {
    x: (x - y) * META_LARGURA,
    y: (x + y) * META_ALTURA - altura * ALTURA_DEGRAU,
  };
}

/**
 * Calcula a altura máxima do mundo.
 * @param {{alturas: number[][]}} mundo - Mundo atual.
 * @returns {number} Maior altura encontrada.
 */
function calcularAlturaMaxima(mundo) {
  return Math.max(ALTURA_ABISMO, ...mundo.alturas.map((linha) => Math.max(...linha)));
}

/**
 * Calcula o viewBox que contém todo o mapa com margem.
 * @param {{colunas: number, linhas: number, alturas: number[][]}} mundo - Mundo atual.
 * @returns {string} Valor do atributo viewBox.
 */
function calcularViewBox(mundo) {
  const alturaMaxima = calcularAlturaMaxima(mundo);
  const minimoX = -(mundo.linhas - 1) * META_LARGURA - META_LARGURA - MARGEM_MAPA;
  const maximoX = (mundo.colunas - 1) * META_LARGURA + META_LARGURA + MARGEM_MAPA;
  const minimoY = -alturaMaxima * ALTURA_DEGRAU - META_ALTURA - MARGEM_MAPA;
  const maximoY = (mundo.colunas + mundo.linhas - 2) * META_ALTURA + META_ALTURA + MARGEM_MAPA;
  return `${minimoX} ${minimoY} ${maximoX - minimoX} ${maximoY - minimoY}`;
}

/**
 * Converte pontos em texto para o atributo points.
 * @param {Array<[number, number]>} pontos - Vértices do polígono.
 * @returns {string} Texto "x,y x,y ...".
 */
function formatarPontos(pontos) {
  return pontos.map(([x, y]) => `${x},${y}`).join(" ");
}

/**
 * Cria os três polígonos (topo e dois lados) de um bloco.
 * @param {{x: number, y: number}} centro - Centro do topo.
 * @param {number} altura - Altura do bloco.
 * @returns {SVGElement[]} Topo, lado esquerdo e lado direito.
 */
function criarFacesDoBloco(centro, altura) {
  const { x, y } = centro;
  const queda = altura * ALTURA_DEGRAU;
  const esquerda = [x - META_LARGURA, y];
  const direita = [x + META_LARGURA, y];
  const embaixo = [x, y + META_ALTURA];
  const abaixoDe = ([px, py]) => [px, py + queda];
  const topo = [[x, y - META_ALTURA], direita, embaixo, esquerda];
  const ladoEsquerdo = [esquerda, embaixo, abaixoDe(embaixo), abaixoDe(esquerda)];
  const ladoDireito = [embaixo, direita, abaixoDe(direita), abaixoDe(embaixo)];
  const criar = (classe, pontos) =>
    criarElementoSvg("polygon", {
      class: classe,
      points: formatarPontos(pontos),
      "data-altura": altura,
    });
  return [
    criar("mapa__topo", topo),
    criar("mapa__lado-esquerdo", ladoEsquerdo),
    criar("mapa__lado-direito", ladoDireito),
  ];
}

/**
 * Cria a lâmpada-objetivo desenhada sobre o topo do bloco.
 * @param {{x: number, y: number}} centro - Centro do topo.
 * @param {{x: number, y: number, acesa: boolean}} dados - Célula e estado.
 * @returns {SVGElement} Grupo da lâmpada.
 */
function criarLampada(centro, dados) {
  const classe = dados.acesa ? `mapa__lampada ${CLASSE_LAMPADA_ACESA}` : "mapa__lampada";
  const grupo = criarElementoSvg("g", {
    class: classe,
    "data-x": dados.x,
    "data-y": dados.y,
  });
  grupo.append(
    criarElementoSvg("ellipse", {
      class: "mapa__lampada-base",
      cx: centro.x,
      cy: centro.y,
      rx: RAIO_BASE_LAMPADA,
      ry: RAIO_ACHATAMENTO_LAMPADA,
    }),
    criarElementoSvg("circle", {
      class: "mapa__lampada-bulbo",
      cx: centro.x,
      cy: centro.y - ELEVACAO_BULBO_LAMPADA,
      r: RAIO_BULBO_LAMPADA,
    }),
  );
  return grupo;
}

/**
 * Cria o grupo de uma célula com altura maior que zero.
 * @param {object} mundo - Mundo atual.
 * @param {{x: number, y: number, altura: number}} celula - Célula a desenhar.
 * @returns {SVGElement} Grupo do bloco.
 */
function criarBloco(mundo, celula) {
  const { x, y, altura } = celula;
  const centro = projetarCelula(x, y, altura);
  const bloco = criarElementoSvg("g", { class: "mapa__bloco", "data-x": x, "data-y": y });
  bloco.append(...criarFacesDoBloco(centro, altura));
  if (temObjetivo(mundo, x, y)) {
    bloco.append(criarLampada(centro, { x, y, acesa: luzAcesa(mundo, x, y) }));
  }
  return bloco;
}

/**
 * Lista as células com bloco, ordenadas de trás para frente (x+y crescente).
 * @param {{colunas: number, linhas: number}} mundo - Mundo atual.
 * @returns {Array<{x: number, y: number, altura: number}>} Células com bloco.
 */
function listarCelulasOrdenadas(mundo) {
  const celulas = [];
  for (let y = 0; y < mundo.linhas; y += 1) {
    for (let x = 0; x < mundo.colunas; x += 1) {
      const altura = obterAltura(mundo, x, y);
      if (altura > ALTURA_ABISMO) celulas.push({ x, y, altura });
    }
  }
  return celulas.sort((a, b) => a.x + a.y - (b.x + b.y));
}

/**
 * Recria o SVG do mapa dentro do elemento, com a camada vazia do robô ao final.
 * @param {HTMLElement} elemento - Contêiner do mapa.
 * @param {object} mundo - Mundo atual.
 * @returns {void}
 */
export function desenharMapa(elemento, mundo) {
  const svg = criarElementoSvg("svg", {
    class: "mapa__svg",
    viewBox: calcularViewBox(mundo),
    role: "img",
    "aria-label": ROTULO_MAPA,
  });
  for (const celula of listarCelulasOrdenadas(mundo)) {
    svg.append(criarBloco(mundo, celula));
  }
  svg.append(criarElementoSvg("g", { class: "mapa__camada-robo" }));
  elemento.replaceChildren(svg);
}

/**
 * Atualiza só o estado aceso/apagado das lâmpadas já desenhadas.
 * @param {HTMLElement} elemento - Contêiner do mapa.
 * @param {object} mundo - Mundo atual.
 * @returns {void}
 */
export function atualizarLuzes(elemento, mundo) {
  for (const lampada of elemento.querySelectorAll(".mapa__lampada")) {
    const x = Number(lampada.dataset.x);
    const y = Number(lampada.dataset.y);
    lampada.classList.toggle(CLASSE_LAMPADA_ACESA, luzAcesa(mundo, x, y));
  }
}
