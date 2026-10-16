// Modal "🔗 Gerenciar atividades" do "✏️ Editar aula" (indice-aula-modal.js, tarefa #213):
// vincula e desvincula atividades QUE JÁ EXISTEM no banco à aula em edição, gravando
// atividade.aula_id (vincular = id da aula; desvincular = vazio). Pelo campo "ID da atividade" ou
// pela lista das atividades das outras aulas da matéria e das sem aula. Vincular uma atividade de
// outra aula pede confirmação (ela sai da outra aula). Só o professor grava (RLS).
// Os links dos cards do índice são do HTML: vincular não cria link novo no card.
// Depende de: assets/js/indice-aula-repositorio.js; usa popup.js (confirmarPopup) se carregado.
// Estilos: atividades-crud-modal.css e indice-aula-data.css.

const TITULO_MODAL_VINCULO = '🔗 Gerenciar atividades — ';
const MSG_ID_INVALIDO_VINCULO = 'Informe o ID (número) de uma atividade.';
const MSG_NAO_ACHOU_VINCULO = '❌ Nenhuma atividade com o ID ';
const MSG_JA_NA_AULA_VINCULO = 'Esta atividade já está nesta aula.';
const MSG_ERRO_VINCULO = '❌ Não foi possível gravar. Confira o login de professor e o banco.';
const MSG_ERRO_LISTA_VINCULO = '❌ Não foi possível carregar as atividades.';
const MSG_VAZIA_DA_AULA_VINCULO = 'Nenhuma atividade vinculada a esta aula.';
const MSG_VAZIA_OUTRAS_VINCULO = 'Nenhuma outra atividade da matéria (nem sem aula).';
const TEXTO_SEM_AULA_VINCULO = 'sem aula';
const DIGITOS_AULA_VINCULO = 2;

const estadoVinculo = { aula: null, aoFechar: null, mudou: false, atividades: [] };
let elementosVinculo = null;

/**
 * Cria um elemento HTML com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoVinculo(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

/**
 * Cria um botão do modal com a ação em data-acao.
 * @param {string} texto - Texto do botão.
 * @param {string} acao - Ação (data-acao).
 * @param {string} [classe] - Classe extra.
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoVinculo(texto, acao, classe) {
    const botao = criarElementoVinculo('button', ('crud-btn ' + (classe || '')).trim(), texto);
    botao.type = acao === 'vincular-id' ? 'submit' : 'button';
    botao.dataset.acao = acao;
    return botao;
}

/**
 * Monta o formulário "ID da atividade" + "Vincular".
 * @returns {{formulario: HTMLFormElement, campo: HTMLInputElement}} Formulário e campo.
 */
function montarFormularioVinculo() {
    const formulario = criarElementoVinculo('form', 'crud-form aula-vinculo-form');
    const rotulo = criarElementoVinculo('label', 'crud-campo');
    const campo = criarElementoVinculo('input');
    campo.type = 'number';
    campo.min = '1';
    campo.name = 'id_atividade';
    rotulo.append(criarElementoVinculo('span', 'crud-campo__rotulo', 'ID da atividade'), campo);
    const acoes = criarElementoVinculo('div', 'crud-form__acoes');
    acoes.append(criarBotaoVinculo('🔗 Vincular', 'vincular-id', 'crud-btn--principal'),
        criarBotaoVinculo('✕ Fechar', 'fechar'));
    formulario.append(rotulo, acoes);
    formulario.addEventListener('submit', aoVincularPorIdVinculo);
    return { formulario, campo };
}

/**
 * Monta o modal e o anexa à página (fica acima do "Editar aula").
 * @returns {Object} Referências dos elementos do modal.
 */
function montarModalVinculo() {
    const fundo = criarElementoVinculo('div', 'crud-fundo aula-vinculo-fundo');
    const caixa = criarElementoVinculo('div', 'crud-caixa aula-modal-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const titulo = criarElementoVinculo('h2', '', TITULO_MODAL_VINCULO);
    const { formulario, campo } = montarFormularioVinculo();
    const mensagem = criarElementoVinculo('p', 'crud-mensagem');
    const listaDaAula = criarElementoVinculo('div', 'crud-lista');
    const listaOutras = criarElementoVinculo('div', 'crud-lista');
    caixa.append(titulo, formulario, mensagem,
        criarElementoVinculo('h3', '', 'Atividades desta aula'), listaDaAula,
        criarElementoVinculo('h3', '', 'Outras atividades da matéria e sem aula'), listaOutras);
    fundo.append(caixa);
    fundo.hidden = true;
    document.body.append(fundo);
    fundo.addEventListener('click', aoClicarVinculo);
    return { fundo, titulo, campo, mensagem, listaDaAula, listaOutras };
}

/**
 * Mostra uma mensagem no modal.
 * @param {string} texto - Mensagem (vazia limpa).
 * @param {boolean} [ehErro] - true para estilo de erro.
 */
function mostrarMensagemVinculo(texto, ehErro) {
    elementosVinculo.mensagem.textContent = texto;
    elementosVinculo.mensagem.classList.toggle('crud-mensagem--erro', Boolean(ehErro));
}

/**
 * Texto curto da aula de uma atividade ("Aula 03 — título" ou "sem aula").
 * @param {Object} atividade - Atividade com aulas(numero, titulo).
 * @returns {string} Texto da aula.
 */
function descreverAulaVinculo(atividade) {
    if (!atividade.aula_id || !atividade.aulas) return TEXTO_SEM_AULA_VINCULO;

    const numero = String(atividade.aulas.numero ?? '').padStart(DIGITOS_AULA_VINCULO, '0');
    return 'Aula ' + numero + ' — ' + (atividade.aulas.titulo || '');
}

/**
 * Cria a linha de uma atividade com o botão Vincular ou Desvincular.
 * @param {Object} atividade - Atividade do banco.
 * @param {boolean} estaNaAula - true se já está na aula em edição.
 * @returns {HTMLElement} Linha da lista.
 */
function criarLinhaVinculo(atividade, estaNaAula) {
    const linha = criarElementoVinculo('div', 'crud-linha');
    linha.dataset.id = String(atividade.id);
    const situacao = atividade.ativo ? '' : ' · INATIVA';
    const texto = criarElementoVinculo('div', 'crud-linha__texto');
    texto.append(criarElementoVinculo('strong', '', 'ID ' + atividade.id + ' · ' +
        (atividade.nome_atividade || atividade.descricao || '')),
    criarElementoVinculo('small', '', descreverAulaVinculo(atividade) + ' · ' +
        (atividade.pagina || '').split('/').pop() + situacao));
    const botao = estaNaAula
        ? criarBotaoVinculo('✖ Desvincular', 'desvincular', 'crud-btn--perigo')
        : criarBotaoVinculo('🔗 Vincular', 'vincular');
    linha.append(texto, botao);
    return linha;
}

/**
 * Preenche uma lista com as linhas (ou com o aviso de vazia).
 * @param {HTMLElement} lista - Lista do modal.
 * @param {{atividades: Object[], estaNaAula: boolean, vazia: string}} dados - O que desenhar.
 */
function desenharListaVinculo(lista, { atividades, estaNaAula, vazia }) {
    if (!atividades.length) {
        lista.replaceChildren(criarElementoVinculo('p', 'crud-vazio', vazia));
        return;
    }
    lista.replaceChildren(...atividades.map((atividade) => criarLinhaVinculo(atividade,
        estaNaAula)));
}

/**
 * Lê do banco as atividades vinculáveis e desenha as duas listas.
 */
async function carregarListasVinculo() {
    const { aula } = estadoVinculo;
    try {
        estadoVinculo.atividades = await listarAtividadesVinculaveisCard(aula.materia_id);
    } catch (erro) {
        mostrarMensagemVinculo(MSG_ERRO_LISTA_VINCULO, true);
        return;
    }
    const daAula = estadoVinculo.atividades.filter((item) => item.aula_id === aula.id);
    const outras = estadoVinculo.atividades.filter((item) => item.aula_id !== aula.id);
    desenharListaVinculo(elementosVinculo.listaDaAula,
        { atividades: daAula, estaNaAula: true, vazia: MSG_VAZIA_DA_AULA_VINCULO });
    desenharListaVinculo(elementosVinculo.listaOutras,
        { atividades: outras, estaNaAula: false, vazia: MSG_VAZIA_OUTRAS_VINCULO });
}

/**
 * Pede confirmação pelo popup do projeto (sem popup carregado, não confirma).
 * @param {string} texto - Pergunta.
 * @param {string} textoConfirmar - Texto do botão de confirmar.
 * @returns {Promise<boolean>} true se confirmou.
 */
async function confirmarVinculo(texto, textoConfirmar) {
    if (typeof garantirPopupModalAula === 'function') await garantirPopupModalAula();
    if (typeof window.confirmarPopup !== 'function') return false;

    return window.confirmarPopup(texto,
        { tipo: 'pergunta', titulo: 'Gerenciar atividades', textoConfirmar });
}

/**
 * Grava a aula da atividade e redesenha as listas.
 * @param {number} idAtividade - Id da atividade.
 * @param {{idAula: number|null, sucesso: string}} gravacao - Aula nova (null = sem) e mensagem.
 */
async function gravarVinculo(idAtividade, { idAula, sucesso }) {
    try {
        if (!await definirAulaDaAtividadeCard(idAtividade, idAula)) {
            throw new Error('Nenhuma linha alterada');
        }
        estadoVinculo.mudou = true;
        await carregarListasVinculo();
        mostrarMensagemVinculo(sucesso);
    } catch (erro) {
        mostrarMensagemVinculo(MSG_ERRO_VINCULO, true);
    }
}

/**
 * Vincula uma atividade à aula em edição (confirma se ela estava em outra aula).
 * @param {Object} atividade - Atividade do banco (com aula_id e aulas).
 */
async function vincularAtividadeVinculo(atividade) {
    const { aula } = estadoVinculo;
    if (atividade.aula_id === aula.id) return mostrarMensagemVinculo(MSG_JA_NA_AULA_VINCULO);

    const estaEmOutraAula = Boolean(atividade.aula_id);
    const pergunta = 'A atividade ID ' + atividade.id + ' está na ' +
        descreverAulaVinculo(atividade) + ' e vai sair de lá para esta aula. Continuar?';
    if (estaEmOutraAula && !await confirmarVinculo(pergunta, '🔗 Vincular')) return;

    await gravarVinculo(atividade.id,
        { idAula: aula.id, sucesso: '✅ Atividade ID ' + atividade.id + ' vinculada.' });
}

/**
 * Formulário "ID da atividade": busca a atividade no banco e a vincula.
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function aoVincularPorIdVinculo(evento) {
    evento.preventDefault();
    const idAtividade = Number(elementosVinculo.campo.value);
    if (!Number.isInteger(idAtividade) || idAtividade < 1) {
        return mostrarMensagemVinculo(MSG_ID_INVALIDO_VINCULO, true);
    }
    try {
        const atividade = await buscarAtividadeVinculoCard(idAtividade);
        if (!atividade) {
            return mostrarMensagemVinculo(MSG_NAO_ACHOU_VINCULO + idAtividade + '.', true);
        }

        await vincularAtividadeVinculo(atividade);
        elementosVinculo.campo.value = '';
    } catch (erro) {
        mostrarMensagemVinculo(MSG_ERRO_VINCULO, true);
    }
}

/**
 * Desvincula da aula uma atividade (fica sem aula), depois de confirmar.
 * @param {number} idAtividade - Id da atividade.
 */
async function desvincularAtividadeVinculo(idAtividade) {
    const pergunta = 'A atividade ID ' + idAtividade + ' deixa de ser desta aula e fica sem aula ' +
        '(ela não é apagada). Continuar?';
    if (!await confirmarVinculo(pergunta, '✖ Desvincular')) return;

    await gravarVinculo(idAtividade,
        { idAula: null, sucesso: '✅ Atividade ID ' + idAtividade + ' desvinculada.' });
}

/**
 * Trata os cliques do modal (fundo, fechar e botões das linhas).
 * @param {MouseEvent} evento - Clique.
 */
function aoClicarVinculo(evento) {
    if (evento.target === elementosVinculo.fundo) return fecharModalVinculo();

    const botao = evento.target.closest('[data-acao]');
    if (!botao || botao.type === 'submit') return;

    const idAtividade = Number(botao.closest('.crud-linha')?.dataset.id);
    const atividade = estadoVinculo.atividades.find((item) => item.id === idAtividade);
    const acoes = {
        fechar: fecharModalVinculo,
        vincular: () => atividade && vincularAtividadeVinculo(atividade),
        desvincular: () => desvincularAtividadeVinculo(idAtividade),
    };
    acoes[botao.dataset.acao]?.();
}

/**
 * Fecha o modal e, se algo mudou, avisa o "Editar aula" para reler as atividades.
 */
function fecharModalVinculo() {
    elementosVinculo.fundo.hidden = true;
    if (estadoVinculo.mudou) estadoVinculo.aoFechar?.();
    estadoVinculo.aula = null;
}

/**
 * Abre o "Gerenciar atividades" de uma aula.
 * @param {Object} aula - Linha da tabela aulas (id, materia_id, rótulo e nome).
 * @param {Function} aoFechar - Chamada ao fechar, se alguma atividade foi (des)vinculada.
 */
function abrirModalVinculoAula(aula, aoFechar) {
    if (!elementosVinculo) elementosVinculo = montarModalVinculo();

    Object.assign(estadoVinculo, { aula, aoFechar, mudou: false, atividades: [] });
    const nome = typeof obterNomeDaAula === 'function' ? obterNomeDaAula(aula) : aula.titulo;
    elementosVinculo.titulo.textContent = TITULO_MODAL_VINCULO + (nome || 'aula ' + aula.id);
    elementosVinculo.campo.value = '';
    mostrarMensagemVinculo('');
    elementosVinculo.listaDaAula.replaceChildren();
    elementosVinculo.listaOutras.replaceChildren();
    elementosVinculo.fundo.hidden = false;
    elementosVinculo.campo.focus();
    carregarListasVinculo();
}
