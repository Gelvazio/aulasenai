// Bloqueio de colar/copiar nas avaliações discursivas: obriga o aluno a digitar cada resposta.
// Liga com data-bloquear-colar="sim" no <body> (campo "- **Bloquear colar:** sim" da fonte .md,
// lido pelo gerador assets/gerador-avaliacao-discursiva/). Nas ATIVIDADES PRÁTICAS (arquivo
// ATIVIDADE-PRATICA-*) liga sozinho, e data-bloquear-colar="nao" desliga (tarefa #414).
// Bloqueia colar, arrastar texto para dentro, copiar, recortar, os atalhos do teclado
// (Ctrl/Cmd+V/C/X, Shift+Insert...), o menu de contexto, copiar/selecionar o enunciado da
// questão (para não levar a pergunta a uma IA) e texto inserido de uma vez só (extensão,
// autopreenchimento, ditado em bloco). Não é 100%: DevTools, extensões que alteram a página e
// outro aparelho passam. Regra: docs/regras/atividades.md

const ATRIBUTO_BLOQUEAR_COLAR = 'bloquearColar';
const VALOR_BLOQUEIO_LIGADO = 'sim';
const VALOR_BLOQUEIO_DESLIGADO = 'nao';
const TRECHO_ARQUIVO_PRATICA = 'ATIVIDADE-PRATICA';
const SELETOR_CAMPO_BLOQUEADO = '.topico-resposta__campo';
const SELETOR_QUESTAO_BLOQUEADA = '.topico-resposta';
const EVENTOS_NO_CAMPO = ['paste', 'drop'];
const EVENTOS_NA_QUESTAO = ['copy', 'cut', 'contextmenu', 'dragstart', 'selectstart'];
const TIPOS_ENTRADA_BLOQUEADOS = [
    'insertFromPaste', 'insertFromDrop', 'insertFromPasteAsQuotation', 'insertFromYank',
];
const TECLAS_ATALHO_TEXTO = ['v', 'c', 'x'];
const LIMITE_CARACTERES_POR_ENTRADA = 25;
const MSG_COLAR_BLOQUEADO = 'Nesta atividade não é permitido colar, arrastar, copiar ou ' +
    'recortar texto. Digite a sua resposta com as suas palavras.';
const TITULO_COLAR_BLOQUEADO = 'Digite a sua resposta';

const estadoBloqueioColar = { avisoAberto: false, valores: new WeakMap() };

/**
 * Indica se a página está bloqueada: atributo "sim", ou prática sem o atributo "nao".
 * @returns {boolean} true quando o bloqueio está ligado.
 */
function estaBloqueioColarLigado() {
    const valor = document.body?.dataset[ATRIBUTO_BLOQUEAR_COLAR];
    if (valor === VALOR_BLOQUEIO_LIGADO) return true;
    if (valor === VALOR_BLOQUEIO_DESLIGADO) return false;

    const caminho = decodeURIComponent(window.location.pathname).toUpperCase();
    return caminho.includes(TRECHO_ARQUIVO_PRATICA);
}

/**
 * Indica se o alvo do evento está dentro do seletor.
 * @param {Event} evento - Evento do navegador.
 * @param {string} seletor - Seletor CSS do bloco protegido.
 * @returns {boolean} true quando o alvo está dentro do bloco.
 */
function estaDentroDe(evento, seletor) {
    const alvo = evento.target?.nodeType === Node.TEXT_NODE
        ? evento.target.parentElement : evento.target;
    return Boolean(alvo?.closest?.(seletor));
}

/**
 * Mostra o aviso de bloqueio uma vez por vez (sem empilhar popups).
 */
async function avisarColarBloqueado() {
    if (estadoBloqueioColar.avisoAberto) return;
    if (typeof mostrarPopup !== 'function') return;

    estadoBloqueioColar.avisoAberto = true;
    try {
        await mostrarPopup(MSG_COLAR_BLOQUEADO, { tipo: 'aviso', titulo: TITULO_COLAR_BLOQUEADO });
    } finally {
        estadoBloqueioColar.avisoAberto = false;
    }
}

/**
 * Cancela o evento e avisa o aluno.
 * @param {Event} evento - Evento a cancelar.
 */
function cancelarEAvisar(evento) {
    evento.preventDefault();
    avisarColarBloqueado();
}

/**
 * Cancela colar e arrastar para dentro quando o alvo é um campo de resposta.
 * @param {Event} evento - Evento paste ou drop.
 */
function bloquearEventoNoCampo(evento) {
    if (estaDentroDe(evento, SELETOR_CAMPO_BLOQUEADO)) cancelarEAvisar(evento);
}

/**
 * Cancela copiar, recortar, menu de contexto e seleção dentro da questão (enunciado e campo).
 * A seleção é cancelada sem aviso, para não incomodar quem só clica.
 * @param {Event} evento - Evento copy, cut, contextmenu, dragstart ou selectstart.
 */
function bloquearEventoNaQuestao(evento) {
    if (!estaDentroDe(evento, SELETOR_QUESTAO_BLOQUEADA)) return;
    const ehSelecao = evento.type === 'selectstart' || evento.type === 'dragstart';
    if (ehSelecao && estaDentroDe(evento, SELETOR_CAMPO_BLOQUEADO)) return;
    if (ehSelecao) return evento.preventDefault();

    cancelarEAvisar(evento);
}

/**
 * Cancela texto colado ou arrastado que chegue por outro caminho (ex.: menu do navegador).
 * @param {InputEvent} evento - Evento beforeinput.
 */
function bloquearEntradaColada(evento) {
    const ehEntradaColada = TIPOS_ENTRADA_BLOQUEADOS.includes(evento.inputType);
    if (ehEntradaColada && estaDentroDe(evento, SELETOR_CAMPO_BLOQUEADO)) cancelarEAvisar(evento);
}

/**
 * Indica se a combinação de teclas é de colar, copiar ou recortar.
 * @param {KeyboardEvent} evento - Evento keydown.
 * @returns {boolean} true quando é um atalho de texto da área de transferência.
 */
function ehAtalhoDeTexto(evento) {
    const comControle = evento.ctrlKey || evento.metaKey;
    const ehLetra = TECLAS_ATALHO_TEXTO.includes(String(evento.key).toLowerCase());
    const ehInsertOuDelete = (evento.shiftKey || comControle) &&
        (evento.key === 'Insert' || (evento.shiftKey && evento.key === 'Delete'));
    return (comControle && ehLetra) || ehInsertOuDelete;
}

/**
 * Cancela os atalhos Ctrl/Cmd+V/C/X, Shift+Insert, Ctrl+Insert e Shift+Delete na questão.
 * @param {KeyboardEvent} evento - Evento keydown.
 */
function bloquearAtalhoDeTexto(evento) {
    if (!estaDentroDe(evento, SELETOR_QUESTAO_BLOQUEADA)) return;
    if (ehAtalhoDeTexto(evento)) cancelarEAvisar(evento);
}

/**
 * Guarda o texto do campo ao receber o foco (base para detectar inserção em bloco).
 * @param {FocusEvent} evento - Evento focusin.
 */
function guardarValorDoCampo(evento) {
    if (!estaDentroDe(evento, SELETOR_CAMPO_BLOQUEADO)) return;
    estadoBloqueioColar.valores.set(evento.target, evento.target.value);
}

/**
 * Desfaz texto que apareceu de uma vez no campo (extensão, autopreenchimento, ditado em bloco).
 * @param {Event} evento - Evento input.
 */
function bloquearEntradaEmBloco(evento) {
    if (!estaDentroDe(evento, SELETOR_CAMPO_BLOQUEADO)) return;

    const campo = evento.target;
    const anterior = estadoBloqueioColar.valores.get(campo) ?? '';
    const saltou = campo.value.length - anterior.length > LIMITE_CARACTERES_POR_ENTRADA;
    if (!saltou) {
        estadoBloqueioColar.valores.set(campo, campo.value);
        return;
    }
    campo.value = anterior;
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    avisarColarBloqueado();
}

/**
 * Liga o bloqueio na página, se ela estiver sujeita a ele (eventos capturados no documento).
 */
function iniciarBloqueioColar() {
    if (!estaBloqueioColarLigado()) return;

    EVENTOS_NO_CAMPO.forEach((nome) => {
        document.addEventListener(nome, bloquearEventoNoCampo, true);
    });
    EVENTOS_NA_QUESTAO.forEach((nome) => {
        document.addEventListener(nome, bloquearEventoNaQuestao, true);
    });
    document.addEventListener('beforeinput', bloquearEntradaColada, true);
    document.addEventListener('keydown', bloquearAtalhoDeTexto, true);
    document.addEventListener('focusin', guardarValorDoCampo, true);
    document.addEventListener('input', bloquearEntradaEmBloco, true);
}

document.addEventListener('DOMContentLoaded', iniciarBloqueioColar);
