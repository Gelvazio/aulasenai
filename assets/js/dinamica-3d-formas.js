// Atividade Dinâmica no PC (tarefa #410): desenha as formas da tela em three.js.
// Só geometria e texto; não conhece a aula nem o banco. Depende de three.min.js (THREE).
// Regra: docs/regras/atividade-dinamica.md

const FORMAS_3D = ['retangulo', 'circulo', 'triangulo'];
const ROTULOS_FORMA_3D = { retangulo: 'Retângulo', circulo: 'Círculo', triangulo: 'Triângulo' };
const ESPESSURA_CONTORNO_3D = 3;
const ESCALA_TEXTO_3D = 3;
const TAMANHO_TEXTURA_MAXIMO_3D = 1024;
const TAMANHO_FONTE_MINIMO_3D = 8;
const FRACAO_FONTE_ALTURA_3D = 0.5;
const FRACAO_TEXTO_LARGURA_3D = 0.9;
const LIMIAR_LUMINANCIA_3D = 0.55;
const COR_TEXTO_CLARO_3D = '#ffffff';
const COR_TEXTO_ESCURO_3D = '#1a202c';
const FAMILIA_FONTE_3D = 'sans-serif';
const PROFUNDIDADE_ROTULO_3D = 0.02;

/**
 * Monta o caminho de um retângulo com cantos arredondados, centrado na origem.
 * @param {number} largura - Largura total.
 * @param {number} altura - Altura total.
 * @param {number} raio - Raio dos cantos (0 = canto vivo).
 * @returns {THREE.Shape} Caminho fechado.
 */
function caminhoRetangulo3d(largura, altura, raio) {
    const r = Math.max(0, Math.min(raio, largura / 2, altura / 2));
    const esquerda = -largura / 2;
    const base = -altura / 2;
    const direita = esquerda + largura;
    const topo = base + altura;
    const caminho = new THREE.Shape();
    caminho.moveTo(esquerda + r, base);
    caminho.lineTo(direita - r, base);
    caminho.quadraticCurveTo(direita, base, direita, base + r);
    caminho.lineTo(direita, topo - r);
    caminho.quadraticCurveTo(direita, topo, direita - r, topo);
    caminho.lineTo(esquerda + r, topo);
    caminho.quadraticCurveTo(esquerda, topo, esquerda, topo - r);
    caminho.lineTo(esquerda, base + r);
    caminho.quadraticCurveTo(esquerda, base, esquerda + r, base);
    return caminho;
}

/**
 * Monta o caminho de um círculo (ou elipse), centrado na origem.
 * @param {number} largura - Diâmetro horizontal.
 * @param {number} altura - Diâmetro vertical.
 * @returns {THREE.Shape} Caminho fechado.
 */
function caminhoElipse3d(largura, altura) {
    const caminho = new THREE.Shape();
    caminho.absellipse(0, 0, largura / 2, altura / 2, 0, Math.PI * 2, false, 0);
    return caminho;
}

/**
 * Monta o caminho de um triângulo com a ponta para cima, centrado na origem.
 * @param {number} largura - Largura da base.
 * @param {number} altura - Altura total.
 * @returns {THREE.Shape} Caminho fechado.
 */
function caminhoTriangulo3d(largura, altura) {
    const caminho = new THREE.Shape();
    caminho.moveTo(0, altura / 2);
    caminho.lineTo(largura / 2, -altura / 2);
    caminho.lineTo(-largura / 2, -altura / 2);
    caminho.closePath();
    return caminho;
}

const CONSTRUTORES_CAMINHO_3D = {
    retangulo: (largura, altura, raio) => caminhoRetangulo3d(largura, altura, raio),
    circulo: (largura, altura) => caminhoElipse3d(largura, altura),
    triangulo: (largura, altura) => caminhoTriangulo3d(largura, altura)
};

/**
 * Cria o caminho da forma, encolhido pelo recuo (usado para abrir o miolo do contorno).
 * @param {Object} dados - Elemento (forma, largura, altura, raio).
 * @param {number} recuo - Quanto encolher em cada lado.
 * @returns {THREE.Shape} Caminho da forma.
 */
function criarCaminho3d(dados, recuo) {
    const largura = Math.max(dados.largura - 2 * recuo, 1);
    const altura = Math.max(dados.altura - 2 * recuo, 1);
    return CONSTRUTORES_CAMINHO_3D[dados.forma](largura, altura, Math.max(dados.raio - recuo, 0));
}

/**
 * Cria a geometria da forma: cheia ou só o contorno.
 * @param {Object} dados - Elemento (forma, largura, altura, raio, preenchido).
 * @returns {THREE.ShapeGeometry} Geometria pronta.
 */
function criarGeometriaForma3d(dados) {
    const contorno = criarCaminho3d(dados, 0);
    if (!dados.preenchido) contorno.holes.push(criarCaminho3d(dados, ESPESSURA_CONTORNO_3D));
    return new THREE.ShapeGeometry(contorno);
}

/**
 * Escolhe texto claro ou escuro conforme o brilho da cor de fundo.
 * @param {string} corHex - Cor no formato #rrggbb.
 * @returns {string} Cor do texto.
 */
function corTextoContraste3d(corHex) {
    const cor = new THREE.Color(corHex);
    const luminancia = 0.2126 * cor.r + 0.7152 * cor.g + 0.0722 * cor.b;
    return luminancia > LIMIAR_LUMINANCIA_3D ? COR_TEXTO_ESCURO_3D : COR_TEXTO_CLARO_3D;
}

/**
 * Reduz a fonte até o texto caber na largura útil do quadro.
 * @param {CanvasRenderingContext2D} contexto - Contexto do canvas.
 * @param {string} texto - Texto a medir.
 * @param {Object} limites - { tamanho inicial, larguraUtil }.
 * @returns {number} Tamanho da fonte em pixels.
 */
function ajustarFonte3d(contexto, texto, limites) {
    let tamanho = Math.max(limites.tamanho, TAMANHO_FONTE_MINIMO_3D);
    contexto.font = 'bold ' + tamanho + 'px ' + FAMILIA_FONTE_3D;
    const cabe = () => contexto.measureText(texto).width <= limites.larguraUtil;
    while (tamanho > TAMANHO_FONTE_MINIMO_3D && !cabe()) {
        tamanho -= 1;
        contexto.font = 'bold ' + tamanho + 'px ' + FAMILIA_FONTE_3D;
    }
    return tamanho;
}

/**
 * Cria o plano com o texto do elemento, do mesmo tamanho dele.
 * @param {Object} dados - Elemento (rotulo, largura, altura, cor, preenchido, corTexto).
 * @returns {THREE.Mesh} Plano com a textura do texto.
 */
function criarRotulo3d(dados) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(Math.ceil(dados.largura * ESCALA_TEXTO_3D), TAMANHO_TEXTURA_MAXIMO_3D);
    canvas.height = Math.min(Math.ceil(dados.altura * ESCALA_TEXTO_3D), TAMANHO_TEXTURA_MAXIMO_3D);
    const contexto = canvas.getContext('2d');
    const limites = {
        tamanho: canvas.height * FRACAO_FONTE_ALTURA_3D,
        larguraUtil: canvas.width * FRACAO_TEXTO_LARGURA_3D
    };
    ajustarFonte3d(contexto, dados.rotulo, limites);
    contexto.fillStyle = dados.corTexto
        || (dados.preenchido ? corTextoContraste3d(dados.cor) : COR_TEXTO_ESCURO_3D);
    contexto.textAlign = 'center';
    contexto.textBaseline = 'middle';
    contexto.fillText(dados.rotulo, canvas.width / 2, canvas.height / 2);
    const material = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(canvas), transparent: true, side: THREE.DoubleSide
    });
    const plano = new THREE.Mesh(new THREE.PlaneGeometry(dados.largura, dados.altura), material);
    plano.position.z = PROFUNDIDADE_ROTULO_3D;
    return plano;
}

/**
 * Libera da memória da placa de vídeo tudo o que está dentro do grupo.
 * @param {THREE.Object3D} grupo - Grupo a esvaziar.
 */
function liberarFilhos3d(grupo) {
    while (grupo.children.length > 0) {
        const filho = grupo.children[0];
        grupo.remove(filho);
        if (filho.geometry) filho.geometry.dispose();
        if (filho.material && filho.material.map) filho.material.map.dispose();
        if (filho.material) filho.material.dispose();
    }
}

/**
 * Refaz forma e texto do grupo a partir dos dados guardados nele.
 * @param {THREE.Group} grupo - Grupo criado por criarElemento3d.
 */
function reconstruirElemento3d(grupo) {
    liberarFilhos3d(grupo);
    const dados = grupo.userData.dados;
    grupo.position.set(dados.x, dados.y, grupo.position.z);
    const material = new THREE.MeshBasicMaterial({ color: dados.cor, side: THREE.DoubleSide });
    grupo.add(new THREE.Mesh(criarGeometriaForma3d(dados), material));
    if (dados.rotulo) grupo.add(criarRotulo3d(dados));
}

/**
 * Cria o objeto 3D de um elemento da tela.
 * @param {Object} dados - { forma, x, y, largura, altura, cor, preenchido, raio, rotulo }.
 * @returns {THREE.Group} Grupo com os dados em userData.dados.
 */
function criarElemento3d(dados) {
    const grupo = new THREE.Group();
    grupo.userData.dados = dados;
    reconstruirElemento3d(grupo);
    return grupo;
}
