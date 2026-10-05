// Exportação de uma página inteira, exatamente como ela aparece na tela. Genérico: vale para
// qualquer página (ex.: trabalho em equipe).
// Uso: um botão <button class="btn-export" type="button" data-acao="exportar-pdf-pagina">
// dentro de uma barra .export-bar + este script (defer) + assets/css/exportar-pagina.css.
//   - "📥 Exportar Para PDF": abre a impressão do navegador ("Salvar como PDF") com as mesmas
//     cores e o mesmo layout da tela (o CSS de impressão tira só menus e botões);
//   - "📝 Exportar em Word": colocado ao lado (regra "EXPORTAR EM WORD"), copia o mesmo conteúdo
//     com o estilo calculado da página e baixa um .doc (assets/js/documento-word.js).
// Nada é gravado no banco nem no navegador.

const RAIZ_EXPORTAR_PAGINA = document.currentScript ? document.currentScript.src : location.href;
const SELETOR_BOTAO_PDF_PAGINA = '[data-acao="exportar-pdf-pagina"]';
const ACAO_WORD_PAGINA = 'exportar-word-pagina';
const TEXTO_BOTAO_WORD_PAGINA = '📝 Exportar em Word';
const TEXTO_PREPARANDO_WORD_PAGINA = '⏳ Preparando o Word...';
const MSG_ERRO_WORD_PAGINA = 'Não foi possível gerar o Word: ';
const ROTA_DOCUMENTO_WORD = 'documento-word.js';
const SELETOR_RAIZ_EXPORTACAO = '.container';
const SELETOR_FORA_EXPORTACAO = 'button, input, select, textarea, nav, script, style, noscript, '
  + '.export-bar, .voltar, .restricao-turma-aviso, #header-usuario';
const ATRIBUTOS_MANTIDOS_PAGINA = ['href', 'colspan', 'rowspan', 'start'];
const VALORES_IGNORADOS_PAGINA = new Set(['', '0px', 'none', 'normal', 'start', 'baseline',
  'rgba(0, 0, 0, 0)', 'transparent']);
const PROPRIEDADES_ESTILO_PAGINA = [
  'color', 'background-color', 'font-size', 'font-weight', 'font-style', 'text-align',
  'white-space', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin-top', 'margin-bottom', 'border-top-width', 'border-top-style', 'border-top-color',
  'border-right-width', 'border-right-style', 'border-right-color', 'border-bottom-width',
  'border-bottom-style', 'border-bottom-color', 'border-left-width', 'border-left-style',
  'border-left-color',
];

/**
 * Avisa um erro em popup (popup.js) ou, sem ele, no console.
 * @param {string} texto - Mensagem.
 * @returns {Promise<void>}
 */
async function avisarErroExportarPagina(texto) {
  if (typeof window.mostrarPopup === 'function') {
    await window.mostrarPopup(texto, { tipo: 'erro' });
    return;
  }
  console.warn(texto);
}

/**
 * Carrega o documento-word.js (uma vez), se a página ainda não o tiver.
 * @returns {Promise<void>}
 */
function garantirDocumentoWordPagina() {
  if (typeof baixarDocumentoWord === 'function') return Promise.resolve();

  return new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = new URL(ROTA_DOCUMENTO_WORD, RAIZ_EXPORTAR_PAGINA).href;
    script.onload = () => resolver();
    script.onerror = () => rejeitar(new Error('documento-word.js não carregou'));
    document.head.appendChild(script);
  });
}

/**
 * Cor de fundo do elemento; quando o fundo é um degradê, usa a primeira cor dele.
 * @param {CSSStyleDeclaration} estilo - Estilo calculado.
 * @returns {string} Cor de fundo ou texto vazio.
 */
function corDeFundoPagina(estilo) {
  const imagem = estilo.getPropertyValue('background-image');
  if (!imagem.includes('gradient')) return '';
  return (imagem.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/i) || [''])[0];
}

/**
 * Copia para a cópia, como estilo em linha, o estilo calculado do elemento original.
 * @param {Element} original - Elemento da página.
 * @param {HTMLElement} copia - Elemento que vai para o Word.
 * @returns {void}
 */
function aplicarEstiloPagina(original, copia) {
  const estilo = getComputedStyle(original);
  const declaracoes = PROPRIEDADES_ESTILO_PAGINA
    .map((propriedade) => [propriedade, estilo.getPropertyValue(propriedade)])
    .filter(([, valor]) => !VALORES_IGNORADOS_PAGINA.has(valor))
    .map(([propriedade, valor]) => `${propriedade}:${valor}`);
  const degrade = corDeFundoPagina(estilo);
  if (degrade) declaracoes.push(`background-color:${degrade}`);
  if (copia.tagName === 'TABLE') declaracoes.push('width:100%', 'border-collapse:collapse');
  [...copia.attributes]
    .filter((atributo) => !ATRIBUTOS_MANTIDOS_PAGINA.includes(atributo.name))
    .forEach((atributo) => copia.removeAttribute(atributo.name));
  copia.setAttribute('style', declaracoes.join(';'));
}

/**
 * Indica se o elemento fica fora da exportação (botões, menus, avisos ou partes ocultas).
 * @param {Element} elemento - Elemento da página.
 * @returns {boolean} true quando não deve ir para o documento.
 */
function ficaForaDaExportacao(elemento) {
  const ehSoDaTela = elemento.matches(SELETOR_FORA_EXPORTACAO);
  return ehSoDaTela || getComputedStyle(elemento).display === 'none';
}

/**
 * Copia um trecho da página com o estilo em linha (imagens viram o texto alternativo).
 * @param {Node} no - Nó original.
 * @returns {Node|null} Cópia pronta para o Word ou null se o nó fica de fora.
 */
function clonarParaWordPagina(no) {
  if (no.nodeType === Node.TEXT_NODE) return document.createTextNode(no.textContent);
  if (no.nodeType !== Node.ELEMENT_NODE || ficaForaDaExportacao(no)) return null;
  if (no.tagName === 'IMG') return document.createTextNode(no.alt || '');

  const copia = no.cloneNode(false);
  aplicarEstiloPagina(no, copia);
  no.childNodes.forEach((filho) => {
    const copiaFilho = clonarParaWordPagina(filho);
    if (copiaFilho) copia.append(copiaFilho);
  });
  return copia;
}

/**
 * Nome do arquivo a partir do nome da página (ex.: TRABALHO-EQUIPE-....doc).
 * @returns {string} Nome do arquivo .doc.
 */
function nomeArquivoWordPagina() {
  const nomePagina = decodeURIComponent(location.pathname.split('/').pop() || 'pagina');
  return nomePagina.replace(/\.html?$/i, '') + '.doc';
}

/**
 * Monta e baixa o Word com o conteúdo da página.
 * @param {HTMLButtonElement} botao - Botão clicado (mostra o andamento).
 * @returns {Promise<void>}
 */
async function exportarWordPagina(botao) {
  const rotulo = botao.textContent;
  botao.disabled = true;
  botao.textContent = TEXTO_PREPARANDO_WORD_PAGINA;
  try {
    await garantirDocumentoWordPagina();
    const raiz = document.querySelector(SELETOR_RAIZ_EXPORTACAO) || document.body;
    const copia = clonarParaWordPagina(raiz);
    const titulo = document.title || 'Atividade';
    baixarDocumentoWord({
      titulo,
      corpoHtml: copia ? copia.outerHTML : '',
      rodape: titulo + ' · SENAI',
      nomeArquivo: nomeArquivoWordPagina(),
    });
  } catch (erro) {
    await avisarErroExportarPagina(MSG_ERRO_WORD_PAGINA + erro.message);
  } finally {
    botao.textContent = rotulo;
    botao.disabled = false;
  }
}

/**
 * Liga o botão de PDF e coloca o botão de Word ao lado dele.
 * @param {HTMLButtonElement} botaoPdf - Botão "Exportar Para PDF".
 * @returns {void}
 */
function prepararBotaoExportarPagina(botaoPdf) {
  botaoPdf.addEventListener('click', () => window.print());
  const proximo = botaoPdf.nextElementSibling;
  if (proximo?.dataset.acao === ACAO_WORD_PAGINA) return;

  const botaoWord = document.createElement('button');
  botaoWord.type = 'button';
  botaoWord.className = botaoPdf.className;
  botaoWord.dataset.acao = ACAO_WORD_PAGINA;
  botaoWord.textContent = TEXTO_BOTAO_WORD_PAGINA;
  botaoWord.addEventListener('click', () => exportarWordPagina(botaoWord));
  botaoPdf.after(botaoWord);
}

/**
 * Prepara todos os botões de exportação da página.
 * @returns {void}
 */
function iniciarExportarPagina() {
  document.querySelectorAll(SELETOR_BOTAO_PDF_PAGINA).forEach(prepararBotaoExportarPagina);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarExportarPagina);
} else {
  iniciarExportarPagina();
}
