// Atividade Dinâmica no PC (tarefa #410): botões do aluno (raio-x e redesenho).
// Só monta o DOM e chama a API de dinamica-3d-ferramentas.js; não toca na cena.
// Regra: docs/regras/atividade-dinamica.md

const PALETA_3D = [
    '#2b6cb0', '#2f855a', '#dd6b20', '#c53030', '#805ad5', '#2d3748', '#cbd5e0', '#ffffff'
];
const FATOR_MAIOR_3D = 1.1;
const FATOR_MENOR_3D = 1 / FATOR_MAIOR_3D;
const PASSO_RAIO_PAINEL_3D = 4;
const MSG_SEM_SELECAO_3D = 'Toque em um elemento da tela para editar.';

/**
 * Cria um botão do painel.
 * @param {string} texto - Texto do botão.
 * @param {Function} aoClicar - Ação ao clicar.
 * @param {string} [classe] - Classe extra.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotao3d(texto, aoClicar, classe) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'dinamica3d__botao' + (classe ? ' ' + classe : '');
    botao.textContent = texto;
    botao.addEventListener('click', aoClicar);
    return botao;
}

/**
 * Cria um grupo de botões com título.
 * @param {string} titulo - Título do grupo.
 * @param {HTMLElement[]} itens - Botões ou campos do grupo.
 * @returns {HTMLElement} Grupo pronto.
 */
function criarGrupo3d(titulo, itens) {
    const grupo = document.createElement('div');
    grupo.className = 'dinamica3d__grupo';
    const rotulo = document.createElement('span');
    rotulo.className = 'dinamica3d__grupo-titulo';
    rotulo.textContent = titulo;
    grupo.append(rotulo, ...itens);
    return grupo;
}

/**
 * Monta o painel do raio-x: escolher a forma, desfazer e limpar.
 * @param {Object} ferramentas - API de criarFerramentas3d.
 * @returns {HTMLElement} Painel pronto.
 */
function criarPainelRaioX3d(ferramentas) {
    const botoesForma = FORMAS_3D.map((forma) => {
        const botao = criarBotao3d(ROTULOS_FORMA_3D[forma], () => {
            ferramentas.definirForma(forma);
            botoesForma.forEach((outro) => outro.classList.toggle('is-ativo', outro === botao));
        });
        botao.classList.toggle('is-ativo', forma === ferramentas.obterForma());
        return botao;
    });
    const acoes = [
        criarBotao3d('Desfazer última', () => ferramentas.desfazerMarca()),
        criarBotao3d('Limpar marcas', () => ferramentas.limparMarcas())
    ];
    const painel = document.createElement('div');
    painel.append(criarGrupo3d('Forma a marcar', botoesForma), criarGrupo3d('Marcas', acoes));
    return painel;
}

/**
 * Cria os botões de cor da paleta.
 * @param {Object} ferramentas - API de criarFerramentas3d.
 * @returns {HTMLElement} Grupo de cores.
 */
function criarGrupoCores3d(ferramentas) {
    const botoes = PALETA_3D.map((cor) => {
        const botao = criarBotao3d('', () => ferramentas.alterar({ cor }), 'dinamica3d__cor');
        botao.dataset.cor = cor;
        botao.setAttribute('aria-label', 'Cor ' + cor);
        botao.style.setProperty('--cor-amostra', cor);
        return botao;
    });
    return criarGrupo3d('Cor', botoes);
}

/**
 * Cria um botão que altera o elemento selecionado a partir dos valores atuais dele.
 * @param {Object} ferramentas - API de criarFerramentas3d.
 * @param {string} texto - Texto do botão.
 * @param {Function} calcular - Recebe o elemento e devolve as mudanças.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoAlterar3d(ferramentas, texto, calcular) {
    return criarBotao3d(texto, () => {
        const item = ferramentas.obterSelecionado();
        if (item) ferramentas.alterar(calcular(item));
    });
}

/**
 * Cria os botões de tamanho, cantos e preenchimento do elemento selecionado.
 * @param {Object} ferramentas - API de criarFerramentas3d.
 * @returns {HTMLElement[]} Grupos de controle.
 */
function criarGruposForma3d(ferramentas) {
    const alterar = (texto, calcular) => criarBotaoAlterar3d(ferramentas, texto, calcular);
    const tamanho = [
        alterar('Largura −', (i) => ({ largura: i.largura * FATOR_MENOR_3D })),
        alterar('Largura +', (i) => ({ largura: i.largura * FATOR_MAIOR_3D })),
        alterar('Altura −', (i) => ({ altura: i.altura * FATOR_MENOR_3D })),
        alterar('Altura +', (i) => ({ altura: i.altura * FATOR_MAIOR_3D }))
    ];
    const estilo = [
        alterar('Sólido / Contorno', (i) => ({ preenchido: !i.preenchido })),
        alterar('Cantos −', (i) => ({ raio: i.raio - PASSO_RAIO_PAINEL_3D })),
        alterar('Cantos +', (i) => ({ raio: i.raio + PASSO_RAIO_PAINEL_3D }))
    ];
    return [criarGrupo3d('Tamanho', tamanho), criarGrupo3d('Estilo', estilo)];
}

/**
 * Cria o campo de texto do elemento selecionado.
 * @param {Object} ferramentas - API de criarFerramentas3d.
 * @returns {HTMLElement} Grupo com o campo.
 */
function criarGrupoTexto3d(ferramentas) {
    const campo = document.createElement('input');
    campo.type = 'text';
    campo.className = 'dinamica3d__campo';
    campo.maxLength = LIMITE_ROTULO_3D;
    campo.placeholder = 'Texto do elemento';
    campo.addEventListener('change', () => ferramentas.alterar({ rotulo: campo.value }));
    return criarGrupo3d('Texto', [campo, criarBotao3d('Remover', () => ferramentas.remover())]);
}

/**
 * Monta o painel do redesenho.
 * @param {Object} ferramentas - API de criarFerramentas3d.
 * @returns {{raiz: HTMLElement, atualizar: Function}} Painel e função que sincroniza a seleção.
 */
function criarPainelRedesenho3d(ferramentas) {
    const raiz = document.createElement('div');
    const aviso = document.createElement('p');
    aviso.className = 'dinamica3d__aviso-selecao';
    const adicionar = FORMAS_3D.map((forma) => criarBotao3d(
        '+ ' + ROTULOS_FORMA_3D[forma], () => ferramentas.adicionar(forma)));
    const marcas = document.createElement('input');
    marcas.type = 'checkbox';
    marcas.addEventListener('change', () => ferramentas.mostrarMarcas(marcas.checked));
    const rotuloMarcas = document.createElement('label');
    rotuloMarcas.className = 'dinamica3d__opcao';
    rotuloMarcas.append(marcas, ' Mostrar as marcas do raio-x');
    const restaurar = criarBotao3d('Voltar à tela original', () => ferramentas.restaurarOriginal());
    const edicao = [criarGrupoCores3d(ferramentas), ...criarGruposForma3d(ferramentas),
        criarGrupoTexto3d(ferramentas)];
    raiz.append(criarGrupo3d('Adicionar', adicionar), aviso, ...edicao,
        criarGrupo3d('Tela', [restaurar, rotuloMarcas]));
    const atualizar = () => {
        const item = ferramentas.obterSelecionado();
        aviso.textContent = item ? '' : MSG_SEM_SELECAO_3D;
        edicao.forEach((grupo) => { grupo.hidden = !item; });
        const campo = raiz.querySelector('.dinamica3d__campo');
        if (item && document.activeElement !== campo) campo.value = item.rotulo;
    };
    atualizar();
    return { raiz, atualizar };
}
