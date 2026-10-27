// Atividade Dinâmica no PC (tarefa #410): monta a dinâmica inteira dentro de um elemento da
// página — etapas (raio-x, redesenho, ficha), cena three.js, painel e botões Salvar/Entregar.
// Os dados da aula (tela, ficha, textos) e a gravação (salvar/entregar) vêm de fora.
// Depende de dinamica-3d-formas/estado/cena/ferramentas/painel.js.
// Regra: docs/regras/atividade-dinamica.md

const ROTULOS_ETAPA_3D = {
    raiox: '1. Raio-x', redesenho: '2. Redesenho', ficha: '3. Ficha e entrega'
};
const MSG_ENTREGA_CONFIRMAR_3D =
    'Entregar a atividade? Depois de entregue você não poderá alterar.';
const MSG_SALVO_3D = 'Rascunho salvo.';
const MSG_ENTREGUE_3D = 'Atividade entregue. Aguarde a nota do professor.';
const MSG_ALTERADO_3D = 'Há alterações ainda não salvas.';
const MSG_ERRO_GRAVAR_3D = 'Não foi possível gravar: ';
const REGISTRO_DINAMICAS_3D = new Map();

/**
 * Registra os dados de uma aula (tela, ficha, checklist, instruções).
 * @param {string} aula - Número da aula, como em data-aula (ex.: '02').
 * @param {Object} dados - Dados da dinâmica daquela aula.
 */
function registrarDinamica3d(aula, dados) {
    REGISTRO_DINAMICAS_3D.set(aula, dados);
}

/**
 * Devolve os dados registrados de uma aula.
 * @param {string} aula - Número da aula.
 * @returns {Object|null} Dados da aula, ou null se não houver.
 */
function obterDinamica3d(aula) {
    return REGISTRO_DINAMICAS_3D.get(aula) || null;
}

/**
 * Cria um elemento HTML simples.
 * @param {string} etiqueta - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto interno.
 * @returns {HTMLElement} Elemento criado.
 */
function criarNo3d(etiqueta, classe, texto) {
    const no = document.createElement(etiqueta);
    no.className = classe;
    if (texto) no.textContent = texto;
    return no;
}

/**
 * Monta a ficha: um campo de texto por pergunta, ligado ao estado.
 * @param {Object[]} campos - { id, rotulo, dica } de cada pergunta.
 * @param {Object} estado - Estado do aluno (usa estado.ficha).
 * @param {Function} aoMudar - Chamada a cada digitação.
 * @returns {HTMLElement} Formulário pronto.
 */
function montarFicha3d(campos, estado, aoMudar) {
    const ficha = criarNo3d('div', 'dinamica3d__ficha');
    campos.forEach((campo) => {
        const rotulo = criarNo3d('label', 'dinamica3d__ficha-campo', campo.rotulo);
        const entrada = criarNo3d('textarea', 'dinamica3d__ficha-texto');
        entrada.maxLength = LIMITE_TEXTO_FICHA_3D;
        entrada.placeholder = campo.dica || '';
        entrada.value = estado.ficha[campo.id] || '';
        entrada.addEventListener('input', () => {
            estado.ficha[campo.id] = entrada.value;
            aoMudar();
        });
        rotulo.append(entrada);
        ficha.append(rotulo);
    });
    return ficha;
}

/**
 * Monta a lista de verificação do aluno consultor (só para conferir, não é gravada).
 * @param {string[]} itens - Itens do checklist.
 * @returns {HTMLElement} Lista pronta.
 */
function montarChecklist3d(itens) {
    const lista = criarNo3d('ul', 'dinamica3d__checklist');
    itens.forEach((texto) => {
        const item = criarNo3d('li', 'dinamica3d__checklist-item');
        const marca = criarNo3d('input', '');
        marca.type = 'checkbox';
        const rotulo = criarNo3d('label', '', '');
        rotulo.append(marca, ' ' + texto);
        item.append(rotulo);
        lista.append(item);
    });
    return lista;
}

/**
 * Cria a estrutura de DOM da dinâmica dentro da raiz.
 * @param {HTMLElement} raiz - Elemento que recebe a dinâmica.
 * @returns {Object} Referências aos pedaços da tela.
 */
function montarEstrutura3d(raiz) {
    raiz.textContent = '';
    raiz.classList.add('dinamica3d');
    const refs = {
        etapas: criarNo3d('nav', 'dinamica3d__etapas'),
        instrucao: criarNo3d('p', 'dinamica3d__instrucao'),
        area: criarNo3d('div', 'dinamica3d__area'),
        palco: criarNo3d('div', 'dinamica3d__palco'),
        painel: criarNo3d('div', 'dinamica3d__painel'),
        ficha: criarNo3d('section', 'dinamica3d__ficha-bloco'),
        acoes: criarNo3d('div', 'dinamica3d__acoes'),
        status: criarNo3d('p', 'dinamica3d__status')
    };
    refs.area.append(refs.palco, refs.painel);
    raiz.append(refs.etapas, refs.instrucao, refs.area, refs.ficha, refs.acoes, refs.status);
    return refs;
}

/**
 * Mostra uma mensagem de status.
 * @param {Object} refs - Referências da tela.
 * @param {string} mensagem - Texto a mostrar.
 * @param {boolean} [erro] - true para destacar como erro.
 */
function mostrarStatus3d(refs, mensagem, erro) {
    refs.status.textContent = mensagem;
    refs.status.classList.toggle('dinamica3d__status--erro', Boolean(erro));
}

/**
 * Grava (rascunho ou entrega) e mostra o resultado.
 * @param {Object} contexto - { refs, estado, config, bloquear }.
 * @param {boolean} entregar - true para entregar de vez.
 * @returns {Promise<void>}
 */
async function gravar3d(contexto, entregar) {
    const { refs, estado, config } = contexto;
    if (entregar && !window.confirm(MSG_ENTREGA_CONFIRMAR_3D)) return;
    try {
        if (entregar) await config.aoEntregar(estado);
        else await config.aoSalvar(estado);
        mostrarStatus3d(refs, entregar ? MSG_ENTREGUE_3D : MSG_SALVO_3D);
        if (entregar) contexto.bloquear();
    } catch (erro) {
        mostrarStatus3d(refs, MSG_ERRO_GRAVAR_3D + (erro.message || erro), true);
    }
}

/**
 * Cria os botões Salvar rascunho e Entregar.
 * @param {Object} contexto - { refs, estado, config, bloquear }.
 * @returns {HTMLButtonElement[]} Os dois botões.
 */
function criarAcoes3d(contexto) {
    const salvar = criarBotao3d('Salvar rascunho', () => gravar3d(contexto, false));
    const entregar = criarBotao3d('Entregar', () => gravar3d(contexto, true),
        'dinamica3d__botao--principal');
    return [salvar, entregar];
}

/**
 * Inicia a dinâmica 3D completa.
 * @param {Object} config - { raiz, tela, ficha, checklist, instrucoes, estadoInicial,
 *   somenteLeitura, aoSalvar, aoEntregar }.
 * @returns {{obterEstado: Function, destruir: Function}} Controle da dinâmica.
 * @throws {Error} Se o three.js ou o WebGL não estiverem disponíveis.
 */
function iniciarDinamica3d(config) {
    const refs = montarEstrutura3d(config.raiz);
    const estado = restaurarEstado3d(config.estadoInicial);
    const original = sanearLista3d(config.tela);
    if (estado.redesenho.length === 0) estado.redesenho = clonarElementos3d(original);
    const cena = criarCenaDinamica3d(refs.palco);
    const contexto = { refs, estado, config, bloquear: () => {} };
    const pintar = montarInterface3d({ contexto, cena, original });
    pintar.mudarEtapa(estado.etapa);
    if (config.semGravacao) refs.acoes.hidden = true;
    if (config.avisoInicial) mostrarStatus3d(refs, config.avisoInicial);
    if (config.somenteLeitura) contexto.bloquear();
    return { obterEstado: () => estado, destruir: () => { pintar.destruir(); cena.destruir(); } };
}
