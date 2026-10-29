// Índice de atividades: botão "SLIDE AULA NN" ao lado do rótulo "AULA NN" do card; abre o PDF do
// slide em nova aba. O link vem do banco (aulas.link_aula, tarefa #428); aula sem link não mostra o
// botão, e aula que não está na tabela aulas continua fora (só ganha o botão se a aula do banco foi
// encontrada). Só aceita link http(s). Usado por assets/js/indice-aula-data.js, que chama
// renderizarLinkSlideNoCard ao escrever os textos do card.

const CLASSE_LINK_SLIDE_AULA = 'aula-slide-link';
const CLASSE_CARD_COM_SLIDE_AULA = 'aula--com-slide';
const SELETOR_ROTULO_SLIDE_AULA = '.num';
const PREFIXO_TEXTO_SLIDE_AULA = 'SLIDE AULA ';
const DIGITOS_NUMERO_SLIDE_AULA = 2;
const PADRAO_LINK_SLIDE_VALIDO = /^https?:\/\//i;

/**
 * Diz se o link guardado no banco pode virar botão (texto não vazio e http ou https).
 * @param {string|null|undefined} link - Valor de aulas.link_aula.
 * @returns {boolean} true se o botão deve aparecer.
 */
function linkDoSlideEhValido(link) {
    return typeof link === 'string' && PADRAO_LINK_SLIDE_VALIDO.test(link.trim());
}

/**
 * Cria o botão "SLIDE AULA NN".
 * @param {{numero: number, link_aula: string}} aula - Linha da tabela aulas.
 * @returns {HTMLAnchorElement} Link pronto (abre em nova aba).
 */
function criarLinkSlideAula(aula) {
    const link = document.createElement('a');
    link.className = CLASSE_LINK_SLIDE_AULA;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = PREFIXO_TEXTO_SLIDE_AULA +
        String(aula.numero ?? '').padStart(DIGITOS_NUMERO_SLIDE_AULA, '0');
    link.href = aula.link_aula.trim();
    return link;
}

/**
 * Mostra, atualiza ou tira o botão do slide no card da aula, conforme aulas.link_aula.
 * @param {{card: HTMLElement, aula: Object|null}} item - Card e aula (linha da tabela aulas).
 */
function renderizarLinkSlideNoCard(item) {
    const existente = item.card.querySelector('.' + CLASSE_LINK_SLIDE_AULA);
    const temLink = Boolean(item.aula) && linkDoSlideEhValido(item.aula.link_aula);
    if (existente) existente.remove();
    item.card.classList.toggle(CLASSE_CARD_COM_SLIDE_AULA, temLink);
    if (!temLink) return;

    const rotulo = item.card.querySelector(SELETOR_ROTULO_SLIDE_AULA);
    if (rotulo) rotulo.insertAdjacentElement('afterend', criarLinkSlideAula(item.aula));
}
