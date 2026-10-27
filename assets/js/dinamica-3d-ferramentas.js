// Atividade Dinâmica no PC (tarefa #410): ferramentas do aluno sobre a cena three.js.
// Raio-x: arrastar para marcar retângulo, círculo ou triângulo. Redesenho: selecionar, mover,
// redimensionar, mudar cor/preenchimento/cantos, adicionar e remover. Funciona com mouse, toque
// e botões (o painel chama a mesma API). Depende de dinamica-3d-formas/estado/cena.js.
// Regra: docs/regras/atividade-dinamica.md

const MODOS_3D = ['ver', 'marcar', 'editar'];
const CORES_MARCA_3D = { retangulo: '#2b6cb0', circulo: '#2f855a', triangulo: '#dd6b20' };
const COR_SELECAO_3D = '#e53e3e';
const COR_NOVO_ELEMENTO_3D = '#2b6cb0';
const FOLGA_SELECAO_3D = 8;
const TAMANHO_MINIMO_MARCA_3D = 12;
const PASSO_TECLA_3D = 4;
const LARGURA_NOVO_3D = 120;
const ALTURA_NOVO_3D = 48;
const DIAMETRO_NOVO_3D = 64;
const DEGRAU_PROFUNDIDADE_3D = 0.1;

/**
 * Remove e libera todos os elementos de uma camada.
 * @param {THREE.Group} camada - Camada a esvaziar.
 */
function limparCamada3d(camada) {
    camada.children.slice().forEach((grupo) => {
        liberarFilhos3d(grupo);
        camada.remove(grupo);
    });
}

/**
 * Redesenha uma camada a partir de uma lista de elementos.
 * @param {THREE.Group} camada - Camada a refazer.
 * @param {Object[]} lista - Elementos na ordem de empilhamento.
 * @param {Function} [visual] - Converte cada item no que será desenhado.
 */
function sincronizarCamada3d(camada, lista, visual) {
    limparCamada3d(camada);
    lista.forEach((item, indice) => {
        const grupo = criarElemento3d(visual ? visual(item) : item);
        grupo.position.z = DEGRAU_PROFUNDIDADE_3D * indice;
        camada.add(grupo);
    });
}

/**
 * Converte uma marca no elemento desenhado: só contorno, na cor da forma.
 * @param {Object} marca - Marca do raio-x.
 * @returns {Object} Elemento para criarElemento3d.
 */
function visualMarca3d(marca) {
    return { ...marca, cor: CORES_MARCA_3D[marca.forma], preenchido: false, raio: 0, rotulo: '' };
}

/**
 * Cria o contorno vermelho que destaca o elemento selecionado.
 * @param {Object} item - Elemento selecionado.
 * @returns {Object} Elemento de destaque.
 */
function visualSelecao3d(item) {
    return {
        forma: 'retangulo', x: item.x, y: item.y, raio: 0, rotulo: '', preenchido: false,
        largura: item.largura + FOLGA_SELECAO_3D, altura: item.altura + FOLGA_SELECAO_3D,
        cor: COR_SELECAO_3D
    };
}

/**
 * Devolve o elemento selecionado do redesenho.
 * @param {Object} ctx - Contexto das ferramentas.
 * @returns {Object|null} Elemento, ou null se não houver seleção.
 */
function obterSelecionado3d(ctx) {
    return ctx.estado.redesenho.find((item) => item.id === ctx.selecionadoId) || null;
}

/**
 * Atualiza só o contorno de seleção (barato, usado enquanto arrasta).
 * @param {Object} ctx - Contexto das ferramentas.
 */
function atualizarSelecao3d(ctx) {
    const item = obterSelecionado3d(ctx);
    sincronizarCamada3d(ctx.cena.camadas.selecao, item ? [item] : [], visualSelecao3d);
    ctx.cena.solicitarQuadro();
}

/**
 * Redesenha todas as camadas e avisa quem acompanha o estado.
 * @param {Object} ctx - Contexto das ferramentas.
 */
function atualizarTudo3d(ctx) {
    const { camadas } = ctx.cena;
    sincronizarCamada3d(camadas.original, ctx.original);
    sincronizarCamada3d(camadas.redesenho, ctx.estado.redesenho);
    sincronizarCamada3d(camadas.marcas, ctx.estado.marcas, visualMarca3d);
    atualizarSelecao3d(ctx);
    ctx.aoMudar(ctx.estado);
}

/**
 * Testa se o ponto está dentro da caixa do elemento.
 * @param {Object} item - Elemento.
 * @param {{x: number, y: number}} ponto - Ponto na tela.
 * @returns {boolean} true se o ponto estiver dentro.
 */
function contemPonto3d(item, ponto) {
    const dentroX = Math.abs(ponto.x - item.x) <= item.largura / 2;
    const dentroY = Math.abs(ponto.y - item.y) <= item.altura / 2;
    return dentroX && dentroY;
}

/**
 * Acha o elemento mais acima sob o ponto.
 * @param {Object[]} lista - Elementos do redesenho.
 * @param {{x: number, y: number}} ponto - Ponto na tela.
 * @returns {Object|null} Elemento, ou null se o ponto estiver vazio.
 */
function buscarNoPonto3d(lista, ponto) {
    for (let i = lista.length - 1; i >= 0; i -= 1) {
        if (contemPonto3d(lista[i], ponto)) return lista[i];
    }
    return null;
}

/**
 * Calcula centro e tamanho da caixa definida por dois cantos.
 * @param {{x: number, y: number}} a - Primeiro canto.
 * @param {{x: number, y: number}} b - Canto oposto.
 * @returns {Object} { x, y, largura, altura }.
 */
function caixaEntre3d(a, b) {
    return {
        x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
        largura: Math.abs(a.x - b.x), altura: Math.abs(a.y - b.y)
    };
}

/**
 * Mostra a prévia da marca enquanto o aluno arrasta.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {Object} arrasto - Arrasto em andamento (início e ponto atual).
 */
function mostrarPrevia3d(ctx, arrasto) {
    const caixa = caixaEntre3d(arrasto.inicio, arrasto.atual);
    const previa = { ...caixa, id: 0, forma: ctx.forma };
    sincronizarCamada3d(ctx.cena.camadas.previa, [previa], visualMarca3d);
    ctx.cena.solicitarQuadro();
}

/**
 * Confirma a marca ao soltar o ponteiro, se for grande o bastante.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {Object} arrasto - Arrasto em andamento.
 */
function concluirMarca3d(ctx, arrasto) {
    limparCamada3d(ctx.cena.camadas.previa);
    const caixa = caixaEntre3d(arrasto.inicio, arrasto.atual);
    const minimo = TAMANHO_MINIMO_MARCA_3D;
    const grande = caixa.largura >= minimo && caixa.altura >= minimo;
    if (!grande) return ctx.cena.solicitarQuadro();
    const id = proximoId3d(ctx.estado.marcas);
    const marca = sanearElemento3d({ ...caixa, forma: ctx.forma, id }, 0);
    if (marca) ctx.estado.marcas.push(marca);
    atualizarTudo3d(ctx);
}

/**
 * Move o elemento arrastado, mantendo o centro dentro da tela.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {Object} arrasto - { id, compensacao } do arrasto de mover.
 * @param {{x: number, y: number}} ponto - Posição atual do ponteiro.
 */
function moverArrastado3d(ctx, arrasto, ponto) {
    const item = obterSelecionado3d(ctx);
    if (!item) return;
    const limiteX = LARGURA_TELA_3D / 2;
    const limiteY = ALTURA_TELA_3D / 2;
    item.x = Math.max(-limiteX, Math.min(limiteX, ponto.x - arrasto.compensacao.x));
    item.y = Math.max(-limiteY, Math.min(limiteY, ponto.y - arrasto.compensacao.y));
    const grupo = ctx.cena.camadas.redesenho.children[ctx.estado.redesenho.indexOf(item)];
    if (grupo) grupo.position.set(item.x, item.y, grupo.position.z);
    atualizarSelecao3d(ctx);
}

/**
 * Trata o início do toque/clique conforme o modo.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {PointerEvent} evento - Evento do ponteiro.
 */
function aoPressionar3d(ctx, evento) {
    if (ctx.modo === 'ver') return;
    const ponto = ctx.cena.converterPonteiro(evento);
    ctx.cena.canvas.setPointerCapture(evento.pointerId);
    if (ctx.modo === 'marcar') {
        ctx.arrasto = { tipo: 'marca', inicio: ponto, atual: ponto };
        return;
    }
    const item = buscarNoPonto3d(ctx.estado.redesenho, ponto);
    ctx.selecionadoId = item ? item.id : null;
    ctx.arrasto = item
        ? { tipo: 'mover', compensacao: { x: ponto.x - item.x, y: ponto.y - item.y } }
        : null;
    atualizarSelecao3d(ctx);
    ctx.aoMudar(ctx.estado);
}

/**
 * Trata o movimento do ponteiro durante o arrasto.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {PointerEvent} evento - Evento do ponteiro.
 */
function aoMoverPonteiro3d(ctx, evento) {
    if (!ctx.arrasto) return;
    const ponto = ctx.cena.converterPonteiro(evento);
    if (ctx.arrasto.tipo === 'marca') {
        ctx.arrasto.atual = ponto;
        mostrarPrevia3d(ctx, ctx.arrasto);
        return;
    }
    moverArrastado3d(ctx, ctx.arrasto, ponto);
}

/**
 * Trata o fim do arrasto.
 * @param {Object} ctx - Contexto das ferramentas.
 */
function aoSoltar3d(ctx) {
    const arrasto = ctx.arrasto;
    ctx.arrasto = null;
    if (!arrasto) return;
    if (arrasto.tipo === 'marca') concluirMarca3d(ctx, arrasto);
    else ctx.aoMudar(ctx.estado);
}

/**
 * Cria um elemento novo no centro da tela, já selecionado.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {string} forma - retangulo, circulo ou triangulo.
 */
function adicionarElemento3d(ctx, forma) {
    if (ctx.estado.redesenho.length >= LIMITE_ELEMENTOS_3D) return;
    const circulo = forma === 'circulo';
    const novo = sanearElemento3d({
        id: proximoId3d(ctx.estado.redesenho), forma, x: 0, y: 0, cor: COR_NOVO_ELEMENTO_3D,
        largura: circulo ? DIAMETRO_NOVO_3D : LARGURA_NOVO_3D,
        altura: circulo ? DIAMETRO_NOVO_3D : ALTURA_NOVO_3D,
        preenchido: true, raio: 0, rotulo: ''
    }, 0);
    ctx.estado.redesenho.push(novo);
    ctx.selecionadoId = novo.id;
    atualizarTudo3d(ctx);
}

/**
 * Aplica mudanças ao elemento selecionado, respeitando os limites do estado.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {Object} mudancas - Campos a alterar (x, y, largura, cor, raio...).
 */
function alterarSelecionado3d(ctx, mudancas) {
    const item = obterSelecionado3d(ctx);
    if (!item) return;
    const seguro = sanearElemento3d({ ...item, ...mudancas }, 0);
    if (seguro) Object.assign(item, seguro, { id: item.id });
    atualizarTudo3d(ctx);
}

/**
 * Remove o elemento selecionado do redesenho.
 * @param {Object} ctx - Contexto das ferramentas.
 */
function removerSelecionado3d(ctx) {
    ctx.estado.redesenho = ctx.estado.redesenho.filter((item) => item.id !== ctx.selecionadoId);
    ctx.selecionadoId = null;
    atualizarTudo3d(ctx);
}

/**
 * Trata as setas (mover) e Delete (remover) com o canvas em foco.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {KeyboardEvent} evento - Evento do teclado.
 */
function aoTeclar3d(ctx, evento) {
    const item = obterSelecionado3d(ctx);
    if (ctx.modo !== 'editar' || !item) return;
    const setas = {
        ArrowLeft: { x: item.x - PASSO_TECLA_3D }, ArrowRight: { x: item.x + PASSO_TECLA_3D },
        ArrowUp: { y: item.y + PASSO_TECLA_3D }, ArrowDown: { y: item.y - PASSO_TECLA_3D }
    };
    if (evento.key === 'Delete') removerSelecionado3d(ctx);
    else if (setas[evento.key]) alterarSelecionado3d(ctx, setas[evento.key]);
    else return;
    evento.preventDefault();
}

/**
 * Mostra as camadas certas para cada etapa e escolhe o modo de uso.
 * @param {Object} ctx - Contexto das ferramentas.
 * @param {string} etapa - raiox, redesenho ou ficha.
 */
function definirEtapa3d(ctx, etapa) {
    const { camadas } = ctx.cena;
    const noRaioX = etapa === 'raiox';
    const noRedesenho = etapa === 'redesenho';
    camadas.original.visible = noRaioX;
    camadas.redesenho.visible = !noRaioX;
    camadas.marcas.visible = noRaioX || (noRedesenho && ctx.mostrarMarcas);
    camadas.selecao.visible = noRedesenho;
    const modoDaEtapa = noRaioX ? 'marcar' : (noRedesenho ? 'editar' : 'ver');
    ctx.modo = ctx.bloqueado ? 'ver' : modoDaEtapa;
    ctx.estado.etapa = etapa;
    ctx.cena.canvas.classList.toggle('dinamica3d__canvas--somente-leitura', ctx.modo === 'ver');
    ctx.cena.solicitarQuadro();
}

/**
 * Cria as ferramentas ligadas à cena e ao estado do aluno.
 * @param {Object} cena - Cena criada por criarCenaDinamica3d.
 * @param {Object} estado - Estado do aluno (marcas, redesenho, ficha).
 * @param {Object} opcoes - { original: tela original, aoMudar: função chamada a cada mudança }.
 * @returns {Object} API usada pelo painel e pelo controle.
 */
function criarFerramentas3d(cena, estado, opcoes) {
    const ctx = {
        cena, estado, original: opcoes.original, aoMudar: opcoes.aoMudar,
        modo: 'ver', forma: 'retangulo', selecionadoId: null, arrasto: null, mostrarMarcas: false,
        bloqueado: false
    };
    const livre = (acao) => () => { if (!ctx.bloqueado) acao(); };
    const ouvintes = {
        pointerdown: (e) => aoPressionar3d(ctx, e), pointermove: (e) => aoMoverPonteiro3d(ctx, e),
        pointerup: () => aoSoltar3d(ctx), pointercancel: () => aoSoltar3d(ctx),
        keydown: (e) => aoTeclar3d(ctx, e)
    };
    Object.entries(ouvintes).forEach(
        ([nome, funcao]) => cena.canvas.addEventListener(nome, funcao));
    cena.canvas.tabIndex = 0;
    return {
        iniciar: () => atualizarTudo3d(ctx),
        definirEtapa: (etapa) => definirEtapa3d(ctx, etapa),
        definirForma: (forma) => { ctx.forma = forma; },
        obterForma: () => ctx.forma,
        mostrarMarcas: (mostrar) => {
            ctx.mostrarMarcas = mostrar;
            definirEtapa3d(ctx, ctx.estado.etapa);
        },
        obterSelecionado: () => obterSelecionado3d(ctx),
        adicionar: (forma) => { if (!ctx.bloqueado) adicionarElemento3d(ctx, forma); },
        alterar: (mudancas) => { if (!ctx.bloqueado) alterarSelecionado3d(ctx, mudancas); },
        remover: livre(() => removerSelecionado3d(ctx)),
        desfazerMarca: livre(() => { ctx.estado.marcas.pop(); atualizarTudo3d(ctx); }),
        limparMarcas: livre(() => { ctx.estado.marcas = []; atualizarTudo3d(ctx); }),
        restaurarOriginal: livre(() => {
            ctx.estado.redesenho = clonarElementos3d(ctx.original);
            ctx.selecionadoId = null;
            atualizarTudo3d(ctx);
        }),
        bloquear: () => { ctx.bloqueado = true; definirEtapa3d(ctx, ctx.estado.etapa); },
        destruir: () => Object.entries(ouvintes).forEach(
            ([nome, funcao]) => cena.canvas.removeEventListener(nome, funcao))
    };
}
