/**
 * Cena 3D futurista do Mundo SENAI (tarefa #299.4).
 *
 * Desenha dois tipos de cena com Three.js:
 *  - avatar 3D girando de cada aluno ("Aluno NN"), sem foto nem nome real;
 *  - rede de nós 3D atrás do hero da página inicial.
 *
 * O HTML carrega o Three.js do cdnjs em versão fixa, ANTES deste arquivo:
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
 *   <script src="../../../assets/js/cena-3d.js"></script>
 *
 * Contrato do HTML:
 *   <div class="fut-avatar" data-avatar-3d data-cor="#ff2bd6">
 *     <canvas class="fut-avatar__tela"></canvas>
 *   </div>
 *   <canvas class="fut-rede-3d" data-rede-3d></canvas>
 *
 * Plano B: sem WebGL, sem Three.js, com `prefers-reduced-motion` ou com `?3d=0` na URL, o avatar
 * mostra uma silhueta SVG (classe `fut-avatar--sem-3d`) e a rede 3D some, ficando a rede SVG
 * do HTML.
 */
(function () {
  'use strict';

  const SELETOR_AVATAR = '[data-avatar-3d]';
  const SELETOR_REDE = '[data-rede-3d]';
  const SELETOR_TELA_AVATAR = '.fut-avatar__tela';
  const CLASSE_TELA_AVATAR = 'fut-avatar__tela';
  const CLASSE_SEM_3D = 'fut-avatar--sem-3d';
  const CLASSE_SILHUETA = 'fut-avatar__fallback';
  const ATRIBUTO_COR = 'data-cor';
  const PARAMETRO_DESLIGAR = '3d';
  const VALOR_DESLIGADO = '0';
  const NAMESPACE_SVG = 'http://www.w3.org/2000/svg';

  const COR_PADRAO = '#00e5ff';
  const COR_NOS_REDE = '#ff2bd6';
  const COR_LINHAS_REDE = '#00e5ff';
  const OPACIDADE_CORPO = 0.16;
  const OPACIDADE_ARAME = 0.85;
  const OPACIDADE_LINHA = 0.35;
  const TAMANHO_NO = 0.07;

  const LIMITE_PIXEL_RATIO = 2;
  const CAMPO_VISAO = 45;
  const PLANO_PERTO = 0.1;
  const PLANO_LONGE = 100;
  const OPCOES_AVATAR = { distancia: 4.6, velocidade: 0.012 };
  const OPCOES_REDE = { distancia: 6.5, velocidade: 0.0014 };

  const RAIO_CABECA = 0.5;
  const ALTURA_CABECA = 1.05;
  const RAIO_TRONCO_TOPO = 0.42;
  const RAIO_TRONCO_BASE = 0.62;
  const ALTURA_TRONCO = 1.5;
  const ALTURA_TRONCO_CENTRO = -0.05;
  const RAIO_BASE = 0.95;
  const ESPESSURA_BASE = 0.04;
  const ALTURA_BASE = -0.95;
  const SEGMENTOS_TRONCO = 20;

  const QUANTIDADE_NOS = 70;
  const RAIO_REDE = 3.2;
  const DISTANCIA_LIGACAO = 1.5;

  /**
   * Diz se o navegador consegue criar um contexto WebGL.
   * @returns {boolean} true quando há WebGL.
   */
  function suportaWebGL() {
    try {
      const tela = document.createElement('canvas');
      return Boolean(tela.getContext('webgl2') || tela.getContext('webgl'));
    } catch (erro) {
      return false;
    }
  }

  /**
   * Diz se o usuário pediu menos movimento no sistema.
   * @returns {boolean} true quando `prefers-reduced-motion: reduce` está ativo.
   */
  function prefereMenosMovimento() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Diz se a URL desligou o 3D (`?3d=0`), útil em projetor fraco.
   * @returns {boolean} true quando o 3D foi desligado pela URL.
   */
  function desligadoPelaUrl() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get(PARAMETRO_DESLIGAR) === VALOR_DESLIGADO;
  }

  /**
   * Diz se a cena 3D pode ser usada agora.
   * @returns {boolean} true quando Three.js, WebGL e movimento estão liberados.
   */
  function podeUsar3D() {
    if (typeof THREE === 'undefined') return false;
    if (prefereMenosMovimento() || desligadoPelaUrl()) return false;
    return suportaWebGL();
  }

  /**
   * Cria a silhueta SVG mostrada quando o 3D não está disponível.
   * @returns {SVGElement} SVG com cabeça e tronco.
   */
  function criarSilhueta() {
    const svg = document.createElementNS(NAMESPACE_SVG, 'svg');
    svg.setAttribute('class', CLASSE_SILHUETA);
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('aria-hidden', 'true');
    const cabeca = document.createElementNS(NAMESPACE_SVG, 'circle');
    cabeca.setAttribute('cx', '50');
    cabeca.setAttribute('cy', '30');
    cabeca.setAttribute('r', '14');
    const tronco = document.createElementNS(NAMESPACE_SVG, 'path');
    tronco.setAttribute('d', 'M22 92 C22 64 36 52 50 52 C64 52 78 64 78 92 Z');
    [cabeca, tronco].forEach((forma) => {
      forma.setAttribute('fill-opacity', '0.25');
      forma.setAttribute('stroke-width', '2');
      svg.appendChild(forma);
    });
    return svg;
  }

  /**
   * Troca o avatar 3D pela silhueta SVG.
   * @param {HTMLElement} container Elemento `.fut-avatar`.
   * @returns {void}
   */
  function ativarPlanoB(container) {
    container.classList.add(CLASSE_SEM_3D);
    if (!container.querySelector('.' + CLASSE_SILHUETA)) {
      container.appendChild(criarSilhueta());
    }
  }

  /**
   * Cria uma malha (sólida translúcida ou só o arame) para a cor do destaque.
   * @param {object} geometria Geometria do Three.js.
   * @param {string} cor Cor em hexadecimal.
   * @param {boolean} aramado true para desenhar só as arestas.
   * @returns {object} Malha do Three.js.
   */
  function criarMalha(geometria, cor, aramado) {
    const material = new THREE.MeshBasicMaterial({
      color: cor,
      wireframe: aramado,
      transparent: true,
      opacity: aramado ? OPACIDADE_ARAME : OPACIDADE_CORPO,
    });
    return new THREE.Mesh(geometria, material);
  }

  /**
   * Cria uma peça do avatar: corpo translúcido com arame por cima.
   * @param {object} geometria Geometria do Three.js.
   * @param {string} cor Cor em hexadecimal.
   * @param {number} alturaY Posição vertical da peça.
   * @returns {object} Grupo do Three.js.
   */
  function criarPeca(geometria, cor, alturaY) {
    const peca = new THREE.Group();
    peca.add(criarMalha(geometria, cor, false));
    peca.add(criarMalha(geometria, cor, true));
    peca.position.y = alturaY;
    return peca;
  }

  /**
   * Monta o avatar holográfico: cabeça, tronco e anel de base.
   * @param {string} cor Cor de destaque da ideia.
   * @returns {object} Grupo do Three.js com o avatar.
   */
  function criarAvatar(cor) {
    const avatar = new THREE.Group();
    const cabeca = new THREE.SphereGeometry(RAIO_CABECA, 24, 18);
    const tronco = new THREE.CylinderGeometry(
      RAIO_TRONCO_TOPO,
      RAIO_TRONCO_BASE,
      ALTURA_TRONCO,
      SEGMENTOS_TRONCO
    );
    const anel = new THREE.TorusGeometry(RAIO_BASE, ESPESSURA_BASE, 8, 48);
    const base = criarPeca(anel, cor, ALTURA_BASE);
    base.rotation.x = Math.PI / 2;
    avatar.add(criarPeca(cabeca, cor, ALTURA_CABECA));
    avatar.add(criarPeca(tronco, cor, ALTURA_TRONCO_CENTRO));
    avatar.add(base);
    return avatar;
  }

  /**
   * Sorteia um ponto dentro de uma esfera.
   * @param {number} raio Raio da esfera.
   * @returns {object} Vector3 do Three.js.
   */
  function sortearPonto(raio) {
    const ponto = new THREE.Vector3();
    do {
      ponto.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    } while (ponto.lengthSq() > 1);
    return ponto.multiplyScalar(raio);
  }

  /**
   * Liga o nó `indice` aos nós seguintes que estão perto dele.
   * @param {object[]} nos Pontos da rede.
   * @param {number} indice Posição do nó de origem.
   * @param {number[]} posicoes Lista de coordenadas dos segmentos (alterada aqui).
   * @returns {void}
   */
  function ligarNo(nos, indice, posicoes) {
    for (let outro = indice + 1; outro < nos.length; outro += 1) {
      if (nos[indice].distanceTo(nos[outro]) > DISTANCIA_LIGACAO) continue;
      posicoes.push(nos[indice].x, nos[indice].y, nos[indice].z);
      posicoes.push(nos[outro].x, nos[outro].y, nos[outro].z);
    }
  }

  /**
   * Monta a rede de nós 3D: pontos magenta ligados por linhas ciano.
   * @returns {object} Grupo do Three.js com a rede.
   */
  function criarRede() {
    const nos = Array.from({ length: QUANTIDADE_NOS }, () => sortearPonto(RAIO_REDE));
    const posicoes = [];
    nos.forEach((no, indice) => ligarNo(nos, indice, posicoes));
    const geometriaLinhas = new THREE.BufferGeometry();
    geometriaLinhas.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3));
    const linhas = new THREE.LineSegments(
      geometriaLinhas,
      new THREE.LineBasicMaterial({
        color: COR_LINHAS_REDE,
        transparent: true,
        opacity: OPACIDADE_LINHA,
      })
    );
    const pontos = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(nos),
      new THREE.PointsMaterial({ color: COR_NOS_REDE, size: TAMANHO_NO })
    );
    const rede = new THREE.Group();
    rede.add(linhas, pontos);
    return rede;
  }

  /**
   * Cria o estado de uma cena: renderizador, câmera e objeto girando.
   * @param {HTMLCanvasElement} tela Canvas onde a cena é desenhada.
   * @param {object} objeto Objeto do Three.js que gira.
   * @param {{distancia: number, velocidade: number}} opcoes Câmera e giro por quadro.
   * @returns {object} Estado usado pelo laço de animação.
   */
  function criarEstado(tela, objeto, opcoes) {
    const cena = new THREE.Scene();
    cena.add(objeto);
    const camera = new THREE.PerspectiveCamera(CAMPO_VISAO, 1, PLANO_PERTO, PLANO_LONGE);
    camera.position.z = opcoes.distancia;
    const renderizador = new THREE.WebGLRenderer({ canvas: tela, antialias: true, alpha: true });
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio || 1, LIMITE_PIXEL_RATIO));
    return {
      tela,
      cena,
      camera,
      objeto,
      renderizador,
      velocidade: opcoes.velocidade,
      ativo: true,
      quadro: 0,
    };
  }

  /**
   * Ajusta o tamanho do renderizador e da câmera ao tamanho do canvas na página.
   * @param {object} estado Estado da cena.
   * @returns {void}
   */
  function ajustarTamanho(estado) {
    const largura = estado.tela.clientWidth;
    const altura = estado.tela.clientHeight;
    if (!largura || !altura) return;
    estado.renderizador.setSize(largura, altura, false);
    estado.camera.aspect = largura / altura;
    estado.camera.updateProjectionMatrix();
  }

  /**
   * Gira o objeto e desenha um quadro; repete enquanto a cena estiver ativa.
   * @param {object} estado Estado da cena.
   * @returns {void}
   */
  function animar(estado) {
    if (!estado.ativo) {
      estado.quadro = 0;
      return;
    }
    estado.objeto.rotation.y += estado.velocidade;
    estado.renderizador.render(estado.cena, estado.camera);
    estado.quadro = window.requestAnimationFrame(() => animar(estado));
  }

  /**
   * Liga ou pausa a animação (pausa quando a cena sai da tela ou a aba fica oculta).
   * @param {object} estado Estado da cena.
   * @param {boolean} ativo true para animar.
   * @returns {void}
   */
  function definirAtivo(estado, ativo) {
    estado.ativo = ativo;
    if (ativo && !estado.quadro) animar(estado);
  }

  /**
   * Pausa fora da tela, ajusta ao redimensionar e libera a memória ao sair da página.
   * @param {object} estado Estado da cena.
   * @returns {void}
   */
  function acompanharPagina(estado) {
    const visivel = { tela: true, aba: true };
    const atualizar = () => definirAtivo(estado, visivel.tela && visivel.aba);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entradas) => {
        visivel.tela = entradas[0].isIntersecting;
        atualizar();
      }).observe(estado.tela);
    }
    document.addEventListener('visibilitychange', () => {
      visivel.aba = !document.hidden;
      atualizar();
    });
    window.addEventListener('resize', () => ajustarTamanho(estado));
    window.addEventListener('pagehide', () => {
      estado.ativo = false;
      estado.renderizador.dispose();
    });
  }

  /**
   * Põe uma cena para rodar no canvas.
   * @param {HTMLCanvasElement} tela Canvas da cena.
   * @param {object} objeto Objeto do Three.js que gira.
   * @param {{distancia: number, velocidade: number}} opcoes Câmera e velocidade.
   * @returns {void}
   */
  function iniciarCena(tela, objeto, opcoes) {
    const estado = criarEstado(tela, objeto, opcoes);
    ajustarTamanho(estado);
    acompanharPagina(estado);
    animar(estado);
  }

  /**
   * Garante que o container do avatar tenha o canvas da cena.
   * @param {HTMLElement} container Elemento `.fut-avatar`.
   * @returns {HTMLCanvasElement} Canvas do avatar.
   */
  function obterTelaAvatar(container) {
    let tela = container.querySelector(SELETOR_TELA_AVATAR);
    if (!tela) {
      tela = document.createElement('canvas');
      tela.className = CLASSE_TELA_AVATAR;
      container.prepend(tela);
    }
    return tela;
  }

  /**
   * Inicia o avatar 3D de um container; em qualquer falha mostra a silhueta SVG.
   * @param {HTMLElement} container Elemento `.fut-avatar`.
   * @returns {void}
   */
  function iniciarAvatar(container) {
    if (!podeUsar3D()) {
      ativarPlanoB(container);
      return;
    }
    try {
      const cor = container.getAttribute(ATRIBUTO_COR) || COR_PADRAO;
      iniciarCena(obterTelaAvatar(container), criarAvatar(cor), OPCOES_AVATAR);
    } catch (erro) {
      ativarPlanoB(container);
    }
  }

  /**
   * Inicia a rede de nós 3D; sem 3D, esconde o canvas e fica a rede SVG do HTML.
   * @param {HTMLCanvasElement} tela Canvas `[data-rede-3d]`.
   * @returns {void}
   */
  function iniciarRede(tela) {
    if (!podeUsar3D()) {
      tela.hidden = true;
      return;
    }
    try {
      iniciarCena(tela, criarRede(), OPCOES_REDE);
    } catch (erro) {
      tela.hidden = true;
    }
  }

  /**
   * Procura os avatares e as redes da página e inicia cada um.
   * @returns {void}
   */
  function iniciarTudo() {
    document.querySelectorAll(SELETOR_AVATAR).forEach((container) => iniciarAvatar(container));
    document.querySelectorAll(SELETOR_REDE).forEach((tela) => iniciarRede(tela));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarTudo);
  } else {
    iniciarTudo();
  }

  window.CenaFuturista = { iniciarAvatar, iniciarRede };
})();
