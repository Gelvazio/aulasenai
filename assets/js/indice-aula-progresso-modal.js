// Professor: modal "Progresso das atividades" aberto pelo botão "📊 Progresso Atividades" do card
// da aula (indice-aula-progresso-botao.js). Só a janela: título com a aula, corpo e fechamento
// (botão ✕, Esc e clique fora). O que aparece no corpo (carregando, erro e o quadro alunos ×
// atividades) é desenhado por assets/js/indice-aula-progresso-quadro.js, que recebe o corpo.
// Sem style inline nem onclick; o visual fica em assets/css/indice-aula-progresso.css.
// Tarefa #421.2.

const CLASSE_MODAL_PROGRESSO_AULA = 'aula-progresso';
const PREFIXO_TITULO_MODAL_PROGRESSO = '📊 Progresso das atividades — ';
const TEXTO_FECHAR_MODAL_PROGRESSO = 'Fechar';
const PREFIXO_ROTULO_AULA_PROGRESSO = 'AULA ';
const DIGITOS_NUMERO_AULA_PROGRESSO = 2;

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoProgressoAula(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Monta o nome da aula para o título ("AULA 02" e o nome do card, se houver).
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {string} Nome da aula.
 */
function nomeDaAulaNoProgresso(aula) {
    const rotulo = PREFIXO_ROTULO_AULA_PROGRESSO +
        String(aula.numero ?? '').padStart(DIGITOS_NUMERO_AULA_PROGRESSO, '0');
    const nome = aula.nome_card || aula.titulo || '';
    return nome ? rotulo + ' · ' + nome : rotulo;
}

/**
 * Monta a janela do modal (fundo, janela, título, botão fechar e corpo).
 * @param {Object} aula - Linha da tabela aulas.
 * @returns {{fundo: HTMLElement, corpo: HTMLElement, fechar: HTMLButtonElement}} Elementos.
 */
function montarJanelaProgressoAula(aula) {
    const fundo = criarElementoProgressoAula('div', CLASSE_MODAL_PROGRESSO_AULA);
    const janela = criarElementoProgressoAula('div', CLASSE_MODAL_PROGRESSO_AULA + '__janela');
    janela.setAttribute('role', 'dialog');
    janela.setAttribute('aria-modal', 'true');
    const cabecalho = criarElementoProgressoAula('div', CLASSE_MODAL_PROGRESSO_AULA + '__topo');
    const titulo = criarElementoProgressoAula('h2', CLASSE_MODAL_PROGRESSO_AULA + '__titulo',
        PREFIXO_TITULO_MODAL_PROGRESSO + nomeDaAulaNoProgresso(aula));
    const fechar = criarElementoProgressoAula('button', CLASSE_MODAL_PROGRESSO_AULA + '__fechar',
        '✕');
    fechar.type = 'button';
    fechar.title = TEXTO_FECHAR_MODAL_PROGRESSO;
    fechar.setAttribute('aria-label', TEXTO_FECHAR_MODAL_PROGRESSO);
    const corpo = criarElementoProgressoAula('div', CLASSE_MODAL_PROGRESSO_AULA + '__corpo');
    cabecalho.append(titulo, fechar);
    janela.append(cabecalho, corpo);
    fundo.appendChild(janela);
    return { fundo, corpo, fechar };
}

/**
 * Liga o fechamento do modal: botão ✕, tecla Esc e clique no fundo.
 * @param {{fundo: HTMLElement, fechar: HTMLButtonElement}} tela - Elementos do modal.
 * @param {Function} aoFechar - Chamada uma vez ao fechar.
 */
function ligarFechamentoProgressoAula(tela, aoFechar) {
    const teclaEsc = (evento) => {
        if (evento.key === 'Escape') aoFechar();
    };
    document.addEventListener('keydown', teclaEsc);
    tela.fechar.addEventListener('click', aoFechar);
    tela.fundo.addEventListener('click', (evento) => {
        if (evento.target === tela.fundo) aoFechar();
    });
    tela.removerEsc = () => document.removeEventListener('keydown', teclaEsc);
}

/**
 * Abre o modal de progresso das atividades da aula e entrega o corpo ao quadro.
 * @param {{card: HTMLElement, aula: Object}} item - Card e aula (linha da tabela aulas).
 * @returns {Promise<void>} Resolve quando o professor fecha o modal.
 */
function abrirModalProgressoAtividades(item) {
    const jaAberto = document.querySelector('.' + CLASSE_MODAL_PROGRESSO_AULA);
    if (jaAberto) return Promise.resolve();

    return new Promise((resolver) => {
        const tela = montarJanelaProgressoAula(item.aula);
        const fechar = () => {
            tela.removerEsc();
            tela.fundo.remove();
            resolver();
        };
        ligarFechamentoProgressoAula(tela, fechar);
        document.body.appendChild(tela.fundo);
        tela.fechar.focus();
        if (typeof window.montarQuadroProgressoAula === 'function') {
            window.montarQuadroProgressoAula(tela.corpo, item);
        }
    });
}

window.abrirModalProgressoAtividades = abrirModalProgressoAtividades;
