const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
const LARGURA_VISAO = 1000;
const ALTURA_VISAO = 600;
const QUANTIDADE_NOS = 14;
const VIZINHOS_POR_NO = 2;
const RAIO_NO = 5;
const MARGEM_NOS = 40;

const SEMENTE_FUNDO = 20261029;
const LCG_MULTIPLICADOR = 1664525;
const LCG_INCREMENTO = 1013904223;
const LCG_MODULO = 4294967296;

/**
 * Cria um gerador pseudoaleatorio deterministico (LCG).
 * @param {number} semente - Valor inicial do gerador.
 * @returns {() => number} Funcao que devolve numeros em [0, 1).
 */
function criarGerador(semente) {
  let estado = semente;
  return () => {
    estado = (LCG_MULTIPLICADOR * estado + LCG_INCREMENTO) % LCG_MODULO;
    return estado / LCG_MODULO;
  };
}

/**
 * Gera as posicoes dos nos dentro do viewBox, sempre iguais.
 * @returns {{x: number, y: number}[]} Lista de posicoes.
 */
function gerarPosicoes() {
  const sortear = criarGerador(SEMENTE_FUNDO);
  const largura = LARGURA_VISAO - 2 * MARGEM_NOS;
  const altura = ALTURA_VISAO - 2 * MARGEM_NOS;
  const posicoes = [];
  for (let i = 0; i < QUANTIDADE_NOS; i += 1) {
    posicoes.push({
      x: Math.round(MARGEM_NOS + sortear() * largura),
      y: Math.round(MARGEM_NOS + sortear() * altura),
    });
  }
  return posicoes;
}

/**
 * Calcula a distancia ao quadrado entre dois pontos.
 * @param {{x: number, y: number}} a - Primeiro ponto.
 * @param {{x: number, y: number}} b - Segundo ponto.
 * @returns {number} Distancia ao quadrado.
 */
function distanciaQuadrada(a, b) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

/**
 * Lista os indices dos vizinhos mais proximos de um no.
 * @param {{x: number, y: number}[]} posicoes - Todos os nos.
 * @param {number} indice - Indice do no de origem.
 * @returns {number[]} Indices dos vizinhos mais proximos.
 */
function vizinhosMaisProximos(posicoes, indice) {
  return posicoes
    .map((posicao, outro) => ({ outro, distancia: distanciaQuadrada(posicoes[indice], posicao) }))
    .filter((item) => item.outro !== indice)
    .sort((a, b) => a.distancia - b.distancia || a.outro - b.outro)
    .slice(0, VIZINHOS_POR_NO)
    .map((item) => item.outro);
}

/**
 * Monta a lista de ligacoes sem duplicar pares.
 * @param {{x: number, y: number}[]} posicoes - Todos os nos.
 * @returns {[number, number][]} Pares de indices ligados.
 */
function gerarLigacoes(posicoes) {
  const vistas = new Set();
  const ligacoes = [];
  posicoes.forEach((_, indice) => {
    vizinhosMaisProximos(posicoes, indice).forEach((outro) => {
      const par = [Math.min(indice, outro), Math.max(indice, outro)];
      const chave = par.join("-");
      if (vistas.has(chave)) return;
      vistas.add(chave);
      ligacoes.push(par);
    });
  });
  return ligacoes;
}

/**
 * Cria um elemento SVG com atributos.
 * @param {string} tag - Nome da tag SVG.
 * @param {string} classe - Classe CSS do elemento.
 * @param {Object<string, string|number>} atributos - Atributos extras.
 * @returns {SVGElement} Elemento criado.
 */
function criarElementoSvg(tag, classe, atributos) {
  const elemento = document.createElementNS(NAMESPACE_SVG, tag);
  elemento.setAttribute("class", classe);
  Object.entries(atributos).forEach(([nome, valor]) => elemento.setAttribute(nome, valor));
  return elemento;
}

/**
 * Desenha a rede de nos e ligacoes dentro do elemento de fundo.
 * @param {HTMLElement} elemento - Container `#fundo`.
 * @returns {void}
 */
export function montarFundo(elemento) {
  if (!elemento) return;

  const posicoes = gerarPosicoes();
  const svg = criarElementoSvg("svg", "fundo-rede__svg", {
    viewBox: `0 0 ${LARGURA_VISAO} ${ALTURA_VISAO}`,
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true",
  });

  gerarLigacoes(posicoes).forEach(([origem, destino]) => {
    svg.appendChild(
      criarElementoSvg("line", "fundo-rede__linha", {
        x1: posicoes[origem].x,
        y1: posicoes[origem].y,
        x2: posicoes[destino].x,
        y2: posicoes[destino].y,
      }),
    );
  });
  posicoes.forEach((posicao) => {
    svg.appendChild(
      criarElementoSvg("circle", "fundo-rede__no", { cx: posicao.x, cy: posicao.y, r: RAIO_NO }),
    );
  });

  elemento.replaceChildren(svg);
}
