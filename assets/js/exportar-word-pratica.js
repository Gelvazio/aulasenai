// Exportação em Word das atividades práticas (ex.: Excel), com o MESMO conteúdo e layout do
// "Imprimir / PDF": a capa (ou a questão aberta) e, na capa, todas as questões, cada uma em nova
// página. As cores, fontes e bordas são copiadas do estilo calculado da página e as imagens
// (SVG das telas) entram como PNG embutido.
// Ao lado de cada botão [data-acao="imprimir"] entra o botão "Exportar em Word".
// Depende de: atividade-pratica-excel.js (montarImpressaoCompleta, SELETOR_SO_TELA) e
// documento-word.js (baixarDocumentoWord, quebrarBase64Word, escaparHtmlWord).

const SELETOR_BOTAO_IMPRIMIR_WORD = '[data-acao="imprimir"]';
const ACAO_EXPORTAR_WORD_PRATICA = 'exportar-word';
const TEXTO_BOTAO_WORD_PRATICA = '📝 Exportar em Word';
const TEXTO_PREPARANDO_WORD = '⏳ Preparando o Word...';
const MSG_ERRO_WORD_PRATICA = 'Não foi possível gerar o Word: ';
const SELETOR_FORA_DO_WORD = 'button, input, select, textarea, nav, script, style, noscript';
const ATRIBUTOS_MANTIDOS_WORD = ['src', 'alt', 'href', 'colspan', 'rowspan'];
const LARGURA_MAXIMA_IMAGEM_WORD = 640;
const ESCALA_IMAGEM_WORD = 2;
const PROPRIEDADES_ESTILO_WORD = [
    'color', 'background-color', 'font-size', 'font-weight', 'font-style', 'text-align',
    'vertical-align', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin-top', 'margin-bottom', 'border-top-width', 'border-top-style', 'border-top-color',
    'border-right-width', 'border-right-style', 'border-right-color', 'border-bottom-width',
    'border-bottom-style', 'border-bottom-color', 'border-left-width', 'border-left-style',
    'border-left-color'
];
const VALORES_IGNORADOS_WORD = new Set(['', '0px', 'none', 'normal', 'start', 'baseline',
    'rgba(0, 0, 0, 0)', 'transparent']);

/**
 * Avisa um erro em popup (popup.js) ou, sem ele, no console.
 * @param {string} texto - Mensagem.
 */
async function avisarErroWordPratica(texto) {
    if (typeof window.mostrarPopup === 'function') {
        await window.mostrarPopup(texto, { tipo: 'erro' });
        return;
    }
    console.warn(texto);
}

/**
 * Cor de fundo do elemento; quando o fundo é um degradê, usa a primeira cor dele.
 * @param {CSSStyleDeclaration} estilo - Estilo calculado.
 * @returns {string} Cor de fundo ou texto vazio.
 */
function corDeFundoWord(estilo) {
    const imagem = estilo.getPropertyValue('background-image');
    if (!imagem.includes('gradient')) return '';
    return (imagem.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/i) || [''])[0];
}

/**
 * Copia para a cópia, como estilo em linha, o estilo calculado do elemento original.
 * @param {Element} original - Elemento da página.
 * @param {HTMLElement} copia - Elemento que vai para o Word.
 */
function aplicarEstilosWord(original, copia) {
    const estilo = getComputedStyle(original);
    const declaracoes = PROPRIEDADES_ESTILO_WORD
        .map((propriedade) => [propriedade, estilo.getPropertyValue(propriedade)])
        .filter(([, valor]) => !VALORES_IGNORADOS_WORD.has(valor))
        .map(([propriedade, valor]) => `${propriedade}:${valor}`);
    const degrade = corDeFundoWord(estilo);
    if (degrade) declaracoes.push(`background-color:${degrade}`);
    if (copia.tagName === 'TABLE') declaracoes.push('width:100%', 'border-collapse:collapse');
    copia.setAttribute('style', declaracoes.join(';'));
}

/**
 * Remove da cópia os atributos que não interessam ao Word (classes, ids, data-*...).
 * @param {HTMLElement} copia - Elemento copiado.
 */
function limparAtributosWord(copia) {
    [...copia.attributes]
        .filter((atributo) => !ATRIBUTOS_MANTIDOS_WORD.includes(atributo.name))
        .forEach((atributo) => copia.removeAttribute(atributo.name));
}

/**
 * Indica se o elemento fica fora do Word (botões, navegação, partes só da tela ou ocultas).
 * @param {Element} elemento - Elemento da página.
 * @returns {boolean} true quando não deve ir para o documento.
 */
function ficaForaDoWord(elemento) {
    const ehSoDaTela = elemento.matches(SELETOR_FORA_DO_WORD) || elemento.matches(SELETOR_SO_TELA);
    return ehSoDaTela || getComputedStyle(elemento).display === 'none';
}

/**
 * Copia um trecho da página com o estilo em linha; as imagens são anotadas para conversão.
 * @param {Node} no - Nó original.
 * @param {{original: HTMLImageElement, copia: HTMLImageElement}[]} imagens - Lista que recebe
 *     as imagens encontradas.
 * @returns {Node|null} Cópia pronta para o Word ou null se o nó fica de fora.
 */
function clonarComEstilosWord(no, imagens) {
    if (no.nodeType === Node.TEXT_NODE) return document.createTextNode(no.textContent);
    if (no.nodeType !== Node.ELEMENT_NODE || ficaForaDoWord(no)) return null;

    const copia = no.cloneNode(false);
    aplicarEstilosWord(no, copia);
    limparAtributosWord(copia);
    if (no.tagName === 'IMG') imagens.push({ original: no, copia });
    no.childNodes.forEach((filho) => {
        const copiaFilho = clonarComEstilosWord(filho, imagens);
        if (copiaFilho) copia.append(copiaFilho);
    });
    return copia;
}

/**
 * Desenha a imagem num canvas e devolve o PNG em base64 (fundo branco).
 * @param {HTMLImageElement} imagem - Imagem carregada.
 * @returns {Promise<{base64: string, largura: number, altura: number}|null>} PNG ou null.
 */
async function imagemParaPngWord(imagem) {
    // Imagens "lazy" ainda fora da tela não carregaram: força o carregamento antes de desenhar
    imagem.loading = 'eager';
    try {
        await imagem.decode();
    } catch (erro) {
        if (!imagem.naturalWidth) return null;
    }
    const largura = imagem.naturalWidth;
    const altura = imagem.naturalHeight;
    if (!largura || !altura) return null;

    const canvas = document.createElement('canvas');
    canvas.width = largura * ESCALA_IMAGEM_WORD;
    canvas.height = altura * ESCALA_IMAGEM_WORD;
    const contexto = canvas.getContext('2d');
    contexto.fillStyle = '#ffffff';
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    try {
        return { base64: canvas.toDataURL('image/png').split(',')[1], largura, altura };
    } catch (erro) {
        return null;
    }
}

/**
 * Converte as imagens anotadas em PNG embutido e aponta a cópia para o arquivo da parte.
 * @param {{original: HTMLImageElement, copia: HTMLImageElement}[]} imagens - Imagens copiadas.
 * @returns {Promise<{nome: string, tipo: string, base64: string}[]>} Partes de imagem do Word.
 */
async function converterImagensWord(imagens) {
    const partes = [];
    for (const [indice, { original, copia }] of imagens.entries()) {
        const png = await imagemParaPngWord(original);
        if (!png) {
            copia.replaceWith(document.createTextNode(original.alt || ''));
            continue;
        }
        const nome = 'imagem-' + String(indice + 1).padStart(3, '0') + '.png';
        const largura = Math.min(png.largura, LARGURA_MAXIMA_IMAGEM_WORD);
        copia.setAttribute('src', nome);
        copia.setAttribute('width', String(largura));
        copia.setAttribute('height', String(Math.round(png.altura * (largura / png.largura))));
        copia.removeAttribute('style');
        partes.push({ nome, tipo: 'image/png', base64: quebrarBase64Word(png.base64) });
    }
    return partes;
}

/**
 * Monta e baixa o Word: a página aberta e, se houver, as questões (cada uma em nova página).
 * @param {HTMLElement|null} conteiner - Questões montadas por montarImpressaoCompleta().
 */
async function gerarWordPratica(conteiner) {
    const raizes = [document.querySelector('.pagina') || document.body,
        ...(conteiner ? conteiner.children : [])];
    const imagens = [];
    const quebra = '<br style="page-break-before:always" clear="all">';
    const trechos = raizes.map((raiz) => clonarComEstilosWord(raiz, imagens));
    const partesImagem = await converterImagensWord(imagens);
    const titulo = document.title || 'Atividade prática';
    baixarDocumentoWord({
        titulo,
        corpoHtml: trechos.filter(Boolean).map((trecho) => trecho.outerHTML).join(quebra),
        rodape: titulo + ' · SENAI',
        nomeArquivo: (document.body.dataset.atividade || 'atividade-pratica') + '.doc',
        imagens: partesImagem
    });
}

/**
 * Botão "Exportar em Word": prepara as questões como a impressão e gera o documento.
 * @param {HTMLButtonElement} botao - Botão clicado (mostra o andamento).
 */
async function exportarWordPratica(botao) {
    const rotulo = botao.textContent;
    botao.disabled = true;
    botao.textContent = TEXTO_PREPARANDO_WORD;
    let conteiner = null;
    try {
        conteiner = await montarImpressaoCompleta();
        await gerarWordPratica(conteiner);
    } catch (erro) {
        await avisarErroWordPratica(MSG_ERRO_WORD_PRATICA + erro.message);
    } finally {
        conteiner?.remove();
        botao.textContent = rotulo;
        botao.disabled = false;
    }
}

/**
 * Coloca o botão "Exportar em Word" ao lado de cada botão de impressão/PDF da página.
 */
function inserirBotoesWordPratica() {
    document.querySelectorAll(SELETOR_BOTAO_IMPRIMIR_WORD).forEach((botaoPdf) => {
        const proximo = botaoPdf.nextElementSibling;
        if (proximo?.dataset.acao === ACAO_EXPORTAR_WORD_PRATICA) return;

        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = botaoPdf.className;
        botao.dataset.acao = ACAO_EXPORTAR_WORD_PRATICA;
        botao.textContent = TEXTO_BOTAO_WORD_PRATICA;
        botao.addEventListener('click', () => exportarWordPratica(botao));
        botaoPdf.after(botao);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inserirBotoesWordPratica);
} else {
    inserirBotoesWordPratica();
}
