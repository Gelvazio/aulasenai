// Mínimo de caracteres por resposta nas avaliações discursivas: mostra abaixo de cada campo
// quantos caracteres faltam e impede a entrega enquanto houver resposta mais curta que o mínimo.
// Só liga quando o <body> tem data-minimo-caracteres="N" (campo "- **Mínimo de caracteres por
// resposta:** N" da fonte .md, posto pelo gerador); sem o campo, nada acontece.
// A checagem roda na fase de captura do clique em #btnFinalizarDiscursiva, antes do código de
// assets/js/avaliacao-discursiva.js. Regra: docs/regras/atividades.md

const ATRIBUTO_MINIMO_CARACTERES = 'minimoCaracteres';
const SELETOR_CAMPO_RESPOSTA = '.topico-resposta__campo';
const SELETOR_BLOCO_RESPOSTA = '.topico-resposta';
const SELETOR_BOTAO_ENTREGAR = '#btnFinalizarDiscursiva';
const CLASSE_AVISO_MINIMO = 'topico-resposta__contador topico-resposta__minimo';
const CARACTERES_POR_LINHA_MINIMO = 70;
const TITULO_ENTREGA_CURTA = 'Respostas curtas demais';

/**
 * Lê o mínimo de caracteres pedido pela página.
 * @returns {number} Mínimo (inteiro positivo) ou 0 quando a página não pediu.
 */
function lerMinimoCaracteres() {
    const minimo = Number(document.body?.dataset[ATRIBUTO_MINIMO_CARACTERES]);
    return Number.isInteger(minimo) && minimo > 0 ? minimo : 0;
}

/**
 * Conta os caracteres da resposta, sem espaços nas pontas.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @returns {number} Quantidade de caracteres.
 */
function contarCaracteres(campo) {
    return campo.value.trim().length;
}

/**
 * Monta o texto do aviso vivo de um campo.
 * @param {number} escritos - Caracteres já escritos.
 * @param {number} minimo - Mínimo exigido.
 * @returns {string} Texto do aviso.
 */
function montarTextoAviso(escritos, minimo) {
    if (escritos >= minimo) return '✅ Mínimo atingido';
    const linhas = Math.ceil(minimo / CARACTERES_POR_LINHA_MINIMO);
    return 'Faltam ' + (minimo - escritos) + ' caracteres (mínimo ' + minimo +
        ' ≈ ' + linhas + ' linhas)';
}

/**
 * Atualiza o aviso vivo abaixo do campo.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @param {number} minimo - Mínimo exigido.
 */
function atualizarAviso(campo, minimo) {
    const aviso = campo.closest(SELETOR_BLOCO_RESPOSTA)?.querySelector('.topico-resposta__minimo');
    if (aviso) aviso.textContent = montarTextoAviso(contarCaracteres(campo), minimo);
}

/**
 * Cria o aviso vivo de um campo e liga a atualização ao digitar.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @param {number} minimo - Mínimo exigido.
 */
function prepararCampo(campo, minimo) {
    const bloco = campo.closest(SELETOR_BLOCO_RESPOSTA);
    if (!bloco) return;

    const aviso = document.createElement('div');
    aviso.className = CLASSE_AVISO_MINIMO;
    bloco.appendChild(aviso);
    campo.addEventListener('input', () => atualizarAviso(campo, minimo));
    atualizarAviso(campo, minimo);
}

/**
 * Descreve a questão e a quantidade de caracteres de um campo curto.
 * @param {HTMLTextAreaElement} campo - Campo de resposta.
 * @param {number} minimo - Mínimo exigido.
 * @returns {string} Ex.: "Questão 03: 120 de 350".
 */
function descreverCampoCurto(campo, minimo) {
    const letra = campo.closest(SELETOR_BLOCO_RESPOSTA)
        ?.querySelector('.topico-resposta__letra')?.textContent || '';
    const numero = String(campo.dataset.item || '').padStart(2, '0');
    return 'Questão ' + numero + ' ' + letra + ': ' + contarCaracteres(campo) + ' de ' + minimo;
}

/**
 * Impede a entrega quando alguma resposta tem menos caracteres que o mínimo.
 * @param {MouseEvent} evento - Clique capturado.
 * @param {number} minimo - Mínimo exigido.
 */
function bloquearEntregaCurta(evento, minimo) {
    const botao = evento.target?.closest?.(SELETOR_BOTAO_ENTREGAR);
    if (!botao || botao.disabled) return;

    const curtos = Array.from(document.querySelectorAll(SELETOR_CAMPO_RESPOSTA))
        .filter((campo) => !campo.disabled && contarCaracteres(campo) < minimo);
    if (!curtos.length) return;

    evento.preventDefault();
    evento.stopImmediatePropagation();
    const lista = curtos.map((campo) => descreverCampoCurto(campo, minimo)).join('\n');
    mostrarPopup('Cada resposta precisa ter no mínimo ' + minimo + ' caracteres. ' +
        'Complete as respostas abaixo antes de entregar:\n\n' + lista,
    { tipo: 'aviso', titulo: TITULO_ENTREGA_CURTA });
    curtos[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Liga o aviso vivo e o bloqueio da entrega, se a página pediu o mínimo.
 */
function iniciarMinimoCaracteres() {
    const minimo = lerMinimoCaracteres();
    if (!minimo) return;

    document.querySelectorAll(SELETOR_CAMPO_RESPOSTA).forEach((campo) => {
        prepararCampo(campo, minimo);
    });
    document.addEventListener('discursiva:campos-preenchidos', () => {
        document.querySelectorAll(SELETOR_CAMPO_RESPOSTA).forEach((campo) => {
            atualizarAviso(campo, minimo);
        });
    });
    document.addEventListener('click', (evento) => bloquearEntregaCurta(evento, minimo), true);
}

document.addEventListener('DOMContentLoaded', iniciarMinimoCaracteres);
