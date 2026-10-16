// Modal simples (fundo escuro + caixa) usado pelo "Histórico" e pela "Justificativa de mudança da
// nota" da avaliação discursiva (historico-nota-discursiva.js, justificativa-mudanca-nota.js).
// Fecha com o botão ✕, a tecla Esc ou um clique no fundo. Só monta a tela; nada é gravado.
// Carregado por assets/js/avaliacao-discursiva.js. Regra: docs/regras/atividades.md

const CLASSE_MODAL_NOTA = 'modal-nota';
const BASE_SCRIPTS_MODAL_NOTA = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoModalNota(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Abre um modal com título, área de conteúdo e rodapé.
 * @param {{titulo: string, aoFechar?: Function}} dados - Título e função chamada ao fechar.
 * @returns {{corpo: HTMLElement, rodape: HTMLElement, fechar: Function}} Áreas do modal e a
 *     função que o fecha.
 */
function abrirModalNota(dados) {
    const fundo = criarElementoModalNota('div', CLASSE_MODAL_NOTA + '__fundo');
    const caixa = criarElementoModalNota('div', CLASSE_MODAL_NOTA);
    caixa.setAttribute('role', 'dialog');
    caixa.setAttribute('aria-modal', 'true');
    const cabecalho = criarElementoModalNota('div', CLASSE_MODAL_NOTA + '__cabecalho');
    const fechar = criarElementoModalNota('button', CLASSE_MODAL_NOTA + '__fechar', '✕');
    fechar.type = 'button';
    fechar.setAttribute('aria-label', 'Fechar');
    cabecalho.append(criarElementoModalNota('h2', CLASSE_MODAL_NOTA + '__titulo', dados.titulo),
        fechar);
    const corpo = criarElementoModalNota('div', CLASSE_MODAL_NOTA + '__corpo');
    const rodape = criarElementoModalNota('div', CLASSE_MODAL_NOTA + '__rodape');
    caixa.append(cabecalho, corpo, rodape);
    fundo.appendChild(caixa);
    document.body.appendChild(fundo);

    const aoApertarTecla = (evento) => { if (evento.key === 'Escape') encerrar(); };
    function encerrar() {
        document.removeEventListener('keydown', aoApertarTecla);
        fundo.remove();
        dados.aoFechar?.();
    }
    fechar.addEventListener('click', encerrar);
    fundo.addEventListener('click', (evento) => { if (evento.target === fundo) encerrar(); });
    document.addEventListener('keydown', aoApertarTecla);
    return { corpo, rodape, fechar: encerrar };
}

(function incluirEstiloModalNota() {
    if (!BASE_SCRIPTS_MODAL_NOTA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_MODAL_NOTA + '../css/modal-nota-discursiva.css';
    document.head.appendChild(link);
})();

window.abrirModalNota = abrirModalNota;
window.criarElementoModalNota = criarElementoModalNota;
