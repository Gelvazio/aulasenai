// Atividade Dinâmica no PC (tarefa #410): cena three.js com a "tela" do celular vista de frente.
// Câmera ortográfica, desenho sob demanda (só quando algo muda) e conversão do ponteiro em
// coordenadas da tela. Não conhece a aula nem o banco. Depende de three.min.js (THREE).
// Regra: docs/regras/atividade-dinamica.md

const LARGURA_TELA_3D = 360;
const ALTURA_TELA_3D = 640;
const MARGEM_CENA_3D = 20;
const LARGURA_VISAO_3D = LARGURA_TELA_3D + 2 * MARGEM_CENA_3D;
const ALTURA_VISAO_3D = ALTURA_TELA_3D + 2 * MARGEM_CENA_3D;
const LARGURA_MINIMA_CANVAS_3D = 220;
const LARGURA_MAXIMA_CANVAS_3D = 480;
const DENSIDADE_MAXIMA_3D = 2;
const COR_FUNDO_CENA_3D = 0xdfe5ec;
const COR_TELA_3D = 0xffffff;
const COR_BORDA_TELA_3D = 0x2d3748;
const BORDA_TELA_3D = 4;
const PROFUNDIDADE_CAMADAS_3D = { original: 0.1, redesenho: 0.1, marcas: 5, selecao: 6, previa: 7 };
const PROFUNDIDADE_PROFUNDA_3D = 100;
const MSG_THREE_AUSENTE_3D =
    'Não foi possível carregar o three.js. Confira a internet e recarregue.';
const MSG_SEM_WEBGL_3D = 'Este navegador não conseguiu abrir o 3D (WebGL). Tente outro navegador.';

/**
 * Cria o renderizador WebGL; falha com mensagem clara se o navegador não suportar.
 * @returns {THREE.WebGLRenderer} Renderizador pronto.
 * @throws {Error} Se o three.js não carregou ou o WebGL não está disponível.
 */
function criarRenderizador3d() {
    if (typeof THREE === 'undefined') throw new Error(MSG_THREE_AUSENTE_3D);
    try {
        const renderizador = new THREE.WebGLRenderer({ antialias: true });
        renderizador.setPixelRatio(Math.min(window.devicePixelRatio || 1, DENSIDADE_MAXIMA_3D));
        renderizador.setClearColor(COR_FUNDO_CENA_3D);
        return renderizador;
    } catch (erro) {
        throw new Error(MSG_SEM_WEBGL_3D);
    }
}

/**
 * Cria a câmera ortográfica que enquadra a tela inteira mais a margem.
 * @returns {THREE.OrthographicCamera} Câmera olhando para a tela.
 */
function criarCamera3d() {
    const camera = new THREE.OrthographicCamera(
        -LARGURA_VISAO_3D / 2, LARGURA_VISAO_3D / 2,
        ALTURA_VISAO_3D / 2, -ALTURA_VISAO_3D / 2,
        -PROFUNDIDADE_PROFUNDA_3D, PROFUNDIDADE_PROFUNDA_3D);
    camera.position.z = 1;
    return camera;
}

/**
 * Cria o fundo: moldura escura e o papel branco da tela do celular.
 * @returns {THREE.Group} Grupo com os dois planos.
 */
function criarFundoTela3d() {
    const fundo = new THREE.Group();
    const moldura = new THREE.Mesh(
        new THREE.PlaneGeometry(LARGURA_TELA_3D + BORDA_TELA_3D, ALTURA_TELA_3D + BORDA_TELA_3D),
        new THREE.MeshBasicMaterial({ color: COR_BORDA_TELA_3D }));
    const papel = new THREE.Mesh(
        new THREE.PlaneGeometry(LARGURA_TELA_3D, ALTURA_TELA_3D),
        new THREE.MeshBasicMaterial({ color: COR_TELA_3D }));
    moldura.position.z = -2;
    papel.position.z = -1;
    fundo.add(moldura, papel);
    return fundo;
}

/**
 * Cria um grupo vazio por camada, cada um na sua profundidade.
 * @param {THREE.Scene} cena - Cena que recebe as camadas.
 * @returns {Object} Mapa nome da camada para o grupo.
 */
function criarCamadas3d(cena) {
    const camadas = {};
    Object.entries(PROFUNDIDADE_CAMADAS_3D).forEach(([nome, profundidade]) => {
        camadas[nome] = new THREE.Group();
        camadas[nome].position.z = profundidade;
        cena.add(camadas[nome]);
    });
    return camadas;
}

/**
 * Ajusta o tamanho do canvas à largura do contêiner, mantendo a proporção da tela.
 * @param {Object} base - { renderizador, container }.
 * @returns {void}
 */
function ajustarTamanhoCena3d(base) {
    const disponivel = base.container.clientWidth || LARGURA_MAXIMA_CANVAS_3D;
    const largura = Math.min(
        Math.max(disponivel, LARGURA_MINIMA_CANVAS_3D), LARGURA_MAXIMA_CANVAS_3D);
    const altura = Math.round(largura * ALTURA_VISAO_3D / LARGURA_VISAO_3D);
    base.renderizador.setSize(largura, altura, false);
}

/**
 * Cria a cena completa dentro do contêiner.
 * @param {HTMLElement} container - Elemento que recebe o canvas.
 * @returns {Object} { canvas, camadas, solicitarQuadro, converterPonteiro, destruir }.
 * @throws {Error} Se o three.js ou o WebGL não estiverem disponíveis.
 */
function criarCenaDinamica3d(container) {
    const renderizador = criarRenderizador3d();
    const cena = new THREE.Scene();
    const camera = criarCamera3d();
    cena.add(criarFundoTela3d());
    const camadas = criarCamadas3d(cena);
    const canvas = renderizador.domElement;
    canvas.classList.add('dinamica3d__canvas');
    container.append(canvas);

    let quadroPendente = 0;
    const desenhar = () => { quadroPendente = 0; renderizador.render(cena, camera); };
    const solicitarQuadro = () => {
        if (!quadroPendente) quadroPendente = requestAnimationFrame(desenhar);
    };
    const reajustar = () => {
        ajustarTamanhoCena3d({ renderizador, container });
        solicitarQuadro();
    };
    const observador = new ResizeObserver(reajustar);
    observador.observe(container);
    reajustar();

    const converterPonteiro = (evento) => {
        const caixa = canvas.getBoundingClientRect();
        return {
            x: ((evento.clientX - caixa.left) / caixa.width - 0.5) * LARGURA_VISAO_3D,
            y: (0.5 - (evento.clientY - caixa.top) / caixa.height) * ALTURA_VISAO_3D
        };
    };
    const destruir = () => {
        observador.disconnect();
        cancelAnimationFrame(quadroPendente);
        renderizador.dispose();
        canvas.remove();
    };
    return { canvas, camadas, solicitarQuadro, converterPonteiro, destruir };
}
