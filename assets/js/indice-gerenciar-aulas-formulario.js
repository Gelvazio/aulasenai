// Modal 2 do "📚 Gerenciar Aulas" (tarefa #250): formulário completo da aula nos modos Inserir,
// Editar e Excluir. Usa os mesmos campos do "✏️ Editar aula" (CAMPOS_MODAL_AULA, leitores e
// escritores de indice-aula-modal.js) e acrescenta "Link dos slides" (aulas.conteudo.slides).
// Excluir mostra os dados só para leitura e pede confirmação; o banco só aceita o Professor
// Administrador (exclusão lógica, excluir_aula).
// Depende de: indice-aula-modal.js, indice-gerenciar-aulas-repositorio.js,
// indice-gerenciar-aulas-cards.js (linkDeSlidesSeguro) e assets/js/popup.js.

const ID_FORMULARIO_GERENCIAR_AULA = 'formulario-gerenciar-aula';
const CAMPO_SLIDES_GERENCIAR = { nome: 'link_slides', rotulo: 'Link dos slides (http… ou caminho)',
    tipo: 'text', maximo: 500 };
const CHAVE_SLIDES_CONTEUDO = 'slides';
// Aula nova já nasce ativa e visível aos alunos (o professor pode desmarcar).
const AULA_NOVA_GERENCIAR = { ativo: true, visivel_alunos: true };
const TITULOS_MODO_GERENCIAR = {
    inserir: '➕ Nova aula',
    editar: '✏️ Editar aula',
    excluir: '🗑️ Excluir aula',
};
const MSG_FORM_TITULO_GERENCIAR = 'Informe o número e o título da aula.';
const MSG_FORM_JSON_GERENCIAR = 'O campo Conteúdo precisa ser um JSON válido (ou ficar vazio).';
const MSG_FORM_SLIDES_GERENCIAR = 'O link dos slides precisa começar com http:// ou https:// ' +
    '(ou ser um caminho da pasta).';
const MSG_FORM_ERRO_GERENCIAR = '❌ Não foi possível gravar. Confira o login de professor, o ' +
    'número da aula (não pode repetir na matéria) e o banco.';
const MSG_EXCLUIR_ERRO_GERENCIAR = '❌ Não foi possível excluir. Só o Professor Administrador ' +
    'exclui aulas.';
const MSG_CONFIRMAR_EXCLUIR_GERENCIAR = ' será EXCLUÍDA do índice (o card some para todos). ' +
    'As atividades dela continuam no banco. Continuar?';

const estadoFormGerenciar = { modo: null, aula: null, contexto: null };
let elementosFormGerenciar = null;

/**
 * Monta os botões do modal conforme o modo (Salvar ou Excluir, e Cancelar).
 * @returns {HTMLElement} Grade de botões.
 */
function montarBotoesFormGerenciar() {
    const grade = criarElementoModalAula('div', 'aula-modal-grade gerenciar-aulas-botoes');
    const salvar = criarBotaoModalAula('💾 Salvar', 'crud-btn--principal', 'salvar');
    salvar.setAttribute('form', ID_FORMULARIO_GERENCIAR_AULA);
    const excluir = criarBotaoModalAula('🗑️ Excluir aula', 'crud-btn--perigo', 'excluir');
    const cancelar = criarBotaoModalAula('↩ Cancelar', 'aula-modal-cancelar', 'cancelar');
    [salvar, excluir, cancelar].forEach((botao) => botao.classList.add('aula-modal-grade__botao'));
    grade.append(salvar, excluir, cancelar);
    return grade;
}

/**
 * Monta o modal 2 (formulário) e o anexa à página.
 * @returns {Object} Referências dos elementos do modal.
 */
function montarModalFormGerenciar() {
    const fundo = criarElementoModalAula('div', 'crud-fundo gerenciar-aulas-fundo--form');
    const caixa = criarElementoModalAula('div', 'crud-caixa aula-modal-caixa');
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const titulo = criarElementoModalAula('h2', '', TITULOS_MODO_GERENCIAR.editar);
    const barra = criarElementoModalAula('div', 'crud-form__acoes aula-modal-barra');
    barra.append(criarBotaoModalAula('✕ Fechar', 'aula-modal-fechar', 'fechar'));
    const formulario = criarElementoModalAula('form', 'crud-form aula-modal-form');
    formulario.id = ID_FORMULARIO_GERENCIAR_AULA;
    const info = criarElementoModalAula('p', 'aula-modal-info');
    formulario.append(info, ...CAMPOS_MODAL_AULA.map(criarCampoModalAula),
        criarCampoModalAula(CAMPO_SLIDES_GERENCIAR));
    const botoes = montarBotoesFormGerenciar();
    const mensagem = criarElementoModalAula('p', 'crud-mensagem');
    caixa.append(titulo, barra, botoes, mensagem, formulario);
    fundo.append(caixa);
    fundo.hidden = true;
    document.body.append(fundo);
    fundo.addEventListener('click', aoClicarFormGerenciar);
    formulario.addEventListener('submit', aoSalvarFormGerenciar);
    return { fundo, titulo, formulario, info, botoes, mensagem };
}

/**
 * Mostra uma mensagem no modal 2.
 * @param {string} texto - Mensagem (vazia limpa).
 * @param {boolean} [ehErro] - true para estilo de erro.
 */
function mostrarMensagemFormGerenciar(texto, ehErro) {
    elementosFormGerenciar.mensagem.textContent = texto;
    elementosFormGerenciar.mensagem.classList.toggle('crud-mensagem--erro', Boolean(ehErro));
}

/**
 * Separa o link dos slides do resto do conteúdo JSON da aula.
 * @param {Object|null} conteudo - aulas.conteudo.
 * @returns {{slides: string, resto: Object|null}} Link e o conteúdo sem ele.
 */
function separarSlidesDoConteudo(conteudo) {
    if (!conteudo || typeof conteudo !== 'object') return { slides: '', resto: conteudo || null };
    const { [CHAVE_SLIDES_CONTEUDO]: slides, ...resto } = conteudo;
    return { slides: slides || '', resto: Object.keys(resto).length ? resto : null };
}

/**
 * Preenche o formulário com a aula (vazio no modo Inserir).
 * @param {Object} aula - Linha da tabela aulas (ou {} para nova).
 */
function preencherFormGerenciar(aula) {
    const campos = elementosFormGerenciar.formulario.elements;
    const { slides, resto } = separarSlidesDoConteudo(aula.conteudo);
    const valores = { ...aula, conteudo: resto };
    CAMPOS_MODAL_AULA.forEach(({ nome, tipo }) => {
        const escrever = ESCRITORES_CAMPO_AULA[tipo];
        if (escrever) return escrever(campos[nome], valores[nome]);
        campos[nome].value = valores[nome] ?? '';
    });
    campos[CAMPO_SLIDES_GERENCIAR.nome].value = slides;
    elementosFormGerenciar.info.textContent = aula.id
        ? 'ID da aula: ' + aula.id + ' · Matéria: ' + estadoFormGerenciar.contexto.nomeMateria
        : 'Aula nova da matéria ' + estadoFormGerenciar.contexto.nomeMateria;
}

/**
 * Lê o formulário: campos da aula e o link dos slides dentro do conteúdo.
 * @returns {Object} Valores das colunas da tabela aulas.
 * @throws {SyntaxError} Se o Conteúdo não for JSON válido.
 * @throws {RangeError} Se o link dos slides não for seguro.
 */
function lerFormGerenciar() {
    const campos = elementosFormGerenciar.formulario.elements;
    const valores = Object.fromEntries(CAMPOS_MODAL_AULA.map(({ nome, tipo }) =>
        [nome, LEITORES_CAMPO_AULA[tipo](campos[nome])]));
    const slides = campos[CAMPO_SLIDES_GERENCIAR.nome].value.trim();
    if (slides && !linkDeSlidesSeguro(slides)) throw new RangeError(MSG_FORM_SLIDES_GERENCIAR);

    const conteudo = { ...(valores.conteudo || {}) };
    if (slides) conteudo[CHAVE_SLIDES_CONTEUDO] = slides;
    valores.conteudo = Object.keys(conteudo).length ? conteudo : null;
    return valores;
}

/**
 * Liga ou desliga os campos e mostra os botões do modo.
 * @param {string} modo - 'inserir', 'editar' ou 'excluir'.
 */
function aplicarModoFormGerenciar(modo) {
    const somenteLeitura = modo === 'excluir';
    [...elementosFormGerenciar.formulario.elements].forEach((campo) => {
        campo.disabled = somenteLeitura;
    });
    const { botoes, titulo } = elementosFormGerenciar;
    botoes.querySelector('[data-acao="salvar"]').hidden = somenteLeitura;
    botoes.querySelector('[data-acao="excluir"]').hidden = !somenteLeitura;
    titulo.textContent = TITULOS_MODO_GERENCIAR[modo];
}

/**
 * Abre o modal 2.
 * @param {string} modo - 'inserir', 'editar' ou 'excluir'.
 * @param {Object|null} aula - Aula (null no modo Inserir).
 * @param {{materia: Object, nomeMateria: string, aoMudar: Function}} contexto - Matéria da
 *     página e a função chamada depois de gravar ou excluir.
 */
function abrirFormGerenciarAula(modo, aula, contexto) {
    if (!elementosFormGerenciar) elementosFormGerenciar = montarModalFormGerenciar();
    Object.assign(estadoFormGerenciar, { modo, aula, contexto });
    elementosFormGerenciar.formulario.reset();
    preencherFormGerenciar(aula || AULA_NOVA_GERENCIAR);
    aplicarModoFormGerenciar(modo);
    mostrarMensagemFormGerenciar('');
    elementosFormGerenciar.fundo.hidden = false;
}

/**
 * Fecha o modal 2.
 */
function fecharFormGerenciar() {
    elementosFormGerenciar.fundo.hidden = true;
    estadoFormGerenciar.aula = null;
}

/**
 * Grava a aula (insere ou edita) e avisa a lista.
 * @param {Object} valores - Colunas lidas do formulário.
 * @returns {Promise<Object>} Aula gravada.
 */
function gravarFormGerenciar(valores) {
    const { modo, aula, contexto } = estadoFormGerenciar;
    if (modo === 'editar') return atualizarAulaGerenciar(aula.id, valores);
    return inserirAulaGerenciar({ ...valores, materia_id: contexto.materia.id,
        curso_id: contexto.materia.curso_id });
}

/**
 * Valida e grava o formulário (modos Inserir e Editar).
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function aoSalvarFormGerenciar(evento) {
    evento.preventDefault();
    let valores;
    try {
        valores = lerFormGerenciar();
    } catch (erro) {
        const texto = erro instanceof RangeError ? erro.message : MSG_FORM_JSON_GERENCIAR;
        return mostrarMensagemFormGerenciar(texto, true);
    }
    if (faltamObrigatoriosAula(valores)) {
        return mostrarMensagemFormGerenciar(MSG_FORM_TITULO_GERENCIAR, true);
    }
    try {
        const gravada = await gravarFormGerenciar(valores);
        const { contexto } = estadoFormGerenciar;
        fecharFormGerenciar();
        await contexto.aoMudar('✅ Aula ' + (gravada.numero ?? '') + ' gravada.');
    } catch (erro) {
        mostrarMensagemFormGerenciar(MSG_FORM_ERRO_GERENCIAR, true);
    }
}

/**
 * Exclui a aula do modo Excluir, depois de confirmar pelo popup.
 */
async function aoExcluirFormGerenciar() {
    const { aula, contexto } = estadoFormGerenciar;
    if (!aula) return;

    const nome = 'A aula ' + obterRotuloDaAula(aula) + ' — ' + obterNomeDaAula(aula);
    if (!await confirmarModalAula(nome + MSG_CONFIRMAR_EXCLUIR_GERENCIAR, 'Excluir aula')) return;

    try {
        await excluirAulaGerenciar(aula.id);
        fecharFormGerenciar();
        await contexto.aoMudar('✅ Aula excluída do índice.');
    } catch (erro) {
        mostrarMensagemFormGerenciar(MSG_EXCLUIR_ERRO_GERENCIAR, true);
    }
}

/**
 * Trata os cliques do modal 2 (fundo, fechar, cancelar e excluir).
 * @param {MouseEvent} evento - Clique.
 */
function aoClicarFormGerenciar(evento) {
    if (evento.target === elementosFormGerenciar.fundo) return fecharFormGerenciar();

    const acao = evento.target.closest('[data-acao]')?.dataset.acao;
    const acoes = { fechar: fecharFormGerenciar, cancelar: fecharFormGerenciar,
        excluir: aoExcluirFormGerenciar };
    acoes[acao]?.();
}
